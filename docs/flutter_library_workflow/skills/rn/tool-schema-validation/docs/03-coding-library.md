# 阶段 3：`03-coding-library.json` + `03-coding-library-report.md`

coding-library agent 在编译通过（或确认无法通过）后输出两个文件：
- `03-coding-library.json`：结构化数据，供后续 Agent 消费
- `03-coding-library-report.md`：人类可读的 Markdown 报告，供管理面板展示和人工审阅

## JSON 产物结构

```json
{
  "target_module_types": ["turbo-module", "fabric-component"],
  "migration_executed": false,
  "migration_changes": null,

  "build_status": "pass | fail",
  "build_attempts": 1,

  "engineering_setup": {
    "create_command": "手动创建 harmony/library 目录结构",
    "harmony_directory": "harmony/library/",
    "config_changes": [
      {
        "file": "harmony/library/oh-package.json5",
        "change": "添加了 @rnoh/react-native-openharmony 依赖"
      }
    ]
  },

  "implemented_methods": [
    {
      "channel": "TurboModule/组件名",
      "method": "method_name",
      "status": "implemented",
      "ohos_api": "使用的鸿蒙 API（可选）"
    }
  ],

  "not_implemented": [
    {
      "channel": "TurboModule/组件名",
      "method": "method_name",
      "reason": "原因说明"
    }
  ],

  "js_ts_changes": [
    {
      "file": "package.json",
      "change": "添加 harmony 字段配置 autolinking"
    }
  ],

  "files_created": ["新建文件路径列表"],
  "files_modified": ["修改文件路径列表"],

  "compilation_fixes": [
    {
      "attempt": 1,
      "error": "错误描述",
      "fix": "修复方法"
    }
  ],

  "cross_boundary_check": [
    { "check_item": "名称", "status": "pass", "detail": "说明" }
  ],
  "behavior_baseline_check": [
    { "check_item": "维度", "status": "pass", "detail": "说明" }
  ],
  "napi_bridge_check": [
    { "check_item": "类型", "status": "pass", "detail": "说明" }
  ],

  "build_log_summary": "编译过程关键输出摘要（成功时简述，失败时包含最终错误信息）"
}
```

## 字段说明

### `target_module_types`

实际执行的适配目标类型列表（一对多，与 02-planning.json 一致）。

### `migration_executed`

是否执行了新架构迁移（布尔值）。

### `migration_changes`

迁移变更记录（仅当 `migration_executed = true` 时非空）：
- `spec_files_created`：创建的 Spec 文件列表
- `js_files_modified`：修改的 JS/TS 文件列表
- `package_json_modified`：是否修改了 package.json

### `build_status`

- `pass`：`hvigorw assembleHar` 返回 exit code 0
- `fail`：编译最终未通过（已尝试所有修复策略）

**纯 JS 包**（`type-js-only`）：`npm install` 成功即为 `pass`。

### `build_attempts`

编译尝试次数（首次编译 = 1，每次修复后重新编译 +1）。

### `engineering_setup`

工程搭建的详细记录：

| 字段 | 说明 |
|------|------|
| `create_command` | 执行的工程创建命令（如无需创建则为 null） |
| `harmony_directory` | harmony 工程目录的相对路径 |
| `config_changes` | 配置文件变更列表（oh-package.json5、package.json、module.json5 等） |

### `implemented_methods`

已实现的 TurboModule 方法 / Fabric Component 功能列表：

| 字段 | 必填 | 说明 |
|------|------|------|
| `channel` | 是 | TurboModule 名称或 Fabric Component 名称 |
| `method` | 是 | 方法名 / Props 名 / Event 名 |
| `status` | 是 | 固定为 `"implemented"` |
| `ohos_api` | 否 | 该方法使用的鸿蒙 API（便于追溯） |

### `not_implemented`

未实现的方法及原因（如 API 不可用、@since 版本过高等）。

### `js_ts_changes`

JS/TS 层的修改记录（如 package.json 添加 harmony 字段、Platform.OS 兼容处理等）。纯原生模块通常仅有 package.json 修改。

### `compilation_fixes`

编译修复记录，每次修复一条：

| 字段 | 说明 |
|------|------|
| `attempt` | 第几次编译尝试时出现此错误 |
| `error` | 编译错误描述（错误信息摘要） |
| `fix` | 修复方法描述 |

### `cross_boundary_check`

跨边界合约自查结果数组，每项格式 `{ check_item, status, detail }`。对应 rnoh-cross-boundary-contract.md 附件 A 的 7 项。

### `behavior_baseline_check`

行为基线对照结果数组，每项格式同上。对应 behavior-baseline.md 的 5 个维度。

### `napi_bridge_check`

NAPI 桥类型安全核查结果数组，每项格式同上。逐类型记录是否安全。

### `build_log_summary`

编译过程的关键输出摘要：
- 编译成功时：简述（如 "首次编译即通过" 或 "经过 3 次修复后编译通过"）
- 编译失败时：包含最终无法修复的错误信息

## 报告模板（`03-coding-library-report.md`）

```markdown
# {module_name} 鸿蒙适配编码报告

## 概要

| 项目 | 内容 |
|------|------|
| 模块名称 | {module_name} |
| 目标类型 | {target_module_types（数组）} |
| 迁移执行 | {migration_executed} |
| 编译状态 | {build_status} |
| 编译尝试次数 | {build_attempts} |
| 已实现方法数 | {implemented_methods.length} |
| 未实现方法数 | {not_implemented.length} |

## 工程搭建

- **创建命令**：`{create_command}`
- **harmony 目录**：`{harmony_directory}`

### 配置变更

| 文件 | 变更内容 |
|------|----------|
| ...  | ...      |

## 已实现方法

| TurboModule/组件 | 方法名 | 使用的鸿蒙 API |
|-----------------|--------|----------------|
| ...             | ...    | ...            |

## 未实现方法

| TurboModule/组件 | 方法名 | 原因 |
|-----------------|--------|------|
| ...             | ...    | ...  |

## JS/TS 层变更

| 文件 | 变更说明 |
|------|----------|
| ...  | ...      |

## 编译修复记录

| 次数 | 错误 | 修复 |
|------|------|------|
| ...  | ...  | ...  |

## 质检项说明

| 检查项 | 状态 | 说明 |
|--------|------|------|
| {check_item} | {status} | {detail} |

## 文件清单

### 新增文件
- {file_1}
- {file_2}

### 修改文件
- {file_1}
- {file_2}

## 编译日志摘要

{build_log_summary}
```
