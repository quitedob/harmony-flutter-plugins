---
name: ohos-coding-guide
description: Flutter 插件 HarmonyOS 适配编码指导 Skill。根据 `.ohos-adaptation/01-analysis.json` 中的插件类型，加载 MethodChannel、EventChannel、FFI、PlatformView、Texture、纯 Dart、联合插件、Monorepo 等对应指导；涉及 HarmonyOS Kit API、权限、媒体、传感器、窗口、图片处理等易错场景时，按需加载 API 陷阱说明。
---

# 鸿蒙 ETS 编码指导

## 使用方式

1. 先读取 `.ohos-adaptation/01-analysis.json`，关注 `plugin_type`、平台能力、依赖、权限、 native 代码和 Example 覆盖范围。
2. 按下方分发表加载一个基础类型文件；如果是混合类型，再按源码实际能力补充加载相关类型文件。
3. 如果仓库本身是联合插件或多包仓库，再补充加载 `federated.md` 或 `monorepo.md`。
4. 严格按照已加载文件中的三部分执行：**第一部分：工程配置** → **第二部分：编码实现** → **第三部分：常见编译错误与修复**。

## 类型分发表

| `plugin_type` | 加载文件 | 说明 |
|---------------|----------|------|
| `plugin_method_channel` | `.claude/skills/ohos-coding-guide/method-channel.md` | MethodChannel 主通道插件 |
| `plugin_event_channel` | `.claude/skills/ohos-coding-guide/event-channel.md` | EventChannel 流式数据插件 |
| `ffi` | `.claude/skills/ohos-coding-guide/ffi.md` | dart:ffi C/C++ 插件 |
| `plugin_platform_view` | `.claude/skills/ohos-coding-guide/platform-view.md` | PlatformView 原生视图插件 |
| `plugin_texture` | `.claude/skills/ohos-coding-guide/texture.md` | 外接纹理插件（视频/相机） |
| `dart` | `.claude/skills/ohos-coding-guide/pure-dart.md` | 纯 Dart 包 |
| `plugin_mixed` | 先读 `method-channel.md`，再按能力补读相关文件 | 多种能力混合的插件 |
| `unknown` | 先回源码判断类型，再加载对应文件 | 类型暂不明确的插件 |

## 组合能力补充加载

`plugin_type` 只决定基础指导入口，不代表完整实现边界。若出现下列信号，必须额外读取对应文件，不要只靠基础类型文件自行推断：

- `PlatformView`、`viewType`、`registerViewFactory`、原生视图嵌入、ArkUI 承载组件：补读 `platform-view.md`
- `Texture`、`TextureRegistry`、`surfaceId`、外接纹理、渲染表面、预览层：补读 `texture.md`
- `EventChannel`、监听器、持续回调、状态流、进度流：补读 `event-channel.md`
- `ffi`、`so`、`napi`、`CMake`、C/C++ 复用：补读 `ffi.md`

如果主方案由多种能力共同组成，应把基础类型文件作为脚手架，再组合辅助类型文件完成实现；不要因为存在某个辅助实现层，就改变原 Flutter 公开 API。

## 仓库形态补充加载

- 联合插件、federated plugin、`platform_interface`、多个平台实现包：补读 `federated.md`
- 多包仓库、workspace、melos、多个 package 共同发布：补读 `monorepo.md`

## ArkTS / Kit 导入通用规则

业务代码中使用 HarmonyOS Kit 模块时，优先在文件顶部做静态导入，例如 `import { dataSharePredicates } from '@kit.ArkData';`。不要在 MethodChannel、回调、循环或业务方法内部用 `await import('@kit.Xxx')` 动态导入。

## 运行时权限通用规则

当 `module.json5` 中声明的权限属于 `user_grant` 类型时，插件必须在代码中实现完整的运行时权限申请流程：实现 `AbilityAware` → 获取 `UIAbilityContext` → 调用 `requestPermissionsFromUser()` → 处理用户拒绝。仅调用 `verifyAccessToken()` 检查权限不够，它只做检查不做申请。

常见 `user_grant` 权限：`CAMERA`、`MICROPHONE`、`READ_PASTEBOARD`（API 12+）、`ACCESS_BLUETOOTH`、`APPROXIMATELY_LOCATION`、`LOCATION`、`READ_IMAGEVIDEO`、`WRITE_IMAGEVIDEO`、`READ_AUDIO`、`WRITE_AUDIO`。

