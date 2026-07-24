本模块支持拉起营销服务，包括活动入口组件以及选券组件。

**模型约束：** 本模块接口仅可在Stage模型下使用。

**元服务API：** 从版本6.1.0(23)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Payment.Promotion

**起始版本：** 6.1.0(23)

## 导入模块

PhonePC/2in1Tablet



```
1. import { promotionService } from "@kit.PaymentKit";
```

## UserAction

PhonePC/2in1Tablet

用户行为，包括关闭组件、点击领取按钮以及点击去使用按钮。

**模型约束：** 本模块接口仅可在Stage模型下使用。

**元服务API：** 从版本6.1.0(23)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Payment.Promotion

**起始版本：** 6.1.0(23)

展开

| **名称** | **类型** | 只读 | 可选 | **说明** |
| --- | --- | --- | --- | --- |
| doNothing | boolean | 否 | 否 | 表示是否关闭组件。  - true:是  - false：否（默认）。 |
| useButtonClicked | boolean | 否 | 否 | 表示是否点击“去使用”按钮。  - true:是  - false：否（默认）。 |
| receiveButtonClicked | boolean | 否 | 否 | 表示是否点击“领取”按钮。  - true:是  - false：否（默认）。 |

## OrderContext

PhonePC/2in1Tablet

订单上下文信息，用于拉起选券组件。

**模型约束：** 本模块接口仅可在Stage模型下使用。

**元服务API：** 从版本6.1.0(23)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Payment.Promotion

**起始版本：** 6.1.0(23)

展开

