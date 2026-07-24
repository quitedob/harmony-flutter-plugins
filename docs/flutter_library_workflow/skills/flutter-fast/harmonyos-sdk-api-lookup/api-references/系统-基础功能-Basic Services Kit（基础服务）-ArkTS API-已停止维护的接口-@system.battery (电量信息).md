该模块提供充电状态及剩余电量的查询功能。

说明

* 模块维护策略：

  - 对于Lite Wearable设备类型，该模块长期维护，正常使用。

  - 对于支持该模块的其他设备类型，该模块从API Version 6开始不再维护，建议使用[@ohos.batteryInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-battery-info)替代。
* 本模块首批接口从API version 3开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。

## 导入模块

WearableLite Wearable



```
1. import {Battery, BatteryResponse } from '@kit.BasicServicesKit';
```

## Battery.getStatus(deprecated)

WearableLite Wearable

getStatus(options?: GetStatusOptions): void;

获取设备当前的充电状态及剩余电量。

**系统能力：** SystemCapability.PowerManager.BatteryManager.Lite

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| options | [GetStatusOptions](/consumer/cn/doc/harmonyos-references/js-apis-system-battery#getstatusoptionsdeprecated) | 否 | 包含接口调用结果的对象。可选，默认为空。 |

**示例：**



```
1. Battery.getStatus({
2. success: (data: BatteryResponse) => {
3. console.info('success get battery level:' + data.level);
4. },
5. fail: (data: string, code: number) => {
6. console.error('fail to get battery level code:' + code + ', data: ' + data);
7. }
8. });
```

## GetStatusOptions(deprecated)

WearableLite Wearable

包含接口调用结果的对象。

**系统能力：** SystemCapability.PowerManager.BatteryManager.Lite

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| success | (data: [BatteryResponse](/consumer/cn/doc/harmonyos-references/js-apis-system-battery#batteryresponsedeprecated)) => void | 否 | 接口调用成功的回调函数，data为[BatteryResponse](/consumer/cn/doc/harmonyos-references/js-apis-system-battery#batteryresponsedeprecated)类型的返回值。 |
| fail | (data: string, code: number) => void | 否 | 接口调用失败的回调函数。data为错误信息，code为错误码。 |
| complete | () => void | 否 | 接口调用结束的回调函数。 |

## BatteryResponse(deprecated)

WearableLite Wearable

包含充电状态及剩余电量的对象。

**系统能力：** SystemCapability.PowerManager.BatteryManager.Lite

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| charging | boolean | 否 | 否 | 当前电池是否在充电中。true表示在充电，false表示没有充电，默认为false。  **说明：** 除Lite Wearable外，从API Version 6开始不再维护，建议使用[batteryInfo.chargingStatus](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-battery-info#常量)替代。 |
| level | number | 否 | 否 | 当前电池的电量，取值范围：0.00 - 1.00 。  **说明：** 除Lite Wearable外，从API Version 6开始不再维护，建议使用[batteryInfo.batterySOC](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-battery-info#常量)替代。 |