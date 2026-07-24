#!/usr/bin/env node
/**
 * adapt-workflow 门禁（testing / example-gen 阶段，pre-run）：
 * gate_script 在阶段【开始前】运行，此时 HAP 尚未编译，因此本门禁只做前置校验：
 * 0. 若 templates 未 init-template，自动执行 rn.py init-template（与 coding 一致）
 * 1. 校验 DevEco 工具链可解析（node / java / hvigorw）
 * 2. 校验前置产物存在：.ohos-adaptation/03-coding-library.json（testing 依赖 coding 输出）
 * 3.（仅 Windows）校验 opencode.json 的 permission.external_directory 含当前盘符 X:/rn/** 放行
 *
 * 注意：example 静态检查（check_example_static.py，白屏/漏注册/HAP 完整性）由 `rn.py build hap`
 * 在 HAP 编译后自动运行并硬失败（见 lib/build_hap.py 的 _post_build_static_check），
 * 那是「产物级」硬门禁，本脚本是「前置级」早失败门禁，二者互补。
 *
 * 用法：node gate-testing.js <repoPath>
 */
const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');

const repoPath = process.argv[2] || process.env.ADAPT_REPO;
if (!repoPath) {
  console.error('缺少仓库路径（argv[2] 或 ADAPT_REPO）');
  process.exit(1);
}

const agentRoot = process.env.AGENT_ROOT || path.resolve(__dirname, '..');
const skillRoot = path.join(agentRoot, '.claude', 'skills', 'tool-ohos-plugin-repo');
const templatesDir = path.join(skillRoot, 'templates');
const rnPy = path.join(skillRoot, 'tool', 'rn.py');

function gateLog(msg) {
  process.stdout.write(`[gate-testing] ${msg}\n`);
}

function whereFirst(cmd) {
  try {
    const out = execSync(`where ${cmd}`, {
      encoding: 'utf8',
      windowsHide: true,
      maxBuffer: 1024 * 1024,
    });
    const line = out
      .split(/\r?\n/)
      .map((l) => l.trim())
      .find(Boolean);
    return line || null;
  } catch {
    return null;
  }
}

function resolvePython() {
  if (process.env.PYTHON) return process.env.PYTHON;
  if (process.env.PYTHON3) return process.env.PYTHON3;
  if (process.platform === 'win32') {
    return whereFirst('python') || whereFirst('py') || 'python';
  }
  return 'python3';
}

function listMissingTemplateMarkers() {
  if (!fs.existsSync(templatesDir)) {
    return [];
  }
  const specs = [
    { parent: 'example', marker: 'node_modules' },
    { parent: path.join('example', 'harmony'), marker: 'oh_modules' },
    { parent: 'har_wrapper', marker: 'oh_modules' },
    { parent: 'ohos', marker: 'node_modules' },
  ];
  const missing = [];
  for (const { parent, marker } of specs) {
    const base = path.join(templatesDir, parent);
    if (!fs.existsSync(base)) continue;
    if (!fs.existsSync(path.join(base, marker))) {
      missing.push(`${parent}/${marker}`);
    }
  }
  return missing;
}

function loadDevecoToolchainModule() {
  const ws = process.env.WORKSPACE_ROOT || path.resolve(agentRoot, '..');
  const modPath = path.join(ws, 'adapt-workflow', 'lib', 'deveco-toolchain.js');
  if (!fs.existsSync(modPath)) return null;
  return require(modPath);
}

function loadRnOhosScopeModule() {
  const ws = process.env.WORKSPACE_ROOT || path.resolve(agentRoot, '..');
  const modPath = path.join(ws, 'adapt-workflow', 'lib', 'rn-ohos-npm-scope.js');
  if (!fs.existsSync(modPath)) return null;
  return require(modPath);
}

function gateProcessEnv() {
  const deveco = loadDevecoToolchainModule();
  const rnScope = loadRnOhosScopeModule();
  let base = { ...process.env, AGENT_ROOT: agentRoot };
  if (rnScope) {
    base = { ...base, ...rnScope.buildRnOhosToolEnv() };
  }
  return deveco ? deveco.buildDevecoToolEnv(base) : base;
}

function runStreaming(cmd, args, opts) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { ...opts, stdio: ['ignore', 'pipe', 'pipe'] });
    child.stdout.on('data', (chunk) => process.stdout.write(chunk));
    child.stderr.on('data', (chunk) => process.stderr.write(chunk));
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`退出码 ${code}`));
    });
  });
}

