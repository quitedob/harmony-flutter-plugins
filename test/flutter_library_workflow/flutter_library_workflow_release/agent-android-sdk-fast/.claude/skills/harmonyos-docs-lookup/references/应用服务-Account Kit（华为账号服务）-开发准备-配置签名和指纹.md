请参考“[应用开发准备](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/application-dev-overview)”章节，完成以下操作步骤：

1. 创建项目和工程（如已完成，请跳过此步骤）
2. 配置签名信息**（未成年人模式接口支持自动签名，其他接口仅支持手动签名方式）**
3. 添加公钥指纹

   注意

   **发布阶段**，请参考[发布流程](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-publish-app#section6406135115814)章节，重新配置用于应用发布的签名信息、添加公钥指纹（必选）。

* 检查是否需要配置公钥指纹：应用仅接入未成年人模式或compatibleSdkVersion>=20不需要配置公钥指纹，其他场景均需配置。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c5/v3/2VcraGcmTLes9hVNDDC54w/zh-cn_image_0000002528943261.png?HW-CC-KV=V1&HW-CC-Date=20260414T024625Z&HW-CC-Expire=86400&HW-CC-Sign=239FDE999E1B9EB985789EB09881C3D95469AFC10977E5942F509287FADC3B77)
* 检查公钥指纹是否配置成功：请在[开发与服务](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html#/myProject)中选择对应的项目和应用，检查是否已成功配置该应用的公钥指纹。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/cc/v3/Yi04GEL7RfKaC40k0A3mSA/zh-cn_image_0000002528943263.png?HW-CC-KV=V1&HW-CC-Date=20260414T024625Z&HW-CC-Expire=86400&HW-CC-Sign=9F0CA7B9833D7BC98C84A4DAAE93820A6887B005054E0A34A893797E194B4E0D "点击放大")
* 公钥指纹最迟会在25小时后生效。

  **（可选）**配置公钥指纹10分钟后，您可通过修改应用工程中app.json5配置文件的versionCode触发公钥指纹生效。

  **图1** 修改前  
  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c3/v3/c5NyoWg6QPOp4AcMCuEmyw/zh-cn_image_0000002528823285.png?HW-CC-KV=V1&HW-CC-Date=20260414T024625Z&HW-CC-Expire=86400&HW-CC-Sign=4679BDC029A7C07AB957FEC97CB45C41CE8BFDCA09023C56E64CA095CC3E1565)

  **图2** 修改后  
  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6b/v3/kb8qZi3eSlmO2bc0fE7JQA/zh-cn_image_0000002497223294.png?HW-CC-KV=V1&HW-CC-Date=20260414T024625Z&HW-CC-Expire=86400&HW-CC-Sign=536B368E297CAF421798EE22933E90CE6B6EDEF6AE84C3E831D8649EE6A6A19F)