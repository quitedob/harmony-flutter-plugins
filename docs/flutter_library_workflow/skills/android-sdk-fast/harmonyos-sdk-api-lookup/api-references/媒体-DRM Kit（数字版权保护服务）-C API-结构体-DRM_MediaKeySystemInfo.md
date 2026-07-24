

```
1. typedef struct DRM_MediaKeySystemInfo {...} DRM_MediaKeySystemInfo
```

## 概述

PhonePC/2in1TabletTVWearable

加密媒体内容的DRM信息。

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
| uint32\_t psshCount | PSSH计数。 |
| [DRM\_PsshInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drm-drm-psshinfo) psshInfo[MAX\_PSSH\_INFO\_COUNT] | PSSH信息。 |