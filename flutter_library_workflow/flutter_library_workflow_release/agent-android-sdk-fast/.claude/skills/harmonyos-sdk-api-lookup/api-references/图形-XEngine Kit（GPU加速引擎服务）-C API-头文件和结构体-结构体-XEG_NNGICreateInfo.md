## 概述

PhonePC/2in1TabletTV

此结构体描述创建具有NNGI特性的[XEG\_RTGI](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xengine#xeg_rtgi)对象的信息，当结构体中的信息变化时，需要创建新的[XEG\_RTGI](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xengine#xeg_rtgi)对象。

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
| XEG\_StructureType [sType](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-nngicreateinfo#stype) | 识别此结构的[XEG\_StructureType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xengine#xeg_structuretype)值，必须是XEG\_STRUCTURE\_TYPE\_NNGI\_CREATE\_INFO。 |
| const void \* [pNext](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-nngicreateinfo#pnext) | 指向扩展结构的指针。 |
| XEG\_RTGIQualityMode [qualityMode](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-nngicreateinfo#qualitymode) | 输出图像的质量模式，必须为[XEG\_RTGIQualityMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xengine#xeg_rtgiqualitymode)中的枚举值。 |
| VkExtent2D [inferenceInputSize](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-nngicreateinfo#inferenceinputsize) | 推理输入图像的分辨率，必须与[XEG\_NNGIDescription](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-nngidescription)中的推理输入图像的分辨率保持一致。 |
| VkExtent2D [inferenceOutputSize](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-nngicreateinfo#inferenceoutputsize) | 推理输出图像的分辨率，必须与[XEG\_NNGIDescription](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-nngidescription)中的推理输出图像的分辨率保持一致，推荐使用（640，368）。 |
| VkExtent2D [trainingSize](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-nngicreateinfo#trainingsize) | 训练图像的分辨率，必须与[XEG\_NNGIDescription](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-nngidescription)中的训练输入和输出图像的分辨率保持一致，推荐使用（64，32）。 |

## 结构体成员变量说明

PhonePC/2in1TabletTV

### inferenceInputSize

PhonePC/2in1TabletTV



```
1. VkExtent2D XEG_NNGICreateInfo::inferenceInputSize
```

**描述**

推理输入图像的分辨率，必须与[XEG\_NNGIDescription](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-nngidescription)中的推理输入图像的分辨率保持一致。

### inferenceOutputSize

PhonePC/2in1TabletTV



```
1. VkExtent2D XEG_NNGICreateInfo::inferenceOutputSize
```

**描述**

推理输出图像的分辨率，必须与[XEG\_NNGIDescription](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-nngidescription)中的推理输出图像的分辨率保持一致，推荐使用（640，368）。

### pNext

PhonePC/2in1TabletTV



```
1. const void* XEG_NNGICreateInfo::pNext
```

**描述**

指向扩展结构的指针。

### qualityMode

PhonePC/2in1TabletTV



```
1. XEG_RTGIQualityMode XEG_NNGICreateInfo::qualityMode
```

**描述**

输出图像的质量模式，必须为[XEG\_RTGIQualityMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xengine#xeg_rtgiqualitymode)中的枚举值。

### sType

PhonePC/2in1TabletTV



```
1. XEG_StructureType XEG_NNGICreateInfo::sType
```

**描述**

识别此结构的[XEG\_StructureType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xengine#xeg_structuretype)值，必须是XEG\_STRUCTURE\_TYPE\_NNGI\_CREATE\_INFO。

### trainingSize

PhonePC/2in1TabletTV



```
1. VkExtent2D XEG_NNGICreateInfo::trainingSize
```

**描述**

训练图像的分辨率，必须与[XEG\_NNGIDescription](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-nngidescription)中的训练输入和输出图像的分辨率保持一致，推荐使用（64，32）。