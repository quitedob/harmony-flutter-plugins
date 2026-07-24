

```
1. typedef struct OH_Http_Interceptor_Response {
2. Http_Buffer body;
3. Http_ResponseCode responseCode;
4. OH_Http_Interceptor_Headers *headers;
5. Http_PerformanceTiming performanceTiming;
6. } OH_Http_Interceptor_Response;
```

## 概述

PhonePC/2in1TabletTVWearable

定义拦截器的HTTP响应数据包结构。

**起始版本：** 24

**相关模块：** [netstack](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack)

**所在头文件：** [http\_interceptor\_type.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-http-interceptor-type-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| Http\_Buffer body | 响应体内容，详情请参考[Http\_Buffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack-http-buffer)定义。 |
| Http\_ResponseCode responseCode | 响应状态码，详情请参考[Http\_ResponseCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-http-type-h#http_responsecode) 枚举定义。 |
| OH\_Http\_Interceptor\_Headers \*headers | HTTP响应头信息，详情请参考[OH\_Http\_Interceptor\_Headers](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack-http-interceptor-headers)定义。 |
| Http\_PerformanceTiming performanceTiming | 响应性能信息，详情请参考[Http\_PerformanceTiming](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack-http-performancetiming)定义。 |