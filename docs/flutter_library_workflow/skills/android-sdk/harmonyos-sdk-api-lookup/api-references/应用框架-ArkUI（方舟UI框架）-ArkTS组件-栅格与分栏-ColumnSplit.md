将子组件纵向布局，并在每个子组件之间插入横向分割线。

说明

该组件从API version 7开始支持。后续版本如有新增内容，则采用上角标单独标记该内容的起始版本。

## 子组件

PhonePC/2in1TabletTVWearable

可以包含子组件。

ColumnSplit通过分割线限制子组件的高度。初始化时，分割线位置根据子组件的高度来计算。初始化后，动态修改子组件的高度不生效，分割线位置保持不变，可通过拖动相邻分割线改变子组件高度。

初始化后，动态修改[margin](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-size#margin)、[border](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-border#border)、[padding](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-size#padding)通用属性导致子组件尺寸大于相邻分割线间距的异常情况下，不支持拖动分割线改变子组件的高度。

## 接口

PhonePC/2in1TabletTVWearable

ColumnSplit()

带分割线的子组件纵向布局。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

## 属性

PhonePC/2in1TabletTVWearable

除支持[通用属性](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-component-general-attributes)外，还支持以下属性：

说明

ColumnSplit组件[形状裁剪](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-sharp-clipping)的默认值为true。

### resizeable

PhonePC/2in1TabletTVWearable

resizeable(value: boolean)

设置分割线是否可拖拽。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | boolean | 是 | 分割线是否可拖拽。设置为true时表示分割线可拖拽，设置为false时表示分割线不可拖拽。  默认值：false  非法值：按默认值处理。 |

### divider10+

PhonePC/2in1TabletTVWearable

divider(value: ColumnSplitDividerStyle | null)

设置分割线的margin。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [ColumnSplitDividerStyle](/consumer/cn/doc/harmonyos-references/ts-container-columnsplit#columnsplitdividerstyle10对象说明) | null | 是 | 分割线的margin，即设置分割线与子组件的距离。  默认值：null。当设置为null时，分割线与子组件的距离为0vp。  非法值：按默认值处理。 |

## ColumnSplitDividerStyle10+对象说明

PhonePC/2in1TabletTVWearable

设置子组件与上下分割线的距离。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| startMargin | [Dimension](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#dimension10) | 否 | 是 | 子组件与其上方分割线的距离。  默认值：0vp  非法值：按默认值处理，此时[getInspectorByKey()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-component-id#getinspectorbykey9)接口获取到的属性值为undefined。 |
| endMargin | [Dimension](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#dimension10) | 否 | 是 | 子组件与其下方分割线的距离。  默认值：0vp  非法值：按默认值处理，此时[getInspectorByKey()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-component-id#getinspectorbykey9)接口获取到的属性值为undefined。 |

说明

与[RowSplit](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-rowsplit)相同，ColumnSplit的分割线可调整上下两侧子组件的高度，子组件的高度调整范围受其最大最小高度限制。

支持[clip](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-sharp-clipping#clip12)、[margin](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-size#margin)等通用属性，未设置clip属性时，其默认值为true。

## 事件

PhonePC/2in1TabletTVWearable

支持[通用事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-component-general-events)。

## 示例

PhonePC/2in1TabletTVWearable

### 示例1（设置可拖动的ColumnSplit组件）

本示例展示如何设置可拖动的ColumnSplit组件及其效果。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct ColumnSplitExample {
5. build() {
6. Column() {
7. Text('The dividing line can be dragged').fontSize(9).fontColor(0xCCCCCC).width('90%')
8. ColumnSplit() {
9. Text('1').width('100%').height(50).backgroundColor(0xF5DEB3).textAlign(TextAlign.Center)
10. Text('2').width('100%').height(50).backgroundColor(0xD2B48C).textAlign(TextAlign.Center)
11. Text('3').width('100%').height(50).backgroundColor(0xF5DEB3).textAlign(TextAlign.Center)
12. Text('4').width('100%').height(50).backgroundColor(0xD2B48C).textAlign(TextAlign.Center)
13. Text('5').width('100%').height(50).backgroundColor(0xF5DEB3).textAlign(TextAlign.Center)
14. }
15. .borderWidth(1)
16. .resizeable(true) // 可拖动
17. .width('90%').height('60%')
18. }.width('100%')
19. }
20. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/71/v3/OQq0fSwtQNGnPWIfgA9m1A/zh-cn_image_0000002599358493.gif?HW-CC-KV=V1&HW-CC-Date=20260511T034845Z&HW-CC-Expire=86400&HW-CC-Sign=4EDE25BFBDCAC55C8B3030FC58982F407F876E70FA8F6AAFCA88506470037DF4)

### 示例2（设置带有间隔的ColumnSplit组件）

本示例展示如何设置带有间隔的ColumnSplit组件及其效果。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct ColumnSplitDividerExample {
5. build() {
6. Column() {
7. Text('The dividing line can be dragged').fontSize(9).fontColor(0xCCCCCC).width('90%')
8. ColumnSplit() {
9. Text('1').width('100%').height(50).backgroundColor(0xF5DEB3).textAlign(TextAlign.Center)
10. Text('2').width('100%').height(50).backgroundColor(0xD2B48C).textAlign(TextAlign.Center)
11. Text('3').width('100%').height(50).backgroundColor(0xF5DEB3).textAlign(TextAlign.Center)
12. Text('4').width('100%').height(50).backgroundColor(0xD2B48C).textAlign(TextAlign.Center)
13. Text('5').width('100%').height(50).backgroundColor(0xF5DEB3).textAlign(TextAlign.Center)
14. }
15. .borderWidth(1)
16. .divider({ startMargin: 5, endMargin: 5 }) // 设置间隔
17. .width('90%')
18. .height('60%')
19. }.width('100%')
20. }
21. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/26/v3/3kEsZJXUQOibt9Feo1y6ng/zh-cn_image_0000002568918898.png?HW-CC-KV=V1&HW-CC-Date=20260511T034845Z&HW-CC-Expire=86400&HW-CC-Sign=19F19A9E87D5DBE7042E90B9891B3969A3B146C857CCE5E470824FAA6A498B81)