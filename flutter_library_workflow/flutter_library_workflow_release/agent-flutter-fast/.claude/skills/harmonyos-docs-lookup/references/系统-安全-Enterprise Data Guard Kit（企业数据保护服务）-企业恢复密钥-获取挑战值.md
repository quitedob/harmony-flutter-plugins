## 场景介绍

请求获取挑战值，在发起更新企业公钥证书、删除已有企业恢复密钥流程前，需要获取挑战值，并进行签名，以确认企业身份。

## 接口说明

详细接口说明可参考[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-recoverykey)。

展开

| 接口名 | 描述 |
| --- | --- |
| [getAuthChallenge](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-recoverykey#zh-cn_topic_0000001983615174_section41041418113717)(): Promise<Uint8Array> | 使用Promise方式获取挑战值。 |

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
2. 调用接口[getAuthChallenge](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-recoverykey#zh-cn_topic_0000001983615174_section41041418113717)，获取挑战值。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. function testGetAuthChallenge() {
   2. recoveryKey.getAuthChallenge().then((challenge: Uint8Array) => {
   3. console.info(`Succeeded in getting challenge.`);
   4. }).catch((error: BusinessError) => {
   5. console.error(`Failed to get challenge. Code: ${error.code}, message: ${error.message}`);
   6. });
   7. }
   ```