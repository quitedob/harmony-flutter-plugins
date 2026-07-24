## 场景介绍

从6.0.0(20) Beta1版本开始，新增支持设置无主按钮的组件。

[HdsActionBar](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsactionbar)组件支持多个按钮的样式。当应用开发者需要多个按钮并且没有主按钮，没有展开和收缩的动效时，可以通过设置左按钮和右按钮配置样式。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/35/v3/mzcftRRrQBapj982ld5GSg/zh-cn_image_0000002532144167.png?HW-CC-KV=V1&HW-CC-Date=20260414T041626Z&HW-CC-Expire=86400&HW-CC-Sign=247760C8877E578C0A04221742D63EEE3D7D517587031A2ECA9275F31FE8A620)

## 开发步骤

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { HdsActionBar, ActionBarButton } from '@kit.UIDesignKit'
   ```
2. 创建左边的按钮数组startButtons，创建右边的按钮数组endButtons，无主按钮，不支持切换展开和收缩状态。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @ComponentV2
   3. struct TestNoPrimaryButton {

   5. build() {
   6. Column() {
   7. HdsActionBar({
   8. startButtons: [new ActionBarButton({
   9. baseIcon: $r('sys.symbol.stopwatch_fill')
   10. }), new ActionBarButton({
   11. baseIcon: $r('sys.symbol.stopwatch_fill')
   12. })],
   13. endButtons: [new ActionBarButton({
   14. baseIcon: $r('sys.symbol.mic_fill')
   15. })]
   16. })
   17. }
   18. .width('100%')
   19. .height('100%')
   20. .backgroundColor(0xF1F3F5)
   21. .justifyContent(FlexAlign.Center)
   22. .alignItems(HorizontalAlign.Center)
   23. }
   24. }
   ```