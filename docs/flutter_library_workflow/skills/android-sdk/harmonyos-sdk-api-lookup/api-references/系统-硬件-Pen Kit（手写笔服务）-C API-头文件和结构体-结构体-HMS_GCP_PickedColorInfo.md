## 概述

PhonePC/2in1Tablet

定义取色颜色信息的结构体。

**系统能力：** SystemCapability.Stylus.ColorPicker

**起始版本：** 5.0.0(12)

**相关模块：** [GlobalColorPicker](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-imagefeaturepicker-c)

**所在头文件：** [native\_gcp\_api.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-headerfile-declare)

## 汇总

PhonePC/2in1Tablet

### 成员变量

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| [HMS\_GCP\_Color](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-imagefeaturepicker-struct-color) color | 提取的颜色值。 |
| [HMS\_GCP\_ColorSpace](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-imagefeaturepicker-c#hms_gcp_colorspace) colorSpace | 颜色所属的颜色空间。 |
| int64\_t [timestamp](/consumer/cn/doc/harmonyos-references/pen-imagefeaturepicker-struct-colorinfo#timestamp) | 提取颜色的时间戳。 |

## 结构体成员变量说明

PhonePC/2in1Tablet

### color

PhonePC/2in1Tablet



```
1. HMS_GCP_Color HMS_GCP_PickedColorInfo::color
```

**描述**

提取的颜色值。

### colorSpace

PhonePC/2in1Tablet



```
1. HMS_GCP_ColorSpace HMS_GCP_PickedColorInfo::colorSpace
```

**描述**

颜色所属的颜色空间。

### timestamp

PhonePC/2in1Tablet



```
1. int64_t HMS_GCP_PickedColorInfo::timestamp
```

**描述**

提取颜色的时间戳。