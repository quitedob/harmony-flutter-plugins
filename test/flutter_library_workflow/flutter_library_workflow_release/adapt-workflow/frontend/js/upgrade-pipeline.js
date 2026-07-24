/**
 * Upgrade pipeline renderer.
 *
 * Standalone linear pipeline renderer for the upgrade detail page.
 * Independent from the adaptation profile system (no profile-store.js,
 * no withProfile()), but reuses the same CSS classes as the adapt flow's
 * pipeline.js for visual consistency:
 *   .pipeline-linear, .pipe-step, .pipe-circle, .pipe-label, .pipe-meta,
 *   .pipe-line, .pipe-spin, .pipe-dur, .success, .failed, .running, .idle,
 *   .selected, .done, .active
 */

// ── Status mapping (mirrors pipeline.js statusInfo) ──

function statusInfo(s) {
  switch (s) {
    case 'success':     return { cls: 'success',     icon: '✓', text: '已完成' };
    case 'failed':      return { cls: 'failed',      icon: '✗', text: '失败' };
    case 'running':     return { cls: 'running',     icon: '◉', text: '运行中' };
    case 'interrupted': return { cls: 'interrupted', icon: '⊘', text: '已中断' };
    case 'unknown':     return { cls: 'unknown',     icon: '?', text: '未知' };
    default:            return { cls: 'idle',        icon: null, text: '等待中' };
  }
}

// ── Duration formatter (simple, no dependency) ──

function formatDuration(ms) {
  if (!ms || ms < 0) return '';
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${Math.round(ms / 1000)}s`;
  const m = Math.floor(ms / 60000);
  const s = Math.round((ms % 60000) / 1000);
  return `${m}m${s}s`;
}

// ── Node HTML renderer ──

function renderNodeHtml(stage, selectedStageId, index) {
  const si = statusInfo(stage.status);
  const sel = stage.id === selectedStageId ? ' selected' : '';
  const label = stage.name || stage.id;
  const icon = si.icon || '';

  let metaHtml = '';
  if (stage.status === 'running') {
    metaHtml = `<span class="pipe-spin">●</span> 运行中`;
  } else if (['success', 'failed', 'interrupted', 'unknown'].includes(stage.status)) {
    metaHtml = si.text;
    if (stage.duration) {
      metaHtml += ` <span class="pipe-dur">${formatDuration(stage.duration)}</span>`;
    }
  } else {
    metaHtml = `<span class="text-muted">${si.text}</span>`;
  }

  return {
    html: `<div class="pipe-step ${si.cls}${sel}" data-stage="${stage.id}">
  <div class="pipe-circle">${icon || (index + 1)}</div>
  <div class="pipe-label">${label}</div>
  <div class="pipe-meta">${metaHtml}</div>
</div>`,
    lineHtml: (() => {
      const lineCls = stage.status === 'success' ? 'done'
        : stage.status === 'running' ? 'active' : '';
      return `<div class="pipe-line ${lineCls}"></div>`;
    })()
  };
}

// ── Main renderer ──

/**
 * Render a linear pipeline visualization for upgrade stages.
 *
 * @param {Array} stages          Array of stage objects: { id, name, status, duration? }
 * @param {string|null} selectedStageId  Currently selected stage ID (highlighted)
 * @param {Function} onStageClick  Callback: (stage) => void
 */
export function renderUpgradePipeline(stages, selectedStageId, onStageClick) {
  const track = document.getElementById('pipelineTrack');
  if (!track) return;

  if (!stages || stages.length === 0) {
    track.innerHTML = '<div class="pipeline-empty"><p>暂无阶段</p></div>';
    return;
  }

  // Render linear pipeline
  const html = [];
  stages.forEach((stage, i) => {
    const { html: nodeHtml, lineHtml } = renderNodeHtml(stage, selectedStageId, i);
    html.push(nodeHtml);
    if (i < stages.length - 1) {
      html.push(lineHtml);
    }
  });

  track.innerHTML = `<div class="pipeline-linear">${html.join('\n')}</div>`;

  // Bind click handlers
  track.querySelectorAll('.pipe-step').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => {
      const stageId = el.dataset.stage;
      const stage = stages.find(s => s.id === stageId);
      if (stage && onStageClick) onStageClick(stage);
    });
  });
}

/**
 * Update pipeline rendering in-place (re-render with new data).
 * Convenience wrapper around renderUpgradePipeline.
 */
export function updateUpgradePipeline(stages, selectedStageId, onStageClick) {
  renderUpgradePipeline(stages, selectedStageId, onStageClick);
}
