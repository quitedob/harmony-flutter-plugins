#!/usr/bin/env node
/**
 * adapt-workflow 门禁（coding-library 阶段）：
 * 1. 若 templates 未 init-template，自动执行 rn.py init-template
 * 2. 校验能否在 DevEco Studio 安装目录下解析 node / java / hvigorw（全平台）
 * 3.（仅 Windows）校验 opencode.json 中 permission.external_directory 是否含当前盘符 X:/rn/** 放行
 *
 * 进度与 init-template 输出写到 stdout/stderr，供管理面板 SSE 实时展示。
 * 用法：node gate-coding.js <repoPath>
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
  process.stdout.write(`[gate-coding] ${msg}\n`);
}

/** `where` 输出首条可执行路径（仅 Windows 解析 python 用） */
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

/** 校验路径是否为可执行文件，若是则返回目录（Windows 下必要时自动补 .exe） */
function resolveExecutable(candidate) {
  if (!candidate) return null;
  try {
    if (fs.statSync(candidate).isFile()) return candidate;
    if (fs.statSync(candidate).isDirectory()) {
      if (process.platform === 'win32') {
        const exe = path.join(candidate, 'python.exe');
        if (fs.existsSync(exe)) return exe;
      }
    }
  } catch {}
  return null;
}

function resolvePython() {
  // 环境变量可能指向目录而非可执行文件，需校验
  const envResolved = resolveExecutable(process.env.PYTHON) || resolveExecutable(process.env.PYTHON3);
  if (envResolved) return envResolved;
  if (process.platform === 'win32') {
    // 优先用 py launcher（返回确切的 .exe），避免 where python 可能返回目录
    const pyLauncher = whereFirst('py');
    if (pyLauncher) return pyLauncher;
    const found = whereFirst('python');
    if (found) {
      const exe = resolveExecutable(found);
      if (exe) return exe;
    }
    return 'python';
  }
  return 'python3';
}

function checkPythonAvailable() {
  const python = resolvePython();
  try {
    execSync(`${python} --version`, {
      encoding: 'utf8',
      windowsHide: true,
      maxBuffer: 1024,
    });
    gateLog(`Python 可用: ${python}`);
  } catch (e) {
    console.error(`无法执行 Python: ${e.message}`);
    process.exit(1);
  }
}

/** 返回缺失的 templates 依赖标记，如 example/node_modules */
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

function templatesNeedInit() {
  return listMissingTemplateMarkers().length > 0;
}

function loadDevecoToolchainModule() {
  const ws =
    process.env.WORKSPACE_ROOT || path.resolve(agentRoot, '..');
  const modPath = path.join(ws, 'adapt-workflow', 'lib', 'deveco-toolchain.js');
  if (!fs.existsSync(modPath)) return null;
  return require(modPath);
}

function loadRnOhosScopeModule() {
  const ws =
    process.env.WORKSPACE_ROOT || path.resolve(agentRoot, '..');
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
    const child = spawn(cmd, args, {
      ...opts,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    child.stdout.on('data', (chunk) => process.stdout.write(chunk));
    child.stderr.on('data', (chunk) => process.stderr.write(chunk));
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`退出码 ${code}`));
    });
  });
}

/** 扫描指定目录及其子目录下的 node_modules，找出 0 字节的 package.json（npm 中断安装导致损坏） */
function findCorruptedPackageJsons(dir) {
  const corrupted = [];
  if (!fs.existsSync(dir)) return corrupted;
  function walk(currentDir) {
    if (!fs.existsSync(currentDir)) return;
    try {
      const entries = fs.readdirSync(currentDir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory()) {
          if (entry.name === 'node_modules' || entry.name.startsWith('.')) {
            // 跳过 node_modules 目录本身（只检查其下的包），跳过隐藏目录
          } else {
            const pkgPath = path.join(currentDir, entry.name, 'package.json');
            if (fs.existsSync(pkgPath)) {
              try {
                const stat = fs.statSync(pkgPath);
                if (stat.size === 0) {
                  corrupted.push(pkgPath);
                }
              } catch {}
            }
          }
          walk(path.join(currentDir, entry.name));
        }
      }
    } catch {}
  }
  // 专门扫描 templates 下的各个 node_modules 目录
  const nmDirs = [
    path.join(templatesDir, 'example', 'node_modules'),
    path.join(templatesDir, 'ohos', 'node_modules'),
  ];
  for (const nmDir of nmDirs) {
    walk(nmDir);
  }
  return corrupted;
}

