import { setPlugins, plugins, filters, setFilter, resetFilters, selectedIds, toggleSelected, setSelectedAll, clearSelected } from './js/state.js';
import { showLoading, showError } from './js/utils.js';
import { renderTable, updateStats, getFilteredPlugins, updateQueueBar, mergeQueueStatusToPlugins } from './js/render.js';
import { loadProfile, getProfileData, BRANDING, TARGET_BRANCH, STAGE_IDS, STAGE_SHORT_NAMES, PROFILE_ID, FLOW_VERSION, FLOW_PROFILES } from './js/profile-store.js';
import * as api from './js/api.js';
import { initSettingsModal } from './js/settings-modal.js';

const SELECTED_PROFILE_STORAGE_KEY = 'adaptWorkflow.selectedProfileId';

function getStoredProfileId() {
  try {
    return localStorage.getItem(SELECTED_PROFILE_STORAGE_KEY) || null;
  } catch {
    return null;
  }
}

function storeProfileId(profileId) {
  try {
    if (profileId) localStorage.setItem(SELECTED_PROFILE_STORAGE_KEY, profileId);
  } catch {}
}

async function fetchPluginsWithQueue() {
  showLoading(true);
  try {
    const [pluginsData, queueStatus] = await Promise.all([
      api.fetchPluginsList(),
      api.getBatchQueueStatus()
    ]);
    const merged = mergeQueueStatusToPlugins(pluginsData, queueStatus);
    setPlugins(merged);
    renderTable();
    updateStats();
    updateQueueBar(queueStatus);
  } catch (error) {
    showError('加载插件列表失败: ' + error.message);
  } finally {
    showLoading(false);
  }
}

async function fetchPlugins() {
  return fetchPluginsWithQueue();
}

function openAddPluginModal() {
  const modal = document.getElementById('addPluginModal');
  const input = document.getElementById('repoUrlInput');
  input.value = '';
  const pkgInput = document.getElementById('packagePathInput');
  if (pkgInput) pkgInput.value = '';
  modal.classList.add('visible');
  modal.style.display = 'block';
  setTimeout(() => input.focus(), 100);
}

function closeAddPluginModal() {
  const modal = document.getElementById('addPluginModal');
  modal.classList.remove('visible');
  setTimeout(() => { modal.style.display = 'none'; }, 200);
}

async function confirmAddPlugin() {
  const input = document.getElementById('repoUrlInput');
  const repoUrl = input.value.trim();

  if (!repoUrl) {
    showError('请输入仓库地址');
    return;
  }

  const pkgInput = document.getElementById('packagePathInput');
  const packagePath = pkgInput ? pkgInput.value.trim() : '';

  const btn = document.getElementById('confirmAddPluginBtn');
  btn.disabled = true;
  btn.textContent = '添加中...';

  try {
    await api.createPlugin(repoUrl, undefined, undefined, undefined, packagePath || undefined);
    closeAddPluginModal();
    await fetchPlugins();
  } catch (error) {
    showError('添加插件失败: ' + error.message);
  } finally {
    btn.disabled = false;
    btn.textContent = '添加';
  }
}

// ── 批量 Git 添加弹窗 ──

function openBatchGitModal() {
  const modal = document.getElementById('batchGitModal');
  const input = document.getElementById('batchGitInput');
  input.value = '';
  modal.classList.add('visible');
  modal.style.display = 'block';
  setTimeout(() => input.focus(), 100);
}

function closeBatchGitModal() {
  const modal = document.getElementById('batchGitModal');
  modal.classList.remove('visible');
  setTimeout(() => { modal.style.display = 'none'; }, 200);
}

async function confirmBatchGit() {
  const input = document.getElementById('batchGitInput');
  const rawValue = input.value.trim();

  if (!rawValue) {
    showError('请输入 Git 仓库地址');
    return;
  }

  const urls = rawValue.split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#'));

  if (urls.length === 0) {
    showError('没有有效的仓库地址');
    return;
  }

  const btn = document.getElementById('confirmBatchGitBtn');
  btn.disabled = true;
  btn.textContent = '添加中...';

  // Detect monorepo URLs for user feedback
  const monorepoUrls = urls.filter(u => /\/tree\/[^/]+\/.+/.test(u));

  try {
    const result = await api.batchCreatePlugins(urls);
    closeBatchGitModal();

    const messages = [];
    if (monorepoUrls.length > 0) {
      messages.push(`已自动识别 ${monorepoUrls.length} 个 Monorepo 子包地址，拆分为仓库地址 + 子包路径`);
    }
    if (result.skipped && result.skipped.length > 0) {
      const reasons = result.skipped.map(s => `${s.url}: ${s.reason === 'duplicate' ? '已存在' : s.reason}`).join('\n');
      messages.push(`跳过 ${result.skipped.length} 个：\n${reasons}`);
    }
    if (messages.length > 0) {
      showError(messages.join('\n\n'));
    }

    if (result.created > 0) {
      showBatchCloneProgress();
      await fetchPlugins();
    } else {
      if (messages.length === 0) showError('没有新增仓库');
      await fetchPlugins();
    }
  } catch (error) {
    showError('批量添加失败: ' + error.message);
  } finally {
    btn.disabled = false;
    btn.textContent = '添加并克隆';
  }
}

// ── Pub 下载弹窗 ──

function openPubDownloadModal() {
  const modal = document.getElementById('pubDownloadModal');
  const input = document.getElementById('pubPackageInput');
  input.value = '';
  modal.classList.add('visible');
  modal.style.display = 'block';
  setTimeout(() => input.focus(), 100);
}

