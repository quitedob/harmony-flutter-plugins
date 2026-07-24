'use strict';

/**
 * Resolve DevEco Studio bundled toolchain (node / java / hvigor / ohpm) and
 * build process env with PATH + JAVA_HOME — no manual system PATH setup required.
 */

const fs = require('fs');
const path = require('path');
const { SETTINGS_FILE } = require('./config');
const { devEcoStudioRoots } = require('./ohos-sign/config');

function readDevecoHomeFromSettings() {
  try {
    if (!fs.existsSync(SETTINGS_FILE)) return null;
    const raw = fs.readFileSync(SETTINGS_FILE, 'utf8');
    const s = JSON.parse(raw);
    const home = s && typeof s.devecoHome === 'string' ? s.devecoHome.trim() : '';
    return home || null;
  } catch {
    return null;
  }
}

/**
 * @returns {string|null}
 */
function findDevEcoStudioRoot() {
  const fromSettings = readDevecoHomeFromSettings();
  if (fromSettings && fs.existsSync(fromSettings)) {
    return path.resolve(fromSettings);
  }
  if (process.env.DEVECO_HOME) {
    const p = path.resolve(process.env.DEVECO_HOME);
    if (fs.existsSync(p)) return p;
  }
  for (const root of devEcoStudioRoots()) {
    if (fs.existsSync(root)) return root;
  }
  return null;
}

/**
 * @returns {{
 *   studio: string,
 *   node: string,
 *   java: string,
 *   hvigorw: string,
 *   ohpmBin: string,
 *   pathDirs: string[],
 *   missing: string[]
 * }|null}
 */
function resolveDevecoToolchain() {
  const studio = findDevEcoStudioRoot();
  if (!studio) return null;

  const isMac = process.platform === 'darwin';
  const isWin = process.platform === 'win32';

  let node = isMac
    ? path.join(studio, 'Contents', 'tools', 'node', 'bin', 'node')
    : path.join(studio, 'tools', 'node', 'node.exe');
  let java = isMac
    ? path.join(studio, 'Contents', 'jbr', 'Contents', 'Home', 'bin', 'java')
    : path.join(studio, 'jbr', 'bin', 'java.exe');
  let hvigorw = isMac
    ? path.join(studio, 'Contents', 'tools', 'hvigor', 'bin', 'hvigorw')
    : path.join(studio, 'tools', 'hvigor', 'bin', 'hvigorw.bat');
  const ohpmBin = isMac
    ? path.join(studio, 'Contents', 'tools', 'ohpm', 'bin')
    : path.join(studio, 'tools', 'ohpm', 'bin');

  if (isWin && !fs.existsSync(node)) {
    node = path.join(studio, 'tools', 'node', 'bin', 'node.exe');
  }
  if (isWin && !fs.existsSync(hvigorw)) {
    const alt = path.join(studio, 'tools', 'hvigor', 'bin', 'hvigorw.BAT');
    if (fs.existsSync(alt)) hvigorw = alt;
  }

  const pathDirs = [];
  const addBinDir = (binPath) => {
    if (!binPath || !fs.existsSync(binPath)) return;
    pathDirs.push(path.dirname(binPath));
  };
  addBinDir(node);
  addBinDir(java);
  addBinDir(hvigorw);
  if (fs.existsSync(ohpmBin)) pathDirs.push(ohpmBin);

  const tools = { node, java, hvigorw };
  const missing = Object.entries(tools)
    .filter(([, p]) => !fs.existsSync(p))
    .map(([name]) => name);

  return {
    studio,
    node,
    java,
    hvigorw,
    ohpmBin,
    pathDirs: [...new Set(pathDirs)],
    missing
  };
}

/** Read PATH on all platforms (Windows often exposes `Path`, not `PATH`). */
function readPathEnv(env) {
  return env.PATH || env.Path || '';
}

/** Write PATH; on Windows keep `Path` in sync or cmd.exe ignores the update. */
function writePathEnv(env, value) {
  env.PATH = value;
  if (process.platform === 'win32') {
    env.Path = value;
  }
}

/**
 * Merge DevEco toolchain dirs into PATH and set JAVA_HOME / DEVECO_HOME.
 * @param {NodeJS.ProcessEnv} [baseEnv]
 * @returns {NodeJS.ProcessEnv}
 */
function buildDevecoToolEnv(baseEnv = process.env) {
  const tc = resolveDevecoToolchain();
  const env = { ...baseEnv };
  if (!tc || tc.missing.length > 0) return env;

  const sep = path.delimiter;
  const merged = [...tc.pathDirs, readPathEnv(baseEnv)].filter(Boolean).join(sep);
  writePathEnv(env, merged);

  const javaHome = process.platform === 'darwin'
    ? path.join(tc.studio, 'Contents', 'jbr', 'Contents', 'Home')
    : path.join(tc.studio, 'jbr');
  if (fs.existsSync(javaHome)) {
    env.JAVA_HOME = javaHome;
  }
  env.DEVECO_HOME = tc.studio;
  return env;
}

/**
 * @returns {{ ok: boolean, errors: string[], toolchain?: object }}
 */
function validateDevecoToolchain() {
  const tc = resolveDevecoToolchain();
  if (!tc) {
    return {
      ok: false,
      errors: [
        '未找到 DevEco Studio 安装目录。',
        '请安装 DevEco Studio，或在 adapt-workflow/data/settings.json 中设置 devecoHome，或设置环境变量 DEVECO_HOME 指向安装根目录。',
        '无需手动把 node/java/hvigor 加入系统 PATH，管理面板会在运行 Agent 时自动注入。'
      ]
    };
  }
  if (tc.missing.length > 0) {
    return {
      ok: false,
      errors: [
        `DevEco Studio 目录不完整（${tc.studio}），缺少: ${tc.missing.join(', ')}`,
        '请确认 DevEco Studio 已完整安装，或检查 devecoHome / DEVECO_HOME 是否指向正确目录。'
      ]
    };
  }
  return { ok: true, errors: [], toolchain: tc };
}

module.exports = {
  findDevEcoStudioRoot,
  resolveDevecoToolchain,
  readPathEnv,
  writePathEnv,
  buildDevecoToolEnv,
  validateDevecoToolchain
};
