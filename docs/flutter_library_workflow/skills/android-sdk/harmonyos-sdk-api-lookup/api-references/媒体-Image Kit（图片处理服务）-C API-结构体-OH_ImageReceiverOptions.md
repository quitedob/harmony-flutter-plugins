

```
1. typedef struct OH_ImageReceiverOptions OH_ImageReceiverOptions
```

## 概述

PhonePC/2in1TabletTVWearable

用于定义OH\_ImageReceiverOptions数据类型名称。

OH\_ImageReceiverOptions是native层封装的图片接收器选项设置器结构体，用于创建OH\_ImageReceiverNative时传入设置参数。OH\_ImageReceiverOptions结构体不可直接操作，而是采用函数调用方式创建、释放结构体以及操作具体字段。

创建OH\_ImageReceiverOptions对象使用[OH\_ImageReceiverOptions\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-receiver-native-h#oh_imagereceiveroptions_create)函数。

释放OH\_ImageReceiverOptions对象使用[OH\_ImageReceiverOptions\_Release](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-receiver-native-h#oh_imagereceiveroptions_release)函数。

OH\_ImageReceiverOptions结构体内容和操作方式如下：

展开

| 字段类型 | 字段名称 | 字段描述 | 操作函数 | 函数描述 |
| --- | --- | --- | --- | --- |
| Image\_Size | size | 图像大小 | [OH\_ImageReceiverOptions\_GetSize](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-receiver-native-h#oh_imagereceiveroptions_getsize) | 获取OH\_ImageReceiverOptions对象的Image\_Size。 |
| Image\_Size | size | 图像大小 | [OH\_ImageReceiverOptions\_SetSize](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-receiver-native-h#oh_imagereceiveroptions_setsize) | 设置OH\_ImageReceiverOptions对象的Image\_Size。 |
| int32\_t | capacity | 图片缓存容量 | [OH\_ImageReceiverOptions\_GetCapacity](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-receiver-native-h#oh_imagereceiveroptions_getcapacity) | 获取OH\_ImageReceiverOptions对象的图片缓存容量。 |
| int32\_t | capacity | 图片缓存容量 | [OH\_ImageReceiverOptions\_SetCapacity](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-receiver-native-h#oh_imagereceiveroptions_setcapacity) | 设置OH\_ImageReceiverOptions对象的图片缓存容量。 |

**起始版本：** 12

**相关模块：** [Image\_NativeModule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-nativemodule)

**所在头文件：** [image\_receiver\_native.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-receiver-native-h)