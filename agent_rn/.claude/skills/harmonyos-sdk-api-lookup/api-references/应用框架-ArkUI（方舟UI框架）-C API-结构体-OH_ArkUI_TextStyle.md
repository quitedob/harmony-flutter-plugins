

```
1. typedef struct OH_ArkUI_TextStyle OH_ArkUI_TextStyle
```

## 概述

PhonePC/2in1TabletTVWearable

定义文本字体样式。

可以通过[OH\_ArkUI\_TextStyle\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textstyle_create)接口创建对应的文本字体样式对象。

可以通过[OH\_ArkUI\_TextStyle\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textstyle_destroy)接口销毁文本字体样式对象。

对象创建后通过OH\_ArkUI\_TextStyle\_SetXXX系列接口设置生效的具体样式，例如通过[OH\_ArkUI\_TextStyle\_SetFontColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textstyle_setfontcolor)设置字体颜色。

**起始版本：** 24

**相关模块：** [ArkUI\_NativeModule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule)

**所在头文件：** [styled\_string.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h)