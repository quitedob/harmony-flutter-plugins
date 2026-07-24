#!/usr/bin/env node
'use strict';

const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const os = require('os');
const { spawn, execFileSync, spawnSync } = require('child_process');
const {
  loadSigningConfig,
  resolveHdcBin,
  listHdcTargets,
  installHap,
  installHapToAllTargets,
  applySigningToBuildProfile,
  injectBundleNameAt,
} = require('../lib/ohos-sign');
const {
  alignSigningConfigs,
  alignBundleName,
  checkSigningConsistency,
  findSignedHap,
  findAnyHap,
  rebuildHap,
} = require('./rn-check-hap-signing');

const ADAPTATION_DIR = '.rn-ohos-adaptation';
const WORK_DIR_NAME = '06-blackbox-work';
const TAIL_LIMIT = 20000;

// 黑盒验证可能遗留的孤儿进程（droidrun 派生的 Python/LLM/hilog 子进程，
// 主进程异常退出时不会自动回收，仍持有 trajectory/日志文件句柄）。
const ORPHAN_PROCESS_NAMES = process.platform === 'win32'
  ? ['droidrun.exe', 'python.exe', 'pythonw.exe', 'hilog.exe']
  : ['droidrun', 'python', 'python3'];

function killOrphans() {
  if (process.platform === 'win32') {
    for (const name of ORPHAN_PROCESS_NAMES) {
      try {
        // /F 强制结束，/T 连子进程一起结束（杀整个进程树）
        execFileSync('taskkill', ['/F', '/T', '/IM', name], { stdio: 'ignore' });
      } catch {
        // 进程不存在或无权限，忽略
      }
    }
  } else {
    for (const name of ORPHAN_PROCESS_NAMES) {
      try {
        execFileSync('pkill', ['-f', name], { stdio: 'ignore' });
      } catch {}
    }
  }
}

// Windows 上 fsp.rm 遇到被占用文件直接抛 EBUSY，孤儿进程不退出就一直删不掉。
// 重试前先杀孤儿进程释放句柄，间隔递增。
async function rmWithRetry(target, { retries = 6, baseDelayMs = 1500 } = {}) {
  let lastErr;
  for (let i = 0; i < retries; i++) {
    try {
      await fsp.rm(target, { recursive: true, force: true });
      return;
    } catch (e) {
      lastErr = e;
      if (e.code !== 'EBUSY' && e.code !== 'ENOTEMPTY' && e.code !== 'EPERM') throw e;
      if (i === retries - 1) break;
      killOrphans();
      await new Promise((r) => setTimeout(r, baseDelayMs * (i + 1)));
    }
  }
  throw lastErr;
}