/** 若 node_modules 中有 0 字节的 package.json，清理后触发重新 install */
function fixCorruptedNodeModules() {
  const corrupted = findCorruptedPackageJsons(templatesDir);
  if (corrupted.length === 0) return;
  gateLog(`检测到 ${corrupted.length} 个损坏的 package.json（0 字节），正在清理…`);
  // 对每个损坏文件所属的包，删除整个包目录（让 npm 重新安装）
  for (const pkgPath of corrupted) {
    try {
      const pkgDir = path.dirname(pkgPath);
      fs.rmSync(pkgDir, { recursive: true, force: true });
      gateLog(`已删除损坏目录: ${path.relative(templatesDir, pkgDir)}`);
    } catch {}
  }
  gateLog('损坏包已清理，后续 install 将重新下载');
}

async function ensureInitTemplate() {
  // 先检查并修复已存在但损坏的 node_modules（在 init-template 之前）
  fixCorruptedNodeModules();

  const missing = listMissingTemplateMarkers();
  if (missing.length === 0) {
    return;
  }
  if (!fs.existsSync(rnPy)) {
    console.error(`[gate-coding] templates 未初始化，且找不到 rn.py: ${rnPy}`);
    process.exit(1);
  }
  const python = resolvePython();
  gateLog(`检测到 templates 依赖缺失: ${missing.join(', ')}`);
  gateLog(`正在自动运行: ${python} ${path.relative(skillRoot, rnPy)} init-template（可能需数分钟）…`);
  try {
    await runStreaming(python, [rnPy, 'init-template'], {
      cwd: skillRoot,
      env: gateProcessEnv(),
    });
  } catch (e) {
    console.error(`[gate-coding] init-template 失败: ${e.message}`);
    process.exit(1);
  }
  const stillMissing = listMissingTemplateMarkers();
  if (stillMissing.length > 0) {
    console.error(
      `[gate-coding] init-template 已结束，但仍有缺失: ${stillMissing.join(', ')}`
    );
    process.exit(1);
  }
  gateLog('init-template 完成');
}

async function main() {
  checkPythonAvailable();

  await ensureInitTemplate();

  const devecoMod = loadDevecoToolchainModule();
  if (!devecoMod) {
    console.error(
      '[gate-coding] 未找到 adapt-workflow/lib/deveco-toolchain.js，无法校验 DevEco 工具链。' +
        '请确认在完整 monorepo 下运行，或设置 WORKSPACE_ROOT 指向仓库根目录。'
    );
    process.exit(1);
  }

  const validation = devecoMod.validateDevecoToolchain();
  if (!validation.ok) {
    console.error(
      '鸿蒙构建门禁（coding-library）：DevEco Studio 工具链不可用。\n' +
        validation.errors.map((s) => `  - ${s}`).join('\n')
    );
    process.exit(1);
  }
  gateLog('DevEco 工具链检查通过');

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

  const ok = keys.some((k) => rnDriveKeyMatches(k));

  if (!ok) {
    console.error(
      `permission.external_directory 须含当前盘符下 rn 放行项（OpenCode / Git Bash 会校验为 /${L}/rn/... 形式），例如 ` +
        `"${letter}:/rn/**": "allow" 与 "/${L}/rn/**": "allow"。请编辑 agent-rn/opencode.json 并同步仓库根 opencode.json。`
    );
    process.exit(1);
  }
  gateLog(`external_directory 盘符放行检查通过 (${letter}:)`);
}

main().catch((e) => {
  console.error(`[gate-coding] ${e.message}`);
  process.exit(1);
});
