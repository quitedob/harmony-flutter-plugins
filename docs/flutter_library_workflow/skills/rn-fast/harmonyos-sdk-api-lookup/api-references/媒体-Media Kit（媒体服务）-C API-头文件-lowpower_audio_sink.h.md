## 概述

PhonePC/2in1Tablet

定义LowPowerAudioSink接口。使用LowPowerAudioSink提供的Native API进行音频通路的低功耗播放。

**引用文件：** <multimedia/player\_framework/lowpower\_audio\_sink.h>

**库：** liblowpower\_avsink.so

**系统能力：** SystemCapability.Multimedia.Media.LowPowerAVSink

**起始版本：** 20

**相关模块：** [LowPowerAudioSink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpoweraudiosink)

## 汇总

PhonePC/2in1Tablet

### 函数

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| [OH\_LowPowerAudioSink\* OH\_LowPowerAudioSink\_CreateByMime(const char\* mime)](/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_createbymime) | 创建LowPowerAudioSink。 |
| [OH\_AVErrCode OH\_LowPowerAudioSink\_Configure(OH\_LowPowerAudioSink\* sink, const OH\_AVFormat\* format)](/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_configure) | 配置LowPowerAudioSink，需要在[OH\_LowPowerAudioSink\_Prepare](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_prepare)前完成。 |
| [OH\_AVErrCode OH\_LowPowerAudioSink\_SetParameter(OH\_LowPowerAudioSink\* sink, const OH\_AVFormat\* format)](/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_setparameter) | 为LowPowerAudioSink设置参数，支持[OH\_LowPowerAudioSink\_Prepare](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_prepare)后动态设置。 |
| [OH\_AVErrCode OH\_LowPowerAudioSink\_GetParameter(OH\_LowPowerAudioSink\* sink, OH\_AVFormat\* format)](/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_getparameter) | 获取LowPowerAudioSink的相关参数。 |
| [OH\_AVErrCode OH\_LowPowerAudioSink\_Prepare(OH\_LowPowerAudioSink\* sink)](/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_prepare) | 准备LowPowerAudioSink的解码、渲染资源，在[OH\_LowPowerAudioSink\_Configure](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_configure)后调用。  调用此接口前必须调用LowPowerVideoSink的[OH\_LowPowerVideoSink\_SetSyncAudioSink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpower-video-sink-h#oh_lowpowervideosink_setsyncaudiosink)方法。 |
| [OH\_AVErrCode OH\_LowPowerAudioSink\_Start(OH\_LowPowerAudioSink\* sink)](/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_start) | 启动低功耗音频接收器，此接口必须在[OH\_LowPowerAudioSink\_Prepare](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_prepare)成功后调用。  启动成功后，LowPowerAudioSink将开始上报[OH\_LowPowerAudioSink\_OnDataNeeded](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-base-h#oh_lowpoweraudiosink_ondataneeded)事件。 |
| [OH\_AVErrCode OH\_LowPowerAudioSink\_Pause(OH\_LowPowerAudioSink\* sink)](/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_pause) | 暂停LowPowerAudioSink，在[OH\_LowPowerAudioSink\_Start](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_start)或[OH\_LowPowerAudioSink\_Resume](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_resume)后调用。  暂停成功后，LowPowerAudioSink将暂停[OH\_LowPowerAudioSink\_OnDataNeeded](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-base-h#oh_lowpoweraudiosink_ondataneeded)事件的上报。 |
| [OH\_AVErrCode OH\_LowPowerAudioSink\_Resume(OH\_LowPowerAudioSink\* sink)](/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_resume) | 恢复LowPowerAudioSink，在[OH\_LowPowerAudioSink\_Pause](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_pause)后调用。  恢复成功后，LowPowerAudioSink将恢复[OH\_LowPowerAudioSink\_OnDataNeeded](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-base-h#oh_lowpoweraudiosink_ondataneeded)事件的上报。 |
| [OH\_AVErrCode OH\_LowPowerAudioSink\_Flush(OH\_LowPowerAudioSink\* sink)](/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_flush) | 清除LowPowerAudioSink中所有解码器和渲染缓存的输入输出数据。  此接口不建议在[OH\_LowPowerAudioSink\_Start](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_start)或[OH\_LowPowerAudioSink\_Resume](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_resume)之后调用。  需要注意的是，如果编解码器之前已输入数据，则需要重新输入编解码器数据。 |
| [OH\_AVErrCode OH\_LowPowerAudioSink\_Stop(OH\_LowPowerAudioSink\* sink)](/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_stop) | 停止LowPowerAudioSink。 |
| [OH\_AVErrCode OH\_LowPowerAudioSink\_Reset(OH\_LowPowerAudioSink\* sink)](/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_reset) | 重置LowPowerAudioSink。  如果要重新使用该实例，需要调用[OH\_LowPowerAudioSink\_Configure](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_configure)完成配置。 |
| [OH\_AVErrCode OH\_LowPowerAudioSink\_Destroy(OH\_LowPowerAudioSink\* sink)](/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_destroy) | 清理LowPowerAudioSink内部资源，销毁LowPowerAudioSink实例。不能重复销毁。 |
| [OH\_AVErrCode OH\_LowPowerAudioSink\_SetVolume(OH\_LowPowerAudioSink\* sink, const float volume)](/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_setvolume) | 为LowPowerAudioSink设置渲染音量。 |
| [OH\_AVErrCode OH\_LowPowerAudioSink\_SetLoudnessGain(OH\_LowPowerAudioSink\* sink, float loudnessGain)](/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_setloudnessgain) | 为LowPowerAudioSink设置播放响度。 |
| [OH\_AVErrCode OH\_LowPowerAudioSink\_SetPlaybackSpeed(OH\_LowPowerAudioSink\* sink, const float speed)](/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_setplaybackspeed) | 为LowPowerAudioSink设置音频渲染倍速。 |
| [OH\_AVErrCode OH\_LowPowerAudioSink\_ReturnSamples(OH\_LowPowerAudioSink\* sink, OH\_AVSamplesBuffer\* samples)](/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_returnsamples) | 给LowPowerAudioSink输入buffer。 |
| [OH\_AVErrCode OH\_LowPowerAudioSink\_RegisterCallback(OH\_LowPowerAudioSink\* sink, OH\_LowPowerAudioSinkCallback\* callback)](/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_registercallback) | 为LowPowerAudioSink注册回调。 |
| [OH\_LowPowerAudioSinkCallback\* OH\_LowPowerAudioSinkCallback\_Create(void)](/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosinkcallback_create) | 创建OH\_LowPowerAudioSinkCallback实例。 |
| [OH\_AVErrCode OH\_LowPowerAudioSinkCallback\_Destroy(OH\_LowPowerAudioSinkCallback\* callback)](/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosinkcallback_destroy) | 销毁OH\_LowPowerAudioSinkCallback实例。 |
| [OH\_AVErrCode OH\_LowPowerAudioSinkCallback\_SetPositionUpdateListener(OH\_LowPowerAudioSinkCallback\* callback, OH\_LowPowerAudioSink\_OnPositionUpdated onPositionUpdated, void\* userData)](/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosinkcallback_setpositionupdatelistener) | 为LowPowerAudioSinkCallback设置进度更新监听。 |
| [OH\_AVErrCode OH\_LowPowerAudioSinkCallback\_SetDataNeededListener(OH\_LowPowerAudioSinkCallback\* callback, OH\_LowPowerAudioSink\_OnDataNeeded onDataNeeded, void\* userData)](/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosinkcallback_setdataneededlistener) | 为LowPowerAudioSinkCallback设置需要数据监听。 |
| [OH\_AVErrCode OH\_LowPowerAudioSinkCallback\_SetErrorListener(OH\_LowPowerAudioSinkCallback\* callback, OH\_LowPowerAudioSink\_OnError onError, void\* userData)](/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosinkcallback_seterrorlistener) | 为LowPowerAudioSinkCallback设置错误监听。 |
| [OH\_AVErrCode OH\_LowPowerAudioSinkCallback\_SetInterruptListener(OH\_LowPowerAudioSinkCallback\* callback, OH\_LowPowerAudioSink\_OnInterrupted onInterrupted, void\* userData)](/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosinkcallback_setinterruptlistener) | 为LowPowerAudioSinkCallback设置音频焦点打断监听。 |
| [OH\_AVErrCode OH\_LowPowerAudioSinkCallback\_SetDeviceChangeListener(OH\_LowPowerAudioSinkCallback\* callback, OH\_LowPowerAudioSink\_OnDeviceChanged onDeviceChanged, void\* userData)](/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosinkcallback_setdevicechangelistener) | 为LowPowerAudioSinkCallback设置音频设备切换监听。 |
| [OH\_AVErrCode OH\_LowPowerAudioSinkCallback\_SetEosListener(OH\_LowPowerAudioSinkCallback callback, OH\_LowPowerAudioSink\_OnEos onEos, void userData)](/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosinkcallback_seteoslistener) | 为LowPowerAudioSinkCallback设置播放完成监听。 |

## 函数说明

PhonePC/2in1Tablet

### OH\_LowPowerAudioSink\_CreateByMime()

PhonePC/2in1Tablet



```
1. OH_LowPowerAudioSink* OH_LowPowerAudioSink_CreateByMime(const char* mime)
```

**描述**

创建LowPowerAudioSink。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const char\* mime | 音频解码器MIME类型，取值范围请参考[AVCODEC\_MIME\_TYPE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avcodec-base-h#变量)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_LowPowerAudioSink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpoweraudiosink-oh-lowpoweraudiosink)\* | 如果创建成功返回指向OH\_LowPowerAudioSink实例的指针，否则返回空指针。 |

### OH\_LowPowerAudioSink\_Configure()

PhonePC/2in1Tablet



```
1. OH_AVErrCode OH_LowPowerAudioSink_Configure(OH_LowPowerAudioSink* sink, const OH_AVFormat* format)
```

**描述**

配置LowPowerAudioSink，需要在[OH\_LowPowerAudioSink\_Prepare](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_prepare)前完成。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_LowPowerAudioSink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpoweraudiosink-oh-lowpoweraudiosink)\* sink | 指向OH\_LowPowerAudioSink实例的指针。 |
| const [OH\_AVFormat](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-core-oh-avformat)\* format | 指向OH\_AVFormat的指针，用于配置LowPowerAudioSink的参数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AVErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-averrors-h#oh_averrcode) | AV\_ERR\_OK：执行成功。  AV\_ERR\_INVALID\_VAL：参数为nullptr或参数非法。  AV\_ERR\_UNSUPPORT：不支持的格式。  AV\_ERR\_SERVICE\_DIED：媒体服务端已销毁。  AV\_ERR\_OPERATE\_NOT\_PERMIT：操作不支持。 |

### OH\_LowPowerAudioSink\_SetParameter()

PhonePC/2in1Tablet



```
1. OH_AVErrCode OH_LowPowerAudioSink_SetParameter(OH_LowPowerAudioSink* sink, const OH_AVFormat* format)
```

**描述**

为LowPowerAudioSink设置参数，支持[OH\_LowPowerAudioSink\_Prepare](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_prepare)后动态设置。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_LowPowerAudioSink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpoweraudiosink-oh-lowpoweraudiosink)\* sink | 指向OH\_LowPowerAudioSink实例的指针。 |
| const [OH\_AVFormat](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-core-oh-avformat)\* format | 指向OH\_AVFormat的指针，为LowPowerAudioSink设置的参数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AVErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-averrors-h#oh_averrcode) | AV\_ERR\_OK：执行成功。  AV\_ERR\_INVALID\_VAL：参数为nullptr或参数非法。  AV\_ERR\_UNSUPPORT：不支持的格式。  AV\_ERR\_SERVICE\_DIED：媒体服务端已销毁。  AV\_ERR\_OPERATE\_NOT\_PERMIT：操作不支持。 |

### OH\_LowPowerAudioSink\_GetParameter()

PhonePC/2in1Tablet



```
1. OH_AVErrCode OH_LowPowerAudioSink_GetParameter(OH_LowPowerAudioSink* sink, OH_AVFormat* format)
```

**描述**

获取LowPowerAudioSink的相关参数。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_LowPowerAudioSink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpoweraudiosink-oh-lowpoweraudiosink)\* sink | 指向LowPowerAudioSink实例的指针。 |
| [OH\_AVFormat](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-core-oh-avformat)\* format | 指向OH\_AVFormat实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AVErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-averrors-h#oh_averrcode) | AV\_ERR\_OK：执行成功。  AV\_ERR\_INVALID\_VAL：参数为nullptr或参数非法。  AV\_ERR\_OPERATE\_NOT\_PERMIT：操作不支持。 |

### OH\_LowPowerAudioSink\_Prepare()

PhonePC/2in1Tablet



```
1. OH_AVErrCode OH_LowPowerAudioSink_Prepare(OH_LowPowerAudioSink* sink)
```

**描述**

准备LowPowerAudioSink的解码、渲染资源，在[OH\_LowPowerAudioSink\_Configure](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_configure)后调用。

调用此接口前必须调用LowPowerVideoSink的[OH\_LowPowerVideoSink\_SetSyncAudioSink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpower-video-sink-h#oh_lowpowervideosink_setsyncaudiosink)方法。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_LowPowerAudioSink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpoweraudiosink-oh-lowpoweraudiosink)\* sink | 指向OH\_LowPowerAudioSink实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AVErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-averrors-h#oh_averrcode) | AV\_ERR\_OK：执行成功。  AV\_ERR\_INVALID\_VAL：参数为nullptr或参数非法。  AV\_ERR\_UNSUPPORT：不支持的格式。  AV\_ERR\_SERVICE\_DIED：媒体服务端已销毁。  AV\_ERR\_OPERATE\_NOT\_PERMIT：操作不支持。 |

### OH\_LowPowerAudioSink\_Start()

PhonePC/2in1Tablet



```
1. OH_AVErrCode OH_LowPowerAudioSink_Start(OH_LowPowerAudioSink* sink)
```

**描述**

启动低功耗音频接收器，此接口必须在[OH\_LowPowerAudioSink\_Prepare](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_prepare)成功后调用。

启动成功后，LowPowerAudioSink将开始上报[OH\_LowPowerAudioSink\_OnDataNeeded](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-base-h#oh_lowpoweraudiosink_ondataneeded)事件。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_LowPowerAudioSink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpoweraudiosink-oh-lowpoweraudiosink)\* sink | 指向OH\_LowPowerAudioSink实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AVErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-averrors-h#oh_averrcode) | AV\_ERR\_OK：执行成功。  AV\_ERR\_INVALID\_VAL：参数为nullptr或参数非法。  AV\_ERR\_UNSUPPORT：不支持的格式。  AV\_ERR\_SERVICE\_DIED：媒体服务端已销毁。  AV\_ERR\_OPERATE\_NOT\_PERMIT：操作不支持。 |

### OH\_LowPowerAudioSink\_Pause()

PhonePC/2in1Tablet



```
1. OH_AVErrCode OH_LowPowerAudioSink_Pause(OH_LowPowerAudioSink* sink)
```

**描述**

暂停LowPowerAudioSink，在[OH\_LowPowerAudioSink\_Start](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_start)或[OH\_LowPowerAudioSink\_Resume](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_resume)后调用。

暂停成功后，LowPowerAudioSink将暂停[OH\_LowPowerAudioSink\_OnDataNeeded](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-base-h#oh_lowpoweraudiosink_ondataneeded)事件的上报。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_LowPowerAudioSink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpoweraudiosink-oh-lowpoweraudiosink)\* sink | 指向OH\_LowPowerAudioSink实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AVErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-averrors-h#oh_averrcode) | AV\_ERR\_OK：执行成功。  AV\_ERR\_INVALID\_VAL：参数为nullptr或参数非法。  AV\_ERR\_SERVICE\_DIED：媒体服务端已销毁。  AV\_ERR\_OPERATE\_NOT\_PERMIT：操作不支持。 |

### OH\_LowPowerAudioSink\_Resume()

PhonePC/2in1Tablet



```
1. OH_AVErrCode OH_LowPowerAudioSink_Resume(OH_LowPowerAudioSink* sink)
```

**描述**

恢复LowPowerAudioSink，在[OH\_LowPowerAudioSink\_Pause](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_pause)后调用。

恢复成功后，LowPowerAudioSink将恢复[OH\_LowPowerAudioSink\_OnDataNeeded](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-base-h#oh_lowpoweraudiosink_ondataneeded)事件的上报。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_LowPowerAudioSink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpoweraudiosink-oh-lowpoweraudiosink)\* sink | 指向OH\_LowPowerAudioSink实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AVErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-averrors-h#oh_averrcode) | AV\_ERR\_OK：执行成功。  AV\_ERR\_INVALID\_VAL：参数为nullptr或参数非法。  AV\_ERR\_SERVICE\_DIED：媒体服务端已销毁。  AV\_ERR\_OPERATE\_NOT\_PERMIT：操作不支持。 |

### OH\_LowPowerAudioSink\_Flush()

PhonePC/2in1Tablet



```
1. OH_AVErrCode OH_LowPowerAudioSink_Flush(OH_LowPowerAudioSink* sink)
```

**描述**

清除LowPowerAudioSink中所有解码器和渲染缓存的输入输出数据。

此接口不建议在[OH\_LowPowerAudioSink\_Start](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_start)或[OH\_LowPowerAudioSink\_Resume](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_resume)之后调用。

需要注意的是，如果编解码器之前已输入数据，则需要重新输入编解码器数据。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_LowPowerAudioSink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpoweraudiosink-oh-lowpoweraudiosink)\* sink | 指向OH\_LowPowerAudioSink实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AVErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-averrors-h#oh_averrcode) | AV\_ERR\_OK：执行成功。  AV\_ERR\_INVALID\_VAL：参数为nullptr或参数非法。  AV\_ERR\_SERVICE\_DIED：媒体服务端已销毁。  AV\_ERR\_OPERATE\_NOT\_PERMIT：操作不支持。 |

### OH\_LowPowerAudioSink\_Stop()

PhonePC/2in1Tablet



```
1. OH_AVErrCode OH_LowPowerAudioSink_Stop(OH_LowPowerAudioSink* sink)
```

**描述**

停止LowPowerAudioSink。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_LowPowerAudioSink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpoweraudiosink-oh-lowpoweraudiosink)\* sink | 指向OH\_LowPowerAudioSink实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AVErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-averrors-h#oh_averrcode) | AV\_ERR\_OK：执行成功。  AV\_ERR\_INVALID\_VAL：参数为nullptr或参数非法。  AV\_ERR\_SERVICE\_DIED：媒体服务端已销毁。  AV\_ERR\_OPERATE\_NOT\_PERMIT：操作不支持。 |

### OH\_LowPowerAudioSink\_Reset()

PhonePC/2in1Tablet



```
1. OH_AVErrCode OH_LowPowerAudioSink_Reset(OH_LowPowerAudioSink* sink)
```

**描述**

重置LowPowerAudioSink。

如果要重新使用该实例，需要调用[OH\_LowPowerAudioSink\_Configure](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-h#oh_lowpoweraudiosink_configure)完成配置。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_LowPowerAudioSink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpoweraudiosink-oh-lowpoweraudiosink)\* sink | 指向OH\_LowPowerAudioSink实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AVErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-averrors-h#oh_averrcode) | AV\_ERR\_OK：执行成功。  AV\_ERR\_INVALID\_VAL：参数为nullptr或参数非法。  AV\_ERR\_SERVICE\_DIED：媒体服务端已销毁。  AV\_ERR\_OPERATE\_NOT\_PERMIT：操作不支持。 |

### OH\_LowPowerAudioSink\_Destroy()

PhonePC/2in1Tablet



```
1. OH_AVErrCode OH_LowPowerAudioSink_Destroy(OH_LowPowerAudioSink* sink)
```

**描述**

清理LowPowerAudioSink内部资源，销毁LowPowerAudioSink实例。不能重复销毁。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_LowPowerAudioSink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpoweraudiosink-oh-lowpoweraudiosink)\* sink | 指向OH\_LowPowerAudioSink实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AVErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-averrors-h#oh_averrcode) | AV\_ERR\_OK：执行成功。  AV\_ERR\_INVALID\_VAL：参数为nullptr或参数非法。  AV\_ERR\_SERVICE\_DIED：媒体服务端已销毁。  AV\_ERR\_OPERATE\_NOT\_PERMIT：操作不支持。 |

### OH\_LowPowerAudioSink\_SetVolume()

PhonePC/2in1Tablet



```
1. OH_AVErrCode OH_LowPowerAudioSink_SetVolume(OH_LowPowerAudioSink* sink, const float volume)
```

**描述**

为LowPowerAudioSink设置渲染音量。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_LowPowerAudioSink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpoweraudiosink-oh-lowpoweraudiosink)\* sink | 指向OH\_LowPowerAudioSink实例的指针。 |
| const float volume | 音量值，取值范围[0.0, 1.0]。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AVErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-averrors-h#oh_averrcode) | AV\_ERR\_OK：执行成功。  AV\_ERR\_INVALID\_VAL：参数为nullptr或参数非法。  AV\_ERR\_SERVICE\_DIED：媒体服务端已销毁。  AV\_ERR\_OPERATE\_NOT\_PERMIT：操作不支持。 |

### OH\_LowPowerAudioSink\_SetLoudnessGain()

PhonePC/2in1Tablet



```
1. OH_AVErrCode OH_LowPowerAudioSink_SetLoudnessGain(OH_LowPowerAudioSink* sink, float loudnessGain)
```

**描述**

为LowPowerAudioSink设置播放响度。

**起始版本：** 21

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_LowPowerAudioSink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpoweraudiosink-oh-lowpoweraudiosink)\* sink | 指向OH\_LowPowerAudioSink实例的指针。 |
| float loudnessGain | 响度值，取值范围[-90.0, 24.0]。默认值为0.0dB。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AVErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-averrors-h#oh_averrcode) | AV\_ERR\_OK：执行成功。  AV\_ERR\_INVALID\_VAL：参数为nullptr或参数非法。  AV\_ERR\_SERVICE\_DIED：媒体服务端已销毁。 |

### OH\_LowPowerAudioSink\_SetPlaybackSpeed()

PhonePC/2in1Tablet



```
1. OH_AVErrCode OH_LowPowerAudioSink_SetPlaybackSpeed(OH_LowPowerAudioSink* sink, const float speed)
```

**描述**

为LowPowerAudioSink设置音频渲染倍速。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_LowPowerAudioSink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpoweraudiosink-oh-lowpoweraudiosink)\* sink | 指向OH\_LowPowerAudioSink实例的指针。 |
| const float speed | 音频渲染倍速值，取值范围[0.25, 4.0]。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AVErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-averrors-h#oh_averrcode) | AV\_ERR\_OK：执行成功。  AV\_ERR\_INVALID\_VAL：参数为nullptr或参数非法。  AV\_ERR\_SERVICE\_DIED：媒体服务端已销毁。  AV\_ERR\_OPERATE\_NOT\_PERMIT：操作不支持。 |

### OH\_LowPowerAudioSink\_ReturnSamples()

PhonePC/2in1Tablet



```
1. OH_AVErrCode OH_LowPowerAudioSink_ReturnSamples(OH_LowPowerAudioSink* sink, OH_AVSamplesBuffer* samples)
```

**描述**

给LowPowerAudioSink输入buffer。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_LowPowerAudioSink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpoweraudiosink-oh-lowpoweraudiosink)\* sink | 指向OH\_LowPowerAudioSink实例的指针。 |
| [OH\_AVSamplesBuffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avsinkbase-oh-avsamplesbuffer)\* samples | 需要送OH\_AVSamplesBuffer消费的OH\_AVSamplesBuffer实例，支持聚包输入。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AVErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-averrors-h#oh_averrcode) | AV\_ERR\_OK：执行成功。  AV\_ERR\_INVALID\_VAL：参数为nullptr或参数非法。  AV\_ERR\_SERVICE\_DIED：媒体服务端已销毁。  AV\_ERR\_OPERATE\_NOT\_PERMIT：操作不支持。 |

