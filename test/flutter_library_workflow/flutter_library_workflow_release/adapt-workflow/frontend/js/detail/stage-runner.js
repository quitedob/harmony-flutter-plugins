import { API_URL, withProfile } from '../constants.js';
import { showError } from '../utils.js';
import { appendLog, showLogOutput, showConnectionStatus, hideConnectionStatus, resetLogAppendState } from './log-panel.js';
import { loadTokenStats } from './token-stats.js';

const MAX_RECONNECT_ATTEMPTS = 5;

export function runStage(pluginId, stageId, stages, {
  onStatusChange, onRenderPipeline, onRenderButtons, onDone
}) {
  const logEl = document.getElementById('stageLogOutput');
  logEl.innerHTML = '';
  resetLogAppendState();
  showLogOutput();

  const stageIdx = stages.findIndex(s => s.id === stageId);
  if (stageIdx !== -1) {
    stages[stageIdx].status = 'running';
    onRenderPipeline();
    onRenderButtons(stages[stageIdx]);
  }

  let reconnectAttempts = 0;
  let taskFinished = false;
  let currentES = null;

  function handleExit(data) {
    taskFinished = true;
    const newStatus = data.status === 'success' ? 'success' : 'failed';
    if (stageIdx !== -1) {
      stages[stageIdx].status = newStatus;
      stages[stageIdx].hasLog = true;
      if (newStatus === 'success') stages[stageIdx].hasOutput = true;
    }

    if (data.tokenSnapshot) {
      const snap = data.tokenSnapshot;
      const fmt = n => Number(n || 0).toLocaleString();
      appendLog(`\n📊 Token 统计: 本阶段交互 ${fmt(snap.delta.interactions)} 次, 消耗 ${fmt(snap.delta.total_tokens)} tokens (累计 ${fmt(snap.cumulative.total_tokens)} tokens)`, 'cmd');
    }

    if (data.errorType) {
      appendLog(`错误类型: ${data.errorType}`, 'cmd');
    }

    hideConnectionStatus();
    loadTokenStats(pluginId);
    onRenderPipeline();
    onRenderButtons(stages[stageIdx]);
    if (currentES) currentES.close();
    onDone(true);
  }

  function connectRun() {
    const eventSource = new EventSource(withProfile(`${API_URL}/plugins/${pluginId}/stages/${stageId}/run`));
    currentES = eventSource;

    eventSource.onmessage = function(event) {
      let data;
      try { data = JSON.parse(event.data); } catch { return; }

      reconnectAttempts = 0;

      if (data.type === 'cmd') {
        appendLog(data.data, 'cmd');
      } else if (data.type === 'stdout') {
        appendLog(data.data, undefined, { append: data.append === true });
      } else if (data.type === 'stderr') {
        appendLog(data.data, 'error');
      } else if (data.type === 'exit') {
        handleExit(data);
      } else if (data.type === 'gate_failed') {
        taskFinished = true;
        const gateMsg = `⚠️ 质量门禁未通过:\n${(data.errors || []).map(e => '  - ' + e).join('\n')}\n\n请根据上述原因处理（含前置产物与 agent gate_script 检查结果），再重试本阶段。`;
        appendLog(gateMsg, 'error');
        if (stageIdx !== -1) stages[stageIdx].status = 'idle';
        hideConnectionStatus();
        onRenderPipeline();
        onRenderButtons(stages[stageIdx]);
        eventSource.close();
        onDone(false, { gateFailed: true });
      } else if (data.type === 'error') {
        taskFinished = true;
        appendLog(data.error, 'error');
        if (stageIdx !== -1) {
          stages[stageIdx].status = 'failed';
          stages[stageIdx].hasLog = true;
        }
        hideConnectionStatus();
        onRenderPipeline();
        onRenderButtons(stages[stageIdx]);
        eventSource.close();
        onDone(false);
      }
    };

    eventSource.onerror = function() {
      eventSource.close();
      if (taskFinished) return;
      attemptReconnect();
    };
  }

  async function attemptReconnect() {
    if (taskFinished) return;

    reconnectAttempts++;
    if (reconnectAttempts > MAX_RECONNECT_ATTEMPTS) {
      showConnectionStatus('reconnect-failed');
      appendLog('\n[连接中断] 多次重连失败。任务可能仍在后台运行，请刷新页面查看最新状态。', 'error');
      onDone(false);
      return;
    }

    showConnectionStatus('reconnecting');
    appendLog(`\n[连接断开] 正在确认任务状态 (第 ${reconnectAttempts} 次)...`, 'cmd');

    const delay = Math.min(3000 * Math.pow(1.5, reconnectAttempts - 1), 15000);
    await new Promise(resolve => setTimeout(resolve, delay));

    if (taskFinished) return;

    try {
      const resp = await fetch(withProfile(`${API_URL}/plugins/${pluginId}/stages/${stageId}/status`));
      const status = await resp.json();

      if (status.processAlive) {
        showConnectionStatus('reconnected');
        appendLog('[重连成功] 任务仍在运行，已切换到日志追踪模式', 'cmd');
        connectLogStream();
      } else {
        hideConnectionStatus();
        if (status.status === 'success') {
          handleExit({ status: 'success' });
        } else {
          appendLog(`\n[任务已结束] 状态: ${status.status}`, 'cmd');
          if (stageIdx !== -1) {
            stages[stageIdx].status = status.status === 'success' ? 'success' : 'failed';
            stages[stageIdx].hasLog = true;
          }
          onRenderPipeline();
          onRenderButtons(stages[stageIdx]);
          onDone(false);
        }
      }
    } catch {
      attemptReconnect();
    }
  }

  function connectLogStream() {
    const logES = new EventSource(withProfile(`${API_URL}/plugins/${pluginId}/stages/${stageId}/log-stream`));
    currentES = logES;

    logES.onmessage = function(event) {
      let data;
      try { data = JSON.parse(event.data); } catch { return; }

      if (data.type === 'stdout') {
        appendLog(data.data, undefined, { append: data.append === true });
      } else if (data.type === 'exit') {
        taskFinished = true;
        hideConnectionStatus();
        logES.close();
        if (stageIdx !== -1) {
          stages[stageIdx].status = data.status === 'success' ? 'success' : (data.status || 'failed');
          stages[stageIdx].hasLog = true;
        }
        loadTokenStats(pluginId);
        onRenderPipeline();
        onRenderButtons(stages[stageIdx]);
        onDone(true);
      }
    };

    logES.onerror = function() {
      logES.close();
      if (!taskFinished) attemptReconnect();
    };
  }

  connectRun();

  return {
    close() {
      taskFinished = true;
      if (currentES) currentES.close();
    }
  };
}

