说明

* 当前基于接口拉起方式拉起三方支付收银台支持的支付方式参见[PayMethod](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-third-payment-service#section59035422210)。
* 基于接口拉起三方支付收银台起始版本为：6.0.0(20)。

1. 商户客户端根据Payment Kit接口返回的支付信息[PayResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-paymentservice#zh-cn_topic_0000002043030493_section363mcpsimp)(混合支付场景）/[PickerResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-paymentservice#section1129353710263)（纯外部支付场景），按照三方支付平台接入要求构建三方支付信息[payInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-model#section1240916334438)调用[ThirdPayClient.pay](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-third-payment-service#section5214134018367)接口拉起三方支付收银台。

   拉起三方支付收银台示例代码如下：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';
   2. import { thirdPaymentService } from '@kit.PaymentKit';
   3. import { common } from '@kit.AbilityKit';

   5. export let thirdPayClient: thirdPaymentService.ThirdPayClient | undefined = undefined;

   7. @Entry
   8. @Component
   9. struct Index {
   10. context: common.UIAbilityContext = this.getUIContext().getHostContext() as common.UIAbilityContext;
   11. thirdPaymentServicePayPromise() {
   12. thirdPayClient = new thirdPaymentService.ThirdPayClient(this.context, thirdPaymentService.PayMethod.WECHAT_PAY, "appid_123456");
   13. // use your own payInfo
   14. const payInfo = '{"xxx1":"***", "xxx2":"***", "token":"***"}';
   15. thirdPayClient.pay(payInfo).then(() => {
   16. // succeeded in paying
   17. console.info('succeeded in paying.');
   18. }).catch((error: BusinessError) => {
   19. // failed to pay
   20. console.error(`failed to pay, error.code: ${error.code}, error.message: ${error.message}`);
   21. });
   22. }

   24. build() {
   25. Column() {
   26. Button('thirdPaymentServicePayPromise')
   27. .type(ButtonType.Capsule)
   28. .width('50%')
   29. .margin(20)
   30. .onClick(() => {
   31. this.thirdPaymentServicePayPromise();
   32. })
   33. }
   34. .width('100%')
   35. .height('100%')
   36. }
   37. }
   ```
2. 拉起三方支付收银台可同步通过调用[ThirdPayClient.handlePayCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-third-payment-service#section09689720416)接口（用户支付完成后，会将支付操作结果回调给商户客户端），获取三方支付处理结果，完成支付操作处理。参考示例代码如下：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { hilog } from '@kit.PerformanceAnalysisKit';
   2. import { UIAbility, Want } from '@kit.AbilityKit';
   3. // 需要从thirdPayClient对象定义文档中导入三方支付客户端对象，以下为示例，具体已应用定义路径为准。
   4. import { thirdPayClient } from '../pages/thirdPaymentServicetest';

   6. // 如果已有Ability实现类，可直接添加onNewWant生命周期方法处理即可。
   7. export default class EntryAbility extends UIAbility {
   8. onNewWant(want: Want): void {
   9. // 需要和拉起支付收银台的三方支付客户端对象为同一个
   10. if (thirdPayClient) {
   11. hilog.info(0x0000, 'testTag', '%{public}s','clientForThirdPayment handlePayCallback');
   12. let handlePayCallback = thirdPayClient.handlePayCallback(want);
   13. hilog.info(0x0000, 'testTag', 'clientForThirdPayment handlePayCallback result: %{public}s', handlePayCallback);
   14. }
   15. }
   16. }
   ```
3. 商户客户端收到三方支付回调通知或主动查询订单支付结果成功后，按照三方支付平台要求完成订单支付后的下一步业务处理，如对返回的支付结果信息验签等。