### OH\_LowPowerAudioSink\_RegisterCallback()

PhonePC/2in1Tablet



```
1. OH_AVErrCode OH_LowPowerAudioSink_RegisterCallback(OH_LowPowerAudioSink* sink, OH_LowPowerAudioSinkCallback* callback)
```

**描述**

为LowPowerAudioSink注册回调。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_LowPowerAudioSink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpoweraudiosink-oh-lowpoweraudiosink)\* sink | 指向OH\_LowPowerAudioSink实例的指针。 |
| [OH\_LowPowerAudioSinkCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-lowpoweraudiosink-oh-lowpoweraudiosinkcallback)\* callback | 指向OH\_LowPowerAudioSinkCallback实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AVErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-averrors-h#oh_averrcode) | AV\_ERR\_OK：执行成功。  AV\_ERR\_INVALID\_VAL：参数为nullptr或参数非法。  AV\_ERR\_SERVICE\_DIED：媒体服务端已销毁。  AV\_ERR\_OPERATE\_NOT\_PERMIT：操作不支持。 |

### OH\_LowPowerAudioSinkCallback\_Create()

PhonePC/2in1Tablet



```
1. OH_LowPowerAudioSinkCallback* OH_LowPowerAudioSinkCallback_Create(void)
```

**描述**

