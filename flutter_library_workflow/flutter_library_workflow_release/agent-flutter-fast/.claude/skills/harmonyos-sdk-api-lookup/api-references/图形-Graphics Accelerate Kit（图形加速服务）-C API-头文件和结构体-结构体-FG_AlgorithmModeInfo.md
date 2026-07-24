## 概述

PhoneTabletTV

此结构体描述超帧算法模式信息。

**起始版本：** 5.0.0(12)

**相关模块：** [GraphicsAccelerate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate)

**所在头文件：** [frame\_generation\_base.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/frame__generation__base_8h)

## 汇总

PhoneTabletTV

### 成员变量

PhoneTabletTV

展开

| 名称 | 描述 |
| --- | --- |
| [FG\_PredictionMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_predictionmode-1) [predictionMode](/consumer/cn/doc/harmonyos-references/_f_g___algorithm_mode_info#predictionmode) | 超帧预测算法模式，支持内插模式和外插模式。 |
| [FG\_MeMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_memode-1) [meMode](/consumer/cn/doc/harmonyos-references/_f_g___algorithm_mode_info#memode) | 超帧运动估计算法模式，支持基础模式和增强模式。 |

## 结构体成员变量说明

PhoneTabletTV

### meMode

PhoneTabletTV



```
1. FG_MeMode FG_AlgorithmModeInfo::meMode
```

**描述**

超帧运动估计算法模式，支持基础模式和增强模式。

### predictionMode

PhoneTabletTV



```
1. FG_PredictionMode FG_AlgorithmModeInfo::predictionMode
```

**描述**

超帧预测算法模式，支持内插模式和外插模式。