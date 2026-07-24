动态布局容器组件，支持在运行时动态切换不同的布局算法，不改变子组件的状态。

说明

该组件从API version 24开始支持。后续版本如有新增内容，则采用上角标单独标记该内容的起始版本。

## 子组件

PhonePC/2in1TabletTVWearable

可以包含子组件。

## 接口

PhonePC/2in1TabletTVWearable

DynamicLayout(algorithm: LayoutAlgorithm)

动态布局容器。

**模型约束：** 此接口仅可在Stage模型下使用。

**卡片能力：** 从API version 24开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 24开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| algorithm | [LayoutAlgorithm](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-layoutalgorithm#layoutalgorithm-1) | 是 | 指定动态布局组件的布局算法。取非法值时，按照[堆叠布局算法](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-layoutalgorithm#stacklayoutalgorithm)布局子组件，子组件堆叠排列。 |

## 属性

PhonePC/2in1TabletTVWearable

支持[通用属性](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-component-general-attributes)。

说明

* 当布局算法为[RowLayoutAlgorithm](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-layoutalgorithm#rowlayoutalgorithm)或[ColumnLayoutAlgorithm](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-layoutalgorithm#columnlayoutalgorithm)时，子组件设置[Flex布局](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-flex-layout)属性生效。
* 当布局算法为[StackLayoutAlgorithm](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-layoutalgorithm#stacklayoutalgorithm)时，子组件设置[layoutGravity](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-location#layoutgravity20)属性生效。
* 当布局算法为[CustomLayoutAlgorithm](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-layoutalgorithm#customlayoutalgorithm)时，DynamicLayout组件[FrameNode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-framenode#framenode-1)的[setMeasuredSize](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-framenode#setmeasuredsize12)方法优先级高于[尺寸设置](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-size)和[边框](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-border)属性，子组件[FrameNode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-framenode#framenode-1)的[measure](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-framenode#measure12)和[layout](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-framenode#layout12)方法优先级高于[ignoreLayoutSafeArea](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-expand-safe-area#ignorelayoutsafearea20)属性。

## 事件

PhonePC/2in1TabletTVWearable

支持[通用事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-component-general-events)。

## 示例

PhonePC/2in1TabletTVWearable

### 示例1（自定义布局算法实现瀑布流布局）

该示例展示如何重写[onMeasure](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-layoutalgorithm#onmeasure)、[onLayout](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-layoutalgorithm#onlayout)函数，实现瀑布流布局展示商品列表的功能。

从API version 24开始，新增onMeasure、onLayout。



```
1. import { DynamicLayout, DynamicLayoutAttribute, CustomLayoutAlgorithm, LayoutAlgorithm, FrameNode, LayoutConstraint, Position } from '@kit.ArkUI';

3. // 瀑布流布局算法
4. class WaterfallLayout extends CustomLayoutAlgorithm {
5. private columnCount: number = 2;
6. private columnGap: number = 10;
7. private rowGap: number = 10;

9. onMeasure(self: FrameNode, constraint: LayoutConstraint): void {
10. const childCount = self.getChildrenCount();
11. const columnWidth = (constraint.maxSize.width - (this.columnCount - 1) * this.columnGap) / this.columnCount;

13. // 记录每列的当前高度
14. const columnHeights: number[] = new Array(this.columnCount).fill(0);

16. for (let i = 0; i < childCount; i++) {
17. const child = self.getChild(i);
18. if (child) {
19. // 通过将minSize和maxSize设置为相同值来约束子组件宽度
20. const childConstraint: LayoutConstraint = {
21. maxSize: {
22. width: columnWidth,
23. height: constraint.maxSize.height
24. },
25. minSize: {
26. width: columnWidth,
27. height: 0
28. },
29. percentReference: constraint.percentReference
30. };

32. child.measure(childConstraint);

34. // 找到当前高度最小的列
35. const minColumn = columnHeights.indexOf(Math.min(...columnHeights));
36. columnHeights[minColumn] += child.getMeasuredSize().height + this.rowGap;
37. }
38. }

40. const maxHeight = Math.max(...columnHeights);
41. self.setMeasuredSize({
42. width: constraint.maxSize.width,
43. height: maxHeight
44. });
45. }

47. onLayout(self: FrameNode, position: Position): void {
48. const childCount = self.getChildrenCount();
49. const measuredSize = self.getMeasuredSize();
50. const columnWidth = (measuredSize.width - (this.columnCount - 1) * this.columnGap) / this.columnCount;

52. // 记录每列的当前Y坐标
53. const columnYs: number[] = new Array(this.columnCount).fill(0);

55. for (let i = 0; i < childCount; i++) {
56. const child = self.getChild(i);
57. if (child) {
58. const childSize = child.getMeasuredSize();

60. // 找到当前Y坐标最小的列
61. const minColumn = columnYs.indexOf(Math.min(...columnYs));
62. const x = minColumn * (columnWidth + this.columnGap);
63. const y = columnYs[minColumn];

65. child.layout({ x, y });

67. columnYs[minColumn] += childSize.height + this.rowGap;
68. }
69. }

71. self.setLayoutPosition(position);
72. }
73. }

75. @Entry
76. @ComponentV2
77. struct WaterfallLayoutExample {
78. @Local algorithm: LayoutAlgorithm = new WaterfallLayout();

80. // 商品数据
81. private products: Product[] = [
82. { id: '1', name: '时尚运动鞋', price: '¥399', height: 180, image: '商品图' },
83. { id: '2', name: '休闲双肩包', price: '¥259', height: 220, image: '商品图' },
84. { id: '3', name: '无线蓝牙耳机', price: '¥599', height: 150, image: '商品图' },
85. { id: '4', name: '智能手表', price: '¥1299', height: 200, image: '商品图' },
86. { id: '5', name: '太阳眼镜', price: '¥199', height: 130, image: '商品图' },
87. { id: '6', name: '便携充电宝', price: '¥129', height: 170, image: '商品图' },
88. { id: '7', name: '机械键盘', price: '¥459', height: 160, image: '商品图' },
89. { id: '8', name: '游戏鼠标', price: '¥189', height: 140, image: '商品图' },
90. { id: '9', name: '高清显示器', price: '¥1599', height: 210, image: '商品图' },
91. { id: '10', name: '智能音箱', price: '¥299', height: 190, image: '商品图' }
92. ];

94. // 商品卡片组件
95. @Builder ProductCard(product: Product) {
96. Column() {
97. Text(product.image)
98. .fontSize(18)
99. .margin({ bottom: 8 })
100. Text(product.name)
101. .fontSize(14)
102. .fontWeight(FontWeight.Medium)
103. .fontColor(0x333333)
104. .margin({ bottom: 4 })
105. .maxLines(1)
106. .textOverflow({ overflow: TextOverflow.Ellipsis })
107. Text(product.price)
108. .fontSize(16)
109. .fontColor(0xFF6B35)
110. .fontWeight(FontWeight.Bold)
111. }
112. .width('100%')
113. .padding(12)
114. .backgroundColor(0xFAFAFA)
115. .borderRadius(8)
116. .border({ width: 1, color: 0xE0E0E0 })
117. .height(product.height)
118. .justifyContent(FlexAlign.Center)
119. }

121. build() {
122. Column() {
123. Text('商品列表 - 瀑布流布局')
124. .fontSize(18)
125. .fontWeight(FontWeight.Bold)
126. .margin({ bottom: 20 })

128. Scroll() {
129. DynamicLayout(this.algorithm) {
130. ForEach(this.products, (product: Product) => {
131. this.ProductCard(product)
132. })
133. }
134. .width('100%')
135. .backgroundColor(0xEFEFEF)
136. .borderRadius(12)
137. .padding(10)
138. }
139. .scrollable(ScrollDirection.Vertical)
140. .scrollBar(BarState.Auto)
141. .edgeEffect(EdgeEffect.Spring)
142. .width('100%')
143. .layoutWeight(1)

145. Text('商品卡片自动分配到高度最小的列')
146. .fontSize(14)
147. .fontColor(Color.Gray)
148. .margin({ top: 12 })
149. }
150. .padding(20)
151. .width('100%')
152. .height('100%')
153. }
154. }

156. // 商品数据模型
157. interface Product {
158. id: string;
159. name: string;
160. price: string;
161. height: number;
162. image: string;
163. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2b/v3/KjE9_5uMT9ur3qWeLWmylQ/zh-cn_image_0000002599358495.png?HW-CC-KV=V1&HW-CC-Date=20260511T034856Z&HW-CC-Expire=86400&HW-CC-Sign=0E5DA77C69B6B1884BF6599B851E97CCF464EA6D5D781F6473C5EBD94945E071)

### 示例2（切换布局算法）

该示例通过改变[@Local](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-new-local)装饰的LayoutAlgorithm变量，实现动态切换DynamicLayout组件布局算法的功能。示例展示如何切换布局算法为[水平线性布局算法](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-layoutalgorithm#rowlayoutalgorithm)、[垂直线性布局算法](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-layoutalgorithm#columnlayoutalgorithm)、[堆叠布局算法](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-layoutalgorithm#stacklayoutalgorithm)和[网格布局算法](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-layoutalgorithm#gridlayoutalgorithm)。

从API version 24开始，新增RowLayoutAlgorithm、ColumnLayoutAlgorithm、StackLayoutAlgorithm、GridLayoutAlgorithm。



```
1. import { DynamicLayout, DynamicLayoutAttribute, RowLayoutAlgorithm, ColumnLayoutAlgorithm, StackLayoutAlgorithm, GridLayoutAlgorithm, LayoutAlgorithm, LengthMetrics } from '@kit.ArkUI';

3. @Entry
4. @ComponentV2
5. struct LayoutSwitchExample {
6. @Local algorithm: LayoutAlgorithm = new RowLayoutAlgorithm({
7. space: LengthMetrics.vp(10),
8. alignItems: VerticalAlign.Center
9. });
10. @Local childWidth: string = '20%'
11. @Local childHeight: string = '20%'

13. build() {
14. Column() {
15. // 使用状态变量控制布局算法
16. DynamicLayout(this.algorithm) {
17. Text('Item 1')
18. .width(this.childWidth)
19. .height(this.childHeight)
20. .fontSize(14)
21. .textAlign(TextAlign.Center)
22. .backgroundColor(0xF5DEB3)
23. .borderRadius(8)
24. .layoutGravity(LocalizedAlignment.TOP_START)
25. Text('Item 2')
26. .width(this.childWidth)
27. .height(this.childHeight)
28. .fontSize(14)
29. .textAlign(TextAlign.Center)
30. .backgroundColor(0xF5DEB3)
31. .borderRadius(8)
32. .layoutGravity(LocalizedAlignment.TOP_END)
33. Text('Item 3')
34. .width(this.childWidth)
35. .height(this.childHeight)
36. .fontSize(14)
37. .textAlign(TextAlign.Center)
38. .backgroundColor(0xF5DEB3)
39. .borderRadius(8)
40. .layoutGravity(LocalizedAlignment.BOTTOM_START)
41. Text('Item 4')
42. .width(this.childWidth)
43. .height(this.childHeight)
44. .fontSize(14)
45. .textAlign(TextAlign.Center)
46. .backgroundColor(0xF5DEB3)
47. .borderRadius(8)
48. .layoutGravity(LocalizedAlignment.BOTTOM_END)
49. }
50. .width(300)
51. .height(280)
52. .backgroundColor(0xEFEFEF)
53. .borderRadius(12)
54. .padding(10)

56. Column({ space: 10 }) {
57. Row({ space: 10 }) {
58. Button('Row布局')
59. .fontSize(14)
60. .onClick(() => {
61. this.algorithm = new RowLayoutAlgorithm({
62. space: LengthMetrics.vp(10),
63. alignItems: VerticalAlign.Center
64. });
65. this.childWidth = '20%'
66. this.childHeight = '20%'
67. })
68. Button('Column布局')
69. .fontSize(14)
70. .onClick(() => {
71. this.algorithm = new ColumnLayoutAlgorithm({
72. space: LengthMetrics.vp(10),
73. alignItems: HorizontalAlign.Center
74. });
75. this.childWidth = '20%'
76. this.childHeight = '20%'
77. })
78. }
79. Row({ space: 10 }) {
80. Button('Stack布局')
81. .fontSize(14)
82. .onClick(() => {
83. this.algorithm = new StackLayoutAlgorithm({
84. alignContent: LocalizedAlignment.CENTER
85. });
86. this.childWidth = '20%'
87. this.childHeight = '20%'
88. })
89. Button('Grid布局')
90. .fontSize(14)
91. .onClick(() => {
92. this.algorithm = new GridLayoutAlgorithm({
93. columnsTemplate: '1fr 1fr',
94. rowsGap: LengthMetrics.vp(5),
95. columnsGap: LengthMetrics.vp(5)
96. });
97. this.childWidth = '100%'
98. this.childHeight = '50%'
99. })
100. }
101. }
102. .margin({ top: 20 })
103. }
104. .padding(20)
105. }
106. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d0/v3/YgfwHdYmRVe7DfhxAkoC6Q/zh-cn_image_0000002568918900.gif?HW-CC-KV=V1&HW-CC-Date=20260511T034856Z&HW-CC-Expire=86400&HW-CC-Sign=EAF0388CF55C93A928CE8D914A475C2B275E3E2320B7BC283232F2B1E742070C)

### 示例3（修改布局算法属性）

该示例通过修改[RowLayoutAlgorithm](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-layoutalgorithm#rowlayoutalgorithm)的space和justifyContent属性，实现DynamicLayout组件布局效果刷新的功能。

从API version 24开始，新增space、justifyContent属性。



```
1. import { DynamicLayout, DynamicLayoutAttribute, RowLayoutAlgorithm, LengthMetrics } from '@kit.ArkUI';

3. @Entry
4. @ComponentV2
5. struct PropertyChangeExample {
6. algorithm: RowLayoutAlgorithm = new RowLayoutAlgorithm({
7. space: LengthMetrics.vp(10),
8. justifyContent: FlexAlign.Start
9. });

11. build() {
12. Column() {
13. DynamicLayout(this.algorithm) {
14. Text('Item 1')
15. .width(60)
16. .height(40)
17. .fontSize(14)
18. .backgroundColor(0xF5DEB3)
19. Text('Item 2')
20. .width(60)
21. .height(40)
22. .fontSize(14)
23. .backgroundColor(0xD2B48C)
24. Text('Item 3')
25. .width(60)
26. .height(40)
27. .fontSize(14)
28. .backgroundColor(0xF5DEB3)
29. }
30. .width('100%')
31. .height(80)
32. .backgroundColor(0xEFEFEF)

34. Row({ space: 10 }) {
35. Button('增加间距')
36. .fontSize(14)
37. .onClick(() => {
38. // 修改space属性触发重新布局
39. const currentSpace = this.algorithm.space?.value;
40. this.algorithm.space = LengthMetrics.vp(currentSpace as number + 5);
41. })
42. Button('居中对齐')
43. .fontSize(14)
44. .onClick(() => {
45. // 修改justifyContent属性触发重新布局
46. this.algorithm.justifyContent = FlexAlign.Center;
47. })
48. Button('两端对齐')
49. .fontSize(14)
50. .onClick(() => {
51. this.algorithm.justifyContent = FlexAlign.SpaceBetween;
52. })
53. }
54. .margin({ top: 20 })
55. }
56. .padding(20)
57. }
58. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f6/v3/bnMzbZBrQyedssKBKC33Xw/zh-cn_image_0000002599478445.gif?HW-CC-KV=V1&HW-CC-Date=20260511T034856Z&HW-CC-Expire=86400&HW-CC-Sign=E2FA1999270EE8C9B9AEFEBCF73C78F5750424E447CB041CFE7FA08137D970A3)