ArkUI的弹出框控制器在绑定弹出框后，可提供对弹出框的操作能力，当前支持关闭功能。可以将控制器传入弹出框内容区域后进行操作。

从API version 18开始，可设置controller参数以绑定[DialogController](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-promptaction#dialogcontroller18)控制器，通过控制器能够操作弹出框。

## 使用约束

目前[openCustomDialogWithController](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-promptaction#opencustomdialogwithcontroller18)和[presentCustomDialog](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-promptaction#presentcustomdialog18)支持通过controller参数来绑定弹出框进行操作，目前[getDialogController](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-custom-component-api#getdialogcontroller18)支持获取自定义组件所在的弹出框的控制器。

说明

一个弹出框控制器只能绑定一个弹出框，且操作只对该弹出框生效。

使用[getDialogController](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-custom-component-api#getdialogcontroller18)获取弹出框控制器时，如果当前自定义组件不在弹出框中显示则获取为undefined。

## 创建自定义内容为ComponentContent的弹出框控制器

说明

详细变量定义请参考[完整示例](/consumer/cn/doc/harmonyos-guides/arkts-dialog-controller#完整示例)。

1. 初始化一个自定义弹出框内容区的入参类，内部包含弹出框控制器。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. class Params {
   2. public text: string = '';
   3. public dialogController: promptAction.CommonController = new promptAction.DialogController();

   5. constructor(text: string, dialogController: promptAction.CommonController) {
   6. this.text = text;
   7. this.dialogController = dialogController;
   8. }
   9. }
   ```

   [DialogController.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/DialogProject/entry/src/main/ets/pages/customdialog/dialogcontroller/DialogController.ets#L23-L34)
2. 初始化一个自定义的弹出框内容区，内部包含一个按钮，该按钮通过该自定义组件自带的弹出框控制器实现关闭功能。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Component
   2. struct MyComponent {
   3. build() {
   4. Column({ space: 5 }) {
   5. // 'app.string.closeDialog_by_custom'资源文件中的value值为'点我关闭弹窗：通过自定义组件自带的DialogController'。
   6. Button($r('app.string.closeDialog_by_custom'))
   7. .onClick(() => {
   8. let dialogController: promptAction.DialogController = this.getDialogController();
   9. if (dialogController !== undefined) {
   10. dialogController.close();
   11. }
   12. })
   13. }
   14. }
   15. }
   ```

   [DialogController.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/DialogProject/entry/src/main/ets/pages/customdialog/dialogcontroller/DialogController.ets#L36-L52)
3. 初始化另一自定义弹出框内容区，其中包含一个Text组件和一个按钮，该按钮通过外部传递的弹出框控制器用于关闭弹出框，并且该内容区还包含前一个自定义弹出框内容区。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Builder
   2. function buildText(params: Params) {
   3. Column({ space: 5 }) {
   4. Text(params.text)
   5. .fontSize(30)
   6. if (params.dialogController !== undefined) {
   7. // 'app.string.closeDialog_by_controller'资源文件中的value值为'点我关闭弹窗：通过外部传递的DialogController'。
   8. Button($r('app.string.closeDialog_by_controller'))
   9. .onClick(() => {
   10. params.dialogController.close();
   11. })
   12. }
   13. MyComponent()
   14. }
   15. .width(300)
   16. .height(200)
   17. .backgroundColor('#FFF0F0F0')
   18. }
   ```

   [DialogController.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/DialogProject/entry/src/main/ets/pages/customdialog/dialogcontroller/DialogController.ets#L54-L73)
4. 初始化一个弹出框控制器，并通过设置控制器参数来初始化一个弹出框内容实体对象。最后，通过调用[UIContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-uicontext)中的[getPromptAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-uicontext#getpromptaction)方法获取[PromptAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-promptaction)对象，再通过该对象调用[openCustomDialogWithController](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-promptaction#opencustomdialogwithcontroller18)接口，并且设置初始化的内容实体对象和控制器参数以创建弹出框。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let dialogController: promptAction.CommonController = new promptAction.DialogController();
   2. let contentNode: ComponentContent<Object> =
   3. new ComponentContent(this.getUIContext(), wrapBuilder(buildText),
   4. new Params(this.message, dialogController));
   5. this.getUIContext().getPromptAction().openCustomDialogWithController(
   6. contentNode, dialogController, this.baseDialogOptions).catch((err: BusinessError) => {
   7. hilog.error(0x0000, 'dialogController',
   8. 'openCustomDialogWithController error: ' + err.code + ' ' + err.message);
   9. });
   ```

   [DialogController.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/DialogProject/entry/src/main/ets/pages/customdialog/dialogcontroller/DialogController.ets#L200-L210)

## 创建自定义内容为CustomBuilder的弹出框控制器

说明

详细变量定义请参考[完整示例](/consumer/cn/doc/harmonyos-guides/arkts-dialog-controller#完整示例)。

1. 初始化一个自定义弹出框内容区，内部包含一个Text组件和一个按钮，该按钮通过外部传递的弹出框控制器实现关闭功能。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Builder
   2. customDialogComponent(dialogController: promptAction.DialogController) {
   3. Column({ space: 5 }) {
   4. Text(this.message)
   5. .fontSize(30)
   6. if (dialogController !== undefined) {
   7. // 'app.string.closeDialog_by_outside'资源文件中的value值为'点击关闭弹窗：通过外部传递的DialogController'。
   8. Button($r('app.string.closeDialog_by_outside'))
   9. .onClick(() => {
   10. dialogController.close();
   11. })
   12. }
   13. }
   14. .height(200)
   15. .padding(5)
   16. .justifyContent(FlexAlign.SpaceBetween)
   17. .backgroundColor('#FFF0F0F0')
   18. }
   ```

   [DialogController.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/DialogProject/entry/src/main/ets/pages/customdialog/dialogcontroller/DialogController.ets#L122-L141)
2. 初始化一个弹出框控制器，并通过调用[UIContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-uicontext)中的[getPromptAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-uicontext#getpromptaction)方法获取[PromptAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-promptaction)对象，再通过该对象调用[presentCustomDialog](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-promptaction#presentcustomdialog18)接口，设置初始化的内容实体对象和控制器参数以创建弹出框。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let dialogController: promptAction.CommonController = new promptAction.DialogController();
   2. this.getUIContext().getPromptAction().presentCustomDialog(() => {
   3. this.customDialogComponent(dialogController);
   4. }, dialogController, this.dialogOptions).catch((err: BusinessError) => {
   5. hilog.error(0x0000, 'dialogController', 'presentCustomDialog error: ' + err.code + ' ' + err.message);
   6. });
   ```

   [DialogController.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/DialogProject/entry/src/main/ets/pages/customdialog/dialogcontroller/DialogController.ets#L214-L221)

## 创建自定义内容为CustomBuilderWithId的弹出框控制器

说明

详细变量定义请参考[完整示例](/consumer/cn/doc/harmonyos-guides/arkts-dialog-controller#完整示例)。

1. 初始化一个弹出框内容区，内部包含一个Text组件、一个通过外部传递的弹出框ID用于关闭弹出框的按钮和一个通过外部传递的弹出框控制器用于关闭弹出框的按钮。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Builder
   2. customDialogComponentWithId(dialogId: number, dialogController: promptAction.DialogController) {
   3. Column({ space: 5 }) {
   4. Text(this.message)
   5. .fontSize(30)
   6. if (dialogId !== undefined) {
   7. // 'app.string.closeDialog_by_id'资源文件中的value值为'点击关闭弹窗：通过DialogID'。
   8. Button($r('app.string.closeDialog_by_id'))
   9. .onClick(() => {
   10. this.getUIContext().getPromptAction().closeCustomDialog(dialogId);
   11. })
   12. }
   13. if (dialogController !== undefined) {
   14. // 'app.string.closeDialog_by_dialog_controller'资源文件中的value值为'点击关闭弹窗：通过外部传递的DialogController'。
   15. Button($r('app.string.closeDialog_by_dialog_controller'))
   16. .onClick(() => {
   17. dialogController.close();
   18. })
   19. }
   20. }
   21. }
   ```

   [DialogController.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/DialogProject/entry/src/main/ets/pages/customdialog/dialogcontroller/DialogController.ets#L143-L168)
2. 初始化一个弹出框控制器，并通过调用[UIContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-uicontext)中的[getPromptAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-uicontext#getpromptaction)方法获取[PromptAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-promptaction)对象，再通过该对象调用[presentCustomDialog](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-promptaction#presentcustomdialog18)接口，设置初始化的内容实体对象和控制器参数以创建弹出框。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let dialogController: promptAction.CommonController = new promptAction.DialogController();
   2. this.getUIContext().getPromptAction().presentCustomDialog((dialogId: number) => {
   3. this.customDialogComponentWithId(dialogId, dialogController);
   4. }, dialogController, this.dialogOptions).catch((err: BusinessError) => {
   5. hilog.error(0x0000, 'dialogController', 'presentCustomDialog error: ' + err.code + ' ' + err.message);
   6. });
   ```

   [DialogController.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/DialogProject/entry/src/main/ets/pages/customdialog/dialogcontroller/DialogController.ets#L225-L232)

## 在CustomDialogController内容区直接获取弹出框控制器

说明

详细变量定义请参考[完整示例](/consumer/cn/doc/harmonyos-guides/arkts-dialog-controller#完整示例)。

1. 初始化一个自定义弹出框内容区，内部包含一个Text组件和一个按钮，该按钮通过弹出框控制器关闭弹出框。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @CustomDialog
   2. @Component
   3. struct CustomDialogExample {
   4. controller?: CustomDialogController;

   6. build() {
   7. Column({ space: 5 }) {
   8. // 'app.string.my_content'资源文件中的value值为'我是内容'。
   9. Text($r('app.string.my_content'))
   10. .fontSize(30)
   11. // 'app.string.closeDialog_by_dialog'资源文件中的value值为'点我关闭弹窗：通过自定义组件自带的DialogController'。
   12. Button($r('app.string.closeDialog_by_dialog'))
   13. .onClick(() => {
   14. let dialogController: PromptActionDialogController = this.getDialogController();
   15. if (dialogController !== undefined) {
   16. dialogController.close();
   17. }
   18. })
   19. }
   20. .height(200)
   21. .backgroundColor('#FFF0F0F0')
   22. }
   23. }
   ```

   [DialogController.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/DialogProject/entry/src/main/ets/pages/customdialog/dialogcontroller/DialogController.ets#L75-L98)
2. 初始化一个自定义弹出框构造器，关联自定义弹出框内容区。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let customDialogController: CustomDialogController = new CustomDialogController({
   2. builder: CustomDialogExample(),
   3. });
   4. customDialogController.open();
   ```

   [DialogController.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/DialogProject/entry/src/main/ets/pages/customdialog/dialogcontroller/DialogController.ets#L245-L254)

## 使用控制器获取弹出框的状态

在自定义弹出框场景中，从API version 20 开始，可以通过控制器调用[getState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-promptaction#getstate20)接口获取弹出框状态。

说明

详细变量定义请参考[完整示例](/consumer/cn/doc/harmonyos-guides/arkts-dialog-controller#完整示例)。

初始化一个自定义弹出框内容区，内部包含一个Text组件和一个按钮，该按钮通过调用getState获取当前弹出框状态。

收起

自动换行

深色代码主题

复制

```
1. @Builder
2. customDialogComponentGetState(dialogController: promptAction.DialogController) {
3. Column({ space: 5 }) {
4. Text(this.message)
5. .fontSize(30)
6. if (dialogController !== undefined) {
7. // 'app.string.click_check_status'资源文件中的value值为'点我查询弹窗状态'。
8. Button($r('app.string.click_check_status'))
9. .onClick(() => {
10. hilog.info(0x0000, 'dialogController', 'state:' + dialogController.getState());
11. })
12. }
13. }
14. .height(200)
15. .padding(5)
16. .justifyContent(FlexAlign.SpaceBetween)
17. .backgroundColor('#FFF0F0F0')
18. }
```

[DialogController.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/DialogProject/entry/src/main/ets/pages/customdialog/dialogcontroller/DialogController.ets#L170-L193)

## 完整示例

通过外部传递的弹出框控制器和自定义组件自带的弹出框控制器，在自定义弹出框内容区域内实现关闭功能。

收起

自动换行

深色代码主题

复制

```
1. import { ComponentContent, promptAction } from '@kit.ArkUI';
2. import { BusinessError } from '@kit.BasicServicesKit';
3. import { hilog } from '@kit.PerformanceAnalysisKit';

5. class Params {
6. public text: string = '';
7. public dialogController: promptAction.CommonController = new promptAction.DialogController();

9. constructor(text: string, dialogController: promptAction.CommonController) {
10. this.text = text;
11. this.dialogController = dialogController;
12. }
13. }


16. @Component
17. struct MyComponent {
18. build() {
19. Column({ space: 5 }) {
20. // 'app.string.closeDialog_by_custom'资源文件中的value值为'点我关闭弹窗：通过自定义组件自带的DialogController'。
21. Button($r('app.string.closeDialog_by_custom'))
22. .onClick(() => {
23. let dialogController: promptAction.DialogController = this.getDialogController();
24. if (dialogController !== undefined) {
25. dialogController.close();
26. }
27. })
28. }
29. }
30. }


33. @Builder
34. function buildText(params: Params) {
35. Column({ space: 5 }) {
36. Text(params.text)
37. .fontSize(30)
38. if (params.dialogController !== undefined) {
39. // 'app.string.closeDialog_by_controller'资源文件中的value值为'点我关闭弹窗：通过外部传递的DialogController'。
40. Button($r('app.string.closeDialog_by_controller'))
41. .onClick(() => {
42. params.dialogController.close();
43. })
44. }
45. MyComponent()
46. }
47. .width(300)
48. .height(200)
49. .backgroundColor('#FFF0F0F0')
50. }


53. @CustomDialog
54. @Component
55. struct CustomDialogExample {
56. controller?: CustomDialogController;

58. build() {
59. Column({ space: 5 }) {
60. // 'app.string.my_content'资源文件中的value值为'我是内容'。
61. Text($r('app.string.my_content'))
62. .fontSize(30)
63. // 'app.string.closeDialog_by_dialog'资源文件中的value值为'点我关闭弹窗：通过自定义组件自带的DialogController'。
64. Button($r('app.string.closeDialog_by_dialog'))
65. .onClick(() => {
66. let dialogController: PromptActionDialogController = this.getDialogController();
67. if (dialogController !== undefined) {
68. dialogController.close();
69. }
70. })
71. }
72. .height(200)
73. .backgroundColor('#FFF0F0F0')
74. }
75. }


78. @Entry
79. @Component
80. export struct DialogController {
81. private message = 'dialog';
82. private baseDialogOptions: promptAction.BaseDialogOptions = {
83. isModal: false,
84. autoCancel: false
85. };
86. private dialogOptions: promptAction.DialogOptions = {
87. isModal: false,
88. autoCancel: false
89. };

91. @Builder
92. customDialogComponent(dialogController: promptAction.DialogController) {
93. Column({ space: 5 }) {
94. Text(this.message)
95. .fontSize(30)
96. if (dialogController !== undefined) {
97. // 'app.string.closeDialog_by_outside'资源文件中的value值为'点击关闭弹窗：通过外部传递的DialogController'。
98. Button($r('app.string.closeDialog_by_outside'))
99. .onClick(() => {
100. dialogController.close();
101. })
102. }
103. }
104. .height(200)
105. .padding(5)
106. .justifyContent(FlexAlign.SpaceBetween)
107. .backgroundColor('#FFF0F0F0')
108. }


111. @Builder
112. customDialogComponentWithId(dialogId: number, dialogController: promptAction.DialogController) {
113. Column({ space: 5 }) {
114. Text(this.message)
115. .fontSize(30)
116. if (dialogId !== undefined) {
117. // 'app.string.closeDialog_by_id'资源文件中的value值为'点击关闭弹窗：通过DialogID'。
118. Button($r('app.string.closeDialog_by_id'))
119. .onClick(() => {
120. this.getUIContext().getPromptAction().closeCustomDialog(dialogId);
121. })
122. }
123. if (dialogController !== undefined) {
124. // 'app.string.closeDialog_by_dialog_controller'资源文件中的value值为'点击关闭弹窗：通过外部传递的DialogController'。
125. Button($r('app.string.closeDialog_by_dialog_controller'))
126. .onClick(() => {
127. dialogController.close();
128. })
129. }
130. }
131. }


134. @Builder
135. customDialogComponentGetState(dialogController: promptAction.DialogController) {
136. Column({ space: 5 }) {
137. Text(this.message)
138. .fontSize(30)
139. if (dialogController !== undefined) {
140. // 'app.string.click_check_status'资源文件中的value值为'点我查询弹窗状态'。
141. Button($r('app.string.click_check_status'))
142. .onClick(() => {
143. hilog.info(0x0000, 'dialogController', 'state:' + dialogController.getState());
144. })
145. }
146. }
147. .height(200)
148. .padding(5)
149. .justifyContent(FlexAlign.SpaceBetween)
150. .backgroundColor('#FFF0F0F0')
151. }


154. build() {
155. NavDestination() {
156. Column({ space: 5 }) {
157. // 'app.string.open_custom_dialog_with_controller'资源文件中的value值为'OpenCustomDialogWithController弹窗'。
158. Button($r('app.string.open_custom_dialog_with_controller'))
159. .onClick(() => {
160. let dialogController: promptAction.CommonController = new promptAction.DialogController();
161. let contentNode: ComponentContent<Object> =
162. new ComponentContent(this.getUIContext(), wrapBuilder(buildText),
163. new Params(this.message, dialogController));
164. this.getUIContext().getPromptAction().openCustomDialogWithController(
165. contentNode, dialogController, this.baseDialogOptions).catch((err: BusinessError) => {
166. hilog.error(0x0000, 'dialogController',
167. 'openCustomDialogWithController error: ' + err.code + ' ' + err.message);
168. });
169. })
170. // 'app.string.present_custom_dialog'资源文件中的value值为'PresentCustomDialog+CustomBuilder弹窗'。
171. Button($r('app.string.present_custom_dialog'))
172. .onClick(() => {
173. let dialogController: promptAction.CommonController = new promptAction.DialogController();
174. this.getUIContext().getPromptAction().presentCustomDialog(() => {
175. this.customDialogComponent(dialogController);
176. }, dialogController, this.dialogOptions).catch((err: BusinessError) => {
177. hilog.error(0x0000, 'dialogController', 'presentCustomDialog error: ' + err.code + ' ' + err.message);
178. });
179. })
180. // 'app.string.custom_builder_with_id'资源文件中的value值为'PresentCustomDialog+CustomBuilderWithId弹窗'。
181. Button($r('app.string.custom_builder_with_id'))
182. .onClick(() => {
183. let dialogController: promptAction.CommonController = new promptAction.DialogController();
184. this.getUIContext().getPromptAction().presentCustomDialog((dialogId: number) => {
185. this.customDialogComponentWithId(dialogId, dialogController);
186. }, dialogController, this.dialogOptions).catch((err: BusinessError) => {
187. hilog.error(0x0000, 'dialogController', 'presentCustomDialog error: ' + err.code + ' ' + err.message);
188. });
189. })
190. // 'app.string.custom_dialog_controller_dialog'资源文件中的value值为'CustomDialogController弹窗'。
191. Button($r('app.string.custom_dialog_controller_dialog'))
192. .onClick(() => {
193. let customDialogController: CustomDialogController = new CustomDialogController({
194. builder: CustomDialogExample(),
195. });
196. customDialogController.open();
197. })
198. }.width('100%')
199. }
200. }
201. }
```

[DialogController.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/DialogProject/entry/src/main/ets/pages/customdialog/dialogcontroller/DialogController.ets#L16-L261)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ef/v3/yErOHWQ4R4-kwpg6AS-Vfw/zh-cn_image_0000002571291497.gif?HW-CC-KV=V1&HW-CC-Date=20260414T035118Z&HW-CC-Expire=86400&HW-CC-Sign=E6AB8F5F9C2318FA62163AE31A65CBBBC8C952A6B28AD21F4E11BAC220E9108C)