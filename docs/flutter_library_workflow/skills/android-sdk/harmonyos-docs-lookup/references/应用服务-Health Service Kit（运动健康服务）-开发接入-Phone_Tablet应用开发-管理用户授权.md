## 场景介绍

应用拉起华为账号登录和授权界面，由用户授权相应的数据访问权限。用户可以自主选择授权的数据类型，可以只授权部分数据权限。

应用所能操作的用户数据，是用户授权和运动健康服务审批通过的数据权限的交集。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/3f/v3/rbmx3BSITsC-HxtZUnSZaA/zh-cn_image_0000002509454481.png?HW-CC-KV=V1&HW-CC-Date=20260414T030607Z&HW-CC-Expire=86400&HW-CC-Sign=E77BD2DF43F2ECFFEFD16EC79483E492A2362014F6502644623C04C0D870C818)

## 接口说明

展开

| 接口名 | 描述 |
| --- | --- |
| [requestAuthorizations](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section19461855171619)(context: [common.UIAbilityContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext#uiabilitycontext-1), request: [AuthorizationRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#zh-cn_topic_0000001768344397_section1956619544498)): Promise<[AuthorizationResponse](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#zh-cn_topic_0000001768344397_section963483625117)> | 用户授权，入参为UIAbility上下文和授权参数[AuthorizationRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#zh-cn_topic_0000001768344397_section1956619544498)，添加需要读写的数据类型，拉起账号授权页面，引导用户完成授权，返回结果中的数据类型列表，其对应权限在[应用申请权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-apply)和用户授权权限的交集中。 |
| [getAuthorizations](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section68141073254)(request: [AuthorizationRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#zh-cn_topic_0000001768344397_section1956619544498)): Promise<[AuthorizationResponse](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#zh-cn_topic_0000001768344397_section963483625117)> | 查询用户权限，入参为[AuthorizationRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#zh-cn_topic_0000001768344397_section1956619544498)，添加需要查询的数据类型，查询传入类型是否有权限，返回结果中的数据类型列表，其对应权限在[应用申请权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-apply)和用户授权权限的交集中。 |
| [cancelAuthorizations](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section18660141352811)(): Promise<void> | 取消用户所有授权。 |

## 开发前检查

* 完成[申请运动健康服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-apply)与[配置Client ID](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-configuration-client-id)。
* 接口需在页面或自定义组件生命周期内调用。接口首次调用前，需先使用[init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section1571935817328)方法进行初始化。
* 错误码请参考[ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice)，常见问题请参考[Health Service Kit常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-faqs)。

## 开发步骤

### 用户授权

1. 导入运动健康功能模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { healthStore } from '@kit.HealthServiceKit';
   2. import { common } from '@kit.AbilityKit';
   3. import { hilog } from '@kit.PerformanceAnalysisKit';
   ```
2. 创建授权请求，确保授权参数中的权限已在申请运动健康服务时勾选，权限说明请参考[权限说明](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-permission-description)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let authorizationParameter: healthStore.AuthorizationRequest = {
   2. readDataTypes: [healthStore.exerciseSequenceHelper.DATA_TYPE, healthStore.samplePointHelper.heartRate.DATA_TYPE],
   3. writeDataTypes: [healthStore.exerciseSequenceHelper.DATA_TYPE, healthStore.samplePointHelper.heartRate.DATA_TYPE]
   4. }
   ```
3. 调用[requestAuthorizations](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section19461855171619)方法执行登录授权请求，并处理返回结果。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. let authorizationResponse = await healthStore.requestAuthorizations(this.getUIContext().getHostContext() as common.UIAbilityContext, authorizationParameter);
   3. hilog.info(0x0000, 'testTag', 'Succeeded in requesting authorization.');
   4. authorizationResponse.writeDataTypes.forEach(dataType => {
   5. hilog.info(0x0000, 'testTag', `grantedWriteDataType is : ${dataType.name}`);
   6. });
   7. authorizationResponse.readDataTypes.forEach(dataType => {
   8. hilog.info(0x0000, 'testTag', `grantedReadDataTypes is : ${dataType.name}`);
   9. });
   10. } catch (err) {
   11. hilog.error(0x0000, 'testTag', `Failed to request authorization. Code: ${err.code}, message: ${err.message}`);
   12. }
   ```

### 查询权限

1. 导入运动健康服务功能模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { healthStore } from '@kit.HealthServiceKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';
   ```
2. 创建查询权限请求。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let queryAuthorizationRequest: healthStore.AuthorizationRequest = {
   2. readDataTypes: [healthStore.exerciseSequenceHelper.DATA_TYPE, healthStore.samplePointHelper.heartRate.DATA_TYPE],
   3. writeDataTypes: [healthStore.exerciseSequenceHelper.DATA_TYPE, healthStore.samplePointHelper.heartRate.DATA_TYPE]
   4. }
   ```
3. 调用[getAuthorizations](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section68141073254)方法执行查询权限请求，并处理返回结果。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. let queryAuthorizationResponse = await healthStore.getAuthorizations(queryAuthorizationRequest);
   3. hilog.info(0x0000, 'testTag', 'Succeeded in getting authorization.');
   4. queryAuthorizationResponse.writeDataTypes.forEach(dataType => {
   5. hilog.info(0x0000, 'testTag', `grantedWriteDataType is : ${dataType.name}`);
   6. });
   7. queryAuthorizationResponse.readDataTypes.forEach(dataType => {
   8. hilog.info(0x0000, 'testTag', `grantedReadDataTypes is : ${dataType.name}`);
   9. });
   10. } catch (err) {
   11. hilog.error(0x0000, 'testTag', `Failed to get authorization. Code: ${err.code}, message: ${err.message}`);
   12. }
   ```

### 取消授权

1. 导入运动健康服务功能模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { healthStore } from '@kit.HealthServiceKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';
   ```
2. 调用[cancelAuthorizations](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section18660141352811)方法执行取消授权，并处理返回结果。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. await healthStore.cancelAuthorizations();
   3. hilog.info(0x0000, 'testTag', 'Succeeded in canceling authorization.');
   4. } catch (err) {
   5. hilog.error(0x0000, 'testTag', `Failed to cancel authorization. Code: ${err.code}, message: ${err.message}`);
   6. }
   ```