

```
1. typedef struct OH_AVScreenCaptureConfig {...} OH_AVScreenCaptureConfig
```

## 概述

PhonePC/2in1TabletTV

屏幕录制配置参数。

**起始版本：** 10

**相关模块：** [AVScreenCapture](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avscreencapture)

**所在头文件：** [native\_avscreen\_capture\_base.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avscreen-capture-base-h)

## 汇总

PhonePC/2in1TabletTV

### 成员变量

PhonePC/2in1TabletTV

展开

| 名称 | 描述 |
| --- | --- |
| [OH\_CaptureMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avscreen-capture-base-h#oh_capturemode) captureMode | 屏幕录制的模式。 |
| [OH\_DataType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avscreen-capture-base-h#oh_datatype) dataType | 屏幕录制流的数据格式。 |
| [OH\_AudioInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avscreencapture-oh-audioinfo) audioInfo | 音频录制参数。 |
| [OH\_VideoInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avscreencapture-oh-videoinfo) videoInfo | 视频录制参数。 |
| [OH\_RecorderInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avscreencapture-oh-recorderinfo) recorderInfo | 录制文件参数，当数据格式为OH\_CAPTURE\_FILE时必须设置。 |