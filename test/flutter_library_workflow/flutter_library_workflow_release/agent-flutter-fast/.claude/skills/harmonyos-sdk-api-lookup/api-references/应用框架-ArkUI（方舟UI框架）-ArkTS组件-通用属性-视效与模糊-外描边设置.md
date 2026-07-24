设置组件外描边（outline）样式。外描边绘制在组件的外侧，不影响布局，不会占用组件本身大小。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7c/v3/AVMqtATkQh-n36TElF77ng/zh-cn_image_0000002568918816.png?HW-CC-KV=V1&HW-CC-Date=20260511T034529Z&HW-CC-Expire=86400&HW-CC-Sign=8922F617136414D33DD0FC3F271E273B62FD874FF296CC0B94EBD75EEE0961E0)

说明

从API version 11开始支持。后续版本如有新增内容，则采用上角标单独标记该内容的起始版本。

## outline

PhonePC/2in1TabletTVWearable

outline(value: OutlineOptions): T

统一外描边样式设置接口。

**卡片能力：** 从API version 11开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [OutlineOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#outlineoptions11对象说明) | 是 | 外描边样式。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| T | 返回当前组件。 |

## outline18+

PhonePC/2in1TabletTVWearable

outline(options: Optional<OutlineOptions>): T

统一外描边样式设置接口。与[outline](/consumer/cn/doc/harmonyos-references/ts-universal-attributes-outline#outline)相比，options参数新增了对undefined类型的支持。

**卡片能力：** 从API version 18开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| options | [Optional](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-custom-property#optionalt)<[OutlineOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#outlineoptions11对象说明)> | 是 | 外描边样式。  当options的值为undefined时，恢复为无外边框效果。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| T | 返回当前组件。 |

## OutlineStyle枚举说明

PhonePC/2in1TabletTVWearable

外描边样式。

**卡片能力：** 从API version 11开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| SOLID | 0 | 显示为一条实线。 |
| DASHED | 1 | 显示为一系列短的方形虚线。 |
| DOTTED | 2 | 显示为一系列圆点，圆点半径为outlineWidth的一半。 |

## outlineStyle

PhonePC/2in1TabletTVWearable

outlineStyle(value: OutlineStyle | EdgeOutlineStyles): T

设置元素的外描边样式。不设置该接口时，默认显示为一条实线。

**卡片能力：** 从API version 11开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [OutlineStyle](/consumer/cn/doc/harmonyos-references/ts-universal-attributes-outline#outlinestyle枚举说明) | [EdgeOutlineStyles](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#edgeoutlinestyles11对象说明) | 是 | 设置元素的外描边样式。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| T | 返回当前组件。 |

## outlineStyle18+

PhonePC/2in1TabletTVWearable

outlineStyle(style: Optional<OutlineStyle | EdgeOutlineStyles>): T

设置元素的外描边样式。不设置该接口时，默认显示为一条实线。与[outlineStyle](/consumer/cn/doc/harmonyos-references/ts-universal-attributes-outline#outlinestyle)相比，style参数新增了对undefined类型的支持。

**卡片能力：** 从API version 18开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| style | [Optional](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-custom-property#optionalt)<[OutlineStyle](/consumer/cn/doc/harmonyos-references/ts-universal-attributes-outline#outlinestyle枚举说明) | [EdgeOutlineStyles](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#edgeoutlinestyles11对象说明)> | 是 | 设置元素的外描边样式。  当style的值为undefined时，恢复为无外描边样式的效果。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| T | 返回当前组件。 |

## outlineWidth

PhonePC/2in1TabletTVWearable

outlineWidth(value: Dimension | EdgeOutlineWidths): T

设置元素的外描边宽度。不设置该接口时，默认无变化。

**卡片能力：** 从API version 11开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [Dimension](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#dimension10) | [EdgeOutlineWidths](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#edgeoutlinewidths11对象说明) | 是 | 设置元素的外描边宽度，不支持百分比。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| T | 返回当前组件。 |

## outlineWidth18+

PhonePC/2in1TabletTVWearable

outlineWidth(width: Optional<Dimension | EdgeOutlineWidths>): T

设置元素的外描边宽度。不设置该接口时，默认无变化。与[outlineWidth](/consumer/cn/doc/harmonyos-references/ts-universal-attributes-outline#outlinewidth)相比，width参数新增了对undefined类型的支持。

**卡片能力：** 从API version 18开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| width | [Optional](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-custom-property#optionalt)<[Dimension](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#dimension10) | [EdgeOutlineWidths](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#edgeoutlinewidths11对象说明)> | 是 | 设置元素的外描边宽度，不支持百分比。  当width的值为undefined时，恢复为无外描边宽度的效果。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| T | 返回当前组件。 |

## outlineColor

PhonePC/2in1TabletTVWearable

outlineColor(value: ResourceColor | EdgeColors | LocalizedEdgeColors): T

设置元素的外描边颜色。不设置该接口时，默认显示为黑色。

**卡片能力：** 从API version 11开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [ResourceColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcecolor) | [EdgeColors](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#edgecolors9) | [LocalizedEdgeColors](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#localizededgecolors12)12+ | 是 | 设置元素的外描边颜色。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| T | 返回当前组件。 |

## outlineColor18+

PhonePC/2in1TabletTVWearable

outlineColor(color: Optional<ResourceColor | EdgeColors | LocalizedEdgeColors>): T

设置元素的外描边颜色。不设置该接口时，默认显示为黑色。与[outlineColor](/consumer/cn/doc/harmonyos-references/ts-universal-attributes-outline#outlinecolor)相比，color参数新增了对undefined类型的支持。

**卡片能力：** 从API version 18开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| color | [Optional](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-custom-property#optionalt)<[ResourceColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcecolor) | [EdgeColors](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#edgecolors9) | [LocalizedEdgeColors](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#localizededgecolors12)> | 是 | 设置元素的外描边颜色。  当color的值为undefined时，恢复为描边颜色为Color.Black的效果。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| T | 返回当前组件。 |

## outlineRadius

PhonePC/2in1TabletTVWearable

outlineRadius(value: Dimension | OutlineRadiuses): T

设置元素的外描边圆角半径。不设置该接口时，默认无变化。

**卡片能力：** 从API version 11开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [Dimension](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#dimension10) | [OutlineRadiuses](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#outlineradiuses11对象说明) | 是 | 设置元素的外描边圆角半径，不支持百分比。  最大生效值：组件width/2 + outlineWidth或组件height/2 + outlineWidth。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| T | 返回当前组件。 |

## outlineRadius18+

PhonePC/2in1TabletTVWearable

outlineRadius(radius: Optional<Dimension | OutlineRadiuses>): T

设置元素的外描边圆角半径。不设置该接口时，默认无变化。与[outlineRadius](/consumer/cn/doc/harmonyos-references/ts-universal-attributes-outline#outlineradius)相比，radius参数新增了对undefined类型的支持。

**卡片能力：** 从API version 18开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| radius | [Optional](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-custom-property#optionalt)<[Dimension](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#dimension10) | [OutlineRadiuses](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#outlineradiuses11对象说明)> | 是 | 设置元素的外描边圆角半径，不支持百分比。  最大生效值：组件width/2 + outlineWidth或组件height/2 + outlineWidth。  当radius的值为undefined时，恢复为外描边圆角半径为0的效果。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| T | 返回当前组件。 |

## 示例

PhonePC/2in1TabletTVWearable

### 示例1（使用外描边属性）

该示例主要演示如何通过[outline](/consumer/cn/doc/harmonyos-references/ts-universal-attributes-outline#outline)来实现组件外描边。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct OutlineExample {
5. build() {
6. Column() {
7. Flex({ justifyContent: FlexAlign.SpaceAround, alignItems: ItemAlign.Center }) {
8. // 线段
9. Text('DASHED')
10. .backgroundColor(Color.Pink)
11. .outlineStyle(OutlineStyle.DASHED).outlineWidth(5).outlineColor(0xAFEEEE).outlineRadius(10)
12. .width(120).height(120).textAlign(TextAlign.Center).fontSize(16)
13. // 点线
14. Text('DOTTED')
15. .backgroundColor(Color.Pink)
16. .outline({ width: 5, color: 0x317AF7, radius: 10, style: OutlineStyle.DOTTED })
17. .width(120).height(120).textAlign(TextAlign.Center).fontSize(16)
18. }.width('100%').height(150)

20. Text('.outline')
21. .backgroundColor(Color.Pink)
22. .fontSize(50)
23. .width(300)
24. .height(300)
25. .outline({
26. width: { left: 3, right: 6, top: 10, bottom: 15 },
27. color: { left: '#e3bbbb', right: Color.Blue, top: Color.Red, bottom: Color.Green },
28. radius: { topLeft: 10, topRight: 20, bottomLeft: 40, bottomRight: 80 },
29. style: {
30. left: OutlineStyle.DOTTED,
31. right: OutlineStyle.DOTTED,
32. top: OutlineStyle.SOLID,
33. bottom: OutlineStyle.DASHED
34. }
35. }).textAlign(TextAlign.Center)
36. }
37. }
38. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5/v3/ce3KrvIwRLOptbDYzH8UWg/zh-cn_image_0000002599478361.png?HW-CC-KV=V1&HW-CC-Date=20260511T034529Z&HW-CC-Expire=86400&HW-CC-Sign=17F49FC4F4D6D9DE70AABB634B786E8E135C521A2FB8F81C5B1370D68B82FD84)

### 示例2（使用LocalizedEdgeColors类型）

该示例将[outline](/consumer/cn/doc/harmonyos-references/ts-universal-attributes-outline#outline)属性中的color属性值设置为[LocalizedEdgeColors](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#localizededgecolors12)类型。



```
1. // xxx.ets

3. @Entry
4. @Component
5. struct OutlineExample {
6. build() {
7. Column() {
8. Flex({ justifyContent: FlexAlign.SpaceAround, alignItems: ItemAlign.Center }) {
9. // 线段
10. Text('DASHED')
11. .backgroundColor(Color.Pink)
12. .outlineStyle(OutlineStyle.DASHED).outlineWidth(5).outlineColor(0xAFEEEE).outlineRadius(10)
13. .width(120).height(120).textAlign(TextAlign.Center).fontSize(16)
14. // 点线
15. Text('DOTTED')
16. .backgroundColor(Color.Pink)
17. .outline({ width: 5, color: 0x317AF7, radius: 10, style: OutlineStyle.DOTTED })
18. .width(120).height(120).textAlign(TextAlign.Center).fontSize(16)
19. }.width('100%').height(150)

21. Text('.outline')
22. .backgroundColor(Color.Pink)
23. .fontSize(50)
24. .width(300)
25. .height(300)
26. .outline({
27. width: { left: 3, right: 6, top: 10, bottom: 15 },
28. color: { start: '#e3bbbb', end: Color.Blue, top: Color.Red, bottom: Color.Green },
29. radius: { topLeft: 10, topRight: 20, bottomLeft: 40, bottomRight: 80 },
30. style: {
31. left: OutlineStyle.DOTTED,
32. right: OutlineStyle.DOTTED,
33. top: OutlineStyle.SOLID,
34. bottom: OutlineStyle.DASHED
35. }
36. }).textAlign(TextAlign.Center)
37. }
38. }
39. }
```

从左至右显示语言示例图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/68/v3/-rPH1BC-SliJQ4rV5MCULQ/zh-cn_image_0000002568759170.png?HW-CC-KV=V1&HW-CC-Date=20260511T034529Z&HW-CC-Expire=86400&HW-CC-Sign=91A8E6B47DDF49FD42F6783A667911BB2C222C6C2C6AB5EC105244AC2DBC302D)

从右至左显示语言示例图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b5/v3/elSRYdMFRy61-mXerTqjpQ/zh-cn_image_0000002599358413.png?HW-CC-KV=V1&HW-CC-Date=20260511T034529Z&HW-CC-Expire=86400&HW-CC-Sign=37D9E4F3412BA13AAC896BF0330853122EA10A7FA013EFD6EDEF019AFDBB684D)