## 概述

PhonePC/2in1Tablet

定义单精度二阶（biquad）IIR滤波器节的系数（直接I型或II型）。

传递函数：H(z) = (b0 + b1z⁻¹ + b2z⁻²) / (1 + a1z⁻¹ + a2z⁻²)

注意

分母中的1实际上为系数a0归一化后的结果。

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
| float [a1](/consumer/cn/doc/harmonyos-references/fast-kit--fast-biquadcoefficients#a1) | z⁻¹ 分母系数。 |
| float [a2](/consumer/cn/doc/harmonyos-references/fast-kit--fast-biquadcoefficients#a2) | z⁻² 分母系数。 |
| float [b0](/consumer/cn/doc/harmonyos-references/fast-kit--fast-biquadcoefficients#b0) | z⁰ 分子系数。 |
| float [b1](/consumer/cn/doc/harmonyos-references/fast-kit--fast-biquadcoefficients#b1) | z⁻¹ 分子系数。 |
| float [b2](/consumer/cn/doc/harmonyos-references/fast-kit--fast-biquadcoefficients#b2) | z⁻² 分子系数。 |

## 结构体成员变量说明

PhonePC/2in1Tablet

### a1

PhonePC/2in1Tablet



```
1. float FAST_BiquadCoefficients::a1
```

**描述**

z⁻¹ 分母系数。

### a2

PhonePC/2in1Tablet



```
1. float FAST_BiquadCoefficients::a2
```

**描述**

z⁻² 分母系数。

### b0

PhonePC/2in1Tablet



```
1. float FAST_BiquadCoefficients::b0
```

**描述**

z⁰ 分子系数。

### b1

PhonePC/2in1Tablet



```
1. float FAST_BiquadCoefficients::b1
```

**描述**

z⁻¹ 分子系数。

### b2

PhonePC/2in1Tablet



```
1. float FAST_BiquadCoefficients::b2
```

**描述**

z⁻² 分子系数。