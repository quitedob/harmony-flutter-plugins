

```
1. typedef struct NetConn_ConnectionProperties {...} NetConn_ConnectionProperties
```

## 概述

PhonePC/2in1TabletTVWearable

网络连接信息。

**起始版本：** 11

**相关模块：** [NetConnection](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netconnection)

**所在头文件：** [net\_connection\_type.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-connection-type-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| char ifaceName[[NETCONN\_MAX\_STR\_LEN]](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-connection-type-h#宏定义) | 网络接口的名称。 |
| char domain[[NETCONN\_MAX\_STR\_LEN]](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-connection-type-h#宏定义) | 网络连接的域名信息。 |
| char tcpBufferSizes[[NETCONN\_MAX\_STR\_LEN]](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-connection-type-h#宏定义) | TCP缓冲区大小。 |
| uint16\_t mtu | MTU。 |
| [NetConn\_NetAddr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netconnection-netconn-netaddr) netAddrList[[NETCONN\_MAX\_ADDR\_SIZE]](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-connection-type-h#宏定义) | 地址列表。 |
| int32\_t netAddrListSize | 地址列表的实际size。 |
| [NetConn\_NetAddr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netconnection-netconn-netaddr) dnsList[[NETCONN\_MAX\_ADDR\_SIZE]](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-connection-type-h#宏定义) | DNS列表。 |
| int32\_t dnsListSize | DNS列表的实际size。 |
| [NetConn\_Route](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netconnection-netconn-route) routeList[[NETCONN\_MAX\_ROUTE\_SIZE]](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-connection-type-h#宏定义) | 路由列表。 |
| int32\_t routeListSize | 路由列表的实际大小。 |
| [NetConn\_HttpProxy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netconnection-netconn-httpproxy) httpProxy | HTTP代理信息。 |