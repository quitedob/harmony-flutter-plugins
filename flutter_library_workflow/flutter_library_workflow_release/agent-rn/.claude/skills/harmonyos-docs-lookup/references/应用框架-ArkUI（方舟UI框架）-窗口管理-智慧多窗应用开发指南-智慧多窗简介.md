智慧多窗是一种多任务处理解决方案，它允许用户在同一时间、同一屏幕上以悬浮窗、分屏或全景多窗的方式同时运行多个应用窗口。在智慧多窗的显示模式下，用户可以根据自己的需求，合理安排应用窗口的位置和大小。

## 悬浮窗

悬浮窗是一种在设备屏幕上悬浮的非全屏应用窗口。一般用于在已有全屏任务运行的基础上，临时处理另一个任务，或短时间多任务并行使用。如浏览网页的同时回复消息。

针对手机，一个屏幕内最多支持显示一个悬浮窗；在折叠屏手机展开态、平板类设备上，一个屏幕内最多支持显示两个悬浮窗。在超出悬浮窗显示最大个数限制时，打开新的悬浮窗会替换最近久未操作的悬浮窗。

### 悬浮窗的类型

**悬浮窗的常见类型主要分为如下两种：**

* 竖向悬浮窗：一般用于新闻资讯、社交以及购物类应用等场景。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/dc/v3/O8G1FgdtQgafL8kyhH88dg/zh-cn_image_0000002529582163.png?HW-CC-KV=V1&HW-CC-Date=20260414T040527Z&HW-CC-Expire=86400&HW-CC-Sign=3FF7DBCFB56C23C1D1F16F7A8633EED0883E85D578C18098C1861E124E90DC6A "点击放大")
* 横向悬浮窗：主要用于横向游戏和视频全屏播放的场景。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/69/v3/5PvtUrUUQySVm6FWVX1KoA/zh-cn_image_0000002497742196.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T040527Z&HW-CC-Expire=86400&HW-CC-Sign=E1A616E846923D1A22434D02FB0A7F96E816ADD6A2E876A0A21A7FE66D409098 "点击放大")

### 悬浮窗的触发及恢复方式

**悬浮窗的触发方式有以下几种：**

* 手势触发：应用全屏时从屏幕底部向上滑至右上方热区，松手后可开启悬浮窗模式。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/87/v3/9-qTq3VDSXKEkaH7RJvfSg/zh-cn_image_0000002529702131.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T040527Z&HW-CC-Expire=86400&HW-CC-Sign=2F9FE1CF36CA3D7C7065494EBACB8FCF4C5F49B84BCFEE2906F96D4A6C2B22C9 "点击放大")
* 通知消息下拉触发：在系统接收到通知消息未收起时，可直接下拉此通知消息开启悬浮窗模式。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/55/v3/o2Dm09aOSSmVKJTL120q7g/zh-cn_image_0000002529582161.png?HW-CC-KV=V1&HW-CC-Date=20260414T040527Z&HW-CC-Expire=86400&HW-CC-Sign=A56DEF70E19C26B562157C4676BB142EF06E41A28EA9CC3733230CAFC62889B9 "点击放大")
* 侧边Dock触发：侧滑调出侧边Dock栏，点击Dock上的应用，支持悬浮窗的应用以悬浮窗模式开启。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8e/v3/eWaaXaaZTt6kbXzg_3nOdQ/zh-cn_image_0000002529702141.png?HW-CC-KV=V1&HW-CC-Date=20260414T040527Z&HW-CC-Expire=86400&HW-CC-Sign=D1D91A08CC7E70F8DA7819DAFFF91FB6F423521762573CCACB4465B8936C9AEE "点击放大")
* 分屏切换悬浮窗：分屏时，按住分屏应用顶部横条，拖拽到相应的热区，应用从分屏切换到悬浮窗模式。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d0/v3/wkJJnXeZTRaTbPi5X_dMeg/zh-cn_image_0000002497902166.png?HW-CC-KV=V1&HW-CC-Date=20260414T040527Z&HW-CC-Expire=86400&HW-CC-Sign=A725A67E8696D84AD870635B72883CA899CB338E3E72C0AEB6393E5D2D62D93F "点击放大")

**悬浮窗的恢复方式主要有以下两种：**

