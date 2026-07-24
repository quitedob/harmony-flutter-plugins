手机侧应用向穿戴设备发送通知，并在穿戴设备上按模板显示，支持穿戴设备收到通知后同步振动或响铃（跟随穿戴设备系统设置）。执行成功后，穿戴设备上会显示下图所示通知界面。

该接口无需用户授权，仅需要确保应用已申请消息通知权限（参见[申请接入Wear Engine服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/wearengine_apply)），否则接口将调用失败。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9d/v3/P8_HdRuoSBqZW4b4j4WURg/zh-cn_image_0000002190567617.png?HW-CC-KV=V1&HW-CC-Date=20260414T050147Z&HW-CC-Expire=86400&HW-CC-Sign=E0A1C78A8C40ABEBA944630251871A29F5E51F4D8BDA988CA6B3D6EEAF64F128)

说明

* 穿戴设备侧无对应的应用也可以显示模板化通知。
* 请确保穿戴设备和华为运动健康App处于连接状态。用户可进入App“设备”界面查看设备是否在线。开发者可调用[getConnectedDevices](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section1828213119411)方法了解设备是否在线，如果返回列表中不包含目标设备，则提醒用户重新连接该设备。
* 穿戴设备振动或响铃的条件：
  1. 穿戴设备侧已开启振动或响铃；
  2. 穿戴设备处于佩戴状态；
  3. 穿戴设备未开启勿扰模式。
* 通知在穿戴设备上自动弹出通知的条件：
  1. 穿戴设备处于佩戴状态；
  2. 穿戴设备未开启勿扰模式。

## 向穿戴设备侧发送通知

说明

该接口的调用需要在开发者联盟申请消息通知权限（请参考[申请接入Wear Engine服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/wearengine_apply)）。

1. 参见[已连接穿戴设备查询](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/query_connected_devices)章节，获取已连接设备列表。
2. 参见[目标设备选择](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/we-device-selection)章节，从已连接设备列表中选定需要通信的设备。
3. 调用[wearEngine](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api)中的[getNotifyClient](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section552416431386)方法，获取[NotifyClient](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section82221754103913)对象。
4. 定义[NotificationOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section0751457344)配置参数类。
5. 调用[notify](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section087562072313)方法，从手机上的应用发送通知到穿戴设备侧。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 步骤3 获取NotifyClient对象
   2. let notifyClient: wearEngine.NotifyClient = wearEngine.getNotifyClient(this.getUIContext().getHostContext());

   4. // 步骤4 构造NotificationOptions对象
   5. let button1: wearEngine.NotificationButton = {
   6. buttonId: wearEngine.ButtonId.FIRST_BUTTON,
   7. // 按钮内容最大长度为12字节
   8. content: 'button_1'
   9. }
   10. let type1Notification: wearEngine.Notification = {
   11. type: wearEngine.NotificationType.NOTIFICATION_WITH_ONE_BUTTON,
   12. // 包名与标题的最大长度为28字节
   13. bundleName: 'bundleName',
   14. title: 'title',
   15. // 消息内容最大长度为400字节
   16. text: 'text',
   17. buttons: [button1]
   18. }
   19. let options: wearEngine.NotificationOptions = {
   20. notification: type1Notification,
   21. onAction: (feedback: wearEngine.NotificationFeedback) => {
   22. console.info(`one button notify get feedback is ${feedback.action ? feedback.action : feedback.errorCode}`);
   23. }
   24. }

   26. // 步骤5 发送模板化通知至设备侧
   27. notifyClient.notify(targetDevice.randomId, options).then(result => {
   28. console.info(`Succeeded in sending notification.`);
   29. }).catch((error: BusinessError) => {
   30. console.error(`Failed to send notification. Code is ${error.code}, message is ${error.message}`);
   31. })
   ```