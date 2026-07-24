import { escapeHtml, formatDuration } from '../utils.js';
import {
  getStatusClass, getStatusText, getPluginTypeDisplay,
  getAdaptStatusClass, getAdaptStatusText, getArchitectureDisplay,
  getComplexityDisplay, getComplexityClass, getRecommendationDisplay,
  getRecommendationClass, getTargetReadinessDisplay, getTargetReadinessClass
} from '../utils.js';
import { TPC_ORG_URL, BRANDING, DASHBOARD_CARDS } from '../profile-store.js';

let _lastStripMetricsHtml = '';
let _lastStripTimeStructure = '';

export function renderDashboard(plugin, analysisData, planningData, stages) {
  document.getElementById('pluginTitle').textContent = plugin.name;
  document.title = `${plugin.name} - Plugin Adaptation Workflow`;

  renderStrip(plugin, analysisData, stages);
  renderOverviewCards(plugin, analysisData, planningData, stages);
}

function renderStrip(plugin, a, stages) {
  const el = document.getElementById('overviewStrip');
  if (!el) return;

  const info = plugin.adaptation?.plugin_info;
  const overallStatus = plugin.adaptation?.overall_status;
  const score = plugin.adaptation?.quality_score;
  const recommendation = plugin.adaptation?.adaptation_recommendation;
  const metrics = [];

  const pluginType = a?.plugin_type || info?.type;
  if (pluginType) {
    metrics.push({ label: '类型', value: getPluginTypeDisplay(pluginType), cls: 'primary' });
  }

  const arch = a?.plugin_architecture || info?.architecture;
  if (arch) {
    metrics.push({ label: '架构', value: getArchitectureDisplay(arch), cls: '' });
  }

  const complexity = a?.complexity_assessment;
  if (complexity?.level) {
    const cls = getComplexityClass(complexity.level);
    const tagCls = cls === 'success' ? 'success' : cls === 'danger' ? 'danger' : 'warning';
    metrics.push({ label: '复杂度', value: getComplexityDisplay(complexity.level), cls: tagCls });
  }

  const statusCls = getStatusClass(plugin.status);
  metrics.push({ label: '状态', value: getStatusText(plugin.status), cls: statusCls === 'success' ? 'success' : statusCls === 'failed' ? 'danger' : '' });

  if (overallStatus) {
    const scoreText = score ? ` ${score}` : '';
    const asCls = getAdaptStatusClass(overallStatus);
    const tagCls = asCls === 'success' ? 'success' : asCls.includes('danger') ? 'danger' : '';
    metrics.push({ label: '适配', value: getAdaptStatusText(overallStatus) + scoreText, cls: tagCls });
  }

  if (recommendation) {
    const rCls = getRecommendationClass(recommendation);
    const tagCls = rCls.includes('success') ? 'success' : rCls.includes('danger') ? 'danger' : 'warning';
    metrics.push({ label: '建议', value: getRecommendationDisplay(recommendation), cls: tagCls });
  }

  const readiness = a?.target_readiness || info?.target_readiness
    || a?.ohos_readiness || info?.ohos_readiness;
  const readinessStatus = typeof readiness === 'string' ? readiness : readiness?.status;
  if (readinessStatus) {
    const rCls = getTargetReadinessClass(readinessStatus);
    const tagCls = rCls.includes('success') ? 'success' : rCls.includes('danger') ? 'danger' : '';
    metrics.push({ label: '平台就绪', value: getTargetReadinessDisplay(readinessStatus), cls: tagCls });
  }

  const metricsHtml = metrics.map(m =>
    `<div class="ov-metric">
      <div class="ov-metric-label">${m.label}</div>
      <div class="ov-metric-value ${m.cls}">${escapeHtml(m.value)}</div>
    </div>`
  ).join('');

  let timeTotal = 0, timeRunning = false, timeCnt = 0;
  if (stages && stages.length > 0) {
    const now = Date.now();
    const done = stages.filter(s => s.duration != null);
    const running = stages.find(s => s.status === 'running' && s.startTime);
    timeTotal = done.reduce((sum, s) => sum + s.duration, 0) + (running ? (now - running.startTime) : 0);
    timeRunning = !!running;
    timeCnt = done.length + (running ? 1 : 0);
  }

  const timeStructure = `${timeTotal > 0}|${timeRunning}|${timeCnt}`;
  const structureChanged = metricsHtml !== _lastStripMetricsHtml || timeStructure !== _lastStripTimeStructure;

  if (structureChanged) {
    _lastStripMetricsHtml = metricsHtml;
    _lastStripTimeStructure = timeStructure;

    let html = metricsHtml;
    if (timeTotal > 0) {
      html += `<div class="ov-metric time">
        <div class="ov-metric-label">耗时</div>
        <div class="ov-metric-value${timeRunning ? ' running' : ''}" id="stripTimeValue">${formatDuration(timeTotal)}${timeRunning ? '…' : ''} <span class="ov-metric-sub">${timeCnt}阶段</span></div>
      </div>`;
    }
    el.innerHTML = html;
  } else if (timeTotal > 0) {
    const timeVal = document.getElementById('stripTimeValue');
    if (timeVal) {
      timeVal.innerHTML = `${formatDuration(timeTotal)}${timeRunning ? '…' : ''} <span class="ov-metric-sub">${timeCnt}阶段</span>`;
    }
  }
}

