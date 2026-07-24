## 功能介绍

Input Kit（多模输入Kit）为多种输入设备提供服务，如触控板、触摸屏、鼠标、键盘等。通过对这些输入设备上报驱动事件的归一化处理，确保不同输入设备与用户交互体验统一和流畅。

Input Kit除了提供基础的输入事件服务之外，还提供了获取输入设备列表、改变鼠标光标样式等功能和接口。

## 运作机制

多模输入能力作为系统为应用提供的一种基础服务，通过处理上报的输入设备驱动事件，完成输入事件管理、接收、预处理、分发，通过inner SDK与JSkit上报应用，具体运行机制如下。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ed/v3/4u7-NS_YTb-x2u1VO47Crw/zh-cn_image_0000002571171969.png?HW-CC-KV=V1&HW-CC-Date=20260414T045611Z&HW-CC-Expire=86400&HW-CC-Sign=4089C92F97C7B015919DC16EA3FAAFAE5396A13C6342901238ECDEBB4F16B25E)