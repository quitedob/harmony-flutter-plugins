## 概述

PhonePC/2in1TabletTVWearable

监听不同HTTP事件的回调函数。

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
| [Rcp\_OnDataReceiveCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___on_data_receive_callback)[onDataReceive](/consumer/cn/doc/harmonyos-references/_rcp___events_handler#ondatareceive) | 收到响应体时的回调函数。 |
| [Rcp\_OnProgressCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___on_progress_callback)[onUploadProgress](/consumer/cn/doc/harmonyos-references/_rcp___events_handler#onuploadprogress) | 上传时调用的回调函数。 |
| [Rcp\_OnProgressCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___on_progress_callback)[onDownloadProgress](/consumer/cn/doc/harmonyos-references/_rcp___events_handler#ondownloadprogress) | 下载时调用的回调函数。 |
| [Rcp\_OnHeaderReceiveCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___on_header_receive_callback)[onHeaderReceive](/consumer/cn/doc/harmonyos-references/_rcp___events_handler#onheaderreceive) | 收到header时的回调函数。 |
| [Rcp\_OnVoidCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___on_void_callback)[onDataEnd](/consumer/cn/doc/harmonyos-references/_rcp___events_handler#ondataend) | 传输结束时的回调函数。 |
| [Rcp\_OnVoidCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___on_void_callback)[onCanceled](/consumer/cn/doc/harmonyos-references/_rcp___events_handler#oncanceled) | 请求或会话被取消时的回调函数。 |

## 结构体成员变量说明

PhonePC/2in1TabletTVWearable

### onCanceled

PhonePC/2in1TabletTVWearable



```
1. Rcp_OnVoidCallback Rcp_EventsHandler::onCanceled
```

**描述**

请求或会话被取消时的回调函数。

### onDataEnd

PhonePC/2in1TabletTVWearable



```
1. Rcp_OnVoidCallback Rcp_EventsHandler::onDataEnd
```

**描述**

传输结束时的回调函数。

### onDataReceive

PhonePC/2in1TabletTVWearable



```
1. Rcp_OnDataReceiveCallback Rcp_EventsHandler::onDataReceive
```

**描述**

收到响应体时的回调函数。

### onDownloadProgress

PhonePC/2in1TabletTVWearable



```
1. Rcp_OnProgressCallback Rcp_EventsHandler::onDownloadProgress
```

**描述**

下载时调用的回调函数。

### onHeaderReceive

PhonePC/2in1TabletTVWearable



```
1. Rcp_OnHeaderReceiveCallback Rcp_EventsHandler::onHeaderReceive
```

**描述**

收到header时的回调函数。

### onUploadProgress

PhonePC/2in1TabletTVWearable



```
1. Rcp_OnProgressCallback Rcp_EventsHandler::onUploadProgress
```

**描述**

上传时调用的回调函数。