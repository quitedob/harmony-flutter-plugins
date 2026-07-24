## 场景介绍

动态订阅者完成业务需求后，应主动取消订阅。通过调用[unsubscribe()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-commoneventmanager#commoneventmanagerunsubscribe)方法，取消订阅事件。

## 接口说明

展开

| 接口名 | 接口描述 |
| --- | --- |
| [unsubscribe](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-commoneventmanager#commoneventmanagerunsubscribe)(subscriber: CommonEventSubscriber, callback?: AsyncCallback<void>) | 取消订阅公共事件。 |

## 开发步骤

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError, commonEventManager } from '@kit.BasicServicesKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';

   4. const TAG: string = 'ProcessModel';
   5. const DOMAIN_NUMBER: number = 0xFF00;
   ```

   [CreatSubscribeInfo.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Basic-Services-Kit/common_event/CommonEvent/entry/src/main/ets/filemanager/CreatSubscribeInfo.ets#L15-L21)
2. 根据[动态订阅公共事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/common-event-subscription)章节的步骤来订阅某个事件。
3. 调用CommonEvent中的[unsubscribe()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-commoneventmanager#commoneventmanagerunsubscribe)方法取消订阅某事件。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // subscriber为订阅事件时创建的订阅者对象
   2. if (subscriberCustom !== null) {
   3. commonEventManager.unsubscribe(subscriberCustom, (err: BusinessError) => {
   4. if (err) {
   5. hilog.error(DOMAIN_NUMBER, TAG,
   6. `Failed to unsubscribe. code is ${err.code}, message is ${err.message}`);
   7. } else {
   8. hilog.info(DOMAIN_NUMBER, TAG, `Succeeded in unsubscribing.`);
   9. subscriberCustom = null;
   10. }
   11. })
   12. }
   ```

   [CreatSubscribeInfo.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Basic-Services-Kit/common_event/CommonEvent/entry/src/main/ets/filemanager/CreatSubscribeInfo.ets#L96-L109)