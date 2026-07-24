#!/usr/bin/env node
'use strict';

const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const { spawn } = require('child_process');
const {
  loadSigningConfig,
  resolveHdcBin,
  listHdcTargets,
  installHap,
  installHapToAllTargets,
  applySigningToBuildProfile,
  injectBundleNameAt,
} = require('../lib/ohos-sign');

const ADAPTATION_DIR = '.ohos-adaptation';
const WORK_DIR_NAME = '06-blackbox-work';
const TAIL_LIMIT = 20000;

async function main() {
  const startedAt = new Date();
  const args = parseArgs(process.argv.slice(2));
  const repoPath = path.resolve(args.repo || args.cwd || process.cwd());
  const adaptDir = path.join(repoPath, ADAPTATION_DIR);
  const workDir = path.join(adaptDir, WORK_DIR_NAME);
  const outputJson = path.join(adaptDir, '06-blackbox-verify.json');
  const outputReport = path.join(adaptDir, '06-blackbox-verify-report.md');

  await fsp.mkdir(adaptDir, { recursive: true });
  await fsp.rm(workDir, { recursive: true, force: true });
  await ensureDirs([
    workDir,
    path.join(workDir, 'suites'),
    path.join(workDir, 'reports'),
    path.join(workDir, 'stdout'),
    path.join(workDir, 'stderr'),
    path.join(workDir, 'meta'),
    path.join(workDir, 'trajectories'),
    path.join(workDir, 'build'),
  ]);

  console.log('=== Flutter-OHOS 黑盒验证（DroidRun）===');
  console.log(`插件目录: ${repoPath}`);
  console.log(`适配目录: ${adaptDir}`);
  console.log(`工作目录: ${workDir}`);

  try {
    const device = await detectConnectedDevice();
    if (!device.available) {
      console.error(device.error);
      const finishedAt = new Date();
      const result = buildFinalResult({
        status: 'fail',
        repoPath,
        adaptDir,
        workDir,
        inputPath: path.join(adaptDir, '04-test-cases.json'),
        startedAt,
        finishedAt,
        moduleResults: [],
        droidrun: { available: false },
        device,
        exampleAuto: { status: 'not_started' },
        error: device.error,
      });
      await writeFinalArtifacts(result, outputJson, outputReport);
      process.exitCode = 1;
      return;
    }

    console.log(`检测到鸿蒙设备: ${device.targets.join(', ')}`);
    const exampleAuto = await buildAndInstallExampleAuto(repoPath, workDir, device);
    if (exampleAuto.status !== 'pass') {
      const finishedAt = new Date();
      const result = buildFinalResult({
        status: 'fail',
        repoPath,
        adaptDir,
        workDir,
        inputPath: path.join(adaptDir, '04-test-cases.json'),
        startedAt,
        finishedAt,
        moduleResults: [],
        droidrun: { available: false },
        device,
        exampleAuto,
        error: exampleAuto.error || 'example_auto_build_or_install_failed',
      });
      await writeFinalArtifacts(result, outputJson, outputReport);
      process.exitCode = 1;
      return;
    }

    const inputPath = path.join(adaptDir, '04-test-cases.json');
    const input = await readJson(inputPath);
    const modules = normalizeModules(input);
    if (modules.length === 0) {
      throw new Error('04-test-cases.json 中没有可执行的 modules[].test_cases[]');
    }

    console.log(`发现 ${modules.length} 个测试模块，开始转换 DroidRun suite...`);
    const moduleSuites = await writeModuleSuites(input, modules, {
      repoPath,
      adaptDir,
      workDir,
      inputPath,
      appPackage: exampleAuto.bundleName,
    });

    const droidrun = await detectDroidRun();
    if (!droidrun) {
      console.error('未找到 DroidRun：请确认 droidrun 或 python3 -m droidrun 可用');
      const finishedAt = new Date();
      const result = buildFinalResult({
        status: 'skipped',
        repoPath,
        adaptDir,
        workDir,
        inputPath,
        startedAt,
        finishedAt,
        moduleResults: moduleSuites.map((m) => ({
          ...baseModuleResult(m, repoPath),
          status: 'skipped',
          error: 'droidrun_not_found',
        })),
        droidrun: { available: false },
        device,
        exampleAuto,
      });
      await writeFinalArtifacts(result, outputJson, outputReport);
      process.exitCode = 1;
      return;
    }

    console.log(`DroidRun 命令: ${formatCommand(droidrun.executable, droidrun.argsPrefix)}`);
    if (droidrun.version) console.log(`DroidRun 版本: ${droidrun.version}`);

    const moduleResults = [];
    for (const moduleSuite of moduleSuites) {
      const result = await runModuleSuite(moduleSuite, {
        repoPath,
        workDir,
        droidrun,
      });
      moduleResults.push(result);
    }

    const finishedAt = new Date();
    const status = aggregateStatus(moduleResults);
    const result = buildFinalResult({
      status,
      repoPath,
      adaptDir,
      workDir,
      inputPath,
      startedAt,
      finishedAt,
      moduleResults,
      droidrun: {
        available: true,
        command: formatCommand(droidrun.executable, droidrun.argsPrefix),
        version: droidrun.version || '',
      },
      device,
      exampleAuto,
    });

    await writeFinalArtifacts(result, outputJson, outputReport);
    console.log(`最终结果: ${status}`);
    console.log(`汇总 JSON: ${rel(repoPath, outputJson)}`);
    console.log(`汇总报告: ${rel(repoPath, outputReport)}`);

    process.exitCode = status === 'pass' ? 0 : 1;
  } catch (error) {
    const finishedAt = new Date();
    console.error(`黑盒验证脚本失败: ${error.message}`);
    const result = buildFinalResult({
      status: 'fail',
      repoPath,
      adaptDir,
      workDir,
      inputPath: path.join(adaptDir, '04-test-cases.json'),
      startedAt,
      finishedAt,
      moduleResults: [],
      droidrun: { available: false },
      device: { available: false, targets: [], hdc: '', error: '' },
      exampleAuto: { status: 'not_started' },
      error: error.message,
    });
    await writeFinalArtifacts(result, outputJson, outputReport);
    process.exitCode = 1;
  }
}

