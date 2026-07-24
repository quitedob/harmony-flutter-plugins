

```
1. typedef struct Http_Request {...} Http_Request
```

## 概述

PhonePC/2in1TabletTVWearable

HTTP请求结构体。

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
| uint32\_t requestId | HTTP请求的ID。 |
| char \*url | HTTP请求的URL。 |
| [Http\_RequestOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack-http-requestoptions) \*options | HTTP请求配置，指向Http\_RequestOptions的指针，参考[Http\_RequestOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack-http-requestoptions)。 |