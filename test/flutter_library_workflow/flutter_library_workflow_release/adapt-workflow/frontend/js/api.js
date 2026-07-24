import { API_URL, withProfile } from './constants.js';

export async function fetchPluginsList() {
  const response = await fetch(withProfile(`${API_URL}/plugins`));
  return response.json();
}

export async function createPlugin(repoUrl, name, sourceUrl, tpcRepoUrl, packagePath) {
  const response = await fetch(withProfile(`${API_URL}/plugins`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ repoUrl, name, sourceUrl, tpcRepoUrl, packagePath })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.json();
}

export async function batchCreatePlugins(urls) {
  const response = await fetch(withProfile(`${API_URL}/plugins/batch-create`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ urls })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.json();
}

export async function removePlugin(id) {
  const response = await fetch(withProfile(`${API_URL}/plugins/${id}`), { method: 'DELETE' });

  if (!response.ok) {
    throw new Error('删除失败');
  }

  return response.json();
}

export async function clonePluginRepo(id, branch) {
  const response = await fetch(withProfile(`${API_URL}/plugins/${id}/clone`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ branch })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.json();
}

export async function batchClone(ids, all) {
  const response = await fetch(withProfile(`${API_URL}/plugins/batch-clone`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(all ? { all: true } : { ids })
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
  return response.json();
}

export async function getBatchCloneStatus() {
  const response = await fetch(withProfile(`${API_URL}/plugins/batch-clone/status`));
  return response.json();
}

export async function refreshAllPluginReports() {
  const response = await fetch(withProfile(`${API_URL}/refresh-all-reports`), { method: 'POST' });

  if (!response.ok) {
    throw new Error('刷新失败');
  }

  return response.json();
}

export async function killPluginAgent(id) {
  await fetch(withProfile(`${API_URL}/plugins/${id}/kill-agent`), { method: 'POST' });
}

export async function openPluginDir(id) {
  const response = await fetch(withProfile(`${API_URL}/plugins/${id}/open-dir`), { method: 'POST' });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.json();
}

export async function fetchExportCSV() {
  const response = await fetch(withProfile(`${API_URL}/export`));
  return response.blob();
}

// ── 批量执行队列 ──

export async function enqueueBatch(pluginIds) {
  const response = await fetch(withProfile(`${API_URL}/plugins/batch/enqueue`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pluginIds })
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
  return response.json();
}

export async function getBatchQueueStatus() {
  const response = await fetch(withProfile(`${API_URL}/plugins/batch/status`));
  return response.json();
}

export async function cancelBatch(pluginIds, all) {
  const response = await fetch(withProfile(`${API_URL}/plugins/batch/cancel`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(all ? { all: true } : { pluginIds })
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
  return response.json();
}

// ── 同步到 TPC ──

export async function syncToTpc(id) {
  const response = await fetch(withProfile(`${API_URL}/plugins/${id}/sync-to-tpc`), { method: 'POST' });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
  return response.json();
}

// ── Pub.dev 下载 ──

export async function pubDownload(packageNames) {
  const response = await fetch(withProfile(`${API_URL}/plugins/pub-download`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ packageNames })
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
  return response.json();
}

export async function getPubDownloadStatus() {
  const response = await fetch(withProfile(`${API_URL}/plugins/pub-download/status`));
  return response.json();
}

export async function uploadZip(formData) {
  const response = await fetch(withProfile(`${API_URL}/plugins/zip-upload`), {
    method: 'POST',
    body: formData
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
  return response.json();
}

export async function resolvePubPackages(packageNames) {
  const response = await fetch(withProfile(`${API_URL}/plugins/pub-download/resolve`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ packageNames })
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
  return response.json();
}

// ── Profile 切换 ──

export async function switchProfile(profileId) {
  const response = await fetch(`${API_URL}/profile?profileId=${encodeURIComponent(profileId)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profileId })
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
  return response.json();
}

// ── 设置 ──

export async function fetchSettings() {
  const response = await fetch(`${API_URL}/settings`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
  return response.json();
}

export async function updateSettings(settings) {
  const response = await fetch(`${API_URL}/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings)
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
  return response.json();
}

// ── 提供商管理 ──

export async function fetchProviders() {
  const response = await fetch(`${API_URL}/providers`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
  return response.json();
}


// ── 批量打包 Zip ──

export async function batchZipPlugins(ids) {
  const response = await fetch(withProfile(`${API_URL}/plugins/batch-zip`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids })
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
  return response.json();
}

export async function getZipOutputDir() {
  const response = await fetch(withProfile(`${API_URL}/plugins/batch-zip/output-dir`));
  return response.json();
}

export async function openZipOutputDir() {
  const response = await fetch(withProfile(`${API_URL}/plugins/batch-zip/open-output-dir`), { method: 'POST' });
  return response.json();
}

// ── Mapping (global mapping library) ──

export async function fetchMappingSources() {
  const response = await fetch(`${API_URL}/mapping/sources`);
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || '加载 mapping sources 失败');
  }
  return response.json();
}

export async function createMappingSource({ name, gitUrl, branch, enabled, tags, notes }) {
  const response = await fetch(`${API_URL}/mapping/sources`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, gitUrl, branch, enabled, tags, notes })
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || '添加 mapping source 失败');
  }
  return response.json();
}

export async function updateMappingSource(id, patch) {
  const response = await fetch(`${API_URL}/mapping/sources/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch || {})
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || '更新 mapping source 失败');
  }
  return response.json();
}

export async function deleteMappingSource(id) {
  const response = await fetch(`${API_URL}/mapping/sources/${encodeURIComponent(id)}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || '删除 mapping source 失败');
  }
  return response.json();
}

export async function importMappingSourcesCsv(csvText) {
  const response = await fetch(`${API_URL}/mapping/sources/import-csv`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ csv: csvText })
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || '导入 CSV 失败');
  }
  return response.json();
}

