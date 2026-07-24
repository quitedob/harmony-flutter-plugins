'use strict';

const fsSync = require('fs');
const fs = require('fs').promises;
const path = require('path');
const { spawn } = require('child_process');
const { readData, writeData, sanitizePlugin, readLibrarySources, buildTpcRepoUrl } = require('../data');
const { generateId } = require('../utils');
const { getReposDir, WORKSPACE_ROOT } = require('../config');
const { ensureWorkspaceLinks, getWorkspaceDirs, getWorkspaceFiles } = require('../backends/workspace-links');
const { readSettings, buildProxyEnv } = require('../settings');
const { getActiveProfile, runWithProfile } = require('../profile');
const { batchCloneState } = require('../runtime-state');
const pubDownloadService = require('./pub-download-service');
const { resolvePluginWorkRoot } = require('../plugin-work-root');

function spawnAsync(cmd, args, opts) {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, { ...opts, stdio: 'pipe' });
    let stdout = '';
    let stderr = '';
    proc.stdout.on('data', (d) => { stdout += d.toString(); });
    proc.stderr.on('data', (d) => { stderr += d.toString(); });
    proc.on('close', (code) => {
      if (code === 0) resolve(stdout.trim());
      else reject(new Error(stderr.trim() || `exit code ${code}`));
    });
    proc.on('error', reject);
  });
}

async function getProxyEnv() {
  const settings = await readSettings();
  return { ...process.env, ...buildProxyEnv(settings) };
}

function resolveProfileId(profileId) {
  return profileId || getActiveProfile().id;
}

async function persistPlugin(plugin) {
  const data = await readData();
  const idx = data.plugins.findIndex(p => p.id === plugin.id);
  if (idx !== -1) data.plugins[idx] = sanitizePlugin(plugin);
  else data.plugins.push(sanitizePlugin(plugin));
  await writeData(data);
}

function createVirtualPlugin(pluginId) {
  if (!pluginId.startsWith('src_')) return null;
  const libSources = readLibrarySources();
  const srcName = pluginId.replace('src_', '');
  const src = libSources.find(s => s.name === srcName);
  if (!src) return null;

  const repoUrl = src.source_url.endsWith('.git') ? src.source_url : src.source_url + '.git';
  return {
    id: generateId(),
    name: src.name,
    repoUrl,
    sourceUrl: src.source_url,
    tpcRepoUrl: buildTpcRepoUrl(src.name),
    commitHash: '',
    cloneTime: null,
    status: 'initialized'
  };
}

async function materializeVirtualPlugin(pluginId) {
  const plugin = createVirtualPlugin(pluginId);
  if (!plugin) return null;

  const data = await readData();
  data.plugins.push(plugin);
  await writeData(data);
  return plugin;
}

async function findOrMaterializePlugin(pluginId) {
  const data = await readData();
  let plugin = data.plugins.find(p => p.id === pluginId);

  if (!plugin && pluginId.startsWith('src_')) {
    plugin = await materializeVirtualPlugin(pluginId);
  }

  return plugin || null;
}

/**
 * Clone or download a single plugin.
 * Supports both Git clone and Pub.dev download based on sourceType.
 * Shared by single-clone and batch-clone endpoints.
 * @returns {{ success: boolean, plugin: object|null, error?: string }}
 */
async function clonePlugin(pluginId, options = {}) {
  const profileId = resolveProfileId(options.profileId);
  return runWithProfile(profileId, () => clonePluginInCurrentProfile(pluginId, options));
}

