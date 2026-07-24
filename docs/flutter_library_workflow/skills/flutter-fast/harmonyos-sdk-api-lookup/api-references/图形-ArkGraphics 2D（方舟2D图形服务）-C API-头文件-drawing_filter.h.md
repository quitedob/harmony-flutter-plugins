## 概述

PhonePC/2in1TabletTVWearable

声明与绘图模块中的滤波器对象相关的函数。

**引用文件：** <native\_drawing/drawing\_filter.h>

**库：** libnative\_drawing.so

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 11

**相关模块：** [Drawing](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing)

## 汇总

PhonePC/2in1TabletTVWearable

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [OH\_Drawing\_Filter\* OH\_Drawing\_FilterCreate(void)](/consumer/cn/doc/harmonyos-references/capi-drawing-filter-h#oh_drawing_filtercreate) | 创建一个滤波器对象。 |
| [void OH\_Drawing\_FilterSetImageFilter(OH\_Drawing\_Filter\* filter, OH\_Drawing\_ImageFilter\* imageFilter)](/consumer/cn/doc/harmonyos-references/capi-drawing-filter-h#oh_drawing_filtersetimagefilter) | 为滤波器对象设置图像滤波器对象。  本接口会产生错误码，可以通过[OH\_Drawing\_ErrorCodeGet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-error-code-h#oh_drawing_errorcodeget)查看错误码的取值。  filter为NULL时返回OH\_DRAWING\_ERROR\_INVALID\_PARAMETER。 |
| [void OH\_Drawing\_FilterSetMaskFilter(OH\_Drawing\_Filter\* filter, OH\_Drawing\_MaskFilter\* maskFilter)](/consumer/cn/doc/harmonyos-references/capi-drawing-filter-h#oh_drawing_filtersetmaskfilter) | 为滤波器对象设置蒙版滤波器对象。  本接口会产生错误码，可以通过[OH\_Drawing\_ErrorCodeGet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-error-code-h#oh_drawing_errorcodeget)查看错误码的取值。  filter为NULL时返回OH\_DRAWING\_ERROR\_INVALID\_PARAMETER。 |
| [void OH\_Drawing\_FilterSetColorFilter(OH\_Drawing\_Filter\* filter, OH\_Drawing\_ColorFilter\* colorFilter)](/consumer/cn/doc/harmonyos-references/capi-drawing-filter-h#oh_drawing_filtersetcolorfilter) | 为滤波器对象设置颜色滤波器对象。  本接口会产生错误码，可以通过[OH\_Drawing\_ErrorCodeGet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-error-code-h#oh_drawing_errorcodeget)查看错误码的取值。  filter为NULL时返回OH\_DRAWING\_ERROR\_INVALID\_PARAMETER。 |
| [void OH\_Drawing\_FilterGetColorFilter(OH\_Drawing\_Filter\* filter, OH\_Drawing\_ColorFilter\* colorFilter)](/consumer/cn/doc/harmonyos-references/capi-drawing-filter-h#oh_drawing_filtergetcolorfilter) | 从滤波器对象获取颜色滤波器对象。  本接口会产生错误码，可以通过[OH\_Drawing\_ErrorCodeGet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-error-code-h#oh_drawing_errorcodeget)查看错误码的取值。  filter、colorFilter任意一个为NULL时返回OH\_DRAWING\_ERROR\_INVALID\_PARAMETER。 |
| [void OH\_Drawing\_FilterDestroy(OH\_Drawing\_Filter\* filter)](/consumer/cn/doc/harmonyos-references/capi-drawing-filter-h#oh_drawing_filterdestroy) | 销毁滤波器对象，并收回该对象占用的内存。 |

## 函数说明

PhonePC/2in1TabletTVWearable

### OH\_Drawing\_FilterCreate()

PhonePC/2in1TabletTVWearable



```
1. OH_Drawing_Filter* OH_Drawing_FilterCreate(void)
```

**描述**

创建一个滤波器对象。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 11

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Drawing\_Filter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-filter)\* | 返回创建的滤波器对象的指针。 |

### OH\_Drawing\_FilterSetImageFilter()

PhonePC/2in1TabletTVWearable



```
1. void OH_Drawing_FilterSetImageFilter(OH_Drawing_Filter* filter, OH_Drawing_ImageFilter* imageFilter)
```

**描述**

为滤波器对象设置图像滤波器对象。

本接口会产生错误码，可以通过[OH\_Drawing\_ErrorCodeGet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-error-code-h#oh_drawing_errorcodeget)查看错误码的取值。

filter为NULL时返回OH\_DRAWING\_ERROR\_INVALID\_PARAMETER。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_Filter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-filter)\* filter | 指示指向滤波器对象[OH\_Drawing\_Filter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-filter)的指针。 |
| [OH\_Drawing\_ImageFilter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-imagefilter)\* imageFilter | 指示指向图像滤波器[OH\_Drawing\_ImageFilter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-imagefilter)对象的指针，为NULL表示清空滤波器对象中的图像滤波器效果。 |

### OH\_Drawing\_FilterSetMaskFilter()

PhonePC/2in1TabletTVWearable



```
1. void OH_Drawing_FilterSetMaskFilter(OH_Drawing_Filter* filter, OH_Drawing_MaskFilter* maskFilter)
```

**描述**

为滤波器对象设置蒙版滤波器对象。

本接口会产生错误码，可以通过[OH\_Drawing\_ErrorCodeGet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-error-code-h#oh_drawing_errorcodeget)查看错误码的取值。

filter为NULL时返回OH\_DRAWING\_ERROR\_INVALID\_PARAMETER。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_Filter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-filter)\* filter | 指示指向滤波器对象[OH\_Drawing\_Filter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-filter)的指针。 |
| [OH\_Drawing\_MaskFilter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-maskfilter)\* maskFilter | 指示指向蒙版滤波器对象[OH\_Drawing\_MaskFilter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-maskfilter)的指针，为NULL表示清空滤波器对象中的蒙版滤波器效果。 |

### OH\_Drawing\_FilterSetColorFilter()

PhonePC/2in1TabletTVWearable



```
1. void OH_Drawing_FilterSetColorFilter(OH_Drawing_Filter* filter, OH_Drawing_ColorFilter* colorFilter)
```

**描述**

为滤波器对象设置颜色滤波器对象。

本接口会产生错误码，可以通过[OH\_Drawing\_ErrorCodeGet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-error-code-h#oh_drawing_errorcodeget)查看错误码的取值。

filter为NULL时返回OH\_DRAWING\_ERROR\_INVALID\_PARAMETER。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_Filter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-filter)\* filter | 指示指向滤波器对象[OH\_Drawing\_Filter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-filter)的指针。 |
| [OH\_Drawing\_ColorFilter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-colorfilter)\* colorFilter | 指示指向颜色滤波器对象[OH\_Drawing\_ColorFilter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-colorfilter)的指针，为NULL表示清空滤波器对象中的颜色滤波器效果。 |

### OH\_Drawing\_FilterGetColorFilter()

PhonePC/2in1TabletTVWearable



```
1. void OH_Drawing_FilterGetColorFilter(OH_Drawing_Filter* filter, OH_Drawing_ColorFilter* colorFilter)
```

**描述**

从滤波器对象获取颜色滤波器对象。

本接口会产生错误码，可以通过[OH\_Drawing\_ErrorCodeGet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-error-code-h#oh_drawing_errorcodeget)查看错误码的取值。

filter、colorFilter任意一个为NULL时返回OH\_DRAWING\_ERROR\_INVALID\_PARAMETER。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_Filter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-filter)\* filter | 指示指向滤波器对象[OH\_Drawing\_Filter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-filter)的指针。 |
| [OH\_Drawing\_ColorFilter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-colorfilter)\* colorFilter | 指示指向颜色滤波器对象[OH\_Drawing\_ColorFilter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-colorfilter)的指针。 |

### OH\_Drawing\_FilterDestroy()

PhonePC/2in1TabletTVWearable



```
1. void OH_Drawing_FilterDestroy(OH_Drawing_Filter* filter)
```

**描述**

销毁滤波器对象，并收回该对象占用的内存。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_Filter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-filter)\* filter | 指示指向滤波器对象[OH\_Drawing\_Filter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-filter)的指针。 |