## 业务流程

基于相机运动感知策略的ABR主要业务流程如下：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/10/v3/hmKqEhltSpWLLEJa0h38VQ/zh-cn_image_0000002423177560.png?HW-CC-KV=V1&HW-CC-Date=20260414T054332Z&HW-CC-Expire=86400&HW-CC-Sign=C1E36D61E5C8C92E2508543080114082126A160EF8D2C4A0993E956C489CCACF)

1. 用户进入ABR适用的游戏场景。
2. 游戏应用调用[HMS\_ABR\_CreateContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#ga8f785903a5382ff31baef78a3968f66a)接口并指定图形API类型，创建ABR上下文实例。
3. 游戏应用调用[HMS\_ABR\_SetTargetFps](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#ga6c613e02088d559b9dc1450fde15bc2a)接口初始化ABR实例，配置目标帧率属性，ABR结合目标帧率属性实时感知GPU负载状态。
4. 游戏应用调用[HMS\_ABR\_SetScaleRange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#ga1001c6a7739d8ce57bf851986f121bf5)接口初始化ABR实例，配置Buffer分辨率因子范围属性。
5. 游戏应用调用[HMS\_ABR\_Activate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#ga463d8d5396bfd5f6ed800ddab616479a)接口激活ABR上下文实例。
6. 游戏应用调用[HMS\_ABR\_UpdateCameraData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#ga5b895e36d31e46f71d04aba78c8f3716)接口并传入相机运动信息，包含相机旋转、位移信息。
7. 游戏应用在使能ABR的Buffer渲染前调用[HMS\_ABR\_MarkFrameBuffer\_GLES](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#ga821fb33620312d3adba51d30254c1ef0)接口，对Buffer进行标记。
8. Buffer渲染处理。
9. 绘制UI。
10. 一帧送显。
11. 用户退出ABR适用的游戏场景。
12. 游戏应用调用[HMS\_ABR\_DestroyContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#gaf3c03179b9bcf1b8475230cbbb0d877c)接口销毁ABR上下文实例并释放内存资源。

## 开发步骤

本节阐述基于相机运动感知策略的ABR使用，从流程上分别阐述每个步骤的实现和调用。详细代码请参考[图形开发Sample（ABR）](https://gitcode.com/harmonyos_samples/adaptive-buffer-resolution-samplecode-clientdemo-cpp)。

### 设置项目配置项

在“src/main/module.json5”module层级中添加以下配置。

收起

自动换行

深色代码主题

复制

```
1. "metadata": [
2. {
3. "name": "GraphicsAccelerateKit_ABR",
4. "value": "true"
5. }
6. ]
```

### 头文件引用

引用Graphics Accelerate Kit ABR头文件：abr\_gles.h。

收起

自动换行

深色代码主题

复制

```
1. // 引用ABR头文件 abr_gles.h
2. #include <graphics_game_sdk/abr_gles.h>
3. #include <GLES3/gl32.h>
```

### 编写CMakeLists.txt

收起

自动换行

深色代码主题

复制

```
1. find_library(
2. # Sets the name of the path variable.
3. abr-lib
4. # Specifies the name of the NDK library that you want CMake to locate.
5. libabr.so
6. )
7. find_library(
8. # Sets the name of the path variable.
9. GLES-lib
10. # Specifies the name of the NDK library that you want CMake to locate.
11. GLESv3
12. )
13. find_library(
14. # Sets the name of the path variable.
15. hilog-lib
16. # Specifies the name of the NDK library that you want CMake to locate.
17. hilog_ndk.z
18. )

20. target_link_libraries(entry PUBLIC
21. ${abr-lib} ${GLES-lib} ${hilog-lib}
22. )
```

### ABR初始化

在应用创建Surface后会触发其事件回调函数Core::OnSurfaceCreated()，在该函数中完成ABR上下文实例创建、ABR属性配置和功能激活。其中ABR上下文实例负责管理ABR整个生命周期。

1. 调用[HMS\_ABR\_CreateContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#ga8f785903a5382ff31baef78a3968f66a)接口创建ABR上下文实例，指定图形API类型。如果返回nullptr，则说明ABR上下文实例创建失败，或当前硬件设备不支持开启ABR。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 创建ABR上下文实例，指定图形API类型
   2. ABR_Context *context_ = HMS_ABR_CreateContext(RENDER_API_GLES);
   3. if (context_ == nullptr) {
   4. return false;
   5. }
   ```
2. 调用[HMS\_ABR\_SetTargetFps](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#ga6c613e02088d559b9dc1450fde15bc2a)接口初始化ABR实例，根据游戏的目标帧率配置ABR的目标帧率属性。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 初始化ABR接口调用错误码
   2. ABR_ErrorCode errorCode = ABR_SUCCESS;

   4. // 初始化ABR实例，配置ABR的目标帧率属性。例如游戏目标帧率为120fps，则配置ABR的目标帧率属性为120fps
   5. errorCode = HMS_ABR_SetTargetFps(context_, 120);
   6. if (errorCode != ABR_SUCCESS) {
   7. return false;
   8. }
   ```
3. 调用[HMS\_ABR\_SetScaleRange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#ga1001c6a7739d8ce57bf851986f121bf5)接口初始化ABR实例，配置Buffer分辨率因子范围属性。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 初始化ABR实例，配置Buffer分辨率因子范围属性，结合具体游戏分辨率、画质设置合适的范围
   2. // 例如设置ABR对Buffer分辨率进行0.5~1.0倍的自适应调整
   3. errorCode = HMS_ABR_SetScaleRange(context_, 0.5f, 1.0f);
   4. if (errorCode != ABR_SUCCESS) {
   5. return false;
   6. }
   ```
4. 调用[HMS\_ABR\_Activate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#ga463d8d5396bfd5f6ed800ddab616479a)接口激活ABR上下文实例。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 激活ABR上下文实例
   2. errorCode = HMS_ABR_Activate(context_);
   3. if (errorCode != ABR_SUCCESS) {
   4. return false;
   5. }
   ```

### 相机运动数据更新

在帧循环中，ABR根据获取的实时相机运动数据进行Buffer分辨率因子决策。

调用[HMS\_ABR\_UpdateCameraData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#ga5b895e36d31e46f71d04aba78c8f3716)接口并传入相机运动信息，包含相机旋转、位移信息。

收起

自动换行

深色代码主题

复制

```
1. // 相机运动数据结构体，设置每帧实时相机运动数据
2. ABR_CameraData cameraData;
3. // 每帧位置
4. ABR_Vector3 position_;
5. // 每帧的相机旋转角，范围是[0, 360]
6. ABR_Vector3 rotation_;
7. cameraData.position = position_;
8. cameraData.rotation = rotation_;

10. // 每帧相机运动数据更新
11. errorCode = HMS_ABR_UpdateCameraData(context_, &cameraData);
12. if (errorCode != ABR_SUCCESS) {
13. return false;
14. }
```

### 自适应渲染

在帧循环中，ABR将对所标记的Buffer进行自适应渲染处理。

1. 选择着色器处理耗时较高的Buffer，并在Buffer渲染前绑定帧缓冲。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 创建帧缓冲对象
   2. GLuint fbo;
   3. glGenFramebuffers(1, &fbo);
   4. // 绑定帧缓冲
   5. glBindFramebuffer(GL_FRAMEBUFFER, fbo);
   ```
2. 调用[HMS\_ABR\_MarkFrameBuffer\_GLES](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#ga821fb33620312d3adba51d30254c1ef0)接口对Buffer进行标记。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 在Buffer渲染前调用，执行失败不影响Buffer正常渲染
   2. errorCode = HMS_ABR_MarkFrameBuffer_GLES(context_);
   3. if (errorCode != ABR_SUCCESS) {
   4. return false;
   5. }
   ```
3. 执行Buffer原有渲染流程。

### 销毁ABR实例

在Surface销毁时，会触发其事件回调函数Core::OnSurfaceDestroyed()，在该函数中完成ABR实例的销毁。

调用[HMS\_ABR\_DestroyContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#gaf3c03179b9bcf1b8475230cbbb0d877c)接口销毁ABR实例，释放内存资源。

收起

自动换行

深色代码主题

复制

```
1. // 销毁ABR上下文实例并释放内存资源
2. ABR_ErrorCode errorCode = HMS_ABR_DestroyContext(&context_);
3. if (errorCode != ABR_SUCCESS) {
4. return false;
5. }
```