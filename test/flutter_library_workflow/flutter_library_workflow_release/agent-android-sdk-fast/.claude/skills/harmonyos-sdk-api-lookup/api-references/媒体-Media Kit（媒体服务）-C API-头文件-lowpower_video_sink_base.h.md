## 概述

PhonePC/2in1Tablet

定义LowPowerVideoSink的结构体和枚举。

**引用文件：** <multimedia/player\_framework/lowpower\_video\_sink\_base.h>

**库：** liblowpower\_avsink.so

**系统能力：** SystemCapability.Multimedia.Media.LowPowerAVSink

**起始版本：** 20

**相关模块：** [LowPowerVideoSink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpowervideosink)

## 汇总

PhonePC/2in1Tablet

### 结构体

PhonePC/2in1Tablet

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [OH\_LowPowerVideoSink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpowervideosink-oh-lowpowervideosink) | OH\_LowPowerVideoSink | LowPowerVideoSink声明。 |
| [OH\_LowPowerVideoSinkCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-lowpowervideosink-oh-lowpowervideosinkcallback) | OH\_LowPowerVideoSinkCallback | 包含了LowPowerVideoSink回调函数指针的集合。  应用需注册此实例结构体到[OH\_LowPowerVideoSink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpowervideosink-oh-lowpowervideosink)实例中，并对回调上报的信息进行处理，保证LowPowerVideoSink的正常运行。 |

### 函数

