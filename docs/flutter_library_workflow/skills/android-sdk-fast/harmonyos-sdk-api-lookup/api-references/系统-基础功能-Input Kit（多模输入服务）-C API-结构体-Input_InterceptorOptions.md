

```
1. typedef struct Input_InterceptorOptions Input_InterceptorOptions
```

## 概述

PhonePC/2in1TabletTVWearable

事件拦截选项。

**起始版本：** 12

**相关模块：** [input](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-input)

**所在头文件：** [oh\_input\_manager.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-input-manager-h)

**相关接口：**

展开

| 名称 | 描述 |
| --- | --- |
| [OH\_Input\_AddKeyEventInterceptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-input-manager-h#oh_input_addkeyeventinterceptor) | 添加按键事件的拦截，重复添加只有第一次生效。仅在应用获焦时拦截按键事件。 |
| [OH\_Input\_RemoveKeyEventInterceptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-input-manager-h#oh_input_removekeyeventinterceptor) | 移除按键事件拦截。 |
| [OH\_Input\_AddInputEventInterceptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-input-manager-h#oh_input_addinputeventinterceptor) | 添加输入事件拦截，包括鼠标、触屏和轴事件，重复添加只有第一次生效。仅命中应用窗口时拦截输入事件。 |
| [OH\_Input\_RemoveInputEventInterceptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-input-manager-h#oh_input_removeinputeventinterceptor) | 移除输入事件拦截，包括鼠标、触屏和轴事件。 |