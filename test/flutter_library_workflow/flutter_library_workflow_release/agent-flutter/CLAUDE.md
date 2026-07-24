# Flutter 插件鸿蒙（OpenHarmony）适配项目 — 全局规则

本项目通过多阶段 Agent 流水线，自动化完成 Flutter 插件到鸿蒙平台的适配工作。

## 项目上下文与路径约定

- **工作目录（CWD）**：Agent 在 `repos/{plugin_name}/` 目录下运行
- **适配产物**：所有阶段输出写入 CWD 下的 `.ohos-adaptation/` 目录
- **Agent 资源**：`.claude/`、`.opencode/`、`CLAUDE.md` 通过符号链接映射到每个 repo 目录中，Agent 直接通过**本地路径**访问

### 路径解析规则

CWD 内的 `.opencode/` 和 `.claude/` 是指向 Agent 资源目录的符号链接，直接用 `./` 前缀访问：

```
CWD = repos/{plugin_name}/
./.opencode/       → Agent 资源目录（OpenCode 插件 等）
./.claude/         → Agent Prompt、Skills
./CLAUDE.md        → 本文件（全局规则）
../                → repos/（同级插件仓库）
.ohos-adaptation/  → 适配产物输出
```

### 通用资源路径

| 资源 | 从 CWD 访问 |
|------|------------|
| 阶段产物 Schema / 校验规范 | 加载 `tool-schema-validation` Skill（路径见 Skill 内说明） |
| Skills 目录 | `.claude/skills/` |
| 同级插件仓库 | `../` |
| 适配产物输出 | `.ohos-adaptation/` |

---

## 数据架构

系统采用**两层数据架构**，`plugins.json` 只负责仓库列表管理，各插件的详细适配信息存放在各 repo 的 `.ohos-adaptation/` 目录中。

**JSON Schema 与校验**：权威定义与完整生成流程（含 PostWrite Hook 说明）均在 **`tool-schema-validation` Skill** 中。系统已配置 PostWrite Hook：通过 `write`/`edit` 写入阶段产物 JSON 时会自动触发校验，详见该 Skill。

---

## 信息检索体系

项目通过 **Skills** 和 **Subagent** 提供信息检索能力，不依赖本地静态资料库：

| 检索需求 | 使用方式 | 说明 |
|----------|----------|------|
| HarmonyOS SDK API 签名 / 类型定义 | `sub-doc-search` → `harmonyos-sdk-api-lookup` Skill | 搜索本地 SDK .d.ts 声明文件，零成本 |
| HarmonyOS 开发指南 / 权限 / Kit 教程 | `sub-doc-search` → `harmonyos-docs-lookup` Skill | 搜索官方文档 |
| Flutter OHOS 开发文档 / ETS API | `flutter-docs-lookup` Skill | 内置 423 篇 .md 文档，覆盖插件开发、Channel、PlatformView 等 |
| 已适配 Flutter 三方库 | `flutter-adapted-library` Skill | 468 个库的适配状态数据库（151 已适配、220 开发中） |
| 其他信息（社区方案、三方库等） | `sub-doc-search` → Web Search / Firecrawl | 网络搜索兜底 |

---

## 平台检测标准（所有 Agent/Skill 共用）

在 Dart 层判断鸿蒙平台时，**必须**使用以下统一方案，不得自行发明替代写法：

**首选方案：直接使用 `Platform.isOhos`**

Flutter OHOS 分支已原生支持 `Platform.isOhos`。在所有 `Platform.isXxx` 判断链中直接添加 OHOS 分支：

```dart
import 'dart:io' show Platform;

if (Platform.isAndroid) {
  // Android
} else if (Platform.isIOS) {
  // iOS
} else if (Platform.isOhos) {
  // OHOS（通常与 Android 逻辑相近）
}
```

**FFI 插件的 .so 加载**：OHOS 与 Android 共享 `DynamicLibrary.open('libxxx.so')` 方式，在平台判断中将 OHOS 与 Android 合并：

```dart
if (Platform.isAndroid || Platform.isLinux || Platform.isOhos) {
  return DynamicLibrary.open('libxxx.so');
}
```

