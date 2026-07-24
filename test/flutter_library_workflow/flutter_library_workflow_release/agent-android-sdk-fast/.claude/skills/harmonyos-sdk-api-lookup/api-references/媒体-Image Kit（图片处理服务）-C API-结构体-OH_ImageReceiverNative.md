

```
1. struct OH_ImageReceiverNative
```

## 概述

PhonePC/2in1TabletTVWearable

OH\_ImageReceiverNative是native层封装的图片接收器结构体，OH\_ImageReceiverNative结构体不可直接操作，而是采用函数调用方式创建、释放结构体以及操作具体字段。

创建OH\_ImageReceiverNative对象使用[OH\_ImageReceiverNative\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-receiver-native-h#oh_imagereceivernative_create)函数。

释放OH\_ImageReceiverNative对象使用[OH\_ImageReceiverNative\_Release](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-receiver-native-h#oh_imagereceivernative_release)函数。

OH\_ImageReceiverNative结构体内容和操作方式如下：

展开

| 字段类型 | 字段名称 | 字段描述 | 操作函数 | 函数描述 |
| --- | --- | --- | --- | --- |
| uint64\_t | surfaceId | 接收器的surfaceId | [OH\_ImageReceiverNative\_GetReceivingSurfaceId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-receiver-native-h#oh_imagereceivernative_getreceivingsurfaceid) | 通过OH\_ImageReceiverNative获取SurfaceId。 |
| OH\_ImageNative | image | native层的image | [OH\_ImageReceiverNative\_ReadLatestImage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-receiver-native-h#oh_imagereceivernative_readlatestimage) | 通过OH\_ImageReceiverNative获取最新的一张图片。 |
| OH\_ImageNative | image | native层的image | [OH\_ImageReceiverNative\_ReadNextImage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-receiver-native-h#oh_imagereceivernative_readnextimage) | 通过OH\_ImageReceiverNative获取下一张图片。 |
| OH\_ImageReceiver\_OnCallback | callback | 图片接收器回调函数 | [OH\_ImageReceiverNative\_On](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-receiver-native-h#oh_imagereceivernative_on) | 注册一个OH\_ImageReceiver\_OnCallback回调事件。 |
| OH\_ImageReceiver\_OnCallback | callback | 图片接收器回调函数 | [OH\_ImageReceiverNative\_Off](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-receiver-native-h#oh_imagereceivernative_off) | 关闭OH\_ImageReceiver\_OnCallback回调事件。 |
| Image\_Size | size | ImageReceiver的大小 | [OH\_ImageReceiverNative\_GetSize](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-receiver-native-h#oh_imagereceivernative_getsize) | 通过OH\_ImageReceiverNative获取ImageReceiver的大小。 |
| int32\_t | capacity | 图片接收器容量 | [OH\_ImageReceiverNative\_GetCapacity](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-receiver-native-h#oh_imagereceivernative_getcapacity) | 通过OH\_ImageReceiverNative获取ImageReceiver的容量。 |

**起始版本：** 12

**相关模块：** [Image\_NativeModule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-nativemodule)

**所在头文件：** [image\_receiver\_native.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-receiver-native-h)