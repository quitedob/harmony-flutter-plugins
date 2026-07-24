## 概述

PhonePC/2in1TabletTVWearable

提供图片处理的相关能力，包括图片编解码、从Native层获取图片数据等。

使用该模块的接口，无需通过JS接口导入，可直接使用NDK完成功能开发。

开发者可根据实际的开发需求，参考对应的开发指南及样例：

* [使用Image\_NativeModule完成图片解码](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/image-source-c)
* [使用Image\_NativeModule完成多图对象解码](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/image-source-picture-c)
* [使用Image\_NativeModule完成图片接收](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/image-receiver-c)
* [使用Image\_NativeModule完成位图操作](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/pixelmap-c)
* [使用Image\_NativeModule完成图片编码](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/image-packer-c)
* [使用Image\_NativeModule完成多图对象编码](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/image-packer-picture-c)

**起始版本：** 12

## 文件汇总

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [image\_common.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-common-h) | 声明图像接口使用的公共枚举和结构体。 |
| [image\_native.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-native-h) | 声明图像的剪裁矩形、大小和组件数据的接口函数。 |
| [image\_packer\_native.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-packer-native-h) | 图片编码API。 |
| [image\_receiver\_native.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-receiver-native-h) | 声明从native层获取图片数据的方法。 |
| [image\_source\_native.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-native-h) | 图片解码API。 |
| [picture\_native.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-picture-native-h) | 提供获取picture数据和信息的API。 |
| [pixelmap\_native.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h) | 访问Pixelmap的API。 |