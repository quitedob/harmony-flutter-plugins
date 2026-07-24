## 场景介绍

应用通过监听多网络状态的变化，感知可用网络的变化，从而选择在多网络上传输数据的策略。

## 接口说明

具体API说明详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/networkboost-nethandover#section7919111205211)。

展开

| 接口名 | 描述 |
| --- | --- |
| on(type: 'multiPathStateChange', callback: Callback<MultiPathStateInfo>): void | 订阅多网状态信息变化。 |
| off(type: 'multiPathStateChange', callback?: Callback<MultiPathStateInfo>): void | 取消订阅多网状态信息变化。 |

## 开发步骤

1. 导入Network Boost Kit模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { netHandover } from '@kit.NetworkBoostKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 通过订阅的方式监听多网状态变化信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. netHandover.on('multiPathStateChange', (data: netHandover.MultiPathStateInfo) => {
   3. // 回调信息处理
   4. console.info("on multiPathStateChange: " + JSON.stringify(data));
   5. });
   6. } catch (err) {
   7. console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
   8. }
   ```
3. 当应用业务流程结束和应用退出时，取消订阅多网状态变化信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. netHandover.off('multiPathStateChange');
   3. } catch (err) {
   4. console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
   5. }
   ```