创建OH\_LowPowerAudioSinkCallback实例。

**起始版本：** 20

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_LowPowerAudioSinkCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-lowpoweraudiosink-oh-lowpoweraudiosinkcallback)\* | 返回指向OH\_LowPowerAudioSinkCallback实例的指针。如果内存不足，则返回nullptr。 |

### OH\_LowPowerAudioSinkCallback\_Destroy()

PhonePC/2in1Tablet



```
1. OH_AVErrCode OH_LowPowerAudioSinkCallback_Destroy(OH_LowPowerAudioSinkCallback* callback)
```

**描述**

销毁OH\_LowPowerAudioSinkCallback实例。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_LowPowerAudioSinkCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-lowpoweraudiosink-oh-lowpoweraudiosinkcallback)\* callback | 指向OH\_LowPowerAudioSinkCallback实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AVErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-averrors-h#oh_averrcode) | AV\_ERR\_OK：执行成功。  AV\_ERR\_INVALID\_VAL：参数为nullptr或参数非法。 |

### OH\_LowPowerAudioSinkCallback\_SetPositionUpdateListener()

PhonePC/2in1Tablet



```
1. OH_AVErrCode OH_LowPowerAudioSinkCallback_SetPositionUpdateListener(OH_LowPowerAudioSinkCallback* callback, OH_LowPowerAudioSink_OnPositionUpdated onPositionUpdated, void* userData)
```

