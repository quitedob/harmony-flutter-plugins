## 概述

PhonePC/2in1TabletTVWearable

请求配置。

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
| [Rcp\_TransferConfiguration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___transfer_configuration)[transferConfiguration](/consumer/cn/doc/harmonyos-references/_rcp___configuration#transferconfiguration) | 传输配置。 |
| [Rcp\_TracingConfiguration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___tracing_configuration)[tracingConfiguration](/consumer/cn/doc/harmonyos-references/_rcp___configuration#tracingconfiguration) | 请求追踪配置。 |
| [Rcp\_ProxyConfiguration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___proxy_configuration)[proxyConfiguration](/consumer/cn/doc/harmonyos-references/_rcp___configuration#proxyconfiguration) | 代理配置。 |
| [Rcp\_DnsConfiguration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___dns_configuration)[dnsConfiguration](/consumer/cn/doc/harmonyos-references/_rcp___configuration#dnsconfiguration) | DNS配置。 |
| [Rcp\_SecurityConfiguration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___security_configuration)[securityConfiguration](/consumer/cn/doc/harmonyos-references/_rcp___configuration#securityconfiguration) | 安全配置。 |
| void \* [configurationPrivate](/consumer/cn/doc/harmonyos-references/_rcp___configuration#configurationprivate) | 可扩展字段。 |

## 结构体成员变量说明

PhonePC/2in1TabletTVWearable

### configurationPrivate

PhonePC/2in1TabletTVWearable



```
1. void* Rcp_Configuration::configurationPrivate
```

**描述**

可扩展字段。

### dnsConfiguration

PhonePC/2in1TabletTVWearable



```
1. Rcp_DnsConfiguration Rcp_Configuration::dnsConfiguration
```

**描述**

DNS配置。

### proxyConfiguration

PhonePC/2in1TabletTVWearable



```
1. Rcp_ProxyConfiguration Rcp_Configuration::proxyConfiguration
```

**描述**

代理配置。

### securityConfiguration

PhonePC/2in1TabletTVWearable



```
1. Rcp_SecurityConfiguration Rcp_Configuration::securityConfiguration
```

**描述**

安全配置。

### tracingConfiguration

PhonePC/2in1TabletTVWearable



```
1. Rcp_TracingConfiguration Rcp_Configuration::tracingConfiguration
```

**描述**

请求追踪配置。

### transferConfiguration

PhonePC/2in1TabletTVWearable



```
1. Rcp_TransferConfiguration Rcp_Configuration::transferConfiguration
```

**描述**

传输配置。