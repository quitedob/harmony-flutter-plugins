## 概述

PhoneTabletWearable

为网络搜索模块定义C接口。

**引用文件：** <telephony/core\_service/telephony\_radio.h>

**库：** libtelephony\_radio.so

**系统能力：** SystemCapability.Telephony.CoreService

**起始版本：** 13

**相关模块：** [Telephony](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-telephony)

## 汇总

PhoneTabletWearable

### 函数

PhoneTabletWearable

展开

| 名称 | 描述 |
| --- | --- |
| [Telephony\_RadioResult OH\_Telephony\_GetNetworkState(Telephony\_NetworkState \*state)](/consumer/cn/doc/harmonyos-references/capi-telephony-radio-h#oh_telephony_getnetworkstate) | 获取网络状态。 |
| [Telephony\_RadioResult OH\_Telephony\_GetNetworkStateForSlot(int32\_t slotId, Telephony\_NetworkState \*state)](/consumer/cn/doc/harmonyos-references/capi-telephony-radio-h#oh_telephony_getnetworkstateforslot) | 获取给定卡槽ID的网络状态。 |

## 函数说明

PhoneTabletWearable

### OH\_Telephony\_GetNetworkState()

PhoneTabletWearable



```
1. Telephony_RadioResult OH_Telephony_GetNetworkState(Telephony_NetworkState *state)
```

**描述**

获取网络状态。

**系统能力：** SystemCapability.Telephony.CoreService

**需要权限：** ohos.permission.GET\_NETWORK\_INFO

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Telephony\_NetworkState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-telephony-telephony-networkstate) \*state | 用户接收网络状态信息的结构体。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Telephony\_RadioResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-telephony-radio-type-h#telephony_radioresult) | 结果定义在 [Telephony\_RadioResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-telephony-radio-type-h#telephony_radioresult)。  [TEL\_RADIO\_SUCCESS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-telephony-radio-type-h#telephony_radioresult) 成功。  [TEL\_RADIO\_PERMISSION\_DENIED](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-telephony-radio-type-h#telephony_radioresult) 权限错误。  [TEL\_RADIO\_ERR\_MARSHALLING\_FAILED](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-telephony-radio-type-h#telephony_radioresult) 编组错误。  [TEL\_RADIO\_ERR\_SERVICE\_CONNECTION\_FAILED](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-telephony-radio-type-h#telephony_radioresult) 连接电话服务错误。  [TEL\_RADIO\_ERR\_OPERATION\_FAILED](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-telephony-radio-type-h#telephony_radioresult) 操作电话服务错误。  [TEL\_RADIO\_ERR\_INVALID\_PARAM](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-telephony-radio-type-h#telephony_radioresult) 参数错误。 |

### OH\_Telephony\_GetNetworkStateForSlot()

PhoneTabletWearable



```
1. Telephony_RadioResult OH_Telephony_GetNetworkStateForSlot(int32_t slotId, Telephony_NetworkState *state)
```

**描述**

获取给定卡槽ID的网络状态。

**系统能力：** SystemCapability.Telephony.CoreService

**需要权限：** ohos.permission.GET\_NETWORK\_INFO

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| int32\_t slotId | 卡槽ID。 |
| [Telephony\_NetworkState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-telephony-telephony-networkstate) \*state | 用户接收网络状态信息的结构体。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Telephony\_RadioResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-telephony-radio-type-h#telephony_radioresult) | 结果定义在 [Telephony\_RadioResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-telephony-radio-type-h#telephony_radioresult)。  [TEL\_RADIO\_SUCCESS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-telephony-radio-type-h#telephony_radioresult) 成功。  [TEL\_RADIO\_PERMISSION\_DENIED](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-telephony-radio-type-h#telephony_radioresult) 权限错误。  [TEL\_RADIO\_ERR\_MARSHALLING\_FAILED](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-telephony-radio-type-h#telephony_radioresult) 编组错误。  [TEL\_RADIO\_ERR\_SERVICE\_CONNECTION\_FAILED](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-telephony-radio-type-h#telephony_radioresult) 连接电话服务错误。  [TEL\_RADIO\_ERR\_OPERATION\_FAILED](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-telephony-radio-type-h#telephony_radioresult) 操作电话服务错误。  [TEL\_RADIO\_ERR\_INVALID\_PARAM](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-telephony-radio-type-h#telephony_radioresult) 参数错误。 |