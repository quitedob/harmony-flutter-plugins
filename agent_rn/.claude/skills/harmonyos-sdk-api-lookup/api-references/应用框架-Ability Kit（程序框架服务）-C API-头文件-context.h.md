## 概述

PhonePC/2in1TabletTVWearable

提供上下文数据结构[AbilityRuntime\_Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-abilityruntime-abilityruntime-context)和相关接口用于获取当前上下文的应用文件路径、数据加密等级和进程名等信息。

**引用文件：** <AbilityKit/ability\_runtime/context.h>

**库：** libability\_runtime.so

**系统能力：** SystemCapability.Ability.AbilityRuntime.Core

**起始版本：** 24

**相关模块：** [AbilityRuntime](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-abilityruntime)

## 汇总

PhonePC/2in1TabletTVWearable

### 结构体

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [AbilityRuntime\_Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-abilityruntime-abilityruntime-context) | - | 定义AbilityRuntime\_Context结构体类型。 |
| [AbilityRuntime\_Context\*](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-abilityruntime-abilityruntime-context8h) | AbilityRuntime\_ContextHandle | 定义AbilityRuntime\_Context对象指针。 |

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [AbilityRuntime\_ErrorCode OH\_AbilityRuntime\_Context\_GetCacheDir(AbilityRuntime\_ContextHandle context, char\* buffer, int32\_t bufferSize, int32\_t\* writeLength)](/consumer/cn/doc/harmonyos-references/capi-abilityruntime-context-h#oh_abilityruntime_context_getcachedir) | 获取上下文的缓存目录。 |
| [AbilityRuntime\_ErrorCode OH\_AbilityRuntime\_Context\_GetTempDir(AbilityRuntime\_ContextHandle context, char\* buffer, const int32\_t bufferSize, int32\_t\* writeLength)](/consumer/cn/doc/harmonyos-references/capi-abilityruntime-context-h#oh_abilityruntime_context_gettempdir) | 获取上下文的临时文件目录。 |
| [AbilityRuntime\_ErrorCode OH\_AbilityRuntime\_Context\_GetFilesDir(AbilityRuntime\_ContextHandle context, char\* buffer, const int32\_t bufferSize, int32\_t\* writeLength)](/consumer/cn/doc/harmonyos-references/capi-abilityruntime-context-h#oh_abilityruntime_context_getfilesdir) | 获取上下文的通用文件目录。 |
| [AbilityRuntime\_ErrorCode OH\_AbilityRuntime\_Context\_GetDatabaseDir(AbilityRuntime\_ContextHandle context, char\* buffer, const int32\_t bufferSize, int32\_t\* writeLength)](/consumer/cn/doc/harmonyos-references/capi-abilityruntime-context-h#oh_abilityruntime_context_getdatabasedir) | 获取上下文的数据库文件目录。 |
| [AbilityRuntime\_ErrorCode OH\_AbilityRuntime\_Context\_GetPreferencesDir(AbilityRuntime\_ContextHandle context, char\* buffer, const int32\_t bufferSize, int32\_t\* writeLength)](/consumer/cn/doc/harmonyos-references/capi-abilityruntime-context-h#oh_abilityruntime_context_getpreferencesdir) | 获取上下文的首选项文件目录。 |
| [AbilityRuntime\_ErrorCode OH\_AbilityRuntime\_Context\_GetBundleCodeDir(AbilityRuntime\_ContextHandle context, char\* buffer, const int32\_t bufferSize, int32\_t\* writeLength)](/consumer/cn/doc/harmonyos-references/capi-abilityruntime-context-h#oh_abilityruntime_context_getbundlecodedir) | 获取上下文的安装文件目录。 |
| [AbilityRuntime\_ErrorCode OH\_AbilityRuntime\_Context\_GetDistributedFilesDir(AbilityRuntime\_ContextHandle context, char\* buffer, const int32\_t bufferSize, int32\_t\* writeLength)](/consumer/cn/doc/harmonyos-references/capi-abilityruntime-context-h#oh_abilityruntime_context_getdistributedfilesdir) | 获取上下文的分布式文件目录。 |
| [AbilityRuntime\_ErrorCode OH\_AbilityRuntime\_Context\_GetResourceDir(AbilityRuntime\_ContextHandle context, char\* buffer, const int32\_t bufferSize, int32\_t\* writeLength)](/consumer/cn/doc/harmonyos-references/capi-abilityruntime-context-h#oh_abilityruntime_context_getresourcedir) | 获取上下文的资源目录。 |
| [AbilityRuntime\_ErrorCode OH\_AbilityRuntime\_Context\_GetCloudFileDir(AbilityRuntime\_ContextHandle context, char\* buffer, const int32\_t bufferSize, int32\_t\* writeLength)](/consumer/cn/doc/harmonyos-references/capi-abilityruntime-context-h#oh_abilityruntime_context_getcloudfiledir) | 获取上下文的云文件目录。 |
| [AbilityRuntime\_ErrorCode OH\_AbilityRuntime\_Context\_GetAreaMode(AbilityRuntime\_ContextHandle context, AbilityRuntime\_AreaMode\* areaMode)](/consumer/cn/doc/harmonyos-references/capi-abilityruntime-context-h#oh_abilityruntime_context_getareamode) | 获取上下文的数据加密等级。 |
| [AbilityRuntime\_ErrorCode OH\_AbilityRuntime\_Context\_SetAreaMode(AbilityRuntime\_ContextHandle context, AbilityRuntime\_AreaMode areaMode)](/consumer/cn/doc/harmonyos-references/capi-abilityruntime-context-h#oh_abilityruntime_context_setareamode) | 设置上下文的数据加密等级。 |
| [AbilityRuntime\_ErrorCode OH\_AbilityRuntime\_Context\_GetLogFileDir(AbilityRuntime\_ContextHandle context, char\* buffer, const int32\_t bufferSize, int32\_t\* writeLength)](/consumer/cn/doc/harmonyos-references/capi-abilityruntime-context-h#oh_abilityruntime_context_getlogfiledir) | 获取上下文的日志文件目录。 |
| [AbilityRuntime\_ErrorCode OH\_AbilityRuntime\_Context\_GetProcessName(AbilityRuntime\_ContextHandle context, char\* buffer, int32\_t bufferSize, int32\_t\* writeLength)](/consumer/cn/doc/harmonyos-references/capi-abilityruntime-context-h#oh_abilityruntime_context_getprocessname) | 获取上下文所在的进程名称。 |

## 函数说明

PhonePC/2in1TabletTVWearable

### OH\_AbilityRuntime\_Context\_GetCacheDir()

PhonePC/2in1TabletTVWearable



```
1. AbilityRuntime_ErrorCode OH_AbilityRuntime_Context_GetCacheDir(
2. AbilityRuntime_ContextHandle context, char* buffer, int32_t bufferSize, int32_t* writeLength)
```

**描述**

获取上下文的缓存目录。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [AbilityRuntime\_ContextHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-abilityruntime-abilityruntime-context8h) context | 要获取缓存目录的上下文。 |
| char\* buffer | 指向缓冲区的指针，用于接收上下文的缓存目录。 |
| int32\_t bufferSize | 缓冲区大小，单位为字节。 |
| int32\_t\* writeLength | 在返回[ABILITY\_RUNTIME\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ability-runtime-common-h#abilityruntime_errorcode)时，表示实际写入到缓冲区的字符串长度，单位为字节。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AbilityRuntime\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ability-runtime-common-h#abilityruntime_errorcode) | 返回执行结果。  ABILITY\_RUNTIME\_ERROR\_CODE\_NO\_ERROR - 操作成功。  ABILITY\_RUNTIME\_ERROR\_CODE\_PARAM\_INVALID - 入参buffer或writeLength为空或context为空，或缓冲区大小小于需要写入的大小。  ABILITY\_RUNTIME\_ERROR\_CODE\_CONTEXT\_NOT\_EXIST - 上下文不存在。 |

**示例代码：**



```
1. #include <AbilityKit/ability_runtime/context.h>

3. // 接收一个context 对象
4. void testGetCacheDir(AbilityRuntime_ContextHandle context)
5. {
6. char buffer[1024] = {0};
7. int32_t cacheDirSize = 0;
8. AbilityRuntime_ErrorCode errorCode = ABILITY_RUNTIME_ERROR_CODE_NO_ERROR;
9. errorCode = OH_AbilityRuntime_Context_GetCacheDir(context, buffer, 1024, &cacheDirSize);
10. if (errorCode != ABILITY_RUNTIME_ERROR_CODE_NO_ERROR) {
11. // 记录错误日志以及其他业务处理
12. }
13. // 正常业务处理
14. }
```

### OH\_AbilityRuntime\_Context\_GetTempDir()

PhonePC/2in1TabletTVWearable



```
1. AbilityRuntime_ErrorCode OH_AbilityRuntime_Context_GetTempDir(
2. AbilityRuntime_ContextHandle context, char* buffer, const int32_t bufferSize, int32_t* writeLength)
```

**描述**

获取上下文的临时文件目录。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [AbilityRuntime\_ContextHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-abilityruntime-abilityruntime-context8h) context | 要获取临时文件目录的上下文。 |
| char\* buffer | 指向缓冲区的指针，用于接收上下文的临时文件目录。 |
| const int32\_t bufferSize | 缓冲区大小，单位为字节。 |
| int32\_t\* writeLength | 在返回[ABILITY\_RUNTIME\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ability-runtime-common-h#abilityruntime_errorcode)时，表示实际写入到缓冲区的字符串长度，单位为字节。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AbilityRuntime\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ability-runtime-common-h#abilityruntime_errorcode) | 返回执行结果。  ABILITY\_RUNTIME\_ERROR\_CODE\_NO\_ERROR - 操作成功。  ABILITY\_RUNTIME\_ERROR\_CODE\_PARAM\_INVALID - 入参buffer或writeLength为空或context为空，或缓冲区大小小于需要写入的大小。  ABILITY\_RUNTIME\_ERROR\_CODE\_CONTEXT\_NOT\_EXIST - 上下文不存在。 |

**示例代码：**



```
1. #include <AbilityKit/ability_runtime/context.h>

3. // 接收一个context 对象
4. void testGetTempDir(AbilityRuntime_ContextHandle context)
5. {
6. char buffer[1024] = {0};
7. int32_t tempDirSize = 0;
8. AbilityRuntime_ErrorCode errorCode = ABILITY_RUNTIME_ERROR_CODE_NO_ERROR;
9. errorCode = OH_AbilityRuntime_Context_GetTempDir(context, buffer, 1024, &tempDirSize);
10. if (errorCode != ABILITY_RUNTIME_ERROR_CODE_NO_ERROR) {
11. // 记录错误日志以及其他业务处理
12. }
13. // 正常业务处理
14. }
```

### OH\_AbilityRuntime\_Context\_GetFilesDir()

PhonePC/2in1TabletTVWearable



```
1. AbilityRuntime_ErrorCode OH_AbilityRuntime_Context_GetFilesDir(
2. AbilityRuntime_ContextHandle context, char* buffer, const int32_t bufferSize, int32_t* writeLength)
```

**描述**

获取上下文的通用文件目录。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [AbilityRuntime\_ContextHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-abilityruntime-abilityruntime-context8h) context | 要获取通用文件目录的上下文。 |
| char\* buffer | 指向缓冲区的指针，用于接收上下文的通用文件目录。 |
| const int32\_t bufferSize | 缓冲区大小，单位为字节。 |
| int32\_t\* writeLength | 在返回[ABILITY\_RUNTIME\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ability-runtime-common-h#abilityruntime_errorcode)时，表示实际写入到缓冲区的字符串长度，单位为字节。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AbilityRuntime\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ability-runtime-common-h#abilityruntime_errorcode) | 返回执行结果。  ABILITY\_RUNTIME\_ERROR\_CODE\_NO\_ERROR - 操作成功。  ABILITY\_RUNTIME\_ERROR\_CODE\_PARAM\_INVALID - 入参buffer或writeLength为空或context为空，或缓冲区大小小于需要写入的大小。  ABILITY\_RUNTIME\_ERROR\_CODE\_CONTEXT\_NOT\_EXIST - 上下文不存在。 |

**示例代码：**



```
1. #include <AbilityKit/ability_runtime/context.h>

3. // 接收一个context 对象
4. void testGetFilesDir(AbilityRuntime_ContextHandle context)
5. {
6. char buffer[1024] = {0};
7. int32_t filesDirSize = 0;
8. AbilityRuntime_ErrorCode errorCode = ABILITY_RUNTIME_ERROR_CODE_NO_ERROR;
9. errorCode = OH_AbilityRuntime_Context_GetFilesDir(context, buffer, 1024, &filesDirSize);
10. if (errorCode != ABILITY_RUNTIME_ERROR_CODE_NO_ERROR) {
11. // 记录错误日志以及其他业务处理
12. }
13. // 正常业务处理
14. }
```

### OH\_AbilityRuntime\_Context\_GetDatabaseDir()

PhonePC/2in1TabletTVWearable



```
1. AbilityRuntime_ErrorCode OH_AbilityRuntime_Context_GetDatabaseDir(
2. AbilityRuntime_ContextHandle context, char* buffer, const int32_t bufferSize, int32_t* writeLength)
```

**描述**

获取上下文的数据库文件目录。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [AbilityRuntime\_ContextHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-abilityruntime-abilityruntime-context8h) context | 要获取数据库文件目录的上下文。 |
| char\* buffer | 指向缓冲区的指针，用于接收上下文的数据库文件目录。 |
| const int32\_t bufferSize | 缓冲区大小，单位为字节。 |
| int32\_t\* writeLength | 在返回[ABILITY\_RUNTIME\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ability-runtime-common-h#abilityruntime_errorcode)时，表示实际写入到缓冲区的字符串长度，单位为字节。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AbilityRuntime\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ability-runtime-common-h#abilityruntime_errorcode) | 返回执行结果。  ABILITY\_RUNTIME\_ERROR\_CODE\_NO\_ERROR - 操作成功。  ABILITY\_RUNTIME\_ERROR\_CODE\_PARAM\_INVALID - 入参buffer或writeLength为空或context为空，或缓冲区大小小于需要写入的大小。  ABILITY\_RUNTIME\_ERROR\_CODE\_CONTEXT\_NOT\_EXIST - 上下文不存在。 |

**示例代码：**



```
1. #include <AbilityKit/ability_runtime/context.h>

3. // 接收一个context 对象
4. void testGetDatabaseDir(AbilityRuntime_ContextHandle context)
5. {
6. char buffer[1024] = {0};
7. int32_t databaseDirSize = 0;
8. AbilityRuntime_ErrorCode errorCode = ABILITY_RUNTIME_ERROR_CODE_NO_ERROR;
9. errorCode = OH_AbilityRuntime_Context_GetDatabaseDir(context, buffer, 1024, &databaseDirSize);
10. if (errorCode != ABILITY_RUNTIME_ERROR_CODE_NO_ERROR) {
11. // 记录错误日志以及其他业务处理
12. }
13. // 正常业务处理
14. }
```

### OH\_AbilityRuntime\_Context\_GetPreferencesDir()

PhonePC/2in1TabletTVWearable



```
1. AbilityRuntime_ErrorCode OH_AbilityRuntime_Context_GetPreferencesDir(
2. AbilityRuntime_ContextHandle context, char* buffer, const int32_t bufferSize, int32_t* writeLength)
```

**描述**

获取上下文的首选项文件目录。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [AbilityRuntime\_ContextHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-abilityruntime-abilityruntime-context8h) context | 要获取首选项文件目录的上下文。 |
| char\* buffer | 指向缓冲区的指针，用于接收上下文的首选项文件目录。 |
| const int32\_t bufferSize | 缓冲区大小，单位为字节。 |
| int32\_t\* writeLength | 在返回[ABILITY\_RUNTIME\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ability-runtime-common-h#abilityruntime_errorcode)时，表示实际写入到缓冲区的字符串长度，单位为字节。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AbilityRuntime\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ability-runtime-common-h#abilityruntime_errorcode) | 返回执行结果。  ABILITY\_RUNTIME\_ERROR\_CODE\_NO\_ERROR - 操作成功。  ABILITY\_RUNTIME\_ERROR\_CODE\_PARAM\_INVALID - 入参buffer或writeLength为空或context为空，或缓冲区大小小于需要写入的大小。  ABILITY\_RUNTIME\_ERROR\_CODE\_CONTEXT\_NOT\_EXIST - 上下文不存在。 |

**示例代码：**



```
1. #include <AbilityKit/ability_runtime/context.h>

3. // 接收一个context 对象
4. void testGetPreferencesDir(AbilityRuntime_ContextHandle context)
5. {
6. char buffer[1024] = {0};
7. int32_t preferencesDirSize = 0;
8. AbilityRuntime_ErrorCode errorCode = ABILITY_RUNTIME_ERROR_CODE_NO_ERROR;
9. errorCode = OH_AbilityRuntime_Context_GetPreferencesDir(context, buffer, 1024, &preferencesDirSize);
10. if (errorCode != ABILITY_RUNTIME_ERROR_CODE_NO_ERROR) {
11. // 记录错误日志以及其他业务处理
12. }
13. // 正常业务处理
14. }
```

### OH\_AbilityRuntime\_Context\_GetBundleCodeDir()

PhonePC/2in1TabletTVWearable



```
1. AbilityRuntime_ErrorCode OH_AbilityRuntime_Context_GetBundleCodeDir(
2. AbilityRuntime_ContextHandle context, char* buffer, const int32_t bufferSize, int32_t* writeLength)
```

**描述**

获取上下文的安装文件目录。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [AbilityRuntime\_ContextHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-abilityruntime-abilityruntime-context8h) context | 要获取安装文件目录的上下文。 |
| char\* buffer | 指向缓冲区的指针，用于接收上下文的安装文件目录。 |
| const int32\_t bufferSize | 缓冲区大小，单位为字节。 |
| int32\_t\* writeLength | 在返回[ABILITY\_RUNTIME\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ability-runtime-common-h#abilityruntime_errorcode)时，表示实际写入到缓冲区的字符串长度，单位为字节。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AbilityRuntime\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ability-runtime-common-h#abilityruntime_errorcode) | 返回执行结果。  ABILITY\_RUNTIME\_ERROR\_CODE\_NO\_ERROR - 操作成功。  ABILITY\_RUNTIME\_ERROR\_CODE\_PARAM\_INVALID - 入参buffer或writeLength为空或context为空，或缓冲区大小小于需要写入的大小。  ABILITY\_RUNTIME\_ERROR\_CODE\_CONTEXT\_NOT\_EXIST - 上下文不存在。 |

**示例代码：**



```
1. #include <AbilityKit/ability_runtime/context.h>

3. // 接收一个context 对象
4. void testGetBundleCodeDir(AbilityRuntime_ContextHandle context)
5. {
6. char buffer[1024] = {0};
7. int32_t bundleCodeDirSize = 0;
8. AbilityRuntime_ErrorCode errorCode = ABILITY_RUNTIME_ERROR_CODE_NO_ERROR;
9. errorCode = OH_AbilityRuntime_Context_GetBundleCodeDir(context, buffer, 1024, &bundleCodeDirSize);
10. if (errorCode != ABILITY_RUNTIME_ERROR_CODE_NO_ERROR) {
11. // 记录错误日志以及其他业务处理
12. }
13. // 正常业务处理
14. }
```

### OH\_AbilityRuntime\_Context\_GetDistributedFilesDir()

PhonePC/2in1TabletTVWearable



```
1. AbilityRuntime_ErrorCode OH_AbilityRuntime_Context_GetDistributedFilesDir(
2. AbilityRuntime_ContextHandle context, char* buffer, const int32_t bufferSize, int32_t* writeLength)
```

**描述**

获取上下文的分布式文件目录。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [AbilityRuntime\_ContextHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-abilityruntime-abilityruntime-context8h) context | 要获取分布式文件目录的上下文。 |
| char\* buffer | 指向缓冲区的指针，用于接收上下文的分布式文件目录。 |
| const int32\_t bufferSize | 缓冲区大小，单位为字节。 |
| int32\_t\* writeLength | 在返回[ABILITY\_RUNTIME\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ability-runtime-common-h#abilityruntime_errorcode)时，表示实际写入到缓冲区的字符串长度，单位为字节。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AbilityRuntime\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ability-runtime-common-h#abilityruntime_errorcode) | 返回执行结果。  ABILITY\_RUNTIME\_ERROR\_CODE\_NO\_ERROR - 操作成功。  ABILITY\_RUNTIME\_ERROR\_CODE\_PARAM\_INVALID - 入参buffer或writeLength为空或context为空，或缓冲区大小小于需要写入的大小。  ABILITY\_RUNTIME\_ERROR\_CODE\_CONTEXT\_NOT\_EXIST - 上下文不存在。 |

**示例代码：**



```
1. #include <AbilityKit/ability_runtime/context.h>

3. // 接收一个context 对象
4. void testGetDistributedFilesDir(AbilityRuntime_ContextHandle context)
5. {
6. char buffer[1024] = {0};
7. int32_t distributedFilesDirSize = 0;
8. AbilityRuntime_ErrorCode errorCode = ABILITY_RUNTIME_ERROR_CODE_NO_ERROR;
9. errorCode = OH_AbilityRuntime_Context_GetDistributedFilesDir(context, buffer, 1024, &distributedFilesDirSize);
10. if (errorCode != ABILITY_RUNTIME_ERROR_CODE_NO_ERROR) {
11. // 记录错误日志以及其他业务处理
12. }
13. // 正常业务处理
14. }
```

### OH\_AbilityRuntime\_Context\_GetResourceDir()

PhonePC/2in1TabletTVWearable



```
1. AbilityRuntime_ErrorCode OH_AbilityRuntime_Context_GetResourceDir(
2. AbilityRuntime_ContextHandle context, char* buffer, const int32_t bufferSize, int32_t* writeLength)
```

**描述**

获取上下文的资源目录。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [AbilityRuntime\_ContextHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-abilityruntime-abilityruntime-context8h) context | 要获取资源目录的上下文。 |
| char\* buffer | 指向缓冲区的指针，用于接收上下文的资源目录。 |
| const int32\_t bufferSize | 缓冲区大小，单位为字节。 |
| int32\_t\* writeLength | 在返回[ABILITY\_RUNTIME\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ability-runtime-common-h#abilityruntime_errorcode)时，表示实际写入到缓冲区的字符串长度，单位为字节。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AbilityRuntime\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ability-runtime-common-h#abilityruntime_errorcode) | 返回执行结果。  ABILITY\_RUNTIME\_ERROR\_CODE\_NO\_ERROR - 操作成功。  ABILITY\_RUNTIME\_ERROR\_CODE\_PARAM\_INVALID - 入参buffer或writeLength为空或context为空，或缓冲区大小小于需要写入的大小。  ABILITY\_RUNTIME\_ERROR\_CODE\_CONTEXT\_NOT\_EXIST - 上下文不存在。 |

**示例代码：**



```
1. #include <AbilityKit/ability_runtime/context.h>

3. // 接收一个context 对象
4. void testGetResourceDir(AbilityRuntime_ContextHandle context)
5. {
6. char buffer[1024] = {0};
7. int32_t resourceDirSize = 0;
8. AbilityRuntime_ErrorCode errorCode = ABILITY_RUNTIME_ERROR_CODE_NO_ERROR;
9. errorCode = OH_AbilityRuntime_Context_GetResourceDir(context, buffer, 1024, &resourceDirSize);
10. if (errorCode != ABILITY_RUNTIME_ERROR_CODE_NO_ERROR) {
11. // 记录错误日志以及其他业务处理
12. }
13. // 正常业务处理
14. }
```

### OH\_AbilityRuntime\_Context\_GetCloudFileDir()

PhonePC/2in1TabletTVWearable



```
1. AbilityRuntime_ErrorCode OH_AbilityRuntime_Context_GetCloudFileDir(
2. AbilityRuntime_ContextHandle context, char* buffer, const int32_t bufferSize, int32_t* writeLength)
```

**描述**

获取上下文的云文件目录。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [AbilityRuntime\_ContextHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-abilityruntime-abilityruntime-context8h) context | 要获取云文件目录的上下文。 |
| char\* buffer | 指向缓冲区的指针，用于接收上下文的云文件目录。 |
| const int32\_t bufferSize | 缓冲区大小，单位为字节。 |
| int32\_t\* writeLength | 在返回[ABILITY\_RUNTIME\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ability-runtime-common-h#abilityruntime_errorcode)时，表示实际写入到缓冲区的字符串长度，单位为字节。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AbilityRuntime\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ability-runtime-common-h#abilityruntime_errorcode) | 返回执行结果。  ABILITY\_RUNTIME\_ERROR\_CODE\_NO\_ERROR - 操作成功。  ABILITY\_RUNTIME\_ERROR\_CODE\_PARAM\_INVALID - 入参buffer或writeLength为空或context为空，或缓冲区大小小于需要写入的大小。  ABILITY\_RUNTIME\_ERROR\_CODE\_CONTEXT\_NOT\_EXIST - 上下文不存在。 |

**示例代码：**



```
1. #include <AbilityKit/ability_runtime/context.h>

3. // 接收一个context 对象
4. void testGetCloudFileDir(AbilityRuntime_ContextHandle context)
5. {
6. char buffer[1024] = {0};
7. int32_t cloudFileDirSize = 0;
8. AbilityRuntime_ErrorCode errorCode = ABILITY_RUNTIME_ERROR_CODE_NO_ERROR;
9. errorCode = OH_AbilityRuntime_Context_GetCloudFileDir(context, buffer, 1024, &cloudFileDirSize);
10. if (errorCode != ABILITY_RUNTIME_ERROR_CODE_NO_ERROR) {
11. // 记录错误日志以及其他业务处理
12. }
13. // 正常业务处理
14. }
```

### OH\_AbilityRuntime\_Context\_GetAreaMode()

PhonePC/2in1TabletTVWearable



```
1. AbilityRuntime_ErrorCode OH_AbilityRuntime_Context_GetAreaMode(
2. AbilityRuntime_ContextHandle context, AbilityRuntime_AreaMode* areaMode)
```

**描述**

获取上下文的数据加密等级。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [AbilityRuntime\_ContextHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-abilityruntime-abilityruntime-context8h) context | 要获取数据加密等级的上下文。 |
| [AbilityRuntime\_AreaMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-context-constant-h#abilityruntime_areamode)\* areaMode | 指向接收数据加密等级的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AbilityRuntime\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ability-runtime-common-h#abilityruntime_errorcode) | 返回执行结果。  ABILITY\_RUNTIME\_ERROR\_CODE\_NO\_ERROR - 操作成功。  ABILITY\_RUNTIME\_ERROR\_CODE\_PARAM\_INVALID - 入参areaMode为空。  ABILITY\_RUNTIME\_ERROR\_CODE\_CONTEXT\_NOT\_EXIST - 上下文不存在。 |

**示例代码：**



```
1. #include <AbilityKit/ability_runtime/context.h>

3. // 接收一个context 对象
4. void testGetAreaMode(AbilityRuntime_ContextHandle context)
5. {
6. AbilityRuntime_AreaMode areaMode;
7. AbilityRuntime_ErrorCode errorCode = ABILITY_RUNTIME_ERROR_CODE_NO_ERROR;
8. errorCode = OH_AbilityRuntime_Context_GetAreaMode(context, &areaMode);
9. if (errorCode != ABILITY_RUNTIME_ERROR_CODE_NO_ERROR) {
10. // 记录错误日志以及其他业务处理
11. }
12. // 正常业务处理
13. }
```

### OH\_AbilityRuntime\_Context\_SetAreaMode()

PhonePC/2in1TabletTVWearable



```
1. AbilityRuntime_ErrorCode OH_AbilityRuntime_Context_SetAreaMode(
2. AbilityRuntime_ContextHandle context, AbilityRuntime_AreaMode areaMode)
```

**描述**

设置上下文的数据加密等级。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [AbilityRuntime\_ContextHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-abilityruntime-abilityruntime-context8h) context | 要设置数据加密等级的上下文。 |
| [AbilityRuntime\_AreaMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-context-constant-h#abilityruntime_areamode) areaMode | 数据加密等级。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AbilityRuntime\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ability-runtime-common-h#abilityruntime_errorcode) | 返回执行结果。  ABILITY\_RUNTIME\_ERROR\_CODE\_NO\_ERROR - 操作成功。  ABILITY\_RUNTIME\_ERROR\_CODE\_PARAM\_INVALID - 入参areaMode为空。  ABILITY\_RUNTIME\_ERROR\_CODE\_CONTEXT\_NOT\_EXIST - 上下文不存在。 |

**示例代码：**



```
1. #include <AbilityKit/ability_runtime/context.h>

3. // 接收一个context 对象
4. void testSetAreaMode(AbilityRuntime_ContextHandle context)
5. {
6. AbilityRuntime_AreaMode areaMode = ABILITY_RUNTIME_AREA_MODE_EL1;
7. AbilityRuntime_ErrorCode errorCode = ABILITY_RUNTIME_ERROR_CODE_NO_ERROR;
8. errorCode = OH_AbilityRuntime_Context_SetAreaMode(context, areaMode);
9. if (errorCode != ABILITY_RUNTIME_ERROR_CODE_NO_ERROR) {
10. // 记录错误日志以及其他业务处理
11. }
12. // 正常业务处理
13. }
```

### OH\_AbilityRuntime\_Context\_GetLogFileDir()

PhonePC/2in1TabletTVWearable



```
1. AbilityRuntime_ErrorCode OH_AbilityRuntime_Context_GetLogFileDir(
2. AbilityRuntime_ContextHandle context, char* buffer, const int32_t bufferSize, int32_t* writeLength)
```

**描述**

获取上下文的日志文件目录。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [AbilityRuntime\_ContextHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-abilityruntime-abilityruntime-context8h) context | 要获取日志文件目录的上下文。 |
| char\* buffer | 指向缓冲区的指针，用于接收上下文的日志文件目录。 |
| const int32\_t bufferSize | 缓冲区大小，单位为字节。 |
| int32\_t\* writeLength | 在返回[ABILITY\_RUNTIME\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ability-runtime-common-h#abilityruntime_errorcode)时，表示实际写入到缓冲区的字符串长度，单位为字节。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AbilityRuntime\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ability-runtime-common-h#abilityruntime_errorcode) | 返回执行结果。  ABILITY\_RUNTIME\_ERROR\_CODE\_NO\_ERROR - 操作成功。  ABILITY\_RUNTIME\_ERROR\_CODE\_PARAM\_INVALID - 入参buffer或writeLength为空或context为空，或缓冲区大小小于需要写入的大小。  ABILITY\_RUNTIME\_ERROR\_CODE\_CONTEXT\_NOT\_EXIST - 上下文不存在。 |

**示例代码：**



```
1. #include <AbilityKit/ability_runtime/context.h>

3. // 接收一个context 对象
4. void testGetLogFileDir(AbilityRuntime_ContextHandle context)
5. {
6. char buffer[1024] = {0};
7. int32_t logFileDirSize = 0;
8. AbilityRuntime_ErrorCode errorCode = ABILITY_RUNTIME_ERROR_CODE_NO_ERROR;
9. errorCode = OH_AbilityRuntime_Context_GetLogFileDir(context, buffer, 1024, &logFileDirSize);
10. if (errorCode != ABILITY_RUNTIME_ERROR_CODE_NO_ERROR) {
11. // 记录错误日志以及其他业务处理
12. }
13. // 正常业务处理
14. }
```

### OH\_AbilityRuntime\_Context\_GetProcessName()

PhonePC/2in1TabletTVWearable



```
1. AbilityRuntime_ErrorCode OH_AbilityRuntime_Context_GetProcessName(
2. AbilityRuntime_ContextHandle context, char* buffer, int32_t bufferSize, int32_t* writeLength)
```

**描述**

获取上下文所在的进程名称。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [AbilityRuntime\_ContextHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-abilityruntime-abilityruntime-context8h) context | 要获取进程名称的上下文。 |
| char\* buffer | 指向缓冲区的指针，用于接收进程名称。 |
| int32\_t bufferSize | 缓冲区大小，单位为字节。 |
| int32\_t\* writeLength | 在返回[ABILITY\_RUNTIME\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ability-runtime-common-h#abilityruntime_errorcode)时，表示实际写入到缓冲区的字符串长度，单位为字节。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [AbilityRuntime\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ability-runtime-common-h#abilityruntime_errorcode) | 返回执行结果。  ABILITY\_RUNTIME\_ERROR\_CODE\_NO\_ERROR - 操作成功。  ABILITY\_RUNTIME\_ERROR\_CODE\_PARAM\_INVALID - 入参buffer或writeLength为空或context为空，或缓冲区大小小于需要写入的大小。  ABILITY\_RUNTIME\_ERROR\_CODE\_CONTEXT\_NOT\_EXIST - 上下文不存在。 |

**示例代码：**



```
1. #include <AbilityKit/ability_runtime/context.h>

3. // 接收一个context 对象
4. void testGetProcessName(AbilityRuntime_ContextHandle context)
5. {
6. char buffer[1024] = {0};
7. int32_t processNameSize = 0;
8. AbilityRuntime_ErrorCode errorCode = ABILITY_RUNTIME_ERROR_CODE_NO_ERROR;
9. errorCode = OH_AbilityRuntime_Context_GetProcessName(context, buffer, 1024, &processNameSize);
10. if (errorCode != ABILITY_RUNTIME_ERROR_CODE_NO_ERROR) {
11. // 记录错误日志以及其他业务处理
12. }
13. // 正常业务处理
14. }
```