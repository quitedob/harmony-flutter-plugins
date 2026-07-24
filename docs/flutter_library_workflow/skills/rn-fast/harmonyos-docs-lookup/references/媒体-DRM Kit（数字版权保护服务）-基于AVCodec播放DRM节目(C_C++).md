## 功能介绍

开发者可以调用DRM Kit的Native API，完成DRM节目播放。

当前支持的解密能力如下：

展开

| 音频容器规格 | 音频解密类型 |
| --- | --- |
| mp4 | AAC |

展开

| 视频容器规格 | 视频解密类型 |
| --- | --- |
| ts | AVC(H.264) |
| mp4 | AVC(H.264) |
| mp4 | HEVC(H.265) |

**适用场景**

在创建DRM之前，需获取到DRM信息(参考[媒体数据解析](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/audio-video-demuxer#开发步骤)开发步骤第4步)。

## 开发指导

详细的API说明请参考[Drm](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drm)。

参考以下示例代码，完成DRM的全流程，包括：获取设备支持的DRM解决方案的名称和唯一标识的列表、创建MediaKeySystem、创建MediaKeySession、生成媒体密钥请求、处理媒体密钥响应、获取是否需要安全视频解码以及销毁资源。

在应用开发过程中，开发者应按一定顺序调用方法，执行对应操作，否则系统可能会抛出异常或生成其他未定义的行为。具体顺序可参考下列开发步骤及对应说明。

### 在 CMake 脚本中链接动态库

收起

自动换行

深色代码主题

复制

```
1. target_link_libraries(sample PUBLIC libnative_drm.so)
```

说明

上述'sample'字样仅为示例，此处由调用者根据实际工程目录自定义。

## 开发步骤

1. 导入DRM Kit接口。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. #include "multimedia/drm_framework/native_drm_common.h"
   2. #include "multimedia/drm_framework/native_drm_err.h"
   3. #include "multimedia/drm_framework/native_mediakeysession.h"
   4. #include "multimedia/drm_framework/native_mediakeysystem.h"
   ```
2. 获取设备支持的DRM解决方案名称和唯一标识的列表。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. uint32_t count = 3; // count是当前设备实际支持的DRM插件的个数，用户根据实际情况设置。
   2. DRM_MediaKeySystemDescription descriptions[3];
   3. memset(descriptions, 0, sizeof(descriptions));
   4. Drm_ErrCode ret = OH_MediaKeySystem_GetMediaKeySystems(descriptions, &count);
   5. if (ret != DRM_ERR_OK) {
   6. printf("OH_MediaKeySystem_GetMediaKeySystems failed.");
   7. }
   ```

   获取到设备支持的DRM解决方案的名称和唯一标识的列表后，与DRM信息做匹配，创建对应的DRM解决方案。DRM信息可通过[媒体数据解析](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/audio-video-demuxer#开发步骤)开发步骤第4步获取，

   或者直接解析媒体协议或媒体数据得到DRM解决方案唯一标识及pssh数据以生成DRM信息。
3. 创建MediaKeySystem实例。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. MediaKeySystem *mediaKeySystem = nullptr;
   2. ret = OH_MediaKeySystem_Create("com.wiseplay.drm", &mediaKeySystem);
   3. if (ret != DRM_ERR_OK || mediaKeySystem == nullptr) {
   4. printf("OH_MediaKeySystem_Create failed.");
   5. }
   ```
4. 创建MediaKeySession实例。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. MediaKeySession *mediaKeySession = nullptr;
   2. DRM_ContentProtectionLevel contentProtectionLevel = CONTENT_PROTECTION_LEVEL_SW_CRYPTO; // 依据设备支持的内容保护级别设置。
   3. ret = OH_MediaKeySystem_CreateMediaKeySession(mediaKeySystem, &contentProtectionLevel, &mediaKeySession);
   4. if (ret != DRM_ERR_OK || mediaKeySession == nullptr) {
   5. printf("OH_MediaKeySystem_CreateMediaKeySession failed.");
   6. }
   ```
5. 查询是否需要安全解码。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. bool requireSecureDecoder;
   2. ret = OH_MediaKeySession_RequireSecureDecoderModule(mediaKeySession, "video/avc", &requireSecureDecoder);
   3. if (ret != DRM_ERR_OK) {
   4. printf("OH_MediaKeySession_RequireSecureDecoderModule failed.");
   5. }
   ```
6. 生成媒体密钥请求与处理媒体密钥响应。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. #define MAX_DRM_MEDIA_KEY_RESPONSE_BUF_SIZE 24576 // 24576: (2 * 12 * 1024)
   2. DRM_MediaKeyRequest mediaKeyRequest;
   3. DRM_MediaKeyRequestInfo info;
   4. // initData对应码流中的pssh数据，请按实际数据填入。
   5. unsigned char initData[512] = {0x00};
   6. memset(&info, 0, sizeof(DRM_MediaKeyRequestInfo));
   7. info.initDataLen = sizeof(initData);
   8. info.type = MEDIA_KEY_TYPE_ONLINE; // MEDIA_KEY_TYPE_ONLINE: 在线媒体密钥请求类型; MEDIA_KEY_TYPE_OFFLINE: 离线媒体密钥请求类型。
   9. if (sizeof("video/mp4") <= sizeof(info.mimeType)) {
   10. memcpy(info.mimeType, "video/mp4", sizeof("video/mp4"));
   11. }
   12. if (info.initDataLen <= sizeof(info.initData)) {
   13. memcpy(info.initData, initData, info.initDataLen);
   14. }
   15. if (sizeof("optionalDataName") <= sizeof(info.optionName[0])) {
   16. memcpy(info.optionName[0], "optionalDataName", sizeof("optionalDataName"));
   17. }

   19. if (sizeof("optionalDataValue") <= sizeof(info.optionData[0])) {
   20. memcpy(info.optionData[0], "optionalDataValue", sizeof("optionalDataValue"));
   21. }
   22. info.optionsCount = 1;
   23. ret = OH_MediaKeySession_GenerateMediaKeyRequest(mediaKeySession, &info, &mediaKeyRequest);
   24. if (ret != DRM_ERR_OK) {
   25. printf("OH_MediaKeySession_GenerateMediaKeyRequest failed.");
   26. }
   27. /*
   28. 应用通过网络请求DRM服务，获取媒体密钥响应mediaKeyResponse，将响应传到OH_MediaKeySession_ProcessMediaKeyResponse，
   29. 若是离线媒体密钥响应处理，则返回离线媒体密钥标识mediaKeyId，请根据实际的数据和长度传入。
   30. */
   31. unsigned char mediaKeyId[128] = {0x00};
   32. int32_t mediaKeyIdLen = 128;
   33. // 媒体密钥响应长度最大为MAX_DRM_MEDIA_KEY_RESPONSE_BUF_SIZE，请按实际数据输入。
   34. unsigned char mediaKeyResponse[MAX_DRM_MEDIA_KEY_RESPONSE_BUF_SIZE] = {0x00};
   35. int32_t mediaKeyResponseLen = MAX_DRM_MEDIA_KEY_RESPONSE_BUF_SIZE;
   36. ret = OH_MediaKeySession_ProcessMediaKeyResponse(mediaKeySession, mediaKeyResponse,
   37. mediaKeyResponseLen, mediaKeyId, &mediaKeyIdLen);
   38. if (ret != DRM_ERR_OK) {
   39. printf("OH_MediaKeySession_ProcessMediaKeyResponse failed.");
   40. }
   ```

   根据需要设置音频解密配置(详见[音频解码开发指南开发步骤](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/audio-decoding#开发步骤)第4步)、设置视频解密配置(详见[视频解码开发指南开发步骤Surface模式](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/video-decoding#surface模式)第4步或[Buffer模式](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/video-decoding#buffer模式)第4步)，实现DRM内容解密。
7. 销毁MediaKeySession实例。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. ret = OH_MediaKeySession_Destroy(mediaKeySession);
   2. if (ret != DRM_ERR_OK) {
   3. printf("OH_MediaKeySession_Destroy failed.");
   4. }
   ```
8. 销毁MediaKeySystem实例。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. ret = OH_MediaKeySystem_Destroy(mediaKeySystem);
   2. if (ret != DRM_ERR_OK) {
   3. printf("OH_MediaKeySystem_Destroy failed.");
   4. }
   ```