# 阶段 4：`04-testing.json` + `04-testing-report.md`

testing agent 在 Example 工程编译验证、静态深度分析和设备运行态验证完成后输出两个文件：
- `04-testing.json`：结构化数据，供后续 Agent 消费
- `04-testing-report.md`：人类可读的 Markdown 报告，供管理面板展示和人工审阅

## JSON 产物结构

```json
{
  "example_build_status": "pass | fail | skip",
  "example_source": "existing_adapted | new_created | skip",

  "deps_without_ohos": ["缺少 OHOS 支持的依赖名列表"],

  "fallback_applied": [
    {
      "dep": "依赖名",
      "original_call": "原调用方式",
      "fallback": "回退方案描述"
    }
  ],

  "files_modified": ["修改的文件列表（含 example 和库文件）"],
  "build_attempts": 3,

  "method_coverage": {
    "total_methods": 8,
    "covered_methods": 7,
    "uncovered_methods": ["未被覆盖的方法名列表"],
    "coverage_rate": "87%"
  },

  "compilation_fixes": [
    {
      "attempt": 1,
      "error": "编译错误描述",
      "fix": "修复方法描述"
    }
  ],

  "runtime_checks": [
    {
      "check_type": "turbo_module_consistency | param_type_match | ... | behavior_equivalence | return_structure_match | api_call_validity",
      "status": "pass | warning | fail",
      "details": "检测详情（warning/fail 时说明问题）",
      "method_details": [
        {
          "method": "方法名",
          "result": "equivalent | partial | divergent | stub | match | mismatch | valid | invalid",
          "issue": "问题描述"
        }
      ]
    }
  ],

  "library_fixes": [
    {
      "file": "修复的文件路径（相对于模块根目录）",
      "issue": "发现的问题描述",
      "fix": "修复方法描述"
    }
  ],

  "build_log_summary": "编译日志摘要",

  "test_scenarios": [
    {
      "name": "测试场景名称",
      "description": "测试场景描述",
      "methods_tested": ["该场景覆盖的方法列表"]
    }
  ],

  "device_test_status": "pass | partial | fail | skipped",
  "device_test_skip_reason": "no_device | build_failed",
  "device_test_results": [
    {
      "method": "方法名",
      "result": "pass | assert_fail | error | not_executed",
      "detail": "返回值摘要或错误详情"
    }
  ],
  "device_crash_detected": false,
  "device_crash_log": "崩溃日志摘要",
  "device_test_attempts": 1
}
```

**写入约束**：

- `device_test_attempts >= 1` 时 **必须**有 `device_test_status` + `device_test_results`
- `device_test_status == "skipped"` 时 **必须**有 `device_test_skip_reason`（字符串）
- 未使用的可选字段 **省略**；**禁止**写 `null`

## 字段说明

### 顶层字段

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `example_build_status` | enum | 是 | 编译结果：`pass`（成功）/ `fail`（失败）/ `skip`（跳过） |
| `example_source` | enum | 是 | Example 来源：`existing_adapted`（适配已有）/ `new_created`（从零新建）/ `skip`（跳过） |
| `deps_without_ohos` | string[] | 否 | 缺少 OHOS 支持的依赖名列表 |
| `fallback_applied` | FallbackEntry[] | 否 | 已应用的回退方案列表 |
| `files_modified` | string[] | 是 | 修改的文件列表（含 example 和库文件） |
| `build_attempts` | integer | 是 | 编译尝试次数（≥0） |
| `method_coverage` | MethodCoverage | 是 | 方法覆盖统计 |
| `compilation_fixes` | CompilationFix[] | 否 | 编译修复记录 |
| `runtime_checks` | RuntimeCheck[] | 否 | 静态深度分析结果（10 项） |
| `library_fixes` | LibraryFix[] | 否 | 库代码修复记录 |
| `build_log_summary` | string | 否 | 编译日志摘要 |
| `test_scenarios` | TestScenario[] | 否 | 测试场景列表 |
| `device_test_status` | enum | 否 | 设备运行态验证总状态 |
| `device_test_skip_reason` | string | 否 | 跳过设备验证的原因（仅 skipped 时） |
| `device_test_results` | DeviceTestResult[] | 否 | 各方法的设备验证结果 |
| `device_crash_detected` | boolean | 否 | 是否检测到启动崩溃 |
| `device_crash_log` | string | 否 | 崩溃日志摘要 |
| `device_test_attempts` | integer | 否 | 设备验证尝试次数 |

### RuntimeCheck — 静态深度分析检测项

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `check_type` | enum | 是 | 检测类型（见下表） |
| `status` | enum | 是 | 检测结果：`pass` / `warning` / `fail` |
| `details` | string | 否 | 检测详情，`warning`/`fail` 时说明问题 |
| `method_details` | MethodCheckDetail[] | 否 | 逐方法检测详情（`behavior_equivalence`、`return_structure_match`、`api_call_validity` 使用） |

