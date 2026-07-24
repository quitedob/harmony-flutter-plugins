

```
1. typedef struct OH_ArkUI_DecorationStyle OH_ArkUI_DecorationStyle
```

## 概述

PhonePC/2in1TabletTVWearable

定义文本装饰线样式。

可以通过[OH\_ArkUI\_DecorationStyle\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_decorationstyle_create)接口创建对应的文本装饰线样式对象。

可以通过[OH\_ArkUI\_DecorationStyle\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_decorationstyle_destroy)接口销毁文本装饰线样式对象。

对象创建后通过OH\_ArkUI\_DecorationStyle\_SetXXX系列接口设置生效的具体样式，例如通过[OH\_ArkUI\_DecorationStyle\_SetTextDecorationType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_decorationstyle_settextdecorationtype)设置装饰线类型。

**起始版本：** 24

**相关模块：** [ArkUI\_NativeModule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule)

**所在头文件：** [styled\_string.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h)