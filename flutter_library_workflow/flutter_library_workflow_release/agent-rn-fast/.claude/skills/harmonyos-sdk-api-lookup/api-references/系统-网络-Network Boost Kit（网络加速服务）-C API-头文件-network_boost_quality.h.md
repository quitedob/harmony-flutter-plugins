## 概述

PhonePC/2in1Tablet

声明用于网络质量模块的API。提供基本的函数、结构体和const定义。

**引用文件：** <NetworkBoostKit/network\_boost\_quality.h>

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
| struct [NetworkBoost\_NetworkQos](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-network_qos) | 网络质量回调信息。 |
| struct [NetworkBoost\_NetworkQosArray](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-network_qos_array) | 网络质量变化的详细信息。 |
| struct [NetworkBoost\_WeakSignalPrediction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-weak_signal_prediction) | 弱信号预测相关信息。 |
| struct [NetworkBoost\_NetworkScene](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-network_scene) | 网络场景状态变更回调信息。 |

### 宏定义

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| [NETBOOST\_MAX\_PATH\_NUM](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#netboost_max_path_num) 4 | 网络质量变化的最大路径数量。 |
| [NB\_BPS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#nb_bps) 1 | 1bps |
| [NB\_KBPS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#nb_kbps) 1000 | 1kbps |
| [NB\_MBPS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#nb_mbps) 1000000 | 1mbps |
| [NB\_GBPS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#nb_gbps) 1000000000 | 1gbps |
| [NB\_TBPS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#nb_tbps) 1000000000000 | 1tbps，请使用uint64\_t类型来避免溢出。 |

### 类型定义

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| typedef enum [NetworkBoost\_RecommendedAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_recommendedaction-1) [NetworkBoost\_RecommendedAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_recommendedaction) | 应用数传策略建议。 |
| typedef enum [NetworkBoost\_PathType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_pathtype-1) [NetworkBoost\_PathType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_pathtype) | 数据路径类型，枚举值。 |
| typedef enum [NetworkBoost\_Scene](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_scene-1) [NetworkBoost\_Scene](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_scene) | 网络场景类型。 |
| typedef enum [NetworkBoost\_ServiceType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_servicetype-1) [NetworkBoost\_ServiceType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_servicetype) | 应用业务类型。 |
| typedef enum [NetworkBoost\_QoeType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_qoetype-1) [NetworkBoost\_QoeType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_qoetype) | 应用体验类型。 |
| typedef struct [NetworkBoost\_NetworkQos](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-network_qos) [NetworkBoost\_NetworkQos](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_networkqos) | 网络质量回调信息。 |
| typedef struct [NetworkBoost\_NetworkQosArray](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-network_qos_array) [NetworkBoost\_NetworkQosArray](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_networkqosarray) | 网络质量变化的详细信息。 |
| typedef struct [NetworkBoost\_WeakSignalPrediction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-weak_signal_prediction) [NetworkBoost\_WeakSignalPrediction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_weaksignalprediction) | 弱信号预测相关信息。 |
| typedef struct [NetworkBoost\_NetworkScene](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-network_scene) [NetworkBoost\_NetworkScene](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_networkscene) | 网络场景状态变更回调信息。 |
| typedef void(\* [HMS\_NetworkBoost\_NetQosChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#hms_networkboost_netqoschange)) ([NetworkBoost\_NetworkQosArray](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-network_qos_array) \*networkQosArray) | 网络质量变更回调。 |
| typedef void(\* [HMS\_NetworkBoost\_NetSceneChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#hms_networkboost_netscenechange)) ([NetworkBoost\_NetworkScene](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-network_scene) \*networkScene) | 网络场景状态变更回调。 |

### 枚举

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| [NetworkBoost\_RecommendedAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_recommendedaction-1) {  NB\_ACTION\_DO\_CACHING = 0, NB\_ACTION\_SUSPEND\_DATA = 1, NB\_ACTION\_DECREASE\_DATA = 2, NB\_ACTION\_INCREASE\_DATA = 3,  NB\_ACTION\_KEEP\_DATA = 4  } | 应用数传策略建议。 |
| [NetworkBoost\_PathType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_pathtype-1) { NB\_PATH\_CELLULAR\_PRIMARY = 0, NB\_PATH\_CELLULAR\_SECONDARY = 1, NB\_PATH\_WIFI\_PRIMARY = 2, NB\_PATH\_WIFI\_SECONDARY = 3 } | 数据路径类型，枚举值。 |
| [NetworkBoost\_Scene](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_scene-1) { NB\_SCENE\_NORMAL = 0, NB\_SCENE\_CONGESTION = 1, NB\_SCENE\_FREQUENT\_HANDOVER = 2, NB\_SCENE\_WEAK\_SIGNAL = 3 } | 网络场景类型。 |
| [NetworkBoost\_ServiceType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_servicetype-1) {  NB\_SERVICE\_DEFAULT = 0, NB\_SERVICE\_BACKGROUND = 1, NB\_SERVICE\_REAL\_TIME\_VOICE = 2, NB\_SERVICE\_REAL\_TIME\_VIDEO = 3,  NB\_SERVICE\_CALL\_SIGNALING = 4, NB\_SERVICE\_REAL\_TIME\_GAME = 5, NB\_SERVICE\_NORMAL\_GAME = 6, NB\_SERVICE\_SHORT\_VIDEO = 7,  NB\_SERVICE\_LONG\_VIDEO = 8, NB\_SERVICE\_LIVE\_STREAMING\_ANCHOR = 9, NB\_SERVICE\_LIVE\_STREAMING\_WATCHER = 10, NB\_SERVICE\_DOWNLOAD = 11,  NB\_SERVICE\_UPLOAD = 12, NB\_SERVICE\_BROWSER = 13, NB\_SERVICE\_TRANSACTION = 14, NB\_SERVICE\_DETECTION = 15, NB\_SERVICE\_CLOUDSERVICE = 16, NB\_SERVICE\_VOICE\_CONFERENCE = 17, NB\_SERVICE\_VIDEO\_CONFERENCE = 18, NB\_SERVICE\_NAVIGATION = 19, NB\_SERVICE\_SECKILL\_SERVICE = 20, NB\_SERVICE\_LOGIN = 21, NB\_SERVICE\_AUDIO = 22, NB\_SERVICE\_SHOPPING = 23  } | 应用业务类型。 |
| [NetworkBoost\_QoeType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_qoetype-1) {  NB\_QOE\_GOOD = 0, NB\_QOE\_BAD\_UNKNOWN = 1, NB\_QOE\_BAD\_SERVER\_ERROR = 2, NB\_QOE\_BAD\_NO\_DATA = 3,  NB\_QOE\_BAD\_PACKET\_LOST = 4, NB\_QOE\_BAD\_PACKET\_OUT\_OF\_ORDER = 5, NB\_QOE\_BAD\_HIGH\_JITTER = 6, NB\_QOE\_BAD\_HIGH\_LATENCY = 7  } | 应用体验类型。 |

### 函数

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| int32\_t [HMS\_NetworkBoost\_RegisterNetQosCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#hms_networkboost_registernetqoscallback) ([HMS\_NetworkBoost\_NetQosChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#hms_networkboost_netqoschange) callback, uint32\_t \*callbackId) | 注册网络质量信息回调。 |
| int32\_t [HMS\_NetworkBoost\_UnregisterNetQosCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#hms_networkboost_unregisternetqoscallback) (uint32\_t callbackId) | 取消注册网络质量信息回调。 |
| int32\_t [HMS\_NetworkBoost\_RegisterNetSceneCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#hms_networkboost_registernetscenecallback) ([HMS\_NetworkBoost\_NetSceneChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#hms_networkboost_netscenechange) callback, uint32\_t \*callbackId) | 注册网络场景变化信息回调。 |
| int32\_t [HMS\_NetworkBoost\_UnregisterNetSceneCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#hms_networkboost_unregisternetscenecallback) (uint32\_t callbackId) | 取消注册网络场景变化信息回调。 |
| int32\_t [HMS\_NetworkBoost\_ReportQoe](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#hms_networkboost_reportqoe) ([NetworkBoost\_ServiceType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_servicetype-1) serviceType, [NetworkBoost\_QoeType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_qoetype-1) qoeType) | 应用传输体验反馈。 |