若开发者要[通过Push Kit更新实况窗](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/liveview-update-by-push)，需要设置默认数据处理位置为“中国”。

在“项目设置 > 数据处理位置”页面设置数据处理位置，设置步骤如下：

1. 登录[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)，选择“开发与服务”。
2. 在项目列表中点击需要设置数据处理位置的项目。
3. 进入“项目设置 > 数据处理位置”页面，点击“管理”。
4. 在“是否已启用”栏勾选“中国”，并在“是否设为默认”栏将中国设置为默认数据处理位置。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b6/v3/wGHyp-IoT8-rdH8i4Sotgw/zh-cn_image_0000002488675524.png?HW-CC-KV=V1&HW-CC-Date=20260414T031307Z&HW-CC-Expire=86400&HW-CC-Sign=2688057445251337F7D64C47AB8D30C8B3712C8A9BFA88FB1486FEA54DE24DA8 "点击放大")
5. 设置完成后，点击“保存”。

说明

如果设置的数据处理位置与开发者的服务器位置不一致，或者设置的数据处理位置与应用所服务的用户所在地不一致，都会导致推送消息无法下发。