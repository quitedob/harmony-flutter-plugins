## 场景介绍

在手机设备中，分享框通过模态弹窗方式被拉起，效果如下图所示。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/94/v3/XyB-dsReRnOG330NJLZP5Q/zh-cn_image_0000002481329620.png?HW-CC-KV=V1&HW-CC-Date=20260414T033402Z&HW-CC-Expire=86400&HW-CC-Sign=B0E1A7AD7D6F9400A4C1ACAAF3A2248A88BA0AECFE7C46F9154C4C3412D2B61E)

在2in1设备上分享框通过Popup形式展示，效果如图所示：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ea/v3/UQki51nwQwCoKuNkG4BpPg/zh-cn_image_0000002513409491.png?HW-CC-KV=V1&HW-CC-Date=20260414T033402Z&HW-CC-Expire=86400&HW-CC-Sign=9097AAACE54989519BFF5C769C63A7451C7F31CE4365E4359A06D4A8416029C7 "点击放大")

1. 宿主应用可以分享一段文本、一个文件或一条备忘录到其他应用。
2. 宿主应用可以分享多个内容，如文本、图片等到其他应用。

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4d/v3/ueCQytYMSW2YoFx5JWXLQQ/zh-cn_image_0000002481169654.png?HW-CC-KV=V1&HW-CC-Date=20260414T033402Z&HW-CC-Expire=86400&HW-CC-Sign=72A9953C779A2BD337F40D210BF7A3DC6827AB62A4EA98E46A4BC19AAE0E157E "点击放大")

流程说明：

1、宿主应用构造分享数据、构造ShareController以及注册分享面板状态监听（可选）。

2、宿主应用拉起系统分享面板。

3、用户可选择目标设备或者应用。

4、目标应用处理分享数据，并关闭系统分享面板。

## 设计规范

宿主应用接入系统分享时，根据不同的内容类型，应选择恰当的分享方式。详细参见：[系统分享设计指南](https://developer.huawei.com/consumer/cn/doc/design-guides/share-0000001957076313)。