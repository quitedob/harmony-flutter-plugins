'use strict';

/**
 * Parse OpenCode `opencode run --format json` NDJSON lines for adapt-workflow log UI.
 */

const REASON_DESCRIPTIONS = {
  length: '模型输出达到长度上限',
  stop: '模型正常结束',
};

const TOOL_FORMATTERS = {
  bash: { formatter: formatBashToolResult },
  todowrite: { hideDetail: true, formatter: formatTodoTool },
};

function createOpenCodeStreamParser() {
  const seenTools = new Set();
  let toolCallCount = 0;
  let lastToolCallFinishCount = 0;

  const handlers = {
    text: (event) => event.part?.text ? ensureLine(event.part.text) : null,
    reasoning: (event) => event.part?.text ? ensureLine(event.part.text) : null,
    error: (event) => ensureLine(`[OpenCode Error] ${formatError(event.error)}`),
    tool_use: (event) => formatToolEvent(event.part, seenTools, () => {
      toolCallCount += 1;
    }),
    step_start: () => null,
    step_finish: (event) => {
      if (!event.part) return null;
      if (event.part.reason !== 'tool-calls') return formatStepFinish(event.part);
      if (toolCallCount - lastToolCallFinishCount < 10) return null;
      lastToolCallFinishCount = toolCallCount;
      return formatStepFinish(event.part);
    },
  };

  return function parse(line) {
    const trimmed = String(line || '').trim();
    if (!trimmed) return null;

    const event = parseJson(trimmed);
    if (!event) return ensureLine(trimmed);

    return handlers[event.type]?.(event) ?? null;
  };
}

function ensureLine(text) {
  if (!text) return '';
  return text.endsWith('\n') ? text : `${text}\n`;
}

function parseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function preview(value, limit = 400) {
  if (value == null) return '';
  const text = String(value);
  if (!text) return '';
  return text.length > limit ? `${text.slice(0, limit)}…` : text;
}

function formatError(error) {
  if (!error) return 'unknown error';
  if (typeof error === 'string') return error;
  if (error.data?.message) return error.data.message;
  if (error.message) return error.message;
  if (error.name) return error.name;
  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function flattenRecord(value, prefix) {
  if (!isPlainObject(value)) return [];

  return Object.entries(value).flatMap(([key, item]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (item === undefined || item === null || item === '') return [];
    if (isPlainObject(item)) return flattenRecord(item, path);
    return [[path, item]];
  });
}

function formatToolEvent(part, seenTools, onNewTool) {
  if (!part) return null;

  const id = part.callID || part.id;
  if (id && seenTools.has(id)) return null;
  if (id) seenTools.add(id);
  onNewTool();

  return formatTool(part);
}

function formatTool(part) {
  const name = part.tool || 'tool';
  const config = TOOL_FORMATTERS[name] || {};
  const input = part.state?.input || {};
  const detail = config.hideDetail ? '' : formatToolDetail(input);
  const icon = part.state?.status === 'error' ? '✗' : '⟡';
  const title = `${icon} ${name}${detail ? `: ${detail}` : ''}`;

  if (part.state?.status === 'error') {
    return ensureLine(`${title}\n失败原因: ${formatError(part.state?.error)}`);
  }
  if (config.formatter) return config.formatter(part, title);
  return ensureLine(title);
}

function formatBashToolResult(part, title) {
  const output = part.state?.output == null ? '' : String(part.state.output);
  return ensureLine(output ? `${title}\n${output}` : title);
}

function formatTodoTool(part, title) {
  const todos = extractTodos(part.state?.output) || extractTodos(part.state?.input);
  if (!todos?.length) return ensureLine(title);

  const lines = todos.map((todo) => {
    const mark = formatTodoStatusMark(todo.status);
    const priority = formatTodoPriority(todo.priority);
    const priorityTag = priority ? ` [${priority}]` : '';
    return `${mark}${priorityTag} ${todo.content || ''}`.trimEnd();
  });
  return ensureLine(`${title}\n${lines.join('\n')}`);
}

function extractTodos(value) {
  const data = parseMaybeJson(value);
  if (Array.isArray(data)) return data;
  if (isPlainObject(data) && Array.isArray(data.todos)) return data.todos;
  return null;
}

function parseMaybeJson(value) {
  if (typeof value !== 'string') return value;
  const text = value.trim();
  if (!text || (!text.startsWith('{') && !text.startsWith('['))) return value;
  return parseJson(text) ?? value;
}

function formatTodoStatusMark(status) {
  if (status === 'completed') return '√';
  if (status === 'in_progress') return '■';
  if (status === 'pending') return '□';
  return '?';
}

function formatTodoPriority(priority) {
  if (priority === 'high') return '高';
  if (priority === 'medium') return '中';
  if (priority === 'low') return '低';
  return priority || '';
}

function formatToolDetail(input) {
  const pathValue = input.filePath || input.file_path || input.path;
  if (input.command) return String(input.command);
  if (pathValue) return pathValue;
  if (input.pattern) return input.pattern;
  if (input.description) return input.description;
  if (input.name) return input.name;
  return Object.keys(input).length ? preview(JSON.stringify(input)) : '';
}

function formatStepFinish(part) {
  const reason = part.reason || 'unknown';
  const description = REASON_DESCRIPTIONS[reason] || '';
  const metrics = [
    ['reason', reason],
    ...flattenRecord(part.tokens, 'tokens'),
  ];
  const items = metrics
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${key}=${value}`);

  const mainLine = `[step finish | ${items.join(' | ')}]`;
  return ensureLine(description ? `${mainLine}\n${description}` : mainLine);
}

module.exports = { createOpenCodeStreamParser };
