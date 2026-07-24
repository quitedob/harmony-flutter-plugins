'use strict';

const fs = require('fs');
const path = require('path');
const { SETTINGS_FILE } = require('./config');
const { DEFAULT_RN_OHOS_NPM_SCOPE } = require('./rn-default-scope');

const ENV_SCOPE = 'RN_OHOS_NPM_SCOPE';

/**
 * @param {string} [scope]
 * @returns {string}
 */
function normalizeOhosNpmScope(scope) {
  const s = (scope || DEFAULT_RN_OHOS_NPM_SCOPE).trim();
  if (!s) return DEFAULT_RN_OHOS_NPM_SCOPE;
  const withAt = s.startsWith('@') ? s : `@${s}`;
  if (!/^@[\w][\w.-]*$/.test(withAt)) return DEFAULT_RN_OHOS_NPM_SCOPE;
  return withAt;
}

/**
 * @param {object} [settings]
 * @returns {string}
 */
function resolveOhosNpmScope(settings) {
  if (process.env[ENV_SCOPE] && process.env[ENV_SCOPE].trim()) {
    return normalizeOhosNpmScope(process.env[ENV_SCOPE]);
  }
  if (settings && typeof settings.ohosNpmScope === 'string' && settings.ohosNpmScope.trim()) {
    return normalizeOhosNpmScope(settings.ohosNpmScope);
  }
  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      const raw = fs.readFileSync(SETTINGS_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed.ohosNpmScope === 'string' && parsed.ohosNpmScope.trim()) {
        return normalizeOhosNpmScope(parsed.ohosNpmScope);
      }
    }
  } catch {
    /* ignore */
  }
  return DEFAULT_RN_OHOS_NPM_SCOPE;
}

/**
 * Env vars for child processes (Agent, gate scripts, rn.py).
 * @param {object} [settings]
 * @returns {Record<string, string>}
 */
function buildRnOhosToolEnv(settings) {
  return {
    [ENV_SCOPE]: resolveOhosNpmScope(settings)
  };
}

module.exports = {
  DEFAULT_RN_OHOS_NPM_SCOPE,
  ENV_SCOPE,
  normalizeOhosNpmScope,
  resolveOhosNpmScope,
  buildRnOhosToolEnv
};
