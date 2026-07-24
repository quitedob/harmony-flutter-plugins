## 概述

PhonePC/2in1TabletTVWearable

声明音频公共基础数据结构。

定义音频接口的公共返回值的类型。

**引用文件：** <ohaudio/native\_audio\_common.h>

**库：** libohaudio.so

**系统能力：** SystemCapability.Multimedia.Audio.Core

**起始版本：** 12

**相关模块：** [OHAudio](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudio)

## 汇总

PhonePC/2in1TabletTVWearable

### 枚举

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [OH\_AudioCommon\_Result](/consumer/cn/doc/harmonyos-references/capi-native-audio-common-h#oh_audiocommon_result) | OH\_AudioCommon\_Result | 音频错误码。 |
| [OH\_AudioScene](/consumer/cn/doc/harmonyos-references/capi-native-audio-common-h#oh_audioscene) | OH\_AudioScene | 定义音频场景。 |
| [OH\_AudioRingerMode](/consumer/cn/doc/harmonyos-references/capi-native-audio-common-h#oh_audioringermode) | OH\_AudioRingerMode | 定义铃音模式。 |

## 枚举类型说明

PhonePC/2in1TabletTVWearable

### OH\_AudioCommon\_Result

PhonePC/2in1TabletTVWearable



```
1. enum OH_AudioCommon_Result
```

**描述**

音频错误码。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| AUDIOCOMMON\_RESULT\_SUCCESS = 0 | 操作成功。 |
| AUDIOCOMMON\_RESULT\_ERROR\_INVALID\_PARAM = 6800101 | 入参错误。 |
| AUDIOCOMMON\_RESULT\_ERROR\_NO\_MEMORY = 6800102 | 无内存。 |
| AUDIOCOMMON\_RESULT\_ERROR\_ILLEGAL\_STATE = 6800103 | 非法状态。 |
| AUDIOCOMMON\_RESULT\_ERROR\_UNSUPPORTED = 6800104 | 操作不支持。 |
| AUDIOCOMMON\_RESULT\_ERROR\_TIMEOUT = 6800105 | 操作超时。 |
| AUDIOCOMMON\_RESULT\_ERROR\_STREAM\_LIMIT = 6800201 | 达到系统可支持的最大数量。 |
| AUDIOCOMMON\_RESULT\_ERROR\_SYSTEM = 6800301 | 系统通用错误。 |

### OH\_AudioScene

PhonePC/2in1TabletTVWearable



```
1. enum OH_AudioScene
```

**描述**

定义音频场景。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| AUDIO\_SCENE\_DEFAULT = 0 | 默认音频场景。 |
| AUDIO\_SCENE\_RINGING = 1 | 响铃场景。 |
| AUDIO\_SCENE\_PHONE\_CALL = 2 | 电话场景。 |
| AUDIO\_SCENE\_VOICE\_CHAT = 3 | 语音聊天场景。 |

### OH\_AudioRingerMode

PhonePC/2in1TabletTVWearable



```
1. enum OH_AudioRingerMode
```

**描述**

定义铃音模式。

**设备行为差异：** 当该接口在无振动器件设备中被设置为振动模式时，将不会产生振动效果。

**起始版本：** 20

展开

| 枚举项 | 描述 |
| --- | --- |
| AUDIO\_RINGER\_MODE\_SILENT = 0 | 静音模式。 |
| AUDIO\_RINGER\_MODE\_VIBRATE = 1 | 振动模式。 |
| AUDIO\_RINGER\_MODE\_NORMAL = 2 | 响铃模式。 |