**问题现象**

调用接口报错1001500001 应用指纹证书校验失败。

**可能原因**

1. client\_id配置错误（例如：错配成项目的Client ID）。
2. 应用的指纹证书未配置或配置错误。
3. 更换证书后未重新配置证书指纹。
4. 指纹证书添加完成公钥指纹未生效。
5. 安装调试证书签名包后再安装相同版本的发布证书签名包，或安装发布证书签名包后再安装相同版本的调试证书签名包。
6. 使用自动签名方式签名，未使用手动签名。

**解决措施**

1. 检查module type为entry的模块下的module.json5配置文件中的Client ID是否正确，请参考[配置Client ID](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/account-client-id)。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5a/v3/sarO3mfeSF2zWtUGRJvdQw/zh-cn_image_0000002497063312.png?HW-CC-KV=V1&HW-CC-Date=20260414T024824Z&HW-CC-Expire=86400&HW-CC-Sign=3CF41A0A6729CD1F6F273B331E2775A18E9CC105BF110662EB2CF54AFEF0EDB6)
2. 检查AppGallery Connect上是否正确配置应用的指纹证书，详情请见[添加公钥指纹](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/application-dev-overview#section1726913517284)。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/58/v3/M9KrKJKdT2-q9FCnRjHoSg/zh-cn_image_0000002528823295.png?HW-CC-KV=V1&HW-CC-Date=20260414T024824Z&HW-CC-Expire=86400&HW-CC-Sign=FC31FA155E821F0013D57274B6DEFC973CD0B4DFF4CA0C56D2AF3819CE52F2F5 "点击放大")
3. 证书更换后，重新配置更换后的证书指纹。
4. 配置公钥指纹10分钟后，您可通过修改应用工程 > app.json5中的versionCode触发公钥指纹生效。具体修改方法见下图所示。
5. 调试证书切换为发布证书或发布证书切换为调试证书，需要升级应用的版本号（修改应用工程 > app.json5中的versionCode），具体修改方法见下图所示。

   **图1** 修改前  
   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a7/v3/dNYa-L5VSxmBLbqktCPRmg/zh-cn_image_0000002528943265.png?HW-CC-KV=V1&HW-CC-Date=20260414T024824Z&HW-CC-Expire=86400&HW-CC-Sign=09521F54C432D0D1AC30B2315625C8D65AB917F657CB855325147C9046001B5B)

   **图2** 修改后  
   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/73/v3/WfsYCn7aT6uE9-xdWPYvPQ/zh-cn_image_0000002528823291.png?HW-CC-KV=V1&HW-CC-Date=20260414T024824Z&HW-CC-Expire=86400&HW-CC-Sign=21B0BDDAE4EA1C1236A8B54717115F8B743D5218200AA81F57CB5A0F4B52ECE5)
6. 请使用手动签名方式进行签名，详情请参考[配置签名和指纹](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/account-sign-fingerprints)章节。