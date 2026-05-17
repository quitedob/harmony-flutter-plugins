# 阶段 2：`02-planning.json` + `02-planning-report.md`

planning agent 在完成 API 调研、三方库查找和实现策略制定后输出两个文件：
- `02-planning.json`：结构化数据，供后续 Agent 消费
- `02-planning-report.md`：人类可读的 Markdown 报告，供管理面板展示和人工审阅

## JSON 产物结构

```json
{
  "target_module_types": ["turbo-module", "fabric-component"],
  "migration_plan": null,

  "ohos_api_mapping": [
    {
      "feature": "功能描述",
      "turbo_module_method": "TurboModule 方法名 | null",
      "android_api": "对应的 Android API（来自 01-analysis.json）",
      "ios_api": "对应的 iOS API（来自 01-analysis.json）",
      "ohos_module": "@ohos.xxx",
      "ohos_api": "API 函数签名",
      "ohos_import": "import { xxx } from '@ohos.xxx'",
      "file_path": "<由 harmonyos-sdk-api-lookup 搜索返回的 .d.ts 路径>",
      "since_version": 12,
      "syscap": "SystemCapability.Xxx.Xxx",
      "required_permission": "ohos.permission.XXX | null",
      "is_async": true,
      "confidence": "high | medium | low",
      "source": "mapping_db | sdk_search | doc_search | finished_lookup",
      "notes": "补充说明（可选）"
    }
  ],

  "native_dependency_mapping": [
    {
      "original_platform": "android | ios | cpp",
      "original_lib": "原三方库名（如 com.github.xxx:library）",
      "original_usage": "在模块中的用途（如 PDF 文档渲染）",
      "ohos_solution_type": "ohpm_package | system_api | custom_implementation | not_available",
      "ohos_package": "ohpm 包名 | null",
      "ohos_module": "@ohos.xxx | null（当 solution_type 为 system_api 时填写）",
      "install_command": "ohpm install xxx | null",
      "confidence": "high | medium | low",
      "notes": "说明（替代方案的能力覆盖度、已知限制等）"
    }
  ],

  "permission_mapping": [
    {
      "source_platform": "android | ios",
      "source_permission": "原权限标识（如 android.permission.CAMERA）",
      "ohos_permission": "ohos.permission.CAMERA",
      "permission_level": "normal | restricted",
      "needs_user_grant": true,
      "notes": "说明（可选）"
    }
  ],

  "reference_plugins": [
    {
      "name": "参考模块名",
      "url": "仓库地址",
      "relevance": "direct | similar | partial",
      "key_patterns": ["关键实现模式（如 TurboModule 注册方式、事件发送模式等）"]
    }
  ],

  "implementation_strategy": {
    "approach": "整体实现策略概述（1-3 段文字，描述核心实现思路）",
    "architecture_decisions": [
      {
        "topic": "决策主题（如蓝牙扫描方案选择）",
        "decision": "选定方案",
        "rationale": "选择原因"
      }
    ],
    "planned_files": [
      {
        "path": "harmony/library/src/main/ets/XxxModule.ets",
        "purpose": "用途说明"
      }
    ],
    "module_json5_config": {
      "permissions": ["需要在 module.json5 声明的权限列表"],
      "syscap_requirements": ["SystemCapability.Xxx.Xxx"]
    }
  },

  "risk_items": [
    {
      "description": "风险描述",
      "severity": "high | medium | low",
      "mitigation": "缓解方案 | null"
    }
  ],

  "example_deps_solutions": [
    {
      "dep": "依赖名",
      "solution": "替代方案描述",
      "solution_type": "adapted | alternative | remove | mock"
    }
  ],

  "implementation_notes": "给 coding-library agent 的整体提示和注意事项（可选）"
}
```

## 字段说明

### `target_module_types`

适配目标类型列表（一对多，仅新架构类型）。后续 coding-library 阶段按数组顺序依次加载对应类型指导文件。

**允许值**：
- `turbo-module`：ArkTS TurboModule
- `fabric-component`：Fabric ArkTS 自定义组件
- `cpp-turbo-module`：C++ TurboModule
- `fabric-cpp-component`：Fabric C++ 自定义组件
- `js-only`：纯 JS/TS 模块

### `migration_plan`

新架构迁移规划（仅当 `arch_type = old-arch` 且 `migration_needed = true` 时非空）。

### `ohos_api_mapping`

每个功能/TurboModule 方法到鸿蒙 API 的映射。核心字段：

