'use strict';

const base = require('../rn-ohos/config');

const STAGES = [
  {
    id: 'analysis',
    name: '现状分析',
    agent: 'primary-01-analysis',
    description: '分析 RN 模块类型、Bridge/TurboModule、依赖、权限，并写入列表页最小字段',
    outputFile: '01-analysis.json',
    outputReport: '01-analysis-prd.md',
    prompt: '这是 React Native 模块 HarmonyOS 适配项目。请完成现状分析阶段。',
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
    description: '直接完成 RN 鸿蒙原生模块适配、Example 生成并修复构建问题',
    outputFile: '02-coding-library-report.md',
    outputReport: '02-coding-library-report.md',
    prompt: '这是 React Native 模块 HarmonyOS 适配项目。请完成鸿蒙库适配与 Example 生成。',
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
    description: '独立复查公开 API 覆盖、假实现、TurboModule/Fabric 注册、UI 与构建结果，修复后重新构建',
    outputFile: '03-validation-report.md',
    outputReport: '03-validation-report.md',
    prompt: '这是 React Native 模块 HarmonyOS 适配项目。请独立检查适配结果，修复确认的问题并重新构建。',
    gate: {
      requiredFiles: ['01-analysis.json', '01-analysis-prd.md', '02-coding-library-report.md'],
      description: '需要现状分析和代码编写阶段完成'
    },
    edges: [
      { to: 'rn-quality-review', condition: (state, result) => result.success, label: 'success' },
      { to: 'demo-gen', condition: (state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (state, result) => !result.success, label: 'error' }
    ]
  },
  {
    id: 'rn-quality-review',
    name: '质量审查',
    agent: 'primary-04-quality-review',
    description: '对适配产出的鸿蒙库做白盒质量评估（CodeLinter + 通用架构 + 代码质量与兼容性），只读不改库，输出分级发现与定性结论',
    outputFile: '04-quality-review-report.md',
    outputReport: '04-quality-review-report.md',
    prompt: '这是 React Native 模块 HarmonyOS 适配项目。请对 ohos/harmony 下适配产出的鸿蒙库做白盒质量评估，输出质量审查报告。',
    gate: {
      requiredFiles: ['03-validation-report.md'],
      description: '需要编码校验阶段完成'
    },
    edges: [
      { to: 'rn-quality-fix', condition: (state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (state, result) => !result.success, label: 'error' }
    ]
  },
  {
    id: 'rn-quality-fix',
    name: '质量修复',
    agent: 'primary-05-quality-fix',
    description: '根据质量审查报告修复鸿蒙库中的质量问题（blocking + important），不改变已有实现的功能逻辑',
    outputFile: '05-quality-fix-report.md',
    outputReport: '05-quality-fix-report.md',
    prompt: '这是 React Native 模块 HarmonyOS 适配项目。请根据 .ohos-adaptation/04-quality-review-report.md 修复鸿蒙库中的质量问题。',
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
    agent: 'primary-02-test-design',
    description: '基于 PRD 设计测试用例，输出 04-test-cases.json 和 03-case-review-report.md',
    outputFile: '04-test-cases.json',
    outputReport: '03-case-review-report.md',
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
    id: 'demo-gen',
    name: 'DEMO 生成',
    agent: 'primary-05-demo-gen',
    description: '基于测试用例和已适配代码生成可安装的测试 Demo App',
    outputFile: '05-demo-gen.json',
    outputReport: '05-demo-gen-report.md',
    prompt: '请基于测试用例和已适配代码生成测试 Demo App。',
    gate: {
      requiredFiles: ['01-analysis-prd.md', '02-coding-library-report.md', '03-validation-report.md', '04-test-cases.json'],
      description: '需要代码编写、编码校验和用例设计阶段完成'
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
        '{workspaceRoot}/adapt-workflow/bin/rn-ohos-fast-blackbox-verify.js',
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
      // 黑盒验证失败时也会落盘 06-blackbox-verify.json（含失败原因与用例明细），
      // 测试报告阶段必须照常执行，把失败结果如实写入报告，因此无条件进入 test-report。
      { to: 'test-report', condition: () => true, label: 'always' }
    ]
  },
  {
    id: 'test-report',
    name: '测试报告',
    agent: 'test-report',
    description: '汇总测试设计、用例评审、Demo 生成、黑盒验证全流程结果，输出端到端测试报告',
    outputFile: '07-test-report.md',
    outputReport: '07-test-report.md',
    prompt: '请基于 .ohos-adaptation/ 下的测试设计、用例评审、Demo 生成、黑盒验证产物，汇总生成端到端测试报告，输出到 .ohos-adaptation/07-test-report.md。',
    gate: {
      requiredFiles: ['06-blackbox-verify.json'],
      description: '需要黑盒验证阶段完成'
    },
    edges: [
      { to: 'END', condition: (state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (state, result) => !result.success, label: 'error' }
    ]
  }
];

const branding = {
  ...base.branding,
  title: 'React Native → 鸿蒙 适配工作流（高效流程版）',
  subtitle: '高效流程：现状分析、代码编写、编码校验、质量审查、质量修复、用例设计、Demo 生成、黑盒验证、测试报告（质量与测试阶段默认关闭，可在设置中开启）',
  commitMessage: (pluginName) =>
    `feat: OHOS adaptation for ${pluginName}\n\nAutomated adaptation by adapt-workflow [rn-ohos-fast]`
};

const stageOutputFiles = [
  { stageId: 'analysis', files: ['01-analysis.json', '01-analysis-report.md', '01-analysis-prd.md'] },
  { stageId: 'coding-library', files: ['02-coding-library-report.md'] },
  { stageId: 'validation', files: ['03-validation-report.md'] },
  { stageId: 'rn-quality-review', files: ['04-quality-review-report.md'] },
  { stageId: 'rn-quality-fix', files: ['05-quality-fix-report.md'] },
  { stageId: 'test-design', files: ['01-test-points.json', '01-test-analysis-report.md', '04-test-cases.json', '03-case-review-report.md'] },
  { stageId: 'demo-gen', files: ['05-demo-gen.json', '05-demo-gen-report.md'] },
  { stageId: 'blackbox-verify', files: ['06-blackbox-verify.json', '06-blackbox-verify-report.md'] },
  { stageId: 'test-report', files: ['07-test-report.md'] }
];

module.exports = {
  ...base,
  STAGES,
  reposDir: 'repos-rn-fast',
  branding,
  stageOutputFiles,
  agentDir: 'agent-rn-fast',
  // fast 线产物目录与 sdk/flutter 对齐为 .ohos-adaptation（覆盖 base rn-ohos 的 .ohos-adaptation）。
  // 仅影响 rn-ohos-fast profile；非 fast rn-ohos 与其 agent-rn 仍用 .ohos-adaptation。
  ADAPTATION_DIR: '.ohos-adaptation'
};
