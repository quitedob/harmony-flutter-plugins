# pin_code_fields 鸿蒙适配 — 变更记录

> 插件：`pin_code_fields` 9.4.0
> 类型：pure Dart Flutter UI 组件（headless `PinInput` + Material `MaterialPinField` + 统一 `PinInputController`）
> 适配仓库：`flutter_library_workflow/flutter_library_workflow_release/repos-flutter-fast/pin_code_fields/packages/pin_code_fields`
> 验证设备：HUAWEI Mate 60（BRA-AL00，API 23，Wi-Fi 192.168.3.85:41665；签名 HAP 已安装并运行）
> 最新审计日期：2026-08-04

---

## 一、适配摘要

- 在 `lib/src/core/gestures/selection_gesture_builder.dart` 的 `TargetPlatform` 穷尽分支中加入 `TargetPlatform.ohos`，与 Android/Fuchsia 同组返回 `materialTextSelectionHandleControls`。
- 新增七平台选择控件矩阵测试 `test/selection_gesture_builder_test.dart`（iOS/macOS→Cupertino，Android/Fuchsia/OHOS→Material，Linux/Windows→Desktop）。
- 包无 MethodChannel、EventChannel、PlatformView、FFI、插件级 `ohos/` 或系统权限；未创建原生 HAR，未复制 7.4.0 旧架构供体。
- 文档示例不再示范输出 PIN/剪贴板明文。
- **2026-08-04 完整契约整改**：交付独立插件本地 example_auto HAP（不再依赖共享 `flutter_ohos_test` Hub）；生成 XLSX 驱动的 32 用例独立 Demo（每例渲染全部 12 列 XLSX 字段、`runCase` 共享执行器、`一键测试全部`、`复制日志`）；补齐 `04-ohos-demo-case-map.json` + `05-xlsx-demo-binding.json`；修正 `05-summary.json` 等陈旧/矛盾字段。
- **2026-08-04 真机运行完成**：以签名兼容临时 bundleName `com.example.flutter_ohos_test` 用 `5Bu6m` 签名材料签名独立 HAP（`verify-app` exit 0），`hdc install` 成功、`aa start` 启动成功，`一键测试全部` 32/32 全部“符合预期（PASS）”，设备证据已回填（`04-verification-evidence`/`04-testing`/`05-summary`/`05-demo-gen`/`artifact-manifest`），AJV 5/5 + 一致性 8/8 PASS；最终 verifier 仅剩 31 条“逐用例截图复用”审计项与 2 条已知 verifier/exporter 冲突。

## 二、交付产物（`.ohos-adaptation/`）

| 产物 | 说明 |
|---|---|
| `00-migration-context.json` / `00-source-scan.json` / `00-requirement(.json/.md)` | 迁移上下文、只读扫描、需求解析 |
| `01-analysis.json/.md`、`01-analysis-prd.md`、`pin_code_fields_prd.md` | 分析 + 双 PRD（字节一致） |
| `01-prd-mermaid-validation.json` + `mermaid/*.svg` | 5 幅 Mermaid 渲染证据 |
| `02-planning.json/.md` | pure-dart 实施规划 |
| 10 件测试设计产物（00/02/03/04/05 两两成对） | 8 模块、32 条用例（L0 11/L1 16/L2 5）、评审 97 分 |
| `05-test-cases.xlsx` + `05-xlsx-demo-binding.json` | 12 列 32 行 + exporter 哈希绑定（整改后重新导出并通过严格校验） |
| `04-ohos-demo-case-map.json` | 32 例 → 公共 API/OHOS 路径/控件/Key/前后状态/机器断言映射 |
| `03-coding-library.json/.md`、`patch-manifest.json`、`patch-implementation-report.md` | 编码阶段与最小补丁追踪 |
| `03-code-review.json` + `logs/code-review*` | 代码审查，P0/P1=0 |
| `04-testing.json/.md`、`04-verification-evidence.json` | 测试与逐命令证据（device 证据为 skipped，待设备回填） |
| `04-droidrun-*`（4 个） | L0 自动化套件（已指向独立 Demo `com.example.pin_code_fields_example_auto`） |
| `05-demo-gen.json/.md` | Demo 生成（user_decision=ACCEPTED；midscene/case_verdicts 待设备） |
| `artifact-manifest.json`、`05-summary.json/.md`、`INTEGRATION_GUIDE.md` | 交付清单、总结、集成指南 |
| `05-schema-validation.json`、`05-pipeline-consistency.json` | AJV 5/5 schema + 8/8 一致性（PASS） |
| `tool/generate_demo.py` | 项目本地 Demo 生成器（生成 exporter 兼容的三级页 + case-map） |
| `example_auto/` | XLSX 驱动独立 Demo：`lib/pages/`（8 模块 + 32 用例三级页）、`lib/demo_runner.dart`（`runCase`）、`btn_run_all`、`btn_copy_log`、独立 `ohos/` 工程 |
| 签名 HAP | `example_auto/build/ohos/hap/pin_code_fields_example_auto-8988edb8-signed.hap`（98,405,225 B，SHA-256 `b5c29e9e…`，23 entries 含 Flutter kernel；临时 `com.example.flutter_ohos_test` 身份 + `5Bu6m` 材料签名，`verify-app` exit 0；已 `hdc install` + `aa start` 启动，`一键测试全部` 32/32 PASS） |
| `logs/*` | 命令/日志/构建证据（构建 `demo-build.log`、analyze/test/dfx 等） |

