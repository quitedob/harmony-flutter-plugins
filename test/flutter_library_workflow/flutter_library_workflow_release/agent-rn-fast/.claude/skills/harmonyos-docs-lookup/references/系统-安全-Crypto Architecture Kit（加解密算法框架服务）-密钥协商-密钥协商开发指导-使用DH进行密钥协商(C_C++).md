对应的算法规格请查看[密钥协商算法规格：DH](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-key-agreement-overview#dh)。

## 开发步骤

1. 调用[OH\_CryptoAsymKeyGenerator\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeygenerator_create)、[OH\_CryptoAsymKeyGenerator\_Generate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeygenerator_generate)生成密钥算法为DH\_modp1536的非对称密钥（keyPair）。

   如何生成DH非对称密钥，开发者可参考下文示例，并结合[非对称密钥生成和转换规格：DH](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-asym-key-generation-conversion-spec#dh)和[随机生成非对称密钥对](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-generate-asym-key-pair-randomly-ndk)理解。参考文档与当前示例可能存在入参差异，请在阅读时注意区分。
2. 调用[OH\_CryptoKeyAgreement\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-key-agreement-h#oh_cryptokeyagreement_create)，指定字符串参数'DH\_modp1536'，创建密钥算法为DH\_modp1536的密钥协议生成器。
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

6. static OH_Crypto_ErrCode doTestDHKeyAgreement()
7. {
8. // 创建DH密钥生成器。
9. OH_CryptoAsymKeyGenerator *dhGen = nullptr;
10. OH_Crypto_ErrCode ret = OH_CryptoAsymKeyGenerator_Create("DH_modp1536", &dhGen);
11. if (ret != CRYPTO_SUCCESS) {
12. return ret;
13. }

15. // 生成公私钥对A。
16. OH_CryptoKeyPair *keyPairA = nullptr;
17. ret = OH_CryptoAsymKeyGenerator_Generate(dhGen, &keyPairA);
18. if (ret != CRYPTO_SUCCESS) {
19. OH_CryptoAsymKeyGenerator_Destroy(dhGen);
20. return ret;
21. }

23. // 生成公私钥对B。
24. OH_CryptoKeyPair *keyPairB = nullptr;
25. ret = OH_CryptoAsymKeyGenerator_Generate(dhGen, &keyPairB);
26. if (ret != CRYPTO_SUCCESS) {
27. OH_CryptoKeyPair_Destroy(keyPairA);
28. OH_CryptoAsymKeyGenerator_Destroy(dhGen);
29. return ret;
30. }

32. // 创建密钥协议生成器。
33. OH_CryptoKeyAgreement *dhKeyAgreement = nullptr;
34. ret = OH_CryptoKeyAgreement_Create("DH_modp1536", &dhKeyAgreement);
35. if (ret != CRYPTO_SUCCESS) {
36. OH_CryptoKeyPair_Destroy(keyPairA);
37. OH_CryptoKeyPair_Destroy(keyPairB);
38. OH_CryptoAsymKeyGenerator_Destroy(dhGen);
39. return ret;
40. }

42. // 使用A的公钥和B的私钥进行密钥协商。
43. OH_CryptoPrivKey *privKeyB = OH_CryptoKeyPair_GetPrivKey(keyPairB);
44. OH_CryptoPubKey *pubKeyA = OH_CryptoKeyPair_GetPubKey(keyPairA);
45. Crypto_DataBlob secret1 = { 0 };
46. ret = OH_CryptoKeyAgreement_GenerateSecret(dhKeyAgreement, privKeyB, pubKeyA, &secret1);
47. if (ret != CRYPTO_SUCCESS) {
48. OH_CryptoKeyAgreement_Destroy(dhKeyAgreement);
49. OH_CryptoKeyPair_Destroy(keyPairA);
50. OH_CryptoKeyPair_Destroy(keyPairB);
51. OH_CryptoAsymKeyGenerator_Destroy(dhGen);
52. return ret;
53. }

55. // 使用B的公钥和A的私钥进行密钥协商。
56. OH_CryptoPrivKey *privKeyA = OH_CryptoKeyPair_GetPrivKey(keyPairA);
57. OH_CryptoPubKey *pubKeyB = OH_CryptoKeyPair_GetPubKey(keyPairB);
58. Crypto_DataBlob secret2 = { 0 };
59. ret = OH_CryptoKeyAgreement_GenerateSecret(dhKeyAgreement, privKeyA, pubKeyB, &secret2);
60. if (ret != CRYPTO_SUCCESS) {
61. OH_Crypto_FreeDataBlob(&secret1);
62. OH_CryptoKeyAgreement_Destroy(dhKeyAgreement);
63. OH_CryptoKeyPair_Destroy(keyPairA);
64. OH_CryptoKeyPair_Destroy(keyPairB);
65. OH_CryptoAsymKeyGenerator_Destroy(dhGen);
66. return ret;
67. }

69. // 比较两次协商的结果。
70. if ((secret1.len == secret2.len) &&
71. (memcmp(secret1.data, secret2.data, secret1.len) == 0)) {
72. printf("dh success\n");
73. } else {
74. printf("dh result is not equal\n");
75. ret = CRYPTO_OPERTION_ERROR;
76. }

78. // 清理资源。
79. OH_Crypto_FreeDataBlob(&secret1);
80. OH_Crypto_FreeDataBlob(&secret2);
81. OH_CryptoKeyAgreement_Destroy(dhKeyAgreement);
82. OH_CryptoKeyPair_Destroy(keyPairA);
83. OH_CryptoKeyPair_Destroy(keyPairB);
84. OH_CryptoAsymKeyGenerator_Destroy(dhGen);
85. return ret;
86. }
```