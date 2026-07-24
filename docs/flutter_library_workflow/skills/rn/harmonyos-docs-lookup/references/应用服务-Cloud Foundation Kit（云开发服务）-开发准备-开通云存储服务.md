首次使用云存储服务前，需要先开通此服务。如果已经开通，可跳过本步骤。

1. 登录[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)，点击“开发与服务”。
2. 在项目列表中点击需要开通云存储的项目。
3. 选择“云开发（Serverless） > 云存储”，进入云存储页面，点击“立即开通”。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/52/v3/TEXEL21GTuOoESsQW0twXg/zh-cn_image_0000002522688257.png?HW-CC-KV=V1&HW-CC-Date=20260414T025653Z&HW-CC-Expire=86400&HW-CC-Sign=2290605F684C410D2312DF4225BB53EC74CBDD7354F41FF00A32E98F0E9A97D3)
4. 在引导界面输入存储实例名称并设置默认数据处理位置。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ef/v3/4iQWxlkCSyWU1MEhl8qI6w/zh-cn_image_0000002474214317.png?HW-CC-KV=V1&HW-CC-Date=20260414T025653Z&HW-CC-Expire=86400&HW-CC-Sign=B3584E6F1DC529644820CB9DC174E581A624045F06812D4C82ACD36087158488)

   展开

   | 参数 | 说明 |
   | --- | --- |
   | 存储实例 | 存储实例名称必须符合以下条件：  * 只能包含英文小写字母、数字、中划线（-）。 * 只能以数字或字母开头和结尾。 * 要求不少于3个字符，并且不能超过57个字符。 * 不能为IP地址。 * 不能包含连续两个及以上中划线（-）。 * 名称全局唯一，创建后，不能修改。 |
   | 默认数据处理位置 | 云存储支持启用多个数据处理位置，具体请参见[设置数据处理位置](https://developer.huawei.com/consumer/cn/doc/app/agc-help-data-location-0000002277923065#section154810363471)。如当前项目已设置数据处理位置，则此处无需再设置。 |
5. 点击“下一步”，进入默认安全策略展示界面。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2a/v3/rqrJXYLdQ96onYIpFkwn6A/zh-cn_image_0000002440934332.png?HW-CC-KV=V1&HW-CC-Date=20260414T025653Z&HW-CC-Expire=86400&HW-CC-Sign=733E37FE3F351CDFC9E124F6FCE8C44B863162887648CE202088784B51D579AE)

   说明

   默认安全策略将允许经过身份验证的用户执行所有读写操作，开通服务时无法修改安全策略。服务开通后，开发者可制定更合适的安全策略来保护其用户数据。关于如何修改安全策略，请参见[安全规则](https://developer.huawei.com/consumer/cn/doc/AppGallery-connect-Guides/agc-cloudstorage-securityrules-overview-0000001054966859)。
6. 点击“完成”，开通云存储成功。

   服务开通成功后，AGC将为开发者创建一个默认存储实例，默认存储实例的名称即为步骤[4](/consumer/cn/doc/harmonyos-guides/cloudfoundation-enable-storage#zh-cn_topic_0000001275330014_li191317012303)中配置的存储实例名称+“-五位随机数字字母”的组合，如“bucket001-2wezr”。
7. 如果开发者已启用多个数据处理位置，当需要在不同的数据处理位置管理云存储时，可在云存储页面选择“数据处理位置”下拉选项进行切换。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d7/v3/rr-NntRtSkaQ6CSWta65xA/zh-cn_image_0000002485318044.png?HW-CC-KV=V1&HW-CC-Date=20260414T025653Z&HW-CC-Expire=86400&HW-CC-Sign=CA1C0F9E9DB0BDEB51AA11AF3E483C6AF7AE4F0412429C1DC3477A0DEF3D7259)