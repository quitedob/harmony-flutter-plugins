请优先[开通地图服务](/consumer/cn/doc/harmonyos-guides/map-config-agc#section16133115441516)后，再参考“[应用开发准备](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/application-dev-overview)”完成基本准备工作，然后再继续进行以下开发活动。

说明

* 从HarmonyOS 5.0.2(14)版本开始，开发者无需配置公钥指纹和Client ID。
* 从DevEco Studio 6.0.0 Beta5版本开始，支持在DevEco Studio中开通地图服务。

## 开通地图服务

Map Kit提供2种方式开通地图服务：

* 通过DevEco Studio开通地图服务。
* 通过AppGallery Connect网站开通地图服务。

方式一：通过DevEco Studio开通地图服务

1. 登录DevEco Studio应用。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/11/v3/kkqD69txRimLz78wEcnUWw/zh-cn_image_0000002485160148.png?HW-CC-KV=V1&HW-CC-Date=20260414T031504Z&HW-CC-Expire=86400&HW-CC-Sign=4EC58B5B1AC07BBAD9B16799BADC75DD2F36D8703455E4426CD2588AE6A09E84)
2. 选择文件，点击项目结构。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f6/v3/0Yy380t9Sv63-KINjxRm7A/zh-cn_image_0000002517200113.png?HW-CC-KV=V1&HW-CC-Date=20260414T031504Z&HW-CC-Expire=86400&HW-CC-Sign=78877133F08AA19B0CD36CB8A63FB81F713C198263A3A8CF56CFE57E74344496)
3. 进入“Signing Configs”页面，点击“Enable open capabilities”。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6f/v3/fdZaikrUSlWjNv3iutOKqQ/zh-cn_image_0000002485160156.png?HW-CC-KV=V1&HW-CC-Date=20260414T031504Z&HW-CC-Expire=86400&HW-CC-Sign=F4810F603ACF1593EECE3B922AC8581915CD53E9E082ACFB22506BEE47119E8D "点击放大")
4. 勾选“Map Kit”选项，点击“OK”。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b8/v3/p1NbLgsFTgKfdlXFUPRU4g/zh-cn_image_0000002517280091.png?HW-CC-KV=V1&HW-CC-Date=20260414T031504Z&HW-CC-Expire=86400&HW-CC-Sign=FA6971B3CF586AFB813380608DCBFADDA4280FC70C5C512A15BF9606BAF0BCC0 "点击放大")
5. 选择“Apply”应用地图服务配置，点击“OK”完成地图服务配置。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/88/v3/xn4vAd0PQU6pFuP5B4LpRw/zh-cn_image_0000002485000182.png?HW-CC-KV=V1&HW-CC-Date=20260414T031504Z&HW-CC-Expire=86400&HW-CC-Sign=DA69239680FDCEEB75842ED9D5D70F289073E53381EFA025F3AD2EEDBDE3ACEC "点击放大")

方式二：通过AppGallery Connect网站开通地图服务。

1. 登录[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)网站，选择“开发与服务”。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/85/v3/7kHbx48lSxWIOZx7i1yPzA/zh-cn_image_0000002485160146.png?HW-CC-KV=V1&HW-CC-Date=20260414T031504Z&HW-CC-Expire=86400&HW-CC-Sign=BFA0E86E53A3D54A1E165DF8C0ADD52A7D980162ECD04A919F8548CE048AF90F "点击放大")
2. 在项目列表中找到您的项目，在项目下的应用列表中选择需要打开“地图服务”的应用。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/56/v3/lR5DPNhXSnefU8t6cFo1DQ/zh-cn_image_0000002485000196.png?HW-CC-KV=V1&HW-CC-Date=20260414T031504Z&HW-CC-Expire=86400&HW-CC-Sign=BADFD547140929B8BB7F6E638D8DCC64C6EF73E880D33E1F6DFAAC29E2F1CB3C "点击放大")
3. 选择开放能力管理，找到“地图服务”开关，打开开关。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6a/v3/55XdoVE2STufIWOJGNITJg/zh-cn_image_0000002517280093.png?HW-CC-KV=V1&HW-CC-Date=20260414T031504Z&HW-CC-Expire=86400&HW-CC-Sign=D2B59623CEF0CE3A704C9963C7835415E0CC5DD88DEE3072A1AB235A03B55FFF "点击放大")
4. 确认已经开启“地图服务”开放能力，并完成签名。
   * 调试阶段必须[申请调试证书](https://developer.huawei.com/consumer/cn/doc/app/agc-help-add-debugcert-0000001914263178)、[注册设备](https://developer.huawei.com/consumer/cn/doc/app/agc-help-add-device-0000002283189937)、开启"地图服务"后重新[申请调试Profile文件](https://developer.huawei.com/consumer/cn/doc/app/agc-help-debug-profile-0000002248181278)，并完成[手动签名](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-signing#section297715173233)。
   * 发布阶段必须[申请发布证书](https://developer.huawei.com/consumer/cn/doc/app/agc-help-release-cert-0000002283336729)、开启“地图服务”后重新[申请发布Profile](https://developer.huawei.com/consumer/cn/doc/app/agc-help-release-profile-0000002248341090)文件，并[配置签名信息](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-publish-app#section280162182818)。

     说明

     若使用原有的Profile文件，请确保在申请Profile文件之前已开启“地图服务”。