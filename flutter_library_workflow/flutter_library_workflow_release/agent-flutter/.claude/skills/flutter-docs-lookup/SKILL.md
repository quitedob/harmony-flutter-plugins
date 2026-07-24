---
name: flutter-docs-lookup
description: Flutter OHOS 本地文档检索。在 flutter-docs/ 目录（423 篇 .md）中按主题、API、关键词查找鸿蒙版 Flutter 开发文档，涵盖框架、环境搭建、功能开发、PlatformView、Channel 通信、性能调优、调试、三方库适配、FAQ、ETS API 等。当需要查阅 Flutter OHOS 开发指南、适配方案、ETS API 用法或排查问题时使用此 Skill。
---

# Flutter OHOS 文档检索

本 Skill 的 `flutter-docs/` 目录包含 423 篇 Flutter OHOS 开发文档。按下方索引定位文档，直接读取即可。

## 文档分类索引

| 目录 | 文件数 | 内容概述 |
|------|--------|----------|
| `01_framework/` | 1 | Flutter 框架介绍 |
| `02_architecture/` | 1 | Flutter 架构概述 |
| `03_environment/` | 5 | OpenHarmony Flutter 环境搭建、设备运行指导 |
| `04_development/` | 31 | **核心开发文档**：FlutterPage、FlutterEntry、FlutterChannel、PlatformView、外接纹理、多引擎、FFI plugin、package/plugin 开发、混合开发、LTPO |
| `05_performance/` | 14 | 性能分析定界、帧渲染跟踪、滑动响应时延、图片加载、内存优化、PGO |
| `06_debug/` | 3 | Dart 代码调试方法 |
| `07_plugin/` | 4 | **三方库适配指导**、适配文档模板 |
| `08_FAQ/` | 16 | 环境问题、引擎编译、应用编译、代码开发、运行问题、权限申请、cppcrash 堆栈解析 |
| `09_specifications/` | 5 | Flutter OHOS 工程目录结构、插件项目结构更新 |
| `11_flutter_api_docs/` | 341 | **Flutter ETS API 完整文档**：embedding、plugin、util、view |
| `Scenario_based_cases/` | 2 | 稳定性问题场景案例 |

## 主题查找路线

### 插件开发与适配

| 查找内容 | 文档路径 |
|----------|----------|
| 开发 plugin | [flutter-docs/04_development/开发plugin.md](flutter-docs/04_development/开发plugin.md) |
| 开发 FFI plugin | [flutter-docs/04_development/开发FFI plugin.md](flutter-docs/04_development/开发FFI%20plugin.md) |
| 开发 package | [flutter-docs/04_development/开发package.md](flutter-docs/04_development/开发package.md) |
| 三方库适配完整指导 | [flutter-docs/07_plugin/ohos平台适配flutter三方库指导.md](flutter-docs/07_plugin/ohos平台适配flutter三方库指导.md) |
| 适配说明文档模板 | [flutter-docs/07_plugin/ohos平台适配flutter三方库说明文档模版.md](flutter-docs/07_plugin/ohos平台适配flutter三方库说明文档模版.md) |
| 混合开发 module | [flutter-docs/04_development/如何使用混合开发 module.md](flutter-docs/04_development/如何使用混合开发%20module.md) |
| hvigor 插件编译 | [flutter-docs/04_development/使用hvigor插件方式编译flutter项目.md](flutter-docs/04_development/使用hvigor插件方式编译flutter项目.md) |

### Channel 通信

