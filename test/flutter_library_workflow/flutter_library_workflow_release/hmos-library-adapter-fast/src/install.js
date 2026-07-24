import fs from 'node:fs'
import path from 'node:path'
import {
  OPENCODE_CONFIG_DIR,
  OPENCODE_CONFIG_FILE,
  OPENCODE_PLUGINS_DIR,
  CLAUDE_AGENTS_DIR,
  ENTRY_AGENT_NAME,
  PLUGIN_ENTRY,
  IS_PACKAGED,
  PKG_VERSION,
} from './paths.js'
import { loadAgents } from './agent-source.js'
import { uninstallSkillSymlinks } from './skill-symlinks.js'
import { injectClaudeHooks, removeClaudeHooks } from './claude-hooks.js'
import { readManifest, writeManifest, clearManifest } from './manifest.js'

const MANAGED = ENTRY_AGENT_NAME
// 入口路由器 + 平台编排器：要唤起下一级子 agent，必须带 `Agent` 工具（不是 Task！）；
// 只编排不写码 → 不给 Write/Edit。
const ROUTER_TOOLS = 'Bash, Read, Glob, Grep, Agent'
const ORCH_TOOLS = 'Bash, Read, Glob, Grep, Agent'
// 阶段子 agent：真正干活的叶子，不再往下起子 agent → 不给 Agent。
const STAGE_TOOLS = 'Bash, Read, Write, Edit, Glob, Grep, WebFetch, WebSearch, Skill'

// ── OpenCode 插件引用常量 ──
const OPENCODE_PLUGIN_PKG = '@hmos-library-adapter/fast'
const PLUGIN_SHIM_NAME = `${ENTRY_AGENT_NAME}.js`
const PLUGIN_MARKER = `managed-by: ${MANAGED}`

export function install({ target = 'both', dryRun = false, force = false } = {}) {
  const log = (s) => console.log(s)
  log(`hmos-library-adapter-fast v${PKG_VERSION} install (target=${target}, dry-run=${dryRun}, force=${force})`)
  log(`  mode: ${IS_PACKAGED ? 'packaged (shared/)' : 'dev (直读 sibling agent-*-fast + agent-core)'}`)
  log(`  入口: ${ENTRY_AGENT_NAME}（用户唯一调用，检测 + 路由）`)
  log('')

  const { entry, platforms } = loadAgents()
  const manifest = readManifest()

  if (target === 'opencode' || target === 'both') {
    log('[OpenCode]')
    installOpenCode({ entry, platforms, dryRun, log, manifest })
    log('')
  }
  if (target === 'claudecode' || target === 'both') {
    log('[ClaudeCode]')
    manifest.claudeAgents = installClaudeCode({ entry, platforms, dryRun, force, log })
    log('')
  }

  // 技能不再全局铺到 ~/.claude/skills —— 改为适配时由 router 经 `inject-skills <platform>`
  // 按平台注入目标库 .claude/skills/（两宿主按文件路径访问）。此处仅清理旧版残留的全局软链。
  if ((manifest.skills || []).length) {
    log('[Skills] 清理旧版全局 ~/.claude/skills 软链（改为适配时按平台注入目标库）')
    uninstallSkillSymlinks({ skillNames: manifest.skills, dryRun, log })
    if (!dryRun) manifest.skills = []
    log('')
  }

  if (!dryRun) writeManifest(manifest)
  log(`${dryRun ? '(dry-run) ' : '✓ '}Done. 运行 \`hmos-library-adapter-fast doctor\` 验证。`)
}

/**
 * OpenCode 安装 = 写一个插件引用，让 plugin.js 在运行时注入 agent + skills.paths。
 * 不再把全部 agent 静态写进用户 opencode.json。
 *
 * 引用方式：
 *   - 包在稳定位置（全局安装 / dev 仓库）→ 在 ~/.config/opencode/plugins/ 建一个指向本包
 *     src/plugin.js 的 symlink。Node/Bun 加载时按 realpath 解析 → 归属 package.json 为本包
 *     （type:module），ESM 与相对 import 均正确。
 *   - 包在 _npx / ~/.cache 临时目录 → 回退写 opencode.json 的 plugin 数组项，OpenCode 启动时自行拉取。
 */
