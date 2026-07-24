## 概述

PhonePC/2in1TabletTVWearable

媒体会话定义，可用于设置元数据、播放状态信息等操作。

**引用文件：** <multimedia/av\_session/native\_avsession.h>

**库：** libohavsession.so

**系统能力：** SystemCapability.Multimedia.AVSession.Core

**起始版本：** 13

**相关模块：** [OHAVSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession)

## 汇总

PhonePC/2in1TabletTVWearable

### 结构体

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [OH\_AVSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession) | OH\_AVSession | 定义播控会话对象。播控会话对象可以使用[OH\_AVSession\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsession_create)方法创建。 |
| [OH\_AVCastController](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avcastcontroller) | OH\_AVCastController | 声明投播控制器对象。投播控制器对象可以使用[OH\_AVSession\_CreateAVCastController](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsession_createavcastcontroller)方法创建。 |

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [typedef AVSessionCallback\_Result (\*OH\_AVSessionCallback\_OnCommand)(OH\_AVSession\* session, AVSession\_ControlCommand command, void\* userData)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsessioncallback_oncommand) | OH\_AVSessionCallback\_OnCommand | 通用的执行播控命令的回调。 |
| [typedef AVSessionCallback\_Result (\*OH\_AVSessionCallback\_OnFastForward)(OH\_AVSession\* session, uint32\_t seekTime, void\* userData)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsessioncallback_onfastforward) | OH\_AVSessionCallback\_OnFastForward | 快进的回调。 |
| [typedef AVSessionCallback\_Result (\*OH\_AVSessionCallback\_OnRewind)(OH\_AVSession\* session, uint32\_t seekTime, void\* userData)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsessioncallback_onrewind) | OH\_AVSessionCallback\_OnRewind | 快退的回调。 |
| [typedef AVSessionCallback\_Result (\*OH\_AVSessionCallback\_OnSeek)(OH\_AVSession\* session, uint64\_t seekTime, void\* userData)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsessioncallback_onseek) | OH\_AVSessionCallback\_OnSeek | 进度调节的回调。 |
| [typedef AVSessionCallback\_Result (\*OH\_AVSessionCallback\_OnSetLoopMode)(OH\_AVSession\* session, AVSession\_LoopMode curLoopMode, void\* userData)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsessioncallback_onsetloopmode) | OH\_AVSessionCallback\_OnSetLoopMode | 设置循环模式的回调。 |
| [typedef AVSessionCallback\_Result (\*OH\_AVSessionCallback\_OnToggleFavorite)(OH\_AVSession\* session, const char\* assetId, void\* userData)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsessioncallback_ontogglefavorite) | OH\_AVSessionCallback\_OnToggleFavorite | 收藏的回调。 |
| [typedef AVSessionCallback\_Result (\*OH\_AVSessionCallback\_OutputDeviceChange)(OH\_AVSession\* session, AVSession\_ConnectionState state, AVSession\_OutputDeviceInfo\* outputDeviceInfo)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsessioncallback_outputdevicechange) | OH\_AVSessionCallback\_OutputDeviceChange | 设备变化的回调。 |
| [AVSession\_ErrCode OH\_AVSession\_Create(AVSession\_Type sessionType, const char\* sessionTag, const char\* bundleName, const char\* abilityName, OH\_AVSession\*\* avsession)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsession_create) | - | 创建会话对象。 |
| [AVSession\_ErrCode OH\_AVSession\_Destroy(OH\_AVSession\* avsession)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsession_destroy) | - | 销毁会话对象。 |
| [AVSession\_ErrCode OH\_AVSession\_Activate(OH\_AVSession\* avsession)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsession_activate) | - | 激活会话。 |
| [AVSession\_ErrCode OH\_AVSession\_Deactivate(OH\_AVSession\* avsession)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsession_deactivate) | - | 取消激活媒体会话。 |
| [AVSession\_ErrCode OH\_AVSession\_GetSessionType(OH\_AVSession\* avsession, AVSession\_Type\* sessionType)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsession_getsessiontype) | - | 获取会话类型。 |
| [AVSession\_ErrCode OH\_AVSession\_GetSessionId(OH\_AVSession\* avsession, const char\*\* sessionId)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsession_getsessionid) | - | 获取会话id。 |
| [AVSession\_ErrCode OH\_AVSession\_SetAVMetadata(OH\_AVSession\* avsession, OH\_AVMetadata\* avmetadata)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsession_setavmetadata) | - | 设置媒体元数据。 |
| [AVSession\_ErrCode OH\_AVSession\_SetPlaybackState(OH\_AVSession\* avsession, AVSession\_PlaybackState playbackState)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsession_setplaybackstate) | - | 设置播放状态。 |
| [AVSession\_ErrCode OH\_AVSession\_SetPlaybackPosition(OH\_AVSession\* avsession, AVSession\_PlaybackPosition\* playbackPosition)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsession_setplaybackposition) | - | 设置播放位置。 |
| [AVSession\_ErrCode OH\_AVSession\_SetFavorite(OH\_AVSession\* avsession, bool favorite)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsession_setfavorite) | - | 设置收藏状态。 |
| [AVSession\_ErrCode OH\_AVSession\_SetLoopMode(OH\_AVSession\* avsession, AVSession\_LoopMode loopMode)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsession_setloopmode) | - | 设置循环模式。 |
| [AVSession\_ErrCode OH\_AVSession\_SetRemoteCastEnabled(OH\_AVSession\* avsession, bool enabled)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsession_setremotecastenabled) | - | 请求使能远程投播。 |
| [AVSession\_ErrCode OH\_AVSession\_RegisterCommandCallback(OH\_AVSession\* avsession, AVSession\_ControlCommand command, OH\_AVSessionCallback\_OnCommand callback, void\* userData)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsession_registercommandcallback) | - | 注册通用播控的回调。 |
| [AVSession\_ErrCode OH\_AVSession\_UnregisterCommandCallback(OH\_AVSession\* avsession, AVSession\_ControlCommand command, OH\_AVSessionCallback\_OnCommand callback)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsession_unregistercommandcallback) | - | 取消注册通用播控的回调。 |
| [AVSession\_ErrCode OH\_AVSession\_RegisterForwardCallback(OH\_AVSession\* avsession, OH\_AVSessionCallback\_OnFastForward callback, void\* userData)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsession_registerforwardcallback) | - | 注册快进的回调。 |
| [AVSession\_ErrCode OH\_AVSession\_UnregisterForwardCallback(OH\_AVSession\* avsession, OH\_AVSessionCallback\_OnFastForward callback)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsession_unregisterforwardcallback) | - | 取消注册快进的回调。 |
| [AVSession\_ErrCode OH\_AVSession\_RegisterRewindCallback(OH\_AVSession\* avsession, OH\_AVSessionCallback\_OnRewind callback, void\* userData)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsession_registerrewindcallback) | - | 注册快退的回调。 |
| [AVSession\_ErrCode OH\_AVSession\_UnregisterRewindCallback(OH\_AVSession\* avsession, OH\_AVSessionCallback\_OnRewind callback)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsession_unregisterrewindcallback) | - | 取消注册快退的回调。 |
| [AVSession\_ErrCode OH\_AVSession\_RegisterSeekCallback(OH\_AVSession\* avsession, OH\_AVSessionCallback\_OnSeek callback, void\* userData)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsession_registerseekcallback) | - | 注册跳转的回调。 |
| [AVSession\_ErrCode OH\_AVSession\_UnregisterSeekCallback(OH\_AVSession\* avsession, OH\_AVSessionCallback\_OnSeek callback)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsession_unregisterseekcallback) | - | 取消注册跳转的回调。 |
| [AVSession\_ErrCode OH\_AVSession\_RegisterSetLoopModeCallback(OH\_AVSession\* avsession, OH\_AVSessionCallback\_OnSetLoopMode callback, void\* userData)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsession_registersetloopmodecallback) | - | 注册设置循环模式的回调。 |
| [AVSession\_ErrCode OH\_AVSession\_UnregisterSetLoopModeCallback(OH\_AVSession\* avsession, OH\_AVSessionCallback\_OnSetLoopMode callback)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsession_unregistersetloopmodecallback) | - | 取消注册设置循环模式的回调。 |
| [AVSession\_ErrCode OH\_AVSession\_RegisterToggleFavoriteCallback(OH\_AVSession\* avsession, OH\_AVSessionCallback\_OnToggleFavorite callback, void\* userData)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsession_registertogglefavoritecallback) | - | 设置收藏的回调。 |
| [AVSession\_ErrCode OH\_AVSession\_UnregisterToggleFavoriteCallback(OH\_AVSession\* avsession, OH\_AVSessionCallback\_OnToggleFavorite callback)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsession_unregistertogglefavoritecallback) | - | 取消设置收藏的回调。 |
| [AVSession\_ErrCode OH\_AVSession\_RegisterOutputDeviceChangeCallback(OH\_AVSession\* avsession, OH\_AVSessionCallback\_OutputDeviceChange callback)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsession_registeroutputdevicechangecallback) | - | 注册设备变化的回调。 |
| [AVSession\_ErrCode OH\_AVSession\_UnregisterOutputDeviceChangeCallback(OH\_AVSession\* avsession, OH\_AVSessionCallback\_OutputDeviceChange callback)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsession_unregisteroutputdevicechangecallback) | - | 取消注册设备变化的回调。 |
| [AVSession\_ErrCode OH\_AVSession\_AcquireSession(const char\* sessionTag, const char\* bundleName, const char\* abilityName, OH\_AVSession\*\* avsession)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsession_acquiresession) | - | 获取已经存在的媒体会话对象。当不再使用媒体会话对象时，调用[OH\_AVSession\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsession_destroy)进行释放。 |
| [AVSession\_ErrCode OH\_AVSession\_CreateAVCastController(OH\_AVSession\* avsession, OH\_AVCastController\*\* avcastcontroller)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsession_createavcastcontroller) | - | 创建投播控制器对象。当投播控制器对象不再使用时，调用[OH\_AVCastController\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avcastcontroller-h#oh_avcastcontroller_destroy)进行释放。 |
| [AVSession\_ErrCode OH\_AVSession\_StopCasting(OH\_AVSession\* avsession)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsession_stopcasting) | - | 停止当前投播并断开设备连接。 |
| [AVSession\_ErrCode OH\_AVSession\_AcquireOutputDevice(OH\_AVSession\* avsession, AVSession\_OutputDeviceInfo\*\* outputDeviceInfo)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsession_acquireoutputdevice) | - | 获取当前输出设备。 |
| [AVSession\_ErrCode OH\_AVSession\_ReleaseOutputDevice(OH\_AVSession\* avsession, AVSession\_OutputDeviceInfo \*outputDeviceInfo)](/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsession_releaseoutputdevice) | - | 释放输出设备对象。 |

## 函数说明

PhonePC/2in1TabletTVWearable

### OH\_AVSessionCallback\_OnCommand()

PhonePC/2in1TabletTVWearable



```
1. typedef AVSessionCallback_Result (*OH_AVSessionCallback_OnCommand)(OH_AVSession* session, AVSession_ControlCommand command, void* userData)
```

**描述**

通用的执行播控命令的回调。

**起始版本：** 13

### OH\_AVSessionCallback\_OnFastForward()

PhonePC/2in1TabletTVWearable



```
1. typedef AVSessionCallback_Result (*OH_AVSessionCallback_OnFastForward)(OH_AVSession* session, uint32_t seekTime, void* userData)
```

**描述**

快进的回调。

**起始版本：** 13

### OH\_AVSessionCallback\_OnRewind()

PhonePC/2in1TabletTVWearable



```
1. typedef AVSessionCallback_Result (*OH_AVSessionCallback_OnRewind)(OH_AVSession* session, uint32_t seekTime, void* userData)
```

**描述**

快退的回调。

**起始版本：** 13

### OH\_AVSessionCallback\_OnSeek()

PhonePC/2in1TabletTVWearable



```
1. typedef AVSessionCallback_Result (*OH_AVSessionCallback_OnSeek)(OH_AVSession* session, uint64_t seekTime, void* userData)
```

**描述**

进度调节的回调。

**起始版本：** 13

### OH\_AVSessionCallback\_OnSetLoopMode()

PhonePC/2in1TabletTVWearable



```
1. typedef AVSessionCallback_Result (*OH_AVSessionCallback_OnSetLoopMode)(OH_AVSession* session, AVSession_LoopMode curLoopMode, void* userData)
```

**描述**

设置循环模式的回调。

**起始版本：** 13

### OH\_AVSessionCallback\_OnToggleFavorite()

PhonePC/2in1TabletTVWearable



```
1. typedef AVSessionCallback_Result (*OH_AVSessionCallback_OnToggleFavorite)(OH_AVSession* session, const char* assetId, void* userData)
```

**描述**

收藏的回调。

**起始版本：** 13

### OH\_AVSessionCallback\_OutputDeviceChange()

PhonePC/2in1TabletTVWearable



```
1. typedef AVSessionCallback_Result (*OH_AVSessionCallback_OutputDeviceChange)(OH_AVSession* session, AVSession_ConnectionState state, AVSession_OutputDeviceInfo* outputDeviceInfo)
```

**描述**

设备变化的回调。

**起始版本：** 23

### OH\_AVSession\_Create()

PhonePC/2in1TabletTVWearable



```
1. AVSession_ErrCode OH_AVSession_Create(AVSession_Type sessionType, const char* sessionTag, const char* bundleName, const char* abilityName, OH_AVSession** avsession)
```

**描述**

创建会话对象。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [AVSession\_Type](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-base-h#avsession_type) sessionType | 会话类型[AVSession\_Type](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-base-h#avsession_type)。 |
| const char\* sessionTag | 会话标签。 |
| const char\* bundleName | 创建会话的包名。 |
| const char\* abilityName | 创建会话的ability名。 |
| [OH\_AVSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession)\*\* avsession | 返回的媒体会话对象。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AVSession\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-errors-h#avsession_errcode) | AV\_SESSION\_ERR\_SUCCESS：函数执行成功。  AV\_SESSION\_ERR\_SERVICE\_EXCEPTION：服务器内部错误。  AV\_SESSION\_ERR\_INVALID\_PARAMETER：  1. 参数sessionType无效。  2. 参数sessionTag为nullptr。  3. 参数bundleName为nullptr。  4. 参数abilityName为nullptr。  5. 参数avsession为nullptr。 |

### OH\_AVSession\_Destroy()

PhonePC/2in1TabletTVWearable



```
1. AVSession_ErrCode OH_AVSession_Destroy(OH_AVSession* avsession)
```

**描述**

销毁会话对象。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession)\* avsession | 媒体会话对象。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AVSession\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-errors-h#avsession_errcode) | AV\_SESSION\_ERR\_SUCCESS：函数执行成功。  AV\_SESSION\_ERR\_INVALID\_PARAMETER：参数avsession为nullptr。 |

### OH\_AVSession\_Activate()

PhonePC/2in1TabletTVWearable



```
1. AVSession_ErrCode OH_AVSession_Activate(OH_AVSession* avsession)
```

**描述**

激活会话。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession)\* avsession | 媒体会话对象。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AVSession\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-errors-h#avsession_errcode) | AV\_SESSION\_ERR\_SUCCESS：函数执行成功。  AV\_SESSION\_ERR\_SERVICE\_EXCEPTION：会话服务异常。  AV\_SESSION\_ERR\_INVALID\_PARAMETER：参数avsession为nullptr。 |

