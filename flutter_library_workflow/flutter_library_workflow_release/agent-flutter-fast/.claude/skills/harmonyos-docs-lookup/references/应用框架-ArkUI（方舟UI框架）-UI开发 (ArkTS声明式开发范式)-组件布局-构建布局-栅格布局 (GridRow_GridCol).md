## 概述

栅格布局是一种通用的辅助定位工具，对移动设备的界面设计有较好的借鉴作用。主要优势包括：

1. 提供可循的规律：栅格布局可以为布局提供规律性的结构，解决多尺寸多设备的动态布局问题。通过将页面划分为等宽的列数和行数，可以方便地对页面元素进行定位和排版。
2. 统一的定位标注：栅格布局可以为系统提供一种统一的定位标注，保证不同设备上各个模块的布局一致性。这可以减少设计和开发的复杂度，提高工作效率。
3. 灵活的间距调整方法：栅格布局可以提供一种灵活的间距调整方法，满足特殊场景布局调整的需求。通过调整列与列之间和行与行之间的间距，可以控制整个页面的排版效果。
4. 自动换行和自适应：栅格布局可以完成一对多布局的自动换行和自适应。当页面元素的数量超出了一行或一列的容量时，他们会自动换到下一行或下一列，并且在不同的设备上自适应排版，使得页面布局更加灵活和适应性强。

[GridRow](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-gridrow)为栅格容器组件，需与栅格子组件[GridCol](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-gridcol)在栅格布局场景中联合使用。

## 栅格容器GridRow

### 栅格容器断点

栅格容器以设备的水平宽度（[像素单位](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-pixel-units)，单位vp）作为断点依据，定义设备的宽度类型，形成了一套断点规则。开发者可根据需求在不同的断点区间实现不同的页面布局效果。

栅格容器默认断点将设备宽度分为xs、sm、md、lg四类，尺寸范围如下：

展开

