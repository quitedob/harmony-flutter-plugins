在开发相机应用时，需要先[申请相关权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/camera-preparation)。

相机应用可通过调用和控制相机设备，完成预览、拍照和录像等基础操作。

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

   说明

   在相机设备输入之前需要先完成相机管理，详细开发步骤请参考[相机管理](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/camera-device-management)。
2. 通过[cameraManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-cameramanager)中的[createCameraInput](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-cameramanager#createcamerainput)方法创建相机输入流。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. async function createInput(cameraDevice: camera.CameraDevice, cameraManager: camera.CameraManager): Promise<camera.CameraInput | undefined> {
   2. // 创建相机输入流。
   3. let cameraInput: camera.CameraInput | undefined = undefined;
   4. try {
   5. cameraInput = cameraManager.createCameraInput(cameraDevice);
   6. } catch (error) {
   7. let err = error as BusinessError;
   8. console.error('Failed to createCameraInput errorCode = ' + err.code);
   9. }
   10. if (cameraInput === undefined) {
   11. return undefined;
   12. }
   13. // 监听cameraInput错误信息。
   14. cameraInput.on('error', cameraDevice, (error: BusinessError) => {
   15. console.error(`Camera input error code: ${error.code}`);
   16. });
   17. // 打开相机。
   18. await cameraInput.open();
   19. return cameraInput;
   20. }
   ```
3. 通过[getSupportedSceneModes](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-cameramanager#getsupportedscenemodes11)方法，获取当前相机设备支持的模式列表，列表中存储了相机设备支持的所有模式[SceneMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-e#scenemode11)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. function getSupportedSceneMode(cameraDevice: camera.CameraDevice, cameraManager: camera.CameraManager): Array<camera.SceneMode> {
   2. // 获取相机设备支持的模式列表。
   3. let sceneModeArray: Array<camera.SceneMode> = cameraManager.getSupportedSceneModes(cameraDevice);
   4. if (sceneModeArray != undefined && sceneModeArray.length > 0) {
   5. for (let index = 0; index < sceneModeArray.length; index++) {
   6. console.info('Camera SceneMode : ' + sceneModeArray[index]);
   7. }
   8. return sceneModeArray;
   9. } else {
   10. console.error("cameraManager.getSupportedSceneModes error");
   11. return [];
   12. }
   13. }
   ```
4. 通过[getSupportedOutputCapability](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-cameramanager#getsupportedoutputcapability11)方法，获取当前相机设备支持的所有输出流，如预览流、拍照流、录像流等。输出流在[CameraOutputCapability](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-i#cameraoutputcapability)中的各个profile字段中，根据相机设备指定模式[SceneMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-e#scenemode11)的不同，需要添加不同类型的输出流。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. async function getSupportedOutputCapability(cameraDevice: camera.CameraDevice, cameraManager: camera.CameraManager, sceneMode: camera.SceneMode): Promise<camera.CameraOutputCapability | undefined> {
   2. // 获取相机设备支持的输出流能力。
   3. let cameraOutputCapability: camera.CameraOutputCapability = cameraManager.getSupportedOutputCapability(cameraDevice, sceneMode);
   4. if (!cameraOutputCapability) {
   5. console.error("cameraManager.getSupportedOutputCapability error");
   6. return undefined;
   7. }
   8. console.info("outputCapability: " + JSON.stringify(cameraOutputCapability));
   9. // 以NORMAL_PHOTO模式为例，需要添加预览流、拍照流。
   10. // previewProfiles属性为获取当前设备支持的预览输出流。
   11. let previewProfilesArray: Array<camera.Profile> = cameraOutputCapability.previewProfiles;
   12. if (!previewProfilesArray) {
   13. console.error("createOutput previewProfilesArray == null || undefined");
   14. }
   15. // photoProfiles属性为获取当前设备支持的拍照输出流。
   16. let photoProfilesArray: Array<camera.Profile> = cameraOutputCapability.photoProfiles;
   17. if (!photoProfilesArray) {
   18. console.error("createOutput photoProfilesArray == null || undefined");
   19. }
   20. return cameraOutputCapability;
   21. }
   ```