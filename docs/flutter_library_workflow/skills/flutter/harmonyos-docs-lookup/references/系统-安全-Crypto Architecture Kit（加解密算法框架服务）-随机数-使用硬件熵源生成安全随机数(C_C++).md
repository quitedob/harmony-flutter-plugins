从API version 21开始，可以选择使用硬件熵源生成安全随机数。

随机数主要用于临时会话密钥生成和非对称加密算法密钥生成等场景。在加解密场景中，安全随机数生成器需要具备随机性、不可预测性和不可重现性。

使用更安全的熵源，对随机数而言，就意味着 “结果难以被猜测或复现”，是 “真随机性” 的量化体现。

当前硬件熵源通过调用[HUKS](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-overview)接口实现。

开发者可以调用接口，完成以下具体功能：

* 生成指定长度的安全随机数，并将其用于生成对应的密钥。
* 开启硬件熵源。
* 指定随机种子，生成一系列的随机序列。

在开发前，开发者应该先对加解密基础知识有一定了解，并熟知以下随机数相关的基本概念：

* **内部状态**

  代表随机数生成器内存中的数值，当内部状态相同时，随机数生成器会生成固定的随机数序列。
* **随机种子**

  一个用来对伪随机数的内部状态进行初始化的数据，随机数生成器通过种子来生成一系列的随机序列。

  当前OpenSSL实现方式，随机数生成器内部状态是不断变化的，即使设置相同的种子，生成的随机数序列也不会相同。

## 支持的算法与规格

安全随机数生成，设置硬件熵源之后，使用OpenSSL的RAND\_priv\_bytes接口生成。

展开

| 算法 | 长度（Byte） |
| --- | --- |
| CTR\_DRBG | [1, INT\_MAX] |

## 开发步骤

1. 调用[OH\_CryptoRand\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-rand-h#oh_cryptorand_create)，创建随机数生成器。
2. 调用[OH\_CryptoRand\_EnableHardwareEntropy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-rand-h#oh_cryptorand_enablehardwareentropy)，开启硬件熵源。
3. （可选）调用[OH\_CryptoRand\_SetSeed](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-rand-h#oh_cryptorand_setseed)，为随机数生成器设置种子。
4. 调用[OH\_CryptoRand\_GenerateRandom](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-rand-h#oh_cryptorand_generaterandom)，生成指定长度的安全随机数。指定字节长度范围为1~INT\_MAX。
5. 调用[OH\_CryptoRand\_GetAlgoName](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-rand-h#oh_cryptorand_getalgoname)，获取随机数生成器使用的算法名称。

收起

自动换行

深色代码主题

复制

```
1. #include "CryptoArchitectureKit/crypto_architecture_kit.h"
2. #include <stdio.h>

4. static OH_Crypto_ErrCode doTestRandomNumber()
5. {
6. // 创建随机数生成器。
7. OH_CryptoRand *rand = nullptr;
8. OH_Crypto_ErrCode ret = OH_CryptoRand_Create(&rand);
9. if (ret != CRYPTO_SUCCESS) {
10. return ret;
11. }

13. // 开启硬件熵源。
14. ret = OH_CryptoRand_EnableHardwareEntropy(rand);
15. if (ret != CRYPTO_SUCCESS) {
16. OH_CryptoRand_Destroy(rand);
17. return ret;
18. }

20. // 设置随机种子（可选）。
21. uint8_t seedData[12] = {0x25, 0x65, 0x58, 0x89, 0x85, 0x55, 0x66, 0x77, 0x88, 0x99, 0x11, 0x22};
22. Crypto_DataBlob seed = {
23. .data = seedData,
24. .len = sizeof(seedData)
25. };
26. ret = OH_CryptoRand_SetSeed(rand, &seed);
27. if (ret != CRYPTO_SUCCESS) {
28. OH_CryptoRand_Destroy(rand);
29. return ret;
30. }

32. // 生成指定长度的随机数。
33. Crypto_DataBlob out = {0};
34. uint32_t randomLength = 24; // 生成24字节的随机数。
35. ret = OH_CryptoRand_GenerateRandom(rand, randomLength, &out);
36. if (ret != CRYPTO_SUCCESS) {
37. OH_CryptoRand_Destroy(rand);
38. return ret;
39. }

41. // 获取并打印随机数生成器的算法名称。
42. const char *algoName = OH_CryptoRand_GetAlgoName(rand);
43. if (algoName != nullptr) {
44. printf("Random number generator algorithm: %s\n", algoName);
45. }

47. printf("Generated random number length: %u\n", out.len);

49. // 清理资源。
50. OH_Crypto_FreeDataBlob(&out);
51. OH_CryptoRand_Destroy(rand);
52. return CRYPTO_SUCCESS;
53. }
```