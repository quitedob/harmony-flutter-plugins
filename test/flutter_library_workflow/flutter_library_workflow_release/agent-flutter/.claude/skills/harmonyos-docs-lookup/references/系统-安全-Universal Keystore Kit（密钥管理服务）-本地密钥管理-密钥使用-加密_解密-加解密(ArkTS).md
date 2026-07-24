以AES128、RSA2048和SM2为例，完成加解密。具体的场景介绍及支持的算法规格，请参考[加解密支持的算法](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-encryption-decryption-overview#支持的算法)。

## 开发步骤

**生成密钥**

1. 指定密钥别名，密钥别名命名规范参考[密钥生成介绍及算法规格](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-key-generation-overview)。
2. 初始化密钥属性集。
3. 调用[generateKeyItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-huks#huksgeneratekeyitem9)生成密钥，具体请参考[密钥生成](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-key-generation-overview)。

除此之外，开发者也可以参考[密钥导入](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-key-import-overview)，导入已有的密钥。

**加密**

1. 获取密钥别名。
2. 获取待加密的数据。
3. 使用[HuksParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-huks#huksparam)设置加密算法参数配置。

   文档中提供多个示例，当使用不同算法时，请注意配置对应参数。

   * 使用AES算法加密，选取的分组模式为CBC、填充模式为PKCS7时，参数IV必选，请见开发案例：[AES/CBC/PKCS7](/consumer/cn/doc/harmonyos-guides/huks-encryption-decryption-arkts#aescbcpkcs7)。
   * 使用AES算法加密，选取的分组模式为GCM时，参数NONCE可选，AAD可选，请见开发案例：[AES/GCM/NoPadding](/consumer/cn/doc/harmonyos-guides/huks-encryption-decryption-arkts#aesgcmnopadding)。
   * 使用AES算法加密，选取的分组模式为CCM时，参数NONCE可选，AAD可选，请见开发案例：[AES/CCM/NoPadding](/consumer/cn/doc/harmonyos-guides/huks-encryption-decryption-arkts#aesccmnopadding)。
   * 使用RSA算法加密，需要选择相对应的分组模式、填充模式以及摘要算法DIGEST，请见开发案例：[RSA/ECB/PKCS1\_V1\_5](/consumer/cn/doc/harmonyos-guides/huks-encryption-decryption-arkts#rsaecbpkcs1_v1_5)和[RSA/ECB/OAEP/SHA256](/consumer/cn/doc/harmonyos-guides/huks-encryption-decryption-arkts#rsaecboaepsha256)。
   * 使用SM2算法加密，摘要算法DIGEST需要指定为SM3，请见开发案例：[SM2](/consumer/cn/doc/harmonyos-guides/huks-encryption-decryption-arkts#sm2)。

   详细规格请参考[加密/解密介绍及算法规格](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-encryption-decryption-overview)。
4. 调用[initSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-huks#huksinitsession9)初始化密钥会话，并获取会话的句柄handle。
5. 调用[finishSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-huks#huksfinishsession9)结束密钥会话，获取加密后的密文。

**解密**

1. 获取密钥别名。
2. 获取待解密的密文。
3. 使用[HuksParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-huks#huksparam)设置解密算法参数配置。

   文档中提供多个示例，当使用不同算法时，请注意配置对应参数。

   * 使用AES算法解密，用例中选取的分组模式为GCM时，必须要填参数NONCE和参数AEAD，AAD可选，请见开发案例：[AES/GCM/NoPadding](/consumer/cn/doc/harmonyos-guides/huks-encryption-decryption-arkts#aesgcmnopadding)。
   * 其余示例参数与加密要求一致。

   详细规格请参考[加密/解密介绍及算法规格](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-encryption-decryption-overview)。
4. 调用[initSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-huks#huksinitsession9)初始化密钥会话，并获取会话的句柄handle。
5. 调用[finishSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-huks#huksfinishsession9)结束密钥会话，获取解密后的数据。

**删除密钥**

当密钥废弃不用时，需要调用[deleteKeyItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-huks#huksdeletekeyitem9)删除密钥，具体请参考[密钥删除](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-delete-key-arkts)。

## 开发案例

### AES/CBC/PKCS7

收起

自动换行

深色代码主题

复制

```
1. /*
2. * 以下以AES/CBC/PKCS7的Promise操作使用为例
3. */
4. import { huks } from '@kit.UniversalKeystoreKit';
5. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
6. import { BusinessError } from "@kit.BasicServicesKit";

8. let aesKeyAlias = 'test_aesKeyAlias';
9. let handle: number;
10. let plainText = '123456';
11. let IV = cryptoFramework.createRandom().generateRandomSync(12).data;
12. let cipherData: Uint8Array;

14. function StringToUint8Array(str: string) {
15. let arr: number[] = new Array();
16. for (let i = 0, j = str.length; i < j; ++i) {
17. arr.push(str.charCodeAt(i));
18. }
19. return new Uint8Array(arr);
20. }

22. function Uint8ArrayToString(fileData: Uint8Array) {
23. let dataString = '';
24. for (let i = 0; i < fileData.length; i++) {
25. dataString += String.fromCharCode(fileData[i]);
26. }
27. return dataString;
28. }

30. function GetAesGenerateProperties() {
31. let properties: Array<huks.HuksParam> = [{
32. tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
33. value: huks.HuksKeyAlg.HUKS_ALG_AES
34. }, {
35. tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
36. value: huks.HuksKeySize.HUKS_AES_KEY_SIZE_128
37. }, {
38. tag: huks.HuksTag.HUKS_TAG_PURPOSE,
39. value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_ENCRYPT |
40. huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_DECRYPT
41. }];
42. return properties;
43. }

45. function GetAesEncryptProperties() {
46. let properties: Array<huks.HuksParam> = [{
47. tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
48. value: huks.HuksKeyAlg.HUKS_ALG_AES
49. }, {
50. tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
51. value: huks.HuksKeySize.HUKS_AES_KEY_SIZE_128
52. }, {
53. tag: huks.HuksTag.HUKS_TAG_PURPOSE,
54. value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_ENCRYPT
55. }, {
56. tag: huks.HuksTag.HUKS_TAG_PADDING,
57. value: huks.HuksKeyPadding.HUKS_PADDING_PKCS7
58. }, {
59. tag: huks.HuksTag.HUKS_TAG_BLOCK_MODE,
60. value: huks.HuksCipherMode.HUKS_MODE_CBC
61. }, {
62. tag: huks.HuksTag.HUKS_TAG_IV,
63. value: IV
64. }];
65. return properties;
66. }

68. function GetAesDecryptProperties() {
69. let properties: Array<huks.HuksParam> = [{
70. tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
71. value: huks.HuksKeyAlg.HUKS_ALG_AES
72. }, {
73. tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
74. value: huks.HuksKeySize.HUKS_AES_KEY_SIZE_128
75. }, {
76. tag: huks.HuksTag.HUKS_TAG_PURPOSE,
77. value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_DECRYPT
78. }, {
79. tag: huks.HuksTag.HUKS_TAG_PADDING,
80. value: huks.HuksKeyPadding.HUKS_PADDING_PKCS7
81. }, {
82. tag: huks.HuksTag.HUKS_TAG_BLOCK_MODE,
83. value: huks.HuksCipherMode.HUKS_MODE_CBC
84. }, {
85. tag: huks.HuksTag.HUKS_TAG_IV,
86. value: IV
87. }];
88. return properties;
89. }

91. async function GenerateAesKey() {
92. /*
93. * 模拟生成密钥场景
94. * 1. 确定密钥别名
95. */
96. /*
97. * 2. 获取生成密钥算法参数配置
98. */
99. let genProperties = GetAesGenerateProperties();
100. let options: huks.HuksOptions = {
101. properties: genProperties
102. }
103. /*
104. * 3. 调用generateKeyItem
105. */
106. await huks.generateKeyItem(aesKeyAlias, options)
107. .then(() => {
108. console.info(`promise: generate AES Key success`);
109. }).catch((error: BusinessError) => {
110. console.error(`promise: generate AES Key failed, errCode : ${error.code}, errMsg : ${error.message}`);
111. })
112. }

114. async function EncryptData() {
115. /*
116. * 模拟加密场景
117. * 1. 获取密钥别名
118. */
119. /*
120. * 2. 获取待加密的数据
121. */
122. /*
123. * 3. 获取加密算法参数配置
124. */
125. let encryptProperties = GetAesEncryptProperties();
126. let options: huks.HuksOptions = {
127. properties: encryptProperties,
128. inData: StringToUint8Array(plainText)
129. }
130. /*
131. * 4. 调用initSession获取handle
132. */
133. await huks.initSession(aesKeyAlias, options)
134. .then((data) => {
135. handle = data.handle;
136. }).catch((error: BusinessError) => {
137. console.error(`promise: init EncryptData failed, errCode : ${error.code}, errMsg : ${error.message}`);
138. })
139. /*
140. * 5. 调用finishSession获取加密后的密文
141. */
142. await huks.finishSession(handle, options)
143. .then((data) => {
144. console.info(`promise: encrypt data success, data is ` + Uint8ArrayToString(data.outData as Uint8Array));
145. cipherData = data.outData as Uint8Array;
146. }).catch((error: BusinessError) => {
147. console.error(`promise: encrypt data failed, errCode : ${error.code}, errMsg : ${error.message}`);
148. })
149. }

151. async function DecryptData() {
152. /*
153. * 模拟解密场景
154. * 1. 获取密钥别名
155. */
156. /*
157. * 2. 获取待解密的密文
158. */
159. /*
160. * 3. 获取解密算法参数配置
161. */
162. let decryptOptions = GetAesDecryptProperties()
163. let options: huks.HuksOptions = {
164. properties: decryptOptions,
165. inData: cipherData
166. }
167. /*
168. * 4. 调用initSession获取handle
169. */
170. await huks.initSession(aesKeyAlias, options)
171. .then((data) => {
172. handle = data.handle;
173. }).catch((error: BusinessError) => {
174. console.error(`promise: init DecryptData failed, errCode : ${error.code}, errMsg : ${error.message}`);
175. })
176. /*
177. * 5. 调用finishSession获取解密后的数据
178. */
179. await huks.finishSession(handle, options)
180. .then((data) => {
181. console.info(`promise: decrypt data success, data is ` + Uint8ArrayToString(data.outData as Uint8Array));
182. }).catch((error: BusinessError) => {
183. console.error(`promise: decrypt data failed, errCode : ${error.code}, errMsg : ${error.message}`);
184. })
185. }

187. async function DeleteKey() {
188. /*
189. * 模拟删除密钥场景
190. * 1. 获取密钥别名
191. */
192. let emptyOptions: huks.HuksOptions = {
193. properties: []
194. }
195. /*
196. * 2. 调用deleteKeyItem删除密钥
197. */
198. await huks.deleteKeyItem(aesKeyAlias, emptyOptions)
199. .then(() => {
200. console.info(`promise: delete data success`);
201. }).catch((error: BusinessError) => {
202. console.error(`promise: delete data failed, errCode : ${error.code}, errMsg : ${error.message}`);
203. })
204. }

206. async function TestEncryptDecrypt() {
207. await GenerateAesKey();
208. await EncryptData();
209. await DecryptData();
210. await DeleteKey();
211. }
```

### AES/GCM/NoPadding

收起

自动换行

深色代码主题

复制

```
1. /*
2. * 以下以AES/GCM/NoPadding的Promise操作使用为例
3. */
4. import { huks } from '@kit.UniversalKeystoreKit';
5. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
6. import { BusinessError } from "@kit.BasicServicesKit";

8. let aesKeyAlias = 'test_aesKeyAlias';
9. let handle: number;
10. let plainText = '123456';
11. let cipherData: Uint8Array;
12. let AAD = '1234567890123456';
13. let NONCE = cryptoFramework.createRandom().generateRandomSync(12).data;

15. function StringToUint8Array(str: string) {
16. let arr: number[] = new Array();
17. for (let i = 0, j = str.length; i < j; ++i) {
18. arr.push(str.charCodeAt(i));
19. }
20. return new Uint8Array(arr);
21. }

23. function Uint8ArrayToString(fileData: Uint8Array) {
24. let dataString = '';
25. for (let i = 0; i < fileData.length; i++) {
26. dataString += String.fromCharCode(fileData[i]);
27. }
28. return dataString;
29. }

31. function GetAesGenerateProperties() {
32. let properties: Array<huks.HuksParam> = [{
33. tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
34. value: huks.HuksKeyAlg.HUKS_ALG_AES
35. }, {
36. tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
37. value: huks.HuksKeySize.HUKS_AES_KEY_SIZE_128
38. }, {
39. tag: huks.HuksTag.HUKS_TAG_PURPOSE,
40. value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_ENCRYPT |
41. huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_DECRYPT
42. }];
43. return properties;
44. }

46. function GetAesGcmEncryptProperties() {
47. let properties: Array<huks.HuksParam> = [{
48. tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
49. value: huks.HuksKeyAlg.HUKS_ALG_AES
50. }, {
51. tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
52. value: huks.HuksKeySize.HUKS_AES_KEY_SIZE_128
53. }, {
54. tag: huks.HuksTag.HUKS_TAG_PURPOSE,
55. value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_ENCRYPT
56. }, {
57. tag: huks.HuksTag.HUKS_TAG_PADDING,
58. value: huks.HuksKeyPadding.HUKS_PADDING_NONE
59. }, {
60. tag: huks.HuksTag.HUKS_TAG_BLOCK_MODE,
61. value: huks.HuksCipherMode.HUKS_MODE_GCM
62. }, {
63. tag: huks.HuksTag.HUKS_TAG_NONCE,
64. value: NONCE
65. }, {
66. tag: huks.HuksTag.HUKS_TAG_ASSOCIATED_DATA,
67. value: StringToUint8Array(AAD)
68. }];
69. return properties;
70. }

72. function GetAesGcmDecryptProperties(cipherData: Uint8Array) {
73. let properties: Array<huks.HuksParam> = [{
74. tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
75. value: huks.HuksKeyAlg.HUKS_ALG_AES
76. }, {
77. tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
78. value: huks.HuksKeySize.HUKS_AES_KEY_SIZE_128
79. }, {
80. tag: huks.HuksTag.HUKS_TAG_PURPOSE,
81. value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_DECRYPT
82. }, {
83. tag: huks.HuksTag.HUKS_TAG_PADDING,
84. value: huks.HuksKeyPadding.HUKS_PADDING_NONE
85. }, {
86. tag: huks.HuksTag.HUKS_TAG_BLOCK_MODE,
87. value: huks.HuksCipherMode.HUKS_MODE_GCM
88. }, {
89. tag: huks.HuksTag.HUKS_TAG_NONCE,
90. value: NONCE
91. }, {
92. tag: huks.HuksTag.HUKS_TAG_ASSOCIATED_DATA,
93. value: StringToUint8Array(AAD)
94. }, {
95. tag: huks.HuksTag.HUKS_TAG_AE_TAG,
96. value: cipherData.slice(cipherData.length - 16)
97. }];
98. return properties;
99. }

101. async function GenerateAesKey() {
102. /*
103. * 模拟生成密钥场景
104. * 1. 确定密钥别名
105. */
106. /*
107. * 2. 获取生成密钥算法参数配置
108. */
109. let genProperties = GetAesGenerateProperties();
110. let options: huks.HuksOptions = {
111. properties: genProperties
112. }
113. /*
114. * 3. 调用generateKeyItem
115. */
116. await huks.generateKeyItem(aesKeyAlias, options)
117. .then(() => {
118. console.info(`promise: generate AES Key success`);
119. }).catch((error: BusinessError) => {
120. console.error(`promise: generate AES Key failed, errCode : ${error.code}, errMsg : ${error.message}`);
121. })
122. }

124. async function EncryptData() {
125. /*
126. * 模拟加密场景
127. * 1. 获取密钥别名
128. */
129. /*
130. * 2. 获取待加密的数据
131. */
132. /*
133. * 3. 获取加密算法参数配置
134. */
135. let encryptProperties = GetAesGcmEncryptProperties();
136. let options: huks.HuksOptions = {
137. properties: encryptProperties,
138. inData: StringToUint8Array(plainText)
139. }
140. /*
141. * 4. 调用initSession获取handle
142. */
143. await huks.initSession(aesKeyAlias, options)
144. .then((data) => {
145. handle = data.handle;
146. }).catch((error: BusinessError) => {
147. console.error(`promise: init EncryptDataGcm failed, errCode : ${error.code}, errMsg : ${error.message}`);
148. })
149. /*
150. * 5. 调用finishSession获取加密后的密文
151. */
152. await huks.finishSession(handle, options)
153. .then((data) => {
154. console.info(`promise: encrypt data success, data is ` + Uint8ArrayToString(data.outData as Uint8Array));
155. cipherData = data.outData as Uint8Array;
156. }).catch((error: BusinessError) => {
157. console.error(`promise: encrypt data failed, errCode : ${error.code}, errMsg : ${error.message}`);
158. })
159. }

161. async function DecryptData() {
162. /*
163. * 模拟解密场景
164. * 1. 获取密钥别名
165. */
166. /*
167. * 2. 获取待解密的密文
168. */
169. /*
170. * 3. 获取解密算法参数配置
171. */
172. let decryptOptions = GetAesGcmDecryptProperties(cipherData)
173. let options: huks.HuksOptions = {
174. properties: decryptOptions,
175. inData: cipherData.slice(0, cipherData.length - 16)
176. }
177. /*
178. * 4. 调用initSession获取handle
179. */
180. await huks.initSession(aesKeyAlias, options)
181. .then((data) => {
182. handle = data.handle;
183. }).catch((error: BusinessError) => {
184. console.error(`promise: init DecryptDataGcm failed, errCode : ${error.code}, errMsg : ${error.message}`);
185. })
186. /*
187. * 5. 调用finishSession获取解密后的数据
188. */
189. await huks.finishSession(handle, options)
190. .then((data) => {
191. console.info(`promise: decrypt data success, data is ` + Uint8ArrayToString(data.outData as Uint8Array));
192. }).catch((error: BusinessError) => {
193. console.error(`promise: decrypt data failed, errCode : ${error.code}, errMsg : ${error.message}`);
194. })
195. }

197. async function DeleteKey() {
198. /*
199. * 模拟删除密钥场景
200. * 1. 获取密钥别名
201. */
202. let emptyOptions: huks.HuksOptions = {
203. properties: []
204. }
205. /*
206. * 2. 调用deleteKeyItem删除密钥
207. */
208. await huks.deleteKeyItem(aesKeyAlias, emptyOptions)
209. .then(() => {
210. console.info(`promise: delete data success`);
211. }).catch((error: BusinessError) => {
212. console.error(`promise: delete data failed, errCode : ${error.code}, errMsg : ${error.message}`);
213. })
214. }

216. async function TestEncryptDecrypt() {
217. await GenerateAesKey();
218. await EncryptData();
219. await DecryptData();
220. await DeleteKey();
221. }
```

### AES/CCM/NoPadding

收起

自动换行

深色代码主题

复制

```
1. /*
2. * 以下以AES/CCM/NoPadding的Promise操作使用为例
3. */
4. import { huks } from '@kit.UniversalKeystoreKit';
5. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
6. import { BusinessError } from "@kit.BasicServicesKit";

8. let aesKeyAlias = 'test_aesCcmKeyAlias';
9. let handle: number;
10. let plainText = '123456';
11. let cipherData: Uint8Array;
12. let AAD = '1234567890123456';
13. let NONCE = cryptoFramework.createRandom().generateRandomSync(12).data;
14. let aeadTagLen = 14;

16. function StringToUint8Array(str: string) {
17. let arr: number[] = new Array();
18. for (let i = 0, j = str.length; i < j; ++i) {
19. arr.push(str.charCodeAt(i));
20. }
21. return new Uint8Array(arr);
22. }

24. function Uint8ArrayToString(fileData: Uint8Array) {
25. let dataString = '';
26. for (let i = 0; i < fileData.length; i++) {
27. dataString += String.fromCharCode(fileData[i]);
28. }
29. return dataString;
30. }

32. function GetAesGenerateProperties() {
33. let properties: Array<huks.HuksParam> = [{
34. tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
35. value: huks.HuksKeyAlg.HUKS_ALG_AES
36. }, {
37. tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
38. value: huks.HuksKeySize.HUKS_AES_KEY_SIZE_128
39. }, {
40. tag: huks.HuksTag.HUKS_TAG_PURPOSE,
41. value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_ENCRYPT |
42. huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_DECRYPT
43. }];
44. return properties;
45. }

47. function GetAesCcmEncryptProperties() {
48. let properties: Array<huks.HuksParam> = [{
49. tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
50. value: huks.HuksKeyAlg.HUKS_ALG_AES
51. }, {
52. tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
53. value: huks.HuksKeySize.HUKS_AES_KEY_SIZE_128
54. }, {
55. tag: huks.HuksTag.HUKS_TAG_PURPOSE,
56. value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_ENCRYPT
57. }, {
58. tag: huks.HuksTag.HUKS_TAG_PADDING,
59. value: huks.HuksKeyPadding.HUKS_PADDING_NONE
60. }, {
61. tag: huks.HuksTag.HUKS_TAG_BLOCK_MODE,
62. value: huks.HuksCipherMode.HUKS_MODE_CCM
63. }, {
64. tag: huks.HuksTag.HUKS_TAG_NONCE,
65. value: NONCE
66. }, {
67. tag: huks.HuksTag.HUKS_TAG_ASSOCIATED_DATA,
68. value: StringToUint8Array(AAD)
69. }, {
70. tag: huks.HuksTag.HUKS_TAG_AE_TAG_LEN,
71. value: aeadTagLen
72. }];
73. return properties;
74. }

76. function GetAesCcmDecryptProperties(cipherData: Uint8Array) {
77. let properties: Array<huks.HuksParam> = [{
78. tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
79. value: huks.HuksKeyAlg.HUKS_ALG_AES
80. }, {
81. tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
82. value: huks.HuksKeySize.HUKS_AES_KEY_SIZE_128
83. }, {
84. tag: huks.HuksTag.HUKS_TAG_PURPOSE,
85. value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_DECRYPT
86. }, {
87. tag: huks.HuksTag.HUKS_TAG_PADDING,
88. value: huks.HuksKeyPadding.HUKS_PADDING_NONE
89. }, {
90. tag: huks.HuksTag.HUKS_TAG_BLOCK_MODE,
91. value: huks.HuksCipherMode.HUKS_MODE_CCM
92. }, {
93. tag: huks.HuksTag.HUKS_TAG_NONCE,
94. value: NONCE
95. }, {
96. tag: huks.HuksTag.HUKS_TAG_ASSOCIATED_DATA,
97. value: StringToUint8Array(AAD)
98. }, {
99. tag: huks.HuksTag.HUKS_TAG_AE_TAG,
100. value: cipherData.slice(cipherData.length - aeadTagLen)
101. }, {
102. tag: huks.HuksTag.HUKS_TAG_AE_TAG_LEN,
103. value: aeadTagLen
104. }];
105. return properties;
106. }

108. async function GenerateAesKey() {
109. /*
110. * 模拟生成密钥场景
111. * 1. 确定密钥别名
112. */
113. /*
114. * 2. 获取生成密钥算法参数配置
115. */
116. let genProperties = GetAesGenerateProperties();
117. let options: huks.HuksOptions = {
118. properties: genProperties
119. }
120. /*
121. * 3. 调用generateKeyItem
122. */
123. await huks.generateKeyItem(aesKeyAlias, options)
124. .then(() => {
125. console.info(`promise: generate AES Key success`);
126. }).catch((error: BusinessError) => {
127. console.error(`promise: generate AES Key failed, errCode : ${error.code}, errMsg : ${error.message}`);
128. })
129. }

131. async function EncryptData() {
132. /*
133. * 模拟加密场景
134. * 1. 获取密钥别名
135. */
136. /*
137. * 2. 获取待加密的数据
138. */
139. /*
140. * 3. 获取加密算法参数配置
141. */
142. let encryptProperties = GetAesCcmEncryptProperties();
143. let options: huks.HuksOptions = {
144. properties: encryptProperties,
145. inData: StringToUint8Array(plainText)
146. }
147. /*
148. * 4. 调用initSession获取handle
149. */
150. await huks.initSession(aesKeyAlias, options)
151. .then((data) => {
152. handle = data.handle;
153. }).catch((error: BusinessError) => {
154. console.error(`promise: init EncryptDataCcm failed, errCode : ${error.code}, errMsg : ${error.message}`);
155. })
156. /*
157. * 5. 调用finishSession获取加密后的密文
158. */
159. await huks.finishSession(handle, options)
160. .then((data) => {
161. console.info(`promise: encrypt data success, data is ` + Uint8ArrayToString(data.outData as Uint8Array));
162. cipherData = data.outData as Uint8Array;
163. }).catch((error: BusinessError) => {
164. console.error(`promise: encrypt data failed, errCode : ${error.code}, errMsg : ${error.message}`);
165. })
166. }

168. async function DecryptData() {
169. /*
170. * 模拟解密场景
171. * 1. 获取密钥别名
172. */
173. /*
174. * 2. 获取待解密的密文
175. */
176. /*
177. * 3. 获取解密算法参数配置
178. */
179. let decryptOptions = GetAesCcmDecryptProperties(cipherData)
180. let options: huks.HuksOptions = {
181. properties: decryptOptions,
182. inData: cipherData.slice(0, cipherData.length - aeadTagLen)
183. }
184. /*
185. * 4. 调用initSession获取handle
186. */
187. await huks.initSession(aesKeyAlias, options)
188. .then((data) => {
189. handle = data.handle;
190. }).catch((error: BusinessError) => {
191. console.error(`promise: init DecryptDataCcm failed, errCode : ${error.code}, errMsg : ${error.message}`);
192. })
193. /*
194. * 5. 调用finishSession获取解密后的数据
195. */
196. await huks.finishSession(handle, options)
197. .then((data) => {
198. console.info(`promise: decrypt data success, data is ` + Uint8ArrayToString(data.outData as Uint8Array));
199. }).catch((error: BusinessError) => {
200. console.error(`promise: decrypt data failed, errCode : ${error.code}, errMsg : ${error.message}`);
201. })
202. }

204. async function DeleteKey() {
205. /*
206. * 模拟删除密钥场景
207. * 1. 获取密钥别名
208. */
209. let emptyOptions: huks.HuksOptions = {
210. properties: []
211. }
212. /*
213. * 2. 调用deleteKeyItem删除密钥
214. */
215. await huks.deleteKeyItem(aesKeyAlias, emptyOptions)
216. .then(() => {
217. console.info(`promise: delete data success`);
218. }).catch((error: BusinessError) => {
219. console.error(`promise: delete data failed, errCode : ${error.code}, errMsg : ${error.message}`);
220. })
221. }

223. async function TestEncryptDecrypt() {
224. await GenerateAesKey();
225. await EncryptData();
226. await DecryptData();
227. await DeleteKey();
228. }
```

### RSA/ECB/PKCS1\_V1\_5

收起

自动换行

深色代码主题

复制

```
1. /*
2. * 以下以RSA/ECB/PKCS1_V1_5模式的Promise操作使用为例
3. */
4. import { huks } from '@kit.UniversalKeystoreKit';
5. import { BusinessError } from "@kit.BasicServicesKit";

7. let rsaKeyAlias = 'test_rsaKeyAlias';
8. let handle: number;
9. let plainText = '123456';
10. let cipherData: Uint8Array;

12. function StringToUint8Array(str: string) {
13. let arr: number[] = new Array();
14. for (let i = 0, j = str.length; i < j; ++i) {
15. arr.push(str.charCodeAt(i));
16. }
17. return new Uint8Array(arr);
18. }

20. function Uint8ArrayToString(fileData: Uint8Array) {
21. let dataString = '';
22. for (let i = 0; i < fileData.length; i++) {
23. dataString += String.fromCharCode(fileData[i]);
24. }
25. return dataString;
26. }

28. function GetRsaGenerateProperties() {
29. let properties: Array<huks.HuksParam> = [{
30. tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
31. value: huks.HuksKeyAlg.HUKS_ALG_RSA
32. }, {
33. tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
34. value: huks.HuksKeySize.HUKS_RSA_KEY_SIZE_2048
35. }, {
36. tag: huks.HuksTag.HUKS_TAG_PURPOSE,
37. value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_ENCRYPT |
38. huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_DECRYPT
39. }];
40. return properties;
41. }

43. function GetRsaEncryptProperties() {
44. let properties: Array<huks.HuksParam> = [{
45. tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
46. value: huks.HuksKeyAlg.HUKS_ALG_RSA
47. }, {
48. tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
49. value: huks.HuksKeySize.HUKS_RSA_KEY_SIZE_2048
50. }, {
51. tag: huks.HuksTag.HUKS_TAG_PURPOSE,
52. value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_ENCRYPT
53. }, {
54. tag: huks.HuksTag.HUKS_TAG_PADDING,
55. value: huks.HuksKeyPadding.HUKS_PADDING_PKCS1_V1_5
56. }, {
57. tag: huks.HuksTag.HUKS_TAG_BLOCK_MODE,
58. value: huks.HuksCipherMode.HUKS_MODE_ECB
59. }, {
60. tag: huks.HuksTag.HUKS_TAG_DIGEST,
61. value: huks.HuksKeyDigest.HUKS_DIGEST_NONE
62. }];
63. return properties;
64. }

66. function GetRsaDecryptProperties() {
67. let properties: Array<huks.HuksParam> = [{
68. tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
69. value: huks.HuksKeyAlg.HUKS_ALG_RSA
70. }, {
71. tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
72. value: huks.HuksKeySize.HUKS_RSA_KEY_SIZE_2048
73. }, {
74. tag: huks.HuksTag.HUKS_TAG_PURPOSE,
75. value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_DECRYPT
76. }, {
77. tag: huks.HuksTag.HUKS_TAG_PADDING,
78. value: huks.HuksKeyPadding.HUKS_PADDING_PKCS1_V1_5
79. }, {
80. tag: huks.HuksTag.HUKS_TAG_BLOCK_MODE,
81. value: huks.HuksCipherMode.HUKS_MODE_ECB
82. }, {
83. tag: huks.HuksTag.HUKS_TAG_DIGEST,
84. value: huks.HuksKeyDigest.HUKS_DIGEST_NONE
85. }];
86. return properties;
87. }

89. async function GenerateRsaKey() {
90. /*
91. * 模拟生成密钥场景
92. * 1. 确定密钥别名
93. */
94. /*
95. * 2. 获取生成密钥算法参数配置
96. */
97. let genProperties = GetRsaGenerateProperties();
98. let options: huks.HuksOptions = {
99. properties: genProperties
100. }
101. /*
102. * 3. 调用generateKeyItem
103. */
104. await huks.generateKeyItem(rsaKeyAlias, options)
105. .then(() => {
106. console.info(`promise: generate RSA Key success`);
107. }).catch((error: BusinessError) => {
108. console.error(`promise: generate RSA Key failed, errCode : ${error.code}, errMsg : ${error.message}`);
109. })
110. }

112. async function EncryptData() {
113. /*
114. * 模拟加密场景
115. * 1. 获取密钥别名
116. */
117. /*
118. * 2. 获取待加密的数据
119. */
120. /*
121. * 3. 获取加密算法参数配置
122. */
123. let encryptProperties = GetRsaEncryptProperties();
124. let options: huks.HuksOptions = {
125. properties: encryptProperties,
126. inData: StringToUint8Array(plainText)
127. }
128. /*
129. * 4. 调用initSession获取handle
130. */
131. await huks.initSession(rsaKeyAlias, options)
132. .then((data) => {
133. handle = data.handle;
134. }).catch((error: BusinessError) => {
135. console.error(`promise: init EncryptDataRsa failed, errCode : ${error.code}, errMsg : ${error.message}`);
136. })
137. /*
138. * 5. 调用finishSession获取加密后的密文
139. */
140. await huks.finishSession(handle, options)
141. .then((data) => {
142. console.info(`promise: encrypt data success, data is ` + Uint8ArrayToString(data.outData as Uint8Array));
143. cipherData = data.outData as Uint8Array;
144. }).catch((error: BusinessError) => {
145. console.error(`promise: encrypt data failed, errCode : ${error.code}, errMsg : ${error.message}`);
146. })
147. }

149. async function DecryptData() {
150. /*
151. * 模拟解密场景
152. * 1. 获取密钥别名
153. */
154. /*
155. * 2. 获取待解密的密文
156. */
157. /*
158. * 3. 获取解密算法参数配置
159. */
160. let decryptOptions = GetRsaDecryptProperties()
161. let options: huks.HuksOptions = {
162. properties: decryptOptions,
163. inData: cipherData
164. }
165. /*
166. * 4. 调用initSession获取handle
167. */
168. await huks.initSession(rsaKeyAlias, options)
169. .then((data) => {
170. handle = data.handle;
171. }).catch((error: BusinessError) => {
172. console.error(`promise: init DecryptDataRsa failed, errCode : ${error.code}, errMsg : ${error.message}`);
173. })
174. /*
175. * 5. 调用finishSession获取解密后的数据
176. */
177. await huks.finishSession(handle, options)
178. .then((data) => {
179. console.info(`promise: decrypt data success, data is ` + Uint8ArrayToString(data.outData as Uint8Array));
180. }).catch((error: BusinessError) => {
181. console.error(`promise: decrypt data failed, errCode : ${error.code}, errMsg : ${error.message}`);
182. })
183. }

185. async function DeleteKey() {
186. /*
187. * 模拟删除密钥场景
188. * 1. 获取密钥别名
189. */
190. let emptyOptions: huks.HuksOptions = {
191. properties: []
192. }
193. /*
194. * 2. 调用deleteKeyItem删除密钥
195. */
196. await huks.deleteKeyItem(rsaKeyAlias, emptyOptions)
197. .then(() => {
198. console.info(`promise: delete data success`);
199. }).catch((error: BusinessError) => {
200. console.error(`promise: delete data failed, errCode : ${error.code}, errMsg : ${error.message}`);
201. })
202. }

204. async function TestEncryptDecrypt()
205. {
206. await GenerateRsaKey();
207. await EncryptData();
208. await DecryptData();
209. await DeleteKey();
210. }
```

### RSA/ECB/OAEP/SHA256

收起

自动换行

深色代码主题

复制

```
1. /*
2. * 以下以RSA/ECB/OAEP/SHA256模式的Promise操作使用为例
3. */
4. import { huks } from '@kit.UniversalKeystoreKit';
5. import { BusinessError } from "@kit.BasicServicesKit";

7. let rsaKeyAlias = 'test_rsaKeyAlias';
8. let handle: number;
9. let plainText = '123456';
10. let cipherData: Uint8Array;

12. function StringToUint8Array(str: string) {
13. let arr: number[] = new Array();
14. for (let i = 0, j = str.length; i < j; ++i) {
15. arr.push(str.charCodeAt(i));
16. }
17. return new Uint8Array(arr);
18. }

20. function Uint8ArrayToString(fileData: Uint8Array) {
21. let dataString = '';
22. for (let i = 0; i < fileData.length; i++) {
23. dataString += String.fromCharCode(fileData[i]);
24. }
25. return dataString;
26. }

28. function GetRsaGenerateProperties() {
29. let properties: Array<huks.HuksParam> = [{
30. tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
31. value: huks.HuksKeyAlg.HUKS_ALG_RSA
32. }, {
33. tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
34. value: huks.HuksKeySize.HUKS_RSA_KEY_SIZE_2048
35. }, {
36. tag: huks.HuksTag.HUKS_TAG_PURPOSE,
37. value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_ENCRYPT |
38. huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_DECRYPT
39. }];
40. return properties;
41. }

43. function GetRsaEncryptProperties() {
44. let properties: Array<huks.HuksParam> = [{
45. tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
46. value: huks.HuksKeyAlg.HUKS_ALG_RSA
47. }, {
48. tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
49. value: huks.HuksKeySize.HUKS_RSA_KEY_SIZE_2048
50. }, {
51. tag: huks.HuksTag.HUKS_TAG_PURPOSE,
52. value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_ENCRYPT
53. }, {
54. tag: huks.HuksTag.HUKS_TAG_PADDING,
55. value: huks.HuksKeyPadding.HUKS_PADDING_OAEP
56. }, {
57. tag: huks.HuksTag.HUKS_TAG_BLOCK_MODE,
58. value: huks.HuksCipherMode.HUKS_MODE_ECB
59. }, {
60. tag: huks.HuksTag.HUKS_TAG_DIGEST,
61. value: huks.HuksKeyDigest.HUKS_DIGEST_SHA256
62. }];
63. return properties;
64. }

66. function GetRsaDecryptProperties() {
67. let properties: Array<huks.HuksParam> = [{
68. tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
69. value: huks.HuksKeyAlg.HUKS_ALG_RSA
70. }, {
71. tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
72. value: huks.HuksKeySize.HUKS_RSA_KEY_SIZE_2048
73. }, {
74. tag: huks.HuksTag.HUKS_TAG_PURPOSE,
75. value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_DECRYPT
76. }, {
77. tag: huks.HuksTag.HUKS_TAG_PADDING,
78. value: huks.HuksKeyPadding.HUKS_PADDING_OAEP
79. }, {
80. tag: huks.HuksTag.HUKS_TAG_BLOCK_MODE,
81. value: huks.HuksCipherMode.HUKS_MODE_ECB
82. }, {
83. tag: huks.HuksTag.HUKS_TAG_DIGEST,
84. value: huks.HuksKeyDigest.HUKS_DIGEST_SHA256
85. }];
86. return properties;
87. }

89. async function GenerateRsaKey() {
90. /*
91. * 模拟生成密钥场景
92. * 1. 确定密钥别名
93. */
94. /*
95. * 2. 获取生成密钥算法参数配置
96. */
97. let genProperties = GetRsaGenerateProperties();
98. let options: huks.HuksOptions = {
99. properties: genProperties
100. }
101. /*
102. * 3. 调用generateKeyItem
103. */
104. await huks.generateKeyItem(rsaKeyAlias, options)
105. .then(() => {
106. console.info(`promise: generate RSA Key success`);
107. }).catch((error: BusinessError) => {
108. console.error(`promise: generate RSA Key failed, errCode : ${error.code}, errMsg : ${error.message}`);
109. })
110. }

112. async function EncryptData() {
113. /*
114. * 模拟加密场景
115. * 1. 获取密钥别名
116. */
117. /*
118. * 2. 获取待加密的数据
119. */
120. /*
121. * 3. 获取加密算法参数配置
122. */
123. let encryptProperties = GetRsaEncryptProperties();
124. let options: huks.HuksOptions = {
125. properties: encryptProperties,
126. inData: StringToUint8Array(plainText)
127. }
128. /*
129. * 4. 调用initSession获取handle
130. */
131. await huks.initSession(rsaKeyAlias, options)
132. .then((data) => {
133. handle = data.handle;
134. }).catch((error: BusinessError) => {
135. console.error(`promise: init EncryptDataRsa failed, errCode : ${error.code}, errMsg : ${error.message}`);
136. })
137. /*
138. * 5. 调用finishSession获取加密后的密文
139. */
140. await huks.finishSession(handle, options)
141. .then((data) => {
142. console.info(`promise: encrypt data success, data is ` + Uint8ArrayToString(data.outData as Uint8Array));
143. cipherData = data.outData as Uint8Array;
144. }).catch((error: BusinessError) => {
145. console.error(`promise: encrypt data failed, errCode : ${error.code}, errMsg : ${error.message}`);
146. })
147. }

149. async function DecryptData() {
150. /*
151. * 模拟解密场景
152. * 1. 获取密钥别名
153. */
154. /*
155. * 2. 获取待解密的密文
156. */
157. /*
158. * 3. 获取解密算法参数配置
159. */
160. let decryptOptions = GetRsaDecryptProperties()
161. let options: huks.HuksOptions = {
162. properties: decryptOptions,
163. inData: cipherData
164. }
165. /*
166. * 4. 调用initSession获取handle
167. */
168. await huks.initSession(rsaKeyAlias, options)
169. .then((data) => {
170. handle = data.handle;
171. }).catch((error: BusinessError) => {
172. console.error(`promise: init DecryptDataRsa failed, errCode : ${error.code}, errMsg : ${error.message}`);
173. })
174. /*
175. * 5. 调用finishSession获取解密后的数据
176. */
177. await huks.finishSession(handle, options)
178. .then((data) => {
179. console.info(`promise: decrypt data success, data is ` + Uint8ArrayToString(data.outData as Uint8Array));
180. }).catch((error: BusinessError) => {
181. console.error(`promise: decrypt data failed, errCode : ${error.code}, errMsg : ${error.message}`);
182. })
183. }

185. async function DeleteKey() {
186. /*
187. * 模拟删除密钥场景
188. * 1. 获取密钥别名
189. */
190. let emptyOptions: huks.HuksOptions = {
191. properties: []
192. }
193. /*
194. * 2. 调用deleteKeyItem删除密钥
195. */
196. await huks.deleteKeyItem(rsaKeyAlias, emptyOptions)
197. .then((data) => {
198. console.info(`promise: delete data success`);
199. }).catch((error: BusinessError) => {
200. console.error(`promise: delete data failed, errCode : ${error.code}, errMsg : ${error.message}`);
201. })
202. }

204. async function TestEncryptDecrypt() {
205. await GenerateRsaKey();
206. await EncryptData();
207. await DecryptData();
208. await DeleteKey();
209. }
```

### SM2

收起

自动换行

深色代码主题

复制

```
1. /*
2. * 以下以SM2模式的Promise操作使用为例
3. */
4. import { huks } from '@kit.UniversalKeystoreKit';
5. import { BusinessError } from "@kit.BasicServicesKit";

7. let sm2KeyAlias = 'test_sm2KeyAlias';
8. let handle: number;
9. let plainText = '123456';
10. let cipherData: Uint8Array;

12. function StringToUint8Array(str: string) {
13. let arr: number[] = new Array();
14. for (let i = 0, j = str.length; i < j; ++i) {
15. arr.push(str.charCodeAt(i));
16. }
17. return new Uint8Array(arr);
18. }

20. function Uint8ArrayToString(fileData: Uint8Array) {
21. let dataString = '';
22. for (let i = 0; i < fileData.length; i++) {
23. dataString += String.fromCharCode(fileData[i]);
24. }
25. return dataString;
26. }

28. function GetSm2GenerateProperties() {
29. let properties: Array<huks.HuksParam> = [{
30. tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
31. value: huks.HuksKeyAlg.HUKS_ALG_SM2
32. }, {
33. tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
34. value: huks.HuksKeySize.HUKS_SM2_KEY_SIZE_256
35. }, {
36. tag: huks.HuksTag.HUKS_TAG_PURPOSE,
37. value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_ENCRYPT |
38. huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_DECRYPT
39. }];
40. return properties;
41. }

43. function GetSm2EncryptProperties() {
44. let properties: Array<huks.HuksParam> = [{
45. tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
46. value: huks.HuksKeyAlg.HUKS_ALG_SM2
47. }, {
48. tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
49. value: huks.HuksKeySize.HUKS_SM2_KEY_SIZE_256
50. }, {
51. tag: huks.HuksTag.HUKS_TAG_PURPOSE,
52. value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_ENCRYPT
53. }, {
54. tag: huks.HuksTag.HUKS_TAG_DIGEST,
55. value: huks.HuksKeyDigest.HUKS_DIGEST_SM3
56. }];
57. return properties;
58. }

60. function GetSm2DecryptProperties() {
61. let properties: Array<huks.HuksParam> = [{
62. tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
63. value: huks.HuksKeyAlg.HUKS_ALG_SM2
64. }, {
65. tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
66. value: huks.HuksKeySize.HUKS_SM2_KEY_SIZE_256
67. }, {
68. tag: huks.HuksTag.HUKS_TAG_PURPOSE,
69. value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_DECRYPT
70. }, {
71. tag: huks.HuksTag.HUKS_TAG_DIGEST,
72. value: huks.HuksKeyDigest.HUKS_DIGEST_SM3
73. }];
74. return properties;
75. }

77. async function GenerateSm2Key() {
78. /*
79. * 模拟生成密钥场景
80. * 1. 确定密钥别名
81. */
82. /*
83. * 2. 获取生成密钥算法参数配置
84. */
85. let genProperties = GetSm2GenerateProperties();
86. let options: huks.HuksOptions = {
87. properties: genProperties
88. }
89. /*
90. * 3. 调用generateKeyItem
91. */
92. await huks.generateKeyItem(sm2KeyAlias, options)
93. .then(() => {
94. console.info(`promise: generate SM2 Key success`);
95. }).catch((error: BusinessError) => {
96. console.error(`promise: generate SM2 Key failed, errCode : ${error.code}, errMsg : ${error.message}`);
97. })
98. }

100. async function EncryptDataSm2() {
101. /*
102. * 模拟加密场景
103. * 1. 获取密钥别名
104. */
105. /*
106. * 2. 获取待加密的数据
107. */
108. /*
109. * 3. 获取加密算法参数配置
110. */
111. let encryptProperties = GetSm2EncryptProperties();
112. let options: huks.HuksOptions = {
113. properties: encryptProperties,
114. inData: StringToUint8Array(plainText)
115. }
116. /*
117. * 4. 调用initSession获取handle
118. */
119. await huks.initSession(sm2KeyAlias, options)
120. .then((data) => {
121. handle = data.handle;
122. }).catch((error: BusinessError) => {
123. console.error(`promise: init EncryptDataSm2 failed, errCode : ${error.code}, errMsg : ${error.message}`);
124. })
125. /*
126. * 5. 调用finishSession获取加密后的密文
127. */
128. await huks.finishSession(handle, options)
129. .then((data) => {
130. console.info(`promise: encrypt data success, data is ` + Uint8ArrayToString(data.outData as Uint8Array));
131. cipherData = data.outData as Uint8Array;
132. }).catch((error: BusinessError) => {
133. console.error(`promise: encrypt data failed, errCode : ${error.code}, errMsg : ${error.message}`);
134. })
135. }

137. async function DecryptDataSm2() {
138. /*
139. * 模拟解密场景
140. * 1. 获取密钥别名
141. */
142. /*
143. * 2. 获取待解密的密文
144. */
145. /*
146. * 3. 获取解密算法参数配置
147. */
148. let decryptOptions = GetSm2DecryptProperties()
149. let options: huks.HuksOptions = {
150. properties: decryptOptions,
151. inData: cipherData
152. }
153. /*
154. * 4. 调用initSession获取handle
155. */
156. await huks.initSession(sm2KeyAlias, options)
157. .then((data) => {
158. handle = data.handle;
159. }).catch((error: BusinessError) => {
160. console.error(`promise: init DecryptDataSm2 failed, errCode : ${error.code}, errMsg : ${error.message}`);
161. })
162. /*
163. * 5. 调用finishSession获取解密后的数据
164. */
165. await huks.finishSession(handle, options)
166. .then((data) => {
167. console.info(`promise: decrypt data success, data is ` + Uint8ArrayToString(data.outData as Uint8Array));
168. }).catch((error: BusinessError) => {
169. console.error(`promise: decrypt data failed, errCode : ${error.code}, errMsg : ${error.message}`);
170. })
171. }

173. async function DeleteKey() {
174. /*
175. * 模拟删除密钥场景
176. * 1. 获取密钥别名
177. */
178. let emptyOptions: huks.HuksOptions = {
179. properties: []
180. }
181. /*
182. * 2. 调用deleteKeyItem删除密钥
183. */
184. await huks.deleteKeyItem(sm2KeyAlias, emptyOptions)
185. .then(() => {
186. console.info(`promise: delete data success`);
187. }).catch((error: BusinessError) => {
188. console.error(`promise: delete data failed, errCode : ${error.code}, errMsg : ${error.message}`);
189. })
190. }

192. async function TestEncryptDecrypt() {
193. await GenerateSm2Key();
194. await EncryptDataSm2();
195. await DecryptDataSm2();
196. await DeleteKey();
197. }
```