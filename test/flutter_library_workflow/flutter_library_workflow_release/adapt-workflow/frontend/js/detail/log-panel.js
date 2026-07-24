import { API_URL, withProfile } from '../constants.js';
import { escapeHtml, showError } from '../utils.js';
import { getBackendClass } from './pipeline.js';

export function showLogPlaceholder() {
  document.getElementById('stagePlaceholder').style.display = 'flex';
  document.getElementById('stageLogOutput').style.display = 'none';
}

export function showLogOutput() {
  document.getElementById('stagePlaceholder').style.display = 'none';
  document.getElementById('stageLogOutput').style.display = 'block';
}

let currentAppendLine = null;
let currentAppendClass = '';

function createLogLine(logEl, cls, text = '') {
  const div = document.createElement('div');
  div.className = 'output-line' + (cls ? ' ' + cls : '');
  div.textContent = text;
  logEl.appendChild(div);
  return div;
}

function isScrolledNearBottom(el) {
  const threshold = 24;
  if (!el) return true;
  const maxScrollTop = Math.max(0, el.scrollHeight - el.clientHeight);
  return maxScrollTop - el.scrollTop <= threshold;
}

function getLogScrollTarget(logEl) {
  const candidates = [
    logEl,
    document.getElementById('logView'),
    document.querySelector('.stage-body'),
    document.querySelector('.content-zone'),
    document.scrollingElement || document.documentElement
  ].filter(Boolean);

  return candidates.find((el) => el.scrollHeight > el.clientHeight + 1) || logEl;
}

function scrollToBottomIfNeeded(el, shouldStick) {
  if (shouldStick) {
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
  }
}

