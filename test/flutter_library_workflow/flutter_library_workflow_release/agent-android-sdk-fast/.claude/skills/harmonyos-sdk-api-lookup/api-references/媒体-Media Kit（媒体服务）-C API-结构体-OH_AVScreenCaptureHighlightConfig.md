

```
1. typedef struct OH_AVScreenCaptureHighlightConfig {...} OH_AVScreenCaptureHighlightConfig
```

## 概述

PhonePC/2in1TabletTV

表示高亮边框的样式，包括高亮边框的模式、边框宽度和边框颜色。

**起始版本：** 22

**相关模块：** [AVScreenCapture](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avscreencapture)

**所在头文件：** [native\_avscreen\_capture\_base.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avscreen-capture-base-h)

## 汇总

PhonePC/2in1TabletTV

### 成员变量

PhonePC/2in1TabletTV

展开

| 名称 | 描述 |
| --- | --- |
| [OH\_ScreenCaptureHighlightMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avscreen-capture-base-h#oh_screencapturehighlightmode) mode | 高亮边框的模式，不设置默认为方形全包边框。 |
| uint32\_t lineThickness | 高亮边框的宽度，不设置默认不显示线宽，宽度有效值范围在1vp-8vp。 |
| uint32\_t lineColor | 高亮边框的颜色，不设置默认为黑色，颜色有效值为RGB（0-0xffffff）格式和非透明的ARGB（0xff000000-0xffffffff）格式。 |