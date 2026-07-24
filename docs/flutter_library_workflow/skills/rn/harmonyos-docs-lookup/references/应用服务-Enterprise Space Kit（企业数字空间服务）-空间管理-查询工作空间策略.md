## 场景介绍

从6.0.2(22)开始，支持查询工作空间策略的能力。

Enterprise Space Kit为应用提供查询工作空间策略的能力。例如查询安全锁定策略。

## 接口说明

详细接口说明可参考[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section56999719412)。

展开

| 接口名 | 描述 |
| --- | --- |
| [getWorkspacePolicy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section56999719412)(key: string, workspaceId?: number): Promise<number> | 查询工作空间策略并返回结果。使用Promise异步回调。 |

## 开发步骤

1. 导入Enterprise Space Kit模块和相关依赖模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { spaceManager } from '@kit.EnterpriseSpaceKit';
   ```
2. 调用接口[getWorkspacePolicy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section56999719412)，查询空间策略，并且查看打印信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const key: string = 'lockdown';
   2. const workspaceId: number = 100;
   3. try {
   4. const value: number = await spaceManager.getWorkspacePolicy(key, workspaceId);
   5. console.info(`Succeeded in getting workspace policy. value: ${value}`);
   6. } catch (err) {
   7. console.error(`Failed to get workspace policy. Code: ${err.code}, message: ${err.message}`);
   8. }
   ```