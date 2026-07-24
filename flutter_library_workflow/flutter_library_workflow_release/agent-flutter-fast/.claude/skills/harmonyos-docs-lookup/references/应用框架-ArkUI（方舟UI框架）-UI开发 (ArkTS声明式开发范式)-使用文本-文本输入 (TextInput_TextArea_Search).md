TextInput、TextArea是输入框组件，用于响应用户输入，比如评论区的输入、聊天框的输入、表格的输入等，也可以结合其它组件构建功能页面，例如登录注册页面。具体用法请参考[TextInput](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-textinput)和[TextArea](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-textarea)组件的API文档。Search是特殊的输入框组件，称为搜索框，默认样式包含搜索图标。具体用法请参考[Search](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-search)组件的API文档。

说明

仅支持单文本样式，若需实现富文本样式，建议使用[RichEditor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor)组件。

## 创建输入框

TextInput是单行输入框，TextArea是多行输入框，Search是搜索框。通过以下接口创建这些组件。

收起

自动换行

深色代码主题

复制

```
1. TextInput(value?:{placeholder?: ResourceStr, text?: ResourceStr, controller?: TextInputController})
```

收起

自动换行

深色代码主题

复制

```
1. TextArea(value?:{placeholder?: ResourceStr, text?: ResourceStr, controller?: TextAreaController})
```

收起

自动换行

深色代码主题

复制

```
1. Search(options?:{placeholder?: ResourceStr, value?: ResourceStr, controller?: SearchController, icon?: string})
```

