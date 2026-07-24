## 场景介绍

在安全地理位置场景中，通过创建证明密钥、打开证明会话的方式，对从GPS硬件或网络位置获取到的地理位置信息进行签名，确保地理位置信息的真实性和完整性。

## 约束与限制

该特性需要设备支持安全地理位置功能。

开发者在调用[initializeAttestContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-taas-api#section166716269293)接口成功初始化安全地理位置的证明会话后，通过调用[getCurrentSecureLocation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-taas-api#section1744710293017)接口尝试获取安全地理位置，当接口异常并返回[ATTEST\_ERROR\_LOCATION\_SERVICE\_UNAVAILABLE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-arktsapi-errcode-taas#section108810541837)时，当前设备不支持安全地理位置。具体判断方法参考如下示例：

收起

自动换行

深色代码主题

复制

```
1. import { trustedAppService } from '@kit.DeviceSecurityKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. // 初始化安全地理位置证明会话后，获取安全地理位置信息，以精度优先为例
5. const timeout = 5000; // 获取安全地理位置的超时时间，单位为毫秒
6. const priority = trustedAppService.LocatingPriority.PRIORITY_ACCURACY; // 采用精度优先策略
7. let secureLocation: trustedAppService.SecureLocation;
8. // 获取当前安全地理位置信息
9. try {
10. secureLocation = await trustedAppService.getCurrentSecureLocation(timeout, priority);
11. } catch (err) {
12. const error = err as BusinessError;
13. if (error.code == trustedAppService.AttestExceptionErrCode.ATTEST_ERROR_LOCATION_SERVICE_UNAVAILABLE) {
14. console.error(`current device not support secure location`);
15. } else {
16. console.error(`Failed to get current secure location, message:${error.message}, code:${error.code}`);
17. }
18. }
```

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/44/v3/VlEWiVeFTdqWdcc1EnkUIA/zh-cn_image_0000002482908426.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T043149Z&HW-CC-Expire=86400&HW-CC-Sign=1F81B2AA49050CE3D24543A1294CB0237A8F6211EBCC7F186F095E94FCC514EF "点击放大")

应用获取安全地理位置的优先级策略有两种，分别是精度优先和速度优先。如果选择精度优先策略，可信应用服务会优先返回GPS的结果，GPS获取超时后返回网络地理位置；而如果选择速度优先策略，可信应用服务会返回从二者中最先获取到的结果。

## 接口说明

接口及使用方法请参见[API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-taas-api)。

展开

| 接口名 | 描述 |
| --- | --- |
| [createAttestKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-taas-api#section81796536265)(options: AttestOptions): Promise<void> | 创建证明密钥。 |
| [initializeAttestContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-taas-api#section166716269293)(userData: string, options: AttestOptions): Promise<AttestReturnResult> | 初始化证明会话。 |
| [finalizeAttestContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-taas-api#section18667940102912)(options: AttestOptions): Promise<void> | 结束证明会话。 |
| [destroyAttestKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-taas-api#section19260221152819)(): Promise<void> | 销毁证明密钥。 |
| [getCurrentSecureLocation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-taas-api#section1744710293017)(timeout: number, priority: LocatingPriority): Promise<SecureLocation> | 获取安全地理位置信息。 |

## 开发步骤

1. 申请位置权限，权限名称为“[ohos.permission.APPROXIMATELY\_LOCATION](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/permissions-for-all-user#ohospermissionapproximately_location)”和“[ohos.permission.LOCATION](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/permissions-for-all-user#ohospermissionlocation)”，具体请参考[向用户申请授权](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/request-user-authorization)。
2. 导入可信应用服务模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { trustedAppService } from '@kit.DeviceSecurityKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   ```
3. 创建证明密钥并初始化证明会话。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 创建证明密钥的参数
   2. const createProperties: Array<trustedAppService.AttestParam> = [
   3. {
   4. tag: trustedAppService.AttestTag.ATTEST_TAG_ALGORITHM,
   5. value: trustedAppService.AttestKeyAlg.ATTEST_ALG_ECC
   6. },
   7. {
   8. tag: trustedAppService.AttestTag.ATTEST_TAG_KEY_SIZE,
   9. value: trustedAppService.AttestKeySize.ATTEST_ECC_KEY_SIZE_256
   10. }
   11. ];
   12. const createOptions: trustedAppService.AttestOptions = {
   13. properties: createProperties
   14. };
   15. // 初始化证明会话的参数
   16. const userData = "trusted_app_service_demo" // 示例值，实际值请自行生成，长度在16到127 Bytes之间
   17. const initProperties: Array<trustedAppService.AttestParam> = [
   18. {
   19. tag: trustedAppService.AttestTag.ATTEST_TAG_DEVICE_TYPE,
   20. value: trustedAppService.AttestType.ATTEST_TYPE_LOCATION
   21. },
   22. {
   23. tag: trustedAppService.AttestTag.ATTEST_TAG_DEVICE_ID,
   24. value: BigInt(0) // 此参数在安全地理位置场景下不生效
   25. }
   26. ];
   27. const initOptions: trustedAppService.AttestOptions = {
   28. properties: initProperties
   29. };
   30. // 创建证明密钥并打开证明会话
   31. let certChainList: Array<string>;
   32. try {
   33. await trustedAppService.createAttestKey(createOptions);
   34. const result = await trustedAppService.initializeAttestContext(userData, initOptions);
   35. certChainList = result.certChains;
   36. } catch (err) {
   37. const error = err as BusinessError;
   38. console.error(`Failed to initialize attest context, message:${error.message}, code:${error.code}`);
   39. }
   ```
4. 获取安全地理位置信息，以精度优先为例。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const timeout = 5000; // 获取安全地理位置的超时时间，单位为毫秒
   2. const priority = trustedAppService.LocatingPriority.PRIORITY_ACCURACY; // 采用精度优先策略
   3. let secureLocation: trustedAppService.SecureLocation;
   4. // 获取当前安全地理位置信息
   5. try {
   6. secureLocation = await trustedAppService.getCurrentSecureLocation(timeout, priority);
   7. } catch (err) {
   8. const error = err as BusinessError;
   9. console.error(`Failed to get current secure location, message:${error.message}, code:${error.code}`);
   10. }
   ```
5. 结束证明会话。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 结束证明会话的参数
   2. const finalProperties: Array<trustedAppService.AttestParam> = [
   3. {
   4. tag: trustedAppService.AttestTag.ATTEST_TAG_DEVICE_TYPE,
   5. value: trustedAppService.AttestType.ATTEST_TYPE_LOCATION
   6. }
   7. ];
   8. const finalOptions: trustedAppService.AttestOptions = {
   9. properties: finalProperties,
   10. };
   11. // 结束证明会话
   12. try {
   13. await trustedAppService.finalizeAttestContext(finalOptions);
   14. } catch (err) {
   15. const error = err as BusinessError;
   16. console.error(`Failed to finalize attest context, message:${error.message}, code:${error.code}`);
   17. }
   ```

   如果需要销毁证明密钥，请在结束证明会话后，调用[destroyAttestKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-taas-api#section19260221152819)接口。