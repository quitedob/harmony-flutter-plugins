#!/usr/bin/env node

/**
 * sync-dep-version-map.js
 *
 * 从 usage-docs/zh-cn/*.md 的单库文档中解析版本兼容性表，
 * 生成 dep-version-map.json（RN 版本 → 鸿蒙化包精确版本映射）。
 *
 * 用法:
 *   cd agent-rn/.claude/skills/rn-adapted-library/_usage-docs/usage-docs && git pull
 *   node agent-rn/.claude/skills/rn-adapted-library/scripts/sync-dep-version-map.js
 */

const fs = require('fs');
const path = require('path');

// ── 路径 ──────────────────────────────────────────────────────────────────
const SKILL_ROOT = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(SKILL_ROOT, '_usage-docs/usage-docs/zh-cn');
const ADAPTED_JSON = path.join(SKILL_ROOT, 'references/adapted-libraries.json');
const OUT_PATH = path.join(SKILL_ROOT, 'references/dep-version-map.json');

// ── 静态数据 ─────────────────────────────────────────────────────────────
// RNOH 各版本线的最新版本（从 npm view @react-native-oh/react-native-harmony 获取）
const RNOH_VERSIONS = {
  '0.72': { rnoh: '0.72.140', react_native: '0.72.5' },
  '0.77': { rnoh: '0.77.71', react_native: '0.77.1' },
  '0.82': { rnoh: '0.82.30', react_native: '0.82.1' },
};

const SUPPORTED_RN = Object.keys(RNOH_VERSIONS);

// 手动补充：部分库需要同时安装原始包（dual_install），
// 从文档安装说明中提取。key = original_name (lowercase)
const DUAL_INSTALL_LIBS = new Set([
  'react-native-reanimated',
  'react-native-svg',
  '@react-native-community/slider',
]);

// ── 解析单库文档 ─────────────────────────────────────────────────────────

/**
 * 从 .md 文件中解析版本表。
 * 返回 { "0.72": { ohos_package, ohos_version, baseline, autolink }, ... }
 */
function parseDocVersionTable(content, originalName) {
  const lines = content.split('\n');
  const result = {};

  // 找到包含版本信息的表格行
  // 策略：找包含 RN 版本号（0.72/0.77/0.82）的表格行
  for (const line of lines) {
    if (!line.startsWith('|')) continue;
    if (/^[|\s-]+$/.test(line)) continue; // 分隔行
    if (/@deprecated/i.test(line)) continue; // 跳过废弃行

    // 提取 RN 版本
    const rnMatch = line.match(/\b(0\.(?:72|77|82))\b/);
    if (!rnMatch) continue;
    const rnVersion = rnMatch[1];

    // 已有更高优先级的条目则跳过
    if (result[rnVersion]) continue;

    const cols = line.split('|').map(c => c.trim()).filter(c => c);

    // 提取鸿蒙包名
    let ohosPackage = null;
    const pkgMatch = line.match(/(@react-native-ohos\/[\w-]+)/);
    if (pkgMatch) {
      ohosPackage = pkgMatch[1];
    }

    // 提取版本号（从第一列或第二列，通常是 ~x.y.z 或 x.y.z 格式）
    let ohosVersion = null;
    let baseline = null;
    for (const col of cols) {
      // 匹配版本号模式：~x.y.z, x.y.z, ^x.y.z（但不是 0.72, 0.77, 0.82 这种 RN 版本）
      const vMatch = col.match(/^[~^]?\s*v?(\d+\.\d+\.\d+(?:-[\w.]+)?)\s*$/);
      if (vMatch && !col.match(/^0\.(72|77|82)/)) {
        if (!ohosVersion) {
          ohosVersion = col.trim();
        } else if (!baseline) {
          baseline = vMatch[1];
        }
      }
    }

    // Schema A: 第一列是包名，第二列是版本
    // Schema B: 第一列是版本，其他列含包名链接
    if (!ohosVersion) {
      // 尝试从第一列提取
      for (const col of cols) {
        const m = col.match(/[~^]?\s*v?(\d+\.\d+\.\d+(?:-[\w.]+)?)/);
        if (m && !col.match(/0\.(72|77|82)/) && !col.match(/@deprecated/)) {
          ohosVersion = col.match(/^[~^]/) ? col.trim() : '~' + m[1];
          break;
        }
      }
    }

    // 提取 autolink
    let autolink = null;
    if (/\b是\b/.test(line) && !/\bAutolink\b/i.test(line.split('|')[0] || '')) {
      // "是" in a cell that's not the header
      const autolinkCol = cols.find(c => c === '是' || c === '否' || c.toLowerCase() === 'yes' || c.toLowerCase() === 'no');
      if (autolinkCol) {
        autolink = autolinkCol === '是' || autolinkCol.toLowerCase() === 'yes';
      }
    }

    // 提取 baseline（社区基线版本）
    // Schema A: 第 7 列通常是社区基线版本
    if (!baseline) {
      for (const col of cols) {
        const m = col.match(/^(\d+\.\d+\.\d+)$/);
        if (m && m[1] !== rnVersion && !col.match(/API/)) {
          baseline = m[1];
        }
      }
    }

    if (ohosVersion) {
      result[rnVersion] = {
        ohos_package: ohosPackage,
        ohos_version: ohosVersion,
        baseline: baseline || null,
        autolink: autolink,
      };
    }
  }

  return result;
}

