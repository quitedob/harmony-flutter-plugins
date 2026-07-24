## 场景介绍

从6.0.0(20) Beta1版本开始，导航组件新增支持设置标题栏动态显隐及隐藏类型。

当应用开发者需要动态隐藏标题栏时，可通过使用[dynamicHideTitleBar](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsnavigation#section96017217517)属性实现该功能。设置隐藏标题区域前提下，才可以设置隐藏状态栏。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7e/v3/hBZWZCSxQg-Qt4m4rbzt3A/zh-cn_image_0000002532144139.gif?HW-CC-KV=V1&HW-CC-Date=20260414T041517Z&HW-CC-Expire=86400&HW-CC-Sign=1FC09FBF1A71777E83869705DB3ECB238CE70768DF402AD0F760312C393C0ABD "点击放大")

## 开发步骤

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 从6.0.2(22)版本开始，无需手动导入HdsNavigationAttribute。具体请参考HdsNavigation的导入模块说明。
   2. import { HdsNavigation, BottomBuilderShowType, HideMode, HdsNavigationAttribute } from '@kit.UIDesignKit';
   ```
2. 创建一级导航组件，通过设置dynamicHideTitleBar属性，可隐藏状态栏、标题区域、BottomBuilder区域。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @Component
   3. struct Index {
   4. @Builder
   5. BottomBuilder() { // 自定义BottomBuilder组件
   6. Column() {
   7. Search()
   8. }
   9. .width('100%')
   10. .height(56)
   11. .backgroundColor(Color.Orange)
   12. }

   14. build() {
   15. HdsNavigation() { // 创建HdsNavigation组件
   16. }.titleBar({
   17. content: {
   18. title: { mainTitle: 'MainTitle', subTitle: 'SubTitle' },
   19. // 设置HdsNavigation BottomBuilder区域，包括设置高度，显示类型
   20. bottomBuilder: { builder: (): void => this.BottomBuilder(), height: 56, showType: BottomBuilderShowType.DIRECTLY_SHOW }
   21. }
   22. })
   23. // 设置HdsNavigation标题栏动态显隐，包括设置标题区域，bottomBuilder区域，状态栏区域是否动态隐藏，隐藏模式以及开始隐藏时内容区的滚动距离。
   24. .dynamicHideTitleBar({ hideTitleArea:true, hideBottomBuilder: true, hideStatusBar: false, mode: HideMode.SCROLL_UP_TO, hideOffset: 10 })
   25. }
   26. }
   ```