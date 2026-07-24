从6.0.0(20) 版本开始，新增支持秒级启动功能。

秒级启动是在游戏退出时，开发者先切换场景，系统再自动为该场景制作内存镜像。在该游戏下一次无资源更新冷启动时，可以直接进入内存镜像界面，实现游戏的秒开秒进，无需再经过漫长的加载过程。

## 基本概念

展开

| 概念 | 说明 |
| --- | --- |
| 切换场景 | 游戏退出时，开发者需要先切换游戏场景，系统再根据该场景自动制作内存镜像。等到下一次游戏无资源包更新冷启动时，游戏直接到达该游戏场景。  因为游戏登录界面具备内存占用率低、处于相对稳定的运行状态等优势，建议开发者在游戏退出时将**游戏登录界面**保存为内存镜像，大幅降低切换场景过程中的适配问题。 |

## 用户体验

打开游戏时，自动跳过游戏开头动画，直达游戏界面。

|  |  |
| --- | --- |
| Video Player is loading. Play Video Play Current Time 0:00  Loaded: 5.12%    0:00  Duration 0:19  Mute  1x Playback Rate * 2x * 1.8x * 1.5x * 1.2x * 1x, selected Fullscreen  This is a modal window.  Beginning of dialog window. Escape will cancel and close the window.  TextColorWhiteBlackRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentText BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentTransparentCaption Area BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityTransparentSemi-TransparentOpaque  Font Size50%75%100%125%150%175%200%300%400%Text Edge StyleNoneRaisedDepressedUniformDrop shadowFont FamilyProportional Sans-SerifMonospace Sans-SerifProportional SerifMonospace SerifCasualScriptSmall Caps  Reset restore all settings to the default valuesDone Close Modal Dialog End of dialog window.    加载内存镜像 | Video Player is loading. Play Video Play Current Time 0:00  Loaded: 2.85%    0:00  Duration 0:43  Mute  1x Playback Rate * 2x * 1.8x * 1.5x * 1.2x * 1x, selected Fullscreen  This is a modal window.  Beginning of dialog window. Escape will cancel and close the window.  TextColorWhiteBlackRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentText BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentTransparentCaption Area BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityTransparentSemi-TransparentOpaque  Font Size50%75%100%125%150%175%200%300%400%Text Edge StyleNoneRaisedDepressedUniformDrop shadowFont FamilyProportional Sans-SerifMonospace Sans-SerifProportional SerifMonospace SerifCasualScriptSmall Caps  Reset restore all settings to the default valuesDone Close Modal Dialog End of dialog window.    未加载内存镜像 |

## 快速上手体验

在正式开发之前，开发者可以通过[Codelab](https://developer.huawei.com/consumer/cn/codelabsPortal/carddetails/tutorials_LaunchAcceleration-ArkTS)快速体验秒级启动的开发过程。