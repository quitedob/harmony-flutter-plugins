## 场景介绍

Enterprise Data Guard Kit为应用提供设置KIA文件列表的能力，HarmonyOS系统根据管控策略对KIA文件列表中的文件实行管控。

## 接口说明

详细接口说明可参考[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard)。

展开

| 接口名 | 描述 |
| --- | --- |
| [setKiaFilelist](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section276855317514)(filelist: string, callback: AsyncCallback<void>): void | 使用Callback方式设置KIA文件列表。 |
| [setKiaFilelist](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section920033180)(filelist: string): Promise<void> | 使用Promise方式设置KIA文件列表。 |

## 开发步骤

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { fileGuard } from '@kit.EnterpriseDataGuardKit';
   ```
2. 初始化[FileGuard](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section18457214114215)对象guard，将KIA文件列表对象转为字符串，调用接口setKiaFilelist，设置KIA文件列表。
   * 通过回调函数方式，设置KIA文件列表。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';

   3. function setKiaFilelistCallback() {
   4. let guard: fileGuard.FileGuard = new fileGuard.FileGuard();
   5. let fileListStr: string =
   6. '{"kia_filelist":["/data/service/el2/{account_id}/hmdfs/account/files/Documents/Desktop/aaa.docx",' +
   7. '"/data/service/el2/{account_id}/hmdfs/account/files/Documents/Desktop/bbb.docx"]}';
   8. guard.setKiaFilelist(fileListStr, (err: BusinessError) => {
   9. if (err) {
   10. console.error(`Failed to set the list of KIA file. Code: ${err.code}, message: ${err.message}.`);
   11. } else {
   12. console.info(`Succeeded in setting the list of KIA file.`);
   13. }
   14. });
   15. }
   ```

   * 通过Promise方式，设置KIA文件列表。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';

   3. function setKiaFilelistPromise() {
   4. let guard: fileGuard.FileGuard = new fileGuard.FileGuard();
   5. let fileListStr: string =
   6. '{"kia_filelist":["/data/service/el2/{account_id}/hmdfs/account/files/Documents/Desktop/aaa.docx",' +
   7. '"/data/service/el2/{account_id}/hmdfs/account/files/Documents/Desktop/bbb.docx"]}';
   8. guard.setKiaFilelist(fileListStr).then(() => {
   9. console.info(`Succeeded in setting the list of KIA file.`);
   10. }).catch((err: BusinessError) => {
   11. console.error(`Failed to set the list of KIA file. Code: ${err.code}, message: ${err.message}.`);
   12. });
   13. }
   ```