async function ensureInitTemplate() {
  const missing = listMissingTemplateMarkers();
  if (missing.length === 0) return;
  if (!fs.existsSync(rnPy)) {
    console.error(`[gate-testing] templates 未初始化，且找不到 rn.py: ${rnPy}`);
    process.exit(1);
  }
  const python = resolvePython();
  gateLog(`检测到 templates 依赖缺失: ${missing.join(', ')}`);
  gateLog(`正在自动运行: ${python} ${path.relative(skillRoot, rnPy)} init-template（可能需数分钟）…`);
  try {
    await runStreaming(python, [rnPy, 'init-template'], { cwd: skillRoot, env: gateProcessEnv() });
  } catch (e) {
    console.error(`[gate-testing] init-template 失败: ${e.message}`);
    process.exit(1);
  }
  const stillMissing = listMissingTemplateMarkers();
  if (stillMissing.length > 0) {
    console.error(`[gate-testing] init-template 已结束，但仍有缺失: ${stillMissing.join(', ')}`);
    process.exit(1);
  }
  gateLog('init-template 完成');
}

function checkCodingPrerequisite() {
  // testing / example-gen 依赖 coding-library 阶段产物
  const prod = path.join(repoPath, '.ohos-adaptation', '03-coding-library.json');
  if (!fs.existsSync(prod)) {
    console.error(
      '鸿蒙测试门禁（testing/example-gen）：缺少前置产物 .ohos-adaptation/03-coding-library.json。\n' +
        '  请先完成 coding-library 阶段（产出库 HAR 与 03 产物）再进入本阶段。'
    );
    process.exit(1);
  }
  gateLog('前置产物检查通过（03-coding-library.json 存在）');
}

async function main() {
  await ensureInitTemplate();

  const devecoMod = loadDevecoToolchainModule();
  if (!devecoMod) {
    console.error(
      '[gate-testing] 未找到 adapt-workflow/lib/deveco-toolchain.js，无法校验 DevEco 工具链。' +
        '请确认在完整 monorepo 下运行，或设置 WORKSPACE_ROOT 指向仓库根目录。'
    );
    process.exit(1);
  }

  const validation = devecoMod.validateDevecoToolchain();
  if (!validation.ok) {
    console.error(
      '鸿蒙测试门禁（testing/example-gen）：DevEco Studio 工具链不可用。\n' +
        validation.errors.map((s) => `  - ${s}`).join('\n')
    );
    process.exit(1);
  }
  gateLog('DevEco 工具链检查通过');

  checkCodingPrerequisite();

  if (process.platform !== 'win32') {
    return;
  }

  const opencodePath = path.join(agentRoot, 'opencode.json');
  if (!fs.existsSync(opencodePath)) {
    console.error(`agent root 目录缺少 opencode.json: ${opencodePath}`);
    process.exit(1);
  }

  let data;
  try {
    data = JSON.parse(fs.readFileSync(opencodePath, 'utf8'));
  } catch (e) {
    console.error(`opencode.json 解析失败: ${e.message}`);
    process.exit(1);
  }

  const ext = data.permission && data.permission.external_directory;
  if (!ext || typeof ext !== 'object') {
    console.error('opencode.json 缺少 permission.external_directory');
    process.exit(1);
  }

  const resolved = path.resolve(repoPath);
  const driveMatch = /^([a-zA-Z]):/.exec(resolved.replace(/\\/g, '/'));
  if (!driveMatch) {
    return;
  }

  const letter = driveMatch[1].toUpperCase();
  const L = letter.toLowerCase();
  const keys = Object.keys(ext);

  function rnDriveKeyMatches(key) {
    const k = String(key).replace(/\\/g, '/').toLowerCase();
    if (k.startsWith(`${L}:/rn`)) return true;
    return k.startsWith(`/${L}/rn`);
  }

  if (!keys.some((k) => rnDriveKeyMatches(k))) {
    console.error(
      `permission.external_directory 须含当前盘符下 rn 放行项（OpenCode / Git Bash 会校验为 /${L}/rn/... 形式），例如 ` +
        `"${letter}:/rn/**": "allow" 与 "/${L}/rn/**": "allow"。请编辑 agent-rn/opencode.json 并同步仓库根 opencode.json。`
    );
    process.exit(1);
  }
  gateLog(`external_directory 盘符放行检查通过 (${letter}:)`);
}

main().catch((e) => {
  console.error(`[gate-testing] ${e.message}`);
  process.exit(1);
});
