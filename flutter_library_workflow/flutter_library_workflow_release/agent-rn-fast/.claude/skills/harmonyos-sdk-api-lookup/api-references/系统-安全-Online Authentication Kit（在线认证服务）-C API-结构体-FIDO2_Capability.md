## 概述

通行密钥能力的结构体。

**起始版本：** 6.0.0(20)

**相关模块：** [FIDO2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/passkey)

## 汇总

### 成员变量

展开

| 名称 | 描述 |
| --- | --- |
| [FIDO2\_ClientCapability](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/passkey#fido2_clientcapability-1) [capability](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___capability#capability) | 通行密钥的能力。 |
| bool [isSupported](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___capability#issupported) | 是否支持。如果为true表示支持，false表示不支持。 |

## 结构体成员变量说明

### capability



```
1. FIDO2_ClientCapability FIDO2_Capability::capability
```

**描述**

通行密钥的能力。

### isSupported



```
1. bool FIDO2_Capability::isSupported
```

**描述**

是否支持。如果为true表示支持，false表示不支持。