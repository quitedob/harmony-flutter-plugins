/**
 * 会话日志落盘：把 OpenCode 的整段 session（入口路由器 / 平台编排器 / 各阶段子 agent）
 * 导出到 `<CWD>/.ohos-adaptation/logs/<agentName>[-retry_n].json`。
 *
 * 命名：文件名以 export JSON 顶部的 `info.agent`（= 该阶段/子 agent 名）为准。
 *   首个 session              → `<agent>.json`
 *   同一 agent 的后续 session → `<agent>-retry_1.json`、`-retry_2.json` …（即第几次重新执行）
 *   同一 session 多次刷新      → 覆盖写同名文件（拿到最新最全内容）
 *
 * 重试计数持久化在 `logs/.sessions.json`（`{ "<agent>": ["sessionId", ...] }`，按首次出现排序），
 * 跨进程/跨整轮执行也能正确续编号；要重新计数把 logs/ 删掉即可。
 *
 * 失败一律静默（hook 绝不阻塞 OpenCode）。
 */
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { ENTRY_AGENT_NAME, PLATFORMS } from './config.js'

export const ADAPT_DIR = '.ohos-adaptation'

/** 本工具家族的子 agent 名（编排器 + 其各阶段）——Claude SubagentStop 白名单用。 */
const ORCH_NAMES = PLATFORMS.map((p) => p.orchestratorName)
function isOurSubagent(agentType) {
  const t = String(agentType || '')
  return ORCH_NAMES.some((n) => t === n || t.startsWith(n + '-'))
}

