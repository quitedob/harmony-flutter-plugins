const express = require('express');
const { spawn } = require('child_process');
const fsSync = require('fs');
const path = require('path');

const { asyncHandler, AppError } = require('../lib/errors');
const { readLibraries, writeLibraries, addOne, updateOne, removeOne } = require('../lib/upgrade/libraries-store');
const upgradeQueue = require('../lib/upgrade/queue');
const {
  getLibraryRepoDir,
  getUpstreamRepoDir,
  getRepoDirName,
  getUpgradeLogsDir,
  ensureUpgradeManifest,
  readUpgradeManifest
} = require('../lib/upgrade/paths');
const { validateLibrary } = require('../lib/upgrade/validation');
const { cloneLibrary, cloneLibrariesBatch, getBatchCloneState } = require('../lib/upgrade/clone-service');
const { enqueueUpgradeRun } = require('../lib/upgrade/runner');
const { stripAnsi } = require('../lib/utils');

// ── Shared adaptation execution layer (reused directly, no upgrade executor) ──
const { runWithProfile, getUpgradeProfileId, listUpgradeProfiles, getActiveProfile } = require('../lib/profile');
const { getFilteredStages, getStageById } = require('../lib/stages');
const { readSettings } = require('../lib/settings');
const { runStageWithSSE } = require('../lib/agent/executor');
const { activeStages, stageKey, getAllStageStatuses, detectStageStatus } = require('../lib/agent/stage-manager');
const { getAdaptationDir, getLatestLogPath } = require('../lib/agent/helpers');
const { killProc } = require('../lib/platform');

const router = express.Router();

// ── Upgrade-side integration helpers ──

function upgradeProfileId(library) {
  return getUpgradeProfileId((library && library.type) || 'flutter');
}

/** Run fn inside the library's upgrade profile context. */
function withProfile(library, fn) {
  return runWithProfile(upgradeProfileId(library), fn);
}

/**
 * The shared executor resolves the work root as
 *   cloneRoot = getReposDir() / plugin.name ; repoPath = resolvePluginWorkRoot(cloneRoot, plugin).
 * Under an upgrade profile getReposDir() = WORKSPACE_ROOT/repos_<type>_upgrade and the
 * on-disk dir name is <name>__<shortid> (paths.getRepoDirName), so we pass that as
 * plugin.name. No packagePath → repoPath === cloneRoot === getLibraryRepoDir(library).
 */
function pluginLike(library) {
  return { name: getRepoDirName(library) };
}

function upgradeProfileIds() {
  return listUpgradeProfiles().map(p => p.id);
}

/** Is a stage currently running for this library (across any upgrade profile)? */
function isStageActive(libraryId, stageId) {
  for (const pid of upgradeProfileIds()) {
    if (activeStages.has(`${pid}:${libraryId}:${stageId}`)) return true;
  }
  return false;
}

/** Kill a running stage for this library. Returns true if a process was signalled. */
function killStage(libraryId, stageId) {
  for (const pid of upgradeProfileIds()) {
    const sk = `${pid}:${libraryId}:${stageId}`;
    const proc = activeStages.get(sk);
    if (proc) {
      try { killProc(proc, 'manual_stop'); } catch {}
      activeStages.delete(sk);
      return true;
    }
  }
  return false;
}

/** Slim per-stage progress for the list page (status derived from output files + logs). */
async function summarizeStageProgress(library) {
  const repoDir = getLibraryRepoDir(library);
  const stages = await withProfile(library, async () => {
    const settings = await readSettings();
    const defs = getFilteredStages(settings);
    if (!fsSync.existsSync(repoDir)) {
      return defs.map(s => ({ id: s.id, name: s.name, status: 'idle' }));
    }
    return Promise.all(defs.map(async s => ({
      id: s.id,
      name: s.name,
      status: await detectStageStatus(repoDir, s.id)
    })));
  });
  return {
    total: stages.length,
    completed: stages.filter(s => s.status === 'success').length,
    failed: stages.filter(s => s.status === 'failed').length,
    stages
  };
}

// ── Libraries CRUD ──

