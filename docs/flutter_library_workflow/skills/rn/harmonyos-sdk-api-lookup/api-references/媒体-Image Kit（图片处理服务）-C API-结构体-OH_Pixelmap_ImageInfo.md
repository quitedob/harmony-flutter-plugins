

```
1. struct OH_Pixelmap_ImageInfo
```

## 概述

PhonePC/2in1TabletTVWearable

OH\_Pixelmap\_ImageInfo是native层封装的图像像素信息结构体，保存图像像素的宽高、行跨距、像素格式、是否是HDR。

创建OH\_Pixelmap\_ImageInfo对象使用[OH\_PixelmapImageInfo\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapimageinfo_create)函数。

释放OH\_Pixelmap\_ImageInfo对象使用[OH\_PixelmapImageInfo\_Release](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapimageinfo_release)函数。

OH\_Pixelmap\_ImageInfo结构体内容和操作方式如下：

展开

| 字段类型 | 字段名称 | 字段描述 | 操作函数 | 函数描述 |
| --- | --- | --- | --- | --- |
| uint32\_t | width | 图片宽 | [OH\_PixelmapImageInfo\_GetWidth](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapimageinfo_getwidth) | 获取图片宽。 |
| uint32\_t | height | 图片高 | [OH\_PixelmapImageInfo\_GetHeight](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapimageinfo_getheight) | 获取图片高。 |
| uint32\_t | rowStride | 行跨距 | [OH\_PixelmapImageInfo\_GetRowStride](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapimageinfo_getrowstride) | 获取行跨距。 |
| int32\_t | pixelFormat | 像素格式 | [OH\_PixelmapImageInfo\_GetPixelFormat](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapimageinfo_getpixelformat) | 获取像素格式。 |
| int32\_t | alphaType | 透明度类型 | [OH\_PixelmapImageInfo\_GetAlphaType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapimageinfo_getalphatype) | 获取透明度类型。 |
| bool | isHdr | 是否为高动态范围（HDR）的信息 | [OH\_PixelmapImageInfo\_GetDynamicRange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapimageinfo_getdynamicrange) | 获取Pixelmap是否为高动态范围的信息。 |

**起始版本：** 12

**相关模块：** [Image\_NativeModule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-nativemodule)

**所在头文件：** [pixelmap\_native.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h)