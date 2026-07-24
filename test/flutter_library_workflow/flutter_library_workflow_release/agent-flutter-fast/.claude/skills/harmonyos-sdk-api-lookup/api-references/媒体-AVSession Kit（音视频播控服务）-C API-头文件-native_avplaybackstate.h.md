## 概述

PhonePC/2in1TabletTVWearable

提供播放状态的定义。

**引用文件：** <multimedia/av\_session/native\_avplaybackstate.h>

**库：** libohavsession.so

**系统能力：** SystemCapability.Multimedia.AVSession.Core

**起始版本：** 23

**相关模块：** [OHAVSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession)

## 汇总

PhonePC/2in1TabletTVWearable

### 结构体

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [AVSession\_PlaybackPosition](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-avsession-playbackposition) | AVSession\_PlaybackPosition | 播放位置的定义。 |
| [OH\_AVSession\_AVPlaybackState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession-avplaybackstate) | OH\_AVSession\_AVPlaybackState | 播控播放状态的对象。 |

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [AVSession\_ErrCode OH\_AVSession\_GetPlaybackState(OH\_AVSession\_AVPlaybackState\* playbackState, AVSession\_PlaybackState\* state)](/consumer/cn/doc/harmonyos-references/capi-native-avplaybackstate-h#oh_avsession_getplaybackstate) | 获取播放的状态。 |
| [AVSession\_ErrCode OH\_AVSession\_GetPlaybackPosition(OH\_AVSession\_AVPlaybackState\* playbackState, AVSession\_PlaybackPosition\* position)](/consumer/cn/doc/harmonyos-references/capi-native-avplaybackstate-h#oh_avsession_getplaybackposition) | 获取播放状态的位置。 |
| [AVSession\_ErrCode OH\_AVSession\_GetPlaybackSpeed(OH\_AVSession\_AVPlaybackState\* playbackState, int32\_t\* speed)](/consumer/cn/doc/harmonyos-references/capi-native-avplaybackstate-h#oh_avsession_getplaybackspeed) | 获取播放状态的倍速。 |
| [AVSession\_ErrCode OH\_AVSession\_GetPlaybackVolume(OH\_AVSession\_AVPlaybackState\* playbackState, int32\_t\* volume)](/consumer/cn/doc/harmonyos-references/capi-native-avplaybackstate-h#oh_avsession_getplaybackvolume) | 获取播放状态的音量值。 |

## 函数说明

PhonePC/2in1TabletTVWearable

### OH\_AVSession\_GetPlaybackState()

PhonePC/2in1TabletTVWearable



```
1. AVSession_ErrCode OH_AVSession_GetPlaybackState(OH_AVSession_AVPlaybackState* playbackState, AVSession_PlaybackState* state)
```

**描述**

获取播放的状态。

**起始版本：** 23

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVSession\_AVPlaybackState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession-avplaybackstate)\* playbackState | 表示播放状态实例对象。 |
| [AVSession\_PlaybackState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-base-h#avsession_playbackstate)\* state | 指针变量将返回播放状态值。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AVSession\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-errors-h#avsession_errcode) | AV\_SESSION\_ERR\_SUCCESS：函数执行成功。  AV\_SESSION\_ERR\_INVALID\_PARAMETER 参数验证失败原因如下：  1. 参数playbackState为nullptr。  2. 参数state为nullptr。 |

### OH\_AVSession\_GetPlaybackPosition()

PhonePC/2in1TabletTVWearable



```
1. AVSession_ErrCode OH_AVSession_GetPlaybackPosition(OH_AVSession_AVPlaybackState* playbackState, AVSession_PlaybackPosition* position)
```

**描述**

获取播放状态的位置。

**起始版本：** 23

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVSession\_AVPlaybackState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession-avplaybackstate)\* playbackState | 表示播放状态实例对象。 |
| [AVSession\_PlaybackPosition](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-avsession-playbackposition)\* position | 指针变量将返回播放位置值。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AVSession\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-errors-h#avsession_errcode) | AV\_SESSION\_ERR\_SUCCESS：函数执行成功。  AV\_SESSION\_ERR\_INVALID\_PARAMETER 参数验证失败原因如下：  1. 参数playbackState为nullptr。  2. 参数position为nullptr。 |

### OH\_AVSession\_GetPlaybackSpeed()

PhonePC/2in1TabletTVWearable



```
1. AVSession_ErrCode OH_AVSession_GetPlaybackSpeed(OH_AVSession_AVPlaybackState* playbackState, int32_t* speed)
```

**描述**

获取播放状态的倍速。

**起始版本：** 23

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVSession\_AVPlaybackState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession-avplaybackstate)\* playbackState | 表示播放状态实例对象。 |
| int32\_t\* speed | 指针变量将返回播放倍速值。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AVSession\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-errors-h#avsession_errcode) | AV\_SESSION\_ERR\_SUCCESS：函数执行成功。  AV\_SESSION\_ERR\_INVALID\_PARAMETER 参数验证失败原因如下：  1. 参数playbackState为nullptr。  2. 参数speed为nullptr。 |

### OH\_AVSession\_GetPlaybackVolume()

PhonePC/2in1TabletTVWearable



```
1. AVSession_ErrCode OH_AVSession_GetPlaybackVolume(OH_AVSession_AVPlaybackState* playbackState, int32_t* volume)
```

**描述**

获取播放状态的音量值。

**起始版本：** 23

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVSession\_AVPlaybackState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession-avplaybackstate)\* playbackState | 表示播放状态实例对象。 |
| int32\_t\* volume | 指针变量将返回播放音量值。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AVSession\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-errors-h#avsession_errcode) | AV\_SESSION\_ERR\_SUCCESS：函数执行成功。  AV\_SESSION\_ERR\_INVALID\_PARAMETER 参数验证失败原因如下：  1. 参数playbackState为nullptr。  2. 参数volume为nullptr。 |