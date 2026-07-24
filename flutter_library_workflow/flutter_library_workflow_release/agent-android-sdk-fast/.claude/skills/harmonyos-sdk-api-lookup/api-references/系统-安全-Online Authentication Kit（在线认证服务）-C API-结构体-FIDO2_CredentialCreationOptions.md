## 概述

凭据请求的选项。

**起始版本：** 6.0.0(20)

**相关模块：** [FIDO2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/passkey)

## 汇总

### 成员变量

展开

| 名称 | 描述 |
| --- | --- |
| [FIDO2\_CredentialMediationRequirement](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/passkey#fido2_credentialmediationrequirement-1) [mediation](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___credential_creation_options#mediation) | 该操作是否需要用户参与。 |
| [FIDO2\_PublicKeyCredentialCreationOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_i_d_o2___public_key_credential_creation_options) [publicKey](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___credential_creation_options#publickey) | publicKey凭证请求的选项。 |

## 结构体成员变量说明

### mediation



```
1. FIDO2_CredentialMediationRequirement FIDO2_CredentialCreationOptions::mediation
```

**描述**

操作是否需要用户参与。

### publicKey



```
1. FIDO2_PublicKeyCredentialCreationOptions FIDO2_CredentialCreationOptions::publicKey
```

**描述**

publicKey凭证请求的选项。