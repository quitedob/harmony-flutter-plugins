const express = require('express');
const fsSync = require('fs');
const fs = require('fs').promises;
const path = require('path');
const { readData } = require('../lib/data');
const { stripAnsi } = require('../lib/utils');
const { getReposDir } = require('../lib/config');
const { getStages, getFilteredStages, getStageById, resolveBackend } = require('../lib/stages');
const { readSettings } = require('../lib/settings');
const { getActiveProfile, runWithProfile } = require('../lib/profile');
const { killProc } = require('../lib/platform');
const { setupSSE, sendSSE, setupSSEWithHeartbeat, ensureDir, getAdaptationDir, getLogsDir, getStageLogPath, getLatestLogPath } = require('../lib/agent/helpers');
const { activeStages, runAllQueues, stageKey, stageKeyPrefix, runAllKey, detectStageStatus, getAllStageStatuses } = require('../lib/agent/stage-manager');
const { runStageWithSSE, executeStageInternal, executeStageWithRetry } = require('../lib/agent/executor');
const { queryTokenStats, collectAndSaveTokenStats, dbExists } = require('../lib/agent/token-stats-db');
const agentQueue = require('../lib/agent/queue');
const { findPluginOrFail, findPluginWithRepo } = require('../lib/plugin-lookup');
const { asyncHandler, AppError } = require('../lib/errors');
const { getReachableStageIds } = require('../lib/agent/graph-executor');
const { resolvePluginWorkRoot } = require('../lib/plugin-work-root');

// Upgrade-workflow integration (detail page reuse — see resolveWorkEntity).
const { loadUpgradeLibraryPlugin } = require('../lib/upgrade/detail-adapter');
const { ensureUpgradeManifest } = require('../lib/upgrade/paths');
const { enqueueUpgradeRun } = require('../lib/upgrade/runner');
const upgradeQueue = require('../lib/upgrade/queue');

const router = express.Router();

// ── Entity resolution: adaptation plugin OR upgrade library ──
//
// The detail page (frontend/detail.js) is reused unchanged for the upgrade
// workflow: the upgrade list links to /detail.html?id=<libraryId>&profileId=<upgrade profile>,
// so every /api/plugins/:id/... request arrives pinned to an upgrade profile.
// We detect that via getActiveProfile().workflow === 'upgrade' and resolve the
// id against the upgrade library store instead of the plugin store, returning a
// plugin-shaped object whose `.name` is the on-disk repo dir name (so the shared
// executor's cloneRoot lands on the library's repo dir). One resolver, both flows.

async function resolveWorkEntity(id) {
  const profile = getActiveProfile();
  if (profile.workflow === 'upgrade') {
    const u = await loadUpgradeLibraryPlugin(id);
    if (!u) throw new AppError('library 不存在', 404);
    return {
      plugin: u.plugin,
      library: u.library,
      workRepoPath: u.repoDir,
      repoExists: fsSync.existsSync(u.repoDir),
      isUpgrade: true
    };
  }
  const { plugin } = await findPluginOrFail(id);
  const cloneRoot = path.join(getReposDir(), plugin.name);
  const repoExists = fsSync.existsSync(cloneRoot);
  const workRepoPath = repoExists ? resolvePluginWorkRoot(cloneRoot, plugin) : cloneRoot;
  return { plugin, library: null, workRepoPath, repoExists, isUpgrade: false };
}

// ── 插件详情 ──

