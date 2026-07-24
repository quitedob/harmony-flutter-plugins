该配置需开发者完成自测后，先将携有对应意图信息的App在AppGallery Connect（以下简称AGC）完成应用上架，具体操作步骤参见[应用开发准备](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/application-dev-overview)。

## **意图注册配置操作步骤**

1. 账号登录：
   1. 通过“[华为开发者联盟](https://developer.huawei.com/consumer/cn/) > 管理中心 > 生态服务 > 智慧服务 > 小艺开放平台（原HarmonyOS服务开放平台） > 意图框架”，进入意图注册入口，需使用与应用上架相同的账号登录。

      ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/76/v3/iRZu3ohKStGiTjwTyvlnCA/zh-cn_image_0000002370621880.png?HW-CC-KV=V1&HW-CC-Date=20260414T051438Z&HW-CC-Expire=86400&HW-CC-Sign=4A99AC23599ADE5CE31F323F0E0B26ABBF8AB08AAD13FB9F5E4C92DED837B77F "点击放大")
   2. 点击“立即体验”即可进入意图注册入口。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/87/v3/CY-YNY_aT2m7EiovyZZsFQ/zh-cn_image_0000002404181537.png?HW-CC-KV=V1&HW-CC-Date=20260414T051438Z&HW-CC-Expire=86400&HW-CC-Sign=5BF8AE3DAEDF9DBFD182A75E241F0CD65B54C8A88264A8CF4802F204A05FCBA8 "点击放大")
2. 选择意图集：在“小艺开放平台”首页“意图集（插件）”中，携有意图声明文件的应用在AGC**正式上架**后可**自动****生成**一条草稿态的记录，记录中包含开发者在意图配置文件中声明的所有**端侧意图**（云侧意图需手动新增，见下图）。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/78/v3/UtEcdECgTEaT8mW_JMwldA/zh-cn_image_0000002370461976.png?HW-CC-KV=V1&HW-CC-Date=20260414T051438Z&HW-CC-Expire=86400&HW-CC-Sign=DE465CA3941B600492311CD5F79EC7B1F5676CD18568D3C1FA961DF4182E8098 "点击放大")
3. 基本信息编辑：点击对应的意图集记录的“编辑”按钮，进入基本信息编辑页面，开发者补充完基本信息后点击“保存”即可。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2f/v3/OTaPzJEWS4CEkHcZ4ZuQAA/zh-cn_image_0000002404261689.png?HW-CC-KV=V1&HW-CC-Date=20260414T051438Z&HW-CC-Expire=86400&HW-CC-Sign=EF8C804648E792B672BFAB17D4A9AFE4DF1A7D0A6A1BCFD6A9DF6880C8EF45C6 "点击放大")

   此处的版本号和版本描述为智慧分发配置的版本信息，用于开发者记录和识别智慧分发配置版本变更，与APP软件包版本无关，意图注册名称与APP名称保持一致。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f0/v3/A_kieQKuTJmiKWbE05jZ9A/zh-cn_image_0000002370621884.png?HW-CC-KV=V1&HW-CC-Date=20260414T051438Z&HW-CC-Expire=86400&HW-CC-Sign=87EFBB769C9CFF3C49703686F1230DCDD0041CACB6746B0A4B0DDAE796631843 "点击放大")
