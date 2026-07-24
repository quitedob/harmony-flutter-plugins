## 概述

PhonePC/2in1TabletTV

跨设备互通获取的设备信息对象，包含设备的基本信息和能力类型。

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
| uint32\_t [deviceType](/consumer/cn/doc/harmonyos-references/servicecollaboration-collaborationdeviceinfo#devicetype) | 对端设备类型。只有手机或者平板。手机设备类型的值为0x14，平板设备类型的值为0x17。 |
| char [deviceNetworkId](/consumer/cn/doc/harmonyos-references/servicecollaboration-collaborationdeviceinfo#devicenetworkid) [[COLLABORATIONDEVICEINFO\_DEVICENETWORKID\_MAXLENGTH](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#collaborationdeviceinfo_devicenetworkid_maxlength)] | 对端设备network Id。 |
| char [deviceName](/consumer/cn/doc/harmonyos-references/servicecollaboration-collaborationdeviceinfo#devicename) [[COLLABORATIONDEVICEINFO\_DEVICENAME\_MAXLENGTH](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#collaborationdeviceinfo_devicename_maxlength)] | 对端设备名。 |
| uint32\_t [filterNum](/consumer/cn/doc/harmonyos-references/servicecollaboration-collaborationdeviceinfo#filternum) | 对端设备支持的能力类型列表的大小。 |
| [ServiceCollaborationFilterType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#servicecollaborationfiltertype-1) \* [serviceFilterTypes](/consumer/cn/doc/harmonyos-references/servicecollaboration-collaborationdeviceinfo#servicefiltertypes) | 对端设备支持的能力类型列表。 |

## 结构体成员变量说明

PhonePC/2in1TabletTV

### deviceName

PhonePC/2in1TabletTV



```
1. char ServiceCollaboration_CollaborationDeviceInfo::deviceName[COLLABORATIONDEVICEINFO_DEVICENAME_MAXLENGTH]
```

**描述**

对端设备名。

### deviceNetworkId

PhonePC/2in1TabletTV



```
1. char ServiceCollaboration_CollaborationDeviceInfo::deviceNetworkId[COLLABORATIONDEVICEINFO_DEVICENETWORKID_MAXLENGTH]
```

**描述**

对端设备network Id。

### deviceType

PhonePC/2in1TabletTV



```
1. uint32_t ServiceCollaboration_CollaborationDeviceInfo::deviceType
```

**描述**

对端设备类型。只有手机或者平板。手机设备类型的值为0x14，平板设备类型的值为0x17。

### filterNum

PhonePC/2in1TabletTV



```
1. uint32_t ServiceCollaboration_CollaborationDeviceInfo::filterNum
```

**描述**

对端设备支持的能力类型列表的大小。

### serviceFilterTypes

PhonePC/2in1TabletTV



```
1. ServiceCollaborationFilterType* ServiceCollaboration_CollaborationDeviceInfo::serviceFilterTypes
```

**描述**

对端设备支持的能力类型列表。