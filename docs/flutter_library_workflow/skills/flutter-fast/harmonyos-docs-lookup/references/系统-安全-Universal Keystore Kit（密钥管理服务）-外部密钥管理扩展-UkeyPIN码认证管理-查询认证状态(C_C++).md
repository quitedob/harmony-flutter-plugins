从API 22开始，huksExternalCrypto提供PIN码认证状态查询功能接口。应用可以通过该接口查询PIN码是否认证通过。具体的场景介绍及规格，请参考[Ukey PIN码认证介绍及规格](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-ukey-pin-authentication-management-overview)。

## 在CMake脚本中链接相关动态库

收起

自动换行

深色代码主题

复制

```
1. target_link_libraries(entry PUBLIC libhuks_ndk.z.so libhuks_external_crypto.z.so)
```

## 开发步骤

1. 通过证书管理系统能力提供的[证书选择接口](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-certmanagerdialog#certificatemanagerdialogopenauthorizedialog22)获取[keyUri](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-certmanagerdialog#certreference22)，并将其作为resourceId。
2. 调用[OH\_Huks\_InitExternalCryptoParamSet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-huks-external-crypto-api-h#oh_huks_initexternalcryptoparamset)指定参数配置。
3. 调用[OH\_Huks\_GetUkeyPinAuthState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-huks-external-crypto-api-h#oh_huks_getukeypinauthstate)获取PIN码认证状态。

## 开发案例

收起

自动换行

深色代码主题

复制

```
1. #include "huks/native_huks_external_crypto_api.h"
2. #include "huks/native_huks_param.h"
3. #include "napi/native_api.h"
4. #include <string.h>

6. OH_Huks_Result InitParamSet(
7. struct OH_Huks_ExternalCryptoParamSet **paramSet,
8. const struct OH_Huks_ExternalCryptoParam *params,
9. uint32_t paramCount)
10. {
11. OH_Huks_Result ret = OH_Huks_InitExternalCryptoParamSet(paramSet);
12. if (ret.errorCode != OH_HUKS_SUCCESS) {
13. return ret;
14. }
15. ret = OH_Huks_AddExternalCryptoParams(*paramSet, params, paramCount);
16. if (ret.errorCode != OH_HUKS_SUCCESS) {
17. OH_Huks_FreeExternalCryptoParamSet(paramSet);
18. return ret;
19. }
20. ret = OH_Huks_BuildExternalCryptoParamSet(paramSet);
21. if (ret.errorCode != OH_HUKS_SUCCESS) {
22. OH_Huks_FreeExternalCryptoParamSet(paramSet);
23. return ret;
24. }
25. return ret;
26. }

28. static const char *resourceId = "{\"providerName\":\"testProviderName\",\"abilityName\":\"CryptoExtension\",\"bundleName\":\"com.example.cryptoapplication\",\"index\":{\"key\":\"testKey\"}}";

30. static struct OH_Huks_ExternalCryptoParam g_getPinStateParamsTest[] = {};

32. static napi_value GetUkeyPinAuthState(napi_env env, napi_callback_info info)
33. {
34. struct OH_Huks_Blob g_resourceId = {
35. (uint32_t)strlen(resourceId),
36. (uint8_t *)resourceId
37. };
38. struct OH_Huks_ExternalCryptoParamSet *pinStateParamSet = nullptr;
39. OH_Huks_ExternalPinAuthState authState = OH_HUKS_EXT_CRYPTO_PIN_NO_AUTH;
40. OH_Huks_Result ohResult;
41. do {
42. ohResult = InitParamSet(&pinStateParamSet, g_getPinStateParamsTest,
43. sizeof(g_getPinStateParamsTest) / sizeof(OH_Huks_ExternalCryptoParam));
44. if (ohResult.errorCode != OH_HUKS_SUCCESS) {
45. break;
46. }
47. ohResult = OH_Huks_GetUkeyPinAuthState(&g_resourceId, pinStateParamSet, &authState);
48. if (ohResult.errorCode != OH_HUKS_SUCCESS) {
49. break;
50. }
51. } while (0);
52. OH_Huks_FreeExternalCryptoParamSet(&pinStateParamSet);

54. napi_value ret;
55. napi_create_int32(env, ohResult.errorCode, &ret);
56. return ret;
57. }
```