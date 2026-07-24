**问题现象**

调用接口报错1001502014 应用未申请scopes或permissions权限。

**可能原因**

1. 没有申请对应的账号权限。
2. 权限申请成功后，最迟会在25小时后生效。
3. 使用[获取风险等级](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/account-get-risklevel)能力，但未申请获取风险等级权限。

**解决措施**

1. 申请对应权限，请见[申请账号权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/account-config-permissions)章节。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b8/v3/nRew2fGuRUWl1pY5fAN9pw/zh-cn_image_0000002497063284.png?HW-CC-KV=V1&HW-CC-Date=20260414T024828Z&HW-CC-Expire=86400&HW-CC-Sign=E5AE8A0E826DD0239D32EA6CF3F3DB6EEE8A66E4F2A573B4F881C48FEE9228AB "点击放大")
2. 权限申请通过后，您可通过修改应用工程 > app.json5中的versionCode触发权限生效。

   **图1** 修改前  
   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/fa/v3/2l76ELreTEyHkFU-SYxLgA/zh-cn_image_0000002528823271.png?HW-CC-KV=V1&HW-CC-Date=20260414T024828Z&HW-CC-Expire=86400&HW-CC-Sign=F4B22E8E2F477A84C14B12C7B7CA17A586D8C2D453042F5EB79A730B2F34568E)

   **图2** 修改后  
   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d3/v3/dqMRx_jdQciBb1i1geel8Q/zh-cn_image_0000002528943239.png?HW-CC-KV=V1&HW-CC-Date=20260414T024828Z&HW-CC-Expire=86400&HW-CC-Sign=3072754D27433B7205167C42E2E440EC61F3C27D014D0BEF53EDCCDAA542D5E6)
3. 确认是否需要使用获取风险等级能力，如需使用，请参考[获取风险等级](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/account-get-risklevel)申请对应权限。