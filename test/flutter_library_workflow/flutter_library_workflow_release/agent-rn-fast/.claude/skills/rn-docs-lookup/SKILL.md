---
name: rn-docs-lookup
description: React Native OHOS 本地文档检索。在 docs/ 目录中按主题、API、关键词查找鸿蒙版 React Native 开发文档，涵盖 TurboModule、Fabric 组件、Autolinking、Codegen、两端通讯、性能调优、FAQ 等。当需要查阅 RN OHOS 开发指南、适配方案、ETS 实现模式或排查问题时使用此 Skill。
---

# React Native OHOS 文档检索

本 Skill 的 `docs/` 目录包含 React Native for OpenHarmony 开发文档、示例工程和参考实现。按下方索引定位文档，直接读取即可。

## 文档分类索引

### 核心开发文档（`docs/zh-cn/`）

| 文档 | 内容概述 |
|------|----------|
| `zh-cn/README.md` | 总目录，指向各模块文档 |
| `zh-cn/框架介绍.md` | React Native 框架简介 |
| `zh-cn/架构介绍.md` | RN OHOS 架构概述 |
| `zh-cn/环境搭建.md` | 鸿蒙 RN 开发环境配置 |
| `zh-cn/功能开发.md` | 功能开发入口（链接 TurboModule、组件、通讯等） |
| `zh-cn/版本说明.md` | 版本说明汇总 |

### 三方库与模块开发

| 查找内容 | 文档路径 |
|----------|----------|
| 自定义 TurboModule | [docs/zh-cn/TurboModule.md](docs/zh-cn/TurboModule.md) |
| Fabric 自定义组件 | [docs/zh-cn/自定义组件.md](docs/zh-cn/自定义组件.md) |
| JS ↔ Native 两端通讯 | [docs/zh-cn/两端通讯.md](docs/zh-cn/两端通讯.md) |
| Autolinking 自动链接 | [docs/zh-cn/Autolinking.md](docs/zh-cn/Autolinking.md) |
| Codegen 代码生成 | [docs/zh-cn/Codegen.md](docs/zh-cn/Codegen.md) |
| RN Native 接入 | [docs/zh-cn/RN-Native接入.md](docs/zh-cn/RN-Native接入.md) |
| RN JS 打包 | [docs/zh-cn/RN-JS打包.md](docs/zh-cn/RN-JS打包.md) |
| C-API 组件混合方案 | [docs/zh-cn/C-API组件混合方案的使用.md](docs/zh-cn/C-API组件混合方案的使用.md) |
| ArkTS 与 C++ 通信 | [docs/zh-cn/ArkTS与CPP之间通信.md](docs/zh-cn/ArkTS与CPP之间通信.md) |
| API 接口说明 | [docs/zh-cn/API接口说明.md](docs/zh-cn/API接口说明.md) |

### 应用鸿蒙化实践

| 查找内容 | 文档路径 |
|----------|----------|
| RN 应用鸿蒙化完整指南 | [docs/zh-cn/应用开发实践/RN应用鸿蒙化开发指南.md](docs/zh-cn/应用开发实践/RN应用鸿蒙化开发指南.md) |
| 常见开发场景 | [docs/zh-cn/常见开发场景.md](docs/zh-cn/常见开发场景.md) |
| 场景化最佳实践 | [docs/zh-cn/场景化最佳实践.md](docs/zh-cn/场景化最佳实践.md) |
| 多屏适配指导 | [docs/zh-cn/多屏适配指导.md](docs/zh-cn/多屏适配指导.md) |
| hvigorfile 配置 | [docs/zh-cn/hvigorfile配置.md](docs/zh-cn/hvigorfile配置.md) |

### 性能与调试

| 查找内容 | 文档路径 |
|----------|----------|
| 性能调优总览 | [docs/zh-cn/性能调优.md](docs/zh-cn/性能调优.md) |
| 页面转场与滑动优化 | [docs/zh-cn/性能优化实践/页面转场与滑动场景优化.md](docs/zh-cn/性能优化实践/页面转场与滑动场景优化.md) |
| 调试调测 | [docs/zh-cn/调试调测.md](docs/zh-cn/调试调测.md) |
| 渲染三阶段 | [docs/zh-cn/渲染三阶段.md](docs/zh-cn/渲染三阶段.md) |

### FAQ

