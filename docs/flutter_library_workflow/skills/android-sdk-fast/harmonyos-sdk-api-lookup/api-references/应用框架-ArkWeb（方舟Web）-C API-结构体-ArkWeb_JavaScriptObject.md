

```
1. typedef struct {...} ArkWeb_JavaScriptObject
```

## 概述

PhonePC/2in1TabletTVWearable

注入的JavaScript结构体。

**起始版本：** 12

**相关模块：** [Web](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-web)

**所在头文件：** [arkweb\_type.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkweb-type-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| const uint8\_t\* buffer | 注入的JavaScript代码。 |
| size\_t size | JavaScript代码长度。 |
| [ArkWeb\_OnJavaScriptCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkweb-type-h#arkweb_onjavascriptcallback) callback | JavaScript执行完成的回调。 |
| void\* userData | 需要在回调中携带的自定义数据。 |