对应的算法规格请查看[消息摘要计算算法规格](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-generate-message-digest-overview#支持的算法与规格)。

## 在CMake脚本中链接相关动态库

收起

自动换行

深色代码主题

复制

```
1. target_link_libraries(entry PUBLIC libohcrypto.so)
```

## 开发步骤

在调用update接口传入数据时，可以[一次性传入所有数据](/consumer/cn/doc/harmonyos-guides/crypto-generate-message-digest-md5-ndk#摘要算法一次性传入)，也可以把数据人工分段，然后[分段update](/consumer/cn/doc/harmonyos-guides/crypto-generate-message-digest-md5-ndk#分段摘要算法)。对于同一段数据而言，计算结果没有差异。对于数据量较大的数据，开发者可以根据实际需求选择是否分段传入。

下面分别提供两种方式的示例代码。

### 摘要算法（一次性传入）

1. 调用[OH\_CryptoDigest\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-digest-h#oh_cryptodigest_create)，指定摘要算法MD5，生成摘要实例（OH\_CryptoDigest）。
2. 调用[OH\_CryptoDigest\_Update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-digest-h#oh_cryptodigest_update)，传入自定义消息，进行摘要更新计算。单次update长度没有限制。
3. 调用[OH\_CryptoDigest\_Final](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-digest-h#oh_cryptodigest_final)，获取摘要计算结果。
4. 调用[OH\_CryptoDigest\_GetLength](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-digest-h#oh_cryptodigest_getlength)，获取摘要计算长度，单位为字节。
5. 调用[OH\_DigestCrypto\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-digest-h#oh_digestcrypto_destroy)，销毁摘要实例（OH\_CryptoDigest）。

以下使用单次传入数据，获取摘要计算结果为例：

收起

自动换行

深色代码主题

复制

```
1. #include "CryptoArchitectureKit/crypto_common.h"
2. #include "CryptoArchitectureKit/crypto_digest.h"
3. #include <string.h>

5. static OH_Crypto_ErrCode doTestMd()
6. {
7. OH_Crypto_ErrCode ret;
8. OH_CryptoDigest *ctx = nullptr;
9. char *testData = const_cast<char *>("0123456789");
10. Crypto_DataBlob in = {.data = (uint8_t *)(testData), .len = strlen(testData)};
11. Crypto_DataBlob out = {.data = nullptr, .len = 0};
12. int mdLen = 0;
13. ret = OH_CryptoDigest_Create("MD5", &ctx);
14. if (ret != CRYPTO_SUCCESS) {
15. return ret;
16. }
17. do {
18. ret = OH_CryptoDigest_Update(ctx, &in);
19. if (ret != CRYPTO_SUCCESS) {
20. break;
21. }
22. ret = OH_CryptoDigest_Final(ctx, &out);
23. if (ret != CRYPTO_SUCCESS) {
24. break;
25. }
26. mdLen = OH_CryptoDigest_GetLength(ctx);
27. } while (0);
28. OH_Crypto_FreeDataBlob(&out);
29. OH_DigestCrypto_Destroy(ctx);
30. return ret;
31. }
```

### 分段摘要算法

1. 调用[OH\_CryptoDigest\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-digest-h#oh_cryptodigest_create)，指定摘要算法MD5，生成摘要实例（OH\_CryptoDigest）。
2. 传入自定义消息，将一次传入数据量设置为20字节，多次调用[OH\_CryptoDigest\_Update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-digest-h#oh_cryptodigest_update)，进行摘要更新计算。
3. 调用[OH\_CryptoDigest\_Final](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-digest-h#oh_cryptodigest_final)，获取摘要计算结果。
4. 调用[OH\_CryptoDigest\_GetLength](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-digest-h#oh_cryptodigest_getlength)，获取摘要计算长度，单位为字节。
5. 调用[OH\_DigestCrypto\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-digest-h#oh_digestcrypto_destroy)，销毁摘要实例（OH\_CryptoDigest）。

* 以下使用分段传入数据，获取摘要计算结果为例：

收起

自动换行

深色代码主题

复制

```
1. #include <stdlib.h>
2. #include "CryptoArchitectureKit/crypto_common.h"
3. #include "CryptoArchitectureKit/crypto_digest.h"
4. #define OH_CRYPTO_DIGEST_DATA_MAX (1024 * 1024 * 100)

6. static OH_Crypto_ErrCode doLoopMd()
7. {
8. OH_Crypto_ErrCode ret;
9. OH_CryptoDigest *ctx = nullptr;
10. uint8_t *testData = (uint8_t *)malloc(OH_CRYPTO_DIGEST_DATA_MAX);
11. if (testData == nullptr) {
12. return CRYPTO_MEMORY_ERROR;
13. }
14. Crypto_DataBlob out = {.data = nullptr, .len = 0};
15. int mdLen = 0;
16. int isBlockSize = 20;
17. int offset = 0;

19. ret = OH_CryptoDigest_Create("MD5", &ctx);
20. if (ret != CRYPTO_SUCCESS) {
21. free(testData);
22. return ret;
23. }
24. do {
25. for (int i = 0; i < 640 / isBlockSize; i++) {
26. Crypto_DataBlob in = {.data = reinterpret_cast<uint8_t *>(testData + offset),
27. .len = static_cast<size_t>(isBlockSize)};
28. ret = OH_CryptoDigest_Update(ctx, &in);
29. if (ret != CRYPTO_SUCCESS) {
30. break;
31. }
32. offset += isBlockSize;
33. }
34. ret = OH_CryptoDigest_Final(ctx, &out);
35. if (ret != CRYPTO_SUCCESS) {
36. break;
37. }
38. mdLen = OH_CryptoDigest_GetLength(ctx);
39. } while (0);
40. OH_Crypto_FreeDataBlob(&out);
41. OH_DigestCrypto_Destroy(ctx);
42. free(testData);
43. return ret;
44. }
```