async function detectConnectedDevice() {
  let cfg = null;
  let cfgError = '';
  try {
    cfg = loadSigningConfig();
  } catch (error) {
    cfgError = error.message;
  }

  const hdc = resolveHdcBin(cfg);
  if (!hdc) {
    return {
      available: false,
      targets: [],
      hdc: '',
      error: cfgError
        ? `未找到 hdc，且签名配置不可用: ${cfgError}`
        : '未找到 hdc，请确认 HDC_BIN、PATH、DevEco SDK 或 signing.local.json.hdcBin 配置正确',
    };
  }

  const targets = listHdcTargets(hdc.path);
  if (!targets.available) {
    return {
      available: false,
      targets: [],
      hdc: hdc.path,
      raw: targets.raw || '',
      error: `未检测到已连接的鸿蒙设备（${hdc.path} list targets）`,
    };
  }

  return {
    available: true,
    targets: targets.targets,
    hdc: hdc.path,
    hdcSource: hdc.source,
    raw: targets.raw || '',
  };
}

async function buildAndInstallExampleAuto(repoPath, workDir, device) {
  const startedAt = new Date();
  const buildDir = path.join(workDir, 'build');
  const stdoutPath = path.join(buildDir, 'example_auto.out.log');
  const stderrPath = path.join(buildDir, 'example_auto.err.log');
  const metaPath = path.join(buildDir, 'example_auto.meta.json');
  const exampleAuto = resolveExampleAutoProject(repoPath);
  const result = {
    status: 'fail',
    example_dir: exampleAuto.exampleDir ? rel(repoPath, exampleAuto.exampleDir) : '',
    ohos_dir: exampleAuto.ohosDir ? rel(repoPath, exampleAuto.ohosDir) : '',
    app_json5: exampleAuto.appJson5 ? rel(repoPath, exampleAuto.appJson5) : '',
    bundleName: '',
    output_hap: '',
    stdout_file: rel(repoPath, stdoutPath),
    stderr_file: rel(repoPath, stderrPath),
    meta_file: rel(repoPath, metaPath),
    started_at: startedAt.toISOString(),
    finished_at: '',
    duration_ms: 0,
    error: '',
  };

  await fsp.mkdir(buildDir, { recursive: true });
  await fsp.writeFile(stdoutPath, '', 'utf8');
  await fsp.writeFile(stderrPath, '', 'utf8');

  try {
    if (!exampleAuto.exampleDir) {
      throw new Error(`未找到 example_auto 工程: ${path.join(repoPath, 'example_auto')}`);
    }
    if (!exampleAuto.ohosDir) {
      throw new Error('example_auto 下未找到 ohos/ 或 harmony/ 目录');
    }
    if (!exampleAuto.appJson5) {
      throw new Error('example_auto 下未找到 AppScope/app.json5');
    }

    const cfg = loadSigningConfig();
    result.bundleName = cfg.bundleName;
    await appendFile(stdoutPath, `同步签名配置到 ${exampleAuto.ohosDir}\n`);
    applySigningToBuildProfile({ cwd: exampleAuto.exampleDir, explicitOhos: exampleAuto.ohosDir });
    const bundle = injectBundleNameAt(exampleAuto.appJson5, cfg.bundleName);
    await appendFile(stdoutPath, `bundleName: ${bundle.previous || '(empty)'} -> ${cfg.bundleName}\n`);

    console.log('开始构建 example_auto 工程...');
    let run = await runProcess('flutter', ['pub', 'get'], {
      cwd: exampleAuto.exampleDir,
      env: {},
      stdoutPath,
      stderrPath,
      append: true,
    });
    if (run.code !== 0) {
      throw new Error(`flutter pub get 失败: ${firstNonEmptyLine(run.stderrTail || run.stdoutTail)}`);
    }

    run = await runProcess('flutter', ['build', 'hap', '--debug'], {
      cwd: exampleAuto.exampleDir,
      env: {},
      stdoutPath,
      stderrPath,
      append: true,
    });
    if (run.code !== 0) {
      throw new Error(`flutter build hap --debug 失败: ${firstNonEmptyLine(run.stderrTail || run.stdoutTail)}`);
    }

    const hap = findInstallableHap(exampleAuto.ohosDir);
    if (!hap) {
      throw new Error('example_auto 构建完成但未找到 HAP 产物');
    }
    result.output_hap = rel(repoPath, hap);
    const targets = Array.isArray(device.targets) ? device.targets : [];
    const targetLabel = targets.length > 1 ? `${targets.length} 台设备 (${targets.join(', ')})` : (targets[0] || '默认设备');
    console.log(`安装 example_auto HAP 到 ${targetLabel}: ${hap}`);
    await appendFile(stdoutPath, `安装 HAP 到 ${targetLabel}: ${hap}\n`);
    let installs;
    try {
      installs = installHapToAllTargets(hap, device.hdc, targets);
    } catch (installErr) {
      const partial = Array.isArray(installErr.results) ? installErr.results : [];
      for (const install of partial) {
        const tag = install.target ? `[${install.target}] ` : '';
        if (install.stdout) await appendFile(stdoutPath, `${tag}${install.stdout}\n`);
        if (install.stderr) await appendFile(stderrPath, `${tag}${install.stderr}\n`);
      }
      throw installErr;
    }
    for (const install of installs) {
      const tag = install.target ? `[${install.target}] ` : '';
      if (install.stdout) await appendFile(stdoutPath, `${tag}${install.stdout}\n`);
      if (install.stderr) await appendFile(stderrPath, `${tag}${install.stderr}\n`);
    }
    result.installed_targets = installs.map((r) => r.target).filter(Boolean);

    result.status = 'pass';
    console.log(`example_auto 已安装到 ${installs.length} 台设备，包名: ${cfg.bundleName}`);
  } catch (error) {
    result.error = error.message;
    await appendFile(stderrPath, `${error.message}\n`);
    console.error(`example_auto 构建/安装失败: ${error.message}`);
  } finally {
    const finishedAt = new Date();
    result.finished_at = finishedAt.toISOString();
    result.duration_ms = finishedAt.getTime() - startedAt.getTime();
    await writeJson(metaPath, result);
  }

  return result;
}

