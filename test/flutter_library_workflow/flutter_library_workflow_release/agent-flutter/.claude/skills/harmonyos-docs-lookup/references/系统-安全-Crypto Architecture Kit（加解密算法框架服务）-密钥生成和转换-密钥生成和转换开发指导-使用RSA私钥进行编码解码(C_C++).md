**编码**

1. 调用[OH\_CryptoAsymKeyGenerator\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeygenerator_create)、[OH\_CryptoAsymKeyGenerator\_Generate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeygenerator_generate)，生成RSA密钥类型为RSA2048、素数个数为2的非对称密钥对（keyPair）。keyPair对象中包括公钥PubKey、私钥PriKey。

   如何生成RSA非对称密钥对，开发者可参考下文示例，并结合[非对称密钥生成和转换规格：RSA](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-asym-key-generation-conversion-spec#rsa)和[随机生成非对称密钥对(C/C++)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-generate-asym-key-pair-randomly-ndk)理解。参考文档与当前示例可能存在入参差异，请在阅读时注意区分。
2. 调用[OH\_CryptoPrivKeyEncodingParams\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoprivkeyencodingparams_create)创建参数对象（params），并通过[OH\_CryptoPrivKeyEncodingParams\_SetParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoprivkeyencodingparams_setparam)设置加密算法和密码。
3. 调用[OH\_CryptoPrivKey\_Encode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoprivkey_encode)，传入参数CRYPTO\_PEM/CRYPTO\_DER、PKCS1/PKCS8和参数对象（params）生成编码后的私钥字符串。

**解码**

1. 调用[OH\_CryptoAsymKeyGenerator\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeygenerator_create)生成RSA非对称密钥生成器keyGen。

   如何生成RSA非对称密钥对，开发者可参考下文示例，并结合[非对称密钥生成和转换规格：RSA](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-asym-key-generation-conversion-spec#rsa)。
2. 调用[OH\_CryptoAsymKeyGenerator\_SetPassword]，传入编码后的私钥字符串与编码口令。
3. 调用[OH\_CryptoAsymKeyGenerator\_Convert]，传入参数CRYPTO\_PEM和编码后的私钥字符串，返回RSA密钥对。

* 编码示例：

收起

自动换行

深色代码主题

复制

```
1. #include "CryptoArchitectureKit/crypto_architecture_kit.h"

3. static OH_Crypto_ErrCode doTestPriKeyPkcs1Encoded()
4. {
5. OH_CryptoAsymKeyGenerator *keyGen = nullptr;
6. OH_Crypto_ErrCode ret = OH_CryptoAsymKeyGenerator_Create("RSA2048", &keyGen);
7. if (ret != CRYPTO_SUCCESS) {
8. return ret;
9. }
10. OH_CryptoKeyPair *keyPair = nullptr;
11. ret = OH_CryptoAsymKeyGenerator_Generate(keyGen, &keyPair);
12. if (ret != CRYPTO_SUCCESS) {
13. OH_CryptoAsymKeyGenerator_Destroy(keyGen);
14. return ret;
15. }

17. OH_CryptoPrivKey *privKey = OH_CryptoKeyPair_GetPrivKey(keyPair);
18. if (privKey == nullptr) {
19. OH_CryptoKeyPair_Destroy(keyPair);
20. OH_CryptoAsymKeyGenerator_Destroy(keyGen);
21. return CRYPTO_OPERTION_ERROR;
22. }
23. OH_CryptoPrivKeyEncodingParams *params = nullptr;
24. ret = OH_CryptoPrivKeyEncodingParams_Create(&params);
25. if (ret != CRYPTO_SUCCESS) {
26. OH_CryptoKeyPair_Destroy(keyPair);
27. OH_CryptoAsymKeyGenerator_Destroy(keyGen);
28. return ret;
29. }

31. Crypto_DataBlob password = {(uint8_t *)"1234567890", 10};
32. Crypto_DataBlob cipher = {(uint8_t *)"AES-128-CBC", 11};
33. ret = OH_CryptoPrivKeyEncodingParams_SetParam(params, CRYPTO_PRIVATE_KEY_ENCODING_PASSWORD_STR, &password);
34. if (ret != CRYPTO_SUCCESS) {
35. OH_CryptoPrivKeyEncodingParams_Destroy(params);
36. OH_CryptoKeyPair_Destroy(keyPair);
37. OH_CryptoAsymKeyGenerator_Destroy(keyGen);
38. return ret;
39. }
40. ret = OH_CryptoPrivKeyEncodingParams_SetParam(params, CRYPTO_PRIVATE_KEY_ENCODING_SYMMETRIC_CIPHER_STR, &cipher);
41. if (ret != CRYPTO_SUCCESS) {
42. OH_CryptoPrivKeyEncodingParams_Destroy(params);
43. OH_CryptoKeyPair_Destroy(keyPair);
44. OH_CryptoAsymKeyGenerator_Destroy(keyGen);
45. return ret;
46. }

48. Crypto_DataBlob pemData = {0};
49. ret = OH_CryptoPrivKey_Encode(privKey, CRYPTO_PEM, "PKCS1", params, &pemData);
50. if (ret != CRYPTO_SUCCESS) {
51. OH_CryptoPrivKeyEncodingParams_Destroy(params);
52. OH_CryptoKeyPair_Destroy(keyPair);
53. OH_CryptoAsymKeyGenerator_Destroy(keyGen);
54. return ret;
55. }
56. OH_Crypto_FreeDataBlob(&pemData);
57. OH_CryptoPrivKeyEncodingParams_Destroy(params);
58. OH_CryptoKeyPair_Destroy(keyPair);
59. OH_CryptoAsymKeyGenerator_Destroy(keyGen);
60. return ret;
61. }
```

* 解码示例：

收起

自动换行

深色代码主题

复制

```
1. #include "CryptoArchitectureKit/crypto_architecture_kit.h"
2. #include <string>

4. static OH_Crypto_ErrCode doTestConvertPemKeyByPromise()
5. {
6. std::string priKeyPkcs1EncodingStr = "-----BEGIN RSA PRIVATE KEY-----\n"
7. "Proc-Type: 4,ENCRYPTED\n"
8. "DEK-Info: AES-128-CBC,815A066131BF05CF87CE610A59CC69AE\n\n"
9. "7Jd0vmOmYGFZ2yRY8fqRl3+6rQlFtNcMILvcb5KWHDSrxA0ULmJE7CW0DSRikHoA\n"
10. "t0KgafhYXeQXh0dRy9lvVRAFSLHCLJVjchx90V7ZSivBFEq7+iTozVp4AlbgYsJP\n"
11. "vx/1sfZD2WAcyMJ7IDmJyft7xnpVSXsyWGTT4f3eaHJIh1dqjwrso7ucAW0FK6rp\n"
12. "/TONyOoXNfXtRbVtxNyCWBxt4HCSclDZFvS9y8fz9ZwmCUV7jei/YdzyQI2wnE13\n"
13. "W8cKlpzRFL6BWi8XPrUtAw5MWeHBAPUgPWMfcmiaeyi5BJFhQCrHLi+Gj4EEJvp7\n"
14. "mP5cbnQAx6+paV5z9m71SKrI/WSc4ixsYYdVmlL/qwAK9YliFfoPl030YJWW6rFf\n"
15. "T7J9BUlHGUJ0RB2lURNNLakM+UZRkeE9TByzCzgTxuQtyv5Lwsh2mAk3ia5x0kUO\n"
16. "LHg3Eoabhdh+YZA5hHaxnpF7VjspB78E0F9Btq+A41rSJ6zDOdToHey4MJ2nxdey\n"
17. "Z3bi81TZ6Fp4IuROrvZ2B/Xl3uNKR7n+AHRKnaAO87ywzyltvjwSh2y3xhJueiRs\n"
18. "BiYkyL3/fnocD3pexTdN6h3JgQGgO5GV8zw/NrxA85mw8o9im0HreuFObmNj36T9\n"
19. "k5N+R/QIXW83cIQOLaWK1ThYcluytf0tDRiMoKqULiaA6HvDMigExLxuhCtnoF8I\n"
20. "iOLN1cPdEVQjzwDHLqXP2DbWW1z9iRepLZlEm1hLRLEmOrTGKezYupVv306SSa6J\n"
21. "OA55lAeXMbyjFaYCr54HWrpt4NwNBX1efMUURc+1LcHpzFrBTTLbfjIyq6as49pH\n"
22. "-----END RSA PRIVATE KEY-----\n";

24. OH_CryptoAsymKeyGenerator *keyGen = nullptr;
25. OH_Crypto_ErrCode ret = OH_CryptoAsymKeyGenerator_Create("RSA2048", &keyGen);
26. if (ret != CRYPTO_SUCCESS) {
27. return ret;
28. }

30. OH_CryptoKeyPair *dupKeyPair = nullptr;
31. Crypto_DataBlob priKeyPkcs1EncodingData = {};
32. priKeyPkcs1EncodingData.data = reinterpret_cast<uint8_t *>(const_cast<char *>(priKeyPkcs1EncodingStr.c_str()));
33. priKeyPkcs1EncodingData.len = strlen(priKeyPkcs1EncodingStr.c_str());
34. std::string password = "123456";
35. ret = OH_CryptoAsymKeyGenerator_SetPassword(keyGen, reinterpret_cast<const unsigned char *>(password.c_str()),
36. password.size());
37. if (ret != CRYPTO_SUCCESS) {
38. OH_CryptoAsymKeyGenerator_Destroy(keyGen);
39. return ret;
40. }
41. ret = OH_CryptoAsymKeyGenerator_Convert(keyGen, CRYPTO_PEM, nullptr, &priKeyPkcs1EncodingData, &dupKeyPair);
42. if (ret != CRYPTO_SUCCESS) {
43. OH_CryptoAsymKeyGenerator_Destroy(keyGen);
44. return ret;
45. }
46. OH_CryptoKeyPair_Destroy(dupKeyPair);
47. OH_CryptoAsymKeyGenerator_Destroy(keyGen);
48. return ret;
49. }
```