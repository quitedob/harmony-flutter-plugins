

```
1. typedef struct OH_ArkUI_GestureStyle OH_ArkUI_GestureStyle
```

## 概述

PhonePC/2in1TabletTVWearable

定义事件手势样式。

可以通过[OH\_ArkUI\_GestureStyle\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_gesturestyle_create)接口创建对应的事件手势样式对象。

可以通过[OH\_ArkUI\_GestureStyle\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_gesturestyle_destroy)接口销毁事件手势样式对象。

对象创建后通过OH\_ArkUI\_GestureStyle\_RegisterOnXXXCallback系列接口注册具体的事件回调，例如通过[OH\_ArkUI\_GestureStyle\_RegisterOnClickCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_gesturestyle_registeronclickcallback)注册点击事件回调。

**起始版本：** 24

**相关模块：** [ArkUI\_NativeModule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule)

**所在头文件：** [styled\_string.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h)