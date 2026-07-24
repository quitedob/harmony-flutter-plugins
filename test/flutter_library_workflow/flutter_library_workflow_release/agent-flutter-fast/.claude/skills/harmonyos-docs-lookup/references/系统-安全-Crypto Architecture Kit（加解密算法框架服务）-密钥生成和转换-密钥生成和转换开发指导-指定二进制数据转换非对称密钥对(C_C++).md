以RSA、ECC、SM2为例，根据指定的非对称密钥二进制数据，生成非对称密钥对（OH\_CryptoKeyPair），即将外部或存储的二进制数据转换为算法库的密钥对象，该对象可用于后续的加解密等操作。

说明

针对非对称密钥的convertKey操作：

* 公钥需满足：ASN.1语法、X.509规范、DER编码格式。
* 私钥需满足：ASN.1语法、PKCS#8规范、DER编码格式。

## 在CMake脚本中链接相关动态库

收起

自动换行

深色代码主题

复制

```
1. target_link_libraries(entry PUBLIC libohcrypto.so)
```

## 指定二进制数据转换RSA密钥对

对应的算法规格请查看[非对称密钥生成和转换规格：RSA](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-asym-key-generation-conversion-spec#rsa)。

1. 获取RSA公钥或私钥二进制数据，封装成[Crypto\_DataBlob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptocommonapi-crypto-datablob)。

   公钥和私钥可单独传入，此处示例传入公钥。
2. 调用[OH\_CryptoAsymKeyGenerator\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeygenerator_create)，指定字符串参数'RSA1024'，创建密钥算法为RSA1024、素数个数为2的非对称密钥生成器（OH\_CryptoAsymKeyGenerator）。

   生成RSA非对称密钥时，默认素数为2，此处省略了参数PRIMES\_2。
3. 调用[OH\_CryptoAsymKeyGenerator\_Convert](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeygenerator_convert)，传入二进制密钥数据，生成非对称密钥对象（OH\_CryptoKeyPair）。

* 以下以生成RSA密钥对为例：

收起

自动换行

深色代码主题

复制

```
1. #include "CryptoArchitectureKit/crypto_common.h"
2. #include "CryptoArchitectureKit/crypto_asym_key.h"

4. static OH_Crypto_ErrCode doTestDataCovertAsymKey()
5. {
6. OH_CryptoAsymKeyGenerator *ctx = nullptr;
7. OH_Crypto_ErrCode ret;

9. ret = OH_CryptoAsymKeyGenerator_Create("RSA1024|PRIMES_2", &ctx);
10. if (ret != CRYPTO_SUCCESS) {
11. return ret;
12. }

14. uint8_t rsaDataBlob[] = { 48,129,159,48,13,6,9,42,134,72,134,247,13,1,1,1,5,0,3,129,141,0,
15. 48,129,137,2,129,129,0,235,184,151,247,130,216,140,187,64,124,219,137,140,184,53,137,216,105,
16. 156,141,137,165,30,80,232,55,96,46,23,237,197,123,121,27,240,190,14,111,237,172,67,42,47,164,
17. 226,248,211,157,213,194,131,109,181,41,173,217,127,252,121,126,26,130,55,4,134,104,73,5,132,
18. 91,214,146,232,64,99,87,33,222,155,159,9,59,212,144,46,183,83,89,220,189,148,13,176,5,139,156,
19. 230,143,16,152,79,36,8,112,40,174,35,83,82,57,137,87,123,215,99,199,66,131,150,31,143,56,252,2,
20. 73,41,70,159,2,3,1,0,1 };
21. Crypto_DataBlob retBlob = { .data = rsaDataBlob, .len = sizeof(rsaDataBlob) };

23. OH_CryptoKeyPair *dupKeyPair = nullptr;
24. ret = OH_CryptoAsymKeyGenerator_Convert(ctx, CRYPTO_DER, &retBlob, nullptr, &dupKeyPair);
25. if (ret != CRYPTO_SUCCESS) {
26. OH_CryptoAsymKeyGenerator_Destroy(ctx);
27. return ret;
28. }


31. OH_CryptoAsymKeyGenerator_Destroy(ctx);
32. OH_CryptoKeyPair_Destroy(dupKeyPair);
33. return ret;
34. }
```

## 指定二进制数据转换ECC密钥对

对应的算法规格请查看[非对称密钥生成和转换规格：ECC](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-asym-key-generation-conversion-spec#ecc)。

1. 获取ECC公钥或私钥二进制数据，封装成[Crypto\_DataBlob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptocommonapi-crypto-datablob)。

   公钥和私钥可单独传入，此处示例传入公钥和私钥。
2. 调用[OH\_CryptoAsymKeyGenerator\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeygenerator_create)，指定字符串参数'ECC256'，创建密钥算法为ECC、密钥长度为256位的非对称密钥生成器（OH\_CryptoAsymKeyGenerator）。
3. 调用[OH\_CryptoAsymKeyGenerator\_Convert](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeygenerator_convert)，传入公钥二进制和私钥二进制，生成非对称密钥对象（OH\_CryptoKeyPair）。

* 以下以生成ECC密钥对为例：

收起

自动换行

深色代码主题

复制

```
1. #include "CryptoArchitectureKit/crypto_common.h"
2. #include "CryptoArchitectureKit/crypto_asym_key.h"

4. static OH_Crypto_ErrCode doAsymEccCovert()
5. {
6. OH_CryptoAsymKeyGenerator *ctx = nullptr;
7. OH_Crypto_ErrCode ret;

9. ret = OH_CryptoAsymKeyGenerator_Create("ECC256", &ctx);
10. if (ret != CRYPTO_SUCCESS) {
11. return ret;
12. }

14. uint8_t ecc224PubKeyBlobData[] = {
15. 48,89,48,19,6,7,42,134,72,206,61,2,1,6,8,42,134, 72,206,61,3,1,7,3,66,0,4,157,58,248,
16. 205,95,171,229,33,116,44,192,12,115,119,84,156,128,56,180,246,84,43,33,244,224,221,181,
17. 154,155,222,157,124,131,217,214,134,199,155,61,196,203,107,13,227,121,57,199,109,220,
18. 103,55,78,148,185,226,212,162,31,66,201,50,129,1,156
19. };

21. uint8_t ecc224PriKeyBlobData[] = {
22. 48,49,2,1,1,4,32,255,121,33,196,188,159,112,149,146,107,243,78,152,214,12,119,87,199,
23. 207,57,116,64,150,240,121,22,88,138,196,71,70,222,160,10,6,8,42,134,72,206,61,3,1,7
24. };
25. Crypto_DataBlob pubBlob = { .data = ecc224PubKeyBlobData, .len = sizeof(ecc224PubKeyBlobData) };
26. Crypto_DataBlob priBlob = { .data = ecc224PriKeyBlobData, .len = sizeof(ecc224PriKeyBlobData) };

28. OH_CryptoKeyPair *dupKeyPair = nullptr;
29. ret = OH_CryptoAsymKeyGenerator_Convert(ctx, CRYPTO_DER, &pubBlob, &priBlob, &dupKeyPair);
30. if (ret != CRYPTO_SUCCESS) {
31. OH_CryptoAsymKeyGenerator_Destroy(ctx);
32. return ret;
33. }

35. OH_CryptoAsymKeyGenerator_Destroy(ctx);
36. OH_CryptoKeyPair_Destroy(dupKeyPair);
37. return ret;
38. }
```

## 指定二进制数据转换SM2密钥对

对应的算法规格请查看[非对称密钥生成和转换规格：SM2](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-asym-key-generation-conversion-spec#sm2)。

1. 获取SM2公钥或私钥二进制数据，封装成[Crypto\_DataBlob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptocommonapi-crypto-datablob)。

   公钥和私钥可单独传入，此处示例传入公钥和私钥。
2. 调用[OH\_CryptoAsymKeyGenerator\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeygenerator_create)，指定字符串参数'SM2\_256'，创建密钥算法为SM2、密钥长度为256位的非对称密钥生成器（OH\_CryptoAsymKeyGenerator）。
3. 调用[OH\_CryptoAsymKeyGenerator\_Convert](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeygenerator_convert)，传入公钥二进制和私钥二进制，生成非对称密钥对象（OH\_CryptoKeyPair）。

* 以生成SM2密钥对为例：

收起

自动换行

深色代码主题

复制

```
1. #include "CryptoArchitectureKit/crypto_common.h"
2. #include "CryptoArchitectureKit/crypto_asym_key.h"

4. static OH_Crypto_ErrCode doAsymSm2Covert()
5. {
6. OH_CryptoAsymKeyGenerator *ctx = nullptr;
7. OH_CryptoKeyPair *dupKeyPair = nullptr;
8. OH_Crypto_ErrCode ret;

10. ret = OH_CryptoAsymKeyGenerator_Create("SM2_256", &ctx);
11. if (ret != CRYPTO_SUCCESS) {
12. return ret;
13. }

15. uint8_t sm2PubKeyBlobData[] = { 48,89,48,19,6,7,42,134,72,206,61,2,1,6,8,42,134,
16. 72,206,61,3,1,7,3,66,0,4,157,58,248,205,95,171,229,33,116,44,192,12,115,119,84,156,128,
17. 56,180,246,84,43,33,244,224,221,181,154,155,222,157,124,131,217,214,134,199,155,61,196,
18. 203,107,13,227,121,57,199,109,220,103,55,78,148,185,226,212,162,31,66,201,50,129,1,156 };

20. uint8_t sm2PriKeyBlobData[] = { 48,49,2,1,1,4,32,255,121,33,196,188,159,112,149,146,
21. 107,243,78,152,214,12,119,87,199,207,57,116,64,150,240,121,22,88,138,196,71,70,222,160,
22. 10,6,8,42,134,72,206,61,3,1,7 };
23. Crypto_DataBlob pubBlob = { .data = sm2PubKeyBlobData, .len = sizeof(sm2PubKeyBlobData) };
24. Crypto_DataBlob priBlob = { .data = sm2PriKeyBlobData, .len = sizeof(sm2PriKeyBlobData) };
25. ret = OH_CryptoAsymKeyGenerator_Convert(ctx, CRYPTO_DER, &pubBlob, &priBlob, &dupKeyPair);
26. if (ret != CRYPTO_SUCCESS) {
27. OH_CryptoAsymKeyGenerator_Destroy(ctx);
28. return ret;
29. }

31. OH_CryptoAsymKeyGenerator_Destroy(ctx);
32. OH_CryptoKeyPair_Destroy(dupKeyPair);
33. return ret;
34. }
```