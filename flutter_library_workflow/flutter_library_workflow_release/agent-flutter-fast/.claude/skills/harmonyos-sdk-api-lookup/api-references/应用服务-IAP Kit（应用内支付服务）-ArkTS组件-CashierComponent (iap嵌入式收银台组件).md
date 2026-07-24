本模块提供CashierComponent组件，应用通过集成该组件完成iap嵌入式收银台功能。

CashierComponent需要配合[cashierComponentManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-cashier-component-manager)一起使用，用于实现iap嵌入式收银台功能。

**起始版本：** 6.1.0(23)

## 导入模块

TV



```
1. import { CashierComponent, cashierComponentManager } from '@kit.IAPKit';
```

## CashierComponent

TV

该类用来展示嵌入式收银台的UI组件。

**模型约束：** 此接口仅可在Stage模型下使用。

**装饰器类型：** @Component

**元服务API：** 从版本6.1.0(23)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Payment.IAP.EmbeddedCashier

**起始版本：** 6.1.0(23)

**参数：**

展开

| 名称 | 类型 | 必填 | 装饰器类型 | 说明 |
| --- | --- | --- | --- | --- |
| params | [iap.PurchaseParameter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-iap#purchaseparameter) | 是 | @Require  @Prop | CashierComponent组件参数。  **说明：**  该参数必须是@State装饰的局部变量。 |
| displayOptions | [cashierComponentManager.CashierDisplayOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-cashier-component-manager#cashierdisplayoptions) | 否 | - | CashierComponent组件的配置参数。 |
| purchaseListener | [cashierComponentManager.CashierListener](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-cashier-component-manager#cashierlistener) | 是 | - | CashierComponent用来接收组件的成功失败的回调事件。 |

### build

TV

build(): void

用于创建[CashierComponent](/consumer/cn/doc/harmonyos-references/iap-cashier-component#cashiercomponent)对象的构造函数。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从版本6.1.0(23)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Payment.IAP.EmbeddedCashier

**起始版本：** 6.1.0(23)

**示例：**



```
1. import { CashierComponent, cashierComponentManager,iap } from '@kit.IAPKit';
2. import { BusinessError} from '@kit.BasicServicesKit';

4. const displayOptions: cashierComponentManager.CashierDisplayOptions = {
5. backgroundColor: Color.Grey
6. }
7. class PurchaseListener implements cashierComponentManager.CashierListener {
8. onPurchaseSuccess: (productId: string, purchaseResult: iap.CreatePurchaseResult) => void;
9. onPurchaseFailure: (productId: string, error: BusinessError<void>) => void;

11. constructor() {
12. this.onPurchaseSuccess = () => {

14. };
15. this.onPurchaseFailure = () => {

17. }
18. }
19. }
20. const purchaseListener = new PurchaseListener();

22. @Entry
23. @Component
24. struct CashierComponentPage {
25. @State params: iap.PurchaseParameter = {
26. // productId需要替换成开发者在AppGallery Connect网站配置商品信息时设置的“商品ID”
27. productId: 'testProduct01',
28. // iap.ProductType.CONSUMABLE：消耗型商品
29. // iap.ProductType.NONCONSUMABLE：非消耗型商品
30. // iap.ProductType.AUTORENEWABLE：自动续期订阅商品
31. // iap.ProductType.NONRENEWABLE：非续期订阅商品
32. productType: iap.ProductType.CONSUMABLE,
33. developerPayload: 'test developer payload string.',
34. };

36. build() {
37. Column() {
38. CashierComponent({
39. params: this.params,
40. purchaseListener: purchaseListener,
41. displayOptions: displayOptions
42. });
43. }
44. .width(360)
45. .height(640)
46. }
47. }
```