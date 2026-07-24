'use strict';

const fs = require('fs');
const path = require('path');
const { loadSigningConfig } = require('./config');
const { injectBundleName } = require('./bundle-name');

/**
 * Locate example/ohos|harmony/build-profile.json5 from cwd (plugin root, example dir, or ohos dir).
 * @returns {{ ohosDir: string, buildProfile: string, repoRoot: string }}
 */
function resolveBuildProfilePaths(cwd, explicitOhos) {
  const c = path.resolve(cwd || process.cwd());
  if (explicitOhos) {
    const ohosDir = path.resolve(explicitOhos);
    const buildProfile = path.join(ohosDir, 'build-profile.json5');
    if (!fs.existsSync(buildProfile)) {
      throw new Error(`未找到 build-profile.json5: ${buildProfile}`);
    }
    const repoRoot = inferRepoRootFromOhosDir(ohosDir);
    return { ohosDir, buildProfile, repoRoot };
  }
  const candidates = [
    { buildProfile: path.join(c, 'build-profile.json5'), ohosDir: c },
    { buildProfile: path.join(c, 'example', 'ohos', 'build-profile.json5'), ohosDir: path.join(c, 'example', 'ohos') },
    { buildProfile: path.join(c, 'example', 'harmony', 'build-profile.json5'), ohosDir: path.join(c, 'example', 'harmony') },
    // RN plugin convention: ohos/example/harmony/
    { buildProfile: path.join(c, 'ohos', 'example', 'harmony', 'build-profile.json5'), ohosDir: path.join(c, 'ohos', 'example', 'harmony') }
  ];
  for (const { buildProfile, ohosDir } of candidates) {
    if (fs.existsSync(buildProfile)) {
      const repoRoot = inferRepoRootFromOhosDir(ohosDir);
      return { ohosDir, buildProfile, repoRoot };
    }
  }
  throw new Error(
    `未找到 example/ohos/build-profile.json5。请使用 --cwd=插件仓库根（含 example/）或 --ohos=<.../example/ohos>。当前: ${c}`
  );
}

function inferRepoRootFromOhosDir(ohosDir) {
  const base = path.basename(ohosDir);
  if (base === 'ohos' || base === 'harmony') {
    const exampleParent = path.dirname(ohosDir);
    if (path.basename(exampleParent) === 'example') {
      const aboveExample = path.dirname(exampleParent);
      // RN convention: ohos/example/harmony → repo root is two levels up
      if (path.basename(aboveExample) === 'ohos') {
        return path.dirname(aboveExample);
      }
      return aboveExample;
    }
  }
  return path.dirname(ohosDir);
}

/**
 * Replace the JSON array value of top-level app.signingConfigs in build-profile.json5 raw text.
 * Uses bracket depth from the opening `[` after `"signingConfigs":` (strings skipped naively via " tracking).
 */
function replaceSigningConfigsArray(raw, newArrayInner) {
  const label = '"signingConfigs"';
  const idx = raw.indexOf(label);
  if (idx === -1) {
    throw new Error('build-profile.json5 中未找到 "signingConfigs" 字段');
  }
  const afterLabel = raw.slice(idx + label.length);
  const colonOpen = afterLabel.match(/\s*:\s*\[/);
  if (!colonOpen) {
    throw new Error('"signingConfigs" 后未找到数组起始 [');
  }
  const bracketStart = idx + label.length + colonOpen.index + colonOpen[0].length - 1;

  let depth = 0;
  let inStr = false;
  let esc = false;
  for (let i = bracketStart; i < raw.length; i++) {
    const ch = raw[i];
    if (inStr) {
      if (esc) esc = false;
      else if (ch === '\\') esc = true;
      else if (ch === '"') inStr = false;
      continue;
    }
    if (ch === '"') {
      inStr = true;
      continue;
    }
    if (ch === '[') depth++;
    else if (ch === ']') {
      depth--;
      if (depth === 0) {
        return raw.slice(0, bracketStart + 1) + newArrayInner + raw.slice(i);
      }
    }
  }
  throw new Error('signingConfigs 数组未闭合');
}

function formatSigningConfigsInner(cfg) {
  const m = cfg.signingMaterial;
  const entry = {
    name: 'default',
    type: 'HarmonyOS',
    material: {
      certpath: m.certpath,
      keyAlias: m.keyAlias,
      keyPassword: m.keyPassword,
      profile: m.profile,
      signAlg: m.signAlg || 'SHA256withECDSA',
      storeFile: m.storeFile,
      storePassword: m.storePassword
    }
  };
  const json = JSON.stringify([entry], null, 2);
  return `\n${json.slice(1, -1)}\n  `;
}

/**
 * Write signingConfigs from signing config + sync bundleName to AppScope/app.json5.
 * @param {{ cwd?: string, explicitOhos?: string, profileId?: string }} opts
 */
function applySigningToBuildProfile(opts = {}) {
  const { buildProfile, repoRoot } = resolveBuildProfilePaths(opts.cwd || process.cwd(), opts.explicitOhos);
  const cfg = loadSigningConfig(opts.profileId);
  const raw = fs.readFileSync(buildProfile, 'utf8');
  const inner = formatSigningConfigsInner(cfg);
  const next = replaceSigningConfigsArray(raw, inner);
  if (next !== raw) {
    fs.writeFileSync(buildProfile, next, 'utf8');
  }
  const bundle = injectBundleName(repoRoot, cfg.bundleName);
  return {
    buildProfile,
    signingConfigsWritten: next !== raw,
    bundleName: bundle
  };
}

/**
 * Clear app.signingConfigs to [] (flutter create default).
 */
function stripSigningFromBuildProfile(opts = {}) {
  const { buildProfile } = resolveBuildProfilePaths(opts.cwd || process.cwd(), opts.explicitOhos);
  const raw = fs.readFileSync(buildProfile, 'utf8');
  const next = replaceSigningConfigsArray(raw, '');
  fs.writeFileSync(buildProfile, next, 'utf8');
  return { buildProfile };
}

module.exports = {
  applySigningToBuildProfile,
  stripSigningFromBuildProfile
};
