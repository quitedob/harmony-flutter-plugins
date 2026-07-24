## 概述

PhonePC/2in1Tablet

定义双精度多通道、多节二阶IIR滤波器组的数据结构。

**系统能力：** SystemCapability.FAST.Core

**起始版本：** 6.1.1(24)

**相关模块：** [FAST](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast)

**所在头文件：** [fast\_dsp\_common.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast-dsp-common-8h)

## 汇总

PhonePC/2in1Tablet

### 成员变量

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| uint8\_t [activeFilters](/consumer/cn/doc/harmonyos-references/fast-kit--fast-biquadmd#activefilters) | 活跃滤波器掩码数组。 |
| uint8\_t [isInitialized](/consumer/cn/doc/harmonyos-references/fast-kit--fast-biquadmd#isinitialized) | 初始化标志。 |
| double\* [channelGains](/consumer/cn/doc/harmonyos-references/fast-kit--fast-biquadmd#channelgains) | 每通道线性增益因子数组。 |
| FAST\_BiquadCoefficientsD\* [coefficients](/consumer/cn/doc/harmonyos-references/fast-kit--fast-biquadmd#coefficients) | 滤波器系数数组。 |
| size\_t [maxFrames](/consumer/cn/doc/harmonyos-references/fast-kit--fast-biquadmd#maxframes) | 单次处理最大采样数。 |
| size\_t [numChannels](/consumer/cn/doc/harmonyos-references/fast-kit--fast-biquadmd#numchannels) | 音频或信号通道数。 |
| size\_t [numSections](/consumer/cn/doc/harmonyos-references/fast-kit--fast-biquadmd#numsections) | 每通道级联的 biquad 节数。 |
| FAST\_BiquadStateD\* [states](/consumer/cn/doc/harmonyos-references/fast-kit--fast-biquadmd#states) | 滤波器状态数组。 |

## 结构体成员变量说明

PhonePC/2in1Tablet

### activeFilters

PhonePC/2in1Tablet



```
1. uint8_t* FAST_BiquadmD::activeFilters
```

**描述**

活跃滤波器掩码数组（大小为[numSections](/consumer/cn/doc/harmonyos-references/fast-kit--fast-biquadmd#numsections)），非零表示该节滤波器处于激活状态。

### channelGains

PhonePC/2in1Tablet



```
1. double* FAST_BiquadmD::channelGains
```

**描述**

每通道线性增益因子数组（大小为[numChannels](/consumer/cn/doc/harmonyos-references/fast-kit--fast-biquadmd#numchannels)），用于对每个通道的输出进行增益调整。

### coefficients

PhonePC/2in1Tablet



```
1. FAST_BiquadCoefficientsD* FAST_BiquadmD::coefficients
```

**描述**

滤波器系数数组（大小为[numChannels](/consumer/cn/doc/harmonyos-references/fast-kit--fast-biquadmd#numchannels) \* [numSections](/consumer/cn/doc/harmonyos-references/fast-kit--fast-biquadmd#numsections)），存储所有通道的所有滤波器节系数。

### isInitialized

PhonePC/2in1Tablet



```
1. uint8_t FAST_BiquadmD::isInitialized
```

**描述**

初始化标志，值为1表示结构体已正确初始化，值为0表示未初始化。

### maxFrames

PhonePC/2in1Tablet



```
1. size_t FAST_BiquadmD::maxFrames
```

**描述**

单次处理的最大采样数（每通道），处理长度不能超过此值。

### numChannels

PhonePC/2in1Tablet



```
1. size_t FAST_BiquadmD::numChannels
```

**描述**

音频或信号通道数，必须大于0。

### numSections

PhonePC/2in1Tablet



```
1. size_t FAST_BiquadmD::numSections
```

**描述**

每通道级联的biquad节数，必须大于0。

### states

PhonePC/2in1Tablet



```
1. FAST_BiquadStateD* FAST_BiquadmD::states
```

**描述**

滤波器状态数组（大小为[numChannels](/consumer/cn/doc/harmonyos-references/fast-kit--fast-biquadmd#numchannels) \* [numSections](/consumer/cn/doc/harmonyos-references/fast-kit--fast-biquadmd#numsections)），存储所有通道的所有滤波器节状态变量。