## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9b/v3/vSeG6Jw7QKadS41efkX8fw/zh-cn_image_0000002474311102.png?HW-CC-KV=V1&HW-CC-Date=20260414T030440Z&HW-CC-Expire=86400&HW-CC-Sign=0D521AA7C69667FA510D90BB20A7D12CECC70B55AEC1E67FAC9245FC7BDDE2DE)

1. 发送端和接收端调用[create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section131971556806)创建游戏近场快传服务。
2. 创建成功后，游戏客户端调用以下接口注册监听。
   * 注册连接通知监听接口：[on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section17453143012584)('connectNotify')
   * （发送端选择绑定接收端情况下需调用）注册发现结果事件监听接口：[on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section766518402463)('discovery')
   * 注册收到包信息监听接口：[on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section1959517425315)('receivePackageInfo')
   * 注册传输通知监听接口：[on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section05583466314)('transferNotify')
   * 注册错误事件监听接口：[on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section122432503314)('error')
3. 接收端调用[publishNearbyGame](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section225333655719)发布自身近场快传服务。
4. 绑定接收端，支持如下两种方式。
   * 自动绑定：

     发送端调用[autoBindNearbyGame](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section52391745713)自动绑定附近设备（搜索并绑定附近10米内第一个发现的近场快传服务）。

     说明

     自动绑定操作2分钟内有效，超时需重新调用接口。
   * 选择绑定：

     发送端调用[discoveryNearbyGame](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section16687197125918)发现附近设备，发现操作完成后将收到discovery事件回调，获得可绑定的设备列表供玩家选择，调用[bindNearbyGame](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section13279659901)接口绑定玩家选定的接收端设备。

     说明

     发现操作2分钟内有效，超时需重新调用接口。
5. 接收端收到UIAbility的[onCollaborate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-uiability#oncollaborate18)回调后调用[acceptCollaboration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section106164517195)接受协同。
6. 接收端收到建链成功connectNotify事件回调。
7. 接收端调用[sendPackageInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section12490112992612)发送自身文件信息，如版本信息、包信息。
8. 发送端收到receivePackageInfo事件回调。
9. 发送端比较版本并调用[replyPackageInfoResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section78288285293)上报对比结果。
10. 如发送端对比结果为需要发送，则调用[transferPackageData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section1227711101118)向接收端发送需要传输的资源包。
11. 接收端可在transferNotify回调中获取当前已传输的包体大小、包体总大小、传输速率、传输剩余时间等信息，传输完成可获取已接收资源包的存储目录，对传输完成的资源文件做处理。
12. 处理传输完成的资源文件后，可调用[destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section13373155416)销毁服务。

    说明

    * destroy接口会清除已接收数据，请确保对已接收数据做好处理或转移后再调用该接口。
    * 每次调用[create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section131971556806)接口会自动清理自身历史数据。

## 接口说明

具体API说明详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer)。

展开

| 接口名 | 描述 |
| --- | --- |
| [create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section131971556806)(createParameters: CreateParameters): Promise<CreateResult> | 创建游戏近场快传服务。 |
| [on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section17453143012584)(type: 'connectNotify', callback: Callback<ConnectNotification>): void | 订阅连接通知事件。 |
| [off](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section3614173614593)(type: 'connectNotify', callback?: Callback<ConnectNotification>): void | 取消订阅连接通知事件。 |
| [on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section766518402463)(type: 'discovery', callback: Callback<DiscoveryResult>): void | 订阅发现结果事件。 |
| [off](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section10671640104614)(type: 'discovery', callback?: Callback<DiscoveryResult>): void | 取消订阅发现结果事件。 |
| [on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section1959517425315)(type: 'receivePackageInfo', callback: Callback<PackageInfo>): void | 订阅收到包信息事件。 |
| [off](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section1359944210319)(type: 'receivePackageInfo', callback?: Callback<PackageInfo>): void | 取消订阅收到包信息事件。 |
| [on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section05583466314)(type: 'transferNotify', callback: Callback<TransferNotification>): void | 订阅传输通知事件。 |
| [off](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section65611146153113)(type: 'transferNotify', callback?: Callback<TransferNotification>): void | 取消订阅传输通知事件。 |
| [on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section122432503314)(type: 'error', callback: Callback<ReturnResult>): void | 订阅错误事件。 |
| [off](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section20246850163115)(type: 'error', callback?: Callback<ReturnResult>): void | 取消订阅错误事件。 |
| [publishNearbyGame](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section225333655719)(): Promise<void> | 发布近场快传服务。 |
| [autoBindNearbyGame](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section52391745713)(): Promise<void> | 自动绑定近场快传服务。 |
| [discoveryNearbyGame](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section16687197125918)(): Promise<void> | 发现近场快传服务。 |
| [bindNearbyGame](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section13279659901)(bindParameters: BindParameters): Promise<void> | 绑定指定近场快传服务。 |
| [acceptCollaboration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section106164517195)(acceptParameters: Record<string, object>): Promise<void> | 接受协同。 |
| [sendPackageInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section12490112992612)(packageInfo: PackageInfo): Promise<void> | 接收端发送自身文件信息。 |
| [replyPackageInfoResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section78288285293)(packageInfoResult: PackageInfoResult): Promise<void> | 上报包信息对比结果。 |
| [transferPackageData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section1227711101118)(packageData: PackageData): Promise<void> | 传输包数据。 |
| [destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section13373155416)(): Promise<void> | 销毁游戏近场快传服务。 |

