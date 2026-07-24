应用归因服务为开发者提供接入调试能力，支持开发者在接入过程中进行自助调试，通过调用调试接口验证接入的准确性及归因结果回传等基础能力，从而提升接入效率。

## 场景介绍

应用归因服务接入调试功能支持的场景如下：

* 校验接口调用是否准确

  调用调试接口，校验接口请求及业务逻辑，如参数校验、签名校验等，并提示相应错误码，支持开发者自行发现问题。
* 主动触发归因接口回传

  开发者设置归因数据后，调用调试接口主动、实时触发归因结果回传，验证完整的归因流程。

## 接口说明

应用归因服务接入调试功能提供以下接口，具体API说明详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-attributiontestmanager)。

展开

| 接口名 | 描述 |
| --- | --- |
| validateSource(adSourceInfo: AdSourceInfo, publicKey: string): Promise<void> | 验证归因来源接口，用于媒体App/分发平台验证adSourceInfo入参的合法性。 |
| setPostback(postbackInfo: PostbackInfo): Promise<void> | 设置归因结果回传接口，用于应用生态伙伴：   * 验证triggerData是否合法。 * 设置调试使用的回传数据。 |
| flushPostbacks(adTechId: string): Promise<void> | 主动、实时触发归因结果回传接口，用于应用生态伙伴验证接收及处理回传的逻辑是否正确。 |

## 开发步骤

### 验证归因来源

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { attributionTestManager } from '@kit.AppGalleryKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';
   3. import { BusinessError,deviceInfo } from '@kit.BasicServicesKit';
   ```
2. 构造参数，入参为[AdSourceInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-attributiontestmanager#section1262013338292)、publickey。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 注册归因角色时提供给应用归因服务云侧的公钥
   2. let publicKey: string = '';
   3. let adSourceInfo: attributionTestManager.AdSourceInfo = {
   4. //可以使用虚拟的adTechId
   5. adTechId: '2******8',
   6. campaignId: '',
   7. destinationId: '1*******8',
   8. sourceType: attributionTestManager.SourceType.IMPRESSION,
   9. mmpIds: ['1******8', '2******9'],
   10. serviceTag: 'testServiceTag',
   11. nonce: '123***2',
   12. timestamp: Date.now(),
   13. signature: 'MEQCIEQlmZ****zKBSE8QnhLTIHZZZ****ZpRqRxHss65Ko****JgJKjdrWdkL****juEx2RmFS7da****ZRVZ8RyMyUXg=='
   14. };
   15. let osApiVersion: number = deviceInfo.sdkApiVersion;
   16. if (osApiVersion >= 22) {
   17. adSourceInfo.campaignId = '1*******9';
   18. } else {
   19. adSourceInfo.campaignId = '1****6';
   20. }
   ```
3. 调用[attributionTestManager.validateSource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-attributiontestmanager#section193411799297)方法验证归因来源。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. attributionTestManager.validateSource(adSourceInfo, publicKey).then(() => {
   2. hilog.info(0, "testTag", 'Succeeded in validating source.');
   3. }).catch((error: BusinessError) => {
   4. hilog.error(0, "testTag", `testValidateSource failed.code is ${error.code}, message is ${error.message}`);
   5. })
   ```

### 设置归因结果回传

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { attributionTestManager } from '@kit.AppGalleryKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';
   3. import { BusinessError,deviceInfo } from '@kit.BasicServicesKit';
   ```
2. 构造参数，入参为[PostbackInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-attributiontestmanager#section1812319373298)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let postbackInfo: attributionTestManager.PostbackInfo = {
   2. adTechId: '1******8',
   3. campaignId: '',
   4. sourceId: '1*******8',
   5. destinationId: '1*******8',
   6. serviceTag: 'testServiceTag',
   7. businessScene: 5,
   8. triggerData: 123,
   9. postbackUrl: 'https://xxx.com'
   10. };
   11. let osApiVersion: number = deviceInfo.sdkApiVersion;
   12. if (osApiVersion >= 22) {
   13. postbackInfo.campaignId = '1*******9';
   14. } else {
   15. postbackInfo.campaignId = '1****6';
   16. }
   ```
3. 调用[attributionTestManager.setPostback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-attributiontestmanager#section16797112811814)方法设置归因结果回传数据。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. attributionTestManager.setPostback(postbackInfo).then(() => {
   2. hilog.info(0, "testTag", 'Succeeded in setting postback.');
   3. }).catch((error: BusinessError) => {
   4. hilog.error(0, "testTag", `setPostback onError.code is ${error.code}, message is ${error.message}`);
   5. })
   ```

### 触发归因结果回传

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { attributionTestManager } from '@kit.AppGalleryKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';
   3. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 构造参数adTechId。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let adTechId: string = '1******8';
   ```
3. 调用[attributionTestManager.flushPostbacks](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-attributiontestmanager#section1890815407320)方法触发归因结果回传。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. attributionTestManager.flushPostbacks(adTechId).then(() => {
   2. hilog.info(0, "testTag", 'Succeeded in flushing postbacks.');
   3. }).catch((error: BusinessError) => {
   4. hilog.error(0, "testTag", `flushPostbacks onError.code is ${error.code}, message is ${error.message}`);
   5. })
   ```