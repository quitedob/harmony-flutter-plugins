

```
1. struct OhosImageSourceInfo {...}
```

## 概述

PhonePC/2in1TabletTVWearable

定义图像源信息，由[OH\_ImageSource\_GetImageInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-mdk-h#oh_imagesource_getimageinfo)获取。

**起始版本：** 10

**相关模块：** [Image](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image)

**所在头文件：** [image\_source\_mdk.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-mdk-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| int32\_t pixelFormat | 图像源像素格式，由[OH\_ImageSource\_CreateFromUri](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-mdk-h#oh_imagesource_createfromuri)、[OH\_ImageSource\_CreateFromFd](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-mdk-h#oh_imagesource_createfromfd)和[OH\_ImageSource\_CreateFromData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-mdk-h#oh_imagesource_createfromdata)设置。 |
| int32\_t colorSpace | 图像源色彩空间。 |
| int32\_t alphaType | 图像源透明度类型。 |
| int32\_t density | 图像源密度，由[OH\_ImageSource\_CreateFromUri](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-mdk-h#oh_imagesource_createfromuri)、[OH\_ImageSource\_CreateFromFd](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-mdk-h#oh_imagesource_createfromfd)和[OH\_ImageSource\_CreateFromData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-mdk-h#oh_imagesource_createfromdata)设置。 |
| struct [OhosImageSize](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-ohosimagesize) size | 图像源像素宽高的大小。 |