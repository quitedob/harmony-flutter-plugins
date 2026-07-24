## 概述

PhonePC/2in1TabletTVWearable

提供ArkWeb在Native侧获取API的接口，及基础Native API类型。

**引用文件：** <web/arkweb\_interface.h>

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
| [ArkWeb\_AnyNativeAPI](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-web-arkweb-anynativeapi) | ArkWeb\_AnyNativeAPI | 定义基础Native API类型。 |

### 枚举

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [ArkWeb\_NativeAPIVariantKind](/consumer/cn/doc/harmonyos-references/capi-arkweb-interface-h#arkweb_nativeapivariantkind) | ArkWeb\_NativeAPIVariantKind | 定义Native API的类型枚举。 |

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [ArkWeb\_AnyNativeAPI\* OH\_ArkWeb\_GetNativeAPI(ArkWeb\_NativeAPIVariantKind type)](/consumer/cn/doc/harmonyos-references/capi-arkweb-interface-h#oh_arkweb_getnativeapi) | 根据传入的API类型，获取对应的Native API结构体。 |
| [bool OH\_ArkWeb\_RegisterScrollCallback(const char\* webTag, ArkWeb\_OnScrollCallback callback, void\* userData)](/consumer/cn/doc/harmonyos-references/capi-arkweb-interface-h#oh_arkweb_registerscrollcallback) | 注册滚动事件回调。 |

## 枚举类型说明

PhonePC/2in1TabletTVWearable

### ArkWeb\_NativeAPIVariantKind

PhonePC/2in1TabletTVWearable



```
1. enum ArkWeb_NativeAPIVariantKind
```

**描述：**

定义Native API的类型枚举。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| ARKWEB\_NATIVE\_COMPONENT | component相关API类型。 |
| ARKWEB\_NATIVE\_CONTROLLER | controller相关API类型。 |
| ARKWEB\_NATIVE\_WEB\_MESSAGE\_PORT | webMessagePort相关API类型。 |
| ARKWEB\_NATIVE\_WEB\_MESSAGE | webMessage相关API类型。 |
| ARKWEB\_NATIVE\_COOKIE\_MANAGER | cookieManager相关API类型。 |
| ARKWEB\_NATIVE\_JAVASCRIPT\_VALUE | JavaScriptValue相关API类型。  **起始版本：** 18 |

## 函数说明

PhonePC/2in1TabletTVWearable

### OH\_ArkWeb\_GetNativeAPI()

PhonePC/2in1TabletTVWearable



```
1. ArkWeb_AnyNativeAPI* OH_ArkWeb_GetNativeAPI(ArkWeb_NativeAPIVariantKind type)
```

**描述：**

根据传入的API类型，获取对应的Native API结构体。

**系统能力：** SystemCapability.Web.Webview.Core

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkWeb\_NativeAPIVariantKind](/consumer/cn/doc/harmonyos-references/capi-arkweb-interface-h#arkweb_nativeapivariantkind) type | ArkWeb支持的Native API类型。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkWeb\_AnyNativeAPI](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-web-arkweb-anynativeapi)\* | 根据传入的API类型，返回对应的Native API结构体指针，结构体第一个成员为当前结构体的大小。 |

### OH\_ArkWeb\_RegisterScrollCallback()

PhonePC/2in1TabletTVWearable



```
1. bool OH_ArkWeb_RegisterScrollCallback(const char* webTag, ArkWeb_OnScrollCallback callback, void* userData)
```

**描述：**

注册组件滚动时的回调函数。

**系统能力：** SystemCapability.Web.Webview.Core

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const char\* webTag | Web组件的名称。 |
| [ArkWeb\_OnScrollCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkweb-type-h#arkweb_onscrollcallback) callback | 页面滚动时的回调函数。 |
| void\* userData | 用户自定义的数据。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| bool | 如果回调设置成功，则返回true，否则返回false。 |