

```
1. struct OH_ImageSourceNative
```

## 概述

PhonePC/2in1TabletTVWearable

OH\_ImageSourceNative是native层封装的ImageSource结构体，用于创建图片数据。OH\_ImageSourceNative结构体不可直接操作，而是采用函数调用方式创建、释放结构体以及操作具体字段。

有多种方式创建OH\_ImageSourceNative，具体如下：

展开

| 函数 | 描述 |
| --- | --- |
| [OH\_ImageSourceNative\_CreateFromUri](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h#oh_imagesourcenative_createfromuri) | 通过uri创建OH\_ImageSourceNative对象。 |
| [OH\_ImageSourceNative\_CreateFromFd](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h#oh_imagesourcenative_createfromfd) | 通过fd创建OH\_ImageSourceNative对象。 |
| [OH\_ImageSourceNative\_CreateFromData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h#oh_imagesourcenative_createfromdata) | 通过缓冲区数据创建OH\_ImageSourceNative对象。 |
| [OH\_ImageSourceNative\_CreateFromRawFile](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h#oh_imagesourcenative_createfromrawfile) | 通过图像资源文件的RawFileDescriptor创建OH\_ImageSourceNative对象。 |
| [OH\_ImageSourceNative\_CreatePixelmap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h#oh_imagesourcenative_createpixelmap) | 通过图片解码参数创建OH\_PixelmapNative对象。 |
| [OH\_ImageSourceNative\_CreatePixelmapList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h#oh_imagesourcenative_createpixelmaplist) | 通过图片解码参数创建OH\_PixelmapNative数组。 |

释放OH\_ImageSourceNative对象使用[OH\_ImageSourceNative\_Release](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h#oh_imagesourcenative_release)函数。

OH\_ImageSourceNative结构体内容和操作方式如下：

展开

| 字段类型 | 字段名称 | 字段描述 | 操作函数 | 函数描述 |
| --- | --- | --- | --- | --- |
| int32\_t | delayTimeList | 图像延迟时间数组 | [OH\_ImageSourceNative\_GetDelayTimeList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h#oh_imagesourcenative_getdelaytimelist) | 获取图像延迟时间数组。 |
| OH\_ImageSource\_Info | info | ImageSource信息 | [OH\_ImageSourceNative\_GetImageInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h#oh_imagesourcenative_getimageinfo) | 获取指定序号的图片信息。 |
| Image\_String | value | 配置项 | [OH\_ImageSourceNative\_GetImageProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h#oh_imagesourcenative_getimageproperty) | 获取图片指定属性键的值。 |
| Image\_String | value | 配置项 | [OH\_ImageSourceNative\_ModifyImageProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h#oh_imagesourcenative_modifyimageproperty) | 通过指定的键修改图片属性的值。 |
| uint32\_t | frameCount | 图像帧数 | [OH\_ImageSourceNative\_GetFrameCount](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h#oh_imagesourcenative_getframecount) | 获取图像帧数。 |

**起始版本：** 12

**相关模块：** [Image\_NativeModule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-nativemodule)

**所在头文件：** [image\_source\_native.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h)