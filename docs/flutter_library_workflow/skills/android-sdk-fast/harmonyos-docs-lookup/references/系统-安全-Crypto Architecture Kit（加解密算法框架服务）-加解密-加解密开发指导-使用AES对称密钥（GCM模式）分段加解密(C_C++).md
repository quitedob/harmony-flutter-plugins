对应的算法规格请查看[对称密钥加解密算法规格：AES](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sym-encrypt-decrypt-spec#aes)。

## 在CMake脚本中链接相关动态库

收起

自动换行

深色代码主题

复制

```
1. target_link_libraries(entry PUBLIC libohcrypto.so)
```

## 开发步骤

**创建对象**

调用[OH\_CryptoSymKeyGenerator\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-key-h#oh_cryptosymkeygenerator_create)和[OH\_CryptoSymKeyGenerator\_Generate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-key-h#oh_cryptosymkeygenerator_generate)，生成密钥算法为AES、密钥长度为128位的对称密钥（OH\_CryptoSymKey）。

如何生成AES对称密钥，开发者可参考下文示例，并结合[对称密钥生成和转换规格：AES](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sym-key-generation-conversion-spec#aes)和[随机生成对称密钥](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-generate-sym-key-randomly-ndk)文档进行理解。参考文档与当前示例可能存在入参差异，请注意区分。

**加密**

1. 调用[OH\_CryptoSymCipher\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_create)，指定字符串参数'AES128|GCM|PKCS7'，创建对称密钥算法为AES128、分组模式为GCM、填充模式为PKCS7的Cipher实例，用于完成加密操作。
2. 调用[OH\_CryptoSymCipherParams\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipherparams_create)创建参数对象，调用[OH\_CryptoSymCipherParams\_SetParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipherparams_setparam)设置对应的加密参数。
3. 调用[OH\_CryptoSymCipher\_Init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_init)，设置模式为加密（CRYPTO\_ENCRYPT\_MODE），指定对称密钥（OH\_CryptoSymKey）和GCM模式的加密参数（OH\_CryptoSymCipherParams），以初始化加密 Cipher 实例。
4. 将一次传入数据量设置为20字节，多次调用[OH\_CryptoSymCipher\_Update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_update)，更新数据（明文）。

   * 当前单次update没有长度限制，开发者可根据数据量判断如何调用update。
   * 建议开发者对每次update的结果都判断是否为null，并在结果不为null时取出其中的密文进行拼接，形成完整的密文。因为在不同的规格下，update的结果可能会受到不同影响。

     1）例如ECB和CBC模式，始终以分组为基本单位进行加密，并输出本次更新产生的加密分组结果。即当本次更新操作凑满一个分组时，输出密文；若未凑满，则本次更新输出null，将未加密的数据与下次输入的数据拼接后，再进行分组输出。最后进行doFinal操作时，将未加密的数据根据指定的填充模式进行填充，再输出剩余加密结果。解密过程中的update操作同理。

     2）对于流加密模式（比如CTR和OFB模式），通常密文长度和明文长度相等。
5. 调用[OH\_CryptoSymCipher\_Final](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_final)，获取密文。

   * 由于已使用update传入数据，此处传入null。
   * final输出结果可能为null，在访问具体数据前，需要先判断结果是否为null，以避免产生异常。

     注意

     在GCM模式下，final会返回authTag，作为解密操作时初始化的认证信息，需要保存。

     在GCM模式下，算法库当前只支持16字节的authTag，作为解密操作时初始化的认证信息。示例中authTag恰好为16字节。

**解密**

1. 调用[OH\_CryptoSymCipher\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_create)，指定参数'AES128|GCM|PKCS7'，创建对称密钥类型为AES128、分组模式为GCM、填充模式为PKCS7的Cipher实例，完成解密操作。
2. 调用[OH\_CryptoSymCipherParams\_SetParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipherparams_setparam)设置authTag作为解密的认证信息。

   在GCM模式下，从加密后的数据中取出末尾16字节，作为解密时初始化的认证信息。示例中authTag恰好为16字节。
3. 调用[OH\_CryptoSymCipher\_Init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_init)，设置模式为解密（CRYPTO\_DECRYPT\_MODE），指定解密密钥（OH\_CryptoSymKey）和GCM模式对应的解密参数（OH\_CryptoSymCipherParams），初始化解密Cipher实例。
4. 将一次传入数据量设置为20字节，多次调用[OH\_CryptoSymCipher\_Update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_update)，更新数据（密文）。
5. 调用[OH\_CryptoSymCipher\_Final](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_final)获取解密数据。

**销毁对象**

调用[OH\_CryptoSymKeyGenerator\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-key-h#oh_cryptosymkeygenerator_destroy)、[OH\_CryptoSymCipher\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_destroy)和[OH\_CryptoSymCipherParams\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipherparams_destroy)销毁各对象。

收起

自动换行

深色代码主题

复制

```
1. #include <string.h>
2. #include "CryptoArchitectureKit/crypto_common.h"
3. #include "CryptoArchitectureKit/crypto_sym_cipher.h"

5. #define OH_CRYPTO_GCM_TAG_LEN 16
6. #define OH_CRYPTO_MAX_TEST_DATA_LEN 128
7. static OH_Crypto_ErrCode doTestAesGcmSeg()
8. {
9. OH_CryptoSymKeyGenerator *genCtx = nullptr;
10. OH_CryptoSymCipher *encCtx = nullptr;
11. OH_CryptoSymCipher *decCtx = nullptr;
12. OH_CryptoSymKey *keyCtx = nullptr;
13. OH_CryptoSymCipherParams *params = nullptr;

15. char *plainText = const_cast<char *>("aaaaa.....bbbbb.....ccccc.....ddddd.....eee");
16. Crypto_DataBlob msgBlob = {.data = (uint8_t *)(plainText), .len = strlen(plainText)};

18. uint8_t aad[8] = {1, 2, 3, 4, 5, 6, 7, 8};
19. uint8_t tagArr[16] = {0};
20. uint8_t iv[12] = {1, 2, 4, 12, 3, 4, 2, 3, 3, 2, 0, 4}; // iv使用安全随机数生成。
21. Crypto_DataBlob tag = {.data = nullptr, .len = 0};
22. Crypto_DataBlob ivBlob = {.data = iv, .len = sizeof(iv)};
23. Crypto_DataBlob aadBlob = {.data = aad, .len = sizeof(aad)};
24. Crypto_DataBlob encData = {.data = nullptr, .len = 0};
25. Crypto_DataBlob decData = {.data = nullptr, .len = 0};
26. Crypto_DataBlob tagInit = {.data = tagArr, .len = sizeof(tagArr)};
27. int32_t cipherLen = 0;
28. int blockSize = 20;
29. int32_t randomLen = strlen(plainText);
30. Crypto_DataBlob cipherBlob;
31. // 加密变量定义。
32. int cnt = randomLen / blockSize;
33. int rem = randomLen % blockSize;
34. uint8_t cipherText[OH_CRYPTO_MAX_TEST_DATA_LEN] = {0};

36. // 解密变量定义。
37. int decCnt = cipherLen / blockSize;
38. int decRem = cipherLen % blockSize;
39. int32_t plantLen = 0;
40. uint8_t plantText[OH_CRYPTO_MAX_TEST_DATA_LEN] = {0};

42. // 生成密钥。
43. OH_Crypto_ErrCode ret;
44. ret = OH_CryptoSymKeyGenerator_Create("AES128", &genCtx);
45. if (ret != CRYPTO_SUCCESS) {
46. goto end;
47. }
48. ret = OH_CryptoSymKeyGenerator_Generate(genCtx, &keyCtx);
49. if (ret != CRYPTO_SUCCESS) {
50. goto end;
51. }

53. // 设置参数。
54. ret = OH_CryptoSymCipherParams_Create(&params);
55. if (ret != CRYPTO_SUCCESS) {
56. goto end;
57. }
58. ret = OH_CryptoSymCipherParams_SetParam(params, CRYPTO_IV_DATABLOB, &ivBlob);
59. if (ret != CRYPTO_SUCCESS) {
60. goto end;
61. }
62. ret = OH_CryptoSymCipherParams_SetParam(params, CRYPTO_AAD_DATABLOB, &aadBlob);
63. if (ret != CRYPTO_SUCCESS) {
64. goto end;
65. }
66. ret = OH_CryptoSymCipherParams_SetParam(params, CRYPTO_TAG_DATABLOB, &tagInit);
67. if (ret != CRYPTO_SUCCESS) {
68. goto end;
69. }

71. // 加密。
72. ret = OH_CryptoSymCipher_Create("AES128|GCM|PKCS7", &encCtx);
73. if (ret != CRYPTO_SUCCESS) {
74. goto end;
75. }
76. ret = OH_CryptoSymCipher_Init(encCtx, CRYPTO_ENCRYPT_MODE, keyCtx, params);
77. if (ret != CRYPTO_SUCCESS) {
78. goto end;
79. }

81. for (int i = 0; i < cnt; i++) {
82. msgBlob.len = blockSize;
83. ret = OH_CryptoSymCipher_Update(encCtx, &msgBlob, &encData);
84. if (ret != CRYPTO_SUCCESS) {
85. goto end;
86. }
87. msgBlob.data += blockSize;
88. memcpy(&cipherText[cipherLen], encData.data, encData.len);
89. cipherLen += encData.len;
90. }
91. if (rem > 0) {
92. msgBlob.len = rem;
93. ret = OH_CryptoSymCipher_Update(encCtx, (Crypto_DataBlob *)&msgBlob, &encData);
94. if (ret != CRYPTO_SUCCESS) {
95. goto end;
96. }
97. memcpy(&cipherText[cipherLen], encData.data, encData.len);
98. cipherLen += encData.len;
99. }
100. ret = OH_CryptoSymCipher_Final(encCtx, nullptr, &tag);
101. if (ret != CRYPTO_SUCCESS) {
102. goto end;
103. }

105. // 解密。
106. cipherBlob = {.data = reinterpret_cast<uint8_t *>(cipherText), .len = (size_t)cipherLen};
107. ret = OH_CryptoSymCipher_Create("AES128|GCM|PKCS7", &decCtx);
108. if (ret != CRYPTO_SUCCESS) {
109. goto end;
110. }
111. ret = OH_CryptoSymCipherParams_SetParam(params, CRYPTO_TAG_DATABLOB, &tag);
112. if (ret != CRYPTO_SUCCESS) {
113. goto end;
114. }
115. ret = OH_CryptoSymCipher_Init(decCtx, CRYPTO_DECRYPT_MODE, keyCtx, params);
116. if (ret != CRYPTO_SUCCESS) {
117. goto end;
118. }
119. for (int i = 0; i < decCnt; i++) {
120. cipherBlob.len = blockSize;
121. ret = OH_CryptoSymCipher_Update(decCtx, &cipherBlob, &decData);
122. if (ret != CRYPTO_SUCCESS) {
123. goto end;
124. }
125. cipherBlob.data += blockSize;
126. memcpy(&plantText[plantLen], decData.data, decData.len);
127. plantLen += decData.len;
128. }
129. if (decRem > 0) {
130. cipherBlob.len = decRem;
131. ret = OH_CryptoSymCipher_Update(decCtx, &cipherBlob, &decData);
132. if (ret != CRYPTO_SUCCESS) {
133. goto end;
134. }
135. memcpy(&plantText[plantLen], decData.data, decData.len);
136. plantLen += decData.len;
137. }
138. ret = OH_CryptoSymCipher_Final(decCtx, nullptr, &decData);
139. if (ret != CRYPTO_SUCCESS) {
140. goto end;
141. }

143. end:
144. OH_CryptoSymCipherParams_Destroy(params);
145. OH_CryptoSymCipher_Destroy(encCtx);
146. OH_CryptoSymCipher_Destroy(decCtx);
147. OH_CryptoSymKeyGenerator_Destroy(genCtx);
148. OH_CryptoSymKey_Destroy(keyCtx);
149. OH_Crypto_FreeDataBlob(&encData);
150. OH_Crypto_FreeDataBlob(&tag);
151. OH_Crypto_FreeDataBlob(&decData);
152. return ret;
153. }
```