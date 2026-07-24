## 场景介绍

从6.0.0(20) Beta1版本开始，新增支持设置侧边栏半屏居中对齐样式。

[HdsTabs](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdstabs)容器组件侧边栏支持半屏居中对齐布局。横向Tabs时，若没有主动设置TabBar高度，则TabBar默认高度为48vp，纵向TabBar默认宽度为96vp，barHeight设成固定值后，TabBar无法扩展底部安全区。当safeAreaPadding不设置bottom或者bottom设置为0时，可以实现扩展安全区。

* 半屏居中对齐布局

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/89/v3/LURoAELPSXG2CVTNEo62og/zh-cn_image_0000002500424098.png?HW-CC-KV=V1&HW-CC-Date=20260414T041605Z&HW-CC-Expire=86400&HW-CC-Sign=5014F125505B875F2429BCD17FAD00CE779B01BD6F30513933F3677A945DE4B3 "点击放大")

* 默认横向和纵向宽度

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/fc/v3/_xi3hAxzQ3eiSsBBfdLl7Q/zh-cn_image_0000002500424096.png?HW-CC-KV=V1&HW-CC-Date=20260414T041605Z&HW-CC-Expire=86400&HW-CC-Sign=2D6949996B9BF3223B83A390ACE9D2434E67323E7373682E46D47E9AB98E21AE "点击放大")

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/22/v3/w4ylzsJUQgOfEhV3x9Ub4g/zh-cn_image_0000002500304246.png?HW-CC-KV=V1&HW-CC-Date=20260414T041605Z&HW-CC-Expire=86400&HW-CC-Sign=2A3CB1BD2E851E7ADFA00C4B1A3E6A9A3CAB223BE1108617B0B97F1B8F21F84E "点击放大")

## 约束条件

1. 依赖页签位于侧边栏，vertical设置为true。
2. 页签使用BottomTabBarStyle样式。

## 开发步骤

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 从6.0.2(22)版本开始，无需手动导入HdsTabsAttribute。具体请参考HdsTabs的导入模块说明。
   2. import { HdsTabs, ExtendBarMode, HdsTabsAttribute } from '@kit.UIDesignKit';
   ```
2. 创建Hds一级容器组件，设置HdsTabs组件的barMode样式为ExtendBarMode.HALF\_SCREEN\_FIXED，所有页签总高度之和为HdsTabs组件高度的四分之一，且处在二分之一屏的居中位置。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @Component
   3. struct Index {
   4. @State isVertical: boolean = false;

   6. build() {
   7. Column() {
   8. Column() {
   9. Row() {
   10. Button('verticalChange')
   11. .onClick(() => {
   12. this.isVertical = !this.isVertical;
   13. })
   14. }
   15. }
   16. .margin({ top: 20 })
   17. .width('100%')
   18. .height('10%')
   19. HdsTabs({ barPosition: BarPosition.End }) {
   20. TabContent() {
   21. Column().width('100%').height('100%').backgroundColor(Color.Yellow)
   22. }
   23. .tabBar(new BottomTabBarStyle($r('sys.media.ohos_app_icon'), 'Yellow'))
   24. TabContent() {
   25. Column().width('100%').height('100%').backgroundColor(Color.Blue)
   26. }
   27. .tabBar(new BottomTabBarStyle($r('sys.media.ohos_app_icon'), 'Blue'))
   28. TabContent() {
   29. Column().width('100%').height('100%').backgroundColor(Color.Pink)
   30. }
   31. .tabBar(new BottomTabBarStyle($r('sys.media.ohos_app_icon'), 'Pink'))
   32. }
   33. .vertical(this.isVertical)
   34. .barMode(ExtendBarMode.HALF_SCREEN_FIXED)
   35. .width('100%')
   36. .height('90%')
   37. }
   38. }
   39. }
   ```