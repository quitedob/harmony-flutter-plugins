## 现象描述

某些特殊场景下，如使用环境附近存在强磁场，手机处于高负载场景下（后台开启很多应用或长时间使用导致手机发烫），或者扫描到重复纹理（见下图）时，可能出现识别到的平面无法锚定到现实世界中，或者通过[HMS\_AREngine\_ARCamera\_GetPose](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#ga00df108c4ba187967a10e9c4d2e27d3a)接口获取的位姿信息出现大幅度跳变等现象。

**图1** 重复纹理的地板

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7e/v3/VTToOB0TSs-6UVENIksl7w/zh-cn_image_0000002500306264.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T053737Z&HW-CC-Expire=86400&HW-CC-Sign=A0398B033141EC18FF72D8A602A89A67A5CCE7158C533982B42D19E2A02FF89D "点击放大")

## 可能原因

AR Engine通过获取到的加速度计传感器和磁力计传感器的信息进行平面计算和相机位姿计算，上述特殊场景下，系统传感器数据可能会存在异常，从而导致平面漂移或者位姿跳变的现象发生。

## 处理步骤

建议应用对通过[HMS\_AREngine\_ARCamera\_GetPose](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#ga00df108c4ba187967a10e9c4d2e27d3a)接口获取到的位姿数据，按照实际应用使用场景进行滤波，如步行导航场景，应用可以缓存多帧数据，通过多帧数据可以计算得到运动速度，如果检测到此速度明显高于步行速度，证明此时AR数据已经不可信，可以丢弃此数据或者重启AR算法。

说明

**计算运动速度**：x,y,z为在t时刻的位姿数据的位移量。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/13/v3/5JaRgA_MR_Swz6ABfnJqow/zh-cn_formulaimage_0000002532306155.png?HW-CC-KV=V1&HW-CC-Date=20260414T053737Z&HW-CC-Expire=86400&HW-CC-Sign=72D0B0E374C2C6D7676C00C6F711D99DB213765BFD111CD5C14A84936BA9259C "点击放大")