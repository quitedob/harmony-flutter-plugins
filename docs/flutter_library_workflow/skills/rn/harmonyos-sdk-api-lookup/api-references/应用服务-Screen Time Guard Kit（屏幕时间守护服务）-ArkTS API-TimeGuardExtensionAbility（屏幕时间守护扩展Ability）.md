TimeGuardExtensionAbility是屏幕时间守护扩展Ability，提供extension回调，支持开发者在策略管控生效和策略停止时执行特定逻辑，以及支持开发者用户授予应用权限和取消应用授权时执行特定逻辑。TimeGuardExtensionAbility继承自[ExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-extensionability)。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.ScreenTimeGuard.GuardService

**起始版本：** 6.0.0(20)

## 导入模块

PhoneTablet



```
1. import { TimeGuardExtensionAbility } from '@kit.ScreenTimeGuardKit';
```

## 属性

PhoneTablet

**模型约束：** 属性仅可在Stage模型下使用。

**系统能力：** SystemCapability.ScreenTimeGuard.GuardService

**起始版本：** 6.0.0(20)

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| context | [TimeGuardExtensionContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/screentimeguard-timeguardextensioncontext) | 否 | 否 | [TimeGuardExtensionContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/screentimeguard-timeguardextensioncontext)上下文环境，继承自[ExtensionContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-extensioncontext)。 |

## onStart

PhoneTablet

onStart(strategyName: string): Promise<void>

应用所启动的策略管控生效时，执行该回调。使用Promise异步回调。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.ScreenTimeGuard.GuardService

**起始版本：** 6.0.0(20)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| strategyName | string | 是 | 生效的时间管控策略名称。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<void> | Promise对象，无返回结果。 |

**示例：**



```
1. import { TimeGuardExtensionAbility } from '@kit.ScreenTimeGuardKit';

3. let index = 0;
4. export default class EntryAbility extends TimeGuardExtensionAbility {
5. async onStart(strategyName: string): Promise<void> {
6. console.info('test --- onStart', strategyName, index++);
7. }
8. }
```

## onStop

PhoneTablet

onStop(strategyName: string): Promise<void>

应用所启动的策略管控效果结束时，执行该回调。使用Promise异步回调。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.ScreenTimeGuard.GuardService

**起始版本：** 6.0.0(20)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| strategyName | string | 是 | 结束的时间管控策略名称。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<void> | Promise对象，无返回结果。 |

**示例：**



```
1. import { TimeGuardExtensionAbility } from '@kit.ScreenTimeGuardKit';

3. let index = 0;
4. export default class EntryAbility extends TimeGuardExtensionAbility {
5. async onStop(strategyName: string): Promise<void> {
6. console.info('test --- onStop', strategyName, index++);
7. }
8. }
```

## onUserAuthSwitchOn

PhoneTablet

onUserAuthSwitchOn(): Promise<void>

当用户在“设置 > 健康使用设备 > 可访问健康使用设备的应用”中授予应用授权时，应用接收该回调。使用Promise异步回调。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.ScreenTimeGuard.GuardService

**起始版本：** 6.0.0(20)

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<void> | Promise对象，无返回结果。 |

**示例：**



```
1. import { TimeGuardExtensionAbility } from '@kit.ScreenTimeGuardKit';

3. let index = 0;
4. export default class EntryAbility extends TimeGuardExtensionAbility {
5. async onUserAuthSwitchOn(): Promise<void> {
6. console.info('test --- onUserAuthSwitchOn', this.context, index++);
7. }
8. }
```

## onUserAuthSwitchOff

PhoneTablet

onUserAuthSwitchOff(): Promise<void>

当用户在“设置 > 健康使用设备 > 可访问健康使用设备的应用”中撤销应用授权时，应用接收该回调。使用Promise异步回调。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.ScreenTimeGuard.GuardService

**起始版本：** 6.0.0(20)

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<void> | Promise对象，无返回结果。 |

**示例：**



```
1. import { TimeGuardExtensionAbility } from '@kit.ScreenTimeGuardKit';

3. let index = 0;
4. export default class EntryAbility extends TimeGuardExtensionAbility {
5. async onUserAuthSwitchOff(): Promise<void> {
6. console.info('test --- onUserAuthSwitchOff', this.context, index++);
7. }
8. }
```