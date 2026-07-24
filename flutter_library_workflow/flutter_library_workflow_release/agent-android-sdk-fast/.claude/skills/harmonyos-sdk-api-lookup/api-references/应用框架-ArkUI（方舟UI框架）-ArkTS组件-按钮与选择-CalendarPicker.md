日历选择器组件，提供下拉日历弹窗，可以让用户选择日期。

说明

该组件从API version 10开始支持。后续版本如有新增内容，则采用上角标单独标记该内容的起始版本。

## 子组件

PhonePC/2in1TabletTVWearable

无

## 接口

PhonePC/2in1TabletTVWearable

CalendarPicker(options?: CalendarOptions)

日历选择器。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**设备行为差异：** 该接口在Wearable设备上使用时，应用程序运行异常，异常信息中提示接口未定义，在其他设备中可正常调用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| options | [CalendarOptions](/consumer/cn/doc/harmonyos-references/ts-basic-components-calendarpicker#calendaroptions对象说明) | 否 | 配置日历选择器组件的参数。 |

## 属性

PhonePC/2in1TabletTVWearable

除支持[通用属性](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-component-general-attributes)外，还支持以下属性：

### edgeAlign

PhonePC/2in1TabletTVWearable

edgeAlign(alignType: CalendarAlign, offset?: Offset)

设置选择器与入口组件的对齐方式。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**设备行为差异：** 该接口在Wearable设备上使用时，应用程序运行异常，异常信息中提示接口未定义，在其他设备中可正常调用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| alignType | [CalendarAlign](/consumer/cn/doc/harmonyos-references/ts-basic-components-calendarpicker#calendaralign枚举说明) | 是 | 对齐方式的类型。  默认值：CalendarAlign.END |
| offset | [Offset](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#offset) | 否 | 按照对齐方式对齐后，选择器相对入口组件的偏移量。  默认值：{dx: 0, dy: 0} |

### edgeAlign18+

PhonePC/2in1TabletTVWearable

edgeAlign(alignType: Optional<CalendarAlign>, offset?: Offset)

设置选择器与入口组件的对齐方式。与[edgeAlign](/consumer/cn/doc/harmonyos-references/ts-basic-components-calendarpicker#edgealign)相比，alignType参数新增了对undefined类型的支持。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**设备行为差异：** 该接口在Wearable设备上使用时，应用程序运行异常，异常信息中提示接口未定义，在其他设备中可正常调用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| alignType | [Optional](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-custom-property#optionalt)<[CalendarAlign](/consumer/cn/doc/harmonyos-references/ts-basic-components-calendarpicker#calendaralign枚举说明)> | 是 | 对齐方式的类型。  默认值：CalendarAlign.END  当alignType的值为undefined时，使用默认值。 |
| offset | [Offset](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#offset) | 否 | 按照对齐方式对齐后，选择器相对入口组件的偏移量。  默认值：{dx: 0, dy: 0} |

### textStyle

PhonePC/2in1TabletTVWearable

textStyle(value: PickerTextStyle)

入口区的文本颜色、字号、字体粗细。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**设备行为差异：** 该接口在Wearable设备上使用时，应用程序运行异常，异常信息中提示接口未定义，在其他设备中可正常调用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [PickerTextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-picker-common#pickertextstyle对象说明) | 是 | 设置入口区的文本颜色、字号、字体粗细。  默认值：  {  color: '#ff182431',  font: {  size: '16fp',  weight: FontWeight.Regular  }  } |

### textStyle18+

PhonePC/2in1TabletTVWearable

textStyle(style: Optional<PickerTextStyle>)

入口区的文本颜色、字号、字体粗细。与[textStyle](/consumer/cn/doc/harmonyos-references/ts-basic-components-calendarpicker#textstyle)相比，style参数新增了对undefined类型的支持。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**设备行为差异：** 该接口在Wearable设备上使用时，应用程序运行异常，异常信息中提示接口未定义，在其他设备中可正常调用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| style | [Optional](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-custom-property#optionalt)<[PickerTextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-picker-common#pickertextstyle对象说明)> | 是 | 设置入口区的文本颜色、字号、字体粗细。  默认值：  {  color: '#ff182431',  font: {  size: '16fp',  weight: FontWeight.Regular  }  }  当style的值为undefined时，使用默认值。 |

### markToday19+

PhonePC/2in1TabletTVWearable

markToday(enabled: boolean)

设置日历选择器中系统当前日期是否保持高亮显示。

**元服务API：** 从API version 19开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**设备行为差异：** 该接口在Wearable设备上使用时，应用程序运行异常，异常信息中提示接口未定义，在其他设备中可正常调用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| enabled | boolean | 是 | 设置日历选择器中系统当前日期是否保持高亮显示。  - true：系统当前日期在日历选择器内保持高亮显示。  - false：系统当前日期在日历选择器内不保持高亮显示。  默认值：false |

## 事件

PhonePC/2in1TabletTVWearable

除支持[通用事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-component-general-events)，还支持以下事件：

### onChange

PhonePC/2in1TabletTVWearable

onChange(callback: Callback<Date>)

选择日期时触发该事件。不能通过双向绑定的状态变量触发。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**设备行为差异：** 该接口在Wearable设备上使用时，应用程序运行异常，异常信息中提示接口未定义，在其他设备中可正常调用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| callback | [Callback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#callback12)<Date> | 是 | 选中的日期值。 |

### onChange18+

PhonePC/2in1TabletTVWearable

onChange(callback: Optional<Callback<Date>>)

选择日期时触发该事件。不能通过双向绑定的状态变量触发。与[onChange](/consumer/cn/doc/harmonyos-references/ts-basic-components-calendarpicker#onchange)相比，callback参数新增了对undefined类型的支持。

说明

从API version 20开始，该接口支持在[attributeModifier](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-attribute-modifier#attributemodifier)中调用。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**设备行为差异：** 该接口在Wearable设备上使用时，应用程序运行异常，异常信息中提示接口未定义，在其他设备中可正常调用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| callback | [Optional](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-custom-property#optionalt)<[Callback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#callback12)<Date>> | 是 | 选中的日期值。  当callback的值为undefined时，不使用回调函数。 |

## CalendarOptions对象说明

PhonePC/2in1TabletTVWearable

日历选择器组件的参数说明。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**设备行为差异：** 该接口在Wearable设备上使用时，应用程序运行异常，异常信息中提示接口未定义，在其他设备中可正常调用。

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| hintRadius | number | [Resource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resource) | 否 | 是 | 描述日期选中态底板样式。  取值范围：[0.0, 16.0]  单位：vp  默认值：16.0，即底板样式为圆形。  **说明：**  当hintRadius为0.0时表示底板样式为直角矩形；当hintRadius为(0.0, 16.0)时，底板样式为圆角矩形；当hintRadius为负数或大于16.0时，恢复为默认值16.0。  **元服务API：** 从API version 11开始，该接口支持在元服务中使用。 |
| selected | Date | 否 | 是 | 设置选中项的日期。选中的日期未设置或日期格式不符合规范则为默认值。  默认值：当前系统日期。  取值范围：[Date('0001-01-01'), Date('5000-12-31')]  **元服务API：** 从API version 11开始，该接口支持在元服务中使用。 |
| start18+ | Date | 否 | 是 | 设置开始日期。  默认值：Date('0001-01-01')  取值范围：[Date('0001-01-01'), Date('5000-12-31')]  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| end18+ | Date | 否 | 是 | 设置结束日期。  默认值：Date('5000-12-31')  取值范围：[Date('0001-01-01'), Date('5000-12-31')]  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| disabledDateRange19+ | [DateRange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-picker-common#daterange19对象说明)[] | 否 | 是 | 设置禁用日期区间。  **说明：**  1. 若日期区间内的开始日期或结束日期未设置或设置为异常值，则该日期区间无效。  2. 若在日期区间内，结束日期早于开始日期，则该日期区间无效。  3. 当在入口区选定某日期，通过上下箭头调整日期进行增加或减少操作时，若遇到禁用日期，系统将自动跳过整个禁用区间。  **元服务API：** 从API version 19开始，该接口支持在元服务中使用。 |

**start和end设置规则：**

展开

| 场景 | 说明 |
| --- | --- |
| start日期晚于end日期 | start日期、end日期都设置无效，选中日期为默认值 |
| 选中日期早于start日期 | 选中日期为start日期 |
| 选中日期晚于end日期 | 选中日期为end日期 |
| start日期晚于当前系统日期，选中日期未设置 | 选中日期为start日期 |
| end日期早于当前系统日期，选中日期未设置 | 选中日期为end日期 |
| 日期格式不符合规范，如‘1999-13-32’ | start日期或end日期设置无效，选中日期取默认值 |

## CalendarAlign枚举说明

PhonePC/2in1TabletTVWearable

对齐方式类型。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**设备行为差异：** 该接口在Wearable设备上使用时，应用程序运行异常，异常信息中提示接口未定义，在其他设备中可正常调用。

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| START | 0 | 设置选择器与入口组件的对齐方式为左对齐。 |
| CENTER | 1 | 设置选择器与入口组件的对齐方式为居中对齐。 |
| END | 2 | 设置选择器与入口组件的对齐方式为右对齐。 |

## 示例

PhonePC/2in1TabletTVWearable

### 示例1（设置下拉日历弹窗）

该示例通过calendarPicker实现了日历选择器组件，提供下拉日历弹窗。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct CalendarPickerExample {
5. private selectedDate: Date = new Date('2024-03-05');

7. build() {
8. Column() {
9. Column() {
10. CalendarPicker({ hintRadius: 10, selected: this.selectedDate })
11. .edgeAlign(CalendarAlign.END)
12. .textStyle({ color: "#ff182431", font: { size: 20, weight: FontWeight.Normal } })
13. .margin(10)
14. .onChange((value) => {
15. console.info(`CalendarPicker onChange: ${value.toString()}`);
16. })
17. }.alignItems(HorizontalAlign.End).width("100%")

19. Text('日历日期选择器').fontSize(30)
20. }.width('100%').margin({ top: 350 })
21. }
22. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/3c/v3/epHM_oEWQrWqr5hibm5uaA/zh-cn_image_0000002568759356.gif?HW-CC-KV=V1&HW-CC-Date=20260511T035054Z&HW-CC-Expire=86400&HW-CC-Sign=EF58FF6B87679801E4A4F0D91187733616E9EF6EC334CF745B3C582D9AAB283D)

### 示例2（设置开始日期和结束日期）

该示例通过start和end设置日历选择器的开始日期和结束日期。

从API version 18开始，[CalendarOptions](/consumer/cn/doc/harmonyos-references/ts-basic-components-calendarpicker#calendaroptions对象说明)中新增了start、end属性。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct CalendarPickerExample {
5. private selectedDate: Date = new Date('2025-01-15');
6. private startDate: Date = new Date('2025-01-05');
7. private endDate: Date = new Date('2025-01-25');

9. build() {
10. Column() {
11. Column() {
12. CalendarPicker({ hintRadius: 10, selected: this.selectedDate, start: this.startDate, end: this.endDate })
13. .edgeAlign(CalendarAlign.END)
14. .textStyle({ color: "#ff182431", font: { size: 20, weight: FontWeight.Normal } })
15. .margin(10)
16. .onChange((value) => {
17. console.info(`CalendarPicker onChange: ${value.toString()}`);
18. })
19. }.alignItems(HorizontalAlign.End).width("100%")
20. }.width('100%').margin({ top: 350 })
21. }
22. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/57/v3/fUCToNfPRg6FC-obx20R1A/zh-cn_image_0000002599358599.png?HW-CC-KV=V1&HW-CC-Date=20260511T035054Z&HW-CC-Expire=86400&HW-CC-Sign=0301AD40DF48038D111B1E3E61DE4BF11689D69C850827045FC854D46CC405C5)

### 示例3（设置日历选择器在系统当前日期时，保持高亮显示和禁用日期区间）

该示例通过markToday设置日历选择器在系统当前日期时，开启保持高亮显示，同时，通过disabledDateRange设置日历选择器的禁用日期区间。

从API version 19开始，新增了[markToday](/consumer/cn/doc/harmonyos-references/ts-basic-components-calendarpicker#marktoday19)接口，[CalendarOptions](/consumer/cn/doc/harmonyos-references/ts-basic-components-calendarpicker#calendaroptions对象说明)中新增了disabledDateRange属性。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct CalendarPickerExample {
5. private disabledDateRange: DateRange[] = [
6. { start: new Date('2025-01-01'), end: new Date('2025-01-02') },
7. { start: new Date('2025-01-09'), end: new Date('2025-01-10') },
8. { start: new Date('2025-01-15'), end: new Date('2025-01-16') },
9. { start: new Date('2025-01-19'), end: new Date('2025-01-19') },
10. { start: new Date('2025-01-22'), end: new Date('2025-01-25') }
11. ];

13. build() {
14. Column() {
15. CalendarPicker({ disabledDateRange: this.disabledDateRange })
16. .margin(10)
17. .markToday(true)
18. .onChange((value) => {
19. console.info(`CalendarPicker onChange: ${value.toString()}`);
20. })
21. }.alignItems(HorizontalAlign.End).width('100%')
22. }
23. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9/v3/MKHvK0vzSDqWiLS7zQWtoQ/zh-cn_image_0000002568919004.gif?HW-CC-KV=V1&HW-CC-Date=20260511T035054Z&HW-CC-Expire=86400&HW-CC-Sign=E0FE3C9E1DFC25634FE0D917B9E0BBB2CE19044297DAE306974B5B79F818B4AC)