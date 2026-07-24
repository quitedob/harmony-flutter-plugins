'use strict';

const fs = require('fs');
const path = require('path');
const { ensureWorkspaceLinks, resolveAgentRoot } = require('./workspace-links');
const { getActiveProfile } = require('../profile');

/**
 * Cline CLI backend.
 *
 * Notes:
 * - Cline does NOT natively read opencode.json. We adapt by:
 *   1) Loading the agent config for stage.agent from opencode.json
 *   2) Extracting agent prompt (supports {file:...})
 *   3) Injecting it into the user prompt for cline (first version)
 * - subagents are not supported in v1 (merged into main prompt).
 */
class ClineBackend {
  /**
   * @param {object} stage - Stage definition from stages.js
   * @param {string} repoPath - Absolute path to the plugin repo
   * @param {string} workspaceRoot - Absolute path to workspace root
   * @param {object} [options] - settings.cline options
   * @param {string} [options.configDir] - Optional cline config dir (passed via --config)
   * @param {boolean} [options.yolo] - Whether to run cline in yolo mode
   * @returns {{ executable: string, args: string[], cwd: string, env: object, streamJson: boolean, meta: object }}
   */
  buildCommand(stage, repoPath, workspaceRoot, options = {}) {
    const agentRoot = this._resolveAgentRootForStage(stage, workspaceRoot);
    const agentsConfig = this._loadAgentsConfig(agentRoot);
    const agentConfig = agentsConfig[stage.agent] || {};

    ensureWorkspaceLinks(repoPath, workspaceRoot);

    const { prompt: systemPrompt, promptSource } = this._loadAgentPrompt(agentRoot, agentConfig);

    // v1: Avoid passing a huge multi-line prompt (with quotes) via cmd.exe.
    // Write the full prompt content to a temp file, then pass a short prompt
    // instructing cline to read it. This keeps Windows shell execution stable.
    const fullPrompt = this._composePrompt(stage.prompt, systemPrompt, stage.id);
    const { promptFile, cleanup } = this._writeRepoPrompt(repoPath, fullPrompt);
    const userPrompt = this._buildFilePrompt(promptFile);

    const args = [];
    if (options.configDir) {
      args.push('--config', options.configDir);
    }

    args.push('--json');

    if (options.yolo) {
      args.push('--yolo');
    }

    // Ensure cline runs in the plugin repo directory.
    args.push('--cwd', repoPath);

    // Default command: `cline "prompt" ...` (no explicit subcommand).
    args.push(userPrompt);

    return {
      executable: 'cline',
      args,
      cwd: workspaceRoot,
      env: {},
      streamJson: true,
      cleanup,
      meta: {
        agent: stage.agent,
        backend: 'cline',
        promptSource,
        hasSystemPrompt: !!systemPrompt
      }
    };
  }

  _resolveAgentRootForStage(stage, workspaceRoot) {
    const override = stage && stage.agentRoot;
    if (!override) return resolveAgentRoot(workspaceRoot);
    // Support both absolute paths and workspace-relative paths.
    return path.isAbsolute(override) ? override : path.join(workspaceRoot, override);
  }

  _loadAgentsConfig(agentRoot) {
    const configPath = path.join(agentRoot, 'opencode.json');
    try {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      return config.agent || {};
    } catch {
      return {};
    }
  }

  _resolvePromptPath(agentRoot, agentConfig) {
    const prompt = agentConfig.prompt || '';
    const fileMatch = prompt.match(/^\{file:(.+)\}$/);
    if (fileMatch) {
      return path.resolve(agentRoot, fileMatch[1]);
    }
    return null;
  }

  _loadAgentPrompt(agentRoot, agentConfig) {
    const promptPath = this._resolvePromptPath(agentRoot, agentConfig);
    if (promptPath) {
      try {
        const text = fs.readFileSync(promptPath, 'utf8').trim();
        return { prompt: text, promptSource: `file:${promptPath}` };
      } catch {
        return { prompt: '', promptSource: `file:${promptPath} (read_failed)` };
      }
    }
    const inline = (agentConfig.prompt || '').trim();
    return { prompt: inline, promptSource: inline ? 'inline' : 'none' };
  }

