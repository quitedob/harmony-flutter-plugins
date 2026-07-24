---
name: dfx-quality
description: Flutter 插件 DFX 质量门禁。覆盖：稳定性（资源泄漏、Platform.isOhos 使用风险、生命周期配对）、性能（反模式、图片内存优化）、功耗（定时器/流订阅未取消、多引擎资源释放）、UX（PlatformView viewType 一致性、aboutToDisappear 引用释放）、调试（日志规范）。
---

# Flutter DFX 质量门禁（统一入口）

## 子项索引

| 子项 | 文件 | 触发场景 |
|------|------|---------|
| 稳定性 | [stability.md](references/stability.md) | Dart + ETS 编码与审查 |
| 性能 | [performance.md](references/performance.md) | Dart 编码与审查 |
| 功耗 | [power.md](references/power.md) | Dart + ETS 编码与审查 |
| UX | [ux.md](references/ux.md) | Dart + ETS 编码与审查 |

## 检测与修复工具

| 工具 | 类型 | 扫描目标 | 用途 |
|------|------|---------|------|
| fix_dart.py | 自动修复+检测 | lib/**/*.dart | 平台检测、资源泄漏、性能反模式、日志规范 |
| fix_ets.py | 自动修复+检测 | ohos/\*/src/main/ets/**/*.ets | 生命周期、资源释放、日志规范 |
| fix_channel_consistency.py | 仅检测 | lib/**/*.dart + ohos/\*/src/main/ets/**/*.ets | Channel / PlatformView viewType 一致性 |

## 工具输出快速定位

收到工具告警后，按工具名查下表，在对应文件中搜索章节标题（如 `## 1`），读取该章节内容，无需全量加载。

> **工具识别**：根据实际运行的脚本名选择子表。
> - 运行了 `fix_dart.py` → 查「fix_dart.py 告警定位」
> - 运行了 `fix_ets.py` → 查「fix_ets.py 告警定位」
> - 运行了 `fix_channel_consistency.py` → 查「fix_channel_consistency.py 告警定位」

### fix_dart.py 告警定位

| 工具规则 | 参考文件 | 文件规则 | 章节 | 检查项 |
|---------|---------|:-------:|:----:|--------|
| 1 | stability.md | 1 | §1 | `Platform.isOhos` 在条件分支中使用 → 加 `else if (Platform.isOhos)` 分支 |
| 2 | stability.md | 2 | §2 | `AnimationController` 无 `dispose()` → dispose 中调用 dispose() |
| 3 | stability.md | 6 | §6 | `StreamController` 无 `close()` → dispose 中调用 close() |
| 4 | performance.md | 1 | §1 | `addListener` 回调中空 `setState` → 移除空 setState 或添加实际逻辑 |
| 5 | performance.md | 2 | §2 | `ListView`/`GridView` 非 builder 构造 → 改用 .builder() |
| 6 | performance.md | 3 | §3 | `Image` 未用 `ResizeImage` → 包裹 ResizeImage |
| 7 | performance.md | 4 | §4 | `ListView.builder` 缺 `addAutomaticKeepAlives` → 设置 false |
| 8 | performance.md | 5 | §5 | `deactivate` 中有 `stop()` 调用 → 移至 dispose |
| 9 | power.md | 1 | §1 | `Timer`/`StreamSubscription` 无 `cancel()` → dispose 中 cancel |
| 10 | ux.md | 1 | §1 | FlutterEntry/Page 生命周期未配对 → 补充缺失的生命周期方法 |
| 11 | ux.md | 3 | §3 | 生产代码中有 `print()` → 移除或替换为 debugPrint |

### fix_ets.py 告警定位

| 工具规则 | 参考文件 | 文件规则 | 章节 | 检查项 |
|---------|---------|:-------:|:----:|--------|
| 1 | stability.md | 3 | §3 | PlatformView 构造器有资源但 dispose 为空 → dispose 中释放资源 |
| 2 | stability.md | 4 | §4 | onAttachedToEngine 有资源但 onDetachedFromEngine 为空 → detach 中释放资源 |
| 3 | stability.md | 5 | §5 | `registerTexture` 无 `unregisterTexture` → 补充 unregister |
| 4 | stability.md | 7 | §7 | FlutterEntry 生命周期未配对 → 补充缺失方法 |
| 5 | power.md | 2 | §2 | `EngineBindings.attach` 无 `detach` → 补充 detach |
| 6 | stability.md | 8 | §8 | `console.log`/`debug`/`info` 仍在使用 → 自动移除 |

