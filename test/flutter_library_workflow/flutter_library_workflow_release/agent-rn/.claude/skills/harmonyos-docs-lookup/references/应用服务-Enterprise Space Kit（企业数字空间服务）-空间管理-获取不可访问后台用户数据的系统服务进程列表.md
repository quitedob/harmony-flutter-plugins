## 场景介绍

从6.0.1(21)开始，支持获取不可访问后台用户数据的系统服务进程列表的能力。

Enterprise Space Kit为应用提供获取通过接口[addRestrictedAccessBackgroundUserdataProcessList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section1674601141)添加管控的系统服务进程列表的功能。

## 接口说明

详细接口说明可参考[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section1362244814574)。

展开

| 接口名 | 描述 |
| --- | --- |
| [getRestrictedAccessBackgroundUserdataProcessList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section1362244814574)(userData: [UserDataEnum](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section8847145144416)): Promise<ProcessConfigInfo[]> | 获取不可访问后台用户数据的系统服务进程列表。使用Promise异步回调。 |

## 开发步骤

1. 导入Enterprise Space Kit模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { spaceManager } from '@kit.EnterpriseSpaceKit';
   ```
2. 调用接口[getRestrictedAccessBackgroundUserdataProcessList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section1362244814574)，获取不可访问后台用户数据的系统服务进程列表，并且查看打印信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const userData: spaceManager.UserDataEnum = spaceManager.UserDataEnum.ENTERPRISE;
   2. try {
   3. const processConfigInfos: spaceManager.ProcessConfigInfo[] = await spaceManager.getRestrictedAccessBackgroundUserdataProcessList(userData);
   4. console.info(`Succeeded in getting restricted access background user data process list. process config infos: ${JSON.stringify(processConfigInfos)}`);
   5. } catch (err) {
   6. console.error(`Failed to get restricted access background user data process list. Code: ${err.code}, message: ${err.message}`);
   7. }
   ```