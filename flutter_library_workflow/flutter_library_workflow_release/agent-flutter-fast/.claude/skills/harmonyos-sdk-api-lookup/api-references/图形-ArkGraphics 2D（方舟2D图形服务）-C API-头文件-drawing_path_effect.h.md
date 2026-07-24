## 概述

PhonePC/2in1TabletTVWearable

文件中定义了与路径效果相关的功能函数。

**引用文件：** <native\_drawing/drawing\_path\_effect.h>

**库：** libnative\_drawing.so

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 12

**相关模块：** [Drawing](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing)

## 汇总

PhonePC/2in1TabletTVWearable

### 枚举

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [OH\_Drawing\_PathDashStyle](/consumer/cn/doc/harmonyos-references/capi-drawing-path-effect-h#oh_drawing_pathdashstyle) | OH\_Drawing\_PathDashStyle | 路径效果的绘制样式枚举。 |

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [OH\_Drawing\_PathEffect\* OH\_Drawing\_CreateComposePathEffect(OH\_Drawing\_PathEffect\* outer, OH\_Drawing\_PathEffect\* inner)](/consumer/cn/doc/harmonyos-references/capi-drawing-path-effect-h#oh_drawing_createcomposepatheffect) | 创建路径组合的路径效果对象。首先应用内部路径效果，然后应用外部路径效果。 |
| [OH\_Drawing\_PathEffect\* OH\_Drawing\_CreateCornerPathEffect(float radius)](/consumer/cn/doc/harmonyos-references/capi-drawing-path-effect-h#oh_drawing_createcornerpatheffect) | 创建一个将路径的夹角变成指定半径的圆角的路径效果对象。 |
| [OH\_Drawing\_PathEffect\* OH\_Drawing\_CreateDashPathEffect(float\* intervals, int count, float phase)](/consumer/cn/doc/harmonyos-references/capi-drawing-path-effect-h#oh_drawing_createdashpatheffect) | 创建一个虚线效果的路径效果对象。虚线效果由一组虚线开的间隔、虚线关的间隔数据决定。  本接口会产生错误码，可以通过[OH\_Drawing\_ErrorCodeGet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-error-code-h#oh_drawing_errorcodeget)查看错误码的取值。  intervals为NULL或者count小于等于0时返回OH\_DRAWING\_ERROR\_INVALID\_PARAMETER。 |
| [OH\_Drawing\_PathEffect\* OH\_Drawing\_CreateDiscretePathEffect(float segLength, float deviation)](/consumer/cn/doc/harmonyos-references/capi-drawing-path-effect-h#oh_drawing_creatediscretepatheffect) | 创建一种将路径打散并且在路径上产生不规则分布的路径效果对象。 |
| [OH\_Drawing\_PathEffect\* OH\_Drawing\_CreatePathDashEffect(const OH\_Drawing\_Path\* path, float advance, float phase,OH\_Drawing\_PathDashStyle type)](/consumer/cn/doc/harmonyos-references/capi-drawing-path-effect-h#oh_drawing_createpathdasheffect) | 创建一个虚线效果的路径效果对象。 |
| [OH\_Drawing\_PathEffect\* OH\_Drawing\_CreateSumPathEffect(OH\_Drawing\_PathEffect\* firstPathEffect,OH\_Drawing\_PathEffect\* secondPathEffect)](/consumer/cn/doc/harmonyos-references/capi-drawing-path-effect-h#oh_drawing_createsumpatheffect) | 创建一个使用两种路径效果分别生效后叠加的路径效果对象。 |
| [void OH\_Drawing\_PathEffectDestroy(OH\_Drawing\_PathEffect\* pathEffect)](/consumer/cn/doc/harmonyos-references/capi-drawing-path-effect-h#oh_drawing_patheffectdestroy) | 销毁路径效果对象并回收该对象占有内存。 |

## 枚举类型说明

PhonePC/2in1TabletTVWearable

### OH\_Drawing\_PathDashStyle

PhonePC/2in1TabletTVWearable



```
1. enum OH_Drawing_PathDashStyle
```

**描述**

路径效果的绘制样式枚举。

**起始版本：** 18

展开

| 枚举项 | 描述 |
| --- | --- |
| DRAWING\_PATH\_DASH\_STYLE\_TRANSLATE | 表示路径效果是平移效果。 |
| DRAWING\_PATH\_DASH\_STYLE\_ROTATE | 表示路径效果是旋转效果。 |
| DRAWING\_PATH\_DASH\_STYLE\_MORPH | 表示路径效果是变形效果。 |

## 函数说明

PhonePC/2in1TabletTVWearable

### OH\_Drawing\_CreateComposePathEffect()

PhonePC/2in1TabletTVWearable



```
1. OH_Drawing_PathEffect* OH_Drawing_CreateComposePathEffect(OH_Drawing_PathEffect* outer, OH_Drawing_PathEffect* inner)
```

**描述**

创建路径组合的路径效果对象。首先应用内部路径效果，然后应用外部路径效果。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_PathEffect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-patheffect)\* outer | 表示组合路径效果中外部路径效果[OH\_Drawing\_PathEffect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-patheffect)的指针。 |
| [OH\_Drawing\_PathEffect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-patheffect)\* inner | 表示组合路径效果中内部路径效果[OH\_Drawing\_PathEffect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-patheffect)的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Drawing\_PathEffect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-patheffect)\* | 函数返回一个指针，指针指向创建的路径效果对象[OH\_Drawing\_PathEffect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-patheffect)。  如果返回nullptr，则创建失败，失败的原因可能是outer或者inner为nullptr。 |

### OH\_Drawing\_CreateCornerPathEffect()

PhonePC/2in1TabletTVWearable



```
1. OH_Drawing_PathEffect* OH_Drawing_CreateCornerPathEffect(float radius)
```

**描述**

创建一个将路径的夹角变成指定半径的圆角的路径效果对象。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| float radius | 表示圆角的半径，该值必须大于0时才生效。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Drawing\_PathEffect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-patheffect)\* | 函数返回一个指针，指针指向创建的路径效果对象[OH\_Drawing\_PathEffect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-patheffect)。  如果返回nullptr，则创建失败，失败的可能原因是radius小于等于0。 |

### OH\_Drawing\_CreateDashPathEffect()

PhonePC/2in1TabletTVWearable



```
1. OH_Drawing_PathEffect* OH_Drawing_CreateDashPathEffect(float* intervals, int count, float phase)
```

**描述**

创建一个虚线效果的路径效果对象。虚线效果由一组虚线开的间隔、虚线关的间隔数据决定。

本接口会产生错误码，可以通过[OH\_Drawing\_ErrorCodeGet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-error-code-h#oh_drawing_errorcodeget)查看错误码的取值。

intervals为NULL或者count小于等于0时返回OH\_DRAWING\_ERROR\_INVALID\_PARAMETER。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| float\* intervals | 虚线间隔数组首地址，偶数项的值表示虚线开的间隔长度，奇数项的值表示虚线关的间隔长度，单位为像素。 |
| int count | 虚线间隔数组元素的个数，必须为大于0的偶数。 |
| float phase | 虚线间隔数组中偏移量。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Drawing\_PathEffect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-patheffect)\* | 函数返回一个指针，指针指向创建的路径效果对象[OH\_Drawing\_PathEffect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-patheffect)。 |

### OH\_Drawing\_CreateDiscretePathEffect()

PhonePC/2in1TabletTVWearable



```
1. OH_Drawing_PathEffect* OH_Drawing_CreateDiscretePathEffect(float segLength, float deviation)
```

**描述**

创建一种将路径打散并且在路径上产生不规则分布的路径效果对象。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| float segLength | 表示路径中每进行一次打散操作的长度，该值大于0时有效果。 |
| float deviation | 表示绘制时的末端点的最大移动偏离量。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Drawing\_PathEffect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-patheffect)\* | 函数返回一个指针，指针指向创建的路径效果对象[OH\_Drawing\_PathEffect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-patheffect)。 |

### OH\_Drawing\_CreatePathDashEffect()

PhonePC/2in1TabletTVWearable



```
1. OH_Drawing_PathEffect* OH_Drawing_CreatePathDashEffect(const OH_Drawing_Path* path, float advance, float phase,OH_Drawing_PathDashStyle type)
```

**描述**

创建一个虚线效果的路径效果对象。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_Drawing\_Path](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-path)\* path | 表示虚线样式的路径对象[OH\_Drawing\_Path](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-path)的指针。 |
| float advance | 表示虚线段的步长。 |
| float phase | 表示虚线段内图形在虚线步长范围内的偏移量。 |
| [OH\_Drawing\_PathDashStyle](/consumer/cn/doc/harmonyos-references/capi-drawing-path-effect-h#oh_drawing_pathdashstyle) type | 表示虚线路径效果样式。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Drawing\_PathEffect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-patheffect)\* | 函数返回一个指针，指针指向创建的路径效果对象[OH\_Drawing\_PathEffect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-patheffect)。  如果返回nullptr，则创建失败，失败的可能原因是path为nullptr或者advance小于等于0。 |

### OH\_Drawing\_CreateSumPathEffect()

PhonePC/2in1TabletTVWearable



```
1. OH_Drawing_PathEffect* OH_Drawing_CreateSumPathEffect(OH_Drawing_PathEffect* firstPathEffect,OH_Drawing_PathEffect* secondPathEffect)
```

**描述**

创建一个使用两种路径效果分别生效后叠加的路径效果对象。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_PathEffect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-patheffect)\* firstPathEffect | 指向路径对象[OH\_Drawing\_PathEffect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-patheffect)的指针。 |
| [OH\_Drawing\_PathEffect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-patheffect)\* secondPathEffect | 指向路径对象[OH\_Drawing\_PathEffect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-patheffect)的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Drawing\_PathEffect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-patheffect)\* | 函数返回一个指针，指针指向创建的路径效果对象[OH\_Drawing\_PathEffect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-patheffect)。  如果返回nullptr，则创建失败，失败的可能原因是firstPathEffect或者secondPathEffect为nullptr。 |

### OH\_Drawing\_PathEffectDestroy()

PhonePC/2in1TabletTVWearable



```
1. void OH_Drawing_PathEffectDestroy(OH_Drawing_PathEffect* pathEffect)
```

**描述**

销毁路径效果对象并回收该对象占有内存。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_PathEffect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-patheffect)\* pathEffect | 指向路径效果对象[OH\_Drawing\_PathEffect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-patheffect)的指针。 |