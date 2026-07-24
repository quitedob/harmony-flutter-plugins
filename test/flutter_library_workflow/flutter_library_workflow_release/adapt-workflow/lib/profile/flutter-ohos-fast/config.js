'use strict';

const base = require('../flutter-ohos/config');

const STAGES = [
  {
    id: 'analysis',
    name: '现状分析',
    agent: 'primary-01-analysis',
    description: '分析插件类型、Channel、依赖、权限，并写入列表页最小字段',
    outputFile: '01-analysis.json',
    outputReport: '01-analysis-prd.md',
    prompt: '这是 Flutter 插件 HarmonyOS 适配项目。请完成现状分析阶段。',
    gate: null,
    edges: [
      { to: 'coding-library', condition: (state, result) => result.success, label: 'success' },
      { to: 'test-design', condition: (state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (state, result) => !result.success, label: 'error' }
    ]
  },
  {
    id: 'coding-library',
    name: '代码编写',
    agent: 'primary-02-coding-library',
    description: '直接完成鸿蒙库代码适配、Example 生成并修复构建问题',
    outputFile: '02-coding-library-report.md',
    outputReport: '02-coding-library-report.md',
    prompt: '这是 Flutter 插件 HarmonyOS 适配项目。请完成鸿蒙库适配与 Example 生成。',
    gate: {
      requiredFiles: ['01-analysis.json'],
      description: '需要现状分析阶段完成'
    },
    edges: [
      { to: 'validation', condition: (state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (state, result) => !result.success, label: 'error' }
    ]
  },
  {
    id: 'validation',
    name: '编码校验',
    agent: 'primary-03-validation',
    description: '独立检查公开 API、OHOS 实现、Example、权限配置并重新构建',
    outputFile: '03-validation-report.md',
    outputReport: '03-validation-report.md',
    prompt: '这是 Flutter 插件 HarmonyOS 适配项目。请独立检查适配结果，修复确认的问题并重新构建。',
    gate: {
      requiredFiles: ['02-coding-library-report.md'],
      description: '需要现状分析和代码编写阶段完成'
    },
    edges: [
      { to: 'quality-review', condition: (state, result) => result.success, label: 'success' },
      { to: 'demo-gen', condition: (state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (state, result) => !result.success, label: 'error' }
    ]
  },
  {
    id: 'quality-review',
    name: '质量审查',
    agent: 'primary-04-quality-review',
    description: '对适配产出的鸿蒙库做白盒质量评估（CodeLinter + 通用架构 + 代码质量与兼容性），只读不改库，输出分级发现与定性结论',
    outputFile: '04-quality-review-report.md',
    outputReport: '04-quality-review-report.md',
    prompt: '这是 Flutter 插件 HarmonyOS 适配项目。请对 ohos/ 适配产出的鸿蒙库做白盒质量评估，输出质量审查报告。',
    gate: {
      requiredFiles: ['03-validation-report.md'],
      description: '需要编码校验阶段完成'
    },
    edges: [
      { to: 'quality-fix', condition: (state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (state, result) => !result.success, label: 'error' }
    ]
  },
  {
    id: 'quality-fix',
    name: '质量修复',
    agent: 'primary-05-quality-fix',
    description: '根据质量审查报告修复鸿蒙库中的质量问题（blocking + important），不改变已有实现的功能逻辑',
    outputFile: '05-quality-fix-report.md',
    outputReport: '05-quality-fix-report.md',
    prompt: '这是 Flutter 插件 HarmonyOS 适配项目。请根据 .ohos-adaptation/04-quality-review-report.md 修复鸿蒙库中的质量问题。',
    gate: {
      requiredFiles: ['04-quality-review-report.md'],
      description: '需要质量审查阶段完成'
    },
    edges: [
      { to: 'END', condition: (state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (state, result) => !result.success, label: 'error' }
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
    prompt: '这是 Flutter 插件 HarmonyOS 适配项目。请基于 .ohos-adaptation/01-analysis-prd.md 完成测试用例设计。',
    gate: {
      requiredFiles: ['01-analysis-prd.md'],
      description: '需要现状分析阶段生成的 PRD 文档'
    },
    edges: [
      { to: 'demo-gen', condition: (state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (state, result) => !result.success, label: 'error' }
    ]
  },
  {
    id: 'demo-gen',
    name: 'Demo 生成',
    agent: 'primary-05-demo-gen2',
    description: '基于测试用例和已适配代码生成可安装的测试 Demo App',
    outputFile: '05-demo-gen.json',
    outputReport: '05-demo-gen-report.md',
    prompt: '这是 Flutter 插件 HarmonyOS 适配项目。请基于测试用例和已适配代码生成测试 Demo App。',
    gate: {
      requiredFiles: ['01-analysis-prd.md', '04-test-cases.json', '03-validation-report.md'],
      description: '需要 PRD、测试用例和编码校验阶段完成'
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
  }
];

const branding = {
  ...base.branding,
  title: 'Flutter → 鸿蒙 适配工作流（高效流程版）',
  subtitle: '高效流程：现状分析、代码编写、编码校验、质量审查、质量修复（质量阶段默认关闭，可在设置中开启）',
  commitMessage: (pluginName) =>
    `feat: OHOS adaptation for ${pluginName}\n\nAutomated adaptation by adapt-workflow [flutter-ohos-fast]`
};

const stageOutputFiles = [
  { stageId: 'analysis', files: ['01-analysis.json', '01-analysis-prd.md'] },
  { stageId: 'coding-library', files: ['02-coding-library-report.md'] },
  { stageId: 'validation', files: ['03-validation-report.md'] },
  { stageId: 'quality-review', files: ['04-quality-review-report.md'] },
  { stageId: 'quality-fix', files: ['05-quality-fix-report.md'] },
  { stageId: 'test-design', files: ['01-test-analysis-report.md', '01-test-points.json', '04-test-cases.json', '03-case-review-report.md'] },
  { stageId: 'demo-gen', files: ['05-demo-gen.json', '05-demo-gen-report.md'] },
  { stageId: 'blackbox-verify', files: ['06-blackbox-verify.json', '06-blackbox-verify-report.md'] }
];

module.exports = {
  ...base,
  STAGES,
  reposDir: 'repos-flutter-fast',
  branding,
  stageOutputFiles,
  agentDir: 'agent-flutter-fast'
};
