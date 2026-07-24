HUKS提供了接口供业务获取指定密钥的相关属性。在获取指定密钥属性前，需要确保已在HUKS中生成或导入持久化存储的密钥。

说明

轻量级智能穿戴不支持获取密钥属性功能。

## 在CMake脚本中链接相关动态库

收起

自动换行

深色代码主题

复制

```
1. target_link_libraries(entry PUBLIC libhuks_ndk.z.so)
```

## 开发步骤

1. 构造对应参数。

   * keyAlias：密钥别名，封装成[OH\_Huks\_Blob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hukstypeapi-oh-huks-blob)结构，密钥别名最大长度为128字节。
   * paramSetIn：预留参数，暂不需要处理，传空即可。
   * paramSetOut：用于放置获取到的参数集结果，为[OH\_Huks\_ParamSet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hukstypeapi-oh-huks-paramset)类型对象，需要业务提前申请好内存，需申请足够容纳获取到的密钥属性集的内存大小。
2. 调用接口[OH\_Huks\_GetKeyItemParamSet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-huks-api-h#oh_huks_getkeyitemparamset)，传入上述参数。
3. 返回值为成功码/错误码，获取成功后，从参数集中读取需要的参数。

收起

自动换行

深色代码主题

复制

```
1. #include "huks/native_huks_api.h"
2. #include "huks/native_huks_param.h"
3. #include "napi/native_api.h"
4. #include <cstring>
5. OH_Huks_Result InitParamSet(struct OH_Huks_ParamSet **paramSet, const struct OH_Huks_Param *params,
6. uint32_t paramCount)
7. {
8. OH_Huks_Result ret = OH_Huks_InitParamSet(paramSet);
9. if (ret.errorCode != OH_HUKS_SUCCESS) {
10. return ret;
11. }
12. ret = OH_Huks_AddParams(*paramSet, params, paramCount);
13. if (ret.errorCode != OH_HUKS_SUCCESS) {
14. OH_Huks_FreeParamSet(paramSet);
15. return ret;
16. }
17. ret = OH_Huks_BuildParamSet(paramSet);
18. if (ret.errorCode != OH_HUKS_SUCCESS) {
19. OH_Huks_FreeParamSet(paramSet);
20. return ret;
21. }
22. return ret;
23. }

25. struct OH_Huks_Param g_testGenerateKeyParam[] = {{.tag = OH_HUKS_TAG_ALGORITHM, .uint32Param = OH_HUKS_ALG_ECC},
26. {.tag = OH_HUKS_TAG_PURPOSE, .uint32Param = OH_HUKS_KEY_PURPOSE_AGREE},
27. {.tag = OH_HUKS_TAG_KEY_SIZE, .uint32Param = OH_HUKS_ECC_KEY_SIZE_256},
28. {.tag = OH_HUKS_TAG_DIGEST, .uint32Param = OH_HUKS_DIGEST_NONE}};

30. static OH_Huks_Result GenerateKeyHelper(const char *alias)
31. {
32. struct OH_Huks_Blob aliasBlob = {.size = (uint32_t)strlen(alias), .data = (uint8_t *)alias};
33. struct OH_Huks_ParamSet *testGenerateKeyParamSet = nullptr;
34. struct OH_Huks_Result ohResult;
35. do {
36. /* 1.初始化密钥属性集 */
37. ohResult = InitParamSet(&testGenerateKeyParamSet, g_testGenerateKeyParam,
38. sizeof(g_testGenerateKeyParam) / sizeof(OH_Huks_Param));
39. if (ohResult.errorCode != OH_HUKS_SUCCESS) {
40. break;
41. }
42. /* 1.生成密钥 */
43. ohResult = OH_Huks_GenerateKeyItem(&aliasBlob, testGenerateKeyParamSet, nullptr);
44. } while (0);
45. OH_Huks_FreeParamSet(&testGenerateKeyParamSet);
46. return ohResult;
47. }

49. static napi_value GetKeyParamSet(napi_env env, napi_callback_info info)
50. {
51. /* 1. 参数构造：确定密钥别名 */
52. const char *alias = "test_key";
53. struct OH_Huks_Blob aliasBlob = { .size = (uint32_t)strlen(alias), .data = (uint8_t *)alias };
54. /* 生成密钥 */
55. OH_Huks_Result genResult = GenerateKeyHelper(alias);
56. if (genResult.errorCode != OH_HUKS_SUCCESS) {
57. napi_value ret;
58. napi_create_int32(env, genResult.errorCode, &ret);
59. return ret;
60. }
61. const size_t paramSetSize = 512;
62. /* 构造参数：为参数集申请内存
63. * 请业务按实际情况评估大小进行申请
64. */
65. struct OH_Huks_ParamSet *outParamSet = static_cast<struct OH_Huks_ParamSet *>(malloc(paramSetSize));
66. if (outParamSet == nullptr) {
67. return nullptr;
68. }
69. outParamSet->paramSetSize = paramSetSize;
70. struct OH_Huks_Result ohResult;
71. do {
72. /* 2. 获取密钥属性集 */
73. ohResult = OH_Huks_GetKeyItemParamSet(&aliasBlob, nullptr, outParamSet);
74. if (ohResult.errorCode != OH_HUKS_SUCCESS) {
75. break;
76. }
77. /* 3. 从参数集中读取参数，以OH_HUKS_TAG_PURPOSE为例 */
78. OH_Huks_Param *purposeParam = nullptr; // 无需申请内存，获取后指针指向该参数在参数集中所处内存地址
79. ohResult = OH_Huks_GetParam(outParamSet, OH_HUKS_TAG_PURPOSE, &purposeParam);
80. if (ohResult.errorCode != OH_HUKS_SUCCESS) {
81. break;
82. }
83. } while (0);
84. OH_Huks_FreeParamSet(&outParamSet);
85. napi_value ret;
86. napi_create_int32(env, ohResult.errorCode, &ret);
87. return ret;
88. }
```

[napi\_init.cpp](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Security/UniversalKeystoreKit/OtherOperations/GetKeyAttributes/entry/src/main/cpp/napi_init.cpp#L15-L106)