---
name: dfx-quality
description: |
  对 Flutter 插件鸿蒙适配做 DFX 质量检测，从【稳定性】【性能】【功耗】【UX】【兼容性】五大维度审查。
  C1 稳定性（Platform.isOhos构建风险、Controller/ETS资源释放配对、FlutterEntry生命周期、日志规范）、
  C2 性能（addListener空setState、列表用builder+keepAlives、大图ResizeImage、deactivate stop动画）、
  C3 功耗（Timer/StreamSubscription未cancel、EngineBindings未detach）、
  C4 UX（跨层viewType/Channel一致、Dart侧生命周期配对、TextStyle极端色）、
  C5 兼容性（高版本API缺运行时守卫检测、canIUse/syscap守护、deviceTypes与实现一致、SemVer）。
  使用检测脚本（--dry-run 模式）自动化扫描 + agent 逐项核对，只检测不修复，
  输出按 🔴/🟡/🟢 分级、含 file:line 的发现清单。
  适用于（Use when）：Flutter 插件鸿蒙适配 DFX 质量检测、稳定性检测、性能检测、功耗检测、UX 质量检测、兼容性检测
allowed-tools:
  - Read
  - Grep
  - Glob
  - Bash      # 运行检测脚本（--dry-run 模式，只读分析，不修改被评估库）
---

# 鸿蒙 DFX 质量检测

对 Flutter 插件鸿蒙适配做 DFX 质量检测，涵盖稳定性、性能、功耗、UX、兼容性五大维度。本 Skill 只检测、**只读**——绝不修改被评估库。

**Dart + ETS 双端扫描是本 Skill 的核心机制**：脚本同时扫描 `lib/**/*.dart` 和 `ohos/**/*.ets`，覆盖跨层资源释放、生命周期配对、Channel 一致性等 Flutter 特有问题。

## 何时使用本 Skill

- 评估 / 验收 Flutter 插件鸿蒙适配的 DFX 质量（稳定性、性能、功耗、UX、兼容性）

## 五大维度

| 维度 | 子维度 | 覆盖 | 适用端 | 检测方式 |
|------|------|------|:--:|------|
| **C. DFX 质量** | **C1 稳定性** | Platform.isOhos构建风险、Controller dispose配对、ETS端资源释放配对、FlutterEntry生命周期配对、日志规范 | Dart+ETS | dfx_dart.py + dfx_ets.py + agent 核对 |
| | **C2 性能** | addListener空setState、列表用builder+keepAlives、大图ResizeImage、deactivate中stop动画 | Dart | dfx_dart.py + agent 核对 |
| | **C3 功耗** | Timer/StreamSubscription未cancel、EngineBindings未detach | Dart+ETS | dfx_dart.py + dfx_ets.py + agent 核对 |
| | **C4 UX** | 跨层viewType/Channel一致、Dart侧生命周期配对、TextStyle极端色 | Dart+ETS | dfx_channel_consistency.py + dfx_dart.py + agent 核对 |
| | **C5 兼容性** | 高版本API缺运行时守卫检测、canIUse/syscap守护、deviceTypes与实现一致、SemVer | ETS | agent 核对 |

> Flutter Dart 侧性能问题不被 B1 覆盖，仍需本 Skill 检测。

## 严重级别（沿用统一标记，勿自创同义词）

- 🔴 `[blocking]` 必须修复——存在严重缺陷，必须修复
- 🟡 `[important]` 应当修复——明显问题，建议修复
- 🟢 `[nit]` 可选优化——不阻塞
- 💡 `[suggestion]` 替代方案 / 改进思路（含 Grep 粗查得到的启发式线索）

> 🔴/🟡/🟢 为标准三档（由红到绿），💡 为非阻塞注解。
> **本 Skill 不打分、不加权、不评 A–E 等级**；总体结论为定性判断。

## 自动化检测脚本

使用检测脚本（`--dry-run` 模式）对 `ohos/` 和 `lib/` 做自动化扫描，再对脚本无法覆盖的问题由 agent 逐项核对。

