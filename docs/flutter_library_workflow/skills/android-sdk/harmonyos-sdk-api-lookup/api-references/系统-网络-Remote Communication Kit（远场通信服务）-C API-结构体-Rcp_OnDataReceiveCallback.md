## 概述

PhonePC/2in1TabletTVWearable

接收到数据时回调。[Rcp\_EventsHandler](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___events_handler)中的配置。

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
| [Rcp\_OnDataReceiveCallbackFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_ondatareceivecallbackfunc)[callback](/consumer/cn/doc/harmonyos-references/_rcp___on_data_receive_callback#callback) | 接收数据回调函数。 |
| void \* [usrObject](/consumer/cn/doc/harmonyos-references/_rcp___on_data_receive_callback#usrobject) | 用户定义的对象，在回调函数中使用。 |

## 结构体成员变量说明

PhonePC/2in1TabletTVWearable

### callback

PhonePC/2in1TabletTVWearable



```
1. Rcp_OnDataReceiveCallbackFunc Rcp_OnDataReceiveCallback::callback
```

**描述**

接收数据回调函数。

### usrObject

PhonePC/2in1TabletTVWearable



```
1. void* Rcp_OnDataReceiveCallback::usrObject
```

**描述**

用户定义的对象，在回调函数中使用。