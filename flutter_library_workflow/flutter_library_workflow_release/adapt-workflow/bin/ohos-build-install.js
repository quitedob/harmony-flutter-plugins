#!/usr/bin/env node
'use strict';

/**
 * ohos-build-install — sync build-profile → build →（可选）install。
 *
 * 签名仅通过 hvigor（build-profile.signingConfigs，由 ohos-sync-build-profile 写入）。
 * 不再使用 hap-sign-tool 对 unsigned HAP 做二次重签。
 *
 * 用法：
 *   node bin/ohos-build-install.js [--mode=all|build|install|check] [--cwd=<repoPath>] [--hap=<path.hap>]
 *
 * 退出码：
 *   0  成功
 *   2  配置/环境缺失或未产生可安装签名包（unsigned）
 *   3  编译失败
 *   5  安装失败
 *   1  其它错误
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const {
  loadSigningConfig, resolveHdcBin, resolveJavaBin,
  SigningConfigError,
  injectBundleName, findAppJson5,
  applySigningToBuildProfile,
  listHdcTargets, installHap, installHapToAllTargets
} = require('../lib/ohos-sign');

const EXIT = {
  OK: 0,
  CONFIG: 2,
  BUILD: 3,
  INSTALL: 5,
  OTHER: 1
};

// Module-level profile ID, set from --profile flag in main()
let _profileId = null;

function parseArgs(argv) {
  const out = { mode: 'all', cwd: process.cwd(), hap: null, profile: null };
  for (const a of argv.slice(2)) {
    if (a.startsWith('--mode=')) out.mode = a.slice(7);
    else if (a.startsWith('--cwd=')) out.cwd = path.resolve(a.slice(6));
    else if (a.startsWith('--hap=')) out.hap = path.resolve(a.slice(6));
    else if (a.startsWith('--profile=')) out.profile = a.slice(10);
    else if (a === '-h' || a === '--help') out.help = true;
  }
  return out;
}

function usage() {
  console.log(`ohos-build-install
  --mode=all|build|install|check  默认 all
  --cwd=<repoPath>                 插件仓库根（包含 example/）；默认 CWD
  --hap=<path.hap>                 install 时显式指定已签名的 .hap（可选）
`);
}

function logStep(title) {
  const bar = '─'.repeat(Math.max(0, 60 - title.length));
  console.log(`\n▶ ${title} ${bar}`);
}

function findExamplePath(repoPath) {
  const candidates = [
    path.join(repoPath, 'example', 'ohos'),
    path.join(repoPath, 'example', 'harmony'),
    // RN plugin convention
    path.join(repoPath, 'ohos', 'example', 'harmony')
  ];
  return candidates.find(p => fs.existsSync(p)) || null;
}

/** @returns {string[]} entry 默认产物目录下全部 .hap 绝对路径 */
function listOutputHapPaths(repoPath) {
  const exampleOhos = findExamplePath(repoPath);
  if (!exampleOhos) return [];
  const outDir = path.join(exampleOhos, 'entry', 'build', 'default', 'outputs', 'default');
  if (!fs.existsSync(outDir)) return [];
  return fs.readdirSync(outDir)
    .filter(f => f.endsWith('.hap'))
    .map(f => path.join(outDir, f));
}

function findUnsignedHap(repoPath) {
  const files = listOutputHapPaths(repoPath);
  const unsigned = files.find(f => /-unsigned\.hap$/i.test(path.basename(f)));
  if (unsigned) return unsigned;
  const non = files.filter(f => !/-signed\.hap$/i.test(path.basename(f)));
  if (non.length === 1) return non[0];
  return null;
}

/** 优先已签名 HAP（hvigor）；否则 unsigned；否则唯一/最新产物。 */
function findInstallableHap(repoPath) {
  const files = listOutputHapPaths(repoPath);
  if (files.length === 0) return null;
  const signed = files.filter(f => /-signed\.hap$/i.test(path.basename(f)));
  if (signed.length) {
    signed.sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
    return signed[0];
  }
  const unsigned = files.find(f => /-unsigned\.hap$/i.test(path.basename(f)));
  if (unsigned) return unsigned;
  if (files.length === 1) return files[0];
  files.sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
  return files[0];
}

