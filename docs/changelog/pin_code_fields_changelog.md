# pin_code_fields 鸿蒙适配 — 变更记录

> 插件：`pin_code_fields` 9.4.0
> 类型：pure Dart Flutter UI 组件（headless `PinInput` + Material `MaterialPinField` + 统一 `PinInputController`）
> 适配仓库：`flutter_library_workflow/flutter_library_workflow_release/repos-flutter-fast/pin_code_fields/packages/pin_code_fields`
> 验证设备：HUAWEI Mate 60（BRA-AL00，API 23）
> 最新审计日期：2026-07-31

---

## 一、适配摘要

- 在 `lib/src/core/gestures/selection_gesture_builder.dart` 的 `TargetPlatform` 穷尽分支中加入 `TargetPlatform.ohos`，与 Android/Fuchsia 同组返回 `materialTextSelectionHandleControls`。
- 新增七平台选择控件矩阵测试 `test/selection_gesture_builder_test.dart`（iOS/macOS→Cupertino，Android/Fuchsia/OHOS→Material，Linux/Windows→Desktop）。
- 包无 MethodChannel、EventChannel、PlatformView、FFI、插件级 `ohos/` 或系统权限；未创建原生 HAR，未复制 7.4.0 旧架构供体。
- 文档示例不再示范输出 PIN/剪贴板明文。

## 二、交付产物（`.ohos-adaptation/`）

| 产物 | 说明 |
|---|---|
| `00-migration-context.json` / `00-source-scan.json` / `00-requirement(.json/.md)` | 迁移上下文、只读扫描、需求解析 |
| `01-analysis.json/.md`、`01-analysis-prd.md`、`pin_code_fields_prd.md` | 分析 + 双 PRD（字节一致） |
| `01-prd-mermaid-validation.json` + `mermaid/*.svg` | 5 幅 Mermaid 渲染证据 |
| `02-planning.json/.md` | pure-dart 实施规划 |
| 10 件测试设计产物（00/02/03/04/05 两两成对） | 8 模块、32 条用例（L0 11/L1 16/L2 5）、评审 97 分 |
| `05-test-cases.xlsx` | 12 列 32 行 |
| `03-coding-library.json/.md`、`patch-manifest.json`、`patch-implementation-report.md` | 编码阶段与最小补丁追踪 |
| `03-code-review.json` + `logs/code-review*` | 代码审查，P0/P1=0 |
| `04-testing.json/.md`、`04-verification-evidence.json` | 测试与逐命令证据 |
| `04-droidrun-*`（4 个） | L0 自动化套件 |
| `05-demo-gen.json/.md` | Demo 生成与真机验证 |
| `artifact-manifest.json`、`05-summary.json/.md`、`INTEGRATION_GUIDE.md` | 交付清单、总结、集成指南 |
| `05-schema-validation.json`、`05-pipeline-consistency.json` | AJV 5/5 schema + 8/8 一致性 |
| `logs/*`（含 32 张真机截图 `f*.jpeg`） | 原始命令/日志/设备证据 |

## 三、我认为最重要的产物

1. **双 PRD（字节一致 + Mermaid 渲染）**：机器门禁（mermaid-validation）直接消费，且是 32 条用例的“契约源头”；任何漂移都会在 analysis/cases 阶段被拒。
2. **`04-test-cases.json`**：最终 verifier 的全部用例合同；reviewed/generated/implemented 集合必须严格一致。
3. **`01-analysis.json` + `02-planning.json`**：决定 pure_dart 分类与最小补丁路径，Schema 校验与 `channel_name_consistency` 依赖它们。
4. **`05-summary.json` + `artifact-manifest.json`**：跨阶段聚合与 HAP 交付追踪（哈希/签名/安装/运行状态分离）。
5. **签名 HAP + 32 张真机截图**：唯一能证明“行为在真实系统通过”的证据，屏幕截图/单测/analyzer 不能替代。
6. **`patch-manifest.json`**：最小补丁的意图、证据、验证与回滚路径，保证 surgical change 可审计。

## 四、我认为最重要的测试

1. **`test/selection_gesture_builder_test.dart`**：直接回归本次唯一适配缺口（OHOS 选择控件 + 其余六平台不回归），是最关键的自动化防线。
2. **包级全量 `flutter test`（80/80）**：既有 73+ 测试 + 新增矩阵测试全部通过，证明补丁未破坏 headless/Material/form/theme/semantics。
3. **Hub PIN widget tests（4/4）**：32 ID 唯一性、负向拒绝按“符合预期”判定、复制日志不含明文、填充长度——覆盖 Demo 与敏感数据契约。
4. **真机 32/32 用例 UI 自动化**：在真实系统验证输入/遮罩/表单/剪贴板/主题/OHOS 选择控件等 L0-L2 行为，截图留证。
5. **复制日志 F-07-02**：剪贴板报告仅含 case ID/长度/状态，无 PIN/OTP 明文——安全要求的关键验证。

## 五、关键工程决策

| 决策 | 依据 |
|---|---|
| pure_dart 最小补丁，不建插件 HAR | 源码无 Channel/FFI/PlatformView/原生依赖 |
| OHOS 复用 Material 选择控件 | 与 Android/Fuchsia 交互一致 |
| 拒绝复用 7.4.0 供体 | 9.0.0 起已 headless 重写，API 不兼容 |
| 替换 `flutter_tester.exe` 为标准引擎构建 | OHOS fork 版无静态快照，无法启动测试 |
| 交付 HAP 由 `flutter_ohos_test` Hub 承载 | Hvigor 无法在 subst/junction 长路径下构建 example_auto 自身 HAP |

## 六、修订记录

| 日期 | 变更 |
|---|---|
| 2026-07-31 | 完成 9.4.0 鸿蒙适配全流程：最小补丁、PRD/Mermaid、32 条测试设计与 XLSX、编码/审查/DFX、Demo、签名 HAP、真机安装与 32/32 用例验证；修复 `flutter test` 引擎与上游 `RadioGroup` 兼容；final verifier PASS |

---

*本变更记录基于实际执行的产物与真机验证结果；详细困难与处理流程见 `pin_code_fields_devlog.md`。*
