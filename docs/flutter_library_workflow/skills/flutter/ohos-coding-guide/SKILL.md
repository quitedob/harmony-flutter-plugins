---
name: ohos-coding-guide
description: 鸿蒙 ETS 编码统一指导 Skill。根据 `plugin_type_skill` 分发到 MethodChannel、EventChannel、FFI、联合插件、PlatformView、Texture、纯 Dart、Monorepo 等类型指导；涉及 Want / startAbility 页面跳转、蓝牙、文件处理、音视频播放、位置权限、ArkTS API 易错点、await 异步调用竞态等场景时，也从本 Skill 进入并按需加载对应补充文档。
---

# 鸿蒙 ETS 编码指导（统一入口）

本 Skill 是 `03-coding-library` 阶段的核心编码指导，根据 `02-planning.json` 中的 `plugin_type_skill` 值加载对应类型的详细实现指导。

## 使用方式

1. 从 `02-planning.json` 中读取 `plugin_type_skill` 值
2. 按下方分发表，用 `read_file` 加载对应的**基础类型** .md 文件；若主方案跨越多种能力形态，再补充加载相关**辅助类型**文件
3. 严格按照已加载文件中的三部分执行：**第一部分：工程配置** → **第二部分：编码实现** → **第三部分：常见编译错误与修复**

## 类型分发表

| `plugin_type_skill` | 加载文件 | 说明 |
|---------------------|----------|------|
| `type-method-channel` | `.claude/skills/ohos-coding-guide/method-channel.md` | MethodChannel 主通道插件（可扩展辅助页面/承载层） |
| `type-event-channel` | `.claude/skills/ohos-coding-guide/event-channel.md` | EventChannel 流式数据插件 |
| `type-ffi` | `.claude/skills/ohos-coding-guide/ffi.md` | dart:ffi C/C++ 插件 |
| `type-federated` | `.claude/skills/ohos-coding-guide/federated.md` | 联合插件架构 |
| `type-platform-view` | `.claude/skills/ohos-coding-guide/platform-view.md` | PlatformView 原生视图插件 |
| `type-texture` | `.claude/skills/ohos-coding-guide/texture.md` | 外接纹理插件（视频/相机） |
| `type-pure-dart` | `.claude/skills/ohos-coding-guide/pure-dart.md` | 纯 Dart 包 |
| `type-monorepo` | `.claude/skills/ohos-coding-guide/monorepo.md` | 多包仓库 |

## 组合能力补充加载

`plugin_type_skill` 只决定基础指导入口，不是完整实现边界。若出现下列信号，必须额外读取对应辅助类型文件，而不是只靠基础类型文件自行推断：

- `PlatformView`、`viewType`、`registerViewFactory`、原生视图嵌入、ArkUI 承载组件：补读 `platform-view.md`
- `Texture`、`TextureRegistry`、`surfaceId`、外接纹理、渲染表面、预览层：补读 `texture.md`
- `EventChannel`、监听器、持续回调、状态流、进度流：补读 `event-channel.md`
- `ffi`、`so`、`napi`、`CMake`、C/C++ 复用：补读 `ffi.md`

若主方案由多种能力共同组成，应把基础类型文件作为脚手架，再组合辅助类型文件完成实现；不要把某个辅助实现层误判为公开 API 必然改变。

## ArkTS / Kit 导入通用规则

业务代码中使用 HarmonyOS Kit 模块时，优先在文件顶部做静态导入，例如 `import { dataSharePredicates } from '@kit.ArkData';`。不要在 MethodChannel、回调、循环或业务方法内部用 `await import('@kit.Xxx')` 动态导入。

## 运行时权限通用规则

当 `module.json5` 中声明的权限属于 `user_grant` 类型时，插件**必须**在代码中实现完整的运行时权限申请流程：实现 `AbilityAware` → 获取 `UIAbilityContext` → 调用 `requestPermissionsFromUser()` → 处理用户拒绝。仅调用 `verifyAccessToken()` 检查权限**不够**——它只做检查不做申请。详细模式见 `method-channel.md` 权限声明节。

