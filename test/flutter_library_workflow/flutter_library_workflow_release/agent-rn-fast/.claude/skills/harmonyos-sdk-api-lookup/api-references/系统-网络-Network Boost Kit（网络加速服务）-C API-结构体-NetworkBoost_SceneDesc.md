## 概述

PhonePC/2in1Tablet

业务场景描述信息。

**起始版本：** 6.0.2(22)

**相关模块：** [NetworkBoost](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview)

**所在头文件：** [network\_boost.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-files-boost)

## 汇总

PhonePC/2in1Tablet

### 成员变量

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| [NetworkBoost\_ServiceType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_servicetype) [scene](/consumer/cn/doc/harmonyos-references/network-boost-c-struct-scene_desc#scene) | 表示业务场景类型。 |
| [NetworkBoost\_SceneEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_sceneevent) [sceneEvent](/consumer/cn/doc/harmonyos-references/network-boost-c-struct-scene_desc#sceneevent) | 表示业务场景事件。 |
| uint32\_t [startTime](/consumer/cn/doc/harmonyos-references/network-boost-c-struct-scene_desc#starttime) | 表示要经过多长时间进入到sceneEvent事件，单位为s。  - 0表示立即发生sceneEvent事件，默认为0。  - 大于0表示预测未来多长时间进入sceneEvent事件。 |
| uint32\_t [duration](/consumer/cn/doc/harmonyos-references/network-boost-c-struct-scene_desc#duration) | 预计本次设置的业务场景会持续的时长，单位为s。0表示持续时长未知，以SceneEvent的离开事件表示终止。开发者可以依据实际的场景类型进行选填。  例如：应用即将在10s后进入秒杀场景，预计持续20s。scene可以传入'seckillService'类型，sceneEvent填写SCENE\_EVENT\_ENTER，startTime可填写10，duration填写20。 |

## 结构体成员变量说明

PhonePC/2in1Tablet

## scene

PhonePC/2in1Tablet



```
1. NetworkBoost_ServiceType NetworkBoost_SceneDesc::scene
```

**描述**

表示业务场景类型。

## sceneEvent

PhonePC/2in1Tablet



```
1. NetworkBoost_SceneEvent NetworkBoost_SceneDesc::sceneEvent
```

**描述**

表示业务场景事件。

## startTime

PhonePC/2in1Tablet



```
1. uint32_t NetworkBoost_SceneDesc::startTime
```

**描述**

表示要经过多长时间进入到sceneEvent事件，单位为s。

## duration

PhonePC/2in1Tablet



```
1. uint32_t NetworkBoost_SceneDesc::duration
```

**描述**

预计本次设置的业务场景会持续的时长，单位为s。