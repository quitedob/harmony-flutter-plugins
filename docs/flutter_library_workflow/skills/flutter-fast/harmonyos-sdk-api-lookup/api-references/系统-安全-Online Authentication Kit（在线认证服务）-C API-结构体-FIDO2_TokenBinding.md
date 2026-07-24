## 概述

Token binding协议，用于客户端与依赖方通信。

**起始版本：** 6.0.0(20)

**相关模块：** [FIDO2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/passkey)

## 汇总

### 成员变量

展开

| 名称 | 描述 |
| --- | --- |
| [FIDO2\_TokenBindingStatus](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/passkey#fido2_tokenbindingstatus-1) [status](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___token_binding#status) | 客户端的绑定状态。 |
| char \* [id](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___token_binding#id) | 令牌绑定标识符。 |

## 结构体成员变量说明

### id



```
1. char* FIDO2_TokenBinding::id
```

**描述**

令牌绑定标识符。

### status



```
1. FIDO2_TokenBindingStatus FIDO2_TokenBinding::status
```

**描述**

客户端的绑定状态。