| 脚本 | 扫描目标 | 检测项 |
|------|---------|--------|
| `scripts/dfx_dart.py` | `lib/**/*.dart`（支持多目录`--target`） | Platform.isOhos风险、Controller dispose、addListener空setState、ListView非builder、大图未ResizeImage/cacheWidth、Timer未cancel、print残留、TextStyle极端色 |
| `scripts/dfx_ets.py` | `ohos/**/*.ets` | PlatformView dispose为空、onDetachedFromEngine为空、Texture未unregister、FlutterEntry生命周期、EngineBindings未detach、console.log |
| `scripts/dfx_channel_consistency.py` | Dart+ETS | 跨层viewType/Channel名称一致性比对 |

```bash
python scripts/dfx_dart.py --target <dart_dir> --dry-run
python scripts/dfx_ets.py --target <ets_dir> --dry-run
python scripts/dfx_channel_consistency.py --dart-target <dart_dir> --ets-target <ets_dir>
```

退出码：0=通过，1=目录不存在，2=有未处理告警。

## C1 稳定性

（Dart+ETS 双端 · 脚本 + agent 核对）

| 检查项 | 检测方式 | 修复方式 | 级别 |
|--------|---------|---------|:--:|
| Platform.isOhos构建风险 | dfx_dart.py | 改为 `defaultTargetPlatform == TargetPlatform.ohos`（需 `import 'package:flutter/foundation.dart'`） | 🟡 |
| AnimationController dispose配对 | dfx_dart.py | 在 `dispose()` 或 `deactivate()` 中调用 `controller.dispose()` | 🔴 |
| StreamController close配对 | dfx_dart.py | 在 `dispose()` 中调用 `streamController.close()` | 🔴 |
| ETS端PlatformView dispose资源释放 | dfx_ets.py | 在 `dispose()` 中释放构造器中注册的资源：`channel.setMethodCallHandler(null)`、`textureRegistry.unregisterTexture(textureId)` 等 | 🔴 |
| ETS端FlutterPlugin onDetachedFromEngine资源释放 | dfx_ets.py | 在 `onDetachedFromEngine` 中调用 `channel.setMethodCallHandler(null)` 清理 Channel handler，释放所有注册的资源 | 🔴 |
| ETS端Texture register/unregister配对 | dfx_ets.py | 补充 `this.textureRegistry.unregisterTexture(textureId)` 调用 | 🔴 |
| FlutterEntry生命周期配对（aboutToAppear/Disappear、onPageShow/Hide） | dfx_dart.py + dfx_ets.py | 补充缺失的生命周期方法：`aboutToAppear`/`aboutToDisappear`、`onPageShow`/`onPageHide` | 🟡 |
| 日志规范（Dart print→debugPrint、ETS console.log→移除） | dfx_dart.py + dfx_ets.py | Dart：`print` → `debugPrint`；ETS：移除 `console.log`/`console.debug`/`console.info` | 🟡 |

## C2 性能

（Dart 端 · 脚本 + agent 核对）

| 检查项 | 检测方式 | 修复方式 | 级别 |
|--------|---------|---------|:--:|
| addListener空setState反模式 | dfx_dart.py | 将实际逻辑移入回调，或移除 `setState` 改为响应式更新（如 `ValueNotifier` + `ValueListenableBuilder`） | 🟡 |
| ListView/GridView未用builder构造 | dfx_dart.py | 列表项 > 10 时改用 `ListView.builder()`/`GridView.builder()` | 🟡 |
| 大图未用ResizeImage或cacheWidth | dfx_dart.py | 使用 `ResizeImage` 或 `cacheWidth`/`cacheHeight` 限制解码分辨率 | 🟡 |
| ListView.builder缺addAutomaticKeepAlives:false | dfx_dart.py | 设置 `addAutomaticKeepAlives: false` 减少后台页面内存占用 | 🟢 |
| deactivate中未stop动画 | dfx_dart.py | 在 `deactivate()` 中调用 `controller.stop()` 停止动画 | 🟡 |

