## 监测应用与Wear Engine服务的连接状态

华为运动健康App在后台停止服务（如功耗过高），从而导致应用与Wear Engine服务的连接状态发生变化。对于类似这种不确定的断开情况，开发者可以通过本功能特性了解当前应用和Wear Engine的连接状态。前提是在服务断开前，开发者已经使用该功能订阅过对Wear Engine服务连接状态的监测。

1. 在使用Wear Engine服务前，请导入WearEngine与相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { wearEngine } from '@kit.WearEngine';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 构造当服务连接断开时执行的回调函数。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let callback = () => {
   2. console.info(`The service destruction event`);
   3. }
   ```
3. 调用[wearEngine](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api)中的[on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section16809145282713)方法，订阅监听应用与Wear Engine服务的断联事件。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. wearEngine.on('serviceDie', callback);
   3. console.info(`Succeeded in subscribing the service destruction event.`);
   4. } catch (error) {
   5. const err: BusinessError = error as BusinessError;
   6. console.error(`Failed to subscribe the service destruction event. Code is ${err.code}, message is ${err.message}`);
   7. }
   ```

4. 调用[wearEngine](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api)中的[off](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section15262013102814)方法，取消监听应用与Wear Engine服务的断联事件。需要传入订阅监听时的同一个回调函数对象。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. wearEngine.off('serviceDie', callback);
   3. console.info(`Succeeded in unsubscribing the service destruction event.`);
   4. } catch (error) {
   5. const err: BusinessError = error as BusinessError;
   6. console.error(`Failed to unsubscribe the service destruction event. Code is ${err.code}, message is ${err.message}`);
   7. }
   ```

## 断开应用与Wear Engine服务的连接

断开后，将释放Wear Engine资源，监测设备状态、收消息、收文件等功能不可用，监听服务端断联事件的回调函数不会执行，同时会清理掉之前注册的回调函数。如需重新连接，主动调用任意接口即可。

1. 在使用Wear Engine服务前，请导入WearEngine与相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { wearEngine } from '@kit.WearEngine';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 调用[wearEngine](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api)中的[destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section890395942912)方法，断开应用与Wear Engine服务的连接。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. wearEngine.destroy().then(() => {
   2. console.info(`Succeeded in destroying wear engine channel`);
   3. }).catch((error: BusinessError) => {
   4. console.error(`Failed to destroy wear engine channel. Code is ${error.code}, message is ${error.message}`);
   5. })
   ```