import { showError } from './js/utils.js';
import * as api from './js/api.js';

function normalizeRepoUrl(url) {
  return String(url || '').trim().replace(/\/+$/, '');
}

function deriveNameFromUrl(url) {
  const u = normalizeRepoUrl(url);
  const m = u.match(/([^/]+?)(?:\.git)?$/);
  return m ? m[1] : '';
}

let sourcesCache = [];
let globalIndexCache = [];
let globalConflictsCache = [];
let mappingLogPollTimer = null;
let sourcesPollTimer = null;
const runPending = new Map(); // sourceId -> { mode: 'starting'|'stopping', ts: number }
let queueStatusCache = null;

function queuedSetFromStatus(status) {
  const ids = new Set();
  (status?.queued || []).forEach(t => ids.add(String(t.sourceId)));
  return ids;
}

function runningSetFromStatus(status) {
  const ids = new Set();
  (status?.running || []).forEach(t => ids.add(String(t.sourceId)));
  return ids;
}

async function loadMappingSettingsForm() {
  const backendSel = document.getElementById('mappingSettingsBackendSelect');
  const batchSel = document.getElementById('mappingSettingsBatchModeSelect');
  if (!backendSel || !batchSel) return;

  try {
    const settings = await api.fetchSettings();
    backendSel.value = settings?.mappingBackend || 'cline';
    const mc = settings?.mappingMaxConcurrency;
    batchSel.value = (typeof mc === 'number' && mc > 1) ? 'parallel' : 'serial';
  } catch (e) {
    backendSel.value = 'cline';
    batchSel.value = 'serial';
  }
}

function initMappingSettingsModal() {
  const openBtn = document.getElementById('mappingSettingsBtn');
  const modalId = 'mappingSettingsModal';

  openBtn?.addEventListener('click', async () => {
    await loadMappingSettingsForm();
    openModal(modalId);
  });

  document.getElementById('mappingSettingsModalClose')?.addEventListener('click', () => closeModal(modalId));
  document.getElementById('mappingSettingsCancelBtn')?.addEventListener('click', () => closeModal(modalId));

  document.getElementById('mappingSettingsSaveBtn')?.addEventListener('click', async () => {
    const backend = document.getElementById('mappingSettingsBackendSelect')?.value || 'cline';
    const batchMode = document.getElementById('mappingSettingsBatchModeSelect')?.value === 'parallel' ? 'parallel' : 'serial';
    try {
      const base = await api.fetchSettings();
      const parallelDefault = Math.max(2, Math.floor(base?.maxAgentConcurrency || 3));
      const mappingMaxConcurrency = batchMode === 'parallel' ? parallelDefault : 1;
      await api.updateSettings({
        ...(base || {}),
        mappingBackend: backend,
        mappingMaxConcurrency
      });
      closeModal(modalId);
    } catch (e) {
      showError('保存失败: ' + (e?.message || String(e)));
    }
  });

  window.addEventListener('click', (e) => {
    const overlay = document.getElementById(modalId);
    if (e.target === overlay) closeModal(modalId);
  });
}

async function refreshSources() {
  const [data, qs] = await Promise.allSettled([
    api.fetchMappingSources(),
    api.fetchMappingQueueStatus()
  ]);
  if (qs.status === 'fulfilled') queueStatusCache = qs.value;
  if (data.status !== 'fulfilled') throw data.reason;
  const payload = data.value;
  sourcesCache = Array.isArray(payload.sources) ? payload.sources : [];
  reconcilePendingWithServer();
  renderSourcesTable();
  startOrStopSourcesPolling();
}

function setToggleBtnImmediate(btn, mode) {
  if (!btn) return;
  const isStopping = mode === 'stopping';
  btn.disabled = true;
  btn.classList.remove('btn-run', 'btn-stop');
  btn.classList.add(isStopping ? 'btn-stop' : 'btn-stop'); // starting also shows stop icon (it's about "click again to stop")
  btn.title = isStopping ? '停止中...' : '提交中...';
  btn.setAttribute('aria-label', '停止');
  btn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="2"></rect></svg>`;
}

function clearToggleBtnImmediate(btn, isRunning) {
  if (!btn) return;
  btn.disabled = false;
  btn.classList.remove('btn-run', 'btn-stop');
  btn.classList.add(isRunning ? 'btn-stop' : 'btn-run');
  btn.title = isRunning ? '停止' : '分析';
  btn.setAttribute('aria-label', isRunning ? '停止' : '分析');
  btn.innerHTML = isRunning
    ? `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="2"></rect></svg>`
    : `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.53.85l10-6.5a1 1 0 0 0 0-1.7l-10-6.5A1 1 0 0 0 8 5.5z"></path></svg>`;
}

