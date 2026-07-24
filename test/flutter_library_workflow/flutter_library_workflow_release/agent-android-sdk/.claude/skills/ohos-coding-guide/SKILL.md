---
name: ohos-coding-guide
description: 鸿蒙 ETS 编码统一指导 Skill。涉及 Want / startAbility 页面跳转、蓝牙、文件处理、音视频播放、音视频录制、位置权限、动画、ArkTS API 易错点、await 异步调用竞态、Canvas 圆角矩形+三角箭头（SharpDrawable 风格）路径计算、@Prop/@State/@Watch/@Link 响应式数据流、命令式 API 响应式迁移、Builder 组件接口设计、Canvas 自绘/坐标/手势/动画、交互控件 onChange 绑定、CustomDialog/Host 弹窗、ForEach key 生成、RelativeContainer 布局、HitTestBehavior Stack 层叠触摸等 UI 编码规则等场景时，从本 Skill 进入并按需加载对应补充文档。
---

# 鸿蒙 ETS 编码指导（统一入口）

本 Skill 是 HarmonyOS ETS 编码指导入口。根据当前任务涉及的能力、组件和系统 API，加载对应的详细实现指导。

## 使用方式

1. 从当前需求、源码和目标实现中识别能力信号。
2. 按下方分发表加载对应的基础指导；实现跨越多种能力形态时，再加载相关辅助文件。
3. 按已加载指导完成工程配置、编码实现和编译问题修复。

## ArkTS / Kit 导入通用规则

业务代码中使用 HarmonyOS Kit 模块时，优先在文件顶部做静态导入，例如 `import { dataSharePredicates } from '@kit.ArkData';`。不要在 MethodChannel、回调、循环或业务方法内部用 `await import('@kit.Xxx')` 动态导入。

## 位置权限特别规则

涉及 `geoLocationManager`、定位、位置监听、经纬度、Location Kit 时，权限实现必须区分模糊定位和精确定位：`ohos.permission.APPROXIMATELY_LOCATION` 是定位 API 的基础可用权限，`ohos.permission.LOCATION` 是精确定位增强权限。同时申请两者时，用户只授权模糊位置也应允许单次定位和位置监听继续执行。权限状态查询、`requestPermissionsFromUser` 的 `authResults` 处理、EventChannel 启动前校验都不能只看 `LOCATION` 或固定数组下标，应按 `APPROXIMATELY_LOCATION || LOCATION` 任一授权判断。

## 蓝牙特别规则

涉及经典蓝牙、BLE、SPP、RFCOMM、蓝牙打印机、配对设备列表、GATT 连接时，必须额外读取 `bluetooth-integration.md`。蓝牙插件必须进行**运行时权限申请**：仅声明 `ohos.permission.ACCESS_BLUETOOTH` 或仅做权限检查都不够，必须在插件库内部基于真实 `UIAbilityContext` 执行 `requestPermissionsFromUser(...)`，并区分经典蓝牙、BLE、profile 连接、SPP 四类实现路径。

## 录音/麦克风特别规则

涉及 `AVRecorder`、`AudioCapturer`、`MediaRecorder`、麦克风、录音、音量采集、`getMaxAmplitude` 时，必须额外读取 `audio-recording-integration.md`。录音能力 **禁止**使用 `Math.random()` 等模拟数据替代真实麦克风输入；必须在 `module.json5` 声明 `ohos.permission.MICROPHONE` 并运行时申请；麦克风受系统全局开关管控，须先调用 `abilityAccessCtrl.requestGlobalSwitch()` 检查开关状态。

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

如果插件涉及以下任一场景，必须额外读取 `want-navigation.md`，不能只靠零散旧笔记或自行类推：

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
| AVRecorder、AudioCapturer、录音、麦克风、音量采集、getMaxAmplitude | `audio-recording-integration.md` 录音专项 | 禁止模拟数据、权限声明+运行时申请+全局开关缺一不可 |
| AVPlayer、音频播放、视频播放、预加载 | 第 2 章：音频 — AVPlayer 状态机 | prepare 期间不能调 play/seek、onError 回环 |
| Toast、轻提示、showToast、弹窗提示 | 第 3 章：UI 提示 | 系统 Toast vs CustomDialog 选型、SDK 版本边界 |
| 异步 API、Promise、callback | 第 4 章：异步 API | callback vs Promise 行为差异 |
| MethodChannel 无参方法、生命周期回调 | 第 5 章：参数安全 | call.args 可能为 null |
| 状态栏、导航栏、system bar、fullscreen、avoid area、window、windowStage | 第 11 章：Window / WindowStage 生命周期 | `mainWindow` 不能只在 attach 时初始化一次，业务调用时要懒获取 |
| `url_launcher`、`launchUrl`、`LaunchMode.platformDefault`、WebView、`harmony_browser_page`、外部浏览器、`default`/`auto`/`system` 模式 | 第 9 章：平台敏感默认模式 | 禁止依赖 OHOS 隐式默认映射，必须显式选择外部应用/应用内页面/系统面板等模式 |
| 传感器 | 6. 传感器 | SensorResponse 必须属性访问、后台禁止调用传感器 |
| Share Kit、系统分享、ACTION_SEND、分享面板、ShareCompat | 第 12 章：Share Kit | UTD 类型必须用 `'general.text'` 非 `'general.plain-text'`、SharedRecord 禁止 `as` 断言、HAR 禁止 import @kit.ArkData |
| AVTranscoder、视频转码、视频压缩、AVMetadataExtractor、AVFileDescriptor、fdSrc | 第 13 章：MediaKit — AVFileDescriptor 与 AVTranscoder | fdSrc 必须含 offset/length、视频尺寸必须偶数且在合法范围内 |

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

