创建并显示文本提示框、对话框和操作菜单。

说明

从API version 9 开始，该接口不再维护，推荐使用新接口[@ohos.promptAction (弹窗)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-promptaction)。

本模块首批接口从API version 8开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import prompt from '@ohos.prompt'
```

## prompt.showToast

PhonePC/2in1TabletTVWearable

showToast(options: ShowToastOptions): void

创建并显示文本提示框。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| options | [ShowToastOptions](/consumer/cn/doc/harmonyos-references/js-apis-prompt#showtoastoptions) | 是 | 文本弹窗选项。 |

**示例：**



```
1. import prompt from '@ohos.prompt'
2. prompt.showToast({
3. message: 'Message Info',
4. duration: 2000
5. });
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/3a/v3/MYzmXQzTSSWIkVOnCY-KIA/zh-cn_image_0000002599358351.gif?HW-CC-KV=V1&HW-CC-Date=20260511T034221Z&HW-CC-Expire=86400&HW-CC-Sign=8EA1F343273EF38B9AE0B5EFC5A488E9AE7FDBEB0B823851680B0739AC70ED5C)

## ShowToastOptions

PhonePC/2in1TabletTVWearable

文本提示框的选项。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full。

展开

| 名称 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| message | string | 是 | 显示的文本信息。 |
| duration | number | 否 | 默认值1500ms，取值区间：1500ms-10000ms。若小于1500ms则取默认值，若大于10000ms则取上限值10000ms。 |
| bottom | string| number | 否 | 设置弹窗边框距离屏幕底部的位置，无上限值，默认单位vp。 |

## prompt.showDialog

PhonePC/2in1TabletTVWearable

showDialog(options: ShowDialogOptions): Promise<ShowDialogSuccessResponse>

创建并显示对话框，对话框响应后同步返回结果。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| options | [ShowDialogOptions](/consumer/cn/doc/harmonyos-references/js-apis-prompt#showdialogoptions) | 是 | 对话框选项。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<[ShowDialogSuccessResponse](/consumer/cn/doc/harmonyos-references/js-apis-prompt#showdialogsuccessresponse)> | 对话框响应结果。 |

**示例：**



```
1. import prompt from '@ohos.prompt'
2. prompt.showDialog({
3. title: 'Title Info',
4. message: 'Message Info',
5. buttons: [
6. {
7. text: 'button1',
8. color: '#000000'
9. },
10. {
11. text: 'button2',
12. color: '#000000'
13. }
14. ],
15. })
16. .then(data => {
17. console.info('showDialog success, click button: ' + data.index);
18. })
19. .catch((err:Error) => {
20. console.info('showDialog error: ' + err);
21. })
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f2/v3/3kvpl95ZT6-7RGVBRm4WTw/zh-cn_image_0000002599358315.gif?HW-CC-KV=V1&HW-CC-Date=20260511T034221Z&HW-CC-Expire=86400&HW-CC-Sign=CFAAB4D8136772D064DA3CA5614F8A34CE4D6193F62EA5250502F2E1824DEC87)

## prompt.showDialog

PhonePC/2in1TabletTVWearable

showDialog(options: ShowDialogOptions, callback: AsyncCallback<ShowDialogSuccessResponse>):void

创建并显示对话框，对话框响应结果异步返回。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| options | [ShowDialogOptions](/consumer/cn/doc/harmonyos-references/js-apis-prompt#showdialogoptions) | 是 | 页面显示对话框信息描述。 |
| callback | AsyncCallback<[ShowDialogSuccessResponse](/consumer/cn/doc/harmonyos-references/js-apis-prompt#showdialogsuccessresponse)> | 是 | 对话框响应结果回调。 |

**示例：**



```
1. import prompt from '@ohos.prompt'
2. prompt.showDialog({
3. title: 'showDialog Title Info',
4. message: 'Message Info',
5. buttons: [
6. {
7. text: 'button1',
8. color: '#000000'
9. },
10. {
11. text: 'button2',
12. color: '#000000'
13. }
14. ]
15. }, (err, data) => {
16. if (err) {
17. console.info('showDialog err: ' + err);
18. return;
19. }
20. console.info('showDialog success callback, click button: ' + data.index);
21. });
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4a/v3/tw5YSEM7TnafC_rl5WYCag/zh-cn_image_0000002568918720.gif?HW-CC-KV=V1&HW-CC-Date=20260511T034221Z&HW-CC-Expire=86400&HW-CC-Sign=E60B983420D89F610A99ED442C5E934BAD23B92CDF5876B24EEB0F7708584001)

## ShowDialogOptions

PhonePC/2in1TabletTVWearable