### fix_channel_consistency.py 告警定位

| 工具规则 | 参考文件 | 文件规则 | 章节 | 检查项 |
|---------|---------|:-------:|:----:|--------|
| 1 | ux.md | 2 | §2 | viewType 两端不一致 → 统一 viewType 名称 |
| 2 | ux.md | 4 | §4 | Channel 名称两端不一致 → 统一 Channel 名称 |

## Agent 核对表

在 03-coding-library 阶段步骤 8 中，由 `sub-dfx-quality` 子代理执行：

| 步骤 | 操作 | 工具/命令 |
|------|------|----------|
| 1 | 找出模块的 Dart 源码目录（lib/） | 从目录结构推断（固定为 lib/） |
| 2 | 找出模块的 ETS 源码目录（ohos/{plugin_name}/src/main/ets/） | 从目录结构推断（glob ohos/*/src/main/ets） |
| 3 | 运行 Dart 层 DFX 检测（含自动修复） | `fix_dart.py --target <dart_dir>` |
| 4 | 运行 ETS 层 DFX 检测（含自动修复 console.log） | `fix_ets.py --target <ets_dir>` |
| 5 | 运行跨层一致性检测 | `fix_channel_consistency.py --dart-target <dart_dir> --ets-target <ets_dir>` |
| 6 | 确认告警项：逐条确认是否为真实问题 | 子代理判断 |
| 7 | 修复真实问题并重新运行验证 | 手动修复 + 重新执行 |

### 确认标准

- 所有告警项均已处理（确认修复或确认为误报）
- console.log 已全部自动移除

---

## 命令行工具退出码

| 退出码 | 含义 |
|--------|------|
| 0 | 检测通过（无文件或无告警均返回 0） |
| 1 | 目标目录不存在 |
| 2 | 仍有未处理告警（仅非 `--json` 模式） |

> **`--json` 模式**：所有情况均返回 exit 0，需通过 JSON 输出中的告警字段判断结果。

---

## 检测要求（全局）

- 结合整个文件上下文分析，不孤立看待某一行代码
- 相同代码问题只报一次
- 自动跳过 `test/`、`__tests__/`、`generated/` 目录下的文件
- `example/` 下的代码不在库检测范围（由 primary-04 步骤 5.0 单独检测 example 代码）

---

## 检查项快速参考

此表仅列出工具无法覆盖、需检查项。审查代码时，按"分类 + 文件规则号"读取对应章节。先检查「跳过条件」，不满足则跳过该规则。

| 分类 | 文件规则 | 参考文件 | 章节 | 检查项 | 跳过条件 |
|------|:-------:|---------|:----:|--------|---------|
| stability.md | 2 | stability.md | §2 | dispose() 中确保所有 Controller 已释放 | 文件无 AnimationController |
| stability.md | 6 | stability.md | §6 | dispose() 中确保 StreamController 已 close | 文件无 StreamController |
| stability.md | 7 | stability.md | §7 | FlutterEntry 生命周期未配对：aboutToAppear/Disappear, onPageShow/Hide | 非 FlutterEntry 页面 |
| performance.md | 1 | performance.md | §1 | addListener 回调中避免空 setState | 文件无 addListener |
| performance.md | 5 | performance.md | §5 | deactivate 中 stop 动画 | 文件无 deactivate |
| power.md | 1 | power.md | §1 | dispose() 中 cancel Timer 和 StreamSubscription | 文件无 Timer/StreamSubscription |
| power.md | 2 | power.md | §2 | 多引擎 attach/detach 配对 | 文件无 EngineBindings |
| stability.md | 8 | stability.md | §8 | console.log/debug/info 仍在使用（已自动移除） | 文件无 console.log |

> **结果处理**：上表「检查项」列为简要描述。完整的修复指导（含代码示例）在对应参考文件的「检查清单与结果处理」表中。
