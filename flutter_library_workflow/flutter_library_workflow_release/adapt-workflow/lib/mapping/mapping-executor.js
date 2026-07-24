'use strict';

const fsSync = require('fs');
const fs = require('fs').promises;
const path = require('path');
const { spawn } = require('child_process');
const { WORKSPACE_ROOT } = require('../config');
const { readSettings, buildProxyEnv, getStageTimeoutMs, resolveUseShell } = require('../settings');
const { getBackend } = require('../backends');
const { createClineStreamParser } = require('../backends/cline');
const { createStreamParser } = require('../backends/claude-code');
const { IS_WIN, formatCommand, killProc } = require('../platform');
const { mappingActiveProcs } = require('../runtime-state');
const { validateMappingResultJson, validateAndFilterMappings } = require('./validation');

const ErrorType = {
  SPAWN_ERROR: 'spawn_error',
  TIMEOUT: 'timeout',
  PROCESS_FAILED: 'process_failed',
  NO_OUTPUT: 'no_output',
  UNKNOWN: 'unknown_error'
};

function ensureDir(dir) {
  if (!fsSync.existsSync(dir)) fsSync.mkdirSync(dir, { recursive: true });
}

function getMappingDir(repoPath) {
  return path.join(repoPath, '.mapping-adaptation');
}

function getLogsDir(repoPath) {
  return path.join(getMappingDir(repoPath), 'logs');
}

function getLogPath(repoPath) {
  return path.join(getLogsDir(repoPath), 'mapping-analysis.log');
}

function getValidationReportPath(repoPath) {
  return path.join(getMappingDir(repoPath), 'validation-report.json');
}

function writeValidationReport(repoPath, report) {
  try {
    const fp = getValidationReportPath(repoPath);
    const out = {
      generatedAt: new Date().toISOString(),
      ...(report || {})
    };
    fsSync.writeFileSync(fp, JSON.stringify(out, null, 2), 'utf8');
  } catch {}
}

