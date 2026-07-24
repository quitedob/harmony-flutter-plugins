## 场景介绍

从5.1.0(18)版本开始，导航组件新增支持菜单栏设置信息提醒能力。

当应用开发者需要在导航组件菜单项右上角附加消息提醒时，可以通过设置标题栏菜单中的[badge](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsnavigation#section7349101217489)配置，实现信息提醒能力。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/0e/v3/CPsE2qDISRG4qkLyiYw-ug/zh-cn_image_0000002532304133.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T041510Z&HW-CC-Expire=86400&HW-CC-Sign=DBF65859A4CABC664A243E04D77B8B848AFF8E599EEEB01CD172794CF94E7A85 "点击放大")

## 开发步骤

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 从6.0.2(22)版本开始，无需手动导入HdsNavigationAttribute。具体请参考HdsNavigation的导入模块说明。
   2. import { HdsNavigation, HdsNavigationAttribute } from '@kit.UIDesignKit';
   ```
2. 创建一级导航组件，通过配置titleBar中menu的badge属性，设置信息提醒样式。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @Component
   3. struct Index {
   4. build() {
   5. HdsNavigation() { // 创建HdsNavigation组件
   6. }.titleBar({
   7. content: { // HdsNavigation标题栏内容设置
   8. menu: { // HdsNavigation标题栏菜单区域内容设置
   9. value: [{
   10. content: { // 第一个菜单项内容设置
   11. label: 'menu1',
   12. icon: 'resources/base/media/startIcon.png',
   13. isEnabled: true,
   14. },
   15. badge: { // 第一个菜单项信息提醒设置
   16. count: 1,
   17. }
   18. },{
   19. content: { // 第二个菜单项内容设置
   20. label: 'menu2',
   21. icon: 'resources/base/media/startIcon.png',
   22. isEnabled: true,
   23. },
   24. badge: { // 第二个菜单项信息提醒设置
   25. count: 100,
   26. }
   27. }]
   28. },
   29. title: { mainTitle: 'MainTitle', subTitle: 'SubTitle' },
   30. }
   31. })
   32. }
   33. }
   ```