## 概述

PhonePC/2in1TabletTVWearable

提供字体渲染单元的相关接口，比如绘制功能、获取排版边界功能等。

**引用文件：** <native\_drawing/drawing\_text\_run.h>

**库：** libnative\_drawing.so

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 18

**相关模块：** [Drawing](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing)

## 汇总

PhonePC/2in1TabletTVWearable

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [OH\_Drawing\_Array\* OH\_Drawing\_GetRunStringIndices(OH\_Drawing\_Run\* run, int64\_t start, int64\_t length)](/consumer/cn/doc/harmonyos-references/capi-drawing-text-run-h#oh_drawing_getrunstringindices) | 获取渲染单元指定范围内字形的字符索引数组，该索引是相对于整个段落的偏移。 |
| [uint64\_t OH\_Drawing\_GetRunStringIndicesByIndex(OH\_Drawing\_Array\* stringIndices, size\_t index)](/consumer/cn/doc/harmonyos-references/capi-drawing-text-run-h#oh_drawing_getrunstringindicesbyindex) | 获取字符索引数组中指定下标的字符索引值。 |
| [void OH\_Drawing\_DestroyRunStringIndices(OH\_Drawing\_Array\* stringIndices)](/consumer/cn/doc/harmonyos-references/capi-drawing-text-run-h#oh_drawing_destroyrunstringindices) | 释放字形的字符索引数组对象指针。 |
| [void OH\_Drawing\_GetRunStringRange(OH\_Drawing\_Run\* run, uint64\_t\* location, uint64\_t\* length)](/consumer/cn/doc/harmonyos-references/capi-drawing-text-run-h#oh_drawing_getrunstringrange) | 获取渲染单元生成字形的字符范围。 |
| [float OH\_Drawing\_GetRunTypographicBounds(OH\_Drawing\_Run\* run, float\* ascent, float\* descent, float\* leading)](/consumer/cn/doc/harmonyos-references/capi-drawing-text-run-h#oh_drawing_getruntypographicbounds) | 获取渲染单元的排版边界。文本排版边界与字符本身无关，与排版字号和字体有关。 |
| [void OH\_Drawing\_RunPaint(OH\_Drawing\_Canvas\* canvas, OH\_Drawing\_Run\* run, double x, double y)](/consumer/cn/doc/harmonyos-references/capi-drawing-text-run-h#oh_drawing_runpaint) | 在画布上绘制渲染单元包含的文本。 |
| [OH\_Drawing\_Rect\* OH\_Drawing\_GetRunImageBounds(OH\_Drawing\_Run\* run)](/consumer/cn/doc/harmonyos-references/capi-drawing-text-run-h#oh_drawing_getrunimagebounds) | 获取渲染单元的图像边界，文本图像边界与字符本身有关，相当于视觉边界。 |
| [void OH\_Drawing\_DestroyRunImageBounds(OH\_Drawing\_Rect\* rect)](/consumer/cn/doc/harmonyos-references/capi-drawing-text-run-h#oh_drawing_destroyrunimagebounds) | 释放渲染单元图像边界对象指针。 |
| [OH\_Drawing\_Array\* OH\_Drawing\_GetRunGlyphs(OH\_Drawing\_Run\* run, int64\_t start, int64\_t length)](/consumer/cn/doc/harmonyos-references/capi-drawing-text-run-h#oh_drawing_getrunglyphs) | 获取渲染单元指定范围内的字形数组。 |
| [uint16\_t OH\_Drawing\_GetRunGlyphsByIndex(OH\_Drawing\_Array\* glyphs, size\_t index)](/consumer/cn/doc/harmonyos-references/capi-drawing-text-run-h#oh_drawing_getrunglyphsbyindex) | 根据索引获取渲染单元单个字形。 |
| [void OH\_Drawing\_DestroyRunGlyphs(OH\_Drawing\_Array\* glyphs)](/consumer/cn/doc/harmonyos-references/capi-drawing-text-run-h#oh_drawing_destroyrunglyphs) | 释放渲染单元字形数组对象指针。 |
| [OH\_Drawing\_Array\* OH\_Drawing\_GetRunPositions(OH\_Drawing\_Run\* run, int64\_t start, int64\_t length)](/consumer/cn/doc/harmonyos-references/capi-drawing-text-run-h#oh_drawing_getrunpositions) | 获取渲染单元指定范围内字形的位置。 |
| [OH\_Drawing\_Point\* OH\_Drawing\_GetRunPositionsByIndex(OH\_Drawing\_Array\* positions, size\_t index)](/consumer/cn/doc/harmonyos-references/capi-drawing-text-run-h#oh_drawing_getrunpositionsbyindex) | 根据索引获取渲染单元中单个字形位置。 |
| [void OH\_Drawing\_DestroyRunPositions(OH\_Drawing\_Array\* positions)](/consumer/cn/doc/harmonyos-references/capi-drawing-text-run-h#oh_drawing_destroyrunpositions) | 释放渲染单元字形位置数组对象指针。 |
| [uint32\_t OH\_Drawing\_GetRunGlyphCount(OH\_Drawing\_Run\* run)](/consumer/cn/doc/harmonyos-references/capi-drawing-text-run-h#oh_drawing_getrunglyphcount) | 获取渲染单元字形数量。 |
| [OH\_Drawing\_Font\* OH\_Drawing\_GetRunFont(OH\_Drawing\_Run\* run)](/consumer/cn/doc/harmonyos-references/capi-drawing-text-run-h#oh_drawing_getrunfont) | 获取渲染单元字体对象。 |
| [OH\_Drawing\_TextDirection OH\_Drawing\_GetRunTextDirection(OH\_Drawing\_Run\* run)](/consumer/cn/doc/harmonyos-references/capi-drawing-text-run-h#oh_drawing_getruntextdirection) | 获取渲染单元文本方向。 |
| [OH\_Drawing\_Array\* OH\_Drawing\_GetRunGlyphAdvances(OH\_Drawing\_Run\* run, uint32\_t start, uint32\_t length)](/consumer/cn/doc/harmonyos-references/capi-drawing-text-run-h#oh_drawing_getrunglyphadvances) | 获取渲染单元字形宽度数组。 |
| [OH\_Drawing\_Point\* OH\_Drawing\_GetRunGlyphAdvanceByIndex(OH\_Drawing\_Array\* advances, size\_t index)](/consumer/cn/doc/harmonyos-references/capi-drawing-text-run-h#oh_drawing_getrunglyphadvancebyindex) | 根据索引获取渲染单元中单个字形宽度。 |
| [void OH\_Drawing\_DestroyRunGlyphAdvances(OH\_Drawing\_Array\* advances)](/consumer/cn/doc/harmonyos-references/capi-drawing-text-run-h#oh_drawing_destroyrunglyphadvances) | 释放渲染单元字形宽度数组对象的指针。 |

## 函数说明

PhonePC/2in1TabletTVWearable

### OH\_Drawing\_GetRunStringIndices()

PhonePC/2in1TabletTVWearable



```
1. OH_Drawing_Array* OH_Drawing_GetRunStringIndices(OH_Drawing_Run* run, int64_t start, int64_t length)
```

**描述**

获取渲染单元指定范围内字形的字符索引数组，该索引是相对于整个段落的偏移。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_Run](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-run)\* run | 指向渲染单元[OH\_Drawing\_Run](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-run)对象的指针。 |
| int64\_t start | 渲染单元内指定的开始位置，传入负数时该方法返回空指针。 |
| int64\_t length | 渲染单元内指定的长度，length为0时获取渲染单元的所有字符索引数组，length小于0时该方法返回空指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Drawing\_Array](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-array)\* | 返回字形的字符索引数组，不再需要[OH\_Drawing\_Array](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-array)时，请使用[OH\_Drawing\_DestroyRunStringIndices](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-run-h#oh_drawing_destroyrunstringindices)接口释放该对象的指针。 |

### OH\_Drawing\_GetRunStringIndicesByIndex()

PhonePC/2in1TabletTVWearable



```
1. uint64_t OH_Drawing_GetRunStringIndicesByIndex(OH_Drawing_Array* stringIndices, size_t index)
```

**描述**

获取字符索引数组中指定下标的字符索引值。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_Array](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-array)\* stringIndices | 字符索引数组。 |
| size\_t index | 渲染单元字形的字符索引数组下标。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| uint64\_t | 返回渲染单元单个字形的字符索引。 |

### OH\_Drawing\_DestroyRunStringIndices()

PhonePC/2in1TabletTVWearable



```
1. void OH_Drawing_DestroyRunStringIndices(OH_Drawing_Array* stringIndices)
```

**描述**

释放字形的字符索引数组对象指针。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_Array](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-array)\* stringIndices | 字符索引数组。 |

### OH\_Drawing\_GetRunStringRange()

PhonePC/2in1TabletTVWearable



```
1. void OH_Drawing_GetRunStringRange(OH_Drawing_Run* run, uint64_t* location, uint64_t* length)
```

**描述**

获取渲染单元生成字形的字符范围。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_Run](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-run)\* run | 指向渲染单元[OH\_Drawing\_Run](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-run)对象的指针。 |
| uint64\_t\* location | 表示渲染单元字形的字符范围的开始位置，该位置是相对于整个段落的偏移。 |
| uint64\_t\* length | 表示渲染单元字符范围的长度。 |

### OH\_Drawing\_GetRunTypographicBounds()

PhonePC/2in1TabletTVWearable



```
1. float OH_Drawing_GetRunTypographicBounds(OH_Drawing_Run* run, float* ascent, float* descent, float* leading)
```

**描述**

获取渲染单元的排版边界。文本排版边界与字符本身无关，与排版字号和字体有关。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_Run](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-run)\* run | 指向渲染单元[OH\_Drawing\_Run](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-run)对象的指针。 |
| float\* ascent | 渲染单元中最高字符到基准线的距离。 |
| float\* descent | 渲染单元中最低字符到基准线的距离。 |
| float\* leading | 渲染单元行间距。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| float | 返回渲染单元排版宽度。 |

### OH\_Drawing\_RunPaint()

PhonePC/2in1TabletTVWearable



```
1. void OH_Drawing_RunPaint(OH_Drawing_Canvas* canvas, OH_Drawing_Run* run, double x, double y)
```

**描述**

在画布上绘制渲染单元包含的文本。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_Canvas](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-canvas)\* canvas | 指向画布[OH\_Drawing\_Canvas](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-canvas)对象的指针。 |
| [OH\_Drawing\_Run](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-run)\* run | 指向渲染单元[OH\_Drawing\_Run](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-run)对象的指针。 |
| double x | 渲染单元x坐标。 |
| double y | 渲染单元y坐标。 |

### OH\_Drawing\_GetRunImageBounds()

PhonePC/2in1TabletTVWearable



```
1. OH_Drawing_Rect* OH_Drawing_GetRunImageBounds(OH_Drawing_Run* run)
```

**描述**

获取渲染单元的图像边界，文本图像边界与字符本身有关，相当于视觉边界。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_Run](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-run)\* run | 指向渲染单元[OH\_Drawing\_Run](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-run)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Drawing\_Rect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-rect)\* | 返回指向渲染单元图像边界[OH\_Drawing\_Rect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-rect)对象的指针，不再需要[OH\_Drawing\_Rect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-rect)时，请使用[OH\_Drawing\_DestroyRunImageBounds](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-run-h#oh_drawing_destroyrunimagebounds)接口释放该对象的指针。 |

### OH\_Drawing\_DestroyRunImageBounds()

PhonePC/2in1TabletTVWearable



```
1. void OH_Drawing_DestroyRunImageBounds(OH_Drawing_Rect* rect)
```

**描述**

释放渲染单元图像边界对象指针。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_Rect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-rect)\* rect | 指向渲染单元图像边界[OH\_Drawing\_Rect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-rect)对象的指针。 |

### OH\_Drawing\_GetRunGlyphs()

PhonePC/2in1TabletTVWearable



```
1. OH_Drawing_Array* OH_Drawing_GetRunGlyphs(OH_Drawing_Run* run, int64_t start, int64_t length)
```

**描述**

获取渲染单元指定范围内的字形数组。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_Run](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-run)\* run | 指向渲染单元[OH\_Drawing\_Run](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-run)对象的指针。 |
| int64\_t start | 渲染单元内指定的开始位置，传入负数时该方法返回空指针。 |
| int64\_t length | 渲染单元内指定的长度，length为0时获取渲染单元的所有字符索引，length小于0时该方法返回空指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Drawing\_Array](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-array)\* | 返回指向渲染单元字形数组[OH\_Drawing\_Array](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-array)对象的指针，不再需要[OH\_Drawing\_Array](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-array)时，请使用[OH\_Drawing\_DestroyRunGlyphs](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-run-h#oh_drawing_destroyrunglyphs)接口释放该对象的指针。 |

### OH\_Drawing\_GetRunGlyphsByIndex()

PhonePC/2in1TabletTVWearable



```
1. uint16_t OH_Drawing_GetRunGlyphsByIndex(OH_Drawing_Array* glyphs, size_t index)
```

**描述**

根据索引获取渲染单元单个字形。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_Array](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-array)\* glyphs | 指向渲染单元字形数组[OH\_Drawing\_Array](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-array)对象的指针。 |
| size\_t index | 渲染单元字形数组下标。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| uint16\_t | 渲染单元单个字形。 |

### OH\_Drawing\_DestroyRunGlyphs()

PhonePC/2in1TabletTVWearable



```
1. void OH_Drawing_DestroyRunGlyphs(OH_Drawing_Array* glyphs)
```

**描述**

释放渲染单元字形数组对象指针。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_Array](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-array)\* glyphs | 指向渲染单元字形数组[OH\_Drawing\_Array](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-array)对象的指针。 |

### OH\_Drawing\_GetRunPositions()

PhonePC/2in1TabletTVWearable



```
1. OH_Drawing_Array* OH_Drawing_GetRunPositions(OH_Drawing_Run* run, int64_t start, int64_t length)
```

**描述**

获取渲染单元指定范围内字形的位置。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_Run](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-run)\* run | 指向渲染单元[OH\_Drawing\_Run](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-run)对象的指针。 |
| int64\_t start | 渲染单元内指定的开始位置，传入负数时该方法返回空指针。 |
| int64\_t length | 渲染单元内指定的长度，length为0时获取渲染单元的所有字符索引，length小于0时该方法返回空指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Drawing\_Array](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-array)\* | 返回指向渲染单元字形位置数组[OH\_Drawing\_Array](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-array)对象的指针，不再需要[OH\_Drawing\_Array](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-array)时，请使用[OH\_Drawing\_DestroyRunPositions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-run-h#oh_drawing_destroyrunpositions)接口释放该对象的指针。 |

### OH\_Drawing\_GetRunPositionsByIndex()

PhonePC/2in1TabletTVWearable



```
1. OH_Drawing_Point* OH_Drawing_GetRunPositionsByIndex(OH_Drawing_Array* positions, size_t index)
```

**描述**

根据索引获取渲染单元中单个字形位置。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_Array](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-array)\* positions | 指向渲染单元字形位置数组[OH\_Drawing\_Array](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-array)对象的指针。 |
| size\_t index | 渲染单元字形位置数组下标。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Drawing\_Point](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-point)\* | 返回指向渲染单元单个字形位置[OH\_Drawing\_Point](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-point)对象的指针。 |

### OH\_Drawing\_DestroyRunPositions()

PhonePC/2in1TabletTVWearable



```
1. void OH_Drawing_DestroyRunPositions(OH_Drawing_Array* positions)
```

**描述**

释放渲染单元字形位置数组对象指针。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_Array](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-array)\* positions | 指向渲染单元字形位置数组[OH\_Drawing\_Array](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-array)对象的指针。 |

### OH\_Drawing\_GetRunGlyphCount()

PhonePC/2in1TabletTVWearable



```
1. uint32_t OH_Drawing_GetRunGlyphCount(OH_Drawing_Run* run)
```

**描述**

获取渲染单元字形数量。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_Run](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-run)\* run | 指向渲染单元[OH\_Drawing\_Run](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-run)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| uint32\_t | 返回渲染单元字形数量。 |

### OH\_Drawing\_GetRunFont()

PhonePC/2in1TabletTVWearable



```
1. OH_Drawing_Font* OH_Drawing_GetRunFont(OH_Drawing_Run* run)
```

**描述**

获取渲染单元字体对象。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_Run](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-run)\* run | 指向渲染单元[OH\_Drawing\_Run](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-run)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Drawing\_Font](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-font)\* | 返回指向渲染单元字体[OH\_Drawing\_Font](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-font)对象的指针，不再需要[OH\_Drawing\_Font](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-font)时，请使用[OH\_Drawing\_FontDestroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-font-h#oh_drawing_fontdestroy)接口释放该对象的指针。 |

### OH\_Drawing\_GetRunTextDirection()

PhonePC/2in1TabletTVWearable



```
1. OH_Drawing_TextDirection OH_Drawing_GetRunTextDirection(OH_Drawing_Run* run)
```

**描述**

获取渲染单元文本方向。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_Run](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-run)\* run | 指向渲染单元[OH\_Drawing\_Run](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-run)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Drawing\_TextDirection](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-typography-h#oh_drawing_textdirection) | 返回渲染单元的文本方向。0为TEXT\_DIRECTION\_RTL，方向为从右到左；1为TEXT\_DIRECTION\_LTR，方向为从左到右，具体可见[OH\_Drawing\_TextDirection](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-typography-h#oh_drawing_textdirection)枚举。 |

### OH\_Drawing\_GetRunGlyphAdvances()

PhonePC/2in1TabletTVWearable



```
1. OH_Drawing_Array* OH_Drawing_GetRunGlyphAdvances(OH_Drawing_Run* run, uint32_t start, uint32_t length)
```

**描述**

获取渲染单元字形宽度数组。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_Run](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-run)\* run | 指向渲染单元[OH\_Drawing\_Run](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-run)对象的指针。 |
| uint32\_t start | 渲染单元内指定的开始位置，传入负数时该方法返回空指针。 |
| uint32\_t length | 渲染单元内指定的长度，如果length是0表示从start开始获取到渲染单元结束，length小于0时该方法返回空指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Drawing\_Array](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-array)\* | 返回指向渲染单元字形宽度数组[OH\_Drawing\_Array](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-array)对象的指针，不再需要[OH\_Drawing\_Array](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-array)时，请使用[OH\_Drawing\_DestroyRunGlyphAdvances](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-run-h#oh_drawing_destroyrunglyphadvances)接口释放该对象的指针。 |

### OH\_Drawing\_GetRunGlyphAdvanceByIndex()

PhonePC/2in1TabletTVWearable



```
1. OH_Drawing_Point* OH_Drawing_GetRunGlyphAdvanceByIndex(OH_Drawing_Array* advances, size_t index)
```

**描述**

根据索引获取渲染单元中单个字形宽度。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_Array](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-array)\* advances | 指向渲染单元字形宽度数组[OH\_Drawing\_Array](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-array)对象的指针。 |
| size\_t index | 渲染单元字形宽度数组的下标。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Drawing\_Point](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-point)\* | 返回指向渲染单元单个字形宽度[OH\_Drawing\_Point](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-point)对象的指针。其中，[OH\_Drawing\_Point](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-point)对象的x值代表渲染单元单个字形宽度，y值为保留字段，默认返回0。 |

### OH\_Drawing\_DestroyRunGlyphAdvances()

PhonePC/2in1TabletTVWearable



```
1. void OH_Drawing_DestroyRunGlyphAdvances(OH_Drawing_Array* advances)
```

**描述**

释放渲染单元字形宽度数组对象的指针。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_Array](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-array)\* advances | 指向渲染单元字形宽度数组[OH\_Drawing\_Array](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-array)对象的指针。 |