async function main(adaptDirOverride) {
  const startedAt = new Date();
  const args = parseArgs(process.argv.slice(2));
  const repoPath = path.resolve(args.repo || args.cwd || process.cwd());
  const adaptationDirName = adaptDirOverride || ADAPTATION_DIR;
  const adaptDir = path.join(repoPath, adaptationDirName);
  const workDir = path.join(adaptDir, WORK_DIR_NAME);
  const outputJson = path.join(adaptDir, '06-blackbox-verify.json');
  const outputReport = path.join(adaptDir, '06-blackbox-verify-report.md');

  await fsp.mkdir(adaptDir, { recursive: true });
  await rmWithRetry(workDir);
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

  console.log('=== RN-OHOS 黑盒验证（DroidRun）===');
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
    const exampleAuto = await buildAndInstallExampleAuto(repoPath, workDir, device, adaptationDirName);
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

/**
 * monorepo 深路径兜底：rebuild 前 hvigorw 会触发 pnpm install，pnpm 用源 tarball
 * 绝对路径拼 cache key 文件名（<hash>-file+<+joined-abs-path>.json）。物理路径过深时
 * （如 monorepo 的 packages/<pkg>/ohos/example_auto/harmony），cache key 超 Windows
 * MAX_PATH(260)，Node.js fs 默认不带 \\?\ 前缀 → ERR_PNPM_ENOENT。
 *
 * 检测到超阈值时，robocopy 整个 example_auto 到短路径副本（如 C:\bb），在副本里做
 * 签名注入 + rebuild；rebuild 成功后由调用方把 HAP 拷回原路径。
 *
 * 返回 { workExampleDir, workOhosDir, isCopy, copyRoot }。
 *   - 不超阈值：workExampleDir/workOhosDir = 原路径，isCopy=false，copyRoot=''
 *   - 超阈值：robocopy 到短路径，workExampleDir/workOhosDir = 副本路径，isCopy=true
 */
function prepareRebuildWorkDir(origExampleDir, origOhosDir, stdoutPath, stderrPath) {
  const isWin = process.platform === 'win32';

  // 估算 pnpm cache key 路径长度
  // cache key 文件名: <64-char sha256>-file+<+joined abs tgz path>.json
  // 父目录: <HVIGOR_HOME>\caches\v10\index\<2-char hash prefix>\  约 35 字符
  let tgzName = 'rnoh-hvigor-plugin-0.3.0.tgz';
  try {
    const hvigorDir = path.join(origOhosDir, 'hvigor');
    const files = fs.readdirSync(hvigorDir).filter((f) => /^rnoh-hvigor-plugin-.*\.tgz$/.test(f));
    if (files.length) tgzName = files[0];
  } catch { /* 估算用默认名 */ }
  const tgzAbs = path.join(origOhosDir, 'hvigor', tgzName);
  const estimatedKeyLen = 64 + '-file'.length + tgzAbs.length + '.json'.length + 35;
  const MAX_PATH = 259;

  if (!isWin || estimatedKeyLen <= MAX_PATH) {
    return { workExampleDir: origExampleDir, workOhosDir: origOhosDir, isCopy: false, copyRoot: '' };
  }

  // 选短路径根：env 覆盖 > 默认 C:\bb
  const copyRoot = process.env.RNOH_BLACKBOX_SHORT_PATH || 'C:\\bb';
  const relOhos = path.relative(origExampleDir, origOhosDir); // 通常 'harmony'
  const workExampleDir = copyRoot;
  const workOhosDir = path.join(copyRoot, relOhos);

  // robocopy 整个 example_auto（含 node_modules / oh_modules，保持相对引用完整）
  // Copy-Item 会超时，必须用 robocopy
  try {
    if (fs.existsSync(copyRoot)) {
      fs.rmSync(copyRoot, { recursive: true, force: true });
    }
  } catch (e) {
    appendFileSyncSafe(stderrPath, `[short-path] 清理旧副本失败 ${copyRoot}: ${e.message}\n`);
  }

  const robocopyArgs = [origExampleDir, copyRoot, '/E', '/NFL', '/NDL', '/NJH', '/NJS', '/NC', '/NS', '/NP'];
  const r = spawnSync('robocopy', robocopyArgs, { encoding: 'utf8', windowsHide: true, maxBuffer: 64 * 1024 * 1024 });
  // robocopy exit code < 8 视为成功（0=无变化, 1=已复制, ...）
  const robocopyOk = r.status != null && r.status < 8;
  appendFileSyncSafe(stdoutPath, `[short-path] pnpm cache key 估算 ${estimatedKeyLen} > MAX_PATH(${MAX_PATH})，触发短路径副本\n`);
  appendFileSyncSafe(stdoutPath, `[short-path] robocopy ${origExampleDir} -> ${copyRoot} (exit=${r.status})\n`);
  if (!robocopyOk) {
    appendFileSyncSafe(stderrPath, `[short-path] robocopy 失败 exit=${r.status}\n${r.stderr || ''}\n`);
    // robocopy 失败则回退原路径（让原始错误暴露）
    return { workExampleDir: origExampleDir, workOhosDir: origOhosDir, isCopy: false, copyRoot: '' };
  }

  appendFileSyncSafe(stdoutPath, `[short-path] 副本就绪: ${workExampleDir}\n`);
  return { workExampleDir, workOhosDir, isCopy: true, copyRoot };
}

function appendFileSyncSafe(filePath, content) {
  try { fs.appendFileSync(filePath, content, 'utf8'); } catch { /* 忽略日志写入失败 */ }
}

function cleanupRebuildWorkDir(copyRoot, stdoutPath) {
  if (!copyRoot) return;
  try {
    fs.rmSync(copyRoot, { recursive: true, force: true });
    appendFileSyncSafe(stdoutPath, `[short-path] 已清理副本 ${copyRoot}\n`);
  } catch (e) {
    appendFileSyncSafe(stdoutPath, `[short-path] 清理副本失败 ${copyRoot}: ${e.message}\n`);
  }
}

async function buildAndInstallExampleAuto(repoPath, workDir, device, adaptationDirName) {
  const startedAt = new Date();
  const buildDir = path.join(workDir, 'build');
  const stdoutPath = path.join(buildDir, 'example_auto.out.log');
  const stderrPath = path.join(buildDir, 'example_auto.err.log');
  const rebuildStdoutPath = path.join(buildDir, 'example_auto.rebuild.out.log');
  const rebuildStderrPath = path.join(buildDir, 'example_auto.rebuild.err.log');
  const metaPath = path.join(buildDir, 'example_auto.meta.json');  const exampleAuto = resolveExampleAutoProject(repoPath);
  const result = {
    status: 'fail',
    example_dir: exampleAuto.exampleDir ? rel(repoPath, exampleAuto.exampleDir) : '',
    ohos_dir: exampleAuto.ohosDir ? rel(repoPath, exampleAuto.ohosDir) : '',
    app_json5: exampleAuto.appJson5 ? rel(repoPath, exampleAuto.appJson5) : '',
    bundleName: '',
    output_hap: '',
    stdout_file: rel(repoPath, stdoutPath),
    stderr_file: rel(repoPath, stderrPath),
    rebuild_stdout_file: rel(repoPath, rebuildStdoutPath),
    rebuild_stderr_file: rel(repoPath, rebuildStderrPath),
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
      const tried = (exampleAuto.probed && exampleAuto.probed.length)
        ? exampleAuto.probed.join(' | ')
        : path.join(repoPath, 'ohos', 'example_auto');
      throw new Error(`未找到 example_auto 工程，已探测: ${tried}`);
    }
    if (!exampleAuto.ohosDir) {
      throw new Error('example_auto 下未找到 build-profile.json5（应位于 example_auto 根目录）');
    }
    if (!exampleAuto.appJson5) {
      throw new Error('example_auto 下未找到 AppScope/app.json5');
    }

    // 先检查 demo-gen 阶段是否成功
    const demoGenJson = path.join(repoPath, adaptationDirName, '05-demo-gen.json');
    if (fs.existsSync(demoGenJson)) {
      try {
        const demoGenData = JSON.parse(fs.readFileSync(demoGenJson, 'utf8'));
        if (demoGenData.status !== 'success') {
          throw new Error(
            `demo-gen 阶段未完成（status: ${demoGenData.status}），无法执行黑盒验证。\n` +
            `详细信息: ${demoGenData.message || demoGenData.error || '无'}`
          );
        }
      } catch (e) {
        if (e.message.includes('demo-gen 阶段未完成')) throw e;
      }
    }

    // 解析符号链接/junction 到真实路径
    const realExampleDir = fs.realpathSync.native(exampleAuto.exampleDir);
    const realOhosDir = fs.realpathSync.native(exampleAuto.ohosDir);

    // monorepo 深路径兜底：物理路径过长 → pnpm cache key 超 MAX_PATH → ERR_PNPM_ENOENT。
    // 超阈值时 robocopy 到短路径副本，在副本里做签名注入 + rebuild，HAP 拷回原路径。
    const { workExampleDir, workOhosDir, isCopy, copyRoot } = prepareRebuildWorkDir(
      realExampleDir, realOhosDir, stdoutPath, stderrPath
    );

    let signedHap;
    try {
    // 加载本机签名配置（rn-ohos profile → signing.rn.local.json）
    const cfg = loadSigningConfig('rn-ohos');
    result.bundleName = cfg.bundleName;

    // 第 1 步：注入签名材料（ohos-sign 标准库）—— 写入 signingConfigs 数组与 bundleName
    await appendFile(stdoutPath, `[1/4] 注入签名材料到 ${workOhosDir}${isCopy ? ' (短路径副本)' : ''}\n`);
    applySigningToBuildProfile({ cwd: workExampleDir, explicitOhos: workOhosDir, profileId: 'rn-ohos' });
    const realAppJson5 = path.join(workOhosDir, path.relative(exampleAuto.ohosDir, exampleAuto.appJson5));
    injectBundleNameAt(realAppJson5, cfg.bundleName);
    await appendFile(stdoutPath, `  bundleName: -> ${cfg.bundleName}\n`);

    // 第 2 步：强制对齐 signingConfig（RN-only 严格实现，绕过公共库 sync bug）
    // signingConfigs[].name 与 products[].signingConfig 都强制为 "default"
    await appendFile(stdoutPath, `[2/4] 强制对齐 signingConfig=default\n`);
    const alignResult = alignSigningConfigs(path.join(workOhosDir, 'build-profile.json5'));
    if (alignResult.changed) {
      for (const c of alignResult.changes) await appendFile(stdoutPath, `  ${c}\n`);
    } else {
      await appendFile(stdoutPath, `  无需修改（已对齐）\n`);
    }

    // 一致性 post-check：必须 signingConfigs[].name=default 且 products[].signingConfig=default
    const consistency = checkSigningConsistency(path.join(workOhosDir, 'build-profile.json5'));
    if (!consistency.ok) {
      await appendFile(stderrPath, `签名一致性检查失败:\n${consistency.problems.map((p) => '  - ' + p).join('\n')}\n`);
      throw new Error(`签名配置对齐失败（${consistency.problems.length} 个问题）: ${consistency.problems.join('; ')}`);
    }
    await appendFile(stdoutPath, `  一致性 post-check 通过\n`);

    // 第 3 步：清旧的 hvigor/build 缓存（防止缓存基于旧 signingConfig 决策）
    //   harmony/.hvigor — hvigor daemon / resolved build-profile 缓存
    //   harmony/build   — 顶层 build 输出
    //   harmony/.cxx    — CMake 中间产物
    //   harmony/entry/build — HAP/资源产物（关键：含旧 unsigned HAP，必须清才能让 hvigor 重新走 SignHap）
    //   harmony/entry/.cxx  — entry 级 CMake 缓存
    await appendFile(stdoutPath, `[3/4] 清理旧 build / .hvigor 缓存\n`);
    const cacheDirs = [
      path.join(workOhosDir, '.hvigor'),
      path.join(workOhosDir, 'build'),
      path.join(workOhosDir, '.cxx'),
      path.join(workOhosDir, 'entry', 'build'),
      path.join(workOhosDir, 'entry', '.cxx'),
    ];
    for (const cacheDir of cacheDirs) {
      if (fs.existsSync(cacheDir)) {
        const relName = path.relative(workOhosDir, cacheDir).split(path.sep).join('/');
        try {
          fs.rmSync(cacheDir, { recursive: true, force: true });
          await appendFile(stdoutPath, `  清除 ${relName}/\n`);
        } catch (e) {
          await appendFile(stdoutPath, `  跳过 ${relName}/（${e.message}）\n`);
        }
      }
    }

    // 第 4 步：重新 hvigorw assembleHap，确保产物使用对齐后的签名
    await appendFile(stdoutPath, `[4/4] 重新编译 HAP (hvigorw assembleHap)\n`);
    console.log('hvigorw assembleHap 重 build（可能需要 1-3 分钟）...');
    const rebuildResult = rebuildHap(workOhosDir, {
      stdoutPath: rebuildStdoutPath,
      stderrPath: rebuildStderrPath,
    });
    const rebuildTail = (rebuildResult.stdout || '').slice(-1500);
    if (rebuildTail) await appendFile(stdoutPath, `  --- rebuild stdout (tail) ---\n${rebuildTail}\n`);
    if (rebuildResult.stderr) await appendFile(stderrPath, `--- rebuild stderr ---\n${rebuildResult.stderr}\n`);
    await appendFile(stdoutPath, `  exit=${rebuildResult.exitCode}, ${rebuildResult.durationMs}ms\n`);
    if (!rebuildResult.ok) {
      throw new Error(`hvigorw assembleHap 失败（exit=${rebuildResult.exitCode}, ${rebuildResult.durationMs}ms）`);
    }

    // 短路径副本场景：把 HAP 产物从副本拷回原路径，让下游 install + 报告用原始路径
    const workOutputsDir = path.join(workOhosDir, 'entry', 'build', 'default', 'outputs', 'default');
    let outputsDir = workOutputsDir;
    if (isCopy) {
      const origOutputsDir = path.join(realOhosDir, 'entry', 'build', 'default', 'outputs', 'default');
      try {
        fs.mkdirSync(origOutputsDir, { recursive: true });
        const haps = fs.existsSync(workOutputsDir)
          ? fs.readdirSync(workOutputsDir).filter((f) => f.endsWith('.hap'))
          : [];
        for (const h of haps) {
          fs.copyFileSync(path.join(workOutputsDir, h), path.join(origOutputsDir, h));
        }
        await appendFile(stdoutPath, `[short-path] 已把 ${haps.length} 个 HAP 从副本拷回 ${origOutputsDir}\n`);
      } catch (e) {
        await appendFile(stderrPath, `[short-path] HAP 回拷失败: ${e.message}\n`);
      }
      outputsDir = origOutputsDir;
    }

    // 找 signed HAP（不接受 unsigned）
    signedHap = findSignedHap(outputsDir);
    if (!signedHap) {
      const anyHap = findAnyHap(outputsDir);
      const hint = anyHap
        ? `hvigor 编译完成但未产出 signed HAP（仅有 ${path.basename(anyHap)}，签名未生效——检查 signingConfigs 与密码材料是否匹配）`
        : `hvigor 编译完成但 outputs 目录无任何 HAP（${outputsDir}）`;
      throw new Error(`未找到 signed HAP: ${hint}`);
    }
    result.output_hap = rel(repoPath, signedHap);
    await appendFile(stdoutPath, `找到 signed HAP: ${signedHap}\n`);
    console.log(`✓ signed HAP: ${path.basename(signedHap)}`);
    } finally {
      // 短路径副本用完即清（无论 rebuild 成功失败），避免遗留 GB 级临时文件
      cleanupRebuildWorkDir(copyRoot, stdoutPath);
    }

    // 安装到设备
    const targets = Array.isArray(device.targets) ? device.targets : [];
    const targetLabel = targets.length > 1 ? `${targets.length} 台设备 (${targets.join(', ')})` : (targets[0] || '默认设备');
    console.log(`安装 example_auto HAP 到 ${targetLabel}: ${signedHap}`);
    await appendFile(stdoutPath, `安装 HAP 到 ${targetLabel}: ${signedHap}\n`);
    let installs;
    try {
      installs = installHapToAllTargets(signedHap, device.hdc, targets);
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
  // 定位 ohos/example_auto 实际所在目录（plugin-root）。
  // 扁平仓库：ohos/ 在仓库根 → pluginRoot = repoPath。
  // Lerna/yarn monorepo：ohos/ 在 packages/<pkg>/ 下 → pluginRoot = packages/<pkg>。
  // 兜底：读 .rnohos-junction.json 的 real 字段（coding 阶段记录的 plugin-root 真实路径）。
  const probed = [path.join(repoPath, 'ohos', 'example_auto')];
  let exampleDir = probed[0];
  if (!fs.existsSync(exampleDir)) {
    exampleDir = '';
    // monorepo：扫 packages/*/ohos/example_auto
    const packagesDir = path.join(repoPath, 'packages');
    if (fs.existsSync(packagesDir) && fs.statSync(packagesDir).isDirectory()) {
      let entries = [];
      try { entries = fs.readdirSync(packagesDir, { withFileTypes: true }); } catch {}
      for (const entry of entries) {
        if (!entry.isDirectory()) continue;
        const candidate = path.join(packagesDir, entry.name, 'ohos', 'example_auto');
        probed.push(candidate);
        if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
          exampleDir = candidate;
          break;
        }
      }
    }
    // 兜底：.rnohos-junction.json 的 real 字段
    if (!exampleDir) {
      for (const name of ['.rnohos-junction.json', '.rn-ohos-junction.json']) {
        const jf = path.join(repoPath, name);
        if (!fs.existsSync(jf)) continue;
        try {
          const j = JSON.parse(fs.readFileSync(jf, 'utf8'));
          if (j && typeof j.real === 'string') {
            const candidate = path.join(j.real, 'ohos', 'example_auto');
            probed.push(candidate);
            if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
              exampleDir = candidate;
              break;
            }
          }
        } catch { /* ignore */ }
      }
    }
  }
  if (!exampleDir) {
    return { exampleDir: '', ohosDir: '', appJson5: '', probed };
  }
  // RN 项目的鸿蒙工程根可能在 example_auto/ 或 example_auto/harmony/ 或 example_auto/ohos/
  const ohosCandidates = [
    exampleDir,
    path.join(exampleDir, 'harmony'),
    path.join(exampleDir, 'ohos'),
  ];
  let ohosDir = '';
  for (const candidate of ohosCandidates) {
    if (fs.existsSync(path.join(candidate, 'build-profile.json5'))) {
      ohosDir = candidate;
      break;
    }
  }
  const appJson5 = ohosDir ? path.join(ohosDir, 'AppScope', 'app.json5') : '';
  return {
    exampleDir,
    ohosDir,
    appJson5: appJson5 && fs.existsSync(appJson5) ? appJson5 : '',
    probed,
  };
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
  const isWin = process.platform === 'win32';
  const candidates = isWin
    ? [
        { executable: 'droidrun.exe', argsPrefix: [] },
        { executable: 'droidrun.cmd', argsPrefix: [] },
        { executable: 'droidrun.bat', argsPrefix: [] },
        { executable: 'droidrun', argsPrefix: [] },
        { executable: 'py', argsPrefix: ['-3', '-m', 'droidrun'] },
        { executable: 'python', argsPrefix: ['-m', 'droidrun'] },
        { executable: 'python3', argsPrefix: ['-m', 'droidrun'] },
      ]
    : [
        { executable: 'droidrun', argsPrefix: [] },
        { executable: 'python3', argsPrefix: ['-m', 'droidrun'] },
        { executable: 'python', argsPrefix: ['-m', 'droidrun'] },
      ];

  const absoluteCandidate = await resolveDroidRunFromPythonScripts();
  if (absoluteCandidate) {
    candidates.unshift({ ...absoluteCandidate, trusted: true });
  }

  // pipx 安装路径兜底（常见于 Windows 用户通过 pipx 安装 droidrun）
  const pipxCandidate = await resolveDroidRunFromPipx();
  if (pipxCandidate) {
    candidates.unshift({ ...pipxCandidate, trusted: true });
  }

  // 用户显式指定（最高优先级）
  const envOverride = process.env.DROIDRUN_BIN;
  if (envOverride && fs.existsSync(envOverride)) {
    candidates.unshift({ executable: envOverride, argsPrefix: [], trusted: true });
  }

  const attempts = [];
  for (const candidate of candidates) {
    const probe = await runProbe(candidate.executable, [...candidate.argsPrefix, '--version']);
    // Windows 控制台 shim (pipx 安装) 通过 spawn 调用时可能返回 code=null，
    // 但 stdout 中实际包含了版本输出，因此做兜底判定。
    const combinedOutput = `${probe.stdout || ''}\n${probe.stderr || ''}`;
    const hasOutput = combinedOutput.trim().length > 0;
    const looksLikeVersion = /v?\d+\.\d+(?:\.\d+)?/.test(combinedOutput);
    const ok = probe.code === 0
      || (probe.code === null && hasOutput)
      || (probe.code !== 0 && looksLikeVersion);
    if (ok) {
      return {
        ...candidate,
        version: (probe.stdout || probe.stderr || '').trim().split('\n')[0] || '',
      };
    }
    attempts.push(
      `  - ${formatCommand(candidate.executable, [...candidate.argsPrefix, '--version'])} -> code=${probe.code}${probe.stderr ? `, stderr=${probe.stderr.trim().split('\n')[0]}` : ''}`
    );

    // 绝对路径候选（env / pipx / python scripts dir）即使探测失败也信任：
    // 文件确实存在且可执行，正式跑用例时 runProcess() 会正确管道化 stdio。
    if (candidate.trusted && fs.existsSync(candidate.executable)) {
      console.error(
        `DroidRun 探测 --version 未拿到输出（code=${probe.code}），但路径存在，已信任该候选: ${candidate.executable}`
      );
      return {
        executable: candidate.executable,
        argsPrefix: candidate.argsPrefix,
        version: '',
      };
    }
  }
  if (attempts.length) {
    console.error('DroidRun 探测详情:');
    for (const line of attempts) console.error(line);
    console.error('提示：可设置环境变量 DROIDRUN_BIN 指向 droidrun 可执行文件以跳过自动探测。');
  }
  return null;
}

