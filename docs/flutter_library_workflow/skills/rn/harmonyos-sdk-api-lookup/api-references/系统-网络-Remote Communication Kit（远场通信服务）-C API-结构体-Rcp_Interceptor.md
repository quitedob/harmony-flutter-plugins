## 概述

PhonePC/2in1TabletTVWearable

异步拦截器。

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
| uint32\_t(\* [intercept](/consumer/cn/doc/harmonyos-references/_rcp___interceptor#intercept) )([Rcp\_Request](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___request) \*request, const [Rcp\_RequestHandler](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_requesthandler) \*next, const [Rcp\_ResponseCallbackObject](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___response_callback_object) \*responseCallback) | 指向异步拦截器函数的指针。用户若需要使用拦截器，需实现该函数。 |

## 结构体成员变量说明

PhonePC/2in1TabletTVWearable

### intercept

PhonePC/2in1TabletTVWearable



```
1. uint32_t(* Rcp_Interceptor::intercept) (Rcp_Request *request, const Rcp_RequestHandler *next, const Rcp_ResponseCallbackObject *responseCallback)
```

**描述**

指向异步拦截器函数的指针。用户若需要使用拦截器，需实现该函数。

**起始版本：** 5.0.0(12)

**参数:**

展开

| 名称 | 描述 |
| --- | --- |
| request | 指向[Rcp\_Request](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___request)的指针。 |
| next | 指向下一个异步处理器的指针[Rcp\_RequestHandler](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_requesthandler)。 |
| responseCallback | 指向[Rcp\_ResponseCallbackObject](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___response_callback_object)的指针。 |

**返回：**

uint32\_t 返回表示拦截器的返回值。