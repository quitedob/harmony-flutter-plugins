## 场景介绍

Enterprise Data Guard Kit为应用提供对指定路径下文件的删除能力。

## 接口说明

详细接口说明可参考[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard)。

展开

| 接口名 | 描述 |
| --- | --- |
| [deleteFile](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section102212058545)(path: string, callback: AsyncCallback<void>): void | 使用Callback方式删除扫描范围内的文件。 |
| [deleteFile](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section869414101554)(path: string): Promise<void> | 使用Promise方式删除扫描范围内的文件。 |

## 开发步骤

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { fileGuard } from '@kit.EnterpriseDataGuardKit';
   ```
2. 初始化[FileGuard](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section18457214114215)对象guard，调用接口deleteFile，删除扫描范围内的文件。
   * 通过回调函数方式，删除扫描范围内的文件。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';

   3. function deleteFileCallback() {
   4. let guard: fileGuard.FileGuard = new fileGuard.FileGuard();
   5. let path: string = '/data/service/el2/{account_id}/hmdfs/account/files/Docs/Documents/test.txt';
   6. guard.deleteFile(path, (err: BusinessError) => {
   7. if (err) {
   8. console.error(`Failed to delete file. Code: ${err.code}, message: ${err.message}.`);
   9. } else {
   10. console.info(`Succeeded in deleting file.`);
   11. }
   12. });
   13. }
   ```

   * 通过Promise方式，删除扫描范围内的文件。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';

   3. function deleteFilePromise() {
   4. let guard: fileGuard.FileGuard = new fileGuard.FileGuard();
   5. let path: string = '/data/service/el2/{account_id}/hmdfs/account/files/Docs/Documents/test.txt';
   6. guard.deleteFile(path).then(() => {
   7. console.info(`Succeeded in deleting file.`);
   8. }).catch((err: BusinessError) => {
   9. console.error(`Failed to delete file. Code: ${err.code}, message: ${err.message}.`);
   10. });
   11. }
   ```