## 概述

PhonePC/2in1TabletTVWearable

定义对称密钥加密API。

**引用文件：** <CryptoArchitectureKit/crypto\_sym\_cipher.h>

**库：** libohcrypto.so

**系统能力：** SystemCapability.Security.CryptoFramework

**起始版本：** 12

**相关模块：** [CryptoSymCipherApi](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptosymcipherapi)

## 汇总

PhonePC/2in1TabletTVWearable

### 结构体

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [OH\_CryptoSymCipher](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptosymcipherapi-oh-cryptosymcipher) | OH\_CryptoSymCipher | 定义对称加解密结构体。 |
| [OH\_CryptoSymCipherParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptosymcipherapi-oh-cryptosymcipherparams) | OH\_CryptoSymCipherParams | 定义对称加解密参数结构体。 |

### 枚举

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [CryptoSymCipher\_ParamsType](/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#cryptosymcipher_paramstype) | CryptoSymCipher\_ParamsType | 定义对称加解密参数类型。 |

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [OH\_Crypto\_ErrCode OH\_CryptoSymCipherParams\_Create(OH\_CryptoSymCipherParams \*\*params)](/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipherparams_create) | 创建对称密钥加解密参数实例。  注意：创建的资源必须通过[OH\_CryptoSymCipherParams\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipherparams_destroy)销毁。 |
| [OH\_Crypto\_ErrCode OH\_CryptoSymCipherParams\_SetParam(OH\_CryptoSymCipherParams \*params, CryptoSymCipher\_ParamsType paramsType, Crypto\_DataBlob \*value)](/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipherparams_setparam) | 设置对称密钥加解密参数。 |
| [void OH\_CryptoSymCipherParams\_Destroy(OH\_CryptoSymCipherParams \*params)](/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipherparams_destroy) | 销毁对称密钥加解密参数实例。 |
| [OH\_Crypto\_ErrCode OH\_CryptoSymCipher\_Create(const char \*algoName, OH\_CryptoSymCipher \*\*ctx)](/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_create) | 根据给定的算法名称创建对称密钥加解密实例。  注意：创建的资源必须通过[OH\_CryptoSymCipher\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_destroy)销毁。 |
| [OH\_Crypto\_ErrCode OH\_CryptoSymCipher\_Init(OH\_CryptoSymCipher \*ctx, Crypto\_CipherMode mod, OH\_CryptoSymKey \*key, OH\_CryptoSymCipherParams \*params)](/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_init) | 初始化对称密钥加解密实例。 |
| [OH\_Crypto\_ErrCode OH\_CryptoSymCipher\_Update(OH\_CryptoSymCipher \*ctx, Crypto\_DataBlob \*in, Crypto\_DataBlob \*out)](/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_update) | 更新加密或者解密数据操作。  注意：使用完成后必须通过[OH\_Crypto\_FreeDataBlob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-common-h#oh_crypto_freedatablob)释放out内存。 |
| [OH\_Crypto\_ErrCode OH\_CryptoSymCipher\_Final(OH\_CryptoSymCipher \*ctx, Crypto\_DataBlob \*in, Crypto\_DataBlob \*out)](/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_final) | 输出加/解密（分组模式产生的）剩余数据，最后结束加密或者解密数据操作。  注意：使用完成后必须通过[OH\_Crypto\_FreeDataBlob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-common-h#oh_crypto_freedatablob)释放out内存。 |
| [const char \*OH\_CryptoSymCipher\_GetAlgoName(OH\_CryptoSymCipher \*ctx)](/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_getalgoname) | 获取对称密钥加解密实例的算法名称。 |
| [void OH\_CryptoSymCipher\_Destroy(OH\_CryptoSymCipher \*ctx)](/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_destroy) | 销毁对称密钥加解密实例。 |

## 枚举类型说明

PhonePC/2in1TabletTVWearable

### CryptoSymCipher\_ParamsType

PhonePC/2in1TabletTVWearable



```
1. enum CryptoSymCipher_ParamsType
```

**描述**

定义对称加解密参数类型。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| CRYPTO\_IV\_DATABLOB = 100 | 表示iv等参数。 |
| CRYPTO\_AAD\_DATABLOB = 101 | 表示GCM模式下的附加认证数据。 |
| CRYPTO\_TAG\_DATABLOB = 102 | 表示加密操作的输出标签,用于完整性检查。 |

## 函数说明

PhonePC/2in1TabletTVWearable

### OH\_CryptoSymCipherParams\_Create()

PhonePC/2in1TabletTVWearable



```
1. OH_Crypto_ErrCode OH_CryptoSymCipherParams_Create(OH_CryptoSymCipherParams **params)
```

**描述**

创建对称密钥加解密参数实例。

注意：创建的资源必须通过[OH\_CryptoSymCipherParams\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipherparams_destroy)销毁。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_CryptoSymCipherParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptosymcipherapi-oh-cryptosymcipherparams) \*\*params | 指向对称加解密参数实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Crypto\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-common-h#oh_crypto_errcode) | CRYPTO\_SUCCESS：操作成功。  CRYPTO\_INVALID\_PARAMS：参数无效。  CRYPTO\_NOT\_SUPPORTED：操作不支持。  CRYPTO\_MEMORY\_ERROR：内存错误。  CRYPTO\_OPERTION\_ERROR：调用三方算法库API出错。 |

### OH\_CryptoSymCipherParams\_SetParam()

PhonePC/2in1TabletTVWearable



```
1. OH_Crypto_ErrCode OH_CryptoSymCipherParams_SetParam(OH_CryptoSymCipherParams *params, CryptoSymCipher_ParamsType paramsType, Crypto_DataBlob *value)
```

**描述**

设置对称密钥加解密参数。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_CryptoSymCipherParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptosymcipherapi-oh-cryptosymcipherparams) \*params | 指向对称密钥加解密参数实例。 |
| [CryptoSymCipher\_ParamsType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#cryptosymcipher_paramstype) paramsType | 设置对称密钥加解密参数类型。 |
| [Crypto\_DataBlob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptocommonapi-crypto-datablob) \*value | 设置的参数值。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Crypto\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-common-h#oh_crypto_errcode) | CRYPTO\_SUCCESS：操作成功。  CRYPTO\_INVALID\_PARAMS：参数无效。  CRYPTO\_NOT\_SUPPORTED：操作不支持。  CRYPTO\_MEMORY\_ERROR：内存错误。  CRYPTO\_OPERTION\_ERROR：调用三方算法库API出错。 |

### OH\_CryptoSymCipherParams\_Destroy()

PhonePC/2in1TabletTVWearable



```
1. void OH_CryptoSymCipherParams_Destroy(OH_CryptoSymCipherParams *params)
```

**描述**

销毁对称密钥加解密参数实例。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_CryptoSymCipherParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptosymcipherapi-oh-cryptosymcipherparams) \*params | 指向对称密钥加解密参数实例。 |

### OH\_CryptoSymCipher\_Create()

PhonePC/2in1TabletTVWearable



```
1. OH_Crypto_ErrCode OH_CryptoSymCipher_Create(const char *algoName, OH_CryptoSymCipher **ctx)
```

**描述**

根据给定的算法名称创建对称密钥加解密实例。

注意：创建的资源必须通过[OH\_CryptoSymCipher\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_destroy)销毁。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const char \*algoName | 用于生成加密实例的算法名称。  例如"AES128|GCM|PKCS7"。 |
| [OH\_CryptoSymCipher](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptosymcipherapi-oh-cryptosymcipher) \*\*ctx | 指向对称密钥加密实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Crypto\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-common-h#oh_crypto_errcode) | CRYPTO\_SUCCESS：操作成功。  CRYPTO\_INVALID\_PARAMS：参数无效。  CRYPTO\_NOT\_SUPPORTED：操作不支持。  CRYPTO\_MEMORY\_ERROR：内存错误。  CRYPTO\_PARAMETER\_CHECK\_FAILED：参数校验失败。  CRYPTO\_OPERTION\_ERROR：调用三方算法库API出错。 |

### OH\_CryptoSymCipher\_Init()

PhonePC/2in1TabletTVWearable



```
1. OH_Crypto_ErrCode OH_CryptoSymCipher_Init(OH_CryptoSymCipher *ctx, Crypto_CipherMode mod, OH_CryptoSymKey *key, OH_CryptoSymCipherParams *params)
```

**描述**

初始化对称密钥加解密实例。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_CryptoSymCipher](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptosymcipherapi-oh-cryptosymcipher) \*ctx | 对称密钥加密实例。 |
| [Crypto\_CipherMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-common-h#crypto_ciphermode) mod | 加解密模式。 |
| [OH\_CryptoSymKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptosymkeyapi-oh-cryptosymkey) \*key | 对称密钥。 |
| [OH\_CryptoSymCipherParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptosymcipherapi-oh-cryptosymcipherparams) \*params | 指向对称密钥参数实例。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Crypto\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-common-h#oh_crypto_errcode) | CRYPTO\_SUCCESS：操作成功。  CRYPTO\_INVALID\_PARAMS：参数无效。  CRYPTO\_NOT\_SUPPORTED：操作不支持。  CRYPTO\_MEMORY\_ERROR：内存错误。  CRYPTO\_PARAMETER\_CHECK\_FAILED：参数校验失败。  CRYPTO\_OPERTION\_ERROR：调用三方算法库API出错。 |

**参考：**

[OH\_CryptoSymCipher\_Update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_update)

[OH\_CryptoSymCipher\_Final](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_final)

### OH\_CryptoSymCipher\_Update()

PhonePC/2in1TabletTVWearable



```
1. OH_Crypto_ErrCode OH_CryptoSymCipher_Update(OH_CryptoSymCipher *ctx, Crypto_DataBlob *in, Crypto_DataBlob *out)
```

**描述**

更新加密或者解密数据操作。

注意：使用完成后必须通过[OH\_Crypto\_FreeDataBlob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-common-h#oh_crypto_freedatablob)释放out内存。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_CryptoSymCipher](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptosymcipherapi-oh-cryptosymcipher) \*ctx | 指向对称密钥加解密实例。 |
| [Crypto\_DataBlob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptocommonapi-crypto-datablob) \*in | 加密或者解密的数据。 |
| [Crypto\_DataBlob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptocommonapi-crypto-datablob) \*out | 更新的结果。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Crypto\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-common-h#oh_crypto_errcode) | CRYPTO\_SUCCESS：操作成功。  CRYPTO\_INVALID\_PARAMS：参数无效。  CRYPTO\_NOT\_SUPPORTED：操作不支持。  CRYPTO\_MEMORY\_ERROR：内存错误。  CRYPTO\_PARAMETER\_CHECK\_FAILED：参数校验失败。  CRYPTO\_OPERTION\_ERROR：调用三方算法库API出错。 |

**参考：**

[OH\_CryptoSymCipher\_Init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_init)

[OH\_CryptoSymCipher\_Final](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_final)

### OH\_CryptoSymCipher\_Final()

PhonePC/2in1TabletTVWearable



```
1. OH_Crypto_ErrCode OH_CryptoSymCipher_Final(OH_CryptoSymCipher *ctx, Crypto_DataBlob *in, Crypto_DataBlob *out)
```

**描述**

输出加/解密（分组模式产生的）剩余数据，最后结束加密或者解密数据操作。

注意：使用完成后必须通过[OH\_Crypto\_FreeDataBlob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-common-h#oh_crypto_freedatablob)释放out内存。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_CryptoSymCipher](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptosymcipherapi-oh-cryptosymcipher) \*ctx | 对称密钥加密实例。 |
| [Crypto\_DataBlob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptocommonapi-crypto-datablob) \*in | 要加密或解密的数据。 |
| [Crypto\_DataBlob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptocommonapi-crypto-datablob) \*out | 返回剩余数据的加/解密结果。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Crypto\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-common-h#oh_crypto_errcode) | CRYPTO\_SUCCESS：操作成功。  CRYPTO\_INVALID\_PARAMS：参数无效。  CRYPTO\_NOT\_SUPPORTED：操作不支持。  CRYPTO\_MEMORY\_ERROR：内存错误。  CRYPTO\_PARAMETER\_CHECK\_FAILED：参数校验失败。  CRYPTO\_OPERTION\_ERROR：调用三方算法库API出错。 |

**参考：**

[OH\_CryptoSymCipher\_Init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_init)

[OH\_CryptoSymCipher\_Update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_update)

### OH\_CryptoSymCipher\_GetAlgoName()

PhonePC/2in1TabletTVWearable



```
1. const char *OH_CryptoSymCipher_GetAlgoName(OH_CryptoSymCipher *ctx)
```

**描述**

获取对称密钥加解密实例的算法名称。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_CryptoSymCipher](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptosymcipherapi-oh-cryptosymcipher) \*ctx | 指向对称密钥加解密实例。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| const char \* | 返回对称密钥加密算法名称。 |

### OH\_CryptoSymCipher\_Destroy()

PhonePC/2in1TabletTVWearable



```
1. void OH_CryptoSymCipher_Destroy(OH_CryptoSymCipher *ctx)
```

**描述**

销毁对称密钥加解密实例。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_CryptoSymCipher](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptosymcipherapi-oh-cryptosymcipher) \*ctx | 指向对称密钥加解密实例。 |