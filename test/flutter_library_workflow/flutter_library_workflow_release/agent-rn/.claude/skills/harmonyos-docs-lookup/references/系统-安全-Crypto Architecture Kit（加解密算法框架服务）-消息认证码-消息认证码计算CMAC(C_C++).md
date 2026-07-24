CMAC通过使用分组密码（如AES）和一个密钥来生成认证码，确保消息在传输过程中未被篡改。

## 开发步骤

在调用update接口传入数据时，可以[一次性传入](/consumer/cn/doc/harmonyos-guides/crypto-compute-cmac-ndk#cmac一次性传入)，也可以把数据人工[分段传入](/consumer/cn/doc/harmonyos-guides/crypto-compute-cmac-ndk#cmac分段传入)。对于同一段数据而言，是否分段，计算结果没有差异。对于数据量较大的数据，开发者可以根据实际需求选择是否分段传入。

下面分别提供两种方式的示例代码。

### CMAC（一次性传入）

1. 调用[OH\_CryptoSymKeyGenerator\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-key-h#oh_cryptosymkeygenerator_create)、[OH\_CryptoSymKeyGenerator\_Generate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-key-h#oh_cryptosymkeygenerator_generate)生成密钥算法为AES128的对称密钥（symKey）。
2. 调用[OH\_CryptoMac\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-mac-h#oh_cryptomac_create)，指定字符串参数'CMAC'，创建MAC算法为CMAC的MAC生成器。
3. 调用[OH\_CryptoMac\_SetParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-mac-h#oh_cryptomac_setparam)，指定参数CRYPTO\_MAC\_CIPHER\_NAME\_STR，设置分组密码算法名称。
4. 调用[OH\_CryptoMac\_Init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-mac-h#oh_cryptomac_init)，指定共享对称密钥（symKey），初始化MAC对象。
5. 调用[OH\_CryptoMac\_Update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-mac-h#oh_cryptomac_update)，传入自定义消息，进行消息认证码计算。
6. 调用[OH\_CryptoMac\_Final](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-mac-h#oh_cryptomac_final)，获取MAC计算结果。
7. 调用[OH\_CryptoMac\_GetLength](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-mac-h#oh_cryptomac_getlength)，获取MAC消息认证码的长度，单位为字节。

收起

自动换行

深色代码主题

复制

```
1. #include "CryptoArchitectureKit/crypto_architecture_kit.h"
2. #include <stdio.h>
3. #include <string.h>

5. static OH_CryptoSymKey *GenerateAesKey(const char *algoName)
6. {
7. OH_CryptoSymKeyGenerator *keyGen = nullptr;
8. OH_Crypto_ErrCode ret = OH_CryptoSymKeyGenerator_Create(algoName, &keyGen);
9. if (ret != CRYPTO_SUCCESS) {
10. return nullptr;
11. }
12. OH_CryptoSymKey *keyCtx = nullptr;
13. ret = OH_CryptoSymKeyGenerator_Generate(keyGen, &keyCtx);
14. OH_CryptoSymKeyGenerator_Destroy(keyGen);
15. if (ret != CRYPTO_SUCCESS) {
16. return nullptr;
17. }
18. return keyCtx;
19. }

21. static OH_Crypto_ErrCode doTestCmacOnce()
22. {
23. // 生成AES128密钥。
24. OH_CryptoSymKey *keyCtx = GenerateAesKey("AES128");
25. if (keyCtx == nullptr) {
26. return CRYPTO_OPERTION_ERROR;
27. }

29. // 创建CMAC生成器。
30. OH_CryptoMac *ctx = nullptr;
31. OH_Crypto_ErrCode ret = OH_CryptoMac_Create("CMAC", &ctx);
32. if (ret != CRYPTO_SUCCESS) {
33. OH_CryptoSymKey_Destroy(keyCtx);
34. return ret;
35. }

37. // 设置分组密码算法名称为AES128。
38. const char *cipherName = "AES128";
39. Crypto_DataBlob cipherNameData = {
40. .data = reinterpret_cast<uint8_t *>(const_cast<char *>(cipherName)),
41. .len = strlen(cipherName)
42. };
43. ret = OH_CryptoMac_SetParam(ctx, CRYPTO_MAC_CIPHER_NAME_STR, &cipherNameData);
44. if (ret != CRYPTO_SUCCESS) {
45. OH_CryptoMac_Destroy(ctx);
46. OH_CryptoSymKey_Destroy(keyCtx);
47. return ret;
48. }

50. // 初始化CMAC计算。
51. ret = OH_CryptoMac_Init(ctx, keyCtx);
52. if (ret != CRYPTO_SUCCESS) {
53. OH_CryptoMac_Destroy(ctx);
54. OH_CryptoSymKey_Destroy(keyCtx);
55. return ret;
56. }

58. // 一次性传入所有数据。
59. const char *message = "cmacTestMessage";
60. Crypto_DataBlob input = {
61. .data = reinterpret_cast<uint8_t *>(const_cast<char *>(message)),
62. .len = strlen(message)
63. };
64. ret = OH_CryptoMac_Update(ctx, &input);
65. if (ret != CRYPTO_SUCCESS) {
66. OH_CryptoMac_Destroy(ctx);
67. OH_CryptoSymKey_Destroy(keyCtx);
68. return ret;
69. }

71. // 完成CMAC计算并获取结果。
72. Crypto_DataBlob out = {0};
73. ret = OH_CryptoMac_Final(ctx, &out);
74. if (ret != CRYPTO_SUCCESS) {
75. OH_CryptoMac_Destroy(ctx);
76. OH_CryptoSymKey_Destroy(keyCtx);
77. return ret;
78. }

80. // 获取CMAC值的长度。
81. uint32_t macLen = 0;
82. ret = OH_CryptoMac_GetLength(ctx, &macLen);
83. if (ret != CRYPTO_SUCCESS) {
84. OH_Crypto_FreeDataBlob(&out);
85. OH_CryptoMac_Destroy(ctx);
86. OH_CryptoSymKey_Destroy(keyCtx);
87. return ret;
88. }

90. printf("CMAC calculation success, length: %u\n", macLen);

92. // 清理资源。
93. OH_Crypto_FreeDataBlob(&out);
94. OH_CryptoMac_Destroy(ctx);
95. OH_CryptoSymKey_Destroy(keyCtx);
96. return CRYPTO_SUCCESS;
97. }
```

### CMAC（分段传入）

与一次性传入的步骤基本相同，区别在于多次调用[OH\_CryptoMac\_Update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-mac-h#oh_cryptomac_update)来处理分段数据。

收起

自动换行

深色代码主题

复制

```
1. #include "CryptoArchitectureKit/crypto_architecture_kit.h"
2. #include <stdio.h>
3. #include <string.h>

5. static OH_CryptoSymKey *GenerateAesKey(const char *algoName)
6. {
7. OH_CryptoSymKeyGenerator *keyGen = nullptr;
8. OH_Crypto_ErrCode ret = OH_CryptoSymKeyGenerator_Create(algoName, &keyGen);
9. if (ret != CRYPTO_SUCCESS) {
10. return nullptr;
11. }
12. OH_CryptoSymKey *keyCtx = nullptr;
13. ret = OH_CryptoSymKeyGenerator_Generate(keyGen, &keyCtx);
14. OH_CryptoSymKeyGenerator_Destroy(keyGen);
15. if (ret != CRYPTO_SUCCESS) {
16. return nullptr;
17. }
18. return keyCtx;
19. }

21. static OH_Crypto_ErrCode doTestCmacBySegments()
22. {
23. // 生成AES128密钥。
24. OH_CryptoSymKey *keyCtx = GenerateAesKey("AES128");
25. if (keyCtx == nullptr) {
26. return CRYPTO_OPERTION_ERROR;
27. }

29. // 创建CMAC生成器。
30. OH_CryptoMac *ctx = nullptr;
31. OH_Crypto_ErrCode ret = OH_CryptoMac_Create("CMAC", &ctx);
32. if (ret != CRYPTO_SUCCESS) {
33. OH_CryptoSymKey_Destroy(keyCtx);
34. return ret;
35. }

37. // 设置分组密码算法名称为AES128。
38. const char *cipherName = "AES128";
39. Crypto_DataBlob cipherNameData = {
40. .data = reinterpret_cast<uint8_t *>(const_cast<char *>(cipherName)),
41. .len = strlen(cipherName)
42. };
43. ret = OH_CryptoMac_SetParam(ctx, CRYPTO_MAC_CIPHER_NAME_STR, &cipherNameData);
44. if (ret != CRYPTO_SUCCESS) {
45. OH_CryptoMac_Destroy(ctx);
46. OH_CryptoSymKey_Destroy(keyCtx);
47. return ret;
48. }

50. // 初始化CMAC计算。
51. ret = OH_CryptoMac_Init(ctx, keyCtx);
52. if (ret != CRYPTO_SUCCESS) {
53. OH_CryptoMac_Destroy(ctx);
54. OH_CryptoSymKey_Destroy(keyCtx);
55. return ret;
56. }

58. // 分段传入数据。
59. const char *message = "aaaaa.....bbbbb.....ccccc.....ddddd.....eee";
60. size_t messageLen = strlen(message);
61. size_t segmentSize = 20; // 每段20字节。

63. for (size_t i = 0; i < messageLen; i += segmentSize) {
64. size_t currentSize = (i + segmentSize <= messageLen) ? segmentSize : (messageLen - i);
65. Crypto_DataBlob segment = {
66. .data = reinterpret_cast<uint8_t *>(const_cast<char *>(message + i)),
67. .len = currentSize
68. };
69. ret = OH_CryptoMac_Update(ctx, &segment);
70. if (ret != CRYPTO_SUCCESS) {
71. OH_CryptoMac_Destroy(ctx);
72. OH_CryptoSymKey_Destroy(keyCtx);
73. return ret;
74. }
75. }

77. // 完成CMAC计算并获取结果。
78. Crypto_DataBlob out = {0};
79. ret = OH_CryptoMac_Final(ctx, &out);
80. if (ret != CRYPTO_SUCCESS) {
81. OH_CryptoMac_Destroy(ctx);
82. OH_CryptoSymKey_Destroy(keyCtx);
83. return ret;
84. }

86. // 获取CMAC值的长度。
87. uint32_t macLen = 0;
88. ret = OH_CryptoMac_GetLength(ctx, &macLen);
89. if (ret != CRYPTO_SUCCESS) {
90. OH_Crypto_FreeDataBlob(&out);
91. OH_CryptoMac_Destroy(ctx);
92. OH_CryptoSymKey_Destroy(keyCtx);
93. return ret;
94. }

96. printf("CMAC calculation success, length: %u\n", macLen);

98. // 清理资源。
99. OH_Crypto_FreeDataBlob(&out);
100. OH_CryptoMac_Destroy(ctx);
101. OH_CryptoSymKey_Destroy(keyCtx);
102. return CRYPTO_SUCCESS;
103. }
```