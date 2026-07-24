开发者可以调用DRM Kit和Media Kit的ArkTS接口实现AVPlayer播放器，完成DRM节目播放。

## 开发步骤

1. 导入DRM Kit和Media Kit接口。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { drm } from '@kit.DrmKit'
   2. import { media } from '@kit.MediaKit'
   ```
2. 导入BusinessError模块抛出Drm Kit接口的错误码。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit'
   ```
3. 调用[createAVPlayer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-media-f#mediacreateavplayer9)，创建AVPlayer实例并设置DRM信息监听事件。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let playerHandle: media.AVPlayer;
   2. async function initPlayer() {
   3. playerHandle = await media.createAVPlayer();
   4. playerHandle.on('mediaKeySystemInfoUpdate', async (mediaKeySystemInfo: drm.MediaKeySystemInfo[]) => {
   5. console.info('player has received drmInfo signal: ' + JSON.stringify(mediaKeySystemInfo))
   6. // 处理DRM信息。
   7. // 设置解密session。
   8. })
   9. }
   ```
4. 调用[createMediaKeySystem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-drm-f#drmcreatemediakeysystem)和[createMediaKeySession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-drm-mediakeysystem#createmediakeysession)根据DRM信息中的uuid创建MediaKeySystem和MediaKeySession实例。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let mediaKeySystem: drm.MediaKeySystem
   2. let mediaKeySession: drm.MediaKeySession
   3. let drmInfoArr: drm.MediaKeySystemInfo[] = mediaKeySystemInfo
   4. for (let i = 0; i < drmInfoArr.length; i++) {
   5. console.info('drmInfoArr - uuid: ' + drmInfoArr[i].uuid)
   6. console.info('drmInfoArr - pssh: ' + drmInfoArr[i].pssh)
   7. let description: drm.MediaKeySystemDescription[] = drm.getMediaKeySystems();
   8. let solutionName: string = "com.wiseplay.drm"
   9. for (let item of description) {
   10. if (drmInfoArr[i].uuid == item.uuid) {
   11. solutionName = item.name
   12. }
   13. }
   14. let isSupported: boolean = drm.isMediaKeySystemSupported(solutionName, "video/mp4");
   15. if (isSupported) {
   16. mediaKeySystem = drm.createMediaKeySystem(solutionName);
   17. mediaKeySession = mediaKeySystem.createMediaKeySession();
   18. }
   19. // 媒体密钥请求与处理。
   20. }
   ```
5. 调用[generateMediaKeyRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-drm-mediakeysession#generatemediakeyrequest)生成媒体密钥请求，并调用[processMediaKeyResponse](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-drm-mediakeysession#processmediakeyresponse)处理媒体密钥响应。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let initData: Uint8Array = new Uint8Array(drmInfoArr[i].pssh);
   2. const optionsData: drm.OptionsData[] = [{
   3. name: "optionalDataName",
   4. value: "optionalDataValue"
   5. }]
   6. mediaKeySession.generateMediaKeyRequest("video/mp4", initData, drm.MediaKeyType.MEDIA_KEY_TYPE_ONLINE, optionsData).then(async (licenseRequest) => {
   7. console.info("generateMediaKeyRequest success", licenseRequest.mediaKeyRequestType, licenseRequest.data, licenseRequest.defaultURL);
   8. // 将媒体密钥请求返回的licenseRequest.data通过网络请求发送给DRM服务获取媒体密钥响应，并处理。
   9. let licenseResponse = new Uint8Array([0x00, 0x00, 0x00, 0x00]);
   10. mediaKeySession.processMediaKeyResponse(licenseResponse).then((mediaKeyId: Uint8Array) => {
   11. console.info("processMediaKeyResponse success");
   12. }).catch((err:BusinessError) =>{
   13. console.error("processMediaKeyResponse err end", err.code);
   14. });
   15. }).catch((err:BusinessError) =>{
   16. console.error("generateMediaKeyRequest err end", err.code);
   17. });
   ```
6. 调用[requireSecureDecoderModule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-drm-mediakeysession#requiresecuredecodermodule)和[setDecryptionConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-media-avplayer#setdecryptionconfig11)，在处理媒体密钥响应成功后设置解密session。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let svp: boolean = mediaKeySession.requireSecureDecoderModule('video/avc');
   2. playerHandle.setDecryptionConfig(mediaKeySession, svp)
   ```
7. 销毁AVPlayer实例并根据released事件监听销毁MediaKeySession和MediaKeySystem实例。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. playerHandle.on('stateChange', async (state: string, reason: media.StateChangeReason) => {
   2. if (state == 'released') {
   3. mediaKeySession.destroy();
   4. mediaKeySystem.destroy();
   5. } else if (state == 'releasing') {
   6. await playerHandle.release();
   7. }
   8. })
   ```