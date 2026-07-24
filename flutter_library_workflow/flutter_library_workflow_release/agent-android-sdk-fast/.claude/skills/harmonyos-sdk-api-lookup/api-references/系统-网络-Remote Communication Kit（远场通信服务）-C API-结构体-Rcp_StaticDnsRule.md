## 概述

PhonePC/2in1TabletTVWearable

静态DNS规则。

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
| [Rcp\_StaticDnsRuleItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___static_dns_rule_item)[staticDnsRule](/consumer/cn/doc/harmonyos-references/_rcp___static_dns_rule#staticdnsrule) | 单个静态DNS规则。 |
| struct [Rcp\_StaticDnsRule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___static_dns_rule) \* [next](/consumer/cn/doc/harmonyos-references/_rcp___static_dns_rule#next) | 链式存储。指向下一个[Rcp\_StaticDnsRule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___static_dns_rule)的指针。 |

## 结构体成员变量说明

PhonePC/2in1TabletTVWearable

### next

PhonePC/2in1TabletTVWearable



```
1. struct Rcp_StaticDnsRule* Rcp_StaticDnsRule::next
```

**描述**

链式存储。指向下一个[Rcp\_StaticDnsRule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___static_dns_rule)的指针。

### staticDnsRule

PhonePC/2in1TabletTVWearable



```
1. Rcp_StaticDnsRuleItem Rcp_StaticDnsRule::staticDnsRule
```

**描述**

单个静态DNS规则。