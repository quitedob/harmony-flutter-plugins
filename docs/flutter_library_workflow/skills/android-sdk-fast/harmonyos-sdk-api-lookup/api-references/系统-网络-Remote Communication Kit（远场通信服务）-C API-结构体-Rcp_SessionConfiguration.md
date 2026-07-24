## 概述

PhonePC/2in1TabletTVWearable

会话配置。

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
| [Rcp\_SessionType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_sessiontype)[type](/consumer/cn/doc/harmonyos-references/_rcp___session_configuration#type) | 会话类型。 |
| [Rcp\_InterceptorArray](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___interceptor_array)[interceptors](/consumer/cn/doc/harmonyos-references/_rcp___session_configuration#interceptors) | 用户自定义的异步拦截器数组。 |
| [Rcp\_SyncInterceptorArray](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___sync_interceptor_array)[syncInterceptors](/consumer/cn/doc/harmonyos-references/_rcp___session_configuration#syncinterceptors) | 用户定义的同步拦截器数组。 |
| const char \* [baseUrl](/consumer/cn/doc/harmonyos-references/_rcp___session_configuration#baseurl) | 基本URL。 |
| [Rcp\_Headers](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_headers) \* [headers](/consumer/cn/doc/harmonyos-references/_rcp___session_configuration#headers) | 请求标头。 |
| [Rcp\_RequestCookies](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_requestcookies) \* [cookies](/consumer/cn/doc/harmonyos-references/_rcp___session_configuration#cookies) | 请求的Cookie。 |
| [Rcp\_SessionListener](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___session_listener)[sessionListener](/consumer/cn/doc/harmonyos-references/_rcp___session_configuration#sessionlistener) | 回调函数，供session监听close()或cancel()事件。 |
| [Rcp\_Configuration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___configuration) \* [requestConfiguration](/consumer/cn/doc/harmonyos-references/_rcp___session_configuration#requestconfiguration) | 默认请求配置。这些选项可以通过[Request.configuration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___request#configuration)覆盖。 |
| [Rcp\_ConnectionConfiguration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___connection_configuration)[connectionConfiguration](/consumer/cn/doc/harmonyos-references/_rcp___session_configuration#connectionconfiguration) | 连接配置。 |

## 结构体成员变量说明

PhonePC/2in1TabletTVWearable

### baseUrl

PhonePC/2in1TabletTVWearable



```
1. const char* Rcp_SessionConfiguration::baseUrl
```

**描述**

基本URL。

举例， 如果请求的url为 '?name=value', 基本url是 “https://example.com”，那么最后当请求被送往服务端时的最终url为 “https://example.com?name=value”。

### connectionConfiguration

PhonePC/2in1TabletTVWearable



```
1. Rcp_ConnectionConfiguration Rcp_SessionConfiguration::connectionConfiguration
```

**描述**

连接配置。

它用于指定此会话中允许的最大同时连接总数以及允许连接到单个主机的最大同时连接数。

### cookies

PhonePC/2in1TabletTVWearable



```
1. Rcp_RequestCookies* Rcp_SessionConfiguration::cookies
```

**描述**

请求的Cookie。

如果调用了[HMS\_Rcp\_Fetch](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#hms_rcp_fetch)或者[HMS\_Rcp\_FetchSync](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#hms_rcp_fetchsync)，在参数中的[Rcp\_Request](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___request)中没有[Rcp\_RequestCookies](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_requestcookies)，则[Rcp\_SessionConfiguration.cookies](/consumer/cn/doc/harmonyos-references/_rcp___session_configuration#cookies)将是[Rcp\_Request.cookies](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___request#cookies)，如果两者都存在，则将它们合并。

### headers

PhonePC/2in1TabletTVWearable



```
1. Rcp_Headers* Rcp_SessionConfiguration::headers
```

**描述**

请求标头。

如果调用了[HMS\_Rcp\_Fetch](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#hms_rcp_fetch)或[HMS\_Rcp\_FetchSync](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#hms_rcp_fetchsync)，并且[Rcp\_Request](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___request)中没有[Rcp\_Headers](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_headers)，[Rcp\_SessionConfiguration.headers](/consumer/cn/doc/harmonyos-references/_rcp___session_configuration#headers)将是[Rcp\_Request.headers](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___request#headers)，如果两者都存在，则将它们合并。

### interceptors

PhonePC/2in1TabletTVWearable



```
1. Rcp_InterceptorArray Rcp_SessionConfiguration::interceptors
```

**描述**

用户自定义的异步拦截器数组。

异步拦截器将被制成拦截器链。

输入: [A, B, C, D]， 处理逻辑将为 A->B->C->D->defaultHandler。

### requestConfiguration

PhonePC/2in1TabletTVWearable



```
1. Rcp_Configuration* Rcp_SessionConfiguration::requestConfiguration
```

**描述**

默认请求配置。这些选项可以通过[Request.configuration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___request#configuration)覆盖。

### sessionListener

PhonePC/2in1TabletTVWearable



```
1. Rcp_SessionListener Rcp_SessionConfiguration::sessionListener
```

**描述**

回调函数，供session监听close()或cancel()事件。

### syncInterceptors

PhonePC/2in1TabletTVWearable



```
1. Rcp_SyncInterceptorArray Rcp_SessionConfiguration::syncInterceptors
```

**描述**

用户定义的同步拦截器数组。

同步拦截器会被做成拦截器链。

输入: [A, B, C, D], 处理逻辑将为 A->B->C->D->defaultHandler。

### type

PhonePC/2in1TabletTVWearable



```
1. Rcp_SessionType Rcp_SessionConfiguration::type
```

**描述**

会话类型。