async function clonePluginInCurrentProfile(pluginId, options = {}) {
  const { branch, proxyEnv: customProxyEnv, persist = true } = options;

  let plugin = await findOrMaterializePlugin(pluginId);
  if (!plugin) return { success: false, plugin: null, error: 'Plugin not found' };

  const repoPath = path.join(getReposDir(), plugin.name);
  const proxyEnv = customProxyEnv || await getProxyEnv();

  plugin.status = 'cloning';
  if (persist) await persistPlugin(plugin);
  console.log(`Git Clone: ${plugin.name}`);

  // Branch based on sourceType
  if (plugin.sourceType === 'pub') {
    // Pub.dev download flow
    try {
      // Check if this is a federated plugin (has pubPackages)
      const packages = plugin.pubPackages && plugin.pubPackages.length > 0
        ? plugin.pubPackages
        : [plugin.name];

      const result = await pubDownloadService.downloadPubPackageGroup(packages, getReposDir(), proxyEnv);

      // Get version info from first package result
      const firstPkg = result.packages.find(p => p.name === plugin.name);
      if (firstPkg && firstPkg.version) {
        plugin.pubVersion = firstPkg.version;
        plugin.pubArchiveUrl = firstPkg.archiveUrl || '';
      }

      plugin.status = 'cloned';
      plugin.cloneTime = new Date().toISOString();

      // Set sourceUrl if we got homepage from pub.dev
      if (firstPkg && firstPkg.homepage && !plugin.sourceUrl) {
        plugin.sourceUrl = firstPkg.homepage;
      }

      const workRoot = resolvePluginWorkRoot(repoPath, plugin);
      ensureWorkspaceLinks(workRoot, WORKSPACE_ROOT);
    } catch (downloadError) {
      plugin.status = 'clone_failed';
      console.error(`Pub download failed for ${plugin.name}:`, downloadError.message);
    }
  } else {
    // Git clone flow (default)
    const profile = getActiveProfile();
    const targetBranch = profile.TARGET_BRANCH || 'harmony';

    try {
      if (branch === targetBranch) {
        const tpcUrl = plugin.tpcRepoUrl || buildTpcRepoUrl(plugin.name);
        if (fsSync.existsSync(repoPath)) {
          try { await spawnAsync('git', ['-C', repoPath, 'remote', 'add', 'tpc', tpcUrl], { env: proxyEnv }); } catch {}
          await spawnAsync('git', ['-C', repoPath, 'fetch', 'tpc', targetBranch], { env: proxyEnv });
          await spawnAsync('git', ['-C', repoPath, 'checkout', '-B', targetBranch, `tpc/${targetBranch}`], { env: proxyEnv });
        } else {
          await spawnAsync('git', ['clone', '-b', targetBranch, tpcUrl, repoPath], { env: proxyEnv });
        }
        plugin.harmonyBranch = true;
      } else {
        if (fsSync.existsSync(repoPath)) {
          await spawnAsync('git', ['-C', repoPath, 'pull'], { env: proxyEnv });
        } else {
          // Support sourceBranch for monorepo URLs (e.g. repos on non-default branches)
          const cloneArgs = ['clone'];
          if (plugin.sourceBranch) {
            cloneArgs.push('-b', plugin.sourceBranch);
          }
          cloneArgs.push(plugin.repoUrl, repoPath);
          await spawnAsync('git', cloneArgs, { env: proxyEnv });
        }
      }

      const commitHash = await spawnAsync('git', ['-C', repoPath, 'rev-parse', 'HEAD'], { env: proxyEnv });
      plugin.commitHash = commitHash;
      plugin.status = 'cloned';
      plugin.cloneTime = new Date().toISOString();

      const workRoot = resolvePluginWorkRoot(repoPath, plugin);
      ensureWorkspaceLinks(workRoot, WORKSPACE_ROOT);
    } catch (gitError) {
      plugin.status = 'clone_failed';
      console.error(`Clone failed for ${plugin.name}:`, gitError.message);
    }
  }

  if (persist) await persistPlugin(plugin);
  if (plugin.status === 'cloned') console.log(`Cloned: ${plugin.name}`);
  return { success: plugin.status === 'cloned', plugin };
}

function getBatchCloneState() {
  return {
    running: batchCloneState.running,
    progress: batchCloneState.progress,
    profileId: batchCloneState.profileId || batchCloneState.progress?.profileId || null
  };
}

/**
 * Run batch clone in background with concurrency control.
 * Returns immediately after validation; actual cloning happens asynchronously.
 * @returns {{ started: boolean, total: number, error?: string }}
 */
async function startBatchClone(targetIds, maxConcurrency, options = {}) {
  const profileId = resolveProfileId(options.profileId);
  return runWithProfile(profileId, () => startBatchCloneInCurrentProfile(targetIds, maxConcurrency, profileId));
}

