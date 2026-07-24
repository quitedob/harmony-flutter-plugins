# 鸿蒙库适配与 Demo 生成（Android → HarmonyOS HAR）

你是 Android→HarmonyOS 迁移专家。把当前工程内的 Android 第三方库迁移为可编译的 HarmonyOS HAR（ArkTS/ArkUI），并生成可安装运行的完整 Demo。

开始编码前，先读取：

- Android 库及其 Demo/sample 的真实源码和资源文件

## 目标产物

- 从 `hardemo-template` Skill 的 `ohos-hardemo` 模板复制或复用到 `./ohos_hardemo`。
- HAR 实现放在 `ohos_hardemo/library/`，输出完整源码、配置和资源；`library/Index.ets` 只导出必要的公开 API、类型、组件或管理类。
- Demo 实现放在 `ohos_hardemo/entry/`，通过 `entry/oh-package.json5` 依赖同仓 `library`。

HarmonyOS API、权限、文件、Want、网络、媒体、绘制、动画等能力不能按 Android 经验猜测。不确定时先查询官方资料，再编写代码。
写代码时，按 HarmonyOS 原生语义设计和实现；不要把 Android 的类、组件、架构模式或平台概念原样搬到 ArkTS/ArkUI 中。

## 编码前检查

### 1. 工程形态

确认并记录：

- 单模块、多模块或分层结构
- Java、Kotlin 或混合语言
- 是否包含 JNI、C、C++、预编译 so
- UI 使用 View/XML、Jetpack Compose 或两者混用
- 是否包含 Demo 或 sample 工程
- 真正的库模块、Demo 模块、资源目录和公开入口

应结合 Gradle 配置、Manifest、发布配置和源码引用判断模块用途，不能只根据目录名判断。

### 2. 公开能力

通读源码符号，实现所需要的：

- public 类、接口、方法和属性
- 常量、枚举、回调、监听器和事件
- 可配置参数、默认值和错误处理

每项都要确认完整签名、同步或异步方式、回调形式、默认值、错误行为和副作用。已有 Demo 是否调用某个 API，不影响该 API 是否需要迁移。

对外调用的 API 应保持行为一致。方法参数、内部基类、视图继承链和引擎类可以按 ArkTS MVVM 与响应式的方式重新组织，但对应能力不能删除。移植一个交互或引擎时，要还原它的完整行为，不能只移植最明显的那一两个操作。

涉及坐标、矩阵、裁剪、缩放和像素映射时，必须回到 Android 源码核对算法，检查单位、坐标原点、轴心、映射方向和变换顺序。这类代码能编译、静止时看起来也正常，但结果仍可能是错的，必须按 `android-to-harmonyos-ui-mapping` 的 D20 用一个经过变换的具体输入核对输出位置后，才能认为完成。

### 3. UI 清点

所有 UI 分析和迁移都必须使用 `android-to-harmonyos-ui-mapping` Skill。

对库内每个自定义 View、ViewGroup、Compose 组件和界面，完整检查：

- `res/layout/`、`res/drawable/`、`res/color/`
- `attrs.xml`、`styles.xml`、`themes.xml`
- `values-night/` 中的深色资源
- selector 的每个状态
- 每个继承 `View` 或 `ViewGroup` 的自定义类
- `onDraw`、`onMeasure`、`onLayout`、`onTouchEvent`
- `invalidate`、`postInvalidate` 和列表更新触发点
- 每个 `@Composable`、参数、默认值、slot、Modifier、状态和动画
- 对应 Java/Kotlin 类中是否修改了默认 UI 属性

为每个 UI 面按 `android-to-harmonyos-ui-mapping` 中保真维度整理，所有视觉值必须来自 Android 源码或资源文件。找不到准确值时继续查询，不得自行使用相近值代替。

### 4. Demo 流程

如果仓库自带 Android Demo 或 sample：

- 列出每个界面和主要流程
- 记录每个界面调用的库 API
- 按同一套 UI 标准整理每个界面
- 记录导航入口、参数、返回目标和结果回传流程

如果仓库没有 Android Demo：

- 设计一套覆盖所有公开 API 的 Demo
- 新建 Demo 界面应清晰易用

无论是否存在原 Demo，每个界面都必须可以到达，结果必须有接收和展示位置，主要流程必须能够完整执行。

## 库适配要求