**check_type 取值**：

| 值 | 类别 | 说明 |
|----|------|------|
| `turbo_module_consistency` | 基础检测 | TurboModule 名称和方法名 JS Spec / ETS 完全匹配 |
| `param_type_match` | 基础检测 | JS/TS Spec 参数类型与 ETS 层提取类型匹配 |
| `permission_completeness` | 基础检测 | 功能所需权限是否在 module.json5 中声明 |
| `async_error_handling` | 基础检测 | 所有平台调用是否有 try-catch / Promise.catch |
| `missing_plugin_risk` | 基础检测 | 缺少 OHOS 实现的依赖调用是否有防护 |
| `null_safety` | 基础检测 | 平台返回值可能为 null 时 JS 端是否做了处理 |
| `event_emitter_lifecycle` | 基础检测 | DeviceEventEmitter 监听的创建与取消是否正确配对 |
| `behavior_equivalence` | 库正确性检测 | Android/iOS → OHOS 逐方法行为对等性比对 |
| `return_structure_match` | 库正确性检测 | 跨语言返回值结构完整性验证 |
| `api_call_validity` | 库正确性检测 | OHOS API 调用有效性验证（非空实现、签名正确） |

### MethodCheckDetail — 逐方法检测详情

**result 取值**（按 check_type 分组）：

| check_type | 可用 result 值 | 说明 |
|------------|---------------|------|
| `behavior_equivalence` | `equivalent` | 逻辑等价 |
| | `partial` | 核心路径等价但遗漏分支 |
| | `divergent` | 逻辑显著不同 |
| | `stub` | 空实现（只返回 null/error） |
| `return_structure_match` | `match` | 返回值结构匹配 |
| | `mismatch` | 返回值结构不匹配 |
| `api_call_validity` | `valid` | API 调用正确 |
| | `invalid` | API 调用有误或为虚假实现 |

### DeviceTestResult — 设备运行态验证结果

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `method` | string | 是 | 方法名 |
| `result` | enum | 是 | `pass`（断言通过）/ `assert_fail`（断言失败）/ `error`（抛异常）/ `not_executed`（未执行到） |
| `detail` | string | 否 | 返回值摘要或错误详情 |

## 报告模板（`04-testing-report.md`）

```markdown
# {module_name} Example 验证报告

## 概要

| 项目 | 内容 |
|------|------|
| Example 来源 | {example_source} |
| 编译状态 | {example_build_status} |
| 编译尝试次数 | {build_attempts} |
| 方法覆盖率 | {coverage_rate}（{covered_methods}/{total_methods}） |
| 静态分析 | {pass} pass / {warning} warning / {fail} fail |
| 库修复数 | {library_fixes.length} |
| 设备验证 | {device_test_status}（{device_pass}/{device_total} 方法通过） |

## 方法覆盖

| TurboModule/组件 | 方法名 | 是否覆盖 |
|-----------------|--------|----------|
| ...             | ...    | ✅ / ❌   |

## 依赖处理

### 缺少 OHOS 支持的依赖
- {dep_1}
- {dep_2}

### 回退方案

| 依赖 | 原调用方式 | 回退方案 |
|------|-----------|----------|
| ...  | ...       | ...      |

## 编译修复记录

| 次数 | 错误 | 修复 |
|------|------|------|
| ...  | ...  | ...  |

## 静态深度分析结果

### 基础检测

| 检测项 | 状态 | 详情 |
|--------|------|------|
| TurboModule 一致性 | ... | ... |
| 参数类型匹配 | ... | ... |
| 权限完整性 | ... | ... |
| 异步错误处理 | ... | ... |
| MissingPlugin 风险 | ... | ... |
| 空安全 | ... | ... |
| DeviceEventEmitter 生命周期 | ... | ... |

### 库代码正确性检测

| 检测项 | 状态 | 详情 |
|--------|------|------|
| 行为对等性 | ... | ... |
| 返回值结构匹配 | ... | ... |
| API 调用有效性 | ... | ... |

## 库代码修复记录

| 文件 | 问题 | 修复 |
|------|------|------|
| ...  | ...  | ...  |

## 设备运行态验证

| 项目 | 内容 |
|------|------|
| 验证状态 | {device_test_status} |
| 尝试次数 | {device_test_attempts} |
| 启动崩溃 | {device_crash_detected} |

### 方法验证结果

| 方法 | 结果 | 详情 |
|------|------|------|
| ...  | pass / assert_fail / error / not_executed | ... |

## 测试场景

| 场景名称 | 描述 | 覆盖方法 |
|----------|------|----------|
| ...      | ...  | ...      |

## 编译日志摘要

{build_log_summary}
```
