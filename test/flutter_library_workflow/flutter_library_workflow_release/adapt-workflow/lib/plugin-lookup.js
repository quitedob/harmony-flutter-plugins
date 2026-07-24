'use strict';

const fsSync = require('fs');
const path = require('path');
const { readData, readLibrarySources, buildTpcRepoUrl } = require('./data');
const { getReposDir } = require('./config');
const { AppError } = require('./errors');
const { generateId } = require('./utils');
const { resolvePluginWorkRoot } = require('./plugin-work-root');

/**
 * Materialize a virtual plugin from library sources or orphan repos.
 * Returns the plugin object or null if not found.
 */
async function materializeVirtualPlugin(pluginId) {
  // Handle src_ prefixed IDs (from all_library_sources.json)
  if (pluginId.startsWith('src_')) {
    const libSources = readLibrarySources();
    const srcName = pluginId.replace('src_', '');
    const src = libSources.find(s => s.name === srcName);
    if (!src) return null;

    const repoUrl = src.source_url.endsWith('.git') ? src.source_url : src.source_url + '.git';
    return {
      id: pluginId,
      name: src.name,
      repoUrl,
      sourceUrl: src.source_url,
      tpcRepoUrl: buildTpcRepoUrl(src.name),
      commitHash: '',
      cloneTime: null,
      status: 'not_cloned',
      _virtual: true
    };
  }

  // Handle orphan_ prefixed IDs (from repos/ directory scan)
  if (pluginId.startsWith('orphan_')) {
    const repoName = pluginId.replace('orphan_', '');
    const repoPath = path.join(getReposDir(), repoName);
    if (!fsSync.existsSync(repoPath)) return null;

    let cloneTime = null;
    try {
      const stat = fsSync.statSync(repoPath);
      cloneTime = stat.mtime.toISOString();
    } catch {}

    return {
      id: pluginId,
      name: repoName,
      repoUrl: '',
      commitHash: '',
      cloneTime,
      status: 'cloned',
      _virtual: true
    };
  }

  return null;
}

/**
 * Look up a plugin by ID, throwing AppError(404) if not found.
 * Handles both persisted plugins and virtual plugins (src_*, orphan_*).
 * Returns { plugin, data } so callers can also mutate data if needed.
 */
async function findPluginOrFail(pluginId) {
  const data = await readData();
  let plugin = data.plugins.find(p => p.id === pluginId);

  // If not found in plugins.json, try to materialize a virtual plugin
  if (!plugin) {
    plugin = await materializeVirtualPlugin(pluginId);
  }

  if (!plugin) {
    throw new AppError('插件不存在', 404);
  }
  return { plugin, data };
}

/**
 * Look up a plugin and verify its repo directory exists on disk.
 * Throws 404 for missing plugin, 400 for missing repo.
 */
async function findPluginWithRepo(pluginId) {
  const { plugin, data } = await findPluginOrFail(pluginId);
  const repoPath = path.join(getReposDir(), plugin.name);
  if (!fsSync.existsSync(repoPath)) {
    throw new AppError('仓库尚未克隆，请先执行 Clone 操作', 400);
  }
  const workRepoPath = resolvePluginWorkRoot(repoPath, plugin);
  return { plugin, data, repoPath, workRepoPath };
}

module.exports = { findPluginOrFail, findPluginWithRepo };
