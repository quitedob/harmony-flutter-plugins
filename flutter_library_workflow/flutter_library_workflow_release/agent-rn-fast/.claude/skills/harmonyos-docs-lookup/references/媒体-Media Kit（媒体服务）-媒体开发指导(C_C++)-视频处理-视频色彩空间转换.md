开发者可以调用本模块提供的[C API接口](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-videoprocessing)，实现HDR2SDR、HDR2HDR、SDR2SDR的色彩空间转换。

该能力常用于视频编辑和视频分享中：

* **视频编辑**

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/41/v3/2UBFIPmFRhWU09bA4DO7kQ/zh-cn_image_0000002571172091.png?HW-CC-KV=V1&HW-CC-Date=20260414T053213Z&HW-CC-Expire=86400&HW-CC-Sign=9D54A19E2873AC0ED044E0F510BDA8AAB3C976EA695A96C4CA37790A058B1008)
* **视频分享**

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/be/v3/YKgoPhg2TGC6DT5BaY4ryA/zh-cn_image_0000002540771750.png?HW-CC-KV=V1&HW-CC-Date=20260414T053213Z&HW-CC-Expire=86400&HW-CC-Sign=96DD7B49A13258D0D259A8C972A9134DD7902C769F681007B58C1F5FB27D3657)

## 规格说明

视频色彩空间转换算法为SDR2SDR时，支持的格式类型组合如下：

