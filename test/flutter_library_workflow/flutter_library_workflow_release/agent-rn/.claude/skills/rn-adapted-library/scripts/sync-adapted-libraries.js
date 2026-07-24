#!/usr/bin/env node

/**
 * sync-adapted-libraries.js
 *
 * 从 usage-docs/zh-cn/README.md 的两张表（RNOH 三方库 + JS 三方库）
 * 自动生成 adapted-libraries.json 和 adapted-libraries.md。
 *
 * 用法:
 *   # 先更新 usage-docs
 *   cd agent-rn/.claude/skills/rn-adapted-library/_usage-docs/usage-docs && git pull
 *   # 再执行同步
 *   node agent-rn/.claude/skills/rn-adapted-library/scripts/sync-adapted-libraries.js
 */

const fs = require('fs');
const path = require('path');

// ── 路径 ──────────────────────────────────────────────────────────────────
const SKILL_ROOT = path.resolve(__dirname, '..');
const README_PATH = path.join(SKILL_ROOT, '_usage-docs/usage-docs/zh-cn/README.md');
const JSON_OUT = path.join(SKILL_ROOT, 'references/adapted-libraries.json');
const MD_OUT = path.join(SKILL_ROOT, 'references/adapted-libraries.md');

// ── 手动覆盖 ─────────────────────────────────────────────────────────────
// README 中部分条目信息不完整或格式特殊，在此手动补全/修正。
// key = original_name（区分大小写），value = 需要覆盖的字段。
const MANUAL_OVERRIDES = {
  'react-navigation': {
    npm_url: 'https://www.npmjs.com/package/@react-native-oh-tpl/react-navigation',
  },
  'BabylonReactNative': {
    ohos_package_name: '@react-native-oh-tpl/babylonjs-react-native',
    npm_url: 'https://www.npmjs.com/package/@react-native-oh-tpl/babylonjs-react-native',
  },
};

// ── 解析 ──────────────────────────────────────────────────────────────────