### OH\_AVSession\_Deactivate()

PhonePC/2in1TabletTVWearable



```
1. AVSession_ErrCode OH_AVSession_Deactivate(OH_AVSession* avsession)
```

**描述**

取消激活媒体会话。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession)\* avsession | 媒体会话对象。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AVSession\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-errors-h#avsession_errcode) | AV\_SESSION\_ERR\_SUCCESS：函数执行成功。  AV\_SESSION\_ERR\_SERVICE\_EXCEPTION：会话服务异常。  AV\_SESSION\_ERR\_INVALID\_PARAMETER：参数avsession为nullptr。 |

### OH\_AVSession\_GetSessionType()

PhonePC/2in1TabletTVWearable



```
1. AVSession_ErrCode OH_AVSession_GetSessionType(OH_AVSession* avsession, AVSession_Type* sessionType)
```

**描述**

获取会话类型。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession)\* avsession | 媒体会话对象。 |
| [AVSession\_Type](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-base-h#avsession_type)\* sessionType | 返回的会话类型。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AVSession\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-errors-h#avsession_errcode) | AV\_SESSION\_ERR\_SUCCESS：函数执行成功。  AV\_SESSION\_ERR\_SERVICE\_EXCEPTION：会话服务异常。  AV\_SESSION\_ERR\_INVALID\_PARAMETER：  1. 参数avsession为nullptr。  2. 参数sessionType为nullptr。 |

### OH\_AVSession\_GetSessionId()

PhonePC/2in1TabletTVWearable



```
1. AVSession_ErrCode OH_AVSession_GetSessionId(OH_AVSession* avsession, const char** sessionId)
```

**描述**

获取会话id。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession)\* avsession | 媒体会话对象。 |
| const char\*\* sessionId | 返回的会话类型id。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AVSession\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-errors-h#avsession_errcode) | AV\_SESSION\_ERR\_SUCCESS：函数执行成功。  AV\_SESSION\_ERR\_INVALID\_PARAMETER：  1. 参数avsession为nullptr。  2. 参数sessionId为nullptr。 |

