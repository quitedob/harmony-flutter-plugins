在开通Device Security服务前，请先参考“[应用开发准备](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/application-dev-overview)”完成基本准备工作，再继续进行以下开发活动。

说明

Device Security包括应用设备状态检测、安全检测、可信应用服务、业务风险检测能力、数字盾服务，开发者请根据实际使用场景，选择开启某个或者多个能力开关。

1. 登录[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)网站，选择“开发与服务”。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/40/v3/NIWBCyTcT0aAAnuAzT968A/zh-cn_image_0000002515108437.png?HW-CC-KV=V1&HW-CC-Date=20260414T043109Z&HW-CC-Expire=86400&HW-CC-Sign=901486E001CB329164F4027D28B9CFF7F5814502247EA71FE101FF873D4D2E76 "点击放大")
2. 在项目列表中找到需要开通Device Security服务的项目。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c0/v3/oRwKCi6FQnmXdisv31z-ew/zh-cn_image_0000002514988437.png?HW-CC-KV=V1&HW-CC-Date=20260414T043109Z&HW-CC-Expire=86400&HW-CC-Sign=247BBF3C3A2D422A97A2BF1C0157E17835A3338518A4369198F8EC29671C0FCE "点击放大")
3. 选择“开放能力管理”Tab页，找到需要使用的功能，点击左侧的按钮，开通相应的功能。
   * **应用设备状态检测**：勾选“应用设备状态检测”并点击“保存”，接入“应用设备状态检测”。

     ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/13/v3/dkeD7dnMRTq0Js3E1mqcJA/zh-cn_image_0000002482788476.png?HW-CC-KV=V1&HW-CC-Date=20260414T043109Z&HW-CC-Expire=86400&HW-CC-Sign=3E90390F145E98FA05C93A8C5856E28EC270456BD0872865A74E6B3CA24B3E04 "点击放大")
   * **安全检测**：勾选“安全检测服务”并点击“保存”，接入“安全检测服务”。

     ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/11/v3/_fKFbmTfQHGG-n0KnwNUbQ/zh-cn_image_0000002514988433.png?HW-CC-KV=V1&HW-CC-Date=20260414T043109Z&HW-CC-Expire=86400&HW-CC-Sign=814DBA29DC18BD1BEE660170364B070342B52BB164D512392E45B88F3924C93C "点击放大")
   * **可信应用服务**：勾选“可信应用服务”并点击“保存”，接入“可信应用服务”。

     说明

     开通“可信应用服务”需要先申请进入允许清单，请将Developer ID、公司名称、应用名称、申请使用的服务和使用该服务的场景，发送到agconnect@huawei.com。AGC运营将审核相关材料，通过后将为您配置受限开放服务使用的名单，审核周期为1-3个工作日，请耐心等待。

     ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ec/v3/67bTMzNrRhC5Gv9tQM2Cnw/zh-cn_image_0000002482908442.png?HW-CC-KV=V1&HW-CC-Date=20260414T043109Z&HW-CC-Expire=86400&HW-CC-Sign=1928CAEC936855E1A31B0020EE8BE348FB48E2857DF9A5631DA335ABE52A9C3B "点击放大")
   * **业务风险检测****-涉诈剧本检测**：点击“涉诈剧本检测”右侧申请按钮，接入“涉诈剧本检测”，审核通过后勾选对应服务并点击“保存”该服务配置。

     ① 在申请“涉诈剧本检测”前，需要在[华为开发者联盟](https://developer.huawei.com/consumer/cn/)网站上注册成为开发者，并完成[企业开发者实名认证](https://developer.huawei.com/consumer/cn/doc/start/edrna-0000001062678489)。

     ② 点击“涉诈剧本检测”右侧申请按钮，接入“涉诈剧本检测”。

     ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/55/v3/_1o4odq2Rq6IYGdq4XQUNA/zh-cn_image_0000002531057860.png?HW-CC-KV=V1&HW-CC-Date=20260414T043109Z&HW-CC-Expire=86400&HW-CC-Sign=59995CA2DA42360A3E55C24B886AA69236BC0B1528E8141A09A14FDDE8B7BF86 "点击放大")

     ③ 参考“申请原因”中的模板，提供申请必需的相关信息，包含Developer ID、公司名称、应用名称、使用场景、使用该服务的合法基础（应用使用该服务时需在其隐私声明中进行个人数据声明及用途说明，详细参考[个人数据处理说明](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/devicesecurity-personal-data)，并将合法基础的相关证明上传至申请附件），然后点击“提交”按钮。

     ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a5/v3/PUSN2-ErTgGsPaWyvnbbnA/zh-cn_image_0000002530676194.png?HW-CC-KV=V1&HW-CC-Date=20260414T043109Z&HW-CC-Expire=86400&HW-CC-Sign=BCA46E76696A78352E3F61998C2C7A4EDAFED9ABC3BD6B44F64E5A174C8CD6C0 "点击放大")

     说明

     提交申请后，AGC运营将审核相关材料，通过后则可保存对应的服务配置，审核周期为1-3个工作日，请耐心等待。
   * **数字盾服务**：点击“数字盾服务”右侧申请按钮，接入“数字盾服务”，审核通过后勾选对应服务并点击“保存”该服务配置。

     ① 在申请“数字盾服务”前，需要在[华为开发者联盟](https://developer.huawei.com/consumer/cn/)网站上注册成为开发者，并完成[企业开发者实名认证](https://developer.huawei.com/consumer/cn/doc/start/edrna-0000001062678489)。

     ② 点击“数字盾服务”右侧申请按钮，接入“数字盾服务”，审核通过后勾选对应服务并点击“保存”该服务配置。

     ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/54/v3/exm1-RaWS8eJMz6yZbJHoQ/zh-cn_image_0000002515108439.png?HW-CC-KV=V1&HW-CC-Date=20260414T043109Z&HW-CC-Expire=86400&HW-CC-Sign=82FF96BB34A917E1AB8E0B801D08AEAFB5E4E0C02B69EC1AE3EB44D91E07F780 "点击放大")

     说明

     请您在申请框填写“数字盾服务”申请原因和应用场景。AGC运营将审核相关材料，通过后则可保存对应的服务配置，审核周期为1-3个工作日，请耐心等待。
4. 申请Profile（.p7b）文件，具体操作请参见[申请调试Profile](https://developer.huawei.com/consumer/cn/doc/app/agc-help-debug-profile-0000002248181278)。

   说明

   在开通服务后，需要重新申请Profile（.p7b）文件。