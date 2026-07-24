## 概述

PhonePC/2in1TabletTVWearable

服务器身份验证。

**起始版本：** 5.0.0(12)

**相关模块：** [RemoteCommunication](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview)

**所在头文件：** [rcp.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/rcp_8h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [Rcp\_Credential](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___credential)[credential](/consumer/cn/doc/harmonyos-references/_rcp___server_authentication#credential) | 服务器的凭据。 |
| [Rcp\_AuthenticationType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_authenticationtype)[authenticationType](/consumer/cn/doc/harmonyos-references/_rcp___server_authentication#authenticationtype) | 服务器的身份验证类型。如果未设置，请与服务器协商。 |

## 结构体成员变量说明

PhonePC/2in1TabletTVWearable

### authenticationType

PhonePC/2in1TabletTVWearable



```
1. Rcp_AuthenticationType Rcp_ServerAuthentication::authenticationType
```

**描述**

服务器的身份验证类型。如果未设置，请与服务器协商。

### credential

PhonePC/2in1TabletTVWearable



```
1. Rcp_Credential Rcp_ServerAuthentication::credential
```

**描述**

服务器的凭据。