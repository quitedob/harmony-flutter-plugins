## 概述

PhonePC/2in1TabletTVWearable

文件中定义了与颜色相关的功能函数。

**引用文件：** <native\_drawing/drawing\_color.h>

**库：** libnative\_drawing.so

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 8

**相关模块：** [Drawing](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing)

## 汇总

PhonePC/2in1TabletTVWearable

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [uint32\_t OH\_Drawing\_ColorSetArgb(uint32\_t alpha, uint32\_t red, uint32\_t green, uint32\_t blue)](/consumer/cn/doc/harmonyos-references/capi-drawing-color-h#oh_drawing_colorsetargb) | 用于将4个变量（分别描述透明度、红色、绿色和蓝色）转化为一个描述颜色的32位（ARGB）变量。 |

## 函数说明

PhonePC/2in1TabletTVWearable

### OH\_Drawing\_ColorSetArgb()

PhonePC/2in1TabletTVWearable



```
1. uint32_t OH_Drawing_ColorSetArgb(uint32_t alpha, uint32_t red, uint32_t green, uint32_t blue)
```

**描述**

用于将4个变量（分别描述透明度、红色、绿色和蓝色）转化为一个描述颜色的32位（ARGB）变量。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 8

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| uint32\_t alpha | 描述透明度的变量, 变量范围是0x00~0xFF。 |
| uint32\_t red | 描述红色的变量, 变量范围是0x00~0xFF。 |
| uint32\_t green | 描述绿色的变量, 变量范围是0x00~0xFF。 |
| uint32\_t blue | 描述蓝色的变量, 变量范围是0x00~0xFF。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| uint32\_t | 函数返回一个描述颜色的32位（ARGB）变量。 |