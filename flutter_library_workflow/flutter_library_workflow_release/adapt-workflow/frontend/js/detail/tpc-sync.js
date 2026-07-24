/**
 * TPC sync button logic for the detail page.
 */

import { API_URL, withProfile } from '../constants.js';
import { showError } from '../utils.js';
import { BRANDING, TARGET_BRANCH } from '../profile-store.js';

export function setupSyncButton(getState) {
  document.getElementById('syncToTpcBtn').addEventListener('click', async () => {
    const btn = document.getElementById('syncToTpcBtn');
    const { plugin, pluginId, loadDetail } = getState();
    if (!plugin) return;

    const orgName = BRANDING.tpcOrgName || 'TPC';
    const branch = TARGET_BRANCH;
    if (!confirm(`确定要将 ${plugin.name} 的适配代码同步到 ${orgName}/${plugin.name} 的 ${branch} 分支吗？`)) return;

    btn.disabled = true;
    const origHtml = btn.innerHTML;
    btn.innerHTML = '<span class="spinner"></span> 同步中...';

    try {
      const result = await fetch(withProfile(`${API_URL}/plugins/${pluginId}/sync-to-tpc`), { method: 'POST' });
      const data = await result.json();

      if (!result.ok) {
        throw new Error(data.error || '同步失败');
      }

      const syncInfo = document.getElementById('lastSyncInfo');
      syncInfo.textContent = `已同步`;
      syncInfo.title = `上次同步: ${new Date().toLocaleString('zh-CN')}`;
      syncInfo.style.display = 'inline';

      showError(`同步成功！查看: ${data.tpcUrl}/tree/${branch}`);
      await loadDetail();
    } catch (error) {
      showError('同步失败: ' + error.message);
    } finally {
      btn.disabled = false;
      btn.innerHTML = origHtml;
    }
  });
}

export function updateSyncButton(plugin, stages) {
  const btn = document.getElementById('syncToTpcBtn');
  const syncInfo = document.getElementById('lastSyncInfo');
  if (!plugin) return;

  // Hide sync button for pub sources (no git repo to sync)
  const isPubSource = plugin.sourceType === 'pub';
  if (isPubSource) {
    btn.style.display = 'none';
    syncInfo.style.display = 'none';
    return;
  }

  const hasAdaptation = stages.some(s => s.status === 'success');
  btn.style.display = hasAdaptation ? 'inline-flex' : 'none';

  if (plugin.lastSyncTime) {
    const date = new Date(plugin.lastSyncTime);
    syncInfo.textContent = `上次同步: ${date.toLocaleDateString('zh-CN')}`;
    syncInfo.style.display = 'inline';
  }
}
