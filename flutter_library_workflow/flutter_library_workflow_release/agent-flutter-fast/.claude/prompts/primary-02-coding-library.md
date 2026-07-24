# 鸿蒙库适配与 Example 生成（Flutter → HarmonyOS）

基于 `.ohos-adaptation/01-analysis.json` 和 `.ohos-adaptation/01-analysis-prd.md` 直接完成 Flutter 插件 HarmonyOS 适配。

## 目标产物

- 创建或修改 `ohos/`、Dart platform 注册、ArkTS/ETS、oh-package 等必要文件。
- 不同类型插件创建 `ohos/` 工程前，先读取 `ohos-coding-guide` 并按插件类型套用对应工程结构和编码规则。
- `ohos/` 工程优先用 `flutter create` 生成脚手架，再在脚手架上修改；不要手写整套 HAR/HAP 配置。
- 保持原 Flutter API 不变，接入本地适配后的插件。
- 生成或修复 Example 工程，目录为 `example/ohos`。
- 增加最小可运行页面或调用示例，覆盖核心 API。

## 工程创建与依赖

- 根据插件类型创建工程：
  - `plugin_method_channel`、`plugin_event_channel`、`plugin_platform_view`、`plugin_texture`、`plugin_mixed`：在插件根目录执行 `flutter create -t plugin --platforms ohos .`
  - `ffi`：在插件根目录执行 `flutter create -t plugin_ffi --platforms ohos .`
  - `dart`：通常不需要创建插件 `ohos/`，但需要创建或修复 `example/ohos`
  - 多包仓库按实际包结构逐包处理
- `ohos/` 已存在时不要重建，只修缺失或错误的配置。
- `pubspec.yaml` 必须补齐 `platforms.ohos`、`package`、`pluginClass` 等平台声明；不要破坏原有 Android/iOS/Dart API。
- 对 `pubspec.yaml` 和 `example/pubspec.yaml` 中的 Flutter 三方依赖，先用 `flutter-adapted-library` 查询；已适配 OHOS 的依赖优先改为对应 git 版本。
- 对 `build.gradle`、`*.podspec`、`CMakeLists.txt` 中的 Android / iOS / C++ 原生三方库依赖，用 `native-library-substitution` 查询鸿蒙替代方案。
- 如果 `flutter pub get` 因 Dart/Flutter SDK 版本冲突失败，优先选择满足当前 SDK 的最小兼容版本，不要直接跳最新版本。
- 修改依赖后分别执行插件根目录 `flutter pub get` 和 `example/` 目录 `flutter pub get`。

## FFI / C++ 原生库处理

当 `.ohos-adaptation/01-analysis.json` 的 `plugin_type` 为 `ffi`，或源码中出现 `dart:ffi`、`DynamicLibrary.open`、`.c`、`.cpp`、`Cargo.toml`、`.so`、`CMakeLists.txt` 时，必须按 `ohos-coding-guide` Skill 下的 `ffi.md` 处理。

编码阶段要先根据仓库实际物料临时确定 `ffi_strategy`，再只加载对应的 `ohos-coding-guide` Skill 下的 `ffi-recipes/*.md` 配方：

- 有可编译的 C/C++ 源码：加载 `ffi-recipes/compile-from-source.md`
- 有 Rust `Cargo.toml`：加载 `ffi-recipes/rust-cross-compile.md`
- 已有可用的 OHOS/arm64-v8a `.so` 或可从上游 release 获取：`prebuilt_bundle`，加载 `ffi-recipes/prebuilt-bundle.md`
- 仓库已有下载或构建脚本获取 native 库：`fetch_at_build`，加载 `ffi-recipes/fetch-at-build.md`
- 只有 Dart FFI 声明但没有源码、预编译库或可获取来源：记录为暂不支持，并在报告中说明原因

FFI 实现必须同时检查：

- `flutter create -t plugin_ffi --platforms ohos .` 是否已生成正确脚手架。
- `ohos/build-profile.json5` 是否配置 `externalNativeOptions` 指向 `ohos/src/main/cpp/CMakeLists.txt`。
- `CMakeLists.txt` 是否能编译或安装目标 `.so`，并把产物放入 `ohos/libs/arm64-v8a/` 或构建产物可打包的位置。
- Dart 层 `DynamicLibrary.open('libxxx.so')` 的文件名与实际打包文件一致，带版本号的 `.so.1`、`.so.2` 要重命名为 `libxxx.so`。
- 如果 Dart 层使用 `@Native`，加载 `ffi-recipes/binding-translate.md`，补充 OHOS 下的 `DynamicLibrary.lookup` 分支。
- 构建后检查 HAP/HAR 产物中是否包含目标 `.so`；编译通过但 `.so` 未打包，不能算完成。

## 编译与验证

写完代码后，必须编译，不允许跳过。

## 输出报告

只写入 `.ohos-adaptation/02-coding-library-report.md`，使用中文，简要说明：

- 库适配实现点、改动文件、执行命令、构建结果和未完成事项。
- Example 改动、使用方式、执行命令和验证结果。

