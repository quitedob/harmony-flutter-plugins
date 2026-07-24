

```
1. typedef struct OH_AVScreenCaptureCallback {...} OH_AVScreenCaptureCallback
```

## 概述

PhonePC/2in1TabletTV

OH\_AVScreenCapture中包含所有异步回调函数指针的集合。将该结构体的实例注册到OH\_AVScreenCapture实例中，以便处理回调上报的信息，从而保证OH\_AVScreenCapture的正常运行。

从API version 12开始，推荐使用接口[OH\_AVScreenCapture\_OnError](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avscreen-capture-base-h#oh_avscreencapture_onerror)、[OH\_AVScreenCapture\_OnBufferAvailable](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avscreen-capture-base-h#oh_avscreencapture_onbufferavailable)替代。

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
| [OH\_AVScreenCaptureOnError](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avscreen-capture-base-h#oh_avscreencaptureonerror) onError | 监控录屏调用操作错误。  从API version 12开始，推荐使用接口[OH\_AVScreenCapture\_OnError](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avscreen-capture-base-h#oh_avscreencapture_onerror)替代。 |
| [OH\_AVScreenCaptureOnAudioBufferAvailable](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avscreen-capture-base-h#oh_avscreencaptureonaudiobufferavailable) onAudioBufferAvailable | 监控音频码流是否有数据产生。  从API version 12开始，推荐使用接口[OH\_AVScreenCapture\_OnBufferAvailable](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avscreen-capture-base-h#oh_avscreencapture_onbufferavailable)替代。 |
| [OH\_AVScreenCaptureOnVideoBufferAvailable](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avscreen-capture-base-h#oh_avscreencaptureonvideobufferavailable) onVideoBufferAvailable | 监控视频码流是否有数据产生。  从API version 12开始，推荐使用接口[OH\_AVScreenCapture\_OnBufferAvailable](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avscreen-capture-base-h#oh_avscreencapture_onbufferavailable)替代。 |