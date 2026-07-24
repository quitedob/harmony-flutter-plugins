以RSA、ECC、SM2为例，根据指定的密钥参数，生成非对称密钥对（KeyPair），并获取密钥参数属性。

该对象可用于后续的加解密等操作。获取的密钥参数属性可用于存储或传输。

## 指定密钥参数生成RSA密钥对

对应的算法规格请查看[非对称密钥生成和转换规格：RSA](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-asym-key-generation-conversion-spec#rsa)。

1. 调用[OH\_CryptoAsymKeySpec\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeyspec_create)，指定算法名为"RSA"， 密钥参数类型为CRYPTO\_ASYM\_KEY\_KEY\_PAIR\_SPEC，创建参数对象（keySpec）。
2. 指定uint8\_t类型的RSA密钥对数据（pk、sk、n），分别封装成[Crypto\_DataBlob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptocommonapi-crypto-datablob)。
3. 调用[OH\_CryptoAsymKeySpec\_SetParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeyspec_setparam)，指定参数类型分别为CRYPTO\_RSA\_E\_DATABLOB（pk）、CRYPTO\_RSA\_D\_DATABLOB（sk）、CRYPTO\_RSA\_N\_DATABLOB（n）, 依次传入封装后的[Crypto\_DataBlob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptocommonapi-crypto-datablob)，设置参数对象（keySpec）。

   注意

   pk、sk、n均要以大端模式输入，且必须为正数。
4. 调用[OH\_CryptoAsymKeyGeneratorWithSpec\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeygeneratorwithspec_create)，将参数对象（keySpec）传入，创建非对称密钥生成器（generatorSpec）。
5. 调用[OH\_CryptoAsymKeyGeneratorWithSpec\_GenKeyPair](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeygeneratorwithspec_genkeypair)，生成RSA密钥对（keyPair）。
6. 分别传入密钥对中的私钥和公钥，调用[OH\_CryptoPrivKey\_GetParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoprivkey_getparam)和[OH\_CryptoPubKey\_GetParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptopubkey_getparam)，获取RSA算法中私钥和公钥的各种密钥参数。

收起

自动换行

深色代码主题

复制

```
1. #include "CryptoArchitectureKit/crypto_architecture_kit.h"
2. #include <string>

4. static OH_Crypto_ErrCode GetRsaKeyParams(OH_CryptoKeyPair *keyCtx, Crypto_DataBlob *pubKeyData,
5. Crypto_DataBlob *dataN)
6. {
7. OH_CryptoPubKey *pubKey = OH_CryptoKeyPair_GetPubKey(keyCtx);
8. if (pubKey == nullptr) {
9. return CRYPTO_OPERTION_ERROR;
10. }
11. OH_Crypto_ErrCode ret = OH_CryptoPubKey_GetParam(pubKey, CRYPTO_RSA_E_DATABLOB, pubKeyData);
12. if (ret != CRYPTO_SUCCESS) {
13. return ret;
14. }
15. return OH_CryptoPubKey_GetParam(pubKey, CRYPTO_RSA_N_DATABLOB, dataN);
16. }

18. static void FreeRsaKeyParams(Crypto_DataBlob *pubKeyData, Crypto_DataBlob *dataN)
19. {
20. OH_Crypto_FreeDataBlob(pubKeyData);
21. OH_Crypto_FreeDataBlob(dataN);
22. }

24. size_t ConvertHex(uint8_t* dest, size_t count, const char* src)
25. {
26. size_t i;
27. int value;

29. for (i = 0; i < count && sscanf(src + i * 2, "%2x", &value) == 1; i++) {
30. dest[i] = value;
31. }
32. return i;
33. }

35. static OH_Crypto_ErrCode doTestRsaGenKeyPairBySpec()
36. {
37. std::string nStr = "9260d0750ae117eee55c3f3deaba74917521a262ee76007cdf8a56755ad73a1598a1408410a01434c3f5bc54a88b57fa19fc4328daea0750a4c44e88cff3b2382621b80f670464433e4336e6d003e8cd65bff211da144b88291c2259a00a72b711c116ef7686e8fee34e4d933c868187bdc26f7be071493c86f7a5941c3510806ad67b0f94d88f5cf5c02a092821d8626e8932b65c5bd8c92049c210932b7afa7ac59c0e886ae5c1edb00d8ce2c57633db26bd6639bff73cee82be9275c402b4cf2a4388da8cf8c64eefe1c5a0f5ab8057c39fa5c0589c3e253f0960332300f94bea44877b588e1edbde97cf2360727a09b775262d7ee552b3319b9266f05a25";
38. std::string eStr = "010001";
39. uint8_t n[1024] = {};
40. uint8_t e[20] = {};
41. size_t nLen = ConvertHex(n, nStr.size() / 2, nStr.c_str());
42. size_t eLen = ConvertHex(e, eStr.size() / 2, eStr.c_str());
43. Crypto_DataBlob nData = {.data = n, .len = nLen};
44. Crypto_DataBlob eData = {.data = e, .len = eLen};

46. OH_CryptoAsymKeySpec *keySpec = nullptr;
47. OH_Crypto_ErrCode ret = OH_CryptoAsymKeySpec_Create("RSA", CRYPTO_ASYM_KEY_PUBLIC_KEY_SPEC, &keySpec);
48. if (ret != CRYPTO_SUCCESS) {
49. return ret;
50. }
51. ret = OH_CryptoAsymKeySpec_SetParam(keySpec, CRYPTO_RSA_E_DATABLOB, &eData);
52. if (ret != CRYPTO_SUCCESS) {
53. OH_CryptoAsymKeySpec_Destroy(keySpec);
54. return ret;
55. }
56. ret = OH_CryptoAsymKeySpec_SetParam(keySpec, CRYPTO_RSA_N_DATABLOB, &nData);
57. if (ret != CRYPTO_SUCCESS) {
58. OH_CryptoAsymKeySpec_Destroy(keySpec);
59. return ret;
60. }

62. OH_CryptoAsymKeyGeneratorWithSpec *generatorSpec = nullptr;
63. ret = OH_CryptoAsymKeyGeneratorWithSpec_Create(keySpec, &generatorSpec);
64. if (ret != CRYPTO_SUCCESS) {
65. OH_CryptoAsymKeySpec_Destroy(keySpec);
66. return ret;
67. }
68. OH_CryptoKeyPair *keyPair = nullptr;
69. ret = OH_CryptoAsymKeyGeneratorWithSpec_GenKeyPair(generatorSpec, &keyPair);
70. if (ret != CRYPTO_SUCCESS) {
71. OH_CryptoAsymKeyGeneratorWithSpec_Destroy(generatorSpec);
72. OH_CryptoAsymKeySpec_Destroy(keySpec);
73. return ret;
74. }

76. Crypto_DataBlob dataE = {.data = nullptr, .len = 0};
77. Crypto_DataBlob dataN = {.data = nullptr, .len = 0};
78. ret = GetRsaKeyParams(keyPair, &dataE, &dataN);
79. if (ret != CRYPTO_SUCCESS) {
80. FreeRsaKeyParams(&dataE, &dataN);
81. OH_CryptoKeyPair_Destroy(keyPair);
82. OH_CryptoAsymKeyGeneratorWithSpec_Destroy(generatorSpec);
83. OH_CryptoAsymKeySpec_Destroy(keySpec);
84. return ret;
85. }
86. FreeRsaKeyParams(&dataE, &dataN);
87. OH_CryptoKeyPair_Destroy(keyPair);
88. OH_CryptoAsymKeyGeneratorWithSpec_Destroy(generatorSpec);
89. OH_CryptoAsymKeySpec_Destroy(keySpec);
90. return ret;
91. }
```

## 指定密钥参数生成ECC密钥对

对应的算法规格请查看[非对称密钥生成和转换规格：ECC](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-asym-key-generation-conversion-spec#ecc)。

1. 调用[OH\_CryptoAsymKeySpec\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeyspec_create)，指定算法名为"ECC"， 密钥参数类型为CRYPTO\_ASYM\_KEY\_COMMON\_PARAMS\_SPEC，创建参数对象（keySpec）。
2. 指定uint8\_t类型的ECC公私钥包含的公共参数（p、a、b、gx、gy、n、h），分别封装成[Crypto\_DataBlob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptocommonapi-crypto-datablob)。
3. 调用[OH\_CryptoAsymKeySpec\_SetParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeyspec_setparam)，指定参数类型分别为CRYPTO\_ECC\_FP\_P\_DATABLOB（p）、CRYPTO\_ECC\_A\_DATABLOB（a）、CRYPTO\_ECC\_B\_DATABLOB（b）、CRYPTO\_ECC\_G\_X\_DATABLOB（gx）、CRYPTO\_ECC\_G\_Y\_DATABLOB（gy）、CRYPTO\_ECC\_N\_DATABLOB（n）、CRYPTO\_ECC\_H\_INT（h）, 依次传入封装后的[Crypto\_DataBlob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptocommonapi-crypto-datablob)，设置到参数对象（keySpec）。

   注意

   p、a、b、gx、gy、n、h均要以大端模式输入，且必须为正数。
4. 调用[OH\_CryptoAsymKeyGeneratorWithSpec\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeygeneratorwithspec_create)，将参数对象（keySpec）传入，创建非对称密钥生成器（generatorSpec）。
5. 调用[OH\_CryptoAsymKeyGeneratorWithSpec\_GenKeyPair](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeygeneratorwithspec_genkeypair)，生成ECC密钥对（keyPair）。
6. 分别传入密钥对中的私钥和公钥，调用[OH\_CryptoPrivKey\_GetParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoprivkey_getparam)和[OH\_CryptoPubKey\_GetParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptopubkey_getparam)，获取ECC算法中私钥和公钥的各种密钥参数。

收起

自动换行

深色代码主题

复制

```
1. #include "CryptoArchitectureKit/crypto_architecture_kit.h"
2. #include <string>

4. static OH_Crypto_ErrCode GetEccKeyParams(OH_CryptoKeyPair *keyCtx, Crypto_DataBlob *pubKeyXData,
5. Crypto_DataBlob *pubKeyYData, Crypto_DataBlob *privKeyData)
6. {
7. OH_CryptoPubKey *pubKey = OH_CryptoKeyPair_GetPubKey(keyCtx);
8. if (pubKey == nullptr) {
9. return CRYPTO_OPERTION_ERROR;
10. }
11. OH_Crypto_ErrCode ret = OH_CryptoPubKey_GetParam(pubKey, CRYPTO_ECC_PK_X_DATABLOB, pubKeyXData);
12. if (ret != CRYPTO_SUCCESS) {
13. return ret;
14. }
15. ret = OH_CryptoPubKey_GetParam(pubKey, CRYPTO_ECC_PK_Y_DATABLOB, pubKeyYData);
16. if (ret != CRYPTO_SUCCESS) {
17. return ret;
18. }

20. OH_CryptoPrivKey *privKey = OH_CryptoKeyPair_GetPrivKey(keyCtx);
21. if (privKey == nullptr) {
22. return CRYPTO_OPERTION_ERROR;
23. }
24. ret = OH_CryptoPrivKey_GetParam(privKey, CRYPTO_ECC_SK_DATABLOB, privKeyData);
25. return ret;
26. }

28. static void FreeEccKeyParams(Crypto_DataBlob *pubKeyXData, Crypto_DataBlob *pubKeyYData, Crypto_DataBlob *privKeyData)
29. {
30. OH_Crypto_FreeDataBlob(pubKeyXData);
31. OH_Crypto_FreeDataBlob(pubKeyYData);
32. OH_Crypto_FreeDataBlob(privKeyData);
33. }

35. static OH_Crypto_ErrCode GetEccCommonParams(OH_CryptoKeyPair *keyCtx, Crypto_DataBlob *pData,
36. Crypto_DataBlob *aData, Crypto_DataBlob *bData, Crypto_DataBlob *gxData,
37. Crypto_DataBlob *gyData, Crypto_DataBlob *nData, Crypto_DataBlob *hData)
38. {
39. OH_CryptoPrivKey *privKey = OH_CryptoKeyPair_GetPrivKey(keyCtx);
40. if (privKey == nullptr) {
41. return CRYPTO_OPERTION_ERROR;
42. }
43. OH_Crypto_ErrCode ret = OH_CryptoPrivKey_GetParam(privKey, CRYPTO_ECC_FP_P_DATABLOB, pData);
44. if (ret != CRYPTO_SUCCESS) {
45. return ret;
46. }
47. ret = OH_CryptoPrivKey_GetParam(privKey, CRYPTO_ECC_A_DATABLOB, aData);
48. if (ret != CRYPTO_SUCCESS) {
49. return ret;
50. }
51. ret = OH_CryptoPrivKey_GetParam(privKey, CRYPTO_ECC_B_DATABLOB, bData);
52. if (ret != CRYPTO_SUCCESS) {
53. return ret;
54. }
55. ret = OH_CryptoPrivKey_GetParam(privKey, CRYPTO_ECC_G_X_DATABLOB, gxData);
56. if (ret != CRYPTO_SUCCESS) {
57. return ret;
58. }
59. ret = OH_CryptoPrivKey_GetParam(privKey, CRYPTO_ECC_G_Y_DATABLOB, gyData);
60. if (ret != CRYPTO_SUCCESS) {
61. return ret;
62. }
63. ret = OH_CryptoPrivKey_GetParam(privKey, CRYPTO_ECC_N_DATABLOB, nData);
64. if (ret != CRYPTO_SUCCESS) {
65. return ret;
66. }
67. ret = OH_CryptoPrivKey_GetParam(privKey, CRYPTO_ECC_H_INT, hData);
68. if (ret != CRYPTO_SUCCESS) {
69. return ret;
70. }
71. return ret;
72. }

74. static void FreeEccCommonParams(Crypto_DataBlob *pData, Crypto_DataBlob *aData, Crypto_DataBlob *bData,
75. Crypto_DataBlob *gxData, Crypto_DataBlob *gyData, Crypto_DataBlob *nData,
76. Crypto_DataBlob *hData)
77. {
78. OH_Crypto_FreeDataBlob(pData);
79. OH_Crypto_FreeDataBlob(aData);
80. OH_Crypto_FreeDataBlob(bData);
81. OH_Crypto_FreeDataBlob(gxData);
82. OH_Crypto_FreeDataBlob(gyData);
83. OH_Crypto_FreeDataBlob(nData);
84. OH_Crypto_FreeDataBlob(hData);
85. }

87. size_t ConvertHex(uint8_t* dest, size_t count, const char* src)
88. {
89. size_t i;
90. int value;

92. for (i = 0; i < count && sscanf(src + i * 2, "%2x", &value) == 1; i++) {
93. dest[i] = value;
94. }
95. return i;
96. }

98. static OH_Crypto_ErrCode doTestEccGenKeyPairBySpec()
99. {
100. std::string pStr = "ffffffffffffffffffffffffffffffff000000000000000000000001";
101. std::string gxStr = "b70e0cbd6bb4bf7f321390b94a03c1d356c21122343280d6115c1d21";
102. std::string gyStr = "bd376388b5f723fb4c22dfe6cd4375a05a07476444d5819985007e34";
103. std::string aStr = "fffffffffffffffffffffffffffffffefffffffffffffffffffffffe";
104. std::string bStr = "b4050a850c04b3abf54132565044b0b7d7bfd8ba270b39432355ffb4";
105. std::string nStr = "ffffffffffffffffffffffffffff16a2e0b8f03e13dd29455c5c2a3d";
106. uint8_t p[256] = {};
107. uint8_t gx[256] = {};
108. uint8_t gy[256] = {};
109. uint8_t a[256] = {};
110. uint8_t b[256] = {};
111. uint8_t n[256] = {};
112. uint8_t h[] = {0x00, 0x00, 0x00, 0x01}; // 1 大端序
113. size_t pLen = ConvertHex(p, pStr.size() / 2, pStr.c_str());
114. size_t gxLen = ConvertHex(gx, gxStr.size() / 2, gxStr.c_str());
115. size_t gyLen = ConvertHex(gy, gyStr.size() / 2, gyStr.c_str());
116. size_t aLen = ConvertHex(a, aStr.size() / 2, aStr.c_str());
117. size_t bLen = ConvertHex(b, bStr.size() / 2, bStr.c_str());
118. size_t nLen = ConvertHex(n, nStr.size() / 2, nStr.c_str());
119. Crypto_DataBlob pData = {.data = p, .len = pLen};
120. Crypto_DataBlob aData = {.data = a, .len = aLen};
121. Crypto_DataBlob bData = {.data = b, .len = bLen};
122. Crypto_DataBlob gxData = {.data = gx, .len = gxLen};
123. Crypto_DataBlob gyData = {.data = gy, .len = gyLen};
124. Crypto_DataBlob nData = {.data = n, .len = nLen};
125. Crypto_DataBlob hData = {.data = h, .len = sizeof(h)};

127. OH_CryptoAsymKeySpec *keySpec = nullptr;
128. OH_Crypto_ErrCode ret = OH_CryptoAsymKeySpec_Create("ECC", CRYPTO_ASYM_KEY_COMMON_PARAMS_SPEC, &keySpec);
129. if (ret != CRYPTO_SUCCESS) {
130. return ret;
131. }
132. ret = OH_CryptoAsymKeySpec_SetParam(keySpec, CRYPTO_ECC_FP_P_DATABLOB, &pData);
133. if (ret != CRYPTO_SUCCESS) {
134. OH_CryptoAsymKeySpec_Destroy(keySpec);
135. return ret;
136. }
137. ret = OH_CryptoAsymKeySpec_SetParam(keySpec, CRYPTO_ECC_A_DATABLOB, &aData);
138. if (ret != CRYPTO_SUCCESS) {
139. OH_CryptoAsymKeySpec_Destroy(keySpec);
140. return ret;
141. }
142. ret = OH_CryptoAsymKeySpec_SetParam(keySpec, CRYPTO_ECC_B_DATABLOB, &bData);
143. if (ret != CRYPTO_SUCCESS) {
144. OH_CryptoAsymKeySpec_Destroy(keySpec);
145. return ret;
146. }
147. ret = OH_CryptoAsymKeySpec_SetParam(keySpec, CRYPTO_ECC_G_X_DATABLOB, &gxData);
148. if (ret != CRYPTO_SUCCESS) {
149. OH_CryptoAsymKeySpec_Destroy(keySpec);
150. return ret;
151. }
152. ret = OH_CryptoAsymKeySpec_SetParam(keySpec, CRYPTO_ECC_G_Y_DATABLOB, &gyData);
153. if (ret != CRYPTO_SUCCESS) {
154. OH_CryptoAsymKeySpec_Destroy(keySpec);
155. return ret;
156. }
157. ret = OH_CryptoAsymKeySpec_SetParam(keySpec, CRYPTO_ECC_N_DATABLOB, &nData);
158. if (ret != CRYPTO_SUCCESS) {
159. OH_CryptoAsymKeySpec_Destroy(keySpec);
160. return ret;
161. }
162. ret = OH_CryptoAsymKeySpec_SetParam(keySpec, CRYPTO_ECC_H_INT, &hData);
163. if (ret != CRYPTO_SUCCESS) {
164. OH_CryptoAsymKeySpec_Destroy(keySpec);
165. return ret;
166. }

168. OH_CryptoAsymKeyGeneratorWithSpec *generatorSpec = nullptr;
169. ret = OH_CryptoAsymKeyGeneratorWithSpec_Create(keySpec, &generatorSpec);
170. if (ret != CRYPTO_SUCCESS) {
171. OH_CryptoAsymKeySpec_Destroy(keySpec);
172. return ret;
173. }
174. OH_CryptoKeyPair *keyPair = nullptr;
175. ret = OH_CryptoAsymKeyGeneratorWithSpec_GenKeyPair(generatorSpec, &keyPair);
176. if (ret != CRYPTO_SUCCESS) {
177. OH_CryptoAsymKeyGeneratorWithSpec_Destroy(generatorSpec);
178. OH_CryptoAsymKeySpec_Destroy(keySpec);
179. return ret;
180. }

182. Crypto_DataBlob dataPkX = {.data = nullptr, .len = 0};
183. Crypto_DataBlob dataPkY = {.data = nullptr, .len = 0};
184. Crypto_DataBlob dataSk = {.data = nullptr, .len = 0};
185. ret = GetEccKeyParams(keyPair, &dataPkX, &dataPkY, &dataSk);
186. if (ret != CRYPTO_SUCCESS) {
187. FreeEccKeyParams(&dataPkX, &dataPkY, &dataSk);
188. OH_CryptoKeyPair_Destroy(keyPair);
189. OH_CryptoAsymKeySpec_Destroy(keySpec);
190. OH_CryptoAsymKeyGeneratorWithSpec_Destroy(generatorSpec);
191. return ret;
192. }
193. FreeEccKeyParams(&dataPkX, &dataPkY, &dataSk);
194. Crypto_DataBlob dataP = {.data = nullptr, .len = 0};
195. Crypto_DataBlob dataA = {.data = nullptr, .len = 0};
196. Crypto_DataBlob dataB = {.data = nullptr, .len = 0};
197. Crypto_DataBlob dataGx = {.data = nullptr, .len = 0};
198. Crypto_DataBlob dataGy = {.data = nullptr, .len = 0};
199. Crypto_DataBlob dataN = {.data = nullptr, .len = 0};
200. Crypto_DataBlob dataH = {.data = nullptr, .len = 0};
201. ret = GetEccCommonParams(keyPair, &dataP, &dataA, &dataB, &dataGx, &dataGy, &dataN, &dataH);
202. if (ret != CRYPTO_SUCCESS) {
203. FreeEccCommonParams(&dataP, &dataA, &dataB, &dataGx, &dataGy, &dataN, &dataH);
204. OH_CryptoKeyPair_Destroy(keyPair);
205. OH_CryptoAsymKeySpec_Destroy(keySpec);
206. OH_CryptoAsymKeyGeneratorWithSpec_Destroy(generatorSpec);
207. return ret;
208. }
209. FreeEccCommonParams(&dataP, &dataA, &dataB, &dataGx, &dataGy, &dataN, &dataH);
210. OH_CryptoKeyPair_Destroy(keyPair);
211. OH_CryptoAsymKeySpec_Destroy(keySpec);
212. OH_CryptoAsymKeyGeneratorWithSpec_Destroy(generatorSpec);
213. return ret;
214. }
```

## 根据椭圆曲线名生成SM2密钥对

对应的算法规格请查看[非对称密钥生成和转换规格：SM2](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-asym-key-generation-conversion-spec#sm2)。

1. 调用[OH\_CryptoAsymKeySpec\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeyspec_create)，指定算法名为"SM2"， 密钥参数类型为CRYPTO\_ASYM\_KEY\_KEY\_PAIR\_SPEC，创建密钥参数对象（keySpec）。
2. 调用[OH\_CryptoAsymKeySpec\_GenEcCommonParamsSpec](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeyspec_geneccommonparamsspec)，指定曲线为"NID\_sm2"， 生成SM2公共参数对象（sm2CommonSpec）。
3. 调用[OH\_CryptoAsymKeySpec\_SetCommonParamsSpec](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeyspec_setcommonparamsspec)，将生成SM2公共参数对象（sm2CommonSpec）设置到密钥参数对象（keySpec）。
4. 指定uint8\_t类型的SM2密钥对数据（pkx、pky、sk），分别封装成[Crypto\_DataBlob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptocommonapi-crypto-datablob)。
5. 调用[OH\_CryptoAsymKeySpec\_SetParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeyspec_setparam)，指定参数类型分别为CRYPTO\_ECC\_PK\_X\_DATABLOB（pkx）、CRYPTO\_ECC\_PK\_Y\_DATABLOB（pky）、CRYPTO\_ECC\_SK\_DATABLOB（sk）, 依次传入封装后的[Crypto\_DataBlob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-cryptocommonapi-crypto-datablob)，设置到参数对象（keySpec）。

   注意

   pkx、pky、sk均要以大端模式输入，且必须为正数。
6. 调用[OH\_CryptoAsymKeyGeneratorWithSpec\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeygeneratorwithspec_create)，将参数对象（keySpec）传入，创建非对称密钥生成器（generatorSpec）。
7. 调用[OH\_CryptoAsymKeyGeneratorWithSpec\_GenKeyPair](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoasymkeygeneratorwithspec_genkeypair)，生成SM2密钥对（keyPair）。
8. 分别传入密钥对中的私钥和公钥，调用[OH\_CryptoPrivKey\_GetParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptoprivkey_getparam)和[OH\_CryptoPubKey\_GetParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-crypto-asym-key-h#oh_cryptopubkey_getparam)，获取SM2算法中私钥和公钥的各种密钥参数。

收起

自动换行

深色代码主题

复制

```
1. #include "CryptoArchitectureKit/crypto_architecture_kit.h"
2. #include <string>

4. static OH_Crypto_ErrCode GetEccKeyParams(OH_CryptoKeyPair *keyCtx, Crypto_DataBlob *pubKeyXData,
5. Crypto_DataBlob *pubKeyYData, Crypto_DataBlob *privKeyData)
6. {
7. OH_CryptoPubKey *pubKey = OH_CryptoKeyPair_GetPubKey(keyCtx);
8. if (pubKey == nullptr) {
9. return CRYPTO_OPERTION_ERROR;
10. }
11. OH_Crypto_ErrCode ret = OH_CryptoPubKey_GetParam(pubKey, CRYPTO_ECC_PK_X_DATABLOB, pubKeyXData);
12. if (ret != CRYPTO_SUCCESS) {
13. return ret;
14. }
15. ret = OH_CryptoPubKey_GetParam(pubKey, CRYPTO_ECC_PK_Y_DATABLOB, pubKeyYData);
16. if (ret != CRYPTO_SUCCESS) {
17. return ret;
18. }

20. OH_CryptoPrivKey *privKey = OH_CryptoKeyPair_GetPrivKey(keyCtx);
21. if (privKey == nullptr) {
22. return CRYPTO_OPERTION_ERROR;
23. }
24. ret = OH_CryptoPrivKey_GetParam(privKey, CRYPTO_ECC_SK_DATABLOB, privKeyData);
25. return ret;
26. }

28. static void FreeEccKeyParams(Crypto_DataBlob *pubKeyXData, Crypto_DataBlob *pubKeyYData, Crypto_DataBlob *privKeyData)
29. {
30. OH_Crypto_FreeDataBlob(pubKeyXData);
31. OH_Crypto_FreeDataBlob(pubKeyYData);
32. OH_Crypto_FreeDataBlob(privKeyData);
33. }

35. size_t ConvertHex(uint8_t* dest, size_t count, const char* src)
36. {
37. size_t i;
38. int value;

40. for (i = 0; i < count && sscanf(src + i * 2, "%2x", &value) == 1; i++) {
41. dest[i] = value;
42. }
43. return i;
44. }

46. static OH_Crypto_ErrCode doTestSm2GenKeyPairBySpec()
47. {
48. std::string pkXStr = "67F3B850BDC0BA5D3A29D8A0883C4B17612AB84F87F18E28F77D824A115C02C4";
49. std::string pkYStr = "D48966CE754BBBEDD6501A1385E1B205C186E926ADED44287145E8897D4B2071";
50. std::string skStr = "6330B599ECD23ABDC74B9A5B7B5E00E553005F72743101C5FAB83AEB579B7074";
51. uint8_t pkX[256] = {};
52. uint8_t pkY[256] = {};
53. uint8_t sk[256] = {};
54. size_t pkXLen = ConvertHex(pkX, pkXStr.size() / 2, pkXStr.c_str());
55. size_t pkYLen = ConvertHex(pkY, pkYStr.size() / 2, pkYStr.c_str());
56. size_t skLen = ConvertHex(sk, skStr.size() / 2, skStr.c_str());
57. Crypto_DataBlob pkXData = {.data = pkX, .len = pkXLen};
58. Crypto_DataBlob pkYData = {.data = pkY, .len = pkYLen};
59. Crypto_DataBlob skData = {.data = sk, .len = skLen};

61. OH_CryptoAsymKeySpec *keySpec = nullptr;
62. OH_Crypto_ErrCode ret = OH_CryptoAsymKeySpec_Create("SM2", CRYPTO_ASYM_KEY_KEY_PAIR_SPEC, &keySpec);
63. if (ret != CRYPTO_SUCCESS) {
64. return ret;
65. }
66. OH_CryptoAsymKeySpec *sm2CommonSpec = nullptr;
67. ret = OH_CryptoAsymKeySpec_GenEcCommonParamsSpec("NID_sm2", &sm2CommonSpec);
68. if (ret != CRYPTO_SUCCESS) {
69. OH_CryptoAsymKeySpec_Destroy(keySpec);
70. return ret;
71. }
72. ret = OH_CryptoAsymKeySpec_SetCommonParamsSpec(keySpec, sm2CommonSpec);
73. if (ret != CRYPTO_SUCCESS) {
74. OH_CryptoAsymKeySpec_Destroy(sm2CommonSpec);
75. OH_CryptoAsymKeySpec_Destroy(keySpec);
76. return ret;
77. }
78. ret = OH_CryptoAsymKeySpec_SetParam(keySpec, CRYPTO_ECC_PK_X_DATABLOB, &pkXData);
79. if (ret != CRYPTO_SUCCESS) {
80. OH_CryptoAsymKeySpec_Destroy(sm2CommonSpec);
81. OH_CryptoAsymKeySpec_Destroy(keySpec);
82. return ret;
83. }
84. ret = OH_CryptoAsymKeySpec_SetParam(keySpec, CRYPTO_ECC_PK_Y_DATABLOB, &pkYData);
85. if (ret != CRYPTO_SUCCESS) {
86. OH_CryptoAsymKeySpec_Destroy(sm2CommonSpec);
87. OH_CryptoAsymKeySpec_Destroy(keySpec);
88. return ret;
89. }
90. ret = OH_CryptoAsymKeySpec_SetParam(keySpec, CRYPTO_ECC_SK_DATABLOB, &skData);
91. if (ret != CRYPTO_SUCCESS) {
92. OH_CryptoAsymKeySpec_Destroy(sm2CommonSpec);
93. OH_CryptoAsymKeySpec_Destroy(keySpec);
94. return ret;
95. }

97. OH_CryptoAsymKeyGeneratorWithSpec *generatorSpec = nullptr;
98. ret = OH_CryptoAsymKeyGeneratorWithSpec_Create(keySpec, &generatorSpec);
99. if (ret != CRYPTO_SUCCESS) {
100. OH_CryptoAsymKeySpec_Destroy(sm2CommonSpec);
101. OH_CryptoAsymKeySpec_Destroy(keySpec);
102. return ret;
103. }
104. OH_CryptoKeyPair *keyPair = nullptr;
105. ret = OH_CryptoAsymKeyGeneratorWithSpec_GenKeyPair(generatorSpec, &keyPair);
106. if (ret != CRYPTO_SUCCESS) {
107. OH_CryptoAsymKeyGeneratorWithSpec_Destroy(generatorSpec);
108. OH_CryptoAsymKeySpec_Destroy(sm2CommonSpec);
109. OH_CryptoAsymKeySpec_Destroy(keySpec);
110. return ret;
111. }

113. Crypto_DataBlob dataPkX = {.data = nullptr, .len = 0};
114. Crypto_DataBlob dataPkY = {.data = nullptr, .len = 0};
115. Crypto_DataBlob dataSk = {.data = nullptr, .len = 0};
116. ret = GetEccKeyParams(keyPair, &dataPkX, &dataPkY, &dataSk);
117. if (ret != CRYPTO_SUCCESS) {
118. FreeEccKeyParams(&dataPkX, &dataPkY, &dataSk);
119. OH_CryptoKeyPair_Destroy(keyPair);
120. OH_CryptoAsymKeyGeneratorWithSpec_Destroy(generatorSpec);
121. OH_CryptoAsymKeySpec_Destroy(sm2CommonSpec);
122. OH_CryptoAsymKeySpec_Destroy(keySpec);
123. return ret;
124. }
125. FreeEccKeyParams(&dataPkX, &dataPkY, &dataSk);
126. OH_CryptoKeyPair_Destroy(keyPair);
127. OH_CryptoAsymKeyGeneratorWithSpec_Destroy(generatorSpec);
128. OH_CryptoAsymKeySpec_Destroy(sm2CommonSpec);
129. OH_CryptoAsymKeySpec_Destroy(keySpec);
130. return ret;
131. }
```