## 概述

PhonePC/2in1TabletTVWearable

请求追踪配置。

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
| bool [verbose](/consumer/cn/doc/harmonyos-references/_rcp___tracing_configuration#verbose) | 请求运行时是否记录详细日志。默认值为false。如果设置了infoToCollect中的选项，则自动启用。 |
| [Rcp\_InfoToCollect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___info_to_collect)[infoToCollect](/consumer/cn/doc/harmonyos-references/_rcp___tracing_configuration#infotocollect) | 指定要收集的请求处理事件。可以通过响应对象检查收集的事件。 |
| bool [collectTimeInfo](/consumer/cn/doc/harmonyos-references/_rcp___tracing_configuration#collecttimeinfo) | 是否收集请求计时信息。默认值为false。 |
| [Rcp\_EventsHandler](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___events_handler)[httpEventsHandler](/consumer/cn/doc/harmonyos-references/_rcp___tracing_configuration#httpeventshandler) | 监听不同HTTP事件的回调函数。 |

## 结构体成员变量说明

PhonePC/2in1TabletTVWearable

### collectTimeInfo

PhonePC/2in1TabletTVWearable



```
1. bool Rcp_TracingConfiguration::collectTimeInfo
```

**描述**

是否收集请求计时信息。默认值为false。

### httpEventsHandler

PhonePC/2in1TabletTVWearable



```
1. Rcp_EventsHandler Rcp_TracingConfiguration::httpEventsHandler
```

**描述**

监听不同HTTP事件的回调函数。

### infoToCollect

PhonePC/2in1TabletTVWearable



```
1. Rcp_InfoToCollect Rcp_TracingConfiguration::infoToCollect
```

**描述**

指定要收集的请求处理事件。可以通过响应对象检查收集的事件。

### verbose

PhonePC/2in1TabletTVWearable



```
1. bool Rcp_TracingConfiguration::verbose
```

**描述**

请求运行时是否记录详细日志。默认值为false。如果设置了infoToCollect中的选项，则自动启用。