async function resolveDroidRunFromPythonScripts() {
  const pythonCandidates = process.platform === 'win32'
    ? [
        { exe: 'py', args: ['-3'] },
        { exe: 'python', args: [] },
        { exe: 'python.exe', args: [] },
      ]
    : [
        { exe: 'python3', args: [] },
        { exe: 'python', args: [] },
      ];
  const expr = "import sys,sysconfig,os;p=sysconfig.get_path('scripts');n='droidrun.exe' if os.name=='nt' else 'droidrun';f=os.path.join(p,n);print(f if os.path.exists(f) else '')";
  for (const py of pythonCandidates) {
    const probe = await runProbe(py.exe, [...py.args, '-c', expr]);
    if (probe.code !== 0) continue;
    const fullPath = (probe.stdout || '').trim().split(/\r?\n/).pop();
    if (fullPath && fs.existsSync(fullPath)) {
      return { executable: fullPath, argsPrefix: [] };
    }
  }
  return null;
}

async function resolveDroidRunFromPipx() {
  // pipx 默认安装路径
  const candidates = process.platform === 'win32'
    ? [
        path.join(os.homedir(), '.local', 'bin', 'droidrun.exe'),
        path.join(os.homedir(), '.local', 'bin', 'droidrun.cmd'),
        path.join(os.homedir(), 'AppData', 'Roaming', 'Python', 'Python312', 'Scripts', 'droidrun.exe'),
      ]
    : [
        path.join(os.homedir(), '.local', 'bin', 'droidrun'),
      ];
  for (const p of candidates) {
    if (fs.existsSync(p)) {
      return { executable: p, argsPrefix: [] };
    }
  }
  return null;
}

