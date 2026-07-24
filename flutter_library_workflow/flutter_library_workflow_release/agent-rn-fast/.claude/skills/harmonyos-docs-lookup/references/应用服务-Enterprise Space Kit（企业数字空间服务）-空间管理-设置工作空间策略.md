## 场景介绍

从6.0.2(22)开始，支持设置工作空间策略的能力。

Enterprise Space Kit为应用提供设置工作空间策略的能力。例如设置安全锁定策略。

## 接口说明

详细接口说明可参考[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section3829226193112)。

展开

| 接口名 | 描述 |
| --- | --- |
| [setWorkspacePolicy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section3829226193112)(key: string, value: number, workspaceId?: number): Promise<void> | 设置工作空间策略。使用Promise异步回调。 |

## 开发步骤

1. 导入Enterprise Space Kit模块和相关依赖模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { spaceManager } from '@kit.EnterpriseSpaceKit';
   ```
2. 调用接口[setWorkspacePolicy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section3829226193112)，设置空间策略，并且查看打印信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const key: string = 'lockdown';
   2. const value: spaceManager.LockdownModePolicy = spaceManager.LockdownModePolicy.OFF;
   3. const workspaceId: number = 100;
   4. try {
   5. await spaceManager.setWorkspacePolicy(key, value, workspaceId);
   6. console.info(`Succeeded in setting workspace policy.`);
   7. } catch (err) {
   8. console.error(`Failed to set workspace policy. Code: ${err.code}, message: ${err.message}`);
   9. }
   ```