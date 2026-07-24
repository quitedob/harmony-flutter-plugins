以X25519，DH和ECDH三个协商密钥类型为例，在密钥由HUKS管理的情况下，完成密钥协商。具体的场景介绍及支持的算法规格，请参考[密钥协商支持的算法](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-key-agreement-overview#支持的算法)。

## 开发步骤

**生成密钥**

设备A、设备B各自生成一个非对称密钥，具体请参考[密钥生成](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-key-generation-overview)或[密钥导入](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-key-import-overview)。

密钥生成时，可指定参数[HUKS\_TAG\_DERIVED\_AGREED\_KEY\_STORAGE\_FLAG](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-huks#hukstag)（可选），用于标识基于该密钥协商出的密钥是否由HUKS管理。

* 当TAG设置为[HUKS\_STORAGE\_ONLY\_USED\_IN\_HUKS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-huks#hukskeystoragetype)时，表示基于该密钥协商出的密钥，由HUKS管理，可保证协商密钥全生命周期不出安全环境。
* 当TAG设置为[HUKS\_STORAGE\_KEY\_EXPORT\_ALLOWED](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-huks#hukskeystoragetype)时，表示基于该密钥协商出的密钥，返回给调用方管理，由业务自行保证密钥安全。
* 若业务未设置TAG的具体值，表示基于该密钥协商出的密钥，可由HUKS管理，也可返回给调用方管理，业务可在后续协商时再选择使用何种方式保护密钥。

**导出密钥**

设备A、B导出非对称密钥对的公钥材料，具体请参考[密钥导出](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-export-key-arkts)。

**密钥协商**

设备A、B分别基于本端私钥和对端设备的公钥，协商出共享密钥。

密钥协商时，可指定参数HUKS\_TAG\_DERIVED\_AGREED\_KEY\_STORAGE\_FLAG（可选），用于标识协商得到的密钥是否由HUKS管理。

展开

| 生成 | 协商 | 规格 |
| --- | --- | --- |
| HUKS\_STORAGE\_ONLY\_USED\_IN\_HUKS | HUKS\_STORAGE\_ONLY\_USED\_IN\_HUKS | 密钥由HUKS管理 |
| HUKS\_STORAGE\_KEY\_EXPORT\_ALLOWED | HUKS\_STORAGE\_KEY\_EXPORT\_ALLOWED | 密钥返回给调用方管理 |
| 未指定TAG具体值 | HUKS\_STORAGE\_ONLY\_USED\_IN\_HUKS | 密钥由HUKS管理 |
| 未指定TAG具体值 | HUKS\_STORAGE\_KEY\_EXPORT\_ALLOWED | 密钥返回给调用方管理 |
| 未指定TAG具体值 | 未指定TAG具体值 | 密钥返回给调用方管理 |

注：协商时指定的TAG值，不可与生成时指定的TAG值冲突。表格中仅列举有效的指定方式。

**删除密钥**

当密钥废弃不用时，设备A、B均需要删除密钥，具体请参考[密钥删除](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-delete-key-arkts)。

## 开发案例

下面分别以X25519、DH和ECDH密钥为例，进行协商。

### X25519非对称密钥协商用例

准备X25519密钥协商材料：

收起

自动换行

深色代码主题

复制

```
1. /*
2. * 以下以X25519密钥的Promise操作使用为例
3. */
4. import { huks } from '@kit.UniversalKeystoreKit';
5. import { BusinessError } from '@kit.BasicServicesKit';

7. function stringToUint8Array(str: string) {
8. let arr: number[] = [];
9. for (let i = 0, j = str.length; i < j; ++i) {
10. arr.push(str.charCodeAt(i));
11. }
12. return new Uint8Array(arr);
13. }

15. function uint8ArrayToString(fileData: Uint8Array) {
16. let dataString = '';
17. for (let i = 0; i < fileData.length; i++) {
18. dataString += String.fromCharCode(fileData[i]);
19. }
20. return dataString;
21. }

23. /*
24. * 确定密钥别名和封装密钥属性参数集
25. */
26. let srcKeyAliasFirst = 'AgreeX25519KeyFirstAlias';
27. let srcKeyAliasSecond = 'AgreeX25519KeySecondAlias';
28. let agreeX25519InData = 'AgreeX25519TestIndata';
29. let finishOutData: Uint8Array;
30. let handle: number;
31. let exportKey: Uint8Array;
32. let exportKeyFirst: Uint8Array;
33. let exportKeySecond: Uint8Array;
34. /* 集成生成密钥参数集 */
35. let properties: huks.HuksParam[] = [{
36. tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
37. value: huks.HuksKeyAlg.HUKS_ALG_X25519,
38. }, {
39. tag: huks.HuksTag.HUKS_TAG_PURPOSE,
40. value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_AGREE,
41. }, {
42. tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
43. value: huks.HuksKeySize.HUKS_CURVE25519_KEY_SIZE_256,
44. }, {
45. tag: huks.HuksTag.HUKS_TAG_DIGEST,
46. value: huks.HuksKeyDigest.HUKS_DIGEST_NONE,
47. }, {
48. tag: huks.HuksTag.HUKS_TAG_PADDING,
49. value: huks.HuksKeyPadding.HUKS_PADDING_NONE,
50. }, {
51. tag: huks.HuksTag.HUKS_TAG_BLOCK_MODE,
52. value: huks.HuksCipherMode.HUKS_MODE_CBC,
53. }, {
54. tag: huks.HuksTag.HUKS_TAG_DERIVED_AGREED_KEY_STORAGE_FLAG,
55. value: huks.HuksKeyStorageType.HUKS_STORAGE_ONLY_USED_IN_HUKS,
56. }
57. ];
58. let huksOptions: huks.HuksOptions = {
59. properties: properties,
60. inData: new Uint8Array([])
61. }
62. /* 集成第一个协商参数集 */
63. const finishProperties: huks.HuksParam[] = [{
64. tag: huks.HuksTag.HUKS_TAG_DERIVED_AGREED_KEY_STORAGE_FLAG,
65. value: huks.HuksKeyStorageType.HUKS_STORAGE_ONLY_USED_IN_HUKS,
66. }, {
67. tag: huks.HuksTag.HUKS_TAG_IS_KEY_ALIAS,
68. value: true
69. }, {
70. tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
71. value: huks.HuksKeyAlg.HUKS_ALG_AES,
72. }, {
73. tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
74. value: huks.HuksKeySize.HUKS_AES_KEY_SIZE_256,
75. }, {
76. tag: huks.HuksTag.HUKS_TAG_PURPOSE,
77. value:
78. huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_ENCRYPT |
79. huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_DECRYPT,
80. }, {
81. tag: huks.HuksTag.HUKS_TAG_DIGEST,
82. value: huks.HuksKeyDigest.HUKS_DIGEST_NONE,
83. }, {
84. tag: huks.HuksTag.HUKS_TAG_PADDING,
85. value: huks.HuksKeyPadding.HUKS_PADDING_NONE,
86. }, {
87. tag: huks.HuksTag.HUKS_TAG_BLOCK_MODE,
88. value: huks.HuksCipherMode.HUKS_MODE_ECB,
89. }
90. ];
91. let finishOptionsFirst: huks.HuksOptions = {
92. properties: [
93. ...finishProperties, {
94. tag: huks.HuksTag.HUKS_TAG_KEY_ALIAS,
95. value: stringToUint8Array(srcKeyAliasFirst + 'final'),
96. }],
97. inData: stringToUint8Array(agreeX25519InData)
98. }
99. /* 集成第二个协商参数集 */
100. let finishOptionsSecond: huks.HuksOptions = {
101. properties: [
102. ...finishProperties, {
103. tag: huks.HuksTag.HUKS_TAG_KEY_ALIAS,
104. value: stringToUint8Array(srcKeyAliasSecond + 'final'),
105. }],
106. inData: stringToUint8Array(agreeX25519InData)
107. }
```

[X25519.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Security/UniversalKeystoreKit/KeyUsage/KeyExchange/entry/src/main/ets/pages/X25519.ets#L15-L124)

执行密钥协商：

收起

自动换行

深色代码主题

复制

```
1. /* 生成密钥 */
2. async function generateKeyItem(keyAlias: string, huksOptions: huks.HuksOptions) {
3. console.info('promise: enter generateKeyItem');
4. try {
5. await huks.generateKeyItem(keyAlias, huksOptions)
6. .then(() => {
7. console.info(`promise: generateKeyItem success`);
8. }).catch((error: BusinessError) => {
9. console.error(`promise: generateKeyItem failed, errCode : ${error.code}, errMsg : ${error.message}`);
10. })
11. } catch (error) {
12. console.error(`promise: generateKeyItem input arg invalid`);
13. }
14. }

16. /* 初始化密钥会话接口，并获取一个句柄（必选）和挑战值（可选） */
17. async function initSession(keyAlias: string, huksOptions: huks.HuksOptions) {
18. console.info('promise: enter initSession');
19. try {
20. await huks.initSession(keyAlias, huksOptions)
21. .then((data) => {
22. handle = data.handle;
23. console.info(`promise: initSession success`);
24. }).catch((error: BusinessError) => {
25. console.error(`promise: initSession failed, errCode : ${error.code}, errMsg : ${error.message}`);
26. })
27. } catch (error) {
28. console.error(`promise: initSession input arg invalid`);
29. }
30. }

32. /* 分段添加密钥操作的数据并进行相应的密钥操作，输出处理数据 */
33. async function updateSession(handle: number, huksOptions: huks.HuksOptions) {
34. console.info('promise: enter updateSession');
35. try {
36. await huks.updateSession(handle, huksOptions)
37. .then((data) => {
38. console.info(`promise: updateSession success, data is ` + uint8ArrayToString(data.outData as Uint8Array));
39. }).catch((error: BusinessError) => {
40. console.error(`promise: updateSession failed, errCode : ${error.code}, errMsg : ${error.message}`);
41. })
42. } catch (error) {
43. console.error(`promise: updateSession input arg invalid`);
44. }
45. }

47. /* 结束密钥会话并进行相应的密钥操作，输出处理数据 */
48. async function finishSession(handle: number, huksOptions: huks.HuksOptions) {
49. console.info('promise: enter finishSession');
50. try {
51. await huks.finishSession(handle, huksOptions)
52. .then((data) => {
53. finishOutData = data.outData as Uint8Array;
54. console.info(`promise: finishSession success, data is ` + uint8ArrayToString(data.outData as Uint8Array));
55. }).catch((error: BusinessError) => {
56. console.error(`promise: finishSession failed, errCode : ${error.code}, errMsg : ${error.message}`);
57. })
58. } catch (error) {
59. console.error(`promise: finishSession input arg invalid`);
60. }
61. }

63. /* 导出密钥 */
64. async function exportKeyItem(keyAlias: string, huksOptions: huks.HuksOptions) {
65. console.info('promise: enter exportKeyItem');
66. try {
67. await huks.exportKeyItem(keyAlias, huksOptions)
68. .then((data) => {
69. exportKey = data.outData as Uint8Array;
70. console.info(`promise: exportKey success, data is ` + uint8ArrayToString(data.outData as Uint8Array));
71. }).catch((error: BusinessError) => {
72. console.error(`promise: exportKeyItem failed, errCode : ${error.code}, errMsg : ${error.message}`);
73. })
74. } catch (error) {
75. console.error(`promise: exportKeyItem input arg invalid`);
76. }
77. }

79. /* 删除密钥操作 */
80. async function deleteKeyItem(keyAlias: string, huksOptions: huks.HuksOptions) {
81. console.info('promise: enter deleteKeyItem');
82. try {
83. await huks.deleteKeyItem(keyAlias, huksOptions)
84. .then(() => {
85. console.info(`promise: deleteKeyItem success`);
86. }).catch((error: BusinessError) => {
87. console.error(`promise: deleteKeyItem failed, errCode : ${error.code}, errMsg : ${error.message}`);
88. })
89. } catch (error) {
90. console.error(`promise: deleteKeyItem input arg invalid`);
91. }
92. }

94. async function testAgree() {
95. /* 1.确定密钥别名并集成要参数集。A设备：srcKeyAliasFirst；B设备：srcKeyAliasSecond */
96. /* 2.设备A生成密钥 */
97. await generateKeyItem(srcKeyAliasFirst, huksOptions);
98. /* 3.设备B生成密钥 */
99. await generateKeyItem(srcKeyAliasSecond, huksOptions);
100. /* 4.设备A、B导出非对称密钥的公钥 */
101. await exportKeyItem(srcKeyAliasFirst, huksOptions);
102. exportKeyFirst = exportKey;
103. await exportKeyItem(srcKeyAliasSecond, huksOptions);
104. exportKeySecond = exportKey;
105. /* 5.对第一个密钥进行协商（三段式） */
106. await initSession(srcKeyAliasFirst, huksOptions);
107. huksOptions.inData = exportKeySecond;
108. await updateSession(handle, huksOptions);
109. await finishSession(handle, finishOptionsFirst);
110. /* 6.对第二个密钥进行协商（三段式） */
111. await initSession(srcKeyAliasSecond, huksOptions);
112. huksOptions.inData = exportKeyFirst;
113. await updateSession(handle, huksOptions);
114. await finishSession(handle, finishOptionsSecond);
115. /* 7.设备A、B删除密钥 */
116. await deleteKeyItem(srcKeyAliasFirst, huksOptions);
117. await deleteKeyItem(srcKeyAliasSecond, huksOptions);
118. }
```

[X25519.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Security/UniversalKeystoreKit/KeyUsage/KeyExchange/entry/src/main/ets/pages/X25519.ets#L126-L248)

### DH密钥协商用例

收起

自动换行

深色代码主题

复制

```
1. /*
2. * 下面以DH密钥的Promise操作使用为例
3. */
4. import { huks } from '@kit.UniversalKeystoreKit';

6. function stringToUint8Array(str: string) {
7. let arr: number[] = [];
8. for (let i = 0, j = str.length; i < j; ++i) {
9. arr.push(str.charCodeAt(i));
10. }
11. return new Uint8Array(arr);
12. }

14. function uint8ArrayToBigInt(arr: Uint8Array): bigint {
15. let i = 0;
16. const byteMax: bigint = BigInt('0x100');
17. let result: bigint = BigInt('0');
18. while (i < arr.length) {
19. result = result * byteMax;
20. result = result + BigInt(arr[i]);
21. i += 1;
22. }
23. return result;
24. }

26. const dhAgree: huks.HuksParam[] = [{
27. tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
28. value: huks.HuksKeyAlg.HUKS_ALG_DH,
29. }, {
30. tag: huks.HuksTag.HUKS_TAG_PURPOSE,
31. value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_AGREE,
32. }];
33. const dh2048Agree: huks.HuksParam[] = [
34. ...dhAgree, {
35. tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
36. value: huks.HuksKeySize.HUKS_DH_KEY_SIZE_2048,
37. }];
38. const dhGenOptions: huks.HuksOptions = {
39. properties: dh2048Agree,
40. inData: new Uint8Array([])
41. };
42. const emptyOptions: huks.HuksOptions = {
43. properties: [],
44. inData: new Uint8Array([])
45. };

47. async function huksDhAgreeExportKey(keyAlias: string,
48. peerPubKey: huks.HuksReturnResult): Promise<huks.HuksReturnResult> {
49. const initHandle = await huks.initSession(keyAlias, dhGenOptions);
50. const dhAgreeUpdateBobPubKey: huks.HuksOptions = {
51. properties: [
52. ...dh2048Agree, {
53. tag: huks.HuksTag.HUKS_TAG_DERIVED_AGREED_KEY_STORAGE_FLAG,
54. value: huks.HuksKeyStorageType.HUKS_STORAGE_KEY_EXPORT_ALLOWED,
55. }],
56. inData: peerPubKey.outData
57. };
58. await huks.updateSession(initHandle.handle, dhAgreeUpdateBobPubKey);
59. return await huks.finishSession(initHandle.handle, emptyOptions);
60. }

62. async function huksDhAgreeExportTest(
63. aliasA: string, aliasB: string,
64. pubKeyA: huks.HuksReturnResult, pubKeyB: huks.HuksReturnResult) {

66. const agreedKeyFromAlice = await huksDhAgreeExportKey(aliasA, pubKeyB);
67. console.info(`ok! agreedKeyFromAlice export is 0x${uint8ArrayToBigInt(agreedKeyFromAlice.outData).toString(16)}`);

69. const agreedKeyFromBob = await huksDhAgreeExportKey(aliasB, pubKeyA);
70. console.info(`ok! agreedKeyFromBob export is 0x${uint8ArrayToBigInt(agreedKeyFromBob.outData).toString(16)}`);
71. }

73. async function huksDhAgreeInHuks(keyAlias: string, peerPubKey: huks.HuksReturnResult,
74. aliasAgreedKey: string): Promise<huks.HuksReturnResult> {
75. const onlyUsedInHuks: huks.HuksParam[] = [{
76. tag: huks.HuksTag.HUKS_TAG_KEY_STORAGE_FLAG,
77. value: huks.HuksKeyStorageType.HUKS_STORAGE_ONLY_USED_IN_HUKS,
78. }, {
79. tag: huks.HuksTag.HUKS_TAG_DERIVED_AGREED_KEY_STORAGE_FLAG,
80. value: huks.HuksKeyStorageType.HUKS_STORAGE_ONLY_USED_IN_HUKS,
81. }];
82. const dhAgreeInit: huks.HuksOptions = {
83. properties: [
84. ...dhAgree,
85. { tag: huks.HuksTag.HUKS_TAG_KEY_SIZE, value: huks.HuksKeySize.HUKS_AES_KEY_SIZE_256, },
86. ...onlyUsedInHuks],
87. inData: new Uint8Array([])
88. };
89. const dhAgreeFinishParams: huks.HuksParam[] = [
90. ...onlyUsedInHuks,
91. { tag: huks.HuksTag.HUKS_TAG_IS_KEY_ALIAS, value: true },
92. { tag: huks.HuksTag.HUKS_TAG_ALGORITHM, value: huks.HuksKeyAlg.HUKS_ALG_AES },
93. { tag: huks.HuksTag.HUKS_TAG_KEY_SIZE, value: huks.HuksKeySize.HUKS_AES_KEY_SIZE_256 },
94. {
95. tag: huks.HuksTag.HUKS_TAG_PURPOSE,
96. value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_ENCRYPT | huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_DECRYPT
97. }
98. ];

100. const handle = await huks.initSession(keyAlias, dhAgreeInit);
101. const dhAgreeUpdatePubKey: huks.HuksOptions = {
102. properties: [...dhAgree, ...onlyUsedInHuks],
103. inData: peerPubKey.outData
104. };
105. await huks.updateSession(handle.handle, dhAgreeUpdatePubKey);
106. const dhAgreeAliceFinnish: huks.HuksOptions = {
107. properties: [...dhAgreeFinishParams, {
108. tag: huks.HuksTag.HUKS_TAG_KEY_ALIAS, value: stringToUint8Array(aliasAgreedKey)
109. }], inData: new Uint8Array([])
110. };
111. return await huks.finishSession(handle.handle, dhAgreeAliceFinnish);
112. }

114. async function huksDhAgreeInHuksTest(
115. aliasA: string, aliasB: string,
116. pubKeyA: huks.HuksReturnResult, pubKeyB: huks.HuksReturnResult,
117. aliasAgreedKeyFromA: string, aliasAgreedKeyFromB: string) {

119. const finishAliceResult = await huksDhAgreeInHuks(aliasA, pubKeyB, aliasAgreedKeyFromA);
120. console.info(`ok! finishAliceResult in huks is 0x${uint8ArrayToBigInt(finishAliceResult.outData).toString(16)}`);
121. const aliceAgreedExist = await huks.isKeyItemExist(aliasAgreedKeyFromA, emptyOptions);
122. console.info(`ok! aliceAgreedExist in huks is ${aliceAgreedExist}`);

124. const finishBobResult = await huksDhAgreeInHuks(aliasB, pubKeyA, aliasAgreedKeyFromB);
125. console.info(`ok! finishBobResult in huks is 0x${uint8ArrayToBigInt(finishBobResult.outData).toString(16)}`);
126. const bobAgreedExist = await huks.isKeyItemExist(aliasAgreedKeyFromB, emptyOptions);
127. console.info(`ok! bobAgreedExist in huks is ${bobAgreedExist}`);

129. await huks.deleteKeyItem(aliasAgreedKeyFromA, emptyOptions);
130. await huks.deleteKeyItem(aliasAgreedKeyFromB, emptyOptions);
131. }

133. async function huksDhAgreeTest() {
134. const aliasAlice = 'alice';
135. const aliasBob = 'bob';

137. /* 调用generateKeyItem生成别名为alice与bob的两个密钥 */
138. await huks.generateKeyItem(aliasAlice, dhGenOptions);
139. await huks.generateKeyItem(aliasBob, dhGenOptions);

141. /* 导出非对称密钥alice与bob的公钥 */
142. const pubKeyAlice = await huks.exportKeyItem(aliasAlice, emptyOptions);
143. const pubKeyBob = await huks.exportKeyItem(aliasBob, emptyOptions);

145. /* 开始协商，协商生成的密钥返回给业务管理 */
146. await huksDhAgreeExportTest(aliasAlice, aliasBob, pubKeyAlice, pubKeyBob);

148. /* 开始协商，协商生成的密钥由HUKS管理 */
149. await huksDhAgreeInHuksTest(aliasAlice, aliasBob, pubKeyAlice, pubKeyBob, 'agreedKeyFromAlice', 'agreedKeyFromBob');

151. await huks.deleteKeyItem(aliasAlice, emptyOptions);
152. await huks.deleteKeyItem(aliasBob, emptyOptions);
153. }
```

[DH.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Security/UniversalKeystoreKit/KeyUsage/KeyExchange/entry/src/main/ets/pages/DH.ets#L15-L266)

### ECDH密钥协商用例

准备ECDH密钥协商材料：

收起

自动换行

深色代码主题

复制

```
1. /*
2. * 以下以ECDH密钥的Promise操作使用为例
3. */
4. import { huks } from '@kit.UniversalKeystoreKit';
5. import { BusinessError } from '@kit.BasicServicesKit';

7. function stringToUint8Array(str: string) {
8. let arr: number[] = [];
9. for (let i = 0, j = str.length; i < j; ++i) {
10. arr.push(str.charCodeAt(i));
11. }
12. return new Uint8Array(arr);
13. }

15. function uint8ArrayToString(fileData: Uint8Array) {
16. let dataString = '';
17. for (let i = 0; i < fileData.length; i++) {
18. dataString += String.fromCharCode(fileData[i]);
19. }
20. return dataString;
21. }

23. /*
24. * 确定密钥别名和封装密钥属性参数集
25. */
26. let srcKeyAliasFirst = 'AgreeECDHKeyFirstAlias';
27. let srcKeyAliasSecond = 'AgreeECDHKeySecondAlias';
28. let agreeECDHInData = 'AgreeECDHTestIndata';
29. let finishOutData: Uint8Array;
30. let handle: number;
31. let exportKey: Uint8Array;
32. let exportKeyFirst: Uint8Array;
33. let exportKeySecond: Uint8Array;
34. /* 集成生成密钥参数集 */
35. let properties: huks.HuksParam[] = [{
36. tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
37. value: huks.HuksKeyAlg.HUKS_ALG_ECC,
38. }, {
39. tag: huks.HuksTag.HUKS_TAG_PURPOSE,
40. value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_AGREE,
41. }, {
42. tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
43. value: huks.HuksKeySize.HUKS_ECC_KEY_SIZE_256,
44. }, {
45. tag: huks.HuksTag.HUKS_TAG_DIGEST,
46. value: huks.HuksKeyDigest.HUKS_DIGEST_NONE,
47. }, {
48. tag: huks.HuksTag.HUKS_TAG_PADDING,
49. value: huks.HuksKeyPadding.HUKS_PADDING_NONE,
50. }, {
51. tag: huks.HuksTag.HUKS_TAG_BLOCK_MODE,
52. value: huks.HuksCipherMode.HUKS_MODE_CBC,
53. }, {
54. tag: huks.HuksTag.HUKS_TAG_DERIVED_AGREED_KEY_STORAGE_FLAG,
55. value: huks.HuksKeyStorageType.HUKS_STORAGE_ONLY_USED_IN_HUKS,
56. }
57. ]
58. let huksOptions: huks.HuksOptions = {
59. properties: properties,
60. inData: new Uint8Array([])
61. }
62. /* 集成第一个协商参数集 */
63. const finishProperties: huks.HuksParam[] = [{
64. tag: huks.HuksTag.HUKS_TAG_DERIVED_AGREED_KEY_STORAGE_FLAG,
65. value: huks.HuksKeyStorageType.HUKS_STORAGE_ONLY_USED_IN_HUKS,
66. }, {
67. tag: huks.HuksTag.HUKS_TAG_IS_KEY_ALIAS,
68. value: true
69. }, {
70. tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
71. value: huks.HuksKeyAlg.HUKS_ALG_ECDH,
72. }, {
73. tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
74. value: huks.HuksKeySize.HUKS_ECC_KEY_SIZE_256,
75. }, {
76. tag: huks.HuksTag.HUKS_TAG_PURPOSE,
77. value:
78. huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_ENCRYPT |
79. huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_DECRYPT,
80. }, {
81. tag: huks.HuksTag.HUKS_TAG_DIGEST,
82. value: huks.HuksKeyDigest.HUKS_DIGEST_NONE,
83. }, {
84. tag: huks.HuksTag.HUKS_TAG_PADDING,
85. value: huks.HuksKeyPadding.HUKS_PADDING_NONE,
86. }, {
87. tag: huks.HuksTag.HUKS_TAG_BLOCK_MODE,
88. value: huks.HuksCipherMode.HUKS_MODE_CBC,
89. }
90. ];
91. let finishOptionsFirst: huks.HuksOptions = {
92. properties: [
93. ...finishProperties, {
94. tag: huks.HuksTag.HUKS_TAG_KEY_ALIAS,
95. value: stringToUint8Array(srcKeyAliasFirst + 'final'),
96. }],
97. inData: stringToUint8Array(agreeECDHInData)
98. }
99. /* 集成第二个协商参数集 */
100. let finishOptionsSecond: huks.HuksOptions = {
101. properties: [
102. ...finishProperties, {
103. tag: huks.HuksTag.HUKS_TAG_KEY_ALIAS,
104. value: stringToUint8Array(srcKeyAliasSecond + 'final'),
105. }],
106. inData: stringToUint8Array(agreeECDHInData)
107. }
```

[ECDH.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Security/UniversalKeystoreKit/KeyUsage/KeyExchange/entry/src/main/ets/pages/ECDH.ets#L15-L149)

执行密钥协商：

收起

自动换行

深色代码主题

复制

```
1. /* 生成密钥 */
2. async function generateKeyItem(keyAlias: string, huksOptions: huks.HuksOptions) {
3. console.info('promise: enter generateKeyItem');
4. try {
5. await huks.generateKeyItem(keyAlias, huksOptions)
6. .then(() => {
7. console.info(`promise: generateKeyItem success`);
8. }).catch((error: BusinessError) => {
9. console.error(`promise: generateKeyItem failed, errCode : ${error.code}, errMsg : ${error.message}`);
10. })
11. } catch (error) {
12. console.error(`promise: generateKeyItem input arg invalid`);
13. }
14. }

16. /* 初始化密钥会话接口，并获取一个句柄（必选）和挑战值（可选） */
17. async function initSession(keyAlias: string, huksOptions: huks.HuksOptions) {
18. console.info('promise: enter initSession');
19. try {
20. await huks.initSession(keyAlias, huksOptions)
21. .then((data) => {
22. handle = data.handle;
23. console.info(`promise: initSession success`);
24. }).catch((error: BusinessError) => {
25. console.error(`promise: initSession failed, errCode : ${error.code}, errMsg : ${error.message}`);
26. })
27. } catch (error) {
28. console.error(`promise: initSession input arg invalid`);
29. }
30. }

32. /* 分段添加密钥操作的数据并进行相应的密钥操作，输出处理数据 */
33. async function updateSession(handle: number, huksOptions: huks.HuksOptions) {
34. console.info('promise: enter updateSession');
35. try {
36. await huks.updateSession(handle, huksOptions)
37. .then((data) => {
38. console.info(`promise: updateSession success, data is ` + uint8ArrayToString(data.outData as Uint8Array));
39. }).catch((error: BusinessError) => {
40. console.error(`promise: updateSession failed, errCode : ${error.code}, errMsg : ${error.message}`);
41. })
42. } catch (error) {
43. console.error(`promise: updateSession input arg invalid`);
44. }
45. }

47. /* 结束密钥会话并进行相应的密钥操作，输出处理数据 */
48. async function finishSession(handle: number, huksOptions: huks.HuksOptions) {
49. console.info('promise: enter finishSession');
50. try {
51. await huks.finishSession(handle, huksOptions)
52. .then((data) => {
53. finishOutData = data.outData as Uint8Array;
54. console.info(`promise: finishSession success, data is ` + uint8ArrayToString(data.outData as Uint8Array));
55. }).catch((error: BusinessError) => {
56. console.error(`promise: finishSession failed, errCode : ${error.code}, errMsg : ${error.message}`);
57. })
58. } catch (error) {
59. console.error(`promise: finishSession input arg invalid`);
60. }
61. }

63. /* 导出密钥 */
64. async function exportKeyItem(keyAlias: string, huksOptions: huks.HuksOptions) {
65. console.info('promise: enter exportKeyItem');
66. try {
67. await huks.exportKeyItem(keyAlias, huksOptions)
68. .then((data) => {
69. exportKey = data.outData as Uint8Array;
70. console.info(`promise: exportKey success, data is ` + uint8ArrayToString(data.outData as Uint8Array));
71. }).catch((error: BusinessError) => {
72. console.error(`promise: exportKeyItem failed, errCode : ${error.code}, errMsg : ${error.message}`);
73. })
74. } catch (error) {
75. console.error(`promise: exportKeyItem input arg invalid`);
76. }
77. }

79. /* 删除密钥操作 */
80. async function deleteKeyItem(keyAlias: string, huksOptions: huks.HuksOptions) {
81. console.info('promise: enter deleteKeyItem');
82. try {
83. await huks.deleteKeyItem(keyAlias, huksOptions)
84. .then(() => {
85. console.info(`promise: deleteKeyItem success`);
86. }).catch((error: BusinessError) => {
87. console.error(`promise: deleteKeyItem failed, errCode : ${error.code}, errMsg : ${error.message}`);
88. })
89. } catch (error) {
90. console.error(`promise: deleteKeyItem input arg invalid`);
91. }
92. }

94. async function testAgree() {
95. /* 1.确定密钥别名并集成要参数集。A设备：srcKeyAliasFirst；B设备：srcKeyAliasSecond */
96. /* 2.设备A生成密钥 */
97. await generateKeyItem(srcKeyAliasFirst, huksOptions);
98. /* 3.设备B生成密钥 */
99. await generateKeyItem(srcKeyAliasSecond, huksOptions);
100. /* 4.设备A、B导出非对称密钥的公钥 */
101. await exportKeyItem(srcKeyAliasFirst, huksOptions);
102. exportKeyFirst = exportKey;
103. await exportKeyItem(srcKeyAliasSecond, huksOptions);
104. exportKeySecond = exportKey;
105. /* 5.对第一个密钥进行协商（三段式） */
106. await initSession(srcKeyAliasFirst, huksOptions);
107. huksOptions.inData = exportKeySecond;
108. await updateSession(handle, huksOptions);
109. await finishSession(handle, finishOptionsFirst);
110. /* 6.对第二个密钥进行协商（三段式） */
111. await initSession(srcKeyAliasSecond, huksOptions);
112. huksOptions.inData = exportKeyFirst;
113. await updateSession(handle, huksOptions);
114. await finishSession(handle, finishOptionsSecond);
115. /* 7.设备A、B删除密钥 */
116. await deleteKeyItem(srcKeyAliasFirst, huksOptions);
117. await deleteKeyItem(srcKeyAliasSecond, huksOptions);
118. }
```

[ECDH.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Security/UniversalKeystoreKit/KeyUsage/KeyExchange/entry/src/main/ets/pages/ECDH.ets#L151-L272)