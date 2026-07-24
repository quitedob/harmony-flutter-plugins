const express = require('express');
const fsSync = require('fs');
const path = require('path');

const { asyncHandler, AppError } = require('../lib/errors');
const { readSources, writeSources, upsertMany, addOne, updateOne, removeOne } = require('../lib/mapping/sources-store');
const mappingQueue = require('../lib/mapping/queue');
const { getMappingReposRoot, getSourceRepoDir } = require('../lib/mapping/paths');
const { ensureRepoCloned, fetchAll, checkout } = require('../lib/mapping/git');
const { runMappingAnalysis, readMappingResult, getMappingDir, getLogPath, getValidationReportPath } = require('../lib/mapping/mapping-executor');
const { validateMappingResultJson, validateAndFilterMappings } = require('../lib/mapping/validation');
const { readIndex, writeIndex } = require('../lib/mapping/index-store');
const { readReviews, upsertReview } = require('../lib/mapping/reviews-store');

const router = express.Router();

// ── Sources CRUD ──

router.get('/sources', asyncHandler(async (_req, res) => {
  const data = await readSources();
  const sources = Array.isArray(data.sources) ? data.sources : [];

  // Reconcile "running" status after server restart:
  // If a source is marked running but not present in mapping queue running set, mark it as failed(stale).
  const q = mappingQueue.getStatus();
  const runningSet = new Set((q.running || []).map(t => String(t.sourceId)));
  const now = Date.now();

  let changed = false;
  for (const s of sources) {
    if (s?.lastRun?.status !== 'running') continue;
    const id = String(s.id);
    if (runningSet.has(id)) continue;

    // If it's very recent, allow a small grace period; otherwise mark stale.
    const startedAt = s.lastRun?.startedAt ? Date.parse(s.lastRun.startedAt) : 0;
    const ageMs = startedAt ? (now - startedAt) : Number.POSITIVE_INFINITY;
    if (ageMs < 15_000) continue;

    s.lastRun = {
      status: 'failed',
      startedAt: s.lastRun?.startedAt || null,
      endedAt: new Date().toISOString(),
      errorType: 'stale_server_restart'
    };
    changed = true;
  }

  if (changed) {
    // Persist reconciled status
    await writeSources({ sources });
  }

  res.json({ sources });
}));

router.post('/sources', asyncHandler(async (req, res) => {
  const { name, gitUrl, branch, enabled, tags, notes } = req.body || {};
  if (!gitUrl || typeof gitUrl !== 'string') throw new AppError('gitUrl 不能为空', 400);
  const s = await addOne({ name, gitUrl, branch, enabled, tags, notes });
  res.json({ success: true, source: s });
}));

router.put('/sources/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const patch = req.body || {};
  const updated = await updateOne(id, patch);
  if (!updated) throw new AppError('source 不存在', 404);
  res.json({ success: true, source: updated });
}));

router.delete('/sources/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const ok = await removeOne(id);
  if (!ok) throw new AppError('source 不存在', 404);
  res.json({ success: true });
}));

// ── Import CSV (JSON payload) ──
// body: { csv: "..." }
router.post('/sources/import-csv', asyncHandler(async (req, res) => {
  const csv = (req.body && req.body.csv) ? String(req.body.csv) : '';
  if (!csv.trim()) throw new AppError('csv 不能为空', 400);

  const lines = csv.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  if (lines.length === 0) throw new AppError('csv 为空', 400);

  // Minimal CSV: header optional. Columns: name,gitUrl,branch
  const rows = lines.map(line => {
    // naive split; acceptable for MVP (frontend can send normalized JSON later)
    const parts = line.split(',').map(p => p.trim());
    return parts;
  });

  const header = rows[0].map(h => h.toLowerCase());
  const hasHeader = header.includes('giturl') || header.includes('url') || header.includes('repo');
  const dataRows = hasHeader ? rows.slice(1) : rows;

  const urlIdx = hasHeader ? (header.indexOf('giturl') !== -1 ? header.indexOf('giturl') : (header.indexOf('url') !== -1 ? header.indexOf('url') : header.indexOf('repo'))) : 1;
  const nameIdx = hasHeader ? header.indexOf('name') : 0;
  const branchIdx = hasHeader ? header.indexOf('branch') : 2;

  const items = dataRows.map(r => ({
    name: r[nameIdx] || '',
    gitUrl: r[urlIdx] || '',
    branch: r[branchIdx] || ''
  })).filter(x => x.gitUrl);

  const merged = await upsertMany(items);
  res.json({ success: true, count: items.length, sources: merged });
}));

