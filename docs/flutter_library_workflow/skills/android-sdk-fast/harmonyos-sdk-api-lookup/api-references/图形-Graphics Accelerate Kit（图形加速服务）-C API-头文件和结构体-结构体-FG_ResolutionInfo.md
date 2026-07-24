## 概述

PhoneTabletTV

此结构体描述超帧输入输出图像的分辨率。

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
| [FG\_Dimension2D](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___dimension2_d) [inputColorResolution](/consumer/cn/doc/harmonyos-references/_f_g___resolution_info#inputcolorresolution) | 真实渲染帧颜色缓冲区分辨率。 |
| [FG\_Dimension2D](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___dimension2_d) [inputDepthStencilResolution](/consumer/cn/doc/harmonyos-references/_f_g___resolution_info#inputdepthstencilresolution) | 真实渲染帧深度模板缓冲区分辨率。当设置成0时，系统中会默认使用[inputColorResolution](/consumer/cn/doc/harmonyos-references/_f_g___resolution_info#inputcolorresolution)作为真实帧深度模板缓冲区分辨率。 |
| [FG\_Dimension2D](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___dimension2_d) [outputColorResolution](/consumer/cn/doc/harmonyos-references/_f_g___resolution_info#outputcolorresolution) | 预测帧缓冲区分辨率。当设置成0时，系统中会默认使用[inputColorResolution](/consumer/cn/doc/harmonyos-references/_f_g___resolution_info#inputcolorresolution)作为预测帧缓冲区分辨率。 |

## 结构体成员变量说明

PhoneTabletTV

### inputColorResolution

PhoneTabletTV



```
1. FG_Dimension2D FG_ResolutionInfo::inputColorResolution
```

**描述**

真实渲染帧颜色缓冲区分辨率。

### inputDepthStencilResolution

PhoneTabletTV



```
1. FG_Dimension2D FG_ResolutionInfo::inputDepthStencilResolution
```

**描述**

真实渲染帧深度模板缓冲区分辨率。当设置成0时，系统中会默认使用[inputColorResolution](/consumer/cn/doc/harmonyos-references/_f_g___resolution_info#inputcolorresolution)作为真实帧深度模板缓冲区分辨率。

### outputColorResolution

PhoneTabletTV



```
1. FG_Dimension2D FG_ResolutionInfo::outputColorResolution
```

**描述**

预测帧缓冲区分辨率。当设置成0时，系统中会默认使用[inputColorResolution](/consumer/cn/doc/harmonyos-references/_f_g___resolution_info#inputcolorresolution)作为预测帧缓冲区分辨率。