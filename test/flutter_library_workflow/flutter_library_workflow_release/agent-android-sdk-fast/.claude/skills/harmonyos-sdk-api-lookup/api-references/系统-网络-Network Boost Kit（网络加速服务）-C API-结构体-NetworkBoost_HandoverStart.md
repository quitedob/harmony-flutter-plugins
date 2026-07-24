## 概述

PhonePC/2in1Tablet

连接迁移开始信息。

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
| uint32\_t [expires](/consumer/cn/doc/harmonyos-references/network-boost-c-struct-handover_start#expires) | 连接迁移全流程的超时时间，单位为s，取值为任意正整数或者0。 |
| [NetworkBoost\_DataSpeedAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-data_speed_action) [dataSpeedAction](/consumer/cn/doc/harmonyos-references/network-boost-c-struct-handover_start#dataspeedaction) | 老链路的发包建议。 |

## 结构体成员变量说明

PhonePC/2in1Tablet

### dataSpeedAction

PhonePC/2in1Tablet



```
1. NetworkBoost_DataSpeedAction NetworkBoost_HandoverStart::dataSpeedAction
```

**描述**

老链路的发包建议。

### expires

PhonePC/2in1Tablet



```
1. uint32_t NetworkBoost_HandoverStart::expires
```

**描述**

连接迁移全流程的超时时间，单位为s，取值为任意正整数或者0。