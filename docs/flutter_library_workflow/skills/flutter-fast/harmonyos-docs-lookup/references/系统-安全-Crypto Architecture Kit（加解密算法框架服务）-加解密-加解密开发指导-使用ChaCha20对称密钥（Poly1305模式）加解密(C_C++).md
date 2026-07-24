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

1. 调用[OH\_CryptoSymCipher\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_create)，指定字符串参数'ChaCha20|Poly1305'，创建对称密钥类型为ChaCha20、模式为Poly1305的Cipher实例，用于完成加密操作。
2. 调用[OH\_CryptoSymCipherParams\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipherparams_create)创建参数对象，调用[OH\_CryptoSymCipherParams\_SetParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipherparams_setparam)设置对应的加密参数。
3. 调用[OH\_CryptoSymCipher\_Init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_init)，设置模式为加密（CRYPTO\_ENCRYPT\_MODE），指定加密密钥（OH\_CryptoSymKey）和Poly1305模式对应的加密参数（OH\_CryptoSymCipherParams），初始化加密Cipher实例。
4. 调用[OH\_CryptoSymCipher\_Update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_update)，更新数据（明文）。
5. 调用[OH\_CryptoSymCipher\_Final](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_final)，获取加密后的数据。

   说明

   由于已使用update传入数据，此处data传入null。

   doFinal输出结果可能为null，在访问具体数据前，需要先判断结果是否为null，避免产生异常。
6. 使用[OH\_CryptoSymCipherParams\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipherparams_create)创建Params，使用[OH\_CryptoSymCipherParams\_SetParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipherparams_setparam)设置authTag，作为解密的认证信息。在Poly1305模式下，需要从加密后的数据中取出末尾16字节，作为解密时初始化的认证信息。
7. 调用[OH\_CryptoSymKeyGenerator\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-key-h#oh_cryptosymkeygenerator_destroy)、[OH\_CryptoSymCipher\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_destroy)、[OH\_CryptoSymCipherParams\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipherparams_destroy)销毁各对象。

**解密**

1. 调用[OH\_CryptoSymCipher\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_create)，指定字符串参数'ChaCha20|Poly1305'，创建对称密钥类型为ChaCha20、模式为Poly1305的Cipher实例，用于完成解密操作。
2. 调用[OH\_CryptoSymCipher\_Init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_init)，设置模式为解密（CRYPTO\_DECRYPT\_MODE），指定解密密钥（OH\_CryptoSymKey）和Poly1305模式对应的解密参数（OH\_CryptoSymCipherParams），初始化解密Cipher实例。
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

5. static OH_Crypto_ErrCode doTestChaCha20Poly1305()
6. {
7. OH_CryptoSymKeyGenerator *genCtx = nullptr;
8. OH_CryptoSymCipher *encCtx = nullptr;
9. OH_CryptoSymCipher *decCtx = nullptr;
10. OH_CryptoSymKey *keyCtx = nullptr;
11. OH_CryptoSymCipherParams *params = nullptr;

13. Crypto_DataBlob outUpdate = {.data = nullptr, .len = 0};
14. Crypto_DataBlob decUpdate = {.data = nullptr, .len = 0};

16. uint8_t aad[8] = {1, 2, 3, 4, 5, 6, 7, 8};
17. uint8_t tag[16] = {0};
18. uint8_t iv[16] = {1, 2, 4, 12, 3, 4, 2, 3, 3, 2, 0, 4, 2, 4, 12, 3}; // iv使用安全随机数生成。
19. Crypto_DataBlob ivData = {.data = iv, .len = sizeof(iv)};
20. Crypto_DataBlob aadData = {.data = aad, .len = sizeof(aad)};
21. Crypto_DataBlob tagData = {.data = tag, .len = sizeof(tag)};
22. Crypto_DataBlob tagOutPut = {.data = nullptr, .len = 0};
23. char *plainText = const_cast<char *>("this is test!");
24. Crypto_DataBlob msgBlob = {.data = (uint8_t *)(plainText), .len = strlen(plainText)};
25. // 生成对称密钥。
26. OH_Crypto_ErrCode ret;
27. ret = OH_CryptoSymKeyGenerator_Create("ChaCha20", &genCtx);
28. if (ret != CRYPTO_SUCCESS) {
29. goto end;
30. }
31. ret = OH_CryptoSymKeyGenerator_Generate(genCtx, &keyCtx);
32. if (ret != CRYPTO_SUCCESS) {
33. goto end;
34. }

36. // 设置参数。
37. ret = OH_CryptoSymCipherParams_Create(&params);
38. if (ret != CRYPTO_SUCCESS) {
39. goto end;
40. }
41. ret = OH_CryptoSymCipherParams_SetParam(params, CRYPTO_IV_DATABLOB, &ivData);
42. if (ret != CRYPTO_SUCCESS) {
43. goto end;
44. }
45. ret = OH_CryptoSymCipherParams_SetParam(params, CRYPTO_AAD_DATABLOB, &aadData);
46. if (ret != CRYPTO_SUCCESS) {
47. goto end;
48. }
49. ret = OH_CryptoSymCipherParams_SetParam(params, CRYPTO_TAG_DATABLOB, &tagData);
50. if (ret != CRYPTO_SUCCESS) {
51. goto end;
52. }

54. // 加密。
55. ret = OH_CryptoSymCipher_Create("ChaCha20|Poly1305", &encCtx);
56. if (ret != CRYPTO_SUCCESS) {
57. goto end;
58. }
59. ret = OH_CryptoSymCipher_Init(encCtx, CRYPTO_ENCRYPT_MODE, keyCtx, params);
60. if (ret != CRYPTO_SUCCESS) {
61. goto end;
62. }
63. ret = OH_CryptoSymCipher_Update(encCtx, &msgBlob, &outUpdate);
64. if (ret != CRYPTO_SUCCESS) {
65. goto end;
66. }
67. ret = OH_CryptoSymCipher_Final(encCtx, nullptr, &tagOutPut);
68. if (ret != CRYPTO_SUCCESS) {
69. goto end;
70. }

72. // 解密。
73. ret = OH_CryptoSymCipher_Create("ChaCha20|Poly1305", &decCtx);
74. if (ret != CRYPTO_SUCCESS) {
75. goto end;
76. }
77. ret = OH_CryptoSymCipherParams_SetParam(params, CRYPTO_TAG_DATABLOB, &tagOutPut);
78. if (ret != CRYPTO_SUCCESS) {
79. goto end;
80. }
81. ret = OH_CryptoSymCipher_Init(decCtx, CRYPTO_DECRYPT_MODE, keyCtx, params);
82. if (ret != CRYPTO_SUCCESS) {
83. goto end;
84. }
85. ret = OH_CryptoSymCipher_Final(decCtx, &outUpdate, &decUpdate);
86. if (ret != CRYPTO_SUCCESS) {
87. goto end;
88. }

90. // 释放资源。
91. end:
92. OH_CryptoSymCipherParams_Destroy(params);
93. OH_CryptoSymCipher_Destroy(encCtx);
94. OH_CryptoSymCipher_Destroy(decCtx);
95. OH_CryptoSymKeyGenerator_Destroy(genCtx);
96. OH_CryptoSymKey_Destroy(keyCtx);
97. OH_Crypto_FreeDataBlob(&outUpdate);
98. OH_Crypto_FreeDataBlob(&decUpdate);
99. OH_Crypto_FreeDataBlob(&tagOutPut);
100. return ret;
101. }
```