export async function killStage(pluginId, stageId, stages, { onRenderPipeline, onRenderButtons }) {
  try {
    await fetch(withProfile(`${API_URL}/plugins/${pluginId}/stages/${stageId}/kill`), { method: 'POST' });
    appendLog('\n[已手动终止]', 'error');
    const stageIdx = stages.findIndex(s => s.id === stageId);
    if (stageIdx !== -1) {
      stages[stageIdx].status = 'failed';
      stages[stageIdx].hasLog = true;
    }
    hideConnectionStatus();
    onRenderPipeline();
    onRenderButtons(stages[stageIdx]);
  } catch (error) {
    showError('终止失败: ' + error.message);
  }
}

export async function viewStageOutput(pluginId, stageId, stages) {
  try {
    const response = await fetch(withProfile(`${API_URL}/plugins/${pluginId}/stages/${stageId}/output`));
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error);
    }

    const contentType = response.headers.get('content-type');
    let text;
    if (contentType && contentType.includes('application/json')) {
      text = JSON.stringify(await response.json(), null, 2);
    } else {
      text = await response.text();
    }

    const stage = stages.find(s => s.id === stageId);
    document.getElementById('outputModalTitle').textContent = `${stage ? stage.name : stageId} — 产物`;
    document.getElementById('outputModalContent').textContent = text;

    const modal = document.getElementById('outputModal');
    modal.style.display = 'block';
    requestAnimationFrame(() => modal.classList.add('visible'));
  } catch (error) {
    showError('获取产物失败: ' + error.message);
  }
}

export function closeOutputModal() {
  const modal = document.getElementById('outputModal');
  modal.classList.remove('visible');
  setTimeout(() => { modal.style.display = 'none'; }, 200);
}
