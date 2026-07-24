## 接口介绍

可通过API文档查看此功能的相关接口：

展开

| 异步接口 | 同步接口 | 说明 |
| --- | --- | --- |
| [preQuery(query: AssetMap)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-asset#assetprequery) | [preQuerySync(query: AssetMap)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-asset#assetprequerysync12) | 查询预处理。 |
| [query(query: AssetMap)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-asset#assetquery) | [querySync(query: AssetMap)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-asset#assetquerysync12) | 查询关键资产。 |
| [postQuery(handle: AssetMap)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-asset#assetpostquery) | [postQuerySync(handle: AssetMap)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-asset#assetpostquerysync12) | 查询后置处理。 |

查询需要用户认证的关键资产时，关键资产属性的内容（AssetMap）参数如下表所示：

注意

下表中“ALIAS”和名称包含“DATA\_LABEL”的关键资产属性，用于存储业务自定义信息，其内容不会被加密，请勿存放敏感个人数据。

* **preQuery参数列表**

  展开

  | 属性名称（Tag） | 属性内容（Value） | 是否必选 | 说明 |
  | --- | --- | --- | --- |
  | ALIAS | 类型为Uint8Array，长度为1-256字节。 | 可选 | 关键资产别名，每条关键资产的唯一索引。 |
  | ACCESSIBILITY | 类型为number，取值范围详见[Accessibility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-asset#accessibility)。 | 可选 | 基于锁屏状态的访问控制。 |
  | REQUIRE\_PASSWORD\_SET | 类型为boolean。 | 可选 | 是否仅在设置了锁屏密码的情况下，可访问关键资产。为true时表示查询仅用户设置了锁屏密码才允许访问的关键资产；为false时表示查询无论用户是否设置锁屏密码，均可访问的关键资产。 |
  | AUTH\_TYPE | 类型为number，取值范围详见[AuthType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-asset#authtype)。 | 可选 | 访问关键资产所需的用户认证类型。 |
  | AUTH\_VALIDITY\_PERIOD | 类型为number，取值范围：1-600，单位为秒。 | 可选 | 用户认证的有效期，默认值为60。 |
  | SYNC\_TYPE | 类型为number，取值范围详见[SyncType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-asset#synctype)。 | 可选 | 关键资产支持的同步类型。 |
  | IS\_PERSISTENT | 类型为boolean。 | 可选 | 在应用卸载时是否需要保留关键资产。为true时表示查询应用卸载后会被保留的关键资产；为false时表示查询应用卸载后会被删除的关键资产。 |
  | DATA\_LABEL\_CRITICAL\_1 | 类型为Uint8Array，长度为1-2048字节。 | 可选 | 关键资产附属信息，内容由业务自定义且有完整性保护。  **说明：** API12前长度为1-512字节。 |
  | DATA\_LABEL\_CRITICAL\_2 | 类型为Uint8Array，长度为1-2048字节。 | 可选 | 关键资产附属信息，内容由业务自定义且有完整性保护。  **说明：** API12前长度为1-512字节。 |
  | DATA\_LABEL\_CRITICAL\_3 | 类型为Uint8Array，长度为1-2048字节。 | 可选 | 关键资产附属信息，内容由业务自定义且有完整性保护。  **说明：** API12前长度为1-512字节。 |
  | DATA\_LABEL\_CRITICAL\_4 | 类型为Uint8Array，长度为1-2048字节。 | 可选 | 关键资产附属信息，内容由业务自定义且有完整性保护。  **说明：** API12前长度为1-512字节。 |
  | DATA\_LABEL\_NORMAL\_1 | 类型为Uint8Array，长度为1-2048字节。 | 可选 | 关键资产附属信息，内容由业务自定义且无完整性保护。  **说明：** API12前长度为1-512字节。 |
  | DATA\_LABEL\_NORMAL\_2 | 类型为Uint8Array，长度为1-2048字节。 | 可选 | 关键资产附属信息，内容由业务自定义且无完整性保护。  **说明：** API12前长度为1-512字节。 |
  | DATA\_LABEL\_NORMAL\_3 | 类型为Uint8Array，长度为1-2048字节。 | 可选 | 关键资产附属信息，内容由业务自定义且无完整性保护。  **说明：** API12前长度为1-512字节。 |
  | DATA\_LABEL\_NORMAL\_4 | 类型为Uint8Array，长度为1-2048字节。 | 可选 | 关键资产附属信息，内容由业务自定义且无完整性保护。  **说明：** API12前长度为1-512字节。 |
  | DATA\_LABEL\_NORMAL\_LOCAL\_112+ | 类型为Uint8Array，长度为1-2048字节。 | 可选 | 关键资产附属的本地信息，内容由业务自定义且无完整性保护，该项信息不会进行同步。 |
  | DATA\_LABEL\_NORMAL\_LOCAL\_212+ | 类型为Uint8Array，长度为1-2048字节。 | 可选 | 关键资产附属的本地信息，内容由业务自定义且无完整性保护，该项信息不会进行同步。 |
  | DATA\_LABEL\_NORMAL\_LOCAL\_312+ | 类型为Uint8Array，长度为1-2048字节。 | 可选 | 关键资产附属的本地信息，内容由业务自定义且无完整性保护，该项信息不会进行同步。 |
  | DATA\_LABEL\_NORMAL\_LOCAL\_412+ | 类型为Uint8Array，长度为1-2048字节。 | 可选 | 关键资产附属的本地信息，内容由业务自定义且无完整性保护，该项信息不会进行同步。 |
  | REQUIRE\_ATTR\_ENCRYPTED14+ | 类型为boolean。 | 可选 | 是否查询业务自定义附属信息被加密的数据。为true时表示查询业务自定义附属信息加密存储的数据，为false时表示查询业务自定义附属信息不加密存储的数据。默认值为false。 |
  | GROUP\_ID18+ | 类型为Uint8Array，长度为7-127字节。 | 可选 | 待查询的关键资产所属群组，默认查询不属于任何群组的关键资产。 |
* **query参数列表**

  展开

  | 属性名称（Tag） | 属性内容（Value） | 是否必选 | 说明 |
  | --- | --- | --- | --- |
  | ALIAS | 类型为Uint8Array，长度为1-256字节。 | 必选 | 关键资产别名，每条关键资产的唯一索引。 |
  | AUTH\_CHALLENGE | 类型为Uint8Array，长度为32字节。 | 必选 | 用户认证的挑战值。 |
  | AUTH\_TOKEN | 类型为Uint8Array。  API 20开始：长度为1-1024字节。  API 11-19：长度为148字节。 | 必选 | 用户认证通过的授权令牌。 |
  | RETURN\_TYPE | 类型为number，asset.ReturnType.ALL。 | 必选 | 关键资产查询返回的结果类型。 |
  | ACCESSIBILITY | 类型为number，取值范围详见[Accessibility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-asset#accessibility)。 | 可选 | 基于锁屏状态的访问控制。 |
  | REQUIRE\_PASSWORD\_SET | 类型为boolean。 | 可选 | 是否仅在设置了锁屏密码的情况下，可访问关键资产。为true时表示查询仅用户设置了锁屏密码才允许访问的关键资产；为false时表示查询无论用户是否设置锁屏密码，均可访问的关键资产。 |
  | AUTH\_TYPE | 类型为number，取值范围详见[AuthType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-asset#authtype)。 | 可选 | 访问关键资产所需的用户认证类型。 |
  | SYNC\_TYPE | 类型为number，取值范围详见[SyncType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-asset#synctype)。 | 可选 | 关键资产支持的同步类型。 |
  | IS\_PERSISTENT | 类型为boolean。 | 可选 | 在应用卸载时是否需要保留关键资产。为true时表示查询应用卸载后会被保留的关键资产；为false时表示查询应用卸载后会被删除的关键资产。 |
  | DATA\_LABEL\_CRITICAL\_1 | 类型为Uint8Array，长度为1-2048字节。 | 可选 | 关键资产附属信息，内容由业务自定义且有完整性保护。  **说明：** API12前长度为1-512字节。 |
  | DATA\_LABEL\_CRITICAL\_2 | 类型为Uint8Array，长度为1-2048字节。 | 可选 | 关键资产附属信息，内容由业务自定义且有完整性保护。  **说明：** API12前长度为1-512字节。 |
  | DATA\_LABEL\_CRITICAL\_3 | 类型为Uint8Array，长度为1-2048字节。 | 可选 | 关键资产附属信息，内容由业务自定义且有完整性保护。  **说明：** API12前长度为1-512字节。 |
  | DATA\_LABEL\_CRITICAL\_4 | 类型为Uint8Array，长度为1-2048字节。 | 可选 | 关键资产附属信息，内容由业务自定义且有完整性保护。  **说明：** API12前长度为1-512字节。 |
  | DATA\_LABEL\_NORMAL\_1 | 类型为Uint8Array，长度为1-2048字节。 | 可选 | 关键资产附属信息，内容由业务自定义且无完整性保护。  **说明：** API12前长度为1-512字节。 |
  | DATA\_LABEL\_NORMAL\_2 | 类型为Uint8Array，长度为1-2048字节。 | 可选 | 关键资产附属信息，内容由业务自定义且无完整性保护。  **说明：** API12前长度为1-512字节。 |
  | DATA\_LABEL\_NORMAL\_3 | 类型为Uint8Array，长度为1-2048字节。 | 可选 | 关键资产附属信息，内容由业务自定义且无完整性保护。  **说明：** API12前长度为1-512字节。 |
  | DATA\_LABEL\_NORMAL\_4 | 类型为Uint8Array，长度为1-2048字节。 | 可选 | 关键资产附属信息，内容由业务自定义且无完整性保护。  **说明：** API12前长度为1-512字节。 |
  | DATA\_LABEL\_NORMAL\_LOCAL\_112+ | 类型为Uint8Array，长度为1-2048字节。 | 可选 | 关键资产附属的本地信息，内容由业务自定义且无完整性保护，该项信息不会进行同步。 |
  | DATA\_LABEL\_NORMAL\_LOCAL\_212+ | 类型为Uint8Array，长度为1-2048字节。 | 可选 | 关键资产附属的本地信息，内容由业务自定义且无完整性保护，该项信息不会进行同步。 |
  | DATA\_LABEL\_NORMAL\_LOCAL\_312+ | 类型为Uint8Array，长度为1-2048字节。 | 可选 | 关键资产附属的本地信息，内容由业务自定义且无完整性保护，该项信息不会进行同步。 |
  | DATA\_LABEL\_NORMAL\_LOCAL\_412+ | 类型为Uint8Array，长度为1-2048字节。 | 可选 | 关键资产附属的本地信息，内容由业务自定义且无完整性保护，该项信息不会进行同步。 |
  | REQUIRE\_ATTR\_ENCRYPTED14+ | 类型为boolean。 | 可选 | 是否查询业务自定义附属信息被加密的数据。为true时表示查询业务自定义附属信息加密存储的数据，为false时表示查询业务自定义附属信息不加密存储的数据。默认值为false。 |
  | GROUP\_ID18+ | 类型为Uint8Array，长度为7-127字节。 | 可选 | 待查询的关键资产所属群组，默认查询不属于任何群组的关键资产。 |
* **postQuery参数列表**

  展开

  | 属性名称（Tag） | 属性内容（Value） | 是否必选 | 说明 |
  | --- | --- | --- | --- |
  | AUTH\_CHALLENGE | 类型为Uint8Array，长度为32字节。 | 必选 | 用户认证的挑战值。 |
  | GROUP\_ID18+ | 类型为Uint8Array，长度为7-127字节。 | 可选 | 待清理关键资产所属群组，默认清理内存中不属于任何群组的关键资产。 |

## 代码示例

说明

本模块提供了异步和同步两套接口，以下为异步接口的使用示例，同步接口详见[@ohos.security.asset (关键资产存储服务)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-asset)。

在查询前，需确保已有需要用户认证的关键资产，可参考[指南文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/asset-js-add)新增关键资产，否则将抛出NOT\_FOUND错误（错误码24000002）。

查询别名是demo\_alias且需要用户认证的关键资产。示例中引入的@ohos.userIAM.userAuth用法详见userAuth文档中的[start](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-useriam-userauth#start10)接口。

收起

自动换行

深色代码主题

复制

```
1. import { asset } from '@kit.AssetStoreKit';
2. import { util } from '@kit.ArkTS';
3. import { userAuth } from '@kit.UserAuthenticationKit';
4. import { BusinessError } from '@kit.BasicServicesKit';

6. function stringToArray(str: string): Uint8Array {
7. let textEncoder = new util.TextEncoder();
8. return textEncoder.encodeInto(str);
9. }

11. function arrayToString(arr: Uint8Array): string {
12. let textDecoder = util.TextDecoder.create('utf-8', { ignoreBOM: true });
13. let str = textDecoder.decodeToString(arr, { stream: false });
14. return str;
15. }

17. export async function userAuthenticate(challenge: Uint8Array): Promise<Uint8Array> {
18. return new Promise((resolve, reject) => {
19. const authParam: userAuth.AuthParam = {
20. challenge: challenge,
21. authType: [userAuth.UserAuthType.PIN],
22. authTrustLevel: userAuth.AuthTrustLevel.ATL1,
23. };
24. const widgetParam: userAuth.WidgetParam = { title: '请输入锁屏密码' };
25. try {
26. let userAuthInstance = userAuth.getUserAuthInstance(authParam, widgetParam);
27. userAuthInstance.on('result', {
28. onResult(result) {
29. if (result.result == userAuth.UserAuthResultCode.SUCCESS) {
30. console.info(`User identity authentication succeeded.`);
31. resolve(result.token);
32. } else {
33. console.error(`User identity authentication failed.`);
34. reject();
35. }
36. }
37. });
38. userAuthInstance.start();
39. } catch (error) {
40. let err = error as BusinessError;
41. console.error(`User identity authentication failed. Code is ${err.code}, message is ${err.message}`);
42. reject();
43. }
44. })
45. }

47. function preQueryAsset(): Promise<Uint8Array> {
48. return new Promise((resolve, reject) => {
49. try {
50. let query: asset.AssetMap = new Map();
51. query.set(asset.Tag.ALIAS, stringToArray('user_auth_asset'));
52. asset.preQuery(query).then((challenge: Uint8Array) => {
53. resolve(challenge);
54. }).catch(() => {
55. reject();
56. })
57. } catch (error) {
58. let err = error as BusinessError;
59. console.error(`Failed to pre-query Asset. Code is ${err.code}, message is ${err.message}`);
60. reject();
61. }
62. });
63. }

65. async function postQueryAsset(challenge: Uint8Array) {
66. let handle: asset.AssetMap = new Map();
67. handle.set(asset.Tag.AUTH_CHALLENGE, challenge);
68. try {
69. await asset.postQuery(handle);
70. console.info(`Succeeded in post-querying Asset.`);
71. } catch (error) {
72. let err = error as BusinessError;
73. console.error(`Failed to post-query Asset. Code is ${err.code}, message is ${err.message}`);
74. }
75. }

77. export async function queryUserAuthAsset(): Promise<string> {
78. let result: string = '';
79. // step1. 调用asset.preQuery获取挑战值。
80. await preQueryAsset().then(async (challenge: Uint8Array) => {
81. try {
82. // step2. 传入挑战值，拉起用户认证框。
83. let authToken: Uint8Array = await userAuthenticate(challenge);
84. // step3 用户认证通过后，传入挑战值和授权令牌，查询关键资产明文。
85. let query: asset.AssetMap = new Map();
86. query.set(asset.Tag.ALIAS, stringToArray('user_auth_asset'));
87. query.set(asset.Tag.RETURN_TYPE, asset.ReturnType.ALL);
88. query.set(asset.Tag.AUTH_CHALLENGE, challenge);
89. query.set(asset.Tag.AUTH_TOKEN, authToken);
90. let res: asset.AssetMap[] = await asset.query(query);
91. for (let i = 0; i < res.length; i++) {
92. // 解析secret。
93. let secret: Uint8Array = res[i].get(asset.Tag.SECRET) as Uint8Array;
94. // 将Uint8Array转换为string类型。
95. let secretStr: string = arrayToString(secret);
96. }
97. // step4. 关键资产明文查询成功后，需要调用asset.postQuery进行查询的后置处理。
98. postQueryAsset(challenge);
99. result = 'Succeeded in querying user-auth Asset';
100. } catch (error) {
101. // step5. preQuery成功，后续操作失败，也需要调用asset.postQuery进行查询的后置处理。
102. postQueryAsset(challenge);
103. result = 'Failed to query user-auth Asset';
104. }
105. }).catch((err: BusinessError) => {
106. console.error(`Failed to pre-query Asset. Code is ${err.code}, message is ${err.message}`);
107. result = 'Failed to query user-auth Asset';
108. })
109. return result;
110. }
```

[query\_auth.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Security/AssetStoreKit/AssetStoreArkTS/entry/src/main/ets/operations/query_auth.ets#L16-L127)