function resolveExampleAutoProject(repoPath) {
  const exampleDir = path.join(repoPath, 'example_auto');
  if (!fs.existsSync(exampleDir)) {
    return { exampleDir: '', ohosDir: '', appJson5: '' };
  }
  const ohosDir = ['ohos', 'harmony']
    .map((name) => path.join(exampleDir, name))
    .find((dir) => fs.existsSync(path.join(dir, 'build-profile.json5'))) || '';
  const appJson5 = ohosDir ? path.join(ohosDir, 'AppScope', 'app.json5') : '';
  return {
    exampleDir,
    ohosDir,
    appJson5: appJson5 && fs.existsSync(appJson5) ? appJson5 : '',
  };
}

function findInstallableHap(ohosDir) {
  const outDir = path.join(ohosDir, 'entry', 'build', 'default', 'outputs', 'default');
  if (!fs.existsSync(outDir)) return '';
  const files = fs.readdirSync(outDir)
    .filter((name) => name.endsWith('.hap'))
    .map((name) => path.join(outDir, name));
  if (files.length === 0) return '';
  const signed = files.filter((file) => /-signed\.hap$/i.test(path.basename(file)));
  const candidates = signed.length > 0 ? signed : files.filter((file) => !/-unsigned\.hap$/i.test(path.basename(file)));
  const target = candidates.length > 0 ? candidates : files;
  target.sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
  return target[0] || '';
}

