/**
 * Provider Environment Module
 *
 * Extracts provider-specific environment variables (API keys, base URLs)
 * from the global OpenCode config. Used by Claude Code backend to
 * set ANTHROPIC_BASE_URL and ANTHROPIC_API_KEY.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

/**
 * Extract provider name from a model string like "provider/model-name".
 */
function extractProviderFromModel(modelString) {
  if (!modelString || !modelString.includes('/')) return null;
  return modelString.split('/')[0];
}

/**
 * Load global opencode config from ~/.config/opencode/opencode.json.
 * Falls back to /tmp/test-opencode.json for test environments.
 */
function loadGlobalConfig() {
  const testPath = '/tmp/test-opencode.json';
  try {
    return JSON.parse(fs.readFileSync(testPath, 'utf8'));
  } catch {}

  const globalPath = path.join(os.homedir(), '.config', 'opencode', 'opencode.json');
  try {
    return JSON.parse(fs.readFileSync(globalPath, 'utf8'));
  } catch {
    return {};
  }
}

/**
 * Get provider-specific environment variables for Claude Code.
 * Reads from global opencode config's provider.{providerName}.options.
 *
 * @param {string} modelRef - Model reference like "provider/model-name"
 * @returns {object} Env vars: { ANTHROPIC_BASE_URL?, ANTHROPIC_API_KEY? }
 */
function getProviderEnv(modelRef) {
  if (!modelRef || !modelRef.includes('/')) return {};

  const providerName = extractProviderFromModel(modelRef);
  const globalConfig = loadGlobalConfig();
  const providerConfig = globalConfig.provider?.[providerName] || {};
  const options = providerConfig.options || {};

  const env = {};
  if (options.baseURL) {
    env.ANTHROPIC_BASE_URL = options.baseURL;
  }
  if (options.apiKey) {
    env.ANTHROPIC_API_KEY = options.apiKey;
  }

  return env;
}

/**
 * List available providers from global config.
 */
function listAvailableProviders() {
  const globalConfig = loadGlobalConfig();
  const providers = globalConfig.provider || {};

  return Object.keys(providers).map(key => {
    const cfg = providers[key];
    return {
      key,
      name: cfg.name || key,
    };
  });
}

module.exports = {
  extractProviderFromModel,
  loadGlobalConfig,
  getProviderEnv,
  listAvailableProviders,
};
