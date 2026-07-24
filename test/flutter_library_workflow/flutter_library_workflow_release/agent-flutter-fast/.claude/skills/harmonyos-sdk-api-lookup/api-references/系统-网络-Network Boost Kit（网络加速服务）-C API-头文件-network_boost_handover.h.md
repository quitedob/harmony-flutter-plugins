## 概述

PhonePC/2in1Tablet

声明用于连接迁移模块的API。提供基本的函数、结构体和const定义。

**引用文件：** <NetworkBoostKit/network\_boost\_handover.h>

**库：** libnetwork\_boost.so

**系统能力：** SystemCapability.Communication.NetworkBoost.Core

**起始版本：** 5.1.0(18)

**相关模块：** [NetworkBoost](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview)

## 汇总

PhonePC/2in1Tablet

### 结构体

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| struct [NetworkBoost\_DataSpeedAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-data_speed_action) | 发包建议。 |
| struct [NetworkBoost\_NetHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-net_handle) | 数据网络的句柄。 |
| struct [NetworkBoost\_HandoverStart](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-handover_start) | 连接迁移开始信息。 |
| struct [NetworkBoost\_HandoverComplete](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-handover_complete) | 连接迁移完成信息。 |
| struct [HMS\_NetworkBoost\_HandoverCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-handover_callback) | 回调函数，返回连接迁移开始和完成的详细信息。 |
| struct [NetworkBoost\_MultiPathQuotaInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-multipath_quotainfo) | 配额信息。 |
| struct [NetworkBoost\_MultiPathQuota](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-multipath_quota) | 应用配额使用信息。 |
| struct [NetworkBoost\_MultiPathRequestResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-multipath_req_result) | 多网请求结果。 |
| struct [NetworkBoost\_MultiPathStateChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-multipath_statechange) | 多网状态信息。 |
| struct [NetworkBoost\_MultiPathRecommendation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-multipath_reco) | 多网推荐信息。 |

