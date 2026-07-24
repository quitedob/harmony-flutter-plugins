## 概述

PhonePC/2in1TabletTVWearable

为您提供标准的开放API，用于控制马达振动的启停。

**引用文件：** <sensors/vibrator.h>

**库：** libohvibrator.z.so

**系统能力：** SystemCapability.Sensors.MiscDevice

**起始版本：** 11

**相关模块：** [Vibrator](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-vibrator)

## 汇总

PhonePC/2in1TabletTVWearable

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [int32\_t OH\_Vibrator\_PlayVibration(int32\_t duration, Vibrator\_Attribute attribute)](/consumer/cn/doc/harmonyos-references/capi-vibrator-h#oh_vibrator_playvibration) | 控制马达在指定时间内持续振动。 |
| [int32\_t OH\_Vibrator\_PlayVibrationCustom(Vibrator\_FileDescription fileDescription, Vibrator\_Attribute vibrateAttribute)](/consumer/cn/doc/harmonyos-references/capi-vibrator-h#oh_vibrator_playvibrationcustom) | 播放自定义振动序列。 |
| [int32\_t OH\_Vibrator\_Cancel()](/consumer/cn/doc/harmonyos-references/capi-vibrator-h#oh_vibrator_cancel) | 停止马达振动。 |

## 函数说明

PhonePC/2in1TabletTVWearable

### OH\_Vibrator\_PlayVibration()

PhonePC/2in1TabletTVWearable



```
1. int32_t OH_Vibrator_PlayVibration(int32_t duration, Vibrator_Attribute attribute)
```

**描述**

控制马达在指定时间内持续振动。

**需要权限：** ohos.permission.VIBRATE

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| int32\_t duration | - 振动时长，单位：毫秒。 |
| [Vibrator\_Attribute](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-vibrator-vibrator-attribute) attribute | - 振动属性，请参考VibrateAttribute。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | 如果操作成功，则返回0；否则返回非零值。请参阅 [Vibrator\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-vibrator-type-h#vibrator_errorcode)。 |

### OH\_Vibrator\_PlayVibrationCustom()

PhonePC/2in1TabletTVWearable



```
1. int32_t OH_Vibrator_PlayVibrationCustom(Vibrator_FileDescription fileDescription, Vibrator_Attribute vibrateAttribute)
```

**描述**

播放自定义振动序列。

**需要权限：** ohos.permission.VIBRATE

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Vibrator\_FileDescription](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-vibrator-vibrator-filedescription) fileDescription | - 自定义振动效果文件描述符，请参阅 [Vibrator\_FileDescription](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-vibrator-vibrator-filedescription)。 |
| [Vibrator\_Attribute](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-vibrator-vibrator-attribute) vibrateAttribute | - 振动属性，请参阅 [Vibrator\_Attribute](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-vibrator-vibrator-attribute)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | 如果操作成功，则返回0；否则返回非零值。请参阅 [Vibrator\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-vibrator-type-h#vibrator_errorcode)。 |

### OH\_Vibrator\_Cancel()

PhonePC/2in1TabletTVWearable



```
1. int32_t OH_Vibrator_Cancel()
```

**描述**

停止马达振动。

**需要权限：** ohos.permission.VIBRATE

**起始版本：** 11

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | 如果操作成功，则返回0；否则返回非零值。请参阅 [Vibrator\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-vibrator-type-h#vibrator_errorcode)。 |