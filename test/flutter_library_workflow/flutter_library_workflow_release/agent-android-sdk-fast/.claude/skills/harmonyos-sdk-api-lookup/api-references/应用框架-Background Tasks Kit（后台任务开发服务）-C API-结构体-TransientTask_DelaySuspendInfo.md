

```
1. typedef struct TransientTask_DelaySuspendInfo {...} TransientTask_DelaySuspendInfo
```

## 概述

PhonePC/2in1TabletTVWearable

定义短时任务返回信息结构体。用于返回当前短时任务的任务ID和剩余时间。

**起始版本：** 13

**相关模块：** [TransientTask](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-transienttask)

**所在头文件：** [transient\_task\_type.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-transient-task-type-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| int32\_t requestId | 短时任务请求ID。 |
| int32\_t actualDelayTime | 剩余时间（单位：毫秒）。 |