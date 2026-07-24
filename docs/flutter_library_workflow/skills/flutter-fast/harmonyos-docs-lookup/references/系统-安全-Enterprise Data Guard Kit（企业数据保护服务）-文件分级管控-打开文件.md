## 场景介绍

普通应用无法直接访问公共路径下的文件，Enterprise Data Guard Kit为应用提供相关接口以获取文件描述符（fd）。

## 接口说明

详细接口说明可参考[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard)。

展开

| 接口名 | 描述 |
| --- | --- |
| [openFile](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section132239575117)(path: string, callback: AsyncCallback<number>): void | 使用Callback方式获取指定目录文件fd。 |
| [openFile](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section1292915920212)(path: string): Promise<number> | 使用Promise方式获取指定目录文件fd。 |
| [openFileWrite](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section779510429368)(path: string, callback: AsyncCallback<number>): void | 使用Callback方式获取指定目录文件只写模式fd。 |
| [openFileWrite](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section198141025172920)(path: string): Promise<number> | 使用Promise方式获取指定目录文件只写模式fd。 |

## 开发步骤

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { fileGuard } from '@kit.EnterpriseDataGuardKit';
   ```
2. 初始化[FileGuard](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section18457214114215)对象guard，调用接口openFile或者openFileWrite，并且可选择以下一种方式获取指定目录文件fd。
   * 通过回调函数方式，获取文件fd。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';

   3. function openFileCallback() {
   4. let guard: fileGuard.FileGuard = new fileGuard.FileGuard();
   5. let path: string = '/data/service/el2/test/test.txt';
   6. guard.openFile(path, (err: BusinessError, fd: number) => {
   7. if (err) {
   8. console.error(`Failed to open file. Code: ${err.code}, message: ${err.message}.`);
   9. return;
   10. }
   11. console.info(`Succeeded in opening file. path: ${path}, fd: ${fd}.`);
   12. });
   13. }
   ```

   * 通过Promise方式，获取文件fd。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';

   3. function openFilePromise() {
   4. let guard: fileGuard.FileGuard = new fileGuard.FileGuard();
   5. let path: string = '/data/service/el2/test/test.txt';
   6. guard.openFile(path).then((fd: number) => {
   7. console.info(`Succeeded in opening file. path: ${path} , fd: ${fd}.`);
   8. }).catch((err: BusinessError) => {
   9. console.error(`Failed to open file. Code: ${err.code}, message: ${err.message}.`);
   10. });
   11. }
   ```