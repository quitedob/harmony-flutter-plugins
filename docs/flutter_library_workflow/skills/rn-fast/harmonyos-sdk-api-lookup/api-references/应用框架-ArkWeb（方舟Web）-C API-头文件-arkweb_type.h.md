## 概述

PhonePC/2in1TabletTVWearable

提供ArkWeb在Native侧的公共类型定义。

**引用文件：** <web/arkweb\_type.h>

**库：** libohweb.so

**系统能力：** SystemCapability.Web.Webview.Core

**起始版本：** 12

**相关模块：** [Web](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-web)

## 汇总

PhonePC/2in1TabletTVWearable

### 结构体

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [ArkWeb\_JavaScriptBridgeData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-web-arkweb-javascriptbridgedata) | ArkWeb\_JavaScriptBridgeData | 定义JavaScript Bridge数据的基础结构。 |
| [ArkWeb\_WebMessage\*](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-web-arkweb-webmessage8h) | ArkWeb\_WebMessagePtr | Post Message数据结构体指针。 |
| [ArkWeb\_JavaScriptValue\*](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-web-arkweb-javascriptvalue8h) | ArkWeb\_JavaScriptValuePtr | JavaScript数据结构体指针。 |
| [ArkWeb\_WebMessagePort\*](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-web-arkweb-webmessageport8h) | ArkWeb\_WebMessagePortPtr | Post Message端口结构体指针。 |
| [ArkWeb\_JavaScriptObject](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-web-arkweb-javascriptobject) | ArkWeb\_JavaScriptObject | 注入的JavaScript结构体。 |
| [ArkWeb\_ProxyMethod](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-web-arkweb-proxymethod) | ArkWeb\_ProxyMethod | 注入的Proxy方法通用结构体。 |
| [ArkWeb\_ProxyMethodWithResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-web-arkweb-proxymethodwithresult) | ArkWeb\_ProxyMethodWithResult | 注入的Proxy方法通用结构体。 |
| [ArkWeb\_ProxyObject](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-web-arkweb-proxyobject) | ArkWeb\_ProxyObject | 注入的Proxy对象通用结构体。 |
| [ArkWeb\_ProxyObjectWithResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-web-arkweb-proxyobjectwithresult) | ArkWeb\_ProxyObjectWithResult | 注入的Proxy对象通用结构体。 |
| [ArkWeb\_ControllerAPI](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-web-arkweb-controllerapi) | ArkWeb\_ControllerAPI | Controller相关的Native API结构体。在调用接口前建议通过ARKWEB\_MEMBER\_MISSING校验该函数结构体是否有对应函数指针，避免SDK与设备ROM不匹配导致crash问题。Controller相关接口需在UI线程中调用OH\_ArkWeb\_GetNativeAPI方法获取。 |
| [ArkWeb\_ComponentAPI](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-web-arkweb-componentapi) | ArkWeb\_ComponentAPI | Component相关的Native API结构体。 |
| [ArkWeb\_WebMessagePortAPI](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-web-arkweb-webmessageportapi) | ArkWeb\_WebMessagePortAPI | Post Message相关的Native API结构体。在调用接口前建议通过ARKWEB\_MEMBER\_MISSING校验该函数结构体是否有对应函数指针，避免SDK与设备ROM不匹配导致crash问题。WebMessagePort相关接口需在UI线程中调用OH\_ArkWeb\_GetNativeAPI方法获取。 |
| [ArkWeb\_WebMessageAPI](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-web-arkweb-webmessageapi) | ArkWeb\_WebMessageAPI | Post Message数据相关的Native API结构体。在调用接口前建议通过ARKWEB\_MEMBER\_MISSING校验该函数结构体是否有对应函数指针，避免SDK与设备ROM不匹配导致crash问题。WebMessage相关接口需在UI线程中调用OH\_ArkWeb\_GetNativeAPI方法获取。 |
| [ArkWeb\_CookieManagerAPI](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-web-arkweb-cookiemanagerapi) | ArkWeb\_CookieManagerAPI | 定义了ArkWeb的CookieManager接口。在调用接口之前，建议使用ARKWEB\_MEMBER\_MISSING检查函数结构体是否有对应的函数指针，避免SDK与设备ROM不匹配导致崩溃。CookieManager相关接口需在UI线程中调用OH\_ArkWeb\_GetNativeAPI方法获取。 |
| [ArkWeb\_JavaScriptValueAPI](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-web-arkweb-javascriptvalueapi) | ArkWeb\_JavaScriptValueAPI | 定义了ArkWeb的JavaScriptValue接口。在调用接口之前，建议使用ARKWEB\_MEMBER\_MISSING检查函数结构体是否有对应的函数指针，避免SDK与设备ROM不匹配导致崩溃。 |

