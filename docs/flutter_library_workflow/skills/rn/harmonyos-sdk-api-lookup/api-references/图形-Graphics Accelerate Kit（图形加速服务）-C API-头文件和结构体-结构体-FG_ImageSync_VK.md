## 概述

PhoneTabletTV

此结构体描述超帧输入输出图像同步状态信息，用于创建超帧图像内存屏障。

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
| VkAccessFlagBits [accessMask](/consumer/cn/doc/harmonyos-references/_f_g___image_sync___v_k#accessmask) | 内存访问类型的位掩码。 |
| VkImageLayout [layout](/consumer/cn/doc/harmonyos-references/_f_g___image_sync___v_k#layout) | 图像和图像子资源的内存布局。 |
| VkPipelineStageFlagBits [stages](/consumer/cn/doc/harmonyos-references/_f_g___image_sync___v_k#stages) | 管线阶段的位掩码。 |

## 结构体成员变量说明

PhoneTabletTV

### accessMask

PhoneTabletTV



```
1. VkAccessFlagBits FG_ImageSync_VK::accessMask
```

**描述**

内存访问类型的位掩码。

### layout

PhoneTabletTV



```
1. VkImageLayout FG_ImageSync_VK::layout
```

**描述**

图像和图像子资源的内存布局。

### stages

PhoneTabletTV



```
1. VkPipelineStageFlagBits FG_ImageSync_VK::stages
```

**描述**

管线阶段的位掩码。