## 接口说明

展开

| 接口名 | 描述 |
| --- | --- |
| [onDestroy(): void](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-notificationsubscriberextensionability#ondestroy) | 通知订阅扩展被销毁时的回调。 |
| [onReceiveMessage(notificationInfo: NotificationInfo): void](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-notificationsubscriberextensionability#onreceivemessage) | 收到通知时的回调。 |
| [onCancelMessages(hashCodes: Array<string>): void](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-notificationsubscriberextensionability#oncancelmessages) | 取消通知时的回调。 |

## 前提条件

申请[ohos.permission.SUBSCRIBE\_NOTIFICATION](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/restricted-permissions#ohospermissionsubscribe_notification)权限。

## 开发步骤

开发者在实现[NotificationSubscriberExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-notificationsubscriberextensionability)提供方时，需在[DevEco Studio](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-tools-overview)工程中新建一个NotificationSubscriberExtensionAbility。具体步骤如下。

1. 在entry/src/main/ets/创建目录extensionability。
2. 在entry/src/main/ets/extensionability目录下创建NotificationSubscriberExtAbility.ets，其内容如下。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { hilog } from '@kit.PerformanceAnalysisKit';
   2. import { notificationExtensionSubscription, NotificationSubscriberExtensionAbility } from '@kit.NotificationKit';
   3. // ...
   4. const DOMAIN = 0x0000;
   5. // ...
   6. export class NotificationSubscriberExtAbility extends NotificationSubscriberExtensionAbility {
   7. // ...
   8. onDestroy(): void {
   9. hilog.info(DOMAIN, 'testTag', 'onDestroy');
   10. // ...
   11. }
   12. // ...
   13. onReceiveMessage(notificationInfo: notificationExtensionSubscription.NotificationInfo): void {
   14. hilog.info(DOMAIN, 'testTag', `on receive message ${JSON.stringify(notificationInfo)}`)
   15. // ...
   16. }
   17. // ...
   18. onCancelMessages(hashCodes: Array<string>): void {
   19. hilog.info(DOMAIN, 'testTag', `on cancel message ${JSON.stringify(hashCodes)}`)
   20. // ...
   21. }
   22. // ...
   23. }
   ```

   [NotificationSubscriberExtAbility.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Notification-Kit/ThirdpartyWerableDemo/entry/src/main/ets/extensionability/NotificationSubscriberExtAbility.ets#L17-L237)
3. 使用[蓝牙模块](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/connectivity-kit-intro#蓝牙简介)接口与穿戴设备配对（蓝牙处于配对状态）并获取地址，然后通过[subscribe](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-notificationextensionsubscription#notificationextensionsubscriptionsubscribe)/[unsubscribe](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-notificationextensionsubscription#notificationextensionsubscriptionunsubscribe)接口订阅或取消订阅通知。
4. 实现[NotificationSubscriberExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-notificationsubscriberextensionability)后，还需要在合适的时机调用[openSubscriptionSettings](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-notificationextensionsubscription#notificationextensionsubscriptionopensubscriptionsettings)接口，打开通知扩展订阅设置页面，引导用户授予获取本机通知的权限，该页面以半模态弹窗显示。建议在设备管理页面提供一个通知授权的按钮，用户点击按钮则调用[openSubscriptionSettings](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-notificationextensionsubscription#notificationextensionsubscriptionopensubscriptionsettings)接口。
5. 在应用的module.json5文件中配置extensionAbilities。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. {
   2. "name": "NotificationSubscriberExtAbility",
   3. "srcEntry": "./ets/extensionability/NotificationSubscriberExtAbility.ets",
   4. "type": "notificationSubscriber",
   5. "description": "$string:NotificationSubscriberExtAbility_desc",
   6. "icon": "$media:layered_image",
   7. "label": "$string:NotificationSubscriberExtAbility_label",
   8. "exported": true
   9. }
   ```

   [module.json5](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Notification-Kit/ThirdpartyWerableDemo/entry/src/main/module.json5#L63-L73)
6. 在应用的string.json文件中添加

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. {
   2. "name": "NotificationSubscriberExtAbility_desc",
   3. "value": "description"
   4. },
   5. {
   6. "name": "NotificationSubscriberExtAbility_label",
   7. "value": "ThirdPartyWearableApp"
   8. }
   ```
7. 示例仅为传统蓝牙连接示例，开发者也可选用低功耗蓝牙连接方式。
8. 用户收到消息后，假如蓝牙连接是无效的，则建立蓝牙连接。
9. 假如蓝牙连接已经存在，则直接使用这个连接发送消息。
10. 如果使用该连接发送消息失败，则重新建立连接，如果连接能建立成功则发送消息。
11. 需要申请权限[ohos.permission.ACCESS\_BLUETOOTH](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/permissions-for-all-user#ohospermissionaccess_bluetooth)。如何配置和申请权限，具体操作请参考[声明权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/declare-permissions)和[向用户申请授权](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/request-user-authorization)。

    收起

    自动换行

    深色代码主题

    复制

    ```
    1. import { hilog } from '@kit.PerformanceAnalysisKit';
    2. import { notificationExtensionSubscription, NotificationSubscriberExtensionAbility } from '@kit.NotificationKit';
    3. import { BusinessError } from '@kit.BasicServicesKit';
    4. import { socket } from '@kit.ConnectivityKit'
    5. import { util } from '@kit.ArkTS';

    7. const DOMAIN = 0x0000;
    8. class TransferInfo {
    9. public type: string = ''
    10. public info: notificationExtensionSubscription.NotificationInfo | undefined
    11. public cancelHashCodes: Array<string> | undefined
    12. }

    14. // Spp means Serial Port Profile
    15. class SppClientManager {
    16. private clientNumber: number = -1;
    17. private peerDevice: string = '';

    19. constructor(peerDevice: string) {
    20. this.peerDevice = peerDevice
    21. }

    23. public isConnect(): boolean {
    24. return this.clientNumber !== -1;
    25. }

    27. public async startConnect(): Promise<boolean> {
    28. let option: socket.SppOptions = {
    29. uuid: '00009999-0000-1000-8000-00805F9B34FB',
    30. secure: false,
    31. type: socket.SppType.SPP_RFCOMM
    32. };
    33. socket.sppConnect(this.peerDevice, option, (err: BusinessError, num: number) => {
    34. if (err) {
    35. hilog.error(DOMAIN, 'testTag', `cpp connect failed, errCode: ${err.code}, errMessage: ${err.message}`);
    36. } else {
    37. hilog.info(DOMAIN, 'testTag', `spp connect success clientNumber: ${num}`);
    38. this.clientNumber = num;
    39. }
    40. });
    41. return true
    42. }

    44. private sendData(jsonStr: string) {
    45. if (!this.isConnect()) {
    46. hilog.error(DOMAIN, 'testTag', `server is not connected`);
    47. return;
    48. }
    49. if (!jsonStr) {
    50. hilog.error(DOMAIN, 'testTag', 'json is empty');
    51. return;
    52. }
    53. hilog.info(DOMAIN, 'testTag', `prepare sending data to client ${this.clientNumber}`);
    54. const textEncoder:util.TextEncoder = new util.TextEncoder();
    55. const uint8Array: Uint8Array = textEncoder.encodeInto(jsonStr);
    56. const arrayBuffer = uint8Array.buffer;

    58. socket.sppWrite(this.clientNumber, arrayBuffer);
    59. hilog.info(DOMAIN, 'testTag', `sending success size:${arrayBuffer.byteLength} bytes, data: ${jsonStr}`);
    60. }

    62. public sendNotificationData(notificationInfo: notificationExtensionSubscription.NotificationInfo) {
    63. let info: TransferInfo = {
    64. type: 'publish',
    65. info: notificationInfo,
    66. cancelHashCodes: undefined
    67. };

    69. let jsonStr = JSON.stringify(info);
    70. this.sendData(jsonStr);
    71. }

    73. public sendCancelNotificationData(cancelHashCodes: Array<string>) {
    74. let info: TransferInfo = {
    75. type: 'cancel',
    76. cancelHashCodes: cancelHashCodes,
    77. info: undefined
    78. };

    80. let jsonStr = JSON.stringify(info);
    81. this.sendData(jsonStr);
    82. }

    84. public read = (dataBuffer: ArrayBuffer) => {
    85. let data = new Uint8Array(dataBuffer);
    86. hilog.info(DOMAIN, 'testTag', `client data: ${JSON.stringify(data)}`);
    87. };

    89. public stopConnect() {
    90. hilog.info(DOMAIN, 'testTag', `closeSppClient ${this.clientNumber}`);
    91. try {
    92. socket.off('sppRead', this.clientNumber, this.read);
    93. } catch (err) {
    94. hilog.error(DOMAIN, 'testTag', `off sppRead errCode: ${err.code}, errMessage: ${err.message}`);
    95. }
    96. try {
    97. socket.sppCloseClientSocket(this.clientNumber);
    98. this.clientNumber = -1;
    99. } catch (err) {
    100. hilog.error(DOMAIN, 'testTag', `stopConnect errCode: ${err.code}, errMessage: ${err.message}`);
    101. }
    102. }
    103. }

    105. // export SppClientManager;
    106. export class NotificationSubscriberExtAbility extends NotificationSubscriberExtensionAbility {
    107. private sppClientManager: SppClientManager | undefined;

    109. onDestroy(): void {
    110. hilog.info(DOMAIN, 'testTag', 'onDestroy');
    111. this.sppClientManager!.stopConnect();
    112. }

    114. // Called back when a notification is published.
    115. onReceiveMessage(notificationInfo: notificationExtensionSubscription.NotificationInfo): void {
    116. hilog.info(DOMAIN, 'testTag', `on receive message ${JSON.stringify(notificationInfo)}`)
    117. notificationExtensionSubscription.getSubscribeInfo()
    118. .then(async (info) => {
    119. if (this.sppClientManager == undefined) {
    120. this.sppClientManager = new SppClientManager(info[0].addr);
    121. }
    122. if (this.sppClientManager.isConnect()) {
    123. this.sendPublishWithRetry(notificationInfo);
    124. } else {
    125. try {
    126. await this.sppClientManager.startConnect().then(() => {
    127. hilog.info(DOMAIN, 'testTag', `startConnect success`);
    128. });
    129. } catch (err) {
    130. hilog.error(DOMAIN, 'testTag', `Failed to start connect: ${JSON.stringify(err)}`);
    131. }
    132. setTimeout(() => {
    133. this.sendPublishWithRetry(notificationInfo);
    134. }, 3000)
    135. }
    136. }).catch((err: BusinessError) => {
    137. hilog.error(DOMAIN, 'testTag',
    138. `notificationExtensionSubscription failed, errCode ${err.code}, errorMessage ${err.message}`);
    139. });
    140. }

    142. // Sends a publish notification and retries once upon failure.
    143. private async sendPublishWithRetry(notificationInfo: notificationExtensionSubscription.NotificationInfo) {
    144. try {
    145. this.sppClientManager!.sendNotificationData(notificationInfo);
    146. } catch (err) {
    147. hilog.error(DOMAIN, 'testTag', `send failed, errCode ${err.code}, errorMessage ${err.message}, and retry one times`);
    148. try {
    149. await this.sppClientManager!.startConnect().then(() => {
    150. hilog.info(DOMAIN, 'testTag', `startConnect success`);
    151. });
    152. } catch (err) {
    153. hilog.error(DOMAIN, 'testTag', `Failed to start connect: ${JSON.stringify(err)}`);
    154. }
    155. setTimeout(() => {
    156. this.sppClientManager!.sendNotificationData(notificationInfo);
    157. }, 3000);
    158. }
    159. }

    161. // Called back when notifications are cancelled.
    162. onCancelMessages(hashCodes: Array<string>): void {
    163. hilog.info(DOMAIN, 'testTag', `on cancel message ${JSON.stringify(hashCodes)}`)
    164. notificationExtensionSubscription.getSubscribeInfo()
    165. .then(async (info) => {
    166. if (this.sppClientManager == undefined) {
    167. this.sppClientManager = new SppClientManager(info[0].addr);
    168. }
    169. if (this.sppClientManager.isConnect()) {
    170. this.sendCancelWithRetry(hashCodes);
    171. } else {
    172. try {
    173. await this.sppClientManager.startConnect().then(() => {
    174. hilog.info(DOMAIN, 'testTag', `startConnect success`);
    175. });
    176. } catch (err) {
    177. hilog.error(DOMAIN, 'testTag', `Failed to start connect: ${JSON.stringify(err)}`);
    178. }
    179. setTimeout(() => {
    180. this.sendCancelWithRetry(hashCodes);
    181. }, 3000)
    182. }
    183. }).catch((err: BusinessError) => {
    184. hilog.error(DOMAIN, 'testTag', `notificationExtensionSubscription failed, errCode ${err.code}, errorMessage ${err.message}`);
    185. });
    186. }

    188. // Retries a cancel operation if it fails.
    189. private async sendCancelWithRetry(hashCodes: string[]) {
    190. try {
    191. this.sppClientManager!.sendCancelNotificationData(hashCodes);
    192. } catch (err) {
    193. hilog.error(DOMAIN, 'testTag', `send failed, errCode ${err.code}, errorMessage ${err.message}, and retry one times`);
    194. try {
    195. await this.sppClientManager!.startConnect().then(() => {
    196. hilog.info(DOMAIN, 'testTag', `startConnect success`);
    197. });
    198. } catch (err) {
    199. hilog.error(DOMAIN, 'testTag', `Failed to start connect: ${JSON.stringify(err)}`);
    200. }
    201. setTimeout(() => {
    202. this.sppClientManager!.sendCancelNotificationData(hashCodes);
    203. }, 3000);
    204. }
    205. }
    206. }
    ```

    [NotificationSubscriberExtAbility.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Notification-Kit/ThirdpartyWerableDemo/entry/src/main/ets/extensionability/NotificationSubscriberExtAbility.ets#L16-L238)

注意：请勿频繁建立连接，可能会影响功能。