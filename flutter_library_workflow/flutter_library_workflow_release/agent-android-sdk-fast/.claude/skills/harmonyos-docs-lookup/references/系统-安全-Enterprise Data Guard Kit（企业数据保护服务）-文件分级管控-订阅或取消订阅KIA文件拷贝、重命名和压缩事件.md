## 场景介绍

为应用提供监听或取消监听KIA文件拷贝、重命名和压缩事件的能力，当KIA文件发生变种时，通过回调函数，返回KIA变种信息。

## 接口说明

详细接口说明可参考[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard)。

展开

| 接口名 | 描述 |
| --- | --- |
| [on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section1970915372527)(type: 'kiaCopy', callback: Callback<string>): void | 订阅事件监听，需在业务初始化时注册。当用户拷贝KIA文件时会触发回调。 |
| [off](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section17735575217)(type: 'kiaCopy', callback?: Callback<string>): void | 取消订阅KIA文件拷贝事件监听。 |
| [on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section35573470434)(type: 'kiaRename', callback: Callback<string>): void | 订阅事件监听，需在业务初始化时注册。当用户重命名KIA文件时会触发回调。 |
| [off](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section35611847134314)(type: 'kiaRename', callback?: Callback<string>): void | 取消订阅KIA文件重命名事件监听。 |
| [on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section10111185510433)(type: 'kiaCompress', callback: Callback<string>): void | 订阅事件监听，需在业务初始化时注册。当用户压缩KIA文件时会触发回调。 |
| [off](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section5115755104315)(type: 'kiaCompress', callback?: Callback<string>): void | 取消订阅KIA文件压缩事件监听。 |

## 开发步骤

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { fileGuard } from '@kit.EnterpriseDataGuardKit';
   ```
2. 初始化[FileGuard](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-fileguard#section18457214114215)对象guard，调用接口on或off，订阅或取消订阅KIA文件拷贝、重命名和压缩事件。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. function onKiaCopyCallback(eventData: string) {
   2. console.info(`Succeeded in receiving kia copy eventData: ${eventData}.`);
   3. }
   4. function onKiaRenameCallback(eventData: string) {
   5. console.info(`Succeeded in receiving kia rename eventData: ${eventData}.`);
   6. }
   7. function onKiaCompressCallback(eventData: string) {
   8. console.info(`Succeeded in receiving kia compress eventData: ${eventData}.`);
   9. }

   11. function listenKIAEvent() {
   12. let guard: fileGuard.FileGuard = new fileGuard.FileGuard();
   13. try {
   14. guard.on('kiaCopy', onKiaCopyCallback);
   15. guard.on('kiaRename', onKiaRenameCallback);
   16. guard.on('kiaCompress', onKiaCompressCallback);
   17. } catch (e) {
   18. console.error(`Failed to monitor the kia event. Code: ${e.code}, message: ${e.message}.`);
   19. }
   20. try {
   21. guard.off('kiaCopy');
   22. guard.off('kiaRename');
   23. guard.off('kiaCompress');
   24. } catch (e) {
   25. console.error(`Failed to cancel monitoring the kia event. Code: ${e.code}, message: ${e.message}.`);
   26. }
   27. }
   ```