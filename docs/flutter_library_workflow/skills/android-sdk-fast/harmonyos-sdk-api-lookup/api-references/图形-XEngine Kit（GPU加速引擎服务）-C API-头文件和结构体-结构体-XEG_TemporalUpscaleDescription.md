## 概述

PhonePC/2in1TabletTV

此结构体描述下发时域AI超分渲染命令时的输入信息。

**起始版本：** 5.0.0(12)

**相关模块：** [XEngine](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xengine)

**所在头文件：** [xeg\_vulkan\_temporal\_upscale.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-vulkan-temporal-upscale-8h)

## 汇总

PhonePC/2in1TabletTV

### 成员变量

PhonePC/2in1TabletTV

展开

| 名称 | 描述 |
| --- | --- |
| VkImageView [inputImage](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-temporalupscaledescription#inputimage) | 输入图像。 |
| VkImageView [depthImage](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-temporalupscaledescription#depthimage) | 深度图像。 |
| VkImageView [motionVectorImage](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-temporalupscaledescription#motionvectorimage) | 运动矢量图像。运动矢量的计算方式为当前渲染像素的NDC坐标的XY值减去上一帧的NDC坐标的XY值。图像格式需要是VK\_FORMAT\_R16G16\_SFLOAT或更高精度。 |
| VkImageView [dynamicMaskImage](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-temporalupscaledescription#dynamicmaskimage) | 物体的动态遮罩图像，格式需要是VK\_FORMAT\_R8\_UNORM或其兼容格式。R通道的合法值为0.0，0.2或1.0，其中0.0表示静态物体，0.2表示运动物体如人物，1.0表示特效或半透明物体。 |
| VkImageView [outputImage](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-temporalupscaledescription#outputimage) | 输出图像。 |
| float [jitterX](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-temporalupscaledescription#jitterx) | 相机在X方向上的抖动。 |
| float [jitterY](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-temporalupscaledescription#jittery) | 相机在Y方向上的抖动。 |
| bool [resetHistory](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-temporalupscaledescription#resethistory) | 是否重置历史帧数据，true表示重置，false表示不重置。在历史帧未使用超分，当前帧开始使用超分的情况下建议设置为true。 |
| float [steadyLevel](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-temporalupscaledescription#steadylevel) | 画面偏向当前帧（鬼影少但可能存在闪烁）还是历史帧（鬼影多但是更稳定）的平衡程度。取值范围为[0.0, 1.0]，值越大越偏向历史帧。 |

## 结构体成员变量说明

PhonePC/2in1TabletTV

### depthImage

PhonePC/2in1TabletTV



```
1. VkImageView XEG_TemporalUpscaleDescription::depthImage
```

**描述**

深度图像。

### dynamicMaskImage

PhonePC/2in1TabletTV



```
1. VkImageView XEG_TemporalUpscaleDescription::dynamicMaskImage
```

**描述**

物体的动态遮罩图像，格式需要是VK\_FORMAT\_R8\_UNORM或其兼容格式。R通道的合法值为0.0，0.2或1.0，其中0.0表示静态物体，0.2表示运动物体如人物，1.0表示特效或半透明物体。

### inputImage

PhonePC/2in1TabletTV



```
1. VkImageView XEG_TemporalUpscaleDescription::inputImage
```

**描述**

输入图像。

### jitterX

PhonePC/2in1TabletTV



```
1. float XEG_TemporalUpscaleDescription::jitterX
```

**描述**

相机在X方向上的抖动。

### jitterY

PhonePC/2in1TabletTV



```
1. float XEG_TemporalUpscaleDescription::jitterY
```

**描述**

相机在Y方向上的抖动。

### motionVectorImage

PhonePC/2in1TabletTV



```
1. VkImageView XEG_TemporalUpscaleDescription::motionVectorImage
```

**描述**

运动矢量图像。运动矢量的计算方式为当前渲染像素的NDC坐标的XY值减去上一帧的NDC坐标的XY值。图像格式需要是VK\_FORMAT\_R16G16\_SFLOAT或更高精度。

### outputImage

PhonePC/2in1TabletTV



```
1. VkImageView XEG_TemporalUpscaleDescription::outputImage
```

**描述**

输出图像。

### resetHistory

PhonePC/2in1TabletTV



```
1. bool XEG_TemporalUpscaleDescription::resetHistory
```

**描述**

是否重置历史帧数据，true表示重置，false表示不重置。在历史帧未使用超分，当前帧开始使用超分的情况下建议设置为true。

### steadyLevel

PhonePC/2in1TabletTV



```
1. float XEG_TemporalUpscaleDescription::steadyLevel
```

**描述**

画面偏向当前帧（鬼影少但可能存在闪烁）还是历史帧（鬼影多但是更稳定）的平衡程度。取值范围为[0.0, 1.0]，值越大越偏向历史帧。