

```
1. typedef struct OH_AVRecorder_Metadata {...} OH_AVRecorder_Metadata
```

## 概述

PhonePC/2in1TabletTVWearable

元数据信息数据结构。

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
| char\* genre | 媒体资源的类型或体裁。 |
| char\* videoOrientation | 视频的旋转方向，单位为度。 |
| [OH\_AVRecorder\_Location](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avrecorder-oh-avrecorder-location) location | 视频的地理位置信息。 |
| [OH\_AVRecorder\_MetadataTemplate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avrecorder-oh-avrecorder-metadatatemplate) customInfo | 从 moov.meta.list 读取的自定义参数键值映射。 |