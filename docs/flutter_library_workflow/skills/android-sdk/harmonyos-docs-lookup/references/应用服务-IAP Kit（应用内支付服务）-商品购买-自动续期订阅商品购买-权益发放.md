## 对生效中的订阅发放权益

### 场景介绍

用户购买自动续期订阅商品后，若订阅处于生效状态，开发者需要及时给用户发放对应权益。

在应用启动时，获取用户当前处于生效状态的订阅列表，处理此部分订阅的权益发放。建议先检查当前订阅对应权益的发放状态，未发放再补充发放权益。在权益发放成功后，向IAP确认发货，完成购买。

建议单机应用将用户权益和订阅状态关联。如果订阅处于生效状态，始终为用户发放权益。

### 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d6/v3/M-Fa4ZSwREq51rR4UpbMpA/zh-cn_image_0000002413174220.png?HW-CC-KV=V1&HW-CC-Date=20260414T031059Z&HW-CC-Expire=86400&HW-CC-Sign=0ED29ECD5DAB384785E54713972EEE73FC6C9988698AE0863F825795076D01AF "点击放大")

1. 应用客户端向IAP Kit发起[queryPurchases](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-iap#section1147122418532)请求，查询用户生效中的订阅列表。
2. IAP Kit返回[PurchaseData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-data-model#section650794012482)列表。[PurchaseData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-data-model#section650794012482)为JWS格式的字符串，承载了相关的订阅信息。
3. 应用客户端向应用服务器上报[PurchaseData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-data-model#section650794012482)列表。
4. 应用服务器需对每个[PurchaseData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-data-model#section650794012482).jwsSubscriptionStatus进行[解码验签](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-verifying-signature#section13462132312543)，验证成功可得到对应的[SubGroupStatusPayload](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-data-model#section1311343185318)的JSON字符串。
5. 处理权益发放。检查[SubGroupStatusPayload](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-data-model#section1311343185318).lastSubscriptionStatus.lastPurchaseOrder是否已发放权益，未发放则需发放相关权益，并记录对应的订单信息（[PurchaseOrderPayload](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-data-model#section260562820380)）。

   说明

   建议单机应用将用户权益和订阅状态关联。如果订阅处于生效状态，始终为用户发放权益。
6. 应用客户端向应用服务器查询订单的发货状态。
7. 应用服务器返回对应的发货状态以及订单信息（[PurchaseOrderPayload](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-data-model#section260562820380)）。
8. 发放权益后应用客户端向IAP Kit发送[finishPurchase](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-iap#section124751324135814)请求，以此通知IAP服务器更新商品的发货状态，完成购买流程。应用成功执行[finishPurchase](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-iap#section124751324135814)之后，IAP服务器会将相应商品标记为已发货状态。此步骤也可放到应用服务器处理。应用服务器可通过请求服务端[订阅确认发货](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-confirm-purchase-for-sub)接口来确认发货，完成购买流程。

   说明

   对于自动续期订阅商品，如果不执行此步骤，会导致后续自动续期无法扣费，以及同一个订阅组不同自动续期订阅商品无法切换等问题。

### 开发步骤

1. 应用客户端向IAP Kit发起[queryPurchases](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-iap#section1147122418532)请求，获取生效中的订阅列表。

   在请求参数[QueryPurchasesParameter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-iap#section555872993213)中指定productType为[iap.ProductType.AUTORENEWABLE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-iap#section59035422210)，同时指定queryType为[iap.PurchaseQueryType.CURRENT\_ENTITLEMENT](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-iap#section1389262216514)。当接口请求成功时，IAP Kit将返回一个[QueryPurchaseResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-iap#section820381425513)对象，该对象包含承载了订阅信息的[PurchaseData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-data-model#section650794012482)的列表。
2. 验证订单信息。对每个[purchaseData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-data-model#section650794012482).jwsSubscriptionStatus进行[解码验签](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-verifying-signature#section13462132312543)，验证成功可得到[SubGroupStatusPayload](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-data-model#section1311343185318)的JSON字符串。建议应用客户端将[purchaseData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-data-model#section650794012482)发送至应用服务器，在应用服务器执行此操作。

   为了提高安全性，可从[SubGroupStatusPayload](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-data-model#section1311343185318).lastSubscriptionStatus.lastPurchaseOrder中解析出purchaseToken和purchaseOrderId信息，并通过服务端[订阅状态查询](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-query-subscription-status)接口向IAP服务器查询最新的订阅状态信息，进一步确认订阅信息的准确性。
3. 展示订阅状态。
   * 如果[SubGroupStatusPayload](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-data-model#section1311343185318).lastSubscriptionStatus.status=1，表示订阅处于生效状态。
   * 如果[SubGroupStatusPayload](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-data-model#section1311343185318).lastSubscriptionStatus.status=1且[SubGroupStatusPayload](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-data-model#section1311343185318).lastSubscriptionStatus.renewalInfo.autoRenewStatusCode值为1时，表示订阅处于自动续期状态。此状态的商品无法再次购买，需要屏蔽相关的购买入口。
4. 权益发放。获取[SubGroupStatusPayload](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-data-model#section1311343185318).lastSubscriptionStatus.lastPurchaseOrder（下文标记为[PurchaseOrderPayload](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-data-model#section260562820380)），处理权益发放。

   可先检查此笔订单权益的发放状态，未发放则补充发放权益，成功后记录[PurchaseOrderPayload](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-data-model#section260562820380)等信息，用于后续检查权益发放状态。

   说明

   建议单机应用将用户权益和订阅状态关联。如果订阅处于生效状态，始终为用户发放权益。
5. 在发放权益后，如果[PurchaseOrderPayload](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-data-model#section260562820380).finishStatus不为1，应用需调用[finishPurchase](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-iap#section124751324135814)接口确认发货，完成购买流程。

   发起请求时，需在请求参数[FinishPurchaseParameter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-iap#section103714142118)中携带[PurchaseOrderPayload](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-data-model#section260562820380)中的productType、purchaseToken、purchaseOrderId。请求成功后，IAP服务器会将相应商品标记为已发货。

   说明

   此步骤也可放到应用服务器处理。应用服务器可通过请求服务端[订阅确认发货](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-confirm-purchase-for-sub)接口来确认发货，完成购买流程。

收起

自动换行

深色代码主题

复制

```
1. import { iap } from '@kit.IAPKit';
2. import { common } from '@kit.AbilityKit';
3. import { BusinessError } from '@kit.BasicServicesKit';
4. // JWSUtil为自定义类，可参见示例代码
5. import { JWSUtil } from '../common/JWSUtil';

7. @Entry
8. @Component
9. struct Index {

11. queryPurchases(context: common.UIAbilityContext) {
12. const param: iap.QueryPurchasesParameter = {
13. productType: iap.ProductType.AUTORENEWABLE,
14. queryType: iap.PurchaseQueryType.CURRENT_ENTITLEMENT
15. };
16. iap.queryPurchases(context, param).then((res: iap.QueryPurchaseResult) => {
17. console.info('Succeeded in querying purchases.');
18. const purchaseDataList: string[] = res.purchaseDataList;
19. if (purchaseDataList === undefined || purchaseDataList.length <= 0) {
20. return;
21. }
22. for (let i = 0; i < purchaseDataList.length; i++) {
23. const jwsSubscriptionStatus: string = JSON.parse(purchaseDataList[i]).jwsSubscriptionStatus;
24. if (!jwsSubscriptionStatus) {
25. continue;
26. }
27. // 对jwsSubscriptionStatus进行解码验签
28. const subscriptionStatus: string = JWSUtil.decodeJwsObj(jwsSubscriptionStatus);
29. // 需自定义SubGroupStatusPayload类，包含的信息请参见SubGroupStatusPayload
30. const subGroupStatusPayload: SubGroupStatusPayload = JSON.parse(subscriptionStatus);
31. const lastSubscriptionStatus = subGroupStatusPayload.lastSubscriptionStatus;
32. if (!lastSubscriptionStatus) {
33. continue;
34. }

36. // 根据status判断订阅的状态
37. const status = lastSubscriptionStatus.status;
38. // 更新商品的订阅状态
39. // ...

41. // 处理权益发放
42. const purchaseOrderPayload = lastSubscriptionStatus.lastPurchaseOrder;
43. if (purchaseOrderPayload === undefined) {
44. continue;
45. }
46. if (status === '1') {
47. // 订阅处于生效状态
48. // 处理权益发放。检查此笔订单权益的发放状态，未发放则补充发放权益
49. // ...
50. }
51. // 发放权益后向IAP Kit发送finishPurchase请求，确认发货，完成购买
52. if (purchaseOrderPayload && purchaseOrderPayload.finishStatus !== '1') {
53. this.finishPurchase(context, purchaseOrderPayload);
54. }
55. }
56. }).catch((err: BusinessError) => {
57. // 请求失败
58. console.error(`Failed to query purchases. Code is ${err.code}, message is ${err.message}`);
59. })
60. }

62. finishPurchase(context: common.UIAbilityContext, purchaseOrder: PurchaseOrderPayload) {
63. const finishPurchaseParam: iap.FinishPurchaseParameter = {
64. productType: Number(purchaseOrder.productType),
65. purchaseToken: purchaseOrder.purchaseToken,
66. purchaseOrderId: purchaseOrder.purchaseOrderId
67. };
68. iap.finishPurchase(context, finishPurchaseParam).then(() => {
69. // 请求成功
70. console.info('Succeeded in finishing purchase.');
71. }).catch((err: BusinessError) => {
72. // 请求失败
73. console.error(`Failed to finish purchase. Code is ${err.code}, message is ${err.message}`);
74. });
75. }

77. build() {}
78. }
```

## 确保权益发放

用户购买自动续期订阅成功或者自动续期成功后，开发者需要及时给用户发放相关权益。但实际应用场景中，若出现异常（网络错误等）将导致应用无法知道用户实际是否支付成功，从而无法及时发放权益，即出现掉单情况。

为了确保权益发放，需要在[createPurchase](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-iap#section18798154545516)请求返回[iap.IAPErrorCode.PRODUCT\_OWNED](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-iap#section1834394718429)或[iap.IAPErrorCode.SYSTEM\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-iap#section1834394718429)时检查用户是否存在已购但未确认发货的商品，如果存在则发放相关权益，然后向IAP Kit确认发货，完成购买。

### 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c8/v3/YTbzmPG4SZCLXxFji5BwGw/zh-cn_image_0000002413014364.png?HW-CC-KV=V1&HW-CC-Date=20260414T031059Z&HW-CC-Expire=86400&HW-CC-Sign=16806A66CA4AC5FE303655C18AE9EA8B1DB207D217F55E639F759953F3DB4183 "点击放大")

1. 应用客户端向IAP Kit发起[queryPurchases](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-iap#section1147122418532)请求，查询用户已购买但未确认发货的订阅列表。
2. IAP Kit返回[PurchaseData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-data-model#section650794012482)列表。[PurchaseData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-data-model#section650794012482)为JWS格式的字符串，承载了相关的订阅信息。
3. 应用客户端向应用服务器上报[PurchaseData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-data-model#section650794012482)列表。
4. 应用服务器需对每个[PurchaseData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-data-model#section650794012482).jwsSubscriptionStatus进行[解码验签](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-verifying-signature#section13462132312543)，验证成功可得到对应的[SubGroupStatusPayload](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-data-model#section1311343185318)的JSON字符串。
5. 处理权益发放。检查[SubGroupStatusPayload](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-data-model#section1311343185318).lastSubscriptionStatus.lastPurchaseOrder是否已发放权益，未发放则需发放相关权益，并记录对应的订单信息（[PurchaseOrderPayload](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-data-model#section260562820380)）。

   说明

   建议单机应用将用户权益和订阅状态关联。如果订阅处于生效状态，始终为用户发放权益。
6. 应用客户端向应用服务器查询订单的发货状态。
7. 应用服务器返回对应的发货状态以及订单信息（[PurchaseOrderPayload](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-data-model#section260562820380)）。
8. 发放权益后应用客户端向IAP Kit发送[finishPurchase](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-iap#section124751324135814)请求，以此通知IAP服务器更新商品的发货状态，完成购买流程。应用成功执行[finishPurchase](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-iap#section124751324135814)之后，IAP服务器会将相应商品标记为已发货状态。此步骤也可放到应用服务器处理。应用服务器可通过请求服务端[订阅确认发货](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-confirm-purchase-for-sub)接口来确认发货，完成购买流程。

   说明

   对于自动续期订阅商品，如果不执行此步骤，会导致后续自动续期无法扣费，以及同一个订阅组不同自动续期订阅商品无法切换等问题。

### 开发步骤

1. 应用客户端向IAP Kit发起[queryPurchases](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-iap#section1147122418532)请求，获取用户已购但未确认发货的订阅列表。

   在请求参数[QueryPurchasesParameter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-iap#section555872993213)中指定productType为[iap.ProductType.AUTORENEWABLE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-iap#section59035422210)，同时指定queryType为[iap.PurchaseQueryType.UNFINISHED](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-iap#section1389262216514)。当接口请求成功时，IAP Kit将返回一个[QueryPurchaseResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-iap#section820381425513)对象，该对象包含承载了订阅信息的[PurchaseData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-data-model#section650794012482)的列表。
2. 验证订单信息。对每个[purchaseData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-data-model#section650794012482).jwsSubscriptionStatus进行[解码验签](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-verifying-signature#section13462132312543)，验证成功可得到[SubGroupStatusPayload](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-data-model#section1311343185318)的JSON字符串。建议应用客户端将[purchaseData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-data-model#section650794012482)发送至应用服务器，在应用服务器执行此操作。

   为了提高安全性，可从[SubGroupStatusPayload](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-data-model#section1311343185318).lastSubscriptionStatus.lastPurchaseOrder中解析出purchaseToken和purchaseOrderId信息，并通过服务端[订阅状态查询](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-query-subscription-status)接口向IAP服务器查询最新的订阅状态信息，进一步确认订阅信息的准确性。
3. 处理权益发放。

   如果SubGroupStatusPayload.lastSubscriptionStatus.status=1，表示订阅处于生效状态。需要对生效状态的订阅处理权益发放。建议先检查此笔订单权益的发放状态，未发放则补充发放权益，成功后记录[PurchaseOrderPayload](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-data-model#section260562820380)等信息，用于后续检查权益发放状态。

   建议单机应用将用户权益和订阅状态关联。如果订阅处于生效状态，始终为用户发放权益。
4. 在发放权益后，如果PurchaseOrderPayload.finishStatus不为1，应用需调用[finishPurchase](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-iap#section124751324135814)接口确认发货，完成购买流程。

   发起请求时，需在请求参数[FinishPurchaseParameter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-iap#section103714142118)中携带[PurchaseOrderPayload](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-data-model#section260562820380)中的productType、purchaseToken、purchaseOrderId。请求成功后，IAP服务器会将相应商品标记为已发货。

   说明

   此步骤也可放到应用服务器处理。应用服务器可通过请求服务端[订阅确认发货](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-confirm-purchase-for-sub)接口来确认发货，完成购买流程。

收起

自动换行

深色代码主题

复制

```
1. import { iap } from '@kit.IAPKit';
2. import { common } from '@kit.AbilityKit';
3. import { BusinessError } from '@kit.BasicServicesKit';
4. // JWSUtil为自定义类，可参见示例代码
5. import { JWSUtil } from '../common/JWSUtil';

7. @Entry
8. @Component
9. struct Index {

11. queryPurchases(context: common.UIAbilityContext) {
12. const param: iap.QueryPurchasesParameter = {
13. productType: iap.ProductType.AUTORENEWABLE,
14. queryType: iap.PurchaseQueryType.UNFINISHED
15. };
16. iap.queryPurchases(context, param).then((res: iap.QueryPurchaseResult) => {
17. console.info('Succeeded in querying purchases.');
18. const purchaseDataList: string[] = res.purchaseDataList;
19. if (purchaseDataList === undefined || purchaseDataList.length <= 0) {
20. return;
21. }
22. for (let i = 0; i < purchaseDataList.length; i++) {
23. const jwsSubscriptionStatus: string = JSON.parse(purchaseDataList[i]).jwsSubscriptionStatus;
24. if (!jwsSubscriptionStatus) {
25. continue;
26. }
27. // 对jwsSubscriptionStatus进行解码验签
28. const subscriptionStatus: string = JWSUtil.decodeJwsObj(jwsSubscriptionStatus);
29. // 需自定义SubGroupStatusPayload类，包含的信息请参见SubGroupStatusPayload
30. const subGroupStatusPayload: SubGroupStatusPayload = JSON.parse(subscriptionStatus);
31. const lastSubscriptionStatus = subGroupStatusPayload.lastSubscriptionStatus;
32. if (!lastSubscriptionStatus) {
33. continue;
34. }

36. // 根据status判断订阅的状态
37. const status = lastSubscriptionStatus.status;
38. // 更新商品的订阅状态
39. // ...

41. // 处理权益发放
42. const purchaseOrderPayload = lastSubscriptionStatus.lastPurchaseOrder;
43. if (purchaseOrderPayload === undefined) {
44. continue;
45. }
46. if (status === '1') {
47. // 订阅处于生效状态
48. // 处理权益发放。检查此笔订单权益的发放状态，未发放则补充发放权益
49. // ...
50. }
51. // 发放权益后向IAP Kit发送finishPurchase请求，确认发货，完成购买
52. if (purchaseOrderPayload && purchaseOrderPayload.finishStatus !== '1') {
53. this.finishPurchase(context, purchaseOrderPayload);
54. }
55. }
56. }).catch((err: BusinessError) => {
57. // 请求失败
58. console.error(`Failed to query purchases. Code is ${err.code}, message is ${err.message}`);
59. })
60. }

62. finishPurchase(context: common.UIAbilityContext, purchaseOrder: PurchaseOrderPayload) {
63. const finishPurchaseParam: iap.FinishPurchaseParameter = {
64. productType: Number(purchaseOrder.productType),
65. purchaseToken: purchaseOrder.purchaseToken,
66. purchaseOrderId: purchaseOrder.purchaseOrderId
67. };
68. iap.finishPurchase(context, finishPurchaseParam).then(() => {
69. // 请求成功
70. console.info('Succeeded in finishing purchase.');
71. }).catch((err: BusinessError) => {
72. // 请求失败
73. console.error(`Failed to finish purchase. Code is ${err.code}, message is ${err.message}`);
74. });
75. }

77. build() {}
78. }
```