function installOpenCode({ entry, platforms, dryRun, log, manifest }) {
  if (!dryRun) fs.mkdirSync(OPENCODE_CONFIG_DIR, { recursive: true })
  let cfg = { $schema: 'https://opencode.ai/config.json' }
  if (fs.existsSync(OPENCODE_CONFIG_FILE)) {
    try {
      cfg = JSON.parse(fs.readFileSync(OPENCODE_CONFIG_FILE, 'utf8'))
    } catch (e) {
      throw new Error(`现有 ${OPENCODE_CONFIG_FILE} 不是合法 JSON，无法合并: ${e.message}`)
    }
  }

  // 清理旧版「静态注入」残留的本工具 agent（从静态版升级到插件版的迁移路径）
  sweepStaticAgents(cfg, entry, platforms, log)

  let usedShim = false
  if (isEntryStable()) usedShim = installPluginSymlink(dryRun, log)

  if (usedShim) {
    // 本地 symlink 模式：移除可能残留的 npm plugin 数组项，避免双载
    if (Array.isArray(cfg.plugin) && cfg.plugin.includes(OPENCODE_PLUGIN_PKG)) {
      cfg.plugin = cfg.plugin.filter((p) => p !== OPENCODE_PLUGIN_PKG)
      if (cfg.plugin.length === 0) delete cfg.plugin
      log(`  - plugin 数组项: ${OPENCODE_PLUGIN_PKG}（已被本地 symlink 取代）`)
    }
    manifest.opencodePlugin = pluginShimPath()
  } else {
    // 回退 npm plugin 模式
    const list = Array.isArray(cfg.plugin) ? cfg.plugin : []
    if (!list.includes(OPENCODE_PLUGIN_PKG)) {
      list.push(OPENCODE_PLUGIN_PKG)
      log(`  + plugin: ${OPENCODE_PLUGIN_PKG}（临时安装位置，OpenCode 启动时自行拉取）`)
    } else {
      log(`  ~ plugin: ${OPENCODE_PLUGIN_PKG}（已注册）`)
    }
    cfg.plugin = list
    manifest.opencodePlugin = null
  }
  manifest.opencodeAgents = [] // 插件版不再有静态 agent

  if (!dryRun) fs.writeFileSync(OPENCODE_CONFIG_FILE, JSON.stringify(cfg, null, 2))
  log(`  config: ${OPENCODE_CONFIG_FILE}`)
  log(`  agent + skill 由 plugin 运行时注入（opencode.json 仅留 1 个 plugin 引用）`)
}

function pluginShimPath() {
  return path.join(OPENCODE_PLUGINS_DIR, PLUGIN_SHIM_NAME)
}

/** 运行中的本包是否在稳定位置（非 npx/cache 临时目录），可用作持久 shim 目标。 */
function isEntryStable() {
  const p = PLUGIN_ENTRY
  if (p.includes(`${path.sep}_npx${path.sep}`)) return false
  if (p.includes(`${path.sep}.cache${path.sep}`)) return false
  return fs.existsSync(p)
}

/** dst 是否「本工具所建」：指向本包 plugin.js 的 symlink，或旧版残留的带标记 shim 文件。 */
function isOurPluginSlot(dst) {
  let st
  try {
    st = fs.lstatSync(dst)
  } catch {
    return 'absent'
  }
  if (st.isSymbolicLink()) {
    let abs = ''
    try {
      const t = fs.readlinkSync(dst)
      abs = path.isAbsolute(t) ? t : path.join(path.dirname(dst), t)
    } catch {
      /* ignore */
    }
    if (path.resolve(abs) === path.resolve(PLUGIN_ENTRY)) return 'ours-current'
    // 跨路径升级：文件名匹配本包约定也认作 ours
    if (/[/\\]hmos-library-adapter-fast[/\\]src[/\\]plugin\.js$/.test(abs)) return 'ours-stale'
    if (/[/\\]@hmos-library-adapter[/\\]fast[/\\]src[/\\]plugin\.js$/.test(abs)) return 'ours-stale'
    return 'foreign'
  }
  // 普通文件：可能是旧版（已废弃）的 file:// shim
  try {
    if (fs.readFileSync(dst, 'utf8').slice(0, 200).includes(PLUGIN_MARKER)) return 'ours-legacy-file'
  } catch {
    /* ignore */
  }
  return 'foreign'
}