function reconcilePendingWithServer() {
  if (runPending.size === 0) return;
  const now = Date.now();
  for (const [id, p] of runPending.entries()) {
    const s = (sourcesCache || []).find(x => String(x.id) === String(id));
    const st = s?.lastRun?.status || 'idle';
    if (p?.mode === 'starting') {
      // Once server reports running/success/failed, stop pending.
      if (st === 'running' || st === 'success' || st === 'failed') {
        runPending.delete(id);
        continue;
      }
      // Safety: clear after 15s.
      if (p?.ts && (now - p.ts) > 15_000) runPending.delete(id);
    } else if (p?.mode === 'stopping') {
      // Once server reports not running, stop pending.
      if (st !== 'running') {
        runPending.delete(id);
        continue;
      }
      if (p?.ts && (now - p.ts) > 15_000) runPending.delete(id);
    }
  }
}

function hasRunningSources() {
  const running = (sourcesCache || []).some(s => s?.lastRun?.status === 'running') || runPending.size > 0;
  const queued = (queueStatusCache?.queued || []).length > 0;
  return running || queued;
}

function startOrStopSourcesPolling(forceStart = false) {
  const should = forceStart || hasRunningSources();
  if (!should) {
    if (sourcesPollTimer) clearInterval(sourcesPollTimer);
    sourcesPollTimer = null;
    return;
  }
  if (sourcesPollTimer) return;
  sourcesPollTimer = setInterval(() => {
    if (!hasRunningSources()) {
      if (sourcesPollTimer) clearInterval(sourcesPollTimer);
      sourcesPollTimer = null;
      return;
    }
    refreshSources().catch(() => {});
  }, 2000);
}

function parseCsv(text) {
  // Minimal CSV parser (supports commas + quoted fields).
  const rows = [];
  let cur = '';
  let inQuotes = false;
  const cells = [];
  const flushCell = () => { cells.push(cur); cur = ''; };
  const flushRow = () => {
    if (cells.length === 0) return;
    rows.push(cells.splice(0, cells.length).map(s => s.trim()));
  };

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      const next = text[i + 1];
      if (inQuotes && next === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (!inQuotes && (ch === ',')) {
      flushCell();
      continue;
    }
    if (!inQuotes && (ch === '\n' || ch === '\r')) {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      flushCell();
      flushRow();
      continue;
    }
    cur += ch;
  }
  flushCell();
  flushRow();

  if (rows.length === 0) return [];

  // Detect header.
  const header = rows[0].map(h => h.toLowerCase());
  const hasHeader = header.includes('giturl') || header.includes('url') || header.includes('repo') || header.includes('name');
  const dataRows = hasHeader ? rows.slice(1) : rows;

  const idx = (key) => header.indexOf(key);
  const urlIdx = hasHeader ? (idx('giturl') !== -1 ? idx('giturl') : (idx('url') !== -1 ? idx('url') : idx('repo'))) : 1;
  const nameIdx = hasHeader ? idx('name') : 0;
  const branchIdx = hasHeader ? idx('branch') : 2;

  return dataRows
    .map(r => {
      const gitUrl = normalizeRepoUrl(r[urlIdx] || r[1] || '');
      const name = (r[nameIdx] || r[0] || '').trim();
      const branch = (r[branchIdx] || r[2] || '').trim();
      return { gitUrl, name, branch };
    })
    .filter(x => x.gitUrl);
}

