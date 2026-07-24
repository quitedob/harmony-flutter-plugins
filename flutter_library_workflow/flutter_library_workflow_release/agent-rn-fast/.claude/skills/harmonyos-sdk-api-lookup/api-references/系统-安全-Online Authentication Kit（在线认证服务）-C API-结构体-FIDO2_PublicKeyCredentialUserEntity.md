## 概述

创建新凭据时用户的属性。

**起始版本：** 6.0.0(20)

**相关模块：** [FIDO2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/passkey)

## 汇总

### 成员变量

展开

| 名称 | 描述 |
| --- | --- |
| [Uint8Buff](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_uint8_buff) [id](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___public_key_credential_user_entity#id) | 凭据的标识符。 |
| char \* [displayName](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___public_key_credential_user_entity#displayname) | 前台显示的用户名。 |
| char \* [name](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___public_key_credential_user_entity#name) | 用户名。 |

## 结构体成员变量说明

### displayName



```
1. char* FIDO2_PublicKeyCredentialUserEntity::displayName
```

**描述**

前台显示的用户名。

### id



```
1. Uint8Buff FIDO2_PublicKeyCredentialUserEntity::id
```

**描述**

凭据的标识符。

### name



```
1. char* FIDO2_PublicKeyCredentialUserEntity::name
```

**描述**

用户名。