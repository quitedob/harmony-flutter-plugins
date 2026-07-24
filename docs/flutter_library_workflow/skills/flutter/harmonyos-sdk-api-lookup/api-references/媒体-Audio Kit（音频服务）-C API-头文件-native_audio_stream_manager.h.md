## 概述

PhonePC/2in1TabletTVWearable

声明音频流管理器相关的接口。

该文件接口用于创建AudioStreamManager以及音频流设置和管理。

**引用文件：** <ohaudio/native\_audio\_stream\_manager.h>

**库：** libohaudio.so

**系统能力：** SystemCapability.Multimedia.Audio.Core

**起始版本：** 19

**相关模块：** [OHAudio](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudio)

## 汇总

PhonePC/2in1TabletTVWearable

### 结构体

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [OH\_AudioStreamManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudio-oh-audiostreammanager) | OH\_AudioStreamManager | 声明音频流管理器。用于管理音频流相关功能。 |

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [OH\_AudioCommon\_Result OH\_AudioManager\_GetAudioStreamManager(OH\_AudioStreamManager \*\*streamManager)](/consumer/cn/doc/harmonyos-references/capi-native-audio-stream-manager-h#oh_audiomanager_getaudiostreammanager) | 获取音频流管理器句柄。 |
| [OH\_AudioCommon\_Result OH\_AudioStreamManager\_GetDirectPlaybackSupport(OH\_AudioStreamManager \*audioStreamManager, OH\_AudioStreamInfo \*streamInfo, OH\_AudioStream\_Usage usage, OH\_AudioStream\_DirectPlaybackMode \*directPlaybackMode)](/consumer/cn/doc/harmonyos-references/capi-native-audio-stream-manager-h#oh_audiostreammanager_getdirectplaybacksupport) | 获取当前音频流支持的direct通路播放模式。 |
| [OH\_AudioCommon\_Result OH\_AudioStreamManager\_IsAcousticEchoCancelerSupported(OH\_AudioStreamManager \*streamManager, OH\_AudioStream\_SourceType sourceType, bool \*supported)](/consumer/cn/doc/harmonyos-references/capi-native-audio-stream-manager-h#oh_audiostreammanager_isacousticechocancelersupported) | 查询指定的录音流类型使用场景是否支持回声消除。 |
| [bool OH\_AudioStreamManager\_IsFastPlaybackSupported(OH\_AudioStreamManager \*streamManager, OH\_AudioStreamInfo \*streamInfo, OH\_AudioStream\_Usage usage)](/consumer/cn/doc/harmonyos-references/capi-native-audio-stream-manager-h#oh_audiostreammanager_isfastplaybacksupported) | 查询当前设备在特定音频流信息和使用场景下是否支持低时延播放。 |
| [bool OH\_AudioStreamManager\_IsFastRecordingSupported(OH\_AudioStreamManager \*streamManager, OH\_AudioStreamInfo \*streamInfo, OH\_AudioStream\_SourceType source)](/consumer/cn/doc/harmonyos-references/capi-native-audio-stream-manager-h#oh_audiostreammanager_isfastrecordingsupported) | 查询当前设备在特定音频流信息和使用场景下是否支持低时延录制。 |
| [bool OH\_AudioStreamManager\_IsIntelligentNoiseReductionEnabledForCurrentDevice(OH\_AudioStreamManager \*streamManager, OH\_AudioStream\_SourceType source)](/consumer/cn/doc/harmonyos-references/capi-native-audio-stream-manager-h#oh_audiostreammanager_isintelligentnoisereductionenabledforcurrentdevice) | 查询指定录音流类型的智能降噪开关是否已开启。 |

## 函数说明

PhonePC/2in1TabletTVWearable

### OH\_AudioManager\_GetAudioStreamManager()

PhonePC/2in1TabletTVWearable



```
1. OH_AudioCommon_Result OH_AudioManager_GetAudioStreamManager(OH_AudioStreamManager **streamManager)
```

**描述**

获取音频流管理器句柄。

**起始版本：** 19

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AudioStreamManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudio-oh-audiostreammanager) \*\*streamManager | 音频流管理器句柄。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AudioCommon\_Result](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-common-h#oh_audiocommon_result) | AUDIOCOMMON\_RESULT\_SUCCESS = 0：函数执行成功。  AUDIOCOMMON\_RESULT\_ERROR\_SYSTEM = 6800301：系统状态错误。 |

### OH\_AudioStreamManager\_GetDirectPlaybackSupport()

PhonePC/2in1TabletTVWearable



```
1. OH_AudioCommon_Result OH_AudioStreamManager_GetDirectPlaybackSupport(OH_AudioStreamManager *audioStreamManager, OH_AudioStreamInfo *streamInfo, OH_AudioStream_Usage usage, OH_AudioStream_DirectPlaybackMode *directPlaybackMode)
```

**描述**

获取当前音频流支持的direct通路播放模式。

**起始版本：** 19

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AudioStreamManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudio-oh-audiostreammanager) \*audioStreamManager | 音频流管理器句柄。通过 [OH\_AudioManager\_GetAudioStreamManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-stream-manager-h#oh_audiomanager_getaudiostreammanager)获取句柄。 |
| [OH\_AudioStreamInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudio-oh-audiostreaminfo) \*streamInfo | 音频流信息指针。 |
| [OH\_AudioStream\_Usage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audiostream-base-h#oh_audiostream_usage) usage | 音频流使用场景。 |
| [OH\_AudioStream\_DirectPlaybackMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audiostream-base-h#oh_audiostream_directplaybackmode) \*directPlaybackMode | 指向 [OH\_AudioStream\_DirectPlaybackMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audiostream-base-h#oh_audiostream_directplaybackmode)，用于获取当前音频流支持的direct通路播放模式。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AudioCommon\_Result](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-common-h#oh_audiocommon_result) | AUDIOCOMMON\_RESULT\_SUCCESS = 0：函数执行成功。  AUDIOCOMMON\_RESULT\_ERROR\_INVALID\_PARAM = 6800101：  1. 参数audioStreamManager为nullptr；  2. 参数streamInfo为nullptr；  3. 参数usage无效；  4. 参数directPlaybackMode为nullptr。 |

### OH\_AudioStreamManager\_IsAcousticEchoCancelerSupported()

PhonePC/2in1TabletTVWearable



```
1. OH_AudioCommon_Result OH_AudioStreamManager_IsAcousticEchoCancelerSupported(OH_AudioStreamManager *streamManager, OH_AudioStream_SourceType sourceType, bool *supported)
```

**描述**

查询指定的录音流类型使用场景是否支持回声消除。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AudioStreamManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudio-oh-audiostreammanager) \*streamManager | 音频流管理器句柄。通过 [OH\_AudioManager\_GetAudioStreamManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-stream-manager-h#oh_audiomanager_getaudiostreammanager)获取句柄。 |
| [OH\_AudioStream\_SourceType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audiostream-base-h#oh_audiostream_sourcetype) sourceType | 指向[OH\_AudioStream\_SourceType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audiostream-base-h#oh_audiostream_sourcetype)，用于设置音频输入流的使用场景。 |
| bool \*supported | 查询指定的source type是否支持回声消除的结果。true表示支持回声消除，false表示不支持回声消除。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AudioCommon\_Result](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-common-h#oh_audiocommon_result) | AUDIOCOMMON\_RESULT\_SUCCESS = 0 ：函数执行成功。  AUDIOCOMMON\_RESULT\_ERROR\_INVALID\_PARAM = 6800101 ：  1.参数audioStreamManager为nullptr；  2.参数sourceType无效；  3.参数supported为nullptr。 |

### OH\_AudioStreamManager\_IsFastPlaybackSupported()

PhonePC/2in1TabletTVWearable



```
1. bool OH_AudioStreamManager_IsFastPlaybackSupported(OH_AudioStreamManager *streamManager, OH_AudioStreamInfo *streamInfo, OH_AudioStream_Usage usage)
```

**描述**

查询当前设备在特定音频流信息和使用场景下是否支持低时延播放。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AudioStreamManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudio-oh-audiostreammanager) \*streamManager | 音频流管理器句柄。通过[OH\_AudioManager\_GetAudioStreamManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-stream-manager-h#oh_audiomanager_getaudiostreammanager)获取句柄。 |
| [OH\_AudioStreamInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudio-oh-audiostreaminfo) \*streamInfo | 音频流信息指针。 |
| [OH\_AudioStream\_Usage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audiostream-base-h#oh_audiostream_usage) usage | 音频流使用场景。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| bool | 返回true时表示支持低时延播放，返回false时表示不支持。 |

### OH\_AudioStreamManager\_IsFastRecordingSupported()

PhonePC/2in1TabletTVWearable



```
1. bool OH_AudioStreamManager_IsFastRecordingSupported(OH_AudioStreamManager *streamManager, OH_AudioStreamInfo *streamInfo, OH_AudioStream_SourceType source)
```

**描述**

查询当前设备在特定音频流信息和使用场景下是否支持低时延录制。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AudioStreamManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudio-oh-audiostreammanager) \*streamManager | 音频流管理器句柄。通过[OH\_AudioManager\_GetAudioStreamManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-stream-manager-h#oh_audiomanager_getaudiostreammanager)获取句柄。 |
| [OH\_AudioStreamInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudio-oh-audiostreaminfo) \*streamInfo | 音频流信息指针。 |
| [OH\_AudioStream\_SourceType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audiostream-base-h#oh_audiostream_sourcetype) source | 音频流使用场景。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| bool | 返回true时表示支持低时延录制，返回false时表示不支持。 |

### OH\_AudioStreamManager\_IsIntelligentNoiseReductionEnabledForCurrentDevice()

PhonePC/2in1TabletTVWearable



```
1. bool OH_AudioStreamManager_IsIntelligentNoiseReductionEnabledForCurrentDevice(OH_AudioStreamManager *streamManager, OH_AudioStream_SourceType source)
```

**描述**

查询指定录音流类型的智能降噪开关是否已开启。

**起始版本：** 21

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AudioStreamManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudio-oh-audiostreammanager) \*streamManager | 音频流管理器句柄。通过[OH\_AudioManager\_GetAudioStreamManager](/consumer/cn/doc/harmonyos-references/capi-native-audio-stream-manager-h#oh_audiomanager_getaudiostreammanager)获取句柄。 |
| [OH\_AudioStream\_SourceType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audiostream-base-h#oh_audiostream_sourcetype) source | 根据音频设备和管道类型选择结果得出的音频流使用场景。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| bool | 返回true时表示智能降噪开关已打开，返回false时表示开关已关闭。 |