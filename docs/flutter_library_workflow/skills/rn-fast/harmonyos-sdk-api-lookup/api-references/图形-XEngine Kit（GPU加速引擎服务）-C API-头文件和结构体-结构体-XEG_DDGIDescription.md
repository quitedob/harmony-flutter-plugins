## 概述

PhonePC/2in1TabletTV

此结构体描述更新DDGI探针辐照度及渲染输出GI图像所需的信息。

**起始版本：** 6.0.0(20)

**相关模块：** [XEngine](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xengine)

**所在头文件：** [xeg\_vulkan\_rtgi.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-vulkan-rtgi-8h)

## 汇总

PhonePC/2in1TabletTV

### 成员变量

PhonePC/2in1TabletTV

展开

| 名称 | 描述 |
| --- | --- |
| XEG\_StructureType [sType](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgidescription#stype) | 识别此结构的[XEG\_StructureType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xengine#xeg_structuretype)值，必须是XEG\_STRUCTURE\_TYPE\_DDGI\_DESCRIPTION。 |
| const void \* [pNext](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgidescription#pnext) | 指向扩展结构的指针。 |
| float [viewMatrix](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgidescription#viewmatrix) [16] | 相机观察矩阵，必须是4\*4列主序矩阵。 |
| float [projectionMatrix](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgidescription#projectionmatrix) [16] | 相机投影矩阵，必须是4\*4列主序矩阵。 |
| VkImageView [inputNormalImage](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgidescription#inputnormalimage) | 输入Gbuffer法向量图像，其宽高必须和[XEG\_DDGICreateInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgicreateinfo)中viewSize的宽高保持一致。 |
| VkImageView [inputDepthImage](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgidescription#inputdepthimage) | 输入Gbuffer深度图像，其宽高必须和[XEG\_DDGICreateInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgicreateinfo)中viewSize的宽高保持一致。 |
| VkImageView [inputBasecolorMetallicImage](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgidescription#inputbasecolormetallicimage) | 输入Gbuffer基础颜色和金属度图像，其宽高必须和[XEG\_DDGICreateInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgicreateinfo)中viewSize的宽高保持一致。 |
| VkImageView [inputDirectionImage](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgidescription#inputdirectionimage) | 输入探针发射光线方向图像，其宽高分别为：探针发射光线数量，输入探针数量。 |
| VkImageView [inputRayRadianceDistanceImage](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgidescription#inputrayradiancedistanceimage) | 输入探针发射光线交点的辐射率及距离图像，其宽高分别为：探针发射光线数量，输入探针数量。 |
| VkImageView [inputRayHitNormalAndMetallicImage](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgidescription#inputrayhitnormalandmetallicimage) | 输入探针发射光线交点的法向量及金属度图像，其宽高分别为：探针发射光线数量，输入探针数量。 |
| VkBuffer [inputVolumeIndexAndProbeIndex](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgidescription#inputvolumeindexandprobeindex) | 输入探针的索引信息，对应于探针发射光线的信息，每个数据为两个uint值（探针索引/体积索引）。 |
| uint32\_t [inputProbeCount](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgidescription#inputprobecount) | 输入探针数量，对应于inputVolumeIndexAndProbeIndex中的有效数据个数。 |
| VkBuffer [outputVolumeIndexAndProbeIndex](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgidescription#outputvolumeindexandprobeindex) | 输出探针的索引信息，指示用户下一帧如何发射光线，每个数据为两个uint值（探针索引/体积索引）。 |
| VkBuffer [outputProbeCount](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgidescription#outputprobecount) | 输出探针数量，对应于outputVolumeIndexAndProbeIndex中的有效数据个数。 |
| VkImageView [outputGIImage](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgidescription#outputgiimage) | 输出GI 2D图像，其宽高必须和[XEG\_DDGICreateInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgicreateinfo)中viewSize的宽高保持一致，VkFormat为VK\_FORMAT\_R8G8B8A8\_UNORM。 |
| uint32\_t [enableVolumeNumber](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgidescription#enablevolumenumber) | 使用的体积数量，必须不大于[XEG\_DDGICreateInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgicreateinfo)中的numberVolume值。 |
| const struct [XEG\_DDGIVolumeEntryParameters](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgivolumeentryparameters) \* [pVolumeEntryParameters](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgidescription#pvolumeentryparameters) | 输入体积参数信息，对应于[XEG\_DDGIVolumeEntryParameters](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgivolumeentryparameters)。该结构体数组的大小必须等于enableVolumeNumber的值。 |

## 结构体成员变量说明

PhonePC/2in1TabletTV

### enableVolumeNumber

PhonePC/2in1TabletTV



```
1. uint32_t XEG_DDGIDescription::enableVolumeNumber
```

**描述**

使用的体积数量，必须不大于[XEG\_DDGICreateInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgicreateinfo)中的numberVolume值。

### inputBasecolorMetallicImage

PhonePC/2in1TabletTV



```
1. VkImageView XEG_DDGIDescription::inputBasecolorMetallicImage
```

**描述**

输入Gbuffer基础颜色和金属度图像，其宽高必须和[XEG\_DDGICreateInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgicreateinfo)中viewSize的宽高保持一致。

### inputDepthImage

PhonePC/2in1TabletTV



```
1. VkImageView XEG_DDGIDescription::inputDepthImage
```

**描述**

输入Gbuffer深度图像，其宽高必须和[XEG\_DDGICreateInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgicreateinfo)中viewSize的宽高保持一致。

### inputDirectionImage

PhonePC/2in1TabletTV



```
1. VkImageView XEG_DDGIDescription::inputDirectionImage
```

**描述**

输入探针发射光线方向图像，其宽高分别为：探针发射光线数量，输入探针数量。

### inputNormalImage

PhonePC/2in1TabletTV



```
1. VkImageView XEG_DDGIDescription::inputNormalImage
```

**描述**

输入Gbuffer法向量图像，其宽高必须和[XEG\_DDGICreateInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgicreateinfo)中viewSize的宽高保持一致。

### inputProbeCount

PhonePC/2in1TabletTV



```
1. uint32_t XEG_DDGIDescription::inputProbeCount
```

**描述**

输入探针数量，对应于inputVolumeIndexAndProbeIndex中的有效数据个数。

### inputRayHitNormalAndMetallicImage

PhonePC/2in1TabletTV



```
1. VkImageView XEG_DDGIDescription::inputRayHitNormalAndMetallicImage
```

**描述**

输入探针发射光线交点的法向量及金属度图像，其宽高分别为：探针发射光线数量，输入探针数量。

### inputRayRadianceDistanceImage

PhonePC/2in1TabletTV



```
1. VkImageView XEG_DDGIDescription::inputRayRadianceDistanceImage
```

**描述**

输入探针发射光线交点的辐射率及距离图像，其宽高分别为：探针发射光线数量，输入探针数量。

### inputVolumeIndexAndProbeIndex

PhonePC/2in1TabletTV



```
1. VkBuffer XEG_DDGIDescription::inputVolumeIndexAndProbeIndex
```

**描述**

输入探针的索引信息，对应于探针发射光线的信息，每个数据为两个uint值（探针索引/体积索引）。

### outputGIImage

PhonePC/2in1TabletTV



```
1. VkImageView XEG_DDGIDescription::outputGIImage
```

**描述**

输出GI 2D图像，其宽高必须和[XEG\_DDGICreateInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgicreateinfo)中viewSize的宽高保持一致，VkFormat为VK\_FORMAT\_R8G8B8A8\_UNORM。

### outputProbeCount

PhonePC/2in1TabletTV



```
1. VkBuffer XEG_DDGIDescription::outputProbeCount
```

**描述**

输出探针数量，对应于outputVolumeIndexAndProbeIndex中的有效数据个数。

### outputVolumeIndexAndProbeIndex

PhonePC/2in1TabletTV



```
1. VkBuffer XEG_DDGIDescription::outputVolumeIndexAndProbeIndex
```

**描述**

输出探针的索引信息，指示用户下一帧如何发射光线，每个数据为两个uint值（探针索引/体积索引）。

### pNext

PhonePC/2in1TabletTV



```
1. const void* XEG_DDGIDescription::pNext
```

**描述**

指向扩展结构的指针。

### projectionMatrix

PhonePC/2in1TabletTV



```
1. float XEG_DDGIDescription::projectionMatrix[16]
```

**描述**

相机投影矩阵，必须是4\*4列主序矩阵。

### pVolumeEntryParameters

PhonePC/2in1TabletTV



```
1. const struct XEG_DDGIVolumeEntryParameters* XEG_DDGIDescription::pVolumeEntryParameters
```

**描述**

输入体积参数信息，对应于[XEG\_DDGIVolumeEntryParameters](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgivolumeentryparameters)。该结构体数组的大小必须等于enableVolumeNumber的值。

### sType

PhonePC/2in1TabletTV



```
1. XEG_StructureType XEG_DDGIDescription::sType
```

**描述**

识别此结构的[XEG\_StructureType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xengine#xeg_structuretype)值，必须是XEG\_STRUCTURE\_TYPE\_DDGI\_DESCRIPTION。

### viewMatrix

PhonePC/2in1TabletTV



```
1. float XEG_DDGIDescription::viewMatrix[16]
```

**描述**

相机观察矩阵，必须是4\*4列主序矩阵。