为保护用户隐私，Wear Engine的API需要用户授权才可以正常访问。建议开发者在用户首次调用Wear Engine开放能力的时候执行本章节操作。

## 申请用户穿戴设备权限

应用拉起华为账号登录和授权界面，由用户授权相应的数据访问权限。用户可以自主选择授权的数据类型，可以只授权部分数据权限。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/04/v3/ZLLlYBidQIGnSp3-sKo9Qg/zh-cn_image_0000002155046632.png?HW-CC-KV=V1&HW-CC-Date=20260414T050129Z&HW-CC-Expire=86400&HW-CC-Sign=FB570C787C65999BC1902D90BC5C7AFE4A588DEB240951BB3683D43F6C1F2480 "点击放大")

1. 应用调用[wearEngine](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api)中的[getAuthClient](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section17606835182712)方法，获取[AuthClient](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section876918413377)对象。
2. 定义需要用户授权的权限请求类[AuthorizationRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section12513135291215)。
3. 调用[requestAuthorization](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section172541457203810)方法，向用户请求权限。执行成功后，会弹出授权界面，让用户选择授予权限（若未登录华为账号则会先弹出登录界面）。当用户允许后才能正常使用接口，否则会遇到错误码为201的提示。

   说明

   * 请确保向用户请求的权限已在[申请接入Wear Engine服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/wearengine_apply)中审批通过，否则会遇到错误码为1008500004的提示。
   * 该功能可以多次调用，如果申请的权限之前已经授予了，不会再弹出授权页面，接口会返回已经授权的权限。
   * 通过入参的[AuthorizationRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section12513135291215)对象，获取应用需要的权限。参见[步骤3中权限说明](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/wearengine_apply#zh-cn_topic_0000001073008985_li5158124634712)了解应用所需请求的权限类型。
   * 通过[AuthorizationResponse](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section1536013509131)对象，返回用户的授权结果。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 在使用Wear Engine服务前，请导入WearEngine与相关模块
   2. import { wearEngine } from '@kit.WearEngine';
   3. import { BusinessError } from '@kit.BasicServicesKit';

   5. // 步骤1：获取AuthClient对象
   6. let authClient: wearEngine.AuthClient = wearEngine.getAuthClient(this.getUIContext().getHostContext());

   8. // 步骤2：基于需要用户授权的权限定义权限请求类
   9. let request: wearEngine.AuthorizationRequest = {
   10. permissions: [wearEngine.Permission.USER_STATUS]
   11. }

   13. // 步骤3：请求用户授权
   14. authClient.requestAuthorization(request).then(result => {
   15. console.info(`Succeeded in requesting authorize, authorized permissions is ${result.permissions}`);
   16. }).catch((error: BusinessError) => {
   17. console.error(`Failed to request authorize. Code is ${error.code}, message is ${error.message}`);
   18. })
   ```

## 查询用户授权结果

用于查询已被用户授予的应用权限。如果所需权限用户未授权，请参见上一节[申请用户穿戴设备权限](/consumer/cn/doc/harmonyos-guides/request_user_authorization#zh-cn_topic_0000001073917086_section7157142771512)向用户请求权限。建议在请求用户授权前，先使用该接口查询应用是否已有相关权限。

说明

请确保权限已在[申请接入Wear Engine服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/wearengine_apply)中审批通过，否则会遇到错误码为1008500004的提示。

1. 应用调用[wearEngine](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api)中的[getAuthClient](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section17606835182712)方法，获取[AuthClient](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section876918413377)对象。
2. 调用[getAuthorization](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section36125238476)方法，查询用户已授权的权限。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 在使用Wear Engine服务前，请导入WearEngine与相关模块
   2. import { wearEngine } from '@kit.WearEngine';
   3. import { BusinessError } from '@kit.BasicServicesKit';

   5. // 步骤1：获取AuthClient对象
   6. let authClient: wearEngine.AuthClient = wearEngine.getAuthClient(this.getUIContext().getHostContext());

   8. // 步骤2：调用API查询已授权权限
   9. authClient.getAuthorization().then(result => {
   10. console.info(`Succeeded in getting authorized permissions, authorized permissions is ${result.permissions}`);
   11. }).catch((error: BusinessError) => {
   12. console.error(`Failed to get authorized permissions. Code is ${error.code}, message is ${error.message}`);
   13. })
   ```