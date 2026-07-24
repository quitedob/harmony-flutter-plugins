'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const { ensureWorkspaceLinks, resolveAgentRoot } = require('./workspace-links');
const { getTierForAgent, resolveTier } = require('../model-tier-resolver');

let cachedClaudePath;

/**
 * Resolve the claude CLI to an absolute path. The server may be launched from
 * a shell whose PATH lacks the install dir (e.g. ~/.local/bin from the native
 * installer), in which case spawning the bare name fails with ENOENT.
 *
 * @param {string} [explicitPath] - settings.claudeCode.executablePath override
 * @returns {string} Absolute path to claude, or 'claude' if not found
 */
function resolveClaudeExecutable(explicitPath) {
  if (explicitPath) return explicitPath;
  if (cachedClaudePath !== undefined) return cachedClaudePath;

  const names = process.platform === 'win32'
    ? ['claude.exe', 'claude.cmd', 'claude']
    : ['claude'];
  const pathDirs = (process.env.PATH || process.env.Path || '')
    .split(path.delimiter)
    .filter(Boolean);
  const fallbackDirs = [
    path.join(os.homedir(), '.local', 'bin'),
    '/opt/homebrew/bin',
    '/usr/local/bin'
  ];

  for (const dir of [...pathDirs, ...fallbackDirs]) {
    for (const name of names) {
      const candidate = path.join(dir, name);
      try {
        fs.accessSync(candidate, fs.constants.X_OK);
        cachedClaudePath = candidate;
        return cachedClaudePath;
      } catch {}
    }
  }
  cachedClaudePath = 'claude';
  return cachedClaudePath;
}

class ClaudeCodeBackend {
  /**
   * Build the Claude Code CLI command for a given stage.
   * Model is resolved from tier config (no hardcoded MODEL_MAP).
   *
   * @param {object} stage - Stage definition from stages.js
   * @param {string} repoPath - Absolute path to the plugin repo
   * @param {string} workspaceRoot - Absolute path to workspace root
   * @param {object} [options] - Additional options from settings.claudeCode
   * @param {boolean} [options.skipPermissions] - Whether to skip permissions (default true)
   * @param {string} [options.executablePath] - Explicit path to the claude CLI
   * @returns {{ executable: string, args: string[], cwd: string, env: object, streamJson: boolean, meta: object, cleanup: Function }}
   */
  buildCommand(stage, repoPath, workspaceRoot, options = {}) {
    const agentRoot = resolveAgentRoot(workspaceRoot);
    const agentsConfig = this._loadAgentsConfig(agentRoot);
    const agentConfig = agentsConfig[stage.agent] || {};

    const promptPath = this._resolvePromptPath(agentRoot, agentConfig);
    let promptFile, tempFile;
    if (promptPath) {
      promptFile = promptPath;
      tempFile = null;
    } else {
      const content = agentConfig.prompt || '';
      tempFile = this._writeTempPrompt(content);
      promptFile = tempFile;
    }

    const tier = getTierForAgent(stage.agent);
    const model = resolveTier(tier, 'claude-code');
    // 代理网关期望裸模型名（如 glm-5.2）；provider 前缀只用于下面解析 baseURL/apiKey。
    const cliModel = model.includes('/') ? model.slice(model.indexOf('/') + 1) : model;
    const skipPerms = options.skipPermissions !== false;

    const subagentsArgs = this._buildSubagentsArgs(agentRoot, agentConfig, agentsConfig);

    // ANTHROPIC_BASE_URL/API_KEY 从 claude-code 档模型自身的 provider 解析（如 zhipuai 网关），
    // 仅注入到本 claude 子进程的 env；你交互使用的 Opus 是独立进程、无此 env，不受影响。
    const providerEnv = this._getProviderEnv(model);

    ensureWorkspaceLinks(repoPath, workspaceRoot);

    const args = [
      '-p', stage.prompt,
      '--append-system-prompt-file', promptFile,
      '--model', cliModel,
      '--verbose',
      '--output-format', 'stream-json',
      '--include-partial-messages',
    ];

    // 默认 --effort max：保留 extended thinking 的最大思考预算，作为提交在代码里的默认值，
    const effort = options.effort || 'max';
    args.push('--effort', String(effort));

    if (skipPerms) {
      args.push('--dangerously-skip-permissions');
    }

    args.push(...subagentsArgs);

    return {
      executable: resolveClaudeExecutable(options.executablePath),
      args,
      cwd: repoPath,
      env: {
        ...providerEnv,
        LANG: 'zh_CN.UTF-8',
        LC_ALL: 'zh_CN.UTF-8',
        LC_CTYPE: 'zh_CN.UTF-8',
        PYTHONIOENCODING: 'utf-8',
        PYTHONUTF8: '1',
        LESSCHARSET: 'utf-8',
      },
      streamJson: true,
      meta: {
        agent: stage.agent,
        backend: 'claude-code',
        model,
        promptFile,
        tier
      },
      cleanup: () => {
        if (tempFile) {
          try { fs.unlinkSync(tempFile); } catch {}
        }
      }
    };
  }

