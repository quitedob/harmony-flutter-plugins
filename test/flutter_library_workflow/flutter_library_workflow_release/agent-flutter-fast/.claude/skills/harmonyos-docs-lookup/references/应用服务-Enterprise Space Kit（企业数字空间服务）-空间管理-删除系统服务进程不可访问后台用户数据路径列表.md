## 场景介绍

从6.0.1(21)开始，支持删除系统服务进程不可访问后台用户数据路径列表的能力。

Enterprise Space Kit为应用提供删除系统服务进程不可访问后台用户数据路径列表的功能。用于应用删除管控系统服务进程时的场景。

## 接口说明

详细接口说明可参考[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section815011291814)。

展开

| 接口名 | 描述 |
| --- | --- |
| [deleteRestrictedAccessBackgroundUserdataProcessList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section815011291814)(userData: [UserDataEnum](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section8847145144416)), processName: string): Promise<void> | 删除系统服务进程不可访问后台用户数据路径列表。使用Promise异步回调。 |

## 开发步骤

1. 导入Enterprise Space Kit模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { spaceManager } from '@kit.EnterpriseSpaceKit';
   ```
2. 调用接口[deleteRestrictedAccessBackgroundUserdataProcessList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section815011291814)，删除系统服务进程不可访问后台用户数据路径列表，并且查看打印信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const userData: spaceManager.UserDataEnum = spaceManager.UserDataEnum.ENTERPRISE;
   2. const processName: string = 'testSa';
   3. try {
   4. await spaceManager.deleteRestrictedAccessBackgroundUserdataProcessList(userData, processName);
   5. console.info(`Succeeded in deleting restricted access background user data process list`);
   6. } catch (err) {
   7. console.error(`Failed to delete restricted access background user data process list. Code: ${err.code}, message: ${err.message}`);
   8. }
   ```