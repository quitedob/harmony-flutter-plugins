# 阶段 1 附加产物：`01-analysis-prd.md`

analysis 阶段在输出 `01-analysis.json` + `01-analysis-report.md` 之外，还需输出一份 **PRD（需求规格文档）**。

PRD 的目标是：基于 Android/iOS 现有实现，以**需求视角**完整描述插件的功能规格，作为后续鸿蒙适配的**需求基准**。planning 阶段将以此 PRD 为依据，逐条查找鸿蒙对应 API 并制定实现方案；后续的测试阶段也将以 PRD 为基准，逐条验证功能是否实现。

> **完整性是 PRD 的第一要求**：PRD 是后续适配和测试的关键输入件，任何功能或 API 的遗漏都会导致适配不完整或测试覆盖缺失。必须做到**零遗漏**——插件对外暴露的每一个公开 API、每一个 Channel 方法、每一个事件流、每一个 PlatformView 都必须在 PRD 中有对应条目。

> PRD 与 `01-analysis-report.md` 的区别：report 侧重「现状分析」（类型、依赖、复杂度），PRD 侧重「功能需求规格」（每个 API 做什么、怎么用、边界条件）。

## 输出文件

- 文件名：`.ohos-adaptation/01-analysis-prd.md`
- 格式：Markdown
- 语言：**中文**

## PRD 文档结构

