import { API_URL, withProfile } from '../constants.js';
import { escapeHtml } from '../utils.js';

function fmtNum(n) {
  return Number(n || 0).toLocaleString('en-US');
}

function pct(part, whole) {
  if (!whole) return '0.0';
  return ((part / whole) * 100).toFixed(1);
}

function tsCell(label, value, sub) {
  return `<div class="ts-cell">
    <div class="ts-cell-value">${value}</div>
    <div class="ts-cell-label">${label}${sub ? ` <span class="ts-cell-sub">${sub}</span>` : ''}</div>
  </div>`;
}

function tsRow(label, value) {
  return `<div class="ts-row"><span class="ts-row-label">${label}</span><span class="ts-row-value">${value}</span></div>`;
}

/**
 * Render one stats block (reused for both all-time and since-clone).
 */
function renderOneStats(stats, stageSnapshots) {
  const { sessions, totals, byModel, byAgent } = stats;
  let html = '';

  html += `<div class="ts-grid">`;
  html += tsCell('Session', `${sessions.total}`, `${sessions.primary_count} 主 / ${sessions.sub_count} 子`);
  html += tsCell('交互次数', fmtNum(totals.interactions), '次');
  html += tsCell('总 Token', fmtNum(totals.total_tokens), '');
  html += tsCell('费用', `$${Number(totals.total_cost || 0).toFixed(4)}`, '');
  html += `</div>`;

  html += `<div class="ts-detail-rows">`;
  html += tsRow('输入 Token', fmtNum(totals.input_tokens));
  html += tsRow('输出 Token', fmtNum(totals.output_tokens));
  if (totals.reasoning_tokens > 0) {
    html += tsRow('推理 Token', fmtNum(totals.reasoning_tokens));
  }
  html += tsRow('缓存读取', fmtNum(totals.cache_read));
  if (totals.cache_write > 0) {
    html += tsRow('缓存写入', fmtNum(totals.cache_write));
  }
  html += `</div>`;

  if (byModel && byModel.length > 0) {
    html += `<div class="ts-sub-section"><div class="ts-section-title">按模型分布</div>`;
    html += `<table class="ts-table"><thead><tr><th>模型</th><th>交互</th><th>Token</th><th>占比</th></tr></thead><tbody>`;
    for (const row of byModel) {
      html += `<tr><td class="ts-model">${escapeHtml(row.model || '-')}</td>`;
      html += `<td>${fmtNum(row.interactions)}</td>`;
      html += `<td>${fmtNum(row.total_tokens)}</td>`;
      html += `<td>${pct(row.total_tokens, totals.total_tokens)}%</td></tr>`;
    }
    html += `</tbody></table></div>`;
  }

  if (byAgent && byAgent.length > 0) {
    html += `<div class="ts-sub-section"><div class="ts-section-title">按 Agent 分布</div>`;
    html += `<table class="ts-table"><thead><tr><th>Agent</th><th>交互</th><th>Token</th></tr></thead><tbody>`;
    for (const row of byAgent) {
      html += `<tr><td class="ts-agent">${escapeHtml(row.agent || '-')}</td>`;
      html += `<td>${fmtNum(row.interactions)}</td>`;
      html += `<td>${fmtNum(row.total_tokens)}</td></tr>`;
    }
    html += `</tbody></table></div>`;
  }

  if (stageSnapshots && stageSnapshots.length > 0) {
    html += `<div class="ts-sub-section"><div class="ts-section-title">各阶段消耗</div>`;
    html += `<table class="ts-table"><thead><tr><th>阶段</th><th>本阶段</th><th>累计</th></tr></thead><tbody>`;
    for (const snap of stageSnapshots) {
      html += `<tr><td>${escapeHtml(snap.stageId)}</td>`;
      html += `<td>${fmtNum(snap.delta.total_tokens)}</td>`;
      html += `<td>${fmtNum(snap.cumulative.total_tokens)}</td></tr>`;
    }
    html += `</tbody></table></div>`;
  }

  return html;
}

