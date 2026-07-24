小游戏接入基础游戏服务的小游戏支付API后，支持在小游戏内提供付费商品，玩家可以在小游戏内进行购买。

## 前提条件

* 已完成[开发准备](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/gameservice-gameplayer-minigame-preparation)。
* 已开通[商户服务](https://developer.huawei.com/consumer/cn/doc/start/merchant-service-0000001053025967)。
* 已前往AGC控制台为小游戏[添加数字商品](https://developer.huawei.com/consumer/cn/doc/app/agc-help-release-minigame-goods-0000002424923350)。

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/68/v3/EjhxW3l5RpKHTI19kreuHg/zh-cn_image_0000002474151174.png?HW-CC-KV=V1&HW-CC-Date=20260414T030404Z&HW-CC-Expire=86400&HW-CC-Sign=63D46E80D06F55F71DBD02B6D3329D8C82A132C0EDB850D3239093A137FF71D3)

1. 玩家在小游戏内购买商品。
2. 小游戏调用[miniGamePay](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section91831924175010)向Game Service Kit发起支付请求。
3. Game Service Kit向IAP Kit发送请求拉起收银台，IAP Kit处理支付请求，详情请参考[商品购买](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/iap-purchases)。
4. IAP Kit处理完成后向Game Service Kit返回此次商品购买的结果等信息。
5. Game Service Kit返回此次商品购买的结果等信息，开发者将接收到一个[CreatePurchaseResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section193852021105111)对象，对象内的purchaseData字段包括了此次购买的结果信息。

## 接口说明

具体API说明详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer)。

展开

| 接口名 | 描述 |
| --- | --- |
| [init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section225333655719)(context: common.UIAbilityContext, callback: AsyncCallback<void>): void | 游戏初始化接口，使用默认的上下文信息，通过callback回调获取返回值。 |
| [miniGamePay](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section91831924175010)(context: common.Context, parameter: PurchaseParameter): Promise<CreatePurchaseResult> | 小游戏支付接口，通过Promise对象获取返回值。 |

## 开发步骤

### 导入模块

导入Game Service Kit及公共模块。

收起

自动换行

深色代码主题

复制

```
1. import { gamePlayer } from '@kit.GameServiceKit';
2. import { common } from '@kit.AbilityKit';
3. import { hilog } from '@kit.PerformanceAnalysisKit';
4. import { BusinessError } from '@kit.BasicServicesKit';
5. import { window } from '@kit.ArkUI';
```

### 初始化

调用[init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section225333655719)接口初始化Game Service Kit。

收起

自动换行

深色代码主题

复制

```
1. onWindowStageCreate(windowStage: window.WindowStage) {
2. windowStage.loadContent("pages/index", (err, data) => {
3. try {
4. gamePlayer.init(this.context,()=>{
5. hilog.info(0x0000, 'testTag', `Succeeded in initializing.`);
6. });
7. } catch (error) {
8. let err = error as BusinessError;
9. hilog.error(0x0000, 'testTag', `Failed to init. Code: ${err.code}, message: ${err.message}`);
10. }
11. });
12. }
```

### 发起支付请求

调用[miniGamePay](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section91831924175010)向Game Service Kit发起支付请求，Game Service Kit将向IAP Kit发送请求拉起收银台，IAP Kit处理支付请求。IAP Kit处理完成后向Game Service Kit返回此次商品购买的结果等信息，Game Service Kit将此次商品购买的结果等信息通过[CreatePurchaseResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section193852021105111)对象返回给开发者。

收起

自动换行

深色代码主题

复制

```
1. let context = this.getUIContext()?.getHostContext() as common.UIAbilityContext;
2. let request: gamePlayer.PurchaseParameter = {
3. productId: 'xxx', // 待支付的商品ID
4. productType: 0, // 待查询的商品类型
5. developerPayload: 'xxx', // 商户侧保留信息，该参数长度限制为[0, 256]。若该字段有值，在支付成功后的回调结果中会原样返回给应用。
6. reservedInfo: 'xxx' // 要求JSON String格式，商户可以将额外需要传入的字段以key-value的形式设置在JSON String中，并通过该参数传入。
7. };
8. try {
9. gamePlayer.miniGamePay(context, request).then((result: gamePlayer.CreatePurchaseResult) => {
10. hilog.info(0x0000, 'testTag', `Succeeded in paying`);
11. }).catch((error: BusinessError) => {
12. hilog.error(0x0000, 'testTag', `Failed to pay. Code: ${error.code}, message: ${error.message}`);
13. });
14. } catch (error) {
15. let err = error as BusinessError;
16. hilog.error(0x0000, 'testTag', `Failed to pay. Code: ${err.code}, message: ${err.message}`);
17. }
```