### OH\_AVSession\_SetAVMetadata()

PhonePC/2in1TabletTVWearable



```
1. AVSession_ErrCode OH_AVSession_SetAVMetadata(OH_AVSession* avsession, OH_AVMetadata* avmetadata)
```

**描述**

设置媒体元数据。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession)\* avsession | 媒体会话对象。 |
| [OH\_AVMetadata](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avmetadatastruct)\* avmetadata | 设置媒体元数据信息。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AVSession\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-errors-h#avsession_errcode) | AV\_SESSION\_ERR\_SUCCESS：函数执行成功。  AV\_SESSION\_ERR\_SERVICE\_EXCEPTION：会话服务异常。  AV\_SESSION\_ERR\_INVALID\_PARAMETER：  1. 参数avsession为nullptr。  2. 参数avmetadata为nullptr。 |

### OH\_AVSession\_SetPlaybackState()

PhonePC/2in1TabletTVWearable



```
1. AVSession_ErrCode OH_AVSession_SetPlaybackState(OH_AVSession* avsession, AVSession_PlaybackState playbackState)
```

**描述**

设置播放状态。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession)\* avsession | 媒体会话对象。 |
| [AVSession\_PlaybackState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-base-h#avsession_playbackstate) playbackState | 播放状态。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AVSession\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-errors-h#avsession_errcode) | AV\_SESSION\_ERR\_SUCCESS：函数执行成功。  AV\_SESSION\_ERR\_SERVICE\_EXCEPTION：会话服务异常。  AV\_SESSION\_ERR\_INVALID\_PARAMETER：  1. 参数avsession为nullptr。  2. 参数playbackState是无效的。 |

### OH\_AVSession\_SetPlaybackPosition()

PhonePC/2in1TabletTVWearable



```
1. AVSession_ErrCode OH_AVSession_SetPlaybackPosition(OH_AVSession* avsession, AVSession_PlaybackPosition* playbackPosition)
```

**描述**

设置播放位置。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession)\* avsession | 媒体会话对象。 |
| [AVSession\_PlaybackPosition](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-avsession-playbackposition)\* playbackPosition | 播放位置对象。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AVSession\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-errors-h#avsession_errcode) | AV\_SESSION\_ERR\_SUCCESS：函数执行成功。  AV\_SESSION\_ERR\_SERVICE\_EXCEPTION：会话服务异常。  AV\_SESSION\_ERR\_INVALID\_PARAMETER：  1. 参数avsession为nullptr。  2. 参数playbackPosition为nullptr。 |

