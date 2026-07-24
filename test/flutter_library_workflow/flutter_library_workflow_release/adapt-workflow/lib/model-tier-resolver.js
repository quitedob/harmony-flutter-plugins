'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');

const VALID_TIERS = ['high', 'medium', 'low', 'multimodal'];
const VALID_BACKENDS = ['opencode', 'claude-code', 'cline'];
const TIER_CONFIG_PATH = path.join(__dirname, '..', 'data', 'model-tiers.json');

let cachedConfig = null;
let cachedMtime = 0;

function loadTierConfig() {
  try {
    const stat = fs.statSync(TIER_CONFIG_PATH);
    if (cachedConfig && stat.mtimeMs === cachedMtime) return cachedConfig;
    cachedConfig = JSON.parse(fs.readFileSync(TIER_CONFIG_PATH, 'utf8'));
    cachedMtime = stat.mtimeMs;
    return cachedConfig;
  } catch (e) {
    throw new Error(`Failed to load model-tiers.json: ${e.message}`);
  }
}

function clearCache() {
  cachedConfig = null;
  cachedMtime = 0;
}

const DEFAULT_TIER_CONFIG_PATH = path.join(__dirname, '..', 'data', 'model-tiers.default.json');

function loadDefaultTierConfig() {
  return JSON.parse(fs.readFileSync(DEFAULT_TIER_CONFIG_PATH, 'utf8'));
}

/**
 * Simple glob matching: supports trailing `*` wildcard only.
 * e.g. "primary-*" matches "primary-01-analysis"
 */
function globMatch(pattern, str) {
  if (!pattern.includes('*')) return pattern === str;
  const prefix = pattern.slice(0, pattern.indexOf('*'));
  return str.startsWith(prefix);
}

/**
 * Resolve an agent name to its tier using agent_tiers config.
 * Exact match first, then glob patterns, then _default.
 */
function getTierForAgent(agentName) {
  const config = loadTierConfig();
  const agentTiers = config.agent_tiers || {};

  if (agentTiers[agentName] && agentName !== '_default') {
    return agentTiers[agentName];
  }

  for (const [pattern, tier] of Object.entries(agentTiers)) {
    if (pattern === '_default') continue;
    if (pattern.includes('*') && globMatch(pattern, agentName)) return tier;
  }

  return agentTiers._default || 'high';
}

/**
 * Resolve a tier name to a concrete model string for the given backend.
 * @param {string} tierName - 'high' | 'medium' | 'low' | 'multimodal'
 * @param {string} backend - 'opencode' | 'claude-code'
 * @returns {string} Concrete model string
 */
function resolveTier(tierName, backend) {
  const config = loadTierConfig();
  const tier = (config.tiers || {})[tierName];
  if (!tier) throw new Error(`Unknown model tier: ${tierName}`);
  const model = tier[backend];
  if (!model) throw new Error(`No ${backend} model configured for tier "${tierName}"`);
  return model;
}

/**
 * Resolve agent name directly to a concrete model string.
 */
function resolveModelForAgent(agentName, backend) {
  const tier = getTierForAgent(agentName);
  return resolveTier(tier, backend);
}

/**
 * OpenCode resolves `{file:./relative}` relative to the config file directory.
 * We write the resolved JSON under os.tmpdir(), so relative paths would break.
 * Rewrite `{file:./...}` to `{file:/abs/...}` using the template's directory as base.
 */
function absolutizePromptFileRefs(template, templatePath) {
  const baseDir = path.dirname(templatePath);
  const fileRefRe = /^\{file:(.+)\}$/;

  for (const config of Object.values(template.agent || {})) {
    if (!config || typeof config.prompt !== 'string') continue;
    const m = config.prompt.match(fileRefRe);
    if (!m) continue;
    const inner = m[1].trim();
    if (inner.startsWith('./') || inner.startsWith('.\\')) {
      const absPath = path.resolve(baseDir, inner);
      config.prompt = `{file:${absPath}}`;
    }
  }
}

/**
 * Generate a resolved opencode.json config object with model fields injected.
 * Reads the template (which has no model fields), injects model based on agent_tiers.
 */
function generateResolvedConfig(templatePath) {
  const template = JSON.parse(fs.readFileSync(templatePath, 'utf8'));

  absolutizePromptFileRefs(template, templatePath);

  template.model = resolveTier(getTierForAgent('_default'), 'opencode');

  for (const [name, config] of Object.entries(template.agent || {})) {
    config.model = resolveModelForAgent(name, 'opencode');
  }

  return template;
}

/**
 * Write a resolved opencode.json to a temp file for OpenCode CLI consumption.
 * Returns the temp file path. Caller is responsible for cleanup.
 */
function writeResolvedConfig(templatePath) {
  const resolved = generateResolvedConfig(templatePath);
  const tmpDir = path.join(os.tmpdir(), 'opencode-resolved');
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });
  const tmpPath = path.join(tmpDir, `opencode-${Date.now()}-${Math.random().toString(36).slice(2, 6)}.json`);
  fs.writeFileSync(tmpPath, JSON.stringify(resolved, null, 2));
  return tmpPath;
}

/**
 * Save updated tier config.
 */
function saveTierConfig(config) {
  fs.writeFileSync(TIER_CONFIG_PATH, JSON.stringify(config, null, 2) + '\n');
  clearCache();
}

module.exports = {
  VALID_TIERS,
  VALID_BACKENDS,
  loadTierConfig,
  clearCache,
  loadDefaultTierConfig,
  getTierForAgent,
  resolveTier,
  resolveModelForAgent,
  generateResolvedConfig,
  writeResolvedConfig,
  saveTierConfig,
};
