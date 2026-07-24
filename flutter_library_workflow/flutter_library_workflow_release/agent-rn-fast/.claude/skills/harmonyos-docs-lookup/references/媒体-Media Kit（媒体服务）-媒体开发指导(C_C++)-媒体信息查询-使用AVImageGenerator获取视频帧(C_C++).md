使用AVImageGenerator可以实现从原始媒体资源中获取指定时间的视频帧，本开发指导将以获取视频帧作为示例，向开发者讲解AVImageGenerator相关功能。

获取视频帧的全流程包含：创建AVImageGenerator对象、设置资源、获取视频帧、销毁资源。

## 开发步骤及注意事项

在 CMake 脚本中链接动态库。

收起

自动换行

深色代码主题

复制

```
1. target_link_libraries(entry PUBLIC libavimage_generator.so libace_napi.z.so)
```

使用[OH\_PixelmapNative\_ConvertPixelmapNativeToNapi()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapnative_convertpixelmapnativetonapi)接口将nativePixelMap对象转换为PixelMapnapi对象、[OH\_PixelmapNative\_Release()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapnative_release)接口释放OH\_PixelmapNative对象资源，需引入如下头文件。

收起

自动换行

深色代码主题

复制

```
1. #include <multimedia/image_framework/image/pixelmap_native.h>
```

并在 CMake 脚本中链接如下动态库。

收起

自动换行

深色代码主题

复制

```
1. target_link_libraries(entry PUBLIC libpixelmap.so libpixelmap_ndk.z.so)
```

开发者使用系统日志能力时，需引入如下头文件。

收起

自动换行

深色代码主题

复制

```
1. #include <hilog/log.h>
```

并需要在 CMake 脚本中链接如下动态库。

收起

自动换行

深色代码主题

复制

```
1. target_link_libraries(entry PUBLIC libhilog_ndk.z.so)
```

