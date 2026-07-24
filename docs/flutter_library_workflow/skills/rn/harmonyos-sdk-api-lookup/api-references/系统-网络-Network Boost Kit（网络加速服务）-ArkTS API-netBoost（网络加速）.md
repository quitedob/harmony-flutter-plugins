本模块提供应用场景描述接口，使系统能够结合应用上报的业务场景与实时网络状态，动态适配业务加速或低功耗传输策略，从而为用户提供高速、低时延的网络体验。

**起始版本：** 6.0.0(20)

## 导入模块

PhonePC/2in1Tablet



```
1. import { netBoost } from '@kit.NetworkBoostKit';
```

## netBoost.setSceneDesc

PhonePC/2in1Tablet

setSceneDesc(sceneDesc : SceneDesc): void

设置业务场景。

**需要权限：** ohos.permission.INTERNET

**系统能力:** SystemCapability.Communication.NetworkBoost.Core

**起始版本:** 6.0.0(20)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| sceneDesc | [SceneDesc](/consumer/cn/doc/harmonyos-references/networkboost-netboost#scenedesc) | 是 | 要设置的业务场景信息。 |

**错误码：**

以下错误码的详细介绍请参见[ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/networkboost-arkts-errorcode)和[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 201 | Permission denied. |
| 1013600001 | Internal error. For example, the internal management state machine is abnormal, or the internal message queue processing is blocked. |
| 1013600002 | System service error. For example, IPC call processes fails, or the network management service failed to start. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';
2. import { netBoost } from '@kit.NetworkBoostKit';
3. try {
4. let sceneDesc : netBoost.SceneDesc = {
5. scene : 'realtimeVoice',
6. sceneEvent : netBoost.SceneEvent.SCENE_EVENT_ENTER
7. }
8. netBoost.setSceneDesc(sceneDesc);
9. } catch (err) {
10. console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
11. }
```

## netBoost.setLowPowerMode

PhonePC/2in1Tablet

setLowPowerMode(isEnable : boolean): void

设置低功耗模式。

**模型约束：** 此接口仅可在Stage模型下使用。

**需要权限：** ohos.permission.INTERNET

**系统能力:** SystemCapability.Communication.NetworkBoost.Core

**起始版本:** 6.1.1(24)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| isEnable | boolean | 是 | 待设置的低功耗模式开关。  - true表示打开低功耗模式开关。  - false表示关闭低功耗模式开关，默认为false。 |

**错误码：**

以下错误码的详细介绍请参见[ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/networkboost-arkts-errorcode)和[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 201 | Permission denied. |
| 1013600001 | Internal error. For example, the internal management state machine is abnormal, or the internal message queue processing is blocked. |
| 1013600002 | System service error. For example, IPC call processes fails, or the network management service failed to start. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';
2. import { netBoost } from '@kit.NetworkBoostKit';
3. try {
4. let lowPower = true;
5. netBoost.setLowPowerMode(lowPower);
6. } catch (err) {
7. console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
8. }
```

## SceneDesc

PhonePC/2in1Tablet

业务场景描述信息。

**系统能力：** SystemCapability.Communication.NetworkBoost.Core

**起始版本：** 6.0.0(20)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| scene | [netQuality.ServiceType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/networkboost-netquality#servicetype) | 是 | 表示业务场景类型。 |
| sceneEvent | [SceneEvent](/consumer/cn/doc/harmonyos-references/networkboost-netboost#sceneevent) | 是 | 表示业务场景事件。 |
| startTime | number | 否 | 表示要经过多长时间进入到sceneEvent事件，单位为s。  - 0表示立即发生sceneEvent事件，默认为0。  - 大于0表示预测未来多长时间进入sceneEvent事件。 |
| duration | number | 否 | 预计持续的时长，单位为s。0表示持续时长未知，以SceneEvent的离开事件表示终止。  例如应用即将在10s后进入秒杀场景，预计持续20s，scene可以传入'seckillService'类型，sceneEvent填写SCENE\_EVENT\_ENTER，startTime可填写10，duration填写20。开发者可以依据实际的场景类型进行选填。 |

## SceneEvent

PhonePC/2in1Tablet

表示业务事件枚举。

**系统能力：** SystemCapability.Communication.NetworkBoost.Core

**起始版本：** 6.0.0(20)

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| SCENE\_EVENT\_ENTER | 0 | 进入业务场景。 |
| SCENE\_EVENT\_UPDATE | 1 | 更新上一次的业务事件信息。 |
| SCENE\_EVENT\_LEAVE | 2 | 离开业务场景。 |