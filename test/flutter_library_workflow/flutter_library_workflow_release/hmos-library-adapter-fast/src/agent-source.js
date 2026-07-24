import fs from 'node:fs'
import path from 'node:path'
import {
  ROUTER_PROMPT,
  PLATFORMS,
  ENTRY_AGENT_NAME,
  ENTRY_DESCRIPTION,
  platformPromptsDir,
  platformOpencodeJson,
  namespacedStageName,
} from './paths.js'

/**
 * 装配全部 agent：
 *   entry      顶层路由器 hmos-library-adapter-fast（本包 agent/orchestrator.md）
 *   platforms  每个平台 { id, orchestrator, stages }
 *                orchestrator: 该平台编排器（sibling opencode.json 的 primary-00-orchestrator）→ 隐藏子 agent
 *                stages:       该平台阶段 agent → 隐藏子 agent
 */
export function loadAgents() {
  if (!fs.existsSync(ROUTER_PROMPT)) {
    throw new Error(`顶层路由 prompt 缺失: ${ROUTER_PROMPT}`)
  }
  const entry = {
    name: ENTRY_AGENT_NAME,
    description: ENTRY_DESCRIPTION,
    promptFile: ROUTER_PROMPT,
    promptText: fs.readFileSync(ROUTER_PROMPT, 'utf8'),
  }

  const platforms = []
  for (const p of PLATFORMS) {
    const ocPath = platformOpencodeJson(p)
    if (!fs.existsSync(ocPath)) {
      throw new Error(`平台 ${p.id} opencode.json 缺失: ${ocPath}（dev 确认 ../${p.agentDir}；发布确认已 prepack stage）`)
    }
    const promptsDir = platformPromptsDir(p)
    const cfg = JSON.parse(fs.readFileSync(ocPath, 'utf8'))
    const agents = cfg.agent || {}

    let orchestrator = null
    const stages = []
    for (const [key, def] of Object.entries(agents)) {
      const isEntry = key === p.entryKey
      // 控制入口：定义了 stages 白名单时，只收录白名单内的阶段（编排器始终收）。
      // 同时静默掉 opencode.json 里多余/无 prompt 的 key（如 test/demo），避免装配警告。
      if (!isEntry && Array.isArray(p.stages) && !p.stages.includes(key)) continue
      const promptFile = resolvePromptFile(promptsDir, key, def)
      if (!promptFile) continue
      const base = {
        key,
        description: def.description || key,
        permission: def.permission,
        bash_timeout_ms: def.bash_timeout_ms,
        promptFile,
        promptText: fs.readFileSync(promptFile, 'utf8'),
      }
      if (key === p.entryKey) {
        orchestrator = { ...base, name: p.orchestratorName }
      } else {
        stages.push({ ...base, name: namespacedStageName(p, key) })
      }
    }
    if (!orchestrator) {
      throw new Error(`平台 ${p.id} 未找到编排器 key "${p.entryKey}"（确认 ${p.agentDir}/opencode.json）`)
    }
    platforms.push({ id: p.id, orchestratorName: p.orchestratorName, orchestrator, stages })
  }

  return { entry, platforms }
}

function resolvePromptFile(promptsDir, key, def) {
  const ref = String(def.prompt || '')
  const m = ref.match(/\{file:.*\/([^/}]+\.md)\}/)
  if (!m) {
    console.warn(`[agent-source] agent "${key}" 无法解析 prompt 文件引用，跳过: ${ref}`)
    return null
  }
  const file = path.join(promptsDir, m[1])
  if (!fs.existsSync(file)) {
    console.warn(`[agent-source] prompt 文件不存在，跳过: ${file}`)
    return null
  }
  return file
}