### OH\_AVSession\_SetFavorite()

PhonePC/2in1TabletTVWearable



```
1. AVSession_ErrCode OH_AVSession_SetFavorite(OH_AVSession* avsession, bool favorite)
```

**描述**

设置收藏状态。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession)\* avsession | 媒体会话对象。 |
| bool favorite | 收藏状态，true表示收藏，false表示取消收藏。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AVSession\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-errors-h#avsession_errcode) | AV\_SESSION\_ERR\_SUCCESS：函数执行成功。  AV\_SESSION\_ERR\_SERVICE\_EXCEPTION：会话服务异常。  AV\_SESSION\_ERR\_INVALID\_PARAMETER：参数avsession为nullptr。 |

### OH\_AVSession\_SetLoopMode()

PhonePC/2in1TabletTVWearable



```
1. AVSession_ErrCode OH_AVSession_SetLoopMode(OH_AVSession* avsession, AVSession_LoopMode loopMode)
```

**描述**

设置循环模式。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession)\* avsession | 媒体会话对象。 |
| [AVSession\_LoopMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-base-h#avsession_loopmode) loopMode | 循环模式。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AVSession\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-errors-h#avsession_errcode) | AV\_SESSION\_ERR\_SUCCESS：函数执行成功。  AV\_SESSION\_ERR\_SERVICE\_EXCEPTION：会话服务异常。  AV\_SESSION\_ERR\_INVALID\_PARAMETER：  1. 参数avsession为nullptr。  2. 参数loopMode是无效的。 |

### OH\_AVSession\_SetRemoteCastEnabled()

PhonePC/2in1TabletTVWearable



```
1. AVSession_ErrCode OH_AVSession_SetRemoteCastEnabled(OH_AVSession* avsession, bool enabled)
```

**描述**

请求使能远程投播。

**起始版本：** 23

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession)\* avsession | 媒体会话对象。 |
| bool enabled | 是否使能远程投播。true表示使能，false表示不使能。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AVSession\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-errors-h#avsession_errcode) | AV\_SESSION\_ERR\_SUCCESS：函数执行成功。  AV\_SESSION\_ERR\_SERVICE\_EXCEPTION：会话服务异常。  AV\_SESSION\_ERR\_CODE\_SESSION\_NOT\_EXIST：会话不存在。  AV\_SESSION\_ERR\_INVALID\_PARAMETER：参数avsession为nullptr。 |

