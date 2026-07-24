## 概述

PhonePC/2in1TabletTV

此结构体描述创建[XEG\_HPS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xengine#xeg_hps)对象的信息。

**起始版本：** 6.0.0(20)

**相关模块：** [XEngine](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xengine)

**所在头文件：** [xeg\_vulkan\_hps.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-vulkan-hps-8h)

## 汇总

PhonePC/2in1TabletTV

### 成员变量

PhonePC/2in1TabletTV

展开

| 名称 | 描述 |
| --- | --- |
| XEG\_StructureType [sType](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-hpscreateinfo#stype) | 识别此结构的[XEG\_StructureType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xengine#xeg_structuretype)值，必须是XEG\_STRUCTURE\_TYPE\_HPS\_CREATE\_INFO。 |
| const void \* [pNext](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-hpscreateinfo#pnext) | 指向扩展结构的指针，不允许为空。表示启用的XEngine HPS扩展，如当使用[XEG\_HPS\_RADIX\_SORT\_EXTENSION\_NAME](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xengine#xeg_hps_radix_sort_extension_name)扩展时，必须指定为[XEG\_HPSRadixSort](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-hpsradixsort)。 |

## 结构体成员变量说明

PhonePC/2in1TabletTV

### pNext

PhonePC/2in1TabletTV



```
1. const void* XEG_HPSCreateInfo::pNext
```

**描述**

指向扩展结构的指针，不允许为空。表示启用的XEngine HPS扩展，如当使用[XEG\_HPS\_RADIX\_SORT\_EXTENSION\_NAME](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xengine#xeg_hps_radix_sort_extension_name)扩展时，必须指定为[XEG\_HPSRadixSort](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-hpsradixsort)。

### sType

PhonePC/2in1TabletTV



```
1. XEG_StructureType XEG_HPSCreateInfo::sType
```

**描述**

识别此结构的[XEG\_StructureType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xengine#xeg_structuretype)值，必须是XEG\_STRUCTURE\_TYPE\_HPS\_CREATE\_INFO。