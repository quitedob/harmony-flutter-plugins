# AITools 原生工作流完整分析

> 基于 `scrollbar_ultima` 案例的端到端流水线分析 + Skills 体系全景
> 分析日期：2026-07-24

---

## 一、Skills 体系总览

`docs/flutter_library_workflow/skills/` 包含 **112 个 SKILL.md 文件**，分布在 **6 个顶层目录**下，代表 3 种平台 × 2 种模式的工作流变体：

| 目录 | 平台 | 模式 |
|------|------|------|
| `android-sdk` | Android SDK → ArkTS | 完整流程 |
| `android-sdk-fast` | Android SDK → ArkTS | 快速变体（Feature Point 模型） |
| `flutter` | Flutter Plugin → OHOS | 完整流程 |
| `flutter-fast` | Flutter Plugin → OHOS | 快速变体 |
| `rn` | React Native → OHOS | 完整流程 |
| `rn-fast` | React Native → OHOS | 快速变体 |

### Skills 七大分类

#### A 类 — 测试分析 & 用例生成

| Skill | 功能 |
|-------|------|
| `01-test-analysis` / `01-sdk-test-analysis` | IBO 模型生成 22 章测试分析报告 + JSON 测试点 |
| `02-test-case-gen` / `04-testcase-gen` | 测试点 → 黑盒 UI 可操作测试用例 |
| `03-case-review` / `analysis-review` | 4 维度评审（覆盖率35% + 可执行性30% + 可判定性20% + 规范性15%，≥80 通过） |
| `test-analysis` / `test-case-gen` / `test-design` | Flutter 专项测试制品 |

#### B 类 — 核心迁移/映射

| Skill | 功能 |
|-------|------|
| `android-sdk-to-arkts` | Java→ArkTS 全语言差异指南（类型系统/异步/重载/this绑定） |
| `ui-component-mapping` / `android-to-harmonyos-ui-mapping` | Android UI→ArkUI 高保真映射（D1-D21 维度，5 步工作流） |
| `arkts-full-implementation` | 第三阶段"应转尽转"完整 HAR 实现 |
| `arkts-native-bridge` | JNI/NDK → NAPI 桥接（含 BiSheng 编译器适配） |
| `native-library-substitution` | 2,678 条 Android/iOS→ohpm 本地库替代映射数据库 |
| `ohos-native-cross-compile` | C/C++ 交叉编译到 arm64-v8a 的 8 步流水线 |
| `flutter-adapted-library` | 468 个 Flutter 库适配状态检索（151 已适配/220 开发中） |
| `rn-adapted-library` | RN 库适配状态检索，`@react-native-oh-tpl` scope 检测 |

#### C 类 — 编码规范

| Skill | 功能 |
|-------|------|
| `arkts-rules` | ArkTS 语言约束 Top 10 编译错误速查 + 高性能实践 |
| `ohos-coding-guide` | Want/蓝牙/文件/音视频/位置权限/动画等场景编码指南 |
| `ohos-har-integration-demo` | HAR 集成到 hardemo 项目（assembleHap 闭包验证） |
| `ohos-sdk-code-review` | P0-P3 优先级代码审查，CodeArts Check 强制扫描 |

#### D 类 — 文档 & API 查询

| Skill | 功能 |
|-------|------|
| `harmonyos-docs-lookup` | ~2,860 个 MD 文件三步快速检索法 |
| `harmonyos-sdk-api-lookup` | 4,000+ API 参考文件签名/权限/系统能力查询 |
| `ohpm-package-api-lookup` | 已安装 ohpm 包 API 签名检索 |
| `flutter-docs-lookup` / `rn-docs-lookup` | 平台专项文档检索 |

#### E 类 — 质量 & 合规

| Skill | 功能 |
|-------|------|
| `dfx-quality` | UX/稳定性/性能/功耗四维质量门禁（Python 检测脚本，exit code 2=发现问题） |
| `huawei-ecosystem-compliance` | IAP/Account/Push/AVSession/ArkWeb 等生态强制规则 |
| `hmos-library-quality-assessment` | 白盒评估（架构+代码质量，CodeLinter 前置），结论：推荐/谨慎/不推荐 |
| `migration-verifier` | SDK 迁移结果审计（一致性/覆盖率/视觉参数/编译验证） |

#### F 类 — 示例生成 & 工具

| Skill | 功能 |
|-------|------|
| `flutter-plugin-example-generator2` | 从 `04-test-cases.json` 生成 3 级页面 Demo App（骨架→逻辑→验证→输出） |
| `rn-plugin-example-generator` | RN 模块 Demo 生成，禁止占位按钮，Bundle + assembleHap |
| `tool-summary` | A-D 评分 + 双层报告模板 + 集成指南模板 |
| `requirement-parse` | PRD 需求解析 → JSON + Markdown |

