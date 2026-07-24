组件区域变化事件指组件显示的尺寸、位置等发生变化时触发的事件。

说明

从API version 8开始支持。后续版本如有新增内容，则采用上角标单独标记该内容的起始版本。

onAreaChange回调执行仅与本组件有关，对祖先或子孙组件上的onAreaChange的回调没有严格的执行顺序和限制保证。

## onAreaChange

PhonePC/2in1TabletTVWearable

onAreaChange(event: (oldValue: Area, newValue: Area) => void): T

组件区域变化时触发该回调。仅会响应由布局变化所导致的组件大小、位置发生变化时的回调。

由绘制变化所导致的渲染属性变化不会响应回调，如[translate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-transformation#translate)、[offset](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-location#offset)、[markAnchor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-location#markanchor)、[scale](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-transformation#scale)、[transform](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-transformation#transform)。若组件自身位置由绘制变化决定也不会响应回调，如[bindSheet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-sheet-transition#bindsheet)。

说明

当组件同时绑定onAreaChange事件和[position](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-location#position)属性时，onAreaChange事件响应设置[Position](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#position)类型的position属性变化，不响应设置[Edges](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#edges12)和[LocalizedEdges](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#localizededges12)类型的position属性变化。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| event | (oldValue: [Area](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#area8), newValue: [Area](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#area8)) => void | 是 | 返回目标元素位置信息变化情况，oldValue为目标元素变化之前的宽高以及目标元素相对父元素和页面左上角的坐标位置。newValue为目标元素变化之后的宽高以及目标元素相对父元素和页面左上角的坐标位置。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| T | 返回当前组件。 |

## 示例

PhonePC/2in1TabletTVWearable

该示例通过Text组件设置组件区域变化事件，当Text布局变化时可以触发onAreaChange事件，获取相关参数。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct AreaExample {
5. @State value: string = 'Text'
6. @State sizeValue: string = ''

8. build() {
9. Column() {
10. Text(this.value)
11. .backgroundColor(Color.Green)
12. .margin(30)
13. .fontSize(20)
14. .onClick(() => {
15. this.value = this.value + 'Text'
16. })
17. .onAreaChange((oldValue: Area, newValue: Area) => {
18. console.info(`Ace: on area change, oldValue is ${JSON.stringify(oldValue)} value is ${JSON.stringify(newValue)}`)
19. this.sizeValue = JSON.stringify(newValue)
20. })
21. Text('new area is: \n' + this.sizeValue).margin({ right: 30, left: 30 })
22. }
23. .width('100%').height('100%').margin({ top: 30 })
24. }
25. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/30/v3/EtEETwRYQTKV9SFOUPdoAA/zh-cn_image_0000002568759122.gif?HW-CC-KV=V1&HW-CC-Date=20260511T034353Z&HW-CC-Expire=86400&HW-CC-Sign=CF3A1F37D06075AC4B3134B5450EC1D83B5CD77184AB57D9B05D68FA70EF3184)