常见 `user_grant` 权限：`CAMERA`、`MICROPHONE`、`READ_PASTEBOARD`（API 12+）、`ACCESS_BLUETOOTH`、`APPROXIMATELY_LOCATION`、`LOCATION`、`READ_IMAGEVIDEO`、`WRITE_IMAGEVIDEO`、`READ_AUDIO`、`WRITE_AUDIO`。

## 位置权限特别规则

涉及 `geoLocationManager`、定位、位置监听、经纬度、Location Kit 时，权限实现必须区分模糊定位和精确定位：`ohos.permission.APPROXIMATELY_LOCATION` 是定位 API 的基础可用权限，`ohos.permission.LOCATION` 是精确定位增强权限。同时申请两者时，用户只授权模糊位置也应允许单次定位和位置监听继续执行。权限状态查询、`requestPermissionsFromUser` 的 `authResults` 处理、EventChannel 启动前校验都不能只看 `LOCATION` 或固定数组下标，应按 `APPROXIMATELY_LOCATION || LOCATION` 任一授权判断。

## 蓝牙特别规则

涉及经典蓝牙、BLE、SPP、RFCOMM、蓝牙打印机、配对设备列表、GATT 连接时，必须额外读取 `bluetooth-integration.md`。蓝牙插件必须进行**运行时权限申请**：仅声明 `ohos.permission.ACCESS_BLUETOOTH` 或仅做权限检查都不够，必须在插件库内部基于真实 `UIAbilityContext` 执行 `requestPermissionsFromUser(...)`，并区分经典蓝牙、BLE、profile 连接、SPP 四类实现路径。

## 文件处理特别规则

如果插件涉及以下任一场景，必须额外读取 `file-handling.md`：

- `FilePicker`、`PhotoViewPicker`、`DocumentViewPicker`、`AudioViewPicker`
- `file://media/...`、`file://docs/...`、`fileUri`、`fileIo`
- `context.filesDir`、`cacheDir`、`tempDir`、`bundleCodeDir`
- 选择图片/视频/音频/文档、保存文件、下载文件、上传文件
- `XFile.path`、`PickedFile.path`、`File(path)`、`Image.file`
- 分享文件、打开文件、预览文件、保存到图库/下载目录

具体返回值语义、URI 与路径转换、Picker 处理、沙箱落盘、媒体 URI 访问链路、保存目标区分、文件大小策略、文件打开/预览规则等，统一以 `file-handling.md` 为准。

## 场景化陷阱参考（必须按需加载）

除基础类型文件外，如果插件涉及以下场景，**必须**额外加载对应指导文件：

### Want 页面跳转场景（加载 `want-navigation.md`）

如果插件涉及以下任一场景，必须额外读取 `want-navigation.md`，不能只靠 `method-channel.md` 或自行类推：

- `Want`、`startAbility`
- 系统设置页、设置子页
- 应用市场、评论页、更新页
- 浏览器、外部链接、邮件、短信
- 分享面板、Share Kit、系统分享、三方页面拉起

规则：

- Android `Intent` 不能直接照搬为 OHOS `Want`
- 优先使用专用系统 API；只有官方明确给出固定 `Want` 时才写死 `Want`
- 具体跳转参数、`uri`、`action`、`bundleName`、`abilityName` 以 `want-navigation.md` 和官方文档为准
- 文件打开、文件预览不走本节，按 `file-handling.md` 的 Preview Kit 规则处理

### API 陷阱（加载 `ohos-api-pitfalls.md`）

