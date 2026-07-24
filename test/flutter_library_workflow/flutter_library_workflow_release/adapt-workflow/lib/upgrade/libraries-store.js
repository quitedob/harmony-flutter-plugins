'use strict';

const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
const { WORKSPACE_ROOT } = require('../config');
const { getUpgradeReposRoot, migrateUpgradeLayout } = require('./paths');

// Mirror the 鸿蒙化 convention: each "repos dir" holds its own plugins.json.
// Here each type gets its own repos_<type>_upgrade/plugins.json.
const TYPES = ['flutter', 'rn', 'sdk'];
const FILE_NAME = 'plugins.json';
const LEGACY_FILE = path.join(WORKSPACE_ROOT, 'repos', 'upgrade-libraries.json');

let writeLock = Promise.resolve();
let migrated = false;

function acquireWriteLock() {
  let release;
  const next = new Promise(resolve => { release = resolve; });
  const prev = writeLock;
  writeLock = next;
  return prev.then(() => release);
}

function filePath(type) {
  return path.join(getUpgradeReposRoot(type), FILE_NAME);
}

async function readByType(type) {
  try {
    const raw = await fs.readFile(filePath(type), 'utf8');
    const data = JSON.parse(raw);
    if (!data || typeof data !== 'object') return { libraries: [] };
    if (!Array.isArray(data.libraries)) data.libraries = [];
    return data;
  } catch {
    return { libraries: [] };
  }
}

async function writeByType(type, data) {
  const release = await acquireWriteLock();
  try {
    await fs.mkdir(path.dirname(filePath(type)), { recursive: true });
    await fs.writeFile(filePath(type), JSON.stringify(data, null, 2), 'utf8');
  } finally {
    release();
  }
}

// One-shot migration: legacy global upgrade-libraries.json → per-type plugins.json
async function migrateOnce() {
  if (migrated) return;
  migrated = true;
  if (!fsSync.existsSync(LEGACY_FILE)) return;
  // Don't clobber if new files already exist.
  if (TYPES.some((t) => fsSync.existsSync(filePath(t)))) return;
  try {
    const raw = await fs.readFile(LEGACY_FILE, 'utf8');
    const data = JSON.parse(raw);
    const libs = Array.isArray(data.libraries) ? data.libraries : [];
    const byType = { flutter: [], rn: [], sdk: [] };
    for (const l of libs) {
      const t = String(l.type || '').toLowerCase();
      if (byType[t]) byType[t].push(l);
    }
    for (const t of TYPES) {
      if (byType[t].length) await writeByType(t, { libraries: byType[t] });
    }
    console.log(`[upgrade] migrated ${libs.length} libraries from upgrade-libraries.json → per-type plugins.json`);
  } catch (e) {
    console.error('[upgrade] migration error:', e.message);
  }
}

async function readLibraries() {
  await migrateOnce();
  const all = [];
  for (const t of TYPES) {
    const data = await readByType(t);
    for (const l of data.libraries) all.push(l);
  }
  // Rename legacy <name>__<shortid> repo dirs → <name> (idempotent, once per process).
  migrateUpgradeLayout(all);
  return { libraries: all };
}

// Full write (split by type). Kept for the GET /libraries reconcile path.
async function writeLibraries({ libraries } = {}) {
  await migrateOnce();
  const byType = { flutter: [], rn: [], sdk: [] };
  for (const l of (libraries || [])) {
    const t = String(l.type || '').toLowerCase();
    if (byType[t]) byType[t].push(l);
  }
  for (const t of TYPES) {
    await writeByType(t, { libraries: byType[t] });
  }
}

function normalizeRepoUrl(url) {
  if (!url) return '';
  return String(url)
    .trim()
    .replace(/\.git$/i, '')
    .replace(/\/+$/, '');
}

