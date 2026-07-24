

```
1. typedef struct DRM_PsshInfo {...} DRM_PsshInfo
```

## 概述

PhonePC/2in1TabletTVWearable

DRM内容保护系统专用头（Protection System Specific Header）信息。

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
| uint8\_t uuid[DRM\_UUID\_LEN] | UUID的PSSH信息。 |
| int32\_t dataLen | PSSH数据长度。 |
| uint8\_t data[MAX\_PSSH\_DATA\_LEN] | PSSH数据。 |