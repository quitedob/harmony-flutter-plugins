**现象描述**

无法加载地图。

**可能原因**

1. 无网络。
2. 应用身份校验失败或地图权限未开通。
3. 未完成基本准备工作。

**处理步骤**

1. 检查是否存在日志：get network status error, code: 201, message:Permission denied。日志存在，说明应用缺少获取网络状态的权限。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/15/v3/oeIU1qoQQQuZeS44fdmy3g/zh-cn_image_0000002517280073.png?HW-CC-KV=V1&HW-CC-Date=20260414T031756Z&HW-CC-Expire=86400&HW-CC-Sign=00C8517C9D3A96E0E4A655F1BF8C4A4CC154969734D58441382EDE38B4315596)

   请在应用的module.json5文件中配置获取网络状态的权限。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. {
   2. "module" : {
   3. // ...
   4. "requestPermissions": [
   5. {
   6. "name": "ohos.permission.INTERNET",
   7. "usedScene": {
   8. "when": "always"
   9. }
   10. },
   11. {
   12. "name": "ohos.permission.GET_NETWORK_INFO",
   13. "usedScene": {
   14. "when": "always"
   15. }
   16. }
   17. ]
   18. }
   19. }
   ```

   请检查应用日志中是否存在日志：The network is unavailable。日志存在，说明设备网络存在问题，请检查网络状态。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2a/v3/ILsGJoDwSiupK-f_738EAg/zh-cn_image_0000002485000168.png?HW-CC-KV=V1&HW-CC-Date=20260414T031756Z&HW-CC-Expire=86400&HW-CC-Sign=D13830C5E8E7524A540B335259E3EFF67A858D782F166C499D4FF6B6AB19D831)
2. 请检查应用日志中是否存在日志：The app does not have map permission。日志存在，说明应用身份校验失败。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/75/v3/wUiC0GJvQRarMO4BcYfA0w/zh-cn_image_0000002517280077.png?HW-CC-KV=V1&HW-CC-Date=20260414T031756Z&HW-CC-Expire=86400&HW-CC-Sign=A86166A1A5CB5BD241EEAC02B686CBE55D4CA6A888EFB48B64F4E17EE86ADDCC)

   查看com.huawei.hms.mapservice进程日志，检查是否存在该日志：App authentication failed. code: 1002600003。参考[1002600003](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-errorcode#section104439246447)完成应用身份校验。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4e/v3/y4VTWjQBQBaV0Bpi_kyoYw/zh-cn_image_0000002517280075.png?HW-CC-KV=V1&HW-CC-Date=20260414T031756Z&HW-CC-Expire=86400&HW-CC-Sign=542FDD30A914DE76DE12BDC96E3032F31376A032AA3B0A8BD04B687D37D9C586)
3. 请参考“[应用开发准备](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/application-dev-overview)”检查是否完成基本准备工作。