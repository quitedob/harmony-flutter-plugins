## 概述

认证方式指示数组。

**起始版本：** 6.0.0(20)

**相关模块：** [FIDO2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/passkey)

## 汇总

### 成员变量

展开

| 名称 | 描述 |
| --- | --- |
| uint32\_t [hintNum](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___public_key_credential_hint_array#hintnum) | 认证方式指示数目。 |
| [FIDO2\_PublicKeyCredentialHint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/passkey#fido2_publickeycredentialhint-1) \* [hints](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___public_key_credential_hint_array#hints) | 认证方式指示列表。 |

## 结构体成员变量说明

### hintNum



```
1. uint32_t FIDO2_PublicKeyCredentialHintArray::hintNum
```

**描述**

认证方式指示数目。

### hints



```
1. FIDO2_PublicKeyCredentialHint* FIDO2_PublicKeyCredentialHintArray::hints
```

**描述**

认证方式指示列表。