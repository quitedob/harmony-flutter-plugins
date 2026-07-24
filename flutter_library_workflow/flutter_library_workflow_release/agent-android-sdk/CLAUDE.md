# 三方 Android SDK → 鸿蒙（ArkTS / HAR）— 全局规则

本资源包由 **adapt-workflow** 的 **android-sdk-ohos** Profile 使用。Agent 工作目录（CWD）通常为 **`repos-sdk/{仓库名}/`**，但不得假设 CWD 一定是 SDK 仓库根；CWD 也可能是 SDK 集合目录、外层工作区、Gradle 工程子目录或某个模块目录。

## 路径约定

- **Workspace 根**：包含 `repos-sdk/`、`agent-android-sdk/` 或流水线入口配置的上层工作区。
- **输入目录（CWD）**：当前命令启动目录，只能作为初始线索，不等同于 SDK 根。
- **SDK 集合目录**：包含多个候选 SDK 仓库的目录，例如 `repos-sdk/`。集合目录本身通常不是待改 SDK。
- **sdk仓库根（任务目录）**：真正承载当前 SDK 的仓库/工程根，通常包含 `.git`、`README*`、`settings.gradle*`、`gradlew*` 等线索；各阶段 JSON/报告必须写入此目录下的 `.ohos-adaptation/`。
- **Gradle 工程根**：包含 `settings.gradle` / `settings.gradle.kts` 的目录，可能与 sdk仓库根一致，也可能是其子目录。
- **主源目录**：`conversion_source.relative_root` 指向的真实源码根，相对 sdk仓库根。
- **适配产物**：写入 sdk仓库根下 **`.ohos-adaptation/`**。

第一阶段必须先完成 `source_layout` 识别，再进行 SDK 功能/API 分析。后续阶段必须读取 `01-analysis.json.source_layout`，以它约束源码扫描、修改范围和验证命令；无需在每个阶段 JSON 中重复写入完整 `source_layout`。

## 运行环境

各阶段 Agent 必须继承执行器传入或上下文提供的当前操作系统类型 `current_os` 与 shell；若未显式提供，以当前工具环境为准。所有命令必须使用当前 OS/shell 的语法，命令示例只表示意图，执行前需要改写为当前环境可运行的形式。

## 路径变量

所有阶段执行文件读写、复制、命令运行时，必须先建立并贯穿使用以下**绝对路径变量**；不要用 `./.opencode`、`../../agent-android-sdk` 这类相对路径猜测资源位置。

| 变量 | 含义 |
|------|------|
| `SDK_REPO_ROOT_ABS` | 当前 SDK 仓库/任务根的绝对路径；01 阶段识别得到，02~05 阶段从 `01-analysis.json.source_layout` 继承并解析 |
| `ADAPTATION_ROOT_ABS` | `${SDK_REPO_ROOT_ABS}/.ohos-adaptation` |
| `WORKSPACE_ROOT_ABS` | 包含 `repos-sdk/` 与 `agent-android-sdk/` 的工作区根绝对路径；无法从 `source_layout.workspace_root` 直接得到时，从 `SDK_REPO_ROOT_ABS` 向上查找 `agent-android-sdk` |
| `AGENT_ROOT_ABS` | `${WORKSPACE_ROOT_ABS}/agent-android-sdk` |
| `SCHEMA_ROOT_ABS` | `${AGENT_ROOT_ABS}/.opencode/schema` |
| `SKILLS_ROOT_ABS` | `${AGENT_ROOT_ABS}/.claude/skills` |
| `SCAFFOLD_ROOT_ABS` | `${AGENT_ROOT_ABS}/scaffold` |

JSON 中要求相对路径的字段仍按 schema 写相对 `SDK_REPO_ROOT_ABS` 的路径；但真实工具调用必须使用上述绝对路径变量。

| 资源 | 运行期读取路径 |
|------|-------------|
| JSON Schema | `${SCHEMA_ROOT_ABS}/json-schema/` |
| Schema Docs | `${SCHEMA_ROOT_ABS}/docs/` |
| Skills | `${SKILLS_ROOT_ABS}/` |
| HAR + Demo 工程模板（只读） | `${SCAFFOLD_ROOT_ABS}/hardemo/`（**entry** + **library** 多模块，HAR 在 **`library/`**） |


