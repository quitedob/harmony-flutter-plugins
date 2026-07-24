'use strict';

const STAGES = [
  {
    id: 'upgrade-analysis',
    name: '升级分析',
    agent: 'upgrade-01-analysis',
    description: '对比 upstream 与 hmos，分析 Flutter 插件上游新版差异并输出升级方案与 PRD',
    outputFile: '01-analysis-prd.md',
    outputReport: '01-analysis-prd.md',
    prompt: '这是 Flutter 插件 HarmonyOS 适配升级项目。请完成升级分析阶段。',
    gate: null,
    edges: [
      { to: 'upgrade-coding', condition: (_state, result) => result.success, label: 'success' },
      { to: 'test-design', condition: (_state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (_state, result) => !result.success, label: 'error' }
    ]
  },
  {
    id: 'upgrade-coding',
    name: '代码升级',
    agent: 'upgrade-02-coding',
    description: '把 Flutter 插件上游新版变化合并到已适配仓库，补齐 OHOS 升级实现并完成构建验证',
    outputFile: '02-upgrade-coding-report.md',
    outputReport: '02-upgrade-coding-report.md',
    prompt: '这是 Flutter 插件 HarmonyOS 适配升级项目。请基于 .ohos-adaptation/01-analysis-prd.md 完成代码升级阶段。',
    gate: {
      requiredFiles: ['01-analysis-prd.md'],
      description: '需要升级分析阶段完成'
    },
    edges: [
      { to: 'demo-gen', condition: (state, result) => result.success && state.settings?.enabledStages?.demoGen === true, label: 'success' },
      { to: 'END', condition: (state, result) => result.success && state.settings?.enabledStages?.demoGen !== true, label: 'success' },
      { to: 'error-handler', condition: (_state, result) => !result.success, label: 'error' }
    ]
  },
  {
    id: 'test-design',
    name: '用例设计',
    agent: 'primary-04-test-design',
    description: '基于 PRD 设计测试用例，输出测试点、测试用例 JSON 与评审报告',
    outputFile: '04-test-cases.json',
    outputReport: '03-case-review-report.md',
    additionalReports: [
      { file: '01-test-analysis-report.md', name: '测试分析报告' },
      { file: '01-test-points.json', name: '测试点汇总' }
    ],
    prompt: '这是 Flutter 插件 HarmonyOS 适配升级项目。请基于 .ohos-adaptation/01-analysis-prd.md 完成测试用例设计。',
    gate: {
      requiredFiles: ['01-analysis-prd.md'],
      description: '需要升级分析阶段生成的 PRD 文档'
    },
    edges: [
      { to: 'demo-gen', condition: (_state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (_state, result) => !result.success, label: 'error' }
    ]
  },
  {
    id: 'demo-gen',
    name: 'Demo 生成',
    agent: 'primary-05-demo-gen2',
    description: '基于测试用例和已升级代码生成可安装的测试 Demo App',
    outputFile: '05-demo-gen.json',
    outputReport: '05-demo-gen-report.md',
    prompt: '这是 Flutter 插件 HarmonyOS 适配升级项目。请基于测试用例和已升级代码生成测试 Demo App。',
    gate: {
      requiredFiles: ['01-analysis-prd.md', '04-test-cases.json', '02-upgrade-coding-report.md'],
      description: '需要 PRD、测试用例和代码升级阶段完成'
    },
    edges: [
      { to: 'blackbox-verify', condition: (_state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (_state, result) => !result.success, label: 'error' }
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
    prompt: '请执行 Flutter 插件升级后的黑盒验证。',
    gate: {
      requiredFiles: ['05-demo-gen.json'],
      description: '需要 Demo 生成阶段完成'
    },
    edges: [
      { to: 'END', condition: (_state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (_state, result) => !result.success, label: 'error' }
    ]
  }
];

const ADAPTATION_DIR = '.ohos-adaptation';
const reposDir = 'repos_flutter_upgrade';
const agentDir = 'agent-flutter-fast';

const branding = {
  title: 'Flutter → 鸿蒙 升级工作流',
  subtitle: '升级已完成鸿蒙适配的 Flutter 三方库',
  addPluginHint: '输入已完成鸿蒙适配的三方库与上游仓库地址',
  commitMessage: (name) =>
    `feat: OHOS upgrade for ${name}\n\nAutomated upgrade by adapt-workflow [flutter-upgrade]`
};

const stageOutputFiles = [
  { stageId: 'upgrade-analysis', files: ['01-analysis-prd.md'] },
  { stageId: 'upgrade-coding', files: ['02-upgrade-coding-report.md'] },
  { stageId: 'test-design', files: ['01-test-analysis-report.md', '01-test-points.json', '04-test-cases.json', '03-case-review-report.md'] },
  { stageId: 'demo-gen', files: ['05-demo-gen.json', '05-demo-gen-report.md'] },
  { stageId: 'blackbox-verify', files: ['06-blackbox-verify.json', '06-blackbox-verify-report.md'] }
];

const workspaceDirs = ['.claude', '.opencode'];
const workspaceFiles = ['CLAUDE.md'];

const dashboardCards = {
  analysis: []
};

module.exports = {
  STAGES,
  ADAPTATION_DIR,
  reposDir,
  agentDir,
  branding,
  stageOutputFiles,
  workspaceDirs,
  workspaceFiles,
  dashboardCards
};
