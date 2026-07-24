## 概述

PhonePC/2in1TabletTVWearable

声明管理进程访问控制的接口。

**库：** ability\_access\_control.so

**引用文件：** <accesstoken/ability\_access\_control.h>

**系统能力：** SystemCapability.Security.AccessToken

**起始版本：** 12

**相关模块：** [AbilityAccessControl](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-abilityaccesscontrol)

## 汇总

PhonePC/2in1TabletTVWearable

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [bool OH\_AT\_CheckSelfPermission(const char \*permission)](/consumer/cn/doc/harmonyos-references/capi-ability-access-control-h#oh_at_checkselfpermission) | 校验应用是否被授予指定的权限。 |

## 函数说明

PhonePC/2in1TabletTVWearable

### OH\_AT\_CheckSelfPermission()

PhonePC/2in1TabletTVWearable



```
1. bool OH_AT_CheckSelfPermission(const char *permission)
```

**描述**

校验应用是否被授予指定的权限。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const char \*permission | 需要校验的权限名称，合法的权限名取值可在应用权限列表中查询。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| bool | true：应用已经被授予该权限。  false：应用未被授予该权限。 |