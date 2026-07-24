## 概述

PhonePC/2in1TabletTVWearable

定义SSL/TLS证书链校验模块的C接口需要的数据结构。

**引用文件：** <network/netstack/net\_ssl/net\_ssl\_c\_type.h>

**库：** libnet\_ssl.so

**系统能力：** SystemCapability.Communication.NetStack

**起始版本：** 11

**相关模块：** [netstack](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack)

## 汇总

PhonePC/2in1TabletTVWearable

### 结构体

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [NetStack\_CertBlob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack-netstack-certblob) | - | 证书数据结构体。 |
| [NetStack\_CertificatePinning](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack-netstack-certificatepinning) | NetStack\_CertificatePinning | 定义证书锁定信息。 |
| [NetStack\_Certificates](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack-netstack-certificates) | NetStack\_Certificates | 定义证书信息。 |

### 枚举

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [NetStack\_CertType](/consumer/cn/doc/harmonyos-references/capi-net-ssl-c-type-h#netstack_certtype) | - | 证书类型枚举。 |
| [NetStack\_CertificatePinningKind](/consumer/cn/doc/harmonyos-references/capi-net-ssl-c-type-h#netstack_certificatepinningkind) | NetStack\_CertificatePinningKind | 定义证书锁定类型枚举。 |
| [NetStack\_HashAlgorithm](/consumer/cn/doc/harmonyos-references/capi-net-ssl-c-type-h#netstack_hashalgorithm) | NetStack\_HashAlgorithm | 定义哈希算法。 |

## 枚举类型说明

PhonePC/2in1TabletTVWearable

### NetStack\_CertType

PhonePC/2in1TabletTVWearable



```
1. enum NetStack_CertType
```

**描述**

证书类型枚举。

**起始版本：** 11

展开

| 枚举项 | 描述 |
| --- | --- |
| NETSTACK\_CERT\_TYPE\_PEM = 0 | PEM证书类型 |
| NETSTACK\_CERT\_TYPE\_DER = 1 | DER证书类型 |
| NETSTACK\_CERT\_TYPE\_INVALID | 错误证书类型 |

### NetStack\_CertificatePinningKind

PhonePC/2in1TabletTVWearable



```
1. enum NetStack_CertificatePinningKind
```

**描述**

定义证书锁定类型枚举。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| PUBLIC\_KEY | 公钥锁定类型 |

### NetStack\_HashAlgorithm

PhonePC/2in1TabletTVWearable



```
1. enum NetStack_HashAlgorithm
```

**描述**

定义哈希算法。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| SHA\_256 | Sha256 |