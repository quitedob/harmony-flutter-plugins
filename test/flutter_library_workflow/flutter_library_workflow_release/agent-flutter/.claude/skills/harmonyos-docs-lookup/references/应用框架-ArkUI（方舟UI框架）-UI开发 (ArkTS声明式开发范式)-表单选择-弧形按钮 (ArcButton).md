从API version 18开始支持ArcButton。ArcButton是弧形按钮组件，用于圆形屏幕。为手表用户提供强调、普通、警告等样式按钮。具体用法请参考[ArcButton](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-arcbutton)。

## 创建按钮

ArcButton通过调用以下接口来创建。

收起

自动换行

深色代码主题

复制

```
1. ArcButton({
2. options: new ArcButtonOptions({
3. label: 'OK',
4. position: ArcButtonPosition.TOP_EDGE,
5. styleMode: ArcButtonStyleMode.EMPHASIZED_LIGHT,
6. // ···
7. })
8. })
```

[ButtonAlignTop.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ButtonComponent/entry/src/main/ets/pages/ButtonAlignTop.ets#L27-L43)

其中，[label](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-arcbutton#arcbuttonoptions)设置按钮文字，[position](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-arcbutton#arcbuttonoptions)设置按钮类型，[styleMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-arcbutton#arcbuttonoptions)设置按钮样式。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/85/v3/W_z-TFVQRD2tqMQUoI90YQ/zh-cn_image_0000002571171513.png?HW-CC-KV=V1&HW-CC-Date=20260414T035022Z&HW-CC-Expire=86400&HW-CC-Sign=8011C9642AC54CE2227BAC5A7D513EEB747B263CF4D20872AF18D511194FE003)

## 设置按钮类型

ArcButton有上弧形按钮和下弧形按钮两种类型。使用[position](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-arcbutton#arcbuttonoptions)设置按钮类型。

* 下弧形按钮（默认类型）。

  通过将[position](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-arcbutton#arcbuttonoptions)属性设置为ArcButtonPosition.BOTTOM\_EDGE，可以将按钮设置为下弧形按钮。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. ArcButton({
  2. options: new ArcButtonOptions({
  3. label: 'OK',
  4. position: ArcButtonPosition.BOTTOM_EDGE,
  5. styleMode: ArcButtonStyleMode.EMPHASIZED_LIGHT,
  6. // ···
  7. })

  9. })
  ```

  [ButtonAlignBottom.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ButtonComponent/entry/src/main/ets/pages/ButtonAlignBottom.ets#L27-L45)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9a/v3/X0BvVurkSK-GkCStp2Zh6Q/zh-cn_image_0000002540771170.png?HW-CC-KV=V1&HW-CC-Date=20260414T035022Z&HW-CC-Expire=86400&HW-CC-Sign=541BF9ABD095937B5800007F9CECF964B3443B66E011852BFD76A2E630589A2C)
* 上弧形按钮。

  通过将[position](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-arcbutton#arcbuttonoptions)属性设置为ArcButtonPosition.TOP\_EDGE，可以将按钮设置为上弧形按钮。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. ArcButton({
  2. options: new ArcButtonOptions({
  3. label: 'OK',
  4. position: ArcButtonPosition.TOP_EDGE,
  5. styleMode: ArcButtonStyleMode.EMPHASIZED_LIGHT,
  6. // ···
  7. })
  8. })
  ```

  [ButtonAlignTop.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ButtonComponent/entry/src/main/ets/pages/ButtonAlignTop.ets#L27-L43)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d7/v3/BWE676e0Q_We86wUQ1PJbw/zh-cn_image_0000002571291469.png?HW-CC-KV=V1&HW-CC-Date=20260414T035022Z&HW-CC-Expire=86400&HW-CC-Sign=0E06BF3CBDC6D5C76707C4643143C4040E39A62253A35A2767D02DBA5CDB011E)

## 自定义样式

* 设置背景色。

  使用[backgroundColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-arcbutton#arcbuttonoptions)属性设置按钮的背景色。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. ArcButton({
  2. options: new ArcButtonOptions({
  3. label: 'OK',
  4. styleMode: ArcButtonStyleMode.CUSTOM,
  5. backgroundColor: ColorMetrics.resourceColor('#707070')
  6. })
  7. })
  ```

  [ButtonBcgColor.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ButtonComponent/entry/src/main/ets/pages/ButtonBcgColor.ets#L23-L31)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/63/v3/XCEskga5TNSW9l3hp4Hw0Q/zh-cn_image_0000002540611520.png?HW-CC-KV=V1&HW-CC-Date=20260414T035022Z&HW-CC-Expire=86400&HW-CC-Sign=5378E091F0840440153C7D247C14E48EC893D7128A96106E989658C16AADDEE6)
* 设置文本颜色。

  使用[fontColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-arcbutton#arcbuttonoptions)属性设置按钮的文本颜色。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. ArcButton({
  2. options: new ArcButtonOptions({
  3. label: 'OK',
  4. styleMode: ArcButtonStyleMode.CUSTOM,
  5. backgroundColor: ColorMetrics.resourceColor('#E84026'),
  6. fontColor: ColorMetrics.resourceColor('#707070')
  7. })
  8. })
  ```

  [ButtonFontColor.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ButtonComponent/entry/src/main/ets/pages/ButtonFontColor.ets#L23-L32)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d0/v3/U2ALJE34THG7GX_yCUjfRA/zh-cn_image_0000002571171515.png?HW-CC-KV=V1&HW-CC-Date=20260414T035022Z&HW-CC-Expire=86400&HW-CC-Sign=B37008648C1144B071DFFC5BD48EFC66EB71BC6242D10D045459E609A9F8C568)
* 设置阴影颜色。

  使用[shadowEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-arcbutton#arcbuttonoptions)属性启用按钮阴影，并通过[shadowColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-arcbutton#arcbuttonoptions)属性设置按钮的阴影颜色。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. ArcButton({
  2. options: new ArcButtonOptions({
  3. label: 'OK',
  4. shadowEnabled: true,
  5. shadowColor: ColorMetrics.resourceColor('#ffec1022')
  6. })
  7. })
  ```

  [ButtonShadow.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ButtonComponent/entry/src/main/ets/pages/ButtonShadow.ets#L23-L31)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/73/v3/7mjqg_XFRomvoL2tjTojAg/zh-cn_image_0000002540771172.png?HW-CC-KV=V1&HW-CC-Date=20260414T035022Z&HW-CC-Expire=86400&HW-CC-Sign=C472833159CCDE169EC256CC171BE3A7010C9F26E092C990DC9918440D336491)

## 添加事件

* 绑定onClick事件来响应点击操作后的自定义行为。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. ArcButton({
  2. options: new ArcButtonOptions({
  3. label: 'OK',
  4. // ···
  5. onClick: () => {
  6. hilog.info(DOMAIN, TAG, 'ArcButton onClick');
  7. },
  8. })
  9. })
  ```

  [ButtonAlignTop.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ButtonComponent/entry/src/main/ets/pages/ButtonAlignTop.ets#L28-L44)
* 绑定onTouch事件来响应触摸操作后的自定义行为。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. ArcButton({
  2. options: new ArcButtonOptions({
  3. label: 'OK',
  4. // ···
  5. onTouch: (event: TouchEvent) => {
  6. hilog.info(DOMAIN, TAG, 'ArcButton onTouch');
  7. }
  8. })

  10. })
  ```

  [ButtonAlignBottom.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ButtonComponent/entry/src/main/ets/pages/ButtonAlignBottom.ets#L28-L44)

## 场景示例

在亮度设置界面，进度条显示当前亮度为30%。点击重置后，亮度值将被重置为默认的50%。

运行该示例需要Wearable设备的支持。在src/main目录下的工程配置文件[module.json5](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/module-configuration-file)中[deviceTypes标签](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/module-configuration-file#devicetypes标签)内配置wearable。

收起

自动换行

深色代码主题

复制

```
1. "module": {
2. // ···
3. "deviceTypes": [
4. "wearable"
5. ],
6. // ···
7. }
```

[module.json5](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ButtonComponent/entry/src/main/module.json5#L17-L71)

收起

自动换行

深色代码主题

复制

```
1. import { LengthMetrics, LengthUnit, ArcButton, ArcButtonOptions, ArcButtonStyleMode } from '@kit.ArkUI';

3. const BRIGHT_NESS_VALUE = 30;
4. const BRIGHT_NESS_VALUE_DEFAULT = 50;

6. @Entry
7. @ComponentV2
8. struct BrightnessPage {
9. @Local brightnessValue: number = BRIGHT_NESS_VALUE;
10. private defaultBrightnessValue: number = BRIGHT_NESS_VALUE_DEFAULT;

12. build() {
13. RelativeContainer() {
14. // 请将$r('app.string.Brightness')替换为实际资源文件，在本示例中该资源文件的value值为"设置亮度"
15. Text($r('app.string.Brightness'))
16. .fontColor(Color.White)
17. .id('id_brightness_set_text')
18. .fontSize(24)
19. .margin({ top: 16 })
20. .alignRules({
21. middle: { anchor: '__container__', align: HorizontalAlign.Center }
22. })

24. Text(`${this.brightnessValue} %`)
25. .fontColor(Color.White)
26. .id('id_brightness_min_text')
27. .margin({ left: 16 })
28. .alignRules({
29. start: { anchor: '__container__', align: HorizontalAlign.Start },
30. center: { anchor: '__container__', align: VerticalAlign.Center }
31. })

33. Slider({
34. value: this.brightnessValue,
35. min: 0,
36. max: 100,
37. style: SliderStyle.InSet
38. })
39. .blockColor('#191970')
40. .trackColor('#ADD8E6')
41. .selectedColor('#4169E1')
42. .width(150)
43. .id('id_brightness_slider')
44. .margin({ left: 16, right: 16 })
45. .onChange((value: number, mode: SliderChangeMode) => {
46. this.brightnessValue = value;
47. })
48. .alignRules({
49. center: { anchor: 'id_brightness_min_text', align: VerticalAlign.Center },
50. start: { anchor: 'id_brightness_min_text', align: HorizontalAlign.End }
51. })

53. ArcButton({
54. options: new ArcButtonOptions({
55. // 请将$r('app.string.Reset')替换为实际资源文件，在本示例中该资源文件的value值为"重置"
56. label: $r('app.string.Reset'),
57. styleMode: ArcButtonStyleMode.EMPHASIZED_LIGHT,
58. fontSize: new LengthMetrics(19, LengthUnit.FP),
59. onClick: () => {
60. this.brightnessValue = this.defaultBrightnessValue;
61. }
62. })
63. })
64. .alignRules({
65. middle: { anchor: '__container__', align: HorizontalAlign.Center },
66. bottom: { anchor: '__container__', align: VerticalAlign.Bottom }
67. })
68. }
69. .height('100%')
70. .width('100%')
71. .backgroundColor(Color.Black)
72. }
73. }
```

[ButtonBrightness.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ButtonComponent/entry/src/main/ets/pages/ButtonBrightness.ets#L16-L90)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b2/v3/bPa8rN3eTsmYqyCrD66FFA/zh-cn_image_0000002571291471.png?HW-CC-KV=V1&HW-CC-Date=20260414T035022Z&HW-CC-Expire=86400&HW-CC-Sign=FA97870C0D5B8629425BE9C82BD581127C1481EA16A6376E81E6CE0279886BE9)