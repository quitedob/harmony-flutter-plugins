对应的算法规格请查看[密钥派生算法规格：PBKDF2](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-key-derivation-overview#pbkdf2算法)。

## 开发步骤

1. 调用[OH\_CryptoKdfParams\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-kdf-h#oh_cryptokdfparams_create)，指定字符串参数'PBKDF2'，创建密钥派生参数对象。
2. 调用[OH\_CryptoKdfParams\_SetParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-kdf-h#oh_cryptokdfparams_setparam)，设置PBKDF2所需的参数。示例如下：

   * CRYPTO\_KDF\_KEY\_DATABLOB：用于生成派生密钥的原始密码。
   * CRYPTO\_KDF\_SALT\_DATABLOB：盐值。
   * CRYPTO\_KDF\_ITER\_COUNT\_INT：重复运算的次数，需要为正整数。
3. 调用[OH\_CryptoKdf\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-kdf-h#oh_cryptokdf_create)，指定字符串参数'PBKDF2|SHA256'，创建密钥派生函数对象。
4. 调用[OH\_CryptoKdf\_Derive](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-kdf-h#oh_cryptokdf_derive)，指定目标密钥的字节长度，进行密钥派生。

收起

自动换行

深色代码主题

复制

```
1. #include "CryptoArchitectureKit/crypto_architecture_kit.h"
2. #include <stdio.h>
3. #include <string.h>

5. static OH_Crypto_ErrCode doTestPbkdf2()
6. {
7. // 创建PBKDF2参数对象。
8. OH_CryptoKdfParams *params = nullptr;
9. OH_Crypto_ErrCode ret = OH_CryptoKdfParams_Create("PBKDF2", &params);
10. if (ret != CRYPTO_SUCCESS) {
11. return ret;
12. }

14. // 设置密码。
15. const char *password = "123456";
16. Crypto_DataBlob passwordBlob = {
17. .data = reinterpret_cast<uint8_t *>(const_cast<char *>(password)),
18. .len = strlen(password)
19. };
20. ret = OH_CryptoKdfParams_SetParam(params, CRYPTO_KDF_KEY_DATABLOB, &passwordBlob);
21. if (ret != CRYPTO_SUCCESS) {
22. OH_CryptoKdfParams_Destroy(params);
23. return ret;
24. }

26. // 设置盐值。
27. const char *salt = "saltstring";
28. Crypto_DataBlob saltBlob = {
29. .data = reinterpret_cast<uint8_t *>(const_cast<char *>(salt)),
30. .len = strlen(salt)
31. };
32. ret = OH_CryptoKdfParams_SetParam(params, CRYPTO_KDF_SALT_DATABLOB, &saltBlob);
33. if (ret != CRYPTO_SUCCESS) {
34. OH_CryptoKdfParams_Destroy(params);
35. return ret;
36. }

38. // 设置迭代次数。
39. int iterations = 10000;
40. Crypto_DataBlob iterationsBlob = {
41. .data = reinterpret_cast<uint8_t *>(&iterations),
42. .len = sizeof(int)
43. };
44. ret = OH_CryptoKdfParams_SetParam(params, CRYPTO_KDF_ITER_COUNT_INT, &iterationsBlob);
45. if (ret != CRYPTO_SUCCESS) {
46. OH_CryptoKdfParams_Destroy(params);
47. return ret;
48. }

50. // 创建密钥派生函数对象。
51. OH_CryptoKdf *kdfCtx = nullptr;
52. ret = OH_CryptoKdf_Create("PBKDF2|SHA256", &kdfCtx);
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