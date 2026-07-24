## 场景介绍

从6.0.0(20) Beta1版本开始，新增支持设置侧边栏菜单样式。

[HdsSideMenu](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdssidemenu)提供一种菜单栏样式组件。设置侧边栏对应的一级菜单和二级菜单，并显示其新消息数量。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/50/v3/fVJnjBAQR8-g8UhVb-gtvg/zh-cn_image_0000002532304135.png?HW-CC-KV=V1&HW-CC-Date=20260414T041546Z&HW-CC-Expire=86400&HW-CC-Sign=680E9BE8D04B9D3F04E0804C2146F6E525D0E9CAAE955FE2092439D594A7A694 "点击放大")

## 开发步骤

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { HdsSideMenu, HdsSideMenuMainItem, HdsSideMenuSubItem, HdsSideMenuBadgeParam, HdsSideBar } from '@kit.UIDesignKit';
   2. import { SymbolGlyphModifier } from '@kit.ArkUI';
   ```
2. 设置对应的一级菜单和二级菜单，并显示其新消息数量。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @ComponentV2
   3. struct Index {
   4. @Local showControlButton: boolean = true;
   5. @Local sideBarMask: boolean = false;
   6. @Local autoHide: boolean = true;
   7. @Local barStateTypeText: string = "Select BarState";
   8. @Local widthIndex: number = 0;
   9. @Local badgeNumber: HdsSideMenuBadgeParam = { count: 50 };
   10. @Local useTheme: boolean = false;
   11. @Local selectedIndex: number = 2;
   12. @Local selectedTransparency: number = 0.6;
   13. @Local str: string = "短信";
   14. @Local isShowSidebar: boolean = true;
   15. listOptionsDefault?: HdsSideMenuMainItem[] = [
   16. new HdsSideMenuMainItem(
   17. {
   18. symbol: new SymbolGlyphModifier($r('sys.symbol.ohos_folder_badge_plus')).fontSize(14),
   19. label: $r('sys.string.TextView_engr_phone'),
   20. }),
   21. new HdsSideMenuMainItem({
   22. icon: $r('sys.symbol.person_wave_3'),
   23. label: 'Tuesday',
   24. hdsSideMenuSubItem: [
   25. new HdsSideMenuSubItem({ label: this.str, badge: this.badgeNumber })],
   26. }),
   27. new HdsSideMenuMainItem({
   28. symbol: new SymbolGlyphModifier($r('sys.symbol.person_crop_circle_fill_1')),
   29. label: 'Wednesday',
   30. }),
   31. ]
   32. @Builder
   33. SideBarPanelBuilder() {
   34. Column() {
   35. HdsSideMenu({
   36. items: this.listOptionsDefault,
   37. selectedIndex: this.selectedIndex,
   38. $selectedIndex: (selectedIndex: number) => {
   39. this.selectedIndex = selectedIndex;
   40. },
   41. })
   42. }
   43. .height('100%')
   44. }
   45. //右侧内容区
   46. @Builder
   47. ContentPanelBuilder() {
   48. Column() {
   49. Column() {
   50. Button() {
   51. SymbolGlyph(this.isShowSidebar ? $r('sys.symbol.open_sidebar') : $r('sys.symbol.close_sidebar'))
   52. .fontWeight(FontWeight.Normal)
   53. .fontSize($r('sys.float.ohos_id_text_size_headline7'))
   54. .fontColor([$r('sys.color.ohos_id_color_titlebar_icon')])
   55. .hitTestBehavior(HitTestMode.None)
   56. }
   57. .backgroundColor($r('sys.color.ohos_id_color_button_normal'))
   58. .height(24)
   59. .width(24)
   60. .animation({ curve: Curve.Sharp, duration: 100 })
   61. .onClick(() => {
   62. this.isShowSidebar = !this.isShowSidebar;
   63. })
   64. }
   65. }
   66. .height('100%')
   67. .width('100%')
   68. }
   69. @BuilderParam sideBarBuilder: () => void = this.SideBarPanelBuilder
   70. @BuilderParam contentBuilder: () => void = this.ContentPanelBuilder
   71. @Builder
   72. build() {
   73. Column() {
   74. HdsSideBar({
   75. sideBarPanelBuilder: (): void => {
   76. this.sideBarBuilder()
   77. },
   78. contentPanelBuilder: (): void => {
   79. this.contentBuilder()
   80. },
   81. isShowSideBar: this.isShowSidebar,
   82. $isShowSideBar: (isShowSidebar: boolean) => {
   83. this.isShowSidebar = !isShowSidebar
   84. },
   85. })
   86. }
   87. }
   88. }
   ```