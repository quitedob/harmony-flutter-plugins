## 概述

PhoneTabletTV

此结构体描述超帧输入输出图像的格式信息，该接口仅适配Vulkan图形API平台。

**起始版本：** 5.0.0(12)

**相关模块：** [GraphicsAccelerate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate)

**所在头文件：** [frame\_generation\_vk.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/frame__generation__vk_8h)

## 汇总

PhoneTabletTV

### 成员变量

PhoneTabletTV

展开

| 名称 | 描述 |
| --- | --- |
| VkFormat [inputColorFormat](/consumer/cn/doc/harmonyos-references/_f_g___image_format___v_k#inputcolorformat) | 真实渲染帧颜色缓冲区图像格式。 |
| VkFormat [inputDepthStencilFormat](/consumer/cn/doc/harmonyos-references/_f_g___image_format___v_k#inputdepthstencilformat) | 深度模板缓冲区图像格式。 |
| VkFormat [outputColorFormat](/consumer/cn/doc/harmonyos-references/_f_g___image_format___v_k#outputcolorformat) | 预测帧缓冲区图像格式。 |

## 结构体成员变量说明

PhoneTabletTV

### inputColorFormat

PhoneTabletTV



```
1. VkFormat FG_ImageFormat_VK::inputColorFormat
```

**描述**

真实渲染帧颜色缓冲区图像格式。

### inputDepthStencilFormat

PhoneTabletTV



```
1. VkFormat FG_ImageFormat_VK::inputDepthStencilFormat
```

**描述**

深度模板缓冲区图像格式。

### outputColorFormat

PhoneTabletTV



```
1. VkFormat FG_ImageFormat_VK::outputColorFormat
```

**描述**

预测帧缓冲区图像格式。