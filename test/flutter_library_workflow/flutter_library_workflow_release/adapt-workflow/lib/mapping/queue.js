'use strict';

const { readSettings } = require('../settings');
const {
  mappingTaskQueue, mappingRunningTasks, mappingCompletedTasks, MAX_COMPLETED
} = require('../runtime-state');
const { mappingActiveProcs } = require('../runtime-state');
const { killProc } = require('../platform');

let maxConcurrency = 3;

async function refreshConcurrency() {
  try {
    const settings = await readSettings();
    // mapping-analysis has its own queue concurrency; default is serial (1).
    const v = settings.mappingMaxConcurrency;
    maxConcurrency = (typeof v === 'number' && Number.isFinite(v) && v >= 1)
      ? Math.floor(v)
      : 1;
  } catch {}
}

/**
 * @param {string} sourceId
 * @param {string} sourceName
 * @param {function} executeFn - async (sourceId, sourceName, control) => boolean
 * @returns {Promise<{ queued: boolean, position?: number, status?: string, reason?: string }>}
 */
async function enqueue(sourceId, sourceName, executeFn) {
  await refreshConcurrency();

  if (mappingRunningTasks.has(sourceId)) {
    return { queued: false, reason: 'already_running' };
  }
  if (mappingTaskQueue.some(t => t.sourceId === sourceId)) {
    return { queued: false, reason: 'already_queued' };
  }

  if (mappingRunningTasks.size < maxConcurrency) {
    startTask(sourceId, sourceName, executeFn);
    return { queued: true, position: 0, status: 'started' };
  }

  return new Promise((resolve) => {
    const position = mappingTaskQueue.length + 1;
    mappingTaskQueue.push({ sourceId, sourceName, executeFn, resolve });
    resolve({ queued: true, position, status: 'waiting' });
  });
}

async function startTask(sourceId, sourceName, executeFn) {
  const control = { aborted: false, currentStageId: null, completedStages: [], startTime: Date.now() };
  mappingRunningTasks.set(sourceId, { sourceName, startTime: Date.now(), control });

  try {
    const success = await executeFn(sourceId, sourceName, control);
    recordCompletion(sourceId, sourceName, success, control.completedStages);
  } catch (err) {
    console.error(`[mapping-queue] Task failed for ${sourceName}:`, err.message);
    recordCompletion(sourceId, sourceName, false, control.completedStages, err.message);
  } finally {
    mappingRunningTasks.delete(sourceId);
    drainQueue();
  }
}

async function drainQueue() {
  await refreshConcurrency();
  while (mappingTaskQueue.length > 0 && mappingRunningTasks.size < maxConcurrency) {
    const next = mappingTaskQueue.shift();
    startTask(next.sourceId, next.sourceName, next.executeFn);
  }
}

function recordCompletion(sourceId, sourceName, success, stageResults, errorMessage) {
  const failedStage = stageResults?.find(s => !s.success);
  mappingCompletedTasks.unshift({
    sourceId,
    sourceName,
    success,
    time: Date.now(),
    stageResults: stageResults || [],
    errorType: failedStage?.errorType || (errorMessage ? 'unexpected' : null),
    errorMessage: errorMessage || null
  });
  if (mappingCompletedTasks.length > MAX_COMPLETED) mappingCompletedTasks.length = MAX_COMPLETED;
}

function cancel(sourceId) {
  const qIdx = mappingTaskQueue.findIndex(t => t.sourceId === sourceId);
  if (qIdx !== -1) {
    mappingTaskQueue.splice(qIdx, 1);
    return { cancelled: true, was: 'queued' };
  }

  const running = mappingRunningTasks.get(sourceId);
  if (running) {
    running.control.aborted = true;
    const proc = mappingActiveProcs.get(sourceId);
    if (proc && !proc.killed) {
      try { killProc(proc); } catch {}
    }
    return { cancelled: true, was: 'running' };
  }

  return { cancelled: false, was: 'not_found' };
}

function cancelAll() {
  const count = mappingTaskQueue.length;
  const queuedIds = mappingTaskQueue.map(t => String(t.sourceId));
  mappingTaskQueue.length = 0;
  for (const [sourceId, task] of mappingRunningTasks) {
    task.control.aborted = true;
    const proc = mappingActiveProcs.get(sourceId);
    if (proc && !proc.killed) {
      try { killProc(proc); } catch {}
    }
  }
  return { queueCleared: count, runningAborted: mappingRunningTasks.size, queuedIds };
}

function getStatus() {
  return {
    maxConcurrency,
    running: Array.from(mappingRunningTasks.entries()).map(([id, t]) => ({
      sourceId: id,
      sourceName: t.sourceName,
      startTime: t.startTime,
      currentStageId: t.control.currentStageId,
      completedStages: t.control.completedStages
    })),
    queued: mappingTaskQueue.map((t, i) => ({
      sourceId: t.sourceId,
      sourceName: t.sourceName,
      position: i + 1
    })),
    recentCompleted: mappingCompletedTasks.slice(0, 20)
  };
}

module.exports = {
  enqueue, cancel, cancelAll, getStatus,
  mappingRunningTasks, mappingTaskQueue
};

