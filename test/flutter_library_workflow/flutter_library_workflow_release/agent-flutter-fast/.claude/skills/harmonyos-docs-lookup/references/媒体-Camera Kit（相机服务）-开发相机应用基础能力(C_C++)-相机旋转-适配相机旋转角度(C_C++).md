屏幕处于不同的屏幕状态时，原始图像需旋转不同的角度，以确保图像在合适的方向显示，效果如图所示。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/aa/v3/eSU7dnybRIGX_Il7SEkzHQ/zh-cn_image_0000002540771718.png?HW-CC-KV=V1&HW-CC-Date=20260414T052604Z&HW-CC-Expire=86400&HW-CC-Sign=8CF49ABBCC3EA6421BF25E6994B09CEE11D50D0CB23110BD45F403B9D19F990A)

本开发指导将指导开发者在预览、拍照、录像等不同场景下，如何适配相机的旋转角度。

* 在预览时，图像旋转角度与屏幕显示旋转角度（[NativeDisplayManager\_Rotation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-display-info-h#nativedisplaymanager_rotation)）相关。具体开发指导：[创建会话](/consumer/cn/doc/harmonyos-guides/camera-rotation-angle-adaptation-native#创建会话) > [预览](/consumer/cn/doc/harmonyos-guides/camera-rotation-angle-adaptation-native#预览)。
* 在拍照、录像时，图像旋转角度与设备重力方向（即[设备旋转角度](/consumer/cn/doc/harmonyos-guides/camera-rotation-angle-adaptation-native#计算设备旋转角度)）相关。

  拍照开发指导：[创建会话](/consumer/cn/doc/harmonyos-guides/camera-rotation-angle-adaptation-native#创建会话) > [计算设备旋转角度](/consumer/cn/doc/harmonyos-guides/camera-rotation-angle-adaptation-native#计算设备旋转角度) > [拍照](/consumer/cn/doc/harmonyos-guides/camera-rotation-angle-adaptation-native#拍照)。

  录像开发指导：[创建会话](/consumer/cn/doc/harmonyos-guides/camera-rotation-angle-adaptation-native#创建会话) > [计算设备旋转角度](/consumer/cn/doc/harmonyos-guides/camera-rotation-angle-adaptation-native#计算设备旋转角度) > [录像](/consumer/cn/doc/harmonyos-guides/camera-rotation-angle-adaptation-native#录像)。

详细的API参考说明，请参考[Camera API文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera)。

## 创建会话

1. 导入相机等相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. #include "hilog/log.h"
   2. #include "ohcamera/camera.h"
   3. #include "ohcamera/camera_manager.h"
   4. #include "ohcamera/capture_session.h"
   ```
2. 创建Session会话。

   相机使用预览等功能前，均需创建相机会话，调用[camera\_manager.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-manager-h)中的[OH\_CameraManager\_CreateCaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-manager-h#oh_cameramanager_createcapturesession)方法创建一个会话，创建会话时需指定创建[Camera\_SceneMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_scenemode)为NORMAL\_PHOTO或NORMAL\_VIDEO，创建的session处于拍照或者录像模式。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. void createPhotosession(Camera_Manager *cameraManager) {
   2. Camera_CaptureSession *captureSession;
   3. Camera_SceneMode sceneMode = NORMAL_PHOTO;
   4. Camera_ErrorCode ret = OH_CameraManager_CreateCaptureSession(cameraManager, &captureSession);
   5. if (captureSession == nullptr || ret != CAMERA_OK) {
   6. OH_LOG_INFO(LOG_APP, "Create captureSession failed.");
   7. }
   8. ret = OH_CaptureSession_SetSessionMode(captureSession, sceneMode);
   9. if (ret != CAMERA_OK) {
   10. OH_LOG_INFO(LOG_APP, "OH_CaptureSession_SetSessionMode failed.");
   11. }
   12. }

   14. void createVideosession(Camera_Manager *cameraManager) {
   15. Camera_CaptureSession *captureSession;
   16. Camera_SceneMode sceneMode = NORMAL_VIDEO;
   17. Camera_ErrorCode ret = OH_CameraManager_CreateCaptureSession(cameraManager, &captureSession);
   18. if (captureSession == nullptr || ret != CAMERA_OK) {
   19. OH_LOG_INFO(LOG_APP, "Create captureSession failed.");
   20. }
   21. ret = OH_CaptureSession_SetSessionMode(captureSession, sceneMode);
   22. if (ret != CAMERA_OK) {
   23. OH_LOG_INFO(LOG_APP, "OH_CaptureSession_SetSessionMode failed.");
   24. }
   25. }
   ```

## 预览

完成[会话创建](/consumer/cn/doc/harmonyos-guides/camera-rotation-angle-adaptation-native#创建会话)后，开发者可根据实际需求，配置输出流。

1. 调用[preview\_output.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-preview-output-h)中的[OH\_PreviewOutput\_GetPreviewRotation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-preview-output-h#oh_previewoutput_getpreviewrotation)接口，获取[预览旋转角度](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/camera-rotation-term-native#预览旋转角度)。

   displayRotation：[显示设备的屏幕旋转角度](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/camera-rotation-term-native#屏幕旋转角度)，可通过[OH\_NativeDisplayManager\_GetDefaultDisplayRotation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-display-manager-h#oh_nativedisplaymanager_getdefaultdisplayrotation)获取默认屏幕的顺时针旋转角度，并将对应角度填入。

   例：OH\_NativeDisplayManager\_GetDefaultDisplayRotation获取结果为1，表示显示设备屏幕顺时针旋转为90°，此处imageRotation填入90。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. #include "hilog/log.h"
   2. #include "ohcamera/camera.h"
   3. #include "ohcamera/preview_output.h"
   4. #include <window_manager/oh_display_info.h>
   5. #include <window_manager/oh_display_manager.h>

   7. int32_t GetDefaultDisplayRotation() {
   8. int32_t imageRotation = 0;
   9. NativeDisplayManager_Rotation displayRotation = DISPLAY_MANAGER_ROTATION_0;
   10. int32_t ret = OH_NativeDisplayManager_GetDefaultDisplayRotation(&displayRotation);
   11. if (ret != DISPLAY_MANAGER_OK) {
   12. OH_LOG_INFO(LOG_APP, "OH_NativeDisplayManager_GetDefaultDisplayRotation failed.");
   13. }
   14. imageRotation = displayRotation * IAMGE_ROTATION_90;
   15. return imageRotation;
   16. }
   ```

   该接口需要在session调用[OH\_CaptureSession\_CommitConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_commitconfig)完成配流后调用，如果存在异步执行的情况，previewOutput未添加到session里或者已调用[OH\_CaptureSession\_Release](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_release)，导致两者关系未绑定，此时调用[OH\_PreviewOutput\_GetPreviewRotation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-preview-output-h#oh_previewoutput_getpreviewrotation)，则会调用失败，并抛出错误码[CAMERA\_SERVICE\_FATAL\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-camera#section7400201-相机服务异常)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. Camera_ImageRotation GetPreviewRotation(Camera_PreviewOutput* previewOutput, int32_t imageRotation) {
   2. Camera_ImageRotation previewRotation = IAMGE_ROTATION_0;
   3. Camera_ErrorCode ret = OH_PreviewOutput_GetPreviewRotation(previewOutput, imageRotation, &previewRotation);
   4. if (ret != CAMERA_OK) {
   5. OH_LOG_INFO(LOG_APP, "OH_PreviewOutput_GetPreviewRotation failed.");
   6. }
   7. return previewRotation;
   8. }
   ```
2. 调用[preview\_output.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-preview-output-h)中的[OH\_PreviewOutput\_SetPreviewRotation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-preview-output-h#oh_previewoutput_setpreviewrotation)，设置图像的预览旋转角度。

   该接口需要在session调用[OH\_CaptureSession\_CommitConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_commitconfig)完成配流后调用，如果多次调用，以最新调用设置的图像预览旋转角度为准。

   * previewRotation：预览旋转角度，取上一步[OH\_PreviewOutput\_GetPreviewRotation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-preview-output-h#oh_previewoutput_getpreviewrotation)的返回值。
   * isDisplayLocked：Surface在屏幕旋转时是否锁定方向。当设置为false，即屏幕方向未锁定，[预览旋转角度](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/camera-rotation-term-native#预览旋转角度)将根据[相机镜头角度](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/camera-rotation-term-native#相机镜头安装角度)+[屏幕显示旋转角度](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/camera-rotation-term-native#屏幕旋转角度)的值计算；当设置为true，Surface旋转锁定，不跟随窗口变化，旋转角度仅取相机镜头角度计算。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. void SetPreviewRotation(Camera_PreviewOutput* previewOutput, Camera_ImageRotation previewRotation, bool isDisplayLocked) {
   2. Camera_ErrorCode ret = OH_PreviewOutput_SetPreviewRotation(previewOutput, previewRotation, isDisplayLocked);
   3. if (ret != CAMERA_OK) {
   4. OH_LOG_INFO(LOG_APP, "OH_PreviewOutput_SetPreviewRotation failed.");
   5. }
   6. }
   ```

**预览流旋转接口适配场景及示例：**

1. 在[会话管理](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/native-camera-session-management)过程中调用预览旋转接口，即：使用[OH\_CaptureSession\_CommitConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_commitconfig)接口提交相关配置后调用，建议在[OH\_CaptureSession\_Start](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_start)起流前调用。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. #include "hilog/log.h"
   2. #include "ohcamera/camera.h"
   3. #include "ohcamera/preview_output.h"
   4. #include <window_manager/oh_display_info.h>
   5. #include <window_manager/oh_display_manager.h>

   7. int32_t GetDefaultDisplayRotation() {
   8. int32_t imageRotation = 0;
   9. NativeDisplayManager_Rotation displayRotation = DISPLAY_MANAGER_ROTATION_0;
   10. int32_t ret = OH_NativeDisplayManager_GetDefaultDisplayRotation(&displayRotation);
   11. if (ret != DISPLAY_MANAGER_OK) {
   12. OH_LOG_INFO(LOG_APP, "OH_NativeDisplayManager_GetDefaultDisplayRotation failed.");
   13. }
   14. imageRotation = displayRotation * IAMGE_ROTATION_90;
   15. return imageRotation;
   16. }

   18. void InitPreviewRotation(Camera_PreviewOutput* previewOutput) {
   19. // previewOutput是创建的预览输出
   20. Camera_ImageRotation previewRotation = IAMGE_ROTATION_0;
   21. int32_t imageRotation = GetDefaultDisplayRotation();
   22. Camera_ErrorCode ret = OH_PreviewOutput_GetPreviewRotation(previewOutput, imageRotation, &previewRotation);
   23. if (ret != CAMERA_OK) {
   24. OH_LOG_INFO(LOG_APP, "OH_PreviewOutput_GetPreviewRotation failed.");
   25. }
   26. ret = OH_PreviewOutput_SetPreviewRotation(previewOutput, previewRotation, false);
   27. if (ret != CAMERA_OK) {
   28. OH_LOG_INFO(LOG_APP, "OH_PreviewOutput_SetPreviewRotation failed.");
   29. }
   30. }
   ```
2. 应用使用相机时，通过监听[监听屏幕状态变化](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/native-display-manager)，感知窗口当前状态，如当前相机窗口发生旋转时，需对预览流进行角度修正。推荐在[会话管理](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/native-camera-session-management)中完成调用预览旋转接口后，直接创建监听。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. #include "hilog/log.h"
   2. #include "ohcamera/camera.h"
   3. #include "ohcamera/preview_output.h"
   4. #include <window_manager/oh_display_info.h>
   5. #include <window_manager/oh_display_manager.h>

   7. int32_t GetDefaultDisplayRotation() {
   8. int32_t imageRotation = 0;
   9. NativeDisplayManager_Rotation displayRotation = DISPLAY_MANAGER_ROTATION_0;
   10. int32_t ret = OH_NativeDisplayManager_GetDefaultDisplayRotation(&displayRotation);
   11. if (ret != DISPLAY_MANAGER_OK) {
   12. OH_LOG_INFO(LOG_APP, "OH_NativeDisplayManager_GetDefaultDisplayRotation failed.");
   13. }
   14. imageRotation = displayRotation * IAMGE_ROTATION_90;
   15. return imageRotation;
   16. }

   18. // 应用需监听屏幕状态变化，使用如下回调函数对预览流进行角度修正
   19. void DisplayChangeCallback(uint64_t displayId)
   20. {
   21. // previewOutput是创建的预览输出
   22. OH_LOG_INFO(LOG_APP, "DisplayChangeCallback displayId=%{public}lu.", displayId);
   23. Camera_ImageRotation previewRotation = IAMGE_ROTATION_0;
   24. int32_t imageRotation = GetDefaultDisplayRotation();
   25. Camera_ErrorCode ret = OH_PreviewOutput_GetPreviewRotation(previewOutput, imageRotation, &previewRotation);
   26. if (ret != CAMERA_OK) {
   27. OH_LOG_INFO(LOG_APP, "OH_PreviewOutput_GetPreviewRotation failed.");
   28. }
   29. ret = OH_PreviewOutput_SetPreviewRotation(previewOutput, previewRotation, false);
   30. if (ret != CAMERA_OK) {
   31. OH_LOG_INFO(LOG_APP, "OH_PreviewOutput_SetPreviewRotation failed.");
   32. }
   33. }
   ```

## 拍照

完成[会话创建](/consumer/cn/doc/harmonyos-guides/camera-rotation-angle-adaptation-native#创建会话)后，开发者可根据实际需求，配置输出流。

1. 调用[photo\_output.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-photo-output-h)中的[OH\_PhotoOutput\_GetPhotoRotation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-photo-output-h#oh_photooutput_getphotorotation)可以获取到拍照旋转角度。

   该接口需要在session调用[OH\_CaptureSession\_CommitConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_commitconfig)完成配流后调用。

   deviceDegree：设备旋转角度。拍照的旋转角度与重力方向（即设备旋转角度）相关，获取方式请见[计算设备旋转角度](/consumer/cn/doc/harmonyos-guides/camera-rotation-angle-adaptation-native#计算设备旋转角度)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. #include "hilog/log.h"
   2. #include "ohcamera/camera.h"
   3. #include "ohcamera/photo_output.h"

   5. Camera_ImageRotation GetPhotoRotation(Camera_PhotoOutput* photoOutput, int32_t deviceDegree) {
   6. Camera_ImageRotation photoRotation = IAMGE_ROTATION_0;
   7. Camera_ErrorCode ret = OH_PhotoOutput_GetPhotoRotation(photoOutput, deviceDegree, &photoRotation);
   8. if (ret != CAMERA_OK) {
   9. OH_LOG_INFO(LOG_APP, "OH_PhotoOutput_GetPhotoRotation failed.");
   10. }
   11. return photoRotation;
   12. }
   ```
2. 应用将拍照角度写入[Camera\_PhotoCaptureSetting](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-photocapturesetting)的rotation。
3. 其余参数的配置及拍照，可参考[拍照开发指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/native-camera-shooting)。

## 录像

完成[会话创建](/consumer/cn/doc/harmonyos-guides/camera-rotation-angle-adaptation-native#创建会话)后，开发者可根据实际需求，配置输出流。

1. 调用[video\_output.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-video-output-h)中的[OH\_VideoOutput\_GetVideoRotation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-video-output-h#oh_videooutput_getvideorotation)可以获取到录像的旋转角度。

   该接口需要在session调用[OH\_CaptureSession\_CommitConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_commitconfig)完成配流后调用。

   deviceDegree：设备旋转角度。录像的旋转角度与重力方向（即设备旋转角度）相关，获取方式请见[计算设备旋转角度](/consumer/cn/doc/harmonyos-guides/camera-rotation-angle-adaptation-native#计算设备旋转角度)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. #include "hilog/log.h"
   2. #include "ohcamera/camera.h"
   3. #include "ohcamera/video_output.h"

   5. Camera_ImageRotation GetVideoRotation(Camera_VideoOutput* videoOutput, int32_t deviceDegree) {
   6. Camera_ImageRotation videoRotation = IAMGE_ROTATION_0;
   7. Camera_ErrorCode ret = OH_VideoOutput_GetVideoRotation(videoOutput, deviceDegree, &videoRotation);
   8. if (ret != CAMERA_OK) {
   9. OH_LOG_INFO(LOG_APP, "OH_PhotoOutput_GetPhotoRotation failed.");
   10. }
   11. return videoRotation;
   12. }
   ```
2. 在[OH\_AVRecorder\_Prepare](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avrecorder-h#oh_avrecorder_prepare)后使用[OH\_AVRecorder\_UpdateRotation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avrecorder-h#oh_avrecorder_updaterotation)设置录像角度。
3. 其余参数的配置及启动录像，可参考[录像开发指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/native-camera-recording)。

**录像流旋转接口适配示例代码：**

收起

自动换行

深色代码主题

复制

```
1. #include "hilog/log.h"
2. #include "ohcamera/camera.h"
3. #include "ohcamera/video_output.h"
4. #include <multimedia/player_framework/avrecorder.h>
5. #include <multimedia/player_framework/avrecorder_base.h>

7. void GetVideoRotationAndUpdate(Camera_VideoOutput* videoOutput, int32_t deviceDegree, OH_AVRecorder* recorder, OH_AVRecorder_State state) {
8. Camera_ImageRotation videoRotation = IAMGE_ROTATION_0;
9. Camera_ErrorCode ret = OH_VideoOutput_GetVideoRotation(videoOutput, deviceDegree, &videoRotation);
10. if (ret != CAMERA_OK) {
11. OH_LOG_INFO(LOG_APP, "OH_PhotoOutput_GetPhotoRotation failed.");
12. }
13. if (state == OH_AVRecorder_State::AVRECORDER_PREPARED) {
14. OH_AVErrCode retCode = OH_AVRecorder_UpdateRotation(recorder, videoRotation);
15. if (retCode != AV_ERR_OK) {
16. OH_LOG_INFO(LOG_APP, "OH_AVRecorder_UpdateRotation failed.");
17. }
18. }
19. }
```

## 计算设备旋转角度

当前可通过监听[OH\_Sensor\_Subscribe](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-sensor-h#oh_sensor_subscribe)获取重力传感器在x、y、z三个方向上的数据，计算得出设备旋转角度deviceDegree，示例如下所示。

如果无法获得重力传感器数据，需要申请重力传感器权限ohos.permission.ACCELEROMETER。权限申请请参考[声明权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/declare-permissions)，如何获取传感器数据请参考[传感器开发指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/sensor-guidelines-capi)。

收起

自动换行

深色代码主题

复制

```
1. #include "hilog/log.h"
2. #include <sensors/oh_sensor.h>
3. #include <cmath>
4. #include <thread>

6. Sensor_SubscriptionId *id;
7. Sensor_Subscriber *subscriber;
8. Sensor_SubscriptionAttribute *attr;

10. // Sensor获取方式为注册监听获取单次数据后解注册,监听回调为异步触发,等待g_isDegreeReady设置为true后说明获取设备角度成功;
11. // 角度保存在g_deviceDegree,使用角度后将g_isDegreeReady置为false;
12. float g_deviceDegree = 0.0f;
13. bool g_isDegreeReady = false;

15. float GetDeviceDegreeFromXYZ(float x, float y, float z)
16. {
17. // 判断条件 (x * x + y * y) * 3 < z * z
18. if ((x * x + y * y) * 3 < z * z) {
19. return -1.0f;
20. } else {
21. // 计算 atan2(y, -x) 并转换为角度
22. float sd = std::atan2(y, -x);                      // 返回弧度
23. float sc = std::round(sd / 3.141592653589f * 180); // 转换为角度并四舍五入
24. float getDeviceDegree = 90.0f - sc;

26. // 保证角度在 0 到 360 之间
27. if (getDeviceDegree >= 0) {
28. getDeviceDegree = fmod(getDeviceDegree, 360.0f); // 取模，保证结果在 0 到 360 之间
29. } else {
30. getDeviceDegree = fmod(getDeviceDegree, 360.0f) + 360.0f; // 如果小于0，加上360
31. }
32. OH_LOG_INFO(LOG_APP, "GetDeviceDegreeFromXYZ getDeviceDegree:%{public}f", getDeviceDegree);
33. return getDeviceDegree;
34. }
35. }

37. void SensorDataCallback(Sensor_Event *event)
38. {
39. OH_LOG_INFO(LOG_APP, "SensorDataCallbackImpl start");
40. // SENSOR_TYPE_GRAVITY:data[0]、data[1]、data[2]分别表示设备x、y、z轴的重力加速度分量，单位m/s²；
41. float *data = nullptr;
42. uint32_t length = 0;
43. OH_SensorEvent_GetData(event, &data, &length); // 获取传感器数据。
44. for (uint32_t i = 0; i < length; ++i) {
45. OH_LOG_INFO(LOG_APP, "SensorDataCallbackImpl data[%{public}d]:%{public}f", i, data[i]);
46. }
47. float x = data[0];
48. float y = data[1];
49. float z = data[2];
50. g_deviceDegree = GetDeviceDegreeFromXYZ(x, y, z);
51. g_isDegreeReady = true;

53. OH_Sensor_Unsubscribe(id, subscriber); // 取消订阅传感器数据。
54. if (id != nullptr) {
55. OH_Sensor_DestroySubscriptionId(id); // 销毁Sensor_SubscriptionId实例并回收内存。
56. }
57. if (attr != nullptr) {
58. OH_Sensor_DestroySubscriptionAttribute(attr); // 销毁Sensor_SubscriptionAttribute实例并回收内存。
59. }
60. if (subscriber != nullptr) {
61. OH_Sensor_DestroySubscriber(subscriber); // 销毁Sensor_Subscriber实例并回收内存。
62. subscriber = nullptr;
63. }
64. }

66. void GetCurGravity()
67. {
68. Sensor_Type SENSOR_ID{ SENSOR_TYPE_GRAVITY };
69. id = OH_Sensor_CreateSubscriptionId(); // 创建一个Sensor_SubscriptionId实例。
70. if (id == nullptr) {
71. OH_LOG_ERROR(LOG_APP, "sensor error0");
72. }
73. int32_t res = OH_SensorSubscriptionId_SetType(id, SENSOR_ID); // 设置传感器类型为重力。
74. if (res != 0) {
75. OH_LOG_ERROR(LOG_APP, "sensor error1");
76. }
77. attr = OH_Sensor_CreateSubscriptionAttribute(); // 创建Sensor_SubscriptionAttribute实例。
78. if (attr == nullptr) {
79. OH_LOG_ERROR(LOG_APP, "sensor error2");
80. }
81. int64_t sensorSamplePeriod = 15000000;
82. res = OH_SensorSubscriptionAttribute_SetSamplingInterval(attr, sensorSamplePeriod); // 设置传感器数据报告间隔。
83. if (res != 0) {
84. OH_LOG_ERROR(LOG_APP, "sensor error3");
85. }
86. subscriber = OH_Sensor_CreateSubscriber();
87. if (subscriber == nullptr) {
88. OH_LOG_ERROR(LOG_APP, "sensor error2");
89. }
90. OH_SensorSubscriber_SetCallback(subscriber, SensorDataCallback);
91. Sensor_Result sensorRes = OH_Sensor_Subscribe(id, attr, subscriber); // 订阅传感器数据。
92. if (sensorRes != SENSOR_SUCCESS) {
93. OH_LOG_INFO(LOG_APP, "sensor error:%{public}d", sensorRes);
94. }
95. }

97. int32_t CalDeviceDegree()
98. {
99. float deviceDegree = 0.0f;
100. GetCurGravity();
101. while (!g_isDegreeReady) {
102. std::this_thread::sleep_for(std::chrono::milliseconds(10));
103. }
104. deviceDegree = g_deviceDegree;
105. g_isDegreeReady = false;
106. return deviceDegree;
107. }
```

## 视频通话送远端场景

两个设备之间进行视频通话，存在设备间持握方向不一致问题，建议**在本端将画面转正**，再通过网络发送到对端。

## 实现相机无损出图

在部分折叠屏设备上，[不同折叠状态](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-foldable-guide#section152264061715)下的[设备自然方向](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/camera-rotation-term-native#设备自然方向)会发生改变，导致不同折叠状态下的[相机镜头安装角度](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/camera-rotation-term-native#相机镜头安装角度)不同。为了屏蔽不同设备间的差异，使得不同折叠状态下的相机镜头安装角度一致，系统会自动调整部分折叠状态下的相机采集图像方向（通过旋转裁切的方式）和相机镜头安装角度，因此会存在视场角（Field of View, FOV）损失，可能会导致相机预览、拍照、录像可见范围降低，因此如果需要实现相机无损出图，可以通过[OH\_CameraInput\_UsePhysicalCameraOrientation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-manager-h#oh_cameramanager_createcamerainput)接口来实现相机无损出图。具体方式如下：

设备是否支持无损出图，首先需要确认设备的相机镜头安装角度是否可变，可以通过[OH\_CameraInput\_IsPhysicalCameraOrientationVariable](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-input-h#oh_camerainput_isphysicalcameraorientationvariable)接口查询。

1. 当相机镜头安装角度不可变时，不同折叠状态下的相机出图均为无损出图。
2. 当相机镜头安装角度可变时：
   * 如应用需要实现相机无损出图，由于相机镜头安装角度与相机旋转相关，需要应用完成[相机旋转的适配](/consumer/cn/doc/harmonyos-guides/camera-rotation-angle-adaptation-native#top)后，通过[OH\_CameraInput\_GetPhysicalCameraOrientation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-input-h#oh_camerainput_getphysicalcameraorientation)接口获取设备当前折叠状态下真实的相机镜头安装角度，并通过[OH\_CameraInput\_UsePhysicalCameraOrientation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-input-h#oh_camerainput_usephysicalcameraorientation)接口实现相机无损出图（相机镜头安装角度不可变时使用[OH\_CameraInput\_UsePhysicalCameraOrientation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-input-h#oh_camerainput_usephysicalcameraorientation)将会返回[7400102](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-camera#section7400102-非法操作)错误码，未适配相机旋转时使用相机无损出图会导致预览、拍照、录像旋转异常），推荐在[OH\_CameraManager\_CreateCameraInput](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-manager-h#oh_cameramanager_createcamerainput)后直接使用[OH\_CameraInput\_UsePhysicalCameraOrientation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-manager-h#oh_cameramanager_createcamerainput)接口实现相机无损出图。

示例代码如下：

收起

自动换行

深色代码主题

复制

```
1. #include "ohcamera/camera.h"
2. #include "ohcamera/camera_input.h"
3. #include "hilog/log.h"

5. Camera_ErrorCode EnablePhysicalCameraOrientation(Camera_Input* cameraInput)
6. {
7. bool isVariable = false;
8. // 查询设备的相机镜头安装角度是否可变
9. Camera_ErrorCode ret = OH_CameraInput_IsPhysicalCameraOrientationVariable(cameraInput, &isVariable);
10. if (ret != CAMERA_OK) {
11. OH_LOG_ERROR(LOG_APP, "OH_CameraInput_IsPhysicalCameraOrientationVariable failed.");
12. return ret;
13. }
14. if (!isVariable) {
15. OH_LOG_INFO(LOG_APP, "Physical Camera Orientation is not variable.");
16. return CAMERA_OK;
17. }
18. // 获取设备当前折叠状态下真实的相机镜头安装角度
19. uint32_t physicalOrientation = 0;
20. ret = OH_CameraInput_GetPhysicalCameraOrientation(cameraInput, &physicalOrientation);
21. if (ret != CAMERA_OK) {
22. OH_LOG_ERROR(LOG_APP, "OH_CameraInput_GetPhysicalCameraOrientation failed.");
23. return ret;
24. }
25. // 选择是否使用真实的相机镜头安装角度, 以实现无损出图
26. bool isUsed = true;
27. ret = OH_CameraInput_UsePhysicalCameraOrientation(cameraInput, isUsed);
28. if (ret != CAMERA_OK) {
29. OH_LOG_ERROR(LOG_APP, "OH_CameraInput_UsePhysicalCameraOrientation failed.");
30. return ret;
31. }
32. }
```