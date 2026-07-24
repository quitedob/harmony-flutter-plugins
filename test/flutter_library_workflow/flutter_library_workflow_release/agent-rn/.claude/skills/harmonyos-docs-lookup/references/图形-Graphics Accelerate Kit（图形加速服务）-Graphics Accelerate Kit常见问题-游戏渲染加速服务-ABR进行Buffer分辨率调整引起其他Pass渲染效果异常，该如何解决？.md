**现象描述**

以团结引擎URP管线为例，ABR对DrawOpaqueObjects绑定的Buffer进行分辨率调整时会引起SSAO shadow效果异常。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9b/v3/dzC84YYvRAisk22gVubPUA/zh-cn_image_0000002385317982.png?HW-CC-KV=V1&HW-CC-Date=20260414T054501Z&HW-CC-Expire=86400&HW-CC-Sign=0C2835436C770F26748450E707474A14B1407FEBD71FC1BFF7DF770F4FEED1AD "点击放大")

**原因分析**

通过上述URP管线可以看到，SSAO在渲染管线中是一个“前处理”，SSAO输出的图像会作为DrawOpaqueObjects的输入。当ABR对DrawOpaqueObjects绑定的Buffer进行自适应分辨率调整时，SSAO输出的图像为原始分辨率，而DrawOpaqueObjects绑定的Buffer使用低分辨率，分辨率不一致导致SSAO shadow效果异常。

**处理步骤**

1. **仅支持渲染线程的游戏引擎处理步骤**

针对该问题的解决方案，以下两种方案二选一即可。

* **方案1**：调整渲染管线，将SSAO作为“后处理”，SSAO不受DrawOpaqueObjects绑定的Buffer分辨率影响。

  在URP资产中勾选“After Opaque”：

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6c/v3/PLHyEv--QnC22KWYqMHdxg/zh-cn_image_0000002385158082.png?HW-CC-KV=V1&HW-CC-Date=20260414T054501Z&HW-CC-Expire=86400&HW-CC-Sign=C8DE1CF211C56926A9FC3DB56F99D29EA1591BCCF2016D8DF7BE8C00A2435B4C "点击放大")

* **方案2**：获取实时的ABR Buffer分辨率因子，并根据Buffer分辨率因子对相关渲染数据进行同步调整。

  SSAO的shader会根据scaledScreenParams参数进行计算，该变量与渲染分辨率相关，在集成ABR后，scaledScreenParams需要根据实时的ABR Buffer分辨率因子调整。

  对于团结引擎，可在ScriptableRenderer.cs的SetPerCameraShaderVariables函数中根据Buffer分辨率因子设置scaledScreenParams参数。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. void SetPerCameraShaderVariables(CommandBuffer cmd, ref CameraData cameraData, bool isTargetFlipped)
  2. {
  3. Camera camera = cameraData.camera;
  4. float scaledCameraWidth = (float)cameraData.cameraTargetDescriptor.width;
  5. float scaledCameraHeight = (float)cameraData.cameraTargetDescriptor.height;
  6. // scale为通过HMS_ABR_GetScale接口获取的ABR Buffer分辨率因子
  7. scaledCameraWidth *= scale;
  8. scaledCameraHeight *= scale;
  9. cmd.SetGlobalVector(ShaderPropertyId.scaledScreenParams, new Vector4(scaledCameraWidth, scaledCameraHeight, 1.0f + 1.0f / scaledCameraWidth, 1.0f + 1.0f / scaledCameraHeight));
  10. }
  ```

2. **支持渲染线程、RHI线程的游戏引擎处理步骤**

对于同时支持渲染线程、RHI线程的游戏引擎，而且RHI线程延迟于渲染线程的场景，渲染线程通过[HMS\_ABR\_GetScale](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#ga936129328fea3a5f77b2aae4935f67c6)接口获取的ABR Buffer分辨率因子无法解决上述问题。

对于该场景，渲染线程在Buffer渲染后调用[HMS\_ABR\_GetNextScale](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#section157311245143415)接口获取下一帧的ABR Buffer分辨率因子，并根据Buffer分辨率因子对相关渲染数据进行同步调整。

收起

自动换行

深色代码主题

复制

```
1. // 在Buffer渲染后调用
2. float scale = 1.0f;
3. errorCode = HMS_ABR_GetNextScale(context_, &scale);
4. if (errorCode != ABR_SUCCESS) {
5. GOLOGE("HMS_ABR_GetNextScale execution failed, error code: %d.", errorCode);
6. }

8. // 根据Buffer分辨率因子对渲染数据进行同步调整
9. void SetViewUniformParameters()
10. {
11. ViewUniformParameters.BufferSize.X = (int)(ViewUniformParameters.BufferSize.X * scale);
12. ViewUniformParameters.BufferSize.Y = (int)(ViewUniformParameters.BufferSize.Y * scale);
13. ViewUniformParameters.BufferInvSize.X /= scale;
14. ViewUniformParameters.BufferInvSize.Y /= scale;
15. }
```