| 字段 | 必填 | 说明 |
|------|------|------|
| `feature` | 是 | 功能的中文描述 |
| `turbo_module_method` | 否 | 对应的 TurboModule 方法名，纯功能映射时为 null |
| `android_api` / `ios_api` | 否 | 来自 01-analysis.json 的原平台 API，便于追溯 |
| `ohos_module` | 是 | 鸿蒙模块名（如 `@ohos.bluetooth.ble`） |
| `ohos_api` | 是 | 具体的 API 签名 |
| `ohos_import` | 是 | ETS 中的 import 语句 |
| `file_path` | 否 | SDK .d.ts 文件全路径（相对于 workspace 根），供 coding agent 直接 read_file 查看详细定义；`source: sdk_search` 时由 sub-api-lookup 提供 |
| `since_version` | 是 | API 版本号（数字，如 9、12） |
| `syscap` | 是 | 系统能力标识 |
| `required_permission` | 否 | 所需权限，无需权限时为 null |
| `is_async` | 是 | 是否为异步 API |
| `confidence` | 是 | 映射置信度 |
| `source` | 是 | 数据来源 |
| `notes` | 否 | 补充说明 |

**`confidence` 判定规则**：
- `high`：映射数据库命中，或 SDK 中签名完整且 @since 明确
- `medium`：SDK 中找到近似 API 但部分信息缺失，或需要组合多个 API 实现
- `low`：仅通过文档描述推断，未在 SDK 中找到精确定义

**`source` 取值**：
- `mapping_db`：来自预置 API 映射数据（如有）
- `sdk_search`：通过 api-lookup subagent 在 SDK .d.ts 中找到
- `doc_search`：通过 doc-search subagent 在 RN OHOS 文档中找到
- `finished_lookup`：参考已适配模块的实现

### `native_dependency_mapping`

原生三方库到鸿蒙替代方案的映射。

**`ohos_solution_type` 取值**：
- `ohpm_package`：在 ohpm 仓库找到对应鸿蒙原生包
- `system_api`：可用 HarmonyOS 系统 API 替代（此时 `ohos_module` 应填写）
- `custom_implementation`：无现成替代，需基于鸿蒙 API 自行实现
- `not_available`：无可行方案（应在 `risk_items` 中标记高风险）

### `permission_mapping`

Android/iOS 权限到鸿蒙权限的映射。

**`permission_level` 取值**：
- `normal`：普通权限，安装时自动授予
- `restricted`：受限权限，需要用户运行时授权

### `reference_plugins`

可参考的已适配模块。

**`relevance` 取值**：
- `direct`：同一模块的鸿蒙版（如 01-analysis.json 中 `ohos_readiness.reference_url` 指向的仓库）
- `similar`：功能相近的模块（如同为蓝牙类）
- `partial`：部分功能可参考（如同为 TurboModule 类型模块）

### `implementation_strategy`

实现策略，指导后续 coding-library 阶段。

- `approach`：1-3 段文字的整体实现思路
- `architecture_decisions`：关键技术选型（如渲染方案、通信方式选择）
- `planned_files`：harmony/library/ 目录下需创建的文件清单
- `module_json5_config.permissions`：需在 module.json5 中声明的鸿蒙权限
- `module_json5_config.syscap_requirements`：需要的系统能力列表

### `risk_items`

风险项列表。所有 `confidence: "low"` 的映射和 `ohos_solution_type: "not_available"` 的依赖都应在此标记。

**`severity` 取值**：
- `high`：可能导致功能无法实现
- `medium`：功能可实现但有限制或降级
- `low`：有轻微影响但可忽略

### `example_deps_solutions`

Example 应用中缺少 OHOS 支持的依赖的替代方案。

**`solution_type` 取值**：
- `adapted`：该依赖已有鸿蒙适配版
- `alternative`：使用其他库替代
- `remove`：移除该功能（非核心功能）
- `mock`：使用 mock 实现

## 报告模板（`02-planning-report.md`）

```markdown
# {module_name} 鸿蒙适配方案

## 方案概述

{implementation_strategy.approach 的内容}

## API 映射

| 功能 | TurboModule 方法 | 鸿蒙模块 | 鸿蒙 API | 置信度 | 来源 |
|------|-----------------|----------|----------|--------|------|
| ...  | ...             | ...      | ...      | ...    | ...  |

## 三方库替代方案

| 原库 | 平台 | 鸿蒙方案 | 方案类型 | 说明 |
|------|------|----------|----------|------|
| ...  | ...  | ...      | ...      | ...  |

## React Native 依赖状态

| 依赖 | OHOS 状态 | 是否阻塞 | 处理方案 |
|------|-----------|----------|----------|
| ...  | ...       | ...      | ...      |

## 权限映射

| 原平台权限 | 鸿蒙权限 | 权限等级 | 需运行时授权 |
|-----------|----------|----------|-------------|
| ...       | ...      | ...      | ...         |

## 架构决策

{architecture_decisions 的内容}

## 文件规划

| 文件路径 | 用途 |
|----------|------|
| ...      | ...  |

## 风险项

| 风险 | 严重度 | 缓解方案 |
|------|--------|----------|
| ...  | ...    | ...      |

## Example 依赖处理

| 依赖 | 处理方式 | 方案说明 |
|------|----------|----------|
| ...  | ...      | ...      |

## 推荐 Skill

后续 coding-library 阶段将依次执行以下类型指导：
{target_module_types 数组内容，如 turbo-module、fabric-component}。
```