| 查找内容 | 文档路径 |
|----------|----------|
| FAQ 汇总 | [docs/zh-cn/FAQ.md](docs/zh-cn/FAQ.md) |
| 使用类 FAQ | [docs/zh-cn/faqs/使用类FAQ.md](docs/zh-cn/faqs/使用类FAQ.md) |
| 运行类 FAQ | [docs/zh-cn/faqs/运行类FAQ.md](docs/zh-cn/faqs/运行类FAQ.md) |
| 编译类 FAQ | [docs/zh-cn/faqs/编译类FAQ.md](docs/zh-cn/faqs/编译类FAQ.md) |
| 规格类 FAQ | [docs/zh-cn/faqs/规格类FAQ.md](docs/zh-cn/faqs/规格类FAQ.md) |
| 定位定界指导 | [docs/zh-cn/faqs/定位定界指导类FAQ.md](docs/zh-cn/faqs/定位定界指导类FAQ.md) |

## 示例工程索引（`docs/Samples/`）

| 示例工程 | 内容 | 关键参考文件 |
|----------|------|-------------|
| **AutolinkingSample** | Autolinking + 三方库适配完整示例 | `third-party-library-sample/harmony/library/` 下的 TurboModule 和 Fabric 组件实现 |
| **FabricComponentSample** | Fabric ArkTS 自定义组件完整示例 | `fabric-component-sample-package/` |
| **Sample** | 主示例工程（大量组件和 API 测试） | `SampleProject/` |
| **using_turboModule** | TurboModule 使用示例 | `Samples/FrameNodeSample/using_turboModule/` |
| **using_RNSurface** | RNSurface 使用示例 | `Samples/using_RNSurface/` |
| **Sandbox** | 沙箱加载 bundle 示例 | 含 `沙箱加载bundle.md` |
| **MutilBundleSample** | 多 Bundle 加载示例 | `FlightRN/`、`HotelRN/` |
| **demo_without_rnAbility** | 不使用 rnAbility 的集成方式 | `NativeProject/`、`RNProject/` |
| **NativeReactNavSwitch** | 原生与 RN 页面导航切换 | `react-native-harmony-navigation-package/` |
| **RegisterFont** | 注册自定义字体 | `RegisterFontNativeProject/` |
| **Capture_bundle** | Bundle 捕获 | `NativeProject/` |
| **RootTagSample** | RootTag 使用 | `NativeProject/` |

### 三方库适配参考实现（AutolinkingSample）

`docs/Samples/AutolinkingSample/third-party-library-sample/` 是最重要的三方库适配参考：

| 文件 | 说明 |
|------|------|
| `package.json` | harmony.autolinking + harmony.codegenConfig 配置示例 |
| `src/specs/arkts-components/SelectBox.ts` | Fabric ArkTS 组件 Spec 声明 |
| `src/specs/cpp-components/QDGestureFloatNativeComponent.ts` | Fabric C++ 组件 Spec 声明 |
| `harmony/library/src/main/ets/SelectBox.ets` | ArkTS Fabric 组件实现（Descriptor、EventEmitter、CommandReceiver） |
| `harmony/library/src/main/ets/SampleTurboModule.ets` | ArkTS TurboModule 实现（继承 EtsUITurboModule） |
| `harmony/library/src/main/ets/SampleAnyThreadTurboModule.ets` | 非 UI 线程 TurboModule 实现 |
| `harmony/library/src/main/ets/ThirdPartyLibrarySamplePackage.ets` | RNOHPackage 注册入口 |
| `harmony/library/src/main/cpp/` | C++ 组件实现 |
| `harmony/library/oh-package.json5` | 鸿蒙包配置 |
| `harmony/library/build-profile.json5` | 构建配置 |

## 搜索策略

1. **精确主题**：查上方索引表，直接读取对应文件
2. **TurboModule 开发**：先读 `zh-cn/TurboModule.md`，再看 `Samples/AutolinkingSample/third-party-library-sample/`
3. **Fabric 组件开发**：先读 `zh-cn/自定义组件.md`，再看 `Samples/FabricComponentSample/`
4. **Autolinking 配置**：读 `zh-cn/Autolinking.md`
5. **鸿蒙化整体流程**：读 `zh-cn/应用开发实践/RN应用鸿蒙化开发指南.md`
6. **关键词搜索**：在 `docs/` 下全文检索关键词（支持中英文）
7. **编译错误排查**：查 FAQ（`zh-cn/faqs/编译类FAQ.md`）

## 注意事项

- 当前仅支持 TurboModule，**不支持 NativeModule**（见 `功能开发.md`）
- 文档基于 React Native 0.72.5 版本
- `media/` 和 `figures/` 目录存放文档引用的图片，无需主动搜索
- 示例工程中的 `harmony/` 目录为鸿蒙原生工程，`ReactProject/` 或 `SampleProject/` 为 JS 工程
