

```
1. typedef struct {...} OH_AudioSuite_PureVoiceChangeOption
```

## 概述

PhonePC/2in1Tablet

定义音频编创传统变声选项。

**起始版本：** 23

**相关模块：** [OHAudioSuite](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudiosuite)

**所在头文件：** [native\_audio\_suite\_base.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-suite-base-h)

## 汇总

PhonePC/2in1Tablet

### 成员变量

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| [OH\_AudioSuite\_PureVoiceChangeGenderOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-suite-base-h#oh_audiosuite_purevoicechangegenderoption) optionGender | 定义传统变声性别。 |
| [OH\_AudioSuite\_PureVoiceChangeType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-suite-base-h#oh_audiosuite_purevoicechangetype) optionType | 定义传统变声类型。 |
| float pitch | 定义传统变声音调。如果使用系统中的默认音调以获得最佳效果, 设置为[OH\_PURE\_VOICE\_DEFAULT\_PITCH](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-suite-base-h#宏定义)。  设置自定义音调的取值范围为[0.3f, 3.0f]。 |