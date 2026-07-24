以RSA和SM2为例，随机生成非对称密钥对（OH\_CryptoKeyPair），并获得二进制数据。

非对称密钥对可用于后续加解密等操作，二进制数据可用于存储或传输。

## 在CMake脚本中链接相关动态库

收起

自动换行

深色代码主题

复制

```
1. target_link_libraries(entry PUBLIC libohcrypto.so)
```

## 随机生成RSA密钥对

对应的算法规格请查看[非对称密钥生成和转换规格：RSA](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-asym-key-generation-conversion-spec#rsa)。

1. 调用[OH\_CryptoAsymKeyGenerator\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeygenerator_create)，指定字符串参数'RSA1024|PRIMES\_2'，创建RSA密钥类型为RSA1024、素数个数为2的非对称密钥生成器（OH\_CryptoAsymKeyGenerator）。
2. 调用[OH\_CryptoAsymKeyGenerator\_Generate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeygenerator_generate)，随机生成非对称密钥对象（OH\_CryptoKeyPair）。
3. 调用[OH\_CryptoPubKey\_Encode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptopubkey_encode)获取公钥密钥对象的二进制数据。

收起

自动换行

深色代码主题

复制

```
1. #include "CryptoArchitectureKit/crypto_common.h"
2. #include "CryptoArchitectureKit/crypto_asym_key.h"

4. static OH_Crypto_ErrCode randomGenerateAsymKey()
5. {
6. OH_CryptoAsymKeyGenerator *ctx = nullptr;
7. OH_CryptoKeyPair *keyPair = nullptr;
8. OH_Crypto_ErrCode ret;

10. ret = OH_CryptoAsymKeyGenerator_Create("RSA1024|PRIMES_2", &ctx);
11. if (ret != CRYPTO_SUCCESS) {
12. OH_CryptoAsymKeyGenerator_Destroy(ctx);
13. return ret;
14. }


17. ret = OH_CryptoAsymKeyGenerator_Generate(ctx, &keyPair);
18. if (ret != CRYPTO_SUCCESS) {
19. OH_CryptoAsymKeyGenerator_Destroy(ctx);
20. OH_CryptoKeyPair_Destroy(keyPair);
21. return ret;
22. }

24. OH_CryptoPubKey *pubKey = OH_CryptoKeyPair_GetPubKey(keyPair);
25. Crypto_DataBlob retBlob = { .data = nullptr, .len = 0 };
26. ret = OH_CryptoPubKey_Encode(pubKey, CRYPTO_PEM, "PKCS1", &retBlob);
27. if (ret != CRYPTO_SUCCESS) {
28. OH_CryptoAsymKeyGenerator_Destroy(ctx);
29. OH_CryptoKeyPair_Destroy(keyPair);
30. return ret;
31. }

33. OH_Crypto_FreeDataBlob(&retBlob);

35. OH_CryptoAsymKeyGenerator_Destroy(ctx);
36. OH_CryptoKeyPair_Destroy(keyPair);
37. return ret;
38. }
```

## 随机生成SM2密钥对

对应的算法规格请查看[非对称密钥生成和转换规格：SM2](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-asym-key-generation-conversion-spec#sm2)。

1. 调用[OH\_CryptoAsymKeyGenerator\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeygenerator_create)，指定字符串参数'SM2\_256'，创建密钥算法为SM2、密钥长度为256位的非对称密钥生成器（OH\_CryptoAsymKeyGenerator）。
2. 调用[OH\_CryptoAsymKeyGenerator\_Generate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeygenerator_generate)，随机生成非对称密钥对象（OH\_CryptoKeyPair）。
3. 调用[OH\_CryptoPubKey\_Encode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptopubkey_encode)获取公钥密钥对象的二进制数据。

收起

自动换行

深色代码主题

复制

```
1. #include "CryptoArchitectureKit/crypto_common.h"
2. #include "CryptoArchitectureKit/crypto_asym_key.h"

4. static OH_Crypto_ErrCode randomGenerateSm2KeyPair()
5. {
6. OH_CryptoAsymKeyGenerator *ctx = nullptr;
7. OH_CryptoKeyPair *dupKeyPair = nullptr;
8. OH_Crypto_ErrCode ret;

10. ret = OH_CryptoAsymKeyGenerator_Create("SM2_256", &ctx);
11. if (ret != CRYPTO_SUCCESS) {
12. OH_CryptoAsymKeyGenerator_Destroy(ctx);
13. return ret;
14. }

16. ret = OH_CryptoAsymKeyGenerator_Generate(ctx, &dupKeyPair);
17. if (ret != CRYPTO_SUCCESS) {
18. OH_CryptoAsymKeyGenerator_Destroy(ctx);
19. OH_CryptoKeyPair_Destroy(dupKeyPair);
20. return ret;
21. }

23. OH_CryptoPubKey *pubKey = OH_CryptoKeyPair_GetPubKey(dupKeyPair);
24. Crypto_DataBlob retBlob = { .data = nullptr, .len = 0 };
25. ret = OH_CryptoPubKey_Encode(pubKey, CRYPTO_DER, nullptr, &retBlob);
26. if (ret != CRYPTO_SUCCESS) {
27. OH_CryptoAsymKeyGenerator_Destroy(ctx);
28. OH_CryptoKeyPair_Destroy(dupKeyPair);
29. return ret;
30. }

32. OH_Crypto_FreeDataBlob(&retBlob);
33. OH_CryptoAsymKeyGenerator_Destroy(ctx);
34. OH_CryptoKeyPair_Destroy(dupKeyPair);
35. return ret;
36. }
```