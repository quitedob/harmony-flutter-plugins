'use strict';

// ── 阶段定义（与 Flutter/RN 五段命名对齐，产物为 01–05 SDK 专用文件）──

const STAGES = [
  {
    id: 'sdk-analysis',
    name: '现状分析',
    agent: 'primary-sdk-01-analysis',
    description: '分析插件类型、依赖、权限',
    outputFile: '01-analysis.json',
    outputReport: '01-analysis-report.md',
    additionalReports: [
      { file: '01-analysis-prd.md', name: '需求规格（PRD）' },
      { file: 'work_unit_prd/index.md', name: '功能模块 PRD 索引' }
    ],
    prompt:
      '这是一个将 Android SDK 转换为 HarmonyOS SDK 的项目。完成 sdk-analysis（见 primary-sdk-01-analysis.md）' ,
    gate: null,
    // graph-executor / run-graph：必须显式声明边；否则仅有失败边，成功时无出边会报 No edges satisfied
    edges: [
      { to: 'sdk-planning', condition: (state, result) => result.success, label: 'success' },
      { to: 'sdk-test-design', condition: (state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (state, result) => !result.success, label: 'error' }
    ]
  },
  {
    id: 'sdk-planning',
    name: '方案制定',
    agent: 'primary-sdk-02-planning',
    description: '生成 work unit 编码计划',
    outputFile: '02-planning.json',
    outputReport: '02-planning-report.md',
    additionalReports: [
      { file: 'work_unit_plan/index.md', name: 'Work Unit 编码计划索引' }
    ],
    prompt:
      '这是一个将 Android SDK 转换为 HarmonyOS SDK 的项目。请基于 .ohos-adaptation/01-analysis-prd.md 与 .ohos-adaptation/work_unit_prd/index.md 完成 sdk-planning：生成 .ohos-adaptation/work_unit_plan/ 下的 Markdown 编码计划与索引。',
    gate: {
      requiredFiles: ['01-analysis.json', '01-analysis-prd.md', 'work_unit_prd/index.md'],
      description: '需要 sdk-analysis 阶段完成（含总 PRD 与模块 PRD 索引）'
    },
    edges: [
      { to: 'sdk-implementation', condition: (state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (state, result) => !result.success, label: 'error' }
    ]
  },
  {
    id: 'sdk-implementation',
    name: '鸿蒙库适配',
    agent: 'primary-sdk-03-implementation',
    description: '编写 ETS 代码并修复编译问题',
    outputFile: '03-implementation.json',
    outputReport: '03-implementation-report.md',
    prompt:
      '这是一个将 Android SDK 转换为 HarmonyOS SDK 的项目。请基于 01 PRD 与 work_unit_plan 完成 sdk-implementation：ArkTS + HAR。' +
      '鸿蒙工程必须以 ./scaffold/hardemo 为唯一结构基准（整仓复制到仓库内），HAR 在 library/ 子模块，目录与模板严格一致；在工程根（与 hvigorw 同级）执行标准 assembleHar：完整命令行见 agent-android-sdk/.claude/prompts/primary-sdk-03-implementation.md（须含 module=library@default、product=default、no-daemon 等参数；各平台使用已加入 PATH 的 hvigorw）。' +
      '失败则改 library/ 或工程配置后重跑直至成功；禁止未编译标 pass。',
    gate: {
      requiredFiles: ['01-analysis.json', '01-analysis-prd.md', 'work_unit_prd/index.md', 'work_unit_plan/index.md'],
      description: '需要 sdk-analysis 和 sdk-planning 阶段完成（含 work unit plan 索引）'
    },
    edges: [
      { to: 'sdk-har-demo', condition: (state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (state, result) => !result.success, label: 'error' }
    ]
  },
  {
    id: 'sdk-har-demo',
    name: 'example适配',
    agent: 'primary-sdk-04-har-demo',
    description: 'Demo 集成 + 单元测试用例生成',
    outputFile: '04-har-demo.json',
    outputReport: '04-har-demo-report.md',
    prompt:
      '这是一个将 Android SDK 转换为 HarmonyOS SDK 的项目。完成 sdk-har-demo（见 primary-sdk-04-har-demo.md）:' ,
    gate: {
      requiredFiles: ['03-implementation.json', '01-analysis-prd.md', 'work_unit_prd/index.md', 'work_unit_plan/index.md'],
      fieldChecks: [
        {
          file: '03-implementation.json',
          field: 'build_status',
          // 与 03 schema 一致：warning 表示可编译但有告警，仍可进行 Demo/HAP 集成
          expectedOneOf: ['pass', 'warning'],
          errorMsg:
            '库编译未通过 (build_status 须为 pass 或 warning；fail 表示无法编译)，须先完成鸿蒙库适配后再执行本阶段'
        }
      ],
      description: '需要 sdk-implementation 阶段完成且编译通过'
    },
    edges: [
      { to: 'sdk-evaluation', condition: (state, result) => result.success, label: 'success' },
      { to: 'sdk-demo-gen', condition: (state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (state, result) => !result.success, label: 'error' }
    ]
  },
  {
    id: 'sdk-evaluation',
    name: '适配总结',
    agent: 'primary-sdk-05-evaluation',
    description: '汇总报告与集成指南',
    outputFile: '05-evaluation.json',
    outputReport: '05-evaluation-report.md',
    prompt:
      '这是一个将 Android SDK 转换为 HarmonyOS SDK 的项目。请完成 sdk-evaluation：结合 01 PRD、02/03/04 报告和 JSON 评估鸿蒙 HAR 与 Demo。',
    gate: {
      requiredFiles: [
        '01-analysis.json',
        '01-analysis-prd.md',
        '01-analysis-report.md',
        '02-planning.json',
        '02-planning-report.md',
        '03-implementation.json',
        '03-implementation-report.md'
      ],
      description: '需要 sdk-analysis、sdk-planning 和 sdk-implementation 阶段完成（sdk-har-demo 为可选）'
    },
    edges: [
      // 开发路径：evaluation 直接到达终点
      { to: 'END', condition: (state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (state, result) => !result.success, label: 'error' }
    ]
  },
  // ── 第二条路径：用例设计 → 安卓意图验证 → DEMO 生成 → 黑盒验证 ──
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
      requiredFiles: ['01-analysis-prd.md'],
      description: '需要 sdk-analysis 阶段完成（含 PRD）'
    },
    edges: [
      { to: 'sdk-case-confrontation', condition: (state, result) => result.success, label: 'success' },
      { to: 'error-handler', condition: (state, result) => !result.success, label: 'error' }
    ]
  },
  // ── 第三条路径：安卓意图验证（用例与 Android 原生源码意图对照）──
  {
    id: 'sdk-case-confrontation',
    name: '安卓意图验证',
    agent: 'sdk-case-confrontation',
    description: '对照 Android 原生 SDK 源码验证每条鸿蒙测试用例的设计意图是否合理（keep/modify/delete），并修订测试用例',
    outputFile: '06-confrontation.json',
    outputReport: '06-confrontation-report.md',
    additionalReports: [
      { file: '04-test-cases-revised.json', name: '意图验证后修订的测试用例' }
    ],
    prompt:
      '这是一个将 Android SDK 转换为 HarmonyOS SDK 的项目。请基于 .ohos-adaptation/04-test-cases.json 和 Android 原生 SDK 源码进行意图验证，判定每条测试用例的设计意图是否合理（keep/modify/delete），并修订测试用例。',
    gate: {
      requiredFiles: [
        '04-test-cases.json',
        '01-analysis-prd.md',
        '01-analysis.json'
      ],
      description: '需要用例设计阶段和 SDK 分析阶段完成（用于获取 Android 源码位置）'
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
    description: '基于测试用例和已适配 HAR 代码生成可安装的测试 Demo App',
    outputFile: '05-demo-gen.json',
    outputReport: '05-demo-gen-report.md',
    prompt:
      '这是一个将 Android SDK 转换为 HarmonyOS SDK 的项目。请基于 .ohos-adaptation/04-test-cases-revised.json 和 .ohos-adaptation/01-analysis-prd.md 完成 SDK Demo 生成任务：基于测试用例生成可安装到 OHOS 真机的测试 Demo App。',
    gate: {
      requiredFiles: ['04-test-cases-revised.json', '03-case-review-report.md', '01-analysis-prd.md', '01-analysis.json', '04-har-demo.json'],
      description: '需要用例设计（含评审通过）、SDK 分析和 example适配阶段完成'
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

const ADAPTATION_DIR = '.ohos-adaptation';
const reposDir = 'repos-sdk';

const TPC_ORG = 'HarmonyOS-TPC';
const TPC_ORG_URL = `https://github.com/${TPC_ORG}`;
const TARGET_BRANCH = 'harmony';

function buildTpcRepoUrl(name) {
  return `${TPC_ORG_URL}/${name}.git`;
}

const branding = {
  title: 'Android SDK → 鸿蒙 适配工作流',
  subtitle: '批量管理三方原生 SDK 的鸿蒙 HAR 适配，自动化分析、编码与验证',
  addPluginHint: '输入 Android/多平台 SDK 的 Git 仓库地址，克隆至 repos-sdk 后分阶段执行',
  tpcOrgName: 'HarmonyOS-TPC',
  targetBranch: TARGET_BRANCH,
  githubTokenHint: `用于将适配代码推送到 ${TPC_ORG} 组织。需要 repo 权限的 PAT`,
  headerGradient: 'linear-gradient(135deg, #3d2b1f 0%, #c2410c 100%)',
  headerAccent: '#7c2d12',
  commitMessage: (pluginName) =>
    `feat: OHOS HAR migration for ${pluginName}\n\nAutomated by adapt-workflow [android-sdk-ohos]`
};

const displayMaps = {
  pluginType: {
    android_sdk: 'Android SDK',
    multiplatform_sdk: '多平台 SDK',
    unknown: '未知'
  },
  architecture: {
    single_module: '单模块',
    multi_module: '多模块',
    layered: '分层',
    unknown: '未知'
  },
  complexity: {
    L1: 'L1',
    L2: 'L2',
    L3: 'L3',
    L4: 'L4',
    L5: 'L5',
    low: '低',
    medium: '中',
    high: '高',
    very_high: '极高'
  },
  complexityClass: {
    L1: 'success',
    L2: 'success',
    L3: 'pending',
    L4: 'warning',
    L5: 'failed',
    low: 'success',
    medium: 'pending',
    high: 'warning',
    very_high: 'failed'
  },
  targetReadiness: {
    not_adapted: '未适配',
    partially_adapted: '部分适配',
    fully_adapted: '已适配'
  },
  targetReadinessClass: {
    not_adapted: 'pending',
    partially_adapted: 'converting',
    fully_adapted: 'success'
  }
};

const dashboardCards = {
  analysis: [
    { key: 'sdk_name', label: 'SDK', type: 'text' },
    { key: 'sdk_version', label: '版本', type: 'text' },
    { key: 'conversion_source.kind', label: '主源类型', type: 'text' },
    { key: 'architecture_type', label: '架构', type: 'text' },
    { key: 'source_layout.included_modules', label: '模块', type: 'array_count' },
    {
      key: 'public_api_surface',
      label: '公开 API',
      type: 'sdk_api_surface'
    },
    { key: 'platform_coupling_summary', label: '平台耦合', type: 'risk_summary' },
    { key: 'difficulty_level', label: '难度', type: 'text' }
  ],
  planning: [
    { key: 'status', label: '状态', type: 'text' },
    { key: 'work_unit_count', label: 'Work Unit', type: 'text' },
    { key: 'work_unit_plan_index_path', label: '计划索引', type: 'text' },
    { key: 'planning_report_path', label: '规划报告', type: 'text' }
  ]
};

const exportColumns = [
  'Name', 'Repo URL', 'Commit Hash', 'Clone Status', 'Clone Time',
  'SDK Type', 'Architecture', 'Adaptation Status', 'Quality Score'
];

const stageOutputFiles = [
  { stageId: 'sdk-analysis', files: ['01-analysis.json', '01-analysis-report.md', '01-analysis-prd.md', 'work_unit_prd/index.md'] },
  { stageId: 'sdk-planning', files: ['02-planning.json', '02-planning-report.md', 'work_unit_plan/index.md'] },
  { stageId: 'sdk-implementation', files: ['03-implementation.json', '03-implementation-report.md'] },
  { stageId: 'sdk-har-demo', files: ['04-har-demo.json', '04-har-demo-report.md'] },
  { stageId: 'sdk-evaluation', files: ['05-evaluation.json', '05-evaluation-report.md'] },
  { stageId: 'sdk-test-design', files: ['01-test-points.json', '01-test-analysis-report.md', '04-test-cases.json', '03-case-review-report.md'] },
  { stageId: 'sdk-case-confrontation', files: ['06-confrontation.json', '06-confrontation-report.md', '04-test-cases-revised.json'] },
  { stageId: 'sdk-demo-gen', files: ['05-demo-gen.json', '05-demo-gen-report.md'] },
  { stageId: 'sdk-blackbox-verify', files: ['06-blackbox-verify.json', '06-blackbox-verify-report.md'] }
];

const agentDir = 'agent-android-sdk';
const workspaceDirs = ['.claude', '.opencode', 'scaffold'];
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