  /**
   * Get provider-specific environment variables for Claude Code.
   * @param {string} modelRef - Model reference like "provider/model-name"
   * @returns {object} Env vars: { ANTHROPIC_BASE_URL?, ANTHROPIC_API_KEY? }
   */
  _getProviderEnv(modelRef) {
    const providerResolver = require('../provider-resolver');
    return providerResolver.getProviderEnv(modelRef);
  }

  /**
   * Load agent configuration from opencode.json's "agent" field.
   */
  _loadAgentsConfig(agentRoot) {
    const configPath = path.join(agentRoot, 'opencode.json');
    try {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      return config.agent || {};
    } catch {
      return {};
    }
  }

  /**
   * Resolve the {file:./path} prompt to an absolute file path.
   */
  _resolvePromptPath(agentRoot, agentConfig) {
    const prompt = agentConfig.prompt || '';
    const fileMatch = prompt.match(/^\{file:(.+)\}$/);
    if (fileMatch) {
      return path.resolve(agentRoot, fileMatch[1]);
    }
    return null;
  }

  /**
   * Read agent prompt content for embedding in --agents JSON.
   */
  _readPromptFile(agentRoot, agentConfig) {
    const filePath = this._resolvePromptPath(agentRoot, agentConfig);
    if (filePath) {
      try {
        return fs.readFileSync(filePath, 'utf8').trim();
      } catch {
        return '';
      }
    }
    return agentConfig.prompt || '';
  }

  _writeTempPrompt(content) {
    const tmpDir = path.join(os.tmpdir(), 'claude-code-prompts');
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
    const tmpFile = path.join(tmpDir, `prompt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.md`);
    fs.writeFileSync(tmpFile, content, 'utf8');
    return tmpFile;
  }

  /**
   * Build --agents args from permission.task entries.
   * Model for each subagent is resolved from tier config.
   */
  _buildSubagentsArgs(agentRoot, agentConfig, agentsConfig) {
    const taskPerms = agentConfig.permission?.task || {};
    const allowedSubs = Object.entries(taskPerms)
      .filter(([, v]) => v === 'allow')
      .map(([name]) => name);

    if (allowedSubs.length === 0) return [];

    const agents = {};
    for (const name of allowedSubs) {
      const subConfig = agentsConfig[name];
      if (!subConfig) continue;

      const subTier = getTierForAgent(name);
      const subModel = resolveTier(subTier, 'claude-code');
      agents[name] = {
        description: subConfig.description || '',
        prompt: this._readPromptFile(agentRoot, subConfig),
        model: subModel.includes('/') ? subModel.slice(subModel.indexOf('/') + 1) : subModel,
        tools: this._mapSubagentTools(subConfig)
      };
    }

    if (Object.keys(agents).length === 0) return [];
    return ['--agents', JSON.stringify(agents)];
  }

  _mapSubagentTools(agentConfig) {
    const tools = agentConfig.tools || {};
    const mapped = ['Read', 'Grep', 'Glob'];

    if (tools.bash === true) mapped.push('Bash');
    if (tools.write === true) mapped.push('Write');
    if (tools.edit === true) mapped.push('Edit');
    if (tools.websearch || tools.webfetch) mapped.push('WebSearch', 'WebFetch');

    return mapped;
  }
}

/**
 * Create a stateful parser that converts Claude Code stream-json events into plain text.
 */
