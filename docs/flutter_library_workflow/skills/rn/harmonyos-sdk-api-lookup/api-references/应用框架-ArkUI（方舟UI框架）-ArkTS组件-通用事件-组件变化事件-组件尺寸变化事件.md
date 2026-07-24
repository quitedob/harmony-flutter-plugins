该事件指组件显示的尺寸发生变化时触发的事件。

说明

从API version 12开始支持。后续版本如有新增内容，则采用上角标单独标记该内容的起始版本。

该事件返回的宽高是组件绘制出来的宽高，可能与组件设置的宽高不同。

## onSizeChange

PhonePC/2in1TabletTVWearable

onSizeChange(event: SizeChangeCallback): T

组件区域变化时触发该回调。仅会响应由布局变化所导致的组件尺寸发生变化时的回调。

说明

1. 该接口在布局发生变化时触发，由于计算精度的关系，其返回值可能与真实物理尺寸存在细微的差异。
2. onSizeChange是布局过程中触发的同步回调，直接在其中更改状态变量存在被纳入动画闭包的风险。具体而言，动画会对比动画前的布局与动画闭包后的布局，若onSizeChange的回调在动画前的布局中同步触发，那么onSizeChange回调中所做的变更将与动画闭包中的变更一同纳入动画过程。为了避免此类问题，可在onSizeChange中使用延迟时间为0的[setTimeout](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-timer#settimeout)或[postFrameCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-uicontext#postframecallback12)，将UI处理逻辑延后至异步执行。

**卡片能力：** 从API version 12开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| event | [SizeChangeCallback](/consumer/cn/doc/harmonyos-references/ts-universal-component-size-change-event#sizechangecallback) | 是 | 目标元素变化前后的尺寸。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| T | 返回当前组件。 |

## SizeChangeCallback

PhonePC/2in1TabletTVWearable

type SizeChangeCallback = (oldValue: SizeOptions, newValue: SizeOptions) => void

组件区域变化时的回调类型。

**卡片能力：** 从API version 12开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| oldValue | [SizeOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#sizeoptions) | 是 | 目标元素变化之前的宽高。 |
| newValue | [SizeOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#sizeoptions) | 是 | 目标元素变化之后的宽高。 |

## 示例

PhonePC/2in1TabletTVWearable

该示例通过Text组件设置组件尺寸变化事件，当Text尺寸变化时可以触发onSizeChange事件，获取相关参数。



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
17. .onSizeChange((oldValue: SizeOptions, newValue: SizeOptions) => {
18. console.info(`Ace: on size change, oldValue is ${JSON.stringify(oldValue)} value is ${JSON.stringify(newValue)}`)
19. this.sizeValue = JSON.stringify(newValue)
20. })
21. Text('new area is: \n' + this.sizeValue).margin({ right: 30, left: 30 })
22. }
23. .width('100%').height('100%').margin({ top: 30 })
24. }
25. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/0a/v3/J_a2a12PS7S60V06EA5P5A/zh-cn_image_0000002599358365.gif?HW-CC-KV=V1&HW-CC-Date=20260511T034356Z&HW-CC-Expire=86400&HW-CC-Sign=18E31D8563C93A54BECA86A0A12316B787D2B1542637D9E5AFEDA601FE7C5FA9)