router.get('/:id/detail', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { plugin, library, workRepoPath, repoExists, isUpgrade } = await resolveWorkEntity(id);

  const profile = getActiveProfile();
  const settings = await readSettings();
  const allStages = getFilteredStages(settings);

  const stages = repoExists ? await getAllStageStatuses(workRepoPath, id, settings) : allStages.map(s => ({
    id: s.id, name: s.name, description: s.description,
    status: 'idle', hasLog: false, hasOutput: false
  }));

  let adaptation = null;
  let analysis = null;
  let planning = null;
  let availableReports = [];
  if (repoExists) {
    const adaptDir = getAdaptationDir(workRepoPath);

    if (isUpgrade) {
      // Upgrade flow uses Markdown reports only; no JSON overview card.
      analysis = null;
      planning = null;
      adaptation = null;
    } else {
      const detail = await profile.extractDetailFields(adaptDir);
      analysis = detail.analysis;
      planning = detail.planning;

      if (detail.adaptation) {
        let lastCompleted = null;
        let hasFailed = false;
        let completedCount = 0;
        for (const s of stages) {
          if (s.status === 'success') { completedCount++; lastCompleted = s.id; }
          if (s.status === 'failed') hasFailed = true;
        }
        let overallStatus = 'pending';
        if (detail.summaryData) overallStatus = detail.summaryData.status || 'success';
        else if (hasFailed) overallStatus = 'failed';
        else if (completedCount > 0) overallStatus = 'in_progress';
        adaptation = {
          ...detail.adaptation,
          overall_status: overallStatus,
          current_stage: lastCompleted
        };
      }
    }

    for (const stage of allStages) {
      if (stage.outputReport) {
        const reportPath = path.join(adaptDir, stage.outputReport);
        const legacyReportPath = stage.legacyOutputReport ? path.join(adaptDir, stage.legacyOutputReport) : null;
        const effectiveReport = fsSync.existsSync(reportPath) ? stage.outputReport
          : (legacyReportPath && fsSync.existsSync(legacyReportPath) ? stage.legacyOutputReport : null);
        if (effectiveReport) {
          availableReports.push({ stageId: stage.id, name: stage.name, file: effectiveReport });
        }
      }
      if (stage.additionalReports) {
        for (const extra of stage.additionalReports) {
          const extraPath = path.join(adaptDir, extra.file);
          if (fsSync.existsSync(extraPath)) {
            availableReports.push({ stageId: stage.id, name: `${stage.name} - ${extra.name}`, file: extra.file });
          }
        }
      }
    }
    const tokenReportPath = path.join(adaptDir, 'token-stats-report.md');
    if (fsSync.existsSync(tokenReportPath)) {
      availableReports.push({ stageId: 'token-stats', name: 'Token 统计', file: 'token-stats-report.md' });
    }
  }

  const stageBackends = {};
  for (const s of allStages) {
    stageBackends[s.id] = resolveBackend(s.id, settings);
  }

  res.json({
    ...plugin,
    // plugin.name is the on-disk repo dir key (executor cloneRoot); for display
    // (dashboard title) prefer the clean library name on the upgrade flow.
    ...(isUpgrade && library && library.name ? { name: library.name } : {}),
    repoExists,
    stages,
    adaptation,
    analysis,
    planning,
    availableReports,
    backendConfig: {
      global: settings.agentBackend || 'opencode',
      stages: stageBackends
    }
  });
}));

// ── 阶段执行（SSE 流） ──

router.get('/:id/stages/:stageId/run', async (req, res) => {
  try {
    const { id, stageId } = req.params;
    const stage = getStageById(stageId);

    if (!stage) {
      setupSSE(res);
      sendSSE(res, { type: 'error', error: `未知阶段: ${stageId}` });
      return res.end();
    }

    const { plugin, workRepoPath, repoExists, isUpgrade, library } = await resolveWorkEntity(id);

    if (!repoExists) {
      setupSSE(res);
      sendSSE(res, { type: 'error', error: '仓库尚未克隆，请先执行 Clone 操作' });
      return res.end();
    }

    // Edge-disable reachability gate is adaptation-only (upgrade is a fixed
    // linear chain with no user-toggled edges; its /run skips this check).
    if (!isUpgrade) {
      const reachable = getReachableStageIds(workRepoPath);
      if (!reachable.has(stageId)) {
        setupSSE(res);
        sendSSE(res, {
          type: 'error',
          error: '当前边断开配置下，该阶段无法从流水线起点到达。请在详情页恢复相关边后再执行，或使用「全部执行」由引擎按图调度。'
        });
        return res.end();
      }
    }

    const sk = stageKey(id, stageId);
    if (activeStages.has(sk)) {
      setupSSE(res);
      sendSSE(res, { type: 'error', error: `阶段 ${stage.name} 正在运行中` });
      return res.end();
    }

    // Upgrade Agent prompt reads library context from .upgrade-adaptation/upgrade-manifest.json.
    if (isUpgrade) {
      await ensureUpgradeManifest(workRepoPath, library);
    }

    const cleanupHeartbeat = setupSSEWithHeartbeat(res, req);

    let sseConnected = true;
    req.on('close', () => { sseConnected = false; });

    function safeSend(data) {
      if (!sseConnected) return;
      try { sendSSE(res, data); } catch { sseConnected = false; }
    }
    function safeEnd() {
      cleanupHeartbeat();
      try { res.end(); } catch {}
    }

    await runStageWithSSE(id, plugin, stageId, safeSend, safeEnd);
  } catch (error) {
    if (!res.headersSent) setupSSE(res);
    try { sendSSE(res, { type: 'error', error: error.message }); } catch {}
    try { res.end(); } catch {}
  }
});

