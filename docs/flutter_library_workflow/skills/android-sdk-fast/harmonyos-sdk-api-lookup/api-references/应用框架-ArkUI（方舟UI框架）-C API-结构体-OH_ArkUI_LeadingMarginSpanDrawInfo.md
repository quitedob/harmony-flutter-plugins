

```
1. typedef struct OH_ArkUI_LeadingMarginSpanDrawInfo OH_ArkUI_LeadingMarginSpanDrawInfo
```

## 概述

PhonePC/2in1TabletTVWearable

定义段落缩进的自定义绘制信息。

可以通过[OH\_ArkUI\_LeadingMarginSpanDrawInfo\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_leadingmarginspandrawinfo_create)接口创建对应的段落缩进的自定义绘制信息对象。

可以通过[OH\_ArkUI\_LeadingMarginSpanDrawInfo\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_leadingmarginspandrawinfo_destroy)接口销毁段落缩进的自定义绘制信息对象。

对象用于在[OH\_ArkUI\_ParagraphStyle\_RegisterOnDrawLeadingMarginCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_paragraphstyle_registerondrawleadingmargincallback)注册的回调函数中，提供当前行的绘制上下文信息。

**起始版本：** 24

**相关模块：** [ArkUI\_NativeModule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule)

**所在头文件：** [styled\_string.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h)