let _lastOverviewHtml = '';

function renderOverviewCards(plugin, a, p, stages) {
  const el = document.getElementById('overviewContent');
  if (!el) return;

  let html = '<div class="overview-content-inner">';

  const isPubSource = plugin.sourceType === 'pub';

  // Repository links section
  html += '<div class="detail-repo-links">';

  if (isPubSource) {
    // Pub.dev source: show pub.dev link
    const pubUrl = plugin.sourceUrl || `https://pub.dev/packages/${plugin.name}`;
    const pubVersion = plugin.pubVersion ? ` v${plugin.pubVersion}` : '';

    html += `<a href="${escapeHtml(pubUrl)}" target="_blank" class="repo-link pub-link">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 9v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9"/><polyline points="7 10 12 15 17 10"/></svg>
      pub.dev/${escapeHtml(plugin.name)}${pubVersion}
    </a>`;

    // Show federated packages info if available
    if (plugin.pubPackages && plugin.pubPackages.length > 1) {
      html += `<span class="pub-packages-info" title="联合插件包含 ${plugin.pubPackages.length} 个包">${plugin.pubPackages.length} 个包</span>`;
    }
  } else {
    // Git source: show git repo link
    const repoShort = plugin.repoUrl
      .replace(/^https?:\/\/(github\.com|gitee\.com)\//, '')
      .replace(/\.git$/, '');

    html += `<a href="${escapeHtml(plugin.repoUrl)}" target="_blank" class="repo-link">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
      ${escapeHtml(repoShort)}
    </a>`;

    if (plugin.commitHash) {
      html += `<code class="repo-commit">${plugin.commitHash.substring(0, 8)}</code>`;
    }

    // TPC link only for non-pub sources
    const tpcUrl = plugin.tpcRepoUrl
      ? plugin.tpcRepoUrl.replace(/\.git$/, '')
      : `${TPC_ORG_URL}/${plugin.name}`;
    const tpcLabel = BRANDING.tpcOrgName || 'TPC';
    html += `<a href="${escapeHtml(tpcUrl)}" target="_blank" class="repo-link tpc-link" title="${escapeHtml(tpcLabel)} 仓库">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
      TPC
    </a>`;
  }

  html += '</div>';

  const hasAnalysis = !!a;
  const hasPlanning = !!p;

  if (!hasAnalysis && !hasPlanning) {
    html += `<div class="ov-empty">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="opacity:.2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      <p style="margin-top:12px;">尚未执行分析阶段，点击上方流水线「分析」开始</p>
    </div>`;
  } else {
    html += '<div class="ov-cards">';
    if (hasAnalysis) html += buildDynamicCard('代码分析', DASHBOARD_CARDS?.analysis, a);
    if (hasPlanning) html += buildDynamicCard('适配方案', DASHBOARD_CARDS?.planning, p);
    html += '</div>';
  }

  html += '</div>';

  if (html === _lastOverviewHtml) return;
  _lastOverviewHtml = html;
  el.innerHTML = html;
}

/**
 * Build a dashboard card dynamically from profile card config.
 * Falls back to legacy rendering when DASHBOARD_CARDS is null.
 *
 * Exported so the upgrade detail page can reuse the exact same config-driven
 * card renderer (with its own DASHBOARD_CARDS + analysis data) instead of
 * reimplementing overview cards — one renderer, two workflows.
 */
export function buildDynamicCard(title, cardConfig, data) {
  if (!data) return '';

  let rows = '';

  if (!cardConfig) {
    rows = buildLegacyRows(title, data);
  } else {
    for (const field of cardConfig) {
      const value = resolveNestedValue(data, field.key);
      const rendered = renderCardField(field, value, data);
      if (rendered) rows += rendered;
    }
  }

  if (!rows) return '';

  return `<div class="ov-card">
    <div class="ov-card-title">${title}</div>
    <div class="ov-card-body">${rows}</div>
  </div>`;
}

function resolveNestedValue(obj, keyPath) {
  if (!obj || !keyPath) return undefined;
  const parts = keyPath.split('.');
  let val = obj;
  for (const part of parts) {
    if (val == null) return undefined;
    val = val[part];
  }
  return val;
}

function renderCardField(field, value, rootData) {
  if (value === undefined || value === null) {
    if (field.type === 'boolean') {
      return ovRow(field.label, '<span class="text-muted">无</span>');
    }
    return '';
  }

  switch (field.type) {
    case 'code_list':
      if (!Array.isArray(value) || value.length === 0) return '';
      return ovRow(field.label, value.map(v => `<code>${escapeHtml(String(v))}</code>`).join(' '));

    case 'channel_count': {
      const methods = Array.isArray(value)
        ? value.reduce((sum, ch) => sum + (ch.methods?.length || 0), 0)
        : 0;
      if (methods === 0) return '';
      return ovRow(field.label, `${methods} 个`);
    }

    case 'view_list':
      if (!Array.isArray(value) || value.length === 0) return '';
      return ovRow(field.label, value.map(v => `<code>${escapeHtml(v.view_type || v.name || String(v))}</code>`).join(' '));

    case 'dep_summary': {
      const parts = [];
      const subKeys = field.subKeys || ['android', 'ios', 'cpp'];
      for (const k of subKeys) {
        const arr = value?.[k];
        if (arr?.length) parts.push(`${k}: ${arr.length}`);
      }
      if (parts.length === 0) return '';
      return ovRow(field.label, parts.join(' · '));
    }

    case 'dep_count_blocking': {
      if (!Array.isArray(value) || value.length === 0) return '';
      const blocking = value.filter(d => d.is_blocking);
      return ovRow(field.label, `${value.length}个${blocking.length ? ` · <span class="text-danger">${blocking.length} 阻塞</span>` : ''}`);
    }

    case 'code_metrics': {
      if (!value) return '';
      const parts = [];
      const metricKeys = field.metricKeys || [{ key: 'dart', label: 'Dart' }];
      for (const mk of metricKeys) {
        if (value[mk.key]) parts.push(`${mk.label}: ${value[mk.key].toLocaleString()}`);
      }
      if (parts.length === 0) return '';
      return ovRow(field.label, parts.join(' · '));
    }

    case 'boolean':
      return ovRow(field.label, value ? '<span class="text-success">有</span>' : '<span class="text-muted">无</span>');

    case 'risk_summary': {
      if (!Array.isArray(value) || value.length === 0) return '';
      const high = value.filter(r => r.severity === 'high').length;
      const med = value.filter(r => r.severity === 'medium').length;
      const parts = [];
      if (high) parts.push(`<span class="text-danger">${high} 高风险</span>`);
      if (med) parts.push(`<span class="text-warning">${med} 中风险</span>`);
      return ovRow(field.label, parts.join(' · ') || `${value.length} 项`);
    }

    case 'first_decision': {
      if (!Array.isArray(value) || value.length === 0) return '';
      const main = value[0];
      const text = main.decision || main.description || '';
      const short = text.length > 60 ? text.substring(0, 60) + '…' : text;
      return ovRow(field.label, escapeHtml(short));
    }

    case 'api_mapping_count': {
      if (!Array.isArray(value) || value.length === 0) return '';
      const total = value.length;
      const highConf = value.filter(m => m.confidence === 'high').length;
      return ovRow(field.label, `${total} 个${highConf === total ? ' · <span class="text-success">全高置信</span>' : ` · 高置信 ${highConf}`}`);
    }

    case 'array_count':
      if (!Array.isArray(value) || value.length === 0) return '';
      return ovRow(field.label, `${value.length} 个`);

    case 'perm_count': {
      const count = Array.isArray(value) ? value.length : 0;
      return ovRow(field.label, count > 0 ? `${count} 个` : '<span class="text-muted">无需</span>');
    }

    case 'code_value':
      if (!value) return '';
      return ovRow(field.label, `<code>${escapeHtml(String(value))}</code>`);

    case 'text':
      if (value === undefined || value === null || value === '') return '';
      return ovRow(field.label, escapeHtml(String(value)));

    case 'sdk_api_surface': {
      if (!value || typeof value !== 'object') return '';
      const c = value.class_count ?? 0;
      const i = value.interface_count ?? 0;
      const m = value.method_count ?? 0;
      if (!c && !i && !m) return '';
      return ovRow(field.label, `Class ${c} · Iface ${i} · Method ${m}`);
    }

    case 'mapping_summary_row': {
      if (!value || typeof value !== 'object') return '';
      const s = value;
      const parts = [];
      if (s.total_symbols != null) parts.push(`共 ${s.total_symbols} 符号`);
      if (s.direct_count != null || s.refactor_count != null || s.unsupported_count != null) {
        parts.push(
          `direct ${s.direct_count ?? 0} · refactor ${s.refactor_count ?? 0} · unsupported ${s.unsupported_count ?? 0}`
        );
      }
      if (parts.length === 0) return '';
      return ovRow(field.label, parts.join(' · '));
    }

    case 'confidence_distribution_row': {
      if (!value || typeof value !== 'object') return '';
      const c = value;
      return ovRow(
        field.label,
        `high ${c.high ?? 0} · medium ${c.medium ?? 0} · low ${c.low ?? 0}`
      );
    }

    // ── Upgrade-workflow card types (only used by upgrade dashboardCards;
    //    adaptation profiles never reference these, so they are no-ops there). ──

    case 'version_compare': {
      if (!value || typeof value !== 'object') return '';
      const changeText = { same: '版本一致', different: '有差异', unknown: '未知' }[value.change] || value.change || '';
      const cls = value.change === 'same' ? 'text-success' : value.change === 'different' ? 'text-warning' : 'text-muted';
      return ovRow(field.label,
        `hmos ${escapeHtml(String(value.hmosVersion ?? '?'))} · upstream ${escapeHtml(String(value.upstreamVersion ?? '?'))} <span class="${cls}">${escapeHtml(changeText)}</span>`);
    }

    case 'diff_stats': {
      if (!value || typeof value !== 'object') return '';
      const parts = [];
      if (value.totalChangedFiles != null) parts.push(`${value.totalChangedFiles} 文件`);
      if (value.dartLibChanged != null) parts.push(`Dart lib ${value.dartLibChanged}`);
      if (value.dartSrcChanged != null) parts.push(`Dart src ${value.dartSrcChanged}`);
      if (value.exampleChanged != null) parts.push(`Example ${value.exampleChanged}`);
      if (value.ohosOnlyAdditions != null) parts.push(`OHOS 新增 ${value.ohosOnlyAdditions}`);
      if (parts.length === 0) return '';
      return ovRow(field.label, parts.join(' · '));
    }

    case 'upgrade_recommendations': {
      if (!Array.isArray(value) || value.length === 0) return '';
      const priorityCls = { info: 'text-muted', low: 'text-warning', medium: 'text-warning', high: 'text-danger' };
      const items = value.slice(0, 3).map(r => {
        const cls = priorityCls[r.priority] || 'text-muted';
        return `<span class="${cls}">[${escapeHtml(r.priority || '?')}]</span> ${escapeHtml(r.message || '')}`;
      }).join('<br>');
      const more = value.length > 3 ? `<br><span class="text-muted">…共 ${value.length} 条</span>` : '';
      return ovRow(field.label, items + more);
    }

    default:
      if (value) return ovRow(field.label, escapeHtml(String(value)));
      return '';
  }
}

/**
 * Legacy fallback when no DASHBOARD_CARDS config is available.
 * Keeps backward compatibility during profile loading.
 */
function buildLegacyRows(title, data) {
  let rows = '';

  if (title === '代码分析') {
    const a = data;
    const patterns = a.communication_patterns || [];
    if (patterns.length) {
      rows += ovRow('通信模式', patterns.map(p => `<code>${escapeHtml(p)}</code>`).join(' '));
    }
    const methods = a.channels?.reduce((sum, ch) => sum + (ch.methods?.length || 0), 0) || 0;
    if (methods > 0) rows += ovRow('Channel 方法', `${methods} 个`);
    if (a.platform_views?.length) {
      rows += ovRow('PlatformView', a.platform_views.map(pv => `<code>${escapeHtml(pv.view_type)}</code>`).join(' '));
    }
    const nDeps = a.native_dependencies;
    const depParts = [];
    if (nDeps?.android?.length) depParts.push(`Android: ${nDeps.android.length}`);
    if (nDeps?.ios?.length) depParts.push(`iOS: ${nDeps.ios.length}`);
    if (nDeps?.cpp?.length) depParts.push(`C++: ${nDeps.cpp.length}`);
    if (depParts.length) rows += ovRow('原生依赖', depParts.join(' · '));
    const fDeps = a.flutter_dependencies || a.framework_dependencies || [];
    const blocking = fDeps.filter(d => d.is_blocking);
    if (fDeps.length > 0) {
      rows += ovRow('框架依赖', `${fDeps.length}个${blocking.length ? ` · <span class="text-danger">${blocking.length} 阻塞</span>` : ''}`);
    }
    const cl = a.code_metrics?.line_counts;
    if (cl) {
      const parts = [];
      if (cl.dart) parts.push(`Dart: ${cl.dart.toLocaleString()}`);
      if (cl.android) parts.push(`And: ${cl.android.toLocaleString()}`);
      if (cl.ios) parts.push(`iOS: ${cl.ios.toLocaleString()}`);
      if (cl.cpp) parts.push(`C++: ${cl.cpp.toLocaleString()}`);
      rows += ovRow('代码量', parts.join(' · '));
    }
    rows += ovRow('Example', a.has_example ? '<span class="text-success">有</span>' : '<span class="text-muted">无</span>');
    const complexity = a.complexity_assessment;
    if (complexity?.risk_items?.length) {
      const high = complexity.risk_items.filter(r => r.severity === 'high').length;
      const med = complexity.risk_items.filter(r => r.severity === 'medium').length;
      const parts = [];
      if (high) parts.push(`<span class="text-danger">${high} 高风险</span>`);
      if (med) parts.push(`<span class="text-warning">${med} 中风险</span>`);
      rows += ovRow('风险项', parts.join(' · '));
    }
  } else if (title === '适配方案') {
    const p = data;
    if (p.implementation_strategy?.architecture_decisions?.length) {
      const main = p.implementation_strategy.architecture_decisions[0];
      const short = main.decision.length > 60 ? main.decision.substring(0, 60) + '…' : main.decision;
      rows += ovRow('核心方案', escapeHtml(short));
    }
    const apiMapping = p.ohos_api_mapping || p.target_api_mapping || [];
    if (apiMapping.length) {
      const total = apiMapping.length;
      const highConf = apiMapping.filter(m => m.confidence === 'high').length;
      rows += ovRow('API 映射', `${total} 个${highConf === total ? ' · <span class="text-success">全高置信</span>' : ` · 高置信 ${highConf}`}`);
    }
    if (p.implementation_strategy?.planned_files?.length) {
      rows += ovRow('规划文件', `${p.implementation_strategy.planned_files.length} 个`);
    }
    const perms = p.permission_mapping || [];
    rows += ovRow('权限', perms.length > 0 ? `${perms.length} 个` : '<span class="text-muted">无需</span>');
    if (p.risk_items?.length) {
      const high = p.risk_items.filter(r => r.severity === 'high').length;
      const med = p.risk_items.filter(r => r.severity === 'medium').length;
      const parts = [];
      if (high) parts.push(`<span class="text-danger">${high} 高</span>`);
      if (med) parts.push(`<span class="text-warning">${med} 中</span>`);
      rows += ovRow('风险评估', parts.join(' · ') || `${p.risk_items.length} 项`);
    }
  }

  return rows;
}

function ovRow(label, value) {
  return `<div class="ov-row"><span class="ov-row-label">${label}</span><span class="ov-row-value">${value}</span></div>`;
}