function parseReadme(content) {
  const entries = [];

  // 分离两张表
  const rnTableMatch = content.match(/## RNOH 三方库总览[\s\S]*?\n(\|[\s\S]*?)(?=\n## |\n$)/);
  const jsTableMatch = content.match(/## JS 三方库[\s\S]*?\n(\|[\s\S]*?)(?=\n## |\n$)/);

  if (rnTableMatch) {
    const rows = extractTableRows(rnTableMatch[1]);
    for (const row of rows) {
      entries.push(parseRnRow(row));
    }
  } else {
    console.warn('WARNING: RNOH 三方库总览 table not found');
  }

  if (jsTableMatch) {
    const rows = extractTableRows(jsTableMatch[1]);
    for (const row of rows) {
      entries.push(parseJsRow(row));
    }
  } else {
    console.warn('WARNING: JS 三方库 table not found');
  }

  return entries;
}

function extractTableRows(tableText) {
  return tableText
    .split('\n')
    .filter(line => /^\|\s*\d+\s*\|/.test(line));
}

function parseRnRow(line) {
  // 表格列数不固定（有些行 ohos 列含多个链接导致多出 |）
  // 策略：用正则按语义提取，而非简单 split
  const cols = line.split('|').slice(1); // remove leading empty
  if (cols.length < 7) return null;

  const seq = cols[0].trim();
  const nameCol = cols[1].trim();
  const version = cols[2].trim();
  const newArchRaw = cols[3].trim();

  // 中间列（ohos + npm）可能因内容含 | 而错位
  // 找 doc 列：从末尾往前找第一个含 [链接] 或 开发中 的列
  let docCol = '';
  let npmCol = '';
  let ohosColParts = [];

  // 从右往左：最后一列是 doc，倒数第二是 npm，其余是 ohos
  const remaining = cols.slice(4).map(c => c.trim()).filter(c => c !== '');
  if (remaining.length === 0) return null;

  // Last non-empty is doc
  docCol = remaining[remaining.length - 1];
  if (remaining.length >= 2) {
    npmCol = remaining[remaining.length - 2];
  }
  // Everything between cols[4] and npm is ohos
  if (remaining.length >= 3) {
    ohosColParts = remaining.slice(0, remaining.length - 2);
  } else {
    ohosColParts = [];
  }
  const ohosCol = ohosColParts.join('|').trim() || cols[4].trim();

  // Extract name from markdown link [name](url)
  const nameMatch = nameCol.match(/\[([^\]]+)\]/);
  const originalName = nameMatch ? nameMatch[1].trim() : nameCol;

  // Extract ohos package name (take first @react-native-oh-tpl link)
  const ohosMatch = ohosCol.match(/\[([^\]]*@react-native-oh-tpl[^\]]*)\]/) ||
                    ohosCol.match(/\[([^\]]*@react-native-ohos[^\]]*)\]/) ||
                    ohosCol.match(/\[([^\]]*@react-native-oh-library[^\]]*)\]/) ||
                    ohosCol.match(/\[([^\]]+)\]/);
  let ohosName = ohosMatch ? ohosMatch[1].trim() : cleanDash(ohosCol);

  // Extract npm url
  const npmMatch = npmCol.match(/\(([^)]+npmjs[^)]+)\)/) || npmCol.match(/\(([^)]+)\)/);
  const npmUrl = npmMatch ? npmMatch[1].trim() : null;

  // Extract doc url
  const docMatch = docCol.match(/\(([^)]+)\)/);
  const docUrl = docMatch ? docMatch[1].trim() : null;

  // Determine status
  let status;
  if (/开发中/.test(ohosCol) || /开发中/.test(npmCol)) {
    status = 'in_development';
    ohosName = null;
  } else if (ohosName && (ohosName.includes('@react-native-oh-tpl') || ohosName.includes('@react-native-ohos'))) {
    status = 'adapted';
  } else if (ohosName && ohosName !== '' && ohosName !== '-') {
    // Has a name but not standard scope — could be js_only with special handling
    // Check if it looks like the original name (js_only) vs a real ohos package
    if (ohosName.includes('@react-native-oh-library')) {
      status = 'adapted';
    } else {
      status = 'js_only';
    }
  } else {
    status = 'js_only';
    ohosName = null;
  }

  // Parse new_architecture
  let newArch = null;
  if (newArchRaw === '是') newArch = true;
  else if (newArchRaw === '否') newArch = false;

  return {
    original_name: originalName,
    original_version: version || null,
    new_architecture: newArch,
    ohos_package_name: status === 'adapted' ? ohosName : null,
    npm_url: status === 'adapted' ? npmUrl : null,
    status,
    doc_url: docUrl,
  };
}

function parseJsRow(line) {
  const cols = line.split('|').slice(1, -1);
  if (cols.length < 2) return null;

  const nameCol = cols[1].trim();
  const nameMatch = nameCol.match(/\[([^\]]+)\]/);
  const originalName = nameMatch ? nameMatch[1].trim() : nameCol;

  return {
    original_name: originalName,
    original_version: null,
    new_architecture: null,
    ohos_package_name: null,
    npm_url: null,
    status: 'js_only',
    doc_url: null,
    category: 'js_general',
  };
}

function cleanDash(s) {
  return s.replace(/\\-/g, '-').replace(/−/g, '-').replace(/^-+$/, '').trim();
}

// ── 去重 ──────────────────────────────────────────────────────────────────

const STATUS_PRIORITY = { adapted: 4, in_development: 3, js_only: 2, not_adapted: 1 };

function dedup(entries) {
  const map = new Map();
  for (const entry of entries) {
    if (!entry) continue;
    const key = entry.original_name.trim().toLowerCase();
    if (map.has(key)) {
      const existing = map.get(key);
      const existingPri = STATUS_PRIORITY[existing.status] || 0;
      const newPri = STATUS_PRIORITY[entry.status] || 0;
      if (newPri > existingPri) {
        map.set(key, entry);
      }
    } else {
      map.set(key, entry);
    }
  }
  return Array.from(map.values());
}

