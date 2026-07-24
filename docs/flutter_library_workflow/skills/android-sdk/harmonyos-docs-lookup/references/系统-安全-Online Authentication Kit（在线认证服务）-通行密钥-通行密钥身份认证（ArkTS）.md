## 接口说明

通行密钥服务主要接口如下表。

展开

| 接口名 | 描述 |
| --- | --- |
| [getClientCapabilities](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/onlineauthentication-passkey-api#section1122315266414)(context: common.Context): Promise<Map<[ClientCapability](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/onlineauthentication-passkey-api#section44620019103), boolean>> | 查询当前设备支持的客户端能力列表。 |
| [getPlatformAuthenticators](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/onlineauthentication-passkey-api#section36194215542)(context: common.Context): Promise<Array<[AuthenticatorMetadata](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/onlineauthentication-passkey-api#section107571524911)>> | 查询当前设备支持的平台认证器能力列表（人脸、指纹、PIN码）。 |
| [register](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/onlineauthentication-passkey-api#section1447385117810)(context: common.Context, options: [CredentialCreationOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/onlineauthentication-passkey-api#section3125554145615), tokenBinding?: [TokenBinding](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/onlineauthentication-passkey-api#section3745131173015)): Promise<[PublicKeyAttestationCredential](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/onlineauthentication-passkey-api#section10797172295315)> | 进行通行密钥的注册。 |
| [authenticate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/onlineauthentication-passkey-api#section193521359131510)(context: common.Context, options: [CredentialRequestOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/onlineauthentication-passkey-api#section433810416530), tokenBinding?: [TokenBinding](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/onlineauthentication-passkey-api#section3745131173015)): Promise<[PublicKeyAssertionCredential](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/onlineauthentication-passkey-api#section16498195211554)> | 进行通行密钥的认证。 |

## 开发步骤

通行密钥服务提供基于FIDO2标准协议的FIDO客户端实现，这里仅演示FIDO客户端相关API的使用，涉及FIDO服务器的相关处理由开发者自行实现，请参考[FIDO2标准协议](https://fidoalliance.org/passkeys/)（见[网站链接免责声明](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/onlineauthentication-website-disclaimer)）。

1. 需要业务方自行根据FIDO2标准协议部署FIDO服务器。
2. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';
   2. import { UIContext } from '@kit.ArkUI';
   3. import { common } from '@kit.AbilityKit';
   4. import { fido2 } from '@kit.OnlineAuthenticationKit';
   ```
3. 注册通行密钥。
   1. 获取能力信息，调用getClientCapabilities接口获取客户端能力列表，并且调用getPlatformAuthenticators接口获取平台认证器能力信息。

      收起

      自动换行

      深色代码主题

      复制

      ```
      1. uiContext1: UIContext = this.getUIContext();
      2. uiContext: common.UIAbilityContext = this.uiContext1.getHostContext() as common.UIAbilityContext; // 使用uiContext需要获取页面UIAbility的Context，一个页面获取一次即可

      4. try {
      5. // 获取客户端能力列表
      6. let clientCapabilities: Map<fido2.ClientCapability, boolean> = await fido2.getClientCapabilities(this.uiContext);
      7. console.info("Succeeded in doing getClientCapabilities.");
      8. } catch (error) {
      9. let message = (error as BusinessError).message;
      10. let code = (error as BusinessError).code;
      11. console.error(`Failed to call getClientCapabilities error code is ${code}, message is ${message}`);
      12. // 业务根据错误码判断异常类型，进行相应处理，详见错误码参考
      13. }

      15. try {
      16. // 获取平台认证器能力
      17. let platformAuthenticators: Array<fido2.AuthenticatorMetadata> =
      18. await fido2.getPlatformAuthenticators(this.uiContext);
      19. console.info("Succeeded in doing getPlatformAuthenticators.");
      20. } catch (error) {
      21. let message = (error as BusinessError).message;
      22. let code = (error as BusinessError).code;
      23. console.error(`Failed to call getPlatformAuthenticators error code is ${code}, message is ${message}`);
      24. // 业务根据错误码判断异常类型，进行相应处理，详见错误码参考
      25. }
      ```
   2. 访问FIDO服务器，获取注册报文，调用register接口进行注册。

      收起

      自动换行

      深色代码主题

      复制

      ```
      1. // pkOptions为应用从FIDO服务端获取的注册报文, credentialCreationOp为应用组装注册信息
      2. let credentialCreationOp: fido2.CredentialCreationOptions = {
      3. publicKey: pkOptions
      4. };

      6. try {
      7. // 调用register进行通行密钥注册
      8. let publicKeyAttestationCredential: fido2.PublicKeyAttestationCredential =
      9. await fido2.register(this.uiContext, credentialCreationOp);
      10. } catch (error) {
      11. let message = (error as BusinessError).message;
      12. let code = (error as BusinessError).code;
      13. console.error(`Failed to call register error code is ${code}, message is ${message}`);
      14. // 业务根据错误码判断异常类型，进行相应处理，详见错误码参考
      15. }
      ```
   3. 应用使用注册结果（publicKeyAttestationCredential）组装注册响应报文，发送至FIDO服务端进行验证，获取注册结果报文。
4. 使用通行密钥进行身份认证。
   1. 获取能力信息，调用getClientCapabilities接口获取客户端能力列表，并且调用getPlatformAuthenticators接口获取平台认证器能力信息。

      收起

      自动换行

      深色代码主题

      复制

      ```
      1. // 使用uiContext需要获取页面UIAbility的Context，一个页面获取一次即可
      2. let uiContext: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;

      4. try {
      5. // 获取客户端能力列表
      6. let clientCapabilities: Map<fido2.ClientCapability, boolean> = await fido2.getClientCapabilities(this.uiContext);
      7. console.info("Succeeded in doing getClientCapabilities.");
      8. } catch (error) {
      9. let message = (error as BusinessError).message;
      10. let code = (error as BusinessError).code;
      11. console.error(`Failed to call getClientCapabilities error code is ${code}, message is ${message}`);
      12. // 业务根据错误码判断异常类型，进行相应处理，详见错误码参考
      13. }

      15. try {
      16. // 获取平台认证器能力
      17. let platformAuthenticators: Array<fido2.AuthenticatorMetadata> =
      18. await fido2.getPlatformAuthenticators(this.uiContext);
      19. console.info("Succeeded in doing getPlatformAuthenticators.");
      20. } catch (error) {
      21. let message = (error as BusinessError).message;
      22. let code = (error as BusinessError).code;
      23. console.error(`Failed to call getPlatformAuthenticators error code is ${code}, message is ${message}`);
      24. // 业务根据错误码判断异常类型，进行相应处理，详见错误码参考
      25. }
      ```
   2. 访问FIDO服务器，获取认证报文，调用authenticate接口进行认证。

      收起

      自动换行

      深色代码主题

      复制

      ```
      1. // authPub为应用从FIDO服务端获取的认证报文，authCredentialRequestOptions为应用组装的认证信息
      2. let authCredentialRequestOptions: fido2.CredentialRequestOptions = {
      3. publicKey: authPub,
      4. mediation: "optional" as fido2.CredentialMediationRequirement
      5. }

      7. try {
      8. // 调用authenticate接口进行认证
      9. let pkAssertionCredential: fido2.PublicKeyAssertionCredential =
      10. await fido2.authenticate(this.uiContext, authCredentialRequestOptions);
      11. } catch (error) {
      12. let message = (error as BusinessError).message;
      13. let code = (error as BusinessError).code;
      14. console.error(`Failed to call authenticateerror code is ${code}, message is ${message}`);
      15. // 业务根据错误码判断异常类型，进行相应处理，详见错误码参考
      16. }
      ```
   3. 应用使用认证结果（pkAssertionCredential）组装认证响应报文，发送至FIDO服务端进行验证，获取认证结果报文。