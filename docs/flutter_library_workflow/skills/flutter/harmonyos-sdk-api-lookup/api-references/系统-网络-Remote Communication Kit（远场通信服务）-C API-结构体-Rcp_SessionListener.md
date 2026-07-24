## 概述

PhonePC/2in1TabletTVWearable

关闭或取消会话事件的回调函数。

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
| void(\* [onClosed](/consumer/cn/doc/harmonyos-references/_rcp___session_listener#onclosed) )(void) | 此函数在[Rcp\_Session](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_session)关闭时调用此函数。 |
| void(\* [onCanceled](/consumer/cn/doc/harmonyos-references/_rcp___session_listener#oncanceled) )(void) | 此函数在[Rcp\_Session](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_session)取消时调用此函数。 |

## 结构体成员变量说明

PhonePC/2in1TabletTVWearable

### onCanceled

PhonePC/2in1TabletTVWearable



```
1. void(* Rcp_SessionListener::onCanceled) (void)
```

**描述**

此函数在[Rcp\_Session](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_session)取消时调用此函数。

### onClosed

PhonePC/2in1TabletTVWearable



```
1. void(* Rcp_SessionListener::onClosed) (void)
```

**描述**

此函数在[Rcp\_Session](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_session)关闭时调用此函数。