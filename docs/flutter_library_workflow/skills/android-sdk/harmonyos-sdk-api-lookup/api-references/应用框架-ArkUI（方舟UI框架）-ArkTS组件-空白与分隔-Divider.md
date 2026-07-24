提供分割线组件，分割不同内容块/内容元素。

说明

该组件从API version 7开始支持。后续版本如有新增内容，则采用上角标单独标记该内容的起始版本。

如果出现分割线粗细不一或者消失的问题，请参考[组件级像素取整常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-pixelroundforcomponent#常见问题)。

## 子组件

PhonePC/2in1TabletTVWearable

无

## 接口

PhonePC/2in1TabletTVWearable

Divider()

创建分割线组件。

**卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

## 属性

PhonePC/2in1TabletTVWearable

除支持[通用属性](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-component-general-attributes)外，还支持以下属性：

### vertical

PhonePC/2in1TabletTVWearable

vertical(value: boolean)

设置分割线的方向，支持[attributeModifier](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-attribute-modifier#attributemodifier)动态设置属性方法。

**卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | boolean | 是 | 使用水平分割线还是垂直分割线。  false：水平分割线；true：垂直分割线。  默认值：false  非法值：按默认值处理。 |

### color

PhonePC/2in1TabletTVWearable

color(value: ResourceColor)

设置分割线的颜色，支持[attributeModifier](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-attribute-modifier#attributemodifier)动态设置属性方法。

**卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [ResourceColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcecolor) | 是 | 分割线颜色。  默认值：'#33182431'  非法值：按默认值处理。  支持通过[WithTheme](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-with-theme)设置通用分割线颜色。 |

### strokeWidth

PhonePC/2in1TabletTVWearable

strokeWidth(value: number | string)

设置分割线的宽度，支持[attributeModifier](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-attribute-modifier#attributemodifier)动态设置属性方法。

说明

* 分割线的宽度不支持百分比设置。
* 使用水平分割线时，strokeWidth控制高度，优先级低于通用属性[height](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-size#height)；使用垂直分割线时，strokeWidth控制宽度，优先级低于通用属性[width](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-size#width)。
* 超过通用属性设置大小时，按照通用属性进行裁切。
* 如果设备硬件存在1像素取整后分割线不显示问题，建议使用2像素。

**卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | number | string | 是 | 分割线宽度。  默认值：1px  非法值：按默认值处理。  单位：vp |

### lineCap

PhonePC/2in1TabletTVWearable

lineCap(value: LineCapStyle)

设置分割线的端点样式，支持[attributeModifier](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-attribute-modifier#attributemodifier)动态设置属性方法。

**卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [LineCapStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#linecapstyle) | 是 | 分割线的端点样式。  默认值：LineCapStyle.Butt  非法值：按默认值处理。 |

## 事件

PhonePC/2in1TabletTVWearable

支持[通用事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-component-general-events)。

## 示例

PhonePC/2in1TabletTVWearable

### 示例1（定义Divider方向、颜色及宽度）

该示例定义了Divider的样式，如方向、颜色及宽度。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct DividerExample {
5. build() {
6. Column() {
7. // 使用横向分割线场景
8. Text('Horizontal divider').fontSize(9).fontColor(0xCCCCCC)
9. List() {
10. ForEach([1, 2, 3], (item: number) => {
11. ListItem() {
12. Text('list' + item).width('100%').fontSize(14).fontColor('#182431').textAlign(TextAlign.Start)
13. }.width(244).height(48)
14. }, (item: number) => item.toString())
15. }.padding({ left: 24, bottom: 8 })

17. Divider().strokeWidth(8).color('#F1F3F5')
18. List() {
19. ForEach([4, 5], (item: number) => {
20. ListItem() {
21. Text('list' + item).width('100%').fontSize(14).fontColor('#182431').textAlign(TextAlign.Start)
22. }.width(244).height(48)
23. }, (item: number) => item.toString())
24. }.padding({ left: 24, top: 8 })

26. // 使用纵向分割线场景
27. Text('Vertical divider').fontSize(9).fontColor(0xCCCCCC)
28. Column() {
29. Column() {
30. Row().width(288).height(64).backgroundColor('#30C9F0').opacity(0.3)
31. Row() {
32. Button('Button')
33. .width(136)
34. .height(22)
35. .fontSize(16)
36. .fontColor('#007DFF')
37. .fontWeight(500)
38. .backgroundColor(Color.Transparent)
39. Divider()
40. .vertical(true)
41. .height(22)
42. .color('#182431')
43. .opacity(0.6)
44. .margin({ left: 8, right: 8 })
45. Button('Button')
46. .width(136)
47. .height(22)
48. .fontSize(16)
49. .fontColor('#007DFF')
50. .fontWeight(500)
51. .backgroundColor(Color.Transparent)
52. }.margin({ top: 17 })
53. }
54. .width(336)
55. .height(152)
56. .backgroundColor('#FFFFFF')
57. .borderRadius(24)
58. .padding(24)
59. }
60. .width('100%')
61. .height(168)
62. .backgroundColor('#F1F3F5')
63. .justifyContent(FlexAlign.Center)
64. .margin({ top: 8 })
65. }.width('100%').padding({ top: 24 })
66. }
67. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/94/v3/NGdsiSxcQKG775onS2QTIw/zh-cn_image_0000002568759576.png?HW-CC-KV=V1&HW-CC-Date=20260511T035235Z&HW-CC-Expire=86400&HW-CC-Sign=53C46F5A01D2A2DB24ECE92E96E4A7BAB4D2D39D85CAF14438BD10CD124BB66A)

### 示例2（定义Divider的lineCap样式）

该示例定义了Divider的lineCap样式。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct DividerExample {
5. build() {
6. Column({space:30}) {
7. Text("LineCap:Butt")
8. Divider()
9. .strokeWidth(20)
10. .width("90%")
11. .color('#F1F3F5')
12. .lineCap(LineCapStyle.Butt)

14. Text("LineCap:Round")
15. Divider()
16. .strokeWidth(20)
17. .width("90%")
18. .color('#F1F3F5')
19. .lineCap(LineCapStyle.Round)

21. Text("LineCap:Square")
22. Divider()
23. .strokeWidth(20)
24. .width("90%")
25. .color('#F1F3F5')
26. .lineCap(LineCapStyle.Square)

28. }.width('100%').padding({ top: 24 })
29. }
30. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c3/v3/eBZ-PVfgRxmx27BNFYn1mA/zh-cn_image_0000002599358819.png?HW-CC-KV=V1&HW-CC-Date=20260511T035235Z&HW-CC-Expire=86400&HW-CC-Sign=E63FE4B83A29A1DC972ECEB1B67410FA03D033AD03482BC7418C39D570D1A12E)