function closePubDownloadModal() {
  const modal = document.getElementById('pubDownloadModal');
  modal.classList.remove('visible');
  setTimeout(() => { modal.style.display = 'none'; }, 200);
}

async function confirmPubDownload() {
  const input = document.getElementById('pubPackageInput');
  const rawValue = input.value.trim();

  if (!rawValue) {
    showError('请输入包名');
    return;
  }

  // 解析包名（每行一个）
  const packageNames = rawValue.split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#'));

  if (packageNames.length === 0) {
    showError('没有有效的包名');
    return;
  }

  const btn = document.getElementById('confirmPubDownloadBtn');
  btn.disabled = true;
  btn.textContent = '下载中...';

  try {
    const result = await api.pubDownload(packageNames);
    closePubDownloadModal();

    if (result.invalid && result.invalid.length > 0) {
      showError(`部分包名无效: ${result.invalid.join(', ')}`);
    }

    if (result.total > 0) {
      showPubDownloadProgress(result.total);
    } else if (result.existing > 0) {
      showError(`所有 ${result.existing} 个包已存在`);
      await fetchPlugins();
    }
  } catch (error) {
    showError('Pub 下载失败: ' + error.message);
  } finally {
    btn.disabled = false;
    btn.textContent = '开始下载';
  }
}

// ── ZIP 上传弹窗 ──

function openUploadZipModal() {
  const modal = document.getElementById('uploadZipModal');
  const nameInput = document.getElementById('zipPluginNameInput');
  const fileInput = document.getElementById('zipFileInput');
  nameInput.value = '';
  fileInput.value = '';
  modal.classList.add('visible');
  modal.style.display = 'block';
  setTimeout(() => nameInput.focus(), 100);
}

function closeUploadZipModal() {
  const modal = document.getElementById('uploadZipModal');
  modal.classList.remove('visible');
  setTimeout(() => { modal.style.display = 'none'; }, 200);
}

async function confirmUploadZip() {
  const nameInput = document.getElementById('zipPluginNameInput');
  const fileInput = document.getElementById('zipFileInput');
  const pluginName = nameInput.value.trim();
  
  if (!pluginName) {
    showError('请输入插件名称');
    return;
  }
  
  if (!fileInput.files || fileInput.files.length === 0) {
    showError('请选择 ZIP 文件');
    return;
  }
  
  const zipFile = fileInput.files[0];
  if (!zipFile.name.endsWith('.zip')) {
    showError('仅支持 .zip 文件');
    return;
  }
  
  const btn = document.getElementById('confirmUploadZipBtn');
  btn.disabled = true;
  btn.textContent = '上传中...';
  
  try {
    const formData = new FormData();
    formData.append('zipFile', zipFile);
    formData.append('name', pluginName);
    
    const result = await api.uploadZip(formData);
    closeUploadZipModal();
    
    if (result.success) {
      await fetchPlugins();
      showError(result.message || `SDK "${pluginName}" 已成功导入`);
    } else {
      showError(result.error || '上传失败');
    }
  } catch (error) {
    showError('ZIP 上传失败: ' + error.message);
  } finally {
    btn.disabled = false;
    btn.textContent = '上传并导入';
  }
}

let pubDownloadPollTimer = null;
function showPubDownloadProgress(total) {
  const bar = document.getElementById('batchCloneBar');
  const progressEl = document.getElementById('batchCloneProgress');
  const currentEl = document.getElementById('batchCloneCurrent');

  bar.style.display = 'flex';

  if (pubDownloadPollTimer) clearInterval(pubDownloadPollTimer);
  pubDownloadPollTimer = setInterval(async () => {
    try {
      const status = await api.getPubDownloadStatus();
      if (!status.running) {
        bar.style.display = 'none';
        clearInterval(pubDownloadPollTimer);
        pubDownloadPollTimer = null;
        await fetchPlugins();
        return;
      }
      const p = status.progress;
      progressEl.textContent = `${p.completed + p.failed}/${p.total}`;
      currentEl.textContent = p.current ? `正在下载 ${p.current}` : '';

      // 刷新列表
      const list = await api.fetchPluginsList();
      setPlugins(list);
      renderTable();
      updateStats();
    } catch {}
  }, 2000);
}

async function deletePlugin(id) {
  const plugin = plugins.find(p => p.id === id);
  const inCatalog = plugin && plugin.in_catalog;

  const msg = inCatalog
    ? `「${plugin.name}」属于清单内插件，删除后将清理本地文件夹并恢复为"未克隆"状态，确定继续？`
    : `确定要删除「${plugin ? plugin.name : id}」吗？将同时删除本地克隆文件夹和记录。`;

  if (!confirm(msg)) return;

  try {
    await api.removePlugin(id);
    await fetchPlugins();
  } catch (error) {
    showError('删除插件失败: ' + error.message);
  }
}

