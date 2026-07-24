对应算法规格请查看[密钥派生算法规格：HKDF](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-key-derivation-overview#hkdf算法)。

## 开发步骤

1. 调用[OH\_CryptoKdfParams\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-kdf-h#oh_cryptokdfparams_create)，指定字符串参数'HKDF'，创建密钥派生参数对象。
2. 调用[OH\_CryptoKdfParams\_SetParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-kdf-h#oh_cryptokdfparams_setparam)，设置HKDF所需的参数。示例如下：

   * CRYPTO\_KDF\_KEY\_DATABLOB：用于生成派生密钥的原始密钥材料。
   * CRYPTO\_KDF\_SALT\_DATABLOB：盐值。
   * CRYPTO\_KDF\_INFO\_DATABLOB：应用程序特定的信息（可选）。
3. 调用[OH\_CryptoKdf\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-kdf-h#oh_cryptokdf_create)，指定字符串参数'HKDF|SHA256|EXTRACT\_AND\_EXPAND'，创建密钥派生函数对象。
4. 调用[OH\_CryptoKdf\_Derive](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-kdf-h#oh_cryptokdf_derive)，指定目标密钥的字节长度，进行密钥派生。

收起

自动换行

深色代码主题

复制

```
1. #include "CryptoArchitectureKit/crypto_architecture_kit.h"
2. #include <stdio.h>
3. #include <string.h>

5. static OH_Crypto_ErrCode doTestHkdf()
6. {
7. // 创建HKDF参数对象。
8. OH_CryptoKdfParams *params = nullptr;
9. OH_Crypto_ErrCode ret = OH_CryptoKdfParams_Create("HKDF", &params);
10. if (ret != CRYPTO_SUCCESS) {
11. return ret;
12. }

14. // 设置原始密钥材料。
15. const char *keyData = "012345678901234567890123456789";
16. Crypto_DataBlob key = {
17. .data = reinterpret_cast<uint8_t *>(const_cast<char *>(keyData)),
18. .len = strlen(keyData)
19. };
20. ret = OH_CryptoKdfParams_SetParam(params, CRYPTO_KDF_KEY_DATABLOB, &key);
21. if (ret != CRYPTO_SUCCESS) {
22. OH_CryptoKdfParams_Destroy(params);
23. return ret;
24. }

26. // 设置盐值。
27. const char *saltData = "saltstring";
28. Crypto_DataBlob salt = {
29. .data = reinterpret_cast<uint8_t *>(const_cast<char *>(saltData)),
30. .len = strlen(saltData)
31. };
32. ret = OH_CryptoKdfParams_SetParam(params, CRYPTO_KDF_SALT_DATABLOB, &salt);
33. if (ret != CRYPTO_SUCCESS) {
34. OH_CryptoKdfParams_Destroy(params);
35. return ret;
36. }

38. // 设置应用程序特定信息（可选）。
39. const char *infoData = "infostring";
40. Crypto_DataBlob info = {
41. .data = reinterpret_cast<uint8_t *>(const_cast<char *>(infoData)),
42. .len = strlen(infoData)
43. };
44. ret = OH_CryptoKdfParams_SetParam(params, CRYPTO_KDF_INFO_DATABLOB, &info);
45. if (ret != CRYPTO_SUCCESS) {
46. OH_CryptoKdfParams_Destroy(params);
47. return ret;
48. }

50. // 创建密钥派生函数对象。
51. OH_CryptoKdf *kdfCtx = nullptr;
52. ret = OH_CryptoKdf_Create("HKDF|SHA256|EXTRACT_AND_EXPAND", &kdfCtx);
53. if (ret != CRYPTO_SUCCESS) {
54. OH_CryptoKdfParams_Destroy(params);
55. return ret;
56. }

58. // 派生密钥。
59. Crypto_DataBlob out = {0};
60. uint32_t keyLength = 32; // 生成32字节的密钥。
61. ret = OH_CryptoKdf_Derive(kdfCtx, params, keyLength, &out);
62. if (ret != CRYPTO_SUCCESS) {
63. OH_CryptoKdf_Destroy(kdfCtx);
64. OH_CryptoKdfParams_Destroy(params);
65. return ret;
66. }

68. printf("Derived key length: %u\n", out.len);

70. // 清理资源。
71. OH_Crypto_FreeDataBlob(&out);
72. OH_CryptoKdf_Destroy(kdfCtx);
73. OH_CryptoKdfParams_Destroy(params);
74. return CRYPTO_SUCCESS;
75. }
```