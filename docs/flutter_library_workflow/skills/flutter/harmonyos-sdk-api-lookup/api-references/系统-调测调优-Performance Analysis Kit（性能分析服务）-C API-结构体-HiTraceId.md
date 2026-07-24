

```
1. typedef struct HiTraceId {...} HiTraceId
```

## 概述

PhonePC/2in1TabletTVWearable

HiTraceId定义。

**起始版本：** 12

**相关模块：** [HiTrace](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hitrace)

**所在头文件：** [trace.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-trace-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

如果字节序为小端模式，结构体顺序如下表所示：

展开

| 字段 | 字段bit数 | 描述 |
| --- | --- | --- |
| uint64\_t valid | 1 | HiTraceId是否有效。 |
| uint64\_t ver | 3 | HiTraceId的版本号。 |
| uint64\_t chainId | 60 | HiTraceId的跟踪链标识。 |
| uint64\_t flags | 12 | HiTraceId的跟踪标志位。 |
| uint64\_t spanId | 26 | HiTraceId的分支标识。 |
| uint64\_t parentSpanId | 26 | HiTraceId的父分支标识。 |

如果字节序为大端模式，结构体顺序如下表所示：

展开

| 字段 | 字段bit数 | 描述 |
| --- | --- | --- |
| uint64\_t chainId | 60 | HiTraceId的跟踪链标识。 |
| uint64\_t ver | 3 | HiTraceId的版本号。 |
| uint64\_t valid | 1 | HiTraceId是否有效。 |
| uint64\_t parentSpanId | 26 | HiTraceId的父分支标识。 |
| uint64\_t spanId | 26 | HiTraceId的分支标识。 |
| uint64\_t flags | 12 | HiTraceId的跟踪标志位。 |