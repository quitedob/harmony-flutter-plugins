从API22开始，算法库支持该算法。

对应的算法规格请查看[对称密钥加解密算法规格：ChaCha20](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sym-encrypt-decrypt-spec#chacha20)。

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

调用[OH\_CryptoSymKeyGenerator\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-key-h#oh_cryptosymkeygenerator_create)、[OH\_CryptoSymKeyGenerator\_Generate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-key-h#oh_cryptosymkeygenerator_generate)，生成密钥算法为ChaCha20的对称密钥（OH\_CryptoSymKey）。

如何生成ChaCha20对称密钥，开发者可参考下文示例，并结合[对称密钥生成和转换规格：ChaCha20](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sym-key-generation-conversion-spec#chacha20)和[随机生成对称密钥](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-generate-sym-key-randomly-ndk)理解。参考文档与示例可能存在入参差异，请注意区分。

**加密**

1. 调用[OH\_CryptoSymCipher\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_create)，指定字符串参数'ChaCha20'，创建对称密钥类型为ChaCha20的Cipher实例，用于完成加密操作。
2. 调用[OH\_CryptoSymCipherParams\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipherparams_create)创建参数对象，调用[OH\_CryptoSymCipherParams\_SetParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipherparams_setparam)设置对应的加密参数。
3. 调用[OH\_CryptoSymCipher\_Init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_init)，设置模式为加密（CRYPTO\_ENCRYPT\_MODE），指定加密密钥（OH\_CryptoSymKey）和对应的加密参数（OH\_CryptoSymCipherParams），初始化加密Cipher实例。
4. 调用[OH\_CryptoSymCipher\_Update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_update)，更新数据（明文）。
5. 调用[OH\_CryptoSymCipher\_Final](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_final)，获取加密后的数据。

   说明

   由于已使用update传入数据，此处data传入null。

   doFinal输出结果可能为null，在访问具体数据前，需要先判断结果是否为null，避免产生异常。
6. 调用[OH\_CryptoSymKeyGenerator\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-key-h#oh_cryptosymkeygenerator_destroy)、[OH\_CryptoSymCipher\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_destroy)、[OH\_CryptoSymCipherParams\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipherparams_destroy)销毁各对象。

**解密**

1. 调用[OH\_CryptoSymCipher\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_create)，指定字符串参数'ChaCha20'，创建对称密钥类型为ChaCha20的Cipher实例，用于完成解密操作。
2. 调用[OH\_CryptoSymCipher\_Init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_init)，设置模式为解密（CRYPTO\_DECRYPT\_MODE），指定解密密钥（OH\_CryptoSymKey）和对应的解密参数（OH\_CryptoSymCipherParams），初始化解密Cipher实例。
3. 调用[OH\_CryptoSymCipher\_Update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_update)，更新数据（密文）。
4. 调用[OH\_CryptoSymCipher\_Final](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_final)，获取解密后的数据。

收起

自动换行

深色代码主题

复制

```
1. #include <string.h>
2. #include "CryptoArchitectureKit/crypto_common.h"
3. #include "CryptoArchitectureKit/crypto_sym_cipher.h"

5. static OH_Crypto_ErrCode doTestChaCha20()
6. {
7. OH_CryptoSymKeyGenerator *genCtx = nullptr;
8. OH_CryptoSymCipher *encCtx = nullptr;
9. OH_CryptoSymCipher *decCtx = nullptr;
10. OH_CryptoSymKey *keyCtx = nullptr;
11. OH_CryptoSymCipherParams *params = nullptr;
12. Crypto_DataBlob encData = {.data = nullptr, .len = 0};
13. Crypto_DataBlob decData = {.data = nullptr, .len = 0};
14. char *plainText = const_cast<char *>("this is test!");
15. Crypto_DataBlob msgBlob = {.data = (uint8_t *)(plainText), .len = strlen(plainText)};
16. uint8_t iv[16] = {1, 2, 4, 12, 3, 4, 2, 3, 3, 2, 0, 4, 3, 1, 0, 10}; // 示例代码iv值，开发者可使用安全随机数生成。
17. Crypto_DataBlob ivBlob = {.data = iv, .len = sizeof(iv)};
18. // 生成对称密钥。
19. OH_Crypto_ErrCode ret;
20. ret = OH_CryptoSymKeyGenerator_Create("ChaCha20", &genCtx);
21. if (ret != CRYPTO_SUCCESS) {
22. goto end;
23. }
24. ret = OH_CryptoSymKeyGenerator_Generate(genCtx, &keyCtx);
25. if (ret != CRYPTO_SUCCESS) {
26. goto end;
27. }

29. // 创建参数对象。
30. ret = OH_CryptoSymCipherParams_Create(&params);
31. if (ret != CRYPTO_SUCCESS) {
32. goto end;
33. }
34. // 设置参数。
35. ret = OH_CryptoSymCipherParams_SetParam(params, CRYPTO_IV_DATABLOB, &ivBlob);
36. if (ret != CRYPTO_SUCCESS) {
37. goto end;
38. }

40. // 加密。
41. ret = OH_CryptoSymCipher_Create("ChaCha20", &encCtx);
42. if (ret != CRYPTO_SUCCESS) {
43. goto end;
44. }
45. ret = OH_CryptoSymCipher_Init(encCtx, CRYPTO_ENCRYPT_MODE, keyCtx, params);
46. if (ret != CRYPTO_SUCCESS) {
47. goto end;
48. }
49. ret = OH_CryptoSymCipher_Final(encCtx, &msgBlob, &encData);
50. if (ret != CRYPTO_SUCCESS) {
51. goto end;
52. }

54. // 解密。
55. ret = OH_CryptoSymCipher_Create("ChaCha20", &decCtx);
56. if (ret != CRYPTO_SUCCESS) {
57. goto end;
58. }
59. ret = OH_CryptoSymCipher_Init(decCtx, CRYPTO_DECRYPT_MODE, keyCtx, params); // 解密使用的params与加密时相同。
60. if (ret != CRYPTO_SUCCESS) {
61. goto end;
62. }
63. ret = OH_CryptoSymCipher_Final(decCtx, &encData, &decData);
64. if (ret != CRYPTO_SUCCESS) {
65. goto end;
66. }

68. end:
69. OH_CryptoSymCipherParams_Destroy(params);
70. OH_CryptoSymCipher_Destroy(encCtx);
71. OH_CryptoSymCipher_Destroy(decCtx);
72. OH_CryptoSymKeyGenerator_Destroy(genCtx);
73. OH_CryptoSymKey_Destroy(keyCtx);
74. OH_Crypto_FreeDataBlob(&encData);
75. OH_Crypto_FreeDataBlob(&decData);
76. return ret;
77. }
```