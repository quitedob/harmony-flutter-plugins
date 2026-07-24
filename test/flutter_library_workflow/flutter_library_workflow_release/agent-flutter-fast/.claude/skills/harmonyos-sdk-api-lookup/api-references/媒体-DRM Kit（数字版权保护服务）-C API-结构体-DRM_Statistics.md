

```
1. typedef struct DRM_Statistics {...} DRM_Statistics
```

## 概述

PhonePC/2in1TabletTVWearable

MediaKeySystem的度量信息。

**起始版本：** 11

**相关模块：** [Drm](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drm)

**所在头文件：** [native\_drm\_common.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-drm-common-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| uint32\_t statisticsCount | 度量计数。 |
| char statisticsName[MAX\_STATISTICS\_COUNT][MAX\_STATISTICS\_NAME\_LEN] | 度量信息名称集合。 |
| char statisticsDescription[MAX\_STATISTICS\_COUNT][MAX\_STATISTICS\_BUFFER\_LEN] | 度量信息描述集合。 |