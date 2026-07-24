import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { fileURLToPath } from 'node:url'
import * as cfg from './config.js'

const realFile = fs.realpathSync(fileURLToPath(import.meta.url))
export const PACKAGE_ROOT = path.resolve(path.dirname(realFile), '..')

const PACKAGED_SHARED = path.join(PACKAGE_ROOT, 'shared')
/** 已发布 tarball 里 shared/ 存在 → packaged；否则本地 dev 直读 sibling 源。 */
export const IS_PACKAGED = fs.existsSync(PACKAGED_SHARED)

/** 正在运行的这份包的版本（读包内 package.json）。反映「实际被调用的副本」的版本。 */
export const PKG_VERSION = (() => {
  try {
    return JSON.parse(fs.readFileSync(path.join(PACKAGE_ROOT, 'package.json'), 'utf8')).version || 'unknown'
  } catch {
    return 'unknown'
  }
})()

const WORKSPACE = path.resolve(PACKAGE_ROOT, '..')

// ── 透传 config ──
export const PLATFORMS = cfg.PLATFORMS
export const ENTRY_AGENT_NAME = cfg.ENTRY_AGENT_NAME
export const ENTRY_DESCRIPTION = cfg.ENTRY_DESCRIPTION
export const NEEDS_PYTHON = cfg.NEEDS_PYTHON
export const REQUIRED_SKILLS = cfg.REQUIRED_SKILLS

/** 顶层路由器 prompt：本包自有（非 sibling 快照），dev/packaged 都直接在包内 agent/ 下。 */
export const ROUTER_PROMPT = path.join(PACKAGE_ROOT, 'agent', 'orchestrator.md')

/** OpenCode 插件入口（本包内）。install 在 plugins/ 写一个「file:// 再导出」shim 指向它。 */
export const PLUGIN_ENTRY = path.join(PACKAGE_ROOT, 'src', 'plugin.js')

/** 某平台的 prompt 目录（packaged: shared/<id>/prompts；dev: <agentDir>/.claude/prompts）。 */
export function platformPromptsDir(p) {
  return IS_PACKAGED
    ? path.join(PACKAGED_SHARED, p.id, 'prompts')
    : path.join(WORKSPACE, p.agentDir, '.claude', 'prompts')
}

/** 某平台的 opencode.json。 */
export function platformOpencodeJson(p) {
  return IS_PACKAGED
    ? path.join(PACKAGED_SHARED, p.id, 'opencode.json')
    : path.join(WORKSPACE, p.agentDir, 'opencode.json')
}

/**
 * 某平台的 CLAUDE.md 源文件（共享规则，适配时注入目标库 .claude/CLAUDE.md）。
 * dev：<agentDir>/CLAUDE.md；packaged：shared/<id>/CLAUDE.md。不存在返回 null。
 */
export function platformClaudeMd(platformId) {
  const p = cfg.PLATFORMS.find((x) => x.id === platformId)
  if (!p) return null
  const f = IS_PACKAGED
    ? path.join(PACKAGED_SHARED, p.id, 'CLAUDE.md')
    : path.join(WORKSPACE, p.agentDir, 'CLAUDE.md')
  return fs.existsSync(f) ? f : null
}

/**
 * skill 源目录。
 * packaged：单一 shared/skills（已含全部平台 + 公共，去重后）。
 * dev：每个平台 .claude/skills + agent-core/.claude/skills。
 */
export const SKILL_SOURCE_DIRS = IS_PACKAGED
  ? [path.join(PACKAGED_SHARED, 'skills')]
  : [
      ...cfg.PLATFORMS.map((p) => path.join(WORKSPACE, p.agentDir, '.claude', 'skills')),
      path.join(WORKSPACE, cfg.COMMON_DIRNAME, '.claude', 'skills'),
    ]

/** 展开所有 skill：[{ name, src }]，按 name 去重（公共 doc skill 只出现一次）。 */
export function listSkills() {
  const seen = new Map()
  for (const dir of SKILL_SOURCE_DIRS) {
    if (!fs.existsSync(dir)) continue
    for (const name of fs.readdirSync(dir)) {
      if (name.startsWith('.')) continue
      if (!seen.has(name)) seen.set(name, path.join(dir, name))
    }
  }
  return [...seen].map(([name, src]) => ({ name, src }))
}