function appendToCurrentLine(logEl, text, cls) {
  const normalized = String(text || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const parts = normalized.split('\n');
  const classKey = cls || '';

  for (let i = 0; i < parts.length; i++) {
    if (!currentAppendLine || currentAppendLine.parentElement !== logEl || currentAppendClass !== classKey) {
      currentAppendLine = createLogLine(logEl, cls);
      currentAppendClass = classKey;
    }
    currentAppendLine.textContent += parts[i];

    if (i < parts.length - 1) {
      currentAppendLine = null;
      currentAppendClass = '';
    }
  }
}

export function resetLogAppendState() {
  currentAppendLine = null;
  currentAppendClass = '';
}

export function appendLog(text, cls, options = {}) {
  const logEl = document.getElementById('stageLogOutput');
  const scrollTarget = getLogScrollTarget(logEl);
  const shouldStick = isScrolledNearBottom(scrollTarget);

  if (options.append) {
    appendToCurrentLine(logEl, text, cls);
    scrollToBottomIfNeeded(scrollTarget, shouldStick);
    return;
  }

  resetLogAppendState();
  const lines = text.split('\n');
  for (const line of lines) {
    if (!line && !cls) continue;
    createLogLine(logEl, cls, line);
  }
  scrollToBottomIfNeeded(scrollTarget, shouldStick);
}

const CONNECTION_STATUS_MESSAGES = {
  reconnecting: '⟳ 连接已断开，任务可能仍在后台运行，正在尝试恢复...',
  reconnected: '✓ 连接已恢复，正在追踪日志',
  'reconnect-failed': '✕ 连接中断，多次重连失败。任务可能仍在后台运行，请刷新页面。'
};

const CONNECTION_STATUS_CLASSES = {
  reconnecting: 'connection-status warning',
  reconnected: 'connection-status success',
  'reconnect-failed': 'connection-status error'
};

function ensureConnectionStatusEl() {
  let el = document.getElementById('connectionStatus');
  if (!el) {
    el = document.createElement('div');
    el.id = 'connectionStatus';
    el.style.cssText = 'display:none;padding:8px 16px;border-radius:6px;margin-bottom:8px;font-size:13px;transition:opacity .3s';
    const logEl = document.getElementById('stageLogOutput');
    if (logEl) logEl.parentElement.insertBefore(el, logEl);
  }
  return el;
}

export function showConnectionStatus(status) {
  const el = ensureConnectionStatusEl();
  el.textContent = CONNECTION_STATUS_MESSAGES[status] || status;
  el.className = CONNECTION_STATUS_CLASSES[status] || 'connection-status';
  el.style.display = 'block';
  el.style.opacity = '1';

  if (status === 'reconnected') {
    setTimeout(() => { el.style.opacity = '0'; setTimeout(() => { el.style.display = 'none'; }, 300); }, 3000);
  }
}

export function hideConnectionStatus() {
  const el = document.getElementById('connectionStatus');
  if (el) { el.style.display = 'none'; }
}

export async function loadStageLog(pluginId, stageId) {
  try {
    const response = await fetch(withProfile(`${API_URL}/plugins/${pluginId}/stages/${stageId}/log`));
    if (!response.ok) { showLogPlaceholder(); return; }

    const text = await response.text();
    const logEl = document.getElementById('stageLogOutput');
    logEl.innerHTML = '';
    resetLogAppendState();

    for (const line of text.split('\n')) {
      const div = document.createElement('div');
      div.className = 'output-line';
      if (line.startsWith('[STDERR]') || line.startsWith('[ERROR]')) div.className += ' error';
      else if (line.startsWith('$') || line.startsWith('===')) div.className += ' cmd';
      div.textContent = line;
      logEl.appendChild(div);
    }

    showLogOutput();
    logEl.scrollTop = logEl.scrollHeight;
  } catch (error) {
    showError('加载日志失败: ' + error.message);
  }
}

let _lastStageButtonsHtml = '';
let _lastStageHeaderKey = '';

export function renderStageButtons(stage, backendConfig, pluginId, callbacks) {
  const { onRun, onKill, onViewOutput } = callbacks;
  const stageBackend = backendConfig.stages?.[stage.id] || backendConfig.global || 'opencode';
  const backendLabel =
    stageBackend === 'script' ? '固定脚本'
      : stageBackend === 'claude-code' ? 'Claude Code'
      : stageBackend === 'cline' ? 'Cline CLI'
        : 'OpenCode';
  const backendCls = getBackendClass(stageBackend);

  const headerKey = `${stage.id}|${stage.name}|${backendCls}`;
  if (headerKey !== _lastStageHeaderKey) {
    _lastStageHeaderKey = headerKey;
    document.getElementById('stageTitle').textContent = `${stage.name} 阶段`;
    document.getElementById('stageDescription').innerHTML =
      `${escapeHtml(stage.description)} <span class="backend-badge ${backendCls}">${backendLabel}</span>`;
  }

  const actionsEl = document.getElementById('stageActions');
  let buttons = '';

  if (stage.status === 'running') {
    buttons += `<button class="btn btn-small btn-danger" id="killStageBtn">终止</button>`;
  } else {
    const rerunStatuses = ['success', 'failed', 'interrupted', 'unknown'];
    const label = rerunStatuses.includes(stage.status) ? '重新执行' : '执行';
    buttons += `<button class="btn btn-small btn-primary" id="runStageBtn">${label}</button>`;
  }
  if (stage.hasOutput) {
    buttons += `<button class="btn btn-small btn-secondary" id="viewOutputBtn">产物</button>`;
  }

  // 必须带上 stage.id：否则「执行/重新执行」等按钮 HTML 在不同阶段相同时会误跳过，
  // 导致仍绑定上一阶段的 onRun(旧 stageId)（例如点了测试验证却执行鸿蒙库适配）。
  const buttonsDedupKey = `${stage.id}|${buttons}`;
  if (buttonsDedupKey === _lastStageButtonsHtml) return;
  _lastStageButtonsHtml = buttonsDedupKey;

  actionsEl.innerHTML = buttons;

  document.getElementById('runStageBtn')?.addEventListener('click', () => onRun(stage.id));
  document.getElementById('killStageBtn')?.addEventListener('click', () => onKill(stage.id));
  document.getElementById('viewOutputBtn')?.addEventListener('click', () => onViewOutput(stage.id));
}

export function connectToLogStream(pluginId, stageId, onExit) {
  const logEl = document.getElementById('stageLogOutput');
  logEl.innerHTML = '';
  resetLogAppendState();
  showLogOutput();

  const eventSource = new EventSource(withProfile(`${API_URL}/plugins/${pluginId}/stages/${stageId}/log-stream`));

  eventSource.onmessage = function(event) {
    let data;
    try { data = JSON.parse(event.data); } catch { return; }
    if (data.type === 'stdout') {
      appendLog(data.data, undefined, { append: data.append === true });
    } else if (data.type === 'exit') {
      eventSource.close();
      onExit();
    }
  };

  eventSource.onerror = function() {
    eventSource.close();
  };

  return eventSource;
}
