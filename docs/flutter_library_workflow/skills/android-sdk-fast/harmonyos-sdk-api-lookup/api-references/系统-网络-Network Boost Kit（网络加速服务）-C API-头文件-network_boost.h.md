## 概述

PhonePC/2in1Tablet

声明用于网络加速的API。提供基本的函数、结构体和const定义。

**引用文件：** <NetworkBoostKit/network\_boost.h>

**库：** libnetwork\_boost.so

**系统能力：** SystemCapability.Communication.NetworkBoost.Core

**起始版本：** 6.0.2(22)

**相关模块：** [NetworkBoost](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview)

## 汇总

PhonePC/2in1Tablet

## 结构体

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| struct [NetworkBoost\_SceneDesc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-scene_desc) | 业务场景描述信息。 |

## 枚举

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| struct [NetworkBoost\_SceneEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_sceneevent){  SCENE\_EVENT\_ENTER = 0, SCENE\_EVENT\_UPDATE = 1, SCENE\_EVENT\_LEAVE = 2  } | 业务事件枚举。 |

## 函数

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| int32\_t [HMS\_NetworkBoost\_SetSceneDesc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#hms_networkboost_setscenedesc)([NetworkBoost\_SceneDesc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-scene_desc) sceneDesc) | 设置业务场景。 |