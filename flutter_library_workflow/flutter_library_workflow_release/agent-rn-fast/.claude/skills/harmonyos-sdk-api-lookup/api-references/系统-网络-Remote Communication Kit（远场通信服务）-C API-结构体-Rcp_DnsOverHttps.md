## 概述

PhonePC/2in1TabletTVWearable

HTTPS上的DNS配置如果设置，则首选由DOH dns服务器解析的地址。

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
| const char \* [url](/consumer/cn/doc/harmonyos-references/_rcp___dns_over_https#url) | DOH服务器的URL。 |
| bool [skipCertificatesValidation](/consumer/cn/doc/harmonyos-references/_rcp___dns_over_https#skipcertificatesvalidation) | 判断是否跳过证书验证。默认值为false。 |

## 结构体成员变量说明

PhonePC/2in1TabletTVWearable

### skipCertificatesValidation

PhonePC/2in1TabletTVWearable



```
1. bool Rcp_DnsOverHttps::skipCertificatesValidation
```

**描述**

判断是否跳过证书验证。默认值为false。

### url

PhonePC/2in1TabletTVWearable



```
1. const char* Rcp_DnsOverHttps::url
```

**描述**

DOH服务器的URL。