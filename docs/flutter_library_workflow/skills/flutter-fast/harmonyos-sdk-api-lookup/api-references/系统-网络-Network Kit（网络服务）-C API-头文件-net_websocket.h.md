## 概述

PhonePC/2in1TabletTVWearable

定义WebSocket客户端模块的接口。

**引用文件：** <network/netstack/net\_websocket.h>

**库：** libnet\_websocket.so

**系统能力：** SystemCapability.Communication.NetStack

**起始版本：** 11

**相关模块：** [netstack](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack)

## 汇总

PhonePC/2in1TabletTVWearable

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [struct WebSocket \*OH\_WebSocketClient\_Constructor(WebSocket\_OnOpenCallback onOpen, WebSocket\_OnMessageCallback onMessage,WebSocket\_OnErrorCallback onError, WebSocket\_OnCloseCallback onclose)](/consumer/cn/doc/harmonyos-references/capi-net-websocket-h#oh_websocketclient_constructor) | WebSocket客户端的构造函数。 |
| [int OH\_WebSocketClient\_AddHeader(struct WebSocket \*client, struct WebSocket\_Header header)](/consumer/cn/doc/harmonyos-references/capi-net-websocket-h#oh_websocketclient_addheader) | 将header头信息添加到client客户端request中。 |
| [int OH\_WebSocketClient\_Connect(struct WebSocket \*client, const char \*url, struct WebSocket\_RequestOptions options)](/consumer/cn/doc/harmonyos-references/capi-net-websocket-h#oh_websocketclient_connect) | 客户端连接服务端。 |
| [int OH\_WebSocketClient\_Send(struct WebSocket \*client, char \*data, size\_t length)](/consumer/cn/doc/harmonyos-references/capi-net-websocket-h#oh_websocketclient_send) | 客户端向服务端发送数据。 |
| [int OH\_WebSocketClient\_Close(struct WebSocket \*client, struct WebSocket\_CloseOption options)](/consumer/cn/doc/harmonyos-references/capi-net-websocket-h#oh_websocketclient_close) | 客户端主动关闭WebSocket连接。 |
| [int OH\_WebSocketClient\_Destroy(struct WebSocket \*client)](/consumer/cn/doc/harmonyos-references/capi-net-websocket-h#oh_websocketclient_destroy) | 释放WebSocket连接上下文和资源。 |

## 函数说明

PhonePC/2in1TabletTVWearable

### OH\_WebSocketClient\_Constructor()

PhonePC/2in1TabletTVWearable



```
1. struct WebSocket *OH_WebSocketClient_Constructor(WebSocket_OnOpenCallback onOpen, WebSocket_OnMessageCallback onMessage,WebSocket_OnErrorCallback onError, WebSocket_OnCloseCallback onclose)
```

**描述**

WebSocket客户端的构造函数。

**系统能力：** SystemCapability.Communication.NetStack

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [WebSocket\_OnOpenCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-websocket-type-h#websocket_onopencallback) onOpen | 客户端定义的建立连接消息的回调函数。 |
| [WebSocket\_OnMessageCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-websocket-type-h#websocket_onmessagecallback) onMessage | 客户端定义的接收消息的回调函数。 |
| [WebSocket\_OnErrorCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-websocket-type-h#websocket_onerrorcallback) onError | 客户端定义的错误消息的回调函数。 |
| [WebSocket\_OnCloseCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-websocket-type-h#websocket_onclosecallback) onclose | 客户端定义的关闭消息的回调函数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [struct WebSocket](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack-websocket) \* | 成功返回客户端指针，失败返回为NULL。 |

### OH\_WebSocketClient\_AddHeader()

PhonePC/2in1TabletTVWearable



```
1. int OH_WebSocketClient_AddHeader(struct WebSocket *client, struct WebSocket_Header header)
```

**描述**

将header头信息添加到client客户端request中。

**系统能力：** SystemCapability.Communication.NetStack

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [struct WebSocket](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack-websocket) \*client | 客户端指针。 |
| [struct WebSocket\_Header](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack-websocket-header) header | Header头信息。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回值为0表示执行成功，返回值不为0表示失败。返回值详细信息可以查看OH\_Websocket\_ErrCode。 |

### OH\_WebSocketClient\_Connect()

PhonePC/2in1TabletTVWearable



```
1. int OH_WebSocketClient_Connect(struct WebSocket *client, const char *url, struct WebSocket_RequestOptions options)
```

**描述**

客户端连接服务端。

**系统能力：** SystemCapability.Communication.NetStack

**需要权限：** ohos.permission.INTERNET

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [struct WebSocket](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack-websocket) \*client | 客户端指针。 |
| const char \*url | 客户端要连接到服务端的地址。 |
| [struct WebSocket\_RequestOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack-websocket-requestoptions) options | 发起连接的可选参数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回值为0表示执行成功，返回值不为0表示失败。返回值详细信息可以查看OH\_Websocket\_ErrCode。 |

### OH\_WebSocketClient\_Send()

PhonePC/2in1TabletTVWearable



```
1. int OH_WebSocketClient_Send(struct WebSocket *client, char *data, size_t length)
```

**描述**

客户端向服务端发送数据。

**系统能力：** SystemCapability.Communication.NetStack

**需要权限：** ohos.permission.INTERNET

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [struct WebSocket](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack-websocket) \*client | 客户端。 |
| char \*data | 客户端发送的数据。 |
| size\_t length | 客户端发送的数据长度。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回值为0表示执行成功，返回值不为0表示失败。返回值详细信息可以查看OH\_Websocket\_ErrCode。 |

### OH\_WebSocketClient\_Close()

PhonePC/2in1TabletTVWearable



```
1. int OH_WebSocketClient_Close(struct WebSocket *client, struct WebSocket_CloseOption options)
```

**描述**

客户端主动关闭WebSocket连接。

**系统能力：** SystemCapability.Communication.NetStack

**需要权限：** ohos.permission.INTERNET

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [struct WebSocket](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack-websocket) \*client | 客户端。 |
| [struct WebSocket\_CloseOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack-websocket-closeoption) options | 发起关闭连接的可选参数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回值为0表示执行成功，返回值不为0表示失败。返回值详细信息可以查看OH\_Websocket\_ErrCode。 |

### OH\_WebSocketClient\_Destroy()

PhonePC/2in1TabletTVWearable



```
1. int OH_WebSocketClient_Destroy(struct WebSocket *client)
```

**描述**

释放WebSocket连接上下文和资源。使用方式如下：

1. 调用[WebSocket\_OnCloseCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-websocket-type-h#websocket_onclosecallback)订阅WebSocket连接关闭事件，并在该回调函数中调用[OH\_WebSocketClient\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-websocket-h#oh_websocketclient_destroy)方法。
2. 调用[OH\_WebSocketClient\_Close](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-websocket-h#oh_websocketclient_close)关闭WebSocket连接。

注意

确保触发[WebSocket\_OnCloseCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-websocket-type-h#websocket_onclosecallback)回调后再调用该接口，否则系统内存资源被释放后可能出现socket泄露以及连接未关闭的情况。

**系统能力：** SystemCapability.Communication.NetStack

**需要权限：** ohos.permission.INTERNET

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [struct WebSocket](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack-websocket) \*client | 客户端。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回值为0表示执行成功，返回值不为0表示失败。返回值详细信息可以查看OH\_Websocket\_ErrCode。 |