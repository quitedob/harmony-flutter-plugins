

```
1. typedef struct OH_Huks_ExternalCryptoParamSet {...} OH_Huks_ExternalCryptoParamSet
```

## 概述

PC/2in1

定义外部加密参数集合的结构。

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
| uint32\_t paramSetSize | 参数集合所占内存大小，单位：Byte。  **起始版本：** 22 |
| uint32\_t paramsCnt | 参数集合中的参数数量。  **起始版本：** 22 |
| [OH\_Huks\_ExternalCryptoParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/sexternalcryptotypeapi-oh-huks-externalcryptoparam) params[] | 参数数组，大小由paramSetSize与paramsCnt决定。  **起始版本：** 22 |