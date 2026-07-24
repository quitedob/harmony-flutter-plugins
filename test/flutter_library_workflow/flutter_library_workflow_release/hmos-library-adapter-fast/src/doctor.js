import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import {
  IS_PACKAGED,
  PKG_VERSION,
  PACKAGE_ROOT,
  ROUTER_PROMPT,
  PLATFORMS,
  ENTRY_AGENT_NAME,
  PLUGIN_ENTRY,
  platformPromptsDir,
  platformOpencodeJson,
  OPENCODE_CONFIG_FILE,
  OPENCODE_PLUGINS_DIR,
  CLAUDE_AGENTS_DIR,
  listSkills,
  skillsForPlatform,
  REQUIRED_SKILLS,
  NEEDS_PYTHON,
} from './paths.js'
import { loadAgents } from './agent-source.js'
import { readManifest } from './manifest.js'
import { detectPlatform } from './detect.js'

const ok = (s) => console.log(`  ✓ ${s}`)
const warn = (s) => console.log(`  ! ${s}`)
const info = (s) => console.log(s)

/** 跨平台「命令是否在 PATH」：Windows 用 where（能识别 .cmd/.exe），posix 用 which。 */
function onPath(cmd) {
  const finder = process.platform === 'win32' ? 'where' : 'which'
  try {
    execFileSync(finder, [cmd], { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

export function doctor() {
  info('hmos-library-adapter-fast doctor')
  info('')

  info('[Package / agent 内容源]')
  info(`  version:      ${PKG_VERSION}`)
  info(`  package root: ${PACKAGE_ROOT}`)
  info(`  mode:         ${IS_PACKAGED ? 'packaged（读 shared/）' : 'dev（直读 sibling agent-*-fast + agent-core）'}`)
  if (fs.existsSync(ROUTER_PROMPT)) ok(`顶层路由 prompt: ${ROUTER_PROMPT}`)
  else warn(`顶层路由 prompt 缺失: ${ROUTER_PROMPT}`)

  for (const p of PLATFORMS) {
    const pd = platformPromptsDir(p)
    const oc = platformOpencodeJson(p)
    const n = fs.existsSync(pd) ? fs.readdirSync(pd).filter((f) => f.endsWith('.md')).length : 0
    if (fs.existsSync(pd) && fs.existsSync(oc)) ok(`平台 ${p.id}: ${n} prompt + opencode.json`)
    else warn(`平台 ${p.id} 内容缺失（prompts:${fs.existsSync(pd)} opencode:${fs.existsSync(oc)}）`)
  }

  try {
    const { entry, platforms } = loadAgents()
    ok(`入口: ${entry.name}`)
    for (const pf of platforms) {
      ok(`  ${pf.id}: 编排器 ${pf.orchestrator.name} → 阶段 ${pf.stages.map((s) => s.name).join(', ')}`)
    }
  } catch (e) {
    warn(`agent 装配失败: ${e.message}`)
  }

  const skills = listSkills()
  const names = skills.map((s) => s.name)
  ok(`skill 源: ${skills.length} 个（去重后）`)
  for (const must of REQUIRED_SKILLS) {
    if (!names.includes(must)) warn(`关键 skill 缺失: ${must}`)
  }
  info('')

  info('[宿主安装态]')
  const m = readManifest()
  // OpenCode：插件版只看 plugin symlink 或 plugin 数组项是否就位（agent/skill 运行时注入）
  let ocVia = null
  const shim = path.join(OPENCODE_PLUGINS_DIR, `${ENTRY_AGENT_NAME}.js`)
  try {
    const st = fs.lstatSync(shim)
    if (st.isSymbolicLink()) {
      const t = fs.readlinkSync(shim)
      const abs = path.isAbsolute(t) ? t : path.join(OPENCODE_PLUGINS_DIR, t)
      const norm = abs.replace(/\\/g, '/') // Windows 反斜杠 → 正斜杠，正则才能匹配
      if (path.resolve(abs) === path.resolve(PLUGIN_ENTRY) || /@?hmos-library-adapter[-/]fast\/src\/plugin\.js$/.test(norm)) {
        ocVia = `plugin symlink (${shim})`
      }
    } else if (fs.readFileSync(shim, 'utf8').includes(`managed-by: ${ENTRY_AGENT_NAME}`)) {
      ocVia = `plugin shim 文件(旧版，建议重跑 install 升级为 symlink)`
    }
  } catch {
    /* 无 shim */
  }
  if (!ocVia && fs.existsSync(OPENCODE_CONFIG_FILE)) {
    try {
      const cfg = JSON.parse(fs.readFileSync(OPENCODE_CONFIG_FILE, 'utf8'))
      if (Array.isArray(cfg.plugin) && cfg.plugin.includes('@hmos-library-adapter/fast')) ocVia = 'plugin 数组项'
      // 旧静态版残留提示
      const stale = cfg.agent ? Object.keys(cfg.agent).filter((k) => cfg.agent[k] && cfg.agent[k]._managedBy === ENTRY_AGENT_NAME) : []
      if (stale.length) warn(`OpenCode 残留 ${stale.length} 条旧静态 agent（重跑 install 或 uninstall 可清理）`)
    } catch {
      /* ignore */
    }
  }
  if (ocVia) ok(`OpenCode: 已注册（${ocVia}），agent/skill 运行时注入`)
  else warn('OpenCode 未安装（运行 install --target opencode）')

  const claudePresent = (m.claudeAgents || []).filter((n) => fs.existsSync(path.join(CLAUDE_AGENTS_DIR, `${n}.md`)))
  if (claudePresent.length) ok(`ClaudeCode: ${claudePresent.length} 个 agent 文件`)
  else warn('ClaudeCode 未安装（运行 install --target claudecode）')

  ok('技能交付：OpenCode→插件 skills.paths；两宿主通用→适配时按平台注入目标库 .claude/skills/（inject-skills，文件路径访问）')
  if ((m.skills || []).length) warn(`检测到旧版全局 ~/.claude/skills 残留 ${m.skills.length} 个，重跑 install 会清理`)
  info('')

  info('[运行时依赖]')
  // 入口路由器在宿主里以裸命令名调 `hmos-library-adapter-fast detect` → 必须在 PATH（推荐全局安装）
  if (onPath(ENTRY_AGENT_NAME)) {
    ok(`裸命令在 PATH: ${ENTRY_AGENT_NAME}（路由器 detect 可用）`)
  } else {
    warn(`裸命令不在 PATH: ${ENTRY_AGENT_NAME} —— 路由器第 1 步会失败。请全局安装（npm i -g @hmos-library-adapter/fast）`)
  }
  if (NEEDS_PYTHON) {
    // Windows 上 Python 常名为 python / py（非 python3）
    const candidates = process.platform === 'win32' ? ['python', 'py', 'python3'] : ['python3', 'python']
    let found = null
    for (const c of candidates) {
      try {
        const v = execFileSync(c, ['--version'], { encoding: 'utf8' }).trim()
        if (v) {
          found = `${c} → ${v}`
          break
        }
      } catch {
        /* 试下一个 */
      }
    }
    if (found) ok(`python 可用（rn rnohos.py 依赖）: ${found}`)
    else warn(`python 未找到（试过 ${candidates.join('/')}）—— rn 平台的 rnohos.py 无法运行`)
  }
  if (onPath('opencode')) ok('opencode CLI 可用')
  else warn('opencode CLI 未找到（仅 OpenCode 宿主需要）')
  // 会话日志：只读 SQLite 直读，不 spawn 任何 opencode 进程
  info('  会话日志: 只读 SQLite 直读（无 spawn）')
  info('')

  info('[当前目录检测]')
  const det = detectPlatform(process.cwd())
  info(`  cwd 判定: platform=${det.platform} confidence=${det.confidence}`)
  for (const e of det.evidence) info(`    - ${e}`)
  if (['flutter', 'rn', 'sdk'].includes(det.platform)) {
    const n = skillsForPlatform(det.platform).length
    info(`  → 适配时将注入 ${n} 个技能到 ./.claude/skills/（inject-skills ${det.platform}）`)
  }
}
