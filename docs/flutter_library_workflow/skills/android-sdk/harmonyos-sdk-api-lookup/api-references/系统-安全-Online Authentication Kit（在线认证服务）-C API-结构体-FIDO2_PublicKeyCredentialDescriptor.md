## 概述

用于注册或认证凭据的参数。

**起始版本：** 6.0.0(20)

**相关模块：** [FIDO2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/passkey)

## 汇总

### 成员变量

展开

| 名称 | 描述 |
| --- | --- |
| [FIDO2\_PublicKeyCredentialType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/passkey#fido2_publickeycredentialtype-1) [type](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___public_key_credential_descriptor#type) | 凭证类型。 |
| [Uint8Buff](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_uint8_buff) [id](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___public_key_credential_descriptor#id) | 凭据标识符。 |
| [FIDO2\_AuthenticatorTransportArray](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_i_d_o2___authenticator_transport_array) [transports](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___public_key_credential_descriptor#transports) | 定义身份认证器访问类型（USB、NFC、蓝牙）。 |

## 结构体成员变量说明

### id



```
1. Uint8Buff FIDO2_PublicKeyCredentialDescriptor::id
```

**描述**

凭据标识符。

### transports



```
1. FIDO2_AuthenticatorTransportArray FIDO2_PublicKeyCredentialDescriptor::transports
```

**描述**

定义身份认证器访问类型（USB、NFC、蓝牙）。

### type



```
1. FIDO2_PublicKeyCredentialType FIDO2_PublicKeyCredentialDescriptor::type
```

**描述**

凭证类型。