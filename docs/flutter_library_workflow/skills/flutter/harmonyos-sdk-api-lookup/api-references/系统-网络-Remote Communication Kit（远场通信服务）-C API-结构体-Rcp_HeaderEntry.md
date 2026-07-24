## 概述

PhonePC/2in1TabletTVWearable

请求或响应的标头的所有键值对。

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
| char \* [key](/consumer/cn/doc/harmonyos-references/_rcp___header_entry#key) | 键。如果用户希望使用自定义的content-type覆盖系统原有的content-type，键必须使用小写的“content-type”。 |
| [Rcp\_HeaderValue](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___header_value) \* [value](/consumer/cn/doc/harmonyos-references/_rcp___header_entry#value) | 值。 |
| struct [Rcp\_HeaderEntry](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___header_entry) \* [next](/consumer/cn/doc/harmonyos-references/_rcp___header_entry#next) | 链式存储。指向下一个键值对[Rcp\_HeaderEntry](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___header_entry)。 |

## 结构体成员变量说明

PhonePC/2in1TabletTVWearable

### key

PhonePC/2in1TabletTVWearable



```
1. char* Rcp_HeaderEntry::key
```

**描述**

键。如果用户希望使用自定义的content-type覆盖系统原有的content-type，键必须使用小写的“content-type”。

### next

PhonePC/2in1TabletTVWearable



```
1. struct Rcp_HeaderEntry* Rcp_HeaderEntry::next
```

**描述**

链式存储。指向下一个键值对[Rcp\_HeaderEntry](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___header_entry)。

### value

PhonePC/2in1TabletTVWearable



```
1. Rcp_HeaderValue* Rcp_HeaderEntry::value
```

**描述**

标头键值对的值。