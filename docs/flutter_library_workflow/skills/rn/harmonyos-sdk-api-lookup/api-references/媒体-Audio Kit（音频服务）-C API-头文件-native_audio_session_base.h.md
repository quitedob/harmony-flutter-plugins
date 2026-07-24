## 概述

PhonePC/2in1TabletTVWearable

声明音频会话基础数据结构。

**引用文件：** <ohaudio/native\_audio\_session\_base.h>

**库：** libohaudio.so

**系统能力：** SystemCapability.Multimedia.Audio.Core

**起始版本：** 24

**相关模块：** [OHAudio](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudio)

## 汇总

PhonePC/2in1TabletTVWearable

### 结构体

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [OH\_AudioSession\_Strategy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudio-oh-audiosession-strategy) | OH\_AudioSession\_Strategy | 音频会话策略。 |

### 枚举

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [OH\_AudioSession\_BehaviorFlags](/consumer/cn/doc/harmonyos-references/capi-native-audio-session-base-h#oh_audiosession_behaviorflags) | OH\_AudioSession\_BehaviorFlags | 音频会话行为标志。 |
| [OH\_AudioSession\_ConcurrencyMode](/consumer/cn/doc/harmonyos-references/capi-native-audio-session-base-h#oh_audiosession_concurrencymode) | OH\_AudioSession\_ConcurrencyMode | 音频并发模式。 |

## 枚举类型说明

PhonePC/2in1TabletTVWearable

### OH\_AudioSession\_BehaviorFlags

PhonePC/2in1TabletTVWearable



```
1. enum OH_AudioSession_BehaviorFlags
```

**描述**

音频会话行为标志。

**起始版本：** 24

展开

| 枚举项 | 描述 |
| --- | --- |
| DEFAULT\_BEHAVIOR = 0x00000000 | 默认行为，用于清除会话行为标记。  **起始版本：** 24 |
| MUTE\_WHEN\_INTERRUPTED = 0x00000002 | 当音频流被打断时，使用静音替代。通过接口[OH\_AudioSessionManager\_SetBehavior](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-session-manager-h#oh_audiosessionmanager_setbehavior)设置该行为的同时，也需要调用接口[OH\_AudioSessionManager\_SetScene](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-session-manager-h#oh_audiosessionmanager_setscene)使其生效。当播放被静音时，应用将收到[OH\_AudioStream\_Usage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audiostream-base-h#oh_audiostream_usage).AUDIOSTREAM\_INTERRUPT\_HINT\_MUTE通知，并且在恢复时会收到[OH\_AudioStream\_Usage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audiostream-base-h#oh_audiostream_usage).AUDIOSTREAM\_INTERRUPT\_HINT\_UNMUTE通知。  **起始版本：** 24 |

### OH\_AudioSession\_ConcurrencyMode

PhonePC/2in1TabletTVWearable



```
1. enum OH_AudioSession_ConcurrencyMode
```

**描述**

音频并发模式。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| CONCURRENCY\_DEFAULT = 0 | 默认使用系统策略。 |
| CONCURRENCY\_MIX\_WITH\_OTHERS = 1 | 当前应用与其他应用混音播放。 |
| CONCURRENCY\_DUCK\_OTHERS = 2 | 当前应用播放时会压低其他正在播放的应用音量。 |
| CONCURRENCY\_PAUSE\_OTHERS = 3 | 当前应用播放时会暂停其他正在播放的应用。 |