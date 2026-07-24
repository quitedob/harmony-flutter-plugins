## 场景介绍

从6.0.2(22)开始，支持查询深度冻结豁免名单的能力。

Enterprise Space Kit为企业应用提供查询深度冻结豁免名单的能力。当设置深度冻结豁免名单后，可使用该接口查询深度冻结豁免名单。

## 接口说明

详细接口说明可参考[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section76466565311)。

展开

| 接口名 | 描述 |
| --- | --- |
| [getLockdownExemptionApps](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section76466565311)(workspaceId?: number): Promise<string[]> | 查询深度冻结豁免名单。使用Promise异步回调。 |

## 开发步骤

1. 导入Enterprise Space Kit模块和相关依赖模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { spaceManager } from '@kit.EnterpriseSpaceKit';
   ```
2. 调用接口[getLockdownExemptionApps](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section76466565311)，查询深度冻结豁免名单，并且查看打印信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const workspaceId: number = 100;
   2. try {
   3. const apps: string[] = await spaceManager.getLockdownExemptionApps(workspaceId);
   4. console.info(`Succeeded in getting lockdown exemption apps. apps:` + JSON.stringify(apps));
   5. } catch (err) {
   6. console.error(`Failed to get lockdown exemption apps. Code: ${err.code}, message: ${err.message}`);
   7. }
   ```