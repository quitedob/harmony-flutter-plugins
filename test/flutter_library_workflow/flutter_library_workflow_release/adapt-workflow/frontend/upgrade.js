import { showError } from './js/utils.js';
import * as api from './js/api.js';
import { initSettingsModal } from './js/settings-modal.js';
// 复用适配列表的选择状态原语（js/state.js 里的 selectedIds 是通用 id 集合，与 plugins 解耦）
import { selectedIds, toggleSelected, setSelectedAll, clearSelected } from './js/state.js';

// ── Upgrade library page controller ──
// UX layout mirrors the 鸿蒙化适配 list page (index.html + app.js + render.js):
//   - header-actions group holds the primary actions (添加升级库 / 一键克隆全部 / 批量升级 / 刷新)
//   - a 5-card stats section (总计 / 未克隆 / 运行中 / 升级完成 / 升级失败)
//   - a single filter-toolbar (search + result count + reset + 全部状态 select)
//   - per-row action buttons 开始升级 / 继续升级 / 查看详情 / 查看进度 driven by stage progress
// The page still manages THREE types (flutter/rn/sdk) as in-page tabs; the stats,
// filters and header actions all operate on the currently active tab (the
// "profile" equivalent). Fully decoupled from the 鸿蒙化 profile system.

const TABS = ['flutter', 'rn', 'sdk'];
const TYPE_LABELS = { flutter: 'Flutter', rn: 'React Native', sdk: '原生 SDK' };
const FRAMEWORK_LABELS = { flutter: '目标Flutter框架版本（可选）', rn: '目标RN框架版本（可选）' };
const SELECTED_UPGRADE_TYPE_STORAGE_KEY = 'adaptWorkflow.selectedUpgradeType';

function getStoredUpgradeType() {
  try {
    const type = localStorage.getItem(SELECTED_UPGRADE_TYPE_STORAGE_KEY);
    return TABS.includes(type) ? type : 'flutter';
  } catch {
    return 'flutter';
  }
}

function storeUpgradeType(type) {
  try {
    localStorage.setItem(SELECTED_UPGRADE_TYPE_STORAGE_KEY, type);
  } catch {}
}

// Library type → upgrade profile id. The detail page (detail.html/detail.js,
// reused from the adaptation flow) is profile-driven, so we pin the matching
// upgrade profile via ?profileId= ; the backend then serves the library through
// the shared /api/plugins/:id/... contract (see routes/agent.js resolveWorkEntity).
const UPGRADE_PROFILE_BY_TYPE = { flutter: 'flutter-upgrade', rn: 'rn-upgrade', sdk: 'android-sdk-upgrade' };
function upgradeProfileIdFor(type) {
  return UPGRADE_PROFILE_BY_TYPE[type] || 'flutter-upgrade';
}

const STAGE_STATUS_TEXT = {
  idle: '等待中',
  running: '运行中',
  success: '已完成',
  failed: '失败',
  interrupted: '已中断',
  unknown: '未知'
};

let activeType = getStoredUpgradeType();
const filters = { search: '', status: '' };

let librariesCache = [];
let queueStatusCache = null;
let cloneBatchStatusCache = null;
let upgradePollTimer = null;
const runPending = new Map(); // libraryId -> { mode: 'starting'|'stopping', ts: number }
const clonePending = new Map(); // libraryId -> start timestamp

function normalizeRepoUrl(url) {
  return String(url || '').trim().replace(/\/+$/, '').replace(/\.git$/i, '');
}

function deriveNameFromUrl(url) {
  const u = normalizeRepoUrl(url);
  const m = u.match(/([^/]+?)(?:\.git)?$/);
  return m ? m[1] : '';
}