## C3 功耗

（Dart+ETS 双端 · 脚本 + agent 核对）

| 检查项 | 检测方式 | 修复方式 | 级别 |
|--------|---------|---------|:--:|
| Timer/StreamSubscription未cancel | dfx_dart.py | 在 `dispose()` 中调用 `timer.cancel()` 和 `subscription.cancel()` | 🔴 |
| EngineBindings.attach()未detach() | dfx_ets.py | 在 `aboutToDisappear` 或 `onDestroy` 中调用 `engineBindings.detach()` 以释放引擎资源 | 🔴 |

## C4 UX

（Dart+ETS 双端 · 脚本 + agent 核对）

| 检查项 | 检测方式 | 修复方式 | 级别 |
|--------|---------|---------|:--:|
| 跨层viewType一致（Dart OhosView vs ETS registerViewFactory） | dfx_channel_consistency.py | 确保两端 viewType 字符串完全一致（大小写敏感）：Dart `OhosView(viewType: 'xxx')` 与 ETS `binding.registerViewFactory('xxx', ...)` | 🔴 |
| 跨层Channel名称一致（Dart MethodChannel vs ETS MethodChannel） | dfx_channel_consistency.py | 统一两端 Channel 名称（大小写敏感），确保 Channel 类型一致（MethodChannel ↔ MethodChannel） | 🔴 |
| Dart侧生命周期配对（aboutToAppear/Disappear） | dfx_dart.py | 确保 `aboutToDisappear` 中释放 Dart 侧 Controller/Stream 引用，`onPageHide` 中释放页面相关资源 | 🟡 |
| TextStyle极端色（Colors.black/white） | dfx_dart.py | 替换为 `$r()` 资源引用或 colorMode 感知色值，避免暗色模式下 `Colors.black`/`Colors.white` 对比度不足 | 🟢 |

## C5 兼容性

（ETS 端 · agent 核对）

| 检查项 | 检测方式 | 修复方式 | 级别 |
|--------|---------|---------|:--:|
| 高版本 API 缺运行时守卫（无 canIUse/版本比较守护的扩展模块 API 调用） | agent 核对（Grep ETS 中 `@ohos.` 找出扩展模块 API 调用，对照 SDK 文档确认 `@since` 版本；对 `@since` 高于库代码中使用的最低 API Level 的 API，检查是否有 `canIUse()`/版本比较运行时守卫；若无守卫则报 🟡） | 为高版本 API 补充 `canIUse()`/版本比较运行时守卫 + 降级分支 | 🟡 |
| canIUse/syscap 守护（受限 API 有运行时探测与降级路径） | agent 核对（Grep `@ohos.` 找出扩展模块 API 调用，检查是否被 `canIUse()`/`deviceInfo` 版本比较包裹；Read `module.json5` 中 syscap 声明与实际使用是否匹配） | 为扩展模块 API 调用补充 `canIUse()`/`deviceInfo` 版本比较前置判断 + 降级分支；补充 syscap 声明与实际使用匹配 | 🟡 |
| deviceTypes 与实现一致（声明支持的设备形态与实际能力相符） | agent 核对（Read `module.json5` 提取 deviceTypes：缺失 → 🔴；仅 `["default"]` → 建议明确具体设备类型；与代码中设备特定 API 守护是否匹配） | 补充缺失的 deviceTypes 声明；将 `["default"]` 替换为具体设备类型（如 `["phone", "tablet"]`）；确保声明与代码适配能力一致 | 🟡 |
| version 遵循 SemVer（破坏性变更经 @deprecated 过渡） | agent 核对（Read `pubspec.yaml` + `oh-package.json5` 检查 version 字段是否符合 SemVer 规范、依赖版本约束是否使用范围语法；Read 导出入口文件检查 API 签名稳定性，是否有 `@deprecated` 渐进废弃机制） | version 字段修正为 SemVer 规范；依赖版本约束改用范围语法（`^x.y.z`）；导出 API 变更使用 `@deprecated` 渐进废弃机制 | 🟡 |
