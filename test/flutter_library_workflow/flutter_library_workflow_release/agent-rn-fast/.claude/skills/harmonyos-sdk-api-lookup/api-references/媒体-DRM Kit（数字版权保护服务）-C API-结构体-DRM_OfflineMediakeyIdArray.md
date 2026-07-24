

```
1. typedef struct DRM_OfflineMediakeyIdArray {...} DRM_OfflineMediakeyIdArray
```

## 概述

PhonePC/2in1TabletTVWearable

离线媒体密钥ID数组。

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
| uint32\_t idsCount | ID计数。 |
| int32\_t idsLen[MAX\_OFFLINE\_MEDIA\_KEY\_ID\_COUNT] | ID长度集合。 |
| uint8\_t ids[MAX\_OFFLINE\_MEDIA\_KEY\_ID\_COUNT][MAX\_OFFLINE\_MEDIA\_KEY\_ID\_LEN] | ID数据集合。 |