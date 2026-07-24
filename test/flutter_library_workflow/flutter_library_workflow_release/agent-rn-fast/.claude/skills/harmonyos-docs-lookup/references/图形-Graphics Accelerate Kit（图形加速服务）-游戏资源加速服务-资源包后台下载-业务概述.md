从5.1.0(18)版本开始，新增资源包后台下载。

资源包后台下载是将资源文件（例如关卡包、3D角色模型、纹理等）静默下载到用户设备中，减少游戏启动后等待资源包下载的时间，解决游戏启动慢的问题，为用户提供即开即玩的游戏体验。

## 主要功能

### 系统后台下载资源包

|  |  |
| --- | --- |
| * 场景一 用户在应用市场安装游戏后、或在应用市场更新游戏后，在游戏未启动状态下，若检测到该游戏有资源包需要更新，将自动触发资源包下载。用户下拉通知栏，实时查看资源包下载进度。 | * 场景二 待用户设备满足闲时条件时，在游戏未启动状态下，若检测到上次更新资源包未完成，或该游戏有新的资源包需要更新，将自动触发资源包下载。用户下拉通知栏，实时查看资源包下载进度。 |
| Video Player is loading. Play Video Play Current Time 0:00  Loaded: 1.74%    0:00  Duration 0:21  Mute  1x Playback Rate * 2x * 1.8x * 1.5x * 1.2x * 1x, selected Fullscreen  This is a modal window.  Beginning of dialog window. Escape will cancel and close the window.  TextColorWhiteBlackRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentText BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentTransparentCaption Area BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityTransparentSemi-TransparentOpaque  Font Size50%75%100%125%150%175%200%300%400%Text Edge StyleNoneRaisedDepressedUniformDrop shadowFont FamilyProportional Sans-SerifMonospace Sans-SerifProportional SerifMonospace SerifCasualScriptSmall Caps  Reset restore all settings to the default valuesDone Close Modal Dialog End of dialog window. | Video Player is loading. Play Video Play Current Time 0:00  Loaded: 1.87%    0:00  Duration 0:21  Mute  1x Playback Rate * 2x * 1.8x * 1.5x * 1.2x * 1x, selected Fullscreen  This is a modal window.  Beginning of dialog window. Escape will cancel and close the window.  TextColorWhiteBlackRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentText BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentTransparentCaption Area BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityTransparentSemi-TransparentOpaque  Font Size50%75%100%125%150%175%200%300%400%Text Edge StyleNoneRaisedDepressedUniformDrop shadowFont FamilyProportional Sans-SerifMonospace Sans-SerifProportional SerifMonospace SerifCasualScriptSmall Caps  Reset restore all settings to the default valuesDone Close Modal Dialog End of dialog window. |

### 系统后台切应用前台接续下载资源包

|  |  |
| --- | --- |
| 用户在应用市场安装游戏后、或在应用市场更新游戏后，在游戏未启动状态下，若检测到该游戏有资源包需要更新，将自动触发资源包下载。用户下拉通知栏，实时查看资源包下载进度。在下载过程中点击游戏App，游戏接管未完成的下载任务。 | |
| Video Player is loading. Play Video Play Current Time 0:00  Loaded: 1.70%    0:00  Duration 0:20  Mute  1x Playback Rate * 2x * 1.8x * 1.5x * 1.2x * 1x, selected Fullscreen  This is a modal window.  Beginning of dialog window. Escape will cancel and close the window.  TextColorWhiteBlackRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentText BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentTransparentCaption Area BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityTransparentSemi-TransparentOpaque  Font Size50%75%100%125%150%175%200%300%400%Text Edge StyleNoneRaisedDepressedUniformDrop shadowFont FamilyProportional Sans-SerifMonospace Sans-SerifProportional SerifMonospace SerifCasualScriptSmall Caps  Reset restore all settings to the default valuesDone Close Modal Dialog End of dialog window. |  |

### 应用前台下载资源包

