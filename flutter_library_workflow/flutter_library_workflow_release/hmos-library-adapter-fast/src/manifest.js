import fs from 'node:fs'
import path from 'node:path'
import { DATA_DIR, MANIFEST_PATH } from './paths.js'

// opencodeAgents：旧版静态注入残留（仅 uninstall 兼容清理用，新装不再写）。
// opencodePlugin：OpenCode 插件引用产物（plugins/ 下 shim 路径，或 null=走 plugin 数组回退）。
const EMPTY = { opencodeAgents: [], opencodePlugin: null, claudeAgents: [], skills: [] }

export function readManifest() {
  try {
    return { ...EMPTY, ...JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8')) }
  } catch {
    return { ...EMPTY }
  }
}

export function writeManifest(m) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(m, null, 2))
}

export function clearManifest() {
  try {
    fs.rmSync(MANIFEST_PATH, { force: true })
  } catch {
    /* ignore */
  }
}

export { MANIFEST_PATH, DATA_DIR, path }