function ensureId() {
  // Node 22 has crypto.randomUUID
  return globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function deriveNameFromUrl(url) {
  const u = normalizeRepoUrl(url);
  const m = u.match(/([^/]+?)(?:\.git)?$/);
  return m ? m[1] : '';
}

function sanitizeLibrary(input) {
  const now = new Date().toISOString();
  const repoUrl = normalizeRepoUrl(input.repoUrl || input.url);
  const type = String(input.type || '').trim().toLowerCase();
  // framework version only applies to flutter / rn; sdk has none
  const framework = (type === 'sdk') ? '' : String(input.targetFrameworkVersion || '').trim();
  const name = String(input.name || '').trim() || deriveNameFromUrl(repoUrl);
  return {
    id: input.id || ensureId(),
    type,
    name,
    repoUrl,
    harmonizedRepoUrl: normalizeRepoUrl(input.harmonizedRepoUrl || input.harmonizedUrl),
    repoBranch: String(input.repoBranch || '').trim(),
    harmonizedBranch: String(input.harmonizedBranch || '').trim(),
    targetOsVersion: String(input.targetOsVersion || '').trim(),
    targetFrameworkVersion: framework,
    enabled: input.enabled !== false,
    createdAt: input.createdAt || now,
    updatedAt: now,
    lastRun: input.lastRun || null,
    clone: input.clone || null
  };
}

// Dedup key: same upstream repo may appear once per type (tab).
function dedupKey(library) {
  return `${library.type}||${normalizeRepoUrl(library.repoUrl)}`;
}

function sortLibraries(arr) {
  arr.sort((a, b) => (a.name || a.repoUrl).localeCompare((b.name || b.repoUrl), 'zh-CN'));
}

async function upsertMany(items) {
  await migrateOnce();
  const grouped = {};
  for (const raw of items) {
    const l = sanitizeLibrary(raw);
    if (!l.repoUrl || !l.type || !TYPES.includes(l.type)) continue;
    (grouped[l.type] = grouped[l.type] || []).push(l);
  }

  const merged = [];
  for (const t of TYPES) {
    const incoming = grouped[t];
    if (!incoming || incoming.length === 0) continue;
    const data = await readByType(t);
    const byKey = new Map(data.libraries.map((l) => [dedupKey(l), l]));
    for (const l of incoming) {
      const key = dedupKey(l);
      const prev = byKey.get(key);
      if (prev) {
        prev.name = l.name || prev.name;
        prev.harmonizedRepoUrl = l.harmonizedRepoUrl || prev.harmonizedRepoUrl;
        prev.repoBranch = l.repoBranch || prev.repoBranch;
        prev.harmonizedBranch = l.harmonizedBranch || prev.harmonizedBranch;
        prev.targetOsVersion = l.targetOsVersion || prev.targetOsVersion;
        prev.targetFrameworkVersion = l.targetFrameworkVersion || prev.targetFrameworkVersion;
        prev.enabled = l.enabled !== false;
        prev.updatedAt = new Date().toISOString();
      } else {
        byKey.set(key, l);
      }
    }
    const arr = Array.from(byKey.values());
    sortLibraries(arr);
    await writeByType(t, { libraries: arr });
    merged.push(...arr);
  }
  sortLibraries(merged);
  return merged;
}

async function addOne(item) {
  const list = await upsertMany([item]);
  const key = dedupKey(sanitizeLibrary(item));
  return list.find((l) => dedupKey(l) === key);
}

async function updateOne(id, patch) {
  await migrateOnce();
  for (const t of TYPES) {
    const data = await readByType(t);
    const idx = data.libraries.findIndex((l) => l.id === id);
    if (idx !== -1) {
      const cur = data.libraries[idx];
      const next = { ...cur, ...patch };
      if (patch.repoUrl || patch.url) next.repoUrl = normalizeRepoUrl(patch.repoUrl || patch.url);
      if (patch.harmonizedRepoUrl || patch.harmonizedUrl) {
        next.harmonizedRepoUrl = normalizeRepoUrl(patch.harmonizedRepoUrl || patch.harmonizedUrl);
      }
      if (patch.type === 'sdk') next.targetFrameworkVersion = '';
      next.updatedAt = new Date().toISOString();
      data.libraries[idx] = next;
      await writeByType(t, data);
      return next;
    }
  }
  return null;
}

async function removeOne(id) {
  await migrateOnce();
  for (const t of TYPES) {
    const data = await readByType(t);
    const before = data.libraries.length;
    const next = data.libraries.filter((l) => l.id !== id);
    if (next.length !== before) {
      await writeByType(t, { libraries: next });
      return true;
    }
  }
  return false;
}

function librariesFileExists() {
  return TYPES.some((t) => fsSync.existsSync(filePath(t)));
}

module.exports = {
  readLibraries,
  writeLibraries,
  upsertMany,
  addOne,
  updateOne,
  removeOne,
  sanitizeLibrary,
  normalizeRepoUrl,
  dedupKey,
  librariesFileExists,
  migrateOnce
};
