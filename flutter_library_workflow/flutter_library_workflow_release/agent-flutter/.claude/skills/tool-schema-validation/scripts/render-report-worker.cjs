#!/usr/bin/env node
/**
 * Report rendering worker — Handlebars template edition.
 *
 * Reads a stage JSON artifact, loads the corresponding .hbs template from
 * report-templates/zh-CN/, and writes the rendered Markdown report.
 *
 * Usage: node render-report-worker.cjs <json_file_path> <schema_key>
 *   schema_key: analysis | planning | coding-library | testing | summary
 *
 * Output: writes *-report.md alongside the JSON; prints result JSON to stdout.
 */

const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

// ── Constants ──

const TEMPLATE_MAP = {
  'analysis':       '01-analysis-report.md.hbs',
  'planning':       '02-planning-report.md.hbs',
  'coding-library': '03-coding-library-report.md.hbs',
  'testing':        '04-testing-report.md.hbs',
  'summary':        '05-summary-report.md.hbs',
};

const BASIC_CHECK_TYPES = [
  'channel_consistency', 'param_type_match', 'permission_completeness',
  'async_error_handling', 'missing_plugin_risk', 'null_safety',
  'event_channel_lifecycle',
];

const CHECK_LABELS = {
  'channel_consistency':      'Channel 一致性',
  'param_type_match':         '参数类型匹配',
  'permission_completeness':  '权限完整性',
  'async_error_handling':     '异步错误处理',
  'missing_plugin_risk':      'MissingPlugin 风险',
  'null_safety':              '空安全',
  'event_channel_lifecycle':  'EventChannel 生命周期',
  'behavior_equivalence':     '行为对等性',
  'return_structure_match':   '返回值结构匹配',
  'api_call_validity':        'API 调用有效性',
};

// ── Handlebars Helpers ──

function registerHelpers(hbs) {
  hbs.registerHelper('or', function () {
    const args = Array.prototype.slice.call(arguments, 0, -1);
    for (const a of args) {
      if (a !== null && a !== undefined && a !== '') return a;
    }
    return '—';
  });

  hbs.registerHelper('statusIcon', function (s) {
    if (s === 'pass' || s === 'implemented' || s === true) return '✅';
    if (s === 'fail' || s === false) return '❌';
    if (s === 'warning') return '⚠️';
    if (s === 'skip' || s === 'skipped') return '⏭️';
    if (s === 'partial') return '🟡';
    if (s === 'error') return '💥';
    return String(s == null ? '' : s);
  });

  hbs.registerHelper('boolCn', function (val) {
    return val ? '是' : '否';
  });

  hbs.registerHelper('hasItems', function (arr) {
    return Array.isArray(arr) && arr.length > 0;
  });

  hbs.registerHelper('len', function (arr) {
    return Array.isArray(arr) ? arr.length : 0;
  });

  hbs.registerHelper('inc', function (n) {
    return (typeof n === 'number' ? n : 0) + 1;
  });

  hbs.registerHelper('join', function (arr, sep) {
    if (!Array.isArray(arr)) return '';
    const s = typeof sep === 'string' ? sep : ', ';
    return arr.join(s);
  });

  hbs.registerHelper('eq', function (a, b, options) {
    if (options && typeof options.fn === 'function') {
      return a === b ? options.fn(this) : options.inverse(this);
    }
    return a === b;
  });

  hbs.registerHelper('formatArgs', function (args) {
    if (args == null) return null;
    if (typeof args === 'object') return JSON.stringify(args);
    return String(args);
  });

  hbs.registerHelper('escapeCell', function (str) {
    if (str == null) return '';
    return String(str).replace(/\n/g, ' ').replace(/\|/g, '\\|');
  });

  hbs.registerHelper('truncate', function (str, n) {
    if (str == null) return '';
    const s = String(str);
    const limit = typeof n === 'number' ? n : 80;
    return s.length > limit ? s.substring(0, limit) + '…' : s;
  });

  hbs.registerHelper('checkLabel', function (type) {
    return CHECK_LABELS[type] || type;
  });

  hbs.registerHelper('stripEventPrefix', function (method) {
    if (typeof method !== 'string') return method;
    return method.replace(/^EventChannel:\s*/, '');
  });

  hbs.registerHelper('isPass', function (result) {
    return result === 'pass';
  });

  hbs.registerHelper('caseIcon', function (result) {
    if (result === 'pass') return '✅';
    if (result === 'fail') return '❌';
    if (result === 'error') return '💥';
    if (result === 'not_executed') return '⏸️';
    return '';
  });
}

// ── Data Preparation ──

function resolvePluginName(adaptDir, data) {
  if (data.plugin_name) return data.plugin_name;
  try {
    const analysis = JSON.parse(fs.readFileSync(path.join(adaptDir, '01-analysis.json'), 'utf8'));
    if (analysis.plugin_name) return analysis.plugin_name;
  } catch { /* ignore */ }
  return path.basename(path.dirname(adaptDir));
}

function prepareAnalysisData(data) {
  const nd = data.native_dependencies || {};
  const p = data.permissions || {};
  return Object.assign({}, data, {
    _hasNativeDeps: Boolean(
      (nd.android && nd.android.length) ||
      (nd.ios && nd.ios.length) ||
      (nd.cpp && nd.cpp.length)
    ),
    _hasPermissions: Boolean(
      (p.android && p.android.length) ||
      (p.ios && p.ios.length)
    ),
  });
}

