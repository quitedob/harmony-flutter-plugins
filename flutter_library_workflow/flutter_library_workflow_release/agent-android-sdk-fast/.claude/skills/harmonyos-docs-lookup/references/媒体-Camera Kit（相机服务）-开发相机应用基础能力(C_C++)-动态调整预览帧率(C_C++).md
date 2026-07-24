动态调整帧率是直播、视频等场景下控制预览效果的重要能力之一。应用可通过此能力，显式地控制流输出帧率，以适应不同帧率下的业务目标。

某些场景下降低帧率可在相机设备启用时降低功耗。

## 约束与限制

支持的帧率范围及帧率的设置依赖于硬件能力的实现，不同的硬件平台可能拥有不同的默认帧率。

## 开发流程

相机使用预览功能前，均需要创建相机会话。完成会话配置后，应用提交和开启会话，才可以开始调用相机相关功能。

流程图如下所示：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a4/v3/MJh66t94RFG2IjxW5ae0Mw/zh-cn_image_0000002540771730.png?HW-CC-KV=V1&HW-CC-Date=20260414T052612Z&HW-CC-Expire=86400&HW-CC-Sign=BFC84A0C1C0916F3C15245468233F46D7F49FC454724635343BD347B58910063)

与普通的[预览](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/native-camera-preview)流程相比，动态调整预览帧率的注意点如图上标识：

