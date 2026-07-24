## 场景介绍

使用星闪前需要在设置应用里手动打开星闪。可以通过主动查询或订阅通知方式获取星闪状态，星闪状态变化为STATE\_ON时可以进行相应的业务流程。

## 接口说明

提供2种获取星闪开关状态的方式，主动查询和订阅状态变化。

展开

| 接口名 | 描述 |
| --- | --- |
| [getState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/nearlink-manager#section87401754163116)(): NearlinkState | 主动查询星闪开关状态。 |
| [on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/nearlink-manager#section13106021163)(type: 'stateChange', callback: Callback<NearlinkState>): void | 订阅星闪开关状态变化事件。 |
| [off](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/nearlink-manager#section1552411314504)(type: 'stateChange', callback?: Callback<NearlinkState>): void | 取消订阅星闪开关状态变化事件。 |

## 开发步骤

说明

可以在设备“设置 > 多设备协同 > 星闪”（不同产品或系统版本可能为“设置 > 星闪和蓝牙 > 星闪”）路径下，打开或关闭星闪，触发开关状态的变化。

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { manager } from '@kit.NearLinkKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 发起星闪状态查询。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. let state : manager.NearlinkState = manager.getState();
   3. console.info('state = '+ JSON.stringify(state));
   4. } catch (err) {
   5. console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
   6. }
   ```
3. 或者通过注册的方式订阅星闪开关状态变化。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let onReceiveEvent:(data: manager.NearlinkState) => void = (data: manager.NearlinkState) => {
   2. console.info('nearlink state = '+ JSON.stringify(data));
   3. }
   4. try {
   5. manager.on('stateChange', onReceiveEvent);
   6. } catch (err) {
   7. console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
   8. }
   ```
4. 取消订阅星闪开关状态变化，其中onReceiveEvent是[步骤3](/consumer/cn/doc/harmonyos-guides/nearlink-getstate#li7116175463320)中定义的回调函数。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. manager.off('stateChange', onReceiveEvent);
   3. } catch (err) {
   4. console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
   5. }
   ```