async function runMappingAnalysis(repoPath, promptExtra = '', runtime = {}) {
  const settings = await readSettings();
  const backendName = settings.mappingBackend || 'cline';
  const backend = getBackend(backendName);
  const backendOpts =
    backendName === 'cline' ? (settings.cline || {}) : {};

  const stage = {
    id: 'mapping-analysis',
    name: '映射分析',
    agent: 'mapping-analysis',
    // Use a GLOBAL agent root so mapping works across profiles.
    agentRoot: 'agent-mapping',
    prompt: (promptExtra || '').trim(),
    outputFile: 'mapping-analysis.json'
  };

  ensureDir(getMappingDir(repoPath));
  ensureDir(getLogsDir(repoPath));

  async function spawnOnce(extraPrompt) {
    const stage2 = { ...stage, prompt: (extraPrompt || '').trim() };
    const buildResult = backend.buildCommand(stage2, repoPath, WORKSPACE_ROOT, backendOpts);
    const { executable, args, cwd: cmdCwd, env: cmdEnv } = buildResult;
    const proxyEnv = buildProxyEnv(settings);

    const logPath = getLogPath(repoPath);
    const cmdDisplay = formatCommand(executable, args);
    const header = `=== mapping-analysis 执行日志 ===\nrepo: ${repoPath}\n后端: ${backendName}\n时间: ${new Date().toISOString()}\n命令: ${cmdDisplay}\n${'='.repeat(50)}\n\n`;
    fsSync.writeFileSync(logPath, header);

    const useShell = resolveUseShell(settings, backendName, IS_WIN);
    const proc = spawn(executable, args, {
      cwd: cmdCwd,
      env: { ...process.env, ...proxyEnv, NO_COLOR: '1', ...cmdEnv },
      stdio: ['pipe', 'pipe', 'pipe'],
      shell: useShell,
      detached: !IS_WIN
    });
    proc.stdin.end();

    // Register active process so we can cancel/kill it by sourceId.
    const sourceId = runtime.sourceId;
    if (sourceId) {
      mappingActiveProcs.set(sourceId, proc);
      proc.on('close', () => {
        if (mappingActiveProcs.get(sourceId) === proc) mappingActiveProcs.delete(sourceId);
      });
      proc.on('error', () => {
        if (mappingActiveProcs.get(sourceId) === proc) mappingActiveProcs.delete(sourceId);
      });
    }

    const timeoutMs = getStageTimeoutMs('analysis');

    let timedOut = false;
    const watchdog = setTimeout(() => {
      timedOut = true;
      const msg = `[watchdog] mapping-analysis 超时 (${Math.round(timeoutMs / 60000)} 分钟)，正在终止`;
      try { fsSync.appendFileSync(logPath, `\n${msg}\n`); } catch {}
      killProc(proc);
    }, timeoutMs);

    const buildResultStreamJson = !!buildResult.streamJson;
    let flushOnClose = () => {};

    if (buildResultStreamJson) {
      const parse =
        backendName === 'cline' ? createClineStreamParser() : createStreamParser();
      let lineBuffer = '';

      proc.stdout.on('data', (chunk) => {
        lineBuffer += chunk.toString();
        const lines = lineBuffer.split('\n');
        lineBuffer = lines.pop();
        for (const line of lines) {
          const text = parse(line);
          if (text) {
            try { fsSync.appendFileSync(logPath, text); } catch {}
          }
        }
      });

      flushOnClose = () => {
        if (lineBuffer && lineBuffer.trim()) {
          const text = parse(lineBuffer);
          if (text) try { fsSync.appendFileSync(logPath, text); } catch {}
        }
      };
    } else {
      proc.stdout.on('data', (chunk) => {
        const raw = chunk.toString();
        try { fsSync.appendFileSync(logPath, raw); } catch {}
      });
      flushOnClose = () => {};
    }

    proc.stderr.on('data', (chunk) => {
      const raw = chunk.toString();
      try { fsSync.appendFileSync(logPath, raw); } catch {}
    });

    return await new Promise((resolve) => {
      proc.on('close', async (code) => {
        clearTimeout(watchdog);
        try {
          flushOnClose();

          const outputPath = path.join(getMappingDir(repoPath), 'mapping-analysis.json');
          const hasOutput = fsSync.existsSync(outputPath);

          let success = code === 0 && !timedOut;
          let errorType = timedOut ? ErrorType.TIMEOUT : (success ? null : ErrorType.PROCESS_FAILED);
          if (success && !hasOutput) {
            success = false;
            errorType = ErrorType.NO_OUTPUT;
          }

          const footer = `\n${'='.repeat(50)}\n退出码: ${code}\n状态: ${success ? '成功' : '失败'}${timedOut ? ' (超时终止)' : ''}\n错误类型: ${errorType || '无'}\n结束时间: ${new Date().toISOString()}\n`;
          try { fsSync.appendFileSync(logPath, footer); } catch {}

          resolve({ success, code, errorType, hasOutput, logPath, outputPath, cleanup: buildResult.cleanup, proc, sourceId });
        } catch (e) {
          resolve({ success: false, code, errorType: ErrorType.UNKNOWN, error: e.message, logPath, cleanup: buildResult.cleanup, proc, sourceId });
        }
      });

      proc.on('error', (err) => {
        clearTimeout(watchdog);
        try {
          try { fsSync.appendFileSync(logPath, `\n[ERROR] 命令执行失败: ${err.message}\n`); } catch {}
        } finally {
          resolve({ success: false, errorType: ErrorType.SPAWN_ERROR, error: err.message, logPath, cleanup: buildResult.cleanup, proc, sourceId });
        }
      });
    });
  }

  const firstPrompt = stage.prompt;
  const first = await spawnOnce(firstPrompt);

  // Ensure cleanup + active proc deregistration (best effort)
  const safeCleanup = () => {
    try { if (first.sourceId && mappingActiveProcs.get(first.sourceId) === first.proc) mappingActiveProcs.delete(first.sourceId); } catch {}
    try { if (first.cleanup) first.cleanup(); } catch {}
  };

  if (!first.success || !first.hasOutput) {
    writeValidationReport(repoPath, {
      ok: false,
      phase: 'process',
      errorType: first.errorType || 'unknown',
      message: first.error || null
    });
    safeCleanup();
    return first;
  }

  // ── Anti-hallucination validation ──
  try {
    const raw = fsSync.readFileSync(first.outputPath, 'utf8');
    const json = JSON.parse(raw);

    const schemaCheck = validateMappingResultJson(json);
    if (!schemaCheck.ok) {
      writeValidationReport(repoPath, { ok: false, phase: 'schema', schemaErrors: schemaCheck.errors });
      try {
        fsSync.appendFileSync(first.logPath, `\n[VALIDATION] JSON Schema 校验失败（将触发一次修复重试）\n- ${schemaCheck.errors.slice(0, 20).join('\n- ')}\n`);
      } catch {}

      const fixPrompt = [
        firstPrompt,
        '',
        '## 修复模式（只修 JSON，不新增内容）',
        '你上一次生成的 `.mapping-adaptation/mapping-analysis.json` 未通过 JSON Schema 校验。',
        '要求：',
        '- 只修改该 JSON 文件，让它通过校验',
        '- 不要新增新的映射条目（不要“补全”或“扩展”）',
        '- 不要修改仓库代码，只改 JSON',
        '- 每条 entry 必须保留 evidence，且不要编造证据',
        '',
        '请直接覆盖写回 `.mapping-adaptation/mapping-analysis.json`。'
      ].join('\n');

      const retry = await spawnOnce(fixPrompt);
      try { if (retry.cleanup) retry.cleanup(); } catch {}
      try { if (retry.sourceId && mappingActiveProcs.get(retry.sourceId) === retry.proc) mappingActiveProcs.delete(retry.sourceId); } catch {}

      // If retry produced output, write a report for the retry outcome as well (best-effort).
      if (retry.hasOutput && retry.outputPath && fsSync.existsSync(retry.outputPath)) {
        try {
          const raw2 = fsSync.readFileSync(retry.outputPath, 'utf8');
          const json2 = JSON.parse(raw2);
          const schema2 = validateMappingResultJson(json2);
          if (!schema2.ok) {
            writeValidationReport(repoPath, { ok: false, phase: 'schema', schemaErrors: schema2.errors, afterRetry: true });
          } else {
            const sem2 = validateAndFilterMappings(json2);
            if (sem2.rejected.length) {
              writeValidationReport(repoPath, { ok: false, phase: 'semantic', rejected: sem2.rejected, warnings: sem2.warnings, afterRetry: true });
            } else {
              writeValidationReport(repoPath, { ok: true, phase: 'ok', warnings: sem2.warnings, afterRetry: true });
            }
          }
        } catch {}
      }
      return retry;
    }

    const semantic = validateAndFilterMappings(json);
    if (semantic.rejected.length) {
      writeValidationReport(repoPath, { ok: false, phase: 'semantic', rejected: semantic.rejected, warnings: semantic.warnings });
      try {
        fsSync.appendFileSync(first.logPath, `\n[VALIDATION] 语义校验失败：${semantic.rejected.length} 条条目不合格（不会进入汇总）\n`);
        fsSync.appendFileSync(first.logPath, semantic.rejected.slice(0, 20).map(r => `- [${r.index}] ${r.androidSymbol}: ${r.errors.join('; ')}`).join('\n') + '\n');
      } catch {}
      // Mark as failed so UI signals "需要人工检查"，但仍保留产物供查看/修复。
      safeCleanup();
      return { ...first, success: false, errorType: 'semantic_invalid', rejected: semantic.rejected, warnings: semantic.warnings };
    }

    // Warnings only: keep success, write warnings to log.
    if (semantic.warnings.length) {
      writeValidationReport(repoPath, { ok: true, phase: 'ok', warnings: semantic.warnings });
      try {
        fsSync.appendFileSync(first.logPath, `\n[VALIDATION] 警告：${semantic.warnings.length} 处（不影响成功）\n`);
        fsSync.appendFileSync(first.logPath, semantic.warnings.slice(0, 20).map(w => `- [${w.index}] ${w.warnings.join('; ')}`).join('\n') + '\n');
      } catch {}
    } else {
      writeValidationReport(repoPath, { ok: true, phase: 'ok' });
    }
  } catch (e) {
    writeValidationReport(repoPath, { ok: false, phase: 'validation_exception', message: e?.message || String(e) });
    try { fsSync.appendFileSync(first.logPath, `\n[VALIDATION] 校验过程异常：${e?.message || String(e)}\n`); } catch {}
  } finally {
    safeCleanup();
  }

  return first;
}

async function readMappingResult(repoPath) {
  const fp = path.join(getMappingDir(repoPath), 'mapping-analysis.json');
  const raw = await fs.readFile(fp, 'utf8');
  return JSON.parse(raw);
}

module.exports = {
  runMappingAnalysis,
  readMappingResult,
  getMappingDir,
  getLogPath,
  getValidationReportPath,
  ErrorType
};

