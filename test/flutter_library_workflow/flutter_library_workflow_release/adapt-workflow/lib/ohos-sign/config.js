'use strict';

const fs = require('fs');
const path = require('path');
const { WORKSPACE_ROOT } = require('../config');

// Profile-aware signing file resolution:
//   rn-ohos   → signing.rn.local.json / signing.rn.example.json
//   其他      → signing.local.json    / signing.example.json
function resolveSigningFiles(profileId) {
  if (profileId === 'rn-ohos') {
    return {
      signingFile: path.join(WORKSPACE_ROOT, 'adapt-workflow', 'data', 'signing.rn.local.json'),
      exampleFile: path.join(WORKSPACE_ROOT, 'adapt-workflow', 'data', 'signing.rn.example.json')
    };
  }
  return {
    signingFile: path.join(WORKSPACE_ROOT, 'adapt-workflow', 'data', 'signing.local.json'),
    exampleFile: path.join(WORKSPACE_ROOT, 'adapt-workflow', 'data', 'signing.example.json')
  };
}

// Default paths (backward-compatible for callers that don't pass profileId)
const SIGNING_FILE = path.join(WORKSPACE_ROOT, 'adapt-workflow', 'data', 'signing.local.json');
const SIGNING_EXAMPLE_FILE = path.join(WORKSPACE_ROOT, 'adapt-workflow', 'data', 'signing.example.json');

const REQUIRED_MATERIAL_FIELDS = [
  'certpath', 'profile', 'storeFile',
  'keyAlias', 'keyPassword', 'storePassword'
];

class SigningConfigError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'SigningConfigError';
    this.code = code || 'SIGNING_CONFIG_ERROR';
  }
}

/**
 * Load and validate the executor-local signing config.
 * @param {string} [profileId] - Profile ID ('rn-ohos' uses signing.rn.local.json)
 * Throws SigningConfigError with a human-readable message when missing or invalid.
 */
function loadSigningConfig(profileId) {
  const { signingFile, exampleFile } = resolveSigningFiles(profileId);
  const signingFileName = path.basename(signingFile);

  if (!fs.existsSync(signingFile)) {
    throw new SigningConfigError(
      `未找到签名配置 ${signingFile}。\n` +
      `请复制 ${exampleFile} 为 ${signingFileName} 并填入本机证书路径与密码。\n` +
      `详见 adapt-workflow/docs/ohos-signing.md。`,
      'SIGNING_CONFIG_MISSING'
    );
  }

  let raw;
  try {
    raw = fs.readFileSync(signingFile, 'utf8');
  } catch (err) {
    throw new SigningConfigError(`读取 ${signingFileName} 失败: ${err.message}`, 'SIGNING_CONFIG_READ_FAIL');
  }

  let cfg;
  try {
    cfg = JSON.parse(raw);
  } catch (err) {
    throw new SigningConfigError(`解析 ${signingFileName} 失败: ${err.message}`, 'SIGNING_CONFIG_PARSE_FAIL');
  }

  if (!cfg || typeof cfg !== 'object') {
    throw new SigningConfigError(`${signingFileName} 必须是一个 JSON 对象`, 'SIGNING_CONFIG_INVALID');
  }

  if (!cfg.bundleName || typeof cfg.bundleName !== 'string') {
    throw new SigningConfigError(`${signingFileName} 缺少 bundleName 字段（string）`, 'SIGNING_CONFIG_INVALID');
  }

  const material = cfg.signingMaterial;
  if (!material || typeof material !== 'object') {
    throw new SigningConfigError(`${signingFileName} 缺少 signingMaterial 字段（object）`, 'SIGNING_CONFIG_INVALID');
  }

  const missing = REQUIRED_MATERIAL_FIELDS.filter(k => !material[k] || typeof material[k] !== 'string');
  if (missing.length) {
    throw new SigningConfigError(
      `signingMaterial 缺少必填字段: ${missing.join(', ')}`,
      'SIGNING_CONFIG_INVALID'
    );
  }

  for (const k of ['certpath', 'profile', 'storeFile']) {
    if (!fs.existsSync(material[k])) {
      throw new SigningConfigError(
        `signingMaterial.${k} 文件不存在: ${material[k]}`,
        'SIGNING_MATERIAL_NOT_FOUND'
      );
    }
  }

  if (!material.signAlg) material.signAlg = 'SHA256withECDSA';

  return cfg;
}

function sdkRoots() {
  const platform = process.platform;
  const home = process.env.HOME || process.env.USERPROFILE || '';
  const roots = [];

  if (platform === 'darwin') {
    roots.push(
      '/Applications/DevEco-Studio.app/Contents/sdk',
      path.join(home, 'Library/Huawei/Sdk'),
      path.join(home, 'Library/OpenHarmony/Sdk'),
      path.join(home, 'command-line-tools/sdk')
    );
  } else if (platform === 'win32') {
    roots.push(
      path.join(home, 'DevEco Studio', 'sdk'),
      'C:\\Program Files\\Huawei\\DevEco Studio\\sdk',
      'D:\\Program Files\\Huawei\\DevEco Studio\\sdk',
      process.env.DEVECO_HOME ? path.join(process.env.DEVECO_HOME, 'sdk') : null,
      path.join(home, 'command-line-tools', 'sdk')
    );
  } else {
    roots.push(
      path.join(home, 'command-line-tools/sdk'),
      path.join(home, 'Huawei/Sdk'),
      '/opt/DevEco-Studio/sdk'
    );
  }

  return roots.filter(Boolean);
}

