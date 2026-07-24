'use strict';

const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
const { WORKSPACE_ROOT } = require('../config');

const FILE_NAME = 'mapping-sources.json';

let writeLock = Promise.resolve();

function acquireWriteLock() {
  let release;
  const next = new Promise(resolve => { release = resolve; });
  const prev = writeLock;
  writeLock = next;
  return prev.then(() => release);
}

function filePath() {
  // Mapping sources should be GLOBAL across profiles (flutter/rn/android-sdk).
  // We store them under the workspace-wide `repos/` directory.
  return path.join(WORKSPACE_ROOT, 'repos', FILE_NAME);
}

async function readSources() {
  try {
    const raw = await fs.readFile(filePath(), 'utf8');
    const data = JSON.parse(raw);
    if (!data || typeof data !== 'object') return { sources: [] };
    if (!Array.isArray(data.sources)) data.sources = [];
    return data;
  } catch {
    return { sources: [] };
  }
}

async function writeSources(data) {
  const release = await acquireWriteLock();
  try {
    await fs.mkdir(path.dirname(filePath()), { recursive: true });
    await fs.writeFile(filePath(), JSON.stringify(data, null, 2), 'utf8');
  } finally {
    release();
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

function sanitizeSource(input) {
  const now = new Date().toISOString();
  const gitUrl = normalizeRepoUrl(input.gitUrl || input.repoUrl || input.url);
  return {
    id: input.id || ensureId(),
    name: String(input.name || '').trim(),
    gitUrl,
    branch: String(input.branch || '').trim(),
    enabled: input.enabled !== false,
    tags: String(input.tags || '').trim(),
    notes: String(input.notes || '').trim(),
    createdAt: input.createdAt || now,
    updatedAt: now,
    lastRun: input.lastRun || null
  };
}

async function upsertMany(items) {
  const data = await readSources();
  const byUrl = new Map(data.sources.map(s => [normalizeRepoUrl(s.gitUrl), s]));

  for (const raw of items) {
    const s = sanitizeSource(raw);
    if (!s.gitUrl) continue;
    const key = normalizeRepoUrl(s.gitUrl);
    const prev = byUrl.get(key);
    if (prev) {
      prev.name = prev.name || s.name;
      prev.branch = prev.branch || s.branch;
      prev.tags = prev.tags || s.tags;
      prev.notes = prev.notes || s.notes;
      prev.enabled = prev.enabled ?? true;
      prev.updatedAt = new Date().toISOString();
    } else {
      byUrl.set(key, s);
    }
  }

  const merged = Array.from(byUrl.values());
  merged.sort((a, b) => (a.name || a.gitUrl).localeCompare((b.name || b.gitUrl), 'zh-CN'));
  await writeSources({ sources: merged });
  return merged;
}

async function addOne(item) {
  const list = await upsertMany([item]);
  const url = normalizeRepoUrl(item.gitUrl || item.repoUrl || item.url);
  return list.find(s => normalizeRepoUrl(s.gitUrl) === url);
}

async function updateOne(id, patch) {
  const data = await readSources();
  const idx = data.sources.findIndex(s => s.id === id);
  if (idx === -1) return null;
  const cur = data.sources[idx];
  const next = {
    ...cur,
    ...patch
  };
  if (patch.gitUrl || patch.repoUrl || patch.url) next.gitUrl = normalizeRepoUrl(patch.gitUrl || patch.repoUrl || patch.url);
  next.updatedAt = new Date().toISOString();
  data.sources[idx] = next;
  await writeSources(data);
  return next;
}

async function removeOne(id) {
  const data = await readSources();
  const before = data.sources.length;
  data.sources = data.sources.filter(s => s.id !== id);
  if (data.sources.length === before) return false;
  await writeSources(data);
  return true;
}

function sourcesFileExists() {
  return fsSync.existsSync(filePath());
}

module.exports = {
  readSources,
  writeSources,
  upsertMany,
  addOne,
  updateOne,
  removeOne,
  normalizeRepoUrl,
  sourcesFileExists
};