router.get('/libraries', asyncHandler(async (_req, res) => {
  const data = await readLibraries();
  const libraries = Array.isArray(data.libraries) ? data.libraries : [];

  // Reconcile "running" status after server restart:
  // If a library is marked running but not present in upgrade queue running set, mark failed (stale).
  const q = upgradeQueue.getStatus();
  const runningSet = new Set((q.running || []).map(t => String(t.libraryId)));
  const now = Date.now();

  let changed = false;
  for (const l of libraries) {
    if (l?.lastRun?.status !== 'running') continue;
    const id = String(l.id);
    if (runningSet.has(id)) continue;

    const startedAt = l.lastRun?.startedAt ? Date.parse(l.lastRun.startedAt) : 0;
    const ageMs = startedAt ? (now - startedAt) : Number.POSITIVE_INFINITY;
    if (ageMs < 15_000) continue;

    l.lastRun = {
      status: 'failed',
      startedAt: l.lastRun?.startedAt || null,
      endedAt: new Date().toISOString(),
      errorType: 'stale_server_restart'
    };
    changed = true;
  }

  if (changed) {
    await writeLibraries({ libraries });
  }

  const enriched = await Promise.all(
    libraries.map(async l => ({ ...l, stageProgress: await summarizeStageProgress(l) }))
  );

  res.json({ libraries: enriched });
}));

// ── Library detail with stage statuses ──

router.get('/libraries/:id/detail', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await readLibraries();
  const library = data.libraries.find(l => l.id === id);
  if (!library) throw new AppError('library 不存在', 404);

  const repoDir = getLibraryRepoDir(library);
  const repoExists = fsSync.existsSync(repoDir);

  const { stages, availableReports, hasLog } = await withProfile(library, async () => {
    const settings = await readSettings();
    const allStages = getFilteredStages(settings);
    if (!repoExists) {
      return {
        stages: allStages.map(s => ({
          id: s.id, name: s.name, description: s.description,
          status: 'idle', hasLog: false, hasOutput: false, hasReport: false,
          startTime: null, endTime: null, duration: null
        })),
        availableReports: [],
        hasLog: false
      };
    }
    const stages = await getAllStageStatuses(repoDir, id, settings);
    const adaptDir = getAdaptationDir(repoDir);
    const availableReports = [];
    for (const stage of allStages) {
      if (stage.outputReport && fsSync.existsSync(path.join(adaptDir, stage.outputReport))) {
        availableReports.push({ stageId: stage.id, name: stage.name, file: stage.outputReport });
      }
    }
    let hasLog = false;
    for (const stage of allStages) {
      if (getLatestLogPath(repoDir, stage.id)) { hasLog = true; break; }
    }
    return { stages, availableReports, hasLog };
  });

  res.json({ library, repoExists, stages, availableReports, hasLog, analysis: null, dashboardCards: null });
}));

router.post('/libraries', asyncHandler(async (req, res) => {
  const sanitized = validateLibrary(req.body || {});
  const lib = await addOne(sanitized);
  res.json({ success: true, library: lib });
}));

router.put('/libraries/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const patch = req.body || {};
  const updated = await updateOne(id, patch);
  if (!updated) throw new AppError('library 不存在', 404);
  res.json({ success: true, library: updated });
}));

router.delete('/libraries/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await readLibraries();
  const library = data.libraries.find(l => l.id === id);
  if (library) console.log(`Deleting: ${library.name}`);
  const ok = await removeOne(id);
  if (!ok) throw new AppError('library 不存在', 404);
  // 清理本地 clone 目录（参考适配：删除时一并清理本地文件夹）
  if (library) {
    try { fsSync.rmSync(getLibraryRepoDir(library), { recursive: true, force: true }); } catch {}
    try { fsSync.rmSync(getUpstreamRepoDir(library), { recursive: true, force: true }); } catch {}
    console.log(`Deleted: ${library.name}`);
  }
  res.json({ success: true });
}));

// ── Open the library's local directory in the file manager (参考适配 open-dir) ──

router.post('/libraries/:id/open-dir', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await readLibraries();
  const library = data.libraries.find(l => l.id === id);
  if (!library) throw new AppError('library 不存在', 404);
  const dir = getLibraryRepoDir(library);
  if (!fsSync.existsSync(dir)) throw new AppError('本地目录不存在，请先克隆', 404);
  const platform = process.platform;
  const cmd = platform === 'darwin' ? 'open' : (platform === 'win32' ? 'explorer' : 'xdg-open');
  const child = spawn(cmd, [dir], { detached: true, stdio: 'ignore' });
  child.unref();
  res.json({ success: true, path: dir });
}));

