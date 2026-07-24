## 概述

PhonePC/2in1Tablet

声明用于对外提供全局取色能力。

**库：** libcolorpicker\_ndk.z.so

**引用文件：** <color\_picker/native\_gcp\_api.h>

**系统能力：** SystemCapability.Stylus.ColorPicker

**起始版本：** 5.0.0(12)

**相关模块：** [GlobalColorPicker](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-imagefeaturepicker-c)

## 汇总

PhonePC/2in1Tablet

### 结构体

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| struct [HMS\_GCP\_Color](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-imagefeaturepicker-struct-color) | 定义颜色值的结构体。 |
| struct [HMS\_GCP\_PickedColorInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-imagefeaturepicker-struct-colorinfo) | 定义取色的颜色信息的结构体。 |

### 类型定义

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| typedef void(\* [HMS\_GCP\_OnResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-imagefeaturepicker-c#hms_gcp_onresult)) (void \*userData, [HMS\_GCP\_PickedColorInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-imagefeaturepicker-struct-colorinfo) colorInfo, const int32\_t code) | 此回调用于接收拾取的颜色结果。 |

### 枚举

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| [HMS\_GCP\_ColorSpace](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-imagefeaturepicker-c#hms_gcp_colorspace) {  HMS\_GCP\_UNKNOWN = 0,  HMS\_GCP\_ADOBE\_RGB\_1998 = 1,  HMS\_GCP\_DCI\_P3 = 2,  HMS\_GCP\_DISPLAY\_P3 = 3,  HMS\_GCP\_SRGB = 4,  HMS\_GCP\_BT709 = 6,  HMS\_GCP\_BT601\_EBU = 7,  HMS\_GCP\_BT601\_SMPTE\_C = 8,  HMS\_GCP\_BT2020\_HLG = 9,  HMS\_GCP\_BT2020\_PQ = 10,  HMS\_GCP\_P3\_HLG = 11,  HMS\_GCP\_P3\_PQ = 12,  HMS\_GCP\_ADOBE\_RGB\_1998\_LIMIT = 13,  HMS\_GCP\_DISPLAY\_P3\_LIMIT = 14,  HMS\_GCP\_SRGB\_LIMIT = 15,  HMS\_GCP\_BT709\_LIMIT = 16,  HMS\_GCP\_BT601\_EBU\_LIMIT = 17,  HMS\_GCP\_BT601\_SMPTE\_C\_LIMIT = 18,  HMS\_GCP\_BT2020\_HLG\_LIMIT = 19,  HMS\_GCP\_BT2020\_PQ\_LIMIT = 20,  HMS\_GCP\_P3\_HLG\_LIMIT = 21,  HMS\_GCP\_P3\_PQ\_LIMIT = 22,  HMS\_GCP\_LINEAR\_P3 = 23,  HMS\_GCP\_LINEAR\_SRGB = 24,  HMS\_GCP\_LINEAR\_BT2020 = 25,  CUSTOM = 5  } | 颜色空间枚举。 |

### 函数

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| int32\_t [HMS\_GCP\_StartColorPicker](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-imagefeaturepicker-c#hms_gcp_startcolorpicker) (int32\_t initialPosX, int32\_t initialPosY, [HMS\_GCP\_OnResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-imagefeaturepicker-c#hms_gcp_onresult) onResultCallback, void \*userData) | 启动全局取色器。 |
| int32\_t [HMS\_GCP\_StartColorPickerWithColorValue](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-imagefeaturepicker-c#hms_gcp_startcolorpickerwithcolorvalue) (int32\_t initialPosX, int32\_t initialPosY, [HMS\_GCP\_OnResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-imagefeaturepicker-c#hms_gcp_onresult) onResultCallback, void \*userData) | 启动全局取色器。 |