/**
 * 从安装说明中检测是否需要 dual_install。
 * 查找 ```bash 块中是否同时出现原始包和 ohos 包的安装。
 */
function detectDualInstall(content, originalName) {
  // 查找 npm install 命令块
  const installBlocks = content.match(/```bash[\s\S]*?```/g) || [];
  for (const block of installBlocks) {
    const hasOriginal = block.includes(`npm install ${originalName}@`) ||
                       block.includes(`yarn add ${originalName}@`);
    const hasOhos = block.includes('@react-native-ohos/') ||
                   block.includes('@react-native-oh-tpl/');
    if (hasOriginal && hasOhos) return true;
  }
  return false;
}

/**
 * 从安装说明中提取各 RN 版本对应的 dual_install 版本。
 * 例如: npm install react-native-reanimated@3.6.0 → { "0.72": "3.6.0" }
 */
function extractDualInstallVersions(content, originalName) {
  const versions = {};
  // 匹配 # RN 0.72 ... npm install <pkg>@<version> 模式
  const blocks = content.split(/#{1,4}\s/);
  for (const block of blocks) {
    const rnMatch = block.match(/\b(0\.(?:72|77|82))\b/);
    if (!rnMatch) continue;
    const rn = rnMatch[1];

    const installMatch = block.match(new RegExp(
      `(?:npm install|yarn add)\\s+${originalName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}@([\\d.]+)`,
      'i'
    ));
    if (installMatch) {
      versions[rn] = installMatch[1];
    }
  }
  return versions;
}

// ── 主流程 ──────────────────────────────────────────────────────────────────

function main() {
  // 1. 读取 adapted-libraries.json
  if (!fs.existsSync(ADAPTED_JSON)) {
    console.error(`ERROR: adapted-libraries.json not found at ${ADAPTED_JSON}`);
    process.exit(1);
  }
  const adaptedLibs = JSON.parse(fs.readFileSync(ADAPTED_JSON, 'utf-8'));
  const adaptedEntries = adaptedLibs.filter(e => e.status === 'adapted' && e.doc_url);
  console.log(`Adapted libraries with doc_url: ${adaptedEntries.length}`);

  // 2. 检查 docs 目录
  if (!fs.existsSync(DOCS_DIR)) {
    console.error(`ERROR: docs directory not found at ${DOCS_DIR}`);
    console.error('Run: cd _usage-docs/usage-docs && git pull');
    process.exit(1);
  }

  // 3. 解析每个库的文档
  const packages = {};
  let found = 0, notFound = 0, noTable = 0;

  for (const entry of adaptedEntries) {
    let docFile = entry.doc_url.replace(/^\//, '');
    const docPath = path.join(DOCS_DIR, docFile);

    if (!fs.existsSync(docPath)) {
      // 尝试常见变体
      const variants = [
        docFile,
        docFile.replace('.md', '-capi.md'),
        docFile.replace(/@/g, '').replace(/\//g, '-'),
      ];
      let resolved = false;
      for (const v of variants) {
        const vPath = path.join(DOCS_DIR, v);
        if (fs.existsSync(vPath)) {
          docFile = v;
          resolved = true;
          break;
        }
      }
      if (!resolved) {
        notFound++;
        continue;
      }
    }

    const content = fs.readFileSync(path.join(DOCS_DIR, docFile), 'utf-8');
    const versionMap = parseDocVersionTable(content, entry.original_name);

    if (Object.keys(versionMap).length === 0) {
      noTable++;
      continue;
    }

    found++;

    // 检测 dual_install
    const isDualInstall = DUAL_INSTALL_LIBS.has(entry.original_name.toLowerCase()) ||
                         detectDualInstall(content, entry.original_name);
    const dualVersions = isDualInstall ? extractDualInstallVersions(content, entry.original_name) : {};

    // 构建 package entry
    const pkgEntry = {};
    for (const [rn, info] of Object.entries(versionMap)) {
      pkgEntry[rn] = {
        ohos_package: info.ohos_package || entry.ohos_package_name,
        ohos_version: info.ohos_version,
        baseline: info.baseline,
        autolink: info.autolink,
        dual_install: isDualInstall,
      };
      if (isDualInstall && dualVersions[rn]) {
        pkgEntry[rn].dual_install_version = dualVersions[rn];
      } else if (isDualInstall && info.baseline) {
        pkgEntry[rn].dual_install_version = info.baseline;
      }
    }

    packages[entry.original_name] = pkgEntry;
  }

  // 4. 生成输出
  const today = new Date().toISOString().slice(0, 10);
  const output = {
    _meta: {
      generated_at: today,
      source: 'usage-docs/zh-cn/*.md',
      supported_rn_versions: SUPPORTED_RN,
    },
    rnoh_versions: RNOH_VERSIONS,
    packages,
  };

  // 5. 读取旧文件做 diff
  let oldPackageCount = 0;
  if (fs.existsSync(OUT_PATH)) {
    try {
      const old = JSON.parse(fs.readFileSync(OUT_PATH, 'utf-8'));
      oldPackageCount = Object.keys(old.packages || {}).length;
    } catch (e) { /* ignore */ }
  }

  // 6. 写入
  fs.writeFileSync(OUT_PATH, JSON.stringify(output, null, 2) + '\n', 'utf-8');

  // 7. 统计
  const totalPkgs = Object.keys(packages).length;
  const byRn = {};
  for (const rn of SUPPORTED_RN) byRn[rn] = 0;
  for (const pkg of Object.values(packages)) {
    for (const rn of Object.keys(pkg)) {
      byRn[rn] = (byRn[rn] || 0) + 1;
    }
  }
  const dualCount = Object.values(packages).filter(p =>
    Object.values(p).some(v => v.dual_install)
  ).length;

  console.log(`\n=== Results ===`);
  console.log(`Doc files found: ${found}`);
  console.log(`Doc files not found: ${notFound}`);
  console.log(`Doc files without version table: ${noTable}`);
  console.log(`\nPackages in dep-version-map: ${totalPkgs} (was ${oldPackageCount})`);
  console.log(`\nCoverage by RN version:`);
  for (const [rn, count] of Object.entries(byRn)) {
    console.log(`  RN ${rn}: ${count} packages`);
  }
  console.log(`\nDual-install packages: ${dualCount}`);
  console.log(`\nWritten: ${OUT_PATH}`);
}

main();
