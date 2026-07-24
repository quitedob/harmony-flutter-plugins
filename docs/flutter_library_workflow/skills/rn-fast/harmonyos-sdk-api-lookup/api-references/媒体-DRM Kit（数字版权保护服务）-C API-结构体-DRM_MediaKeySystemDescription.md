

```
1. typedef struct DRM_MediaKeySystemDescription {...} DRM_MediaKeySystemDescription
```

## 概述

PhonePC/2in1TabletTVWearable

DRM解决方案名称及其UUID的列表。

**起始版本：** 12

**相关模块：** [Drm](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drm)

**所在头文件：** [native\_drm\_common.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-drm-common-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| char name[MAX\_MEDIA\_KEY\_SYSTEM\_NAME\_LEN] | DRM插件的名称。 |
| uint8\_t uuid[DRM\_UUID\_LEN] | UUID。 |