## 概述

PhonePC/2in1TabletTVWearable

定义DRM错误码。

**引用文件：** <multimedia/drm\_framework/native\_drm\_err.h>

**库：** libnative\_drm.so

**系统能力：** SystemCapability.Multimedia.Drm.Core

**起始版本：** 11

**相关模块：** [Drm](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drm)

## 汇总

PhonePC/2in1TabletTVWearable

### 枚举

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [Drm\_ErrCode](/consumer/cn/doc/harmonyos-references/capi-native-drm-err-h#drm_errcode) | Drm\_ErrCode | DRM错误码。 |

## 枚举类型说明

PhonePC/2in1TabletTVWearable

### Drm\_ErrCode

PhonePC/2in1TabletTVWearable



```
1. enum Drm_ErrCode
```

**描述**

DRM错误码。

**系统能力：** SystemCapability.Multimedia.Drm.Core

**起始版本：** 11

展开

| 枚举项 | 描述 |
| --- | --- |
| DRM\_ERR\_OK = 0 | 操作成功完成。 |
| DRM\_CAPI\_ERR\_BASE = 24700500 | 基础错误。 |
| DRM\_ERR\_NO\_MEMORY = DRM\_CAPI\_ERR\_BASE + 1 | 内存不足。 |
| DRM\_ERR\_OPERATION\_NOT\_PERMITTED = DRM\_CAPI\_ERR\_BASE + 2 | 不支持的操作。 |
| DRM\_ERR\_INVALID\_VAL = DRM\_CAPI\_ERR\_BASE + 3 | 无效参数。 |
| DRM\_ERR\_IO = DRM\_CAPI\_ERR\_BASE + 4 | IO错误。 |
| DRM\_ERR\_TIMEOUT = DRM\_CAPI\_ERR\_BASE + 5 | 网络超时。 |
| DRM\_ERR\_UNKNOWN = DRM\_CAPI\_ERR\_BASE + 6 | 未知错误。 |
| DRM\_ERR\_SERVICE\_DIED = DRM\_CAPI\_ERR\_BASE + 7 | DRM服务死亡。 |
| DRM\_ERR\_INVALID\_STATE = DRM\_CAPI\_ERR\_BASE + 8 | 无效的操作状态。 |
| DRM\_ERR\_UNSUPPORTED = DRM\_CAPI\_ERR\_BASE + 9 | 不支持的操作。 |
| DRM\_ERR\_MAX\_SYSTEM\_NUM\_REACHED = DRM\_CAPI\_ERR\_BASE + 10 | MediaKeySystem最大实例数。 |
| DRM\_ERR\_MAX\_SESSION\_NUM\_REACHED = DRM\_CAPI\_ERR\_BASE + 11 | MediaKeySession最大实例数。 |
| DRM\_ERR\_EXTEND\_START = DRM\_CAPI\_ERR\_BASE + 100 | 扩展错误。 |