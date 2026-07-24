## 场景介绍

在弱网环境下，系统发起多网迁移（WiFi<->蜂窝，主卡<->副卡等）的过程中，给应用提供连接迁移开始和完成通知，应用根据连接迁移通知的建议进行重建，快速恢复业务，给用户带来平滑、高速、低时延的上网体验。

## 接口说明

具体API说明详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/networkboost-nethandover#section13106021163)。

展开

| 接口名 | 描述 |
| --- | --- |
| on(type: 'handoverChange', callback: Callback<HandoverInfo>): void | 订阅连接迁移。 |
| off(type: 'handoverChange', callback?: Callback<HandoverInfo>): void | 取消订阅连接迁移。 |

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
2. 通过订阅的方式监听连接迁移信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. netHandover.on('handoverChange', (info: netHandover.HandoverInfo) => {
   3. if (info.handoverStart) {
   4. // 连接迁移开始回调，应用按照HandoverStart的建议调整数传策略
   5. console.info('handover start');
   6. } else if (info.handoverComplete) {
   7. // 连接迁移完成回调，应用按照HandoverComplete的建议进行调速和重建恢复
   8. console.info('handover complete');
   9. }
   10. });
   11. } catch (err) {
   12. console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
   13. }
   ```
3. 当应用业务流程结束，取消订阅连接迁移变化信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. netHandover.off('handoverChange');
   3. } catch (err) {
   4. console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
   5. }
   ```