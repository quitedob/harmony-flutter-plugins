## 概述

PhonePC/2in1TabletTVWearable

DNS规则配置。

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
| [Rcp\_DnsRuleType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_dnsruletype)[type](/consumer/cn/doc/harmonyos-references/_rcp___dns_rule#type) | 表示union中使用的数据类型。 |
| union {  [Rcp\_DnsServers](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___dns_servers) \* [dnsServers](/consumer/cn/doc/harmonyos-references/_rcp___dns_rule#dnsservers)  [Rcp\_StaticDnsRule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___static_dns_rule) \* [staticDnsRule](/consumer/cn/doc/harmonyos-references/_rcp___dns_rule#staticdnsrule)  [Rcp\_DynamicDnsRuleFunction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_dynamicdnsrulefunction) [dynamicDnsRule](/consumer/cn/doc/harmonyos-references/_rcp___dns_rule#dynamicdnsrule)  } | dnsServers：DNS服务器。  staticDnsRule：静态DNS规则。  dynamicDnsRule：动态DNS规则。 |

## 结构体成员变量说明

PhonePC/2in1TabletTVWearable

### dnsServers

PhonePC/2in1TabletTVWearable



```
1. Rcp_DnsServers* Rcp_DnsRule::dnsServers
```

**描述**

DNS服务器。

### dynamicDnsRule

PhonePC/2in1TabletTVWearable



```
1. Rcp_DynamicDnsRuleFunction Rcp_DnsRule::dynamicDnsRule
```

**描述**

动态DNS规则。

### staticDnsRule

PhonePC/2in1TabletTVWearable



```
1. Rcp_StaticDnsRule* Rcp_DnsRule::staticDnsRule
```

**描述**

静态DNS规则。

### type

PhonePC/2in1TabletTVWearable



```
1. Rcp_DnsRuleType Rcp_DnsRule::type
```

**描述**

表示union中使用的数据类型。