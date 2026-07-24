## 场景介绍

当应用需要获取用户头像昵称信息，可使用Account Kit提供的头像昵称授权能力，用户允许应用获取头像昵称后，可快速完成个人信息填写。以下对Account Kit提供的头像昵称授权能力进行介绍，若要获取头像还可通过场景化控件[选择头像Button](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/scenario-fusion-button-chooseavatar)进行获取。

**图1** 手机端获取头像昵称（请以实际效果为准）   
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/df/v3/YHwPIZK-R8CWRZNxjtl-Zg/zh-cn_image_0000002497223312.png?HW-CC-KV=V1&HW-CC-Date=20260414T024709Z&HW-CC-Expire=86400&HW-CC-Sign=231D7A6FC607C372A48CF4FA0F04435446735A85044A27D37A3126F53252CB50 "点击放大")

**图2** Wearable设备获取头像昵称（请以实际效果为准）   
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1f/v3/-c1HM7aFR126fvwzx5Nj3g/zh-cn_image_0000002528943275.png?HW-CC-KV=V1&HW-CC-Date=20260414T024709Z&HW-CC-Expire=86400&HW-CC-Sign=07133E35B477A154E6AB107C135A92609504E267F9078A2E176CFCF183738D08 "点击放大")

## 约束与限制

获取头像昵称能力支持Phone、Tablet、PC/2in1设备。并且从5.1.0(18)版本开始，新增支持Wearable设备；从5.1.1(19)版本开始，新增支持TV设备。

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/23/v3/It72VuVfRBWbRaU6aUbtzw/zh-cn_image_0000002528823305.png?HW-CC-KV=V1&HW-CC-Date=20260414T024709Z&HW-CC-Expire=86400&HW-CC-Sign=7AAE255A13112179E3D30872E666133DC30C1688657D2B70CFC12E987FF7351A "点击放大")

流程说明：

1. 应用传对应scope调用授权API请求获取用户头像昵称。
2. 如用户已给应用授权，则开发者能直接获取用户头像昵称。
3. 如用户未授权，则授权请求会拉起授权页面，在用户确认授权后，开发者能获取到用户头像昵称。
4. 获取到头像url信息，开发者可以通过该url下载并使用用户头像。

## 接口说明

获取头像昵称关键接口如下表所示，具体API说明详见[API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-authentication)。

展开

