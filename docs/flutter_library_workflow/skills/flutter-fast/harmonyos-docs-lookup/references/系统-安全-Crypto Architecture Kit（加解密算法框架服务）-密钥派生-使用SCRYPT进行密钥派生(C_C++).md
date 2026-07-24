对应的算法规格请查看[密钥派生算法规格：SCRYPT](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-key-derivation-overview#scrypt算法)。

## 开发步骤

1. 调用[OH\_CryptoKdfParams\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-kdf-h#oh_cryptokdfparams_create)，指定字符串参数'SCRYPT'，创建密钥派生参数对象。
2. 调用[OH\_CryptoKdfParams\_SetParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-kdf-h#oh_cryptokdfparams_setparam)，设置Scrypt所需的参数。

密钥派生失败原因：下列参数未设置。

* CRYPTO\_KDF\_KEY\_DATABLOB：用于生成派生密钥的原始密码。
* CRYPTO\_KDF\_SALT\_DATABLOB：盐值。
* CRYPTO\_KDF\_SCRYPT\_N\_UINT64：CPU/内存开销参数，必须是2的幂次方。
* CRYPTO\_KDF\_SCRYPT\_R\_UINT64：块大小参数，影响并行度。
* CRYPTO\_KDF\_SCRYPT\_P\_UINT64：并行化参数。
* CRYPTO\_KDF\_SCRYPT\_MAX\_MEM\_UINT64：最大内存限制（字节）。

1. 调用[OH\_CryptoKdf\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-kdf-h#oh_cryptokdf_create)，指定字符串参数'SCRYPT'，创建密钥派生函数对象。
2. 调用[OH\_CryptoKdf\_Derive](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-kdf-h#oh_cryptokdf_derive)，指定目标密钥的字节长度，进行密钥派生。

收起

自动换行

深色代码主题

复制

```
1. #include "CryptoArchitectureKit/crypto_architecture_kit.h"
2. #include "CryptoArchitectureKit/crypto_kdf.h"
3. #include <stdio.h>
4. #include <cstring>

6. static OH_Crypto_ErrCode doTestScrypt()
7. {
8. // 创建Scrypt参数对象。
9. OH_CryptoKdfParams *params = nullptr;
10. OH_Crypto_ErrCode ret = OH_CryptoKdfParams_Create("SCRYPT", &params);
11. if (ret != CRYPTO_SUCCESS) {
12. return ret;
13. }

15. // 设置密码。
16. const char *password = "123456";
17. Crypto_DataBlob passwordBlob = {
18. .data = reinterpret_cast<uint8_t *>(const_cast<char *>(password)),
19. .len = strlen(password)
20. };
21. ret = OH_CryptoKdfParams_SetParam(params, CRYPTO_KDF_KEY_DATABLOB, &passwordBlob);
22. if (ret != CRYPTO_SUCCESS) {
23. OH_CryptoKdfParams_Destroy(params);
24. return ret;
25. }

27. // 设置盐值。
28. const char *salt = "saltstring";
29. Crypto_DataBlob saltBlob = {
30. .data = reinterpret_cast<uint8_t *>(const_cast<char *>(salt)),
31. .len = strlen(salt)
32. };
33. ret = OH_CryptoKdfParams_SetParam(params, CRYPTO_KDF_SALT_DATABLOB, &saltBlob);
34. if (ret != CRYPTO_SUCCESS) {
35. OH_CryptoKdfParams_Destroy(params);
36. return ret;
37. }

39. // 设置Scrypt参数。
40. uint64_t n = 1024;  // CPU/内存开销参数。
41. uint64_t r = 8;     // 块大小参数。
42. uint64_t p = 16;    // 并行化参数。
43. uint64_t maxMem = 1067008;  // 最大内存限制（字节）。

45. Crypto_DataBlob nData = {
46. .data = reinterpret_cast<uint8_t *>(&n),
47. .len = sizeof(uint64_t)
48. };
49. Crypto_DataBlob rData = {
50. .data = reinterpret_cast<uint8_t *>(&r),
51. .len = sizeof(uint64_t)
52. };
53. Crypto_DataBlob pData = {
54. .data = reinterpret_cast<uint8_t *>(&p),
55. .len = sizeof(uint64_t)
56. };
57. Crypto_DataBlob maxMemData = {
58. .data = reinterpret_cast<uint8_t *>(&maxMem),
59. .len = sizeof(uint64_t)
60. };

62. ret = OH_CryptoKdfParams_SetParam(params, CRYPTO_KDF_SCRYPT_N_UINT64, &nData);
63. if (ret != CRYPTO_SUCCESS) {
64. OH_CryptoKdfParams_Destroy(params);
65. return ret;
66. }
67. ret = OH_CryptoKdfParams_SetParam(params, CRYPTO_KDF_SCRYPT_R_UINT64, &rData);
68. if (ret != CRYPTO_SUCCESS) {
69. OH_CryptoKdfParams_Destroy(params);
70. return ret;
71. }
72. ret = OH_CryptoKdfParams_SetParam(params, CRYPTO_KDF_SCRYPT_P_UINT64, &pData);
73. if (ret != CRYPTO_SUCCESS) {
74. OH_CryptoKdfParams_Destroy(params);
75. return ret;
76. }
77. ret = OH_CryptoKdfParams_SetParam(params, CRYPTO_KDF_SCRYPT_MAX_MEM_UINT64, &maxMemData);
78. if (ret != CRYPTO_SUCCESS) {
79. OH_CryptoKdfParams_Destroy(params);
80. return ret;
81. }

83. // 创建密钥派生函数对象。
84. OH_CryptoKdf *kdfCtx = nullptr;
85. ret = OH_CryptoKdf_Create("SCRYPT", &kdfCtx);
86. if (ret != CRYPTO_SUCCESS) {
87. OH_CryptoKdfParams_Destroy(params);
88. return ret;
89. }

91. // 派生密钥。
92. Crypto_DataBlob out = {0};
93. uint32_t keyLength = 32; // 生成32字节的密钥。
94. ret = OH_CryptoKdf_Derive(kdfCtx, params, keyLength, &out);
95. if (ret != CRYPTO_SUCCESS) {
96. OH_CryptoKdf_Destroy(kdfCtx);
97. OH_CryptoKdfParams_Destroy(params);
98. return ret;
99. }

101. printf("Derived key length: %u\n", out.len);

103. // 清理资源。
104. OH_Crypto_FreeDataBlob(&out);
105. OH_CryptoKdf_Destroy(kdfCtx);
106. OH_CryptoKdfParams_Destroy(params);
107. return CRYPTO_SUCCESS;
108. }
```