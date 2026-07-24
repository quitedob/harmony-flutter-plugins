## 业务流程

基于OpenGL ES图形API平台，系统送显模式的主要业务流程如下：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/61/v3/J3VCMxiXSlmHwykq2Q2uTg/zh-cn_image_0000002423154598.png?HW-CC-KV=V1&HW-CC-Date=20260414T054313Z&HW-CC-Expire=86400&HW-CC-Sign=FFFE7BC258972CD1DED893F58ED5B52D6802F09B938E91E6B4D76A58145677BC)

1. 用户进入超帧适用的游戏场景。
2. 游戏应用调用[HMS\_FG\_CreateContext\_GLES](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#ga58e6b601cc4a7e8f0208d4f10f16c7e5)接口创建超帧上下文实例。如超帧上下文实例创建失败，则无需在步骤6提供当前帧信息，只需逐帧对场景进行渲染送显即可。
3. 游戏应用调用接口配置超帧实例属性。包括调用[HMS\_FG\_SetAlgorithmMode\_GLES](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#ga79cc36ec768553a6560d1c553ef83c3b)（必选）设置超帧算法模式并选择内插模式；按需调用其他插帧相关配置接口。
4. 设置集成模式，选择系统侧集成调用[HMS\_FG\_SetIntegrationMode\_GLES](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#section291123211916)（必选）设置超帧预测的集成信息[FG\_IntegrationInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___intergration_info)并选择系统侧送显；系统送显预测帧模式下可通过[HMS\_FG\_SetUiPredictionEnabled\_GLES](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#section41231648141914)（可选）启用UI预测功能，不启用时预测帧会复用上一帧的UI进行展示；系统送显模式下可通过[HMS\_FG\_SetTargetFps\_GLES](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#section19112185207)（可选）设置超帧后的目标帧率。
5. 游戏应用调用[HMS\_FG\_Activate\_GLES](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#gaa5f1d5b98694100aa3e3dbb4c99ac23a)接口激活超帧上下文实例。
6. 游戏应用渲染真实帧，调用[HMS\_FG\_Dispatch\_GLES](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#gab135a0f59582d168d461ef115423cfb4)接口并传入真实帧颜色信息、深度信息、相机矩阵信息，生成预测帧。
7. 游戏应用完成UI绘制，并送显当前真实帧。
8. 用户退出超帧适用的游戏场景。
9. 游戏应用调用[HMS\_FG\_DestroyContext\_GLES](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#ga8c61d12e9e4c8f7e95bed76006ee3335)接口销毁超帧上下文实例并释放内存资源。

## 开发步骤

本节阐述基于OpenGL ES图形API平台的系统送显模式调用示例。

1. 设置meta-data。在应用的module.json5中声明meta-data以支持系统送显模式。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. {
   2. "module": {
   3. // 其他的配置项
   4. // ...
   5. "metadata": [
   6. {
   7. "name": "GraphicsAccelerateKit_FusionAware",
   8. "value": "GLES"
   9. }
   10. ]
   11. }
   12. }
   ```
2. 引用Graphics Accelerate Kit超帧头文件：frame\_generation\_gles.h。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 引用超帧frame_generation_gles.h头文件
   2. #include <graphics_game_sdk/frame_generation_gles.h>
   ```
3. 调用[HMS\_FG\_CreateContext\_GLES](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#ga58e6b601cc4a7e8f0208d4f10f16c7e5)接口创建超帧上下文实例。如果返回nullptr，则说明超帧上下文实例创建失败，或当前硬件设备不支持开启超帧。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 创建超帧上下文实例
   2. FG_Context_GLES* context_ = HMS_FG_CreateContext_GLES();
   3. if (context_ == nullptr) {
   4. return false;
   5. }
   ```
4. 调用超帧实例属性配置接口，超帧算法模式选择内插模式并指定系统送显预测帧模式。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 初始化超帧接口调用错误码
   2. FG_ErrorCode errorCode = FG_SUCCESS;

   4. // 超帧算法模式
   5. FG_AlgorithmModeInfo aInfo{};
   6. aInfo.predictionMode = FG_PREDICTION_MODE_INTERPOLATION;                  // 内插模式
   7. aInfo.meMode = FG_ME_MODE_BASIC;                                          // 运动估计基础模式
   8. errorCode = HMS_FG_SetAlgorithmMode_GLES(context_, &aInfo);               // [必选] 设置超帧算法模式
   9. if (errorCode != FG_SUCCESS) {
   10. return false;
   11. }

   13. // 超帧预测的集成信息
   14. FG_IntegrationInfo integrationInfo {};
   15. integrationInfo.presentMode = FG_PRESENT_BY_SYSTEM;                       // 预测帧送显模式
   16. integrationInfo.textureCachedByGame = false;                              // 输入的颜色纹理和深度纹理游戏侧缓存 系统不会复制一份再做预测 默认游戏不会缓存
   17. integrationInfo.needFlipInputColor = false;                               // 颜色纹理需要翻转 默认false
   18. integrationInfo.needFlipOutputColor = false;                              // 预测帧需要翻转 默认false
   19. // [可选] 设置超帧预测的集成信息
   20. errorCode = HMS_FG_SetIntegrationMode_GLES(context_, &integrationInfo);
   21. if (errorCode != FG_SUCCESS) {
   22. return false;
   23. }

   25. // 调用其他插帧相关配置接口
   26. // ...

   28. // [可选] 设置是否启用UI预测功能，仅在系统送显模式下有效，在游戏送显模式下无效，接口不调用默认为false，预测帧会复用上一帧的UI进行展示
   29. errorCode = HMS_FG_SetUiPredictionEnabled_GLES(context_, false);
   30. if (errorCode != FG_SUCCESS) {
   31. return false;
   32. }

   34. // [可选] 设置超帧后的目标帧率，仅在系统送显模式下且游戏上架后有效，在游戏送显模式下无效，接口不调用默认不会限制帧率，取决于游戏渲染帧率
   35. errorCode = HMS_FG_SetTargetFps_GLES(context_, 60);
   36. if (errorCode != FG_SUCCESS) {
   37. return false;
   38. }
   ```
5. 调用[HMS\_FG\_Activate\_GLES](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#gaa5f1d5b98694100aa3e3dbb4c99ac23a)接口激活超帧上下文实例。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 激活超帧上下文实例
   2. errorCode = HMS_FG_Activate_GLES(context_);
   3. if (errorCode != FG_SUCCESS) {
   4. return false;
   5. }
   ```
6. 游戏运行中，渲染真实帧时，缓存颜色信息、深度信息和相机矩阵等属性信息。渲染预测帧时，需调用[HMS\_FG\_Dispatch\_GLES](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#gab135a0f59582d168d461ef115423cfb4)接口并传入真实帧属性信息，生成预测帧。游戏送显真实帧，系统会在真实帧和上一帧间完成预测帧的展示。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 帧生成属性配置结构体
   2. FG_DispatchDescription_GLES dispatchDescriptionData_ {
   3. .inputColor = 0U,
   4. .inputDepthStencil = 0U,
   5. .viewProj{},
   6. .invViewProj{},
   7. .outputColor = 0U
   8. };

   10. // 变量声明
   11. uint32_t inputColor = 0;
   12. uint32_t inputDepthStencil = 0;
   13. FG_Mat4x4 preViewProj;
   14. FG_Mat4x4 preInvViewProj;

   16. // 帧循环
   17. while (true) {
   18. // 真实帧渲染阶段
   19. // 绘制真实帧
   20. // ...

   22. // 绘制UI
   23. // ...

   25. // 渲染当前帧渲染画面，缓存颜色、深度、相机矩阵等信息，用于下一帧预测帧生成
   26. // ...

   28. // 预测帧渲染阶段
   29. // 传入上一帧真实渲染帧颜色缓冲区索引
   30. dispatchDescriptionData_.inputColor = inputColor;
   31. // 传入上一帧真实渲染帧深度模板缓冲区索引
   32. dispatchDescriptionData_.inputDepthStencil = inputDepthStencil;
   33. // 传入上一帧真实渲染帧视图投影矩阵
   34. dispatchDescriptionData_.viewProj = preViewProj;
   35. // 传入上一帧真实渲染帧视图投影逆矩阵
   36. dispatchDescriptionData_.invViewProj= preInvViewProj;

   38. // [可选] 当视图投影矩阵的平移分量非常大时，可提供相机扩展属性信息获得更加准确的超帧效果
   39. FG_PerFrameExtendedCameraInfo info;
   40. errorCode = HMS_FG_SetExtendedCameraInfo_GLES(context_, &info);

   42. // 生成预测帧，更新预测帧缓冲区的内存
   43. errorCode = HMS_FG_Dispatch_GLES(context_, &dispatchDescriptionData_);
   44. switch (errorCode) {
   45. case FG_SUCCESS:
   46. // 生成预测帧成功
   47. break;
   48. case FG_COLLECTING_PREVIOUS_FRAMES:
   49. // 传入真实帧数量未达到固定阈值，无预测帧生成，基础内插模式传入真实帧数量<2时返回该状态码，此时不要将预测帧送显
   50. break;
   51. default:
   52. // 预测帧生成失败
   53. break;
   54. }

   56. // 送显真实帧
   57. // ...
   58. }
   ```
7. 调用[HMS\_FG\_DestroyContext\_GLES](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#ga8c61d12e9e4c8f7e95bed76006ee3335)接口销毁超帧实例，释放内存资源。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 销毁超帧上下文实例并释放内存资源
   2. errorCode = HMS_FG_DestroyContext_GLES(&context_);
   3. if (errorCode != FG_SUCCESS) {
   4. return false;
   5. }
   ```