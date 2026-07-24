## 场景介绍

从6.0.0(20) Beta1版本开始，新增支持设置有主按钮的组件。

[HdsActionBar](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsactionbar)组件支持多个按钮的样式。当应用开发者需要多个按钮并且有主按钮，支持展开和收缩的动效时，可以通过设置主按钮配置样式。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f8/v3/EgPDz8EAS5qMO1e11jqT7w/zh-cn_image_0000002500424074.gif?HW-CC-KV=V1&HW-CC-Date=20260414T041622Z&HW-CC-Expire=86400&HW-CC-Sign=6C08087AFB368DA8D35E355AD5C27160C80EAE672D9B1654ADC836F9A685EDA1)

## 开发步骤

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { HdsActionBar, ActionBarButton, ActionBarStyle } from '@kit.UIDesignKit'
   ```
2. 创建左边的按钮数组startButtons，创建右边的按钮数组endButtons，创建主按钮primaryButton，设置isExpand初始值是true表示HdsActionBar的初始状态是展开状态，点击主按钮会收起，再次点击可以展开。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @ComponentV2
   3. struct TestActionBar {
   4. @Local isExpand: boolean = true;

   6. @Local isPrimaryIconChanged: boolean = false;

   8. @Local primaryHoverTips: ResourceStr = '开始';

   10. build() {
   11. Column() {
   12. HdsActionBar({
   13. startButtons: [new ActionBarButton({
   14. baseIcon: $r('sys.symbol.stopwatch_fill')
   15. })],
   16. endButtons: [new ActionBarButton({
   17. baseIcon: $r('sys.symbol.mic_fill')
   18. })],
   19. primaryButton: new ActionBarButton({
   20. baseIcon: $r('sys.symbol.plus'),
   21. altIcon: $r('sys.symbol.play_fill'),
   22. onClick: () => {
   23. this.isExpand = !this.isExpand;
   24. this.isPrimaryIconChanged = !this.isPrimaryIconChanged;
   25. if (this.isPrimaryIconChanged) {
   26. this.primaryHoverTips = '暂停';
   27. } else {
   28. this.primaryHoverTips = '开始';
   29. }
   30. },
   31. hoverTips: this.primaryHoverTips
   32. }),
   33. actionBarStyle: new ActionBarStyle({
   34. isPrimaryIconChanged: this.isPrimaryIconChanged
   35. }),
   36. isExpand: this.isExpand!!
   37. })
   38. }
   39. .width('100%')
   40. .height('100%')
   41. .backgroundColor(0xF1F3F5)
   42. .justifyContent(FlexAlign.Center)
   43. .alignItems(HorizontalAlign.Center)
   44. }
   45. }
   ```