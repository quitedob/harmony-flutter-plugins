import fs from 'node:fs'
import path from 'node:path'
import { listSkills, SKILLS_INSTALL_DIR, skillsForPlatform, platformClaudeMd } from './paths.js'

// Windows 普通用户无法创建符号链接（需 Developer Mode/管理员）；目录用 junction（无需提权）。
// posix 仍用 'dir' symlink。
const LINK_TYPE = process.platform === 'win32' ? 'junction' : 'dir'

/**
 * 把 skill 源（packaged: shared/skills；dev: agent-rn-fast + agent-core）软链进宿主 skill 目录。
 *
 * Do No Harm 规则（永不动用户原有 skill）：
 *  - 目标不存在            → 建软链
 *  - 目标是指向本包源的旧软链 → 重建（兼容路径变化）
 *  - 目标是实文件/指向别处   → 跳过 + 警告，不纳入 manifest
 *
 * 重要：本机 ~/.claude/skills 里 harmonyos-docs-lookup / harmonyos-sdk-api-lookup
 * 已是「实目录」(全局原件，adapt-workflow 在用) → 会被判为 foreign 而跳过，
 * 绝不覆盖。在没有全局原件的用户机上，这两个才会从包内被软链出来。
 *
 * 返回实际建立软链的 skill 名列表（供 manifest）。
 */
export function installSkillSymlinks({ dryRun, log }) {
  const installed = []
  if (!dryRun) fs.mkdirSync(SKILLS_INSTALL_DIR, { recursive: true })

  for (const { name, src } of listSkills()) {
    const dst = path.join(SKILLS_INSTALL_DIR, name)
    const kind = inspect(dst, src)
    if (kind === 'foreign') {
      log(`  ! skill skipped (foreign entry present): ~/.claude/skills/${name}`)
      continue
    }
    if (!dryRun) {
      if (kind === 'ours') fs.unlinkSync(dst)
      fs.symlinkSync(src, dst, LINK_TYPE)
    }
    installed.push(name)
    log(`  ~ skill: ${name} -> ~/.claude/skills/${name}`)
  }
  return installed
}

export function uninstallSkillSymlinks({ skillNames, dryRun, log }) {
  if (!fs.existsSync(SKILLS_INSTALL_DIR)) return
  const srcByName = new Map(listSkills().map(({ name, src }) => [name, src]))
  for (const name of skillNames || []) {
    const dst = path.join(SKILLS_INSTALL_DIR, name)
    const expectedSrc = srcByName.get(name)
    // 只删「软链且指回本包源」的条目，绝不误删用户实文件 / 指向别处的软链
    if (!expectedSrc || inspect(dst, expectedSrc) !== 'ours') continue
    if (!dryRun) fs.unlinkSync(dst)
    log(`  - skill: ~/.claude/skills/${name}`)
  }
}

/**
 * 项目级注入：把「该平台 + 公共」技能 symlink 进 `<dir>/.claude/skills/`，供两宿主**按文件路径**访问
 * （Claude：bash/Read；OpenCode：bash/Read + 插件 skills.paths 放行 symlink 目标）。
 * 在 router 确认平台后调用。规则：符号链接=刷新（含陈旧/跨版本路径）；真实文件/目录=外来跳过。幂等。
 * 注入后把 `.claude/skills/` 追加进目标库 .gitignore。
 */
export function injectProjectSkills({ platform, dir, dryRun = false, log = () => {} }) {
  const skills = skillsForPlatform(platform)
  if (!skills.length) {
    log(`  ! 平台 ${platform} 无可注入 skill（检查 skill-map / sibling 源）`)
    return []
  }
  const skillsDir = path.join(dir, '.claude', 'skills')
  if (!dryRun) fs.mkdirSync(skillsDir, { recursive: true })
  const injected = []
  for (const { name, src } of skills) {
    const dst = path.join(skillsDir, name)
    let st = null
    try {
      st = fs.lstatSync(dst)
    } catch {
      /* absent */
    }
    if (st && !st.isSymbolicLink()) {
      log(`  ! 跳过(已存在真实文件/目录): .claude/skills/${name}`)
      continue
    }
    if (!dryRun) {
      if (st) fs.rmSync(dst, { force: true }) // 刷新旧/陈旧 symlink
      fs.symlinkSync(src, dst, LINK_TYPE)
    }
    injected.push(name)
    log(`  ~ skill: ${name} -> .claude/skills/${name}`)
  }
  if (injected.length && !dryRun) {
    ensureGitignore(dir, '.claude/skills/', '# hmos-library-adapter-fast: 适配时按平台注入的技能（symlink 指向包内，勿提交）', log)
  }
  return injected
}