function parseArgs(argv) {
  const parsed = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--repo' || arg === '--cwd') {
      parsed[arg.slice(2)] = argv[++i];
    } else if (arg.startsWith('--repo=')) {
      parsed.repo = arg.slice('--repo='.length);
    } else if (arg.startsWith('--cwd=')) {
      parsed.cwd = arg.slice('--cwd='.length);
    }
  }
  return parsed;
}

async function ensureDirs(dirs) {
  for (const dir of dirs) {
    await fsp.mkdir(dir, { recursive: true });
  }
}

async function readJson(filePath) {
  try {
    return JSON.parse(await fsp.readFile(filePath, 'utf8'));
  } catch (error) {
    throw new Error(`无法读取 JSON ${filePath}: ${error.message}`);
  }
}

function normalizeModules(input) {
  if (Array.isArray(input?.modules)) {
    return input.modules.filter((m) => Array.isArray(m.test_cases) && m.test_cases.length > 0);
  }
  if (Array.isArray(input?.test_cases) && input.test_cases.length > 0) {
    return [{
      moduleCode: 'default',
      moduleName: input.suite?.name || '默认测试模块',
      moduleDescription: '',
      priority: '',
      test_cases: input.test_cases,
    }];
  }
  return [];
}

async function writeModuleSuites(input, modules, context) {
  const suites = [];
  const suiteDir = path.join(context.workDir, 'suites');
  const inputDir = path.dirname(context.inputPath);

  for (let index = 0; index < modules.length; index++) {
    const module = modules[index];
    const moduleCode = module.moduleCode || `module-${index + 1}`;
    const safeName = safeFileName(moduleCode || `module-${index + 1}`);
    const moduleIdSuffix = safeId(moduleCode || `module-${index + 1}`);
    const suitePath = path.join(suiteDir, `${safeName}.json`);
    const suiteDirForRefs = path.dirname(suitePath);
    const suite = {
      ...(input.suite || {}),
      id: `${input.suite?.id || 'blackbox_test_suite'}_${moduleIdSuffix}`,
      name: `${input.suite?.name || '黑盒验证测试套件'} - ${module.moduleName || moduleCode}`,
    };
    if (context.appPackage) {
      suite.app_package = context.appPackage;
    }

    if (suite.app_card) {
      suite.app_card = rewriteFileRef(suite.app_card, inputDir, suiteDirForRefs);
    }
    if (suite.agent_prompt) {
      suite.agent_prompt = rewriteFileRef(suite.agent_prompt, inputDir, suiteDirForRefs);
    }

    const output = {
      $schema: input.$schema,
      suite,
      test_cases: module.test_cases.map(stripDroidRunUnsupportedCaseFields),
    };

    await writeJson(suitePath, output);
    suites.push({
      moduleCode,
      moduleName: module.moduleName || moduleCode,
      moduleDescription: module.moduleDescription || '',
      priority: module.priority || '',
      safeName,
      suitePath,
      testCases: output.test_cases,
    });
    console.log(`已生成模块 suite: ${moduleCode} -> ${rel(context.repoPath, suitePath)} (${output.test_cases.length} cases)`);
  }

  return suites;
}

function rewriteFileRef(value, fromDir, toDir) {
  if (typeof value !== 'string' || !value.startsWith('file:')) return value;
  const rawPath = value.slice('file:'.length);
  if (!rawPath || path.isAbsolute(rawPath)) return value;
  const absolute = path.resolve(fromDir, rawPath);
  let relative = path.relative(toDir, absolute).split(path.sep).join('/');
  if (!relative.startsWith('.')) relative = `./${relative}`;
  return `file:${relative}`;
}

function stripDroidRunUnsupportedCaseFields(testCase) {
  const { preconditions, postconditions, ...rest } = testCase || {};
  void preconditions;
  void postconditions;
  return rest;
}

async function detectDroidRun() {
  const candidates = [
    { executable: 'droidrun', argsPrefix: [] },
    { executable: 'python3', argsPrefix: ['-m', 'droidrun'] },
  ];

  for (const candidate of candidates) {
    const probe = await runProbe(candidate.executable, [...candidate.argsPrefix, '--version']);
    if (probe.code === 0) {
      return {
        ...candidate,
        version: (probe.stdout || probe.stderr || '').trim().split('\n')[0] || '',
      };
    }
  }
  return null;
}

