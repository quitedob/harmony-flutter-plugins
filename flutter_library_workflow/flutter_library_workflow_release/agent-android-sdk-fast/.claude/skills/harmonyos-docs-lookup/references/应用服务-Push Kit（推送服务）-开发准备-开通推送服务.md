在开通推送服务前，请先参考“[应用开发准备](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/application-dev-overview)”创建项目和应用工程。

说明

从HarmonyOS NEXT Developer Beta2起，开发者无需配置公钥指纹和Client ID。

## 操作步骤

1. 登录[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)网站，选择“开发与服务”。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9f/v3/z9XA7ImLS4ag7SBG8WqLCg/zh-cn_image_0000002402225637.png?HW-CC-KV=V1&HW-CC-Date=20260414T032312Z&HW-CC-Expire=86400&HW-CC-Sign=F993151379EE54257F4E4519E00887E8A96CF62870877C66E245FC0DFF3D2F91 "点击放大")
2. 在项目列表中找到您的项目，在项目下的应用列表中选择需要配置推送服务参数的应用。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/0c/v3/09a6PNEVRP6KKVwv8cKeJg/zh-cn_image_0000002402225653.png?HW-CC-KV=V1&HW-CC-Date=20260414T032312Z&HW-CC-Expire=86400&HW-CC-Sign=BB291C7706B4B4508293E48753BA5CD02C264B7BA4B14E1CE472EFCD78429A4A "点击放大")
3. 在左侧导航栏选择“增长 > 推送服务”，点击“立即开通”，在弹出的提示框中点击“确定”。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/37/v3/e5WApzYTRfiTqU6IxcD8tw/zh-cn_image_0000002402305785.png?HW-CC-KV=V1&HW-CC-Date=20260414T032312Z&HW-CC-Expire=86400&HW-CC-Sign=2937BD6D2CB02A4ACBA4648096753AE1FE34229528F60E7475B9A8CC1B94C8FB "点击放大")

   说明

   推送服务权益为项目级，若您已有开通过推送服务的项目，当您在项目中添加新的应用时，无需再次开通推送服务。
4. 若项目当前未配置数据处理位置，请在提示中点击“确定”，会弹出设置数据处理位置的弹窗。完成数据处理位置的设置，点击“确定”。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d2/v3/irlkcS7ORJiHP29IR4ziOw/zh-cn_image_0000002368705948.png?HW-CC-KV=V1&HW-CC-Date=20260414T032312Z&HW-CC-Expire=86400&HW-CC-Sign=CEEB207D80959589DC2624CB2B98436562265E45E41EF4DA897E7E421249D5E6 "点击放大")

   注意

   推送服务当前Wearable设备支持的国家请参见[支持的国家/地区](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/push-country)，数据处理地可根据支持的国家/地区设定；其他设备仅支持中国境内（香港特别行政区、澳门特别行政区、中国台湾除外），数据处理地固定为中国。
5. 针对开发调试场景，从DevEco Studio 6.0.0 Beta5版本开始，新增了更高效的自动签名方案，开发者可以选择以下其中一种方式进行调试阶段的应用签名。
   * 手动签名：调试阶段**必须**申请调试证书、[注册调试设备](https://developer.huawei.com/consumer/cn/doc/app/agc-help-add-device-0000002283189937)、确保“增长 > 推送服务”中已开通“推送服务”后**重新**申请调试Profile文件，并完成[手动签名](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-signing#section297715173233)。
   * 自动签名（新增）：请参考[自动签名](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-signing#section18815157237)，开通Push Kit开放能力，点击“OK”后，DevEco Studio将自动重新签名。

     ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/79/v3/ZlUg0aQYSi6Zh-qEd21pUQ/zh-cn_image_0000002474642117.png?HW-CC-KV=V1&HW-CC-Date=20260414T032312Z&HW-CC-Expire=86400&HW-CC-Sign=7073993BBA530F4823C699E2670BC884F4638B24B26780FFFF0D9ED5D105B8A7 "点击放大")

     5-10分钟后访问[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)，“项目设置 > 开放能力管理”中推送服务能力将显示已勾选。同时，“增长 > 推送服务”中“推送服务”将自动开通。

     ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/71/v3/IVu3XM80SSWwt8sk0hhLVw/zh-cn_image_0000002506532820.png?HW-CC-KV=V1&HW-CC-Date=20260414T032312Z&HW-CC-Expire=86400&HW-CC-Sign=8A951EACC1E327D9EDFE94666A5292F8CA46C790DB3FE97F015CB4CB3C52141F "点击放大")
6. 应用发布阶段**必须**申请发布证书、确保“增长 > 推送服务”中已开通“推送服务”后重新申请发布Profile文件，并完成手动签名。详情请参考发布应用[配置签名信息](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-publish-app#section280162182818)。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/84/v3/cOoDRKCiR5W0746m5o5J2w/zh-cn_image_0000002538098317.png?HW-CC-KV=V1&HW-CC-Date=20260414T032312Z&HW-CC-Expire=86400&HW-CC-Sign=C6CF9D12D63C837F26F5702C42B8DE42A2FA208DEAA56D6AA94B7B4B159E0F91 "点击放大")
7. 您还可以通过“增长 > 推送服务 > 配置”，在“配置”页签下选择需要申请自分类权益的应用，点击**自分类权益**后的“申请”，详见[申请步骤](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/push-apply-right#section16708911111611)。

   注意

   强烈建议您申请通知消息的**自分类权益**，并按对应分类发送通知消息。**否则Push Kit默认您推送的是资讯营销类消息**，会导致单个应用每日每设备推送数量为**2条**或**5条**。
8. （可选）您还可以通过“增长 > 推送服务 > 配置”，在“配置”页签开通或关闭您的项目级和应用级的[消息回执](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/push-msg-receipt)。

   说明

   * 若项目级的消息回执权益开通，应用级的消息回执权益未开通，则该应用消息回执权益取项目级的。
   * 若项目级的消息回执权益开通，应用级的消息回执权益开通，则该应用消息回执权益取应用级的。

## （可选）设置数据处理位置

您可以在“项目设置 > 数据处理位置”页面设置或更新数据处理位置，步骤如下：

注意

如果设置的数据处理位置与您的服务器位置不一致，或者设置的数据处理位置与应用所服务的用户所在地不一致，都会导致推送消息无法下发。

1. 登录[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)，选择“开发与服务”，在项目列表中选择对应的项目，左侧导航栏选择“项目设置”。
2. 在项目列表中点击您需要设置数据处理位置的项目。
3. 进入“项目设置 > 数据处理位置”页面，点击“管理”。
4. 按需设置数据处理位置。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/89/v3/73-XrJHIRiOeE1GcloddFw/zh-cn_image_0000002504924521.png?HW-CC-KV=V1&HW-CC-Date=20260414T032312Z&HW-CC-Expire=86400&HW-CC-Sign=08F079D68191C9BF6D62B02B70F6AF6753A9E51268AE405B42C8A25E9A3E853C "点击放大")
5. 设置完成后，点击“保存”。