## 场景介绍

为了保障生态应用数据的实时性，当运动健康App数据未能及时同步到云端时，生态App应用在获得用户授权的前提下，通过让用户主动触发数据同步的操作，以达到用户数据实时上云的目的，便于能够从Health Service Kit云及时获取到用户最新的运动健康数据。

## OAuth权限

联盟卡片申请的权限名称：数据同步 > 手动数据同步

展开

| 权限 | 权限描述 |
| --- | --- |
| https://www.huawei.com/healthkit/huaweihealthdata.cloudsync | 允许触发华为运动健康应用同步个人数据到云（基于华为运动健康应用的数据同步管理设置）。 |

说明

该权限仅企业开发者账号可见。

## 接口说明

展开

| 接口名 | 描述 |
| --- | --- |
| [syncAll](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section7421175995618)(): Promise<void> | 用户主动触发数据同步。 |

## 开发前检查

* 完成[申请运动健康服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-apply)与[配置Client ID](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-configuration-client-id)。
* 接口首次调用前，需先使用[init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section1571935817328)方法进行初始化。
* 需先通过[用户授权](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-add-permissions#section0247115178)接口引导用户授权，参见[AuthorizationRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#zh-cn_topic_0000001768344397_section1956619544498)中scopes参数。用户授权数据同步权限后，才可调用手动数据同步接口。
* 错误码请参考[ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice)，常见问题请参考[Health Service Kit常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-faqs)。

## 开发步骤

1. 导入运动健康服务功能模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { healthStore } from '@kit.HealthServiceKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';
   ```
2. 调用[syncAll](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section7421175995618)方法同步数据，并处理返回结果。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. await healthStore.syncAll();
   3. hilog.info(0x0000, 'testTag', 'Succeeded in synchronizing data.');
   4. } catch (err) {
   5. hilog.error(0x0000, 'testTag', `Failed to synchronize data. Code: ${err.code}, message: ${err.message}`);
   6. }
   ```