提供星闪数传相关的端口通道建立和数据传输等功能，同一设备可以同时承担数据发送端和接收端的角色。

## 场景介绍

从5.1.0(18)开始支持星闪数据传输，包括端口注册、建立连接、读写数据等能力。

星闪设备间已建立起逻辑链路基础上，支持应用基于Nearlink技术进行设备间的数据传输。

注意

1. 数据传输通道不保证链路加密。如需加密数传，需先进行配对流程，通过[startPairing](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/nearlink-remote-device#section65252361113)接口发起。

2. 链路是否加密可通过[getAcbState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/nearlink-remote-device#section945162120309)接口查询，ENCRYPTED状态表示链路已加密。

## 接口说明

展开

| 接口名 | 描述 |
| --- | --- |
| [createPort](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/nearlink-data-transfer-api#section19932155019)(uuid: string): void | 注册端口服务。 |
| [connect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/nearlink-data-transfer-api#section1047122612211)(params: ConnectionParams): Promise<void> | 连接远端设备，建立端口通道。 |
| [writeData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/nearlink-data-transfer-api#section5484100194119)(params: DataParams): Promise<void> | 通过设备地址和UUID向远端设备发数据。 |
| [on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/nearlink-data-transfer-api#section1259823863112)(type: 'connectionStateChanged', callback: Callback<ConnectionResult>): void | 订阅端口通道连接状态变更事件。 |
| [on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/nearlink-data-transfer-api#section5547151720408)(type: 'readData', callback: Callback<DataParams>): void | 订阅端口通道数据接收事件。 |

## 开发步骤

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { dataTransfer } from '@kit.NearLinkKit';
   2. import { remoteDevice } from '@kit.NearLinkKit';
   3. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 与远端设备配对加密（可选，如需加密数传，则需执行此步骤）。该步骤执行后，将依据本端与远端设备的输入输出能力标识弹出不同类型的弹窗，需使用者进一步确认。目前支持免输入配对弹窗、数字比较弹窗与通行码鉴权弹窗。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let addr: string = '00:11:22:33:AA:FF'; // 扫描获取到的远端设备地址
   2. let device: remoteDevice.RemoteDevice;
   3. try {
   4. device = remoteDevice.createRemoteDevice(addr);
   5. device.startPairing().then(()=>{
   6. console.info('start pairing success');
   7. }).catch ((err: BusinessError) => {
   8. console.error('errCode: ' + err.code + ', errMessage: ' + err.message);
   9. });
   10. } catch (err) {
   11. console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
   12. }
   ```
3. 注册端口通道，发送端和接收端均需注册，并需保证发送端和接收端UUID相同。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let serviceUuid: string = 'FFFFFFFF-FC70-11EA-B720-000078951234'; // 星闪服务UUID，此处举例为自定义服务UUID
   2. try {
   3. dataTransfer.createPort(serviceUuid);
   4. console.info('create port success');
   5. } catch (err) {
   6. console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
   7. }
   ```
4. 订阅端口通道连接状态变更事件。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let onReceiveConnectionStateEvent:(data: dataTransfer.ConnectionResult) => void = (data: dataTransfer.ConnectionResult) => {
   2. console.info('data: ' + JSON.stringify(data));
   3. }
   4. try {
   5. dataTransfer.on('connectionStateChanged', onReceiveConnectionStateEvent);
   6. } catch (err) {
   7. console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
   8. }
   ```
5. 订阅端口通道数据接收事件。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let onReceiveReadDataEvent:(data: dataTransfer.DataParams) => void = (data: dataTransfer.DataParams) => {
   2. console.info('data: ' + JSON.stringify(data));
   3. }
   4. try {
   5. dataTransfer.on('readData', onReceiveReadDataEvent);
   6. } catch (err) {
   7. console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
   8. }
   ```
6. 连接远端设备，建立端口通道。其中UUID要与[步骤3](/consumer/cn/doc/harmonyos-guides/nearlink-start-data-transfer#li1311118434818)中注册的UUID相同。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 构造端口通道建立的参数
   2. let connectionParams:dataTransfer.ConnectionParams = {
   3. address: addr, // 扫描获取到的远端设备地址
   4. uuid: serviceUuid, // 星闪服务UUID
   5. mtu: 1024, // 期望发送数据包的字节大小,可选参数
   6. };
   7. try {
   8. dataTransfer.connect(connectionParams).then(()=>{
   9. console.info('connect success');
   10. }).catch ((err: BusinessError) => {
   11. console.error('errCode: ' + err.code + ', errMessage: ' + err.message);
   12. });
   13. } catch (err) {
   14. console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
   15. }
   ```
7. 通过设备地址和UUID向远端设备发数据。其中UUID要与[步骤3](/consumer/cn/doc/harmonyos-guides/nearlink-start-data-transfer#li1311118434818)中注册的UUID相同。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 构造发送数据参数
   2. let transferValueBuffer: Uint8Array = new Uint8Array(4);
   3. transferValueBuffer[0] = 1;
   4. transferValueBuffer[1] = 2;
   5. transferValueBuffer[2] = 3;
   6. transferValueBuffer[3] = 4;
   7. let dataParams: dataTransfer.DataParams = {
   8. address: addr, // 星闪远端设备地址
   9. uuid: serviceUuid, // 星闪服务UUID
   10. data: transferValueBuffer.buffer, // 星闪设备间传输的数据
   11. };
   12. try {
   13. dataTransfer.writeData(dataParams).then(() => {
   14. console.info('writeData success');
   15. }).catch ((err: BusinessError) => {
   16. console.error('errCode: ' + err.code + ', errMessage: ' + err.message);
   17. });
   18. } catch (err) {
   19. console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
   20. }
   ```