'use strict';

const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
const { readData, readLibrarySources, normalizeRepoUrl, buildTpcRepoUrl } = require('../data');
const { getReposDir } = require('../config');
const { getActiveProfile } = require('../profile');
const { getStages, getFilteredStages, STAGE_SKIP_IDS } = require('../stages');
const { readSettings } = require('../settings');
const { detectStageStatus } = require('../agent/stage-manager');
const { resolvePluginWorkRoot } = require('../plugin-work-root');

/**
 * Build the three-way merged + enriched plugin list.
 * Sources: plugins.json + all_library_sources.json + repos/ directory scan.
 */
async function getEnrichedPluginList() {
  const data = await readData();
  const libSources = readLibrarySources();
  const settings = await readSettings();

  const pluginsByName = new Map();
  const pluginsByUrl = new Map();
  for (const p of data.plugins) {
    pluginsByName.set(p.name, p);
    if (p.repoUrl) pluginsByUrl.set(normalizeRepoUrl(p.repoUrl), p);
  }

  const catalogNames = new Set(libSources.map(s => s.name));
  const catalogUrls = new Set(libSources.map(s => normalizeRepoUrl(s.source_url)));

  const mergedMap = new Map();

  // 1) plugins.json records (authoritative)
  for (const p of data.plugins) {
    const inCatalog = catalogNames.has(p.name) || (p.repoUrl && catalogUrls.has(normalizeRepoUrl(p.repoUrl)));
    mergedMap.set(p.name, { ...p, in_catalog: inCatalog });
  }

  // 2) all_library_sources entries (unmanaged items)
  for (const src of libSources) {
    const normalizedSrcUrl = normalizeRepoUrl(src.source_url);
    const existByName = mergedMap.get(src.name);
    const existByUrl = pluginsByUrl.get(normalizedSrcUrl);

    if (existByName) {
      if (!existByName.sourceUrl) existByName.sourceUrl = src.source_url;
      if (!existByName.tpcRepoUrl) existByName.tpcRepoUrl = buildTpcRepoUrl(src.name);
      existByName.in_catalog = true;
      continue;
    }
    if (existByUrl) {
      if (!existByUrl.sourceUrl) existByUrl.sourceUrl = src.source_url;
      if (!existByUrl.tpcRepoUrl) existByUrl.tpcRepoUrl = buildTpcRepoUrl(src.name);
      existByUrl.in_catalog = true;
      continue;
    }

    const repoUrl = src.source_url.endsWith('.git') ? src.source_url : src.source_url + '.git';
    mergedMap.set(src.name, {
      id: `src_${src.name}`,
      name: src.name,
      repoUrl,
      sourceUrl: src.source_url,
      tpcRepoUrl: buildTpcRepoUrl(src.name),
      commitHash: '',
      cloneTime: null,
      status: 'not_cloned',
      in_catalog: true,
      _virtual: true
    });
  }

  // 3) Scan repos/ for orphan directories
  try {
    const repoDirs = await fs.readdir(getReposDir());
    const excludedDirs = ['plugins.json', '_zips', '_temp-zip'];
    const stats = await Promise.all(
      repoDirs
        .filter(d => !excludedDirs.includes(d) && !d.startsWith('.'))
        .map(async (d) => {
          const dirPath = path.join(getReposDir(), d);
          try {
            const stat = await fs.stat(dirPath);
            return { name: d, dirPath, stat, isDir: stat.isDirectory() };
          } catch { return null; }
        })
    );

    for (const entry of stats) {
      if (!entry || !entry.isDir) continue;
      if (mergedMap.has(entry.name)) {
        const rec = mergedMap.get(entry.name);
        if (rec.status === 'not_cloned') {
          rec.status = 'cloned';
          rec.cloneTime = rec.cloneTime || entry.stat.mtime.toISOString();
        }
        continue;
      }
      mergedMap.set(entry.name, {
        id: `orphan_${entry.name}`,
        name: entry.name,
        repoUrl: '',
        commitHash: '',
        cloneTime: entry.stat.mtime.toISOString(),
        status: 'cloned',
        in_catalog: false,
        _virtual: true
      });
    }
  } catch {}

  // Enrich with adaptation info (async)
  const profile = getActiveProfile();
  const stages = getFilteredStages(settings);
  const plugins = await Promise.all(
    Array.from(mergedMap.values()).map(p => enrichPlugin(p, profile, stages, settings))
  );

  return plugins;
}

/**
 * Enrich a single plugin record with adaptation data and stage statuses.
 * All file I/O is async.
 */
async function enrichPlugin(plugin, profile, stages, settings) {
  const cloneRoot = path.join(getReposDir(), plugin.name);
  const workRepoPath = fsSync.existsSync(cloneRoot)
    ? resolvePluginWorkRoot(cloneRoot, plugin)
    : cloneRoot;
  const adaptDir = path.join(workRepoPath, profile.ADAPTATION_DIR);
  let extra = {
    overall_status: null, plugin_type: null, plugin_architecture: null,
    current_stage: null, adaptation_recommendation: null, complexity_level: null,
    quality_score: null, updated_at: null,
    stages_info: null, has_running: false, completed_stages: 0, running_stage_name: null
  };

  const adaptDirExists = await pathExists(adaptDir);
  if (adaptDirExists) {
    Object.assign(extra, await profile.extractListFields(adaptDir));
  }

  const repoExists = await pathExists(cloneRoot);
  if (repoExists) {
    const stagesInfo = {};
    let completed = 0;
    let runningName = null;
    let lastCompletedStage = null;
    let hasFailed = false;

    const statuses = await Promise.all(
      stages.map(async (stage) => ({
        stage,
        status: await detectStageStatus(workRepoPath, stage.id)
      }))
    );

    for (const { stage, status } of statuses) {
      stagesInfo[stage.id] = status;
      if (status === 'success') { completed++; lastCompletedStage = stage.id; }
      if (status === 'running') runningName = stage.name;
      if (status === 'failed') hasFailed = true;
    }

    extra.stages_info = stagesInfo;
    extra.has_running = runningName !== null;
    extra.completed_stages = completed;
    extra.running_stage_name = runningName;
    extra.current_stage = lastCompletedStage;
    if (hasFailed) extra.overall_status = 'failed';
    else if (completed === stages.length) extra.overall_status = 'success';
    else if (completed > 0 || runningName) extra.overall_status = 'in_progress';

    let latestMtime = 0;
    const mtimeChecks = await Promise.all(
      stages.map(async (stage) => {
        const fp = path.join(adaptDir, stage.outputFile);
        try {
          const st = await fs.stat(fp);
          return st.mtimeMs;
        } catch { return 0; }
      })
    );
    latestMtime = Math.max(0, ...mtimeChecks);
    if (latestMtime > 0) extra.updated_at = new Date(latestMtime).toISOString();
  }

  return { ...plugin, ...extra };
}

async function pathExists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

module.exports = {
  getEnrichedPluginList
};
