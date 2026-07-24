## 概述

PhonePC/2in1TabletTVWearable

自定义代理配置。

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
| const char \* [url](/consumer/cn/doc/harmonyos-references/_rcp___web_proxy#url) | 代理服务器的URL。如果您没有明确设置端口，则端口将为1080。 |
| [Rcp\_ProxyTunnelMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_proxytunnelmode)[createTunnel](/consumer/cn/doc/harmonyos-references/_rcp___web_proxy#createtunnel) | 用于控制何时创建代理隧道。 |
| [Rcp\_Exclusions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___exclusions)[exclusions](/consumer/cn/doc/harmonyos-references/_rcp___web_proxy#exclusions) | 如果[Rcp\_Request.url](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___request#url)匹配[Rcp\_Exclusions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___exclusions)规则，则[Rcp\_Request](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___request)将不使用代理。 |
| [Rcp\_SecurityConfiguration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___security_configuration)[securityConfiguration](/consumer/cn/doc/harmonyos-references/_rcp___web_proxy#securityconfiguration) | 代理中的[Rcp\_SecurityConfiguration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___security_configuration)。 |

## 结构体成员变量说明

PhonePC/2in1TabletTVWearable

### createTunnel

PhonePC/2in1TabletTVWearable



```
1. Rcp_ProxyTunnelMode Rcp_WebProxy::createTunnel
```

**描述**

用于控制何时创建代理隧道。

### exclusions

PhonePC/2in1TabletTVWearable



```
1. Rcp_Exclusions Rcp_WebProxy::exclusions
```

**描述**

如果[Rcp\_Request.url](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___request#url)匹配[Rcp\_Exclusions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___exclusions)规则，则[Rcp\_Request](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___request)将不使用代理。

### securityConfiguration

PhonePC/2in1TabletTVWearable



```
1. Rcp_SecurityConfiguration Rcp_WebProxy::securityConfiguration
```

**描述**

代理中的[Rcp\_SecurityConfiguration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___security_configuration)。

### url

PhonePC/2in1TabletTVWearable



```
1. const char* Rcp_WebProxy::url
```

**描述**

代理服务器的URL。如果您没有明确设置端口，则端口将为1080。