数字车钥匙开通完成后，车主APP可以通过车控指令远程控制车辆的开门等操作。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/96/v3/imhdC6IcRsepcezKWGa_Kg/zh-cn_image_0000002218521713.png?HW-CC-KV=V1&HW-CC-Date=20260414T033644Z&HW-CC-Expire=86400&HW-CC-Sign=B83B643BD1A658BFC011D4884847150A33C63AAF664BD77002C6CE9373CDB4ED)

典型的交互流程如下:

* 通过[queryICCEConnectionState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-walletpass#section82336268523)接口检查车控蓝牙的连接状态，如果未连接则使用[startICCEConnection](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-walletpass#section137818297525)主动连接。
* 通过[registerICCEListener](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-walletpass#section287123205213)注册监听，接收华为钱包发送的消息。
* 车主APP可以通过[sendICCERKEMessage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-walletpass#section73091546144716)接口发送车控指令。
* 用户退出数字钥匙车控页面，通过[unregisterICCEListener](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-walletpass#section692193414523)接口取消监听。

## 开发步骤

1. 车主APP使用[创建Wallet Kit服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/wallet-preparations)时注册的服务号和[申请钥匙卡片](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-rest-api-carkey#section129511211195)时定义的卡券唯一标识，通过[queryICCEConnectionState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-walletpass#section82336268523)判断车钥匙的蓝牙链路状态。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { common } from '@kit.AbilityKit';
   2. import { walletPass } from '@kit.WalletKit';
   3. import { BusinessError } from '@kit.BasicServicesKit';

   5. @Entry
   6. @Component
   7. struct Index {
   8. private walletPassClient: walletPass.WalletPassClient = new walletPass.WalletPassClient(this.getUIContext().getHostContext() as common.UIAbilityContext);
   9. // 创建Wallet Kit服务时注册的服务号
   10. private passType: string = '';
   11. // 申请钥匙卡片时定义的卡券唯一标识
   12. private serialNumber: string = '';

   14. async queryICCEConnectionState() {
   15. let passStr = JSON.stringify({
   16. passType: this.passType,
   17. serialNumber: this.serialNumber
   18. });
   19. this.walletPassClient.queryICCEConnectionState(passStr).then((result: string) => {
   20. console.info(`Succeeded in querying ICCEConnectionState, result: ${result}`);
   21. }).catch((err: BusinessError) => {
   22. console.error(`Failed to query ICCEConnectionState, code:${err.code}, message:${err.message}`);
   23. })
   24. }

   26. build() {
   27. // your application UI
   28. }
   29. }
   ```
2. 如果[queryICCEConnectionState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-walletpass#section82336268523)接口返回连接状态connectionState为未配对0时，需要调用[startICCEConnection](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-walletpass#section137818297525)主动创建蓝牙链接。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { common } from '@kit.AbilityKit';
   2. import { walletPass } from '@kit.WalletKit';
   3. import { BusinessError } from '@kit.BasicServicesKit';

   5. @Entry
   6. @Component
   7. struct Index {
   8. private walletPassClient: walletPass.WalletPassClient = new walletPass.WalletPassClient(this.getUIContext().getHostContext() as common.UIAbilityContext);
   9. // 创建Wallet Kit服务时注册的服务号
   10. private passType: string = '';
   11. // 申请钥匙卡片时定义的卡券唯一标识
   12. private serialNumber: string = '';

   14. async startICCEConnection() {
   15. let passStr = JSON.stringify({
   16. passType: this.passType,
   17. serialNumber: this.serialNumber
   18. });
   19. this.walletPassClient.startICCEConnection(passStr).then((result: string) => {
   20. console.info(`Succeeded in starting ICCEConnection, result: ${result}`);
   21. }).catch((err: BusinessError) => {
   22. console.error(`Failed to start ICCEConnection, code:${err.code}, message:${err.message}`);
   23. })
   24. }

   26. build() {
   27. // your application UI
   28. }
   29. }
   ```
3. 车主APP通过[registerICCEListener](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-walletpass#section287123205213)注册监听华为钱包发送的消息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { common } from '@kit.AbilityKit';
   2. import { walletPass } from '@kit.WalletKit';
   3. import { BusinessError } from '@kit.BasicServicesKit';
   4. import { rpc } from '@kit.IPCKit';

   6. class ICCECallBack extends rpc.RemoteObject {
   7. constructor() {
   8. super('ICCECallBack');
   9. }

   11. async onRemoteMessageRequest(code: number, data: rpc.MessageSequence, reply: rpc.MessageSequence, option: rpc.MessageOption): Promise<boolean> {
   12. // processing after receiving communication data
   13. let codeInt = data.readInt();
   14. return true;
   15. }
   16. }

   18. @Entry
   19. @Component
   20. struct Index {
   21. private walletPassClient: walletPass.WalletPassClient = new walletPass.WalletPassClient(this.getUIContext().getHostContext() as common.UIAbilityContext);
   22. private callback: rpc.RemoteObject | null = null;
   23. // 创建Wallet Kit服务时注册的服务号
   24. private passType: string = '';
   25. // 注册监听的应用名称，一般为包名
   26. private registerName: string = '';

   28. async registerICCEListener() {
   29. let passStr = JSON.stringify({
   30. passType: this.passType,
   31. registerName: this.registerName
   32. });
   33. this.callback = new ICCECallBack();
   34. this.walletPassClient.registerICCEListener(passStr, this.callback).then((result: string) => {
   35. console.info(`Succeeded in registering ICCEListener, result: ${result}`);
   36. }).catch((err: BusinessError) => {
   37. console.error(`Failed to register ICCEListener, code:${err.code}, message:${err.message}`);
   38. })
   39. }

   41. build() {
   42. // your application UI
   43. }
   44. }
   ```
4. 车主APP通过[sendICCERKEMessage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-walletpass#section73091546144716)接口发送车控指令。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { common } from '@kit.AbilityKit';
   2. import { walletPass } from '@kit.WalletKit';
   3. import { BusinessError } from '@kit.BasicServicesKit';

   5. @Entry
   6. @Component
   7. struct Index {
   8. private walletPassClient: walletPass.WalletPassClient = new walletPass.WalletPassClient(this.getUIContext().getHostContext() as common.UIAbilityContext);
   9. // 创建Wallet Kit服务时注册的服务号
   10. private passType: string = '';
   11. // 申请钥匙卡片时定义的卡券唯一标识
   12. private serialNumber: string = '';
   13. // 车控指令
   14. private rkeCommand: string = '';

   16. async sendICCERKEMessage() {
   17. let passStr = JSON.stringify({
   18. passType: this.passType,
   19. serialNumber: this.serialNumber,
   20. rkeCommand: this.rkeCommand,
   21. encryptFlag: '0',
   22. directionFlag: '1'
   23. });
   24. this.walletPassClient.sendICCERKEMessage(passStr).then((result: string) => {
   25. console.info(`Succeeded in sending ICCERKEMessage, result: ${result}`);
   26. }).catch((err: BusinessError) => {
   27. console.error(`Failed to send ICCERKEMessage, code:${err.code}, message:${err.message}`);
   28. })
   29. }

   31. build() {
   32. // your application UI
   33. }
   34. }
   ```
5. 用户退出数字钥匙车控页面，车主APP通过[unregisterICCEListener](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-walletpass#section692193414523)接口取消监听。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { common } from '@kit.AbilityKit';
   2. import { walletPass } from '@kit.WalletKit';
   3. import { BusinessError } from '@kit.BasicServicesKit';
   4. import { rpc } from '@kit.IPCKit';

   6. @Entry
   7. @Component
   8. struct Index {
   9. private walletPassClient: walletPass.WalletPassClient = new walletPass.WalletPassClient(this.getUIContext().getHostContext() as common.UIAbilityContext);
   10. private callback: rpc.RemoteObject | null = null;
   11. // 创建Wallet Kit服务时注册的服务号
   12. private passType: string = '';
   13. // 注册监听的应用名称，一般为包名
   14. private registerName: string = '';

   16. async unregisterICCEListener() {
   17. let passStr = JSON.stringify({
   18. passType: this.passType,
   19. registerName: this.registerName
   20. });

   22. this.walletPassClient.unregisterICCEListener(passStr).then((result: string) => {
   23. console.info(`Succeeded in unregistering ICCEListener, result: ${result}`);
   24. this.callback = null;
   25. }).catch((err: BusinessError) => {
   26. console.error(`Failed to unregister ICCEListener, code:${err.code}, message:${err.message}`);
   27. })
   28. }

   30. build() {
   31. // your application UI
   32. }
   33. }
   ```