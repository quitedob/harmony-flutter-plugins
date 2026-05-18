本模块提供穿戴设备侧三方应用订阅手表和手机连接状态的能力。

**起始版本**：6.1.1(24)

## 导入模块

WearableLite Wearable



```
1. import WearEngineLite from '@hms.health.WearEngineLite';
```

## onConnectionStateChange

WearableLite Wearable

static onConnectionStateChange(callback: MonitorEventCallback): void

监听设备状态变化，使用callback异步回调。

**模型约束：** 此接口仅可在FA模型下使用。

**系统能力：** SystemCapability.Health.WearEngine.Lite

**设备行为差异：** 该接口在wearable、litewearable中可正常调用，在其他设备类型中无效果。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| callback | [MonitorEventCallback](/consumer/cn/doc/harmonyos-references/wearenginelite_api#monitoreventcallback) | 是 | 回调函数，返回设备状态的变化信息。 |

**示例：**



```
1. let eventCallback = {
2. // 事件变化回调（设备连接状态变化时触发）
3. eventChange: (data) => {
4. console.info(`设备连接状态事件：${data.event}， 设备连接状态变化：${data.data.data}`);
5. },

7. success: (code, data) => {
8. console.info(`订阅成功， Code：${code.code}， data：${data.data}`);
9. },

11. fail: (error, errorMessage) => {
12. console.error(`订阅失败， Code：${error.code}， data：${errorMessage.data}`);
13. }
14. };

16. WearEngineLite.onConnectionStateChange(eventCallback);
```

## offConnectionStateChange

WearableLite Wearable

static offConnectionStateChange(callback: MonitorEventCallback): void

取消监听设备状态变化，使用callback异步回调。

**模型约束：** 此接口仅可在FA模型下使用。

**系统能力：** SystemCapability.Health.WearEngine.Lite

**设备行为差异：** 该接口在wearable、litewearable中可正常调用，在其他设备类型中无效果。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| callback | [MonitorEventCallback](/consumer/cn/doc/harmonyos-references/wearenginelite_api#monitoreventcallback) | 否 | 回调函数。返回success表示取消订阅成功，返回fail表示取消订阅失败。 |

**示例：**



```
1. let eventCallback = {
2. success: (code, data) => {
3. console.info(`取消订阅成功， code：${code.code}， data：${data.data}`);
4. },

6. fail: (error, errorMessage) => {
7. console.error(`取消订阅失败， code:${error.code}， data:${errorMessage.data}`);
8. }
9. };

11. WearEngineLite.offConnectionStateChange(eventCallback);
```

## MonitorEventCallback

WearableLite Wearable

作为[onConnectionStateChange](/consumer/cn/doc/harmonyos-references/wearenginelite_api#onconnectionstatechange)接口的入参，当订阅监听的事件触发时，将变化后的设备状态信息传递给回调函数；作为[offConnectionStateChange](/consumer/cn/doc/harmonyos-references/wearenginelite_api#offconnectionstatechange)接口的入参，用于取消监听设备连接状态的变化。

### eventChange

WearableLite Wearable

eventChange(data: MonitorEventData): void

监听设备状态变化的事件。

**模型约束：** 此接口仅可在FA模型下使用。

**系统能力：** SystemCapability.Health.WearEngine.Lite

**设备行为差异：** 该接口在wearable、litewearable中可正常调用，在其他设备类型中无效果。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| data | [MonitorEventData](/consumer/cn/doc/harmonyos-references/wearenginelite_api#monitoreventdata) | 是 | 变化后的设备状态信息。 |

**示例：**



```
1. let eventCallback = {
2. // 事件变化回调（设备连接状态变化时触发）
3. eventChange: (data) => {
4. console.info(`设备连接状态事件：${data.event}， 设备连接状态变化：${data.data.data}`);
5. }
6. };

8. WearEngineLite.onConnectionStateChange(eventCallback);
```

### success

WearableLite Wearable

success(code: number, data?: string): void

表示订阅成功或者是取消订阅成功。

**模型约束：** 此接口仅可在FA模型下使用。

**系统能力：** SystemCapability.Health.WearEngine.Lite

**设备行为差异：** 该接口在wearable、litewearable中可正常调用，在其他设备类型中无效果。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| code | number | 是 | 返回0。 |
| data | string | 否 | 返回success。 |

**示例：**



```
1. let eventCallback = {
2. success: (code, data) => {
3. console.info(`订阅成功， Code：${code.code}， data：${data.data}`);
4. }
5. };

7. WearEngineLite.onConnectionStateChange(eventCallback);
```

### fail

WearableLite Wearable

fail(code: number, data?: string): void

表示订阅失败或者是取消订阅失败。

**模型约束：** 此接口仅可在FA模型下使用。

**系统能力：** SystemCapability.Health.WearEngine.Lite

**设备行为差异：** 该接口在wearable、litewearable中可正常调用，在其他设备类型中无效果。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| code | number | 是 | 返回401错误码。 |
| data | string | 否 | 返回fail。 |

**示例：**



```
1. let eventCallback = {
2. fail: (error, errorMessage) => {
3. console.error(`订阅失败， Code：${error.code}， data：${errorMessage.data}`);
4. }
5. };

7. WearEngineLite.onConnectionStateChange(eventCallback);
```

## MonitorData

WearableLite Wearable

设备的状态信息。

**模型约束：** 此接口仅可在FA模型下使用。

**系统能力：** SystemCapability.Health.WearEngine.Lite

**起始版本：** 6.1.1(24)

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| code | number | 否 | 否 | 扩展字段。 |
| data | string | 否 | 是 | 设备的连接状态，2表示连接成功，3表示连接断开。 |

## MonitorEventData

WearableLite Wearable

作为[eventChange](/consumer/cn/doc/harmonyos-references/wearenginelite_api#eventchange)的参数，当订阅监听的事件触发时，将设备状态的变化信息传递给回调函数。

**模型约束：** 此接口仅可在FA模型下使用。

**系统能力：** SystemCapability.Health.WearEngine.Lite

**起始版本：** 6.1.1(24)

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| event | string | 否 | 否 | 回调函数上报的监听事件。 |
| data | [MonitorData](/consumer/cn/doc/harmonyos-references/wearenginelite_api#monitordata) | 否 | 否 | 变化后的设备状态信息。 |