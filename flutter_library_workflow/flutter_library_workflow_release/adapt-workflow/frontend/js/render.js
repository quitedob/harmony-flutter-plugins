import { plugins, filters, selectedIds } from './state.js';
import { escapeHtml, getPluginTypeDisplay, getComplexityDisplay, getComplexityClass, getRecommendationDisplay, getRecommendationClass } from './utils.js';
import { STAGE_STATUS_TEXT } from './constants.js';
import { STAGE_IDS, STAGE_SHORT_NAMES, ARCHITECTURE_DISPLAY_MAP, TPC_ORG_URL, TARGET_BRANCH, BRANDING } from './profile-store.js';
import { PROFILE_ID } from './profile-store.js';

function buildDetailUrl(pluginId) {
  return `/detail.html?id=${encodeURIComponent(pluginId)}&profileId=${encodeURIComponent(PROFILE_ID || '')}`;
}

function matchesCurrentProfile(entry) {
  const currentProfileId = PROFILE_ID || globalThis?.__PROFILE_ID || null;
  if (!currentProfileId) return true;
  return !entry?.profileId || entry.profileId === currentProfileId;
}

function getOverallStatusKey(plugin) {
  if (plugin._queuePosition > 0) return 'queued';
  if (plugin._queuePosition === 0 || plugin.has_running) return 'running';
  if (plugin.overall_status === 'success') return 'success';
  if (plugin.overall_status === 'failed') return 'failed';
  if (plugin.status === 'not_cloned' || plugin.status === 'initialized' || plugin.status === 'clone_failed') return 'not_cloned';
  return 'pending';
}

export function getFilteredPlugins() {
  return plugins.filter(p => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const nameMatch = (p.name || '').toLowerCase().includes(q);
      const urlMatch = (p.repoUrl || '').toLowerCase().includes(q);
      if (!nameMatch && !urlMatch) return false;
    }
    if (filters.status) {
      const statusKey = getOverallStatusKey(p);
      if (filters.status === 'queued' && statusKey !== 'queued') return false;
      else if (filters.status !== 'queued' && statusKey !== filters.status) return false;
    }
    if (filters.pluginType && p.plugin_type !== filters.pluginType) return false;
    if (filters.architecture && p.plugin_architecture !== filters.architecture) return false;
    if (filters.recommendation && p.adaptation_recommendation !== filters.recommendation) return false;
    if (filters.qualityScore && (p.quality_score || '').toUpperCase() !== filters.qualityScore) return false;
    if (filters.source === 'catalog' && !p.in_catalog) return false;
    if (filters.source === 'external' && p.in_catalog) return false;
    return true;
  });
}

