## 应用数据迁移暂停

**问题现象1**

在数据加载界面，应用数据迁移暂停。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a1/v3/1MFbOrugQLGQrQPsl-SnFw/zh-cn_image_0000002529714125.png?HW-CC-KV=V1&HW-CC-Date=20260414T041248Z&HW-CC-Expire=86400&HW-CC-Sign=FEDA252DC34A10E2919773D6D7829818DD8297524BC24CDFB79DD81BC13B80EA)

**可能原因**

应用数据迁移的过程中需要使用到网络，当前终端设备网络不可用，导致数据迁移暂停。

**解决方法**

单击“稍后连接WLAN加载”按钮，进入桌面后连接网络，终端设备网络可用后，恢复应用数据迁移。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b0/v3/V3SuoLxCS6qxX7Jl2kDygw/zh-cn_image_0000002529714129.png?HW-CC-KV=V1&HW-CC-Date=20260414T041248Z&HW-CC-Expire=86400&HW-CC-Sign=05F6B43163F180DF0D94EF952EE368DA4F32A3A0BFF8F0BAC7A28C97B8C486BD)

**问题现象2**

进入桌面之后，若双升单数据迁移还未结束，可通过通知栏进入应用加载界面查看加载进度

在应用加载界面，应用数据迁移暂停。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/be/v3/Ltk3fgCqQfe2KdUMU03n1g/zh-cn_image_0000002529714127.png?HW-CC-KV=V1&HW-CC-Date=20260414T041248Z&HW-CC-Expire=86400&HW-CC-Sign=AD8B683990FF419F77B8AAE241CF59F68FCC603B8DBE4E8E9550C189F59DF0C4)

**可能原因**

应用数据迁移的过程中需要使用到网络，当前终端设备网络不可用，导致数据迁移暂停。

**解决方法**

单击“稍后连接WLAN加载”按钮，进入桌面后连接网络，终端设备网络可用后，恢复应用数据迁移。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e6/v3/oYUMT7cVRgWA3frScAwBEw/zh-cn_image_0000002497754186.png?HW-CC-KV=V1&HW-CC-Date=20260414T041248Z&HW-CC-Expire=86400&HW-CC-Sign=07F4C556E0CF808977161B4A77FA8792207CE8283B14FCD7909A0AF50A92CC63)

## 应用数据迁移执行十五分钟后失败

**问题现象**

应用数据迁移执行十五分钟后显示失败。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/0a/v3/2jRTp022TMOLanyBAGb0AQ/zh-cn_image_0000002497754188.png?HW-CC-KV=V1&HW-CC-Date=20260414T041248Z&HW-CC-Expire=86400&HW-CC-Sign=6A2205A79B1185D10E1BF9CFCC6EFF0ADD97416C6A5B3331615336C0BC946583 "点击放大")

**可能原因**

单个应用数据迁移执行超过十五分钟，超过设定的单个应用最长数据迁移时间，任务执行失败。

**解决方法**

请优化应用BackupExtensionAbility的代码实现，在十五分钟内完成应用数据迁移。

说明

已接入“数据迁移框架”的应用完成数据迁移后，才可以被消费者使用。尽可能快的完成应用数据迁移，可以带给消费者更好的体验。