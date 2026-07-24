点击日期弹出日历选择器弹窗，可在弹窗内选择日期。

说明

* 该组件从API version 10开始支持。后续版本如有新增内容，则采用上角标单独标记该内容的起始版本。
* 本模块功能依赖UI的执行上下文，不可在[UI上下文不明确](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-global-interface#ui上下文不明确)的地方使用，参见[UIContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-uicontext)说明。
* 本模块不支持深浅色模式热更新，如果需要进行深浅色模式切换，请重新打开弹窗。

## CalendarPickerDialog

PhonePC/2in1TabletTVWearable

### show

PhonePC/2in1TabletTVWearable

static show(options?: CalendarDialogOptions): void

定义日历选择器弹窗。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**设备行为差异：** 该接口在Wearable设备上使用时，应用程序运行异常，异常信息中提示接口未定义，在其他设备中可正常调用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| options | [CalendarDialogOptions](/consumer/cn/doc/harmonyos-references/ts-methods-calendarpicker-dialog#calendardialogoptions对象说明) | 否 | 配置日历选择器弹窗参数。 |

## CalendarDialogOptions对象说明

PhonePC/2in1TabletTVWearable

日历选择器弹窗选项。

继承自[CalendarOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-calendarpicker#calendaroptions对象说明)。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**设备行为差异：** 该接口在Wearable设备上使用时，应用程序运行异常，异常信息中提示接口未定义，在其他设备中可正常调用。

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| onAccept | [Callback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#callback12)<Date> | 否 | 是 | 点击弹窗中的“确定”按钮时触发该回调。  回调函数的参数表示选中的日期值。  **元服务API：** 从API version 11开始，该接口支持在元服务中使用。 |
| onCancel | [VoidCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#voidcallback12) | 否 | 是 | 点击弹窗中的“取消”按钮时触发该回调。  **元服务API：** 从API version 11开始，该接口支持在元服务中使用。 |
| onChange | [Callback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#callback12)<Date> | 否 | 是 | 选择弹窗中日期使当前选中项改变时触发该回调。  回调函数的参数表示选中的日期值。  **元服务API：** 从API version 11开始，该接口支持在元服务中使用。 |
| backgroundColor11+ | [ResourceColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcecolor) | 否 | 是 | 弹窗背板颜色。  默认值：Color.Transparent  **说明：**  当设置了backgroundColor为非透明色时，backgroundBlurStyle需要设置为BlurStyle.NONE，否则显示的颜色将不符合预期效果。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| backgroundBlurStyle11+ | [BlurStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-background#blurstyle9) | 否 | 是 | 弹窗背板模糊材质。  默认值：BlurStyle.COMPONENT\_ULTRA\_THICK  **说明：**  设置为BlurStyle.NONE即可关闭背景虚化。当设置了backgroundBlurStyle为非NONE值时，则不要设置backgroundColor，否则显示的颜色将不符合预期效果。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| backgroundBlurStyleOptions19+ | [BackgroundBlurStyleOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-background#backgroundblurstyleoptions10对象说明) | 否 | 是 | 背景模糊效果。  **元服务API：** 从API version 19开始，该接口支持在元服务中使用。 |
| backgroundEffect19+ | [BackgroundEffectOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-background#backgroundeffectoptions11) | 否 | 是 | 背景效果参数。  **元服务API：** 从API version 19开始，该接口支持在元服务中使用。 |
| acceptButtonStyle12+ | [PickerDialogButtonStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-picker-common#pickerdialogbuttonstyle12对象说明) | 否 | 是 | 设置确认按钮显示样式、样式和重要程度、角色、背景色、圆角、文本颜色、字号、字体粗细、字体样式、字体列表、按钮是否默认响应Enter键。  **说明：**  acceptButtonStyle与cancelButtonStyle中最多只能有一个primary字段配置为true，二者primary字段均配置为true时均不生效。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| cancelButtonStyle12+ | [PickerDialogButtonStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-picker-common#pickerdialogbuttonstyle12对象说明) | 否 | 是 | 设置取消按钮显示样式、样式和重要程度、角色、背景色、圆角、文本颜色、字号、字体粗细、字体样式、字体列表、按钮是否默认响应Enter键。  **说明：**  acceptButtonStyle与cancelButtonStyle中最多只能有一个primary字段配置为true，二者primary字段均配置为true时均不生效。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| onDidAppear12+ | [VoidCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#voidcallback12) | 否 | 是 | 弹窗弹出后的事件回调。  **说明：**  1.正常时序依次为：onWillAppear>>onDidAppear>>(onAccept/onCancel/onChange)>>onWillDisappear>>onDidDisappear。  2.在onDidAppear内设置改变弹窗显示效果的回调事件，二次弹出生效。  3.快速点击弹出，消失弹窗时，存在onWillDisappear在onDidAppear前生效。  4. 当弹窗入场动效未完成时关闭弹窗，该回调不会触发。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| onDidDisappear12+ | [VoidCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#voidcallback12) | 否 | 是 | 弹窗消失后的事件回调。  **说明：**  1.正常时序依次为：onWillAppear>>onDidAppear>>(onAccept/onCancel/onChange)>>onWillDisappear>>onDidDisappear。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| onWillAppear12+ | [VoidCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#voidcallback12) | 否 | 是 | 弹窗显示动效前的事件回调。  **说明：**  1.正常时序依次为：onWillAppear>>onDidAppear>>(onAccept/onCancel/onChange)>>onWillDisappear>>onDidDisappear。  2.在onWillAppear内设置改变弹窗显示效果的回调事件，二次弹出生效。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| onWillDisappear12+ | [VoidCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#voidcallback12) | 否 | 是 | 弹窗退出动效前的事件回调。  **说明：**  1.正常时序依次为：onWillAppear>>onDidAppear>>(onAccept/onCancel/onChange)>>onWillDisappear>>onDidDisappear。  2.快速点击弹出，消失弹窗时，存在onWillDisappear在onDidAppear前生效。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| shadow12+ | [ShadowOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-image-effect#shadowoptions对象说明) | [ShadowStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-image-effect#shadowstyle10枚举说明) | 否 | 是 | 设置弹窗背板的阴影。  当设备为2in1时，默认场景下，获焦时阴影值为ShadowStyle.OUTER\_FLOATING\_MD，失焦时为ShadowStyle.OUTER\_FLOATING\_SM。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| enableHoverMode14+ | boolean | 否 | 是 | 是否响应悬停态。  - true：响应悬停态。  - false：不响应悬停态。  默认值：false  **元服务API：** 从API version 14开始，该接口支持在元服务中使用。 |
| hoverModeArea14+ | [HoverModeAreaType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-sheet-transition#hovermodeareatype14) | 否 | 是 | 悬停态下弹窗默认展示区域。  默认值：HoverModeAreaType.BOTTOM\_SCREEN  **元服务API：** 从API version 14开始，该接口支持在元服务中使用。 |
| markToday19+ | boolean | 否 | 是 | 设置日历选择器弹窗中系统当前日期是否保持高亮显示。  - true：系统当前日期在日历选择器弹窗内保持高亮显示。  - false：系统当前日期在日历选择器弹窗内不保持高亮显示。  默认值：false  **元服务API：** 从API version 19开始，该接口支持在元服务中使用。 |

说明

在应用窗口缩小过程中，弹窗的宽度会被不断压缩，当缩小到一定程度时会导致其内容无法完整显示，保证CalendarPickerDialog内容能够完整显示的最小窗口宽度为386vp。

## 示例

PhonePC/2in1TabletTVWearable

### 示例1（设置弹窗背板）

该示例通过[CalendarDialogOptions](/consumer/cn/doc/harmonyos-references/ts-methods-calendarpicker-dialog#calendardialogoptions对象说明)的backgroundColor、backgroundBlurStyle、shadow设置日历选择器弹窗背板。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct CalendarPickerDialogExample {
5. private selectedDate: Date = new Date('2024-03-24');

7. build() {
8. Column() {
9. Button('Show CalendarPicker Dialog')
10. .margin(20)
11. .onClick(() => {
12. console.info('CalendarDialog.show');
13. CalendarPickerDialog.show({
14. selected: this.selectedDate,
15. backgroundColor: Color.Gray,
16. backgroundBlurStyle: BlurStyle.NONE,
17. shadow: ShadowStyle.OUTER_FLOATING_SM,
18. onAccept: (value) => {
19. // 点击弹窗中的“确定”按钮时触发该回调，value表示选中的日期值。
20. this.selectedDate = value;
21. console.info('calendar onAccept:' + JSON.stringify(value));
22. },
23. onCancel: () => {
24. // 点击弹窗中的“取消”按钮时触发该回调。
25. console.info('calendar onCancel');
26. },
27. onChange: (value) => {
28. // 选择弹窗中日期使当前选中项改变时触发该回调，value表示选中的日期值。
29. console.info('calendar onChange:' + JSON.stringify(value));
30. },
31. onDidAppear: () => {
32. console.info('calendar onDidAppear');
33. },
34. onDidDisappear: () => {
35. console.info('calendar onDidDisappear');
36. },
37. onWillAppear: () => {
38. console.info('calendar onWillAppear');
39. },
40. onWillDisappear: () => {
41. console.info('calendar onWillDisappear');
42. }
43. });
44. })
45. }.width('100%')
46. }
47. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4c/v3/5EJlVbypQaqrrHWhhB0VBA/zh-cn_image_0000002599358943.gif?HW-CC-KV=V1&HW-CC-Date=20260511T035610Z&HW-CC-Expire=86400&HW-CC-Sign=64D335714553C3DA157E259E28E7122913712CE0B57889BDE14C4F8668A54A9C)

### 示例2（自定义按钮样式）

从API version 12开始，该示例通过配置[CalendarDialogOptions](/consumer/cn/doc/harmonyos-references/ts-methods-calendarpicker-dialog#calendardialogoptions对象说明)的acceptButtonStyle、cancelButtonStyle实现自定义日历选择器弹窗按钮样式。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct CalendarPickerDialogExample {
5. private selectedDate: Date = new Date();

7. build() {
8. Column() {
9. Button('Show CalendarPicker Dialog')
10. .margin(20)
11. .onClick(() => {
12. console.info('CalendarDialog.show');
13. CalendarPickerDialog.show({
14. selected: this.selectedDate,
15. acceptButtonStyle: {
16. type: ButtonType.Normal,
17. style: ButtonStyleMode.NORMAL,
18. role: ButtonRole.NORMAL,
19. fontColor: 'rgb(81, 81, 216)',
20. fontSize: '26fp',
21. fontWeight: FontWeight.Bolder,
22. fontStyle: FontStyle.Normal,
23. fontFamily: 'sans-serif',
24. backgroundColor: '#A6ACAF',
25. borderRadius: 20
26. },
27. cancelButtonStyle: {
28. type: ButtonType.Normal,
29. style: ButtonStyleMode.NORMAL,
30. role: ButtonRole.NORMAL,
31. fontColor: Color.Blue,
32. fontSize: '16fp',
33. fontWeight: FontWeight.Normal,
34. fontStyle: FontStyle.Italic,
35. fontFamily: 'sans-serif',
36. backgroundColor: '#50182431',
37. borderRadius: 10
38. },
39. onAccept: (value) => {
40. this.selectedDate = value;
41. console.info('calendar onAccept:' + JSON.stringify(value));
42. }
43. });
44. })
45. }.width('100%')
46. }
47. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/73/v3/G1DC7gMURvexf3qkxosfmw/zh-cn_image_0000002568919350.png?HW-CC-KV=V1&HW-CC-Date=20260511T035610Z&HW-CC-Expire=86400&HW-CC-Sign=FC854338F5BA95746DD221448308D80D1EF379CDEE030A6F3DDBF73AC919F4AE)

### 示例3（悬停态弹窗）

从API version 14开始，该示例展示了在折叠屏悬停态下设置dialog布局区域的效果。



```
1. @Entry
2. @Component
3. struct CalendarPickerDialogExample {
4. private selectedDate: Date = new Date('2024-04-23');

6. build() {
7. Column() {
8. Button('Show CalendarPicker Dialog')
9. .margin(20)
10. .onClick(() => {
11. console.info('CalendarDialog.show');
12. CalendarPickerDialog.show({
13. selected: this.selectedDate,
14. onAccept: (value) => {
15. console.info('calendar onAccept:' + JSON.stringify(value));
16. },
17. onCancel: () => {
18. console.info('calendar onCancel');
19. },
20. onChange: (value) => {
21. console.info('calendar onChange:' + JSON.stringify(value));
22. },
23. onDidAppear: () => {
24. console.info('calendar onDidAppear');
25. },
26. onDidDisappear: () => {
27. console.info('calendar onDidDisappear');
28. },
29. onWillAppear: () => {
30. console.info('calendar onWillAppear');
31. },
32. onWillDisappear: () => {
33. console.info('calendar onWillDisappear');
34. },
35. enableHoverMode: true,
36. hoverModeArea: HoverModeAreaType.TOP_SCREEN,
37. });
38. })
39. }.width('100%')
40. }
41. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d4/v3/Z-Q9pGxuQECG6F4hGnxiFw/zh-cn_image_0000002599478893.gif?HW-CC-KV=V1&HW-CC-Date=20260511T035610Z&HW-CC-Expire=86400&HW-CC-Sign=562E46E9E6311B071F4DB21B1A96A159763181B48A227B9123126ED618CB4DB9)

### 示例4（设置日期选中态底板样式）

从API version 10开始，该示例通过[CalendarOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-calendarpicker#calendaroptions对象说明)的hintRadius设置日期选中态底板样式。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct CalendarPickerDialogExample {
5. private selectedDate: Date = new Date('2024-04-23');

7. build() {
8. Column() {
9. Button('Show CalendarPicker Dialog')
10. .margin(20)
11. .onClick(() => {
12. console.info('CalendarDialog.show');
13. CalendarPickerDialog.show({
14. selected: this.selectedDate,
15. hintRadius: 1,
16. onAccept: (value) => {
17. this.selectedDate = value;
18. console.info('calendar onAccept:' + JSON.stringify(value));
19. }
20. });
21. })
22. }.width('100%')
23. }
24. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2f/v3/4cSSpji9QfiInaeUR1VSeg/zh-cn_image_0000002568759702.png?HW-CC-KV=V1&HW-CC-Date=20260511T035610Z&HW-CC-Expire=86400&HW-CC-Sign=CB1D8A88024FE12E342D340D01C9B053B5970BAC8AFFF4F1D6CF109E4B0AE8FF)

### 示例5（设置开始日期和结束日期）

从API version 18开始，该示例通过[CalendarOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-calendarpicker#calendaroptions对象说明)的start和end设置日历选择器弹窗的开始日期和结束日期。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct CalendarPickerDialogExample {
5. private selectedDate: Date = new Date('2025-01-01');
6. private startDate: Date = new Date('2024-01-10');
7. private endDate: Date = new Date('2025-01-10');

9. build() {
10. Column() {
11. Text('月历日期选择器').fontSize(30)
12. Button('Show CalendarPicker Dialog')
13. .margin(20)
14. .onClick(() => {
15. console.info('CalendarDialog.show');
16. CalendarPickerDialog.show({
17. start: this.startDate,
18. end: this.endDate,
19. selected: this.selectedDate,
20. });
21. })
22. }.width('100%').margin({ top: 350 })
23. }
24. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/79/v3/YGY3LColTnKalWftu9MV0w/zh-cn_image_0000002599358945.gif?HW-CC-KV=V1&HW-CC-Date=20260511T035610Z&HW-CC-Expire=86400&HW-CC-Sign=8C6D059AC0E741261561DAB29B28A5FF4CE90AB2406A56727670C1E806DF6716)

### 示例6（设置系统当前日期在日历选择器弹窗内保持高亮显示，并设置禁用日期区间）

从API version 19开始，该示例通过配置[CalendarDialogOptions](/consumer/cn/doc/harmonyos-references/ts-methods-calendarpicker-dialog#calendardialogoptions对象说明)的markToday，使系统当前日期在日历选择器弹窗内保持高亮显示，并通过配置[CalendarOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-calendarpicker#calendaroptions对象说明)的disabledDateRange设置禁用的日期区间。



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
15. Button("Show CalendarPicker Dialog")
16. .margin(20)
17. .onClick(() => {
18. console.info('CalendarDialog.show');
19. CalendarPickerDialog.show({ markToday: true, disabledDateRange: this.disabledDateRange });
20. })
21. }.width('100%').margin({ top: 350 })
22. }
23. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2f/v3/eEKto4nuSbqGK1G21_1I3Q/zh-cn_image_0000002568919352.gif?HW-CC-KV=V1&HW-CC-Date=20260511T035610Z&HW-CC-Expire=86400&HW-CC-Sign=B83CBD362737875E5407C77F9B5F85F8534318F6849CA0CE425B9F54914896BA)

### 示例7（自定义背景模糊效果参数）

从API version 19开始，该示例通过配置[backgroundBlurStyleOptions](/consumer/cn/doc/harmonyos-references/ts-methods-calendarpicker-dialog#calendardialogoptions对象说明)，实现自定义背景模糊效果。



```
1. @Entry
2. @Component
3. struct CalendarPickerDialogExample {
4. private selectedDate: Date = new Date('2025-08-05');

6. build() {
7. Stack({ alignContent: Alignment.Top }) {
8. // $r('app.media.bg')需要替换为开发者所需的图像资源文件。
9. Image($r('app.media.bg'))
10. Column() {
11. Button('Show CalendarPicker Dialog')
12. .margin(20)
13. .onClick(() => {
14. CalendarPickerDialog.show({
15. selected: this.selectedDate,
16. hintRadius: 1,
17. backgroundColor: undefined,
18. backgroundBlurStyle: BlurStyle.Thin,
19. backgroundBlurStyleOptions: {
20. colorMode: ThemeColorMode.LIGHT,
21. adaptiveColor: AdaptiveColor.AVERAGE,
22. scale: 1,
23. blurOptions: { grayscale: [20, 20] },
24. },
25. });
26. })
27. }.width('100%')
28. }
29. }
30. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/0f/v3/VxTK7a6ETHGUjRoo2onErQ/zh-cn_image_0000002599478895.png?HW-CC-KV=V1&HW-CC-Date=20260511T035610Z&HW-CC-Expire=86400&HW-CC-Sign=07A6EED3A428317BD5E069DE57C064BF216BA955D61FBC48A28A7FC64C59154B)

### 示例8（自定义背景效果参数）

从API version 19开始，该示例通过配置[backgroundEffect](/consumer/cn/doc/harmonyos-references/ts-methods-calendarpicker-dialog#calendardialogoptions对象说明)，实现自定义背景效果。



```
1. @Entry
2. @Component
3. struct CalendarPickerDialogExample {
4. private selectedDate: Date = new Date('2025-08-05');

6. build() {
7. Stack({ alignContent: Alignment.Top }) {
8. // $r('app.media.bg')需要替换为开发者所需的图像资源文件。
9. Image($r('app.media.bg'))
10. Column() {
11. Button('Show CalendarPicker Dialog')
12. .margin(20)
13. .onClick(() => {
14. CalendarPickerDialog.show({
15. selected: this.selectedDate,
16. hintRadius: 1,
17. backgroundColor: undefined,
18. backgroundBlurStyle: BlurStyle.Thin,
19. backgroundEffect: {
20. radius: 60,
21. saturation: 0,
22. brightness: 1,
23. color: Color.White,
24. blurOptions: { grayscale: [20, 20] }
25. },
26. });
27. })
28. }.width('100%')
29. }
30. }
31. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/23/v3/s7NXJgwoTtGnBPDiqoUr6A/zh-cn_image_0000002568759704.png?HW-CC-KV=V1&HW-CC-Date=20260511T035610Z&HW-CC-Expire=86400&HW-CC-Sign=693DAC73760C8E1F36836F89D9F42663F128D46C5BF25E8F7284E38476EE1171)