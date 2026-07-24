

```
1. struct OH_ImageSource_Info
```

## 概述

PhonePC/2in1TabletTVWearable

OH\_ImageSource\_Info是native层封装的ImageSource信息结构体，OH\_ImageSource\_Info结构体不可直接操作，而是采用函数调用方式创建、释放结构体以及操作具体字段。

创建OH\_ImageSource\_Info对象使用[OH\_ImageSourceInfo\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h#oh_imagesourceinfo_create)函数。

释放OH\_ImageSource\_Info对象使用[OH\_ImageSourceInfo\_Release](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h#oh_imagesourceinfo_release)函数。调用该接口之后，与OH\_ImageSource\_Info结构体相关的属性均会被释放。因此在调用该接口前，请务必确认相关属性已不再被需要或对相关属性已完成深拷贝操作。

OH\_ImageSource\_Info结构体内容和操作方式如下：

展开

| 字段类型 | 字段名称 | 字段描述 | 操作函数 | 函数描述 |
| --- | --- | --- | --- | --- |
| uint32\_t | width | 图片宽度 | [OH\_ImageSourceInfo\_GetWidth](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h#oh_imagesourceinfo_getwidth) | 获取图片的宽。 |
| uint32\_t | height | 图片高度 | [OH\_ImageSourceInfo\_GetHeight](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h#oh_imagesourceinfo_getheight) | 获取图片的高。 |
| bool | isHdr | 是否为高动态范围（HDR）的信息 | [OH\_ImageSourceInfo\_GetDynamicRange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h#oh_imagesourceinfo_getdynamicrange) | 获取图片是否为高动态范围的信息。 |
| [Image\_MimeType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-nativemodule-image-string) | mimeType | 图片源的MIME类型 | [OH\_ImageSourceInfo\_GetMimetype](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h#oh_imagesourceinfo_getmimetype) | 获取图片的MimeType。 |

**起始版本：** 12

**相关模块：** [Image\_NativeModule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-nativemodule)

**所在头文件：** [image\_source\_native.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h)