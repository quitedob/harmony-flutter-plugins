---
name: hmos-library-quality-assessment
description: |
  对 HarmonyOS（鸿蒙）ArkTS 三方库做白盒质量评估，从【架构】与【代码质量】两大维度审查 HAR/HSP 库。
  架构维度分两子维度：A1 通用架构（SOLID/耦合/反模式/分层）、
  A2 UI 架构（仅 UI 库：组件复用边界、对外契约、状态选型、扩展点、资源可覆盖性）。代码质量维度：B1 通用·逻辑质量、
  B2 UI 代码质量（仅 UI 库：状态/生命周期/渲染性能/稳定/跨设备/无障碍）。依赖 DevEco Studio CodeLinter 做静态扫描
  （未检测到则中止评估、仅提示而不产出报告），输出按 🔴/🟡/🟢 分级、含 file:line 与修复建议的发现清单及定性结论。
  适用于（Use when）：评估或验收 HarmonyOS 三方库 / ArkTS 库质量、三方库质量评估、白盒评估、架构评估、UI 库架构评估、
  代码质量评估、UI 组件库质量评估、HAR/HSP 包质量审查
allowed-tools:
  - Read
  - Grep
  - Glob
  - Bash      # 探测 DevEco/CodeLinter、运行静态扫描、用 find/wc 统计文件数与 LOC（只读分析，不修改被评估库）
---

# HarmonyOS 三方库质量评估（白盒）

对之前阶段生成的ArkTS 三方库（HAR/HSP）做架构 + 代码质量两维白盒评估。本 Skill 只评估、**只读**——绝不修改被评估库。

**分库型按需检查是本 Skill 的核心机制**：阶段0 判定库型（UI / 逻辑 / NAPI）后，**UI 库**才启用 A2（UI 架构）+ B2（UI 代码质量）两组 UI 专项判据；逻辑/NAPI 库省略这两组。CodeLinter 阶段一律全量扫描，库型只影响人工评审侧重。

## 何时使用本 Skill

- 评估 / 验收一个 HarmonyOS 三方库（含 UI 组件库）的架构与代码质量

## 两大维度 · 四子维度

| 维度 | 子维度 | 覆盖 | 适用库型 | 详细指南 |
|------|------|------|:--:|----------|
| **A. 架构** | **A1 通用架构** | SOLID、耦合内聚、反模式、分层依赖方向（语言无关） | 全部 | [通用架构评审](references/architecture/general-architecture-review.md) |
| | **A2 UI 架构** | 组件复用层级与导出边界、对外契约(@Param/@Event/@BuilderParam)、状态选型不绑架宿主、扩展点、资源可覆盖性 | **仅 UI 库** | [UI 架构评估](references/architecture/ui-architecture-assessment.md) |
| **B. 代码质量** | **B1 通用·逻辑** | ArkTS 规范与正确性、可读性、复杂度、错误处理与健壮性、逻辑性能、加密安全 | 全部 | [代码质量评估](references/code-quality/code-quality-assessment.md) |
| | **B2 UI 代码质量** | 状态管理正确性、生命周期、渲染性能、稳定性与资源释放、跨设备适配、无障碍/深色 | **仅 UI 库** | [UI 代码质量评估](references/code-quality/ui-code-quality-assessment.md) |

> 不评估：文档、测试覆盖率、License/合规——超出本 Skill 范围。

## 严重级别（沿用统一标记，勿自创同义词）

- 🔴 `[blocking]` 必须修复——存在严重缺陷，必须修复
- 🟡 `[important]` 应当修复——明显问题，建议修复
- 🟢 `[nit]` 可选优化——不阻塞
- 💡 `[suggestion]` 替代方案 / 改进思路（含 Grep 粗查得到的启发式线索）

> 🔴/🟡/🟢 为标准三档（由红到绿），💡 为非阻塞注解。
> **本 Skill 不打分、不加权、不评 A–E 等级**；总体结论为定性判断。

## 评估方法论（按阶段执行）

### 阶段0 · 三方库画像与定性分类

