/**
 * 统一包配置：平台注册表 + 公共参数。
 * 新增一个平台 = 往 PLATFORMS 加一项（+ 对应 agent-*-fast 源目录 + detect 规则）。
 */

/** 对外唯一入口名 = bin = 包入口 agent 名 = managed 标记。 */
export const ENTRY_AGENT_NAME = 'hmos-library-adapter-fast'

/** 入口（路由器）在宿主里显示的 description。 */
export const ENTRY_DESCRIPTION =
  'HarmonyOS 三方库适配统一入口 — 自动判定当前仓库是 Flutter 插件 / React Native 模块 / 原生 Android 库，路由到对应 agent 完成鸿蒙适配。仅处理三方库鸿蒙适配相关问题。'

/** 公共能力源目录（doc 检索 skill，三平台共用，只装一份）。 */
export const COMMON_DIRNAME = 'agent-core'

/**
 * 平台注册表。每项：
 *  id               平台标识（= shared/<id>/、detect 返回值）
 *  agentDir         sibling 单一事实源目录
 *  orchestratorName 该平台编排器在宿主里的（隐藏）子 agent 名，顶层路由器经 Task 唤起它
 *  entryKey         sibling opencode.json 里编排器的 key
 *  stripPrefix      从 opencode key 去掉的前缀，余下作阶段后缀
 *  stagePrefix      阶段子 agent 名前缀
 *  stages?          【控制入口】可选阶段白名单（opencode.json 的阶段 key）。
 *                   定义后：只把这些阶段打入 shared/（stage-agent 会从 opencode.json 删除其余 key
 *                   并删掉对应 prompt）且只注册这些阶段（agent-source）；编排器 entryKey 始终包含。
 *                   省略 = 收录 opencode.json 里所有能解析到 prompt 的阶段（旧行为）。
 */
export const PLATFORMS = [
  { id: 'flutter', agentDir: 'agent-flutter-fast',     orchestratorName: 'flutter-fast', entryKey: 'primary-00-orchestrator', stripPrefix: 'primary-',     stagePrefix: 'flutter-fast',
    // 确定打入的阶段
    stages: ['primary-01-analysis', 'primary-02-coding-library', 'primary-03-validation'] },
  { id: 'rn',      agentDir: 'agent-rn-fast',          orchestratorName: 'rn-fast',      entryKey: 'primary-00-orchestrator', stripPrefix: 'primary-',     stagePrefix: 'rn-fast',
    // 确定打入的阶段
    stages: ['primary-01-analysis', 'primary-02-coding-library', 'primary-03-validation'] },
  { id: 'sdk',     agentDir: 'agent-android-sdk-fast', orchestratorName: 'sdk-fast',     entryKey: 'primary-00-orchestrator', stripPrefix: 'primary-sdk-', stagePrefix: 'sdk-fast',
    // 确定打入的阶段
    stages: ['primary-sdk-01-analysis', 'primary-sdk-02-implementation', 'primary-sdk-03-validation'] },
]

/** rn 平台用 rnohos.py，需 python3。 */
export const NEEDS_PYTHON = true

/** doctor 校验「关键 skill 是否齐」用的名单（含公共 + 各平台代表）。 */
export const REQUIRED_SKILLS = [
  'harmonyos-docs-lookup',
  'harmonyos-sdk-api-lookup',
  'rn-ohos-template',
  'hardemo-template',
  'ohos-coding-guide',
  'flutter-adapted-library',
]

/**
 * 打包排除项（仅影响 npm 包 / OpenCode·harmonybot 部署，不动 agent-*-fast 单一事实源）。
 * test/demo 流水线只在 Claude Code inject 形态用，打入 OpenCode 包没有意义（test 阶段未注册为 agent、
 * 反而徒增体积），故 stage 时剔除：
 *  - EXCLUDED_PROMPT_SUBDIRS：从 shared/<id>/prompts/ 删掉的子目录（孤儿 prompt，pruneStages 不覆盖）。
 *  - EXCLUDED_SKILLS：copySkills 跳过的 skill 名（同时不会写进 skill-map）。
 * 注意：适配脚手架 / 质量类 skill（rn-ohos-template / hardemo-template / *-adapted-library /
 * hmos-library-quality-assessment 等）属适配主线，**不**在此列。
 */
export const EXCLUDED_PROMPT_SUBDIRS = ['test']

export const EXCLUDED_SKILLS = [
  // 三平台「测试用例」流水线：分析 / 生成 / 评审 / 报告
  '01-test-analysis', '02-test-case-gen', '03-case-review', 'test-report',
  '01-sdk-test-analysis', '02-sdk-test-case-gen', '03-sdk-case-review',
  'flu-plugins-hypium-testcase-gen',
  // demo/example「生成器」（注意：hardemo-template 是适配脚手架、保留；下列是 demo 生成器、剔除）
  'rn-plugin-example-generator', 'sdk-hardemo-generator', 'flutter-plugin-example-generator2',
]
