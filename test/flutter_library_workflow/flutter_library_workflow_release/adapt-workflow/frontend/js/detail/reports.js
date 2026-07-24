import { API_URL, withProfile } from '../constants.js';
import { escapeHtml } from '../utils.js';

const reportCache = {};
const prdCache = {};

const PRD_FILES = {
  analysis: { file: '01-analysis-prd.md', name: '需求规格（PRD）' }
};

function renderMarkdown(md) {
  return window.marked?.parse ? window.marked.parse(md) : `<pre>${escapeHtml(md)}</pre>`;
}

export function stageHasPrd(stageId) {
  return !!PRD_FILES[stageId];
}

export async function loadStageReport(pluginId, stageId) {
  const loadingEl = document.getElementById('reportLoading');
  const emptyEl = document.getElementById('reportEmpty');
  const markdownEl = document.getElementById('reportMarkdown');

  if (reportCache[stageId]) {
    emptyEl.style.display = 'none';
    loadingEl.style.display = 'none';
    markdownEl.style.display = 'block';
    markdownEl.innerHTML = reportCache[stageId];
    return;
  }

  emptyEl.style.display = 'none';
  markdownEl.style.display = 'none';
  loadingEl.style.display = 'flex';

  try {
    const response = await fetch(withProfile(`${API_URL}/plugins/${pluginId}/stages/${stageId}/report`));
    if (!response.ok) throw new Error('报告加载失败');
    const markdown = await response.text();
    const html = renderMarkdown(markdown);

    reportCache[stageId] = html;
    loadingEl.style.display = 'none';
    markdownEl.style.display = 'block';
    markdownEl.innerHTML = html;
  } catch (error) {
    loadingEl.style.display = 'none';
    emptyEl.style.display = 'flex';
    emptyEl.querySelector('p').textContent = '报告加载失败: ' + error.message;
  }
}

export async function loadStagePrd(pluginId, stageId) {
  const loadingEl = document.getElementById('prdLoading');
  const emptyEl = document.getElementById('prdEmpty');
  const markdownEl = document.getElementById('prdMarkdown');

  if (prdCache[stageId]) {
    emptyEl.style.display = 'none';
    loadingEl.style.display = 'none';
    markdownEl.style.display = 'block';
    markdownEl.innerHTML = prdCache[stageId];
    return;
  }

  const prdDef = PRD_FILES[stageId];
  if (!prdDef) {
    showPrdEmpty('此阶段无 PRD 文档');
    return;
  }

  emptyEl.style.display = 'none';
  markdownEl.style.display = 'none';
  loadingEl.style.display = 'flex';

  try {
    const response = await fetch(withProfile(`${API_URL}/plugins/${pluginId}/stages/${stageId}/report?file=${encodeURIComponent(prdDef.file)}`));
    if (!response.ok) throw new Error('PRD 加载失败');
    const markdown = await response.text();
    const html = renderMarkdown(markdown);

    prdCache[stageId] = html;
    loadingEl.style.display = 'none';
    markdownEl.style.display = 'block';
    markdownEl.innerHTML = html;
  } catch (error) {
    loadingEl.style.display = 'none';
    emptyEl.style.display = 'flex';
    emptyEl.querySelector('p').textContent = 'PRD 加载失败: ' + error.message;
  }
}

export function showReportEmpty(message) {
  document.getElementById('reportLoading').style.display = 'none';
  document.getElementById('reportMarkdown').style.display = 'none';
  const emptyEl = document.getElementById('reportEmpty');
  emptyEl.style.display = 'flex';
  emptyEl.querySelector('p').textContent = message || '此阶段暂无报告';
}

export function showPrdEmpty(message) {
  document.getElementById('prdLoading').style.display = 'none';
  document.getElementById('prdMarkdown').style.display = 'none';
  const emptyEl = document.getElementById('prdEmpty');
  emptyEl.style.display = 'flex';
  emptyEl.querySelector('p').textContent = message || '此阶段无 PRD 文档';
}
