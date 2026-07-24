从API version 20开始，为了避免不同渠道发布的通知重复打扰用户（例如，手机协同到当前设备的通知与Push推送服务发布的通知重复），可以使用通知去重功能，清除跨设备场景下的重复通知。

## 实现原理

应用发送通知时携带唯一标识字段[appMessageId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-notification-notificationrequest#notificationrequest-1)，分布式通知接收到多渠道发布的通知后，会根据该字段进行判断，从而实现通知去重。

设备只会展示第一条通知，后续收到的重复通知会被静默去重，不展示、不提醒。

**图1** 全场景通知去重流程图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/85/v3/CcU2XZzMSi2OxW_L9GoMiQ/zh-cn_image_0000002571172187.png?HW-CC-KV=V1&HW-CC-Date=20260414T031925Z&HW-CC-Expire=86400&HW-CC-Sign=7768BBCAF425C754A5160C3F96A3B293C34EB2A5381CCB345D762853B83E1A85)

## 约束条件

* appMessageId的唯一性需由开发者保证，同一条通知在各个设备形态上需保证该字段相同。
* 该字段仅在发布通知的24小时内有效，超过24小时或者设备重启时都会失效。

## 接口说明

展开

| **接口名** | **描述** | **说明** |
| --- | --- | --- |
| [publish](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-notificationmanager#notificationmanagerpublish-1)(request: NotificationRequest): Promise<void> | 发布通知。 | 使用方法见对象[NotificationRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-notification-notificationrequest)中**appMessageId**字段说明。 |

## 开发步骤

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { notificationManager } from '@kit.NotificationKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   ```

   [ClearDuplicateNotifications.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Notification-Kit/Notification/entry/src/main/ets/filemanager/ClearDuplicateNotifications.ets#L16-L19)
2. 发布通知消息，通知消息中包含appMessageId字段。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // publish回调
   2. let publishCallback = (err: BusinessError): void => {
   3. if (err) {
   4. console.error(`Failed to publish notification. Code is ${err.code}, message is ${err.message}`);
   5. } else {
   6. console.info(`Succeeded in publishing notification.`);
   7. }
   8. };
   9. // 通知Request对象
   10. let notificationRequest: notificationManager.NotificationRequest = {
   11. id: 1,
   12. content: {
   13. notificationContentType: notificationManager.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
   14. normal: {
   15. title: 'test_title',
   16. text: 'test_text',
   17. additionalText: 'test_additionalText'
   18. }
   19. },
   20. appMessageId: 'test_appMessageId_1'
   21. };
   22. notificationManager.publish(notificationRequest, publishCallback);
   ```

   [ClearDuplicateNotifications.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Notification-Kit/Notification/entry/src/main/ets/filemanager/ClearDuplicateNotifications.ets#L30-L53)