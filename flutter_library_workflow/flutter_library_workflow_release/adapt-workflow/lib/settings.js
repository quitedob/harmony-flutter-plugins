const fs = require('fs').promises;
const path = require('path');
const { SETTINGS_FILE } = require('./config');
const { DEFAULT_RN_OHOS_NPM_SCOPE } = require('./rn-default-scope');
const { normalizeOhosNpmScope } = require('./rn-ohos-npm-scope');

const VALID_BACKENDS = ['opencode', 'claude-code', 'cline'];
const VALID_MAPPING_BACKENDS = ['cline', 'opencode'];
const VALID_SHELL_MODES = ['default', 'yes', 'no'];
const STAGE_TIMEOUTS = {
  analysis: 60 * 60 * 1000,
  planning: 120 * 60 * 1000,
  'coding-library': 120 * 60 * 1000,
  testing: 120 * 60 * 1000,
  'device-verify': 120 * 60 * 1000,
  summary: 60 * 60 * 1000,
  'upgrade-analysis': 120 * 60 * 1000,
  'upgrade-coding': 120 * 60 * 1000,
  _default: 60 * 60 * 1000,
  'sdk-analysis': 60 * 60 * 1000,
  'sdk-planning': 90 * 60 * 1000,
  'sdk-implementation': 120 * 60 * 1000,
  'sdk-har-demo': 120 * 60 * 1000,
  'sdk-evaluation': 60 * 60 * 1000,
  'sdk-validation': 120 * 60 * 1000,
  'sdk-quality-review': 120 * 60 * 1000,
  'sdk-test-design': 120 * 60 * 1000,
  'sdk-case-confrontation': 120 * 60 * 1000,
  'sdk-demo-gen': 120 * 60 * 1000,
  'sdk-blackbox-verify': 120 * 60 * 1000,
  'test-design': 120 * 60 * 1000,
  'demo-gen': 120 * 60 * 1000,
  'blackbox-verify': 120 * 60 * 1000,
  'test-report': 60 * 60 * 1000,
  'quality-review': 60 * 60 * 1000,
  'quality-fix': 60 * 60 * 1000,
  'rn-quality-review': 60 * 60 * 1000,
  'rn-quality-fix': 60 * 60 * 1000,
  'sdk-quality-fix': 60 * 60 * 1000
};

const DEFAULT_SETTINGS = {
  proxy: {
    enabled: false,
    http: 'http://127.0.0.1:7890',
    https: 'http://127.0.0.1:7890'
  },
  /** 自定义环境变量，会注入到所有 Agent 子进程 */
  customEnv: {},
  agentBackend: 'claude-code',
  /** 全局映射分析（mapping-analysis）使用的执行引擎，默认 Cline CLI */
  mappingBackend: 'cline',
  /** 全局映射分析队列并发度（1=串行），默认 1 */
  mappingMaxConcurrency: 1,
  /** 三方库升级队列并发度（1=串行），默认 1 */
  upgradeMaxConcurrency: 1,
  stageBackends: {},
  shellMode: 'default',
  claudeCode: {
    skipPermissions: true,
    /** claude --effort 档位；留空=不传（减轻请求，避免第三方网关 529）。可选 max/high/medium/low */
    effort: ''
  },
  cline: {
    configDir: '',
    yolo: false
  },
  maxCloneConcurrency: 5,
  maxAgentConcurrency: 3,
  githubToken: '',
  /** DevEco Studio 安装根目录（非默认路径时填写）；也可使用环境变量 DEVECO_HOME */
  devecoHome: '',
  /** RN 鸿蒙化 npm scope（ohos/package.json、example 依赖、rn.py 脚手架） */
  ohosNpmScope: DEFAULT_RN_OHOS_NPM_SCOPE,
  stageRetry: {
    maxRetries: 2,
    baseDelayMs: 10000,
    maxDelayMs: 60000
  },
  sseHeartbeatIntervalMs: 15000,
  useGraphExecutor: true,
  /** 阶段启用控制：禁用后流水线不显示，执行时跳过 */
  enabledStages: {
    testDesign: false,
    demoGen: false,
    blackboxVerify: false,
    qualityReview: false,
    sdkTestDesign: false,
    sdkCaseConfrontation: false,
    sdkDemoGen: false,
    sdkBlackboxVerify: false,
    sdkQualityReview: false,
    rnTestDesign: false,
    rnDemoGen: false,
    rnBlackboxVerify: false,
    rnTestReport: false,
    rnQualityReview: false,
    qualityFix: false,
    rnQualityFix: false,
    sdkQualityFix: false,
    rnFastTestDesign: false,
    rnFastDemoGen: false,
    rnFastBlackboxVerify: false,
    rnFastTestReport: false
  }
};

let writeLock = Promise.resolve();

function acquireWriteLock() {
  let release;
  const next = new Promise(resolve => { release = resolve; });
  const prev = writeLock;
  writeLock = next;
  return prev.then(() => release);
}

function getDefaultSettings() {
  return JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
}

function getStageTimeoutMs(stageId) {
  return STAGE_TIMEOUTS[stageId] || STAGE_TIMEOUTS._default;
}

