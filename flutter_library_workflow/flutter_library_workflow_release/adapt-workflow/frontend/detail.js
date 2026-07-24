import { API_URL } from './js/constants.js';
import { loadProfile, BRANDING, PROFILE_ID } from './js/profile-store.js';
import { showError } from './js/utils.js';
import { updateQueueBar } from './js/render.js';
import * as api from './js/api.js';
import { renderDashboard } from './js/detail/dashboard.js';
import { loadStageReport, showReportEmpty, loadStagePrd, showPrdEmpty, stageHasPrd } from './js/detail/reports.js';
import { renderPipeline } from './js/detail/pipeline.js';
import {
  showLogPlaceholder, showLogOutput, renderStageButtons,
  loadStageLog, connectToLogStream
} from './js/detail/log-panel.js';
import { runStage, killStage, viewStageOutput, closeOutputModal } from './js/detail/stage-runner.js';
import { runAllStages, stopAllStages, fetchRunAllStatus, updateRunAllBtn, fetchBatchStatus } from './js/detail/run-all.js';
import { loadTokenStats } from './js/detail/token-stats.js';
import { updateCompact, resetCompact, setupScrollListeners } from './js/detail/scroll-compact.js';
import { setupSyncButton, updateSyncButton } from './js/detail/tpc-sync.js';

// ── State ──

const params = new URLSearchParams(window.location.search);
const pluginId = params.get('id');
if (!pluginId) window.location.href = '/';
const pinnedProfileId = params.get('profileId') || params.get('profile') || null;
if (pinnedProfileId) globalThis.__PROFILE_ID = pinnedProfileId;

// Upgrade detail reuses this page via ?profileId=<...-upgrade>. Reflect that in
// the page chrome: the 「返回列表」 link goes to the upgrade list (not the
// adaptation list), and the Android-UI screenshot upload (adaptation-only) is
// hidden.
const isUpgradeDetail = !!pinnedProfileId && pinnedProfileId.endsWith('-upgrade');
if (isUpgradeDetail) {
  const backLink = document.querySelector('.back-link');
  if (backLink) backLink.href = '/upgrade.html';
  document.getElementById('uploadAndroidShotsBtn')?.style.setProperty('display', 'none', 'important');
}

let plugin = null;
let stages = [];
let selectedStageId = null;
let logStreamSource = null;
let runEventSource = null;
let runStageId = null;
let analysisData = null;
let planningData = null;
let isRunAll = false;
let lastAutoSelectedStage = null;
let backendConfig = { global: 'opencode', stages: {} };
let activeView = 'report';

/**
 * 门禁失败时无新日志文件，但阶段可能仍有历史 hasLog；loadDetail 后 loadStageLog 会冲掉刚 append 的门禁提示。
 * 存阶段 id：仅当再次选中该阶段且与标志一致时跳过从磁盘重载；切换到其他阶段则丢弃标志。
 */
let suppressStageLogReloadForId = null;

function matchesCurrentProfile(entry) {
  const currentProfileId = PROFILE_ID || pinnedProfileId || globalThis.__PROFILE_ID || null;
  if (!currentProfileId) return true;
  return !entry?.profileId || entry.profileId === currentProfileId;
}

// ── Data loading ──

async function fetchDetail() {
  const url = `${API_URL}/plugins/${pluginId}/detail${pinnedProfileId ? `?profileId=${encodeURIComponent(pinnedProfileId)}` : ''}`;
  const res = await fetch(url);
  if (!res.ok) { const e = await res.json(); throw new Error(e.error); }
  return res.json();
}

async function loadDetail() {
  try {
    const data = await fetchDetail();
    plugin = data;
    stages = data.stages || [];
    analysisData = data.analysis || null;
    planningData = data.planning || null;
    backendConfig = data.backendConfig || { global: 'opencode', stages: {} };

    renderDashboard(plugin, analysisData, planningData, stages);
    _renderPipeline();
    updateSyncButton(plugin, stages);

    const runningStage = stages.find(s => s.status === 'running');
    if (runningStage && !selectedStageId) {
      selectedStageId = runningStage.id;
      _renderPipeline();
      _onStageSelected(runningStage, false);
    } else if (selectedStageId) {
      const stage = stages.find(s => s.id === selectedStageId);
      if (stage) _onStageSelected(stage, false);
    }
  } catch (error) {
    showError('加载插件详情失败: ' + error.message);
  }
}

