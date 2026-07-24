Share Kit推出碰一碰分享，支持用户通过碰一碰发起跨端分享，可实现传输图片、共享Wi-Fi等。

## 场景介绍

* 宿主应用进入一个可以分享的界面，比如打开或者选中的一个文件、一条备忘录、一个联系人详情，或个人热点/Wi-Fi等。
* 宿主应用可以分享多个内容，如选中的多张图片等。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2d/v3/KcWq-Fa7QuqappYWx5QWZQ/zh-cn_image_0000002513289509.gif?HW-CC-KV=V1&HW-CC-Date=20260414T033519Z&HW-CC-Expire=86400&HW-CC-Sign=193F8DCFC96F243C742DDB21D38750570C460062A1A3B81558A16F6E3EB89A2A "点击放大")

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c3/v3/QJ7XF7QQTKuKLDf-vusIpg/zh-cn_image_0000002481329616.png?HW-CC-KV=V1&HW-CC-Date=20260414T033519Z&HW-CC-Expire=86400&HW-CC-Sign=1592FA49B4F2774663995FE29F212F509763FD2D994F2619A69B234048FA1B41 "点击放大")

流程说明：

1. 宿主应用注册碰一碰分享事件，并与亮屏且解锁的对端设备碰一碰。
2. 宿主应用发现设备，调用碰一碰分享事件回调，在回调事件中构造分享数据并发送。
3. 目标设备接收并处理分享数据。
4. 宿主应用解除注册碰一碰分享事件。

## 使用约束

手机应用发起碰一碰分享时，双端设备需要在**亮屏、且解锁**的状态下并且都已开启华为分享服务（系统默认开启），设备顶部轻碰即可触发。如果用户已手动关闭华为分享服务开关，轻碰事件触发时，用户会接收到系统通知提示开启。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1f/v3/2ht7RwD0SdK4Gz30_dqzdA/zh-cn_image_0000002513289513.png?HW-CC-KV=V1&HW-CC-Date=20260414T033519Z&HW-CC-Expire=86400&HW-CC-Sign=33243AEC700EB9347218625AABEF9BA6772C3C4EFE30C417FFFCE4795FC4ECD6 "点击放大")

Share Kit的处理机制：

* 任意一端设备不支持碰一碰能力时，轻碰无任何响应。
* 宿主应用无法获得分享结果，Share Kit会通过系统通知消息告知用户对端接收或拒绝。

## 环境要求

* 支持的手机系统：[HarmonyOS NEXT Release](https://developer.huawei.com/consumer/cn/doc/harmonyos-releases/overview-500#section62333015377)及以上版本，可使用[canIUse](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-syscap#caniuse)判断系统能力是否支持。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. if (canIUse('SystemCapability.Collaboration.HarmonyShare')) {
  2. // 支持一碰分享的能力.
  3. }
  ```

* 集成开发环境：[DevEco Studio NEXT Beta1](https://developer.huawei.com/consumer/cn/doc/harmonyos-releases/overview-500#section1457031563711)及以上版本。