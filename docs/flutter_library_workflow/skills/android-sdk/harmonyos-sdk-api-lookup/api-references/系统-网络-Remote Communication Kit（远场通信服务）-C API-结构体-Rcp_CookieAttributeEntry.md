## 概述

PhonePC/2in1TabletTVWearable

响应Cookie属性条目。

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
| const char \* [key](/consumer/cn/doc/harmonyos-references/_rcp___cookie_attribute_entry#key) | 键。 |
| const char \* [value](/consumer/cn/doc/harmonyos-references/_rcp___cookie_attribute_entry#value) | 值。 |
| struct [Rcp\_CookieAttributeEntry](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___cookie_attribute_entry) \* [next](/consumer/cn/doc/harmonyos-references/_rcp___cookie_attribute_entry#next) | 链式存储。指向下一个[Rcp\_CookieAttributeEntry](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___cookie_attribute_entry)的指针。 |

## 结构体成员变量说明

PhonePC/2in1TabletTVWearable

### key

PhonePC/2in1TabletTVWearable



```
1. const char* Rcp_CookieAttributeEntry::key
```

**描述**

键。

### next

PhonePC/2in1TabletTVWearable



```
1. struct Rcp_CookieAttributeEntry* Rcp_CookieAttributeEntry::next
```

**描述**

链式存储。指向下一个[Rcp\_CookieAttributeEntry](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___cookie_attribute_entry)的指针。

### value

PhonePC/2in1TabletTVWearable



```
1. const char* Rcp_CookieAttributeEntry::value
```

**描述**

值。