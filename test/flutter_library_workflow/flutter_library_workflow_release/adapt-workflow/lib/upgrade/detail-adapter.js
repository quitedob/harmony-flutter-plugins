'use strict';

// Bridge an upgrade *library* into the *plugin*-shaped contract the shared
// /api/plugins/:id/... handlers (routes/agent.js + routes/plugins.js) consume.
//
// The upgrade workflow reuses the adaptation detail page (frontend/detail.html +
// detail.js) unchanged. To do that with no frontend mode flag, the backend serves
// upgrade libraries through the same /api/plugins/:id/... routes whenever the
// active profile is an upgrade profile (profile.workflow === 'upgrade'). This
// module turns a library id into the {plugin, repoDir, library} triple those
// handlers need:
//   - plugin.name is the on-disk repo dir name, so the shared executor's
//     `cloneRoot = getReposDir()/plugin.name` resolves to the library's repo dir
//     (getReposDir() under an upgrade profile = repos_<type>_upgrade).
//   - plugin.repoUrl / tpcRepoUrl carry the upstream / harmonised repos so the
//     reused overview (repo links) renders correctly.
//
// Path helpers are profile-context-free (lib/upgrade/paths.js), so this resolves
// correctly even when called from a handler that has not pinned a profile itself
// (the request is pinned upstream by the ?profileId= middleware).

const fsSync = require('fs');
const { readLibraries } = require('./libraries-store');
const { getLibraryRepoDir, getRepoDirName } = require('./paths');

// Map an upgrade library's clone status onto a plugin-style status string that
// the detail page's status badge (dashboard.renderStrip reads plugin.status)
// understands.
function mapCloneToStatus(clone) {
  const s = clone && clone.status;
  if (s === 'cloned') return 'cloned';
  if (s === 'cloning') return 'cloning';
  if (s === 'clone_failed') return 'failed';
  return 'pending';
}

/**
 * Resolve an upgrade library id into {library, repoDir, plugin}.
 * Returns null when the id is not a known upgrade library (caller decides 404).
 *
 * @param {string} id
 * @returns {Promise<{library: object, repoDir: string, plugin: object} | null>}
 */
async function loadUpgradeLibraryPlugin(id) {
  const data = await readLibraries();
  const libraries = Array.isArray(data && data.libraries) ? data.libraries : [];
  const library = libraries.find(l => String(l.id) === String(id));
  if (!library) return null;

  const repoDir = getLibraryRepoDir(library);

  const plugin = {
    id: library.id,
    name: getRepoDirName(library),          // executor cloneRoot key
    repoUrl: library.repoUrl,               // upstream (待升级新版)
    tpcRepoUrl: library.harmonizedRepoUrl,  // 已鸿蒙化仓库（升级基线）→ 概览 TPC 链接位
    sourceType: 'git',
    status: mapCloneToStatus(library.clone),
    // Upgrade-specific fields ride along (harmless if the reused UI ignores them).
    targetOsVersion: library.targetOsVersion || '',
    targetFrameworkVersion: library.targetFrameworkVersion || ''
  };

  return { library, repoDir, plugin };
}

module.exports = { loadUpgradeLibraryPlugin, mapCloneToStatus };
