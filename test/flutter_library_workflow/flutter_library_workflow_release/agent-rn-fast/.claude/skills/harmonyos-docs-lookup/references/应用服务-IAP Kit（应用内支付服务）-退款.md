当[用户申请退款](/consumer/cn/doc/harmonyos-guides/iap-refund#section435204014114)时，对于非游戏类应用，开发者可以在[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)上审核退款订单，实现用户的退款。

说明

* 退款只能由用户发起，具体参见[用户申请退款](/consumer/cn/doc/harmonyos-guides/iap-refund#section435204014114)。
* 对于游戏类应用，[用户申请退款](/consumer/cn/doc/harmonyos-guides/iap-refund#section435204014114)后，由华为游戏运营人员审核退款，开发者可跳过此章节。

## 开发者审核退款订单

开发者使用退款管理功能，需要拥有至少一个具备退款权限的角色：账号持有者、管理员、App管理员、财务。具体可查看[添加成员账号](https://developer.huawei.com/consumer/cn/doc/app/agc-help-manageaccount-0000001099996700#section151241455193313)。

添加完账号后，开发者可按照以下步骤审核用户的退款订单：

1. 开发者登录[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)，选择“APP”。 在应用列表中点击待处理退款订单的应用。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/3a/v3/-VHWXvuhQnysv2WtpRc49g/zh-cn_image_0000002413014432.png?HW-CC-KV=V1&HW-CC-Date=20260414T031121Z&HW-CC-Expire=86400&HW-CC-Sign=5A7CF4BC44B6081E5A8B8F109A0E517AB96097E81C1C53D286A084BD549C7A72 "点击放大")
2. 在“运营”页签下，点击“产品运营 > 退款管理”，查看用户提交的退款申请，处理退款订单。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5d/v3/rzl0-otuRwmhqsMK_uHO6g/zh-cn_image_0000002446613533.png?HW-CC-KV=V1&HW-CC-Date=20260414T031121Z&HW-CC-Expire=86400&HW-CC-Sign=717293327E6DB8D78290E085F1608A43018A45CB4421F051FC2C6E299577C756 "点击放大")
3. 审核或查询退款订单。

   **同意退款**：如果开发者同意退款，可在 “退款金额“下输入可退款金额，点击“同意”。在弹窗中点击“确认”，即可完成退款。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/df/v3/3rfrVFLAQXOK4cUKK9hooA/zh-cn_image_0000002413174256.png?HW-CC-KV=V1&HW-CC-Date=20260414T031121Z&HW-CC-Expire=86400&HW-CC-Sign=8B666FB31670E724795497A1E29F652F6D547FB92E2FB417F0F5A348CC1B7E04 "点击放大")

   **驳回退款**：开发者不同意退款，可点击“驳回”，输入驳回原因，点击“确认”。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/bb/v3/8YlVOAkWQEqx1KYlEkgCyA/zh-cn_image_0000002413014416.png?HW-CC-KV=V1&HW-CC-Date=20260414T031121Z&HW-CC-Expire=86400&HW-CC-Sign=B3CF14EE84C9A3C7AC7D29E55ADD5B0A503C8510F9FC626419EBCB8B237E0E6B "点击放大")

   **退款详情页面审核退款**：开发者也可以在退款详情页面审核退款，输入退款金额后选择“同意”或“驳回”，点击提交，完成审核。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/81/v3/xTrwZCHuStygX0Iy_TQw9Q/zh-cn_image_0000002413174208.png?HW-CC-KV=V1&HW-CC-Date=20260414T031121Z&HW-CC-Expire=86400&HW-CC-Sign=66286C7B79C6FF5C163BFBB5F77804C27CAF5BE6FDFFBB8459FDDD32F83F34E4 "点击放大")

   **查询退款订单**：点击“已完成”页签，开发者可以查看所有已处理的退款订单。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/82/v3/7jxgNHeuRGGypMP00a5E6g/zh-cn_image_0000002413174304.png?HW-CC-KV=V1&HW-CC-Date=20260414T031121Z&HW-CC-Expire=86400&HW-CC-Sign=38AE7416CE87937EEB0132E900155E50D953AD3F63BF4D2BA9260E1A275FA8D6 "点击放大")

   退款订单状态如下：

   |  |  |  |
   | --- | --- | --- |
   | **序号** | **退款订单状态** | **说明** |
   | 1 | 申请已拒绝 | 开发者驳回退款订单。 |
   | 2 | 申请已通过 | 开发者同意退款订单。 |
   | 3 | 退款成功 | 开发者同意退款，且华为操作退款成功。 |
   | 4 | 退款失败 | 开发者同意退款，且华为操作退款失败。 |
   | 5 | 超期未处理 | 开发者未按规定时间处理退款订单时，退款订单由华为运营进行审核。 |