> **禁止**：不允许使用排除法（`!isAndroid && !isIOS && ...`）或 `Platform.operatingSystem == 'ohos'` 字符串比较。这些方式脆弱且在新增平台时会失效。

---

## 核心规则

### 1. 禁止猜测 API 签名

不确定的鸿蒙 API **必须**通过以下途径验证：
- 使用 `ohos-coding-guide` Skill
- 涉及到生态规则使用 `huawei-ecosystem-compliance` Skill
- 通过 `sub-doc-search` 搜索开发文档（路由至 `harmonyos-docs-lookup`）
- 通过 `sub-doc-search` 搜索 SDK API（路由至 `harmonyos-sdk-api-lookup`）
- 查阅 `flutter-docs-lookup` Skill 中的 Flutter ETS API 文档（`flutter-docs/11_flutter_api_docs/`）

不过度查询，也**绝不猜测** API 参数、返回值或权限要求。

### 2. 已适配库优先查询

对所有 Flutter 依赖和原生依赖，**必须先查** `flutter-adapted-library` Skill 的数据库，判断是否已有鸿蒙适配版本。已适配的库直接通过 git 依赖引用，无需重复适配。

**作用范围**：analysis 和 planning 阶段**仅查询适配状态**（不组装 git 依赖）；coding-library 和 testing 阶段**执行依赖覆写**（组装 git 依赖并写入 pubspec.yaml）。

**核心约束**：
- Skill 数据库为唯一事实源，Agent 不得凭记忆决定依赖版本
- `status: "adapted"` 的依赖**必须**覆写为 `git:` 形式，覆盖 `pubspec.yaml` 和 `example/pubspec.yaml` 的 `dependencies:` / `dev_dependencies:` / `dependency_overrides:` 全部三个段落
- 只要声明不是 `git:` 形式就视为"未覆写"（包括 `^x.y.z`、`any`、`dependency_overrides:` 段中的版本号）
- git 依赖的组装流程（`url`/`path`/`ref` 来源与版本匹配算法）见 `flutter-adapted-library` SKILL.md
- 依赖覆写的完整执行步骤见 `primary-03-coding-library.md` 步骤 3.4

### 3. 自主工作原则

- 不要询问用户，不要等待确认
- 不要输出方案让用户选择
- 根据分析结果自主决策并执行
- 遇到不确定的情况，通过 Skill 和 subagent 检索文档自行解决

### 4. 阶段产物规范

每个阶段完成后，将产物写入 `.ohos-adaptation/` 目录。每个阶段输出 **JSON 结构化数据**，对应的 **Markdown 报告由 JSON数据自动生成**：

| 阶段 | JSON 产物 | 自动生成的报告 | Agent 手动编写 |
|------|----------|--------------|--------------|
| analysis | `01-analysis.json` | `01-analysis-report.md`（自动） | `01-analysis-prd.md` |
| planning | `02-planning.json` | `02-planning-report.md`（自动） | — |
| coding-library | `03-coding-library.json` | `03-coding-library-report.md`（自动） | — |
| testing | `04-testing.json` | `04-testing-report.md`（自动） | — |
| summary | `05-summary.json` | `05-summary-report.md`（自动） | `INTEGRATION_GUIDE.md` |

**JSON 产物的完整生成流程**（读取 Schema → 写入 JSON → 自动校验与报告生成 → 确认完整）：加载 **`tool-schema-validation` Skill** 并按其中「JSON 产物标准生成流程」执行。

### 5. Channel 名称一致性

鸿蒙端实现的 Channel 名称**必须**与 Dart 层定义完全一致，方法名和参数格式同样如此。

### 6. 代码质量

- ETS 代码遵循 ArkTS 编码规范
- 所有异步操作需正确处理错误
- 资源（Channel、Listener 等）在 `onDetachedFromEngine` 中必须释放

### 7. 工具使用约束

- 产物（JSON / Markdown / 代码）**必须**通过 `write` 或 `edit` 写入磁盘，**绝不**将内容输出到对话中代替写入
- 大型 JSON 直接用 `write` 一次性写入，不要用 `bash` + heredoc 拼接
- 读取文件失败时记录错误并继续，不要陷入重试循环
