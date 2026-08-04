# flutter-fast 流水线差距分析 — 全量扫描报告

> 日期：2026-07-27 | 分支：main
> 扫描范围：`docs/flutter_zoom_drawer_ohos` / `docs/media_scanner_ohos` / `docs/changelog` / `docs/flutter_library_workflow/skills/flutter-fast` / `repos-flutter-fast` / `flutter_ohos_test`
> 方法：6 个 subagent 并行全量读取，按 flutter-fast 15 个 Skill 逐一核对

---

## 总览：flutter-fast 流水线 7 阶段覆盖

| 阶段 | Skill | media_scanner | flutter_zoom_drawer |
|------|-------|:---:|:---:|
| 00 需求解析 | `flutter-adapted-library` → `ohos-coding-guide` | ✅ | ✅ |
| 01 测试分析 | `01-test-analysis` (IBO + 22 章报告) | ✅ | ✅ |
| 02 测试用例 | `02-test-case-gen` (MD + JSON) | ✅ MD+JSON | ⚠️ 仅 XLSX，缺 MD/JSON |
| 03 用例评审 | `03-case-review` (4 维度 ≥80) | ✅ 93.4 | ❌ 未执行 |
| 04 编码实现 | `arkts-rules` + `ohos-coding-guide` | ✅ | N/A (pure_dart) |
| — DFX 质量 | `dfx-quality` (C1~C5) | ❌ 未执行 | ❌ 未执行 |
| — 白盒质量 | `hmos-library-quality-assessment` | ❌ 未执行 | N/A (非 ArkTS) |
| — 兼容性 | `hmos-api-change-assitant` | ❌ 未执行 | ❌ 未执行 |
| — Hypium | `flu-plugins-hypium-testcase-gen` | ⚠️ 骨架 | N/A |

---

## 一、media_scanner — 待补齐项

### 1.1 DFX 质量扫描 (dfx-quality) 🔴

**Skill 路径**：`docs/flutter_library_workflow/skills/flutter-fast/dfx-quality/SKILL.md`

自动化脚本位于 `dfx-quality/scripts/`，需对以下目录执行：

| 脚本 | 目标 | 检查项数 | 命令 |
|------|------|:---:|------|
| `dfx_dart.py` | `media_scanner/lib/**/*.dart` | 12 类规则 | `python dfx_dart.py <path>` |
| `dfx_ets.py` | `media_scanner/ohos/**/*.ets` | 6 类规则 | `python dfx_ets.py <path>` |
| `dfx_channel_consistency.py` | Dart↔ETS 交叉 | Channel 名 / viewType | `python dfx_channel_consistency.py <path>` |

#### C1 稳定性检查清单（Dart + ETS）

| # | 检查项 | 目标文件 | 风险 |
|---|--------|---------|------|
| C1-1 | `Platform.isOhos` 构建风险 — 是否在非 OHOS 构建路径上访问 OHOS 专属 API | `lib/media_scanner.dart:36-39` | 🟡 若 `isOhos` 在条件分支外引用 OHOS 类型，非 OHOS 构建会失败 |
| C1-2 | ETS 资源释放 — `onDetachedFromEngine` 是否清理了 MethodChannel handler + null 赋空 | `ohos/.../MediaScannerPlugin.ets:41-49` | 🔴 若有 resource 未释放 → 引擎重载时泄漏 |
| C1-3 | FlutterEntry 生命周期配对 — EntryAbility onCreate/onDestroy 是否一一对应 | `flutter_ohos_test/ohos/entry/.../EntryAbility.ets` | 🟡 生命周期不配对 → 内存泄漏 |
| C1-4 | 日志规范 — ETS 侧是否使用 `hilog` 而非 `console.error` | `ohos/.../MediaScannerPlugin.ets` | 🟢 nit |

#### C2 性能检查清单（Dart）

| # | 检查项 | 目标文件 | 风险 |
|---|--------|---------|------|
| C2-1 | `addListener` 回调中是否直接调用了 `setState`（空 setState 反模式） | `lib/` 全部 Dart | 🟡 可能导致不必要的 rebuild |
| C2-2 | 列表是否使用了 `ListView.builder` + `addAutomaticKeepAlives` | `lib/` 全部 Dart | 🟢 nit |
| C2-3 | 大图是否使用了 `ResizeImage` 限制解码尺寸 | N/A (无图片加载) | 🟢 |
| C2-4 | `deactivate` 是否停掉了动画 | N/A | 🟢 |

#### C3 功耗检查清单

| # | 检查项 | 目标文件 | 风险 |
|---|--------|---------|------|
| C3-1 | `Timer` / `StreamSubscription` 是否在 dispose 中 cancel | `lib/` 全部 Dart | 🔴 未 cancel → 后台持续消耗 CPU |
| C3-2 | `EngineBindings` 是否在 detach 时解除 | `ohos/` 全部 ETS | 🔴 引擎未 detach → 功耗异常 |

