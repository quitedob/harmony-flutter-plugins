import { STATUS_CLASS_MAP, STATUS_TEXT_MAP, ADAPT_STATUS_CLASS_MAP, ADAPT_STATUS_TEXT_MAP, ANALYSIS_STATUS_DISPLAY_MAP, ANALYSIS_STATUS_CLASS_MAP } from './constants.js';
import { TYPE_DISPLAY_MAP, ARCHITECTURE_DISPLAY_MAP, COMPLEXITY_DISPLAY_MAP, COMPLEXITY_CLASS_MAP, RECOMMENDATION_DISPLAY_MAP, RECOMMENDATION_CLASS_MAP, TARGET_READINESS_DISPLAY_MAP, TARGET_READINESS_CLASS_MAP } from './profile-store.js';

export function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export function formatDate(dateStr) {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  return date.toLocaleString('zh-CN');
}

export function getStatusClass(status) {
  return STATUS_CLASS_MAP[status] || 'pending';
}

export function getStatusText(status) {
  return STATUS_TEXT_MAP[status] || status;
}

export function getPluginTypeDisplay(type) {
  if (!type) return '-';
  return TYPE_DISPLAY_MAP[type] || type;
}

export function getAdaptStatusClass(status) {
  return ADAPT_STATUS_CLASS_MAP[status] || 'pending';
}

export function getAdaptStatusText(status) {
  return ADAPT_STATUS_TEXT_MAP[status] || status || '-';
}

export function getArchitectureDisplay(arch) {
  if (!arch) return '-';
  return ARCHITECTURE_DISPLAY_MAP[arch] || arch;
}

export function getComplexityDisplay(level) {
  if (!level) return '-';
  return COMPLEXITY_DISPLAY_MAP[level] || level;
}

export function getComplexityClass(level) {
  return COMPLEXITY_CLASS_MAP[level] || 'pending';
}

export function getRecommendationDisplay(rec) {
  if (!rec) return '-';
  return RECOMMENDATION_DISPLAY_MAP[rec] || rec;
}

export function getRecommendationClass(rec) {
  return RECOMMENDATION_CLASS_MAP[rec] || 'pending';
}

export function getAnalysisStatusDisplay(status) {
  if (!status) return '未分析';
  return ANALYSIS_STATUS_DISPLAY_MAP[status] || status;
}

export function getAnalysisStatusClass(status) {
  return ANALYSIS_STATUS_CLASS_MAP[status] || 'pending';
}

export function getTargetReadinessDisplay(status) {
  if (!status) return '-';
  return TARGET_READINESS_DISPLAY_MAP[status] || status;
}

export function getTargetReadinessClass(status) {
  return TARGET_READINESS_CLASS_MAP[status] || 'pending';
}

/**
 * 将毫秒数格式化为可读的时长字符串，如 "1h 23m 45s"
 * @param {number|null} ms
 * @returns {string|null}
 */
export function formatDuration(ms) {
  if (!ms || ms < 0) return null;
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

export function showLoading(show) {
  document.getElementById('loading').style.display = show ? 'block' : 'none';
}

export function showError(message) {
  const errorDiv = document.getElementById('error');
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
  requestAnimationFrame(() => {
    errorDiv.classList.add('visible');
  });
  setTimeout(() => {
    errorDiv.classList.remove('visible');
    setTimeout(() => { errorDiv.style.display = 'none'; }, 250);
  }, 4000);
}
