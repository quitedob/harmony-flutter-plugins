## 概述

PhonePC/2in1TabletTVWearable

声明操作传感器的API，包括获取传感器信息和订阅取消订阅传感器数据。

**引用文件：** <sensors/oh\_sensor.h>

**库：** libohsensor.so

**系统能力：** SystemCapability.Sensors.Sensor

**起始版本：** 11

**相关模块：** [Sensor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-sensor)

## 汇总

PhonePC/2in1TabletTVWearable

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [Sensor\_Result OH\_Sensor\_GetInfos(Sensor\_Info \*\*infos, uint32\_t \*count)](/consumer/cn/doc/harmonyos-references/capi-oh-sensor-h#oh_sensor_getinfos) | 获取设备上所有传感器的信息。 |
| [Sensor\_Result OH\_Sensor\_Subscribe(const Sensor\_SubscriptionId \*id, const Sensor\_SubscriptionAttribute \*attribute, const Sensor\_Subscriber \*subscriber)](/consumer/cn/doc/harmonyos-references/capi-oh-sensor-h#oh_sensor_subscribe) | 订阅传感器数据。系统将以指定的频率向用户报告传感器数据。订阅加速度传感器，需要申请ohos.permission.ACCELEROMETER权限；订阅陀螺仪传感器，需要申请ohos.permission.GYROSCOPE权限；订阅计步器相关传感器时，需要申请ohos.permission.ACTIVITY\_MOTION权限；订阅与健康相关的传感器时，比如心率传感器，需要申请ohos.permission.READ\_HEALTH\_DATA权限，否则订阅失败。订阅其余传感器不需要申请权限。 |
| [Sensor\_Result OH\_Sensor\_Unsubscribe(const Sensor\_SubscriptionId \*id, const Sensor\_Subscriber \*subscriber)](/consumer/cn/doc/harmonyos-references/capi-oh-sensor-h#oh_sensor_unsubscribe) | 取消订阅传感器数据。取消订阅加速度计传感器，需要申请ohos.permission.ACCELEROMETER权限；取消订阅陀螺仪传感器，需要申请ohos.permission.GYROSCOPE权限；取消订阅计步器相关传感器时，需要申请ohos.permission.ACTIVITY\_MOTION权限；取消订阅与健康相关的传感器时，需要申请ohos.permission.READ\_HEALTH\_DATA权限，否则取消订阅失败。取消订阅其余传感器不需要申请权限。 |

## 函数说明

PhonePC/2in1TabletTVWearable

### OH\_Sensor\_GetInfos()

PhonePC/2in1TabletTVWearable



```
1. Sensor_Result OH_Sensor_GetInfos(Sensor_Info **infos, uint32_t *count)
```

**描述**

获取设备上所有传感器的信息。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Sensor\_Info](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-sensor-sensor-info) \*\*infos | - 双指针指向设备上所有传感器的信息。请参考[Sensor\_Info](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-sensor-sensor-info)。 |
| uint32\_t \*count | - 指向设备上传感器数量的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Sensor\_Result](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-sensor-type-h#sensor_result) | 如果操作成功返回**SENSOR\_SUCCESS**；否则返回[Sensor\_Result](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-sensor-type-h#sensor_result)中定义的错误代码。  [SENSOR\_PARAMETER\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-sensor-type-h#sensor_result)参数检查失败。例如，参数无效；或传入的参数类型不正确。  [SENSOR\_SERVICE\_EXCEPTION](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-sensor-type-h#sensor_result)传感器服务异常。 |

### OH\_Sensor\_Subscribe()

PhonePC/2in1TabletTVWearable



```
1. Sensor_Result OH_Sensor_Subscribe(const Sensor_SubscriptionId *id, const Sensor_SubscriptionAttribute *attribute, const Sensor_Subscriber *subscriber)
```

**描述**

订阅传感器数据。系统将以指定的频率向用户报告传感器数据。订阅加速度传感器，需要申请ohos.permission.ACCELEROMETER权限；订阅陀螺仪传感器，需要申请ohos.permission.GYROSCOPE权限；订阅计步器相关传感器时，需要申请ohos.permission.ACTIVITY\_MOTION权限；订阅与健康相关的传感器时，比如心率传感器，需要申请ohos.permission.READ\_HEALTH\_DATA权限，否则订阅失败。订阅其余传感器不需要申请权限。

**需要权限：** ohos.permission.ACCELEROMETER or ohos.permission.GYROSCOPE or

ohos.permission.ACTIVITY\_MOTION or ohos.permission.READ\_HEALTH\_DATA

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [const Sensor\_SubscriptionId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-sensor-sensor-subscriptionid) \*id | - 指向传感器订阅ID的指针。请参考[Sensor\_SubscriptionId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-sensor-sensor-subscriptionid)。 |
| [const Sensor\_SubscriptionAttribute](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-sensor-sensor-subscriptionattribute) \*attribute | - 指向订阅属性的指针，该属性用于指定数据报告频率。请参考[Sensor\_SubscriptionAttribute](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-sensor-sensor-subscriptionattribute)。 |
| [const Sensor\_Subscriber](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-sensor-sensor-subscriber) \*subscriber | - 指向订阅者信息的指针，该信息用于指定的回调函数报告传感器数据。请参考[Sensor\_Subscriber](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-sensor-sensor-subscriber)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Sensor\_Result](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-sensor-type-h#sensor_result) | 如果操作成功返回**SENSOR\_SUCCESS**；否则返回[Sensor\_Result](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-sensor-type-h#sensor_result)中定义的错误代码。  [SENSOR\_PERMISSION\_DENIED](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-sensor-type-h#sensor_result)权限验证失败。  [SENSOR\_PARAMETER\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-sensor-type-h#sensor_result)参数检查失败。例如，参数无效；或传入的参数类型不正确。  [SENSOR\_SERVICE\_EXCEPTION](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-sensor-type-h#sensor_result)传感器服务异常。 |

### OH\_Sensor\_Unsubscribe()

PhonePC/2in1TabletTVWearable



```
1. Sensor_Result OH_Sensor_Unsubscribe(const Sensor_SubscriptionId *id, const Sensor_Subscriber *subscriber)
```

**描述**

取消订阅传感器数据。取消订阅加速度计传感器，需要申请ohos.permission.ACCELEROMETER权限；取消订阅陀螺仪传感器，需要申请ohos.permission.GYROSCOPE权限；取消订阅计步器相关传感器时，需要申请ohos.permission.ACTIVITY\_MOTION权限；取消订阅与健康相关的传感器时，需要申请ohos.permission.READ\_HEALTH\_DATA权限，否则取消订阅失败。取消订阅其余传感器不需要申请权限。

**需要权限：** ohos.permission.ACCELEROMETER or ohos.permission.GYROSCOPE or

ohos.permission.ACTIVITY\_MOTION or ohos.permission.READ\_HEALTH\_DATA

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [const Sensor\_SubscriptionId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-sensor-sensor-subscriptionid) \*id | - 指向传感器订阅ID的指针。请参考[Sensor\_SubscriptionId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-sensor-sensor-subscriptionid)。 |
| [const Sensor\_Subscriber](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-sensor-sensor-subscriber) \*subscriber | - 指向订阅者信息的指针，该信息用于指定的回调函数报告传感器数据。请参考[Sensor\_Subscriber](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-sensor-sensor-subscriber)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Sensor\_Result](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-sensor-type-h#sensor_result) | 如果操作成功返回**SENSOR\_SUCCESS**；否则返回[Sensor\_Result](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-sensor-type-h#sensor_result)中定义的错误代码。  [SENSOR\_PERMISSION\_DENIED](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-sensor-type-h#sensor_result)权限验证失败。  [SENSOR\_PARAMETER\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-sensor-type-h#sensor_result)参数检查失败。例如，参数无效；或传入的参数类型不正确。  [SENSOR\_SERVICE\_EXCEPTION](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-sensor-type-h#sensor_result)传感器服务异常。 |