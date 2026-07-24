## 场景介绍

Push Kit支持您使用HTTPS协议接入云侧，使用场景化V3接口发送场景化消息，并将不同场景定义为不同push-type。

您可发送的场景化消息类型如下表：

展开

| push-type | 名称 |
| --- | --- |
| 0 | Alert消息（通知消息） |
| 1 | 卡片刷新（Wearable、TV不支持） |
| 2 | 语音播报消息（TV不支持） |
| 6 | 后台消息 |
| 7 | 实况窗消息（Wearable、TV、PC/2in1不支持） |
| 10 | 应用内通话消息（Wearable、TV、PC/2in1不支持） |

有关场景化消息的更详细说明，请参见REST API-[场景化消息API接口](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/push-rest-api-scenes)。

## 开发步骤

1. 您的服务端获取鉴权令牌，详情请参见[基于服务账号生成鉴权令牌](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/push-jwt-token)。
2. 您的服务端调用API发送Push场景化消息，更多消息内容请参见REST API-[场景化消息API接口](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/push-rest-api-scenes)。

   **HTTPS POST URL：**

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. POST https://push-api.cloud.huawei.com/v3/[projectId]/messages:send
   ```

   “[projectId]”请替换为您应用的项目ID。登录[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)网站，选择“开发与服务”，在项目列表中选择对应的项目，左侧导航栏选择“项目设置”，在该页面获取“项目ID”。

   **请求消息头示例：**

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. Content-Type: application/json
   2. Authorization: Bearer eyJr*****OiIx---****.eyJh*****iJodHR--***.QRod*****4Gp---****
   3. push-type: 0
   ```

   * 请求消息头中的Authorization参数为"Bearer "拼接上您在上一步[在线生成服务账号鉴权令牌](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/push-jwt-token)中获取的鉴权令牌。
   * 请求消息头中的push-type参数为场景化消息类型，0代表Alert消息（通知消息）。

   **通知消息体示例：**

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. {
   2. "payload": {
   3. "notification": {
   4. "category": "MARKETING",
   5. "title": "普通通知标题",
   6. "body": "普通通知内容",
   7. "clickAction": {
   8. "actionType": 0
   9. },
   10. "notifyId": 12345
   11. }
   12. },
   13. "target": {
   14. "token": ["MAMzLg**********lPW"]
   15. },
   16. "pushOptions": {
   17. "testMessage": true
   18. }
   19. }
   ```

   * 更多场景化消息示例可参见[请求示例](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/push-scenariozed-api-request-example)。
   * 建议您在开发代码前先使用Postman等调试工具发送消息，测试功能。
3. （可选）您的应用服务器接收Push Kit的消息回执，详情请参见[消息回执](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/push-msg-receipt)。

说明

Push Kit提供了基于Java语言的服务端示例代码（包括申请鉴权令牌、发送通知消息、卡片刷新消息等功能），方便您参考使用，详情请参见[示例代码](https://gitcode.com/HarmonyOS_Samples/push-kit_-sample-code_-server-demo_-java)。

## AppGallery Connect在线推送通知消息

注意

**当前仅支持配置Alert消息**。

1. 登录[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)网站，点击“开发与服务”，在项目列表中选择对应的项目，左侧导航栏选择“项目设置”。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/97/v3/68fvPwx_SKS-SiI9AU0bng/zh-cn_image_0000002505126943.png?HW-CC-KV=V1&HW-CC-Date=20260414T032706Z&HW-CC-Expire=86400&HW-CC-Sign=91CE909858F2177BE64F210AE6FA9E7F67F6EB8070362E09670F33D4439279F5)
2. 在项目列表中找到您的项目，通过“增长 > 推送服务 > 推送通知（V3 Beta）”导航到“推送通知（V3 Beta）”页签。在该页签下点击“添加推送通知”新建推送任务。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9c/v3/Vz_0jJceQCmQvyQKe_Z6UQ/zh-cn_image_0000002402305777.png?HW-CC-KV=V1&HW-CC-Date=20260414T032706Z&HW-CC-Expire=86400&HW-CC-Sign=82A83D140B314E0D00A141579DA71E7C7A719E9277CDCCD296D0AF267F38D874 "点击放大")
3. 这里以Alert消息举例，配置参数如下。
   * **配置推送任务**

     ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2f/v3/xA8jOkT0RxevU_ZuhT8lAA/zh-cn_image_0000002368546044.png?HW-CC-KV=V1&HW-CC-Date=20260414T032706Z&HW-CC-Expire=86400&HW-CC-Sign=A546F066E2DB8E041D040192AC8CAD2997DC9F47C22A99ED90405E3295DD1F94 "点击放大")

     展开

     | 字段值 | 说明 |
     | --- | --- |
     | 选择应用 | 必填字段，消息发送的目标应用。 |
     | 名称 | 必填字段，用于在管理台中标识通知，此名称不会给用户显示。 |
     | 场景化类型 | 场景化消息类型，**当前仅支持Alert消息**。 |
   * **配置推送内容-****通用参数**

     ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d5/v3/v1UzyMs4SX2IhV8sbgk8XA/zh-cn_image_0000002368546028.png?HW-CC-KV=V1&HW-CC-Date=20260414T032706Z&HW-CC-Expire=86400&HW-CC-Sign=E68F42D5F812A245C7364FFE9DF063EB9570F2AA13151A97369C71D402B4AF58 "点击放大")

     展开

     | 字段值 | 说明 |
     | --- | --- |
     | 是否测试消息 (testMessage) | 必选字段，对应场景化接口中的testMessage参数；  测试消息标识：  + false：正式消息 + true：测试消息**（默认值）** |
     | 离线消息缓存机制 (collapseKey) | 可选字段，对应场景化接口中的collapseKey参数；  离线消息缓存控制方式，取值范围-1~100：  + -1：对所有离线消息都缓存（**默认值）**； + 0~100：离线消息缓存分组标识，对离线消息进行分组缓存，每个应用每一组只缓存一条最新的离线消息。 |
     | 消息缓存时间 (ttl) | 可选字段，对应场景化接口中的ttl参数；  消息缓存时间，单位是秒。在用户设备离线时，消息在Push服务器进行缓存，在消息缓存时间内用户设备上线，消息会下发，超过缓存时间后消息会丢弃，**默认值为86400秒（1天）**，最大值为15天。 |
     | 批量任务消息标识 (biTag) | 可选字段，对应场景化接口中的biTag参数；  批量任务消息标识，[消息回执](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/push-msg-receipt)时会返回给应用服务器，长度最大64字节。 |
     | 回执ID (receiptId) | 可选字段，对应场景化接口中的receiptId参数；  回执ID指定本次下行消息的回执地址及配置。该回执ID可以在[配置回执参数](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/push-msg-receipt#section462935643010)中查看。 |
   * **配置推送内容-发送目标设备**

     ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d5/v3/098RQe_GTyuCWJGpQPo4tw/zh-cn_image_0000002368705912.png?HW-CC-KV=V1&HW-CC-Date=20260414T032706Z&HW-CC-Expire=86400&HW-CC-Sign=1CE88116546787276A2B0DD961A85BDB464961D790A84BC0255F92187E3AAA6A)

     展开

     | 字段值 | 说明 |
     | --- | --- |
     | 设备Token (token) | 必填字段，对应场景化接口中的token参数；  按照Token向目标用户推送消息**。**  **样例：MAMzL\*\*\*\*\*\*\*** |
   * **配置推送内容-消息内容**

     ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/95/v3/3d1ATClCTpSEAI3ocr-7dg/zh-cn_image_0000002368546032.png?HW-CC-KV=V1&HW-CC-Date=20260414T032706Z&HW-CC-Expire=86400&HW-CC-Sign=CD1B2F4122949B826AD04DDE5D3D3A38E46EBA6A7B907602B0FDECE6959BE0F8 "点击放大")

     展开

     | 字段值 | 说明 |
     | --- | --- |
     | 消息类别 (category) | 必填字段，对应场景化接口中的category参数；  通知消息类别。完成[申请通知消息自分类权益](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/push-apply-right#section16708911111611)后，用于标识消息类型，不同的通知消息类型影响消息展示和提醒方式。取值如下：  + 即时聊天：IM + 音视频通话：VOIP + 订阅：SUBSCRIPTION + 出行：TRAVEL + 健康：HEALTH + 工作事项提醒：WORK + 账号动态：ACCOUNT + 订单&物流：EXPRESS + 财务：FINANCE + 设备提醒：DEVICE\_REMINDER + 邮件：MAIL + 新闻、内容推荐、社交动态、产品促销、财经动态、生活资讯、调研、功能推荐、运营活动（仅对内容进行标识，不会加快消息发送），统称为资讯营销类消息：MARKETING + PLAY\_VOICE：语音播报 |
     | 消息标题 (title) | 必填字段，对应场景化接口中的title参数；  通知消息标题。 |
     | 消息内容 (body) | 必填字段，对应场景化接口中的body参数；  通知消息内容。 |
     | 点击通知动作 (actionType) | 必填字段，对应场景化接口中的clickAction中actionType参数；  点击消息后触发的动作，可选择打开应用首页、自定义action页面或自定义intentUri页面。 |
4. 当您完成上述步骤后，点击右上方“提交”按钮即可推送消息。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9e/v3/W53c9peKTIueLPsiSok9-w/zh-cn_image_0000002402225617.png?HW-CC-KV=V1&HW-CC-Date=20260414T032706Z&HW-CC-Expire=86400&HW-CC-Sign=82A02B8B80615E6D24BBDAEAD75393B0128DAFB6743F49F15F7A556B3D3A560A)

   注意

   预览效果仅供参考，请以客户端实际效果为准。