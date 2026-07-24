通过操作设备启用手电筒功能，可使设备的手电筒保持常亮状态。

在使用相机应用并操作手电筒功能时，存在以下几种情况说明：

* 当使用后置相机并设置闪光灯模式[FlashMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-e#flashmode)关闭时，手电筒功能无法启用。
* 当使用前置相机时，手电筒可以正常启用并保持常亮状态。
* 从前置相机切换至后置相机时，如果手电筒原本处于开启状态，它将会被自动关闭。

## 开发步骤

详细的API说明请参考[@ohos.multimedia.camera (相机管理)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera)。

1. 导入camera接口，接口中提供了相机相关的属性和方法，导入方法如下。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { camera } from '@kit.CameraKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 通过[CameraManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-cameramanager)中的[isTorchSupported](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-cameramanager#istorchsupported11)方法，检测当前设备是否支持手电筒功能。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. function isTorchSupported(cameraManager: camera.CameraManager) : boolean {
   2. let torchSupport: boolean = false;
   3. try {
   4. torchSupport = cameraManager.isTorchSupported();
   5. } catch (error) {
   6. let err = error as BusinessError;
   7. console.error('Failed to torch. errorCode = ' + err.code);
   8. }
   9. console.info('Returned with the torch support status:' + torchSupport);
   10. return torchSupport;
   11. }
   ```
3. 通过[CameraManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-cameramanager)中的[isTorchModeSupported](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-cameramanager#istorchmodesupported11)方法，检测是否支持指定的手电筒模式[TorchMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-e#torchmode11)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. function isTorchModeSupported(cameraManager: camera.CameraManager, torchMode: camera.TorchMode) : boolean {
   2. let isTorchModeSupport: boolean = false;
   3. try {
   4. isTorchModeSupport = cameraManager.isTorchModeSupported(torchMode);
   5. } catch (error) {
   6. let err = error as BusinessError;
   7. console.error('Failed to set the torch mode. errorCode = ' + err.code);
   8. }
   9. return isTorchModeSupport;
   10. }
   ```
4. 通过[CameraManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-cameramanager)中的[setTorchMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-cameramanager#settorchmode11)方法，设置当前设备的手电筒模式。以及通过[CameraManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-cameramanager)中的[getTorchMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-cameramanager#gettorchmode11)方法，获取当前设备的手电筒模式。

   说明

   在使用[getTorchMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-cameramanager#gettorchmode11)方法前，需要先注册监听手电筒的状态变化，请参考[状态监听](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/camera-torch-use#状态监听)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. function setTorchModeSupported(cameraManager: camera.CameraManager, torchMode: camera.TorchMode) : void {
   2. cameraManager.setTorchMode(torchMode);
   3. let isTorchMode = cameraManager.getTorchMode();
   4. console.info(`Returned with the torch mode supported mode: ${isTorchMode}`);
   5. }
   ```

## 状态监听

在相机应用开发过程中，可以随时监听手电筒状态，包括手电筒打开、手电筒关闭、手电筒不可用、手电筒恢复可用。手电筒状态发生变化，可通过回调函数获取状态的变化。

注册torchStatusChange事件后，回调会返回监听结果，callback返回TorchStatusInfo参数，参数的具体内容可参考相机管理器回调接口实例[TorchStatusInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-i#torchstatusinfo11)。

收起

自动换行

深色代码主题

复制

```
1. function onTorchStatusChange(cameraManager: camera.CameraManager): void {
2. cameraManager.on('torchStatusChange', (err: BusinessError, torchStatusInfo: camera.TorchStatusInfo) => {
3. if (err !== undefined && err.code !== 0) {
4. console.error(`Callback Error, errorCode: ${err.code}`);
5. return;
6. }
7. console.info(`onTorchStatusChange, isTorchAvailable: ${torchStatusInfo.isTorchAvailable}, isTorchActive: ${torchStatusInfo.
8. isTorchActive}, level: ${torchStatusInfo.torchLevel}`);
9. });
10. }
```