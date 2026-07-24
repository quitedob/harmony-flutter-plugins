组件导航（[Navigation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation)）主要用于实现Navigation页面（[NavDestination](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navdestination)）间的跳转，支持在不同Navigation页面间传递参数，提供灵活的跳转栈操作，从而更便捷地实现对不同页面的访问和复用。本文将从组件导航（Navigation）的显示模式、路由操作、子页面管理、跨包跳转以及跳转动效等几个方面进行详细介绍。

[Navigation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation)是路由导航的根视图容器，一般作为页面（@Entry）的根容器，包括单栏（Stack）、分栏（Split）和自适应（Auto）三种显示模式。Navigation组件适用于模块内和跨模块的路由切换，通过组件级路由能力实现更加自然流畅的转场体验，并提供多种标题栏样式来呈现更好的标题和内容联动效果。一次开发，多端部署场景下，Navigation组件能够自动适配窗口显示大小，在窗口较大的场景下自动切换分栏展示效果。

Navigation组件主要包含​导航页和子页。导航页由标题栏（包含菜单栏）、内容区和工具栏组成，可以通过[hideNavBar](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#hidenavbar9)属性进行隐藏，导航页不存在[路由栈](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#navpathstack10)中，与子页，以及子页之间可以通过路由操作进行切换。

在API version 9上，Navigation需要配合[NavRouter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navrouter)组件实现页面路由。从API version 10开始，更推荐使用[NavPathStack](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#navpathstack10)实现页面路由。

## 设置页面显示模式

[Navigation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation)组件通过[mode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#mode9)属性设置页面的显示模式。

* 自适应模式

  Navigation组件默认为自适应模式，此时mode属性为NavigationMode.Auto。自适应模式下，当页面宽度大于等于一定阈值( API version 9及以前：520vp，API version 10及以后：600vp )时，Navigation组件采用分栏模式，反之采用单栏模式。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Navigation() {
  2. // ···
  3. }
  4. .mode(NavigationMode.Auto)
  ```

  [PageDisplayModeAuto.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template1/PageDisplayModeAuto.ets#L59-L88)
* 单栏模式

  单栏模式适用于窄屏设备，发生路由跳转时，整个页面都会被替换。

  **图1** 单栏布局示意图

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1d/v3/j8Pwxa6ISzmdVANIddIMmQ/zh-cn_image_0000002540770978.png?HW-CC-KV=V1&HW-CC-Date=20260414T034804Z&HW-CC-Expire=86400&HW-CC-Sign=C289D379120941BF065B6A203A0F16B015EA97BAA92627A5C7D37D05B1911A17)

  将mode属性设置为NavigationMode.Stack，Navigation组件即可设置为单栏显示模式。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Navigation() {
  2. // ···
  3. }
  4. .mode(NavigationMode.Stack)
  ```

  [PageDisplayModeStack.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template1/PageDisplayModeStack.ets#L54-L82)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/12/v3/kmym3qmnQuCU3A7JR7ZSIQ/zh-cn_image_0000002571291275.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T034804Z&HW-CC-Expire=86400&HW-CC-Sign=1695AD89CA2E02800E4992E6B24D3015C77C8C4BFBA44216E52A92A4D8AF8301)
* 分栏模式

  分栏模式适用于宽屏设备，分为左右两部分，发生路由跳转时，只有右边子页会被替换。

  **图2** 分栏布局示意图

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/bd/v3/ozBuLqIwR9WEmRD_j1nMFw/zh-cn_image_0000002540611328.png?HW-CC-KV=V1&HW-CC-Date=20260414T034804Z&HW-CC-Expire=86400&HW-CC-Sign=745E44EBAD379F639208BA27AB5B2F3FC0EF2C111B1AF8500B53563EBE041D7E)

  将mode属性设置为NavigationMode.Split，Navigation组件即可设置为分栏显示模式。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { hilog } from '@kit.PerformanceAnalysisKit';
  2. const DOMAIN = 0x0000;
  3. @Entry
  4. @Component
  5. struct PageDisplayModeSplit {
  6. @State toolTmp: ToolbarItem = {
  7. 'value': 'func',
  8. 'icon': 'ets/pages/navigation/template1/image/ic_public_highlights.svg',  // 当前目录image文件夹下的图标资源
  9. 'action': () => {}
  10. };
  11. @Provide('navPathStack') navPathStack: NavPathStack = new NavPathStack();
  12. private arr: number[] = [1, 2, 3];

  14. @Builder
  15. pageMap(name: string) {
  16. if (name === 'NavDestinationTitle1') {
  17. pageOneTmp();
  18. } else if (name === 'NavDestinationTitle2') {
  19. pageTwoTmp();
  20. } else if (name === 'NavDestinationTitle3') {
  21. pageThreeTmp();
  22. }
  23. }

  25. build() {
  26. Column() {
  27. Navigation(this.navPathStack) {
  28. TextInput({ placeholder: 'search...' })
  29. .width('90%')
  30. .height(40)
  31. .backgroundColor('#FFFFFF')

  33. List({ space: 12 }) {
  34. ForEach(this.arr, (item: number) => {
  35. ListItem() {
  36. Text('Page' + item)
  37. .width('100%')
  38. .height(72)
  39. .backgroundColor('#FFFFFF')
  40. .borderRadius(24)
  41. .fontSize(16)
  42. .fontWeight(500)
  43. .textAlign(TextAlign.Center)
  44. .onClick(() => {
  45. this.navPathStack.pushPath({ name: 'NavDestinationTitle' + item });
  46. })
  47. }
  48. }, (item: number) => item.toString())
  49. }
  50. .width('90%')
  51. .margin({ top: 12 })
  52. }
  53. // 请将$r('app.string.mainTitle')替换为实际资源文件，在本示例中该资源文件的value值为"主标题"
  54. .title($r('app.string.mainTitle'))
  55. .mode(NavigationMode.Split)
  56. .navDestination(this.pageMap)
  57. .menus([
  58. {
  59. value: '', icon: 'resources/base/media/ic_public_search.svg', action: () => {
  60. }
  61. },
  62. {
  63. value: '', icon: 'resources/base/media/ic_public_add.svg', action: () => {
  64. }
  65. },
  66. {
  67. value: '', icon: 'resources/base/media/ic_public_search.svg', action: () => {
  68. }
  69. },
  70. {
  71. value: '', icon: 'resources/base/media/ic_public_search.svg', action: () => {
  72. }
  73. },
  74. {
  75. value: '', icon: 'resources/base/media/ic_public_search.svg', action: () => {
  76. }
  77. }
  78. ])
  79. .toolbarConfiguration([this.toolTmp, this.toolTmp, this.toolTmp])
  80. }
  81. .height('100%')
  82. .width('100%')
  83. .backgroundColor('#F1F3F5')
  84. }
  85. }

  87. @Component
  88. export struct pageOneTmp {
  89. @Consume('navPathStack') navPathStack: NavPathStack;
  90. context = this.getUIContext().getHostContext();
  91. build() {
  92. NavDestination() {
  93. Column() {
  94. Text('NavDestinationContent1')
  95. }.width('100%').height('100%')
  96. }.title('NavDestinationTitle1')
  97. .onBackPressed(() => {
  98. const popDestinationInfo = this.navPathStack.pop(); // 弹出路由栈栈顶元素
  99. // $r('app.string.returnValue')需要替换为开发者所需的字符串资源文件，资源文件中的value值为“返回值”
  100. hilog.info(DOMAIN, 'testTag', 'pop', this.context!.resourceManager.getStringSync($r('app.string.returnValue').id),
  101. JSON.stringify(popDestinationInfo));
  102. return true;
  103. })
  104. }
  105. }

  107. @Component
  108. export struct pageTwoTmp {
  109. @Consume('navPathStack') navPathStack: NavPathStack;
  110. context = this.getUIContext().getHostContext();
  111. build() {
  112. NavDestination() {
  113. Column() {
  114. Text('NavDestinationContent2')
  115. }.width('100%').height('100%')
  116. }.title('NavDestinationTitle2')
  117. .onBackPressed(() => {
  118. const popDestinationInfo = this.navPathStack.pop(); // 弹出路由栈栈顶元素
  119. // $r('app.string.returnValue')需要替换为开发者所需的字符串资源文件，资源文件中的value值为“返回值”
  120. hilog.info(DOMAIN, 'testTag', 'pop', this.context!.resourceManager.getStringSync($r('app.string.returnValue').id),
  121. JSON.stringify(popDestinationInfo));
  122. return true;
  123. })
  124. }
  125. }

  127. @Component
  128. export struct pageThreeTmp {
  129. @Consume('navPathStack') navPathStack: NavPathStack;
  130. context = this.getUIContext().getHostContext();
  131. build() {
  132. NavDestination() {
  133. Column() {
  134. Text('NavDestinationContent3')
  135. }.width('100%').height('100%')
  136. }.title('NavDestinationTitle3')
  137. .onBackPressed(() => {
  138. const popDestinationInfo = this.navPathStack.pop(); // 弹出路由栈栈顶元素
  139. // $r('app.string.returnValue')需要替换为开发者所需的字符串资源文件，资源文件中的value值为“返回值”
  140. hilog.info(DOMAIN, 'testTag', 'pop', this.context!.resourceManager.getStringSync($r('app.string.returnValue').id),
  141. JSON.stringify(popDestinationInfo));
  142. return true;
  143. })
  144. }
  145. }
  ```

  [PageDisplayModeSplit.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template1/PageDisplayModeSplit.ets#L15-L161)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ba/v3/8cS4WSunSrysJofiHr9HRQ/zh-cn_image_0000002571171323.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T034804Z&HW-CC-Expire=86400&HW-CC-Sign=DCE1DFF45F83683DA3B4EB552B3E7DD947F43E4EA2A1A8746F1E59274AFFA524)

## 设置标题栏模式

标题栏在界面顶部，用于呈现界面名称和操作入口，Navigation组件通过[titleMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#titlemode)属性设置标题栏模式。

说明

Navigation或NavDestination未设置主副标题并且没有返回键时，不显示标题栏。

* Mini模式

  普通型标题栏，用于一级页面不需要突出标题的场景。

  **图3** Mini模式标题栏

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/85/v3/eJllUbFmSea4PR4gAE-jpA/zh-cn_image_0000002540770980.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T034804Z&HW-CC-Expire=86400&HW-CC-Sign=5D7051ADB7BA66AC6577C7FADA9051B3EFDE4BBE35B0BA44F59FE593FEA75120)

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Navigation() {
  2. // ···
  3. }
  4. .titleMode(NavigationTitleMode.Mini)
  ```

  [TitleModeMini.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template1/TitleModeMini.ets#L54-L64)
* Full模式

  强调型标题栏，用于一级页面需要突出标题的场景。

  **图4** Full模式标题栏

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4/v3/Fp2j6WvLTIKPNts5csKQNA/zh-cn_image_0000002571291277.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T034804Z&HW-CC-Expire=86400&HW-CC-Sign=88F7276FABE416DD6F279756BADA516D523332F2609355881C08A65557DCD0C7)

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Navigation() {
  2. // ···
  3. }
  4. .titleMode(NavigationTitleMode.Full)
  ```

  [TitleModeFull.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template1/TitleModeFull.ets#L54-L64)

## 设置菜单栏

菜单栏位于Navigation组件的右上角，开发者可以通过[menus](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#menus)属性进行设置。menus支持Array<[NavigationMenuItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#navigationmenuitem)>和[CustomBuilder](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#custombuilder8)两种参数类型。使用Array<NavigationMenuItem>类型时，竖屏最多支持显示3个图标，横屏最多支持显示5个图标，多余的图标会被放入自动生成的更多图标。

**图5** 设置了3个图标的菜单栏

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/cc/v3/v0QfipK4Rl2QWkKYyKekgA/zh-cn_image_0000002540611330.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T034804Z&HW-CC-Expire=86400&HW-CC-Sign=5848BA3927B7FBC04B8E2925A15F64AFA131B85706ECC70F4B2315A2253F6542)

收起

自动换行

深色代码主题

复制

```
1. let toolTmp: NavigationMenuItem  = {
2. 'value': 'func',
3. 'icon': 'ets/pages/navigation/template1/image/ic_public_add.svg',
4. 'action': () => {}
5. };
6. // ...
7. Navigation(this.navPathStack) {
8. // ...
9. }
10. .menus([toolTmp, toolTmp, toolTmp])
```

[MenusThreeImage.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template1/MenusThreeImage.ets#L16-L72)

图片也可以引用resources中的资源。

收起

自动换行

深色代码主题

复制

```
1. let toolTmp: NavigationMenuItem  = {
2. 'value': 'func',
3. 'icon': 'resources/base/media/ic_public_add.svg',
4. 'action': () => {}
5. };
6. // ...
7. Navigation(this.navPathStack) {
8. // ...
9. }
10. .menus([toolTmp, toolTmp, toolTmp])
```

[MenusThreeResource.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template1/MenusThreeResource.ets#L16-L72)

**图6** 设置了4个图标的菜单栏

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5f/v3/KBr7Ag9oTuaauqoMKP8ltg/zh-cn_image_0000002571171325.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T034804Z&HW-CC-Expire=86400&HW-CC-Sign=556F60DDA6573C02A597DDC475CCC403B592B658511FCD2B4B0E12CA35889435)

收起

自动换行

深色代码主题

复制

```
1. let toolTmp: NavigationMenuItem  = {
2. 'value': 'func',
3. 'icon': 'ets/pages/navigation/template1/image/ic_public_add.svg',
4. 'action': () => {}
5. };
6. // ...
7. Navigation(this.navPathStack) {
8. // ...
9. }
10. // 竖屏最多支持显示3个图标，多余的图标会被放入自动生成的更多图标
11. .menus([toolTmp, toolTmp, toolTmp, toolTmp])
```

[MenusFour.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template1/MenusFour.ets#L16-L73)

## 设置工具栏

工具栏位于Navigation组件的底部，开发者可以通过[toolbarConfiguration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#toolbarconfiguration10)属性进行设置。

**图7** 工具栏

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/98/v3/nmfUIgK1TU-ZpIsvEaIywg/zh-cn_image_0000002540770982.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T034804Z&HW-CC-Expire=86400&HW-CC-Sign=A89AD90DCA1521258CF8FD94CEE6F834D790AE5C182767FC56091C69F71A61CB)

收起

自动换行

深色代码主题

复制

```
1. let toolTmp: ToolbarItem = {
2. 'value': 'func',
3. 'icon': 'ets/pages/navigation/template1/image/ic_public_highlights.svg',
4. 'action': () => {}
5. };
6. let tooBar: ToolbarItem[] = [toolTmp,toolTmp,toolTmp];
7. // ...
8. Navigation(this.navPathStack) {
9. // ...
10. }
11. .toolbarConfiguration(tooBar)
```

[ToolBar.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template1/ToolBar.ets#L16-L78)

## 路由操作

Navigation路由相关的操作都是基于导航控制器[NavPathStack](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#navpathstack10)提供的方法进行，每个Navigation都需要创建并传入一个NavPathStack对象，用于管理页面。主要涉及页面跳转、页面返回、页面替换、页面删除、参数获取、路由拦截等功能。

从API version 12开始，导航控制器允许被继承。开发者可以在派生类中自定义属性和方法，也可以重写父类的方法。派生类对象可以替代基类NavPathStack对象使用。Navigation中的[NavDestination](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#navdestination10)页面存在于NavPathStack中，以栈的结构管理，我们称为路由栈。具体示例代码参见：[导航控制器继承示例代码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#示例10定义导航控制器派生类)。

说明

1.不建议开发者通过监听生命周期的方式管理自己的路由栈。

2.在应用处于后台状态下，调用NavPathStack的栈操作方法，会在应用再次回到前台状态时触发刷新。

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. struct Index {
4. // 创建一个导航控制器对象并传入Navigation
5. pageStack: NavPathStack = new NavPathStack();
6. // ···
7. build() {
8. Navigation(this.pageStack) {
9. // ···
10. }.title('Main')
11. }
12. }
```

[Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template2/Index.ets#L17-L77)

### 页面跳转

NavPathStack通过Push相关的接口（如[pushPath](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#pushpath10)、[pushPathByName](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#pushpathbyname10)、[pushDestination](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#pushdestination11)、[pushDestinationByName](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#pushdestinationbyname11)）去实现页面跳转的功能，主要分为以下三类：

1. 普通跳转，通过页面的name去跳转，并可以携带param。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. this.pageStack.pushPath({ name: 'pageOne', param: 'PageOne Param' });
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template2/Index.ets#L56-L58)

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. this.pageStack.pushPathByName('pageTwo', 'PageTwo Param');
   ```

   [PageOne.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template2/PageOne.ets#L47-L49)
2. 带返回回调的跳转，跳转时添加onPop回调，能在页面出栈时获取返回信息，并进行处理。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let DOMAIN = 0x0000;
   2. this.pageInfo.pushPathByName('temp4-pageTwo', 'temp4-pageTwo Param', (popInfo) => {
   3. hilog.info(DOMAIN, 'testTag', 'Pop page name is: ', popInfo.info.name, 'result: ',
   4. JSON.stringify(popInfo.result));
   5. // ···
   6. });
   ```

   [PageOne.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template4/PageOne.ets#L40-L50)
3. 带错误码的跳转，跳转结束会触发异步回调，返回错误码信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const DOMAIN = 0x0000;
   2. this.pageStack.pushDestination({
   3. name: 'pageTwo', param: 'PageTwo Param'}).catch((error: BusinessError) => {
   4. hilog.info(DOMAIN, 'testTag', '[pushDestination]failed', 'error code = ', error.code,
   5. 'error.message = ', error.message);
   6. }).then(() => {
   7. hilog.info(DOMAIN, 'testTag', '[pushDestination]success.');
   8. });
   ```

   [PageOne.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template2/PageOne.ets#L56-L65)

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const DOMAIN = 0x0000;
   2. this.pageStack.pushDestinationByName('pageTwo', 'PageTwo Param').catch((error: BusinessError) => {
   3. hilog.info(DOMAIN, 'testTag', '[pushDestinationByName]failed', 'error code = ', error.code,
   4. 'error.message = ', error.message);
   5. }).then(() => {
   6. hilog.info(DOMAIN, 'testTag', '[pushDestinationByName]success.');
   7. });
   ```

   [PageOne.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template2/PageOne.ets#L71-L79)

### 页面返回

NavPathStack通过pop相关接口（如[pop](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#pop10)、[popToName](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#poptoname10)、[popToIndex](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#poptoindex10)、[clear](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#clear10)）去实现页面返回功能。

收起

自动换行

深色代码主题

复制

```
1. // 返回到上一页
2. this.pathStack.pop();
```

[PageTwo.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template2/PageTwo.ets#L54-L57)

收起

自动换行

深色代码主题

复制

```
1. // 返回到上一个pageOne页面
2. this.pathStack.popToName('temp4-pageOne');
```

[PageTwo.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template4/PageTwo.ets#L50-L53)

收起

自动换行

深色代码主题

复制

```
1. // 返回到索引为0的页面
2. this.pathStack.popToIndex(0);
```

[PageTwo.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template4/PageTwo.ets#L61-L64)

收起

自动换行

深色代码主题

复制

```
1. // 返回到根首页（清除栈中所有页面）
2. this.pageStack.clear();
```

[PageOne.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template2/PageOne.ets#L192-L195)

### 页面替换

NavPathStack通过Replace相关接口（如[replacePath](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#replacepath11)、[replacePathByName](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#replacepathbyname11)、[replaceDestination](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#replacedestination18)）去实现页面替换功能。

收起

自动换行

深色代码主题

复制

```
1. // 将栈顶页面替换为pageTwo
2. this.pageStack.replacePath({ name: 'pageTwo', param: 'PageTwo Param' });
3. this.pageStack.replacePathByName('pageTwo', 'PageTwo Param');
```

[PageOne.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template2/PageOne.ets#L137-L141)

收起

自动换行

深色代码主题

复制

```
1. const DOMAIN = 0x0000;
2. // 带错误码的替换，跳转结束会触发异步回调，返回错误码信息
3. this.pageStack.replaceDestination({ name: 'pageTwo', param: 'PageTwo Param' })
4. .catch((error: BusinessError) => {
5. hilog.info(DOMAIN, 'testTag', '[replaceDestination]failed', 'error code = ', error.code,
6. 'error.message = ', error.message);
7. }).then(() => {
8. hilog.info(DOMAIN, 'testTag', '[replaceDestination]success.');
9. })
```

[PageOne.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template2/PageOne.ets#L150-L160)

### 页面删除

NavPathStack通过Remove相关接口（如[removeByName](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#removebyname11)、[removeByIndexes](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#removebyindexes11)、[removeByNavDestinationId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#removebynavdestinationid12)）去实现删除路由栈中特定页面的功能。

收起

自动换行

深色代码主题

复制

```
1. // 删除栈中name为pageTwo的所有页面
2. this.pageStack.removeByName('pageTwo');
```

[PageOne.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template2/PageOne.ets#L113-L116)

收起

自动换行

深色代码主题

复制

```
1. // 删除指定索引的页面
2. this.pageStack.removeByIndexes([1]);
```

[PageOne.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template2/PageOne.ets#L168-L171)

收起

自动换行

深色代码主题

复制

```
1. // 删除指定id的页面
2. this.pageStack.removeByNavDestinationId('1');
```

[PageOne.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template2/PageOne.ets#L180-L183)

### 移动页面

NavPathStack通过Move相关接口（如[moveToTop](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#movetotop10)、[moveIndexToTop](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#moveindextotop10)）去实现移动路由栈中特定页面到栈顶的功能。

收起

自动换行

深色代码主题

复制

```
1. // 移动栈中name为pageTwo的页面到栈顶
2. this.pageStack.moveToTop('pageTwo');
```

[PageOne.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template2/PageOne.ets#L87-L90)

收起

自动换行

深色代码主题

复制

```
1. // 移动栈中索引为1的页面到栈顶
2. this.pageStack.moveIndexToTop(1);
```

[PageOne.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template2/PageOne.ets#L100-L103)

### 参数获取

[NavDestination](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navdestination)子页第一次创建时会触发[onReady](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navdestination#onready11)回调，可以获取此页面对应的参数。

收起

自动换行

深色代码主题

复制

```
1. @Component
2. struct Page01 {
3. pathStack: NavPathStack | undefined = undefined;
4. // ···
5. pageParam: string = '';
6. build() {
7. NavDestination() {
8. // ···
9. .title('Page01')
10. .onReady((context: NavDestinationContext) => {
11. this.pathStack = context.pathStack;
12. this.pageParam = context.pathInfo.param as string;
13. })
14. }
15. }
```

[PageOne.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template7/PageOne.ets#L23-L48)

NavDestination组件中可以通过设置[onResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navdestination#onresult15)接口，接收返回时传递的路由参数。

收起

自动换行

深色代码主题

复制

```
1. class NavParam {
2. desc: string = 'navigation-param'
3. };
4. const DOMAIN = 0x0000;
5. // ···
6. @Component
7. export struct PageOne {
8. // ···
9. build() {
10. NavDestination() {
11. // ···
12. }
13. // ···
14. .onResult((param: Object) => {
15. if (param instanceof NavParam) {
16. console.info('TestTag', 'get NavParam, its desc: ' + (param as NavParam).desc);
17. return;
18. }
19. console.info('TestTag', 'param not instance of NavParam');
20. })
21. }
22. }
```

[PageOne.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template2/PageOne.ets#L17-L260)

其他业务场景，可以通过主动调用NavPathStack的Get相关接口（如[getAllPathName](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#getallpathname10)、[getParamByIndex](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#getparambyindex10)、[getParamByName](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#getparambyname10)、[getIndexByName](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#getindexbyname10)）去获取指定页面的参数。

收起

自动换行

深色代码主题

复制

```
1. // 获取栈中所有页面name集合
2. this.pageStack.getAllPathName();
3. // 获取索引为1的页面参数
4. this.pageStack.getParamByIndex(1);
5. // 获取PageOne页面的参数
6. this.pageStack.getParamByName('PageOne');
7. // 获取PageOne页面的索引集合
8. this.pageStack.getIndexByName('pageOne');
```

[PageOne.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template2/PageOne.ets#L203-L212)

### 路由拦截

NavPathStack提供了[setInterception](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#setinterception12)方法，用于设置Navigation页面跳转拦截回调。该方法需要传入一个[NavigationInterception](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#navigationinterception12)对象，该对象包含多个回调函数，如willShow、didShow等，不同回调函数的调用时机不同，可根据业务需要选择拦截时机。

说明

* 无论是哪个回调，在进入回调时路由栈都已经发生了变化。
* interception回调时机比willShow更早，也可以做拦截重定向的能力，区别是，前者触发时不会创建被拦截的页面，willShow触发时会创建被拦截的页面然后销毁。

以willShow为例，在回调中通过修改路由栈实现路由拦截重定向。

收起

自动换行

深色代码主题

复制

```
1. const DOMAIN = 0x0000;
2. this.pageStack.setInterception({
3. willShow: (from: NavDestinationContext | 'navBar', to: NavDestinationContext | 'navBar',
4. operation: NavigationOperation, animated: boolean) => {
5. if (typeof to === 'string') {
6. hilog.info(DOMAIN, 'testTag', 'target page is navigation home');
7. return;
8. }
9. // 将跳转到PageTwo的路由重定向到PageOne
10. let target: NavDestinationContext = to as NavDestinationContext;
11. if (target.pathInfo.name === 'pageTwo') {
12. target.pathStack.pop();
13. target.pathStack.pushPathByName('pageOne', null);
14. }
15. }
16. })
```

[Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template2/Index.ets#L27-L44)

### 单例跳转

通过设置[LaunchMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#launchmode12枚举说明)为LaunchMode.MOVE\_TO\_TOP\_SINGLETON或LaunchMode.POP\_TO\_SINGLETON，可以实现Navigation路由栈的单实例跳转。单实例跳转的规则如下：

1. 当指定为LaunchMode.MOVE\_TO\_TOP\_SINGLETON时，系统会从栈底到栈顶查找具有指定名称的NavDestination。找到后，该页面将被移动到栈顶（replace操作会用指定的NavDestination替换当前栈顶）。
2. 若指定为LaunchMode.POP\_TO\_SINGLETON，系统同样会从栈底到栈顶查找具有指定名称的NavDestination。找到后，便会移除该NavDestination上方的所有页面（replace操作会用指定的NavDestination替换当前栈顶）。

当栈中存在的NavDestination页面通过单实例方式移动到栈顶时，将触发[onNewParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navdestination#onnewparam19)回调。

有关单实例跳转的示例代码，可以参考[Navigation单例跳转示例](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#示例2使用导航控制器方法)。

## 子页面

[NavDestination](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navdestination)是[Navigation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation)子页面的根容器，用于承载子页面的一些特殊属性以及生命周期等。NavDestination可以设置独立的标题栏和菜单栏等属性，使用方法与Navigation相同。NavDestination也可以通过[mode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navdestination#mode11)属性设置不同的显示类型，用于满足不同页面的诉求。

### 页面显示类型

* 标准类型

  NavDestination组件默认为标准类型，此时mode属性为NavDestinationMode.STANDARD。标准类型的NavDestination的生命周期跟随其在NavPathStack路由栈中的位置变化而改变。
* 弹窗类型

  NavDestination设置mode为NavDestinationMode.DIALOG弹窗类型，此时整个NavDestination默认透明显示。弹窗类型的NavDestination显示和消失时不会影响下层标准类型的NavDestination的显示和生命周期，两者可以同时显示。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // Dialog NavDestination
  2. @Entry
  3. @Component
  4. struct PageDisplayType {
  5. @Provide('NavPathStack') pageStack: NavPathStack = new NavPathStack();

  7. @Builder
  8. PagesMap(name: string) {
  9. if (name == 'DialogPage') {
  10. DialogPage();
  11. }
  12. }

  14. build() {
  15. Navigation(this.pageStack) {
  16. Button('Push DialogPage')
  17. .margin(20)
  18. .width('80%')
  19. .onClick(() => {
  20. this.pageStack.pushPathByName('DialogPage', '');
  21. })
  22. }
  23. .mode(NavigationMode.Stack)
  24. .title('Main')
  25. .navDestination(this.PagesMap)
  26. }
  27. }

  29. @Component
  30. export struct DialogPage {
  31. @Consume('NavPathStack') pageStack: NavPathStack;

  33. build() {
  34. NavDestination() {
  35. Stack({ alignContent: Alignment.Center }) {
  36. Column() {
  37. Text('Dialog NavDestination')
  38. .fontSize(20)
  39. .margin({ bottom: 100 })
  40. Button('Close').onClick(() => {
  41. this.pageStack.pop();
  42. }).width('30%')
  43. }
  44. .justifyContent(FlexAlign.Center)
  45. .backgroundColor(Color.White)
  46. .borderRadius(10)
  47. .height('30%')
  48. .width('80%')
  49. }.height('100%').width('100%')
  50. }
  51. .backgroundColor('rgba(0,0,0,0.5)')
  52. .hideTitleBar(true)
  53. .mode(NavDestinationMode.DIALOG)
  54. }
  55. }
  ```

  [PageDisplayType.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template1/PageDisplayType.ets#L15-L71)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8e/v3/RXl3lx3tRXiYQ56CFABg4A/zh-cn_image_0000002571291279.png?HW-CC-KV=V1&HW-CC-Date=20260414T034804Z&HW-CC-Expire=86400&HW-CC-Sign=6F784BDA4887C5B43328CE72B4CE9F5E99CEE2A59C4C9AAE7F4A0484A6408C74)

### 页面生命周期

Navigation作为路由容器，其生命周期承载在NavDestination组件上，以组件事件的形式开放。

其生命周期大致可分为三类，自定义组件生命周期、通用组件生命周期和自有生命周期。其中，[aboutToAppear](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-custom-component-lifecycle#abouttoappear)和[aboutToDisappear](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-custom-component-lifecycle#abouttodisappear)是自定义组件的生命周期(NavDestination外层包含的自定义组件)，[OnAppear](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-show-hide#onappear)和[OnDisappear](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-show-hide#ondisappear)是组件的通用生命周期。剩下的生命周期为NavDestination独有。

生命周期时序如下图所示：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b3/v3/jTgJT0WeSFy_L-sivs1dkg/zh-cn_image_0000002540611332.png?HW-CC-KV=V1&HW-CC-Date=20260414T034804Z&HW-CC-Expire=86400&HW-CC-Sign=51DC33C8983506E8E6D5FC9640623ED0FC9035AE4BEBB0E44D552953BB92FE72)

* **aboutToAppear**：在创建自定义组件后，执行其build()函数之前执行（NavDestination创建之前），允许在该方法中改变状态变量，更改将在后续执行build()函数中生效。
* **onWillAppear**：NavDestination创建后，挂载到组件树之前执行，在该方法中更改状态变量会在当前帧显示生效。
* **onAppear**：通用生命周期事件，NavDestination组件挂载到组件树时执行。
* **onWillShow**：NavDestination组件布局显示之前执行，此时页面不可见（应用切换到前台不会触发）。
* **onShown**：NavDestination组件布局显示之后执行，此时页面已完成布局。
* **onActive**：NavDestination处于激活态（处于栈顶可操作，且上层无特殊组件遮挡）触发。
* **onWillHide**：NavDestination组件触发隐藏之前执行（应用切换到后台不会触发）。
* **onInactive**：NavDestination组件处于非激活态（处于非栈顶不可操作，或处于栈顶时上层有特殊组件遮挡）触发。
* **onHidden**：NavDestination组件触发隐藏后执行（非栈顶页面push进栈，栈顶页面pop出栈或应用切换到后台）。
* **onWillDisappear**：NavDestination组件即将销毁之前执行，如果有转场动画，会在动画前触发（栈顶页面pop出栈）。
* **onDisAppear**：通用生命周期事件，NavDestination组件从组件树上卸载销毁时执行。
* **aboutToDisappear**：自定义组件析构销毁之前执行，不允许在该方法中改变状态变量。

### 页面监听和查询

为了方便组件跟页面解耦，在NavDestination子页面内部的自定义组件可以通过全局方法监听或查询到页面的一些状态信息。

* 页面信息查询

  自定义组件提供[queryNavDestinationInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-custom-component-api#querynavdestinationinfo)方法，可以在NavDestination内部查询到当前所属页面的信息，返回值为[NavDestinationInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-observer#navdestinationinfo)，若查询不到则返回undefined。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { uiObserver } from '@kit.ArkUI';

  3. // NavDestination内的自定义组件
  4. @Component
  5. struct MyComponent {
  6. navDesInfo: uiObserver.NavDestinationInfo | undefined;
  7. context = this.getUIContext().getHostContext();

  9. aboutToAppear() {
  10. this.navDesInfo = this.queryNavDestinationInfo();
  11. }

  13. build() {
  14. // ···
  15. Column() {
  16. // $r('app.string.onPageName')需要替换为开发者所需的字符串资源文件
  17. Text(this.context!.resourceManager.getStringSync($r('app.string.onPageName').id) + `${this.navDesInfo?.name}`)
  18. }.width('100%').height('100%')
  19. // ···
  20. }
  21. }
  ```

  [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/observer/template1/Index.ets#L15-L41)
* 页面状态监听

  通过[observer.on('navDestinationUpdate')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-observer#uiobserveronnavdestinationupdate)提供的注册接口可以注册NavDestination生命周期变化的监听，使用方式如下：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. const DOMAIN = 0x0000;
  2. uiObserver.on('navDestinationUpdate', (info) => {
  3. hilog.info(DOMAIN, 'testTag', 'NavDestination state update', JSON.stringify(info));
  4. });
  ```

  [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/observer/template2/Index.ets#L39-L44)

  也可以注册页面切换的状态回调，能在页面发生路由切换的时候拿到对应的页面信息[NavDestinationSwitchInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-observer#navdestinationswitchinfo12)，并且提供了UIAbilityContext和UIContext不同范围的监听：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // 在UIAbility中使用
  2. import { UIContext, uiObserver } from '@kit.ArkUI';

  4. // callbackFunc是开发者定义的监听回调函数
  5. function callBackFunc(info: uiObserver.NavDestinationSwitchInfo) {
  6. // ···
  7. };
  8. // ···
  9. uiObserver.on('navDestinationSwitch', this.context, callBackFunc);
  10. // ···

  12. // ···
  13. // 可以通过窗口的getUIContext()方法获取对应的UIContent
  14. uiContext: UIContext | null = null;
  15. // ···
  16. uiObserver.on('navDestinationSwitch', this.uiContext, callBackFunc);
  17. // ···
  ```

  [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/observer/template3/Index.ets#L17-L67)

## 页面转场

[Navigation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation)默认提供了页面切换的转场动画，通过导航控制器操作时，会触发不同的转场效果（API version 13之前，[Dialog](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-base-dialog-overview)类型的页面默认无转场动画。从API version13开始，Dialog类型的页面支持系统转场动画。），Navigation也提供了关闭系统转场、自定义转场以及共享元素转场的能力。系统默认动画时长由物理曲线参数决定，不同设备上动画时长存在差异。

### 关闭转场

* 全局关闭

  Navigation通过NavPathStack中提供的[disableAnimation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#disableanimation11)方法可以在当前Navigation中关闭或打开所有转场动画。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. pageStack: NavPathStack = new NavPathStack();

  3. aboutToAppear(): void {
  4. this.pageStack.disableAnimation(true);
  5. }
  ```

  [PageAnimated.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template1/PageAnimated.ets#L34-L40)
* 单次关闭

  NavPathStack中提供的Push、Pop、Replace等接口中可以设置animated参数，默认为true表示有转场动画，需要单次关闭转场动画可以置为false，不影响下次转场动画。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. @Provide('pageStack') pageStack: NavPathStack = new NavPathStack();
  ```

  [PageOnceClose.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template1/PageOnceClose.ets#L19-L21)

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. this.pageStack.pushPath({ name: 'MyComponent' }, false);
  ```

  [PageOnceClose.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template1/PageOnceClose.ets#L31-L33)

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. this.pageStack.pop(false);
  ```

  [PageOnceClose.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template1/PageOnceClose.ets#L53-L55)

### 自定义转场

* Navigation自定义转场

  Navigation自定义转场动画能力通过[customNavContentTransition](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#customnavcontenttransition11)事件提供，可以通过以下三步定义自定义转场动画：

  1. 构建一个自定义转场动画工具类CustomNavigationUtils，通过一个Map管理各页面的自定义动画对象CustomTransition。页面在创建时注册其自定义转场动画对象，在销毁时取消注册。
  2. 实现一个转场协议对象[NavigationAnimatedTransition](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#navigationanimatedtransition11)。其中，timeout属性表示转场结束的超时时间，默认为1000ms，transition属性为自定义的转场动画方法。开发者需在此实现自己的转场动画逻辑，系统在转场开始时会调用此方法，onTransitionEnd为转场结束时的回调。
  3. 调用customNavContentTransition方法并返回实现的转场协议对象，若返回undefined，则使用系统默认转场。

  具体示例代码可参考[Navigation自定义转场示例](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#示例3设置可交互转场动画)。
* NavDestination自定义转场

  [NavDestination](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navdestination)支持自定义转场动画，通过设置[customTransition](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navdestination#customtransition15)属性即可实现单个页面的自定义转场效果。要实现这一功能，需完成以下步骤：

  1. 实现[NavDestination的转场代理](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navdestination#navdestinationtransitiondelegate15)，针对不同的堆栈操作类型返回自定义的转场协议对象[NavDestinationTransition](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navdestination#navdestinationtransition15)。其中，event是必填参数，需在此处编写自定义转场动画的逻辑；而onTransitionEnd、duration、curve与delay为可选参数，分别对应动画结束后的回调、动画持续时间、动画曲线类型与开始前的延时。若在转场代理中返回多个转场协议对象，这些动画效果将逐层叠加。
  2. 通过调用NavDestination组件的customTransition属性，并传入上述实现的转场代理，完成自定义转场的设置。

  具体示例代码可以参考[NavDestination自定义转场示例](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navdestination#示例2设置navdestination自定义转场)。
* 使用建议

  1. Navigation自定义转场[customNavContentTransition](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#customnavcontenttransition11)适用于控制Navigation内所有页面，统一转场动画效果。
  2. NavDestination自定义转场[customTransition](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navdestination#customtransition15)适用于控制单个页面的转场效果。
  3. 在同时使用[customNavContentTransition](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#customnavcontenttransition11)和[customTransition](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navdestination#customtransition15)时，customNavContentTransition优先级更高。

### 共享元素转场

NavDestination之间切换时可以通过[geometryTransition](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-transition-animation-geometrytransition#geometrytransition)实现共享元素转场。配置了共享元素转场的页面同时需要关闭系统默认的转场动画。

1. 为需要实现共享元素转场的组件添加geometryTransition属性，id参数必须在两个NavDestination之间保持一致。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 起始页配置共享元素id
   2. NavDestination() {
   3. Column() {
   4. // ...
   5. // 请将$r('app.media.startIcon')替换为实际资源文件
   6. Image($r('app.media.startIcon'))
   7. .geometryTransition('sharedId')
   8. .width(100)
   9. .height(100)
   10. }
   11. }.title('FromPage')
   ```

   [GeometryTransition.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template1/GeometryTransition.ets#L21-L48)

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 目的页配置共享元素id
   2. NavDestination() {
   3. Column() {
   4. // 请将$r('app.media.startIcon')替换为实际资源文件
   5. Image($r('app.media.startIcon'))
   6. .geometryTransition('sharedId')
   7. .width(200)
   8. .height(200)
   9. }
   10. }
   11. .title('ToPage')
   ```

   [GeometryTransition.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template1/GeometryTransition.ets#L57-L69)
2. 将页面路由的操作，放到animateTo动画闭包中，配置对应的动画参数以及关闭系统默认的转场。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. NavDestination() {
   2. Column() {
   3. // $r('app.string.ToPage')资源文件中的value值为“跳转到目的页”
   4. Button($r('app.string.ToPage'))
   5. .width('80%')
   6. .height(40)
   7. .margin(20)
   8. .onClick(() => {
   9. this.getUIContext()?.animateTo({ duration: 1000 }, () => {
   10. this.navPathStack.pushPath({ name: 'ToPage' }, false)
   11. });
   12. })
   13. // ...
   14. }
   15. }.title('FromPage')
   ```

   [GeometryTransition.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template1/GeometryTransition.ets#L23-L47)

## 跨包路由

系统提供[系统路由表](/consumer/cn/doc/harmonyos-guides/arkts-navigation-navigation#系统路由表)和[自定义路由表](/consumer/cn/doc/harmonyos-guides/arkts-navigation-navigation#自定义路由表)两种实现方式。

* 系统路由表相对自定义路由表，使用更简单，只需要添加对应页面跳转配置项，即可实现页面跳转。
* 自定义路由表使用起来更复杂，但是可以根据应用业务进行定制处理。

支持自定义路由表和系统路由表混用。

### 路由表能力对比

不同路由方式适用于不同需求，易用性或可扩展性需根据项目特点权衡选择。

展开

| 路由方式 | 跨包跳转能力 | 可扩展性 | 易用性 |
| --- | --- | --- | --- |
| [系统路由表](/consumer/cn/doc/harmonyos-guides/arkts-navigation-navigation#系统路由表) | 跳转前无需import页面文件，页面按需动态加载。 | 可扩展性一般。 | 易用性更强，系统自动维护路由表。 |
| [自定义路由表](/consumer/cn/doc/harmonyos-guides/arkts-navigation-navigation#自定义路由表) | 跳转前需要import页面文件。 | 可扩展性更强。 | 易用性一般，需要开发者自行维护路由表。 |

### 系统路由表

系统路由表是动态路由的一种实现方式。从API version 12开始，[Navigation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation)支持使用系统路由表的方式进行动态路由。各业务模块（[HSP](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/in-app-hsp)/[HAR](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/har-package)）中需要独立配置router\_map.json文件，在触发路由跳转时，应用只需要通过NavPathStack提供的路由方法，传入需要路由的页面配置名称，此时系统会自动完成路由模块的动态加载、页面组件构建，并完成路由跳转，从而实现了开发层面的模块解耦。系统路由表支持模拟器但不支持预览器。其主要步骤如下：

1. 在跳转目标模块的配置文件[module.json5](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/module-configuration-file)添加路由表配置：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. {
   2. "module": {
   3. // ···
   4. "routerMap": "$profile:router_map",
   5. // ···
   6. }
   7. }
   ```

   [module.json5](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/module.json5#L15-L72)
2. 添加完路由配置文件地址后，需要在工程resources/base/profile中创建router\_map.json文件。添加如下配置信息：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. {
   2. "routerMap": [
   3. {
   4. "name": "PageOne",
   5. "pageSourceFile": "src/main/ets/pages/PageOne.ets",
   6. "buildFunction": "PageOneBuilder",
   7. "data": {
   8. "description" : "this is PageOne"
   9. }
   10. }
   11. ]
   12. }
   ```

   配置说明如下：

   展开

   | 配置项 | 说明 |
   | --- | --- |
   | name | 可自定义的跳转页面名称。 |
   | pageSourceFile | 跳转目标页在包内的路径，相对src目录的相对路径。 |
   | buildFunction | 跳转目标页的入口函数名称，必须以@Builder修饰。 |
   | data | 应用自定义字段。可以通过配置项读取接口getConfigInRouteMap获取。 |
3. 在跳转目标页面中，需要配置入口Builder函数，函数名称需要和router\_map.json配置文件中的buildFunction保持一致，否则在编译时会报错。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 跳转页面入口函数
   2. @Builder
   3. export function PageOneBuilder() {
   4. PageOne();
   5. }

   7. @Component
   8. struct PageOne {
   9. pathStack: NavPathStack = new NavPathStack();

   11. build() {
   12. NavDestination() {
   13. }
   14. .title('PageOne')
   15. .onReady((context: NavDestinationContext) => {
   16. this.pathStack = context.pathStack;
   17. })
   18. }
   19. }
   ```

   [PageOne.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template1/PageOne.ets#L30-L50)
4. 通过[pushPathByName](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#pushpathbyname10)等路由接口进行页面跳转。(注意：此时Navigation中可以不用配置[navDestination](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#navdestination10)属性。)

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @Component
   3. struct SystemRoutingTable {
   4. pageStack : NavPathStack = new NavPathStack();

   6. build() {
   7. Navigation(this.pageStack){
   8. }.onAppear(() => {
   9. this.pageStack.pushPathByName('PageOne', null, false);
   10. })
   11. .hideNavBar(true)
   12. }
   13. }
   ```

   [PageOne.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template1/PageOne.ets#L15-L29)

### 自定义路由表

自定义路由表通过给Navigation的[navDestination](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#navdestination10)属性设置Builder函数实现，其特点是需要import页面。有两种import页面的方式，静态import和动态import，二者的区别在于：

展开

| import方式 | 模块间耦合度 | 实现复杂度 | 性能 |
| --- | --- | --- | --- |
| 动态import | 模块间解耦。 | 复杂度高。 | 性能好，按需加载，跳转前再加载对应页面。 |
| 静态import | 模块间耦合。 | 复杂度低。 | 性能一般，初始化时一次性加载所有依赖的页面。 |

**动态import（推荐）**

动态import旨在解决多个模块（HAR/HSP）能够复用相同的业务逻辑，实现各业务模块间的解耦，同时支持路由功能的扩展与整合，可以按需import，具体实现方法请参考[Navigation自定义动态路由](https://gitcode.com/harmonyos-cases/cases/blob/master/CommonAppDevelopment/common/routermodule/README_AUTO_GENERATE.md)示例。

动态import的优势：

* 路由定义除了跳转的URL以外，可以配置丰富的扩展信息，如横竖屏默认模式、是否需要鉴权等等，做路由跳转时统一处理。
* 给每个路由页面设置一个名字，按照名称进行跳转而不是文件路径。
* 页面的加载可以使用动态import（按需加载），防止首个页面加载大量代码导致卡顿。

实现方案：

1. 定义页面跳转配置项。
   * 使用资源文件进行定义，通过资源管理[@ohos.resourceManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-resource-manager)在运行时对资源文件解析。
   * 在ets文件中配置路由加载配置项，一般包括路由页面名称（即pushPath等接口中页面的别名），文件所在模块名称（hsp/har的模块名），加载页面在模块内的路径（相对src目录的路径）。
2. 加载目标跳转页面，通过[动态import](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-dynamic-import)将跳转目标页面所在的模块在运行时加载，在模块加载完成后，调用模块中的方法，通过import在模块的方法中加载模块中显示的目标页面，并返回页面加载完成后定义的Builder函数。
3. 触发页面跳转，在Navigation的[navDestination](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#navdestination10)属性执行步骤2中加载的Builder函数，即可跳转到目标页面。

**静态import**

静态import实现方式简单，但通过静态import页面进行路由跳转会导致不同模块之间的依赖耦合，并增加首页加载时间长等问题。建议使用[自定义路由表](/consumer/cn/doc/harmonyos-guides/arkts-navigation-navigation#自定义路由表)的动态import或[系统路由表](/consumer/cn/doc/harmonyos-guides/arkts-navigation-navigation#系统路由表)。

实现方案：

收起

自动换行

深色代码主题

复制

```
1. import { hilog } from '@kit.PerformanceAnalysisKit';
2. const DOMAIN = 0x0000;
3. @Entry
4. @Component
5. struct NavigationExample {
6. @Provide('navPathStack') navPathStack: NavPathStack = new NavPathStack();
7. private arr: number[] = [1, 2];

9. @Builder
10. pageMap(name: string) {
11. if (name === 'NavDestinationTitle1') {
12. pageOneTmp();
13. } else if (name === 'NavDestinationTitle2') {
14. pageTwoTmp();
15. }
16. }

18. build() {
19. Column() {
20. Navigation(this.navPathStack) {
21. TextInput({ placeholder: 'search...' })
22. .width('90%')
23. .height(40)

25. List({ space: 12 }) {
26. ForEach(this.arr, (item: number) => {
27. ListItem() {
28. Text('Page' + item)
29. .width('100%')
30. .height(72)
31. .borderRadius(24)
32. .fontSize(16)
33. .fontWeight(500)
34. .textAlign(TextAlign.Center)
35. .onClick(() => {
36. this.navPathStack.pushPath({ name: 'NavDestinationTitle' + item });
37. })
38. }
39. }, (item: number) => item.toString())
40. }
41. .width('90%')
42. .margin({ top: 12 })
43. }
44. // $r('app.string.mainTitle')需要替换为开发者所需的字符串资源文件
45. .title($r('app.string.mainTitle'))
46. .navDestination(this.pageMap)
47. .mode(NavigationMode.Split)
48. }
49. .height('100%')
50. .width('100%')
51. }
52. }

54. @Component
55. export struct pageTwoTmp {
56. @Consume('navPathStack') navPathStack: NavPathStack;
57. context = this.getUIContext().getHostContext();
58. build() {
59. NavDestination() {
60. Column() {
61. Text('NavDestinationContent2')
62. }.width('100%').height('100%')
63. }.title('NavDestinationTitle2')
64. .onBackPressed(() => {
65. const popDestinationInfo = this.navPathStack.pop(); // 弹出路由栈的栈顶元素
66. // $r('app.string.returnValue')需要替换为开发者所需的字符串资源文件
67. hilog.info(DOMAIN, 'testTag', 'pop', this.context!.resourceManager.getStringSync($r('app.string.returnValue').id),
68. JSON.stringify(popDestinationInfo));
69. return true;
70. })
71. }
72. }

74. @Component
75. export struct pageOneTmp {
76. @Consume('navPathStack') navPathStack: NavPathStack;
77. context = this.getUIContext().getHostContext();
78. build() {
79. NavDestination() {
80. Column() {
81. Text('NavDestinationContent1')
82. }.width('100%').height('100%')
83. }.title('NavDestinationTitle1')
84. .onBackPressed(() => {
85. const popDestinationInfo = this.navPathStack.pop(); // 弹出路由栈的栈顶元素
86. // $r('app.string.returnValue')需要替换为开发者所需的字符串资源文件
87. hilog.info(DOMAIN, 'testTag', 'pop', this.context!.resourceManager.getStringSync($r('app.string.returnValue').id),
88. JSON.stringify(popDestinationInfo));
89. return true;
90. })
91. }
92. }
```

[CustomRoutingTable.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template1/CustomRoutingTable.ets#L15-L108)

## 导航示例

### 创建导航首页

实现步骤为：

1.使用[Navigation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation)创建导航主页，并创建导航控制器NavPathStack以此来实现不同页面之间的跳转。

2.在Navigation中增加[List](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-list)组件，来定义导航主页中不同的一级界面。

3.在List内的组件添加onClick方法，并在其中使用导航控制器NavPathStack的[pushPathByName](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#pushpathbyname10)方法，使组件可以在点击之后从当前页面跳转到输入参数name在路由表内对应的页面。

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. struct NavigationDemo {
4. @Provide('navPathStack') navPathStack: NavPathStack = new NavPathStack();
5. private listArray: Array<string> = ['WLAN', 'Bluetooth', 'Personal Hotspot', 'Connect & Share'];
6. context = this.getUIContext().getHostContext();
7. build() {
8. Column() {
9. Navigation(this.navPathStack) {
10. // 请将$r('app.string.enterKeyWordsToSearch')替换为实际资源文件，在本示例中该资源文件的value值为"输入关键字搜索"
11. TextInput({ placeholder: $r('app.string.enterKeyWordsToSearch') })
12. .width('90%')
13. .height(40)
14. .margin({ bottom: 10 })

16. // 通过List定义导航的一级界面
17. List({ space: 12, initialIndex: 0 }) {
18. ForEach(this.listArray, (item: string) => {
19. ListItem() {
20. Row() {
21. Row() {
22. Text(`${item.slice(0, 1)}`)
23. .fontColor(Color.White)
24. .fontSize(14)
25. .fontWeight(FontWeight.Bold)
26. }
27. .width(30)
28. .height(30)
29. .backgroundColor('#a8a8a8')
30. .margin({ right: 20 })
31. .borderRadius(20)
32. .justifyContent(FlexAlign.Center)

34. Column() {
35. Text(item)
36. .fontSize(16)
37. .margin({ bottom: 5 })
38. }
39. .alignItems(HorizontalAlign.Start)

41. Blank()

43. Row()
44. .width(12)
45. .height(12)
46. .margin({ right: 15 })
47. .border({
48. width: { top: 2, right: 2 },
49. color: 0xcccccc
50. })
51. .rotate({ angle: 45 })
52. }
53. .borderRadius(15)
54. .shadow({ radius: 100, color: '#ededed' })
55. .width('90%')
56. .alignItems(VerticalAlign.Center)
57. .padding({ left: 15, top: 15, bottom: 15 })
58. .backgroundColor(Color.White)
59. }
60. .width('100%')
61. .onClick(() => {
62. // $r('app.string.detailsPageParameters')需要替换为开发者所需的字符串资源文件
63. this.navPathStack.pushPathByName(`${item}`,
64. // 将name指定的NaviDestination页面信息入栈,传递的参数为param
65. this.context!.resourceManager.getStringSync($r('app.string.detailsPageParameters').id));
66. })
67. }, (item: string): string => item)
68. }
69. .listDirection(Axis.Vertical)
70. .edgeEffect(EdgeEffect.Spring)
71. .sticky(StickyStyle.Header)
72. .chainAnimation(false)
73. .width('100%')
74. }
75. .width('100%')
76. .mode(NavigationMode.Auto)
77. // $r('app.string.settings')需要替换为开发者所需的字符串资源文件
78. .title($r('app.string.settings')) // 设置标题文字
79. }
80. .size({ width: '100%', height: '100%' })
81. .backgroundColor(0xf4f4f5)
82. }
83. }
```

[NavigationExample.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template1/NavigationExample.ets#L15-L99)

### 创建导航子页

导航子页1实现步骤为：

1.使用[NavDestination](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navdestination)，来创建导航子页PageOne。

2.创建导航控制器[NavPathStack](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#navpathstack10)并在[onReady](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navdestination#onready11)时进行初始化，获取当前所在的导航控制器，以此来实现不同页面之间的跳转。

3.在子页面内的组件添加onClick，并在其中使用导航控制器NavPathStack的[pop](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#pop10)方法，使组件可以在点击之后弹出路由栈栈顶元素实现页面的返回。

收起

自动换行

深色代码主题

复制

```
1. @Builder
2. export function PageOneBuilder(name: string, param: string) {
3. PageOne({ name: name, value: param });
4. }

6. @Component
7. export struct PageOne {
8. navPathStack: NavPathStack = new NavPathStack();
9. name: string = '';
10. @State value: string = '';
11. context = this.getUIContext().getHostContext();

13. build() {
14. NavDestination() {
15. Column() {
16. // $r('app.string.settingPage')需要替换为开发者所需的字符串资源文件
17. Text(`${this.name}${this.context!.resourceManager.getStringSync($r('app.string.settingPage').id)}`)
18. .width('100%')
19. .fontSize(20)
20. .fontColor(0x333333)
21. .textAlign(TextAlign.Center)
22. .textShadow({
23. radius: 2,
24. offsetX: 4,
25. offsetY: 4,
26. color: 0x909399
27. })
28. .padding({ top: 30 })
29. Text(`${JSON.stringify(this.value)}`)
30. .width('100%')
31. .fontSize(18)
32. .fontColor(0x666666)
33. .textAlign(TextAlign.Center)
34. .padding({ top: 45 })
35. // $r('app.string.stepperIndex_text24')需要替换为开发者所需的字符串资源文件
36. Button($r('app.string.return'))
37. .width('50%')
38. .height(40)
39. .margin({ top: 50 })
40. .onClick(() => {
41. // 弹出路由栈栈顶元素，返回上个页面
42. this.navPathStack.pop();
43. })
44. }
45. .size({ width: '100%', height: '100%' })
46. }.title(`${this.name}`)
47. .onReady((ctx: NavDestinationContext) => {
48. // NavDestinationContext获取当前所在的导航控制器
49. this.navPathStack = ctx.pathStack;
50. })
51. }
52. }
```

[NavigationExampleOne.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template1/NavigationExampleOne.ets#L15-L68)

导航子页2实现步骤为：

1.使用NavDestination，来创建导航子页PageTwo。

2.创建导航控制器NavPathStack并在onReady时进行初始化，获取当前所在的导航控制器，以此来实现不同页面之间的跳转。

3.在子页面内的组件添加onClick，并在其中使用导航控制器NavPathStack的[pushPathByName](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#pushpathbyname10)方法，使组件可以在点击之后从当前页面跳转到输入参数name在路由表内对应的页面。

收起

自动换行

深色代码主题

复制

```
1. @Builder
2. export function PageTwoBuilder(name: string) {
3. PageTwo({ name: name });
4. }

6. @Component
7. export struct PageTwo {
8. navPathStack: NavPathStack = new NavPathStack();
9. name: string = '';
10. private listArray: Array<string> = ['Projection', 'Print', 'VPN', 'Private DNS', 'NFC'];
11. context = this.getUIContext().getHostContext();
12. build() {
13. NavDestination() {
14. Column() {
15. List({ space: 12, initialIndex: 0 }) {
16. ForEach(this.listArray, (item: string) => {
17. ListItem() {
18. Row() {
19. Row() {
20. Text(`${item.slice(0, 1)}`)
21. .fontColor(Color.White)
22. .fontSize(14)
23. .fontWeight(FontWeight.Bold)
24. }
25. .width(30)
26. .height(30)
27. .backgroundColor('#a8a8a8')
28. .margin({ right: 20 })
29. .borderRadius(20)
30. .justifyContent(FlexAlign.Center)

32. Column() {
33. Text(item)
34. .fontSize(16)
35. .margin({ bottom: 5 })
36. }
37. .alignItems(HorizontalAlign.Start)

39. Blank()

41. Row()
42. .width(12)
43. .height(12)
44. .margin({ right: 15 })
45. .border({
46. width: { top: 2, right: 2 },
47. color: 0xcccccc
48. })
49. .rotate({ angle: 45 })
50. }
51. .borderRadius(15)
52. .shadow({ radius: 100, color: '#ededed' })
53. .width('90%')
54. .alignItems(VerticalAlign.Center)
55. .padding({ left: 15, top: 15, bottom: 15 })
56. .backgroundColor(Color.White)
57. }
58. .width('100%')
59. .onClick(() => {
60. this.navPathStack.pushPathByName(`${item}`,
61. this.context!.resourceManager.getStringSync($r('app.string.pageSettingParam').id));
62. })
63. }, (item: string): string => item)
64. }
65. .listDirection(Axis.Vertical)
66. .edgeEffect(EdgeEffect.Spring)
67. .sticky(StickyStyle.Header)
68. .width('100%')
69. }
70. .size({ width: '100%', height: '100%' })
71. }.title(`${this.name}`)
72. .onReady((ctx: NavDestinationContext) => {
73. // NavDestinationContext获取当前所在的导航控制器
74. this.navPathStack = ctx.pathStack;
75. })
76. }
77. }
```

[NavigationExampleTwo.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NavigationSample/entry/src/main/ets/pages/navigation/template1/NavigationExampleTwo.ets#L15-L94)

### 创建路由跳转

实现步骤为：

1.工程配置文件[module.json5](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/module-configuration-file)中配置 {"routerMap": "$profile:router\_map"}。

2.router\_map.json中配置全局路由表，导航控制器NavPathStack可根据路由表中的name将对应页面信息入栈。

收起

自动换行

深色代码主题

复制

```
1. {
2. "routerMap" : [
3. {
4. "name" : "WLAN",
5. "pageSourceFile"  : "src/main/ets/pages/PageOne.ets",
6. "buildFunction" : "PageOneBuilder"
7. },
8. {
9. "name" : "Bluetooth",
10. "pageSourceFile"  : "src/main/ets/pages/PageOne.ets",
11. "buildFunction" : "PageOneBuilder"
12. },
13. {
14. "name" : "Personal Hotspot",
15. "pageSourceFile"  : "src/main/ets/pages/PageOne.ets",
16. "buildFunction" : "PageOneBuilder"
17. },
18. {
19. "name" : "Connect & Share",
20. "pageSourceFile"  : "src/main/ets/pages/PageTwo.ets",
21. "buildFunction" : "PageTwoBuilder"
22. },
23. {
24. "name" : "Projection",
25. "pageSourceFile"  : "src/main/ets/pages/PageOne.ets",
26. "buildFunction" : "PageOneBuilder"
27. },
28. {
29. "name" : "Print",
30. "pageSourceFile"  : "src/main/ets/pages/PageOne.ets",
31. "buildFunction" : "PageOneBuilder"
32. },
33. {
34. "name" : "VPN",
35. "pageSourceFile"  : "src/main/ets/pages/PageOne.ets",
36. "buildFunction" : "PageOneBuilder"
37. },
38. {
39. "name" : "Private DNS",
40. "pageSourceFile"  : "src/main/ets/pages/PageOne.ets",
41. "buildFunction" : "PageOneBuilder"
42. },
43. {
44. "name" : "NFC",
45. "pageSourceFile"  : "src/main/ets/pages/PageOne.ets",
46. "buildFunction" : "PageOneBuilder"
47. }
48. ]
49. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6c/v3/DITw9RYwQBWC8KCpVUJdJA/zh-cn_image_0000002571171327.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034804Z&HW-CC-Expire=86400&HW-CC-Sign=06D6D7199FED2142C6F0D311E2CE30198AC2AB554685DC5710602D2977651B30)

## 示例代码

* [Navigation系统路由](https://gitcode.com/HarmonyOS_Samples/system-router-map)