对话框的选项。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| title | string | 否 | 标题文本。 |
| message | string | 否 | 内容文本。 |
| buttons | [[Button](/consumer/cn/doc/harmonyos-references/js-apis-prompt#button),[Button](/consumer/cn/doc/harmonyos-references/js-apis-prompt#button)?,[Button](/consumer/cn/doc/harmonyos-references/js-apis-prompt#button)?] | 否 | 对话框中按钮的数组，结构为：{text:'button', color: '#666666'}，支持1-3个按钮。其中第一个为positiveButton，第二个为negativeButton，第三个为neutralButton。 |

## ShowDialogSuccessResponse

PhonePC/2in1TabletTVWearable

对话框的响应结果。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| index | number | 是 | 选中按钮在buttons数组中的索引。 |

## prompt.showActionMenu

PhonePC/2in1TabletTVWearable

showActionMenu(options: ActionMenuOptions, callback: AsyncCallback<ActionMenuSuccessResponse>):void

创建并显示操作菜单，菜单响应结果异步返回。

**系统能力：** 以下各项对应的系统能力均为SystemCapability.ArkUI.ArkUI.Full。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| options | [ActionMenuOptions](/consumer/cn/doc/harmonyos-references/js-apis-prompt#actionmenuoptions) | 是 | 操作菜单选项。 |
| callback | AsyncCallback<[ActionMenuSuccessResponse](/consumer/cn/doc/harmonyos-references/js-apis-prompt#actionmenusuccessresponse)> | 是 | 菜单响应结果回调。 |

**示例：**



```
1. import prompt from '@ohos.prompt'
2. prompt.showActionMenu({
3. title: 'Title Info',
4. buttons: [
5. {
6. text: 'item1',
7. color: '#666666'
8. },
9. {
10. text: 'item2',
11. color: '#000000'
12. },
13. ]
14. }, (err, data) => {
15. if (err) {
16. console.info('showActionMenu err: ' + err);
17. return;
18. }
19. console.info('showActionMenu success callback, click button: ' + data.index);
20. })
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5c/v3/Nc_l2hEKQj2WPFIqGIs-ag/zh-cn_image_0000002599358317.gif?HW-CC-KV=V1&HW-CC-Date=20260511T034221Z&HW-CC-Expire=86400&HW-CC-Sign=B89B6FB727A97D785D566734F510B542C43029C6BF3AA2DED45DC1DB20302176)

## prompt.showActionMenu

PhonePC/2in1TabletTVWearable

showActionMenu(options: ActionMenuOptions): Promise<ActionMenuSuccessResponse>

创建并显示操作菜单，菜单响应后同步返回结果。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| options | [ActionMenuOptions](/consumer/cn/doc/harmonyos-references/js-apis-prompt#actionmenuoptions) | 是 | 操作菜单选项。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<[ActionMenuSuccessResponse](/consumer/cn/doc/harmonyos-references/js-apis-prompt#actionmenusuccessresponse)> | 菜单响应结果。 |

**示例：**



```
1. import prompt from '@ohos.prompt'
2. prompt.showActionMenu({
3. title: 'showActionMenu Title Info',
4. buttons: [
5. {
6. text: 'item1',
7. color: '#666666'
8. },
9. {
10. text: 'item2',
11. color: '#000000'
12. },
13. ]
14. })
15. .then(data => {
16. console.info('showActionMenu success, click button: ' + data.index);
17. })
18. .catch((err:Error) => {
19. console.info('showActionMenu error: ' + err);
20. })
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ac/v3/hlZY-9TBQhaS51j_pF9iXg/zh-cn_image_0000002599478265.gif?HW-CC-KV=V1&HW-CC-Date=20260511T034221Z&HW-CC-Expire=86400&HW-CC-Sign=6AB8DAC2C64B3D7F7225E415768DBD4CF7040BC89D6BEEDACFABFC6F1FA0157E)

## ActionMenuOptions

PhonePC/2in1TabletTVWearable

操作菜单的选项。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full。

展开

| 名称 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| title | string | 否 | 标题文本。 |
| buttons | [[Button](/consumer/cn/doc/harmonyos-references/js-apis-prompt#button),[Button](/consumer/cn/doc/harmonyos-references/js-apis-prompt#button)?,[Button](/consumer/cn/doc/harmonyos-references/js-apis-prompt#button)?,[Button](/consumer/cn/doc/harmonyos-references/js-apis-prompt#button)?,[Button](/consumer/cn/doc/harmonyos-references/js-apis-prompt#button)?,[Button](/consumer/cn/doc/harmonyos-references/js-apis-prompt#button)?] | 是 | 菜单中菜单项按钮的数组，结构为：{text:'button', color: '#666666'}，支持1-6个按钮。大于6个按钮时弹窗不显示。 |

## ActionMenuSuccessResponse

PhonePC/2in1TabletTVWearable

操作菜单的响应结果。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| index | number | 是 | 选中按钮在buttons数组中的索引，从0开始。 |

## Button

PhonePC/2in1TabletTVWearable

菜单中的菜单项按钮。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| text | string | 是 | 按钮文本内容。 |
| color | string | 是 | 按钮文本颜色。 |