### OH\_AVSession\_RegisterCommandCallback()

PhonePC/2in1TabletTVWearable



```
1. AVSession_ErrCode OH_AVSession_RegisterCommandCallback(OH_AVSession* avsession, AVSession_ControlCommand command, OH_AVSessionCallback_OnCommand callback, void* userData)
```

**描述**

注册通用播控的回调。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession)\* avsession | 媒体会话对象。 |
| [AVSession\_ControlCommand](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-base-h#avsession_controlcommand) command | 播控的控制命令。 |
| [OH\_AVSessionCallback\_OnCommand](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsessioncallback_oncommand) callback | 控制命令的回调。 |
| void\* userData | 指向通过回调函数传递的应用数据指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AVSession\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-errors-h#avsession_errcode) | AV\_SESSION\_ERR\_SUCCESS：函数执行成功。  AV\_SESSION\_ERR\_CODE\_COMMAND\_INVALID：控制命令无效。  AV\_SESSION\_ERR\_SERVICE\_EXCEPTION：会话服务异常。  AV\_SESSION\_ERR\_INVALID\_PARAMETER：  1. 参数avsession为nullptr。  2. 参数callback为nullptr。 |

### OH\_AVSession\_UnregisterCommandCallback()

PhonePC/2in1TabletTVWearable



```
1. AVSession_ErrCode OH_AVSession_UnregisterCommandCallback(OH_AVSession* avsession, AVSession_ControlCommand command, OH_AVSessionCallback_OnCommand callback)
```

**描述**

取消注册通用播控的回调。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession)\* avsession | 媒体会话对象。 |
| [AVSession\_ControlCommand](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-base-h#avsession_controlcommand) command | 播控的控制命令。 |
| [OH\_AVSessionCallback\_OnCommand](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsessioncallback_oncommand) callback | 控制命令的回调。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AVSession\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-errors-h#avsession_errcode) | AV\_SESSION\_ERR\_SUCCESS：函数执行成功。  AV\_SESSION\_ERR\_CODE\_COMMAND\_INVALID：控制命令无效。  AV\_SESSION\_ERR\_SERVICE\_EXCEPTION：会话服务异常。  AV\_SESSION\_ERR\_INVALID\_PARAMETER：  1. 参数avsession为nullptr。  2. 参数callback为nullptr。 |

### OH\_AVSession\_RegisterForwardCallback()

PhonePC/2in1TabletTVWearable



```
1. AVSession_ErrCode OH_AVSession_RegisterForwardCallback(OH_AVSession* avsession, OH_AVSessionCallback_OnFastForward callback, void* userData)
```

**描述**

注册快进的回调。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession)\* avsession | 媒体会话对象。 |
| [OH\_AVSessionCallback\_OnFastForward](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsessioncallback_onfastforward) callback | 快进命令的回调。 |
| void\* userData | 指向通过回调函数传递的应用数据指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AVSession\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-errors-h#avsession_errcode) | AV\_SESSION\_ERR\_SUCCESS：函数执行成功。  AV\_SESSION\_ERR\_SERVICE\_EXCEPTION：会话服务异常。  AV\_SESSION\_ERR\_INVALID\_PARAMETER：  1. 参数avsession为nullptr。  2. 参数callback为nullptr。 |

