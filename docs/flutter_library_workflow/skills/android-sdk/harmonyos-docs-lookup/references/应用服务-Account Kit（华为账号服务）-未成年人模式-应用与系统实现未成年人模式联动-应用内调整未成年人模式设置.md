## 场景介绍

系统的未成年人模式已开启，应用已随系统切换至未成年人模式。用户打开应用，希望在应用内调整内容偏好、使用时长等设置，需要验证家长身份。

应用可调用家长身份验证接口[verifyMinorsProtectionCredential](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-minorsprotection#section145101029104312)，拉起验证未成年人模式密码页面。

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/46/v3/QQ3zhFQUQz2FY0tHRWTGZw/zh-cn_image_0000002497063286.png?HW-CC-KV=V1&HW-CC-Date=20260414T024813Z&HW-CC-Expire=86400&HW-CC-Sign=576B00D384159C214D31C2F2DA8DB222175A05E1F33DD161C093E345524E10ED "点击放大")

流程说明：

1. 用户打开应用时，应用通过[系统未成年人模式公共事件](/consumer/cn/doc/harmonyos-guides/account-password-minorsprotection#section1946694511408)感知未成年人模式的状态变化。可以调用[getMinorsProtectionInfoSync](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-minorsprotection#section11505356101217)或[getMinorsProtectionInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-minorsprotection#section82313184131)获取系统未成年人模式信息。
2. 当系统未成年人模式已开启，且用户修改应用内设置时，应用可调用[verifyMinorsProtectionCredential](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-minorsprotection#section145101029104312)验证未成年人模式密码，当校验通过后，才可修改当前应用的未成年人模式设置。

## 接口说明

以下是应用内验证家长密码相关接口说明，更多接口及使用方法请参见[API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-minorsprotection)。

展开

| 接口名 | 描述 |
| --- | --- |
| [getMinorsProtectionInfoSync](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-minorsprotection#section11505356101217)(): [MinorsProtectionInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-minorsprotection#section3551104714566) | 同步接口，获取系统未成年人模式的开启状态，以及年龄段信息。 |
| [getMinorsProtectionInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-minorsprotection#section82313184131)(): Promise<[MinorsProtectionInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-minorsprotection#section3551104714566)> | 异步接口，获取系统未成年人模式的开启状态，以及年龄段信息。 |
| [verifyMinorsProtectionCredential](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-minorsprotection#section145101029104312)(context: [common.Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-common#context)): Promise<boolean> | 调用该方法拉起验证未成年人模式密码页面。 |

注意

1. [verifyMinorsProtectionCredential](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-minorsprotection#section145101029104312)接口需在页面或自定义组件生命周期内调用。接口调用前提是未成年人模式已开启，如果在未开启未成年人模式下调用此接口会返回错误码[1009900002](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-error-code#section5166694516)。
2. 当未成年人模式开启时，当前设备的开发者调试模式会被禁用，开发者可以进入设置-系统-开发者选项，点击USB调试开关，会校验健康使用设备密码，校验成功后可解除开发者调试模式限制。
3. 如开发者重新开启USB调试开关后，发现DevEco Studio工具上hilog日志未恢复到断连之前，请执行“hdc shell hilog -G 16M”来扩大hilog日志缓存区，若hilog日志仍无法完全展示，可取出hilog日志本地查看。更多命令请参见[hilog](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/hilog)。
4. 如开发者有频繁使用到未成年人模式开启状态或者年龄段的场景，建议开发者在获取到该结果后做缓存，可通过订阅[系统未成年人模式公共事件](/consumer/cn/doc/harmonyos-guides/account-password-minorsprotection#section1946694511408)来刷新未成年人模式开启状态或者年龄段，避免重复调用接口，增加时延。
5. 当设备处于开机未解锁状态下，开发者调用[getMinorsProtectionInfoSync](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-minorsprotection#section11505356101217)接口会返回false。

## 事件说明

以下是系统未成年人模式开启或关闭发送的广播事件。

展开

| 事件名称 | 值 | 描述 |
| --- | --- | --- |
| [COMMON\_EVENT\_MINORSMODE\_ON](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/commoneventmanager-definitions#common_event_minorsmode_on12) | usual.event.MINORSMODE\_ON | 表示系统未成年人模式开启事件。 |
| [COMMON\_EVENT\_MINORSMODE\_OFF](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/commoneventmanager-definitions#common_event_minorsmode_off12) | usual.event.MINORSMODE\_OFF | 表示系统未成年人模式关闭事件。 |

说明

未成年人模式开启事件触发时机：

主动开启系统未成年人模式（PC/2in1设备暂不支持从控制中心开启未成年人模式），当前设备会发送未成年人模式开启事件。

## 开发前提

请先参考“开发准备”的[配置签名和指纹](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/account-sign-fingerprints)章节，通过自动签名方式完成签名信息的配置。请注意，该接口无需配置公钥指纹、Client ID，也无需申请账号权限。

## 开发步骤

1. 导入[minorsProtection](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-minorsprotection)模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { minorsProtection } from '@kit.AccountKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';
   3. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 订阅系统未成年人模式开启或关闭事件、获取未成年人模式的开启状态，以及年龄段信息请参考应用与系统联动切换未成年人模式章节的[开发步骤](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/account-system-minorsprotection#section16968154617316)。
3. 当未成年人模式已开启，用户需要调整应用内未成年人模式设置时调用[verifyMinorsProtectionCredential](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-minorsprotection#section145101029104312)方法拉起验证未成年人模式密码页面。验证成功后才允许修改。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. if (canIUse('SystemCapability.AuthenticationServices.HuaweiID.MinorsProtection')) {
   2. try {
   3. if (minorsProtection.supportMinorsMode()) {
   4. // 此示例为代码片段，实际需在自定义组件实例中使用，以获取UIContext对象作为函数入参
   5. minorsProtection.verifyMinorsProtectionCredential(this.getUIContext().getHostContext())
   6. .then((result: boolean) => {
   7. hilog.info(0x0000, 'testTag', `Succeeded in getting verify result is: ${result.valueOf()}`);
   8. // 使用结果判断验密是否通过，执行后续流程
   9. })
   10. .catch((error: BusinessError<Object>) => {
   11. dealVerifyAllError(error);
   12. });
   13. } else {
   14. hilog.info(0x0000, 'testTag',
   15. 'The current device environment does not support the youth mode, please check the current device environment.');
   16. }
   17. } catch (error) {
   18. hilog.error(0x0000, 'testTag',
   19. `Failed to invoke supportMinorsMode. errCode: ${error.code}, errMessage: ${error.message}`);
   20. }
   21. } else {
   22. hilog.info(0x0000, 'testTag',
   23. 'The current device does not support the invoking of the verifyMinorsProtectionCredential interface.');
   24. }
   ```

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. function dealVerifyAllError(error: BusinessError<Object>): void {
   2. hilog.error(0x0000, 'testTag', `Failed to verify. Code: ${error.code}, message: ${error.message}`);
   3. }
   ```