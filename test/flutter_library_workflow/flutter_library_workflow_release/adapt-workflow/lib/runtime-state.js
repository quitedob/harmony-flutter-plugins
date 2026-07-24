'use strict';

/**
 * Centralized in-process runtime state.
 *
 * All transient Maps / arrays that live only while the server is running
 * are held here so that every module imports from a single source of truth.
 * This makes it easy to enumerate, inspect, or reset state if needed.
 */

// Stage execution — tracks currently running child processes
const activeStages = new Map();   // "profileId:pluginId:stageId" → ChildProcess

// Run-all per-plugin control tokens
const runAllQueues = new Map();   // "profileId:pluginId" → { aborted, currentStageId, completedStages, startTime }

// Global batch execution queue
const taskQueue = [];             // [{ key, pluginId, pluginName, profileId, executeFn, resolve }]
const runningTasks = new Map();   // "profileId:pluginId" → { pluginId, pluginName, profileId, startTime, control }
const completedTasks = [];        // [{ pluginId, pluginName, profileId, success, time }]
const MAX_COMPLETED = 200;

// Mapping analysis queue (separate from plugin adaptation queue)
const mappingTaskQueue = [];           // [{ sourceId, sourceName, executeFn, resolve }]
const mappingRunningTasks = new Map(); // sourceId → { sourceName, startTime, control }
const mappingCompletedTasks = [];      // [{ sourceId, sourceName, success, time }]
const mappingActiveProcs = new Map();  // sourceId → ChildProcess (cline)

// Upgrade queue (三方库升级; independent of both plugin-adaptation and mapping queues)
const upgradeTaskQueue = [];           // [{ libraryId, libraryName, executeFn, resolve }]
const upgradeRunningTasks = new Map(); // libraryId → { libraryName, startTime, control }
const upgradeCompletedTasks = [];      // [{ libraryId, libraryName, success, time }]
const upgradeActiveProcs = new Map();  // libraryId → ChildProcess (reserved for real pipeline)

// Batch clone progress
const batchCloneState = { running: false, progress: null, profileId: null };

module.exports = {
  activeStages,
  runAllQueues,
  taskQueue,
  runningTasks,
  completedTasks,
  MAX_COMPLETED,
  mappingTaskQueue,
  mappingRunningTasks,
  mappingCompletedTasks,
  mappingActiveProcs,
  upgradeTaskQueue,
  upgradeRunningTasks,
  upgradeCompletedTasks,
  upgradeActiveProcs,
  batchCloneState
};
