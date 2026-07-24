## 现象描述

使用环境跟踪能力时，如果输入图像中有反光、光线暗、有弱纹理（输入图像颜色变化小），识别到的点云数量会变少甚至没有，出平面时间也会变长或无法生成平面。

1. 反光：镜面，光滑的大理石地板等

   **图1** 镜面  
   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/da/v3/esqMSR-5Slat4vBEUWxoHg/zh-cn_image_0000002500426100.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T053733Z&HW-CC-Expire=86400&HW-CC-Sign=FDFC62D58806FE7BA0090E34DCCE483658E4E3290DA3B45E58281F739D407F13 "点击放大")
2. 光线暗：夜晚的路面或摄像头遮挡等。

   **图2** 夜晚的路面

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/3b/v3/SsSJ_RloQgGpp7yB5oH1UQ/zh-cn_image_0000002500426104.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T053733Z&HW-CC-Expire=86400&HW-CC-Sign=B4CB33CE7D88C3B992D7DA95412523267EBE48F77BE3F92BAB7BD73CE5D7B39F "点击放大")
3. 弱纹理：如单色柜子、单色桌面和墙面等。

   **图3** 墙面

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/db/v3/Yq2uL1llRv-61No2EAy73g/zh-cn_image_0000002532306151.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T053733Z&HW-CC-Expire=86400&HW-CC-Sign=6351AF03916F260649775150674C08A21BACCEB69F4990ED4922F1274A86B3FF "点击放大")

   **图4** 纯色的桌面

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/bb/v3/jz_QD1zYT4CWvFd4i5GYVQ/zh-cn_image_0000002532146183.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T053733Z&HW-CC-Expire=86400&HW-CC-Sign=D714E14158125B52E3125871AFB1FAFBDE10D53EFD9D0014341899B5E9554E5A "点击放大")

## 可能原因

AR Engine通过输入的图像数据进行平面上特征点的计算，如果输入图像数据中存在反光、光线暗和弱纹理，AR Engine计算后只能得到很少的点，而平面根据识别到的点云生成，因此会导致平面出现缓慢或无法出现的现象。

## 处理步骤

建议应用在持续无法获取点云或平面数据时，提示用户移动相机，避免画面中持续出现反光、光线暗或弱纹理。