## 场景介绍

从6.0.0(20) Beta1版本开始，新增支持设置页签栏的模糊样式。

[HdsTabs](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdstabs)容器组件扩展支持页签栏设置直接模糊和渐变模糊效果。

* 直接模糊

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6e/v3/4eQJvZ4uREWpQNE77tKuDA/zh-cn_image_0000002500304216.png?HW-CC-KV=V1&HW-CC-Date=20260414T041557Z&HW-CC-Expire=86400&HW-CC-Sign=DD2B2DEA97B502553569962B65A9CE5E2FECFA102F45C0C4C320EBDF5AA108A5 "点击放大")

* 渐变模糊

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8f/v3/6D4x9YTcSzaw8aiIYj9nUw/zh-cn_image_0000002500424068.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T041557Z&HW-CC-Expire=86400&HW-CC-Sign=A9C760803C73DA57E9D7CF6A352E63233230C2E110991DDFDC71C60D93A3FE03 "点击放大")

## 约束条件

1. 依赖页签栏位于容器底部，barPosition设置为BarPosition.End，vertical设置为false。
2. TabBar叠加在TabContent之上，barOverlap设置为true。
3. 去掉TabBar节点，barBackgroundBlurStyle默认设置的模糊的属性值为BlurStyle.NONE。

## 开发步骤

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 从6.0.2(22)版本开始，无需手动导入HdsTabsAttribute。具体请参考HdsTabs的导入模块说明。
   2. import { HdsTabs, HdsTabsAttribute, HdsTabsController } from '@kit.UIDesignKit';
   ```
2. 创建Hds一级容器组件，设置HdsTabs组件的barBackgroundStyle样式，可以自定义模糊的颜色和高度，实现渐变模糊。

   说明

   1. 当开发者通过Tabs组件属性barBackgroundBlurStyle设置模糊时，HdsTabs的默认模糊效果失效。
   2. 当开发者通过Tabs组件属性barBackgroundEffect设置模糊时，HdsTabs的默认模糊效果失效。
   3. 当开发者通过Tabs组件属性barBackgroundColor设置背景色时，HdsTabs的默认模糊效果只有模糊半径生效，模糊半径为80vp。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @Component
   3. struct Index {
   4. private controller: HdsTabsController = new HdsTabsController();

   6. build() {
   7. Column() {
   8. HdsTabs({ controller: this.controller }) {
   9. TabContent() {
   10. Column().width('100%').height('100%').backgroundColor(Color.Pink)
   11. }
   12. .tabBar({ icon: $r('app.media.startIcon'), text: '页签1' })

   14. TabContent() {
   15. Column().width('100%').height('100%').backgroundColor(Color.Blue)
   16. }
   17. .tabBar({ icon: $r('app.media.startIcon'), text: '页签2' })
   18. }
   19. .barOverlap(true)
   20. .barPosition(BarPosition.End)
   21. .vertical(false)
   22. .barBackgroundStyle({
   23. maskColor: Color.Yellow,
   24. maskHeight: 80
   25. })
   26. }
   27. }
   28. }
   ```