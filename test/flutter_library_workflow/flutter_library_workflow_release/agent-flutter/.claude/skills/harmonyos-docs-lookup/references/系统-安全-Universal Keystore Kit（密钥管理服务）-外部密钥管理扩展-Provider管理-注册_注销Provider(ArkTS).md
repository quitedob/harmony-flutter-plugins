从API 22开始，huksExternalCrypto提供Provider注册和注销功能接口。

## 注册Provider

### 开发步骤

1. 构造注册参数，需要传入[HUKS\_EXT\_CRYPTO\_TAG\_ABILITY\_NAME](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-huksexternalcrypto#huksexternalcryptotag)。
2. 调用注册接口[registerProvider](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-huksexternalcrypto#huksexternalcryptoregisterprovider)。

## 开发案例

收起

自动换行

深色代码主题

复制

```
1. import { huksExternalCrypto } from '@kit.UniversalKeystoreKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. function StringToUint8Array(str: string) {
5. let arr: number[] = [];
6. for (let i = 0, j = str.length; i < j; ++i) {
7. arr.push(str.charCodeAt(i));
8. }
9. return new Uint8Array(arr);
10. }

12. async function registerProvider(): Promise<void> {
13. try {
14. /* 1.构造注册参数 */
15. const providerName = "testProvider";
16. const extProperties: Array<huksExternalCrypto.HuksExternalCryptoParam> = [
17. {
18. tag: huksExternalCrypto.HuksExternalCryptoTag.HUKS_EXT_CRYPTO_TAG_ABILITY_NAME,
19. value: StringToUint8Array("CryptoExtension")
20. }
21. ];

23. /* 2.调用registerProvider */
24. await huksExternalCrypto.registerProvider(providerName, extProperties)
25. .then(() => {
26. console.info(`promise: registerProvider success`);
27. }).catch((error: BusinessError) => {
28. console.error(`promise: registerProvider failed, errCode : ${error.code}, errMsg : ${error.message}`);
29. });
30. } catch (error) {
31. console.error(`promise: registerProvider input arg invalid`);
32. }
33. }

35. async function TestRegisterProvider() {
36. await registerProvider();
37. }
```

## 注销Provider

### 开发步骤

1. 构造注销参数，注销单个ability需要传入[HUKS\_EXT\_CRYPTO\_TAG\_ABILITY\_NAME](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-huksexternalcrypto#huksexternalcryptotag)参数。批量注销不需要传入[HUKS\_EXT\_CRYPTO\_TAG\_ABILITY\_NAME](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-huksexternalcrypto#huksexternalcryptotag)参数。
2. 调用注销接口[unregisterProvider](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-huksexternalcrypto#huksexternalcryptounregisterprovider)。

**注销单个ability**

收起

自动换行

深色代码主题

复制

```
1. import { huksExternalCrypto } from '@kit.UniversalKeystoreKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. function StringToUint8Array(str: string) {
5. let arr: number[] = [];
6. for (let i = 0, j = str.length; i < j; ++i) {
7. arr.push(str.charCodeAt(i));
8. }
9. return new Uint8Array(arr);
10. }

12. async function unregisterProvider(): Promise<void> {
13. try {
14. /* 1.构造注销参数 */
15. const providerName = "testProvider";
16. const extProperties: Array<huksExternalCrypto.HuksExternalCryptoParam> = [
17. {
18. tag: huksExternalCrypto.HuksExternalCryptoTag.HUKS_EXT_CRYPTO_TAG_ABILITY_NAME,
19. value: StringToUint8Array("CryptoExtension")
20. }
21. ];

23. /* 2.调用unregisterProvider */
24. await huksExternalCrypto.unregisterProvider(providerName, extProperties)
25. .then(() => {
26. console.info(`promise: unregisterProvider success`);
27. }).catch((error: BusinessError) => {
28. console.error(`promise: unregisterProvider failed, errCode : ${error.code}, errMsg : ${error.message}`);
29. });
30. } catch (error) {
31. console.error(`promise: unregisterProvider input arg invalid`);
32. }
33. }

35. async function TestRegisterProvider() {
36. await unregisterProvider();
37. }
```

**批量注销**

收起

自动换行

深色代码主题

复制

```
1. import { huksExternalCrypto } from '@kit.UniversalKeystoreKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. async function unregisterProvider(): Promise<void> {
5. try {
6. /* 1.构造注销参数 */
7. const providerName = "testProvider";
8. const extProperties: Array<huksExternalCrypto.HuksExternalCryptoParam> = [];

10. /* 2.调用unregisterProvider */
11. await huksExternalCrypto.unregisterProvider(providerName, extProperties)
12. .then(() => {
13. console.info(`promise: unregisterProvider success`);
14. }).catch((error: BusinessError) => {
15. console.error(`promise: unregisterProvider failed, errCode : ${error.code}, errMsg : ${error.message}`);
16. });
17. } catch (error) {
18. console.error(`promise: unregisterProvider input arg invalid`);
19. }
20. }

22. async function TestRegisterProvider() {
23. await unregisterProvider();
24. }
```