function devEcoStudioRoots() {
  const platform = process.platform;
  const home = process.env.HOME || process.env.USERPROFILE || '';
  if (platform === 'darwin') {
    return ['/Applications/DevEco-Studio.app'];
  }
  if (platform === 'win32') {
    return [
      'C:\\Program Files\\Huawei\\DevEco Studio',
      'D:\\Program Files\\Huawei\\DevEco Studio',
      path.join(home, 'DevEco Studio'),
      process.env.DEVECO_HOME || null
    ].filter(Boolean);
  }
  return ['/opt/DevEco-Studio', path.join(home, 'DevEco-Studio')];
}

/**
 * Resolve `hdc` binary.
 * Order: cfg.hdcBin → $HDC_BIN → `which hdc` → DevEco Studio SDK toolchains.
 * Returns { path, source } or null.
 */
function resolveHdcBin(cfg) {
  const { spawnSync } = require('child_process');
  const exeName = process.platform === 'win32' ? 'hdc.exe' : 'hdc';

  if (cfg && typeof cfg.hdcBin === 'string' && cfg.hdcBin.trim()) {
    const p = cfg.hdcBin.trim();
    if (fs.existsSync(p)) return { path: p, source: 'config' };
  }
  if (process.env.HDC_BIN && fs.existsSync(process.env.HDC_BIN)) {
    return { path: process.env.HDC_BIN, source: 'env' };
  }
  const which = spawnSync(process.platform === 'win32' ? 'where' : 'which', ['hdc'], { encoding: 'utf8' });
  if (which.status === 0 && which.stdout.trim()) {
    return { path: which.stdout.trim().split(/\r?\n/)[0], source: 'PATH' };
  }
  for (const root of sdkRoots()) {
    if (!fs.existsSync(root)) continue;
    let hit = null;
    walk(root, 4, (p) => {
      if (hit) return;
      if (path.basename(p) !== exeName) return;
      // sdk/.../openharmony/toolchains/hdc  (or windows equivalent)
      const normalized = p.replace(/\\/g, '/');
      if (/\/toolchains\/[^/]*hdc(\.exe)?$/i.test(normalized)) hit = p;
    });
    if (hit) return { path: hit, source: 'sdk' };
  }
  return null;
}

/**
 * Resolve `java` binary.
 * Order: cfg.javaBin → $JAVA_HOME/bin/java → DevEco Studio bundled JBR → `which java`.
 * DevEco Studio always bundles its own JBR so this covers the zero-config case.
 * Returns { path, source, version? } or null.
 */
function resolveJavaBin(cfg) {
  const { spawnSync } = require('child_process');
  const exeName = process.platform === 'win32' ? 'java.exe' : 'java';

  const tryJava = (p, source) => {
    if (!p || !fs.existsSync(p)) return null;
    const res = spawnSync(p, ['-version'], { encoding: 'utf8' });
    if (res.error || res.status !== 0) return null;
    const version = ((res.stderr || res.stdout || '').split('\n')[0] || '').trim();
    return { path: p, source, version };
  };

  if (cfg && typeof cfg.javaBin === 'string' && cfg.javaBin.trim()) {
    const r = tryJava(cfg.javaBin.trim(), 'config');
    if (r) return r;
  }
  if (process.env.JAVA_HOME) {
    const p = path.join(process.env.JAVA_HOME, 'bin', exeName);
    const r = tryJava(p, 'JAVA_HOME');
    if (r) return r;
  }
  for (const studio of devEcoStudioRoots()) {
    const candidates = process.platform === 'darwin'
      ? [path.join(studio, 'Contents', 'jbr', 'Contents', 'Home', 'bin', exeName)]
      : [path.join(studio, 'jbr', 'bin', exeName)];
    for (const p of candidates) {
      const r = tryJava(p, 'deveco-jbr');
      if (r) return r;
    }
  }
  const which = spawnSync(process.platform === 'win32' ? 'where' : 'which', ['java'], { encoding: 'utf8' });
  if (which.status === 0 && which.stdout.trim()) {
    const p = which.stdout.trim().split(/\r?\n/)[0];
    const r = tryJava(p, 'PATH');
    if (r) return r;
  }
  return null;
}

function walk(dir, depth, visit) {
  if (depth < 0) return;
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isFile()) { visit(full); continue; }
    if (e.isDirectory()) walk(full, depth - 1, visit);
  }
}

module.exports = {
  SIGNING_FILE,
  SIGNING_EXAMPLE_FILE,
  resolveSigningFiles,
  SigningConfigError,
  loadSigningConfig,
  devEcoStudioRoots,
  resolveHdcBin,
  resolveJavaBin
};