| 查找内容 | 文档路径 |
|----------|----------|
| FlutterChannel 通信指南 | [flutter-docs/04_development/如何使用Flutter与OpenHarmony通信 FlutterChannel.md](flutter-docs/04_development/如何使用Flutter与OpenHarmony通信%20FlutterChannel.md) |
| MethodChannel API | [flutter-docs/11_flutter_api_docs/plugin/common/MethodChannel/](flutter-docs/11_flutter_api_docs/plugin/common/MethodChannel/) |
| EventChannel API | [flutter-docs/11_flutter_api_docs/plugin/common/EventChannel/](flutter-docs/11_flutter_api_docs/plugin/common/EventChannel/) |
| BinaryMessenger API | [flutter-docs/11_flutter_api_docs/plugin/common/BinaryMessenger/](flutter-docs/11_flutter_api_docs/plugin/common/BinaryMessenger/) |
| BasicMessageChannel API | [flutter-docs/11_flutter_api_docs/plugin/common/BasicMessageChannel/](flutter-docs/11_flutter_api_docs/plugin/common/BasicMessageChannel/) |
| MethodCall / MethodResult | [flutter-docs/11_flutter_api_docs/plugin/common/MethodCall/](flutter-docs/11_flutter_api_docs/plugin/common/MethodCall/) 和 [MethodResult/](flutter-docs/11_flutter_api_docs/plugin/common/MethodResult/) |

### PlatformView 与渲染

| 查找内容 | 文档路径 |
|----------|----------|
| PlatformView 使用指南 | [flutter-docs/04_development/如何使用PlatformView.md](flutter-docs/04_development/如何使用PlatformView.md) |
| 同层渲染切换 | [flutter-docs/04_development/PlatformView同层渲染方案适配切换指导.md](flutter-docs/04_development/PlatformView同层渲染方案适配切换指导.md) |
| PlatformView API | [flutter-docs/11_flutter_api_docs/plugin/platform/PlatformView/](flutter-docs/11_flutter_api_docs/plugin/platform/PlatformView/) |
| PlatformViewFactory API | [flutter-docs/11_flutter_api_docs/plugin/platform/PlatformViewFactory/](flutter-docs/11_flutter_api_docs/plugin/platform/PlatformViewFactory/) |
| PlatformViewRegistry API | [flutter-docs/11_flutter_api_docs/plugin/platform/PlatformViewRegistry/](flutter-docs/11_flutter_api_docs/plugin/platform/PlatformViewRegistry/) |
| 外接纹理适配 | [flutter-docs/04_development/Flutter OHOS外接纹理适配简介.md](flutter-docs/04_development/Flutter%20OHOS外接纹理适配简介.md) |
| TextureRegistry API | [flutter-docs/11_flutter_api_docs/view/TextureRegistry/](flutter-docs/11_flutter_api_docs/view/TextureRegistry/) |

### Engine 与生命周期

| 查找内容 | 文档路径 |
|----------|----------|
| FlutterEngine API | [flutter-docs/11_flutter_api_docs/embedding/engine/FlutterEngine/](flutter-docs/11_flutter_api_docs/embedding/engine/FlutterEngine/) |
| FlutterEngineGroup 使用 | [flutter-docs/04_development/如何使用多引擎 FlutterEngineGroup.md](flutter-docs/04_development/如何使用多引擎%20FlutterEngineGroup.md) |
| FlutterPlugin 接口 | [flutter-docs/11_flutter_api_docs/embedding/engine/plugins/FlutterPlugin/](flutter-docs/11_flutter_api_docs/embedding/engine/plugins/FlutterPlugin/) |
| FlutterAbility | [flutter-docs/11_flutter_api_docs/embedding/ohos/FlutterAbility/](flutter-docs/11_flutter_api_docs/embedding/ohos/FlutterAbility/) |
| FlutterEntry | [flutter-docs/11_flutter_api_docs/embedding/ohos/FlutterEntry/](flutter-docs/11_flutter_api_docs/embedding/ohos/FlutterEntry/) |
| FlutterPage 使用 | [flutter-docs/04_development/如何使用 FlutterPage.md](flutter-docs/04_development/如何使用%20FlutterPage.md) |
| DartExecutor | [flutter-docs/11_flutter_api_docs/embedding/engine/dart/DartExecutor/](flutter-docs/11_flutter_api_docs/embedding/engine/dart/DartExecutor/) |

### 环境与工程结构

