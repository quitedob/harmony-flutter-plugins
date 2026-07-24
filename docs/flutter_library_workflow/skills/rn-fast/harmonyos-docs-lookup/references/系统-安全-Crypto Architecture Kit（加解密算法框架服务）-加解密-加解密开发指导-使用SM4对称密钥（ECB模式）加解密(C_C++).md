对应的算法规格请查看[对称密钥加解密算法规格：SM4](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sym-encrypt-decrypt-spec#sm4)。

## 在CMake脚本中链接相关动态库

收起

自动换行

深色代码主题

复制

```
1. target_link_libraries(entry PUBLIC libohcrypto.so)
```

**加密**

1. 调用[OH\_CryptoSymKeyGenerator\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-key-h#oh_cryptosymkeygenerator_create)、[OH\_CryptoSymKeyGenerator\_Generate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-key-h#oh_cryptosymkeygenerator_generate)，生成密钥算法为SM4、密钥长度为128位的对称密钥（OH\_CryptoSymKey）。

   如何生成SM4对称密钥，开发者可参考下文示例，并结合[对称密钥生成和转换规格：SM4](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sym-key-generation-conversion-spec#sm4)和[随机生成对称密钥](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-generate-sym-key-randomly-ndk)理解，参考文档与当前示例可能存在入参差异，请在阅读时注意区分。
2. 调用[OH\_CryptoSymCipher\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_create)，指定字符串参数'SM4\_128|ECB|PKCS7'，创建对称密钥类型为SM4\_128、分组模式为ECB、填充模式为PKCS7的Cipher实例，用于完成加密操作。
3. 调用[OH\_CryptoSymCipher\_Init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_init)，设置模式为加密（CRYPTO\_ENCRYPT\_MODE），指定加密密钥（OH\_CryptoSymKey），初始化加密Cipher实例。

   ECB模式无加密参数，直接传入null。
4. 调用[OH\_CryptoSymCipher\_Update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_update)，更新数据（明文）。

   * 当数据量较小时，可以在init完成后直接调用final。
   * 当数据量较大时，可以多次调用update，即分段加解密。
5. 调用[OH\_CryptoSymCipher\_Final](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_final)，获取加密后的数据。

   * 由于已使用update传入数据，此处data传入null。
   * final输出结果可能为null，在访问具体数据前，需要先判断结果是否为null，避免产生异常。
6. 调用[OH\_CryptoSymKeyGenerator\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-key-h#oh_cryptosymkeygenerator_destroy)、[OH\_CryptoSymCipher\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_destroy)、[OH\_CryptoSymCipherParams\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipherparams_destroy)销毁各对象。

**解密**

1. 调用[OH\_CryptoSymCipher\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_create)，指定字符串参数'SM4\_128|ECB|PKCS7'，创建对称密钥类型为SM4\_128、分组模式为ECB、填充模式为PKCS7的Cipher实例，用于完成解密操作。
2. 调用[OH\_CryptoSymCipher\_Init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_init)，设置模式为解密（CRYPTO\_DECRYPT\_MODE），指定解密密钥（OH\_CryptoSymKey）初始化解密Cipher实例。ECB模式无加密参数，直接传入null。
3. 调用[OH\_CryptoSymCipher\_Update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_update)，更新数据（密文）。
4. 调用[OH\_CryptoSymCipher\_Final](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_final)，获取解密后的数据。

收起

自动换行

深色代码主题

复制

```
1. #include "CryptoArchitectureKit/crypto_common.h"
2. #include "CryptoArchitectureKit/crypto_sym_cipher.h"
3. #include <string.h>

5. static OH_Crypto_ErrCode doTestSm4Ecb() {
6. OH_CryptoSymKeyGenerator *genCtx = nullptr;
7. OH_CryptoSymCipher *encCtx = nullptr;
8. OH_CryptoSymCipher *decCtx = nullptr;
9. OH_CryptoSymKey *keyCtx = nullptr;
10. OH_CryptoSymCipherParams *params = nullptr;
11. char *plainText = const_cast<char *>("this is test!");
12. Crypto_DataBlob input = {.data = (uint8_t *)(plainText), .len = strlen(plainText)};
13. Crypto_DataBlob outUpdate = {.data = nullptr, .len = 0};
14. Crypto_DataBlob decUpdate = {.data = nullptr, .len = 0};

16. // 随机生成对称密钥。
17. OH_Crypto_ErrCode ret;
18. ret = OH_CryptoSymKeyGenerator_Create("SM4_128", &genCtx);
19. if (ret != CRYPTO_SUCCESS) {
20. goto end;
21. }
22. ret = OH_CryptoSymKeyGenerator_Generate(genCtx, &keyCtx);
23. if (ret != CRYPTO_SUCCESS) {
24. goto end;
25. }
26. // 创建参数。
27. ret = OH_CryptoSymCipherParams_Create(&params);
28. if (ret != CRYPTO_SUCCESS) {
29. goto end;
30. }

32. // 加密操作。
33. ret = OH_CryptoSymCipher_Create("SM4_128|ECB|PKCS7", &encCtx);
34. if (ret != CRYPTO_SUCCESS) {
35. goto end;
36. }
37. ret = OH_CryptoSymCipher_Init(encCtx, CRYPTO_ENCRYPT_MODE, keyCtx, params);
38. if (ret != CRYPTO_SUCCESS) {
39. goto end;
40. }
41. ret = OH_CryptoSymCipher_Final(encCtx, &input, &outUpdate);
42. if (ret != CRYPTO_SUCCESS) {
43. goto end;
44. }

46. // 解密操作。
47. ret = OH_CryptoSymCipher_Create("SM4_128|ECB|PKCS7", &decCtx);
48. if (ret != CRYPTO_SUCCESS) {
49. goto end;
50. }
51. ret = OH_CryptoSymCipher_Init(decCtx, CRYPTO_DECRYPT_MODE, keyCtx, params);
52. if (ret != CRYPTO_SUCCESS) {
53. goto end;
54. }
55. ret = OH_CryptoSymCipher_Final(decCtx, &outUpdate, &decUpdate);
56. if (ret != CRYPTO_SUCCESS) {
57. goto end;
58. }
59. // 释放资源。
60. end:
61. OH_CryptoSymCipherParams_Destroy(params);
62. OH_CryptoSymCipher_Destroy(encCtx);
63. OH_CryptoSymCipher_Destroy(decCtx);
64. OH_CryptoSymKeyGenerator_Destroy(genCtx);
65. OH_CryptoSymKey_Destroy(keyCtx);
66. OH_Crypto_FreeDataBlob(&outUpdate);
67. OH_Crypto_FreeDataBlob(&decUpdate);
68. return ret;
69. }
```