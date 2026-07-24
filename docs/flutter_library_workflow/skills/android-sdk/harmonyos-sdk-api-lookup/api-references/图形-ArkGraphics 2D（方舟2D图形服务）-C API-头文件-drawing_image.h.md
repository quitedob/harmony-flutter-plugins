## 概述

PhonePC/2in1TabletTVWearable

文件中定义了与图片相关的功能函数。

**引用文件：** <native\_drawing/drawing\_image.h>

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
| [OH\_Drawing\_Image\* OH\_Drawing\_ImageCreate(void)](/consumer/cn/doc/harmonyos-references/capi-drawing-image-h#oh_drawing_imagecreate) | 创建一个图片对象，描述了要绘制的二维像素数组。 |
| [void OH\_Drawing\_ImageDestroy(OH\_Drawing\_Image\* image)](/consumer/cn/doc/harmonyos-references/capi-drawing-image-h#oh_drawing_imagedestroy) | 销毁图片对象并回收该对象占用的内存。 |
| [bool OH\_Drawing\_ImageBuildFromBitmap(OH\_Drawing\_Image\* image, OH\_Drawing\_Bitmap\* bitmap)](/consumer/cn/doc/harmonyos-references/capi-drawing-image-h#oh_drawing_imagebuildfrombitmap) | 从位图构造图片对象内容，共享或复制位图像素。如果位图被标记为不可变状态，像素内存是共享的，不是复制。  本接口会产生错误码，可以通过[OH\_Drawing\_ErrorCodeGet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-error-code-h#oh_drawing_errorcodeget)查看错误码的取值。  image、bitmap任意一个为NULL时返回OH\_DRAWING\_ERROR\_INVALID\_PARAMETER。 |
| [int32\_t OH\_Drawing\_ImageGetWidth(OH\_Drawing\_Image\* image)](/consumer/cn/doc/harmonyos-references/capi-drawing-image-h#oh_drawing_imagegetwidth) | 获取图片宽度，即每行的像素个数。  本接口会产生错误码，可以通过[OH\_Drawing\_ErrorCodeGet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-error-code-h#oh_drawing_errorcodeget)查看错误码的取值。  image为NULL时返回OH\_DRAWING\_ERROR\_INVALID\_PARAMETER。 |
| [int32\_t OH\_Drawing\_ImageGetHeight(OH\_Drawing\_Image\* image)](/consumer/cn/doc/harmonyos-references/capi-drawing-image-h#oh_drawing_imagegetheight) | 获取图片高度，即像素行数。  本接口会产生错误码，可以通过[OH\_Drawing\_ErrorCodeGet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-error-code-h#oh_drawing_errorcodeget)查看错误码的取值。  image为NULL时返回OH\_DRAWING\_ERROR\_INVALID\_PARAMETER。 |
| [void OH\_Drawing\_ImageGetImageInfo(OH\_Drawing\_Image\* image, OH\_Drawing\_Image\_Info\* imageInfo)](/consumer/cn/doc/harmonyos-references/capi-drawing-image-h#oh_drawing_imagegetimageinfo) | 获取图片信息。调用该接口后，传入的图片信息对象被填充。  本接口会产生错误码，可以通过[OH\_Drawing\_ErrorCodeGet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-error-code-h#oh_drawing_errorcodeget)查看错误码的取值。  image、imageInfo任意一个为NULL时返回OH\_DRAWING\_ERROR\_INVALID\_PARAMETER。 |

## 函数说明

PhonePC/2in1TabletTVWearable

### OH\_Drawing\_ImageCreate()

PhonePC/2in1TabletTVWearable



```
1. OH_Drawing_Image* OH_Drawing_ImageCreate(void)
```

**描述**

创建一个图片对象，描述了要绘制的二维像素数组。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 12

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Drawing\_Image](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-image)\* | 函数返回一个指针，指针指向创建的图片对象[OH\_Drawing\_Image](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-image)。 |

### OH\_Drawing\_ImageDestroy()

PhonePC/2in1TabletTVWearable



```
1. void OH_Drawing_ImageDestroy(OH_Drawing_Image* image)
```

**描述**

销毁图片对象并回收该对象占用的内存。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_Image](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-image)\* image | 指向图片对象[OH\_Drawing\_Image](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-image)的指针。 |

### OH\_Drawing\_ImageBuildFromBitmap()

PhonePC/2in1TabletTVWearable



```
1. bool OH_Drawing_ImageBuildFromBitmap(OH_Drawing_Image* image, OH_Drawing_Bitmap* bitmap)
```

**描述**

从位图构造图片对象内容，共享或复制位图像素。如果位图被标记为不可变状态，像素内存是共享的，不是复制。

本接口会产生错误码，可以通过[OH\_Drawing\_ErrorCodeGet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-error-code-h#oh_drawing_errorcodeget)查看错误码的取值。

image、bitmap任意一个为NULL时返回OH\_DRAWING\_ERROR\_INVALID\_PARAMETER。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_Image](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-image)\* image | 指向图片对象[OH\_Drawing\_Image](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-image)的指针。 |
| [OH\_Drawing\_Bitmap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-bitmap)\* bitmap | 指向位图对象[OH\_Drawing\_Bitmap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-bitmap)的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| bool | 函数返回true表示构造图片内容成功，函数返回false表示构建图片内容失败。 |

### OH\_Drawing\_ImageGetWidth()

PhonePC/2in1TabletTVWearable



```
1. int32_t OH_Drawing_ImageGetWidth(OH_Drawing_Image* image)
```

**描述**

获取图片宽度，即每行的像素个数。

本接口会产生错误码，可以通过[OH\_Drawing\_ErrorCodeGet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-error-code-h#oh_drawing_errorcodeget)查看错误码的取值。

image为NULL时返回OH\_DRAWING\_ERROR\_INVALID\_PARAMETER。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_Image](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-image)\* image | 指向图片对象[OH\_Drawing\_Image](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-image)的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | 函数返回图片宽度。 |

### OH\_Drawing\_ImageGetHeight()

PhonePC/2in1TabletTVWearable



```
1. int32_t OH_Drawing_ImageGetHeight(OH_Drawing_Image* image)
```

**描述**

获取图片高度，即像素行数。

本接口会产生错误码，可以通过[OH\_Drawing\_ErrorCodeGet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-error-code-h#oh_drawing_errorcodeget)查看错误码的取值。

image为NULL时返回OH\_DRAWING\_ERROR\_INVALID\_PARAMETER。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_Image](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-image)\* image | 指向图片对象[OH\_Drawing\_Image](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-image)的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | 函数返回图片高度。 |

### OH\_Drawing\_ImageGetImageInfo()

PhonePC/2in1TabletTVWearable



```
1. void OH_Drawing_ImageGetImageInfo(OH_Drawing_Image* image, OH_Drawing_Image_Info* imageInfo)
```

**描述**

获取图片信息。调用该接口后，传入的图片信息对象被填充。

本接口会产生错误码，可以通过[OH\_Drawing\_ErrorCodeGet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-error-code-h#oh_drawing_errorcodeget)查看错误码的取值。

image、imageInfo任意一个为NULL时返回OH\_DRAWING\_ERROR\_INVALID\_PARAMETER。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeDrawing

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_Image](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-image)\* image | 指向图片对象[OH\_Drawing\_Image](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-image)的指针。 |
| [OH\_Drawing\_Image\_Info](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-image-info)\* imageInfo | 指向图片信息对象[OH\_Drawing\_Image\_Info](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-image-info)的指针，开发者可调用[OH\_Drawing\_Image\_Info](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-image-info)创建。 |