// TODO: POST /libraries/import-csv (parity with mapping; deferred this iteration)

// ── Clone harmonized + upstream into repos_<type>_upgrade (background) ──

router.post('/libraries/:id/clone', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await readLibraries();
  const library = data.libraries.find(l => l.id === id);
  if (!library) throw new AppError('library 不存在', 404);
  // Fire-and-forget; clone status (cloning→cloned/clone_failed) persisted by cloneLibrary.
  cloneLibrary(library).catch(err => console.error('[upgrade-clone]', err.message));
  res.json({ success: true, started: true, libraryId: id });
}));

router.post('/batch-clone', asyncHandler(async (req, res) => {
  const body = req.body || {};
  const data = await readLibraries();
  let libs;
  if (body.all) {
    libs = data.libraries;
  } else if (Array.isArray(body.ids)) {
    const ids = new Set(body.ids.map(String));
    libs = data.libraries.filter(l => ids.has(String(l.id)));
  } else {
    libs = [];
  }
  if (libs.length === 0) throw new AppError('没有要克隆的升级库', 400);
  const result = await cloneLibrariesBatch(libs);
  if (!result.started) throw new AppError(result.error, 409);
  res.json({ success: true, started: true, total: result.total });
}));

router.get('/batch-clone/status', (_req, res) => {
  res.json(getBatchCloneState());
});

// ── Run upgrade (queued) ──

router.post('/libraries/:id/run', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await readLibraries();
  const library = data.libraries.find(l => l.id === id);
  if (!library) throw new AppError('library 不存在', 404);
  res.json(await enqueueUpgradeRun(id, library));
}));

router.get('/queue/status', (_req, res) => {
  res.json(upgradeQueue.getStatus());
});

// ── Cancel all upgrade tasks (queue + running) ──

router.post('/queue/cancel-all', asyncHandler(async (_req, res) => {
  const nowIso = new Date().toISOString();
  const status = upgradeQueue.getStatus();
  const runningIds = new Set((status.running || []).map(t => String(t.libraryId)));
  const queuedIds = new Set((status.queued || []).map(t => String(t.libraryId)));

  const result = upgradeQueue.cancelAll();

  // Mark unfinished (queued + running) as failed immediately for UI consistency.
  const all = await readLibraries();
  const libraries = Array.isArray(all.libraries) ? all.libraries : [];
  await Promise.allSettled(
    libraries
      .filter(l => runningIds.has(String(l.id)) || queuedIds.has(String(l.id)))
      .map(l => updateOne(String(l.id), {
        lastRun: {
          status: 'failed',
          startedAt: l.lastRun?.startedAt || null,
          endedAt: nowIso,
          errorType: 'cancelled'
        }
      }))
  );

  res.json({ success: true, ...result, queueStatus: upgradeQueue.getStatus() });
}));

// ── Cancel a single upgrade task ──

router.post('/libraries/:id/cancel', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = upgradeQueue.cancel(id);
  res.json({ success: true, ...result, queueStatus: upgradeQueue.getStatus() });
}));

// ── Read upgrade log (combined fallback to latest stage log) ──

router.get('/libraries/:id/log', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await readLibraries();
  const library = data.libraries.find(l => l.id === id);
  if (!library) throw new AppError('library 不存在', 404);
  const repoDir = getLibraryRepoDir(library);

  // The shared executor writes per-stage logs only; prefer a legacy combined
  // upgrade.log if present, otherwise fall back to the most recent stage log.
  const combined = path.join(getUpgradeLogsDir(repoDir), 'upgrade.log');
  let logPath = fsSync.existsSync(combined) ? combined : null;
  if (!logPath) {
    logPath = await withProfile(library, async () => {
      const settings = await readSettings();
      for (const s of getFilteredStages(settings)) {
        const p = getLatestLogPath(repoDir, s.id);
        if (p) return p;
      }
      return null;
    });
  }
  if (!logPath || !fsSync.existsSync(logPath)) throw new AppError('日志不存在', 404);
  res.type('text/plain').send(fsSync.readFileSync(logPath, 'utf8'));
}));

// ── Read upgrade manifest (library context; stage status lives in /detail) ──

