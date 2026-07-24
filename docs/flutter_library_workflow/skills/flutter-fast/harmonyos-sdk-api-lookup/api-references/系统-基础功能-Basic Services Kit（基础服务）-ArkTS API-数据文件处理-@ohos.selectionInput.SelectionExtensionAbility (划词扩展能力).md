本模块提供划词扩展功能，用于用户通过鼠标、触控板等方式选择文本后的搜索、翻译等场景。

说明

* 本模块首批接口从API version 24开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。
* 本模块仅支持PC/2in1设备。

## 导入模块

PC/2in1



```
1. import { SelectionExtensionAbility } from '@kit.BasicServicesKit';
```

## SelectionExtensionAbility

PC/2in1

**系统能力：** SystemCapability.SelectionInput.Selection

**模型约束：** 此接口仅可在Stage模型下使用。

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| context | [SelectionExtensionContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-selectioninput-selectionextensioncontext) | 否 | 否 | SelectionExtensionAbility的上下文环境，继承自[ExtensionContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-extensioncontext)。 |

### onConnect

PC/2in1

onConnect(want: Want): rpc.RemoteObject

当SelectionExtensionAbility实例完成创建时，系统会触发该回调，开发者可在该回调中执行初始化逻辑（如定义变量、加载资源、监听划词事件等）。

**系统能力：** SystemCapability.SelectionInput.Selection

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| want | [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want#want) | 是 | 当前SelectionExtensionAbility的Want类型信息，包括Ability名称、Bundle名称等。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [rpc.RemoteObject](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-rpc#iremoteobject) | RemoteObject对象，用于客户端和服务端通信。 |

**示例：**



```
1. import { SelectionExtensionAbility } from '@kit.BasicServicesKit';
2. import { rpc } from '@kit.IPCKit';
3. import { Want } from '@kit.AbilityKit';
4. import { hilog } from '@kit.PerformanceAnalysisKit';

6. const TAG: string = '[SelectionExtensionAbility]';

8. class StubTest extends rpc.RemoteObject {
9. constructor(des: string) {
10. super(des);
11. }
12. onConnect(code: number, data: rpc.MessageSequence, reply: rpc.MessageSequence, option: rpc.MessageOption) {
13. }
14. }

16. class ServiceExtAbility extends SelectionExtensionAbility {
17. onConnect(want: Want): rpc.RemoteObject {
18. hilog.info(0x0000, TAG, `onConnect, want: ${want.abilityName}`);
19. return new StubTest('test');
20. }
21. }
```

### onDisconnect

PC/2in1

onDisconnect(): void

当SelectionExtensionAbility实例被销毁（例如用户关闭划词开关或切换划词应用）时，系统触发该回调。开发者可以在该生命周期中执行资源清理、数据保存等相关操作。使用同步回调或Promise异步回调。

在执行完onDisconnect生命周期回调后，应用可能会退出，从而可能导致onDisconnect中的异步函数未能正确执行，比如异步写入数据库。推荐使用Promise异步回调，避免因应用退出导致onDisconnect中的异步函数（比如异步写入数据库）未能正确执行。

仅当SelectionExtensionAbility正常退出时会触发该回调，异常退出场景（例如低内存终止进程）不会触发该回调。

**系统能力：** SystemCapability.SelectionInput.Selection

**模型约束：** 此接口仅可在Stage模型下使用。

**示例：**



```
1. import { SelectionExtensionAbility } from '@kit.BasicServicesKit';
2. import { hilog } from '@kit.PerformanceAnalysisKit';

4. const TAG: string = '[SelectionExtensionAbility]';

6. class ServiceExtAbility extends SelectionExtensionAbility {
7. onDisconnect(): void {
8. hilog.info(0x0000, TAG, `onDisconnect`);
9. }
10. }
```