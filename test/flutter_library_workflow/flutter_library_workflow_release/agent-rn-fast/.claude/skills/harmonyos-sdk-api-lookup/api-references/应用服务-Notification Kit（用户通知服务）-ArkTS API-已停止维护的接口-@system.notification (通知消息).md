说明

* 从API Version 7 开始，该接口不再维护，推荐使用新接口[@ohos.notification (Notification模块)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-notification)。
* 本模块首批接口从API version 3开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import notification from '@system.notification';
```

## ActionResult

PhonePC/2in1TabletTVWearable

**系统能力**：SystemCapability.Notification.Notification

展开

| 名称 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| bundleName | string | 是 | 单击通知后要重定向到的应用程序的Bundle名。 |
| abilityName | string | 是 | 单击通知后要重定向到的应用程序的Ability名称。 |
| uri | string | 否 | 要重定向到的页面的uri。 |

## ShowNotificationOptions

PhonePC/2in1TabletTVWearable

**系统能力**：SystemCapability.Notification.Notification

展开

| 名称 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| contentTitle | string | 否 | 通知标题。 |
| contentText | string | 否 | 通知内容。 |
| clickAction(deprecated) | [ActionResult](/consumer/cn/doc/harmonyos-references/js-apis-system-notification#actionresult) | 否 | 通知被点击后触发的行为。  从API version 7开始不再维护。 |

## notification.show

PhonePC/2in1TabletTVWearable

show(options?: ShowNotificationOptions): void

显示通知。

**系统能力：** SystemCapability.Notification.Notification

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| options | ShowNotificationOptions | 否 | 通知标题。 |

**示例：**



```
1. let notificationObj: notification = {
2. show() {
3. notification.show({
4. contentTitle: 'title info',
5. contentText: 'text',
6. clickAction: {
7. bundleName: 'com.example.testapp',
8. abilityName: 'notificationDemo',
9. uri: '/path/to/notification'
10. }
11. });
12. }
13. }
```