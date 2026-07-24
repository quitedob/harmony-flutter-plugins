'use strict';

// ── 阶段定义 ──

const STAGES = [
  {
    id: 'analysis',
    name: '现状分析',
    agent: 'primary-01-analysis',
    description: '分析插件类型、Channel、依赖、权限',
    outputFile: '01-analysis.json',
    outputReport: '01-analysis-report.md',
    additionalReports: [
      { file: '01-analysis-prd.md', name: '需求规格（PRD）' }
    ],
    prompt: '这是为一个 Flutter 插件进行 HarmonyOS 适配的项目。请分析这个 Flutter 插件，完成 analysis 阶段任务。',
    gate: null,
    edges: [
      { to: 'planning', condition: (state, result) => result.success, label: 'success' },
      { to: 'test-design', condition: (state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (state, result) => !result.success, label: 'error' }
    ]
  },
  {
    id: 'planning',
    name: '方案制定',
    agent: 'primary-02-planning',
    description: '查找鸿蒙对应 API 和实现方案',
    outputFile: '02-planning.json',
    outputReport: '02-planning-report.md',
    prompt: '这是为一个 Flutter 插件进行 HarmonyOS 适配的项目。请基于 .ohos-adaptation/01-analysis-prd.md 和 .ohos-adaptation/01-analysis.json 完成 planning 阶段任务',
    gate: {
      requiredFiles: ['01-analysis.json', '01-analysis-prd.md'],
      description: '需要 analysis 阶段完成'
    },
    edges: [
      { to: 'coding-library', condition: (state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (state, result) => !result.success, label: 'error' }
    ]
  },
  {
    id: 'test-design',
    name: '用例设计',
    agent: 'primary-02-test-design',
    description: '基于 PRD 设计测试用例，输出 04-test-cases.json 和 04-test-cases.md',
    outputFile: '04-test-cases.json',
    outputReport: '04-test-cases.md',
    prompt: '请基于 .ohos-adaptation/01-analysis-prd.md 完成测试用例设计任务',
    gate: {
      requiredFiles: ['01-analysis-prd.md'],
      description: '需要 analysis 阶段生成的 PRD 文档'
    },
    edges: [
      { to: 'demo-gen', condition: (state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (state, result) => !result.success, label: 'error' }
    ]
  },
  {
    id: 'coding-library',
    name: '鸿蒙库适配',
    agent: 'primary-03-coding-library',
    description: '编写 ETS 代码并修复编译问题',
    outputFile: '03-coding-library.json',
    outputReport: '03-coding-library-report.md',
    prompt: '这是为一个 Flutter 插件进行 HarmonyOS 适配的项目。请基于 .ohos-adaptation/01-analysis.json、.ohos-adaptation/01-analysis-prd.md 和 .ohos-adaptation/02-planning.json 完成 coding-library 阶段任务',
    gate: {
      requiredFiles: ['01-analysis.json', '01-analysis-prd.md', '02-planning.json'],
      description: '需要 analysis、PRD 和 planning 阶段完成'
    },
    edges: [
      { to: 'testing', condition: (state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (state, result) => !result.success, label: 'error' }
    ]
  },
  {
    id: 'testing',
    name: '开发自测',
    agent: 'primary-04-testing',
    description: '构建 Example 工程、验证已实现功能、视觉集成测试',
    outputFile: '04-testing.json',
    outputReport: '04-testing-report.md',
    legacyId: 'coding-example',
    legacyOutputFile: '04-coding-example.json',
    legacyOutputReport: '04-coding-example-report.md',
    prompt: '这是为一个 Flutter 插件进行 HarmonyOS 适配的项目。请完成 testing 阶段任务，构建 Example 工程、验证已实现功能，并执行视觉集成测试。',
    gate: {
      requiredFiles: ['01-analysis.json', '02-planning.json', '03-coding-library.json'],
      fieldChecks: [
        {
          file: '03-coding-library.json',
          field: 'build_status',
          expected: 'pass',
          errorMsg: '库编译未通过 (build_status ≠ pass)，Example 适配无意义'
        }
      ],
      description: '需要 coding-library 阶段完成且编译通过'
    },
    edges: [
      { to: 'summary', condition: (state, result) => result.success, label: 'success' },
      { to: 'demo-gen', condition: (state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (state, result) => !result.success, label: 'error' }
    ]
  },
  {
    id: 'demo-gen',
    name: 'DEMO 生成',
    agent: 'primary-05-demo-gen2',
    description: '基于测试用例和已适配代码生成可安装的测试 Demo App',
    outputFile: '05-demo-gen.json',
    outputReport: '05-demo-gen-report.md',
    prompt: '请基于测试用例和已适配代码生成测试 Demo App。',
    gate: {
      requiredFiles: ['01-analysis-prd.md', '04-test-cases.json', '04-testing.json'],
      description: '需要用例设计和开发自测阶段完成'
    },
    edges: [
      { to: 'blackbox-verify', condition: (state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (state, result) => !result.success, label: 'error' }
    ]
  },
  {
    id: 'blackbox-verify',
    name: '黑盒验证',
    description: '在真机上运行 Demo + 自动化脚本，执行黑盒验证',
    outputFile: '06-blackbox-verify.json',
    outputReport: '06-blackbox-verify-report.md',
    script: {
      command: 'node',
      args: [
        '{workspaceRoot}/adapt-workflow/bin/flutter-ohos-blackbox-verify.js',
        '--repo',
        '{repoPath}'
      ],
      cwd: '{workspaceRoot}'
    },
    prompt: '请执行黑盒验证。',
    gate: {
      requiredFiles: ['05-demo-gen.json'],
      description: '需要 DEMO 生成阶段完成'
    },
    edges: [
      { to: 'END', condition: (state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (state, result) => !result.success, label: 'error' }
    ]
  },
  {
    id: 'summary',
    name: '适配总结',
    agent: 'primary-05-summary',
    description: '汇总报告与集成指南',
    outputFile: '05-summary.json',
    outputReport: '05-summary-report.md',
    prompt: '这是为一个 Flutter 插件进行 HarmonyOS 适配的项目。请完成 summary 阶段任务，汇总全部适配数据，评分并生成分层报告与集成指南。',
    gate: {
      requiredFiles: ['03-coding-library.json'],
      description: '需要 coding-library 阶段完成（testing 为可选）'
    },
    edges: [
      { to: 'END', condition: (state, result) => true, label: 'end' }
    ]
  }
];

// ── 适配产物目录名 ──

const ADAPTATION_DIR = '.ohos-adaptation';

// ── Repos 目录（相对于 WORKSPACE_ROOT） ──

const reposDir = 'repos';

// ── TPC 配置 ──

const TPC_ORG = 'HarmonyOS-TPC';
const TPC_ORG_URL = `https://github.com/${TPC_ORG}`;
const TARGET_BRANCH = 'harmony';

function buildTpcRepoUrl(name) {
  return `${TPC_ORG_URL}/${name}.git`;
}

// ── 前端品牌 / UI 文案 ──

const branding = {
  title: 'Flutter → 鸿蒙 适配工作流',
  subtitle: '批量管理 Flutter 插件的鸿蒙平台适配，自动化分析、编码与验证',
  addPluginHint: '输入 Flutter 插件的 Git 仓库地址，添加后可在列表中进行克隆',
  tpcOrgName: 'HarmonyOS-TPC',
  targetBranch: TARGET_BRANCH,
  githubTokenHint: `用于将适配代码推送到 ${TPC_ORG} 组织。需要 repo 权限的 PAT`,
  headerGradient: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)',
  headerAccent: '#1e3a5f',
  commitMessage: (pluginName) =>
    `feat: OHOS adaptation for ${pluginName}\n\nAutomated adaptation by adapt-workflow [flutter-ohos]`,
};

// ── 枚举映射表（供前端展示） ──

const displayMaps = {
  pluginType: {
    'dart': 'Dart 包',
    'plugin': '插件',
    'ffi': 'FFI 插件',
    'ffi_plugin': 'FFI 插件',
    'ffi_package': 'FFI 包',
    'plugin_method_channel': 'MethodChannel',
    'plugin_event_channel': 'EventChannel',
    'plugin_platform_view': 'PlatformView',
    'plugin_texture': 'Texture',
    'plugin_mixed': '混合模式',
    'unknown': '未知'
  },
  architecture: {
    'standalone': '独立插件',
    'federated': '联合插件',
    'monorepo': '多包仓库'
  },
  complexity: {
    'low': '低',
    'medium': '中',
    'high': '高',
    'very_high': '极高'
  },
  complexityClass: {
    'low': 'success',
    'medium': 'pending',
    'high': 'warning',
    'very_high': 'failed'
  },
  recommendation: {
    'proceed': '建议适配',
    'proceed_with_caution': '谨慎适配',
    'blocked': '无法适配',
    'not_needed': '无需适配'
  },
  recommendationClass: {
    'proceed': 'success',
    'proceed_with_caution': 'pending',
    'blocked': 'failed',
    'not_needed': 'neutral'
  },
  targetReadiness: {
    'not_adapted': '未适配',
    'partially_adapted': '部分适配',
    'fully_adapted': '已适配'
  },
  targetReadinessClass: {
    'not_adapted': 'pending',
    'partially_adapted': 'converting',
    'fully_adapted': 'success'
  }
};

// ── Dashboard 卡片配置（前端动态渲染用） ──

const dashboardCards = {
  analysis: [
    { key: 'communication_patterns', label: '通信模式', type: 'code_list' },
    { key: 'channels', label: 'Channel 方法', type: 'channel_count' },
    { key: 'platform_views', label: 'PlatformView', type: 'view_list' },
    {
      key: 'native_dependencies', label: '原生依赖', type: 'dep_summary',
      subKeys: ['android', 'ios', 'cpp']
    },
    { key: 'flutter_dependencies', label: 'Flutter 依赖', type: 'dep_count_blocking' },
    {
      key: 'code_metrics.line_counts', label: '代码量', type: 'code_metrics',
      metricKeys: [
        { key: 'dart', label: 'Dart' },
        { key: 'android', label: 'And' },
        { key: 'ios', label: 'iOS' },
        { key: 'cpp', label: 'C++' }
      ]
    },
    { key: 'has_example', label: 'Example', type: 'boolean' },
    { key: 'complexity_assessment.risk_items', label: '风险项', type: 'risk_summary' }
  ],
  planning: [
    { key: 'implementation_strategy.architecture_decisions', label: '核心方案', type: 'first_decision' },
    { key: 'ohos_api_mapping', label: 'API 映射', type: 'api_mapping_count' },
    { key: 'implementation_strategy.planned_files', label: '规划文件', type: 'array_count' },
    { key: 'permission_mapping', label: '权限', type: 'perm_count' },
    { key: 'risk_items', label: '风险评估', type: 'risk_summary' }
  ]
};

// ── CSV 导出列 ──

const exportColumns = [
  'Name', 'Repo URL', 'Commit Hash', 'Clone Status', 'Clone Time',
  'Plugin Type', 'Architecture', 'Adaptation Status', 'Quality Score'
];

// ── 阶段产物清单 (用于重跑时清除) ──

// 注意：test-design 是独立分支，不参与主流程的文件清除机制
const stageOutputFiles = [
  { stageId: 'analysis', files: ['01-analysis.json', '01-analysis-report.md', '01-analysis-prd.md'] },
  { stageId: 'planning', files: ['02-planning.json', '02-planning-report.md'] },
  { stageId: 'coding-library', files: ['03-coding-library.json', '03-coding-library-report.md'] },
  { stageId: 'testing', files: ['04-testing.json', '04-testing-report.md', '04-coding-example.json', '04-coding-example-report.md'] },
  { stageId: 'demo-gen', files: ['05-demo-gen.json', '05-demo-gen-report.md'] },
  { stageId: 'blackbox-verify', files: ['06-blackbox-verify.json', '06-blackbox-verify-report.md'] },
  { stageId: 'summary', files: ['05-summary.json', '05-summary-report.md'] }
];

// ── Agent 资源目录 ──
const agentDir = 'agent-flutter';

// ── Workspace Links 配置 ──
const workspaceDirs = ['.claude', '.opencode'];
const workspaceFiles = ['CLAUDE.md'];

module.exports = {
  STAGES,
  ADAPTATION_DIR,
  reposDir,
  TPC_ORG,
  TPC_ORG_URL,
  TARGET_BRANCH,
  buildTpcRepoUrl,
  branding,
  displayMaps,
  dashboardCards,
  exportColumns,
  stageOutputFiles,
  agentDir,
  workspaceDirs,
  workspaceFiles
};
