

```
1. typedef struct OH_AudioCaptureInfo {...} OH_AudioCaptureInfo
```

## 概述

PhonePC/2in1TabletTV

音频采样信息。

当audioSampleRate和audioChannels同时为0时，忽略该类型音频相关参数，不录制该类型音频数据。

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
| int32\_t audioSampleRate | 音频采样率，支持列表请查阅Audio Kit的[AudioSamplingRate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-e#audiosamplingrate8)。单位为赫兹（Hz）。 |
| int32\_t audioChannels | 音频声道数。 |
| [OH\_AudioCaptureSourceType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avscreen-capture-base-h#oh_audiocapturesourcetype) audioSource | 音频源。 |