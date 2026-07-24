

```
1. typedef struct {...} OH_Huks_ExternalCryptoParam
```

## 概述

PC/2in1

定义参数集合中单个参数的结构体。

**起始版本：** 22

**相关模块：** [HuksExternalCryptoTypeApi](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-huksexternalcryptotypeapi)

**所在头文件：** [native\_huks\_external\_crypto\_type.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-huks-external-crypto-type-h)

## 汇总

PC/2in1

### 成员变量

PC/2in1

展开

| 名称 | 描述 |
| --- | --- |
| uint32\_t tag | 标签值。 |
| union {  bool boolParam;  int32\_t int32Param;  uint32\_t uint32Param;  uint64\_t uint64Param;  [struct OH\_Huks\_Blob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hukstypeapi-oh-huks-blob) blob;  } | 标签内容。  boolParam：布尔类型参数。  int32Param：int32\_t类型参数。  uint32Param：uint32\_t类型参数。  uint64Param：uint64\_t类型参数。  blob：OH\_Huks\_Blob类型参数。 |