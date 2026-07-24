## 场景介绍

当应用需要获取用户发票抬头时，可使用Account Kit提供的发票助手能力，帮助用户打开发票抬头选择页面进行选择或管理发票抬头。以下对Account Kit提供的发票助手能力进行介绍，获取发票抬头功能还可使用场景化控件[选择发票抬头Button](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/scenario-fusion-button-invoice-title)进行实现。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c4/v3/3VtE8bEcSrSPcjohxsypGA/zh-cn_image_0000002528823269.png?HW-CC-KV=V1&HW-CC-Date=20260414T024726Z&HW-CC-Expire=86400&HW-CC-Sign=C288EBEAE381DE0A4D150F595F4D654A0414AB940754B62969DB838F406454D1 "点击放大")

## 约束与限制

Wearable、TV设备暂不支持使用获取发票抬头功能。

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7b/v3/gFTTegLPQW2rY7ZPg8t2tA/zh-cn_image_0000002497223274.png?HW-CC-KV=V1&HW-CC-Date=20260414T024726Z&HW-CC-Expire=86400&HW-CC-Sign=E98261FD5C2323EC3C651CA40D223F27455985BE133E92FF1403708157AD4938 "点击放大")

流程说明：

1. 用户需要使用发票抬头时，应用程序调用选择发票抬头API，打开华为账号发票抬头选择页。
2. 用户可以在发票抬头选择页选择已有发票抬头或者跳转到发票抬头管理页进行增加，点击确认后可将选择的发票抬头返回给应用。

## 接口说明

获取发票抬头关键接口如下表所示，具体API说明详见[API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-invoiceassistant)。

展开

| 接口名 | 描述 |
| --- | --- |
| [selectInvoiceTitle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-invoiceassistant#section162103412610)(context: [common.Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-common#context)): Promise<[InvoiceTitle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-invoiceassistant#section9615740103819)> | 调用该方法打开发票抬头选择页面，使用Promise异步回调返回选择的发票抬头。 |

注意

上述接口需在页面或自定义组件生命周期内调用。

## 开发前提

在进行代码开发前，请确保已按照“开发准备”章节中的指导完成[配置签名和指纹](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/account-sign-fingerprints)、[配置Client ID](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/account-client-id)。此场景无需申请账号权限。

## 开发步骤

1. 导入[invoiceAssistant](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-invoiceassistant)模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { invoiceAssistant } from '@kit.AccountKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';
   3. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 调用[selectInvoiceTitle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-invoiceassistant#section162103412610)方法选择发票抬头页面。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 执行请求
   2. if (canIUse('SystemCapability.HuaweiID.InvoiceAssistant')) {
   3. try {
   4. // 此示例为代码片段，实际需在自定义组件实例中使用，以获取UIContext对象作为函数入参
   5. invoiceAssistant.selectInvoiceTitle(this.getUIContext().getHostContext())
   6. .then((data: invoiceAssistant.InvoiceTitle) => {
   7. hilog.info(0x0000, 'testTag', 'Succeeded in selecting invoice title');
   8. const type: string = data.type;
   9. const title: string = data.title;
   10. const taxNumber: string = data.taxNumber;
   11. const companyAddress: string = data.companyAddress;
   12. const telephone: string = data.telephone;
   13. const bankName: string = data.bankName;
   14. const bankAccount: string = data.bankAccount;

   16. // 开发者处理type, title, taxNumber, companyAddress, telephone, bankName, bankAccount
   17. // ...

   19. })
   20. .catch((error: BusinessError<Object>) => {
   21. dealAllError(error);
   22. })
   23. } catch (error) {
   24. dealAllError(error);
   25. }
   26. } else {
   27. hilog.info(0x0000, 'testTag',
   28. 'The current device does not support the invoking of the selectInvoiceTitle interface.');
   29. }
   ```

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 错误处理
   2. function dealAllError(error: BusinessError<Object>): void {
   3. hilog.error(0x0000, 'testTag', `Failed to selectInvoiceTitle. Code: ${error.code}, message: ${error.message}`);
   4. }
   ```