## 概述

创建新的认证凭据的选项。

**起始版本：** 6.0.0(20)

**相关模块：** [FIDO2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/passkey)

## 汇总

### 成员变量

展开

| 名称 | 描述 |
| --- | --- |
| [FIDO2\_PublicKeyCredentialRpEntity](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_i_d_o2___public_key_credential_rp_entity) [rp](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___public_key_credential_creation_options#rp) | 创建新凭据时的依赖方属性。 |
| [FIDO2\_PublicKeyCredentialUserEntity](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_i_d_o2___public_key_credential_user_entity) [user](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___public_key_credential_creation_options#user) | 创建新凭据时用户的属性。 |
| [Uint8Buff](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_uint8_buff) [challenge](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___public_key_credential_creation_options#challenge) | 挑战值。 |
| [FIDO2\_CredentialCreationOptionArray](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_i_d_o2___credential_creation_option_array) [pubKeyCredParams](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___public_key_credential_creation_options#pubkeycredparams) | 认证凭据的附加参数数组。 |
| uint32\_t [timeout](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___public_key_credential_creation_options#timeout) | 注册操作最长时间，单位为毫秒。默认为300000（5分钟）。可选。 |
| [FIDO2\_PublicKeyCredentialDescriptorArray](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_i_d_o2___public_key_credential_descriptor_array) [excludeCredentials](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___public_key_credential_creation_options#excludecredentials) | FIDO服务器已注册的凭据列表。默认值为[]。可选。 |
| [FIDO2\_AuthenticatorSelectionCriteria](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_i_d_o2___authenticator_selection_criteria) [authenticatorSelection](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___public_key_credential_creation_options#authenticatorselection) | 身份认证器相关配置项。 |
| [FIDO2\_PublicKeyCredentialHintArray](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_i_d_o2___public_key_credential_hint_array) [hints](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___public_key_credential_creation_options#hints) | 认证方式指示。默认值为[]。可选。 |
| [FIDO2\_AttestationConveyancePreference](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/passkey#fido2_attestationconveyancepreference-1) [attestation](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___public_key_credential_creation_options#attestation) | 凭据传递首选项。默认值为none，可选。 |
| [FIDO2\_AttestationFormatsArray](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_i_d_o2___attestation_formats_array) [attestationFormats](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___public_key_credential_creation_options#attestationformats) | 依赖方可以使用此选项指定有关认证方使用的证明声明格式的偏好。默认值为[]。 |
| char \* [extensions](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___public_key_credential_creation_options#extensions) | 扩展名必须是表示Map<string, Object>对象的JSON字符串。默认空。可选。 |

## 结构体成员变量说明

### attestation



```
1. FIDO2_AttestationConveyancePreference FIDO2_PublicKeyCredentialCreationOptions::attestation
```

**描述**

凭据传递首选项。默认值为none，可选。

### attestationFormats



```
1. FIDO2_AttestationFormatsArray FIDO2_PublicKeyCredentialCreationOptions::attestationFormats
```

**描述**

依赖方可以使用此选项指定有关认证方使用的证明声明格式的偏好。默认值为[]。

### authenticatorSelection



```
1. FIDO2_AuthenticatorSelectionCriteria FIDO2_PublicKeyCredentialCreationOptions::authenticatorSelection
```

**描述**

身份认证器相关配置项。

### challenge



```
1. Uint8Buff FIDO2_PublicKeyCredentialCreationOptions::challenge
```

**描述**

挑战。

### excludeCredentials



```
1. FIDO2_PublicKeyCredentialDescriptorArray FIDO2_PublicKeyCredentialCreationOptions::excludeCredentials
```

**描述**

FIDO服务器已注册的凭据列表。默认值为[]。可选。

### extensions



```
1. char* FIDO2_PublicKeyCredentialCreationOptions::extensions
```

**描述**

扩展名必须是表示Map<string, Object>对象的JSON字符串。可选。

### hints



```
1. FIDO2_PublicKeyCredentialHintArray FIDO2_PublicKeyCredentialCreationOptions::hints
```

**描述**

认证方式指示。默认值为[]。可选。

### pubKeyCredParams



```
1. FIDO2_CredentialCreationOptionArray FIDO2_PublicKeyCredentialCreationOptions::pubKeyCredParams
```

**描述**

认证凭据的附加参数数组。

### rp



```
1. FIDO2_PublicKeyCredentialRpEntity FIDO2_PublicKeyCredentialCreationOptions::rp
```

**描述**

创建新凭据时的依赖方属性。

### timeout



```
1. uint32_t FIDO2_PublicKeyCredentialCreationOptions::timeout
```

**描述**

注册操作最长时间，单位为毫秒。可选。

### user



```
1. FIDO2_PublicKeyCredentialUserEntity FIDO2_PublicKeyCredentialCreationOptions::user
```

**描述**

创建新凭据时用户的属性。