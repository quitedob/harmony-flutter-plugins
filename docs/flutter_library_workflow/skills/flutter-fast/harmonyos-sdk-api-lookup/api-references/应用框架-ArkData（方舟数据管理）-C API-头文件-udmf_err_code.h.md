## 概述

PhonePC/2in1TabletTV

声明统一数据管理框架错误码信息。

**引用文件：** <database/udmf/udmf\_err\_code.h>

**库：** libudmf.so

**系统能力：** SystemCapability.DistributedDataManager.UDMF.Core

**起始版本：** 12

**相关模块：** [UDMF](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf)

## 汇总

PhonePC/2in1TabletTV

### 枚举

PhonePC/2in1TabletTV

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [Udmf\_ErrCode](/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode) | Udmf\_ErrCode | 错误码信息。 |
| [Udmf\_ListenerStatus](/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_listenerstatus) | Udmf\_ListenerStatus | 异步获取数据时的状态码枚举。 |

## 枚举类型说明

PhonePC/2in1TabletTV

### Udmf\_ErrCode

PhonePC/2in1TabletTV



```
1. enum Udmf_ErrCode
```

**描述**

错误码信息。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| UDMF\_E\_OK = 0 | 执行成功。 |
| UDMF\_ERR = 20400000 | 通用错误码。 |
| UDMF\_E\_INVALID\_PARAM = (UDMF\_ERR + 1) | 非法参数。 |

### Udmf\_ListenerStatus

PhonePC/2in1TabletTV



```
1. enum Udmf_ListenerStatus
```

**描述**

异步获取数据时的状态码枚举。

**起始版本：** 15

展开

| 枚举项 | 描述 |
| --- | --- |
| UDMF\_FINISHED = 0 | 表示获取数据成功。 |
| UDMF\_PROCESSING | 表示正在处理中。 |
| UDMF\_CANCELED | 表示本次任务已被取消。 |
| UDMF\_INNER\_ERROR = 200 | 表示有内部错误发生。 |
| UDMF\_INVALID\_PARAMETERS | 表示包含无效参数。 |
| UDMF\_DATA\_NOT\_FOUND | 表示没有获取到数据。 |
| UDMF\_SYNC\_FAILED | 表示同步数据过程中出现错误。 |
| UDMF\_COPY\_FILE\_FAILED | 表示文件拷贝过程中出现错误。 |