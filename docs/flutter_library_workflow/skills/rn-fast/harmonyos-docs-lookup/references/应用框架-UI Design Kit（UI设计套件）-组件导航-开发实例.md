1. 在首页创建一级导航。通过titleBar接口设置HdsNavigation标题栏样式及内容设置。通过pushPath路由方法跳转二级页面。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 模块导入
   2. // 从6.0.2(22)版本开始，无需手动导入HdsNavigationAttribute。具体请参考HdsNavigation的导入模块说明。
   3. import { HdsNavigation, ScrollEffectType, HdsNavigationTitleMode, HdsNavigationAttribute } from '@kit.UIDesignKit';
   4. import { LengthMetrics } from '@kit.ArkUI';

   6. const  TITLE_BAR_HEIGHT_MINI: number = 64;

   8. @Entry
   9. @Component
   10. struct Index {
   11. private arr: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
   12. @Provide('pageInfos') pageInfos: NavPathStack = new NavPathStack();
   13. scroller: Scroller = new Scroller();
   14. @State blankHeight: number = TITLE_BAR_HEIGHT_MINI;
   15. @State isHideBackButton: boolean = false;
   16. @State titleMode: HdsNavigationTitleMode = HdsNavigationTitleMode.MINI;
   17. @State subTitle: string = 'Sub';

   19. build() {
   20. HdsNavigation(this.pageInfos) { // 创建HdsNavigation组件
   21. Column() {
   22. Stack() {
   23. Scroll(this.scroller) { // 内容区设置可滚动容器组件，用于实现内容区滚动联动标题栏动态模糊效果
   24. Column() {
   25. // HdsNavigation标题栏与内容区默认设置堆叠布局，可以在内容区叠加标题栏高度的Blank，防止内容区被标题栏遮挡
   26. Blank().height(this.blankHeight)
   27. Image($r('app.media.background1')) // background1为自定义资源，开发者需替换本地资源
   28. .width('100%')
   29. Button('pushPath', { stateEffect: true, type: ButtonType.Capsule })
   30. .width('80%')
   31. .height(40)
   32. .margin({ top: '5%', right: '50vp', left: '50vp'})
   33. .onClick(() => {
   34. console.info('HDS_BASE_COMPONENT', `onClick firstPage`);
   35. this.pageInfos.pushPath({ name: 'pageOne' })
   36. })
   37. Button('hide backButton ' + this.isHideBackButton)
   38. .onClick(() => {
   39. this.isHideBackButton = !this.isHideBackButton
   40. })
   41. .width('80%')
   42. .height(40)
   43. .margin({ top: '5%', right: '50vp', left: '50vp' , bottom: '5%'})
   44. List({ space: 12, initialIndex: 0 }) {
   45. ForEach(this.arr, (item: number) => {
   46. ListItem() {
   47. Text('' + item)
   48. .width('100%')
   49. .height(72)
   50. .fontSize(16)
   51. .fontWeight(500)
   52. .textAlign(TextAlign.Center)
   53. }
   54. .height(120)
   55. .backgroundColor(Color.Orange)
   56. .borderRadius(24)
   57. }, (item: number) => item.toString())
   58. }
   59. .edgeEffect(EdgeEffect.None)
   60. .width('100%')
   61. .height('100%')
   62. .nestedScroll({scrollForward:NestedScrollMode.PARENT_FIRST, scrollBackward: NestedScrollMode.PARENT_FIRST})
   63. }
   64. }.edgeEffect(EdgeEffect.Spring).scrollBar(BarState.Off)
   65. }
   66. }
   67. }
   68. .titleBar( { // HdsNavigation标题栏设置
   69. style: { // HdsNavigation标题栏样式设置
   70. // 标题栏动态模糊样式，包括是否使能滚动动态模糊，动态模糊类型，动态模糊生效的滚动距离等
   71. scrollEffectOpts: {
   72. enableScrollEffect: true,
   73. scrollEffectType: ScrollEffectType.COMMON_BLUR,
   74. blurEffectiveStartOffset: LengthMetrics.vp(0),
   75. blurEffectiveEndOffset: LengthMetrics.vp(20)
   76. },
   77. },
   78. content: { // HdsNavigation标题栏内容区设置
   79. title: { // HdsNavigation标题栏标题设置
   80. mainTitle: 'Main',
   81. subTitle: this.subTitle
   82. },
   83. menu: { // HdsNavigation标题栏菜单项设置
   84. value: [{ // 第一个菜单项内容设置
   85. content: {
   86. label: 'menu1',
   87. icon: $r('sys.symbol.ohos_wifi'),
   88. isEnabled: true,
   89. },
   90. badge: {
   91. count: 1,
   92. }
   93. }, { // 第二个菜单项内容设置
   94. content: {
   95. label: 'menu2',
   96. icon: $r('sys.symbol.ohos_lock'),
   97. isEnabled: true,
   98. action: () => {
   99. console.info("HDS_NAV HELLO 2");
   100. }
   101. }
   102. }, { // 第三个菜单项内容设置
   103. content: {
   104. label: 'menu3',
   105. icon: $r('sys.symbol.speaker_plus'),
   106. }
   107. }, {
   108. content: { // 第三个菜单项内容设置
   109. label: 'menu4',
   110. icon: $r('sys.symbol.ohos_star'),
   111. }
   112. }]
   113. },
   114. backIcon: { // HdsNavigation返回按钮设置
   115. label: 'backButton',
   116. icon: $r('sys.symbol.ohos_mic'),
   117. isEnabled: true,
   118. }
   119. }
   120. })
   121. .titleMode(this.titleMode)
   122. .hideBackButton(this.isHideBackButton)
   123. }
   124. }
   ```
2. 在PageOne页面创建二级导航组件。通过titleBar接口设置HdsNavDestination标题栏鸿蒙风格化样式及内容设置。展示NavPathStack路由使用示例。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // PageOne.ets
   2. // 模块导入
   3. // 从6.0.2(22)版本开始，无需手动导入HdsNavDestinationAttribute。具体请参考HdsNavDestination的导入模块说明。
   4. import { HdsNavDestination, ScrollEffectType, HdsNavDestinationAttribute } from '@kit.UIDesignKit';
   5. import { LengthMetrics } from '@kit.ArkUI';

   7. @Builder
   8. export function PageOneBuilder() {
   9. PageOne()
   10. }

   12. const  TITLE_BAR_HEIGHT_MINI: number = 56;

   14. @Component
   15. export struct PageOne {
   16. @Consume("pageInfos")pageInfos: NavPathStack;
   17. private arr: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
   18. scroller: Scroller = new Scroller();

   20. build() {
   21. HdsNavDestination() { // 创建HdsNavDestination组件
   22. Scroll(this.scroller) { // HdsNavDestination内容区设置可滚动容器组件，用于实现内容区滚动联动标题栏动态模糊样式
   23. Column() {
   24. Blank().height(TITLE_BAR_HEIGHT_MINI)
   25. Button('pushPath', { stateEffect: true, type: ButtonType.Capsule })
   26. .width('80%')
   27. .height(40)
   28. .margin({ top: '5%', right: '50vp', left: '50vp' , bottom: '5%'})
   29. .onClick(() => {
   30. console.info('HDS_BASE_COMPONENT', `onClick pageOne`);
   31. this.pageInfos.pushPath({ name: 'pageTwo' }) // 将name指定的HdsNavDestination页面信息入栈
   32. })
   33. Button('popToName', { stateEffect: true, type: ButtonType.Capsule })
   34. .width('80%')
   35. .height(40)
   36. .margin(20)
   37. .onClick(() => {
   38. this.pageInfos.popToName('pageTwo') // 回退路由栈到第一个名为name的HdsNavDestination页面
   39. console.info('popToName' + JSON.stringify(this.pageInfos),
   40. '返回值' + JSON.stringify(this.pageInfos.popToName('pageTwo')))
   41. })
   42. Button('popToIndex', { stateEffect: true, type: ButtonType.Capsule })
   43. .width('80%')
   44. .height(40)
   45. .margin(20)
   46. .onClick(() => {
   47. this.pageInfos.popToIndex(1) // 回退路由栈到index指定的HdsNavDestination页面
   48. console.info('popToIndex' + JSON.stringify(this.pageInfos))
   49. })
   50. Button('moveIndexToTop', { stateEffect: true, type: ButtonType.Capsule })
   51. .width('80%')
   52. .height(40)
   53. .margin(20)
   54. .onClick(() => {
   55. this.pageInfos.moveIndexToTop(1) // 将index指定的HdsNavDestination页面移到栈顶
   56. console.info('moveIndexToTop' + JSON.stringify(this.pageInfos))
   57. })
   58. Button('clear', { stateEffect: true, type: ButtonType.Capsule })
   59. .width('80%')
   60. .height(40)
   61. .margin(20)
   62. .onClick(() => {
   63. this.pageInfos.clear() // 清除栈中所有页面
   64. })
   65. List({ space: 12, initialIndex: 0 }) {
   66. ForEach(this.arr, (item: number) => {
   67. ListItem() {
   68. Text('' + item)
   69. .width('100%')
   70. .height(72)
   71. .fontSize(16)
   72. .fontWeight(500)
   73. .textAlign(TextAlign.Center)
   74. }
   75. .height(120)
   76. .backgroundColor(Color.Orange)
   77. .borderRadius(24)
   78. }, (item: number) => item.toString())
   79. }
   80. .edgeEffect(EdgeEffect.None)
   81. .width('100%')
   82. .height('100%')
   83. .nestedScroll({scrollForward:NestedScrollMode.PARENT_FIRST, scrollBackward: NestedScrollMode.PARENT_FIRST})
   84. }
   85. }.edgeEffect(EdgeEffect.Spring).scrollBar(BarState.Off)
   86. }
   87. .titleBar({ // HdsNavDestination标题栏配置
   88. style: { // HdsNavDestination标题栏样式配置
   89. // 标题栏动态模糊样式，包括是否使能滚动动态模糊，动态模糊类型，动态模糊生效的滚动距离等
   90. scrollEffectOpts: {
   91. enableScrollEffect: true,
   92. scrollEffectType: ScrollEffectType.COMMON_BLUR,
   93. blurEffectiveStartOffset: LengthMetrics.vp(0),
   94. blurEffectiveEndOffset: LengthMetrics.vp(20)
   95. },
   96. },
   97. content: { // HdsNavigation标题栏内容区设置
   98. title: { // HdsNavigation标题栏标题设置
   99. mainTitle: "PageOne",
   100. },
   101. menu: { // HdsNavigation标题栏菜单设置
   102. value: [{ // 第一个菜单项内容设置
   103. content: {
   104. label: 'menu1',
   105. icon: $r('sys.symbol.ohos_star'),
   106. }
   107. }, { // 第二个菜单项内容设置
   108. content: {
   109. label: 'menu2',
   110. icon: $r('sys.symbol.ohos_circle'),
   111. },
   112. badge: {
   113. value: '66'
   114. }
   115. }]
   116. },
   117. }
   118. })
   119. .hideBackButton(false)
   120. }
   121. }
   ```
