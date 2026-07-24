# 三方库质量评估 · 快速白盒清单

> 按两大维度组织：架构（A1 通用 / A2 UI）+ 代码质量（B1 通用·逻辑 / B2 UI）；A2、B2 仅 UI 库适用。详细判据见 [references/](../references/)。级别：🔴 必须 / 🟡 应当 / 🟢 可选。

## 阶段0 · 库画像（先做）
- [ ] 用 Read/Glob/Grep + `find`/`wc` 得出：HAR/HSP、库型(UI/逻辑/NAPI)、导出数、依赖数、LOC（见 [库画像指南](../references/profiling/library-profiling.md)）
- [ ] 探测 CodeLinter（硬前置）：命中 → 继续；未检测到 → 中止评估、仅提示，不产报告

## A. 架构（两子维度）

**A1 通用架构**（详见 architecture/general-architecture-review.md）
- [ ] 遵循 SOLID；公共 API 最小聚焦；无上帝类/大泥球/复制粘贴等反模式
- [ ] 依赖方向正确（下层/实现依赖上层/抽象 = 错）；无对外可变全局单例

**A2 UI 架构**（仅 UI 库，详见 architecture/ui-architecture-assessment.md）
- [ ] 导出的 UI 组件均为通用组件（无 ViewModel/业务耦合/硬编码数据源）；业务·页面组件不外导
- [ ] 组件对外契约（@Param 只读/@Event 输出/@BuilderParam 插槽）最小、稳定、不泄漏内部态
- [ ] MVVM 分层清晰、依赖方向 View→VM→Model；状态选型 V2 优先且不绑架宿主
- [ ] 预留扩展点/插槽；颜色·文案·尺寸走 `$r` 资源，宿主可换肤/i18n/深色

## B. 代码质量

**B1 通用·逻辑代码质量**（详见 code-quality/code-quality-assessment.md）
- [ ] 无 `any`（含导出面）、无滥用非空断言；Promise 正确处理；可编译
- [ ] 命名清晰、过 `@hw-stylistic`；函数<50/类<200/参数<4/嵌套<4；无重复块/魔法数字
- [ ] 无空 catch；资源(定时器/订阅/监听/游标/媒体/传感器)成对释放、有 dispose API
- [ ] 逻辑库：顶层无重逻辑、循环常量外提、无不合理深拷贝
- [ ] 加密算法安全(无 ECB/MD5/SHA1/弱 RSA/3DES)；入参校验；无硬编码密钥/敏感日志

**B2 UI 代码质量**（仅 UI 库，详见 code-quality/ui-code-quality-assessment.md）
- [ ] 状态管理正确：不混用 V1/V2、@Param 不被内部直改、无冗余状态、派生用 @Computed
- [ ] `build()` 无副作用；初始化/清理在生命周期；`@Reusable` 配 aboutToReuse/Recycle
- [ ] 长列表 `LazyForEach`/`Repeat`+稳定 key+`cachedCount`+`@Reusable`；显隐用 visibility；transform 动画；无高频日志
- [ ] 资源(定时器/订阅/overlay/媒体)在 `aboutToDisappear` 释放；判空守护；无 @Watch 死循环
- [ ] 跨设备：vp/fp、断点 GridRow/GridCol、onBreakpointChange、触控≥48vp；无障碍/深色友好

## 收尾
- [ ] 两维发现均已 🔴/🟡/🟢 分级 + `file:line` + 修复建议
- [ ] 定性结论(✅/⚠️/❌)+一句理由+亮点+🔴X/🟡Y/🟢Z 计数已给出
- [ ] CodeLinter 扫描结果独立成节（按级别 + 规则集，不拆维度）
- [ ] 全程未修改被评估库
