终端设备从HarmonyOS 3.x/4.x（简称HarmonyOS）升级到HarmonyOS NEXT/5.0.x及之后版本（简称HarmonyOS NEXT）。

1. HarmonyOS APK应用使用OpenID关联用户数据时，将用户数据关系切换成UnionID，具体切换指导可以参考：[通过OpenID获取UnionID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-get-unionid)。
2. HarmonyOS APK应用使用UnionID关联用户数据时，在HarmonyOS NEXT/5.0.x上接入华为账号一键登录获取手机号后，应用需要同时将UnionID和手机号与用户信息进行关联，最终实现应用使用华为账号一键登录和手机号登录数据互通。详细流程可以参考：[用户场景设计](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/account-phone-unionid-login#section4654113502814)。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1d/v3/WZuLX4vtT1-8ok2VuspJhQ/zh-cn_image_0000002497063310.png?HW-CC-KV=V1&HW-CC-Date=20260414T024846Z&HW-CC-Expire=86400&HW-CC-Sign=B532B64B74EE218A0F18BF2846CC78A99C6FAC78381CB1DF154456B73EDD5FED "点击放大")