// ── 校验 ──────────────────────────────────────────────────────────────────

function validate(entries) {
  const issues = [];
  for (const e of entries) {
    if (e.status === 'adapted') {
      if (!e.ohos_package_name) {
        issues.push(`WARN: ${e.original_name} is adapted but missing ohos_package_name`);
      }
      if (!e.npm_url) {
        issues.push(`WARN: ${e.original_name} is adapted but missing npm_url`);
      }
    }
  }
  return issues;
}

// ── 生成 MD ───────────────────────────────────────────────────────────────

function generateMd(entries) {
  const adapted = entries.filter(e => e.status === 'adapted');
  const inDev = entries.filter(e => e.status === 'in_development');
  const jsOnlyRn = entries.filter(e => e.status === 'js_only' && e.category !== 'js_general');
  const jsGeneral = entries.filter(e => e.status === 'js_only' && e.category === 'js_general');
  const sortByName = (a, b) => a.original_name.toLowerCase().localeCompare(b.original_name.toLowerCase());

  const today = new Date().toISOString().slice(0, 10);
  const lines = [
    '# React Native OHOS 已适配三方库清单\n',
    '> 数据来源: [OpenHarmony-RN usage-docs](https://gitcode.com/OpenHarmony-RN/usage-docs/blob/master/zh-cn/README.md)',
    '> NPM 公仓坐标: `@react-native-oh-tpl`',
    `> 更新时间: ${today}\n`,
    '## 统计概览\n',
    '| 状态 | 数量 |',
    '|------|------|',
    `| 已适配（adapted） | ${adapted.length} |`,
    `| 开发中（in_development） | ${inDev.length} |`,
    `| 纯 JS - RN 库（js_only） | ${jsOnlyRn.length} |`,
    `| 纯 JS - 通用库（js_general） | ${jsGeneral.length} |`,
    `| **总计** | **${entries.length}** |\n`,
  ];

  // Adapted
  lines.push('## 已适配库（可直接使用）\n');
  lines.push('| 原库名 | 原库版本 | 新架构 | 鸿蒙化库名 | npm 地址 |');
  lines.push('|--------|---------|--------|-----------|---------|');
  for (const d of adapted.sort(sortByName)) {
    const arch = d.new_architecture === true ? '是' : (d.new_architecture === false ? '否' : '-');
    const npm = d.npm_url ? `[npm](${d.npm_url})` : '-';
    lines.push(`| ${d.original_name} | ${d.original_version || '-'} | ${arch} | ${d.ohos_package_name || '-'} | ${npm} |`);
  }

  // In development
  lines.push('\n## 开发中（暂不可用）\n');
  lines.push('| 原库名 | 原库版本 |');
  lines.push('|--------|---------|');
  for (const d of inDev.sort(sortByName)) {
    lines.push(`| ${d.original_name} | ${d.original_version || '-'} |`);
  }

  // JS only RN
  lines.push('\n## 纯 JS - RN 库（无需适配）\n');
  lines.push('| 原库名 | 原库版本 | 文档 |');
  lines.push('|--------|---------|------|');
  for (const d of jsOnlyRn.sort(sortByName)) {
    const doc = d.doc_url ? `[文档](${d.doc_url})` : '';
    lines.push(`| ${d.original_name} | ${d.original_version || '-'} | ${doc} |`);
  }

  // JS general
  lines.push('\n## 纯 JS - 通用库（天然兼容，直接使用原始 npm 包）\n');
  lines.push('| 库名 | 说明 |');
  lines.push('|------|------|');
  for (const d of jsGeneral.sort(sortByName)) {
    lines.push(`| ${d.original_name} | 通用 JS 库，无平台依赖 |`);
  }

  return lines.join('\n') + '\n';
}

// ── Diff 统计 ─────────────────────────────────────────────────────────────

