'use strict';

const fs = require('fs');
const path = require('path');
const { getStages, getFilteredStages, getStageById, checkPrerequisiteStages } = require('../stages');
const { executeStageWithRetry, ErrorType } = require('./executor');
const { getActiveProfile } = require('../profile');
const { getAdaptationDir, getMissingAdditionalReportFiles, isAndroidSdkStageOutputStale } = require('./helpers');

/**
 * 从磁盘加载「断开的边」配置（与前端 /api/plugins/:id/edge-disable 写入同一文件）。
 * @param {string} repoPath
 * @returns {Set<string>} key 格式 from\u001fto
 */
function loadDisabledEdgesFromDisk(repoPath) {
  const edgeDisablePath = path.join(getAdaptationDir(repoPath), 'edge-disable.json');
  try {
    if (fs.existsSync(edgeDisablePath)) {
      const data = JSON.parse(fs.readFileSync(edgeDisablePath, 'utf8'));
      return new Set(data.disabledEdges || []);
    }
  } catch (error) {
    console.error('[graph-executor] Error loading edge-disable.json:', error);
  }
  return new Set();
}

/**
 * 从起点沿未断开边 BFS，得到仍可达的真实阶段 id（不含 error-handler / END）。
 * 用于线性「全部执行」、批量队列、单次阶段执行前的校验，与图式执行器跳过断边行为一致。
 * @param {string} repoPath
 * @param {object} settings - From readSettings()
 * @returns {Set<string>}
 */
function getReachableStageIds(repoPath, settings) {
  const disabled = loadDisabledEdgesFromDisk(repoPath);
  const stages = getFilteredStages(settings);
  const executor = new GraphExecutor();
  executor.buildGraphWithSettings(settings);
  const graph = executor.graph;
  const rootId = stages[0]?.id;
  if (!rootId) return new Set();
  const reachable = new Set();
  const queue = [rootId];
  while (queue.length) {
    const id = queue.shift();
    if (reachable.has(id)) continue;
    reachable.add(id);
    const edges = graph.edges[id] || [];
    for (const edge of edges) {
      const to = edge.to;
      if (to === 'error-handler' || to === 'END') continue;
      const key = `${id}\u001f${to}`;
      if (disabled.has(key)) continue;
      if (!reachable.has(to)) queue.push(to);
    }
  }
  return reachable;
}

class GraphExecutor {
  constructor() {
    this.graph = this.buildGraph();
  }

  // 构建图结构（从 STAGES 中读取 edges 定义）
  buildGraph() {
    return this.buildGraphWithSettings(null);
  }

  // 构建图结构（基于 settings 过滤阶段）
  buildGraphWithSettings(settings) {
    const stages = settings ? getFilteredStages(settings) : getStages();
    const graph = {
      nodes: {},
      edges: {}
    };

    // 添加节点和边（直接从 STAGES 中读取）
    stages.forEach(stage => {
      graph.nodes[stage.id] = {
        id: stage.id,
        name: stage.name,
        stage: stage,
        dependencies: stage.gate?.requiredFiles || []
      };

      // 如果 STAGES 中定义了 edges，直接使用
      if (stage.edges && Array.isArray(stage.edges)) {
        graph.edges[stage.id] = [...stage.edges];
      } else {
        // 如果没有定义，自动生成默认边
        graph.edges[stage.id] = [];
      }
    });

    // 添加特殊节点
    graph.nodes['error-handler'] = {
      id: 'error-handler',
      name: '错误处理',
      dependencies: []
    };

    // 为没有定义边的节点添加默认边
    stages.forEach(stage => {
      if (!stage.edges || stage.edges.length === 0) {
        graph.edges[stage.id] = [
          { to: 'error-handler', condition: (state, result) => !result.success, label: 'error' }
        ];
      }
    });

    this.graph = graph;
    return graph;
  }