// ── Run mapping-analysis (queued) ──

router.post('/sources/:id/run', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await readSources();
  const source = data.sources.find(s => s.id === id);
  if (!source) throw new AppError('source 不存在', 404);

  const sourceName = source.name || source.gitUrl;

  const executeFn = async (_sourceId, _sourceName, control) => {
    control.currentStageId = 'mapping-analysis';
    control.completedStages = [];

    const repoRoot = getMappingReposRoot();
    if (!fsSync.existsSync(repoRoot)) fsSync.mkdirSync(repoRoot, { recursive: true });
    const repoDir = getSourceRepoDir(source);

    // Clone/fetch/checkout
    await ensureRepoCloned(repoDir, source.gitUrl);
    await fetchAll(repoDir);
    if (source.branch) await checkout(repoDir, source.branch);

    // Update lastRun: started (keep a stable startedAt for final update)
    const startedAt = new Date().toISOString();
    await updateOne(id, { lastRun: { status: 'running', startedAt } });

    const promptExtra = [
      '## 运行参数（由后端注入）',
      `- sourceId: ${id}`,
      `- gitUrl: ${source.gitUrl}`,
      source.branch ? `- branch: ${source.branch}` : '',
      '',
      '请将产物写入 `.mapping-adaptation/mapping-analysis.json`。'
    ].filter(Boolean).join('\n');

    const result = await runMappingAnalysis(repoDir, promptExtra, { sourceId: id });
    const endedAt = new Date().toISOString();

    if (result.success) {
      await updateOne(id, { lastRun: { status: 'success', startedAt, endedAt } });
      control.completedStages.push({ id: 'mapping-analysis', success: true, attempts: 1 });
      return true;
    }

    await updateOne(id, { lastRun: { status: 'failed', startedAt, endedAt, errorType: result.errorType || 'unknown' } });
    control.completedStages.push({ id: 'mapping-analysis', success: false, attempts: 1, errorType: result.errorType || 'unknown' });
    return false;
  };

  const enqueueResult = await mappingQueue.enqueue(id, sourceName, executeFn);
  res.json({ success: true, ...enqueueResult, queueStatus: mappingQueue.getStatus() });
}));

router.get('/queue/status', (_req, res) => {
  res.json(mappingQueue.getStatus());
});

// ── Cancel all mapping-analysis tasks (queue + running) ──
router.post('/queue/cancel-all', asyncHandler(async (_req, res) => {
  const nowIso = new Date().toISOString();
  const status = mappingQueue.getStatus();
  const runningIds = new Set((status.running || []).map(t => String(t.sourceId)));
  const queuedIds = new Set((status.queued || []).map(t => String(t.sourceId)));

  const result = mappingQueue.cancelAll();

  // Mark unfinished (queued + running) as failed immediately for UI consistency.
  // Note: running tasks will likely also update on process exit; this is best-effort.
  const all = await readSources();
  const sources = Array.isArray(all.sources) ? all.sources : [];
  await Promise.allSettled(
    sources
      .filter(s => runningIds.has(String(s.id)) || queuedIds.has(String(s.id)))
      .map(s => updateOne(String(s.id), {
        lastRun: {
          status: 'failed',
          startedAt: s.lastRun?.startedAt || null,
          endedAt: nowIso,
          errorType: 'cancelled'
        }
      }))
  );

  res.json({ success: true, ...result, queueStatus: mappingQueue.getStatus() });
}));

