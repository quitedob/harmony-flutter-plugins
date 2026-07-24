AR Engine（AR引擎服务）是一个用于在HarmonyOS上构建增强现实应用的引擎，提供了运动跟踪、环境跟踪和命中检测等空间计算能力。

通过这些能力，应用可以实现虚拟世界与现实世界的融合，给用户提供全新的视觉体验和交互方式。

AR Engine包含三大能力，分别是运动跟踪能力、环境跟踪能力和命中检测能力。

## 运动跟踪能力

AR Engine通过获取终端设备摄像头数据，结合图像特征和惯性传感器（IMU），计算设备位置（沿x、y、z轴方向位移）和姿态（绕x、y、z轴旋转），实现6自由度（6DoF）运动跟踪能力。

**图1** 6DoF运动跟踪能力示意图（红色线代表设备运动方向）  
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c7/v3/rBnRqp_YSZiHqqSWMXE_vA/zh-cn_image_0000002500426108.png?HW-CC-KV=V1&HW-CC-Date=20260414T053550Z&HW-CC-Expire=86400&HW-CC-Sign=84E3F380A4C67089C197BCCD8B4374A7A4F7C821D5595E5AEE3376BF2810A51F "点击放大")

## 环境跟踪能力

AR Engine通过检测和跟踪设备周围的平面及语义，实现环境跟踪能力。环境跟踪能力包括：平面检测、平面语义、目标语义、深度估计、环境网格扫描、图像跟踪和高精几何重建。

* 平面检测

  检测水平和竖直平面（如地面、墙面等），并识别平面边界。应用可使用这些平面来放置虚拟物体。

  **图2** 平面检测示意图（左图为水平平面，右图为竖直平面）  
  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/95/v3/Bc5wZNv9TEOSNsfA4amu6g/zh-cn_image_0000002500426116.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T053550Z&HW-CC-Expire=86400&HW-CC-Sign=ED1702A2F40D9BEDB502B000FD5B37323BC1AD2BA3F9112D6CE524B4CBDF1336 "点击放大")
* 平面语义

  检测不同的平面类型。当前支持的平面类型共11种，分别为：墙面、地面、座椅面、桌面、天花板、门面、窗面、床面、平面空间、立方体体积、立方体空间容积（平面空间、立方体体积和立方体空间容积仅在高精几何重建模式下支持）。

  **图3** 平面语义示意图（蓝色表示地面，绿色表示桌面）  
  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8a/v3/eMdkwn2bTNSIUB_qkccO6w/zh-cn_image_0000002532146191.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T053550Z&HW-CC-Expire=86400&HW-CC-Sign=1EA98E7C7BD928B2B979FBF865ED409D103082C0F957EDF6D333831B96A6FE25 "点击放大")
* 目标语义

  当目标物体位于平面上时，检测目标物体的形状，当前包括矩形和圆形。

  **图4** 目标语义示意图 (左图为矩形检测，右图为圆形检测）  
  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/58/v3/V7A9YLmXRui5vEYY_95oHw/zh-cn_image_0000002500426112.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T053550Z&HW-CC-Expire=86400&HW-CC-Sign=95B643DF328CFBAEB81C8DC3E8B9F4F730F090999E6A0BABC2A4D70E60884E73 "点击放大")
* 深度估计

  支持持续输出周围环境相对终端设备的深度信息，利用这些深度信息，可以实现更加自然、无缝的虚实体验。本功能提供的深度信息是指从终端设备摄像头到显示场景中各点的深度值，每个像素点都有该深度值。同时输出置信度信息，开发者可自行根据应用需求根据置信度选择更稠密或者更精确的深度信息。

  **图5** 深度渲染示意图  
  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/17/v3/DFzueodkSByCUhqmD0ccRg/zh-cn_image_0000002500306276.png?HW-CC-KV=V1&HW-CC-Date=20260414T053550Z&HW-CC-Expire=86400&HW-CC-Sign=A2BA536F5B8E758F8CD18C994DDCB0B9ECCDB7A1ADB3E1CD99304AA4C5708BFF)
* 环境网格扫描

  实时计算并输出当前画面中的环境网格数据，可用于处理虚实遮挡等应用场景。

  通过环境网格能力，可将虚拟物体放置在任意可重建的曲面上，而不再受限于水平面和垂直面。同时可利用重建的环境网格实现虚实遮挡和碰撞检测，使得虚拟角色能够准确的知道当前所在的周围三维空间情况，实现更好的沉浸式AR体验。

  **图6** 环境网格扫描示意图  
  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/70/v3/CZp4IQVaR32Yjlbpl0bL5Q/zh-cn_image_0000002500306268.png?HW-CC-KV=V1&HW-CC-Date=20260414T053550Z&HW-CC-Expire=86400&HW-CC-Sign=247F8552BE0AC145C0F0D12897F4B71F88EF7D1DD3142C77B94315FC5D2D1231)
