## 简介

在开发的过程中，当开发者完成所需[适配流程](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/adaptation-process)后，可导入提前准备好的APK应用沙箱数据，自验证HarmonyOS应用数据迁移适配结果。

在HarmonyOS应用适配完成并上架到华为应用市场之后，开发者仍需要将终端设备从HarmonyOS升级到HarmonyOS NEXT，[端到端验证](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/e2e-verification)应用数据迁移结果。

## 开发者自验证流程

### 应用沙箱数据准备

请自行构造APK应用沙箱数据，并将构造好的APK应用沙箱数据按指定格式打包成“{APK包名}.zip”。

说明

在打包‘{APK包名}.zip’文件时，必须使用UTF-8编码格式进行压缩，否则压缩中文命名的文件时，文件名会出现乱码。

展开

| **APK应用沙箱目录** | {APK包名}.zip目录 |
| --- | --- |
| /data/user\_de/{userId}/{APK包名}/ | {APK包名}/de |
| /data/user/{userId}/{APK包名}/ | {APK包名}/ce |
| /data/media/{userId}/Android/data/{APK包名}/ | {APK包名}/A/data |
| /data/media/{userId}/Android/obb/{APK包名}/ | {APK包名}/A/obb |

打包好的“{APK包名}.zip”解压后，要满足包含一个“APK包名”根目录，根目录下包含对应沙箱目录文件夹，文件结构如下。

收起

自动换行

深色代码主题

复制

```
1. ─com.demo.demo
2. ├─A
3. │  ├─data
4. │  └─obb
5. ├─ce
6. └─de
```

1. 将打包好的“{APK包名}.zip”推送到外部存储设备（U盘或者移动硬盘），连接终端设备和外部存储设备。

   说明

   当前终端设备支持识别NTFS格式的外部存储设备，请使用NTFS格式的外部存储设备连接终端设备。
2. 在终端设备中，打开“文件管理”应用，长按选中外部存储设备中的“{APK包名}.zip”。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1b/v3/ox8X8aJ1SfW4UvTqeerqRg/zh-cn_image_0000002529714135.png?HW-CC-KV=V1&HW-CC-Date=20260414T041240Z&HW-CC-Expire=86400&HW-CC-Sign=0201CC96DD3A87D74011A0BA287499989DD333EFE8C681A3054E20134330D4E4 "点击放大") ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/62/v3/O-vnmd5ZQ5Cahjwm0GMAFQ/zh-cn_image_0000002497754194.png?HW-CC-KV=V1&HW-CC-Date=20260414T041240Z&HW-CC-Expire=86400&HW-CC-Sign=EB5ABA8E834C5062BD485438312C5FE2D815217092BC7DCEC9D6C1794331DCAF "点击放大")
3. 单击“复制”按钮，将数据复制到文件管理器的“下载”目录下，作为后续自验证的测试数据源。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ee/v3/NaDdxJHNSNihDjHIg3JqRA/zh-cn_image_0000002529594167.png?HW-CC-KV=V1&HW-CC-Date=20260414T041240Z&HW-CC-Expire=86400&HW-CC-Sign=39438E23815DE7E7E239CC370B95B34DB542473D1F1832793C181CE9CE7EC6D4 "点击放大") ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/19/v3/UfccLj2oRZWig_9HDCj8Xw/zh-cn_image_0000002497914164.png?HW-CC-KV=V1&HW-CC-Date=20260414T041240Z&HW-CC-Expire=86400&HW-CC-Sign=8F29EF4B86F01AC58ADCFF6255F51C2323F5E90E76491A5B37A9768740DF0734 "点击放大")

## HarmonyOS NEXT上模拟验证应用数据迁移

在应用沙箱数据准备好之后，开发者需要先完成所需[适配流程](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/adaptation-process)，再模拟验证应用数据迁移。

