## 场景介绍

为应用提供更新企业公钥证书的能力，用于在证书泄漏、证书失效等场景及时更新企业公钥证书。

## 接口说明

详细接口说明可参考[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-recoverykey)。

展开

| 接口名 | 描述 |
| --- | --- |
| [updateEnterpriseCertificate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-recoverykey#zh-cn_topic_0000001983615174_section1483871653813)(signature: Uint8Array, cert: Uint8Array): Promise<number> | 使用Promise方式更新证书。 |

## 开发步骤

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { recoveryKey } from '@kit.EnterpriseDataGuardKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 先调用接口[getAuthChallenge](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-recoverykey#zh-cn_topic_0000001983615174_section41041418113717)，获取挑战值并[签名](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/recoverykey-signature)，传入挑战值的签名和企业公钥证书，再调用接口[updateEnterpriseCertificate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-recoverykey#zh-cn_topic_0000001983615174_section1483871653813)，更新企业公钥证书。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. function testUpdateEnterpriseCertificate() {
   2. // 在实际应用中，signature 应替换为由企业的公钥、私钥和挑战值生成的签名。
   3. let signature: Uint8Array = new Uint8Array([0]);
   4. // 在实际应用中，cert 应需替换为企业证书数据。
   5. let cert: Uint8Array = new Uint8Array([0]);
   6. recoveryKey.updateEnterpriseCertificate(signature, cert).then((ret: number) => {
   7. console.info(`Succeeded in updating certificate.`);
   8. }).catch((error: BusinessError) => {
   9. console.error(`Failed to update certificate. Code: ${error.code}, message: ${error.message}`);
   10. });
   11. }
   ```