```markdown
# {plugin_name} 鸿蒙适配需求规格（PRD）

## 1. 插件概述

### 1.1 基本信息

| 项目 | 内容 |
|------|------|
| 插件名称 | {plugin_name} |
| 版本 | {plugin_version} |
| 仓库地址 | {repository_url} |
| 许可证 | {license} |
| 已支持平台 | {supported_platforms} |

### 1.2 插件简介

{2-3 段文字描述插件的用途、解决的问题、典型使用场景。不是 pubspec 的一句话描述，而是更详细的介绍。}

### 1.3 目标用户与使用场景

{列出插件的目标开发者群体和典型业务场景。}

### 1.4 适配复杂度评估

> 数据来源于 `01-analysis.json` 的 `complexity_assessment`

| 指标 | 数值 | 说明 |
|------|------|------|
| 复杂度评分 | {complexity_score} | 映射：0-2=low / 3-7=medium / 8-14=high / ≥15=very_high |
| 复杂度等级 | {level} | low / medium / high / very_high |
| 适配建议 | {adaptation_recommendation} | proceed / proceed_with_caution / blocked / not_needed |

**风险项**：

| 风险描述 | 严重程度 | 缓解措施 |
|---------|---------|---------|
| {risk_items[].description} | {risk_items[].severity} | {risk_items[].mitigation 或 "无"} |

> 如无风险项，此表替换为「无风险项」。

### 1.5 鸿蒙生态规则提示

> 数据来源于 `01-analysis.json` 的 `ecosystem_compliance`

| 规则类别 | 要求级别 | 涉及能力/Kit | 触发依据 | 约束说明 |
|---------|---------|-------------|----------|----------|
| {规则项} | mandatory / optional / suggested | {华为能力名称} | {来自插件功能、权限、Web 内核、后台音频等证据} | {具体要求、禁止项或可选接入说明} |

**受限权限替代**（如有）：

| HarmonyOS 受限权限 | 对应 Android 权限/能力 | 替代方案 | 说明 |
|--------------------|------------------------|----------|------|
| {permission} | {android_permission} | {Picker / 安全控件 / 授权弹窗 / 画中画 / 系统应用跳转} | {替代原因和边界} |

> 如 `has_ecosystem_rules = false`，此节替换为「本插件不涉及鸿蒙生态特殊规则」。

---

## 2. 功能需求总览

### 2.1 功能模块划分

| 模块编号 | 功能模块 | 描述 | API 数 | 验收标准（AC） | 优先级 |
|---------|---------|---------|--------|--------------|--------|
| F-01 | {模块名} | {一句话描述} | {N} | 1. {具体可衡量的验收条件}<br>2. {...} | P0/P1/P2 |
| F-02 | {...} | {...} | {N} | {...} | {...} |

> 优先级定义：
> - **P0**：核心功能，缺失则插件不可用
> - **P1**：重要功能，影响主要使用场景
> - **P2**：辅助功能，可降级或延后实现

特别规则：
- 如果某能力是**公开 API / 配置项**的一部分，且会直接影响主交互流程、用户可见行为或方案选型，**不得**仅因它看起来像“UI 配置”或“辅助参数”就机械判为 `P2`
- 控件若公开暴露了 UI 文案、自定义按钮行为、功能切换、页面内取消/确认语义、自定义预览层等能力，通常至少应定为 `P1`
- 如果用户选择该插件的核心原因之一就是“可自定义”“可配置”“可控制交互行为”，则对应能力应提升为 `P0` 或 `P1`，不能降为可随意缺失的 `P2`
- 功能优先级不能机械按“主流程/辅助参数”二分；若某公开配置项或用户可见行为会影响插件的主要使用目的、主交互流程或主方案选择（如自定义文本、按钮行为、取消语义等），通常至少定为 `P1`，必要时提升为 `P0`
- 使用 sub-doc-search 搜索HarmonyOS文档，确认在 HarmonyOS 确实不支持某功能，且此功能不会实质改变主要使用场景和主方案选择**时，才可判为 `P2`

### 2.2 功能依赖关系

{描述功能模块之间的依赖关系，如「F-02 依赖 F-01 的初始化能力」，建议使用树状结构展示且节点正确换行，如有特殊依赖需单独说明。如果模块之间无依赖可省略此节。}

---

## 3. 公开 API 规格

本节**逐一、无遗漏地**列出插件暴露给 Flutter 开发者的所有公开 API（Dart 层），包括：
- 公开类的所有公开方法和属性（含构造函数、静态方法、getter/setter）
- 公开枚举及其所有枚举值
- 顶层函数和顶层常量
- Channel 通信方法（通过 Dart 封装暴露的每一个方法）
- PlatformView Widget 及其所有配置参数（如有）
- Widget / Controller 参数中的带返回值回调；凡返回值不是 `void` 的回调，必须作为公开 API 列出
- 事件流 / Stream 及其数据类型（如有）
- 回调函数类型定义（typedef）

> **完整性要求**：本章列出的 API 必须覆盖 `adaptation_contracts` 全部契约（硬门槛 100%），`dart_public_api.core_count` 应尽可能完整列出（仅作诊断记录，不设阈值）。详见第 12 章。

#### Federated 插件平台实现包公开 API 扫描与写入要求

对于 federated 插件，生成 PRD 前必须补充扫描平台实现包中的公开 API。PRD 的公开 API 规格不能只来自 `{plugin}_platform_interface`，还必须覆盖以下内容：

- `{plugin}_android` 中对开发者公开的 class、controller 方法、extension、typedef、enum 和参数类型
- `{plugin}_ios` / `{plugin}_darwin` 中对开发者公开的 class、controller 方法、extension、typedef、enum 和参数类型
- 不在 `platform_interface` 中、但开发者可直接 import 或调用的平台专属 API
- 如果 Android/iOS 存在同名或同语义平台专属 API，需要记录平台差异
- 如果平台实现包不在当前仓库或本地工作区，必须自行继续查找源码：优先读取 `pubspec.lock`、`.dart_tool/package_config.json`、本机 pub cache、依赖的 git/url/path、pub.dev 或仓库 `repository` 信息；定位到源码后继续扫描公开 API
- 如果平台实现包确实不存在或外部查找后仍未发现额外公开 API，需在 PRD 自检中明确“不适用/未发现”，并记录查找来源，不要静默跳过

典型例子：
- Android 平台实现中的 `AndroidWebViewController.setOnShowFileSelector` 是公开 controller 方法，不是 extension
- iOS 平台实现中的 `WebKitWebViewController` 平台专属扩展

这些 API 即使不在 `platform_interface` 中，也属于开发者可使用的平台实现包公开能力，必须写入 PRD 的公开 API 规格、功能模块、参数类型、平台差异或使用示例等现有结构中。写入时并入 PRD 第 3 章现有 Class / Controller / 功能组，不单独新增“Android 专属 API”“iOS 专属 API”等章节；每个条目需标注来源包、适用平台、源码位置和源码获取来源（本地路径 / pub cache / git / pub.dev / repository）。

### 3.1 {ClassName / 功能组名}

#### `methodName(param1, param2, ...)`

| 属性 | 说明 |
|------|------|
| 所属模块 | F-xx |
| 方法签名 | `Future<ReturnType> methodName(Type1 param1, {Type2? param2})` |
| 功能描述 | {详细描述该方法做什么，用 2-3 句话} |
| 参数说明 | 见下表 |
| 返回值 | {返回值类型及含义} |
| 异常/错误 | {可能抛出的异常及触发条件} |
| 所属 Channel | {MethodChannel/EventChannel 名称及方法名} |
| 源码位置 | {file:line。Channel 方法请查顶层 `channels[].methods[]`；纯 Dart API 由 Agent 扫描时现场记录（schema 不强制存储此类细节）} |

**参数详情：**

| 参数名 | 类型 | 必填 | 说明 | 默认值 |
|--------|------|------|------|--------|
| param1 | Type1 | 是 | {说明} | — |
| param2 | Type2? | 否 | {说明} | null |

**平台实现行为：**

| 平台 | 实现方式 | 调用的系统 API |
|------|---------|---------------|
| Android | {简要描述实现逻辑} | {android.xxx.Xxx#method()} |
| iOS | {简要描述实现逻辑} | {Framework.Class.method()} |

**使用示例：**

```dart
// 典型用法（从 example 或 README 提取）
final result = await plugin.methodName(param1);
```

{对每个公开 API 重复上述结构}

---

## 4. 事件与回调规格

{如果插件有 EventChannel 或回调机制，在此详细描述}

> **带返回值回调硬规则**：PRD 必须把 Widget / Controller 里的带返回值回调当成公开 API。凡是返回值不是 `void` 的回调，都必须写入 PRD，并标注回调名、返回类型、`null` / 默认返回语义，以及该返回值会影响什么 native 行为。
>
> 例如：`shouldInterceptRequest` 返回 `Future<WebResourceResponse?>`；`null` 表示放行资源请求；非 `null` 表示用返回的 `WebResourceResponse` 替换资源响应；属于必须实现的资源拦截能力。

### 4.1 {EventStreamName}

| 属性 | 说明 |
|------|------|
| 事件类型 | Stream<{EventType}> |
| Channel 名称 | {event_channel_name} |
| 触发时机 | {什么情况下会产生事件} |
| 事件数据结构 | 见下表 |
| 取消/释放 | {如何停止监听、资源释放方式} |

**事件数据字段：**

| 字段名 | 类型 | 说明 |
|--------|------|------|
| field1 | Type | {说明} |

---

## 5. PlatformView 规格

{如果插件使用 PlatformView，在此详细描述}

### 5.1 {ViewWidgetName}

| 属性 | 说明 |
|------|------|
| viewType 标识 | {view_type_id} |
| 创建参数 | {creationParams 结构} |
| 支持的方法调用 | {通过 controller 暴露的方法} |
| 生命周期 | {创建、更新、销毁的行为描述} |

---

## 6. 权限需求

| 权限 | Android 声明 | iOS 声明 | 用途 | 关联功能模块 |
|------|-------------|----------|------|-------------|
| {权限名} | android.permission.XXX | NSXxxUsageDescription | {为什么需要} | F-xx |

---

## 7. 数据流与交互流程

{用文字或流程描述核心功能的数据流动路径}

### 7.1 {核心场景名}

```
Flutter App → Dart API → MethodChannel → Native Plugin → System API → 结果回传
```

{步骤说明：}
1. Flutter 侧调用 `xxx.method()`
2. Dart 层通过 MethodChannel `channel_name` 发送 `methodName` 调用
3. Native 端接收后调用 `SystemAPI.xxx()`
4. 结果通过 Channel 返回 Dart 层

---

## 8. 错误处理规格

| 错误码/异常 | 触发条件 | 处理方式 | 关联 API |
|------------|---------|---------|---------|
| PlatformException(code) | {条件} | {预期行为} | methodName |

---

## 9. 初始化与生命周期

### 9.1 初始化流程

{描述插件的初始化方式：是否需要显式初始化、初始化参数、是否需要在特定生命周期节点调用}

### 9.2 资源管理

{描述需要手动释放的资源、dispose 行为、内存管理注意事项}

### 9.3 状态边界

{描述需要未初始化调用、重复初始化的处理}

---

## 10. 非功能性需求

### 10.1 线程/并发要求

{描述 API 的线程安全要求、是否需要在主线程调用等}

### 10.2 性能约束

{如有性能相关需求，如实时数据频率、延迟要求等}

| 指标 | 目标值 | 验证方式 |
|------|--------|---------|
| 首帧渲染时间 | ≤ {N}ms | 集成测试计时 |
| 内存占用 | ≤ {N}MB | DevTools 监控 |

### 10.3 数据持久化

{如果插件涉及数据存储，描述存储方式和路径}

### 10.4 兼容性矩阵

| 平台 | 最低版本 | 特殊要求 | 已知缺陷 |
|------|---------|---------|---------|
| Android | API {N} | {依赖库/配置} | {具体缺陷描述} |
| iOS | {N}.0 | {配置项} | {具体缺陷描述} |

### 10.5 安全与隐私

{安全相关说明，如数据不上传第三方服务器、敏感信息处理方式等}

---

## 11. 适配要点提示和平台差异对照

### 11.1 交叉验证问题（必须处理）

> 数据来源于 `api_inventory.cross_validation`（由步骤 3.5.3 三端扫描生成）。仅列出非空类别，所有类别都为空时整节替换为"三端扫描未发现交叉验证问题"。**以下 4 张表的所有行均为示例数据（演示格式），Agent 生成 PRD 时必须替换为真实的 `cross_validation.*` 条目内容，未扫描到对应类别的异常时整段省略。**

**Dart-only 方法**：
> 这些方法在 Dart 层有调用，但 Android/iOS 原生端未实现。需在鸿蒙端补齐实现，或在 PRD 中标注为「未支持」。

| 方法名 | Dart 调用位置 | 期望原生平台 | 处理建议 |
|--------|--------------|-------------|---------|
| {method_name} | lib/xxx.dart:42 | android, ios | 鸿蒙需实现该方法 |

---

**Native-only 方法**：
> 这些方法仅在原生端实现，Dart 层未暴露。需决策是否在鸿蒙端实现并暴露给 Dart。

| 方法名 | 原生平台 | 原生位置 | 决策 | 决策理由 |
|--------|---------|---------|------|---------|
| {method_name} | android | src/.../Plugin.kt:88 | platform_specific | Android 特有功能（如 Service），鸿蒙无需实现 |
| {method_name} | ios | Classes/Plugin.swift:56 | should_expose | 通用功能，建议在鸿蒙端实现并暴露 |
| {method_name} | android | src/.../Util.kt:120 | unknown | 功能归属不明确，需 planning 阶段分析 |

---

**名称不匹配**：
> Dart 与原生端方法名不一致。PRD 中使用 Dart 名称，鸿蒙实现时需对齐 Channel 方法名。

| Dart 方法名 | Android 方法名 | iOS 方法名 | 严重程度 | 修复建议 |
|------------|---------------|-----------|---------|---------|
| {dart_name} | {android_name} | {ios_name} | medium | 鸿蒙端 Channel 方法名使用 Dart 名称 |

---

**README 功能缺口**：
> README 文档中描述但未在代码中找到实现的功能。

| 功能描述 | README 位置 | 状态 | 备注 |
|---------|------------|------|------|
| {feature_desc} | 第 3 节「后台播放」 | possibly_planned | 未来规划，当前版本未实现 |
| {feature_desc} | 第 5 节「断点续传」 | not_found_in_code | example 有调用，代码可能遗漏 |
| {feature_desc} | 第 7 节「权限说明」 | documentation_error | 文档描述与实际 API 不符 |

### 11.2 一般适配要点

{基于上述需求规格，简要列出鸿蒙适配时需要特别关注的点}

- {要点 1：如某 API 在 Android/iOS 上行为不一致，需确认鸿蒙侧对齐哪一端}
- {要点 2：如某功能依赖的系统能力在鸿蒙上可能不存在或有差异}
- {要点 3：如生态规则要求接入华为能力（地图/支付/账号等），需明确对接方案}
- ...

### 11.3 平台差异对照矩阵

> 仅记录 Android / iOS 两端已有的行为差异，"鸿蒙怎么做"属于 planning 阶段职责，不在本节描述。

| 功能 | Android 行为 | iOS 行为 |
|------|-------------|---------|
| {功能名} | {具体行为} | {具体行为} |

---

## 12. 完整性自检清单

> 本章节为强制章节，不可省略。数据来源于 `api_inventory`，由 Agent 在生成 PRD 后回填到 `api_inventory.prd_coverage` 再渲染到此处。
>
> **12.1 鸿蒙适配契约覆盖率**是唯一的硬门槛（必须 100%），契约漏一条 = 鸿蒙端漏实现。**12.2 / 12.3 / 12.4 仅作诊断信息记录**，用于 Agent 自检与人工 review 参考，不作达标判定（大型插件的数据类采用合并行呈现会导致 12.2 数字偏低，属正常现象）。

### 12.1 鸿蒙适配契约覆盖率（硬门槛：100%）

| 契约类型 | 扫描总数 | PRD 列出数 | 覆盖率 | 状态 |
|---------|---------|-----------|-------|------|
| MethodChannel 方法 | `{method_channel_method_count}` | {N} | {percent}% | ✅/❌ |
| BasicMessageChannel 方法 | `{basic_message_channel_method_count}` | {N} | {percent}% | ✅/❌ |
| EventChannel | `{event_channel_count}` | {N} | {percent}% | ✅/❌ |
| PlatformView | `{platform_view_count}` | {N} | {percent}% | ✅/❌ |
| FFI 主函数（仅 FFI 插件） | `{ffi_main_function_count}` | {N} | {percent}% | ✅/❌ |
| **契约合计** | `{total_contracts}` | {N} | **`{contract_coverage_percent}%`** | ✅/❌ |

> **硬门槛**：契约覆盖率必须 = 100%。非 100% 时在"状态"列打 ❌ 并在表下说明漏项。
>
> **口径**：Channel 方法 = 三端（Dart/Android/iOS）并集去重；EventChannel = 实例数；FFI 辅助函数不计入契约总数，仅作参考。

### 12.2 Dart 公开 API 覆盖率（诊断信息）

| 类别 | 扫描总数 | PRD 列出 | 覆盖率 |
|------|---------|---------|-------|
| 公开类 | `{class_count}` | {N} | {percent}% |
| 公开方法（构造+实例+静态+显式 get/set） | `{method_count}` | {N} | {percent}% |
| 公开枚举 | `{enum_count}` | {N} | {percent}% |
| 顶级函数 | `{top_level_function_count}` | {N} | {percent}% |
| typedef | `{typedef_count}` | {N} | {percent}% |
| 顶层常量 | `{top_level_constant_count}` | {N} | {percent}% |
| **合计（核心）** | `{core_count}`（= `{total_count}` - `{excluded_count}`） | {N} | **`{dart_api_coverage_percent}%`** |

> **仅作诊断**：不设达标阈值。大型插件的数据类字段常采用合并行呈现（如"公开属性：a、b、c"算作 1 行），导致覆盖率偏低属正常；若无法精确计数可填 `null` + `dart_api_coverage_gap_notes` 说明理由。
>
> **排除规则**：`@internal` / `@visibleForTesting` / `@experimental` / 代码生成辅助（`*.g.dart`/`*.freezed.dart`）/ 数据 Schema 类 / `lib/src/` 未导出符号。**`@protected` 不排除**（属子类扩展契约，计入核心数）。

**Federated 平台实现包公开 API 扫描状态**：

| 平台实现包 | 源码获取来源 | 扫描状态 | 额外公开 API 数 | PRD 写入状态 | 说明 |
|-----------|--------------|----------|----------------|--------------|------|
| `{plugin}_android` | 本地路径 / pub cache / git / pub.dev / repository / 未定位 | 已扫描 / 不适用 / 未发现 | {N} | 已写入 / 不适用 / 未发现 | {说明} |
| `{plugin}_ios` / `{plugin}_darwin` | 本地路径 / pub cache / git / pub.dev / repository / 未定位 | 已扫描 / 不适用 / 未发现 | {N} | 已写入 / 不适用 / 未发现 | {说明} |

> 若平台实现包不在当前仓库或本地工作区，必须继续查找 pub cache、git、pub.dev 或 repository 源码；只有外部查找后仍无结果，才能在上表写“未定位/未发现”。平台实现包不存在或未发现额外公开 API，也必须在上表中明确写“不适用/未发现”，不要静默跳过。

### 12.3 API 与功能模块双向关联（诊断信息）

| 校验项 | 覆盖率 |
|--------|-------|
| API → 功能（已归属功能模块的 API 数 / PRD 列出 API 总数） | `{api_to_module_coverage_percent}%` |
| 功能 → API（至少含 1 个 API 的功能模块数 / 功能模块总数） | `{module_to_api_coverage_percent}%` |

> **仅作诊断**：不设 API→功能的阈值；**但功能→API 要求 100%**（孤儿模块需合并或补 API，否则功能模块划分不合理）。

### 12.4 交叉验证问题计数

> Agent 按 `cross_validation.*` 各数组长度填入实际数字；四项全为 0 时第 11.1 节整节替换为"三端扫描未发现交叉验证问题"。

| 问题类型 | 数量 | 处理 |
|---------|------|------|
| Dart-only 方法（原生端缺失） | {N} | 参见 11.1 节 |
| Native-only 方法（Dart 未暴露） | {N} | 参见 11.1 节 |
| 方法名不匹配 | {N} | 参见 11.1 节 |
| README 功能缺口 | {N} | 参见 11.1 节 |

```

