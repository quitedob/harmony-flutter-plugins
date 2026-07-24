## 新增支持同步的关键资产

新增密码demo\_pwd（别名demo\_alias），附属信息为demo\_label，支持同步的关键资产。

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

10. export async function addSyncAsset(): Promise<string> {
11. let result: string = '';
12. let attr: asset.AssetMap = new Map();
13. attr.set(asset.Tag.SECRET, stringToArray('demo_pwd'));
14. attr.set(asset.Tag.ALIAS, stringToArray('demo_alias'));
15. attr.set(asset.Tag.DATA_LABEL_NORMAL_1, stringToArray('demo_label'));
16. attr.set(asset.Tag.SYNC_TYPE, asset.SyncType.TRUSTED_DEVICE); // 需指定在可信设备间同步（如新旧设备间克隆）。

18. try {
19. await asset.add(attr).then(() => {
20. console.info(`Succeeded in adding Asset with sync.`);
21. result = 'Succeeded in adding Asset with sync';
22. }).catch((err: BusinessError) => {
23. console.error(`Failed to add Asset with sync. Code is ${err.code}, message is ${err.message}`);
24. result = 'Failed to add Asset with sync';
25. })
26. } catch (error) {
27. let err = error as BusinessError;
28. console.error(`Failed to add Asset with sync. Code is ${err?.code}, message is ${err?.message}`);
29. result = 'Failed to add Asset with sync';
30. }
31. return result;
32. }
```

[add\_sync.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Security/AssetStoreKit/AssetStoreArkTS/entry/src/main/ets/operations/add_sync.ets#L16-L49)

## 接入备份恢复扩展能力

为触发应用数据备份恢复，需要[应用接入数据备份恢复](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-file-backup-extension)。

## 查询关键资产同步结果

### 接口介绍

通过API文档查看查询关键资产同步结果接口[asset.querySyncResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-asset#assetquerysyncresult20)。

在查询关键资产同步结果时，关键资产属性的内容（AssetMap）参数如下表所示。

展开

| 属性名称（Tag） | 属性内容（Value） | 是否可选 | 说明 |
| --- | --- | --- | --- |
| REQUIRE\_ATTR\_ENCRYPTED14+ | 类型为boolean。 | 是 | 是否查询业务自定义附属信息被加密的关键资产同步结果。true表示查询业务自定义附属信息加密存储的关键资产同步结果，false表示查询业务自定义附属信息不加密存储的关键资产同步结果。默认值为false。 |
| GROUP\_ID18+ | 类型为Uint8Array，长度为7-127字节。 | 是 | 待查询的关键资产所属群组，默认查询不属于任何群组的关键资产同步结果。 |

### 代码示例

收起

自动换行

深色代码主题

复制

```
1. import { asset } from '@kit.AssetStoreKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. export async function querySyncResult(): Promise<string> {
5. let result: string = '';
6. let query: asset.AssetMap = new Map();
7. await asset.querySyncResult(query).then((res: asset.SyncResult) => {
8. console.info(`Succeeded in querying sync result: ${JSON.stringify(res)}`);
9. result = 'Succeeded in querying sync result';
10. }).catch((err: BusinessError) => {
11. console.error(`Failed to query sync result of Asset. Code is ${err.code}, message is ${err.message}`);
12. result = 'Failed to query sync result of Asset';
13. });
14. return result;
15. }
```

[query\_sync\_result.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Security/AssetStoreKit/AssetStoreArkTS/entry/src/main/ets/operations/query_sync_result.ets#L16-L32)

## 约束和限制

在可信设备间同步过程中，新旧设备的关键资产均需处于可访问的状态，否则可能出现关键资产无法同步的情况。

* 仅设置密码时可访问的关键资产，如果新旧设备中任意一台设备未设置锁屏密码，则无法同步成功。
* 仅屏幕处于解锁状态时可访问的关键资产，如果新旧设备中任意一台设备的屏幕未处于解锁状态，则无法同步成功。
* 仅用户认证通过后可访问的关键资产，如果旧设备未设置锁屏密码，则无法同步成功。