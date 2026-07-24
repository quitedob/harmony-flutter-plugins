## 场景介绍

当文件外发需经过审批流程控制时，Enterprise Space Kit为应用提供设置审批信息的能力，审批信息包括审批ID、用户ID、用户名称、审批时间、审批评论和文件审批状态。

## 接口说明

详细接口说明可参考[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacedatatransfer#section1285414104597)。

展开

| 接口名 | 描述 |
| --- | --- |
| [setAuditInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacedatatransfer#section1285414104597)(transactionNum: string, info: [AuditInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacedatatransfer#section14605182931520)): number | 设置审批信息并返回结果。 |

## 开发步骤

1. 导入Enterprise Space Kit模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { fileTransfer } from '@kit.EnterpriseSpaceKit';
   ```
2. 调用[setAuditInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacedatatransfer#section1285414104597)接口，设置审批信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const transactionNum: string = '1111111';
   2. const info: fileTransfer.AuditInfo = {
   3. auditId: '123456',
   4. userId: '100',
   5. userName: 'test',
   6. time: Date.now(),
   7. comments: 'Waiting approval',
   8. status: '1'
   9. };
   10. try {
   11. const ret: number = fileTransfer.setAuditInfo(transactionNum, info);
   12. console.info(`Succeeded in setting audit info, number:`, ret);
   13. } catch (err) {
   14. console.error(`Failed to set audit info. Code: ${err.code}, message: ${err.message}`);
   15. }
   ```