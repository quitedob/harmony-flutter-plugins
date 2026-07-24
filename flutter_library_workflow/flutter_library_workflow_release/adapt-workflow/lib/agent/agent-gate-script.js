'use strict';

/**
 * Optional per-agent pre-run gate script configured in Profile agentDir/opencode.json:
 *   agent.<agentName>.gate_script — path relative to agent root (e.g. scripts/foo.js)
 * Invoked as: node <absoluteScript> <repoPath>
 * Exit 0 = pass; non-zero = fail (stderr/stdout shown to user as gate error).
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { WORKSPACE_ROOT } = require('../config');
const { resolveAgentRoot } = require('../backends/workspace-links');
const { buildDevecoToolEnv } = require('../deveco-toolchain');
const { buildRnOhosToolEnv } = require('../rn-ohos-npm-scope');

/**
 * @param {string} repoPath - plugin repo root
 * @param {string} agentName - e.g. primary-04-testing
 * @param {{ onOutput?: (chunk: { stream: 'stdout'|'stderr', data: string }) => void }} [options]
 * @returns {Promise<{ pass: boolean, errors: string[] }>}
 */
function runAgentGateScriptIfConfigured(repoPath, agentName, options = {}) {
  if (!repoPath || !agentName) {
    return Promise.resolve({ pass: true, errors: [] });
  }

  const agentRoot = resolveAgentRoot(WORKSPACE_ROOT);
  const opencodePath = path.join(agentRoot, 'opencode.json');
  if (!fs.existsSync(opencodePath)) {
    return Promise.resolve({ pass: true, errors: [] });
  }

  let cfg;
  try {
    cfg = JSON.parse(fs.readFileSync(opencodePath, 'utf8'));
  } catch {
    return Promise.resolve({ pass: true, errors: [] });
  }

  const scriptRel = cfg?.agent?.[agentName]?.gate_script;
  if (!scriptRel || typeof scriptRel !== 'string') {
    return Promise.resolve({ pass: true, errors: [] });
  }

  const scriptAbs = path.resolve(agentRoot, scriptRel);
  if (!fs.existsSync(scriptAbs)) {
    return Promise.resolve({
      pass: false,
      errors: [`门禁脚本未找到（gate_script）: ${scriptRel}（解析为 ${scriptAbs}）`]
    });
  }

  const onOutput = options.onOutput;

  const rnOhosEnv = buildRnOhosToolEnv();

  return new Promise((resolve) => {
    let stdout = '';
    let stderr = '';

    const child = spawn(process.execPath, [scriptAbs, repoPath], {
      cwd: repoPath,
      env: buildDevecoToolEnv({
        ...process.env,
        ...rnOhosEnv,
        WORKSPACE_ROOT,
        ADAPT_REPO: repoPath,
        ADAPT_AGENT: agentName,
        AGENT_ROOT: agentRoot
      }),
      stdio: ['ignore', 'pipe', 'pipe']
    });

    const forward = (stream, chunk) => {
      const data = chunk.toString();
      if (stream === 'stdout') stdout += data;
      else stderr += data;
      if (onOutput && data) onOutput({ stream, data });
    };

    child.stdout.on('data', (chunk) => forward('stdout', chunk));
    child.stderr.on('data', (chunk) => forward('stderr', chunk));

    child.on('error', (err) => {
      resolve({ pass: false, errors: [`门禁脚本执行失败: ${err.message}`] });
    });

    child.on('close', (code, signal) => {
      if (signal) {
        resolve({ pass: false, errors: [`门禁脚本被信号终止: ${signal}`] });
        return;
      }
      if (code !== 0) {
        const msg = [stderr, stdout].filter(Boolean).join('\n').trim()
          || `门禁脚本退出码 ${code}`;
        resolve({ pass: false, errors: [msg] });
        return;
      }
      resolve({ pass: true, errors: [] });
    });
  });
}

module.exports = { runAgentGateScriptIfConfigured };