export async function runMappingSource(id) {
  const response = await fetch(`${API_URL}/mapping/sources/${encodeURIComponent(id)}/run`, {
    method: 'POST'
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || '启动映射分析失败');
  }
  return response.json();
}

export async function fetchMappingQueueStatus() {
  const response = await fetch(`${API_URL}/mapping/queue/status`);
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || '获取 mapping 队列状态失败');
  }
  return response.json();
}

export async function cancelAllMappingQueue() {
  const response = await fetch(`${API_URL}/mapping/queue/cancel-all`, {
    method: 'POST'
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || '停止批量执行失败');
  }
  return response.json();
}

export async function cancelMappingSource(id) {
  const response = await fetch(`${API_URL}/mapping/sources/${encodeURIComponent(id)}/cancel`, {
    method: 'POST'
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || '停止映射分析失败');
  }
  return response.json();
}

export async function fetchMappingSourceResult(id) {
  const response = await fetch(`${API_URL}/mapping/sources/${encodeURIComponent(id)}/result`);
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || '获取分析结果失败');
  }
  return response.json();
}

export async function fetchMappingSourceValidation(id) {
  const response = await fetch(`${API_URL}/mapping/sources/${encodeURIComponent(id)}/validation`);
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || '获取校验报告失败');
  }
  return response.json();
}

export async function fetchMappingIndex() {
  const response = await fetch(`${API_URL}/mapping/index`);
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || '加载汇总映射表失败');
  }
  return response.json();
}

export async function updateMappingReview(key, patch) {
  const response = await fetch(`${API_URL}/mapping/index/${encodeURIComponent(key)}/review`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch || {})
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || '更新审核状态失败');
  }
  return response.json();
}

// ── Upgrade（三方库升级；全局，不依赖 profile） ──
// 与 mapping 段一致：均不使用 withProfile()，保持与「鸿蒙化」profile 系统解耦。

export async function fetchUpgradeLibraries() {
  const response = await fetch(`${API_URL}/upgrade/libraries`);
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || '加载升级库列表失败');
  }
  return response.json();
}

export async function fetchUpgradeLibraryDetail(id) {
  const response = await fetch(`${API_URL}/upgrade/libraries/${encodeURIComponent(id)}/detail`);
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || '加载升级详情失败');
  }
  return response.json();
}

export async function createUpgradeLibrary({ type, name, repoUrl, harmonizedRepoUrl, repoBranch, harmonizedBranch, targetOsVersion, targetFrameworkVersion, enabled }) {
  const response = await fetch(`${API_URL}/upgrade/libraries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, name, repoUrl, harmonizedRepoUrl, repoBranch, harmonizedBranch, targetOsVersion, targetFrameworkVersion, enabled })
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || '添加升级库失败');
  }
  return response.json();
}

export async function updateUpgradeLibrary(id, patch) {
  const response = await fetch(`${API_URL}/upgrade/libraries/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch || {})
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || '更新升级库失败');
  }
  return response.json();
}

