以AES256密钥为例，完成加解密。具体的场景介绍及支持的算法规格，请参考[加解密支持的算法](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-encryption-decryption-overview#支持的算法)。

## 在CMake脚本中链接相关动态库

收起

自动换行

深色代码主题

复制

```
1. target_link_libraries(entry PUBLIC libhuks_ndk.z.so)
```

## 开发步骤

**生成密钥**

1. 指定密钥别名，密钥别名命名规范参考[密钥生成介绍及算法规格](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-key-generation-overview)。
2. 初始化密钥属性集。
3. 调用[OH\_Huks\_GenerateKeyItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-huks-api-h#oh_huks_generatekeyitem)生成密钥，具体请参考[密钥生成](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-key-generation-overview)。

除此之外，开发者也可以参考[密钥导入](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-key-import-overview)，导入已有的密钥。

**加密**

1. 获取密钥别名。
2. 获取待加密的数据。
3. 调用[OH\_Huks\_InitParamSet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-huks-param-h#oh_huks_initparamset)指定算法参数配置。在下方示例中，使用算法AES进行加密时，必须要选择其对应分组模式以及填充模式，用例中选取的分组模式为CBC、填充模式为PKCS7，此时必须要填参数IV。
4. 调用[OH\_Huks\_InitSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-huks-api-h#oh_huks_initsession)初始化密钥会话，并获取会话的句柄handle。
5. 调用[OH\_Huks\_FinishSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-huks-api-h#oh_huks_finishsession)结束密钥会话，获取加密后的密文。

**解密**

1. 获取密钥别名。
2. 获取待解密的密文。
3. 调用[OH\_Huks\_InitParamSet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-huks-param-h#oh_huks_initparamset)指定算法参数配置。在下方示例中，使用算法AES进行解密时，必须要选择其对应分组模式以及填充模式，用例中选取的分组模式为CBC、填充模式为PKCS7，此时必须要填参数IV。
4. 调用[OH\_Huks\_InitSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-huks-api-h#oh_huks_initsession)初始化密钥会话，并获取会话的句柄handle。
5. 调用[OH\_Huks\_FinishSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-huks-api-h#oh_huks_finishsession)结束密钥会话，获取解密后的数据。

**删除密钥**

当密钥废弃不用时，需要调用OH\_Huks\_DeleteKeyItem删除密钥，具体请参考[密钥删除](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-delete-key-ndk)。

### AES/CBC/NoPadding

收起

自动换行

深色代码主题

复制

```
1. #include "huks/native_huks_api.h"
2. #include "huks/native_huks_param.h"
3. #include "napi/native_api.h"
4. #include <string.h>
5. OH_Huks_Result InitParamSet(
6. struct OH_Huks_ParamSet **paramSet,
7. const struct OH_Huks_Param *params,
8. uint32_t paramCount)
9. {
10. OH_Huks_Result ret = OH_Huks_InitParamSet(paramSet);
11. if (ret.errorCode != OH_HUKS_SUCCESS) {
12. return ret;
13. }
14. ret = OH_Huks_AddParams(*paramSet, params, paramCount);
15. if (ret.errorCode != OH_HUKS_SUCCESS) {
16. OH_Huks_FreeParamSet(paramSet);
17. return ret;
18. }
19. ret = OH_Huks_BuildParamSet(paramSet);
20. if (ret.errorCode != OH_HUKS_SUCCESS) {
21. OH_Huks_FreeParamSet(paramSet);
22. return ret;
23. }
24. return ret;
25. }
26. static const uint32_t IV_SIZE = 16;
27. static uint8_t IV[IV_SIZE] = { 0 }; // this is a test value, for real use the iv should be different every time.
28. static struct OH_Huks_Param g_genEncDecParams[] = {
29. {
30. .tag = OH_HUKS_TAG_ALGORITHM,
31. .uint32Param = OH_HUKS_ALG_AES
32. }, {
33. .tag = OH_HUKS_TAG_PURPOSE,
34. .uint32Param = OH_HUKS_KEY_PURPOSE_ENCRYPT | OH_HUKS_KEY_PURPOSE_DECRYPT
35. }, {
36. .tag = OH_HUKS_TAG_KEY_SIZE,
37. .uint32Param = OH_HUKS_AES_KEY_SIZE_256
38. }, {
39. .tag = OH_HUKS_TAG_PADDING,
40. .uint32Param = OH_HUKS_PADDING_NONE
41. }, {
42. .tag = OH_HUKS_TAG_BLOCK_MODE,
43. .uint32Param = OH_HUKS_MODE_CBC
44. }
45. };
46. static struct OH_Huks_Param g_encryptParams[] = {
47. {
48. .tag = OH_HUKS_TAG_ALGORITHM,
49. .uint32Param = OH_HUKS_ALG_AES
50. }, {
51. .tag = OH_HUKS_TAG_PURPOSE,
52. .uint32Param = OH_HUKS_KEY_PURPOSE_ENCRYPT
53. }, {
54. .tag = OH_HUKS_TAG_KEY_SIZE,
55. .uint32Param = OH_HUKS_AES_KEY_SIZE_256
56. }, {
57. .tag = OH_HUKS_TAG_PADDING,
58. .uint32Param = OH_HUKS_PADDING_NONE
59. }, {
60. .tag = OH_HUKS_TAG_BLOCK_MODE,
61. .uint32Param = OH_HUKS_MODE_CBC
62. }, {
63. .tag = OH_HUKS_TAG_IV,
64. .blob = {
65. .size = IV_SIZE,
66. .data = (uint8_t *)IV // this is a test value, for real use the iv should be different every time.
67. }
68. }
69. };
70. static struct OH_Huks_Param g_decryptParams[] = {
71. {
72. .tag = OH_HUKS_TAG_ALGORITHM,
73. .uint32Param = OH_HUKS_ALG_AES
74. }, {
75. .tag = OH_HUKS_TAG_PURPOSE,
76. .uint32Param = OH_HUKS_KEY_PURPOSE_DECRYPT
77. }, {
78. .tag = OH_HUKS_TAG_KEY_SIZE,
79. .uint32Param = OH_HUKS_AES_KEY_SIZE_256
80. }, {
81. .tag = OH_HUKS_TAG_PADDING,
82. .uint32Param = OH_HUKS_PADDING_NONE
83. }, {
84. .tag = OH_HUKS_TAG_BLOCK_MODE,
85. .uint32Param = OH_HUKS_MODE_CBC
86. }, {
87. .tag = OH_HUKS_TAG_IV,
88. .blob = {
89. .size = IV_SIZE,
90. .data = (uint8_t *)IV // this is a test value, for real use the iv should be different every time.
91. }
92. }
93. };
94. static const uint32_t AES_COMMON_SIZE = 1024;
95. OH_Huks_Result HksAesCipherTestEncrypt(
96. const struct OH_Huks_Blob *keyAlias, const struct OH_Huks_ParamSet *encryptParamSet,
97. const struct OH_Huks_Blob *inData, struct OH_Huks_Blob *cipherText)
98. {
99. uint8_t handleE[sizeof(uint64_t)] = {0};
100. struct OH_Huks_Blob handleEncrypt = {sizeof(uint64_t), handleE};
101. OH_Huks_Result ret = OH_Huks_InitSession(keyAlias, encryptParamSet, &handleEncrypt, nullptr);
102. if (ret.errorCode != OH_HUKS_SUCCESS) {
103. return ret;
104. }
105. ret = OH_Huks_FinishSession(&handleEncrypt, encryptParamSet, inData, cipherText);
106. return ret;
107. }
108. OH_Huks_Result HksAesCipherTestDecrypt(const struct OH_Huks_Blob *keyAlias,
109. const struct OH_Huks_ParamSet *decryptParamSet, const struct OH_Huks_Blob *cipherText,
110. struct OH_Huks_Blob *plainText, const struct OH_Huks_Blob *inData)
111. {
112. uint8_t handleD[sizeof(uint64_t)] = {0};
113. struct OH_Huks_Blob handleDecrypt = {sizeof(uint64_t), handleD};
114. OH_Huks_Result ret = OH_Huks_InitSession(keyAlias, decryptParamSet, &handleDecrypt, nullptr);
115. if (ret.errorCode != OH_HUKS_SUCCESS) {
116. return ret;
117. }
118. ret = OH_Huks_FinishSession(&handleDecrypt, decryptParamSet, cipherText, plainText);
119. return ret;
120. }
121. static napi_value EncDecKey(napi_env env, napi_callback_info info)
122. {
123. char tmpKeyAlias[] = "test_enc_dec";
124. struct OH_Huks_Blob keyAlias = { (uint32_t)strlen(tmpKeyAlias), (uint8_t *)tmpKeyAlias };
125. struct OH_Huks_ParamSet *genParamSet = nullptr;
126. struct OH_Huks_ParamSet *encryptParamSet = nullptr;
127. struct OH_Huks_ParamSet *decryptParamSet = nullptr;
128. OH_Huks_Result ohResult;
129. do {
130. /* 1. Generate Key */
131. /*
132. * 模拟生成密钥场景
133. * 1.1. 确定密钥别名
134. */
135. /*
136. * 1.2. 获取生成密钥算法参数配置
137. */
138. ohResult = InitParamSet(&genParamSet, g_genEncDecParams, sizeof(g_genEncDecParams) / sizeof(OH_Huks_Param));
139. if (ohResult.errorCode != OH_HUKS_SUCCESS) {
140. break;
141. }
142. /*
143. * 1.3. 调用generateKeyItem
144. */
145. ohResult = OH_Huks_GenerateKeyItem(&keyAlias, genParamSet, nullptr);
146. if (ohResult.errorCode != OH_HUKS_SUCCESS) {
147. break;
148. }
149. /* 2. Encrypt */
150. /*
151. * 模拟加密场景
152. * 2.1. 获取密钥别名
153. */
154. /*
155. * 2.2. 获取待加密的数据
156. */
157. /*
158. * 2.3. 获取加密算法参数配置
159. */
160. ohResult = InitParamSet(&encryptParamSet, g_encryptParams, sizeof(g_encryptParams) / sizeof(OH_Huks_Param));
161. if (ohResult.errorCode != OH_HUKS_SUCCESS) {
162. break;
163. }
164. char tmpInData[] = "AES_ECB_INDATA_1";
165. struct OH_Huks_Blob inData = { (uint32_t)strlen(tmpInData), (uint8_t *)tmpInData };
166. uint8_t cipher[AES_COMMON_SIZE] = {0};
167. struct OH_Huks_Blob cipherText = {AES_COMMON_SIZE, cipher};
168. /*
169. * 2.4. 调用initSession获取handle
170. */
171. /*
172. * 2.5. 调用finishSession获取加密后的密文
173. */
174. ohResult = HksAesCipherTestEncrypt(&keyAlias, encryptParamSet, &inData, &cipherText);
175. if (ohResult.errorCode != OH_HUKS_SUCCESS) {
176. break;
177. }
178. /* 3. Decrypt */
179. /*
180. * 模拟解密场景
181. * 3.1. 获取密钥别名
182. */
183. /*
184. * 3.2. 获取待解密的密文
185. */
186. /*
187. * 3.3. 获取解密算法参数配置
188. */
189. ohResult = InitParamSet(&decryptParamSet, g_decryptParams, sizeof(g_decryptParams) / sizeof(OH_Huks_Param));
190. if (ohResult.errorCode != OH_HUKS_SUCCESS) {
191. break;
192. }
193. uint8_t plain[AES_COMMON_SIZE] = {0};
194. struct OH_Huks_Blob plainText = {AES_COMMON_SIZE, plain};
195. /*
196. * 3.4. 调用initSession获取handle
197. */
198. /*
199. * 3.5. 调用finishSession获取解密后的数据
200. */
201. ohResult = HksAesCipherTestDecrypt(&keyAlias, decryptParamSet, &cipherText, &plainText, &inData);
202. } while (0);
203. /* 4. Delete Key */
204. /*
205. * 模拟删除密钥场景
206. * 4.1. 获取密钥别名
207. */
208. /*
209. * 4.2. 调用deleteKeyItem删除密钥
210. */
211. (void)OH_Huks_DeleteKeyItem(&keyAlias, genParamSet);

213. OH_Huks_FreeParamSet(&genParamSet);
214. OH_Huks_FreeParamSet(&encryptParamSet);
215. OH_Huks_FreeParamSet(&decryptParamSet);

217. napi_value ret;
218. napi_create_int32(env, ohResult.errorCode, &ret);
219. return ret;
220. }
```

### AES/CCM/NoPadding

收起

自动换行

深色代码主题

复制

```
1. #include "huks/native_huks_api.h"
2. #include "huks/native_huks_param.h"
3. #include "napi/native_api.h"
4. #include <string.h>

6. static const uint32_t IV_SIZE = 16;
7. static const uint32_t AEAD_TAG_LEN = 14;
8. static char IV[IV_SIZE] = { 0 }; // this is a test value, for real use the iv should be different every time.
9. static char AEAD[AEAD_TAG_LEN] = { 0 };
10. static char NONCE[OH_HUKS_AE_NONCE_LEN] = { 0 };
11. static struct OH_Huks_Param g_genEncDecParams[] = {
12. {
13. .tag = OH_HUKS_TAG_ALGORITHM,
14. .uint32Param = OH_HUKS_ALG_AES
15. }, {
16. .tag = OH_HUKS_TAG_PURPOSE,
17. .uint32Param = OH_HUKS_KEY_PURPOSE_ENCRYPT | OH_HUKS_KEY_PURPOSE_DECRYPT
18. }, {
19. .tag = OH_HUKS_TAG_KEY_SIZE,
20. .uint32Param = OH_HUKS_AES_KEY_SIZE_256
21. }, {
22. .tag = OH_HUKS_TAG_PADDING,
23. .uint32Param = OH_HUKS_PADDING_NONE
24. }, {
25. .tag = OH_HUKS_TAG_BLOCK_MODE,
26. .uint32Param = OH_HUKS_MODE_CCM
27. }
28. };
29. static struct OH_Huks_Param g_encryptParams[] = {
30. {
31. .tag = OH_HUKS_TAG_ALGORITHM,
32. .uint32Param = OH_HUKS_ALG_AES
33. }, {
34. .tag = OH_HUKS_TAG_PURPOSE,
35. .uint32Param = OH_HUKS_KEY_PURPOSE_ENCRYPT
36. }, {
37. .tag = OH_HUKS_TAG_KEY_SIZE,
38. .uint32Param = OH_HUKS_AES_KEY_SIZE_256
39. }, {
40. .tag = OH_HUKS_TAG_PADDING,
41. .uint32Param = OH_HUKS_PADDING_NONE
42. }, {
43. .tag = OH_HUKS_TAG_BLOCK_MODE,
44. .uint32Param = OH_HUKS_MODE_CCM
45. }, {
46. .tag = OH_HUKS_TAG_IV,
47. .blob = {
48. .size = IV_SIZE,
49. .data = (uint8_t *)IV // this is a test value, for real use the iv should be different every time.
50. }
51. }, {
52. .tag = OH_HUKS_TAG_NONCE,
53. .blob = {
54. .size = OH_HUKS_AE_NONCE_LEN,
55. .data = (uint8_t *)NONCE
56. }
57. }, {
58. .tag = OH_HUKS_TAG_AE_TAG_LEN,
59. .uint32Param = AEAD_TAG_LEN
60. }
61. };
62. static struct OH_Huks_Param g_decryptParams[] = {
63. {
64. .tag = OH_HUKS_TAG_ALGORITHM,
65. .uint32Param = OH_HUKS_ALG_AES
66. }, {
67. .tag = OH_HUKS_TAG_PURPOSE,
68. .uint32Param = OH_HUKS_KEY_PURPOSE_DECRYPT
69. }, {
70. .tag = OH_HUKS_TAG_KEY_SIZE,
71. .uint32Param = OH_HUKS_AES_KEY_SIZE_256
72. }, {
73. .tag = OH_HUKS_TAG_PADDING,
74. .uint32Param = OH_HUKS_PADDING_NONE
75. }, {
76. .tag = OH_HUKS_TAG_BLOCK_MODE,
77. .uint32Param = OH_HUKS_MODE_CCM
78. }, {
79. .tag = OH_HUKS_TAG_IV,
80. .blob = {
81. .size = IV_SIZE,
82. .data = (uint8_t *)IV // this is a test value, for real use the iv should be different every time.
83. }
84. }, {
85. .tag = OH_HUKS_TAG_NONCE,
86. .blob = {
87. .size = OH_HUKS_AE_NONCE_LEN,
88. .data = (uint8_t *)NONCE
89. }
90. }, {
91. .tag = OH_HUKS_TAG_AE_TAG,
92. .blob = {
93. .size = AEAD_TAG_LEN,
94. .data = (uint8_t *)AEAD
95. }
96. }, {
97. .tag = OH_HUKS_TAG_AE_TAG_LEN,
98. .uint32Param = AEAD_TAG_LEN
99. }
100. };
101. static const uint32_t AES_COMMON_SIZE = 1024;

103. OH_Huks_Result InitParamSet(
104. struct OH_Huks_ParamSet **paramSet,
105. const struct OH_Huks_Param *params,
106. uint32_t paramCount)
107. {
108. OH_Huks_Result ret = OH_Huks_InitParamSet(paramSet);
109. if (ret.errorCode != OH_HUKS_SUCCESS) {
110. return ret;
111. }
112. ret = OH_Huks_AddParams(*paramSet, params, paramCount);
113. if (ret.errorCode != OH_HUKS_SUCCESS) {
114. OH_Huks_FreeParamSet(paramSet);
115. return ret;
116. }
117. ret = OH_Huks_BuildParamSet(paramSet);
118. if (ret.errorCode != OH_HUKS_SUCCESS) {
119. OH_Huks_FreeParamSet(paramSet);
120. return ret;
121. }
122. return ret;
123. }

125. OH_Huks_Result HksAesCipherTestEncrypt(
126. const struct OH_Huks_Blob *keyAlias, const struct OH_Huks_ParamSet *encryptParamSet,
127. const struct OH_Huks_Blob *inData, struct OH_Huks_Blob *cipherText)
128. {
129. uint8_t handleE[sizeof(uint64_t)] = {0};
130. struct OH_Huks_Blob handleEncrypt = {sizeof(uint64_t), handleE};
131. OH_Huks_Result ret = OH_Huks_InitSession(keyAlias, encryptParamSet, &handleEncrypt, nullptr);
132. if (ret.errorCode != OH_HUKS_SUCCESS) {
133. return ret;
134. }
135. ret = OH_Huks_FinishSession(&handleEncrypt, encryptParamSet, inData, cipherText);
136. return ret;
137. }

139. OH_Huks_Result HksAesCipherTestDecrypt(const struct OH_Huks_Blob *keyAlias,
140. const struct OH_Huks_ParamSet *decryptParamSet, const struct OH_Huks_Blob *cipherText,
141. struct OH_Huks_Blob *plainText)
142. {
143. uint8_t handleD[sizeof(uint64_t)] = {0};
144. struct OH_Huks_Blob handleDecrypt = {sizeof(uint64_t), handleD};
145. OH_Huks_Result ret = OH_Huks_InitSession(keyAlias, decryptParamSet, &handleDecrypt, nullptr);
146. if (ret.errorCode != OH_HUKS_SUCCESS) {
147. return ret;
148. }
149. ret = OH_Huks_FinishSession(&handleDecrypt, decryptParamSet, cipherText, plainText);
150. return ret;
151. }

153. static napi_value EncDecKey(napi_env env, napi_callback_info info)
154. {
155. char tmpKeyAlias[] = "test_aes_ccm_enc_dec";
156. struct OH_Huks_Blob keyAlias = { (uint32_t)strlen(tmpKeyAlias), (uint8_t *)tmpKeyAlias };
157. struct OH_Huks_ParamSet *genParamSet = nullptr;
158. struct OH_Huks_ParamSet *encryptParamSet = nullptr;
159. struct OH_Huks_ParamSet *decryptParamSet = nullptr;
160. OH_Huks_Result ohResult;
161. do {
162. /* 1. Generate Key */
163. /*
164. * 模拟生成密钥场景
165. * 1.1. 确定密钥别名
166. */
167. /*
168. * 1.2. 获取生成密钥算法参数配置
169. */
170. ohResult = InitParamSet(&genParamSet, g_genEncDecParams, sizeof(g_genEncDecParams) / sizeof(OH_Huks_Param));
171. if (ohResult.errorCode != OH_HUKS_SUCCESS) {
172. break;
173. }
174. /*
175. * 1.3. 调用generateKeyItem
176. */
177. ohResult = OH_Huks_GenerateKeyItem(&keyAlias, genParamSet, nullptr);
178. if (ohResult.errorCode != OH_HUKS_SUCCESS) {
179. break;
180. }
181. /* 2. Encrypt */
182. /*
183. * 模拟加密场景
184. * 2.1. 获取密钥别名
185. */
186. /*
187. * 2.2. 获取待加密的数据
188. */
189. /*
190. * 2.3. 获取加密算法参数配置
191. */
192. ohResult = InitParamSet(&encryptParamSet, g_encryptParams, sizeof(g_encryptParams) / sizeof(OH_Huks_Param));
193. if (ohResult.errorCode != OH_HUKS_SUCCESS) {
194. break;
195. }
196. char tmpInData[] = "AES_CCM_INDATA_1";
197. uint32_t dataLen = (uint32_t)strlen(tmpInData);
198. struct OH_Huks_Blob inData = { dataLen, (uint8_t *)tmpInData };
199. uint8_t cipher[AES_COMMON_SIZE] = {0};
200. struct OH_Huks_Blob cipherText = {AES_COMMON_SIZE, cipher};
201. /*
202. * 2.4. 调用initSession获取handle
203. */
204. /*
205. * 2.5. 调用finishSession获取加密后的密文
206. */
207. ohResult = HksAesCipherTestEncrypt(&keyAlias, encryptParamSet, &inData, &cipherText);
208. if (ohResult.errorCode != OH_HUKS_SUCCESS) {
209. break;
210. }
211. strncpy(AEAD, (char *)cipherText.data + dataLen, AEAD_TAG_LEN);
212. cipherText.data[dataLen] = '\0';
213. cipherText.size -= AEAD_TAG_LEN;
214. /* 3. Decrypt */
215. /*
216. * 模拟解密场景
217. * 3.1. 获取密钥别名
218. */
219. /*
220. * 3.2. 获取待解密的密文
221. */
222. /*
223. * 3.3. 获取解密算法参数配置
224. */
225. ohResult = InitParamSet(&decryptParamSet, g_decryptParams, sizeof(g_decryptParams) / sizeof(OH_Huks_Param));
226. if (ohResult.errorCode != OH_HUKS_SUCCESS) {
227. break;
228. }
229. uint8_t plain[AES_COMMON_SIZE] = {0};
230. struct OH_Huks_Blob plainText = {AES_COMMON_SIZE, plain};
231. /*
232. * 3.4. 调用initSession获取handle
233. */
234. /*
235. * 3.5. 调用finishSession获取解密后的数据
236. */
237. ohResult = HksAesCipherTestDecrypt(&keyAlias, decryptParamSet, &cipherText, &plainText);
238. } while (0);
239. /* 4. Delete Key */
240. /*
241. * 模拟删除密钥场景
242. * 4.1. 获取密钥别名
243. */
244. /*
245. * 4.2. 调用deleteKeyItem删除密钥
246. */
247. (void)OH_Huks_DeleteKeyItem(&keyAlias, genParamSet);

249. OH_Huks_FreeParamSet(&genParamSet);
250. OH_Huks_FreeParamSet(&encryptParamSet);
251. OH_Huks_FreeParamSet(&decryptParamSet);

253. napi_value ret;
254. napi_create_int32(env, ohResult.errorCode, &ret);
255. return ret;
256. }
```