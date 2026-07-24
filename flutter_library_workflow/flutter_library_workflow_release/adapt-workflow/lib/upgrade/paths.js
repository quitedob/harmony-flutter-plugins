'use strict';

const path = require('path');
const fsSync = require('fs');
const { WORKSPACE_ROOT } = require('../config');

function getUpgradeReposRoot(type) {
  // Per-type clone root, mirroring the adaptation profiles' reposDir convention
  // (repos / repos-rn / repos-sdk) but for upgrade workspaces. Decoupled from
  // the 鸿蒙化 profile system. type ∈ {flutter, rn, sdk} → repos_<type>_upgrade.
  const t = (type && String(type).trim()) || 'flutter';
  return path.join(WORKSPACE_ROOT, `repos_${t}_upgrade`);
}

function safeSlug(input) {
  const s = String(input || '').trim();
  if (!s) return '';
  // Keep it readable on Windows; avoid reserved characters.
  const cleaned = s
    .replace(/\.git$/i, '')
    .replace(/^https?:\/\//i, '')
    .replace(/[\\/]+/g, '/')
    .split('/')
    .filter(Boolean)
    .pop() || '';
  return cleaned
    .replace(/[^a-zA-Z0-9._-]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 64);
}

function getRepoDirName(library) {
  // Library repo dir = name slug (no id suffix). Falls back to repo slug, then short id.
  const fromName = safeSlug(library?.name);
  const fromUrl = safeSlug(library?.repoUrl);
  const fromId = String(library?.id || '').trim().slice(0, 8);
  return fromName || fromUrl || fromId || 'library';
}

// Previous layout used `<base>__<shortid>`; kept for the one-time on-disk migration
// (migrateUpgradeLayout) so existing clones move to the new name-only dir.
function legacyRepoDirName(library) {
  const id = String(library?.id || '').trim();
  const shortId = id ? id.slice(0, 8) : '';
  const fromName = safeSlug(library?.name);
  const fromUrl = safeSlug(library?.repoUrl);
  const base = fromName || fromUrl || shortId || 'library';
  return shortId ? `${base}__${shortId}` : base;
}

function getLibraryRepoDir(libraryOrId, meta = null) {
  const lib = (typeof libraryOrId === 'object' && libraryOrId) ? libraryOrId : { id: libraryOrId, ...(meta || {}) };
  const libraryId = String(lib.id || '');
  const root = getUpgradeReposRoot(lib.type);

  // Backward-compat: old layout used `<WORKSPACE>/repos/_upgrade_libraries/<libraryId>`;
  // keep using it if present so prior stub runs still resolve.
  const legacy = path.join(WORKSPACE_ROOT, 'repos', '_upgrade_libraries', libraryId);
  if (libraryId && fsSync.existsSync(legacy)) return legacy;

  return path.join(root, getRepoDirName(lib));
}

function coerceLibrary(libraryOrId, meta = null) {
  return (typeof libraryOrId === 'object' && libraryOrId) ? libraryOrId : { id: libraryOrId, ...(meta || {}) };
}

function getHarmonizedRepoDir(libraryOrId, meta = null) {
  // 已鸿蒙化仓库就是升级主工作目录 → repos_<type>_upgrade/<库名>
  const lib = coerceLibrary(libraryOrId, meta);
  return getLibraryRepoDir(lib);
}

function getUpstreamRepoDir(libraryOrId, meta = null) {
  // 上游三方库与主工作目录同级 → repos_<type>_upgrade/<库名>_upstream
  const lib = coerceLibrary(libraryOrId, meta);
  return path.join(getUpgradeReposRoot(lib.type), `${getRepoDirName(lib)}_upstream`);
}

// One-time on-disk layout migration: rename each library's repo dir from the
// legacy `<base>__<shortid>` form to the name-only form (`<base>`). Idempotent
// (skips when the legacy dir is absent or the new dir already exists). Runs once
// per process; called from libraries-store.readLibraries.
let _layoutMigrated = false;
function migrateUpgradeLayout(libraries) {
  if (_layoutMigrated) return;
  _layoutMigrated = true;
  for (const lib of (libraries || [])) {
    const root = getUpgradeReposRoot(lib.type);
    if (!fsSync.existsSync(root)) continue;
    const newName = getRepoDirName(lib);
    const oldName = legacyRepoDirName(lib);
    const newDir = path.join(root, newName);
    const oldDir = path.join(root, oldName);

    // 0) library repo dir: <base>__<shortid> → <base>
    if (oldName !== newName && fsSync.existsSync(oldDir) && !fsSync.existsSync(newDir)) {
      try {
        fsSync.renameSync(oldDir, newDir);
        console.log(`[upgrade-layout] renamed ${oldName} → ${newName}`);
      } catch (e) {
        console.error(`[upgrade-layout] rename ${oldName} → ${newName} failed: ${e.message}`);
      }
    }

    // 1) clone subdirs from older layouts → current sibling layout.
    const targetDir = fsSync.existsSync(newDir) ? newDir : (fsSync.existsSync(oldDir) ? oldDir : null);
    if (!targetDir) continue;

    const upstreamSibling = path.join(root, `${newName}_upstream`);
    for (const from of ['upstream', `${newName}_upstream`]) {
      const fromPath = path.join(targetDir, from);
      const toPath = upstreamSibling;
      if (fsSync.existsSync(fromPath) && !fsSync.existsSync(toPath)) {
        try {
          fsSync.renameSync(fromPath, toPath);
          console.log(`[upgrade-layout] renamed ${path.relative(root, fromPath)} → ${path.relative(root, toPath)}`);
        } catch (e) {
          console.error(`[upgrade-layout] rename ${path.relative(root, fromPath)} → ${path.relative(root, toPath)} failed: ${e.message}`);
        }
      }
    }

    // 2) nested hmos repo (<base>/<base>_hmos) → main work dir (<base>).
    const nestedHmos = [`${newName}_hmos`, 'hmos']
      .map(name => path.join(targetDir, name))
      .find(dir => fsSync.existsSync(path.join(dir, '.git')));
    if (nestedHmos && !fsSync.existsSync(path.join(targetDir, '.git'))) {
      const uniquePath = (basePath) => {
        let candidate = basePath;
        let i = 1;
        while (fsSync.existsSync(candidate)) {
          candidate = `${basePath}_${i++}`;
        }
        return candidate;
      };
      const tmpHmos = uniquePath(path.join(root, `${newName}__hmos_migrate_tmp`));
      const backupDir = uniquePath(path.join(root, `${newName}__old_upgrade_layout`));
      try {
        for (const entry of ['.ohos-adaptation', '.claude', '.opencode', 'CLAUDE.md']) {
          const from = path.join(targetDir, entry);
          const to = path.join(nestedHmos, entry);
          if (fsSync.existsSync(from) && !fsSync.existsSync(to)) {
            fsSync.renameSync(from, to);
          }
        }
        fsSync.renameSync(nestedHmos, tmpHmos);
        fsSync.renameSync(targetDir, backupDir);
        fsSync.renameSync(tmpHmos, targetDir);
        const nestedUpstream = [`${newName}_upstream`, 'upstream']
          .map(name => path.join(backupDir, name))
          .find(dir => fsSync.existsSync(dir));
        if (nestedUpstream && !fsSync.existsSync(upstreamSibling)) {
          fsSync.renameSync(nestedUpstream, upstreamSibling);
        }
        try {
          if (fsSync.existsSync(backupDir) && fsSync.readdirSync(backupDir).length === 0) {
            fsSync.rmdirSync(backupDir);
          }
        } catch {}
        console.log(`[upgrade-layout] flattened ${newName}_hmos → ${newName}`);
      } catch (e) {
        console.error(`[upgrade-layout] flatten ${newName}_hmos failed: ${e.message}`);
      }
    }
  }
}

// ── Upgrade adaptation dir + manifest ──
//
// The upgrade workflow stores its artifacts under <repoDir>/.ohos-adaptation/.
// These helpers are profile-context-free so route read endpoints (which run
// outside any runWithProfile) can resolve paths directly. Execution itself
// delegates to the shared lib/agent/executor.js under the matching upgrade
// profile.

const UPGRADE_DIR = '.ohos-adaptation';

function getUpgradeDir(repoDir) { return path.join(repoDir, UPGRADE_DIR); }
function getUpgradeLogsDir(repoDir) { return path.join(getUpgradeDir(repoDir), 'logs'); }
function getUpgradeManifestPath(repoDir) {
  return path.join(getUpgradeDir(repoDir), 'upgrade-manifest.json');
}

/**
 * Write a minimal upgrade manifest carrying the library's target SDK / framework
 * versions. The Agent prompt (upgrade-01-analysis.md / upgrade-02-coding.md)
 * reads these from .ohos-adaptation/upgrade-manifest.json. Call before stage
 * execution. Stage status is NOT tracked here — it is derived from output files
 * + logs by lib/agent/stage-manager (same as the adaptation flow).
 */
async function ensureUpgradeManifest(repoDir, library) {
  const fs = require('fs').promises;
  const baseName = getRepoDirName(library);
  const manifest = {
    schemaVersion: 3,
    generatedAt: new Date().toISOString(),
    library: {
      id: library.id,
      type: library.type,
      name: library.name || '',
      repoUrl: library.repoUrl,
      harmonizedRepoUrl: library.harmonizedRepoUrl,
      targetOsVersion: library.targetOsVersion || '',
      targetFrameworkVersion: library.targetFrameworkVersion || '',
      // Agent 工作目录就是已适配仓库；上游仓库在同级目录。
      hmosDir: '.',
      upstreamDir: `../${baseName}_upstream`
    }
  };
  await fs.mkdir(getUpgradeDir(repoDir), { recursive: true });
  await fs.writeFile(getUpgradeManifestPath(repoDir), JSON.stringify(manifest, null, 2), 'utf8');
  return manifest;
}

async function readUpgradeManifest(repoDir) {
  const fs = require('fs').promises;
  const fp = getUpgradeManifestPath(repoDir);
  if (!fsSync.existsSync(fp)) return null;
  try {
    return JSON.parse(await fs.readFile(fp, 'utf8'));
  } catch {
    return null;
  }
}

module.exports = {
  getUpgradeReposRoot,
  getRepoDirName,
  legacyRepoDirName,
  getLibraryRepoDir,
  getHarmonizedRepoDir,
  getUpstreamRepoDir,
  getUpgradeDir,
  getUpgradeLogsDir,
  getUpgradeManifestPath,
  ensureUpgradeManifest,
  readUpgradeManifest,
  migrateUpgradeLayout
};
