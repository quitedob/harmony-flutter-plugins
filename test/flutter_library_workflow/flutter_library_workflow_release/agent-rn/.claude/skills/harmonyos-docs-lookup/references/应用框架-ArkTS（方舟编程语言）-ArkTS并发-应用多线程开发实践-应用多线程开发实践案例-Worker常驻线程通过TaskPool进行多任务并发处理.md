ArkTS应用开发过程中，可以选择TaskPool或Worker线程进行多任务并发处理，也可以两种并发能力都选择。

本示例将说明在Worker线程中通过TaskPool执行并发任务。

1. 在主线程中创建Worker线程并发送消息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // workerAndTaskpool.ets
   2. import { MessageEvents, worker } from '@kit.ArkTS';
   3. import { PromptAction } from '@kit.ArkUI';

   5. @Entry
   6. @Component
   7. struct Index {
   8. @State message: string = '在主线程中创建Worker线程并发送消息';
   9. @State returnMessage: string = 'return...';
   10. @State promptAction: PromptAction = this.getUIContext().getPromptAction();

   12. build() {
   13. RelativeContainer() {
   14. Button(this.message)
   15. .fontSize(25)
   16. .id('HelloWorld')
   17. .fontWeight(FontWeight.Bold)
   18. .alignRules({
   19. center: { anchor: '__container__', align: VerticalAlign.Center },
   20. middle: { anchor: '__container__', align: HorizontalAlign.Center }
   21. })
   22. .onClick(() => {
   23. // 1. 创建Worker实例
   24. const myWorker = new worker.ThreadWorker('entry/ets/workers/Worker.ets');

   26. // 2. 注册onmessage回调函数，以处理Worker发送到主线程的消息
   27. myWorker.onmessage = (e: MessageEvents) => {
   28. console.info('主线程收到最终结果:', e.data.result);
   29. this.returnMessage = '主线程收到最终结果:' + e.data.result;
   30. this.promptAction.showToast({ message: this.returnMessage });
   31. myWorker.terminate(); // 选择合适的时机销毁Worker
   32. };

   34. // 3. 向Worker发送启动指令
   35. myWorker.postMessage({ type: 'start', data: 10 });
   36. })
   37. // ...
   38. }
   39. .height('100%')
   40. .width('100%')
   41. }
   42. }
   ```

   [workerAndTaskpool.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/master/ArkTS/ArkTsConcurrent/ApplicationMultithreadingDevelopment/PracticalCasesSecond/entry/src/main/ets/pages/workerAndTaskpool.ets#L16-L61)
2. 在Worker线程中调用TaskPool执行并发任务。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // Worker.ets
   2. import { MessageEvents, ThreadWorkerGlobalScope, worker } from '@kit.ArkTS';
   3. import { taskpool } from '@kit.ArkTS';

   5. const workerPort: ThreadWorkerGlobalScope = worker.workerPort;
   6. workerPort.onmessage = async (e: MessageEvents) => {
   7. if (e.data.type === 'start') {
   8. // 模拟Worker数据处理
   9. const processedData = heavyComputation(e.data.data);

   11. // 调用TaskPool执行并发任务
   12. const task = new taskpool.Task(parallelTask, processedData);
   13. const result = await taskpool.execute(task);
   14. console.info('Worker线程返回结果: ', result);

   16. // 将最终结果返回主线程
   17. workerPort.postMessage({
   18. status: 'success',
   19. result: result
   20. });
   21. }
   22. }

   24. function heavyComputation(base: number): number {
   25. let sum = 0;
   26. for (let i = 0; i < base * 10; i++) {
   27. sum += Math.sqrt(i);
   28. }
   29. return sum;
   30. }

   32. @Concurrent
   33. function parallelTask(base: number): number {
   34. let total = 0;
   35. for (let i = 0; i < base; i++) {
   36. total += i % 2 === 0 ? i : -i;
   37. }
   38. console.info('TaskPool线程计算结果: ', total);
   39. return total;
   40. }
   ```

   [Worker.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/master/ArkTS/ArkTsConcurrent/ApplicationMultithreadingDevelopment/PracticalCasesSecond/entry/src/main/ets/workers/Worker.ets#L15-L56)