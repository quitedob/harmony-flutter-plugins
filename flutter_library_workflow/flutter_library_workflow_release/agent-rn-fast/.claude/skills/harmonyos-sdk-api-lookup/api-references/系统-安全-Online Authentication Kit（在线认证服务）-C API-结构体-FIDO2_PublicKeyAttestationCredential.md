## 概述

定义获取注册结果结构体。

**起始版本：** 6.0.0(20)

**相关模块：** [FIDO2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/passkey)

## 汇总

### 成员变量

展开

| 名称 | 描述 |
| --- | --- |
| [Uint8Buff](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_uint8_buff) [rawId](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___public_key_attestation_credential#rawid) | 原始凭据标识符。 |
| [FIDO2\_AuthenticatorAttestationResponse](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_i_d_o2___authenticator_attestation_response) [response](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___public_key_attestation_credential#response) | 认证器证明响应。 |
| [FIDO2\_AuthenticatorAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/passkey#fido2_authenticatorattachment-1) [authenticatorAttachment](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___public_key_attestation_credential#authenticatorattachment) | 认证器信息（平台、漫游）。默认值为FIDO2\_PLATFORM。可选。 |
| const char \* [id](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___public_key_attestation_credential#id) | 凭据的标识符。对于每种类型的凭据，标识符的要求都是不同的。 |
| const char \* [type](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___public_key_attestation_credential#type) | 此属性返回接口对象中指定凭据类型的槽值，它指定此对象所代表的凭据类型。 |
| [AuthenticationExtensionsClientOutputs](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_authentication_extensions_client_outputs) [clientExtensionResults](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___public_key_attestation_credential#clientextensionresults) | 客户端扩展结果。当前版本不支持扩展，因此占位符始终为NULL，必须将clientExtensionResults键对应的值解析为{}。 |

## 结构体成员变量说明

### authenticatorAttachment



```
1. FIDO2_AuthenticatorAttachment FIDO2_PublicKeyAttestationCredential::authenticatorAttachment
```

**描述**

认证器信息（平台、漫游）。可选。

### clientExtensionResults



```
1. AuthenticationExtensionsClientOutputs FIDO2_PublicKeyAttestationCredential::clientExtensionResults
```

**描述**

客户端扩展结果。当前版本不支持扩展，因此占位符始终为NULL，必须将clientExtensionResults键对应的值解析为{}。

### id



```
1. const char* FIDO2_PublicKeyAttestationCredential::id
```

**描述**

凭据的标识符。对于每种类型的凭据，标识符的要求都是不同的。

### rawId



```
1. Uint8Buff FIDO2_PublicKeyAttestationCredential::rawId
```

**描述**

原始凭据标识符。

### response



```
1. FIDO2_AuthenticatorAttestationResponse FIDO2_PublicKeyAttestationCredential::response
```

**描述**

认证器证明响应。

### type



```
1. const char* FIDO2_PublicKeyAttestationCredential::type
```

**描述**

此属性返回接口对象中指定凭据类型的槽值，它指定此对象所代表的凭据类型。