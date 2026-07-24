'use strict';

// Android SDK upgrade profile config.

const STAGES = [
  {
    id: 'upgrade-analysis',
    name: '升级分析',
    agent: 'upgrade-01-analysis',
    description: '对比 upstream 与 hmos，分析 Android SDK 上游新版差异并输出升级方案与 PRD',
    outputFile: '01-analysis-prd.md',
    outputReport: '01-analysis-prd.md',
    prompt: '这是 Android SDK HarmonyOS 适配升级项目。请完成升级分析阶段。',
    gate: null,
    edges: [
      { to: 'upgrade-coding', condition: (_state, result) => result.success, label: 'success' },
      { to: 'sdk-test-design', condition: (_state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (_state, result) => !result.success, label: 'error' }
    ]
  },
  {
    id: 'upgrade-coding',
    name: '代码升级',
    agent: 'upgrade-02-coding',
    description: '把 Android SDK 上游新版变化合并到已适配仓库，补齐 OHOS 升级实现并完成构建验证',
    outputFile: '02-upgrade-coding-report.md',
    outputReport: '02-upgrade-coding-report.md',
    prompt: '这是 Android SDK HarmonyOS 适配升级项目。请基于 .ohos-adaptation/01-analysis-prd.md 完成代码升级阶段。',
    gate: {
      requiredFiles: ['01-analysis-prd.md'],
      description: '需要升级分析阶段完成'
    },
    edges: [
      { to: 'END', condition: (_state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (_state, result) => !result.success, label: 'error' }
    ]
  },
  {
    id: 'sdk-test-design',
    name: '用例设计',
    agent: 'primary-sdk-test-design',
    description: '基于 PRD 进行 SDK 测试分析、用例生成与用例评审',
    outputFile: '04-test-cases.json',
    outputReport: '01-test-analysis-report.md',
    additionalReports: [
      { file: '01-test-points.json', name: '测试点汇总' },
      { file: '03-case-review-report.md', name: '用例评审报告' }
    ],
    prompt: '这是 Android SDK HarmonyOS 适配升级项目。请基于 .ohos-adaptation/01-analysis-prd.md 完成 SDK 测试设计流程：解析 PRD 提取功能模块和 API 信息，基于 IBO 模型生成测试分析报告和测试点，然后生成黑盒测试用例并完成用例评审。',
    gate: {
      requiredFiles: ['01-analysis-prd.md'],
      description: '需要升级分析阶段生成的 PRD 文档'
    },
    edges: [
      { to: 'sdk-demo-gen', condition: (_state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (_state, result) => !result.success, label: 'error' }
    ]
  },
  {
    id: 'sdk-demo-gen',
    name: 'Demo 生成',
    agent: 'primary-sdk-demo-gen',
    description: '基于测试用例和已升级代码生成可安装的 HAR 测试 Demo App',
    outputFile: '05-demo-gen.json',
    outputReport: '05-demo-gen-report.md',
    prompt: '这是 Android SDK HarmonyOS 适配升级项目。请基于 .ohos-adaptation/04-test-cases.json、.ohos-adaptation/01-analysis-prd.md 和 02 阶段升级后的 ohos_hardemo/library HAR 代码完成 SDK Demo 生成任务：生成可安装到 OHOS 真机的测试 Demo App。',
    gate: {
      requiredFiles: ['01-analysis-prd.md', '04-test-cases.json', '02-upgrade-coding-report.md'],
      description: '需要 PRD、测试用例和代码升级阶段完成'
    },
    edges: [
      { to: 'sdk-blackbox-verify', condition: (_state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (_state, result) => !result.success, label: 'error' }
    ]
  },
  {
    id: 'sdk-blackbox-verify',
    name: '黑盒验证',
    description: '在真机上运行 Demo + 自动化脚本，执行黑盒验证',
    outputFile: '06-blackbox-verify.json',
    outputReport: '06-blackbox-verify-report.md',
    script: {
      command: 'node',
      args: [
        '{workspaceRoot}/adapt-workflow/bin/android-sdk-ohos-blackbox-verify.js',
        '--repo',
        '{repoPath}'
      ],
      cwd: '{workspaceRoot}'
    },
    prompt: '请执行 SDK 黑盒验证。',
    gate: {
      requiredFiles: ['05-demo-gen.json'],
      description: '需要 DEMO 生成阶段完成'
    },
    edges: [
      { to: 'END', condition: (_state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (_state, result) => !result.success, label: 'error' }
    ]
  }
];

const ADAPTATION_DIR = '.ohos-adaptation';
const reposDir = 'repos_sdk_upgrade';
const agentDir = 'agent-android-sdk-fast';

const branding = {
  title: 'Android SDK → 鸿蒙 升级工作流',
  subtitle: '升级已完成鸿蒙适配的 Android SDK 三方库',
  commitMessage: (name) =>
    `feat: OHOS upgrade for ${name}\n\nAutomated upgrade by adapt-workflow [android-sdk-upgrade]`
};

const stageOutputFiles = [
  { stageId: 'upgrade-analysis', files: ['01-analysis-prd.md'] },
  { stageId: 'upgrade-coding', files: ['02-upgrade-coding-report.md'] },
  { stageId: 'sdk-test-design', files: ['01-test-points.json', '01-test-analysis-report.md', '04-test-cases.json', '03-case-review-report.md'] },
  { stageId: 'sdk-demo-gen', files: ['05-demo-gen.json', '05-demo-gen-report.md'] },
  { stageId: 'sdk-blackbox-verify', files: ['06-blackbox-verify.json', '06-blackbox-verify-report.md'] }
];
const workspaceDirs = ['.claude', '.opencode'];
const workspaceFiles = ['CLAUDE.md'];
const dashboardCards = { analysis: [] };

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
