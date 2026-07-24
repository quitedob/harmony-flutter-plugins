import { formatDuration } from '../utils.js';
import { STAGE_SHORT_NAMES, GRAPH_EDGES } from '../profile-store.js';
import { API_URL, withProfile } from '../constants.js';

const EDGE_HIT_STROKE = 14;

/** @type {Map<string, Set<string>>} projectId -> disabled edge ids */
let _disabledEdgeIdsByProject = new Map();

let _currentProjectId = null;

let _pipelineState = {
    stages: null,
    selectedStageId: null,
    backendConfig: null,
    onStageClick: null,
};

let _lastPipelineHtml = '';

function getDisabledEdgeIds() {
    if (!_currentProjectId) return new Set();
    if (!_disabledEdgeIdsByProject.has(_currentProjectId)) {
        _disabledEdgeIdsByProject.set(_currentProjectId, new Set());
    }
    return _disabledEdgeIdsByProject.get(_currentProjectId);
}

function setDisabledEdgeIds(projectId, edgeIds) {
    _disabledEdgeIdsByProject.set(projectId, new Set(edgeIds));
}

async function loadDisabledEdges(projectId) {
    try {
        const response = await fetch(withProfile(`${API_URL}/plugins/${projectId}/edge-disable`));
        if (response.ok) {
            const data = await response.json();
            setDisabledEdgeIds(projectId, data.disabledEdges || []);
            console.log('Disabled edges loaded successfully:', data.disabledEdges || []);
        } else {
            console.error('Failed to load disabled edges:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Failed to load disabled edges:', error);
    }
}

async function saveDisabledEdges(projectId) {
    try {
        const disabledEdges = Array.from(getDisabledEdgeIds());
        const response = await fetch(withProfile(`${API_URL}/plugins/${projectId}/edge-disable`), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ disabledEdges })
        });
        
        if (!response.ok) {
            const error = await response.json();
            console.error('Failed to save disabled edges:', error.error || 'Unknown error');
        } else {
            console.log('Disabled edges saved successfully:', disabledEdges);
        }
    } catch (error) {
        console.error('Failed to save disabled edges:', error);
    }
}

function edgeKey(from, to) {
    return `${from}\u001f${to}`;
}

function encodeEdgeDataId(from, to) {
    return encodeURIComponent(edgeKey(from, to));
}

function cubicBezierPoint(t, x1, y1, c1x, cy1, c2x, cy2, x2, y2) {
    const u = 1 - t;
    const uu = u * u;
    const tt = t * t;
    const x = uu * u * x1 + 3 * uu * t * c1x + 3 * u * tt * c2x + tt * t * x2;
    const y = uu * u * y1 + 3 * uu * t * cy1 + 3 * u * tt * cy2 + tt * t * y2;
    return { x, y };
}

function xmarkSvg(mx, my) {
    return `<g class="dag-edge-xmark" transform="translate(${mx},${my})" pointer-events="none">
    <text class="dag-edge-xmark-char" x="0" y="0" text-anchor="middle" dominant-baseline="central">×</text>
  </g>`;
}

function pruneDisabledEdges(validEdges) {
    const valid = new Set(validEdges.map(e => edgeKey(e.from, e.to)));
    const disabledEdges = getDisabledEdgeIds();
    for (const k of [...disabledEdges]) {
        if (!valid.has(k)) disabledEdges.delete(k);
    }
    if (_currentProjectId) {
        saveDisabledEdges(_currentProjectId);
    }
}

function ensurePipelineEdgeDelegation() {
    const track = document.getElementById('pipelineTrack');
    if (!track) return;
    
    // 清除现有的事件监听器
    const newTrack = track.cloneNode(true);
    track.parentNode.replaceChild(newTrack, track);
    
    // 重新绑定事件监听器
    newTrack.addEventListener('click', async (ev) => {
        const g = ev.target.closest('.dag-edge-group');
        if (!g || !newTrack.contains(g)) return;
        ev.preventDefault();
        ev.stopPropagation();
        const raw = g.dataset.edgeId;
        if (!raw) return;
        let key;
        try {
            key = decodeURIComponent(raw);
        } catch {
            return;
        }
        const disabledEdges = getDisabledEdgeIds();
        if (disabledEdges.has(key)) {
            disabledEdges.delete(key);
        } else {
            disabledEdges.add(key);
        }
        if (_currentProjectId) {
            await saveDisabledEdges(_currentProjectId);
        }
        _lastPipelineHtml = '';
        if (!_pipelineState.stages) return;
        renderPipeline(
            _pipelineState.stages,
            _pipelineState.selectedStageId,
            _pipelineState.backendConfig,
            _pipelineState.onStageClick,
            _currentProjectId
        );
    });
}

