## 概述

PC/2in1

SecurityAntivirus模块用于管理三方病毒防护服务应用。

**系统能力：** SystemCapability.Security.SecurityAntivirus

**起始版本：** 6.0.0(20)

## 汇总

PC/2in1

### 文件

PC/2in1

展开

| 名称 | 描述 |
| --- | --- |
| [security\_antivirus.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-capi-security-antivirus-8h) | 定义病毒防护服务应用调用的API接口。 |

### 结构体

PC/2in1

展开

| 名称 | 描述 |
| --- | --- |
| struct [SecurityAntivirus\_Antivirus](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-capi-structs-securityantivirus) | 定义病毒防护服务应用信息，包含包名、当前版本号、上次更新时间、病毒防护开关状态、用户ID。 |

### 枚举

PC/2in1

展开

| 名称 | 描述 |
| --- | --- |
| [SecurityAntivirus\_ErrCode](/consumer/cn/doc/harmonyos-references/devicesecurity-capi-securityantivirus#securityantivirus_errcode){  SECURITY\_ANTIVIRUS\_SUCCESS = 0,  SECURITY\_ANTIVIRUS\_PERMISSION\_NOT\_GRANTED = 201,  SECURITY\_ANTIVIRUS\_PARAM\_INVALID = 1019900001,  SECURITY\_ANTIVIRUS\_NO\_REGISTER = 1019900002,  SECURITY\_ANTIVIRUS\_INNER\_ERROR = 1019900003  } | 定义病毒防护服务管理错误码。 |

### 函数

PC/2in1

展开

| 名称 | 描述 |
| --- | --- |
| SecurityAntivirus\_ErrCode [HMS\_SecurityAntivirus\_RegisterAntivirus](/consumer/cn/doc/harmonyos-references/devicesecurity-capi-securityantivirus#hms_securityantivirus_registerantivirus)(const char\* bundleName) | 三方EDR（Endpoint Detection and Response）应用向HarmonyOS安全防护服务注册。 |
| SecurityAntivirus\_ErrCode [HMS\_SecurityAntivirus\_UnregisterAntivirus](/consumer/cn/doc/harmonyos-references/devicesecurity-capi-securityantivirus#hms_securityantivirus_unregisterantivirus)(const char\* bundleName) | 三方EDR应用从HarmonyOS安全防护服务注销。 |
| SecurityAntivirus\_ErrCode [HMS\_SecurityAntivirus\_UpdateAntivirus](/consumer/cn/doc/harmonyos-references/devicesecurity-capi-securityantivirus#hms_securityantivirus_updateantivirus)(const [SecurityAntivirus\_Antivirus](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-capi-structs-securityantivirus)\* antivirus) | 三方EDR应用向HarmonyOS安全防护服务更新自身应用信息，包含包名、当前版本号、上次更新时间、病毒防护开关状态、用户ID。 |
| SecurityAntivirus\_ErrCode [HMS\_SecurityAntivirus\_QueryAntivirus](/consumer/cn/doc/harmonyos-references/devicesecurity-capi-securityantivirus#hms_securityantivirus_queryantivirus)([SecurityAntivirus\_Antivirus](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-capi-structs-securityantivirus)\*\* list, uint32\_t\* length) | 零信任应用向HarmonyOS安全防护服务查询所有三方EDR注册信息。 |
| SecurityAntivirus\_ErrCode [HMS\_SecurityAntivirus\_QueryPreinstalledAntivirus](/consumer/cn/doc/harmonyos-references/devicesecurity-capi-securityantivirus#hms_securityantivirus_querypreinstalledantivirus)([SecurityAntivirus\_Antivirus](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-capi-structs-securityantivirus)\*\* list, uint32\_t\* length) | MDM（Mobile Device Management）应用向HarmonyOS安全防护服务查询所有用户的防病毒功能状态。 |
| SecurityAntivirus\_ErrCode [HMS\_SecurityAntivirus\_EnablePreinstalledAntivirus](/consumer/cn/doc/harmonyos-references/devicesecurity-capi-securityantivirus#hms_securityantivirus_enablepreinstalledantivirus)(void) | MDM应用启用HarmonyOS安全防护服务所有用户的防病毒功能。 |
| SecurityAntivirus\_ErrCode [HMS\_SecurityAntivirus\_DisablePreinstalledAntivirus](/consumer/cn/doc/harmonyos-references/devicesecurity-capi-securityantivirus#hms_securityantivirus_disablepreinstalledantivirus)(void) | MDM应用禁用HarmonyOS安全防护服务所有用户的防病毒功能。 |
| SecurityAntivirus\_ErrCode [HMS\_SecurityAntivirus\_EnablePreinstalledAntivirusByAccount](/consumer/cn/doc/harmonyos-references/devicesecurity-capi-securityantivirus#hms_securityantivirus_enablepreinstalledantivirusbyaccount)(int32\_t accountId) | MDM应用启用HarmonyOS安全防护服务中用户ID为accountId的防病毒功能。 |
| SecurityAntivirus\_ErrCode [HMS\_SecurityAntivirus\_DisablePreinstalledAntivirusByAccount](/consumer/cn/doc/harmonyos-references/devicesecurity-capi-securityantivirus#hms_securityantivirus_disablepreinstalledantivirusbyaccount)(int32\_t accountId) | MDM应用禁用HarmonyOS安全防护服务中用户ID为accountId的防病毒功能。 |

## 枚举类型说明

PC/2in1

### SecurityAntivirus\_ErrCode

PC/2in1



```
1. enum SecurityAntivirus_ErrCode
```

**描述**

定义病毒防护服务管理错误码。

**系统能力：** SystemCapability.Security.SecurityAntivirus

**起始版本：** 6.0.0(20)

**参数:**

展开

| 名称 | 描述 |
| --- | --- |
| SECURITY\_ANTIVIRUS\_SUCCESS | 接口调用成功。 |
| SECURITY\_ANTIVIRUS\_PERMISSION\_NOT\_GRANTED | 接口调用权限校验失败。 |
| SECURITY\_ANTIVIRUS\_PARAM\_INVALID | 接口入参校验失败。 |
| SECURITY\_ANTIVIRUS\_NO\_REGISTER | 安全防病毒应用未注册。 |
| SECURITY\_ANTIVIRUS\_INNER\_ERROR | HarmonyOS安全防护服务出现内部错误。 |

## 函数说明

PC/2in1

### HMS\_SecurityAntivirus\_RegisterAntivirus()

PC/2in1



```
1. SecurityAntivirus_ErrCode HMS_SecurityAntivirus_RegisterAntivirus(const char* bundleName)
```

**描述**

三方EDR应用向HarmonyOS安全防护服务注册。

**起始版本：** 6.0.0(20)

**参数:**

展开

| 名称 | 描述 |
| --- | --- |
| const char\* bundleName | 三方EDR包名。 |

**Permission:**

ohos.permission.REGISTER\_ANTIVIRUS

**返回：**

函数执行结果。返回值说明：如果操作成功，则返回0。如果权限验证失败，则返回201。如果传入参数不符合规范，则返回1019900001。如果HarmonyOS安全防护服务发生内部错误，则返回1019900003。

### HMS\_SecurityAntivirus\_UnregisterAntivirus()

PC/2in1



```
1. SecurityAntivirus_ErrCode HMS_SecurityAntivirus_UnregisterAntivirus(const char* bundleName)
```

**描述**

三方EDR应用从HarmonyOS安全防护服务注销。

**起始版本：** 6.0.0(20)

**参数:**

展开

| 名称 | 描述 |
| --- | --- |
| const char\* bundleName | 三方EDR包名。 |

**Permission:**

ohos.permission.REGISTER\_ANTIVIRUS

**返回：**

函数执行结果。返回值说明：如果操作成功，则返回0。如果权限验证失败，则返回201。如果传入参数不符合规范，则返回1019900001。如果HarmonyOS安全防护服务发生内部错误，则返回1019900003。

### HMS\_SecurityAntivirus\_UpdateAntivirus()

PC/2in1



```
1. SecurityAntivirus_ErrCode HMS_SecurityAntivirus_UpdateAntivirus(const SecurityAntivirus_Antivirus* antivirus)
```

**描述**

三方EDR应用向HarmonyOS安全防护服务更新信息，包含包名、当前版本号、上次更新时间、病毒防护开关状态、用户ID。

**起始版本：** 6.0.0(20)

**参数:**

展开

| 名称 | 描述 |
| --- | --- |
| const SecurityAntivirus\_Antivirus\* antivirus | 三方EDR更新信息（包含包名、当前版本号、上次更新时间、病毒防护开关状态、用户ID）。 |

**Permission:**

ohos.permission.REGISTER\_ANTIVIRUS

**返回：**

函数执行结果。返回值说明：如果操作成功，则返回0。如果权限验证失败，则返回201。如果传入参数不符合规范，则返回1019900001。如果当前应用未在病毒防护系统注册，则返回1019900002。如果HarmonyOS安全防护服务发生内部错误，则返回1019900003。

### HMS\_SecurityAntivirus\_QueryAntivirus()

PC/2in1



```
1. SecurityAntivirus_ErrCode HMS_SecurityAntivirus_QueryAntivirus(SecurityAntivirus_Antivirus** list, uint32_t* length)
```

**描述**

零信任应用向HarmonyOS安全防护服务查询当前所有三方EDR注册信息。

**起始版本：** 6.0.0(20)

**参数:**

展开

| 名称 | 描述 |
| --- | --- |
| SecurityAntivirus\_Antivirus\*\* list | 三方EDR注册信息列表。 |
| uint32\_t\* length | 三方EDR注册信息数量。 |

**Permission:**

ohos.permission.MANAGE\_ANTIVIRUS

**返回：**

函数执行结果。返回值说明：如果操作成功，则返回0。如果权限验证失败，则返回201。如果传入参数不符合规范，则返回1019900001。如果HarmonyOS安全防护服务发生内部错误，则返回1019900003。

### HMS\_SecurityAntivirus\_QueryPreinstalledAntivirus()

PC/2in1



```
1. SecurityAntivirus_ErrCode HMS_SecurityAntivirus_QueryPreinstalledAntivirus(SecurityAntivirus_Antivirus** list, uint32_t* length)
```

**描述**

MDM应用向HarmonyOS安全防护服务查询所有用户系统防病毒功能状态。

**起始版本：** 6.0.0(20)

**参数:**

展开

| 名称 | 描述 |
| --- | --- |
| SecurityAntivirus\_Antivirus\*\* list | HarmonyOS安全防护服务所有用户的防病毒功能状态信息列表。 |
| uint32\_t\* length | HarmonyOS安全防护服务所有用户的防病毒功能状态信息数量。 |

**Permission:**

ohos.permission.MANAGE\_PREINSTALLED\_ANTIVIRUS

**返回：**

函数执行结果。返回值说明：如果操作成功，则返回0。如果权限验证失败，则返回201。如果传入参数不符合规范，则返回1019900001。如果HarmonyOS安全防护服务发生内部错误，则返回1019900003。

### HMS\_SecurityAntivirus\_EnablePreinstalledAntivirus()

PC/2in1



```
1. SecurityAntivirus_ErrCode HMS_SecurityAntivirus_EnablePreinstalledAntivirus(void)
```

**描述**

MDM应用启用HarmonyOS安全防护服务所有用户的防病毒功能。

**起始版本：** 6.0.0(20)

**Permission:**

ohos.permission.MANAGE\_PREINSTALLED\_ANTIVIRUS

**返回：**

函数执行结果。返回值说明：如果操作成功，则返回0。如果权限验证失败，则返回201。如果HarmonyOS安全防护服务发生内部错误，则返回1019900003。

### HMS\_SecurityAntivirus\_DisablePreinstalledAntivirus()

PC/2in1



```
1. SecurityAntivirus_ErrCode HMS_SecurityAntivirus_DisablePreinstalledAntivirus(void)
```

**描述**

MDM应用禁用HarmonyOS安全防护服务所有用户的防病毒功能。

**起始版本：** 6.0.0(20)

**Permission:**

ohos.permission.MANAGE\_PREINSTALLED\_ANTIVIRUS

**返回：**

函数执行结果。返回值说明：如果操作成功，则返回0。如果权限验证失败，则返回201。如果HarmonyOS安全防护服务发生内部错误，则返回1019900003。

### HMS\_SecurityAntivirus\_EnablePreinstalledAntivirusByAccount()

PC/2in1



```
1. SecurityAntivirus_ErrCode HMS_SecurityAntivirus_EnablePreinstalledAntivirusByAccount(int32_t accountId)
```

**描述**

MDM应用启用HarmonyOS安全防护服务中用户ID为accountId的防病毒功能。

**起始版本：** 6.0.0(20)

**参数:**

展开

| 名称 | 描述 |
| --- | --- |
| int32\_t accountId | 用户ID。 |

**Permission:**

ohos.permission.MANAGE\_PREINSTALLED\_ANTIVIRUS

**返回：**

函数执行结果。返回值说明：如果操作成功，则返回0。如果权限验证失败，则返回201。如果传入参数不符合规范，则返回1019900001。如果HarmonyOS安全防护服务发生内部错误，则返回1019900003。

### HMS\_SecurityAntivirus\_DisablePreinstalledAntivirusByAccount()

PC/2in1



```
1. SecurityAntivirus_ErrCode HMS_SecurityAntivirus_DisablePreinstalledAntivirusByAccount(int32_t accountId)
```

**描述**

MDM应用禁用HarmonyOS安全防护服务中用户ID为accountId的防病毒功能。

**起始版本：** 6.0.0(20)

**参数:**

展开

| 名称 | 描述 |
| --- | --- |
| int32\_t accountId | 用户ID。 |

**Permission:**

ohos.permission.MANAGE\_PREINSTALLED\_ANTIVIRUS

**返回：**

函数执行结果。返回值说明：如果操作成功，则返回0。如果权限验证失败，则返回201。如果传入参数不符合规范，则返回1019900001。如果HarmonyOS安全防护服务发生内部错误，则返回1019900003。