### UI 编码规则

按编码场景选择对应子文件。所有 UI 组件编码前先读 `ui-coding-reactive-dataflow.md`。

| 文件 | 内容 | 加载场景 |
|------|------|---------|
| `ui-coding-reactive-dataflow.md` | @Prop/@Watch/@State 回写、@Watch 递归陷阱、回调闭环 | 所有 UI 组件 |
| `ui-coding-component-api.md` | 命令式 API 响应式迁移、Builder 承载（含 @Builder 参数非响应性规则）、回调属性、setter 迁移 | SDK/HAR 组件接口 |
| `ui-coding-canvas.md` | 坐标、像素、手势、动画、尖角路径计算 | Canvas 自绘 |
| `ui-coding-control-binding.md` | onChange 回写 @State、各控件绑定速查 | Demo、示例页和交互配置页面 |
| `ui-coding-custom-dialog.md` | @CustomDialog 调用规则、@Builder 传参 | 对话框 |
| `ui-coding-foreach.md` | ForEach key 生成规则、刷新计数器 | 列表渲染 |
| `ui-coding-relative-container.md` | alignRules 同方向互斥 | RelativeContainer 布局 |
| `ui-coding-stack-hit-test.md` | HitTestMode、Stack 层叠、手势选择、滚动隔离 | 层叠 UI |

**加载规则**：
- SDK/HAR UI 组件：加载 reactive-dataflow + component-api。
- Demo、示例页和交互配置页面：加载 reactive-dataflow + control-binding。
- Canvas、弹窗、列表、相对布局和层叠交互：加载对应专项文件。

涉及以下任一场景时必须加载对应文件：

- 编写或修改包含 `@Component` 的 SDK/HAR 文件 → reactive-dataflow + component-api
- 编写或修改包含 `@Component` 的 Demo/示例页 → reactive-dataflow + control-binding
- 迁移 Android `View`/`Widget`/自定义 View 到 ArkUI → reactive-dataflow + component-api
- 使用 `@Prop`/`@Link`/`@Watch`/`@State` 装饰器 → reactive-dataflow
- `@Prop` 持有 Object / Controller 对象，或 UI 控制想用 controller → reactive-dataflow（§6.1、§11）+ component-api（§3）
- `@Prop` + function / callback / listener / 回调属性 → reactive-dataflow（§9 @Prop 禁止 function 类型）
- Demo 交互控件 onChange 不生效 / HAR 不响应 Demo 交互 → control-binding
- HAR 外部可配置属性用 @State private 偷存 → component-api（§2）+ control-binding（§3）
- `@CustomDialog` / `CustomDialogController` → custom-dialog
- `ForEach` / `LazyForEach` 列表渲染 → foreach
- `RelativeContainer` + `alignRules` → relative-container
- `drawing.Canvas` / `CanvasRenderingContext2D` / `PixelMap` 自绘组件 → canvas
- `.rotate()` 旋转动画 → canvas（§4.3）
- 自绘 Canvas 组件使用 `PanGesture` 或 `onTouch` 处理拖拽 → canvas（§4.4）
- `animateTo` / `animateToImmediately` 驱动 `@State` 变量做 Canvas 动画 → canvas（§2 + §4.4）
- setInterval 驱动 Canvas 动画 / 粒子系统 / Canvas 残留帧不消失 → **canvas（§4.11）**
- Canvas 自绘组件坐标偏移 / HAR 位置不准 / onScroll 计算偏移 → **canvas（§4.10）**
- Stack 中实现遮罩/浮层/overlay/抽屉 → **编码前先读 stack-hit-test**
- 父容器拖拽 + 内部有可点击子组件 → **编码前先读 stack-hit-test**
- `clipShape` / `clip(true)` / `borderRadius` / 容器裁剪 / 圆角容器 → arkui-gotchas + component-api（§6）
- `initialized` / 条件渲染开关 / 条件渲染不刷新 / onAreaChange 设置后不重渲染 → arkui-gotchas（§条件渲染开关必须是 @State）

### 动画专项（加载 `animation-guidelines.md`）

如果涉及以下任一场景，必须额外读取 `animation-guidelines.md`：

