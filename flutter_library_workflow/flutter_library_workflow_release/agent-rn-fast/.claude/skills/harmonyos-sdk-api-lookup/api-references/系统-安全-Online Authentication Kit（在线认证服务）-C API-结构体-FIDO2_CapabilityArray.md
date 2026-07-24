## 概述

描述能力数组。

**起始版本：** 6.0.0(20)

**相关模块：** [FIDO2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/passkey)

## 汇总

### 成员变量

展开

| 名称 | 描述 |
| --- | --- |
| uint32\_t [number](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___capability_array#number) | 能力的数量。 |
| [FIDO2\_Capability](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_i_d_o2___capability) \* [capability](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___capability_array#capability) | 能力的数组。 |

## 结构体成员变量说明

### capability



```
1. FIDO2_Capability* FIDO2_CapabilityArray::capability
```

**描述**

能力数组。

### number



```
1. uint32_t FIDO2_CapabilityArray::number
```

**描述**

能力数组长度。