#### C4 UX 检查清单

| # | 检查项 | 目标文件 | 风险 |
|---|--------|---------|------|
| C4-1 | Dart↔ETS MethodChannel 名称是否一致 | `lib/media_scanner.dart:15` vs `ohos/.../MediaScannerPlugin.ets` | 🔴 不一致 → 运行时 MethodChannel 断裂 |
| C4-2 | Dart 侧生命周期配对 | `lib/media_scanner.dart` | 🟡 |
| C4-3 | TextStyle 极端颜色（纯黑/纯白/透明） | `lib/` 全部 Dart | 🟢 nit |

#### C5 兼容性检查清单

| # | 检查项 | 目标文件 | 风险 |
|---|--------|---------|------|
| C5-1 | `MediaAssetChangeRequest.applyChanges()` 需要 API ≥ 24 — 是否有运行时守卫？ | `ohos/.../MediaScannerPlugin.ets:registerAsset()` | 🔴 若未守卫，低版本设备崩溃 |
| C5-2 | `deviceTypes` 声明与实现是否一致 | `ohos/src/main/module.json5` → `["phone", "tablet"]` | 🟡 实际测试了 PC，但声明不包含 PC |
| C5-3 | SemVer — v2.2.1 新增 OHOS 平台，是否应 bump 次版本号 | `pubspec.yaml` | 🟢 nit |

### 1.2 白盒质量评估 (hmos-library-quality-assessment) 🔴

**Skill 路径**：`docs/flutter_library_workflow/skills/flutter-fast/hmos-library-quality-assessment/SKILL.md`

**硬性前置条件**：DevEco Studio CodeLinter 必须可用（否则中止，不产出报告）

**评估维度**：

| 维度 | 检查项 | 目标 |
|------|--------|------|
| **A. 架构 (A1)** | SOLID 原则、耦合/内聚、反模式（God Class / Spaghetti Code）、分层依赖方向 | `MediaScannerPlugin.ets` (187行) |
| **B. 代码质量 (B1)** | ArkTS 规范合规、圈复杂度、错误处理完备性、逻辑性能（循环/递归/同步阻塞）、加密安全（若涉敏感数据） | 同上 |

**定性结论**（不打分、不评等级）：
- ✅ 推荐 — 无 🔴，少量非关键 🟡
- ⚠️ 谨慎使用 — 无 🔴 但多个 🟡
- ❌ 不推荐 — 任何 🔴

### 1.3 真机图库验证

当前 `media_scanner/devlog.md` 记录的真机测试在 **HarmonyOS PC** 上完成，但 PC 文件管理器 ≠ 手机图库 App。

| # | 检查项 | 状态 |
|---|--------|:--:|
| 1 | 手机图库中扫描后图片是否立即可见（无需重启） | ⚠️ 待验证 |
| 2 | 图库缩略图是否正确生成 | ⚠️ 待验证 |
| 3 | 视频（MP4）在图库中是否有封面缩略图 | ⚠️ 待验证 |
| 4 | MOV 文件能否被系统图库识别 | ⚠️ 待验证 |
| 5 | `createAsset` 写入的图片在图库详情中显示正确的 EXIF/尺寸 | ⚠️ 待验证 |

### 1.4 扩展格式测试

`getPhotoType()` 白名单包含 8 种图片格式，但仅测试了 PNG/JPEG/WEBP：

| 格式 | 文件签名 | 测试状态 |
|------|---------|:--:|
| GIF | `47 49 46 38` | ❌ 未生成/测试 |
| BMP | `42 4D` | ❌ 未生成/测试 |
| HEIC | `ftypheic` | ❌ 未生成/测试 |
| HEIF | `ftypmif1` | ❌ 未生成/测试 |

### 1.5 兼容性矩阵

| 维度 | 已测 | 待测 |
|------|:--:|------|
| 设备型号 | 1 (MJE0224725019266) | ≥2 款不同型号 |
| 设备类型 | phone | tablet, 2in1, PC |
| API 版本 | API 24 (6.1.1) | API 18 (5.1.0), API 20 (5.1.1) |
| `module.json5` deviceTypes 声明 | `["phone", "tablet"]` | 实际声明 ≠ 测试范围 |

### 1.6 文档同步

| 文件 | 当前 | 期望 |
|------|------|------|
| `README.md` | Android 示例 | 新增 OHOS 使用说明 |
| `CHANGELOG.md` | v2.2.1 Android fix | 新增 OHOS 适配条目 |
| `example/ohos/` | ❌ 不存在 | 创建 OHOS example 骨架 |

