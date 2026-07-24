注意

该接口的调用前，需要在开发者联盟申请设备基础信息权限（具体请参考[申请接入Wear Engine服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/wearengine_apply)）。

Wear Engine提供查询用户已连接的穿戴设备列表（即支持Wear Engine能力且与手机侧运动健康App处于连接状态的穿戴设备）的接口。

建议开发者在使用Wear Engine其他API接口前先实现该接口功能。

1. 应用调用[wearEngine](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api)中的[getDeviceClient](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section1892394201117)方法，获取[DeviceClient](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section126321419369)对象。
2. 调用[getConnectedDevices](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wearengine_api#section1828213119411)方法，查询用户已连接的穿戴设备列表。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 在使用Wear Engine服务前，请导入WearEngine与相关模块
   2. import { wearEngine } from '@kit.WearEngine';
   3. import { BusinessError } from '@kit.BasicServicesKit';

   5. // 步骤1：获取DeviceClient对象
   6. // this.getUIContext().getHostContext() 表示应用上下文Context对象
   7. let deviceClient: wearEngine.DeviceClient = wearEngine.getDeviceClient(this.getUIContext().getHostContext());
   8. // 创建一个设备列表用于存储返回的设备
   9. let deviceList: wearEngine.Device[] = [];

   11. // 步骤2：调用getConnectedDevices方法，查询用户是否有已连接的穿戴设备
   12. deviceClient.getConnectedDevices().then(devices => {
   13. // 处理返回的设备列表
   14. deviceList = devices ;
   15. console.info(`Succeeded in getting deviceList, deviceList number is ${deviceList.length}`);
   16. }).catch((error: BusinessError) => {
   17. // 处理调用失败时捕获到的异常
   18. console.error(`Failed to get deviceList. Code is ${error.code}, message is ${error.message}`);
   19. })
   ```