## 概述

PhonePC/2in1Tablet

网络场景状态变更回调信息。

**起始版本：** 5.1.0(18)

**相关模块：** [NetworkBoost](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview)

**所在头文件：** [network\_boost\_quality.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-files-quality)

## 汇总

PhonePC/2in1Tablet

### 成员变量

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| [NetworkBoost\_PathType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_pathtype-1) [pathType](/consumer/cn/doc/harmonyos-references/network-boost-c-struct-network_scene#pathtype) | 表明相应的数据路径上的网络场景信息。 |
| [NetworkBoost\_Scene](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_scene-1) [scene](/consumer/cn/doc/harmonyos-references/network-boost-c-struct-network_scene#scene) | 网络场景类型。 |
| [NetworkBoost\_RecommendedAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_recommendedaction-1) [recommendedAction](/consumer/cn/doc/harmonyos-references/network-boost-c-struct-network_scene#recommendedaction) | 建议的数传策略。 |
| [NetworkBoost\_WeakSignalPrediction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-weak_signal_prediction) [weakSignalPrediction](/consumer/cn/doc/harmonyos-references/network-boost-c-struct-network_scene#weaksignalprediction) | 弱信号预测相关信息。 |

## 结构体成员变量说明

PhonePC/2in1Tablet

### pathType

PhonePC/2in1Tablet



```
1. NetworkBoost_PathType NetworkBoost_NetworkScene::pathType
```

**描述**

表明相应的数据路径上的网络场景信息。

### recommendedAction

PhonePC/2in1Tablet



```
1. NetworkBoost_RecommendedAction NetworkBoost_NetworkScene::recommendedAction
```

**描述**

建议的数传策略。

### scene

PhonePC/2in1Tablet



```
1. NetworkBoost_Scene NetworkBoost_NetworkScene::scene
```

**描述**

网络场景类型。

### weakSignalPrediction

PhonePC/2in1Tablet



```
1. NetworkBoost_WeakSignalPrediction NetworkBoost_NetworkScene::weakSignalPrediction
```

**描述**

弱信号预测相关信息。