3. 在PageTwo页面创建二级导航组件。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // PageTwo.ets
   2. // 模块导入
   3. // 从6.0.2(22)版本开始，无需手动导入HdsNavDestinationAttribute。具体请参考HdsNavDestination的导入模块说明。
   4. import { HdsNavDestination, HdsNavDestinationAttribute } from '@kit.UIDesignKit';

   6. @Builder
   7. export function PageTwoBuilder() {
   8. PageTwo()
   9. }
   10. const  TITLE_BAR_HEIGHT_MINI: number = 56;
   11. @Component
   12. export struct PageTwo {
   13. @Consume("pageInfos")pageInfos: NavPathStack;

   15. build() {
   16. HdsNavDestination() { // 创建HdsNavDestination组件
   17. Column() { // HdsNavDestination组件内容区设置
   18. Blank().height(TITLE_BAR_HEIGHT_MINI)
   19. Button('pushPathByName', { stateEffect: true, type: ButtonType.Capsule })
   20. .width('80%')
   21. .height(40)
   22. .margin(20)
   23. .onClick(() => {
   24. this.pageInfos.pushPathByName('pageOne', null) // 将name指定的HdsNavDestination页面信息入栈
   25. })
   26. }.width('100%').height('100%')
   27. }
   28. .titleBar({ // HdsNavDestination组件标题栏设置
   29. content: {
   30. title: {
   31. mainTitle: 'PageTwo'
   32. },
   33. menu: {
   34. value: [{
   35. content: {
   36. label: 'menu1',
   37. icon: $r('sys.symbol.trunk'),
   38. }
   39. }]
   40. },
   41. },
   42. })
   43. .onReady((context: NavDestinationContext) => {
   44. this.pageInfos = context.pathStack;
   45. console.log('current page config info is ' + JSON.stringify(context.getConfigInRouteMap()))
   46. })
   47. }
   48. }
   ```
4. 工程entry/src/main/module.json5文件中的“module”下新增如下配置，用于页面跳转。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. "routerMap": "$profile:route_map"
   ```
5. 工程entry/src/main/resources/base/profile目录下增加route\_map.json文件。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. {
   2. "routerMap": [
   3. {
   4. "name": "pageOne",
   5. "pageSourceFile": "src/main/ets/pages/PageOne.ets",
   6. "buildFunction": "PageOneBuilder",
   7. "data": {
   8. "description": "this is pageOne"
   9. }
   10. },
   11. {
   12. "name": "pageTwo",
   13. "pageSourceFile": "src/main/ets/pages/PageTwo.ets",
   14. "buildFunction": "PageTwoBuilder"
   15. }
   16. ]
   17. }
   ```

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/13/v3/i6iFRa-kSqGW2CiGfwHfGw/zh-cn_image_0000002500424082.gif?HW-CC-KV=V1&HW-CC-Date=20260414T041531Z&HW-CC-Expire=86400&HW-CC-Sign=6F7DB6A1E63BA3E2D814D29524F66093654CD27ABEDF48FF9B45A291CDE85B6A "点击放大")