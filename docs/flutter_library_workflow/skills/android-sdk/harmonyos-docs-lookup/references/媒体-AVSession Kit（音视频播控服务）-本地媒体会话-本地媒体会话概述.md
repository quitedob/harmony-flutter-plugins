## 交互过程

本地媒体会话的数据源均在设备本地，交互过程如图所示。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/69/v3/Jc5V7VZsS8uYZAnREI3avg/zh-cn_image_0000002540771700.png?HW-CC-KV=V1&HW-CC-Date=20260414T052123Z&HW-CC-Expire=86400&HW-CC-Sign=3B9179B4E4B7264F0E441175CD27102B5A9F2C1C1B891E2B8AA90F4BAF3126B9)

此过程中涉及两大角色，媒体会话提供方和媒体会话控制方。

说明

媒体会话控制方为系统应用，三方应用可以成为媒体会话提供方。

本地媒体会话中，媒体会话提供方通过媒体会话管理器和媒体会话控制方进行信息交互：

1. 媒体会话提供方通过AVSessionManager创建AVSession对象。
2. 媒体会话提供方通过AVSession对象，设置会话元数据（媒体ID、标题、媒体时长等）、会话播放属性（播放状态、播放倍速、播放位置等）等。
3. 媒体会话控制方通过AVSessionManager创建AVSessionController对象。
4. 媒体会话控制方通过AVSessionController对象可以监听对应会话元数据变化、播放属性变化等。
5. 媒体会话控制方通过AVSessionController对象还可以向媒体会话发送控制命令。
6. 媒体会话提供方通过AVSession对象可以监听来自媒体会话控制方的控制命令，例如：“play”播放、“playNext”播放下一首、“fastForward”快进、 “setSpeed”设置播放倍速等。

## 媒体会话管理器

媒体会话管理器（AVSessionManager），提供了管理AVSession的能力，可以创建AVSession、创建AVSessionController、发送系统控制事件，也支持对AVSession的状态进行监听。

实际上，AVSessionManager与AVSession、AVSessionController对象不同，并不是一个具体的对象，它是媒体会话的根命名域。在实际编程过程中，可以通过如下方式引入：

收起

自动换行

深色代码主题

复制

```
1. import { avSession as AVSessionManager } from '@kit.AVSessionKit';
```

[Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Media/AVSession/LocalAVSession/LocalAVSessionOverview/entry/src/main/ets/pages/Index.ets#L17-L19)

根命名域中的所有方法都可以作为AVSessionManager的方法。

例如，媒体会话提供方通过AVSessionManager创建媒体会话的示例如下所示：

说明

以下示例代码仅展示创建AVSession对象的接口调用，应用在真正使用时，需要确保AVSession对象实例在应用后台播放业务活动期间一直存在，避免被系统回收、释放，导致后台发声时被系统管控。

收起

自动换行

深色代码主题

复制

```
1. import { avSession as AVSessionManager } from '@kit.AVSessionKit';
2. @Entry
3. @Component
4. struct Index {
5. @State message: string = 'hello world';

7. build() {
8. Column() {
9. Text(this.message)
10. .onClick(async () => {
11. // 创建session。
12. let context = this.getUIContext().getHostContext() as Context;
13. let session: AVSessionManager.AVSession = await AVSessionManager.createAVSession(context, 'SESSION_NAME', 'audio');
14. console.info(`session create done : sessionId : ${session.sessionId}`);
15. })
16. }
17. .width('100%')
18. .height('100%')
19. }
20. }
```

[Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Media/AVSession/LocalAVSession/LocalAVSessionOverview/entry/src/main/ets/pages/Index.ets#L16-L39)

更多关于AVSessionManager的方法，请参考API文档：[模块描述](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-avsession)。