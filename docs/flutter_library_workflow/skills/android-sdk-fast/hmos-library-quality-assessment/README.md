# hmos-library-quality-assessment

> 鸿蒙 ArkTS 三方库白盒质量评估 Skill —— 从**架构 / 代码质量**两大维度审查 HAR/HSP 库，产出按 🔴/🟡/🟢（+💡 非阻塞注解）分级的发现清单与定性结论。
>
> A white-box quality-assessment skill for HarmonyOS ArkTS third-party libraries.

## 它做什么

对一个 ArkTS 三方库（HAR/HSP）做白盒评估：

- **架构（两子维度）**：
  - **A1 通用架构** — SOLID、耦合内聚、反模式、分层依赖方向（语言无关）。
  - **A2 UI 架构**（仅 UI 库）— 组件复用层级与导出边界、对外契约（@Param/@Event/@BuilderParam）、状态选型不绑架宿主、扩展点、资源可覆盖性。
- **代码质量**：
  - **B1 通用·逻辑** — ArkTS 规范与正确性、可读性、复杂度、错误处理与健壮性、逻辑性能、加密安全。
  - **B2 UI 代码质量**（仅 UI 库）— 状态管理正确性、生命周期、渲染性能、稳定性与资源释放、跨设备适配、无障碍/深色。

> **分库型裁剪**：阶段0 判定库型后，UI 库才启用 A2 + B2；逻辑/NAPI 库省略这两组。CodeLinter 一律全量扫描，库型只影响人工评审侧重。

**只评估、只读** —— 绝不修改被评估库，不调用 `--fix`。报告**仅分级发现 + 定性结论**（✅推荐/⚠️谨慎使用/❌不推荐），不打分、不评等级。

## 工作流程（5 阶段）

| 阶段 | 内容 |
|------|------|
| 0 库画像 | 用 Read/Glob/Grep + `find`/`wc` 判库型(UI/逻辑/NAPI)、产物类型、导出/依赖/规模（无需 Python/脚本） |
| 1 静态扫描 | **CodeLinter（硬前置）**：启用全部规则集扫描，JSON 解析后按级别 + 规则集汇总为**独立报告节（不拆维度）**；无 DevEco 则中止、不产报告 |
| 2 架构评审 | A1 通用 +（UI 库才有）A2 UI 架构，人工白盒判断（lint 结果自成独立节，不并入本维度） |
| 3 代码质量评审 | B1 通用·逻辑 +（UI 库才有）B2 UI 代码质量，人工白盒判断（lint 结果自成独立节，不并入本维度） |
| 4 报告 | 套用 `assets/assessment-report-template.md` 产出 |

## 用法

在 Claude Code 中触发，例如：

```
评估这个鸿蒙三方库的质量：/path/to/some-har-lib
```

阶段0 库画像由 Skill 用内置工具（Read/Glob/Grep + `find`/`wc`）完成，**无需 Python 或任何脚本**；具体步骤见 [references/profiling/library-profiling.md](references/profiling/library-profiling.md)。

## 目录结构

```
hmos-library-quality-assessment/
├── SKILL.md                              # 入口：5 阶段方法论、严重级别、分库型维度路由表
├── references/
│   ├── profiling/
│   │   └── library-profiling.md          # 阶段0 库画像（Read/Glob/Grep，无 Python）
│   ├── architecture/                     # 维度 A 架构（两子维度）
│   │   ├── general-architecture-review.md         # A1 通用架构（SOLID/耦合/反模式，语言无关）
│   │   └── ui-architecture-assessment.md          # A2 UI 架构（仅 UI 库：复用边界/契约/状态/扩展/资源）
│   ├── code-quality/                     # 维度 B 代码质量
│   │   ├── code-quality-assessment.md    # B1 通用·逻辑
│   │   └── ui-code-quality-assessment.md # B2 UI 代码质量（仅 UI 库：状态/生命周期/性能/稳定/跨设备/无障碍）
│   └── deveco-studio-codelinter/         # CodeLinter 全部内容（B0 静态扫描）
│       ├── integration.md                # 集成：探测/CLI/JSON/severity + 全量规则集 + 报告汇总(不拆维度)
│       ├── config-examples.md             # vendored：配置示例
│       └── rule-sets-reference.md         # vendored：完整规则集
└── assets/
    ├── assessment-report-template.md     # 报告模板（无评分表，按 A1/A2 + B1/B2 分组）
    └── assessment-checklist.md           # 快速白盒清单
```

## 自包含 · 内容来源

本 Skill **自包含**，运行时不依赖其他 skill —— 所需判据均已内联：

| 内联内容 | 文件 | 蒸馏自 |
|----------|------|--------|
| CodeLinter 集成（探测/CLI/JSON + 全量规则集 + 报告汇总·不拆维度）| `references/deveco-studio-codelinter/`（integration.md + rule-sets-reference.md + config-examples.md） | deveco-studio-codelinter |
| A2 UI 架构判据（复用边界/契约/状态选型/扩展/资源可覆盖性）| `references/architecture/ui-architecture-assessment.md` | hmos-arkui-develop-skill |
| B2 UI 代码质量判据（状态/生命周期/渲染性能/稳定/跨设备/无障碍）| `references/code-quality/ui-code-quality-assessment.md` | hmos-arkui-develop-skill |
| 方法论 / 🔴🟡🟢💡 分级 / 报告模板 | `SKILL.md` · `assets/` | code-review-skill |

> 唯一外部依赖是 CodeLinter **二进制**（随 DevEco Studio 分发）——硬性前置，缺失则中止评估、不产报告。
