

```
1. typedef struct {...} OH_AudioFormat
```

## 概述

PhonePC/2in1Tablet

定义音频编创的音频流信息，用于描述基本音频格式。

**起始版本：** 22

**相关模块：** [OHAudioSuite](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudiosuite)

**所在头文件：** [native\_audio\_suite\_base.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-suite-base-h)

## 汇总

PhonePC/2in1Tablet

### 成员变量

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| [OH\_Audio\_SampleRate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-suite-base-h#oh_audio_samplerate) samplingRate | 音频流采样率。 |
| OH\_AudioChannelLayout channelLayout | 音频流声道布局，当前只支持CH\_LAYOUT\_MONO 和 CH\_LAYOUT\_STEREO。 |
| uint32\_t channelCount | 音频流声道个数，当前只支持1声道和2声道。 |
| [OH\_Audio\_EncodingType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-suite-base-h#oh_audio_encodingtype) encodingType | 音频流编码类型。 |
| [OH\_Audio\_SampleFormat](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-suite-base-h#oh_audio_sampleformat) sampleFormat | 音频流采样格式。 |