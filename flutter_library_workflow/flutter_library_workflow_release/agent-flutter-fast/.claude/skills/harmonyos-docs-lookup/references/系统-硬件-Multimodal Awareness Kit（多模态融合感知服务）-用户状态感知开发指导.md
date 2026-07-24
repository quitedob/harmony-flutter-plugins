UserStatus（用户状态感知）模块提供用户感知能力，可以感知到操作者特定状态，例如：检测用户年龄组。

详细的接口介绍请参考[@ohos.multimodalAwareness.userStatus (用户状态感知)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-awareness-userstatus)。

## 感知用户年龄组开发指导

### 场景介绍

当应用需要获取用户年龄分类时，可以调用userStatus模块，例如判断设备具体操作者是儿童还是成年人。

从API version 20开始，支持获取用户年龄组。

### 接口说明

展开

| 接口名 | 描述 |
| --- | --- |
| on(type:'userAgeGroupDetected',callback:Callback<UserClassification>):void; | 订阅年龄群组检测功能，检测结果通过callback返回。 |
| off(type: 'userAgeGroupDetected', callback?: Callback<UserClassification>): void; | 取消年龄群组检测功能。 |

### 约束与限制

* 此功能如果设备不支持，将返回801错误码。
* 此功能涉及安全隐私，如需使用，请 [联系技术人员](https://developer.huawei.com/consumer/cn/support/feedback)。

### 开发步骤

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { userStatus } from '@kit.MultimodalAwarenessKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Stationary/UserStatus/entry/src/main/ets/pages/Index.ets#L16-L19)
2. 定义回调函数，监听年龄群组检测结果变化。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let callback : Callback<userStatus.UserClassification> = (data : userStatus.UserClassification) => {
   2. console.info('callback succeeded, ageGroup:' + data.ageGroup + ", confidence:" + data.confidence);
   3. };
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Stationary/UserStatus/entry/src/main/ets/pages/Index.ets#L27-L31)
3. 订阅年龄群组检测功能。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. userStatus.on('userAgeGroupDetected', callback);
   3. console.info("on succeeded");
   4. } catch (err) {
   5. let error = err as BusinessError;
   6. console.error("Failed on and err code is " + error.code);
   7. }
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Stationary/UserStatus/entry/src/main/ets/pages/Index.ets#L33-L47)
4. 取消订阅年龄群组检测功能。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. userStatus.off('userAgeGroupDetected');
   3. console.info("off succeeded");
   4. } catch (err) {
   5. let error = err as BusinessError;
   6. console.error("Failed off and err code is " + error.code);
   7. }
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Stationary/UserStatus/entry/src/main/ets/pages/Index.ets#L51-L65)