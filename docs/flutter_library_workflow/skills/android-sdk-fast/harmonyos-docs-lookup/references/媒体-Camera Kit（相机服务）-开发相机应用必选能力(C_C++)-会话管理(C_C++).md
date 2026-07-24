相机使用预览、拍照、录像、元数据功能前，均需要创建相机会话。

在会话中，可以完成以下功能：

* 配置相机的输入流和输出流。相机在拍摄前，必须完成输入输出流的配置。

  配置输入流即添加设备输入，对用户而言，相当于选择设备的某一相机拍摄；配置输出流，即选择数据将以什么形式输出。当应用需要实现拍照时，输出流应配置为预览流和拍照流，预览流的数据将显示在XComponent组件上，拍照流的数据将通过ImageReceiver接口的能力保存到相册中。
* 添加闪光灯、调整焦距等配置。具体支持的配置及接口说明请参考[OH\_Camera](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera)。
* 会话切换控制。应用可以通过移除和添加输出流的方式，切换相机模式。如当前会话的输出流为拍照流，应用可以将拍照流移除，然后添加视频流作为输出流，即完成了拍照到录像的切换。

完成会话配置后，应用提交和开启会话，可以开始调用相机相关功能。

## 开发步骤

1. 导入NDK相关接口，导入方法如下。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. #include "hilog/log.h"
   2. #include "ohcamera/camera.h"
   3. #include "ohcamera/camera_input.h"
   4. #include "ohcamera/capture_session.h"
   5. #include "ohcamera/photo_output.h"
   6. #include "ohcamera/preview_output.h"
   7. #include "ohcamera/video_output.h"
   8. #include "ohcamera/camera_manager.h"
   ```
2. 在CMake脚本中链接相关动态库。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. target_link_libraries(entry PUBLIC
   2. libace_napi.z.so
   3. libohcamera.so
   4. libhilog_ndk.z.so
   5. )
   ```
