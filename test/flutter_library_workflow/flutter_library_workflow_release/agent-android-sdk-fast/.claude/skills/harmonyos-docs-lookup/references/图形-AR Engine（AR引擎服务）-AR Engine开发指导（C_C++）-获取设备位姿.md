## 概要

从5.0.0(12)开始，AR Engine支持获取设备位姿能力。

设备位姿描述了物体在真实世界中的位置和朝向。AR Engine提供了世界坐标下6自由度（6DoF）的位姿计算，包括物体的位置（沿x、y、z轴方向位移）和朝向（绕x、y、z轴旋转）。通过AR Engine，开发者可以实时获取设备在空间中任意时刻的位姿。

## 世界坐标系与位姿示意

设备位姿一般在世界坐标系下进行表示。世界坐标系描述了真实物理空间中物体的绝对位置，其正方向如图所示。

**图1** 世界坐标系示意图  
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/42/v3/3n4quXoISfmbYGETqNjm9A/zh-cn_image_0000002500426118.png?HW-CC-KV=V1&HW-CC-Date=20260414T053649Z&HW-CC-Expire=86400&HW-CC-Sign=D1A4E99783CD1CC03FC9F2A19886D241D8C590F74EC43E716AC598F2BDC3AA98)

AR Engine会自动完成世界坐标系初始化。

在AR Engine中，设备位姿由一个7维向量描述，包括旋转量![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6a/v3/dPxGKaMzTbyn6Y7U76oB1g/zh-cn_formulaimage_0000002532306169.png?HW-CC-KV=V1&HW-CC-Date=20260414T053649Z&HW-CC-Expire=86400&HW-CC-Sign=0E8CF385E7EBE3C721E026483E2E56C166B882B6D4C6F21A7F14F65489DAF522)和位移量![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/07/v3/EhgH-ns_QzCG5gvXxSzmjQ/zh-cn_formulaimage_0000002532306171.png?HW-CC-KV=V1&HW-CC-Date=20260414T053649Z&HW-CC-Expire=86400&HW-CC-Sign=39586E85D4EDC8960E8328ED2BBC11211FCF0B443F4C582B183E8E6A91E81C39)。其中旋转量![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/75/v3/E1nGwNaFTAG6HzIUVXPn-g/zh-cn_formulaimage_0000002500306278.png?HW-CC-KV=V1&HW-CC-Date=20260414T053649Z&HW-CC-Expire=86400&HW-CC-Sign=9504222A3EC8D9055D24514F94343C5403FA60716F5B6AB6FE51C61B5FCC065E)是一组四元数，描述了设备相对于坐标原点的旋转状态；位移量![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/fc/v3/1qYVEzaeQxeqjo-DfQHS0Q/zh-cn_formulaimage_0000002500306280.png?HW-CC-KV=V1&HW-CC-Date=20260414T053649Z&HW-CC-Expire=86400&HW-CC-Sign=F1F351A8F663EB60BE290FCFAEE723BD4B75A932C57C5F2CC1ABD2FB22E74280)是一组三维向量，描述了设备相对于坐标原点的平移状态，如下图所示。

**图2** 设备位姿的旋转和平移变化示意图  
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/61/v3/m1BhrBX7RfqhYIBdDTTLNQ/zh-cn_image_0000002532306167.png?HW-CC-KV=V1&HW-CC-Date=20260414T053649Z&HW-CC-Expire=86400&HW-CC-Sign=C99DEB078145538993F0632ED236A63F0C83C3E3D518828C29C037E5547C296C)

通过旋转分量和平移分量，可以描述设备在空间中任意时刻的位姿状态。

## 引入AR Engine

开发者可参考管理AR会话章节的[引入AR Engine](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arengine-c-arsession#section1410827131110)。

## 创建ARSession

开发者可以参考[管理AR会话](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arengine-c-arsession)创建ARSession。

## 获取设备当前位姿

1. 创建一个空位姿变量cameraPose。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. AREngine_ARPose *cameraPose = nullptr;
   2. HMS_AREngine_ARPose_Create(arSession, nullptr, 0, &cameraPose);
   ```
2. 获取当前时刻相机位姿信息，并存储在cameraPose变量中。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 创建一个新的AREngine_ARFrame对象。
   2. AREngine_ARFrame *arFrame = nullptr;
   3. HMS_AREngine_ARFrame_Create(arSession, &arFrame);
   4. // 更新当前帧的结果到arFrame。
   5. HMS_AREngine_ARSession_Update(arSession, arFrame);
   6. // 获取当前帧的相机参数对象。
   7. AREngine_ARCamera *arCamera = nullptr;
   8. HMS_AREngine_ARFrame_AcquireCamera(arSession, arFrame, &arCamera);
   9. // 获取当前时刻相机位姿信息。
   10. HMS_AREngine_ARCamera_GetPose(arSession, arCamera, cameraPose);
   ```

3. 从cameraPose中获取相机位姿的不同分量，包括平移分量和旋转分量。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. float poseRaw[7] = { 0.0f };
   2. HMS_AREngine_ARPose_GetPoseRaw(arSession, cameraPose, poseRaw, 7);
   ```