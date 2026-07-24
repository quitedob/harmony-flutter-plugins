从6.0.0(20)开始，Intents Kit向开发者提供意图调用调试能力。开发者完成代码开发之后，功能正式上架应用市场前，可以在HarmonyOS 6及以上的设备上面进行自验证，调试分为两个步骤：环境准备和联调验证。

## 环境准备

1. 登录[华为开发者联盟](https://developer.huawei.com/consumer/cn/) ，通过“管理中心 > 生态服务 > 智慧服务 > 小艺开放平台（原HarmonyOS服务开放平台） > 意图框架”，点击“立即体验”进入意图注册入口，需使用与应用上架相同的账号登录。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8/v3/ctR9s2JERSOcbuNW1gpWYA/zh-cn_image_0000002457760268.png?HW-CC-KV=V1&HW-CC-Date=20260414T051408Z&HW-CC-Expire=86400&HW-CC-Sign=B7A16BE1ABC4F16D152B3743B0D2DF97FC845EF0D7ED6E14F9005889AF63D905 "点击放大")

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f/v3/10jtfkVDS6yP5pBnbnilNQ/zh-cn_image_0000002490879509.png?HW-CC-KV=V1&HW-CC-Date=20260414T051408Z&HW-CC-Expire=86400&HW-CC-Sign=80CA0259747F33FA86E481B978A8CCB9DD1DD6CE7543E877B5CC36ED1DA426EE "点击放大")
2. 点击注册意图新增意图集。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a4/v3/eeBI_ehmRjqyPPchCeEdEQ/zh-cn_image_0000002457919920.png?HW-CC-KV=V1&HW-CC-Date=20260414T051408Z&HW-CC-Expire=86400&HW-CC-Sign=345124A65B4CDCFAE805D08A2BEAD55053B2EE707356CB06C64CDB12B4C893F0 "点击放大")

   1. 点击新增注册意图，填写注册信息进行创建。

      ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/80/v3/83SAdlCnSySXiXY9rGTm5Q/zh-cn_image_0000002490959493.png?HW-CC-KV=V1&HW-CC-Date=20260414T051408Z&HW-CC-Expire=86400&HW-CC-Sign=DF7A5A2E80D981B3D5D30A159505CDC8E5878F61454194A00A81B03AE4AB3E61 "点击放大")

      展开

      | 名称 | 描述 |
      | --- | --- |
      | 意图注册协议类型 | 选择意图标准协议。 |
      | 意图集（插件）名称 | 需唯一标识。 |
      | 分类 | 开发者根据自定义意图选择对应垂域。 |
   2. 编辑意图集基本信息。

      ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/eb/v3/UwDO3PtASAiheuzT2e82qA/zh-cn_image_0000002457760280.png?HW-CC-KV=V1&HW-CC-Date=20260414T051408Z&HW-CC-Expire=86400&HW-CC-Sign=BC68F09B9480F93A93412C8500B9F9B5C7E55E103C0A208F8304ABAFF3229877 "点击放大")

      展开

      | 名称 | 描述 |
      | --- | --- |
      | 意图注册名称 | 填写应用名称。 |
      | APP名称 | 填写应用名称。 |
      | 关联APP | 选择需要进行测试的应用。 |
      | 支持的设备类型 | 选择手机、平板、PC。 |
      | 版本号 | 开发者自定义，仅支持正整数。 |
      | 版本描述 | 开发者自定义，该内容不对外展示。 |
      | 图标 | 尺寸：72\*72（1:1）、格式：png、jpg、jpeg、样式要求：方角、不透明背景 |
3. 添加意图。
   1. 切换至意图页签并添加意图。

      ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f7/v3/ZUHXRCt6SxSJr6C12QZxyg/zh-cn_image_0000002457748368.png?HW-CC-KV=V1&HW-CC-Date=20260414T051408Z&HW-CC-Expire=86400&HW-CC-Sign=CE387571696B01C5C976D73EFBF7DA8696CFB1C41661BB9BD4BC28D93249C779 "点击放大")
   2. 选择自定义意图并填入意图信息（根据接入方案进行填入）并确定。

      ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/67/v3/qNKCEYwTSjCea5lVSy9SgQ/zh-cn_image_0000002457749544.png?HW-CC-KV=V1&HW-CC-Date=20260414T051408Z&HW-CC-Expire=86400&HW-CC-Sign=C8092B601826F77E3C8FD6663EE764FF7597E5CB9A29BC530D5983B35EDF742B "点击放大")
   3. 展开已创建的意图，并填入自定义输入、输出参数，点击保存。

      ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/cc/v3/IbFGfBzcQkuDlbyKe9sciA/zh-cn_image_0000002490870749.png?HW-CC-KV=V1&HW-CC-Date=20260414T051408Z&HW-CC-Expire=86400&HW-CC-Sign=A747FDD038E772CA380382836CE6879D6107D66D9148E9583F7A2B7FA9B64331 "点击放大")