## 接入步骤

### 导入模块

导入Game Service Kit及公共模块。

收起

自动换行

深色代码主题

复制

```
1. import { abilityAccessCtrl, AbilityConstant, UIAbility, common } from "@kit.AbilityKit";
2. import { hilog } from '@kit.PerformanceAnalysisKit';
3. import { gameNearbyTransfer } from '@kit.GameServiceKit';
4. import { BusinessError } from '@kit.BasicServicesKit';
```

### 申请权限

申请ohos.permission.DISTRIBUTED\_DATASYNC权限用于设备发现，详情可参考[向用户申请授权](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/request-user-authorization)。

收起

自动换行

深色代码主题

复制

```
1. let atManager = abilityAccessCtrl.createAtManager();
2. let uiAbilityContext = this.getUIContext()?.getHostContext() as common.UIAbilityContext;
3. try {
4. atManager.requestPermissionsFromUser(uiAbilityContext, ['ohos.permission.DISTRIBUTED_DATASYNC']).then((data) => {
5. hilog.info(0x0000, 'nearby', '%{public}s', 'data: ' + JSON.stringify(data));
6. }).catch((err: object) => {
7. hilog.error(0x0000, 'nearby', '%{public}s', 'err: ' + JSON.stringify(err));
8. })
9. } catch (err) {
10. hilog.error(0x0000, '[nearby]', '%{public}s', 'error' + (err as Error).message);
11. }
```

### 创建游戏近场快传服务并注册相关回调

导入相关模块后，需先调用[create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section131971556806)接口创建游戏近场快传服务，然后注册各回调事件。

说明

[create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section131971556806)接口是调用其他接口的前提，如果未创建游戏近场快传服务或创建失败，将无法调用其他接口。

收起

自动换行

深色代码主题

复制

```
1. public create() {
2. let uiAbilityContext = this.getUIContext()?.getHostContext() as common.UIAbilityContext;
3. let initParam: gameNearbyTransfer.CreateParameters = {
4. abilityName: uiAbilityContext.abilityInfo.name,
5. context: uiAbilityContext,
6. moduleName: uiAbilityContext.abilityInfo.moduleName,
7. needShowSystemUI: false // 是否展示系统UI，true为展示，false为不展示，默认为false
8. };
9. try {
10. gameNearbyTransfer.create(initParam).then((createResult) => {
11. hilog.info(0x0000, '[nearby]', '%{public}s', 'create success' + createResult.localDeviceName);
12. this.registerCallback();
13. }).catch((err: BusinessError) => {
14. hilog.error(0x0000, '[nearby]', '%{public}s', 'create error' + (err as Error).message);
15. })
16. } catch (err) {
17. hilog.error(0x0000, '[nearby]', '%{public}s', 'error' + (err as Error).message);
18. }
19. }

21. // 注册监听
22. public registerCallback() {
23. try {
24. gameNearbyTransfer.on('connectNotify', connectNotifyCallBack);
25. gameNearbyTransfer.on('receivePackageInfo', receivePackageInfoCallBack);
26. gameNearbyTransfer.on('transferNotify', transferNotifyCallBack);
27. gameNearbyTransfer.on('error', errorCallBack);
28. } catch (err) {
29. hilog.error(0x0000, '[nearby]', '%{public}s', 'error' + (err as Error).message);
30. }
31. }

33. function connectNotifyCallBack(callback: gameNearbyTransfer.ConnectNotification) {
34. // 连接状态回调，接收端收到建链成功回调后，在此处调用sendPackageInfo接口发送自身文件信息，如版本信息、包信息
35. }

37. function receivePackageInfoCallBack(callback: gameNearbyTransfer.PackageInfo) {
38. // 接收包信息回调，发送端收到接收端发送的版本信息后进行对比，根据对比结果决定是否需要传输资源包数据。
39. }

41. function transferNotifyCallBack(callback: gameNearbyTransfer.TransferNotification) {
42. // 传输回调，处理传输进度信息
43. }

45. function errorCallBack(callback: gameNearbyTransfer.ReturnResult) {
46. // 异常信息回调，处理相关异常信息
47. }
```

