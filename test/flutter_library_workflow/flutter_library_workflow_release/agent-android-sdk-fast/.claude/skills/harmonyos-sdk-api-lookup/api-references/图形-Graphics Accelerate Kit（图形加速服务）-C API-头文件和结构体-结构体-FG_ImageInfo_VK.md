## 概述

PhoneTabletTV

此结构体描述超帧输入输出图像信息。

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
| [FG\_Image\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_image_vk)\* [image](/consumer/cn/doc/harmonyos-references/_f_g___image_info___v_k#image) | 超帧输入输出图像结构体[FG\_Image\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_image_vk)对象的指针，该图像实例需要通过[HMS\_FG\_CreateImage\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_fg_createimage_vk)进行创建，通过[HMS\_FG\_DestroyImage\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_fg_destroyimage_vk)进行销毁。 |
| [FG\_ImageSync\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___image_sync___v_k) [initialSync](/consumer/cn/doc/harmonyos-references/_f_g___image_info___v_k#initialsync) | [HMS\_FG\_Dispatch\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_fg_dispatch_vk)执行前，该图像的同步状态。 |
| [FG\_ImageSync\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___image_sync___v_k) [finalSync](/consumer/cn/doc/harmonyos-references/_f_g___image_info___v_k#finalsync) | [HMS\_FG\_Dispatch\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_fg_dispatch_vk)执行后，该图像的同步状态。 |

## 结构体成员变量说明

PhoneTabletTV

### finalSync

PhoneTabletTV



```
1. FG_ImageSync_VK FG_ImageInfo_VK::finalSync
```

**描述**

[HMS\_FG\_Dispatch\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_fg_dispatch_vk)执行后，该图像的同步状态。

### image

PhoneTabletTV



```
1. FG_Image_VK* FG_ImageInfo_VK::image
```

**描述**

超帧输入输出图像结构体[FG\_Image\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_image_vk)对象的指针，该图像实例需要通过[HMS\_FG\_CreateImage\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_fg_createimage_vk)进行创建，通过[HMS\_FG\_DestroyImage\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_fg_destroyimage_vk)进行销毁。

### initialSync

PhoneTabletTV



```
1. FG_ImageSync_VK FG_ImageInfo_VK::initialSync
```

**描述**

[HMS\_FG\_Dispatch\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_fg_dispatch_vk)执行前，该图像的同步状态。