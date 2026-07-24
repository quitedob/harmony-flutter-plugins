## 概述

PhonePC/2in1TabletTV

包含XEngine中Vulkan相关的通用类型定义。

**引用文件**：<xengine/xeg\_vulkan\_common.h>

**库：** libxengine.so

**系统能力：** SystemCapability.Graphic.XEngine

**起始版本：** 6.0.0(20)

**相关模块：** [XEngine](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xengine)

## 汇总

PhonePC/2in1TabletTV

### 类型定义

PhonePC/2in1TabletTV

展开

| 名称 | 描述 |
| --- | --- |
| typedef enum [XEG\_StructureType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xengine#xeg_structuretype) XEG\_StructureType | XEngine结构体类型的枚举。 |
| typedef VkResult(VKAPI\_PTR \* [PFN\_HMS\_XEG\_CmdSetSynchronization](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xengine#pfn_hms_xeg_cmdsetsynchronization)) (VkCommandBuffer commandBuffer, const void \*xegHandle) | 设置同步信号，等待渲染结果写入指定图像的函数指针定义。使用RTGI特性时，为等待GI渲染结果到写入指定图像。 |

### 枚举

PhonePC/2in1TabletTV

展开

| 名称 | 描述 |
| --- | --- |
| [XEG\_StructureType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xengine#xeg_structuretype) {  XEG\_STRUCTURE\_TYPE\_RT\_SHADOWAO\_CREATE\_INFO = 0, XEG\_STRUCTURE\_TYPE\_RT\_SHADOWAO\_DESCRIPTION = 1, XEG\_STRUCTURE\_TYPE\_RT\_REFLECTION\_CREATE\_INFO = 2, XEG\_STRUCTURE\_TYPE\_RT\_REFLECTION\_DESCRIPTION = 3,  XEG\_STRUCTURE\_TYPE\_NNGI\_CREATE\_INFO = 4, XEG\_STRUCTURE\_TYPE\_NNGI\_DESCRIPTION = 5, XEG\_STRUCTURE\_TYPE\_DDGI\_CREATE\_INFO = 6, XEG\_STRUCTURE\_TYPE\_DDGI\_DESCRIPTION = 7,  XEG\_STRUCTURE\_TYPE\_HPS\_CREATE\_INFO = 1001, XEG\_STRUCTURE\_TYPE\_HPS\_RADIX\_SORT = 1002, XEG\_STRUCTURE\_TYPE\_HPS\_RADIX\_SORT\_DESCRIPTION = 1003  } | XEngine结构体类型的枚举。 |

### 函数

PhonePC/2in1TabletTV

展开

| 名称 | 描述 |
| --- | --- |
| VKAPI\_ATTR VkResult VKAPI\_CALL [HMS\_XEG\_CmdSetSynchronization](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xengine#hms_xeg_cmdsetsynchronization) (VkCommandBuffer commandBuffer, const void \*xegHandle) | 设置同步信号，等待渲染结果写入指定图像。使用RTGI特性时，为等待GI渲染结果写入指定图像。 |