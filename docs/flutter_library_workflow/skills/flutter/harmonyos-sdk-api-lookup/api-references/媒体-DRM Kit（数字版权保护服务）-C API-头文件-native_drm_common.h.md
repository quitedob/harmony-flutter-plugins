## 概述

PhonePC/2in1TabletTVWearable

定义DRM数据类型。

**引用文件：** <multimedia/drm\_framework/native\_drm\_common.h>

**库：** libnative\_drm.so

**系统能力：** SystemCapability.Multimedia.Drm.Core

**起始版本：** 11

**相关模块：** [Drm](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drm)

## 汇总

PhonePC/2in1TabletTVWearable

### 结构体

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [DRM\_MediaKeyRequestInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drm-drm-mediakeyrequestinfo) | DRM\_MediaKeyRequestInfo | 媒体密钥请求信息。 |
| [DRM\_MediaKeyRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drm-drm-mediakeyrequest) | DRM\_MediaKeyRequest | 媒体密钥请求。 |
| [DRM\_Statistics](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drm-drm-statistics) | DRM\_Statistics | MediaKeySystem的度量信息。 |
| [DRM\_OfflineMediakeyIdArray](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drm-drm-offlinemediakeyidarray) | DRM\_OfflineMediakeyIdArray | 离线媒体密钥ID数组。 |
| [DRM\_KeysInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drm-drm-keysinfo) | DRM\_KeysInfo | 媒体密钥信息。 |
| [DRM\_MediaKeyStatus](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drm-drm-mediakeystatus) | DRM\_MediaKeyStatus | 媒体密钥状态。 |
| [DRM\_PsshInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drm-drm-psshinfo) | DRM\_PsshInfo | DRM内容保护系统专用头（Protection System Specific Header）信息。 |
| [DRM\_MediaKeySystemInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drm-drm-mediakeysysteminfo) | DRM\_MediaKeySystemInfo | 加密媒体内容的DRM信息。 |
| [DRM\_MediaKeySystemDescription](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drm-drm-mediakeysystemdescription) | DRM\_MediaKeySystemDescription | DRM解决方案名称及其UUID的列表。 |
| [MediaKeySystem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drm-mediakeysystem) | MediaKeySystem | MediaKeySystem结构。 |
| [MediaKeySession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drm-mediakeysession) | MediaKeySession | MediaKeySession结构。 |

