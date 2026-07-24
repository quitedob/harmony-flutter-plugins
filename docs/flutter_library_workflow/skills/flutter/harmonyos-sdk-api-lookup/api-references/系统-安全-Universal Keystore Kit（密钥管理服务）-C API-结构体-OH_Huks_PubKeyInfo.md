

```
1. struct OH_Huks_PubKeyInfo {...}
```

## 概述

PhonePC/2in1TabletTVWearable

定义公钥信息的结构体类型。

**起始版本：** 9

**相关模块：** [HuksTypeApi](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hukstypeapi)

**所在头文件：** [native\_huks\_type.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-huks-type-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| enum [OH\_Huks\_KeyAlg](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-huks-type-h#oh_huks_keyalg) keyAlg | 公钥的算法类型。 |
| uint32\_t keySize | 公钥的长度。 |
| uint32\_t nOrXSize | n或X值的长度。 |
| uint32\_t eOrYSize | e或Y值的长度。 |
| uint32\_t placeHolder | 占位符大小。 |