function runFlutterBuild(repoPath) {
  const exampleDir = path.join(repoPath, 'example');
  if (!fs.existsSync(exampleDir)) {
    throw new Error(`example/ 不存在: ${exampleDir}`);
  }
  logStep(`flutter pub get (${exampleDir})`);
  let res = spawnSync('flutter', ['pub', 'get'], {
    cwd: exampleDir, stdio: 'inherit', env: process.env
  });
  if (res.status !== 0) throw Object.assign(new Error('flutter pub get 失败'), { exitCode: EXIT.BUILD });

  logStep(`flutter build hap --debug (${exampleDir})`);
  res = spawnSync('flutter', ['build', 'hap', '--debug'], {
    cwd: exampleDir, stdio: 'inherit', env: process.env
  });
  if (res.status !== 0) throw Object.assign(new Error('flutter build hap 失败'), { exitCode: EXIT.BUILD });
}

/**
 * 按需解析 hdc；缺 hdc 则 process.exit(CONFIG)。
 */
function mustLoadSigning(need = {}) {
  try {
    const cfg = loadSigningConfig(_profileId);
    const out = { cfg, hdcBin: null };
    if (need.hdc) {
      const hdc = resolveHdcBin(cfg);
      if (!hdc) {
        throw new SigningConfigError(
          `未找到 hdc。工具会先找 $HDC_BIN / PATH / DevEco Studio SDK toolchains；` +
          `也支持 signing.local.json.hdcBin 覆盖。`,
          'HDC_NOT_FOUND'
        );
      }
      out.hdcBin = hdc.path;
    }
    return out;
  } catch (err) {
    if (err instanceof SigningConfigError) {
      console.error(`[ohos-sign] ${err.message}`);
      process.exit(EXIT.CONFIG);
    }
    throw err;
  }
}

function modeCheck(repoPath) {
  const issues = [];
  const info = {};

  let cfg = null;
  try {
    cfg = loadSigningConfig(_profileId);
    info.bundleName = cfg.bundleName;
    info.signingMaterial = {
      certpath: cfg.signingMaterial.certpath,
      profile: cfg.signingMaterial.profile,
      storeFile: cfg.signingMaterial.storeFile,
      keyAlias: cfg.signingMaterial.keyAlias,
      signAlg: cfg.signingMaterial.signAlg
    };
  } catch (e) {
    issues.push(`signing config: ${e.message.split('\n')[0]}`);
  }
  // Extra hint: show the signing config file path even when it fails.
  try {
    const { resolveSigningFiles } = require('../lib/ohos-sign/config');
    info.signingConfigFile = resolveSigningFiles(_profileId).signingFile;
  } catch {
    // ignore
  }

  const hdc = resolveHdcBin(cfg || null);
  if (hdc) {
    info.hdc = hdc.path;
    info.hdcSource = hdc.source;
  } else {
    issues.push('hdc 未找到（已尝试 config / $HDC_BIN / PATH / DevEco SDK toolchains）');
  }

  const java = resolveJavaBin(cfg || null);
  if (java) {
    info.java = java.version;
    info.javaBin = java.path;
    info.javaSource = java.source;
  } else {
    issues.push('java 未找到（已尝试 config / $JAVA_HOME / DevEco JBR / PATH）');
  }

  if (repoPath) {
    const exampleOhos = findExamplePath(repoPath);
    if (exampleOhos) {
      info.exampleOhos = exampleOhos;
      info.appJson5 = findAppJson5(repoPath);
    }
  }

  console.log(JSON.stringify({ ok: issues.length === 0, issues, info }, null, 2));
  return issues.length === 0 ? EXIT.OK : EXIT.CONFIG;
}

function modeBuild(repoPath) {
  applySigningToBuildProfile({ cwd: repoPath, profileId: _profileId });
  const cfg = loadSigningConfig(_profileId);
  logStep(`build-profile 已同步，开始 flutter build hap`);
  runFlutterBuild(repoPath);
  injectBundleName(repoPath, cfg.bundleName);
  const installable = findInstallableHap(repoPath);
  const unsigned = findUnsignedHap(repoPath);
  console.log(JSON.stringify({
    mode: 'build',
    ok: true,
    bundleName: cfg.bundleName,
    outputHap: installable,
    unsignedHap: unsigned
  }, null, 2));
  return EXIT.OK;
}

