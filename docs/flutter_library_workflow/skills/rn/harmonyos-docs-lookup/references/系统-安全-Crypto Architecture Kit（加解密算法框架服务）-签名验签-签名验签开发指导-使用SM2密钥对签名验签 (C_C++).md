对应的算法规格请查看[签名验签算法规格：SM2](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sign-sig-verify-overview#sm2)。

## 在CMake脚本中链接相关动态库

收起

自动换行

深色代码主题

复制

```
1. target_link_libraries(entry PUBLIC libohcrypto.so)
```

## 签名开发步骤

1. 调用[OH\_CryptoSign\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-signature-h#oh_cryptosign_create)，指定字符串参数'SM2\_256|SM3'，创建非对称密钥类型为SM2\_256、摘要算法为SM3的Sign实例，用于完成签名操作。
2. 调用[OH\_CryptoSign\_Init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-signature-h#oh_cryptosign_init)，使用私钥[OH\_CryptoPrivKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptoasymkeyapi-oh-cryptoprivkey)初始化Sign实例。
3. 调用[OH\_CryptoSign\_Update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-signature-h#oh_cryptosign_update)，传入待签名的数据。当前单次update长度没有限制，开发者可以根据数据量判断如何调用update。如果数据量较小，可以直接调用OH\_CryptoSign\_Final接口一次性传入。
4. 调用[OH\_CryptoSign\_Final](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-signature-h#oh_cryptosign_final)，获取签名后的数据。
5. 调用[OH\_CryptoSign\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-signature-h#oh_cryptosign_destroy)等释放内存。

收起

自动换行

深色代码主题

复制

```
1. #include "CryptoArchitectureKit/crypto_common.h"
2. #include "CryptoArchitectureKit/crypto_asym_key.h"
3. #include "CryptoArchitectureKit/crypto_signature.h"

5. static OH_Crypto_ErrCode doSm2Test() {
6. OH_CryptoAsymKeyGenerator *keyCtx = nullptr;
7. OH_CryptoKeyPair *keyPair = nullptr;
8. OH_CryptoSign *sign = nullptr;

10. uint8_t plainText[] = {
11. 0x96, 0x46, 0x2e, 0xde, 0x3f, 0x47, 0xbf, 0xd6, 0x87, 0x48, 0x36, 0x1d, 0x75, 0x35, 0xbd, 0xbc,
12. 0x6b, 0x06, 0xe8, 0xb3, 0x68, 0x91, 0x53, 0xce, 0x76, 0x5d, 0x24, 0xda, 0xdc, 0xc4, 0x9f, 0x94,
13. };
14. Crypto_DataBlob msgBlob = {
15. .data = reinterpret_cast<uint8_t *>(plainText),
16. .len = sizeof(plainText)};

18. OH_Crypto_ErrCode ret = OH_CryptoAsymKeyGenerator_Create((const char *)"SM2_256", &keyCtx);
19. if (ret != CRYPTO_SUCCESS) {
20. return ret;
21. }
22. ret = OH_CryptoAsymKeyGenerator_Generate(keyCtx, &keyPair);
23. if (ret != CRYPTO_SUCCESS) {
24. OH_CryptoAsymKeyGenerator_Destroy(keyCtx);
25. return ret;
26. }

28. OH_CryptoPrivKey *privKey = OH_CryptoKeyPair_GetPrivKey(keyPair);
29. ret = OH_CryptoSign_Create((const char *)"SM2_256|SM3", &sign);
30. if (ret != CRYPTO_SUCCESS) {
31. OH_CryptoAsymKeyGenerator_Destroy(keyCtx);
32. OH_CryptoKeyPair_Destroy(keyPair);
33. return ret;
34. }
35. ret = OH_CryptoSign_Init(sign, privKey);
36. if (ret != CRYPTO_SUCCESS) {
37. OH_CryptoSign_Destroy(sign);
38. OH_CryptoAsymKeyGenerator_Destroy(keyCtx);
39. OH_CryptoKeyPair_Destroy(keyPair);
40. return ret;
41. }

43. ret = OH_CryptoSign_Update(sign, &msgBlob);
44. if (ret != CRYPTO_SUCCESS) {
45. OH_CryptoSign_Destroy(sign);
46. OH_CryptoAsymKeyGenerator_Destroy(keyCtx);
47. OH_CryptoKeyPair_Destroy(keyPair);
48. return ret;
49. }

51. Crypto_DataBlob signBlob = {.data = nullptr, .len = 0};
52. ret = OH_CryptoSign_Final(sign, nullptr, &signBlob);
53. if (ret != CRYPTO_SUCCESS) {
54. OH_CryptoSign_Destroy(sign);
55. OH_CryptoAsymKeyGenerator_Destroy(keyCtx);
56. OH_CryptoKeyPair_Destroy(keyPair);
57. return ret;
58. }
59. OH_CryptoSign_Destroy(sign);
60. OH_CryptoAsymKeyGenerator_Destroy(keyCtx);
61. OH_CryptoKeyPair_Destroy(keyPair);
62. OH_Crypto_FreeDataBlob(&signBlob);
63. return CRYPTO_SUCCESS;
64. }
```

## 验签开发步骤

1. 调用[OH\_CryptoVerify\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-signature-h#oh_cryptoverify_create)，指定字符串参数'SM2\_256|SM3'，创建非对称密钥类型为SM2\_256、摘要算法为SM3的Verify实例，用于完成验签操作。
2. 调用[OH\_CryptoVerify\_Init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-signature-h#oh_cryptoverify_init)，使用公钥（OH\_CryptoPubKey）初始化Verify实例。
3. 调用[OH\_CryptoVerify\_Update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-signature-h#oh_cryptoverify_update)，传入待验证的数据。当前单次update长度没有限制，开发者可以根据数据量判断如何调用update，如果数据量较小，可以直接调用OH\_CryptoVerify\_Final接口一次性传入。
4. 调用[OH\_CryptoVerify\_Final](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-signature-h#oh_cryptoverify_final)，对数据进行验签。

收起

自动换行

深色代码主题

复制

```
1. #include "CryptoArchitectureKit/crypto_common.h"
2. #include "CryptoArchitectureKit/crypto_signature.h"
3. #include "CryptoArchitectureKit/crypto_asym_key.h"

5. static bool doTestSm2Signature()
6. {
7. OH_CryptoAsymKeyGenerator *keyCtx = nullptr;
8. OH_CryptoKeyPair *keyPair = nullptr;
9. OH_CryptoVerify *verify = nullptr;

11. uint8_t plainText[] = {
12. 0x96, 0x46, 0x2e, 0xde, 0x3f, 0x47, 0xbf, 0xd6, 0x87, 0x48, 0x36, 0x1d, 0x75, 0x35, 0xbd, 0xbc,
13. 0x6b, 0x06, 0xe8, 0xb3, 0x68, 0x91, 0x53, 0xce, 0x76, 0x5d, 0x24, 0xda, 0xdc, 0xc4, 0x9f, 0x94,
14. }; // 待验证数据，仅供参考。
15. Crypto_DataBlob msgBlob = {
16. .data = reinterpret_cast<uint8_t *>(plainText),
17. .len = sizeof(plainText)
18. };

20. uint8_t pubKeyText[] = {
21. 0x30, 0x59, 0x30, 0x13, 0x06, 0x07, 0x2a, 0x86, 0x48, 0xce, 0x3d, 0x02, 0x01, 0x06, 0x08, 0x2a,
22. 0x81, 0x1c, 0xcf, 0x55, 0x01, 0x82, 0x2d, 0x03, 0x42, 0x00, 0x04, 0x80, 0x5b, 0x78, 0x04, 0xd7,
23. 0xcf, 0xc3, 0x99, 0x63, 0xae, 0x88, 0xcd, 0xfc, 0xd6, 0x18, 0xf4, 0x08, 0xe8, 0xe3, 0x68, 0x47,
24. 0x4f, 0x44, 0x0e, 0xb2, 0xba, 0x3a, 0xb3, 0x10, 0xf1, 0xc9, 0xd0, 0x84, 0xe2, 0xa4, 0x47, 0xbe,
25. 0x72, 0xae, 0xf8, 0x6a, 0xeb, 0x6e, 0x10, 0xab, 0x52, 0x6b, 0x6a, 0x58, 0xc6, 0xb5, 0x78, 0xaa,
26. 0x70, 0xe5, 0x58, 0x20, 0x4e, 0x34, 0x42, 0x77, 0x08, 0x27, 0x11,
27. }; // 公钥DER编码数据，仅供参考。

29. Crypto_DataBlob keyBlob = {
30. .data = reinterpret_cast<uint8_t *>(pubKeyText),
31. .len = sizeof(pubKeyText)
32. };

34. uint8_t signText[] = {
35. 0x30, 0x45, 0x02, 0x21, 0x00, 0xf4, 0xe7, 0x9d, 0x35, 0x33, 0xa6, 0x86, 0x2e, 0x2a, 0x97, 0x72,
36. 0xc9, 0x46, 0x79, 0x65, 0xca, 0x4a, 0x71, 0x34, 0xca, 0xf7, 0x58, 0xb3, 0x26, 0xa5, 0xdb, 0xfa,
37. 0x8b, 0xbe, 0xbf, 0x5f, 0x90, 0x02, 0x20, 0x53, 0xb4, 0x23, 0xb1, 0xe2, 0x8f, 0x2f, 0xe9, 0xc8,
38. 0x22, 0xef, 0xab, 0x9b, 0x13, 0x08, 0x75, 0x8e, 0xb1, 0x9c, 0x59, 0xe5, 0xd6, 0x64, 0x35, 0xf5,
39. 0xd1, 0xde, 0xfa, 0xfe, 0x80, 0x37, 0x1a,
40. }; // 签名数据，仅供参考。

42. Crypto_DataBlob signBlob = {
43. .data = reinterpret_cast<uint8_t *>(signText),
44. .len = sizeof(signText)
45. };

47. // keypair
48. OH_Crypto_ErrCode ret = CRYPTO_SUCCESS;
49. ret = OH_CryptoAsymKeyGenerator_Create((const char *)"SM2_256", &keyCtx); // 创建非对称密钥生成器。
50. if (ret != CRYPTO_SUCCESS) {
51. return false;
52. }
53. ret = OH_CryptoAsymKeyGenerator_Convert(keyCtx, CRYPTO_DER, &keyBlob, nullptr, &keyPair); // 将DER格式的公钥编码数据转换为OH_CryptoKeyPair。
54. if (ret != CRYPTO_SUCCESS) {
55. OH_CryptoAsymKeyGenerator_Destroy(keyCtx);
56. return false;
57. }
58. OH_CryptoPubKey *pubKey = OH_CryptoKeyPair_GetPubKey(keyPair);
59. // verify
60. ret = OH_CryptoVerify_Create((const char *)"SM2_256|SM3", &verify); // 创建Verify实例。
61. if (ret != CRYPTO_SUCCESS) {
62. OH_CryptoVerify_Destroy(verify);
63. OH_CryptoAsymKeyGenerator_Destroy(keyCtx);
64. return false;
65. }
66. ret = OH_CryptoVerify_Init(verify, pubKey); // 使用公钥初始化Verify实例。
67. if (ret != CRYPTO_SUCCESS) {
68. OH_CryptoVerify_Destroy(verify);
69. OH_CryptoAsymKeyGenerator_Destroy(keyCtx);
70. return false;
71. }
72. bool res = OH_CryptoVerify_Final(verify, &msgBlob, &signBlob); // 对数据进行验签。
73. if (res != true) {
74. OH_CryptoVerify_Destroy(verify);
75. OH_CryptoAsymKeyGenerator_Destroy(keyCtx);
76. return false;
77. }

79. OH_CryptoVerify_Destroy(verify);
80. OH_CryptoAsymKeyGenerator_Destroy(keyCtx);
81. OH_CryptoKeyPair_Destroy(keyPair);
82. return res;
83. }
```