

```
1. typedef struct DRM_KeysInfo {...} DRM_KeysInfo
```

## 概述

PhonePC/2in1TabletTVWearable

媒体密钥信息。

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
| uint32\_t keysInfoCount | 密钥计数。 |
| uint8\_t keyId[MAX\_KEY\_INFO\_COUNT][MAX\_KEY\_ID\_LEN] | 密钥ID集合。 |
| char statusValue[MAX\_KEY\_INFO\_COUNT][MAX\_KEY\_STATUS\_VALUE\_LEN] | 密钥状态值。 |