## 场景介绍

Enterprise Data Guard Kit为应用提供公共路径和指定目录的扫描能力，获取对应目录下的文件列表。

## 接口说明

详细接口说明可参考[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard)。

展开

| 接口名 | 描述 |
| --- | --- |
| [startFileScanTask](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section5572254110)(type: [CommonDirScanType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section1753862116813), callback: [ScanFileCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section1747318273273), batchNum?: number): void | 通过Callback的方式，扫描公共目录并返回结果。 |
| [startFileScanTask](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section17212835417)(path: string, callback: [ScanFileCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section1747318273273), batchNum?: number): void | 通过Callback的方式，扫描指定目录并返回结果。 |

## 开发步骤

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { fileGuard } from '@kit.EnterpriseDataGuardKit';
   ```
2. 初始化[FileGuard](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section18457214114215)对象guard，并且声明扫描结果回调函数。
   * 按照文件类型扫描公共空间文件，查看打印结果。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. function startFileScanTaskUnderCommonDir() {
   2. let guard: fileGuard.FileGuard = new fileGuard.FileGuard();
   3. let onReceiveFileList: (files: string[]) => void = (files: Array<string>) => {
   4. files.forEach((value: string, index: number) => {
   5. console.info(`Succeeded in getting file: ${value}.`);
   6. })
   7. };
   8. let onCompleteScanTask: (count: number) => void = (count: number) => {
   9. console.info(`Succeeded in getting count: ${count}.`);
   10. };
   11. let scanFileCallback: fileGuard.ScanFileCallback = {
   12. onReceiveFileList: onReceiveFileList,
   13. onTaskCompleted: onCompleteScanTask
   14. };
   15. guard.startFileScanTask(fileGuard.CommonDirScanType.MEDIA_ONLY, scanFileCallback);
   16. }
   ```

   * 扫描公共空间指定路径下的文件，查看打印结果。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. function startFileScanTaskUnderSpecifiedDir() {
   2. let guard: fileGuard.FileGuard = new fileGuard.FileGuard();
   3. let path: string = '/data/service/el2/test';
   4. let onReceiveFileList: (files: string[]) => void = (files: Array<string>) => {
   5. files.forEach((value: string, index: number) => {
   6. console.info(`Succeeded in getting file: ${value}.`);
   7. })
   8. };
   9. let onCompleteScanTask: (count: number) => void = (count: number) => {
   10. console.info(`Succeeded in getting count: ${count}.`);
   11. };
   12. let scanFileCallback: fileGuard.ScanFileCallback = {
   13. onReceiveFileList: onReceiveFileList,
   14. onTaskCompleted: onCompleteScanTask
   15. };
   16. guard.startFileScanTask(path, scanFileCallback);
   17. }
   ```