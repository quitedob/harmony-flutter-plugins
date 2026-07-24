此处提供使用TaskPool进行长时任务的开发指导，以定期采集传感器数据为例。

## 使用TaskPool进行传感器数据监听

1. 导入所需的模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // Index.ets
   2. import { sensor } from '@kit.SensorServiceKit';
   3. import { taskpool } from '@kit.ArkTS';
   4. import { BusinessError, emitter } from '@kit.BasicServicesKit';
   ```
2. 定义长时任务，内部监听sensor数据，并通过emitter注册销毁通知。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // Index.ets
   2. @Concurrent
   3. async function SensorListener() : Promise<void> {
   4. sensor.on(sensor.SensorId.ACCELEROMETER, (data) => {
   5. emitter.emit({ eventId: 0 }, { data: data });
   6. }, { interval: 1000000000 });

   8. emitter.on({ eventId: 1 }, () => {
   9. sensor.off(sensor.SensorId.ACCELEROMETER)
   10. emitter.off(1)
   11. })
   12. }
   ```
3. 给sensor添加ohos.permission.ACCELEROMETER权限。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // module.json5
   2. "requestPermissions": [
   3. {
   4. "name": "ohos.permission.ACCELEROMETER"
   5. }
   6. ]
   ```
4. 宿主线程定义注册及销毁的行为。

   * 注册：发起长时任务，并通过emitter接收监听数据。
   * 销毁：发送取消传感器监听的事件，并结束长时任务。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { sensor } from '@kit.SensorServiceKit';
   2. import { taskpool } from '@kit.ArkTS';
   3. import { BusinessError, emitter } from '@kit.BasicServicesKit';

   5. @Concurrent
   6. async function sensorListener(): Promise<void> {
   7. sensor.on(sensor.SensorId.ACCELEROMETER, (data) => {
   8. emitter.emit({ eventId: 0 }, { data: data });
   9. }, { interval: 1000000000 });

   11. emitter.on({ eventId: 1 }, () => {
   12. sensor.off(sensor.SensorId.ACCELEROMETER)
   13. emitter.off(1)
   14. })
   15. }

   17. @Entry
   18. @Component
   19. struct Index {
   20. sensorTask?: taskpool.LongTask
   21. @State addListener: string = 'Add listener';
   22. @State deleteListener: string = 'Delete listener';

   24. build() {
   25. Column() {
   26. Text(this.addListener)
   27. .id('Add listener')
   28. .fontSize(50)
   29. .fontWeight(FontWeight.Bold)
   30. .onClick(() => {
   31. this.sensorTask = new taskpool.LongTask(sensorListener);
   32. emitter.on({ eventId: 0 }, (data) => {
   33. // Do something here
   34. console.info(`Receive ACCELEROMETER data: {${data.data?.x}, ${data.data?.y}, ${data.data?.z}`);
   35. });
   36. taskpool.execute(this.sensorTask).then(() => {
   37. console.info('Add listener of ACCELEROMETER success');
   38. }).catch((e: BusinessError) => {
   39. // Process error
   40. })
   41. this.addListener = 'success';
   42. })
   43. Text(this.deleteListener)
   44. .id('Delete listener')
   45. .fontSize(50)
   46. .fontWeight(FontWeight.Bold)
   47. .onClick(() => {
   48. emitter.emit({ eventId: 1 });
   49. emitter.off(0);
   50. if (this.sensorTask != undefined) {
   51. taskpool.terminateTask(this.sensorTask);
   52. } else {
   53. console.error('sensorTask is undefined.');
   54. }
   55. this.deleteListener = 'success';
   56. })
   57. }
   58. .height('100%')
   59. .width('100%')
   60. }
   61. }
   ```

   [LongTimeTaskGuide.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/master/ArkTS/ArkTsConcurrent/ApplicationMultithreadingDevelopment/ApplicationMultithreading/entry/src/main/ets/managers/LongTimeTaskGuide.ets#L16-L78)