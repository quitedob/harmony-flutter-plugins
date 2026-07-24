## 场景介绍

为应用提供删除企业恢复密钥的能力，用于在企业恢复密钥发生泄漏、禁用企业恢复密钥时删除相关数据，使之前导出的企业恢复密钥失效。

## 接口说明

详细接口说明可参考[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-recoverykey)。

展开

| 接口名 | 描述 |
| --- | --- |
| [deleteEnterpriseRecoveryKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-recoverykey#zh-cn_topic_0000001983615174_section1927015514386)(userId: number, signature: Uint8Array): Promise<number> | 使用Promise方式删除企业恢复密钥相关数据。 |

## 开发步骤

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { recoveryKey } from '@kit.EnterpriseDataGuardKit';
   2. import { BusinessError, osAccount } from '@kit.BasicServicesKit';
   ```
2. 先调用接口[getAuthChallenge](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-recoverykey#zh-cn_topic_0000001983615174_section41041418113717)，获取挑战值并[签名](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/recoverykey-signature)，传入需要删除企业恢复密钥的用户ID和挑战值的签名，再调用接口[deleteEnterpriseRecoveryKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-recoverykey#zh-cn_topic_0000001983615174_section1927015514386)，删除企业恢复密钥相关数据。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. async function testDeleteEnterpriseRecoveryKey() {
   2. try {
   3. let accountManager: osAccount.AccountManager = osAccount.getAccountManager();
   4. let userId: number = await accountManager.getOsAccountLocalId();
   5. // 在实际应用中，signature 应替换为由企业的公钥、私钥和挑战值生成的签名。
   6. let signature: Uint8Array = new Uint8Array([0]);
   7. recoveryKey.deleteEnterpriseRecoveryKey(userId, signature).then((ret: number) => {
   8. console.info(`Succeeded in deleting enterprise recovery key.`);
   9. }).catch((err: BusinessError) => {
   10. console.error(`Failed to delete enterprise recovery key. Code: ${err.code}, message: ${err.message}`);
   11. });
   12. } catch (e) {
   13. console.error(`Failed to testDeleteEnterpriseRecoveryKey. Code: ${e.code}, message: ${e.message}`);
   14. }
   15. }
   ```