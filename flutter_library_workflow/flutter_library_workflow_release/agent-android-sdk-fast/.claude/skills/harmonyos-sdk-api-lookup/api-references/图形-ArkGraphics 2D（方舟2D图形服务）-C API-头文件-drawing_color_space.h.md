## 概述

PhonePC/2in1TabletTVWearable

文件中定义了与颜色空间相关的功能函数。

**引用文件：** <native\_drawing/drawing\_color\_space.h>

**库：** libnative\_drawing.so

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 12

**相关模块：** [Drawing](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing)

## 汇总

PhonePC/2in1TabletTVWearable

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [OH\_Drawing\_ColorSpace\* OH\_Drawing\_ColorSpaceCreateSrgb(void)](/consumer/cn/doc/harmonyos-references/capi-drawing-color-space-h#oh_drawing_colorspacecreatesrgb) | 创建一个标准颜色空间。 |
| [OH\_Drawing\_ColorSpace\* OH\_Drawing\_ColorSpaceCreateSrgbLinear(void)](/consumer/cn/doc/harmonyos-references/capi-drawing-color-space-h#oh_drawing_colorspacecreatesrgblinear) | 创建一个Gamma 1.0空间上的颜色空间。 |
| [void OH\_Drawing\_ColorSpaceDestroy(OH\_Drawing\_ColorSpace\* colorSpace)](/consumer/cn/doc/harmonyos-references/capi-drawing-color-space-h#oh_drawing_colorspacedestroy) | 销毁颜色空间对象，并回收该对象占用内存。 |

## 函数说明

PhonePC/2in1TabletTVWearable

### OH\_Drawing\_ColorSpaceCreateSrgb()

PhonePC/2in1TabletTVWearable



```
1. OH_Drawing_ColorSpace* OH_Drawing_ColorSpaceCreateSrgb(void)
```

**描述**

创建一个标准颜色空间。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 12

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Drawing\_ColorSpace](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-colorspace)\* | 函数返回一个指针，指针指向创建的颜色空间对象[OH\_Drawing\_ColorSpace](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-colorspace)。 |

### OH\_Drawing\_ColorSpaceCreateSrgbLinear()

PhonePC/2in1TabletTVWearable



```
1. OH_Drawing_ColorSpace* OH_Drawing_ColorSpaceCreateSrgbLinear(void)
```

**描述**

创建一个Gamma 1.0空间上的颜色空间。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 12

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Drawing\_ColorSpace](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-colorspace)\* | 函数返回一个指针，指针指向创建的颜色空间对象[OH\_Drawing\_ColorSpace](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-colorspace)。 |

### OH\_Drawing\_ColorSpaceDestroy()

PhonePC/2in1TabletTVWearable



```
1. void OH_Drawing_ColorSpaceDestroy(OH_Drawing_ColorSpace* colorSpace)
```

**描述**

销毁颜色空间对象，并回收该对象占用的内存。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_ColorSpace](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-colorspace)\* colorSpace | 指向颜色空间对象[OH\_Drawing\_ColorSpace](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-colorspace)的指针。 |