/** 在 plugins/ 建指向本包 plugin.js 的 symlink。Do No Harm：槽位被非本工具占用则跳过。 */
function installPluginSymlink(dryRun, log) {
  const dst = pluginShimPath()
  const kind = isOurPluginSlot(dst)
  if (kind === 'foreign') {
    log(`  ! plugin 槽位被非本工具文件占用，跳过（手动移除 ${dst} 后重装可启用）`)
    return false
  }
  if (kind === 'ours-current') {
    log(`  ~ plugin symlink: ${PLUGIN_SHIM_NAME}（已最新）`)
    return true
  }
  if (!dryRun) {
    try {
      fs.mkdirSync(OPENCODE_PLUGINS_DIR, { recursive: true })
      if (kind !== 'absent') fs.rmSync(dst, { force: true }) // 刷新旧 symlink / 清理旧 file:// shim
      fs.symlinkSync(PLUGIN_ENTRY, dst, 'file')
    } catch (e) {
      // Windows 无 Developer Mode/管理员权限时 symlink 报 EPERM → 返回 false，
      // 由调用方回退到 opencode.json 的 plugin 数组（需包已发布到 npm）。
      log(`  ! 建 plugin symlink 失败（${e.code || e.message}）→ 回退 plugin 数组模式`)
      return false
    }
  }
  log(`  + plugin symlink: ${dst} → ${PLUGIN_ENTRY}`)
  return true
}

function removePluginSymlink(dryRun, log) {
  const dst = pluginShimPath()
  const kind = isOurPluginSlot(dst)
  if (kind === 'absent' || kind === 'foreign') return
  if (!dryRun) fs.rmSync(dst, { force: true })
  log(`  - plugin symlink: ${dst}`)
}

/** 删除 cfg.agent 中由旧静态版写入的本工具 agent（_managedBy 命中）。 */
function sweepStaticAgents(cfg, entry, platforms, log) {
  if (!cfg.agent) return
  const names = [
    entry.name,
    ...platforms.flatMap((pf) => [pf.orchestrator.name, ...pf.stages.map((s) => s.name)]),
  ]
  let n = 0
  for (const name of names) {
    if (cfg.agent[name] && isOurs(cfg.agent[name])) {
      delete cfg.agent[name]
      n++
    }
  }
  if (Object.keys(cfg.agent).length === 0) delete cfg.agent
  if (n) log(`  ~ 清理 ${n} 条旧静态 agent（改由 plugin 注入）`)
}

function installClaudeCode({ entry, platforms, dryRun, force, log }) {
  if (!dryRun) fs.mkdirSync(CLAUDE_AGENTS_DIR, { recursive: true })
  const names = []

  const write = (name, description, tools, body) => {
    const file = path.join(CLAUDE_AGENTS_DIR, `${name}.md`)
    if (fs.existsSync(file) && !force) {
      const head = fs.readFileSync(file, 'utf8').slice(0, 400)
      if (!head.includes(`managed-by: ${MANAGED}`)) {
        throw new Error(`ClaudeCode 已存在 agent 文件 ${name}.md（非本工具所建）。加 --force 覆盖。`)
      }
    }
    const fm = ['---', `name: ${name}`, `description: ${description}`, `tools: ${tools}`, `managed-by: ${MANAGED}`, '---', ''].join('\n')
    if (!dryRun) fs.writeFileSync(file, fm + body)
    names.push(name)
  }

  // 入口路由器：对外可见
  write(entry.name, entry.description, ROUTER_TOOLS, entry.promptText)
  log(`  + 入口 agent: ~/.claude/agents/${entry.name}.md`)
  // 每平台：编排器（内部）+ 阶段（内部）
  for (const pf of platforms) {
    const oDesc = `INTERNAL - ${pf.orchestrator.description}。仅由 ${ENTRY_AGENT_NAME} 经 Task 唤起，用户不要直接 @ 它。`
    write(pf.orchestrator.name, oDesc, ORCH_TOOLS, pf.orchestrator.promptText)
    log(`  + 内部编排器: ~/.claude/agents/${pf.orchestrator.name}.md  [${pf.id}]`)
    for (const s of pf.stages) {
      const sDesc = `INTERNAL - ${s.description}。仅由 ${pf.orchestrator.name} 经 Task 唤起，用户不要直接 @ 它。`
      write(s.name, sDesc, STAGE_TOOLS, s.promptText)
      log(`    + 内部阶段: ~/.claude/agents/${s.name}.md`)
    }
  }
  log(`  agents dir: ${CLAUDE_AGENTS_DIR}`)
  // 会话日志 hook：Stop / SubagentStop → `hmos-library-adapter-fast log-session`
  injectClaudeHooks({ dryRun, log })
  return names
}

