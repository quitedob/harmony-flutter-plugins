## 接口说明

通行密钥服务主要接口如下表。

展开

| 接口名 | 描述 |
| --- | --- |
| FIDO2\_ErrorCode [HMS\_FIDO2\_getClientCapability](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/passkey#ga3745265749b2776403960fbeece3de77)([FIDO2\_CapabilityArray](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_i_d_o2___capability_array) \*\* capability) | 查询当前设备支持的客户端能力列表。 |
| FIDO2\_ErrorCode [HMS\_FIDO2\_getPlatformAuthenticator](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/passkey#ga18b569cb28a659f4282acbb64e198195)([FIDO2\_AuthenticatorMetadataArray](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_i_d_o2___authenticator_metadata_array) \*\*authenticators) | 查询当前设备支持的平台认证器能力列表（人脸、指纹、PIN码）。 |
| FIDO2\_ErrorCode [HMS\_FIDO2\_register](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/passkey#gaaaed812197e7dc4d5f9a3354d5349665)(const [FIDO2\_CredentialCreationOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_i_d_o2___credential_creation_options) options, const [FIDO2\_TokenBinding](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_i_d_o2___token_binding) tokenBinding, const char \* origin, [FIDO2\_PublicKeyAttestationCredential](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_i_d_o2___public_key_attestation_credential) \*\* publicKeyAttestationCredential ) | 进行通行密钥的注册。 |
| FIDO2\_ErrorCode [HMS\_FIDO2\_authenticate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/passkey#gaac4365229064efc78dc25dceb7c932a3)(const [FIDO2\_CredentialRequestOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_i_d_o2___credential_request_options) options, const [FIDO2\_TokenBinding](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_i_d_o2___token_binding) tokenBinding, const char \*origin, [FIDO2\_PublicKeyAssertionCredential](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_i_d_o2___public_key_assertion_credential) \*\*publicKeyAssertionCredential) | 进行通行密钥的认证。 |

## 开发步骤

通行密钥服务提供基于FIDO2标准协议的FIDO客户端实现，这里仅演示FIDO客户端相关API的使用，涉及FIDO服务器的相关处理由开发者自行实现，这里不做介绍，请参考[FIDO2标准协议](https://fidoalliance.org/passkeys/)（见[网站链接免责声明](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/onlineauthentication-website-disclaimer)）。

在CMake脚本中链接相关动态库。

收起

自动换行

深色代码主题

复制

```
1. target_link_libraries(projectName libfido2_ndk.z.so)
```

1. 需要业务方自行根据FIDO2标准协议部署FIDO服务器。
2. 注册通行密钥。
   1. 获取能力信息，调用HMS\_FIDO2\_getClientCapability接口获取客户端能力列表，并且调用HMS\_FIDO2\_getPlatformAuthenticator接口获取平台认证器能力信息。

      收起

      自动换行

      深色代码主题

      复制

      ```
      1. #include "OnlineAuthenticationKit/fido2_api.h"

      3. FIDO2_ErrorCode TestGetClientCapability()
      4. {
      5. // 获取客户端能力列表
      6. FIDO2_CapabilityArray *capability = NULL;
      7. FIDO2_ErrorCode ret = HMS_FIDO2_getClientCapability(&capability);

      9. // 业务根据错误码判断异常类型，进行相应处理，详见错误码参考
      10. if (ret != FIDO2_SUCCESS) {
      11. HMS_FIDO2_CapabilityArray_Destroy(capability);
      12. return ret;
      13. }
      14. return FIDO2_SUCCESS;
      15. }

      17. FIDO2_ErrorCode GetPlatformAuthenticator()
      18. {
      19. // 获取平台认证器能力
      20. FIDO2_AuthenticatorMetadataArray *authenticators = NULL;
      21. FIDO2_ErrorCode ret = HMS_FIDO2_getPlatformAuthenticator(&authenticators);

      23. // 业务根据错误码判断异常类型，进行相应处理，详见错误码参考
      24. if (ret != FIDO2_SUCCESS) {
      25. HMS_FIDO2_AuthenticatorMetadataArray_Destroy(authenticators);
      26. return ret;
      27. }
      28. return FIDO2_SUCCESS;
      29. }
      ```
   2. 访问FIDO服务器，获取注册报文，调用HMS\_FIDO2\_register接口进行注册。

      收起

      自动换行

      深色代码主题

      复制

      ```
      1. FIDO2_ErrorCode TestReg()
      2. {
      3. // 初始化注册参数，init方法必须调用
      4. FIDO2_CredentialCreationOptions options;
      5. HMS_FIDO2_initCreationOptions(&options);

      7. // FIDO服务器返回的注册报文，具体报文内容由业务方传入
      8. FIDO2_PublicKeyCredentialCreationOptions publicKey;

      10. // 业务方组装注册信息，包含是否需要用户介入以及注册报文
      11. options.mediation = FIDO2_CONDITIONAL;
      12. options.publicKey = publicKey;

      14. // 初始化tokenBinding参数，业务方可不赋值，但init方法必须调用
      15. FIDO2_TokenBinding tokenBinding;
      16. HMS_FIDO2_initTokenBinding(&tokenBinding);

      18. // 测试origin，具体内容由业务方设置
      19. char *origin = "http://www.fidotest.com";

      21. // 调用HMS_FIDO2_register进行通行密钥注册
      22. FIDO2_PublicKeyAttestationCredential* publicKeyAttestationCredential = NULL;
      23. FIDO2_ErrorCode ret = HMS_FIDO2_register(options, tokenBinding, origin, &publicKeyAttestationCredential);

      25. // 业务根据错误码判断异常类型，进行相应处理，详见错误码参考
      26. if (ret != FIDO2_SUCCESS) {
      27. HMS_FIDO2_PublicKeyAttestationCredential_Destroy(publicKeyAttestationCredential);
      28. return ret;
      29. }
      30. return FIDO2_SUCCESS;
      31. }
      ```
   3. 应用使用注册结果（publicKeyAttestationCredential）组装注册响应报文，发送至FIDO服务端进行验证，获取注册结果报文。
3. 使用通行密钥进行身份认证。
   1. 获取能力信息，调用HMS\_FIDO2\_getClientCapability接口获取客户端能力列表，并且调用HMS\_FIDO2\_getPlatformAuthenticator接口获取平台认证器能力信息。

      收起

      自动换行

      深色代码主题

      复制

      ```
      1. #include "OnlineAuthenticationKit/fido2_api.h"

      3. FIDO2_ErrorCode TestGetClientCapability()
      4. {
      5. // 获取客户端能力列表
      6. FIDO2_CapabilityArray *capability = NULL;
      7. FIDO2_ErrorCode ret = HMS_FIDO2_getClientCapability(&capability);

      9. // 业务根据错误码判断异常类型，进行相应处理，详见错误码参考
      10. if (ret != FIDO2_SUCCESS) {
      11. HMS_FIDO2_CapabilityArray_Destroy(capability);
      12. return ret;
      13. }
      14. return FIDO2_SUCCESS;
      15. }

      17. FIDO2_ErrorCode GetPlatformAuthenticator()
      18. {
      19. // 获取平台认证器能力
      20. FIDO2_AuthenticatorMetadataArray *authenticators = NULL;
      21. FIDO2_ErrorCode ret = HMS_FIDO2_getPlatformAuthenticator(&authenticators);

      23. // 业务根据错误码判断异常类型，进行相应处理，详见错误码参考
      24. if (ret != FIDO2_SUCCESS) {
      25. HMS_FIDO2_AuthenticatorMetadataArray_Destroy(authenticators);
      26. return ret;
      27. }
      28. return FIDO2_SUCCESS;
      29. }
      ```
   2. 访问FIDO服务器，获取认证报文，调用HMS\_FIDO2\_authenticate接口进行认证。

      收起

      自动换行

      深色代码主题

      复制

      ```
      1. FIDO2_ErrorCode TestAuth()
      2. {
      3. // 初始化认证参数，init方法必须调用
      4. FIDO2_CredentialRequestOptions options;
      5. HMS_FIDO2_initRequestOptions(&options);

      7. // FIDO服务器返回的认证报文，具体报文内容由业务方传入
      8. FIDO2_PublicKeyCredentialRequestOptions publicKey;

      10. // 业务方组装认证信息，包含是否需要用户介入以及认证报文
      11. options.mediation = FIDO2_CONDITIONAL;
      12. options.publicKey = publicKey;

      14. // 初始化tokenBinding参数，业务方可不赋值，但init方法必须调用
      15. FIDO2_TokenBinding tokenBinding;
      16. HMS_FIDO2_initTokenBinding(&tokenBinding);

      18. // 测试origin，具体内容由业务方设置
      19. char *origin = "http://www.fidotest.com";

      21. // 调用HMS_FIDO2_authenticate进行通行密钥认证
      22. FIDO2_PublicKeyAssertionCredential *assertionCredential = NULL;
      23. FIDO2_ErrorCode ret = HMS_FIDO2_authenticate(options, tokenBinding, origin, &assertionCredential);

      25. // 业务根据错误码判断异常类型，进行相应处理，详见错误码参考
      26. if (ret != FIDO2_SUCCESS) {
      27. HMS_FIDO2_PublicKeyAssertionCredential_Destroy(assertionCredential);
      28. return ret;
      29. }
      30. return FIDO2_SUCCESS;
      31. }
      ```
   3. 应用使用认证结果（assertionCredential）组装认证响应报文，发送至FIDO服务端进行验证，获取认证结果报文。