## 场景介绍

应用内的通知设置功能页面入口通常较深，用户难以找到，导致应用的通知关闭率上升。

为改善这一情况，我们在通知消息的左滑菜单和系统的应用通知设置页面中，添加了快速进入应用内通知设置功能页面的入口，直接引导用户跳转至应用内的通知分类管理页面，提升用户通知管理的体验，降低应用通知关闭率。

“设置 > 通知和状态栏 > XX应用”页面

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d3/v3/JCHfQ4kSRly0haY-3SVNfA/zh-cn_image_0000002529772554.png?HW-CC-KV=V1&HW-CC-Date=20260414T031940Z&HW-CC-Expire=86400&HW-CC-Sign=F006706ABC7EAC1493BF7DA9E5867FCE399B80246AA39C9A32952FDCCE38AAE7)

通知中心页面

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/48/v3/Obt4j_rjRyy3MDUABteV6w/zh-cn_image_0000002529732554.png?HW-CC-KV=V1&HW-CC-Date=20260414T031940Z&HW-CC-Expire=86400&HW-CC-Sign=B3C7C764C87C3AFA63C9BB923FA33472CA15490BDDA9358E5C5358CD214A2EB7)

## 开发步骤

详情请参考[应用链接说明](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-uri-config)，其中[linkFeature](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-uri-config#linkfeature标签说明)使用AppNotificationMgmt即可。

## 功能验证

* 场景1

  1. 在手机的“设置 > 通知和状态栏”页面，选择当前应用，进入应用详情页。
  2. 点击“前往XX应用管理”的选项，即可跳转至应用内对应的通知设置页面。
* 场景2

  1. 在手机通知中心页面，左滑应用已发布的通知。
  2. 点击“前往XX应用管理”的选项，即可跳转至应用内对应的通知设置页面。