

```
1. typedef struct OH_ArkUI_ParagraphStyle OH_ArkUI_ParagraphStyle
```

## 概述

PhonePC/2in1TabletTVWearable

定义段落样式。

可以通过[OH\_ArkUI\_ParagraphStyle\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_paragraphstyle_create)接口创建对应的段落样式对象。

可以通过[OH\_ArkUI\_ParagraphStyle\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_paragraphstyle_destroy)接口销毁段落样式对象。

对象创建后通过OH\_ArkUI\_ParagraphStyle\_SetXXX系列接口设置生效的具体样式，例如通过[OH\_ArkUI\_ParagraphStyle\_SetTextAlign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_paragraphstyle_settextalign)设置文本对齐方式。

**起始版本：** 24

**相关模块：** [ArkUI\_NativeModule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule)

**所在头文件：** [styled\_string.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h)