

```
1. typedef struct OH_AVRecorder_Config {...} OH_AVRecorder_Config
```

## 概述

PhonePC/2in1TabletTVWearable

提供媒体AVRecorder的配置定义。

**起始版本：** 18

**相关模块：** [AVRecorder](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avrecorder)

**所在头文件：** [avrecorder\_base.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avrecorder-base-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [OH\_AVRecorder\_AudioSourceType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avrecorder-base-h#oh_avrecorder_audiosourcetype) audioSourceType | 录制音频源类型。 |
| [OH\_AVRecorder\_VideoSourceType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avrecorder-base-h#oh_avrecorder_videosourcetype) videoSourceType | 录制视频源类型。 |
| [OH\_AVRecorder\_Profile](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avrecorder-oh-avrecorder-profile) profile | 包含音频和视频编码配置。 |
| char\* url | 定义文件URL，格式为fd://xx。 |
| [OH\_AVRecorder\_FileGenerationMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avrecorder-base-h#oh_avrecorder_filegenerationmode) fileGenerationMode | 指定录制输出文件的生成模式。 |
| [OH\_AVRecorder\_Metadata](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avrecorder-oh-avrecorder-metadata) metadata | 包含录制媒体的附加元数据。 |
| int32\_t maxDuration | 指定录制的最大时长，单位为秒。 |