### OH\_AVSession\_UnregisterForwardCallback()

PhonePC/2in1TabletTVWearable



```
1. AVSession_ErrCode OH_AVSession_UnregisterForwardCallback(OH_AVSession* avsession, OH_AVSessionCallback_OnFastForward callback)
```

**描述**

取消注册快进的回调。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession)\* avsession | 媒体会话对象。 |
| [OH\_AVSessionCallback\_OnFastForward](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsessioncallback_onfastforward) callback | 快进命令的回调。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AVSession\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-errors-h#avsession_errcode) | AV\_SESSION\_ERR\_SUCCESS：函数执行成功。  AV\_SESSION\_ERR\_SERVICE\_EXCEPTION：会话服务异常。  AV\_SESSION\_ERR\_INVALID\_PARAMETER：  1. 参数avsession为nullptr。  2. 参数callback为nullptr。 |

### OH\_AVSession\_RegisterRewindCallback()

PhonePC/2in1TabletTVWearable



```
1. AVSession_ErrCode OH_AVSession_RegisterRewindCallback(OH_AVSession* avsession, OH_AVSessionCallback_OnRewind callback, void* userData)
```

**描述**

注册快退的回调。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession)\* avsession | 媒体会话对象。 |
| [OH\_AVSessionCallback\_OnRewind](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsessioncallback_onrewind) callback | 快退命令的回调。 |
| void\* userData | 指向通过回调函数传递的应用数据指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AVSession\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-errors-h#avsession_errcode) | AV\_SESSION\_ERR\_SUCCESS：函数执行成功。  AV\_SESSION\_ERR\_SERVICE\_EXCEPTION：会话服务异常。  AV\_SESSION\_ERR\_INVALID\_PARAMETER：  1. 参数avsession为nullptr。  2. 参数callback为nullptr。 |

### OH\_AVSession\_UnregisterRewindCallback()

PhonePC/2in1TabletTVWearable



```
1. AVSession_ErrCode OH_AVSession_UnregisterRewindCallback(OH_AVSession* avsession, OH_AVSessionCallback_OnRewind callback)
```

**描述**

取消注册快退的回调。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession)\* avsession | 媒体会话对象。 |
| [OH\_AVSessionCallback\_OnRewind](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsessioncallback_onrewind) callback | 快退命令的回调。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AVSession\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-errors-h#avsession_errcode) | AV\_SESSION\_ERR\_SUCCESS：函数执行成功。  AV\_SESSION\_ERR\_SERVICE\_EXCEPTION：会话服务异常。  AV\_SESSION\_ERR\_INVALID\_PARAMETER：  1. 参数avsession为nullptr。  2. 参数callback为nullptr。 |

### OH\_AVSession\_RegisterSeekCallback()

PhonePC/2in1TabletTVWearable



```
1. AVSession_ErrCode OH_AVSession_RegisterSeekCallback(OH_AVSession* avsession, OH_AVSessionCallback_OnSeek callback, void* userData)
```

**描述**

注册跳转的回调。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession)\* avsession | 媒体会话对象。 |
| [OH\_AVSessionCallback\_OnSeek](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsessioncallback_onseek) callback | 跳转命令的回调。 |
| void\* userData | 指向通过回调函数传递的应用数据指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AVSession\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-errors-h#avsession_errcode) | AV\_SESSION\_ERR\_SUCCESS：函数执行成功。  AV\_SESSION\_ERR\_SERVICE\_EXCEPTION：会话服务异常。  AV\_SESSION\_ERR\_INVALID\_PARAMETER：  1. 参数avsession为nullptr。  2. 参数callback为nullptr。 |

### OH\_AVSession\_UnregisterSeekCallback()

PhonePC/2in1TabletTVWearable



```
1. AVSession_ErrCode OH_AVSession_UnregisterSeekCallback(OH_AVSession* avsession, OH_AVSessionCallback_OnSeek callback)
```

**描述**

取消注册跳转的回调。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession)\* avsession | 媒体会话对象。 |
| [OH\_AVSessionCallback\_OnSeek](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsessioncallback_onseek) callback | 跳转命令的回调。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AVSession\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-errors-h#avsession_errcode) | AV\_SESSION\_ERR\_SUCCESS：函数执行成功。  AV\_SESSION\_ERR\_SERVICE\_EXCEPTION：会话服务异常。  AV\_SESSION\_ERR\_INVALID\_PARAMETER：  1. 参数avsession为nullptr。  2. 参数callback为nullptr。 |

### OH\_AVSession\_RegisterSetLoopModeCallback()

PhonePC/2in1TabletTVWearable



```
1. AVSession_ErrCode OH_AVSession_RegisterSetLoopModeCallback(OH_AVSession* avsession, OH_AVSessionCallback_OnSetLoopMode callback, void* userData)
```

**描述**

注册设置循环模式的回调。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession)\* avsession | 媒体会话对象。 |
| [OH\_AVSessionCallback\_OnSetLoopMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsessioncallback_onsetloopmode) callback | 设置循环模式命令的回调。 |
| void\* userData | 指向通过回调函数传递的应用数据指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AVSession\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-errors-h#avsession_errcode) | AV\_SESSION\_ERR\_SUCCESS：函数执行成功。  AV\_SESSION\_ERR\_SERVICE\_EXCEPTION：会话服务异常。  AV\_SESSION\_ERR\_INVALID\_PARAMETER：  1. 参数avsession为nullptr。  2. 参数callback为nullptr。 |

