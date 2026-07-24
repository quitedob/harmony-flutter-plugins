## 概述

PhonePC/2in1TabletTV

此结构体描述创建[XEG\_SpatialUpscale](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xengine#xeg_spatialupscale)对象的信息，当结构体中的信息变化时，需要创建新的[XEG\_SpatialUpscale](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xengine#xeg_spatialupscale)对象。

**起始版本：** 5.0.0(12)

**相关模块：** [XEngine](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xengine)

**所在头文件：** [xeg\_vulkan\_spatial\_upscale.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-vulkan-spatial-upscale-8h)

## 汇总

PhonePC/2in1TabletTV

### 成员变量

PhonePC/2in1TabletTV

展开

| 名称 | 描述 |
| --- | --- |
| VkExtent2D [inputSize](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-spatialupscalecreateinfo#inputsize) | 超分输入图像的尺寸，必须与超分输入图像的VkimageView的尺寸一致，否则会导致未定义问题，如超分失败、程序崩溃等。 |
| VkRect2D [inputRegion](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-spatialupscalecreateinfo#inputregion) | 超分输入图像的采样区域，图像超分区域参数必须大于0且小于等于图像尺寸，否则会导致渲染失败或者渲染效果不合预期，此参数存在两个结构体：VkOffset2D offset和VkExtent2D extent。其中offset为图像区域的左上角点的x与y值，extent为图像区域的宽与高。 |
| VkExtent2D [outputSize](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-spatialupscalecreateinfo#outputsize) | 超分输出图像的尺寸，必须与超分结果VkimageView的尺寸一致，否则会导致未定义问题，如超分失败、程序崩溃等。 |
| VkRect2D [outputRegion](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-spatialupscalecreateinfo#outputregion) | 超分输出图像的绘制区域，图像超分区域参数必须大于0且小于等于图像尺寸，否则会导致渲染失败或者渲染效果不合预期，此参数存在两个结构体：VkOffset2D offset和VkExtent2D extent。其中offset为图像区域的左上角点的x与y值，extent为图像区域的宽与高。 |
| VkFormat [format](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-spatialupscalecreateinfo#format) | 超分输入图像的格式。 |
| float [sharpness](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-spatialupscalecreateinfo#sharpness) | 超分的锐化参数，建议取值范围为[0, 1]，不同风格图像锐化值需要调整，否则会导致过度锐化现象，如出现大量噪点。 |

## 结构体成员变量说明

PhonePC/2in1TabletTV

### format

PhonePC/2in1TabletTV



```
1. VkFormat XEG_SpatialUpscaleCreateInfo::format
```

**描述**

超分输入图像的格式。

### inputRegion

PhonePC/2in1TabletTV



```
1. VkRect2D XEG_SpatialUpscaleCreateInfo::inputRegion
```

**描述**

超分输入图像的采样区域，图像超分区域参数必须大于0且小于等于图像尺寸，否则会导致渲染失败或者渲染效果不合预期，此参数存在两个结构体：VkOffset2D offset和VkExtent2D extent。其中offset为图像区域的左上角点的x与y值，extent为图像区域的宽与高。

### inputSize

PhonePC/2in1TabletTV



```
1. VkExtent2D XEG_SpatialUpscaleCreateInfo::inputSize
```

**描述**

超分输入图像的尺寸，必须与超分输入图像的VkimageView的尺寸一致，否则会导致未定义问题，如超分失败、程序崩溃等。

### outputRegion

PhonePC/2in1TabletTV



```
1. VkRect2D XEG_SpatialUpscaleCreateInfo::outputRegion
```

**描述**

超分输出图像的绘制区域，图像超分区域参数必须大于0且小于等于图像尺寸，否则会导致渲染失败或者渲染效果不合预期，此参数存在两个结构体：VkOffset2D offset和VkExtent2D extent。其中offset为图像区域的左上角点的x与y值，extent为图像区域的宽与高。

### outputSize

PhonePC/2in1TabletTV



```
1. VkExtent2D XEG_SpatialUpscaleCreateInfo::outputSize
```

**描述**

超分输出图像的尺寸，必须与超分结果VkimageView的尺寸一致，否则会导致未定义问题，如超分失败、程序崩溃等。

### sharpness

PhonePC/2in1TabletTV



```
1. float XEG_SpatialUpscaleCreateInfo::sharpness
```

**描述**

超分的锐化参数，建议取值范围为[0, 1]，不同风格图像锐化值需要调整，否则会导致过度锐化现象，如出现大量噪点。