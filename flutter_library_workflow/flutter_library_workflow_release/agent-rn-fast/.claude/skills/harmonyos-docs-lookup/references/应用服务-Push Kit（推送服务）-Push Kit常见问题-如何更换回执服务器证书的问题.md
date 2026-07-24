* 场景1：新旧证书均为商用CA签发证书或自签证书但CA未改变。

  您只需更换回执服务器上的证书，不需要登录[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)网站做其他修改。
* 场景2：新证书为商用CA签发证书，旧证书为自签证书。

  您需要更换回执服务器上的证书，并登录[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)网站同步修改回执配置。此操作过程中回执服务不会中断。

  修改回执配置操作：

  1. 登录[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)网站，点击“开发与服务”，在项目列表中找到您的项目，通过“增长 > 推送服务 > 配置”导航到“配置”页签。
  2. 选择需要修改回执的应用，点击“修改”应用回执状态。
  3. 在“选择回执”页面，选择需要更换证书的回执，点击“修改”。

     ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9c/v3/Mb-gklEKQUeJjM84my7d2w/zh-cn_image_0000002441880898.png?HW-CC-KV=V1&HW-CC-Date=20260414T032805Z&HW-CC-Expire=86400&HW-CC-Sign=2B84B88417B754BDE15D1DF0DE0A3DFC60E6517AF4FE3CA5859A2959172575ED)
  4. 在“回执配置”页面，回执服务会检测最新的证书信息，您无需做任何修改。
  5. 点击“提交”，保存回执信息。
  6. 点击“确定”，返回“配置”页面。
* 场景3：新旧证书均为自签证书且CA有变化。

  为确保新旧证书替换过程中回执服务不中断，在更换回执服务器上的证书前，您需要先登录[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)网站，将新证书设置为“备用证书”。

  在30天内现有证书和备用证书均被回执服务信任，30天后若回执服务器已完成证书更换，回执服务将使用备用证书替换现有证书。

  设置备用证书操作：

  1. 参考场景2的a~c进入“回执配置”页面。
  2. 在“回执配置”页面，点击“设置备用证书”，填入新证书信息。

     ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e4/v3/Qqc3hg7qQp2pnodAFj0vqg/zh-cn_image_0000002441721038.png?HW-CC-KV=V1&HW-CC-Date=20260414T032805Z&HW-CC-Expire=86400&HW-CC-Sign=E41904421706801313FFDDB6FDFAA6BA83BD63B47DF08DD465CFB98BAAAA578B "点击放大")
  3. 点击“提交”，保存回执信息。
  4. 点击“确定”，返回“配置”页面。

说明

如何获取回执服务器证书的CA信息？

* 若证书已安装到回执服务器且回执服务器可访问，您可以新建一个回执配置，输入回调地址后会显示当前证书的CA信息。
* 若证书未安装到回执服务器，您可以从证书中获取CA信息。

回执服务会保留证书的CA信息，通过校验证书的CA信息来确保回执消息正确发送到您配置的回执地址。