## 场景介绍

从6.0.0(20)Beta3版本开始，新增支持应用内多窗。

当应用开发者需要使用应用内多窗图标（分屏按钮）时，可通过配置titleBar中的menu的[multiWindowEntryInAPPMenu](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsnavigation#section158052224917)属性实现该功能。

## 约束条件

依赖全景多窗特性，只有当前设备及屏幕状态支持全景多窗，才支持设置此功能。目前支持全景多窗的设备形态有：

* 双折叠：展开态。
* 三折叠：双屏态，三屏态的横屏态。
* 平板：横屏态。

对于不支持的设备形态，该组件不可交互，不响应点击事件。

## 开发步骤

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 从6.0.2(22)版本开始，无需手动导入HdsNavigationAttribute。具体请参考HdsNavigation的导入模块说明。
   2. import { HdsNavigation, HdsNavigationMenuContentOptions, HdsNavigationAttribute } from '@kit.UIDesignKit';
   3. import { Want } from '@kit.AbilityKit';
   ```
2. 创建一级导航组件，通过配置titleBar中的menu上的multiWindowEntryInAPPMenu属性，实现应用内多窗图标设置。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @Component
   3. struct MultiWindowEntryInAPPTest {
   4. private want: Want = {
   5. // 修改为当前应用的bundleName、moduleName、abilityName，启动应用内的UIAbility
   6. bundleName: "com.example.myapplication",
   7. moduleName: "entry",
   8. abilityName: "FuncAbility",
   9. }
   10. @State menuContent: HdsNavigationMenuContentOptions = {
   11. multiWindowEntryInAPPMenu: {
   12. want: this.want,
   13. },
   14. maxCount: 3,
   15. value: [
   16. { content: { label: 'menu1', icon: $r('sys.symbol.search_things'), } },
   17. { content: { label: 'menu2', icon: $r('sys.symbol.plus'), } }
   18. ]
   19. }

   21. build() {
   22. HdsNavigation() {
   23. Stack() {
   24. Text("Page1")
   25. }.alignContent(Alignment.Center)
   26. .width("100%")
   27. .height("100%")
   28. }
   29. .hideToolBar(false)
   30. .navBarWidth('100%')
   31. .titleBar({
   32. content: {
   33. title: {
   34. mainTitle: "Index"
   35. },
   36. menu: this.menuContent
   37. }
   38. })
   39. }
   40. }
   ```

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9d/v3/bR7Nh9YuScSK9pnSSAdzfg/zh-cn_image_0000002532304115.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T041528Z&HW-CC-Expire=86400&HW-CC-Sign=BDE1738CE94D30F854CCBA5041DDEF5E6FD3996F708DE2C455E391968A0F05A5 "点击放大")