// ── Cancel mapping-analysis ──

router.post('/sources/:id/cancel', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = mappingQueue.cancel(id);
  res.json({ success: true, ...result, queueStatus: mappingQueue.getStatus() });
}));

// ── Read mapping result ──

router.get('/sources/:id/result', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await readSources();
  const source = data.sources.find(s => s.id === id);
  const repoDir = getSourceRepoDir(id, source || null);
  const fp = path.join(getMappingDir(repoDir), 'mapping-analysis.json');
  if (!fsSync.existsSync(fp)) throw new AppError('mapping-analysis.json 不存在', 404);
  const json = await readMappingResult(repoDir);
  res.json({ success: true, result: json });
}));

router.get('/sources/:id/validation', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await readSources();
  const source = data.sources.find(s => s.id === id);
  const repoDir = getSourceRepoDir(id, source || null);
  const fp = getValidationReportPath(repoDir);
  if (!fsSync.existsSync(fp)) throw new AppError('validation-report.json 不存在', 404);
  const raw = fsSync.readFileSync(fp, 'utf8');
  res.json({ success: true, report: JSON.parse(raw) });
}));

router.get('/sources/:id/log', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await readSources();
  const source = data.sources.find(s => s.id === id);
  const repoDir = getSourceRepoDir(id, source || null);
  const logPath = getLogPath(repoDir);
  if (!fsSync.existsSync(logPath)) throw new AppError('日志不存在', 404);
  res.type('text/plain').send(fsSync.readFileSync(logPath, 'utf8'));
}));

