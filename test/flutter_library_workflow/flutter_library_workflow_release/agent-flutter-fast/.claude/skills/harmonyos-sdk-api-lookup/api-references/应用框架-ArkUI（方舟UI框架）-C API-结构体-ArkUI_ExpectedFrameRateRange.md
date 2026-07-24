

```
1. typedef struct {...} ArkUI_ExpectedFrameRateRange
```

## 概述

PhonePC/2in1TabletTVWearable

设置动画的期望帧率。

**起始版本：** 12

**相关模块：** [ArkUI\_NativeModule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule)

**所在头文件：** [native\_animate.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-animate-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| uint32\_t min | 期望的最小帧率，单位为帧/秒（fps）。 |
| uint32\_t max | 期望的最大帧率，单位为帧/秒（fps）。 |
| uint32\_t expected | 期望的最优帧率，单位为帧/秒（fps）。 |