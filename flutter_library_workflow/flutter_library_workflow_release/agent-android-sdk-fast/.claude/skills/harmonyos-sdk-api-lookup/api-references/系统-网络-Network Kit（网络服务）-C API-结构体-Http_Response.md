

```
1. typedef struct Http_Response {...} Http_Response
```

## 概述

PhonePC/2in1TabletTVWearable

定义HTTP响应的结构体。

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
| [Http\_Buffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack-http-buffer) body | HTTP请求响应的数据，参考[Http\_Buffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack-http-buffer)。 |
| [Http\_ResponseCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-http-type-h#http_responsecode) responseCode | HTTP请求响应码，参考[Http\_ResponseCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-http-type-h#http_responsecode)。 |
| [Http\_Headers](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack-http-headers) \*headers | HTTP响应的头，指向Http\_Headers的指针，参考[Http\_Headers](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack-http-headers)。 |
| char \*cookies | HTTP响应Cookies。 |
| [Http\_PerformanceTiming](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack-http-performancetiming) \*performanceTiming | HTTP响应时间信息，指向Http\_PerformanceTiming的指针，参考[Http\_PerformanceTiming](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack-http-performancetiming)。 |

### 成员函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [void (\*destroyResponse)(struct Http\_Response \*\*response)](/consumer/cn/doc/harmonyos-references/capi-netstack-http-response#destroyresponse) | 销毁HTTP响应的回调函数 |

## 成员函数说明

PhonePC/2in1TabletTVWearable

### destroyResponse()

PhonePC/2in1TabletTVWearable



```
1. void (*destroyResponse)(struct Http_Response **response)
```

**描述**

销毁HTTP响应的回调函数

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| struct [Http\_Response](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack-http-response) \*\*response | 要销毁的HTTP响应，指向Http\_Response的指针，参考[Http\_Response](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack-http-response)。 |