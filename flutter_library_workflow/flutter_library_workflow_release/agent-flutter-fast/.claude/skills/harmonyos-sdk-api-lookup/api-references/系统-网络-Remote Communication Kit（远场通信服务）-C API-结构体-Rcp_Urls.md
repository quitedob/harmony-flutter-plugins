## 概述

PhonePC/2in1TabletTVWearable

URLs，用于确定主机是否正在使用代理。

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
| const char \* [url](/consumer/cn/doc/harmonyos-references/_rcp___urls#url) | 匹配的URL。 |
| struct [Rcp\_Urls](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___urls) \* [next](/consumer/cn/doc/harmonyos-references/_rcp___urls#next) | 链式存储。指向下一个[Rcp\_Urls](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___urls)的指针。 |

## 结构体成员变量说明

PhonePC/2in1TabletTVWearable

### next

PhonePC/2in1TabletTVWearable



```
1. struct Rcp_Urls* Rcp_Urls::next
```

**描述**

链式存储。指向下一个[Rcp\_Urls](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___urls)的指针。

### url

PhonePC/2in1TabletTVWearable



```
1. const char* Rcp_Urls::url
```

**描述**

匹配的URL。