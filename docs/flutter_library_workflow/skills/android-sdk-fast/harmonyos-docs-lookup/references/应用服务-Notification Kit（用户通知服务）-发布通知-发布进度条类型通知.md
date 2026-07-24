进度条通知也是常见的通知类型，主要应用于文件下载、事务处理进度显示。当前系统提供了进度条模板，发布通知应用应设置好进度条模板的属性值，如模板名、模板数据，通过通知子系统发送到通知栏显示。

目前系统模板仅支持进度条模板，通知模板[NotificationTemplate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-notification-notificationtemplate)中的data参数为用户自定义数据，用于显示与模块相关的数据。

## 接口说明

[isSupportTemplate()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-notificationmanager#notificationmanagerissupporttemplate)是查询模板是否支持接口，目前仅支持进度条模板。

展开

| **接口名** | **描述** |
| --- | --- |
| isSupportTemplate(templateName: string): Promise<boolean> | 查询模板是否存在。 |

## 开发步骤

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { notificationManager } from '@kit.NotificationKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   3. import { hilog } from '@kit.PerformanceAnalysisKit';

   5. const TAG: string = '[PublishOperation]';
   6. const DOMAIN_NUMBER: number = 0xFF00;
   ```

   [PublishNotification.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Notification-Kit/Notification/entry/src/main/ets/filemanager/PublishNotification.ets#L16-L23)
2. 查询系统是否支持进度条模板，查询结果为支持downloadTemplate模板类通知。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. notificationManager.isSupportTemplate('downloadTemplate').then((data: boolean) => {
   2. let isSupportTemplate: boolean = data; // isSupportTemplate的值为true表示支持downloadTemplate模板类通知，false表示不支持
   3. hilog.info(DOMAIN_NUMBER, TAG,
   4. `Succeeded in supporting download template notification. data is ${isSupportTemplate}`);
   5. }).catch((err: BusinessError) => {
   6. hilog.error(DOMAIN_NUMBER, TAG,
   7. `Failed to support download template notification. Code is ${err.code}, message is ${err.message}`);
   8. });
   ```

   [PublishNotification.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Notification-Kit/Notification/entry/src/main/ets/filemanager/PublishNotification.ets#L87-L96)

   说明

   查询系统支持进度条模板后，再进行后续的步骤操作。
3. 构造进度条模板对象，并发布通知。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let notificationRequest: notificationManager.NotificationRequest = {
   2. id: 5,
   3. content: {
   4. notificationContentType: notificationManager.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
   5. normal: {
   6. title: 'test_title',
   7. text: 'test_text',
   8. additionalText: 'test_additionalText'
   9. }
   10. },
   11. // 构造进度条模板，name字段当前需要固定配置为downloadTemplate
   12. template: {
   13. name: 'downloadTemplate',
   14. data: { title: 'File Title', fileName: 'music.mp4', progressValue: 45 }
   15. }
   16. };

   18. // 发布通知
   19. notificationManager.publish(notificationRequest, (err: BusinessError) => {
   20. if (err) {
   21. hilog.error(DOMAIN_NUMBER, TAG,
   22. `Failed to publish notification. Code is ${err.code}, message is ${err.message}`);
   23. return;
   24. }
   25. hilog.info(DOMAIN_NUMBER, TAG, 'Succeeded in publishing notification.');
   26. });
   ```

   [PublishNotification.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Notification-Kit/Notification/entry/src/main/ets/filemanager/PublishNotification.ets#L102-L129)