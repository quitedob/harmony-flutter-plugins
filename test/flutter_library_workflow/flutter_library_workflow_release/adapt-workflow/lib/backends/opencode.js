'use strict';

const fs = require('fs');
const path = require('path');
const { ensureWorkspaceLinks, resolveAgentRoot } = require('./workspace-links');
const { writeResolvedConfig, resolveModelForAgent, getTierForAgent } = require('../model-tier-resolver');

const MODEL_VARIANT_RULES = [
  { includes: 'glm', variant: 'max' },
  { includes: 'deepseek', variant: 'max' },
  { includes: 'gpt', variant: 'xhigh' },
  { includes: 'claude', variant: 'max' },
  { includes: 'mimo', variant: 'high' },
];

function resolveVariantArgs(model) {
  const normalizedModel = String(model || '').toLowerCase();
  const rule = MODEL_VARIANT_RULES.find(({ includes }) => normalizedModel.includes(includes));
  return rule ? ['--variant', rule.variant] : [];
}

class OpenCodeBackend {
  /**
   * Build the OpenCode CLI command for a given stage.
   * Generates a resolved opencode.json (with model fields injected from tier config)
   * and points OPENCODE_CONFIG at it.
   *
   * @param {object} stage - Stage definition from stages.js
   * @param {string} repoPath - Absolute path to the plugin repo
   * @param {string} workspaceRoot - Absolute path to workspace root
   * @returns {{ executable: string, args: string[], cwd: string, env: object, meta: object, cleanup: Function }}
   */
  buildCommand(stage, repoPath, workspaceRoot) {
    const agentRoot = stage && stage.agentRoot
      ? (path.isAbsolute(stage.agentRoot) ? stage.agentRoot : path.join(workspaceRoot, stage.agentRoot))
      : resolveAgentRoot(workspaceRoot);
    const templatePath = path.join(agentRoot, 'opencode.json');
    const opencodeConfigDir = path.join(agentRoot, '.opencode');
    const tier = getTierForAgent(stage.agent);
    const model = resolveModelForAgent(stage.agent, 'opencode');
    const variantArgs = resolveVariantArgs(model);

    const resolvedPath = writeResolvedConfig(templatePath);

    ensureWorkspaceLinks(repoPath, workspaceRoot);

    // Use absolute path for --dir to avoid cwd issues.
    // OpenCode emits NDJSON; executor turns it into readable stage logs.
    return {
      executable: 'opencode',
      args: [
        'run',
        stage.prompt,
        '--agent',
        stage.agent,
        ...variantArgs,
        '--thinking',
        '--format',
        'json',
        '--dangerously-skip-permissions',
        '--dir',
        repoPath,
      ],
      cwd: workspaceRoot,
      streamJson: true,
      env: {
        OPENCODE_CONFIG: resolvedPath,
        OPENCODE_CONFIG_DIR: opencodeConfigDir,
        OPENCODE_ENABLE_EXA: '1',
        OPENCODE_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS: '1200000', // 20 分钟
        LANG: 'zh_CN.UTF-8',
        LC_ALL: 'zh_CN.UTF-8',
        LC_CTYPE: 'zh_CN.UTF-8',
        PYTHONIOENCODING: 'utf-8',
        PYTHONUTF8: '1',
        LESSCHARSET: 'utf-8',
      },
      meta: {
        agent: stage.agent,
        backend: 'opencode',
        model,
        tier,
        opencodeConfig: resolvedPath,
        opencodeConfigDir,
        bashTimeoutMs: 1200000 // 20 分钟，用于日志显示
      },
      cleanup: () => {
        try { fs.unlinkSync(resolvedPath); } catch {}
      }
    };
  }
}

module.exports = { OpenCodeBackend };
