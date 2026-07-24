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
| `partial`（部分通过） | 评分上限 B |
| `fail`（全部失败/崩溃） | 评分上限 C |
| `skipped`（无设备） | 无影响，按基础条件评分 |

### 评分数据来源

| 指标 | 来源 | 缺失时处理 |
|------|------|-----------|
| 方法覆盖率 | `03-coding-library.json` → `implemented_methods.length / (implemented_methods.length + not_implemented.length)` | 03 缺失 → 覆盖率 0%，评分 D |
| 库编译状态 | `03-coding-library.json` → `build_status` | 03 缺失 → 视为 fail，评分 D |
| Example 编译状态 | `04-testing.json` → `example_build_status` | 04-testing 缺失 → `example_status` 设为 `unknown` |
| 静态深度分析 | `04-device-verify.json` → `runtime_checks`（10 项）；兼容旧版合并在 `04-testing.json` | 缺失 → `runtime_check_summary` 全部设为 0，评分上限 C |
| 库正确性检测 | `runtime_checks` 中 `behavior_equivalence` / `return_structure_match` / `api_call_validity` | 不存在这 3 项 → 评分上限 B |
| 质量问题 | 从 `runtime_checks` 中提取 status 为 warning/fail 的项 | device-verify 缺失 → 无法评估，评分上限 C |
| 设备验证 | `04-device-verify.json` → `device_test_status` / `device_test_results`；兼容旧版 `04-testing.json` | 缺失或 skipped → 无影响 |

### status 判定

- `success`：评分 A 或 B
- `partial`：评分 C
- `failed`：评分 D

## 分层报告模板

报告文件 `05-summary-report.md` 分两层：

### 第一层：概览

面向评审人员快速了解适配结果。

```markdown
# {module_name} 鸿蒙适配总结报告

## 概览

| 指标 | 值 |
|------|-----|
| 模块名称 | {module_name} |
| 模块版本 | {module_version} |
| 模块类型 | {module_types} |
| 目标类型 | {target_module_types} |
| 适配评分 | **{quality_score}** |
| 适配状态 | {status} |
| 方法覆盖率 | {coverage_rate}（{implemented}/{total_methods}） |
| 库编译 | {build_status} |
| Example 编译 | {example_status} |
| 静态分析 | {pass} pass / {warning} warning / {fail} fail |
| 设备验证 | {device_test_status}（{pass_count}/{total_methods} 方法通过） |

### 适配方案

{adaptation_approach — 来自 02-planning.implementation_strategy.approach}

### 风险项

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

| TurboModule/组件 | 方法名 | 状态 | 鸿蒙 API / 原因 |
|-----------------|--------|------|-----------------|
| {module_name} | {method} | ✅ 已实现 | {ohos_api} |
| {module_name} | {method} | ❌ 未实现 | {reason} |

### 文件变更清单

#### 新增文件
- {path}

#### 修改文件
- {path}

### 编译修复记录

| 阶段 | 次数 | 错误 | 修复 |
|------|------|------|------|
| coding-library | {attempt} | {error} | {fix} |
| testing | {attempt} | {error} | {fix} |

### 静态深度分析结果

| 检测项 | 类别 | 状态 | 详情 |
|--------|------|------|------|
| {check_type} | 基础/库正确性 | {status} | {details} |

### 设备运行态验证

| 方法 | 结果 | 详情 |
|------|------|------|
| {method} | {result} | {detail} |

### 库代码修复记录

| 文件 | 问题 | 修复 |
|------|------|------|
| {file} | {issue} | {fix} |
```

## 集成指南模板

集成指南文件 `INTEGRATION_GUIDE.md` 面向下游开发者。

```markdown
# {module_name} 鸿蒙平台集成指南

> 本指南由适配流水线自动生成。

## 1. 安装模块

\```bash
npm install {module_name}@harmony
# 或 git 依赖
\```

在 `package.json` 中确认 harmony 配置：

\```json
{
  "harmony": {
    "alias": "{alias}",
    "codegenConfig": [...]
  }
}
\```

## 2. Autolinking 配置

如果模块支持 Autolinking，安装后自动链接。否则需手动注册 Package：

\```typescript
// entry/src/main/ets/PackageProvider.ets
import { RNPackage } from '@rnoh/react-native-openharmony';
import { ModulePackage } from '{module_harmony_package}';

export function createRNPackages(): RNPackage[] {
  return [new ModulePackage()];
}
\```

## 3. 权限声明

在 `entry/src/main/module.json5` 中添加：

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

## 4. 已支持的 API

| TurboModule/组件 | 方法名 | 说明 |
|-----------------|--------|------|
| {name} | {method} | {brief_description} |

## 5. 未支持的功能

| 方法名 | 原因 |
|--------|------|
| {method} | {reason} |

## 6. 已知限制

- {limitation}

## 7. 使用示例

\```tsx
import ModuleName from '{module_name}';

const result = await ModuleName.someMethod();
\```
```

### 集成指南数据来源

| 指南章节 | 数据来源 |
|----------|----------|
| 安装模块 | `01-analysis.json` → `module_name`、仓库 URL |
| Autolinking | `01-analysis.json` → `autolinking_config` |
| 权限声明 | `02-planning.json` → `permission_mapping` |
| 已支持的 API | `03-coding-library.json` → `implemented_methods` |
| 未支持的功能 | `03-coding-library.json` → `not_implemented` |
| 已知限制 | `02-planning.json` → `risk_items` + 各阶段质量问题 |
| 使用示例 | Example 代码片段 |
