

```
1. typedef struct OH_Http_Interceptor_Request {
2. Http_Buffer url;
3. Http_Buffer method;
4. OH_Http_Interceptor_Headers *headers;
5. Http_Buffer body;
6. } OH_Http_Interceptor_Request;
```

## 概述

PhonePC/2in1TabletTVWearable

定义拦截器的HTTP请求数据包结构。

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
| Http\_Buffer url | 请求URL，详情请参考[Http\_Buffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack-http-buffer)定义。 |
| Http\_Buffer method | 请求方法，详情请参考[Http\_Buffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack-http-buffer)定义。 |
| OH\_Http\_Interceptor\_Headers \*headers | HTTP请求头信息，详情请参考[OH\_Http\_Interceptor\_Headers](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack-http-interceptor-headers)定义。 |
| Http\_Buffer body | 请求体内容，详情请参考[Http\_Buffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack-http-buffer)定义。 |