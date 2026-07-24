---
name: tool-summary
description: 适配总结规则。定义质量评分标准、分层报告模板和集成指南模板，供 summary agent 生成最终产物。
---

# 适配总结规则

## 评分规则

根据跨阶段聚合数据，按以下条件判定质量等级。评分综合考虑：方法覆盖率、编译状态、静态深度分析（含库正确性检测）、设备运行态验证。

### 基础评分条件

| 等级 | 基础条件 |
|------|---------|
| **A** | 方法覆盖率 100% + `build_status` = pass + `example_status` = pass + `runtime_checks` 全部 pass（含 behavior_equivalence 等库正确性检测） + 无 error 级 `quality_issues` |
| **B** | 方法覆盖率 ≥ 80% + `build_status` = pass + `runtime_checks` 无 fail + `quality_issues` ≤ 3 个（均为 warning） |
| **C** | 方法覆盖率 ≥ 50% + `build_status` = pass |
| **D** | 方法覆盖率 < 50% 或 `build_status` = fail |

### 设备验证对评分的影响

设备验证是**加分/降级项**，不影响基础评分的可计算性（无设备时流水线仍正常运行）：

| device_test_status | 评分影响 |
|-------------------|---------|
| `pass`（全部方法通过） | 满足基础条件时可达 A |
| `partial`（部分通过） | 评分上限 B（即使基础条件满足 A，有设备验证失败则降为 B） |
| `fail`（全部失败/崩溃） | 评分上限 C |
| `skipped`（无设备） | 无影响，按基础条件评分（但 behavior_equivalence 的 `divergent`/`stub` 仍影响 runtime_checks） |

### 评分数据来源

| 指标 | 来源 | 缺失时处理 |
|------|------|-----------|
| 方法覆盖率 | `03-coding-library.json` → `implemented_methods.length / (implemented_methods.length + not_implemented.length)` | 03 缺失 → 覆盖率 0%，评分 D |
| 库编译状态 | `03-coding-library.json` → `build_status` | 03 缺失 → 视为 fail，评分 D |
| Example 编译状态 | `04-testing.json` → `example_build_status` | 04 缺失 → `example_status` 设为 `unknown` |
| 静态深度分析 | `04-testing.json` → `runtime_checks`（10 项） | 04 缺失 → `runtime_check_summary` 全部设为 0，评分上限 C |
| 库正确性检测 | `runtime_checks` 中 `behavior_equivalence` / `return_structure_match` / `api_call_validity` | 不存在这 3 项 → 评分上限 B（无法确认库代码正确性） |
| 质量问题 | 从 `runtime_checks` 中提取 status 为 warning/fail 的项 | 04 缺失 → 无法评估，评分上限 C |
| 设备验证 | `04-testing.json` → `device_test_status` / `device_test_results` | 缺失或 skipped → 无影响 |

### 缺失数据的评分上限

当前序产物缺失时，评分**不得高于**以下上限：

| 缺失产物 | 评分上限 | 原因 |
|----------|---------|------|
| `03-coding-library.json` | D | 无编译和实现数据，无法评估 |
| `04-testing.json` | C | 无 Example 验证和静态分析，质量无法保证 |
| `runtime_checks` 数据为空 | B | 跳过检测的插件（如纯 Dart 包）最高 B |
| 库正确性检测（3 项）不存在 | B | 无法确认 ETS 实现是否正确 |

### status 判定

- `success`：评分 A 或 B
- `partial`：评分 C
- `failed`：评分 D

## 分层报告模板

报告文件 `05-summary-report.md` 分两层：

### 第一层：概览

面向评审人员快速了解适配结果。

```markdown
# {plugin_name} 鸿蒙适配总结报告

## 概览

| 指标 | 值 |
|------|-----|
| 插件名称 | {plugin_name} |
| 插件版本 | {plugin_version} |
| 插件类型 | {plugin_type} |
| 插件架构 | {plugin_architecture} |
| 类型 Skill | {plugin_type_skill} |
| 适配评分 | **{quality_score}** |
| 适配状态 | {status} |
| 方法覆盖率 | {coverage_rate}（{implemented}/{total_methods}） |
| Example 覆盖率 | {example_method_coverage_rate} |
| 库编译 | {build_status} |
| Example 编译 | {example_status} |
| 静态分析 | {pass} pass / {warning} warning / {fail} fail |
| 设备验证 | {device_test_status}（{pass_count}/{total_methods} 方法通过） |

### 适配方案

{adaptation_approach — 来自 02-planning.implementation_strategy.approach}

### 风险项

仅列出 severity = high 的风险项：

| 风险 | 缓解方案 |
|------|----------|
| {description} | {mitigation} |

### 已知限制

- {limitation_1}
- {limitation_2}
```

### 第二层：详情

面向开发者深入了解适配实现。