  // 执行图
  async execute(id, plugin, repoPath, settings) {
    const retryOpts = settings.stageRetry;
    const disabledEdges = loadDisabledEdgesFromDisk(repoPath);
    
    // 使用 settings 过滤阶段，重新构建 graph
    this.buildGraphWithSettings(settings);
    
    const state = {
      id,
      plugin,
      repoPath,
      settings,
      retryOpts,
      disabledEdges,
      completedStages: [],
      currentStageId: null,
      startTime: Date.now(),
      aborted: false
    };

    // 检测每个阶段的状态
    const currentStages = getFilteredStages(settings);
    const stageStatuses = await Promise.all(
      currentStages.map(async s => ({
        stage: s,
        status: await this.detectStageStatus(repoPath, s.id)
      }))
    );

    // 预填充已成功阶段，避免 run-all 时重复执行
    state.completedStages = stageStatuses
      .filter(s => s.status === 'success')
      .map(s => ({
        id: s.stage.id,
        success: true,
        attempts: 0,
        errorType: null,
        error: null
      }));

    // 找到所有需要运行的阶段
    const stagesToRun = stageStatuses.filter(s => s.status !== 'success').map(s => s.stage);
    if (stagesToRun.length === 0) {
      return {
        success: true,
        message: '所有阶段已完成',
        completedStages: state.completedStages
      };
    }

    // 始终从图起点开始遍历，这样 analysis 完成后也能触发并行分支（planning + test-design）
    const rootStageId = currentStages[0]?.id;
    if (!rootStageId) {
      return {
        success: false,
        message: '未配置任何阶段',
        completedStages: state.completedStages
      };
    }
    await this.runNode(rootStageId, state);

    return {
      success: state.completedStages.every(s => s.success),
      completedStages: state.completedStages
    };
  }

  // 运行单个节点
  async runNode(nodeId, state) {
    if (state.aborted) return;

    // 检查节点是否存在
    const node = this.graph.nodes[nodeId];
    if (!node) {
      console.error(`[graph-executor] Node ${nodeId} not found`);
      return;
    }

    // 跳过已完成的阶段
    const isCompleted = state.completedStages.some(s => s.id === nodeId);
    if (isCompleted) {
      await this.runNextNodes(nodeId, state, { success: true });
      return;
    }

    // 特殊节点处理
    if (nodeId === 'error-handler') {
      await this.handleError(state);
      return;
    }

    if (nodeId === 'retry-node') {
      await this.handleRetry(state);
      return;
    }

    // 检查前置依赖阶段状态（并行分支场景：另一上游可能尚未完成）
    const adaptDir = this.getAdaptDir(state.repoPath);
    const prereq = checkPrerequisiteStages(adaptDir, nodeId);
    if (!prereq.canRun) {
      if (prereq.reason) {
        // 上游已失败 → 标记本阶段为 upstream_failed，继续传播信号给更下游
        console.log(`[graph-executor] Skipping ${node.id}: ${prereq.reason}`);
        state.completedStages.push({
          id: nodeId,
          success: false,
          attempts: 0,
          errorType: 'upstream_failed',
          error: prereq.reason
        });
        await this.runNextNodes(nodeId, state, { success: false, error: prereq.reason, errorType: 'upstream_failed' });
      }
      // reason 为 null → 上游尚未运行，等待其他分支完成后再次触发
      return;
    }

    // 执行正常阶段
    state.currentStageId = nodeId;
    console.log(`[graph-executor] Running stage: ${node.id} (${node.name})`);

    try {
      // 质量门禁在 executeStageInternal 内执行（避免与 graph 路径重复跑 gate_script）
      const result = await executeStageWithRetry(
        state.id,
        state.plugin,
        nodeId,
        state.retryOpts
      );

      // 记录结果
      state.completedStages.push({
        id: nodeId,
        success: result.success,
        attempts: result.attempts || 1,
        errorType: result.errorType || null,
        error: result.error || null
      });

      // 运行下一个节点
      await this.runNextNodes(nodeId, state, result);
    } catch (err) {
      console.error(`[graph-executor] Error running stage ${nodeId}: ${err.message}`);
      
      // 记录错误
      state.completedStages.push({
        id: nodeId,
        success: false,
        errorType: err.errorType || 'unexpected',
        error: err.message
      });

      // 运行错误处理
      await this.runNextNodes(nodeId, state, { success: false, error: err.message, errorType: err.errorType || 'unexpected' });
    }
  }