### 类型定义

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| typedef enum [NetworkBoost\_DataSpeedSimpleAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_dataspeedsimpleaction-1) [NetworkBoost\_DataSpeedSimpleAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_dataspeedsimpleaction) | 应用发包策略的简单建议。 |
| typedef enum [NetworkBoost\_ErrorResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_errorresult-1) [NetworkBoost\_ErrorResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_errorresult) | 表示连接迁移结果枚举。 |
| typedef enum [NetworkBoost\_ReEstAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_reestaction-1) [NetworkBoost\_ReEstAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_reestaction) | 表示重建枚举。 |
| typedef struct [NetworkBoost\_DataSpeedAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-data_speed_action) [NetworkBoost\_DataSpeedAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_dataspeedaction) | 发包速率建议。 |
| typedef struct [NetworkBoost\_NetHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-net_handle) [NetworkBoost\_NetHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_nethandle) | 数据网络的句柄。 |
| typedef struct [NetworkBoost\_HandoverStart](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-handover_start) [NetworkBoost\_HandoverStart](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_handoverstart) | 连接迁移开始信息。 |
| typedef struct [NetworkBoost\_HandoverComplete](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-handover_complete) [NetworkBoost\_HandoverComplete](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_handovercomplete) | 连接迁移完成信息。 |
| typedef enum [NetworkBoost\_HandoverMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_handovermode-1) [NetworkBoost\_HandoverMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_handovermode) | 连接迁移模式枚举。 |
| typedef void(\* [HMS\_NetworkBoost\_OnHandoverStart](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#hms_networkboost_onhandoverstart)) ([NetworkBoost\_HandoverStart](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-handover_start) \*handoverStart) | 连接迁移开始的回调原型。 |
| typedef void(\* [HMS\_NetworkBoost\_OnHandoverComplete](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#hms_networkboost_onhandovercomplete)) ([NetworkBoost\_HandoverComplete](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-handover_complete) \*handoverComplete) | 连接迁移结束的回调原型。 |
| typedef struct [HMS\_NetworkBoost\_HandoverCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-handover_callback) [HMS\_NetworkBoost\_HandoverCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#hms_networkboost_handovercallback) | 回调函数，返回连接迁移开始和完成的详细信息。 |
| typedef void ([HMS\_NetworkBoost\_OnMultiPathRequestResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#hms_networkboost_onmultipathrequestresult))([NetworkBoost\_MultiPathRequestResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-multipath_req_result)\* result) | 多网请求结果回调原型。 |
| typedef void ([HMS\_NetworkBoost\_OnMultiPathStateChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#hms_networkboost_onmultipathstatechange))([NetworkBoost\_MultiPathStateChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-multipath_statechange)\* multiPathState) | 多网状态变化回调原型。 |
| typedef void ([HMS\_NetworkBoost\_OnMultiPathRecommendation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#hms_networkboost_onmultipathrecommendation))([NetworkBoost\_MultiPathRecommendation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-multipath_reco)\* recommendation) | 系统多网建议变化回调原型。 |

### 枚举

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| [NetworkBoost\_DataSpeedSimpleAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_dataspeedsimpleaction-1) { NB\_SIMPLEACTION\_SUSPEND\_DATA = 1, NB\_SIMPLEACTION\_DECREASE\_DATA = 2, NB\_SIMPLEACTION\_INCREASE\_DATA = 3, NB\_SIMPLEACTION\_KEEP\_DATA = 4 } | 应用发包策略的简单建议。 |
| [NetworkBoost\_ErrorResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_errorresult-1) { NB\_ERROR\_NONE = 0, NB\_ERROR\_HANDOVER\_TIMEOUT = 1, NB\_ERROR\_NEW\_PATH\_ACTIVATION\_FAILED = 2, NB\_ERROR\_ABORT = 3 } | 连接迁移结果枚举。 |
| [NetworkBoost\_ReEstAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_reestaction-1) {  NB\_REEST\_DEFAULT = 0, NB\_REEST\_QUERY\_DNS = 1, NB\_REEST\_CHANGE\_REMOTE\_IP = 2, NB\_REEST\_CHANGE\_IP\_VERSION = 3,  NB\_NO\_EST = 4  } | 重建枚举。 |
| [NetworkBoost\_HandoverMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_handovermode-1) { NB\_MODE\_DELEGATION = 0, NB\_MODE\_DISCRETION = 1 } | 连接迁移模式枚举。 |
| [NetworkBoost\_PathState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_pathstate){  NB\_PATH\_IDLE = 0，NB\_PATH\_CONNECTED = 1，NB\_PATH\_SUSPENDED = 2  } | 多网链路状态的枚举。 |
| [NetworkBoost\_MultiPathErrorResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_multipatherrorresult){  NB\_MULTIPATH\_ERROR\_NONE = 0，NB\_MULTIPATH\_ERROR\_NETWORK\_REFUSED = 1， NB\_MULTIPATH\_ERROR\_TIMEOUT = 2， NB\_MULTIPATH\_ERROR\_LOCAL = 3  } | 多网建立结果的枚举。 |
| [NetworkBoost\_MultiPathChangeCause](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_multipathchangecause){  NB\_MULTIPATH\_CAUSE\_REQUEST\_NORMAL = 0, NB\_MULTIPATH\_CAUSE\_RELEASE\_NORMAL = 50, NB\_MULTIPATH\_CHANGE\_CAUSE\_RELEASE\_NETWORK = 51, NB\_MULTIPATH\_CHANGE\_CAUSE\_RELEASE\_USER\_REFUSED = 52, NB\_MULTIPATH\_CAUSE\_RELEASE\_NO\_QUOTA = 53, NB\_MULTIPATH\_CAUSE\_RELEASE\_POWER\_CONSUMPTION = 54, NB\_MULTIPATH\_CHANGE\_CAUSE\_RELEASE\_INSUFFICIENT\_TRAFFIC = 55, NB\_MULTIPATH\_CHANGE\_CAUSE\_RELEASE\_CONFLICT = 56, NB\_MULTIPATH\_CHANGE\_CAUSE\_RELEASE\_SYS\_FUSING = 57, NB\_MULTIPATH\_CHANGE\_CAUSE\_RELEASE\_SYS\_DEFAULT = 99, NB\_MULTIPATH\_CHANGE\_CAUSE\_SUSPEND\_ENTER = 100, NB\_MULTIPATH\_CHANGE\_CAUSE\_SUSPEND\_LEAVE = 101, NB\_MULTIPATH\_CHANGE\_CAUSE\_CONN\_PROPERTIES\_UPDATE = 102  } | 多网变化原因的枚举。 |
| [NetworkBoost\_MultiPathState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_multipathstate){  NB\_MULTIPATH\_IDLE = 0, NB\_MULTIPATH\_CREATEING = 1, NB\_MULTIPATH\_CREATED = 2, NB\_MULTIPATH\_RELEASING = 3  } | 多网状态的枚举。 |
| [NetworkBoost\_MultiPathAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_multipathaction){  NB\_MULTIPATH\_ACTION\_REQUEST = 0， NB\_MULTIPATH\_ACTION\_RELEASE = 1  } | 多网推荐动作的枚举。 |

### 函数

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| int32\_t [HMS\_NetworkBoost\_RegisterHandoverChangeCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#hms_networkboost_registerhandoverchangecallback) ([HMS\_NetworkBoost\_HandoverCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-handover_callback) \*callback, uint32\_t \*callbackId) | 注册连接迁移回调。 |
| int32\_t [HMS\_NetworkBoost\_UnregisterHandoverChangeCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#hms_networkboost_unregisterhandoverchangecallback) (uint32\_t callbackId) | 取消注册连接迁移回调。 |
| int32\_t [HMS\_NetworkBoost\_SetHandoverMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#hms_networkboost_sethandovermode) ([NetworkBoost\_HandoverMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_handovermode-1) mode) | 应用可通过该接口变更连接迁移模式，包括委托模式(由系统发起连接迁移)，和自主模式(由应用发起连接迁移)，默认为委托模式。设置失败，接口会抛出异常。 |
| int32\_t [HMS\_NetworkBoost\_GetMultiPathQuotaStats](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#hms_networkboost_getmultipathquotastats)([NetworkBoost\_MultiPathQuota](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-multipath_quota) \*quota) | 获取当前应用多网使用的配额，包括已使用的配额信息和剩余配额信息。 |
| int32\_t [HMS\_NetworkBoost\_RequestMultiPath](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#hms_networkboost_requestmultipath)([HMS\_NetworkBoost\_OnMultiPathRequestResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-multipath_req_result) result, uint32\_t \*requestId) | 发起多网请求。 |
| int32\_t [HMS\_NetworkBoost\_ReleaseMultiPath](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#hms_networkboost_releasemultipath)(uint32\_t requestId) | 释放多网请求。 |
| int32\_t [HMS\_NetworkBoost\_RegisterMultiPathStateChangeCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#hms_networkboost_registermultipathstatechangecallback)([HMS\_NetworkBoost\_OnMultiPathStateChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#hms_networkboost_onmultipathstatechange)callback, uint32\_t \*callbackId) | 注册多网状态变化事件。 |
| int32\_t [HMS\_NetworkBoost\_UnregisterMultiPathStateChangeCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#hms_networkboost_unregistermultipathstatechangecallback)(uint32\_t callbackId) | 去注册多网状态变化事件。 |
| int32\_t [HMS\_NetworkBoost\_RegisterMultiPathRecommendationCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#hms_networkboost_registermultipathrecommendationcallback)([HMS\_NetworkBoost\_OnMultiPathRecommendation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#hms_networkboost_onmultipathrecommendation)callback, uint32\_t \*callbackId) | 注册系统多网建议变化事件。 |
| int32\_t [HMS\_NetworkBoost\_UnregisterMultiPathRecommendationCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#hms_networkboost_unregistermultipathrecommendationcallback)(uint32\_t callbackId) | 去系统多网建议变化事件。 |