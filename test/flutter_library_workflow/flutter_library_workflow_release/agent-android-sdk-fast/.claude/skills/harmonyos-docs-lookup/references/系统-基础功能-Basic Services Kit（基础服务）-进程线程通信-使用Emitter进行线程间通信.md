Emitter是一种作用在进程内的事件处理机制，为应用程序提供订阅事件、发布事件、取消事件订阅的能力。

## 场景介绍

Emitter用于同一进程内相同线程或不同线程间的事件处理，事件异步执行。使用时需要先订阅一个事件，然后发布该事件，发布完成后Emitter会将已发布的事件分发给订阅者，订阅者就会执行该事件订阅时设置的回调方法。当不需要订阅该事件时应及时取消订阅释放Emitter资源。

## 运作机制

Emitter通过维护一个内部事件队列，来进行任务分发。应用需要先订阅某个事件并设置好该事件的回调方法，当应用程序发布事件后，就会往队列里面插入一个事件。任务队列会串行执行队列里面的任务，执行任务时会调用该任务订阅者的回调方法进行事件处理。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/56/v3/c5-9a4-SRP69E3RFtAmgbw/zh-cn_image_0000002540611968.png?HW-CC-KV=V1&HW-CC-Date=20260414T045241Z&HW-CC-Expire=86400&HW-CC-Sign=5393C5C36E370C77B90D5F26E031329838BE63C606FE803477F0455A1B762779)

## 接口说明

详细请参见[@ohos.events.emitter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-emitter)。

展开

| 接口名 | 用途 | 说明 |
| --- | --- | --- |
| on | 订阅事件 | 持续订阅事件，直至该事件被取消订阅。 |
| once | 订阅事件 | 订阅事件一次。 |
| emit | 发布事件 | 发布事件一次。 |
| off | 取消事件订阅 | 取消事件订阅后，将不再接收该事件的消息。 |

## 开发步骤

使用Emitter实现事件订阅、事件发送以及事件删除，开发步骤如下。

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { emitter, Callback } from '@kit.BasicServicesKit';
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Basic-Services-Kit/common_event/Emitter/entry/src/main/ets/pages/Index.ets#L15-L17)
2. 订阅事件。

   订阅事件使用on（持续订阅）或者once（单次订阅）接口进行订阅，设置要订阅的事件以及接收到事件后的回调函数。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 定义一个eventId为1的事件。
   2. let event: emitter.InnerEvent = {
   3. eventId: 1
   4. };
   5. // 定义一个事件的回调处理函数，当收到对应的事件后执行回调函数
   6. let callback: Callback<emitter.EventData> = (eventData: emitter.EventData) => {
   7. this.messageOn = eventData.data!.content
   8. console.info(`eventData: ${JSON.stringify(eventData)}`);
   9. }
   10. // ···
   11. // 收到eventId为1的事件后执行回调函数
   12. emitter.on(event, callback);
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Basic-Services-Kit/common_event/Emitter/entry/src/main/ets/pages/Index.ets#L24-L43)

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 收到eventId为1的事件后执行回调函数。
   2. // 注意：once订阅只接收一次事件，on订阅则一直接收直到取消订阅为止。
   3. emitter.once(event, callback);
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Basic-Services-Kit/common_event/Emitter/entry/src/main/ets/pages/Index.ets#L35-L39)
3. 发送事件。

   发送事件使用emit接口进行发送，设置要发送的事件以及要传递的参数。

   说明

   * emit接口支持跨线程传输数据对象，需要遵循数据跨线程传输的规格约束，详见[线程间通信对象](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/serializable-overview)。目前不支持使用[@State装饰器](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-state)、[@Observed装饰器](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-observed-and-objectlink)等装饰器修饰的复杂类型数据。
   * 使用emit接口发布某个事件后，不保证该事件立刻执行，执行时间取决于事件队列里面的事件数量以及各事件的执行效率。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 定义一个eventId为1的事件，事件优先级为Low。
   2. let event: emitter.InnerEvent = {
   3. eventId: 1,
   4. priority: emitter.EventPriority.LOW
   5. };

   7. let eventData: emitter.EventData = {
   8. data: {
   9. content: 'emitter',
   10. id: 1,
   11. isEmpty: false
   12. }
   13. };

   15. // 发送eventId为1的事件，事件内容为eventData。
   16. emitter.emit(event, eventData);
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Basic-Services-Kit/common_event/Emitter/entry/src/main/ets/pages/Index.ets#L47-L64)
4. 取消事件订阅。

   说明

   * 当不需要订阅某个事件时，需要及时取消订阅避免造成内存泄漏。
   * 使用[off](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-emitter#emitteroff)接口取消某个事件订阅后，已通过[emit](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-emitter#emitteremit)接口发布但尚未被执行的事件将被取消。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 取消eventId为1的事件。
   2. emitter.off(1);
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Basic-Services-Kit/common_event/Emitter/entry/src/main/ets/pages/Index.ets#L87-L90)