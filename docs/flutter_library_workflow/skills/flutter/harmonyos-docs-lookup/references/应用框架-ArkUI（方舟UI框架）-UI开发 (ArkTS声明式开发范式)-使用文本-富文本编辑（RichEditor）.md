RichEditor是支持图文混排和文本交互式编辑的组件，通常用于响应用户对图文混合内容的输入操作，例如可以输入图文的评论区。具体用法参考[RichEditor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor)组件的API文档。

对于仅需图文展示而不需要编辑的场景，建议使用[Text](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text)组件。

对于需要大量展示Html格式内容的场景，建议使用[RichText](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richtext)组件。

## 组件构成

下图展示了组件元素的构成。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5f/v3/nIAfPlX7RSW_T37N9ASTeA/zh-cn_image_0000002571291407.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T034933Z&HW-CC-Expire=86400&HW-CC-Sign=370AC075F369F2E721FFC35A4C61479BC10EA318446AB03D2AE831D8CD4715CC)

组件的元素构成包括：

展开

| 元素 | 说明 |
| --- | --- |
| 内容区 | 内容可显示的区域。 |
| 光标 | 用于指明当前输入位置。 |
| 手柄 | 分为左手柄和右手柄，可分别进行拖动，用于调整文本选择区域范围。 |
| 菜单 | 选中内容后弹出，其中包含复制、粘贴等内容操作按钮。 |

## 创建RichEditor组件