### OH\_AVSession\_UnregisterSetLoopModeCallback()

PhonePC/2in1TabletTVWearable



```
1. AVSession_ErrCode OH_AVSession_UnregisterSetLoopModeCallback(OH_AVSession* avsession, OH_AVSessionCallback_OnSetLoopMode callback)
```

**描述**

取消注册设置循环模式的回调。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession)\* avsession | 媒体会话对象。 |
| [OH\_AVSessionCallback\_OnSetLoopMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsessioncallback_onsetloopmode) callback | 设置循环模式命令的回调。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AVSession\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-errors-h#avsession_errcode) | AV\_SESSION\_ERR\_SUCCESS：函数执行成功。  AV\_SESSION\_ERR\_SERVICE\_EXCEPTION：会话服务异常。  AV\_SESSION\_ERR\_INVALID\_PARAMETER：  1. 参数avsession为nullptr。  2. 参数callback为nullptr。 |

### OH\_AVSession\_RegisterToggleFavoriteCallback()

PhonePC/2in1TabletTVWearable



```
1. AVSession_ErrCode OH_AVSession_RegisterToggleFavoriteCallback(OH_AVSession* avsession, OH_AVSessionCallback_OnToggleFavorite callback, void* userData)
```

**描述**

设置收藏的回调。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession)\* avsession | 媒体会话对象。 |
| [OH\_AVSessionCallback\_OnToggleFavorite](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsessioncallback_ontogglefavorite) callback | 设置收藏命令的回调。 |
| void\* userData | 指向通过回调函数传递的应用数据指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AVSession\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-errors-h#avsession_errcode) | AV\_SESSION\_ERR\_SUCCESS：函数执行成功。  AV\_SESSION\_ERR\_SERVICE\_EXCEPTION：会话服务异常。  AV\_SESSION\_ERR\_INVALID\_PARAMETER：  1. 参数avsession为nullptr。  2. 参数callback为nullptr。 |

### OH\_AVSession\_UnregisterToggleFavoriteCallback()

PhonePC/2in1TabletTVWearable



```
1. AVSession_ErrCode OH_AVSession_UnregisterToggleFavoriteCallback(OH_AVSession* avsession, OH_AVSessionCallback_OnToggleFavorite callback)
```

**描述**

取消设置收藏的回调。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession)\* avsession | 媒体会话对象。 |
| [OH\_AVSessionCallback\_OnToggleFavorite](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsessioncallback_ontogglefavorite) callback | 设置收藏命令的回调。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AVSession\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-errors-h#avsession_errcode) | AV\_SESSION\_ERR\_SUCCESS：函数执行成功。  AV\_SESSION\_ERR\_SERVICE\_EXCEPTION：会话服务异常。  AV\_SESSION\_ERR\_INVALID\_PARAMETER：  1. 参数avsession为nullptr。  2. 参数callback为nullptr。 |

### OH\_AVSession\_RegisterOutputDeviceChangeCallback()

PhonePC/2in1TabletTVWearable



```
1. AVSession_ErrCode OH_AVSession_RegisterOutputDeviceChangeCallback(OH_AVSession* avsession, OH_AVSessionCallback_OutputDeviceChange callback)
```

**描述**

注册设备变化的回调。

**起始版本：** 23

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession)\* avsession | 媒体会话对象。 |
| [OH\_AVSessionCallback\_OutputDeviceChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsessioncallback_outputdevicechange) callback | 设置设备变化的回调。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AVSession\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-errors-h#avsession_errcode) | AV\_SESSION\_ERR\_SUCCESS：函数执行成功。  AV\_SESSION\_ERR\_SERVICE\_EXCEPTION：会话服务异常。  AV\_SESSION\_ERR\_INVALID\_PARAMETER：  1. 参数avsession为nullptr。  2. 参数callback为nullptr。 |

### OH\_AVSession\_UnregisterOutputDeviceChangeCallback()

PhonePC/2in1TabletTVWearable



```
1. AVSession_ErrCode OH_AVSession_UnregisterOutputDeviceChangeCallback(OH_AVSession* avsession, OH_AVSessionCallback_OutputDeviceChange callback)
```

**描述**

取消注册设备变化的回调。

**起始版本：** 23

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession)\* avsession | 媒体会话对象。 |
| [OH\_AVSessionCallback\_OutputDeviceChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsessioncallback_outputdevicechange) callback | 设置设备变化的回调。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AVSession\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-errors-h#avsession_errcode) | AV\_SESSION\_ERR\_SUCCESS：函数执行成功。  AV\_SESSION\_ERR\_SERVICE\_EXCEPTION：会话服务异常。  AV\_SESSION\_ERR\_INVALID\_PARAMETER：  1. 参数avsession为nullptr。  2. 参数callback为nullptr。 |

### OH\_AVSession\_AcquireSession()

PhonePC/2in1TabletTVWearable



