## 场景介绍

Share Kit支持手机和PC/2in1之间的碰一碰分享。利用PC/2in1设备的屏幕感知能力，识别手机轻碰屏幕的动作及位置，实现PC/2in1窗口级的交互。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/75/v3/RU14Q6i-Rj6Vtabq1LOOPg/zh-cn_image_0000002513289541.gif?HW-CC-KV=V1&HW-CC-Date=20260414T033534Z&HW-CC-Expire=86400&HW-CC-Sign=F490542A11D64638EDD3EA0199986CE6E726F1D7674003705111297EC5DE271D "点击放大")

## 业务流程

* PC/2in1设备作为数据接收端

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/02/v3/mUUNVPeLRAqNt1nX15ZcQQ/zh-cn_image_0000002513409511.png?HW-CC-KV=V1&HW-CC-Date=20260414T033534Z&HW-CC-Expire=86400&HW-CC-Sign=F55ACC422F2D8C46F28BDC71005243A185E72DE65D7F373CDCB8E60A48D8DB95 "点击放大")
* PC/2in1设备作为数据发送端

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d7/v3/szPKZyRBTDKqPM0QDtMJbg/zh-cn_image_0000002481169678.png?HW-CC-KV=V1&HW-CC-Date=20260414T033534Z&HW-CC-Expire=86400&HW-CC-Sign=4C92FDAF4744362727C887F0B90D309E10D7F723F372B64B7D9F02A24C49FFE1 "点击放大")

## 双向分享限制

从6.0.0(20) Beta5版本开始，手机与PC/2in1设备之间不支持双向分享。遵循以下机制：

* 当手机前台有可分享内容时，无论PC/2in1设备前台窗口是否有可分享内容，优先将手机作为发送端，PC/2in1设备作为接收端。
* 当手机前台无可分享内容且PC/2in1设备前台窗口有可分享内容时，PC/2in1设备作为发送端，手机作为接收端。
* 当手机前台和PC/2in1设备前台窗口均无可分享内容时，遵循无内容分享逻辑。

对于6.0.0(20) Beta3及之前的版本，当手机前台和PC/2in1设备前台窗口均有可分享内容时，支持双向分享（发送分享内容的同时也可接收到分享内容）。

## 使用约束

* 手机与PC/2in1设备间碰一碰分享需登录相同的华为账号。
* 仅支持直板手机或折叠手机直板态与PC/2in1屏幕碰一碰分享。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/76/v3/89ZHxi9sRBSoFHnXlcrq3A/zh-cn_image_0000002481329640.png?HW-CC-KV=V1&HW-CC-Date=20260414T033534Z&HW-CC-Expire=86400&HW-CC-Sign=40E74DB700C4099DF9B0CD8F6C2E79AAB420A56B07960DEC416A8225519217F6 "点击放大")
* 轻碰屏幕交互约束：
  + 手机与PC/2in1屏幕俯视夹角应≤5°。

    ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5b/v3/GCC7bcEGSxmydOpwtzHxbQ/zh-cn_image_0000002481329644.png?HW-CC-KV=V1&HW-CC-Date=20260414T033534Z&HW-CC-Expire=86400&HW-CC-Sign=267ED7D4DB294703487BE485669B5890E0139BD80D83E9C269DD017006C1FFF5 "点击放大")
  + 手机与PC/2in1屏幕侧视夹角应＞35°。

    ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9d/v3/wz1FswenQOu_rRNCeOVjtQ/zh-cn_image_0000002481329636.png?HW-CC-KV=V1&HW-CC-Date=20260414T033534Z&HW-CC-Expire=86400&HW-CC-Sign=72C74EA63D653EDF3D540858976DBBB99870B1C59E6F26D368D11FF8CC3A9BD5 "点击放大")
  + 手机与PC/2in1屏幕正视夹角应≤25°。

    ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/aa/v3/X-16LJDdQ32Zx0YSBAjg-g/zh-cn_image_0000002513289545.png?HW-CC-KV=V1&HW-CC-Date=20260414T033534Z&HW-CC-Expire=86400&HW-CC-Sign=382C5FF0DABCB44EE25E81E2ACF685F8B369C4EC3EDF23F7DFB1834F5E2F79E9 "点击放大")
  + 手机不能超出PC/2in1设备屏幕。

    ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/af/v3/K30ce1XiQzKmboOWdKmgQg/zh-cn_image_0000002513409507.png?HW-CC-KV=V1&HW-CC-Date=20260414T033534Z&HW-CC-Expire=86400&HW-CC-Sign=D54343546CAB015DC16FBF42CDEB66B9BDF765038507159B0CEFF5BAF99EC49E "点击放大")
* 支持官方手机保护壳，不支持过厚的手机外壳。

## 环境要求

* 支持的PC/2in1系统：[HarmonyOS 6.0.0 Beta1](https://developer.huawei.com/consumer/cn/doc/harmonyos-releases/overview-600#section1836613212578)及以上版本。

* 集成开发环境：[DevEco Studio 6.0.0 Beta1](https://developer.huawei.com/consumer/cn/doc/harmonyos-releases/overview-600#section1836613212578)及以上版本。

## 代码示例

* PC/2in1作为发送端接入参考：[发送分享数据](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/knock-share-between-phones-content#section1083592311502)
* PC/2in1作为接收端接入参考：[分享内容直达应用界面](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/knock-share-pc-phones-sandbox)