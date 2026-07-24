通过文本显示计时信息并控制其计时器状态的组件。

组件不可见（非锁屏状态和应用后台状态）时，UI时间变动将停止（即该组件此时不会绘制），[onTimer](/consumer/cn/doc/harmonyos-references/ts-basic-components-texttimer#ontimer)仍然会正常触发。

说明

该组件从API version 8开始支持。后续版本如有新增内容，则采用上角标单独标记该内容的起始版本。

## 子组件

PhonePC/2in1TabletTVWearable

无

## 接口

PhonePC/2in1TabletTVWearable

TextTimer(options?: TextTimerOptions)

**卡片能力：** 从API version 10开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| options | [TextTimerOptions](/consumer/cn/doc/harmonyos-references/ts-basic-components-texttimer#texttimeroptions对象说明) | 否 | 通过文本显示计时信息并控制其计时器状态的组件参数。默认值继承[TextTimerOptions](/consumer/cn/doc/harmonyos-references/ts-basic-components-texttimer#texttimeroptions对象说明) 。 |

## TextTimerOptions对象说明

PhonePC/2in1TabletTVWearable

用于构建TextTimer组件的选项。

**卡片能力：** 从API version 10开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| isCountDown | boolean | 否 | 是 | 倒计时开关。  true：计时器开启倒计时，例如从30秒~0秒。  false：计时器开始计时，例如从0秒~30秒。  默认值：false |
| count | number | 否 | 是 | 计时器时间（isCountDown为true时生效），单位为毫秒。最长不超过86400000毫秒（24小时）。 0<count<86400000时，count值为计时器初始值。否则，使用默认值为计时器初始值。  默认值：60000 |
| controller | [TextTimerController](/consumer/cn/doc/harmonyos-references/ts-basic-components-texttimer#texttimercontroller) | 否 | 是 | TextTimer控制器。 |

## 属性

PhonePC/2in1TabletTVWearable

除支持[通用属性](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-component-general-attributes)外，还支持以下属性：

### format

PhonePC/2in1TabletTVWearable

format(value: string)

设置自定义格式，需至少包含一个HH、mm、ss、SS中的关键字。使用yy、MM、dd等日期格式时，使用默认值。

计时器更新频率按format最小单位处理，例如：format设置为'HH:mm'时，更新频率为一分钟。

**卡片能力：** 从API version 10开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | string | 是 | 自定义日期显示的格式。  默认值：'HH:mm:ss.SS' |

### fontColor

PhonePC/2in1TabletTVWearable

fontColor(value: ResourceColor)

设置字体颜色。

**卡片能力：** 从API version 10开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [ResourceColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcecolor) | 是 | 字体颜色。  Wearable设备上默认值为：'#c5ffffff'，显示白色。  其他设备上默认值：'#e6182431'，显示黑色。 |

### fontSize

PhonePC/2in1TabletTVWearable

fontSize(value: Length)

设置字体大小。

**卡片能力：** 从API version 10开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [Length](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#length) | 是 | 字体大小。value为Length中的number类型时，单位为fp。字体大小默认为16fp。value为Length中的string类型时，设置值为非数字开头的字符串时，按0fp处理；设置值为数字开头的字符串时，如果数字后内容包含除[像素单位](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-pixel-units)外的字符（如字母、特殊符号等），则取值字符串开头的数字部分，单位为fp。例如设置值为"abc"时取值为0fp，设置值为"10vp"时取值为10vp，设置值为"10vp11abc"时取值为10fp。不支持设置百分比字符串。 |

### fontStyle

PhonePC/2in1TabletTVWearable

fontStyle(value: FontStyle)

设置字体样式。

**卡片能力：** 从API version 10开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [FontStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#fontstyle) | 是 | 字体样式，例如斜体的字体样式。  默认值：FontStyle.Normal |

### fontWeight

PhonePC/2in1TabletTVWearable

fontWeight(value: number | FontWeight | ResourceStr)

设置文本的字体粗细，设置过大可能会导致不同字体下的文字出现截断。

**卡片能力：** 从API version 10开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | number | [FontWeight](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#fontweight) | [ResourceStr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcestr) | 是 | 文本的字体粗细，number类型取值范围为[100, 900]，取值间隔为100，取值越大，字体越粗。number类型取值范围外的默认值为400。[ResourceStr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcestr)类型仅支持number类型取值的字符串形式，例如"400"，以及"bold"、"bolder"、"lighter"、"regular"、"medium"，分别对应FontWeight中相应的枚举值。  默认值：FontWeight.Normal  从API version 20开始，支持Resource类型。 |

### fontFamily

PhonePC/2in1TabletTVWearable

fontFamily(value: ResourceStr)

设置字体列表。

**卡片能力：** 从API version 10开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [ResourceStr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcestr) | 是 | 字体列表。默认字体为'HarmonyOS Sans'。  应用当前支持'HarmonyOS Sans'字体和[注册自定义字体](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-font)。  卡片当前仅支持'HarmonyOS Sans'字体。 |

### textShadow11+

PhonePC/2in1TabletTVWearable

textShadow(value: ShadowOptions | Array<ShadowOptions>)

设置文字阴影效果。该接口支持以数组形式入参，实现多重文字阴影。不支持fill字段, 不支持智能取色模式。

说明

从API version 12开始，该接口支持在[attributeModifier](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-attribute-modifier#attributemodifier)中调用。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [ShadowOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-image-effect#shadowoptions对象说明) | Array<[ShadowOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-image-effect#shadowoptions对象说明)> | 是 | 文字阴影效果的参数，包括颜色、模糊半径、偏移量。 |

### contentModifier12+

PhonePC/2in1TabletTVWearable

contentModifier(modifier: ContentModifier<TextTimerConfiguration>)

定制TextTimer内容区的方法。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| modifier | [ContentModifier](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-content-modifier#contentmodifiert)[<TextTimerConfiguration>](/consumer/cn/doc/harmonyos-references/ts-basic-components-texttimer#texttimerconfiguration12对象说明) | 是 | 在TextTimer组件上，定制内容区的方法。  modifier： 内容修改器，开发者需要自定义class实现ContentModifier接口。 |

## 事件

PhonePC/2in1TabletTVWearable

### onTimer

PhonePC/2in1TabletTVWearable

onTimer(event: (utc: number, elapsedTime: number) => void)

时间文本发生变化时触发该事件。锁屏状态和应用后台状态下不会触发该事件。设置高精度的[format](/consumer/cn/doc/harmonyos-references/ts-basic-components-texttimer#format)（SS）时，回调间隔可能会出现波动。

**卡片能力：** 从API version 10开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| utc | number | 是 | Linux时间戳，即自1970年1月1日起经过的时间，单位为设置格式的最小单位。 |
| elapsedTime | number | 是 | 计时器经过的时间，单位为设置格式的最小单位。 |

## TextTimerController

PhonePC/2in1TabletTVWearable

TextTimer组件的控制器，用于控制文本计时器。一个TextTimer组件仅支持绑定一个控制器，组件创建完成后相关指令才能被调用。一个TextTimerController只能控制最后一个绑定此TextTimerController的TextTimer组件。

**卡片能力：** 从API version 10开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

### 导入对象



```
1. textTimerController: TextTimerController = new TextTimerController();
```

### constructor

PhonePC/2in1TabletTVWearable

constructor()

TextTimerController的构造函数。

**卡片能力：** 从API version 10开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

### start

PhonePC/2in1TabletTVWearable

start()

计时开始。

**卡片能力：** 从API version 10开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

### pause

PhonePC/2in1TabletTVWearable

pause()

计时暂停。

**卡片能力：** 从API version 10开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

### reset

PhonePC/2in1TabletTVWearable

reset()

重置计时器。

**卡片能力：** 从API version 10开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

## TextTimerConfiguration12+对象说明

PhonePC/2in1TabletTVWearable

ContentModifier接口使用的TextTimer配置。

开发者需要自定义class实现ContentModifier接口。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| count | number | 否 | 否 | 计时器时间（isCountDown为true时生效），单位为毫秒。最长不超过86400000毫秒（24小时）。 0<count<86400000时，count值为倒计时初始值。否则，使用默认值为倒计时初始值。  默认值：60000。 |
| isCountDown | boolean | 否 | 否 | 是否倒计时。  true：计时器开启倒计时，例如从30秒 ~ 0秒；false：计时器开始计时，例如从0秒 ~ 30秒。  默认值：false |
| started | boolean | 否 | 否 | 是否已经开始了计时。  true：开始计时；false：未开始计时。  默认值：false |
| elapsedTime | number | 否 | 否 | 计时器经过的时间，单位为设置格式的最小单位。 |

## 示例

PhonePC/2in1TabletTVWearable

### 示例1（支持手动启停的文本计时器）

该示例展示了TextTimer组件的基本使用方法，通过[format](/consumer/cn/doc/harmonyos-references/ts-basic-components-texttimer#format)属性设置计时器的文本显示格式。

用户可以通过点击"start"、"pause"、"reset"按钮，开启、暂停、重置计时器。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct TextTimerExample {
5. textTimerController: TextTimerController = new TextTimerController();
6. @State format: string = 'mm:ss.SS';

8. build() {
9. Column() {
10. TextTimer({ isCountDown: true, count: 30000, controller: this.textTimerController })
11. .format(this.format)
12. .fontColor(Color.Black)
13. .fontSize(50)
14. .onTimer((utc: number, elapsedTime: number) => {
15. console.info('textTimer notCountDown utc is：' + utc + ', elapsedTime: ' + elapsedTime);
16. })
17. Row() {
18. Button('start').onClick(() => {
19. this.textTimerController.start();
20. })
21. Button('pause').onClick(() => {
22. this.textTimerController.pause();
23. })
24. Button('reset').onClick(() => {
25. this.textTimerController.reset();
26. })
27. }
28. }
29. }
30. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/67/v3/rz31ZIMgRpW16INcyY9y_w/zh-cn_image_0000002568759572.gif?HW-CC-KV=V1&HW-CC-Date=20260511T035337Z&HW-CC-Expire=86400&HW-CC-Sign=6223ADF2658E906DD329D1FBBF7C4BA3B92AADA949D2EA39EFF3F0A82BCFBFFA)

### 示例2（设定文本阴影样式）

该示例通过[textShadow](/consumer/cn/doc/harmonyos-references/ts-basic-components-texttimer#textshadow11)属性设置计时器的文本阴影样式。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct TextTimerExample {
5. @State textShadows: ShadowOptions | Array<ShadowOptions> = [{
6. radius: 10,
7. color: Color.Red,
8. offsetX: 10,
9. offsetY: 0
10. }, {
11. radius: 10,
12. color: Color.Black,
13. offsetX: 20,
14. offsetY: 0
15. }, {
16. radius: 10,
17. color: Color.Brown,
18. offsetX: 30,
19. offsetY: 0
20. }, {
21. radius: 10,
22. color: Color.Green,
23. offsetX: 40,
24. offsetY: 0
25. }, {
26. radius: 10,
27. color: Color.Yellow,
28. offsetX: 100,
29. offsetY: 0
30. }];

32. build() {
33. Column({ space: 8 }) {
34. TextTimer().fontSize(50).textShadow(this.textShadows)
35. }
36. }
37. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/fa/v3/zwd5ftDUSY-HM_DIDYfnog/zh-cn_image_0000002599358815.png?HW-CC-KV=V1&HW-CC-Date=20260511T035337Z&HW-CC-Expire=86400&HW-CC-Sign=4722B0558693B15D7B8DC97FC79FCF38C70101FA13FA5C7030E965781ED40DA1)

### 示例3（设定自定义内容区）

该示例实现了两个简易秒表，使用浅灰色背景。计时器开始后，会实时显示时间变化。倒计时器开始后，背景会变成黑色，正计时器开始后，背景会变成灰色。



```
1. // xxx.ets
2. class MyTextTimerModifier implements ContentModifier<TextTimerConfiguration> {
3. constructor() {
4. }

6. applyContent(): WrappedBuilder<[TextTimerConfiguration]> {
7. return wrapBuilder(buildTextTimer);
8. }
9. }

11. @Builder
12. function buildTextTimer(config: TextTimerConfiguration) {
13. Column() {
14. Stack({ alignContent: Alignment.Center }) {
15. Circle({ width: 150, height: 150 })
16. .fill(config.started ? (config.isCountDown ? 0xFF232323 : 0xFF717171) : 0xFF929292)
17. Column() {
18. Text(config.isCountDown ? '倒计时' : '正计时').fontColor(Color.White)
19. Text(
20. (config.isCountDown ? '剩余' : '已经过去了') + (config.isCountDown ?
21. (Math.max(config.count / 1000 - config.elapsedTime / 100, 0)).toFixed(1) + '/' +
22. (config.count / 1000).toFixed(0)
23. : ((config.elapsedTime / 100).toFixed(0))
24. ) + '秒'
25. ).fontColor(Color.White)
26. }
27. }
28. }
29. }

31. @Entry
32. @Component
33. struct Index {
34. @State count: number = 10000;
35. @State myTimerModifier: MyTextTimerModifier = new MyTextTimerModifier();
36. countDownTextTimerController: TextTimerController = new TextTimerController();
37. countUpTextTimerController: TextTimerController = new TextTimerController();

39. build() {
40. Row() {
41. Column() {
42. TextTimer({ isCountDown: true, count: this.count, controller: this.countDownTextTimerController })
43. .contentModifier(this.myTimerModifier)
44. .onTimer((utc: number, elapsedTime: number) => {
45. console.info('textTimer onTimer utc is：' + utc + ', elapsedTime: ' + elapsedTime);
46. })
47. .margin(10)
48. TextTimer({ isCountDown: false, controller: this.countUpTextTimerController })
49. .contentModifier(this.myTimerModifier)
50. .onTimer((utc: number, elapsedTime: number) => {
51. console.info('textTimer onTimer utc is：' + utc + ', elapsedTime: ' + elapsedTime);
52. })
53. Row() {
54. Button('start').onClick(() => {
55. this.countDownTextTimerController.start();
56. this.countUpTextTimerController.start();
57. }).margin(10)
58. Button('pause').onClick(() => {
59. this.countDownTextTimerController.pause();
60. this.countUpTextTimerController.pause();
61. }).margin(10)
62. Button('reset').onClick(() => {
63. this.countDownTextTimerController.reset();
64. this.countUpTextTimerController.reset();
65. }).margin(10)
66. }.margin(20)
67. }.width('100%')
68. }.height('100%')
69. }
70. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f4/v3/oywpzExbRaydJTxIY0DYVQ/zh-cn_image_0000002568919220.gif?HW-CC-KV=V1&HW-CC-Date=20260511T035337Z&HW-CC-Expire=86400&HW-CC-Sign=738955C4B9F4C76F63643457BBBB9CC8E23F251FD990D112C0CA26363F973C64)

### 示例4（创建之后立即执行计时）

该示例展示了TextTimer计时器如何在创建完成之后立即开始计时。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct TextTimerStart {
5. textTimerController: TextTimerController = new TextTimerController();
6. @State format: string = 'mm:ss.SS';

8. build() {
9. Column() {
10. Scroll()
11. .height('20%')
12. TextTimer({ isCountDown: true, count: 30000, controller: this.textTimerController })
13. .format(this.format)
14. .fontColor(Color.Black)
15. .fontSize(50)
16. .onTimer((utc: number, elapsedTime: number) => {
17. console.info('textTimer notCountDown utc is：' + utc + ', elapsedTime: ' + elapsedTime);
18. })
19. .onAppear(() => {
20. this.textTimerController.start();
21. })
22. }
23. .height('100%')
24. .width('100%')
25. .justifyContent(FlexAlign.Center)
26. }
27. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/58/v3/ukvS0RtYRiqyfHQa08h2lg/zh-cn_image_0000002599478765.gif?HW-CC-KV=V1&HW-CC-Date=20260511T035337Z&HW-CC-Expire=86400&HW-CC-Sign=B375DB9E198DEE86C921603DF5FE925C67BEC12B4B9383F1B5EE5EAE349AFDB2)

### 示例5（设置文本样式）

该示例通过[fontColor](/consumer/cn/doc/harmonyos-references/ts-basic-components-texttimer#fontcolor)、[fontSize](/consumer/cn/doc/harmonyos-references/ts-basic-components-texttimer#fontsize)、[fontStyle](/consumer/cn/doc/harmonyos-references/ts-basic-components-texttimer#fontstyle)、[fontWeight](/consumer/cn/doc/harmonyos-references/ts-basic-components-texttimer#fontweight)、[fontFamily](/consumer/cn/doc/harmonyos-references/ts-basic-components-texttimer#fontfamily)属性展示了不同样式的文本效果。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct demo {
5. textTimerController: TextTimerController = new TextTimerController();
6. @State format: string = 'HH:mm:ss.SS';
7. @State countValue: number = 5025678;

9. build() {
10. Column({ space: 10 }) {
11. Text('设置字体颜色').fontColor(0xCCCCCC)
12. TextTimer({ isCountDown: true, count: this.countValue, controller: this.textTimerController })
13. .fontColor(Color.Blue)
14. TextTimer({ isCountDown: true, count: this.countValue, controller: this.textTimerController })
15. .fontColor(Color.Gray)

17. Text('设置字体大小').fontColor(0xCCCCCC)
18. TextTimer({ isCountDown: true, count: this.countValue, controller: this.textTimerController })
19. .fontSize(10)
20. TextTimer({ isCountDown: true, count: this.countValue, controller: this.textTimerController })
21. .fontSize(30)

23. Text('设置字体样式').fontColor(0xCCCCCC)
24. TextTimer({ isCountDown: true, count: this.countValue, controller: this.textTimerController })
25. .fontStyle(FontStyle.Normal)
26. TextTimer({ isCountDown: true, count: this.countValue, controller: this.textTimerController })
27. .fontStyle(FontStyle.Italic)

29. Text('设置字重').fontColor(0xCCCCCC)
30. TextTimer({ isCountDown: true, count: this.countValue, controller: this.textTimerController })
31. .fontWeight(FontWeight.Lighter)
32. TextTimer({ isCountDown: true, count: this.countValue, controller: this.textTimerController })
33. .fontWeight(FontWeight.Bolder)

35. Text('设置字体族').fontColor(0xCCCCCC)
36. TextTimer({ isCountDown: true, count: this.countValue, controller: this.textTimerController })
37. .fontFamily('HMOS Color Emoji')
38. TextTimer({ isCountDown: true, count: this.countValue, controller: this.textTimerController })
39. .fontFamily('HarmonyOS Sans')
40. }
41. .width('100%')
42. .height('100%')
43. .justifyContent(FlexAlign.Center)
44. }
45. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f2/v3/WO-5l-CcTAGCXnRBr1dv0A/zh-cn_image_0000002568759574.png?HW-CC-KV=V1&HW-CC-Date=20260511T035337Z&HW-CC-Expire=86400&HW-CC-Sign=133714DBAB52D0E19B46FFFE81D41D0AF150411C8EE1933F9BA01F6B17754801)