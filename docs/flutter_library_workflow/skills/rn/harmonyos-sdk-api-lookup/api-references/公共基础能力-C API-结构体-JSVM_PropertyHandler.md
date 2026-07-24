

```
1. typedef struct {...} JSVM_PropertyHandler
```

## 概述

PhonePC/2in1TabletWearable

包含将class作为函数进行调用时所触发的回调函数的函数指针，以及访问实例对象属性时触发的回调函数的函数指针集。

**起始版本：** 18

**相关模块：** [JSVM](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-jsvm)

**所在头文件：** [jsvm\_types.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-jsvm-types-h)

## 汇总

PhonePC/2in1TabletWearable

### 成员变量

PhonePC/2in1TabletWearable

展开

| 名称 | 描述 |
| --- | --- |
| [JSVM\_PropertyHandlerCfg](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-jsvm-jsvm-propertyhandlerconfigurationstruct8h) propertyHandlerCfg | 访问实例对象属性触发相应的回调函数。 |
| [JSVM\_Callback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-jsvm-jsvm-callbackstruct8h) callAsFunctionCallback | 实例对象作为函数调用将触发此回调。 |