function formatRelativeTime(dateStr) {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now - date;
  if (diff < 60000) return '刚刚';
  if (diff < 3600000) return `${Math.floor(diff / 60000)} 分钟前`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} 小时前`;
  if (diff < 604800000) return `${Math.floor(diff / 86400000)} 天前`;
  return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function renderActionButtons(plugin) {
  let buttons = '';
  const detailUrl = buildDetailUrl(plugin.id);
  const branchIcon = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3v12"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>';

  const isPubSource = plugin.sourceType === 'pub';

  if (plugin.status === 'not_cloned' || plugin.status === 'initialized' || plugin.status === 'clone_failed') {
    if (isPubSource) {
      // Pub 来源：只显示开始下载按钮
      buttons += `
        <button class="btn btn-small btn-primary ${plugin._loading ? 'loading' : ''}"
                onclick="clonePlugin('${plugin.id}')"
                ${plugin._loading ? 'disabled' : ''}>
          ${plugin._loading ? '下载中...' : '开始下载'}
        </button>
      `;
    } else {
      // Git 来源：显示 Clone 源码和 harmony 按钮
      buttons += `
        <div class="clone-btn-group">
          <button class="btn btn-small btn-primary ${plugin._loading ? 'loading' : ''}"
                  onclick="clonePlugin('${plugin.id}')"
                  ${plugin._loading ? 'disabled' : ''}>
            ${plugin._loading ? 'Cloning...' : 'Clone 源码'}
          </button>
          ${plugin.tpcRepoUrl ? `
            <button class="btn btn-small btn-harmony" title="从 ${BRANDING.tpcOrgName || 'TPC'} 克隆 ${TARGET_BRANCH} 分支（查看他人适配结果）"
                    onclick="cloneHarmony('${plugin.id}')"
                    ${plugin._loading ? 'disabled' : ''}>
              ${branchIcon} Clone ${TARGET_BRANCH}
            </button>
          ` : ''}
        </div>
      `;
    }
  } else if (plugin.status === 'cloning') {
    buttons += `
      <button class="btn btn-small loading" disabled>
        <span class="spinner"></span> ${isPubSource ? '下载中...' : 'Cloning...'}
      </button>
    `;
  } else if (plugin.status === 'cloned') {
    let label = '开始适配';
    let btnClass = 'btn-primary';
    if (plugin.has_running) {
      label = '查看进度';
    } else if (plugin.completed_stages >= STAGE_IDS.length) {
      label = '查看详情';
      btnClass = 'btn-secondary';
    } else if (plugin.completed_stages > 0) {
      label = '继续适配';
    }
    buttons += `<a href="${detailUrl}" class="btn btn-small ${btnClass}">${label}</a>`;

    // 只有 Git 来源才显示 harmony 分支按钮
    if (!isPubSource && plugin.tpcRepoUrl && !plugin.has_running) {
      buttons += `
        <button class="btn btn-small btn-harmony" title="切换到 ${TARGET_BRANCH} 分支（查看他人适配结果）"
                onclick="cloneHarmony('${plugin.id}')">
          ${branchIcon} ${TARGET_BRANCH}
        </button>
      `;
    }

    // 所有已克隆的都显示打开目录按钮
    buttons += `
      <button class="btn btn-small btn-secondary" onclick="openDir('${plugin.id}')">
        打开目录
      </button>
    `;
  }

  if (plugin.in_catalog && (plugin.status === 'not_cloned' || plugin.status === 'initialized')) {
    // Catalog items that aren't cloned — no delete button (they always appear from catalog)
  } else {
    const delLabel = plugin.in_catalog ? '清理' : '删除';
    const delTitle = plugin.in_catalog
      ? (isPubSource ? '删除本地文件，恢复为未下载状态' : '删除本地文件，恢复为未克隆状态')
      : '彻底删除插件和本地文件';
    buttons += `
      <button class="btn btn-small btn-danger" onclick="deletePlugin('${plugin.id}')"
              title="${delTitle}"
              ${plugin._loading ? 'disabled' : ''}>
        ${delLabel}
      </button>
    `;
  }

  return buttons;
}

function renderStageProgress(plugin) {
  const isPubSource = plugin.sourceType === 'pub';
  const notDownloadedText = isPubSource ? '未下载' : '未克隆';
  const downloadingText = isPubSource ? '下载中' : '克隆中';
  const downloadFailedText = isPubSource ? '下载失败' : '克隆失败';

  if (plugin.status === 'not_cloned' || plugin.status === 'initialized') {
    return `<span class="stage-progress-text">${notDownloadedText}</span>`;
  }
  if (plugin.status === 'cloning') {
    return `<span class="stage-progress-text"><span class="mini-spinner"></span> ${downloadingText}</span>`;
  }
  if (plugin.status === 'clone_failed') {
    return `<span class="stage-progress-text"><span class="text-danger-sm">${downloadFailedText}</span></span>`;
  }

  if (plugin._queuePosition > 0) {
    return `<span class="stage-progress-text"><span class="queue-badge">排队中 #${plugin._queuePosition}</span></span>`;
  }

  const info = plugin.stages_info;

  const dots = STAGE_IDS.map(id => {
    const status = info ? (info[id] || 'idle') : 'idle';
    const statusText = STAGE_STATUS_TEXT[status] || status;
    const name = STAGE_SHORT_NAMES[id];
    return `<span class="stage-dot ${status}" title="${name}: ${statusText}"></span>`;
  }).join('');

  let progressText = '';
  if (plugin.has_running && plugin.running_stage_name) {
    progressText = `<span class="stage-running-label"><span class="mini-spinner"></span>${escapeHtml(plugin.running_stage_name)}中</span>`;
  } else {
    const total = STAGE_IDS.length;
    const completed = plugin.completed_stages || 0;
    if (completed === 0) {
      progressText = '待开始';
    } else if (completed >= total) {
      progressText = '<span class="text-success-sm">全部完成</span>';
    } else {
      const failedId = info ? STAGE_IDS.find(id => info[id] === 'failed') : null;
      if (failedId) {
        progressText = `<span class="text-danger-sm">${STAGE_SHORT_NAMES[failedId]}失败</span>`;
      } else {
        progressText = `${completed}/${total} 已完成`;
      }
    }
  }

  return `
    <div class="stage-progress">
      <div class="stage-dots">${dots}</div>
      <div class="stage-progress-text">${progressText}</div>
    </div>
  `;
}

