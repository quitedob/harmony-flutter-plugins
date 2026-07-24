## 场景介绍

Enterprise Space Kit为应用提供设置工作空间信息的能力。在企业初始化阶段，设置工作空间信息，方便企业绑定域账号。

## 接口说明

详细接口说明可参考[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section15245021163318)。

展开

| 接口名 | 描述 |
| --- | --- |
| [setWorkspaceInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section15245021163318)(workspaceId: number, domainInfo: [WorkspaceDomainInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section1457564515610)): Promise<void> | 设置工作空间信息。使用Promise异步回调。 |

## 开发步骤

1. 导入Enterprise Space Kit模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { spaceManager } from '@kit.EnterpriseSpaceKit';
   ```
2. 调用[setWorkspaceInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section15245021163318)接口，设置工作空间信息，并且查看打印信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const workspaceId: number = 100;
   2. const domainInfo: spaceManager.WorkspaceDomainInfo = {
   3. domain: 'test1',
   4. workspaceName: 'test2',
   5. accountId: 'test3',
   6. isAuthenticated: false,
   7. serverConfigId: 'test4',
   8. workspaceEnterpriseName: 'default'
   9. };

   11. try {
   12. await spaceManager.setWorkspaceInfo(workspaceId, domainInfo);
   13. console.info('Succeeded in setting workspace info');
   14. } catch (err) {
   15. console.error(`Failed to set workspace info. Code: ${err.code}, message: ${err.message}`);
   16. }
   ```