export function getBackendClass(backend) {
    if (backend === 'script') return 'backend-script';
    if (backend === 'claude-code') return 'backend-claude-code';
    if (backend === 'cline') return 'backend-cline';
    return 'backend-opencode';
}

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

// ── DAG layout engine ──

function buildAdjacency(stageIds, edges) {
    const idSet = new Set(stageIds);
    const children = new Map();
    const parents = new Map();
    for (const id of stageIds) {
        children.set(id, []);
        parents.set(id, []);
    }
    for (const e of edges) {
        if (e.to === 'END' || !idSet.has(e.from) || !idSet.has(e.to)) continue;
        children.get(e.from).push(e.to);
        parents.get(e.to).push(e.from);
    }
    return { children, parents };
}

function computeColumns(stageIds, parents, laneMap) {
    const level = new Map();
    const visiting = new Set();

    function dfs(id) {
        if (level.has(id)) return level.get(id);
        if (visiting.has(id)) return 0;
        visiting.add(id);

        const pars = parents.get(id) || [];
        if (pars.length === 0) {
            level.set(id, 0);
            visiting.delete(id);
            return 0;
        }

        const parentCols = pars.map(p => dfs(p));
        const maxParentCol = Math.max(...parentCols);

        // 合流节点默认与最右父节点同列形成竖向连线；跨泳道合流时若节点与某同列父节点
        // 同泳道（会重叠），则右移一列避免圆圈重合。
        const parentLanes = new Set(pars.map(p => laneMap.get(p) ?? 0));
        const isMergeNode = pars.length > 1;
        const isCrossLaneMerge = parentLanes.size > 1;
        let col;
        if (isCrossLaneMerge) {
            const myLane = laneMap.get(id) ?? 0;
            const hasSameLaneParentAtMaxCol = pars.some(p => (laneMap.get(p) ?? 0) === myLane && level.get(p) === maxParentCol);
            col = hasSameLaneParentAtMaxCol ? maxParentCol + 1 : maxParentCol;
        } else if (isMergeNode) {
            col = maxParentCol;
        } else {
            col = maxParentCol + 1;
        }

        level.set(id, col);
        visiting.delete(id);
        return col;
    }

    for (const id of stageIds) dfs(id);
    return level;
}

function assignLanes(stageIds, children, parents) {
    const lane = new Map();
    const roots = stageIds.filter(id => (parents.get(id) || []).length === 0);

    function propagate(id, row) {
        lane.set(id, row);
        const kids = children.get(id) || [];
        for (let i = 0; i < kids.length; i++) {
            // 多分叉时：第一个子节点继承当前 lane，其余子节点各占新 lane
            const kidRow = kids.length === 1 ? row : (i === 0 ? row : i);
            propagate(kids[i], kidRow);
        }
    }

    for (const root of roots) propagate(root, 0);

    for (const id of stageIds) {
        if (!lane.has(id)) lane.set(id, 1);
    }

    return lane;
}

function buildLayout(stages, edges) {
    const stageIds = stages.map(s => s.id);
    const { children, parents } = buildAdjacency(stageIds, edges);
    const laneMap = assignLanes(stageIds, children, parents);
    const colMap = computeColumns(stageIds, parents, laneMap);
    return { colMap, laneMap };
}

// ── Rendering helpers ──

function renderNodeHtml(stage, selectedStageId) {
    const si = statusInfo(stage.status);
    const sel = stage.id === selectedStageId ? ' selected' : '';
    const label = STAGE_SHORT_NAMES[stage.id] || stage.name || stage.id;
    const icon = si.icon || '';

    let metaHtml = '';
    if (stage.status === 'running') {
        metaHtml = `<span class="pipe-spin">●</span> 运行中`;
    } else if (['success', 'failed', 'interrupted', 'unknown'].includes(stage.status)) {
        metaHtml = si.text;
        if (stage.duration) metaHtml += ` <span class="pipe-dur">${formatDuration(stage.duration)}</span>`;
    } else {
        metaHtml = `<span class="text-muted">${si.text}</span>`;
    }

    const showHelpLink = stage.id === 'device-verify';
    
    return { si, sel, label, icon, metaHtml, showHelpLink };
}

