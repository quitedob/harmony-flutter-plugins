const fsSync = require('fs');
const path = require('path');
const { spawn, spawnSync } = require('child_process');
const { getReposDir, WORKSPACE_ROOT } = require('../config');
const { resolvePluginWorkRoot } = require('../plugin-work-root');
const { getStageById, checkQualityGate, resolveBackend } = require('../stages');
const { readSettings, buildProxyEnv, getStageTimeoutMs, resolveUseShell } = require('../settings');
const { buildRnOhosToolEnv } = require('../rn-ohos-npm-scope');
const { buildDevecoToolEnv } = require('../deveco-toolchain');
const { getBackend } = require('../backends');
const { createStreamParser } = require('../backends/claude-code');
const { createOpenCodeStreamParser } = require('../backends/opencode-stream-parser');
const { createClineStreamParser } = require('../backends/cline');
const { ensureWorkspaceLinks } = require('../backends/workspace-links');
const { stripAnsi } = require('../utils');
const { IS_WIN, formatCommand, killProc } = require('../platform');
const {
  ensureDir, getAdaptationDir, getLogsDir, getStageLogPath,
  clearOutputsFromStage, getMissingAdditionalReportFiles,
  getNextLogPath
} = require('./helpers');
const { activeStages, stageKey, detectStageStatus } = require('./stage-manager');
const { collectAndSaveTokenStats } = require('./token-stats-db');

// ─── Failure classification ───

const ErrorType = {
  GATE_FAILED: 'gate_failed',
  WORKSPACE_LINK_FAILED: 'workspace_link_failed',
  SPAWN_ERROR: 'spawn_error',
  TIMEOUT: 'timeout',
  MANUAL_STOP: 'manual_stop',
  PROCESS_FAILED: 'process_failed',
  NO_OUTPUT: 'no_output',
  UNKNOWN: 'unknown_error'
};

/**
 * Determine whether a stage execution result is worth retrying.
 * Gate failures and workspace-link failures are deterministic — retrying won't help.
 * Process failures without output artifacts are likely transient (API timeout,
 * network blip, CLI crash) and are retryable.
 */
