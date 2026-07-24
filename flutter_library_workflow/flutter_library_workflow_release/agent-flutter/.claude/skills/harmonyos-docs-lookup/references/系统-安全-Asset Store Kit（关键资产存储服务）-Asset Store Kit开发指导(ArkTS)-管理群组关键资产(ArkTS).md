以下为管理群组关键资产使用示例，请先查看开发指导：

* [新增关键资产(ArkTS)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/asset-js-add)
* [删除关键资产(ArkTS)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/asset-js-remove)
* [更新关键资产(ArkTS)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/asset-js-update)
* [查询关键资产(ArkTS)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/asset-js-query)

## 前置条件

在应用配置文件app.json5中，配置群组ID，如：demo\_group\_id。群组支持配置多个群组ID。

收起

自动换行

深色代码主题

复制

```
1. {
2. "app": {
3. // 其他配置项此处省略。
4. "assetAccessGroups": [
5. "demo_group_id",
6. // "another_group_id",
7. // ...
8. ]
9. }
10. }
```

## 新增群组关键资产

在群组中新增密码为demo\_pwd、别名为demo\_alias、附属信息为demo\_label的关键资产。

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

10. export async function addGroupAsset(): Promise<string> {
11. let result: string = '';
12. let attr: asset.AssetMap = new Map();
13. attr.set(asset.Tag.SECRET, stringToArray('demo_pwd'));
14. attr.set(asset.Tag.ALIAS, stringToArray('demo_alias'));
15. attr.set(asset.Tag.DATA_LABEL_NORMAL_1, stringToArray('demo_label'));
16. attr.set(asset.Tag.GROUP_ID, stringToArray('demo_group_id'));
17. try {
18. await asset.add(attr).then(() => {
19. console.info(`Succeeded in adding Asset to the group.`);
20. result = 'Succeeded in adding Asset to the group';
21. }).catch((err: BusinessError) => {
22. console.error(`Failed to add Asset to the group. Code is ${err.code}, message is ${err.message}`);
23. result = 'Failed to add Asset to the group';
24. })
25. } catch (error) {
26. let err = error as BusinessError;
27. console.error(`Failed to add Asset to the group. Code is ${err?.code}, message is ${err?.message}`);
28. result = 'Failed to add Asset to the group';
29. }
30. return result;
31. }
```

[add\_group.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Security/AssetStoreKit/AssetStoreArkTS/entry/src/main/ets/operations/add_group.ets#L16-L48)

## 删除群组关键资产

在群组中删除别名为demo\_alias的关键资产。

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

10. export async function removeGroupAsset(): Promise<string> {
11. let result: string = '';
12. let query: asset.AssetMap = new Map();
13. query.set(asset.Tag.ALIAS, stringToArray('demo_alias')); // 此处指定别名删除单条群组关键资产，也可不指定别名删除多条群组关键资产。
14. query.set(asset.Tag.GROUP_ID, stringToArray('demo_group_id'));
15. try {
16. await asset.remove(query).then(() => {
17. console.info(`Succeeded in removing Asset from the group.`);
18. result = 'Succeeded in removing Asset from the group';
19. }).catch((err: BusinessError) => {
20. console.error(`Failed to remove Asset from the group. Code is ${err.code}, message is ${err.message}`);
21. result = 'Failed to remove Asset from the group';
22. });
23. } catch (err) {
24. console.error(`Failed to remove Asset from the group. Code is ${err?.code}, message is ${err?.message}`);
25. result = 'Failed to remove Asset from the group';
26. }
27. return result;
28. }
```

