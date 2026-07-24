

```
1. typedef struct OH_DecodingOptions OH_DecodingOptions
```

## 概述

PhonePC/2in1TabletTVWearable

OH\_DecodingOptions是native层封装的解码选项参数结构体，用于设置解码选项参数，在创建Pixelmap时作为入参传入，详细信息见[OH\_ImageSourceNative\_CreatePixelmap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h#oh_imagesourcenative_createpixelmap)。

OH\_DecodingOptions结构体不可直接操作，而是采用函数调用方式创建、释放结构体以及操作具体字段。

创建OH\_DecodingOptions对象使用[OH\_DecodingOptions\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h#oh_decodingoptions_create)函数。

释放OH\_DecodingOptions对象使用[OH\_DecodingOptions\_Release](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h#oh_decodingoptions_release)函数。

OH\_DecodingOptions结构体内容和操作方式如下：

展开

| 字段类型 | 字段名称 | 字段描述 | 字段默认值 | 字段获取函数 | 字段设置函数 |
| --- | --- | --- | --- | --- | --- |
| int32\_t | pixelFormat | 像素格式 | RGBA\_8888 | [OH\_DecodingOptions\_GetPixelFormat](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h#oh_decodingoptions_getpixelformat) | [OH\_DecodingOptions\_SetPixelFormat](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h#oh_decodingoptions_setpixelformat) |
| uint32\_t | index | 解码图片序号 | 0 | [OH\_DecodingOptions\_GetIndex](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h#oh_decodingoptions_getindex) | [OH\_DecodingOptions\_SetIndex](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h#oh_decodingoptions_setindex) |
| float | rotate | 旋转角度 | 单位为deg, 默认值为0 | [OH\_DecodingOptions\_GetRotate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h#oh_decodingoptions_getrotate) | [OH\_DecodingOptions\_SetRotate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h#oh_decodingoptions_setrotate) |
| Image\_Size | desiredSize | 期望输出大小 | 默认为原始图片尺寸 | [OH\_DecodingOptions\_GetDesiredSize](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h#oh_decodingoptions_getdesiredsize) | [OH\_DecodingOptions\_SetDesiredSize](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h#oh_decodingoptions_setdesiredsize) |
| Image\_Region | desiredRegion | 解码区域 | 默认为完整图片大小的区域 | [OH\_DecodingOptions\_GetDesiredRegion](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h#oh_decodingoptions_getdesiredregion) | [OH\_DecodingOptions\_SetDesiredRegion](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h#oh_decodingoptions_setdesiredregion) |
| int32\_t | desiredDynamicRange | 期望动态范围 | SDR | [OH\_DecodingOptions\_GetDesiredDynamicRange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h#oh_decodingoptions_getdesireddynamicrange) | [OH\_DecodingOptions\_SetDesiredDynamicRange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h#oh_decodingoptions_setdesireddynamicrange) |

**起始版本：** 12

**相关模块：** [Image\_NativeModule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-nativemodule)

**所在头文件：** [image\_source\_native.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h)