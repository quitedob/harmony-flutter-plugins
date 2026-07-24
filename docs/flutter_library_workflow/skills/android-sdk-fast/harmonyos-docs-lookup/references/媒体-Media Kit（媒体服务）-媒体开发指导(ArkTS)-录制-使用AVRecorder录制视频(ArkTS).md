当前仅支持[AVRecorder](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/media-kit-intro#avrecorder)开发视频录制，集成了音频捕获，音频编码，视频编码，音视频封装功能，适用于实现简单视频录制并直接得到视频本地文件的场景。

本开发指导将以“开始录制-暂停录制-恢复录制-停止录制”的一次流程为示例，向开发者讲解如何使用AVRecorder进行视频录制。

在进行应用开发的过程中，开发者可以通过AVRecorder的state属性主动获取当前状态，或使用[on('stateChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-media-avrecorder#onstatechange9)方法监听状态变化。开发过程中应该严格遵循状态机要求，例如只能在started状态下调用[pause](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-media-avrecorder#pause9-1)接口，只能在paused状态下调用[resume](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-media-avrecorder#resume9-1)接口。

**图1** 录制状态变化示意图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c5/v3/84sTkmzuQsSzUP32Gweo3A/zh-cn_image_0000002540612090.png?HW-CC-KV=V1&HW-CC-Date=20260414T053018Z&HW-CC-Expire=86400&HW-CC-Sign=A4674115D1312D023D31C2FEBC8E8DE3D76EEDDD2D0A420C428FE8192D061681)

状态的详细说明请参考[AVRecorderState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-media-t#avrecorderstate9)。

## 申请权限

在开发此功能前，开发者应根据实际需求申请相关权限：

* 当需要使用麦克风时，需要申请**ohos.permission.MICROPHONE**麦克风权限。申请方式请参考：[向用户申请授权](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/request-user-authorization)。
* 当需要使用相机拍摄时，需要申请**ohos.permission.CAMERA**相机权限。申请方式请参考：[向用户申请授权](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/request-user-authorization)。
* 当需要从图库读取图片或视频文件时，请优先使用媒体库[Picker选择媒体资源](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/photoaccesshelper-photoviewpicker)。
* 当需要保存图片或视频文件至图库时，请优先使用[安全控件保存媒体资源](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/photoaccesshelper-savebutton)。

说明

仅应用需要克隆、备份或同步用户公共目录的图片、视频类文件时，可申请ohos.permission.READ\_IMAGEVIDEO、ohos.permission.WRITE\_IMAGEVIDEO权限来读写音频文件，申请方式请参考[申请受控权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/declare-permissions-in-acl)，通过AGC审核后才能使用。为避免应用的上架申请被驳回，开发者应优先使用Picker/控件等替代方案，仅少量符合[特殊场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/restricted-permissions#ohospermissionread_imagevideo)的应用被允许申请受限权限。

## 开发步骤及注意事项

说明

AVRecorder只负责视频数据的处理，需要与视频数据采集模块配合才能完成视频录制。视频数据采集模块需要通过Surface将视频数据传递给AVRecorder进行数据处理。当前主流的数据采集模块为相机模块，详细实现请参考[相机-录像](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/camera-recording)。

关于文件的创建与存储操作，请参考[应用文件访问与管理](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-file-access)，默认存储在应用的沙箱路径之下，如需存储至图库，请使用[安全控件保存媒体资源](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/photoaccesshelper-savebutton)对沙箱内文件进行存储。

详细API说明请参考[AVRecorder](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-media-avrecorder)。

1. 创建AVRecorder实例，实例创建完成进入idle状态。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { media } from '@kit.MediaKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';

   4. private avRecorder: media.AVRecorder | undefined = undefined;

   6. try {
   7. this.avRecorder = await media.createAVRecorder();
   8. } catch (err) {
   9. let error: BusinessError = err as BusinessError;
   10. console.error(`Failed to create avRecorder, error code: ${error.code}, message: ${error.message}`);
   11. }
   ```
2. 设置业务需要的监听事件，监听状态变化及错误上报。

   展开

   | 事件类型 | 说明 |
   | --- | --- |
   | stateChange | 必要事件，监听播放器的state属性改变。 |
   | error | 必要事件，监听播放器的错误信息。 |

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { media } from '@kit.MediaKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';

   4. // 状态上报回调函数。
   5. this.avRecorder?.on('stateChange', (state: media.AVRecorderState, reason: media.StateChangeReason) => {
   6. console.info(`AVRecorder state is changed to ${state}, reason: ${reason}`);
   7. });
   8. // 错误上报回调函数。
   9. this.avRecorder?.on('error', (error: BusinessError) => {
   10. console.error(`Error occurred in avRecorder, error code: ${error.code}, message: ${error.message}`);
   11. });
   ```
3. 配置视频录制参数，调用[prepare](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-media-avrecorder#prepare9-1)接口，此时进入prepared状态。

   说明

   配置参数需要注意：

   * 配置参数之前需要确保完成对应权限的申请，请参考[申请权限](/consumer/cn/doc/harmonyos-guides/video-recording#申请权限)。
   * prepare接口的入参avConfig中仅设置视频相关的配置参数，如示例代码所示。

     如果添加了音频参数，系统将认为是“音频+视频录制”。
   * 需要使用支持的[录制规格](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/media-kit-intro#支持的格式)，视频比特率、分辨率、帧率以实际硬件设备支持的范围为准。
   * 录制输出的url地址（即示例里avConfig中的url），形式为fd://xx (fd number)。需要调用基础文件操作接口（[Core File Kit的ohos.file.fs](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-file-fs)）实现应用文件访问能力，获取方式参考[应用文件访问与管理](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-file-access)。
   * 示例中配置的fileFormat视频文件封装格式、videoCodec视频编码格式请参考[录制参数配置](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-media-i#avrecorderprofile9)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { media } from '@kit.MediaKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   3. import { fileIo as fs } from '@kit.CoreFileKit';

   5. let avProfile: media.AVRecorderProfile = {
   6. fileFormat: media.ContainerFormatType.CFT_MPEG_4, // 视频文件封装格式。
   7. videoBitrate: 200000, // 视频比特率。
   8. videoCodec: media.CodecMimeType.VIDEO_AVC, // 视频文件编码格式。
   9. videoFrameWidth: 640,  // 视频分辨率的宽。
   10. videoFrameHeight: 480, // 视频分辨率的高。
   11. videoFrameRate: 30 // 视频帧率。
   12. };

   14. let videoMetaData: media.AVMetadata = {
   15. videoOrientation: '0' // 视频旋转角度，默认为0不旋转，支持的值为0、90、180、270。
   16. };

   18. const context: Context = this.getUIContext().getHostContext()!; // 参考应用文件访问与管理。
   19. let filePath: string = context.filesDir + '/example.mp4';
   20. let videoFile: fs.File = fs.openSync(filePath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
   21. let fileFd: number = videoFile.fd; // 获取文件fd。

   23. let avConfig: media.AVRecorderConfig = {
   24. videoSourceType: media.VideoSourceType.VIDEO_SOURCE_TYPE_SURFACE_YUV, // 视频源类型，支持YUV和ES两种格式。
   25. profile: avProfile,
   26. url: 'fd://' + fileFd.toString(), // 参考应用文件访问与管理开发示例新建并读写一个视频文件。
   27. metadata: videoMetaData
   28. };

   30. try {
   31. await this.avRecorder?.prepare(avConfig);
   32. console.info('Succeeded in preparing avRecorder');
   33. } catch (err) {
   34. let error: BusinessError = err as BusinessError;
   35. console.error(`Failed to prepare avRecorder, error code: ${error.code}, message: ${error.message}`);
   36. }
   ```
4. 获取视频录制需要的SurfaceID。

   调用[getInputSurface](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-media-avrecorder#getinputsurface9-1)接口，接口的返回值SurfaceID用于传递给视频数据输入源模块。常用的输入源模块为相机，以下示例代码中，采用相机作为视频输入源为例。

   输入源模块通过SurfaceID可以获取到Surface，通过Surface可以将视频数据流传递给AVRecorder，由AVRecorder再进行视频数据的处理。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';

   3. this.avRecorder?.getInputSurface().then((surfaceId: string) => {
   4. console.info('Succeeded in getting input surface');
   5. }, (error: BusinessError) => {
   6. console.error(`Failed to get input surface, error code: ${error.code}, message: ${error.message}`);
   7. });
   ```
5. 初始化视频数据输入源。该步骤需要在输入源模块完成，以相机为例，需要创建录像输出流，包括创建Camera对象、获取相机列表、创建相机输入流等，相机详细步骤请参考[相机-录像方案](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/camera-recording)。
6. 开始录制，启动输入源输入视频数据，例如相机模块调用camera.VideoOutput.start接口启动相机录制。然后调用[start](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-media-avrecorder#start9-1)接口，此时AVRecorder进入started状态。
7. 暂停录制，调用[pause](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-media-avrecorder#pause9-1)接口，此时AVRecorder进入paused状态，同时暂停输入源输入数据。例如相机模块调用camera.VideoOutput.stop停止相机视频数据输入。
8. 恢复录制，调用[resume](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-media-avrecorder#resume9-1)接口，此时再次进入started状态。
9. 停止录制，调用[stop](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-media-avrecorder#stop9-1)接口，此时进入stopped状态，同时停止相机录制。
10. 重置资源，调用[reset](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-media-avrecorder#reset9-1)接口，重新进入idle状态，允许重新配置录制参数。
11. 销毁实例，调用[release](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-media-avrecorder#release9-1)接口，进入released状态，退出录制，释放视频数据输入源相关资源，例如相机资源。

## 完整示例

参考以下示例，完成“开始录制-暂停录制-恢复录制-停止录制”的完整流程。

收起

自动换行

深色代码主题

复制

```
1. import { common } from '@kit.AbilityKit';
2. import { camera } from '@kit.CameraKit';
3. import { media } from '@kit.MediaKit';
4. import { BusinessError } from '@kit.BasicServicesKit';
5. import { fileIo as fs, fileUri } from '@kit.CoreFileKit';
6. import { photoAccessHelper } from '@kit.MediaLibraryKit';

8. async function videoRecording(context: common.Context): Promise<void> {
9. // 创建avRecorder对象。
10. let avRecorder: media.AVRecorder | undefined = undefined;
11. try {
12. avRecorder = await media.createAVRecorder();
13. } catch (error) {
14. let err = error as BusinessError;
15. console.error(`Failed to create avRecorder, error code: ${err.code}, message: ${err.message}`);
16. return;
17. }

19. // 注册avRecorder回调函数。
20. try {
21. // 状态机变化回调函数。
22. avRecorder.on('stateChange', (state: media.AVRecorderState, reason: media.StateChangeReason) => {
23. console.info(`AVRecorder state is changed to ${state}, reason: ${reason}`);
24. });
25. // 错误上报回调函数。
26. avRecorder.on('error', (error: BusinessError) => {
27. console.error(`Error occurred in avRecorder, error code: ${error.code}, message: ${error.message}`);
28. });
29. } catch (error) {
30. let err = error as BusinessError;
31. console.error(`Failed to set avRecorder callback, error code: ${err.code}, message: ${err.message}`);
32. }

34. // 配置录制参数完成准备工作。
35. let avProfile: media.AVRecorderProfile = {
36. fileFormat: media.ContainerFormatType.CFT_MPEG_4, // 视频文件封装格式。
37. videoBitrate: 100000, // 视频比特率。
38. videoCodec: media.CodecMimeType.VIDEO_AVC, // 视频文件编码格式。
39. videoFrameWidth: 640,  // 视频分辨率的宽。
40. videoFrameHeight: 480, // 视频分辨率的高。
41. videoFrameRate: 30 // 视频帧率。
42. };
43. let videoMetaData: media.AVMetadata = {
44. videoOrientation: '0' // 视频旋转角度，默认为0不旋转，支持的值为0、90、180、270。
45. };
46. let avConfig: media.AVRecorderConfig = {
47. videoSourceType: media.VideoSourceType.VIDEO_SOURCE_TYPE_SURFACE_YUV, // 视频源类型，支持YUV和ES两种格式。
48. profile: avProfile,
49. url: 'fd://35', // 参考应用文件访问与管理开发示例新建并读写一个文件。
50. metadata: videoMetaData
51. };

53. // 创建文件以及设置avConfig.url。
54. let filePath: string = ''; // 文件路径。
55. let videoFile: fs.File | undefined = undefined;
56. try {
57. filePath = context.filesDir + '/example.mp4'; // 文件沙箱路径，文件后缀名应与封装格式对应。
58. videoFile = fs.openSync(filePath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE); // 打开文件。
59. } catch (error) {
60. let err = error as BusinessError;
61. console.error(`Failed to open file, error code: ${err.code}, message: ${err.message}`);
62. }
63. if (videoFile !== undefined) {
64. avConfig.url = 'fd://' + videoFile.fd; // 更新url。
65. }

67. // 配置录制参数完成准备工作。
68. try {
69. if (avRecorder.state === 'idle' || avRecorder.state === 'stopped') { // 仅在idle或者stopped状态下调用prepare为合理状态切换。
70. await avRecorder.prepare(avConfig);
71. }
72. } catch (error) {
73. let err = error as BusinessError;
74. console.error(`Failed to prepare avRecorder, error code: ${err.code}, message: ${err.message}`);
75. }

77. // 完成相机相关准备工作。
78. let cameraManager: camera.CameraManager = camera.getCameraManager(context);
79. let videoOutSurfaceId: string = await avRecorder.getInputSurface();
80. await prepareCamera(cameraManager, videoOutSurfaceId);

82. // 启动录制。
83. try {
84. if (avRecorder.state === 'prepared') { // 仅在prepared状态下调用start为合理状态切换。
85. await startCameraOutput(); // 启动相机出流。
86. await avRecorder.start();
87. }
88. } catch (error) {
89. let err = error as BusinessError;
90. console.error(`Failed to start avRecorder, error code: ${err.code}, message: ${err.message}`);
91. }

93. // 暂停录制。
94. try {
95. if (avRecorder.state === 'started') { // 仅在started状态下调用pause为合理状态切换。
96. await avRecorder.pause();
97. await stopCameraOutput(); // 停止相机出流。
98. }
99. } catch (error) {
100. let err = error as BusinessError;
101. console.error(`Failed to pause avRecorder, error code: ${err.code}, message: ${err.message}`);
102. }

104. // 恢复录制。
105. try {
106. if (avRecorder.state === 'paused') { // 仅在paused状态下调用resume为合理状态切换。
107. await startCameraOutput(); // 启动相机出流。
108. await avRecorder.resume();
109. }
110. } catch (error) {
111. let err = error as BusinessError;
112. console.error(`Failed to resume avRecorder, error code: ${err.code}, message: ${err.message}`);
113. }

115. // 停止录制。
116. try {
117. if (avRecorder.state === 'started' || avRecorder.state === 'paused') { // 仅在started或者paused状态下调用stop为合理状态切换。
118. await avRecorder.stop();
119. await stopCameraOutput(); // 停止相机出流。
120. }
121. } catch (error) {
122. let err = error as BusinessError;
123. console.error(`Failed to stop avRecorder, error code: ${err.code}, message: ${err.message}`);
124. }

126. // 重置。
127. try {
128. await avRecorder.reset();
129. } catch (error) {
130. let err = error as BusinessError;
131. console.error(`Failed to reset avRecorder, error code: ${err.code}, message: ${err.message}`);
132. }

134. // 释放录制实例。
135. try {
136. await avRecorder.release();
137. avRecorder = undefined;
138. } catch (error) {
139. let err = error as BusinessError;
140. console.error(`Failed to release avRecorder, error code: ${err.code}, message: ${err.message}`);
141. }

143. // 关闭录制文件fd。
144. try {
145. if (videoFile !== undefined) {
146. await fs.close(videoFile.fd);
147. }
148. } catch (error) {
149. let err = error as BusinessError;
150. console.error(`Failed to close fd, error code: ${err.code}, message: ${err.message}`);
151. }

153. // 释放相机相关实例。
154. await releaseCamera();

156. // 安全控件保存媒体资源至图库。
157. let phAccessHelper: photoAccessHelper.PhotoAccessHelper = photoAccessHelper.getPhotoAccessHelper(context);

159. // 需要确保uriPath对应的资源存在。
160. let uriPath: string = fileUri.getUriFromPath(filePath); // 获取录制文件的uri，用于安全控件保存至图库。
161. let assetChangeRequest: photoAccessHelper.MediaAssetChangeRequest =
162. photoAccessHelper.MediaAssetChangeRequest.createVideoAssetRequest(context, uriPath);
163. await phAccessHelper.applyChanges(assetChangeRequest);
164. }

166. // 相机相关准备工作。
167. async function prepareCamera(cameraManager: camera.CameraManager, videoOutSurfaceId: string) {
168. // 具体实现查看相机资料。
169. }

171. // 启动相机出流。
172. async function startCameraOutput() {
173. // 调用VideoOutput的start接口开始录像输出。
174. }

176. // 停止相机出流。
177. async function stopCameraOutput() {
178. // 调用VideoOutput的stop接口停止录像输出。
179. }

181. // 释放相机实例。
182. async function releaseCamera() {
183. // 释放相机准备阶段创建出的实例。
184. }
```