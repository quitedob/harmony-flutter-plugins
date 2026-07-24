## 概述

PhonePC/2in1TabletTVWearable

传输配置。

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
| bool [autoRedirect](/consumer/cn/doc/harmonyos-references/_rcp___transfer_configuration#autoredirect) | 是否自动遵循HTTP重定向响应。默认为True。 |
| [Rcp\_Timeout](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___timeout)[timeout](/consumer/cn/doc/harmonyos-references/_rcp___transfer_configuration#timeout) | 超时配置。如果未设置此选项，将应用默认超时。 |
| bool [assumesHTTP3Capable](/consumer/cn/doc/harmonyos-references/_rcp___transfer_configuration#assumeshttp3capable) | 是否假定目标服务器支持HTTP/3。默认值为false。 |
| [Rcp\_PathPreference](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_pathpreference)[pathPreference](/consumer/cn/doc/harmonyos-references/_rcp___transfer_configuration#pathpreference) | 请求路径首选项。 |

## 结构体成员变量说明

PhonePC/2in1TabletTVWearable

### assumesHTTP3Capable

PhonePC/2in1TabletTVWearable



```
1. bool Rcp_TransferConfiguration::assumesHTTP3Capable
```

**描述**

是否假定目标服务器支持HTTP/3。默认值为false。

### autoRedirect

PhonePC/2in1TabletTVWearable



```
1. bool Rcp_TransferConfiguration::autoRedirect
```

**描述**

是否自动遵循HTTP重定向响应。默认为True。

### pathPreference

PhonePC/2in1TabletTVWearable



```
1. Rcp_PathPreference Rcp_TransferConfiguration::pathPreference
```

**描述**

请求路径首选项。

### timeout

PhonePC/2in1TabletTVWearable



```
1. Rcp_Timeout Rcp_TransferConfiguration::timeout
```

**描述**

超时配置。如果未设置此选项，将应用默认超时。如果已配置，则使用配置的超时时间。