// ── Global mapping index (on-the-fly aggregation for MVP) ──
// Aggregates all mapping-analysis.json into a global list with traceability + persists it.
router.get('/index', asyncHandler(async (_req, res) => {
  const data = await readSources();
  const sources = Array.isArray(data.sources) ? data.sources : [];

  // Key strategy: stable enough for review + traceability.
  const keyOf = (m) => {
    const a = String(m.androidSymbol || '').trim();
    const k = String(m.harmonyReplacement?.kind || '').trim();
    const n = String(m.harmonyReplacement?.name || '').trim();
    const c = String(m.changeType || '').trim();
    return `${a}||${k}||${n}||${c}`;
  };

  const index = new Map();
  const byAndroidSymbol = new Map(); // androidSymbol -> Set(keys)
  const conflicts = [];
  const stats = { scannedSources: 0, scannedEntries: 0, acceptedEntries: 0, rejectedEntries: 0, schemaInvalidSources: 0 };

  for (const s of sources) {
    const repoDir = getSourceRepoDir(s);
    const fp = path.join(getMappingDir(repoDir), 'mapping-analysis.json');
    if (!fsSync.existsSync(fp)) continue;

    let result;
    try {
      result = await readMappingResult(repoDir);
    } catch {
      continue;
    }
    if (!Array.isArray(result)) continue;
    stats.scannedSources += 1;
    stats.scannedEntries += result.length;

    const schemaCheck = validateMappingResultJson(result);
    if (!schemaCheck.ok) {
      stats.schemaInvalidSources += 1;
      continue;
    }

    const semantic = validateAndFilterMappings(result);
    stats.rejectedEntries += semantic.rejected.length;
    const accepted = semantic.passed;

    for (const m of accepted) {
      if (!m || typeof m !== 'object') continue;
      const k = keyOf(m);
      if (!k || !String(m.androidSymbol || '').trim()) continue;

      const srcEvidence = m.evidence ? [{
        sourceId: s.id,
        name: s.name || '',
        gitUrl: s.gitUrl || '',
        branch: s.branch || '',
        evidence: m.evidence
      }] : [{
        sourceId: s.id,
        name: s.name || '',
        gitUrl: s.gitUrl || '',
        branch: s.branch || '',
        evidence: null
      }];

      const existing = index.get(k);
      if (!existing) {
        index.set(k, {
          key: k,
          androidSymbol: m.androidSymbol,
          harmonyReplacement: m.harmonyReplacement,
          changeType: m.changeType,
          confidence: m.confidence,
          rationale: m.rationale,
          preconditions: m.preconditions,
          requiredDeps: m.requiredDeps,
          fieldMappings: m.fieldMappings,
          enumMappings: m.enumMappings,
          codeSnippets: m.codeSnippets,
          limitations: m.limitations,
          testGuidance: m.testGuidance,
          sources: srcEvidence
        });
      } else {
        existing.sources.push(...srcEvidence);
        // Keep the best confidence as a quick signal.
        const rank = { high: 3, medium: 2, low: 1 };
        const cur = rank[String(existing.confidence || '')] || 0;
        const nxt = rank[String(m.confidence || '')] || 0;
        if (nxt > cur) existing.confidence = m.confidence;
      }

      stats.acceptedEntries += 1;

      const a = String(m.androidSymbol || '').trim();
      if (a) {
        const set = byAndroidSymbol.get(a) || new Set();
        set.add(k);
        byAndroidSymbol.set(a, set);
      }
    }
  }

  // Detect conflicts: same androidSymbol but multiple candidate keys (different replacement/changeType).
  for (const [androidSymbol, keys] of byAndroidSymbol.entries()) {
    if (keys.size <= 1) continue;
    const options = Array.from(keys).map(k => index.get(k)).filter(Boolean).map(opt => ({
      key: opt.key,
      harmonyReplacement: opt.harmonyReplacement,
      changeType: opt.changeType,
      confidence: opt.confidence,
      sourcesCount: Array.isArray(opt.sources) ? opt.sources.length : 0
    }));
    conflicts.push({ androidSymbol, options });
  }

  const base = { items: Array.from(index.values()), conflicts, stats };
  const persisted = await writeIndex(base);

  // Merge reviews into items (and into conflict options) for UI.
  const reviewsData = await readReviews();
  const reviews = reviewsData.reviews || {};
  const applyReview = (obj) => {
    const r = reviews[obj.key];
    if (!r) return { ...obj, review: { status: 'unreviewed' } };
    return { ...obj, review: r };
  };

  const itemsWithReview = (persisted.items || []).map(applyReview);
  const conflictsWithReview = (persisted.conflicts || []).map(c => ({
    ...c,
    options: (c.options || []).map(opt => ({
      ...opt,
      review: reviews[opt.key] || { status: 'unreviewed' }
    }))
  }));

  res.json({ success: true, generatedAt: persisted.generatedAt, items: itemsWithReview, conflicts: conflictsWithReview, stats: persisted.stats });
}));

// Rebuild index explicitly (useful after mass updates)
router.post('/index/rebuild', asyncHandler(async (_req, res) => {
  // just call GET handler logic by reusing the aggregator: easiest is to read current persisted first
  // and then force regeneration by calling the same code path: clients can call GET /index to rebuild.
  const cur = await readIndex();
  res.json({ success: true, currentGeneratedAt: cur.generatedAt || null, hint: 'call GET /api/mapping/index to rebuild and get merged reviews' });
}));

// Update review for a specific mapping key
router.put('/index/:key/review', asyncHandler(async (req, res) => {
  const key = String(req.params.key || '');
  if (!key) throw new AppError('key 不能为空', 400);

  const patch = req.body || {};
  const allowed = new Set(['approved', 'unreviewed', 'needs_changes', 'rejected']);
  if (patch.status && !allowed.has(String(patch.status))) throw new AppError('status 不合法', 400);

  const saved = await upsertReview(key, patch);
  if (!saved) throw new AppError('review 写入失败', 500);
  res.json({ success: true, review: saved });
}));

module.exports = router;