function escapeHtml(s) {
  return String(s ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
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

function queuedSetFromStatus(status) {
  const ids = new Set();
  (status?.queued || []).forEach(t => ids.add(String(t.libraryId)));
  return ids;
}

function runningSetFromStatus(status) {
  const ids = new Set();
  (status?.running || []).forEach(t => ids.add(String(t.libraryId)));
  return ids;
}

// ── Running detection (mirrors adaptation, which has no lastRun) ──
// lastRun.status is owned by the queued pipeline runner and is NOT updated by
// per-stage SSE execution, so it cannot be trusted to reflect running state.
// The single source of truth is whether any stage is currently executing
// (stageProgress.stages, derived from activeStages via detectStageStatus).
function isLibraryRunning(l) {
  return (l?.stageProgress?.stages || []).some(s => s.status === 'running');
}

// ── Status classification (mirrors adaptation render.js getOverallStatusKey) ──
// Each library maps to exactly one bucket — used for both the stats cards and
// the 全部状态 filter, so the two stay perfectly in sync.
function getOverallStatusKey(l, runningIds, queuedIds) {
  const id = String(l.id);
  const pending = runPending.get(id);
  const cloneStatus = l.clone?.status || 'idle';

  if (pending || isLibraryRunning(l) || runningIds.has(id)) return 'running';
  if (queuedIds.has(id)) return 'queued';
  if (cloneStatus !== 'cloned') return 'not_cloned';

  const sp = l.stageProgress || { completed: 0, total: 0, failed: 0 };
  if (sp.total > 0 && sp.completed >= sp.total) return 'success';
  if ((sp.failed || 0) > 0) return 'failed';
  return 'pending'; // 已克隆，尚未完成（待开始或继续）
}

// ── Optimistic run/stop button helpers (verbatim from mapping.js, renamed) ──

function setToggleBtnImmediate(btn, mode) {
  if (!btn) return;
  btn.disabled = true;
  btn.classList.remove('btn-run', 'btn-stop');
  btn.classList.add('btn-stop');
  btn.title = mode === 'stopping' ? '停止中...' : '提交中...';
  btn.setAttribute('aria-label', '停止');
  btn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="2"></rect></svg>`;
}

function clearToggleBtnImmediate(btn, isRunning) {
  if (!btn) return;
  btn.disabled = false;
  btn.classList.remove('btn-run', 'btn-stop');
  btn.classList.add(isRunning ? 'btn-stop' : 'btn-run');
  btn.title = isRunning ? '停止' : '升级';
  btn.setAttribute('aria-label', isRunning ? '停止' : '升级');
  btn.innerHTML = isRunning
    ? `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="2"></rect></svg>`
    : `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.53.85l10-6.5a1 1 0 0 0 0-1.7l-10-6.5A1 1 0 0 0 8 5.5z"></path></svg>`;
}

function reconcilePendingWithServer() {
  if (runPending.size === 0 && clonePending.size === 0) return;
  const now = Date.now();
  for (const [id, p] of runPending.entries()) {
    const l = (librariesCache || []).find(x => String(x.id) === String(id));
    const st = l?.lastRun?.status || 'idle';
    if (p?.mode === 'starting') {
      if (st === 'running' || st === 'success' || st === 'failed') {
        runPending.delete(id);
        continue;
      }
      if (p?.ts && (now - p.ts) > 15_000) runPending.delete(id);
    } else if (p?.mode === 'stopping') {
      if (st !== 'running') {
        runPending.delete(id);
        continue;
      }
      if (p?.ts && (now - p.ts) > 15_000) runPending.delete(id);
    }
  }

  for (const [id, startedAt] of clonePending.entries()) {
    const library = (librariesCache || []).find(x => String(x.id) === String(id));
    const status = library?.clone?.status || 'idle';
    if (status === 'cloned' || status === 'clone_failed' || (now - startedAt) > 10 * 60 * 1000) {
      clonePending.delete(id);
    }
  }
}

function hasRunningLibraries() {
  const stageRunning = (librariesCache || []).some(isLibraryRunning);
  const queued = (queueStatusCache?.queued || []).length > 0;
  const cloning = (librariesCache || []).some(l => l?.clone?.status === 'cloning');
  const batchCloning = cloneBatchStatusCache?.running === true;
  return stageRunning || runPending.size > 0 || clonePending.size > 0 || queued || cloning || batchCloning;
}

function startOrStopUpgradePolling(forceStart = false) {
  const should = forceStart || hasRunningLibraries();
  if (!should) {
    if (upgradePollTimer) clearInterval(upgradePollTimer);
    upgradePollTimer = null;
    return;
  }
  if (upgradePollTimer) return;
  upgradePollTimer = setInterval(() => {
    refreshLibraries().catch(() => {});
  }, 2000);
}

// ── Type switcher (same component as the 鸿蒙化 page's profile switcher,
//    but self-contained: no backend profile call, just in-page type switching) ──

function initTypeSwitcher() {
  const container = document.getElementById('typeSwitcher');
  if (!container) return;
  const panels = {
    flutter: document.getElementById('tabFlutter'),
    rn: document.getElementById('tabRn'),
    sdk: document.getElementById('tabSdk')
  };

  function selectType(key, clearSelection = true) {
    if (!TABS.includes(key)) return;
    container.querySelectorAll('.profile-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.type === key);
    });
    Object.entries(panels).forEach(([k, el]) => {
      if (el) el.classList.toggle('active', k === key);
    });
    activeType = key;
    storeUpgradeType(key);
    if (clearSelection) clearSelected();
    renderAll();
  }

  selectType(activeType, false);

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.profile-btn');
    if (!btn || btn.classList.contains('active')) return;
    // 切换类型（Tab）时清空多选，避免选中状态跨类型串扰
    selectType(btn.dataset.type);
  });
}

// ── Data refresh ──