### 1.7 Hypium 自动化测试

`flutter_ohos_test/ohos/entry/src/ohosTest/ets/test/Ability.test.ets` 仅有骨架 `assertContain('abc', 'b')`。

需使用 `flu-plugins-hypium-testcase-gen` Skill 生成真实测试用例，覆盖：
- F-01 图片扫描（PNG/JPEG/WEBP）
- F-02 视频扫描（MP4/MOV）
- F-03 参数校验（空路径/无扩展名）
- F-04 权限流程（A/B/C 三路径）

---

## 二、flutter_zoom_drawer — 待补齐项

### 2.1 HAP 构建与真机部署 🔴

| # | 事项 | 状态 |
|---|------|:--:|
| 1 | `flutter build hap` **Batch Recursion 错误** — workaround 为直接调用 `hvigorw.js` | ⚠️ 需确认 workaround 是否稳定 |
| 2 | 签名 HAP 生产 | ❌ 未产出（media_scanner 有 97MB signed HAP） |
| 3 | 真机安装与运行（2in1 / phone） | ❌ 仅在 PC 模拟环境测试 |

### 2.2 DFX 质量扫描 (dfx-quality) 🟡

纯 Dart 项目适用 C2（性能）和 C4（UX）检查。

**`dfx_dart.py`** 对 `flutter_zoom_drawer_ohos/lib/` 执行：

| # | 检查项 | 目标文件 | 风险 |
|---|--------|---------|------|
| C2-1 | `addListener` + `setState` — `_animationController.addListener(() => setState(() {}))` | `lib/src/flutter_zoom_drawer.dart` | 🟡 每次动画帧触发全局 rebuild |
| C2-2 | `deactivate` 是否 `stop()` 了 `_animationController` | 同上 | 🔴 未 stop → 后台持续 tick → 功耗 |
| C2-3 | ListView 是否用了 builder 模式 | N/A (无列表) | 🟢 |
| C4-3 | TextStyle 极端色值 | 各 style widget | 🟢 nit |

> **注意**：`flutter_zoom_drawer` 核心类 `ZoomDrawerState` 使用 `SingleTickerProviderStateMixin`，其 `dispose` 已调用 `_animationController.dispose()`，但是否在 `deactivate` 中有额外的 stop 逻辑需扫描确认。

### 2.3 测试用例评审 (03-case-review) 🔴

**Skill 路径**：`docs/flutter_library_workflow/skills/flutter-fast/03-case-review/SKILL.md`

当前状态：
- ✅ `01-test-points.json` — 24 测试点（4 模块）
- ✅ `05-test-cases.xlsx` — 24 条用例
- ❌ `02-test-cases.md` — **缺失**
- ❌ `04-test-cases.json` — **缺失**
- ❌ `03-case-review-report.md` — **未执行**

**阻塞原因**：`03-case-review` 的硬性门前置条件是三向一致性校验（test-points JSON ↔ test-cases JSON ↔ test-cases MD），缺少 MD 和 JSON 用例文件导致评审无法执行。必须先运行 `02-test-case-gen` 生成缺失的两种格式。

### 2.4 真机视觉验证

| # | 验证项 | 风险 | 状态 |
|---|--------|------|:--:|
| 1 | Style 3/4 的 `Matrix4.rotateY` + perspective 在 OHOS Vulkan 渲染下的视觉正确性 | 🟡 Impeller+Vulkan 的 Matrix4 精度可能与 Android Skia 不同 | ❌ |
| 2 | RTL 语言环境下 mirror 变换是否正确 | 🟡 `_slideDirection = isRtl ? -1 : 1` 逻辑 | ❌ |
| 3 | 2in1 设备（无物理返回键）三种关闭方式的可用性 | ✅ 已在 PC 测试 | ✅ |
| 4 | 拖拽手势灵敏度 — `minFlingVelocity=350` 在 OHOS 触摸驱动下是否合适 | 🟡 不同驱动采样率可能影响 fling 触发 | ❌ |
| 5 | `defaultTargetPlatform == TargetPlatform.ohos` 运行时确认 | 🔴 1-line fix 的核心前提 — 需确认 Flutter OHOS SDK 确实返回此值 | ❌ |

### 2.5 1-Line Fix 运行时验证 🔴

```
lib/src/flutter_zoom_drawer.dart:827
-        defaultTargetPlatform == TargetPlatform.android &&
+        (defaultTargetPlatform == TargetPlatform.android ||
+         defaultTargetPlatform == TargetPlatform.ohos) &&
```