* 多任务中心中恢复：对于已开启悬浮窗模式的应用，在进入多任务中心时，悬浮窗应用同全屏应用一起显示在多任务中心，用户选择点击悬浮窗应用卡片时可恢复悬浮窗模式。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9b/v3/Sr4ECYZ8TXKO-bEM7eIXlA/zh-cn_image_0000002497902174.png?HW-CC-KV=V1&HW-CC-Date=20260414T040527Z&HW-CC-Expire=86400&HW-CC-Sign=9BF59D45F09095FDD553F1D405B54D2B28198470917DCC6866E63862402F71F3 "点击放大")
* 侧边条恢复：对于已开启悬浮窗模式的应用，其最小化后会暂存在屏幕上的侧边条中，点击或者长按侧边条可展开任务选择界面，选择点击侧边条中悬浮窗应用卡片时可恢复悬浮窗模式。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/68/v3/zpGivsRvTxec8y-axkC76g/zh-cn_image_0000002497902176.png?HW-CC-KV=V1&HW-CC-Date=20260414T040527Z&HW-CC-Expire=86400&HW-CC-Sign=E6498945F6660ED600AC41D1D163E4EEED1135BEA3DEE7F88F7CE657F5AAAC4E "点击放大")

### 适配注意事项

针对在Tablet设备上运行的PC应用，不支持悬浮窗。

当应用module.json5配置文件中的设备类型[deviceTypes标签](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/module-configuration-file#devicetypes标签)包含"2in1"且不包含"phone"时，系统判定其为PC应用。

## 分屏

分屏一般用于两个应用长时间并行使用的场景。例如：边看购物攻略边浏览商品；边看视频边玩游戏；看学习类视频的同时做笔记等。

### 分屏的触发方式

* 分屏通过手势触发：应用全屏时，从屏幕底部向上滑至左上方热区，进入待分屏状态，点击桌面另一个支持分屏的应用图标或卡片，可形成分屏。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b3/v3/mt8e42T1Qc63HAUNMveiqg/zh-cn_image_0000002498670826.png?HW-CC-KV=V1&HW-CC-Date=20260414T040527Z&HW-CC-Expire=86400&HW-CC-Sign=C43A84240F5D132DBE0A00EF970CF4FB2BBC6247B1DC8A61DE913214F3C2D77D "点击放大")

* 应用自主启动分屏：除了通过手势触发分屏之外，应用可以自主选择启动分屏，具体步骤可见[应用内分屏](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/multi-window-support#section152819561687)。
* 侧边Dock栏触发：长按Dock栏中的应用图标并拖出，和前台支持分屏的全屏应用形成分屏。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8a/v3/Q3tCjY06S--2HjuyMIkY2g/zh-cn_image_0000002529702137.png?HW-CC-KV=V1&HW-CC-Date=20260414T040527Z&HW-CC-Expire=86400&HW-CC-Sign=06301AB71AED8B3676F56FC37689B5A72695DB2CF628151F62A5729522AF94AF "点击放大")

* 悬浮窗切分屏：按住悬浮窗顶部横条，拖到相应热区，悬浮窗和前台全屏应用形成分屏。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d9/v3/zVLwZ883SAKvtYu5WxopXQ/zh-cn_image_0000002497902168.png?HW-CC-KV=V1&HW-CC-Date=20260414T040527Z&HW-CC-Expire=86400&HW-CC-Sign=77C2F8D67827E913BE55598CB0CDDDAC105143BA9BBF1C435551F7B59AFD4E66 "点击放大")

## 全景多窗

从HarmonyOS 5.0.1开始，折叠机、部分Tablet设备支持全景多窗。

全景多窗旨在帮助用户在折叠机设备展开态时高效处理多个任务。通过全景多窗，用户可以突破物理屏幕的围墙，实现在同一屏幕上同时运行多个应用，并在这些应用之间快速切换。

全景多窗在折叠机设备上最多可支持三个窗口同时运行（部分Tablet设备最多可支持四个窗口）。

### 全景多窗的样式

目前全景多窗在双折叠设备上支持小窗口与大窗口两个档位显示，在三折叠与Tablet设备上支持小窗口、中窗口、大窗口三个档位显示，且窗口的档位与位置支持调节。