function renderDbStats(data) {
  const { all, sinceClone, cloneTime, stageSnapshots, source } = data;
  let html = '';

  // 数据来源标识
  const sourceLabel = source === 'cache' ? '(缓存)' : '(已刷新)';
  html += `<div class="ts-header-bar">
    <span class="ts-source-label">${sourceLabel}</span>
    <button class="ts-refresh-btn" id="tsRefreshBtn" title="刷新数据">刷新</button>
  </div>`;

  const hasSinceClone = sinceClone && sinceClone.totals && sinceClone.totals.interactions > 0;

  if (hasSinceClone) {
    const cloneLabel = cloneTime
      ? cloneTime.replace('T', ' ').replace(/\.\d+Z$/, '').substring(0, 16)
      : '';
    html += `<div class="ts-section">`;
    html += `<div class="ts-section-header">本轮统计 <span class="ts-section-sub">自 ${escapeHtml(cloneLabel)} clone 起</span></div>`;
    html += renderOneStats(sinceClone, stageSnapshots);
    html += `</div>`;

    html += `<div class="ts-section ts-section-muted">`;
    html += `<div class="ts-section-header ts-toggle" id="tsToggleAll">历史汇总（全部数据） <span class="ts-toggle-icon">▸</span></div>`;
    html += `<div class="ts-collapsible" id="tsAllContent" style="display:none;">`;
    html += renderOneStats(all, null);
    html += `</div></div>`;
  } else {
    html += `<div class="ts-section">`;
    html += renderOneStats(all, stageSnapshots);
    html += `</div>`;
  }

  return html;
}

function renderCliStats(data) {
  const rows = [
    { label: 'Total Cost', value: data.totalCost, highlight: true },
    { label: 'Avg Cost/Day', value: data.avgCostPerDay, highlight: true },
    { label: 'Avg Tokens/Session', value: data.avgTokensPerSession },
    { label: 'Median Tokens/Session', value: data.medianTokensPerSession },
    { label: 'Input', value: data.input },
    { label: 'Output', value: data.output },
    { label: 'Cache Read', value: data.cacheRead },
    { label: 'Cache Write', value: data.cacheWrite },
  ].filter(r => r.value !== undefined);

  if (rows.length === 0) return '';

  return rows.map(r =>
    `<div class="popover-row ${r.highlight ? 'row-highlight' : ''}">
      <span class="row-label">${escapeHtml(r.label)}</span>
      <span class="row-value">${escapeHtml(r.value)}</span>
    </div>`
  ).join('');
}

let _loading = false;
let _currentPluginId = null;

async function fetchAndRenderTokenStats(pluginId, refresh = false) {
  const btn = document.getElementById('tokenStatsBtn');
  const body = document.getElementById('tokenStatsBody');
  const popover = document.getElementById('tokenStatsPopover');

  if (_loading) return;
  _loading = true;
  _currentPluginId = pluginId;

  btn.classList.add('loading');
  body.innerHTML = '<div class="ts-loading"><span class="spinner-sm"></span> 正在统计 Token 用量...</div>';
  popover.classList.add('visible');

  try {
    const url = refresh
      ? `${API_URL}/plugins/${pluginId}/token-stats?refresh=true`
      : `${API_URL}/plugins/${pluginId}/token-stats`;
    const response = await fetch(withProfile(url));
    if (!response.ok) {
      body.innerHTML = '<div class="ts-empty">查询失败</div>';
      return;
    }
    const data = await response.json();
    if (!data.available) {
      body.innerHTML = '<div class="ts-empty">暂无统计数据</div>';
      return;
    }

    const html = data.source === 'db' || data.source === 'cache' ? renderDbStats(data) : renderCliStats(data);
    body.innerHTML = html || '<div class="ts-empty">暂无统计数据</div>';

    // 绑定刷新按钮事件
    const refreshBtn = body.querySelector('#tsRefreshBtn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!_loading && _currentPluginId) {
          fetchAndRenderTokenStats(_currentPluginId, true);
        }
      });
    }

    const toggle = body.querySelector('#tsToggleAll');
    if (toggle) {
      toggle.addEventListener('click', () => {
        const content = body.querySelector('#tsAllContent');
        const icon = toggle.querySelector('.ts-toggle-icon');
        if (content.style.display === 'none') {
          content.style.display = 'block';
          icon.textContent = '▾';
        } else {
          content.style.display = 'none';
          icon.textContent = '▸';
        }
      });
    }
  } catch {
    body.innerHTML = '<div class="ts-empty">查询失败</div>';
  } finally {
    _loading = false;
    btn.classList.remove('loading');
  }
}

export function loadTokenStats(pluginId) {
  const btn = document.getElementById('tokenStatsBtn');
  btn.style.display = '';

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const popover = document.getElementById('tokenStatsPopover');
    if (popover.classList.contains('visible') && !_loading) {
      popover.classList.remove('visible');
    } else {
      fetchAndRenderTokenStats(pluginId);
    }
  });

  document.addEventListener('click', (e) => {
    const popover = document.getElementById('tokenStatsPopover');
    if (!popover.contains(e.target) && e.target !== btn) {
      popover.classList.remove('visible');
    }
  });
}