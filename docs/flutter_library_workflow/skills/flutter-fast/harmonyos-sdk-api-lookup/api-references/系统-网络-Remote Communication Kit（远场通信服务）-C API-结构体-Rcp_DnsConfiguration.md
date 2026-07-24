## 概述

PhonePC/2in1TabletTVWearable

DNS解析配置。

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
| [Rcp\_DnsRule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___dns_rule) \* [dnsRules](/consumer/cn/doc/harmonyos-references/_rcp___dns_configuration#dnsrules) | DNS规则配置。 |
| [Rcp\_DnsOverHttps](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___dns_over_https)[dnsOverHttps](/consumer/cn/doc/harmonyos-references/_rcp___dns_configuration#dnsoverhttps) | DOH配置。 |

## 结构体成员变量说明

PhonePC/2in1TabletTVWearable

### dnsOverHttps

PhonePC/2in1TabletTVWearable



```
1. Rcp_DnsOverHttps Rcp_DnsConfiguration::dnsOverHttps
```

**描述**

DOH配置。

### dnsRules

PhonePC/2in1TabletTVWearable



```
1. Rcp_DnsRule* Rcp_DnsConfiguration::dnsRules
```

**描述**

DNS规则配置。

[Rcp\_DnsServers](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___dns_servers): 表示优先使用指定的dns服务器解析主机名。

[Rcp\_StaticDnsRule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___static_dns_rule): 表示如果主机名匹配，则优先使用指定的地址。

[Rcp\_DynamicDnsRuleFunction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_dynamicdnsrulefunction): 表示优先使用函数中返回的地址。