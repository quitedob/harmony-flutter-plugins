说明

定位扩展Ability目前为预留能力，暂未开放使用。

RemoteLocationExtensionAbility为定位扩展Ability，提供获取定位类场景化消息数据和生命周期销毁的回调。在用户授权后，定位扩展Ability可以查询用户的位置，并根据您的目的进行处理。定位扩展Ability有如下约束：

* RemoteLocationExtensionAbility为独立子进程，轻量级，不允许唤醒主进程。
* 不允许调用通知API、卡片API。
* 生命周期根据场景受控，默认小于10秒，超过10秒子进程生命周期结束。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.Push.PushService

**起始版本：** 4.1.0(11)

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import { RemoteLocationExtensionAbility } from '@kit.PushKit';
```

## 属性

PhonePC/2in1TabletTVWearable

**模型约束：** 属性仅可在Stage模型下使用。

**系统能力：** SystemCapability.Push.PushService

**设备行为差异：** 该属性在Phone、Tablet、PC/2in1中可正常使用，在其他设备类型中无效果。

**起始版本：** 4.1.0(11)

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| context | [RemoteLocationExtensionContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-location-context) | 否 | 否 | RemoteLocationExtensionAbility的上下文环境，继承自[ExtensionContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-extensioncontext)。 |

## onReceiveMessage

PhonePC/2in1TabletTVWearable

onReceiveMessage(payload: pushCommon.PushPayload): Promise<void>

应用先继承RemoteLocationExtensionAbility后接收场景化消息的接口，使用Promise异步回调。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.Push.PushService

**设备行为差异：** 该接口在Phone、Tablet、PC/2in1中可正常调用，在其他设备类型中无效果。

**起始版本：** 4.1.0(11)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| payload | pushCommon.[PushPayload](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/push-pushcommon#pushpayload) | 是 | 场景化消息数据。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<void> | Promise对象。无返回结果的Promise对象。 |

**示例：**



```
1. import { RemoteLocationExtensionAbility, pushCommon } from '@kit.PushKit';
2. import { hilog } from '@kit.PerformanceAnalysisKit';

4. // 此处以TestExtAbility继承RemoteLocationExtensionAbility为例
5. export default class TestExtAbility extends RemoteLocationExtensionAbility {
6. async onReceiveMessage(payload: pushCommon.PushPayload): Promise<void> {
7. hilog.info(0x0000, 'testTag', 'TestExtAbility onReceiveMessage, payload : %{public}s', JSON.stringify(payload));
8. }
9. }
```

## onDestroy

PhonePC/2in1TabletTVWearable

onDestroy(): void

当RemoteLocationExtensionAbility生命周期结束时，会执行该回调，建议在该方法中执行资源清理等操作。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.Push.PushService

**设备行为差异：** 该接口在Phone、Tablet、PC/2in1中可正常调用，在其他设备类型中无效果。

**起始版本：** 4.1.0(11)

**示例：**



```
1. import { RemoteLocationExtensionAbility } from '@kit.PushKit';
2. import { hilog } from '@kit.PerformanceAnalysisKit';

4. // 此处以TestExtAbility继承RemoteLocationExtensionAbility为例
5. export default class TestExtAbility extends RemoteLocationExtensionAbility {
6. onDestroy(): void {
7. hilog.info(0x0000, 'testTag', 'TestExtAbility onDestroy');
8. }
9. }
```