## 概述

PhonePC/2in1TabletTVWearable

文件中定义了与内存流相关的功能函数。

**引用文件：** <native\_drawing/drawing\_memory\_stream.h>

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
| [OH\_Drawing\_MemoryStream\* OH\_Drawing\_MemoryStreamCreate(const void\* data, size\_t length, bool copyData)](/consumer/cn/doc/harmonyos-references/capi-drawing-memory-stream-h#oh_drawing_memorystreamcreate) | 创建一个内存流对象。  本接口会产生错误码，可以通过[OH\_Drawing\_ErrorCodeGet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-error-code-h#oh_drawing_errorcodeget)查看错误码的取值。  data为NULL或者length等于0时返回OH\_DRAWING\_ERROR\_INVALID\_PARAMETER。 |
| [void OH\_Drawing\_MemoryStreamDestroy(OH\_Drawing\_MemoryStream\* memoryStream)](/consumer/cn/doc/harmonyos-references/capi-drawing-memory-stream-h#oh_drawing_memorystreamdestroy) | 销毁内存流对象并回收该对象占用内存。 |

## 函数说明

PhonePC/2in1TabletTVWearable

### OH\_Drawing\_MemoryStreamCreate()

PhonePC/2in1TabletTVWearable



```
1. OH_Drawing_MemoryStream* OH_Drawing_MemoryStreamCreate(const void* data, size_t length, bool copyData)
```

**描述**

创建一个内存流对象。

本接口会产生错误码，可以通过[OH\_Drawing\_ErrorCodeGet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-error-code-h#oh_drawing_errorcodeget)查看错误码的取值。

data为NULL或者length等于0时返回OH\_DRAWING\_ERROR\_INVALID\_PARAMETER。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const void\* data | 数据段。 |
| size\_t length | 数据段长度。 |
| bool copyData | 是否拷贝数据。true表示内存流对象会拷贝一份数据段数据，false表示内存流对象直接使用数据段数据，不拷贝。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Drawing\_MemoryStream](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-memorystream)\* | 函数会返回一个指针，指针指向创建的内存流对象[OH\_Drawing\_MemoryStream](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-memorystream)。 |

### OH\_Drawing\_MemoryStreamDestroy()

PhonePC/2in1TabletTVWearable



```
1. void OH_Drawing_MemoryStreamDestroy(OH_Drawing_MemoryStream* memoryStream)
```

**描述**

销毁内存流对象并回收该对象占用的内存。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_MemoryStream](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-memorystream)\* memoryStream | 指向内存流对象[OH\_Drawing\_MemoryStream](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-memorystream)的指针。 |