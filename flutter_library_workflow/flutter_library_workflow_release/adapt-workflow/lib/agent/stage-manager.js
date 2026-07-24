const fs = require('fs').promises;
const path = require('path');
const { getStages, getFilteredStages, getStageById } = require('../stages');
const { getActiveProfile } = require('../profile');
const { getAdaptationDir, getLogsDir, getStageLogPath, getLatestLogPath, getMissingAdditionalReportFiles, isAndroidSdkStageOutputStale } = require('./helpers');
const { activeStages, runAllQueues } = require('../runtime-state');

async function pathExists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function parseStageTimings(logPath) {
  try {
    const content = await fs.readFile(logPath, 'utf8');
    const startMatch = content.match(/^时间: (.+)$/m);
    const endMatch = content.match(/^结束时间: (.+)$/m);
    const startTime = startMatch ? new Date(startMatch[1].trim()).getTime() : null;
    const endTime = endMatch ? new Date(endMatch[1].trim()).getTime() : null;
    const duration = (startTime && endTime && !isNaN(startTime) && !isNaN(endTime))
      ? endTime - startTime
      : null;
    return {
      startTime: (startTime && !isNaN(startTime)) ? startTime : null,
      endTime: (endTime && !isNaN(endTime)) ? endTime : null,
      duration
    };
  } catch {
    return { startTime: null, endTime: null, duration: null };
  }
}

function stageKey(pluginId, stageId, profileId) {
  return `${profileId || getActiveProfile().id}:${pluginId}:${stageId}`;
}

function stageKeyPrefix(pluginId, profileId) {
  return `${profileId || getActiveProfile().id}:${pluginId}:`;
}

function runAllKey(pluginId, profileId) {
  return `${profileId || getActiveProfile().id}:${pluginId}`;
}

/**
 * Detect stage status with nuanced intermediate states.
 *
 * Possible return values:
 *   idle        — no log, no output, never ran
 *   running     — active child process exists
 *   pending     — 产物在磁盘上但判定为「待重跑」（如 android-sdk-ohos：13 比 15 新时步骤 4）
 *   success     — output file present，且 additionalReports 齐全
 *   failed      — log shows failure, or process exited without producing output
 *   interrupted — log exists but has no footer (process may have been killed mid-run)
 *   unknown     — log exists but cannot determine outcome
 */
async function detectStageStatus(repoPath, stageId) {
  const stage = getStageById(stageId);
  if (!stage) return 'unknown';

  for (const [k] of activeStages) {
    if (k.endsWith(`:${stageId}`)) {
      const proc = activeStages.get(k);
      if (proc?._repoPath === repoPath) return 'running';
    }
  }

  const adaptDir = getAdaptationDir(repoPath);
  const outputPath = path.join(adaptDir, stage.outputFile);
  if (await pathExists(outputPath)) {
    if (stage.script) {
      const scriptStatus = await detectScriptOutputStatus(outputPath);
      if (scriptStatus) return scriptStatus;
    }
    // 检查 coding-library 的 build_status 字段（编译失败时状态应为 failed）
    if (stageId === 'coding-library') {
      try {
        const content = await fs.readFile(outputPath, 'utf8');
        const data = JSON.parse(content);
        if (data?.build_status === 'fail') return 'failed';
      } catch {}
    }
    if (isAndroidSdkStageOutputStale(adaptDir, stageId)) {
      return 'pending';
    }
    const missing = getMissingAdditionalReportFiles(stage, adaptDir);
    if (missing.length > 0) return 'failed';
    return 'success';
  }
  if (stage.legacyOutputFile) {
    const legacyOutputPath = path.join(adaptDir, stage.legacyOutputFile);
    if (await pathExists(legacyOutputPath)) {
      if (isAndroidSdkStageOutputStale(adaptDir, stageId)) {
        return 'pending';
      }
      const missing = getMissingAdditionalReportFiles(stage, adaptDir);
      if (missing.length > 0) return 'failed';
      return 'success';
    }
  }

  const logPath = getLatestLogPath(repoPath, stageId);
  const legacyLogPath = stage.legacyId ? getLatestLogPath(repoPath, stage.legacyId) : null;
  const effectiveLogPath = logPath || legacyLogPath;
  if (effectiveLogPath) {
    try {
      const content = await fs.readFile(effectiveLogPath, 'utf8');
      const hasHeader = content.includes('阶段执行日志');
      const hasFooter = content.includes('退出码:');
      const hasManualKill = content.includes('[已手动终止]');
      const hasWatchdogTimeout = content.includes('[watchdog]');
      
      if (hasFooter) return 'failed';
      if (hasManualKill || hasWatchdogTimeout) return 'failed'; // 手动终止或超时终止都标记为失败
      if (hasHeader && !hasFooter) return 'interrupted';
    } catch {}
    return 'unknown';
  }

  return 'idle';
}

async function detectScriptOutputStatus(outputPath) {
  try {
    const content = await fs.readFile(outputPath, 'utf8');
    const data = JSON.parse(content);
    const status = String(data?.status || '').toLowerCase();
    if (!status) return null;
    if (['pass', 'passed', 'success', 'succeeded'].includes(status)) return 'success';
    if (['partial', 'fail', 'failed', 'error', 'skipped', 'skip'].includes(status)) return 'failed';
  } catch {}
  return null;
}

async function getAllStageStatuses(repoPath, pluginId, settings) {
  const stages = settings ? getFilteredStages(settings) : getStages();

  const results = await Promise.all(stages.map(async (stage) => {
    const sk = stageKey(pluginId, stage.id);
    const isRunning = activeStages.has(sk);
    const status = isRunning ? 'running' : await detectStageStatus(repoPath, stage.id);

    const adaptDir = getAdaptationDir(repoPath);

    const logPath = getLatestLogPath(repoPath, stage.id);
    const legacyLogPath = stage.legacyId ? getLatestLogPath(repoPath, stage.legacyId) : null;
    const effectiveLogExists = !!logPath || !!legacyLogPath;
    const effectiveLogPath = logPath || legacyLogPath;

    const outputPath = path.join(adaptDir, stage.outputFile);
    const legacyOutputPath = stage.legacyOutputFile ? path.join(adaptDir, stage.legacyOutputFile) : null;
    const hasOutput = await pathExists(outputPath) || (legacyOutputPath && await pathExists(legacyOutputPath));

    const reportPath = stage.outputReport ? path.join(adaptDir, stage.outputReport) : null;
    const legacyReportPath = stage.legacyOutputReport ? path.join(adaptDir, stage.legacyOutputReport) : null;
    const hasReport = (reportPath && await pathExists(reportPath)) || (legacyReportPath && await pathExists(legacyReportPath));

    const timings = effectiveLogExists ? await parseStageTimings(effectiveLogPath) : { startTime: null, endTime: null, duration: null };

    return {
      id: stage.id,
      name: stage.name,
      description: stage.description,
      status,
      hasLog: !!effectiveLogExists,
      hasOutput: !!hasOutput,
      hasReport: !!hasReport,
      startTime: timings.startTime,
      endTime: timings.endTime,
      duration: timings.duration
    };
  }));

  return results;
}

module.exports = {
  activeStages,
  runAllQueues,
  stageKey,
  stageKeyPrefix,
  runAllKey,
  detectStageStatus,
  getAllStageStatuses
};