async function refreshLibraries() {
  const [data, qs, cloneStatus] = await Promise.allSettled([
    api.fetchUpgradeLibraries(),
    api.fetchUpgradeQueueStatus(),
    api.getUpgradeBatchCloneStatus()
  ]);
  if (qs.status === 'fulfilled') {
    queueStatusCache = qs.value;
    updateQueueBar(queueStatusCache);
  }
  if (cloneStatus.status === 'fulfilled') cloneBatchStatusCache = cloneStatus.value;
  if (data.status !== 'fulfilled') throw data.reason;
  const payload = data.value;
  librariesCache = Array.isArray(payload.libraries) ? payload.libraries : [];
  reconcilePendingWithServer();
  renderAll();
  startOrStopUpgradePolling();
}

// ── Rendering (mirrors adaptation render.js: stats, filter result, table) ──

function renderAll() {
  updateStats();
  renderTable();
  updateFilterResultCount();
}

function getActiveLibraries() {
  return (librariesCache || []).filter(l => l.type === activeType);
}

function getFilteredLibraries() {
  const runningIds = runningSetFromStatus(queueStatusCache);
  const queuedIds = queuedSetFromStatus(queueStatusCache);
  const q = filters.search;
  return getActiveLibraries().filter(l => {
    if (q) {
      const hay = `${l.name || ''} ${l.repoUrl || ''} ${l.harmonizedRepoUrl || ''}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (filters.status) {
      const key = getOverallStatusKey(l, runningIds, queuedIds);
      if (key !== filters.status) return false;
    }
    return true;
  });
}

function updateStats() {
  const runningIds = runningSetFromStatus(queueStatusCache);
  const queuedIds = queuedSetFromStatus(queueStatusCache);
  const libs = getActiveLibraries();
  let running = 0, success = 0, failed = 0, notCloned = 0;
  for (const l of libs) {
    const key = getOverallStatusKey(l, runningIds, queuedIds);
    if (key === 'running') running++;
    else if (key === 'success') success++;
    else if (key === 'failed') failed++;
    else if (key === 'not_cloned') notCloned++;
  }
  setText('totalCount', libs.length);
  setText('notClonedCount', notCloned);
  setText('runningCount', running);
  setText('successCount', success);
  setText('failedCount', failed);
}

function updateQueueBar(status) {
  const running = (status && status.running) || [];
  const queued = (status && status.queued) || [];
  const completed = (status && status.recentCompleted) || [];

  const bar = document.getElementById('queueStatusBar');
  if (!bar) return;
  if (!status || (running.length === 0 && queued.length === 0 && completed.length === 0)) {
    bar.style.display = 'none';
    return;
  }
  bar.style.display = 'flex';
  setText('queueRunningCount', running.length);
  setText('queueWaitingCount', queued.length);
  setText('queueDoneCount', completed.length);
}

function updateFilterResultCount() {
  const el = document.getElementById('filterResultCount');
  if (!el) return;
  const hasFilter = filters.search !== '' || filters.status !== '';
  const total = getActiveLibraries().length;
  if (!hasFilter || total === 0) {
    el.textContent = '';
    return;
  }
  el.textContent = `${getFilteredLibraries().length} / ${total}`;
}

// 进度列：阶段圆点 + 文案（mirrors adaptation renderStageProgress）
function renderStageProgress(l) {
  const cloneStatus = l.clone?.status || 'idle';
  if (cloneStatus !== 'cloned') {
    return '<span class="text-muted">-</span>';
  }
  const sp = l.stageProgress || { completed: 0, total: 0, failed: 0, stages: [] };
  const total = sp.total || 0;
  const completed = sp.completed || 0;
  const stages = Array.isArray(sp.stages) ? sp.stages : [];

  const dots = stages.map(s => {
    const status = s.status || 'idle';
    const name = s.name || s.id;
    const statusText = STAGE_STATUS_TEXT[status] || status;
    return `<span class="stage-dot ${status}" title="${escapeHtml(name)}: ${escapeHtml(statusText)}"></span>`;
  }).join('');

  let text = '';
  if (isLibraryRunning(l)) {
    text = '<span class="stage-running-label"><span class="mini-spinner"></span>运行中</span>';
  } else if (total > 0 && completed >= total) {
    text = '<span class="text-success-sm">全部完成</span>';
  } else if (sp.failed > 0) {
    text = '<span class="text-danger-sm">有失败阶段</span>';
  } else if (completed > 0) {
    text = `${completed}/${total} 已完成`;
  } else {
    text = '待开始';
  }

  return `
    <div class="stage-progress">
      ${dots ? `<div class="stage-dots">${dots}</div>` : ''}
      <div class="stage-progress-text">${text}</div>
    </div>
  `;
}

function renderActionButtons(l, ctx) {
  const detailUrl = `/detail.html?id=${encodeURIComponent(l.id)}&profileId=${encodeURIComponent(upgradeProfileIdFor(l.type))}`;
  let buttons = '';

  const cloneStatus = l.clone?.status || 'idle';
  const pending = runPending.get(String(l.id));
  const isRunning = isLibraryRunning(l) || pending?.mode === 'stopping';
  const sp = l.stageProgress || { completed: 0, total: 0 };
  const allDone = sp.total > 0 && sp.completed >= sp.total;

  if (cloneStatus !== 'cloned') {
    // 未克隆 — 克隆按钮作为主操作（与适配的 "Clone 源码" 一致）
    if (cloneStatus === 'cloning') {
      buttons += `<button class="btn btn-small btn-primary loading" disabled><span class="spinner"></span> 克隆中...</button>`;
    } else {
      buttons += `<button class="btn btn-small btn-primary clone-library" data-id="${escapeHtml(l.id)}" title="克隆 harmonized + upstream">克隆</button>`;
    }
  } else {
    // 已克隆 — 与适配的 开始适配 / 继续适配 / 查看详情 / 查看进度 一致
    let label = '开始升级';
    let btnClass = 'btn-primary';
    if (isRunning) {
      label = '查看进度';
    } else if (allDone) {
      label = '查看详情';
      btnClass = 'btn-secondary';
    } else if (sp.completed > 0) {
      label = '继续升级';
    }
    buttons += `<a href="${detailUrl}" class="btn btn-small ${btnClass}">${label}</a>`;

    // 运行中追加停止按钮
    if (isRunning) {
      buttons += ` <button class="btn btn-small btn-icon btn-stop toggle-run" data-id="${escapeHtml(l.id)}" ${pending ? 'disabled' : ''} title="停止" aria-label="停止"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="2"></rect></svg></button>`;
    }

    // 打开目录（与适配一致）
    buttons += ` <button class="btn btn-small btn-secondary open-dir" data-id="${escapeHtml(l.id)}" title="打开本地目录">目录</button>`;
  }

  // 删除始终显示
  buttons += ` <button class="btn btn-small btn-danger remove-library" data-id="${escapeHtml(l.id)}" title="删除该升级库及其本地克隆目录">删除</button>`;

  return buttons;
}

function renderTable() {
  const type = activeType;
  const tbody = document.getElementById(`${type}TableBody`);
  if (!tbody) return;

  const runningIds = runningSetFromStatus(queueStatusCache);
  const queuedIds = queuedSetFromStatus(queueStatusCache);
  const ctx = { runningIds, queuedIds };

  const all = getActiveLibraries();
  const filtered = getFilteredLibraries();

  if (filtered.length === 0) {
    const colspan = type === 'sdk' ? 8 : 9; // +1 for the select checkbox column
    const isEmpty = all.length === 0;
    tbody.innerHTML = `
      <tr>
        <td colspan="${colspan}" class="empty-state">
          <p>${isEmpty ? `暂无${TYPE_LABELS[type]}升级库` : '没有匹配筛选条件的升级库'}</p>
          <p class="empty-hint">${isEmpty ? '点击右上角“添加升级库”' : '尝试调整筛选条件'}</p>
        </td>
      </tr>
    `;
    return;
  }

  const showFramework = type !== 'sdk';

  tbody.innerHTML = filtered.map(l => {
    const cloneStatus = l.clone?.status || 'idle';
    const cloneClass =
      cloneStatus === 'cloned' ? 'status-success'
        : (cloneStatus === 'clone_failed' ? 'status-failed'
          : (cloneStatus === 'cloning' ? 'status-converting' : 'status-pending'));
    const cloneLabel = cloneStatus === 'idle' ? '未克隆'
      : cloneStatus === 'cloning' ? '克隆中'
        : cloneStatus === 'cloned' ? '已克隆' : '失败';

    const statusKey = getOverallStatusKey(l, runningIds, queuedIds);
    const statusBadge = renderStatusBadge(statusKey);

    const lastRun = l.lastRun?.endedAt ? new Date(l.lastRun.endedAt).toLocaleString('zh-CN')
      : (l.lastRun?.startedAt ? new Date(l.lastRun.startedAt).toLocaleString('zh-CN') : '-');

    const frameworkCell = showFramework
      ? `<td class="td-center">${escapeHtml(l.targetFrameworkVersion || '-')}</td>`
      : '';

    return `
      <tr>
        <td class="td-checkbox"><input type="checkbox" class="row-checkbox" data-id="${escapeHtml(l.id)}" ${selectedIds.has(l.id) ? 'checked' : ''} aria-label="选择 ${escapeHtml(l.name || l.id)}"></td>
        <td><strong>${escapeHtml(l.name || deriveNameFromUrl(l.repoUrl))}</strong></td>
        <td class="td-center">${escapeHtml(l.targetOsVersion || '-')}</td>
        ${frameworkCell}
        <td class="td-center"><span class="status-badge ${cloneClass}" title="${escapeHtml(l.clone?.error || '')}">${escapeHtml(cloneLabel)}</span></td>
        <td class="td-center">${renderStageProgress(l)}</td>
        <td class="td-center">${statusBadge}</td>
        <td class="td-center">${escapeHtml(lastRun)}</td>
        <td>
          <div class="actions">
            ${renderActionButtons(l, ctx)}
          </div>
        </td>
      </tr>
    `;
  }).join('');
  syncSelectionUI();
}

function renderStatusBadge(key) {
  const map = {
    running: { cls: 'status-converting', label: '运行中' },
    queued: { cls: 'status-waiting', label: '排队中' },
    success: { cls: 'status-success', label: '升级完成' },
    failed: { cls: 'status-failed', label: '升级失败' },
    pending: { cls: 'status-pending', label: '待升级' },
    not_cloned: { cls: 'status-pending', label: '未克隆' }
  };
  const m = map[key] || { cls: 'status-pending', label: key };
  return `<span class="status-badge ${m.cls}">${escapeHtml(m.label)}</span>`;
}

// ── Add modal (shared, configured per active type) ──

function openAddModal(type) {
  const modal = document.getElementById('addUpgradeLibraryModal');
  if (!modal) return;
  modal.dataset.type = type;

  document.getElementById('addUpgradeTitle').textContent = `添加 ${TYPE_LABELS[type]} 升级库`;

  const fwGroup = document.getElementById('upgradeFrameworkGroup');
  const fwLabel = document.getElementById('upgradeFrameworkLabel');
  if (type === 'sdk') {
    fwGroup.style.display = 'none';
  } else {
    fwGroup.style.display = '';
    fwLabel.textContent = FRAMEWORK_LABELS[type] || '目标框架版本';
  }

  ['upgradeNameInput', 'upgradeRepoUrlInput', 'upgradeRepoBranchInput', 'upgradeHarmonizedUrlInput', 'upgradeHarmonizedBranchInput', 'upgradeTargetOsInput', 'upgradeTargetFrameworkInput']
    .forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });

  openModal('addUpgradeLibraryModal');
  setTimeout(() => document.getElementById('upgradeRepoUrlInput')?.focus(), 100);
}

function initAddModal() {
  document.getElementById('addUpgradeBtn')?.addEventListener('click', () => openAddModal(activeType));

  document.getElementById('addUpgradeModalClose')?.addEventListener('click', () => closeModal('addUpgradeLibraryModal'));
  document.getElementById('cancelAddUpgradeBtn')?.addEventListener('click', () => closeModal('addUpgradeLibraryModal'));

  document.getElementById('confirmAddUpgradeBtn')?.addEventListener('click', async () => {
    const modal = document.getElementById('addUpgradeLibraryModal');
    const type = modal?.dataset?.type || activeType;
    const name = document.getElementById('upgradeNameInput')?.value?.trim() || '';
    const repoUrl = normalizeRepoUrl(document.getElementById('upgradeRepoUrlInput')?.value?.trim() || '');
    const harmonizedRepoUrl = normalizeRepoUrl(document.getElementById('upgradeHarmonizedUrlInput')?.value?.trim() || '');
    const repoBranch = document.getElementById('upgradeRepoBranchInput')?.value?.trim() || '';
    const harmonizedBranch = document.getElementById('upgradeHarmonizedBranchInput')?.value?.trim() || '';
    const targetOsVersion = document.getElementById('upgradeTargetOsInput')?.value?.trim() || '';
    const targetFrameworkVersion = type === 'sdk' ? '' : (document.getElementById('upgradeTargetFrameworkInput')?.value?.trim() || '');

    if (!repoUrl) { showError('请输入仓库地址'); return; }
    if (!harmonizedRepoUrl) { showError('请输入已鸿蒙化插件仓库'); return; }
    // 分支可选（留空克隆默认分支）；目标OS版本、目标框架版本均为可选

    try {
      await api.createUpgradeLibrary({ type, name, repoUrl, harmonizedRepoUrl, repoBranch, harmonizedBranch, targetOsVersion, targetFrameworkVersion, enabled: true });
      closeModal('addUpgradeLibraryModal');
      await refreshLibraries();
    } catch (e) {
      showError('添加失败: ' + (e?.message || String(e)));
    }
  });

  window.addEventListener('click', (e) => {
    const overlay = document.getElementById('addUpgradeLibraryModal');
    if (e.target === overlay) closeModal('addUpgradeLibraryModal');
  });
}

// ── Edit modal ──

function openEditModal(library) {
  const modal = document.getElementById('editUpgradeLibraryModal');
  if (!modal || !library) return;
  modal.dataset.libraryId = String(library.id);
  modal.dataset.type = library.type;

  document.getElementById('editUpgradeTitle').textContent = `编辑 ${TYPE_LABELS[library.type] || ''} 升级库`;

  const fwGroup = document.getElementById('editUpgradeFrameworkGroup');
  const fwLabel = document.getElementById('editUpgradeFrameworkLabel');
  if (library.type === 'sdk') {
    fwGroup.style.display = 'none';
  } else {
    fwGroup.style.display = '';
    fwLabel.textContent = FRAMEWORK_LABELS[library.type] || '目标框架版本';
  }

  document.getElementById('editUpgradeNameInput').value = library.name || '';
  document.getElementById('editUpgradeRepoUrlInput').value = library.repoUrl || '';
  document.getElementById('editUpgradeRepoBranchInput').value = library.repoBranch || '';
  document.getElementById('editUpgradeHarmonizedUrlInput').value = library.harmonizedRepoUrl || '';
  document.getElementById('editUpgradeHarmonizedBranchInput').value = library.harmonizedBranch || '';
  document.getElementById('editUpgradeTargetOsInput').value = library.targetOsVersion || '';
  document.getElementById('editUpgradeTargetFrameworkInput').value = library.targetFrameworkVersion || '';

  openModal('editUpgradeLibraryModal');
}

function initEditModal() {
  document.getElementById('editUpgradeModalClose')?.addEventListener('click', () => closeModal('editUpgradeLibraryModal'));
  document.getElementById('cancelEditUpgradeBtn')?.addEventListener('click', () => closeModal('editUpgradeLibraryModal'));

  document.getElementById('confirmEditUpgradeBtn')?.addEventListener('click', async () => {
    const modal = document.getElementById('editUpgradeLibraryModal');
    const id = modal?.dataset?.libraryId;
    const type = modal?.dataset?.type || activeType;
    if (!id) return;

    const name = document.getElementById('editUpgradeNameInput')?.value?.trim() || '';
    const repoUrl = normalizeRepoUrl(document.getElementById('editUpgradeRepoUrlInput')?.value?.trim() || '');
    const harmonizedRepoUrl = normalizeRepoUrl(document.getElementById('editUpgradeHarmonizedUrlInput')?.value?.trim() || '');
    const repoBranch = document.getElementById('editUpgradeRepoBranchInput')?.value?.trim() || '';
    const harmonizedBranch = document.getElementById('editUpgradeHarmonizedBranchInput')?.value?.trim() || '';
    const targetOsVersion = document.getElementById('editUpgradeTargetOsInput')?.value?.trim() || '';
    const targetFrameworkVersion = type === 'sdk' ? '' : (document.getElementById('editUpgradeTargetFrameworkInput')?.value?.trim() || '');

    if (!repoUrl) { showError('请输入仓库地址'); return; }
    if (!harmonizedRepoUrl) { showError('请输入已鸿蒙化插件仓库'); return; }

    try {
      await api.updateUpgradeLibrary(id, { name, repoUrl, harmonizedRepoUrl, repoBranch, harmonizedBranch, targetOsVersion, targetFrameworkVersion });
      closeModal('editUpgradeLibraryModal');
      await refreshLibraries();
    } catch (e) {
      showError('保存失败: ' + (e?.message || String(e)));
    }
  });

  window.addEventListener('click', (e) => {
    const overlay = document.getElementById('editUpgradeLibraryModal');
    if (e.target === overlay) closeModal('editUpgradeLibraryModal');
  });
}

// ── Table actions (delegated per active tbody) ──

function initTableActions() {
  TABS.forEach(type => {
    const tbody = document.getElementById(`${type}TableBody`);
    if (!tbody) return;

    tbody.addEventListener('click', (e) => {
      // "开始升级/继续升级/查看详情/查看进度" is <a> tags — browser handles navigation natively
      const toggleBtn = e.target.closest?.('button.toggle-run');
      const editBtn = e.target.closest?.('button.edit-library');
      const cloneBtn = e.target.closest?.('button.clone-library');
      const openBtn = e.target.closest?.('button.open-dir');
      const delBtn = e.target.closest?.('button.remove-library');

      if (toggleBtn) {
        const id = toggleBtn.dataset.id;
        const l = (librariesCache || []).find(x => String(x.id) === String(id));
        const isRunning = isLibraryRunning(l);

        runPending.set(String(id), { mode: isRunning ? 'stopping' : 'starting', ts: Date.now() });
        setToggleBtnImmediate(toggleBtn, isRunning ? 'stopping' : 'starting');
        startOrStopUpgradePolling(true);

        const op = isRunning ? api.cancelUpgradeLibrary(id) : api.runUpgradeLibrary(id);
        op
          .then(() => refreshLibraries())
          .catch(err => showError((isRunning ? '停止失败: ' : '启动失败: ') + (err?.message || String(err))))
          .finally(() => {
            startOrStopUpgradePolling(true);
            const l2 = (librariesCache || []).find(x => String(x.id) === String(id));
            if (!runPending.has(String(id))) clearToggleBtnImmediate(toggleBtn, isLibraryRunning(l2));
          });
        return;
      }

      if (editBtn) {
        const l = (librariesCache || []).find(x => String(x.id) === String(editBtn.dataset.id));
        if (l) openEditModal(l);
        return;
      }

      if (cloneBtn) {
        const id = cloneBtn.dataset.id;
        // 后端 clone 是 fire-and-forget（响应返回时 clone.status 还没翻成 'cloning'），
        // 直接 refresh 会读回旧状态、看起来没反应。先乐观置为 cloning 并立即重绘，
        // 让按钮马上变成「克隆中…」；真实状态由轮询（cloning 会保持轮询）接棒刷新。
        const lib = (librariesCache || []).find(x => String(x.id) === String(id));
        if (lib && !(lib.clone && lib.clone.status === 'cloning')) {
          lib.clone = { status: 'cloning', at: new Date().toISOString(), harmonizedCommit: null, upstreamCommit: null, error: null };
          renderTable();
        }
        clonePending.set(String(id), Date.now());
        startOrStopUpgradePolling(true);
        api.cloneUpgradeLibrary(id)
          .then(() => refreshLibraries())
          .catch(err => {
            clonePending.delete(String(id));
            showError('克隆失败: ' + (err?.message || String(err)));
            refreshLibraries();
          });
        return;
      }

      if (openBtn) {
        api.openUpgradeLibraryDir(openBtn.dataset.id)
          .catch(err => showError('打开目录失败: ' + (err?.message || String(err))));
        return;
      }

      if (delBtn) {
        const id = delBtn.dataset.id;
        if (!confirm('确定要移除该升级库吗？')) return;
        api.deleteUpgradeLibrary(id)
          .then(() => refreshLibraries())
          .catch(err => showError('移除失败: ' + (err?.message || String(err))));
      }
    });
  });
}

// ── Filters (mirrors adaptation app.js filter wiring) ──

function initFilters() {
  const resetBtn = document.getElementById('filterResetBtn');

  function syncResetVisibility() {
    if (resetBtn) resetBtn.style.display = (filters.search !== '' || filters.status !== '') ? 'inline-flex' : 'none';
  }

  let searchDebounce = null;
  document.getElementById('filterSearch')?.addEventListener('input', (e) => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      filters.search = e.target.value.trim().toLowerCase();
      renderTable();
      updateFilterResultCount();
      syncResetVisibility();
    }, 200);
  });

  document.getElementById('filterStatus')?.addEventListener('change', (e) => {
    filters.status = e.target.value;
    renderTable();
    updateFilterResultCount();
    syncResetVisibility();
  });

  resetBtn?.addEventListener('click', () => {
    filters.search = '';
    filters.status = '';
    const searchEl = document.getElementById('filterSearch');
    if (searchEl) searchEl.value = '';
    const statusEl = document.getElementById('filterStatus');
    if (statusEl) statusEl.value = '';
    renderAll();
    syncResetVisibility();
  });
}

// ── Header batch actions (operate on the active type) ──

function initHeaderActions() {
  document.getElementById('refreshBtn')?.addEventListener('click', () => {
    refreshLibraries().catch(err => showError('刷新失败: ' + (err?.message || String(err))));
  });

  document.getElementById('runAllBtn')?.addEventListener('click', () => {
    const enabled = (librariesCache || []).filter(l => l.type === activeType && l.enabled);
    if (enabled.length === 0) {
      showError(`没有启用的${TYPE_LABELS[activeType]}升级库`);
      return;
    }
    if (!confirm(`确定要批量升级 ${enabled.length} 个${TYPE_LABELS[activeType]}库吗？将进入队列。`)) return;
    Promise.allSettled(enabled.map(l => api.runUpgradeLibrary(l.id)))
      .then(() => refreshLibraries())
      .catch(() => refreshLibraries());
  });

  document.getElementById('cloneAllBtn')?.addEventListener('click', () => {
    const libs = (librariesCache || []).filter(l => l.type === activeType);
    if (libs.length === 0) {
      showError(`没有${TYPE_LABELS[activeType]}升级库可克隆`);
      return;
    }
    if (!confirm(`确定批量克隆 ${libs.length} 个${TYPE_LABELS[activeType]}升级库（harmonized + upstream）吗？`)) return;
    startOrStopUpgradePolling(true);
    api.batchCloneUpgradeLibraries({ ids: libs.map(l => l.id) })
      .then(() => refreshLibraries())
      .catch(err => showError('批量克隆失败: ' + (err?.message || String(err))));
  });

  const cancelHandler = async () => {
    const runningCount = (queueStatusCache?.running || []).length;
    const queuedCount = (queueStatusCache?.queued || []).length;
    if (runningCount === 0 && queuedCount === 0) {
      showError('当前没有批量任务在运行或排队');
      return;
    }
    if (!confirm(`确定要停止批量执行吗？将终止 ${runningCount} 个运行中任务，并将 ${queuedCount} 个等待任务标记为失败。`)) return;
    try {
      await api.cancelAllUpgradeQueue();
      await refreshLibraries();
    } catch (e) {
      showError('停止批量执行失败: ' + (e?.message || String(e)));
    }
  };
  document.getElementById('queueCancelAllBtn')?.addEventListener('click', cancelHandler);
}

// ── 批量多选（复用 js/state.js 的 selectedIds；UI 模式参考适配列表 app.js）──

function syncSelectionUI() {
  const filtered = getFilteredLibraries();
  const visibleIds = filtered.map(l => l.id);
  const selectedVisible = visibleIds.filter(id => selectedIds.has(id));

  const selectAll = document.querySelector(`.select-all-checkbox[data-type="${activeType}"]`);
  if (selectAll) {
    if (selectedVisible.length === 0) { selectAll.checked = false; selectAll.indeterminate = false; }
    else if (selectedVisible.length === visibleIds.length) { selectAll.checked = true; selectAll.indeterminate = false; }
    else { selectAll.checked = false; selectAll.indeterminate = true; }
  }

  const selectedCount = (librariesCache || []).filter(l => l.type === activeType && selectedIds.has(l.id)).length;
  const bar = document.getElementById('batchActionBar');
  if (bar) bar.classList.toggle('visible', selectedCount > 0);
  setText('batchSelectedCount', String(selectedCount));
}

function initSelection() {
  // 全选（仅响应当前激活 Tab 的表头复选框）
  document.querySelectorAll('.select-all-checkbox').forEach(cb => {
    cb.addEventListener('change', (e) => {
      if (cb.dataset.type !== activeType) return;
      const filtered = getFilteredLibraries();
      if (e.target.checked) setSelectedAll(filtered.map(l => l.id));
      else filtered.forEach(l => selectedIds.delete(l.id));
      renderTable();
    });
  });

  // 行复选框（事件委托）
  TABS.forEach(type => {
    const tbody = document.getElementById(`${type}TableBody`);
    if (!tbody) return;
    tbody.addEventListener('change', (e) => {
      if (e.target.classList.contains('row-checkbox')) {
        toggleSelected(e.target.dataset.id);
        syncSelectionUI();
      }
    });
  });

  document.getElementById('batchClearBtn')?.addEventListener('click', () => {
    clearSelected();
    renderTable();
  });

  // 批量克隆（选中的、未克隆的）
  document.getElementById('batchCloneSelectedBtn')?.addEventListener('click', () => {
    const targets = (librariesCache || []).filter(l =>
      l.type === activeType && selectedIds.has(l.id) && (l.clone?.status || 'idle') !== 'cloned');
    if (targets.length === 0) { showError('选中的库中没有需要克隆的（未克隆 / 克隆失败）'); return; }
    if (!confirm(`确定克隆选中的 ${targets.length} 个库吗？`)) return;
    startOrStopUpgradePolling(true);
    api.batchCloneUpgradeLibraries({ ids: targets.map(l => l.id) })
      .then(() => { clearSelected(); refreshLibraries(); })
      .catch(err => showError('批量克隆失败: ' + (err?.message || String(err))));
  });

  // 批量升级（选中的、已克隆且未在运行的）
  document.getElementById('batchUpgradeSelectedBtn')?.addEventListener('click', () => {
    const targets = (librariesCache || []).filter(l =>
      l.type === activeType && selectedIds.has(l.id)
      && (l.clone?.status || 'idle') === 'cloned' && !isLibraryRunning(l));
    if (targets.length === 0) { showError('选中的库中没有可升级的（需已克隆且未在运行）'); return; }
    if (!confirm(`确定对选中的 ${targets.length} 个库排队升级吗？`)) return;
    const btn = document.getElementById('batchUpgradeSelectedBtn');
    if (btn) btn.disabled = true;
    Promise.allSettled(targets.map(l => api.runUpgradeLibrary(l.id)))
      .then(() => { clearSelected(); startOrStopUpgradePolling(true); refreshLibraries(); })
      .catch(() => refreshLibraries())
      .finally(() => { if (btn) btn.disabled = false; });
  });

  // 批量删除（选中的）
  document.getElementById('batchDeleteSelectedBtn')?.addEventListener('click', async () => {
    const targets = (librariesCache || []).filter(l => l.type === activeType && selectedIds.has(l.id));
    if (targets.length === 0) { showError('没有选中的库'); return; }
    if (!confirm(`确定删除选中的 ${targets.length} 个库及其本地克隆目录吗？此操作不可撤销。`)) return;
    const btn = document.getElementById('batchDeleteSelectedBtn');
    if (btn) btn.disabled = true;
    const failures = [];
    try {
      for (const l of targets) {
        try { await api.deleteUpgradeLibrary(l.id); }
        catch (e) { failures.push(`${l.name || l.id}: ${e?.message || String(e)}`); }
      }
      clearSelected();
      await refreshLibraries();
      if (failures.length) showError(`部分删除失败：\n${failures.join('\n')}`);
    } finally {
      if (btn) btn.disabled = false;
    }
  });
}

function init() {
  initSettingsModal({
    triggerId: 'settingsBtn',
    onSaved: async () => {
      await refreshLibraries();
      startOrStopUpgradePolling(true);
    }
  });
  initTypeSwitcher();
  initAddModal();
  initEditModal();
  initTableActions();
  initFilters();
  initHeaderActions();
  initSelection();
  refreshLibraries().catch(err => showError('加载升级库列表失败: ' + (err?.message || String(err))));
  startOrStopUpgradePolling(true);
}

init();
