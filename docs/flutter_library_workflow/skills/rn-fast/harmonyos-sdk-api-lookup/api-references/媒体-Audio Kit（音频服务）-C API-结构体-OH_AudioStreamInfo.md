

```
1. typedef struct OH_AudioStreamInfo {...} OH_AudioStreamInfo
```

## 概述

PhonePC/2in1TabletTVWearable

定义音频流信息，用于描述基本音频格式。

**起始版本：** 19

**相关模块：** [OHAudio](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudio)

**所在头文件：** [native\_audiostream\_base.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audiostream-base-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| int32\_t samplingRate | 音频流采样率。 |
| [OH\_AudioChannelLayout](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-channel-layout-h#oh_audiochannellayout) channelLayout | 音频流声道布局。 |
| [OH\_AudioStream\_EncodingType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audiostream-base-h#oh_audiostream_encodingtype) encodingType | 音频流编码类型。 |
| [OH\_AudioStream\_SampleFormat](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audiostream-base-h#oh_audiostream_sampleformat) sampleFormat | 音频流采样格式。 |