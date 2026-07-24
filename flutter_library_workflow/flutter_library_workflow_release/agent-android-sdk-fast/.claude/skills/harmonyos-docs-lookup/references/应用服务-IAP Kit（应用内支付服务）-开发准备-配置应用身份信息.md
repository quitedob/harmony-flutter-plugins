## bundleName配置

工程“AppScope/app.json5”下的**bundleName**需要与开发者在应用开发准备中[创建应用](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/application-dev-overview#section13566816173114)时的包名保持一致。

配置内容示例如下：

收起

自动换行

深色代码主题

复制

```
1. {
2. "app": {
3. // bundleName需要与开发者在AppGallery Connect中创建应用时的包名保持一致
4. "bundleName": "com.huawei.***.***.demo",
5. // ...
6. }
7. }
```

## 配置应用身份信息

1. 登录[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)平台，在“开发与服务”中选择目标项目，通过“项目设置 > 常规 > 应用”获取目标应用的**Client ID**。

   说明

   * 下图中的APP ID可用于服务器API接口请求。
   * 如果开发者应用的compatibleSdkVersion>=14，则接入IAP Kit不要求开发者[添加公钥指纹](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/application-dev-overview#section1726913517284) 以及配置应用身份信息。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7c/v3/W3LAa_qHQrOzAtCIlO73ew/zh-cn_image_0000002413332486.png?HW-CC-KV=V1&HW-CC-Date=20260414T031030Z&HW-CC-Expire=86400&HW-CC-Sign=7551E7CD86250A845CAB1AE234E2E4BA5F55C06D18A0E51AE1243148FDCB1C38 "点击放大")
2. 在工程“entry/src/main/module.json5”的**module**节点增加如下**client\_id**属性配置，用于IAP Kit接口的应用身份鉴权。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. {
   2. "module":{
   3. "type": "***",
   4. "name": "***",
   5. "description": "***",
   6. "mainElement": "***",
   7. "deviceTypes": [***],
   8. // ...
   9. "metadata": [
   10. {
   11. "name": "client_id",
   12. "value": "***"
   13. }
   14. // ...
   15. ]
   16. }
   17. }
   ```