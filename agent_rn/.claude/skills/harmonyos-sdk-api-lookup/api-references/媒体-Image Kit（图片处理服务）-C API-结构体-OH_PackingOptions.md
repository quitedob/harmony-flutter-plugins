

```
1. typedef struct OH_PackingOptions OH_PackingOptions
```

## 概述

PhonePC/2in1TabletTVWearable

OH\_PackingOptions是native层封装的图像编码选项结构体，不可直接操作，而是采用函数调用方式创建、释放结构体以及操作具体字段。

创建PackingOptions结构体的对象使用[OH\_PackingOptions\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-packer-native-h#oh_packingoptions_create)函数。

释放OH\_PackingOptions对象使用[OH\_PackingOptions\_Release](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-packer-native-h#oh_packingoptions_release)函数。

OH\_PackingOptions结构体内容和操作方式如下：

展开

| 字段类型 | 字段名称 | 字段描述 | 操作函数 | 函数描述 |
| --- | --- | --- | --- | --- |
| Image\_MimeType | mimeType | MIME类型 | [OH\_PackingOptions\_GetMimeType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-packer-native-h#oh_packingoptions_getmimetype) | 获取MIME类型。 |
| Image\_MimeType | mimeType | MIME类型 | [OH\_PackingOptions\_SetMimeType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-packer-native-h#oh_packingoptions_setmimetype) | 设置MIME类型。 |
| uint32\_t | quality | 编码质量 | [OH\_PackingOptions\_GetQuality](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-packer-native-h#oh_packingoptions_getquality) | 获取编码质量。 |
| uint32\_t | quality | 编码质量 | [OH\_PackingOptions\_SetQuality](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-packer-native-h#oh_packingoptions_setquality) | 设置编码质量。 |
| int32\_t | desiredDynamicRange | 图片动态范围 | [OH\_PackingOptions\_GetDesiredDynamicRange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-packer-native-h#oh_packingoptions_getdesireddynamicrange) | 获取编码时期望的图片动态范围。 |
| int32\_t | desiredDynamicRange | 图片动态范围 | [OH\_PackingOptions\_SetDesiredDynamicRange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-packer-native-h#oh_packingoptions_setdesireddynamicrange) | 设置编码时期望的图片动态范围。 |

**起始版本：** 12

**相关模块：** [Image\_NativeModule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-nativemodule)

**所在头文件：** [image\_packer\_native.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-packer-native-h)