1. 安装目标HarmonyOS应用到终端设备。

   注意

   “迁移调试”工具“205.0.0.110”之前的版本，仅支持调试release签名的应用。

   从“205.0.0.110”版本开始，“迁移调试”工具仅支持调试debug签名的应用。请开发者升级到最新版本，并使用debug签名的包验证。

   “迁移调试”工具版本查看方式：**设置** > **应用和元服务** > **MigrateTool** > **版本**
2. 打开迁移调试工具。迁移调试工具图标如下图所示：

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/57/v3/szQbB-eUTrW5CNwoW7J7Og/zh-cn_image_0000002497914168.png?HW-CC-KV=V1&HW-CC-Date=20260414T041240Z&HW-CC-Expire=86400&HW-CC-Sign=2DFCFABA0AEF7F7D6F3595E98FCD7D65296F2E01355121957B17D0F3408977A8 "点击放大")
3. 在“迁移工具”应用的首页，开发者通过单击“选择”按钮进入设备文件管理界面。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6c/v3/OLNqtqNHRJu3KSi2-8bEGg/zh-cn_image_0000002529594159.png?HW-CC-KV=V1&HW-CC-Date=20260414T041240Z&HW-CC-Expire=86400&HW-CC-Sign=3889B71042A95A488C5F84810A33C7D2D792CD46E18724E970B2206838022D15 "点击放大")
4. 在设备文件管理界面，单击“浏览”按钮，进入浏览手机内部存储界面。单击“我的手机”，根据之前导入数据的路径，进入手机存储的相应路径，选择需要导入的APK应用数据zip包。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/51/v3/RgsqOz31TGOeFoYD2rThmQ/zh-cn_image_0000002497754192.png?HW-CC-KV=V1&HW-CC-Date=20260414T041240Z&HW-CC-Expire=86400&HW-CC-Sign=6A7B15E74B930B57EFCF0036EEA3A633F1C36AEB3B11F64C7873087DB43E9124 "点击放大") ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e5/v3/3TQVwszsRyy0Im791WylTA/zh-cn_image_0000002529714133.png?HW-CC-KV=V1&HW-CC-Date=20260414T041240Z&HW-CC-Expire=86400&HW-CC-Sign=4E7221EC5EA032B3A7A4889C5BC4DA45B1F85F7A7DFFD2D1A25077B181EF9BC8 "点击放大")
5. 单击需要导入的APK应用数据zip包后，会返回“迁移调试”工具首页，已选择的需要导入的APK应用数据会显示在第一栏中。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b9/v3/6K2DgcjSTSmPD72OWryXvw/zh-cn_image_0000002529594161.png?HW-CC-KV=V1&HW-CC-Date=20260414T041240Z&HW-CC-Expire=86400&HW-CC-Sign=492CD8B02D6E618A589791005AE8139656DFF37F93D6E1D649D21706C53884B6 "点击放大")
6. 选择好需要导入的APK应用数据后，单击“请输入应用包名”。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a0/v3/M0FkTP4NQSGB7CkggdZPMw/zh-cn_image_0000002529714131.png?HW-CC-KV=V1&HW-CC-Date=20260414T041240Z&HW-CC-Expire=86400&HW-CC-Sign=586471AA555442B5609821394489B59997E9DDA99B63258C08F7333574BBFF56 "点击放大")
7. 输入需要验证的目标HarmonyOS应用包名，目标HarmonyOS应用会显示在“迁移调试”工具首页的第二栏中。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/fe/v3/258bIMYtSLatQ7wSb0QZJw/zh-cn_image_0000002497914162.png?HW-CC-KV=V1&HW-CC-Date=20260414T041240Z&HW-CC-Expire=86400&HW-CC-Sign=4FC060557373192A285F1F6314B38528D4479A3038584B78B41CCD58591BC22E "点击放大") ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e0/v3/vnyjOzTiTXSBIrbVEbD92g/zh-cn_image_0000002497914160.png?HW-CC-KV=V1&HW-CC-Date=20260414T041240Z&HW-CC-Expire=86400&HW-CC-Sign=A0CFF5D9BDE03DC556A52609CD560CBF8452D6A9E51D6C17D500892B6182B84A "点击放大")
8. 选择需要导入的APK数据和目标HarmonyOS应用后，单击“启动迁移”按钮，开始模拟数据迁移，页面切换为数据优化界面，应用数据迁移的进度在数据迁移进度条中显示。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/23/v3/FpDs4AqnQuu4ofbUWASoJw/zh-cn_image_0000002497754190.png?HW-CC-KV=V1&HW-CC-Date=20260414T041240Z&HW-CC-Expire=86400&HW-CC-Sign=F06A4F11CFA2FE837ACFC7919456596841F33E221E4860554AFAAC6B84680B86 "点击放大") ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/df/v3/XYtTXQhHQBqzjxZ_NZqo3A/zh-cn_image_0000002529594173.png?HW-CC-KV=V1&HW-CC-Date=20260414T041240Z&HW-CC-Expire=86400&HW-CC-Sign=8CF42447E749FC417C2124025139B612738A88BD0265A34568F7F49CD2E798D4 "点击放大")
9. 应用数据迁移完成之后，数据迁移进度条上方显示“已优化完成”，进度更新为100%。数据迁移成功的情况下，界面中无异常提示。单击“完成”按钮，切换回“迁移调试”工具首页，在下方的“迁移日志”版块中显示详细迁移信息。result字段表示数据迁移结果，costTime字段表示数据迁移时长（单位ms）。

   注意

   **1、此处的数据迁移成功，仅表示“备份恢复框架”接入成功，APK应用的数据成功迁移到“备份恢复框架”需要的指定目录。开发者需要通过从应用的沙箱中获取数据并解析，判断应用适配“备份恢复框架”的结果**。

   **2、单个应用数据迁移执行超过十五分钟，超过设定的单个应用最长数据迁移时间，会导致任务执行失败。开发者需要优化应用BackupExtensionAbility的代码实现，在十五分钟内完成应用数据迁移。**

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/07/v3/ggfyb1bVSRu8mNXgjPdWqw/zh-cn_image_0000002529594169.png?HW-CC-KV=V1&HW-CC-Date=20260414T041240Z&HW-CC-Expire=86400&HW-CC-Sign=B8077F40CCBACB2F6718D98CFBB40F2FD2CD10CDD00E475D26BE2C9AA60C2A20 "点击放大") ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/53/v3/kbzVA2S3SVuMfNeHnuOpfg/zh-cn_image_0000002497914166.png?HW-CC-KV=V1&HW-CC-Date=20260414T041240Z&HW-CC-Expire=86400&HW-CC-Sign=24242A8473878931473CF719279270E0C2C49B110B5B3723B49435CCE0404D6A "点击放大")
10. 数据迁移失败的情况下，应用图标上方的状态显示“优化失败”。单击“完成”按钮，切换回“迁移工具”应用首页，在下方的“迁移日志”版块中显示详细迁移信息。result字段表示数据迁移结果，costTime字段表示数据迁移时长（单位ms）。

    ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/09/v3/ocNnEFsvRtu1V7bDdn2_Ng/zh-cn_image_0000002497914170.png?HW-CC-KV=V1&HW-CC-Date=20260414T041240Z&HW-CC-Expire=86400&HW-CC-Sign=F053D80D688A6DA6E2712BBD82BAB8A9DEC27CCE194F6E7BD0162163CB4AD834 "点击放大") ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e1/v3/-EHhTuezSUOd9RWgiyol1w/zh-cn_image_0000002529594165.png?HW-CC-KV=V1&HW-CC-Date=20260414T041240Z&HW-CC-Expire=86400&HW-CC-Sign=A0B790ACEFEAB39138E1658E51C41EA104319925FB2CD772F2C726B2C7250498 "点击放大")