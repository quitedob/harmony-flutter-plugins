

```
1. typedef struct {...} ArkWeb_JavaScriptValueAPI
```

## 概述

PhonePC/2in1TabletTVWearable

定义了ArkWeb的JavaScriptValue接口。在调用接口之前，建议使用[ARKWEB\_MEMBER\_MISSING](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkweb-type-h#宏定义)检查函数结构体是否有对应的函数指针，避免SDK与设备ROM不匹配导致崩溃。

**起始版本：** 18

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
| [ArkWeb\_JavaScriptValuePtr (\*createJavaScriptValue)(ArkWeb\_JavaScriptValueType type, void\* data, size\_t dataLength)](/consumer/cn/doc/harmonyos-references/capi-web-arkweb-javascriptvalueapi#createjavascriptvalue) | 创建一个JavaScript值，用于返回给HTML。 |

## 成员函数说明

PhonePC/2in1TabletTVWearable

### createJavaScriptValue()

PhonePC/2in1TabletTVWearable



```
1. ArkWeb_JavaScriptValuePtr (*createJavaScriptValue)(ArkWeb_JavaScriptValueType type, void* data, size_t dataLength)
```

**描述：**

创建一个JavaScript值，用于返回给HTML。

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| ArkWeb\_JavaScriptValueType type | JavaScript值的类型。 |
| void\* data | JavaScript值的数据缓冲区。 |
| size\_t dataLength | JavaScript值的缓冲区大小。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkWeb\_JavaScriptValuePtr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-web-arkweb-javascriptvalue8h) | 创建出来的JavaScript值。 |