

```
1. typedef struct OH_Http_Interceptor_Headers {
2. char *data;
3. struct OH_Http_Interceptor_Headers *next;
4. } OH_Http_Interceptor_Headers;
```

## 概述

PhonePC/2in1TabletTVWearable

定义拦截器的请求/响应头信息。

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
| char \*data | 拦截器请求/响应头信息。 |
| struct OH\_Http\_Interceptor\_Headers \*next | 指向下一个头信息的指针。 |