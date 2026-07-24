空白填充组件，在容器主轴方向上，空白填充组件具有自动填充容器空余部分的能力。仅当父组件为[Row](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-row)/[Column](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-column)/[Flex](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-flex)时生效。

说明

该组件从API version 7开始支持。后续版本如有新增内容，则采用上角标单独标记该内容的起始版本。

## 子组件

PhonePC/2in1TabletTVWearable

不支持设置子组件。

## 接口

PhonePC/2in1TabletTVWearable

Blank(min?: number | string)

创建空白填充组件。

从API version 10开始：

* Blank在父容器[Row](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-row)、[Column](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-column)、[Flex](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-flex)主轴方向上未设置大小时会自动拉伸、压缩，设置了大小或容器自适应子节点大小时不会自动拉伸、压缩。
* Blank设置主轴方向大小（size）与min时约束关系为max(min, size)。
* Blank在父容器交叉轴上设置大小时不会撑满父容器交叉轴，交叉轴不设置大小时alignSelf默认值为ItemAlign.Stretch，会撑满容器交叉轴。

**卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| min | number | string | 否 | 空白填充组件在容器主轴上的最小大小。  默认值：0，number类型单位为vp，string类型可以显式指定[像素单位](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-pixel-units)，如'10px'。不指定像素单位时，默认单位vp，如'10'，等同于10vp。  非法值：按默认值处理。  **说明：**  不支持设置百分比。负值使用默认值。当最小值大于容器可用空间时，使用最小值作为自身大小并超出容器。 |

## 属性

PhonePC/2in1TabletTVWearable

除支持[通用属性](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-component-general-attributes)外，还支持以下属性：

### color

PhonePC/2in1TabletTVWearable

color(value: ResourceColor)

设置空白填充的填充颜色，支持[attributeModifier](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-attribute-modifier#attributemodifier)动态设置属性方法。

**卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [ResourceColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcecolor) | 是 | 空白填充的填充颜色。  默认值：Color.Transparent  非法值：按默认值处理。 |

## 事件

PhonePC/2in1TabletTVWearable

支持[通用事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-component-general-events)。

## 示例

PhonePC/2in1TabletTVWearable

### 示例1（占满空余空间）

Blank组件在横竖屏占满空余空间效果。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct BlankExample {
5. build() {
6. Column() {
7. Row() {
8. Text('Bluetooth').fontSize(18)
9. Blank()
10. Toggle({ type: ToggleType.Switch }).margin({ top: 14, bottom: 14, left: 6, right: 6 })
11. }.width('100%').backgroundColor(0xFFFFFF).borderRadius(15).padding({ left: 12 })
12. }.backgroundColor(0xEFEFEF).padding(20)
13. }
14. }
```

竖屏状态

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8b/v3/Ccw77Dv5QbqGkbrTcQITKQ/zh-cn_image_0000002599358817.gif?HW-CC-KV=V1&HW-CC-Date=20260511T035234Z&HW-CC-Expire=86400&HW-CC-Sign=6B959580864CC4B9099C6A7A273DB09E15B2F5791A755BB852B8E1313E713E1C)

横屏状态

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/05/v3/_K004yp3SiaU2wYntW-dtg/zh-cn_image_0000002568919222.gif?HW-CC-KV=V1&HW-CC-Date=20260511T035234Z&HW-CC-Expire=86400&HW-CC-Sign=FEE3A5AA3BFA6BF12F1895AD67C85B48EE7C6373A9922416CCF5370BD6108DB5)

### 示例2（填充固定宽度）

Blank组件的父组件未设置宽度时，min参数的使用效果。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct BlankExample {
5. build() {
6. Column({ space: 20 }) {
7. // Blank父组件不设置宽度时，Blank失效，可以通过设置min最小宽度填充固定宽度
8. Row() {
9. Text('Bluetooth').fontSize(18)
10. Blank().color(Color.Yellow)
11. Toggle({ type: ToggleType.Switch }).margin({ top: 14, bottom: 14, left: 6, right: 6 })
12. }.backgroundColor(0xFFFFFF).borderRadius(15).padding({ left: 12 })

14. Row() {
15. Text('Bluetooth').fontSize(18)
16. // 设置最小宽度为160
17. Blank('160').color(Color.Yellow)
18. Toggle({ type: ToggleType.Switch }).margin({ top: 14, bottom: 14, left: 6, right: 6 })
19. }.backgroundColor(0xFFFFFF).borderRadius(15).padding({ left: 12 })

21. }.backgroundColor(0xEFEFEF).padding(20).width('100%')
22. }
23. }
```

Blank父组件未设置宽度时，子组件间无空白填充，使用min参数设置填充尺寸

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/66/v3/CDeFR_hhS469LKj2h9RO9w/zh-cn_image_0000002599478767.png?HW-CC-KV=V1&HW-CC-Date=20260511T035234Z&HW-CC-Expire=86400&HW-CC-Sign=CAC1BB4E8BAD8C9BF684188002FBDC6DEFC0E2F945921AEF3BC12B6B3552B70D)