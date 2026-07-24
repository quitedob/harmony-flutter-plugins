## 概述

认证器传输方式数组。

**起始版本：** 6.0.0(20)

**相关模块：** [FIDO2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/passkey)

## 汇总

### 成员变量

展开

| 名称 | 描述 |
| --- | --- |
| uint32\_t [transportNum](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___authenticator_transport_array#transportnum) | 传输方式数量。 |
| [FIDO2\_AuthenticatorTransport](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/passkey#fido2_authenticatortransport-1) \* [transports](/consumer/cn/doc/harmonyos-references/_f_i_d_o2___authenticator_transport_array#transports) | 定义身份认证器访问类型（USB、NFC、蓝牙）。 |

## 结构体成员变量说明

### transportNum



```
1. uint32_t FIDO2_AuthenticatorTransportArray::transportNum
```

**描述**

传输方式数量。

### transports



```
1. FIDO2_AuthenticatorTransport* FIDO2_AuthenticatorTransportArray::transports
```

**描述**

定义身份认证器访问类型（USB、NFC、蓝牙）。