function runProbe(executable, args) {
  return new Promise((resolve) => {
    let stdout = '';
    let stderr = '';
    let proc;
    try {
      proc = spawnSmart(executable, args, {
        stdio: ['ignore', 'pipe', 'pipe'],
        env: process.env,
        forceShellOnWin: true,
      });
    } catch (error) {
      resolve({ code: 127, stdout: '', stderr: error.message });
      return;
    }
    let killTimer = null;
    const softKill = setTimeout(() => {
      try { proc.kill('SIGTERM'); } catch {}
      killTimer = setTimeout(() => {
        try { proc.kill('SIGKILL'); } catch {}
      }, 3000);
    }, 20000);
    proc.stdout.on('data', (chunk) => { stdout += chunk.toString(); });
    proc.stderr.on('data', (chunk) => { stderr += chunk.toString(); });
    proc.on('error', (error) => {
      clearTimeout(softKill);
      if (killTimer) clearTimeout(killTimer);
      resolve({ code: 127, stdout, stderr: stderr || error.message });
    });
    proc.on('close', (code) => {
      clearTimeout(softKill);
      if (killTimer) clearTimeout(killTimer);
      resolve({ code, stdout, stderr });
    });
  });
}

function spawnSmart(executable, args, options) {
  const { forceShellOnWin, ...rest } = options || {};
  const opts = { windowsHide: true, ...rest };
  if (process.platform !== 'win32') {
    return spawn(executable, args, opts);
  }
  const lower = String(executable).toLowerCase();
  const needsShell = forceShellOnWin
    || lower.endsWith('.cmd')
    || lower.endsWith('.bat')
    || lower.endsWith('.ps1')
    || !/\.[a-z0-9]+$/i.test(lower);
  if (!needsShell) {
    return spawn(executable, args, opts);
  }
  const quote = (part) => {
    const s = String(part);
    if (s === '') return '""';
    return /[\s"&|<>^()%!]/.test(s) ? `"${s.replace(/"/g, '\\"')}"` : s;
  };
  const cmdline = [quote(executable), ...(args || []).map(quote)].join(' ');
  return spawn(cmdline, { ...opts, shell: true });
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
    error: run.code === 0 ? '' : (summary.failureReasons && summary.failureReasons.length > 0
      ? summary.failureReasons.join('; ').slice(0, 500)
      : filterUsefulErrorLine(run.stderrTail || run.stdoutTail)),
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

async function resolvePythonCmd() {
  const isWin = process.platform === 'win32';
  const candidates = isWin
    ? ['python.exe', 'python', 'py.exe', 'py']
    : ['python3', 'python'];
  for (const cmd of candidates) {
    try {
      const result = await new Promise((resolve) => {
        const proc = spawn(cmd, ['--version'], { stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true, shell: isWin });
        let out = '';
        proc.stdout.on('data', (d) => { out += d; });
        proc.stderr.on('data', (d) => { out += d; });
        proc.on('error', () => resolve({ ok: false }));
        proc.on('close', (code) => resolve({ ok: code === 0, out }));
      });
      if (result.ok) return cmd;
    } catch {}
  }
  return 'python';
}

function runProcess(executable, args, options) {
  return new Promise((resolve) => {
    const flags = options.append ? 'a' : 'w';
    const stdoutStream = fs.createWriteStream(options.stdoutPath, { flags });
    const stderrStream = fs.createWriteStream(options.stderrPath, { flags });
    let stdoutTail = '';
    let stderrTail = '';
    let settled = false;
    const isWin = process.platform === 'win32';
    const lower = String(executable).toLowerCase();
    const needsShell = isWin && (
      lower.endsWith('.cmd') || lower.endsWith('.bat') || lower.endsWith('.ps1')
      || !/\.[a-z0-9]+$/i.test(lower)
    );
    const spawnOpts = {
      cwd: options.cwd,
      env: { ...process.env, ...(options.env || {}) },
      stdio: ['ignore', 'pipe', 'pipe'],
      windowsHide: true,
    };
    let proc;
    if (needsShell) {
      const quote = (part) => {
        const s = String(part);
        if (s === '') return '""';
        return /[\s"&|<>^()%!]/.test(s) ? `"${s.replace(/"/g, '\\"')}"` : s;
      };
      const cmdline = [quote(executable), ...(args || []).map(quote)].join(' ');
      proc = spawn(cmdline, { ...spawnOpts, shell: true });
    } else {
      proc = spawn(executable, args, spawnOpts);
    }

    // 杀整个进程树：shell:true 时 proc.pid 是 cmd.exe 的 PID，
    // 必须用 /T 递归杀掉它派生的 droidrun/python 等孙进程，否则成孤儿持有文件句柄。
    function killTree() {
      if (!proc || !proc.pid) return;
      try {
        if (isWin) {
          execFileSync('taskkill', ['/F', '/T', '/PID', String(proc.pid)], { stdio: 'ignore' });
        } else {
          try { proc.kill('SIGTERM'); } catch {}
          try { execFileSync('pkill', ['-P', String(proc.pid)], { stdio: 'ignore' }); } catch {}
        }
      } catch {}
    }

    // 单个 module suite 超时（默认 15 分钟）：droidrun 内部 LLM 调用卡死或子进程异常时
    // Promise 永远 pending，stage executor 强杀 Node 后孙进程成孤儿。超时主动杀树兜底。
    const timeoutMs = options.timeoutMs || 15 * 60 * 1000;
    const timer = setTimeout(() => {
      if (settled) return;
      killTree();
      const msg = `\n[runProcess timeout] ${timeoutMs / 1000}s reached, killed process tree (pid=${proc.pid})\n`;
      stderrStream.write(msg);
      stderrTail = appendTail(stderrTail, msg);
      // 给 close 事件一点时间触发；若 5 秒后仍未 close，强制 resolve
      setTimeout(() => {
        if (settled) return;
        settled = true;
        stdoutStream.end();
        stderrStream.end();
        resolve({ code: 124, stdoutTail, stderrTail });
      }, 5000);
    }, timeoutMs);
    timer.unref?.();

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
      if (settled) return;
      settled = true;
      clearTimeout(timer);
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
    if (counted.total > 0) {
      counted.failureReasons = collectFailureReasons(report);
      return counted;
    }
  } catch {}
  return fallbackSummary(testCaseCount, exitCode);
}

/**
 * 从 DroidRun report.json 提取失败用例的真实失败原因。
 *
 * DroidRun report 格式：results[].{ success, reason, error, failed_phase }
 * 优先读 reason（DroidRun AI 生成的失败分析），其次 error，兜底 message。
 */
function collectFailureReasons(value) {
  const reasons = [];
  const seen = new Set();
  function visit(node) {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) { node.forEach(visit); return; }

    // DroidRun 标准格式：success=false + reason
    if ('success' in node && node.success === false) {
      const id = node.id ?? node.case_id ?? node.name ?? node.title ?? '(unknown)';
      if (!seen.has(id)) {
        seen.add(id);
        const reason = node.reason || node.error || node.message || '(no reason)';
        reasons.push(`${id}: ${String(reason).slice(0, 200)}`);
      }
    }
    // 兼容其他格式：status = failed
    const status = node.status ?? node.result ?? node.outcome;
    if (status && ['fail', 'failed', 'error'].includes(String(status).toLowerCase())) {
      const id = node.case_id ?? node.id ?? node.name ?? node.title ?? '(unknown)';
      if (!seen.has(id)) {
        seen.add(id);
        const reason = node.reason || node.error || node.message || '(no reason)';
        reasons.push(`${id}: ${String(reason).slice(0, 200)}`);
      }
    }

    for (const child of Object.values(node)) visit(child);
  }
  visit(value);
  return reasons;
}

/**
 * 从 stderr/stdout 提取有用的错误行（过滤遥测/SSL 噪音）。
 * 作为 collectFailureReasons 的 fallback（report.json 不存在或没有失败用例时）。
 */
function filterUsefulErrorLine(text) {
  const lines = String(text || '').split('\n').map(s => s.trim()).filter(Boolean);
  const useful = lines.find(l =>
    !/posthog|SSLError|uploading|urllib3|ConnectionPool|Max retries exceeded/i.test(l)
  );
  return useful || lines[0] || '';
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

    const statusValue = node.status ?? node.result ?? node.outcome
      ?? (node.success === true ? 'passed' : node.success === false ? 'failed' : null);
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

module.exports = { run: main };

if (require.main === module) {
  main();
}
