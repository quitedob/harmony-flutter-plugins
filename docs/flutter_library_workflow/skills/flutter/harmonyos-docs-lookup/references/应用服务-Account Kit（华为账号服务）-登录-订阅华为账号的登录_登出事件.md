## 场景介绍

应用在前台时可以订阅Account Kit提供的华为账号登录/登出广播事件，来感知华为账号的登录状态，实现用户登录/登出应用的逻辑。应用也可通过[getHuaweiIDState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-authentication#section102884586336)实时查询华为账号登录状态。

## 事件说明

以下是华为账号登录/登出发送的广播事件。

展开

| 事件名称 | 描述 |
| --- | --- |
| [COMMON\_EVENT\_DISTRIBUTED\_ACCOUNT\_LOGIN](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/commoneventmanager-definitions#common_event_distributed_account_login) | 表示分布式账号登录成功的动作。华为账号登录成功也会发这个广播事件。 |
| [COMMON\_EVENT\_DISTRIBUTED\_ACCOUNT\_LOGOUT](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/commoneventmanager-definitions#common_event_distributed_account_logout) | 表示分布式账号登出成功的动作。华为账号登出成功也会发这个广播事件。 |

## 开发前提

在进行代码开发前，请确保已按照“开发准备”章节中的指导完成[配置签名和指纹](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/account-sign-fingerprints)、[配置Client ID](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/account-client-id)。此场景无需申请账号权限。

## 开发步骤

1. 导入[commonEventManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-commoneventmanager)模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { hilog } from '@kit.PerformanceAnalysisKit';
   2. import { BusinessError, commonEventManager } from '@kit.BasicServicesKit';
   ```
2. 创建订阅者，并处理订阅结果。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 订阅者信息
   2. const subscribeInfo: commonEventManager.CommonEventSubscribeInfo = {
   3. events: [commonEventManager.Support.COMMON_EVENT_DISTRIBUTED_ACCOUNT_LOGIN,
   4. commonEventManager.Support.COMMON_EVENT_DISTRIBUTED_ACCOUNT_LOGOUT]
   5. };
   6. let subscriber: commonEventManager.CommonEventSubscriber;

   8. // 创建订阅者
   9. commonEventManager.createSubscriber(subscribeInfo)
   10. .then((commonEventSubscriber: commonEventManager.CommonEventSubscriber) => {
   11. subscriber = commonEventSubscriber;
   12. // 订阅公共事件
   13. commonEventManager.subscribe(subscriber,
   14. (error: BusinessError, data: commonEventManager.CommonEventData) => {
   15. if (error) {
   16. hilog.error(0x0000, 'testTag',
   17. `Failed to subscribe , code is ${error.code}, message is ${error.message}`);
   18. } else {
   19. if (data.event === commonEventManager.Support.COMMON_EVENT_DISTRIBUTED_ACCOUNT_LOGIN) {
   20. // 订阅到华为账号登录事件
   21. }
   22. if (data.event === commonEventManager.Support.COMMON_EVENT_DISTRIBUTED_ACCOUNT_LOGOUT) {
   23. // 订阅到华为账号登出事件
   24. }
   25. }
   26. });
   27. })
   28. .catch((err: BusinessError) => {
   29. hilog.error(0x0000, 'testTag', `Failed to createSubscriber. Code: ${err.code}, message: ${err.message}`);
   30. });
   ```