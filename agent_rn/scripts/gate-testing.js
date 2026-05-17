#!/usr/bin/env node
/**
 * adapt-workflow 门禁（Windows）：
 * 1. 校验 `where node` / `where java` / `where hvigorw` 的首条路径是否在 DevEco Studio 安装目录下。
 * 2. 校验克隆仓库根 opencode.json 中 permission.external_directory 是否包含当前盘符的 X:/rn/** 放行。
 * 非 Windows：直接成功。
 *
 * 用法：node gate-testing-windows-rn.js <repoPath>
 * 成功：exit 0；失败：exit 1，原因输出到 stderr
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const repoPath = process.argv[2] || process.env.ADAPT_REPO;
if (!repoPath) {
  console.error('缺少仓库路径（argv[2] 或 ADAPT_REPO）');
  process.exit(1);
}

if (process.platform !== 'win32') {
  process.exit(0);
}

/** `where` 输出首条可执行路径（PATH 顺序第一条） */
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

function pathIsUnderDevecoStudio(p) {
  if (!p) return false;
  const norm = p.replace(/\//g, '\\').toLowerCase();
  return norm.includes('deveco studio\\');
}

const devecoTools = [
  { name: 'node', cmd: 'node' },
  { name: 'java', cmd: 'java' },
  { name: 'hvigorw', cmd: 'hvigorw' },
];

const devecoIssues = [];
for (const { name, cmd } of devecoTools) {
  const first = whereFirst(cmd);
  if (!first) {
    devecoIssues.push(`${name}: 未在 PATH 中找到（where ${cmd} 无结果）`);
    continue;
  }
  if (!pathIsUnderDevecoStudio(first)) {
    devecoIssues.push(`${name}: 首条路径不在 DevEco Studio 下 — ${first}`);
  }
}

if (devecoIssues.length > 0) {
  console.error(
    '鸿蒙构建门禁：以下工具的首条 PATH 记录应指向 DevEco Studio 内置版本（示例：…\\Huawei\\DevEco Studio\\tools\\node、…\\jbr\\bin\\java、…\\tools\\hvigor\\bin\\hvigorw）。\n' +
      devecoIssues.map((s) => `  - ${s}`).join('\n') +
      '\n请在系统或用户环境变量中将 DevEco Studio 提供的 node、java、hvigor 置于 PATH 前列（或仅使用 DevEco 自带终端），保存后重启 IDE 再重试。'
  );
  process.exit(1);
}

const agentRoot = process.env.AGENT_ROOT || path.resolve(__dirname, '..');
const opencodePath = path.join(agentRoot, 'opencode.json');
if (!fs.existsSync(opencodePath)) {
  console.error(
    `agent root 目录缺少 opencode.json: ${opencodePath}`
  );
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
  process.exit(0);
}

const letter = driveMatch[1].toUpperCase();
const L = letter.toLowerCase();
const keys = Object.keys(ext);

/** Windows: D:/rn/**；Git Bash/MSYS: /d/rn/**（OpenCode 对 bash 工具校验常用此形式） */
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

const planningPath = path.join(repoPath, '.rn-ohos-adaptation', '02-planning.json');
const libraryPath = path.join(repoPath, 'ohos', 'harmony', 'library');

let isJsOnly = false;

if (fs.existsSync(planningPath)) {
  try {
    const planning = JSON.parse(fs.readFileSync(planningPath, 'utf8'));
    if (planning.target_module_types && planning.target_module_types.includes('js-only')) {
      isJsOnly = true;
    }
  } catch {}
}

if (!fs.existsSync(libraryPath) || !fs.statSync(libraryPath).isDirectory()) {
  isJsOnly = true;
}

let requiredPaths = [
  { name: 'ohos/example', type: 'dir', desc: 'example 目录' },
  { name: 'ohos/package.json', type: 'file', desc: 'ohos package.json' },
  { name: 'ohos/example/package.json', type: 'file', desc: 'example package.json' },
];

if (!isJsOnly) {
  requiredPaths.push(
    { name: 'ohos/harmony/library', type: 'dir', desc: 'library 目录' },
    { name: 'ohos/example/harmony', type: 'dir', desc: 'example harmony 目录' }
  );
}

const pathIssues = [];
for (const { name, type, desc } of requiredPaths) {
  const p = path.join(repoPath, name);
  let exists = false;
  if (type === 'dir') {
    exists = fs.existsSync(p) && fs.statSync(p).isDirectory();
  } else {
    exists = fs.existsSync(p) && fs.statSync(p).isFile();
  }
  if (!exists) {
    pathIssues.push(`${name}（${desc}）：不存在`);
  }
}

if (pathIssues.length > 0) {
  console.error(
    '前置门禁检查失败！\n检查结果：\n' +
      pathIssues.map((s) => `  - ❌ ${s}`).join('\n') +
      '\n\n请先完成 coding-library 阶段（或手动创建 ohos/example），再进入 testing 阶段。'
  );
  process.exit(1);
}

process.exit(0);
