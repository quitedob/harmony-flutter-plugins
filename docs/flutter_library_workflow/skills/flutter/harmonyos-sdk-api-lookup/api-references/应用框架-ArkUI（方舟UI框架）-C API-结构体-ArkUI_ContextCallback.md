

```
1. typedef struct {...} ArkUI_ContextCallback
```

## 概述

PhonePC/2in1TabletTVWearable

事件回调类型。

**起始版本：** 12

**相关模块：** [ArkUI\_NativeModule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule)

**所在头文件：** [native\_type.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| void\* userData | 自定义类型，开发者自定义类型的数据，在回调时作为参数传入。 |

### 成员函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [void (\*callback)(void\* userData)](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-contextcallback#callback) | 事件回调。 |

## 成员函数说明

PhonePC/2in1TabletTVWearable

### callback()

PhonePC/2in1TabletTVWearable



```
1. void (*callback)(void* userData)
```

**描述：**

事件回调。