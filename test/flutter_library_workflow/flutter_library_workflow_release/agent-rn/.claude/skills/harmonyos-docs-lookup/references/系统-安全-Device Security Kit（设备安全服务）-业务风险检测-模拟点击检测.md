## 场景介绍

从6.0.0(20) 版本开始，新增支持模拟点击检测。

应用通过调用Device Security Kit的detectSimulatedClickRisk接口，获取模拟点击检测结果，用于自动化点击、设备墙等作弊行为检测。

应用可以根据检测结果评估如何进行业务操作。

## 约束与限制

每30秒最多可以调用10次，每个应用在每个设备上每天最多可以调用20次。

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/25/v3/XWlV2ePlQ8GqpX0O1GcNCw/zh-cn_image_0000002482788464.png?HW-CC-KV=V1&HW-CC-Date=20260414T043335Z&HW-CC-Expire=86400&HW-CC-Sign=AD9BD30A2F5E10CBFF290D7F7FD5AB56CFA767D3CF63732431DE0B63D2C4623C)

**流程说明：**

1. 开发者应用调用detectSimulatedClickRisk接口，发起模拟点击检测请求。

   Device Security Kit收到请求后，首先采集当前设备模拟点击线索数据，然后将线索数据发送到Device Security服务器做检测，最后通过detectSimulatedClickRisk接口的返回值将检测结果传递给开发者应用。
2. 获取检测结果，并根据结果做出相应处理。

## 接口说明

以下是模拟点击检测相关接口，更多接口及使用方法请参见[API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-brid-api)。

展开

| 接口名 | 描述 |
| --- | --- |
| [detectSimulatedClickRisk](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-brid-api#section8901423132412)(params: [SimulatedClickDetectionRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-brid-api#section157731058201714)): Promise<string> | 模拟点击检测。 |

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
   ```
2. 调用detectSimulatedClickRisk接口获取模拟点击检测结果。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const TAG = "BusinessRiskIntelligentDetectionJsTest";

   3. let params = {
   4. version: 1
   5. } as businessRiskIntelligentDetection.SimulatedClickDetectionRequest;
   6. try {
   7. hilog.info(0x0000, TAG, 'Detect simulated click risk begin.');
   8. businessRiskIntelligentDetection.detectSimulatedClickRisk(params).then((result: string) => {
   9. hilog.info(0x0000, TAG, 'Detect simulated click risk success: %{public}s', result);
   10. }).catch((error: Error) => {
   11. let e: BusinessError = error as BusinessError;
   12. hilog.error(0x0000, TAG, 'Detect simulated click risk failed: %{public}d %{public}s', e.code, e.message);
   13. });
   14. } catch (error) {
   15. let e: BusinessError = error as BusinessError;
   16. hilog.error(0x0000, TAG, 'Detect simulated click risk failed: %{public}d %{public}s', e.code, e.message);
   17. }
   ```

   说明

   具体字段解释请参见[detectSimulatedClickRisk](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-brid-api#section8901423132412)的字段说明。