从API 22开始，huksExternalCrypto提供通用查询功能接口。该接口可以用于从UKey中获取设备标识、App标识以及其他通用属性信息，完成属性查询操作。具体的场景介绍请参考[获取属性介绍及规格](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-ukey-general-query-overview)。

## 开发步骤

**获取属性**

1. 通过证书管理系统能力提供的[证书选择接口](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-certmanagerdialog#certificatemanagerdialogopenauthorizedialog22)获取[keyUri](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-certmanagerdialog#certreference22)作为resourceId，并[打开资源](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-open-close-resource-ndk#打开资源)。
2. 构造输入参数propertyId和可选输入参数[param](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-huksexternalcrypto#huksexternalcryptoparam)。
3. 调用[getProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-huksexternalcrypto#huksexternalcryptogetproperty)获取属性信息。

## 开发案例

收起

自动换行

深色代码主题

复制

```
1. import { huksExternalCrypto } from '@kit.UniversalKeystoreKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. async function getProperty(): Promise<Array<huksExternalCrypto.HuksExternalCryptoParam>> {
5. // 1. 获取resourceId, 假设获取的resourceId如下，并已经打开该资源
6. const testResourceId = JSON.stringify({
7. providerName: "testProviderName",
8. bundleName: "com.example.cryptoapplication",
9. abilityName: "CryptoExtension",
10. index: {
11. key: "testKey"
12. } as ESObject
13. });

15. // 2. 构造输入参数propertyId和可选参数param
16. let propertyId = "SKF_EnumDev";
17. const extProperties: Array<huksExternalCrypto.HuksExternalCryptoParam> = [];

19. // 3. 调用getProperty获取属性信息
20. console.info(`promise: await huksExternalCrypto getProperty`);
21. try {
22. await huksExternalCrypto.getProperty(testResourceId, propertyId, extProperties)
23. .then((data) => {
24. console.info(`promise: getProperty success, data: ` + JSON.stringify(data));
25. }).catch((error: BusinessError) => {
26. console.error(`promise: getProperty failed, errCode : ${error.code}, errMsg : ${error.message}`);
27. })
28. } catch (error) {
29. console.error(`promise: getProperty failed, errCode : ${error.code}, errMsg : ${error.message}`);
30. }
31. return extProperties;
32. }
```