## 生成流程

本阶段分**两轮**写入 `01-analysis.json`，见 `primary-01-analysis.md` 步骤 12 / 13。

### 第一轮：生成 PRD

基于 `01-analysis.json`（首轮，不含 `prd_coverage`）按「PRD 文档结构」逐章生成 `01-analysis-prd.md`。

**数据字段映射**：

| JSON 字段 | PRD 章节 |
|----------|---------|
| `complexity_assessment` | 第 1.4 节 |
| `ecosystem_compliance` | 第 1.5 节 |
| `api_inventory.adaptation_contracts.*`（契约计数） | 第 3–5 章（逐条列出契约，硬门槛 100%） |
| `api_inventory.dart_public_api.*`（公开 API 计数） | 第 3 章 Dart API 列举（尽可能完整，诊断信息） |
| `api_inventory.cross_validation`（自由对象） | 第 11.1 节（按推荐键名 dart_only_methods/native_only_methods/name_mismatches/readme_feature_gaps 渲染） |
| `api_inventory.prd_coverage` | 第 12 章（本轮尚未填写，第二轮回填） |

**第 11.1 节规则**：仅展示有问题的子节，四项全为 0 时整节替换为"三端扫描未发现交叉验证问题"。

### 第二轮：统计并回写 `prd_coverage`