function diffStats(oldEntries, newEntries) {
  const oldMap = new Map(oldEntries.map(e => [e.original_name.toLowerCase(), e]));
  const newMap = new Map(newEntries.map(e => [e.original_name.toLowerCase(), e]));

  const added = [], removed = [], statusChanged = [], versionChanged = [];

  for (const [key, entry] of newMap) {
    if (!oldMap.has(key)) {
      added.push(entry.original_name);
    } else {
      const old = oldMap.get(key);
      if (old.status !== entry.status) {
        statusChanged.push(`${entry.original_name}: ${old.status} → ${entry.status}`);
      }
      if (old.original_version !== entry.original_version && old.original_version && entry.original_version) {
        versionChanged.push(`${entry.original_name}: ${old.original_version} → ${entry.original_version}`);
      }
    }
  }

  for (const [key] of oldMap) {
    if (!newMap.has(key)) {
      removed.push(oldMap.get(key).original_name);
    }
  }

  return { added, removed, statusChanged, versionChanged };
}

// ── 主流程 ──────────────────────────────────────────────────────────────────

function main() {
  // Check README exists
  if (!fs.existsSync(README_PATH)) {
    console.error(`ERROR: README not found at ${README_PATH}`);
    console.error('Run: cd _usage-docs/usage-docs && git pull');
    process.exit(1);
  }

  // Read old JSON for diff
  let oldEntries = [];
  if (fs.existsSync(JSON_OUT)) {
    try {
      oldEntries = JSON.parse(fs.readFileSync(JSON_OUT, 'utf-8'));
    } catch (e) {
      console.warn('WARN: Could not parse existing JSON, treating as empty');
    }
  }

  // Parse README
  const content = fs.readFileSync(README_PATH, 'utf-8');
  const rawEntries = parseReadme(content);
  console.log(`Parsed: ${rawEntries.filter(e => e).length} entries from README`);

  // Dedup
  const entries = dedup(rawEntries);
  console.log(`After dedup: ${entries.length} entries`);

  // Apply manual overrides
  let overrideCount = 0;
  for (const entry of entries) {
    const override = MANUAL_OVERRIDES[entry.original_name];
    if (override) {
      Object.assign(entry, override);
      overrideCount++;
    }
  }
  if (overrideCount > 0) {
    console.log(`Applied ${overrideCount} manual overrides`);
  }

  // Validate
  const issues = validate(entries);
  for (const issue of issues) {
    console.warn(issue);
  }

  // Diff
  const diff = diffStats(oldEntries, entries);
  console.log('\n=== Diff ===');
  console.log(`Added: ${diff.added.length}`);
  if (diff.added.length > 0 && diff.added.length <= 20) {
    diff.added.forEach(n => console.log(`  + ${n}`));
  }
  console.log(`Removed: ${diff.removed.length}`);
  if (diff.removed.length > 0 && diff.removed.length <= 20) {
    diff.removed.forEach(n => console.log(`  - ${n}`));
  }
  console.log(`Status changed: ${diff.statusChanged.length}`);
  diff.statusChanged.forEach(s => console.log(`  ~ ${s}`));
  console.log(`Version changed: ${diff.versionChanged.length}`);
  if (diff.versionChanged.length <= 10) {
    diff.versionChanged.forEach(s => console.log(`  ~ ${s}`));
  }

  // Write JSON
  fs.writeFileSync(JSON_OUT, JSON.stringify(entries, null, 2) + '\n', 'utf-8');
  console.log(`\nJSON written: ${JSON_OUT} (${entries.length} entries)`);

  // Write MD
  const md = generateMd(entries);
  fs.writeFileSync(MD_OUT, md, 'utf-8');
  console.log(`MD written: ${MD_OUT}`);

  // Summary
  const byStatus = {};
  for (const e of entries) {
    const key = e.category === 'js_general' ? 'js_general' : e.status;
    byStatus[key] = (byStatus[key] || 0) + 1;
  }
  console.log('\n=== Summary ===');
  for (const [k, v] of Object.entries(byStatus)) {
    console.log(`  ${k}: ${v}`);
  }
}

main();