* 格式类型组合一：

  展开

  | **参数** | **输入** | **输出** |
  | --- | --- | --- |
  | [ColorSpace](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-buffer-common-h#oh_nativebuffer_colorspace) | OH\_COLORSPACE\_BT601\_EBU\_LIMIT | OH\_COLORSPACE\_BT709\_LIMIT |
  | [MetadataType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-buffer-common-h#oh_nativebuffer_metadatatype) | OH\_VIDEO\_NONE | OH\_VIDEO\_NONE |
  | [pixelFormat](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-buffer-common-h#oh_nativebuffer_format) | NATIVEBUFFER\_PIXEL\_FMT\_YCBCR\_420\_SP,  NATIVEBUFFER\_PIXEL\_FMT\_YCRCB\_420\_SP,  NATIVEBUFFER\_PIXEL\_FMT\_RGBA\_8888 | NATIVEBUFFER\_PIXEL\_FMT\_YCBCR\_420\_SP,  NATIVEBUFFER\_PIXEL\_FMT\_YCRCB\_420\_SP,  NATIVEBUFFER\_PIXEL\_FMT\_RGBA\_8888 |
* 格式类型组合二：

  展开

  | **参数** | **输入** | **输出** |
  | --- | --- | --- |
  | [ColorSpace](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-buffer-common-h#oh_nativebuffer_colorspace) | OH\_COLORSPACE\_BT601\_SMPTE\_C\_LIMIT | OH\_COLORSPACE\_BT709\_LIMIT |
  | [MetadataType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-buffer-common-h#oh_nativebuffer_metadatatype) | OH\_VIDEO\_NONE | OH\_VIDEO\_NONE |
  | [pixelFormat](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-buffer-common-h#oh_nativebuffer_format) | NATIVEBUFFER\_PIXEL\_FMT\_YCBCR\_420\_SP,  NATIVEBUFFER\_PIXEL\_FMT\_YCRCB\_420\_SP,  NATIVEBUFFER\_PIXEL\_FMT\_RGBA\_8888 | NATIVEBUFFER\_PIXEL\_FMT\_YCBCR\_420\_SP,  NATIVEBUFFER\_PIXEL\_FMT\_YCRCB\_420\_SP,  NATIVEBUFFER\_PIXEL\_FMT\_RGBA\_8888 |

视频色彩空间转换算法为HDR2SDR时，支持的格式类型组合如下：

* 格式类型组合一：

  展开

  | **参数** | **输入** | **输出** |
  | --- | --- | --- |
  | [ColorSpace](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-buffer-common-h#oh_nativebuffer_colorspace) | OH\_COLORSPACE\_BT2020\_PQ\_LIMIT | OH\_COLORSPACE\_BT709\_LIMIT |
  | [MetadataType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-buffer-common-h#oh_nativebuffer_metadatatype) | OH\_VIDEO\_HDR\_VIVID | OH\_VIDEO\_NONE |
  | [pixelFormat](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-buffer-common-h#oh_nativebuffer_format) | NATIVEBUFFER\_PIXEL\_FMT\_YCBCR\_P010,  NATIVEBUFFER\_PIXEL\_FMT\_YCRCB\_P010,  NATIVEBUFFER\_PIXEL\_FMT\_RGBA\_1010102 | NATIVEBUFFER\_PIXEL\_FMT\_YCBCR\_420\_SP,  NATIVEBUFFER\_PIXEL\_FMT\_YCRCB\_420\_SP,  NATIVEBUFFER\_PIXEL\_FMT\_RGBA\_888 |
* 格式类型组合二：

  展开

  | **参数** | **输入** | **输出** |
  | --- | --- | --- |
  | [ColorSpace](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-buffer-common-h#oh_nativebuffer_colorspace) | OH\_COLORSPACE\_BT2020\_HLG\_LIMIT | OH\_COLORSPACE\_BT709\_LIMIT |
  | [MetadataType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-buffer-common-h#oh_nativebuffer_metadatatype) | OH\_VIDEO\_HDR\_VIVID | OH\_VIDEO\_NONE |
  | [pixelFormat](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-buffer-common-h#oh_nativebuffer_format) | NATIVEBUFFER\_PIXEL\_FMT\_YCBCR\_P010,  NATIVEBUFFER\_PIXEL\_FMT\_YCRCB\_P010,  NATIVEBUFFER\_PIXEL\_FMT\_RGBA\_1010102 | NATIVEBUFFER\_PIXEL\_FMT\_YCBCR\_420\_SP,  NATIVEBUFFER\_PIXEL\_FMT\_YCRCB\_420\_SP,  NATIVEBUFFER\_PIXEL\_FMT\_RGBA\_8888 |
* 格式类型组合三：

  展开

  | **参数** | **输入** | **输出** |
  | --- | --- | --- |
  | [ColorSpace](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-buffer-common-h#oh_nativebuffer_colorspace) | OH\_COLORSPACE\_BT2020\_HLG\_FULL | OH\_COLORSPACE\_BT709\_LIMIT |
  | [MetadataType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-buffer-common-h#oh_nativebuffer_metadatatype) | OH\_VIDEO\_HDR\_VIVID | OH\_VIDEO\_NONE |
  | [pixelFormat](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-buffer-common-h#oh_nativebuffer_format) | NATIVEBUFFER\_PIXEL\_FMT\_YCBCR\_P010,  NATIVEBUFFER\_PIXEL\_FMT\_YCRCB\_P010,  NATIVEBUFFER\_PIXEL\_FMT\_RGBA\_1010102 | NATIVEBUFFER\_PIXEL\_FMT\_YCBCR\_420\_SP,  NATIVEBUFFER\_PIXEL\_FMT\_YCRCB\_420\_SP,  NATIVEBUFFER\_PIXEL\_FMT\_RGBA\_8888 |
* 格式类型组合四：

  展开

  | **参数** | **输入** | **输出** |
  | --- | --- | --- |
  | [ColorSpace](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-buffer-common-h#oh_nativebuffer_colorspace) | OH\_COLORSPACE\_BT2020\_HLG\_FULL | OH\_COLORSPACE\_P3\_FULL |
  | [MetadataType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-buffer-common-h#oh_nativebuffer_metadatatype) | OH\_VIDEO\_HDR\_VIVID | OH\_VIDEO\_NONE |
  | [pixelFormat](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-buffer-common-h#oh_nativebuffer_format) | NATIVEBUFFER\_PIXEL\_FMT\_YCBCR\_P010,  NATIVEBUFFER\_PIXEL\_FMT\_YCRCB\_P010,  NATIVEBUFFER\_PIXEL\_FMT\_RGBA\_1010102 | NATIVEBUFFER\_PIXEL\_FMT\_YCBCR\_420\_SP,  NATIVEBUFFER\_PIXEL\_FMT\_YCRCB\_420\_SP,  NATIVEBUFFER\_PIXEL\_FMT\_RGBA\_8888 |

视频色彩空间转换算法为HDR2HDR时，支持的格式类型组合如下：

* 格式类型组合一：

  展开

  | **参数** | **输入** | **输出** |
  | --- | --- | --- |
  | [ColorSpace](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-buffer-common-h#oh_nativebuffer_colorspace) | OH\_COLORSPACE\_BT2020\_PQ\_LIMIT | OH\_COLORSPACE\_BT2020\_HLG\_LIMIT |
  | [MetadataType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-buffer-common-h#oh_nativebuffer_metadatatype) | OH\_VIDEO\_HDR\_VIVID | OH\_VIDEO\_HDR\_VIVID |
  | [pixelFormat](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-buffer-common-h#oh_nativebuffer_format) | NATIVEBUFFER\_PIXEL\_FMT\_YCBCR\_P010,  NATIVEBUFFER\_PIXEL\_FMT\_YCRCB\_P010,  NATIVEBUFFER\_PIXEL\_FMT\_RGBA\_1010102 | NATIVEBUFFER\_PIXEL\_FMT\_YCBCR\_P010,  NATIVEBUFFER\_PIXEL\_FMT\_YCRCB\_P010,  NATIVEBUFFER\_PIXEL\_FMT\_RGBA\_1010102 |
* 格式类型组合二：

  展开

  | **参数** | **输入** | **输出** |
  | --- | --- | --- |
  | [ColorSpace](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-buffer-common-h#oh_nativebuffer_colorspace) | OH\_COLORSPACE\_BT2020\_PQ\_LIMIT | OH\_COLORSPACE\_BT2020\_HLG\_LIMIT |
  | [MetadataType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-buffer-common-h#oh_nativebuffer_metadatatype) | OH\_VIDEO\_HDR\_HDR10 | OH\_VIDEO\_HDR\_HLG |
  | [pixelFormat](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-buffer-common-h#oh_nativebuffer_format) | NATIVEBUFFER\_PIXEL\_FMT\_YCBCR\_P010,  NATIVEBUFFER\_PIXEL\_FMT\_YCRCB\_P010,  NATIVEBUFFER\_PIXEL\_FMT\_RGBA\_1010102 | NATIVEBUFFER\_PIXEL\_FMT\_YCBCR\_P010,  NATIVEBUFFER\_PIXEL\_FMT\_YCRCB\_P010,  NATIVEBUFFER\_PIXEL\_FMT\_RGBA\_1010102 |
* 格式类型组合三：

  展开

  | **参数** | **输入** | **输出** |
  | --- | --- | --- |
  | [ColorSpace](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-buffer-common-h#oh_nativebuffer_colorspace) | OH\_COLORSPACE\_BT2020\_PQ\_LIMIT | OH\_COLORSPACE\_BT2020\_HLG\_LIMIT |
  | [MetadataType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-buffer-common-h#oh_nativebuffer_metadatatype) | OH\_VIDEO\_HDR\_VIVID | OH\_VIDEO\_HDR\_HLG |
  | [pixelFormat](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-buffer-common-h#oh_nativebuffer_format) | NATIVEBUFFER\_PIXEL\_FMT\_YCBCR\_P010,  NATIVEBUFFER\_PIXEL\_FMT\_YCRCB\_P010,  NATIVEBUFFER\_PIXEL\_FMT\_RGBA\_1010102 | NATIVEBUFFER\_PIXEL\_FMT\_YCBCR\_P010,  NATIVEBUFFER\_PIXEL\_FMT\_YCRCB\_P010,  NATIVEBUFFER\_PIXEL\_FMT\_RGBA\_1010102 |
* 格式类型组合四：

  展开

  | **参数** | **输入** | **输出** |
  | --- | --- | --- |
  | [ColorSpace](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-buffer-common-h#oh_nativebuffer_colorspace) | OH\_COLORSPACE\_BT2020\_HLG\_LIMIT | OH\_COLORSPACE\_BT2020\_PQ\_LIMIT |
  | [MetadataType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-buffer-common-h#oh_nativebuffer_metadatatype) | OH\_VIDEO\_HDR\_VIVID | OH\_VIDEO\_HDR\_VIVID |
  | [pixelFormat](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-buffer-common-h#oh_nativebuffer_format) | NATIVEBUFFER\_PIXEL\_FMT\_YCBCR\_P010,  NATIVEBUFFER\_PIXEL\_FMT\_YCRCB\_P010,  NATIVEBUFFER\_PIXEL\_FMT\_RGBA\_1010102 | NATIVEBUFFER\_PIXEL\_FMT\_YCBCR\_P010,  NATIVEBUFFER\_PIXEL\_FMT\_YCRCB\_P010,  NATIVEBUFFER\_PIXEL\_FMT\_RGBA\_1010102 |

**支持的分辨率规格：**

展开

| 最小分辨率（单位：像素） | 最大分辨率（单位：像素） |
| --- | --- |
| 32\*32 | 8192\*8192 |

## 约束与限制

1. 为保障转换效率，建议并行转换不超过5个。
2. 不允许在视频处理回调函数中，直接调用视频处理相关接口或其他耗时操作，请在应用自己的线程中调用。

## 开发指导

具体实现可参考[示例工程](https://gitcode.com/HarmonyOS_Samples/guide-snippets/tree/master/MediaKit/VideoProcessing)。

### 在 CMake 脚本中链接动态库

收起

自动换行

深色代码主题

复制

```
1. target_link_libraries(sample PUBLIC libvideo_processing.so)
```

### 开发步骤

1. 添加头文件。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. #include <multimedia/video_processing_engine/video_processing.h>
   2. #include <multimedia/video_processing_engine/video_processing_types.h>
   3. #include <native_window/external_window.h>
   4. #include <native_buffer/native_buffer.h>
   5. #include <ace/xcomponent/native_interface_xcomponent.h>
   ```
2. （可选）初始化环境。

   一般在进程内第一次使用时调用，可提前完成部分耗时操作。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. OH_VideoProcessing_InitializeEnvironment();
   ```
3. （可选）查询能力支持。建议在使用对应能力前调用。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. //输入输出格式
   2. VideoProcessing_ColorSpaceInfo inputFormat;
   3. VideoProcessing_ColorSpaceInfo outputFormat;
   4. inputFormat.metadataType = OH_VIDEO_HDR_HDR10;
   5. inputFormat.colorSpace = OH_COLORSPACE_BT2020_PQ_LIMIT;
   6. inputFormat.pixelFormat = NATIVEBUFFER_PIXEL_FMT_YCBCR_P010;
   7. outputFormat.metadataType = OH_VIDEO_HDR_HLG;
   8. outputFormat.colorSpace = OH_COLORSPACE_BT2020_HLG_LIMIT;
   9. outputFormat.pixelFormat = NATIVEBUFFER_PIXEL_FMT_YCBCR_P010;

   11. //能力查询
   12. bool isSupport = OH_VideoProcessing_IsColorSpaceConversionSupported(&inputFormat, &outputFormat);
   ```
4. 创建色彩空间转换模块。

   应用可以通过视频处理引擎模块类型来创建色彩空间转换模块。示例中的变量说明如下：

   * videoProcessor：色彩空间转换模块实例。
   * VIDEO\_PROCESSING\_TYPE\_COLOR\_SPACE\_CONVERSION：色彩空间转换类型。
   * 预期返回值：VIDEO\_PROCESSING\_SUCCESS

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 通过指定视频处理引擎类型创建色彩空间转换模块实例
   2. OH_VideoProcessing* videoProcessor = nullptr;
   3. VideoProcessing_ErrorCode ret = OH_VideoProcessing_Create(&videoProcessor, VIDEO_PROCESSING_TYPE_COLOR_SPACE_CONVERSION);
   ```
5. 配置异步回调函数。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 回调函数声明（其中userData会传递注册回调时传入的用户数据，如：this指针）
   2. void OnError(OH_VideoProcessing* videoProcessor, VideoProcessing_ErrorCode error, void* userData);
   3. void OnState(OH_VideoProcessing* videoProcessor, VideoProcessing_State state, void* userData);
   4. void OnNewOutputBuffer(OH_VideoProcessing* videoProcessor, uint32_t index, void* userData);

   6. // 创建回调实例
   7. VideoProcessing_Callback* callback = nullptr;
   8. ret = OH_VideoProcessingCallback_Create(&callback);
   9. // 绑定回调函数
   10. OH_VideoProcessingCallback_BindOnError(callback, OnError);
   11. OH_VideoProcessingCallback_BindOnState(callback, OnState);
   12. OH_VideoProcessingCallback_BindOnNewOutputBuffer(callback, OnNewOutputBuffer);
   13. // 注册回调函数
   14. ret = OH_VideoProcessing_RegisterCallback(videoProcessor, callback, this);
   ```
6. 获取Surface。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. //获取输入surface
   2. OHNativeWindow *inWindow = nullptr;
   3. ret = OH_VideoProcessing_GetSurface(videoProcessor, &inWindow);
   ```
7. 设置Surface。

   说明

   可以通过XComponent等其他方式获取OHNativeWindow实例，具体参见[NativeWindows开发指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/native-window-guidelines)。

   视频处理引擎的SetSurface的windowOut从xcomponent的[OnSurfaceCreatedCB](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/native-window-guidelines)回调函数获取，需要对windowOut设置元数据类型、数据格式和颜色空间等参数。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 设置元数据类型、数据格式、颜色空间
   2. uint8_t metadataType = OH_VIDEO_HDR_HLG;
   3. OH_NativeWindow_SetMetadataValue(windowOut, OH_HDR_METADATA_TYPE, sizeof(uint8_t),
   4. (uint8_t *)&metadataType);
   5. OH_NativeBuffer_Format format = NATIVEBUFFER_PIXEL_FMT_YCBCR_P010;
   6. OH_NativeWindow_NativeWindowHandleOpt(windowOut, SET_FORMAT, format);
   7. OH_NativeBuffer_ColorSpace colorSpace = OH_COLORSPACE_BT2020_HLG_LIMIT;
   8. OH_NativeWindow_SetColorSpace(windowOut, colorSpace);
   9. // 设置输出surface
   10. VideoProcessing_ErrorCode ret = OH_VideoProcessing_SetSurface(videoProcessor, windowOut);
   ```
8. 调用[OH\_VideoProcessing\_Start()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-video-processing-h#oh_videoprocessing_start)启动色彩空间转换处理。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 开始色彩空间转换处理
   2. ret = OH_VideoProcessing_Start(videoProcessor);
   ```
9. 调用[OH\_VideoProcessing\_Stop()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-video-processing-h#oh_videoprocessing_stop)停止色彩空间转换处理。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. //停止色彩空间转换处理
   2. ret = OH_VideoProcessing_Stop(videoProcessor);
   ```
10. 释放处理实例。

    收起

    自动换行

    深色代码主题

    复制

    ```
    1. OH_VideoProcessingCallback_Destroy(callback);
    2. callback = nullptr;
    3. OH_VideoProcessing_Destroy(videoProcessor);
    4. videoProcessor = nullptr;
    ```
11. 释放处理资源。

    收起

    自动换行

    深色代码主题

    复制

    ```
    1. OH_VideoProcessing_DeinitializeEnvironment();
    ```