用内置工具完成（详见 [库画像指南](references/profiling/library-profiling.md)）：**Read** `oh-package.json5`（name/version/main/依赖计数）、`module.json5`（type/deviceTypes）、`build-profile.json5`（byteCodeHar/compatibleSdkVersion）、`Index.ets`（导出列表 / 是否 export *）；**Glob/Grep** 判库型（cpp/.so/.d.ts → NAPI，`@Component`/`struct` → UI，否则逻辑库）；**Bash** `find … | wc -l` 统计文件数与 LOC。据此把库归类为三型之一，**决定后续是否启用 UI 专项子维度（A2 + B2）**：

- **UI 库**（含 .ets 组件 / `@Component`/`@ComponentV2`/`@Builder`/`struct`）→ **启用 A2 + B2**；强 ArkUI 架构（复用边界/契约）+ 渲染性能 + 跨设备适配。
- **逻辑库**（纯 .ts/.ets，无 UI，工具/网络/数据/算法）→ **跳过 A2 + B2**；强 A1 + B1 类型安全 + 健壮性 + API 设计。
- **NAPI/Native 库**（含 `src/main/cpp/`、`libs/*.so`、`types/*.d.ts`）→ **跳过 A2 + B2**（除非另含 ArkUI）；关注 Native 接口边界与 .so 兼容。

> 规则集与库型无关——**阶段1 一律全量扫描全部 8 个规则集**；库型只影响阶段2–3 人工评审是否展开 A2/B2。

产出"三方库画像"块，填入报告模板顶部。

### 阶段1 · 自动化静态扫描→ [CodeLinter 集成指南](references/deveco-studio-codelinter/integration.md)

