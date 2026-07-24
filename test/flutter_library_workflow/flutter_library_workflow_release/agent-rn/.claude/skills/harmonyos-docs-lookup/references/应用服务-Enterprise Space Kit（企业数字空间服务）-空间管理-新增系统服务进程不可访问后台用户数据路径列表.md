## 场景介绍

从6.0.1(21)开始，支持新增系统服务进程不可访问后台用户数据路径列表的能力。

Enterprise Space Kit为应用提供新增系统服务进程不可访问后台用户数据路径列表的功能。用于应用新增管控系统服务进程时的场景。

## 接口说明

详细接口说明可参考[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section1674601141)。

展开

| 接口名 | 描述 |
| --- | --- |
| [addRestrictedAccessBackgroundUserdataProcessList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section1674601141)(userData: [UserDataEnum](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section8847145144416), processName: string, disallowPaths ?: string[]): Promise<void> | 新增系统服务进程不可访问后台用户数据路径列表。使用Promise异步回调。 |

## 开发步骤

1. 导入Enterprise Space Kit模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { spaceManager } from '@kit.EnterpriseSpaceKit';
   ```
2. 调用接口[addRestrictedAccessBackgroundUserdataProcessList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section1674601141)，新增系统服务进程不可访问后台用户数据路径列表，并且查看打印信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const userData: spaceManager.UserDataEnum = spaceManager.UserDataEnum.ENTERPRISE;
   2. const processName: string = 'testSa';
   3. const disallowPaths: string[] = ['/data/service', '/data/app'];
   4. try {
   5. await spaceManager.addRestrictedAccessBackgroundUserdataProcessList(userData, processName, disallowPaths);
   6. console.info(`Succeeded in adding restricted access background user data process list`);
   7. } catch (err) {
   8. console.error(`Failed to add restricted access background user data process list. Code: ${err.code}, message: ${err.message}`);
   9. }
   ```