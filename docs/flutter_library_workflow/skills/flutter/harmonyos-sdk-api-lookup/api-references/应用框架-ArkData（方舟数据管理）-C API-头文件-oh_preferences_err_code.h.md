## 概述

PhonePC/2in1TabletTVWearable

声明首选项模块统一使用的错误码信息。

**引用文件：** <database/preferences/oh\_preferences\_err\_code.h>

**库：** libohpreferences.so

**系统能力：** SystemCapability.DistributedDataManager.Preferences.Core

**起始版本：** 13

**相关模块：** [Preferences](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-preferences)

## 汇总

PhonePC/2in1TabletTVWearable

### 枚举

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [OH\_Preferences\_ErrCode](/consumer/cn/doc/harmonyos-references/capi-oh-preferences-err-code-h#oh_preferences_errcode) | OH\_Preferences\_ErrCode | 错误码信息。 |

## 枚举类型说明

PhonePC/2in1TabletTVWearable

### OH\_Preferences\_ErrCode

PhonePC/2in1TabletTVWearable



```
1. enum OH_Preferences_ErrCode
```

**描述**

错误码信息。

**起始版本：** 13

展开

| 枚举项 | 描述 |
| --- | --- |
| PREFERENCES\_OK = 0 | 操作执行成功。 |
| PREFERENCES\_ERROR\_INVALID\_PARAM = 401 | 参数不合法。 |
| PREFERENCES\_ERROR\_NOT\_SUPPORTED = 801 | 系统能力不支持。 |
| PREFERENCES\_ERROR\_BASE = 15500000 | 基准错误码。 |
| PREFERENCES\_ERROR\_DELETE\_FILE = 15500010 | 删除文件失败。 |
| PREFERENCES\_ERROR\_STORAGE = 15500011 | 存储异常。 |
| PREFERENCES\_ERROR\_MALLOC = 15500012 | 申请内存失败。 |
| PREFERENCES\_ERROR\_KEY\_NOT\_FOUND = 15500013 | Key不存在。 |
| PREFERENCES\_ERROR\_GET\_DATAOBSMGRCLIENT = 15500019 | 获取数据变更订阅服务失败。 |