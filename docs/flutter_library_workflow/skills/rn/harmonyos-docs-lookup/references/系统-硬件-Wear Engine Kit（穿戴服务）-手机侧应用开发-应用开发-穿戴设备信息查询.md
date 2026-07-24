收起

自动换行

深色代码主题

复制

```
1. // 在使用Wear Engine服务前，请导入WearEngine与相关模块
2. import { wearEngine } from '@kit.WearEngine';
3. import { BusinessError } from '@kit.BasicServicesKit';
```

## 查询穿戴设备是否支持某种WearEngine能力集

注意

该接口的调用需要在开发者联盟申请设备基础信息权限（请参考[申请接入Wear Engine服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/wearengine_apply)）。

通过[Device](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section385118379447)对象中的方法[isWearEngineCapabilitySupported](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section116382923217)查询穿戴设备是否支持某种WearEngine能力集。

1. 应用调用[wearEngine](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api)中的[getDeviceClient](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section1892394201117)方法，获取[DeviceClient](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section126321419369)对象。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let deviceClient: wearEngine.DeviceClient = wearEngine.getDeviceClient(this.getUIContext().getHostContext());
   ```
2. 调用[getConnectedDevices](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section1828213119411)方法，获取已连接的设备列表。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let deviceList: wearEngine.Device[] = [];
   2. deviceClient.getConnectedDevices().then(devices => {
   3. // 存储已连接的设备列表
   4. deviceList = devices;
   5. console.info(`Succeeded in getting deviceList, devices number is ${deviceList.length}`);
   6. }).catch((error: BusinessError) => {
   7. // 处理调用失败时捕获到的异常
   8. console.error(`Failed to get deviceList. Code is ${error.code}, message is ${error.message}`);
   9. })
   ```
3. 从设备列表中选取需要操作的设备。
4. 调用[Device](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section385118379447)对象中的[isWearEngineCapabilitySupported](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section116382923217)接口可查询该设备是否支持传入的WearEngine能力（true：支持；false：不支持），以P2P能力为例。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. if (deviceList.length > 0) {
   2. // 步骤3 从得到的设备列表中选取目标设备，并定义为device(假设数组中存在已连接设备且第一位即为目标设备)
   3. let targetDevice: wearEngine.Device = deviceList[0];

   5. // 步骤4 调用设备的方法查询是否支持某种WearEngine能力（以P2P为例）
   6. targetDevice.isWearEngineCapabilitySupported(wearEngine.WearEngineCapability.P2P_COMMUNICATION).then((isSupportP2P) => {
   7. console.info(`Succeeded in checking p2p capability, result is ${isSupportP2P}`);
   8. }).catch((error: BusinessError) => {
   9. console.error(`Failed to check p2p capability. Code is ${error.code}, message is ${error.message}`);
   10. })
   11. }
   ```

## 查询穿戴设备是否支持某种Device能力集

注意

该接口的调用需要在开发者联盟申请设备基础信息权限（请参考[申请接入Wear Engine服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/wearengine_apply)）。

通过[Device](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section385118379447)对象中的方法[isDeviceCapabilitySupported](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section196921253123213)查询穿戴设备是否支持某种Device能力集。

1. 应用调用[wearEngine](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api)中的[getDeviceClient](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section1892394201117)方法，获取[DeviceClient](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section126321419369)对象。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let deviceClient: wearEngine.DeviceClient = wearEngine.getDeviceClient(this.getUIContext().getHostContext());
   ```
2. 调用[getConnectedDevices](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section1828213119411)方法，获取已连接的设备列表。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let deviceList: wearEngine.Device[] = [];
   2. deviceClient.getConnectedDevices().then(devices => {
   3. // 存储已连接的设备列表
   4. deviceList = devices;
   5. console.info(`Succeeded in getting deviceList, devices number is ${deviceList.length}`);
   6. }).catch((error: BusinessError) => {
   7. // 处理调用失败时捕获到的异常
   8. console.error(`Failed to get deviceList. Code is ${error.code}, message is ${error.message}`);
   9. })
   ```
3. 从设备列表中选取需要操作的设备。
4. 调用[Device](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section385118379447)对象中的[isDeviceCapabilitySupported](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section196921253123213)接口可查询该设备是否支持传入的Device能力（true：支持；false：不支持）。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. if (deviceList.length > 0) {
   2. // 步骤3 从得到的设备列表中选取目标设备，并定义为device(假设数组中存在已连接设备且第一位即为目标设备)
   3. let targetDevice: wearEngine.Device = deviceList[0];

   5. // 步骤4 调用设备的方法查询是否支持某种Device能力（以是否支持应用安装为例）
   6. targetDevice.isDeviceCapabilitySupported(wearEngine.DeviceCapability.APP_INSTALLATION).then((isSupportInstall) => {
   7. console.info(`Succeeded in checking install app capability, result is ${isSupportInstall}`);
   8. }).catch((error: BusinessError) => {
   9. console.error(`Failed to check install app capability. Code is ${error.code}, message is ${error.message}`);
   10. })
   11. }
   ```

## 查询设备SN

注意

该接口的调用需要在开发者联盟申请设备标识符权限（受限开放）并获得用户授权（请参考[申请接入Wear Engine服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/wearengine_apply)）。

通过[Device](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section385118379447)对象中的方法[getSerialNumber](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section164908590339)查询穿戴设备的SN。

1. 应用调用[wearEngine](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api)中的[getDeviceClient](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section1892394201117)方法，获取[DeviceClient](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section126321419369)对象。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let deviceClient: wearEngine.DeviceClient = wearEngine.getDeviceClient(this.getUIContext().getHostContext());
   ```
2. 调用[getConnectedDevices](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section1828213119411)方法，获取已连接的设备列表。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let deviceList: wearEngine.Device[] = [];
   2. deviceClient.getConnectedDevices().then(devices => {
   3. // 存储已连接的设备列表
   4. deviceList = devices;
   5. console.info(`Succeeded in getting deviceList, devices number is ${deviceList.length}`);
   6. }).catch((error: BusinessError) => {
   7. // 处理调用失败时捕获到的异常
   8. console.error(`Failed to get deviceList. Code is ${error.code}, message is ${error.message}`);
   9. })
   ```
3. 从设备列表中选取需要操作的设备。
4. 调用[Device](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section385118379447)对象中的方法[getSerialNumber](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section164908590339)查询穿戴设备的SN。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. if (deviceList.length > 0) {
   2. // 步骤3 从得到的设备列表中选取目标设备，并定义为device(假设数组中存在已连接设备且第一位即为目标设备)
   3. let targetDevice: wearEngine.Device = deviceList[0];

   5. // 步骤4 调用设备的方法查询SN
   6. targetDevice.getSerialNumber().then((sn) => {
   7. console.info(`Succeeded in getting device SN, result is ${sn}`);
   8. }).catch((error: BusinessError) => {
   9. console.error(`Failed to get device SN. Code is ${error.code}, message is ${error.message}`);
   10. })
   11. }
   ```