对应的算法规格请查看[密钥协商算法规格：ECDH](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-key-agreement-overview#ecdh)。

## 开发步骤

1. 调用[OH\_CryptoAsymKeyGenerator\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeygenerator_create)、[OH\_CryptoAsymKeyGenerator\_Generate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeygenerator_generate)、[OH\_CryptoAsymKeyGenerator\_Convert](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeygenerator_convert)生成密钥算法为ECC、密钥长度为256位的非对称密钥（keyPair）。

   如何生成ECC非对称密钥，开发者可参考下文示例，并结合[非对称密钥生成和转换规格：ECC](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-asym-key-generation-conversion-spec#ecc)和[随机生成非对称密钥对](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-generate-asym-key-pair-randomly-ndk)理解。参考文档与当前示例可能存在入参差异，请在阅读时注意区分。
2. 调用[OH\_CryptoKeyAgreement\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-key-agreement-h#oh_cryptokeyagreement_create)，指定字符串参数'ECC256'，创建密钥算法为ECC、密钥长度为256位的密钥协议生成器。
3. 调用[OH\_CryptoKeyAgreement\_GenerateSecret](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-key-agreement-h#oh_cryptokeyagreement_generatesecret)，基于传入的私钥（keyPair.priKey）与公钥（keyPair.pubKey）进行密钥协商，返回共享密钥。

收起

自动换行

深色代码主题

复制

```
1. #include "CryptoArchitectureKit/crypto_architecture_kit.h"
2. #include "CryptoArchitectureKit/crypto_key_agreement.h"
3. #include <stdio.h>
4. #include <cstring>

6. static OH_Crypto_ErrCode doTestEcdhKeyAgreement()
7. {
8. // 假设此公私钥对数据为外部传入。
9. uint8_t pubKeyArray[] = {48, 89, 48, 19, 6, 7, 42, 134, 72, 206, 61, 2, 1, 6, 8, 42, 134, 72, 206, 61, 3, 1, 7,
10. 3, 66, 0, 4, 83, 96, 142, 9, 86, 214, 126, 106, 247, 233, 92, 125, 4, 128, 138, 105, 246,
11. 162, 215, 71, 81, 58, 202, 121, 26, 105, 211, 55, 130, 45, 236, 143, 55, 16, 248, 75, 167,
12. 160, 167, 106, 2, 152, 243, 44, 68, 66, 0, 167, 99, 92, 235, 215, 159, 239, 28, 106, 124,
13. 171, 34, 145, 124, 174, 57, 92};
14. uint8_t priKeyArray[] = {48, 49, 2, 1, 1, 4, 32, 115, 56, 137, 35, 207, 0, 60, 191, 90, 61, 136, 105, 210, 16,
15. 27, 4, 171, 57, 10, 61, 123, 40, 189, 28, 34, 207, 236, 22, 45, 223, 10, 189, 160, 10, 6,
16. 8, 42, 134, 72, 206, 61, 3, 1, 7};

18. // 创建ECC密钥生成器。
19. OH_CryptoAsymKeyGenerator *eccGen = nullptr;
20. OH_Crypto_ErrCode ret = OH_CryptoAsymKeyGenerator_Create("ECC256", &eccGen);
21. if (ret != CRYPTO_SUCCESS) {
22. return ret;
23. }

25. // 外部传入的公私钥对A。
26. Crypto_DataBlob pubKeyBlob = {pubKeyArray, sizeof(pubKeyArray)};
27. Crypto_DataBlob priKeyBlob = {priKeyArray, sizeof(priKeyArray)};
28. OH_CryptoKeyPair *keyPairA = nullptr;
29. ret = OH_CryptoAsymKeyGenerator_Convert(eccGen, CRYPTO_DER, &pubKeyBlob, &priKeyBlob, &keyPairA);
30. if (ret != CRYPTO_SUCCESS) {
31. OH_CryptoAsymKeyGenerator_Destroy(eccGen);
32. return ret;
33. }

35. // 内部生成的公私钥对B。
36. OH_CryptoKeyPair *keyPairB = nullptr;
37. ret = OH_CryptoAsymKeyGenerator_Generate(eccGen, &keyPairB);
38. if (ret != CRYPTO_SUCCESS) {
39. OH_CryptoKeyPair_Destroy(keyPairA);
40. OH_CryptoAsymKeyGenerator_Destroy(eccGen);
41. return ret;
42. }

44. // 创建密钥协议生成器。
45. OH_CryptoKeyAgreement *eccKeyAgreement = nullptr;
46. ret = OH_CryptoKeyAgreement_Create("ECC256", &eccKeyAgreement);
47. if (ret != CRYPTO_SUCCESS) {
48. OH_CryptoKeyPair_Destroy(keyPairA);
49. OH_CryptoKeyPair_Destroy(keyPairB);
50. OH_CryptoAsymKeyGenerator_Destroy(eccGen);
51. return ret;
52. }

54. // 使用A的公钥和B的私钥进行密钥协商。
55. OH_CryptoPrivKey *privKeyB = OH_CryptoKeyPair_GetPrivKey(keyPairB);
56. OH_CryptoPubKey *pubKeyA = OH_CryptoKeyPair_GetPubKey(keyPairA);
57. Crypto_DataBlob secret1 = { 0 };
58. ret = OH_CryptoKeyAgreement_GenerateSecret(eccKeyAgreement, privKeyB, pubKeyA, &secret1);
59. if (ret != CRYPTO_SUCCESS) {
60. OH_CryptoKeyAgreement_Destroy(eccKeyAgreement);
61. OH_CryptoKeyPair_Destroy(keyPairA);
62. OH_CryptoKeyPair_Destroy(keyPairB);
63. OH_CryptoAsymKeyGenerator_Destroy(eccGen);
64. return ret;
65. }

67. // 使用A的私钥和B的公钥进行密钥协商。
68. OH_CryptoPrivKey *privKeyA = OH_CryptoKeyPair_GetPrivKey(keyPairA);
69. OH_CryptoPubKey *pubKeyB = OH_CryptoKeyPair_GetPubKey(keyPairB);
70. Crypto_DataBlob secret2 = { 0 };
71. ret = OH_CryptoKeyAgreement_GenerateSecret(eccKeyAgreement, privKeyA, pubKeyB, &secret2);
72. if (ret != CRYPTO_SUCCESS) {
73. OH_Crypto_FreeDataBlob(&secret1);
74. OH_CryptoKeyAgreement_Destroy(eccKeyAgreement);
75. OH_CryptoKeyPair_Destroy(keyPairA);
76. OH_CryptoKeyPair_Destroy(keyPairB);
77. OH_CryptoAsymKeyGenerator_Destroy(eccGen);
78. return ret;
79. }

81. // 比较两次协商的结果。
82. if ((secret1.len == secret2.len) &&
83. (memcmp(secret1.data, secret2.data, secret1.len) == 0)) {
84. printf("ecdh success\n");
85. } else {
86. printf("ecdh result is not equal\n");
87. ret = CRYPTO_OPERTION_ERROR;
88. }

90. // 清理资源。
91. OH_Crypto_FreeDataBlob(&secret1);
92. OH_Crypto_FreeDataBlob(&secret2);
93. OH_CryptoKeyAgreement_Destroy(eccKeyAgreement);
94. OH_CryptoKeyPair_Destroy(keyPairA);
95. OH_CryptoKeyPair_Destroy(keyPairB);
96. OH_CryptoAsymKeyGenerator_Destroy(eccGen);
97. return ret;
98. }
```