PhonePC/2in1Tablet

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [typedef void (\*OH\_LowPowerVideoSink\_OnDataNeeded)(OH\_LowPowerVideoSink\* sink, OH\_AVSamplesBuffer\* buffer, void \*userData)](/consumer/cn/doc/harmonyos-references/capi-lowpower-video-sink-base-h#oh_lowpowervideosink_ondataneeded) | OH\_LowPowerVideoSink\_OnDataNeeded | LowPowerVideoSink需要数据时调用该方法，包含在[OH\_LowPowerVideoSinkCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-lowpowervideosink-oh-lowpowervideosinkcallback)中。 |
| [typedef void (\*OH\_LowPowerVideoSink\_OnError)(OH\_LowPowerVideoSink\* sink, OH\_AVErrCode errCode, const char\* errMsg, void\* userData)](/consumer/cn/doc/harmonyos-references/capi-lowpower-video-sink-base-h#oh_lowpowervideosink_onerror) | OH\_LowPowerVideoSink\_OnError | LowPowerVideoSink发生错误时调用该方法。 |
| [typedef void (\*OH\_LowPowerVideoSink\_OnTargetArrived)(OH\_LowPowerVideoSink\* sink, const int64\_t targetPts, const bool isTimeout, void\* userData)](/consumer/cn/doc/harmonyos-references/capi-lowpower-video-sink-base-h#oh_lowpowervideosink_ontargetarrived) | OH\_LowPowerVideoSink\_OnTargetArrived | LowPowerVideoSink到达目标点时调用该方法，包含在[OH\_LowPowerVideoSinkCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-lowpowervideosink-oh-lowpowervideosinkcallback)中。 |
| [typedef void (\*OH\_LowPowerVideoSink\_OnRenderStarted)(OH\_LowPowerVideoSink\* sink, void\* userData)](/consumer/cn/doc/harmonyos-references/capi-lowpower-video-sink-base-h#oh_lowpowervideosink_onrenderstarted) | OH\_LowPowerVideoSink\_OnRenderStarted | LowPowerVideoSink开始渲染时调用该方法，包含在[OH\_LowPowerVideoSinkCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-lowpowervideosink-oh-lowpowervideosinkcallback)中。 |
| [typedef void (\*OH\_LowPowerVideoSink\_OnStreamChanged)(OH\_LowPowerVideoSink\* sink, OH\_AVFormat\* format, void\* userData)](/consumer/cn/doc/harmonyos-references/capi-lowpower-video-sink-base-h#oh_lowpowervideosink_onstreamchanged) | OH\_LowPowerVideoSink\_OnStreamChanged | LowPowerVideoSink流切换调用该方法，包含在[OH\_LowPowerVideoSinkCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-lowpowervideosink-oh-lowpowervideosinkcallback)中。 |
| [typedef void (\*OH\_LowPowerVideoSink\_OnFirstFrameDecoded)(OH\_LowPowerVideoSink\* sink, void\* userData)](/consumer/cn/doc/harmonyos-references/capi-lowpower-video-sink-base-h#oh_lowpowervideosink_onfirstframedecoded) | OH\_LowPowerVideoSink\_OnFirstFrameDecoded | LowPowerVideoSink第一帧解码成功时调用该方法，包含在[OH\_LowPowerVideoSinkCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-lowpowervideosink-oh-lowpowervideosinkcallback)中。 |
| [typedef void (\*OH\_LowPowerVideoSink\_OnEos)(OH\_LowPowerVideoSink\* sink, void\* userData)](/consumer/cn/doc/harmonyos-references/capi-lowpower-video-sink-base-h#oh_lowpowervideosink_oneos) | OH\_LowPowerVideoSink\_OnEos | LowPowerVideoSink播放完成时调用该方法，包含在[OH\_LowPowerVideoSinkCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-lowpowervideosink-oh-lowpowervideosinkcallback)中。 |

## 函数说明

PhonePC/2in1Tablet

### OH\_LowPowerVideoSink\_OnDataNeeded()

PhonePC/2in1Tablet



```
1. typedef void (*OH_LowPowerVideoSink_OnDataNeeded)(OH_LowPowerVideoSink* sink,OH_AVSamplesBuffer* buffer,void *userData)
```

**描述**

LowPowerVideoSink需要数据时调用该方法，包含在[OH\_LowPowerVideoSinkCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-lowpowervideosink-oh-lowpowervideosinkcallback)中。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_LowPowerVideoSink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpowervideosink-oh-lowpowervideosink)\* sink | 指向OH\_LowPowerVideoSink实例的指针。 |
| [OH\_AVSamplesBuffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avsinkbase-oh-avsamplesbuffer)\* buffer | 指向OH\_AVSamplesBuffer实例的指针。 |
| void \*userData | 用户执行回调所依赖的数据。 |

### OH\_LowPowerVideoSink\_OnError()

PhonePC/2in1Tablet



```
1. typedef void (*OH_LowPowerVideoSink_OnError)(OH_LowPowerVideoSink* sink,OH_AVErrCode errCode,const char* errMsg,void* userData)
```

**描述**

LowPowerVideoSink发生错误时调用该方法。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_LowPowerVideoSink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpowervideosink-oh-lowpowervideosink)\* sink | 指向OH\_LowPowerVideoSink实例的指针。 |
| [OH\_AVErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-averrors-h#oh_averrcode) errCode | 业务操作过程中发生错误时返回的错误码。 |
| const char\* errMsg | 业务操作过程中发生错误时返回的错误描述信息。 |
| void\* userData | 用户执行回调所依赖的数据。 |

### OH\_LowPowerVideoSink\_OnTargetArrived()

PhonePC/2in1Tablet



```
1. typedef void (*OH_LowPowerVideoSink_OnTargetArrived)(OH_LowPowerVideoSink* sink,const int64_t targetPts,const bool isTimeout,void* userData)
```

**描述**

LowPowerVideoSink到达目标点时调用该方法，包含在[OH\_LowPowerVideoSinkCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-lowpowervideosink-oh-lowpowervideosinkcallback)中。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_LowPowerVideoSink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpowervideosink-oh-lowpowervideosink)\* sink | 指向OH\_LowPowerVideoSink实例的指针。 |
| const int64\_t targetPts | 目标点的pts。单位为微秒。 |
| const bool isTimeout | 表示等待目标点是否超时。若为true，表示等待目标点超时；若为false，则表示未超时。 |
| void\* userData | 用户执行回调所依赖的数据。 |

### OH\_LowPowerVideoSink\_OnRenderStarted()

PhonePC/2in1Tablet



```
1. typedef void (*OH_LowPowerVideoSink_OnRenderStarted)(OH_LowPowerVideoSink* sink, void* userData)
```

**描述**

LowPowerVideoSink开始渲染时调用该方法，包含在[OH\_LowPowerVideoSinkCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-lowpowervideosink-oh-lowpowervideosinkcallback)中。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_LowPowerVideoSink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpowervideosink-oh-lowpowervideosink)\* sink | 指向OH\_LowPowerVideoSink实例的指针。 |
| void\* userData | 用户执行回调所依赖的数据。 |

### OH\_LowPowerVideoSink\_OnStreamChanged()

PhonePC/2in1Tablet



```
1. typedef void (*OH_LowPowerVideoSink_OnStreamChanged)(OH_LowPowerVideoSink* sink, OH_AVFormat* format, void* userData)
```

**描述**

LowPowerVideoSink流切换调用该方法，包含在[OH\_LowPowerVideoSinkCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-lowpowervideosink-oh-lowpowervideosinkcallback)中。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_LowPowerVideoSink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpowervideosink-oh-lowpowervideosink)\* sink | 指向OH\_LowPowerVideoSink实例的指针。 |
| [OH\_AVFormat](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-core-oh-avformat)\* format | 包含变化的参数和对应的值。 |
| void\* userData | 用户执行回调所依赖的数据。 |

### OH\_LowPowerVideoSink\_OnFirstFrameDecoded()

PhonePC/2in1Tablet



```
1. typedef void (*OH_LowPowerVideoSink_OnFirstFrameDecoded)(OH_LowPowerVideoSink* sink, void* userData)
```

**描述**

LowPowerVideoSink第一帧解码成功时调用该方法，包含在[OH\_LowPowerVideoSinkCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-lowpowervideosink-oh-lowpowervideosinkcallback)中。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_LowPowerVideoSink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpowervideosink-oh-lowpowervideosink)\* sink | 指向OH\_LowPowerVideoSink实例的指针。 |
| void\* userData | 用户执行回调所依赖的数据。 |

### OH\_LowPowerVideoSink\_OnEos()

PhonePC/2in1Tablet



```
1. typedef void (*OH_LowPowerVideoSink_OnEos)(OH_LowPowerVideoSink* sink, void* userData)
```

**描述**

LowPowerVideoSink播放完成时调用该方法，包含在[OH\_LowPowerVideoSinkCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-lowpowervideosink-oh-lowpowervideosinkcallback)中。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_LowPowerVideoSink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-lowpowervideosink-oh-lowpowervideosink)\* sink | 指向OH\_LowPowerVideoSink实例的指针。 |
| void\* userData | 用户执行回调所依赖的数据。 |