async function clonePlugin(id) {
  const pluginIndex = plugins.findIndex(p => p.id === id);
  if (pluginIndex !== -1) {
    plugins[pluginIndex]._loading = true;
    plugins[pluginIndex].status = 'cloning';
    renderTable();
  }

  try {
    await api.clonePluginRepo(id);

    const POLL_INTERVAL = 3000;
    const MAX_WAIT_MS = 5 * 60 * 1000;
    const startTime = Date.now();

    while (Date.now() - startTime < MAX_WAIT_MS) {
      await new Promise(r => setTimeout(r, POLL_INTERVAL));
      try {
        const list = await api.fetchPluginsList();
        setPlugins(list);
        const updated = list.find(p => p.id === id || p.name === id.replace('src_', ''));
        if (!updated || updated.status !== 'cloning') break;
        renderTable();
        updateStats();
      } catch {}
    }

    await fetchPlugins();
  } catch (error) {
    if (pluginIndex !== -1) {
      plugins[pluginIndex]._loading = false;
      plugins[pluginIndex].status = 'clone_failed';
      renderTable();
    }
    showError('克隆失败: ' + error.message);
  }
}

async function cloneHarmony(id) {
  const plugin = plugins.find(p => p.id === id);
  const pluginIndex = plugins.findIndex(p => p.id === id);
  const wasCloned = plugin && plugin.status === 'cloned';
  const branch = TARGET_BRANCH;

  if (pluginIndex !== -1) {
    plugins[pluginIndex]._loading = true;
    if (!wasCloned) plugins[pluginIndex].status = 'cloning';
    renderTable();
  }

  try {
    await api.clonePluginRepo(id, branch);

    const POLL_INTERVAL = 3000;
    const MAX_WAIT_MS = 5 * 60 * 1000;
    const startTime = Date.now();

    while (Date.now() - startTime < MAX_WAIT_MS) {
      await new Promise(r => setTimeout(r, POLL_INTERVAL));
      try {
        const list = await api.fetchPluginsList();
        setPlugins(list);
        const updated = list.find(p => p.id === id || p.name === id.replace('src_', ''));
        if (!updated || updated.status !== 'cloning') break;
        renderTable();
        updateStats();
      } catch {}
    }

    await fetchPlugins();
    showError(`已切换到 ${branch} 分支，可进入详情页查看适配报告`);
  } catch (error) {
    if (pluginIndex !== -1) {
      plugins[pluginIndex]._loading = false;
      if (!wasCloned) plugins[pluginIndex].status = 'clone_failed';
      renderTable();
    }
    showError(`克隆 ${branch} 分支失败: ` + error.message);
  }
}

