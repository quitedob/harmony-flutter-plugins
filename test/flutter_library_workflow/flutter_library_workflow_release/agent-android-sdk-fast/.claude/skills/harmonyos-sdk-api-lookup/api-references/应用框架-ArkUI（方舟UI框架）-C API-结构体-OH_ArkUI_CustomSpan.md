

```
1. typedef struct OH_ArkUI_CustomSpan OH_ArkUI_CustomSpan
```

## 概述

PhonePC/2in1TabletTVWearable

定义自定义绘制Span。

可以通过[OH\_ArkUI\_CustomSpan\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_customspan_create)接口创建对应的自定义绘制Span对象。

可以通过[OH\_ArkUI\_CustomSpan\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_customspan_destroy)接口销毁自定义绘制Span对象。

对象创建后通过[OH\_ArkUI\_CustomSpan\_RegisterOnMeasureCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_customspan_registeronmeasurecallback)和[OH\_ArkUI\_CustomSpan\_RegisterOnDrawCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_customspan_registerondrawcallback)接口注册绘制回调函数。

**起始版本：** 24

**相关模块：** [ArkUI\_NativeModule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule)

**所在头文件：** [styled\_string.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h)