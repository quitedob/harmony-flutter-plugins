

```
1. typedef struct FileShare_PolicyErrorResult {...} FileShare_PolicyErrorResult
```

## 概述

PhonePC/2in1Tablet

授予或使能权限失败的URI策略结果。

**起始版本：** 12

**相关模块：** [fileShare](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-fileshare)

**所在头文件：** [oh\_file\_share.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-file-share-h)

## 汇总

PhonePC/2in1Tablet

### 成员变量

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| char \*uri | 授予或使能策略失败的URI。 |
| [FileShare\_PolicyErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-file-share-h#fileshare_policyerrorcode) code | 授予或使能策略失败的URI对应的错误码。 |
| char \*message | 授予或使能策略失败的URI对应的原因。 |