function renderSourcesTable() {
  const tbody = document.getElementById('sourcesTableBody');
  if (!tbody) return;

  const queuedIds = queuedSetFromStatus(queueStatusCache);

  const q = (document.getElementById('sourceSearch')?.value || '').trim().toLowerCase();
  const enabledFilter = document.getElementById('sourceEnabled')?.value || '';

  const all = sourcesCache || [];
  const filtered = all.filter(s => {
    if (q) {
      const hay = `${s.name || ''} ${s.gitUrl || ''}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (enabledFilter === 'enabled' && !s.enabled) return false;
    if (enabledFilter === 'disabled' && s.enabled) return false;
    return true;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="empty-state">
          <p>暂无分析仓库</p>
          <p class="empty-hint">点击右上角“导入 CSV”或“手动添加”</p>
        </td>
      </tr>
    `;
    return;
  }

  const esc = (s) => String(s ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

  tbody.innerHTML = filtered.map(s => {
    const shortUrl = (s.gitUrl || '').replace(/^https?:\/\//, '').replace(/\.git$/, '');
    const lastRun = s.lastRun?.endedAt ? new Date(s.lastRun.endedAt).toLocaleString('zh-CN') : (s.lastRun?.startedAt ? new Date(s.lastRun.startedAt).toLocaleString('zh-CN') : '-');
    const pending = runPending.get(String(s.id));
    let status = pending?.mode === 'starting' ? 'running' : (s.lastRun?.status || 'idle');
    if (!pending && status !== 'running' && queuedIds.has(String(s.id))) status = 'waiting';
    const isRunning = (status === 'running') || pending?.mode === 'stopping';
    const statusClass =
      status === 'success' ? 'status-success'
        : (status === 'failed' ? 'status-failed'
          : (status === 'running' ? 'status-converting' : (status === 'waiting' ? 'status-waiting' : 'status-pending')));
    return `
      <tr>
        <td class="td-center">
          <label class="checkbox-label" style="justify-content:center; margin:0;">
            <input type="checkbox" class="source-enabled" data-id="${esc(s.id)}" ${s.enabled ? 'checked' : ''}>
          </label>
        </td>
        <td><strong>${esc(s.name || deriveNameFromUrl(s.gitUrl))}</strong></td>
        <td><span title="${esc(s.gitUrl)}">${esc(shortUrl)}</span></td>
        <td class="td-center">${esc(s.branch || '-')}</td>
        <td class="td-center"><span class="status-badge ${statusClass}">${esc(status)}</span></td>
        <td class="td-center">${esc(lastRun)}</td>
        <td>
          <div class="actions">
            <button class="btn btn-small btn-icon ${isRunning ? 'btn-stop' : 'btn-run'} toggle-run" data-id="${esc(s.id)}" ${pending ? 'disabled' : ''} title="${pending ? (pending.mode === 'starting' ? '提交中...' : '停止中...') : (isRunning ? '停止' : '分析')}" aria-label="${isRunning ? '停止' : '分析'}">
              ${isRunning
                ? `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="2"></rect></svg>`
                : `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.53.85l10-6.5a1 1 0 0 0 0-1.7l-10-6.5A1 1 0 0 0 8 5.5z"></path></svg>`}
            </button>
            <button class="btn btn-small btn-secondary view-result" data-id="${esc(s.id)}">结果</button>
            <button class="btn btn-small btn-secondary view-log" data-id="${esc(s.id)}">日志</button>
            <button class="btn btn-small btn-ghost-danger remove-source" data-id="${esc(s.id)}" title="移除该仓库（不可恢复）">移除</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('visible');
  modal.style.display = 'block';
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('visible');
  setTimeout(() => { modal.style.display = 'none'; }, 200);
}

function initTabs() {
  const tabs = Array.from(document.querySelectorAll('.mtab'));
  const panels = {
    sources: document.getElementById('tabSources'),
    global: document.getElementById('tabGlobal')
  };
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const key = btn.dataset.tab;
      Object.entries(panels).forEach(([k, el]) => {
        if (!el) return;
        el.classList.toggle('active', k === key);
      });
      if (key === 'sources') renderSourcesTable();
      if (key === 'global') refreshGlobalIndex();
    });
  });
}

function initSourcesUi() {
  const importBtn = document.getElementById('importCsvBtn');
  const fileInput = document.getElementById('csvFileInput');
  const addBtn = document.getElementById('addSourceBtn');
  const runAllBtn = document.getElementById('runAllSourcesBtn');
  const cancelAllBtn = document.getElementById('cancelAllSourcesBtn');

  importBtn?.addEventListener('click', () => fileInput?.click());
  fileInput?.addEventListener('change', async () => {
    const f = fileInput.files?.[0];
    if (!f) return;
    try {
      const text = await f.text();
      // 导入 CSV 时，后端应该默认设置 enabled: false
      await api.importMappingSourcesCsv(text);
      await refreshSources();
    } catch (e) {
      showError('导入 CSV 失败: ' + (e?.message || String(e)));
    } finally {
      fileInput.value = '';
    }
  });

  addBtn?.addEventListener('click', () => {
    document.getElementById('sourceNameInput').value = '';
    document.getElementById('sourceUrlInput').value = '';
    document.getElementById('sourceBranchInput').value = '';
    openModal('addSourceModal');
    setTimeout(() => document.getElementById('sourceUrlInput')?.focus(), 100);
  });

  document.getElementById('addSourceModalClose')?.addEventListener('click', () => closeModal('addSourceModal'));
  document.getElementById('cancelAddSourceBtn')?.addEventListener('click', () => closeModal('addSourceModal'));
  document.getElementById('confirmAddSourceBtn')?.addEventListener('click', async () => {
    const name = document.getElementById('sourceNameInput')?.value?.trim() || '';
    const gitUrl = normalizeRepoUrl(document.getElementById('sourceUrlInput')?.value?.trim() || '');
    const branch = document.getElementById('sourceBranchInput')?.value?.trim() || '';
    if (!gitUrl) {
      showError('请输入仓库地址');
      return;
    }
    try {
      await api.createMappingSource({ name, gitUrl, branch, enabled: false });
      closeModal('addSourceModal');
      await refreshSources();
    } catch (e) {
      showError('添加失败: ' + (e?.message || String(e)));
    }
  });

  document.getElementById('sourceSearch')?.addEventListener('input', () => renderSourcesTable());
  document.getElementById('sourceEnabled')?.addEventListener('change', () => renderSourcesTable());

  document.getElementById('sourcesTableBody')?.addEventListener('change', (e) => {
    const cb = e.target.closest?.('input.source-enabled');
    if (!cb) return;
    const id = cb.dataset.id;
    api.updateMappingSource(id, { enabled: cb.checked })
      .then(() => refreshSources())
      .catch(err => showError('更新失败: ' + (err?.message || String(err))));
  });

  document.getElementById('sourcesTableBody')?.addEventListener('click', (e) => {
    const toggleBtn = e.target.closest?.('button.toggle-run');
    const resultBtn = e.target.closest?.('button.view-result');
    const logBtn = e.target.closest?.('button.view-log');
    const delBtn = e.target.closest?.('button.remove-source');
    if (toggleBtn) {
      const id = toggleBtn.dataset.id;
      const s = (sourcesCache || []).find(x => String(x.id) === String(id));
      const status = s?.lastRun?.status || 'idle';
      const isRunning = status === 'running';

      // Optimistic UI: mark pending immediately and re-render to avoid "flash + can't click"
      runPending.set(String(id), { mode: isRunning ? 'stopping' : 'starting', ts: Date.now() });
      // Update the clicked button immediately (avoid whole-table redraw which can "flash")
      setToggleBtnImmediate(toggleBtn, isRunning ? 'stopping' : 'starting');
      startOrStopSourcesPolling(true);

      const op = isRunning ? api.cancelMappingSource(id) : api.runMappingSource(id);
      op
        .then(() => refreshSources())
        .catch(err => showError((isRunning ? '停止失败: ' : '启动失败: ') + (err?.message || String(err))))
        .finally(() => {
          // Do NOT clear pending immediately; wait until server state reflects the change.
          startOrStopSourcesPolling(true);
          // Best-effort: if pending got cleared by reconcile, re-enable with correct icon.
          const s2 = (sourcesCache || []).find(x => String(x.id) === String(id));
          const st2 = s2?.lastRun?.status || 'idle';
          if (!runPending.has(String(id))) clearToggleBtnImmediate(toggleBtn, st2 === 'running');
        });
      return;
    }
    if (resultBtn) {
      const id = resultBtn.dataset.id;
      window.location.href = `/mapping-result.html?sourceId=${encodeURIComponent(id)}`;
      return;
    }
    if (logBtn) {
      const id = logBtn.dataset.id;
      openMappingLog(id);
      return;
    }
    if (delBtn) {
      const id = delBtn.dataset.id;
      if (!confirm('确定要移除该分析仓库吗？')) return;
      api.deleteMappingSource(id)
        .then(() => refreshSources())
        .catch(err => showError('移除失败: ' + (err?.message || String(err))));
    }
  });

  runAllBtn?.addEventListener('click', () => {
    const enabled = (sourcesCache || []).filter(s => s.enabled);
    if (enabled.length === 0) {
      showError('没有启用的分析仓库');
      return;
    }
    if (!confirm(`确定要批量启动 ${enabled.length} 个仓库的映射分析吗？将进入队列。`)) return;
    Promise.allSettled(enabled.map(s => api.runMappingSource(s.id)))
      .then(() => refreshSources())
      .catch(() => refreshSources());
  });

  cancelAllBtn?.addEventListener('click', async () => {
    const runningCount = (queueStatusCache?.running || []).length;
    const queuedCount = (queueStatusCache?.queued || []).length;
    if (runningCount === 0 && queuedCount === 0) {
      showError('当前没有批量任务在运行或排队');
      return;
    }
    if (!confirm(`确定要停止批量执行吗？将终止 ${runningCount} 个运行中任务，并将 ${queuedCount} 个等待任务标记为失败。`)) return;
    try {
      await api.cancelAllMappingQueue();
      await refreshSources();
    } catch (e) {
      showError('停止批量执行失败: ' + (e?.message || String(e)));
    }
  });

  // Click outside modal to close.
  window.addEventListener('click', (e) => {
    const overlay = document.getElementById('addSourceModal');
    if (e.target === overlay) closeModal('addSourceModal');
  });
}

function init() {
  initTabs();
  initSourcesUi();
  initMappingSettingsModal();
  refreshSources().catch(err => showError('加载分析仓库失败: ' + (err?.message || String(err))));
  // Keep list synced while tasks are running.
  startOrStopSourcesPolling(true);

  // Global table demo: show how field/enum mapping is displayed.
  document.getElementById('demoEntryBtn')?.addEventListener('click', () => {
    openMappingDetail(getDemoEntry());
  });

  // Mapping detail modal close.
  document.getElementById('mappingDetailClose')?.addEventListener('click', () => closeModal('mappingDetailModal'));
  window.addEventListener('click', (e) => {
    const overlay = document.getElementById('mappingDetailModal');
    if (e.target === overlay) closeModal('mappingDetailModal');
  });

  // Mapping review modal
  document.getElementById('mappingReviewClose')?.addEventListener('click', () => closeModal('mappingReviewModal'));
  document.getElementById('reviewCancelBtn')?.addEventListener('click', () => closeModal('mappingReviewModal'));
  document.getElementById('reviewSaveBtn')?.addEventListener('click', () => saveReview());
  window.addEventListener('click', (e) => {
    const overlay = document.getElementById('mappingReviewModal');
    if (e.target === overlay) closeModal('mappingReviewModal');
  });

  // Mapping log modal
  document.getElementById('mappingLogClose')?.addEventListener('click', () => closeMappingLog());
  document.getElementById('mappingLogRefreshBtn')?.addEventListener('click', () => {
    const id = document.getElementById('mappingLogModal')?.dataset?.sourceId;
    if (id) refreshMappingLog(id);
  });
  document.getElementById('mappingLogAutoRefresh')?.addEventListener('change', () => {
    const id = document.getElementById('mappingLogModal')?.dataset?.sourceId;
    if (!id) return;
    // Restart polling based on new checkbox state
    startOrStopMappingLogPolling(id);
  });
  window.addEventListener('click', (e) => {
    const overlay = document.getElementById('mappingLogModal');
    if (e.target === overlay) closeMappingLog();
  });
}

init();

function getDemoEntry() {
  return {
    androidSymbol: 'android.provider.MediaStore.Images.Media#EXTERNAL_CONTENT_URI',
    harmonyReplacement: { kind: 'kit', name: '@ohos.fileio (Media/PhotoAccessHelper)', details: 'Use PhotoAccessHelper to query media assets' },
    changeType: 'replace',
    confidence: 'medium',
    preconditions: { permissions: ['ohos.permission.READ_MEDIA'], ohosVersion: 'API 10+' },
    requiredDeps: { ohpm: ['@ohos.fileio'], maven: [], git: [] },
    fieldMappings: [
      { androidField: 'MediaStore.Images.Media.DATA', harmonyField: 'PhotoAsset.uri', note: 'DATA is deprecated; use asset uri + openFileDescriptor/read' },
      { androidField: 'MediaStore.MediaColumns.DATE_ADDED', harmonyField: 'PhotoKeys.DATE_ADDED', note: '' }
    ],
    enumMappings: [
      { androidEnum: 'MediaStore.Files.FileColumns.MEDIA_TYPE_IMAGE', harmonyEnum: 'PhotoType.IMAGE', note: '' },
      { androidEnum: 'MediaStore.Files.FileColumns.MEDIA_TYPE_VIDEO', harmonyEnum: 'PhotoType.VIDEO', note: '' }
    ],
    codeSnippets: {
      before: 'val uri = MediaStore.Images.Media.EXTERNAL_CONTENT_URI\nval cursor = contentResolver.query(uri, projection, null, null, null)',
      after: 'const helper = photoAccessHelper.getPhotoAccessHelper(context)\nconst fetchResult = await helper.getAssets({ selections: [], order: [] })',
      notes: '示例代码为概念说明，后端接入后会展示真实片段'
    },
    limitations: ['API 行为差异：文件路径不可直接获取，需要通过 uri 读取'],
    testGuidance: { type: 'manual', steps: ['授权媒体读取权限', '打开相册选择图片', '验证读取到的 uri 可正常访问'] },
    sources: [
      { repoId: 'demo-repo-1', repoUrl: 'https://example.com/repo1', filePath: 'android/src/main/...', snippet: '...MediaStore...', confidence: 'medium' },
      { repoId: 'demo-repo-2', repoUrl: 'https://example.com/repo2', filePath: 'android/src/main/...', snippet: '...MEDIA_TYPE_IMAGE...', confidence: 'low' }
    ]
  };
}

function openMappingDetail(entry) {
  if (!entry) return;

  const title = document.getElementById('mappingDetailTitle');
  const meta = document.getElementById('mappingDetailMeta');
  const views = {
    summary: document.getElementById('mdViewSummary'),
    field: document.getElementById('mdViewField'),
    enum: document.getElementById('mdViewEnum'),
    evidence: document.getElementById('mdViewEvidence')
  };

  if (title) title.textContent = `映射详情：${entry.androidSymbol || ''}`;

  const pill = (label, value) => `<span class="meta-pill">${label}<strong>${escapeHtml(value || '-')}</strong></span>`;
  if (meta) {
    meta.innerHTML = [
      pill('变更类型 ', entry.changeType),
      pill('置信度 ', entry.confidence),
      pill('替代项 ', entry.harmonyReplacement?.name || ''),
      pill('来源 ', Array.isArray(entry.sources) ? `${entry.sources.length} 个仓` : '-')
    ].join('');
  }

  // Summary view
  if (views.summary) {
    views.summary.innerHTML = `
      <div class="md-section">
        <div class="md-section-title">核心信息</div>
        <div class="md-kv">
          <div class="k">Android Symbol</div><div class="v"><code>${escapeHtml(entry.androidSymbol)}</code></div>
          <div class="k">Harmony Replacement</div><div class="v"><code>${escapeHtml(entry.harmonyReplacement?.name || '')}</code> ${entry.harmonyReplacement?.details ? `<div class="text-muted">${escapeHtml(entry.harmonyReplacement.details)}</div>` : ''}</div>
          <div class="k">Change Type</div><div class="v"><code>${escapeHtml(entry.changeType || '')}</code></div>
          <div class="k">Permissions</div><div class="v">${escapeHtml((entry.preconditions?.permissions || []).join(', ') || '-')}</div>
          <div class="k">依赖（ohpm）</div><div class="v">${escapeHtml((entry.requiredDeps?.ohpm || []).join(', ') || '-')}</div>
        </div>
      </div>
      <div class="md-section">
        <div class="md-section-title">代码片段</div>
        ${entry.codeSnippets?.before ? `<div class="md-kv"><div class="k">Before</div><div class="v"><pre>${escapeHtml(entry.codeSnippets.before)}</pre></div></div>` : `<div class="md-empty">暂无</div>`}
        ${entry.codeSnippets?.after ? `<div class="md-kv" style="margin-top:10px;"><div class="k">After</div><div class="v"><pre>${escapeHtml(entry.codeSnippets.after)}</pre></div></div>` : ''}
      </div>
    `;
  }

  // Field mappings
  if (views.field) {
    const rows = Array.isArray(entry.fieldMappings) ? entry.fieldMappings : [];
    views.field.innerHTML = rows.length === 0
      ? `<div class="md-empty">该条目未提供字段映射（后端接入后，将从分析结果中展示）。</div>`
      : `
        <table class="md-table">
          <thead><tr><th>Android 字段</th><th>Harmony 字段</th><th>说明</th></tr></thead>
          <tbody>
            ${rows.map(r => `<tr><td><code>${escapeHtml(r.androidField || '')}</code></td><td><code>${escapeHtml(r.harmonyField || '')}</code></td><td>${escapeHtml(r.note || '')}</td></tr>`).join('')}
          </tbody>
        </table>
      `;
  }

  // Enum mappings
  if (views.enum) {
    const rows = Array.isArray(entry.enumMappings) ? entry.enumMappings : [];
    views.enum.innerHTML = rows.length === 0
      ? `<div class="md-empty">该条目未提供枚举映射（后端接入后，将从分析结果中展示）。</div>`
      : `
        <table class="md-table">
          <thead><tr><th>Android 枚举</th><th>Harmony 枚举</th><th>说明</th></tr></thead>
          <tbody>
            ${rows.map(r => `<tr><td><code>${escapeHtml(r.androidEnum || '')}</code></td><td><code>${escapeHtml(r.harmonyEnum || '')}</code></td><td>${escapeHtml(r.note || '')}</td></tr>`).join('')}
          </tbody>
        </table>
      `;
  }

  // Evidence / sources
  if (views.evidence) {
    const sources = Array.isArray(entry.sources) ? entry.sources : [];
    views.evidence.innerHTML = sources.length === 0
      ? `<div class="md-empty">暂无来源信息。</div>`
      : `
        <table class="md-table">
          <thead><tr><th>仓库</th><th>文件</th><th>片段</th><th>置信度</th></tr></thead>
          <tbody>
            ${sources.map(s => `
              <tr>
                <td>${escapeHtml(s.repoUrl || s.repoId || '')}</td>
                <td><code>${escapeHtml(s.filePath || '')}</code></td>
                <td>${escapeHtml((s.snippet || '').slice(0, 160))}${(s.snippet || '').length > 160 ? '…' : ''}</td>
                <td><code>${escapeHtml(s.confidence || '')}</code></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
  }

  initDetailTabs();
  openModal('mappingDetailModal');
}

function initDetailTabs() {
  const tabs = Array.from(document.querySelectorAll('#mappingDetailTabs .mdtab'));
  const views = {
    summary: document.getElementById('mdViewSummary'),
    field: document.getElementById('mdViewField'),
    enum: document.getElementById('mdViewEnum'),
    evidence: document.getElementById('mdViewEvidence')
  };
  tabs.forEach(btn => {
    btn.onclick = () => {
      tabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const key = btn.dataset.view;
      Object.entries(views).forEach(([k, el]) => el?.classList.toggle('active', k === key));
    };
  });
}

function escapeHtml(s) {
  return String(s ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

async function openMappingLog(sourceId) {
  const modal = document.getElementById('mappingLogModal');
  if (modal) modal.dataset.sourceId = sourceId;
  openModal('mappingLogModal');
  await refreshMappingLog(sourceId);
  startOrStopMappingLogPolling(sourceId);
}

async function refreshMappingLog(sourceId) {
  const out = document.getElementById('mappingLogOutput');
  const status = document.getElementById('mappingLogStatus');
  if (out) out.textContent = '加载中...';
  try {
    const resp = await fetch(`http://localhost:3020/api/mapping/sources/${encodeURIComponent(sourceId)}/log`);
    if (!resp.ok) {
      const msg = await resp.text();
      throw new Error(msg || '日志不存在');
    }
    const text = await resp.text();
    if (out) out.textContent = text || '(空日志)';
    if (status) status.textContent = '日志加载成功';
  } catch (e) {
    if (out) out.textContent = e?.message || String(e);
    if (status) status.textContent = '日志加载失败';
  }
}

function closeMappingLog() {
  stopMappingLogPolling();
  closeModal('mappingLogModal');
}

function stopMappingLogPolling() {
  if (mappingLogPollTimer) {
    clearInterval(mappingLogPollTimer);
    mappingLogPollTimer = null;
  }
}

function startOrStopMappingLogPolling(sourceId) {
  stopMappingLogPolling();
  const cb = document.getElementById('mappingLogAutoRefresh');
  const enabled = !!cb?.checked;
  if (!enabled) return;
  // Poll every 1.5s; cheap and feels real-time for logs.
  mappingLogPollTimer = setInterval(() => {
    const modal = document.getElementById('mappingLogModal');
    const currentId = modal?.dataset?.sourceId;
    if (!currentId) return;
    refreshMappingLog(currentId);
  }, 1500);
}

// ── Global index ──
async function refreshGlobalIndex() {
  try {
    const resp = await api.fetchMappingIndex();
    globalIndexCache = Array.isArray(resp.items) ? resp.items : [];
    globalConflictsCache = Array.isArray(resp.conflicts) ? resp.conflicts : [];
    renderGlobalIndexTable();
  } catch (e) {
    globalIndexCache = [];
    globalConflictsCache = [];
    // keep existing empty-state row; also show toast
    showError(e?.message || String(e));
  }
}

function renderGlobalIndexTable() {
  const tbody = document.getElementById('mappingTableBody');
  if (!tbody) return;

  const q = (document.getElementById('filterSearch')?.value || '').trim().toLowerCase();
  const reviewFilter = document.getElementById('filterReview')?.value || '';
  const changeType = document.getElementById('filterChangeType')?.value || '';
  const confidence = document.getElementById('filterConfidence')?.value || '';
  const conflictsOnly = !!document.getElementById('filterConflictsOnly')?.checked;

  const conflictSymbols = conflictsOnly
    ? new Set((globalConflictsCache || []).map(c => String(c.androidSymbol || '').trim()).filter(Boolean))
    : null;

  const items = (globalIndexCache || []).filter(m => {
    if (conflictSymbols && !conflictSymbols.has(String(m.androidSymbol || '').trim())) return false;
    if (q) {
      const hay = `${m.androidSymbol || ''} ${m.harmonyReplacement?.name || ''} ${m.harmonyReplacement?.details || ''} ${m.rationale || ''}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (reviewFilter) {
      const st = String(m.review?.status || 'unreviewed');
      if (st !== String(reviewFilter)) return false;
    }
    if (changeType && String(m.changeType) !== String(changeType)) return false;
    if (confidence && String(m.confidence) !== String(confidence)) return false;
    return true;
  });

  const count = document.getElementById('filterResultCount');
  if (count) count.textContent = items.length ? `${items.length} 条` : '';

  if (items.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="empty-state">
          <p>汇总映射表还没有数据</p>
          <p class="empty-hint">请先在“分析仓库”里对至少一个仓库运行成功，然后返回此页。</p>
        </td>
      </tr>
    `;
    return;
  }

  const esc = (s) => String(s ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
  tbody.innerHTML = items.map((m, idx) => {
    const sourcesCount = Array.isArray(m.sources) ? m.sources.length : 0;
    const reviewStatus = String(m.review?.status || 'unreviewed');
    const reviewBadgeClass =
      reviewStatus === 'approved' ? 'status-success'
        : (reviewStatus === 'needs_changes' ? 'status-warning'
          : (reviewStatus === 'rejected' ? 'status-failed' : 'status-pending'));
    return `
      <tr>
        <td><code>${esc(m.androidSymbol || '')}</code></td>
        <td><code>${esc(m.harmonyReplacement?.name || '')}</code></td>
        <td class="td-center"><code>${esc(m.changeType || '')}</code></td>
        <td class="td-center">${sourcesCount}</td>
        <td class="td-center"><span class="status-badge ${reviewBadgeClass}">${esc(reviewStatus)}</span></td>
        <td class="td-center">
          <div class="actions" style="justify-content:center;">
            <button class="btn btn-small btn-secondary open-global" data-idx="${idx}">详情</button>
            <button class="btn btn-small btn-primary open-review" data-idx="${idx}">审核</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  tbody.querySelectorAll('button.open-global').forEach(btn => {
    btn.onclick = () => {
      const idx = Number(btn.dataset.idx);
      const m = items[idx];
      if (!m) return;
      const entry = adaptGlobalIndexEntryForDetail(m);
      openMappingDetail(entry);
    };
  });

  tbody.querySelectorAll('button.open-review').forEach(btn => {
    btn.onclick = () => {
      const idx = Number(btn.dataset.idx);
      const m = items[idx];
      if (!m) return;
      openReviewModal(m);
    };
  });
}

function adaptGlobalIndexEntryForDetail(m) {
  const sources = (Array.isArray(m.sources) ? m.sources : []).map(s => ({
    repoId: s.sourceId,
    repoUrl: s.gitUrl,
    filePath: s.evidence?.filePath || '',
    snippet: s.evidence?.snippet || '',
    confidence: m.confidence
  }));
  return {
    androidSymbol: m.androidSymbol,
    harmonyReplacement: m.harmonyReplacement,
    changeType: m.changeType,
    confidence: m.confidence,
    preconditions: m.preconditions,
    requiredDeps: m.requiredDeps,
    fieldMappings: m.fieldMappings,
    enumMappings: m.enumMappings,
    codeSnippets: m.codeSnippets,
    limitations: m.limitations,
    testGuidance: m.testGuidance,
    sources
  };
}

// Wire global filters to rerender
document.getElementById('filterSearch')?.addEventListener('input', () => renderGlobalIndexTable());
document.getElementById('filterReview')?.addEventListener('change', () => renderGlobalIndexTable());
document.getElementById('filterChangeType')?.addEventListener('change', () => renderGlobalIndexTable());
document.getElementById('filterConfidence')?.addEventListener('change', () => renderGlobalIndexTable());
document.getElementById('filterConflictsOnly')?.addEventListener('change', () => renderGlobalIndexTable());

// ── Review modal logic ──
let currentReviewKey = null;

function openReviewModal(mappingItem) {
  currentReviewKey = mappingItem.key;
  document.getElementById('mappingReviewTitle').textContent = `审核：${mappingItem.androidSymbol || ''}`;
  document.getElementById('reviewStatus').value = String(mappingItem.review?.status || 'unreviewed');
  document.getElementById('reviewReviewer').value = String(mappingItem.review?.reviewer || '');
  document.getElementById('reviewNotes').value = String(mappingItem.review?.notes || '');
  document.getElementById('reviewFinalOverride').value = mappingItem.review?.finalOverride ? JSON.stringify(mappingItem.review.finalOverride, null, 2) : '';
  openModal('mappingReviewModal');
}

async function saveReview() {
  const key = currentReviewKey;
  if (!key) return;

  const status = document.getElementById('reviewStatus').value;
  const reviewer = document.getElementById('reviewReviewer').value;
  const notes = document.getElementById('reviewNotes').value;
  const overrideText = document.getElementById('reviewFinalOverride').value.trim();
  let finalOverride = null;
  if (overrideText) {
    try {
      finalOverride = JSON.parse(overrideText);
    } catch (e) {
      showError('finalOverride JSON 解析失败: ' + (e?.message || String(e)));
      return;
    }
  }

  try {
    await api.updateMappingReview(key, { status, reviewer, notes, ...(finalOverride ? { finalOverride } : {}) });
    closeModal('mappingReviewModal');
    await refreshGlobalIndex();
  } catch (e) {
    showError(e?.message || String(e));
  }
}