开发者可以[创建基于属性字符串进行内容管理的RichEditor组件](/consumer/cn/doc/harmonyos-guides/arkts-common-components-richeditor#创建基于属性字符串进行内容管理的richeditor组件)或[创建基于Span进行内容管理的RichEditor组件](/consumer/cn/doc/harmonyos-guides/arkts-common-components-richeditor#创建基于span进行内容管理的richeditor组件)。

### 创建基于属性字符串进行内容管理的RichEditor组件

使用RichEditor(options: [RichEditorStyledStringOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor#richeditorstyledstringoptions12))接口可以创建基于属性字符串（[StyledString/MutableStyledString](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-styled-string)）进行内容管理的RichEditor组件。这种构建方式开发者可以通过在应用侧持有属性字符串对象来管理数据，通过修改属性字符串对象的内容、样式，再传递给组件，即可实现对富文本组件内容的更新。

相比于使用controller提供的接口进行内容样式更新，使用起来更加灵活便捷。同时属性字符串对象可以设置到各类支持属性字符串的文本组件中，可以快速实现内容的迁移。

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. export struct CreateRichEditor {
4. // ...
5. fontStyle: TextStyle = new TextStyle({
6. fontColor: Color.Pink
7. })
8. // 定义字体样式对象
9. mutableStyledString: MutableStyledString =
10. // 请将$r('app.string.CreateRichEditor_Text_1')替换为实际资源文件，在本示例中该资源文件的value值为"创建使用属性字符串构建的RichEditor组件。"
11. new MutableStyledString(this.getUIContext().getHostContext()!.resourceManager.getStringSync($r('app.string.CreateRichEditor_Text_1').id),
12. [{
13. start: 0,
14. length: 5,
15. styledKey: StyledStringKey.FONT,
16. styledValue: this.fontStyle
17. }])
18. // 创建属性字符串

20. controller: RichEditorStyledStringController = new RichEditorStyledStringController();
21. options: RichEditorStyledStringOptions = { controller: this.controller };
22. build() {
23. NavDestination() {
24. Column({ space: 12 }) {
25. Column({ space: 3 }) {
26. // ...
27. RichEditor(this.options)
28. .onReady(() => {
29. this.controller.setStyledString(this.mutableStyledString);
30. })
31. }
32. // ...
33. }
34. .width('100%')
35. .height('100%')
36. .padding({ left: 12, right: 12 })
37. }
38. .backgroundColor('#f1f2f3')
39. // 请将$r('app.string.Create_RichEditor_Component_title')替换为实际资源文件，在本示例中该资源文件的value值为"创建RichEditor组件"
40. .title($r('app.string.Create_RichEditor_Component_title'))
41. }
42. }
```

[CreateRichEditor.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/richEditor/CreateRichEditor.ets#L26-L64)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/35/v3/8Eqd6mWsQAq2RuTS8sX8Sg/zh-cn_image_0000002540611458.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034933Z&HW-CC-Expire=86400&HW-CC-Sign=632300BEEA7FE008EEDD3D55C7D3E6D764862772D9EB8D55F2115C3CBCB98C18)

### 创建基于Span进行内容管理的RichEditor组件

使用RichEditor(value: [RichEditorOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor#richeditoroptions))接口可以创建基于Span进行内容管理的RichEditor组件，通常用于复杂内容场景，开发者通过RichEditorController提供的接口实现内容、样式的管理。

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. export struct CreateRichEditor {
4. controllerNoStyledString: RichEditorController = new RichEditorController();
5. optionsNoStyledString: RichEditorOptions = { controller: this.controllerNoStyledString };
6. // ...
7. build() {
8. NavDestination() {
9. Column({ space: 12 }) {
10. // ...
11. Column({ space: 3 }) {
12. // ...
13. RichEditor(this.optionsNoStyledString)
14. .onReady(() => {
15. this.controllerNoStyledString.addTextSpan(
16. /**
17. * 请将$r('app.string.CreateRichEditor_Text_2')替换为实际资源文件，
18. * 在本示例中该资源文件的value值为"创建不使用属性字符串构建的RichEditor组件。"
19. */
20. $r('app.string.CreateRichEditor_Text_2'), {
21. style: {
22. fontColor: Color.Black,
23. fontSize: 15
24. }
25. })
26. })
27. }
28. // ...
29. }
30. .width('100%')
31. .height('100%')
32. .padding({ left: 12, right: 12 })
33. }
34. .backgroundColor('#f1f2f3')
35. // 请将$r('app.string.Create_RichEditor_Component_title')替换为实际资源文件，在本示例中该资源文件的value值为"创建RichEditor组件"
36. .title($r('app.string.Create_RichEditor_Component_title'))
37. }
38. }
```

[CreateRichEditor.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/richEditor/CreateRichEditor.ets#L19-L109)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/19/v3/2-82imH-RH-jFwM0_Ny8ag/zh-cn_image_0000002571171453.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034933Z&HW-CC-Expire=86400&HW-CC-Sign=26F654668BB4DEB6F265F71ABD762E919FF6659684EAA72EF031E5DAA832D0DB)

## 添加内容

富文本组件可以通过不同的接口添加多种形式的内容。

### 添加文本内容

除了直接在组件内输入内容，也可以通过[addTextSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor#addtextspan)添加文本内容。

此接口可以实现文本样式多样化，例如创建混合样式文本。

如果组件是获焦状态并且光标在闪烁，那么通过addTextSpan添加文本内容后，光标位置会更新，在新添加文本内容的右侧闪烁。

收起

自动换行

深色代码主题

复制

```
1. controller: RichEditorController = new RichEditorController();
2. options: RichEditorOptions = { controller: this.controller };

4. build() {
5. // ...
6. Column({ space: 3 }) {
7. RichEditor(this.options)
8. .onReady(() => {
9. // 请将$r('app.string.AddTextContent_Text_1')替换为实际资源文件，在本示例中该资源文件的value值为"点击按钮在此处添加text。"
10. this.controller.addTextSpan($r('app.string.AddTextContent_Text_1'), {
11. style: {
12. fontColor: Color.Black,
13. fontSize: 15
14. }
15. })
16. })
17. .border({ width: 1, color: Color.Gray })
18. .constraintSize({
19. maxHeight: 100
20. })
21. .width(300)
22. .margin(10)
23. Row() {
24. // 请将$r('app.string.AddTextContent_Button_1')替换为实际资源文件，在本示例中该资源文件的value值为"addTextSpan"
25. Button($r('app.string.AddTextContent_Button_1'), {
26. buttonStyle: ButtonStyleMode.NORMAL
27. })
28. .height(30)
29. .fontSize(13)
30. .onClick(() => {
31. // 请将$r('app.string.AddTextContent_Text_2')替换为实际资源文件，在本示例中该资源文件的value值为"新添加一段文字。"
32. this.controller.addTextSpan($r('app.string.AddTextContent_Text_2'))
33. })
34. }.justifyContent(FlexAlign.Center).width('100%')
35. }
36. // ...
37. }
```

[AddTextContent.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/richEditor/AddTextContent.ets#L19-L71)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f2/v3/rCbhYCldROC0LEs82CLlaA/zh-cn_image_0000002540771112.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034933Z&HW-CC-Expire=86400&HW-CC-Sign=85B265AA14A52C3A4B3F92AFDE12BCD17DF437EDFCCAB8BE534E83FBB17367D3)

### 添加图片内容

通过[addImageSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor#addimagespan)添加图片内容。

此接口可用于内容丰富与可视化展示，例如在新闻中加入图片，在文档中加入数据可视化图形等。

如果组件是获焦状态并且光标在闪烁，那么通过addImageSpan添加图片内容后，光标位置会更新，在新添加图片内容的右侧闪烁。

收起

自动换行

深色代码主题

复制

```
1. controller: RichEditorController = new RichEditorController();
2. options: RichEditorOptions = { controller: this.controller };
3. build() {
4. // ...
5. Column({ space: 12 }) {
6. RichEditor(this.options)
7. .onReady(() => {
8. // 请将$r('app.string.AddImageContent_Text_1')替换为实际资源文件，在本示例中该资源文件的value值为"点击按钮在此处添加image。"
9. this.controller.addTextSpan($r('app.string.AddImageContent_Text_1'), {
10. style: {
11. fontColor: Color.Black,
12. fontSize: 15
13. }
14. })
15. })
16. .width(300)
17. .height(100)
18. Row() {
19. // 请将$r('app.string.AddImageContent_Button_1')替换为实际资源文件，在本示例中该资源文件的value值为"addImageSpan"
20. Button($r('app.string.AddImageContent_Button_1'), {
21. buttonStyle: ButtonStyleMode.NORMAL
22. })
23. .height(30)
24. .fontSize(13)
25. .onClick(() => {
26. // 请将$r('app.media.xxx')替换为实际资源文件
27. this.controller.addImageSpan($r('app.media.startIcon'), {
28. imageStyle: {
29. size: ['57px', '57px']
30. }
31. })
32. })
33. }.justifyContent(FlexAlign.Center).width('100%')
34. }
35. // ...
36. }
```

[AddImageContent.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/richEditor/AddImageContent.ets#L22-L58)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b7/v3/t5blTRpSQCuECSmQRl0LbA/zh-cn_image_0000002571291409.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034933Z&HW-CC-Expire=86400&HW-CC-Sign=BB3A4ED3D67CAEA4648FEA14ED813AC40A27CF2E7976087400E04903068154DF)

### 添加@Builder装饰器修饰的内容

通过[addBuilderSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor#addbuilderspan11)添加@Builder装饰器修饰的内容。

此接口可用于自定义复杂组件的嵌入，例如在组件内加入自定义图表。

该接口内可通过[RichEditorBuilderSpanOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor#richeditorbuilderspanoptions11)设置在组件中添加builder的位置，省略或者为异常值时，则添加builder到所有内容的最后位置。

收起

自动换行

深色代码主题

复制

```
1. controller: RichEditorController = new RichEditorController();
2. options: RichEditorOptions = { controller: this.controller };
3. private myBuilder: CustomBuilder = undefined;

5. @Builder
6. TextBuilder() {
7. Row() {
8. Image($r('app.media.startIcon')).width(50).height(50).margin(16)
9. Column() {
10. // 请将$r('app.string.AddBuilderDecoratorContent_Text_1')替换为实际资源文件，在本示例中该资源文件的value值为"文本文档.txt"
11. Text($r('app.string.AddBuilderDecoratorContent_Text_1')).fontWeight(FontWeight.Bold).fontSize(16)
12. // 请将$r('app.string.AddBuilderDecoratorContent_Text_2')替换为实际资源文件，在本示例中该资源文件的value值为"123.45KB"
13. Text($r('app.string.AddBuilderDecoratorContent_Text_2')).fontColor('#8a8a8a').fontSize(12)
14. }.alignItems(HorizontalAlign.Start)
15. }.backgroundColor('#f4f4f4')
16. .borderRadius('20')
17. .width(220)
18. }
19. build() {
20. // ...
21. Column({ space: 12 }) {
22. RichEditor(this.options)
23. .onReady(() => {
24. this.controller.addTextSpan(
25. /**
26. * 请将$r('app.string.AddBuilderDecoratorContent_Text_3')替换为实际资源文件，
27. * 在本示例中该资源文件的value值为"点击按钮在此处添加builderspan。"
28. */
29. $r('app.string.AddBuilderDecoratorContent_Text_3'), {
30. style: {
31. fontColor: Color.Black,
32. fontSize: 15
33. }
34. })
35. })
36. Row() {
37. /**
38. * 请将$r('app.string.AddBuilderDecoratorContent_Button_1')替换为实际资源文件，
39. * 在本示例中该资源文件的value值为"addBuilderSpan"
40. */
41. Button($r('app.string.AddBuilderDecoratorContent_Button_1'), {
42. buttonStyle: ButtonStyleMode.NORMAL
43. })
44. .height(30)
45. .fontSize(13)
46. .onClick(() => {
47. this.myBuilder = () => {
48. this.TextBuilder()
49. }
50. this.controller.addBuilderSpan(this.myBuilder)
51. })
52. }.justifyContent(FlexAlign.Center).width('100%')
53. }
54. // ...
55. }
```

[AddBuilderDecoratorContent.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/richEditor/AddBuilderDecoratorContent.ets#L22-L68)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2f/v3/3iM3CX-7RyuwXHGhaqsxBg/zh-cn_image_0000002540611460.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034933Z&HW-CC-Expire=86400&HW-CC-Sign=1AB0C13D153A51C92B51338BFA737E9D619D11797843E81864C028568C4D3F52)

### 添加SymbolSpan内容

可通过[addSymbolSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor#addsymbolspan11)添加Symbol内容。此接口可用于特殊符号的添加，例如在编辑学术论文时，此接口可用于添加各种数学符号。

添加Symbol内容时，如果组件是获焦状态并且光标在闪烁，那么添加Symbol后，光标将移动到新插入Symbol的右侧。

Symbol内容暂不支持手势、复制、拖拽处理。

收起

自动换行

深色代码主题

复制

```
1. controller: RichEditorController = new RichEditorController();
2. options: RichEditorOptions = { controller: this.controller };

4. build() {
5. // ...
6. Column({ space: 12 }) {
7. RichEditor(this.options)
8. .onReady(() => {
9. // 请将$r('app.string.AddSymbolSpanContent_Text_1')替换为实际资源文件，在本示例中该资源文件的value值为"点击按钮在此处添加symbol"
10. this.controller.addTextSpan($r('app.string.AddSymbolSpanContent_Text_1'), {
11. style: {
12. fontColor: Color.Black,
13. fontSize: 15
14. }
15. })
16. })
17. .width(300)
18. .height(100)
19. Row() {
20. // 请将$r('app.string.AddSymbolSpanContent_Button_1')替换为实际资源文件，在本示例中该资源文件的value值为"addSymbolSpan"
21. Button($r('app.string.AddSymbolSpanContent_Button_1'), {
22. buttonStyle: ButtonStyleMode.NORMAL
23. })
24. .height(30)
25. .fontSize(13)
26. .onClick(() => {
27. // 请将$r('sys.symbol.basketball_fill')替换为开发者所需的资源文件
28. this.controller.addSymbolSpan($r('sys.symbol.basketball_fill'), {
29. style: {
30. fontSize: 30
31. }
32. })
33. })
34. }.justifyContent(FlexAlign.Center).width('100%')
35. }
36. // ...
37. }
```

[AddSymbolSpanContent.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/richEditor/AddSymbolSpanContent.ets#L22-L58)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/62/v3/UdXyDN71TPSaZ-C4hXgZtQ/zh-cn_image_0000002571171455.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034933Z&HW-CC-Expire=86400&HW-CC-Sign=71E0438ABFA42F5E6BCDF824AA17914299C9C3664CD8011E7B41E4DD0BEB8DA1)

## 管理内容

富文本组件可以通过接口对内容进行管理，例如[获取组件内的图文信息](/consumer/cn/doc/harmonyos-guides/arkts-common-components-richeditor#获取组件内图文信息)、[设置无输入时的提示文本](/consumer/cn/doc/harmonyos-guides/arkts-common-components-richeditor#设置无输入时的提示文本)或[设置组件内容的最大字符数](/consumer/cn/doc/harmonyos-guides/arkts-common-components-richeditor#设置最大长度)。

### 获取组件内图文信息

可通过[getSpans](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor#getspans)获取组件内所有图文内容的信息，包括图文的内容、id、样式、位置等信息。获取内容位置信息后，可对指定范围内容进行样式的更新。

此接口适用于已有的内容样式获取与检查，例如在模板应用场景下，可利用此接口获取文本样式。此外，它还适用于内容解析与处理，例如在文本分析应用中，此接口能够获取特定范围内的文本信息。

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. export struct GetGraphicInfoInComponent {
4. controller: RichEditorController = new RichEditorController();
5. options: RichEditorOptions = { controller: this.controller };
6. infoShowController: RichEditorController = new RichEditorController();
7. infoShowOptions: RichEditorOptions = { controller: this.infoShowController };
8. // 创建两个富文本组件
9. build() {
10. // ...
11. Column({ space: 3 }) {
12. RichEditor(this.options)
13. .onReady(() => {
14. this.controller.addTextSpan(
15. // 请将$r('app.string.GetGraphicInfoInComponent_Text_1')替换为实际资源文件，在本示例中该资源文件的value值为"点击按钮获取此处span信息。"
16. $r('app.string.GetGraphicInfoInComponent_Text_1'), {
17. style: {
18. fontColor: Color.Black,
19. fontSize: 15
20. }
21. })
22. })
23. .width(300)
24. .height(50)
25. // 请将$r('app.string.GetGraphicInfoInComponent_Text_1')替换为实际资源文件，在本示例中该资源文件的value值为"点击按钮获取此处span信息。"
26. Text($r('app.string.GetGraphicInfoInComponent_Text_1')).fontSize(10).fontColor(Color.Gray).width(300);
27. RichEditor(this.infoShowOptions)
28. .width(300)
29. .height(50)
30. Row() {
31. // 请将$r('app.string.GetGraphicInfoInComponent_Button_1')替换为实际资源文件，在本示例中该资源文件的value值为"getSpans"
32. Button($r('app.string.GetGraphicInfoInComponent_Button_1'), {
33. buttonStyle: ButtonStyleMode.NORMAL
34. })
35. .height(30)
36. .fontSize(13)
37. .onClick(() => {
38. this.infoShowController.addTextSpan(JSON.stringify(this.controller.getSpans()), {
39. style: {
40. fontColor: Color.Gray,
41. fontSize: 10
42. }
43. })
44. })
45. }.justifyContent(FlexAlign.Center).width('100%')
46. }
47. // ...
48. }
49. }
```

[GetGraphicInfoInComponent.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/richEditor/GetGraphicInfoInComponent.ets#L22-L67)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f2/v3/DVzIgzcMSNikqxcLS9iBIQ/zh-cn_image_0000002540771114.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034933Z&HW-CC-Expire=86400&HW-CC-Sign=DD053C80ECA8168C44984065FD19381DD6DBBAF85BC98E6F0D52C149C35D0434)

### 设置无输入时的提示文本

通过[placeholder](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor#placeholder12)设置无输入时的提示文本。

例如，在用户登录界面采用提示文本，有助于用户区分用户名与密码的输入框。又如，在文本编辑框中，使用提示文本明确输入要求，如“限输入100字以内”，以此指导用户正确操作。

收起

自动换行

深色代码主题

复制

```
1. controller: RichEditorController = new RichEditorController();
2. options: RichEditorOptions = { controller: this.controller };

4. build() {
5. Column() {
6. // ...
7. RichEditor(this.options)
8. // 请将$r('app.string.SetAttributes_Text_6')替换为实际资源文件，在本示例中该资源文件的value值为"此处为提示文本..."
9. .placeholder(resource.resourceToString($r('app.string.SetAttributes_Text_6')), {
10. fontColor: Color.Gray,
11. font: {
12. size: 15,
13. weight: FontWeight.Normal,
14. family: 'HarmonyOS Sans',
15. style: FontStyle.Normal
16. }
17. })
18. .width(300)
19. .height(50)
20. // ...
21. }.alignItems(HorizontalAlign.Start)
22. .backgroundColor('#fff')
23. .borderRadius(12)
24. .padding(12)
25. .width('100%')
26. }
```

[SetAttributes.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/richEditor/SetAttributes.ets#L175-L200)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/16/v3/UPdq9l-wTjSSv4OfWesMyw/zh-cn_image_0000002571291411.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034933Z&HW-CC-Expire=86400&HW-CC-Sign=C6D4B6CD26C792D74E6A205A7FBC05DB32BF2B4E749F4DCFDDA81600FDBF6DD6)

### 设置最大长度

通过[maxLength](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor#maxlength18)可以设置富文本的最大可输入字符数。

收起

自动换行

深色代码主题

复制

```
1. controller: RichEditorController = new RichEditorController();
2. options: RichEditorOptions = { controller: this.controller };

4. build() {
5. Column() {
6. // ...
7. RichEditor(this.options)
8. // 请将$r('app.string.SetAttributes_Text_8')替换为实际资源文件，在本示例中该资源文件的value值为"组件设置了最大字符数：7"
9. .placeholder(resource.resourceToString($r('app.string.SetAttributes_Text_8')))
10. .maxLength(7)
11. // ...
12. }.alignItems(HorizontalAlign.Start)
13. .backgroundColor('#fff')
14. .borderRadius(12)
15. .padding(12)
16. .width('100%')
17. }
```

[SetAttributes.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/richEditor/SetAttributes.ets#L240-L256)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6b/v3/U5kCpylfT--QGi5HqfloQw/zh-cn_image_0000002540611462.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034933Z&HW-CC-Expire=86400&HW-CC-Sign=240B36D09C110A079FC7BA88C5DF3B243E4944321C0DC4D11AD6CD7F0B45BC47)

## 事件回调

开发者可以通过注册事件回调，感知组件事件的触发。

### 添加图文变化前和图文变化后可触发的回调

通过[onWillChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor#onwillchange12)添加图文变化前可触发的回调。此回调适用于用户实时数据校验与提醒，例如在用户输入文本时，可在回调内实现对输入内容的检测，若检测到敏感词汇，应立即弹出提示框。此外，它还适用于实时字数统计与限制，对于有字数限制的输入场景，可在回调中实时统计用户输入的字数，并在接近字数上限时提供相应的提示。

通过[onDidChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor#ondidchange12)添加图文变化后可触发的回调。此回调适用于内容保存与同步，例如在用户完成内容编辑后，可使用该回调自动将最新内容保存至本地或同步至服务器。此外，它还适用于内容状态更新与渲染，例如在待办事项列表应用中，用户编辑富文本格式的待办事项描述后，可使用该回调更新待办事项在列表中的显示样式。

使用[RichEditorStyledStringOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor#richeditorstyledstringoptions12)构建的RichEditor组件不支持上述两种回调。

收起

自动换行

深色代码主题

复制

```
1. controller: RichEditorController = new RichEditorController();
2. options: RichEditorOptions = { controller: this.controller };

4. infoShowController: RichEditorController = new RichEditorController();
5. infoShowOptions: RichEditorOptions = { controller: this.infoShowController };

7. build() {
8. Column() {
9. // ...
10. Column({ space: 3 }) {
11. RichEditor(this.options)
12. .onReady(() => {
13. // 请将$r('app.string.AddEvent_Text_5')替换为实际资源文件，在本示例中该资源文件的value值为"组件内图文变化前，触发回调。\n图文变化后，触发回调。"
14. this.controller.addTextSpan(resource.resourceToString($r('app.string.AddEvent_Text_5')), {
15. style: {
16. fontColor: Color.Black,
17. fontSize: 15
18. }
19. })
20. })
21. .onWillChange((value: RichEditorChangeValue) => {
22. // 请将$r('app.string.AddEvent_Text_6')替换为实际资源文件，在本示例中该资源文件的value值为"组件内图文变化前，触发回调：\"
23. this.infoShowController.addTextSpan(resource.resourceToString($r('app.string.AddEvent_Text_6')) +
24. JSON.stringify(value), {
25. style: {
26. fontColor: Color.Gray,
27. fontSize: 10
28. }
29. })
30. return true;
31. })
32. .onDidChange((rangeBefore: TextRange, rangeAfter: TextRange) => {
33. // 请将$r('app.string.AddEvent_Text_7')替换为实际资源文件，在本示例中该资源文件的value值为"\n图文变化后，触发回调：\n rangeBefore"
34. this.infoShowController.addTextSpan(resource.resourceToString($r('app.string.AddEvent_Text_7')) +
35. JSON.stringify(rangeBefore) + '\nrangeAfter: ' + JSON.stringify(rangeBefore), {
36. style: {
37. fontColor: Color.Gray,
38. fontSize: 10
39. }
40. })
41. })
42. .width(300)
43. .height(50);
44. // 请将$r('app.string.AddEvent_Text_4')替换为实际资源文件，在本示例中该资源文件的value值为"查看回调内容："
45. Text(resource.resourceToString($r('app.string.AddEvent_Text_4'))).fontSize(10).fontColor(Color.Gray).width(300);
46. RichEditor(this.infoShowOptions)
47. .width(300)
48. .height(70);
49. }
50. // ...
51. }.alignItems(HorizontalAlign.Start)
52. .backgroundColor('#fff')
53. .borderRadius(12)
54. .padding(12)
55. .width('100%')
56. }
```

[AddEvent.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/richEditor/AddEvent.ets#L100-L154)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2c/v3/5Iv92dLmStOJRIb0i5q78g/zh-cn_image_0000002571171457.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034933Z&HW-CC-Expire=86400&HW-CC-Sign=CE960BE1FFFA2630029C0748F6F906BD2D92C2B73D5D04264F06A96E5EE56492)

### 添加输入法输入内容前和完成输入后可触发的回调

添加输入法输入内容前和完成输入后可触发的回调。

在添加输入法输入内容前，可以通过[aboutToIMEInput](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor#abouttoimeinput)触发回调。在输入法完成输入后，可以通过[onDidIMEInput](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor#ondidimeinput12)触发回调。

这两种回调机制适用于文本上屏过程的业务逻辑处理。例如：在用户输入的文本上屏前，利用回调提供联想词汇，在用户完成输入后，执行自动化纠错或格式转换。两种回调的时序依次为：aboutToIMEInput、onDidIMEInput。

使用[RichEditorStyledStringOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor#richeditorstyledstringoptions12)构建的组件不支持上述两种回调功能。

收起

自动换行

深色代码主题

复制

```
1. controller: RichEditorController = new RichEditorController();
2. options: RichEditorOptions = { controller: this.controller };

4. infoShowController: RichEditorController = new RichEditorController();
5. infoShowOptions: RichEditorOptions = { controller: this.infoShowController };

7. build() {
8. Column() {
9. // ...
10. Column({ space: 3 }) {
11. // 请将$r('app.string.xxx')替换为开发者所需的资源文件
12. RichEditor(this.options)
13. .onReady(() => {
14. this.controller.addTextSpan(resource.resourceToString($r('app.string.AddEvent_Text_8')), {
15. style: {
16. fontColor: Color.Black,
17. fontSize: 15
18. }
19. })
20. })
21. .aboutToIMEInput((value: RichEditorInsertValue) => {
22. this.infoShowController.addTextSpan(resource.resourceToString($r('app.string.AddEvent_Text_9')) +
23. JSON.stringify(value), {
24. style: {
25. fontColor: Color.Gray,
26. fontSize: 10
27. }
28. })
29. return true;
30. })
31. .onDidIMEInput((value: TextRange) => {
32. this.infoShowController.addTextSpan(resource.resourceToString($r('app.string.AddEvent_Text_10')) +
33. JSON.stringify(value), {
34. style: {
35. fontColor: Color.Gray,
36. fontSize: 10
37. }
38. })
39. })
40. .width(300)
41. .height(50)
42. Text(resource.resourceToString($r('app.string.AddEvent_Text_4'))).fontSize(10).fontColor(Color.Gray).width(300)
43. RichEditor(this.infoShowOptions)
44. .width(300)
45. .height(70)

47. }
48. // ...
49. }
50. .alignItems(HorizontalAlign.Start)
51. .backgroundColor('#fff')
52. .borderRadius(12)
53. .padding(12)
54. .width('100%')
55. }
```

[AddEvent.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/richEditor/AddEvent.ets#L162-L213)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5c/v3/hMNrZwzvQ1a1fjjxcjMYlQ/zh-cn_image_0000002540771116.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034933Z&HW-CC-Expire=86400&HW-CC-Sign=AB07C67BFAC8FE1A088D198EE79E36B01D081BC11578D54107B29B90FD40ADE0)

### 添加完成粘贴前可触发的回调

通过[onPaste](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor#onpaste11)回调，来添加粘贴前要处理的流程。

此回调适用于内容格式的处理。例如，当用户复制包含HTML标签的文本时，可在回调中编写代码，将其转换为富文本组件所支持的格式，同时剔除不必要的标签或仅保留纯文本内容。

由于组件默认的粘贴行为仅限于纯文本，无法处理图片粘贴，开发者可利用此方法实现图文并茂的粘贴功能，从而替代组件原有的粘贴行为。

收起

自动换行

深色代码主题

复制

```
1. import { pasteboard } from '@kit.BasicServicesKit';
2. // ···
3. @Component
4. struct on_cut_copy_paste {
5. controller: RichEditorController = new RichEditorController();
6. options: RichEditorOptions = { controller: this.controller };
7. infoShowController: RichEditorController = new RichEditorController();
8. infoShowOptions: RichEditorOptions = { controller: this.infoShowController };

10. PopDataFromPasteboard() {
11. let selection = this.controller.getSelection();
12. let start = selection.selection[0];
13. let end = selection.selection[1];
14. if (start == end) {
15. start = this.controller.getCaretOffset();
16. end = this.controller.getCaretOffset();
17. }
18. let moveOffset = 0;
19. let sysBoard = pasteboard.getSystemPasteboard();
20. sysBoard.getData((err, data) => {
21. if (err) {
22. return;
23. }
24. if (start != end) {
25. this.controller.deleteSpans({ start: start, end: end });
26. }
27. let count = data.getRecordCount();
28. for (let i = 0; i < count; i++) {
29. const element = data.getRecord(i);
30. if (element && element.plainText && element.mimeType === pasteboard.MIMETYPE_TEXT_PLAIN) {
31. this.controller.addTextSpan(element.plainText,
32. {
33. style: { fontSize: 26, fontColor: Color.Red },
34. offset: start + moveOffset
35. }
36. )
37. moveOffset += element.plainText.length;
38. }
39. }
40. this.controller.setCaretOffset(start + moveOffset);
41. });
42. }

44. build() {
45. Column() {
46. // ...
47. Column({ space: 3 }) {
48. RichEditor(this.options)
49. .onReady(() => {
50. // 请将$r('app.string.AddEvent_Text_11')替换为实际资源文件，在本示例中该资源文件的value值为"对此处文本进行复制粘贴操作可触发对应回调。"
51. this.controller.addTextSpan(resource.resourceToString($r('app.string.AddEvent_Text_11')),
52. { style: { fontColor: Color.Black, fontSize: 15 } })
53. })
54. .onPaste((event) => {
55. // 请将$r('app.string.AddEvent_Text_12')替换为实际资源文件，在本示例中该资源文件的value值为"触发onPaste回调\n"
56. this.infoShowController.addTextSpan(resource.resourceToString($r('app.string.AddEvent_Text_12')),
57. { style: { fontColor: Color.Gray, fontSize: 10 } })
58. if (event != undefined && event.preventDefault) {
59. event.preventDefault();
60. }
61. this.PopDataFromPasteboard()
62. })
63. .width(300)
64. .height(50);
65. // 请将$r('app.string.AddEvent_Text_4')替换为实际资源文件，在本示例中该资源文件的value值为"查看回调内容："
66. Text(resource.resourceToString($r('app.string.AddEvent_Text_4'))).fontSize(10).fontColor(Color.Gray).width(300);
67. RichEditor(this.infoShowOptions)
68. .width(300)
69. .height(70);
70. }.width('100%').alignItems(HorizontalAlign.Start);
71. // ...
72. }.alignItems(HorizontalAlign.Start)
73. .backgroundColor('#fff')
74. .borderRadius(12)
75. .padding(12)
76. .width('100%')
77. }
78. }
```

[AddEvent.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/richEditor/AddEvent.ets#L17-L294)

### 添加完成剪切前可触发的回调

通过[onCut](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor#oncut12)回调，来添加剪切前要处理的流程。

此回调功能适用于数据处理与存储。例如，当用户从富文本组件中剪切内容时，可在回调中临时存储被剪切的内容，确保后续的粘贴操作能够准确无误地还原内容。

由于组件默认的剪切行为仅限于纯文本，无法处理图片剪切，开发者可利用此方法实现图文并茂的剪切功能，从而替代组件原有的剪切行为。

收起

自动换行

深色代码主题

复制

```
1. controller: RichEditorController = new RichEditorController();
2. options: RichEditorOptions = { controller: this.controller };

4. infoShowController: RichEditorController = new RichEditorController();
5. infoShowOptions: RichEditorOptions = { controller: this.infoShowController };

7. build() {
8. Column() {
9. // ...
10. Column({ space: 3 }) {
11. RichEditor(this.options)
12. .onReady(() => {
13. // 请将$r('app.string.AddEvent_Text_13')替换为实际资源文件，在本示例中该资源文件的value值为"对此处文本进行复制粘贴操作可触发对应回调。"
14. this.controller.addTextSpan(resource.resourceToString($r('app.string.AddEvent_Text_13')), {
15. style: {
16. fontColor: Color.Black,
17. fontSize: 15
18. }
19. })
20. })
21. .onCut(() => {
22. // 请将$r('app.string.AddEvent_Text_14')替换为实际资源文件，在本示例中该资源文件的value值为"触发onCut回调\n"
23. this.infoShowController.addTextSpan(resource.resourceToString($r('app.string.AddEvent_Text_14')), {
24. style: {
25. fontColor: Color.Gray,
26. fontSize: 10
27. }
28. })
29. })
30. .width(300)
31. .height(70)
32. RichEditor(this.infoShowOptions)
33. .width(300)
34. .height(70)
35. }
36. // ...
37. }.alignItems(HorizontalAlign.Start)
38. .backgroundColor('#fff')
39. .borderRadius(12)
40. .padding(12)
41. .width('100%')
42. }
```

[AddEvent.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/richEditor/AddEvent.ets#L298-L337)

### 添加完成复制前可触发的回调

通过[onCopy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor#oncopy12)回调，来添加复制前要处理的流程。

此回调适用于内容的备份与共享，例如在用户复制内容时，可在回调中执行以下操作：将复制的内容及其格式信息保存至本地备份文件夹，或自动生成一段包含复制内容及产品购买链接的分享文案，以方便用户进行粘贴和分享。

组件默认的复制行为仅限于纯文本，无法处理图片。开发者可利用此方法实现图文并茂的复制功能，替代组件的默认行为。

收起

自动换行

深色代码主题

复制

```
1. controller: RichEditorController = new RichEditorController();
2. options: RichEditorOptions = { controller: this.controller };

4. infoShowController: RichEditorController = new RichEditorController();
5. infoShowOptions: RichEditorOptions = { controller: this.infoShowController };

7. build() {
8. Column() {
9. // ...
10. Column({ space: 3 }) {
11. RichEditor(this.options)
12. .onReady(() => {
13. // 请将$r('app.string.AddEvent_Text_15')替换为实际资源文件，在本示例中该资源文件的value值为"对此处文本进行复制粘贴操作可触发对应回调。"
14. this.controller.addTextSpan(resource.resourceToString($r('app.string.AddEvent_Text_15')), {
15. style: {
16. fontColor: Color.Black,
17. fontSize: 15
18. }
19. })
20. })
21. .onCopy(() => {
22. // 请将$r('app.string.AddEvent_Text_16')替换为实际资源文件，在本示例中该资源文件的value值为"触发onCopy回调\n"
23. this.infoShowController.addTextSpan(resource.resourceToString($r('app.string.AddEvent_Text_16')), {
24. style: {
25. fontColor: Color.Gray,
26. fontSize: 10
27. }
28. })
29. })
30. .width(300)
31. .height(50)
32. RichEditor(this.infoShowOptions)
33. .width(300)
34. .height(70)
35. }
36. // ...
37. }.alignItems(HorizontalAlign.Start)
38. .backgroundColor('#fff')
39. .borderRadius(12)
40. .padding(12)
41. .width('100%')
42. }
```

[AddEvent.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/richEditor/AddEvent.ets#L346-L385)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ab/v3/3YIA5INXRbOW5mlMSjZHng/zh-cn_image_0000002571291413.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034933Z&HW-CC-Expire=86400&HW-CC-Sign=7F8B8A9B34C7E80FD5115C617A552B9BC5C2F914EA29A95EEC813617281DE903)

更多事件使用请参考[RichEditor事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor#事件)。

## 组件交互

可以通过接口配置交互元素属性，感知交互元素变化。

### 设置输入框光标和手柄的颜色

通过[caretColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor#caretcolor12)设置输入框光标和手柄的颜色。

设置不同颜色的光标和手柄可以提高视觉辨识度，特别是在包含多个输入区域的复杂界面中，独特的光标颜色能帮助快速定位当前操作的输入区域。这一特性也可以提升用户体验，使光标颜色与应用页面整体的风格相协调。

收起

自动换行

深色代码主题

复制

```
1. controller: RichEditorController = new RichEditorController();
2. options: RichEditorOptions = { controller: this.controller };

4. build() {
5. Column() {
6. // ...
7. RichEditor(this.options)
8. .onReady(() => {
9. // 请将$r('app.string.SetAttributes_Text_5')替换为实际资源文件，在本示例中该资源文件的value值为"组件设置了光标手柄颜色。"
10. this.controller.addTextSpan(resource.resourceToString($r('app.string.SetAttributes_Text_5')), {
11. style: {
12. fontColor: Color.Black,
13. fontSize: 15
14. }
15. })
16. })
17. .caretColor(Color.Orange)
18. .width(300)
19. .height(300)
20. // ...
21. }.alignItems(HorizontalAlign.Start)
22. .backgroundColor('#fff')
23. .borderRadius(12)
24. .padding(12)
25. .width('100%')
26. }
```

[SetAttributes.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/richEditor/SetAttributes.ets#L142-L167)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/97/v3/276Y2jNIS2iItQptQ52IPQ/zh-cn_image_0000002540611464.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034933Z&HW-CC-Expire=86400&HW-CC-Sign=509988AF2AEE1E8713341363B7685466ADB3CC756825D058A5C76FE5081AD5F2)

### 添加组件内容选择区域或编辑状态下光标位置改变时可触发的回调

通过[onSelectionChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor#onselectionchange12)来添加组件内容选择区域或编辑状态下光标位置改变时可触发的回调。

该回调可用于实时监听组件内容选中区域变化，例如实现实时更新工具栏状态（显示字体、段落格式等）、统计选中内容长度或生成选中内容摘要。实时响应选中状态，动态联动交互元素，提升富文本编辑的操作反馈体验和功能的灵活性。

收起

自动换行

深色代码主题

复制

```
1. controller: RichEditorController = new RichEditorController();
2. options: RichEditorOptions = { controller: this.controller };

4. infoShowController: RichEditorController = new RichEditorController();
5. infoShowOptions: RichEditorOptions = { controller: this.infoShowController };

7. build() {
8. Column() {
9. // ...
10. Column({ space: 3 }) {
11. // 请将$r('app.string.xxx')替换为实际资源文件
12. RichEditor(this.options)
13. .onReady(() => {
14. this.controller.addTextSpan(resource.resourceToString($r('app.string.AddEvent_Text_2')), {
15. style: {
16. fontColor: Color.Black,
17. fontSize: 15
18. }
19. })
20. })
21. .onSelectionChange((value: RichEditorRange) => {
22. this.infoShowController.addTextSpan('\n' + resource.resourceToString($r('app.string.AddEvent_Text_3')) +
23. value.start + ',' + value.end + ')', {
24. style: {
25. fontColor: Color.Gray,
26. fontSize: 10
27. }
28. })
29. })
30. .width(300)
31. .height(50)
32. Text(resource.resourceToString($r('app.string.AddEvent_Text_4'))).fontSize(10).fontColor(Color.Gray).width(300)
33. RichEditor(this.infoShowOptions)
34. .width(300)
35. .height(70)
36. }
37. // ...
38. }
39. }
```

[AddEvent.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/richEditor/AddEvent.ets#L51-L92)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d3/v3/LxuXRSTeRzuqO4dQFhXnsw/zh-cn_image_0000002571171459.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034933Z&HW-CC-Expire=86400&HW-CC-Sign=07BF950C8447EDFC397FD8A74333B6981EE7040C2E2D9FC434052A3270B5FB6F)

### 设置内容选中区范围

通过[setSelection](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor#setselection11)设置组件内的内容选中时部分背板高亮。

此接口可用于实现文本聚焦效果，例如当用户点击某个文本段落的标题或摘要时，可通过该接口自动选中并高亮出对应正文内容。

当组件内未获焦出现光标时，调用该接口不产生选中效果。

收起

自动换行

深色代码主题

复制

```
1. controller: RichEditorController = new RichEditorController();
2. options: RichEditorOptions = { controller: this.controller };

4. build() {
5. // ...
6. Column({ space: 12 }) {
7. RichEditor(this.options)
8. .onReady(() => {
9. // 请将$r('app.string.BackplaneHighlighting_Text_1')替换为实际资源文件，在本示例中该资源文件的value值为"点击按钮在此处选中0-2位置的文本。"
10. this.controller.addTextSpan($r('app.string.BackplaneHighlighting_Text_1'), {
11. style: {
12. fontColor: Color.Black,
13. fontSize: 15
14. }
15. })
16. })
17. .width(300)
18. .height(60)
19. Row() {
20. // 请将$r('app.string.BackplaneHighlighting_Button_1')替换为实际资源文件，在本示例中该资源文件的value值为"setSelection(0,2)"
21. Button($r('app.string.BackplaneHighlighting_Button_1'), {
22. buttonStyle: ButtonStyleMode.NORMAL
23. })
24. .height(30)
25. .fontSize(13)
26. .onClick(() => {
27. this.controller.setSelection(0, 2)
28. })
29. }.justifyContent(FlexAlign.Center).width('100%')
30. }
31. // ...
32. }
```

[BackplaneHighlighting.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/richEditor/BackplaneHighlighting.ets#L22-L54)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a5/v3/epyDZbtwTxKQNIiCpGFJGQ/zh-cn_image_0000002540771118.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034933Z&HW-CC-Expire=86400&HW-CC-Sign=CEAD88FD94BFBDC59A5D2DE2ED298B2E9482202C5F1B69E947DEE8EF6C1869AF)

## 菜单配置

通过接口可以对文本选择菜单进行配置。

### 管理选中菜单项

当富文本选择区域变化后显示菜单之前触发[onPrepareMenu](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#属性-1)回调，可在该回调中进行菜单数据设置。

收起

自动换行

深色代码主题

复制

```
1. @Component
2. struct PrepareMenu {
3. controller: RichEditorController = new RichEditorController();
4. options: RichEditorOptions = { controller: this.controller };
5. @State endIndex: number | undefined = 0;
6. onCreateMenu = (menuItems: Array<TextMenuItem>) => {
7. const idsToFilter = [
8. TextMenuItemId.TRANSLATE,
9. TextMenuItemId.SHARE,
10. TextMenuItemId.SEARCH,
11. TextMenuItemId.AI_WRITER
12. ]
13. const items = menuItems.filter(item => !idsToFilter.some(id => id.equals(item.id)));
14. // 请将$r('app.media.xxx')替换为实际资源文件
15. let item1: TextMenuItem = {
16. content: 'create1',
17. icon: $r('app.media.startIcon'),
18. id: TextMenuItemId.of('create1'),
19. }
20. let item2: TextMenuItem = {
21. content: 'create2',
22. id: TextMenuItemId.of('create2'),
23. icon: $r('app.media.startIcon'),
24. }
25. items.push(item1);
26. items.unshift(item2);
27. return items;
28. }

30. onMenuItemClick = (menuItem: TextMenuItem, textRange: TextRange) => {
31. if (menuItem.id.equals(TextMenuItemId.of('create2'))) {
32. return true;
33. }
34. if (menuItem.id.equals(TextMenuItemId.of('prepare1'))) {
35. return true;
36. }
37. if (menuItem.id.equals(TextMenuItemId.COPY)) {
38. return true;
39. }
40. if (menuItem.id.equals(TextMenuItemId.SELECT_ALL)) {
41. return false;
42. }
43. return false;
44. }

46. onPrepareMenu = (menuItems: Array<TextMenuItem>) => {
47. // 请将$r('app.media.xxx')替换为实际资源文件
48. let item1: TextMenuItem = {
49. content: 'prepare1_' + this.endIndex,
50. icon: $r('app.media.startIcon'),
51. id: TextMenuItemId.of('prepare1'),
52. };
53. menuItems.unshift(item1);
54. return menuItems;
55. }

57. @State editMenuOptions: EditMenuOptions = {
58. onCreateMenu: this.onCreateMenu,
59. onMenuItemClick: this.onMenuItemClick,
60. onPrepareMenu: this.onPrepareMenu
61. };

63. build() {
64. Column() {
65. // ...
66. RichEditor(this.options)
67. .onReady(() => {
68. this.controller.addTextSpan('RichEditor editMenuOptions');
69. })
70. .editMenuOptions(this.editMenuOptions)
71. .onSelectionChange((range: RichEditorRange) => {
72. this.endIndex = range.end;
73. })
74. .height(50)
75. .margin({ top: 100 })
76. .borderWidth(1)
77. .borderColor(Color.Red)
78. // ...
79. }.alignItems(HorizontalAlign.Start)
80. .backgroundColor('#fff')
81. .borderRadius(12)
82. .padding(12)
83. .width('100%')
84. }
85. }
```

[SetAttributes.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/richEditor/SetAttributes.ets#L469-L555)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/47/v3/uxyVKmWURiuTsiVaL5eQfA/zh-cn_image_0000002571291415.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034933Z&HW-CC-Expire=86400&HW-CC-Sign=0755BC20CDA8AF032E1EBE141A891D6994E1D837642603932651DDF204DA3811)

### 屏蔽系统服务类菜单项

通过[disableSystemServiceMenuItems](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-textmenucontroller#disablesystemservicemenuitems20)屏蔽富文本选择菜单内所有系统服务菜单项。

此接口保护内容安全，适用于限制文本操作的场景，例如展示保密内容或禁止复制的版权文本。屏蔽系统服务菜单项，防止用户通过系统服务菜单复制、分享文本，降低内容泄露风险。

收起

自动换行

深色代码主题

复制

```
1. import { TextMenuController } from '@kit.ArkUI';

3. @Entry
4. @Component
5. export struct DisableSystemServiceMenu {
6. controller: RichEditorController = new RichEditorController();
7. options: RichEditorOptions = { controller: this.controller };

9. aboutToAppear(): void {
10. // 禁用所有系统服务菜单
11. TextMenuController.disableSystemServiceMenuItems(true);
12. }

14. aboutToDisappear(): void {
15. // 页面消失恢复系统服务菜单
16. TextMenuController.disableSystemServiceMenuItems(false);
17. }

19. build() {
20. // ...
21. Column({ space: 12 }) {
22. RichEditor(this.options).onReady(() => {
23. // 请将$r('app.string.Demo_richEditor')替换为实际资源文件，在本示例中该资源文件的value值为"这是一个RichEditor"
24. this.controller.addTextSpan($r('app.string.Demo_richEditor'),
25. {
26. style:
27. {
28. fontSize: 30
29. }
30. })
31. })
32. .height(60)
33. .editMenuOptions({
34. onCreateMenu: (menuItems: Array<TextMenuItem>) => {
35. // menuItems不包含被屏蔽的系统菜单项
36. return menuItems;
37. },
38. onMenuItemClick: (menuItem: TextMenuItem, textRange: TextRange) => {
39. return false;
40. }
41. })
42. }
43. // ...
44. }
45. }
```

[DisableSystemServiceMenu.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/richEditor/DisableSystemServiceMenu.ets#L17-L73)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f8/v3/NISJ3ufwSyWelXTP1TFZWw/zh-cn_image_0000002540611466.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034933Z&HW-CC-Expire=86400&HW-CC-Sign=FDF3288F89517FE0A4247CE31BCECF6AF81EB1A366AB919ACAA8D9BA4593C57D)

通过[disableMenuItems](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-textmenucontroller#disablemenuitems20)可以屏蔽富文本选择菜单内指定的系统服务菜单项。

此接口可精确屏蔽指定的系统服务菜单项，保留应用所需的系统菜单功能，使菜单更贴合实际交互设计。

收起

自动换行

深色代码主题

复制

```
1. import { TextMenuController } from '@kit.ArkUI';

3. @Entry
4. @Component
5. export struct DisableMenuItem {
6. controller: RichEditorController = new RichEditorController();
7. options: RichEditorOptions = { controller: this.controller };

9. aboutToAppear(): void {
10. // 禁用搜索和翻译菜单
11. TextMenuController.disableMenuItems([TextMenuItemId.SEARCH, TextMenuItemId.TRANSLATE]);
12. }

14. aboutToDisappear(): void {
15. // 恢复系统服务菜单
16. TextMenuController.disableMenuItems([]);
17. }

19. build() {
20. // ...
21. Column({ space: 12 }) {
22. RichEditor(this.options)
23. .onReady(() => {
24. // 请将$r('app.string.Demo_richEditor')替换为实际资源文件，在本示例中该资源文件的value值为"这是一个RichEditor"
25. this.controller.addTextSpan($r('app.string.Demo_richEditor'), {
26. style: {
27. fontSize: 30
28. }
29. })
30. })
31. .height(60)
32. .editMenuOptions({
33. onCreateMenu: (menuItems: Array<TextMenuItem>) => {
34. // menuItems不包含搜索和翻译
35. return menuItems;
36. },
37. onMenuItemClick: (menuItem: TextMenuItem, textRange: TextRange) => {
38. return false;
39. }
40. })
41. }
42. // ...
43. }
44. }
```

[DisableMenuItem.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/richEditor/DisableMenuItem.ets#L17-L73)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ab/v3/r7yc9bRRRC6MTbnUD2qaog/zh-cn_image_0000002571171461.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034933Z&HW-CC-Expire=86400&HW-CC-Sign=93C8F05D7F09326B036BCAFFDA6232494738D948D7CCFF0AC4E190BCE2380738)

### 设置自定义选择菜单

通过[bindSelectionMenu](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor#bindselectionmenu)设置自定义选择菜单。

组件原本具有默认的文本选择菜单，包含复制、剪切和全选的功能。用户可使用该属性设定自定义菜单，例如翻译英文、加粗字体等丰富的菜单功能。

当自定义菜单超长时，建议内部嵌套Scroll组件使用，避免键盘被遮挡。

收起

自动换行

深色代码主题

复制

```
1. controller: RichEditorController = new RichEditorController();
2. options: RichEditorOptions = { controller: this.controller };
3. sliderShow: boolean = false;
4. private theme: SelectionMenuTheme = defaultTheme;

6. build() {
7. Column() {
8. // ...
9. RichEditor(this.options)
10. .onReady(() => {
11. // 请将$r('app.string.SetAttributes_Text_4')替换为实际资源文件，在本示例中该资源文件的value值为"组件设置了自定义菜单，长按可触发。"
12. this.controller.addTextSpan(resource.resourceToString($r('app.string.SetAttributes_Text_4')), {
13. style: {
14. fontColor: Color.Black,
15. fontSize: 18
16. }
17. })
18. })
19. .bindSelectionMenu(RichEditorSpanType.TEXT, this.SystemMenu, ResponseType.LongPress, {
20. onDisappear: () => {
21. this.sliderShow = false
22. }
23. })
24. // 绑定自定义菜单
25. .width(300)
26. .height(300)
27. // ...
28. }.alignItems(HorizontalAlign.Start)
29. .backgroundColor('#fff')
30. .borderRadius(12)
31. .padding(12)
32. .width('100%')
33. }

35. @Builder
36. SystemMenu() {
37. Column() {
38. Menu() {
39. if (this.controller) {
40. MenuItemGroup() {
41. MenuItem({
42. startIcon: this.theme.cutIcon,
43. // 请将$r('app.string.SetAttributes_Text_1')替换为实际资源文件，在本示例中该资源文件的value值为"剪切"
44. content: resource.resourceToString($r('app.string.SetAttributes_Text_1')),
45. labelInfo: 'Ctrl+X'
46. })
47. MenuItem({
48. startIcon: this.theme.copyIcon,
49. // 请将$r('app.string.SetAttributes_Text_2')替换为实际资源文件，在本示例中该资源文件的value值为"复制"
50. content: resource.resourceToString($r('app.string.SetAttributes_Text_2')),
51. labelInfo: 'Ctrl+C'
52. })
53. MenuItem({
54. startIcon: this.theme.pasteIcon,
55. // 请将$r('app.string.SetAttributes_Text_3')替换为实际资源文件，在本示例中该资源文件的value值为"粘贴"
56. content: resource.resourceToString($r('app.string.SetAttributes_Text_3')),
57. labelInfo: 'Ctrl+V'
58. })
59. }
60. }
61. }
62. .radius(this.theme.containerBorderRadius)
63. .clip(true)
64. .backgroundColor(Color.White)
65. .width(this.theme.defaultMenuWidth)
66. }
67. .width(this.theme.defaultMenuWidth)
68. }
```

[SetAttributes.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/richEditor/SetAttributes.ets#L71-L137)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/95/v3/uWGHpl7sTc-nBTgijYBTBw/zh-cn_image_0000002540771120.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034933Z&HW-CC-Expire=86400&HW-CC-Sign=8F6A6134892EFD39EC14DD1E09150B0C84D73C75F86AE56FF47B5469ACC5BE82)

## 布局配置

组件支持通过接口配置布局规则，开发者可以根据业务场景定制合适的布局规则。

### 设置最大行数

通过[maxLines](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor#maxlines18)可以设置富文本组件内可显示文本的最大行数。

此接口控制组件内文本的显示范围，防止文本过长影响页面布局，确保不同设备和场景下的文本显示效果一致，提升界面兼容性和美观度。

收起

自动换行

深色代码主题

复制

```
1. controller: RichEditorController = new RichEditorController();
2. options: RichEditorOptions = { controller: this.controller };

4. build() {
5. Column() {
6. // ...
7. /**
8. * 请将$r('app.string.SetAttributes_Text_7')替换为实际资源文件，
9. * 在本示例中该资源文件的value值为"组件设置了最大行数\n超出内容将会以滚动显示\n超出1行\n超出2行\n超出3行\n超出4行"
10. */
11. RichEditor(this.options)
12. .onReady(() => {
13. this.controller.addTextSpan(resource.resourceToString($r('app.string.SetAttributes_Text_7')),
14. {
15. style: {
16. fontColor: Color.Black,
17. fontSize: 15
18. }
19. })
20. })
21. .maxLines(2)
22. // ...
23. }.alignItems(HorizontalAlign.Start)
24. .backgroundColor('#fff')
25. .borderRadius(12)
26. .padding(12)
27. .width('100%')
28. }
```

[SetAttributes.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/richEditor/SetAttributes.ets#L208-L232)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9a/v3/BuZfqsxISAOUZSi4gkbcVA/zh-cn_image_0000002571291417.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034933Z&HW-CC-Expire=86400&HW-CC-Sign=265F4B85A2A5ADF231DD3E0898413C33E1A109F1BB45336270CDA12137C5D184)

## 样式设置

组件支持对内容设置复杂的样式。

### 设置用户预设的文本样式

通过[setTypingStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor#settypingstyle11)可以设置用户预设的文本样式。

此接口可用于个性化的写作体验，例如可以使用此接口让输入的不同层级标题自动应用相应格式（如一级、二级标题）。

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. export struct SetUserPresetTextStyles {

5. controller: RichEditorController = new RichEditorController();
6. options: RichEditorOptions = { controller: this.controller };

8. build() {
9. // ...
10. Column({ space: 12 }) {
11. RichEditor(this.options)
12. .onReady(() => {
13. // 请将$r('app.string.SetUserPresetTextStyles_Text_1')替换为实际资源文件，在本示例中该资源文件的value值为"点击按钮，改变预设文本样式。"
14. this.controller.addTextSpan($r('app.string.SetUserPresetTextStyles_Text_1'),
15. {
16. style: {
17. fontColor: Color.Black,
18. fontSize: 15
19. }
20. })
21. })
22. .width(300)
23. .height(60)
24. Row() {
25. // 请将$r('app.string.SetUserPresetTextStyles_Button_1')替换为实际资源文件，在本示例中该资源文件的value值为"setTypingStyle"
26. Button($r('app.string.SetUserPresetTextStyles_Button_1'), {
27. buttonStyle: ButtonStyleMode.NORMAL
28. })
29. .height(30)
30. .fontSize(13)
31. .onClick(() => {
32. this.controller.setTypingStyle({
33. fontWeight: 'medium',
34. fontColor: Color.Pink,
35. fontSize: 15,
36. fontStyle: FontStyle.Italic,
37. decoration: {
38. type: TextDecorationType.Underline,
39. color: Color.Gray
40. }
41. })
42. })
43. }.justifyContent(FlexAlign.Center).width('100%')
44. }
45. // ...
46. }
47. }
```

[SetUserPresetTextStyles.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/richEditor/SetUserPresetTextStyles.ets#L22-L64)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b7/v3/JPblQssUTpC0Lm945eBizA/zh-cn_image_0000002540611468.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034933Z&HW-CC-Expire=86400&HW-CC-Sign=2FDC9FF2DBDF690E444A8B78730A6BCF570CA1F197DC8C485B7895977FB8B81C)

### 设置装饰线

通过[decoration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-span#decoration)设置富文本组件中文本装饰线的样式、颜色和粗细。

设置文本装饰线可突出关键信息、区分文本状态、增强视觉层次。例如，为重要标题或关键词添加装饰线，帮助用户快速获取信息。

收起

自动换行

深色代码主题

复制

```
1. controller: RichEditorController = new RichEditorController();
2. options: RichEditorOptions = { controller: this.controller };

4. build() {
5. Column() {
6. // ...
7. RichEditor(this.options)
8. .onReady(() => {
9. // 请将$r('app.string.Demo_oneText')替换为实际资源文件，在本示例中该资源文件的value值为"一段预置的文本"
10. this.controller.addTextSpan($r('app.string.Demo_oneText'), {
11. style: {
12. fontSize: 25,
13. decoration: {
14. type: TextDecorationType.LineThrough,
15. color: Color.Blue,
16. // 设置装饰线粗细比例为6
17. thicknessScale: 6
18. }
19. }
20. })
21. })
22. // ...
23. }.alignItems(HorizontalAlign.Start)
24. .backgroundColor('#fff')
25. .borderRadius(12)
26. .padding(12)
27. .width('100%')
28. }
```

[SetAttributes.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/richEditor/SetAttributes.ets#L290-L317)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/97/v3/CVej3vv2Q-qKPHmF8ViGZw/zh-cn_image_0000002571171463.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T034933Z&HW-CC-Expire=86400&HW-CC-Sign=6E6DF973BD727F3AD49B1D3163A72636AA36DA41E00E208D183A12E932E3D909)

通过[DecorationOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#decorationoptions20)中的enableMultiType设置多装饰线，比如同时设置下划线和中划线。

此接口适用于复杂业务场景，满足文本装饰的多样化需求。在文档协作过程中，多人编辑时，可以通过使用不同的装饰线组合来区分文本状态，从而提高协作效率。

收起

自动换行

深色代码主题

复制

```
1. RichEditor({ controller: this.styledStringController });
2. // 请将$r('app.string.Demo_SetStyledStringButton')替换为实际资源文件，在本示例中该资源文件的value值为"多装饰线文本"
3. Button($r('app.string.Demo_SetStyledStringButton'))
4. .fontSize(20)
5. .onClick(() => {
6. let mutString: MutableStyledString = new MutableStyledString(
7. // 请将$r('app.string.Demo_styledString')替换为实际资源文件，在本示例中该资源文件的value值为"需设置富文本多装饰线"
8. resource.resourceToString($r('app.string.Demo_styledString')), [
9. {
10. start: 0,
11. length: 9,
12. styledKey: StyledStringKey.FONT,
13. styledValue: new TextStyle({ fontSize: LengthMetrics.vp(25) })
14. },
15. {
16. start: 0,
17. length: 5,
18. styledKey: StyledStringKey.DECORATION,
19. styledValue: new DecorationStyle(
20. {
21. type: TextDecorationType.Underline,
22. },
23. {
24. // 开启多装饰线
25. enableMultiType: true
26. })
27. },
28. {
29. start: 2,
30. length: 4,
31. styledKey: StyledStringKey.DECORATION,
32. styledValue: new DecorationStyle(
33. {
34. type: TextDecorationType.LineThrough,
35. },
36. {
37. // 开启多装饰线
38. enableMultiType: true
39. })
40. }
41. ])
42. this.styledStringController.setStyledString(mutString);
43. })
```

[SetAttributes.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/richEditor/SetAttributes.ets#L334-L378)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b4/v3/SDcJoJr1TQmd0jzzAbpgEA/zh-cn_image_0000002540771122.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T034933Z&HW-CC-Expire=86400&HW-CC-Sign=561B5B7AA51C2337DFFEA08BD07C773824F988AAF8348DA243F1FF5D4585952A)

### 设置垂直居中

通过[textVerticalAlign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textverticalalign20)设置文本段落在垂直方向的对齐方式。

此接口优化多元素排版，使组件内容与图片、图标等在垂直方向对齐时，整体布局更协调。

收起

自动换行

深色代码主题

复制

```
1. controller: RichEditorController = new RichEditorController();
2. options: RichEditorOptions = { controller: this.controller };

4. build() {
5. Column() {
6. // ...
7. RichEditor(this.options)
8. .onReady(() => {
9. // 请将$r('app.media.startIcon')替换为实际资源文件
10. this.controller.addImageSpan($r('app.media.startIcon'), {
11. imageStyle: {
12. size: [100, 100]
13. }
14. })
15. // 请将$r('app.string.Demo_verticalAlignString')替换为实际资源文件，在本示例中该资源文件的value值为"这是一段富文本，展示了文本垂直居中的效果。"
16. this.controller.addTextSpan($r('app.string.Demo_verticalAlignString'), {
17. style: {
18. fontColor: Color.Pink,
19. fontSize: '32'
20. },
21. paragraphStyle: {
22. textAlign: TextAlign.Start,
23. textVerticalAlign: TextVerticalAlign.CENTER,
24. leadingMargin: 16
25. }
26. })
27. })
28. // ...
29. }.alignItems(HorizontalAlign.Start)
30. .backgroundColor('#fff')
31. .borderRadius(12)
32. .padding(12)
33. .width('100%')
34. }
```

[SetAttributes.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/richEditor/SetAttributes.ets#L387-L420)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8e/v3/Q0NhphSPSym42dNIK1xIRA/zh-cn_image_0000002571291419.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T034933Z&HW-CC-Expire=86400&HW-CC-Sign=D1CF4226D420DD1CB9E4C045BC872B91DB654328B8E97569A3536F311FD2CB30)

### 设置中西文自动间距

通过[enableAutoSpacing](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor#enableautospacing20)设置是否开启中文与西文的自动间距。

此接口优化文本排版，提升组件内文本的可读性。设置自动间距后，中文与西文间产生适当空隙，便于区分不同语种，减少视觉干扰。

收起

自动换行

深色代码主题

复制

```
1. @Component
2. struct EnableAutoSpacing {
3. controller: RichEditorController = new RichEditorController();
4. options: RichEditorOptions = { controller: this.controller };
5. @State
6. enableAutoSpace:boolean = false;

8. build() {
9. Column() {
10. // ...
11. Column({ space: 3 }) {
12. RichEditor(this.options)
13. .onReady(() => {
14. // 请将$r('app.string.Demo_autoSpacingString')替换为实际资源文件，在本示例中该资源文件的value值为"中西文Auto Spacing自动间距"
15. this.controller.addTextSpan($r('app.string.Demo_autoSpacingString'),
16. {
17. style:
18. {
19. fontColor: Color.Orange,
20. fontSize: 20
21. }
22. })
23. })
24. .enableAutoSpacing(this.enableAutoSpace)
25. // 请将$r('app.string.Demo_autoSpacingButton')替换为实际资源文件，在本示例中该资源文件的value值为"开启中西文自动间距"
26. Button($r('app.string.Demo_autoSpacingButton'))
27. .fontSize(20)
28. .onClick(() => {
29. this.enableAutoSpace = true;
30. })
31. }
32. // ...
33. }.alignItems(HorizontalAlign.Start)
34. .backgroundColor('#fff')
35. .borderRadius(12)
36. .padding(12)
37. .width('100%')
38. }
39. }
```

[SetAttributes.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/richEditor/SetAttributes.ets#L429-L457)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a/v3/WyStSqQGQIuIeYfq2HNevQ/zh-cn_image_0000002540611470.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034933Z&HW-CC-Expire=86400&HW-CC-Sign=326C5C47781F9C05885B018C52B847BDF9DC034325EF14D33517427658E426D1)

## 示例代码

* [内容发布器](https://gitcode.com/HarmonyOS_Samples/content-publisher)