/**
 * 在 Claude Code 的 ~/.claude/settings.json 注入/移除会话日志 hook：
 *   Stop[hmos-library-adapter-fast]              → 主 session transcript
 *   SubagentStop[<orchestrator>*]（每平台一条）   → 子 agent transcript
 * 命令统一为裸命令 `hmos-library-adapter-fast log-session`（读 stdin 的 hook JSON）。
 *
 * 幂等：按 hook 的 `id` 字段增删，只动本工具注入的条目（Do No Harm）。
 */
import fs from 'node:fs'
import { CLAUDE_DIR, CLAUDE_SETTINGS_FILE, ENTRY_AGENT_NAME, PLATFORMS } from './paths.js'

const CMD = `${ENTRY_AGENT_NAME} log-session`

/** 本工具要注入的全部 hook（id 用于幂等增删）。 */
function hookDefs() {
  const defs = [
    { id: `${ENTRY_AGENT_NAME}:log-stop`, event: 'Stop', matcher: ENTRY_AGENT_NAME },
  ]
  for (const p of PLATFORMS) {
    defs.push({
      id: `${ENTRY_AGENT_NAME}:log-sub-${p.id}`,
      event: 'SubagentStop',
      matcher: `${p.orchestratorName}*`, // 编排器 + 其各阶段（rn-fast / rn-fast-01-analysis …）
    })
  }
  return defs
}

function read() {
  try {
    return JSON.parse(fs.readFileSync(CLAUDE_SETTINGS_FILE, 'utf8'))
  } catch {
    return {}
  }
}

function write(settings) {
  fs.mkdirSync(CLAUDE_DIR, { recursive: true })
  fs.writeFileSync(CLAUDE_SETTINGS_FILE, JSON.stringify(settings, null, 2) + '\n')
}

function injectOne(settings, def) {
  if (!settings.hooks) settings.hooks = {}
  if (!Array.isArray(settings.hooks[def.event])) settings.hooks[def.event] = []
  const buckets = settings.hooks[def.event]
  let entry = buckets.find((e) => e && e.matcher === def.matcher)
  const desired = { type: 'command', command: CMD, id: def.id }
  if (!entry) {
    buckets.push({ matcher: def.matcher, hooks: [desired] })
    return true
  }
  if (!Array.isArray(entry.hooks)) entry.hooks = []
  const i = entry.hooks.findIndex((h) => h && h.id === def.id)
  if (i === -1) {
    entry.hooks.push(desired)
    return true
  }
  if (entry.hooks[i].command !== CMD || entry.hooks[i].type !== 'command') {
    entry.hooks[i] = desired
    return true
  }
  return false
}

export function injectClaudeHooks({ dryRun, log }) {
  const settings = read()
  let mutated = false
  for (const def of hookDefs()) {
    if (injectOne(settings, def)) {
      mutated = true
      log(`  + hook: ${def.event}[${def.matcher}] → ${CMD}`)
    }
  }
  if (mutated && !dryRun) write(settings)
  if (!mutated) log('  ~ hooks: 已最新（无变化）')
}

export function removeClaudeHooks({ dryRun, log }) {
  if (!fs.existsSync(CLAUDE_SETTINGS_FILE)) return
  const settings = read()
  if (!settings.hooks) return
  const ourIds = new Set(hookDefs().map((d) => d.id))
  let mutated = false
  for (const event of Object.keys(settings.hooks)) {
    const buckets = settings.hooks[event]
    if (!Array.isArray(buckets)) continue
    for (const entry of buckets) {
      if (!entry || !Array.isArray(entry.hooks)) continue
      const before = entry.hooks.length
      entry.hooks = entry.hooks.filter((h) => !h || !ourIds.has(h.id))
      if (entry.hooks.length !== before) mutated = true
    }
    settings.hooks[event] = buckets.filter((e) => e && Array.isArray(e.hooks) && e.hooks.length > 0)
    if (settings.hooks[event].length === 0) delete settings.hooks[event]
  }
  if (settings.hooks && Object.keys(settings.hooks).length === 0) delete settings.hooks
  if (mutated) {
    log('  - Claude Code 会话日志 hook 已移除')
    if (!dryRun) write(settings)
  }
}