function isOurs(agentDef) {
  return agentDef && typeof agentDef === 'object' && agentDef._managedBy === MANAGED
}

// ── uninstall ──
export function uninstall({ target = 'both', dryRun = false } = {}) {
  const log = (s) => console.log(s)
  log(`hmos-library-adapter-fast uninstall (target=${target}, dry-run=${dryRun})`)
  log('')
  const manifest = readManifest()

  if (target === 'opencode' || target === 'both') {
    log('[OpenCode]')
    uninstallOpenCode({ dryRun, log })
    if (!dryRun) {
      manifest.opencodeAgents = []
      manifest.opencodePlugin = null
    }
    log('')
  }
  if (target === 'claudecode' || target === 'both') {
    log('[ClaudeCode]')
    uninstallClaudeCode({ names: manifest.claudeAgents, dryRun, log })
    if (!dryRun) manifest.claudeAgents = []
    log('')
  }

  log('[Skills]')
  uninstallSkillSymlinks({ skillNames: manifest.skills, dryRun, log })
  if (!dryRun) manifest.skills = []
  log('')

  if (!dryRun) {
    if (target === 'both') clearManifest()
    else writeManifest(manifest)
  }
  log(`${dryRun ? '(dry-run) ' : '✓ '}Done.`)
}

function uninstallOpenCode({ dryRun, log }) {
  removePluginSymlink(dryRun, log)

  if (!fs.existsSync(OPENCODE_CONFIG_FILE)) return
  let cfg
  try {
    cfg = JSON.parse(fs.readFileSync(OPENCODE_CONFIG_FILE, 'utf8'))
  } catch {
    log('  ! opencode.json 解析失败，跳过')
    return
  }
  let mutated = false

  if (Array.isArray(cfg.plugin) && cfg.plugin.includes(OPENCODE_PLUGIN_PKG)) {
    cfg.plugin = cfg.plugin.filter((p) => p !== OPENCODE_PLUGIN_PKG)
    if (cfg.plugin.length === 0) delete cfg.plugin
    mutated = true
    log(`  - plugin: ${OPENCODE_PLUGIN_PKG}`)
  }

  // 兜底清理：任何残留的本工具静态 agent（旧版升级 / 中途切换）
  if (cfg.agent) {
    for (const [k, v] of Object.entries(cfg.agent)) {
      if (isOurs(v)) {
        delete cfg.agent[k]
        mutated = true
        log(`  - 残留静态 agent: ${k}`)
      }
    }
    if (Object.keys(cfg.agent).length === 0) delete cfg.agent
  }

  if (!dryRun && mutated) fs.writeFileSync(OPENCODE_CONFIG_FILE, JSON.stringify(cfg, null, 2))
}

function uninstallClaudeCode({ names, dryRun, log }) {
  removeClaudeHooks({ dryRun, log })
  if (!fs.existsSync(CLAUDE_AGENTS_DIR)) return
  for (const name of names || []) {
    const file = path.join(CLAUDE_AGENTS_DIR, `${name}.md`)
    if (!fs.existsSync(file)) continue
    const head = fs.readFileSync(file, 'utf8').slice(0, 400)
    if (!head.includes(`managed-by: ${MANAGED}`)) continue
    if (!dryRun) fs.rmSync(file, { force: true })
    log(`  - agent: ~/.claude/agents/${name}.md`)
  }
}