4. 意图检查：切换至“意图”页签，点击“保存”会触发刷新，需检查接入特性所依赖的全量意图是否在此页面都已列出，同时打开意图使用样本中“是否已提供线下样本“开关。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4c/v3/gTwqpycYR5Gwtr4ec2MVeQ/zh-cn_image_0000002404181541.png?HW-CC-KV=V1&HW-CC-Date=20260414T051438Z&HW-CC-Expire=86400&HW-CC-Sign=0335FF321EEF711F03E07442BCFCAF8BCBE9D6754A2987EE0D1F887FD3C9F351 "点击放大")
   1. 其中，“端云类型”涉及端的意图需在APP软件包中定义，此处会自动呈现。

      ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/dc/v3/SUwBSaiJSjK-jOpY6XjeeA/zh-cn_image_0000002370461980.png?HW-CC-KV=V1&HW-CC-Date=20260414T051438Z&HW-CC-Expire=86400&HW-CC-Sign=4B8431A931F5EE17969C981ABEAD6F73BFD65D04787B493B84B03A7010FD7F20 "点击放大")
   2. “端云类型”仅涉及云的意图需要需手动添加该意图。可参照如下步骤配置：
      1. 点击添加进行意图新增。

         ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f1/v3/E02KhpNRT6S46sG4yj1zWQ/zh-cn_image_0000002404261693.png?HW-CC-KV=V1&HW-CC-Date=20260414T051438Z&HW-CC-Expire=86400&HW-CC-Sign=5B849F9CF53906024085506DB7E4C2B9E308AD75B50B7D2CA68C54C910F4817B "点击放大")
      2. 选择云侧意图分类，搜索意图名称，勾选所需意图进行添加（若没有找到对应意图可联系华为工程师，检查是否未配置该意图）。

         ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4e/v3/SB9ZSaO7Tre2mrfW4uCdBg/zh-cn_image_0000002370621888.png?HW-CC-KV=V1&HW-CC-Date=20260414T051438Z&HW-CC-Expire=86400&HW-CC-Sign=9B277A5FB17545FD9ED06B1082B6606254BBB85686CA052551644038BEC49662 "点击放大")
      3. 添加完成后，需录入接口信息配置，具体信息如下：
         1. API：即开发者的URL地址信息，供华为侧服务器进行云侧意图调用。
         2. 认证方式：如果涉及接口鉴权，则选择认证方式（例如AK/SK认证）并配置密钥信息；如果不涉及则选择不认证。
         3. 个人数据授权：该信息是指华为侧服务器携带对应信息访问开发者服务器，当有个性化推荐诉求时需要填写，默认不填写；比如选中“用户授权的用户唯一标识”（即SID），则华为侧服务器访问开发者服务器时会携带SID，开发者服务器则可以识别用户返回个性化的数据用户推荐展示。

         ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/82/v3/DlSQbDWpRLmGeAE4_qd1nQ/zh-cn_image_0000002404181545.png?HW-CC-KV=V1&HW-CC-Date=20260414T051438Z&HW-CC-Expire=86400&HW-CC-Sign=E79E4B3964E38A8640045E027815396026D2CF3ED6B4AF73BF12C18FD1804BEA "点击放大")
   3. 如仍未全部列出，检查软件包中意图注册配置文件是否漏配，若漏配则在意图配置文件中补充配置，并重新在AGC进行应用上架/升级，完成后在小艺开放平台进行意图注册。
   4. 如果提示声明意图不存在，则说明华为意图框架后台未配置该意图。开发者可以继续点击保存走完本次流程，但相应意图和关联特性不会生效；可联系华为工程师，检查是否未配置该意图。
5. 检查完成：如果特性依赖的所有意图都已列出，检查意图名称、意图调用配置和意图共享配置等是否正确，正确则点击“保存”，进入下一步。
6. 发布选择“发布”页签，进入配置检查页面。
   1. 点击“开始检查”，检查接入特性和其关联的意图是否正确，如下图所示。生成特性时会同时生成abilityId，若开发者接入特性的方案涉及此参数，则事件推荐请求字段abilityId参数需要填写当前界面的abilityId值。若提示特性undefined，则联系华为工程师，检查是否未配置该特性。
   2. 配置检查完成后点击“提交审核”。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d2/v3/A2p2es8dQ6WOp14HlxEf1w/zh-cn_image_0000002370461984.png?HW-CC-KV=V1&HW-CC-Date=20260414T051438Z&HW-CC-Expire=86400&HW-CC-Sign=027E71AD3D0CCA2D545441838DC2498752AC59AC1B17B05265B533E9530D9179 "点击放大")
7. 审核：提交审核后，在“小艺开放平台> 意图集”中，该条记录状态变为“上架审核中”，一般审核周期为3-5个工作日，审核通过后状态变为“已上架”，至此意图注册及特性选择已完成。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/cc/v3/QkLSlBktT568jQuvze1MwQ/zh-cn_image_0000002404261697.png?HW-CC-KV=V1&HW-CC-Date=20260414T051438Z&HW-CC-Expire=86400&HW-CC-Sign=0CF156A707D00655C480E4B45D213DF4566858303A975FD62561027D5E6345A7 "点击放大")
8. 新增意图：若开发者有新意图上架，可在同一条记录上进行编辑后提交，操作流程同上述步骤，未提交审核不影响已经注册的意图。