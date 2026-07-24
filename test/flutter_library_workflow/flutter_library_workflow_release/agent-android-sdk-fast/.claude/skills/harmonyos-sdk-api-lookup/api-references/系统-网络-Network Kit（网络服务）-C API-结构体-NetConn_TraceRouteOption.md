

```
1. typedef struct NetConn_TraceRouteOption {...} NetConn_TraceRouteOption
```

## 概述

PhonePC/2in1TabletTVWearable

定义网络跟踪路由选项。

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
| uint8\_t maxJumpNumber | 探测结果最大跳数，需要和TraceRouteInfo设置一致，最大可设置30跳，默认为30跳。 |
| NetConn\_PacketsType packetsType | 探测包协议类型，默认为NETCONN\_PACKETS\_ICMP。 |