

```
1. typedef struct {...} ArkWeb_WebMessageAPI
```

## 概述

PhonePC/2in1TabletTVWearable

Post Message数据相关的Native API结构体。在调用接口前建议通过[ARKWEB\_MEMBER\_MISSING](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkweb-type-h#宏定义)校验该函数结构体是否有对应函数指针，避免SDK与设备ROM不匹配导致crash问题。WebMessage相关接口需在UI线程中调用OH\_ArkWeb\_GetNativeAPI方法获取。

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
| size\_t size | 结构体的大小。 |

### 成员函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [ArkWeb\_WebMessagePtr (\*createWebMessage)()](/consumer/cn/doc/harmonyos-references/capi-web-arkweb-webmessageapi#createwebmessage) | 创建消息。 |
| [void (\*destroyWebMessage)(ArkWeb\_WebMessagePtr\* webMessage)](/consumer/cn/doc/harmonyos-references/capi-web-arkweb-webmessageapi#destroywebmessage) | 销毁消息。 |
| [void (\*setType)(ArkWeb\_WebMessagePtr webMessage, ArkWeb\_WebMessageType type)](/consumer/cn/doc/harmonyos-references/capi-web-arkweb-webmessageapi#settype) | 设置消息类型。 |
| [ArkWeb\_WebMessageType (\*getType)(ArkWeb\_WebMessagePtr webMessage)](/consumer/cn/doc/harmonyos-references/capi-web-arkweb-webmessageapi#gettype) | 获取消息类型。 |
| [void (\*setData)(ArkWeb\_WebMessagePtr webMessage, void\* data, size\_t dataLength)](/consumer/cn/doc/harmonyos-references/capi-web-arkweb-webmessageapi#setdata) | 设置数据。 |
| [void\* (\*getData)(ArkWeb\_WebMessagePtr webMessage, size\_t\* dataLength)](/consumer/cn/doc/harmonyos-references/capi-web-arkweb-webmessageapi#getdata) | 获取数据。 |

## 成员函数说明

PhonePC/2in1TabletTVWearable

### createWebMessage()

PhonePC/2in1TabletTVWearable



```
1. ArkWeb_WebMessagePtr (*createWebMessage)()
```

**描述**

创建消息。

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkWeb\_WebMessagePtr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-web-arkweb-webmessage8h) | 消息结构体。 |

### destroyWebMessage()

PhonePC/2in1TabletTVWearable



```
1. void (*destroyWebMessage)(ArkWeb_WebMessagePtr* webMessage)
```

**描述**

销毁消息。

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkWeb\_WebMessagePtr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-web-arkweb-webmessage8h)\* webMessage | 需要销毁的消息。 |

### setType()

PhonePC/2in1TabletTVWearable



```
1. void (*setType)(ArkWeb_WebMessagePtr webMessage, ArkWeb_WebMessageType type)
```

**描述**

设置消息类型。

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkWeb\_WebMessagePtr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-web-arkweb-webmessage8h) webMessage | 消息结构体指针。 |
| [ArkWeb\_WebMessageType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkweb-type-h#arkweb_webmessagetype) type | 消息类型。 |

### getType()

PhonePC/2in1TabletTVWearable



```
1. ArkWeb_WebMessageType (*getType)(ArkWeb_WebMessagePtr webMessage)
```

**描述**

获取消息类型。

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkWeb\_WebMessagePtr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-web-arkweb-webmessage8h) webMessage | 消息结构体指针。 |

### setData()

PhonePC/2in1TabletTVWearable



```
1. void (*setData)(ArkWeb_WebMessagePtr webMessage, void* data, size_t dataLength)
```

**描述**

设置数据。

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkWeb\_WebMessagePtr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-web-arkweb-webmessage8h) webMessage | 消息结构体指针。 |
| void\* data | 数据指针。 |
| size\_t dataLength | 数据长度。 |

### getData()

PhonePC/2in1TabletTVWearable



```
1. void* (*getData)(ArkWeb_WebMessagePtr webMessage, size_t* dataLength)
```

**描述**

获取数据。

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkWeb\_WebMessagePtr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-web-arkweb-webmessage8h) webMessage | 消息结构体指针。 |
| size\_t\* dataLength | 出参，数据长度。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| void\* | 数据指针。 |