## 概述

PhonePC/2in1TabletTVWearable

请求或响应的标头映射的值类型。

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
| char \* [value](/consumer/cn/doc/harmonyos-references/_rcp___header_value#value) | 标头键值对的值。 |
| struct [Rcp\_HeaderValue](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___header_value) \* [next](/consumer/cn/doc/harmonyos-references/_rcp___header_value#next) | 链式存储。指向下一个[Rcp\_HeaderValue](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___header_value)。 |

## 结构体成员变量说明

PhonePC/2in1TabletTVWearable

### next

PhonePC/2in1TabletTVWearable



```
1. struct Rcp_HeaderValue* Rcp_HeaderValue::next
```

**描述**

链式存储。指向下一个[Rcp\_HeaderValue](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___header_value)。

### value

PhonePC/2in1TabletTVWearable



```
1. char* Rcp_HeaderValue::value
```

**描述**

标头键值对的值。