* 图像跟踪

  AR Engine提供图像识别与跟踪的能力，检测场景中是否存在用户提供的图像，识别之后输出图像的位姿。

  通过图像识别与跟踪功能，可实现基于现实世界场景中图像（海报或封面等）的增强现实。可提供一组参考图像，当这些图像出现在终端设备的相机视野范围内时，AR Engine可为AR应用实时跟踪图像，丰富场景理解及交互体验。

  **图7** 图像跟踪示意图

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a2/v3/5oQj9eXyQeiSaiBuE1fRpA/zh-cn_image_0000002532306161.png?HW-CC-KV=V1&HW-CC-Date=20260414T053550Z&HW-CC-Expire=86400&HW-CC-Sign=91D047F59118D368F30AB5547CDA9DDC4BD69C2CADCDF45A5E900A5218C34CAB)
* 高精几何重建

  AR Engine高精几何重建用于识别空间中的立方体物体或者嵌入式立方体空间，计算出被识别物体或空间的长、宽、高以及体积。体积测量可以用于测量立方体体积以及嵌入式空间的大小。

  高精几何重建主要包含稠密点云绘制、体积测量、空间识别三大能力。

  **图8** 稠密点云绘制示意图  
  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b2/v3/M5daDbKySaahf6Z85Zqj7w/zh-cn_image_0000002532146193.png?HW-CC-KV=V1&HW-CC-Date=20260414T053550Z&HW-CC-Expire=86400&HW-CC-Sign=5B6C11D9A2DE985C20BED8C5EE301E8EA01621FFA2372D8EE673754CE4988ABA)

  **图9** 体积测量示意图  
  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/dd/v3/pXoPoEChQkaZOy1gpPMTBA/zh-cn_image_0000002532306157.png?HW-CC-KV=V1&HW-CC-Date=20260414T053550Z&HW-CC-Expire=86400&HW-CC-Sign=9578384410472A7D9973B3B6BD173340D7BCC0EDE303DDBC0A9F39CCA4ABFA67)

  **图10** 空间识别示意图  
  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9c/v3/5y65OJucTXWuaeZQEh463A/zh-cn_image_0000002532306165.png?HW-CC-KV=V1&HW-CC-Date=20260414T053550Z&HW-CC-Expire=86400&HW-CC-Sign=8C5C66CF88CA8B4C0F8B6CF07C94577AAEEA95F558FA577603585C510FF6588B)

## 命中检测能力

AR Engine通过命中检测（Hit Testing）技术，将终端设备屏幕上的兴趣点映射为现实环境中的兴趣点。命中检测以现实环境中的兴趣点为源，发出一条射线连接到摄像头所在位置，返回射线与平面（或特征点）的交点。通过命中检测能力，用户可以通过点击终端设备屏幕，选中现实环境中的兴趣点，与虚拟物体进行交互。

**图11** 命中检测示意图  
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/77/v3/l7Pu-NgyR8GcBlJe23VNcw/zh-cn_image_0000002532146189.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T053550Z&HW-CC-Expire=86400&HW-CC-Sign=6E0D667F092C397749DD4F873BB71BDCB06F8B125A3E4AB1376981A92B650598 "点击放大")

## 场景介绍

通过以上能力，可以实现AR场景的应用开发，如AR物体摆放等，为用户提供虚实融合的全新交互体验。

* AR物体摆放：通过摄像头构建AR虚拟世界，支持用户在虚拟世界中放置虚拟物体。AR物体摆放可用于虚拟家具试用等，实现虚拟与现实世界融合。
* 平面语义识别：对于检测到的平面，开发者可以对平面进行平面的语义识别，包括墙面、地面、座椅面、桌面、天花板、门面、窗面、床面等。
* 目标形状识别：对于检测到的目标物体，开发者可以对目标物体进行形状识别，可识别的形状包括矩形和圆形。
* 网格扫描：通过摄像头构建AR虚拟世界，通过重建周围环境网格实现虚实遮挡和碰撞检测，支持用户在虚拟世界中放置虚拟物体。通过感知当前所在的周围三维空间情况，实现更好的沉浸式AR体验。
* 深度估计：通过摄像头获取周围环境信息，持续输出周围环境的深度信息，为用户提供环境三维感知能力。该技术可应用于测量、体积估算、场景重建等获取空间物体深度信息，基于此信息完成一些空间计算任务，比如计算物体体积等。
* 图像跟踪：通过摄像头获取周围环境信息，持续检测场景中是否存在输入的图像，识别之后输出图像的位姿。

  AR Engine提供图像识别与跟踪的能力，检测场景中是否存在用户提供的图像，识别之后输出图像的位姿。

  通过图像识别与跟踪功能，可实现基于现实世界场景中图像（海报或封面等）的增强现实。可提供一组参考图像，当这些图像出现在终端设备的相机视野范围内时，AR Engine可为AR应用实时跟踪图像，丰富场景理解及交互体验。
* 高精几何重建：通过摄像头获取周围环境信息，识别空间中的立方体物体或者嵌入式立方体空间，计算出被识别物体或空间的长、宽、高以及体积。体积测量可以用于测量立方体体积以及嵌入式空间的大小。