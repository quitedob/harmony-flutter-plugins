

```
1. typedef struct {...} Telephony_NetworkState
```

## 概述

PhoneTabletWearable

网络状态信息。

**起始版本：** 13

**相关模块：** [Telephony](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-telephony)

**所在头文件：** [telephony\_radio\_type.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-telephony-radio-type-h)

## 汇总

PhoneTabletWearable

### 成员变量

PhoneTabletWearable

展开

| 名称 | 描述 |
| --- | --- |
| char longOperatorName\_[TELEPHONY\_MAX\_OPERATOR\_LEN] | 注册网络的长运营商名称。 |
| char shortOperatorName\_[TELEPHONY\_MAX\_OPERATOR\_LEN] | 注册网络的短运营商名称。 |
| char plmnNumeric\_[TELEPHONY\_MAX\_PLMN\_NUMERIC\_LEN] | 注册网络的PLMN码。 |
| bool isRoaming\_ | 是否处于漫游状态。 |
| Telephony\_RegState regState\_ | 设备的网络注册状态。 |
| Telephony\_RadioTechnology cfgTech\_ | 设备的无线接入技术。 |
| Telephony\_NsaState nsaState\_ | 设备的NSA网络注册状态。 |
| bool isCaActive\_ | CA的状态。 |
| bool isEmergency\_ | 此设备是否只允许拨打紧急呼叫。 |