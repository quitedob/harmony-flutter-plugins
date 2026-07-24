**问题现象**

运行应用时提示“appid \*\*\*\* is not in white list, to skip”。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c2/v3/rE5Qk6l3QTe6pMYFuS7lqA/zh-cn_image_0000002474214429.png?HW-CC-KV=V1&HW-CC-Date=20260414T030012Z&HW-CC-Expire=86400&HW-CC-Sign=B796B0BBC93BEB20E10339102EE27970D6C683DB72A6EDBD4DC85CB4B176AB2D)

**解决措施**

出现此错误，是因为手机白名单中未包含当前应用。可按照如下步骤排查和解决：

1. 确认云侧是否已开通云函数和预加载服务。须确保已成功开通。
2. 确认日志中提示的APP ID前缀与云侧创建应用的实际APP ID是否一致。若两者不一致，可能使用了错误的签名方式。请更改为[关联注册应用进行自动签名](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-signing#section20943184413328)或者[手动签名](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-signing#section297715173233)方式。
3. 手机端进入“设置->系统->日期和时间”，关闭“自动设置”开关，将“日期”往后加1天，然后卸载应用重新安装，应用会自动更新白名单。