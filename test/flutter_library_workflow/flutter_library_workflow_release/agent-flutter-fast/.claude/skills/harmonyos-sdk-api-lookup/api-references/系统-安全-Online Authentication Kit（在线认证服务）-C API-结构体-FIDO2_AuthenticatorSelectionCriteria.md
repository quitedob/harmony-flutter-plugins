## 概述

由webAuthn依赖方指定，与认证器有关。

**起始版本：** 6.0.0(20)

**相关模块：** [FIDO2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/passkey)

## 汇总

### 成员变量

展开

| 名称 | 描述 |
| --- | --- |
| [FIDO2\_AuthenticatorAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/passkey#fido2_authenticatorattachment-1) [authenticatorAttachment](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___authenticator_selection_criteria#authenticatorattachment) | 认证器信息（平台、漫游）。默认值为FIDO2\_PLATFORM。可选。 |
| const char \* [residentKey](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___authenticator_selection_criteria#residentkey) | 常驻键。默认空。可选。 |
| bool [requireResidentKey](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___authenticator_selection_criteria#requireresidentkey) | 是否需要常驻键，true代表需要常驻键，false代表不需要。默认值为false。可选。 |
| [FIDO2\_UserVerificationRequirement](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/passkey#fido2_userverificationrequirement-1) [userVerification](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___authenticator_selection_criteria#userverification) | 用户认证需求枚举。默认值为preferred。可选。 |

## 结构体成员变量说明

### authenticatorAttachment



```
1. FIDO2_AuthenticatorAttachment FIDO2_AuthenticatorSelectionCriteria::authenticatorAttachment
```

**描述**

认证器信息（平台、漫游）。可选。

### requireResidentKey



```
1. bool FIDO2_AuthenticatorSelectionCriteria::requireResidentKey
```

**描述**

是否需要常驻键，true代表需要常驻键，false代表不需要。默认值为false。可选。

### residentKey



```
1. const char* FIDO2_AuthenticatorSelectionCriteria::residentKey
```

**描述**

常驻键。可选。

### userVerification



```
1. FIDO2_UserVerificationRequirement FIDO2_AuthenticatorSelectionCriteria::userVerification
```

**描述**

用户认证需求枚举。默认值为preferred。可选。