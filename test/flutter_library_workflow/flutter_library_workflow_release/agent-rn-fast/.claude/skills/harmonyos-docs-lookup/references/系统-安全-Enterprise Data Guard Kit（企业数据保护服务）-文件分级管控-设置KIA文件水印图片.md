## 场景介绍

为应用提供设置KIA文件水印图片能力。

## 接口说明

详细接口说明可参考[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard)。

展开

| 接口名 | 描述 |
| --- | --- |
| [setKiaWatermarkImage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section7932161212533)(image: Uint8Array, info: string): Promise<void> | 使用Promise方式设置KIA文件水印图片。 |

## 开发步骤

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { fileGuard } from '@kit.EnterpriseDataGuardKit';
   ```
2. 初始化[FileGuard](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section18457214114215)对象guard，调用接口[setKiaWatermarkImage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section7932161212533)，设置KIA文件水印图片。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { fileIo as fs } from '@kit.CoreFileKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';

   4. async function testSetKiaWaterMarkImage() {
   5. try {
   6. let guard: fileGuard.FileGuard = new fileGuard.FileGuard();
   7. let imagePath: string = '/data/service/el2/{account_id}/hmdfs/account/files/Docs/Documents/1.png';
   8. let fd: number = await guard.openFile(imagePath);
   9. let stat: fs.Stat = fs.statSync(fd);
   10. let buffer: ArrayBuffer = new ArrayBuffer(stat.size);
   11. fs.readSync(fd, buffer);

   13. let image: Uint8Array = new Uint8Array(buffer);
   14. let info: string = new Date().toLocaleString();
   15. guard.setKiaWatermarkImage(image, info).then(() => {
   16. console.info(`Succeeded in setting the watermark image for Kia file.`);
   17. }).catch((err: BusinessError) => {
   18. console.error(`Failed to set the watermark image for Kia file. Code: ${err.code}, message: ${err.message}.`);
   19. })
   20. } catch (e) {
   21. console.error(`[scanFileGuard] testSetKiaWaterMarkImage Exception, Code: ${e.code}, message: ${e.message}`);
   22. }
   23. }
   ```