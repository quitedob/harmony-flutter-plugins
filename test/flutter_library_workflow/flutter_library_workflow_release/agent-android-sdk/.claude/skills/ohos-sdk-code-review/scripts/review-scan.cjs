#!/usr/bin/env node
'use strict';
/**
 * 统一入口（混合架构编排器）。替代 SKILL.md §4.1 的 ~45 条 grep。
 * 模型只调用本脚本一次，得到结构化/去重/分级的统一结果。
 *
 *   node review-scan.cjs --stage 03 --project <工程根> --files a.ets b.ets [--log <path>]
 *                        [--apply-fix] [--no-codelinter] [--json-out <path>] [--cache-dir <path>]
 *
 * 退出码：0=无 P0/P1；10=存在 P0/P1（门禁阻断）；20=wrapper 自身错误。
 */
const fs = require('fs');
const path = require('path');
const adapter = require('./codelinter-adapter.cjs');
const scanner = require('./custom-scanner.cjs');

const SEV_FROM_CL = { error: 'P1', warn: 'P2', suggestion: 'P3' };

function fail(msg) {
  process.stderr.write('[review-scan] ERROR: ' + msg + '\n');
  process.exit(20);
}

function parseArgs(argv) {
  const a = { files: [], stage: null, project: null, log: null, jsonOut: null, cacheDir: null, applyFix: true, noCodelinter: false, report: null, quiet: false };
  let mode = null;
  for (let i = 0; i < argv.length; i++) {
    const t = argv[i];
    if (t === '--apply-fix') { a.applyFix = true; mode = null; }
    else if (t === '--no-apply-fix') { a.applyFix = false; mode = null; }
    else if (t === '--no-codelinter') { a.noCodelinter = true; mode = null; }
    else if (t === '--quiet') { a.quiet = true; mode = null; }
    else if (t === '--files') { mode = 'files'; }
    else if (t === '--stage') { a.stage = argv[++i]; mode = null; }
    else if (t === '--project') { a.project = argv[++i]; mode = null; }
    else if (t === '--log') { a.log = argv[++i]; mode = null; }
    else if (t === '--json-out') { a.jsonOut = argv[++i]; mode = null; }
    else if (t === '--report') { a.report = argv[++i]; mode = null; }
    else if (t === '--cache-dir') { a.cacheDir = argv[++i]; mode = null; }
    else if (t.startsWith('--')) { mode = null; /* 未知 flag 忽略 */ }
    else if (mode === 'files') a.files.push(t);
    else a.files.push(t);
  }
  return a;
}

function isProjectRoot(p) {
  return fs.existsSync(path.join(p, 'oh-package.json5')) || fs.existsSync(path.join(p, 'build-profile.json5'));
}

const IGNORE_RE = /(^|[\\/])(node_modules|oh_modules|build|\.preview)([\\/]|$)|[\\/]src[\\/](test|ohosTest|mock)[\\/]/;

