## 概述

PhonePC/2in1TabletTV

函数export定义的接口。

**引用文件：** <service\_collaboration/service\_collaboration\_api.h>

**库：** libservice\_collaboration\_ndk.z.so

**系统能力：** SystemCapability.Collaboration.Service

**起始版本：** 5.0.0(12)

**相关模块：** [ServiceCollaboration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module)

## 汇总

PhonePC/2in1TabletTV

### 结构体

PhonePC/2in1TabletTV

展开

| 名称 | 描述 |
| --- | --- |
| struct [ServiceCollaboration\_CollaborationDeviceInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-collaborationdeviceinfo) | 跨设备互通获取的设备信息对象，包含设备的基本信息和能力类型。 |
| struct [ServiceCollaboration\_CollaborationDeviceInfoSets](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-collaborationdeviceinfosets) | 通过[HMS\_ServiceCollaboration\_GetCollaborationDeviceInfos](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#hms_servicecollaboration_getcollaborationdeviceinfos)获取的对端设备信息对象集合。 |
| struct [ServiceCollaboration\_SelectInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-selectinfo) | 使用[HMS\_ServiceCollaboration\_StartCollaboration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#hms_servicecollaboration_startcollaboration)触发跨设备互通时，被选择的设备信息。 |
| struct [ServiceCollaborationCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaborationcallback) | 传给[HMS\_ServiceCollaboration\_StartCollaboration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#hms_servicecollaboration_startcollaboration)的回调方法。 |
| struct [ServiceCollaboration\_SelectInfoV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-selectinfov2) | 使用[HMS\_ServiceCollaboration\_StartCollaborationV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#hms_servicecollaboration_startcollaborationv2)触发跨设备互通时，被选择的设备信息，支持选择具有图片和视频回传能力的设备。 |

### 宏定义

PhonePC/2in1TabletTV

展开

| 名称 | 描述 |
| --- | --- |
| [COLLABORATIONDEVICEINFO\_DEVICENETWORKID\_MAXLENGTH](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#collaborationdeviceinfo_devicenetworkid_maxlength) 65 | 设备network Id最大长度。 |
| [COLLABORATIONDEVICEINFO\_DEVICENAME\_MAXLENGTH](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#collaborationdeviceinfo_devicename_maxlength) 128 | 设备名最大长度。 |
| [SERVICE\_COLLABORATION\_URI\_MAXLENGTH](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#service_collaboration_uri_maxlength) 4096 | 传入应用沙箱目录uri的最大长度。 |

### 类型定义

PhonePC/2in1TabletTV

展开

| 名称 | 描述 |
| --- | --- |
| typedef enum [ServiceCollaborationFilterType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#servicecollaborationfiltertype-1) [ServiceCollaborationFilterType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#servicecollaborationfiltertype) | 跨设备互通能力类型枚举。 |
| typedef enum [ServiceCollaborationDataType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#servicecollaborationdatatype-1) [ServiceCollaborationDataType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#servicecollaborationdatatype) | 回传数据类型。 |
| typedef enum [ServiceCollaborationEventCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#servicecollaborationeventcode-1) [ServiceCollaborationEventCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#servicecollaborationeventcode) | 错误码枚举。 |
| typedef struct [ServiceCollaboration\_CollaborationDeviceInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-collaborationdeviceinfo) [ServiceCollaboration\_CollaborationDeviceInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#servicecollaboration_collaborationdeviceinfo) | 设备信息对象。 |
| typedef struct [ServiceCollaboration\_CollaborationDeviceInfoSets](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-collaborationdeviceinfosets) [ServiceCollaboration\_CollaborationDeviceInfoSets](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#servicecollaboration_collaborationdeviceinfosets) | 设备信息对象集合。 |
| typedef struct [ServiceCollaboration\_SelectInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-selectinfo) [ServiceCollaboration\_SelectInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#servicecollaboration_selectinfo) | 被选择的设备信息。 |
| typedef struct [ServiceCollaborationCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaborationcallback) [ServiceCollaborationCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#servicecollaborationcallback) | 回调跨设备互通状态信息。 |
| typedef struct [ServiceCollaboration\_SelectInfoV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-selectinfov2) [ServiceCollaboration\_SelectInfoV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#servicecollaboration_selectinfov2) | 被选择的设备信息。 |
| typedef struct [CollaborationDeviceFilterType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#collaborationdevicefiltertype) [CollaborationDeviceFilterType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#collaborationdevicefiltertype) | 跨设备互通设备类型枚举 |

### 枚举

PhonePC/2in1TabletTV

展开

| 名称 | 描述 |
| --- | --- |
| [ServiceCollaborationFilterType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#servicecollaborationfiltertype-1) {  TAKE\_PHOTO = 1,  SCAN\_DOCUMENT = 2,  IMAGE\_PICKER = 3,  VIDEO\_PICKER = 5,  IMAGE\_VIDEO\_PICKER = 6  } | 跨设备互通能力类型的枚举。 |
| [ServiceCollaborationDataType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#servicecollaborationdatatype-1){  IMAGE = 1,  VIDEO = 2  } | 回传数据类型。 |
| [ServiceCollaborationEventCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#servicecollaborationeventcode-1){  LAST\_DATA\_BACK = 1001202000,  PEER\_CANCEL = 1001202001,  NETWORK\_ERROR = 1001202002,  PEER\_WIFI\_NOT\_OPEN = 1001202004,  LOCAL\_WIFI\_NOT\_OPEN = 1001202005,  DATA\_BACK\_START = 1001202006,  MIDDLE\_DATA\_BACK = 1001202007,  TIMEOUT\_AUTO\_CANCEL = 1001202008,  DATA\_READ\_FAILED = 1001202009,  LINK\_SHUTDOWN = 1001202011,  REMOTE\_HOTSPOT\_CONFLICT = 1001202013,  REMOTE\_DISTRIBUTED\_SERVICES\_CONFLICT = 1001202014,  SEND\_VIDEO\_SUCCESS = 1001202015,  MULTI\_VIDEO\_SENDING\_BACK = 1001202016,  STORE\_VIDEO\_FAIL = 1001202017  } | 错误码枚举。 |
| [CollaborationDeviceFilterType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#collaborationdevicefiltertype) {  PHONE = 1,  TABLET = 2,  PC\_2IN1 = 3  } | 被调用端设备类型的枚举。 |

### 函数

PhonePC/2in1TabletTV

展开

| 名称 | 描述 |
| --- | --- |
| [ServiceCollaboration\_CollaborationDeviceInfoSets](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-collaborationdeviceinfosets)\* [HMS\_ServiceCollaboration\_GetCollaborationDeviceInfos](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#hms_servicecollaboration_getcollaborationdeviceinfos)(  uint32\_t fileterNum, [ServiceCollaborationFilterType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#servicecollaborationfiltertype-1) serviceFileterTypes[]); | 获取支持相关能力的设备列表。 |
| uint32\_t [HMS\_ServiceCollaboration\_StartCollaboration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#hms_servicecollaboration_startcollaboration)(  const [ServiceCollaboration\_SelectInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-selectinfo)\* selectService, [ServiceCollaborationCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaborationcallback)\* callback) | 拉起跨设备互通回传图片的能力。 |
| int32\_t [HMS\_ServiceCollaboration\_StopCollaboration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#hms_servicecollaboration_stopcollaboration)(uint32\_t collaborationId); | 取消跨设备互通能力。 |
| uint32\_t [HMS\_ServiceCollaboration\_StartCollaborationV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#hms_servicecollaboration_startcollaborationv2)(  const [ServiceCollaboration\_SelectInfoV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-selectinfov2)\* selectService, [ServiceCollaborationCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaborationcallback)\* callback) | 拉起跨设备互通回传图片和视频的能力。 |
| [ServiceCollaboration\_CollaborationDeviceInfoSets](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-collaborationdeviceinfosets)\*  [HMS\_ServiceCollaboration\_GetCollaborationDeviceInfosV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#hms_servicecollaboration_getcollaborationdeviceinfosv2) (  uint32\_t deviceFilterNum, [CollaborationDeviceFilterType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#collaborationdevicefiltertype)  deviceFilterTypes[], uint32\_t serviceFilterNum,  [ServiceCollaborationFilterType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#servicecollaborationfiltertype) serviceFilterTypes[]) | 获取支持相关能力的指定设备列表。 |