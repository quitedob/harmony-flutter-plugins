

```
1. typedef struct DRM_MediaKeyRequest {...} DRM_MediaKeyRequest
```

## 概述

PhonePC/2in1TabletTVWearable

媒体密钥请求。

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
| [DRM\_MediaKeyRequestType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-drm-common-h#drm_mediakeyrequesttype) type | 媒体密钥请求类型。 |
| int32\_t dataLen | 媒体密钥请求数据长度。 |
| uint8\_t data[MAX\_MEDIA\_KEY\_REQUEST\_DATA\_LEN] | 发送到媒体密钥服务器的媒体密钥请求数据。 |
| char defaultUrl[MAX\_DEFAULT\_URL\_LEN] | 媒体密钥服务器URL。 |