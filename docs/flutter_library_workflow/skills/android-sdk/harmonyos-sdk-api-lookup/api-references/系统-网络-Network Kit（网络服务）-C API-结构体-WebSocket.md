

```
1. struct WebSocket {...}
```

## 概述

PhonePC/2in1TabletTVWearable

WebSocket客户端结构体。

**起始版本：** 11

**相关模块：** [netstack](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack)

**所在头文件：** [net\_websocket\_type.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-websocket-type-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [WebSocket\_OnOpenCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-websocket-type-h#websocket_onopencallback) onOpen | 客户端接收连接消息的回调指针。 |
| [WebSocket\_OnMessageCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-websocket-type-h#websocket_onmessagecallback) onMessage | 客户端接收消息的回调指针。 |
| [WebSocket\_OnErrorCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-websocket-type-h#websocket_onerrorcallback) onError | 客户端接收错误消息的回调指针。 |
| [WebSocket\_OnCloseCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-websocket-type-h#websocket_onclosecallback) onClose | 客户端接收关闭消息的回调指针。 |
| [WebSocket\_RequestOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack-websocket-requestoptions) requestOptions | 客户端建立连接请求内容。 |