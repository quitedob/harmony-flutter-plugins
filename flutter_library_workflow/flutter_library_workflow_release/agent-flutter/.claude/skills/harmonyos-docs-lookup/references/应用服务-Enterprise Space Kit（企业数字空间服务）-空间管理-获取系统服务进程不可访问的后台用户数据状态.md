## 场景介绍

从6.0.1(21)开始，支持获取系统服务进程不可访问的后台用户数据状态的能力。

Enterprise Space Kit为应用提供获取系统服务进程管控不可访问后台用户数据的状态，用于确认系统服务进程是否被管控访问后台用户数据。

## 接口说明

详细接口说明可参考[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section4269102713541)。

展开

| 接口名 | 描述 |
| --- | --- |
| [getRestrictedAccessBackgroundUserdataStatus](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section4269102713541)(userData: [UserDataEnum](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section8847145144416)): Promise<boolean> | 获取系统服务进程管控不可访问后台用户数据的状态。使用Promise异步回调。 |

## 开发步骤

1. 导入Enterprise Space Kit模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { spaceManager } from '@kit.EnterpriseSpaceKit';
   ```
2. 调用接口[getRestrictedAccessBackgroundUserdataStatus](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section4269102713541)，提供获取系统服务进程管控不可访问后台用户数据的状态，并且查看打印信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const userData: spaceManager.UserDataEnum = spaceManager.UserDataEnum.ENTERPRISE;
   2. try {
   3. const status: boolean = await spaceManager.getRestrictedAccessBackgroundUserdataStatus(userData);
   4. console.info(`Succeeded in getting restricted access background user data status. status: ${status}`);
   5. } catch (err) {
   6. console.error(`Failed to get restricted access background user data status. Code: ${err.code}, message: ${err.message}`);
   7. }
   ```