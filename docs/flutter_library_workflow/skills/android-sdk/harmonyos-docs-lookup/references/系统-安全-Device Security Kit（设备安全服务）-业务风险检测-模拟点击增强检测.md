## 场景介绍

从6.0.2(22) 版本开始，新增支持模拟点击增强检测。

应用通过调用Device Security Kit的detectSimulatedClickRiskEnhanced接口，获取模拟点击增强检测结果，用于自动化点击、设备墙等作弊行为检测。

应用可以根据检测结果评估如何进行业务操作。

## 约束与限制

每30秒最多可以调用10次，每个应用在每个设备上每天最多可以调用20次。

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c9/v3/5LmFVoRVQxqSdO5NmslxZw/zh-cn_image_0000002482863616.png?HW-CC-KV=V1&HW-CC-Date=20260414T043339Z&HW-CC-Expire=86400&HW-CC-Sign=AF093E01EAF017FCA4F2F85D390D5BC0402EE06949B996A78DE8D87EF912D300)

**流程说明：**

1. 开发者应用获取nonce

   在调用detectSimulatedClickRiskEnhanced接口时，开发者必须传入一个随机生成的nonce值。在检测结果中会包含这个nonce值，您可以通过校验这个nonce值来确定返回结果能够对应您的请求，并且没有被重放攻击。

   说明

   * nonce值必须为24至80字节之间。
   * 建议每次请求都从服务器随机生成新的nonce值。
2. 开发者应用调用detectSimulatedClickRiskEnhanced接口，发起模拟点击增强检测请求。

   Device Security Kit收到请求后，首先采集当前设备模拟点击线索数据，然后将线索数据和nonce一起发送到Device Security服务器做检测，最后通过detectSimulatedClickRiskEnhanced接口的返回值将检测结果传递给开发者应用。
3. 当开发者应用发起业务请求时，在应用服务器中验证模拟点击增强检测结果完整性。

## 接口说明

以下是模拟点击增强检测相关接口，更多接口及使用方法请参见[API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-brid-api)。

展开

| 接口名 | 描述 |
| --- | --- |
| [detectSimulatedClickRiskEnhanced](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-brid-api#section666116174014)(params:[SimulatedClickDetectionEnhancedRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-brid-api#section97791919183510)):Promise<string> | 模拟点击增强检测 |

## 开发步骤

1. 导入Device Security Kit模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { businessRiskIntelligentDetection } from '@kit.DeviceSecurityKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   3. import { hilog } from '@kit.PerformanceAnalysisKit';
   4. import { cryptoFramework } from '@kit.CryptoArchitectureKit'
   ```
2. 调用detectSimulatedClickRiskEnhanced接口获取模拟点击增强检测结果。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const TAG = "BusinessRiskIntelligentDetectionJsTest";

   3. let nonceLength = 48;
   4. let nonceBlob = cryptoFramework.createRandom().generateRandomSync(nonceLength);
   5. let params = {
   6. version: 1,
   7. nonce: nonceBlob.data,
   8. algorithm: businessRiskIntelligentDetection.SigningAlgorithm.ES256
   9. } as businessRiskIntelligentDetection.SimulatedClickDetectionEnhancedRequest;
   10. try {
   11. hilog.info(0x0000, TAG, 'Detect simulated click risk enhanced begin.');
   12. businessRiskIntelligentDetection.detectSimulatedClickRiskEnhanced(params).then((result: string) => {
   13. hilog.info(0x0000, TAG, 'Detect simulated click risk enhanced success: %{public}s', result);
   14. }).catch((error: Error) => {
   15. let e: BusinessError = error as BusinessError;
   16. hilog.error(0x0000, TAG, 'Detect simulated click risk enhanced failed: %{public}d %{public}s', e.code, e.message);
   17. });
   18. } catch (error) {
   19. let e: BusinessError = error as BusinessError;
   20. hilog.error(0x0000, TAG, 'Detect simulated click risk enhanced failed: %{public}d %{public}s', e.code, e.message);
   21. }
   ```
3. 在开发者应用服务器中验证模拟点击增强检测结果。

   模拟点击增强检测接口响应结果，格式为JSON WEB签名（JWS）。验证检测结果完整示例可参考[java示例代码](https://gitcode.com/HarmonyOS_Samples/device-security-kit-sample-code-business-risk-intelligent-detection-server-demo-java)，具体步骤如下：

   1. 解析JWS，获取header、payload、signature。
   2. 从header中获取证书链，使用[Huawei CBG Device Attestation Root CA](https://pki.consumer.huawei.com/ca/cer/Huawei_CBG_ECC_Device_Attestation_Root_CA.cer)证书对其进行验证。
   3. 校验证书链中x5c[0]证书的Common Name是否为Harmony OS Device Attestation Service。
   4. 从signature中获取签名，校验其签名。
   5. 从payload中获取模拟点击增强检测结果，格式和样例摘录如下：

      收起

      自动换行

      深色代码主题

      复制

      ```
      1. {
      2. "timestampMs": 9860437986543,
      3. "version": 1,
      4. "riskDecision": "fake",
      5. "tags": ["AbnormalTap"]
      6. }
      ```

      说明

      具体字段解释请参见[detectSimulatedClickRiskEnhanced](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-brid-api#section666116174014)的字段说明。