## 用户申请退款

说明

* 生态应用订单退款最低系统版本要求为6.16.10（检查版本可参考以下路径“系统设置-华为账号-付款与账单-更多设置-关于”）。
* 退款申请后到退款完成非实时，一般从发起申请退款到完成需要7个工作日左右。

若用户购买应用内数字商品后需要申请退款，可选择某笔订单后根据页面指引，提交退款信息。开发者审核完成后，用户可收到退款金额。

用户可按照以下步骤申请订单退款：

1. 在“手机设置 > 华为账号 > 付款与账单 > 购买记录”中点击待退款的订单，跳转至详情页面，点击“对订单有疑问”。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/dc/v3/k2ZE7XvzQE2krPCyDbUCog/zh-cn_image_0000002446613541.png?HW-CC-KV=V1&HW-CC-Date=20260414T031121Z&HW-CC-Expire=86400&HW-CC-Sign=6A1A45A32307511FFB602F69F5348BE6FD756C21BB51F087B73178E3272BC46C "点击放大")![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/80/v3/cHaJ82WRQBmTFCfphq6LrQ/zh-cn_image_0000002446733385.png?HW-CC-KV=V1&HW-CC-Date=20260414T031121Z&HW-CC-Expire=86400&HW-CC-Sign=5527EFE7859CEFD670CD98BE31BBCD2EB4CD17D1C8D577F3A18899401D6C4B21 "点击放大")
2. 在“对订单有疑问”页面，点击“申请退款”，选择退款原因后，提交退款申请，提交后等待应用审核。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c6/v3/MEGE8VGySha8OgDbpVY1qQ/zh-cn_image_0000002413174288.png?HW-CC-KV=V1&HW-CC-Date=20260414T031121Z&HW-CC-Expire=86400&HW-CC-Sign=0A3706CFF62349CF83C922FCEBD0E248ECA0FDBAD8D4C0DCC5491D13ABE25F31 "点击放大")![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ba/v3/AFWqPRLLQKGqtf8bTL1Jow/zh-cn_image_0000002446733369.png?HW-CC-KV=V1&HW-CC-Date=20260414T031121Z&HW-CC-Expire=86400&HW-CC-Sign=B1201A4C9DEC87001738039EA49DDAA1B9E333A89C8E349FD48DA8092C898DDB "点击放大")

   用户提交退款后，可点击“查看退款记录”，在“退款记录”查看所有退款订单的退款状态。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/59/v3/cv-Y3KIqRxuD7e-KvowL6A/zh-cn_image_0000002446613441.png?HW-CC-KV=V1&HW-CC-Date=20260414T031121Z&HW-CC-Expire=86400&HW-CC-Sign=2274FDCDD76D6588216E1B9315256FAADCC296059FF45DBB0612B400155A4433 "点击放大")![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5f/v3/5EavTVF6Qk2A_5phtt1EZw/zh-cn_image_0000002413174312.png?HW-CC-KV=V1&HW-CC-Date=20260414T031121Z&HW-CC-Expire=86400&HW-CC-Sign=3ACE201EB6A4DE19DC2101E5DE6D939CB56162BBE92A2A9E6C795EAA370F1E3C "点击放大")

## 应用内接入退款入口

说明

* 仅支持非游戏类应用接入。
* 该退款入口仅支持应用本身所产生的订单的退款。

**拉起退款**

用户发起退款后，应用客户端向IAP Kit发送[createRefundRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-iap#section3308191561314)请求拉起退款页面，请求中需携带待退款的订单号（purchaseOrderId）。

**代码示例**

收起

自动换行

深色代码主题

复制

```
1. import { iap } from '@kit.IAPKit';
2. import { common } from '@kit.AbilityKit';
3. import { BusinessError } from '@kit.BasicServicesKit';

5. @Entry
6. @Component
7. struct Index {

9. /**
10. * 拉起退款界面
11. */
12. createRefundRequest(context: common.UIAbilityContext) {
13. // 调用iap.createRefundRequest拉起退款，传入context和purchaseOrderId
14. let purchaseOrderId = '';
15. iap.createRefundRequest(context, purchaseOrderId).then(() => {
16. // 退款成功
17. console.info('Succeeded in create refund request.');
18. // ...
19. }).catch((err: BusinessError) => {
20. // 退款失败
21. console.error(`Failed to create refund request. Code is ${err.code}, message is ${err.message}`);
22. // ...
23. });
24. }

26. build() {}
27. }
```