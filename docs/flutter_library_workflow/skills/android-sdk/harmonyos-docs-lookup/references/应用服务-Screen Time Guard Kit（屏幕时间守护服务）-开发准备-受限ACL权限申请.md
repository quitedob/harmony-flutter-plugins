1. 在 [申请调试Profile](https://developer.huawei.com/consumer/cn/doc/app/agc-help-debug-profile-0000002248181278)和[发布Profile文件](https://developer.huawei.com/consumer/cn/doc/app/agc-help-release-profile-0000002248341090)之前，需要申请相应的ACL权限。

2. 登录[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html#/)，点击“开发与服务”，在项目列表中找到相应的项目，并点击选择您需要申请ACL权限的应用。在“项目设置”页面，选择“ACL权限”页签，开始为应用申请ACL权限。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6f/v3/S-P8FCnRTOqF1avH8ZLlYQ/zh-cn_image_0000002504425167.png?HW-CC-KV=V1&HW-CC-Date=20260414T033216Z&HW-CC-Expire=86400&HW-CC-Sign=A21750357D994A5CAF25D24D25F583896E00B24B2D074B02A1FC367A3AD4B412 "点击放大")

3. 在核对注意事项后，在“未获取权限”区域中勾选“我已知晓”。在权限搜索框中输入"ohos.permission.MANAGE\_SCREEN\_TIME\_GUARD"，查找并勾选权限，提交申请。

4. 根据实际业务需求填写申请原因并提交，提交后将在1个工作日回复。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/02/v3/Rm3BbShDTvKCAACbkaOdpw/zh-cn_image_0000002471625316.png?HW-CC-KV=V1&HW-CC-Date=20260414T033216Z&HW-CC-Expire=86400&HW-CC-Sign=B1F8BE85E31EBD6B246E8E23DD65E4F953679C024A8C52F4B8E26380CCF682F9)

5. 权限申请通过后，在申请profile文件时，在“申请权限”栏选中“受限ACL权限（HarmonyOS API9及以上）”选项，点击“选择”。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/42/v3/mqDMBmm8QX26Wkz25XL-mQ/zh-cn_image_0000002504425161.png?HW-CC-KV=V1&HW-CC-Date=20260414T033216Z&HW-CC-Expire=86400&HW-CC-Sign=2E065079EF4B5A1C0D787AED2134FF30763F68D91F151DC80637F730CB4975CE)

6. 在弹出的“选择受限ACL权限”窗口可以看到已申请的权限，勾选后点击确定。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ec/v3/5TYlPD78TpOVSTuQU6ncrA/zh-cn_image_0000002504465237.png?HW-CC-KV=V1&HW-CC-Date=20260414T033216Z&HW-CC-Expire=86400&HW-CC-Sign=A0963C5C8669BA1BC5861CAB03C5B7C060AA2F3AAFC6D5F8D6364E8A7B39B3C0 "点击放大")

7. 选择权限后点击“添加”生成新的Profile文件，下载后按[手动配置签名信息](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-signing#section297715173233)替换profile文件。

8. 在工程中entry模块的module.json5文件中添加"ohos.permission.MANAGE\_SCREEN\_TIME\_GUARD"权限，如下所示：

收起

自动换行

深色代码主题

复制

```
1. "requestPermissions": [{
2. "name": "ohos.permission.MANAGE_SCREEN_TIME_GUARD"
3. }]
```