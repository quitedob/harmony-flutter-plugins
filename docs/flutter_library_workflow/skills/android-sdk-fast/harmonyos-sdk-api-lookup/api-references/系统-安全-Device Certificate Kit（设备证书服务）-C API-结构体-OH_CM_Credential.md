

```
1. typedef struct {...} OH_CM_Credential
```

## 概述

PhonePC/2in1TabletTVWearable

定义证书凭据详情的结构体类型。

**起始版本：** 22

**相关模块：** [CertManagerType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-certmanagertype)

**所在头文件：** [cm\_native\_type.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cm-native-type-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| uint32\_t isExist | 表示证书数据是否存在。 |
| char type[OH\_CM\_MAX\_LEN\_TYPE\_NAME] | 表示凭据的类型，最大长度为8字节，数据包含终止符'\0'字符。 |
| char alias[OH\_CM\_MAX\_LEN\_CERT\_ALIAS] | 表示凭据的别名，最大长度为128字节，数据包含终止符'\0'字符。 |
| char keyUri[OH\_CM\_MAX\_LEN\_URI] | 表示凭据的唯一标识，最大长度为256字节，数据包含终止符'\0'字符。 |
| uint32\_t certNum | 表示凭据中包含的证书个数。 |
| uint32\_t keyNum | 表示凭据中包含的秘钥个数。 |
| [OH\_CM\_Blob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-certmanagertype-oh-cm-blob) credData | 表示凭据二进制数据，最大长度为20480字节。 |
| [OH\_CM\_CertificatePurpose](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cm-native-type-h#oh_cm_certificatepurpose) certPurpose | 表示证书凭据的用途。 |