function main() {
  const args = parseArgs(process.argv.slice(2));
  const t0 = Date.now();
  const warnings = [];
  const warn = (m) => { warnings.push(m); if (!args.quiet) process.stderr.write('[review-scan] WARN: ' + m + '\n'); };
  if (!args.project) fail('缺少 --project');
  const projectRoot = path.resolve(args.project);
  if (!fs.existsSync(projectRoot)) fail('工程根不存在: ' + projectRoot);
  if (!isProjectRoot(projectRoot)) fail('--project 不是工程根（缺 oh-package.json5 / build-profile.json5）: ' + projectRoot);

  const cacheDir = args.cacheDir ? path.resolve(args.cacheDir)
    : path.join(projectRoot, '.ohos-adaptation', 'logs', '.codelinter-cache');
  const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'rule-manifest.json'), 'utf8'));
  const reviewConfig = path.join(__dirname, 'code-linter.review.json5');
  const ruleByCr = {};
  const ruleByEngineRule = {};
  for (const r of manifest.rules) {
    ruleByCr[r.cr_id] = r;
    if (r.engine_rule) ruleByEngineRule[r.engine_rule] = ruleByEngineRule[r.engine_rule] || r;
  }

  // 收集目标文件（绝对路径 + 过滤）
  const files = [];
  const skipped = [];
  for (const f of args.files) {
    const abs = path.isAbsolute(f) ? f : path.resolve(projectRoot, f);
    if (!fs.existsSync(abs)) { skipped.push(f + '（不存在）'); warn('跳过不存在文件: ' + f); continue; }
    if (IGNORE_RE.test(abs)) { skipped.push(f + '（测试/构建目录）'); continue; }
    if (!/\.(ets|ts)$/.test(abs)) { skipped.push(f + '（非 .ets/.ts）'); continue; }
    files.push(abs);
  }
  if (files.length === 0) fail('无有效 .ets/.ts 目标文件');

  // ---- 可用性探测 ----
  let cl = { available: false, reason: 'disabled by --no-codelinter' };
  if (!args.noCodelinter) cl = adapter.detect();
  if (!cl.available) warn('CodeLinter 不可用（' + (cl.reason || '未知') + '）→ 降级为纯轻量扫描器（DEGRADED_CUSTOM）');

  // ---- 确保工程上下文（hardemo 完整工程为 no-op；裸模块临时注入 app+modules，使 CodeLinter 不拒扫） ----
  let projCtx = { ok: true, patched: false, restore() {} };
  if (cl.available) {
    projCtx = adapter.ensureProjectContext(projectRoot, cacheDir);
    if (!projCtx.ok) {
      warn('无法构造 CodeLinter 工程上下文（' + (projCtx.reason || '未知') + '）→ 降级为纯轻量扫描器（DEGRADED_CUSTOM）');
      cl.available = false;
    } else if (projCtx.patched) {
      warn('已临时为裸模块注入工程级 build-profile（扫描后自动还原）：' + projectRoot);
    }
  }
  // crash-safe：异常/退出兜底还原（restore 幂等，显式调用后此处为 no-op）
  process.on('exit', () => { try { projCtx.restore(); } catch (e) { /* ignore */ } });

  // ---- 完整性自检 → 覆盖矩阵 ----
  let coverage = { by_rule: {}, fired: [], from_cache: false, selfcheck_ok: false };
  let mode = 'DEGRADED_CUSTOM';
  if (cl.available) {
    coverage = adapter.selfCheck({
      node: cl.node, cli: cl.cli, configPath: reviewConfig, manifest, projectRoot, cacheDir, version: cl.version,
      anchorDir: path.dirname(files[0]),
    });
    const clRules = manifest.rules.filter((r) => r.engine === 'codelinter');
    const allCovered = clRules.every((r) => coverage.by_rule[r.cr_id] === 'codelinter');
    mode = coverage.selfcheck_ok ? (allCovered ? 'FULL_CODELINTER' : 'HYBRID_PARTIAL') : 'DEGRADED_CUSTOM';
  }

  // ---- 路由：每条规则归属 codelinter 还是 custom ----
  const codelinterActive = new Set();   // engine_rule 集合（codelinter 实际负责）
  const customScanners = new Set();     // scanner id 集合（custom 实际负责）
  for (const r of manifest.rules) {
    let owner;
    if (mode === 'DEGRADED_CUSTOM') owner = 'custom';
    else if (r.engine === 'custom') owner = 'custom';
    else owner = coverage.by_rule[r.cr_id] === 'codelinter' ? 'codelinter' : 'custom';
    if (owner === 'codelinter' && r.engine_rule) codelinterActive.add(r.engine_rule);
    else if (r.scanner) customScanners.add(r.scanner);
  }
  const finalCoverage = {};
  for (const r of manifest.rules) {
    finalCoverage[r.cr_id] = (codelinterActive.has(r.engine_rule) && r.engine === 'codelinter') ? 'codelinter' : 'custom';
  }

  const findings = [];
  const magicRaw = []; // {value, file, line, engine}
  let autoFixed = 0;
  let fixApplied = false;
  let clRuns = 0;
  let clMs = 0;
  const scannerToRule = {};
  for (const r of manifest.rules) if (r.scanner) scannerToRule[r.scanner] = r;

  // 把 codelinter 的 byFile 解析为我们映射保留的 findings/magicRaw（before/after 计数与最终收集复用同一逻辑）
  function parseClByFile(byFile) {
    const f = [];
    const mr = [];
    for (const [absFile, msgs] of Object.entries(byFile)) {
      const rel = path.relative(projectRoot, absFile);
      for (const m of msgs) {
        const rule = ruleByEngineRule[m.rule];
        if (rule && codelinterActive.has(m.rule) && finalCoverage[rule.cr_id] === 'codelinter') {
          if (rule.aggregate === 'magic_values') {
            const vm = /:\s*(-?\d+(?:\.\d+)?)/.exec(m.message);
            mr.push({ value: vm ? vm[1] : '?', file: rel, line: m.line, engine: 'codelinter' });
          } else {
            f.push(mkFinding(rule, rel, m.line, m.column, m.message, 'codelinter', m.rule));
          }
        } else if (/^@security\//.test(m.rule)) {
          // 安全类规则即便未在 manifest 显式映射也应上报
          f.push({
            rule: 'cr-security', g_id: m.rule, group: 5, engine: 'codelinter', engine_rule: m.rule,
            severity: SEV_FROM_CL[m.severity] || 'P1', file: rel, line: m.line, column: m.column || null,
            message: m.message, snippet: '', confidence: 'confirmed', status: 'open',
          });
        }
        // 其余未映射消息（recommended 额外规则）超出 §4.1 范围，丢弃
      }
    }
    return { findings: f, magicRaw: mr, count: f.length + mr.length };
  }

  // ---- Layer 1：CodeLinter ----
  let clError = null;
  if (cl.available && codelinterActive.size > 0) {
    fs.mkdirSync(cacheDir, { recursive: true });
    const runCl = (reportPath, fix) => {
      const s = Date.now();
      const r = adapter.run({ node: cl.node, cli: cl.cli, configPath: reviewConfig, files, projectRoot, reportPath, fix });
      clMs += Date.now() - s; clRuns++;
      return r;
    };
    const fkey = (f) => f.file + '|' + f.line + '|' + f.rule;
    let clFindings = [];
    let clMagic = [];
    if (args.applyFix) {
      // 修复前基线（读原始文件）；--fix 改写文件，其输出报告即“修复后剩余”。
      // 被修掉的 = 基线有、修复后没有 → 以 status:auto_fixed 记录，保证可审计。
      const before = runCl(path.join(cacheDir, 'before-report.json'), false);
      const beforeParsed = before.ok ? parseClByFile(before.byFile) : { findings: [], magicRaw: [] };
      const after = runCl(path.join(cacheDir, 'after-report.json'), true);
      fixApplied = after.ok;
      if (!after.ok) {
        clError = after.error;
      } else {
        const afterParsed = parseClByFile(after.byFile);
        const afterKeys = new Set(afterParsed.findings.map(fkey));
        const fixed = beforeParsed.findings
          .filter((f) => !afterKeys.has(fkey(f)))
          .map((f) => Object.assign({}, f, { status: 'auto_fixed' }));
        clFindings = afterParsed.findings.concat(fixed);
        clMagic = afterParsed.magicRaw;
        autoFixed = fixed.length;
      }
    } else {
      const res = runCl(path.join(cacheDir, 'run-report.json'), false);
      if (!res.ok) clError = res.error;
      else { const p = parseClByFile(res.byFile); clFindings = p.findings; clMagic = p.magicRaw; }
    }
    for (const x of clFindings) findings.push(x);
    for (const x of clMagic) magicRaw.push(x);
    if (clError) mode = 'HYBRID_PARTIAL';
  }
  // codelinter 出错 → 把它本应负责的规则降级给 custom
  if (clError) {
    warn('CodeLinter 运行出错 → 相关规则降级 custom：' + clError);
    for (const r of manifest.rules) {
      if (r.engine === 'codelinter' && r.scanner && finalCoverage[r.cr_id] === 'codelinter') {
        customScanners.add(r.scanner); finalCoverage[r.cr_id] = 'custom';
      }
    }
  }
  // 自检发现“配了但未执行”的规则（应由 codelinter 却回退 custom）
  const degradedRules = cl.available
    ? manifest.rules.filter((r) => r.engine === 'codelinter' && finalCoverage[r.cr_id] === 'custom').map((r) => r.cr_id)
    : [];
  if (degradedRules.length && cl.available && !clError) {
    warn('以下规则 CodeLinter 实测未执行，已由轻量扫描器兜底：' + degradedRules.join(', '));
  }

  // CodeLinter 用毕，立即还原被临时注入的 build-profile（Layer 2 不需要工程上下文）
  projCtx.restore();

  // ---- Layer 2：自定义扫描器 ----
  const activeScannerIds = Array.from(customScanners);
  for (const abs of files) {
    const rel = path.relative(projectRoot, abs);
    const byScanner = scanner.scanFile(abs, rel, activeScannerIds);
    for (const [sid, hits] of Object.entries(byScanner)) {
      const rule = scannerToRule[sid];
      if (!rule) continue;
      for (const h of hits) {
        if (rule.aggregate === 'magic_values') {
          magicRaw.push({ value: h.value, file: rel, line: h.line, engine: 'custom' });
        } else {
          findings.push(mkFinding(rule, rel, h.line, h.col || null, ruleMsg(rule), 'custom', null, h.snippet, h.confidence));
        }
      }
    }
  }

  // ---- 魔法值聚合（按值去重，列全部用法点，一值一 finding）----
  const magicMap = new Map();
  for (const x of magicRaw) {
    if (!magicMap.has(x.value)) magicMap.set(x.value, { value: x.value, sites: [], engine: x.engine });
    magicMap.get(x.value).sites.push(x.file + ':' + x.line);
  }
  const magic_values = [];
  const magicRule = ruleByCr['cr-magic-value'];
  for (const mv of magicMap.values()) {
    mv.sites = Array.from(new Set(mv.sites));
    mv.suggest_name = 'MAGIC_' + String(mv.value).replace(/[^0-9A-Za-z]/g, '_').toUpperCase(); // 占位，模型须按语义重命名
    magic_values.push(mv);
    findings.push({
      rule: 'cr-magic-value', g_id: magicRule.g_id, group: 6, engine: mv.engine, engine_rule: magicRule.engine_rule,
      severity: 'P3', file: mv.sites[0].split(':')[0], line: Number(mv.sites[0].split(':')[1]),
      message: '魔法值 ' + mv.value + ' 出现 ' + mv.sites.length + ' 处，须提取为语义化常量',
      snippet: '', confidence: 'confirmed', status: 'open', sites: mv.sites,
    });
  }

  // ---- 去重 (file,line,cr_id) ----
  const seen = new Set();
  const deduped = [];
  for (const f of findings) {
    const k = f.file + '|' + f.line + '|' + f.rule;
    if (seen.has(k)) continue;
    seen.add(k); deduped.push(f);
  }
  deduped.sort((a, b) => (a.file === b.file ? a.line - b.line : a.file < b.file ? -1 : 1));

  // ---- 汇总 ----
  // p0..p3 仅统计 open（剩余待修）；auto_fixed 单独计（已自动改入代码，应计入 issues_fixed）
  const summary = { files: files.length, issues_found: deduped.length, p0: 0, p1: 0, p2: 0, p3: 0, auto_fixed: 0 };
  for (const f of deduped) {
    if (f.status === 'auto_fixed') { summary.auto_fixed++; continue; }
    summary[f.severity.toLowerCase()]++;
  }

  // ---- 逐规则命中（含无命中）----
  const counts = {};
  for (const f of deduped) counts[f.rule] = (counts[f.rule] || 0) + 1;
  const rule_lines = manifest.rules.map((r) => {
    const c = counts[r.cr_id] || 0;
    const own = finalCoverage[r.cr_id] || 'custom';
    const sample = deduped.filter((f) => f.rule === r.cr_id).slice(0, 3).map((f) => f.file + ':' + f.line).join(', ');
    return `[Group ${r.group}] ${r.cr_id}(${r.engine_rule || own}) — 命中 ${c}${sample ? ' / ' + sample : ''}`;
  });

  const elapsedMs = Date.now() - t0;
  const timing = { total_ms: elapsedMs, codelinter_ms: clMs, codelinter_runs: clRuns, selfcheck_from_cache: !!coverage.from_cache };

  // ---- 诊断头（便于定位问题）----
  const diag = [];
  diag.push(`mode=${mode} | stage=${args.stage || '-'} | files=${files.length} | 用时 ${elapsedMs}ms（CodeLinter 主扫描 ${clMs}ms/${clRuns}次，自检另计）`);
  if (cl.available) {
    diag.push(`CodeLinter: available v${cl.version} | node=${cl.node}`);
    diag.push(`  cli=${cl.cli}`);
    diag.push(`  自检: ${coverage.from_cache ? '命中缓存' : '本次实跑'}，触发规则=[${(coverage.fired || []).join(', ') || '无'}]`);
    diag.push(`  自动修复(--fix): ${fixApplied ? '已执行，auto_fixed=' + summary.auto_fixed : '未执行'}`);
    if (degradedRules.length) diag.push(`  ⚠ CodeLinter 未执行而回退 custom 的规则: ${degradedRules.join(', ')}`);
  } else {
    diag.push(`CodeLinter: 不可用（${cl.reason || '未知'}）→ DEGRADED_CUSTOM`);
  }
  const clOwned = Object.values(finalCoverage).filter((v) => v === 'codelinter').length;
  const customOwned = Object.keys(finalCoverage).length - clOwned;
  diag.push(`引擎归属: codelinter ${clOwned} 条 / custom ${customOwned} 条`);
  diag.push(`结果: 剩余 P0=${summary.p0} P1=${summary.p1} P2=${summary.p2} P3=${summary.p3} | 自动修复=${summary.auto_fixed} | 门禁=${(summary.p0 + summary.p1) > 0 ? '阻断(exit10)' : '通过(exit0)'}`);
  if (skipped.length) diag.push(`跳过文件: ${skipped.join('; ')}`);
  if (warnings.length) for (const w of warnings) diag.push(`WARN: ${w}`);

  const log_lines = rule_lines; // 向后兼容字段
  const output = {
    schema_version: '1.0',
    engine: {
      mode,
      codelinter: {
        available: cl.available, version: cl.version || null, cli: cl.cli || null, node: cl.node || null,
        config: reviewConfig, fix_applied: fixApplied, reason: cl.reason || null, run_error: clError,
      },
      custom_scanner: { version: '1.0', active_scanners: activeScannerIds },
      coverage: { verified_at: coverage.verified_at || null, from_cache: !!coverage.from_cache, fired: coverage.fired || [], degraded_rules: degradedRules, by_rule: finalCoverage },
      timing,
    },
    summary,
    warnings,
    skipped,
    findings: deduped,
    magic_values,
    diagnostics: diag,
    log_lines,
  };

  // ---- 写日志文件（诊断头 + 逐规则 + 警告）----
  if (args.log) {
    try {
      fs.mkdirSync(path.dirname(path.resolve(args.log)), { recursive: true });
      const block = [
        `\n===== review-scan @ ${new Date().toISOString()} =====`,
        ...diag.map((l) => '  ' + l),
        '  --- 逐规则命中 ---',
        ...rule_lines.map((l) => '  ' + l),
        '',
      ].join('\n');
      fs.appendFileSync(path.resolve(args.log), block + '\n', 'utf8');
    } catch (e) { warn('写日志失败: ' + e.message); }
  }

  // ---- 写 Markdown 总结报告 ----
  if (args.report) {
    try {
      fs.mkdirSync(path.dirname(path.resolve(args.report)), { recursive: true });
      fs.writeFileSync(path.resolve(args.report), renderReport(output, args), 'utf8');
    } catch (e) { warn('写报告失败: ' + e.message); }
  }

  // 控制台诊断（非 --quiet，且 JSON 不走 stdout 时）——便于 agent 运行时直接看到
  if (!args.quiet && args.jsonOut) process.stderr.write('[review-scan]\n' + diag.map((l) => '  ' + l).join('\n') + '\n');

  const json = JSON.stringify(output, null, 2);
  if (args.jsonOut) fs.writeFileSync(path.resolve(args.jsonOut), json, 'utf8');
  else process.stdout.write(json + '\n');

  process.exit((summary.p0 + summary.p1) > 0 ? 10 : 0);
}

