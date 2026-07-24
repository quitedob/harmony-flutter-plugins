export const API_URL = '/api';

// Append `profileId` to API URLs so pages can pin a profile.
// Set `window.__PROFILE_ID = 'rn-ohos' | 'flutter-ohos' | ...` at runtime.
export function withProfile(url) {
  try {
    const pid = globalThis?.__PROFILE_ID;
    if (!pid) return url;
    const sep = url.includes('?') ? '&' : '?';
    return `${url}${sep}profileId=${encodeURIComponent(String(pid))}`;
  } catch {
    return url;
  }
}

// ── 通用状态映射（profile 无关） ──

export const STATUS_CLASS_MAP = {
  'initialized': 'pending',
  'cloning': 'cloning',
  'cloned': 'pending',
  'clone_failed': 'failed'
};

export const STATUS_TEXT_MAP = {
  'initialized': '已初始化',
  'cloning': '克隆中',
  'cloned': '已克隆',
  'clone_failed': '克隆失败'
};

export const ADAPT_STATUS_CLASS_MAP = {
  'pending': 'pending',
  'in_progress': 'converting',
  'success': 'success',
  'partial': 'converting',
  'failed': 'failed'
};

export const ADAPT_STATUS_TEXT_MAP = {
  'pending': '待适配',
  'in_progress': '适配中',
  'success': '适配完成',
  'partial': '部分完成',
  'failed': '适配失败'
};

export const STAGE_STATUS_CLASS = {
  'idle': 'idle',
  'running': 'running',
  'success': 'success',
  'failed': 'failed'
};

export const STAGE_STATUS_TEXT = {
  'idle': '待执行',
  'running': '执行中',
  'success': '已完成',
  'failed': '失败'
};

export const ANALYSIS_STATUS_DISPLAY_MAP = {
  'idle': '未分析',
  'running': '分析中',
  'success': '已分析',
  'failed': '分析失败'
};

export const ANALYSIS_STATUS_CLASS_MAP = {
  'idle': 'pending',
  'running': 'converting',
  'success': 'success',
  'failed': 'failed'
};