```markdown
---

## 详情

### API 映射与实现状态

从 03-coding-library 的 implemented_methods 和 not_implemented 合并生成：

| Channel | 方法名 | 状态 | 鸿蒙 API / 原因 |
|---------|--------|------|-----------------|
| {channel} | {method} | ✅ 已实现 | {ohos_api} |
| {channel} | {method} | ❌ 未实现 | {reason} |

### 文件变更清单

分两组列出（03+04 合并去重）：

#### 新增文件
- {path}

#### 修改文件
- {path}

### 编译修复记录

合并 03-coding-library 和 04-testing 的 compilation_fixes：

| 阶段 | 次数 | 错误 | 修复 |
|------|------|------|------|
| coding-library | {attempt} | {error} | {fix} |
| testing | {attempt} | {error} | {fix} |

### 静态深度分析结果

逐项列出 04-testing.runtime_checks（含基础检测 7 项 + 库正确性检测 3 项）：

| 检测项 | 类别 | 状态 | 详情 |
|--------|------|------|------|
| {check_type} | 基础/库正确性 | {status} | {details} |

### 设备运行态验证

来自 04-testing.device_test_* 字段：

| 项目 | 内容 |
|------|------|
| 验证状态 | {device_test_status} |
| 通过率 | {pass_count}/{total_methods} |
| 启动崩溃 | {crash_detected} |

方法验证结果（仅 device_test_status != skipped 时列出）：

| 方法 | 结果 | 详情 |
|------|------|------|
| {method} | {result} | {detail} |

### 库代码修复记录

来自 04-testing.library_fixes：

| 文件 | 问题 | 修复 |
|------|------|------|
| {file} | {issue} | {fix} |

### 适配统计

| 指标 | 值 |
|------|-----|
| API 映射数 | {api_mapping_count} |
| 置信度分布 | high:{h} / medium:{m} / low:{l} |
| 编译修复次数 | {compilation_fix_count} |
| 库修复次数 | {library_fix_count} |
| 文件变更总数 | {total_files_changed} |

### 改进建议

- {recommendation_1}
- {recommendation_2}
```

## 集成指南模板

集成指南文件 `INTEGRATION_GUIDE.md` 面向下游开发者，说明如何使用已适配的插件。

```markdown
# {plugin_name} 鸿蒙平台集成指南

> 本指南由适配流水线自动生成，描述如何在鸿蒙（OpenHarmony）项目中集成 {plugin_name} 插件。

## 1. 添加依赖

在项目的 `pubspec.yaml` 中添加：

\```yaml
dependencies:
  {plugin_name}:
    git:
      url: {repository_url}
      ref: ohos-adaptation
\```

然后执行 `flutter pub get`。

## 2. 鸿蒙原生依赖

如果插件依赖额外的 ohpm 包，在 `ohos/oh-package.json5` 中添加：

\```json5
{
  "dependencies": {
    // 以下依赖来自适配方案中的 native_dependency_mapping
    "{ohpm_package_name}": "{version}"
  }
}
\```

（如无额外 ohpm 依赖则标注"无需额外鸿蒙依赖"）

## 3. 权限声明

在 `ohos/src/main/module.json5` 的 `requestPermissions` 中添加：

\```json5
{
  "module": {
    "requestPermissions": [
      {
        "name": "{permission_identifier}",
        "reason": "$string:permission_reason",
        "usedScene": { "abilities": ["EntryAbility"], "when": "always" }
      }
    ]
  }
}
\```

需要运行时授权的权限（user_grant），需在代码中调用 `abilityAccessCtrl` 动态申请。

（如无权限要求则标注"无需额外权限声明"）

## 4. 已支持的 API

以下 Channel 方法已完成鸿蒙适配：

| Channel | 方法名 | 说明 |
|---------|--------|------|
| {channel} | {method} | {brief_description} |

## 5. 未支持的功能

以下方法暂未在鸿蒙平台实现：

| 方法名 | 原因 |
|--------|------|
| {method} | {reason} |

调用未支持的方法将返回 `MissingPluginException` 或 `notImplemented`。

## 6. 已知限制

- {limitation — 来自 risk_items 和 known_limitations}

## 7. 使用示例

\```dart
// 基于 Example 应用中的典型使用方式
{code_snippet}
\```
```

### 集成指南数据来源

| 指南章节 | 数据来源 |
|----------|----------|
| 添加依赖 | `01-analysis.json` → `plugin_name`、仓库 URL |
| 鸿蒙原生依赖 | `02-planning.json` → `native_dependency_mapping`（`ohos_solution_type = ohpm_package`） |
| 权限声明 | `02-planning.json` → `permission_mapping` |
| 已支持的 API | `03-coding-library.json` → `implemented_methods` |
| 未支持的功能 | `03-coding-library.json` → `not_implemented` |
| 已知限制 | `02-planning.json` → `risk_items` + 各阶段质量问题 |
| 使用示例 | `04-testing.json` → `test_scenarios` 或 `example/lib/main.dart` 代码片段 |
