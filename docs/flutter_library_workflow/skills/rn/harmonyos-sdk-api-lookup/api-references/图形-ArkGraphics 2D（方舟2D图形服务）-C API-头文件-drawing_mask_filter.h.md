## 概述

PhonePC/2in1TabletTVWearable

声明与绘图模块中的对象相关的函数。

**引用文件：** <native\_drawing/drawing\_mask\_filter.h>

**库：** libnative\_drawing.so

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 11

**相关模块：** [Drawing](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing)

## 汇总

PhonePC/2in1TabletTVWearable

### 枚举

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [OH\_Drawing\_BlurType](/consumer/cn/doc/harmonyos-references/capi-drawing-mask-filter-h#oh_drawing_blurtype) | OH\_Drawing\_BlurType | 蒙版滤波器模糊操作类型的枚举。 |

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [OH\_Drawing\_MaskFilter\* OH\_Drawing\_MaskFilterCreateBlur(OH\_Drawing\_BlurType blurType, float sigma, bool respectCTM)](/consumer/cn/doc/harmonyos-references/capi-drawing-mask-filter-h#oh_drawing_maskfiltercreateblur) | 创建具有模糊效果的蒙版滤波器。 |
| [void OH\_Drawing\_MaskFilterDestroy(OH\_Drawing\_MaskFilter\* maskFilter)](/consumer/cn/doc/harmonyos-references/capi-drawing-mask-filter-h#oh_drawing_maskfilterdestroy) | 销毁蒙版滤波器对象，并收回该对象占用的内存。 |

## 枚举类型说明

PhonePC/2in1TabletTVWearable

### OH\_Drawing\_BlurType

PhonePC/2in1TabletTVWearable



```
1. enum OH_Drawing_BlurType
```

**描述**

蒙版滤波器模糊操作类型的枚举。

**起始版本：** 11

展开

| 枚举项 | 描述 |
| --- | --- |
| NORMAL | 内外模糊。 |
| SOLID | 内部实体，外部模糊。 |
| OUTER | 内部空白，外部模糊。 |
| INNER | 内部模糊，外部空白。 |

## 函数说明

PhonePC/2in1TabletTVWearable

### OH\_Drawing\_MaskFilterCreateBlur()

PhonePC/2in1TabletTVWearable



```
1. OH_Drawing_MaskFilter* OH_Drawing_MaskFilterCreateBlur(OH_Drawing_BlurType blurType, float sigma, bool respectCTM)
```

**描述**

创建具有模糊效果的蒙版滤波器。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_BlurType](/consumer/cn/doc/harmonyos-references/capi-drawing-mask-filter-h#oh_drawing_blurtype) blurType | 表示模糊类型。 |
| float sigma | 表示要应用的高斯模糊的标准偏差。必须大于0。 |
| bool respectCTM | 表示模糊标准差值被CTM（当前变换矩阵）修改，默认为真。true表示模糊标准差值受CTM影响，false表示模糊标准差值固定，不受CTM影响。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Drawing\_MaskFilter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-maskfilter)\* | 返回创建的蒙版滤波器对象的指针。 |

### OH\_Drawing\_MaskFilterDestroy()

PhonePC/2in1TabletTVWearable



```
1. void OH_Drawing_MaskFilterDestroy(OH_Drawing_MaskFilter* maskFilter)
```

**描述**

销毁蒙版滤波器对象，并收回该对象占用的内存。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_MaskFilter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-maskfilter)\* maskFilter | 表示指向蒙版滤波器对象的指针。 |