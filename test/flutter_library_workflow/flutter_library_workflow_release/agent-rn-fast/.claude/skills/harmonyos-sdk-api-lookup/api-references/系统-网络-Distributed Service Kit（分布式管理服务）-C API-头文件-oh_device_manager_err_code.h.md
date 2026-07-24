## 概述

PhonePC/2in1TabletTVWearable

声明设备管理模块错误码信息。

**引用文件：** <distributedhardware/device\_manager/oh\_device\_manager\_err\_code.h>

**库：** libdevicemanager\_ndk.so

**系统能力：** SystemCapability.DistributedHardware.DeviceManager

**起始版本：** 20

**相关模块：** [DeviceManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-devicemanager)

## 汇总

PhonePC/2in1TabletTVWearable

### 枚举

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [DeviceManager\_ErrorCode](/consumer/cn/doc/harmonyos-references/capi-oh-device-manager-err-code-h#devicemanager_errorcode) | DeviceManager\_ErrorCode | 分布式设备管理错误码信息。 |

## 枚举类型说明

PhonePC/2in1TabletTVWearable

### DeviceManager\_ErrorCode

PhonePC/2in1TabletTVWearable



```
1. enum DeviceManager_ErrorCode
```

**描述**

分布式设备管理错误码信息。

**起始版本：** 20

展开

| 枚举项 | 描述 |
| --- | --- |
| ERR\_OK = 0 | 执行成功。 |
| ERR\_PERMISSION\_ERROR = 201 | 权限校验失败。 |
| ERR\_INVALID\_PARAMETER = 401 | 非法参数。 |
| DM\_ERR\_FAILED = 11600101 | 函数执行失败。 |
| DM\_ERR\_OBTAIN\_SERVICE = 11600102 | 获取设备管理服务失败。 |
| DM\_ERR\_OBTAIN\_BUNDLE\_NAME = 11600109 | 获取bundleName失败。 |