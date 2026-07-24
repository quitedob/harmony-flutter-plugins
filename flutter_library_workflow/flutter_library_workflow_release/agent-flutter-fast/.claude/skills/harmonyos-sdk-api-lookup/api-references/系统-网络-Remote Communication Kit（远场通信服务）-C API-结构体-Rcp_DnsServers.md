## 概述

PhonePC/2in1TabletTVWearable

DNS服务器。[Rcp\_DnsConfiguration.dnsRules](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___dns_configuration#dnsrules)中的类型之一。

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
| [Rcp\_IpAndPort](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___ip_and_port)[ipAndPort](/consumer/cn/doc/harmonyos-references/_rcp___dns_servers#ipandport) | IP和端口。 |
| struct [Rcp\_DnsServers](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___dns_servers) \* [next](/consumer/cn/doc/harmonyos-references/_rcp___dns_servers#next) | 链式存储。指向下一个[Rcp\_DnsServers](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___dns_servers)的指针。 |

## 结构体成员变量说明

PhonePC/2in1TabletTVWearable

### ipAndPort

PhonePC/2in1TabletTVWearable



```
1. Rcp_IpAndPort Rcp_DnsServers::ipAndPort
```

**描述**

IP和端口。

### next

PhonePC/2in1TabletTVWearable



```
1. struct Rcp_DnsServers* Rcp_DnsServers::next
```

**描述**

链式存储。指向下一个[Rcp\_DnsServers](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___dns_servers)的指针。