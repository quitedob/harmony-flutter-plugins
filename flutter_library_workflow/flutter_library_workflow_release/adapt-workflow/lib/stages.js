const fs = require('fs');
const path = require('path');
const { getActiveProfile } = require('./profile');
const { runAgentGateScriptIfConfigured } = require('./agent/agent-gate-script');

const STAGE_SKIP_IDS = ['test-design', 'demo-gen', 'blackbox-verify', 'quality-review', 'quality-fix', 'rn-quality-review', 'rn-quality-fix', 'sdk-test-design', 'sdk-case-confrontation', 'sdk-demo-gen', 'sdk-blackbox-verify', 'sdk-quality-review', 'sdk-quality-fix'];

function getStages() {
  return getActiveProfile().STAGES;
}

/**
 * Get filtered stages based on enabledStages settings.
 * @param {object} settings - From readSettings()
 * @returns {Array} Filtered stages with edges also filtered
 */
function getFilteredStages(settings) {
  const profile = getActiveProfile();
  const allStages = getStages();
  const enabledStages = settings?.enabledStages || {};
  const activeProfile = getActiveProfile();
  const isFastProfile = activeProfile?.id === 'rn-ohos-fast';

  const framework = profile?.framework || '';
  const isFlutter = framework === 'flutter';
  const isRN = framework === 'react-native';
  const isSDK = framework === 'android-sdk';

  const skipIds = [];
  if (isFastProfile) {
    // 高效流程版：测试阶段默认关闭，需显式开启 fast 专用开关才执行
    if (!enabledStages.rnFastTestDesign) skipIds.push('test-design');
    if (!enabledStages.rnFastDemoGen) skipIds.push('demo-gen');
    if (!enabledStages.rnFastBlackboxVerify) skipIds.push('blackbox-verify');
    if (!enabledStages.rnFastTestReport) skipIds.push('test-report');
    // RN-ohos 质量审查阶段（可选第四步）
    if (!enabledStages.rnQualityReview) skipIds.push('rn-quality-review');
    // RN-ohos 质量修复阶段（可选第五步）
    if (!enabledStages.rnQualityFix) skipIds.push('rn-quality-fix');
  } else if (isFlutter) {
    if (!enabledStages.testDesign) skipIds.push('test-design');
    if (!enabledStages.demoGen) skipIds.push('demo-gen');
    if (!enabledStages.blackboxVerify) skipIds.push('blackbox-verify');
    // Flutter-ohos 质量审查阶段（可选第四步）
    if (!enabledStages.qualityReview) skipIds.push('quality-review');
    // Flutter-ohos 质量修复阶段（可选第五步）
    if (!enabledStages.qualityFix) skipIds.push('quality-fix');
  } else if (isRN) {
    if (!enabledStages.rnTestDesign) skipIds.push('test-design');
    if (!enabledStages.rnDemoGen) skipIds.push('demo-gen');
    if (!enabledStages.rnBlackboxVerify) skipIds.push('blackbox-verify');
    if (!enabledStages.rnTestReport) skipIds.push('test-report');
    // RN-ohos 质量审查阶段（可选第四步）
    if (!enabledStages.rnQualityReview) skipIds.push('rn-quality-review');
    // RN-ohos 质量修复阶段（可选第五步）
    if (!enabledStages.rnQualityFix) skipIds.push('rn-quality-fix');
  } else if (isSDK) {
    if (!enabledStages.sdkTestDesign) skipIds.push('sdk-test-design');
    if (!enabledStages.sdkCaseConfrontation) skipIds.push('sdk-case-confrontation');
    if (!enabledStages.sdkDemoGen) skipIds.push('sdk-demo-gen');
    if (!enabledStages.sdkBlackboxVerify) skipIds.push('sdk-blackbox-verify');
    if (!enabledStages.sdkQualityReview) skipIds.push('sdk-quality-review');
    // SDK-ohos 质量修复阶段（可选第五步）
    if (!enabledStages.sdkQualityFix) skipIds.push('sdk-quality-fix');
  }

  if (skipIds.length === 0) return allStages;

  // Build rerouting map: skipped stage → first non-skipped downstream target
  // 当被跳过的阶段有下游后继时，指向它的边会被重定向到该后继
  // 注意：'END' 是终止节点而非可执行 stage，不能作为 reroute 目标，
  // 否则被跳过 stage 的第一条 END 边会让前驱直接结束、跳过真正的下游（如 demo-gen）。
  const rerouteMap = {};
  for (const sid of skipIds) {
    const stage = allStages.find(s => s.id === sid);
    if (!stage || !stage.edges) continue;
    for (const edge of stage.edges) {
      if (edge.to === 'error-handler') continue;
      if (edge.to === 'END') continue;
      if (!skipIds.includes(edge.to)) {
        rerouteMap[sid] = edge.to;
        break;
      }
    }
  }

  return allStages
    .filter(s => !skipIds.includes(s.id))
    .map(s => ({
      ...s,
      edges: (s.edges || [])
        .filter(e => e.to !== 'error-handler')
        .map(e => {
          if (skipIds.includes(e.to) && rerouteMap[e.to]) {
            return { ...e, to: rerouteMap[e.to] };
          }
          return e;
        })
        .filter(e => !skipIds.includes(e.to))
    }));
}

