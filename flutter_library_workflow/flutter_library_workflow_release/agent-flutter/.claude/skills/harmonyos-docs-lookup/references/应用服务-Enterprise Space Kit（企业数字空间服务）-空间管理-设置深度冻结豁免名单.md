## 场景介绍

从6.0.2(22)开始，支持设置深度冻结豁免名单的能力。

Enterprise Space Kit为企业应用提供设置深度冻结豁免名单的能力。被设置的豁免应用在后台空间可正常运行，不会被冻结。

## 接口说明

详细接口说明可参考[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section65245634612)。

展开

| 接口名 | 描述 |
| --- | --- |
| [setLockdownExemptionApps](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section65245634612)(appIds: string[], workspaceId?: number): Promise<void> | 设置深度冻结豁免名单。使用Promise异步回调。 |

## 开发步骤

1. 导入Enterprise Space Kit模块和相关依赖模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { spaceManager } from '@kit.EnterpriseSpaceKit';
   ```
2. 调用接口[setLockdownExemptionApps](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section65245634612)，设置深度冻结豁免名单，并且查看打印信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const workspaceId: number = 100;
   2. const appIds = [
   3. 'com.example.enterprisespacekit_samplecode_clientdemo_arkts1',
   4. 'com.example.enterprisespacekit_samplecode_clientdemo_arkts2'
   5. ];
   6. try {
   7. await spaceManager.setLockdownExemptionApps(appIds, workspaceId);
   8. console.info(`Succeeded in setting lockdown exemption apps.`);
   9. } catch (err) {
   10. console.error(`Failed to set lockdown exemption apps. Code: ${err.code}, message: ${err.message}`);
   11. }
   ```