router.get('/libraries/:id/result', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await readLibraries();
  const library = data.libraries.find(l => l.id === id);
  if (!library) throw new AppError('library 不存在', 404);
  const repoDir = getLibraryRepoDir(library);
  const manifest = await readUpgradeManifest(repoDir);
  if (!manifest) throw new AppError('upgrade-manifest.json 不存在', 404);
  res.json({ success: true, manifest });
}));

// ── Per-stage SSE execution (delegates to adaptation agent/executor.js) ──

router.get('/libraries/:id/stages/:stageId/run', async (req, res) => {
  try {
    const { id, stageId } = req.params;
    const data = await readLibraries();
    const library = data.libraries.find(l => l.id === id);

    const setupSseError = (msg) => {
      res.setHeader('Content-Type', 'text/event-stream');
      res.write(`data: ${JSON.stringify({ type: 'error', error: msg })}\n\n`);
      res.end();
    };

    if (!library) return setupSseError('library 不存在');

    const repoDir = getLibraryRepoDir(library);
    if (!fsSync.existsSync(repoDir)) return setupSseError('仓库尚未克隆，请先执行克隆操作');

    if (isStageActive(id, stageId)) return setupSseError(`阶段 ${stageId} 正在运行中`);

    const stageDef = withProfile(library, () => getStageById(stageId));
    if (!stageDef) return setupSseError(`未知阶段: ${stageId}`);

    // Setup SSE with heartbeat (mirrors setupSSEWithHeartbeat from agent/helpers.js)
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');

    const heartbeat = setInterval(() => {
      try { res.write(':heartbeat\n\n'); } catch { clearInterval(heartbeat); }
    }, 15000);
    const cleanupHeartbeat = () => clearInterval(heartbeat);

    let sseConnected = true;
    req.on('close', () => { sseConnected = false; });

    function safeSend(data) {
      if (!sseConnected) return;
      try { res.write(`data: ${JSON.stringify(data)}\n\n`); } catch { sseConnected = false; }
    }
    function safeEnd() {
      cleanupHeartbeat();
      try { res.end(); } catch {}
    }

    // Write manifest context the Agent prompt reads. NOTE: per-stage SSE
    // execution deliberately does NOT touch library.lastRun — lastRun is the
    // owned state of the queued pipeline runner (POST /libraries/:id/run) and
    // mirrors adaptation, which has no lastRun at all. Whether a library is
    // "running" is derived from activeStages via getAllStageStatuses /
    // detectStageStatus (stageProgress on the list page), never from lastRun.
    await ensureUpgradeManifest(repoDir, library);

    // Delegate to the shared executor under the upgrade profile.
    await withProfile(library, () =>
      runStageWithSSE(id, pluginLike(library), stageId, safeSend, safeEnd)
    );
  } catch (error) {
    if (!res.headersSent) {
      res.setHeader('Content-Type', 'text/event-stream');
    }
    try { res.write(`data: ${JSON.stringify({ type: 'error', error: error.message })}\n\n`); } catch {}
    try { res.end(); } catch {}
  }
});

// ── Stage status (for SSE reconnection) ──

router.get('/libraries/:id/stages/:stageId/status', asyncHandler(async (req, res) => {
  const { id, stageId } = req.params;
  const data = await readLibraries();
  const library = data.libraries.find(l => l.id === id);
  if (!library) throw new AppError('library 不存在', 404);

  const repoDir = getLibraryRepoDir(library);
  const processAlive = isStageActive(id, stageId);

  let status = 'idle';
  if (processAlive) {
    status = 'running';
  } else if (fsSync.existsSync(repoDir)) {
    status = await withProfile(library, () => detectStageStatus(repoDir, stageId));
  }

  res.json({ stageId, status, processAlive });
}));

// ── Kill stage ──

router.post('/libraries/:id/stages/:stageId/kill', asyncHandler(async (req, res) => {
  const { id, stageId } = req.params;
  const killed = killStage(id, stageId);
  // Also cancel from queue
  const queueResult = upgradeQueue.cancel(id);
  res.json({ success: true, killed, ...queueResult });
}));

// ── Stage log-stream SSE ──