function safeSeg(s) {
  return (
    String(s || '')
      .replace(/[^A-Za-z0-9._-]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'unknown'
  )
}

export function logsDir(workspaceRoot) {
  return path.join(workspaceRoot, ADAPT_DIR, 'logs')
}

/**
 * 解析目标文件名（含 retry_n 编号），并把唯一 id 记进 .sessions.json 索引。
 * 索引按 `<agent>.<ext>` 分键 —— OpenCode(.json) 与 Claude(.jsonl) 各自独立计数，互不串号。
 * 首个 id → `<agent>.<ext>`；同一 agent 的后续 id → `<agent>-retry_n.<ext>`；同一 id → 同名覆盖。
 */
function resolveDestName(destDir, agentName, uniqueId, ext) {
  const idxPath = path.join(destDir, '.sessions.json')
  let idx = {}
  try {
    const j = JSON.parse(fs.readFileSync(idxPath, 'utf8'))
    if (j && typeof j === 'object') idx = j
  } catch {
    /* 无索引 / 损坏 → 重建 */
  }
  const base = safeSeg(agentName)
  const key = `${base}.${ext}`
  const list = Array.isArray(idx[key]) ? idx[key] : []
  let pos = list.indexOf(uniqueId)
  if (pos === -1) {
    list.push(uniqueId)
    pos = list.length - 1
  }
  idx[key] = list
  try {
    fs.writeFileSync(idxPath, JSON.stringify(idx, null, 2))
  } catch {
    /* ignore */
  }
  return pos === 0 ? `${base}.${ext}` : `${base}-retry_${pos}.${ext}`
}

// ───────────────────── 只读 SQLite 直读（唯一记录方式，无 spawn） ─────────────────────
//
// opencode 把每个 session 存进 SQLite（表 session / message / part）。直接**只读**这些表自己
// 拼出日志，既无需 spawn 第二个 opencode（消除并发开宿主库 → FOREIGN KEY 的隐患），又拿到
// 与 `opencode export` 等量的全量内容。WAL 模式下只读连接取快照、绝不挡写者，对宿主零干扰。

const HOME = os.homedir()
let cachedDbPath = null // 上次命中的库，下次优先试

function mtimeMs(p) {
  try {
    return fs.statSync(p).mtimeMs
  } catch {
    return 0
  }
}

/** 有界递归收集 *.db（跳噪声目录、限深限量）。 */
function collectDbFiles(dir, out, depth) {
  if (depth < 0 || out.size > 60) return
  let ents
  try {
    ents = fs.readdirSync(dir, { withFileTypes: true })
  } catch {
    return
  }
  for (const e of ents) {
    if (e.name === 'node_modules' || e.name === '.git' || e.name.startsWith('.Trash')) continue
    const full = path.join(dir, e.name)
    if (e.isDirectory()) collectDbFiles(full, out, depth - 1)
    else if (e.name.endsWith('.db')) out.add(full)
  }
}

/** 候选 opencode 数据库（按 mtime 新→旧；缓存命中的排最前）。 */
function candidateDbFiles() {
  const env = process.env
  const roots = []
  if (env.OPENCODE_DATA_DIR) roots.push(env.OPENCODE_DATA_DIR)
  if (env.XDG_DATA_HOME) roots.push(path.join(env.XDG_DATA_HOME, 'opencode'))
  roots.push(path.join(HOME, '.local', 'share', 'opencode'))
  roots.push(path.join(HOME, '.config', 'opencode'))
  roots.push(path.join(HOME, '.harmonybot')) // 嵌入式宿主自带 opencode
  const set = new Set()
  for (const r of roots) collectDbFiles(r, set, 6)
  let files = [...set].sort((a, b) => mtimeMs(b) - mtimeMs(a))
  if (cachedDbPath && set.has(cachedDbPath)) files = [cachedDbPath, ...files.filter((f) => f !== cachedDbPath)]
  return files
}

/** 只读打开：bun:sqlite（opencode 运行时）→ node:sqlite（Node 22+）。只 SELECT，不迁移不写。 */
async function openDbReadonly(file) {
  try {
    const m = await import('bun:sqlite')
    const db = new m.Database(file, { readonly: true })
    return { all: (sql, p = []) => db.query(sql).all(...p), close: () => closeQuiet(db) }
  } catch {
    /* 非 bun 运行时 */
  }
  try {
    const m = await import('node:sqlite')
    const db = new m.DatabaseSync(file, { readOnly: true })
    return { all: (sql, p = []) => db.prepare(sql).all(...p), close: () => closeQuiet(db) }
  } catch {
    /* 无可用 sqlite 绑定 */
  }
  return null
}

function closeQuiet(db) {
  try {
    db.close()
  } catch {
    /* ignore */
  }
}

/** 在候选库里找出含该 session 的那个，返回打开的只读句柄（找不到 null）。 */
async function openSessionDb(sessionId) {
  for (const f of candidateDbFiles()) {
    const db = await openDbReadonly(f)
    if (!db) continue
    try {
      const hit = db.all('SELECT 1 FROM session WHERE id = ? LIMIT 1', [sessionId])
      if (hit && hit.length) {
        cachedDbPath = f
        return db
      }
    } catch {
      /* 该库无 session 表 / 无此 session */
    }
    db.close()
  }
  return null
}

/**
 * 只读 SQLite 直读一个 session 落盘。产物
 *   { info: <session 行>, messages: [{ id, data: <message json>, parts: [<part json>...] }] }
 * 流式逐行写出（按 message id 列表 + 逐条点查 message.data + 该消息的 parts，内存有界、不拼大 JSON）。
 * 文件名取 session.agent，沿用 resolveDestName 的 retry 编号。失败返回 null（绝不抛、不阻塞宿主）。
 */
export async function logViaSqlite({ workspaceRoot, sessionId } = {}) {
  if (!workspaceRoot || !sessionId) return null
  let db = null
  try {
    db = await openSessionDb(sessionId)
    if (!db) return null
    const srow = db.all('SELECT * FROM session WHERE id = ? LIMIT 1', [sessionId])[0]
    if (!srow) return null
    const agent = srow.agent || 'unknown'
    const destDir = logsDir(workspaceRoot)
    fs.mkdirSync(destDir, { recursive: true })
    const tmp = path.join(destDir, `.${safeSeg(sessionId)}.sqlite.partial`)
    const fd = fs.openSync(tmp, 'w')
    try {
      const w = (s) => fs.writeSync(fd, s)
      w('{"info":' + JSON.stringify(srow) + ',"messages":[')
      const ids = db.all('SELECT id FROM message WHERE session_id = ? ORDER BY time_created, id', [sessionId])
      let firstM = true
      for (const { id } of ids) {
        const mrow = db.all('SELECT data FROM message WHERE id = ? LIMIT 1', [id])[0]
        if (!mrow) continue
        w((firstM ? '' : ',') + '{"id":' + JSON.stringify(id) + ',"data":' + mrow.data + ',"parts":[')
        firstM = false
        const parts = db.all('SELECT data FROM part WHERE message_id = ? ORDER BY time_created, id', [id])
        let firstP = true
        for (const p of parts) {
          w((firstP ? '' : ',') + p.data)
          firstP = false
        }
        w(']}')
      }
      w(']}')
    } finally {
      try {
        fs.closeSync(fd)
      } catch {
        /* ignore */
      }
    }
    const dest = path.join(destDir, resolveDestName(destDir, agent, sessionId, 'json'))
    fs.rmSync(dest, { force: true })
    fs.renameSync(tmp, dest)
    return dest
  } catch {
    return null
  } finally {
    if (db) db.close()
  }
}

/**
 * 落 OpenCode 会话日志（自动入口，供插件 fire-and-forget 调用）：只读 SQLite 直读，**不 spawn 任何进程**。
 * 查不到库 / 无 sqlite 绑定时直接跳过（返回 null）。绝不抛错（hook 不阻塞宿主）。
 */
export async function recordSession({ workspaceRoot, sessionId } = {}) {
  try {
    return await logViaSqlite({ workspaceRoot, sessionId })
  } catch {
    return null
  }
}

// ───────────────────────── Claude Code ─────────────────────────

/**
 * 推导 Claude Code 子 agent transcript 路径（Claude 私有但稳定）：
 *   主 session: <projects>/<encoded-cwd>/<sessionId>.jsonl
 *   子 agent:   <projects>/<encoded-cwd>/<sessionId>/subagents/agent-<agentId>.jsonl
 */
export function deriveSubagentTranscriptPath(mainTranscriptPath, agentId) {
  const dir = path.dirname(mainTranscriptPath)
  const baseNoExt = path.basename(mainTranscriptPath).replace(/\.jsonl$/i, '')
  const seg = String(agentId).startsWith('agent-') ? agentId : `agent-${agentId}`
  return path.join(dir, baseNoExt, 'subagents', `${seg}.jsonl`)
}

/** 拷贝 Claude transcript jsonl 到 logs/<agent>[-retry_n].jsonl（与 OpenCode 同名规则）。 */
function copyClaudeTranscript({ workspaceRoot, src, agentName, uniqueId }) {
  if (!workspaceRoot || !src || !agentName || !uniqueId) return null
  let destDir
  try {
    destDir = logsDir(workspaceRoot)
    fs.mkdirSync(destDir, { recursive: true })
  } catch {
    return null
  }
  if (!fs.existsSync(src)) return null
  const dest = path.join(destDir, resolveDestName(destDir, agentName, uniqueId, 'jsonl'))
  try {
    fs.copyFileSync(src, dest) // 源是 append 写入，覆盖即拿最新最全
    return dest
  } catch {
    return null
  }
}

function readStdin() {
  if (process.stdin.isTTY) return ''
  try {
    return fs.readFileSync(0, 'utf8')
  } catch {
    return ''
  }
}

/**
 * Claude Code Stop / SubagentStop hook 入口（CLI `log-session` 调用）。
 * 读 stdin 的 hook JSON，按双宿主对称规则把 transcript 落到 .ohos-adaptation/logs/。
 * 永不抛错（hook 不阻塞 Claude）。
 */
export function runClaudeSessionLog(defaultCwd) {
  let ev = null
  try {
    const raw = readStdin()
    if (raw) ev = JSON.parse(raw)
  } catch {
    return
  }
  if (!ev || typeof ev !== 'object') return
  const transcriptPath = ev.transcript_path
  const sessionId = ev.session_id
  const ws = ev.cwd || defaultCwd
  if (!transcriptPath || !ws) return

  const agentId = ev.agent_id
  const agentType = ev.agent_type || ''
  try {
    if (agentId) {
      // 子 agent：白名单只认本工具家族，避免 matcher 误触其它 subagent
      if (!isOurSubagent(agentType)) return
      const src = deriveSubagentTranscriptPath(transcriptPath, agentId)
      copyClaudeTranscript({ workspaceRoot: ws, src, agentName: agentType, uniqueId: agentId })
    } else {
      // 主 session（Stop）：仅在适配工程内（含 .ohos-adaptation/）落盘
      if (!fs.existsSync(path.join(ws, ADAPT_DIR))) return
      copyClaudeTranscript({
        workspaceRoot: ws,
        src: transcriptPath,
        agentName: ENTRY_AGENT_NAME,
        uniqueId: sessionId || transcriptPath,
      })
    }
  } catch {
    /* hook 永不阻塞 Claude */
  }
}
