当前支持DER格式与r、s格式互转的能力。

开发者可指定SM2密文的参数，将其转换成DER格式密文。反之，也可以从DER格式密文中提取出SM2的具体密文参数。

**指定密文参数，转换为DER格式**

1. 调用[OH\_CryptoEccSignatureSpec\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-signature-h#oh_cryptoeccsignaturespec_create)，创建[OH\_CryptoEccSignatureSpec](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptosignatureapi-oh-cryptoeccsignaturespec)对象，用于设置SM2密文参数。
2. 调用[OH\_CryptoEccSignatureSpec\_SetRAndS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-signature-h#oh_cryptoeccsignaturespec_setrands)，将R、S设置到OH\_CryptoEccSignatureSpec对象中。
3. 调用[OH\_CryptoEccSignatureSpec\_Encode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-signature-h#oh_cryptoeccsignaturespec_encode)得到转换后的DER格式的密文。
4. 调用[OH\_CryptoEccSignatureSpec\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-signature-h#oh_cryptoeccsignaturespec_destroy)释放对象。

收起

自动换行

深色代码主题

复制

```
1. #include "CryptoArchitectureKit/crypto_common.h"
2. #include "CryptoArchitectureKit/crypto_asym_key.h"
3. #include "CryptoArchitectureKit/crypto_signature.h"

5. static OH_Crypto_ErrCode doTestSm2DataChange()
6. {
7. static unsigned char g_rCoordinate[] = {
8. 107, 93,  198, 247, 119, 18,  40,  110, 90,  156, 193,
9. 158, 205, 113, 170, 128, 146, 109, 75,  17,  181, 109,
10. 110, 91,  149, 5,   110, 233, 209, 78,  229, 96};

12. static unsigned char g_sCoordinate[] = {
13. 45,  153, 88,  82,  104, 221, 226, 43,  174, 21,  122,
14. 248, 5,   232, 105, 41,  92,  95,  102, 224, 216, 149,
15. 85,  236, 110, 6,   64,  188, 149, 70,  70,  183};

17. // 由R和S生成DER格式的签名数据。
18. OH_CryptoEccSignatureSpec *spec = NULL;
19. Crypto_DataBlob r = {0};
20. Crypto_DataBlob s = {0};
21. r.data = g_rCoordinate;
22. r.len = sizeof(g_rCoordinate);
23. s.data = g_sCoordinate;
24. s.len = sizeof(g_sCoordinate);
25. OH_Crypto_ErrCode ret = OH_CryptoEccSignatureSpec_Create(NULL, &spec);
26. if (ret != CRYPTO_SUCCESS) {
27. OH_CryptoEccSignatureSpec_Destroy(spec);
28. return ret;
29. }
30. ret = OH_CryptoEccSignatureSpec_SetRAndS(spec, &r, &s);
31. if (ret != CRYPTO_SUCCESS) {
32. OH_CryptoEccSignatureSpec_Destroy(spec);
33. return ret;
34. }
35. Crypto_DataBlob sig = {0};
36. ret = OH_CryptoEccSignatureSpec_Encode(spec, &sig);
37. if (ret != CRYPTO_SUCCESS) {
38. OH_CryptoEccSignatureSpec_Destroy(spec);
39. return ret;
40. }
41. OH_Crypto_FreeDataBlob(&sig);
42. OH_CryptoEccSignatureSpec_Destroy(spec);
43. spec = NULL;
44. return CRYPTO_SUCCESS;

46. }
```

**指定DER格式，转换为r、s格式**

1. 调用[OH\_CryptoEccSignatureSpec\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-signature-h#oh_cryptoeccsignaturespec_create)传入签名数据，创建[OH\_CryptoEccSignatureSpec](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptosignatureapi-oh-cryptoeccsignaturespec)对象，用于获取转换后的数据。
2. 调用[OH\_CryptoEccSignatureSpec\_GetRAndS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-signature-h#oh_cryptoeccsignaturespec_getrands)拿到转换后的数据r、s。
3. 调用[OH\_CryptoEccSignatureSpec\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-signature-h#oh_cryptoeccsignaturespec_destroy)释放内存。

收起

自动换行

深色代码主题

复制

```
1. #include "CryptoArchitectureKit/crypto_common.h"
2. #include "CryptoArchitectureKit/crypto_asym_key.h"
3. #include "CryptoArchitectureKit/crypto_signature.h"

5. static OH_Crypto_ErrCode doSm2GetRS() {
6. uint8_t signText[] = {
7. 0x30, 0x45, 0x02, 0x21, 0x00, 0xab, 0xf8, 0xe2, 0x96, 0x7d, 0x5b, 0x28, 0xfb, 0x9a, 0xbd, 0x05, 0xa6,
8. 0x81, 0xd6, 0xb1, 0x55, 0x69, 0x22, 0x25, 0xd2, 0xa3, 0x5d, 0xa8, 0xc0, 0x96, 0xe0, 0x1d, 0x38, 0x74,
9. 0xa0, 0xc9, 0x4f, 0x02, 0x20, 0x20, 0x27, 0x04, 0x7a, 0x31, 0x94, 0xe7, 0x32, 0x61, 0xc3, 0x55, 0xa6,
10. 0x5e, 0x1e, 0xdd, 0x3d, 0x04, 0x1c, 0x1e, 0x2d, 0x8d, 0x8d, 0x45, 0xca, 0xd9, 0x40, 0xe8, 0x97, 0xcd,
11. 0x01, 0x18, 0xc5,
12. };
13. Crypto_DataBlob signBlob = {
14. .data = reinterpret_cast<uint8_t *>(signText),
15. .len = sizeof(signText)};

17. OH_CryptoEccSignatureSpec *eccSignSpec = nullptr;
18. OH_Crypto_ErrCode ret = OH_CryptoEccSignatureSpec_Create(&signBlob, &eccSignSpec);
19. if (ret != CRYPTO_SUCCESS) {
20. return ret;
21. }

23. Crypto_DataBlob r = {.data = nullptr, .len = 0};
24. Crypto_DataBlob s = {.data = nullptr, .len = 0};
25. ret = OH_CryptoEccSignatureSpec_GetRAndS(eccSignSpec, &r, &s);
26. if (ret != CRYPTO_SUCCESS) {
27. OH_CryptoEccSignatureSpec_Destroy(eccSignSpec);
28. return ret;
29. }
30. OH_Crypto_FreeDataBlob(&r);
31. OH_Crypto_FreeDataBlob(&s);
32. OH_CryptoEccSignatureSpec_Destroy(eccSignSpec);
33. return CRYPTO_SUCCESS;
34. }
```