3. 调用[OH\_CameraManager\_CreateCaptureSession()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-manager-h#oh_cameramanager_createcapturesession)方法创建一个会话。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. Camera_CaptureSession* CreateCaptureSession(Camera_Manager* cameraManager)
   2. {
   3. Camera_CaptureSession* captureSession = nullptr;
   4. if (cameraManager == nullptr) {
   5. OH_LOG_ERROR(LOG_APP, "cameraManager is nullptr.");
   6. return captureSession;
   7. }
   8. Camera_ErrorCode ret = OH_CameraManager_CreateCaptureSession(cameraManager, &captureSession);
   9. if (captureSession == nullptr || ret != CAMERA_OK) {
   10. OH_LOG_ERROR(LOG_APP, "OH_CameraManager_CreateCaptureSession failed.");
   11. }
   12. return captureSession;
   13. }
   ```
4. 调用[OH\_CaptureSession\_SetSessionMode()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_setsessionmode)方法配置会话模式。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. Camera_ErrorCode SetSessionMode(Camera_CaptureSession* captureSession)
   2. {
   3. Camera_ErrorCode ret = OH_CaptureSession_SetSessionMode(captureSession, NORMAL_VIDEO);
   4. if (ret != CAMERA_OK) {
   5. OH_LOG_ERROR(LOG_APP, "OH_CaptureSession_SetSessionMode failed.");
   6. }
   7. return ret;
   8. }
   ```
5. 调用[OH\_CaptureSession\_BeginConfig()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_beginconfig)方法配置会话。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. Camera_ErrorCode BeginConfig(Camera_CaptureSession* captureSession)
   2. {
   3. Camera_ErrorCode ret = OH_CaptureSession_BeginConfig(captureSession);
   4. if (ret != CAMERA_OK) {
   5. OH_LOG_ERROR(LOG_APP, "OH_CaptureSession_BeginConfig failed.");
   6. }
   7. return ret;
   8. }
   ```
6. 使能。向会话中添加相机的输入流和输出流，调用[OH\_CaptureSession\_AddInput()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_addinput)添加相机的输入流；调用[OH\_CaptureSession\_AddPreviewOutput()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_addpreviewoutput)和[OH\_CaptureSession\_AddPhotoOutput()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_addphotooutput)添加相机的输出流。以下示例代码以添加预览流previewOutput和拍照流photoOutput为例，即当前模式支持拍照和预览。

   调用[OH\_CaptureSession\_CommitConfig()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_commitconfig)和[OH\_CaptureSession\_Start()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_start)方法提交相关配置，并启动会话。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. Camera_ErrorCode StartSession(Camera_CaptureSession* captureSession, Camera_Input* cameraInput,
   2. Camera_PreviewOutput* previewOutput, Camera_PhotoOutput* photoOutput)
   3. {
   4. // 向会话中添加相机输入流。
   5. Camera_ErrorCode ret = OH_CaptureSession_AddInput(captureSession, cameraInput);
   6. if (ret != CAMERA_OK) {
   7. OH_LOG_ERROR(LOG_APP, "OH_CaptureSession_AddInput failed.");
   8. return ret;
   9. }

   11. // 向会话中添加预览输出流。
   12. ret = OH_CaptureSession_AddPreviewOutput(captureSession, previewOutput);
   13. if (ret != CAMERA_OK) {
   14. OH_LOG_ERROR(LOG_APP, "OH_CaptureSession_AddPreviewOutput failed.");
   15. return ret;
   16. }

   18. // 向会话中添加拍照输出流。
   19. ret = OH_CaptureSession_AddPhotoOutput(captureSession, photoOutput);
   20. if (ret != CAMERA_OK) {
   21. OH_LOG_ERROR(LOG_APP, "OH_CaptureSession_AddPhotoOutput failed.");
   22. return ret;
   23. }

   25. // 提交会话配置。
   26. ret = OH_CaptureSession_CommitConfig(captureSession);
   27. if (ret != CAMERA_OK) {
   28. OH_LOG_ERROR(LOG_APP, "OH_CaptureSession_CommitConfig failed.");
   29. return ret;
   30. }

   32. // 启动会话。
   33. ret = OH_CaptureSession_Start(captureSession);
   34. if (ret != CAMERA_OK) {
   35. OH_LOG_ERROR(LOG_APP, "OH_CaptureSession_Start failed.");
   36. }
   37. return ret;
   38. }
   ```
7. 会话控制。调用[OH\_CaptureSession\_Stop()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_stop)方法可以停止当前会话。调用[OH\_CaptureSession\_RemovePhotoOutput()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_removephotooutput)和[OH\_CaptureSession\_AddVideoOutput()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_addvideooutput)方法可以完成会话切换控制。以下示例代码以移除拍照流photoOutput，添加视频流videoOutput为例，完成了拍照到录像的切换。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. Camera_ErrorCode ReloadSession(Camera_CaptureSession* captureSession, Camera_PhotoOutput* photoOutput,
   2. Camera_VideoOutput* videoOutput)
   3. {
   4. Camera_ErrorCode ret = OH_CaptureSession_Stop(captureSession);
   5. if (ret == CAMERA_OK) {
   6. OH_LOG_INFO(LOG_APP, "OH_CaptureSession_Stop success ");
   7. } else {
   8. OH_LOG_ERROR(LOG_APP, "OH_CaptureSession_Stop failed. %d ", ret);
   9. }
   10. ret = OH_CaptureSession_BeginConfig(captureSession);
   11. if (ret != CAMERA_OK) {
   12. OH_LOG_ERROR(LOG_APP, "OH_CaptureSession_BeginConfig failed.");
   13. return ret;
   14. }
   15. // 从会话中移除拍照输出流。
   16. ret = OH_CaptureSession_RemovePhotoOutput(captureSession, photoOutput);
   17. if (ret == CAMERA_OK) {
   18. OH_LOG_INFO(LOG_APP, "OH_CaptureSession_RemovePhotoOutput success ");
   19. } else {
   20. OH_LOG_ERROR(LOG_APP, "OH_CaptureSession_RemovePhotoOutput failed. %d ", ret);
   21. }
   22. // 释放photoOutput。
   23. ret = OH_PhotoOutput_Release(photoOutput);
   24. if (ret == CAMERA_OK) {
   25. OH_LOG_INFO(LOG_APP, "OH_PhotoOutput_Release success ");
   26. } else {
   27. OH_LOG_ERROR(LOG_APP, "OH_PhotoOutput_Release failed. %d ", ret);
   28. }
   29. // 向会话中添加视频输出流。
   30. ret = OH_CaptureSession_AddVideoOutput(captureSession, videoOutput);
   31. if (ret == CAMERA_OK) {
   32. OH_LOG_INFO(LOG_APP, "OH_CaptureSession_AddVideoOutput success ");
   33. } else {
   34. OH_LOG_ERROR(LOG_APP, "OH_CaptureSession_AddVideoOutput failed. %d ", ret);
   35. return ret;
   36. }
   37. // 提交会话配置。
   38. ret = OH_CaptureSession_CommitConfig(captureSession);
   39. if (ret != CAMERA_OK) {
   40. OH_LOG_ERROR(LOG_APP, "OH_CaptureSession_CommitConfig failed.");
   41. return ret;
   42. }

   44. // 启动会话。
   45. ret = OH_CaptureSession_Start(captureSession);
   46. if (ret != CAMERA_OK) {
   47. OH_LOG_ERROR(LOG_APP, "OH_CaptureSession_Start failed.");
   48. }
   49. return ret;
   50. }
   ```