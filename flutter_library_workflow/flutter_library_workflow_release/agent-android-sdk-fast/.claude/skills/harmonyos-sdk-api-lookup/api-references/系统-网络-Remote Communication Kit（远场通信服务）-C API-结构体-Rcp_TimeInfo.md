## 概述

PhonePC/2in1TabletTVWearable

响应计时信息。

它将在[Rcp\_Response.timeInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___response#timeinfo)中被收集，[Rcp\_TracingConfiguration.collectTimeInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___tracing_configuration#collecttimeinfo)决定是否收集它。

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
| double [totalTime](/consumer/cn/doc/harmonyos-references/_rcp___time_info#totaltime) | HTTP传输（包括名称解析、TCP连接等）的总时间（毫秒）。 |
| double [nameLookUpTime](/consumer/cn/doc/harmonyos-references/_rcp___time_info#namelookuptime) | 从请求开始到完成远程主机名解析所用的时间（以毫秒为单位）。 |
| double [connectTime](/consumer/cn/doc/harmonyos-references/_rcp___time_info#connecttime) | 从请求开始到建立与远程主机（或代理）的连接的时间（以毫秒为单位）。 |
| double [preTransferTime](/consumer/cn/doc/harmonyos-references/_rcp___time_info#pretransfertime) | 从请求开始到准备就绪进行数据传输所花费的时间（以毫秒为单位）。 |
| double [fileTime](/consumer/cn/doc/harmonyos-references/_rcp___time_info#filetime) | 从远程文件的上次修改时间开始的时间（以毫秒为单位）。 |
| double [startTransferTime](/consumer/cn/doc/harmonyos-references/_rcp___time_info#starttransfertime) | 从开始到接收到第一个字节所花费的时间（以毫秒为单位）。 |
| double [redirectTime](/consumer/cn/doc/harmonyos-references/_rcp___time_info#redirecttime) | 所有重定向步骤（包括名称查找、连接等）所用的时间（毫秒）。 |
| double [tlsHandshakeTime](/consumer/cn/doc/harmonyos-references/_rcp___time_info#tlshandshaketime) | 从请求开始到建立与远程主机（或代理）的TLS握手的时间（以毫秒为单位）。 |

## 结构体成员变量说明

PhonePC/2in1TabletTVWearable

### connectTime

PhonePC/2in1TabletTVWearable



```
1. double Rcp_TimeInfo::connectTime
```

**描述**

从请求开始到建立与远程主机（或代理）的连接时间（以毫秒为单位）。

### fileTime

PhonePC/2in1TabletTVWearable



```
1. double Rcp_TimeInfo::fileTime
```

**描述**

从远程文件的上次修改时间开始的时间（以毫秒为单位）。

### nameLookUpTime

PhonePC/2in1TabletTVWearable



```
1. double Rcp_TimeInfo::nameLookUpTime
```

**描述**

从请求开始到完成远程主机名解析所用的时间（以毫秒为单位）。

### preTransferTime

PhonePC/2in1TabletTVWearable



```
1. double Rcp_TimeInfo::preTransferTime
```

**描述**

从请求开始到准备就绪进行数据传输所花费的时间（以毫秒为单位）。

### redirectTime

PhonePC/2in1TabletTVWearable



```
1. double Rcp_TimeInfo::redirectTime
```

**描述**

所有重定向步骤（包括名称查找、连接等）所用的时间（毫秒）。

### startTransferTime

PhonePC/2in1TabletTVWearable



```
1. double Rcp_TimeInfo::startTransferTime
```

**描述**

从开始到接收到第一个字节所花费的时间（以毫秒为单位）。

### tlsHandshakeTime

PhonePC/2in1TabletTVWearable



```
1. double Rcp_TimeInfo::tlsHandshakeTime
```

**描述**

从请求开始到建立与远程主机（或代理）的TLS握手的时间（以毫秒为单位）。

### totalTime

PhonePC/2in1TabletTVWearable



```
1. double Rcp_TimeInfo::totalTime
```

**描述**

HTTP传输（包括名称解析、TCP连接等）的总时间（毫秒）。