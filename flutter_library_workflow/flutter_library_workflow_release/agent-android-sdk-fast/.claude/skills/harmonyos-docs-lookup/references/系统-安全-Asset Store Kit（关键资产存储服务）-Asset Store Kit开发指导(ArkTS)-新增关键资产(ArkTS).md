## 接口介绍

可通过API文档查看新增关键资产的异步接口[add(attributes: AssetMap)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-asset#assetadd)、同步接口[addSync(attributes: AssetMap)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-asset#assetaddsync12)的详细介绍。

在新增关键资产时，关键资产属性的内容（AssetMap）参数如下表所示：

注意

下表中“ALIAS”和名称包含“DATA\_LABEL”的关键资产属性，用于存储业务自定义信息，其内容不会被加密，请勿存放敏感个人数据。

展开

| 属性名称（Tag） | 属性内容（Value） | 是否必选 | 说明 |
| --- | --- | --- | --- |
| SECRET | 类型为Uint8Array，长度为1-1024字节。 | 必选 | 关键资产明文。 |
| ALIAS | 类型为Uint8Array，长度为1-256字节。 | 必选 | 关键资产别名，每条关键资产的唯一索引。 |
| ACCESSIBILITY | 类型为number，取值范围详见[Accessibility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-asset#accessibility)。 | 可选 | 基于锁屏状态的访问控制，默认值为DEVICE\_FIRST\_UNLOCKED，即首次解锁后可访问。 |
| REQUIRE\_PASSWORD\_SET | 类型为boolean。 | 可选 | 是否仅在设置了锁屏密码的情况下，可访问关键资产。为true时，表示仅在用户设置了锁屏密码的情况下，关键资产才允许被访问；为false时，表示无论用户是否设置锁屏密码，关键资产均允许被访问。默认值为false。 |
| AUTH\_TYPE | 类型为number，取值范围详见[AuthType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-asset#authtype)。 | 可选 | 访问关键资产所需的用户认证类型，默认值为NONE，即访问关键资产前无需用户认证。 |
| SYNC\_TYPE | 类型为number，取值范围详见[SyncType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-asset#synctype)。 | 可选 | 关键资产支持的同步类型，默认值为NEVER，即不允许同步该关键资产。 |
| IS\_PERSISTENT | 类型为boolean。 | 可选 | 在应用卸载时是否需要保留关键资产。为true时表示应用卸载后，应用存储的关键资产将被保留；为false时表示应用卸载后，应用存储的关键资产将被删除。默认值为false。  **注意：** 设置此属性时，需[申请权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/declare-permissions)ohos.permission.STORE\_PERSISTENT\_DATA。 |
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
| CONFLICT\_RESOLUTION | 类型为number，取值范围详见[ConflictResolution](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-asset#conflictresolution)。 | 可选 | 新增关键资产时的冲突（如：别名相同）处理策略，默认值为THROW\_ERROR，即抛出异常，由业务进行后续处理。 |
| REQUIRE\_ATTR\_ENCRYPTED14+ | 类型为boolean。 | 可选 | 是否加密业务自定义附属信息。为true时表示业务自定义附属信息加密存储，为false时表示业务自定义附属信息不加密存储。默认值为false。 |
| GROUP\_ID18+ | 类型为Uint8Array，长度为7-127字节。 | 可选 | 待新增的关键资产所属群组，默认新增不属于任何群组的关键资产。 |
| WRAP\_TYPE18+ | 类型为number，取值范围详见[WrapType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-asset#wraptype18)。 | 可选 | 关键资产支持的加密导入导出类型，默认值为NEVER，即不允许加密导入导出关键资产。 |

## 约束和限制

* 基于别名的访问

  关键资产以密文的形式存储在ASSET数据库中，以业务身份 + 别名作为唯一索引。故业务需要保证每条关键资产的别名唯一。
* 业务自定义数据存储

  ASSET为业务预留了12个关键资产自定义属性，名称以"DATA\_LABEL"开头。对于超过12个自定义属性的情况，业务可以将多段数据按照一定的格式（如JSON）拼接到同一个ASSET属性中。

  ASSET对部分属性会进行完整性保护，这部分属性名称以"DATA\_LABEL\_CRITICAL"开头，写入后不支持更新。

## 代码示例

说明

本模块提供了异步和同步两套接口，以下为异步接口的使用示例，同步接口详见[@ohos.security.asset (关键资产存储服务)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-asset)API文档。

在指定群组中新增一条关键资产的使用示例详见[新增群组关键资产](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/asset-js-group-access-control#新增群组关键资产)。

新增一条密码是demo\_pwd，别名是demo\_alias，附属信息是demo\_label的关键资产，该关键资产在用户首次解锁设备后可被访问。

收起

自动换行

深色代码主题

复制

```
1. import { asset } from '@kit.AssetStoreKit';
2. import { util } from '@kit.ArkTS';
3. import { BusinessError } from '@kit.BasicServicesKit';

5. function stringToArray(str: string): Uint8Array {
6. let textEncoder = new util.TextEncoder();
7. return textEncoder.encodeInto(str);
8. }

10. export async function addAsset(): Promise<string> {
11. let result: string = '';
12. let attr: asset.AssetMap = new Map();
13. attr.set(asset.Tag.SECRET, stringToArray('demo_pwd'));
14. attr.set(asset.Tag.ALIAS, stringToArray('demo_alias'));
15. attr.set(asset.Tag.ACCESSIBILITY, asset.Accessibility.DEVICE_FIRST_UNLOCKED);
16. attr.set(asset.Tag.DATA_LABEL_NORMAL_1, stringToArray('demo_label'));
17. try {
18. await asset.add(attr).then(() => {
19. console.info(`Succeeded in adding Asset.`);
20. result = 'Succeeded in adding Asset';
21. }).catch((err: BusinessError) => {
22. console.error(`Failed to add Asset. Code is ${err.code}, message is ${err.message}`);
23. result = 'Failed to add Asset';
24. })
25. } catch (error) {
26. let err = error as BusinessError;
27. console.error(`Failed to add Asset. Code is ${err.code}, message is ${err.message}`);
28. result = 'Failed to add Asset';
29. }
30. return result;
31. }
```

[add.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Security/AssetStoreKit/AssetStoreArkTS/entry/src/main/ets/operations/add.ets#L16-L48)