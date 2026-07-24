import { API_URL, withProfile } from '../constants.js';
import { showError } from '../utils.js';

export async function runAllStages(pluginId) {
  const resp = await fetch(withProfile(`${API_URL}/plugins/${pluginId}/run-all`), { method: 'POST' });
  const result = await resp.json();
  if (!resp.ok) throw new Error(result.error || '启动全部执行失败');
  
  return {
    queued: result.queued,
    status: result.status,
    position: result.position,
    reason: result.reason,
    queueStatus: result.queueStatus
  };
}

export async function runGraphStages(pluginId) {
  const resp = await fetch(withProfile(`${API_URL}/plugins/${pluginId}/run-graph`), { method: 'POST' });
  const result = await resp.json();
  if (!resp.ok) throw new Error(result.error || '启动图式执行失败');
  return result;
}

export async function stopAllStages(pluginId) {
  await fetch(withProfile(`${API_URL}/plugins/${pluginId}/stop-all`), { method: 'POST' });
}

export async function fetchRunAllStatus(pluginId) {
  const resp = await fetch(withProfile(`${API_URL}/plugins/${pluginId}/run-all-status`));
  return resp.json();
}

export async function fetchBatchStatus() {
  const resp = await fetch(withProfile(`${API_URL}/plugins/batch/status`));
  return resp.json();
}

export function updateRunAllBtn(isRunAll) {
  const btn = document.getElementById('runAllBtn');
  if (isRunAll) {
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> 停止执行`;
    btn.className = 'btn btn-danger';
  } else {
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg> 全部执行`;
    btn.className = 'btn btn-primary';
  }
}