async function cloneAll() {
  if (!confirm('确定要克隆全部未克隆的插件吗？')) return;

  const btn = document.getElementById('cloneAllBtn');
  btn.disabled = true;
  btn.textContent = '开始克隆...';

  try {
    const result = await api.batchClone(null, true);
    showBatchCloneProgress();
    if (result.total === 0) {
      showError('没有需要克隆的插件');
    }
  } catch (error) {
    showError('批量克隆失败: ' + error.message);
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> 一键克隆全部`;
  }
}

let batchClonePollTimer = null;
function showBatchCloneProgress() {
  const bar = document.getElementById('batchCloneBar');
  bar.style.display = 'flex';
  fetchPlugins().catch(() => {});

  if (batchClonePollTimer) clearInterval(batchClonePollTimer);
  batchClonePollTimer = setInterval(async () => {
    try {
      const status = await api.getBatchCloneStatus();
      if (!status.running) {
        bar.style.display = 'none';
        clearInterval(batchClonePollTimer);
        batchClonePollTimer = null;
        await fetchPlugins();
        return;
      }
      const p = status.progress;
      document.getElementById('batchCloneProgress').textContent = `${p.completed + p.failed}/${p.total}`;
      document.getElementById('batchCloneCurrent').textContent = p.current ? `正在克隆 ${p.current}` : '';

      // Also refresh the plugin list periodically during batch clone
      const list = await api.fetchPluginsList();
      setPlugins(list);
      renderTable();
      updateStats();
    } catch {}
  }, 2000);
}

async function refreshAllReports() {
  try {
    await api.refreshAllPluginReports();
    await fetchPlugins();
  } catch (error) {
    showError('刷新所有报告失败: ' + error.message);
  }
}

async function openDir(id) {
  try {
    await api.openPluginDir(id);
  } catch (error) {
    showError('打开目录失败: ' + error.message);
  }
}

async function exportCSV() {
  try {
    const blob = await api.fetchExportCSV();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'plugins.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    showError('导出失败: ' + error.message);
  }
}

function buildStageBackendGrid(stageBackends) {
  const grid = document.getElementById('stageBackendGrid');
  const profile = getProfileData();
  const stages = profile?.stages || STAGE_IDS.map((id, i) => ({
    id, name: STAGE_SHORT_NAMES[id] || id
  }));

  grid.innerHTML = stages.map((s, i) => {
    const num = String(i + 1).padStart(2, '0');
    const val = stageBackends?.[s.id] || '';
    if (s.runnerType === 'script') {
      return `<div class="stage-backend-row">
      <span class="stage-backend-label">${num} - ${s.name}</span>
      <select class="form-select form-select-sm" disabled>
        <option selected>固定脚本</option>
      </select>
    </div>`;
    }
    return `<div class="stage-backend-row">
      <span class="stage-backend-label">${num} - ${s.name}</span>
      <select class="form-select form-select-sm" data-stage="${s.id}">
        <option value=""${val === '' ? ' selected' : ''}>跟随全局</option>
        <option value="opencode"${val === 'opencode' ? ' selected' : ''}>OpenCode</option>
        <option value="claude-code"${val === 'claude-code' ? ' selected' : ''}>Claude Code</option>
        <option value="cline"${val === 'cline' ? ' selected' : ''}>Cline CLI</option>
      </select>
    </div>`;
  }).join('');
}

async function openSettings() {
  const modal = document.getElementById('settingsModal');
  const proxyEnabled = document.getElementById('proxyEnabled');
  const proxyFields = document.getElementById('proxyFields');
  const httpProxy = document.getElementById('httpProxy');
  const httpsProxy = document.getElementById('httpsProxy');
  const agentBackend = document.getElementById('agentBackend');
  const maxAgentConcurrency = document.getElementById('maxAgentConcurrency');
  const maxCloneConcurrency = document.getElementById('maxCloneConcurrency');
  const githubToken = document.getElementById('githubToken');
  const enableTestDesign = document.getElementById('enableTestDesign');
  const enableDemoGen = document.getElementById('enableDemoGen');
  const enableBlackboxVerify = document.getElementById('enableBlackboxVerify');
  const ohosNpmScope = document.getElementById('ohosNpmScope');
  const shellMode = document.getElementById('shellMode');
  const enableSdkTestDesign = document.getElementById('enableSdkTestDesign');
  const enableSdkCaseConfrontation = document.getElementById('enableSdkCaseConfrontation');
  const enableSdkDemoGen = document.getElementById('enableSdkDemoGen');
  const enableSdkBlackboxVerify = document.getElementById('enableSdkBlackboxVerify');
  const enableSdkQualityReview = document.getElementById('enableSdkQualityReview');
  const enableQualityReview = document.getElementById('enableQualityReview');
  const enableQualityFix = document.getElementById('enableQualityFix');
  const enableSdkQualityFix = document.getElementById('enableSdkQualityFix');
  const enableRnQualityReview = document.getElementById('enableRnQualityReview');
  const enableRnQualityFix = document.getElementById('enableRnQualityFix');

  // 加载模型层级配置
  try {
    const tierConfig = await fetch('/api/model-tiers').then(r => r.json());
    renderModelTiersGrid(tierConfig);
  } catch (error) {
    console.error('加载模型层级配置失败:', error);
    renderModelTiersGrid({ tiers: {} });
  }

  try {
    const settings = await api.fetchSettings();
    proxyEnabled.checked = settings.proxy?.enabled || false;
    httpProxy.value = settings.proxy?.http || 'http://127.0.0.1:7890';
    httpsProxy.value = settings.proxy?.https || 'http://127.0.0.1:7890';
    proxyFields.style.display = proxyEnabled.checked ? 'block' : 'none';

    agentBackend.value = settings.agentBackend || 'opencode';
    if (shellMode) shellMode.value = settings.shellMode || 'default';
    maxAgentConcurrency.value = String(settings.maxAgentConcurrency || 3);
    maxCloneConcurrency.value = String(settings.maxCloneConcurrency || 5);
    githubToken.value = settings.githubToken || '';
    if (ohosNpmScope) ohosNpmScope.value = settings.ohosNpmScope || '@oh-rn';

    const enabledStages = settings.enabledStages || {};
    enableTestDesign.checked = enabledStages.testDesign !== false;
    enableDemoGen.checked = enabledStages.demoGen !== false;
    enableBlackboxVerify.checked = enabledStages.blackboxVerify !== false;
    enableQualityReview.checked = enabledStages.qualityReview !== false;
    enableQualityFix.checked = enabledStages.qualityFix !== false;
    enableSdkTestDesign.checked = enabledStages.sdkTestDesign !== false;
    enableSdkCaseConfrontation.checked = enabledStages.sdkCaseConfrontation !== false;
    enableSdkDemoGen.checked = enabledStages.sdkDemoGen !== false;
    enableSdkBlackboxVerify.checked = enabledStages.sdkBlackboxVerify !== false;
    enableSdkQualityReview.checked = enabledStages.sdkQualityReview !== false;
    enableSdkQualityFix.checked = enabledStages.sdkQualityFix !== false;
    enableRnTestDesign.checked = enabledStages.rnTestDesign !== false;
    enableRnDemoGen.checked = enabledStages.rnDemoGen !== false;
    enableRnBlackboxVerify.checked = enabledStages.rnBlackboxVerify !== false;
    enableRnTestReport.checked = enabledStages.rnTestReport !== false;
    enableRnFastTestDesign.checked = enabledStages.rnFastTestDesign === true;
    enableRnFastDemoGen.checked = enabledStages.rnFastDemoGen === true;
    enableRnFastBlackboxVerify.checked = enabledStages.rnFastBlackboxVerify === true;
    enableRnFastTestReport.checked = enabledStages.rnFastTestReport === true;
    enableRnQualityReview.checked = enabledStages.rnQualityReview !== false;
    enableRnQualityFix.checked = enabledStages.rnQualityFix !== false;

    buildStageBackendGrid(settings.stageBackends || {});
  } catch (error) {
    proxyEnabled.checked = false;
    httpProxy.value = 'http://127.0.0.1:7890';
    httpsProxy.value = 'http://127.0.0.1:7890';
    proxyFields.style.display = 'none';
    agentBackend.value = 'opencode';
    if (shellMode) shellMode.value = 'default';
    maxAgentConcurrency.value = '3';
    maxCloneConcurrency.value = '5';
    githubToken.value = '';
    if (ohosNpmScope) ohosNpmScope.value = '@oh-rn';
    enableTestDesign.checked = true;
    enableDemoGen.checked = true;
    enableBlackboxVerify.checked = true;
    enableQualityReview.checked = true;
    enableQualityFix.checked = true;
    enableSdkTestDesign.checked = true;
    enableSdkCaseConfrontation.checked = true;
    enableSdkDemoGen.checked = true;
    enableSdkBlackboxVerify.checked = true;
    enableSdkQualityReview.checked = true;
    enableSdkQualityFix.checked = true;
    enableRnTestDesign.checked = true;
    enableRnDemoGen.checked = true;
    enableRnBlackboxVerify.checked = true;
    enableRnTestReport.checked = true;
    enableRnFastTestDesign.checked = false;
    enableRnFastDemoGen.checked = false;
    enableRnFastBlackboxVerify.checked = false;
    enableRnFastTestReport.checked = false;
    enableRnQualityReview.checked = true;
    enableRnQualityFix.checked = true;
    buildStageBackendGrid({});
  }

  modal.classList.add('visible');
  modal.style.display = 'block';
}

function closeSettings() {
  const modal = document.getElementById('settingsModal');
  modal.classList.remove('visible');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 200);
}

async function saveSettings() {
  const proxyEnabled = document.getElementById('proxyEnabled').checked;
  const httpProxy = document.getElementById('httpProxy').value.trim();
  const httpsProxy = document.getElementById('httpsProxy').value.trim();

  const stageBackends = {};
  document.querySelectorAll('#stageBackendGrid select[data-stage]').forEach(sel => {
    if (sel.value) stageBackends[sel.dataset.stage] = sel.value;
  });

  const enabledStages = {
    testDesign: document.getElementById('enableTestDesign').checked,
    demoGen: document.getElementById('enableDemoGen').checked,
    blackboxVerify: document.getElementById('enableBlackboxVerify').checked,
    qualityReview: document.getElementById('enableQualityReview').checked,
    qualityFix: document.getElementById('enableQualityFix').checked,
    sdkTestDesign: document.getElementById('enableSdkTestDesign').checked,
    sdkCaseConfrontation: document.getElementById('enableSdkCaseConfrontation').checked,
    sdkDemoGen: document.getElementById('enableSdkDemoGen').checked,
    sdkBlackboxVerify: document.getElementById('enableSdkBlackboxVerify').checked,
    sdkQualityReview: document.getElementById('enableSdkQualityReview').checked,
    sdkQualityFix: document.getElementById('enableSdkQualityFix').checked,
    rnTestDesign: document.getElementById('enableRnTestDesign').checked,
    rnDemoGen: document.getElementById('enableRnDemoGen').checked,
    rnBlackboxVerify: document.getElementById('enableRnBlackboxVerify').checked,
    rnTestReport: document.getElementById('enableRnTestReport').checked,
    rnFastTestDesign: document.getElementById('enableRnFastTestDesign').checked,
    rnFastDemoGen: document.getElementById('enableRnFastDemoGen').checked,
    rnFastBlackboxVerify: document.getElementById('enableRnFastBlackboxVerify').checked,
    rnFastTestReport: document.getElementById('enableRnFastTestReport').checked,
    rnQualityReview: document.getElementById('enableRnQualityReview').checked,
    rnQualityFix: document.getElementById('enableRnQualityFix').checked
  };

  let base = {};
  try {
    base = await api.fetchSettings();
  } catch (e) {
    console.warn('读取当前设置失败，将仅保存表单字段', e);
  }
  // 保留 base.enabledStages 里表单未覆盖的键（向前兼容未来新增的开关）。
  // 表单值优先（放后面），base 只补真正未在表单中暴露的键。
  const mergedEnabledStages = {
    ...(base.enabledStages || {}),
    ...enabledStages
  };

  const settings = {
    ...base,
    proxy: {
      enabled: proxyEnabled,
      http: httpProxy || 'http://127.0.0.1:7890',
      https: httpsProxy || 'http://127.0.0.1:7890'
    },
    agentBackend: document.getElementById('agentBackend').value,
    shellMode: document.getElementById('shellMode')?.value || 'default',
    stageBackends,
    claudeCode: {
      skipPermissions: true
    },
    maxAgentConcurrency: parseInt(document.getElementById('maxAgentConcurrency').value) || 3,
    maxCloneConcurrency: parseInt(document.getElementById('maxCloneConcurrency').value) || 5,
    githubToken: document.getElementById('githubToken').value.trim(),
    ohosNpmScope: (document.getElementById('ohosNpmScope')?.value || '@oh-rn').trim() || '@oh-rn',
    enabledStages: mergedEnabledStages
  };

  try {
    await api.updateSettings(settings);
    await saveModelTiers();
    await loadProfile();
    await fetchPlugins();
    closeSettings();
  } catch (error) {
    showError('保存设置失败: ' + error.message);
  }
}

const TIER_LABELS = {
  high: { name: '高', badge: 'high' },
  medium: { name: '中', badge: 'medium' },
  low: { name: '低', badge: 'low' },
  multimodal: { name: '多模态', badge: 'multimodal' },
};

function renderModelTiersGrid(config) {
  const grid = document.getElementById('modelTiersGrid');
  const tiers = config.tiers || {};
  grid.innerHTML = `
    <div class="tier-header"></div>
    <div class="tier-header">OpenCode</div>
    <div class="tier-header">Claude Code</div>
    <div class="tier-header">Cline</div>
  `;
  for (const [key, meta] of Object.entries(TIER_LABELS)) {
    const t = tiers[key] || {};
    grid.innerHTML += `
      <div class="tier-label"><span class="tier-badge tier-badge-${meta.badge}"></span>${meta.name}</div>
      <input type="text" data-tier="${key}" data-backend="opencode" value="${t.opencode || ''}" placeholder="provider/model">
      <input type="text" data-tier="${key}" data-backend="claude-code" value="${t['claude-code'] || ''}" placeholder="sonnet / haiku / opus">
      <input type="text" data-tier="${key}" data-backend="cline" value="${t.cline || ''}" placeholder="model id">
    `;
  }
}

async function saveModelTiers() {
  const tiers = {};
  document.querySelectorAll('#modelTiersGrid input[data-tier]').forEach(el => {
    const tier = el.dataset.tier;
    const backend = el.dataset.backend;
    if (!tiers[tier]) tiers[tier] = {};
    tiers[tier][backend] = el.value.trim();
  });
  await fetch('/api/model-tiers', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tiers })
  });
}

async function resetModelTiers() {
  try {
    const res = await fetch('/api/model-tiers/reset', { method: 'POST' });
    const data = await res.json();
    renderModelTiersGrid(data.config || data);
  } catch (error) {
    showError('重置模型配置失败: ' + error.message);
  }
}

// ── 全局队列状态轮询 ──

async function pollQueueStatus() {
  try {
    const [pluginsData, queueStatus] = await Promise.all([
      api.fetchPluginsList(),
      api.getBatchQueueStatus()
    ]);
    const merged = mergeQueueStatusToPlugins(pluginsData, queueStatus);
    setPlugins(merged);
    renderTable();
    updateStats();
    updateQueueBar(queueStatus);
  } catch {}
}

window.clonePlugin = clonePlugin;
window.cloneHarmony = cloneHarmony;
window.deletePlugin = deletePlugin;
window.openDir = openDir;

document.getElementById('addPluginBtn').addEventListener('click', openAddPluginModal);
document.getElementById('addPluginModalClose').addEventListener('click', closeAddPluginModal);
document.getElementById('cancelAddPluginBtn').addEventListener('click', closeAddPluginModal);
document.getElementById('confirmAddPluginBtn').addEventListener('click', confirmAddPlugin);
document.getElementById('repoUrlInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') confirmAddPlugin();
});
document.getElementById('pubDownloadBtn').addEventListener('click', openPubDownloadModal);
document.getElementById('batchGitBtn').addEventListener('click', openBatchGitModal);
document.getElementById('batchGitModalClose').addEventListener('click', closeBatchGitModal);
document.getElementById('cancelBatchGitBtn').addEventListener('click', closeBatchGitModal);
document.getElementById('confirmBatchGitBtn').addEventListener('click', confirmBatchGit);
document.getElementById('pubDownloadModalClose').addEventListener('click', closePubDownloadModal);
document.getElementById('cancelPubDownloadBtn').addEventListener('click', closePubDownloadModal);
document.getElementById('confirmPubDownloadBtn').addEventListener('click', confirmPubDownload);
document.getElementById('uploadZipBtn').addEventListener('click', openUploadZipModal);
document.getElementById('uploadZipModalClose').addEventListener('click', closeUploadZipModal);
document.getElementById('cancelUploadZipBtn').addEventListener('click', closeUploadZipModal);
document.getElementById('confirmUploadZipBtn').addEventListener('click', confirmUploadZip);
document.getElementById('refreshAllBtn').addEventListener('click', refreshAllReports);
document.getElementById('exportBtn').addEventListener('click', exportCSV);
document.getElementById('cloneAllBtn').addEventListener('click', cloneAll);
initSettingsModal({
  triggerId: 'settingsBtn',
  onSaved: async () => {
    await loadProfile();
    await fetchPlugins();
  }
});
window.addEventListener('click', (e) => {
  if (e.target === document.getElementById('addPluginModal')) {
    closeAddPluginModal();
  }
  if (e.target === document.getElementById('pubDownloadModal')) {
    closePubDownloadModal();
  }
  if (e.target === document.getElementById('batchGitModal')) {
    closeBatchGitModal();
  }
  if (e.target === document.getElementById('uploadZipModal')) {
    closeUploadZipModal();
  }
});

// 清空队列按钮
document.getElementById('queueCancelAllBtn').addEventListener('click', async () => {
  if (!confirm('确定要清空全局执行队列并终止所有运行中的 Agent？')) return;
  try {
    await api.cancelBatch(null, true);
    await pollQueueStatus();
    await fetchPlugins();
  } catch (error) {
    showError('清空队列失败: ' + error.message);
  }
});

// ── 筛选 ──

const filterResetBtn = document.getElementById('filterResetBtn');

function applyFilters() {
  renderTable();
  const hasAny = Object.values(filters).some(v => v !== '');
  filterResetBtn.style.display = hasAny ? 'inline-flex' : 'none';
}

let searchDebounce = null;
document.getElementById('filterSearch').addEventListener('input', (e) => {
  clearTimeout(searchDebounce);
  searchDebounce = setTimeout(() => {
    setFilter('search', e.target.value.trim());
    applyFilters();
  }, 200);
});

document.getElementById('filterStatus').addEventListener('change', (e) => { setFilter('status', e.target.value); applyFilters(); });
document.getElementById('filterType').addEventListener('change', (e) => { setFilter('pluginType', e.target.value); applyFilters(); });
document.getElementById('filterArch').addEventListener('change', (e) => { setFilter('architecture', e.target.value); applyFilters(); });
document.getElementById('filterRecommendation').addEventListener('change', (e) => { setFilter('recommendation', e.target.value); applyFilters(); });
document.getElementById('filterQuality').addEventListener('change', (e) => { setFilter('qualityScore', e.target.value); applyFilters(); });
document.getElementById('filterSource').addEventListener('change', (e) => { setFilter('source', e.target.value); applyFilters(); });

filterResetBtn.addEventListener('click', () => {
  resetFilters();
  document.getElementById('filterSearch').value = '';
  document.getElementById('filterStatus').value = '';
  document.getElementById('filterType').value = '';
  document.getElementById('filterArch').value = '';
  document.getElementById('filterRecommendation').value = '';
  document.getElementById('filterQuality').value = '';
  document.getElementById('filterSource').value = '';
  applyFilters();
});

// ── 多选 ──

document.getElementById('selectAllCheckbox').addEventListener('change', (e) => {
  const filtered = getFilteredPlugins();
  if (e.target.checked) {
    setSelectedAll(filtered.map(p => p.id));
  } else {
    clearSelected();
  }
  renderTable();
});

document.getElementById('pluginsTableBody').addEventListener('change', (e) => {
  if (e.target.classList.contains('row-checkbox')) {
    toggleSelected(e.target.dataset.id);
    renderTable();
  }
});

document.getElementById('batchClearBtn').addEventListener('click', () => {
  clearSelected();
  renderTable();
});

// ── 批量删除 ──

document.getElementById('batchDeleteBtn').addEventListener('click', async () => {
  const targets = plugins.filter(p => selectedIds.has(p.id));

  if (targets.length === 0) {
    showError('没有选中的插件');
    return;
  }

  const catalogCount = targets.filter(p => p.in_catalog).length;
  const externalCount = targets.length - catalogCount;
  const parts = [];
  if (catalogCount > 0) parts.push(`${catalogCount} 个清单内插件将清理本地文件并恢复为未克隆状态`);
  if (externalCount > 0) parts.push(`${externalCount} 个清单外插件将删除本地文件和记录`);

  if (!confirm(`确定要删除选中的 ${targets.length} 个插件吗？\n\n${parts.join('\n')}`)) return;

  const btn = document.getElementById('batchDeleteBtn');
  btn.disabled = true;
  btn.textContent = '删除中...';

  const failures = [];
  try {
    for (const plugin of targets) {
      try {
        await api.removePlugin(plugin.id);
      } catch (error) {
        failures.push(`${plugin.name || plugin.id}: ${error.message}`);
      }
    }

    clearSelected();
    await fetchPlugins();

    if (failures.length > 0) {
      showError(`部分插件删除失败：\n${failures.join('\n')}`);
    }
  } finally {
    btn.textContent = '删除';
    btn.disabled = false;
  }
});

// ── 批量克隆（选中的） ──

document.getElementById('batchCloneBtn').addEventListener('click', async () => {
  const filtered = getFilteredPlugins();
  const targets = filtered.filter(p =>
    selectedIds.has(p.id) &&
    (p.status === 'not_cloned' || p.status === 'initialized' || p.status === 'clone_failed')
  );

  if (targets.length === 0) {
    showError('没有可克隆的插件');
    return;
  }

  if (!confirm(`确定要批量克隆 ${targets.length} 个插件吗？`)) return;

  try {
    await api.batchClone(targets.map(p => p.id));
    clearSelected();
    showBatchCloneProgress();
  } catch (error) {
    showError('批量克隆失败: ' + error.message);
  }
});

// ── 批量启动适配 ──

document.getElementById('batchStartBtn').addEventListener('click', async () => {
  const filtered = getFilteredPlugins();
  const targets = filtered.filter(p => selectedIds.has(p.id) && p.status === 'cloned' && !p.has_running);

  if (targets.length === 0) {
    showError('没有可启动的插件（需要已克隆且未在运行中）');
    return;
  }

  if (!confirm(`确定要批量启动 ${targets.length} 个插件的适配流程吗？将加入全局执行队列。`)) return;

  const btn = document.getElementById('batchStartBtn');
  btn.disabled = true;
  btn.textContent = '提交中...';

  try {
    await api.enqueueBatch(targets.map(p => p.id));
    clearSelected();
    await pollQueueStatus();
    await fetchPlugins();
  } catch (error) {
    showError('批量启动失败: ' + error.message);
  } finally {
    btn.textContent = '批量启动适配';
    btn.disabled = false;
  }
});

// ── 批量打包 Zip ──

document.getElementById('batchZipBtn').addEventListener('click', async () => {
  const filtered = getFilteredPlugins();
  const targets = filtered.filter(p => selectedIds.has(p.id) && p.status === 'cloned');

  if (targets.length === 0) {
    showError('没有可打包的插件（需要已克隆）');
    return;
  }

  if (!confirm(`确定要将 ${targets.length} 个插件打包为 Zip 文件吗？\n\n打包后的文件将保存在 repos/_zips/ 目录下。`)) return;

  const btn = document.getElementById('batchZipBtn');
  btn.disabled = true;
  btn.textContent = '打包中...';

  try {
    const result = await api.batchZipPlugins(targets.map(p => p.id));

    if (result.successCount > 0) {
      const msg = `打包完成！\n成功: ${result.successCount} 个\n大小: ${result.totalSize}\n\n保存位置: ${result.outputDir}`;
      if (confirm(msg + '\n\n是否打开输出目录？')) {
        await api.openZipOutputDir();
      }
      clearSelected();
    } else {
      showError('打包失败: 所有插件打包失败');
    }

    if (result.failedCount > 0) {
      const failed = result.results.filter(r => !r.success).map(r => `${r.pluginName}: ${r.error}`).join('\n');
      console.error('打包失败:\n' + failed);
    }
  } catch (error) {
    showError('打包失败: ' + error.message);
  } finally {
    btn.textContent = '打包';
    btn.disabled = false;
  }
});

// ── Profile 切换 ──

function populateProfileSelector() {
  const container = document.getElementById('profileSwitcher');
  const profile = getProfileData();
  if (!profile || !profile.availableProfiles) return;

  container.innerHTML = profile.availableProfiles.map(p =>
    `<button class="profile-btn${p.id === profile.id ? ' active' : ''}" data-profile="${p.id}">${p.name}</button>`
  ).join('');
}

function populateFlowSelector() {
  const select = document.getElementById('flowSwitcher');
  if (!select) return;

  select.innerHTML = FLOW_PROFILES.map(item =>
    `<option value="${item.value}"${item.value === FLOW_VERSION ? ' selected' : ''}>${item.label}</option>`
  ).join('');
}

function getFlowProfileId(version) {
  const item = FLOW_PROFILES.find(p => p.value === version);
  return item ? item.profileId : null;
}

document.getElementById('profileSwitcher').addEventListener('click', async (e) => {
  const btn = e.target.closest('.profile-btn');
  if (!btn || btn.classList.contains('active')) return;

  const profileId = btn.dataset.profile;
  const allBtns = btn.parentElement.querySelectorAll('.profile-btn');
  const prevActive = btn.parentElement.querySelector('.profile-btn.active');

  allBtns.forEach(b => b.disabled = true);
  btn.classList.add('active');
  if (prevActive && prevActive !== btn) prevActive.classList.remove('active');

  try {
    await api.switchProfile(profileId);
    const profile = await loadProfile(profileId);
    storeProfileId(profile?.id || profileId);
    applyBranding();
    populateProfileSelector();
    populateFlowSelector();
    await fetchPlugins();
  } catch (error) {
    showError('切换 Profile 失败: ' + error.message);
    if (prevActive && prevActive !== btn) {
      prevActive.classList.add('active');
      btn.classList.remove('active');
    }
  } finally {
    document.querySelectorAll('#profileSwitcher .profile-btn').forEach(b => b.disabled = false);
  }
});

document.getElementById('flowSwitcher').addEventListener('change', async (e) => {
  const profileId = getFlowProfileId(e.target.value);
  if (!profileId || profileId === PROFILE_ID) return;

  e.target.disabled = true;
  document.querySelectorAll('#profileSwitcher .profile-btn').forEach(b => b.disabled = true);

  try {
    await api.switchProfile(profileId);
    const profile = await loadProfile(profileId);
    storeProfileId(profile?.id || profileId);
    applyBranding();
    populateProfileSelector();
    populateFlowSelector();
    clearSelected();
    await fetchPlugins();
  } catch (error) {
    showError('切换流程版失败: ' + error.message);
    populateFlowSelector();
  } finally {
    e.target.disabled = false;
    document.querySelectorAll('#profileSwitcher .profile-btn').forEach(b => b.disabled = false);
  }
});

// ── Init ──

loadProfile(getStoredProfileId()).then((profile) => {
  storeProfileId(profile?.id);
  applyBranding();
  populateProfileSelector();
  populateFlowSelector();
  fetchPlugins();
});

function applyBranding() {
  const t = (id, text) => { const el = document.getElementById(id); if (el && text) el.textContent = text; };
  t('addPluginHint', BRANDING.addPluginHint);
  t('githubTokenHint', BRANDING.githubTokenHint);
  if (BRANDING.title) document.title = BRANDING.title;
  const topBar = document.querySelector('.top-bar');
  if (topBar) {
    if (BRANDING.headerGradient) topBar.style.setProperty('--header-gradient', BRANDING.headerGradient);
    if (BRANDING.headerAccent) topBar.style.setProperty('--header-accent', BRANDING.headerAccent);
  }

  const profile = getProfileData();
  const flowModeHint = document.getElementById('flowModeHint');
  if (flowModeHint) {
    flowModeHint.style.display = profile?.flowVersion === 'fast' ? 'block' : 'none';
  }

  // 只在 Flutter Profile 显示 Pub 下载按钮
  const pubDownloadBtn = document.getElementById('pubDownloadBtn');
  if (pubDownloadBtn) {
    pubDownloadBtn.style.display = profile?.framework === 'flutter' ? 'inline-flex' : 'none';
  }
  
  // 只在 Android SDK Profile 显示上传 ZIP 按钮
  const uploadZipBtn = document.getElementById('uploadZipBtn');
  if (uploadZipBtn) {
    uploadZipBtn.style.display = profile?.framework === 'android-sdk' ? 'inline-flex' : 'none';
  }
}

// Check batch clone status on load
(async () => {
  try {
    const status = await api.getBatchCloneStatus();
    if (status.running) showBatchCloneProgress();
  } catch {}
})();

// Periodic refresh
setInterval(async () => {
  try {
    const [pluginsData, queueStatus] = await Promise.all([
      api.fetchPluginsList(),
      api.getBatchQueueStatus()
    ]);
    const merged = mergeQueueStatusToPlugins(pluginsData, queueStatus);
    setPlugins(merged);
    renderTable();
    updateStats();
    updateQueueBar(queueStatus);
  } catch {}
}, 10000);