## 目录结构识别闭环

`01-analysis.json` 必须包含 `source_layout`。该字段用于回答：

- 当前 CWD 是集合目录、sdk仓库根、Gradle 根、模块目录还是未知目录。
- 真正的 `sdk_repo_root`、`gradle_root`、`settings_file` 在哪里。
- `settings.gradle*` 实际 include 了哪些 active modules，以及 `projectDir` 是否把模块映射到子目录。
- 哪些模块是 `sdk_core` / `sdk_extension`，哪些是 `sample_app` / `demo_app`，哪些目录存在但未启用。
- 后续阶段允许分析、允许修改、应排除、应执行验证的路径边界。

后续阶段不得只基于目录名 `app`、`sample`、`library` 猜测角色；必须优先使用 `source_layout.included_modules[].type/role/active` 与 Gradle 证据。

## sdk-analysis 产物

| 类型 | 文件                                                                                          |
|------|---------------------------------------------------------------------------------------------|
| 结构化 | `${ADAPTATION_ROOT_ABS}/01-analysis.json`                                                         |
| 报告 | `${ADAPTATION_ROOT_ABS}/01-analysis-report.md`                                                |
| 需求规格（PRD） | `${ADAPTATION_ROOT_ABS}/01-analysis-prd.md`（以 01 阶段 prompt/schema 约束为准） |
| 模块 PRD 索引 | `${ADAPTATION_ROOT_ABS}/work_unit_prd/index.md` |
| 模块 PRD | `${ADAPTATION_ROOT_ABS}/work_unit_prd/F-xx-*.md` |

## 能力索引闭环

| 阶段 | 必须传递的能力索引 |
|------|------------------|
| sdk-analysis | `01-analysis-prd.md` + `work_unit_prd/F-xx-*.md`：平台无关能力契约、模块 PRD 与初步分类 |
| sdk-planning | `work_unit_plan/WU-xxx-*.md`：四类迁移决策、HarmonyOS 主方案、UI 转换映射（UI WU 内嵌 `## UI 转换映射`：Android UI 元素→ArkUI+层级+保真度+验收，03 按此编码）、资源/权限/Native/依赖计划与编码验收 |
| sdk-implementation | `03-implementation-report.md`：work unit 执行结果、能力实现证据、宿主契约或裁剪说明 |
| sdk-har-demo | `04-har-demo-report.md`：Demo 设计、权限与设备能力闭环、编译和运行说明 |
| sdk-evaluation | `capability_decision_audit`：跨阶段一致性与降级策略审计 |

## Work Unit 执行闭环

`work_unit_plan/index.md` 是 02 → 03 的唯一主执行队列。02 主 Agent 必须先把模块 PRD 映射、合并或少量补充为确定的 `WU-xxx` 编码队列，再让 planner 子 Agent 为每个已确定 WU 写 Markdown 编码计划；03 阶段只能按该索引调度代码实现，不得从旧的 `02-planning.json.implementation_work_units`、文件映射、符号映射或临时猜测中重新拼执行队列。

work unit 表示“平台无关能力切片”，不是 Android 类、方法或文件。Android 类/方法/文件只能作为证据、输入范围和验收线索；一个 work unit 可以对应多个 Android 类，也可以把一个 Android 类拆成多个能力切片。拆分优先保证功能闭包、目标文件边界清晰、单次 AI 上下文可完成。

`work_unit_plan/index.md` 中的 `depends_on` / 建议执行顺序是能力实现顺序的主依据。03 阶段必须优先满足 work unit 依赖，再执行依赖它的单元；依赖未完成时，不得把非门面单元标记为完整实现。

## 依赖层级与门面拆分规则

当大能力 A 依赖其他能力中的小切片 B1 / C1 / D1 时，不要强行“先完整实现 A”。正确拆法是：

- `A-contract` / `A-facade`：公开 API、类型、导出、宿主契约等稳定门面，可先实现。
- `B1` / `C1` / `D1`：A 所依赖的下层能力切片，按各自策略实现。
- `A-orchestration`：A 的完整业务编排，必须在 `depends_on_unit_ids` 中依赖 B1 / C1 / D1，待依赖完成后再实现。

