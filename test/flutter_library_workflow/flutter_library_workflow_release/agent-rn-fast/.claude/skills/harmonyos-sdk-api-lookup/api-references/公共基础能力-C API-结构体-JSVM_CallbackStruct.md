

```
1. typedef struct {...} JSVM_CallbackStruct
```

## 概述

PhonePC/2in1TabletWearable

用户提供的Native回调函数的指针和数据，这些函数通过JSVM-API接口暴露给JavaScript。

**起始版本：** 11

**相关模块：** [JSVM](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-jsvm)

**所在头文件：** [jsvm\_types.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-jsvm-types-h)

## 汇总

PhonePC/2in1TabletWearable

### 成员变量

PhonePC/2in1TabletWearable

展开

| 名称 | 描述 |
| --- | --- |
| void\* data | 用户提供的Native回调函数的数据。 |

### 成员函数

PhonePC/2in1TabletWearable

展开

| 名称 | 描述 |
| --- | --- |
| [JSVM\_Value(JSVM\_CDECL\* callback)(JSVM\_Env env,JSVM\_CallbackInfo info)](/consumer/cn/doc/harmonyos-references/capi-jsvm-jsvm-callbackstruct#callback) | 用户提供的Native回调函数的指针。 |

## 成员函数说明

PhonePC/2in1TabletWearable

### callback()

PhonePC/2in1TabletWearable



```
1. JSVM_Value(JSVM_CDECL* callback)(JSVM_Env env,JSVM_CallbackInfo info)
```

**描述**

用户提供的Native回调函数的指针。