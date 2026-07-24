## 场景介绍

应用通过调用Device Security Kit的接口获取诈骗应用信息，用于反诈业务，比如对诈骗应用进行举报。

## 约束与限制

当前能力仅支持手机、平板设备。仅提供给反诈类应用使用。

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/af/v3/op8cvFF2Q3yoCvvBXD_qug/zh-cn_image_0000002482788470.png?HW-CC-KV=V1&HW-CC-Date=20260414T043358Z&HW-CC-Expire=86400&HW-CC-Sign=90892F4743F7D0C1C4B4B01AB662770209EE362A79660D20AE8135B0FB461165)

**流程说明：**

1. 用户在开发者应用上选择举报诈骗应用功能。
2. 开发者应用调用Device Security Kit的接口拉起诈骗应用选择器。
3. 用户在诈骗应用选择器中选择诈骗应用。
4. Device Security Kit调用回调函数通知开发者应用，开发者应用根据诈骗应用信息进行业务处理。

## 接口说明

以下是获取诈骗应用相关接口，更多接口及使用方法请参见[API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-antifraudpicker-api)。

展开

| 接口名 | 描述 |
| --- | --- |
| selectFraudApp(context: common.Context, options?: AntifraudAppOptions): Promise<AntifraudAppResult> | 获取诈骗应用信息。 |

## 开发步骤

说明

* 在开发准备过程中，需要申请权限：ohos.permission.USE\_FRAUD\_APP\_PICKER。
* 只允许清单内的应用申请该权限，申请方式请参考：[申请使用受限权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/declare-permissions-in-acl)
* 开发者需向用户说明数据使用的目的、方式和范围。

1. 导入Device Security Kit模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { securityAudit } from '@kit.DeviceSecurityKit';
   2. import { BusinessError} from '@kit.BasicServicesKit';
   3. import { hilog } from '@kit.PerformanceAnalysisKit';
   4. import { common} from '@kit.AbilityKit';
   ```
2. 调用selectFraudApp接口获取诈骗应用信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const TAG = "AntifraudPickerJsTest";

   3. // 请求获取诈骗应用信息，并进行业务处理
   4. let options: antifraudPicker.AntifraudAppOptions = {
   5. maxSelectNumber: 5
   6. };
   7. try {
   8. hilog.info(0x0000, TAG, 'SelectFraudApp begin.');
   9. let context = this.getUIContext().getHostContext();
   10. const result: antifraudPicker.AntifraudAppResult = await antifraudPicker.selectFraudApp(context, options);
   11. } catch (err) {
   12. let e: BusinessError = err as BusinessError;
   13. hilog.error(0x0000, TAG, 'SelectFraudApp failed: %{public}d %{public}s', e.code, e.message);
   14. }
   ```