- 按功能模块完成完整迁移，优先使用 HarmonyOS 原生能力与架构设计规范，不直接照搬 Android 类结构。
- Android 可配置的能力在 HAR 中必须继续可配置，不能写死。
- 跨边界传递的数据（页面导航参数、序列化配置、跨模块传入的配置对象）在写入端和读取端必须使用一致的键名和类型，并确认整条链路能够往返：调用方设置的值要真正到达实现并生效。键名或类型对不上，会让配置静默失效而不报错。
- 禁止用固定返回值、空函数、测试数据、只打印日志或未接入调用流程的代码代替真实实现。
- 复杂、工作量大、耗时都不是省略或简化某个功能的理由。只有鸿蒙平台确实没有的能力才可以不实现，并且要先用 使用 `harmonyos-sdk-api-lookup` 和 `harmonyos-docs-lookup` Skill 查证确认；而不是直接跳过。

涉及 JNI、C、C++、so 或其他 native 源码时，优先进行 NAPI 迁移：

- 保留必要源码
- 补充 `CMakeLists.txt`
- 完成 NAPI 注册
- 提供 ArkTS 封装
- 配置 `build-profile.json5`

禁止删除 native 配置后用空的 ArkTS 实现代替。

## UI 适配要求

每个库组件，都要按照 `android-to-harmonyos-ui-mapping` Skill 完成清点、规格整理、实现和逐项检查。

完成每个 UI 面后，按照 Skill 中 D1-D21 的检查范围逐项对照 Android 源码和 ArkUI 实现。

对状态、交互、自绘和动画项目，证据不能只有定义位置，还要说明完整关系：

`事件或数据来源 → 更新的响应式状态或 Canvas 重绘 → 读取状态的组件 → 最终界面变化`

发现差异时先修复并重新检查。只有确认平台无法等价实现的项目，才写入差距清单，并说明查证结果、当前实现和具体差异。

## Demo 编写要求

- 作为可安装运行的全功能 Demo，确保 UI 美观易用；若 Android 也有 Demo 工程，风格与 Android Demo 统一，功能、页面流程和 UI 都要对应迁移。Android Demo 中的原生控件若使用默认样式，鸿蒙对应使用原生控件即可，不需要在鸿蒙上复刻 Android 原生控件的默认样式，但需要还原自定义的样式。
- 确保核心 API 覆盖齐全。
- 若需要动态生效的 UI 配置项，确认响应式编写正确；
- 每个 API 都要有可以操作的入口，在界面日志区显示真实返回值、状态变化或副作用。
- Demo 的主要操作必须调用 `library` 中的真实实现，不能在 `entry` 中重复实现或生成固定结果。
- 回调、监听器和配置项应通过真实场景展示。
- 页面导航、参数和结果回传必须接通，不能存在无法进入的页面或没有接收位置的结果。
- Demo 功能若依赖运行时权限，必须在 `module.json5` 中声明，并在代码中动态申请。在报告中输出运行时权限报告，包含主要功能是否需要运行时权限、是否已经在 Demo 中申请运行时权限。
- Android 支持而 HarmonyOS 没有对应能力时，在 Demo 中明确提示“不支持”，不能静默跳过。

### UX 合规
1. 界面滑动到边界位置时 (上下滑动到顶部或底部，左右滑动到左边界或右边界)，应该有反馈动效
2. 除一级界面外，所有全屏界面均需提供返回/关闭/取消按钮（全屏沉浸式场景、穿戴圆形屏除外）
3. 使用的色彩需满足最小对比度要求：图标或标题文字与背景对比度大于 3:1，正文文字与背景对比度大于 4.5:1

## 编译验证

写完代码后，必须编译，不允许跳过。

## 输出报告

写入 `.ohos-adaptation/02-implementation-report.md`，使用中文，简短地说明：

1. 适配总体情况。
2. 运行时权限声明和动态申请情况
3. UX 合规情况
4. 无法完全对齐的项目及具体差异。这一节只能写经查证平台确实无法实现的项，每项要写明查证结果。复杂或耗时但能做的功能不属于这里，必须实现，不能列进本节就算完成。

## 生成项目 README

在项目根目录 `README.md` 生成鸿蒙版开源项目文档，删除其他 README 变体文件（如 `README-CHN.md`、`Readme.md` 等）。

1. README 包含章节

项目介绍、环境要求、快速开始、API 参考、开源许可（优先读取原仓库 `LICENSE` / `LICENSE.txt`；不存在时默认 `Apache-2.0`）等。

2. 生成规则

- 始终使用中文。
- 标题之后的第一行写 `基于 [原始仓库地址] 开发，适配鸿蒙版本`。原始仓库地址通过 git 命令获取。获取不到原始仓库地址这一行就不用写。
- 删除所有截图引用及 APK 下载链接。
- 不出现"Android"、"迁移"、"原平台"、"从…转"等字样。
- 直接描述为 HarmonyOS（ArkTS）库，最低版本写 compatibleSdkVersion。
