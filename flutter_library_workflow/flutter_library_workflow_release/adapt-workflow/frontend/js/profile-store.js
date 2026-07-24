/**
 * Profile dynamic data store.
 *
 * Loads display maps, stage definitions, branding, and other profile-driven
 * config from the backend and exposes them as mutable module-level variables.
 * Other modules import these variables; they start with sensible defaults
 * and are overwritten once the profile API responds.
 */

import { API_URL, withProfile } from './constants.js';

// ── Profile-driven maps (defaults, overwritten by loadProfile) ──

export let TYPE_DISPLAY_MAP = {
  'unknown': '未知'
};

export let ARCHITECTURE_DISPLAY_MAP = {
  'standalone': '独立',
  'monorepo': '多包仓库'
};

export let COMPLEXITY_DISPLAY_MAP = {
  'low': '低',
  'medium': '中',
  'high': '高',
  'very_high': '极高'
};

export let COMPLEXITY_CLASS_MAP = {
  'low': 'success',
  'medium': 'pending',
  'high': 'warning',
  'very_high': 'failed'
};

export let RECOMMENDATION_DISPLAY_MAP = {
  'proceed': '建议适配',
  'proceed_with_caution': '谨慎适配',
  'blocked': '无法适配',
  'not_needed': '无需适配'
};

export let RECOMMENDATION_CLASS_MAP = {
  'proceed': 'success',
  'proceed_with_caution': 'pending',
  'blocked': 'failed',
  'not_needed': 'neutral'
};

export let TARGET_READINESS_DISPLAY_MAP = {
  'not_adapted': '未适配',
  'partially_adapted': '部分适配',
  'fully_adapted': '已适配'
};

export let TARGET_READINESS_CLASS_MAP = {
  'not_adapted': 'pending',
  'partially_adapted': 'converting',
  'fully_adapted': 'success'
};

export let STAGE_IDS = ['analysis', 'planning', 'coding-library', 'testing', 'summary'];

export let STAGE_SHORT_NAMES = {
  'analysis': '分析',
  'planning': '方案',
  'coding-library': '编码',
  'testing': '测试',
  'summary': '总结'
};

export let TPC_ORG_URL = '';
export let TARGET_BRANCH = '';

export let BRANDING = {
  title: '插件跨平台适配工作流',
  subtitle: '批量管理插件到目标平台的转换',
  addPluginHint: '输入插件的 Git 仓库地址，添加后可在列表中进行克隆',
  tpcOrgName: 'TPC',
  targetBranch: 'harmony',
  githubTokenHint: '用于将适配代码推送到目标组织。需要 repo 权限的 PAT',
};

export let DASHBOARD_CARDS = null;
export let GRAPH_EDGES = [];

export let PROFILE_ID = null;
export let FLOW_VERSION = 'fast';
export let FLOW_PROFILES = [];

// ── Profile loading & callbacks ──

let _profileLoaded = false;
let _profileData = null;
const _profileCallbacks = [];

export function onProfileLoaded(cb) {
  if (_profileLoaded) { cb(_profileData); return; }
  _profileCallbacks.push(cb);
}

export function getProfileData() {
  return _profileData;
}

function applyProfileData(data) {
  _profileData = data;

  if (data.displayMaps) {
    if (data.displayMaps.pluginType) TYPE_DISPLAY_MAP = data.displayMaps.pluginType;
    if (data.displayMaps.architecture) ARCHITECTURE_DISPLAY_MAP = data.displayMaps.architecture;
    if (data.displayMaps.complexity) COMPLEXITY_DISPLAY_MAP = data.displayMaps.complexity;
    if (data.displayMaps.complexityClass) COMPLEXITY_CLASS_MAP = data.displayMaps.complexityClass;
    if (data.displayMaps.recommendation) RECOMMENDATION_DISPLAY_MAP = data.displayMaps.recommendation;
    if (data.displayMaps.recommendationClass) RECOMMENDATION_CLASS_MAP = data.displayMaps.recommendationClass;
    if (data.displayMaps.targetReadiness) TARGET_READINESS_DISPLAY_MAP = data.displayMaps.targetReadiness;
    if (data.displayMaps.targetReadinessClass) TARGET_READINESS_CLASS_MAP = data.displayMaps.targetReadinessClass;
  }

  if (data.stages && data.stages.length > 0) {
    STAGE_IDS = data.stages.map(s => s.id);
    const names = {};
    for (const s of data.stages) {
      names[s.id] = s.shortName || s.name;
    }
    STAGE_SHORT_NAMES = names;
  }

  if (data.tpcOrgUrl) TPC_ORG_URL = data.tpcOrgUrl;
  if (data.targetBranch) TARGET_BRANCH = data.targetBranch;
  if (data.branding) BRANDING = { ...BRANDING, ...data.branding };
  if (data.dashboardCards) DASHBOARD_CARDS = data.dashboardCards;
  if (data.graph && data.graph.edges) GRAPH_EDGES = data.graph.edges;
  if (data.flowVersion) FLOW_VERSION = data.flowVersion;
  if (data.flowProfiles) FLOW_PROFILES = data.flowProfiles;
  if (data.id) {
    PROFILE_ID = data.id;
    try {
      globalThis.__PROFILE_ID = data.id;
    } catch {}
  }

  _profileLoaded = true;
  for (const cb of _profileCallbacks) cb(data);
  _profileCallbacks.length = 0;
}

export async function loadProfile(profileId = null) {
  try {
    const url = profileId
      ? `${API_URL}/profile?profileId=${encodeURIComponent(profileId)}`
      : withProfile(`${API_URL}/profile`);
    const resp = await fetch(url);
    if (!resp.ok) return;
    const data = await resp.json();
    applyProfileData(data);
    return data;
  } catch (e) {
    console.warn('Profile load failed, using defaults:', e.message);
    return null;
  }
}
