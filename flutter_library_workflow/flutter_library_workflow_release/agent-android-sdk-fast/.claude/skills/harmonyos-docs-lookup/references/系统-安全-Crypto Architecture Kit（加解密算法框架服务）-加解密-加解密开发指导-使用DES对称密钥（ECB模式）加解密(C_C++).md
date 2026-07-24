对应的算法规格请查看[对称密钥加解密算法规格：DES](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sym-encrypt-decrypt-spec#des)。

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

调用[OH\_CryptoSymKeyGenerator\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-key-h#oh_cryptosymkeygenerator_create)、[OH\_CryptoSymKeyGenerator\_Generate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-key-h#oh_cryptosymkeygenerator_generate)，生成密钥算法为DES、密钥长度为64位的对称密钥（OH\_CryptoSymKey）。

如何生成DES对称密钥，开发者可参考下文示例，并结合[对称密钥生成和转换规格：DES](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sym-key-generation-conversion-spec#des)和[指定二进制数据转换对称密钥](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-convert-binary-data-to-sym-key-ndk)理解，参考文档与当前示例可能存在入参差异，请在阅读时注意区分。

**加密**

1. 调用[OH\_CryptoSymCipher\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_create)，指定字符串参数'DES64|ECB|PKCS7'，创建对称密钥类型为DES64、分组模式为ECB、填充模式为PKCS7的Cipher实例，用于完成加密操作。
2. 调用[OH\_CryptoSymCipher\_Init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_init)，设置模式为加密（CRYPTO\_ENCRYPT\_MODE），指定加密密钥（OH\_CryptoSymKey），初始化加密Cipher实例。

   ECB模式无加密参数，params直接传入null。
3. 调用[OH\_CryptoSymCipher\_Update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_update)，更新数据（明文）。

   * 当数据量较小时，可以在init完成后直接调用final。
   * 当数据量较大时，可以多次调用update，即分段加密。
4. 调用[OH\_CryptoSymCipher\_Final](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_final)，获取加密后的数据。

   * 如果使用update接口传入数据，此处data传入null。如果使用final接口传入数据，此处data传入明文数据。
   * final输出结果可能为null，在访问具体数据前，需要先判断结果是否为null，避免产生异常。

**解密**

1. 调用[OH\_CryptoSymCipher\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_create)，指定字符串参数'DES64|ECB|PKCS7'，创建对称密钥类型为DES64、分组模式为ECB、填充模式为PKCS7的Cipher实例，用于完成解密操作。
2. 调用[OH\_CryptoSymCipher\_Init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_init)，设置模式为解密（CRYPTO\_DECRYPT\_MODE），指定解密密钥（OH\_CryptoSymKey）初始化解密Cipher实例。ECB模式无加密参数，直接传入null。
3. 调用[OH\_CryptoSymCipher\_Update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_update)，更新数据（密文）。

   * 当数据量较小时，可以在init完成后直接调用final。
   * 当数据量较大时，可以多次调用update，即分段解密。
   * 数据量大小可以使用者自行决定。比如大于20字节使用update。
4. 调用[OH\_CryptoSymCipher\_Final](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_final)，获取解密后的数据。

   * 如果使用update接口传入数据，此处data传入null。如果使用final接口传入数据，此处data传入密文数据。
   * final输出结果可能为null，在访问具体数据前，需要先判断结果是否为null，避免产生异常。

**销毁对象**

调用[OH\_CryptoSymKeyGenerator\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-key-h#oh_cryptosymkeygenerator_destroy)、[OH\_CryptoSymCipher\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_destroy)、[OH\_CryptoSymKey\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-key-h#oh_cryptosymkey_destroy)、[OH\_Crypto\_FreeDataBlob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-common-h#oh_crypto_freedatablob)释放申请的内存，销毁对象。

收起

自动换行

深色代码主题

复制

```
1. #include "CryptoArchitectureKit/crypto_common.h"
2. #include "CryptoArchitectureKit/crypto_sym_cipher.h"
3. #include <string.h>

5. static OH_Crypto_ErrCode doTestDesEcb()
6. {
7. OH_CryptoSymKeyGenerator *genCtx = nullptr;
8. OH_CryptoSymCipher *encCtx = nullptr;
9. OH_CryptoSymCipher *decCtx = nullptr;
10. OH_CryptoSymKey *keyCtx = nullptr;
11. char *plainText = const_cast<char *>("this is test!");
12. Crypto_DataBlob input = {.data = (uint8_t *)(plainText), .len = strlen(plainText)};
13. Crypto_DataBlob encData = {.data = nullptr, .len = 0};
14. Crypto_DataBlob decData = {.data = nullptr, .len = 0};

16. // 随机生成对称密钥。
17. OH_Crypto_ErrCode ret;
18. ret = OH_CryptoSymKeyGenerator_Create("DES64", &genCtx);
19. if (ret != CRYPTO_SUCCESS) {
20. goto end;
21. }
22. ret = OH_CryptoSymKeyGenerator_Generate(genCtx, &keyCtx);
23. if (ret != CRYPTO_SUCCESS) {
24. goto end;
25. }

27. // 加密操作。
28. ret = OH_CryptoSymCipher_Create("DES64|ECB|PKCS7", &encCtx);
29. if (ret != CRYPTO_SUCCESS) {
30. goto end;
31. }
32. ret = OH_CryptoSymCipher_Init(encCtx, CRYPTO_ENCRYPT_MODE, keyCtx, nullptr);
33. if (ret != CRYPTO_SUCCESS) {
34. goto end;
35. }
36. ret = OH_CryptoSymCipher_Final(encCtx, &input, &encData);
37. if (ret != CRYPTO_SUCCESS) {
38. goto end;
39. }

41. // 解密操作。
42. ret = OH_CryptoSymCipher_Create("DES64|ECB|PKCS7", &decCtx);
43. if (ret != CRYPTO_SUCCESS) {
44. goto end;
45. }
46. ret = OH_CryptoSymCipher_Init(decCtx, CRYPTO_DECRYPT_MODE, keyCtx, nullptr);
47. if (ret != CRYPTO_SUCCESS) {
48. goto end;
49. }
50. ret = OH_CryptoSymCipher_Final(decCtx, &encData, &decData);
51. if (ret != CRYPTO_SUCCESS) {
52. goto end;
53. }

55. end:
56. OH_CryptoSymCipher_Destroy(encCtx);
57. OH_CryptoSymCipher_Destroy(decCtx);
58. OH_CryptoSymKeyGenerator_Destroy(genCtx);
59. OH_CryptoSymKey_Destroy(keyCtx);
60. OH_Crypto_FreeDataBlob(&encData);
61. OH_Crypto_FreeDataBlob(&decData);
62. return ret;
63. }
```