// ── 阶段状态查询（供前端断线后确认任务是否仍在运行）──

router.get('/:id/stages/:stageId/status', asyncHandler(async (req, res) => {
  const { id, stageId } = req.params;
  const { workRepoPath } = await resolveWorkEntity(id);
  const sk = stageKey(id, stageId);
  const isActive = activeStages.has(sk);
  const status = isActive ? 'running' : await detectStageStatus(workRepoPath, stageId);
  res.json({ stageId, status, processAlive: isActive });
}));

// ── 终止阶段 ──

router.post('/:id/stages/:stageId/kill', asyncHandler(async (req, res) => {
  const { id, stageId } = req.params;
  const sk = stageKey(id, stageId);
  const proc = activeStages.get(sk);

  if (proc && !proc.killed) {
    killProc(proc, 'manual_stop');
    activeStages.delete(sk);
    res.json({ success: true, message: `阶段 ${stageId} 已终止` });
  } else {
    res.json({ success: false, message: '没有正在运行的进程' });
  }
}));

// ── 阶段日志 ──

router.get('/:id/stages/:stageId/log', asyncHandler(async (req, res) => {
  const { id, stageId } = req.params;
  const { workRepoPath } = await resolveWorkEntity(id);
  const stage = getStageById(stageId);

  let logPath = getLatestLogPath(workRepoPath, stageId);
  if (!logPath && stage?.legacyId) {
    logPath = getLatestLogPath(workRepoPath, stage.legacyId);
  }
  if (!logPath || !fsSync.existsSync(logPath)) throw new AppError('日志文件不存在', 404);

  const logContent = await fs.readFile(logPath, 'utf8');
  res.type('text/plain').send(logContent);
}));

// ── 阶段日志流（SSE tail，用于重进详情页）──

router.get('/:id/stages/:stageId/log-stream', async (req, res) => {
  try {
    const { id, stageId } = req.params;
    const { workRepoPath } = await resolveWorkEntity(id);
    const stage = getStageById(stageId);

    let logPath = getLatestLogPath(workRepoPath, stageId);
    if (!logPath && stage?.legacyId) {
      logPath = getLatestLogPath(workRepoPath, stage.legacyId);
    }
    if (!logPath || !fsSync.existsSync(logPath)) return res.status(404).json({ error: '日志文件不存在' });

    const cleanupHeartbeat = setupSSEWithHeartbeat(res, req);

    let lastSentLength = 0;
    let closed = false;

    function sendChunk(content) {
      if (closed) return;
      const cleaned = stripAnsi(content);
      if (cleaned.trim()) {
        try { sendSSE(res, { type: 'stdout', data: cleaned, append: true }); } catch { closed = true; }
      }
    }

    function readAndSendNew() {
      if (closed) return;
      try {
        const content = fsSync.readFileSync(logPath, 'utf8');
        if (content.length > lastSentLength) {
          sendChunk(content.slice(lastSentLength));
          lastSentLength = content.length;
        }
      } catch {}
    }

    try {
      const initial = fsSync.readFileSync(logPath, 'utf8');
      lastSentLength = initial.length;
      if (initial.trim()) sendChunk(initial);
    } catch {}

    const sk = stageKey(id, stageId);
    const pollInterval = setInterval(() => {
      if (closed) return;
      readAndSendNew();
      if (!activeStages.has(sk)) {
        clearInterval(pollInterval);
        closed = true;
        cleanupHeartbeat();
        try { sendSSE(res, { type: 'exit', status: 'done' }); res.end(); } catch {}
      }
    }, 500);

    req.on('close', () => { closed = true; clearInterval(pollInterval); cleanupHeartbeat(); });
  } catch (error) {
    if (!res.headersSent) res.status(500).json({ error: error.message });
  }
});