// ---- Markdown 总结报告 ----
function renderReport(o, args) {
  const e = o.engine;
  const s = o.summary;
  const L = [];
  L.push('# Code Review 扫描报告');
  L.push('');
  L.push(`- 时间：${new Date().toISOString()}`);
  L.push(`- 阶段：${args.stage || '-'}　工程：${args.project}`);
  L.push(`- 模式：**${e.mode}**　用时：${e.timing.total_ms}ms（CodeLinter 主扫描 ${e.timing.codelinter_ms}ms / ${e.timing.codelinter_runs} 次，自检另计）`);
  L.push(`- 门禁：${(s.p0 + s.p1) > 0 ? '**阻断**（存在剩余 P0/P1）' : '通过'}`);
  L.push('');
  L.push('## 引擎状态');
  if (e.codelinter.available) {
    L.push(`- CodeLinter：可用 v${e.codelinter.version}`);
    L.push(`- 入口：\`${e.codelinter.cli}\``);
    L.push(`- 自检：${e.coverage.from_cache ? '命中缓存' : '本次实跑'}；触发规则 ${(e.coverage.fired || []).length} 条`);
    L.push(`- 自动修复：${e.codelinter.fix_applied ? '已执行' : '未执行'}（auto_fixed=${s.auto_fixed}）`);
    if (e.codelinter.run_error) L.push(`- ⚠ 运行错误：${e.codelinter.run_error}`);
    if (e.coverage.degraded_rules.length) L.push(`- ⚠ CodeLinter 未执行、回退 custom 的规则：${e.coverage.degraded_rules.join(', ')}`);
  } else {
    L.push(`- CodeLinter：**不可用**（${e.codelinter.reason}）→ 仅轻量扫描器，精度降级`);
  }
  L.push('');
  L.push('## 汇总（剩余待修）');
  L.push('| P0 | P1 | P2 | P3 | 自动修复 | 总计 |');
  L.push('|----|----|----|----|----------|------|');
  L.push(`| ${s.p0} | ${s.p1} | ${s.p2} | ${s.p3} | ${s.auto_fixed} | ${s.issues_found} |`);
  L.push('');
  if (o.warnings.length) {
    L.push('## ⚠ 警告');
    for (const w of o.warnings) L.push(`- ${w}`);
    L.push('');
  }
  if (o.skipped.length) {
    L.push('## 跳过的文件');
    for (const k of o.skipped) L.push(`- ${k}`);
    L.push('');
  }
  L.push('## 问题清单');
  const open = o.findings.filter((f) => f.status !== 'auto_fixed');
  const fixed = o.findings.filter((f) => f.status === 'auto_fixed');
  if (open.length) {
    L.push('| 严重 | 规则 | 文件:行 | 引擎 | 置信 | 说明 |');
    L.push('|------|------|---------|------|------|------|');
    for (const f of open) {
      L.push(`| ${f.severity} | ${f.rule} | ${f.file}:${f.line} | ${f.engine} | ${f.confidence} | ${(f.message || '').replace(/\|/g, '\\|').slice(0, 80)} |`);
    }
  } else {
    L.push('（无剩余待修问题）');
  }
  L.push('');
  if (fixed.length) {
    L.push(`## 已自动修复（${fixed.length}，应计入 issues_fixed）`);
    for (const f of fixed) L.push(`- ${f.rule} @ ${f.file}:${f.line}`);
    L.push('');
  }
  if (o.magic_values.length) {
    L.push('## 魔法值清单（按值去重）');
    for (const mv of o.magic_values) L.push(`- \`${mv.value}\`（${mv.sites.length} 处）：${mv.sites.join(', ')}`);
    L.push('');
  }
  L.push('## 逐规则命中');
  L.push('```');
  for (const l of o.log_lines) L.push(l);
  L.push('```');
  return L.join('\n') + '\n';
}

function ruleMsg(rule) {
  return rule.cr_id + ' (' + (rule.g_id || '') + ')';
}
function mkFinding(rule, file, line, column, message, engine, engineRule, snippet, confidence) {
  return {
    rule: rule.cr_id, g_id: rule.g_id, group: rule.group, engine, engine_rule: engineRule || rule.engine_rule || null,
    severity: rule.severity, file, line, column: column || null,
    message: message || ruleMsg(rule), snippet: snippet || '',
    confidence: confidence || rule.confidence || 'confirmed', status: 'open',
  };
}

try { main(); } catch (e) { fail(e.stack || e.message); }
