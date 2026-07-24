## 场景介绍

从5.0.0(12) 版本开始，新增支持涉诈剧本检测。

金融支付类应用在用户转账、支付前，通过调用Device Security Kit的detectFraudRisk接口，检测用户是否受到欺诈威胁。该接口返回一个风险分，以及涉诈行为的线索，例如，接收到涉诈引导信息、设备有被操控风险等，应用可以根据风险分及线索，进行有效提示或拦截。

## 约束与限制

每个应用在每个设备上每天最多可以调用10次。

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/cf/v3/pa6osZ8dTE6TtKVAp01GLw/zh-cn_image_0000002515108419.png?HW-CC-KV=V1&HW-CC-Date=20260414T043332Z&HW-CC-Expire=86400&HW-CC-Sign=6CC2E2666DD87DEA26B26F1298DEB8870D11F25CA8443166C2096CE227073CE2)

**流程说明：**

1. 开发者应用获取nonce。

   在调用detectFraudRisk接口时，开发者必须传入一个随机生成的nonce值。在检测结果中会包含这个nonce值，您可以通过校验这个nonce值来确定返回结果能够对应您的请求，并且没有被重放攻击。

   说明

   * nonce值必须为24至80字节之间。
   * 建议每次请求都从服务器随机生成新的nonce值。
2. 开发者应用调用detectFraudRisk接口，发起涉诈剧本检测请求。

   Device Security Kit收到请求后，首先采集当前设备涉诈风险线索数据，然后将线索数据与nonce一起发送到Device Security服务器做检测，最后通过detectFraudRisk接口的返回值将检测结果传递给开发者应用。
3. 当开发者应用发起业务请求时，在应用服务器中验证检测结果完整性。

## 接口说明

以下是涉诈剧本检测相关接口，包括ArkTS API，更多接口及使用方法请参见[API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-brid-api)。

展开

| 接口名 | 描述 |
| --- | --- |
| [detectFraudRisk](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-brid-api#section11937174217297)(params: [FraudDetectionRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-brid-api#section165215281222)): Promise<string> | 涉诈剧本检测。 |

## 开发步骤

说明

请确保已打开“[涉诈剧本检测](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/devicesecurity-deviceverify-activateservice#li75651927145212)”开关并[申请Profile](https://developer.huawei.com/consumer/cn/doc/app/agc-help-debug-profile-0000002248181278)。

1. 导入Device Security Kit模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { hilog } from '@kit.PerformanceAnalysisKit';
   2. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
   3. import { businessRiskIntelligentDetection } from '@kit.DeviceSecurityKit';
   4. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 调用detectFraudRisk接口获取涉诈剧本检测结果。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const TAG = "BusinessRiskIntelligentDetectionJsTest";

   3. let rand = cryptoFramework.createRandom();
   4. let len = 48;
   5. let randData = rand.generateRandomSync(len);
   6. let params = {
   7. nonce: randData.data,
   8. algorithm: businessRiskIntelligentDetection.SigningAlgorithm.ES256
   9. } as businessRiskIntelligentDetection.FraudDetectionRequest;
   10. try {
   11. hilog.info(0x0000, TAG, 'Detect fraud risk begin.');
   12. businessRiskIntelligentDetection.detectFraudRisk(params).then((result: string) => {
   13. hilog.info(0x0000, TAG, 'Detect fraud risk success: %{public}s', result);
   14. }).catch((error: Error) => {
   15. let e: BusinessError = error as BusinessError;
   16. hilog.error(0x0000, TAG, 'Detect fraud risk failed: %{public}d %{public}s', e.code, e.message);
   17. });
   18. } catch (error) {
   19. let e: BusinessError = error as BusinessError;
   20. hilog.error(0x0000, TAG, 'Detect fraud risk failed: %{public}d %{public}s', e.code, e.message);
   21. }
   ```
3. 在开发者应用服务器中验证涉诈剧本检测结果。

   涉诈剧本检测接口响应结果格式为JSON WEB签名（JWS）。验证检测结果的步骤如下

   1. 解析JWS，获取header、payload、signature。
   2. 从header中获取证书链，使用[Huawei CBG Root CA](https://pki.consumer.huawei.com/ca/cer/RootCaG2Ecdsa.cer)证书对其进行验证。
   3. 校验证书链中的叶证书域名，域名：riskopenapi.platform.hicloud.com。
   4. 从signature中获取签名，校验其签名。
   5. 从payload中获取涉诈剧本检测结果，格式和样例摘录如下：

      收起

      自动换行

      深色代码主题

      复制

      ```
      1. {
      2. "timestampMs": 9xxxxxxxxx,
      3. "nonce": "Rxxxxxxxxx",
      4. "appId": "xxxxxxxxx",
      5. "version": 1,
      6. "riskScore": 90,
      7. "tags": [
      8. "phishing",
      9. "malware",
      10. "interdiction",
      11. "control"
      12. ]
      13. }
      ```

      我们提供了涉诈剧本检测结果签名验证的[java示例代码](https://gitcode.com/harmonyos_samples/device-security-kit-sample-code-business-risk-intelligent-detection-server-demo-java)，仅供应用服务器参考。

说明

具体字段解释请参见[detectFraudRisk](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-brid-api#section11937174217297)的字段说明。