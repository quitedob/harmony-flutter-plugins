## 场景介绍

Enterprise Space Kit为应用提供取消订阅空间事件的能力，支持应用在特定场景下灵活管理空间事件的订阅状态。例如，当应用需要关闭、某个功能模块不再使用时，可通过调用该方法主动取消对特定空间事件的订阅。

## 接口说明

详细接口说明可参考[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section134241041398)。

展开

| 接口名 | 描述 |
| --- | --- |
| [unsubscribeEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section134241041398)(subscribeId:number): void | 取消订阅空间事件，在相关事件触发时，不再通知应用侧。 |

## 开发步骤

1. 导入Enterprise Space Kit模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { spaceManager } from '@kit.EnterpriseSpaceKit';
   ```
2. 调用[unsubscribeEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section134241041398)接口，取消订阅空间信息，并查看打印信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const subscribeId: number = 100;
   2. try {
   3. spaceManager.unsubscribeEvent(subscribeId);
   4. console.info('Succeeded in unsubscribing event');
   5. } catch (err) {
   6. console.error(`Failed to unsubscribe event. Code: ${err.code}, message: ${err.message}`);
   7. }
   ```