// ── 阶段报告 ──

router.get('/:id/stages/:stageId/report', asyncHandler(async (req, res) => {
  const { id, stageId } = req.params;
  const stage = getStageById(stageId);
  const requestedFile = req.query.file;

  let reportFile = stage?.outputReport;
  if (requestedFile && stage?.additionalReports) {
    const match = stage.additionalReports.find(r => r.file === requestedFile);
    if (match) reportFile = match.file;
  }

  if (!stage || !reportFile) throw new AppError('该阶段无报告', 404);

  const { workRepoPath } = await resolveWorkEntity(id);

  let reportPath = path.join(getAdaptationDir(workRepoPath), reportFile);
  if (!fsSync.existsSync(reportPath) && stage?.legacyOutputReport) {
    reportPath = path.join(getAdaptationDir(workRepoPath), stage.legacyOutputReport);
  }
  if (!fsSync.existsSync(reportPath)) throw new AppError('报告文件不存在', 404);

  const content = await fs.readFile(reportPath, 'utf8');
  res.type('text/markdown').send(content);
}));

// ── 阶段产物 ──

router.get('/:id/stages/:stageId/output', asyncHandler(async (req, res) => {
  const { id, stageId } = req.params;
  const stage = getStageById(stageId);
  if (!stage) throw new AppError('未知阶段', 404);

  const { workRepoPath } = await resolveWorkEntity(id);

  let outputPath = path.join(getAdaptationDir(workRepoPath), stage.outputFile);
  if (!fsSync.existsSync(outputPath) && stage.legacyOutputFile) {
    outputPath = path.join(getAdaptationDir(workRepoPath), stage.legacyOutputFile);
  }
  if (!fsSync.existsSync(outputPath)) throw new AppError('产物文件不存在', 404);

  const content = await fs.readFile(outputPath, 'utf8');
  try { res.json(JSON.parse(content)); } catch { res.type('text/plain').send(content); }
}));

// ── 全部执行（入队，统一受 maxAgentConcurrency 控制） ──

router.post('/:id/run-all', asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (getActiveProfile().workflow === 'upgrade') {
    const { library } = await resolveWorkEntity(id);
    return res.json(await enqueueUpgradeRun(id, library));
  }
  const { plugin, workRepoPath } = await findPluginWithRepo(id);
  const profileId = getActiveProfile().id;

  const executeFn = async (pluginId, pluginName, control) => {
    const execSettings = await readSettings();
    const allStgs = getFilteredStages(execSettings);
    const stgStatuses = await Promise.all(
      allStgs.map(async s => ({ stage: s, status: await detectStageStatus(workRepoPath, s.id) }))
    );
    const reachable = getReachableStageIds(workRepoPath, execSettings);
    const stagesToRun = stgStatuses
      .filter(s => s.status !== 'success')
      .map(s => s.stage)
      .filter(s => reachable.has(s.id));
    if (stagesToRun.length === 0) return true;

    const retryOpts = execSettings.stageRetry;
    const useGraphExecutor = execSettings.useGraphExecutor !== false;

    runAllQueues.set(runAllKey(pluginId, profileId), control);
    try {
      if (useGraphExecutor) {
        console.log(`[run-all] Using graph executor for ${pluginName}`);
        const { GraphExecutor } = require('../lib/agent/graph-executor');
        const executor = new GraphExecutor();
        const result = await executor.execute(pluginId, plugin, workRepoPath, execSettings);
        control.completedStages = result.completedStages;
      } else {
        console.log(`[run-all] Using linear executor for ${pluginName}`);
        for (const stage of stagesToRun) {
          if (control.aborted) break;
          control.currentStageId = stage.id;
          const result = await executeStageWithRetry(pluginId, plugin, stage.id, retryOpts);
          control.completedStages.push({
            id: stage.id,
            success: result.success,
            attempts: result.attempts || 1,
            errorType: result.errorType || null
          });
          if (!result.success) break;
        }
      }
    } catch (err) {
      console.error(`[run-all] Unexpected error for ${pluginName}: ${err.message}`);
      control.completedStages.push({ id: control.currentStageId, success: false, errorType: 'unexpected' });
    } finally {
      runAllQueues.delete(runAllKey(pluginId, profileId));
    }
    return control.completedStages.every(s => s.success);
  };

  const enqueueResult = await agentQueue.enqueue(id, plugin.name, executeFn, { profileId });
  
  res.json({
    success: enqueueResult.queued !== false,
    ...enqueueResult,
    queueStatus: agentQueue.getStatus()
  });
}));