// ── Pipeline ──

async function _renderPipeline() {
  await renderPipeline(stages, selectedStageId, backendConfig, (stage) => {
    if (stage.id === selectedStageId) {
      _showOverview();
      return;
    }
    selectedStageId = stage.id;
    _renderPipeline();
    _onStageSelected(stage, true);
  }, pluginId);
}

// ── Panel switching ──

function _showOverview() {
  selectedStageId = null;
  if (logStreamSource) { logStreamSource.close(); logStreamSource = null; }
  _renderPipeline();
  document.getElementById('panelOverview').classList.add('active');
  document.getElementById('panelStage').classList.remove('active');
  resetCompact();
}

function _showStagePanel() {
  document.getElementById('panelOverview').classList.remove('active');
  document.getElementById('panelStage').classList.add('active');
  resetCompact();
}

// ── Stage selection ──

function _onStageSelected(stage, userClicked) {
  if (logStreamSource) { logStreamSource.close(); logStreamSource = null; }

  _showStagePanel();
  _renderStageButtons(stage);
  _updateViewSwitch(stage);

  if (userClicked) {
    if (stage.status === 'running') {
      switchView('log');
    } else if (stage.hasReport) {
      switchView('report');
    } else if (stage.hasLog) {
      switchView('log');
    } else {
      switchView('report');
    }
  }

  if (suppressStageLogReloadForId === stage.id) {
    suppressStageLogReloadForId = null;
    showLogOutput();
  } else {
    if (suppressStageLogReloadForId != null) {
      suppressStageLogReloadForId = null;
    }
    if (stage.status === 'running') {
      // 本页已通过「执行」建立 /run SSE 时，不要再连 log-stream：否则会与 runStage 的实时输出
      // 双通道写入同一块日志面板，出现整段或逐行重复（概率性，常见于 loadDetail 刷新后）。
      const tailingViaRun = runEventSource && runStageId === stage.id;
      if (!tailingViaRun) {
        logStreamSource = connectToLogStream(pluginId, stage.id, () => {
          logStreamSource = null;
          setTimeout(() => loadDetail(), 500);
        });
      } else {
        showLogOutput();
        loadStageLog(pluginId, stage.id);
      }
    } else if (stage.hasLog) {
      loadStageLog(pluginId, stage.id);
    } else {
      showLogPlaceholder();
    }
  }

  if (stage.hasReport) {
    loadStageReport(pluginId, stage.id);
  } else {
    showReportEmpty('此阶段暂无报告');
  }

  if (stageHasPrd(stage.id) && stage.hasReport) {
    loadStagePrd(pluginId, stage.id);
  } else {
    showPrdEmpty('此阶段无 PRD 文档');
  }
}

function _renderStageButtons(stage) {
  renderStageButtons(stage, backendConfig, pluginId, {
    onRun: (id) => _runStage(id),
    onKill: (id) => _killStage(id),
    onViewOutput: (id) => viewStageOutput(pluginId, id, stages),
  });
}

// ── View switch: report / prd / log ──

function _updateViewSwitch(stage) {
  const sw = document.getElementById('viewSwitch');
  sw.style.display = 'flex';

  const hasPrd = stageHasPrd(stage.id) && stage.hasReport;
  const prdBtn = document.getElementById('prdTabBtn');
  prdBtn.style.display = hasPrd ? 'inline-flex' : 'none';

  const btns = sw.querySelectorAll('.vs-btn');
  btns.forEach(btn => {
    if (btn.dataset.view === 'report') {
      btn.classList.toggle('disabled', !stage.hasReport);
    }
    if (btn.dataset.view === 'prd') {
      btn.classList.toggle('disabled', !stage.hasReport);
    }
    if (btn.dataset.view === 'log') {
      btn.classList.toggle('disabled', !stage.hasLog && stage.status !== 'running');
    }
  });
}

function switchView(view) {
  activeView = view;

  document.querySelectorAll('#viewSwitch .vs-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === view);
  });

  document.getElementById('reportView').classList.toggle('active', view === 'report');
  document.getElementById('prdView').classList.toggle('active', view === 'prd');
  document.getElementById('logView').classList.toggle('active', view === 'log');
  resetCompact();
}

// ── Run / Kill ──

