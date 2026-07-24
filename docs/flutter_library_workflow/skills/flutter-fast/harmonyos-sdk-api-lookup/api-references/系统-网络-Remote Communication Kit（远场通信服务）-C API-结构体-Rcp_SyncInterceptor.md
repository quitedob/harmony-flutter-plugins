## 概述

PhonePC/2in1TabletTVWearable

同步拦截器。

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
| [Rcp\_Response](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___response) \*(\* [intercept](/consumer/cn/doc/harmonyos-references/_rcp___sync_interceptor#intercept) )([Rcp\_Request](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___request) \*request, const [Rcp\_SyncRequestHandler](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_syncrequesthandler) \*next, uint32\_t \*errCode) | 指向同步拦截器函数的指针。用户若需要使用拦截器，需实现该函数。 |

## 结构体成员变量说明

PhonePC/2in1TabletTVWearable

### intercept

PhonePC/2in1TabletTVWearable



```
1. Rcp_Response*(* Rcp_SyncInterceptor::intercept) (Rcp_Request *request, const Rcp_SyncRequestHandler *next, uint32_t *errCode)
```

**描述**

指向同步拦截器函数的指针。用户若需要使用拦截器，需实现该函数。

**起始版本：** 5.0.0(12)

**参数:**

展开

| 名称 | 描述 |
| --- | --- |
| request | 指向[Rcp\_Request](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___request)的指针。 |
| next | 指向下一个同步处理器的指针[Rcp\_SyncRequestHandler](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_syncrequesthandler)。 |
| errCode | 表示拦截器的返回值。 |

**返回：**

Rcp\_Response\* 返回的响应。