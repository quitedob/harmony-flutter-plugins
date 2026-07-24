对应的算法规格请查看[密钥协商算法规格：X25519](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-key-agreement-overview#x25519)。

## 开发步骤

1. 调用[OH\_CryptoAsymKeyGenerator\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeygenerator_create)、[OH\_CryptoAsymKeyGenerator\_Generate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeygenerator_generate)、[OH\_CryptoAsymKeyGenerator\_Convert](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeygenerator_convert)生成密钥算法为X25519的非对称密钥（keyPair）。

   如何生成X25519非对称密钥，开发者可参考下文示例，并结合[非对称密钥生成和转换规格：X25519](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-asym-key-generation-conversion-spec#x25519)和[随机生成非对称密钥对](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-generate-asym-key-pair-randomly-ndk)理解。参考文档与当前示例可能存在入参差异，请在阅读时注意区分。
2. 调用[OH\_CryptoKeyAgreement\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-key-agreement-h#oh_cryptokeyagreement_create)，指定字符串参数'X25519'，创建密钥算法为X25519的密钥协议生成器。
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

6. static OH_Crypto_ErrCode doTestX25519KeyAgreement()
7. {
8. uint8_t pubKeyArray[] = {48, 42, 48, 5, 6, 3, 43, 101, 110, 3, 33, 0, 36, 98, 216, 106, 74, 99, 179, 203, 81, 145,
9. 147, 101, 139, 57, 74, 225, 119, 196, 207, 0, 50, 232, 93, 147, 188, 21, 225, 228, 54, 251,
10. 230, 52};
11. uint8_t priKeyArray[] = {48, 46, 2, 1, 0, 48, 5, 6, 3, 43, 101, 110, 4, 34, 4, 32, 112, 65, 156, 73, 65, 89, 183,
12. 39, 119, 229, 110, 12, 192, 237, 186, 153, 21, 122, 28, 176, 248, 108, 22, 242, 239, 179,
13. 106, 175, 85, 65, 214, 90};
14. // 创建X25519密钥生成器。
15. OH_CryptoAsymKeyGenerator *x25519Gen = nullptr;
16. OH_Crypto_ErrCode ret = OH_CryptoAsymKeyGenerator_Create("X25519", &x25519Gen);
17. if (ret != CRYPTO_SUCCESS) {
18. return ret;
19. }

21. // 外部传入的公私钥对A。
22. Crypto_DataBlob pubKeyBlob = {pubKeyArray, sizeof(pubKeyArray)};
23. Crypto_DataBlob priKeyBlob = {priKeyArray, sizeof(priKeyArray)};
24. OH_CryptoKeyPair *keyPairA = nullptr;
25. ret = OH_CryptoAsymKeyGenerator_Convert(x25519Gen, CRYPTO_DER, &pubKeyBlob, &priKeyBlob, &keyPairA);
26. if (ret != CRYPTO_SUCCESS) {
27. OH_CryptoAsymKeyGenerator_Destroy(x25519Gen);
28. return ret;
29. }

31. // 内部生成的公私钥对B。
32. OH_CryptoKeyPair *keyPairB = nullptr;
33. ret = OH_CryptoAsymKeyGenerator_Generate(x25519Gen, &keyPairB);
34. if (ret != CRYPTO_SUCCESS) {
35. OH_CryptoKeyPair_Destroy(keyPairA);
36. OH_CryptoAsymKeyGenerator_Destroy(x25519Gen);
37. return ret;
38. }

40. // 创建密钥协议生成器。
41. OH_CryptoKeyAgreement *x25519KeyAgreement = nullptr;
42. ret = OH_CryptoKeyAgreement_Create("X25519", &x25519KeyAgreement);
43. if (ret != CRYPTO_SUCCESS) {
44. OH_CryptoKeyPair_Destroy(keyPairA);
45. OH_CryptoKeyPair_Destroy(keyPairB);
46. OH_CryptoAsymKeyGenerator_Destroy(x25519Gen);
47. return ret;
48. }

50. // 使用A的公钥和B的私钥进行密钥协商。
51. OH_CryptoPrivKey *privKeyB = OH_CryptoKeyPair_GetPrivKey(keyPairB);
52. OH_CryptoPubKey *pubKeyA = OH_CryptoKeyPair_GetPubKey(keyPairA);
53. Crypto_DataBlob secret1 = {0};
54. ret = OH_CryptoKeyAgreement_GenerateSecret(x25519KeyAgreement, privKeyB, pubKeyA, &secret1);
55. if (ret != CRYPTO_SUCCESS) {
56. OH_CryptoKeyAgreement_Destroy(x25519KeyAgreement);
57. OH_CryptoKeyPair_Destroy(keyPairA);
58. OH_CryptoKeyPair_Destroy(keyPairB);
59. OH_CryptoAsymKeyGenerator_Destroy(x25519Gen);
60. return ret;
61. }

63. // 使用A的私钥和B的公钥进行密钥协商。
64. OH_CryptoPrivKey *privKeyA = OH_CryptoKeyPair_GetPrivKey(keyPairA);
65. OH_CryptoPubKey *pubKeyB = OH_CryptoKeyPair_GetPubKey(keyPairB);
66. Crypto_DataBlob secret2 = {0};
67. ret = OH_CryptoKeyAgreement_GenerateSecret(x25519KeyAgreement, privKeyA, pubKeyB, &secret2);
68. if (ret != CRYPTO_SUCCESS) {
69. OH_Crypto_FreeDataBlob(&secret1);
70. OH_CryptoKeyAgreement_Destroy(x25519KeyAgreement);
71. OH_CryptoKeyPair_Destroy(keyPairA);
72. OH_CryptoKeyPair_Destroy(keyPairB);
73. OH_CryptoAsymKeyGenerator_Destroy(x25519Gen);
74. return ret;
75. }

77. // 比较两次协商的结果。
78. if ((secret1.len == secret2.len) && (memcmp(secret1.data, secret2.data, secret1.len) == 0)) {
79. printf("x25519 success\n");
80. } else {
81. printf("x25519 result is not equal\n");
82. ret = CRYPTO_OPERTION_ERROR;
83. }

85. // 清理资源。
86. OH_Crypto_FreeDataBlob(&secret1);
87. OH_Crypto_FreeDataBlob(&secret2);
88. OH_CryptoKeyAgreement_Destroy(x25519KeyAgreement);
89. OH_CryptoKeyPair_Destroy(keyPairA);
90. OH_CryptoKeyPair_Destroy(keyPairB);
91. OH_CryptoAsymKeyGenerator_Destroy(x25519Gen);
92. return ret;
93. }
```