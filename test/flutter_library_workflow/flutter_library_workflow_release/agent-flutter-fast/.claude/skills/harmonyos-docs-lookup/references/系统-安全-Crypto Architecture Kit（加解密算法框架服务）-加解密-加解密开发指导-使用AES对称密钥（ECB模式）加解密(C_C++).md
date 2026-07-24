对应的算法规格请查看[对称密钥加解密算法规格：AES](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sym-encrypt-decrypt-spec#aes)。

## 在CMake脚本中链接相关动态库

收起

自动换行

深色代码主题

复制

```
1. target_link_libraries(entry PUBLIC libohcrypto.so)
```

## 开发步骤

**创建对象**

调用[OH\_CryptoSymKeyGenerator\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-key-h#oh_cryptosymkeygenerator_create)和[OH\_CryptoSymKeyGenerator\_Generate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-key-h#oh_cryptosymkeygenerator_generate)，生成AES算法、128位的对称密钥（OH\_CryptoSymKey）。

如何生成AES对称密钥，开发者可参考下文示例，并结合[对称密钥生成和转换规格：AES](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sym-key-generation-conversion-spec#aes)和[随机生成对称密钥](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-generate-sym-key-randomly-ndk)理解，参考文档与当前示例可能存在入参差异，请在阅读时注意区分。

**加密**

1. 调用[OH\_CryptoSymCipher\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_create)，指定字符串参数'AES128|ECB|PKCS7'，创建对称密钥类型为AES128、分组模式为ECB、填充模式为PKCS7的Cipher实例，用于完成加密操作。
2. 调用[OH\_CryptoSymCipher\_Init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_init)，设置模式为加密（CRYPTO\_ENCRYPT\_MODE），指定加密密钥（OH\_CryptoSymKey），初始化加密Cipher实例。
3. 加密内容较短时，可以直接调用[OH\_CryptoSymCipher\_Final](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_final)获取加密后的数据，无需调用[OH\_CryptoSymCipher\_Update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_update)。

**解密**

1. 调用[OH\_CryptoSymCipher\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_create)，指定字符串参数'AES128|ECB|PKCS7'，创建对称密钥类型为AES128、分组模式为ECB、填充模式为PKCS7的Cipher实例，用于解密操作。
2. 调用[OH\_CryptoSymCipher\_Init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_init)，设置模式为解密（CRYPTO\_DECRYPT\_MODE），指定解密密钥（OH\_CryptoSymKey），初始化解密Cipher实例。
3. 当解密内容较短时，可以直接调用[OH\_CryptoSymCipher\_Final](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_final)获取解密后的数据，无需调用[OH\_CryptoSymCipher\_Update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_update)。

**销毁对象**

调用[OH\_CryptoSymKeyGenerator\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-key-h#oh_cryptosymkeygenerator_destroy)销毁密钥生成器。调用[OH\_CryptoSymCipher\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_destroy)销毁密码对象。

收起

自动换行

深色代码主题

复制

```
1. #include "CryptoArchitectureKit/crypto_common.h"
2. #include "CryptoArchitectureKit/crypto_sym_cipher.h"
3. #include <string.h>

5. static OH_Crypto_ErrCode doTestAesEcb()
6. {
7. OH_CryptoSymKeyGenerator *genCtx = nullptr;
8. OH_CryptoSymCipher *encCtx = nullptr;
9. OH_CryptoSymCipher *decCtx = nullptr;
10. OH_CryptoSymKey *keyCtx = nullptr;
11. char *plainText = const_cast<char *>("this is test");
12. Crypto_DataBlob input = {.data = (uint8_t *)(plainText), .len = strlen(plainText)};
13. Crypto_DataBlob encData = {.data = nullptr, .len = 0};
14. Crypto_DataBlob decData = {.data = nullptr, .len = 0};

16. // 随机生成对称密钥。
17. OH_Crypto_ErrCode ret;
18. ret = OH_CryptoSymKeyGenerator_Create("AES128", &genCtx);
19. if (ret != CRYPTO_SUCCESS) {
20. goto end;
21. }
22. ret = OH_CryptoSymKeyGenerator_Generate(genCtx, &keyCtx);
23. if (ret != CRYPTO_SUCCESS) {
24. goto end;
25. }

27. // 加密操作。
28. ret = OH_CryptoSymCipher_Create("AES128|ECB|PKCS7", &encCtx);
29. if (ret != CRYPTO_SUCCESS) {
30. goto end;
31. }
32. ret = OH_CryptoSymCipher_Init(encCtx, CRYPTO_ENCRYPT_MODE, keyCtx, nullptr); // ECB模式params为null。
33. if (ret != CRYPTO_SUCCESS) {
34. goto end;
35. }
36. ret = OH_CryptoSymCipher_Final(encCtx, &input, &encData);
37. if (ret != CRYPTO_SUCCESS) {
38. goto end;
39. }

41. // 解密操作。
42. ret = OH_CryptoSymCipher_Create("AES128|ECB|PKCS7", &decCtx);
43. if (ret != CRYPTO_SUCCESS) {
44. goto end;
45. }
46. ret = OH_CryptoSymCipher_Init(decCtx, CRYPTO_DECRYPT_MODE, keyCtx, nullptr); // ECB模式params为null。
47. if (ret != CRYPTO_SUCCESS) {
48. goto end;
49. }
50. ret = OH_CryptoSymCipher_Final(decCtx, &encData, &decData);
51. if (ret != CRYPTO_SUCCESS) {
52. goto end;
53. }

55. end:
56. OH_CryptoSymCipher_Destroy(encCtx);
57. OH_CryptoSymCipher_Destroy(decCtx);
58. OH_CryptoSymKeyGenerator_Destroy(genCtx);
59. OH_CryptoSymKey_Destroy(keyCtx);
60. OH_Crypto_FreeDataBlob(&encData);
61. OH_Crypto_FreeDataBlob(&decData);
62. return ret;
63. }
```