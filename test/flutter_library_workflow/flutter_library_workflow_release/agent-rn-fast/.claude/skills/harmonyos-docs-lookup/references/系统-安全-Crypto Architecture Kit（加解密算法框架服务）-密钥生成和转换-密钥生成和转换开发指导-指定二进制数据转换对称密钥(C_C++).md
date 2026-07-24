以3DES和HMAC为例，根据指定的对称密钥二进制数据生成密钥（OH\_CryptoSymKey），将外部或存储的二进制数据转换为算法库的密钥对象，该对象可用于后续的加解密操作。

## 在CMake脚本中链接相关动态库

收起

自动换行

深色代码主题

复制

```
1. target_link_libraries(entry PUBLIC libohcrypto.so)
```

## 指定二进制数据转换3DES密钥

查看[对称密钥生成和转换规格：3DES](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sym-key-generation-conversion-spec#section3des)。

1. 获取3DES二进制密钥数据，封装成[Crypto\_DataBlob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptocommonapi-crypto-datablob)。
2. 调用[OH\_CryptoSymKeyGenerator\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-key-h#oh_cryptosymkeygenerator_create)，指定字符串参数'3DES192'，创建密钥算法为3DES、密钥长度为192位的对称密钥生成器（OH\_CryptoSymKeyGenerator）。
3. 调用[OH\_CryptoSymKeyGenerator\_Convert](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-key-h#oh_cryptosymkeygenerator_convert)，根据指定的对称密钥二进制数据生成对称密钥对象（OH\_CryptoSymKey）。
4. 调用[OH\_CryptoSymKey\_GetKeyData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-key-h#oh_cryptosymkey_getkeydata)，获取密钥对象的二进制数据。

以下以生成3DES密钥为例：

收起

自动换行

深色代码主题

复制

```
1. #include "CryptoArchitectureKit/crypto_common.h"
2. #include "CryptoArchitectureKit/crypto_sym_key.h"

4. static OH_Crypto_ErrCode doTestDataCovertSymKey() {
5. const char *algName = "3DES192";
6. OH_CryptoSymKeyGenerator *ctx = nullptr;
7. OH_CryptoSymKey *convertKeyCtx = nullptr;
8. Crypto_DataBlob out = {.data = nullptr, .len = 0};
9. OH_Crypto_ErrCode ret;
10. uint8_t arr[] = {0xba, 0x3d, 0xc2, 0x71, 0x21, 0x1e, 0x30, 0x56, 0xad, 0x47, 0xfc, 0x5a,
11. 0x46, 0x39, 0xee, 0x7c, 0xba, 0x3b, 0xc2, 0x71, 0xab, 0xa0, 0x30, 0x72};
12. Crypto_DataBlob convertBlob = {.data = arr, .len = sizeof(arr)};
13. ret = OH_CryptoSymKeyGenerator_Create(algName, &ctx);
14. if (ret != CRYPTO_SUCCESS) {
15. return ret;
16. }
17. ret = OH_CryptoSymKeyGenerator_Convert(ctx, &convertBlob, &convertKeyCtx);
18. if (ret != CRYPTO_SUCCESS) {
19. OH_CryptoSymKeyGenerator_Destroy(ctx);
20. return ret;
21. }
22. ret = OH_CryptoSymKey_GetKeyData(convertKeyCtx, &out);
23. OH_CryptoSymKeyGenerator_Destroy(ctx);
24. OH_CryptoSymKey_Destroy(convertKeyCtx);
25. if (ret != CRYPTO_SUCCESS) {
26. return ret;
27. }
28. OH_Crypto_FreeDataBlob(&out);
29. return ret;
30. }
```

## 指定二进制数据转换HMAC密钥

查看[对称密钥生成和转换规格：HMAC](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sym-key-generation-conversion-spec#hmac)。

1. 获取HMAC二进制密钥，封装成[Crypto\_DataBlob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptocommonapi-crypto-datablob)。
2. 调用[OH\_CryptoSymKeyGenerator\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-key-h#oh_cryptosymkeygenerator_create)，指定字符串参数'HMAC'，创建密钥算法为HMAC、密钥长度为[1, 32768]位的对称密钥生成器（OH\_CryptoSymKeyGenerator）。
3. 调用[OH\_CryptoSymKeyGenerator\_Convert](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-key-h#oh_cryptosymkeygenerator_convert)，根据指定的对称密钥二进制数据生成对称密钥对象（OH\_CryptoSymKey）。
4. 调用[OH\_CryptoSymKey\_GetKeyData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-key-h#oh_cryptosymkey_getkeydata)，获取密钥对象的二进制数据。

以下以生成HMAC密钥为例：

收起

自动换行

深色代码主题

复制

```
1. #include "CryptoArchitectureKit/crypto_common.h"
2. #include "CryptoArchitectureKit/crypto_sym_key.h"
3. #include <string.h>

5. static OH_Crypto_ErrCode testConvertHmacKey() {
6. const char *algName = "HMAC";
7. OH_CryptoSymKeyGenerator *ctx = nullptr;
8. OH_CryptoSymKey *convertKeyCtx = nullptr;
9. Crypto_DataBlob out = {.data = nullptr, .len = 0};
10. OH_Crypto_ErrCode ret;

12. char *arr = const_cast<char *>("12345678abcdefgh12345678abcdefgh12345678abcdefgh12345678abcdefgh");
13. Crypto_DataBlob convertBlob = {.data = (uint8_t *)(arr), .len = strlen(arr)};
14. ret = OH_CryptoSymKeyGenerator_Create(algName, &ctx);
15. if (ret != CRYPTO_SUCCESS) {
16. return ret;
17. }
18. ret = OH_CryptoSymKeyGenerator_Convert(ctx, &convertBlob, &convertKeyCtx);
19. if (ret != CRYPTO_SUCCESS) {
20. OH_CryptoSymKeyGenerator_Destroy(ctx);
21. return ret;
22. }
23. ret = OH_CryptoSymKey_GetKeyData(convertKeyCtx, &out);
24. OH_CryptoSymKeyGenerator_Destroy(ctx);
25. OH_CryptoSymKey_Destroy(convertKeyCtx);
26. if (ret != CRYPTO_SUCCESS) {
27. return ret;
28. }
29. OH_Crypto_FreeDataBlob(&out);
30. return ret;
31. }
```