function assertInstallableSignedHap(hap) {
  if (!hap) return '未找到 .hap 产物，请先成功执行 flutter build hap。';
  if (/-unsigned\.hap$/i.test(path.basename(hap))) {
    return (
      '产物仍为 unsigned HAP。请执行：node adapt-workflow/bin/ohos-sync-build-profile.js --mode=apply --cwd=<插件根>，' +
      '确认 signing.local.json 与 profile 一致后重新 flutter build hap。本工具不再提供 hap-sign-tool 重签。'
    );
  }
  return null;
}

function modeInstall(repoPath, hapOverride) {
  const { cfg, hdcBin } = mustLoadSigning({ hdc: true });
  const hap = hapOverride || findInstallableHap(repoPath);
  const err = assertInstallableSignedHap(hap);
  if (err) {
    console.error(`[ohos-sign] ${err}`);
    return EXIT.CONFIG;
  }

  const targets = listHdcTargets(hdcBin);
  if (!targets.available) {
    console.error(`[ohos-sign] 未检测到已连接的鸿蒙设备（${hdcBin} list targets）`);
    console.error(targets.raw || '');
    return EXIT.INSTALL;
  }
  const targetLabel = targets.targets.length > 1
    ? `${targets.targets.length} 台设备 (${targets.targets.join(', ')})`
    : (targets.targets[0] || '默认设备');
  logStep(`hdc install ${path.basename(hap)} -> ${targetLabel}`);
  let installed = [];
  try {
    const results = installHapToAllTargets(hap, hdcBin, targets.targets);
    for (const r of results) {
      const tag = r.target ? `[${r.target}] ` : '';
      if (r.stdout) console.log(`${tag}${r.stdout}`);
      if (r.stderr) console.error(`${tag}${r.stderr}`);
    }
    installed = results.map((r) => r.target).filter(Boolean);
  } catch (e) {
    console.error(`[ohos-sign] ${e.message}`);
    return EXIT.INSTALL;
  }
  console.log(JSON.stringify({
    mode: 'install', ok: true,
    hap, targets: targets.targets, installed_targets: installed,
    bundleName: cfg.bundleName,
    hdc: hdcBin
  }, null, 2));
  return EXIT.OK;
}

function modeAll(repoPath) {
  let code = modeBuild(repoPath);
  if (code !== EXIT.OK) return code;
  const hap = findInstallableHap(repoPath);
  const err = assertInstallableSignedHap(hap);
  if (err) {
    console.error(`[ohos-sign] ${err}`);
    return EXIT.CONFIG;
  }
  const hdc = resolveHdcBin(loadSigningConfig(_profileId));
  if (!hdc) {
    console.log(`[ohos-sign] 未找到 hdc，跳过 install（build 已完成）`);
    return EXIT.OK;
  }
  const hdcBin = hdc.path;
  const targets = listHdcTargets(hdcBin);
  if (!targets.available) {
    console.log(`[ohos-sign] 无设备连接，跳过 install（build 已完成）`);
    return EXIT.OK;
  }
  return modeInstall(repoPath, null);
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help) { usage(); process.exit(EXIT.OK); }
  _profileId = args.profile;

  const repoPath = path.resolve(args.cwd);
  if (!fs.existsSync(repoPath)) {
    console.error(`[ohos-sign] --cwd 指向的目录不存在: ${repoPath}`);
    process.exit(EXIT.OTHER);
  }

  try {
    let code;
    switch (args.mode) {
      case 'check':   code = modeCheck(repoPath); break;
      case 'build':   code = modeBuild(repoPath); break;
      case 'install': code = modeInstall(repoPath, args.hap); break;
      case 'all':     code = modeAll(repoPath); break;
      case 'resign':
        console.error('[ohos-sign] --mode=resign 已移除。请使用 ohos-sync-build-profile.js --mode=apply + hvigor 直签。');
        code = EXIT.OTHER;
        break;
      default:
        console.error(`未知 mode: ${args.mode}`); usage(); code = EXIT.OTHER;
    }
    process.exit(code);
  } catch (err) {
    const code = err && err.exitCode ? err.exitCode : EXIT.OTHER;
    console.error(`[ohos-sign] ${err && err.message ? err.message : err}`);
    process.exit(code);
  }
}

main();
