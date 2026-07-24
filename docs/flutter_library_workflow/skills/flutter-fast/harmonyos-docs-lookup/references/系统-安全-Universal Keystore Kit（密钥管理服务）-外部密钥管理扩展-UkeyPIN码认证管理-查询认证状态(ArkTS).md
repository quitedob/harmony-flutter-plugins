从API 22开始，huksExternalCrypto提供PIN码认证状态查询功能接口。应用可以通过该接口查询PIN码是否认证通过。具体的场景介绍及规格，请参考[Ukey PIN码认证介绍及规格](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-ukey-pin-authentication-management-overview)。

## 开发步骤

1. 通过证书管理系统能力提供的[证书选择接口](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-certmanagerdialog#certificatemanagerdialogopenauthorizedialog22)获取[keyUri](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-certmanagerdialog#certreference22)，并将其作为resourceId。
2. 调用查询认证状态接口[getUkeyPinAuthState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-huksexternalcrypto#huksexternalcryptogetukeypinauthstate)验证PIN码。

## 开发案例

收起

自动换行

深色代码主题

复制

```
1. import { huksExternalCrypto } from '@kit.UniversalKeystoreKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. async function getUkeyPinAuthState(): Promise<huksExternalCrypto.HuksExternalPinAuthState> {
5. let ret: huksExternalCrypto.HuksExternalPinAuthState = huksExternalCrypto.HuksExternalPinAuthState.HUKS_EXT_CRYPTO_PIN_NO_AUTH;
6. try {
7. /* 1.构造查询PIN码状态参数 */
8. const testResourceId = JSON.stringify({
9. providerName: "testProviderName",
10. bundleName: "com.example.cryptoapplication",
11. abilityName: "CryptoExtension",
12. index: {
13. key: "testKey"
14. } as ESObject
15. });
16. const extProperties: Array<huksExternalCrypto.HuksExternalCryptoParam> = [];

18. /* 2.调用getUkeyPinAuthState */
19. await huksExternalCrypto.getUkeyPinAuthState(testResourceId, extProperties)
20. .then((data) => {
21. console.info(`promise: getUkeyPinAuthState success , data : ${data}`);
22. }).catch((error: BusinessError) => {
23. console.error(`promise: getUkeyPinAuthState failed, errCode : ${error.code}, errMsg : ${error.message}`);
24. });
25. } catch (error) {
26. console.error(`promise: getUkeyPinAuthState input arg invalid`);
27. }
28. return ret;
29. }

31. async function testGetUkeyPinAuthState() {
32. let ret: huksExternalCrypto.HuksExternalPinAuthState = await getUkeyPinAuthState();
33. if (ret != huksExternalCrypto.HuksExternalPinAuthState.HUKS_EXT_CRYPTO_PIN_AUTH_SUCCEEDED) {
34. console.error(`getUkeyPinAuthState failed`);
35. return;
36. }

38. console.info(`getUkeyPinAuthState success`);
39. }
```