  // 运行下一个节点
  async runNextNodes(fromNodeId, state, result) {
    const edges = this.graph.edges[fromNodeId] || [];
    const satisfiedEdges = [];
    
    // 收集所有满足条件且未被禁用的边
    for (const edge of edges) {
      if (edge.condition(state, result)) {
        // 检查边是否被禁用
        const edgeKey = `${fromNodeId}\u001f${edge.to}`;
        if (!state.disabledEdges.has(edgeKey)) {
          satisfiedEdges.push(edge);
        } else {
          console.log(`[graph-executor] Skipping disabled edge: ${fromNodeId} -> ${edge.to}`);
        }
      }
    }
    
    if (satisfiedEdges.length === 0) {
      console.log(`[graph-executor] No edges satisfied from ${fromNodeId}`);
      return;
    }
    
    if (satisfiedEdges.length === 1) {
      // 只有一个满足条件的边，串行执行
      const edge = satisfiedEdges[0];
      let nextNodeId = edge.to;
      if (typeof nextNodeId === 'function') {
        nextNodeId = nextNodeId(state);
      }
      console.log(`[graph-executor] Taking edge: ${fromNodeId} -> ${nextNodeId} (${edge.label})`);
      await this.runNode(nextNodeId, state);
    } else {
      // 多个满足条件的边，并行执行（类似 langgraph 的并行分支）
      console.log(`[graph-executor] Taking ${satisfiedEdges.length} edges in parallel from ${fromNodeId}`);
      const parallelPromises = satisfiedEdges.map(async (edge) => {
        let nextNodeId = edge.to;
        if (typeof nextNodeId === 'function') {
          nextNodeId = nextNodeId(state);
        }
        console.log(`[graph-executor] Parallel edge: ${fromNodeId} -> ${nextNodeId} (${edge.label})`);
        // 创建独立的 state 副本用于并行执行
        const parallelState = {
          ...state,
          completedStages: [...state.completedStages],
          currentStageId: null
        };
        await this.runNode(nextNodeId, parallelState);
        // 合并结果
        state.completedStages = this.mergeCompletedStages(state.completedStages, parallelState.completedStages);
      });
      await Promise.all(parallelPromises);
    }
  }

  mergeCompletedStages(base, incoming) {
    const merged = new Map();
    for (const item of [...base, ...incoming]) {
      const prev = merged.get(item.id);
      if (!prev) {
        merged.set(item.id, item);
        continue;
      }
      // 优先保留真实执行记录（attempts > 0）和失败记录（便于定位）
      const prevScore = (prev.success ? 0 : 2) + ((prev.attempts || 0) > 0 ? 1 : 0);
      const nextScore = (item.success ? 0 : 2) + ((item.attempts || 0) > 0 ? 1 : 0);
      if (nextScore >= prevScore) {
        merged.set(item.id, item);
      }
    }
    return Array.from(merged.values());
  }

  // 处理错误
  async handleError(state) {
    console.log('[graph-executor] Handling error');
    // 根据错误类型决定是重试还是结束
    const lastError = state.completedStages[state.completedStages.length - 1];
    if (lastError?.errorType === ErrorType.MANUAL_STOP) {
      state.aborted = true;
      console.log('[graph-executor] Stage was manually stopped, aborting graph execution');
      return;
    }
    if (lastError && lastError.errorType !== 'fatal') {
      // 非致命错误，尝试重试
      console.log('[graph-executor] Attempting retry for non-fatal error');
      // 直接重试当前失败的节点
      if (state.currentStageId) {
        await this.runNode(state.currentStageId, state);
      }
    } else {
      // 致命错误，结束执行
      console.log('[graph-executor] Fatal error, ending execution');
    }
  }

  // 处理重试
  async handleRetry(state) {
    console.log('[graph-executor] Handling retry');
    // 重试当前失败的节点
    if (state.currentStageId) {
      console.log(`[graph-executor] Retrying stage: ${state.currentStageId}`);
      await this.runNode(state.currentStageId, state);
    }
  }

  // 检测阶段状态
  async detectStageStatus(repoPath, stageId) {
    const adaptDir = this.getAdaptDir(repoPath);
    const stage = getStageById(stageId);
    if (!stage) return 'unknown';

    const outputFile = path.join(adaptDir, stage.outputFile);
    if (fs.existsSync(outputFile)) {
      if (isAndroidSdkStageOutputStale(adaptDir, stageId)) {
        return 'pending';
      }
      const missing = getMissingAdditionalReportFiles(stage, adaptDir);
      if (missing.length > 0) return 'pending';
      if (path.extname(stage.outputFile || '').toLowerCase() !== '.json') {
        return 'success';
      }
      try {
        const data = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
        // 检查 coding-library 的 build_status 字段（编译失败时状态应为 failed）
        if (stageId === 'coding-library' && Object.prototype.hasOwnProperty.call(data, 'build_status')) {
          if (data.build_status === 'fail') return 'failed';
        }
        if (Object.prototype.hasOwnProperty.call(data, 'success')) {
          return data.success ? 'success' : 'failed';
        }
        return 'success';
      } catch (e) {
        return 'failed';
      }
    }
    return 'pending';
  }

  // 获取适配目录
  getAdaptDir(repoPath) {
    return path.join(repoPath, require('../profile').getActiveProfile().ADAPTATION_DIR);
  }
}

module.exports = { GraphExecutor, getReachableStageIds, loadDisabledEdgesFromDisk };
