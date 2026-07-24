滑动选择时间的组件。

说明

* 该组件从API version 8开始支持。后续版本如有新增内容，则采用上角标单独标记该内容的起始版本。
* 该组件不建议开发者在动效过程中修改属性数据。
* 最大显示行数在横、竖屏模式下存在差异。竖屏时默认为5行，横屏时依赖系统配置，未配置时默认显示为3行。可通过如下参数查看具体配置值$r('sys.float.ohos\_id\_picker\_show\_count\_landscape')。

## 子组件

PhonePC/2in1TabletTVWearable

无

## 接口

PhonePC/2in1TabletTVWearable

TimePicker(options?: TimePickerOptions)

创建滑动选择器，默认使用24小时的时间区间。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| options | [TimePickerOptions](/consumer/cn/doc/harmonyos-references/ts-basic-components-timepicker#timepickeroptions对象说明) | 否 | 配置时间选择组件的参数。 |

## TimePickerOptions对象说明

PhonePC/2in1TabletTVWearable

时间选择器组件的参数说明。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| selected | Date | 否 | 是 | 设置选中项的时间。  默认值：当前系统时间  从API version 10开始，该参数支持[$$](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-two-way-sync)双向绑定变量。  **元服务API：** 从API version 11开始，该接口支持在元服务中使用。 |
| format11+ | [TimePickerFormat](/consumer/cn/doc/harmonyos-references/ts-basic-components-timepicker#timepickerformat11枚举说明) | 否 | 是 | 指定需要显示的TimePicker的格式。  默认值：TimePickerFormat.HOUR\_MINUTE  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| start18+ | Date | 否 | 是 | 指定时间选择组件的起始时间。  默认值：Date(0, 0, 0, 0, 0, 0)  **说明：**  1. 仅设置的小时和分钟生效。  2. 设置了start且为非默认值的场景下，loop不生效。  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| end18+ | Date | 否 | 是 | 指定时间选择组件的结束时间。  默认值：Date(0, 0, 0, 23, 59, 59)  **说明：**  1. 仅设置的小时和分钟生效。  2. 设置了end且为非默认值的场景下，loop不生效。  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |

在TimePicker组件滑动过程中修改TimePickerOptions中的属性，会导致这些属性无法生效。

Date对象用于处理日期和时间，使用方式如下。

**方式1：** new Date()

获取系统当前日期和时间。

**方式2：** new Date(value: number | string)

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | number | string | 是 | 设置日期格式。  number：毫秒，自1970年1月1日00:00:00开始的毫秒数。  string：时间格式的字符串，如‘2025-02-20 08:00:00’或‘2025-02-20T08:00:00’。 |

**方式3：** new Date(year: number, monthIndex: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number)

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| year | number | 是 | 设置年份，例如2025。 |
| monthIndex | number | 是 | 设置月份索引，例如2，代表3月份。 |
| date | number | 否 | 设置日期，例如10（如果设置hours，则date不能省略）。 |
| hours | number | 否 | 设置小时，例如15（如果设置minutes，则hours不能省略）。 |
| minutes | number | 否 | 设置分钟，例如20（如果设置seconds，则minutes不能省略）。 |
| seconds | number | 否 | 设置秒，例如20（如果设置ms，则seconds不能省略）。 |
| ms | number | 否 | 设置毫秒，例如10。 |

**起始时间和结束时间的异常情形说明：**

展开

| 异常情形 | 对应结果 |
| --- | --- |
| 起始时间晚于结束时间。 | 起始时间、结束时间都为默认值。 |
| 选中时间早于起始时间。 | 选中时间为起始时间。 |
| 选中时间晚于结束时间。 | 选中时间为结束时间。 |
| 起始时间晚于当前系统时间，选中时间未设置。 | 选中时间为起始时间。 |
| 结束时间早于当前系统时间，选中时间未设置。 | 选中时间为结束时间。 |
| 时间格式不符合规范，如'01:61:61'。 | 取默认值。 |

## TimePickerFormat11+枚举说明

PhonePC/2in1TabletTVWearable

时间选择器的数据格式。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| HOUR\_MINUTE | 0 | 按照小时和分钟进行显示。 |
| HOUR\_MINUTE\_SECOND | 1 | 按照小时、分钟和秒进行显示。 |

## 属性

PhonePC/2in1TabletTVWearable

除支持[通用属性](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-component-general-attributes)外，还支持以下属性：

### useMilitaryTime

PhonePC/2in1TabletTVWearable

useMilitaryTime(value: boolean)

设置时间是否以24小时制展示，未通过该接口设置时，默认跟随系统设置展示。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | boolean | 是 | 时间是否以24小时制展示。  - true：时间以24小时制展示。  - false：时间以12小时制展示。 |

### useMilitaryTime18+

PhonePC/2in1TabletTVWearable

useMilitaryTime(isMilitaryTime: Optional<boolean>)

设置展示时间是否为24小时制，未通过该接口设置时，默认跟随系统设置展示。与[useMilitaryTime](/consumer/cn/doc/harmonyos-references/ts-basic-components-timepicker#usemilitarytime)相比，isMilitaryTime参数新增了对undefined类型的支持。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| isMilitaryTime | [Optional](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-custom-property#optionalt)<boolean> | 是 | 展示时间是否为24小时制。  - true：展示时间为24小时制。  - false：展示时间为12小时制。  当isMilitaryTime的值为undefined时，跟随系统设置。 |

### disappearTextStyle10+

PhonePC/2in1TabletTVWearable

disappearTextStyle(value: PickerTextStyle)

设置边缘项（以选中项为基准向上或向下的第二项）的文本颜色、字号、字体粗细。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [PickerTextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-picker-common#pickertextstyle对象说明) | 是 | 边缘项的文本颜色、字号和字体粗细。  默认值：  {  color: '#ff182431',  font: {  size: '14fp',  weight: FontWeight.Regular  }  } |

说明

若选中项向上或向下的可视项数低于两项则无对应边缘项。

### disappearTextStyle18+

PhonePC/2in1TabletTVWearable

disappearTextStyle(style: Optional<PickerTextStyle>)

设置边缘项（以选中项为基准向上或向下的第二项）的文本颜色、字号、字体粗细。与[disappearTextStyle10+](/consumer/cn/doc/harmonyos-references/ts-basic-components-timepicker#disappeartextstyle10)相比，style参数新增了对undefined类型的支持。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| style | [Optional](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-custom-property#optionalt)<[PickerTextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-picker-common#pickertextstyle对象说明)> | 是 | 边缘项的文本颜色、字号、字体粗细。  默认值：  {  color: '#ff182431',  font: {  size: '14fp',  weight: FontWeight.Regular  }  }  当style的值为undefined时，使用默认值。 |

说明

若选中项向上或向下的可视项数低于两项则无对应边缘项。

### textStyle10+

PhonePC/2in1TabletTVWearable

textStyle(value: PickerTextStyle)

设置待选项（以选中项为基准向上或向下的第一项）的文本颜色、字号、字体粗细。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [PickerTextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-picker-common#pickertextstyle对象说明) | 是 | 待选项的文本颜色、字号、字体粗细。  默认值：  {  color: '#ff182431',  font: {  size: '16fp',  weight: FontWeight.Regular  }  } |

说明

若选中项向上或向下可视项数低于一项则无对应待选项。

### textStyle18+

PhonePC/2in1TabletTVWearable

textStyle(style: Optional<PickerTextStyle>)

设置待选项（以选中项为基准向上或向下的第一项）的文本颜色、字号、字体粗细。与[textStyle10+](/consumer/cn/doc/harmonyos-references/ts-basic-components-timepicker#textstyle10)相比，style参数新增了对undefined类型的支持。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| style | [Optional](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-custom-property#optionalt)<[PickerTextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-picker-common#pickertextstyle对象说明)> | 是 | 待选项的文本颜色、字号、字体粗细。  默认值：  {  color: '#ff182431',  font: {  size: '16fp',  weight: FontWeight.Regular  }  }  当style的值为undefined时，使用默认值。 |

说明

若选中项向上或向下可视项数低于一项则无对应待选项。

### selectedTextStyle10+

PhonePC/2in1TabletTVWearable

selectedTextStyle(value: PickerTextStyle)

设置选中项的文本颜色、字号和字体粗细。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**设备行为差异：** 该属性在Wearable设备上使用无效果，在其他设备中可正常生效。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [PickerTextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-picker-common#pickertextstyle对象说明) | 是 | 选中项的文本颜色、字号、字体粗细。  默认值：  {  color: '#ff007dff',  font: {  size: '20fp',  weight: FontWeight.Medium  }  } |

### selectedTextStyle18+

PhonePC/2in1TabletTVWearable

selectedTextStyle(style: Optional<PickerTextStyle>)

设置选中项的文本颜色、字号及字体粗细。与[selectedTextStyle10+](/consumer/cn/doc/harmonyos-references/ts-basic-components-timepicker#selectedtextstyle10)相比，style参数新增了对undefined类型的支持

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**设备行为差异：** 该属性在Wearable设备上使用无效果，在其他设备中可正常生效。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| style | [Optional](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-custom-property#optionalt)<[PickerTextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-picker-common#pickertextstyle对象说明)> | 是 | 选中项的文本颜色、字号、字体粗细。  默认值：  {  color: '#ff007dff',  font: {  size: '20fp',  weight: FontWeight.Medium  }  }  当style的值为undefined时，使用默认值。 |

### loop11+

PhonePC/2in1TabletTVWearable

loop(value: boolean)

设置是否启用循环模式。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | boolean | 是 | 是否启用循环模式。  - true：启用循环模式。  - false：不启用循环模式。  默认值：true |

### loop18+

PhonePC/2in1TabletTVWearable

loop(isLoop: Optional<boolean>)

设置是否启用循环模式。与[loop11+](/consumer/cn/doc/harmonyos-references/ts-basic-components-timepicker#loop11)相比，isLoop参数新增了对undefined类型的支持。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| isLoop | [Optional](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-custom-property#optionalt)<boolean> | 是 | 是否启用循环模式。  - true：启用循环模式。  - false：不启用循环模式。  默认值：true  当isLoop的值为undefined时，使用默认值。 |

### dateTimeOptions12+

PhonePC/2in1TabletTVWearable

dateTimeOptions(value: DateTimeOptions)

设置时分秒是否显示前导0。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [DateTimeOptions](/consumer/cn/doc/harmonyos-references/ts-basic-components-timepicker#datetimeoptions12类型说明) | 是 | 设置时分秒是否显示前导0。  默认值：  hour: 24小时制默认为"2-digit"，设置hour是否按照2位数字显示，如果实际数值小于10，则会补充前导0并显示，即为"0X"；12小时制默认为"numeric"，即没有前导0。  minute: 默认为"2-digit"，设置minute是否按照2位数字显示，如果实际数值小于10，则会补充前导0并显示，即为"0X"。  second: 默认为"2-digit"，设置second是否按照2位数字显示，如果实际数值小于10，则会补充前导0并显示，即为"0X"。  当hour、minute、second的值设置为undefined时，显示效果与其默认值规则一致。 |

### dateTimeOptions18+

PhonePC/2in1TabletTVWearable

dateTimeOptions(timeFormat: Optional<DateTimeOptions>)

设置时分秒是否显示前导0。与[dateTimeOptions12+](/consumer/cn/doc/harmonyos-references/ts-basic-components-timepicker#datetimeoptions12)相比，timeFormat参数新增了对undefined类型的支持。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| timeFormat | [Optional](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-custom-property#optionalt)<[DateTimeOptions](/consumer/cn/doc/harmonyos-references/ts-basic-components-timepicker#datetimeoptions12类型说明)> | 是 | 设置时分秒是否显示前导0，目前只支持设置hour、minute和second参数。  默认值：  hour: 24小时制默认为"2-digit"，设置hour是否按照2位数字显示，如果实际数值小于10，则会补充前导0并显示，即为"0X"；12小时制默认为"numeric"，即没有前导0。  minute: 默认为"2-digit"，设置minute是否按照2位数字显示，如果实际数值小于10，则会补充前导0并显示，即为"0X"。  second: 默认为"2-digit"，设置second是否按照2位数字显示，如果实际数值小于10，则会补充前导0并显示，即为"0X"。  当hour、minute、second的值设置为undefined时，显示效果与其默认值规则一致。 |

### enableHapticFeedback12+

PhonePC/2in1TabletTVWearable

enableHapticFeedback(enable: boolean)

设置是否支持触控反馈。

开启触控反馈时，需要在工程的src/main/module.json5文件的"module"内配置requestPermissions字段开启振动权限，配置如下：



```
1. "requestPermissions": [
2. {
3. "name": "ohos.permission.VIBRATE",
4. }
5. ]
```

说明

从API version 18开始，该接口支持在[attributeModifier](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-attribute-modifier#attributemodifier)中调用。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| enable | boolean | 是 | 设置是否开启触控反馈。  - true：开启触控反馈。  - false：不开启触控反馈。  默认值：true  设置为true后，其生效情况取决于系统的硬件是否支持。 |

### enableHapticFeedback18+

PhonePC/2in1TabletTVWearable

enableHapticFeedback(enable: Optional<boolean>)

设置是否支持触控反馈。与[enableHapticFeedback12+](/consumer/cn/doc/harmonyos-references/ts-basic-components-timepicker#enablehapticfeedback12)相比，enable参数新增了对undefined类型的支持。

开启触控反馈时，需要在工程的src/main/module.json5文件的"module"内配置requestPermissions字段开启振动权限，配置如下：



```
1. "requestPermissions": [
2. {
3. "name": "ohos.permission.VIBRATE",
4. }
5. ]
```

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| enable | [Optional](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-custom-property#optionalt)<boolean> | 是 | 设置是否开启触控反馈。  - true：开启触控反馈。  - false：不开启触控反馈。  默认值：true  当enable的值为undefined时，使用默认值。  设置为true后，其生效情况取决于系统的硬件是否支持。 |

### enableCascade18+

PhonePC/2in1TabletTVWearable

enableCascade(enabled: boolean)

设置上午和下午的标识是否根据小时数自动切换，仅在[useMilitaryTime](/consumer/cn/doc/harmonyos-references/ts-basic-components-timepicker#usemilitarytime)设置为false时生效。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| enabled | boolean | 是 | 上午和下午的标识是否根据小时数自动切换，仅在useMilitaryTime设置为false时生效。  - true：自动切换。  - false：不自动切换。  默认值：false  当enabled设置为true时，仅在loop参数同时为true时生效。 |

### digitalCrownSensitivity18+

PhonePC/2in1TabletTVWearable

digitalCrownSensitivity(sensitivity: Optional<CrownSensitivity>)

设置表冠灵敏度。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| sensitivity | [Optional](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-custom-property#optionalt)<[CrownSensitivity](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#crownsensitivity18)> | 是 | 表冠响应灵敏度。  默认值：CrownSensitivity.MEDIUM，表示响应速度适中。 |

说明

用于圆形屏幕的穿戴设备。组件响应[表冠事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-crown)，需要先获取焦点。

## 事件

PhonePC/2in1TabletTVWearable

除支持[通用事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-component-general-events)外，还支持以下事件：

### onChange

PhonePC/2in1TabletTVWearable

onChange(callback: (value: TimePickerResult ) => void)

滑动TimePicker后，时间选项归位至选中项位置时，触发该回调。不能通过双向绑定的状态变量触发。

回调会在滑动动画结束后触发，如果需要快速获取索引值变化，建议使用[onEnterSelectedArea](/consumer/cn/doc/harmonyos-references/ts-basic-components-timepicker#onenterselectedarea18)接口。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [TimePickerResult](/consumer/cn/doc/harmonyos-references/ts-basic-components-timepicker#timepickerresult对象说明) | 是 | 24小时制时间。 |

### onChange18+

PhonePC/2in1TabletTVWearable

onChange(callback: Optional<OnTimePickerChangeCallback>)

滑动TimePicker后，时间选项归位至选中项位置时，触发该回调。不能通过双向绑定的状态变量触发。与[onChange](/consumer/cn/doc/harmonyos-references/ts-basic-components-timepicker#onchange)相比，callback参数新增了对undefined类型的支持。

回调会在滑动动画结束后触发，如果需要快速获取索引值变化，建议使用[onEnterSelectedArea](/consumer/cn/doc/harmonyos-references/ts-basic-components-timepicker#onenterselectedarea18)接口。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| callback | [Optional](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-custom-property#optionalt)<[OnTimePickerChangeCallback](/consumer/cn/doc/harmonyos-references/ts-basic-components-timepicker#ontimepickerchangecallback18)> | 是 | 选择时间时触发该回调。  当callback的值为undefined时，不使用回调函数。 |

### onEnterSelectedArea18+

PhonePC/2in1TabletTVWearable

onEnterSelectedArea(callback: Callback<TimePickerResult>)

滑动TimePicker过程中，选项进入分割线区域内，触发该回调。

与[onChange](/consumer/cn/doc/harmonyos-references/ts-basic-components-timepicker#onchange)事件的差别在于，该事件的触发时机早于[onChange](/consumer/cn/doc/harmonyos-references/ts-basic-components-timepicker#onchange)事件，当当前滑动列滑动距离超过选中项高度的一半时，选项此时已经进入分割线区域内，会触发该事件。当[enableCascade](/consumer/cn/doc/harmonyos-references/ts-basic-components-timepicker#enablecascade18)设置为true时，由于上午/下午列与小时列存在联动关系，不建议使用该回调。该回调标识的是滑动过程中选项进入分割线区域内的节点，而联动变化的选项并不涉及滑动，因此，回调的返回值中，仅当前滑动列的值会正常变化，其余未滑动列的值保持不变。

说明

该接口不支持在[attributeModifier](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-attribute-modifier#attributemodifier)中调用。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| callback | Callback<[TimePickerResult](/consumer/cn/doc/harmonyos-references/ts-basic-components-timepicker#timepickerresult对象说明)> | 是 | 滑动TimePicker过程中，选项进入分割线区域时触发的回调。 |

## DateTimeOptions12+类型说明

PhonePC/2in1TabletTVWearable

type DateTimeOptions = DateTimeOptions

时间、日期格式化时可设置的配置项。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 类型 | 说明 |
| --- | --- |
| [DateTimeOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-intl#datetimeoptionsdeprecated) | 创建时间、日期格式化对象时可设置的配置项。 |

## OnTimePickerChangeCallback18+

PhonePC/2in1TabletTVWearable

type OnTimePickerChangeCallback = (result: TimePickerResult) => void

选择时间时触发该事件。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| result | [TimePickerResult](/consumer/cn/doc/harmonyos-references/ts-basic-components-timepicker#timepickerresult对象说明) | 是 | 24小时制时间。 |

## TimePickerResult对象说明

PhonePC/2in1TabletTVWearable

返回24小时制时间。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| hour | number | 否 | 否 | 选中时间的时。  取值范围：[0-23] |
| minute | number | 否 | 否 | 选中时间的分。  取值范围：[0-59] |
| second11+ | number | 否 | 否 | 选中时间的秒。  取值范围：[0-59] |

## 示例

PhonePC/2in1TabletTVWearable

### 示例1（设置文本样式）

该示例通过配置[disappearTextStyle](/consumer/cn/doc/harmonyos-references/ts-basic-components-timepicker#disappeartextstyle10)、[textStyle](/consumer/cn/doc/harmonyos-references/ts-basic-components-timepicker#textstyle10)和[selectedTextStyle](/consumer/cn/doc/harmonyos-references/ts-basic-components-timepicker#selectedtextstyle10)实现文本选择器中的文本样式。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct TimePickerExample {
5. private selectedTime: Date = new Date('2022-07-22T08:00:00');

7. build() {
8. TimePicker({
9. selected: this.selectedTime
10. })
11. .disappearTextStyle({ color: '#004aaf', font: { size: 24, weight: FontWeight.Lighter } })
12. .textStyle({ color: Color.Black, font: { size: 26, weight: FontWeight.Normal } })
13. .selectedTextStyle({ color: Color.Blue, font: { size: 30, weight: FontWeight.Bolder } })
14. .onChange((value: TimePickerResult) => {
15. if (value.hour >= 0) {
16. this.selectedTime.setHours(value.hour, value.minute);
17. console.info('select current date is: ' + JSON.stringify(value));
18. }
19. })
20. }
21. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6b/v3/ord918EzSby9d9Z1UdrkCw/zh-cn_image_0000002568919012.png?HW-CC-KV=V1&HW-CC-Date=20260511T035103Z&HW-CC-Expire=86400&HW-CC-Sign=6C64D88DE93231C195B978B1F49CB9A5A6DE050B2A491ED251FE346A454F12A0)

### 示例2（切换小时制）

该示例通过配置useMilitaryTime实现12小时制、24小时制的切换。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct TimePickerExample {
5. @State isMilitaryTime: boolean = false;
6. private selectedTime: Date = new Date('2022-07-22T08:00:00');

8. build() {
9. Column() {
10. Button('切换12小时制/24小时制')
11. .margin(30)
12. .onClick(() => {
13. this.isMilitaryTime = !this.isMilitaryTime;
14. })

16. TimePicker({
17. selected: this.selectedTime
18. })
19. .useMilitaryTime(this.isMilitaryTime)
20. .onChange((value: TimePickerResult) => {
21. if (value.hour >= 0) {
22. this.selectedTime.setHours(value.hour, value.minute);
23. console.info('select current time is: ' + JSON.stringify(value));
24. }
25. })
26. .onEnterSelectedArea((value: TimePickerResult) => {
27. console.info('item enter selected area, time is: ' + JSON.stringify(value));
28. })
29. }.width('100%')
30. }
31. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/04/v3/NRbETsIFRceIHX1t2BSTyA/zh-cn_image_0000002599478557.gif?HW-CC-KV=V1&HW-CC-Date=20260511T035103Z&HW-CC-Expire=86400&HW-CC-Sign=0BC7CE029F5F89817FDF3152603E793E881DC9DF5836C42F1886B499274D0A24)

### 示例3（设置时间格式）

该示例使用format和dateTimeOptions设置TimePicker时间格式。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct TimePickerExample {
5. private selectedTime: Date = new Date('2022-07-22T08:00:00');

7. build() {
8. Column() {
9. TimePicker({
10. selected: this.selectedTime,
11. format: TimePickerFormat.HOUR_MINUTE_SECOND
12. })
13. .dateTimeOptions({ hour: "numeric", minute: "2-digit", second: "2-digit" })
14. .onChange((value: TimePickerResult) => {
15. if (value.hour >= 0) {
16. this.selectedTime.setHours(value.hour, value.minute);
17. console.info('select current date is: ' + JSON.stringify(value));
18. }
19. })
20. }.width('100%')
21. }
22. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ac/v3/0UEmyTT_RRe4QbvYzZYkMQ/zh-cn_image_0000002568759366.gif?HW-CC-KV=V1&HW-CC-Date=20260511T035103Z&HW-CC-Expire=86400&HW-CC-Sign=5450012F4CAC5F74E854E58ECD16FC6B4D5342402FB280D3C8661BAC979C03F6)

### 示例4（设置循环滚动）

该示例通过配置[loop](/consumer/cn/doc/harmonyos-references/ts-basic-components-timepicker#loop11)设置TimePicker是否循环滚动。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct TimePickerExample {
5. @State isLoop: boolean = true;
6. @State selectedTime: Date = new Date('2022-07-22T12:00:00');

8. build() {
9. Column() {
10. TimePicker({
11. selected: this.selectedTime
12. })
13. .loop(this.isLoop)
14. .onChange((value: TimePickerResult) => {
15. if (value.hour >= 0) {
16. this.selectedTime.setHours(value.hour, value.minute);
17. console.info('select current date is: ' + JSON.stringify(value));
18. }
19. })

21. Row() {
22. Text('循环滚动').fontSize(20)

24. Toggle({ type: ToggleType.Switch, isOn: true })
25. .onChange((isOn: boolean) => {
26. this.isLoop = isOn;
27. })
28. }.position({ x: '60%', y: '40%' })

30. }.width('100%')
31. }
32. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2e/v3/Sv_x-_boRYKBxuDAYJf_PA/zh-cn_image_0000002599358609.gif?HW-CC-KV=V1&HW-CC-Date=20260511T035103Z&HW-CC-Expire=86400&HW-CC-Sign=726DFE7DD6324199E569991223BDB27243E821098E11FBEE2B338B776AD819DC)

### 示例5（设置时间选择组件的起始时间）

该示例设置TimePicker的起始时间。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct TimePickerExample {
5. private selectedTime: Date = new Date('2022-07-22T08:50:00');

7. build() {
8. Column() {
9. TimePicker({
10. selected: this.selectedTime,
11. format: TimePickerFormat.HOUR_MINUTE_SECOND,
12. start: new Date('2022-07-22T08:30:00')
13. })
14. .dateTimeOptions({ hour: "numeric", minute: "2-digit", second: "2-digit" })
15. .onChange((value: TimePickerResult) => {
16. if (value.hour >= 0) {
17. this.selectedTime.setHours(value.hour, value.minute);
18. console.info('select current date is: ' + JSON.stringify(value));
19. }
20. })
21. }.width('100%')
22. }
23. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/fd/v3/v5KPWdBJTyqPoe_SgdZ8fA/zh-cn_image_0000002568919014.png?HW-CC-KV=V1&HW-CC-Date=20260511T035103Z&HW-CC-Expire=86400&HW-CC-Sign=B96BAD47D51D6F239C6CB0B96B67444F801E69866958776D7B761A680B11E5C4)

### 示例6（设置时间选择组件的结束时间）

该示例设置TimePicker的结束时间。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct TimePickerExample {
5. private selectedTime: Date = new Date('2022-07-22T08:50:00');

7. build() {
8. Column() {
9. TimePicker({
10. selected: this.selectedTime,
11. format: TimePickerFormat.HOUR_MINUTE_SECOND,
12. end: new Date('2022-07-22T15:20:00'),
13. })
14. .dateTimeOptions({ hour: "numeric", minute: "2-digit", second: "2-digit" })
15. .onChange((value: TimePickerResult) => {
16. if (value.hour >= 0) {
17. this.selectedTime.setHours(value.hour, value.minute);
18. console.info('select current date is: ' + JSON.stringify(value));
19. }
20. })
21. }.width('100%')
22. }
23. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6a/v3/7ZIjFF2mS5e683BT-u5RkQ/zh-cn_image_0000002599478559.png?HW-CC-KV=V1&HW-CC-Date=20260511T035103Z&HW-CC-Expire=86400&HW-CC-Sign=E54467FA6339AD1DED7988376C8640D88BEE039B9FED23BF01826587C478DDC9)

### 示例7（设置上午下午跟随时间联动）

该示例通过配置[enableCascade](/consumer/cn/doc/harmonyos-references/ts-basic-components-timepicker#enablecascade18)、[loop](/consumer/cn/doc/harmonyos-references/ts-basic-components-timepicker#loop11)实现12小时制时上午下午跟随时间联动。

从API version 18开始，新增enableCascade接口。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct TimePickerExample {
5. private selectedTime: Date = new Date('2022-07-22T08:00:00');

7. build() {
8. Column() {
9. TimePicker({
10. selected: this.selectedTime,
11. })
12. .enableCascade(true)
13. .loop(true)
14. .onChange((value: TimePickerResult) => {
15. if (value.hour >= 0) {
16. this.selectedTime.setHours(value.hour, value.minute);
17. console.info('select current date is: ' + JSON.stringify(value));
18. }
19. })
20. }.width('100%')
21. }
22. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/93/v3/tdQvtiU0R16pX14h9vV0pA/zh-cn_image_0000002568759368.gif?HW-CC-KV=V1&HW-CC-Date=20260511T035103Z&HW-CC-Expire=86400&HW-CC-Sign=B142F8F7AD50C307287A00CBF5C039CBDE41BB0BA47400EA73F2B222BAC40B4F)