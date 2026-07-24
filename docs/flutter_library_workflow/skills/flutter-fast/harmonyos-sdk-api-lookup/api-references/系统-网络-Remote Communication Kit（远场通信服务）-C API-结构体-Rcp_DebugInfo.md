## 概述

PhonePC/2in1TabletTVWearable

描述存储在[Rcp\_Response](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___response)中的调试信息的结构。

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
| [Rcp\_DebugEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_debugevent)[type](/consumer/cn/doc/harmonyos-references/_rcp___debug_info#type) | 调试事件类型。 |
| [Rcp\_Buffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___buffer)[data](/consumer/cn/doc/harmonyos-references/_rcp___debug_info#data) | 调试信息。 |
| struct [Rcp\_DebugInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___debug_info) \* [next](/consumer/cn/doc/harmonyos-references/_rcp___debug_info#next) | 链式存储。指向下一个[Rcp\_DebugInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___debug_info)。 |

## 结构体成员变量说明

PhonePC/2in1TabletTVWearable

### data

PhonePC/2in1TabletTVWearable



```
1. Rcp_Buffer Rcp_DebugInfo::data
```

**描述**

调试信息。

### next

PhonePC/2in1TabletTVWearable



```
1. struct Rcp_DebugInfo* Rcp_DebugInfo::next
```

**描述**

链式存储。指向下一个[Rcp\_DebugInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___debug_info)。

### type

PhonePC/2in1TabletTVWearable



```
1. Rcp_DebugEvent Rcp_DebugInfo::type
```

**描述**

调试事件类型。