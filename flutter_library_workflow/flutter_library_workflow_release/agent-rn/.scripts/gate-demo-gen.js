#!/usr/bin/env node
'use strict';

/**
 * adapt-workflow 门禁（demo-gen 阶段，RN-ohos profile 专用）：
 *
 * 角色：pre-run gate_script，在 primary-05-demo-gen agent 启动前执行。
 *
 * 1. 前置文件检查
 *    - ohos/example/                  RN 模板工程
 *    - .rn-ohos-adaptation/04-test-cases.json
 *    - .rn-ohos-adaptation/01-analysis-prd.md
 *    - .rn-ohos-adaptation/03-coding-library.json
 *
 * 2. 本机签名配置可用性检查
 *    - signing.rn.local.json 存在且字段齐全
 *    - 材料文件（cer / p7b / p12）实际存在
 *    失败则直接 gate fail，避免 agent 跑半天才报签名错。
 *
 * 3. 上次 demo-gen 产物的签名一致性诊断（warning，不 fail）
 *    - 若 ohos/example_auto/harmony/build-profile.json5 已存在
 *      （说明之前跑过 demo-gen 但没清），用 rn-check-hap-signing 检查
 *      并把结果打到 stdout。Agent 自己看着办（推荐重新拷贝模板覆盖）。
 *
 * 4. 重置 example_auto/harmony/build-profile.json5 的 signingConfig
 *    - 解决"上次 demo-gen agent 手改 build-profile 留下的脏状态"问题
 *    - 若 example_auto 已存在，把 signingConfigs 与 products.signingConfig
 *      强制对齐为 default，让本次 demo-gen 从干净态开始
 *
 * 用法：node gate-demo-gen.js <repoPath>
 * 退出码：0 = pass；非 0 = fail（stderr 会显示给用户）
 */

const fs = require('fs');
const path = require('path');

const repoPath = process.argv[2] || process.env.ADAPT_REPO;
if (!repoPath) {
  console.error('[gate-demo-gen] 缺少仓库路径（argv[2] 或 ADAPT_REPO）');
  process.exit(1);
}

const agentRoot = process.env.AGENT_ROOT || path.resolve(__dirname, '..');
const workspaceRoot = process.env.WORKSPACE_ROOT || path.resolve(agentRoot, '..');
const checkHapScript = path.join(workspaceRoot, 'adapt-workflow', 'bin', 'rn-check-hap-signing.js');

function gateLog(msg) {
  process.stdout.write(`[gate-demo-gen] ${msg}\n`);
}
function gateWarn(msg) {
  process.stderr.write(`[gate-demo-gen] WARN: ${msg}\n`);
}

const REQUIRED_FILES = [
  { path: ['ohos', 'example'], kind: 'dir', desc: 'RN example 模板工程' },
  { path: ['.rn-ohos-adaptation', '04-test-cases.json'], kind: 'file', desc: '测试用例清单' },
  { path: ['.rn-ohos-adaptation', '01-analysis-prd.md'], kind: 'file', desc: 'PRD 文档' },
  { path: ['.rn-ohos-adaptation', '03-coding-library.json'], kind: 'file', desc: '库实现结果' },
];

function checkPrerequisites() {
  const missing = [];
  for (const req of REQUIRED_FILES) {
    const full = path.join(repoPath, ...req.path);
    const exists = req.kind === 'dir' ? fs.existsSync(full) && fs.statSync(full).isDirectory() : fs.existsSync(full) && fs.statSync(full).isFile();
    if (!exists) {
      missing.push(`${path.join(...req.path)}（${req.desc}）`);
    }
  }
  if (missing.length > 0) {
    gateLog('前置文件检查: FAIL');
    for (const m of missing) gateLog(`  缺失: ${m}`);
    return false;
  }
  gateLog('前置文件检查: OK');
  return true;
}

function loadSigningModule() {
  const modPath = path.join(workspaceRoot, 'adapt-workflow', 'lib', 'ohos-sign', 'config.js');
  if (!fs.existsSync(modPath)) return null;
  try { return require(modPath); } catch { return null; }
}

function checkSigningConfig() {
  const mod = loadSigningModule();
  if (!mod || typeof mod.loadSigningConfig !== 'function') {
    gateWarn('ohos-sign/config.js 不可用，跳过签名配置检查（不阻塞）');
    return true;
  }
  try {
    const cfg = mod.loadSigningConfig('rn-ohos');
    gateLog(`签名配置 signing.rn.local.json: OK (bundleName=${cfg.bundleName})`);
    return true;
  } catch (e) {
    gateLog(`签名配置 signing.rn.local.json: FAIL`);
    gateLog(`  ${e.message}`);
    gateLog(`  请按 adapt-workflow/data/signing.example.json 复制为 signing.rn.local.json 并填入本机证书`);
    return false;
  }
}

function checkAndResetPriorExampleAuto() {
  const exampleAutoHarmony = path.join(repoPath, 'ohos', 'example_auto', 'harmony');
  const buildProfile = path.join(exampleAutoHarmony, 'build-profile.json5');
  if (!fs.existsSync(buildProfile)) {
    gateLog('上次 example_auto: 不存在，跳过签名重置');
    return true;
  }

  // 用 rn-check-hap-signing 的对齐函数把脏状态重置回 default
  let mod;
  try {
    mod = require(checkHapScript);
  } catch (e) {
    gateWarn(`无法加载 rn-check-hap-signing.js: ${e.message}（跳过重置）`);
    return true;
  }

  // 先报告当前状态（仅诊断，不 fail）
  try {
    const consistency = mod.checkSigningConsistency(buildProfile);
    if (consistency.ok) {
      gateLog('上次 example_auto 签名一致性: OK');
    } else {
      gateLog('上次 example_auto 签名一致性: 不一致（上次 demo-gen agent 留下的脏状态）');
      for (const p of consistency.problems) gateLog(`  - ${p}`);
    }
  } catch (e) {
    gateWarn(`读取上次 build-profile 失败: ${e.message}`);
  }

  // 主动对齐（idempotent）
  try {
    const r = mod.alignSigningConfigs(buildProfile);
    if (r.changed) {
      gateLog('已重置 example_auto/harmony/build-profile.json5:');
      for (const c of r.changes) gateLog(`  - ${c}`);
    } else {
      gateLog('example_auto build-profile 已对齐，无需重置');
    }
  } catch (e) {
    gateWarn(`重置 example_auto build-profile 失败: ${e.message}（不阻塞，agent 会重新生成）`);
  }
  return true;
}

function main() {
  gateLog(`repo: ${repoPath}`);
  gateLog(`agent root: ${agentRoot}`);
  gateLog(`workspace root: ${workspaceRoot}`);

  // 1. 前置文件
  if (!checkPrerequisites()) process.exit(2);

  // 2. 签名配置可用性（硬阻塞：没签名材料 demo-gen 跑下去也没意义）
  if (!checkSigningConfig()) process.exit(3);

  // 3. 上次产物诊断 + 重置（仅日志/告警，不阻塞）
  checkAndResetPriorExampleAuto();

  gateLog('PASS');
  process.exit(0);
}

main();
