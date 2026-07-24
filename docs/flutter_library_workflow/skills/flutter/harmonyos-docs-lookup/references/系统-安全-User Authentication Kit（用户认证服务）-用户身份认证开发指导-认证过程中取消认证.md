统一用户认证框架提供了cancel接口，当应用在认证过程中，需要取消认证时可调用该接口。

## 接口说明

具体参数、返回值、错误码等描述，请参考对应的[cancel](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-useriam-userauth#cancel10)。

此处仅展示了取消认证操作的接口，在取消认证前，需要先发起认证，发起认证的接口列表、详细说明可参考[发起认证](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/start-authentication)章节和API文档。

展开

| 接口名称 | 功能描述 |
| --- | --- |
| cancel(): void | 取消本次认证操作。 |

## 开发步骤

1. [申请权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/prerequisites#申请权限)：ohos.permission.ACCESS\_BIOMETRIC。
2. 指定用户认证相关参数[AuthParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-useriam-userauth#authparam10)（包括挑战值、认证类型[UserAuthType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-useriam-userauth#userauthtype8)列表和认证等级[AuthTrustLevel](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-useriam-userauth#authtrustlevel8)），获取认证对象[UserAuthInstance](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-useriam-userauth#userauthinstance10)，并调用[UserAuthInstance.start](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-useriam-userauth#start10)发起认证。此步骤详细说明可参考[发起认证](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/start-authentication)。
3. 使用已经成功发起认证的UserAuthInstance对象调用[UserAuthInstance.cancel](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-useriam-userauth#cancel10)接口取消本次认证。

示例代码为发起认证可信等级≥ATL3的人脸+锁屏口令认证后，取消认证请求：

收起

自动换行

深色代码主题

复制

```
1. handleAuthResultAndCanceling(userAuthInstance: userAuth.UserAuthInstance, exampleNumber: number) {
2. // ···
3. // 启动认证
4. userAuthInstance.start();
5. Logger.info('auth start success');
6. // ···
7. // 取消认证
8. userAuthInstance.cancel();
9. Logger.info('auth cancel success');
10. // ···
11. }

13. /*
14. * cancel-authentication.md
15. * 发起认证可信等级≥ATL3的人脸+锁屏密码认证后，取消认证请求
16. * */
17. cancelingUserAuthentication() {
18. try {
19. const randData = getRandData();
20. if (!randData) {
21. return;
22. }
23. // 设置认证参数
24. const authParam: userAuth.AuthParam = {
25. challenge: randData,
26. authType: [userAuth.UserAuthType.PIN, userAuth.UserAuthType.FACE, userAuth.UserAuthType.FINGERPRINT],
27. authTrustLevel: userAuth.AuthTrustLevel.ATL3,
28. };
29. // 配置认证界面
30. const widgetParam: userAuth.WidgetParam = {
31. title: resourceToString($r('app.string.title')),
32. };
33. // 获取认证对象
34. const userAuthInstance = userAuth.getUserAuthInstance(authParam, widgetParam);
35. Logger.info('get userAuth instance success');
36. this.handleAuthResultAndCanceling(userAuthInstance, ResultIndex.CANCEL);
37. } catch (error) {
38. const err: BusinessError = error as BusinessError;
39. Logger.error(`auth catch error, code is ${err?.code as number}, message is ${err?.message}`);
40. }
41. }
```

[Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/UserAuthentication/entry/src/main/ets/pages/Index.ets#L333-L402)

## 示例代码

* [认证过程中取消认证](https://gitcode.com/openharmony/applications_app_samples/blob/master/code/DocsSample/UserAuthentication)