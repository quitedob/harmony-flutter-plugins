

```
1. typedef struct HiAppEvent_AppEventInfo {...} HiAppEvent_AppEventInfo
```

## 概述

PhonePC/2in1TabletTVWearable

单个事件信息，包含事件领域、事件名称、事件类型和事件携带的用json格式字符串表示的自定义参数列表。

**起始版本：** 12

**相关模块：** [HiAppEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hiappevent)

**所在头文件：** [hiappevent.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hiappevent-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| const char\* domain | 事件领域。 |
| const char\* name | 事件名称。 |
| enum [EventType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hiappevent-h#eventtype) type | 事件类型。 |
| const char\* params | json格式字符串类型的事件参数列表。 |