[remove\_group.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Security/AssetStoreKit/AssetStoreArkTS/entry/src/main/ets/operations/remove_group.ets#L16-L45)

## 更新群组关键资产

在群组中更新别名为demo\_alias的关键资产，明文更新为demo\_pwd\_new，附属属性更新为demo\_label\_new。

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

10. export async function updateGroupAsset(): Promise<string> {
11. let result: string = '';
12. let query: asset.AssetMap = new Map();
13. query.set(asset.Tag.ALIAS, stringToArray('demo_alias'));
14. query.set(asset.Tag.GROUP_ID, stringToArray('demo_group_id'));
15. let attrsToUpdate: asset.AssetMap = new Map();
16. attrsToUpdate.set(asset.Tag.SECRET, stringToArray('demo_pwd_new'));
17. attrsToUpdate.set(asset.Tag.DATA_LABEL_NORMAL_1, stringToArray('demo_label_new'));
18. try {
19. await asset.update(query, attrsToUpdate).then(() => {
20. console.info(`Succeeded in updating Asset in the group.`);
21. result = 'Succeeded in updating Asset in the group';
22. }).catch((err: BusinessError) => {
23. console.error(`Failed to update Asset in the group. Code is ${err.code}, message is ${err.message}`);
24. result = 'Failed to update Asset in the group';
25. });
26. } catch (err) {
27. console.error(`Failed to update Asset in the group. Code is ${err?.code}, message is ${err?.message}`);
28. result = 'Failed to update Asset in the group';
29. }
30. return result;
31. }
```

[update\_group.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Security/AssetStoreKit/AssetStoreArkTS/entry/src/main/ets/operations/update_group.ets#L16-L48)

## 查询单条群组关键资产明文

在群组中查询别名为demo\_alias的关键资产明文。

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

10. function arrayToString(arr: Uint8Array): string {
11. let textDecoder = util.TextDecoder.create('utf-8', { ignoreBOM: true });
12. let str = textDecoder.decodeToString(arr, { stream: false });
13. return str;
14. }

16. export async function queryGroupAssetPlaintext(): Promise<string> {
17. let result: string = '';
18. let query: asset.AssetMap = new Map();
19. query.set(asset.Tag.ALIAS, stringToArray('demo_alias')); // 指定了群组关键资产别名，最多查询到一条满足条件的群组关键资产。
20. query.set(asset.Tag.RETURN_TYPE, asset.ReturnType.ALL); // 此处表示需要返回群组关键资产的所有信息，即属性+明文。
21. query.set(asset.Tag.GROUP_ID, stringToArray('demo_group_id'));
22. try {
23. await asset.query(query).then((res: Array<asset.AssetMap>) => {
24. for (let i = 0; i < res.length; i++) {
25. // 解析secret。
26. let secret: Uint8Array = res[i].get(asset.Tag.SECRET) as Uint8Array;
27. // 将Uint8Array转换为string类型。
28. let secretStr: string = arrayToString(secret);
29. }
30. result = 'Succeeded in querying group Asset plaintext';
31. }).catch((err: BusinessError) => {
32. console.error(`Failed to query Asset plaintext from the group. Code is ${err.code}, message is ${err.message}`);
33. result = 'Failed to query Asset plaintext from the group';
34. });
35. } catch (err) {
36. console.error(`Failed to query Asset plaintext from the group. Code is ${err?.code}, message is ${err?.message}`);
37. result = 'Failed to query Asset plaintext from the group';
38. }
39. return result;
40. }
```

[query\_group\_plaintext.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Security/AssetStoreKit/AssetStoreArkTS/entry/src/main/ets/operations/query_group_plaintext.ets#L16-L57)

## 查询单条群组关键资产属性

在群组中查询别名为demo\_alias的关键资产属性。

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

10. export async function queryGroupAssetAttribute(): Promise<string> {
11. let result: string = '';
12. let query: asset.AssetMap = new Map();
13. query.set(asset.Tag.ALIAS, stringToArray('demo_alias')); // 指定了群组关键资产别名，最多查询到一条满足条件的群组关键资产。
14. query.set(asset.Tag.RETURN_TYPE, asset.ReturnType.ATTRIBUTES); // 此处表示仅返回群组关键资产属性，不包含群组关键资产明文。
15. query.set(asset.Tag.GROUP_ID, stringToArray('demo_group_id'));
16. try {
17. await asset.query(query).then((res: Array<asset.AssetMap>) => {
18. for (let i = 0; i < res.length; i++) {
19. // 解析属性。
20. let accessibility: number = res[i].get(asset.Tag.ACCESSIBILITY) as number;
21. console.info(`Succeeded in getting accessibility, which is: ${accessibility}.`);
22. }
23. result = 'Succeeded in querying group Asset attribute';
24. }).catch((err: BusinessError) => {
25. console.error(`Failed to query Asset attribute from the group. Code is ${err.code}, message is ${err.message}`);
26. result = 'Failed to query Asset attribute from the group';
27. });
28. } catch (err) {
29. console.error(`Failed to query Asset attribute from the group. Code is ${err?.code}, message is ${err?.message}`);
30. result = 'Failed to query Asset attribute from the group';
31. }
32. return result;
33. }
```

[query\_group\_attr.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Security/AssetStoreKit/AssetStoreArkTS/entry/src/main/ets/operations/query_group_attr.ets#L16-L50)