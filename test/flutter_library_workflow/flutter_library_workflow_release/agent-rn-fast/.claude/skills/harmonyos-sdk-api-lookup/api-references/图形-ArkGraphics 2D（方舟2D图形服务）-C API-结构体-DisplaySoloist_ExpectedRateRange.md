

```
1. typedef struct {...} DisplaySoloist_ExpectedRateRange
```

## 概述

PhonePC/2in1TabletTVWearable

提供期望帧率范围结构体。

**起始版本：** 12

**相关模块：** [NativeDisplaySoloist](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-nativedisplaysoloist)

**所在头文件：** [native\_display\_soloist.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-display-soloist-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| int32\_t min | 期望帧率范围最小值，取值范围为[0,120]。 |
| int32\_t max | 期望帧率范围最大值，取值范围为[0,120]。 |
| int32\_t expected | 期望帧率，取值范围为[0,120]。 |