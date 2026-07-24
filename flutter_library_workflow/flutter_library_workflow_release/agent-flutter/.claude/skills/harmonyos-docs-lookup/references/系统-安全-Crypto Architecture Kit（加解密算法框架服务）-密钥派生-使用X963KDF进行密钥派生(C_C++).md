从API version 22开始，算法库支持使用该算法进行密钥派生操作。

对应算法规格请查看[密钥派生算法规格：X963KDF](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-key-derivation-overview#x963kdf算法)。

## 开发步骤

1. 调用[OH\_CryptoKdfParams\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-kdf-h#oh_cryptokdfparams_create)，指定字符串参数'X963KDF'，创建密钥派生参数对象。
2. 调用[OH\_CryptoKdfParams\_SetParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-kdf-h#oh_cryptokdfparams_setparam)，设置X963KDF所需的参数。示例如下：

   * CRYPTO\_KDF\_KEY\_DATABLOB：用于生成派生密钥的原始密钥材料。
   * CRYPTO\_KDF\_INFO\_DATABLOB：应用程序特定的信息（可选）。
3. 调用[OH\_CryptoKdf\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-kdf-h#oh_cryptokdf_create)，指定字符串参数'X963KDF|SHA256'，创建密钥派生函数对象。
4. 调用[OH\_CryptoKdf\_Derive](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-kdf-h#oh_cryptokdf_derive)，指定目标密钥的字节长度，进行密钥派生。

收起

自动换行

深色代码主题

复制

```
1. #include "CryptoArchitectureKit/crypto_architecture_kit.h"
2. #include <stdio.h>
3. #include <string.h>

5. static OH_Crypto_ErrCode doTestX963Kdf()
6. {
7. // 创建X963KDF参数对象。
8. OH_CryptoKdfParams *params = nullptr;
9. OH_Crypto_ErrCode ret = OH_CryptoKdfParams_Create("X963KDF", &params);
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


27. // 设置应用程序特定信息。
28. const char *infoData = "infostring";
29. Crypto_DataBlob info = {
30. .data = reinterpret_cast<uint8_t *>(const_cast<char *>(infoData)),
31. .len = strlen(infoData)
32. };
33. ret = OH_CryptoKdfParams_SetParam(params, CRYPTO_KDF_INFO_DATABLOB, &info);
34. if (ret != CRYPTO_SUCCESS) {
35. OH_CryptoKdfParams_Destroy(params);
36. return ret;
37. }

39. // 创建密钥派生函数对象。
40. OH_CryptoKdf *kdfCtx = nullptr;
41. ret = OH_CryptoKdf_Create("X963KDF|SHA256", &kdfCtx);
42. if (ret != CRYPTO_SUCCESS) {
43. OH_CryptoKdfParams_Destroy(params);
44. return ret;
45. }

47. // 派生密钥。
48. Crypto_DataBlob out = {0};
49. uint32_t keyLength = 32; // 生成32字节的密钥。
50. ret = OH_CryptoKdf_Derive(kdfCtx, params, keyLength, &out);
51. if (ret != CRYPTO_SUCCESS) {
52. OH_CryptoKdf_Destroy(kdfCtx);
53. OH_CryptoKdfParams_Destroy(params);
54. return ret;
55. }

57. printf("Derived key length: %u\n", out.len);

59. // 清理资源。
60. OH_Crypto_FreeDataBlob(&out);
61. OH_CryptoKdf_Destroy(kdfCtx);
62. OH_CryptoKdfParams_Destroy(params);
63. return CRYPTO_SUCCESS;
64. }
```