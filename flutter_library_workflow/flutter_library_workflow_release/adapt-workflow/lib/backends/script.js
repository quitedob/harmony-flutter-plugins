'use strict';

const path = require('path');
const { getActiveProfile } = require('../profile');

class ScriptBackend {
  /**
   * Build a fixed script command for a stage.
   *
   * @param {object} stage - Stage definition from profile config
   * @param {string} repoPath - Absolute path to the plugin repo
   * @param {string} workspaceRoot - Absolute path to workspace root
   * @returns {{ executable: string, args: string[], cwd: string, env: object, meta: object, cleanup: Function }}
   */
  buildCommand(stage, repoPath, workspaceRoot) {
    const script = normalizeScript(stage?.script);
    const adaptationDir = path.join(repoPath, getActiveProfile().ADAPTATION_DIR);
    const context = {
      repoPath,
      workspaceRoot,
      adaptationDir,
      outputFile: stage?.outputFile || '',
      outputReport: stage?.outputReport || '',
      stageId: stage?.id || '',
    };

    if (!script.command) {
      throw new Error(`阶段 ${stage?.id || '(unknown)'} 配置了 script 字段，但缺少 script.command`);
    }

    const executable = replacePlaceholders(script.command, context);
    const args = (script.args || []).map((arg) => replacePlaceholders(String(arg), context));
    const cwd = replacePlaceholders(script.cwd || workspaceRoot, context);
    const env = {};
    for (const [key, value] of Object.entries(script.env || {})) {
      env[key] = replacePlaceholders(String(value), context);
    }

    return {
      executable,
      args,
      cwd,
      env,
      meta: {
        backend: 'script',
        scriptCommand: [executable, ...args].join(' '),
      },
      cleanup: () => {},
    };
  }
}

function normalizeScript(script) {
  if (typeof script === 'string') {
    return { command: script, args: [] };
  }
  if (script && typeof script === 'object') {
    return {
      command: script.command || '',
      args: Array.isArray(script.args) ? script.args : [],
      cwd: script.cwd,
      env: script.env && typeof script.env === 'object' ? script.env : {},
    };
  }
  return { command: '', args: [] };
}

function replacePlaceholders(value, context) {
  return value.replace(/\{([a-zA-Z0-9_]+)\}/g, (match, key) => {
    return Object.prototype.hasOwnProperty.call(context, key) ? String(context[key]) : match;
  });
}

module.exports = { ScriptBackend };
