## 概述

PhonePC/2in1TabletTVWearable

网络请求。

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
| char [id](/consumer/cn/doc/harmonyos-references/_rcp___request#id) [[RCP\_MAX\_REQUEST\_ID\_LEN](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_max_request_id_len)] | 每个请求的唯一ID。由系统生成。 |
| char \* [url](/consumer/cn/doc/harmonyos-references/_rcp___request#url) | 请求URL。 |
| const char \* [method](/consumer/cn/doc/harmonyos-references/_rcp___request#method) | 请求方法。默认值为GET。 |
| [Rcp\_Headers](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_headers) \* [headers](/consumer/cn/doc/harmonyos-references/_rcp___request#headers) | 请求标头。 |
| [Rcp\_RequestContent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___request_content) \* [content](/consumer/cn/doc/harmonyos-references/_rcp___request#content) | 请求体。 |
| [Rcp\_Configuration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___configuration) \* [configuration](/consumer/cn/doc/harmonyos-references/_rcp___request#configuration) | 请求配置。请参见[Rcp\_Configuration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___configuration)。 |
| [Rcp\_TransferRange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___transfer_range) \* [transferRange](/consumer/cn/doc/harmonyos-references/_rcp___request#transferrange) | HTTP传输范围。该设置将转换为HTTP Range标头。 |
| [Rcp\_RequestCookies](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_requestcookies) \* [cookies](/consumer/cn/doc/harmonyos-references/_rcp___request#cookies) | 请求Cookie。该设置将转换为HTTP Cookie标头。 |
| void \* [requestPrivate](/consumer/cn/doc/harmonyos-references/_rcp___request#requestprivate) | 可扩展字段。 |

## 结构体成员变量说明

PhonePC/2in1TabletTVWearable

### configuration

PhonePC/2in1TabletTVWearable



```
1. Rcp_Configuration* Rcp_Request::configuration
```

**描述**

请求配置。请参见[Rcp\_Configuration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___configuration)。

### content

PhonePC/2in1TabletTVWearable



```
1. Rcp_RequestContent* Rcp_Request::content
```

**描述**

请求体。

### cookies

PhonePC/2in1TabletTVWearable



```
1. Rcp_RequestCookies* Rcp_Request::cookies
```

**描述**

请求Cookie。该设置将转换为HTTP Cookie标头。

### headers

PhonePC/2in1TabletTVWearable



```
1. Rcp_Headers* Rcp_Request::headers
```

**描述**

请求标头。

### id

PhonePC/2in1TabletTVWearable



```
1. char Rcp_Request::id[RCP_MAX_REQUEST_ID_LEN]
```

**描述**

每个请求的唯一ID。由系统生成。

### method

PhonePC/2in1TabletTVWearable



```
1. const char* Rcp_Request::method
```

**描述**

请求方法。默认值为GET。

### requestPrivate

PhonePC/2in1TabletTVWearable



```
1. void* Rcp_Request::requestPrivate
```

**描述**

可扩展字段。

### transferRange

PhonePC/2in1TabletTVWearable



```
1. Rcp_TransferRange* Rcp_Request::transferRange
```

**描述**

HTTP传输范围。该设置将转换为HTTP Range标头。

### url

PhonePC/2in1TabletTVWearable



```
1. char* Rcp_Request::url
```

**描述**

请求URL。