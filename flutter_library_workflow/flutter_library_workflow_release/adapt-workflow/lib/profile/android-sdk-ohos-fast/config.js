'use strict';

const base = require('../android-sdk-ohos/config');

const STAGES = [
  {
    id: 'sdk-analysis',
    name: '现状分析',
    agent: 'primary-sdk-01-analysis',
    description: '分析 SDK 类型、模块、API、依赖、权限，并写入列表页最小字段',
    outputFile: '01-analysis.json',
    outputReport: '01-analysis-prd.md',
    prompt: '这是 Android SDK 转 HarmonyOS SDK 项目。请完成现状分析阶段。',
    gate: null,
    edges: [
      { to: 'sdk-implementation', condition: (state, result) => result.success, label: 'success' },
      { to: 'sdk-test-design', condition: (state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (state, result) => !result.success, label: 'error' }
    ]
  },
  {
    id: 'sdk-implementation',
    name: '代码编写',
    agent: 'primary-sdk-02-implementation',
    description: '直接完成 ArkTS/HAR 适配、Demo 生成并修复构建问题',
    outputFile: '02-implementation-report.md',
    outputReport: '02-implementation-report.md',
    prompt: '这是 Android SDK 转 HarmonyOS SDK 项目。请完成鸿蒙 HAR 适配与 Demo 生成。',
    gate: {
      requiredFiles: ['01-analysis.json'],
      description: '需要现状分析阶段完成'
    },
    edges: [
      { to: 'sdk-validation', condition: (state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (state, result) => !result.success, label: 'error' }
    ]
  },
  {
    id: 'sdk-validation',
    name: '编码校验',
    agent: 'primary-sdk-03-validation',
    description: '独立检查功能、UI、Demo 和构建结果，修复后重新验证',
    outputFile: '03-validation-report.md',
    outputReport: '03-validation-report.md',
    prompt: '这是 Android SDK 转 HarmonyOS SDK 项目。请独立检查适配结果，修复确认的问题并重新构建。',
    gate: {
      requiredFiles: ['02-implementation-report.md'],
      description: '需要现状分析和代码编写阶段完成'
    },
    edges: [
      { to: 'sdk-quality-review', condition: (state, result) => result.success, label: 'success' },
      { to: 'sdk-demo-gen', condition: (state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (state, result) => !result.success, label: 'error' }
    ]
  },
  {
    id: 'sdk-quality-review',
    name: '质量审查',
    agent: 'primary-sdk-04-quality-review',
    description: '对适配产出的 HAR 库做白盒质量评估（架构 + 代码质量 + 兼容性），只读不改库，输出分级发现与定性结论',
    outputFile: '04-quality-review-report.md',
    outputReport: '04-quality-review-report.md',
    prompt: '这是 Android SDK 转 HarmonyOS SDK 项目。请对 ohos_hardemo/library 适配产出的 HAR 库做白盒质量评估，输出质量审查报告。',
    gate: {
      requiredFiles: ['03-validation-report.md'],
      description: '需要编码校验阶段完成'
    },
    edges: [
      { to: 'sdk-quality-fix', condition: (state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (state, result) => !result.success, label: 'error' }
    ]
  },
  {
    id: 'sdk-quality-fix',
    name: '质量修复',
    agent: 'primary-sdk-05-quality-fix',
    description: '根据质量审查报告修复 HAR 库中的质量问题（blocking + important），不改变已有实现的功能逻辑',
    outputFile: '05-quality-fix-report.md',
    outputReport: '05-quality-fix-report.md',
    prompt: '这是 Android SDK 转 HarmonyOS SDK 项目。请根据 .ohos-adaptation/04-quality-review-report.md 修复 HAR 库中的质量问题。',
    gate: {
      requiredFiles: ['04-quality-review-report.md'],
      description: '需要质量审查阶段完成'
    },
    edges: [
      { to: 'END', condition: (state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (state, result) => !result.success, label: 'error' }
    ]
  },
  // ── 测试路径：用例设计 → DEMO 生成 → 黑盒验证 ──
  // 从 sdk-analysis 分叉，与开发路径并行；demo-gen 通过 gate 依赖开发路径产物（02-implementation-report.md）
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
    prompt:
      '这是一个将 Android SDK 转换为 HarmonyOS SDK 的项目。请基于 .ohos-adaptation/01-analysis-prd.md 完成 SDK 测试设计流程：解析 PRD 提取功能模块和 API 信息，基于 IBO 模型生成测试分析报告和测试点，然后生成黑盒测试用例并完成用例评审。',
    gate: {
      requiredFiles: ['01-analysis.json', '01-analysis-prd.md'],
      description: '需要现状分析阶段完成（含 PRD）'
    },
    edges: [
      { to: 'sdk-demo-gen', condition: (state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (state, result) => !result.success, label: 'error' }
    ]
  },
  {
    id: 'sdk-demo-gen',
    name: 'DEMO 生成',
    agent: 'primary-sdk-demo-gen',
    description: '基于测试用例和 02 阶段已适配的 ohos_hardemo HAR 代码生成可安装的测试 Demo App',
    outputFile: '05-demo-gen.json',
    outputReport: '05-demo-gen-report.md',
    prompt:
      '这是一个将 Android SDK 转换为 HarmonyOS SDK 的项目。请基于 .ohos-adaptation/04-test-cases.json、.ohos-adaptation/01-analysis-prd.md 和 02 阶段生成的 ohos_hardemo/library HAR 代码完成 SDK Demo 生成任务：生成可安装到 OHOS 真机的测试 Demo App。',
    gate: {
      requiredFiles: ['04-test-cases.json', '03-case-review-report.md', '01-analysis-prd.md', '01-analysis.json', '03-validation-report.md'],
      description: '需要用例设计（含评审）、现状分析和编码校验阶段完成（HAR 来自 02 阶段 ohos_hardemo）'
    },
    edges: [
      { to: 'sdk-blackbox-verify', condition: (state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (state, result) => !result.success, label: 'error' }
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
      { to: 'END', condition: (state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (state, result) => !result.success, label: 'error' }
    ]
  }
];

const branding = {
  ...base.branding,
  title: 'Android SDK → 鸿蒙 适配工作流（高效流程版）',
  subtitle: '高效流程：现状分析、代码编写、编码校验、质量审查、质量修复（质量阶段默认关闭，可在设置中开启）',
  commitMessage: (pluginName) =>
    `feat: OHOS HAR migration for ${pluginName}\n\nAutomated by adapt-workflow [android-sdk-ohos-fast]`
};

const stageOutputFiles = [
  { stageId: 'sdk-analysis', files: ['01-analysis.json', '01-analysis-prd.md'] },
  { stageId: 'sdk-implementation', files: ['02-implementation-report.md'] },
  { stageId: 'sdk-validation', files: ['03-validation-report.md'] },
  { stageId: 'sdk-quality-review', files: ['04-quality-review-report.md'] },
  { stageId: 'sdk-quality-fix', files: ['05-quality-fix-report.md'] },
  { stageId: 'sdk-test-design', files: ['01-test-points.json', '01-test-analysis-report.md', '04-test-cases.json', '03-case-review-report.md'] },
  { stageId: 'sdk-demo-gen', files: ['05-demo-gen.json', '05-demo-gen-report.md'] },
  { stageId: 'sdk-blackbox-verify', files: ['06-blackbox-verify.json', '06-blackbox-verify-report.md'] }
];

module.exports = {
  ...base,
  STAGES,
  reposDir: 'repos-sdk-fast',
  branding,
  stageOutputFiles,
  agentDir: 'agent-android-sdk-fast',
  workspaceDirs: ['.claude', '.opencode'],
  workspaceFiles: ['CLAUDE.md']
};