探测 CodeLinter（未探测到则**立即中止评估、不产报告、仅提示**）→ 在 scratch 目录生成全量 `codelinter.json5` → 运行（**不加 `--fix`**）→ 解析 JSON → 按 [CodeLinter 报告汇总](references/deveco-studio-codelinter/integration.md#5-codelinter-报告汇总不拆维度)**整体按 🔴/🟡/🟢 级别 + 规则集归并，作为独立证据节，不拆分到 A1/A2/B1/B2**。维度结论由阶段2–3 人工白盒评审独立给出，lint 报告自成一节、不含维度交叉引用。

### 阶段2 · 架构评估（A1 +（UI 库）A2）

- **A1 通用架构** → [通用架构评审](references/architecture/general-architecture-review.md)：SOLID、耦合/内聚、反模式、分层依赖方向。
- **A2 UI 架构**（仅 UI 库）→ [UI 架构评估](references/architecture/ui-architecture-assessment.md)：导出组件是否为通用组件、对外契约设计、状态选型、扩展点、资源可覆盖性。

### 阶段3 · 代码质量评估（B1 +（UI 库）B2）

- **B1 通用·逻辑** → [代码质量评估](references/code-quality/code-quality-assessment.md)：ArkTS 规范、复杂度、错误处理、逻辑性能、加密安全。
- **B2 UI 代码质量**（仅 UI 库）→ [UI 代码质量评估](references/code-quality/ui-code-quality-assessment.md)：状态管理正确性、生命周期、渲染性能、稳定与资源释放、跨设备适配、无障碍/深色。

### 阶段4 · 汇总与报告 → [报告模板](assets/assessment-report-template.md)

套用模板：库画像 → 总体结论(✅/⚠️/❌ + 一句理由 + 亮点 + 🔴X/🟡Y/🟢Z 计数) → 架构发现(A1/A2) → 代码质量发现(B1/B2) → 修复优先级清单 → CodeLinter 扫描结果(独立节·按级别+规则集·不拆维度)。**逻辑/NAPI 库删除 A2、B2 两组。**

**定性结论判定准则**（非计算分数）：

- ❌ 不推荐：存在任一 🔴（如不安全加密、循环依赖、UI 库导出内嵌业务/数据源的组件、无法编译）。**UI 库的 🔴 触发点另见 A2 [§8 红色速查](references/architecture/ui-architecture-assessment.md#8-ui-架构红色速查)。**
- ⚠️ 谨慎使用：无 🔴 但有多条 🟡（复杂度高、缺错误处理、契约泄漏内部态、设备适配不足等）。
- ✅ 推荐：无 🔴，🟡 少且非关键。

## 维度路由表（按要审的点跳对应指南）

| 要评估的点 | 子维度 | 跳转 |
|-----------|:--:|------|
| 库画像 / 库型判定(UI/逻辑/NAPI) / HAR-HSP 识别 / 规模统计 | 阶段0 | [库画像指南](references/profiling/library-profiling.md) |
| SOLID / 耦合内聚(CBO/LCOM4) / 反模式 / 设计模式 / 分层依赖 / 可扩展性 | **A1** | [通用架构评审](references/architecture/general-architecture-review.md) |
| UI 组件复用层级与导出边界 / @Param-@Event-@BuilderParam 契约 / 状态选型不绑架宿主 / 插槽扩展点 / 资源可覆盖性 | **A2**（UI 库） | [UI 架构评估](references/architecture/ui-architecture-assessment.md) |
| ArkTS 规范 / any / null 安全 / 复杂度 / 错误处理 / 逻辑性能 / 加密安全 | **B1** | [代码质量评估](references/code-quality/code-quality-assessment.md) |
| UI 状态管理正确性 / 生命周期 / 渲染性能(LazyForEach/@Reusable) / 资源释放 / 跨设备适配 / 无障碍·深色 | **B2**（UI 库） | [UI 代码质量评估](references/code-quality/ui-code-quality-assessment.md) |
| 跑 CodeLinter / 全量规则集 / 报告汇总(独立节·不拆维度) / 硬前置探测 | B0 | [CodeLinter 集成](references/deveco-studio-codelinter/integration.md) · [规则集目录](references/deveco-studio-codelinter/rule-sets-reference.md) |

## 自包含说明

本 Skill 已将所需判据**全部内联**，运行时**不依赖其他 skill**：

- CodeLinter 探测 / CLI / JSON / 全量规则集 / 配置 → [integration.md](references/deveco-studio-codelinter/integration.md)（+ rule-sets-reference.md / config-examples.md）
- A1 通用架构 → [general-architecture-review.md](references/architecture/general-architecture-review.md)
- A2 UI 架构判据 → [ui-architecture-assessment.md](references/architecture/ui-architecture-assessment.md)
- B1 → [code-quality-assessment.md](references/code-quality/code-quality-assessment.md)
- B2 UI 代码质量判据 → [ui-code-quality-assessment.md](references/code-quality/ui-code-quality-assessment.md)
- 方法论、🔴/🟡/🟢 分级、报告模板均在本 Skill 内

> 外部依赖仅 CodeLinter **二进制**（随 DevEco Studio 分发）——它是**硬性前置**，缺失则中止评估、不产报告。A2/B2 的 ArkUI 判据蒸馏自 hmos-arkui-develop-skill、A1 与方法论范式来自 code-review-skill；deveco-studio-codelinter 已整份 vendored 到 `references/deveco-studio-codelinter/`——均无需另装这些 skill。

## 评估前置清单

- [ ] 已定位库根目录（含 oh-package.json5 / Index.ets / module.json5）
- [ ] 已完成阶段0 库画像并确定库型（UI / 逻辑 / NAPI）→ 据此决定是否启用 A2 + B2
- [ ] 已探测到 CodeLinter（未探测到则已中止评估、仅提示，无报告）
- [ ] 架构维度：A1 +（UI 库）A2 各自跑完并产出分级发现
- [ ] 代码质量维度：B1 +（UI 库）B2 各自跑完并产出分级发现（🔴/🟡/🟢 + file:line + 修复建议）
- [ ] 已给出定性总体结论（✅/⚠️/❌）+ 亮点 + 风险计数
- [ ] 报告中逻辑/NAPI 库已删除 A2、B2 两组（仅 UI 库保留）
- [ ] 全程未修改被评估库（配置与 lint 输出均在 scratch 目录）