function renderLinearFallback(stages, selectedStageId) {
    const html = [];
    stages.forEach((stage, i) => {
        const { si, sel, label, icon, metaHtml, showHelpLink } = renderNodeHtml(stage, selectedStageId);
        
        const helpLinkHtml = showHelpLink 
            ? `<a class="pipe-help-link" data-stage-help="${stage.id}" title="查看测试验证说明">(说明)</a>` 
            : '';
        
        html.push(`<div class="pipe-step ${si.cls}${sel}" data-stage="${stage.id}">
  <div class="pipe-circle">${icon || (i + 1)}</div>
  <div class="pipe-label">${label}${helpLinkHtml}</div>
  <div class="pipe-meta">${metaHtml}</div>
</div>`);
        if (i < stages.length - 1) {
            const lineCls = stage.status === 'success' ? 'done'
                : stage.status === 'running' ? 'active' : '';
            html.push(`<div class="pipe-line ${lineCls}"></div>`);
        }
    });
    return `<div class="pipeline-linear">${html.join('\n')}</div>`;
}

// ── DAG renderer ──

function renderDAG(stages, edges, selectedStageId) {
    const { colMap, laneMap } = buildLayout(stages, edges);
    const stageById = Object.fromEntries(stages.map(s => [s.id, s]));

    const COL_GAP = 170;
    const LANE_GAP = 160;
    const NODE_R = 21;
    const PAD_X = 130;
    const PAD_Y = 50;

    const maxCol = Math.max(0, ...colMap.values());
    const lanes = new Set(laneMap.values());
    const laneList = [...lanes].sort((a, b) => a - b);
    const laneCount = laneList.length;

    const laneYBase = new Map();
    laneList.forEach((lane, i) => {
        laneYBase.set(lane, PAD_Y + i * LANE_GAP);
    });

    const posMap = new Map();
    const rootIds = stages.filter(s => {
        const { parents } = buildAdjacency(stages.map(s2 => s2.id), edges);
        return (parents.get(s.id) || []).length === 0;
    }).map(s => s.id);

    for (const s of stages) {
        const col = colMap.get(s.id) ?? 0;
        const lane = laneMap.get(s.id) ?? 0;
        let y;

        if (rootIds.includes(s.id) && laneCount > 1) {
            const minY = Math.min(...[...laneYBase.values()]);
            const maxY = Math.max(...[...laneYBase.values()]);
            y = (minY + maxY) / 2;
        } else {
            y = laneYBase.get(lane) ?? PAD_Y;
        }

        posMap.set(s.id, {
            x: PAD_X + col * COL_GAP,
            y
        });
    }

    const totalWidth = PAD_X + (maxCol + 1) * COL_GAP + 20;
    const totalHeight = (PAD_Y * 2) + ((laneCount - 1) * LANE_GAP) + (NODE_R * 2) + 8;

    const svgLines = [];
    const validEdges = edges.filter(e => e.to !== 'END' && posMap.has(e.from) && posMap.has(e.to));
    pruneDisabledEdges(validEdges);

    for (const e of validEdges) {
        const from = posMap.get(e.from);
        const to = posMap.get(e.to);
        const fromStage = stageById[e.from];
        // 只有在完整流程运行时，连线上才显示动效
        // 单点运行时，连线上不显示动效，避免用户误解后续节点也会运行
        const cls = fromStage?.status === 'success' ? 'dag-edge-done'
            : 'dag-edge-idle';

        const key = edgeKey(e.from, e.to);
        const disabled = getDisabledEdgeIds().has(key);
        const visCls = disabled ? 'dag-edge-visible dag-edge-broken' : `dag-edge-visible ${cls}`;
        const tip = disabled ? '点击可恢复' : '点击可断开';
        const dataId = encodeEdgeDataId(e.from, e.to);
        const tipAttr = tip.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

        svgLines.push(`<g class="dag-edge-group" data-edge-id="${dataId}" role="button" aria-label="${tipAttr}">`);
        svgLines.push(`<title>${tip}</title>`);

        // 同列：严格竖线，从上圆底部连到下圆顶部
        if (Math.abs(from.x - to.x) < 2) {
            const x = from.x;
            const y1 = Math.min(from.y, to.y) + NODE_R + 1;
            const y2 = Math.max(from.y, to.y) - NODE_R - 1;
            svgLines.push(`<line class="dag-edge-hit" x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="transparent" stroke-width="${EDGE_HIT_STROKE}" fill="none"/>`);
            svgLines.push(`<line class="${visCls}" x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" pointer-events="none"/>`);
            if (disabled) svgLines.push(xmarkSvg(x, (y1 + y2) / 2));
            svgLines.push('</g>');
            continue;
        }

        // 同行：水平直线，从左圆右侧连到右圆左侧
        if (Math.abs(from.y - to.y) < 3) {
            const left = from.x < to.x ? from : to;
            const right = from.x < to.x ? to : from;
            const x1 = left.x + NODE_R + 2;
            const y = left.y;
            const x2 = right.x - NODE_R - 2;
            svgLines.push(`<line class="dag-edge-hit" x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="transparent" stroke-width="${EDGE_HIT_STROKE}" fill="none"/>`);
            svgLines.push(`<line class="${visCls}" x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" pointer-events="none"/>`);
            if (disabled) svgLines.push(xmarkSvg((x1 + x2) / 2, y));
            svgLines.push('</g>');
            continue;
        }

        // 跨列跨行：平滑曲线
        const x1 = from.x + (to.x > from.x ? NODE_R + 2 : -NODE_R - 2);
        const y1 = from.y;
        const x2 = to.x + (to.x > from.x ? -NODE_R - 2 : NODE_R + 2);
        const y2 = to.y;
        const dx = Math.abs(x2 - x1);
        const cx = Math.min(dx * 0.35, 50);
        const c1x = x1 + (to.x > from.x ? cx : -cx);
        const c2x = x2 - (to.x > from.x ? cx : -cx);
        const d = `M${x1},${y1} C${c1x},${y1} ${c2x},${y2} ${x2},${y2}`;
        const mid = cubicBezierPoint(0.5, x1, y1, c1x, y1, c2x, y2, x2, y2);
        svgLines.push(`<path class="dag-edge-hit" d="${d}" stroke="transparent" stroke-width="${EDGE_HIT_STROKE}" fill="none"/>`);
        svgLines.push(`<path class="${visCls}" d="${d}" fill="none" pointer-events="none"/>`);
        if (disabled) svgLines.push(xmarkSvg(mid.x, mid.y));
        svgLines.push('</g>');
    }

    // Nodes
    const nodes = [];
    for (const [id, pos] of posMap) {
        const stage = stageById[id];
        if (!stage) continue;
        const { si, sel, label, icon, metaHtml, showHelpLink } = renderNodeHtml(stage, selectedStageId);
        
        const helpLinkHtml = showHelpLink 
            ? `<a class="pipe-help-link" data-stage-help="${id}" title="查看测试验证说明">(说明)</a>` 
            : '';

        nodes.push(`<div class="dag-node pipe-node ${si.cls}${sel}" data-stage="${id}" style="left:${pos.x - NODE_R}px;top:${pos.y - NODE_R}px;">
  <div class="pipe-circle">${icon}</div>
  <div class="pipe-label">${label}${helpLinkHtml}</div>
  <div class="pipe-meta">${metaHtml}</div>
</div>`);
    }

    return `<div class="dag-container" style="width:${totalWidth}px;height:${totalHeight}px;">
  <svg class="dag-svg" width="${totalWidth}" height="${totalHeight}">
    ${svgLines.join('\n    ')}
  </svg>
  ${nodes.join('\n  ')}
</div>`;
}