async function startBatchCloneInCurrentProfile(targetIds, maxConcurrency, profileId) {
  if (batchCloneState.running) {
    return { started: false, total: 0, error: '批量克隆已在进行中', progress: batchCloneState.progress };
  }

  if (targetIds.length === 0) {
    return { started: true, total: 0 };
  }

  const data = await readData();
  const preparedPlugins = [];
  const preparedIds = new Set();

  for (const targetId of targetIds) {
    let plugin = data.plugins.find(p => p.id === targetId);
    if (!plugin && targetId.startsWith('src_')) {
      const sourceName = targetId.replace('src_', '');
      plugin = data.plugins.find(p => p.name === sourceName) || createVirtualPlugin(targetId);
      if (plugin && !data.plugins.some(p => p.id === plugin.id)) data.plugins.push(plugin);
    }
    if (!plugin || preparedIds.has(plugin.id)) continue;

    plugin.status = 'cloning';
    preparedPlugins.push(plugin);
    preparedIds.add(plugin.id);
  }

  if (preparedPlugins.length === 0) {
    return { started: true, total: 0 };
  }

  // Persist the complete batch state once before any clone process starts.
  await writeData(data);

  batchCloneState.running = true;
  batchCloneState.profileId = profileId;
  batchCloneState.progress = { total: preparedPlugins.length, completed: 0, failed: 0, current: '', profileId };

  const proxyEnv = await getProxyEnv();

  (async () => {
    await runWithProfile(profileId, async () => {
      const results = new Map();

      async function cloneOne(plugin) {
        batchCloneState.progress.current = plugin.name;
        let result;
        try {
          result = await clonePlugin(plugin.id, { proxyEnv, profileId, persist: false });
        } catch (error) {
          plugin.status = 'clone_failed';
          result = { success: false, plugin, error: error.message };
          console.error(`Clone failed for ${plugin.name}:`, error.message);
        }
        results.set(plugin.id, result.plugin);

        if (result.success) batchCloneState.progress.completed++;
        else batchCloneState.progress.failed++;
      }

      const executing = new Set();
      for (const plugin of preparedPlugins) {
        const p = cloneOne(plugin).then(() => { executing.delete(p); });
        executing.add(p);
        if (executing.size >= maxConcurrency) {
          await Promise.race(executing);
        }
      }
      await Promise.all(executing);

      // Merge every final result into the latest file snapshot and persist once.
      const finalData = await readData();
      for (const [pluginId, resultPlugin] of results) {
        const idx = finalData.plugins.findIndex(p => p.id === pluginId);
        if (idx !== -1) finalData.plugins[idx] = sanitizePlugin(resultPlugin);
      }
      await writeData(finalData);

      batchCloneState.running = false;
      batchCloneState.progress = null;
      batchCloneState.profileId = null;
      console.log(`Batch clone completed: ${preparedPlugins.length} plugins`);
    });
  })().catch((error) => {
    console.error('Batch clone error:', error.message);
    batchCloneState.running = false;
    batchCloneState.progress = null;
    batchCloneState.profileId = null;
  });

  return { started: true, total: preparedPlugins.length };
}

/**
 * Resolve which plugin IDs need cloning for batch-clone "all" mode.
 */
async function resolveBatchCloneTargets(existingIds) {
  const data = await readData();
  const libSources = readLibrarySources();
  const targetIds = [...(existingIds || [])];

  const { normalizeRepoUrl } = require('../data');
  const pluginsByName = new Map(data.plugins.map(p => [p.name, p]));
  const pluginsByUrl = new Map(
    data.plugins.filter(p => p.repoUrl).map(p => [normalizeRepoUrl(p.repoUrl), p])
  );

  for (const src of libSources) {
    const normalizedUrl = normalizeRepoUrl(src.source_url);
    const existByName = pluginsByName.get(src.name);
    const existByUrl = pluginsByUrl.get(normalizedUrl);

    if (existByName && existByName.status === 'cloned') continue;
    if (existByUrl && existByUrl.status === 'cloned') continue;

    const repoPath = path.join(getReposDir(), src.name);
    if (fsSync.existsSync(repoPath)) continue;

    if (existByName) targetIds.push(existByName.id);
    else targetIds.push(`src_${src.name}`);
  }

  return targetIds;
}

// ── TPC sync ──

