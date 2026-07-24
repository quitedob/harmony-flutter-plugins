在连接指定的后台服务时作为入参，用于接收连接过程中的状态变化，如作为[connectServiceExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext#connectserviceextensionability)的入参，连接指定的ServiceExtensionAbility。

说明

本模块首批接口从API version 7开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import { common } from '@kit.AbilityKit';
```

## ConnectOptions

PhonePC/2in1TabletTVWearable

### onConnect

PhonePC/2in1TabletTVWearable

onConnect(elementName: ElementName, remote: rpc.IRemoteObject): void

建立连接时的回调函数。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| elementName | [ElementName](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-bundlemanager-elementname) | 是 | 目标Ability的elementName。 |
| remote | [rpc.IRemoteObject](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-rpc#iremoteobject) | 是 | 用于与目标Ability进行IPC通信的IRemoteObject实例。 |

**示例：**



```
1. import { UIAbility, common, Want, AbilityConstant } from '@kit.AbilityKit';
2. import { bundleManager } from '@kit.AbilityKit';
3. import { rpc } from '@kit.IPCKit';

5. let connectWant: Want = {
6. bundleName: 'com.example.myapp',
7. abilityName: 'MyAbility'
8. };

10. let connectOptions: common.ConnectOptions = {
11. onConnect(elementName: bundleManager.ElementName, remote: rpc.IRemoteObject) {
12. console.info(`onConnect elementName: ${elementName}`);
13. },
14. onDisconnect(elementName: bundleManager.ElementName) {
15. console.info(`onDisconnect elementName: ${elementName}`);
16. },
17. onFailed(code: number) {
18. console.error(`onFailed code: ${code}`);
19. }
20. };

22. class EntryAbility extends UIAbility {
23. onCreate(want: Want, launchParam: AbilityConstant.LaunchParam) {
24. let connection: number = this.context.connectServiceExtensionAbility(connectWant, connectOptions);
25. }
26. }
```

### onDisconnect

PhonePC/2in1TabletTVWearable

onDisconnect(elementName: ElementName): void

断开连接时的回调函数。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| elementName | [ElementName](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-bundlemanager-elementname) | 是 | 目标Ability的elementName。 |

**示例：**



```
1. import { UIAbility, common, Want, AbilityConstant } from '@kit.AbilityKit';
2. import { bundleManager } from '@kit.AbilityKit';
3. import { rpc } from '@kit.IPCKit';

5. let connectWant: Want = {
6. bundleName: 'com.example.myapp',
7. abilityName: 'MyAbility'
8. };

10. let connectOptions: common.ConnectOptions = {
11. onConnect(elementName: bundleManager.ElementName, remote: rpc.IRemoteObject) {
12. console.info(`onConnect elementName: ${elementName}`);
13. },
14. onDisconnect(elementName: bundleManager.ElementName) {
15. console.info(`onDisconnect elementName: ${elementName}`);
16. },
17. onFailed(code: number) {
18. console.error(`onFailed code: ${code}`);
19. }
20. };

22. class EntryAbility extends UIAbility {
23. onCreate(want: Want, launchParam: AbilityConstant.LaunchParam) {
24. let connection: number = this.context.connectServiceExtensionAbility(connectWant, connectOptions);
25. }
26. }
```

### onFailed

PhonePC/2in1TabletTVWearable

onFailed(code: number): void

连接失败时的回调函数。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| code | number | 是 | 连接指定Ability失败返回的错误码。  错误码详细介绍请参考[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)和[元能力子系统错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-ability)。  201 - The application does not have permission to call the interface.  16000001 - The specified ability does not exist.  16000002 - Incorrect ability type.  16000004 - Cannot start an invisible component.  16000005 - The specified process does not have the permission.  16000006 - Cross-user operations are not allowed.  16000008 - The crowdtesting application expires.  16000053 - The ability is not on the top of the UI.  16000055 - Installation-free timed out.  16000050 - Internal error. |

**示例：**



```
1. import { UIAbility, common, Want, AbilityConstant } from '@kit.AbilityKit';
2. import { bundleManager } from '@kit.AbilityKit';
3. import { rpc } from '@kit.IPCKit';

5. let connectWant: Want = {
6. bundleName: 'com.example.myapp',
7. abilityName: 'MyAbility'
8. };

10. let connectOptions: common.ConnectOptions = {
11. onConnect(elementName: bundleManager.ElementName, remote: rpc.IRemoteObject) {
12. console.info(`onConnect elementName: ${elementName}`);
13. },
14. onDisconnect(elementName: bundleManager.ElementName) {
15. console.info(`onDisconnect elementName: ${elementName}`);
16. },
17. onFailed(code: number) {
18. console.error(`onFailed code: ${code}`);
19. }
20. };

22. class EntryAbility extends UIAbility {
23. onCreate(want: Want, launchParam: AbilityConstant.LaunchParam) {
24. let connection: number = this.context.connectServiceExtensionAbility(connectWant, connectOptions);
25. }
26. }
```