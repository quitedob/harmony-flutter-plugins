import { showError } from './js/utils.js';
import * as api from './js/api.js';

function qs(name) {
  const u = new URL(window.location.href);
  return u.searchParams.get(name);
}

function escapeHtml(s) {
  return String(s ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function normalizeRepoUrl(url) {
  return String(url || '').trim().replace(/\/+$/, '');
}

function deriveNameFromUrl(url) {
  const u = normalizeRepoUrl(url);
  const m = u.match(/([^/]+?)(?:\.git)?$/);
  return m ? m[1] : '';
}

const state = {
  sourceId: null,
  sourceMeta: null,
  items: [],
  filtered: [],
  selectedKey: null
};

function itemKey(m, idx) {
  // If androidSymbol repeats, use idx to stay stable within the page.
  return `${String(m?.androidSymbol || '').trim()}__${idx}`;
}

function renderList() {
  const tbody = document.getElementById('resultListBody');
  if (!tbody) return;

  const q = (document.getElementById('resultSearch')?.value || '').trim().toLowerCase();
  const changeType = document.getElementById('resultChangeType')?.value || '';
  const confidence = document.getElementById('resultConfidence')?.value || '';

  const items = (state.items || []).map((m, idx) => ({ m, idx, key: itemKey(m, idx) })).filter(({ m }) => {
    if (!m || typeof m !== 'object') return false;
    if (changeType && String(m.changeType || '') !== String(changeType)) return false;
    if (confidence && String(m.confidence || '') !== String(confidence)) return false;
    if (q) {
      const hay = `${m.androidSymbol || ''} ${m.harmonyReplacement?.name || ''} ${m.harmonyReplacement?.details || ''} ${m.rationale || ''}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  state.filtered = items;
  const count = document.getElementById('resultCount');
  if (count) count.textContent = items.length ? `${items.length} 条` : '';

  if (items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" class="empty-state"><p>没有匹配的条目</p></td></tr>`;
    showDetailEmpty(true);
    return;
  }

  tbody.innerHTML = items.map(({ m, key }) => {
    const selected = state.selectedKey === key;
    return `
      <tr class="mapping-row ${selected ? 'mapping-row-selected' : ''}" data-key="${escapeHtml(key)}">
        <td class="mapping-cell-symbol"><code>${escapeHtml(m.androidSymbol || '')}</code></td>
        <td class="mapping-cell-repl"><code>${escapeHtml(m.harmonyReplacement?.name || '')}</code></td>
        <td class="td-center"><code>${escapeHtml(m.changeType || '')}</code></td>
      </tr>
    `;
  }).join('');

  // Default selection (first row) if none.
  if (!state.selectedKey || !items.some(x => x.key === state.selectedKey)) {
    state.selectedKey = items[0].key;
    renderDetailByKey(state.selectedKey);
    // Re-render to apply selected class.
    renderList();
    return;
  }

  tbody.querySelectorAll('tr.mapping-row').forEach(tr => {
    tr.onclick = () => {
      const key = tr.dataset.key;
      if (!key) return;
      state.selectedKey = key;
      renderList();
      renderDetailByKey(key);
    };
  });
}

function showDetailEmpty(show) {
  const empty = document.getElementById('detailEmpty');
  const meta = document.getElementById('detailMeta');
  const tabs = document.getElementById('detailTabs');
  const views = ['viewSummary', 'viewField', 'viewEnum', 'viewEvidence'].map(id => document.getElementById(id));
  if (empty) empty.style.display = show ? 'block' : 'none';
  if (meta) meta.style.display = show ? 'none' : 'flex';
  if (tabs) tabs.style.display = show ? 'none' : 'flex';
  views.forEach(v => { if (v) v.style.display = show ? 'none' : ''; });
}

function renderDetailByKey(key) {
  const entry = state.filtered.find(x => x.key === key);
  if (!entry) {
    showDetailEmpty(true);
    return;
  }
  showDetailEmpty(false);
  renderDetail(entry.m, entry.idx);
}

function renderDetail(m, idx) {
  const meta = document.getElementById('detailMeta');
  const views = {
    summary: document.getElementById('viewSummary'),
    field: document.getElementById('viewField'),
    enum: document.getElementById('viewEnum'),
    evidence: document.getElementById('viewEvidence')
  };

  const pill = (label, value) => `<span class="meta-pill">${label}<strong>${escapeHtml(value || '-')}</strong></span>`;
  if (meta) {
    meta.innerHTML = [
      pill('变更类型 ', m.changeType),
      pill('置信度 ', m.confidence),
      pill('替代项 ', m.harmonyReplacement?.name || ''),
      pill('序号 ', String(idx + 1))
    ].join('');
  }

  // Summary
  if (views.summary) {
    views.summary.innerHTML = `
      <div class="md-section">
        <div class="md-section-title">核心信息</div>
        <div class="md-kv">
          <div class="k">Android Symbol</div><div class="v"><code>${escapeHtml(m.androidSymbol || '')}</code></div>
          <div class="k">Harmony Replacement</div><div class="v"><code>${escapeHtml(m.harmonyReplacement?.name || '')}</code> ${m.harmonyReplacement?.details ? `<div class="text-muted">${escapeHtml(m.harmonyReplacement.details)}</div>` : ''}</div>
          <div class="k">Change Type</div><div class="v"><code>${escapeHtml(m.changeType || '')}</code></div>
          <div class="k">Rationale</div><div class="v">${escapeHtml(m.rationale || '-')}</div>
          <div class="k">Permissions</div><div class="v">${escapeHtml((m.preconditions?.permissions || []).join(', ') || '-')}</div>
          <div class="k">依赖（ohpm）</div><div class="v">${escapeHtml((m.requiredDeps?.ohpm || []).join(', ') || '-')}</div>
        </div>
      </div>
      <div class="md-section">
        <div class="md-section-title">代码片段</div>
        ${m.codeSnippets?.before ? `<div class="md-kv"><div class="k">Before</div><div class="v"><pre>${escapeHtml(m.codeSnippets.before)}</pre></div></div>` : `<div class="md-empty">暂无</div>`}
        ${m.codeSnippets?.after ? `<div class="md-kv" style="margin-top:10px;"><div class="k">After</div><div class="v"><pre>${escapeHtml(m.codeSnippets.after)}</pre></div></div>` : ''}
      </div>
    `;
  }

  // Field mappings
  if (views.field) {
    const rows = Array.isArray(m.fieldMappings) ? m.fieldMappings : [];
    views.field.innerHTML = rows.length === 0
      ? `<div class="md-empty">该条目未提供字段映射。</div>`
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
    const rows = Array.isArray(m.enumMappings) ? m.enumMappings : [];
    views.enum.innerHTML = rows.length === 0
      ? `<div class="md-empty">该条目未提供枚举映射。</div>`
      : `
        <table class="md-table">
          <thead><tr><th>Android 枚举</th><th>Harmony 枚举</th><th>说明</th></tr></thead>
          <tbody>
            ${rows.map(r => `<tr><td><code>${escapeHtml(r.androidEnum || '')}</code></td><td><code>${escapeHtml(r.harmonyEnum || '')}</code></td><td>${escapeHtml(r.note || '')}</td></tr>`).join('')}
          </tbody>
        </table>
      `;
  }

  // Evidence
  if (views.evidence) {
    const ev = m.evidence;
    const src = state.sourceMeta;
    views.evidence.innerHTML = `
      <table class="md-table">
        <thead><tr><th>仓库</th><th>文件</th><th>行</th><th>片段</th></tr></thead>
        <tbody>
          <tr>
            <td>${escapeHtml(src?.gitUrl || src?.name || src?.id || '')}</td>
            <td><code>${escapeHtml(ev?.filePath || '')}</code></td>
            <td><code>${escapeHtml(ev?.lineRange || '')}</code></td>
            <td>${escapeHtml((ev?.snippet || '').slice(0, 400))}${(ev?.snippet || '').length > 400 ? '…' : ''}</td>
          </tr>
        </tbody>
      </table>
    `;
  }
}

function initTabs() {
  const tabs = Array.from(document.querySelectorAll('#detailTabs .mdtab'));
  const views = {
    summary: document.getElementById('viewSummary'),
    field: document.getElementById('viewField'),
    enum: document.getElementById('viewEnum'),
    evidence: document.getElementById('viewEvidence')
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

async function load() {
  state.sourceId = qs('sourceId');
  if (!state.sourceId) {
    showError('缺少 sourceId 参数');
    showDetailEmpty(true);
    return;
  }

  try {
    const sources = await api.fetchMappingSources();
    const src = (sources.sources || []).find(s => String(s.id) === String(state.sourceId));
    state.sourceMeta = src || { id: state.sourceId };

    const title = document.getElementById('pageTitle');
    const sub = document.getElementById('pageSub');
    const name = src?.name || deriveNameFromUrl(src?.gitUrl) || state.sourceId;
    if (title) title.textContent = `映射分析结果：${name}`;
    if (sub) {
      const short = (src?.gitUrl || '').replace(/^https?:\/\//, '').replace(/\.git$/, '');
      sub.textContent = short ? `仓库：${short}` : '单仓分析结果（只读）';
    }
  } catch {
    state.sourceMeta = { id: state.sourceId };
  }

  try {
    const resp = await api.fetchMappingSourceResult(state.sourceId);
    state.items = Array.isArray(resp.result) ? resp.result : [];
    if (!state.items.length) {
      document.getElementById('resultListBody').innerHTML = `<tr><td colspan="3" class="empty-state"><p>该仓库没有映射条目</p></td></tr>`;
      showDetailEmpty(true);
      return;
    }
    initTabs();
    wireFilters();
    renderList();
  } catch (e) {
    // If result is missing or failed, try show validation report for actionable reasons.
    try {
      const vr = await api.fetchMappingSourceValidation(state.sourceId);
      renderValidationReport(vr.report);
      document.getElementById('resultListBody').innerHTML = `<tr><td colspan="3" class="empty-state"><p>本次分析未产出可用映射条目（未通过校验）。请查看上方失败原因。</p></td></tr>`;
      showDetailEmpty(true);
      return;
    } catch (e2) {
      showError(e?.message || String(e));
      document.getElementById('resultListBody').innerHTML = `<tr><td colspan="3" class="empty-state"><p>${escapeHtml(e?.message || String(e))}</p></td></tr>`;
      showDetailEmpty(true);
    }
  }
}

function wireFilters() {
  document.getElementById('resultSearch')?.addEventListener('input', () => renderList());
  document.getElementById('resultChangeType')?.addEventListener('change', () => renderList());
  document.getElementById('resultConfidence')?.addEventListener('change', () => renderList());
}

function renderValidationReport(report) {
  const banner = document.getElementById('validationBanner');
  const msg = document.getElementById('validationMsg');
  if (!banner || !msg) return;
  const lines = [];
  lines.push(`phase: ${report?.phase || 'unknown'}`);
  if (report?.errorType) lines.push(`errorType: ${report.errorType}`);
  if (report?.message) lines.push(`message: ${report.message}`);
  if (Array.isArray(report?.schemaErrors) && report.schemaErrors.length) {
    lines.push('');
    lines.push('Schema errors:');
    for (const e of report.schemaErrors.slice(0, 20)) lines.push(`- ${e}`);
  }
  if (Array.isArray(report?.rejected) && report.rejected.length) {
    lines.push('');
    lines.push(`Semantic rejected entries: ${report.rejected.length}`);
    for (const r of report.rejected.slice(0, 20)) {
      lines.push(`- [${r.index}] ${r.androidSymbol}: ${(r.errors || []).join('; ')}`);
    }
  }
  banner.style.display = 'block';
  msg.textContent = lines.join('\n');
}

load();

