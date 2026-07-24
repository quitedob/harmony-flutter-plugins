'use strict';

const { getActiveProfile, runWithProfile } = require('../profile');
const { readSettings } = require('../settings');
const {
  taskQueue, runningTasks, completedTasks, MAX_COMPLETED
} = require('../runtime-state');

let maxConcurrency = 3;

async function refreshConcurrency() {
  try {
    const settings = await readSettings();
    maxConcurrency = settings.maxAgentConcurrency || 3;
  } catch {}
}

function taskKey(pluginId, profileId) {
  return `${profileId}:${pluginId}`;
}

/**
 * @param {string} pluginId
 * @param {string} pluginName
 * @param {function} executeFn - async (pluginId, pluginName, control) => boolean
 * @returns {Promise<{ queued: boolean, position?: number }>}
 */
async function enqueue(pluginId, pluginName, executeFn, options = {}) {
  await refreshConcurrency();

  const profileId = options.profileId || getActiveProfile().id;
  const key = taskKey(pluginId, profileId);

  if (runningTasks.has(key)) {
    return { queued: false, reason: 'already_running' };
  }
  if (taskQueue.some(t => t.key === key)) {
    return { queued: false, reason: 'already_queued' };
  }

  const task = { key, pluginId, pluginName, profileId, executeFn };

  if (runningTasks.size < maxConcurrency) {
    startTask(task);
    return { queued: true, position: 0, status: 'started', profileId };
  }

  return new Promise((resolve) => {
    const position = taskQueue.length + 1;
    taskQueue.push({ ...task, resolve });
    resolve({ queued: true, position, status: 'waiting', profileId });
  });
}

async function startTask(task) {
  const { key, pluginId, pluginName, profileId, executeFn } = task;
  const control = { aborted: false, currentStageId: null, completedStages: [], startTime: Date.now() };
  runningTasks.set(key, { pluginId, pluginName, profileId, startTime: Date.now(), control });

  try {
    const success = await runWithProfile(profileId, () => executeFn(pluginId, pluginName, control));
    recordCompletion(pluginId, pluginName, profileId, success, control.completedStages);
  } catch (err) {
    console.error(`[queue] Task failed for ${pluginName}:`, err.message);
    recordCompletion(pluginId, pluginName, profileId, false, control.completedStages, err.message);
  } finally {
    runningTasks.delete(key);
    drainQueue();
  }
}

async function drainQueue() {
  await refreshConcurrency();
  while (taskQueue.length > 0 && runningTasks.size < maxConcurrency) {
    const next = taskQueue.shift();
    startTask(next);
  }
}

function recordCompletion(pluginId, pluginName, profileId, success, stageResults, errorMessage) {
  const failedStage = stageResults?.find(s => !s.success);
  completedTasks.unshift({
    pluginId,
    pluginName,
    profileId,
    success,
    time: Date.now(),
    stageResults: stageResults || [],
    errorType: failedStage?.errorType || (errorMessage ? 'unexpected' : null),
    errorMessage: errorMessage || null
  });
  if (completedTasks.length > MAX_COMPLETED) completedTasks.length = MAX_COMPLETED;
}

function cancel(pluginId, options = {}) {
  const profileId = options.profileId || getActiveProfile().id;
  const key = taskKey(pluginId, profileId);
  const qIdx = taskQueue.findIndex(t => t.key === key);
  if (qIdx !== -1) {
    taskQueue.splice(qIdx, 1);
    return { cancelled: true, was: 'queued' };
  }

  const running = runningTasks.get(key);
  if (running) {
    running.control.aborted = true;
    return { cancelled: true, was: 'running' };
  }

  return { cancelled: false, was: 'not_found' };
}

function cancelAll() {
  const count = taskQueue.length;
  taskQueue.length = 0;
  for (const [, task] of runningTasks) {
    task.control.aborted = true;
  }
  return { queueCleared: count, runningAborted: runningTasks.size };
}

function getStatus() {
  return {
    maxConcurrency,
    running: Array.from(runningTasks.values()).map((t) => ({
      pluginId: t.pluginId,
      pluginName: t.pluginName,
      profileId: t.profileId,
      startTime: t.startTime,
      currentStageId: t.control.currentStageId,
      completedStages: t.control.completedStages
    })),
    queued: taskQueue.map((t, i) => ({
      pluginId: t.pluginId,
      pluginName: t.pluginName,
      profileId: t.profileId,
      position: i + 1
    })),
    recentCompleted: completedTasks.slice(0, 20)
  };
}

module.exports = {
  enqueue, cancel, cancelAll, getStatus,
  runningTasks, taskQueue
};
