## 场景介绍

为应用提供获取企业恢复密钥的能力，在企业公钥证书配置成功后，可直接获取企业恢复密钥，用于解密已加密的硬盘数据。

注意

企业恢复密钥仅可被获取一次，获取到企业恢复密钥后，可在持有企业私钥的设备上解密，并进行相应的存储。如果需要再次获取，需要先调用[删除企业恢复密钥](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/recoverykey-delete)能力，再调用该能力。

## 接口说明

详细接口说明可参考[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-recoverykey)。

展开

| 接口名 | 描述 |
| --- | --- |
| [getEnterpriseRecoveryKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-recoverykey#zh-cn_topic_0000001983615174_section169300420817)(userId: number): Promise<[EnterpriseRecoveryKeyInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-recoverykey#zh-cn_topic_0000001983615174_section35870815206)> | 使用Promise方式获取恢复密钥。 |

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
2. 调用接口[getEnterpriseRecoveryKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-recoverykey#zh-cn_topic_0000001983615174_section169300420817)，传入需要获取企业恢复密钥的用户ID，获取企业恢复密钥。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. async function testGetEnterpriseRecoveryKey() {
   2. try {
   3. let accountManager: osAccount.AccountManager = osAccount.getAccountManager();
   4. let userId: number = await accountManager.getOsAccountLocalId();
   5. recoveryKey.getEnterpriseRecoveryKey(userId).then((info: recoveryKey.EnterpriseRecoveryKeyInfo) => {
   6. console.info(`Succeeded in getting enterprise recovery key.`);
   7. }).catch((error: BusinessError) => {
   8. console.error(`Failed to get enterprise recovery key. Code: ${error.code}, message: ${error.message}`);
   9. });
   10. } catch (e) {
   11. console.error(`Failed to testGetEnterpriseRecoveryKey. Code: ${e.code}, message: ${e.message}`);
   12. }
   13. }
   ```