* 单行输入框。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. TextInput()
  ```

  [CreatTextInput.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/textInput/CreatTextInput.ets#L25-L27)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2d/v3/Nz-kGxvIQoar1ACQ8tLAfg/zh-cn_image_0000002540611444.png?HW-CC-KV=V1&HW-CC-Date=20260414T034930Z&HW-CC-Expire=86400&HW-CC-Sign=F25B3BBE3C9BC5516EF80303C24C90A9A146A0D6BAD1558E0C0E223550D58548)
* 多行输入框。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. TextArea()
  ```

  [CreatTextInput.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/textInput/CreatTextInput.ets#L35-L37)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/db/v3/_WUO-7oyQSeFvetgUGf-JA/zh-cn_image_0000002571171439.png?HW-CC-KV=V1&HW-CC-Date=20260414T034930Z&HW-CC-Expire=86400&HW-CC-Sign=E50E033A641A6B66D7DAA343F664FFBBF2E141857F7DDE54530AB4E8A6495252)
* 多行输入框文字超出一行时会自动折行。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. /* 请将$r('app.string.CreatTextInput_textContent')替换为实际资源文件，在本示例中该资源文件的value值为
  2. * "我是TextArea我是TextArea我是TextArea我是TextArea"
  3. */
  4. TextArea({ text: $r('app.string.CreatTextInput_textContent') })
  5. .width(300)
  ```

  [CreatTextInput.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/textInput/CreatTextInput.ets#L38-L42)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/93/v3/TswLmx44TEqBlL-IaGUasw/zh-cn_image_0000002540771096.png?HW-CC-KV=V1&HW-CC-Date=20260414T034930Z&HW-CC-Expire=86400&HW-CC-Sign=BC84BB9DFF87C24CED406F072DBE87DF0969CFE9B99C517BE201B57E3ACAEF5D)
* 搜索框。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Search()
  2. // 请将$r('app.string.Creat_TextInput_Content')替换为实际资源文件，在本示例中该资源文件的value值为"搜索"
  3. .searchButton($r('app.string.Creat_TextInput_Content'))
  ```

  [CreatTextInput.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/textInput/CreatTextInput.ets#L47-L51)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b7/v3/7R_m8eoPRgOfQFsCdocHRQ/zh-cn_image_0000002571291395.png?HW-CC-KV=V1&HW-CC-Date=20260414T034930Z&HW-CC-Expire=86400&HW-CC-Sign=8595C7F21C0539A2657298A314F3B6070F180B0AF7E0C2CCBE2301EFAFA3E85C)

## 设置输入框类型

TextInput、TextArea和Search都支持设置输入框类型，通过type属性进行设置，但是各组件的枚举值略有不同。下面以单行输入框为例进行说明。

TextInput有以下类型可选择：Normal基本输入模式、Password密码输入模式、Email邮箱地址输入模式、Number纯数字输入模式、PhoneNumber电话号码输入模式、USER\_NAME用户名输入模式、NEW\_PASSWORD新密码输入模式、NUMBER\_PASSWORD纯数字密码输入模式、NUMBER\_DECIMAL带小数点的数字输入模式、带URL的输入模式。通过[type](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-textinput#type)属性进行设置：

### 基本输入模式（默认类型）

收起

自动换行

深色代码主题

复制

```
1. TextInput()
2. .type(InputType.Normal)
```

[SetTextInputType.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/textInput/SetTextInputType.ets#L27-L30)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/87/v3/q11R2WznRDGwnTWWJt-8qA/zh-cn_image_0000002540611446.png?HW-CC-KV=V1&HW-CC-Date=20260414T034930Z&HW-CC-Expire=86400&HW-CC-Sign=3E1868DFC9D814FEB6B74CE32FC603745565E6AD8586AC5508CE3D2AB96301C9)

### 密码模式

包括Password密码输入模式、NUMBER\_PASSWORD纯数字密码模式、NEW\_PASSWORD新密码输入模式。

以下示例是Password密码输入模式的输入框。

收起

自动换行

深色代码主题

复制

```
1. TextInput()
2. .type(InputType.Password)
```

[SetTextInputType.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/textInput/SetTextInputType.ets#L36-L39)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/98/v3/uO3NaZp3QMyJMDVx9SCbOw/zh-cn_image_0000002571171441.png?HW-CC-KV=V1&HW-CC-Date=20260414T034930Z&HW-CC-Expire=86400&HW-CC-Sign=F033337EC41BA0E945597EC9DC409E890E14AFE1333529BC11245D9569794C4D)

### 邮箱地址输入模式

邮箱地址输入模式的输入框，只能存在一个@符号。

收起

自动换行

深色代码主题

复制

```
1. TextInput()
2. .type(InputType.Email)
```

[SetTextInputType.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/textInput/SetTextInputType.ets#L45-L48)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f9/v3/Hyoc2rQFSxmO2CNWDTN0UA/zh-cn_image_0000002540771098.png?HW-CC-KV=V1&HW-CC-Date=20260414T034930Z&HW-CC-Expire=86400&HW-CC-Sign=9226FC84842D211D008C46B2D6B9F487AE444C709FFF7EAAA82F9E724AEB76DB)

### 纯数字输入模式

纯数字输入模式的输入框，只能输入数字[0-9]。

收起

自动换行

深色代码主题

复制

```
1. TextInput()
2. .type(InputType.Number)
```

[SetTextInputType.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/textInput/SetTextInputType.ets#L54-L57)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/59/v3/EJ_kHuTiRUuZLj0A88qrCQ/zh-cn_image_0000002571291397.png?HW-CC-KV=V1&HW-CC-Date=20260414T034930Z&HW-CC-Expire=86400&HW-CC-Sign=A263642DA37B3ED0C1E88FA574CE2F566A4E28D2FCD37A9BB84FEBFB2A620DCD)

### 电话号码输入模式

电话号码输入模式的输入框，支持输入数字、空格、+ 、-、\*、#、(、)，长度不限。

收起

自动换行

深色代码主题

复制

```
1. TextInput()
2. .type(InputType.PhoneNumber)
```

[SetTextInputType.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/textInput/SetTextInputType.ets#L63-L66)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/63/v3/WLES8R_iQHmA7l7i1ald5w/zh-cn_image_0000002540611448.png?HW-CC-KV=V1&HW-CC-Date=20260414T034930Z&HW-CC-Expire=86400&HW-CC-Sign=5CA2880A0E35DF0B6AF3B66DBA96381C6B97F1320E32D70943CBEA241E0A539F)

### 带小数点的数字输入模式

带小数点的数字输入模式的输入框，只能输入数字[0-9]和小数点，只能存在一个小数点。

收起

自动换行

深色代码主题

复制

```
1. TextInput()
2. .type(InputType.NUMBER_DECIMAL)
```

[SetTextInputType.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/textInput/SetTextInputType.ets#L72-L75)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1f/v3/gK1orhyLRSGL-oErZlrEmg/zh-cn_image_0000002571171443.png?HW-CC-KV=V1&HW-CC-Date=20260414T034930Z&HW-CC-Expire=86400&HW-CC-Sign=B3D1D277BDD8C9D9F017196D161C888D76D4EC2BE3E66996F2908A488E98C09C)

### 带URL的输入模式

带URL的输入模式，无特殊限制。

收起

自动换行

深色代码主题

复制

```
1. TextInput()
2. .type(InputType.URL)
```

[SetTextInputType.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/textInput/SetTextInputType.ets#L81-L84)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/79/v3/0UDSkrrGS_qLDlbspY0cDQ/zh-cn_image_0000002540771100.png?HW-CC-KV=V1&HW-CC-Date=20260414T034930Z&HW-CC-Expire=86400&HW-CC-Sign=2F427E168EC5BD849C3144C7DCE54F1B558126CA6BCE9D9FEB732AE40EED8D65)

## 设置输入框多态样式

TextInput、TextArea支持设置输入框多态样式，通过[style](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-textarea#style10)属性进行设置。下面以多行输入框TextArea为例进行说明。

TextArea有以下2种类型可选择：默认风格，入参是TextContentStyle.DEFAULT；内联模式，也称内联输入风格，入参是TextContentStyle.INLINE。

### 默认风格

默认风格的输入框，在编辑态和非编辑态，样式没有区别。

收起

自动换行

深色代码主题

复制

```
1. TextArea()
2. .style(TextContentStyle.DEFAULT)
```

[SetInputMultiTypeStyle.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/textInput/SetInputMultiTypeStyle.ets#L25-L28)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5a/v3/l7w4-M7CTWCZrQt_MURBmw/zh-cn_image_0000002571291399.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034930Z&HW-CC-Expire=86400&HW-CC-Sign=0B355150C2D5343686E32DFF4A610D19924065A53D94558F3D129191F0CE7E7C)

### 内联模式

内联模式，也称内联输入风格。内联模式的输入框在编辑态和非编辑态样式有明显区分。

收起

自动换行

深色代码主题

复制

```
1. TextArea()
2. .style(TextContentStyle.INLINE)
```

[SetInputMultiTypeStyle.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/textInput/SetInputMultiTypeStyle.ets#L32-L35)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/22/v3/v6FIg5ZbSPGfA3SiIzBmHQ/zh-cn_image_0000002540611450.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034930Z&HW-CC-Expire=86400&HW-CC-Sign=5E98113E0A982F4B41E91653BAC1515119E601B7FE5B349591D75869ED24DA07)

## 自定义样式

* 设置无输入时的提示文本。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // 请将$r('app.string.i_am_placeholder')替换为实际资源文件，在本示例中该资源文件的value值为"我是提示文本"
  2. TextInput({ placeholder: $r('app.string.i_am_placeholder') })
  ```

  [CustomTextInputStyle.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/textInput/CustomTextInputStyle.ets#L25-L28)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/26/v3/RR0GGYQyT328p-tQuRqTqg/zh-cn_image_0000002571171445.png?HW-CC-KV=V1&HW-CC-Date=20260414T034930Z&HW-CC-Expire=86400&HW-CC-Sign=75354DCEF9F63466CEECCE62D572F84ECAE666A3C0F61838BDFFE44BDCA93AE0)
* 设置输入框当前的文本内容。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. TextInput({
  2. // 请将$r('app.string.i_am_placeholder')替换为实际资源文件，在本示例中该资源文件的value值为"我是提示文本"
  3. placeholder: $r('app.string.i_am_placeholder'),
  4. // 请将$r('app.string.i_am_current_text_content')替换为实际资源文件，在本示例中该资源文件的value值为"我是当前文本内容"
  5. text: $r('app.string.i_am_current_text_content')
  6. })
  ```

  [CustomTextInputStyle.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/textInput/CustomTextInputStyle.ets#L32-L39)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/59/v3/1d6glu-NTcahDeHM6Hz3sw/zh-cn_image_0000002540771102.png?HW-CC-KV=V1&HW-CC-Date=20260414T034930Z&HW-CC-Expire=86400&HW-CC-Sign=99949FCE7168D1F374E9362D6C5A6412933D4B6BE76B12C55CC3D52422BCF3CE)
* 添加backgroundColor改变输入框的背景颜色。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. TextInput({
  2. // 请将$r('app.string.i_am_placeholder')替换为实际资源文件，在本示例中该资源文件的value值为"我是提示文本"
  3. placeholder: $r('app.string.i_am_placeholder'),
  4. // 请将$r('app.string.i_am_current_text_content')替换为实际资源文件，在本示例中该资源文件的value值为"我是当前文本内容"
  5. text: $r('app.string.i_am_current_text_content')
  6. })
  7. .backgroundColor(Color.Pink)
  ```

  [CustomTextInputStyle.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/textInput/CustomTextInputStyle.ets#L43-L51)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e7/v3/ISv5i6fnQYm_sZ7XJzSWNA/zh-cn_image_0000002571291401.png?HW-CC-KV=V1&HW-CC-Date=20260414T034930Z&HW-CC-Expire=86400&HW-CC-Sign=E4F50397DC94DA9E6A239F629269DC0BAFB7F2C3C47768BB20817C9B87FB9259)

  更丰富的样式可以结合[通用属性](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-component-general-attributes)实现。

## 添加事件

文本框主要用于获取用户输入的信息，并将信息处理成数据进行上传，绑定[onChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-textinput#onchange)事件可以获取输入框内改变的文本内容，绑定[onSubmit](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-textinput#onsubmit)事件可以获取回车提交的文本信息，绑定[onTextSelectionChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-textinput#ontextselectionchange10)事件可以获取文本选中时手柄的位置信息或者编辑时光标的位置信息等等。用户也可以使用通用事件进行相应的交互操作。

说明

在密码模式下，设置[showPassword](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-textinput#showpassword12)属性时，在[onSecurityStateChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-textinput#onsecuritystatechange12)回调中，建议增加状态同步，具体详见如下示例。

[onWillInsert](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-textinput#onwillinsert12)、[onDidInsert](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-textinput#ondidinsert12)、[onWillDelete](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-textinput#onwilldelete12)、[onDidDelete](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-textinput#ondiddelete12)回调仅支持系统输入法的场景。

[onWillChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-textinput#onwillchange15)的回调时序晚于[onWillInsert](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-textinput#onwillinsert12)、[onWillDelete](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-textinput#onwilldelete12)，早于[onDidInsert](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-textinput#ondidinsert12)、[onDidDelete](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-textinput#ondiddelete12)。

收起

自动换行

深色代码主题

复制

```
1. import { hilog } from '@kit.PerformanceAnalysisKit';

3. const TAG = '[Sample_Textcomponent]';
4. const DOMAIN = 0xF811;
5. const BUNDLE = 'Textcomponent_';

7. @Entry
8. @Component
9. struct TextInputEventAdd {
10. @State text: string = '';
11. @State textStr1: string = '';
12. @State textStr2: string = '';
13. @State textStr3: string = '';
14. @State textStr4: string = '';
15. @State textStr5: string = '';
16. @State textStr6: string = '';
17. @State textStr7: string = '';
18. @State textStr8: string = '';
19. @State textStr9: string = '';
20. @State passwordState: boolean = false;
21. controller: TextInputController = new TextInputController();

23. build() {
24. Row() {
25. Column() {
26. Text(`${this.textStr1}\n${this.textStr2}\n${this.textStr3}
27. \n${this.textStr4}\n${this.textStr5}\n${this.textStr6}
28. \n${this.textStr7}\n${this.textStr8}\n${this.textStr9}`)
29. .fontSize(20)
30. .width('70%')
31. TextInput({ text: this.text, placeholder: 'input your word...', controller: this.controller })
32. .type(InputType.Password)
33. .showPassword(this.passwordState)
34. .onChange((value: string) => {
35. // 文本内容发生变化时触发该回调
36. hilog.info(DOMAIN, TAG, BUNDLE + 'onChange is triggering: ' + value);
37. this.textStr1 = `onChange is triggering: ${value}`;
38. })
39. .onSubmit((enterKey: EnterKeyType, event: SubmitEvent) => {
40. // 按下输入法回车键时触发该回调
41. hilog.info(DOMAIN, TAG, BUNDLE + 'onSubmit is triggering: ' + enterKey + event.text);
42. this.textStr2 = `onSubmit is triggering: ${enterKey} ${event.text}`;
43. })
44. .onTextSelectionChange((selectionStart: number, selectionEnd: number) => {
45. // 文本选择的位置发生变化或编辑状态下光标位置发生变化时，触发该回调
46. hilog.info(DOMAIN, TAG, BUNDLE + 'onTextSelectionChange is triggering: ' + selectionStart + selectionEnd);
47. this.textStr3 = `onTextSelectionChange is triggering: ${selectionStart} ${selectionEnd}`;
48. })
49. .onSecurityStateChange((isShowPassword: boolean) => {
50. // 密码显隐状态切换时，触发该回调
51. hilog.info(DOMAIN, TAG, BUNDLE + 'onSecurityStateChange is triggering: ' + isShowPassword);
52. this.passwordState = isShowPassword;
53. this.textStr4 = `onSecurityStateChange is triggering: ${isShowPassword}`;
54. })
55. .onWillInsert((info: InsertValue) => {
56. // 在将要输入时，触发该回调
57. hilog.info(DOMAIN, TAG, BUNDLE + 'onWillInsert is triggering: ' + info.insertValue + info.insertOffset);
58. this.textStr5 = `onWillInsert is triggering: ${info.insertValue} ${info.insertOffset}`;
59. return true;
60. })
61. .onDidInsert((info: InsertValue) => {
62. // 在输入完成时，触发该回调
63. hilog.info(DOMAIN, TAG, BUNDLE + 'onDidInsert is triggering: ' + info.insertValue + info.insertOffset);
64. this.textStr6 = `onDidInsert is triggering: ${info.insertValue} ${info.insertOffset}`;
65. })
66. .onWillDelete((info: DeleteValue) => {
67. // 在将要删除时，触发该回调
68. hilog.info(DOMAIN, TAG, BUNDLE + 'onWillDelete is triggering: ' + info.deleteValue + info.deleteOffset);
69. this.textStr7 = `onWillDelete is triggering: ${info.deleteValue} ${info.deleteOffset}`;
70. return true;
71. })
72. .onDidDelete((info: DeleteValue) => {
73. // 在删除完成时，触发该回调
74. hilog.info(DOMAIN, TAG, BUNDLE + 'onDidDelete is triggering: ' + info.deleteValue + info.deleteOffset);
75. this.textStr8 = `onDidDelete is triggering: ${info.deleteValue} ${info.deleteOffset}`;
76. })
77. .onFocus(() => {
78. // 绑定通用事件，输入框获焦时触发该回调
79. hilog.info(DOMAIN, TAG, BUNDLE + 'onFocus is triggering');
80. this.textStr9 = `onFocus is triggering`;
81. })
82. }.width('100%')
83. }
84. .height('100%')
85. }
86. }
```

[TextInputAddEvent.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/textInput/TextInputAddEvent.ets#L15-L101)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f6/v3/SUyOfL6wRVCToB2WT8jMDg/zh-cn_image_0000002540611452.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034930Z&HW-CC-Expire=86400&HW-CC-Sign=1C8E749EF5BCFC93141DB33668C7D839A49BBB6CF654F0D8CDF2C18277E41AF2)

## 选中菜单

输入框中的文字被选中时会弹出包含剪切、复制、翻译、搜索的菜单。

TextInput:

收起

自动换行

深色代码主题

复制

```
1. // 请将$r('app.string.show_selected_menu')替换为实际资源文件，在本示例中该资源文件的value值为"这是一段文本，用来展示选中菜单"
2. TextInput({ text: $r('app.string.show_selected_menu') })
```

[SelectMenu.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/textInput/SelectMenu.ets#L26-L29)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4a/v3/UrbrV-q7SNiLVEJSwdznNw/zh-cn_image_0000002571171447.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T034930Z&HW-CC-Expire=86400&HW-CC-Sign=10BB314F490BDB4EEC949744046F8A9DA3BAB5CA8FF0B758DA2B87AED00D671B)

TextArea:

收起

自动换行

深色代码主题

复制

```
1. // 请将$r('app.string.show_selected_menu')替换为实际资源文件，在本示例中该资源文件的value值为"这是一段文本，用来展示选中菜单"
2. TextArea({ text: $r('app.string.show_selected_menu') })
```

[SelectMenu.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/textInput/SelectMenu.ets#L30-L33)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/af/v3/pTHc_-CGSVmthlJPUrUXmw/zh-cn_image_0000002540771104.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T034930Z&HW-CC-Expire=86400&HW-CC-Sign=01CE85275C6A3B66CD0B15C82A76DC0AB5AF7F349F482F50F353377D76E24163)

## 禁用系统服务类菜单

从API version 20开始，支持使用[disableSystemServiceMenuItems](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-textmenucontroller#disablesystemservicemenuitems20)方法屏蔽文本选择菜单中的所有系统服务菜单项。

收起

自动换行

深色代码主题

复制

```
1. import { TextMenuController } from '@kit.ArkUI';

3. @Entry
4. @Component
5. struct DisableSystemServiceMenuItem {
6. aboutToAppear(): void {
7. // 禁用所有系统服务菜单项
8. TextMenuController.disableSystemServiceMenuItems(true)
9. }

11. aboutToDisappear(): void {
12. // 页面消失时恢复系统服务菜单项
13. TextMenuController.disableSystemServiceMenuItems(false)
14. }

16. build() {
17. Row() {
18. Column() {
19. // 请将$r('app.string.ProhibitSelectMenu_content')替换为实际资源文件，在本示例中该资源文件的value值为"这是一个TextInput，长按弹出文本选择菜单"
20. TextInput({ text: $r('app.string.ProhibitSelectMenu_content') })
21. .height(60)
22. .fontStyle(FontStyle.Italic)
23. .fontWeight(FontWeight.Bold)
24. .textAlign(TextAlign.Center)
25. .caretStyle({ width: '4vp' })
26. .editMenuOptions({
27. onCreateMenu: (menuItems: Array<TextMenuItem>) => {
28. // menuItems不包含被屏蔽的系统菜单项
29. return menuItems
30. },
31. onMenuItemClick: (menuItem: TextMenuItem, textRange: TextRange) => {
32. return false
33. }
34. })
35. }.width('100%')
36. }
37. .height('100%')
38. }
39. }
```

[DisableSystemServiceMenuItems.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/textInput/disablemenu/DisableSystemServiceMenuItems.ets#L16-L56)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/17/v3/ZFYvOfF4R2yw168j6XVxWg/zh-cn_image_0000002571291403.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034930Z&HW-CC-Expire=86400&HW-CC-Sign=4ABB5D3AD9B717B7B523B728CDE7B03AACECBF9064FA1CAA989D4A21FBF9BB3A)

从API version 20开始，支持使用[disableMenuItems](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-textmenucontroller#disablemenuitems20)方法屏蔽文本选择菜单中指定的系统服务菜单项。

收起

自动换行

深色代码主题

复制

```
1. import { TextMenuController } from '@kit.ArkUI';

3. @Entry
4. @Component
5. struct DisableMenuItem {
6. aboutToAppear(): void {
7. // 禁用搜索，翻译和AI帮写
8. TextMenuController.disableMenuItems([TextMenuItemId.SEARCH, TextMenuItemId.TRANSLATE, TextMenuItemId.AI_WRITER])
9. }

11. aboutToDisappear(): void {
12. // 页面消失时恢复系统服务菜单项
13. TextMenuController.disableMenuItems([])
14. }

16. build() {
17. Row() {
18. Column() {
19. // 请将$r('app.string.ProhibitSelectMenu_content')替换为实际资源文件，在本示例中该资源文件的value值为"这是一个TextInput，长按弹出文本选择菜单"
20. TextInput({ text: $r('app.string.ProhibitSelectMenu_content') })
21. .height(60)
22. .fontStyle(FontStyle.Italic)
23. .fontWeight(FontWeight.Bold)
24. .textAlign(TextAlign.Center)
25. .caretStyle({ width: '4vp' })
26. .editMenuOptions({
27. onCreateMenu: (menuItems: Array<TextMenuItem>) => {
28. // menuItems不包含搜索和翻译
29. return menuItems;
30. },
31. onMenuItemClick: (menuItem: TextMenuItem, textRange: TextRange) => {
32. return false
33. }
34. })
35. }.width('100%')
36. }
37. .height('100%')
38. }
39. }
```

[DisableMenuItems.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/textInput/disablemenu/DisableMenuItems.ets#L16-L56)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/dc/v3/avWF0TZZQMOMlq9-tKYqug/zh-cn_image_0000002540611454.png?HW-CC-KV=V1&HW-CC-Date=20260414T034930Z&HW-CC-Expire=86400&HW-CC-Sign=D2C880720C00D86A3613378E5157268A8FD4054CEC82F4C222BB9C4D3A2B65DF)

## 自动填充

输入框可以通过[contentType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-textinput#contenttype12)属性设置自动填充类型。

支持的类型请参考[ContentType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-textinput#contenttype12枚举说明)。

收起

自动换行

深色代码主题

复制

```
1. // 请将$r('app.string.Auto_Fill_PlaceHolder')替换为实际资源文件，在本示例中该资源文件的value值为"输入你的邮箱..."
2. TextInput({ placeholder: $r('app.string.Auto_Fill_PlaceHolder') })
3. .width('95%')
4. .height(40)
5. .margin(20)
6. .contentType(ContentType.EMAIL_ADDRESS)
```

[AutoFill.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/textInput/AutoFill.ets#L25-L32)

## 设置属性

* 设置省略属性。

  输入框可以通过[ellipsisMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-textinput#ellipsismode18)属性设置省略位置。

  ellipsisMode属性需要配合[textOverflow](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-textinput#textoverflow12)属性设置为TextOverflow.Ellipsis使用，单独设置ellipsisMode属性不生效。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // 请将$r('app.string.Set_Omission_Property_textContent')替换为实际资源文件，在本示例中该资源文件的value值为"这是一段文本，用来展示省略模式"
  2. TextInput({ text: $r('app.string.Set_Omission_Property_textContent') })
  3. .textOverflow(TextOverflow.Ellipsis)
  4. .ellipsisMode(EllipsisMode.END)
  5. .style(TextInputStyle.Inline)
  6. .fontSize(30)
  7. .margin(30)
  ```

  [SetProperty.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/textInput/SetProperty.ets#L26-L34)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c8/v3/w-RodM1sQD2JB2bHbEZAxw/zh-cn_image_0000002571171449.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T034930Z&HW-CC-Expire=86400&HW-CC-Sign=7988386C7163CAD9ED9F21AE936B56559CCD98EB5C058DC1F13038FC13DD46F8)
* 设置文本描边属性。

  从API version 20开始，输入框可以通过[strokeWidth](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-textinput#strokewidth20)和[strokeColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-textinput#strokecolor20)属性设置文本的描边宽度及颜色。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. TextInput({ text: 'Text with stroke' })
  2. .width('100%')
  3. .height(60)
  4. .borderWidth(1)
  5. .fontSize(40)
  6. .strokeWidth(LengthMetrics.px(3.0))
  7. .strokeColor(Color.Red)
  ```

  [SetProperty.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/textInput/SetProperty.ets#L37-L45)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/22/v3/883_pi9oSmml3Tx_HsvcYg/zh-cn_image_0000002540771108.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T034930Z&HW-CC-Expire=86400&HW-CC-Sign=6EB47AFF488FAFB8EB061D5998E4A59BE69FC6A89FCDA1EA5A8F0DAC43CD362D)

## 设置文本行间距

从API version 20开始，支持通过[lineSpacing](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#linespacing20)设置文本的行间距。如果不配置[LineSpacingOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#linespacingoptions20对象说明)时，首行上方和尾行下方默认会有行间距。如果onlyBetweenLines设置为true时，行间距仅适用于行与行之间，首行上方无额外行间距。

收起

自动换行

深色代码主题

复制

```
1. TextArea({
2. text: 'The line spacing of this TextArea is set to 20_px, and the spacing is effective only between the lines.'
3. })
4. .fontSize(22)
5. .lineSpacing(LengthMetrics.px(20), { onlyBetweenLines: true })
```

[SetTextMargin.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/textInput/SetTextMargin.ets#L26-L32)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8a/v3/H67tkWvuQ5iMPG_jZldz5w/zh-cn_image_0000002571291405.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T034930Z&HW-CC-Expire=86400&HW-CC-Sign=47F7E2DE35E1605944C33B59DF2A61060792622F8A3267C83F632568C3EFFE46)

## 键盘避让

键盘抬起后，具有滚动能力的容器组件在横竖屏切换时，才会生效键盘避让，若希望无滚动能力的容器组件也生效键盘避让，建议在组件外嵌套一层具有滚动能力的容器组件，比如[Scroll](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-scroll)、[List](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-list)、[Grid](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-grid)。

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. struct KeyboardAvoid {
4. placeHolderArr: string[] = ['1', '2', '3', '4', '5', '6', '7'];

6. build() {
7. Scroll() {
8. Column() {
9. ForEach(this.placeHolderArr, (placeholder: string) => {
10. TextInput({ placeholder: 'TextInput ' + placeholder })
11. .margin(30)
12. // ···
13. })
14. }
15. }
16. .height('100%')
17. .width('100%')
18. }
19. }
```

[KeyboardAvoidance.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/textInput/KeyboardAvoidance.ets#L18-L40)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f0/v3/RdSsugvRTJabKoHius89lA/zh-cn_image_0000002540611456.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034930Z&HW-CC-Expire=86400&HW-CC-Sign=A634009602DE02F1D664C3AC6827BA8EAE0229A92304CE18D10291F0B073B325)

## 光标避让

[keyBoardAvoidMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-e#keyboardavoidmode11)枚举中的OFFSET和RESIZE在键盘抬起后，不支持二次避让。如果想要支持光标位置在点击或者通过接口设置变化后发生二次避让，可以考虑使用OFFSET\_WITH\_CARET和RESIZE\_CARET替换原有的OFFSET和RESIZE模式。

对于滚动容器更推荐使用RESIZE\_WITH\_CARET，非滚动容器应该使用OFFSET\_WITH\_CARET。

收起

自动换行

深色代码主题

复制

```
1. import { hilog } from '@kit.PerformanceAnalysisKit';
2. import { window } from '@kit.ArkUI';
3. import { KeyboardAvoidMode } from '@kit.ArkUI';
```

[EntryAbility.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/entryability/EntryAbility.ets#L18-L22)

收起

自动换行

深色代码主题

复制

```
1. // Used in UIAbility
2. onWindowStageCreate(windowStage: window.WindowStage): void {
3. // Main window is created, set main page for this ability
4. hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageCreate');

6. windowStage.loadContent('pages/Index', (err, data) => {
7. let keyboardAvoidMode = windowStage.getMainWindowSync().getUIContext().getKeyboardAvoidMode();
8. windowStage.getMainWindowSync().getUIContext().setKeyboardAvoidMode(KeyboardAvoidMode.OFFSET_WITH_CARET);
9. if (err.code) {
10. hilog.error(0x0000, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err) ?? '');
11. return;
12. }
13. hilog.info(0x0000, 'testTag', 'Succeeded in loading the content. Data: %{public}s', JSON.stringify(data) ?? '');
14. });
15. }
```

[EntryAbility.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/entryability/EntryAbility.ets#L34-L50)

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. struct CursorAvoid {
4. @State caretPosition: number = 600;
5. areaController: TextAreaController = new TextAreaController();
6. text = 'Most of us compare ourselves with anyone we think is happier — a relative, someone we know a lot,' +
7. ' or someone we hardly know. As a result, what we do remember is anything that makes others happy, ' +
8. 'anything that makes ourselves unhappy,' +
9. ' totally forgetting that there is something happy in our own life.\
10. So the best way to destroy happiness is to look at something and focus on even the smallest flaw. ' +
11. 'It is the smallest flaw that would make us complain. And it is the complaint that leads to us becoming unhappy.\
12. If one chooses to be happy, he will be blessed; if he chooses to be unhappy, he will be cursed. ' +
13. 'Happiness is just what you think will make you happy.' +
14. 'Most of us compare ourselves with anyone we think is happier — a relative, someone we know a lot, ' +
15. 'or someone we hardly know. As a result, what we do remember is anything that makes others happy, ' +
16. 'anything that makes ourselves unhappy, totally forgetting that there is something happy in our own life.\
17. ';

19. build() {
20. Scroll() {
21. Column() {
22. Row() {
23. Button('CaretPosition++: ' + this.caretPosition).onClick(() => {
24. this.caretPosition += 1;
25. }).fontSize(10)
26. Button('CaretPosition--: ' + this.caretPosition).onClick(() => {
27. this.caretPosition -= 1;
28. }).fontSize(10)
29. Button('SetCaretPosition: ').onClick(() => {
30. this.areaController.caretPosition(this.caretPosition);
31. }).fontSize(10)
32. }

34. TextArea({ text: this.text, controller: this.areaController })
35. .width('100%')
36. .fontSize('20fp')
37. }
38. }.width('100%').height('100%')
39. }
40. }
```

[CursorAvoidance.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/textInput/CursorAvoidance.ets#L18-L59)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c8/v3/OZeIDBycQM2eofXDz_4Ibg/zh-cn_image_0000002571171451.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034930Z&HW-CC-Expire=86400&HW-CC-Sign=468B16D0D7933174ACE389E48E7FB3C2E0E9CC9E2B98308CD79FE83B96D16FC0)

## 常见问题

### 如何设置TextArea的文本最少展示行数并自适应高度

**问题现象**

设置TextArea的初始高度来控制最少文本展示行数，当输入文本超过初始高度时，TextArea的高度自适应。

**解决措施**

设置[minLines](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-textarea#minlines20)（从API version 20开始），或者设置height为"auto"，并使用[constraintSize](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-size#constraintsize)自行计算高度。

收起

自动换行

深色代码主题

复制

```
1. import { MeasureUtils } from '@kit.ArkUI';

3. @Entry
4. @Component
5. struct TextExample {
6. private textAreaPadding = 12;
7. private setMaxLines = 3;
8. private resourceManager = this.getUIContext().getHostContext()?.resourceManager;
9. // 请在resources\base\element\string.json文件中配置name为'NormalQuestion_change'，value为非空字符串的资源
10. private changeText = this.resourceManager?.getStringByNameSync('NormalQuestion_change') as string;
11. @State fullText: string = this.changeText;
12. @State originText: string = this.changeText;
13. @State uiContext: UIContext = this.getUIContext();
14. @State uiContextMeasure: MeasureUtils = this.uiContext.getMeasureUtils();
15. textSize: SizeOptions = this.uiContextMeasure.measureTextSize({
16. textContent: this.originText,
17. fontSize: 18
18. });

20. build() {
21. Column() {
22. TextArea({ text: 'minLines: ' + this.fullText })
23. .fontSize(18)
24. .width(300)
25. .minLines(3)

27. Blank(50)

29. TextArea({ text: 'constraintSize: ' + this.fullText })
30. .fontSize(18)
31. .padding({ top: this.textAreaPadding, bottom: this.textAreaPadding })
32. .width(300)
33. .height('auto')
34. .constraintSize({
35. // 结合padding计算，设置至少显示this.setMaxLines行文本
36. // 若涉及适老化字号缩放，需要监听并调整高度
37. minHeight: this.textAreaPadding * 2 +
38. this.setMaxLines * this.getUIContext().px2vp(Number(this.textSize.height))
39. })

41. Blank(50)
42. // 请将$r('app.string.NormalQuestion_AddInput')替换为实际资源文件，在本示例中该资源文件的value值为"增加输入"
43. Button($r('app.string.NormalQuestion_AddInput'))
44. .onClick(() => {
45. this.fullText += this.changeText;
46. })
47. }
48. .justifyContent(FlexAlign.Center)
49. .width('100%')
50. .padding({ top: 30 })
51. }
52. }
```

[NormalQuestion.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/TextComponent/entry/src/main/ets/pages/textInput/NormalQuestion.ets#L15-L68)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b7/v3/F--0ZLSgTNqMeTabKhizNA/zh-cn_image_0000002540771110.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034930Z&HW-CC-Expire=86400&HW-CC-Sign=9BC5C718F5F8B7581FC74A97CD3F86CBE41F6C221AE66FD5548D7CDE9133A784)