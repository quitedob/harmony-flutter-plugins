使用MediaAssetManager可以实现请求媒体资源到目标沙箱路径，本开发指导将以请求一张图片作为示例，向开发者讲解MediaAssetManager相关功能。

请求图片资源的全流程包含：创建MediaAssetManager，设置请求资源，请求图片资源，取消本次请求(可选)。

## 开发步骤及注意事项

在CMake脚本中链接动态库

收起

自动换行

深色代码主题

复制

```
1. target_link_libraries(sample PUBLIC libmedia_asset_manager.so)
```

开发者通过引入[media\_asset\_manager\_capi.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-media-asset-manager-capi-h)和[media\_asset\_base\_capi.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h)头文件，使用MediaAssetManager相关API。

详细的API说明请参考[MediaAssetManager API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager)。

说明

开发前，需要参考[开发准备](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/photoaccesshelper-preparation)，申请ohos.permission.READ\_IMAGEVIDEO权限。

1. 创建实例：OH\_MediaAssetManager\_Create()。
2. 设置资源：设置资源请求回调、设置资源请求策略、设置源图片Uri和目标Uri。
3. 请求图片资源：调用OH\_MediaAssetManager\_RequestImageForPath()请求图片资源到目标Uri。
4. 取消请求：调用OH\_MediaAssetManager\_CancelRequest()。(可选)

## 完整示例

收起

自动换行

深色代码主题

复制

```
1. #include "multimedia/media_library/media_asset_base_capi.h"
2. #include "multimedia/media_library/media_asset_manager_capi.h"
3. #include <stdio.h>
4. #include <string.h>

6. const char ERROR_REQUEST_ID[UUID_STR_MAX_LENGTH] = "00000000-0000-0000-0000-000000000000";

8. // 资源请求回调
9. void OnDataPrepared(int32_t result, MediaLibrary_RequestId requestIdStruct)
10. {
11. printf("OnDataPrepared requestId: %s result: %d\n", requestIdStruct.requestId, result);
12. }

14. int main()
15. {
16. // 创建MediaAssetManager实例
17. OH_MediaAssetManager *manager = OH_MediaAssetManager_Create();
18. if (manager == nullptr) {
19. // 处理异常。
20. printf("Get MediaAssetManager failed.\n");
21. } else {
22. // 设置资源请求回调
23. OH_MediaLibrary_OnDataPrepared callback = OnDataPrepared;

25. // 设置资源请求策略
26. MediaLibrary_RequestOptions options;
27. options.deliveryMode = MEDIA_LIBRARY_HIGH_QUALITY_MODE;

29. // 预置图片资源Uri，默认为高质量图片。注：以下Uri是示例，开发者需根据实际情况创建或获取
30. const char *srcUri = "file://media/Photo/87/VID_1712195295_025/request_image_src.jpg";

32. // 提供目标路径Uri。注：以下Uri是示例，开发者需根据实际情况创建或获取
33. const char *destUri = "file://media/Photo/9/IMG_1712195237_008/request_image_dest.jpg";

35. // 将图片资源请求到目标路径
36. MediaLibrary_RequestId requestIdStruct = OH_MediaAssetManager_RequestImageForPath(manager, srcUri,
37. options, destUri, callback);

39. if (strcmp(requestIdStruct.requestId, ERROR_REQUEST_ID) == 0) {
40. // 处理异常
41. printf("Request image failed requestId：%s\n", requestIdStruct.requestId);
42. } else {
43. // 请求成功，打印请求Id
44. printf("Request image success, requestId: %s\n", requestIdStruct.requestId);

46. // 调用CancelRequest接口，用来取消尚在处理中的请求
47. // 注：OH_MediaAssetManager_CancelRequest不是必须流程，开发者可根据实际情况选择是否调用该接口来取消尚未回调返回的资源请求
48. bool ret = OH_MediaAssetManager_CancelRequest(manager, requestIdStruct);
49. }
50. }
51. return 0;
52. }
```