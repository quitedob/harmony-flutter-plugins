HUKS提供了接口供应用查询密钥别名集。

说明

轻量级智能穿戴不支持查询密钥别名集功能。

## 开发步骤

1. 初始化密钥属性集，用于查询指定密钥别名集TAG。TAG仅支持[HUKS\_TAG\_AUTH\_STORAGE\_LEVEL](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-huks#hukstag)。
2. 调用接口[listAliases](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-huks#hukslistaliases12)，查询密钥别名集。

收起

自动换行

深色代码主题

复制

```
1. /*
2. * 以下查询密钥别名集Promise操作使用为例
3. */
4. import { huks } from '@kit.UniversalKeystoreKit'

6. async function testListAliases() {
7. /* 1.初始化密钥属性集 */
8. let queryProperties: Array<huks.HuksParam> = [
9. {
10. tag: huks.HuksTag.HUKS_TAG_AUTH_STORAGE_LEVEL,
11. value: huks.HuksAuthStorageLevel.HUKS_AUTH_STORAGE_LEVEL_DE
12. }
13. ];
14. let queryOptions: huks.HuksOptions = {
15. properties: queryProperties
16. };

18. try {
19. /* 2.查询密钥别名集 */
20. let result: huks.HuksListAliasesReturnResult = await huks.listAliases(queryOptions);
21. console.info(`promise: listAliases success`);
22. } catch (error) {
23. console.error(`promise: listAliases fail`);
24. throw (error as Error);
25. }
26. }
```

[QueryKeyAliasSet.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Security/UniversalKeystoreKit/OtherOperations/QueryKeyAliasSet/entry/src/main/ets/pages/QueryKeyAliasSet.ets#L16-L43)