#!/usr/bin/env node
'use strict';

/**
 * 将 monorepo 内 adapt-workflow/data/signing.local.json 同步到插件
 * example/ohos/build-profile.json5 的 app.signingConfigs，使 hvigor 在
 * flutter build hap 时由 hvigor 直接产出可安装签名包。
 *
 * 用法：
 *   node adapt-workflow/bin/ohos-sync-build-profile.js [--mode=apply|strip] [--cwd=<repoOrExample>] [--ohos=<path/to/example/ohos>]
 *
 *   apply（默认）— 写入 signingConfigs + 同步 AppScope/app.json5 的 bundleName
 *   strip       — 清空 signingConfigs 为 []，提交前脱敏
 */

const path = require('path');
const { applySigningToBuildProfile, stripSigningFromBuildProfile } = require('../lib/ohos-sign/build-profile-sync');

function parseArgs(argv) {
  const out = { mode: 'apply', cwd: process.cwd(), ohos: null, profile: null, help: false };
  for (const a of argv.slice(2)) {
    if (a.startsWith('--mode=')) out.mode = a.slice(7);
    else if (a.startsWith('--cwd=')) out.cwd = path.resolve(a.slice(6));
    else if (a.startsWith('--ohos=')) out.ohos = path.resolve(a.slice(7));
    else if (a.startsWith('--profile=')) out.profile = a.slice(10);
    else if (a === '-h' || a === '--help') out.help = true;
  }
  return out;
}

function usage() {
  console.log(`ohos-sync-build-profile
  --mode=apply|strip   默认 apply；strip 将 signingConfigs 清空为 []
  --cwd=<dir>          插件仓库根（含 example/）或 example 目录；默认当前目录
  --ohos=<dir>         直接指定 example/ohos（或 harmony）目录
`);
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    usage();
    process.exit(0);
  }
  if (args.mode !== 'apply' && args.mode !== 'strip') {
    console.error(`未知 --mode=${args.mode}`);
    usage();
    process.exit(1);
  }
  try {
    if (args.mode === 'strip') {
      const r = stripSigningFromBuildProfile({ cwd: args.cwd, explicitOhos: args.ohos });
      console.log(`[ohos-sync-build-profile] strip OK: ${r.buildProfile}`);
      process.exit(0);
    }
    const r = applySigningToBuildProfile({ cwd: args.cwd, explicitOhos: args.ohos, profileId: args.profile });
    console.log(`[ohos-sync-build-profile] apply OK: ${r.buildProfile}`);
    if (r.signingConfigsWritten) console.log('  signingConfigs 已写入');
    else console.log('  signingConfigs 未变化（内容与现有一致）');
    const b = r.bundleName;
    if (b.changed) {
      console.log(`  bundleName: ${b.previous} → (已对齐 signing.local) (${b.path})`);
    } else if (b.path) {
      console.log(`  bundleName: 无需修改 (${b.path})`);
    } else {
      console.log(`  bundleName: 跳过 (${b.skipped || '无 app.json5'})`);
    }
    process.exit(0);
  } catch (e) {
    console.error(`[ohos-sync-build-profile] 失败: ${e.message}`);
    process.exit(2);
  }
}

main();
