

```
1. typedef struct OH_ArkUI_ImageAttachment OH_ArkUI_ImageAttachment
```

## 概述

PhonePC/2in1TabletTVWearable

定义图片样式对象。

可以通过[OH\_ArkUI\_ImageAttachment\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_create)接口创建对应的图片样式对象。

可以通过[OH\_ArkUI\_ImageAttachment\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_destroy)接口销毁图片样式对象。

对象创建后通过OH\_ArkUI\_ImageAttachment\_SetXXX系列接口设置生效的具体样式，例如通过[OH\_ArkUI\_ImageAttachment\_SetPixelMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_setpixelmap)设置图片源。

**起始版本：** 24

**相关模块：** [ArkUI\_NativeModule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule)

**所在头文件：** [styled\_string.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h)