function runProbe(executable, args) {
  return new Promise((resolve) => {
    let stdout = '';
    let stderr = '';
    const proc = spawn(executable, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    const timer = setTimeout(() => {
      try { proc.kill('SIGTERM'); } catch {}
    }, 10000);
    proc.stdout.on('data', (chunk) => { stdout += chunk.toString(); });
    proc.stderr.on('data', (chunk) => { stderr += chunk.toString(); });
    proc.on('error', (error) => {
      clearTimeout(timer);
      resolve({ code: 127, stdout, stderr: stderr || error.message });
    });
    proc.on('close', (code) => {
      clearTimeout(timer);
      resolve({ code, stdout, stderr });
    });
  });
}

async function runModuleSuite(moduleSuite, context) {
  const { repoPath, workDir, droidrun } = context;
  const reportsDir = path.join(workDir, 'reports');
  const stdoutPath = path.join(workDir, 'stdout', `${moduleSuite.safeName}.out.log`);
  const stderrPath = path.join(workDir, 'stderr', `${moduleSuite.safeName}.err.log`);
  const metaPath = path.join(workDir, 'meta', `${moduleSuite.safeName}.json`);
  const reportJsonPath = path.join(reportsDir, `${moduleSuite.safeName}.json`);
  const reportMdPath = path.join(reportsDir, `${moduleSuite.safeName}.md`);
  const trajectoryRoot = path.join(workDir, 'trajectories');
  const beforeTrajectories = snapshotDirectories(trajectoryRoot);
  const startedAt = new Date();
  const commandArgs = [
    ...droidrun.argsPrefix,
    'test',
    moduleSuite.suitePath,
    '-r',
    reportJsonPath,
    '--format',
    'json',
  ];

  console.log('');
  console.log(`--- 执行模块 ${moduleSuite.moduleCode}: ${moduleSuite.moduleName} ---`);
  console.log(`命令: ${formatCommand(droidrun.executable, commandArgs)}`);

  const run = await runProcess(droidrun.executable, commandArgs, {
    cwd: workDir,
    env: {
      DROIDRUN_BLACKBOX_WORK_DIR: workDir,
      DROIDRUN_TRAJECTORY_PATH: trajectoryRoot,
    },
    stdoutPath,
    stderrPath,
  });
  const finishedAt = new Date();
  const trajectoryDir = findNewestDirectory(trajectoryRoot, beforeTrajectories, startedAt);
  const archived = await archiveDroidRunReports({
    trajectoryDir,
    reportJsonPath,
    reportMdPath,
    moduleSuite,
  });
  const summary = await summarizeModuleReport({
    reportJsonPath,
    fallbackReportJsonPath: archived.trajectoryReportJsonPath,
    testCaseCount: moduleSuite.testCases.length,
    exitCode: run.code,
  });
  const status = moduleStatus(summary, run.code);
  const result = {
    module_code: moduleSuite.moduleCode,
    module_name: moduleSuite.moduleName,
    priority: moduleSuite.priority,
    status,
    suite_file: rel(repoPath, moduleSuite.suitePath),
    report_file: rel(repoPath, reportJsonPath),
    markdown_report_file: await exists(reportMdPath) ? rel(repoPath, reportMdPath) : '',
    stdout_file: rel(repoPath, stdoutPath),
    stderr_file: rel(repoPath, stderrPath),
    meta_file: rel(repoPath, metaPath),
    trajectory_dir: trajectoryDir ? rel(repoPath, trajectoryDir) : '',
    command: formatCommand(droidrun.executable, commandArgs),
    exit_code: run.code,
    started_at: startedAt.toISOString(),
    finished_at: finishedAt.toISOString(),
    duration_ms: finishedAt.getTime() - startedAt.getTime(),
    total_cases: summary.total,
    passed_cases: summary.passed,
    failed_cases: summary.failed,
    skipped_cases: summary.skipped,
    error: run.code === 0 ? '' : firstNonEmptyLine(run.stderrTail || run.stdoutTail),
    stdout_tail: run.stdoutTail,
    stderr_tail: run.stderrTail,
    droidrun_reports: {
      requested_json: rel(repoPath, reportJsonPath),
      trajectory_json: archived.trajectoryReportJsonPath ? rel(repoPath, archived.trajectoryReportJsonPath) : '',
      trajectory_markdown: archived.trajectoryReportMdPath ? rel(repoPath, archived.trajectoryReportMdPath) : '',
    },
  };

  await writeJson(metaPath, {
    ...result,
    raw_paths: {
      suite_file: moduleSuite.suitePath,
      report_file: reportJsonPath,
      markdown_report_file: reportMdPath,
      stdout_file: stdoutPath,
      stderr_file: stderrPath,
      trajectory_dir: trajectoryDir || '',
    },
  });

  console.log(`模块结果: ${moduleSuite.moduleCode} -> ${status} (${summary.passed}/${summary.total} passed)`);
  return result;
}

function runProcess(executable, args, options) {
  return new Promise((resolve) => {
    const flags = options.append ? 'a' : 'w';
    const stdoutStream = fs.createWriteStream(options.stdoutPath, { flags });
    const stderrStream = fs.createWriteStream(options.stderrPath, { flags });
    let stdoutTail = '';
    let stderrTail = '';
    const proc = spawn(executable, args, {
      cwd: options.cwd,
      env: { ...process.env, ...(options.env || {}) },
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    proc.stdout.on('data', (chunk) => {
      process.stdout.write(chunk);
      stdoutStream.write(chunk);
      stdoutTail = appendTail(stdoutTail, chunk);
    });
    proc.stderr.on('data', (chunk) => {
      process.stderr.write(chunk);
      stderrStream.write(chunk);
      stderrTail = appendTail(stderrTail, chunk);
    });
    proc.on('error', (error) => {
      stderrStream.write(`${error.message}\n`);
      stderrTail = appendTail(stderrTail, `${error.message}\n`);
    });
    proc.on('close', (code) => {
      stdoutStream.end();
      stderrStream.end();
      resolve({ code: code ?? 1, stdoutTail, stderrTail });
    });
  });
}

async function archiveDroidRunReports({ trajectoryDir, reportJsonPath, reportMdPath, moduleSuite }) {
  const result = { trajectoryReportJsonPath: '', trajectoryReportMdPath: '' };
  if (!trajectoryDir) {
    await writeFallbackMarkdownReport(reportMdPath, moduleSuite, null);
    return result;
  }

  const rawJson = path.join(trajectoryDir, 'report.json');
  const rawMd = path.join(trajectoryDir, 'report.md');
  if (await exists(rawJson)) {
    result.trajectoryReportJsonPath = rawJson;
    if (!(await exists(reportJsonPath))) {
      await fsp.copyFile(rawJson, reportJsonPath);
    }
  }
  if (await exists(rawMd)) {
    await fsp.copyFile(rawMd, reportMdPath);
    result.trajectoryReportMdPath = rawMd;
  } else {
    await writeFallbackMarkdownReport(reportMdPath, moduleSuite, reportJsonPath);
  }
  return result;
}

async function writeFallbackMarkdownReport(reportMdPath, moduleSuite, reportJsonPath) {
  const lines = [
    `# ${moduleSuite.moduleCode} ${moduleSuite.moduleName}`,
    '',
    'DroidRun 未生成 Markdown 报告，本文件由黑盒验证脚本生成，用于记录模块级执行入口。',
    '',
    `- Suite: \`${moduleSuite.suitePath}\``,
    `- JSON Report: \`${reportJsonPath || ''}\``,
    `- Cases: ${moduleSuite.testCases.length}`,
    '',
  ];
  await fsp.writeFile(reportMdPath, lines.join('\n'), 'utf8');
}

async function summarizeModuleReport({ reportJsonPath, fallbackReportJsonPath, testCaseCount, exitCode }) {
  const reportPath = (await exists(reportJsonPath)) ? reportJsonPath
    : ((fallbackReportJsonPath && await exists(fallbackReportJsonPath)) ? fallbackReportJsonPath : '');
  if (!reportPath) {
    return fallbackSummary(testCaseCount, exitCode);
  }

  try {
    const report = await readJson(reportPath);
    const counted = countCaseStatuses(report);
    if (counted.total > 0) return counted;
  } catch {}
  return fallbackSummary(testCaseCount, exitCode);
}

function countCaseStatuses(value) {
  const summary = { total: 0, passed: 0, failed: 0, skipped: 0 };
  const seen = new Set();

  function visit(node) {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) {
      for (const item of node) visit(item);
      return;
    }

    const statusValue = node.status ?? node.result ?? node.outcome;
    const idValue = node.case_id ?? node.id ?? node.name ?? node.title;
    if (statusValue != null && idValue != null) {
      const key = String(idValue);
      if (!seen.has(key)) {
        seen.add(key);
        summary.total++;
        const normalized = String(statusValue).toLowerCase();
        if (['pass', 'passed', 'success', 'succeeded', 'ok'].includes(normalized)) {
          summary.passed++;
        } else if (['skip', 'skipped', 'not_executed', 'not-executed'].includes(normalized)) {
          summary.skipped++;
        } else {
          summary.failed++;
        }
      }
    }

    for (const child of Object.values(node)) visit(child);
  }

  visit(value);
  return summary;
}

function fallbackSummary(total, exitCode) {
  return {
    total,
    passed: exitCode === 0 ? total : 0,
    failed: exitCode === 0 ? 0 : total,
    skipped: 0,
  };
}

function moduleStatus(summary, exitCode) {
  if (summary.total === 0) return 'skipped';
  if (exitCode === 0 && summary.failed === 0 && summary.skipped === 0) return 'pass';
  if (summary.passed > 0 && (summary.failed > 0 || summary.skipped > 0 || exitCode !== 0)) return 'partial';
  return 'fail';
}

function aggregateStatus(moduleResults) {
  if (moduleResults.length === 0) return 'skipped';
  const passed = moduleResults.filter((m) => m.status === 'pass').length;
  if (passed === moduleResults.length) return 'pass';
  if (passed > 0 || moduleResults.some((m) => m.status === 'partial')) return 'partial';
  if (moduleResults.every((m) => m.status === 'skipped')) return 'skipped';
  return 'fail';
}

function buildFinalResult({ status, repoPath, adaptDir, workDir, inputPath, startedAt, finishedAt, moduleResults, droidrun, device, exampleAuto, error }) {
  const totals = moduleResults.reduce((acc, item) => {
    acc.total_modules++;
    if (item.status === 'pass') acc.passed_modules++;
    else if (item.status === 'skipped') acc.skipped_modules++;
    else acc.failed_modules++;
    acc.total_cases += Number(item.total_cases || 0);
    acc.passed_cases += Number(item.passed_cases || 0);
    acc.failed_cases += Number(item.failed_cases || 0);
    acc.skipped_cases += Number(item.skipped_cases || 0);
    return acc;
  }, {
    total_modules: 0,
    passed_modules: 0,
    failed_modules: 0,
    skipped_modules: 0,
    total_cases: 0,
    passed_cases: 0,
    failed_cases: 0,
    skipped_cases: 0,
  });

  return {
    schema_version: '1.0',
    stage: 'blackbox-verify',
    status,
    ...totals,
    input_file: rel(repoPath, inputPath),
    work_dir: rel(repoPath, workDir),
    started_at: startedAt.toISOString(),
    finished_at: finishedAt.toISOString(),
    duration_ms: finishedAt.getTime() - startedAt.getTime(),
    device: device || { available: false, targets: [], hdc: '', error: '' },
    example_auto: exampleAuto || { status: 'not_started' },
    droidrun,
    error: error || '',
    module_results: moduleResults,
    artifacts: {
      output_json: rel(repoPath, path.join(adaptDir, '06-blackbox-verify.json')),
      output_report: rel(repoPath, path.join(adaptDir, '06-blackbox-verify-report.md')),
      work_dir: rel(repoPath, workDir),
    },
  };
}

async function writeFinalArtifacts(result, outputJson, outputReport) {
  await writeJson(outputJson, result);
  await fsp.writeFile(outputReport, renderFinalReport(result), 'utf8');
}

function renderFinalReport(result) {
  const lines = [
    '# 黑盒验证报告',
    '',
    `- 状态: ${result.status}`,
    `- 模块: ${result.passed_modules}/${result.total_modules} 通过`,
    `- 用例: ${result.passed_cases}/${result.total_cases} 通过，失败 ${result.failed_cases}，跳过 ${result.skipped_cases}`,
    `- 开始时间: ${result.started_at}`,
    `- 结束时间: ${result.finished_at}`,
    `- 工作目录: \`${result.work_dir}\``,
    `- 设备: ${result.device?.available ? (result.device.targets || []).join(', ') : '未连接'}`,
    `- example_auto: ${result.example_auto?.status || 'not_started'}`,
    '',
  ];
  if (result.error) {
    lines.push(`- 错误: ${result.error}`, '');
  }
  lines.push('## Example Auto', '');
  lines.push(`- 状态: ${result.example_auto?.status || 'not_started'}`);
  if (result.example_auto?.bundleName) lines.push(`- 包名: \`${result.example_auto.bundleName}\``);
  if (result.example_auto?.output_hap) lines.push(`- HAP: \`${result.example_auto.output_hap}\``);
  if (result.example_auto?.error) lines.push(`- 错误: ${result.example_auto.error}`);
  lines.push('');
  lines.push('## DroidRun', '');
  lines.push(`- 可用: ${result.droidrun?.available ? '是' : '否'}`);
  if (result.droidrun?.command) lines.push(`- 命令: \`${result.droidrun.command}\``);
  if (result.droidrun?.version) lines.push(`- 版本: \`${result.droidrun.version}\``);
  lines.push('', '## 模块结果', '');
  lines.push('| 模块 | 状态 | 用例 | 报告 | 轨迹 |');
  lines.push('|---|---:|---:|---|---|');
  for (const item of result.module_results || []) {
    const caseText = `${item.passed_cases || 0}/${item.total_cases || 0}`;
    lines.push(`| ${escapeMd(item.module_code)} ${escapeMd(item.module_name)} | ${item.status} | ${caseText} | ${linkPath(item.report_file)} | ${linkPath(item.trajectory_dir)} |`);
  }
  const failed = (result.module_results || []).filter((m) => m.status !== 'pass');
  if (failed.length > 0) {
    lines.push('', '## 失败摘要', '');
    for (const item of failed) {
      lines.push(`- ${item.module_code} ${item.module_name}: ${item.error || `exit_code=${item.exit_code}`}`);
    }
  }
  lines.push('');
  return lines.join('\n');
}

function baseModuleResult(moduleSuite, repoPath) {
  return {
    module_code: moduleSuite.moduleCode,
    module_name: moduleSuite.moduleName,
    priority: moduleSuite.priority,
    suite_file: rel(repoPath, moduleSuite.suitePath),
    total_cases: moduleSuite.testCases.length,
    passed_cases: 0,
    failed_cases: 0,
    skipped_cases: moduleSuite.testCases.length,
  };
}

function snapshotDirectories(dir) {
  try {
    return new Set(fs.readdirSync(dir).filter((name) => {
      try { return fs.statSync(path.join(dir, name)).isDirectory(); } catch { return false; }
    }));
  } catch {
    return new Set();
  }
}

function findNewestDirectory(dir, before, startedAt) {
  try {
    const entries = fs.readdirSync(dir)
      .map((name) => {
        const fullPath = path.join(dir, name);
        try {
          const stat = fs.statSync(fullPath);
          return stat.isDirectory() ? { name, fullPath, mtimeMs: stat.mtimeMs } : null;
        } catch {
          return null;
        }
      })
      .filter(Boolean)
      .filter((entry) => !before.has(entry.name) || entry.mtimeMs >= startedAt.getTime() - 1000)
      .sort((a, b) => b.mtimeMs - a.mtimeMs);
    return entries[0]?.fullPath || '';
  } catch {
    return '';
  }
}

async function exists(filePath) {
  try {
    await fsp.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function writeJson(filePath, data) {
  await fsp.mkdir(path.dirname(filePath), { recursive: true });
  await fsp.writeFile(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

async function appendFile(filePath, text) {
  await fsp.mkdir(path.dirname(filePath), { recursive: true });
  await fsp.appendFile(filePath, text, 'utf8');
}

function appendTail(current, chunk) {
  const next = current + chunk.toString();
  return next.length > TAIL_LIMIT ? next.slice(-TAIL_LIMIT) : next;
}

function firstNonEmptyLine(text) {
  return String(text || '').split('\n').map((s) => s.trim()).find(Boolean) || '';
}

function safeFileName(value) {
  const cleaned = String(value || 'module').replace(/[^\w.-]+/g, '_').replace(/^_+|_+$/g, '');
  return cleaned || 'module';
}

function safeId(value) {
  const cleaned = String(value || 'module').replace(/[^A-Za-z0-9_]+/g, '');
  return cleaned || 'module';
}

function formatCommand(executable, args) {
  return [executable, ...(args || [])].map((part) => {
    const s = String(part);
    return /[\s"']/.test(s) ? `"${s.replace(/"/g, '\\"')}"` : s;
  }).join(' ');
}

function rel(repoPath, targetPath) {
  if (!targetPath) return '';
  return path.relative(repoPath, targetPath).split(path.sep).join('/');
}

function escapeMd(value) {
  return String(value || '').replace(/\|/g, '\\|');
}

function linkPath(value) {
  return value ? `\`${escapeMd(value)}\`` : '';
}

main();
