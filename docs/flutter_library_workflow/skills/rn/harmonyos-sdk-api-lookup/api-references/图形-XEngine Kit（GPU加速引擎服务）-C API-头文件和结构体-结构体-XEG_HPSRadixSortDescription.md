## 概述

PhonePC/2in1TabletTV

此结构体描述使用[XEG\_HPS\_RADIX\_SORT\_EXTENSION\_NAME](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xengine#xeg_hps_radix_sort_extension_name)扩展进行排序时所需的信息。

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
| XEG\_StructureType [sType](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-hpsradixsortdescription#stype) | 识别此结构的[XEG\_StructureType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xengine#xeg_structuretype)值，必须是XEG\_STRUCTURE\_TYPE\_HPS\_RADIX\_SORT\_DESCRIPTION。 |
| const void \* [pNext](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-hpsradixsortdescription#pnext) | 指向扩展结构的指针。 |
| VkBuffer [sortCount](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-hpsradixsortdescription#sortcount) | 存储要排序的索引数量的缓冲区，数量值从缓冲区第0位读取。 |
| VkBuffer [keyBuffer](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-hpsradixsortdescription#keybuffer) | 存储排序使用的key值的缓冲区，数据格式为32位无符号整数。 |
| VkBuffer [indexBuffer](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-hpsradixsortdescription#indexbuffer) | 存储待排序value值的缓冲区，数据格式为32位无符号整数。 |

## 结构体成员变量说明

PhonePC/2in1TabletTV

### indexBuffer

PhonePC/2in1TabletTV



```
1. VkBuffer XEG_HPSRadixSortDescription::indexBuffer
```

**描述**

存储待排序value值的缓冲区，数据格式为32位无符号整数。

### keyBuffer

PhonePC/2in1TabletTV



```
1. VkBuffer XEG_HPSRadixSortDescription::keyBuffer
```

**描述**

存储排序使用的key值的缓冲区，数据格式为32位无符号整数。

### pNext

PhonePC/2in1TabletTV



```
1. const void* XEG_HPSRadixSortDescription::pNext
```

**描述**

指向扩展结构的指针。

### sortCount

PhonePC/2in1TabletTV



```
1. VkBuffer XEG_HPSRadixSortDescription::sortCount
```

**描述**

存储要排序的索引数量的缓冲区，数量值从缓冲区第0位读取。

### sType

PhonePC/2in1TabletTV



```
1. XEG_StructureType XEG_HPSRadixSortDescription::sType
```

**描述**

识别此结构的[XEG\_StructureType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xengine#xeg_structuretype)值，必须是XEG\_STRUCTURE\_TYPE\_HPS\_RADIX\_SORT\_DESCRIPTION。