**描述**

为LowPowerAudioSinkCallback设置进度更新监听。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_LowPowerAudioSinkCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-lowpoweraudiosink-oh-lowpoweraudiosinkcallback)\* callback | 指向OH\_LowPowerAudioSinkCallback实例的指针。 |
| [OH\_LowPowerAudioSink\_OnPositionUpdated](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-base-h#oh_lowpoweraudiosink_onpositionupdated) onPositionUpdated | OH\_LowPowerAudioSink\_OnPositionUpdated方法，在PositionUpdate事件触发时调用。 |
| void\* userData | 用户执行回调所依赖的数据。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AVErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-averrors-h#oh_averrcode) | AV\_ERR\_OK：执行成功。  AV\_ERR\_INVALID\_VAL：参数为nullptr或参数非法。  AV\_ERR\_OPERATE\_NOT\_PERMIT：操作不支持。 |

### OH\_LowPowerAudioSinkCallback\_SetDataNeededListener()

PhonePC/2in1Tablet



```
1. OH_AVErrCode OH_LowPowerAudioSinkCallback_SetDataNeededListener(OH_LowPowerAudioSinkCallback* callback, OH_LowPowerAudioSink_OnDataNeeded onDataNeeded, void* userData)
```

**描述**

为LowPowerAudioSinkCallback设置需要数据监听。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_LowPowerAudioSinkCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-lowpoweraudiosink-oh-lowpoweraudiosinkcallback)\* callback | 指向OH\_LowPowerAudioSinkCallback实例的指针。 |
| [OH\_LowPowerAudioSink\_OnDataNeeded](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-base-h#oh_lowpoweraudiosink_ondataneeded) onDataNeeded | OH\_LowPowerAudioSink\_OnDataNeeded方法，在DataNeeded事件触发时调用。 |
| void\* userData | 用户执行回调所依赖的数据。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AVErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-averrors-h#oh_averrcode) | AV\_ERR\_OK：执行成功。  AV\_ERR\_INVALID\_VAL：参数为nullptr或参数非法。  AV\_ERR\_OPERATE\_NOT\_PERMIT：操作不支持。 |

### OH\_LowPowerAudioSinkCallback\_SetErrorListener()

PhonePC/2in1Tablet



```
1. OH_AVErrCode OH_LowPowerAudioSinkCallback_SetErrorListener(OH_LowPowerAudioSinkCallback* callback, OH_LowPowerAudioSink_OnError onError, void* userData)
```

**描述**

为LowPowerAudioSinkCallback设置错误监听。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_LowPowerAudioSinkCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-lowpoweraudiosink-oh-lowpoweraudiosinkcallback)\* callback | 指向OH\_LowPowerAudioSinkCallback实例的指针。 |
| [OH\_LowPowerAudioSink\_OnError](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-base-h#oh_lowpoweraudiosink_onerror) onError | OH\_LowPowerAudioSink\_OnError方法，在Error事件触发时调用。 |
| void\* userData | 用户执行回调所依赖的数据。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AVErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-averrors-h#oh_averrcode) | AV\_ERR\_OK：执行成功。  AV\_ERR\_INVALID\_VAL：参数为nullptr或参数非法。  AV\_ERR\_OPERATE\_NOT\_PERMIT：操作不支持。 |

### OH\_LowPowerAudioSinkCallback\_SetInterruptListener()

PhonePC/2in1Tablet



```
1. OH_AVErrCode OH_LowPowerAudioSinkCallback_SetInterruptListener(OH_LowPowerAudioSinkCallback* callback, OH_LowPowerAudioSink_OnInterrupted onInterrupted, void* userData)
```

**描述**

为LowPowerAudioSinkCallback设置音频焦点打断监听。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_LowPowerAudioSinkCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-lowpoweraudiosink-oh-lowpoweraudiosinkcallback)\* callback | 指向OH\_LowPowerAudioSinkCallback实例的指针。 |
| [OH\_LowPowerAudioSink\_OnInterrupted](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-base-h#oh_lowpoweraudiosink_oninterrupted) onInterrupted | OH\_LowPowerAudioSink\_OnInterrupted方法，在Interrupted事件触发时调用。 |
| void\* userData | 用户执行回调所依赖的数据。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AVErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-averrors-h#oh_averrcode) | AV\_ERR\_OK：执行成功。  AV\_ERR\_INVALID\_VAL：参数为nullptr或参数非法。  AV\_ERR\_OPERATE\_NOT\_PERMIT：操作不支持。 |

### OH\_LowPowerAudioSinkCallback\_SetDeviceChangeListener()

PhonePC/2in1Tablet



```
1. OH_AVErrCode OH_LowPowerAudioSinkCallback_SetDeviceChangeListener(OH_LowPowerAudioSinkCallback* callback, OH_LowPowerAudioSink_OnDeviceChanged onDeviceChanged, void* userData)
```

**描述**

为LowPowerAudioSinkCallback设置音频设备切换监听。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_LowPowerAudioSinkCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-lowpoweraudiosink-oh-lowpoweraudiosinkcallback)\* callback | 指向OH\_LowPowerAudioSinkCallback实例的指针。 |
| [OH\_LowPowerAudioSink\_OnDeviceChanged](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-base-h#oh_lowpoweraudiosink_ondevicechanged) onDeviceChanged | OH\_LowPowerAudioSink\_OnDeviceChanged方法，在DeviceChanged事件触发时调用。 |
| void\* userData | 用户执行回调所依赖的数据。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AVErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-averrors-h#oh_averrcode) | AV\_ERR\_OK：执行成功。  AV\_ERR\_INVALID\_VAL：参数为nullptr或参数非法。  AV\_ERR\_OPERATE\_NOT\_PERMIT：操作不支持。 |

### OH\_LowPowerAudioSinkCallback\_SetEosListener()

PhonePC/2in1Tablet



```
1. OH_AVErrCode OH_LowPowerAudioSinkCallback_SetEosListener(OH_LowPowerAudioSinkCallback *callback, OH_LowPowerAudioSink_OnEos onEos, void* userData)
```

**描述**

为LowPowerAudioSinkCallback设置播放完成监听。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_LowPowerAudioSinkCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-lowpoweraudiosink-oh-lowpoweraudiosinkcallback) \*callback | 指向OH\_LowPowerAudioSinkCallback实例的指针。 |
| [OH\_LowPowerAudioSink\_OnEos](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpower-audio-sink-base-h#oh_lowpoweraudiosink_oneos) onEos | OH\_LowPowerAudioSink\_OnEos方法，在Eos事件触发时调用。 |
| void\* userData | 用户执行回调所依赖的数据。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AVErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-averrors-h#oh_averrcode) | AV\_ERR\_OK：执行成功。  AV\_ERR\_INVALID\_VAL：参数为nullptr或参数非法。  AV\_ERR\_OPERATE\_NOT\_PERMIT：操作不支持。 |