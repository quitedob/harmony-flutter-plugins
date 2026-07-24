## 场景介绍

Enterprise Space Kit为应用提供订阅空间事件的能力，当前支持订阅空间切换事件。应用订阅空间切换事件后，当空间切换时，会告知应用，并执行应用自定义的动作。

## 接口说明

详细接口说明可参考[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section53038113910)。

展开

| 接口名 | 描述 |
| --- | --- |
| [subscribeEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section53038113910)(eventId: [EventType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section3338122511597)[], callback: AsyncCallback<[EventData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section1831382917492)>): number | 订阅空间事件，在相关事件触发时，通知应用侧。使用callback异步回调。 |

## 开发步骤

1. 导入Enterprise Space Kit模块和相关依赖模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { spaceManager } from '@kit.EnterpriseSpaceKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 调用[subscribeEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section53038113910)接口，设置订阅空间信息，并查看打印信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. const subscribeId = spaceManager.subscribeEvent([0],
   3. (error: BusinessError, data: spaceManager.EventData) => {
   4. if (error) {
   5. console.error(`error info:${error?.code}, err message:${error?.message}`);
   6. } else {
   7. console.info(`event: ${data.event},currentWorkSpaceId: ${data.currentWorkspaceId}`);
   8. }
   9. });
   10. console.info(`Succeeded in subscribing event. subscribeId: ${subscribeId}`);
   11. } catch (err) {
   12. console.error(`Failed to subscribe event. Code: ${err.code}, message: ${err.message}`);
   13. }
   ```