| **名称** | **类型** | 只读 | 可选 | **说明** |
| --- | --- | --- | --- | --- |
| mercNo | string | 否 | 否 | 商户号。 |
| tradeOrderAmount | number | 否 | 否 | 订单交易金额，单位为分。取值必须大于0，传递非取值范围内的值会导致请求异常。 |
| goodsCodes | string[] | 否 | 是 | 商品编码列表。 |
| authId | string | 否 | 否 | 商户证书ID。 |
| sign | string | 否 | 否 | 签名，使用除了sign字段以外的其他字段计算签名值。可参考[签名规则](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-rest-overview#签名规则)。 |

## CouponCategory

PhonePC/2in1Tablet

优惠券品类枚举类型。

**模型约束：** 本模块接口仅可在Stage模型下使用。

**元服务API：** 从版本6.1.0(23)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Payment.Promotion

**起始版本：** 6.1.0(23)

展开

| **名称** | **值** | **说明** |
| --- | --- | --- |
| PLATFORM\_COUPON | 0 | 平台券。 |

## CouponType

PhonePC/2in1Tablet

优惠券类型枚举。

**模型约束：** 本模块接口仅可在Stage模型下使用。

**元服务API：** 从版本6.1.0(23)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Payment.Promotion

**起始版本：** 6.1.0(23)

展开

| **名称** | **值** | **说明** |
| --- | --- | --- |
| VOUCHER | 0 | 满减券类型。 |

## CouponDetail

PhonePC/2in1Tablet

券详情信息。

**模型约束：** 本模块接口仅可在Stage模型下使用。

**元服务API：** 从版本6.1.0(23)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Payment.Promotion

**起始版本：** 6.1.0(23)

展开

| **名称** | **类型** | 只读 | 可选 | **说明** |
| --- | --- | --- | --- | --- |
| couponCategory | [CouponCategory](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-promotionservice#couponcategory) | 否 | 否 | 优惠券品类枚举类型。 |
| couponCode | string | 否 | 否 | 券码。 |
| batchNo | string | 否 | 否 | 批次号。 |
| couponType | [CouponType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-promotionservice#coupontype) | 否 | 否 | 券类型。 |
| effectiveTime | number | 否 | 否 | 优惠券生效时间。 |
| expireTime | number | 否 | 否 | 优惠券过期时间。 |
| amount | number | 否 | 是 | 优惠券面额，单位为分。 |
| logoUrl | string | 否 | 否 | 优惠券图标地址。 |
| couponDesc | string | 否 | 否 | 优惠券描述信息。最大长度3096。 |

## PromotionComponentController

PhonePC/2in1Tablet

该类为营销组件控制器。

**模型约束：** 本模块接口仅可在Stage模型下使用。

**元服务API：** 从版本6.1.0(23)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Payment.Promotion

**起始版本：** 6.1.0(23)

### constructor

PhonePC/2in1Tablet

constructor(context: UIContext)

该方法实例化营销组件控制器对象，通过该接口可以拉起活动入口组件。

**模型约束：** 本模块接口仅可在Stage模型下使用。

**元服务API：** 从版本6.1.0(23)开始，该实例方法支持在元服务中使用。

**系统能力：** SystemCapability.Payment.Promotion

**起始版本：** 6.1.0(23)

**参数**：

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| context | [UIContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-uicontext) | 是 | UI上下文对象。 |

**错误码：**

以下错误码的详细介绍请参见[ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-error-code)。

展开

| 错误码 | 错误信息 |
| --- | --- |
| 801 | Capability not supported. |
| 1019200001 | System internal error. |
| 1019200002 | Network connection error. |

**示例**：



```
1. import { promotionService } from '@kit.PaymentKit';

3. @Component
4. struct StartPromotionEntryDialogDemo {
5. controller: promotionService.PromotionComponentController = new promotionService.PromotionComponentController(this.getUIContext());

7. build() {}
8. }
```

### startPromotionEntryDialog

PhonePC/2in1Tablet

startPromotionEntryDialog(mercNo: string, offset?: number): Promise<UserAction>

拉起活动入口组件，使用Promise异步回调。

**模型约束：** 本模块接口仅可在Stage模型下使用。

**元服务API：** 从版本6.1.0(23)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Payment.Promotion

**起始版本：** 6.1.0(23)

**参数**：

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| mercNo | string | 是 | 商户号。 |
| offset | number | 否 | 活动入口组件底部到屏幕边框底部的距离差，默认为100px。 |

**返回值**：

展开

| 类型 | **说明** |
| --- | --- |
| Promise<[UserAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-promotionservice#useraction)> | Promise对象，返回用户行为信息。 |

**错误码：**

以下错误码的详细介绍请参见[ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-error-code)。

展开

| 错误码 | 错误信息 |
| --- | --- |
| 801 | Capability not supported. |
| 1019200001 | System internal error. |
| 1019200002 | Network connection error. |

**示例**：



```
1. import { promotionService } from "@kit.PaymentKit";

3. @Component
4. struct StartPromotionEntryDialogDemo {
5. controller: promotionService.PromotionComponentController = new promotionService.PromotionComponentController(this.getUIContext());

7. build() {
8. Column() {
9. Button('拉起活动入口组件')
10. .type(ButtonType.Capsule)
11. .width('50%')
12. .margin(20)
13. .onClick(async () => {
14. try {
15. // 拉起活动入口组件
16. let userAction = await this.controller.startPromotionEntryDialog('', 10);
17. // 点击关闭、去使用后会分别返回doNothing、useButtonClicked为true
18. console.info(`userAction ${JSON.stringify(userAction)}`);
19. } catch (e) {
20. console.error(`startUserSelectCouponsPopup error ${JSON.stringify(e)}`);
21. }
22. })
23. }
24. }
25. }
```

## startUserChooseCouponsPopup

PhonePC/2in1Tablet

startUserChooseCouponsPopup(context: common.Context, orderContext: OrderContext): Promise<CouponDetail[]>

选券组件拉起方法，调用后使用Promise异步回调。

**模型约束：** 本模块接口仅可在Stage模型下使用。

**元服务API：** 从版本6.1.0(23)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Payment.Promotion

**起始版本：** 6.1.0(23)

**参数**：

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| context | [common.Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context) | 是 | 上下文。 |
| orderContext | [OrderContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-promotionservice#ordercontext) | 是 | 用户订单上下文。 |

**返回值**：

展开

| 类型 | **说明** |
| --- | --- |
| Promise<[CouponDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-promotionservice#coupondetail)[]> | Promise对象，返回券详情信息。 |

**错误码**：

以下错误码的详细介绍请参见[ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-error-code)。

展开

| 错误码 | 错误信息 |
| --- | --- |
| 801 | Capability not supported. |
| 1019200001 | System internal error. |
| 1019200002 | Network connection error. |
| 1019200003 | Trade amount is invalid. |

**示例**：



```
1. import { promotionService } from "@kit.PaymentKit";

3. @Entry
4. @Component
5. export struct StartUserChooseCouponsPopupDemo {
6. build() {
7. Column() {
8. Button('选券页面')
9. .type(ButtonType.Capsule)
10. .width('50%')
11. .margin(20)
12. .onClick(() => {
13. let req: promotionService.OrderContext = {
14. // 商户号
15. mercNo: '',
16. // 订单金额，单位为分
17. tradeOrderAmount: 15,
18. // 商品编码
19. goodsCodes: ['', ''],
20. // 商户证书ID
21. authId: '',
22. // 签名内容调云侧接口获取
23. sign: 'MEQCIEIWzdpziRyTi8vhwWHFuDdxf********************CHljer0YAMabeCgTDG77e+2XJItvq/ZkIcCN5/B20pQ=='
24. }
25. console.info(`req ${JSON.stringify(req)}`);
26. promotionService.startUserChooseCouponsPopup(this.getUIContext().getHostContext()!, req).then(res => {
27. console.info(`startUserChooseCouponsPopup res ${JSON.stringify(res)}.`);
28. })
29. })
30. }
31. }
32. }
```

## startPromotionDetailPopup

PhonePC/2in1Tablet

startPromotionDetailPopup(context: common.Context, mercNo: string): Promise<UserAction>

拉起营销详情，使用Promise异步回调。

**模型约束：** 本模块接口仅可在Stage模型下使用。

**元服务API：** 从版本6.1.0(23)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Payment.Promotion

**起始版本：** 6.1.0(23)

**参数**：

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| context | [common.Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context) | 是 | 上下文。 |
| mercNo | string | 是 | 商户号。 |

**返回值**：

展开

| 类型 | **说明** |
| --- | --- |
| Promise<[UserAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-promotionservice#useraction)> | Promise对象，返回用户行为信息。 |

**错误码：**

以下错误码的详细介绍请参见[ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-error-code)。

展开

| 错误码 | 错误信息 |
| --- | --- |
| 801 | Capability not supported. |
| 1019200001 | System internal error. |
| 1019200002 | Network connection error. |

**示例**：



```
1. import { promotionService } from "@kit.PaymentKit";

3. @Entry
4. @Component
5. export struct StartPromotionDetailPopupDemo {
6. build() {
7. Column() {
8. Button('拉起营销详情')
9. .type(ButtonType.Capsule)
10. .width('50%')
11. .margin(20)
12. .onClick(() => {
13. console.info(`click enter`);
14. promotionService.startPromotionDetailPopup(this.getUIContext().getHostContext()!, 'mercNo123')
15. .then((val) => {
16. console.info(`receive resulr is ${JSON.stringify(val)}`);
17. }).catch((e: BusinessError) => {
18. console.info(`sendMessageRequest failed, message: ${JSON.stringify(e)}`)
19. }
20. )
21. })
22. }
23. }
24. }
```

## getOrderAvailableCoupons

PhonePC/2in1Tablet

getOrderAvailableCoupons(context: common.Context, orderContext: OrderContext): Promise<CouponDetail[]>

查询当前订单可用券。使用Promise异步回调。

**模型约束：** 本模块接口仅可在Stage模型下使用。

**元服务API：** 从版本6.1.1(24)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Payment.Promotion

**起始版本：** 6.1.1(24)

**参数**：

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| context | [common.Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context) | 是 | 上下文。 |
| orderContext | [OrderContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-promotionservice#ordercontext) | 是 | 用户订单上下文。 |

**返回值**：

展开

| 类型 | **说明** |
| --- | --- |
| Promise<[CouponDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-promotionservice#coupondetail)[]> | Promise对象，返回券详情信息。 |

**错误码**：

以下错误码的详细介绍请参见[ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-error-code)。

展开

| 错误码 | 错误信息 |
| --- | --- |
| 801 | Capability not supported. |
| 1019200001 | System internal error. |
| 1019200002 | Network connection error. |
| 1019200003 | Trade amount is invalid. |
| 1019200005 | AuthId is invalid. |
| 1019200006 | Sign is invalid. |
| 1019200007 | OrderContext is invalid. |
| 1019200008 | The HUAWEI ID is not signed in. |
| 1019200009 | The user did not accept the agreement. |
| 1019200010 | Merchant no is invalid. |

**示例**：



```
1. import { promotionService } from "@kit.PaymentKit";

3. @Component
4. export struct GetOrderAvailableCouponsDemo {
5. build() {
6. Column() {
7. Button('查询可用券')
8. .type(ButtonType.Capsule)
9. .width('50%')
10. .margin(20)
11. .onClick(() => {
12. let req: promotionService.OrderContext = {
13. // 商户号
14. mercNo: '',
15. // 订单金额，单位为分
16. tradeOrderAmount: 15,
17. // 商品编码
18. goodsCodes: ['', ''],
19. // 商户证书ID
20. authId: '',
21. // 签名内容调云侧接口获取
22. sign: 'MEQCIEIWzdpziRyTi8vhwWHFuDdxf********************CHljer0YAMabeCgTDG77e+2XJItvq/ZkIcCN5/B20pQ=='
23. }
24. console.info(`req ${JSON.stringify(req)}`);
25. promotionService.getOrderAvailableCoupons(this.getUIContext().getHostContext()!, req).then(res => {
26. console.error(`getOrderAvailableCoupons res ${JSON.stringify(res)}.`);
27. }).catch((e: BusinessError) => {
28. console.error(`getOrderAvailableCoupons error ${JSON.stringify(e)}`);
29. })
30. })
31. }
32. }
33. }
```