### 枚举

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [DRM\_EventType](/consumer/cn/doc/harmonyos-references/capi-native-drm-common-h#drm_eventtype) | DRM\_EventType | 监听事件类型。 |
| [DRM\_ContentProtectionLevel](/consumer/cn/doc/harmonyos-references/capi-native-drm-common-h#drm_contentprotectionlevel) | DRM\_ContentProtectionLevel | 内容保护级别。 |
| [DRM\_MediaKeyType](/consumer/cn/doc/harmonyos-references/capi-native-drm-common-h#drm_mediakeytype) | DRM\_MediaKeyType | 媒体密钥类型。 |
| [DRM\_MediaKeyRequestType](/consumer/cn/doc/harmonyos-references/capi-native-drm-common-h#drm_mediakeyrequesttype) | DRM\_MediaKeyRequestType | 媒体密钥请求类型。 |
| [DRM\_OfflineMediaKeyStatus](/consumer/cn/doc/harmonyos-references/capi-native-drm-common-h#drm_offlinemediakeystatus) | DRM\_OfflineMediaKeyStatus | 离线媒体密钥状态。 |
| [DRM\_CertificateStatus](/consumer/cn/doc/harmonyos-references/capi-native-drm-common-h#drm_certificatestatus) | DRM\_CertificateStatus | 设备DRM证书状态。 |

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [typedef void (\*DRM\_MediaKeySystemInfoCallback)(DRM\_MediaKeySystemInfo \*mediaKeySystemInfo)](/consumer/cn/doc/harmonyos-references/capi-native-drm-common-h#drm_mediakeysysteminfocallback) | DRM\_MediaKeySystemInfoCallback | 应用为从媒体源获取DRM信息而设置的回调。 |

### 宏定义

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| MAX\_MEDIA\_KEY\_REQUEST\_OPTION\_COUNT 16 | 媒体密钥请求可选数据的最大数量。  **起始版本：** 11 |
| MAX\_MEDIA\_KEY\_REQUEST\_OPTION\_NAME\_LEN 64 | 媒体密钥请求可选数据名称的最大长度。  **起始版本：** 11 |
| MAX\_MEDIA\_KEY\_REQUEST\_OPTION\_DATA\_LEN 128 | 媒体密钥请求可选数据的最大长度。  **起始版本：** 11 |
| MAX\_INIT\_DATA\_LEN 2048 | 媒体密钥请求初始化数据的最大长度。  **起始版本：** 11 |
| MAX\_MIMETYPE\_LEN 64 | 媒体mimetype的最大长度。  **起始版本：** 11 |
| MAX\_MEDIA\_KEY\_REQUEST\_DATA\_LEN 8192 | 媒体密钥请求数据的最大长度。  **起始版本：** 11 |
| MAX\_DEFAULT\_URL\_LEN 2048 | URL最大长度。  **起始版本：** 11 |
| MAX\_STATISTICS\_COUNT 10 | 度量记录的最大数量。  **起始版本：** 11 |
| MAX\_STATISTICS\_NAME\_LEN 64 | 度量记录名称的最大长度。  **起始版本：** 11 |
| MAX\_STATISTICS\_BUFFER\_LEN 256 | 度量记录缓冲区的最大长度。  **起始版本：** 11 |
| MAX\_OFFLINE\_MEDIA\_KEY\_ID\_COUNT 512 | 离线媒体密钥标识的最大数量。  **起始版本：** 11 |
| MAX\_OFFLINE\_MEDIA\_KEY\_ID\_LEN 64 | 离线媒体密钥标识的最大长度。  **起始版本：** 11 |
| MAX\_KEY\_INFO\_COUNT 64 | 密钥信息的最大数量。  **起始版本：** 11 |
| MAX\_KEY\_ID\_LEN 16 | 密钥标识的最大长度。  **起始版本：** 11 |
| MAX\_KEY\_STATUS\_VALUE\_LEN 128 | 密钥状态值的最大长度。  **起始版本：** 11 |
| MAX\_MEDIA\_KEY\_STATUS\_COUNT 64 | 媒体密钥状态的最大数量。  **起始版本：** 11 |
| MAX\_MEDIA\_KEY\_STATUS\_NAME\_LEN 64 | 媒体密钥状态名称的最大长度。  **起始版本：** 11 |
| MAX\_MEDIA\_KEY\_STATUS\_VALUE\_LEN 256 | 媒体密钥状态值的最大长度。  **起始版本：** 11 |
| DRM\_UUID\_LEN 16 | DRM解决方案的UUID长度。  **起始版本：** 11 |
| MAX\_PSSH\_DATA\_LEN 2048 | PSSH（Protected System Specific Header）信息的最大长度。  **起始版本：** 11 |
| MAX\_PSSH\_INFO\_COUNT 8 | PSSH（Protected System Specific Header）信息的最大数量。  **起始版本：** 11 |
| MAX\_MEDIA\_KEY\_SYSTEM\_NAME\_LEN 128 | MediaKeySystem名称的最大长度。  **起始版本：** 12 |
| MAX\_MEDIA\_KEY\_SYSTEM\_NUM 8 | MediaKeySystem的最大数量。  **起始版本：** 12 |

## 枚举类型说明

PhonePC/2in1TabletTVWearable

### DRM\_EventType

PhonePC/2in1TabletTVWearable



```
1. enum DRM_EventType
```

**描述**

监听事件类型。

**系统能力：** SystemCapability.Multimedia.Drm.Core

**起始版本：** 11

展开

| 枚举项 | 描述 |
| --- | --- |
| EVENT\_DRM\_BASE = 200 | DRM基础事件。 |
| EVENT\_PROVISION\_REQUIRED = 201 | 设备证书请求事件。 |
| EVENT\_KEY\_REQUIRED = 202 | 密钥请求事件。 |
| EVENT\_KEY\_EXPIRED = 203 | 密钥过期事件。 |
| EVENT\_VENDOR\_DEFINED = 204 | DRM解决方案自定义事件。 |
| EVENT\_EXPIRATION\_UPDATE = 206 | 密钥过期更新事件。 |

### DRM\_ContentProtectionLevel

PhonePC/2in1TabletTVWearable



```
1. enum DRM_ContentProtectionLevel
```

**描述**

内容保护级别。

**系统能力：** SystemCapability.Multimedia.Drm.Core

**起始版本：** 11

展开

| 枚举项 | 描述 |
| --- | --- |
| CONTENT\_PROTECTION\_LEVEL\_UNKNOWN = 0 | 未知级别。 |
| CONTENT\_PROTECTION\_LEVEL\_SW\_CRYPTO | 软件安全级别。 |
| CONTENT\_PROTECTION\_LEVEL\_HW\_CRYPTO | 硬件安全级别。 |
| CONTENT\_PROTECTION\_LEVEL\_ENHANCED\_HW\_CRYPTO | 硬件增强级别。 |
| CONTENT\_PROTECTION\_LEVEL\_MAX | 最大安全级别。 |

### DRM\_MediaKeyType

PhonePC/2in1TabletTVWearable



```
1. enum DRM_MediaKeyType
```

**描述**

媒体密钥类型。

**系统能力：** SystemCapability.Multimedia.Drm.Core

**起始版本：** 11

展开

| 枚举项 | 描述 |
| --- | --- |
| MEDIA\_KEY\_TYPE\_OFFLINE = 0 | 离线。 |
| MEDIA\_KEY\_TYPE\_ONLINE | 在线。 |

### DRM\_MediaKeyRequestType

PhonePC/2in1TabletTVWearable



```
1. enum DRM_MediaKeyRequestType
```

**描述**

媒体密钥请求类型。

**系统能力：** SystemCapability.Multimedia.Drm.Core

**起始版本：** 11

展开

| 枚举项 | 描述 |
| --- | --- |
| MEDIA\_KEY\_REQUEST\_TYPE\_UNKNOWN = 0 | 未知请求类型。 |
| MEDIA\_KEY\_REQUEST\_TYPE\_INITIAL | 初始化请求。 |
| MEDIA\_KEY\_REQUEST\_TYPE\_RENEWAL | 续订请求。 |
| MEDIA\_KEY\_REQUEST\_TYPE\_RELEASE | 释放请求。 |
| MEDIA\_KEY\_REQUEST\_TYPE\_NONE | 无请求。 |
| MEDIA\_KEY\_REQUEST\_TYPE\_UPDATE | 更新请求。 |

### DRM\_OfflineMediaKeyStatus

PhonePC/2in1TabletTVWearable



```
1. enum DRM_OfflineMediaKeyStatus
```

**描述**

离线媒体密钥状态。

**系统能力：** SystemCapability.Multimedia.Drm.Core

**起始版本：** 11

展开

| 枚举项 | 描述 |
| --- | --- |
| OFFLINE\_MEDIA\_KEY\_STATUS\_UNKNOWN = 0 | 未知状态。 |
| OFFLINE\_MEDIA\_KEY\_STATUS\_USABLE | 可用状态。 |
| OFFLINE\_MEDIA\_KEY\_STATUS\_INACTIVE | 失活状态。 |

### DRM\_CertificateStatus

PhonePC/2in1TabletTVWearable



```
1. enum DRM_CertificateStatus
```

**描述**

设备DRM证书状态。

**系统能力：** SystemCapability.Multimedia.Drm.Core

**起始版本：** 11

展开

| 枚举项 | 描述 |
| --- | --- |
| CERT\_STATUS\_PROVISIONED = 0 | 设备已安装设备DRM证书。 |
| CERT\_STATUS\_NOT\_PROVISIONED | 设备未安装设备DRM证书或证书状态异常。 |
| CERT\_STATUS\_EXPIRED | 设备DRM证书过期。 |
| CERT\_STATUS\_INVALID | 设备DRM证书无效。 |
| CERT\_STATUS\_UNAVAILABLE | 设备DRM证书不可用。 |

## 函数说明

PhonePC/2in1TabletTVWearable

### DRM\_MediaKeySystemInfoCallback()

PhonePC/2in1TabletTVWearable



```
1. typedef void (*DRM_MediaKeySystemInfoCallback)(DRM_MediaKeySystemInfo *mediaKeySystemInfo)
```

**描述**

应用为从媒体源获取DRM信息而设置的回调。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [DRM\_MediaKeySystemInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drm-drm-mediakeysysteminfo) \*mediaKeySystemInfo | 从媒体源获取的DRM信息。 |