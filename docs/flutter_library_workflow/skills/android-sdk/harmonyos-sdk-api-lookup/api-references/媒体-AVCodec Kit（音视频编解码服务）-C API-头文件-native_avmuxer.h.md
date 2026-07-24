## 概述

PhonePC/2in1TabletTVWearable

声明用于音视频封装的Native API。

**引用文件：** <multimedia/player\_framework/native\_avmuxer.h>

**库：** libnative\_media\_avmuxer.so

**系统能力：** SystemCapability.Multimedia.Media.Muxer

**起始版本：** 10

**相关模块：** [AVMuxer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avmuxer)

**相关示例：**[AVCodec](https://gitcode.com/openharmony/applications_app_samples/tree/master/code/BasicFeature/Media/AVCodec)

## 汇总

PhonePC/2in1TabletTVWearable

### 结构体

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [OH\_AVMuxer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avmuxer-oh-avmuxer) | OH\_AVMuxer | 定义封装接口native层对象类型。 |

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [OH\_AVMuxer \*OH\_AVMuxer\_Create(int32\_t fd, OH\_AVOutputFormat format)](/consumer/cn/doc/harmonyos-references/capi-native-avmuxer-h#oh_avmuxer_create) | 通过文件描述符fd和封装格式创建OH\_AVMuxer实例。 |
| [OH\_AVErrCode OH\_AVMuxer\_SetRotation(OH\_AVMuxer \*muxer, int32\_t rotation)](/consumer/cn/doc/harmonyos-references/capi-native-avmuxer-h#oh_avmuxer_setrotation) | 设置视频的旋转角度（顺时针，且旋转角度必须为0、90、180或270）。该接口必须在[OH\_AVMuxer\_Start](/consumer/cn/doc/harmonyos-references/capi-native-avmuxer-h#oh_avmuxer_start)前调用。 |
| [OH\_AVErrCode OH\_AVMuxer\_SetFormat(OH\_AVMuxer \*muxer, OH\_AVFormat \*format)](/consumer/cn/doc/harmonyos-references/capi-native-avmuxer-h#oh_avmuxer_setformat) | 设置format数据到封装器。  API version 14起，支持设置创建时间OH\_MD\_KEY\_CREATION\_TIME。若创建时间未写入成功，请排查OH\_MD\_KEY\_CREATION\_TIME字符串设置是否符合ISO 8601标准的时间格式且为UTC时间。  API version 20起，支持：  - 设置文件的描述性文本信息OH\_MD\_KEY\_COMMENT。若文件描述信息未写入成功，请排查OH\_MD\_KEY\_COMMENT是否为字符串类型或字符长度大于等于1且小于等于256。  - 设置MP4 moov的位置OH\_MD\_KEY\_ENABLE\_MOOV\_FRONT。OH\_MD\_KEY\_ENABLE\_MOOV\_FRONT为0时moov后置，为1时前置，默认后置。 |
| [OH\_AVErrCode OH\_AVMuxer\_AddTrack(OH\_AVMuxer \*muxer, int32\_t \*trackIndex, OH\_AVFormat \*trackFormat)](/consumer/cn/doc/harmonyos-references/capi-native-avmuxer-h#oh_avmuxer_addtrack) | 向封装器添加音视频轨。每调用一次本接口可以在封装器中添加一个音视频轨。该接口必须在[OH\_AVMuxer\_Start](/consumer/cn/doc/harmonyos-references/capi-native-avmuxer-h#oh_avmuxer_start)前调用。 |
| [OH\_AVErrCode OH\_AVMuxer\_Start(OH\_AVMuxer \*muxer)](/consumer/cn/doc/harmonyos-references/capi-native-avmuxer-h#oh_avmuxer_start) | 开始封装。该接口必须在[OH\_AVMuxer\_AddTrack](/consumer/cn/doc/harmonyos-references/capi-native-avmuxer-h#oh_avmuxer_addtrack)后，[OH\_AVMuxer\_WriteSample](/consumer/cn/doc/harmonyos-references/capi-native-avmuxer-h#oh_avmuxer_writesample)前调用。 |
| [OH\_AVErrCode OH\_AVMuxer\_WriteSample(OH\_AVMuxer \*muxer, uint32\_t trackIndex, OH\_AVMemory \*sample, OH\_AVCodecBufferAttr info)](/consumer/cn/doc/harmonyos-references/capi-native-avmuxer-h#oh_avmuxer_writesample) | 将sample写入封装器。 该接口必须在[OH\_AVMuxer\_Start](/consumer/cn/doc/harmonyos-references/capi-native-avmuxer-h#oh_avmuxer_start)后，[OH\_AVMuxer\_Stop](/consumer/cn/doc/harmonyos-references/capi-native-avmuxer-h#oh_avmuxer_stop)前调用。调用者需要按info中的时间顺序将sample写入正确的音视频轨。 |
| [OH\_AVErrCode OH\_AVMuxer\_WriteSampleBuffer(OH\_AVMuxer \*muxer, uint32\_t trackIndex, const OH\_AVBuffer \*sample)](/consumer/cn/doc/harmonyos-references/capi-native-avmuxer-h#oh_avmuxer_writesamplebuffer) | 将sample写入封装器。该接口必须在[OH\_AVMuxer\_Start](/consumer/cn/doc/harmonyos-references/capi-native-avmuxer-h#oh_avmuxer_start)后，[OH\_AVMuxer\_Stop](/consumer/cn/doc/harmonyos-references/capi-native-avmuxer-h#oh_avmuxer_stop)前调用。调用者需要按sample中的时间顺序将sample写入正确的音视频轨。 |
| [OH\_AVErrCode OH\_AVMuxer\_Stop(OH\_AVMuxer \*muxer)](/consumer/cn/doc/harmonyos-references/capi-native-avmuxer-h#oh_avmuxer_stop) | 停止封装。封装器停止后不支持重新开始。 |
| [OH\_AVErrCode OH\_AVMuxer\_Destroy(OH\_AVMuxer \*muxer)](/consumer/cn/doc/harmonyos-references/capi-native-avmuxer-h#oh_avmuxer_destroy) | 清理内部资源，销毁OH\_AVMuxer实例。  注意不能重复销毁，否则会导致程序崩溃。 |

## 函数说明

PhonePC/2in1TabletTVWearable

### OH\_AVMuxer\_Create()

PhonePC/2in1TabletTVWearable



```
1. OH_AVMuxer *OH_AVMuxer_Create(int32_t fd, OH_AVOutputFormat format)
```

**描述**

通过文件描述符fd和封装格式创建OH\_AVMuxer实例。

**系统能力：** SystemCapability.Multimedia.Media.Muxer

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| int32\_t fd | 用读写方式打开（O\_RDWR），由调用者关闭该fd。 |
| [OH\_AVOutputFormat](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avcodec-base-h#oh_avoutputformat) format | 封装输出的文件格式。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AVMuxer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avmuxer-oh-avmuxer) \* | 返回一个指向OH\_AVMuxer实例的指针，需要调用[OH\_AVMuxer\_Destroy](/consumer/cn/doc/harmonyos-references/capi-native-avmuxer-h#oh_avmuxer_destroy)销毁。 |

### OH\_AVMuxer\_SetRotation()

PhonePC/2in1TabletTVWearable



```
1. OH_AVErrCode OH_AVMuxer_SetRotation(OH_AVMuxer *muxer, int32_t rotation)
```

**描述**

设置视频的旋转角度（顺时针，且旋转角度必须为0、90、180或270）。该接口必须在[OH\_AVMuxer\_Start](/consumer/cn/doc/harmonyos-references/capi-native-avmuxer-h#oh_avmuxer_start)前调用。

**系统能力：** SystemCapability.Multimedia.Media.Muxer

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVMuxer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avmuxer-oh-avmuxer) \*muxer | 指向OH\_AVMuxer实例的指针。 |
| int32\_t rotation | 角度，必须为0、90、180 或 270。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AVErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-averrors-h#oh_averrcode) | AV\_ERR\_OK：执行成功。  AV\_ERR\_INVALID\_VAL：muxer为空指针，或rotation无效。  AV\_ERR\_OPERATE\_NOT\_PERMIT：不允许调用该接口，请检查接口调用顺序。 |

### OH\_AVMuxer\_SetFormat()

PhonePC/2in1TabletTVWearable



```
1. OH_AVErrCode OH_AVMuxer_SetFormat(OH_AVMuxer *muxer, OH_AVFormat *format)
```

**描述**

设置format数据到封装器。

API version 14起，支持设置创建时间OH\_MD\_KEY\_CREATION\_TIME。若创建时间未写入成功，请排查OH\_MD\_KEY\_CREATION\_TIME字符串设置是否符合ISO 8601标准的时间格式且为UTC时间。

API version 20起，支持：

* 设置文件的描述性文本信息OH\_MD\_KEY\_COMMENT。若文件描述信息未写入成功，请排查OH\_MD\_KEY\_COMMENT是否为字符串类型或字符长度大于等于1且小于等于256。
* 设置MP4 moov的位置OH\_MD\_KEY\_ENABLE\_MOOV\_FRONT。OH\_MD\_KEY\_ENABLE\_MOOV\_FRONT为0时moov后置，为1时前置，默认后置。

**系统能力：** SystemCapability.Multimedia.Media.Muxer

**起始版本：** 14

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVMuxer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avmuxer-oh-avmuxer) \*muxer | 指向OH\_AVMuxer实例的指针。 |
| [OH\_AVFormat](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-core-oh-avformat) \*format | 指向OH\_AVFormat实例的指针。文件级元数据集。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AVErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-averrors-h#oh_averrcode) | AV\_ERR\_OK：设置format参数正确。  AV\_ERR\_INVALID\_VAL：muxer为空指针，或format无效。  AV\_ERR\_OPERATE\_NOT\_PERMIT：不允许调用该接口，请检查接口调用顺序。 |

### OH\_AVMuxer\_AddTrack()

PhonePC/2in1TabletTVWearable



```
1. OH_AVErrCode OH_AVMuxer_AddTrack(OH_AVMuxer *muxer, int32_t *trackIndex, OH_AVFormat *trackFormat)
```

**描述**

向封装器添加音视频轨。每调用一次本接口可以在封装器中添加一个音视频轨。该接口必须在[OH\_AVMuxer\_Start](/consumer/cn/doc/harmonyos-references/capi-native-avmuxer-h#oh_avmuxer_start)前调用。

**系统能力：** SystemCapability.Multimedia.Media.Muxer

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVMuxer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avmuxer-oh-avmuxer) \*muxer | 指向OH\_AVMuxer实例的指针。 |
| int32\_t \*trackIndex | 用于获取该轨的索引，该值在[OH\_AVMuxer\_WriteSample](/consumer/cn/doc/harmonyos-references/capi-native-avmuxer-h#oh_avmuxer_writesample)接口中使用。如果媒体轨添加成功，该值大于或等于0，否则小于0。 |
| [OH\_AVFormat](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-core-oh-avformat) \*trackFormat | 指向OH\_AVFormat实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AVErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-averrors-h#oh_averrcode) | AV\_ERR\_OK：执行成功。  AV\_ERR\_INVALID\_VAL：muxer为空指针，或trackIndex无效，或trackFormat无效。  AV\_ERR\_OPERATE\_NOT\_PERMIT：不允许调用该接口，请检查接口调用顺序。  AV\_ERR\_UNSUPPORT：不支持的mime类型。  AV\_ERR\_NO\_MEMORY：申请内存失败。  AV\_ERR\_UNKNOWN：未知错误。 |

### OH\_AVMuxer\_Start()

PhonePC/2in1TabletTVWearable



```
1. OH_AVErrCode OH_AVMuxer_Start(OH_AVMuxer *muxer)
```

**描述**

开始封装。该接口必须在[OH\_AVMuxer\_AddTrack](/consumer/cn/doc/harmonyos-references/capi-native-avmuxer-h#oh_avmuxer_addtrack)后，[OH\_AVMuxer\_WriteSample](/consumer/cn/doc/harmonyos-references/capi-native-avmuxer-h#oh_avmuxer_writesample)前调用。

**系统能力：** SystemCapability.Multimedia.Media.Muxer

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVMuxer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avmuxer-oh-avmuxer) \*muxer | 指向OH\_AVMuxer实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AVErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-averrors-h#oh_averrcode) | AV\_ERR\_OK：执行成功。  AV\_ERR\_INVALID\_VAL：muxer为空指针。  AV\_ERR\_OPERATE\_NOT\_PERMIT：不允许调用该接口，请检查接口调用顺序。  AV\_ERR\_UNKNOWN：未知错误。 |

### OH\_AVMuxer\_WriteSample()

PhonePC/2in1TabletTVWearable



```
1. OH_AVErrCode OH_AVMuxer_WriteSample(OH_AVMuxer *muxer, uint32_t trackIndex, OH_AVMemory *sample, OH_AVCodecBufferAttr info)
```

**描述**

将sample写入封装器。该接口必须在[OH\_AVMuxer\_Start](/consumer/cn/doc/harmonyos-references/capi-native-avmuxer-h#oh_avmuxer_start)后，[OH\_AVMuxer\_Stop](/consumer/cn/doc/harmonyos-references/capi-native-avmuxer-h#oh_avmuxer_stop)前调用。调用者需要按info中的时间顺序将sample写入正确的音视频轨。

**系统能力：** SystemCapability.Multimedia.Media.Muxer

**起始版本：** 10

**废弃版本：** 11

**替代接口：** [OH\_AVMuxer\_WriteSampleBuffer](/consumer/cn/doc/harmonyos-references/capi-native-avmuxer-h#oh_avmuxer_writesamplebuffer)

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVMuxer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avmuxer-oh-avmuxer) \*muxer | 指向OH\_AVMuxer实例的指针。 |
| uint32\_t trackIndex | 数据对应的音视频轨的索引。 |
| [OH\_AVMemory](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-core-oh-avmemory) \*sample | 编码或解封装得到的数据。 |
| [OH\_AVCodecBufferAttr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-core-oh-avcodecbufferattr) info | sample对应的描述信息。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AVErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-averrors-h#oh_averrcode) | AV\_ERR\_OK：执行成功。  AV\_ERR\_INVALID\_VAL：muxer为空指针，或trackIndex无效，或sample无效，或info无效。  AV\_ERR\_OPERATE\_NOT\_PERMIT：不允许调用该接口，请检查接口调用顺序。  AV\_ERR\_NO\_MEMORY：申请内存失败。  AV\_ERR\_UNKNOWN：未知错误。 |

### OH\_AVMuxer\_WriteSampleBuffer()

PhonePC/2in1TabletTVWearable



```
1. OH_AVErrCode OH_AVMuxer_WriteSampleBuffer(OH_AVMuxer *muxer, uint32_t trackIndex, const OH_AVBuffer *sample)
```

**描述**

将sample写入封装器。该接口必须在[OH\_AVMuxer\_Start](/consumer/cn/doc/harmonyos-references/capi-native-avmuxer-h#oh_avmuxer_start)后，[OH\_AVMuxer\_Stop](/consumer/cn/doc/harmonyos-references/capi-native-avmuxer-h#oh_avmuxer_stop)前调用。调用者需要按sample中的时间顺序将sample写入正确的音视频轨。

**系统能力：** SystemCapability.Multimedia.Media.Muxer

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVMuxer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avmuxer-oh-avmuxer) \*muxer | 指向OH\_AVMuxer实例的指针。 |
| uint32\_t trackIndex | 数据对应的音视频轨的索引。 |
| const [OH\_AVBuffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-core-oh-avbuffer) \*sample | 编码或解封装得到的数据及属性。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AVErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-averrors-h#oh_averrcode) | AV\_ERR\_OK：执行成功。  AV\_ERR\_INVALID\_VAL：muxer为空指针，或trackIndex无效，或sample无效。  AV\_ERR\_OPERATE\_NOT\_PERMIT：不允许调用该接口，请检查接口调用顺序。  AV\_ERR\_NO\_MEMORY：申请内存失败。  AV\_ERR\_UNKNOWN：未知错误。 |

### OH\_AVMuxer\_Stop()

PhonePC/2in1TabletTVWearable



```
1. OH_AVErrCode OH_AVMuxer_Stop(OH_AVMuxer *muxer)
```

**描述**

停止封装。封装器停止后不支持重新开始。

**系统能力：** SystemCapability.Multimedia.Media.Muxer

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVMuxer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avmuxer-oh-avmuxer) \*muxer | 指向OH\_AVMuxer实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AVErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-averrors-h#oh_averrcode) | AV\_ERR\_OK：执行成功。  AV\_ERR\_INVALID\_VAL：muxer为空指针。  AV\_ERR\_OPERATE\_NOT\_PERMIT：不允许调用该接口，请检查接口调用顺序。 |

### OH\_AVMuxer\_Destroy()

PhonePC/2in1TabletTVWearable



```
1. OH_AVErrCode OH_AVMuxer_Destroy(OH_AVMuxer *muxer)
```

**描述**

清理内部资源，销毁OH\_AVMuxer实例。

注意不能重复销毁，否则会导致程序崩溃。

**系统能力：** SystemCapability.Multimedia.Media.Muxer

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AVMuxer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avmuxer-oh-avmuxer) \*muxer | 指向OH\_AVMuxer实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AVErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-averrors-h#oh_averrcode) | AV\_ERR\_OK：执行成功。  AV\_ERR\_INVALID\_VAL：muxer为空指针。 |