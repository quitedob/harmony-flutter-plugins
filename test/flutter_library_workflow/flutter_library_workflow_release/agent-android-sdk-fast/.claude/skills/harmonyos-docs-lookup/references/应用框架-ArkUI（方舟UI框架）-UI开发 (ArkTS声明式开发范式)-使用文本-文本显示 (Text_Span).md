Text是文本组件，用于展示用户视图，如显示文章的文字内容。该组件支持绑定自定义文本选择菜单，用户可根据需要选择不同功能。此外，还可以扩展自定义菜单，丰富可用选项，进一步提升用户体验。Span则用于展示行内文本。

具体用法请参考[Text](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text)和[Span](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-span)组件的API文档。

常见问题请参考[文本显示（Text/Span）常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-text-faq#文本显示textspan常见问题)。

## 创建文本

Text可通过以下两种方式来创建：

* string字符串。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Text('我是一段文本')
  ```

  [CreateText.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/text/CreateText.ets#L25-L28)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e3/v3/QuDOIGLJT4iYk_dJ46l81Q/zh-cn_image_0000002540771078.png?HW-CC-KV=V1&HW-CC-Date=20260414T034925Z&HW-CC-Expire=86400&HW-CC-Sign=2A0F53401FA977CEC58AC0A458618AD0BE5E41ED925EE0D45869D83451B4804C)

* 引用Resource资源。

  资源引用类型可以通过$r创建Resource类型对象，文件位置为/resources/base/element/string.json，具体内容如下：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. {
  2. "string": [
  3. {
  4. "name": "module_desc",
  5. "value": "模块描述"
  6. }
  7. ]
  8. }
  ```

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // 请将$r('app.string.module_desc')替换为实际资源文件，在本示例中该资源文件的value值为"模块描述"
  2. Text($r('app.string.module_desc'))
  3. .baselineOffset(0)
  4. .fontSize(30)
  5. .border({ width: 1 })
  6. .padding(10)
  7. .width(300)
  ```

  [CreateText.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/text/CreateText.ets#L35-L43)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/76/v3/sAlroCZtRU6Jaz5GRCtNPw/zh-cn_image_0000002571291375.png?HW-CC-KV=V1&HW-CC-Date=20260414T034925Z&HW-CC-Expire=86400&HW-CC-Sign=1CC834EB7877C7EE1098BB182B034A47A551A32BE9285DD72591FEECF6C16670)

## 添加子组件

[Span](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-span)只能作为[Text](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text)和[RichEditor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor)组件的子组件显示文本内容。可以在一个Text内添加多个Span来显示一段信息，例如产品说明书、承诺书等。

* 创建Span。

  Span组件需嵌入在Text组件中才能显示，单独使用时不会显示任何内容。Text与Span同时配置文本内容时，Span内容将覆盖Text内容。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // 请将$r('app.string.TextSpan_textContent_text')替换为实际资源文件，在本示例中该资源文件的value值为"我是Text"
  2. Text($r('app.string.TextSpan_textContent_text')) {
  3. // 请将$r('app.string.TextSpan_textContent_span')替换为实际资源文件，在本示例中该资源文件的value值为"我是Span"
  4. Span($r('app.string.TextSpan_textContent_span'))
  5. }
  6. .padding(10)
  7. .borderWidth(1)
  ```

  [TextSpan.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/text/TextSpan.ets#L27-L35)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ca/v3/2-dB-f5BToWG8-QA-jq1sQ/zh-cn_image_0000002540611428.png?HW-CC-KV=V1&HW-CC-Date=20260414T034925Z&HW-CC-Expire=86400&HW-CC-Sign=054D578BD4794582770F503A73993F7E36592404487D9327F093B8CA59B1671A)
* 设置文本装饰线及颜色。

  通过[decoration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-span#decoration)设置文本装饰线及颜色。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Text() {
  2. // 请将$r('app.string.TextSpan_textContent_span_one')替换为实际资源文件，在本示例中该资源文件的value值为"我是Span1，"
  3. Span($r('app.string.TextSpan_textContent_span_one'))
  4. .fontSize(16)
  5. .fontColor(Color.Grey)
  6. .decoration({ type: TextDecorationType.LineThrough, color: Color.Red })
  7. // 请将$r('app.string.TextSpan_textContent_span_two')替换为实际资源文件，在本示例中该资源文件的value值为"我是Span2"
  8. Span($r('app.string.TextSpan_textContent_span_two'))
  9. .fontColor(Color.Blue)
  10. .fontSize(16)
  11. .fontStyle(FontStyle.Italic)
  12. .decoration({ type: TextDecorationType.Underline, color: Color.Black })
  13. // 请将$r('app.string.TextSpan_textContent_span_three')替换为实际资源文件，在本示例中该资源文件的value值为"我是Span3"
  14. Span($r('app.string.TextSpan_textContent_span_three'))
  15. .fontSize(16)
  16. .fontColor(Color.Grey)
  17. .decoration({ type: TextDecorationType.Overline, color: Color.Green })
  18. }
  19. .borderWidth(1)
  20. .padding(10)
  ```

  [TextSpan.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/text/TextSpan.ets#L39-L60)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f2/v3/zv9xlPUOQ-y3WNsmeZPOIg/zh-cn_image_0000002571171423.png?HW-CC-KV=V1&HW-CC-Date=20260414T034925Z&HW-CC-Expire=86400&HW-CC-Sign=85031926E5494879CA952595DCE60D9D10B6C19FB6DF966ED4B47211CA5E29F1)
* 通过[textCase](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-span#textcase)设置文字一直保持大写或者小写状态。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Text() {
  2. Span('I am Upper-span').fontSize(12)
  3. .textCase(TextCase.UpperCase)
  4. }
  5. .borderWidth(1)
  6. .padding(10)
  ```

  [TextSpan.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/text/TextSpan.ets#L64-L71)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5e/v3/eCn1tmP-SriB3AYrRFWdpw/zh-cn_image_0000002540771080.png?HW-CC-KV=V1&HW-CC-Date=20260414T034925Z&HW-CC-Expire=86400&HW-CC-Sign=7E2751ADB646DB3393AA75387458033A7DB0C4BAE6501B6CA4BDFC241B63B5D5)
* 添加事件。

  由于Span组件无尺寸信息，仅支持添加点击事件[onClick](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-click#onclick)、悬浮事件[onHover](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-hover#onhover)。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // xxx.ets
  2. import { hilog } from '@kit.PerformanceAnalysisKit';

  4. @Entry
  5. @Component
  6. export struct TextSpanOnHover {
  7. @State textStr1: string = '';
  8. @State textStr2: string = '';

  10. build() {
  11. NavDestination() {
  12. Row() {
  13. Column() {
  14. Text() {
  15. Span('I am Upper-span')
  16. .textCase(TextCase.UpperCase)
  17. .fontSize(30)
  18. .onClick(() => {
  19. hilog.info(0x0000, 'Sample_TextComponent', 'Span onClick is triggering');
  20. this.textStr1 = 'Span onClick is triggering';
  21. })
  22. .onHover(() => {
  23. hilog.info(0x0000, 'Sample_TextComponent', 'Span onHover is triggering');
  24. this.textStr2 = 'Span onHover is triggering';
  25. })
  26. }

  28. Text('onClick：' + this.textStr1)
  29. .fontSize(20)
  30. Text('onHover：' + this.textStr2)
  31. .fontSize(20)
  32. }.width('100%')
  33. }
  34. .height('100%')
  35. }
  36. // ···
  37. }
  38. }
  ```

  [TextSpanOnHover.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/text/TextSpanOnHover.ets#L15-L58)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/28/v3/AyzNxdBZStmpCEL1TiW0xw/zh-cn_image_0000002571291377.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034925Z&HW-CC-Expire=86400&HW-CC-Sign=5AF8319D50A850D412850CC9F91CEA47177A81F58F581B085E0E5CF01F86599E)

## 创建自定义文本样式

Text组件支持创建自定义文本样式，以下为修改文本样式的主要属性。

展开

| 属性名称 | 功能描述 |
| --- | --- |
| baselineOffset | 设置文本基线的偏移量。 |
| contentTransition | 设置数字翻牌效果。 |
| copyOption | 设置文本是否可复制粘贴。 |
| decoration | 设置文本装饰线样式，如类型、颜色及其粗细。 |
| enableAutoSpacing | 设置是否开启中文与西文的自动间距。 |
| enableDataDetector | 设置是否进行文本特殊实体识别。 |
| font | 设置文本字体相关属性。 |
| fontColor | 设置文本字体颜色。 |
| fontFamily | 设置文本字体族。 |
| fontFeature | 设置文字特性效果，比如数字等宽的特性。 |
| fontSize | 设置文本字体大小。 |
| fontStyle | 设置文本字体风格。 |
| fontWeight | 设置文本字体粗细。 |
| halfLeading | 设置文本是否将行间距平分至行的顶部与底部。 |
| heightAdaptivePolicy | 设置文本自适应布局调整字号的方式。 |
| letterSpacing | 设置文本字符间距。 |
| lineHeight | 设置文本行高。 |
| lineSpacing | 设置文本的行间距。 |
| marqueeOptions | 设置跑马灯配置项，如开关、步长、循环次数、方向等。 |
| maxFontSize | 设置自适应字体最大尺寸。 |
| maxLines | 设置文本最大显示行数。 |
| minFontSize | 设置自适应字体最小尺寸。 |
| optimizeTrailingSpace | 控制每行末尾空格的优化。 |
| privacySensitive | 设置是否支持卡片敏感隐私信息。 |
| shaderStyle | 设置文本渐变色样式。 |
| textCase | 设置文本大小写转换。 |
| textAlign | 设置文本段落在水平方向的对齐方式。 |
| textIndent | 设置首行文本缩进。 |
| textOverflow | 控制文本超长处理方式。 |
| textSelectable | 设置文本是否可选择。 |
| textVerticalAlign | 设置文本段落在垂直方向的对齐方式。 |
| wordBreak | 设置断行规则。 |

下面对常用的接口进行举例说明。

* 通过[textAlign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textalign)属性设置文本对齐样式。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // 请将$r('app.string.TextAlign_Start')替换为实际资源文件，在本示例中该资源文件的value值为"左对齐"
  2. Text($r('app.string.TextAlign_Start'))
  3. .width(300)
  4. .textAlign(TextAlign.Start)
  5. .border({ width: 1 })
  6. .padding(10)
  7. // 请将$r('app.string.TextAlign_Center')替换为实际资源文件，在本示例中该资源文件的value值为"中间对齐"
  8. Text($r('app.string.TextAlign_Center'))
  9. .width(300)
  10. .textAlign(TextAlign.Center)
  11. .border({ width: 1 })
  12. .padding(10)
  13. // 请将$r('app.string.TextAlign_End')替换为实际资源文件，在本示例中该资源文件的value值为"右对齐"
  14. Text($r('app.string.TextAlign_End'))
  15. .width(300)
  16. .textAlign(TextAlign.End)
  17. .border({ width: 1 })
  18. .padding(10)
  ```

  [CustomTextStyle.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/text/CustomTextStyle.ets#L29-L48)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1a/v3/EZHRAfYFQrGdWtk0oTw3YA/zh-cn_image_0000002540611430.png?HW-CC-KV=V1&HW-CC-Date=20260414T034925Z&HW-CC-Expire=86400&HW-CC-Sign=1B78D3BEE9871EBA063EE63E8B527066D4243BB67BDE9F117C9777FD5DC873E8)
* 通过[textOverflow](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textoverflow)属性控制文本超长处理，textOverflow需配合[maxLines](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#maxlines)一起使用（默认情况下文本自动折行）。从API version 18开始，文本超长时设置跑马灯的方式展示时，支持设置跑马灯的配置项，比如开关、步长、循环次数、方向等。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Text('This is the setting of textOverflow to Clip text content This is the setting of textOverflow ' +
  2. 'to None text content. This is the setting of textOverflow to Clip text content This is the setting ' +
  3. 'of textOverflow to None text content.')
  4. .width(250)
  5. .textOverflow({ overflow: TextOverflow.None })
  6. .maxLines(1)
  7. .fontSize(12)
  8. .border({ width: 1 })
  9. .padding(10)
  10. // 'app.string.CustomTextStyle_textContent_epsis'资源文件中的value值为
  11. // '我是超长文本，超出的部分显示省略号 I am an extra long text, with ellipses displayed for any excess。'
  12. Text($r('app.string.CustomTextStyle_textContent_epsis'))
  13. .width(250)
  14. .textOverflow({ overflow: TextOverflow.Ellipsis })
  15. .maxLines(1)
  16. .fontSize(12)
  17. .border({ width: 1 })
  18. .padding(10)
  19. // 'app.string.CustomTextStyle_textContent_marq'资源文件中的value值为
  20. // '当文本溢出其尺寸时，文本将滚动显示
  21. // When the text overflows its dimensions,the text will scroll for displaying.'
  22. Text($r('app.string.CustomTextStyle_textContent_marq'))
  23. .width(250)
  24. .textOverflow({ overflow: TextOverflow.MARQUEE })
  25. .maxLines(1)
  26. .fontSize(12)
  27. .border({ width: 1 })
  28. .padding(10)
  29. // 'app.string.CustomTextStyle_textContent_marq_def'资源文件中的value值为
  30. // '当文本溢出其尺寸时，文本将滚动显示，支持设置跑马灯配置项
  31. // When the text overflows its dimensions, the text will scroll for displaying.'
  32. Text($r('app.string.CustomTextStyle_textContent_marq_def'))
  33. .width(250)
  34. .textOverflow({ overflow: TextOverflow.MARQUEE })
  35. .maxLines(1)
  36. .fontSize(12)
  37. .border({ width: 1 })
  38. .padding(10)
  39. .marqueeOptions({
  40. start: true,
  41. fromStart: true,
  42. step: 6,
  43. loop: -1,
  44. delay: 0,
  45. fadeout: false,
  46. marqueeStartPolicy: MarqueeStartPolicy.DEFAULT
  47. })
  ```

  [CustomTextStyle.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/text/CustomTextStyle.ets#L57-L105)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ba/v3/Cbt6Zy-8R56sk76iQNghUg/zh-cn_image_0000002571171425.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034925Z&HW-CC-Expire=86400&HW-CC-Sign=2A5A6C0837D23BF1F71C15B04DC985BC46AC5C3346BFBE82420EE149CF28845B)
* 通过[lineHeight](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#lineheight)属性设置文本行高。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Text('This is the text with the line height set. This is the text with the line height set.')
  2. .width(300).fontSize(12).border({ width: 1 }).padding(10)
  3. Text('This is the text with the line height set. This is the text with the line height set.')
  4. .width(300)
  5. .fontSize(12)
  6. .border({ width: 1 })
  7. .padding(10)
  8. .lineHeight(20)
  ```

  [CustomTextStyle.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/text/CustomTextStyle.ets#L111-L120)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ac/v3/uh54xs3tS8an8O3im9hhTg/zh-cn_image_0000002540771082.png?HW-CC-KV=V1&HW-CC-Date=20260414T034925Z&HW-CC-Expire=86400&HW-CC-Sign=F337409F1B25F28CFC518E4FE41EA8B6D47D5AF679017D8921674567A3BD0976)
* 通过[decoration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#decoration)属性设置文本装饰线样式、颜色及其粗细。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Text('This is the text')
  2. .decoration({
  3. type: TextDecorationType.LineThrough,
  4. color: Color.Red
  5. })
  6. .borderWidth(1).padding(15).margin(5)
  7. Text('This is the text')
  8. .decoration({
  9. type: TextDecorationType.Overline,
  10. color: Color.Red
  11. })
  12. .borderWidth(1).padding(15).margin(5)
  13. Text('This is the text')
  14. .decoration({
  15. type: TextDecorationType.Underline,
  16. color: Color.Red
  17. })
  18. .borderWidth(1).padding(15).margin(5)
  19. Text('This is the text')
  20. .decoration({
  21. type: TextDecorationType.Underline,
  22. color: Color.Blue,
  23. style: TextDecorationStyle.DASHED
  24. })
  25. .borderWidth(1).padding(15).margin(5)
  26. Text('This is the text')
  27. .decoration({
  28. type: TextDecorationType.Underline,
  29. color: Color.Blue,
  30. style: TextDecorationStyle.DOTTED
  31. })
  32. .borderWidth(1).padding(15).margin(5)
  33. Text('This is the text')
  34. .decoration({
  35. type: TextDecorationType.Underline,
  36. color: Color.Blue,
  37. style: TextDecorationStyle.DOUBLE
  38. })
  39. .borderWidth(1).padding(15).margin(5)
  40. Text('This is the text')
  41. .decoration({
  42. type: TextDecorationType.Underline,
  43. color: Color.Blue,
  44. style: TextDecorationStyle.WAVY,
  45. thicknessScale: 4
  46. })
  47. .borderWidth(1).padding(15).margin(5)
  ```

  [CustomTextStyle.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/text/CustomTextStyle.ets#L126-L174)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/83/v3/Stt-RxEwQaG8I_pGtiE31Q/zh-cn_image_0000002571291379.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T034925Z&HW-CC-Expire=86400&HW-CC-Sign=68B296EA35263EDD4DC866B72EDD60A35BA9C636AD988CC106447DD919045154)
* 通过[baselineOffset](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#baselineoffset)属性设置文本基线的偏移量。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Text('This is the text content with baselineOffset 0.')
  2. .baselineOffset(0)
  3. .fontSize(12)
  4. .border({ width: 1 })
  5. .padding(10)
  6. .width('100%')
  7. .margin(5)
  8. Text('This is the text content with baselineOffset 30.')
  9. .baselineOffset(30)
  10. .fontSize(12)
  11. .border({ width: 1 })
  12. .padding(10)
  13. .width('100%')
  14. .margin(5)
  15. Text('This is the text content with baselineOffset -20.')
  16. .baselineOffset(-20)
  17. .fontSize(12)
  18. .border({ width: 1 })
  19. .padding(10)
  20. .width('100%')
  21. .margin(5)
  ```

  [CustomTextStyle.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/text/CustomTextStyle.ets#L180-L202)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7f/v3/tGhqEM7FTJaRZ-R1RXRFxQ/zh-cn_image_0000002540611432.png?HW-CC-KV=V1&HW-CC-Date=20260414T034925Z&HW-CC-Expire=86400&HW-CC-Sign=A172193F255DA76C790917FAD6565CFA4818B948A23618237B1C7ECA06A60EC5)
* 通过[letterSpacing](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#letterspacing)属性设置文本字符间距。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Text('This is the text content with letterSpacing 0.')
  2. .letterSpacing(0)
  3. .fontSize(12)
  4. .border({ width: 1 })
  5. .padding(10)
  6. .width('100%')
  7. .margin(5)
  8. Text('This is the text content with letterSpacing 3.')
  9. .letterSpacing(3)
  10. .fontSize(12)
  11. .border({ width: 1 })
  12. .padding(10)
  13. .width('100%')
  14. .margin(5)
  15. Text('This is the text content with letterSpacing -1.')
  16. .letterSpacing(-1)
  17. .fontSize(12)
  18. .border({ width: 1 })
  19. .padding(10)
  20. .width('100%')
  21. .margin(5)
  ```

  [CustomTextStyle.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/text/CustomTextStyle.ets#L208-L230)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/11/v3/sgOXedxdSKGaEZ6QCRtD9A/zh-cn_image_0000002571171427.png?HW-CC-KV=V1&HW-CC-Date=20260414T034925Z&HW-CC-Expire=86400&HW-CC-Sign=6C8C8B6E21CA460C43D95A86F05AF364F828FE8078064132CBB78E26DC6D479A)
* 通过[minFontSize](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#minfontsize)与[maxFontSize](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#maxfontsize)自适应字体大小。

  minFontSize用于设置文本的最小显示字号，maxFontSize用于设置文本的最大显示字号。这两个属性必须同时设置才能生效，并且需要与[maxLines](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#maxlines)属性或布局大小限制配合使用，单独设置任一属性将不会产生效果。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. /* 请将$r('app.string.CustomTextStyle_textContent_one_style')替换为实际资源文件，
  2. * 在本示例中该资源文件的value值为"我的最大字号为30，最小字号为5，宽度为250，maxLines为1"
  3. */
  4. Text($r('app.string.CustomTextStyle_textContent_one_style'))
  5. .width(250)
  6. .maxLines(1)
  7. .maxFontSize(30)
  8. .minFontSize(5)
  9. .border({ width: 1 })
  10. .padding(10)
  11. .margin(5)
  12. /* 请将$r('app.string.CustomTextStyle_textContent_two_style')替换为实际资源文件，
  13. * 在本示例中该资源文件的value值为"我的最大字号为30，最小字号为5，宽度为250，maxLines为2"
  14. */
  15. Text($r('app.string.CustomTextStyle_textContent_two_style'))
  16. .width(250)
  17. .maxLines(2)
  18. .maxFontSize(30)
  19. .minFontSize(5)
  20. .border({ width: 1 })
  21. .padding(10)
  22. .margin(5)
  23. /* 请将$r('app.string.CustomTextStyle_textContent_no_max')替换为实际资源文件，
  24. * 在本示例中该资源文件的value值为"我的最大字号为30，最小字号为15，宽度为250,高度为50"
  25. */
  26. Text($r('app.string.CustomTextStyle_textContent_no_max'))
  27. .width(250)
  28. .height(50)
  29. .maxFontSize(30)
  30. .minFontSize(15)
  31. .border({ width: 1 })
  32. .padding(10)
  33. .margin(5)
  34. /* 请将$r('app.string.CustomTextStyle_textContent_high')替换为实际资源文件，
  35. * 在本示例中该资源文件的value值为"我的最大字号为30，最小字号为15，宽度为250,高度为100"
  36. */
  37. Text($r('app.string.CustomTextStyle_textContent_high'))
  38. .width(250)
  39. .height(100)
  40. .maxFontSize(30)
  41. .minFontSize(15)
  42. .border({ width: 1 })
  43. .padding(10)
  44. .margin(5)
  ```

  [CustomTextStyle.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/text/CustomTextStyle.ets#L236-L273)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/51/v3/tHBeYb67Rg6xHqrJq7s5aQ/zh-cn_image_0000002540771084.png?HW-CC-KV=V1&HW-CC-Date=20260414T034925Z&HW-CC-Expire=86400&HW-CC-Sign=F0AB4069367BB42D7757C4F6276141846FD169C8EC86B8A77A215B8DFC13DB21)
* 通过[textCase](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textcase)属性设置文本大小写。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Text('This is the text content with textCase set to Normal.')
  2. .textCase(TextCase.Normal)
  3. .padding(10)
  4. .border({ width: 1 })
  5. .padding(10)
  6. .margin(5)

  8. // 文本全小写展示
  9. Text('This is the text content with textCase set to LowerCase.')
  10. .textCase(TextCase.LowerCase)
  11. .border({ width: 1 })
  12. .padding(10)
  13. .margin(5)

  15. // 文本全大写展示
  16. Text('This is the text content with textCase set to UpperCase.')
  17. .textCase(TextCase.UpperCase)
  18. .border({ width: 1 })
  19. .padding(10)
  20. .margin(5)
  ```

  [CustomTextStyle.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/text/CustomTextStyle.ets#L279-L300)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9e/v3/Y8oao-ouT1aCdQoHNqJxDw/zh-cn_image_0000002571291381.png?HW-CC-KV=V1&HW-CC-Date=20260414T034925Z&HW-CC-Expire=86400&HW-CC-Sign=581079D3E025C754508627B4F0C826E17907F1922B541A9856D05ED2D01700E3)
* 通过[copyOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#copyoption9)属性设置文本是否可复制粘贴。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // 请将$r('app.string.CustomTextStyle_textContent_incopy')替换为实际资源文件，在本示例中该资源文件的value值为"这是一段可复制文本。"
  2. Text($r('app.string.CustomTextStyle_textContent_incopy'))
  3. .fontSize(30)
  4. .copyOption(CopyOptions.InApp)
  ```

  [CustomTextStyle.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/text/CustomTextStyle.ets#L310-L315)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/3d/v3/4S4he3UuS_WoZxHZe7C5MQ/zh-cn_image_0000002540611434.png?HW-CC-KV=V1&HW-CC-Date=20260414T034925Z&HW-CC-Expire=86400&HW-CC-Sign=E1612522E58E033DFD1576620C1F17A3667D81F763D005BBF89DDAC6FED9D25C)
* 通过[fontFamily](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#fontfamily)属性设置字体列表。应用当前支持'HarmonyOS Sans'字体和[注册自定义字体](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-font)。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Text('This is the text content with fontFamily')
  2. .fontSize(30)
  3. .fontFamily('HarmonyOS Sans')
  ```

  [CustomTextStyle.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/text/CustomTextStyle.ets#L301-L305)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c9/v3/3q_YZbmlTn6NHwZkAYKPvQ/zh-cn_image_0000002571171429.png?HW-CC-KV=V1&HW-CC-Date=20260414T034925Z&HW-CC-Expire=86400&HW-CC-Sign=F031D30C47E6C3081509AD5CE883D8D24B7A69126ABBCC69AC49A94216C4D7B6)
* 从API version 20开始，支持通过[contentTransition](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#contenttransition20)属性设置数字翻牌效果。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. @Entry
  2. @Component
  3. export struct ContentTransition {
  4. private static readonly INITIAL_SCORE: number = 98;
  5. @State number: number = ContentTransition.INITIAL_SCORE;
  6. @State numberTransition: NumericTextTransition =
  7. new NumericTextTransition({ flipDirection: FlipDirection.DOWN, enableBlur: false });
  8. build() {
  9. NavDestination() {
  10. Column() {
  11. Text(this.number + '')
  12. .borderWidth(1)
  13. .fontSize(40)
  14. .contentTransition(this.numberTransition)
  15. Button('chang number')
  16. .onClick(() => {
  17. this.number++
  18. })
  19. .margin(10)
  20. }
  21. .width('100%')
  22. .height('100%')
  23. }
  24. // ···
  25. }
  26. }
  ```

  [ContentTransition.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/text/ContentTransition.ets#L15-L47)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/af/v3/mJoe0SEOTImZuNHGd0iEtA/zh-cn_image_0000002540771086.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034925Z&HW-CC-Expire=86400&HW-CC-Sign=70AF512404E187FE7DBB3E099D82D03A4C7808EBFEB9071739B40150985D918F)
* 从API version 20开始，支持通过[optimizeTrailingSpace](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#optimizetrailingspace20)设置是否在文本布局过程中优化每行末尾的空格，可解决行尾空格影响对齐显示效果问题。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Column() {
  2. // 启用优化行尾空格功能
  3. Text('Trimmed space enabled     ')
  4. .fontSize(30)
  5. .fontWeight(FontWeight.Bold)
  6. .margin({ top: 20 })
  7. .optimizeTrailingSpace(true)
  8. .textAlign(TextAlign.Center)
  9. // 不启用优化行尾空格功能
  10. Text('Trimmed space disabled     ')
  11. .fontSize(30)
  12. .fontWeight(FontWeight.Bold)
  13. .margin({ top: 20 })
  14. .optimizeTrailingSpace(false)
  15. .textAlign(TextAlign.Center)
  16. }
  ```

  [TextLayout.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/text/TextLayout.ets#L65-L83)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/eb/v3/H-TwxpN6TQOkiBSHF3q_fg/zh-cn_image_0000002571291383.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T034925Z&HW-CC-Expire=86400&HW-CC-Sign=41607EFB414176DBB093A5F1995DD6E074E9A7A82068A1FCEACF1C593D90B1E7)
* 从API version 20开始，支持通过[lineSpacing](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#linespacing20)设置文本的行间距。当不配置[LineSpacingOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#linespacingoptions20对象说明)时，首行上方和尾行下方默认会有行间距，当onlyBetweenLines设置为true时，行间距仅适用于行与行之间，首行上方无额外的行间距。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { LengthMetrics } from '@kit.ArkUI';

  3. @Extend(Text)
  4. function style() {
  5. .width(250)
  6. .height(100)
  7. .maxFontSize(30)
  8. .minFontSize(15)
  9. .border({ width: 1 })
  10. }

  12. @Entry
  13. @Component
  14. export struct LineSpacing {
  15. build() {
  16. NavDestination() {
  17. Column() {
  18. Text('The line spacing of this context is set to 20_px, and the spacing is effective only between the lines.')
  19. .lineSpacing(LengthMetrics.px(20), { onlyBetweenLines: true })
  20. .style()
  21. }
  22. }
  23. // ···
  24. }
  25. }
  ```

  [LineSpacing.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/text/LineSpacing.ets#L16-L46)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/53/v3/nuNnNARAS3eJCfPSLVyRuQ/zh-cn_image_0000002540611436.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T034925Z&HW-CC-Expire=86400&HW-CC-Sign=A20C7BD5BC8364776ECC230CEB0A6CCAC3BC5B766E88B0F6C5AFC791803661AB)
* 从API version 20开始，支持通过[enableAutoSpacing](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#enableautospacing20)设置是否开启中文与西文的自动间距。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. @Entry
  2. @Component
  3. export struct EnableAutoSpacing {
  4. @State enableSpacing: boolean = false;

  6. build() {
  7. NavDestination() {
  8. Column() {
  9. Row({ space: 20 }) {
  10. // 请将$r('app.string.Enable_automatic_spacing')替换为实际资源文件，在本示例中该资源文件的value值为"开启自动间距"
  11. Button($r('app.string.Enable_automatic_spacing'))
  12. .onClick(() => this.enableSpacing = true)
  13. .backgroundColor(this.enableSpacing ? '#4CAF50' : '#E0E0E0')
  14. .fontColor(this.enableSpacing ? Color.White : Color.Black)
  15. // 请将$r('app.string.off_automatic_spacing')替换为实际资源文件，在本示例中该资源文件的value值为"关闭自动间距"
  16. Button($r('app.string.off_automatic_spacing'))
  17. .onClick(() => this.enableSpacing = false)
  18. .backgroundColor(!this.enableSpacing ? '#F44336' : '#E0E0E0')
  19. .fontColor(!this.enableSpacing ? Color.White : Color.Black)
  20. }
  21. .width('100%')
  22. .justifyContent(FlexAlign.Center)
  23. .margin({ top: 30, bottom: 20 })
  24. // 请将$r('app.string.Automatic_spacing_has_been_enabled')替换为实际资源文件，在本示例中该资源文件的value值为"当前状态:已开启自动间距"
  25. // 请将$r('app.string.Automatic_spacing_has_been_turned_off')替换为实际资源文件，在本示例中该资源文件的value值为"当前状态:已关闭自动间距"
  26. Text(this.enableSpacing ? $r('app.string.Automatic_spacing_has_been_enabled') : $r('app.string.Automatic_spacing_has_been_turned_off'))
  27. .fontSize(16)
  28. .fontColor(this.enableSpacing ? '#4CAF50' : '#F44336')
  29. .margin({ bottom: 20 })

  31. // 设置是否应用中西文自动间距
  32. /* 请将$r('app.string.Chinese_and_Western_Auto_Spacing_automatic_spacing')替换为实际资源文件，
  33. * 在本示例中该资源文件的value值为"中西文Auto Spacing自动间距"
  34. */
  35. Text($r('app.string.Chinese_and_Western_Auto_Spacing_automatic_spacing'))
  36. .fontSize(24)
  37. .padding(15)
  38. .backgroundColor('#F5F5F5')
  39. .width('90%')
  40. .enableAutoSpacing(this.enableSpacing)
  41. }
  42. .width('100%')
  43. .height('100%')
  44. .padding(20)
  45. }
  46. // ...
  47. }
  48. }
  ```

  [EnableAutoSpacing.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/text/EnableAutoSpacing.ets#L16-L68)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d3/v3/7bU9bHHdTh2a63lFpsQDOA/zh-cn_image_0000002571171431.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034925Z&HW-CC-Expire=86400&HW-CC-Sign=1291CA6989C0CBF62B14FD0743CC591990E0A5E524003F5AB71654302C4280E6)
* 从API version 20开始，支持通过[shaderStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#shaderstyle20)设置渐变色。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. @Entry
  2. @Component
  3. export struct ShaderStyle {
  4. @State message: string = 'Hello World';
  5. @State linearGradientOptions: LinearGradientOptions =
  6. {
  7. direction: GradientDirection.LeftTop,
  8. colors: [[Color.Red, 0.0], [Color.Blue, 0.3], [Color.Green, 0.5]],
  9. repeating: true,
  10. };

  12. build() {
  13. NavDestination() {
  14. Column({ space: 5 }) {
  15. // 请将$r('app.string.direction_LeftTop')替换为实际资源文件，在本示例中该资源文件的value值为"direction为LeftTop的线性渐变"
  16. Text($r('app.string.direction_LeftTop')).fontSize(18).width('90%').fontColor(0xCCCCCC)
  17. .margin({ top: 40, left: 40 })
  18. Text(this.message)
  19. .fontSize(50)
  20. .width('80%')
  21. .height(50)
  22. .shaderStyle(this.linearGradientOptions)
  23. }
  24. .height('100%')
  25. .width('100%')
  26. }
  27. // ...
  28. }
  29. }
  ```

  [ShaderStyle.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/text/ShaderStyle.ets#L16-L50)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/43/v3/jPxEmayaSxupq_4uPyukQw/zh-cn_image_0000002540771088.png?HW-CC-KV=V1&HW-CC-Date=20260414T034925Z&HW-CC-Expire=86400&HW-CC-Sign=D33F8B23425AFC51D3ADB341D97366EFC28FF8BF93415D7D8BEE1C7D30125C37)

## 添加事件

Text组件可以添加通用事件，可以绑定[onClick](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-click#onclick)、[onTouch](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-touch#ontouch)等事件来响应操作。

收起

自动换行

深色代码主题

复制

```
1. // xxx.ets
2. import { hilog } from '@kit.PerformanceAnalysisKit';
3. @Entry
4. @Component
5. export struct GeneralEvents {
6. @State textStr1: string = '';
7. @State textStr2: string = '';

9. build() {
10. NavDestination() {
11. Row() {
12. Column() {
13. Text('This is a text component.')
14. .fontSize(30)
15. .onClick(() => {
16. hilog.info(0x0000, 'Sample_TextComponent', 'Text onClick is triggering');
17. this.textStr1 = 'Text onClick is triggering';
18. })
19. .onTouch(() => {
20. hilog.info(0x0000, 'Sample_TextComponent', 'Text onTouch is triggering');
21. this.textStr2 = 'Text onTouch is triggering';
22. })
23. Text('onClick：' + this.textStr1)
24. .fontSize(20)
25. Text('onTouch：' + this.textStr2)
26. .fontSize(20)
27. }.width('100%')
28. }
29. .height('100%')
30. }
31. // ···
32. }
33. }
```

[GeneralEvents.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/text/GeneralEvents.ets#L16-L54)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/aa/v3/dZdb00jxQ_SB7sVyf0hJWw/zh-cn_image_0000002571291385.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034925Z&HW-CC-Expire=86400&HW-CC-Sign=473C7F62FEF513DEBC2EA1CB1E3CE83D9EE5ADF5E361ACA582C06A3E2C59D598)

## 设置垂直居中

从API version 20开始，Text组件支持通过[textVerticalAlign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textverticalalign20)属性实现文本段落在垂直方向的对齐。

* 以下示例展示了如何通过textVerticalAlign属性设置文本垂直居中对齐效果。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // 请将$r('app.media.startIcon')替换为实际资源文件
  2. Text() {
  3. Span('Hello')
  4. .fontSize(50)
  5. ImageSpan($r('app.media.startIcon'))
  6. .width(30).height(30)
  7. .verticalAlign(ImageSpanAlignment.FOLLOW_PARAGRAPH)
  8. Span('World')
  9. }
  10. .textVerticalAlign(TextVerticalAlign.CENTER)
  ```

  [TextLayout.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/text/TextLayout.ets#L85-L97)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/93/v3/Fkr_N6rSRZCFKOCwUTUsiA/zh-cn_image_0000002540611438.png?HW-CC-KV=V1&HW-CC-Date=20260414T034925Z&HW-CC-Expire=86400&HW-CC-Sign=7890048168F0AC97C8D90F80B6E793503BF4C36ABE3DAC1E2E4FFCE29AE73A70)

## 设置选中菜单

### 弹出选中菜单

* 设置Text被选中时，会弹出包含复制、翻译、搜索的菜单。

  Text组件需要设置[copyOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#copyoption9)属性才可以被选中。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // 请将$r('app.string.selected_menu')替换为实际资源文件，在本示例中该资源文件的value值为"这是一段文本，用来展示选中菜单"
  2. Text($r('app.string.selected_menu'))
  3. .fontSize(30)
  4. .copyOption(CopyOptions.InApp)
  ```

  [TextLayout.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/text/TextLayout.ets#L101-L106)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/22/v3/Jlqzf5QKReujsktUakhjFg/zh-cn_image_0000002571171433.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T034925Z&HW-CC-Expire=86400&HW-CC-Sign=63D00AA2EE1E6E2B48666484B4301910C04133F4B273FE018873F4CD67D410A2)
* Text组件通过设置[bindSelectionMenu](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#bindselectionmenu11)属性绑定自定义选择菜单。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. controller: TextController = new TextController();
  2. options: TextOptions = { controller: this.controller };
  ```

  [SelectMenu.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/text/SelectMenu.ets#L23-L26)

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // 请将$r('app.string.show_selected_menu')替换为实际资源文件，在本示例中该资源文件的value值为"这是一段文本，用来展示选中菜单"
  2. Text($r('app.string.show_selected_menu'), this.options)
  3. .fontSize(30)
  4. .copyOption(CopyOptions.InApp)
  5. .bindSelectionMenu(TextSpanType.TEXT, this.RightClickTextCustomMenu, TextResponseType.RIGHT_CLICK, {
  6. onAppear: () => {
  7. // 请将$r('app.string.SelectMenu_Text_Ejected')替换为实际资源文件，在本示例中该资源文件的value值为"自定义选择菜单弹出时触发该回调"
  8. hilog.info(0x0000, 'Sample_TextComponent',
  9. this.getUIContext()
  10. .getHostContext()!.resourceManager.getStringSync($r('app.string.SelectMenu_Text_Ejected').id));
  11. },
  12. onDisappear: () => {
  13. // 'SelectMenu_Text_Close'资源文件中的value值为'自定义选择菜单关闭时触发该回调'
  14. hilog.info(0x0000, 'Sample_TextComponent',
  15. this.getUIContext()
  16. .getHostContext()!.resourceManager.getStringSync($r('app.string.SelectMenu_Text_Close').id));
  17. }
  18. })
  ```

  [SelectMenu.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/text/SelectMenu.ets#L102-L119)

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // 定义菜单项
  2. @Builder
  3. RightClickTextCustomMenu() {
  4. Column() {
  5. Menu() {
  6. MenuItemGroup() {
  7. // 请将$r('app.media.app_icon')替换为实际资源文件
  8. MenuItem({ startIcon: $r('app.media.app_icon'), content: 'CustomMenu One', labelInfo: '' })
  9. .onClick(() => {
  10. // 使用closeSelectionMenu接口关闭菜单
  11. this.controller.closeSelectionMenu();
  12. })
  13. MenuItem({ startIcon: $r('app.media.app_icon'), content: 'CustomMenu Two', labelInfo: '' })
  14. MenuItem({ startIcon: $r('app.media.app_icon'), content: 'CustomMenu Three', labelInfo: '' })
  15. }
  16. }.backgroundColor('#F0F0F0')
  17. }
  18. }
  ```

  [SelectMenu.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/text/SelectMenu.ets#L27-L46)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7c/v3/-CWkPDL3T8ybidH-JVhR3g/zh-cn_image_0000002540771090.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034925Z&HW-CC-Expire=86400&HW-CC-Sign=4D6D1C2FE53E2B89D97E51817784E1D63A2683D208D47343DFEF9EC32195ED23)
* Text组件通过设置[editMenuOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#editmenuoptions12)属性扩展自定义选择菜单，可以设置扩展项的文本内容、图标以及回调方法。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // 请将$r('app.string.show_selected_menu')替换为实际资源文件，在本示例中该资源文件的value值为"这是一段文本，用来展示选中菜单"
  2. Text($r('app.string.show_selected_menu'))
  3. .fontSize(20)
  4. .copyOption(CopyOptions.LocalDevice)
  5. .editMenuOptions({
  6. onCreateMenu: this.onCreateMenu, onMenuItemClick: this.onMenuItemClick
  7. })
  ```

  [SelectMenu.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/text/SelectMenu.ets#L123-L131)

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // 定义onCreateMenu，onMenuItemClick
  2. // 请将$r('app.media.app_icon')替换为实际资源文件
  3. onCreateMenu = (menuItems: Array<TextMenuItem>) => {
  4. let item1: TextMenuItem = {
  5. content: 'customMenu1',
  6. icon: $r('app.media.app_icon'),
  7. id: TextMenuItemId.of('customMenu1'),
  8. };
  9. let item2: TextMenuItem = {
  10. content: 'customMenu2',
  11. id: TextMenuItemId.of('customMenu2'),
  12. icon: $r('app.media.app_icon'),
  13. };
  14. menuItems.push(item1);
  15. menuItems.unshift(item2);
  16. return menuItems;
  17. }
  18. onMenuItemClick = (menuItem: TextMenuItem, textRange: TextRange) => {
  19. if (menuItem.id.equals(TextMenuItemId.of('customMenu2'))) {
  20. // 请将$r('app.string.SelectMenu_Text_customMenu')替换为实际资源文件，在本示例中该资源文件的value值为"拦截 id: customMenu2 start:"
  21. hilog.info(0x0000, 'Sample_TextComponent',
  22. this.getUIContext().getHostContext()!.resourceManager.getStringSync($r('app.string.SelectMenu_Text_customMenu')
  23. .id) + textRange.start + '; end:' +
  24. textRange.end);
  25. return true;
  26. }
  27. if (menuItem.id.equals(TextMenuItemId.COPY)) {
  28. // 请将$r('app.string.SelectMenu_Text_copy')替换为实际资源文件，在本示例中该资源文件的value值为"拦截 COPY start:"
  29. hilog.info(0x0000, 'Sample_TextComponent',
  30. this.getUIContext().getHostContext()!.resourceManager.getStringSync($r('app.string.SelectMenu_Text_copy').id) +
  31. textRange.start + '; end:' + textRange.end);
  32. return true;
  33. }
  34. if (menuItem.id.equals(TextMenuItemId.SELECT_ALL)) {
  35. // 请将$r('app.string.SelectMenu_Text_SelectionAll')替换为实际资源文件，在本示例中该资源文件的value值为"不拦截 SELECT_ALL start:"
  36. hilog.info(0x0000, 'Sample_TextComponent',
  37. this.getUIContext()
  38. .getHostContext()!.resourceManager.getStringSync($r('app.string.SelectMenu_Text_SelectionAll').id) +
  39. textRange.start + '; end:' +
  40. textRange.end);
  41. return false;
  42. }
  43. return false;
  44. };
  ```

  [SelectMenu.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/text/SelectMenu.ets#L47-L88)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/db/v3/Y8k9JKCOTCyy7EzqQsKwBA/zh-cn_image_0000002571291387.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034925Z&HW-CC-Expire=86400&HW-CC-Sign=901EF6F79580E5963FF67D5EB06E1E71587E52B488BA30CFCA536835CBA6F934)

### 关闭选中菜单

使用Text组件时，若需要实现点击空白处关闭选中的场景，分为以下两种情况：

* 在Text组件区域内点击空白处，会正常关闭选中态和菜单；
* 在Text组件区域外点击空白处，前提是Text组件设置[selection](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#selection11)属性，具体示例如下：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // xxx.ets
  2. @Entry
  3. @Component
  4. export struct SelectionChange {
  5. @State text: string =
  6. 'This is set selection to Selection text content This is set selection to Selection text content.';
  7. @State start: number = 0;
  8. @State end: number = 20;

  10. build() {
  11. NavDestination() {
  12. Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.Start }) {
  13. Text(this.text)
  14. .fontSize(12)
  15. .border({ width: 1 })
  16. .lineHeight(20)
  17. .margin(30)
  18. .copyOption(CopyOptions.InApp)
  19. .selection(this.start, this.end)
  20. .onTextSelectionChange((selectionStart, selectionEnd) => {
  21. // 更新选中态位置
  22. this.start = selectionStart;
  23. this.end = selectionEnd;
  24. })
  25. }
  26. .height(600)
  27. .width(335)
  28. .borderWidth(1)
  29. .onClick(() => {
  30. // 监听父组件的点击事件，将选中首尾位置均设置为-1，即可清除选中
  31. this.start = -1;
  32. this.end = -1;
  33. })
  34. }
  35. // ···
  36. }
  37. }
  ```

  [SelectionChange.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/text/SelectionChange.ets#L15-L57)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/25/v3/XztZ58tBSzSMku55r0Qs6w/zh-cn_image_0000002540611440.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034925Z&HW-CC-Expire=86400&HW-CC-Sign=8DFAFB41A9C984AF750CBCE6AF046183E334A7CC5271D7657E29AD415C91CA43)

### 屏蔽系统菜单回调和自定义扩展菜单

从API version 12开始，支持通过[editMenuOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#editmenuoptions12)屏蔽系统菜单回调和自定义扩展菜单项。

收起

自动换行

深色代码主题

复制

```
1. // xxx.ets
2. @Entry
3. @Component
4. export struct CustomAndBlockMenus {
5. private static readonly CREATE_MENU_ITEM_ID_1: string = 'create1';
6. private static readonly CREATE_MENU_ITEM_ID_2: string = 'create2';
7. private static readonly PREPARE_MENU_ITEM_ID: string = 'prepare1';
8. @State private text: string = 'Text editMenuOptions';
9. @State private endIndex: number = 0;
10. @State blockCallbackText: string = '';

12. // 创建菜单项辅助方法
13. private createMenuItem(id: string, content: string): TextMenuItem {
14. // $r('app.media.startIcon')需要替换为开发者所需的图像资源文件
15. return {
16. content: content,
17. icon: $r('app.media.startIcon'),
18. id: TextMenuItemId.of(id)
19. };
20. }

22. // 查找菜单项索引
23. private findMenuItemIndex(menuItems: Array<TextMenuItem>, menuItemId: TextMenuItemId): number {
24. return menuItems.findIndex((item: TextMenuItem) => item.id.equals(menuItemId));
25. }

27. // 创建菜单回调
28. private onCreateMenu = (menuItems: Array<TextMenuItem>): Array<TextMenuItem> => {
29. const createItem1: TextMenuItem = this.createMenuItem(
30. CustomAndBlockMenus.CREATE_MENU_ITEM_ID_1,
31. 'create1'
32. );

34. const createItem2: TextMenuItem = this.createMenuItem(
35. CustomAndBlockMenus.CREATE_MENU_ITEM_ID_2,
36. 'create2'
37. );

39. // 添加自定义菜单项
40. menuItems.push(createItem1);
41. menuItems.unshift(createItem2);

43. // 移除不需要的系统菜单项
44. this.removeMenuItemById(menuItems, TextMenuItemId.AI_WRITER);
45. this.removeMenuItemById(menuItems, TextMenuItemId.TRANSLATE);

47. return menuItems;
48. }

50. // 移除指定菜单项
51. private removeMenuItemById(menuItems: Array<TextMenuItem>, menuItemId: TextMenuItemId): void {
52. const targetIndex: number = this.findMenuItemIndex(menuItems, menuItemId);
53. if (targetIndex !== -1) {
54. menuItems.splice(targetIndex, 1);
55. }
56. }

58. // 菜单项点击回调
59. private onMenuItemClick = (menuItem: TextMenuItem, textRange: TextRange): boolean => {
60. const menuItemId: TextMenuItemId = menuItem.id;

62. // 处理自定义菜单项
63. if (menuItemId.equals(TextMenuItemId.of(CustomAndBlockMenus.CREATE_MENU_ITEM_ID_2))) {
64. let msg = '拦截 id: create2 start:' + textRange.start + '; end:' + textRange.end;
65. this.blockCallbackText = msg
66. return true;
67. }

69. if (menuItemId.equals(TextMenuItemId.of(CustomAndBlockMenus.PREPARE_MENU_ITEM_ID))) {
70. let msg = '拦截 id: prepare1 start:' + textRange.start + '; end:+' + textRange.end;
71. this.blockCallbackText = msg
72. return true;
73. }

75. // 处理系统菜单项
76. if (menuItemId.equals(TextMenuItemId.COPY)) {
77. let msg = '拦截 COPY start:' + textRange.start + '; end:' + textRange.end;
78. this.blockCallbackText = msg
79. return true;
80. }

82. if (menuItemId.equals(TextMenuItemId.SELECT_ALL)) {
83. let msg = '不拦截 SELECT_ALL start:' + textRange.start + '; end:' + textRange.end;
84. this.blockCallbackText = msg
85. return false;
86. }

88. return false;
89. }
90. // 准备菜单回调
91. private onPrepareMenu = (menuItems: Array<TextMenuItem>): Array<TextMenuItem> => {
92. const prepareItem: TextMenuItem = this.createMenuItem(
93. CustomAndBlockMenus.PREPARE_MENU_ITEM_ID,
94. `prepare1_${this.endIndex}`
95. );

97. menuItems.unshift(prepareItem);
98. return menuItems;
99. }
100. // 编辑菜单选项
101. @State private editMenuOptions: EditMenuOptions = {
102. onCreateMenu: this.onCreateMenu,
103. onMenuItemClick: this.onMenuItemClick,
104. onPrepareMenu: this.onPrepareMenu
105. };
106. // 文本选择变化回调
107. private onTextSelectionChange = (selectionStart: number, selectionEnd: number): void => {
108. this.endIndex = selectionEnd;
109. }

111. build() {
112. NavDestination() {
113. Column() {
114. Text(this.text)
115. .fontSize(20)
116. .copyOption(CopyOptions.LocalDevice)
117. .editMenuOptions(this.editMenuOptions)
118. .margin({ top: 100 })
119. .onTextSelectionChange(this.onTextSelectionChange)
120. Text(this.blockCallbackText).borderWidth(1)
121. }
122. .width('90%')
123. .margin('5%')
124. }
125. }
126. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/76/v3/KZFGFH_qSoasLMJ8tfmgXA/zh-cn_image_0000002571171435.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034925Z&HW-CC-Expire=86400&HW-CC-Sign=AC663D9F4D071A60F4135728F11ED6BBCFCFAF4FBF4225B8D040CBA17EDDA65D)

### 屏蔽系统服务类菜单

* 从API version 20开始，支持通过[disableSystemServiceMenuItems](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-textmenucontroller#disablesystemservicemenuitems20)屏蔽文本选择菜单内所有系统服务菜单项。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { TextMenuController } from '@kit.ArkUI';
  2. // xxx.ets
  3. @Entry
  4. @Component
  5. export struct ServiceMenuItems {
  6. aboutToAppear(): void {
  7. // 禁用所有系统服务菜单
  8. TextMenuController.disableSystemServiceMenuItems(true);
  9. }

  11. aboutToDisappear(): void {
  12. // 页面消失恢复系统服务菜单
  13. TextMenuController.disableSystemServiceMenuItems(false);
  14. }
  15. build() {
  16. NavDestination() {
  17. Row() {
  18. Column() {
  19. // 请将$r('app.string.Service_MenuItems_Text')替换为实际资源文件，在本示例中该资源文件的value值为"这是一段文本，长按弹出文本选择菜单。"
  20. Text($r('app.string.Service_MenuItems_Text'))
  21. .height(60)
  22. .fontStyle(FontStyle.Italic)
  23. .fontWeight(FontWeight.Bold)
  24. .textAlign(TextAlign.Center)
  25. .copyOption(CopyOptions.InApp)
  26. .editMenuOptions({
  27. onCreateMenu: (menuItems: Array<TextMenuItem>) => {
  28. // menuItems不包含被屏蔽的系统菜单项
  29. return menuItems;
  30. },
  31. onMenuItemClick: (menuItem: TextMenuItem, textRange: TextRange) => {
  32. return false;
  33. }
  34. })
  35. }.width('100%')
  36. }
  37. .height('100%')
  38. }
  39. // ...
  40. }
  41. }
  ```

  [ServiceMenuItems.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/text/ServiceMenuItems.ets#L15-L61)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/96/v3/BkAa6IjQSH6aNtgdNXKjjQ/zh-cn_image_0000002540771092.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T034925Z&HW-CC-Expire=86400&HW-CC-Sign=D16B3F6F884120A756E730E69EE388226DE3210731277AD13113352B81B07619)
* 从API version 20开始，支持通过[disableMenuItems](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-textmenucontroller#disablemenuitems20)屏蔽文本选择菜单内指定的系统服务菜单项。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { TextMenuController } from '@kit.ArkUI';

  3. // xxx.ets
  4. @Entry
  5. @Component
  6. export struct DisableMenuItems {
  7. aboutToAppear(): void {
  8. // 禁用搜索菜单
  9. TextMenuController.disableMenuItems([TextMenuItemId.SEARCH])
  10. }

  12. aboutToDisappear(): void {
  13. // 恢复系统服务菜单
  14. TextMenuController.disableMenuItems([])
  15. }

  17. build() {
  18. NavDestination() {
  19. Row() {
  20. Column() {
  21. // 请将$r('app.string.Service_MenuItems_Text')替换为实际资源文件，在本示例中该资源文件的value值为"这是一段文本，长按弹出文本选择菜单。"
  22. Text($r('app.string.Service_MenuItems_Text'))
  23. .height(60)
  24. .fontStyle(FontStyle.Italic)
  25. .fontWeight(FontWeight.Bold)
  26. .textAlign(TextAlign.Center)
  27. .copyOption(CopyOptions.InApp)
  28. .editMenuOptions({
  29. onCreateMenu: (menuItems: Array<TextMenuItem>) => {
  30. // menuItems不包含搜索
  31. return menuItems;
  32. },
  33. onMenuItemClick: (menuItem: TextMenuItem, textRange: TextRange) => {
  34. return false
  35. }
  36. })
  37. }.width('100%')
  38. }
  39. .height('100%')
  40. }
  41. // ...
  42. }
  43. }
  ```

  [DisableMenuItems.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/text/DisableMenuItems.ets#L15-L63)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/42/v3/CmJZCtdZSEmn0FcDwrMTRg/zh-cn_image_0000002571291391.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T034925Z&HW-CC-Expire=86400&HW-CC-Sign=A50F693F080493A1B92A5CDD907E471EF7715AB10C16FB5719FBBDB02B2030C6)

### 默认菜单支持自定义刷新能力

从API version 20开始，当文本选择区域变化后显示菜单之前触发[onPrepareMenu](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#属性-1)回调，可在该回调中进行菜单数据设置。

收起

自动换行

深色代码主题

复制

```
1. // 请将$r('app.media.xxx')替换为实际资源文件
2. // xxx.ets
3. import { hilog } from '@kit.PerformanceAnalysisKit';
4. const DOMAIN = 0x0000;
5. @Entry
6. @Component

8. export struct PrepareMenu {
9. @State text: string = 'Text editMenuOptions';
10. @State endIndex: number = 0;
11. onCreateMenu = (menuItems: Array<TextMenuItem>) => {
12. let item1: TextMenuItem = {
13. content: 'create1',
14. icon: $r('app.media.startIcon'),
15. id: TextMenuItemId.of('create1'),
16. };
17. let item2: TextMenuItem = {
18. content: 'create2',
19. id: TextMenuItemId.of('create2'),
20. icon: $r('app.media.startIcon'),
21. };
22. menuItems.push(item1);
23. menuItems.unshift(item2);
24. return menuItems;
25. }
26. onMenuItemClick = (menuItem: TextMenuItem, textRange: TextRange) => {
27. if (menuItem.id.equals(TextMenuItemId.of('create2'))) {
28. hilog.info(DOMAIN, 'testTag', '%{public}s', 'intercept id: create2 start:' + textRange.start + '; end:' + textRange.end);
29. return true;
30. }
31. if (menuItem.id.equals(TextMenuItemId.of('prepare1'))) {
32. hilog.info(DOMAIN, 'testTag', '%{public}s', 'intercept id: prepare1 start:' + textRange.start + '; end:' + textRange.end);
33. return true;
34. }
35. if (menuItem.id.equals(TextMenuItemId.COPY)) {
36. hilog.info(DOMAIN, 'testTag', '%{public}s', 'intercept COPY start:' + textRange.start + '; end:' + textRange.end);
37. return true;
38. }
39. if (menuItem.id.equals(TextMenuItemId.SELECT_ALL)) {
40. hilog.info(DOMAIN, 'testTag', '%{public}s', 'No interception SELECT_ALL start:' + textRange.start + '; end:' + textRange.end);
41. return false;
42. }
43. return false;
44. }
45. onPrepareMenu = (menuItems: Array<TextMenuItem>) => {
46. let item1: TextMenuItem = {
47. content: 'prepare1_' + this.endIndex,
48. icon: $r('app.media.startIcon'),
49. id: TextMenuItemId.of('prepare1'),
50. };
51. menuItems.unshift(item1);
52. return menuItems;
53. }
54. @State editMenuOptions: EditMenuOptions = {
55. onCreateMenu: this.onCreateMenu,
56. onMenuItemClick: this.onMenuItemClick,
57. onPrepareMenu: this.onPrepareMenu
58. };

60. build() {
61. NavDestination() {
62. Column() {
63. Text(this.text)
64. .fontSize(20)
65. .copyOption(CopyOptions.LocalDevice)
66. .editMenuOptions(this.editMenuOptions)
67. .margin({ top: 100 })
68. .onTextSelectionChange((selectionStart: number, selectionEnd: number) => {
69. this.endIndex = selectionEnd;
70. })
71. }
72. .width('90%')
73. .margin('5%')
74. }
75. // ...
76. }
77. }
```

[PrepareMenu.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/text/PrepareMenu.ets#L15-L96)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c2/v3/t38hmQp2QJiZ2Sz4vrR0CQ/zh-cn_image_0000002540611442.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034925Z&HW-CC-Expire=86400&HW-CC-Sign=489AD1BAFF60978C7B43E26920E2A80F5027F9B08FA403B8C64D9B078BF6B935)

## 设置AI菜单

Text组件通过[enableDataDetector](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#enabledatadetector11)和[dataDetectorConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#datadetectorconfig11)属性实现AI菜单的显示。AI菜单的表现形式包括：单击AI实体（指可被识别的内容，包括地址、邮箱等）弹出菜单的实体识别选项，选中文本后，文本选择菜单与鼠标右键菜单中显示的实体识别选项。

说明

从API version 20开始，支持在文本选择菜单与鼠标右键菜单中显示实体识别选项。当[enableDataDetector](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#enabledatadetector11)设置为true，且[copyOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#copyoption9)设置为CopyOptions.LocalDevice时，该功能生效。菜单选项包括[TextMenuItemId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#textmenuitemid12)中的url(打开链接)、email(新建邮件)、phoneNumber(呼叫)、address(导航至该位置)、dateTime(新建日程提醒)。

该功能生效时，需选中范围内，包括一个完整的AI实体，才能展示对应的选项。

* 如果需要单击AI实体弹出菜单的实体识别选项，可以配置[enableDataDetector](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#enabledatadetector11)为true。
* 如果在单击的交互方式之外，还需要文本选择菜单与鼠标右键菜单中显示的实体识别选项，可以配置[enableDataDetector](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#enabledatadetector11)为true，且[copyOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#copyoption9)设置为CopyOptions.LocalDevice，具体示例如下所示：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // 'app.string.AIMenu_Text_One'资源文件中的value值为'电话号码：(86) (755) ********  \n \n 链接：www.********.com
  2. // \n \n 邮箱：***@example.com\n \n 地址：XX省XX市XX区XXXX \n \n 时间：XX年XX月XX日XXXX'
  3. Text($r('app.string.AIMenu_Text_One'))
  4. .fontSize(16)
  5. .copyOption(CopyOptions.LocalDevice)
  6. .enableDataDetector(true)// 使能实体识别
  7. .dataDetectorConfig({
  8. // 配置识别样式
  9. // types可支持PHONE_NUMBER电话号码、URL链接、EMAIL邮箱、ADDRESS地址、DATE_TIME时间
  10. // types设置为null或者[]时，识别所有类型的实体
  11. types: [], onDetectResultUpdate: (result: string) => {
  12. }
  13. })
  ```

  [AIMenu.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/text/AIMenu.ets#L25-L39)
* 如果需要调整识别出的样式，可以通过[dataDetectorConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#datadetectorconfig11)实现，具体可以参考[TextDataDetectorConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#textdatadetectorconfig11对象说明)配置项。
* 如果需要调整菜单的位置，可以通过[editMenuOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#editmenuoptions12)实现，具体可以参考示例[文本扩展自定义菜单](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#示例12文本扩展自定义菜单)。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c8/v3/GOdAHaU0Ry-L1yFPjMCI9g/zh-cn_image_0000002571171437.png?HW-CC-KV=V1&HW-CC-Date=20260414T034925Z&HW-CC-Expire=86400&HW-CC-Sign=87CE6B64A522F90C67CC1410A5072D9DDB0F52E3035F9BDA337C31F575AA2E16)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a0/v3/LyobuQ43QS2fOjEcuWp9FQ/zh-cn_image_0000002540771094.png?HW-CC-KV=V1&HW-CC-Date=20260414T034925Z&HW-CC-Expire=86400&HW-CC-Sign=6497C4E9D2118235E757254C24EE960EC0BB1510FCC022451DCFA444F7A3AC2D)

## 实现热搜榜

该示例通过[maxLines](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#maxlines)、[textOverflow](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textoverflow)、[textAlign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textalign)、[constraintSize](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-size#constraintsize)属性展示了热搜榜的效果。

收起

自动换行

深色代码主题

复制

```
1. import { ComponentCard } from '../../common/Card';

3. @Entry
4. @Component
5. export struct TextHotSearch {
6. build() {
7. NavDestination() {
8. Column({ space: 12 }) {
9. // ...
10. Column() {
11. Row() {
12. Text('1').fontSize(14).fontColor(Color.Red).margin({ left: 10, right: 10 })
13. // 请将$r('app.string.TextHotSearch_textContent_one')替换为实际资源文件，在本示例中该资源文件的value值为"我是热搜词条1"
14. Text($r('app.string.TextHotSearch_textContent_one'))
15. .fontSize(12)
16. .fontColor(Color.Blue)
17. .maxLines(1)
18. .textOverflow({ overflow: TextOverflow.Ellipsis })
19. .fontWeight(300)
20. // 请将$r('app.string.TextHotSearch_textContent_two')替换为实际资源文件，在本示例中该资源文件的value值为"爆"
21. Text($r('app.string.TextHotSearch_textContent_two'))
22. .margin({ left: 6 })
23. .textAlign(TextAlign.Center)
24. .fontSize(10)
25. .fontColor(Color.White)
26. .fontWeight(600)
27. .backgroundColor(0x770100)
28. .borderRadius(5)
29. .width(15)
30. .height(14)
31. }.width('100%').margin(5)

33. Row() {
34. Text('2').fontSize(14).fontColor(Color.Red).margin({ left: 10, right: 10 })
35. /* 请将$r('app.string.TextHotSearch_textContent_three')替换为实际资源文件，
36. * 在本示例中该资源文件的value值为"我是热搜词条2 我是热搜词条2 我是热搜词条2 我是热搜词条2 我是热搜词条2"
37. */
38. Text($r('app.string.TextHotSearch_textContent_three'))
39. .fontSize(12)
40. .fontColor(Color.Blue)
41. .fontWeight(300)
42. .constraintSize({ maxWidth: 200 })
43. .maxLines(1)
44. .textOverflow({ overflow: TextOverflow.Ellipsis })
45. // 请将$r('app.string.TextHotSearch_textContent_four')替换为实际资源文件，在本示例中该资源文件的value值为"热"
46. Text($r('app.string.TextHotSearch_textContent_four'))
47. .margin({ left: 6 })
48. .textAlign(TextAlign.Center)
49. .fontSize(10)
50. .fontColor(Color.White)
51. .fontWeight(600)
52. .backgroundColor(0xCC5500)
53. .borderRadius(5)
54. .width(15)
55. .height(14)
56. }.width('100%').margin(5)

58. Row() {
59. Text('3').fontSize(14).fontColor(Color.Orange).margin({ left: 10, right: 10 })
60. // 请将$r('app.string.TextHotSearch_textContent_five')替换为实际资源文件，在本示例中该资源文件的value值为"我是热搜词条3"
61. Text($r('app.string.TextHotSearch_textContent_five'))
62. .fontSize(12)
63. .fontColor(Color.Blue)
64. .fontWeight(300)
65. .maxLines(1)
66. .constraintSize({ maxWidth: 200 })
67. .textOverflow({ overflow: TextOverflow.Ellipsis })
68. // 请将$r('app.string.TextHotSearch_textContent_four')替换为实际资源文件，在本示例中该资源文件的value值为"热"
69. Text($r('app.string.TextHotSearch_textContent_four'))
70. .margin({ left: 6 })
71. .textAlign(TextAlign.Center)
72. .fontSize(10)
73. .fontColor(Color.White)
74. .fontWeight(600)
75. .backgroundColor(0xCC5500)
76. .borderRadius(5)
77. .width(15)
78. .height(14)
79. }.width('100%').margin(5)

81. Row() {
82. Text('4').fontSize(14).fontColor(Color.Grey).margin({ left: 10, right: 10 })
83. /* 请将$r('app.string.TextHotSearch_textContent_six')替换为实际资源文件，
84. * 在本示例中该资源文件的value值为"我是热搜词条4 我是热搜词条4 我是热搜词条4 我是热搜词条4 我是热搜词条4"
85. */
86. Text($r('app.string.TextHotSearch_textContent_six'))
87. .fontSize(12)
88. .fontColor(Color.Blue)
89. .fontWeight(300)
90. .constraintSize({ maxWidth: 200 })
91. .maxLines(1)
92. .textOverflow({ overflow: TextOverflow.Ellipsis })
93. }.width('100%').margin(5)
94. }.width('100%')
95. // ...
96. }
97. .width('100%')
98. .height('100%')
99. .padding({ left: 12, right: 12 })
100. }
101. // ...
102. }
103. }
```

[TextHotSearch.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/text/TextHotSearch.ets#L16-L124)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/27/v3/dtpdQ-wGSPW-3u40NCpHng/zh-cn_image_0000002571291393.png?HW-CC-KV=V1&HW-CC-Date=20260414T034925Z&HW-CC-Expire=86400&HW-CC-Sign=70A44476842BF25D63AD156C521031BFA298A2DC20F736A01B6E5A177960953A)

## 示例代码

* [文字特效合集](https://gitcode.com/HarmonyOS_Samples/text-effects)