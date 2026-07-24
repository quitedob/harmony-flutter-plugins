交通卡的开通过程分为：获取卡片开通入口、确认卡片是否支持添加、生成并支付订单和完成开卡四个步骤，整体流程如下图，相关接口定义请参照[钱包服务API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-wallettransitcard)。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/60/v3/76d4pM8LQauwnpp8k2vDHw/zh-cn_image_0000002182921498.png?HW-CC-KV=V1&HW-CC-Date=20260414T033658Z&HW-CC-Expire=86400&HW-CC-Sign=B2228969B2484529BC93AC58780319A9A974D52452FDF7CB86F48106C9A4A778 "点击放大")

* 开发者的app启动后，可调用[getCardMetadataInDevice](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-wallettransitcard#section3931434195115)接口获取指定设备上开发者的app可以访问的交通卡的信息以数组的方式返回。如返回的数组为空，则表示开发者的app在该设备上没有可访问的交通卡，无需显示卡片开通入口；如返回数组不为空，则按具体的交通卡信息做展示。如果交通卡信息中包括卡号、余额信息，则表明该卡片在设备上已开通，显示卡片信息即可；否则可显示卡片的开通入口。
* 用户在选择开通交通卡后，先调用[canAddTransitCard](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-wallettransitcard#section842743618139)传入issuerId和指定的设备Id接口，钱包会检查指定设备上目标卡片的开卡条件是否满足，如有条件不满足，会返回相应错误码，可参考[ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-error-code)，按错误码类型给用户具体的错误提示。如条件满足则会返回开卡凭证数据addCardOpaqueData。
* 在开卡条件检查通过获取到开卡凭证数据后，开发者的app需要将用户的开卡和首充的订单信息连同开卡凭证addCardOpaqueData一起提交给开发者的服务器生成开卡+首充的订单，addCardOpaqueData需和订单关联存储。开发者的服务器将订单提交给支付机构，在用户授权完成支付并收到支付机构的支付完成通知后，向卡公司的SP TSM服务器下发开卡+首充的订单数据，其中需要包括addCardOpaqueData数据。
* 在确认订单支付完成后，开发者的app可调用[addTransitCard](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-wallettransitcard#section1973893821320)接口并传入addCardOpaqueData和serverOrderId进行开卡过程。开卡过程会跳转到钱包app的页面进行，开卡成功后会返回到开发者的app并且会携带卡片的基本数据，包括卡号和余额信息。开卡过程中如出现失败，钱包app会自动重试，如重试不成功钱包app会自动发起回滚将订单申请退款。

## 开发步骤

1. 获取设备上支持开通的交通卡列表。

   初始化TransitCardClient时，构造方法的第二个入参callerId是接口调用方ID。开发者可以联系钱包运营申请交通卡服务时获取。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { common } from '@kit.AbilityKit';
   2. import { walletTransitCard } from '@kit.WalletKit';
   3. import { BusinessError } from '@kit.BasicServicesKit';

   5. @Entry
   6. @Component
   7. struct Index {
   8. private transitCardClient: walletTransitCard.TransitCardClient = new walletTransitCard.TransitCardClient(this.getUIContext().getHostContext() as common.UIAbilityContext, 'callerId');

   10. async getCardMetadataInDevice() {
   11. this.transitCardClient.getCardMetadataInDevice(walletTransitCard.DeviceType.DEVICE_PHONE).then((result) => {
   12. console.info(`Succeeded in getting cardMetadataInDevice`);
   13. }).catch((err: BusinessError) => {
   14. console.error(`Failed to get CardMetadataInDevice, code:${err.code}, message:${err.message}`);
   15. })
   16. }

   18. build() {
   19. // your application UI
   20. }
   21. }
   ```
2. 获取开卡addCardOpaqueData。

   选中一张交通卡，调用[canAddTransitCard](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-wallettransitcard#section842743618139)接口，获取开卡addCardOpaqueData。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { common } from '@kit.AbilityKit';
   2. import { walletTransitCard } from '@kit.WalletKit';
   3. import { BusinessError } from '@kit.BasicServicesKit';

   5. @Entry
   6. @Component
   7. struct Index {
   8. private transitCardClient: walletTransitCard.TransitCardClient = new walletTransitCard.TransitCardClient(this.getUIContext().getHostContext() as common.UIAbilityContext, 'callerId');

   10. async canAddTransitCard() {
   11. // the issuerId returned by the getCardMetadataInDevice interface
   12. const issuerId = 'issuerId';
   13. // the specifiedDeviceId returned by the getCardMetadataInDevice interface
   14. const specifiedDeviceId = 'specifiedDeviceId';
   15. this.transitCardClient.canAddTransitCard(issuerId, specifiedDeviceId).then((result) => {
   16. console.info(`Succeeded in canning AddTransitCard`);
   17. // save the result as the input parameter addCardOpaqueData of addTransitCard.
   18. }).catch((err: BusinessError) => {
   19. console.error(`Failed to can AddTransitCard, code:${err.code}, message:${err.message}`);
   20. })
   21. }

   23. build() {
   24. // your application UI
   25. }
   26. }
   ```
3. 开通交通卡。

   使用步骤2获取到的addCardOpaqueData，调用[addTransitCard](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-wallettransitcard#section1973893821320)接口开通交通卡。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { common } from '@kit.AbilityKit';
   2. import { walletTransitCard } from '@kit.WalletKit';
   3. import { BusinessError } from '@kit.BasicServicesKit';

   5. @Entry
   6. @Component
   7. struct Index {
   8. private transitCardClient: walletTransitCard.TransitCardClient = new walletTransitCard.TransitCardClient(this.getUIContext().getHostContext() as common.UIAbilityContext, 'callerId');

   10. async addTransitCard() {
   11. // order ID generated after payment in a developer's app, which is implemented by the developer
   12. let serverOrderId = 'serverOrderId';
   13. // the addCardOpaqueData returned by step 2
   14. let addCardOpaqueData = 'addCardOpaqueData';
   15. this.transitCardClient.addTransitCard(addCardOpaqueData, serverOrderId).then((result) => {
   16. console.info(`Succeeded in adding TransitCard`);
   17. }).catch((err: BusinessError) => {
   18. console.error(`Failed to add TransitCard, code:${err.code}, message:${err.message}`);
   19. })
   20. }

   22. build() {
   23. // your application UI
   24. }
   25. }
   ```