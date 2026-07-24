

```
1. typedef struct OH_AudioBuffer {...} OH_AudioBuffer
```

## 概述

PhonePC/2in1TabletTV

定义了音频数据的大小、类型、时间戳等配置信息。

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
| uint8\_t\* buf | 音频buffer内存。 |
| int32\_t size | 音频buffer内存大小。 |
| int64\_t timestamp | 音频buffer时间戳。单位为纳秒（ns）。 |
| [OH\_AudioCaptureSourceType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avscreen-capture-base-h#oh_audiocapturesourcetype) type | 音频录制源类型。 |