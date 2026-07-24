## 场景介绍

Enterprise Data Guard Kit为应用提供获取文件路径信息的能力，该路径可被应用直接打开，从而辅助判断是否是KIA文件。

## 接口说明

详细接口说明可参考[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard)。

展开

| 接口名 | 描述 |
| --- | --- |
| [getFileUri](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section10575755137)(path: string, callback: AsyncCallback<[FilePathInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section1026911633210)>): void | 使用Callback方式获取文件路径信息。 |
| [getFileUri](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section1297191246)(path: string): Promise<[FilePathInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section1026911633210)> | 使用Promise方式获取文件路径信息。 |

## 开发步骤

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { fileGuard } from '@kit.EnterpriseDataGuardKit';
   ```
2. 初始化[FileGuard](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section18457214114215)对象guard，调用接口getFileUri，获取文件URI。
   * 通过回调函数方式，获取文件URI。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';

   3. function getFileUriCallback() {
   4. let guard: fileGuard.FileGuard = new fileGuard.FileGuard();
   5. let path: string = '/data/service/el2/{account_id}/hmdfs/account/files/test/test.txt';
   6. guard.getFileUri(path, (err: BusinessError, data: fileGuard.FilePathInfo) => {
   7. if (err) {
   8. console.error(`Failed to get file uri. Code: ${err.code}, message: ${err.message}.`);
   9. } else {
   10. console.info(`Succeeded in getting file uri.`);
   11. }
   12. });
   13. }
   ```

   * 通过Promise方式，获取文件URI。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';

   3. function getFileUriPromise() {
   4. let guard: fileGuard.FileGuard = new fileGuard.FileGuard();
   5. let path: string = '/data/service/el2/{account_id}/hmdfs/account/files/test/test.txt';
   6. guard.getFileUri(path).then((data: fileGuard.FilePathInfo) => {
   7. console.info(`Succeeded in getting the uri of file.`);
   8. }).catch((err: BusinessError) => {
   9. console.error(`Failed to get the uri of file. Code: ${err.code}, message: ${err.message}.`);
   10. });
   11. }
   ```