## 概述

PhonePC/2in1Tablet

连接迁移完成信息。

**起始版本：** 5.1.0(18)

**相关模块：** [NetworkBoost](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview)

**所在头文件：** [network\_boost\_handover.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-files-handover)

## 汇总

PhonePC/2in1Tablet

### 成员变量

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| [NetworkBoost\_ErrorResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_errorresult-1) [result](/consumer/cn/doc/harmonyos-references/network-boost-c-struct-handover_complete#result) | 连接迁移结果。 |
| bool [handoverContinue](/consumer/cn/doc/harmonyos-references/network-boost-c-struct-handover_complete#handovercontinue) | 是否继续等待HandoverComplete消息，当存在两条以上路径时，会存在多个HandoverComplete消息。  true表示还有新链路待激活，系统还会上报HandoverComplete消息，一般发生在连接迁移到多个网络的场景。  false表示当前已经是最后一个HandoverComplete消息，连接迁移流程完成。 |
| uint32\_t [oldPathLifetime](/consumer/cn/doc/harmonyos-references/network-boost-c-struct-handover_complete#oldpathlifetime) | 老链路的剩余生存时长，单位为s，取值为任意正整数或0。 |
| [NetworkBoost\_DataSpeedAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-data_speed_action) [oldDataSpeedAction](/consumer/cn/doc/harmonyos-references/network-boost-c-struct-handover_complete#olddataspeedaction) | 老链路发包建议。 |
| bool [pathTypeChanged](/consumer/cn/doc/harmonyos-references/network-boost-c-struct-handover_complete#pathtypechanged) | 新老链路类型是否发生变更。true表示发生变化，如Wi-Fi<->蜂窝。false表示没有发生变化。 |
| [NetworkBoost\_NetHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-net_handle) [newNetHandle](/consumer/cn/doc/harmonyos-references/network-boost-c-struct-handover_complete#newnethandle) | 新链路的NetHandle信息。 |
| [NetworkBoost\_ReEstAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_reestaction-1) [reEstAction](/consumer/cn/doc/harmonyos-references/network-boost-c-struct-handover_complete#reestaction) | 链路重建类型。 |
| [NetworkBoost\_DataSpeedAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-data_speed_action) [newDataSpeedAction](/consumer/cn/doc/harmonyos-references/network-boost-c-struct-handover_complete#newdataspeedaction) | 新链路发包建议。 |

## 结构体成员变量说明

PhonePC/2in1Tablet

### handoverContinue

PhonePC/2in1Tablet



```
1. bool NetworkBoost_HandoverComplete::handoverContinue
```

**描述**

是否继续等待HandoverComplete消息，当存在两条以上路径时，会存在多个HandoverComplete消息。

true表示还有新链路待激活，系统还会上报HandoverComplete消息，一般发生在连接迁移到多个网络的场景。

false表示当前已经是最后一个HandoverComplete消息，连接迁移流程完成。

### newDataSpeedAction

PhonePC/2in1Tablet



```
1. NetworkBoost_DataSpeedAction NetworkBoost_HandoverComplete::newDataSpeedAction
```

**描述**

新链路发包建议。

### newNetHandle

PhonePC/2in1Tablet



```
1. NetworkBoost_NetHandle NetworkBoost_HandoverComplete::newNetHandle
```

**描述**

新链路的NetHandle信息。

### oldDataSpeedAction

PhonePC/2in1Tablet



```
1. NetworkBoost_DataSpeedAction NetworkBoost_HandoverComplete::oldDataSpeedAction
```

**描述**

老链路发包建议。

### oldPathLifetime

PhonePC/2in1Tablet



```
1. uint32_t NetworkBoost_HandoverComplete::oldPathLifetime
```

**描述**

老链路的剩余生存时长，单位为s，取值为任意正整数或0。

### pathTypeChanged

PhonePC/2in1Tablet



```
1. bool NetworkBoost_HandoverComplete::pathTypeChanged
```

**描述**

新老链路类型是否发生变更。true表示发生变化，如Wi-Fi<->蜂窝。false表示没有发生变化。

### reEstAction

PhonePC/2in1Tablet



```
1. NetworkBoost_ReEstAction NetworkBoost_HandoverComplete::reEstAction
```

**描述**

链路重建类型。

### result

PhonePC/2in1Tablet



```
1. NetworkBoost_ErrorResult NetworkBoost_HandoverComplete::result
```

**描述**

连接迁移结果。