非 `contract` / `facade` 性质的 work unit 如果依赖未完成，只能标记为 blocked / deferred，或只留下明确说明的临时接线点；不得宣称能力已完整迁移。

## SDK 各阶段 Schema（开发路径01–05）

| 阶段 | Schema 文件                       |
|------|---------------------------------|
| sdk-analysis | `01-analysis.schema.json`       |
| sdk-planning | `02-planning.schema.json`       |
| sdk-implementation | `03-implementation.schema.json` |
| sdk-har-demo | `04-har-demo.schema.json`       |
| sdk-evaluation | `05-evaluation.schema.json` |

## SDK 测试路径（21–25）

开发路径(01-05)之外，本 Agent 同步支持测试路径：**用例设计 → 安卓意图验证 → Demo 生成 → 黑盒验证**。两条路径均以 `01-analysis-prd.md` 为公共输入；测试路径产物写入同一 `.ohos-adaptation/` 目录。

**测试路径阶段：**

| 阶段 | Agent | 产物 | Schema |
|------|-------|------|--------|
| 21 测试分析 | `sdk-test-analysis` | `01-test-points.json` + `01-test-analysis-report.md` | `11-test-analysis.schema.json` |
| 22 用例生成 | `sdk-test-case-gen` | `04-test-cases.json` | `12-test-cases.schema.json` |
| 23 用例评审 | `sdk-case-review` | `03-case-review-report.md` | `13-case-review.schema.json` |
| —— 安卓意图验证 | `sdk-case-confrontation` | `06-confrontation.json` + `06-confrontation-report.md` + `04-test-cases-revised.json` | `16-confrontation.schema.json` |
| 24 Demo 生成 | `primary-sdk-demo-gen` | `05-demo-gen.json` + `05-demo-gen-report.md` | `14-demo-gen.schema.json` |
| 25 黑盒验证 | `sdk-blackbox-verify` | `sdk-blackbox-verify.json` + `sdk-blackbox-verify-report.md` | 无 Schema |

`primary-sdk-test-design` 为测试设计主 Agent，编排 21→22→23 三个 SubAgent；`sdk-case-confrontation` 为独立阶段，在测试设计完成后自动触发，对照 Android 原生 SDK 源码验证每条鸿蒙测试用例的设计意图是否合理（keep/modify/delete），并修订测试用例；`primary-sdk-demo-gen` 独立执行阶段 24。

**测试路径与开发路径的关系：**

- PRD 来自开发路径阶段 1 的 `01-analysis-prd.md`
- SDK 分析参考 `01-analysis.json`（含 `source_layout`）与 `work_unit_prd/index.md`
- Demo 生成可复用开发路径 `04-har-demo.json` 的工程索引、`04-har-demo-report.md` 的 Demo 说明，以及 03/04 已生成的 HAR 代码

Markdown 报告与输出使用**中文**。
模型输出使用**中文**。

## 约束

- **禁止猜测**鸿蒙 API 签名；不确定须检索核实。
- **禁止**用 npm 纯 `.ts` 包冒充可集成的鸿蒙 HAR；交付须 **hvigor + HAR + `.ets`**。
- **sdk-implementation**：以 **`${SCAFFOLD_ROOT_ABS}/hardemo`** 为唯一结构基准，在复制体的 **`library/`** 实现 HAR；在**工程根**执行 **`hvigorw assembleHar --mode module -p module=library@default -p product=default --no-daemon`**（各平台 **`hvigorw`**，PATH 已配置命令行工具）。
- **sdk-har-demo**：与 03 共用 **hardemo** 形态，在 **`scaffold_root`** 执行 **`hvigorw -e assembleHap …`** 完成 **entry + library** 闭环；环境不可用时如实标记失败/不可验证；用例失败修 **HAR/entry Demo** 并重跑。
- **sdk-demo-gen**：基于测试用例生成 HAR Demo App，以 **`${SCAFFOLD_ROOT_ABS}/hardemo`** 为结构基准；P0 测试用例须有 UI 入口。
- **禁止**用 `read` 访问工作区外的本机路径（command-line-tools 下 `hvigor-ohos-sdk`、`node_modules` 等）核对 hvigor 导出；见 `primary-sdk-03-implementation.md`。
