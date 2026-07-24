## 概述

认证凭据的附加参数数组。

**起始版本：** 6.0.0(20)

**相关模块：** [FIDO2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/passkey)

## 汇总

### 成员变量

展开

| 名称 | 描述 |
| --- | --- |
| uint32\_t [pubKeyCredParamNum](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___credential_creation_option_array#pubkeycredparamnum) | PubKeyCredParam参数数目。 |
| [FIDO2\_PublicKeyCredentialParameters](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_i_d_o2___public_key_credential_parameters) \* [pubKeyCredParams](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___credential_creation_option_array#pubkeycredparams) | 认证凭据的附加参数。 |

## 结构体成员变量说明

### pubKeyCredParamNum



```
1. uint32_t FIDO2_CredentialCreationOptionArray::pubKeyCredParamNum
```

**描述**

PubKeyCredParam参数数目。

### pubKeyCredParams



```
1. FIDO2_PublicKeyCredentialParameters* FIDO2_CredentialCreationOptionArray::pubKeyCredParams
```

**描述**

认证凭据的附加参数。