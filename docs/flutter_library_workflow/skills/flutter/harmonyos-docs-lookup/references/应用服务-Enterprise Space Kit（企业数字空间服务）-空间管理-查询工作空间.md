## 场景介绍

Enterprise Space Kit为应用提供查询工作空间信息的能力。

## 接口说明

详细接口说明可参考[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section6592656143118)。

展开

| 接口名 | 描述 |
| --- | --- |
| [queryWorkspace](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section6592656143118)(queryFlag: [QueryType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section87287517554)): Promise<WorkspaceInfo[]> | 查询工作空间信息并返回结果。使用Promise异步回调。 |

## 开发步骤

1. 导入Enterprise Space Kit模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { spaceManager } from '@kit.EnterpriseSpaceKit';
   ```
2. 调用[queryWorkspace](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section6592656143118)接口，查询工作空间，并且查看打印信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const queryFlag: spaceManager.QueryType = 0;
   2. try {
   3. const spaces: spaceManager.WorkspaceInfo[] = await spaceManager.queryWorkspace(queryFlag);
   4. console.info(`Succeeded in querying workspace` + JSON.stringify(spaces));
   5. } catch (err) {
   6. console.error(`Failed to query workspace. Code: ${err.code}, message: ${err.message}`);
   7. }
   ```