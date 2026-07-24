## 概述

PhonePC/2in1TabletTVWearable

定义密钥协商接口。

**引用文件：** <CryptoArchitectureKit/crypto\_key\_agreement.h>

**库：** libohcrypto.so

**系统能力：** SystemCapability.Security.CryptoFramework

**起始版本：** 20

**相关模块：** [CryptoKeyAgreementApi](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptokeyagreementapi)

## 汇总

PhonePC/2in1TabletTVWearable

### 结构体

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [OH\_CryptoKeyAgreement](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptokeyagreementapi-oh-cryptokeyagreement) | OH\_CryptoKeyAgreement | 定义密钥协商结构。 |

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [OH\_Crypto\_ErrCode OH\_CryptoKeyAgreement\_Create(const char \*algoName, OH\_CryptoKeyAgreement \*\*ctx)](/consumer/cn/doc/harmonyos-references/capi-crypto-key-agreement-h#oh_cryptokeyagreement_create) | 根据给定的算法名称创建密钥协商实例。  注意：创建的资源必须通过[OH\_CryptoKeyAgreement\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-key-agreement-h#oh_cryptokeyagreement_destroy)销毁。 |
| [OH\_Crypto\_ErrCode OH\_CryptoKeyAgreement\_GenerateSecret(OH\_CryptoKeyAgreement \*ctx, OH\_CryptoPrivKey \*privkey, OH\_CryptoPubKey \*pubkey, Crypto\_DataBlob \*secret)](/consumer/cn/doc/harmonyos-references/capi-crypto-key-agreement-h#oh_cryptokeyagreement_generatesecret) | 生成密钥协商的秘密值。  注意：使用完成后必须通过[OH\_Crypto\_FreeDataBlob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-common-h#oh_crypto_freedatablob)释放secret内存。 |
| [void OH\_CryptoKeyAgreement\_Destroy(OH\_CryptoKeyAgreement \*ctx)](/consumer/cn/doc/harmonyos-references/capi-crypto-key-agreement-h#oh_cryptokeyagreement_destroy) | 销毁密钥协商实例。 |

## 函数说明

PhonePC/2in1TabletTVWearable

### OH\_CryptoKeyAgreement\_Create()

PhonePC/2in1TabletTVWearable



```
1. OH_Crypto_ErrCode OH_CryptoKeyAgreement_Create(const char *algoName, OH_CryptoKeyAgreement **ctx)
```

**描述**

根据给定的算法名称创建密钥协商实例。

注意：创建的资源必须通过[OH\_CryptoKeyAgreement\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-key-agreement-h#oh_cryptokeyagreement_destroy)销毁。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const char \*algoName | 用于生成密钥协商实例的算法名称。  例如"ECC"、"X25519"。 |
| [OH\_CryptoKeyAgreement](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptokeyagreementapi-oh-cryptokeyagreement) \*\*ctx | 密钥协商实例。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Crypto\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-common-h#oh_crypto_errcode) | CRYPTO\_SUCCESS：操作成功。  CRYPTO\_NOT\_SUPPORTED：操作不支持。  CRYPTO\_MEMORY\_ERROR：内存错误。  CRYPTO\_PARAMETER\_CHECK\_FAILED：参数检查失败。  CRYPTO\_OPERTION\_ERROR：调用三方算法库API出错。 |

### OH\_CryptoKeyAgreement\_GenerateSecret()

PhonePC/2in1TabletTVWearable



```
1. OH_Crypto_ErrCode OH_CryptoKeyAgreement_GenerateSecret(OH_CryptoKeyAgreement *ctx, OH_CryptoPrivKey *privkey, OH_CryptoPubKey *pubkey, Crypto_DataBlob *secret)
```

**描述**

生成密钥协商的秘密值。

注意：使用完成后必须通过[OH\_Crypto\_FreeDataBlob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-common-h#oh_crypto_freedatablob)释放secret内存。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_CryptoKeyAgreement](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptokeyagreementapi-oh-cryptokeyagreement) \*ctx | 密钥协商实例。 |
| [OH\_CryptoPrivKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptoasymkeyapi-oh-cryptoprivkey) \*privkey | 私钥。 |
| [OH\_CryptoPubKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptoasymkeyapi-oh-cryptopubkey) \*pubkey | 公钥。 |
| [Crypto\_DataBlob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptocommonapi-crypto-datablob) \*secret | 秘密值。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Crypto\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-common-h#oh_crypto_errcode) | CRYPTO\_SUCCESS：操作成功。  CRYPTO\_NOT\_SUPPORTED：操作不支持。  CRYPTO\_MEMORY\_ERROR：内存错误。  CRYPTO\_PARAMETER\_CHECK\_FAILED：参数检查失败。  CRYPTO\_OPERTION\_ERROR：调用三方算法库API出错。 |

### OH\_CryptoKeyAgreement\_Destroy()

PhonePC/2in1TabletTVWearable



```
1. void OH_CryptoKeyAgreement_Destroy(OH_CryptoKeyAgreement *ctx)
```

**描述**

销毁密钥协商实例。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_CryptoKeyAgreement](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptokeyagreementapi-oh-cryptokeyagreement) \*ctx | 密钥协商实例。 |