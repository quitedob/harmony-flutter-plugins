import fs from 'node:fs'
import path from 'node:path'

/**
 * 确定性平台检测：判定一个目录是 Flutter 插件 / RN 模块 / 原生 Android SDK。
 * 不靠 LLM 猜——纯文件标记判定，返回带证据的结构化结果。
 *
 * 返回 { platform:'flutter'|'rn'|'sdk'|'unknown', confidence:'high'|'low'|'none',
 *        evidence:string[], candidates:[{platform,evidence}] }
 *
 * 优先级（关键）：Flutter / RN 插件根下也常见 android/ 里的 gradle，
 * 但 gradle「标记文件」只在工程根判定；顺序固定 flutter → rn → sdk，
 * gradle 作最后兜底，避免把 Flutter/RN 误判成原生 SDK。
 */

const has = (dir, name) => fs.existsSync(path.join(dir, name))
const listFiles = (dir) => {
  try {
    return fs.readdirSync(dir)
  } catch {
    return []
  }
}
const readText = (p) => {
  try {
    return fs.readFileSync(p, 'utf8')
  } catch {
    return ''
  }
}
const readJSON = (p) => {
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'))
  } catch {
    return null
  }
}

function probeFlutter(dir) {
  const ev = []
  if (has(dir, 'pubspec.yaml')) {
    ev.push('pubspec.yaml 存在')
    const y = readText(path.join(dir, 'pubspec.yaml'))
    if (/^\s*flutter\s*:/m.test(y)) ev.push('pubspec 含 flutter: 段')
    if (/^\s*plugin\s*:/m.test(y)) ev.push('pubspec 含 plugin: 段（Flutter 插件）')
  }
  return ev
}

function probeRN(dir) {
  const ev = []
  const pkg = readJSON(path.join(dir, 'package.json'))
  if (pkg) {
    const deps = { ...pkg.dependencies, ...pkg.devDependencies, ...pkg.peerDependencies }
    if (deps['react-native']) ev.push(`package.json 依赖 react-native (${deps['react-native']})`)
    if (pkg.codegenConfig) ev.push('package.json 含 codegenConfig（RN 新架构）')
  }
  if (has(dir, 'react-native.config.js')) ev.push('react-native.config.js 存在')
  // 以上任一为「强信号」；podspec 仅作辅助证据（不单独触发，避免误判纯 iOS 库）
  if (ev.length) {
    const pods = listFiles(dir).filter((f) => f.endsWith('.podspec'))
    if (pods.length) ev.push(`含 podspec: ${pods.join(', ')}`)
  }
  return ev
}

function probeSDK(dir) {
  const ev = []
  const markers = ['settings.gradle', 'settings.gradle.kts', 'gradlew', 'build.gradle', 'build.gradle.kts']
  const hit = markers.filter((m) => has(dir, m))
  if (hit.length) ev.push(`工程根 gradle 标记: ${hit.join(', ')}`)
  return ev
}

export function detectPlatform(dir = process.cwd()) {
  // 顺序即优先级
  const probes = [
    { id: 'flutter', evidence: probeFlutter(dir) },
    { id: 'rn', evidence: probeRN(dir) },
    { id: 'sdk', evidence: probeSDK(dir) },
  ]
  const matched = probes.filter((p) => p.evidence.length > 0)

  if (matched.length === 0) {
    return {
      platform: 'unknown',
      confidence: 'none',
      evidence: ['未发现 pubspec.yaml / react-native 的 package.json / 工程根 gradle 标记'],
      candidates: [],
    }
  }
  const chosen = matched[0] // 按优先级取第一个命中
  return {
    platform: chosen.id,
    // 仅一个平台命中 = high；多个同时命中 = low（让入口 agent 找用户确认）
    confidence: matched.length === 1 ? 'high' : 'low',
    evidence: chosen.evidence,
    candidates: matched.map((m) => ({ platform: m.id, evidence: m.evidence })),
  }
}
