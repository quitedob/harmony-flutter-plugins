## 场景介绍

应用在订阅网络场景识别后，系统在网络场景实时信息或预测信息发生变化后回调给应用，回调的网络场景信息包括数据传输的链路类型、网络场景类型、数传策略建议、弱信号信息等。

## 接口说明

具体API说明详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/networkboost-netquality#section132431252185419)。

展开

| 接口名 | 描述 |
| --- | --- |
| on(type: 'netSceneChange', callback: Callback<Array<NetworkScene>>): void | 订阅网络场景信息状态变化。 |
| off(type: 'netSceneChange', callback?: Callback<Array<NetworkScene>>): void | 取消订阅网络场景信息状态变化。 |

## 开发步骤

1. 导入Network Boost Kit模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { netQuality } from '@kit.NetworkBoostKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 通过订阅的方式监听网络场景识别信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. netQuality.on('netSceneChange', (list: Array<netQuality.NetworkScene>) => {
   3. if (list.length > 0) {
   4. list.forEach((sceneInfo) => {
   5. // 网络场景识别回调信息处理
   6. if (sceneInfo.scene == 'congestion') {
   7. // 网络拥塞分支处理
   8. }
   9. if (sceneInfo.weakSignalPrediction) {
   10. // 存在弱信号预测信息，对弱信号预测信息进行处理
   11. }
   12. });
   13. }
   14. });
   15. } catch (err) {
   16. console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
   17. }
   ```
3. 当应用业务流程结束，取消订阅监听网络场景识别信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. netQuality.off('netSceneChange');
   3. } catch (err) {
   4. console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
   5. }
   ```