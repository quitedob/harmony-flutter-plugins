

```
1. typedef struct NetConn_NetCapabilities {...} NetConn_NetCapabilities
```

## 概述

PhonePC/2in1TabletTVWearable

网络能力集。

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
| uint32\_t linkUpBandwidthKbps | 上行带宽。 |
| uint32\_t linkDownBandwidthKbps | 下行带宽。 |
| [NetConn\_NetCap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-connection-type-h#netconn_netcap) netCaps[[NETCONN\_MAX\_CAP\_SIZE]](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-connection-type-h#宏定义) | 网络能力列表。 |
| int32\_t netCapsSize | 网络能力列表的实际size。 |
| [NetConn\_NetBearerType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-connection-type-h#netconn_netbearertype) bearerTypes[[NETCONN\_MAX\_BEARER\_TYPE\_SIZE]](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-connection-type-h#宏定义) | 承载类型列表 |
| int32\_t bearerTypesSize | 承载类型列表的实际size |