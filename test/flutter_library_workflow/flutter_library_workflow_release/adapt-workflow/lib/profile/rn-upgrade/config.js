'use strict';

// Upgrade pipeline for React Native plugins that already have a HarmonyOS adaptation.
//
// Mirrors the *shape* of flutter-upgrade (analysis → coding → test-design →
// demo-gen → blackbox-verify), but everything below is React Native's own:
// - RN upgrade agents (upgrade-01-analysis / upgrade-02-coding) that speak
//   Spec / codegen / TurboModule / Fabric / RNOH instead of Dart / Channel.
// - RN test-design / demo-gen agents (primary-02-test-design /
//   primary-05-demo-gen), NOT the Flutter ones.
// - RN blackbox script (rn-ohos-fast-blackbox-verify.js).
// - RN enabledStages keys (rnTestDesign / rnDemoGen / rnBlackboxVerify) — see
//   lib/stages.js isRN branch; framework 'react-native' makes those apply so the
//   test stages default off, just like Flutter's testDesign/demoGen/blackboxVerify.
// Execution reuses the shared lib/agent/executor.js.

// ── 阶段定义 ──

const STAGES = [
  {
    id: 'upgrade-analysis',
    name: '升级分析',
    agent: 'upgrade-01-analysis',
    description: '对比 upstream 与 hmos，分析 RN 插件上游新版差异（JS/TS API、Spec/codegen 契约、架构形态）并输出升级方案与 PRD',
    outputFile: '01-analysis-prd.md',
    outputReport: '01-analysis-prd.md',
    prompt: '这是 React Native 插件 HarmonyOS 适配升级项目。请完成升级分析阶段。',
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
    description: '把 RN 插件上游新版变化合并到已适配仓库，按需重跑 codegen，补齐 OHOS（ETS/C++）TurboModule/Fabric 实现并完成构建验证',
    outputFile: '02-upgrade-coding-report.md',
    outputReport: '02-upgrade-coding-report.md',
    prompt: '这是 React Native 插件 HarmonyOS 适配升级项目。请基于 .ohos-adaptation/01-analysis-prd.md 完成代码升级阶段。',
    gate: {
      requiredFiles: ['01-analysis-prd.md'],
      description: '需要升级分析阶段完成'
    },
    edges: [
      { to: 'demo-gen', condition: (state, result) => result.success && state.settings?.enabledStages?.rnDemoGen === true, label: 'success' },
      { to: 'END', condition: (state, result) => result.success && state.settings?.enabledStages?.rnDemoGen !== true, label: 'success' },
      { to: 'error-handler', condition: (_state, result) => !result.success, label: 'error' }
    ]
  },
  {
    id: 'test-design',
    name: '用例设计',
    agent: 'primary-02-test-design',
    description: '基于 PRD 设计测试用例，输出 04-test-cases.json 和 03-case-review-report.md',
    outputFile: '04-test-cases.json',
    outputReport: '03-case-review-report.md',
    prompt: '这是 React Native 插件 HarmonyOS 适配升级项目。请基于 .ohos-adaptation/01-analysis-prd.md 完成测试用例设计。',
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
    agent: 'primary-05-demo-gen',
    description: '基于测试用例和已升级代码生成可安装的测试 Demo App',
    outputFile: '05-demo-gen.json',
    outputReport: '05-demo-gen-report.md',
    prompt: '这是 React Native 插件 HarmonyOS 适配升级项目。请基于测试用例和已升级代码生成测试 Demo App。',
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
    description: '在真机上运行 Demo + 自动化脚本，执行 RN 升级后的黑盒验证',
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
    prompt: '请执行 React Native 插件升级后的黑盒验证。',
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

// ── 升级产物目录名（与 flutter-upgrade 一致，跟随最新规约）──

const ADAPTATION_DIR = '.ohos-adaptation';

// ── Repos 目录（相对于 WORKSPACE_ROOT），与 upgrade/paths.js 的 repos_<type>_upgrade 对齐 ──

const reposDir = 'repos_rn_upgrade';

// ── Agent 资源目录（复用 rn-fast 的 Agent，含 upgrade/ 提示词与 RN 编译工具 rnohos.py）──

const agentDir = 'agent-rn-fast';

// ── 前端品牌 / UI 文案 ──

const branding = {
  title: 'React Native → 鸿蒙 升级工作流',
  subtitle: '升级已完成鸿蒙适配的 React Native 三方库',
  addPluginHint: '输入已完成鸿蒙适配的三方库与上游仓库地址',
  commitMessage: (name) =>
    `feat: OHOS upgrade for ${name}\n\nAutomated upgrade by adapt-workflow [rn-upgrade]`
};

// ── 阶段产物清单（重跑时清除 / 复用 executor 的 clearOutputsFromStage）──
// 测试类阶段用 RN 实际产出的文件名（对齐 rn-ohos-fast）。

const stageOutputFiles = [
  { stageId: 'upgrade-analysis', files: ['01-analysis-prd.md'] },
  { stageId: 'upgrade-coding', files: ['02-upgrade-coding-report.md'] },
  { stageId: 'test-design', files: ['01-test-points.json', '01-test-analysis-report.md', '04-test-cases.json', '03-case-review-report.md'] },
  { stageId: 'demo-gen', files: ['05-demo-gen.json', '05-demo-gen-report.md'] },
  { stageId: 'blackbox-verify', files: ['06-blackbox-verify.json', '06-blackbox-verify-report.md'] }
];

// ── Workspace Links 配置（复用 ensureWorkspaceLinks，把 Agent 资源软链到升级工作区）──

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