### 枚举

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [ArkWeb\_WebMessageType](/consumer/cn/doc/harmonyos-references/capi-arkweb-type-h#arkweb_webmessagetype) | ArkWeb\_WebMessageType | Post Message数据类型。 |
| [ArkWeb\_JavaScriptValueType](/consumer/cn/doc/harmonyos-references/capi-arkweb-type-h#arkweb_javascriptvaluetype) | ArkWeb\_JavaScriptValueType | JavaScript数据类型。 |

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [typedef void (\*ArkWeb\_OnJavaScriptCallback)(const char\* webTag, const ArkWeb\_JavaScriptBridgeData\* data, void\* userData)](/consumer/cn/doc/harmonyos-references/capi-arkweb-type-h#arkweb_onjavascriptcallback) | ArkWeb\_OnJavaScriptCallback | 注入的JavaScript执行完成的回调。 |
| [typedef void (\*ArkWeb\_OnJavaScriptProxyCallback)(const char\* webTag, const ArkWeb\_JavaScriptBridgeData\* dataArray, size\_t arraySize, void\* userData)](/consumer/cn/doc/harmonyos-references/capi-arkweb-type-h#arkweb_onjavascriptproxycallback) | ArkWeb\_OnJavaScriptProxyCallback | Proxy方法被执行的回调。 |
| [typedef ArkWeb\_JavaScriptValuePtr (\*ArkWeb\_OnJavaScriptProxyCallbackWithResult)(const char\* webTag, const ArkWeb\_JavaScriptBridgeData\* dataArray, size\_t arraySize, void\* userData)](/consumer/cn/doc/harmonyos-references/capi-arkweb-type-h#arkweb_onjavascriptproxycallbackwithresult) | ArkWeb\_OnJavaScriptProxyCallbackWithResult | Proxy方法被执行的回调。 |
| [typedef void (\*ArkWeb\_OnComponentCallback)(const char\* webTag, void\* userData)](/consumer/cn/doc/harmonyos-references/capi-arkweb-type-h#arkweb_oncomponentcallback) | ArkWeb\_OnComponentCallback | 组件事件通知相关的通用回调。 |
| [typedef void (\*ArkWeb\_OnScrollCallback)(const char\* webTag, void\* userData, double x, double y)](/consumer/cn/doc/harmonyos-references/capi-arkweb-type-h#arkweb_onscrollcallback) | ArkWeb\_OnScrollCallback | 定义Web组件滚动时的回调函数的类型。 |
| [typedef void (\*ArkWeb\_OnMessageEventHandler)(const char\* webTag, const ArkWeb\_WebMessagePortPtr port, const ArkWeb\_WebMessagePtr message, void\* userData)](/consumer/cn/doc/harmonyos-references/capi-arkweb-type-h#arkweb_onmessageeventhandler) | ArkWeb\_OnMessageEventHandler | 处理HTML发送过来的Post Message数据。 |

### 宏定义

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| ARKWEB\_MEMBER\_EXISTS(s, f) ((intptr\_t) & ((s)->f) - (intptr\_t)(s) + sizeof((s)->f) <= \*reinterpret\_cast<size\_t\*>(s)) | 检查结构体中是否存在该成员变量。  **起始版本：** 12 |
| ARKWEB\_MEMBER\_MISSING(s, f) (!ARKWEB\_MEMBER\_EXISTS(s, f) || !((s)->f)) | 当前结构体存在该成员变量则返回false，否则返回true  **起始版本：** 12 |

## 枚举类型说明

PhonePC/2in1TabletTVWearable

### ArkWeb\_WebMessageType

PhonePC/2in1TabletTVWearable



```
1. enum ArkWeb_WebMessageType
```

**描述**

Post Message数据类型。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| ARKWEB\_NONE = 0 | 错误数据。 |
| ARKWEB\_STRING | 字符串数据类型。 |
| ARKWEB\_BUFFER | 字节流数据类型。 |

### ArkWeb\_JavaScriptValueType

PhonePC/2in1TabletTVWearable



```
1. enum ArkWeb_JavaScriptValueType
```

**描述**

JavaScript数据类型。

**起始版本：** 18

展开

| 枚举项 | 描述 |
| --- | --- |
| ARKWEB\_JAVASCRIPT\_NONE = 0 | 错误数据。 |
| ARKWEB\_JAVASCRIPT\_STRING | 字符串数据类型。 |
| ARKWEB\_JAVASCRIPT\_BOOL | bool数据类型。 |

## 函数说明

PhonePC/2in1TabletTVWearable

### ArkWeb\_OnJavaScriptCallback()

PhonePC/2in1TabletTVWearable



```
1. typedef void (*ArkWeb_OnJavaScriptCallback)(const char* webTag, const ArkWeb_JavaScriptBridgeData* data, void* userData)
```

**描述**

注入的JavaScript执行完成的回调。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const char\* webTag | Web组件名称。 |
| const [ArkWeb\_JavaScriptBridgeData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-web-arkweb-javascriptbridgedata)\* data | JavaScriptBridge数据。 |
| void\* userData | 用户自定义的数据。 |

### ArkWeb\_OnJavaScriptProxyCallback()

PhonePC/2in1TabletTVWearable



```
1. typedef void (*ArkWeb_OnJavaScriptProxyCallback)(const char* webTag, const ArkWeb_JavaScriptBridgeData* dataArray, size_t arraySize, void* userData)
```

**描述**

Proxy方法被执行的回调。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const char\* webTag | Web组件名称。 |
| const [ArkWeb\_JavaScriptBridgeData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-web-arkweb-javascriptbridgedata)\* dataArray | 数组数据。 |
| size\_t arraySize | 数组大小。 |
| void\* userData | 用户自定义的数据。 |

### ArkWeb\_OnJavaScriptProxyCallbackWithResult()

PhonePC/2in1TabletTVWearable



```
1. typedef ArkWeb_JavaScriptValuePtr (*ArkWeb_OnJavaScriptProxyCallbackWithResult)(const char* webTag, const ArkWeb_JavaScriptBridgeData* dataArray, size_t arraySize, void* userData)
```

**描述**

Proxy方法被执行的回调。

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const char\* webTag | Web组件名称。 |
| const [ArkWeb\_JavaScriptBridgeData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-web-arkweb-javascriptbridgedata)\* dataArray | 数组数据。 |
| size\_t arraySize | 数组大小。 |
| void\* userData | 用户自定义的数据。 |

### ArkWeb\_OnComponentCallback()

PhonePC/2in1TabletTVWearable



```
1. typedef void (*ArkWeb_OnComponentCallback)(const char* webTag, void* userData)
```

**描述**

组件事件通知相关的通用回调。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const char\* webTag | Web组件名称。 |
| void\* userData | 用户自定义的数据。 |

### ArkWeb\_OnScrollCallback()

PhonePC/2in1TabletTVWearable



```
1. typedef void (*ArkWeb_OnScrollCallback)(const char* webTag, void* userData, double x, double y)
```

**描述**

定义Web组件滚动时的回调函数的类型。

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const char\* webTag | Web组件名称。 |
| void\* userData | 用户自定义的数据。 |
| double x | X轴滚动偏移。 |
| double y | Y轴滚动偏移。 |

### ArkWeb\_OnMessageEventHandler()

PhonePC/2in1TabletTVWearable



```
1. typedef void (*ArkWeb_OnMessageEventHandler)(const char* webTag, const ArkWeb_WebMessagePortPtr port, const ArkWeb_WebMessagePtr message, void* userData)
```

**描述**

处理HTML发送过来的Post Message数据。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const char\* webTag | Web组件名称。 |
| const [ArkWeb\_WebMessagePortPtr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-web-arkweb-webmessageport8h) port | Post Message端口。 |
| const [ArkWeb\_WebMessagePtr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-web-arkweb-webmessage8h) message | Post Message数据。 |
| void\* userData | 用户自定义数据。 |