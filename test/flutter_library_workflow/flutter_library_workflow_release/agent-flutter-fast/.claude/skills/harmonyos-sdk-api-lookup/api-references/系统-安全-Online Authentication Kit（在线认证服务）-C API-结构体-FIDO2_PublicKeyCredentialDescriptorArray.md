## 概述

PublicKey凭证描述符数组。

**起始版本：** 6.0.0(20)

**相关模块：** [FIDO2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/passkey)

## 汇总

### 成员变量

展开

| 名称 | 描述 |
| --- | --- |
| uint32\_t [allowCredentiallNum](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___public_key_credential_descriptor_array#allowcredentiallnum) | 允许凭证数目。 |
| [FIDO2\_PublicKeyCredentialDescriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_i_d_o2___public_key_credential_descriptor) \* [allowCredentials](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___public_key_credential_descriptor_array#allowcredentials) | 认证凭据的附加参数列表。默认值为[]。 |

## 结构体成员变量说明

### allowCredentiallNum



```
1. uint32_t FIDO2_PublicKeyCredentialDescriptorArray::allowCredentiallNum
```

**描述**

允许凭证数目。

### allowCredentials



```
1. FIDO2_PublicKeyCredentialDescriptor* FIDO2_PublicKeyCredentialDescriptorArray::allowCredentials
```

**描述**

认证凭据的附加参数列表。默认值为[]。