const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
const { getDataFile, getReposDir, getAllLibrarySourcesFile } = require('./config');
const { getActiveProfile } = require('./profile');

const OLD_DATA_FILE = path.join(__dirname, '..', 'data', 'plugins.json');

let writeLock = Promise.resolve();

function acquireWriteLock() {
  let release;
  const next = new Promise(resolve => { release = resolve; });
  const prev = writeLock;
  writeLock = next;
  return prev.then(() => release);
}

async function readData() {
  try {
    const data = await fs.readFile(getDataFile(), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { plugins: [] };
  }
}

async function writeData(data) {
  const release = await acquireWriteLock();
  try {
    await fs.mkdir(getReposDir(), { recursive: true });
    await fs.writeFile(getDataFile(), JSON.stringify(data, null, 2));
  } finally {
    release();
  }
}

const PLUGIN_SCHEMA_KEYS = [
  'id', 'name', 'repoUrl', 'commitHash', 'cloneTime', 'status',
  'sourceUrl', 'tpcRepoUrl', 'lastSyncTime', 'harmonyBranch',
  'sourceType', 'pubVersion', 'pubArchiveUrl', 'pubPackages', 'addedAt',
  'zipFileName', 'zipUploadTime',
  'packagePath', 'sourceBranch'
];

function sanitizePlugin(plugin) {
  const out = {};
  for (const k of PLUGIN_SCHEMA_KEYS) {
    if (plugin[k] !== undefined) out[k] = plugin[k];
  }
  return out;
}

/**
 * Read all_library_sources.json (full catalog of libraries).
 * Path is resolved from the active profile's agentDir.
 */
function readLibrarySources() {
  try {
    const filePath = getAllLibrarySourcesFile();
    if (!fsSync.existsSync(filePath)) return [];
    const raw = fsSync.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/**
 * Normalize a repo URL for dedup comparison.
 * Strips .git suffix, /tree/... paths, trailing slashes, and lowercases.
 */
function normalizeRepoUrl(url) {
  if (!url) return '';
  return url
    .replace(/\.git$/, '')
    .replace(/\/tree\/[^/]+\/.*$/, '')
    .replace(/\/+$/, '')
    .toLowerCase();
}

/**
 * Build TPC repo URL for a given plugin name.
 */
function buildTpcRepoUrl(name) {
  return getActiveProfile().buildTpcRepoUrl(name);
}

async function migrateData() {
  try {
    let data = { plugins: [] };
    let needsWrite = false;

    try {
      await fs.access(getDataFile());
      data = await readData();
    } catch {
      try {
        await fs.access(OLD_DATA_FILE);
        const raw = await fs.readFile(OLD_DATA_FILE, 'utf8');
        data = JSON.parse(raw);
        needsWrite = true;
        console.log('Migrating plugins.json from data/ to repos/');
      } catch {
        data = { plugins: [] };
      }
    }

    for (let i = 0; i < data.plugins.length; i++) {
      const p = data.plugins[i];
      const hasExtra = Object.keys(p).some(k => !PLUGIN_SCHEMA_KEYS.includes(k));
      if (hasExtra) {
        data.plugins[i] = sanitizePlugin(p);
        needsWrite = true;
      }
    }

    if (needsWrite) {
      await writeData(data);
      console.log('Data migration completed');
    }
  } catch (error) {
    console.error('Data migration error:', error.message);
  }
}

module.exports = {
  readData, writeData, migrateData, sanitizePlugin,
  readLibrarySources, normalizeRepoUrl, buildTpcRepoUrl
};
