调用者可以调用本模块提供的[C API接口](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-imageprocessing)，实现将双层HDR图片转换为单层HDR图片。

该能力常用于图片分享中，如下图所示：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/fa/v3/AhaLIaCmT2mG-KV47clezg/zh-cn_image_0000002220860409.png?HW-CC-KV=V1&HW-CC-Date=20260414T052842Z&HW-CC-Expire=86400&HW-CC-Sign=39AA70023DCD5727E796C9E7F5270A390B6E4DF0CCC0418D65EFCC38DA82667B "点击放大")

## 规格说明

**支持的数据输入格式****：**

使用图片双层HDR转单层HDR转换算法Compose。

展开

| 输入[ColorSpaceName](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-color-space-manager-h#colorspacename) | 输入[HdrMetadataType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmap_hdrmetadatatype) | 输入[PIXEL\_FORMAT](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#pixel_format) | **输出[ColorSpaceName](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-color-space-manager-h#colorspacename)** | **输出**  [HdrMetadataType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmap_hdrmetadatatype) | **输出[PIXEL\_FORMAT](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#pixel_format)** |
| --- | --- | --- | --- | --- | --- |
| DISPLAY\_P3\_LIMIT/DISPLAY\_P3 | HDR\_METADATA\_TYPE\_BASE | RGBA\_8888 | BT2020\_HLG | HDR\_METADATA\_TYPE\_ALTERNATE | YCBCR\_P010 / RGBA\_1010102 |
| SRGB\_LIMIT/SRGB | HDR\_METADATA\_TYPE\_BASE | RGBA\_8888 | BT2020\_HLG | HDR\_METADATA\_TYPE\_ALTERNATE | YCBCR\_P010 / RGBA\_1010102 |
| DISPLAY\_P3\_LIMIT/DISPLAY\_P3 | HDR\_METADATA\_TYPE\_BASE | RGBA\_8888 | BT2020\_PQ | HDR\_METADATA\_TYPE\_ALTERNATE | YCBCR\_P010 / RGBA\_1010102 |
| SRGB\_LIMIT/SRGB | HDR\_METADATA\_TYPE\_BASE | RGBA\_8888 | BT2020\_PQ | HDR\_METADATA\_TYPE\_ALTERNATE | YCBCR\_P010 / RGBA\_1010102 |

**分辨率规格：**

展开

| **最小分辨率**（单位：像素） | **最大分辨率**（单位：像素） |
| --- | --- |
| 32\*32 | 8880\*8880 |

**内存规格：**

处理的PixelMap对象需为[DMA内存](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/image-allocator-type-c#内存类型介绍)。

## 开发指导

具体实现可参考[示例工程](https://gitcode.com/HarmonyOS_Samples/DocsSample_MultiMedia/tree/master/UsingImageProcessingToProcessImages)。

### 在 CMake 脚本中链接动态库

收起

自动换行

深色代码主题

复制

```
1. add_library(entry SHARED napi_init.cpp ImageProcessing/ImageProcessing.cpp)
2. target_link_libraries(entry PUBLIC ${BASE_LIBRARY})
```

### ArkTS侧调用的开发步骤

1. 创建10 bit的PixelMap。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let opts: image.InitializationOptions = {
   2. editable: true,
   3. pixelFormat: image.PixelMapFormat.YCBCR_P010,
   4. size: {
   5. height: this.inputHeight,
   6. width: this.inputWidth
   7. }
   8. };
   9. let outPutPixelMap = image.createPixelMapSync(opts);
   ```
2. 创建8 bit的PixelMap。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let sdrpixelMap : image.PixelMap = nativePix.createPixelMapTest(imageInfo.size.height, imageInfo.size.width);
   2. let gainmappixelMap : image.PixelMap = nativePix.createPixelMapTest(imageInfo.size.height, imageInfo.size.width);
   ```
3. 配置色彩框架和元数据信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let colorSpaceDISPLAY_P3 : colorSpaceManager.ColorSpaceManager = colorSpaceManager.create(colorSpaceManager.ColorSpace.DISPLAY_P3);
   2. let colorSpaceBT2020_HLG : colorSpaceManager.ColorSpaceManager = colorSpaceManager.create(colorSpaceManager.ColorSpace.BT2020_HLG);
   3. sdrpixelMap.setColorSpace(colorSpaceDISPLAY_P3);
   4. sdrpixelMap.setMetadata(image.HdrMetadataKey.HDR_METADATA_TYPE, image.HdrMetadataType.BASE);
   5. gainmappixelMap.setColorSpace(colorSpaceDISPLAY_P3);
   6. gainmappixelMap.setMetadata(image.HdrMetadataKey.HDR_METADATA_TYPE, image.HdrMetadataType.GAINMAP);
   7. hdrpixelMap.setColorSpace(colorSpaceBT2020_HLG);
   8. hdrpixelMap.setMetadata(image.HdrMetadataKey.HDR_METADATA_TYPE, image.HdrMetadataType.ALTERNATE);
   ```

### Native侧调用的开发步骤

1. 添加头文件。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. #include <multimedia/image_framework/image_mdk_common.h>
   2. #include <multimedia/image_framework/image_pixel_map_mdk.h>
   3. #include <multimedia/image_framework/image/pixelmap_native.h>
   4. #include <multimedia/video_processing_engine/image_processing.h>
   5. #include <multimedia/video_processing_engine/image_processing_types.h>
   6. #include <native_color_space_manager/native_color_space_manager.h>
   ```
2. （可选）初始化环境。

   一般在进程内第一次使用时调用，可提前完成部分耗时操作。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. ImageProcessing_ErrorCode ret =  OH_ImageProcessing_InitializeEnvironment();
   ```
3. （可选）查询能力支持。建议在使用对应能力前调用。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. //输入格式
   2. DST_INFO.colorSpace = BT2020_HLG;
   3. DST_INFO.metadataType = HDR_METADATA_TYPE_ALTERNATE;
   4. DST_INFO.pixelFormat = PIXEL_FORMAT_RGBA_1010102;
   5. SRC_INFO.colorSpace = DISPLAY_P3;
   6. SRC_INFO.metadataType = HDR_METADATA_TYPE_BASE;
   7. SRC_INFO.pixelFormat = PIXEL_FORMAT_RGBA_8888;
   8. SRC_GAIN_INFO.colorSpace = DISPLAY_P3;
   9. SRC_GAIN_INFO.metadataType = HDR_METADATA_TYPE_GAINMAP;
   10. SRC_GAIN_INFO.pixelFormat = PIXEL_FORMAT_RGBA_8888;
   11. //能力查询
   12. bool flag = OH_ImageProcessing_IsCompositionSupported(&SRC_INFO, &SRC_GAIN_INFO, &DST_INFO);
   ```
4. 创建8 bit的PixelMap。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. napi_value ImageProcessing::CreatePixelMap(napi_env env, napi_callback_info info)
   2. {
   3. napi_value udfVar = nullptr;
   4. napi_value pixelMap = nullptr;
   5. napi_value thisVar = nullptr;
   6. napi_value argValue[2] = {0};
   7. size_t argCount = 2;
   8. size_t count = 2;
   9. if (napi_get_cb_info(env, info, &argCount, argValue, &thisVar, nullptr) != napi_ok || argCount < count ||
   10. argValue[0] == nullptr || argValue[1] == nullptr) {
   11. return nullptr;
   12. }
   13. int32_t width = 0;
   14. int32_t height = 0;
   15. napi_get_value_int32(env, argValue[1], &width);
   16. napi_get_value_int32(env, argValue[0], &height);
   17. struct OhosPixelMapCreateOps createOps;
   18. createOps.width = width;
   19. createOps.height = height;
   20. int32_t rgba8888 = 3;
   21. createOps.pixelFormat = rgba8888;
   22. createOps.alphaType = 0;

   24. size_t bufferSize = createOps.width * createOps.height * 4;
   25. void *buff = malloc(bufferSize);
   26. int32_t res = OH_PixelMap_CreatePixelMapWithStride(env, createOps, (uint8_t *)buff, bufferSize, createOps.width * 4,
   27. &pixelMap);
   28. free(buff);
   29. OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, "createPixelMap",
   30. "OH_PixelMap_CreatePixelMapWithStride %{public}d", res);
   31. if (res != IMAGE_RESULT_SUCCESS || pixelMap == nullptr) {
   32. return udfVar;
   33. }
   34. return pixelMap;
   35. }
   ```
5. 将ArkTS中的PixelMap转换为C++的PixelMap。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. OH_PixelmapNative* sdr = nullptr;
   2. OH_PixelmapNative_ConvertPixelmapNativeFromNapi(env, argValue[0], &sdr);
   3. OH_PixelmapNative* gainmap = nullptr;
   4. OH_PixelmapNative_ConvertPixelmapNativeFromNapi(env, argValue[1], &gainmap);
   5. OH_PixelmapNative* hdr = nullptr;
   6. OH_PixelmapNative_ConvertPixelmapNativeFromNapi(env, argValue[2], &hdr);
   ```
6. 创建图片HDR双层转单层模块。

   应用可以通过图片处理引擎模块类型来创建图片HDR双层转单层模块。示例中的变量说明如下：

   * instance：图片处理模块实例。
   * IMAGE\_PROCESSING\_TYPE\_COMPOSITION：HDR双层转单层。
   * 预期返回值：IMAGE\_PROCESSING\_SUCCESS

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. OH_ImageProcessing* instance = nullptr;
   2. ret = OH_ImageProcessing_Create(&instance, IMAGE_PROCESSING_TYPE_COMPOSITION);
   ```
7. 执行算法。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. ret = OH_ImageProcessing_Compose(instance, sdr, gainmap, hdr);
   ```
8. 释放实例资源。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. ret = OH_ImageProcessing_Destroy(instance);
   2. instance = nullptr;
   ```
9. 释放初始化环境资源。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. ret = OH_ImageProcessing_DeinitializeEnvironment();
   ```

## 完整示例代码

ArkTS示例代码：

* [compose.ets示例代码](https://gitcode.com/HarmonyOS_Samples/DocsSample_MultiMedia/blob/master/UsingImageProcessingToProcessImages/entry/src/main/ets/view/HDRImageConversionComponent.ets)

C++相关示例代码：

* [CMakeLists.txt示例代码](https://gitcode.com/HarmonyOS_Samples/DocsSample_MultiMedia/blob/master/UsingImageProcessingToProcessImages/entry/src/main/cpp/CMakeLists.txt)
* [ImageProcessing.h示例代码](https://gitcode.com/HarmonyOS_Samples/DocsSample_MultiMedia/blob/master/UsingImageProcessingToProcessImages/entry/src/main/cpp/ImageProcessing/ImageProcessing.h)
* [ImageProcessing.cpp示例代码](https://gitcode.com/HarmonyOS_Samples/DocsSample_MultiMedia/blob/master/UsingImageProcessingToProcessImages/entry/src/main/cpp/ImageProcessing/ImageProcessing.cpp)