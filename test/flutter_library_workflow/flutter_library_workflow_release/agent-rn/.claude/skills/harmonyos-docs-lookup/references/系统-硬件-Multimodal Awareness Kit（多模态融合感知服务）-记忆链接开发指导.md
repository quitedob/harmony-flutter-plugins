## 概述

MetadataBinding（记忆链接）指由第三方应用提供[鸿蒙App Linking链接](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/applinking-introduction)，系统将当前用户浏览的内容与鸿蒙App Linking链接进行关联并保存的功能。

详细的接口介绍请参考[@ohos.multimodalAwareness.metadataBinding (记忆链接)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-awareness-metadatabinding)。

## 场景介绍

第三方应用可使用记忆链接功能，将鸿蒙App Linking链接映射到调用接口的系统应用或服务。例如，用户在【电商应用】中浏览某个商品时，截图保存了该商品的图片，系统将记录图片与【电商应用】提供的鸿蒙App Linking链接的映射关系。当用户再次浏览该图片时，系统会提醒用户是否需要返回【电商应用】查看商品详情。

## 演示示例

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e1/v3/pqo0NzrHR3iyd-NWcqgJNw/zh-cn_image_0000002540771632.gif?HW-CC-KV=V1&HW-CC-Date=20260414T045848Z&HW-CC-Expire=86400&HW-CC-Sign=1E97B6E4A97714411659FBE6C044ED8930D48B72F721D8F02F3CD6C4514190E3)

## 接口说明

* 本模块首批接口从API version 18开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。
* 本模块支持记忆链接的功能。

展开

| 接口名 | 描述 |
| --- | --- |
| [submitMetadata](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-awareness-metadatabinding#metadatabindingsubmitmetadata)(metadata: string): void; | 第三方应用将待编码的鸿蒙App Linking链接传递给多模态融合感知服务，该服务决定适当时机将内容传递给调用编码接口的系统应用。 |
| [on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-awareness-metadatabinding#metadatabindingonoperationsubmitmetadata)(type: 'operationSubmitMetadata', bundleName: string, callback: Callback<number>): void; | 订阅系统事件以获取编码内容，应用注册回调，事件发生时回传编码内容。 |
| [off](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-awareness-metadatabinding#metadatabindingoffoperationsubmitmetadata)(type: 'operationSubmitMetadata', bundleName: string, callback?: Callback<number>): void; | 取消订阅系统获取编码内容的事件。取消注册回调接口。 |

## 约束与限制

* 鸿蒙App Linking链接的最大字节数为128。

## 开发步骤

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { metadataBinding } from '@kit.MultimodalAwarenessKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   3. import { Callback } from '@kit.BasicServicesKit';
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Stationary/MetadataBinding/entry/src/main/ets/pages/Index.ets#L16-L20)
2. 定义记忆服务回调及包名, 函数接收回传编码的内容。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let callback : Callback<number> = (event: number) => {};
   2. let bundleName: string = '';
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Stationary/MetadataBinding/entry/src/main/ets/pages/Index.ets#L22-L25)
3. 订阅记忆服务。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. metadataBinding.on('operationSubmitMetadata', bundleName, callback);
   3. console.info("on succeeded");
   4. } catch (err) {
   5. let error = err as BusinessError;
   6. console.error("Register event error and err code is " + error.code);
   7. }
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Stationary/MetadataBinding/entry/src/main/ets/pages/Index.ets#L33-L47)
4. 提供鸿蒙App Linking链接。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 应用先开通applink服务，然后获取applink，最后提供给记忆链接服务接口，submitMetadata接口applink长度限制为非空且小于128字符.
   2. let applink: string = "https://example.com/product/12345";
   3. try {
   4. metadataBinding.submitMetadata(applink);
   5. } catch (err) {
   6. let error = err as BusinessError;
   7. console.error("Submit metadata error and err code is " + error.code);
   8. }
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Stationary/MetadataBinding/entry/src/main/ets/pages/Index.ets#L51-L65)
5. 取消订阅记忆服务。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. metadataBinding.off('operationSubmitMetadata', bundleName, callback);
   3. console.info("off succeeded");
   4. } catch (err) {
   5. let error = err as BusinessError;
   6. console.error("Unregister event error and err code is " + error.code);
   7. }
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Stationary/MetadataBinding/entry/src/main/ets/pages/Index.ets#L69-L83)