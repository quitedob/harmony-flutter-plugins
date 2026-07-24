## 场景介绍

Enterprise Data Guard Kit为应用提供下发管控策略的能力，相关策略会被分发到HarmonyOS系统中执行。

## 接口说明

详细接口说明可参考[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard)。

展开

| 接口名 | 描述 |
| --- | --- |
| [updatePolicy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section068912217520)(policy: string, callback: AsyncCallback<void>): void | 使用Callback方式更新安全管控策略。 |
| [updatePolicy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section16264735355)(policy: string): Promise<void> | 使用Promise方式更新安全管控策略。 |

## 开发步骤

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { fileGuard } from '@kit.EnterpriseDataGuardKit';
   ```
2. 初始化[FileGuard](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section18457214114215)对象guard，调用接口updatePolicy，更新安全管控策略。
   * 通过回调函数方式，更新安全管控策略。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';

   3. function updatePolicyCallback() {
   4. let guard: fileGuard.FileGuard = new fileGuard.FileGuard();
   5. let policy: string = '{' +
   6. '"net_intercept_toggle":0,' +
   7. '"boundary":["10.10.0.0-10.255.255.255","172.16.0.0-172.31.255.255"],' +
   8. '"netsegment_trustlist":["10.10.0.0-10.255.255.255"],' +
   9. '"netsegment_blocklist":["172.16.0.0-172.31.255.255"],' +
   10. '"default_policy":0' +
   11. '}';
   12. guard.updatePolicy(policy, (err: BusinessError) => {
   13. if (err) {
   14. console.error(`Failed to update policy. Code: ${err.code}, message: ${err.message}.`);
   15. } else {
   16. console.info(`Succeeded in updating policy.`);
   17. }
   18. });
   19. }
   ```

   * 通过Promise方式，更新安全管控策略。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';

   3. function updatePolicyPromise() {
   4. let guard: fileGuard.FileGuard = new fileGuard.FileGuard();
   5. let policy: string = '{' +
   6. '"net_intercept_toggle":0,' +
   7. '"boundary":["10.10.0.0-10.255.255.255","172.16.0.0-172.31.255.255"],' +
   8. '"netsegment_trustlist":["10.10.0.0-10.255.255.255"],' +
   9. '"netsegment_blocklist":["172.16.0.0-172.31.255.255"],' +
   10. '"default_policy":0' +
   11. '}';
   12. guard.updatePolicy(policy).then(() => {
   13. console.info(`Succeeded in updating policy.`);
   14. }).catch((err: BusinessError) => {
   15. console.error(`Failed to update policy. Code: ${err.code}, message: ${err.message}.`);
   16. });
   17. }
   ```