// ── 图式执行 ──

router.post('/:id/run-graph', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { plugin, workRepoPath } = await findPluginWithRepo(id);
  const profileId = getActiveProfile().id;
  const scopedRunAllKey = runAllKey(id, profileId);

  if (runAllQueues.has(scopedRunAllKey)) throw new AppError('已有执行任务在运行中', 409);

  const settings = await readSettings();
  const control = { aborted: false, currentStageId: null, completedStages: [], startTime: Date.now() };
  runAllQueues.set(scopedRunAllKey, control);
  res.json({ success: true, message: '图式执行已启动' });

  (async () => {
    try {
      await runWithProfile(profileId, async () => {
        const { GraphExecutor } = require('../lib/agent/graph-executor');
        const executor = new GraphExecutor();
        const result = await executor.execute(id, plugin, workRepoPath, settings);
        control.completedStages = result.completedStages;
      });
    } catch (err) {
      console.error(`[run-graph] Unexpected error for ${plugin.name}: ${err.message}`);
      control.completedStages.push({ id: control.currentStageId, success: false, errorType: 'unexpected', error: err.message });
    } finally {
      runAllQueues.delete(scopedRunAllKey);
    }
  })();
}));

// ── 终止所有 ──

router.post('/:id/kill-agent', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const profileId = getActiveProfile().id;
  const stagePrefix = stageKeyPrefix(id, profileId);
  let killed = 0;
  for (const [key, proc] of activeStages) {
    if (key.startsWith(stagePrefix)) {
      if (!proc.killed) { killProc(proc, 'manual_stop'); killed++; }
      activeStages.delete(key);
    }
  }
  res.json({ success: true, message: `已终止 ${killed} 个进程` });
}));

router.post('/:id/stop-all', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const profile = getActiveProfile();
  const profileId = profile.id;
  if (profile.workflow === 'upgrade') {
    // Cancel the upgrade queue task and kill any running stage under the
    // pinned upgrade profile for this library id.
    const cancelResult = upgradeQueue.cancel(id);
    const stagePrefix = stageKeyPrefix(id, profileId);
    let killed = 0;
    for (const [key, proc] of activeStages) {
      if (key.startsWith(stagePrefix)) {
        if (!proc.killed) { killProc(proc, 'manual_stop'); killed++; }
        activeStages.delete(key);
      }
    }
    return res.json({ success: true, killed, ...cancelResult });
  }
  const cancelResult = agentQueue.cancel(id, { profileId });
  const stagePrefix = stageKeyPrefix(id, profileId);

  let killed = 0;
  for (const [key, proc] of activeStages) {
    if (key.startsWith(stagePrefix)) {
      if (!proc.killed) { killProc(proc, 'manual_stop'); killed++; }
      activeStages.delete(key);
    }
  }
  runAllQueues.delete(runAllKey(id, profileId));
  res.json({ success: true, killed, ...cancelResult });
}));