#### G 类 — 专用工具

| Skill | 功能 |
|-------|------|
| `flutter-sdk-switch` | Flutter OHOS SDK 版本自动匹配（最低兼容版本） |
| `native-lib-index` | FFI 预编译库索引 + 交叉编译知识库（自动增长） |
| `ohos-hypium-uitest` | RN HarmonyOS Hypium UI 自动化测试（@kit.TestKit 全 API） |
| `failure-lessons` | 结构化失败经验库（按 import/type/permission/cmake/api/config 分类） |
| `hmos-api-change-assitant` | DevEco Studio ApiScanUtil 扫描 SDK 版本间 API 变更 |
| `hardemo-template` | HAR Demo 两模块项目模板创建/修复 |
| `flu-plugins-hypium-testcase-gen` | Flutter 插件 Hypium 测试用例生成 |

---

## 二、AITools 原生工作流（以 scrollbar_ultima 为例）

### 概述

`scrollbar_ultima` 是一个 **100% 纯 Dart Flutter Widget 插件**（v1.0.4，无原生代码、无 Platform Channel、无 FFI）。它是展示 AITools 完整 5 阶段流水线的标杆案例。

### 流程架构

```
输入: CLAUDE.md (PRD) + Flutter Plugin 源码
  │
  ├── Stage 01: 分析
  │   输入: 全部源码
  │   动作: 读源码 → 架构分析 → 依赖分析 → 平台代码检测 → 功能枚举 → IBO 分析
  │   产物: 01-analysis.json, 01-analysis-prd.md, 01-test-analysis-report.md, 01-test-points.json
  │
  ├── Stage 02: 编码/库适配
  │   输入: Stage 01 分析结果
  │   动作: pubspec.yaml 修改 → Plugin 注册类创建 → Example OHOS 脚手架生成 → HAP 编译
  │   产物: 02-coding-library-report.md, 代码变更, HAP 包
  │
  ├── Stage 03: 验证/评审
  │   输入: Stage 02 产物 + Stage 01 测试点
  │   动作: API 完整性检查 → 平台通道分析 → 示例可运行性 → 权限审计 → 测试用例质量评审
  │   产物: 03-validation-report.md, 03-case-review-report.md
  │
  ├── Stage 04: 测试用例
  │   输入: Stage 01 测试点
  │   动作: 测试点 → 全规格手动测试用例（id/title/level/preconditions/steps/expected/postconditions）
  │   产物: 04-test-cases.json（34 条用例，7 个模块，符合 droidrun/test_suite.schema.json）
  │
  └── Stage 05: Demo 生成
      输入: 04-test-cases.json + 插件源码
      动作: 骨架生成 → 逻辑实现 → 编译验证 → 结果输出
      产物: example_auto/ (46 个 Dart 文件) + 05-demo-gen-report.md + 05-demo-gen.json
```

### 各阶段详解

#### Stage 01: 分析 — 核心方法论 IBO 模型

**IBO（Input-Behavior-Output）**：严格黑盒视角，从用户/功能角度分析每个功能点，不使用 API 级别语言。

**分析维度**：
- 插件基本信息（名称、版本、类型、架构）
- 质量评分（A 级）、复杂度评估（低）
- 平台特异性检测（`defaultTargetPlatform` 仅检查 Android/iOS/Fuchsia）
- 依赖分析（仅 Flutter SDK，无第三方包）
- 7 个核心功能枚举（F-01 至 F-07）
- 7 个标准 Flutter Widget 使用清单
- HarmonyOS 兼容性判定（fully_compatible: true）

**产物示例**：
- `01-analysis.json`：机器可读结构化分析
- `01-analysis-prd.md`：557 行，含架构图（Mermaid）、风险评估矩阵、工作量估算（2.5h）
- `01-test-analysis-report.md`：475 行，IBO × 7 模块、4 设备 × 4 API 兼容矩阵、自动化率 53%
- `01-test-points.json`：34 测试点（L0:16 / L1:16 / L2:2）

#### Stage 02: 编码/库适配 — 零代码适配

由于是纯 Dart 插件，适配工作仅配置级：
1. `pubspec.yaml` 增加 `ohos` 平台声明 + `dartPluginClass`
2. 创建 `ScrollbarUltimaPlugin` 最小注册类（空 `registerWith()`）
3. 3 个 example 生成 `ohos/` 脚手架
4. 配置 hvigor daemon = false
5. 编译：default_example 成功（89MB HAP，~118s），另两个受 Windows 260 字符路径限制失败

