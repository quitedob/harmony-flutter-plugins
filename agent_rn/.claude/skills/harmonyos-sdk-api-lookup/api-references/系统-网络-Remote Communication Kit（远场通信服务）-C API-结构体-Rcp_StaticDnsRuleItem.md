## 概述

PhonePC/2in1TabletTVWearable

描述单个静态DNS规则。

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
| char [host](/consumer/cn/doc/harmonyos-references/_rcp___static_dns_rule_item#host) [[RCP\_HOST\_MAX\_LEN](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_host_max_len)] | 主机名。 |
| uint16\_t [port](/consumer/cn/doc/harmonyos-references/_rcp___static_dns_rule_item#port) | 端口号。范围： [0, 65535]。 |
| [Rcp\_IpAddress](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___ip_address) \* [ipAddresses](/consumer/cn/doc/harmonyos-references/_rcp___static_dns_rule_item#ipaddresses) | 表示[Rcp\_StaticDnsRuleItem.host](/consumer/cn/doc/harmonyos-references/_rcp___static_dns_rule_item#host)对应的IP地址。 |

## 结构体成员变量说明

PhonePC/2in1TabletTVWearable

### host

PhonePC/2in1TabletTVWearable



```
1. char Rcp_StaticDnsRuleItem::host[RCP_HOST_MAX_LEN]
```

**描述**

主机名。

### ipAddresses

PhonePC/2in1TabletTVWearable



```
1. Rcp_IpAddress* Rcp_StaticDnsRuleItem::ipAddresses
```

**描述**

表示[Rcp\_StaticDnsRuleItem.host](/consumer/cn/doc/harmonyos-references/_rcp___static_dns_rule_item#host)对应的IP地址。

### port

PhonePC/2in1TabletTVWearable



```
1. uint16_t Rcp_StaticDnsRuleItem::port
```

**描述**

端口号。范围： [0, 65535]。