（可选）开发者可以使用[OH\_AVMetadataExtractor\_FetchMetadata()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avmetadata-extractor-h#oh_avmetadataextractor_fetchmetadata)获取媒体资源时长信息[OH\_AVMETADATA\_EXTRACTOR\_DURATION](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avmetadata-extractor-base-h#变量)，进而选择获取视频帧的时间。使用需引入如下头文件。

收起

自动换行

深色代码主题

复制

```
1. #include "multimedia/player_framework/avmetadata_extractor.h"
2. #include "multimedia/player_framework/avmetadata_extractor_base.h"
```

并需要在 CMake 脚本中链接如下动态库。

收起

自动换行

深色代码主题

复制

```
1. target_link_libraries(entry PUBLIC libavmetadata_extractor.so libnative_media_core.so)
```

开发者通过引入[avimage\_generator.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avimage-generator-h)、[avimage\_generator\_base.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avimage-generator-base-h)和[native\_averrors.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-averrors-h)头文件，使用获取视频帧相关API。

详细的API说明请参考[AVImageGenerator API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avimagegenerator)。

1. 使用[OH\_AVImageGenerator\_Create()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avimage-generator-h#oh_avimagegenerator_create)创建实例。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. #include <multimedia/player_framework/avimage_generator.h>
   2. // 创建OH_AVImageGenerator实例。
   3. OH_AVImageGenerator* generator = OH_AVImageGenerator_Create();
   ```
2. 设置视频资源的文件描述符：调用[OH\_AVImageGenerator\_SetFDSource()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avimage-generator-h#oh_avimagegenerator_setfdsource)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. #include "napi/native_api.h"
   2. #include <multimedia/player_framework/avimage_generator.h>
   3. #include <multimedia/player_framework/native_averrors.h>

   5. int64_t offset = 0; // 媒体源在文件描述符中的偏移量。
   6. int32_t fileDescribe = -1; // 媒体文件描述符。
   7. int32_t fileSize = 0; // 媒体文件大小。

   9. // 设置视频资源的文件描述符。
   10. OH_AVErrCode avErrCode = OH_AVImageGenerator_SetFDSource(generator, fileDescribe, offset, fileSize);
   11. // 异常处理。
   12. if (avErrCode != AV_ERR_OK) {
   13. OH_AVImageGenerator_Release(generator);
   14. napi_throw_error(env, "EFAILED", "SetFDSource failed");
   15. return nullptr;
   16. }
   ```
3. （可选）获取媒体资源时长信息，并指定获取视频帧的时间。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. #include "napi/native_api.h"
   2. #include "multimedia/player_framework/avmetadata_extractor.h"
   3. #include "multimedia/player_framework/avmetadata_extractor_base.h"
   4. static napi_value OhAVMetadataExtractorGetDuration(napi_env env, napi_callback_info info)
   5. {
   6. int64_t offset = 0;
   7. int32_t fileDescribe = -1;
   8. int64_t fileSize = 0;
   9. // 通过辅助函数，获取输入参数，实现见完整示例。
   10. if (!GetGetDurationParams(env, info, offset, fileDescribe, fileSize)) {
   11. return nullptr;
   12. }
   13. OH_AVMetadataExtractor* mainExtractor = OH_AVMetadataExtractor_Create();
   14. if (!mainExtractor) {
   15. napi_throw_error(env, "EFAILED", "Create metadata extractor failed");
   16. return nullptr;
   17. }
   18. OH_AVErrCode avErrCode = OH_AVMetadataExtractor_SetFDSource(mainExtractor, fileDescribe, offset, fileSize);
   19. if (avErrCode != AV_ERR_OK) {
   20. OH_AVMetadataExtractor_Release(mainExtractor);
   21. napi_throw_error(env, "EFAILED", "SetFDSource for metadata extractor failed");
   22. return nullptr;
   23. }
   24. OH_AVFormat* avMetadata = OH_AVFormat_Create();
   25. // 获取资源文件的元数据信息。
   26. avErrCode = OH_AVMetadataExtractor_FetchMetadata(mainExtractor, avMetadata);
   27. if (avErrCode != AV_ERR_OK) {
   28. OH_AVFormat_Destroy(avMetadata);
   29. OH_AVMetadataExtractor_Release(mainExtractor);
   30. napi_throw_error(env, "EFAILED", "Fetch metadata failed");
   31. return nullptr;
   32. }
   33. int64_t out;
   34. // 从元数据中获取资源文件的时长。
   35. if (!OH_AVFormat_GetLongValue(avMetadata, OH_AVMETADATA_EXTRACTOR_DURATION, &out)) {
   36. OH_AVFormat_Destroy(avMetadata);
   37. OH_AVMetadataExtractor_Release(mainExtractor);
   38. napi_throw_error(env, "EFAILED", "Get duration failed");
   39. return nullptr;
   40. }
   41. napi_value duration;
   42. napi_create_int64(env, out, &duration);
   43. OH_AVFormat_Destroy(avMetadata);
   44. OH_AVMetadataExtractor_Release(mainExtractor);
   45. return duration;
   46. }
   ```
4. 获取指定时间的视频帧：调用[OH\_AVImageGenerator\_FetchFrameByTime()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avimage-generator-h#oh_avimagegenerator_fetchframebytime)，可以获取到一个OH\_PixelmapNative对象，该对象可用于图片显示。

   使用完成需要调用OH\_PixelmapNative\_Release释放OH\_PixelmapNative对象资源，详细使用方法请参阅[Image\_NativeModule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapnative_release)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. #include "napi/native_api.h"
   2. #include <multimedia/image_framework/image/pixelmap_native.h>
   3. #include <multimedia/player_framework/avimage_generator.h>
   4. #include <multimedia/player_framework/avimage_generator_base.h>
   5. #include <multimedia/player_framework/native_averrors.h>

   7. // FetchFrameByTime的输入参数。
   8. struct FetchFrameParams {
   9. int64_t timeUs = 0; // 指定的时间（单位us）。
   10. int64_t offset = 0; // 媒体源在文件描述符中的偏移量。
   11. int32_t fileDescribe = -1; // 媒体文件描述符。
   12. int32_t fileSize = 0; // 媒体文件大小。
   13. int32_t options = OH_AVIMAGE_GENERATOR_QUERY_CLOSEST; // OH_AVIMAGE_GENERATOR_QUERY_CLOSEST表示选取离传入时间点最近的关键帧。
   14. };

   16. static napi_value OhAvImageGeneratorFetchFrameByTime(napi_env env, napi_callback_info info)
   17. {
   18. FetchFrameParams fetchFrameParams;
   19. // 通过辅助函数，获取输入参数，实现见完整示例。
   20. if (!GetFetchFrameByTimeParams(env, info, fetchFrameParams)) {
   21. return nullptr;
   22. }
   23. int64_t timeUs = fetchFrameParams.timeUs;
   24. int64_t offset = fetchFrameParams.offset;
   25. int32_t fileDescribe = fetchFrameParams.fileDescribe;
   26. int32_t fileSize = fetchFrameParams.fileSize;
   27. int32_t options = fetchFrameParams.options;
   28. // 创建OH_AVImageGenerator实例。
   29. OH_AVImageGenerator* generator = OH_AVImageGenerator_Create();
   30. // 异常处理。
   31. if (!generator) {
   32. napi_throw_error(env, "EFAILED", "Create generator failed");
   33. return nullptr;
   34. }
   35. // 设置视频资源的文件描述符。
   36. OH_AVErrCode avErrCode = OH_AVImageGenerator_SetFDSource(generator, fileDescribe, offset, fileSize);
   37. // 异常处理。
   38. if (avErrCode != AV_ERR_OK) {
   39. OH_AVImageGenerator_Release(generator);
   40. napi_throw_error(env, "EFAILED", "SetFDSource failed");
   41. return nullptr;
   42. }
   43. // 取指定时间的视频帧。
   44. OH_PixelmapNative* pixelMap = nullptr;
   45. avErrCode = OH_AVImageGenerator_FetchFrameByTime(generator, timeUs,
   46. (OH_AVImageGenerator_QueryOptions)options, &pixelMap);
   47. // 异常处理。
   48. if (avErrCode != AV_ERR_OK || !pixelMap) {
   49. OH_AVImageGenerator_Release(generator);
   50. napi_throw_error(env, "EFAILED", "FetchFrameByTime failed");
   51. return nullptr;
   52. }
   53. // 将nativePixelMap对象转换为PixelMapnapi对象。
   54. napi_value pixelmapNapi = nullptr;
   55. Image_ErrorCode errCode = OH_PixelmapNative_ConvertPixelmapNativeToNapi(env, pixelMap, &pixelmapNapi);
   56. // 释放OH_PixelmapNative资源。
   57. OH_PixelmapNative_Release(pixelMap);
   58. // 释放OH_AVImageGenerator资源。
   59. OH_AVImageGenerator_Release(generator);
   60. // 异常处理。
   61. if (errCode != IMAGE_SUCCESS) {
   62. napi_throw_error(env, "EFAILED", "Convert PixelMap failed");
   63. return nullptr;
   64. }
   65. return pixelmapNapi;
   66. }
   ```
5. 释放资源：调用[OH\_AVImageGenerator\_Release()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avimage-generator-h#oh_avimagegenerator_release)销毁实例，释放资源。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 释放OH_AVImageGenerator资源。
   2. OH_AVImageGenerator_Release(generator);
   ```

## 运行示例工程

参考以下示例，获取一个视频指定时间的视频帧。

1. 新建工程，下载[完整示例工程](https://gitcode.com/openharmony/applications_app_samples/tree/master/code/DocsSample/Media/AVImageGenerator/AVImageGeneratorNDK)，并将示例工程的资源复制到对应目录。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. AVImageGeneratorNDK
   2. entry/src/main/ets/
   3. └── pages
   4. └── Index.ets (获取缩略图界面)
   5. entry/src/main/
   6. ├── cpp
   7. │   ├── types
   8. │   │   └── libentry
   9. │   │       └── Index.d.ts (NDK函数对应的js映射)
   10. │   ├── CMakeLists.txt (CMake脚本)
   11. │   └── napi_init.cpp (NDK函数)
   12. └── resources
   13. ├── base
   14. │   ├── element
   15. │   │   ├── color.json
   16. │   │   ├── float.json
   17. │   │   └── string.json
   18. │   └── media
   19. │
   20. └── rawfile
   21. └── H264_AAC.mp4 (视频资源)
   ```
2. 编译新建工程并运行。