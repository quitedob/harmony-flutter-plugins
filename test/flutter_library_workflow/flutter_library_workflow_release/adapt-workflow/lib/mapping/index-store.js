'use strict';

const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
const { WORKSPACE_ROOT } = require('../config');

const INDEX_FILE = 'mapping-index.json';

function indexFilePath() {
  return path.join(WORKSPACE_ROOT, 'repos', INDEX_FILE);
}

async function readIndex() {
  try {
    const raw = await fs.readFile(indexFilePath(), 'utf8');
    const data = JSON.parse(raw);
    if (!data || typeof data !== 'object') return { generatedAt: null, items: [], conflicts: [], stats: null };
    if (!Array.isArray(data.items)) data.items = [];
    if (!Array.isArray(data.conflicts)) data.conflicts = [];
    return data;
  } catch {
    return { generatedAt: null, items: [], conflicts: [], stats: null };
  }
}

async function writeIndex(data) {
  await fs.mkdir(path.dirname(indexFilePath()), { recursive: true });
  const out = {
    generatedAt: new Date().toISOString(),
    ...(data || {})
  };
  await fs.writeFile(indexFilePath(), JSON.stringify(out, null, 2), 'utf8');
  return out;
}

function indexExists() {
  return fsSync.existsSync(indexFilePath());
}

module.exports = {
  indexFilePath,
  readIndex,
  writeIndex,
  indexExists
};

