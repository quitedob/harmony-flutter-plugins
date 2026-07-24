

```
1. struct OH_PixelmapNative
```

## 概述

PhonePC/2in1TabletTVWearable

OH\_PixelmapNative结构体是native层封装的图像解码后无压缩的位图格式结构体。

函数创建OH\_PixelmapNative使用[OH\_PixelmapNative\_CreatePixelmap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapnative_createpixelmap)函数，默认采用BGRA\_8888格式处理数据。

释放OH\_PixelmapNative对象使用[OH\_PixelmapNative\_Release](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapnative_release)函数。

OH\_PixelmapNative结构体内容和操作方式如下：

展开

| 字段类型 | 字段名称 | 字段描述 | 操作函数 | 函数描述 |
| --- | --- | --- | --- | --- |
| uint8\_t | data | 图像像素数据 | [OH\_PixelmapNative\_ReadPixels](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapnative_readpixels) | 读取图像像素数据，结果写入ArrayBuffer里。 |
| uint8\_t | data | 图像像素数据 | [OH\_PixelmapNative\_WritePixels](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapnative_writepixels) | 读取缓冲区中的图片数据，结果写入PixelMap中。 |
| OH\_Pixelmap\_ImageInfo | imageInfo | 图像像素信息 | [OH\_PixelmapNative\_GetImageInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapnative_getimageinfo) | 获取图像像素信息。 |
| float | alphaRate | 透明度 | [OH\_PixelmapNative\_Opacity](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapnative_opacity) | 通过设置透明比率来让PixelMap达到对应的透明效果。 |
| float, float | scaleX, scaleY | scaleX沿X轴缩放比例、scaleY沿Y轴缩放比例 | [OH\_PixelmapNative\_Scale](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapnative_scale) | 根据输入的宽高对图片进行缩放。 |
| float, float | x, y | x平移量、y平移量 | [OH\_PixelmapNative\_Translate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapnative_translate) | 根据输入的坐标对图片进行位置变换。 |
| float | angle | 旋转角度 | [OH\_PixelmapNative\_Rotate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapnative_rotate) | 根据输入的角度对图片进行旋转。 |
| bool, bool | shouldFlipHorizontally, shouldFlipVertically | 是否水平翻转图像、是否垂直翻转图像。 | [OH\_PixelmapNative\_Flip](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapnative_flip) | 根据输入的条件对图片进行翻转。 |
| Image\_Region | region | 裁剪区间 | [OH\_PixelmapNative\_Crop](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapnative_crop) | 根据输入的尺寸对图片进行裁剪。 |

**起始版本：** 12

**相关模块：** [Image\_NativeModule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-nativemodule)

**所在头文件：** [pixelmap\_native.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h)