|  |  |
| --- | --- |
| 用户点击游戏App，若检测到上次更新资源包未完成，或该游戏有新的资源包需要更新，游戏将接续执行未完成的下载任务或提交新的下载任务。 | |
| Video Player is loading. Play Video Play Current Time 0:00  Loaded: 2.48%    0:00  Duration 0:16  Mute  1x Playback Rate * 2x * 1.8x * 1.5x * 1.2x * 1x, selected Fullscreen  This is a modal window.  Beginning of dialog window. Escape will cancel and close the window.  TextColorWhiteBlackRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentText BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentTransparentCaption Area BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityTransparentSemi-TransparentOpaque  Font Size50%75%100%125%150%175%200%300%400%Text Edge StyleNoneRaisedDepressedUniformDrop shadowFont FamilyProportional Sans-SerifMonospace Sans-SerifProportional SerifMonospace SerifCasualScriptSmall Caps  Reset restore all settings to the default valuesDone Close Modal Dialog End of dialog window. |  |

### 应用前台切应用后台下载资源包

说明

需要与[dataTransfer类型的长时任务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/continuous-task)协同使用。

|  |  |
| --- | --- |
| 应用前台下载资源包的过程中，将游戏切至后台，资源包下载任务不中断。用户下拉通知栏，实时查看资源包下载进度。 | |
| Video Player is loading. Play Video Play Current Time 0:00  Loaded: 1.76%    0:00  Duration 0:23  Mute  1x Playback Rate * 2x * 1.8x * 1.5x * 1.2x * 1x, selected Fullscreen  This is a modal window.  Beginning of dialog window. Escape will cancel and close the window.  TextColorWhiteBlackRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentText BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentTransparentCaption Area BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityTransparentSemi-TransparentOpaque  Font Size50%75%100%125%150%175%200%300%400%Text Edge StyleNoneRaisedDepressedUniformDrop shadowFont FamilyProportional Sans-SerifMonospace Sans-SerifProportional SerifMonospace SerifCasualScriptSmall Caps  Reset restore all settings to the default valuesDone Close Modal Dialog End of dialog window. |  |

## 实现流程

展开

| 序号 | 步骤 | | 说明 |
| --- | --- | --- | --- |
| 1 | [开发准备](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/graphics-accelerate-assetdownload-prepare) | | 开发者需提前做好相关准备工作。 |
| 2 | 开发资源包后台下载功能 | [系统后台下载资源包](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/graphics-accelerate-assetdownload-back) | 开发者可以在游戏工程中接入资源包系统后台下载、应用前台下载、系统后台切应用前台接续下载功能。 |
| [应用前台下载资源包](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/graphics-accelerate-assetdownload-fore) |
| [系统后台切应用前台接续下载资源包](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/graphics-accelerate-assetdownload-back-fore) |
| 3 | 发布资源包下载任务 | [进入申请页面](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/graphics-accelerate-assetdownload-release#zh-cn_topic_0000002179265860_zh-cn_topic_0000002177341213_section514181912359) | 开发者需前往AppGallery Connect创建并发布下载资源包任务。建议开发者在正式发布资源包下载任务前，先在本地测试是否可以成功下载资源包。 |
| [创建下载任务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/graphics-accelerate-assetdownload-release#zh-cn_topic_0000002179265860_zh-cn_topic_0000002177341213_section1494105011355) |
| [提交下载任务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/graphics-accelerate-assetdownload-release#zh-cn_topic_0000002179265860_zh-cn_topic_0000002177341213_section124381849103616) |
| [测试下载功能](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/graphics-accelerate-assetdownload-release#zh-cn_topic_0000002179265860_zh-cn_topic_0000002177341213_section6757103624010) |
| [发布下载任务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/graphics-accelerate-assetdownload-release#zh-cn_topic_0000002179265860_zh-cn_topic_0000002177341213_section9206134163716) |
| 4 | [查看资源包分发数据](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/graphics-accelerate-assetdownload-data) | | 资源包下载任务正式发布后，开发者可以前往AppGallery Connect查看资源包分发情况。 |

## 基本概念

展开

| 概念 | 说明 |
| --- | --- |
| CDN | 内容分发网络（Content Delivery Network），是一种通过网络中分布资源服务器，用以提高网站访问速度的技术。当前资源包后台下载功能支持游戏在AppGallery Connect配置华为CDN或三方CDN的资源包下载配置项。 |
| 资源加速ExtensionAbility | [ExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-extensionability)组件是基于特定场景（例如服务卡片、输入法）提供的应用组件，以便满足更多的使用场景。[资源加速ExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-extensionability)是为资源包后台下载框架，为资源包后台下载提供关键的生命周期函数。在后台下载任务成功/失败/结束后支持调用相应的回调函数。 |
| 系统后台下载 | 游戏应用进程未加载时，系统能力自动开启资源包下载任务。 |