| 场景信号 | 加载章节 | 说明 |
|----------|---------|------|
| SoundPool、短音频、提示音、beep | 第 1 章：音频 — SoundPool | 默认音量为 0 陷阱、callback 形式优先 |
| AVPlayer、音频播放、视频播放、预加载 | 第 2 章：音频 — AVPlayer 状态机 | prepare 期间不能调 play/seek、onError 回环 |
| Toast、轻提示、showToast、弹窗提示 | 第 3 章：UI 提示 | 系统 Toast vs CustomDialog 选型、SDK 版本边界 |
| 异步 API、Promise、callback | 第 4 章：异步 API | callback vs Promise 行为差异 |
| MethodChannel 无参方法、生命周期回调 | 第 5 章：参数安全 | call.args 可能为 null |
| 状态栏、导航栏、system bar、fullscreen、avoid area、window、windowStage | 第 11 章：Window / WindowStage 生命周期 | `mainWindow` 不能只在 attach 时初始化一次，业务调用时要懒获取 |
| `url_launcher`、`launchUrl`、`LaunchMode.platformDefault`、WebView、`harmony_browser_page`、外部浏览器、`default`/`auto`/`system` 模式 | 第 9 章：平台敏感默认模式 | 禁止依赖 OHOS 隐式默认映射，必须显式选择外部应用/应用内页面/系统面板等模式 |
| 传感器 | 6. 传感器 | SensorResponse 必须属性访问、后台禁止调用传感器 |
| Share Kit、系统分享、ACTION_SEND、分享面板、ShareCompat | 第 12 章：Share Kit | UTD 类型必须用 `'general.text'` 非 `'general.plain-text'`、SharedRecord 禁止 `as` 断言、HAR 禁止 import @kit.ArkData |
| AVTranscoder、视频转码、视频压缩、AVMetadataExtractor、AVFileDescriptor、fdSrc | 第 13 章：MediaKit — AVFileDescriptor 与 AVTranscoder | fdSrc 必须含 offset/length、视频尺寸必须偶数且在合法范围内 |
| PixelMap、图片编码、图片解码、Clipboard 图片、截图、Image.memory、ImagePacker、createImageSource、readPixelsToBuffer | 第 15 章：图片处理 — PixelMap 与 ImagePacker | readPixelsToBuffer 是裸像素非编码图片、createImageSource 需要 ArrayBuffer |

加载方式：

### 异步编程模式（加载 `async-programming.md`）

| 场景信号 | 说明 |
|----------|------|
| async、await、异步调用、状态切换、热切换 | 同步调用 async 不 await 导致竞态条件、状态不一致、功能失效 |

### 音视频播放场景（加载 `media-playback-integration.md`）

如果插件涉及以下任一场景，必须额外读取 `media-playback-integration.md`：

- `AVPlayer`、`AudioRenderer`
- 音频播放、视频播放、播放器控制器、播放进度、倍速、循环
- 视频 Widget、播放视图、字幕、全屏、画中画
- `PlatformView + XComponent`、`Texture + surfaceId`
- `surfaceId`、`surfaceCreated/surfaceDestroyed`、视频渲染承载重建
- 视频黑屏、Texture 视频不显示、`external_texture skip`、视频帧丢失
- `PiPWindow`、画中画、小窗播放、`PiPTemplateType`、`XComponentController`
- `OhosView`、视频 PlatformView、Plugin ↔ PlatformView 通信、静态 Registry

### 按需加载方式

注意：以下文件按场景需求加载。

```bash
read_file('.claude/skills/ohos-coding-guide/ohos-api-pitfalls.md')     # API 陷阱
read_file('.claude/skills/ohos-coding-guide/want-navigation.md')       # Want / startAbility 跳转
read_file('.claude/skills/ohos-coding-guide/bluetooth-integration.md') # 蓝牙专项
read_file('.claude/skills/ohos-coding-guide/media-playback-integration.md') # 音视频播放适配
read_file('.claude/skills/ohos-coding-guide/file-handling.md')         # 文件处理专项
read_file('.claude/skills/ohos-coding-guide/async-programming.md')     # 异步编程模式
```

## 每个类型文件的统一结构

所有类型指导文件均包含三部分：

- **第一部分：工程配置** — 对 `flutter create` 生成的脚手架进行自定义配置（依赖、权限等）
- **第二部分：编码实现** — 代码结构、import 语句、核心模式、类型映射
- **第三部分：常见编译错误与修复** — 该类型特有的编译问题及解决方案