/** 内嵌于注入的 CLAUDE.md 顶部的归属标记（HTML 块注释，Claude 注入上下文前会剥除、不耗 token）。 */
const CLAUDE_MD_MARK = '<!-- managed-by: hmos-library-adapter-fast — 适配时按平台注入的共享规则，勿提交、勿手改 -->'

/**
 * 项目级注入：把该平台的 CLAUDE.md（共享规则）复制进 `<dir>/.claude/CLAUDE.md`。
 * Claude Code 把 `./.claude/CLAUDE.md` 作为 project 级记忆**自动加载**（含随后 spawn 的子 agent，
 * 它们在同 CWD 重新走目录树发现）。放 `.claude/` 而非根，避开与目标库自带根 `CLAUDE.md` 冲突。
 *
 * Do No Harm：目标已存在且**不含**本工具 marker（即用户/目标库自有）→ 跳过不覆盖；
 * 含 marker 或不存在 → 写入/刷新。注入后把 `.claude/CLAUDE.md` 追加进目标库 .gitignore。
 */
export function injectProjectClaudeMd({ platform, dir, dryRun = false, log = () => {} }) {
  const src = platformClaudeMd(platform)
  if (!src) {
    log(`  ! 平台 ${platform} 无 CLAUDE.md 可注入（检查 shared/<id> / sibling 源）`)
    return false
  }
  const dst = path.join(dir, '.claude', 'CLAUDE.md')
  if (fs.existsSync(dst)) {
    const head = fs.readFileSync(dst, 'utf8').slice(0, 200)
    if (!head.includes('managed-by: hmos-library-adapter-fast')) {
      log(`  ! 跳过(已存在外来 .claude/CLAUDE.md，不覆盖)`)
      return false
    }
  }
  if (!dryRun) {
    fs.mkdirSync(path.dirname(dst), { recursive: true })
    fs.writeFileSync(dst, `${CLAUDE_MD_MARK}\n${fs.readFileSync(src, 'utf8')}`)
    ensureGitignore(dir, '.claude/CLAUDE.md', '# hmos-library-adapter-fast: 适配时按平台注入的共享规则（勿提交）', log)
  }
  log(`  ~ CLAUDE.md -> .claude/CLAUDE.md [${platform}]`)
  return true
}

/** 把某条路径追加进目标库 .gitignore（幂等，已有命中则跳过）。 */
function ensureGitignore(dir, entry, mark, log = () => {}) {
  const gi = path.join(dir, '.gitignore')
  let body = ''
  try {
    body = fs.readFileSync(gi, 'utf8')
  } catch {
    /* 无 .gitignore */
  }
  const norm = (s) => s.trim().replace(/\/+$/, '')
  const hit = body.split(/\r?\n/).some((l) => norm(l) === norm(entry))
  if (hit) return
  const prefix = body && !body.endsWith('\n') ? '\n' : ''
  try {
    fs.appendFileSync(gi, `${prefix}\n${mark}\n${entry}\n`)
    log(`  ~ .gitignore += ${entry}`)
  } catch {
    /* ignore */
  }
}

/** 'absent' | 'ours'(指回本包源) | 'foreign'(实文件或指别处)。 */
function inspect(dst, expectedSrc) {
  try {
    const st = fs.lstatSync(dst)
    if (!st.isSymbolicLink()) return 'foreign'
    const target = fs.readlinkSync(dst)
    const abs = path.isAbsolute(target) ? target : path.join(path.dirname(dst), target)
    // 指回本包任一 skill 源根（packaged shared/skills 或 dev 两源）即视为 ours
    return path.resolve(abs) === path.resolve(expectedSrc) ? 'ours' : 'foreign'
  } catch {
    return 'absent'
  }
}
