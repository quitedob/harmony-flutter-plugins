## 概述

PhonePC/2in1TabletTV

此结构体描述创建[XEG\_RTReflection](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xengine#xeg_rtreflection)对象的信息。当结构体中的信息变化时，需要创建新的[XEG\_RTReflection](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xengine#xeg_rtreflection)对象。

**起始版本：** 6.0.0(20)

**相关模块：** [XEngine](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xengine)

**所在头文件：** [xeg\_vulkan\_rt\_reflection.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-vulkan-rt-reflection-8h)

## 汇总

PhonePC/2in1TabletTV

### 成员变量

PhonePC/2in1TabletTV

展开

| 名称 | 描述 |
| --- | --- |
| XEG\_StructureType [sType](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-rtreflectioncreateinfo#stype) | 识别此结构的[XEG\_StructureType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xengine#xeg_structuretype)值，必须是XEG\_STRUCTURE\_TYPE\_RT\_REFLECTION\_CREATE\_INFO。 |
| const void \* [pNext](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-rtreflectioncreateinfo#pnext) | 指向扩展结构的指针。 |
| VkExtent2D [renderSize](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-rtreflectioncreateinfo#rendersize) | 输入图像的尺寸。 |
| bool [enableFastTrace](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-rtreflectioncreateinfo#enablefasttrace) | 是否开启快速求交模式，相较常规求交模式，快速求交模式的性能更好。true表示开启快速求交模式，false表示使用常规求交模式，默认为false |

## 结构体成员变量说明

PhonePC/2in1TabletTV

### enableFastTrace

PhonePC/2in1TabletTV



```
1. bool XEG_RTReflectionCreateInfo::enableFastTrace
```

**描述**

是否开启快速求交模式，相较常规求交模式，快速求交模式的性能更好。true表示开启快速求交模式，false表示使用常规求交模式。

### pNext

PhonePC/2in1TabletTV



```
1. const void* XEG_RTReflectionCreateInfo::pNext
```

**描述**

指向扩展结构的指针。

### renderSize

PhonePC/2in1TabletTV



```
1. VkExtent2D XEG_RTReflectionCreateInfo::renderSize
```

**描述**

输入图像的尺寸。

### sType

PhonePC/2in1TabletTV



```
1. XEG_StructureType XEG_RTReflectionCreateInfo::sType
```

**描述**

识别此结构的[XEG\_StructureType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xengine#xeg_structuretype)值，必须是XEG\_STRUCTURE\_TYPE\_RT\_REFLECTION\_CREATE\_INFO。