router.get('/:id/run-all-status', asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (getActiveProfile().workflow === 'upgrade') {
    const qs = upgradeQueue.getStatus();
    const inRunning = (qs.running || []).find(p => String(p.libraryId) === String(id));
    const inQueued = (qs.queued || []).find(p => String(p.libraryId) === String(id));
    if (inRunning) {
      return res.json({
        active: true,
        currentStageId: inRunning.currentStageId,
        completedStages: inRunning.completedStages,
        startTime: inRunning.startTime,
        position: 0
      });
    }
    if (inQueued) {
      return res.json({
        active: true,
        position: inQueued.position,
        currentStageId: null,
        completedStages: [],
        startTime: null
      });
    }
    return res.json({ active: false });
  }
  const profileId = getActiveProfile().id;
  const batchStatus = agentQueue.getStatus();

  const inRunning = batchStatus.running.find(p => p.pluginId === id && p.profileId === profileId);
  const inQueued = batchStatus.queued.find(p => p.pluginId === id && p.profileId === profileId);
  
  if (inRunning) {
    res.json({
      active: true,
      currentStageId: inRunning.currentStageId,
      completedStages: inRunning.completedStages,
      startTime: inRunning.startTime,
      position: 0
    });
  } else if (inQueued) {
    res.json({
      active: true,
      position: inQueued.position,
      currentStageId: null,
      completedStages: [],
      startTime: null
    });
  } else {
    res.json({ active: false });
  }
}));

// ── Token 统计 ──

router.get('/:id/token-stats', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { refresh } = req.query;
  // Upgrade flow has no per-library token dashboard yet; report unavailable so
  // the reused token-stats panel renders its empty state instead of erroring.
  if (getActiveProfile().workflow === 'upgrade') return res.json({ available: false });
  const { plugin, workRepoPath } = await findPluginWithRepo(id);

  const adaptDir = path.join(workRepoPath, getActiveProfile().ADAPTATION_DIR);
  const statsJsonPath = path.join(adaptDir, 'token-stats.json');

  const cloneTimeMs = plugin.cloneTime ? new Date(plugin.cloneTime).getTime() : null;
  const cloneTimeIso = plugin.cloneTime || null;

  // 优先读取缓存（除非 refresh=true）
  if (refresh !== 'true' && fsSync.existsSync(statsJsonPath)) {
    try {
      const saved = JSON.parse(fsSync.readFileSync(statsJsonPath, 'utf8'));
      if (saved.latest && saved.latest.totals && saved.latest.totals.interactions > 0) {
        return res.json({
          available: true,
          source: 'cache',
          all: saved.latest,
          sinceClone: saved.latestSinceClone || null,
          cloneTime: saved.cloneTimeIso || null,
          stageSnapshots: saved.snapshots || []
        });
      }
    } catch {}
  }

  // 缓存不存在或需要刷新时，查询数据库
  if (dbExists()) {
    const collected = collectAndSaveTokenStats(workRepoPath, '_manual', plugin.name, {
      cloneTimeMs, cloneTimeIso
    });
    if (collected) {
      const { allStats, sinceCloneStats } = collected;
      let stageSnapshots = [];
      if (fsSync.existsSync(statsJsonPath)) {
        try {
          const saved = JSON.parse(fsSync.readFileSync(statsJsonPath, 'utf8'));
          stageSnapshots = saved.snapshots || [];
        } catch {}
      }
      return res.json({
        available: true,
        source: 'db',
        all: allStats,
        sinceClone: sinceCloneStats,
        cloneTime: cloneTimeIso,
        stageSnapshots
      });
    }
  }

  // 最后尝试读取缓存（即使 interactions=0）
  if (fsSync.existsSync(statsJsonPath)) {
    try {
      const saved = JSON.parse(fsSync.readFileSync(statsJsonPath, 'utf8'));
      return res.json({
        available: true,
        source: 'cache',
        all: saved.latest || { sessions: { total: 0 }, totals: {}, byModel: [], byAgent: [] },
        sinceClone: saved.latestSinceClone || null,
        cloneTime: saved.cloneTimeIso || null,
        stageSnapshots: saved.snapshots || []
      });
    } catch {}
  }

  return res.json({ available: false });
}));

// ── 全局批量执行队列 ──

