本模块提供划词管理能力，包括创建窗口、显示窗口、移动窗口、隐藏窗口、销毁窗口、监听鼠标划词事件、获取选中文本等。

说明

* 本模块首批接口从API version 24开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。
* 本模块仅支持PC/2in1设备。
* 仅支持集成了划词扩展的应用调用。

## 导入模块

PC/2in1



```
1. import { selectionManager } from '@kit.BasicServicesKit';
```

## selectionManager

PC/2in1

**系统能力：** SystemCapability.SelectionInput.Selection

**模型约束：** 此接口仅可在Stage模型下使用。

### selectionManager.on('selectionCompleted')

PC/2in1

on(type: 'selectionCompleted', callback: Callback<SelectionInfo>): void

订阅划词完成事件。使用callback异步回调。

**系统能力：** SystemCapability.SelectionInput.Selection

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| type | string | 是 | 设置监听类型，固定取值为'selectionCompleted'。 |
| callback | Callback<[SelectionInfo](/consumer/cn/doc/harmonyos-references/js-apis-selectioninput-selectionmanager#selectioninfo)> | 是 | 回调函数，返回当前划词信息。 |

**错误码：**

以下错误码的详细介绍请参见[划词服务错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-selection)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 33600003 | The application calling the API does not match the application selected in the system settings. |

**示例：**



```
1. import { selectionManager } from '@kit.BasicServicesKit';

3. try {
4. selectionManager.on('selectionCompleted', (info: selectionManager.SelectionInfo) => {
5. console.info(`Enter the callback function.`);
6. });
7. } catch (err) {
8. console.error(`Failed to register selectionCompleted callback: ${err.code}, error message: ${err.message}`);
9. }
```

### selectionManager.off('selectionCompleted')

PC/2in1

off(type: 'selectionCompleted', callback?: Callback<SelectionInfo>): void

取消订阅划词完成事件。使用callback异步回调。

**系统能力：** SystemCapability.SelectionInput.Selection

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| type | string | 是 | 设置监听类型，固定取值为'selectionCompleted'。 |
| callback | Callback<[SelectionInfo](/consumer/cn/doc/harmonyos-references/js-apis-selectioninput-selectionmanager#selectioninfo)> | 否 | 回调函数，返回[SelectionInfo](/consumer/cn/doc/harmonyos-references/js-apis-selectioninput-selectionmanager#selectioninfo)。参数不填写时，取消订阅type对应的所有回调事件。 |

**示例：**



```
1. import { selectionManager } from '@kit.BasicServicesKit';

3. let selectionChangeCallback = (info: selectionManager.SelectionInfo) => {
4. console.info(`Enter the callback function.`);
5. };

7. selectionManager.on('selectionCompleted', selectionChangeCallback);
8. try {
9. selectionManager.off('selectionCompleted', selectionChangeCallback);
10. } catch (err) {
11. console.error(`Failed to unregister selectionCompleted: ${err.code}, error message: ${err.message}`);
12. }
```

### getSelectionContent()

PC/2in1

getSelectionContent(): Promise<string>

获取选中文本的内容。使用Promise异步回调。

**系统能力：** SystemCapability.SelectionInput.Selection

**模型约束：** 此接口仅可在Stage模型下使用。

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<string> | Promise对象，返回当前选中文本的内容。 |

**错误码：**

以下错误码的详细介绍请参见[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)和[划词服务错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-selection)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 33600001 | Selection service exception. |
| 33600004 | The interface is called too frequently. |
| 33600005 | The interface is called at the wrong time. |
| 33600006 | The current application is prohibited from accessing content. |
| 33600007 | The length of selected content is out of range. |
| 33600008 | Getting the selected content times out. |

**示例：**



```
1. import { selectionManager } from '@kit.BasicServicesKit';

3. selectionManager.on('selectionCompleted', async (info: selectionManager.SelectionInfo) => {
4. try {
5. let content = await selectionManager.getSelectionContent();
6. } catch (err) {
7. console.error(`Failed to get selection content: ${err.code}, error message: ${err.message}`);
8. }
9. });
```

### createPanel

PC/2in1

createPanel(ctx: Context, info: PanelInfo): Promise<Panel>

创建划词面板。使用Promise异步回调。

单个划词应用仅允许创建一个[主面板类型](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-selectioninput-selectionpanel#paneltype)和一个[菜单面板类型](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-selectioninput-selectionpanel#paneltype)的窗口。

**系统能力：** SystemCapability.SelectionInput.Selection

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| ctx | [Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context#context) | 是 | 当前划词面板依赖的上下文信息。 |
| info | [PanelInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-selectioninput-selectionpanel#panelinfo) | 是 | 划词面板信息。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<[Panel](/consumer/cn/doc/harmonyos-references/js-apis-selectioninput-selectionmanager#panel)> | Promise对象，返回当前创建的划词面板对象。 |

**错误码：**

以下错误码的详细介绍请参见[划词服务错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-selection)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 33600001 | Selection service exception. |
| 33600003 | The application calling the API does not match the application selected in the system settings. |

**示例：**



```
1. import { selectionManager, SelectionExtensionAbility, PanelInfo, PanelType, BusinessError } from '@kit.BasicServicesKit';
2. import { rpc } from '@kit.IPCKit';
3. import { Want } from '@kit.AbilityKit';

5. class SelectionAbilityStub extends rpc.RemoteObject {
6. constructor(des: string) {
7. super(des);
8. }
9. onRemoteMessageRequest(
10. code: number,
11. data: rpc.MessageSequence,
12. reply: rpc.MessageSequence,
13. options: rpc.MessageOption
14. ): boolean | Promise<boolean> {
15. return true;
16. }
17. }

19. class ServiceExtAbility extends SelectionExtensionAbility {
20. onConnect(want: Want): rpc.RemoteObject {
21. let panelInfo: PanelInfo = {
22. panelType: PanelType.MENU_PANEL,
23. x: 0,
24. y: 0,
25. width: 500,
26. height: 200
27. }
28. let selectionPanel: selectionManager.Panel | undefined = undefined;
29. selectionManager.createPanel(this.context, panelInfo)
30. .then((panel: selectionManager.Panel) => {
31. selectionPanel = panel;
32. console.info('Succeed in creating panel.');
33. }).catch((err: BusinessError) => {
34. console.error(`Failed to create panel: ${err.code}, error message: ${err.message}`);
35. });
36. return new SelectionAbilityStub('remote');
37. }
38. }
39. export default ServiceExtAbility;
```

### destroyPanel

PC/2in1

destroyPanel(panel: Panel): Promise<void>

销毁划词面板。使用Promise异步回调。

**系统能力：** SystemCapability.SelectionInput.Selection

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| panel | [Panel](/consumer/cn/doc/harmonyos-references/js-apis-selectioninput-selectionmanager#panel) | 是 | 要销毁的面板对象。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<void> | Promise对象，无返回结果。 |

**错误码：**

以下错误码的详细介绍请参见[划词服务错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-selection)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 33600001 | Selection service exception. |

**示例：**



```
1. import { selectionManager, SelectionExtensionAbility, PanelInfo, PanelType, BusinessError } from '@kit.BasicServicesKit';
2. import { rpc } from '@kit.IPCKit';
3. import { Want } from '@kit.AbilityKit';

5. class SelectionAbilityStub extends rpc.RemoteObject {
6. constructor(des: string) {
7. super(des);
8. }
9. onRemoteMessageRequest(
10. code: number,
11. data: rpc.MessageSequence,
12. reply: rpc.MessageSequence,
13. options: rpc.MessageOption
14. ): boolean | Promise<boolean> {
15. return true;
16. }
17. }

19. class ServiceExtAbility extends SelectionExtensionAbility {
20. onConnect(want: Want): rpc.RemoteObject {
21. let panelInfo: PanelInfo = {
22. panelType: PanelType.MENU_PANEL,
23. x: 0,
24. y: 0,
25. width: 500,
26. height: 200
27. }
28. let selectionPanel: selectionManager.Panel | undefined = undefined;

30. selectionManager.createPanel(this.context, panelInfo)
31. .then((panel: selectionManager.Panel) => {
32. console.info('Succeed in creating panel.');
33. selectionPanel = panel;
34. try {
35. if (selectionPanel) {
36. selectionManager.destroyPanel(selectionPanel).then(() => {
37. console.info('Succeed in destroying panel.');
38. }).catch((err: BusinessError) => {
39. console.error(`Failed to destroy panel: ${err.code}, error message: ${err.message}`);
40. });
41. }
42. } catch (err) {
43. console.error(`Failed to destroy panel: ${err.code}, error message: ${err.message}`);
44. }
45. }).catch((err: BusinessError) => {
46. console.error(`Failed to create panel: ${err.code}, error message: ${err.message}`);
47. });
48. return new SelectionAbilityStub('remote');
49. }
50. }
51. export default ServiceExtAbility;
```

## SelectionInfo

PC/2in1

划词事件信息。

**系统能力：** SystemCapability.SelectionInput.Selection

**模型约束：** 此接口仅可在Stage模型下使用。

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| selectionType | [SelectionType](/consumer/cn/doc/harmonyos-references/js-apis-selectioninput-selectionmanager#selectiontype) | 否 | 否 | 触发划词类型。 |
| startDisplayX | number | 否 | 否 | 划词起始位置的屏幕x轴坐标，单位为px。 |
| startDisplayY | number | 否 | 否 | 划词起始位置的屏幕y轴坐标，单位为px。 |
| endDisplayX | number | 否 | 否 | 划词结束位置的屏幕x轴坐标，单位为px。 |
| endDisplayY | number | 否 | 否 | 划词结束位置的屏幕y轴坐标，单位为px。 |
| startWindowX | number | 否 | 否 | 划词起始位置的窗口x轴坐标，单位为px。 |
| startWindowY | number | 否 | 否 | 划词起始位置的窗口y轴坐标，单位为px。 |
| endWindowX | number | 否 | 否 | 划词结束位置的窗口x轴坐标，单位为px。 |
| endWindowY | number | 否 | 否 | 划词结束位置的窗口y轴坐标，单位为px。 |
| displayID | number | 否 | 否 | 被划词应用窗口的屏幕ID。 |
| windowID | number | 否 | 否 | 被划词应用的窗口ID。 |
| bundleName | string | 否 | 否 | 被划词应用的bundleName。 |

## Panel

PC/2in1

划词面板。

**系统能力：** SystemCapability.SelectionInput.Selection

**模型约束：** 此接口仅可在Stage模型下使用。

下列API均需使用[createPanel](/consumer/cn/doc/harmonyos-references/js-apis-selectioninput-selectionmanager#createpanel)获取到Panel实例后，通过实例调用。

### setUiContent

PC/2in1

setUiContent(path: string): Promise<void>

为当前的划词面板加载具体页面内容。使用Promise异步回调。

**系统能力：** SystemCapability.SelectionInput.Selection

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| path | string | 是 | 要加载到面板中的页面内容的路径，Stage模型下该路径需添加到工程的resources/base/profile/main\_pages.json文件中，不支持FA模型。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<void> | Promise对象，无返回结果。 |

**错误码：**

以下错误码的详细介绍请参见[划词服务错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-selection)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 33600001 | Selection service exception. |
| 33600002 | This selection window has been destroyed. |

**示例：**



```
1. import { selectionManager, BusinessError } from '@kit.BasicServicesKit';

3. try {
4. selectionPanel.setUiContent('pages/Index').then(() => {
5. console.info('Succeeded in setting the content.');
6. }).catch((err: BusinessError) => {
7. console.error(`Failed to setUiContent: ${err.code}, error message: ${err.message}`);
8. });
9. } catch (err) {
10. console.error(`Failed to setUiContent: ${err.code}, error message: ${err.message}`);
11. }
```

### show

PC/2in1

show(): Promise<void>

显示划词面板。使用Promise异步回调。

**系统能力：** SystemCapability.SelectionInput.Selection

**模型约束：** 此接口仅可在Stage模型下使用。

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<void> | Promise对象，无返回结果。 |

**错误码：**

以下错误码的详细介绍请参见[划词服务错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-selection)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 33600001 | Selection service exception. |
| 33600002 | This selection window has been destroyed. |

**示例：**



```
1. import { selectionManager, BusinessError } from '@kit.BasicServicesKit';

3. selectionPanel.show().then(() => {
4. console.info('Succeeded in showing the panel.');
5. }).catch((err: BusinessError) => {
6. console.error(`Failed to show panel: ${err.code}, error message: ${err.message}`);
7. });
```

### hide

PC/2in1

hide(): Promise<void>

隐藏当前划词面板。使用Promise异步回调。

**系统能力：** SystemCapability.SelectionInput.Selection

**模型约束：** 此接口仅可在Stage模型下使用。

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<void> | Promise对象，无返回结果。 |

**错误码：**

以下错误码的详细介绍请参见[划词服务错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-selection)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 33600001 | Selection service exception. |
| 33600002 | This selection window has been destroyed. |

**示例：**



```
1. import { selectionManager, BusinessError } from '@kit.BasicServicesKit';

3. selectionPanel.hide().then(() => {
4. console.info('Succeeded in hiding the panel.');
5. }).catch((err: BusinessError) => {
6. console.error(`Failed to hide panel: ${err.code}, error message: ${err.message}`);
7. });
```

### startMoving

PC/2in1

startMoving(): Promise<void>

使当前划词面板可以随鼠标拖动位置。使用Promise异步回调。该接口需要写在onTouch的回调函数中，并且事件类型为TouchType.Down。

**系统能力：** SystemCapability.SelectionInput.Selection

**模型约束：** 此接口仅可在Stage模型下使用。

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<void> | Promise对象，无返回结果。 |

**错误码：**

以下错误码的详细介绍请参见[划词服务错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-selection)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 33600001 | Selection service exception. |
| 33600002 | This selection window has been destroyed. |

**示例：**



```
1. import { selectionManager, BusinessError } from '@kit.BasicServicesKit';

3. RelativeContainer() {
4. /*
5. * 页面布局内容，需要开发者根据实际补充
6. */
7. }
8. .onTouch((event: TouchEvent) => {
9. if (event.type === TouchType.Down) {
10. if (selectionPanel !== undefined) {
11. selectionPanel.startMoving().then(() => {   // selectionPanel为createPanel创建出的panel实例
12. console.info('Succeeded in startMoving the panel.');
13. }).catch((err: BusinessError) => {
14. console.error(`Failed to startMoving panel: ${err.code}, error message: ${err.message}`);
15. });
16. }
17. }
18. })
```

### moveToGlobalDisplay

PC/2in1

moveToGlobalDisplay(x: number, y: number): Promise<void>

移动划词面板至屏幕指定位置。使用Promise异步回调。

**系统能力：** SystemCapability.SelectionInput.Selection

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| x | number | 是 | x轴方向移动的值，单位为px。 |
| y | number | 是 | y轴方向移动的值，单位为px。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<void> | Promise对象，无返回结果。 |

**错误码：**

以下错误码的详细介绍请参见[划词服务错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-selection)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 33600001 | Selection service exception. |
| 33600002 | This selection window has been destroyed. |

**示例：**



```
1. import { selectionManager, BusinessError } from '@kit.BasicServicesKit';

3. try {
4. selectionPanel.moveToGlobalDisplay(200, 200).then(() => {
5. console.info('Succeeded in moving the panel.');
6. }).catch((err: BusinessError) => {
7. console.error(`Failed to move panel: ${err.code}, error message: ${err.message}`);
8. });
9. } catch (err) {
10. console.error(`Failed to move panel: ${err.code}, error message: ${err.message}`);
11. }
```

### on('destroyed')

PC/2in1

on(type: 'destroyed', callback: Callback<void>): void

订阅划词窗口销毁事件。使用callback异步回调。

**系统能力：** SystemCapability.SelectionInput.Selection

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| type | string | 是 | 设置监听类型，固定取值为'destroyed'。 |
| callback | Callback<void> | 是 | 回调函数，返回值为空。 |

**示例：**



```
1. import { selectionManager, BusinessError } from '@kit.BasicServicesKit';

3. try {
4. selectionPanel.on('destroyed', () => {
5. console.info('Panel has been destroyed.');
6. });
7. } catch (err) {
8. console.error(`Failed to register destroyed callback: ${err.code}, error message: ${err.message}`);
9. }
```

### off('destroyed')

PC/2in1

off(type: 'destroyed', callback?: Callback<void>): void

取消订阅划词窗口销毁事件。使用callback异步回调。

**系统能力：** SystemCapability.SelectionInput.Selection

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| type | string | 是 | 设置监听类型，固定取值为'destroyed'。 |
| callback | Callback<void> | 否 | 回调函数，返回值为空。参数不填写时，取消订阅type对应的所有回调事件。 |

**示例：**



```
1. import { selectionManager, BusinessError } from '@kit.BasicServicesKit';

3. try {
4. selectionPanel.off('destroyed');
5. } catch (err) {
6. console.error(`Failed to unregister destroyed: ${err.code}, error message: ${err.message}`);
7. }
```

### on('hidden')

PC/2in1

on(type: 'hidden', callback: Callback<void>): void

订阅划词窗口隐藏事件。使用callback异步回调。

**系统能力：** SystemCapability.SelectionInput.Selection

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| type | string | 是 | 设置监听类型，固定取值为'hidden'。 |
| callback | Callback<void> | 是 | 回调函数，返回值为空。 |

**示例：**



```
1. import { selectionManager, BusinessError } from '@kit.BasicServicesKit';

3. try {
4. selectionPanel.on('hidden', () => {
5. console.info('Panel has been hidden.');
6. });
7. } catch (err) {
8. console.error(`Failed to register hidden callback: ${err.code}, error message: ${err.message}`);
9. }
```

### off('hidden')

PC/2in1

off(type: 'hidden', callback?: Callback<void>): void

取消订阅划词窗口隐藏事件。使用callback异步回调。

**系统能力：** SystemCapability.SelectionInput.Selection

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| type | string | 是 | 设置监听类型，固定取值为'hidden'。 |
| callback | Callback<void> | 否 | 回调函数，返回值为空。参数不填写时，取消订阅type对应的所有回调事件。 |

**示例：**



```
1. import { selectionManager, BusinessError } from '@kit.BasicServicesKit';

3. try {
4. selectionPanel.off('hidden');
5. } catch (err) {
6. console.error(`Failed to unregister hidden: ${err.code}, error message: ${err.message}`);
7. }
```

## SelectionType

PC/2in1

定义触发划词的类型枚举。

**系统能力：** SystemCapability.SelectionInput.Selection

**模型约束：** 此接口仅可在Stage模型下使用。

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| MOUSE\_MOVE | 1 | 滑动选词类型。 |
| DOUBLE\_CLICK | 2 | 双击选词类型。 |
| TRIPLE\_CLICK | 3 | 三击选词类型。 |