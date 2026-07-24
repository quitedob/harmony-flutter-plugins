不同的设备对于认证能力（人脸、指纹、口令）的支持性各有差异，开发者在发起认证前应当先查询当前设备支持的用户认证能力。

## 接口说明

具体参数、返回值、错误码等描述，请参考对应的[userAuth.getAvailableStatus](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-useriam-userauth#userauthgetavailablestatus9)。

展开

| 接口名称 | 功能描述 |
| --- | --- |
| getAvailableStatus(authType : UserAuthType, authTrustLevel : AuthTrustLevel): void | 根据指定的认证类型、认证等级，检测当前设备是否支持相应的认证能力。 |

## 开发步骤

1. [申请权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/prerequisites#申请权限)：ohos.permission.ACCESS\_BIOMETRIC。
2. 指定认证类型（[UserAuthType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-useriam-userauth#userauthtype8)）和认证等级（[AuthTrustLevel](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-useriam-userauth#authtrustlevel8)），调用[getAvailableStatus](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-useriam-userauth#userauthgetavailablestatus9)接口查询当前的设备是否支持相应的认证能力。

   认证可信等级的详细介绍请参见[认证可信等级划分原则](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/user-authentication-overview#生物认证可信等级划分原则)。

以查询设备是否支持认证可信等级≥ATL3的人脸认证功能为例：

收起

自动换行

深色代码主题

复制

```
1. obtainingSupported() {
2. try {
3. // 查询认证能力是否支持
4. userAuth.getAvailableStatus(userAuth.UserAuthType.FACE, userAuth.AuthTrustLevel.ATL3);
5. Logger.info('current auth trust level is supported');
6. return true;
7. } catch (error) {
8. const err: BusinessError = error as BusinessError;
9. Logger.error(`current auth trust level is not supported, code is ${err?.code}, message is ${err?.message}`);
10. return false;
11. }
12. }
```

[Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/UserAuthentication/entry/src/main/ets/pages/Index.ets#L106-L120)

## 示例代码

* [查询支持的认证能力](https://gitcode.com/openharmony/applications_app_samples/blob/master/code/DocsSample/UserAuthentication)