可下载并参考[示例代码-客户端](https://gitcode.com/HarmonyOS_Samples/payment-kit-sample-code-clientdemo-arkts)，以此来快速的完成商户端侧应用开发环境的构建。

通过下载示例代码或商户自行创建端侧应用后，需完成以下配置：

1. 配置bundleName
2. 配置应用属性

## 配置bundleName

在HarmonyOS应用/元服务“AppScope/app.json5”下的**bundleName**配置需要与开发者在[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)中[创建应用](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)时的包名保持一致。

配置内容示例如下：

收起

自动换行

深色代码主题

复制

```
1. {
2. "app": {
3. // bundleName需要与开发者在AppGallery Connect中创建应用时的包名保持一致
4. "bundleName": "com.huawei.******.******.demo",
5. // ...
6. }
7. }
```

## 配置应用属性

在HarmonyOS应用/元服务“entry/src/main/module.json5”文件中**module**的**metadata**节点下增加**client\_id**和**app\_id**属性配置。

配置内容示例如下：

收起

自动换行

深色代码主题

复制

```
1. {
2. "module": {
3. // ...
4. "metadata": [
5. {
6. "name": "app_id",
7. "value": "..."
8. },
9. {
10. "name": "client_id",
11. "value": "..."
12. },
13. // ...
14. ]
15. }
16. }
```

* 其中**app\_id**的value的值为应用的APP ID（在[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)网站点击“开发与服务”，在项目列表中找到项目，在“项目设置 > 常规”页面的“应用”区域获取“APP ID”的值），详见下图的**标号1**处。
* 其中**client\_id**的value的值为应用的OAuth 2.0客户端ID（在[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)网站点击“开发与服务”，在项目列表中找到项目，在“项目设置 > 常规”页面的“应用”区域获取“OAuth 2.0客户端ID（凭据）：Client ID”的值），详见下图的**标号2**处。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/60/v3/j4XIK12ATByOjZZyF_C3cw/zh-cn_image_0000002419450372.png?HW-CC-KV=V1&HW-CC-Date=20260414T031958Z&HW-CC-Expire=86400&HW-CC-Sign=F1DBABE5EE34AFC011298D21D1DA0B7B7C8F523F8D772831000D18DB05DCA559 "点击放大")