/**
 * 平台 → skill 名单映射。
 *   packaged：读 shared/skill-map.json（stage 时生成）。
 *   dev：从 sibling 各平台 .claude/skills + agent-core/.claude/skills 目录派生。
 * 形状：{ platforms: { <id>: string[] }, common: string[] }
 */
export function loadSkillMap() {
  if (IS_PACKAGED) {
    try {
      return JSON.parse(fs.readFileSync(path.join(PACKAGED_SHARED, 'skill-map.json'), 'utf8'))
    } catch {
      /* 缺失 → 落到 dev 派生兜底（packaged 下一般是空目录，返回空名单） */
    }
  }
  const platforms = {}
  for (const p of cfg.PLATFORMS) {
    const d = path.join(WORKSPACE, p.agentDir, '.claude', 'skills')
    platforms[p.id] = fs.existsSync(d) ? fs.readdirSync(d).filter((n) => !n.startsWith('.')) : []
  }
  const cd = path.join(WORKSPACE, cfg.COMMON_DIRNAME, '.claude', 'skills')
  const common = fs.existsSync(cd) ? fs.readdirSync(cd).filter((n) => !n.startsWith('.')) : []
  return { platforms, common }
}

function denyAllExcept(names) {
  const o = { '*': 'deny' }
  for (const n of names) o[n] = 'allow'
  return o
}

/** 某平台 agent 的 skill 白名单：本平台 skill + 公共 doc skill，其余 deny。 */
export function platformSkillWhitelist(platformId) {
  const m = loadSkillMap()
  return denyAllExcept([...((m.platforms && m.platforms[platformId]) || []), ...(m.common || [])])
}

/** 入口路由器不做适配，不需要任何 skill。 */
export function routerSkillWhitelist() {
  return { '*': 'deny' }
}

/** 某平台需要的技能（本平台 + 公共），返回 [{ name, src }]。供 inject-skills 注入目标库用。 */
export function skillsForPlatform(platformId) {
  const m = loadSkillMap()
  const want = new Set([...((m.platforms && m.platforms[platformId]) || []), ...(m.common || [])])
  return listSkills().filter((s) => want.has(s.name))
}

/** 阶段子 agent 名：去掉 stripPrefix，前缀 stagePrefix。 */
export function namespacedStageName(platform, opencodeKey) {
  const suffix = opencodeKey.startsWith(platform.stripPrefix)
    ? opencodeKey.slice(platform.stripPrefix.length)
    : opencodeKey.replace(/^primary-/, '')
  return `${platform.stagePrefix}-${suffix}`
}

// ── 宿主路径 ──
export const HOME = os.homedir()
export const DATA_DIR = path.join(HOME, '.local', 'share', cfg.ENTRY_AGENT_NAME)
export const MANIFEST_PATH = path.join(DATA_DIR, 'install-manifest.json')

export const OPENCODE_CONFIG_DIR = process.env.XDG_CONFIG_HOME
  ? path.join(process.env.XDG_CONFIG_HOME, 'opencode')
  : path.join(HOME, '.config', 'opencode')
export const OPENCODE_CONFIG_FILE = path.join(OPENCODE_CONFIG_DIR, 'opencode.json')
/** OpenCode 加载本地插件的目录（plural；与本机已存在的 reference 包 symlink 同处）。 */
export const OPENCODE_PLUGINS_DIR = path.join(OPENCODE_CONFIG_DIR, 'plugins')

export const CLAUDE_DIR = path.join(HOME, '.claude')
export const CLAUDE_AGENTS_DIR = path.join(CLAUDE_DIR, 'agents')
export const CLAUDE_SKILLS_DIR = path.join(CLAUDE_DIR, 'skills')
export const CLAUDE_SETTINGS_FILE = path.join(CLAUDE_DIR, 'settings.json')

/**
 * skill 软链目标 = ~/.claude/skills，仅供 **Claude Code** 发现 skill。
 * OpenCode 端 skill 改由插件 skills.paths 直接从包内注入（见 plugin.js），不依赖此处。
 */
export const SKILLS_INSTALL_DIR = CLAUDE_SKILLS_DIR
