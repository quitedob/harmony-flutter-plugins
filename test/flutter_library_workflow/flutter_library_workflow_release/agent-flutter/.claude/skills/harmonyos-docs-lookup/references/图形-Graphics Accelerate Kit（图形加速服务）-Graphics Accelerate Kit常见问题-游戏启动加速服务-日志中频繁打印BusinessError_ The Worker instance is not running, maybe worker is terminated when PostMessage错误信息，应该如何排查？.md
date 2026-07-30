该错误通常是由于Worker线程崩溃或被终止导致。

开发者可在日志中进一步查找worker.onerror相关日志，确认Worker线程崩溃时的具体异常信息。

收起

自动换行

深色代码主题

复制

```
1. TuanjieMainWorker Error TypeError: undefined is not callable entry|entry|1.0.0|src/main/ets/workers/TuanjieMainWorkerHandler.ts
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ae/v3/1RUkBntzRHClnf8z1MxoNg/zh-cn_image_0000002486121014.png?HW-CC-KV=V1&HW-CC-Date=20260414T054607Z&HW-CC-Expire=86400&HW-CC-Sign=3FBE7851D0E2CDA1D2369962AEC4FBD077CCE2B3FC0F5DDFDB2AA17A6D4136DD)

根据worker.onerror日志排查，确认是否同时存在以下情况：

* 在onDestroy生命周期中销毁三方SDK。
* 三方SDK被销毁后，仍继续向Worker线程发送消息。
* Worker线程在处理消息过程中仍继续调用已销毁的三方 SDK，且未进行异常处理。

在秒级启动场景下，如果用户重新启动游戏后又上滑移除游戏 App，游戏进程不会主动销毁 Worker 线程和团结引擎。当 上述三种情况同时发生时，可能导致Worker线程崩溃，并在日志中频繁打印如下错误信息：

收起

自动换行

深色代码主题

复制

```
1. BusinessError: The Worker instance is not running, maybe worker is terminated when PostMessage
```