- Android XML Animation、frame animation、Animator、Interpolator、ObjectAnimator、PropertyValuesHolder、keyframe
- ArkUI `animateTo`、`.animation()`、`keyframeAnimateTo`、`transition`、`TransitionEffect`、`createAnimator`、`@AnimatableExtend`
- 进度、图表、启动页、Splash、Logo、列表项、拖拽、滑动、显隐、平移、缩放、透明度、旋转、模糊、阴影、颜色渐变等动效
- Demo 中有动画类型选择、动画开关、动画时长/曲线参数，或用户反馈某动画入口无效

核心要求：动画必须由响应式状态驱动并真实作用到 ArkUI 可动画属性；外部动画参数必须通过 `@Prop` / `@Watch` 等声明式链路进入组件；百分比/相对位移必须换算为 ArkUI 实际视觉单位；首帧和动态变更都要同步派生绘制状态。

### ArkUI 响应式开发速查（加载 `arkui-state-reference.md`）

`arkui-state-reference.md` 是从 HarmonyOS 官方文档提炼的响应式开发核心知识速查手册，覆盖：

| 章节 | 内容 | 适用场景 |
|------|------|---------|
| 一、V1 状态装饰器速查 | @State/@Prop/@Link/@Watch/@Observed/@ObjectLink/@Provide/@Consume/$$ 语法 | 响应式数据流设计 |
| 二、应用级状态管理速查 | AppStorage/LocalStorage/PersistentStorage/Environment/@Env | 全局状态、跨页面共享 |
| 三、数据对象状态与MVVM模式 | @Track、管理数据对象状态、MVVM 架构 | 嵌套对象、精准更新 |
| 四、组件扩展装饰器速查 | @Builder/@BuilderParam/@LocalBuilder/@Styles/@Extend/@AnimatableExtend/wrapBuilder/mutableBuilder/stateStyles | UI 复用、样式扩展 |
| 五、渲染控制速查 | ForEach/LazyForEach/Repeat/if_else + LazyForEach 迁移 Repeat 指南 | 列表渲染、条件渲染 |
| 六、交互组件回调签名速查 | Toggle/Radio/Checkbox/Slider/Rating/Select/DatePicker/TimePicker/TextPicker/TextInput | Demo 交互控件 |
| 七、手势系统速查 | 绑定方法/单一手势/组合手势/冲突处理 API | 触摸交互、手势冲突 |
| 八、常见坑与最佳实践 | 状态不刷新 5 步定位法、高频坑 Top 10、装饰器选择优先级 | Bug 定位、最佳实践 |

**加载时机**：
- 涉及 UI 组件实现时：优先加载本文件对应章节，再视需要搜索 harmonyos-docs-lookup
- **状态不刷新 / 交互控件回调签名不确定 / 装饰器规则模糊时**：必读
- **需要快速查阅 API 签名时**：优先读本文件，节省搜索时间

**按章节加载**：
- 只需特定章节时，用 `offset` 和 `limit` 参数分段读取（每章约 150-300 行）

### 按需加载方式

注意：以下文件按场景需求加载。

```bash
read_file('.claude/skills/ohos-coding-guide/ohos-api-pitfalls.md')     # API 陷阱
read_file('.claude/skills/ohos-coding-guide/arkui-gotchas.md')          # ArkUI 框架陷阱（animateTo 不暴露中间帧、Canvas 角度单位等）
read_file('.claude/skills/ohos-coding-guide/want-navigation.md')       # Want / startAbility 跳转
read_file('.claude/skills/ohos-coding-guide/bluetooth-integration.md') # 蓝牙专项
read_file('.claude/skills/ohos-coding-guide/media-playback-integration.md') # 音视频播放适配
read_file('.claude/skills/ohos-coding-guide/audio-recording-integration.md') # 录音/麦克风适配
read_file('.claude/skills/ohos-coding-guide/file-handling.md')         # 文件处理专项
read_file('.claude/skills/ohos-coding-guide/async-programming.md')     # 异步编程模式
read_file('.claude/skills/ohos-coding-guide/ui-coding.md')                       # UI 编码规则索引
read_file('.claude/skills/ohos-coding-guide/ui-coding-reactive-dataflow.md')    # UI：响应式数据流
read_file('.claude/skills/ohos-coding-guide/ui-coding-component-api.md')        # UI：组件接口设计
read_file('.claude/skills/ohos-coding-guide/ui-coding-control-binding.md')      # UI：交互控件绑定
read_file('.claude/skills/ohos-coding-guide/ui-coding-custom-dialog.md')        # UI：弹窗
read_file('.claude/skills/ohos-coding-guide/ui-coding-foreach.md')              # UI：列表渲染
read_file('.claude/skills/ohos-coding-guide/ui-coding-relative-container.md')   # UI：布局
read_file('.claude/skills/ohos-coding-guide/ui-coding-stack-hit-test.md')       # UI：触摸测试
read_file('.claude/skills/ohos-coding-guide/ui-coding-canvas.md')               # UI：Canvas 自绘
read_file('.claude/skills/ohos-coding-guide/arkui-state-reference.md')          # ArkUI 响应式开发速查手册（推荐优先）
read_file('.claude/skills/ohos-coding-guide/animation-guidelines.md')           # ArkUI 动画专项
```
