从API version 18开始支持弧形列表。弧形列表是一种专为圆形屏幕设备设计的特殊列表，它能够以结构化、可滚动的形式高效展示信息。具体用法可参考[ArcList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclist)。

使用弧形列表可以通过在[ArcList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclist)组件中按垂直方向线性排列子组件[ArcListItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclistitem)，可以为弧形列表中的每一项提供独立视图。此外，可以使用[循环渲染](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-rendering-control-foreach)来迭代一组列表项，或结合任意数量的单个视图与[ForEach](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-rendering-control-foreach)结构，构建复杂的弧形列表。[ArcList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclist)组件支持多种[渲染控制](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-rendering-control-overview)方式，包括条件渲染、循环渲染和懒加载，以生成子组件。

## 创建弧形列表

[ArcList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclist)可通过调用以下接口来创建。

收起

自动换行

深色代码主题

复制

```
1. ArcList({
2. initialIndex: 2
3. }) {
4. ArcListItem() {
5. // ···
6. }
7. ArcListItem() {
8. // ···
9. }
10. // ···
11. }
```

[ArcListCreate.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/arcList/ArcListCreate.ets#L31-L57)

说明

[ArcList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclist)的子组件必须是[ArcListItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclistitem)，[ArcListItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclistitem)必须配合[ArcList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclist)来使用。

## 在弧形列表中显示数据

弧形列表视图垂直展示项目集合，当列表项超出屏幕范围时，提供滚动功能，这使得它非常适合展示大型数据集合。在最简单的弧形列表形式中，[ArcList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclist)静态创建其列表项[ArcListItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclistitem)的内容。

收起

自动换行

深色代码主题

复制

```
1. import { ArcList, ArcListItem, ArcListAttribute, ArcListItemAttribute, LengthMetrics } from '@kit.ArkUI';

3. @Entry
4. @Component
5. export struct ArcListShow {
6. build() {
7. NavDestination() {
8. Column({ space: 12 }) {
9. // ...
10. ArcList({ initialIndex: 2 }) {
11. ArcListItem() {
12. Row() {
13. Image($r('app.media.wlan')).width('99px').height('99px')
14. .borderRadius('50px').margin({ left: 7 })
15. Column() {
16. Text($r('app.string.ArcListStyles_waln')).fontSize('38px').fontColor('#FFFFFFFF')
17. Text($r('app.string.ArcListStyles_open')).fontSize('20px').fontColor('#FFFFFFFF')
18. }.width('190px')

20. Image($r('app.media.ic_settings_arrow')).width('92px').height('92px')
21. .borderRadius('50px')
22. }
23. }
24. .borderRadius('65px')
25. .width('414px')
26. .height('129px')
27. .backgroundColor('#26FFFFFF')

29. ArcListItem() {
30. Row() {
31. Image($r('app.media.blueTooth')).width('99px').height('99px')
32. .borderRadius('50px').margin({ left: 7 })
33. Column() {
34. Text($r('app.string.ArcListStyles_blue')).fontSize('38px').fontColor('#FFFFFFFF')
35. Text($r('app.string.ArcListStyles_open')).fontSize('20px').fontColor('#FFFFFFFF')
36. }.width('190px')

38. Image($r('app.media.ic_settings_arrow')).width('92px').height('92px')
39. .borderRadius('50px')
40. }
41. }
42. .borderRadius('65px')
43. .width('414px')
44. .height('129px')
45. .backgroundColor('#26FFFFFF')

47. ArcListItem() {
48. Row() {
49. Image($r('app.media.mobileData')).width('99px').height('99px')
50. .borderRadius('50px').margin({ left: 7 })
51. Column() {
52. Text($r('app.string.ArcListStyles_net')).fontSize('38px').fontColor('#FFFFFFFF')
53. }.width('190px')

55. Image($r('app.media.ic_settings_arrow')).width('92px').height('92px')
56. .borderRadius('50px')
57. }
58. }
59. .borderRadius('65px')
60. .width('414px')
61. .height('129px')
62. .backgroundColor('#26FFFFFF')

64. ArcListItem() {
65. Row() {
66. Image($r('app.media.ic_settings_more_connections')).width('99px').height('99px')
67. .borderRadius('50px').margin({ left: 7 })
68. Column() {
69. Text($r('app.string.ArcListStyles_connect')).fontSize('38px').fontColor('#FFFFFFFF')
70. }.width('190px')

72. Image($r('app.media.ic_settings_arrow')).width('92px').height('92px')
73. .borderRadius('50px')
74. }
75. }
76. .borderRadius('65px')
77. .width('414px')
78. .height('129px')
79. .backgroundColor('#26FFFFFF')

81. ArcListItem() {
82. Row() {
83. Image($r('app.media.displayAndBrightness')).width('99px').height('99px')
84. .borderRadius('50px').margin({ left: 7 })
85. Column() {
86. Text($r('app.string.ArcListStyles_light')).fontSize('38px').fontColor('#FFFFFFFF')
87. }.width('190px')

89. Image($r('app.media.ic_settings_arrow')).width('92px').height('92px')
90. .borderRadius('50px')
91. }
92. }
93. .borderRadius('65px')
94. .width('414px')
95. .height('129px')
96. .backgroundColor('#26FFFFFF')
97. }
98. .width('466px')
99. .height('466px')
100. .space(LengthMetrics.px(10))
101. .borderRadius('233px')
102. .backgroundColor(Color.Black)
103. }
104. // ...
105. }
106. .backgroundColor('#f1f2f3')
107. // 请将$r('app.string.ArcListShow_title')替换为实际资源文件，在本示例中该资源文件的value值为"在弧形列表中显示数据"
108. .title($r('app.string.ArcListShow_title'))
109. }
110. }
```

[ArcListShow.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/arcList/ArcListShow.ets#L16-L131)

**图1** 显示弧形列表数据

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d2/v3/U-6eHvEbSmKs10wELfSFmQ/zh-cn_image_0000002540771052.png?HW-CC-KV=V1&HW-CC-Date=20260414T034906Z&HW-CC-Expire=86400&HW-CC-Sign=4C7C450897725180E52E4BA695B7E1F11EC035358BD8D22FE41AB9935E4FC6F9)

## 迭代弧形列表内容

通常，应用会通过数据集合动态创建列表。采用[循环渲染](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-rendering-control-foreach)的方式，可以从数据源中迭代获取数据，在每次迭代过程中创建相应的组件，从而降低代码的复杂度。

ArkTS通过[ForEach](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-rendering-control-foreach)提供了组件的循环渲染能力。以简单的联系人列表为例，将联系人名称和头像数据以Contact类结构存储到contacts数组中，使用[ForEach](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-rendering-control-foreach)中嵌套的[ArcListItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclistitem)来代替多个平铺的、内容相似的[ArcListItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclistitem)，从而减少重复代码，使代码更加简洁高效。

收起

自动换行

深色代码主题

复制

```
1. import { ArcList, ArcListAttribute, ArcListItemAttribute, ArcListItem, LengthMetrics } from '@kit.ArkUI';
2. import { util } from '@kit.ArkTS';
3. import { common } from '@kit.AbilityKit';

5. class Contact {
6. key: string = util.generateRandomUUID(true);
7. name: ResourceStr;
8. icon: Resource;

10. constructor(name: ResourceStr, icon: Resource) {
11. this.name = name;
12. this.icon = icon;
13. }
14. }

16. @Entry
17. @Component
18. export struct ArcListContents {
19. private context = this.getUIContext().getHostContext() as common.UIAbilityContext;
20. @State private contacts: Array<object> = [
21. // 请将$r('app.string.xxx')替换为实际资源文件
22. new Contact($r('app.string.name_xiaohong'), $r('app.media.ic_contact')),
23. new Contact($r('app.string.name_xiaolan'), $r('app.media.ic_contact')),
24. new Contact($r('app.string.name_xiaowang'), $r('app.media.ic_contact')),
25. new Contact($r('app.string.name_xiaoli'), $r('app.media.ic_contact')),
26. new Contact($r('app.string.name_xiaoming'), $r('app.media.ic_contact'))
27. ];

29. build() {
30. NavDestination() {
31. Column({ space: 12 }) {
32. // ...
33. ArcList({ initialIndex: 2 }) {
34. ForEach(this.contacts, (item: Contact) => {
35. ArcListItem() {
36. Row() {
37. Image(item.icon)
38. .width(40)
39. .height(40)
40. .margin(10)
41. .backgroundColor('#FF9CC998')
42. .borderRadius(20)
43. Text(item.name).fontSize('38px').fontColor('#FFFFFFFF')
44. }
45. .width('100%')
46. .justifyContent(FlexAlign.Start)
47. }
48. .borderRadius('65px')
49. .width('410px')
50. .height('130px')
51. .backgroundColor('#26FFFFFF')
52. }, (item: Contact) => JSON.stringify(item))
53. }
54. .space(LengthMetrics.px(10))
55. .width('466px')
56. .height('466px')
57. .borderRadius('233px')
58. .backgroundColor(Color.Black)
59. }
60. // ...
61. }
62. .backgroundColor('#f1f2f3')
63. // 请将$r('app.string.ArcListContents_title')替换为实际资源文件，在本示例中该资源文件的value值为"迭代弧形列表内容"
64. .title($r('app.string.ArcListContents_title'))
65. }
66. }
```

[ArcListContents.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/arcList/ArcListContents.ets#L15-L84)

**图2** 迭代弧形列表内容

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/eb/v3/c-4d7h_vSTm9K810SxZCOQ/zh-cn_image_0000002571291363.png?HW-CC-KV=V1&HW-CC-Date=20260414T034906Z&HW-CC-Expire=86400&HW-CC-Sign=00D92CB50E29B66D0F42F4AE1140286790217FEC7F5478AC2F0A6A399127E5BD)

## 自定义弧形列表样式

### 自定义弧形列表标题

可以通过[header](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclist#arklistoptions)参数为弧形列表添加自定义标题。

1. 首先，需要构造自定义标题组件customHeader。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Builder
   2. function customHeader() {
   3. Column() {
   4. Text($r('app.string.ArcListCrown_set'))
   5. .fontColor('#FFFFFFFF')
   6. .fontSize('19fp')
   7. }
   8. }
   ```

   [ArcListStyles.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/arcList/ArcListStyles.ets#L27-L36)
2. 由于[header](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclist#arklistoptions)参数的类型是[ComponentContent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-componentcontent)，所以需要对自定义标题组件进行封装。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. context: UIContext = this.getUIContext();
   2. arcListHeader: ComponentContent<Object> = new ComponentContent(this.context, wrapBuilder(customHeader));
   ```

   [ArcListStyles.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/arcList/ArcListStyles.ets#L41-L44)
3. 最后，通过[header](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclist#arklistoptions)参数将arcListHeader设置到弧形列表中。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. ArcList({ header: this.arcListHeader }) {
   2. ArcListItem() {
   3. // ···
   4. }
   5. // ···

   7. ArcListItem() {
   8. // ···
   9. }
   10. // ···
   11. }
   ```

   [ArcListStyles.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/arcList/ArcListStyles.ets#L66-L163)

**图3** 自定义弧形列表标题

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/bc/v3/f-iBVUXORom62BoeR9AVsQ/zh-cn_image_0000002540611416.png?HW-CC-KV=V1&HW-CC-Date=20260414T034906Z&HW-CC-Expire=86400&HW-CC-Sign=BFBBDBEC06B32F67837837FC5CAE940006DC2A719D85099142075428D87FFFC9)

### 设置弧形列表项间距

在初始化列表时，若需在列表项之间添加间距，可以通过[space](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclist#space)属性实现。例如，为在每个列表项的垂直方向上增加30px的间距。

收起

自动换行

深色代码主题

复制

```
1. ArcList({ initialIndex: 2 }) {
2. // ···
3. }
4. .space(LengthMetrics.px(30))
```

[ArcListStyles.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/arcList/ArcListStyles.ets#L174-L266)

**图4** 设置弧形列表项间距

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8d/v3/WeESLLZ9RU-jfHhihYwTpQ/zh-cn_image_0000002571171411.png?HW-CC-KV=V1&HW-CC-Date=20260414T034906Z&HW-CC-Expire=86400&HW-CC-Sign=757CAD0651C2F9CC781E30571769A89752FA6FC2BC8991AC42910448C45C0412)

### 列表项关闭自动缩放

在弧形列表中，列表项默认具有在接近上下两端时自动缩放的效果。然而，在某些情况下，可能不希望有这种缩放效果。此时，可以通过设置[ArcListItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclistitem)的[autoScale](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclistitem#autoscale)属性为false来禁用该效果。例如，如图5所示，“网络”和“显示”两个列表项，在关闭了自动缩放属性后，无论它们所处的位置如何，都不会出现缩放效果。

收起

自动换行

深色代码主题

复制

```
1. ArcListItem() {
2. // ...
3. }
4. .autoScale(false)
```

[ArcListStyles.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/arcList/ArcListStyles.ets#L310-L326)

**图5** 列表项关闭自动缩放

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/77/v3/WolQ1X83SuiOgySrVZvF6A/zh-cn_image_0000002540771068.png?HW-CC-KV=V1&HW-CC-Date=20260414T034906Z&HW-CC-Expire=86400&HW-CC-Sign=59252EC67437A2F4AB12DBF502B9D2412D64955D9AC9BB16066F719031C51C11)

### 添加内置滚动条

当列表项的高度超过屏幕高度时，弧形列表能够沿垂直方向滚动。若用户需要快速定位，可拖动滚动条以迅速滑动列表，如图6所示。

在使用[ArcList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclist)组件时，可以通过[scrollBar](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclist#scrollbar)属性来控制弧形列表滚动条的显示。scrollBar的取值类型为[BarState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#barstate)，当设置为BarState.Auto时，表示滚动条将按需显示。在这种模式下，当用户触摸到滚动条区域时，滚动条会显示出来，支持上下拖拽以快速浏览内容，且在拖拽过程中滚动条会变粗。若用户不进行任何操作，滚动条将在2秒后自动消失。此外，还可以通过[scrollBarWidth](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclist#scrollbarwidth)属性来设置滚动条在按压状态下的宽度，以及通过[scrollBarColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclist#scrollbarcolor)属性来设置滚动条的颜色。

收起

自动换行

深色代码主题

复制

```
1. ArcList({ header: this.arcListHeader }) {
2. // ···
3. }
4. .scrollBar(BarState.Auto)
5. .scrollBarWidth(LengthMetrics.px(10))
6. .scrollBarColor(ColorMetrics.resourceColor(Color.White))
```

[arcListBuiltInScrollerBar.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/arcList/arcListBuiltInScrollerBar.ets#L47-L141)

**图6** 弧形列表的内置滚动条

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/99/v3/gn35E-slQyOU62ewnZNgcQ/zh-cn_image_0000002571291365.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034906Z&HW-CC-Expire=86400&HW-CC-Sign=CF2B29136A3AD2F5E683D520EDA4FEF8B65DEBF7D00AD1B13704F33B865AE4D4)

## 添加外置滚动条ArcScrollBar

弧形列表[ArcList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclist)可与[ArcScrollBar](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-arcscrollbar)组件配合使用，为弧形列表添加外置滚动条。两者通过绑定同一个[Scroller](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-scroll#scroller)滚动控制器对象实现联动。

1. 首先，需要创建一个[Scroller](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-scroll#scroller)类型的对象arcListScroller。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. private arcListScroller: Scroller = new Scroller();
   ```

   [ArcListAcrScrollBar.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/arcList/ArcListAcrScrollBar.ets#L39-L41)
2. 然后，弧形列表通过[scroller](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclist#arklistoptions)参数绑定滚动控制器。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 将arcListScroller用于初始化ArcList组件的scroller参数，完成arcListScroller与弧形列表的绑定。
   2. ArcList({ scroller: this.arcListScroller, header: this.arcListHeader }) {
   3. // ···
   4. }
   ```

   [ArcListAcrScrollBar.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/arcList/ArcListAcrScrollBar.ets#L52-L145)
3. 最后，弧形滚动条通过[scroller](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-arcscrollbar#arcscrollbaroptions)参数绑定滚动控制器。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 将arcListScroller用于初始化ArcScrollBar组件的scroller参数，完成arcListScroller与滚动条的绑定。
   2. ArcScrollBar({ scroller: this.arcListScroller })
   ```

   [ArcListAcrScrollBar.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/arcList/ArcListAcrScrollBar.ets#L152-L155)

**图7** 弧形列表的外置滚动条

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1f/v3/IVstLVwKR7yT8SXvYwPQlg/zh-cn_image_0000002540611418.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034906Z&HW-CC-Expire=86400&HW-CC-Sign=BB8C6170727AB2A435719486B7199836131517F579E7E94EE642807D9916D915)

说明

弧形滚动条组件[ArcScrollBar](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-arcscrollbar)，还可配合其他可滚动组件使用，如[List](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-list)、[Grid](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-grid)、[Scroll](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-scroll)、[WaterFlow](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-waterflow)。

## 与弧形索引条ArcAlphabetIndexer联动

许多应用需要监测列表的滚动位置变动并作出响应，或通过调整滚动位置实现列表的快速定位。例如，在联系人列表滚动时，当列表滚动至不同首字母开头的联系人，外部索引条应更新至相应的字母位置。当用户选择外部索引条上的索引项时，列表应跳转至对应位置。为此，需使用弧形索引条组件[ArcAlphabetIndexer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arc-alphabet-indexer)。

如图8所示，当列表从联系人A滚动到联系人B时，外侧索引条也需要同步从选中A状态变成选中B状态，此场景可以通过监听[ArcList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclist)组件的[onScrollIndex](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclist#onscrollindex)事件来实现；当点击索引项C时，列表也需要跳转到联系人C，此场景可以通过监听[ArcAlphabetIndexer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arc-alphabet-indexer)的[onSelect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arc-alphabet-indexer#onselect)事件来实现。

在列表滚动时，根据列表此时所在的索引值位置firstIndex，重新计算字母索引条对应字母的位置selectedIndex。由于[ArcAlphabetIndexer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arc-alphabet-indexer)组件通过[selected](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arc-alphabet-indexer#selected)属性设置了选中项索引值，当selectedIndex变化时会触发[ArcAlphabetIndexer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arc-alphabet-indexer)组件重新渲染，从而显示为选中对应字母的状态。

在选中索引项时，根据此时选中项的索引值index，重新计算列表联系人对应的位置，然后通过列表绑定的滚动控制器arcListScroller的[scrollToIndex](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-scroll#scrolltoindex)方法控制列表跳转到对应的联系人位置。弧形列表[ArcList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclist)可通过[scroller](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclist#arklistoptions)参数绑定[Scroller](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-scroll#scroller)（滚动控制器）。

收起

自动换行

深色代码主题

复制

```
1. import { ArcList, ArcListAttribute, ArcListItemAttribute, ArcListItem, LengthMetrics } from '@kit.ArkUI';
2. import { common } from '@kit.AbilityKit';

4. // ...
5. const alphabets: string[] = [
6. '#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N',
7. 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
8. ];

10. @Entry
11. @Component
12. export struct ArcListArcIndexerBar {

14. // ...
15. // 索引条选中项索引
16. @State indexerIndex: number = 0;
17. // 列表绑定的滚动控制器
18. private arcListScroller: Scroller = new Scroller();

20. // ...

22. build() {
23. // ...
24. Stack({alignContent: Alignment.End}) {
25. ArcList({ initialIndex: 0, header:this.tabBar1, scroller:this.arcListScroller }) {
26. // ...
27. }
28. // ...
29. .onScrollIndex((firstIndex: number, lastIndex: number, centerIndex: number) => {
30. // 根据列表滚动到的索引值，重新计算对应索引条的位置this.selectedIndex
31. this.indexerIndex = centerIndex + 1;
32. })
33. // ...
34. // 弧形索引条组件
35. ArcAlphabetIndexer({ arrayValue: alphabets, selected: this.indexerIndex})
36. .selected(this.indexerIndex!!)
37. .onSelect((index: number) => {
38. // 选中索引项后，列表跳转到相应位置
39. this.indexerIndex = index
40. this.arcListScroller.scrollToIndex(this.indexerIndex - 1)
41. })
42. // ...
43. }
44. // ...
45. }
46. }
```

[ArcListArcIndexerBar.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/arcList/ArcListArcIndexerBar.ets#L21-L184)

**图8** 弧形列表与弧形索引条联动

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/49/v3/TWCMGJqzQm26Oc0SKkqx_Q/zh-cn_image_0000002571171413.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034906Z&HW-CC-Expire=86400&HW-CC-Sign=830A9C6964996C10CE0789C70104C96A3D6D4D453A6DCC1C4527501BAEDAAF09)

## 响应列表项侧滑

[ArcListItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclistitem)的[swipeAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclistitem#swipeaction)属性可用于实现列表项的左右滑动功能。[swipeAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclistitem#swipeaction)属性方法初始化时存在必填[SwipeActionOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-listitem#swipeactionoptions9对象说明)参数start和end。其中，start表示设置列表项右滑时起始端滑出的组件，end表示设置列表项左滑时尾端滑出的组件。

在联系人列表中，end参数表示设置[ArcListItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclistitem)左滑时尾端划出自定义组件，即删除按钮。在初始化end方法时，将滑动列表项的索引传入删除按钮组件，当用户点击删除按钮时，可以根据数据索引来删除列表项对应的数据，从而实现侧滑删除功能。

1. 首先，实现尾端滑出组件的构建。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Builder
   2. itemEnd(item: Contact) {
   3. // 构建尾端滑出组件
   4. Button({ type: ButtonType.Circle }) {
   5. Image($r('app.media.ic_public_delete_filled'))
   6. .width(20)
   7. .height(20)
   8. }
   9. .width(20)
   10. .height(20)
   11. .backgroundColor(Color.Black)
   12. .onClick(() => {
   13. this.getUIContext()?.animateTo({
   14. duration: 1000,
   15. curve: Curve.Smooth,
   16. iterations: 1,
   17. playMode: PlayMode.Normal,
   18. }, () => {
   19. // this.contacts为列表数据源，可根据实际场景构造，indexOf方法可获取将被删除数据在数据源中的索引
   20. let index = this.contacts.indexOf(item);
   21. // 从数据源删除指定数据项
   22. this.contacts.splice(index, 1);
   23. })
   24. })
   25. }
   ```

   [ArcListSideSlip.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/arcList/ArcListSideSlip.ets#L76-L102)
2. 然后，绑定[swipeAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclistitem#swipeaction)属性到可左滑的ArcListItem上。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 构建ArcList时，通过ForEach基于数据源this.contacts循环渲染ArcListItem
   2. ArcListItem() {
   3. // ···
   4. }
   5. .swipeAction({
   6. end: {
   7. // index为该ArcListItem在ArcList中的索引值。
   8. builder: () => {
   9. this.itemEnd(item);
   10. },
   11. }
   12. }) // 设置侧滑属性.
   ```

   [ArcListSideSlip.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/arcList/ArcListSideSlip.ets#L112-L140)

**图9** 侧滑删除列表项

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/cb/v3/jwSt7U9wQhSaI9hksUeavA/zh-cn_image_0000002540771070.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034906Z&HW-CC-Expire=86400&HW-CC-Sign=00C86747AB228E490264E269C877AC339F4E574558F35AB6B97B02F5C709BB14)

## 处理长列表

[循环渲染](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-rendering-control-foreach)适用于短列表，当构建具有大量列表项的长列表时，如果直接采用循环渲染方式，会一次性加载所有的列表元素，会导致页面启动时间过长，影响用户体验。因此，推荐使用[数据懒加载](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-rendering-control-lazyforeach)（LazyForEach）方式实现按需迭代加载数据，从而提升列表性能。关于长列表按需加载优化的具体实现可参考[数据懒加载](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-rendering-control-lazyforeach)章节中的示例。

当使用懒加载方式渲染列表时，为了减少列表滑动时出现白块，[ArcList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclist)组件提供了[cachedCount](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclist#cachedcount)属性，该属性用于设置列表项缓存数，只在懒加载[LazyForEach](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-rendering-control-lazyforeach)中生效。

收起

自动换行

深色代码主题

复制

```
1. ArcList() {
2. // ···
3. }.cachedCount(3)
```

[ArcLongList.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/arcList/ArcLongList.ets#L126-L139)

说明

* cachedCount的增加会增大UI的CPU、内存开销。使用时需要根据实际情况，综合性能和用户体验进行调整。
* 列表使用数据懒加载时，除了显示区域的列表项和前后缓存的列表项，其他列表项会被销毁。

## 响应旋转表冠

手表设备上弧形列表在获焦的情况下可对旋转表冠做出响应，用户可通过旋转表冠的操作滑动列表，浏览列表项数据。弧形列表可通过下列[焦点控制](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-focus)相关属性成为所在页面的默认焦点。

收起

自动换行

深色代码主题

复制

```
1. ArcList({
2. initialIndex: 2,
3. }) {
4. // ···
5. }
6. // 设置弧形列表支持获焦
7. .focusable(true)
8. // 设置弧形列表支持点击获焦
9. .focusOnTouch(true)
10. // 设置弧形列表为所在页面上的默认焦点
11. .defaultFocus(true)
```

[ArcListCrown.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/arcList/ArcListCrown.ets#L41-L127)

还可以通过[digitalCrownSensitivity](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arclist#digitalcrownsensitivity)属性设置表冠响应事件的灵敏度，以应对不同量级的列表项数据。列表项数据较多时可以设置更高的响应事件灵敏度，数据较少时可以设置较低的响应事件灵敏度。

收起

自动换行

深色代码主题

复制

```
1. ArcList({
2. initialIndex: 2,
3. }) {
4. // ···
5. }
6. // ···
7. .digitalCrownSensitivity(CrownSensitivity.MEDIUM)
```

[ArcListCrown.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/arcList/ArcListCrown.ets#L42-L130)