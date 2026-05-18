焦点事件指页面焦点在可获焦组件间移动时触发的事件，组件可使用焦点事件来处理相关逻辑。

说明

* 本模块首批接口从API version 8开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。
* 不支持嵌套滚动组件场景按键走焦。
* 存在默认交互逻辑的组件例如[Button](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-button)、[TextInput](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-textinput)等，默认即为可获焦，[Text](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text)、[Image](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-image)等组件默认状态为不可获焦，不可获焦状态下，无法触发焦点事件，需要设置[focusable](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-focus#focusable)属性为true才可触发。
* 对于有获焦能力的容器组件，例如[Stack](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-stack)、[Row](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-row)等，若不存在可获焦子组件，该容器组件不可获焦。为其配置onClick或是单指单击的Tap手势，且不显式配置focusable属性，该组件会隐式地成为可获焦组件。
* 焦点开发及组件获焦能力参考[支持焦点处理](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-common-events-focus-event)。

## onFocus

PhonePC/2in1TabletTVWearable

onFocus(event: () => void): T

当前组件获取焦点时触发的回调。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| event | () => void | 是 | onFocus的回调函数，表示组件已获焦。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| T | 返回当前组件。 |

## onBlur

PhonePC/2in1TabletTVWearable

onBlur(event:() => void): T

当前组件失去焦点时触发的回调。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| event | () => void | 是 | onBlur的回调函数，表示组件已失焦。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| T | 返回当前组件。 |

## 示例

PhonePC/2in1TabletTVWearable

该示例展示了组件获焦和失焦的情况，按钮获焦和失焦时会改变按钮的颜色。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct FocusEventExample {
5. @State oneButtonColor: string = '#0066FF'
6. @State twoButtonColor: string = '#87CEFA'
7. @State threeButtonColor: string = '#90EE90'

9. build() {
10. Column({ space: 20 }) {
11. // 通过外接键盘的Tab键激活焦点，并使用上下键让焦点在三个按钮间移动，按钮获焦时颜色变化，失焦时变回原背景色
12. Button('First Button')
13. .backgroundColor(this.oneButtonColor)
14. .width(260)
15. .height(70)
16. .fontColor(Color.Black)
17. .focusable(true)
18. .onFocus(() => {
19. this.oneButtonColor = '#FFFFFF'
20. })
21. .onBlur(() => {
22. this.oneButtonColor = '#0066FF'
23. })
24. Button('Second Button')
25. .backgroundColor(this.twoButtonColor)
26. .width(260)
27. .height(70)
28. .fontColor(Color.Black)
29. .focusable(true)
30. .onFocus(() => {
31. this.twoButtonColor = '#FFFFFF'
32. })
33. .onBlur(() => {
34. this.twoButtonColor = '#87CEFA'
35. })
36. Button('Third Button')
37. .backgroundColor(this.threeButtonColor)
38. .width(260)
39. .height(70)
40. .fontColor(Color.Black)
41. .focusable(true)
42. .onFocus(() => {
43. this.threeButtonColor = '#FFFFFF'
44. })
45. .onBlur(() => {
46. this.threeButtonColor = '#90EE90'
47. })
48. }.width('100%').margin({ top: 20 })
49. }
50. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5e/v3/e40x-k7iQmi7_lsNWMHH2A/zh-cn_image_0000002599358359.png?HW-CC-KV=V1&HW-CC-Date=20260511T034318Z&HW-CC-Expire=86400&HW-CC-Sign=CF0CE3CC2D0E7FCFCE4A560F564450AB8B9FBD34F449B0AD6A86F7F0C768269C)