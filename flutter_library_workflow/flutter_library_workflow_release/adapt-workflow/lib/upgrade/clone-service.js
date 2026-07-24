'use strict';

/**
 * Upgrade-library clone service.
 *
 * Mirrors the 鸿蒙化 clone flow (lib/services/clone-service.js) but for upgrade
 * libraries: clones BOTH the harmonized repo (主工作区) and the upstream repo
 * (辅，<name>_upstream) under `repos_<type>_upgrade/`，with proxy support,
 * commit-hash recording, and per-library clone status. Decoupled from the
 * profile system.
 */

const fsSync = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { IS_WIN } = require('../platform');
const { readSettings, buildProxyEnv } = require('../settings');
const { readLibraries, writeLibraries, updateOne } = require('./libraries-store');
const { getUpgradeReposRoot, getHarmonizedRepoDir, getUpstreamRepoDir } = require('./paths');

const batchCloneState = { running: false, progress: null };

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, {
      cwd: opts.cwd || process.cwd(),
      shell: IS_WIN,
      env: { ...process.env, ...(opts.env || {}) },
      stdio: ['ignore', 'pipe', 'pipe']
    });
    let out = '';
    let err = '';
    proc.stdout.on('data', c => { out += c.toString(); });
    proc.stderr.on('data', c => { err += c.toString(); });
    proc.on('close', (code) => {
      if (code === 0) return resolve(out.trim());
      reject(new Error(`${cmd} ${args.join(' ')} failed (code=${code}): ${(err || out).slice(0, 500)}`));
    });
    proc.on('error', reject);
  });
}

async function getProxyEnv() {
  try {
    const settings = await readSettings();
    return buildProxyEnv(settings);
  } catch {
    return {};
  }
}

async function gitHead(repoDir, env) {
  try {
    return await run('git', ['-C', repoDir, 'rev-parse', 'HEAD'], { env });
  } catch {
    return null;
  }
}

/**
 * Clone one repo URL into dest if not already cloned; return HEAD or null.
 * When `branch` is given, clone (and on re-clone, check out) that branch;
 * otherwise the repo's default branch is used.
 */
async function cloneOne(url, dest, env, branch) {
  if (!url) return null;
  const branchArg = branch ? String(branch).trim() : '';
  if (fsSync.existsSync(path.join(dest, '.git'))) {
    // Already cloned: best-effort switch to the requested branch.
    if (branchArg) {
      try { await run('git', ['-C', dest, 'checkout', branchArg], { env }); } catch {}
    }
    return await gitHead(dest, env);
  }
  fsSync.mkdirSync(path.dirname(dest), { recursive: true });
  const args = branchArg
    ? ['clone', '--branch', branchArg, url, dest]
    : ['clone', url, dest];
  await run('git', args, { env });
  return await gitHead(dest, env);
}

/**
 * Clone both repos for a library and persist clone status.
 * @param {object} library  upgrade-library record (must have id + type)
 */
async function cloneLibrary(library, options = {}) {
  const { persist = true, env: customEnv } = options;
  const id = String(library.id);
  const env = customEnv || await getProxyEnv();
  const libraryName = library.name || library.repoUrl;
  console.log(`Git Clone: ${libraryName}`);

  const root = getUpgradeReposRoot(library.type);
  if (!fsSync.existsSync(root)) fsSync.mkdirSync(root, { recursive: true });

  const harmonizedDir = getHarmonizedRepoDir(library);
  const upstreamDir = getUpstreamRepoDir(library);

  if (persist) {
    await updateOne(id, {
      clone: { status: 'cloning', at: new Date().toISOString(), harmonizedCommit: null, upstreamCommit: null, error: null }
    });
  }

  let harmonizedCommit = null;
  let upstreamCommit = null;
  try {
    harmonizedCommit = await cloneOne(library.harmonizedRepoUrl, harmonizedDir, env, library.harmonizedBranch);
    upstreamCommit = await cloneOne(library.repoUrl, upstreamDir, env, library.repoBranch);
    const clone = { status: 'cloned', at: new Date().toISOString(), harmonizedCommit, upstreamCommit, error: null };
    if (persist) await updateOne(id, { clone });
    console.log(`Cloned: ${libraryName}`);
    return { success: true, harmonizedCommit, upstreamCommit, clone };
  } catch (e) {
    const clone = { status: 'clone_failed', at: new Date().toISOString(), harmonizedCommit, upstreamCommit, error: e.message };
    if (persist) await updateOne(id, { clone });
    console.error(`[upgrade-clone] failed for ${library.name || library.repoUrl}:`, e.message);
    return { success: false, error: e.message, clone };
  }
}

/** Clone a list of libraries with the configured concurrency (best-effort). */
async function cloneLibrariesBatch(libraries) {
  if (batchCloneState.running) {
    return { started: false, total: 0, error: '批量克隆已在进行中', progress: batchCloneState.progress };
  }

  const targetIds = new Set(libraries.map(l => String(l.id)));
  const data = await readLibraries();
  const preparedLibraries = data.libraries.filter(l => targetIds.has(String(l.id)));
  if (preparedLibraries.length === 0) return { started: true, total: 0 };

  const startedAt = new Date().toISOString();
  for (const library of preparedLibraries) {
    library.clone = {
      status: 'cloning',
      at: startedAt,
      harmonizedCommit: null,
      upstreamCommit: null,
      error: null
    };
  }
  // Persist the complete batch state once before any clone process starts.
  await writeLibraries(data);

  const settings = await readSettings();
  const configured = Math.floor(Number(settings.maxCloneConcurrency)) || 5;
  const workerCount = Math.min(preparedLibraries.length, Math.max(1, configured));
  const env = await getProxyEnv();

  batchCloneState.running = true;
  batchCloneState.progress = { total: preparedLibraries.length, completed: 0, failed: 0, current: '' };

  (async () => {
    let nextIndex = 0;
    const results = new Map();

    async function worker() {
      while (nextIndex < preparedLibraries.length) {
        const lib = preparedLibraries[nextIndex++];
        batchCloneState.progress.current = lib.name || lib.repoUrl;
        let result;
        try {
          result = await cloneLibrary(lib, { persist: false, env });
        } catch (e) {
          result = {
            success: false,
            clone: {
              status: 'clone_failed',
              at: new Date().toISOString(),
              harmonizedCommit: null,
              upstreamCommit: null,
              error: e.message
            }
          };
          console.error(`[upgrade-clone] batch error for ${lib.id}:`, e.message);
        }
        results.set(String(lib.id), result.clone);
        if (result.success) batchCloneState.progress.completed++;
        else batchCloneState.progress.failed++;
      }
    }

    await Promise.all(Array.from({ length: workerCount }, () => worker()));

    // Merge every final result into the latest file snapshot and persist once.
    const finalData = await readLibraries();
    for (const library of finalData.libraries) {
      const clone = results.get(String(library.id));
      if (clone) library.clone = clone;
    }
    await writeLibraries(finalData);

    batchCloneState.running = false;
    batchCloneState.progress = null;
  })().catch((error) => {
    console.error('[upgrade-clone batch]', error.message);
    batchCloneState.running = false;
    batchCloneState.progress = null;
  });

  return { started: true, total: preparedLibraries.length };
}

function getBatchCloneState() {
  return { running: batchCloneState.running, progress: batchCloneState.progress };
}

module.exports = { cloneLibrary, cloneLibrariesBatch, getBatchCloneState, getProxyEnv };