function createStreamParser(options = {}) {
  const emitDeltas = options.emitDeltas === true;
  const seenTools = new Set();
  const blockState = new Map();
  const toolNamesById = new Map();

  function formatDuration(ms) {
    if (!Number.isFinite(ms) || ms <= 0) return '';
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  }

  function formatTokenUsage(usage) {
    if (!usage || typeof usage !== 'object') return '';
    const parts = [];
    if (usage.input_tokens > 0) parts.push(`输入 ${usage.input_tokens}`);
    if (usage.output_tokens > 0) parts.push(`输出 ${usage.output_tokens}`);
    if (usage.cache_read_input_tokens > 0) parts.push(`缓存读取 ${usage.cache_read_input_tokens}`);
    if (usage.total_tokens > 0) parts.push(`总计 ${usage.total_tokens}`);
    if (usage.tool_uses > 0) parts.push(`工具 ${usage.tool_uses} 次`);
    return parts.join('，');
  }

  function summarizeText(text, maxLen = 160) {
    const normalized = String(text || '').replace(/\s+/g, ' ').trim();
    if (!normalized) return '';
    return normalized.length > maxLen ? `${normalized.slice(0, maxLen)}...` : normalized;
  }

  function normalizeMultilineText(text) {
    return String(text || '')
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .split('\n')
      .map((line) => line.replace(/[ \t]+$/g, ''))
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  function formatBufferedText(state) {
    if (!state?.buffer) return '';
    return normalizeMultilineText(state.buffer);
  }

  function flushBufferedBlock(index) {
    const state = blockState.get(index);
    if (!state || (state.kind !== 'thinking' && state.kind !== 'text')) return null;
    blockState.delete(index);
    if (state.streamed) {
      return state.endsWithNewline ? null : { data: '\n', append: true };
    }
    const text = formatBufferedText(state);
    return text ? `${text}\n` : null;
  }

  function flushAllBufferedBlocks() {
    const outputs = [];
    for (const [index, state] of blockState.entries()) {
      if (!state || (state.kind !== 'thinking' && state.kind !== 'text')) continue;
      if (state.streamed) {
        if (!state.endsWithNewline) outputs.push({ data: '\n', append: true });
        blockState.delete(index);
        continue;
      }
      const text = formatBufferedText(state);
      if (text) outputs.push(text);
      blockState.delete(index);
    }
    if (outputs.length === 0) return null;
    if (outputs.every((item) => typeof item === 'string')) {
      return `${outputs.join('\n')}\n`;
    }
    return outputs;
  }

  function formatToolUse(block) {
    const name = block.name || 'unknown';
    const input = block.input || {};
    const details = [];

    if (input.file_path || input.path) {
      details.push(`${input.file_path || input.path}`);
    } else if (input.command) {
      details.push(summarizeText(input.command, 160));
    } else if (input.pattern) {
      details.push(`pattern: ${summarizeText(input.pattern, 120)}`);
    } else if (input.query) {
      details.push(`query: ${summarizeText(input.query, 120)}`);
    } else if (input.description) {
      details.push(summarizeText(input.description, 120));
    } else if (input.prompt) {
      details.push(summarizeText(input.prompt, 120));
    } else if (input.subagent_type) {
      details.push(`子任务类型: ${input.subagent_type}`);
    } else if (Object.keys(input).length > 0) {
      details.push(
        Object.entries(input)
          .map(([key, value]) => `${key}: ${typeof value === 'string' ? summarizeText(value, 60) : String(value)}`)
          .join('，')
      );
    }

    return details.length > 0 ? `⟡ ${name}: ${details[0]}\n` : `⟡ ${name}\n`;
  }

  function formatSystemEvent(event) {
    const subtype = event.subtype || 'unknown';
    if (subtype === 'thinking_tokens') {
      return null;
    }

    if (subtype === 'task_started') {
      return `[子任务开始] ${event.description || event.task_type || event.task_id || '未命名任务'}\n`;
    }

    if (subtype === 'task_progress') {
      return null;
    }

    if (subtype === 'task_notification') {
      if (event.status === 'stopped' && !event.usage && !event.output_file) {
        return null;
      }
      const label = event.status ? `状态 ${event.status}` : '状态更新';
      const meta = [];
      const usageText = formatTokenUsage(event.usage);
      if (usageText) meta.push(usageText);
      if (event.usage?.duration_ms) meta.push(`耗时 ${formatDuration(event.usage.duration_ms)}`);
      if (event.output_file) meta.push(`输出 ${event.output_file}`);
      return `[子任务通知] ${label}${event.summary ? `，${event.summary}` : ''}${meta.length ? `（${meta.join('，')}）` : ''}\n`;
    }

    return null;
  }

  function formatStreamEvent(event) {
    const nested = event.event || {};
    const type = nested.type || 'unknown';

    if (type === 'message_start') {
      return null;
    }

    if (type === 'message_delta') {
      return null;
    }

    if (type === 'message_stop') {
      return flushAllBufferedBlocks();
    }

    if (type === 'content_block_start') {
      const block = nested.content_block || {};
      if (block.type === 'thinking') {
        blockState.set(nested.index, { kind: 'thinking', buffer: '' });
        return null;
      }
      if (block.type === 'text') {
        blockState.set(nested.index, { kind: 'text', buffer: '' });
        return null;
      }
      if (block.type === 'tool_use') {
        blockState.set(nested.index, { kind: 'tool_use' });
        return null;
      }
      blockState.set(nested.index, { kind: block.type || 'unknown' });
      return null;
    }

    if (type === 'content_block_delta') {
      const delta = nested.delta || {};
      if (delta.type === 'text_delta') {
        const state = blockState.get(nested.index) || {};
        state.kind = 'text';
        const text = delta.text || '';
        if (emitDeltas && text) {
          state.streamed = true;
          state.endsWithNewline = text.endsWith('\n') || text.endsWith('\r');
          blockState.set(nested.index, state);
          return { data: text, append: true };
        }
        state.buffer = `${state.buffer || ''}${text}`;
        blockState.set(nested.index, state);
        return null;
      }
      if (delta.type === 'thinking_delta') {
        const state = blockState.get(nested.index) || {};
        state.kind = 'thinking';
        const thinking = delta.thinking || '';
        if (emitDeltas && thinking) {
          state.streamed = true;
          state.endsWithNewline = thinking.endsWith('\n') || thinking.endsWith('\r');
          blockState.set(nested.index, state);
          return { data: thinking, append: true };
        }
        state.buffer = `${state.buffer || ''}${thinking}`;
        blockState.set(nested.index, state);
        return null;
      }
      if (delta.type === 'input_json_delta') {
        const state = blockState.get(nested.index) || {};
        state.kind = 'input_json';
        blockState.set(nested.index, state);
        return null;
      }
      return null;
    }

    if (type === 'content_block_stop') {
      const flushed = flushBufferedBlock(nested.index);
      if (flushed) return flushed;
      blockState.delete(nested.index);
      return null;
    }

    return null;
  }

  function formatUserEvent(event) {
    const message = event.message || {};
    const blocks = Array.isArray(message.content) ? message.content : [];
    if (blocks.length === 0) return null;

    const lines = [];
    for (const block of blocks) {
      if (block.type === 'tool_result') {
        if (!block.is_error) continue;
        const toolName = block.tool_use_id ? toolNamesById.get(block.tool_use_id) : null;
        const label = toolName ? `${toolName} 执行失败` : '工具执行失败';
        const content = Array.isArray(block.content)
          ? block.content.map((item) => {
              if (typeof item === 'string') return item;
              if (item?.text) return item.text;
              return JSON.stringify(item);
            }).join(' ')
          : block.content;
        lines.push(`${label}：${summarizeText(content, 240) || '请查看详细错误'}`);
      }
    }

    return lines.length > 0 ? `${lines.join('\n')}\n` : null;
  }

  function formatResultEvent(event) {
    const pending = flushAllBufferedBlocks();

    if (!event.is_error) return pending || null;

    const reasons = [];
    if (event.subtype) reasons.push(event.subtype);
    if (event.stop_reason) reasons.push(event.stop_reason);
    if (event.terminal_reason) reasons.push(event.terminal_reason);
    if (Array.isArray(event.errors) && event.errors.length > 0) {
      reasons.push(event.errors.join('；'));
    }

    const errorLine = `执行失败：${summarizeText(reasons.join('；'), 240) || '请查看详细日志'}\n`;
    if (Array.isArray(pending)) {
      return [...pending, errorLine];
    }
    return `${pending || ''}${errorLine}`;
  }

  return function parse(line) {
    line = line.trim();
    if (!line) return null;

    let event;
    try {
      event = JSON.parse(line);
    } catch {
      return line + '\n';
    }

    if (event.type === 'assistant') {
      const msg = event.message;
      if (!msg?.content) return null;

      let output = '';

      for (const block of msg.content) {
        if (block.type === 'tool_use' && block.id && !seenTools.has(block.id)) {
          seenTools.add(block.id);
          toolNamesById.set(block.id, block.name || 'unknown');
          output += formatToolUse(block);
        }
      }

      return output || null;
    }

    if (event.type === 'system') return formatSystemEvent(event);
    if (event.type === 'stream_event') return formatStreamEvent(event);
    if (event.type === 'user') return formatUserEvent(event);
    if (event.type === 'result') return formatResultEvent(event);

    return null;
  };
}

module.exports = { ClaudeCodeBackend, createStreamParser };
