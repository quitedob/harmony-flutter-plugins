## 场景介绍

Enterprise Data Guard Kit为应用提供对文件设置属性标签的能力，方便应用对管控文件进行标识、分类。

## 接口说明

详细接口说明可参考[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard)。

展开

| 接口名 | 描述 |
| --- | --- |
| [setFileTag](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section41871252322)(path: string, level: [SecurityLevel](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section36136612415), tag: string, callback: AsyncCallback<void>): void | 使用Callback方式设置文件属性标签。 |
| [setFileTag](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section8961041532)(path: string, level: [SecurityLevel](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section36136612415), tag: string): Promise<void> | 使用Promise方式设置文件属性标签。 |
| [setFileCustomTag](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section379716351208)(path: string, tagList: Array<string>, callback: AsyncCallback<void>): void; | 使用Callback方式设置文件自定义属性标签。 |
| [setFileCustomTag](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section123482527015)(path: string, tagList: Array<string>): Promise<void>; | 使用Promise方式设置文件自定义属性标签。 |
| [unsetFileCustomTag](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section1510152719118)(path: string, tagList: Array<string>, callback: AsyncCallback<void>): void; | 使用Callback方式取消设置文件自定义属性标签。 |
| [unsetFileCustomTag](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section45481034915)(path: string, tagList: Array<string>): Promise<void>; | 使用Promise方式取消设置文件自定义属性标签。 |

## 开发步骤

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { fileGuard } from '@kit.EnterpriseDataGuardKit';
   ```
2. 初始化[FileGuard](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section18457214114215)对象guard，调用接口setFileTag或setFileCustomTag，设置文件属性标签，自定义属性标签可通过unsetFileCustomTag取消设置。
   * 通过回调函数方式，设置文件属性标签。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';

   3. function setFileTagCallback() {
   4. let guard: fileGuard.FileGuard = new fileGuard.FileGuard();
   5. let path: string = '/data/service/el2/test/test.txt';
   6. let tag: string = 'test';
   7. guard.setFileTag(path, fileGuard.SecurityLevel.EXTERNAL, tag, (err: BusinessError) => {
   8. if (err) {
   9. console.error(`Failed to set file tag. Code: ${err.code}, message: ${err.message}.`);
   10. return;
   11. }
   12. console.info(`Succeeded in setting file tag.`);
   13. });
   14. }
   ```

   * 通过Promise方式，设置文件属性标签。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';

   3. function setFileTagPromise() {
   4. let guard: fileGuard.FileGuard = new fileGuard.FileGuard();
   5. let path: string = '/data/service/el2/test/test.txt';
   6. let tag: string = 'test';
   7. guard.setFileTag(path, fileGuard.SecurityLevel.EXTERNAL, tag).then(() => {
   8. console.info(`Succeeded in setting file tag.`);
   9. }).catch((err: BusinessError) => {
   10. console.error(`Failed to set file tag. Code: ${err.code}, message: ${err.message}.`);
   11. });
   12. }
   ```