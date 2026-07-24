## 场景介绍

从5.1.1(19)版本开始，新增支持人脸核身实人验证场景。

开发者需要验证当前应用/元服务操作的用户的信息且验证是否为用户本人操作时，可接入人脸核身实人验证能力。

支持商户模型：不涉及

人脸核身实人验证页面展示：

|  |  |  |
| --- | --- | --- |
|  |  |  |
| 人脸核身实人验证授权页面 | 人脸核身实人验证通过页面 |  |

## 约束与限制

为确保人脸识别的准确性，必须在全屏模式下调用人脸核身实人验证功能。

以下场景均不支持：

1. 特殊显示模式：半模态、上下分屏、左右分屏、单手模式、分栏、悬浮窗、智慧多窗、自由多窗等。
2. 设备模式：PC模式、直板机横屏模式。
3. 折叠设备：上下折叠手机外屏、折叠电脑全展开状态。

## 接入流程

华为支付人脸核身实人验证接入流程如下：

展开

| 步骤 | 说明 |
| --- | --- |
| 开发准备 | 请先完成开发准备后再进行下面的开发接入。   * [端侧应用配置](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/payment-config-app-identity-info) * [用户身份验证服务接入准备](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/payment-real-name-preparations) |
| 接入人脸核身实人验证 | 根据人脸核身实人验证场景[开发步骤](/consumer/cn/doc/harmonyos-guides/payment-real-name-face-verification#section9187179113620)完成接入。 |

## 业务流程

开发者通过接入人脸核身实人验证能力，可以简便快捷的实现用户信息验证及本人操作的验证。具体接入流程如下：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9/v3/K2uzl7dZR52CeNIwGrw_sQ/zh-cn_image_0000002419450444.png?HW-CC-KV=V1&HW-CC-Date=20260414T032144Z&HW-CC-Expire=86400&HW-CC-Sign=C799EB9D6F8596445D2314981E194E21A418B4AE7C2E897A73460CE92C3CC4F9 "点击放大")

1. 开发者客户端收集用户实名信息加密后请求开发者服务端发起人脸核身实人预验证。
2. 开发者服务端请求Payment Kit服务端[人脸核身实人预验证](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-api-common-face-verifactaion-preverify)接口获取预验证ID（preVerifyId）。
3. Payment Kit服务端解密并获取请求传入的用户实名信息进行验证处理。
4. Payment Kit服务端验证用户实名信息通过后，返回预验证ID给开发者服务端。
5. 开发者服务端返回预验证信息给开发者客户端。
6. 开发者客户端使用预验证ID调用[startFaceVerification](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-realnameservice#section9137162021115)接口拉起人脸核身实人验证页面。
7. Payment Kit客户端展示验证信息。
8. 用户同意并完成人脸验证，Payment Kit客户端请求Payment Kit服务端处理验证。
9. Payment Kit服务端完成人脸验证处理并返回验证结果给Payment Kit客户端。
10. Payment Kit客户端将验证结果展示给用户。
11. Payment Kit客户端同步返回身份信息验证ID给开发者客户端。
12. 开发者客户端使用身份信息验证Id请求开发者服务端查询身份信息验证结果。
13. 开发者服务端请求Payment Kit服务端[人脸核身实人验证](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-api-common-face-verifactaion-result)接口查询验证结果。
14. Payment Kit服务端返回人脸核身实人验证结果给开发者服务端。
15. 开发者服务端将人脸核身实人验证结果返回给开发者客户端，开发者客户端根据验证结果进行下一步业务处理。

## 接口说明

拉起用户人脸核身实人验证页面的接口。具体API说明详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-realnameservice#section9137162021115)。

展开

| 接口名 | 描述 |
| --- | --- |
| startFaceVerification(context: common.UIAbilityContext | common.UIExtensionContext, preVerifyId: string): Promise<string>; | 拉起用户人脸核身实人验证（人脸验证）页面。 |

## 开发步骤

### 发起人脸核身预验证（服务器开发）

调用[人脸核身实人预验证](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-api-common-face-verifactaion-preverify)接口获取预验证ID后返回给端侧拉起人脸核身实人验证页面。服务器开发步骤可参考[实名信息验证/授权场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/payment-real-name-verification#section13180123511)服务器开发实现。

### 拉起人脸核身实人验证（端侧开发）

开发者客户端使用后端服务返回的预授权ID作为参数调用[startFaceVerification](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-realnameservice#section9137162021115)接口拉起用户人脸核身实人验证页面。当接口通过.then()方法返回时，则表示当前接口请求成功，通过.catch()方法返回表示接口请求失败。当此次请求有异常时，可通过**error.code**获取错误码，错误码相关信息请参见[错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-error-code)。示例代码如下：

收起

自动换行

深色代码主题

复制

```
1. import { BusinessError } from '@kit.BasicServicesKit';
2. import { realNameService } from '@kit.PaymentKit';
3. import { common } from '@kit.AbilityKit';

5. @Entry
6. @Component
7. struct Index {
8. context: common.UIAbilityContext = this.getUIContext().getHostContext() as common.UIAbilityContext;
9. requestStartFaceVerificationPromise() {
10. // use your own preVerifyId
11. let preVerifyId = '后端服务获取有效的预验证ID';
12. realNameService.startFaceVerification(this.context, preVerifyId)
13. .then((verifyResultId: string ) => {
14. // face verification success
15. console.info(`succeeded in face verifying, verifyResultId: ${verifyResultId}`);
16. })
17. .catch((error: BusinessError) => {
18. // failed to face verification
19. console.error(`failed to face verification, error.code: ${error.code}, error.message: ${error.message}`);
20. });
21. }

23. build() {
24. Column() {
25. Button('requestStartFaceVerificationPromise')
26. .type(ButtonType.Capsule)
27. .width('50%')
28. .margin(20)
29. .onClick(() => {
30. this.requestStartFaceVerificationPromise();
31. })
32. }
33. .width('100%')
34. .height('100%')
35. }
36. }
```

### 查询人脸核身实人验证结果（服务器开发）

调用[人脸核身实人验证](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-api-common-face-verifactaion-result)接口查询验证结果。