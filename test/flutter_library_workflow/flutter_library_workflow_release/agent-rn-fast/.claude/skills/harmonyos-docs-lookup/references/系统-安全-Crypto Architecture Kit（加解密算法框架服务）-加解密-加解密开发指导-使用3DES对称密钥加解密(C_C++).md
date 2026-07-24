对应的算法规格请查看[对称密钥加解密算法规格：3DES](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sym-encrypt-decrypt-spec#section3des)。

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

调用[OH\_CryptoSymKeyGenerator\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-key-h#oh_cryptosymkeygenerator_create)、[OH\_CryptoSymKeyGenerator\_Generate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-key-h#oh_cryptosymkeygenerator_generate)，生成密钥算法为3DES、密钥长度为192位的对称密钥（OH\_CryptoSymKey）。

如何生成3DES对称密钥，开发者可参考下文示例，并结合[对称密钥生成和转换规格：3DES](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sym-key-generation-conversion-spec#section3des)和[指定二进制数据转换对称密钥](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-convert-binary-data-to-sym-key-ndk)理解，参考文档与当前示例可能存在入参差异，请注意区分。

**加密**

1. 调用[OH\_CryptoSymCipher\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_create)，指定字符串参数'3DES192|ECB|PKCS7'，创建对称密钥类型为3DES192、分组模式为ECB、填充模式为PKCS7的Cipher实例，用于完成加密操作。
2. 调用[OH\_CryptoSymCipher\_Init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_init)，设置模式为加密（CRYPTO\_ENCRYPT\_MODE），指定加密密钥（OH\_CryptoSymKey），初始化加密Cipher实例。

   ECB模式无加密参数，params直接传入null。
3. 调用[OH\_CryptoSymCipher\_Update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_update)，更新数据（明文）。

   * 当数据量较小时，可以在init完成后直接调用final。
   * 当数据量较大时，可以多次调用update，即分段加密。
4. 调用[OH\_CryptoSymCipher\_Final](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_final)，获取加密后的数据。

   * 如果使用update接口传入数据，此处data传入null。如果使用final接口传入数据，此处data传入明文数据。
   * final输出结果可能为null，在访问具体数据前，需要先判断结果是否为null，避免产生异常。

**解密**

1. 调用[OH\_CryptoSymCipher\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_create)，指定字符串参数'3DES192|ECB|PKCS7'，创建对称密钥类型为3DES192、分组模式为ECB、填充模式为PKCS7的Cipher实例，用于完成解密操作。
2. 调用[OH\_CryptoSymCipher\_Init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_init)，设置模式为解密（CRYPTO\_DECRYPT\_MODE），指定解密密钥（OH\_CryptoSymKey），初始化解密Cipher实例。ECB模式无加密参数，传入null。
3. 调用[OH\_CryptoSymCipher\_Update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_update)，更新数据（密文）。

   * 当数据量较小时，可以在init完成后直接调用final。
   * 当数据量较大时，可以多次调用update，即分段解密。
   * 用户可以根据数据量大小自行决定操作方式。例如，当数据量超过20时，使用 update。
4. 调用[OH\_CryptoSymCipher\_Final](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_final)，获取解密数据。

   * 如果使用update接口传入数据，此处data传入null。如果使用final接口传入数据，此处data传入密文数据。
   * final输出结果可能为null，在访问具体数据前，需要先判断结果是否为null，避免产生异常。

**销毁对象**

调用[OH\_CryptoSymKeyGenerator\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-key-h#oh_cryptosymkeygenerator_destroy)、[OH\_CryptoSymCipher\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-cipher-h#oh_cryptosymcipher_destroy)、[OH\_CryptoSymKey\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-sym-key-h#oh_cryptosymkey_destroy)、[OH\_Crypto\_FreeDataBlob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-common-h#oh_crypto_freedatablob)释放申请的内存，销毁对象。

## 开发示例

当前示例以ECB分组模式为例，不需要设置加解密参数。

如果使用CBC、CTR、OFB、CFB分组模式，需设置加解密参数IV。请参考[设置加解密参数IV](/consumer/cn/doc/harmonyos-guides/crypto-3des-sym-encrypt-decrypt-ecb-ndk#设置加解密参数iv)，无论加密还是解密，在生成和初始化Cipher实例时均需修改相关参数。

收起

自动换行

深色代码主题

复制

```
1. #include "CryptoArchitectureKit/crypto_common.h"
2. #include "CryptoArchitectureKit/crypto_sym_cipher.h"
3. #include <string.h>

5. static OH_Crypto_ErrCode doTest3DesEcb()
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
18. ret = OH_CryptoSymKeyGenerator_Create("3DES192", &genCtx);
19. if (ret != CRYPTO_SUCCESS) {
20. goto end;
21. }
22. ret = OH_CryptoSymKeyGenerator_Generate(genCtx, &keyCtx);
23. if (ret != CRYPTO_SUCCESS) {
24. goto end;
25. }

27. // 加密操作。
28. ret = OH_CryptoSymCipher_Create("3DES192|ECB|PKCS7", &encCtx);
29. if (ret != CRYPTO_SUCCESS) {
30. goto end;
31. }
32. // 如果是CBC、CTR、OFB、CFB分段模式，此处需要修改为对应模式并添加加解密参数IV。
33. ret = OH_CryptoSymCipher_Init(encCtx, CRYPTO_ENCRYPT_MODE, keyCtx, nullptr);
34. if (ret != CRYPTO_SUCCESS) {
35. goto end;
36. }
37. ret = OH_CryptoSymCipher_Final(encCtx, &input, &encData);
38. if (ret != CRYPTO_SUCCESS) {
39. goto end;
40. }

42. // 解密操作。
43. ret = OH_CryptoSymCipher_Create("3DES192|ECB|PKCS7", &decCtx);
44. if (ret != CRYPTO_SUCCESS) {
45. goto end;
46. }
47. // 如果是CBC、CTR、OFB、CFB分段模式，此处需要修改为对应模式并添加加解密参数IV。
48. ret = OH_CryptoSymCipher_Init(decCtx, CRYPTO_DECRYPT_MODE, keyCtx, nullptr);
49. if (ret != CRYPTO_SUCCESS) {
50. goto end;
51. }
52. ret = OH_CryptoSymCipher_Final(decCtx, &encData, &decData);
53. if (ret != CRYPTO_SUCCESS) {
54. goto end;
55. }

57. end:
58. OH_CryptoSymCipher_Destroy(encCtx);
59. OH_CryptoSymCipher_Destroy(decCtx);
60. OH_CryptoSymKeyGenerator_Destroy(genCtx);
61. OH_CryptoSymKey_Destroy(keyCtx);
62. OH_Crypto_FreeDataBlob(&encData);
63. OH_Crypto_FreeDataBlob(&decData);
64. return ret;
65. }
```

### 设置加解密参数IV

下述示例为CBC分组模式，需要设置加解密参数IV。

如果分组模式为CBC、CTR、OFB或CFB，需参考如下设置IV。ECB模式无需设置加解密参数。

收起

自动换行

深色代码主题

复制

```
1. OH_CryptoSymCipherParams *params = nullptr;
2. uint8_t iv[8] = {1, 2, 4, 12, 3, 4, 2, 3}; // 示例代码iv值，开发者可使用安全随机数生成。
3. Crypto_DataBlob ivBlob = {.data = iv, .len = sizeof(iv)};

5. ret = OH_CryptoSymCipherParams_Create(&params);
6. if (ret != CRYPTO_SUCCESS) {
7. goto end;
8. }
9. // 设置参数。
10. ret = OH_CryptoSymCipherParams_SetParam(params, CRYPTO_IV_DATABLOB, &ivBlob); // CBC模式只需要设置iv。
11. if (ret != CRYPTO_SUCCESS) {
12. goto end;
13. }

15. // 加密。
16. ret = OH_CryptoSymCipher_Create("3DES192|CBC|PKCS7", &encCtx);
17. if (ret != CRYPTO_SUCCESS) {
18. goto end;
19. }
20. ret = OH_CryptoSymCipher_Init(encCtx, CRYPTO_ENCRYPT_MODE, keyCtx, params);
21. if (ret != CRYPTO_SUCCESS) {
22. goto end;
23. }
24. // 本段代码只展示CBC、CTR、OFB、CFB分段模式的不同，其他流程请参考开发示例。
```