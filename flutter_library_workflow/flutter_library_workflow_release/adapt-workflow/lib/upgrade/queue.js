'use strict';

const { readSettings } = require('../settings');
const {
  upgradeTaskQueue, upgradeRunningTasks, upgradeCompletedTasks, MAX_COMPLETED
} = require('../runtime-state');
const { upgradeActiveProcs } = require('../runtime-state');
const { killProc } = require('../platform');

let maxConcurrency = 1;

async function refreshConcurrency() {
  try {
    const settings = await readSettings();
    // upgrade has its own queue concurrency; default is serial (1).
    const v = settings.upgradeMaxConcurrency;
    maxConcurrency = (typeof v === 'number' && Number.isFinite(v) && v >= 1)
      ? Math.floor(v)
      : 1;
  } catch {}
}

/**
 * @param {string} libraryId
 * @param {string} libraryName
 * @param {function} executeFn - async (libraryId, libraryName, control) => boolean
 * @returns {Promise<{ queued: boolean, position?: number, status?: string, reason?: string }>}
 */
async function enqueue(libraryId, libraryName, executeFn) {
  await refreshConcurrency();

  if (upgradeRunningTasks.has(libraryId)) {
    return { queued: false, reason: 'already_running' };
  }
  if (upgradeTaskQueue.some(t => t.libraryId === libraryId)) {
    return { queued: false, reason: 'already_queued' };
  }

  if (upgradeRunningTasks.size < maxConcurrency) {
    startTask(libraryId, libraryName, executeFn);
    return { queued: true, position: 0, status: 'started' };
  }

  return new Promise((resolve) => {
    const position = upgradeTaskQueue.length + 1;
    upgradeTaskQueue.push({ libraryId, libraryName, executeFn, resolve });
    resolve({ queued: true, position, status: 'waiting' });
  });
}

async function startTask(libraryId, libraryName, executeFn) {
  const control = { aborted: false, currentStageId: null, completedStages: [], startTime: Date.now() };
  upgradeRunningTasks.set(libraryId, { libraryName, startTime: Date.now(), control });

  try {
    const success = await executeFn(libraryId, libraryName, control);
    recordCompletion(libraryId, libraryName, success, control.completedStages);
  } catch (err) {
    console.error(`[upgrade-queue] Task failed for ${libraryName}:`, err.message);
    recordCompletion(libraryId, libraryName, false, control.completedStages, err.message);
  } finally {
    upgradeRunningTasks.delete(libraryId);
    drainQueue();
  }
}

async function drainQueue() {
  await refreshConcurrency();
  while (upgradeTaskQueue.length > 0 && upgradeRunningTasks.size < maxConcurrency) {
    const next = upgradeTaskQueue.shift();
    startTask(next.libraryId, next.libraryName, next.executeFn);
  }
}

function recordCompletion(libraryId, libraryName, success, stageResults, errorMessage) {
  const failedStage = stageResults?.find(s => !s.success);
  upgradeCompletedTasks.unshift({
    libraryId,
    libraryName,
    success,
    time: Date.now(),
    stageResults: stageResults || [],
    errorType: failedStage?.errorType || (errorMessage ? 'unexpected' : null),
    errorMessage: errorMessage || null
  });
  if (upgradeCompletedTasks.length > MAX_COMPLETED) upgradeCompletedTasks.length = MAX_COMPLETED;
}

function cancel(libraryId) {
  const qIdx = upgradeTaskQueue.findIndex(t => t.libraryId === libraryId);
  if (qIdx !== -1) {
    upgradeTaskQueue.splice(qIdx, 1);
    return { cancelled: true, was: 'queued' };
  }

  const running = upgradeRunningTasks.get(libraryId);
  if (running) {
    running.control.aborted = true;
    const proc = upgradeActiveProcs.get(libraryId);
    if (proc && !proc.killed) {
      try { killProc(proc); } catch {}
    }
    return { cancelled: true, was: 'running' };
  }

  return { cancelled: false, was: 'not_found' };
}

function cancelAll() {
  const count = upgradeTaskQueue.length;
  const queuedIds = upgradeTaskQueue.map(t => String(t.libraryId));
  upgradeTaskQueue.length = 0;
  for (const [libraryId, task] of upgradeRunningTasks) {
    task.control.aborted = true;
    const proc = upgradeActiveProcs.get(libraryId);
    if (proc && !proc.killed) {
      try { killProc(proc); } catch {}
    }
  }
  return { queueCleared: count, runningAborted: upgradeRunningTasks.size, queuedIds };
}

function getStatus() {
  return {
    maxConcurrency,
    running: Array.from(upgradeRunningTasks.entries()).map(([id, t]) => ({
      libraryId: id,
      libraryName: t.libraryName,
      startTime: t.startTime,
      currentStageId: t.control.currentStageId,
      completedStages: t.control.completedStages
    })),
    queued: upgradeTaskQueue.map((t, i) => ({
      libraryId: t.libraryId,
      libraryName: t.libraryName,
      position: i + 1
    })),
    recentCompleted: upgradeCompletedTasks.slice(0, 20)
  };
}

module.exports = {
  enqueue, cancel, cancelAll, getStatus,
  upgradeRunningTasks, upgradeTaskQueue
};
