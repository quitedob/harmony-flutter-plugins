当组件获得焦点时，获焦组件触发该事件。系统会根据该事件回调函数返回值，判断是否需要键盘。

说明

本模块首批接口从API version 24开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。

## onNeedSoftkeyboard

PhonePC/2in1TabletTVWearable

onNeedSoftkeyboard(onNeedSoftkeyboardCallback: OnNeedSoftkeyboardCallback | undefined): T

设置组件判断是否需要键盘时触发的回调。主要用于键盘接续场景，当焦点从输入框切换到其他组件时，如果切换后的组件回调函数[OnNeedSoftkeyboardCallback](/consumer/cn/doc/harmonyos-references/ts-universal-events-onneedsoftkeyboard#onneedsoftkeyboardcallback)的返回值设置为true，则表示该组件需要键盘，此时键盘将不会收起，如果返回值设置为false，则表示该组件不需要键盘，此时键盘将收起。

对于不能获焦的组件，本接口不生效。

输入框组件使用该接口并将返回值设置为false时，点击输入框将不会拉起键盘。

Web组件使用该方法时，如果返回值为true，Web组件会判断组件中是否有可编辑节点，如果有可编辑节点才会保留键盘，如果返回值为false，无论是否有可编辑节点，键盘都不会保留。

XComponent组件使用该方法时，如果返回值为true且XComponent组件使用[OH\_NativeXComponent\_SetNeedSoftKeyboard](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-interface-xcomponent-h#oh_arkui_xcomponent_setneedsoftkeyboard)设置了需要键盘，才会保留键盘，如果返回值为false，无论组件如何设置，键盘都不会保留。

当接口返回true时，应用的自绘制输入框需要主动[attach](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inputmethod#attach15)，建立输入法框架和输入法应用的通信，否则点击键盘会失去响应（失焦时输入法框架和输入法应用的通信会断开）。

该接口只适用于对输入法应用接续的场景，对自定义键盘不生效。自定义键盘接续详见[setCustomKeyboardContinueFeature](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-uicontext#setcustomkeyboardcontinuefeature23)。

**元服务API：** 从API version 24开始，该接口支持在元服务中使用。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| onNeedSoftkeyboardCallback | [OnNeedSoftkeyboardCallback](/consumer/cn/doc/harmonyos-references/ts-universal-events-onneedsoftkeyboard#onneedsoftkeyboardcallback) | undefined | 是 | 事件触发时执行的回调，系统会根据回调的返回值决定是否需要键盘。  设置为undefined时，不会触发回调，输入框类组件行为等同返回true。其他组件行为等同返回false。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| T | 返回当前组件。 |

## OnNeedSoftkeyboardCallback

PhonePC/2in1TabletTVWearable

type OnNeedSoftkeyboardCallback = () => boolean

当绑定该方法的组件判断是否需要键盘时，将触发此回调。

**元服务API：** 从API version 24开始，该接口支持在元服务中使用。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| boolean | 是否需要键盘。  若此回调的返回值为true，则表明该组件需要键盘；返回值为false，则表明该组件不需要键盘。 |

## 示例

PhonePC/2in1TabletTVWearable

### 示例1（设置键盘接续）

该示例通过[onNeedSoftkeyboard](/consumer/cn/doc/harmonyos-references/ts-universal-events-onneedsoftkeyboard#onneedsoftkeyboard)接口，设置按钮需要键盘。在从输入框拉起键盘后，点击按钮使焦点切换到按钮，此时键盘将不会收起，再次点击输入框可继续输入。

从API version 24开始，新增[onNeedSoftkeyboard](/consumer/cn/doc/harmonyos-references/ts-universal-events-onneedsoftkeyboard#onneedsoftkeyboard)接口。



```
1. @Entry
2. @Component
3. struct Index {
4. build() {
5. Column() {
6. Button('切换焦点到Button')
7. .onClick(() => {
8. this.getUIContext().getFocusController().requestFocus('Button')
9. })
10. .key('Button')
11. .fontSize(20)
12. .width('80%')
13. .margin('10')
14. .onNeedSoftkeyboard((): boolean => {
15. return true;
16. })
17. TextInput()
18. .key('TextInput1')
19. }
20. .height('100%')
21. .width('100%')
22. }
23. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c0/v3/gURHKN8MRyabVI9WAFy_QQ/zh-cn_image_0000002599478309.gif?HW-CC-KV=V1&HW-CC-Date=20260511T034327Z&HW-CC-Expire=86400&HW-CC-Sign=2E7870D0A2A564A1A15B92D0D828DBFC65F2E6C732F91D3E87FB1391426AD12B)