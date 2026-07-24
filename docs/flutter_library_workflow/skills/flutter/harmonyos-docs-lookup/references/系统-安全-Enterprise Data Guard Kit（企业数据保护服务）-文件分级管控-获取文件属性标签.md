## 场景介绍

Enterprise Data Guard Kit为应用提供获取文件属性标签的能力，HarmonyOS系统根据管控策略和文件属性标签对文件实行管控。

## 接口说明

详细接口说明可参考[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard)。

展开

| 接口名 | 描述 |
| --- | --- |
| [queryFileTag](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section195124201031)(path: string, callback: AsyncCallback<[FileTagInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section118461622113311)>): void | 使用Callback方式获取文件属性标签。 |
| [queryFileTag](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section62600419317)(path: string): Promise<[FileTagInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section118461622113311)> | 使用Promise方式获取文件属性标签。 |

## 开发步骤

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { fileGuard } from '@kit.EnterpriseDataGuardKit';
   ```
2. 初始化[FileGuard](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section18457214114215)对象guard，调用接口queryFileTag，获取文件属性标签。
   * 通过回调函数方式，获取文件属性标签。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';

   3. function queryFileTagCallback() {
   4. let guard: fileGuard.FileGuard = new fileGuard.FileGuard();
   5. let path: string = '/data/service/el2/test/test.txt';
   6. guard.queryFileTag(path, (err: BusinessError, data: fileGuard.FileTagInfo) => {
   7. if (err) {
   8. console.error(`Failed to query file tag. Code: ${err.code}, message: ${err.message}.`);
   9. return;
   10. }
   11. console.info(`Succeeded in querying file tag.`);
   12. });
   13. }
   ```

   * 通过Promise方式，获取文件属性标签。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';

   3. function queryFileTagPromise() {
   4. let guard: fileGuard.FileGuard = new fileGuard.FileGuard();
   5. let path: string = '/data/service/el2/test/test.txt';
   6. guard.queryFileTag(path).then((data: fileGuard.FileTagInfo) => {
   7. console.info(`Succeeded in querying file tag.`);
   8. }).catch((err: BusinessError) => {
   9. console.error(`Failed to query file tag. Code: ${err.code}, message: ${err.message}.`);
   10. });
   11. }
   ```