本模块提供创建录音设备选择组件AVInputCastPicker的功能，提供录音设备发现连接的统一入口。

说明

* 本模块首批接口从API version 20开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。
* 示例效果请以真机为准，当前DevEco Studio预览器无实际录音设备选择功能。

## 导入模块

PC/2in1



```
1. import { AVInputCastPicker } from '@kit.AVSessionKit';
```

## 属性

PC/2in1

支持[通用属性](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-component-general-attributes)。

## AVInputCastPicker

PC/2in1



```
1. AVInputCastPicker({
2. customPicker?: CustomBuilder;
3. onStateChange?: OnPickerStateCallback;
4. })
```

录音设备选择组件，可用于切换音频输入设备。

该组件为自定义组件，开发者在使用前需要先了解[@Component](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-create-custom-components#component)。

**装饰器类型：** [@Component](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-create-custom-components#component)

**元服务API：** 从API version 20开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Multimedia.AVSession.AVInputCast

**参数：**

展开

| 名称 | 类型 | 必填 | 装饰器类型 | 说明 |
| --- | --- | --- | --- | --- |
| customPicker | [CustomBuilder](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#custombuilder8) | 否 | @Prop | 自定义样式。建议应用自定义组件样式，可有效提升组件渲染性能。 |
| onStateChange | [OnPickerStateCallback](/consumer/cn/doc/harmonyos-references/ohos-multimedia-avinputcastpicker#onpickerstatecallback) | 否 | - | 设备列表状态变更回调。 |

## OnPickerStateCallback

PC/2in1

type OnPickerStateCallback = (state: AVCastPickerState) => void

**元服务API：** 从API version 20开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Multimedia.AVSession.AVInputCast

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| state | [AVCastPickerState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-avcastpickerparam#avcastpickerstate) | 是 | 设备列表状态。 |

## 事件

PC/2in1

支持[通用事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-component-general-events)。

## 示例

PC/2in1

录音设备选择组件功能的示例说明参考如下。



```
1. import { AVCastPickerState, AVInputCastPicker } from '@kit.AVSessionKit';

3. @Entry
4. @Component
5. struct Index {

7. @State pickerImage: ResourceStr = $r('app.media.layered_image'); // 自定义资源。

9. private onStateChange(state: AVCastPickerState) {
10. if (state == AVCastPickerState.STATE_APPEARING) {
11. console.info('The picker starts showing.');
12. } else if (state == AVCastPickerState.STATE_DISAPPEARING) {
13. console.info('The picker finishes presenting.');
14. }
15. }

17. @Builder
18. customPickerBuilder() {
19. Image(this.pickerImage)
20. .width('100%')
21. .height('100%')
22. .fillColor(Color.Black)
23. }

25. build() {
26. Row() {
27. Column() {
28. AVInputCastPicker({
29. customPicker: () => this.customPickerBuilder(),
30. onStateChange: this.onStateChange
31. })
32. .width('40vp')
33. .height('40vp')
34. .border({ width: 1, color: Color.Red })
35. }.height('50%')
36. }.width('50%')
37. }
38. }
```