function renderArchInfo(plugin) {
  if (!plugin.plugin_architecture) return '<span class="text-muted">-</span>';
  const archLabel = ARCHITECTURE_DISPLAY_MAP[plugin.plugin_architecture] || plugin.plugin_architecture;
  return `<span class="arch-badge">${escapeHtml(archLabel)}</span>`;
}

function renderTypeInfo(plugin) {
  if (!plugin.plugin_type) return '<span class="text-muted">-</span>';
  const typeDisplay = getPluginTypeDisplay(plugin.plugin_type);
  return `<span class="type-badge">${escapeHtml(typeDisplay)}</span>`;
}

function renderSourceBadge(plugin) {
  if (plugin.sourceType === 'pub') {
    const version = plugin.pubVersion || '';
    const title = version ? `Pub.dev v${version}` : 'Pub.dev';
    return `<span class="source-badge source-pub" title="${title}">Pub${version ? ` ${version}` : ''}</span>`;
  }
  return '<span class="source-badge source-git" title="Git Clone">Git</span>';
}

export function renderTable() {
  const tbody = document.getElementById('pluginsTableBody');
  const selectAllCb = document.getElementById('selectAllCheckbox');
  const filtered = getFilteredPlugins();

  // 按添加时间倒序排序
  filtered.sort((a, b) => {
    const timeA = a.addedAt || a.cloneTime || 0;
    const timeB = b.addedAt || b.cloneTime || 0;
    return new Date(timeB) - new Date(timeA);
  });

  updateFilterResultCount(filtered);

  if (plugins.length === 0) {
    if (selectAllCb) selectAllCb.checked = false;
    tbody.innerHTML = `
      <tr>
        <td colspan="9" class="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
          <p>暂无插件数据</p>
          <p class="empty-hint">在上方输入仓库地址添加第一个插件</p>
        </td>
      </tr>
    `;
    updateBatchBar(filtered);
    return;
  }

  if (filtered.length === 0) {
    if (selectAllCb) selectAllCb.checked = false;
    tbody.innerHTML = `
      <tr>
        <td colspan="9" class="empty-state">
          <p>没有匹配筛选条件的插件</p>
          <p class="empty-hint">尝试调整筛选条件</p>
        </td>
      </tr>
    `;
    updateBatchBar(filtered);
    return;
  }

  if (selectAllCb) {
    selectAllCb.checked = filtered.length > 0 && filtered.every(p => selectedIds.has(p.id));
  }

  tbody.innerHTML = filtered.map(plugin => {
    const detailUrl = buildDetailUrl(plugin.id);
    const repoShort = (plugin.repoUrl || '')
      .replace(/^https?:\/\/(github\.com|gitee\.com)\//, '')
      .replace(/\.git$/, '');
    const checked = selectedIds.has(plugin.id) ? 'checked' : '';
    const rowCls = [
      plugin.has_running ? 'row-running' : '',
      selectedIds.has(plugin.id) ? 'row-selected' : '',
      plugin.status === 'not_cloned' ? 'row-not-cloned' : '',
      plugin._queuePosition > 0 ? 'row-queued' : ''
    ].filter(Boolean).join(' ');

    return `
    <tr${rowCls ? ` class="${rowCls}"` : ''}>
      <td class="td-checkbox">
        <input type="checkbox" class="row-checkbox" data-id="${plugin.id}" ${checked}>
      </td>
      <td>
        <div class="plugin-name-row">
          <a href="${detailUrl}" class="plugin-name-link">
            <strong>${escapeHtml(plugin.name)}</strong>
          </a>
          ${renderSourceBadge(plugin)}
        </div>
        <div class="plugin-repo-url">${escapeHtml(repoShort)}</div>
      </td>
      <td class="td-center">
        ${renderArchInfo(plugin)}
      </td>
      <td class="td-center">
        ${renderTypeInfo(plugin)}
      </td>
      <td class="td-center">
        ${plugin.adaptation_recommendation ? `<span class="status-badge status-${getRecommendationClass(plugin.adaptation_recommendation)}">${getRecommendationDisplay(plugin.adaptation_recommendation)}</span>` : '<span class="text-muted">-</span>'}
      </td>
      <td class="td-center">
        ${renderStageProgress(plugin)}
      </td>
      <td class="td-center">
        ${plugin.quality_score ? `<span class="quality-badge quality-${plugin.quality_score.toLowerCase()}">${escapeHtml(plugin.quality_score)}</span>` : '<span class="text-muted">-</span>'}
      </td>
      <td class="td-updated">
        ${formatRelativeTime(plugin.updated_at || plugin.cloneTime)}
      </td>
      <td>
        <div class="actions">
          ${renderActionButtons(plugin)}
        </div>
      </td>
    </tr>
  `;}).join('');

  updateBatchBar(filtered);
}

function updateBatchBar(filtered) {
  const bar = document.getElementById('batchActionBar');
  if (!bar) return;
  const count = selectedIds.size;
  if (count === 0) {
    bar.classList.remove('visible');
    return;
  }
  const selectedInView = filtered.filter(p => selectedIds.has(p.id));
  const selectedPlugins = plugins.filter(p => selectedIds.has(p.id));
  const canStart = selectedInView.filter(p => p.status === 'cloned' && !p.has_running);
  const canClone = selectedInView.filter(p => p.status === 'not_cloned' || p.status === 'initialized' || p.status === 'clone_failed');
  const canZip = selectedInView.filter(p => p.status === 'cloned');
  bar.classList.add('visible');
  document.getElementById('batchSelectedCount').textContent = count;

  const startBtn = document.getElementById('batchStartBtn');
  if (startBtn) {
    startBtn.disabled = canStart.length === 0;
    startBtn.textContent = canStart.length > 0 ? `批量启动适配 (${canStart.length})` : '批量启动适配';
  }

  const cloneBtn = document.getElementById('batchCloneBtn');
  if (cloneBtn) {
    cloneBtn.disabled = canClone.length === 0;
    cloneBtn.textContent = canClone.length > 0 ? `批量克隆 (${canClone.length})` : '批量克隆';
  }

  const zipBtn = document.getElementById('batchZipBtn');
  if (zipBtn) {
    zipBtn.disabled = canZip.length === 0;
    zipBtn.textContent = canZip.length > 0 ? `打包 (${canZip.length})` : '打包';
  }

  const deleteBtn = document.getElementById('batchDeleteBtn');
  if (deleteBtn) {
    deleteBtn.disabled = selectedPlugins.length === 0;
    deleteBtn.textContent = selectedPlugins.length > 0 ? `删除 (${selectedPlugins.length})` : '删除';
  }
}

function updateFilterResultCount(filtered) {
  const el = document.getElementById('filterResultCount');
  if (!el) return;
  const hasFilter = Object.values(filters).some(v => v !== '');
  if (!hasFilter || plugins.length === 0) {
    el.textContent = '';
  } else {
    el.textContent = `${filtered.length} / ${plugins.length}`;
  }
}

export function updateStats() {
  const total = plugins.length;
  const running = plugins.filter(p => p.has_running).length;
  const success = plugins.filter(p => p.overall_status === 'success').length;
  const failed = plugins.filter(p => p.overall_status === 'failed').length;
  const notCloned = plugins.filter(p => p.status === 'not_cloned' || p.status === 'initialized').length;

  document.getElementById('totalCount').textContent = total;
  document.getElementById('runningCount').textContent = running;
  document.getElementById('successCount').textContent = success;
  document.getElementById('failedCount').textContent = failed;

  const notClonedEl = document.getElementById('notClonedCount');
  if (notClonedEl) notClonedEl.textContent = notCloned;
}

export function updateQueueBar(queueStatus) {
  const bar = document.getElementById('queueStatusBar');
  if (!bar) return;

  if (!queueStatus || (queueStatus.running.length === 0 && queueStatus.queued.length === 0)) {
    bar.style.display = 'none';
    return;
  }

  bar.style.display = 'flex';
  const runCount = queueStatus.running.length;
  const waitCount = queueStatus.queued.length;
  const doneCount = (queueStatus.recentCompleted || []).length;

  document.getElementById('queueRunningCount').textContent = runCount;
  document.getElementById('queueWaitingCount').textContent = waitCount;
  document.getElementById('queueDoneCount').textContent = doneCount;
}

export function mergeQueueStatusToPlugins(plugins, queueStatus) {
  if (!queueStatus) return plugins;

  const running = queueStatus.running.filter(matchesCurrentProfile);
  const queued = queueStatus.queued.filter(matchesCurrentProfile);

  const runningSet = new Set(running.map(r => r.pluginId));
  const queuedMap = new Map();
  queued.forEach((q, idx) => {
    queuedMap.set(q.pluginId, q.position || (idx + 1));
  });

  return plugins.map(p => {
    if (runningSet.has(p.id)) {
      return { ...p, _queuePosition: 0, _isRunningInQueue: true };
    }
    if (queuedMap.has(p.id)) {
      return { ...p, _queuePosition: queuedMap.get(p.id) };
    }
    return { ...p, _queuePosition: -1 };
  });
}
