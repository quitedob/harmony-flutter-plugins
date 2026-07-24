## 场景介绍

从6.0.1(21)开始，支持设置系统服务进程不可访问后台用户数据的能力。

Enterprise Space Kit为应用提供设置系统服务进程不可访问后台用户数据的功能。例如，当前台是企业用户，后台是个人用户时，应用设置了对应个人用户的管控，此时不允许系统服务进程访问后台个人用户的数据。

## 接口说明

详细接口说明可参考[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section16390141073315)。

展开

| 接口名 | 描述 |
| --- | --- |
| [setRestrictedAccessBackgroundUserdata](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section16390141073315)(userData: [UserDataEnum](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section8847145144416), enable: boolean): Promise<void> | 设置系统服务进程不可访问后台用户数据的功能。使用Promise异步回调。 |

## 开发步骤

1. 导入Enterprise Space Kit模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { spaceManager } from '@kit.EnterpriseSpaceKit';
   ```
2. 调用接口[setRestrictedAccessBackgroundUserdata](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section16390141073315)，设置系统服务进程不可访问后台用户数据的功能，并且查看打印信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const userData: spaceManager.UserDataEnum = spaceManager.UserDataEnum.ENTERPRISE;
   2. const enable: boolean = false;
   3. try {
   4. await spaceManager.setRestrictedAccessBackgroundUserdata(userData, enable)
   5. console.info(`Succeeded in setting restricted access background user data. userData: ${userData}, enable: ${enable}`);
   6. } catch (err) {
   7. console.error(`Failed to set restricted access background user data. Code: ${err.code}, message: ${err.message}`);
   8. }
   ```