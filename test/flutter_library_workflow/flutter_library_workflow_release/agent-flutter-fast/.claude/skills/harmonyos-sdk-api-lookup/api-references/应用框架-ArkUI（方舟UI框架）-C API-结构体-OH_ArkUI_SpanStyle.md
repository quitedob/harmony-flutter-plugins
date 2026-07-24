

```
1. typedef struct OH_ArkUI_SpanStyle OH_ArkUI_SpanStyle
```

## 概述

PhonePC/2in1TabletTVWearable

定义属性字符串样式对象。

可以通过[OH\_ArkUI\_SpanStyle\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_create)接口创建对应的属性字符串样式对象。

可以通过[OH\_ArkUI\_SpanStyle\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_destroy)接口销毁属性字符串样式对象。

对象创建后通过[OH\_ArkUI\_SpanStyle\_SetStart](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_setstart)和[OH\_ArkUI\_SpanStyle\_SetLength](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_setlength)指定样式作用的范围。

对象创建后通过OH\_ArkUI\_SpanStyle\_SetXXXStyle系列接口设置生效的具体样式，例如通过[OH\_ArkUI\_SpanStyle\_SetTextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_settextstyle)设置字体样式效果。

**起始版本：** 24

**相关模块：** [ArkUI\_NativeModule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule)

**所在头文件：** [styled\_string.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h)