**关键发现**：所有 Flutter API（Widget, GestureDetector, AnimationController, CustomPainter, ScrollController）在 HarmonyOS 上完全兼容。

#### Stage 03: 验证/评审 — 5.0/5.0 满分

- **API 完整性**：12 个公开 API 全为纯 Dart，无需平台通道
- **平台通道分析**：零 MethodChannel/EventChannel/FFI/UnsupportedError
- **权限审计**：仅需 INTERNET 权限，无需原生库
- **测试用例质量评审**：
  - 覆盖率：95/100
  - 可执行性：92/100
  - 可判定性：88/100
  - 规范性：85/100
  - **加权得分：91/100（≥80 通过）**

#### Stage 04: 测试用例 — 34 条全规格

结构：
```json
{
  "suite": { "id": "...", "name": "...", "app_package": "...", "app_card": "..." },
  "modules": [
    {
      "moduleCode": "F-01",
      "moduleName": "基本滚动条显示",
      "priority": "P0",
      "test_cases": [
        {
          "id": "F-01-01",
          "title": "...",
          "level": "L0",
          "preconditions": "...",
          "test_steps": [{"action": "...", "checkpoint": "..."}],
          "expected_result": "...",
          "postconditions": "..."
        }
      ]
    }
  ]
}
```

7 个模块：F-01 基本显示 / F-02 轨道交互 / F-03 自定义样式 / F-04 位置布局 / F-05 动画行为 / F-06 Material State / F-07 边界条件

#### Stage 05: Demo 生成 — 46 文件 3 级页面

**架构**：Module Index Page → Module Detail Page (×7) → Test Case Detail Page (×32)

每页含 `ScrollbarUltima` widget + 测试信息 Card + 操作区域 + `ResultPanel`

**自动化脚本链**：
- `batch_implement.py` → 批量生成测试用例页面
- `implement_testcases.py` → 生成 initState/dispose 模板
- `fill_testcases.py` → 填充 TODO 占位符
- `build_hap.ps1` → PowerShell HAP 构建

### 最终产物全清单

| # | 文件 | 类型 | 阶段 |
|---|------|------|------|
| 1 | `01-analysis.json` | JSON | 分析 |
| 2 | `01-analysis-prd.md` (557行) | MD | 分析 |
| 3 | `01-test-analysis-report.md` (475行) | MD | 分析 |
| 4 | `01-test-points.json` (34点) | JSON | 分析 |
| 5 | `02-coding-library-report.md` | MD | 编码 |
| 6 | `03-validation-report.md` (412行) | MD | 验证 |
| 7 | `03-case-review-report.md` | MD | 评审 |
| 8 | `04-test-cases.json` (34用例) | JSON | 测试设计 |
| 9 | `05-demo-gen-report.md` | MD | Demo |
| 10 | `05-demo-gen.json` | JSON | Demo |
| 11 | `example_auto/` (46文件) | Flutter App | Demo |
| 12 | `example/default_example/.../*.hap` (89MB) | HAP | 编译产物 |
| 13 | `logs/` (30+日志) | Logs | 全阶段 |

### 关键架构洞察

由于 `scrollbar_ultima` 是 **100% 纯 Dart 插件**，适配工作几乎为零 → 这是 Flutter→HarmonyOS 迁移的最佳情况模板。唯一微小问题：`defaultTargetPlatform` 仅比较 Android/iOS/Fuchsia，导致 OHOS 继承桌面 `MouseRegion` 行为（判定为无害，P2 优化项）。

---

## 三、Skills ↔ 工作流对应关系

| 工作流阶段 | 使用的 Skills |
|-----------|--------------|
| 需求解析 | `requirement-parse` |
| SDK 切换 | `flutter-sdk-switch` |
| 分析 | `harmonyos-docs-lookup`, `flutter-docs-lookup`, `harmonyos-sdk-api-lookup` |
| 库适配 | `flutter-adapted-library`, `native-library-substitution`, `native-lib-index` |
| 编码 | `arkts-rules`, `ohos-coding-guide`, `arkts-native-bridge`, `ohos-native-cross-compile` |
| 测试分析 | `01-test-analysis` |
| 测试用例 | `02-test-case-gen` / `04-testcase-gen` |
| 用例评审 | `03-case-review` |
| 质量门禁 | `dfx-quality`, `huawei-ecosystem-compliance` |
| Demo 生成 | `flutter-plugin-example-generator2` / `rn-plugin-example-generator` |
| 代码审查 | `ohos-sdk-code-review` / `ohos-code-review` |
| 集成验证 | `ohos-har-integration-demo` |
| 总结 | `tool-summary` |
| 持续改进 | `failure-lessons` |
