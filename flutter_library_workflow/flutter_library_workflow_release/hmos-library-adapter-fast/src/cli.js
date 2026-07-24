#!/usr/bin/env node
import { install, uninstall } from './install.js'
import { doctor } from './doctor.js'
import { detectPlatform } from './detect.js'
import { runClaudeSessionLog } from './session-log.js'
import { injectProjectSkills, injectProjectClaudeMd } from './skill-symlinks.js'
import { ENTRY_AGENT_NAME as BIN, PKG_VERSION } from './paths.js'

function parseArgs(argv) {
  const opts = { target: 'both', dryRun: false, force: false, json: false, dir: process.cwd() }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--dry-run') opts.dryRun = true
    else if (a === '--force') opts.force = true
    else if (a === '--json') opts.json = true
    else if (a.startsWith('--target=')) opts.target = a.split('=')[1]
    else if (a === '--target') opts.target = argv[++i]
    else if (a.startsWith('--dir=')) opts.dir = a.split('=')[1]
    else if (a === '--dir') opts.dir = argv[++i]
  }
  if (!['opencode', 'claudecode', 'both'].includes(opts.target)) {
    throw new Error(`--target 取值须为 opencode|claudecode|both（收到 "${opts.target}"）`)
  }
  return opts
}

const HELP = `${BIN} — HarmonyOS 三方库适配统一入口（自动判定 Flutter/RN/原生库）安装器

用法:
  ${BIN} <command> [options]

命令:
  install      安装入口 + 3 平台 agent + skill 到 OpenCode / ClaudeCode 宿主
  uninstall    卸载（仅移除本工具所建条目，Do No Harm）
  detect       检测当前/指定目录属于哪个平台（flutter/rn/sdk/unknown）
  inject-skills <flutter|rn|sdk>   把该平台+公共技能 + 共享规则注入当前/指定库的 .claude/{skills/,CLAUDE.md}（router 确认平台后调用）
  doctor       体检：内容源 / 安装态 / 运行时依赖 / 当前目录检测
  version      显示当前版本（亦可 --version / -v）
  log-session  [内部] Claude Code Stop/SubagentStop hook 入口（读 stdin，落会话日志）
  help         显示本帮助

选项:
  --target <opencode|claudecode|both>   默认 both
  --dry-run / --force                   预演 / 覆盖同名
  --dir <path>                          detect 指定目录（默认 CWD）
  --json                                detect 输出 JSON

示例:
  ${BIN} install
  ${BIN} detect --json
  ${BIN} doctor
`

function runDetect(opts) {
  const res = detectPlatform(opts.dir)
  if (opts.json) {
    console.log(JSON.stringify(res))
    return
  }
  console.log(`platform:   ${res.platform}`)
  console.log(`confidence: ${res.confidence}`)
  console.log('evidence:')
  for (const e of res.evidence) console.log(`  - ${e}`)
  if (res.candidates.length > 1) {
    console.log('candidates (多平台命中，需确认):')
    for (const c of res.candidates) console.log(`  · ${c.platform}: ${c.evidence.join('; ')}`)
  }
}

function runInjectSkills(rest) {
  let platform = null
  let dir = process.cwd()
  let dryRun = false
  for (let i = 0; i < rest.length; i++) {
    const a = rest[i]
    if (a === '--dry-run') dryRun = true
    else if (a === '--dir') dir = rest[++i]
    else if (a.startsWith('--dir=')) dir = a.split('=')[1]
    else if (!a.startsWith('--')) platform = a
  }
  if (!['flutter', 'rn', 'sdk'].includes(platform)) {
    throw new Error(`inject-skills 需平台参数 flutter|rn|sdk（收到 "${platform}"）`)
  }
  const log = (s) => console.log(s)
  log(`inject-skills platform=${platform} dir=${dir}${dryRun ? ' (dry-run)' : ''}`)
  const names = injectProjectSkills({ platform, dir, dryRun, log })
  const md = injectProjectClaudeMd({ platform, dir, dryRun, log })
  log(`${dryRun ? '(dry-run) ' : ''}注入 ${names.length} 个 skill${md ? ' + CLAUDE.md' : ''} 到 ${dir}/.claude/`)
}

function main() {
  const [cmd, ...rest] = process.argv.slice(2)
  switch (cmd) {
    case 'install':
      install(parseArgs(rest))
      break
    case 'uninstall':
      uninstall(parseArgs(rest))
      break
    case 'detect':
      runDetect(parseArgs(rest))
      break
    case 'inject-skills':
      runInjectSkills(rest)
      break
    case 'doctor':
      doctor()
      break
    case 'log-session':
      // Claude Code Stop/SubagentStop hook 入口：读 stdin 的 hook JSON，落 transcript。永远成功。
      runClaudeSessionLog(process.cwd())
      break
    case 'version':
    case '--version':
    case '-v':
      console.log(`${BIN} ${PKG_VERSION}`)
      break
    case 'help':
    case '--help':
    case '-h':
    case undefined:
      console.log(HELP)
      break
    default:
      console.error(`未知命令: ${cmd}\n`)
      console.log(HELP)
      process.exit(1)
  }
}

try {
  main()
} catch (e) {
  console.error(`✗ ${e.message}`)
  process.exit(1)
}
