

```
1. typedef struct DRM_MediaKeyStatus {...} DRM_MediaKeyStatus
```

## 概述

PhonePC/2in1TabletTVWearable

媒体密钥状态。

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
| uint32\_t statusCount | 状态计数。 |
| char statusName[MAX\_MEDIA\_KEY\_STATUS\_COUNT][MAX\_MEDIA\_KEY\_STATUS\_NAME\_LEN] | 状态名数组。 |
| char statusValue[MAX\_MEDIA\_KEY\_STATUS\_COUNT][MAX\_MEDIA\_KEY\_STATUS\_VALUE\_LEN] | 状态值数组。 |