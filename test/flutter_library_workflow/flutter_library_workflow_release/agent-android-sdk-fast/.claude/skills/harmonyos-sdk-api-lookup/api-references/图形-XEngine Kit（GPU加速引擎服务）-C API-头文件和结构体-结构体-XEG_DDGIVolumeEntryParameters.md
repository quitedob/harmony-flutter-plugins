## 概述

PhonePC/2in1TabletTV

此结构体描述每一个DDGI体积的必要参数。

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
| uint32\_t [volumeIndex](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgivolumeentryparameters#volumeindex) | 体积索引范围为[0, 65535]，且唯一。 |
| uint32\_t [raysPerProbe](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgivolumeentryparameters#raysperprobe) | 探针发射光线数量，建议值为64，范围为[1, 1024]。 |
| float [probeMaxRayDistance](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgivolumeentryparameters#probemaxraydistance) | 探针发射光线最大求交距离，建议值为1000.0。 |
| float [volumePosition](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgivolumeentryparameters#volumeposition) [3] | 体积中心点坐标。 |
| float [probeSpacing](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgivolumeentryparameters#probespacing) [3] | 探针放置间距，必须大于0。 |
| uint32\_t [volumeLightingChannelMask](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgivolumeentryparameters#volumelightingchannelmask) | 体积光照通道标记，建议值为0xFFFFFFFF。 |
| uint32\_t [volumeProbeGridCounts](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgivolumeentryparameters#volumeprobegridcounts) [3] | 探针放置数量，必须大于0，范围为[1, 32]。 |
| float [volumeProbeIrradianceEncodingGamma](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgivolumeentryparameters#volumeprobeirradianceencodinggamma) | 辐照度的伽马校正系数，建议值为5.0，必须不为0。 |
| float [probeHysteresis](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgivolumeentryparameters#probehysteresis) | 探针辐照度历史权重，建议值为0.95，范围为[0, 1]。 |
| float [probeChangeThreshold](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgivolumeentryparameters#probechangethreshold) | 探针变化阈值，建议值为1.0。 |
| float [probeBrightnessThreshold](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgivolumeentryparameters#probebrightnessthreshold) | 探针亮度阈值，建议值为1.0。 |
| float [volumeNormalBias](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgivolumeentryparameters#volumenormalbias) | 探针法向偏移量，建议值为0.12。 |
| float [volumeViewBias](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgivolumeentryparameters#volumeviewbias) | 探针视角偏移量，建议值为0.48。 |
| float [volumeBlendDistance](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgivolumeentryparameters#volumeblenddistance) | 体积光照混合距离，建议值为1.0。 |
| float [volumeBlendDistanceBlack](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgivolumeentryparameters#volumeblenddistanceblack) | 体积边缘光照渐暗范围，建议值为1.0。 |
| float [probeBackfaceThreshold](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgivolumeentryparameters#probebackfacethreshold) | 探针反向判断阈值，建议值为0.0。 |
| float [probeMinFrontfaceDistance](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgivolumeentryparameters#probeminfrontfacedistance) | 探针正向最小距离，建议值为0.0。 |
| float [volumeIrradianceScalar](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgivolumeentryparameters#volumeirradiancescalar) | 体积辐照度缩放倍率，建议值为1.0，必须非负。 |
| float [emissiveMultiplier](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgivolumeentryparameters#emissivemultiplier) | 发射光线强度倍率，建议值为1.0，必须非负。 |
| float [lightingMultiplier](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgivolumeentryparameters#lightingmultiplier) | 光照倍率，建议值为1.0，必须非负。 |
| bool [bForceUpdate](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgivolumeentryparameters#bforceupdate) | 是否强制更新所有探针，true为强制全部更新，false为选择部分更新，建议值为false。 |
| VkImageView [probeIrradianceSH](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-ddgivolumeentryparameters#probeirradiancesh) | 存储探针辐照度二阶球谐系数的3D图像，其宽度，高度和深度分别为：volumeProbeGridCounts.y \* 4（二阶球谐系数的个数），volumeProbeGridCounts.x，volumeProbeGridCounts.z，VkFormat为VK\_FORMAT\_R32G32B32A32\_SFLOAT。 |

## 结构体成员变量说明

PhonePC/2in1TabletTV

### bForceUpdate

PhonePC/2in1TabletTV



```
1. bool XEG_DDGIVolumeEntryParameters::bForceUpdate
```

**描述**

是否强制更新所有探针，true为强制全部更新，false为选择部分更新，建议值为false。

### emissiveMultiplier

PhonePC/2in1TabletTV



```
1. float XEG_DDGIVolumeEntryParameters::emissiveMultiplier
```

**描述**

发射光线强度倍率，建议值为1.0，必须非负。

### lightingMultiplier

PhonePC/2in1TabletTV



```
1. float XEG_DDGIVolumeEntryParameters::lightingMultiplier
```

**描述**

光照倍率，建议值为1.0，必须非负。

### probeBackfaceThreshold

PhonePC/2in1TabletTV



```
1. float XEG_DDGIVolumeEntryParameters::probeBackfaceThreshold
```

**描述**

探针反向判断阈值，建议值为0.0。

### probeBrightnessThreshold

PhonePC/2in1TabletTV



```
1. float XEG_DDGIVolumeEntryParameters::probeBrightnessThreshold
```

**描述**

探针亮度阈值，建议值为1.0。

### probeChangeThreshold

PhonePC/2in1TabletTV



```
1. float XEG_DDGIVolumeEntryParameters::probeChangeThreshold
```

**描述**

探针变化阈值，建议值为1.0。

### probeHysteresis

PhonePC/2in1TabletTV



```
1. float XEG_DDGIVolumeEntryParameters::probeHysteresis
```

**描述**

探针辐照度历史权重，建议值为0.95，范围为[0, 1]。

### probeIrradianceSH

PhonePC/2in1TabletTV



```
1. VkImageView XEG_DDGIVolumeEntryParameters::probeIrradianceSH
```

**描述**

存储探针辐照度二阶球谐系数的3D图像，其宽度，高度和深度分别为：volumeProbeGridCounts.y \* 4（二阶球谐系数的个数），volumeProbeGridCounts.x，volumeProbeGridCounts.z，VkFormat为VK\_FORMAT\_R32G32B32A32\_SFLOAT。

### probeMaxRayDistance

PhonePC/2in1TabletTV



```
1. float XEG_DDGIVolumeEntryParameters::probeMaxRayDistance
```

**描述**

探针发射光线最大求交距离，建议值为1000.0。

### probeMinFrontfaceDistance

PhonePC/2in1TabletTV



```
1. float XEG_DDGIVolumeEntryParameters::probeMinFrontfaceDistance
```

**描述**

探针正向最小距离，建议值为0.0。

### probeSpacing

PhonePC/2in1TabletTV



```
1. float XEG_DDGIVolumeEntryParameters::probeSpacing[3]
```

**描述**

探针放置间距，必须大于0。

### raysPerProbe

PhonePC/2in1TabletTV



```
1. uint32_t XEG_DDGIVolumeEntryParameters::raysPerProbe
```

**描述**

探针发射光线数量，建议值为64，范围为[1, 1024]。

### volumeBlendDistance

PhonePC/2in1TabletTV



```
1. float XEG_DDGIVolumeEntryParameters::volumeBlendDistance
```

**描述**

体积光照混合距离，建议值为1.0。

### volumeBlendDistanceBlack

PhonePC/2in1TabletTV



```
1. float XEG_DDGIVolumeEntryParameters::volumeBlendDistanceBlack
```

**描述**

体积边缘光照渐暗范围，建议值为1.0。

### volumeIndex

PhonePC/2in1TabletTV



```
1. uint32_t XEG_DDGIVolumeEntryParameters::volumeIndex
```

**描述**

体积索引范围为[0, 65535]，且唯一。

### volumeIrradianceScalar

PhonePC/2in1TabletTV



```
1. float XEG_DDGIVolumeEntryParameters::volumeIrradianceScalar
```

**描述**

体积辐照度缩放倍率，建议值为1.0，必须非负。

### volumeLightingChannelMask

PhonePC/2in1TabletTV



```
1. uint32_t XEG_DDGIVolumeEntryParameters::volumeLightingChannelMask
```

**描述**

体积光照通道标记，建议值为0xFFFFFFFF。

### volumeNormalBias

PhonePC/2in1TabletTV



```
1. float XEG_DDGIVolumeEntryParameters::volumeNormalBias
```

**描述**

探针法向偏移量，建议值为0.12。

### volumePosition

PhonePC/2in1TabletTV



```
1. float XEG_DDGIVolumeEntryParameters::volumePosition[3]
```

**描述**

体积中心点坐标。

### volumeProbeGridCounts

PhonePC/2in1TabletTV



```
1. uint32_t XEG_DDGIVolumeEntryParameters::volumeProbeGridCounts[3]
```

**描述**

探针放置数量，必须大于0，范围为[1, 32]。

### volumeProbeIrradianceEncodingGamma

PhonePC/2in1TabletTV



```
1. float XEG_DDGIVolumeEntryParameters::volumeProbeIrradianceEncodingGamma
```

**描述**

辐照度的伽马校正系数，建议值为5.0，必须不为0。

### volumeViewBias

PhonePC/2in1TabletTV



```
1. float XEG_DDGIVolumeEntryParameters::volumeViewBias
```

**描述**

探针视角偏移量，建议值为0.48。