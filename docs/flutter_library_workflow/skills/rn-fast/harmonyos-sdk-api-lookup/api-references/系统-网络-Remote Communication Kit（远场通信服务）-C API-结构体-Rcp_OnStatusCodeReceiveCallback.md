## 概述

PhonePC/2in1TabletTVWearable

响应的状态码接收回调函数。可以通过[HMS\_Rcp\_SetRequestOnStatusCodeReceiveCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#hms_rcp_setrequestonstatuscodereceivecallback)为请求设置相应回调函数。

**起始版本：** 6.0.1(21)

**相关模块：** [RemoteCommunication](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview)

**所在头文件：** [rcp.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/rcp_8h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [Rcp\_OnStatusCodeReceiveCallbackFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_onstatuscodereceivecallbackfunc) | 请求过程中接收响应状态码的回调函数。 |
| void \*[usrObject](/consumer/cn/doc/harmonyos-references/_rcp___on_status_code_callback#usrobject) | 用户定义的对象，在回调函数中使用。 |

## 结构体成员变量说明

PhonePC/2in1TabletTVWearable

### callback

PhonePC/2in1TabletTVWearable



```
1. Rcp_OnStatusCodeReceiveCallbackFunc Rcp_OnStatusCodeReceiveCallback::callback
```

**描述**

响应状态码接收回调函数。

### usrObject

PhonePC/2in1TabletTVWearable



```
1. void* Rcp_OnStatusCodeReceiveCallback::usrObject
```

**描述**

用户定义的对象，在回调函数中使用。