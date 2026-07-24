const path = require('path');

const PORT = Number(process.env.PORT) || 3020;

// Allow containerized deployment to mount the workspace at a stable path (e.g. /data),
// while keeping the default behavior unchanged for local dev.
const WORKSPACE_ROOT = process.env.WORKSPACE_ROOT
  ? path.resolve(String(process.env.WORKSPACE_ROOT))
  : path.join(__dirname, '..', '..');
const SETTINGS_FILE = path.join(__dirname, '..', 'data', 'settings.json');

// Legacy constants kept for reference; prefer getReposDir()/getDataFile() everywhere.
const REPOS_DIR = path.join(WORKSPACE_ROOT, 'repos');
const DATA_FILE = path.join(REPOS_DIR, 'plugins.json');

/**
 * Resolve the repos directory for the active profile.
 * Each profile defines its own reposDir (e.g. 'repos', 'repos-rn').
 * Lazy-loaded to avoid circular dependency with profile module.
 */
function getReposDir() {
  const { getActiveProfile } = require('./profile');
  try {
    const profile = getActiveProfile();
    if (profile.reposDir) {
      return path.join(WORKSPACE_ROOT, profile.reposDir);
    }
  } catch {}
  return path.join(WORKSPACE_ROOT, 'repos');
}

/**
 * Resolve the plugins.json data file path for the active profile.
 */
function getDataFile() {
  return path.join(getReposDir(), 'plugins.json');
}

/**
 * Resolve the all_library_sources.json path for the active profile.
 * Checks profile's agentDir first, then falls back to workspace root.
 * Lazy-loaded to avoid circular dependency with profile module.
 */
function getAllLibrarySourcesFile() {
  const fs = require('fs');
  const { getActiveProfile } = require('./profile');
  try {
    const profile = getActiveProfile();
    if (profile.agentDir) {
      const profileFile = path.join(WORKSPACE_ROOT, profile.agentDir, 'all_library_sources.json');
      if (fs.existsSync(profileFile)) return profileFile;
    }
  } catch {}
  return path.join(WORKSPACE_ROOT, 'all_library_sources.json');
}

module.exports = {
  PORT, DATA_FILE, REPOS_DIR, WORKSPACE_ROOT,
  SETTINGS_FILE, getAllLibrarySourcesFile,
  getReposDir, getDataFile,
};
