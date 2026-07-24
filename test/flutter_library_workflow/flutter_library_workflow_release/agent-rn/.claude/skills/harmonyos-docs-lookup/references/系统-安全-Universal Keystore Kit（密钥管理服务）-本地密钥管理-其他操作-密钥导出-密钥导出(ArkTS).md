业务需要获取持久化存储的非对称密钥的公钥时使用，当前支持ECC/RSA/ED25519/X25519/SM2的公钥导出。

说明

轻量级智能穿戴仅支持RSA公钥导出。

## 开发步骤

1. 指定密钥别名，密钥别名命名规范参考[密钥生成介绍及算法规格](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-key-generation-overview)。
2. 调用接口[exportKeyItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-huks#huksexportkeyitem9)，传入参数keyAlias和options。options为预留参数，当前可传入空。
3. 返回值为[HuksReturnResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-huks#huksreturnresult9)类型对象，获取的公钥明文在outData字段中，以标准的X.509规范的DER格式封装，具体请参考[公钥材料格式](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-concepts#公钥材料格式)。

收起

自动换行

深色代码主题

复制

```
1. import { huks } from '@kit.UniversalKeystoreKit';

3. /* 1. 设置密钥别名 */
4. let keyAlias = 'keyAlias';
5. /* option对象传空 */
6. let emptyOptions: huks.HuksOptions = {
7. properties: []
8. };

10. let properties1: huks.HuksParam[] = [
11. {
12. tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
13. value: huks.HuksKeyAlg.HUKS_ALG_DH
14. },
15. {
16. tag: huks.HuksTag.HUKS_TAG_PURPOSE,
17. value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_AGREE
18. },
19. {
20. tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
21. value: huks.HuksKeySize.HUKS_DH_KEY_SIZE_2048
22. }
23. ];

25. let huksOptions: huks.HuksOptions = {
26. properties: properties1,
27. inData: new Uint8Array([])
28. }

30. /* 3.生成密钥 */
31. function generateKeyItem(keyAlias: string, huksOptions: huks.HuksOptions) {
32. return new Promise<void>((resolve, reject) => {
33. try {
34. huks.generateKeyItem(keyAlias, huksOptions, (error, data) => {
35. if (error) {
36. reject(error);
37. } else {
38. resolve(data);
39. }
40. });
41. } catch (error) {
42. throw (error as Error);
43. }
44. });
45. }

47. async function publicGenKeyFunc(keyAlias: string, huksOptions: huks.HuksOptions): Promise<string> {
48. console.info(`enter promise generateKeyItem`);
49. try {
50. await generateKeyItem(keyAlias, huksOptions)
51. .then((data) => {
52. console.info(`promise: generateKeyItem success, data = ${JSON.stringify(data)}`);
53. })
54. .catch((error: Error) => {
55. console.error(`promise: generateKeyItem failed, ${JSON.stringify(error)}`);
56. });
57. return 'Success';
58. } catch (error) {
59. console.error(`promise: generateKeyItem input arg invalid, ${JSON.stringify(error)}`);
60. return 'Failed';
61. }
62. }

64. async function testGenKey(): Promise<string> {
65. let ret = await publicGenKeyFunc(keyAlias, huksOptions);
66. return ret;
67. }

69. function check(): string {
70. try {
71. /* 1. 生成密钥 */
72. testGenKey()
73. /* 2. 导出密钥 */
74. huks.exportKeyItem(keyAlias, emptyOptions, (error, data) => {
75. if (error) {
76. console.error(`callback: exportKeyItem failed, ` + error);
77. } else {
78. console.info(`callback: exportKeyItem success, data = ${JSON.stringify(data)}`);
79. }
80. });
81. return 'Success';
82. } catch (error) {
83. console.error(`callback: exportKeyItem input arg invalid, ${JSON.stringify(error)}`);
84. return 'Failed';
85. }
86. }
```

[KeyExport.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Security/UniversalKeystoreKit/OtherOperations/KeyExport/entry/src/main/ets/pages/KeyExport.ets#L16-L103)