1. 调用[OH\_CameraManager\_CreateCaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-manager-h#oh_cameramanager_createcapturesession)创建会话（Session）时，需要指定模式为NORMAL\_PHOTO或NORMAL\_VIDEO。

   仅当Session处于NORMAL\_PHOTO或NORMAL\_VIDEO模式时，支持调整预览流帧率。调整帧率的创建会话方式见[创建Session会话并指定模式](/consumer/cn/doc/harmonyos-guides/camera-setframerate-native#创建session会话并指定模式)。
2. [动态调整帧率](/consumer/cn/doc/harmonyos-guides/camera-setframerate-native#动态调整帧率)的操作，可在启动预览前后任意时刻调用。
3. [动态调整帧率](/consumer/cn/doc/harmonyos-guides/camera-setframerate-native#动态调整帧率)在预览里属于可选操作，可以完成：

   * 查询当前支持调整的帧率范围
   * 设置当前帧率
   * 获取当前生效的帧率设置

如何配置会话（Session）、释放资源，请参考[会话管理](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/native-camera-session-management) > [预览](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/native-camera-preview)。

## 导入模块

1. 导入NDK接口，导入方法如下。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 导入NDK接口头文件
   2. #include "hilog/log.h"
   3. #include "ohcamera/camera.h"
   4. #include "ohcamera/camera_input.h"
   5. #include "ohcamera/capture_session.h"
   6. #include "ohcamera/photo_output.h"
   7. #include "ohcamera/preview_output.h"
   8. #include "ohcamera/video_output.h"
   9. #include "ohcamera/camera_manager.h"
   ```
2. 在CMake脚本中链接相关动态库。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. target_link_libraries(entry PUBLIC libohcamera.so libhilog_ndk.z.so)
   ```

## 创建Session会话并指定模式

相机使用预览等功能前，均需创建相机会话，调用[OH\_CameraManager\_CreateCaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-manager-h#oh_cameramanager_createcapturesession)创建一个会话。

创建会话时调用[OH\_CaptureSession\_SetSessionMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_setsessionmode)指定[Camera\_SceneMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_scenemode)为NORMAL\_PHOTO或NORMAL\_VIDEO，创建出的Session处于拍照或录像模式。

以创建Session会话并指定为NORMAL\_PHOTO模式为例：

收起

自动换行

深色代码主题

复制

```
1. Camera_ErrorCode CreateCaptureSession(Camera_Manager *cameraManager, Camera_CaptureSession *captureSession) {
2. Camera_ErrorCode ret = OH_CameraManager_CreateCaptureSession(cameraManager, &captureSession);
3. if (captureSession == nullptr || ret != CAMERA_OK) {
4. OH_LOG_ERROR(LOG_APP, "OH_CameraManager_CreateCaptureSession failed.");
5. }
6. // 设置会话模式为拍照或录像模式，此处以拍照模式为例
7. ret = OH_CaptureSession_SetSessionMode(captureSession, Camera_SceneMode::NORMAL_PHOTO);
8. return ret;
9. }
```

## 动态调整帧率

1. 调用[OH\_PreviewOutput\_GetSupportedFrameRates](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-preview-output-h#oh_previewoutput_getsupportedframerates)，查询当前previewOutput支持的帧率范围。

   说明

   **调用时机**：

   需要在Session调用[OH\_CaptureSession\_CommitConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_commitconfig)完成配流之后调用。

   **OH\_PreviewOutput\_GetSupportedFrameRates调用限制：**

   * 在调用OH\_PreviewOutput\_GetSupportedFrameRates接口设置非固定帧率后，不支持再次调用该接口重新设置动态帧率。
   * 在调用OH\_PreviewOutput\_GetSupportedFrameRates接口设置固定帧率后，支持重新设置固定帧率，但必须保证新设置的帧率可以整除之前设置的帧率或者被之前设置的帧率整除。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. Camera_ErrorCode PreviewOutputGetSupportedFrameRates(Camera_PreviewOutput* previewOutput,
   2. Camera_FrameRateRange** frameRateRange, uint32_t* size) {
   3. Camera_ErrorCode ret = OH_PreviewOutput_GetSupportedFrameRates(previewOutput, frameRateRange, size);

   5. if (ret != CAMERA_OK) {
   6. OH_LOG_ERROR(LOG_APP, "OH_PreviewOutput_GetSupportedFrameRates failed.");
   7. return CAMERA_INVALID_ARGUMENT;
   8. }
   9. for (uint32_t i = 0; i < *size; i++) {
   10. OH_LOG_DEBUG(LOG_APP, "PreviewOutputGetSupportedFrameRates: SupportedFrameRates min %{public}d", (*frameRateRange)[i].min);
   11. OH_LOG_DEBUG(LOG_APP, "PreviewOutputGetSupportedFrameRates: SupportedFrameRates max %{public}d", (*frameRateRange)[i].max);
   12. }
   13. return ret;
   14. }
   ```
2. 根据实际开发需求，调用[OH\_PreviewOutput\_SetFrameRate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-preview-output-h#oh_previewoutput_setframerate)接口对帧率进行动态调整。

   说明

   * 需要在Session调用[OH\_CaptureSession\_CommitConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_commitconfig)完成配流之后调用。
   * 可在Session调用[OH\_PreviewOutput\_Start](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-preview-output-h#oh_previewoutput_start)启动预览前后任意时刻调用。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. Camera_ErrorCode PreviewOutputSetFrameRate(Camera_PreviewOutput* previewOutput,
   2. uint32_t minFps, uint32_t maxFps){
   3. Camera_ErrorCode ret = OH_PreviewOutput_SetFrameRate(previewOutput, minFps, maxFps);
   4. if (ret != CAMERA_OK) {
   5. return CAMERA_INVALID_ARGUMENT;
   6. }
   7. return ret;
   8. }
   ```
3. （可选）通过[OH\_PreviewOutput\_GetActiveFrameRate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-preview-output-h#oh_previewoutput_getactiveframerate)接口查询已设置过并生效的帧率。

   仅通过[OH\_PreviewOutput\_SetFrameRate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-preview-output-h#oh_previewoutput_setframerate)接口显式设置过帧率才可查询当前生效帧率信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. Camera_ErrorCode PreviewOutputGetActiveFrameRate(Camera_PreviewOutput* previewOutput,
   2. Camera_FrameRateRange* frameRateRange){
   3. Camera_ErrorCode ret = OH_PreviewOutput_GetActiveFrameRate(previewOutput, frameRateRange);
   4. if (ret != CAMERA_OK) {
   5. return CAMERA_INVALID_ARGUMENT;
   6. }
   7. OH_LOG_DEBUG(LOG_APP, "PreviewOutputGetActiveFrameRate: ActiveFrameRate frameRateRange_ min %{public}d", (*frameRateRange).min);
   8. OH_LOG_DEBUG(LOG_APP, "PreviewOutputGetActiveFrameRate: ActiveFrameRate frameRateRange_ max %{public}d", (*frameRateRange).max);
   9. return ret;
   10. }
   ```