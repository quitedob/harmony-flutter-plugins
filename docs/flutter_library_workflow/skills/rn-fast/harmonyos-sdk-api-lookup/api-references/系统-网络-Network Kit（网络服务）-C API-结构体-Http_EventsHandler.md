

```
1. typedef struct Http_EventsHandler {...} Http_EventsHandler
```

## 概述

PhonePC/2in1TabletTVWearable

监听不同HTTP事件的回调函数。

**起始版本：** 20

**相关模块：** [netstack](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack)

**所在头文件：** [net\_http\_type.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-http-type-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [Http\_OnDataReceiveCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-http-type-h#http_ondatareceivecallback) onDataReceive | 收到响应体时的回调函数，参考[Http\_OnDataReceiveCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-http-type-h#http_ondatareceivecallback)。 |
| [Http\_OnProgressCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-http-type-h#http_onprogresscallback) onUploadProgress | 上传时调用的回调函数，参考[Http\_OnProgressCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-http-type-h#http_onprogresscallback)。 |
| [Http\_OnProgressCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-http-type-h#http_onprogresscallback) onDownloadProgress | 下载时调用的回调函数，参考[Http\_OnProgressCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-http-type-h#http_onprogresscallback)。 |
| [Http\_OnHeaderReceiveCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-http-type-h#http_onheaderreceivecallback) onHeadersReceive | 收到header时的回调函数，参考[Http\_OnHeaderReceiveCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-http-type-h#http_onheaderreceivecallback)。 |
| [Http\_OnVoidCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-http-type-h#http_onvoidcallback) onDataEnd | 传输结束时的回调函数，参考[Http\_OnVoidCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-http-type-h#http_onvoidcallback)。 |
| [Http\_OnVoidCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-http-type-h#http_onvoidcallback) onCanceled | 请求被取消时的回调函数，参考[Http\_OnVoidCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-http-type-h#http_onvoidcallback)。 |