| 断点名称 | 取值范围（vp） | 设备描述 |
| --- | --- | --- |
| xs | [0, 320） | 最小宽度类型设备。 |
| sm | [320, 600) | 小宽度类型设备。 |
| md | [600, 840) | 中等宽度类型设备。 |
| lg | [840, +∞) | 大宽度类型设备。 |

在GridRow栅格组件中，允许开发者使用[BreakPoints](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-gridrow#breakpoints)自定义修改断点的取值范围，最多支持6个断点，除了默认的4个断点外，还可以启用xl和xxl断点，支持6种不同尺寸（xs，sm，md，lg，xl，xxl）设备的布局设置。

展开

| 断点名称 | 设备描述 |
| --- | --- |
| xs | 最小宽度类型设备。 |
| sm | 小宽度类型设备。 |
| md | 中等宽度类型设备。 |
| lg | 大宽度类型设备。 |
| xl | 特大宽度类型设备。 |
| xxl | 超大宽度类型设备。 |

* 开发者可根据实际使用场景，通过一个单调递增数组设置断点位置。由于栅格容器默认支持4个断点，在不设置断点位置时，系统为默认断点配置的单调递增数组为["320vp", "600vp", "840vp"]。开发者使用[BreakPoints](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-gridrow#breakpoints)最多可支持6个断点，因此此单调递增数组最大长度为5。

  假设传入的数组是[n0, n1, n2, n3, n4]，则各个断点取值如下：

  展开

  | 断点 | 取值范围 |
  | --- | --- |
  | xs | [0, n0) |
  | sm | [n0, n1) |
  | md | [n1, n2) |
  | lg | [n2, n3) |
  | xl | [n3, n4) |
  | xxl | [n4, INF) |

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. breakpoints: {value: ['100vp', '200vp']} // 表示xs、sm、md共3个断点被使用，小于100vp为xs，100vp-200vp为sm，大于200vp为md。
  2. breakpoints: {value: ['320vp', '600vp']} // 表示xs、sm、md共3个断点被使用，小于320vp为xs，320vp-600vp为sm，大于600vp为md。
  3. breakpoints: {value: ['320vp', '600vp', '840vp', '1440vp']} // 表示xs、sm、md、lg、xl共5个断点被使用，小于320vp为xs，320vp-600vp为sm，  600vp-840vp为md，840vp-1440vp为lg，大于1440vp为xl。
  ```
* 栅格容器通过监听窗口或容器的尺寸变化进行断点，通过reference设置断点切换参考物。考虑到应用可能以非全屏窗口的形式显示，以应用窗口宽度为参照物更为通用。

  例如，通过断点设置将应用宽度分成6个区间，通过columns配置各断点下栅格容器的栅格列数。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. @Entry
  2. @Component
  3. struct WindowRefGridLayout {
  4. @State currentBp: string = "unknown"
  5. @State bgColors: ResourceColor[] =
  6. ['rgb(213,213,213)', 'rgb(150,150,150)', 'rgb(0,74,175)', 'rgb(39,135,217)', 'rgb(61,157,180)', 'rgb(23,169,141)',
  7. 'rgb(255,192,0)', 'rgb(170,10,33)'];

  9. build() {
  10. Column({ space: 6 }) {
  11. Text(this.currentBp)

  13. GridRow({
  14. columns: {
  15. xs: 2, // 窗口宽度落入xs断点上，栅格容器分为2列。
  16. sm: 4, // 窗口宽度落入sm断点上，栅格容器分为4列。
  17. md: 8, // 窗口宽度落入md断点上，栅格容器分为8列。
  18. lg: 12, // 窗口宽度落入lg断点上，栅格容器分为12列。
  19. xl: 12, // 窗口宽度落入xl断点上，栅格容器分为12列。
  20. xxl: 12 // 窗口宽度落入xxl断点上，栅格容器分为12列。
  21. },
  22. breakpoints: {
  23. value: ['320vp', '600vp', '840vp', '1440vp', '1600vp'], // 表示在保留默认断点['320vp', '600vp', '840vp']的同时自定义增加'1440vp', '1600vp'的断点，实际开发中需要根据实际使用场景，合理设置断点值实现一次开发多端适配。
  24. reference: BreakpointsReference.WindowSize
  25. }
  26. }) {
  27. ForEach(this.bgColors, (color: ResourceColor, index?: number | undefined) => {
  28. GridCol({ span: 1 }) { // 所有子组件占一列。
  29. Row() {
  30. Text(`${index}`)
  31. }.width('100%').height('50vp')
  32. }.backgroundColor(color)
  33. })
  34. }
  35. .height(200)
  36. .border({ color: 'rgb(39,135,217)', width: 2 })
  37. .onBreakpointChange((breakPoint) => {
  38. this.currentBp = breakPoint
  39. })
  40. }
  41. }
  42. }
  ```

  [GridLayoutReference.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/gridlayout/GridLayoutReference.ets#L15-L48)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/67/v3/1TxQtQEdTFmR8qIXpIi3DQ/zh-cn_image_0000002571291329.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034501Z&HW-CC-Expire=86400&HW-CC-Sign=14B7C9326A46A6DE5A95FAF59FEFE23BF2C28D35293771595DD68198208336A0)

### 布局的总列数

GridRow中通过columns设置栅格布局的总列数。

* API version 20之前，columns默认值为12，即在未设置columns时，任何断点下，栅格布局均被分成12列。
* API version 20及以后，columns默认值为{ xs: 2, sm: 4, md: 8, lg: 12, xl: 12, xxl: 12 }。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // xxx.ets
  2. @Entry
  3. @Component
  4. struct GridColumnsWithDefaults {
  5. @State bgColors: ResourceColor[] =
  6. ['rgb(213,213,213)', 'rgb(150,150,150)', 'rgb(0,74,175)', 'rgb(39,135,217)', 'rgb(61,157,180)', 'rgb(23,169,141)',
  7. 'rgb(255,192,0)', 'rgb(170,10,33)', 'rgb(213,213,213)', 'rgb(150,150,150)', 'rgb(0,74,175)', 'rgb(39,135,217)'];

  9. build() {
  10. GridRow() {
  11. ForEach(this.bgColors, (item: ResourceColor, index?: number | undefined) => {
  12. GridCol({ span: 1 }) {
  13. Row() {
  14. Text(`${index}`)
  15. }.width('100%').height('50')
  16. }.backgroundColor(item)
  17. })
  18. }
  19. }
  20. }
  ```

  [GridLayoutColumns.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/gridlayout/GridLayoutColumns.ets#L15-L36)

  API version 20之前布局显示：

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/31/v3/SgB05De5R6qtokFE8inJvw/zh-cn_image_0000002540611382.png?HW-CC-KV=V1&HW-CC-Date=20260414T034501Z&HW-CC-Expire=86400&HW-CC-Sign=7BD3EDF77396C043310319E700D77E0AF87676BFEDFAA5B05796E3EE51E6CE62)

  API version 20及以后布局显示（以sm设备为例，默认栅格列数为4）：

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c5/v3/M6TZhpEqQLmC-kiiYowWZw/zh-cn_image_0000002571171377.png?HW-CC-KV=V1&HW-CC-Date=20260414T034501Z&HW-CC-Expire=86400&HW-CC-Sign=51C649ED5150B68FF18DD7A03A7775D1F7661DA6BF454479DB5F6030638AB9FD)

columns支持number和[GridRowColumnOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-gridrow#gridrowcolumnoption)两种类型, 可按两种方式设置栅格布局的总列数。

* 当columns类型为number时，栅格布局在任何尺寸设备下都被分为同一列数。下面分别设置栅格布局列数为4和8，子元素占一列，效果如下：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // xxx.ets
  2. @Entry
  3. @Component
  4. struct FixedFourColumnGrid {
  5. @State bgColors: ResourceColor[] =
  6. ['rgb(213,213,213)', 'rgb(150,150,150)', 'rgb(0,74,175)', 'rgb(39,135,217)', 'rgb(61,157,180)', 'rgb(23,169,141)',
  7. 'rgb(255,192,0)', 'rgb(170,10,33)'];

  9. build() {
  10. Column({ space: 6 }) {
  11. Text('columns：4').alignSelf(ItemAlign.Start)

  13. Row() {
  14. GridRow({ columns: 4 }) {
  15. ForEach(this.bgColors, (item: ResourceColor, index?: number | undefined) => {
  16. GridCol({ span: 1 }) {
  17. Row() {
  18. Text(`${index}`)
  19. }.width('100%').height('50')
  20. }.backgroundColor(item)
  21. })
  22. }
  23. .width('100%').height('100%')
  24. }
  25. .height(160)
  26. .border({ color: 'rgb(39,135,217)', width: 2 })
  27. .width('90%')
  28. }
  29. }
  30. }
  ```

  [GridLayoutColumnsToFour.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/gridlayout/GridLayoutColumnsToFour.ets#L15-L42)

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // xxx.ets
  2. @Entry
  3. @Component
  4. struct FixedEightColumnGrid {
  5. @State bgColors: ResourceColor[] =
  6. ['rgb(213,213,213)', 'rgb(150,150,150)', 'rgb(0,74,175)', 'rgb(39,135,217)', 'rgb(61,157,180)', 'rgb(23,169,141)',
  7. 'rgb(255,192,0)', 'rgb(170,10,33)'];

  9. build() {
  10. Column({ space: 6 }) {
  11. Text('columns：8').alignSelf(ItemAlign.Start)

  13. Row() {
  14. GridRow({ columns: 8 }) {
  15. ForEach(this.bgColors, (item: ResourceColor, index?: number | undefined) => {
  16. GridCol({ span: 1 }) {
  17. Row() {
  18. Text(`${index}`)
  19. }.width('100%').height('50')
  20. }.backgroundColor(item)
  21. })
  22. }
  23. .width('100%').height('100%')
  24. }
  25. .height(160)
  26. .border({ color: 'rgb(39,135,217)', width: 2 })
  27. .width('90%')
  28. }
  29. }
  30. }
  ```

  [GridLayoutColumnsToEight.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/gridlayout/GridLayoutColumnsToEight.ets#L15-L42)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d5/v3/qmBV3AzXREm72Fb2U0CyJQ/zh-cn_image_0000002540771034.png?HW-CC-KV=V1&HW-CC-Date=20260414T034501Z&HW-CC-Expire=86400&HW-CC-Sign=59926E9DF9EEFBF13AED3B9CA63C0DE72979883F75760EC1F4DE9D9E426DC632)
* 当columns类型为[GridRowColumnOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-gridrow#gridrowcolumnoption)时，支持下面6种不同尺寸（xs，sm，md，lg，xl，xxl）设备的栅格列数设置，不同尺寸的设备支持配置不同的栅格列数。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. @Entry
  2. @Component
  3. struct GridRowColumnOptionLayout {
  4. @State bgColors: ResourceColor[] =
  5. ['rgb(213,213,213)', 'rgb(150,150,150)', 'rgb(0,74,175)', 'rgb(39,135,217)', 'rgb(61,157,180)', 'rgb(23,169,141)',
  6. 'rgb(255,192,0)', 'rgb(170,10,33)'];

  8. build() {
  9. GridRow({
  10. columns: { sm: 4, md: 8 },
  11. breakpoints: {
  12. value: ['320vp', '600vp', '840vp', '1440vp', '1600vp'] // 表示在保留默认断点['320vp', '600vp', '840vp']的同时自定义增加'1440vp', '1600vp'的断点，实际开发中需要根据实际使用场景，合理设置断点值实现一次开发多端适配。
  13. }
  14. }) {
  15. ForEach(this.bgColors, (item: ResourceColor, index?: number | undefined) => {
  16. GridCol({ span: 1 }) {
  17. Row() {
  18. Text(`${index}`)
  19. }.width('100%').height('50')
  20. }.backgroundColor(item)
  21. })
  22. }
  23. .height(200)
  24. .border({ color: 'rgb(39,135,217)', width: 2 })
  25. }
  26. }
  ```

  [GridLayoutColumnOption.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/gridlayout/GridLayoutColumnOption.ets#L15-L42)

  API version 20之前布局显示（xs设备未配置栅格列数，取默认列数12）：

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/66/v3/Dv8E216WQ9mQtVVHq7MVIA/zh-cn_image_0000002571291331.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034501Z&HW-CC-Expire=86400&HW-CC-Sign=2B0903A7A8BFA456E5CD544F140BC6CA8D14A0BE9AB53AE8C357CD0FBEC7342E)

  API version 20及以后布局显示（xs设备继承sm设备栅格列数）：

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7b/v3/7J7cODWsSi25pS_BfitcWQ/zh-cn_image_0000002540611384.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034501Z&HW-CC-Expire=86400&HW-CC-Sign=EE4AB4DEED468F82B2BFEFBE97DA38CA0A19C95225D0F33B433B242689649661)

  仅部分设置sm、md的栅格列数，未配置的xs、lg、xl、xxl设备根据[栅格列数补全](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-gridrow#gridrowcolumnoption)取默认值。

### 排列方向

栅格布局中，可以通过设置GridRow的direction属性来指定栅格子组件在栅格容器中的排列方向。该属性可以设置为[GridRowDirection](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-gridrow#gridrowdirection枚举说明).Row（从左往右排列）或[GridRowDirection](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-gridrow#gridrowdirection枚举说明).RowReverse（从右往左排列），以满足不同的布局需求。通过合理的direction属性设置，可以使得页面布局更加灵活和符合设计要求。

* 子组件默认从左往右排列。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. GridRow({ direction: GridRowDirection.Row }) { /* ... */ }
  ```

  [GridLayoutDirectionRow.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/gridlayout/GridLayoutDirectionRow.ets#L21-L23)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b9/v3/CLUD0XPfTJGSBb2oSi9L6Q/zh-cn_image_0000002571171379.png?HW-CC-KV=V1&HW-CC-Date=20260414T034501Z&HW-CC-Expire=86400&HW-CC-Sign=9F651BF1643DC6ABC06EE5BE1DA9AB56DE7BCD497D1F15B3B53A257A0D601B0B)
* 子组件从右往左排列。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. GridRow({ direction: GridRowDirection.RowReverse }) { /* ... */ }
  ```

  [GridLayoutDirectionRowReverse.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/gridlayout/GridLayoutDirectionRowReverse.ets#L21-L23)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/bc/v3/SNlMuqa9QLqlukG7Ngj9IQ/zh-cn_image_0000002540771036.png?HW-CC-KV=V1&HW-CC-Date=20260414T034501Z&HW-CC-Expire=86400&HW-CC-Sign=08406736323CBD2234862EC3A2D037C437E0EB1DEC701444397D80319FDCFDEF)

### 子组件间距

GridRow中通过gutter属性设置子元素在水平和垂直方向的间距。

* 当gutter类型为number时，同时设置栅格子组件间水平和垂直方向边距且相等。下例中，设置子组件水平与垂直方向距离相邻元素的间距为10。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. GridRow({ gutter: 10 }) { /* ... */ }
  ```

  [GridLayoutGutterToNumber.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/gridlayout/GridLayoutGutterToNumber.ets#L21-L23)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/69/v3/6ERW52k-RUm-9OL_rTUakg/zh-cn_image_0000002571291333.png?HW-CC-KV=V1&HW-CC-Date=20260414T034501Z&HW-CC-Expire=86400&HW-CC-Sign=E53206194AF57E9130D24BCCE8B57EC9790AA07B2C0F1A03B02C66707593515E)
* 当gutter类型为[GutterOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-gridrow#gutteroption)时，单独设置栅格子组件水平垂直边距，x属性为水平方向间距，y为垂直方向间距。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. GridRow({ gutter: { x: 20, y: 50 } }) { /* ... */ }
  ```

  [GridLayoutGutterOption.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/gridlayout/GridLayoutGutterOption.ets#L21-L23)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e0/v3/YphyODVLTQukgRA_F_iOOA/zh-cn_image_0000002540611386.png?HW-CC-KV=V1&HW-CC-Date=20260414T034501Z&HW-CC-Expire=86400&HW-CC-Sign=86CC7063427F355EC13DD00D4618341095910BD6CD49822B87F5B5F6CA76A647)

## 子组件GridCol

GridCol组件作为GridRow组件的子组件，通过给GridCol传参或者设置属性两种方式，设置span（占用列数），offset（偏移列数），order（元素序号）的值。

* 设置span。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. let gSpan:Record<string,number> = { 'xs': 1, 'sm': 2, 'md': 3, 'lg': 4 }
  ```

  [GridColSpan.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/gridlayout/GridColSpan.ets#L15-L17)

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. GridCol({ span: 2 }){}
  2. GridCol({ span: { xs: 1, sm: 2, md: 3, lg: 4 } }){}
  3. GridCol(){}.span(2)
  4. GridCol(){}.span(gSpan)
  ```

  [GridColSpan.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/gridlayout/GridColSpan.ets#L24-L29)
* 设置offset。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. let gOffset:Record<string,number> = { 'xs': 1, 'sm': 2, 'md': 3, 'lg': 4 }
  ```

  [GridColOffset.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/gridlayout/GridColOffset.ets#L15-L17)

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. GridCol({ offset: 2, span: 1 }){}
  2. GridCol({ offset: { xs: 2, sm: 2, md: 2, lg: 2 }, span: 1 }){}
  3. GridCol({ span: 1 }){}.offset(gOffset)
  ```

  [GridColOffset.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/gridlayout/GridColOffset.ets#L24-L28)
* 设置order。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. let gOrder:Record<string,number> = { 'xs': 1, 'sm': 2, 'md': 3, 'lg': 4 }
  ```

  [GridColOrder.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/gridlayout/GridColOrder.ets#L15-L17)

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. GridCol({ order: 2, span: 1 }){}
  2. GridCol({ order: { xs: 1, sm: 2, md: 3, lg: 4 }, span: 1 }){}
  3. GridCol({ span: 1 }){}.order(2)
  4. GridCol({ span: 1 }){}.order(gOrder)
  ```

  [GridColOrder.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/gridlayout/GridColOrder.ets#L24-L29)

### span

子组件占栅格布局的列数，决定了子组件的宽度。默认值为1。

span支持number和[GridColColumnOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-gridcol#gridcolcolumnoption)两种类型, 可按两种方式设置栅格子组件占栅格容器的列数。

* 当span类型为number时，子组件在所有尺寸设备下占用的列数相同。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // xxx.ets
  2. @Entry
  3. @Component
  4. struct SpanNumberExample {
  5. @State bgColors: ResourceColor[] =
  6. ['rgb(213,213,213)', 'rgb(150,150,150)', 'rgb(0,74,175)', 'rgb(39,135,217)', 'rgb(61,157,180)', 'rgb(23,169,141)',
  7. 'rgb(255,192,0)', 'rgb(170,10,33)'];

  9. build() {
  10. GridRow({ columns: 8 }) {
  11. ForEach(this.bgColors, (color: ResourceColor, index?: number | undefined) => {
  12. GridCol({ span: 2 }) {
  13. Row() {
  14. Text(`${index}`)
  15. }.width('100%').height('50vp')
  16. }
  17. .backgroundColor(color)
  18. })
  19. }
  20. .border({ color: 'rgb(39,135,217)', width: 2 })
  21. .height('150vp')
  22. }
  23. }
  ```

  [GridColSpanToNumber.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/gridlayout/GridColSpanToNumber.ets#L15-L37)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/bf/v3/jDUFXFktT3iOwjb9y3VANw/zh-cn_image_0000002571171381.png?HW-CC-KV=V1&HW-CC-Date=20260414T034501Z&HW-CC-Expire=86400&HW-CC-Sign=C8CAA2C48AEF349FCC7F8326B5FC2270A7ADA07D40D99F6DA4175B11EA8114BC)
* 当span类型为GridColColumnOption时，支持6种不同尺寸（xs，sm，md，lg，xl，xxl）设备中子组件所占列数设置，不同尺寸的设备下子组件支持配置不同列数。若仅部分设置sm、md的列数，未配置的xs、lg、xl、xxl设备根据[列数补全](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-gridcol#gridcolcolumnoption)取默认值。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. @Entry
  2. @Component
  3. struct SpanColumnOptionExample {
  4. @State currentBp: string = "unknown"
  5. @State bgColors: ResourceColor[] =
  6. ['rgb(213,213,213)', 'rgb(150,150,150)', 'rgb(0,74,175)', 'rgb(39,135,217)', 'rgb(61,157,180)', 'rgb(23,169,141)',
  7. 'rgb(255,192,0)', 'rgb(170,10,33)'];

  9. build() {
  10. Column({ space: 6 }) {
  11. GridRow({ columns: 8 }) {
  12. ForEach(this.bgColors, (color: ResourceColor, index?: number | undefined) => {
  13. GridCol({
  14. span: {
  15. xs: 1,
  16. sm: 2,
  17. md: 3,
  18. lg: 4
  19. }
  20. }) {
  21. Row() {
  22. Text(`${index}`)
  23. }.width('100%').height('50vp')
  24. }
  25. .backgroundColor(color)
  26. })
  27. }
  28. .border({ color: 'rgb(39,135,217)', width: 2 })
  29. .height('150vp')
  30. .onBreakpointChange((breakPoint) => {
  31. this.currentBp = breakPoint
  32. })

  34. Text(this.currentBp)
  35. }
  36. }
  37. }
  ```

  [GridColSpanToOption.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/gridlayout/GridColSpanToOption.ets#L15-L36)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/28/v3/CVtWS7PLS7e3q39GPXtK6g/zh-cn_image_0000002540771038.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034501Z&HW-CC-Expire=86400&HW-CC-Sign=0B70F8D3A91DA1C1DF1C958D9A505D2F4163CDE3152FDD0089ED6F55A1BCDB69)

### offset

栅格子组件相对于前一个子组件的偏移列数，默认为0。

* 当offset类型为number时，子组件偏移相同列数。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. @Entry
  2. @Component
  3. struct OffsetNumberExample {
  4. @State bgColors: ResourceColor[] =
  5. ['rgb(213,213,213)', 'rgb(150,150,150)', 'rgb(0,74,175)', 'rgb(39,135,217)', 'rgb(61,157,180)', 'rgb(23,169,141)',
  6. 'rgb(255,192,0)', 'rgb(170,10,33)'];

  8. build() {
  9. Column() {
  10. GridRow({ columns: 12 }) {
  11. ForEach(this.bgColors, (color: ResourceColor, index?: number | undefined) => {
  12. GridCol({ offset: 2, span: 1 }) {
  13. Row() {
  14. Text('' + index)
  15. }.width('100%').height('50vp')
  16. }
  17. .backgroundColor(color)
  18. })
  19. }

  21. Blank().width('100%').height(150)
  22. }.border({ color: 'rgb(39,135,217)', width: 2 })
  23. }
  24. }
  ```

  [GridColOffsetToNumber.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/gridlayout/GridColOffsetToNumber.ets#L15-L36)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5b/v3/jdgXD9-qRce12IFPRs1WoA/zh-cn_image_0000002571291335.png?HW-CC-KV=V1&HW-CC-Date=20260414T034501Z&HW-CC-Expire=86400&HW-CC-Sign=07DBBD2F25B4B13D94415F53BCFABED2A9DEB527DDA50936EE5869501573B046)

  在lg及以上尺寸的设备上，栅格分成12列，每一个子组件占1列，偏移2列，每个子组件及间距共占3列，1行放4个子组件。
* 当offset类型为GridColColumnOption时，支持6种不同尺寸（xs，sm，md，lg，xl，xxl）设备中子组件所占列数设置，各个尺寸下数值可不同。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. @Entry
  2. @Component
  3. struct OffsetColumnOptionExample {
  4. @State currentBp: string = "unknown"
  5. @State bgColors: ResourceColor[] =
  6. ['rgb(213,213,213)', 'rgb(150,150,150)', 'rgb(0,74,175)', 'rgb(39,135,217)', 'rgb(61,157,180)', 'rgb(23,169,141)',
  7. 'rgb(255,192,0)', 'rgb(170,10,33)'];

  9. build() {
  10. Column({ space: 6 }) {
  11. GridRow({ columns: 12 }) {
  12. ForEach(this.bgColors, (color: ResourceColor, index?: number | undefined) => {
  13. GridCol({
  14. offset: {
  15. xs: 1,
  16. sm: 2,
  17. md: 3,
  18. lg: 4
  19. },
  20. span: 1
  21. }) {
  22. Row() {
  23. Text('' + index)
  24. }.width('100%').height('50vp')
  25. }
  26. .backgroundColor(color)
  27. })
  28. }
  29. .height(200)
  30. .border({ color: 'rgb(39,135,217)', width: 2 })
  31. .onBreakpointChange((breakPoint) => {
  32. this.currentBp = breakPoint
  33. })

  35. Text(this.currentBp)
  36. }
  37. }
  38. }
  ```

  [GridColOffsetToOption.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/gridlayout/GridColOffsetToOption.ets#L15-L38)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5f/v3/qmDpVKzrQTuZEVZ1Y2cFIg/zh-cn_image_0000002540611388.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034501Z&HW-CC-Expire=86400&HW-CC-Sign=038E6DA5AC2F7179BC85E25785C9E3F82895F064FD3CD97BE7B6A46C28A46E73)

### order

栅格子组件的序号，决定子组件排列次序。当子组件不设置order或者设置相同的order, 子组件按照代码顺序展示。当子组件设置不同的order时，order较小的组件在前，较大的在后。

当子组件部分设置order，部分不设置order时，未设置order的子组件依次排序靠前，设置了order的子组件按照数值从小到大排列。

* 当order类型为number时，子组件在任何尺寸下排序次序一致。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. GridRow({ columns: 12 }) {
  2. GridCol({ order: 4, span: 1 }) {
  3. Row() {
  4. Text('1')
  5. }.width('100%').height('50vp')
  6. }.backgroundColor('rgb(213,213,213)')

  8. GridCol({ order: 3, span: 1 }) {
  9. Row() {
  10. Text('2')
  11. }.width('100%').height('50vp')
  12. }.backgroundColor('rgb(150,150,150)')

  14. GridCol({ order: 2, span: 1 }) {
  15. Row() {
  16. Text('3')
  17. }.width('100%').height('50vp')
  18. }.backgroundColor('rgb(0,74,175)')

  20. GridCol({ order: 1, span: 1 }) {
  21. Row() {
  22. Text('4')
  23. }.width('100%').height('50vp')
  24. }.backgroundColor('rgb(39,135,217)')
  25. }
  ```

  [GridColOrderToNumber.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/gridlayout/GridColOrderToNumber.ets#L20-L46)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7c/v3/jOtl8orhQhCtZECyakut7w/zh-cn_image_0000002571171383.png?HW-CC-KV=V1&HW-CC-Date=20260414T034501Z&HW-CC-Expire=86400&HW-CC-Sign=31BB33E5C0A9ABD785B8A4138752ED93A27077D156B57399C30E7FC49FC10AD0)
* 当order类型为GridColColumnOption时，支持6种不同尺寸（xs，sm，md，lg，xl，xxl）设备中子组件排序次序设置。在xs设备中，子组件排列顺序为1234；sm为2341，md为3412，lg为2431。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. @Entry
  2. @Component
  3. struct OrderColumnOptionExample {
  4. @State currentBp: string = 'unknown'

  6. build() {
  7. Column({ space: 5 }) {
  8. GridRow({ columns: 12 }) {
  9. GridCol({
  10. order: { xs: 1, sm: 5, md: 3, lg: 7 }, span: 1 }) {
  11. Row() {
  12. Text('1')
  13. }.width('100%').height('50vp')
  14. }.backgroundColor('rgb(213,213,213)')

  16. GridCol({
  17. order: { xs: 2, sm: 2, md: 6, lg: 1 }, span: 1 }) {
  18. Row() {
  19. Text('2')
  20. }.width('100%').height('50vp')
  21. }.backgroundColor('rgb(150,150,150)')

  23. GridCol({ order: { xs: 3, sm: 3, md: 1, lg: 6 }, span: 1 }) {
  24. Row() {
  25. Text('3')
  26. }.width('100%').height('50vp')
  27. }.backgroundColor('rgb(0,74,175)')

  29. GridCol({ order: { xs: 4, sm: 4, md: 2, lg: 5 }, span: 1 }) {
  30. Row() {
  31. Text('4')
  32. }.width('100%').height('50vp')
  33. }.backgroundColor('rgb(39,135,217)')
  34. }.border({ width: 1, color: 'rgb(39,135,217)' }).height('200vp').onBreakpointChange((breakpoint) => {
  35. this.currentBp = breakpoint
  36. })

  38. Text(this.currentBp)
  39. }
  40. }
  41. }
  ```

  [GridColOrderToOption.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/gridlayout/GridColOrderToOption.ets#L15-L57)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4b/v3/mfzUDzOMRKWvqXs5y03ExQ/zh-cn_image_0000002540771040.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034501Z&HW-CC-Expire=86400&HW-CC-Sign=EEFA9848EAF934702BCDBFF2E93BC2B64402E4AD774E8B86FB2717B0C97364CE)

## 栅格组件的嵌套使用

栅格组件也可以嵌套使用，完成一些复杂的布局。

以下示例中，栅格把整个空间分为12份。第一层GridRow嵌套GridCol，分为中间大区域以及“footer”区域。第二层GridRow嵌套GridCol，分为“left”和“right”区域。子组件空间按照上一层父组件的空间划分，粉色的区域是屏幕空间的12列，绿色和蓝色的区域是父组件GridCol的12列，依次进行空间的划分。

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. struct GridRowExample {
4. build() {
5. GridRow({ columns: 12 }) {
6. GridCol({ span: 12 }) {
7. GridRow({ columns: 12 }) {
8. GridCol({ span: 2 }) {
9. Row() {
10. Text('left').fontSize(24)
11. }
12. .justifyContent(FlexAlign.Center)
13. .height('90%')
14. }.backgroundColor('#ff41dbaa')

16. GridCol({ span: 10 }) {
17. Row() {
18. Text('right').fontSize(24)
19. }
20. .justifyContent(FlexAlign.Center)
21. .height('90%')
22. }.backgroundColor('#ff4168db')
23. }
24. .backgroundColor('#19000000')
25. }

27. GridCol({ span: 12 }) {
28. Row() {
29. Text('footer').width('100%').textAlign(TextAlign.Center)
30. }.width('100%').height('10%').backgroundColor(Color.Pink)
31. }
32. }.width('100%').height(300)
33. }
34. }
```

[GridRowExample.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/gridlayout/GridRowExample.ets#L15-L50)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c3/v3/dCHnZywQTueP7zBBDi468g/zh-cn_image_0000002571291337.png?HW-CC-KV=V1&HW-CC-Date=20260414T034501Z&HW-CC-Expire=86400&HW-CC-Sign=3CE7E8099508DE91395008780368FB7AC9FF42E3253788040C14A00945A320EB)

综上所述，栅格组件提供了丰富的自定义能力，功能非常灵活和强大。只需要明确栅格在不同断点下的Columns、Margin、Gutter及span等参数，即可确定最终布局，无需关心具体的设备类型及设备状态（如横竖屏）等。