| 接口名 | 描述 |
| --- | --- |
| [createAuthorizationWithHuaweiIDRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-authentication#section610319714214)(): [AuthorizationWithHuaweiIDRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-authentication#section12940173017165) | 获取授权请求对象接口，通过在[AuthorizationWithHuaweiIDRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-authentication#section12940173017165)对象中传入头像昵称的scope：profile及Authorization Code的permission：serviceauthcode，即可在授权结果中获取到用户头像昵称和Authorization Code。 |
| [constructor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-authentication#section9716526428)(context?: [common.Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-common#context)) | 创建授权请求Controller。 |
| [executeRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-authentication#section3975181884311)(request: [AuthenticationRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-authentication#section3118182610348)): Promise<[AuthenticationResponse](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-authentication#section2697164193515)> | 通过Promise方式执行授权操作。  头像昵称，可从[AuthenticationResponse](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-authentication#section2697164193515)的子类[AuthorizationWithHuaweiIDResponse](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-authentication#section10418450161620)中解析，具体解析方法请参考[客户端开发](/consumer/cn/doc/harmonyos-guides/account-get-avatar-nickname#section154801110677)的示例代码。 |

注意

1.上述接口需在页面或自定义组件生命周期内调用。

2.未设置昵称默认返回华为账号绑定的匿名手机号/邮箱。

## 开发前提

在进行代码开发前，请确保已按照“开发准备”章节中的指导完成[配置签名和指纹](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/account-sign-fingerprints)、[配置Client ID](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/account-client-id)。此场景无需申请账号权限。

注意

若未正确配置公钥指纹，将报错[1001500001 应用指纹证书校验失败](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/account-faq-1)。

## 开发步骤

### 客户端开发

1. 导入[authentication](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-authentication)模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { authentication } from '@kit.AccountKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';
   3. import { util } from '@kit.ArkTS';
   4. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 创建授权请求并设置参数。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 创建授权请求，并设置参数
   2. const authRequest = new authentication.HuaweiIDProvider().createAuthorizationWithHuaweiIDRequest();
   3. // 获取头像昵称需要传如下scope
   4. authRequest.scopes = ['profile'];
   5. // 若开发者需要进行服务端开发以获取头像昵称，则需传如下permission获取authorizationCode
   6. authRequest.permissions = ['serviceauthcode'];
   7. // 用户是否需要登录授权，该值为true且用户未登录或未授权时，会拉起用户登录或授权页面
   8. authRequest.forceAuthorization = true;
   9. // 用于防跨站点请求伪造
   10. authRequest.state = util.generateRandomUUID();
   ```
3. 调用[AuthenticationController](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-authentication#section620452019185)对象的[executeRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-authentication#section3975181884311)方法执行授权请求，并处理授权结果，从授权结果中解析出头像昵称和Authorization Code。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 执行授权请求
   2. try {
   3. // 此示例为代码片段，实际需在自定义组件实例中使用，以获取UIContext对象作为函数入参
   4. const controller = new authentication.AuthenticationController(this.getUIContext().getHostContext());
   5. controller.executeRequest(authRequest).then((data) => {
   6. const authorizationWithHuaweiIDResponse = data as authentication.AuthorizationWithHuaweiIDResponse;
   7. const state = authorizationWithHuaweiIDResponse.state;
   8. if (state && authRequest.state !== state) {
   9. hilog.error(0x0000, 'testTag', `Failed to authorize. The state is different, response state: ${state}`);
   10. return;
   11. }
   12. hilog.info(0x0000, 'testTag', 'Succeeded in authentication.');
   13. const authorizationWithHuaweiIDCredential = authorizationWithHuaweiIDResponse?.data;
   14. const avatarUri = authorizationWithHuaweiIDCredential?.avatarUri;
   15. const nickName = authorizationWithHuaweiIDCredential?.nickName;
   16. // 开发者处理avatarUri, nickName
   17. const authorizationCode = authorizationWithHuaweiIDCredential?.authorizationCode;
   18. // 涉及服务端开发以获取头像昵称场景，开发者处理authorizationCode
   19. }).catch((err: BusinessError) => {
   20. dealAllError(err);
   21. });
   22. } catch (error) {
   23. dealAllError(error);
   24. }
   ```

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 错误处理
   2. function dealAllError(error: BusinessError): void {
   3. hilog.error(0x0000, 'testTag', `Failed to obtain userInfo. Code: ${error.code}, message: ${error.message}`);
   4. // 在应用获取头像昵称场景下，涉及UI交互时，建议按照如下错误码指导提示用户
   5. if (error.code === ErrorCode.ERROR_CODE_LOGIN_OUT) {
   6. // 用户未登录华为账号，请登录华为账号并重试
   7. } else if (error.code === ErrorCode.ERROR_CODE_NETWORK_ERROR) {
   8. // 网络异常，请检查当前网络状态并重试
   9. } else if (error.code === ErrorCode.ERROR_CODE_USER_CANCEL) {
   10. // 用户取消授权
   11. } else if (error.code === ErrorCode.ERROR_CODE_SYSTEM_SERVICE) {
   12. // 系统服务异常，请稍后重试
   13. } else if (error.code === ErrorCode.ERROR_CODE_REQUEST_REFUSE) {
   14. // 重复请求，应用无需处理
   15. } else {
   16. // 获取用户信息失败，请稍后重试
   17. }
   18. }

   20. export enum ErrorCode {
   21. // 账号未登录
   22. ERROR_CODE_LOGIN_OUT = 1001502001,
   23. // 网络错误
   24. ERROR_CODE_NETWORK_ERROR = 1001502005,
   25. // 用户取消授权
   26. ERROR_CODE_USER_CANCEL = 1001502012,
   27. // 系统服务异常
   28. ERROR_CODE_SYSTEM_SERVICE = 12300001,
   29. // 重复请求
   30. ERROR_CODE_REQUEST_REFUSE = 1001500002
   31. }
   ```

### 服务端开发（可选）

开发者根据业务需要选择是否进行服务端开发。

1. 应用服务端使用Client ID、Client Secret、Authorization Code调用[获取用户级凭证接口](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-obtain-user-token#section1085901313579)向华为账号服务器请求获取Access Token、Refresh Token。
2. 使用Access Token调用[获取用户信息接口](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-get-user-info-get-nickname-and-avatar#section2520125725115)获取用户信息，从用户信息中获取用户头像昵称。

   **Access Token过期处理**

   由于Access Token的有效期仅为60分钟，当Access Token失效或者即将失效时（可通过[REST API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-get-user-info-get-nickname-and-avatar#section15782984912)判断），可以使用Refresh Token（有效期180天）通过[刷新用户级凭证接口](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-obtain-refresh-token#section1085901313579)向华为账号服务器请求获取新的Access Token。

   说明

   1. 当Access Token失效时，若您不使用Refresh Token向账号服务器请求获取新的Access Token，账号的授权信息将会失效，导致使用Access Token的功能都会失败。
   2. 当Access Token非正常失效（如修改密码、退出账号、删除设备）时，业务可重新登录授权获取Authorization Code，向账号服务器请求获取新的Access Token。

   **Refresh Token过期处理**

   由于Refresh Token的有效期为180天，当Refresh Token失效后（可通过[REST API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-obtain-refresh-token#section1394417423453)判断），应用服务端需要通知客户端，重新调用授权接口，请求用户重新授权。