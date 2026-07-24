## 概述

PhonePC/2in1TabletTVWearable

为HTTP全局拦截器模块提供C接口的数据结构定义，包含拦截器的请求/响应头信息、HTTP请求/响应数据包结构、拦截器配置信息以及相关的枚举类型和函数指针。

**引用文件：** <network/netstack/http\_interceptor\_type.h>

**库：** libhttp\_interceptor.so

**系统能力：** SystemCapability.Communication.NetStack

**起始版本：** 24

**相关模块：** [netstack](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack)

## 汇总

PhonePC/2in1TabletTVWearable

### 结构体

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [OH\_Http\_Interceptor\_Headers](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack-http-interceptor-headers) | OH\_Http\_Interceptor\_Headers | 定义拦截器的请求/响应头信息。 |
| [OH\_Http\_Interceptor\_Request](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack-http-interceptor-request) | OH\_Http\_Interceptor\_Request | 定义拦截器的HTTP请求数据包结构。 |
| [OH\_Http\_Interceptor\_Response](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack-http-interceptor-response) | OH\_Http\_Interceptor\_Response | 定义拦截器的HTTP响应数据包结构。 |
| [OH\_Http\_Interceptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack-http-interceptor) | OH\_Http\_Interceptor | 定义HTTP全局拦截器的配置信息。 |

### 枚举

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [OH\_Interceptor\_Stage](/consumer/cn/doc/harmonyos-references/capi-net-http-interceptor-type-h#oh_interceptor_stage) | OH\_Interceptor\_Stage | 定义拦截器的执行阶段。 |
| [OH\_Interceptor\_Type](/consumer/cn/doc/harmonyos-references/capi-net-http-interceptor-type-h#oh_interceptor_type) | OH\_Interceptor\_Type | 定义拦截器的类型。 |
| [OH\_Interceptor\_Result](/consumer/cn/doc/harmonyos-references/capi-net-http-interceptor-type-h#oh_interceptor_result) | OH\_Interceptor\_Result | 定义拦截器的处理结果。 |

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [typedef OH\_Interceptor\_Result (\*OH\_Http\_InterceptorHandler)(OH\_Http\_Interceptor\_Request \*request, OH\_Http\_Interceptor\_Response \*response, int32\_t \*isModified)](/consumer/cn/doc/harmonyos-references/capi-net-http-interceptor-type-h#oh_http_interceptorhandler) | OH\_Http\_InterceptorHandler | 指向HTTP拦截器处理函数的指针。 |

## 枚举类型说明

PhonePC/2in1TabletTVWearable

### OH\_Interceptor\_Stage

PhonePC/2in1TabletTVWearable



```
1. typedef enum OH_Interceptor_Stage {
2. OH_STAGE_REQUEST,
3. OH_STAGE_RESPONSE
4. } OH_Interceptor_Stage;
```

**描述**

定义拦截器的执行阶段。

**起始版本：** 24

**参数：**

展开

| 枚举项 | 描述 |
| --- | --- |
| OH\_STAGE\_REQUEST | 拦截器处理请求。 |
| OH\_STAGE\_RESPONSE | 拦截器处理响应。 |

### OH\_Interceptor\_Type

PhonePC/2in1TabletTVWearable



```
1. typedef enum OH_Interceptor_Type {
2. OH_TYPE_READ_ONLY
3. } OH_Interceptor_Type;
```

**描述**

定义拦截器的类型。

**起始版本：** 24

**参数：**

展开

| 枚举项 | 描述 |
| --- | --- |
| OH\_TYPE\_READ\_ONLY | 只读拦截器。 |

### OH\_Interceptor\_Result

PhonePC/2in1TabletTVWearable



```
1. typedef enum OH_Interceptor_Result {
2. OH_CONTINUE,
3. OH_ABORT
4. } OH_Interceptor_Result;
```

**描述**

定义拦截器的处理结果。

**起始版本：** 24

**参数：**

展开

| 枚举项 | 描述 |
| --- | --- |
| OH\_CONTINUE | 继续处理。 |
| OH\_ABORT | 拦截处理。 |

## 函数说明

PhonePC/2in1TabletTVWearable

### OH\_Http\_InterceptorHandler()

PhonePC/2in1TabletTVWearable



```
1. typedef OH_Interceptor_Result (*OH_Http_InterceptorHandler)(
2. OH_Http_Interceptor_Request *request,
3. OH_Http_Interceptor_Response *response,
4. int32_t *isModified);
```

**描述**

定义HTTP拦截器处理函数。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| OH\_Http\_Interceptor\_Request \*request | HTTP请求数据包指针（仅在请求阶段有效）。 |
| OH\_Http\_Interceptor\_Response \*response | HTTP响应数据包指针（仅在响应阶段有效）。 |
| int32\_t \*isModified | 输出参数，标识拦截器是否修改了数据包，对OH\_TYPE\_READ\_ONLY类型拦截器不生效。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| OH\_Interceptor\_Result | 拦截器处理结果：- OH\_CONTINUE：继续处理 - OH\_ABORT：拦截处理。 |