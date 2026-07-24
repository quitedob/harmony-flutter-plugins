## 场景介绍

发送星闪广播，广播数据可以被支持星闪能力的中心设备扫描到。

## 接口说明

展开

| 接口名 | 描述 |
| --- | --- |
| [startAdvertising](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/nearlink-advertising#section87401754163116)(advertisingParams: AdvertisingParams): Promise<number> | 启动星闪广播。 |
| [stopAdvertising](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/nearlink-advertising#section1238104011424)(advertisingId: number): Promise<void> | 停止星闪广播。 |
| [on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/nearlink-advertising#section13106021163)(type: 'advertisingStateChange', callback: Callback<AdvertisingStateChangeInfo>): void | 订阅星闪广播状态变化事件。 |
| [off](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/nearlink-advertising#section1552411314504)(type: 'advertisingStateChange', callback?: Callback<AdvertisingStateChangeInfo>): void | 取消订阅星闪广播状态变化事件。 |

## 开发步骤

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { advertising } from '@kit.NearLinkKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 订阅星闪广播状态变化事件。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let onReceiveEvent:(data: advertising.AdvertisingStateChangeInfo) => void = (data: advertising.AdvertisingStateChangeInfo) => {
   2. console.info('advertisingId:'+ data.advertisingId);
   3. console.info('advertisingState:'+ data.state);
   4. }
   5. try {
   6. advertising.on('advertisingStateChange', onReceiveEvent);
   7. } catch (err) {
   8. console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
   9. }
   ```
3. 构造用户需要的广播参数及数据。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let manufactureValueBuffer = new Uint8Array(4);
   2. manufactureValueBuffer[0] = 1;
   3. manufactureValueBuffer[1] = 2;
   4. manufactureValueBuffer[2] = 3;
   5. manufactureValueBuffer[3] = 4;
   6. let serviceValueBuffer = new Uint8Array(4);
   7. serviceValueBuffer[0] = 4;
   8. serviceValueBuffer[1] = 6;
   9. serviceValueBuffer[2] = 7;
   10. serviceValueBuffer[3] = 8;
   11. console.info('manufactureValueBuffer = '+ JSON.stringify(manufactureValueBuffer));
   12. console.info('serviceValueBuffer = '+ JSON.stringify(serviceValueBuffer));
   13. let setting: advertising.AdvertisingSettings = {
   14. interval:5000,
   15. power:advertising.TxPowerMode.ADV_TX_POWER_LOW
   16. };
   17. let manufactureDataUnit: advertising.ManufacturerData = {
   18. manufacturerId:4567,
   19. manufacturerData:manufactureValueBuffer.buffer
   20. };
   21. let serviceDataUnit: advertising.ServiceData = {
   22. serviceUuid:"37bea880-fc70-11ea-b720-000000001234",
   23. serviceData:serviceValueBuffer.buffer
   24. };
   25. let advData: advertising.AdvertisingData = {
   26. serviceUuids:["37bea880-fc70-11ea-b720-000000001234"],
   27. manufacturerData:[manufactureDataUnit],
   28. serviceData:[serviceDataUnit]
   29. };
   30. let advertisingParams: advertising.AdvertisingParams = {
   31. advertisingSettings: setting,
   32. advertisingData: advData
   33. };
   ```
4. 开启星闪广播，返回advertisingId表示当前广播索引。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let advId = -1;
   2. try {
   3. advertising.startAdvertising(advertisingParams).then((advertisingId:number) => {
   4. advId = advertisingId;
   5. console.info('advertising id:'+ JSON.stringify(advId));
   6. }).catch ((err: BusinessError) => {
   7. console.error('errCode: ' + err.code + ', errMessage: ' + err.message);
   8. });
   9. } catch (err) {
   10. console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
   11. }
   ```
5. 停止星闪广播，其中advId是[步骤4](/consumer/cn/doc/harmonyos-guides/nearlink-send-advertising#li18315388294)开启广播后返回的advertisingId。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. advertising.stopAdvertising(advId).then(() => {
   3. console.info("stop advertising success");
   4. }).catch ((err: BusinessError) => {
   5. console.error('errCode: ' + err.code + ', errMessage: ' + err.message);
   6. });
   7. } catch (err) {
   8. console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
   9. }
   ```
6. 取消订阅星闪广播状态变化事件。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. advertising.off('advertisingStateChange', onReceiveEvent);
   3. } catch (err) {
   4. console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
   5. }
   ```

## 示例代码

星闪广播场景可参考[星闪示例代码](https://gitcode.com/harmonyos_samples/nearlink-kit_-sample-code)，entry/src/main/ets/pages/MainPage.ets中的实现方法。