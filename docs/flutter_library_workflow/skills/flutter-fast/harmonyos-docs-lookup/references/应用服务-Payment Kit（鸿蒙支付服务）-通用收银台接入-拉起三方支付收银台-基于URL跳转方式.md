1. 商户客户端根据Payment Kit接口返回的支付信息[PayResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-paymentservice#zh-cn_topic_0000002043030493_section363mcpsimp)(混合支付场景）/[PickerResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-paymentservice#section1129353710263)（纯外部支付场景），按照三方支付平台接入要求创建订单获取拉起三方支付收银台链接并构建**订单支付跳转信息**[orderStr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-model#section159202591414)请求[requestPayment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-paymentservice#section295285522616)接口跳转或拉起三方支付收银台。

   跳转三方支付收银台示例代码如下：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';
   2. import { paymentService } from '@kit.PaymentKit';
   3. import { common } from '@kit.AbilityKit';

   5. @Entry
   6. @Component
   7. struct Index {
   8. context: common.UIAbilityContext = this.getUIContext().getHostContext() as common.UIAbilityContext;
   9. requestPaymentPromise() {
   10. // used orderStr to jump third-party payment, use your own orderStr.
   11. const orderStr = '{"nextAction":"L","linkUrl":"https://www.***.pay.com/h5pay?prepay_id=***&sign=***","scheme":"","clientToken":"***"}';
   12. paymentService.requestPayment(this.context, orderStr, "AP")
   13. .then((payResult: paymentService.PayResult) => {
   14. // succeeded in paying
   15. console.info('succeeded in paying, pay result: ', payResult);
   16. })
   17. .catch((error: BusinessError) => {
   18. // failed to pay
   19. console.error(`failed to pay, error.code: ${error.code}, error.message: ${error.message}`);
   20. });
   21. }

   23. build() {
   24. Column() {
   25. Button('requestPaymentPromise')
   26. .type(ButtonType.Capsule)
   27. .width('50%')
   28. .margin(20)
   29. .onClick(() => {
   30. this.requestPaymentPromise();
   31. })
   32. }
   33. .width('100%')
   34. .height('100%')
   35. }
   36. }
   ```
2. 开发者按照三方支付平台要求完成订单支付后的下一步业务处理，如对返回的支付结果信息验签等。