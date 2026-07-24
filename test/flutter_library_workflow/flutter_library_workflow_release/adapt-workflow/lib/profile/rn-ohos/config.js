'use strict';

// ── 阶段定义 ──

const STAGES = [
  {
    id: 'analysis',
    name: '现状分析',
    agent: 'primary-01-analysis',
    description: '分析 RN 模块类型、Bridge/TurboModule、依赖、权限',
    outputFile: '01-analysis.json',
    outputReport: '01-analysis-report.md',
    additionalReports: [
      { file: '01-analysis-prd.md', name: '需求规格（PRD）' }
    ],
    prompt: '请分析这个 React Native 模块，完成 analysis 阶段任务。',
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
    prompt: '请基于 .rn-ohos-adaptation/01-analysis.json 和 01-analysis-report.md 完成 planning 阶段任务',
    gate: {
      requiredFiles: ['01-analysis.json'],
      description: '需要 analysis 阶段完成'
    },
    edges: [
      { to: 'coding-library', condition: (state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (state, result) => !result.success, label: 'error' }
    ]
  },
  {
    id: 'coding-library',
    name: '鸿蒙库适配',
    agent: 'primary-03-coding-library',
    description: '编写鸿蒙原生模块代码并修复编译问题',
    outputFile: '03-coding-library.json',
    outputReport: '03-coding-library-report.md',
    prompt: '请基于 .rn-ohos-adaptation/01-analysis.json 和 .rn-ohos-adaptation/02-planning.json 完成 coding-library 阶段任务',
    gate: {
      requiredFiles: ['01-analysis.json', '02-planning.json'],
      description: '需要 analysis 和 planning 阶段完成'
    },
    edges: [
      { to: 'testing', condition: (state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (state, result) => !result.success, label: 'error' }
    ]
  },
  {
    id: 'testing',
    name: 'example生成',
    agent: 'primary-04-example-gen',
    description: '构建 Example + HAP 编译 + README（不做设备验证）',
    outputFile: '04-testing.json',
    outputReport: '04-testing-report.md',
    prompt: '请完成 example生成 阶段任务：编写 Example 测试页并编出 HAP，修复编译问题，填充 README，占用静态检查脚本；不要生成 Hypium/ohosTest，也不要跑 onDeviceTest。最后唯一写入 04-testing.json。',
    gate: {
      requiredFiles: ['01-analysis.json', '02-planning.json', '03-coding-library.json'],
      fieldChecks: [
        {
          file: '03-coding-library.json',
          field: 'build_status',
          expected: 'pass',
          errorMsg: '库编译未通过 (build_status ≠ pass)，example生成无意义'
        }
      ],
      description: '需要 coding-library 阶段完成且编译通过'
    },
    edges: [
      { to: 'device-verify', condition: (state, result) => result.success, label: 'success' },
      { to: 'demo-gen', condition: (state, result) => result.success, label: 'success' },
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
    prompt: '请基于 .rn-ohos-adaptation/01-analysis-prd.md 完成测试用例设计任务',
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
    id: 'demo-gen',
    name: 'DEMO 生成',
    agent: 'primary-05-demo-gen',
    description: '基于测试用例和已适配代码生成可安装的测试 Demo App',
    outputFile: '05-demo-gen.json',
    outputReport: '05-demo-gen-report.md',
    prompt: '请基于测试用例和已适配代码生成测试 Demo App。',
    gate: {
      requiredFiles: ['01-analysis-prd.md', '04-test-cases.json', '04-testing.json'],
      description: '需要用例设计和 example 生成阶段完成'
    },
    edges: [
      { to: 'blackbox-verify', condition: (state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (state, result) => !result.success, label: 'error' }
    ]
  },
  {
    id: 'device-verify',
    name: '测试验证',
    agent: 'primary-05-device-verify',
    description: '生成 Hypium/ohosTest + 真机 onDeviceTest + 失败归因与复测',
    outputFile: '04-device-verify.json',
    outputReport: '04-device-verify-report.md',
    prompt: '请完成 测试验证 阶段任务：在 example生成 通过后生成 Hypium/ohosTest，并按门禁规则执行真机 onDeviceTest；失败需归因并修复复测，最后唯一写入 04-device-verify.json。',
    gate: {
      requiredFiles: ['01-analysis.json', '02-planning.json', '03-coding-library.json', '04-testing.json'],
      description: '需要 example生成 阶段完成（04-testing.json）'
    },
    edges: [
      { to: 'summary', condition: (state, result) => result.success, label: 'success' },
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
        '{workspaceRoot}/adapt-workflow/bin/rn-ohos-blackbox-verify.js',
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
      { to: 'test-report', condition: (state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (state, result) => !result.success, label: 'error' }
    ]
  },
  {
    id: 'test-report',
    name: '测试报告',
    agent: 'test-report',
    description: '汇总测试设计、用例评审、Demo 生成、黑盒验证全流程结果，输出端到端测试报告',
    outputFile: '07-test-report.md',
    outputReport: '07-test-report.md',
    prompt: '请基于 .rn-ohos-adaptation/ 下的测试设计、用例评审、Demo 生成、黑盒验证产物，汇总生成端到端测试报告，输出到 .rn-ohos-adaptation/07-test-report.md。',
    gate: {
      requiredFiles: ['06-blackbox-verify.json'],
      description: '需要黑盒验证阶段完成'
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
    prompt: '请完成 summary 阶段任务，汇总全部适配数据，评分并生成分层报告与集成指南。',
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

const ADAPTATION_DIR = '.rn-ohos-adaptation';

// ── Repos 目录（相对于 WORKSPACE_ROOT） ──

const reposDir = 'repos-rn';

// ── TPC 配置 ──

const TPC_ORG = 'HarmonyOS-TPC';
const TPC_ORG_URL = `https://github.com/${TPC_ORG}`;
const TARGET_BRANCH = 'harmony';

function buildTpcRepoUrl(name) {
  return `${TPC_ORG_URL}/${name}.git`;
}

// ── 前端品牌 / UI 文案 ──

const branding = {
  title: 'React Native → 鸿蒙 适配工作流',
  subtitle: '批量管理 RN 模块的鸿蒙平台适配，自动化分析、编码与验证',
  addPluginHint: '输入 React Native 模块的 Git 仓库地址，添加后可在列表中进行克隆',
  tpcOrgName: 'HarmonyOS-TPC',
  targetBranch: TARGET_BRANCH,
  githubTokenHint: `用于将适配代码推送到 ${TPC_ORG} 组织。需要 repo 权限的 PAT`,
  headerGradient: 'linear-gradient(135deg, #134e4a 0%, #0d9488 100%)',
  headerAccent: '#134e4a',
  commitMessage: (pluginName) =>
    `feat: OHOS adaptation for ${pluginName}\n\nAutomated adaptation by adapt-workflow [rn-ohos]`,
};

// ── 枚举映射表（供前端展示） ──

const displayMaps = {
  pluginType: {
    'js_only': '纯JS',
    'native_module': 'NativeModule',
    'native_ui_component': 'NativeUI组件',
    'turbo_module': 'TurboModule',
    'fabric_component': 'Fabric组件',
    'cpp_turbo_module': 'C++Module',
    'native_mixed': '混合类型',
    'unknown': '未知'
  },
  architecture: {
    'standalone': '独立模块',
    'federated': '联合模块',
    'monorepo': '多包仓库'
  },
  archType: {
    'js-only': '纯JS',
    'old-arch': '旧架构',
    'new-arch': '新架构',
    'mixed-arch': '混合架构'
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
    { key: 'native_modules', label: '原生模块', type: 'array_count' },
    {
      key: 'native_dependencies', label: '原生依赖', type: 'dep_summary',
      subKeys: ['android', 'ios', 'cpp']
    },
    { key: 'framework_dependencies', label: 'RN 依赖', type: 'dep_count_blocking' },
    {
      key: 'code_metrics.line_counts', label: '代码量', type: 'code_metrics',
      metricKeys: [
        { key: 'javascript', label: 'JS/TS' },
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
    { key: 'target_api_mapping', label: 'API 映射', type: 'api_mapping_count' },
    { key: 'implementation_strategy.planned_files', label: '规划文件', type: 'array_count' },
    { key: 'permission_mapping', label: '权限', type: 'perm_count' },
    { key: 'risk_items', label: '风险评估', type: 'risk_summary' }
  ]
};

// ── CSV 导出列 ──

const exportColumns = [
  'Name', 'Repo URL', 'Commit Hash', 'Clone Status', 'Clone Time',
  'Module Type', 'Architecture', 'Adaptation Status', 'Quality Score'
];

// ── 阶段产物清单 (用于重跑时清除) ──

const stageOutputFiles = [
  { stageId: 'analysis', files: ['01-analysis.json', '01-analysis-report.md', '01-analysis-prd.md'] },
  { stageId: 'planning', files: ['02-planning.json', '02-planning-report.md'] },
  { stageId: 'test-design', files: ['04-test-cases.json', '04-test-cases.md'] },
  { stageId: 'coding-library', files: ['03-coding-library.json', '03-coding-library-report.md'] },
  { stageId: 'testing', files: ['04-testing.json', '04-testing-report.md'] },
  { stageId: 'device-verify', files: ['04-device-verify.json', '04-device-verify-report.md'] },
  { stageId: 'demo-gen', files: ['05-demo-gen.json', '05-demo-gen-report.md'] },
  { stageId: 'blackbox-verify', files: ['06-blackbox-verify.json', '06-blackbox-verify-report.md'] },
  { stageId: 'test-report', files: ['07-test-report.md'] },
  { stageId: 'summary', files: ['05-summary.json', '05-summary-report.md'] }
];

// ── Agent 资源目录 ──
const agentDir = 'agent-rn';

// ── Workspace Links 配置 ──
const workspaceDirs = ['.claude', '.opencode'];
const workspaceFiles = ['CLAUDE.md'];

/** 自 agent 根目录（agent-rn/）起的文件 → 克隆仓库根目录单文件软链接（无子目录） */
const workspaceExtraSymlinks = [
  { from: '.scripts', to: '.scripts' },
  { from: 'opencode.json', to: 'opencode.json' }
];

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
  workspaceFiles,
  workspaceExtraSymlinks
};
