## 概述

PC/2in1

定义面向外部密钥管理扩展的通用密钥库（HUKS）API。

**引用文件：** <huks/native\_huks\_external\_crypto\_api.h>

**库：** libhuks\_external\_crypto.z.so

**系统能力：** SystemCapability.Security.Huks.CryptoExtension

**起始版本：** 22

**相关模块：** [HuksExternalCryptoApi](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-huksexternalcryptoapi)

## 汇总

PC/2in1

### 函数

PC/2in1

展开

| 名称 | 描述 |
| --- | --- |
| [struct OH\_Huks\_Result OH\_Huks\_RegisterProvider(const struct OH\_Huks\_Blob \*providerName, const OH\_Huks\_ExternalCryptoParamSet \*paramSet)](/consumer/cn/doc/harmonyos-references/capi-native-huks-external-crypto-api-h#oh_huks_registerprovider) | 注册外部密钥管理能力扩展提供者。 |
| [struct OH\_Huks\_Result OH\_Huks\_UnregisterProvider(const struct OH\_Huks\_Blob \*providerName, const OH\_Huks\_ExternalCryptoParamSet \*paramSet)](/consumer/cn/doc/harmonyos-references/capi-native-huks-external-crypto-api-h#oh_huks_unregisterprovider) | 注销外部密钥管理能力扩展提供者。 |
| [struct OH\_Huks\_Result OH\_Huks\_OpenResource(const struct OH\_Huks\_Blob \*resourceId, const OH\_Huks\_ExternalCryptoParamSet \*paramSet)](/consumer/cn/doc/harmonyos-references/capi-native-huks-external-crypto-api-h#oh_huks_openresource) | 根据指定的资源ID打开资源。  注意：打开的资源必须通过[OH\_Huks\_CloseResource](/consumer/cn/doc/harmonyos-references/capi-native-huks-external-crypto-api-h#oh_huks_closeresource)关闭。 |
| [struct OH\_Huks\_Result OH\_Huks\_CloseResource(const struct OH\_Huks\_Blob \*resourceId, const OH\_Huks\_ExternalCryptoParamSet \*paramSet)](/consumer/cn/doc/harmonyos-references/capi-native-huks-external-crypto-api-h#oh_huks_closeresource) | 根据指定的资源ID关闭资源。 |
| [struct OH\_Huks\_Result OH\_Huks\_GetUkeyPinAuthState(const struct OH\_Huks\_Blob \*resourceId, const OH\_Huks\_ExternalCryptoParamSet \*paramSet, OH\_Huks\_ExternalPinAuthState \*authState)](/consumer/cn/doc/harmonyos-references/capi-native-huks-external-crypto-api-h#oh_huks_getukeypinauthstate) | 获取指定Ukey资源ID的PIN授权状态。 |
| [struct OH\_Huks\_Result OH\_Huks\_GetProperty(const struct OH\_Huks\_Blob \*resourceId, const struct OH\_Huks\_Blob \*propertyId, const OH\_Huks\_ExternalCryptoParamSet \*paramSetIn, OH\_Huks\_ExternalCryptoParamSet \*\*paramSetOut)](/consumer/cn/doc/harmonyos-references/capi-native-huks-external-crypto-api-h#oh_huks_getproperty) | 外部密钥管理能力扩展提供者获取属性信息。 |
| [struct OH\_Huks\_Result OH\_Huks\_InitExternalCryptoParamSet(OH\_Huks\_ExternalCryptoParamSet \*\*paramSet)](/consumer/cn/doc/harmonyos-references/capi-native-huks-external-crypto-api-h#oh_huks_initexternalcryptoparamset) | 初始化一个参数集合。 |
| [struct OH\_Huks\_Result OH\_Huks\_AddExternalCryptoParams(OH\_Huks\_ExternalCryptoParamSet \*paramSet, const OH\_Huks\_ExternalCryptoParam \*params, uint32\_t paramCnt)](/consumer/cn/doc/harmonyos-references/capi-native-huks-external-crypto-api-h#oh_huks_addexternalcryptoparams) | 向参数集合中添加参数。 |
| [struct OH\_Huks\_Result OH\_Huks\_BuildExternalCryptoParamSet(OH\_Huks\_ExternalCryptoParamSet \*\*paramSet)](/consumer/cn/doc/harmonyos-references/capi-native-huks-external-crypto-api-h#oh_huks_buildexternalcryptoparamset) | 构建一个参数集合。 |
| [void OH\_Huks\_FreeExternalCryptoParamSet(OH\_Huks\_ExternalCryptoParamSet \*\*paramSet)](/consumer/cn/doc/harmonyos-references/capi-native-huks-external-crypto-api-h#oh_huks_freeexternalcryptoparamset) | 销毁一个参数集合并释放相关内存。 |
| [struct OH\_Huks\_Result OH\_Huks\_GetExternalCryptoParam(OH\_Huks\_ExternalCryptoParamSet \*paramSet, const uint32\_t tag, OH\_Huks\_ExternalCryptoParam \*\*param)](/consumer/cn/doc/harmonyos-references/capi-native-huks-external-crypto-api-h#oh_huks_getexternalcryptoparam) | 从参数集合中获取指定参数。 |

## 函数说明

PC/2in1

### OH\_Huks\_RegisterProvider()

PC/2in1



```
1. struct OH_Huks_Result OH_Huks_RegisterProvider(const struct OH_Huks_Blob *providerName, const OH_Huks_ExternalCryptoParamSet *paramSet)
```

**描述**

注册外部密钥管理能力扩展提供者。

**需要权限：** ohos.permission.CRYPTO\_EXTENSION\_REGISTER

**起始版本：** 22

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [const struct OH\_Huks\_Blob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hukstypeapi-oh-huks-blob) \*providerName | 指定提供者名称。 |
| [const OH\_Huks\_ExternalCryptoParamSet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ternalcryptotypeapi-oh-huks-externalcryptoparamset) \*paramSet | 指向注册参数的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [struct OH\_Huks\_Result](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hukstypeapi-oh-huks-result) | 可能的返回码（errorCode）：  OH\_HUKS\_SUCCESS 0 - 操作成功。  OH\_HUKS\_ERR\_CODE\_PERMISSION\_FAIL 201 - 权限校验失败，请先申请所需权限。  OH\_HUKS\_ERR\_CODE\_NOT\_SUPPORTED\_API 801 - 不支持的API。  OH\_HUKS\_ERR\_CODE\_MISSING\_CRYPTO\_ALG\_ARGUMENT 12000002 - 未能获取提供者参数。  OH\_HUKS\_ERR\_CODE\_COMMUNICATION\_FAIL 12000005 - IPC通信失败。  OH\_HUKS\_ERR\_CODE\_INSUFFICIENT\_MEMORY 12000014 - 内存不足。  OH\_HUKS\_ERR\_CODE\_ILLEGAL\_ARGUMENT 12000018 - providerName或paramSet无效。  OH\_HUKS\_ERR\_CODE\_ITEM\_NOT\_EXIST 12000019 - 提供者已被注册。  OH\_HUKS\_ERR\_CODE\_EXTERNAL\_ERROR 12000020 - 依赖模块发生错误。  OH\_HUKS\_ERR\_CODE\_EXCEED\_LIMIT 12000025 - 提供者数量超过限制。 |

### OH\_Huks\_UnregisterProvider()

PC/2in1



```
1. struct OH_Huks_Result OH_Huks_UnregisterProvider(const struct OH_Huks_Blob *providerName, const OH_Huks_ExternalCryptoParamSet *paramSet)
```

**描述**

注销外部密钥管理能力扩展提供者。

**需要权限：** ohos.permission.CRYPTO\_EXTENSION\_REGISTER

**起始版本：** 22

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [const struct OH\_Huks\_Blob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hukstypeapi-oh-huks-blob) \*providerName | 指定提供者名称。 |
| [const OH\_Huks\_ExternalCryptoParamSet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ternalcryptotypeapi-oh-huks-externalcryptoparamset) \*paramSet | 指向注册参数的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [struct OH\_Huks\_Result](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hukstypeapi-oh-huks-result) | 可能的返回码（errorCode）：  OH\_HUKS\_SUCCESS 0 - 操作成功。  OH\_HUKS\_ERR\_CODE\_PERMISSION\_FAIL 201 - 权限校验失败，请先申请所需权限。  OH\_HUKS\_ERR\_CODE\_NOT\_SUPPORTED\_API 801 - 不支持的API。  OH\_HUKS\_ERR\_CODE\_COMMUNICATION\_FAIL 12000005 - IPC通信失败。  OH\_HUKS\_ERR\_CODE\_ITEM\_NOT\_EXIST 12000011 - 未找到指定的提供者。  OH\_HUKS\_ERR\_CODE\_INTERNAL\_ERROR = 12000012 - 发生系统内部错误，密钥管理扩展模块没有加载。  OH\_HUKS\_ERR\_CODE\_INSUFFICIENT\_MEMORY 12000014 - 内存不足。  OH\_HUKS\_ERR\_CODE\_ILLEGAL\_ARGUMENT 12000018 - providerName无效。 |

### OH\_Huks\_OpenResource()

PC/2in1



```
1. struct OH_Huks_Result OH_Huks_OpenResource(const struct OH_Huks_Blob *resourceId, const OH_Huks_ExternalCryptoParamSet *paramSet)
```

**描述**

根据指定的资源ID打开资源。

注意：打开的资源必须通过[OH\_Huks\_CloseResource](/consumer/cn/doc/harmonyos-references/capi-native-huks-external-crypto-api-h#oh_huks_closeresource)关闭。

**起始版本：** 22

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [const struct OH\_Huks\_Blob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hukstypeapi-oh-huks-blob) \*resourceId | 指定提供者的资源ID。 |
| [const OH\_Huks\_ExternalCryptoParamSet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ternalcryptotypeapi-oh-huks-externalcryptoparamset) \*paramSet | 指向句柄操作参数的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [struct OH\_Huks\_Result](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hukstypeapi-oh-huks-result) | 可能的返回码（errorCode）：  OH\_HUKS\_SUCCESS 0 - 操作成功。  OH\_HUKS\_ERR\_CODE\_NOT\_SUPPORTED\_API 801 - 不支持的API。  OH\_HUKS\_ERR\_CODE\_COMMUNICATION\_FAIL 12000005 - IPC通信失败。  OH\_HUKS\_ERR\_CODE\_CRYPTO\_FAIL 12000006 - Ukey驱动报错。  OH\_HUKS\_ERR\_CODE\_ITEM\_NOT\_EXIST 12000011 - 未找到缓存的资源句柄，需要先根据资源ID打开资源。  OH\_HUKS\_ERR\_CODE\_INTERNAL\_ERROR 12000012 - 发生系统内部错误，处理函数未找到。  OH\_HUKS\_ERR\_CODE\_INSUFFICIENT\_MEMORY 12000014 - 内存不足。  OH\_HUKS\_ERR\_CODE\_KEY\_ALREADY\_EXIST 12000017 - 资源已打开。  OH\_HUKS\_ERR\_CODE\_ILLEGAL\_ARGUMENT 12000018 - resourceId或paramSet无效。  OH\_HUKS\_ERR\_CODE\_EXTERNAL\_ERROR 12000020 - 提供者执行失败。  OH\_HUKS\_ERR\_CODE\_BUSY 12000024 - 提供者或Ukey忙。  OH\_HUKS\_ERR\_CODE\_EXCEED\_LIMIT 12000025 - 打开资源的数量超过限制。 |

### OH\_Huks\_CloseResource()

PC/2in1



```
1. struct OH_Huks_Result OH_Huks_CloseResource(const struct OH_Huks_Blob *resourceId, const OH_Huks_ExternalCryptoParamSet *paramSet)
```

**描述**

根据指定的资源ID关闭资源。

**起始版本：** 22

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [const struct OH\_Huks\_Blob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hukstypeapi-oh-huks-blob) \*resourceId | 指定提供者的资源ID。 |
| [const OH\_Huks\_ExternalCryptoParamSet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ternalcryptotypeapi-oh-huks-externalcryptoparamset) \*paramSet | 指向句柄操作参数的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [struct OH\_Huks\_Result](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hukstypeapi-oh-huks-result) | 可能的返回码（errorCode）：  OH\_HUKS\_SUCCESS 0 - 操作成功。  OH\_HUKS\_ERR\_CODE\_NOT\_SUPPORTED\_API 801 - 不支持的 API。  OH\_HUKS\_ERR\_CODE\_COMMUNICATION\_FAIL 12000005 - IPC通信失败。  OH\_HUKS\_ERR\_CODE\_CRYPTO\_FAIL 12000006 - Ukey驱动报错。  OH\_HUKS\_ERR\_CODE\_INTERNAL\_ERROR 12000012 - 发生系统内部错误，处理函数未找到。  OH\_HUKS\_ERR\_CODE\_INSUFFICIENT\_MEMORY 12000014 - 内存不足。  OH\_HUKS\_ERR\_CODE\_ILLEGAL\_ARGUMENT 12000018 - resourceId或paramSet无效。  OH\_HUKS\_ERR\_CODE\_EXTERNAL\_ERROR 12000020 - 提供者执行失败。  OH\_HUKS\_ERR\_CODE\_BUSY 12000024 - 提供者或Ukey忙。 |

### OH\_Huks\_GetUkeyPinAuthState()

PC/2in1



```
1. struct OH_Huks_Result OH_Huks_GetUkeyPinAuthState(const struct OH_Huks_Blob *resourceId, const OH_Huks_ExternalCryptoParamSet *paramSet, OH_Huks_ExternalPinAuthState *authState)
```

**描述**

获取指定Ukey资源ID的PIN授权状态。

**起始版本：** 22

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [const struct OH\_Huks\_Blob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hukstypeapi-oh-huks-blob) \*resourceId | 指定提供者的资源ID。 |
| [const OH\_Huks\_ExternalCryptoParamSet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ternalcryptotypeapi-oh-huks-externalcryptoparamset) \*paramSet | 指向PIN授权参数的指针。 |
| bool \*authState | 用于返回指定索引的授权状态。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [struct OH\_Huks\_Result](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hukstypeapi-oh-huks-result) | 可能的返回码（errorCode）：  OH\_HUKS\_SUCCESS 0 - 操作成功。  OH\_HUKS\_ERR\_CODE\_NOT\_SUPPORTED\_API 801 - 不支持的API。  OH\_HUKS\_ERR\_CODE\_COMMUNICATION\_FAIL 12000005 - IPC通信失败。  OH\_HUKS\_ERR\_CODE\_CRYPTO\_FAIL 12000006 - Ukey驱动报错。  OH\_HUKS\_ERR\_CODE\_ITEM\_NOT\_EXIST 12000011 - 指定的资源ID无效。  OH\_HUKS\_ERR\_CODE\_INTERNAL\_ERROR 12000012 - 发生系统内部错误，处理函数未找到。  OH\_HUKS\_ERR\_CODE\_INSUFFICIENT\_MEMORY 12000014 - 内存不足。  OH\_HUKS\_ERR\_CODE\_ILLEGAL\_ARGUMENT 12000018 - resourceId或paramSet无效。  OH\_HUKS\_ERR\_CODE\_EXTERNAL\_ERROR 12000020 - 提供者执行失败。  OH\_HUKS\_ERR\_CODE\_BUSY 12000024 - 提供者或Ukey忙。 |

### OH\_Huks\_GetProperty()

PC/2in1



```
1. struct OH_Huks_Result OH_Huks_GetProperty(const struct OH_Huks_Blob *resourceId, const struct OH_Huks_Blob *propertyId, const OH_Huks_ExternalCryptoParamSet *paramSetIn, OH_Huks_ExternalCryptoParamSet **paramSetOut)
```

**描述**

外部密钥管理能力扩展提供者获取属性信息。

**起始版本：** 22

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [const struct OH\_Huks\_Blob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hukstypeapi-oh-huks-blob) \*resourceId | 指定提供者的资源ID。 |
| [const struct OH\_Huks\_Blob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hukstypeapi-oh-huks-blob) \*propertyId | 指定按GMT 0016-2023定义的属性函数名称。 |
| [const OH\_Huks\_ExternalCryptoParamSet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ternalcryptotypeapi-oh-huks-externalcryptoparamset) \*paramSetIn | 指向输入操作参数的指针。 |
| [OH\_Huks\_ExternalCryptoParamSet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ternalcryptotypeapi-oh-huks-externalcryptoparamset) \*\*paramSetOut | 指向输出参数的指针，且必须包含参数OH\_HUKS\_EXT\_CRYPTO\_TAG\_EXTRA\_DATA。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [struct OH\_Huks\_Result](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hukstypeapi-oh-huks-result) | 可能的返回码（errorCode）：  OH\_HUKS\_SUCCESS 0 - 操作成功。  OH\_HUKS\_ERR\_CODE\_NOT\_SUPPORTED\_API 801 - 不支持的API。  OH\_HUKS\_ERR\_CODE\_COMMUNICATION\_FAIL 12000005 - IPC通信失败。  OH\_HUKS\_ERR\_CODE\_CRYPTO\_FAIL 12000006 - 驱动错误。  OH\_HUKS\_ERR\_CODE\_ITEM\_NOT\_EXIST 12000011 - 未找到缓存的指定句柄。  OH\_HUKS\_ERR\_CODE\_INTERNAL\_ERROR 12000012 - 发生系统内部错误，处理函数未找到。  OH\_HUKS\_ERR\_CODE\_INSUFFICIENT\_MEMORY 12000014 - 内存不足。  OH\_HUKS\_ERR\_CODE\_ILLEGAL\_ARGUMENT 12000018 - resourceId、propertyId、paramSet或回调无效。  OH\_HUKS\_ERR\_CODE\_EXTERNAL\_ERROR 12000020 - 提供者或Ukey内部执行失败。  OH\_HUKS\_ERR\_CODE\_PIN\_LOCKED 12000021 - PIN码被锁定。  OH\_HUKS\_ERR\_CODE\_PIN\_NO\_AUTH 12000023 - PIN码未通过认证。  OH\_HUKS\_ERR\_CODE\_BUSY 12000024 - 提供者或Ukey中的资源正在被使用。 |

### OH\_Huks\_InitExternalCryptoParamSet()

PC/2in1



```
1. struct OH_Huks_Result OH_Huks_InitExternalCryptoParamSet(OH_Huks_ExternalCryptoParamSet **paramSet)
```

**描述**

初始化一个参数集合。

**起始版本：** 22

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Huks\_ExternalCryptoParamSet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ternalcryptotypeapi-oh-huks-externalcryptoparamset) \*\*paramSet | 指向要初始化的参数集合的二级指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [struct OH\_Huks\_Result](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hukstypeapi-oh-huks-result) | 可能的返回码（errorCode）：  OH\_HUKS\_SUCCESS 0 - 操作成功。  OH\_HUKS\_ERR\_CODE\_INSUFFICIENT\_MEMORY 12000014 - 内存不足。  OH\_HUKS\_ERR\_CODE\_INVALID\_ARGUMENT 12000018 - params为NULL或paramSet无效。 |

### OH\_Huks\_AddExternalCryptoParams()

PC/2in1



```
1. struct OH_Huks_Result OH_Huks_AddExternalCryptoParams(OH_Huks_ExternalCryptoParamSet *paramSet, const OH_Huks_ExternalCryptoParam *params, uint32_t paramCnt)
```

**描述**

向参数集合中添加参数。

**起始版本：** 22

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Huks\_ExternalCryptoParamSet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ternalcryptotypeapi-oh-huks-externalcryptoparamset) \*paramSet | 指向将要添加参数的参数集合。 |
| [const OH\_Huks\_ExternalCryptoParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/sexternalcryptotypeapi-oh-huks-externalcryptoparam) \*params | 指向要添加的参数数组。 |
| uint32\_t paramCnt | 要添加的参数数量。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [struct OH\_Huks\_Result](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hukstypeapi-oh-huks-result) | 可能的返回码（errorCode）：  OH\_HUKS\_SUCCESS 0 - 操作成功。  OH\_HUKS\_ERR\_CODE\_INVALID\_ARGUMENT 12000018 - params为NULL或paramSet无效。 |

### OH\_Huks\_BuildExternalCryptoParamSet()

PC/2in1



```
1. struct OH_Huks_Result OH_Huks_BuildExternalCryptoParamSet(OH_Huks_ExternalCryptoParamSet **paramSet)
```

**描述**

构建一个参数集合。

**起始版本：** 22

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Huks\_ExternalCryptoParamSet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ternalcryptotypeapi-oh-huks-externalcryptoparamset) \*\*paramSet | 指向要构建的参数集合的二级指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [struct OH\_Huks\_Result](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hukstypeapi-oh-huks-result) | 可能的返回码（errorCode）：  OH\_HUKS\_SUCCESS 0 - 操作成功。  OH\_HUKS\_ERR\_CODE\_INVALID\_ARGUMENT 12000018 - paramSet无效。  OH\_HUKS\_ERR\_CODE\_INSUFFICIENT\_MEMORY 12000014 - 内存不足。 |

### OH\_Huks\_FreeExternalCryptoParamSet()

PC/2in1



```
1. void OH_Huks_FreeExternalCryptoParamSet(OH_Huks_ExternalCryptoParamSet **paramSet)
```

**描述**

销毁一个参数集合并释放相关内存。

**起始版本：** 22

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Huks\_ExternalCryptoParamSet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ternalcryptotypeapi-oh-huks-externalcryptoparamset) \*\*paramSet | 指向要销毁的参数集合的二级指针。 |

### OH\_Huks\_GetExternalCryptoParam()

PC/2in1



```
1. struct OH_Huks_Result OH_Huks_GetExternalCryptoParam(OH_Huks_ExternalCryptoParamSet *paramSet, const uint32_t tag, OH_Huks_ExternalCryptoParam **param)
```

**描述**

从参数集合中获取指定参数。

**起始版本：** 22

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Huks\_ExternalCryptoParamSet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ternalcryptotypeapi-oh-huks-externalcryptoparamset) \*paramSet | 指向目标参数集合的指针。 |
| const uint32\_t tag | 指定要获取的参数标签值。 |
| [OH\_Huks\_ExternalCryptoParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/sexternalcryptotypeapi-oh-huks-externalcryptoparam) \*\*param | 用于返回获取到的参数的二级指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [struct OH\_Huks\_Result](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hukstypeapi-oh-huks-result) | 可能的返回码（errorCode）：  OH\_HUKS\_SUCCESS 0 - 操作成功。  OH\_HUKS\_ERR\_CODE\_INVALID\_ARGUMENT 12000018 - paramSet或param无效，或参数在集合中不存在。 |