**未验证项**：
1. Flutter OHOS SDK (`platform.dart:85`) 的 `defaultTargetPlatform` 在真机上是否真的返回 `TargetPlatform.ohos` — 而非回退到 `TargetPlatform.android` 或 `TargetPlatform.fuchsia`
2. `PopScope` 在 OHOS 2in1 设备上的返回手势行为 — 是否与 `mainScreenTapClose` 冲突
3. 若 OHOS 同时注册了系统返回手势，`_canPop()` 中的条件是否会阻止 Android 侧滑返回而在 OHOS 上仍允许（行为一致性）

### 2.6 兼容性矩阵

| 维度 | 已测 | 待测 |
|------|:--:|------|
| 设备类型 | PC (模拟) | phone, 2in1 (真机), tablet |
| API 版本 | API 24 (6.1.1) | API 18 (5.1.0) |
| 屏幕方向 | 横屏 | 竖屏、旋转切换 |
| 语言方向 | LTR | RTL (Arabic/Hebrew) |

### 2.7 自动化测试文件路径不一致

| 位置 | 文件 | 内容 |
|------|------|------|
| `repos-flutter-fast/flutter_zoom_drawer/test/` | `flutter_zoom_drawer_test.dart` | **空 `main()`** — 无任何测试 |
| `flutter_ohos_test/test/` | `flutter_zoom_drawer_test.dart` | **29 条 widget/unit 测试** — 实际测试在此 |

实际测试文件在 `flutter_ohos_test` 而非 `repos-flutter-fast/flutter_zoom_drawer` 源码仓库中。若要将此插件作为独立适配产物发布，应将测试移回源码仓库，或在 changelog 中明确标注测试位置。

---

## 三、跨 Subjects 公共缺口

### 3.1 用例评审 (03-case-review) — 两个 subject 均未完成

flutter_zoom_drawer 完全未执行；media_scanner 已完成（93.4 分）。

### 3.2 DFX 质量扫描 — 两个 subject 均未执行

三个自动化脚本 (`dfx_dart.py`, `dfx_ets.py`, `dfx_channel_consistency.py`) 已就绪但从未运行。**这是基线质量门禁，应在每次提交前执行**。

### 3.3 兼容性矩阵 — 两个 subject 均未建立

均仅在单一设备/环境测试。缺少多设备型号、多 API 版本、多设备类型的系统化兼容性测试。

### 3.4 文档同步 — 两个 subject 的 README/CHANGELOG 均未更新

### 3.5 Flutter Zoom Drawer 专属 — 独立仓库测试缺失

`flutter_zoom_drawer` 在 `repos-flutter-fast/` 中的测试文件为空，实际测试全在 `flutter_ohos_test/` 中。

---

## 四、推荐执行顺序

### media_scanner → 达到"生产就绪"

| 优先级 | 阶段 | 预估工作量 |
|:--:|------|:--:|
| 🔴 P0 | DFX 质量扫描 (`dfx-quality`) — 3 个脚本 | 0.5 天 |
| 🔴 P0 | 真机手机图库验证 (5 项) | 0.5 天 |
| 🟡 P1 | 白盒质量评估 (`hmos-library-quality-assessment`) | 0.5 天 |
| 🟡 P1 | 扩展格式测试 (GIF/BMP/HEIC/HEIF) | 0.5 天 |
| 🟡 P1 | Hypium 自动化测试填充 | 1 天 |
| 🟢 P2 | 兼容性矩阵（云测） | 1 天 |
| 🟢 P2 | 文档同步 (README/CHANGELOG/example) | 0.5 天 |

### flutter_zoom_drawer → 达到"已验证"

| 优先级 | 阶段 | 预估工作量 |
|:--:|------|:--:|
| 🔴 P0 | 补齐 `02-test-cases.md` + `04-test-cases.json`（运行 `02-test-case-gen`） | 0.5 天 |
| 🔴 P0 | 用例评审 `03-case-review`（依赖上一步） | 0.5 天 |
| 🔴 P0 | HAP 构建 + 真机部署（2in1 / phone） | 0.5 天 |
| 🟡 P1 | DFX 质量扫描（`dfx_dart.py` 对 Dart 源） | 0.25 天 |
| 🟡 P1 | 真机视觉验证 (5 项) | 0.5 天 |
| 🟡 P1 | 1-Line Fix 运行时 `TargetPlatform.ohos` 确认 | 0.25 天 |
| 🟢 P2 | 兼容性矩阵 | 0.5 天 |
| 🟢 P2 | 测试文件迁移到源码仓库（或文档化位置） | 0.25 天 |

---

## 五、修订记录

| 日期 | 版本 | 说明 |
|------|------|------|
| 2026-07-27 | v1.0 | 初始版本 — 6-agent 并行全量扫描，对照 flutter-fast 15 个 Skill 逐一核查 |

> 🤖 AI 辅助生成，对照实际代码 & 6 个 Explore Agent 全量读取结果交叉验证
