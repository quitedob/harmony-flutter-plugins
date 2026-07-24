以AES和SM4为例，随机生成对称密钥（OH\_CryptoSymKey）。

对称密钥对象可用于后续加解密操作，二进制数据可用于存储或传输。

## 在CMake脚本中链接相关动态库

收起

自动换行

深色代码主题

复制

```
1. target_link_libraries(entry PUBLIC libohcrypto.so)
```

## 随机生成AES密钥

对应的算法规格请查看[对称密钥生成和转换规格：AES](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sym-key-generation-conversion-spec#aes)。

1. 调用[OH\_CryptoSymKeyGenerator\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-key-h#oh_cryptosymkeygenerator_create)，指定字符串参数'AES256'，创建密钥算法为AES、密钥长度为256位的对称密钥生成器（OH\_CryptoSymKeyGenerator）。
2. 调用[OH\_CryptoSymKeyGenerator\_Generate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-key-h#oh_cryptosymkeygenerator_generate)，随机生成对称密钥对象（OH\_CryptoSymKey）。
3. 调用[OH\_CryptoSymKey\_GetKeyData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-key-h#oh_cryptosymkey_getkeydata)，获取密钥对象的二进制数据。

收起

自动换行

深色代码主题

复制

```
1. #include "CryptoArchitectureKit/crypto_common.h"
2. #include "CryptoArchitectureKit/crypto_sym_key.h"

4. static OH_Crypto_ErrCode testGenerateSymKey()
5. {
6. OH_CryptoSymKeyGenerator *ctx = nullptr;
7. OH_CryptoSymKey *keyCtx = nullptr;
8. Crypto_DataBlob out = {.data = nullptr, .len = 0};
9. OH_Crypto_ErrCode ret = OH_CryptoSymKeyGenerator_Create("AES256", &ctx);
10. if (ret != CRYPTO_SUCCESS) {
11. return ret;
12. }
13. ret = OH_CryptoSymKeyGenerator_Generate(ctx, &keyCtx);
14. if (ret != CRYPTO_SUCCESS) {
15. OH_CryptoSymKeyGenerator_Destroy(ctx);
16. return ret;
17. }
18. ret = OH_CryptoSymKey_GetKeyData(keyCtx, &out);
19. OH_CryptoSymKeyGenerator_Destroy(ctx);
20. OH_CryptoSymKey_Destroy(keyCtx);
21. if (ret != CRYPTO_SUCCESS) {
22. return ret;
23. }
24. OH_Crypto_FreeDataBlob(&out);
25. return ret;
26. }
```

## 随机生成SM4密钥

对应的算法规格请查看[对称密钥生成和转换规格：SM4](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sym-key-generation-conversion-spec#sm4)。

1. 调用[OH\_CryptoSymKeyGenerator\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-key-h#oh_cryptosymkeygenerator_create)，指定字符串参数'SM4\_128'，创建密钥算法为SM4、密钥长度为128位的对称密钥生成器（OH\_CryptoSymKeyGenerator）。
2. 调用[OH\_CryptoSymKeyGenerator\_Generate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-key-h#oh_cryptosymkeygenerator_generate)，随机生成对称密钥对象（OH\_CryptoSymKey）。
3. 调用[OH\_CryptoSymKey\_GetKeyData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-key-h#oh_cryptosymkey_getkeydata)，获取密钥对象的二进制数据。

收起

自动换行

深色代码主题

复制

```
1. #include "CryptoArchitectureKit/crypto_common.h"
2. #include "CryptoArchitectureKit/crypto_sym_key.h"

4. static OH_Crypto_ErrCode testGenerateSM4Key()
5. {
6. OH_CryptoSymKeyGenerator *ctx = nullptr;
7. OH_CryptoSymKey *keyCtx = nullptr;
8. Crypto_DataBlob out = {.data = nullptr, .len = 0}; // 对称密钥二进制数据。
9. OH_Crypto_ErrCode ret = OH_CryptoSymKeyGenerator_Create("SM4_128", &ctx); // 创建对称密钥生成器。
10. if (ret != CRYPTO_SUCCESS) {
11. return ret;
12. }
13. ret = OH_CryptoSymKeyGenerator_Generate(ctx, &keyCtx); // 随机生成对称密钥对象。
14. if (ret != CRYPTO_SUCCESS) {
15. OH_CryptoSymKeyGenerator_Destroy(ctx);
16. return ret;
17. }
18. ret = OH_CryptoSymKey_GetKeyData(keyCtx, &out); // 获取对称密钥对象的二进制数据。
19. OH_CryptoSymKeyGenerator_Destroy(ctx);
20. OH_CryptoSymKey_Destroy(keyCtx);
21. if (ret != CRYPTO_SUCCESS) {
22. return ret;
23. }
24. OH_Crypto_FreeDataBlob(&out);
25. return ret;
26. }
```