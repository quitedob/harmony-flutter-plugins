

```
1. typedef struct OH_Http_Interceptor {
2. int32_t groupId;
3. OH_Interceptor_Stage stage;
4. OH_Interceptor_Type type;
5. OH_Http_InterceptorHandler handler;
6. int32_t enabled;
7. } OH_Http_Interceptor;
```

## 概述

PhonePC/2in1TabletTVWearable

定义HTTP全局拦截器的配置信息。

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
| int32\_t groupId | 拦截器组ID。 |
| OH\_Interceptor\_Stage stage | 拦截器的执行阶段，详情请参考[OH\_Interceptor\_Stage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-http-interceptor-type-h#oh_interceptor_stage) 枚举定义。 |
| OH\_Interceptor\_Type type | 拦截器的类型，详情请参考[OH\_Interceptor\_Type](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-http-interceptor-type-h#oh_interceptor_type) 枚举定义。 |
| OH\_Http\_InterceptorHandler handler | 拦截器处理函数，详情请参考[OH\_Http\_InterceptorHandler](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-http-interceptor-type-h#oh_http_interceptorhandler) 函数指针定义。 |
| int32\_t enabled | 拦截器的启用状态。0代表未启用，非0代表启用。 |