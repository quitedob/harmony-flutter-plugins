调用者需感知用户注册凭据（人脸、指纹、口令）的变化，可使用该接口查询当前用户注册凭据的状态。

## 接口说明

具体参数、返回值、错误码等描述，请参考对应的[userAuth.getEnrolledState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-useriam-userauth#userauthgetenrolledstate12)。

展开

| 接口名称 | 功能描述 |
| --- | --- |
| getEnrolledState(authType : UserAuthType): EnrolledState | 根据指定的认证类型，查询用户注册凭据的状态，用于感知注册凭据变化。 |

## 开发步骤

1. [申请权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/prerequisites#申请权限)：ohos.permission.ACCESS\_BIOMETRIC。
2. 指定认证类型（[UserAuthType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-useriam-userauth#userauthtype8)），调用[getEnrolledState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-useriam-userauth#userauthgetenrolledstate12)接口查询用户注册凭据的状态。

以查询用户人脸注册凭据的状态为例：

收起

自动换行

深色代码主题

复制

```
1. obtainingEnrolledCredentialInformation() {
2. try {
3. let enrolledState = userAuth.getEnrolledState(userAuth.UserAuthType.FACE);
4. Logger.info(`get current enrolled state success, enrolledState: ${JSON.stringify(enrolledState)}`);
5. return enrolledState.credentialDigest;
6. } catch (error) {
7. const err: BusinessError = error as BusinessError;
8. Logger.error(`get current enrolled state failed, Code is ${err?.code}, message is ${err?.message}`);
9. return false;
10. }
11. }
```

[Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/UserAuthentication/entry/src/main/ets/pages/Index.ets#L553-L566)

## 示例代码

* [查询用户注册凭据的状态](https://gitcode.com/openharmony/applications_app_samples/blob/master/code/DocsSample/UserAuthentication)