// ─── 上游阶段状态检查（供 graph-executor 使用） ───

/**
 * 给定文件名，找到产出该文件的阶段。
 * @param {string} fileName
 * @returns {string|null} 阶段 id
 */
function findStageProducingFile(fileName) {
  const stages = getStages();
  for (const s of stages) {
    if (s.outputFile === fileName) return s.id;
    if (s.additionalReports && s.additionalReports.some(r => r.file === fileName)) return s.id;
  }
  return null;
}

/**
 * 读取阶段最新日志，判断其终态。
 * @param {string} logsDir - 适配日志目录
 * @param {string} stageId - 阶段 id
 * @returns {'success'|'failed'|'not_run'}
 */
function getStageLogStatus(logsDir, stageId) {
  if (!logsDir || !fs.existsSync(logsDir)) return 'not_run';
  try {
    const logs = fs.readdirSync(logsDir)
      .filter(f => f.startsWith(stageId) && f.endsWith('.log'))
      .sort()
      .reverse();
    if (logs.length === 0) return 'not_run';
    const content = fs.readFileSync(path.join(logsDir, logs[0]), 'utf8');
    if (content.includes('状态: 成功') || content.includes('exit code: 0')) return 'success';
    if (content.includes('状态: 失败') || content.includes('退出码:') && !content.includes('退出码: 0')) return 'failed';
    return 'not_run';
  } catch {
    return 'not_run';
  }
}

/**
 * 在并行分支场景下，检查某阶段是否可以执行。
 * 遍历其 gate.requiredFiles，对每个缺失文件检查产出该文件的上游阶段状态：
 * - 文件存在 → OK
 * - 文件缺失 + 上游已成功（日志确认）→ 交给后续 gate 报缺失（真正的门禁失败）
 * - 文件缺失 + 上游已失败 → 不能执行
 * - 文件缺失 + 上游尚未运行 → 不能执行（等待，不是失败）
 *
 * @param {string} adaptDir - 适配产物目录
 * @param {string} stageId - 待执行的阶段
 * @returns {{ canRun: boolean, reason: string|null }}
 *   canRun=true  → 可以执行，继续跑 gate
 *   canRun=false, reason 非 null → 跳过执行
 */
