ArkUI的弹出框焦点策略可以设定是否中断用户当前操作，并聚焦到新弹出的弹出框。若设定弹出框不获取焦点，则新弹出时不会中断用户当前操作，例如，当用户正在文本框中输入内容时，新弹出的弹出框不会关闭软键盘，焦点仍保留在文本框中。

从API version 19开始，可以通过设置[focusable](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-promptaction#basedialogoptions11)参数来管理弹出框是否获取焦点。

## 使用约束

[openCustomDialog](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-uicontext-custom-dialog)和[CustomDialog](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-common-components-custom-dialog)支持通过focusable参数来管理弹出框是否获取焦点。

说明

只有弹出覆盖在当前窗口之上的弹出框才可以获取焦点。

## 创建不获取焦点的弹出框

说明

详细变量定义请参考[完整示例](/consumer/cn/doc/harmonyos-guides/arkts-dialog-focusable#完整示例)。

1. 初始化一个弹出框内容区域，内含一个Text组件。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @State dialogIdIndex: number = 0;
   2. // 请在resources\base\element\string.json文件中配置name为'dialog_message'，value为非空字符串的资源
   3. private message: string =
   4. this.getUIContext().getHostContext()?.resourceManager.getStringByNameSync('dialog_message') as string;

   6. @Builder
   7. customDialogComponent() {
   8. Column({ space: 5 }) {
   9. Text(this.message + this.dialogIdIndex)
   10. .fontSize(30)
   11. }
   12. .height(200)
   13. .padding(5)
   14. .justifyContent(FlexAlign.SpaceBetween)
   15. }
   ```

   [DialogFocusStrategy.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/DialogProject/entry/src/main/ets/pages/customdialog/dialogboxfocuspolicy/DialogFocusStrategy.ets#L20-L37)
2. 创建一个TextInput组件，在onChange事件函数中通过调用[UIContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-uicontext)中的[getPromptAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-uicontext#getpromptaction)方法获取[PromptAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-promptaction)对象，再通过该对象调用[openCustomDialog](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-promptaction#opencustomdialog12)接口，并设置[focusable](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-promptaction#basedialogoptions11)参数为false，以创建弹出框。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. TextInput()
   2. .onChange(() => {
   3. this.dialogIdIndex++;
   4. this.getUIContext().getPromptAction().openCustomDialog({
   5. builder: () => {
   6. this.customDialogComponent();
   7. },
   8. focusable: false
   9. }).then((dialogId: number) => {
   10. setTimeout(() => {
   11. this.getUIContext().getPromptAction().closeCustomDialog(dialogId);
   12. }, 3000);
   13. });
   14. })
   ```

   [DialogFocusStrategy.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/DialogProject/entry/src/main/ets/pages/customdialog/dialogboxfocuspolicy/DialogFocusStrategy.ets#L42-L57)

## 完整示例

当用户正在文本框中输入内容时，新弹出的弹出框不会关闭软键盘，焦点仍保留在文本框中。

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. export struct Index {
4. @State dialogIdIndex: number = 0;
5. // 请在resources\base\element\string.json文件中配置name为'dialog_message'，value为非空字符串的资源
6. private message: string =
7. this.getUIContext().getHostContext()?.resourceManager.getStringByNameSync('dialog_message') as string;

9. @Builder
10. customDialogComponent() {
11. Column({ space: 5 }) {
12. Text(this.message + this.dialogIdIndex)
13. .fontSize(30)
14. }
15. .height(200)
16. .padding(5)
17. .justifyContent(FlexAlign.SpaceBetween)
18. }


21. build() {
22. NavDestination() {
23. Column({ space: 5 }) {
24. TextInput()
25. .onChange(() => {
26. this.dialogIdIndex++;
27. this.getUIContext().getPromptAction().openCustomDialog({
28. builder: () => {
29. this.customDialogComponent();
30. },
31. focusable: false
32. }).then((dialogId: number) => {
33. setTimeout(() => {
34. this.getUIContext().getPromptAction().closeCustomDialog(dialogId);
35. }, 3000);
36. });
37. })
38. }.width('100%')
39. }
40. }
41. }
```

[DialogFocusStrategy.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/DialogProject/entry/src/main/ets/pages/customdialog/dialogboxfocuspolicy/DialogFocusStrategy.ets#L16-L63)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c8/v3/mg7hb1IyQPmhMqvr9GbNwA/zh-cn_image_0000002540611548.gif?HW-CC-KV=V1&HW-CC-Date=20260414T035122Z&HW-CC-Expire=86400&HW-CC-Sign=072CBCDF87834AEF456BD63CA959A53E016500D069475FF5F2E2606FDD71D6B8)