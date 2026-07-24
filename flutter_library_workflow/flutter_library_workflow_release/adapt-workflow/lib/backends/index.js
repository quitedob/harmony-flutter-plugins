'use strict';

const { OpenCodeBackend } = require('./opencode');
const { ClaudeCodeBackend } = require('./claude-code');
const { ClineBackend } = require('./cline');
const { ScriptBackend } = require('./script');

const backends = {
  opencode: new OpenCodeBackend(),
  'claude-code': new ClaudeCodeBackend(),
  cline: new ClineBackend(),
  script: new ScriptBackend()
};

/**
 * Get a backend instance by name.
 * @param {string} name - 'opencode' | 'claude-code' | 'cline' | 'script'
 * @returns {OpenCodeBackend|ClaudeCodeBackend|ClineBackend|ScriptBackend}
 */
function getBackend(name) {
  return backends[name] || backends.opencode;
}

module.exports = { getBackend };