async function syncToTpc(pluginId) {
  const data = await readData();
  const plugin = data.plugins.find(p => p.id === pluginId);
  if (!plugin) return { success: false, error: '插件不存在' };

  const repoPath = path.join(getReposDir(), plugin.name);
  if (!fsSync.existsSync(repoPath)) {
    return { success: false, error: '仓库尚未克隆' };
  }

  const settings = await readSettings();
  const proxyEnv = { ...process.env, ...buildProxyEnv(settings) };
  const tpcUrl = plugin.tpcRepoUrl || buildTpcRepoUrl(plugin.name);

  let pushUrl = tpcUrl;
  if (settings.githubToken) {
    pushUrl = tpcUrl.replace('https://github.com/', `https://${settings.githubToken}@github.com/`);
  }

  const steps = [];
  const profile = getActiveProfile();

  try {
    // 1. Add tpc remote if missing
    try {
      await spawnAsync('git', ['-C', repoPath, 'remote', 'get-url', 'tpc'], { env: proxyEnv });
      steps.push({ step: 'check_remote', status: 'exists' });
    } catch {
      await spawnAsync('git', ['-C', repoPath, 'remote', 'add', 'tpc', pushUrl], { env: proxyEnv });
      steps.push({ step: 'add_remote', status: 'ok' });
    }
    await spawnAsync('git', ['-C', repoPath, 'remote', 'set-url', 'tpc', pushUrl], { env: proxyEnv });

    // 2. Ensure .gitignore excludes workspace links & includes adaptation logs
    const gitignorePath = path.join(repoPath, '.gitignore');
    let gitignoreContent = '';
    try { gitignoreContent = fsSync.readFileSync(gitignorePath, 'utf8'); } catch {}

    const excludeEntries = [...getWorkspaceDirs(), ...getWorkspaceFiles()];
    const adaptDir = profile.ADAPTATION_DIR;
    const includeEntries = [`!${adaptDir}/`, `!${adaptDir}/**`];
    let gitignoreModified = false;
    for (const entry of excludeEntries) {
      if (!gitignoreContent.includes(entry)) {
        gitignoreContent += `\n${entry}`;
        gitignoreModified = true;
      }
    }
    for (const entry of includeEntries) {
      if (!gitignoreContent.includes(entry)) {
        gitignoreContent += `\n${entry}`;
        gitignoreModified = true;
      }
    }
    if (gitignoreModified) {
      gitignoreContent = gitignoreContent.trim() + '\n';
      fsSync.writeFileSync(gitignorePath, gitignoreContent);
      steps.push({ step: 'update_gitignore', status: 'ok' });
    }

    // 3. Save current branch, create/switch to target branch
    const targetBranch = profile.TARGET_BRANCH || 'harmony';
    const commitMsg = profile.branding?.commitMessage
      ? profile.branding.commitMessage(plugin.name)
      : `feat: adaptation for ${plugin.name}\n\nAutomated adaptation by adapt-workflow [${profile.id}]`;

    let originalBranch;
    try {
      originalBranch = await spawnAsync('git', ['-C', repoPath, 'rev-parse', '--abbrev-ref', 'HEAD'], { env: proxyEnv });
    } catch {
      originalBranch = 'main';
    }

    if (originalBranch !== targetBranch) {
      try {
        await spawnAsync('git', ['-C', repoPath, 'checkout', '-b', targetBranch], { env: proxyEnv });
      } catch {
        await spawnAsync('git', ['-C', repoPath, 'checkout', targetBranch], { env: proxyEnv });
      }
      steps.push({ step: 'checkout_target', status: 'ok' });
    }

    // 4. Stage changes
    await spawnAsync('git', ['-C', repoPath, 'add', '--all'], { env: proxyEnv });

    for (const entry of excludeEntries) {
      const entryPath = path.join(repoPath, entry);
      if (fsSync.existsSync(entryPath)) {
        try {
          await spawnAsync('git', ['-C', repoPath, 'rm', '-r', '--cached', '--ignore-unmatch', entry], { env: proxyEnv });
        } catch {}
      }
    }
    steps.push({ step: 'stage_changes', status: 'ok' });

    // 5. Check for changes & commit
    let hasChanges = false;
    try {
      const diffOutput = await spawnAsync('git', ['-C', repoPath, 'diff', '--cached', '--name-only'], { env: proxyEnv });
      hasChanges = diffOutput.trim().length > 0;
    } catch {}

    if (hasChanges) {
      await spawnAsync('git', [
        '-C', repoPath, 'commit', '-m', commitMsg
      ], { env: proxyEnv });
      steps.push({ step: 'commit', status: 'ok' });
    } else {
      steps.push({ step: 'commit', status: 'skip', message: '没有新的变更' });
    }

    // 6. Push to tpc/target branch
    await spawnAsync('git', ['-C', repoPath, 'push', '-u', 'tpc', targetBranch], { env: proxyEnv });
    steps.push({ step: 'push', status: 'ok' });

    // 7. Switch back to original branch
    if (originalBranch && originalBranch !== targetBranch) {
      try {
        await spawnAsync('git', ['-C', repoPath, 'checkout', originalBranch], { env: proxyEnv });
      } catch {}
    }

    // Update plugin record
    const updatedData = await readData();
    const pIdx = updatedData.plugins.findIndex(p => p.id === pluginId);
    if (pIdx !== -1) {
      updatedData.plugins[pIdx].lastSyncTime = new Date().toISOString();
      updatedData.plugins[pIdx].tpcRepoUrl = tpcUrl;
      await writeData(updatedData);
    }

    return {
      success: true,
      tpcUrl: `${profile.TPC_ORG_URL}/${plugin.name}`,
      branch: targetBranch,
      steps
    };
  } catch (err) {
    const targetBranchForRollback = profile.TARGET_BRANCH || 'harmony';
    try {
      const curBranch = await spawnAsync('git', ['-C', repoPath, 'rev-parse', '--abbrev-ref', 'HEAD'], { env: proxyEnv });
      if (curBranch === targetBranchForRollback) {
        await spawnAsync('git', ['-C', repoPath, 'checkout', '-'], { env: proxyEnv });
      }
    } catch {}

    return { success: false, error: `同步失败: ${err.message}`, steps };
  }
}

module.exports = {
  spawnAsync,
  getProxyEnv,
  persistPlugin,
  findOrMaterializePlugin,
  clonePlugin,
  getBatchCloneState,
  startBatchClone,
  resolveBatchCloneTargets,
  syncToTpc
};
