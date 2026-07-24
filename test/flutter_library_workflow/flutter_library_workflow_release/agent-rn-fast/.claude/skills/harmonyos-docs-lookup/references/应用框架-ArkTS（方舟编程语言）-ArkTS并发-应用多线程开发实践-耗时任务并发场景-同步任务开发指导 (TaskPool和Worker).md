同步任务用于在多个线程间协调执行，确保任务按特定顺序和规则进行（如使用锁防止数据竞争）。

同步任务的实现需要考虑多个线程之间的协作和同步，以确保数据的正确性和程序的正确执行。

当同步任务之间相对独立时，推荐使用TaskPool，例如一系列导入的静态方法或单例实现的方法。如果同步任务之间有关联性，则需要使用Worker。

## 使用TaskPool处理同步任务

以下场景推荐使用TaskPool。

* 调度相互独立的任务。
* 静态方法实现的任务。
* 单例构造的句柄或者类对象跨线程使用。

说明

由于[Actor模型](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/multi-thread-concurrency-overview#actor模型)不同线程间内存隔离的特性，非线程安全的单例无法在不同线程间使用。可通过共享模块导出单例解决此问题。

1. 定义并发函数，实现业务逻辑。
2. 创建任务[Task](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-taskpool#task)，通过[execute()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-taskpool#taskpoolexecute-1)接口执行该任务。
3. 对任务返回的结果进行操作。

如下示例中业务使用TaskPool调用相关同步方法的代码，首先定义并发函数taskpoolFunc，需要注意必须使用[@Concurrent装饰器](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/taskpool-introduction#concurrent装饰器)装饰该函数；其次定义函数mainFunc，该函数功能为创建任务，执行任务并处理任务返回的结果。

收起

自动换行

深色代码主题

复制

```
1. import { taskpool } from '@kit.ArkTS';
2. // ...

4. // 步骤1: 定义并发函数，实现业务逻辑
5. @Concurrent
6. async function taskpoolFunc(num: number): Promise<number> {
7. // 根据业务逻辑实现相应的功能
8. let tmpNum: number = num + 100;
9. return tmpNum;
10. }

12. async function mainFunc(): Promise<void> {
13. // 步骤2: 创建任务并执行
14. let task1: taskpool.Task = new taskpool.Task(taskpoolFunc, 1);
15. let res1: number = await taskpool.execute(task1) as number;
16. let task2: taskpool.Task = new taskpool.Task(taskpoolFunc, res1);
17. let res2: number = await taskpool.execute(task2) as number;
18. // 步骤3: 对任务返回的结果进行操作
19. console.info('taskpool: task res1 is: ' + res1);
20. console.info('taskpool: task res2 is: ' + res2);
21. }

23. @Entry
24. @Component
25. struct Index {
26. @State message: string = 'Hello World';

28. build() {
29. Row() {
30. Column() {
31. Text(this.message)
32. .fontSize(50)
33. .fontWeight(FontWeight.Bold)
34. .onClick(async () => {
35. mainFunc();
36. // ...
37. })
38. }
39. .width('100%')
40. }
41. .height('100%')
42. }
43. }
```

[SyncTaskDevelopment.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/master/ArkTS/ArkTsConcurrent/ApplicationMultithreadingDevelopment/ApplicationMultithreading/entry/src/main/ets/managers/SyncTaskDevelopment.ets#L16-L82)

## 使用Worker处理关联的同步任务

当一系列同步任务需要使用同一个句柄调度，或者需要依赖某个类对象调度，且无法在不同任务池之间共享时，需要使用Worker。

1. 在UI主线程中创建Worker对象并接收Worker线程发送的消息。DevEco Studio支持一键生成Worker。在{moduleName}目录下任意位置，点击鼠标右键 > New > Worker，即可生成Worker的模板文件及配置信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { MessageEvents, worker } from '@kit.ArkTS';
   2. // ...
   3. @Entry
   4. @Component
   5. struct Index {
   6. @State message: string = 'Hello World';

   8. build() {
   9. Row() {
   10. Column() {
   11. Text(this.message)
   12. .fontSize(50)
   13. .fontWeight(FontWeight.Bold)
   14. .onClick(async () => {
   15. // ...
   16. let w: worker.ThreadWorker = new worker.ThreadWorker('entry/ets/workers/MyWorker2.ts');
   17. w.onmessage = (e: MessageEvents): void => {
   18. // 接收Worker子线程的结果
   19. console.info('main thread onmessage, ' + e.data.message);
   20. // 销毁Worker
   21. if (e.data.isTerminate) {
   22. w.terminate();
   23. }
   24. }
   25. // 向Worker子线程发送Set消息
   26. w.postMessage({'type': 0, 'data': 10});
   27. // 向Worker子线程发送Get消息
   28. w.postMessage({'type': 1});
   29. })
   30. }
   31. .width('100%')
   32. }
   33. .height('100%')
   34. }
   35. }
   ```

   [SyncTaskDevelopment.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/master/ArkTS/ArkTsConcurrent/ApplicationMultithreadingDevelopment/ApplicationMultithreading/entry/src/main/ets/managers/SyncTaskDevelopment.ets#L19-L81)
2. 在Worker线程中绑定Worker对象，同时处理同步任务逻辑。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. export default class Handle {
   2. id: number = 0;

   4. syncGet(): number {
   5. return this.id;
   6. }

   8. syncSet(num: number): boolean {
   9. this.id = num;
   10. return true;
   11. }
   12. }
   ```

   [handle.ts](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/master/ArkTS/ArkTsConcurrent/ApplicationMultithreadingDevelopment/ApplicationMultithreading/entry/src/main/ets/workers/handle.ts#L16-L29)

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { worker, ThreadWorkerGlobalScope, MessageEvents } from '@kit.ArkTS';
   2. // 返回句柄
   3. import Handle from './handle';

   5. let workerPort : ThreadWorkerGlobalScope = worker.workerPort;

   7. // 无法传输的句柄，所有操作依赖此句柄
   8. let handler: Handle = new Handle();

   10. // Worker线程的onmessage逻辑
   11. workerPort.onmessage = (e : MessageEvents): void => {
   12. switch (e.data.type as number) {
   13. case 0:
   14. let result: boolean = false;
   15. result = handler.syncSet(e.data.data);
   16. console.info("worker: result is " + result);
   17. workerPort.postMessage({'message': 'the result of syncSet() is ' + result, 'isTerminate': false});
   18. break;
   19. case 1:
   20. let num: number = 0;
   21. num = handler.syncGet();
   22. console.info("worker: num is " + num);
   23. workerPort.postMessage({'message': 'the result of syncGet() is ' + num, 'isTerminate': true});
   24. break;
   25. }
   26. }
   ```

   [MyWorker2.ts](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/master/ArkTS/ArkTsConcurrent/ApplicationMultithreadingDevelopment/ApplicationMultithreading/entry/src/main/ets/workers/MyWorker2.ts#L16-L43)