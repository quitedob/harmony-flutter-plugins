## 场景介绍

从6.0.0(20) Beta1版本开始，导航组件新增支持半模态样式和半模态样式下的标题栏模糊。

用于半模态弹窗中使用导航组件场景。通过设置[HdsNavigationTitleMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsnavigation#section26841314155317)为MODAL可以实现标题栏半模态样式及动态模糊。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d9/v3/eS41KmPbQ_ebS3-hEVb-IA/zh-cn_image_0000002532304101.png?HW-CC-KV=V1&HW-CC-Date=20260414T041520Z&HW-CC-Expire=86400&HW-CC-Sign=88602BEBB603766C61CF8F251C4CDA2BF2F08FE19925C6528C713DA5510D139B "点击放大")

## 开发步骤

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 从6.0.2(22)版本开始，无需手动导入HdsNavigationAttribute。具体请参考HdsNavigation的导入模块说明。
   2. import { HdsNavigation, HdsNavigationTitleMode, HdsNavigationAttribute } from '@kit.UIDesignKit';
   ```
2. 创建一级导航组件，通过设置titleMode属性为HdsNavigationTitleMode.MODAL实现标题栏半模态样式。

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
   9. title: {mainTitle: 'MainTitle', subTitle: 'SubTitle'},
   10. }
   11. })
   12. .titleMode(HdsNavigationTitleMode.MODAL) // 设置HdsNavigation显示模式为半模态样式
   13. }
   14. }
   ```