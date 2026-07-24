## 场景介绍

为企业用户提供获取企业恢复密钥的能力，可以在用户忘记锁屏密码时，使用该企业恢复密钥重置用户的锁屏密码。

## 接口说明

详细接口说明可参考[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-recoverykey)。

展开

| 接口名 | 描述 |
| --- | --- |
| [verifyUserIdentityEnterprise](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-recoverykey#section1894251193414)(userId: number, userType: number, pinCode: string): Promise<void> | 使用Promise方式验证用户锁屏密码。 |
| [getEnterpriseRecoveryKeyForResettingPin](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-recoverykey#section391875210343)(userId: number, userType: number): Promise<[EnterpriseRecoveryKeyInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-recoverykey#zh-cn_topic_0000001983615174_section35870815206)> | 使用Promise方式获取用于重置锁屏密码的企业恢复密钥。 |

## 开发步骤

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { buffer } from '@kit.ArkTS';
   2. import { BusinessError, osAccount } from '@kit.BasicServicesKit';
   3. import { recoveryKey } from '@kit.EnterpriseDataGuardKit';
   ```
2. 先调用接口[verifyUserIdentityEnterprise](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-recoverykey#section1894251193414)验证用户的锁屏密码，需提供用户ID、用户类型及用户锁屏密码，并在30秒内调用接口[getEnterpriseRecoveryKeyForResettingPin](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-recoverykey#section391875210343)以获取用于重置锁屏密码的企业恢复密钥。若超时后调用，系统会返回异常代码[1014400001](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-error-code#section11136526173515)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. /**
   2. * @param pinCode 用户输入的锁屏密码
   3. */
   4. async function getEnterpriseRecoveryKeyByPin(pinCode: string) {
   5. try {
   6. let accountManager: osAccount.AccountManager = osAccount.getAccountManager();
   7. let userId: number = await accountManager.getOsAccountLocalId();
   8. let accountType: osAccount.OsAccountType = await accountManager.getOsAccountType();
   9. console.info(`getOsAccountType,userId: ${userId}, accountType: ${accountType}`);

   11. let userType: number = accountType.valueOf();
   12. recoveryKey.verifyUserIdentityEnterprise(userId, userType, pinCode).then(() => {
   13. console.info(`Succeeded in verifying user identity.`);
   14. recoveryKey.getEnterpriseRecoveryKeyForResettingPin(userId, userType)
   15. .then((info: recoveryKey.EnterpriseRecoveryKeyInfo) => {
   16. console.info(`Succeeded in getting enterprise recovery key for resetting pin.`);
   17. console.info(`EnterpriseRecoveryKeyInfo enterpriseRecoveryKey: ${buffer.from(info.enterpriseRecoveryKey)
   18. .toString('hex')}`);
   19. console.info(`EnterpriseRecoveryKeyInfo exportPublicKey: ${buffer.from(info.exportPublicKey)
   20. .toString('hex')}`);
   21. console.info(`EnterpriseRecoveryKeyInfo iv: ${buffer.from(info.iv).toString('hex')}`);
   22. console.info(`EnterpriseRecoveryKeyInfo tag: ${buffer.from(info.tag).toString('hex')}`);
   23. })
   24. .catch((err: BusinessError) => {
   25. console.error(`Failed to get enterprise recovery key for resetting pin. Code: ${err.code}, message: ${err.message}`);
   26. })
   27. }).catch((error: BusinessError) => {
   28. console.error(`Failed to verified user identity. Code: ${error.code}, message: ${error.message}`);
   29. })
   30. } catch (e) {
   31. console.error(`Failed to getEnterpriseRecoveryKeyByPin. Code: ${e.code}, message: ${e.message}`);
   32. }
   33. }
   ```