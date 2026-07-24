#!/usr/bin/env node
/**
 * stage-agent.mjs — 把三平台 agent + 公共 skill「快照」进本包 shared/。
 *
 * 单一事实源（不在本包里）：
 *   ../agent-<platform>-fast/.claude/prompts  → shared/<id>/prompts
 *   ../agent-<platform>-fast/opencode.json     → shared/<id>/opencode.json
 *   ../agent-<platform>-fast/.claude/skills/*  → shared/skills/*   （各平台并入，去重）
 *   ../agent-core/.claude/skills/*             → shared/skills/*   （公共 doc skill，只一份）
 *
 * 顶层路由 prompt（agent/orchestrator.md）是本包自有、直接随包发布，不在此快照。
 *
 *   prepack  → 生成 shared/，进 tarball
 *   postpack → --clean 删除 shared/，git 仓不留快照
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { PLATFORMS, COMMON_DIRNAME, EXCLUDED_SKILLS, EXCLUDED_PROMPT_SUBDIRS } from '../src/config.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const WORKSPACE = path.resolve(ROOT, '..')
const SHARED = path.join(ROOT, 'shared')

const clean = process.argv.includes('--clean')

function copyDir(src, dst) {
  if (!fs.existsSync(src)) throw new Error(`source missing: ${src}`)
  fs.mkdirSync(path.dirname(dst), { recursive: true })
  fs.cpSync(src, dst, { recursive: true, dereference: true })
}

/**
 * 控制入口：按 p.stages 白名单裁剪已快照的 shared/<id>/——从 opencode.json 删除非白名单 key，
 * 并删掉对应的 prompt 文件。编排器 entryKey 始终保留。未定义 stages 则不裁剪（旧行为）。
 */
function pruneStages(p) {
  if (!Array.isArray(p.stages)) return
  const ocPath = path.join(SHARED, p.id, 'opencode.json')
  const promptsDir = path.join(SHARED, p.id, 'prompts')
  const cfg = JSON.parse(fs.readFileSync(ocPath, 'utf8'))
  const keep = new Set([p.entryKey, ...p.stages])
  let removed = 0
  for (const key of Object.keys(cfg.agent || {})) {
    if (keep.has(key)) continue
    const m = String(cfg.agent[key].prompt || '').match(/\{file:.*\/([^/}]+\.md)\}/)
    if (m) {
      try {
        fs.rmSync(path.join(promptsDir, m[1]), { force: true })
      } catch {
        /* ignore */
      }
    }
    delete cfg.agent[key]
    removed++
  }
  fs.writeFileSync(ocPath, JSON.stringify(cfg, null, 2))
  console.error(`[stage] ${p.id}: 按 stages 白名单裁剪，移除 ${removed} 个非白名单 key（保留 ${keep.size}）`)
}

/**
 * 把 <agentDir>/CLAUDE.md 快照进 shared/<id>/CLAUDE.md。
 * 与 skill 同理随包发布；运行时由 `inject-skills <platform>` 复制进目标库 .claude/CLAUDE.md
 * （Claude Code 把 ./.claude/CLAUDE.md 作为 project 级记忆自动加载）。无则跳过。
 */
function stageClaudeMd(base, p) {
  const src = path.join(base, 'CLAUDE.md')
  if (!fs.existsSync(src)) {
    console.error(`[stage] ${p.id}: 无 CLAUDE.md，跳过`)
    return
  }
  fs.copyFileSync(src, path.join(SHARED, p.id, 'CLAUDE.md'))
}

function copySkills(srcSkillsDir) {
  if (!fs.existsSync(srcSkillsDir)) {
    console.error(`[stage] skills dir missing, skip: ${srcSkillsDir}`)
    return []
  }
  const names = fs
    .readdirSync(srcSkillsDir)
    .filter((n) => !n.startsWith('.') && !EXCLUDED_SKILLS.includes(n))
  for (const name of names) {
    const dst = path.join(SHARED, 'skills', name)
    if (fs.existsSync(dst)) continue // 去重：公共/重名 skill 只拷一次
    copyDir(path.join(srcSkillsDir, name), dst)
  }
  return names
}

function main() {
  fs.rmSync(SHARED, { recursive: true, force: true })
  if (clean) {
    console.error('[stage] cleaned shared/')
    return
  }

  const allSkills = new Set()
  // 平台 → skill 名单（供插件 per-agent 白名单；packaged 下 shared/skills 已扁平化、丢失归属，故在此持久化）
  const skillMap = { platforms: {}, common: [] }
  for (const p of PLATFORMS) {
    const base = path.join(WORKSPACE, p.agentDir)
    copyDir(path.join(base, '.claude', 'prompts'), path.join(SHARED, p.id, 'prompts'))
    copyDir(path.join(base, 'opencode.json'), path.join(SHARED, p.id, 'opencode.json'))
    stageClaudeMd(base, p) // CLAUDE.md（平台共享规则）随包快照，适配时由 inject-skills 注入目标库 .claude/
    pruneStages(p) // 按 stages 白名单裁剪 opencode.json + prompt（控制打入的阶段）
    for (const sub of EXCLUDED_PROMPT_SUBDIRS) {
      // 剔除孤儿 prompt 子目录（如 test/——未在 opencode.json 注册、pruneStages 覆盖不到）
      fs.rmSync(path.join(SHARED, p.id, 'prompts', sub), { recursive: true, force: true })
    }
    const names = copySkills(path.join(base, '.claude', 'skills'))
    names.forEach((s) => allSkills.add(s))
    skillMap.platforms[p.id] = names
    console.error(`[stage] ${p.id}: prompts + opencode.json + skills`)
  }
  // 公共 doc skill（只一份）
  skillMap.common = copySkills(path.join(WORKSPACE, COMMON_DIRNAME, '.claude', 'skills'))
  skillMap.common.forEach((s) => allSkills.add(s))

  fs.writeFileSync(path.join(SHARED, 'skill-map.json'), JSON.stringify(skillMap, null, 2))

  console.error(`[stage] 平台 ${PLATFORMS.length} 个，skill 去重后 ${allSkills.size} 个：${[...allSkills].join(', ')}`)
  console.error(`[stage] shared/ ready at ${path.relative(WORKSPACE, SHARED)}`)
}

main()
