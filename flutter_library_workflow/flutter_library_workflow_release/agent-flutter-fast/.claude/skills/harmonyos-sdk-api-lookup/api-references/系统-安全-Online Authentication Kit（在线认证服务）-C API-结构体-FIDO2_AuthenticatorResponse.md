## 概述

定义获取认证器断言响应的结构体。

**起始版本：** 6.0.0(20)

**相关模块：** [FIDO2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/passkey)

## 汇总

### 成员变量

展开

| 名称 | 描述 |
| --- | --- |
| [Uint8Buff](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_uint8_buff) [authenticatorData](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___authenticator_response#authenticatordata) | 身份认证器数据。 |
| [Uint8Buff](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_uint8_buff) [signature](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___authenticator_response#signature) | 签名。 |
| [Uint8Buff](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_uint8_buff) [userHandle](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___authenticator_response#userhandle) | 用户句柄（用户ID）。可选。 |
| [Uint8Buff](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_uint8_buff) [clientDataJson](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___authenticator_response#clientdatajson) | 获取客户端数据，表示WebAuthn依赖方和客户端的上下文绑定，包含类型、挑战值及源等数据。 |

## 结构体成员变量说明

### authenticatorData



```
1. Uint8Buff FIDO2_AuthenticatorResponse::authenticatorData
```

**描述**

身份认证器数据。

### clientDataJson



```
1. Uint8Buff FIDO2_AuthenticatorResponse::clientDataJson
```

**描述**

获取客户端数据，表示WebAuthn依赖方和客户端的上下文绑定，包含类型、挑战值及源等数据。

### signature



```
1. Uint8Buff FIDO2_AuthenticatorResponse::signature
```

**描述**

签名。

### userHandle



```
1. Uint8Buff FIDO2_AuthenticatorResponse::userHandle
```

**描述**

用户句柄。可选。