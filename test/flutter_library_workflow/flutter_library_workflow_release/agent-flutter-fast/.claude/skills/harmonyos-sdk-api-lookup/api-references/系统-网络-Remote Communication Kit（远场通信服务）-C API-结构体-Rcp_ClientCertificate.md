## 概述

PhonePC/2in1TabletTVWearable

发送到远程服务器的客户端证书，远程服务器将使用它来验证客户端的标识。

**起始版本：** 5.0.0(12)

**相关模块：** [RemoteCommunication](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview)

**所在头文件：** [rcp.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/rcp_8h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| char \* [content](/consumer/cn/doc/harmonyos-references/_rcp___client_certificate#content) | 客户端证书内容。它应采用“PEM”、“DER”或“P12”格式。 |
| char \* [filePath](/consumer/cn/doc/harmonyos-references/_rcp___client_certificate#filepath) | 客户端证书的路径。文件的格式应为“PEM”、“DER”或“P12”格式。 |
| char \* [key](/consumer/cn/doc/harmonyos-references/_rcp___client_certificate#key) | 客户端证书私钥的文件名。 |
| char \* [keyPassword](/consumer/cn/doc/harmonyos-references/_rcp___client_certificate#keypassword) | 客户端证书私钥的密码。 |
| [Rcp\_CertType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_certtype)[type](/consumer/cn/doc/harmonyos-references/_rcp___client_certificate#type) | 客户端证书类型。 |

## 结构体成员变量说明

PhonePC/2in1TabletTVWearable

### content

PhonePC/2in1TabletTVWearable



```
1. char* Rcp_ClientCertificate::content
```

**描述**

客户端证书内容。它应采用“PEM”、“DER”或“P12”格式。

### filePath

PhonePC/2in1TabletTVWearable



```
1. char* Rcp_ClientCertificate::filePath
```

**描述**

客户端证书的路径。文件的格式应为“PEM”、“DER”或“P12”格式。

### key

PhonePC/2in1TabletTVWearable



```
1. char* Rcp_ClientCertificate::key
```

**描述**

客户端证书私钥的文件名。

### keyPassword

PhonePC/2in1TabletTVWearable



```
1. char* Rcp_ClientCertificate::keyPassword
```

**描述**

客户端证书私钥的密码。

### type

PhonePC/2in1TabletTVWearable



```
1. Rcp_CertType Rcp_ClientCertificate::type
```

**描述**

客户端证书类型。