function _runStage(stageId) {
  if (runEventSource) { runEventSource.close(); runEventSource = null; runStageId = null; }
  if (logStreamSource) { logStreamSource.close(); logStreamSource = null; }

  selectedStageId = stageId;
  runStageId = stageId;
  switchView('log');

  runEventSource = runStage(pluginId, stageId, stages, {
    onStatusChange: {
      isViewing: (id) => selectedStageId === id && !logStreamSource
    },
    onRenderPipeline: _renderPipeline,
    onRenderButtons: _renderStageButtons,
    onDone: (_success, meta) => {
      runEventSource = null;
      runStageId = null;
      if (meta?.gateFailed) {
        suppressStageLogReloadForId = stageId;
      }
      setTimeout(() => loadDetail(), 1000);
    }
  });
}

async function _killStage(stageId) {
  if (runEventSource) { runEventSource.close(); runEventSource = null; runStageId = null; }
  if (logStreamSource) { logStreamSource.close(); logStreamSource = null; }
  await killStage(pluginId, stageId, stages, {
    onRenderPipeline: _renderPipeline,
    onRenderButtons: _renderStageButtons
  });
}

// ── Run All ──

async function _runAllStages() {
  if (isRunAll) return;
  try {
    const result = await runAllStages(pluginId);
    
    if (result.reason === 'already_running') {
      showError('该插件已在执行中');
      return;
    }
    if (result.reason === 'already_queued') {
      showError('该插件已在队列中');
      return;
    }
    
    isRunAll = true;
    lastAutoSelectedStage = null;
    updateRunAllBtn(isRunAll);
    
    if (result.queueStatus) {
      updateQueueBar(result.queueStatus);
      updateCurrentPluginQueueStatus(result.queueStatus);
    }
    
    await loadDetail();
  } catch (error) {
    showError('启动全部执行失败: ' + error.message);
  }
}

function updateCurrentPluginQueueStatus(queueStatus) {
  const statusEl = document.getElementById('currentPluginQueueStatus');
  if (!statusEl) return;
  
  const inRunning = queueStatus?.running?.find(p => p.pluginId === pluginId && matchesCurrentProfile(p));
  const inQueued = queueStatus?.queued?.find(p => p.pluginId === pluginId && matchesCurrentProfile(p));
  
  if (inRunning) {
    statusEl.textContent = '（当前插件正在执行）';
    statusEl.style.display = 'inline';
  } else if (inQueued) {
    statusEl.textContent = `（当前插件排队中 #${inQueued.position}）`;
    statusEl.style.display = 'inline';
  } else {
    statusEl.style.display = 'none';
  }
}

async function _stopAllStages() {
  try { await stopAllStages(pluginId); } catch {}
  isRunAll = false;
  lastAutoSelectedStage = null;
  updateRunAllBtn(isRunAll);
  if (logStreamSource) { logStreamSource.close(); logStreamSource = null; }
  loadDetail();
}

// ── Event bindings ──

document.getElementById('openDirBtn').addEventListener('click', async () => {
  try {
    const url = `${API_URL}/plugins/${pluginId}/open-dir${pinnedProfileId ? `?profileId=${encodeURIComponent(pinnedProfileId)}` : ''}`;
    await fetch(url, { method: 'POST' });
  } catch (error) {
    showError('打开目录失败: ' + error.message);
  }
});

// 上传安卓 UI 截图（落盘到 .ohos-adaptation/ui-baseline/android/，供 02 阶段编码参考）
const androidShotsInput = document.getElementById('androidShotsInput');
const uploadAndroidShotsBtn = document.getElementById('uploadAndroidShotsBtn');
const uploadAndroidShotsLabel = document.getElementById('uploadAndroidShotsLabel');

uploadAndroidShotsBtn.addEventListener('click', () => androidShotsInput.click());

androidShotsInput.addEventListener('change', async () => {
  const files = androidShotsInput.files;
  if (!files || !files.length) return;
  const formData = new FormData();
  for (const file of files) formData.append('shots', file);
  const restoreLabel = uploadAndroidShotsLabel.textContent;
  uploadAndroidShotsBtn.disabled = true;
  uploadAndroidShotsLabel.textContent = '上传中…';
  try {
    const qs = pinnedProfileId ? `?profileId=${encodeURIComponent(pinnedProfileId)}` : '';
    const response = await fetch(`${API_URL}/plugins/${pluginId}/android-ui-shots${qs}`, { method: 'POST', body: formData });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.error || `HTTP ${response.status}`);
    uploadAndroidShotsLabel.textContent = `已上传 ${data.count} 张 ✓`;
    setTimeout(() => { uploadAndroidShotsLabel.textContent = restoreLabel; }, 2500);
  } catch (error) {
    uploadAndroidShotsLabel.textContent = restoreLabel;
    showError('上传安卓截图失败: ' + error.message);
  } finally {
    uploadAndroidShotsBtn.disabled = false;
    androidShotsInput.value = '';
  }
});