router.get('/libraries/:id/stages/:stageId/log-stream', async (req, res) => {
  try {
    const { id, stageId } = req.params;
    const data = await readLibraries();
    const library = data.libraries.find(l => l.id === id);
    if (!library) return res.status(404).json({ error: 'library 不存在' });

    const repoDir = getLibraryRepoDir(library);
    const logPath = withProfile(library, () => getLatestLogPath(repoDir, stageId));
    if (!logPath || !fsSync.existsSync(logPath)) return res.status(404).json({ error: '日志文件不存在' });

    // Setup SSE with heartbeat
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');

    const heartbeat = setInterval(() => {
      try { res.write(':heartbeat\n\n'); } catch { clearInterval(heartbeat); }
    }, 15000);
    const cleanupHeartbeat = () => clearInterval(heartbeat);

    let lastSentLength = 0;
    let closed = false;

    function sendChunk(content) {
      if (closed) return;
      const cleaned = stripAnsi(content);
      if (cleaned.trim()) {
        try { res.write(`data: ${JSON.stringify({ type: 'stdout', data: cleaned, append: true })}\n\n`); } catch { closed = true; }
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

    // Send initial content
    try {
      const initial = fsSync.readFileSync(logPath, 'utf8');
      lastSentLength = initial.length;
      if (initial.trim()) sendChunk(initial);
    } catch {}

    // Poll for new content
    const pollInterval = setInterval(() => {
      if (closed) return;
      readAndSendNew();
      if (!isStageActive(id, stageId)) {
        clearInterval(pollInterval);
        closed = true;
        cleanupHeartbeat();
        try {
          res.write(`data: ${JSON.stringify({ type: 'exit', status: 'done' })}\n\n`);
          res.end();
        } catch {}
      }
    }, 500);

    req.on('close', () => { closed = true; clearInterval(pollInterval); cleanupHeartbeat(); });
  } catch (error) {
    if (!res.headersSent) res.status(500).json({ error: error.message });
  }
});

// ── Per-stage log ──

router.get('/libraries/:id/stages/:stageId/log', asyncHandler(async (req, res) => {
  const { id, stageId } = req.params;
  const data = await readLibraries();
  const library = data.libraries.find(l => l.id === id);
  if (!library) throw new AppError('library 不存在', 404);
  const repoDir = getLibraryRepoDir(library);
  const logPath = withProfile(library, () => getLatestLogPath(repoDir, stageId));
  if (!logPath || !fsSync.existsSync(logPath)) throw new AppError('阶段日志不存在', 404);
  res.type('text/plain').send(fsSync.readFileSync(logPath, 'utf8'));
}));

// ── Per-stage report (markdown) ──

router.get('/libraries/:id/stages/:stageId/report', asyncHandler(async (req, res) => {
  const { id, stageId } = req.params;
  const data = await readLibraries();
  const library = data.libraries.find(l => l.id === id);
  if (!library) throw new AppError('library 不存在', 404);
  const { stageDef, adaptDir } = withProfile(library, () => ({
    stageDef: getStageById(stageId),
    adaptDir: getAdaptationDir(getLibraryRepoDir(library))
  }));
  if (!stageDef?.outputReport) throw new AppError('该阶段无报告输出', 404);
  const reportPath = path.join(adaptDir, stageDef.outputReport);
  if (!fsSync.existsSync(reportPath)) throw new AppError('报告文件不存在', 404);
  res.type('text/markdown').send(fsSync.readFileSync(reportPath, 'utf8'));
}));

// ── Per-stage output (JSON data) ──

router.get('/libraries/:id/stages/:stageId/output', asyncHandler(async (req, res) => {
  const { id, stageId } = req.params;
  const data = await readLibraries();
  const library = data.libraries.find(l => l.id === id);
  if (!library) throw new AppError('library 不存在', 404);
  const { stageDef, adaptDir } = withProfile(library, () => ({
    stageDef: getStageById(stageId),
    adaptDir: getAdaptationDir(getLibraryRepoDir(library))
  }));
  if (!stageDef?.outputFile) throw new AppError('该阶段无数据输出', 404);
  const outputPath = path.join(adaptDir, stageDef.outputFile);
  if (!fsSync.existsSync(outputPath)) throw new AppError('输出文件不存在', 404);
  res.json(JSON.parse(fsSync.readFileSync(outputPath, 'utf8')));
}));

module.exports = router;