| 查找内容 | 文档路径 |
|----------|----------|
| 环境搭建 | [flutter-docs/03_environment/openHarmony-flutter环境搭建指导.md](flutter-docs/03_environment/openHarmony-flutter环境搭建指导.md) |
| 设备运行 | [flutter-docs/03_environment/OpenHarmony设备运行指导.md](flutter-docs/03_environment/OpenHarmony设备运行指导.md) |
| 工程目录结构 | [flutter-docs/09_specifications/openHarmony-flutter化工程的目录结构.md](flutter-docs/09_specifications/openHarmony-flutter化工程的目录结构.md) |
| 插件项目结构更新 | [flutter-docs/09_specifications/更新Flutter插件项目结构.md](flutter-docs/09_specifications/更新Flutter插件项目结构.md) |

### 排错与 FAQ

| 查找内容 | 文档路径 |
|----------|----------|
| 环境问题 | [flutter-docs/08_FAQ/环境相关问题.md](flutter-docs/08_FAQ/环境相关问题.md) |
| 引擎编译问题 | [flutter-docs/08_FAQ/ohos引擎产物编译相关问题.md](flutter-docs/08_FAQ/ohos引擎产物编译相关问题.md) |
| 应用编译问题 | [flutter-docs/08_FAQ/ohos应用编译相关问题.md](flutter-docs/08_FAQ/ohos应用编译相关问题.md) |
| 代码开发问题 | [flutter-docs/08_FAQ/ohos代码开发相关问题.md](flutter-docs/08_FAQ/ohos代码开发相关问题.md) |
| 运行问题 | [flutter-docs/08_FAQ/ohos运行相关问题.md](flutter-docs/08_FAQ/ohos运行相关问题.md) |
| 权限问题 | [flutter-docs/08_FAQ/申请权限相关问题.md](flutter-docs/08_FAQ/申请权限相关问题.md) |
| cppcrash 堆栈 | [flutter-docs/08_FAQ/解析flutter相关的cppcrash堆栈.md](flutter-docs/08_FAQ/解析flutter相关的cppcrash堆栈.md) |

## ETS API 文档导航

`flutter-docs/11_flutter_api_docs/` 包含 341 篇 API 文档，按模块组织：

| 子目录 | 内容 |
|--------|------|
| `app/` | FlutterPluginRegistry |
| `component/` | FlutterComponent、XComponentStruct |
| `embedding/engine/` | FlutterEngine、DartExecutor、DartMessenger、FlutterLoader、FlutterRenderer、SystemChannels、FlutterPlugin、PluginRegistry |
| `embedding/ohos/` | FlutterAbility、FlutterEntry、FlutterPage、FlutterManager、KeyboardManager、TouchEventProcessor |
| `FlutterInjector/` | FlutterInjector |
| `plugin/common/` | MethodChannel、EventChannel、BasicMessageChannel、BinaryMessenger、MethodCall、MethodResult、JSONMethodCodec、StandardMessageCodec 等 |
| `plugin/editing/` | TextInputPlugin、ListenableEditingState |
| `plugin/platform/` | PlatformView、PlatformViewFactory、PlatformViewRegistry、PlatformViewsController |
| `util/` | ByteBuffer、Log、MessageChannelUtils、PathUtils、StringUtils、ToolUtils |
| `view/` | FlutterView、TextureRegistry、DynamicView、FlutterCallbackInformation、FlutterRunArguments |

API 文档内部按 `classes/`、`interfaces/`、`enumerations/`、`functions/`、`variables/` 子目录组织。

## 搜索策略

1. **精确主题**：查上方索引表，直接读取对应文件
2. **API 查找**：在 `flutter-docs/11_flutter_api_docs/` 下按模块子目录定位，或按类名搜索文件名
3. **关键词搜索**：在 `flutter-docs/` 下全文检索关键词（支持中英文）
4. **组合查找**：复杂问题先读开发指南（`04_development/`），再查 API 定义（`11_flutter_api_docs/`），如需排错查 FAQ（`08_FAQ/`）

## 注意事项

- 部分文档同时提供中文版和英文版（如 `04_development/`），优先读中文版
- `media/` 目录存放文档引用的图片，无需主动搜索
- 文档内容为 Flutter OHOS 适配的**官方指南**，可作为编码实现的权威参考