## 位置权限特别规则

涉及 `geoLocationManager`、定位、位置监听、经纬度、Location Kit 时，权限实现必须区分模糊定位和精确定位：`ohos.permission.APPROXIMATELY_LOCATION` 是定位 API 的基础可用权限，`ohos.permission.LOCATION` 是精确定位增强权限。同时申请两者时，用户只授权模糊位置也应允许单次定位和位置监听继续执行。权限状态查询、`requestPermissionsFromUser` 的 `authResults` 处理、EventChannel 启动前校验都不能只看 `LOCATION` 或固定数组下标，应按 `APPROXIMATELY_LOCATION || LOCATION` 任一授权判断。

## API 陷阱（按需加载 `ohos-api-pitfalls.md`）

如果插件涉及以下场景，必须额外读取 `ohos-api-pitfalls.md` 的对应章节：

| 场景信号 | 加载章节 | 说明 |
|----------|----------|------|
| SoundPool、短音频、提示音、beep | 第 1 章：音频 — SoundPool | 默认音量为 0、callback 形式优先 |
| AVPlayer、音频播放、视频播放、预加载 | 第 2 章：音频 — AVPlayer 状态机 | prepare 期间不能调 play/seek、onError 回环 |
| Toast、轻提示、showToast、弹窗提示 | 第 3 章：UI 提示 | 系统 Toast 与 CustomDialog 选型、SDK 版本边界 |
| 异步 API、Promise、callback | 第 4 章：异步 API | callback 与 Promise 行为差异 |
| MethodChannel 无参方法、生命周期回调 | 第 5 章：参数安全 | call.args 可能为 null |
| 传感器 | 第 6 章：传感器 | SensorResponse 必须属性访问、后台禁止调用传感器 |
| `url_launcher`、`launchUrl`、WebView、外部浏览器、默认打开模式 | 第 9 章：平台敏感默认模式 | 禁止依赖 OHOS 隐式默认映射，必须显式选择打开方式 |
| 状态栏、导航栏、fullscreen、avoid area、window、windowStage | 第 11 章：Window / WindowStage 生命周期 | `mainWindow` 不能只在 attach 时初始化一次，业务调用时要懒获取 |
| Share Kit、系统分享、ACTION_SEND、分享面板、ShareCompat | 第 12 章：Share Kit | UTD 类型、SharedRecord 类型、HAR import 限制 |
| AVTranscoder、视频转码、视频压缩、AVMetadataExtractor、AVFileDescriptor、fdSrc | 第 13 章：MediaKit — AVFileDescriptor 与 AVTranscoder | fdSrc 必须含 offset/length，视频尺寸必须偶数且在合法范围内 |
| PixelMap、图片编码、图片解码、Clipboard 图片、截图、Image.memory、ImagePacker、createImageSource、readPixelsToBuffer | 第 15 章：图片处理 — PixelMap 与 ImagePacker | readPixelsToBuffer 是裸像素，createImageSource 需要 ArrayBuffer |

## 按需加载文件

以下文件在当前 Skill 目录中存在，按场景加载：

```bash
read_file('.claude/skills/ohos-coding-guide/method-channel.md')
read_file('.claude/skills/ohos-coding-guide/event-channel.md')
read_file('.claude/skills/ohos-coding-guide/ffi.md')
read_file('.claude/skills/ohos-coding-guide/federated.md')
read_file('.claude/skills/ohos-coding-guide/platform-view.md')
read_file('.claude/skills/ohos-coding-guide/texture.md')
read_file('.claude/skills/ohos-coding-guide/pure-dart.md')
read_file('.claude/skills/ohos-coding-guide/monorepo.md')
read_file('.claude/skills/ohos-coding-guide/ohos-api-pitfalls.md')
```

## 每个类型文件的统一结构

所有类型指导文件均包含三部分：

- **第一部分：工程配置** — 对 `flutter create` 生成的脚手架进行自定义配置（依赖、权限等）
- **第二部分：编码实现** — 代码结构、import 语句、核心模式、类型映射
- **第三部分：常见编译错误与修复** — 该类型特有的编译问题及解决方案