* 双折叠设备全景多窗窗口档位及窗口宽高比：

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/cd/v3/7fy5PAOLTVyuZC7VzCnCWg/zh-cn_image_0000002497742194.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T040527Z&HW-CC-Expire=86400&HW-CC-Sign=5AACFE3BD3F01B978E94DE805509748DBA6687FCD00259D2500A2E9A8E425049 "点击放大")
* 三折叠与Tablet设备全景多窗窗口档位及窗口宽高比：

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/27/v3/Obpoxjj3RIi7dFUCx6-MjQ/zh-cn_image_0000002497742198.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T040527Z&HW-CC-Expire=86400&HW-CC-Sign=AD9F5AACCA0989D206C5754CAD7D0A5910A71EE31976E0337D019AFF4B9FCA59 "点击放大")
* 窗口状态分为平铺和侧身两种状态：

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d3/v3/I3XuF9XNSF-Lv0mEyNoVtw/zh-cn_image_0000002497902172.png?HW-CC-KV=V1&HW-CC-Date=20260414T040527Z&HW-CC-Expire=86400&HW-CC-Sign=7B29778E0917AE76AAEB6236ADE28863DB5AF087F40BC5797CB1241B38AE509C "点击放大")

### 全景多窗的进入方式

* 全景多窗通过手势触发：

  应用全屏时，从屏幕底部向上滑至上方中间热区，点击桌面另一个支持全景多窗的应用图标或卡片，可形成全景多窗。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a5/v3/Jd6bBty3TXW9HmlJ_9MRVA/zh-cn_image_0000002497742192.png?HW-CC-KV=V1&HW-CC-Date=20260414T040527Z&HW-CC-Expire=86400&HW-CC-Sign=CD47CF77F64BEB327C7539D504660E8F67458D764B4FF94EC8098311F4E6F638 "点击放大")

  应用分屏时，从屏幕底部向上滑至上方中间热区，点击桌面另一个支持全景多窗的应用图标或卡片，可形成全景多窗。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6f/v3/X7ql5xv1RYCzF1Cngu7Hcg/zh-cn_image_0000002529702139.png?HW-CC-KV=V1&HW-CC-Date=20260414T040527Z&HW-CC-Expire=86400&HW-CC-Sign=DA793FAA4A9FA2F1BA6D5A5BEBFC06BDDA40E3EDC13BCBC3B47850C60B99CC2E "点击放大")

  应用分屏时，从屏幕底部向上滑至左上方热区，点击桌面另一个支持全景多窗的应用图标或卡片，可形成三小窗全景多窗。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/84/v3/LqtHn5vsRXauqU0-qwtKXg/zh-cn_image_0000002529582167.png?HW-CC-KV=V1&HW-CC-Date=20260414T040527Z&HW-CC-Expire=86400&HW-CC-Sign=F2FD652DC67BC9FE4A9B7958EC4EF21BA69FFD0C5BFD100DE568D821C0A2E9BD "点击放大")

* 全景多窗通过顶部横条触发：

  应用全屏时，点击全屏应用顶部横条，选择“全景多窗”，点击桌面另一个支持全景多窗的应用图标或卡片，可形成全景多窗。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f8/v3/V36iBCE-RIC-PvjopBK_TA/zh-cn_image_0000002498544246.png?HW-CC-KV=V1&HW-CC-Date=20260414T040527Z&HW-CC-Expire=86400&HW-CC-Sign=C81F523F56C2603F130A2E7248903847A77769962092E4AB6A894A0F95D710D2 "点击放大")

  应用分屏时，点击分屏应用顶部横条，选择“增加窗口”，点击桌面另一个支持全景多窗的应用图标或卡片，可形成全景多窗。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c9/v3/aYxYdocTRDy53R_G0ehWFA/zh-cn_image_0000002497902170.png?HW-CC-KV=V1&HW-CC-Date=20260414T040527Z&HW-CC-Expire=86400&HW-CC-Sign=16633CD0546D7E737444BD49B1F871B24C26B5DDFB44DE85D3E9F6A2D8C5A4BC "点击放大")

* 全景多窗通过分屏拖拽触发：应用分屏时，调节分屏比例到相应热区，进入全景多窗。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/82/v3/zTDVJwQjRzuJDncn8uNsUQ/zh-cn_image_0000002529582165.png?HW-CC-KV=V1&HW-CC-Date=20260414T040527Z&HW-CC-Expire=86400&HW-CC-Sign=7349E460C1E33493015986B9C48BB8C646EFF1A0EA9C86D22A476D8FBC4052BE "点击放大")

### 适配注意事项

全景多窗侧身窗口为不可见窗口，可以通过监听[on('windowVisibilityChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#onwindowvisibilitychange11)感知应用是否处于侧身。