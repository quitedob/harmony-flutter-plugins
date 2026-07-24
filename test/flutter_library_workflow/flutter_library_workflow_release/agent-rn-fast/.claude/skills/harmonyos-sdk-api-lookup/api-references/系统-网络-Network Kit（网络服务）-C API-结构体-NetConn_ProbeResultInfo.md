

```
1. typedef struct NetConn_ProbeResultInfo {...} NetConn_ProbeResultInfo
```

## 概述

PhonePC/2in1TabletTVWearable

定义探测结果信息。

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
| uint8\_t lossRate | 丢包率，百分制，值100表示100%丢包；50表示50%丢包。 |
| uint32\_t rtt[[NETCONN\_MAX\_RTT\_NUM]](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-connection-type-h#宏定义) | 时延结果，包含最小、最大、平均、标准差。 |