function isRetryable(result) {
  if (!result) return false;
  const nonRetryable = [ErrorType.GATE_FAILED, ErrorType.WORKSPACE_LINK_FAILED, ErrorType.MANUAL_STOP];
  if (nonRetryable.includes(result.errorType)) return false;
  if (result.errorType === ErrorType.TIMEOUT) return true;
  if (result.errorType === ErrorType.SPAWN_ERROR) return true;
  if (result.errorType === ErrorType.NO_OUTPUT) return true;
  if (result.errorType === ErrorType.PROCESS_FAILED && !result.hasOutput) return true;
  return false;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function normalizeParsedChunks(parsed) {
  if (!parsed) return [];
  const items = Array.isArray(parsed) ? parsed : [parsed];
  return items
    .map((item) => {
      if (!item) return null;
      if (typeof item === 'string') return { data: item, append: false };
      return {
        data: item.data ?? item.text ?? '',
        append: item.append === true
      };
    })
    .filter((item) => item && item.data);
}

/**
 * 质量门禁在启动子进程之前失败时，仍写入阶段日志（含与正常结束一致的页脚），
 * 以便 detectStageStatus 判为 failed、流水线与「全部执行」刷新后可见；否则静默路径无任何落盘，界面仍显示 idle。
 */
function writeQualityGateFailureLog(repoPath, pluginName, stageId, gateErrors) {
  const stage = getStageById(stageId);
  if (!stage) return;
  const logsDir = getLogsDir(repoPath);
  ensureDir(logsDir);
  const logPath = getNextLogPath(repoPath, stageId);
  const iso = new Date().toISOString();
  const header =
    `=== ${stage.name} 阶段执行日志 ===\n` +
    `插件: ${pluginName}\n` +
    `阶段: ${stage.id} (${stage.name})\n` +
    `执行目标: ${stage.agent || stage.script?.command || '(script)'}\n` +
    `后端: (未启动 — 质量门禁未通过)\n` +
    `时间: ${iso}\n` +
    `命令: (未执行)\n` +
    `${'='.repeat(50)}\n\n`;
  const body =
    `质量门禁未通过，未启动 Agent 进程：\n` +
    `${(gateErrors || []).map((e) => `  - ${e}`).join('\n')}\n\n`;
  const footer =
    `${'='.repeat(50)}\n` +
    `退出码: 1\n` +
    `状态: 失败\n` +
    `错误类型: ${ErrorType.GATE_FAILED}\n` +
    `结束时间: ${iso}\n`;
  try {
    fsSync.writeFileSync(logPath, header + body + footer);
  } catch (e) {
    console.error(`[executor] 写入门禁失败日志失败: ${e.message}`);
  }
}

const MAX_CONTEXT_LINES = 25;

/**
 * Extract the last N meaningful lines from a log file as failure context.
 * Called after flushOnClose() so all process output is already on disk.
 */
function extractFailureContext(logPath) {
  try {
    const raw = fsSync.readFileSync(logPath, 'utf8');
    const lines = stripAnsi(raw).split('\n').filter(l => l.trim());
    const tail = lines.slice(-MAX_CONTEXT_LINES);
    if (!tail.length) return '';
    return `--- 失败上下文（最后 ${tail.length} 行输出）---\n${tail.join('\n')}\n`;
  } catch {
    return '';
  }
}

/**
 * Check build_status field in coding-library output JSON.
 * Returns { pass: boolean, errors: string[] }
 */
function checkCodingLibraryBuildStatus(stage, adaptDir) {
  if (stage.id !== 'coding-library') {
    return { pass: true, errors: [] };
  }
  if (path.extname(stage.outputFile || '').toLowerCase() !== '.json') {
    return { pass: true, errors: [] };
  }
  
  const outputPath = path.join(adaptDir, stage.outputFile);
  if (!fsSync.existsSync(outputPath)) {
    return { pass: true, errors: [] };
  }
  
  const errors = [];
  try {
    const data = JSON.parse(fsSync.readFileSync(outputPath, 'utf8'));
    const buildStatus = data?.build_status;
    if (buildStatus !== 'pass') {
      errors.push(`build_status = "${buildStatus}"，期望 "pass"`);
    }
  } catch (e) {
    errors.push(`无法解析产物 JSON: ${e.message}`);
  }
  
  return { pass: errors.length === 0, errors };
}

// ─── ohos-sign: testing 阶段启动前同步 build-profile（hvigor 原生签名）───
// 将 signing.local.json 写入 example/ohos/build-profile.json5 的 signingConfigs，
// Agent 仍只写普通 `flutter build hap` / `hdc install`；密钥不进 Agent prompt。

const OHOS_PREFLIGHT_SCRIPT = path.resolve(
  WORKSPACE_ROOT, 'adapt-workflow', 'bin', 'ohos-build-install.js'
);
const OHOS_SYNC_PROFILE_SCRIPT = path.resolve(
  WORKSPACE_ROOT, 'adapt-workflow', 'bin', 'ohos-sync-build-profile.js'
);

function readJson5Field(filePath, fieldName) {
  try {
    if (!fsSync.existsSync(filePath)) return null;
    const raw = fsSync.readFileSync(filePath, 'utf8');
    const re = new RegExp(`"${fieldName}"\\s*:\\s*"([^"]+)"`);
    const m = raw.match(re);
    return m ? m[1] : null;
  } catch {
    return null;
  }
}

function findExampleHarmonyRoot(repoPath) {
  const candidates = [
    path.join(repoPath, 'ohos', 'example', 'harmony'),
    path.join(repoPath, 'example', 'harmony'),
    path.join(repoPath, 'ohos', 'example', 'ohos')
  ];
  return candidates.find(p => fsSync.existsSync(p)) || null;
}

function resolveOhosExampleMeta(repoPath) {
  const harmony = findExampleHarmonyRoot(repoPath);
  if (!harmony) return {};
  const bundleName = readJson5Field(path.join(harmony, 'AppScope', 'app.json5'), 'bundleName');
  let abilityName = null;
  const entryModule = path.join(harmony, 'entry', 'src', 'main', 'module.json5');
  const entryRaw = fsSync.existsSync(entryModule)
    ? fsSync.readFileSync(entryModule, 'utf8')
    : '';
  const abilityMatch = entryRaw.match(/"name"\s*:\s*"(\w+Ability)"/);
  if (abilityMatch) abilityName = abilityMatch[1];
  const out = {};
  if (bundleName) out.OHOS_BUNDLE_NAME = bundleName;
  if (abilityName) out.OHOS_ABILITY_NAME = abilityName;
  return out;
}

function buildOhosTestingSignMeta(stageId, repoPath) {
  // RN-OHOS pipeline splits example build and device verification.
  // Both stages may need hvigor signing readiness.
  if (stageId !== 'testing' && stageId !== 'device-verify' && stageId !== 'demo-gen') return {};
  // Resolve active profile to load the correct signing config
  const { getActiveProfile } = require('../profile');
  let profileId;
  try { profileId = getActiveProfile().id; } catch { profileId = 'flutter-ohos'; }

  // demo-gen targets example_auto, while testing/device-verify target example
  const ohosSubDir = stageId === 'demo-gen'
    ? path.join(repoPath, 'ohos', 'example_auto', 'harmony')
    : null;

  const meta = {};
  try {
    const checkArgs = [OHOS_PREFLIGHT_SCRIPT, '--mode=check', `--cwd=${repoPath}`, `--profile=${profileId}`];
    if (ohosSubDir) checkArgs.push(`--ohos=${ohosSubDir}`);
    const check = spawnSync(
      process.execPath,
      checkArgs,
      { encoding: 'utf8', timeout: 20000 }
    );
    meta.OHOS_SIGN_STATUS = check.status === 0 ? 'ok' : 'not_ready';
    if (check.status !== 0) {
      const out = (check.stdout || '').trim();
      const hint = out.split('\n').slice(0, 2).join(' ');
      console.warn(`[executor] ohos-sign 预检未通过: ${hint}`);
    }
  } catch (err) {
    meta.OHOS_SIGN_STATUS = 'check_failed';
    console.warn(`[executor] ohos-sign 预检失败: ${err.message}`);
  }
  if (meta.OHOS_SIGN_STATUS === 'ok' && fsSync.existsSync(OHOS_SYNC_PROFILE_SCRIPT)) {
    try {
      const syncArgs = [OHOS_SYNC_PROFILE_SCRIPT, '--mode=apply', `--cwd=${repoPath}`, `--profile=${profileId}`];
      if (ohosSubDir) syncArgs.push(`--ohos=${ohosSubDir}`);
      const r = spawnSync(
        process.execPath,
        syncArgs,
        { encoding: 'utf8', timeout: 30000 }
      );
      meta.OHOS_PROFILE_SYNC = r.status === 0 ? 'ok' : 'failed';
      if (r.status !== 0) {
        const errOut = ((r.stderr || '') + (r.stdout || '')).trim().slice(0, 300);
        console.warn(`[executor] ohos-sync-build-profile 失败: ${errOut}`);
      }
    } catch (e) {
      meta.OHOS_PROFILE_SYNC = 'failed';
      console.warn(`[executor] ohos-sync-build-profile 异常: ${e.message}`);
    }
  } else {
    meta.OHOS_PROFILE_SYNC = 'skipped';
  }
  Object.assign(meta, resolveOhosExampleMeta(repoPath));
  return meta;
}

// ─── Stage process builder ───

/**
 * Build and spawn the stage process. Shared by SSE and internal execution.
 * Also validates workspace links before spawning.
 */
async function prepareStageProcess(plugin, stageId, options = {}) {
  const stage = getStageById(stageId);
  const cloneRoot = path.join(getReposDir(), plugin.name);
  const repoPath = resolvePluginWorkRoot(cloneRoot, plugin);
  const pluginName = plugin.name;
  const settings = await readSettings();
  const backendName = resolveBackend(stageId, settings);
  const backend = getBackend(backendName);
  const backendOpts =
    backendName === 'claude-code' ? (settings.claudeCode || {}) :
    backendName === 'cline' ? (settings.cline || {}) :
    {};
  const buildResult = backend.buildCommand(stage, repoPath, WORKSPACE_ROOT, backendOpts);
  const { executable, args, cwd: cmdCwd, env: cmdEnv } = buildResult;
  const proxyEnv = buildProxyEnv(settings);
  const rnOhosEnv = buildRnOhosToolEnv(settings);

  const linkResult = ensureWorkspaceLinks(repoPath, WORKSPACE_ROOT);
  if (!linkResult.success) {
    console.warn(`[executor] Workspace link warnings for ${pluginName}: ${linkResult.errors.join('; ')}`);
  }

  const ohosMeta = buildOhosTestingSignMeta(stageId, repoPath);
  Object.assign(cmdEnv, ohosMeta);

  const cmdDisplay = formatCommand(executable, args);
  const model = buildResult?.meta?.model;
  const tier = buildResult?.meta?.tier;
  const modelLine = model
    ? `模型: ${model}${tier ? ` (tier=${tier})` : ''}\n`
    : '';
  const bashTimeoutMs = buildResult?.meta?.bashTimeoutMs;
  const bashTimeoutLine = bashTimeoutMs
    ? `OPENCODE_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS: ${bashTimeoutMs}\n`
    : '';
  let ohosSignLine = '';
  if ((stageId === 'testing' || stageId === 'device-verify') && ohosMeta.OHOS_SIGN_STATUS) {
    const { getActiveProfile: gp } = require('../profile');
    let sigLabel = 'signing.local';
    try { if (gp().id === 'rn-ohos') sigLabel = 'signing.rn.local'; } catch {}
    const bundle = ohosMeta.OHOS_BUNDLE_NAME || 'n/a';
    const ability = ohosMeta.OHOS_ABILITY_NAME || 'n/a';
    ohosSignLine =
      `OHOS_SIGN: ${sigLabel} [${ohosMeta.OHOS_SIGN_STATUS}] build-profile sync [${ohosMeta.OHOS_PROFILE_SYNC || 'n/a'}]\n` +
      `OHOS_EXAMPLE: bundle=${bundle} ability=${ability}\n`;
  }
  const targetLabel = stage.agent || stage.script?.command || '(script)';
  const header = options.logPath
    ? `\n执行目标: ${targetLabel}\n后端: ${backendName}\n时间: ${new Date().toISOString()}\n${modelLine}${bashTimeoutLine}${ohosSignLine}命令: ${cmdDisplay}\n${'='.repeat(50)}\n\n`
    : `=== ${stage.name} 阶段执行日志 ===\n插件: ${pluginName}\n阶段: ${stage.id} (${stage.name})\n执行目标: ${targetLabel}\n后端: ${backendName}\n时间: ${new Date().toISOString()}\n${modelLine}${bashTimeoutLine}${ohosSignLine}命令: ${cmdDisplay}\n${'='.repeat(50)}\n\n`;

  let logPath = options.logPath;
  if (!logPath) {
    const logsDir = getLogsDir(repoPath);
    ensureDir(logsDir);
    logPath = getNextLogPath(repoPath, stageId);
    fsSync.writeFileSync(logPath, header);
  } else {
    fsSync.appendFileSync(logPath, header);
  }

  const useShell = resolveUseShell(settings, backendName, IS_WIN);

  const proc = spawn(executable, args, {
    cwd: cmdCwd,
    env: buildDevecoToolEnv({
      ...process.env,
      ...proxyEnv,
      ...rnOhosEnv,
      NO_COLOR: '1',
      PYTHONIOENCODING: 'utf-8',
      WORKSPACE_ROOT,
      ...cmdEnv
    }),
    stdio: ['pipe', 'pipe', 'pipe'],
    shell: useShell,
    detached: !IS_WIN
  });
  proc.stdin.end();

  const timeoutMs = getStageTimeoutMs(stageId);

  return { proc, buildResult, logPath, cmdDisplay, backendName, cmdCwd, linkResult, timeoutMs };
}

// ─── SSE execution (single stage, real-time log push) ───

async function runStageWithSSE(pluginId, plugin, stageId, safeSend, safeEnd) {
  const stage = getStageById(stageId);
  const cloneRoot = path.join(getReposDir(), plugin.name);
  const repoPath = resolvePluginWorkRoot(cloneRoot, plugin);
  const pluginName = plugin.name;
  const sk = stageKey(pluginId, stageId);

  const adaptDir = getAdaptationDir(repoPath);
  ensureDir(adaptDir);

  const logsDir = getLogsDir(repoPath);
  ensureDir(logsDir);
  const logPath = getNextLogPath(repoPath, stageId);
  const gateLogHeader =
    `=== ${stage.name} 阶段执行日志 ===\n` +
    `插件: ${pluginName}\n` +
    `阶段: ${stage.id} (${stage.name})\n` +
    `时间: ${new Date().toISOString()}\n` +
    `${'='.repeat(50)}\n\n`;
  try {
    fsSync.writeFileSync(logPath, gateLogHeader);
  } catch {}

  safeSend({
    type: 'cmd',
    stage: stageId,
    data: '--- 环境门禁 (gate_script) ---\n'
  });

  const gate = await checkQualityGate(adaptDir, stageId, repoPath, {
    onOutput: ({ stream, data }) => {
      try { fsSync.appendFileSync(logPath, data); } catch {}
      safeSend({
        type: stream === 'stderr' ? 'stderr' : 'stdout',
        stage: stageId,
        data
      });
    }
  });

  if (!gate.pass) {
    writeQualityGateFailureLog(repoPath, pluginName, stageId, gate.errors);
    safeSend({
      type: 'gate_failed',
      stage: stageId,
      errors: gate.errors,
      message: `质量门禁未通过: ${gate.errors.join('; ')}`
    });
    safeEnd();
    return;
  }

  try {
    fsSync.appendFileSync(logPath, '\n--- 门禁通过，开始执行 Agent ---\n\n');
  } catch {}
  safeSend({ type: 'cmd', data: '\n--- 门禁通过，开始执行 Agent ---\n\n' });

  clearOutputsFromStage(adaptDir, stageId);

  let proc, buildResult, backendName, cmdDisplay, cmdCwd, timeoutMs;
  try {
    ({ proc, buildResult, backendName, cmdDisplay, cmdCwd, timeoutMs } =
      await prepareStageProcess(plugin, stageId, { logPath }));
  } catch (err) {
    safeSend({ type: 'error', stage: stageId, error: `准备阶段进程失败: ${err.message}`, errorType: ErrorType.SPAWN_ERROR });
    safeEnd();
    return;
  }

  safeSend({
    type: 'status',
    stage: stageId,
    status: 'running',
    message: `开始执行 ${stage.name} 阶段 (${backendName})...`
  });
  const bashTimeoutMs = buildResult?.meta?.bashTimeoutMs;
  const bashTimeoutPrefix = bashTimeoutMs
    ? `$ set OPENCODE_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS=${bashTimeoutMs}\n`
    : '';
  safeSend({ type: 'cmd', data: `${bashTimeoutPrefix}$ cd ${cmdCwd}\n$ ${cmdDisplay}\n\n` });

  proc._repoPath = repoPath;
  activeStages.set(sk, proc);

  if (backendName === 'opencode') {
    const startMsg =
      `[executor] OpenCode 已启动 (pid=${proc.pid})。` +
      ' 首次模型响应或工具调用前可能需 1–3 分钟，请稍候；下方将逐行刷新 JSON 事件。\n';
    try { fsSync.appendFileSync(logPath, startMsg); } catch {}
    safeSend({ type: 'cmd', data: startMsg });
  }

  // Watchdog timer
  let timedOut = false;
  const watchdog = setTimeout(() => {
    timedOut = true;
    const msg = `[watchdog] ${pluginName}/${stageId} 超时 (${Math.round(timeoutMs / 60000)} 分钟)，正在终止`;
    console.warn(msg);
    try { fsSync.appendFileSync(logPath, `\n${msg}\n`); } catch {}
    safeSend({ type: 'stderr', data: msg + '\n' });
    killProc(proc, ErrorType.TIMEOUT);
  }, timeoutMs);

  let flushOnClose;
  const useStreamJson = !!buildResult.streamJson;

  if (useStreamJson) {
    const parse =
      backendName === 'cline' ? createClineStreamParser()
        : backendName === 'opencode' ? createOpenCodeStreamParser()
          : createStreamParser({ emitDeltas: backendName === 'claude-code' });
    let lineBuffer = '';
    proc.stdout.on('data', (chunk) => {
      lineBuffer += chunk.toString();
      const lines = lineBuffer.split('\n');
      lineBuffer = lines.pop();
      for (const line of lines) {
        const parsed = parse(line);
        for (const chunk of normalizeParsedChunks(parsed)) {
          try { fsSync.appendFileSync(logPath, chunk.data); } catch {}
          safeSend({ type: 'stdout', data: chunk.data, append: chunk.append });
        }
      }
    });
    flushOnClose = () => {
      if (lineBuffer && lineBuffer.trim()) {
        const parsed = parse(lineBuffer);
        for (const chunk of normalizeParsedChunks(parsed)) {
          try { fsSync.appendFileSync(logPath, chunk.data); } catch {}
          safeSend({ type: 'stdout', data: chunk.data, append: chunk.append });
        }
      }
    };
  } else {
    let outputBuffer = '';
    let bufferTimeout = null;
    let logLineBuffer = '';
    function flushOutput() {
      if (outputBuffer) {
        const cleaned = stripAnsi(outputBuffer);
        if (cleaned.trim()) safeSend({ type: 'stdout', data: cleaned });
        outputBuffer = '';
      }
      bufferTimeout = null;
    }
    function appendLogWithTimestamp(text) {
      // 处理行缓冲，为 Thinking: 开头的行添加时间戳
      logLineBuffer += text;
      const lines = logLineBuffer.split('\n');
      logLineBuffer = lines.pop();
      for (const line of lines) {
        let stamped = line;
        // 去掉 ANSI 颜色码后判断是否以 Thinking: 开头
        const cleanLine = stripAnsi(line);
        if (cleanLine.startsWith('Thinking:')) {
          const ts = new Date().toISOString().substring(11, 19);
          stamped = `[${ts}] ${line}`;
        }
        try { fsSync.appendFileSync(logPath, stamped + '\n'); } catch {}
      }
    }
    proc.stdout.on('data', (chunk) => {
      const raw = chunk.toString();
      appendLogWithTimestamp(raw);
      outputBuffer += raw;
      if (!bufferTimeout) bufferTimeout = setTimeout(flushOutput, 150);
    });
    flushOnClose = () => {
      if (bufferTimeout) clearTimeout(bufferTimeout);
      flushOutput();
      // 处理剩余的日志行缓冲
      if (logLineBuffer) {
        let stamped = logLineBuffer;
        const cleanLine = stripAnsi(logLineBuffer);
        if (cleanLine.startsWith('Thinking:')) {
          const ts = new Date().toISOString().substring(11, 19);
          stamped = `[${ts}] ${logLineBuffer}`;
        }
        try { fsSync.appendFileSync(logPath, stamped + '\n'); } catch {}
        logLineBuffer = '';
      }
    };
  }

  proc.stderr.on('data', (chunk) => {
    const raw = chunk.toString();
    try { fsSync.appendFileSync(logPath, raw); } catch {}
    const output = stripAnsi(raw);
    if (output.trim()) safeSend({ type: 'stderr', data: output });
  });

  proc.on('close', async (code) => {
    clearTimeout(watchdog);
    try {
      flushOnClose();
      const manuallyStopped = proc._terminationReason === ErrorType.MANUAL_STOP;
      let success = code === 0 && !timedOut && !manuallyStopped;
      let errorType = timedOut
        ? ErrorType.TIMEOUT
        : (manuallyStopped ? ErrorType.MANUAL_STOP : (success ? null : ErrorType.PROCESS_FAILED));

      if (success) {
        const hasOutput = fsSync.existsSync(path.join(adaptDir, stage.outputFile));
        if (!hasOutput) {
          success = false;
          errorType = ErrorType.NO_OUTPUT;
          const warn = `[executor] ${pluginName}/${stageId} 进程退出码为 0 但未生成产物 ${stage.outputFile}，判定为失败`;
          console.warn(warn);
          try { fsSync.appendFileSync(logPath, `\n${warn}\n`); } catch {}
        } else {
          const missingReports = getMissingAdditionalReportFiles(stage, adaptDir);
          if (missingReports.length > 0) {
            success = false;
            errorType = ErrorType.NO_OUTPUT;
            const warn = `[executor] ${pluginName}/${stageId} 缺少附加报告: ${missingReports.join(', ')}，判定为失败`;
            console.warn(warn);
            try { fsSync.appendFileSync(logPath, `\n${warn}\n`); } catch {}
          } else {
            const buildCheck = checkCodingLibraryBuildStatus(stage, adaptDir);
            if (!buildCheck.pass) {
              success = false;
              errorType = ErrorType.PROCESS_FAILED;
              const warn = `[executor] ${pluginName}/${stageId} 编译失败: ${buildCheck.errors.join('; ')}`;
              console.warn(warn);
              try { fsSync.appendFileSync(logPath, `\n${warn}\n`); } catch {}
            }
          }
        }
      }

      if (manuallyStopped) {
        try { fsSync.appendFileSync(logPath, '\n[已手动终止]\n'); } catch {}
      }

      const failureContext = success ? '' : extractFailureContext(logPath);
      const statusLabel = success ? '成功' : (manuallyStopped ? '手动终止' : '失败');
      const footer = `\n${'='.repeat(50)}\n退出码: ${code}\n状态: ${statusLabel}${timedOut ? ' (超时终止)' : ''}${errorType === ErrorType.NO_OUTPUT ? ' (未生成产物)' : ''}\n错误类型: ${errorType || '无'}\n结束时间: ${new Date().toISOString()}\n${failureContext}`;
      try { fsSync.appendFileSync(logPath, footer); } catch {}

      let tokenSnapshot = null;
      try {
        const result = collectAndSaveTokenStats(repoPath, stageId, pluginName);
        if (result) tokenSnapshot = result.snapshot;
      } catch (e) {
        console.error(`[token-stats] 收集失败: ${e.message}`);
      }

      safeSend({
        type: 'exit', code, stage: stageId,
        status: success ? 'success' : 'failed',
        errorType,
        failureContext: failureContext || undefined,
        tokenSnapshot
      });
    } finally {
      activeStages.delete(sk);
      if (buildResult.cleanup) buildResult.cleanup();
      safeEnd();
    }
  });

  proc.on('error', async (error) => {
    clearTimeout(watchdog);
    try {
      try { fsSync.appendFileSync(logPath, `\n[ERROR] 命令执行失败: ${error.message}\n`); } catch {}
      const hint =
        backendName === 'claude-code' ? 'claude'
          : backendName === 'cline' ? 'cline'
            : 'opencode';
      safeSend({
        type: 'error',
        stage: stageId,
        error: `命令执行失败: ${error.message}. 请确认 ${hint} 已安装且在 PATH 中`,
        errorType: ErrorType.SPAWN_ERROR
      });
    } finally {
      activeStages.delete(sk);
      if (buildResult.cleanup) buildResult.cleanup();
      safeEnd();
    }
  });
}

// ─── Internal execution (silent, used by run-all and batch queue) ───

async function executeStageInternal(pluginId, plugin, stageId) {
  const stage = getStageById(stageId);
  if (!stage) return { success: false, error: 'unknown stage', errorType: ErrorType.UNKNOWN };

  const cloneRoot = path.join(getReposDir(), plugin.name);
  const repoPath = resolvePluginWorkRoot(cloneRoot, plugin);
  const pluginName = plugin.name;
  const sk = stageKey(pluginId, stageId);

  if (activeStages.has(sk)) {
    return new Promise((resolve) => {
      const check = setInterval(async () => {
        if (!activeStages.has(sk)) {
          clearInterval(check);
          const status = await detectStageStatus(repoPath, stageId);
          resolve({ success: status === 'success' });
        }
      }, 3000);
    });
  }

  const adaptDir = getAdaptationDir(repoPath);
  ensureDir(adaptDir);

  const gate = await checkQualityGate(adaptDir, stageId, repoPath);
  if (!gate.pass) {
    writeQualityGateFailureLog(repoPath, pluginName, stageId, gate.errors);
    return { success: false, error: `质量门禁未通过: ${gate.errors.join('; ')}`, errorType: ErrorType.GATE_FAILED };
  }

  clearOutputsFromStage(adaptDir, stageId);

  let proc, buildResult, logPath, timeoutMs, backendName;
  try {
    ({ proc, buildResult, logPath, timeoutMs, backendName } = await prepareStageProcess(plugin, stageId));
  } catch (err) {
    return { success: false, error: err.message, errorType: ErrorType.SPAWN_ERROR };
  }

  proc._repoPath = repoPath;
  activeStages.set(sk, proc);

  let timedOut = false;
  const watchdog = setTimeout(() => {
    timedOut = true;
    const msg = `[watchdog] ${pluginName}/${stageId} 超时 (${Math.round(timeoutMs / 60000)} 分钟)，正在终止`;
    console.warn(msg);
    try { fsSync.appendFileSync(logPath, `\n${msg}\n`); } catch {}
    killProc(proc, ErrorType.TIMEOUT);
  }, timeoutMs);

  let flushOnClose;
  const useStreamJson = !!buildResult.streamJson;

  if (useStreamJson) {
    const parse =
      backendName === 'cline' ? createClineStreamParser()
        : backendName === 'opencode' ? createOpenCodeStreamParser()
          : createStreamParser();
    let lineBuffer = '';
    proc.stdout.on('data', (chunk) => {
      lineBuffer += chunk.toString();
      const lines = lineBuffer.split('\n');
      lineBuffer = lines.pop();
      for (const line of lines) {
        const parsed = parse(line);
        for (const chunk of normalizeParsedChunks(parsed)) {
          try { fsSync.appendFileSync(logPath, chunk.data); } catch {}
        }
      }
    });
    flushOnClose = () => {
      if (lineBuffer && lineBuffer.trim()) {
        const parsed = parse(lineBuffer);
        for (const chunk of normalizeParsedChunks(parsed)) {
          try { fsSync.appendFileSync(logPath, chunk.data); } catch {}
        }
      }
    };
  } else {
    let logLineBuffer = '';
    proc.stdout.on('data', (chunk) => {
      logLineBuffer += chunk.toString();
      const lines = logLineBuffer.split('\n');
      logLineBuffer = lines.pop();
      for (const line of lines) {
        let stamped = line;
        const cleanLine = stripAnsi(line);
        if (cleanLine.startsWith('Thinking:')) {
          const ts = new Date().toISOString().substring(11, 19);
          stamped = `[${ts}] ${line}`;
        }
        try { fsSync.appendFileSync(logPath, stamped + '\n'); } catch {}
      }
    });
    flushOnClose = () => {
      if (logLineBuffer) {
        let stamped = logLineBuffer;
        const cleanLine = stripAnsi(logLineBuffer);
        if (cleanLine.startsWith('Thinking:')) {
          const ts = new Date().toISOString().substring(11, 19);
          stamped = `[${ts}] ${logLineBuffer}`;
        }
        try { fsSync.appendFileSync(logPath, stamped + '\n'); } catch {}
      }
    };
  }

  proc.stderr.on('data', (chunk) => {
    try { fsSync.appendFileSync(logPath, chunk.toString()); } catch {}
  });

  return new Promise((resolve) => {
    proc.on('close', (code) => {
      clearTimeout(watchdog);
      try {
        flushOnClose();
        const manuallyStopped = proc._terminationReason === ErrorType.MANUAL_STOP;
        let success = code === 0 && !timedOut && !manuallyStopped;
        let errorType = timedOut
          ? ErrorType.TIMEOUT
          : (manuallyStopped ? ErrorType.MANUAL_STOP : (success ? null : ErrorType.PROCESS_FAILED));

        const hasOutput = fsSync.existsSync(path.join(adaptDir, stage.outputFile));
        if (success && !hasOutput) {
          success = false;
          errorType = ErrorType.NO_OUTPUT;
          const warn = `[executor] ${pluginName}/${stageId} 进程退出码为 0 但未生成产物 ${stage.outputFile}，判定为失败`;
          console.warn(warn);
          try { fsSync.appendFileSync(logPath, `\n${warn}\n`); } catch {}
        } else if (success && hasOutput) {
          const missingReports = getMissingAdditionalReportFiles(stage, adaptDir);
          if (missingReports.length > 0) {
            success = false;
            errorType = ErrorType.NO_OUTPUT;
            const warn = `[executor] ${pluginName}/${stageId} 缺少附加报告: ${missingReports.join(', ')}，判定为失败`;
            console.warn(warn);
            try { fsSync.appendFileSync(logPath, `\n${warn}\n`); } catch {}
          } else {
            const buildCheck = checkCodingLibraryBuildStatus(stage, adaptDir);
            if (!buildCheck.pass) {
              success = false;
              errorType = ErrorType.PROCESS_FAILED;
              const warn = `[executor] ${pluginName}/${stageId} 编译失败: ${buildCheck.errors.join('; ')}`;
              console.warn(warn);
              try { fsSync.appendFileSync(logPath, `\n${warn}\n`); } catch {}
            }
          }
        }

        if (manuallyStopped) {
          try { fsSync.appendFileSync(logPath, '\n[已手动终止]\n'); } catch {}
        }

        const failureContext = success ? '' : extractFailureContext(logPath);
        const statusLabel = success ? '成功' : (manuallyStopped ? '手动终止' : '失败');
        const footer = `\n${'='.repeat(50)}\n退出码: ${code}\n状态: ${statusLabel}${timedOut ? ' (超时终止)' : ''}${errorType === ErrorType.NO_OUTPUT ? ' (未生成产物)' : ''}\n错误类型: ${errorType || '无'}\n结束时间: ${new Date().toISOString()}\n${failureContext}`;
        try { fsSync.appendFileSync(logPath, footer); } catch {}

        try { collectAndSaveTokenStats(repoPath, stageId, pluginName); } catch {}

        resolve({ success, code, errorType, hasOutput, failureContext: failureContext || undefined });
      } finally {
        activeStages.delete(sk);
        if (buildResult.cleanup) buildResult.cleanup();
      }
    });

    proc.on('error', (error) => {
      clearTimeout(watchdog);
      try {
        try { fsSync.appendFileSync(logPath, `\n[ERROR] 命令执行失败: ${error.message}\n`); } catch {}
        resolve({ success: false, error: error.message, errorType: ErrorType.SPAWN_ERROR });
      } finally {
        activeStages.delete(sk);
        if (buildResult.cleanup) buildResult.cleanup();
      }
    });
  });
}

// ─── Retry wrapper for internal execution ───

/**
 * Execute a stage with automatic retry for transient failures.
 * Non-retryable errors (gate failure, workspace link issues) fail immediately.
 */
async function executeStageWithRetry(pluginId, plugin, stageId, retryOpts) {
  const maxRetries = retryOpts?.maxRetries ?? 2;
  const baseDelay = retryOpts?.baseDelayMs ?? 10000;
  const maxDelay = retryOpts?.maxDelayMs ?? 60000;
  const pluginName = plugin.name;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const result = await executeStageInternal(pluginId, plugin, stageId);

    if (result.success) {
      if (attempt > 0) console.log(`[retry] ${pluginName}/${stageId} 第 ${attempt + 1} 次尝试成功`);
      return { ...result, attempts: attempt + 1 };
    }

    if (attempt < maxRetries && isRetryable(result)) {
      const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
      console.warn(`[retry] ${pluginName}/${stageId} 第 ${attempt + 1} 次失败 (${result.errorType || 'unknown'}), ${delay}ms 后重试`);
      await sleep(delay);
      continue;
    }

    return { ...result, attempts: attempt + 1 };
  }

  return { success: false, error: 'max retries exceeded', errorType: ErrorType.UNKNOWN, attempts: maxRetries + 1 };
}

module.exports = { runStageWithSSE, executeStageInternal, executeStageWithRetry, ErrorType, isRetryable };
