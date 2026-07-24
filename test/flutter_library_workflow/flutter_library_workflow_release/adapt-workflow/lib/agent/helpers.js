const fsSync = require('fs');
const path = require('path');
const { getActiveProfile } = require('../profile');

const DEFAULT_HEARTBEAT_INTERVAL = 15000;

function setupSSE(res) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
}

function sendSSE(res, data) {
  res.write(`data: ${JSON.stringify(data)}\n\n`);
}

/**
 * Setup SSE with periodic heartbeat to prevent idle timeout disconnects.
 * Returns a cleanup function that must be called when the response ends.
 */
function setupSSEWithHeartbeat(res, req, intervalMs) {
  setupSSE(res);
  const interval = intervalMs || DEFAULT_HEARTBEAT_INTERVAL;
  const heartbeat = setInterval(() => {
    try { res.write(':heartbeat\n\n'); } catch { clearInterval(heartbeat); }
  }, interval);
  const cleanup = () => clearInterval(heartbeat);
  req.on('close', cleanup);
  return cleanup;
}

function ensureDir(dirPath) {
  if (!fsSync.existsSync(dirPath)) {
    fsSync.mkdirSync(dirPath, { recursive: true });
  }
}

function getAdaptationDir(repoPath) {
  return path.join(repoPath, getActiveProfile().ADAPTATION_DIR);
}

function getLogsDir(repoPath) {
  return path.join(getAdaptationDir(repoPath), 'logs');
}

function getStageLogPath(repoPath, stageId) {
  return path.join(getLogsDir(repoPath), `${stageId}.log`);
}

/**
 * Get next log file path with auto-increment retry number.
 * If base log doesn't exist, use base name.
 * If base log exists, use retry_N format.
 */
function getNextLogPath(repoPath, stageId) {
  const logsDir = getLogsDir(repoPath);
  ensureDir(logsDir);
  
  const baseLog = path.join(logsDir, `${stageId}.log`);
  
  if (!fsSync.existsSync(baseLog)) {
    return baseLog;
  }
  
  const files = fsSync.readdirSync(logsDir);
  const retryPattern = new RegExp(`^${stageId}_retry_(\\d+)\\.log$`);
  const retryNumbers = files
    .filter(f => retryPattern.test(f))
    .map(f => parseInt(f.match(retryPattern)[1], 10))
    .filter(n => !isNaN(n) && n > 0);
  
  const nextRetryNum = retryNumbers.length > 0 
    ? Math.max(...retryNumbers) + 1 
    : 1;
  
  return path.join(logsDir, `${stageId}_retry_${nextRetryNum}.log`);
}

/**
 * Get latest log file path (prefer retry_N, fallback to base log).
 * Returns null if no log exists.
 */
function getLatestLogPath(repoPath, stageId) {
  const logsDir = getLogsDir(repoPath);
  
  if (!fsSync.existsSync(logsDir)) {
    return null;
  }
  
  const files = fsSync.readdirSync(logsDir);
  const retryPattern = new RegExp(`^${stageId}_retry_(\\d+)\\.log$`);
  const retryFiles = files
    .filter(f => retryPattern.test(f))
    .map(f => ({
      file: f,
      num: parseInt(f.match(retryPattern)[1], 10)
    }))
    .filter(item => !isNaN(item.num) && item.num > 0)
    .sort((a, b) => b.num - a.num);
  
  if (retryFiles.length > 0) {
    return path.join(logsDir, retryFiles[0].file);
  }
  
  const baseLog = path.join(logsDir, `${stageId}.log`);
  if (fsSync.existsSync(baseLog)) {
    return baseLog;
  }
  
  return null;
}

function getStageOutputFiles() {
  return getActiveProfile().stageOutputFiles;
}

function clearOutputsFromStage(adaptDir, stageId) {
  const outputFiles = getStageOutputFiles();
  const stage = outputFiles.find(s => s.stageId === stageId);
  if (!stage) return;
  for (const name of stage.files) {
    const fp = path.join(adaptDir, name);
    if (fsSync.existsSync(fp)) {
      try {
        fsSync.unlinkSync(fp);
      } catch (e) {
        console.error(`清除产物失败 ${fp}:`, e.message);
      }
    }
  }
}

/**
 * Profile STAGES 中 additionalReports（如 PRD）若声明则必须与主 JSON 一并存在，否则阶段视为未完成。
 * @returns {string[]} 缺失的相对 adaptDir 的文件名
 */
function getMissingAdditionalReportFiles(stage, adaptDir) {
  if (!stage?.additionalReports || !Array.isArray(stage.additionalReports)) return [];
  const missing = [];
  for (const r of stage.additionalReports) {
    if (!r?.file) continue;
    const fp = path.join(adaptDir, r.file);
    if (!fsSync.existsSync(fp)) missing.push(r.file);
  }
  return missing;
}

/**
 * Android SDK 流程中，若上游阶段产物比本阶段产物更新，本阶段应重新执行，
 * 避免 run-graph 读取旧产物后跳过后续检查。
 */
function isAndroidSdkStageOutputStale(adaptDir, stageId) {
  const profileId = getActiveProfile().id;
  const profilePairs = {
    'android-sdk-ohos': {
      'sdk-har-demo': ['03-implementation.json', '04-har-demo.json'],
      'sdk-evaluation': ['04-har-demo.json', '05-evaluation.json']
    },
    'android-sdk-ohos-fast': {
      'sdk-validation': ['02-implementation-report.md', '03-validation-report.md'],
      'sdk-quality-review': ['03-validation-report.md', '04-quality-review-report.md'],
      'sdk-quality-fix': ['04-quality-review-report.md', '05-quality-fix-report.md']
    }
  };
  const pairs = profilePairs[profileId];
  if (!pairs) return false;
  const pair = pairs[stageId];
  if (!pair) return false;
  const [upstreamName, selfName] = pair;
  const upstreamPath = path.join(adaptDir, upstreamName);
  const selfPath = path.join(adaptDir, selfName);
  if (!fsSync.existsSync(upstreamPath) || !fsSync.existsSync(selfPath)) return false;
  try {
    return fsSync.statSync(upstreamPath).mtimeMs > fsSync.statSync(selfPath).mtimeMs;
  } catch {
    return false;
  }
}

module.exports = {
  setupSSE,
  sendSSE,
  setupSSEWithHeartbeat,
  ensureDir,
  getAdaptationDir,
  getLogsDir,
  getStageLogPath,
  getNextLogPath,
  getLatestLogPath,
  getStageOutputFiles,
  clearOutputsFromStage,
  getMissingAdditionalReportFiles,
  isAndroidSdkStageOutputStale
};