export async function deleteUpgradeLibrary(id) {
  const response = await fetch(`${API_URL}/upgrade/libraries/${encodeURIComponent(id)}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || '删除升级库失败');
  }
  return response.json();
}

export async function runUpgradeLibrary(id) {
  const response = await fetch(`${API_URL}/upgrade/libraries/${encodeURIComponent(id)}/run`, {
    method: 'POST'
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || '启动升级失败');
  }
  return response.json();
}

export async function cloneUpgradeLibrary(id) {
  const response = await fetch(`${API_URL}/upgrade/libraries/${encodeURIComponent(id)}/clone`, {
    method: 'POST'
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || '启动克隆失败');
  }
  return response.json();
}

export async function batchCloneUpgradeLibraries({ ids, all } = {}) {
  const response = await fetch(`${API_URL}/upgrade/batch-clone`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(all ? { all: true } : { ids })
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || '批量克隆失败');
  }
  return response.json();
}

export async function getUpgradeBatchCloneStatus() {
  const response = await fetch(`${API_URL}/upgrade/batch-clone/status`);
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || '获取批量克隆状态失败');
  }
  return response.json();
}

export async function openUpgradeLibraryDir(id) {
  const response = await fetch(`${API_URL}/upgrade/libraries/${encodeURIComponent(id)}/open-dir`, {
    method: 'POST'
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || '打开目录失败');
  }
  return response.json();
}

export async function fetchUpgradeQueueStatus() {
  const response = await fetch(`${API_URL}/upgrade/queue/status`);
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || '获取升级队列状态失败');
  }
  return response.json();
}

export async function cancelAllUpgradeQueue() {
  const response = await fetch(`${API_URL}/upgrade/queue/cancel-all`, {
    method: 'POST'
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || '停止批量升级失败');
  }
  return response.json();
}

export async function cancelUpgradeLibrary(id) {
  const response = await fetch(`${API_URL}/upgrade/libraries/${encodeURIComponent(id)}/cancel`, {
    method: 'POST'
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || '停止升级失败');
  }
  return response.json();
}

export async function fetchUpgradeLibraryResult(id) {
  const response = await fetch(`${API_URL}/upgrade/libraries/${encodeURIComponent(id)}/result`);
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || '获取升级结果失败');
  }
  return response.json();
}

// ── Upgrade per-stage SSE execution (mirrors adaptation agent.js SSE pattern) ──

/**
 * Get the SSE EventSource URL for running a stage.
 * The frontend creates an EventSource with this URL.
 */
export function getUpgradeStageRunUrl(libraryId, stageId) {
  return `${API_URL}/upgrade/libraries/${encodeURIComponent(libraryId)}/stages/${encodeURIComponent(stageId)}/run`;
}

/**
 * Get the SSE EventSource URL for log streaming (reconnection).
 */
export function getUpgradeStageLogStreamUrl(libraryId, stageId) {
  return `${API_URL}/upgrade/libraries/${encodeURIComponent(libraryId)}/stages/${encodeURIComponent(stageId)}/log-stream`;
}

/**
 * Check stage status (for reconnection after SSE disconnect).
 */
export async function fetchUpgradeStageStatus(libraryId, stageId) {
  const response = await fetch(
    `${API_URL}/upgrade/libraries/${encodeURIComponent(libraryId)}/stages/${encodeURIComponent(stageId)}/status`
  );
  if (!response.ok) {
    throw new Error('获取阶段状态失败');
  }
  return response.json();
}

/**
 * Kill a running stage (mirrors adaptation POST /:id/stages/:stageId/kill).
 */
export async function killUpgradeStage(libraryId, stageId) {
  const response = await fetch(
    `${API_URL}/upgrade/libraries/${encodeURIComponent(libraryId)}/stages/${encodeURIComponent(stageId)}/kill`,
    { method: 'POST' }
  );
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || '停止阶段失败');
  }
  return response.json();
}

export async function fetchUpgradeStageLog(libraryId, stageId) {
  const response = await fetch(
    `${API_URL}/upgrade/libraries/${encodeURIComponent(libraryId)}/stages/${encodeURIComponent(stageId)}/log`
  );
  if (!response.ok) {
    throw new Error('阶段日志不存在');
  }
  return response.text();
}

export async function fetchUpgradeStageReport(libraryId, stageId) {
  const response = await fetch(
    `${API_URL}/upgrade/libraries/${encodeURIComponent(libraryId)}/stages/${encodeURIComponent(stageId)}/report`
  );
  if (!response.ok) {
    throw new Error('阶段报告不存在');
  }
  return response.text();
}

export async function fetchUpgradeStageOutput(libraryId, stageId) {
  const response = await fetch(
    `${API_URL}/upgrade/libraries/${encodeURIComponent(libraryId)}/stages/${encodeURIComponent(stageId)}/output`
  );
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || '获取阶段数据失败');
  }
  return response.json();
}
