## 概述

PhonePC/2in1TabletTVWearable

代理配置中用于过滤不使用代理的urls。

如果[Rcp\_Request.url](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___request#url)匹配[Rcp\_Exclusions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___exclusions)规则，则[Rcp\_Request](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___request)不会使用代理。

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
| [Rcp\_ExclusionsValueType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_exclusionsvaluetype)[type](/consumer/cn/doc/harmonyos-references/_rcp___exclusions#type) | 表示union中使用的数据类型。 |
| union {  [Rcp\_Urls](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___urls) \* [urls](/consumer/cn/doc/harmonyos-references/_rcp___exclusions#urls)  [Rcp\_ExclusionFunction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_exclusionfunction) [exclusionFunction](/consumer/cn/doc/harmonyos-references/_rcp___exclusions#exclusionfunction)  } | Urls。链式存储url。  回调函数。通过回调函数过滤url。 |

## 结构体成员变量说明

PhonePC/2in1TabletTVWearable

### exclusionFunction

PhonePC/2in1TabletTVWearable



```
1. Rcp_ExclusionFunction Rcp_Exclusions::exclusionFunction
```

**描述**

通过回调过滤。

### type

PhonePC/2in1TabletTVWearable



```
1. Rcp_ExclusionsValueType Rcp_Exclusions::type
```

**描述**

表示union中使用的数据类型。

### urls

PhonePC/2in1TabletTVWearable



```
1. Rcp_Urls* Rcp_Exclusions::urls
```

**描述**

Urls。