  _composePrompt(stagePrompt, systemPrompt, stageId) {
    const p = (stagePrompt || '').trim();
    const s = (systemPrompt || '').trim();
    const stageGuards = this._stageGuards(stageId);
    if (!s && !stageGuards) return p;
    // Clear boundary so Cline treats the system portion as constraints.
    return [
      p,
      stageGuards ? '\n' + stageGuards : '',
      '',
      '---',
      'System constraints (from opencode agent prompt):',
      s
    ].join('\n');
  }

  _stageGuards(stageId) {
    if (stageId !== 'planning') return '';
    return [
      '## Planning 阶段额外约束（必须遵守）',
      '',
      '- 禁止调用或使用 `flutter-plugin-example-generator`（该 Skill 仅用于 demo-gen 阶段生成完整 Example/Demo）。',
      '- 本阶段只做方案制定与文件规划：输出 `02-planning.json` 与 `02-planning-report.md`。'
    ].join('\n');
  }

  _writeRepoPrompt(repoPath, content) {
    // Write the prompt under the repo so Cline can read it as "in workspace".
    const adaptDirName = (getActiveProfile() && getActiveProfile().ADAPTATION_DIR) ? getActiveProfile().ADAPTATION_DIR : '.ohos-adaptation';
    const baseDir = path.join(repoPath, adaptDirName, '.cline-prompts');
    if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });
    const fp = path.join(baseDir, `prompt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.txt`);
    fs.writeFileSync(fp, content || '', 'utf8');
    return {
      promptFile: fp,
      cleanup: () => {
        try { fs.unlinkSync(fp); } catch {}
      }
    };
  }

  _buildFilePrompt(promptFile) {
    // Keep it short and avoid quotes to reduce cmd parsing issues.
    // We rely on cline being able to read files via its normal file tools.
    return `请读取并遵循文件内容完成任务：${promptFile}`;
  }
}

/**
 * Convert `cline --json` output lines into plain text.
 *
 * We keep it conservative:
 * - skip partial chunks to reduce spam
 * - output `text` for say/ask messages
 * - fall back to raw line for non-JSON
 */
function createClineStreamParser() {
  const MAX_DETAIL_CHARS = 4000;

  function clip(s) {
    if (s == null) return '';
    const str = typeof s === 'string' ? s : JSON.stringify(s);
    if (str.length <= MAX_DETAIL_CHARS) return str;
    return str.slice(0, MAX_DETAIL_CHARS) + `\n… (truncated, ${str.length} chars total)`;
  }

  function formatToolEvent(ev) {
    const tool = ev.tool || ev.name;
    if (!tool) return null;

    const parts = [];

    // Common location fields
    const cwd = ev.cwd || ev.workingDirectory || ev.dir;
    if (cwd) parts.push(`cwd=${cwd}`);

    // Common input fields
    const pathField = ev.path || ev.file_path || ev.filePath;
    const command = ev.command || ev.cmd;
    if (pathField) parts.push(`path=${pathField}`);
    if (command) parts.push(`cmd=${command}`);

    // Common output-ish fields
    const exitCode = ev.exitCode ?? ev.code ?? ev.statusCode;
    if (exitCode != null) parts.push(`code=${exitCode}`);

    // Some cline tool events include "content" or "output"
    const result =
      ev.output ?? ev.stdout ?? ev.result ?? ev.content ?? ev.response ?? ev.data ?? null;
    const resultStr = result == null ? '' : clip(result);

    const header = `\n⟡ ${tool}${parts.length ? ' (' + parts.join(', ') + ')' : ''}\n`;
    if (!resultStr) return header;
    return header + resultStr + (resultStr.endsWith('\n') ? '' : '\n');
  }

  return function parse(line) {
    const raw = (line || '').trimEnd();
    if (!raw.trim()) return null;
    let event;
    try {
      event = JSON.parse(raw);
    } catch {
      return raw + '\n';
    }

    if (event && event.partial === true) return null;

    const toolText = formatToolEvent(event);
    if (toolText) return toolText;

    const text = typeof event.text === 'string' ? event.text : '';
    if (!text) return null;

    return text.endsWith('\n') ? text : text + '\n';
  };
}

module.exports = { ClineBackend, createClineStreamParser };