4. 添加意图使用样本（意图样本用于提升模型对意图识别的准确率）。
   1. 意图使用样本可通过新增/批量导入进行上传。
   2. 若无需添加意图使用样本，打开是否已提供线下样本开关即可。

      ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2e/v3/uQq-1FDXSSSIMEKhArcOlQ/zh-cn_image_0000002504092937.png?HW-CC-KV=V1&HW-CC-Date=20260414T051408Z&HW-CC-Expire=86400&HW-CC-Sign=9644867570CE191BFDB5BC01F17A06D2E140C6EDC6B8A90AAC27BB0B2468FF4F "点击放大")
5. 添加账号至真机测试用户组。
   1. 切换至测试页签，点击编辑用户组。

      ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5a/v3/MX-EW87CSTCvWQfPgmpK0A/zh-cn_image_0000002490872941.png?HW-CC-KV=V1&HW-CC-Date=20260414T051408Z&HW-CC-Expire=86400&HW-CC-Sign=B220CA5626726D84691F55CE5DA6E8C4E9E1414B60F883F79DD7ABCC386DC52B "点击放大")
   2. 点击新增组，输入新用户组名称（名称自定义）。

      ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/dc/v3/S-iZ4VcnQOGYTjKKqHRMUA/zh-cn_image_0000002457754904.png?HW-CC-KV=V1&HW-CC-Date=20260414T051408Z&HW-CC-Expire=86400&HW-CC-Sign=033DE54A8419261A0AEBB5665985C416E378453FCD7D244860BFCD361DEF9B25 "点击放大")
   3. 选择已新增用户组，点击查看进入。

      ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/3c/v3/HW3U2LPsRWiHaMXBaC2Sfw/zh-cn_image_0000002457914820.png?HW-CC-KV=V1&HW-CC-Date=20260414T051408Z&HW-CC-Expire=86400&HW-CC-Sign=7784D01D2327E6D7133B1A843BED40BB62443FEBBE83500F68B1971AA09CBF34 "点击放大")
   4. 点击添加用户，选择账号类型为邮箱/手机号码，填入后点击确定（测试用户须为该项目团队下的成员）。

      ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/34/v3/tWeXXjchRLe1sSzt6_M6Bw/zh-cn_image_0000002457758244.png?HW-CC-KV=V1&HW-CC-Date=20260414T051408Z&HW-CC-Expire=86400&HW-CC-Sign=F5E10590B445D00782D8A19CC9B0ADD1EA1B89B46DDE7AA454A6E640B3B35C01 "点击放大")
   5. 返回测试页签，选择所创建的真机测试用户组进行保存，点击开始测试准备，开发者即可通过HarmonyOS 6.0.0(20)版本及以上的设备在小艺进行端到端测试。

      ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6a/v3/dFmaua8YQ_q0wpGXVqzyAw/zh-cn_image_0000002490959385.png?HW-CC-KV=V1&HW-CC-Date=20260414T051408Z&HW-CC-Expire=86400&HW-CC-Sign=3040296DDD3821B00AD9AE38A459C1E3862C3C3A692E15504E42361ACA2FBBA4 "点击放大")

## 联调验证

1. 开发者需确认调试设备系统版本为HarmonyOS 6.0.0(20)及以上。
2. 在调试设备上登录已添加真机测试用户组的华为账号。
3. 检查小艺App是否为应用市场最新版本（需升级至最新版）。
4. 长按电源键/语音唤起小艺，通过小艺进行自验证。
   1. 开发者预期：用户可通过小艺打开应用内页面并传递参数。
   2. 开发者验证：正常跳转目标落地页并收到对应参数。