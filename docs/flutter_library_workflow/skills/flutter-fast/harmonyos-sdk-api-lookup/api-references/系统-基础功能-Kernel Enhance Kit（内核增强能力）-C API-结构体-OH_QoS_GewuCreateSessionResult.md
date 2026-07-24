

```
1. typedef struct { ... } OH_QoS_GewuCreateSessionResult
```

## 概述

PhonePC/2in1TabletTVWearable

OH\_QoS\_GewuCreateSession()接口的返回结果，成功时返回创建的 session，失败时 error 会置为对应的错误码 。

**起始版本：** 20

**相关模块：** [QoS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-qos)

**所在头文件：** [qos.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-qos-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [OH\_QoS\_GewuSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-qos-h#变量) session | 创建出来的会话句柄 |
| [OH\_QoS\_GewuErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-qos-h#oh_qos_gewuerrorcode) error | 错误码- 创建会话成功返回OH\_QOS\_GEWU\_OK。- 由于没有足够的内存而创建会话失败返回OH\_QOS\_GEWU\_NOMEM。 |