```
1. AVSession_ErrCode OH_AVSession_AcquireSession(const char* sessionTag, const char* bundleName, const char* abilityName, OH_AVSession** avsession)
```

**描述**

获取已经存在的媒体会话对象。当不再使用媒体会话对象时，调用[OH\_AVSession\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsession_destroy)进行释放。

**起始版本：** 23

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const char\* sessionTag | 应用设置的会话自定义标签。 |
| const char\* bundleName | 应用包名。 |
| const char\* abilityName | 应用的Ability组件名。 |
| [OH\_AVSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession)\*\* avsession | 用于接收OH\_AVSession的变量指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AVSession\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-errors-h#avsession_errcode) | AV\_SESSION\_ERR\_SUCCESS：函数执行成功。  AV\_SESSION\_ERR\_CODE\_SESSION\_NOT\_EXIST：会话不存在。  AV\_SESSION\_ERR\_INVALID\_PARAMETER：  1. 参数sessionTag无效。  2. 参数bundleName无效。  3. 参数abilityName无效。  4. 参数avsession为nullptr。 |

### OH\_AVSession\_CreateAVCastController()

PhonePC/2in1TabletTVWearable



```
1. AVSession_ErrCode OH_AVSession_CreateAVCastController(OH_AVSession* avsession, OH_AVCastController** avcastcontroller)
```

**描述**

创建投播控制器对象。当投播控制器对象不再使用时，调用[OH\_AVCastController\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avcastcontroller-h#oh_avcastcontroller_destroy)进行释放。

**起始版本：** 23

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession)\* avsession | 媒体会话对象。 |
| [OH\_AVCastController](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avcastcontroller)\*\* avcastcontroller | 指向用于接收投播控制器OH\_AVCastController的变量的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AVSession\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-errors-h#avsession_errcode) | AV\_SESSION\_ERR\_SUCCESS：函数执行成功。  AV\_SESSION\_ERR\_SERVICE\_EXCEPTION：会话服务异常。  AV\_SESSION\_ERR\_CODE\_SESSION\_NOT\_EXIST：会话不存在。  AV\_SESSION\_ERR\_INVALID\_PARAMETER：  1. 参数avsession为nullptr。  2. 参数avcastcontroller为nullptr。 |

### OH\_AVSession\_StopCasting()

PhonePC/2in1TabletTVWearable



```
1. AVSession_ErrCode OH_AVSession_StopCasting(OH_AVSession* avsession)
```

**描述**

停止当前投播并断开设备连接。

**起始版本：** 23

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession)\* avsession | 媒体会话对象。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AVSession\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-errors-h#avsession_errcode) | AV\_SESSION\_ERR\_SUCCESS：函数执行成功。  AV\_SESSION\_ERR\_SERVICE\_EXCEPTION：会话服务异常。  AV\_SESSION\_ERR\_CODE\_SESSION\_NOT\_EXIST：会话不存在。  AV\_SESSION\_ERR\_INVALID\_PARAMETER：参数avsession为nullptr。 |

### OH\_AVSession\_AcquireOutputDevice()

PhonePC/2in1TabletTVWearable



```
1. AVSession_ErrCode OH_AVSession_AcquireOutputDevice(OH_AVSession* avsession, AVSession_OutputDeviceInfo** outputDeviceInfo)
```

**描述**

获取当前输出设备。

**起始版本：** 23

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession)\* avsession | 媒体会话对象。 |
| [AVSession\_OutputDeviceInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-avsession-outputdeviceinfo)\*\* outputDeviceInfo | 指向用于接收输出设备信息AVSession\_OutputDeviceInfo的变量的指针。不可以单独释放outputDeviceInfo指针。当不再使用outputDeviceInfo时，调用[OH\_AVSession\_ReleaseOutputDevice](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-h#oh_avsession_releaseoutputdevice)进行释放。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AVSession\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-errors-h#avsession_errcode) | AV\_SESSION\_ERR\_SUCCESS：函数执行成功。  AV\_SESSION\_ERR\_SERVICE\_EXCEPTION：会话服务异常。  AV\_SESSION\_ERR\_CODE\_SESSION\_NOT\_EXIST：会话不存在。  AV\_SESSION\_ERR\_INVALID\_PARAMETER：  1. 参数avsession为nullptr。  2. 参数outputDeviceInfo为nullptr。 |

### OH\_AVSession\_ReleaseOutputDevice()

PhonePC/2in1TabletTVWearable



```
1. AVSession_ErrCode OH_AVSession_ReleaseOutputDevice(OH_AVSession* avsession, AVSession_OutputDeviceInfo *outputDeviceInfo)
```

**描述**

释放输出设备对象。

**起始版本：** 23

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-oh-avsession)\* avsession | 媒体会话对象。 |
| [AVSession\_OutputDeviceInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohavsession-avsession-outputdeviceinfo) \*outputDeviceInfo | 应当释放的输出设备。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AVSession\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avsession-errors-h#avsession_errcode) | AV\_SESSION\_ERR\_SUCCESS：函数执行成功。  AV\_SESSION\_ERR\_INVALID\_PARAMETER：  1. 参数avsession为nullptr。  2. 参数outputDeviceInfo为nullptr。 |