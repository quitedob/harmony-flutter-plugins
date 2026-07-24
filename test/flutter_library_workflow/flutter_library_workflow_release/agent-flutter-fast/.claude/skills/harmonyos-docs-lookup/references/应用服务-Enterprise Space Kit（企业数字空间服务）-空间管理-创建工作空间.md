## 场景介绍

Enterprise Space Kit为应用提供创建工作空间的能力。

## 接口说明

详细接口说明可参考[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section174311747184814)。

展开

| 接口名 | 描述 |
| --- | --- |
| [createWorkspace](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section174311747184814)(localName: string, workspaceType: [WorkspaceType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section3637177173919), params?: [CreateWorkspaceParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section2818219505)): Promise<[WorkspaceInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section1528202625516)> | 创建工作空间并返回结果。使用Promise异步回调。 |

## 开发步骤

1. 导入Enterprise Space Kit模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { spaceManager } from '@kit.EnterpriseSpaceKit';
   ```
2. 调用[createWorkspace](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section174311747184814)接口，创建工作空间，并且查看打印信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const localName: string = '111111';
   2. const workspaceType: spaceManager.WorkspaceType = 0;
   3. const params: spaceManager.CreateWorkspaceParams = {
   4. shortName: 'test'
   5. };
   6. try {
   7. const workspaceInfo: spaceManager.WorkspaceInfo = await spaceManager.createWorkspace(localName, workspaceType, params);
   8. console.info(`Succeeded in creating workspace, workspaceInfo:` + JSON.stringify(workspaceInfo));
   9. } catch (err) {
   10. console.error(`Failed to create workspace. Code: ${err.code}, message: ${err.message}`);
   11. }
   ```