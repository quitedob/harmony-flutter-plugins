SelectionExtensionContext是[SelectionExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-selectioninput-selectionextensionability)的上下文，继承自[ExtensionContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-extensioncontext)。

每个SelectionExtensionAbility组件实例化时，系统都会自动创建对应的SelectionExtensionContext。开发者可以通过SelectionExtensionContext拉起同应用内其他Ability。

说明

* 本模块首批接口从API version 24开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。
* 本模块仅支持PC/2in1设备。

## 导入模块

PC/2in1



```
1. import { SelectionExtensionContext } from '@kit.BasicServicesKit';
```

## SelectionExtensionContext

PC/2in1

**系统能力：** SystemCapability.SelectionInput.Selection

**模型约束：** 此接口仅可在Stage模型下使用。

### startAbility

PC/2in1

startAbility(want: Want): Promise<void>

拉起目标应用。使用Promise异步回调。

**系统能力：** SystemCapability.SelectionInput.Selection

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| want | [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want#want) | 是 | 想要被拉起的应用信息，包括Ability名称、Bundle名称等。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<void> | Promise对象，无返回结果。 |

**错误码：**

以下错误码的详细介绍请参见[元能力子系统错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-ability)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 16000001 | The specified ability does not exist. |
| 16000002 | Incorrect ability type. |
| 16000004 | Cannot start an invisible component. |
| 16000005 | The specified process does not have the permission. |
| 16000006 | Cross-user operations are not allowed. |
| 16000008 | The crowdtesting application expires. |
| 16000009 | An ability cannot be started or stopped in Wukong mode. |
| 16000010 | The call with the continuation and prepare continuation flag is forbidden. |
| 16000011 | The context does not exist. |
| 16000012 | The application is controlled. |
| 16000013 | The application is controlled by EDM. |
| 16000019 | No matching ability is found. |
| 16000050 | Internal error. |
| 16000053 | The ability is not on the top of the UI. |
| 16000055 | Installation-free timed out. |
| 16000061 | Operation not supported. |
| 16000069 | The extension cannot start the third party application. |
| 16000070 | The extension cannot start the service. |
| 16000083 | The ExtensionAbility cannot start the ability due to system control. |
| 16200001 | The caller has been released. |

**示例：**



```
1. import { SelectionExtensionAbility, BusinessError } from '@kit.BasicServicesKit';
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
15. console.info(`onRemoteMessageRequest code: ${code}`);
16. return true;
17. }
18. }

20. class SelectionExtAbility extends SelectionExtensionAbility {
21. onConnect(want: Want): rpc.RemoteObject {
22. try {
23. let wantAbility: Want = {
24. bundleName: "com.selection.selectionapplication",
25. abilityName: "EntryAbility",
26. };
27. this.context.startAbility(wantAbility).then(() => {
28. console.info(`startAbility success`);
29. }).catch((err: BusinessError) => {
30. console.error(`startAbility error: ${err.code}, error message: ${err.message}`);
31. })
32. } catch (err) {
33. console.error(`startAbility error: ${err.code}, error message: ${err.message}`);
34. }
35. return new SelectionAbilityStub('remote');
36. }
37. }
```