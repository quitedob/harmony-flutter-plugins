/**
 * OpenCode 插件 — 运行时注入「入口路由器 + 3 平台编排器 + 各阶段子 agent」，
 * 并把包内 skill 目录注入 `config.skills.paths`。
 *
 * 与旧版「静态把 12 条 agent 写进用户 opencode.json」相比：
 *  - prompt 全文 inline → 不再有 `{file:绝对路径}`，npx/bunx 临时目录被清理也不失效；
 *  - skill 经 skills.paths 注册 → OpenCode 直接从包内读，不再依赖 ~/.claude 或 ~/.agents/skills；
 *  - per-agent `permission.skill` 白名单 + `skillSearch:'deny'` → 平台间 skill 不串味；
 *  - 用户 opencode.json 只保留一个 plugin 引用，升级透明、配置干净。
 *
 * 加载方式（见 install.js）：~/.config/opencode/plugins/ 下放一个「以绝对 file:// 再导出本文件」
 * 的 shim（普通文件，非 symlink），故本文件按真实路径加载，相对 import 不受宿主 symlink 语义影响。
 */
import fs from 'node:fs'
import path from 'node:path'
import { loadAgents } from './agent-source.js'
import { SKILL_SOURCE_DIRS, platformSkillWhitelist, routerSkillWhitelist } from './paths.js'
import { recordSession, ADAPT_DIR } from './session-log.js'

/**
 * 各 agent 的基础权限。external_directory 放行仓外**读取**（allow）——让模型按需读工具链/依赖/参考。
 * 仓外**写入**由各阶段 prompt 的「工作边界」约束（只写 CWD）；OpenCode 的 external_directory 不分读/写，
 * 故写约束走 prompt 而非权限。skill 经 skills.paths 注册，不受影响。
 */
function basePermission() {
  return {
    bash: 'allow',
    read: 'allow',
    write: 'allow',
    edit: 'allow',
    websearch: 'allow',
    webfetch: 'allow',
    external_directory: { '*': 'allow' },
  }
}

function withTask(perm, taskAllow) {
  if (taskAllow && taskAllow.length) {
    perm.task = Object.fromEntries(taskAllow.map((n) => [n, 'allow']))
  }
  return perm
}

function withSkill(perm, _whitelist) {
  // 允许调用机器上的所有技能（skill 工具）+ 允许技能搜索；prompt 引导「优先用注入到当前库
  // .claude/skills/<平台> 的本平台技能（文件路径），其它机器技能作补充」。不再用 deny 白名单硬隔离。
  perm.skill = { '*': 'allow' }
  perm.skillSearch = 'allow'
  return perm
}

/**
 * 装配全部 agent 定义（供 config 钩子注入，或测试直接调用）。
 *   入口路由器：可见 primary；经 task 唤起 3 编排器；不需 skill。
 *   平台编排器：隐藏 subagent；经 task 唤起本平台阶段；本平台 + 公共 skill。
 *   阶段子 agent：隐藏 subagent；叶子不再起子 agent；本平台 + 公共 skill。
 */
export function buildAgentConfig() {
  const { entry, platforms } = loadAgents()
  const agents = {}

  agents[entry.name] = {
    description: entry.description,
    mode: 'primary',
    prompt: entry.promptText,
    permission: withSkill(
      withTask(
        basePermission(),
        platforms.map((pf) => pf.orchestrator.name),
      ),
      routerSkillWhitelist(),
    ),
  }

  for (const pf of platforms) {
    const wl = platformSkillWhitelist(pf.id)
    agents[pf.orchestrator.name] = {
      description: pf.orchestrator.description,
      mode: 'subagent',
      hidden: true,
      prompt: pf.orchestrator.promptText,
      ...(pf.orchestrator.bash_timeout_ms ? { bash_timeout_ms: pf.orchestrator.bash_timeout_ms } : {}),
      permission: withSkill(
        withTask(
          basePermission(),
          pf.stages.map((s) => s.name),
        ),
        wl,
      ),
    }
    for (const s of pf.stages) {
      agents[s.name] = {
        description: s.description,
        mode: 'subagent',
        hidden: true,
        prompt: s.promptText,
        ...(s.bash_timeout_ms ? { bash_timeout_ms: s.bash_timeout_ms } : {}),
        permission: withSkill(basePermission(), wl),
      }
    }
  }

  return agents
}

// ── 会话日志 hook 辅助 ──
function getToolName(input) {
  const i = input || {}
  for (const c of [i.tool, i.toolName, i.name]) if (typeof c === 'string') return c.toLowerCase()
  return null
}

function getStr(o, ...keys) {
  if (!o || typeof o !== 'object') return undefined
  for (const k of keys) {
    const v = o[k]
    if (typeof v === 'string' && v) return v
  }
  return undefined
}

/** OpenCode 无独立 SubagentStop 事件；task 工具的 after 回调能拿到子/父 sessionId，是子 agent 同步结束的可靠信号。 */
function extractSessionIds(output) {
  const md =
    (output && typeof output === 'object' && (output.metadata || (output.output && output.output.metadata))) ||
    output
  return {
    sub: getStr(md, 'sessionId', 'session_id'),
    parent: getStr(md, 'parentSessionId', 'parent_session_id', 'parentID'),
  }
}

/**
 * OpenCode Plugin 函数。返回两个 hook：
 *   - config             ：运行时注入 agent + skills.paths（见上）。
 *   - tool.execute.after ：每次 task 结束把子/父 session 导出到 .ohos-adaptation/logs/<agent>[-retry_n].json。
 */
const plugin = async (ctx) => {
  const c = ctx || {}
  const workingDir = c.directory || c.worktree || process.cwd()
  return {
    config: (config) => {
      try {
        // 1) 注入 agent（同名已存在 → 尊重用户自定义，不覆盖）
        const agents = buildAgentConfig()
        if (!config.agent) config.agent = {}
        for (const [id, def] of Object.entries(agents)) {
          if (config.agent[id]) continue
          config.agent[id] = def
        }
        // 2) skill 目录注入 skills.paths（每项是「含若干 skill 子目录」的父目录）
        if (!config.skills) config.skills = {}
        const paths = Array.isArray(config.skills.paths) ? config.skills.paths : []
        for (const dir of SKILL_SOURCE_DIRS) {
          if (!paths.includes(dir)) paths.push(dir)
        }
        config.skills.paths = paths
      } catch (e) {
        // 插件出错绝不应拖垮 OpenCode 启动 —— 记日志、保持 config 原样
        console.error(`[hmos-library-adapter-fast] plugin config 注入失败: ${e && e.message ? e.message : e}`)
      }
    },
    'tool.execute.after': async (input, output) => {
      try {
        if (getToolName(input) !== 'task') return
        // 只在适配工程内落盘（存在 .ohos-adaptation/），避免脏写无关项目
        if (!fs.existsSync(path.join(workingDir, ADAPT_DIR))) return
        const { sub, parent } = extractSessionIds(output)
        // fire-and-forget：首选只读 SQLite 直读（无 spawn），不 await → 不给 hook 增加延迟
        if (sub) recordSession({ workspaceRoot: workingDir, sessionId: sub })
        if (parent) recordSession({ workspaceRoot: workingDir, sessionId: parent })
      } catch {
        // hook 永不阻塞 OpenCode 主流程
      }
    },
  }
}

export default plugin
export { plugin }
