## 场景介绍

从6.0.0(20) Beta1版本开始，新增支持设置overlay模式的侧边栏。

[HdsSideBar](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdssidebar)提供可以显示和隐藏的侧边栏容器，通过子组件定义侧边栏和内容区，第一个子组件表示侧边栏，第二个子组件表示内容区，通过设置sideBarContainerType的值为[SideBarContainerType.Overlay](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-sidebarcontainer#sidebarcontainertype枚举说明)，使得当前HdsSideBar为悬浮样式。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8/v3/J_14vaGyS2e58DC0dWNEVw/zh-cn_image_0000002500304238.png?HW-CC-KV=V1&HW-CC-Date=20260414T041539Z&HW-CC-Expire=86400&HW-CC-Sign=D67977C9BF52D69E5BD15FDC9DAE9FF4575281BBB3B4B3BC7CCAC45097CA048C "点击放大")

## 开发步骤

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { HdsSideBar } from '@kit.UIDesignKit';
   ```
2. 设置图片。

   将图片资源，放到entry/src/main/resources/base/media下。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/37/v3/qvTy0ceOTauF8-9cP5ufjg/zh-cn_image_0000002500424086.png?HW-CC-KV=V1&HW-CC-Date=20260414T041539Z&HW-CC-Expire=86400&HW-CC-Sign=D3F161E6FE8C7C14EF038721918C5C292CBFEAFCB5AA252121590EC3DC2DD9A1 "点击放大")
3. 创建HdsSideBar侧边栏组件，设置展开模式为overlay。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @ComponentV2
   3. struct Index {
   4. @Local isSideBarContainerMask: boolean = true;
   5. @Local blankHeight: number = 48;
   6. @Local isAutoHide: boolean = false;
   7. @Local isShowSidebar: boolean = true;
   8. @Local triggerValueReplace: number = 0;
   9. //左侧侧边栏区
   10. @Builder
   11. SideBarPanelBuilder() {
   12. Column() {
   13. Blank().height(this.blankHeight)
   14. Text('HdsSideBar Menu 1')
   15. .fontSize(14)
   16. Text('HdsSideBar Menu 2')
   17. .fontSize(14)
   18. }
   19. .width('100%')
   20. .height('100%')
   21. }
   22. //右侧内容区
   23. @Builder
   24. ContentPanelBuilder() {
   25. Column(){
   26. Blank().height(this.blankHeight)
   27. Image($r('app.media.view')) // view为自定义资源，开发者需替换本地资源
   28. .width('80%')
   29. .height('50%')
   30. .margin({ top: 8 })
   31. .padding({
   32. right: '16vp',
   33. left: '16vp',
   34. bottom: '16vp',
   35. })
   36. .borderRadius(8)
   37. Column() {
   38. Text('HdsSideBar content text1')
   39. .fontSize(14)
   40. Text('HdsSideBar content text2')
   41. .fontSize(14)
   42. }
   43. Button() {
   44. SymbolGlyph(this.isShowSidebar ? $r('sys.symbol.open_sidebar') : $r('sys.symbol.close_sidebar'))
   45. .fontWeight(FontWeight.Normal)
   46. .fontSize($r('sys.float.ohos_id_text_size_headline7'))
   47. .fontColor([$r('sys.color.ohos_id_color_titlebar_icon')])
   48. .hitTestBehavior(HitTestMode.None)
   49. }
   50. .id('side_bar_button')
   51. .backgroundColor($r('sys.color.ohos_id_color_button_normal'))
   52. .height(24)
   53. .width(24)
   54. .animation({ curve: Curve.Sharp, duration: 100 })
   55. .onClick(() => {
   56. this.isShowSidebar = !this.isShowSidebar;
   57. })
   58. }
   59. }
   60. @BuilderParam contentBuilder: () => void = this.ContentPanelBuilder
   61. @BuilderParam sideBarBuilder: () => void = this.SideBarPanelBuilder
   62. @Builder
   63. HDSSideBarBuilder() {
   64. HdsSideBar({
   65. sideBarPanelBuilder: (): void => {
   66. this.sideBarBuilder()
   67. },
   68. contentPanelBuilder: (): void => {
   69. this.contentBuilder()
   70. },
   71. autoHide: this.isAutoHide,
   72. contentAreaMask: this.isSideBarContainerMask,
   73. sideBarContainerType: SideBarContainerType.Overlay,
   74. isShowSideBar: this.isShowSidebar,
   75. $isShowSideBar: (isShowSidebar: boolean) => {
   76. this.isShowSidebar = !isShowSidebar
   77. },
   78. })
   79. }
   80. @Builder
   81. build() {
   82. Stack() {
   83. this.HDSSideBarBuilder()
   84. }
   85. }
   86. }
   ```