router.post('/batch/enqueue', asyncHandler(async (req, res) => {
  const { pluginIds } = req.body;
  const profileId = getActiveProfile().id;
  if (!pluginIds || !Array.isArray(pluginIds) || pluginIds.length === 0) {
    throw new AppError('请提供 pluginIds 数组', 400);
  }

  const results = [];

  for (const id of pluginIds) {
    let plugin;
    try {
      const result = await findPluginOrFail(id);
      plugin = result.plugin;
    } catch (e) {
      results.push({ id, status: 'not_found' });
      continue;
    }

    if (plugin.status !== 'cloned') {
      results.push({ id, name: plugin.name, status: 'not_cloned' });
      continue;
    }
    const cloneRoot = path.join(getReposDir(), plugin.name);
    if (!fsSync.existsSync(cloneRoot)) {
      results.push({ id, name: plugin.name, status: 'no_repo' });
      continue;
    }

    const workRepoPath = resolvePluginWorkRoot(cloneRoot, plugin);

    const executeFn = async (pluginId, pluginName, control) => {
      const batchSettings = await readSettings();
      const useGraphExecutor = batchSettings.useGraphExecutor !== false;

      runAllQueues.set(runAllKey(pluginId, profileId), control);
      try {
        if (useGraphExecutor) {
          console.log(`[batch] Using graph executor for ${pluginName}`);
          const { GraphExecutor } = require('../lib/agent/graph-executor');
          const executor = new GraphExecutor();
          const result = await executor.execute(pluginId, plugin, workRepoPath, batchSettings);
          control.completedStages = result.completedStages;
        } else {
          console.log(`[batch] Using linear executor for ${pluginName}`);
          const allStgs = getFilteredStages(batchSettings);
          const stgStatuses = await Promise.all(
            allStgs.map(async s => ({ stage: s, status: await detectStageStatus(workRepoPath, s.id) }))
          );
          const reachable = getReachableStageIds(workRepoPath, batchSettings);
          const stagesToRun = stgStatuses
            .filter(s => s.status !== 'success')
            .map(s => s.stage)
            .filter(s => reachable.has(s.id));
          if (stagesToRun.length === 0) return true;

          const retryOpts = batchSettings.stageRetry;
          for (const stage of stagesToRun) {
            if (control.aborted) break;
            control.currentStageId = stage.id;
            const result = await executeStageWithRetry(pluginId, plugin, stage.id, retryOpts);
            control.completedStages.push({
              id: stage.id,
              success: result.success,
              attempts: result.attempts || 1,
              errorType: result.errorType || null
            });
            if (!result.success) break;
          }
        }
      } catch (err) {
        console.error(`[batch] Unexpected error for ${pluginName}: ${err.message}`);
        control.completedStages.push({ id: control.currentStageId, success: false, errorType: 'unexpected' });
      } finally {
        runAllQueues.delete(runAllKey(pluginId, profileId));
      }
      return control.completedStages.every(s => s.success);
    };

    const enqueueResult = await agentQueue.enqueue(id, plugin.name, executeFn, { profileId });
    results.push({ id, name: plugin.name, ...enqueueResult });
  }

  res.json({ success: true, results, queueStatus: agentQueue.getStatus() });
}));

router.get('/batch/status', (req, res) => {
  res.json(agentQueue.getStatus());
});

router.post('/batch/cancel', asyncHandler(async (req, res) => {
  const { pluginIds, all } = req.body;

  if (all) {
    for (const [key, proc] of activeStages) {
      if (!proc.killed) { killProc(proc, 'manual_stop'); }
      activeStages.delete(key);
    }
    const result = agentQueue.cancelAll();
    return res.json({ success: true, ...result });
  }

  if (!pluginIds || !Array.isArray(pluginIds)) {
    throw new AppError('请提供 pluginIds 数组或 all: true', 400);
  }

  const profileId = getActiveProfile().id;
  const results = [];
  for (const id of pluginIds) {
    const cancelResult = agentQueue.cancel(id, { profileId });
    if (cancelResult.was === 'running') {
      const stagePrefix = stageKeyPrefix(id, profileId);
      for (const [key, proc] of activeStages) {
        if (key.startsWith(stagePrefix)) {
          if (!proc.killed) { killProc(proc, 'manual_stop'); }
          activeStages.delete(key);
        }
      }
    }
    results.push({ id, ...cancelResult });
  }

  res.json({ success: true, results });
}));

module.exports = router;