async function readSettings() {
  try {
    const data = await fs.readFile(SETTINGS_FILE, 'utf8');
    const settings = JSON.parse(data);
    const defaults = getDefaultSettings();
    const merged = { ...defaults, ...settings };
    if (settings.enabledStages) {
      merged.enabledStages = { ...defaults.enabledStages, ...settings.enabledStages };
    }
    if (settings.stageBackends) {
      merged.stageBackends = { ...defaults.stageBackends, ...settings.stageBackends };
    }
    if (merged.stageBackends && merged.stageBackends['coding-example'] && !merged.stageBackends['testing']) {
      merged.stageBackends['testing'] = merged.stageBackends['coding-example'];
      delete merged.stageBackends['coding-example'];
    }
    merged.ohosNpmScope = normalizeOhosNpmScope(merged.ohosNpmScope);
    return merged;
  } catch (error) {
    return getDefaultSettings();
  }
}

async function writeSettings(settings) {
  const release = await acquireWriteLock();
  try {
    await fs.mkdir(path.dirname(SETTINGS_FILE), { recursive: true });
    await fs.writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2));
  } finally {
    release();
  }
}

function validateSettings(settings) {
  if (!settings || typeof settings !== 'object') return false;
  if (!settings.proxy || typeof settings.proxy !== 'object') return false;
  if (typeof settings.proxy.enabled !== 'boolean') return false;
  if (typeof settings.proxy.http !== 'string') return false;
  if (typeof settings.proxy.https !== 'string') return false;

  if (settings.agentBackend !== undefined && !VALID_BACKENDS.includes(settings.agentBackend)) return false;
  if (settings.shellMode !== undefined && !VALID_SHELL_MODES.includes(settings.shellMode)) return false;

  if (settings.mappingBackend !== undefined && !VALID_MAPPING_BACKENDS.includes(settings.mappingBackend)) return false;
  if (settings.mappingMaxConcurrency !== undefined) {
    if (typeof settings.mappingMaxConcurrency !== 'number') return false;
    if (!Number.isFinite(settings.mappingMaxConcurrency)) return false;
    if (settings.mappingMaxConcurrency < 1 || settings.mappingMaxConcurrency > 20) return false;
  }

  if (settings.upgradeMaxConcurrency !== undefined) {
    if (typeof settings.upgradeMaxConcurrency !== 'number') return false;
    if (!Number.isFinite(settings.upgradeMaxConcurrency)) return false;
    if (settings.upgradeMaxConcurrency < 1) return false;
  }

  if (settings.stageBackends !== undefined) {
    if (typeof settings.stageBackends !== 'object' || Array.isArray(settings.stageBackends)) return false;
    for (const val of Object.values(settings.stageBackends)) {
      if (!VALID_BACKENDS.includes(val)) return false;
    }
  }

  if (settings.claudeCode !== undefined) {
    if (typeof settings.claudeCode !== 'object') return false;
    if (settings.claudeCode.skipPermissions !== undefined && typeof settings.claudeCode.skipPermissions !== 'boolean') return false;
    if (settings.claudeCode.effort !== undefined &&
        !['', 'max', 'high', 'medium', 'low'].includes(settings.claudeCode.effort)) return false;
  }

  if (settings.cline !== undefined) {
    if (typeof settings.cline !== 'object') return false;
    if (settings.cline.configDir !== undefined && typeof settings.cline.configDir !== 'string') return false;
    if (settings.cline.yolo !== undefined && typeof settings.cline.yolo !== 'boolean') return false;
  }

  if (settings.enabledStages !== undefined) {
    if (typeof settings.enabledStages !== 'object' || Array.isArray(settings.enabledStages)) return false;
    const validKeys = ['testDesign', 'demoGen', 'blackboxVerify', 'qualityReview', 'qualityFix', 'sdkTestDesign', 'sdkCaseConfrontation', 'sdkDemoGen', 'sdkBlackboxVerify', 'sdkQualityReview', 'sdkQualityFix', 'rnTestDesign', 'rnDemoGen', 'rnBlackboxVerify', 'rnTestReport', 'rnQualityReview', 'rnQualityFix', 'rnFastTestDesign', 'rnFastDemoGen', 'rnFastBlackboxVerify', 'rnFastTestReport'];
    for (const key of Object.keys(settings.enabledStages)) {
      if (!validKeys.includes(key)) return false;
      if (typeof settings.enabledStages[key] !== 'boolean') return false;
    }
  }

  if (settings.devecoHome !== undefined && typeof settings.devecoHome !== 'string') return false;

  if (settings.ohosNpmScope !== undefined && typeof settings.ohosNpmScope !== 'string') {
    return false;
  }

  return true;
}

function buildProxyEnv(settings) {
  if (!settings.proxy.enabled) return {};
  return {
    http_proxy: settings.proxy.http,
    https_proxy: settings.proxy.https,
    HTTP_PROXY: settings.proxy.http,
    HTTPS_PROXY: settings.proxy.https
  };
}

function resolveUseShell(settings, backendName, isWin) {
  if (settings?.shellMode === 'yes') return true;
  if (settings?.shellMode === 'no') return false;
  return backendName === 'claude-code' ? false : isWin;
}

module.exports = {
  VALID_BACKENDS,
  VALID_MAPPING_BACKENDS,
  VALID_SHELL_MODES,
  readSettings,
  writeSettings,
  getDefaultSettings,
  getStageTimeoutMs,
  validateSettings,
  buildProxyEnv,
  resolveUseShell,
  normalizeOhosNpmScope
};