document.getElementById('runAllBtn').addEventListener('click', () => {
  if (isRunAll) _stopAllStages(); else _runAllStages();
});

setupSyncButton(() => ({ plugin, pluginId, loadDetail }));

document.getElementById('outputModalClose').addEventListener('click', closeOutputModal);

document.getElementById('backToOverview').addEventListener('click', _showOverview);

document.querySelectorAll('#viewSwitch .vs-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) return;
    switchView(btn.dataset.view);
  });
});

window.addEventListener('click', (e) => {
  if (e.target === document.getElementById('outputModal')) closeOutputModal();
});

document.getElementById('queueCancelAllBtn').addEventListener('click', async () => {
  if (!confirm('确定要清空全局执行队列并终止所有运行中的 Agent？')) return;
  try {
    await api.cancelBatch(null, true);
    isRunAll = false;
    updateRunAllBtn(isRunAll);
    updateCurrentPluginQueueStatus(null);
    const batchStatus = await fetchBatchStatus();
    updateQueueBar(batchStatus);
  } catch (error) {
    showError('清空队列失败: ' + error.message);
  }
});

// ── Init ──

async function checkQueueStatus() {
  try {
    const batchStatus = await fetchBatchStatus();
    updateQueueBar(batchStatus);
    
    const inRunning = batchStatus.running.find(p => p.pluginId === pluginId && matchesCurrentProfile(p));
    const inQueued = batchStatus.queued.find(p => p.pluginId === pluginId && matchesCurrentProfile(p));
    
    if (inRunning || inQueued) {
      isRunAll = true;
      updateRunAllBtn(isRunAll);
      updateCurrentPluginQueueStatus(batchStatus);
    }
  } catch {}
}

loadProfile().then(() => {
  const topBar = document.querySelector('.top-bar');
  if (topBar) {
    if (BRANDING.headerGradient) topBar.style.setProperty('--header-gradient', BRANDING.headerGradient);
    if (BRANDING.headerAccent) topBar.style.setProperty('--header-accent', BRANDING.headerAccent);
  }
  loadDetail();
  loadTokenStats(pluginId);
  checkQueueStatus();
});
setupScrollListeners();

// ── Polling ──

setInterval(async () => {
  const hasRunning = stages.some(s => s.status === 'running');
  if (!hasRunning && !runEventSource && !logStreamSource && !isRunAll) return;

  try {
    const [data, batchStatus] = await Promise.all([
      fetchDetail(),
      fetchBatchStatus()
    ]);
    plugin = data;
    stages = data.stages || [];
    analysisData = data.analysis || null;
    planningData = data.planning || null;
    backendConfig = data.backendConfig || { global: 'opencode', stages: {} };

    renderDashboard(plugin, analysisData, planningData, stages);
    _renderPipeline();
    updateQueueBar(batchStatus);

    if (isRunAll) {
      const running = stages.find(s => s.status === 'running');
      if (running && running.id !== lastAutoSelectedStage) {
        lastAutoSelectedStage = running.id;
        selectedStageId = running.id;
        _renderPipeline();
        _onStageSelected(running, true);
      }

      const stillInQueue = batchStatus.running.some(p => p.pluginId === pluginId && matchesCurrentProfile(p))
        || batchStatus.queued.some(p => p.pluginId === pluginId && matchesCurrentProfile(p));
      
      if (!stillInQueue) {
        isRunAll = false;
        lastAutoSelectedStage = null;
        updateRunAllBtn(isRunAll);
        updateCurrentPluginQueueStatus(null);
      } else {
        updateCurrentPluginQueueStatus(batchStatus);
      }
    }

    if (selectedStageId && !isRunAll) {
      const stage = stages.find(s => s.id === selectedStageId);
      if (stage) {
        _renderStageButtons(stage);
        _updateViewSwitch(stage);
      }
    }
  } catch {}
}, 5000);