### 接收端接受协同

接收端实现[onCollaborate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-uiability#oncollaborate18)回调，回调中调用[acceptCollaboration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section106164517195)接口接受协同。

收起

自动换行

深色代码主题

复制

```
1. export default class EntryAbility extends UIAbility {
2. // 协同回调
3. onCollaborate(wantParam: Record<string, Object>): AbilityConstant.CollaborateResult {
4. try {
5. gameNearbyTransfer.acceptCollaboration(wantParam);
6. } catch (err) {
7. hilog.error(0x0000, '[nearby]', '%{public}s', 'error' + (err as Error).message);
8. }
9. hilog.info(0x0000, '[nearby]', '%{public}s', 'onCollaborate: accept collaborate');
10. return AbilityConstant.CollaborateResult.ACCEPT;
11. }
12. }
```

### 接收端发布自身游戏近场快传服务

接收端调用[publishNearbyGame](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section225333655719)接口发布自身游戏近场快传服务。

收起

自动换行

深色代码主题

复制

```
1. try {
2. gameNearbyTransfer.publishNearbyGame().then(() => {
3. hilog.info(0x0000, '[nearby]', '%{public}s', 'publishNearbyGame success');
4. }).catch((err: BusinessError) => {
5. hilog.error(0x0000, '[nearby]', '%{public}s', 'publishNearbyGame error' + (err as Error).message);
6. })
7. } catch (err) {
8. hilog.error(0x0000, '[nearby]', '%{public}s', 'error' + (err as Error).message);
9. }
```

### 发送端绑定接收端游戏近场快传服务

发送端绑定接收端游戏近场快传服务支持如下两种方式：

* 方式一：自动绑定

  发送端调用[autoBindNearbyGame](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section52391745713)接口自动绑定接收端近场快传服务。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. try {
  2. gameNearbyTransfer.autoBindNearbyGame().then(() => {
  3. hilog.info(0x0000, '[nearby]', '%{public}s', 'autoBindNearbyGame success');
  4. }).catch((err: BusinessError) => {
  5. hilog.error(0x0000, '[nearby]', '%{public}s', 'autoBindNearbyGame error' + (err as Error).message);
  6. })
  7. } catch (err) {
  8. hilog.error(0x0000, '[nearby]', '%{public}s', 'error' + (err as Error).message);
  9. }
  ```

* 方式二：选择绑定
  1. 发送端调用[on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section766518402463)('discovery')接口注册“发现设备”结果事件监听。

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. try {
     2. gameNearbyTransfer.on('discovery', discoveryCallBack);
     3. } catch (err) {
     4. hilog.error(0x0000, '[nearby]', '%{public}s', 'error' + (err as Error).message)
     5. }

     7. function discoveryCallBack(callback: gameNearbyTransfer.DiscoveryResult) {
     8. // 获取到发现的设备 展示设备列表
     9. callback.nearbyGameDevices.forEach((device: gameNearbyTransfer.NearbyGameDevice, index: number) => {
     10. });
     11. }
     ```
  2. 发送端调用[discoveryNearbyGame](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section16687197125918)发现附近设备。

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. try {
     2. gameNearbyTransfer.discoveryNearbyGame().then(() => {
     3. hilog.info(0x0000, '[nearby]', '%{public}s', 'discoveryNearbyGame success');
     4. }).catch((err: BusinessError) => {
     5. hilog.error(0x0000, '[nearby]', '%{public}s', 'discoveryNearbyGame error' + (err as Error).message);
     6. })
     7. } catch (err) {
     8. hilog.error(0x0000, '[nearby]', '%{public}s', 'error' + (err as Error).message);
     9. }
     ```
  3. “发现设备”操作完成后将收到discovery事件回调，获得发现的设备列表供玩家选择，调用[bindNearbyGame](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section13279659901)接口绑定玩家选定的接收端设备。

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. public bindNearbyGame(deviceInfo: gameNearbyTransfer.NearbyGameDevice) {
     2. try {
     3. let bindInfo: gameNearbyTransfer.BindParameters = {
     4. deviceId: deviceInfo.deviceId,
     5. networkId: deviceInfo.networkId
     6. };
     7. gameNearbyTransfer.bindNearbyGame(bindInfo).then(() => {
     8. hilog.info(0x0000, '[nearby]', '%{public}s', 'bindNearbyGame success');
     9. }).catch((err: BusinessError) => {
     10. hilog.error(0x0000, '[nearby]', '%{public}s', 'bindNearbyGame error' + (err as Error).message);
     11. })
     12. } catch (err) {
     13. hilog.error(0x0000, '[nearby]', '%{public}s', 'bindNearbyGame error' + (err as Error).message);
     14. }
     15. }
     ```

### 接收端发送自身文件信息

收到建链成功回调后，接收端调用[sendPackageInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section12490112992612)接口发送自身文件，如版本信息、包信息。

收起

自动换行

深色代码主题

复制

```
1. function connectNotifyCallBack(callback: gameNearbyTransfer.ConnectNotification) {
2. if (callback.connectState == gameNearbyTransfer.ConnectState.CONNECTED) {
3. // 连接成功回调，判断当前是否为接收端。若当前设备为接收端，请设置为true，否则请设置为false。
4. let isReceive = true;
5. if (!isReceive) {
6. return;
7. }
8. // 接收端收到连接回调后需要处理,发送资源包信息给发送端
9. let packageInfo: gameNearbyTransfer.PackageInfo = {
10. name: 'com.huawei.xxxx',
11. files: [],
12. version: '1.1.0',
13. extraData: 'extraData'
14. };
15. let fileInfo: gameNearbyTransfer.FileInfo = {
16. path: "/xxx/xxxx/files/data.zip",  // 使用沙箱路径，详情请参见应用沙箱目录。
17. hash: 'fileHash' // 可选
18. };
19. packageInfo.files?.push(fileInfo);
20. try {
21. gameNearbyTransfer.sendPackageInfo(packageInfo).then(() => {
22. hilog.info(0x0000, '[nearby]', '%{public}s', 'sendPackageInfo success');
23. }).catch((err: BusinessError) => {
24. hilog.error(0x0000, '[nearby]', '%{public}s', 'sendPackageInfo error' + (err as Error).message);
25. });
26. } catch (err) {
27. hilog.error(0x0000, '[nearby]', '%{public}s', 'error' + (err as Error).message);
28. }
29. }
30. }
```

### 发送端对比后传输资源包

发送端收到接收端发送的版本信息后进行对比，调用[replyPackageInfoResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section78288285293)上报对比结果，根据对比结果决定是否需要调用[transferPackageData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section1227711101118)接口发送资源包数据。

收起

自动换行

深色代码主题

复制

```
1. function receivePackageInfoCallBack(callback: gameNearbyTransfer.PackageInfo) {
2. // 比较版本,决定是否需要发送资源包,也可以比较文件hash
3. let packageInfoResult: gameNearbyTransfer.PackageInfoResult = {
4. packageInfoResultCode: gameNearbyTransfer.PackageInfoResultCode.PACKAGE_AVAILABLE_COMPARED
5. };
6. try {
7. // 上报对比结果
8. gameNearbyTransfer.replyPackageInfoResult(packageInfoResult).then(() => {
9. let packageData: gameNearbyTransfer.PackageData = {
10. name: 'com.huawei.gamenearbydemo',
11. version: '1.0.0',
12. files: [{
13. srcPath: '/data/xxxx/a.zip', // srcPath是需要发送文件的沙箱路径，详情请参见应用沙箱目录。
14. destPath: 'xxxx/a.zip'       // destPath是接收文件的自定义路径，完整的沙箱路径是fileStoragePath+destPath，详情请参见应用沙箱目录。
15. }]
16. }
17. try {
18. // 发送资源包
19. gameNearbyTransfer.transferPackageData(packageData).then(() => {
20. // 发送成功
21. }).catch((err: BusinessError) => {
22. // 发送异常
23. hilog.error(0x0000, '[nearby]', '%{public}s', 'error' + (err as Error).message);
24. });
25. } catch (err) {
26. hilog.error(0x0000, '[nearby]', '%{public}s', 'error' + (err as Error).message);
27. }
28. }).catch((err: BusinessError) => {
29. // 上报异常
30. hilog.error(0x0000, '[nearby]', '%{public}s', 'error' + (err as Error).message);
31. });
32. } catch (err) {
33. hilog.error(0x0000, '[nearby]', '%{public}s', 'error' + (err as Error).message);
34. }
35. }
```

### 处理资源包传输进度信息

发送端和接收端在传输回调中处理传输进度信息。

收起

自动换行

深色代码主题

复制

```
1. function transferNotifyCallBack(callback: gameNearbyTransfer.TransferNotification) {
2. if (callback.transferState == gameNearbyTransfer.TransferState.SEND_PROCESS) {
3. // 处理发送进度,如显示进度条和速率
4. }
5. if (callback.transferState == gameNearbyTransfer.TransferState.SEND_FINISH) {
6. // 发送完成
7. }
8. if (callback.transferState == gameNearbyTransfer.TransferState.RECEIVE_PROCESS) {
9. // 处理接收进度,如显示进度条和速率
10. }
11. if (callback.transferState == gameNearbyTransfer.TransferState.RECEIVE_FINISH) {
12. // 接收完成,获取到资源包存储的沙箱路径
13. let fileStoragePath = callback.fileStoragePath;
14. // 对fileStoragePath下的文件做处理
15. }
16. }
```

### 处理已接收资源包后销毁服务

对已接收数据做好处理或转移后，调用[destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-nearbytransfer#section13373155416)接口销毁服务。若服务销毁后再次使用近场快传服务，需重新[创建游戏近场快传服务并注册相关回调](/consumer/cn/doc/harmonyos-guides/gameservice-nearbytransfer-access-procedure#section8810153223912)。

收起

自动换行

深色代码主题

复制

```
1. public destroy() {
2. // 取消回调注册
3. this.unregisterCallback();
4. // 销毁服务
5. try {
6. gameNearbyTransfer.destroy().then(() => {
7. hilog.info(0x0000, '[nearby]', '%{public}s', 'destroy success');
8. }).catch((err: Error) => {
9. hilog.error(0x0000, '[nearby]', '%{public}s', 'destroy error' + (err as Error).message);
10. });
11. } catch (err) {
12. hilog.error(0x0000, '[nearby]', '%{public}s', 'error' + (err as Error).message);
13. }
14. }

16. public unregisterCallback() {
17. try {
18. gameNearbyTransfer.off('connectNotify', connectNotifyCallBack);
19. gameNearbyTransfer.off('receivePackageInfo', receivePackageInfoCallBack);
20. gameNearbyTransfer.off('transferNotify', transferNotifyCallBack);
21. gameNearbyTransfer.off('error', errorCallBack);
22. // 发送端选择手动绑定接收端且已订阅discovery事件
23. gameNearbyTransfer.off('discovery', discoveryCallBack);
24. } catch (err) {
25. hilog.error(0x0000, '[nearby]', '%{public}s', 'error' + (err as Error).message);
26. }
27. }

29. function connectNotifyCallBack(callback: gameNearbyTransfer.ConnectNotification) {
30. // 连接状态回调，接收端收到建链成功回调后，在此处调用sendPackageInfo接口发送自身文件信息，如版本信息、包信息
31. }

33. function receivePackageInfoCallBack(callback: gameNearbyTransfer.PackageInfo) {
34. // 接收包信息回调，发送端收到接收端发送的版本信息后进行对比，根据对比结果决定是否需要传输资源包数据。
35. }

37. function transferNotifyCallBack(callback: gameNearbyTransfer.TransferNotification) {
38. // 传输回调，处理传输进度信息
39. }

41. function errorCallBack(callback: gameNearbyTransfer.ReturnResult) {
42. // 异常信息回调，处理相关异常信息
43. }

45. function discoveryCallBack(callback: gameNearbyTransfer.DiscoveryResult) {
46. // 获取到发现的设备 展示设备列表
47. callback.nearbyGameDevices.forEach((device: gameNearbyTransfer.NearbyGameDevice, index: number) => {
48. });
49. }
```