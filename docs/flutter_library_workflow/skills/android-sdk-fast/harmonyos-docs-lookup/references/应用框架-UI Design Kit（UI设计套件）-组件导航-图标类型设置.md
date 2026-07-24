## 场景介绍

从6.0.0(20) Beta1版本开始，导航组件新增支持文本型与图片型图标类型设置。

当应用开发者需要配置图片型图标大小，或者使用普通文字型图标（胶囊型按钮）、单字图标（圆形按钮）时，可通过设置titleBar图标内容配置中的[type](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsnavigation#section74312125454)属性实现该功能。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/46/v3/q67vVrULTjK0XRjzDpwYKg/zh-cn_image_0000002532144165.png?HW-CC-KV=V1&HW-CC-Date=20260414T041524Z&HW-CC-Expire=86400&HW-CC-Sign=A3546BDDDB470BA7E73464655721B173D340D54C46F286796FE5876D70E5BFFF)

## 开发步骤

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 从6.0.2(22)版本开始，无需手动导入HdsNavigationAttribute。具体请参考HdsNavigation的导入模块说明。
   2. import { HdsNavigation, HdsNavigationTitleMode, TextStyleMode, IconStyleMode, HdsNavigationAttribute } from '@kit.UIDesignKit';
   ```
2. 创建一级导航组件，通过配置titleBar中的menu上的type属性，实现文字型图标以及图片型图标大小设置。

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
   6. }
   7. .titleBar({
   8. content: {
   9. title: { mainTitle: 'MainTitle', subTitle: 'SubTitle' },
   10. menu: { // 设置HdsNavigation菜单内容
   11. value: [{
   12. content: { // 设置第一个菜单项内容，设置为普通文本按钮
   13. label: '文字按钮',
   14. type: TextStyleMode.NORMAL,
   15. }
   16. }, {
   17. content: { // 设置第二个菜单项内容，设置为单字按钮
   18. label: '单',
   19. type: TextStyleMode.SINGLE_CHARACTER,
   20. }
   21. }, {
   22. content: { // 设置第三个菜单项内容，设置为大图标按钮
   23. label: 'largeIcon',
   24. icon: 'resources/base/media/app_icon.png',
   25. type: IconStyleMode.LARGE,
   26. }
   27. }, {
   28. content: { // 设置第四个菜单项内容，设置为小图标按钮
   29. label: 'smallIcon',
   30. icon: 'resources/base/media/app_icon.png',
   31. type: IconStyleMode.SMALL,
   32. }
   33. }],
   34. maxCount: 4 // 最大菜单显示个数配置
   35. },
   36. }
   37. })
   38. .titleMode(HdsNavigationTitleMode.MODAL)
   39. }
   40. }
   ```