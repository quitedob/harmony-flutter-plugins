对应的算法规格请查看[非对称密钥加解密算法规格：RSA](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-asym-encrypt-decrypt-spec#rsa)。

**加密**

1. 调用[OH\_CryptoAsymKeyGenerator\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeygenerator_create)、[OH\_CryptoAsymKeyGenerator\_Generate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeygenerator_generate)，生成RSA密钥类型为RSA1024、素数个数为2的非对称密钥对（keyPair）。keyPair对象中包括公钥PubKey、私钥PriKey。

   如何生成RSA非对称密钥对，开发者可参考下文示例，并结合[非对称密钥生成和转换规格：RSA](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-asym-key-generation-conversion-spec#rsa)和[随机生成非对称密钥对](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-generate-asym-key-pair-randomly)理解。参考文档与当前示例可能存在入参差异，请在阅读时注意区分。
2. 调用[OH\_CryptoAsymCipher\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-cipher-h#oh_cryptoasymcipher_create)，指定字符串参数'RSA1024|PKCS1'，创建非对称密钥类型为RSA1024、填充模式为PKCS1的Cipher实例，用于完成加解密操作。
3. 调用[OH\_CryptoAsymCipher\_Init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-cipher-h#oh_cryptoasymcipher_init)，设置模式为加密（CRYPTO\_ENCRYPT\_MODE），指定加密密钥（keyPair），初始化加密Cipher实例。
4. 调用[OH\_CryptoAsymCipher\_Final](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-cipher-h#oh_cryptoasymcipher_final)，传入明文，获取加密后的数据。

   * OH\_CryptoAsymCipher\_Final输出结果可能为NULL，在访问具体数据前，需要先判断结果是否为NULL，避免产生异常。
   * 当数据量较大时，可以多次调用OH\_CryptoAsymCipher\_Final，即[分段加解密](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-rsa-asym-encrypt-decrypt-by-segment-ndk)。

**解密**

1. 由于RSA算法的Cipher实例不支持重复init操作，需要调用[OH\_CryptoAsymCipher\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-cipher-h#oh_cryptoasymcipher_create)，重新生成Cipher实例。
2. 调用[OH\_CryptoAsymCipher\_Init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-cipher-h#oh_cryptoasymcipher_init)，设置模式为解密（CRYPTO\_DECRYPT\_MODE），指定解密密钥（keyPair）初始化解密Cipher实例。
3. 调用[OH\_CryptoAsymCipher\_Final](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-cipher-h#oh_cryptoasymcipher_final)，传入密文，获取解密后的数据。

收起

自动换行

深色代码主题

复制

```
1. #include "CryptoArchitectureKit/crypto_architecture_kit.h"
2. #include <string.h>

4. static OH_Crypto_ErrCode doTestRsaEncDec()
5. {
6. OH_CryptoAsymKeyGenerator *keyGen = nullptr;
7. OH_Crypto_ErrCode ret = OH_CryptoAsymKeyGenerator_Create("RSA1024", &keyGen);
8. if (ret != CRYPTO_SUCCESS) {
9. return ret;
10. }

12. OH_CryptoKeyPair *keyPair = nullptr;
13. ret = OH_CryptoAsymKeyGenerator_Generate(keyGen, &keyPair);
14. if (ret != CRYPTO_SUCCESS) {
15. OH_CryptoAsymKeyGenerator_Destroy(keyGen);
16. return ret;
17. }

19. OH_CryptoAsymCipher *cipher = nullptr;
20. ret = OH_CryptoAsymCipher_Create("RSA1024|PKCS1", &cipher);
21. if (ret != CRYPTO_SUCCESS) {
22. OH_CryptoKeyPair_Destroy(keyPair);
23. OH_CryptoAsymKeyGenerator_Destroy(keyGen);
24. return ret;
25. }

27. ret = OH_CryptoAsymCipher_Init(cipher, CRYPTO_ENCRYPT_MODE, keyPair);
28. if (ret != CRYPTO_SUCCESS) {
29. OH_CryptoAsymCipher_Destroy(cipher);
30. OH_CryptoKeyPair_Destroy(keyPair);
31. OH_CryptoAsymKeyGenerator_Destroy(keyGen);
32. return ret;
33. }

35. const char *testData = "Hello, RSA!";
36. Crypto_DataBlob in = {
37. .data = (uint8_t *)testData,
38. .len = strlen(testData)
39. };

41. Crypto_DataBlob out = { 0 };
42. ret = OH_CryptoAsymCipher_Final(cipher, &in, &out);
43. if (ret != CRYPTO_SUCCESS) {
44. OH_CryptoAsymCipher_Destroy(cipher);
45. OH_CryptoKeyPair_Destroy(keyPair);
46. OH_CryptoAsymKeyGenerator_Destroy(keyGen);
47. return ret;
48. }

50. OH_CryptoAsymCipher_Destroy(cipher);
51. cipher = nullptr;
52. ret = OH_CryptoAsymCipher_Create("RSA1024|PKCS1", &cipher);
53. if (ret != CRYPTO_SUCCESS) {
54. OH_Crypto_FreeDataBlob(&out);
55. OH_CryptoKeyPair_Destroy(keyPair);
56. OH_CryptoAsymKeyGenerator_Destroy(keyGen);
57. return ret;
58. }

60. ret = OH_CryptoAsymCipher_Init(cipher, CRYPTO_DECRYPT_MODE, keyPair);
61. if (ret != CRYPTO_SUCCESS) {
62. OH_CryptoAsymCipher_Destroy(cipher);
63. OH_Crypto_FreeDataBlob(&out);
64. OH_CryptoKeyPair_Destroy(keyPair);
65. OH_CryptoAsymKeyGenerator_Destroy(keyGen);
66. return ret;
67. }
68. Crypto_DataBlob decrypted = { 0 };
69. ret = OH_CryptoAsymCipher_Final(cipher, &out, &decrypted);
70. if (ret != CRYPTO_SUCCESS) {
71. OH_CryptoAsymCipher_Destroy(cipher);
72. OH_Crypto_FreeDataBlob(&out);
73. OH_CryptoKeyPair_Destroy(keyPair);
74. OH_CryptoAsymKeyGenerator_Destroy(keyGen);
75. return ret;
76. }
77. if ((decrypted.len != strlen(testData)) || (memcmp(decrypted.data, testData, decrypted.len) != 0)) {
78. OH_Crypto_FreeDataBlob(&decrypted);
79. OH_CryptoAsymCipher_Destroy(cipher);
80. OH_Crypto_FreeDataBlob(&out);
81. OH_CryptoKeyPair_Destroy(keyPair);
82. OH_CryptoAsymKeyGenerator_Destroy(keyGen);
83. return CRYPTO_OPERTION_ERROR;
84. }

86. OH_Crypto_FreeDataBlob(&decrypted);
87. OH_CryptoAsymCipher_Destroy(cipher);
88. OH_Crypto_FreeDataBlob(&out);
89. OH_CryptoKeyPair_Destroy(keyPair);
90. OH_CryptoAsymKeyGenerator_Destroy(keyGen);
91. return ret;
92. }
```