function checkPrerequisiteStages(adaptDir, stageId) {
  const stage = getStageById(stageId);
  if (!stage || !stage.gate || !stage.gate.requiredFiles) {
    return { canRun: true, reason: null };
  }

  const logsDir = path.join(adaptDir, 'logs');

  for (const reqFile of stage.gate.requiredFiles) {
    const fp = path.join(adaptDir, reqFile);
    if (fs.existsSync(fp)) continue; // 产物存在，OK

    const producerId = findStageProducingFile(reqFile);
    if (!producerId) continue; // 找不到产出阶段，交给后续 gate 处理

    // 查日志确认上游阶段的终态
    const logStatus = getStageLogStatus(logsDir, producerId);
    if (logStatus === 'failed') {
      return { canRun: false, reason: `依赖阶段 ${producerId} 已失败（缺少 ${reqFile}）` };
    }
    if (logStatus === 'not_run') {
      // 上游尚未完成，等待其他分支触发
      return { canRun: false, reason: null };
    }
    // logStatus === 'success' 但文件缺失 → 异常情况，交给 gate 报"前置产物缺失"
  }

  return { canRun: true, reason: null };
}

// ─── 质量门禁 ───

/**
 * Check quality gate for a stage before execution.
 * @param {string} adaptDir - absolute path to adaptation directory
 * @param {string} stageId - stage id to check
 * @param {string} [repoPath] - plugin repo root (for optional agent gate_script in opencode.json)
 * @param {{ onOutput?: (chunk: { stream: 'stdout'|'stderr', data: string }) => void }} [options]
 * @returns {Promise<{ pass: boolean, errors: string[] }>}
 */
async function checkQualityGate(adaptDir, stageId, repoPath, options = {}) {
  const stage = getStageById(stageId);
  if (!stage) {
    return { pass: false, errors: [`未知阶段: ${stageId}`] };
  }

  const errors = [];

  if (stage.gate && stage.gate.requiredFiles) {
    for (const reqFile of stage.gate.requiredFiles) {
      const fp = path.join(adaptDir, reqFile);
      if (!fs.existsSync(fp)) {
        errors.push(`前置产物缺失: ${reqFile}`);
      }
    }
  }

  if (stage.gate && stage.gate.fieldChecks && errors.length === 0) {
    for (const check of stage.gate.fieldChecks) {
      const fp = path.join(adaptDir, check.file);
      try {
        const data = JSON.parse(fs.readFileSync(fp, 'utf8'));
        const fields = check.field.split('.');
        let value = data;
        for (const f of fields) {
          value = value?.[f];
        }
        const ok = Array.isArray(check.expectedOneOf)
          ? check.expectedOneOf.includes(value)
          : value === check.expected;
        if (!ok) {
          const hint =
            value !== undefined && value !== null ? `（当前: ${String(value)}）` : '';
          errors.push(
            (check.errorMsg ||
              `${check.file} 的 ${check.field} = "${value}"，期望 "${check.expected}"`) + hint
          );
        }
      } catch (e) {
        errors.push(`无法读取 ${check.file}: ${e.message}`);
      }
    }
  }

  if (errors.length === 0 && stage.agent && repoPath) {
    const scriptGate = await runAgentGateScriptIfConfigured(repoPath, stage.agent, options);
    if (!scriptGate.pass) {
      errors.push(...scriptGate.errors);
    }
  }

  return { pass: errors.length === 0, errors };
}

function getStageById(id) {
  return getStages().find(s => s.id === id);
}

/**
 * Determine which backend to use for a given stage.
 * Stage-specific override takes precedence over the global default.
 * @param {string} stageId
 * @param {object} settings - From readSettings()
 * @returns {string} 'opencode' | 'claude-code'
 */
function resolveBackend(stageId, settings) {
  const stage = getStageById(stageId);
  if (stage?.script) return 'script';
  return settings.stageBackends?.[stageId] || settings.agentBackend || 'opencode';
}

module.exports = {
  getStages,
  getFilteredStages,
  getStageById,
  checkQualityGate,
  resolveBackend,
  findStageProducingFile,
  getStageLogStatus,
  checkPrerequisiteStages,
  STAGE_SKIP_IDS
};
