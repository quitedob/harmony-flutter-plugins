## 概述

PhonePC/2in1TabletTVWearable

在[Rcp\_EventsHandler](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___events_handler)中配置的数据结束或已取消事件的回调配置。

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
| [Rcp\_OnVoidCallbackFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_onvoidcallbackfunc)[callback](/consumer/cn/doc/harmonyos-references/_rcp___on_void_callback#callback) | DataEnd或Canceled事件回调函数。 |
| void \* [usrObject](/consumer/cn/doc/harmonyos-references/_rcp___on_void_callback#usrobject) | 用户定义的对象，在回调函数中使用。 |

## 结构体成员变量说明

PhonePC/2in1TabletTVWearable

### callback

PhonePC/2in1TabletTVWearable



```
1. Rcp_OnVoidCallbackFunc Rcp_OnVoidCallback::callback
```

**描述**

DataEnd或Canceled事件回调函数。

### usrObject

PhonePC/2in1TabletTVWearable



```
1. void* Rcp_OnVoidCallback::usrObject
```

**描述**

用户定义的对象，在回调函数中使用。