function preparePlanningData(data, adaptDir) {
  const mc = data.implementation_strategy && data.implementation_strategy.module_json5_config;
  return Object.assign({}, data, {
    _pluginName: resolvePluginName(adaptDir, data),
    _hasModuleConfig: Boolean(
      mc && (
        (mc.permissions && mc.permissions.length) ||
        (mc.syscap_requirements && mc.syscap_requirements.length)
      )
    ),
  });
}

function prepareCodingData(data, adaptDir) {
  const impl = data.implemented_methods || [];
  return Object.assign({}, data, {
    _pluginName: resolvePluginName(adaptDir, data),
    _mcMethods: impl.filter(function (m) { return !m.method.startsWith('EventChannel:'); }),
    _ecMethods: impl.filter(function (m) { return m.method.startsWith('EventChannel:'); }),
    _implCount: impl.length,
    _notImplCount: (data.not_implemented || []).length,
  });
}

function prepareTestingData(data, adaptDir) {
  const rcs = data.runtime_checks || [];
  const dtr = data.device_test_results || [];
  const cases = data.case_results || [];
  const caseTotal = cases.length;
  const casePass = cases.filter(function (c) { return c.result === 'pass'; }).length;
  const caseRate = caseTotal > 0 ? Math.round((casePass / caseTotal) * 100) + '%' : '—';
  return Object.assign({}, data, {
    _pluginName: resolvePluginName(adaptDir, data),
    _basicChecks: rcs.filter(function (r) { return BASIC_CHECK_TYPES.indexOf(r.check_type) !== -1; }),
    _libChecks: rcs.filter(function (r) { return BASIC_CHECK_TYPES.indexOf(r.check_type) === -1; }),
    _passCount: rcs.filter(function (r) { return r.status === 'pass'; }).length,
    _warnCount: rcs.filter(function (r) { return r.status === 'warning'; }).length,
    _failCount: rcs.filter(function (r) { return r.status === 'fail'; }).length,
    _devicePass: dtr.filter(function (r) { return r.result === 'pass'; }).length,
    _caseTotal: caseTotal,
    _casePassCount: casePass,
    _casePassRate: caseRate,
    _failedCases: cases.filter(function (c) { return c.result !== 'pass'; }),
  });
}

function prepareSummaryData(data, adaptDir) {
  const details = (data.runtime_check_summary && data.runtime_check_summary.details) || [];
  return Object.assign({}, data, {
    _basicChecks: details.filter(function (d) { return BASIC_CHECK_TYPES.indexOf(d.check_type) !== -1; }),
    _libChecks: details.filter(function (d) { return BASIC_CHECK_TYPES.indexOf(d.check_type) === -1; }),
  });
}

const DATA_PREPARERS = {
  'analysis': prepareAnalysisData,
  'planning': preparePlanningData,
  'coding-library': prepareCodingData,
  'testing': prepareTestingData,
  'summary': prepareSummaryData,
};

// ── Template Loading ──

function loadTemplate(schemaKey) {
  const templateName = TEMPLATE_MAP[schemaKey];
  if (!templateName) return null;

  const templateDir = path.join(__dirname, '..', 'report-templates', 'zh-CN');
  const templatePath = path.join(templateDir, templateName);

  if (!fs.existsSync(templatePath)) return null;
  return fs.readFileSync(templatePath, 'utf8');
}

// ── Report Filename ──

function deriveReportFilename(jsonBasename) {
  return jsonBasename.replace(/\.json$/, '-report.md');
}

// ── Main ──

function main() {
  const args = process.argv.slice(2);
  const jsonFilePath = args[0];
  const schemaKey = args[1];

  if (!jsonFilePath || !schemaKey) {
    console.log(JSON.stringify({
      success: false,
      error: '用法: node render-report-worker.cjs <json_file_path> <schema_key>\n可用 schema_key: ' + Object.keys(TEMPLATE_MAP).join(', '),
    }));
    process.exit(1);
  }

  const templateSource = loadTemplate(schemaKey);
  if (!templateSource) {
    console.log(JSON.stringify({
      success: false,
      error: '未找到模板文件: schema_key=' + schemaKey + '，可用: ' + Object.keys(TEMPLATE_MAP).join(', '),
    }));
    process.exit(1);
  }

  var data;
  try {
    data = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
  } catch (e) {
    console.log(JSON.stringify({ success: false, error: '读取 JSON 失败: ' + e.message }));
    process.exit(1);
  }

  var adaptDir = path.dirname(jsonFilePath);
  var jsonBasename = path.basename(jsonFilePath);
  var reportFile = deriveReportFilename(jsonBasename);
  var reportPath = path.join(adaptDir, reportFile);

  try {
    registerHelpers(Handlebars);

    var template = Handlebars.compile(templateSource, { noEscape: true });

    var preparer = DATA_PREPARERS[schemaKey];
    var preparedData = preparer ? preparer(data, adaptDir) : data;

    var md = template(preparedData);

    // Trim excessive blank lines (3+ consecutive → 2)
    md = md.replace(/\n{3,}/g, '\n\n');

    fs.writeFileSync(reportPath, md, 'utf8');
    console.log(JSON.stringify({ success: true, reportFile: reportFile, message: '报告已生成: ' + reportFile }));
  } catch (e) {
    console.log(JSON.stringify({ success: false, error: '渲染失败: ' + e.message }));
    process.exit(1);
  }
}

main();
