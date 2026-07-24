

```
1. typedef struct NetConn_TraceRouteInfo {...} NetConn_TraceRouteInfo
```

## 概述

PhonePC/2in1TabletTVWearable

定义跟踪路由信息。

**起始版本：** 20

**相关模块：** [NetConnection](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netconnection)

**所在头文件：** [net\_connection\_type.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-connection-type-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| uint8\_t jumpNo | 跳数。 |
| char address[[NETCONN\_MAX\_STR\_LEN]](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-connection-type-h#宏定义) | 主机名或地址。 |
| uint32\_t rtt[[NETCONN\_MAX\_RTT\_NUM]](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-connection-type-h#宏定义) | 往返时间（单位：毫秒)，包含最大、最小、平均、标准差。 |