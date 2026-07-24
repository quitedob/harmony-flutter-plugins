

```
1. typedef struct MediaKeySession_Callback {...} MediaKeySession_Callback
```

## 概述

PhonePC/2in1TabletTVWearable

MediaKeySession\_Callback结构体，用于监听密钥过期、密钥更改等事件，不返回媒体密钥会话实例，适用于单媒体密钥会话解密场景。

**起始版本：** 11

**相关模块：** [Drm](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drm)

**所在头文件：** [native\_mediakeysession.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-mediakeysession-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [MediaKeySession\_EventCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-mediakeysession-h#mediakeysession_eventcallback) eventCallback | 正常事件回调，如密钥过期等。 |
| [MediaKeySession\_KeyChangeCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-mediakeysession-h#mediakeysession_keychangecallback) keyChangeCallback | 密钥更改事件的密钥更改回调。 |