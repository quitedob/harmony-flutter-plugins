从API 22开始，huksExternalCrypto提供Provider注册和注销功能接口。

## 注册Provider

### 在CMake脚本中链接相关动态库

收起

自动换行

深色代码主题

复制

```
1. target_link_libraries(entry PUBLIC libhuks_ndk.z.so libhuks_external_crypto.z.so)
```

### 开发步骤

1. 构造注册参数，需要传入[OH\_HUKS\_EXT\_CRYPTO\_TAG\_ABILITY\_NAME](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-huks-external-crypto-type-h#oh_huks_externalcryptotag)。
2. 调用注册接口[OH\_Huks\_RegisterProvider](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-huks-external-crypto-api-h#oh_huks_registerprovider)。

## 开发案例

收起

自动换行

深色代码主题

复制

```
1. #include "napi/native_api.h"
2. #include "huks/native_huks_api.h"
3. #include "huks/native_huks_type.h"
4. #include "huks/native_huks_param.h"
5. #include "huks/native_huks_external_crypto_api.h"
6. #include <cstring>

8. OH_Huks_Result InitParamSet(
9. struct OH_Huks_ExternalCryptoParamSet **paramSet,
10. const struct OH_Huks_ExternalCryptoParam *params,
11. uint32_t paramCount)
12. {
13. OH_Huks_Result ret = OH_Huks_InitExternalCryptoParamSet(paramSet);
14. if (ret.errorCode != OH_HUKS_SUCCESS) {
15. return ret;
16. }
17. ret = OH_Huks_AddExternalCryptoParams(*paramSet, params, paramCount);
18. if (ret.errorCode != OH_HUKS_SUCCESS) {
19. OH_Huks_FreeExternalCryptoParamSet(paramSet);
20. return ret;
21. }
22. ret = OH_Huks_BuildExternalCryptoParamSet(paramSet);
23. if (ret.errorCode != OH_HUKS_SUCCESS) {
24. OH_Huks_FreeExternalCryptoParamSet(paramSet);
25. return ret;
26. }
27. return ret;
28. }

30. static struct OH_Huks_Blob g_abilityName = {
31. (uint32_t)strlen("testAbility"),
32. (uint8_t *)"testAbility"
33. };

35. struct OH_Huks_Blob g_providerName = {
36. (uint32_t)strlen("testProviderName"),
37. (uint8_t *)"testProviderName"
38. };

40. static struct OH_Huks_ExternalCryptoParam g_abilityParams[] = {
41. {
42. .tag = OH_HUKS_EXT_CRYPTO_TAG_ABILITY_NAME,
43. .blob = g_abilityName
44. },
45. };

47. static napi_value registerProvider(napi_env env, napi_callback_info info)
48. {
49. struct OH_Huks_ExternalCryptoParamSet *providerParamSet = nullptr;
50. OH_Huks_Result ohResult;
51. do {
52. ohResult = InitParamSet(&providerParamSet, g_abilityParams,
53. sizeof(g_abilityParams) / sizeof(OH_Huks_ExternalCryptoParam));
54. if (ohResult.errorCode != OH_HUKS_SUCCESS) {
55. break;
56. }
57. ohResult = OH_Huks_RegisterProvider(&g_providerName, providerParamSet);
58. if (ohResult.errorCode != OH_HUKS_SUCCESS) {
59. break;
60. }
61. } while (0);
62. OH_Huks_FreeExternalCryptoParamSet(&providerParamSet);

64. napi_value ret;
65. napi_create_int32(env, ohResult.errorCode, &ret);
66. return ret;
67. }
```

## 注销Provider

### 在CMake脚本中链接相关动态库

收起

自动换行

深色代码主题

复制

```
1. target_link_libraries(entry PUBLIC libhuks_ndk.z.so libhuks_external_crypto.z.so)
```

### 开发步骤

1. 构造注销参数，注销单个ability需要传入[OH\_HUKS\_EXT\_CRYPTO\_TAG\_ABILITY\_NAME](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-huks-external-crypto-type-h#oh_huks_externalcryptotag)。批量注销不需要传入[OH\_HUKS\_EXT\_CRYPTO\_TAG\_ABILITY\_NAME](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-huks-external-crypto-type-h#oh_huks_externalcryptotag)。
2. 调用注销接口[OH\_Huks\_UnregisterProvider](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-huks-external-crypto-api-h#oh_huks_unregisterprovider)。

**注销单个ability**

收起

自动换行

深色代码主题

复制

```
1. #include "napi/native_api.h"
2. #include "huks/native_huks_api.h"
3. #include "huks/native_huks_type.h"
4. #include "huks/native_huks_param.h"
5. #include "huks/native_huks_external_crypto_api.h"
6. #include <cstring>

8. OH_Huks_Result InitParamSet(
9. struct OH_Huks_ExternalCryptoParamSet **paramSet,
10. const struct OH_Huks_ExternalCryptoParam *params,
11. uint32_t paramCount)
12. {
13. OH_Huks_Result ret = OH_Huks_InitExternalCryptoParamSet(paramSet);
14. if (ret.errorCode != OH_HUKS_SUCCESS) {
15. return ret;
16. }
17. ret = OH_Huks_AddExternalCryptoParams(*paramSet, params, paramCount);
18. if (ret.errorCode != OH_HUKS_SUCCESS) {
19. OH_Huks_FreeExternalCryptoParamSet(paramSet);
20. return ret;
21. }
22. ret = OH_Huks_BuildExternalCryptoParamSet(paramSet);
23. if (ret.errorCode != OH_HUKS_SUCCESS) {
24. OH_Huks_FreeExternalCryptoParamSet(paramSet);
25. return ret;
26. }
27. return ret;
28. }

30. static struct OH_Huks_Blob g_abilityName = {
31. (uint32_t)strlen("testAbility"),
32. (uint8_t *)"testAbility"
33. };

35. struct OH_Huks_Blob g_providerName = {
36. (uint32_t)strlen("testProviderName"),
37. (uint8_t *)"testProviderName"
38. };

40. static struct OH_Huks_ExternalCryptoParam g_abilityParams[] = {
41. {
42. .tag = OH_HUKS_EXT_CRYPTO_TAG_ABILITY_NAME,
43. .blob = g_abilityName
44. },
45. };

47. static napi_value unregisterProvider(napi_env env, napi_callback_info info)
48. {
49. struct OH_Huks_ExternalCryptoParamSet *providerParamSet = nullptr;
50. OH_Huks_Result ohResult;
51. do {
52. ohResult = InitParamSet(&providerParamSet, g_abilityParams,
53. sizeof(g_abilityParams) / sizeof(OH_Huks_ExternalCryptoParam));
54. if (ohResult.errorCode != OH_HUKS_SUCCESS) {
55. break;
56. }
57. ohResult = OH_Huks_UnregisterProvider(&g_providerName, providerParamSet);
58. if (ohResult.errorCode != OH_HUKS_SUCCESS) {
59. break;
60. }
61. } while (0);
62. OH_Huks_FreeExternalCryptoParamSet(&providerParamSet);

64. napi_value ret;
65. napi_create_int32(env, ohResult.errorCode, &ret);
66. return ret;
67. }
```

**批量注销**

收起

自动换行

深色代码主题

复制

```
1. #include "napi/native_api.h"
2. #include "huks/native_huks_api.h"
3. #include "huks/native_huks_type.h"
4. #include "huks/native_huks_param.h"
5. #include "huks/native_huks_external_crypto_api.h"
6. #include <cstring>

8. OH_Huks_Result InitParamSet(
9. struct OH_Huks_ExternalCryptoParamSet **paramSet,
10. const struct OH_Huks_ExternalCryptoParam *params,
11. uint32_t paramCount)
12. {
13. OH_Huks_Result ret = OH_Huks_InitExternalCryptoParamSet(paramSet);
14. if (ret.errorCode != OH_HUKS_SUCCESS) {
15. return ret;
16. }
17. ret = OH_Huks_AddExternalCryptoParams(*paramSet, params, paramCount);
18. if (ret.errorCode != OH_HUKS_SUCCESS) {
19. OH_Huks_FreeExternalCryptoParamSet(paramSet);
20. return ret;
21. }
22. ret = OH_Huks_BuildExternalCryptoParamSet(paramSet);
23. if (ret.errorCode != OH_HUKS_SUCCESS) {
24. OH_Huks_FreeExternalCryptoParamSet(paramSet);
25. return ret;
26. }
27. return ret;
28. }

30. struct OH_Huks_Blob g_providerName = {
31. (uint32_t)strlen("testProviderName"),
32. (uint8_t *)"testProviderName"
33. };

35. static struct OH_Huks_ExternalCryptoParam g_abilityParams[] = {};

37. static napi_value unregisterProvider(napi_env env, napi_callback_info info)
38. {
39. struct OH_Huks_ExternalCryptoParamSet *providerParamSet = nullptr;
40. OH_Huks_Result ohResult;
41. do {
42. ohResult = InitParamSet(&providerParamSet, g_abilityParams,
43. sizeof(g_abilityParams) / sizeof(OH_Huks_ExternalCryptoParam));
44. if (ohResult.errorCode != OH_HUKS_SUCCESS) {
45. break;
46. }
47. ohResult = OH_Huks_UnregisterProvider(&g_providerName, providerParamSet);
48. if (ohResult.errorCode != OH_HUKS_SUCCESS) {
49. break;
50. }
51. } while (0);
52. OH_Huks_FreeExternalCryptoParamSet(&providerParamSet);

54. napi_value ret;
55. napi_create_int32(env, ohResult.errorCode, &ret);
56. return ret;
57. }
```