跨设备互通提供跨设备的相机、扫描、通过图库访问图片和视频的能力，TV、平板或2in1设备可以调用手机的相机、扫描、图库等功能。

说明

本章节以拍照为例展开介绍，扫描、图库功能的使用与拍照类似。

用户在TV、平板或2in1设备上使用富文本类编辑应用（如：备忘录、邮件、笔记等）时，想要拍摄一些照片作为素材，但是当前设备拍摄不太方便。通过跨设备互通-拍照，用户可以在当前设备的应用中指定平板或手机设备，并打开平板或手机的相机来拍摄所需的素材。通过手机或者平板设备拍摄，移动更便利、取景更灵巧、相机能力也更强大。拍摄的照片将实现快速回传到TV、平板或2in1设备的应用中，帮助用户高效完成图文并茂的文档设计。

如果同一组网下有多台手机或平板设备，用户可以选择不同的设备进行拍摄。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/54/v3/cIbeCCn5TzqLO7p9fYYZig/zh-cn_image_0000002538088609.gif?HW-CC-KV=V1&HW-CC-Date=20260414T045116Z&HW-CC-Expire=86400&HW-CC-Sign=CC573C9963CF994F80AC4549A56CE81B5337C7B67BA99C42E648C7628D2EBDFA "点击放大")

## 运作机制

基于分布式协同框架面向跨设备拍照的业务场景，为您提供了 [HMS\_ServiceCollaboration\_GetCollaborationDeviceInfos](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#gaeffea1546cbe64aeba533e5b72bca7ba)（设备列表接口）、[HMS\_ServiceCollaboration\_StartCollaboration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#section4531193410296)（跨设备互通拉起）和 [HMS\_ServiceCollaboration\_StopCollaboration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#section67211235132913)（终止跨设备互通）三个接口。只需要调用这三个接口，即可完成跨端拍照，无需关注分布式场景下数据传输、指令控制等具体细节。

1. **系统分布式协同框架跨设备自动建链**

   通过系统的分布式协同框架，同账号下的本端设备（2in1设备/平板）与远端设备（手机/平板）自动建立连接。系统将自动完成设备的发现、连接、认证等流程，通过[HMS\_ServiceCollaboration\_GetCollaborationDeviceInfos](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#gaeffea1546cbe64aeba533e5b72bca7ba)接口提供可用的具有相机、扫描和图库能力的远端设备信息，通过[HMS\_ServiceCollaboration\_StartCollaboration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#section4531193410296)拉起对应跨设备互通能力，通过[HMS\_ServiceCollaboration\_StopCollaboration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-capi-module#section67211235132913)终止跨设备互通能力。
2. **用户使用远端设备拍照**
   1. 用户使用远端设备完成拍照并确认，照片将回传到本端设备的应用，完成整个流程。
   2. 远端设备将自动退出相机界面，回到初始状态。