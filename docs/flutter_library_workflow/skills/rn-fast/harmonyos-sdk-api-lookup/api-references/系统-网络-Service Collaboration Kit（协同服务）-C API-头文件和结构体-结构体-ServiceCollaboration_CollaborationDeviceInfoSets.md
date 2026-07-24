## 概述

PhonePC/2in1TabletTV

通过[HMS\_ServiceCollaboration\_GetCollaborationDeviceInfos](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#hms_servicecollaboration_getcollaborationdeviceinfos)获取的对端设备信息对象集合。

**起始版本：** 5.0.0(12)

**相关模块：** [ServiceCollaboration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module)

**所在头文件：** [service\_collaboration\_api.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-h)

## 汇总

PhonePC/2in1TabletTV

### 成员变量

PhonePC/2in1TabletTV

展开

| 名称 | 描述 |
| --- | --- |
| uint32\_t [size](/consumer/cn/doc/harmonyos-references/servicecollaboration-collaborationdeviceinfosets#size) | 对端设备信息对象集合的大小。 |
| [ServiceCollaboration\_CollaborationDeviceInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-collaborationdeviceinfo) \* [deviceInfoSets](/consumer/cn/doc/harmonyos-references/servicecollaboration-collaborationdeviceinfosets#deviceinfosets) | 对端设备信息对象集合。 |

## 结构体成员变量说明

PhonePC/2in1TabletTV

### deviceInfoSets

PhonePC/2in1TabletTV



```
1. ServiceCollaboration_CollaborationDeviceInfo* ServiceCollaboration_CollaborationDeviceInfoSets::deviceInfoSets
```

**描述**

对端设备信息对象集合。

### size

PhonePC/2in1TabletTV



```
1. uint32_t ServiceCollaboration_CollaborationDeviceInfoSets::size
```

**描述**

对端设备信息对象集合的大小。