// ── Public API ──

export async function renderPipeline(stages, selectedStageId, backendConfig, onStageClick, projectId) {
    _pipelineState = { stages, selectedStageId, backendConfig, onStageClick };
    _currentProjectId = projectId;

    const el = document.getElementById('pipelineTrack');
    if (!el) return;

    // 每次都加载项目特定的禁用边配置，确保页面刷新后能正确显示
    if (projectId) {
        await loadDisabledEdges(projectId);
    }

    const edges = GRAPH_EDGES;
    const hasGraph = edges && edges.length > 0;

    const newHtml = hasGraph
        ? renderDAG(stages, edges, selectedStageId)
        : renderLinearFallback(stages, selectedStageId);

    // 总是重新渲染，确保禁用边状态正确显示
    _lastPipelineHtml = newHtml;
    el.innerHTML = newHtml;

    if (hasGraph) ensurePipelineEdgeDelegation();

    // 重新获取元素，因为 ensurePipelineEdgeDelegation 可能替换了 track 元素
    const updatedEl = document.getElementById('pipelineTrack');
    if (updatedEl) {
        updatedEl.querySelectorAll('.pipe-node, .pipe-step').forEach(nodeEl => {
            nodeEl.addEventListener('click', (e) => {
                if (e.target.closest('.pipe-help-link')) return;
                const sid = nodeEl.dataset.stage;
                const stage = stages.find(s => s.id === sid);
                if (stage && onStageClick) onStageClick(stage);
            });
        });
        
        updatedEl.querySelectorAll('.pipe-help-link').forEach(helpLink => {
            helpLink.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                showDeviceVerifyHelpModal();
            });
        });
    }
}

function showDeviceVerifyHelpModal() {
    const modal = document.getElementById('deviceVerifyHelpModal');
    if (!modal) return;
    
    modal.classList.add('visible');
    modal.style.display = 'block';
    
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('visible');
            modal.style.display = 'none';
        });
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('visible');
            modal.style.display = 'none';
        }
    });
}

window.showDeviceVerifyHelpModal = showDeviceVerifyHelpModal;
