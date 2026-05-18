## 概述

认证器元数据。

**起始版本：** 6.0.0(20)

**相关模块：** [FIDO2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/passkey)

## 汇总

### 成员变量

展开

| 名称 | 描述 |
| --- | --- |
| [Uint8Buff](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_uint8_buff) [aaguid](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___authenticator_metadata#aaguid) | 认证器的aaguid。 |
| [FIDO2\_Uvm](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/passkey#fido2_uvm-1) [uvm](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___authenticator_metadata#uvm) | 支持的认证器类型。 |
| bool [isAvailable](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___authenticator_metadata#isavailable) | 认证器是否可用。 |

## 结构体成员变量说明

### aaguid



```
1. Uint8Buff FIDO2_AuthenticatorMetadata::aaguid
```

**描述**

认证器的aaguid。

### isAvailable



```
1. bool FIDO2_AuthenticatorMetadata::isAvailable
```

**描述**

认证器是否可用。如果返回true，则表示认证器可用；返回false，表示认证器不可用。

### uvm



```
1. FIDO2_Uvm FIDO2_AuthenticatorMetadata::uvm
```

**描述**

支持的认证器类型。