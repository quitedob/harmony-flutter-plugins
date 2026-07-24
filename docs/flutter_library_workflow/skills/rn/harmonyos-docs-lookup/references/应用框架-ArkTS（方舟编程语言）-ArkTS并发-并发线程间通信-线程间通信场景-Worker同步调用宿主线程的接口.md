如果一个接口已在宿主线程中实现，Worker可以通过以下方式调用该接口。

以下示例展示了Worker同步调用宿主线程接口的方法，创建worker的方法可参考[创建worker的注意事项](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/worker-introduction#创建worker的注意事项)。

1. 首先，在宿主线程实现需要调用的接口，并创建Worker对象，在Worker对象上注册需要调用的对象。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { MessageEvents, worker } from '@kit.ArkTS';

   3. class TestObj {
   4. public getMessage(): string {
   5. return 'this is a message from TestObj';
   6. }

   8. public static testObj: TestObj = new TestObj();
   9. }

   11. @Entry
   12. @Component
   13. struct Index {
   14. @State message: string = 'Hello World';

   16. build() {
   17. Row() {
   18. Column() {
   19. Text(this.message)
   20. .fontSize(50)
   21. .fontWeight(FontWeight.Bold)
   22. .onClick(() => {
   23. // 创建Worker对象
   24. const workerInstance: worker.ThreadWorker = new worker.ThreadWorker("entry/ets/workers/Worker.ets");
   25. // 在Worker上注册需要调用的对象
   26. workerInstance.registerGlobalCallObject('testObj', TestObj.testObj);
   27. workerInstance.onmessage = (e: MessageEvents): void => {
   28. // 接收Worker子线程的结果
   29. console.info('mainThread: ' + e.data);
   30. // 销毁Worker
   31. workerInstance.terminate();
   32. }
   33. workerInstance.postMessage('start');
   34. })
   35. }
   36. .width('100%')
   37. }
   38. .height('100%')
   39. }
   40. }
   ```

   [WorkerCallGlobalUsage.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/master/ArkTS/ArkTsConcurrent/ConcurrentThreadCommunication/InterThreadCommunicationScenario/entry/src/main/ets/managers/WorkerCallGlobalUsage.ets#L16-L57)
2. 然后，在Worker中通过callGlobalCallObjectMethod接口可以调用宿主线程中的getMessage()方法。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { ErrorEvent, MessageEvents, ThreadWorkerGlobalScope, worker } from '@kit.ArkTS';

   3. const workerPort: ThreadWorkerGlobalScope = worker.workerPort;

   5. workerPort.onmessage = async (e: MessageEvents) => {
   6. if (e.data === 'start') {
   7. try {
   8. // 调用方法
   9. let res: string = workerPort.callGlobalCallObjectMethod('testObj', 'getMessage', 0) as string;
   10. if (res === 'this is a message from TestObj') {
   11. workerPort.postMessage('run function success.');
   12. }
   13. } catch (error) {
   14. // 异常处理
   15. console.error('worker: error code is ' + error.code + ' error message is ' + error.message);
   16. }
   17. }

   19. // ...
   20. }
   ```

   [Worker.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/master/ArkTS/ArkTsConcurrent/ConcurrentThreadCommunication/InterThreadCommunicationScenario/entry/src/main/ets/workers/Worker.ets#L17-L45)