生成 PRD 后，Agent 自行统计 PRD 实际列出的条目数，按以下键名填写 `api_inventory.prd_coverage`（自由对象，百分比数值保留 1 位小数）：

| 推荐键名 | 分母 | 分子 |
|---------|------|------|
| `contract_coverage_percent` | `adaptation_contracts.total_contracts` | PRD 第 3–5 章列出的契约数（硬门槛 = 100%） |
| `dart_api_coverage_percent` | `dart_public_api.core_count` | PRD 第 3 章列出的 Dart API 数（诊断信息，不设阈值；无法精确计数可填 null + gap_notes） |
| `api_to_module_coverage_percent` | PRD 列出 API 总数 | 已归属 F-xx 的 API 数 |
| `module_to_api_coverage_percent` | 功能模块总数 | 至少含 1 个 API 的功能模块数 |

**自检规则**：如发现契约覆盖率 < 100%，必须先补齐 PRD 对应契约、同步回补 `01-analysis.json`，**再重写 JSON**；不得以"说明原因"绕过硬门槛。

---

## 编写原则

1. **完整性唯一硬门槛 = 契约覆盖率 100%**：`adaptation_contracts` 中的每一条（MethodChannel 方法 / BasicMessageChannel 方法 / EventChannel / PlatformView / FFI 主函数）在 PRD 第 3–5 章都**必须有对应条目**，遗漏 = 鸿蒙端漏实现。Dart 公开 API（`dart_public_api.core_count`）应尽可能完整列出（数据类字段可用合并行呈现），仅作诊断记录，无达标阈值。`@internal` / `@visibleForTesting` / `@experimental` / 代码生成辅助类 / `lib/src/` 未导出符号可不列；**`@protected` 方法必须列出**（子类扩展契约）。带返回值回调必须进入 PRD，不能只作为普通配置项带过。
2. **Federated 平台实现包 API 并集**：federated 插件必须把 app-facing 包、platform_interface 包和 Android/iOS/Darwin 等平台实现包的公开 API 取并集。`@override` 方法可从 platform_interface 追溯；非 `@override` 的平台实现包 public controller method / extension / typedef / enum 不能因为不在 platform_interface 中而遗漏。平台实现包不在本地时，必须继续从 pub cache、git、pub.dev 或 repository 定位源码。写 PRD 时这些 API 并入第 3 章对应 Class / Controller / 功能组，不另开平台专属 API 章；若平台实现包不存在或未发现额外公开 API，必须在第 12 章自检中明确“不适用/未发现”。
3. **Channel 方法三端并集**：Dart `invokeMethod` / `invokeListMethod` / `invokeMapMethod` / `setMethodCallHandler` + Android `onMethodCall` + iOS `handle` 三端取并集，任何一端存在的方法都必须记录。每条方法 `discovery_sources[]` 至少一个来源。
4. **以 Dart 公开 API 为主线**：PRD 描述的是「插件对外提供了什么能力」，以 Dart 层 API 为骨架。
5. **附带平台实现细节**：每个 API 补充 Android/iOS 的实现方式和系统 API 调用，为鸿蒙适配提供对标参考。
6. **不涉及鸿蒙方案**：PRD 只描述「需要做什么」，不描述「鸿蒙怎么做」——后者是 planning 阶段的职责。**例外**：第 11.1 节交叉验证异常允许给出"鸿蒙需补齐"/"鸿蒙端应暴露"这类**处理方向**（不涉及具体 API 映射或实现细节）。
7. **核心 API 详写，简单 API 简写**：核心 API 详写（参数、返回值、行为、异常），简单的 getter/setter/常量可以用精简格式（一行表格），但**必须列出**。
8. **与 `01-analysis.json` 双向一致**：PRD 中列出的契约和 API 应与 JSON 产物一致。如果生成 PRD 过程中发现 JSON 遗漏了某些方法，必须回头补充 JSON（`channels[]` 和 `adaptation_contracts` 同时更新），再重新校验。
9. **章节可裁剪**：若插件不涉及 PlatformView、EventChannel 或特定章节，直接省略该章节，不要输出空章节。但**第 11.1 节「交叉验证问题」**和**第 12 章「完整性自检」**不可省略。
