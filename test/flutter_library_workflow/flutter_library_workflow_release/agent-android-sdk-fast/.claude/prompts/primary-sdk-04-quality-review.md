# 质量审查（HarmonyOS HAR 三方库白盒质量评估）

你负责对**前序步骤生成的 HarmonyOS HAR 三方库**做白盒质量评估，评估它作为一个三方库自身的内在质量（架构 + 代码质量 + DFX 质量）。

**先分清本阶段在评什么：**

- **评估对象 = 前序步骤产出的三方库本体 `ohos_hardemo/library/`**，即本工作流交付的成果物；要回答的是「这个库自身写得好不好」。
- **本阶段不是集成评估**：不评估 Demo（`ohos_hardemo/entry/`），不评估「库能否集成进宿主 / 能否在 Demo 里跑通」，也不重复校验与 Android 的功能对齐——功能、集成与编译已在「代码实现」「编码校验」阶段完成并修复。
- 本阶段**只读、只评估，绝不修改被评估库**，只独立审查并产出质量报告。

## 输入和输出

开始前读取：

- 被评估的三方库根目录 **`ohos_hardemo/library/`**（含 `oh-package.json5`、`Index.ets`、`module.json5`、`build-profile.json5`）——**唯一的评估对象**。
- `.ohos-adaptation/03-validation-report.md`（仅作背景参考，了解编码校验阶段的结论与已修复项；不据此重复做集成 / 功能校验）

> 评估范围严格限定在 `ohos_hardemo/library/`，**不纳入** `ohos_hardemo/entry/`（Demo）的代码——Demo 只是验收载体，其质量不属于本阶段评估范围。

最终写入：

- `.ohos-adaptation/04-quality-review-report.md`

## 评估方法

使用 **`hmos-library-quality-assessment`** Skill，对 `ohos_hardemo/library/` 执行白盒质量评估：

1. **阶段0 库画像**：判定库型（UI / 逻辑 / NAPI），据此决定是否启用 UI 专项子维度（A2 + B2 + C3）。
2. **阶段1 静态扫描（CodeLinter，硬前置）**：探测 DevEco Studio CodeLinter，**仅对 `ohos_hardemo/library/` 模块**做全量规则集扫描（不加 `--fix`、不扫 `entry/`），按级别 + 规则集汇总为独立报告节。
3. **阶段2 架构评估**：A1 通用架构（SOLID / 耦合内聚 / 反模式 / 分层依赖）；UI 库另含 A2 UI 架构（复用边界 / 对外契约 / 状态选型 / 扩展点 / 资源可覆盖性）。
4. **阶段3 代码质量**：B1 通用·逻辑（ArkTS 规范 / 复杂度 / 错误处理 / 逻辑性能 / 加密安全）；UI 库另含 B2 UI 代码质量。
5. **阶段4 DFX 质量检测**：使用 **`dfx-quality`** Skill 的检测脚本（`--dry-run` 模式）对 `ohos_hardemo/library/src/main/ets/` 做自动化扫描，再对脚本无法覆盖的问题由 agent 逐项核对。C1 稳定性 / C2 功耗 / C4 兼容性适用于所有库型，C3 UX 仅 UI 库。检查项与命令详见 `dfx-quality` Skill。
6. **阶段5 汇总报告**：套用 Skill 的报告模板。

发现按 🔴`[blocking]` / 🟡`[important]` / 🟢`[nit]` / 💡`[suggestion]` 分级，含 `file:line` 与修复建议；总体结论为定性判断（✅ 推荐 / ⚠️ 谨慎使用 / ❌ 不推荐），不打分、不评等级。

## CodeLinter 缺失处理（软跳过）

CodeLinter 是该 Skill 的硬前置。若**未探测到 DevEco Studio / CodeLinter**：

- 不要让本阶段报错中断流水线。
- 仍然写出 `.ohos-adaptation/04-quality-review-report.md`，在报告开头明确注明「**未检测到 DevEco Studio CodeLinter，已跳过质量评估**」，并简述检测过程与建议（安装 DevEco Studio 后重跑本阶段）。
- 在此前提下，可基于 Read/Grep/Glob 给出架构与代码质量的启发式观察（标注为 💡 非阻塞注解），但不得据此下「❌ 不推荐」这类强结论。
- **DFX 质量检测（阶段4）不依赖 CodeLinter**，即使 CodeLinter 缺失仍可正常运行脚本扫描与 agent 核对。
- 本阶段视为**正常完成**。

## 输出报告

写入 `.ohos-adaptation/04-quality-review-report.md`，使用中文，按 Skill 报告模板组织：

1. 三方库画像（库型 / 产物类型 / 导出与依赖 / 规模）
2. 总体结论（✅/⚠️/❌ + 一句理由 + 亮点 + 🔴X/🟡Y/🟢Z 计数 · 含 DFX 维度）
3. 架构发现（A1；UI 库含 A2）
4. 代码质量发现（B1；UI 库含 B2）
5. DFX 质量检测发现（C1 稳定性；C2 功耗；C4 兼容性；UI 库含 C3 UX）
6. 修复优先级清单（含 DFX 发现）
7. CodeLinter 扫描结果（独立节·按级别 + 规则集·不拆维度；若 CodeLinter 缺失则注明已跳过）

> 逻辑 / NAPI 库删除 A2、B2、C3 三组。全程不修改 `ohos_hardemo/library/`，CodeLinter 配置与输出均放在 scratch 目录。
