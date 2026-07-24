相机框架提供动态照片拍摄能力，业务应用可以类似拍摄普通照片一样，一键式拍摄得到动态照片。

应用开发动态照片主要分为以下步骤：

* 应用开发动态照片前，请参考[申请相机开发的权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/camera-preparation)、[相机管理](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/camera-device-management)、[设备输入](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/camera-device-input)、[会话管理](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/camera-session-management)等流程完成相机应用开发必选能力配置。
* 查询当前设备的当前模式是否支持拍摄动态照片。
* 如果支持动态照片，可以调用相机框架提供的使能接口**使能**动态照片能力。
* 监听照片回调，将照片存入媒体库。可参考[MediaLibrary Kit-访问和管理动态照片资源](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/photoaccesshelper-movingphoto)。

## 开发步骤

详细的API说明请参考[@ohos.multimedia.camera (相机管理)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera)。

说明

* 拍摄动态照片需要麦克风权限ohos.permission.MICROPHONE，权限申请和校验的方式请参考[开发准备](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/camera-preparation)。否则拍摄的照片没有声音。

1. 导入依赖，需要导入相机框架、媒体库、图片相关领域依赖。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { camera } from '@kit.CameraKit';
   2. import { photoAccessHelper } from '@kit.MediaLibraryKit';
   3. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 确定拍照输出流。

   通过[CameraOutputCapability](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-i#cameraoutputcapability)中的photoProfiles属性，可获取当前设备支持的拍照输出流，通过[createPhotoOutput](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-cameramanager#createphotooutput11)方法创建拍照输出流。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. function getPhotoOutput(cameraManager: camera.CameraManager,
   2. cameraOutputCapability: camera.CameraOutputCapability): camera.PhotoOutput | undefined {
   3. if (!cameraOutputCapability || !cameraOutputCapability.photoProfiles) {
   4. return;
   5. }
   6. let photoProfilesArray: Array<camera.Profile> = cameraOutputCapability.photoProfiles;
   7. if (!photoProfilesArray || photoProfilesArray.length === 0) {
   8. console.error("photoProfilesArray is null or []");
   9. return;
   10. }
   11. let photoOutput: camera.PhotoOutput | undefined = undefined;
   12. try {
   13. photoOutput = cameraManager.createPhotoOutput(photoProfilesArray[0]);
   14. } catch (error) {
   15. let err = error as BusinessError;
   16. console.error(`Failed to createPhotoOutput. error: ${err}`);
   17. }
   18. return photoOutput;
   19. }
   ```
3. 查询当前设备当前模式是否支持动态照片能力。

   说明

   查询是否支持动态照片前需要先完成相机会话配置、提交和启动会话，详细开发步骤请参考[会话管理](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/camera-session-management)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. function isMovingPhotoSupported(photoOutput: camera.PhotoOutput): boolean {
   2. let isSupported: boolean = false;
   3. try {
   4. isSupported = photoOutput.isMovingPhotoSupported();
   5. } catch (error) {
   6. // 失败返回错误码error.code并处理。
   7. let err = error as BusinessError;
   8. console.error(`The isMovingPhotoSupported call failed. error code: ${err.code}`);
   9. }
   10. return isSupported;
   11. }
   ```
4. 使能动态照片拍照能力。

   说明

   使能动态照片前需要使能[分段式拍照](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/camera-deferred-capture)能力。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. function enableMovingPhoto(photoOutput: camera.PhotoOutput): void {
   2. try {
   3. photoOutput.enableMovingPhoto(true);
   4. } catch (error) {
   5. // 失败返回错误码error.code并处理。
   6. let err = error as BusinessError;
   7. console.error(`The enableMovingPhoto call failed. error code: ${err.code}`);
   8. }
   9. }
   ```
5. 触发拍照，与普通拍照方式相同，请参考[拍照](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/camera-shooting)。

## 状态监听

在相机应用开发过程中，可以随时监听动态照片拍照输出流状态。通过注册photoAsset的回调函数获取监听结果，photoOutput创建成功时即可监听。

收起

自动换行

深色代码主题

复制

```
1. function getPhotoAccessHelper(context: Context): photoAccessHelper.PhotoAccessHelper {
2. let phAccessHelper = photoAccessHelper.getPhotoAccessHelper(context);
3. return phAccessHelper;
4. }

6. async function mediaLibSavePhoto(photoAsset: photoAccessHelper.PhotoAsset,
7. phAccessHelper: photoAccessHelper.PhotoAccessHelper): Promise<void> {
8. try {
9. let assetChangeRequest: photoAccessHelper.MediaAssetChangeRequest = new photoAccessHelper.MediaAssetChangeRequest(photoAsset);
10. assetChangeRequest.saveCameraPhoto();
11. await phAccessHelper.applyChanges(assetChangeRequest);
12. console.info('apply saveCameraPhoto successfully');
13. } catch (err) {
14. console.error(`apply saveCameraPhoto failed with error: ${err.code}, ${err.message}`);
15. }
16. }

18. function onPhotoOutputPhotoAssetAvailable(photoOutput: camera.PhotoOutput, context: Context): void {
19. photoOutput.on('photoAssetAvailable', (err: BusinessError, photoAsset: photoAccessHelper.PhotoAsset): void => {
20. if (err) {
21. console.error(`photoAssetAvailable error: ${err}.`);
22. return;
23. }
24. console.info('photoOutPutCallBack photoAssetAvailable');
25. // 调用媒体库落盘接口保存一阶段图和动态照片视频。
26. mediaLibSavePhoto(photoAsset, getPhotoAccessHelper(context));
27. });
28. }
```