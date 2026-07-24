## **意图注册配置操作步骤**

1. 账号登录：
   1. 通过“[华为开发者联盟](https://developer.huawei.com/consumer/cn/) > 管理中心 > 生态服务 > 智慧服务 > 小艺开放平台（原HarmonyOS服务开放平台） > 意图框架”，进入意图注册入口。

      如发布渠道为“智能体/小艺对话”只能使用与应用上架相同的账号登录。反之发布渠道为“插件市场”无特殊账号要求。

      ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/12/v3/Ch9MrxogR3GX8P7owpJwNA/zh-cn_image_0000002370462624.png?HW-CC-KV=V1&HW-CC-Date=20260414T051441Z&HW-CC-Expire=86400&HW-CC-Sign=D21AFE1F57A445AE7E18EA8A23842A3C3BF55CFE77B21C0C95BEC37D5FE0BE12 "点击放大")
   2. 点击“立即体验”即可进入意图注册入口。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/39/v3/T41VXF6FRVuXTBgPgBtxhA/zh-cn_image_0000002370462696.png?HW-CC-KV=V1&HW-CC-Date=20260414T051441Z&HW-CC-Expire=86400&HW-CC-Sign=8905E514596FF3EE58B0E041DCE04253EC23D6E768482CCE5CD129275A89ABC0 "点击放大")
2. 注册意图集
   1. 如图，点击“注册意图”。

      ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6/v3/PumAyP2mQcSFuTjw5N26Jw/zh-cn_image_0000002404182437.png?HW-CC-KV=V1&HW-CC-Date=20260414T051441Z&HW-CC-Expire=86400&HW-CC-Sign=713BADB896DA77395D76CC0A7983AF8073CC84D706DA6FED9559D1EF95E431CF "点击放大")
   2. 选择“MCP协议”并填写基本信息创建意图集。
      1. 意图集（插件）名称：需唯一标识。
      2. 意图集（插件）描述：开发者自定义插件描述信息。
      3. 分类：按业务场景选择。
      4. MCP服务配置：填写MCP URL（服务器地址信息，不含鉴权信息）。
      5. 认证信息配置：对应鉴权信息（注意放在Header/Query）。
      6. 协议类型：根据情况选择，提供SSE/Streamable两种。

      ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e2/v3/-Az0vsCDStmq5DA6k5Tuqw/zh-cn_image_0000002370622864.png?HW-CC-KV=V1&HW-CC-Date=20260414T051441Z&HW-CC-Expire=86400&HW-CC-Sign=DFA54A5D0104F0C6826C09CA48E9C336148AAF425D98DAABBC5B2A3991F2ED55 "点击放大")
3. 编辑：创建后自动进入”插件编辑“页面。
   1. 编辑基本信息：
      1. 开发者品牌：该信息是对外露出的品牌传播名（注意和企业账号，公司名称区别开）。
      2. 图标：192\*192。
      3. 使用描述：需使用Markdown格式。（需对server的功能概述、apikey申请方式表达准确清晰）。

      ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8/v3/7UsKsJ7fQnS_hnOI5u1NKQ/zh-cn_image_0000002370631568.png?HW-CC-KV=V1&HW-CC-Date=20260414T051441Z&HW-CC-Expire=86400&HW-CC-Sign=30CAEA79B417C13EED72A35CDFF2B8B1A3E3304EABCAABBB4F26B2F383111F1B "点击放大")
4. 工具检查：保存后切换至"工具"页签。若基本信息配置无误，工具列表中会根据基本信息内容自动生成1条/多条信息。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4a/v3/4zr31EpET7-DCAMHPUbO2g/zh-cn_image_0000002404278633.png?HW-CC-KV=V1&HW-CC-Date=20260414T051441Z&HW-CC-Expire=86400&HW-CC-Sign=7D2945DF3A5E286FA771A67DC0D9CE599DC763AA160A6306AD2DBBB57F7F0482 "点击放大")
   1. 出现工具列表：请检查工具入参，参数是否重复或者缺失，参数类型是否正确。若一切无误，则配置成功。

      ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/39/v3/yDSFDcsdQOC58WNn3-G_Mw/zh-cn_image_0000002370479076.png?HW-CC-KV=V1&HW-CC-Date=20260414T051441Z&HW-CC-Expire=86400&HW-CC-Sign=96CA9098239E2FF71857BBD51671FB1903E877B666B92892D4BFCD0EB8292952 "点击放大")
   2. 未出现工具列表：请等候几分钟重新进入，后台加载存在延时；如若重新进入后，仍未加载出工具信息，可能是插件的链接和鉴权信息配置错误。多次尝试后仍未解决，请通过邮箱联系华为意图框架同学（hagservice@huawei.com） 。
5. 审核：切换至“发布”页签，点击“提交审核”。
   1. 选择发布渠道，点击确定，提交审核。
      1. 智能体：开发者上架MCP Server，仅供开发者自己开发的智能体来调用。
      2. 小艺对话：开发者上架MCP Server，可供开发者自己开发的智能体调用，也可供小艺APP主对话调用（当前暂不支持开发者独立在小艺主对话上线该能力，需联系华为意图框架同学）。
      3. 插件市场：开发者上架MCP server，可供开发者自己开发的智能体调用，也可供平台上其他开发者开发智能体时调用（回到开发者源头平台去开服）。

      ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7c/v3/O-qYyZKxS_CbF6GGPM0vGQ/zh-cn_image_0000002404278877.png?HW-CC-KV=V1&HW-CC-Date=20260414T051441Z&HW-CC-Expire=86400&HW-CC-Sign=B0DC9AE709522940D8848C90533A952DB7047769B5EBD12346A580D08D3F9405 "点击放大")
   2. 提交审核后，请耐心等待平台相关审核流程完成；完成后即可在“[华为开发者联盟](https://developer.huawei.com/consumer/cn/) > 管理中心 > 生态服务 > 智慧服务 > 小艺开放平台（原HarmonyOS服务开放平台） > 意图框架 > 小艺插件市场”中找到您的工具。