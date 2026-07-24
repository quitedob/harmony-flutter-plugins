'use strict';

// Shared upgrade run-all runner. Used by BOTH entry points so the queue +
// lastRun bookkeeping + pipeline execution live in one place:
//   - POST /api/upgrade/libraries/:id/run   (upgrade list page 全部执行)
//   - POST /api/plugins/:id/run-all         (reused detail page 全部执行, upgrade profile)
//
// `runUpgradePipeline` runs upgrade stages through the shared graph executor
// under the library's upgrade profile, after writing the upgrade manifest the
// Agent prompt reads. Profiles that only define two stages still execute as a
// simple two-stage chain; profiles with optional branches follow the same
// settings-based filtering as the adaptation pipeline.

const fsSync = require('fs');
const upgradeQueue = require('./queue');
const { updateOne } = require('./libraries-store');
const { getUpgradeReposRoot, getLibraryRepoDir, getRepoDirName, ensureUpgradeManifest } = require('./paths');
const { runWithProfile, getUpgradeProfileId } = require('../profile');
const { getStages } = require('../stages');
const { readSettings } = require('../settings');
const { GraphExecutor } = require('../agent/graph-executor');

/**
 * Run the full upgrade pipeline for a library under its upgrade profile.
 * @param {object} library
 * @returns {Promise<{success: boolean, errorType?: string}>}
 */
async function runUpgradePipeline(library) {
  const repoDir = getLibraryRepoDir(library);
  await ensureUpgradeManifest(repoDir, library);
  const profileId = getUpgradeProfileId((library && library.type) || 'flutter');
  return runWithProfile(profileId, async () => {
    if (getStages().length === 0) {
      return {
        success: false,
        errorType: 'not_configured',
        completedStages: []
      };
    }

    const settings = await readSettings();
    const executor = new GraphExecutor();
    const result = await executor.execute(
      library.id,
      { name: getRepoDirName(library) },
      repoDir,
      settings
    );
    const failed = (result.completedStages || []).find(s => !s.success);
    return {
      success: result.success,
      errorType: failed?.errorType || (result.success ? null : 'failed'),
      completedStages: result.completedStages || []
    };
  });
}

/**
 * Enqueue a full upgrade run (queue + lastRun bookkeeping).
 * @param {string} id   library id
 * @param {object} library
 * @returns {Promise<{success: boolean, queued?: boolean, position?: number, status?: string, reason?: string, queueStatus: object}>}
 */
async function enqueueUpgradeRun(id, library) {
  const libraryName = library.name || library.repoUrl;

  const executeFn = async (_libraryId, _libraryName, control) => {
    control.currentStageId = 'upgrade-analysis';
    control.completedStages = [];

    const repoRoot = getUpgradeReposRoot();
    if (!fsSync.existsSync(repoRoot)) fsSync.mkdirSync(repoRoot, { recursive: true });

    const startedAt = new Date().toISOString();
    await updateOne(id, { lastRun: { status: 'running', startedAt } });

    let result;
    try {
      result = await runUpgradePipeline(library);
    } catch (err) {
      const endedAt = new Date().toISOString();
      await updateOne(id, { lastRun: { status: 'failed', startedAt, endedAt, errorType: 'unexpected' } });
      control.completedStages.push({ id: 'upgrade-analysis', success: false, attempts: 1, errorType: 'unexpected' });
      throw err;
    }

    const endedAt = new Date().toISOString();
    if (result.success) {
      await updateOne(id, { lastRun: { status: 'success', startedAt, endedAt } });
      control.completedStages = result.completedStages?.length
        ? result.completedStages
        : [{ id: 'upgrade-analysis', success: true, attempts: 1 }];
      return true;
    }

    await updateOne(id, { lastRun: { status: 'failed', startedAt, endedAt, errorType: result.errorType || 'unknown' } });
    control.completedStages = result.completedStages?.length
      ? result.completedStages
      : [{ id: 'upgrade-analysis', success: false, attempts: 1, errorType: result.errorType || 'unknown' }];
    return false;
  };

  const enqueueResult = await upgradeQueue.enqueue(id, libraryName, executeFn);
  return { success: true, ...enqueueResult, queueStatus: upgradeQueue.getStatus() };
}

module.exports = { runUpgradePipeline, enqueueUpgradeRun };
