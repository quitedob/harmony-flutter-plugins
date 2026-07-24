# 编码校验（Flutter → HarmonyOS）

## 必须读取

- `.ohos-adaptation/01-analysis-prd.md`
- `.ohos-adaptation/02-coding-library-report.md`
- `lib/`、`example/lib/`、`ohos/`、`example/ohos/` 下的代码，选择性读取你认为需要的内容，

## 校验重点

### 1. 公开 API 与 Dart 通路

- `lib/` 暴露的公开 API 是否能在 OHOS 分支走到 MethodChannel、EventChannel、FFI 或对应平台实现。
- 是否仍有 `UnsupportedError`、错误平台判断、channel name 不一致、事件名不一致、OHOS 注册缺失等问题。
- Dart `invokeMethod<T>` / EventChannel / FFI 的参数、返回值、错误和空值语义是否与 OHOS 实现一致。

### 2. OHOS 实现完整性

- `ohos/` 中是否真实实现 `01-analysis-prd.md` 的核心能力，而不是固定返回值、空函数、测试数据、只打印日志或假成功。
- 配置项、默认值、回调、监听器、异常分支是否真正生效。
- 涉及文件、媒体、权限、Want、网络、设备能力、Native/FFI 时，必须查官方文档确认 HarmonyOS 语义和可用能力。
- 平台确实不支持的能力，要在代码和报告中明确说明，不能静默跳过或返回成功值。

### 3. Example 可运行与可观察

- `example/lib/` 是否有入口覆盖核心 API，并能在界面展示真实返回值、状态变化、回调或副作用。
- Example 的主要操作必须调用插件真实实现，不能在 Example 中重复实现或造固定结果。
- `example/ohos` 的依赖、权限、Ability、metadata、资源和入口配置是否满足演示流程。

### 4. 权限、资源和依赖

- `module.json5` 是否声明了实际需要的权限；需要用户授权的能力是否有动态申请。
- `pubspec.yaml`、`example/pubspec.yaml`、`oh-package.json5`、构建配置是否与当前实现一致。
- 已替换为 OHOS 适配依赖的库，确认 Example 没有继续安装原平台不可用依赖。
- 若存在 Android / iOS / C++ 原生三方库依赖，确认已按 `native-library-substitution` 的结论落地为 OHPM 包、系统 API、自实现或明确不支持；不能残留 Android/iOS 原生库调用，也不能在未验签时猜测 OHPM 包 API。

## 重新构建

本阶段必须重新执行构建，不允许跳过。构建失败必须根据日志修复真实问题后重试，不能把失败留给后续阶段。

## 输出报告

写入 `.ohos-adaptation/03-validation-report.md`，使用中文，字数尽量少，简要说明：

1. 检查了哪些内容。
2. 发现并修复的问题，写明修改位置和复查结果。
3. 公开 API、OHOS 实现、Example、权限/配置的完整性结论。
4. 重新构建命令和结果。
5. 仍无法完全确认或无法对齐的项目，写明原因和影响范围。