## 三、我认为最重要的产物

1. **双 PRD（字节一致 + Mermaid 渲染）**：机器门禁（mermaid-validation）直接消费，且是 32 条用例的“契约源头”；任何漂移都会在 analysis/cases 阶段被拒。
2. **`04-test-cases.json`**：最终 verifier 的全部用例合同；reviewed/generated/implemented 集合必须严格一致。
3. **`04-ohos-demo-case-map.json` + `05-xlsx-demo-binding.json`**：把每个用例映射到可点击控件/语义 Key/可见业务状态，使 XLSX 可被独立 Demo 逐条驱动——整改后补上的关键绑定。
4. **`example_auto/lib/demo_runner.dart`（`runCase`）**：32 个分支全部真实调用插件 API（`PinInput`/`PinInputController.setText`/`triggerError`/`MaterialPinField`/`MaterialPinTheme`/`PinInputFormField`/`MaterialPinFormField`/`LengthLimitingTextInputFormatter`/`triggerHaptic`/`getDefaultSelectionControls`），负向用例仅在真实拒绝（AssertionError）时记 PASS；无 TODO/占位。
5. **独立 HAP**：由短物理工作区 `flutter create` + DevEco `node.exe` 直调 `hvigorw.js` 构建，插件本地 `example_auto` 身份（`com.example.pin_code_fields_example_auto`），不再来自共享 Hub。
6. **`05-summary.json` + `artifact-manifest.json`**：跨阶段聚合与 HAP 交付追踪（哈希/签名/安装/运行状态分离；device 状态如实为 skipped）。

## 四、我认为最重要的测试

1. **`test/selection_gesture_builder_test.dart`**：直接回归本次唯一适配缺口（OHOS 选择控件 + 其余六平台不回归），是最关键的自动化防线。
2. **包级全量 `flutter test`（80/80）**：既有 73+ 测试 + 新增矩阵测试全部通过，证明补丁未破坏 headless/Material/form/theme/semantics。
3. **Demo widget tests（模块索引 + `一键测试全部` 32/32，2/2）**：共享执行器 `runCase` 对全部 32 例真实调用插件 API，逐例返回“符合预期（PASS）”。
4. **Demo `flutter analyze`（无 issue）**：生成的三级页/执行器零告警。
5. **独立 HAP 构建（exit 0）**：ZIP 22 entries，含 Flutter kernel `kernel_blob.bin` + isolate/VM snapshot + `libflutter.so`。

## 五、关键工程决策

| 决策 | 依据 |
|---|---|
| pure_dart 最小补丁，不建插件 HAR | 源码无 Channel/FFI/PlatformView/原生依赖 |
| OHOS 复用 Material 选择控件 | 与 Android/Fuchsia 交互一致 |
| 拒绝复用 7.4.0 供体 | 9.0.0 起已 headless 重写，API 不兼容 |
| 替换 `flutter_tester.exe` 为标准引擎构建 | OHOS fork 版无静态快照，无法启动测试 |
| 独立 HAP 由短物理工作区 `flutter create` + DevEco `node.exe` 直调 `hvigorw.js` 构建 | Windows/Hvigor 259 字符路径 + `hvigorw.bat` 批处理递归；不再依赖共享 Hub（Gate F） |
| Demo 按 exporter 契约生成三级页（每例唯一语义 Key + 渲染 12 列字段 + 共享执行器） | `04-ohos-demo-case-map.json`/XLSX binding 校验要求每个用例有可点击控件与可见业务状态 |
| 设备运行时证据如实标 `skipped` | 独立 HAP 需真实设备 + DevEco 签名后才安装/运行；不将 NOT_RUN 伪装为 PASS |

## 六、修订记录

| 日期 | 变更 |
|---|---|
| 2026-07-31 | 完成 9.4.0 鸿蒙适配全流程：最小补丁、PRD/Mermaid、32 条测试设计与 XLSX、编码/审查/DFX、Demo、签名 HAP、真机安装与 32/32 用例验证；修复 `flutter test` 引擎与上游 `RadioGroup` 兼容。**注**：当时交付 HAP 来自共享 `flutter_ohos_test` Hub，违反 Gate F 独立 Demo 契约。 |
| 2026-08-04 | 完整契约整改：构建独立插件本地 example_auto HAP（短工作区 `flutter create` + 直调 `hvigorw.js`）；生成 exporter 兼容的 32 用例独立 Demo 与 `04-ohos-demo-case-map.json`/`05-xlsx-demo-binding.json`；新增 `一键测试全部`/`复制日志`；修正陈旧 JSON 与报告；AJV 5/5 + 一致性 8/8 PASS。 |
| 2026-08-04 | 真机运行完成：以临时 `com.example.flutter_ohos_test` 身份用 `5Bu6m` 材料签名独立 HAP（`verify-app` exit 0，SHA `b5c29e9e…`），`hdc install`/`aa start` 成功，`一键测试全部` 32/32 符合预期；设备证据回填后最终 verifier 仅剩 31 条“逐用例截图复用”审计项 + 2 条已知 verifier/exporter 冲突（Level/devices 非中文、ASCII 语义 Key 误报）。 |

---

*本变更记录基于实际执行的产物与验证结果；详细困难与处理流程见 `devlog.md`。*
